import { fail, redirect } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';
import {
	getUserAnalysisHistory,
	getUserHistorySummary,
	deleteAnalysisRecord
} from '$lib/server/db/history';
import { createSignedImageUrl, deleteStorageImage } from '$lib/server/storage';

const PAGE_SIZE = 9;

export const load: PageServerLoad = async ({ locals, url }) => {
	if (!locals.user) {
		throw redirect(303, '/get-started?redirectTo=/dashboard/history');
	}

	if (locals.user.user_role !== 'user') {
		throw redirect(303, '/admin');
	}

	const userId = locals.user.id;
	const activeType = url.searchParams.get('type') || 'all';
	const searchQuery = url.searchParams.get('search') || '';
	const currentPage = Math.max(1, parseInt(url.searchParams.get('page') || '1', 10));
	const offset = (currentPage - 1) * PAGE_SIZE;

	// Ambil data riwayat dan ringkasan secara paralel
	const [rawHistory, summary] = await Promise.all([
		getUserAnalysisHistory(userId, {
			type: activeType,
			search: searchQuery,
			limit: PAGE_SIZE,
			offset
		}),
		getUserHistorySummary(userId, searchQuery)
	]);

	// Resolusi Signed URL gambar di private Supabase bucket secara paralel
	const history = await Promise.all(
		rawHistory.map(async (item) => {
			const signedUrl = await createSignedImageUrl(item.image_path, 3600);
			return {
				...item,
				signed_image_url: signedUrl
			};
		})
	);

	// Hitung total halaman berdasarkan filter tipe aktif
	let totalCountForPagination = summary.total_records;
	if (activeType === 'waste') totalCountForPagination = summary.total_waste;
	else if (activeType === 'plant') totalCountForPagination = summary.total_plant;
	else if (searchQuery.trim() !== '') totalCountForPagination = summary.filtered_count;

	const totalPages = Math.max(1, Math.ceil(totalCountForPagination / PAGE_SIZE));

	return {
		user: locals.user,
		history,
		summary,
		filters: {
			type: activeType,
			search: searchQuery,
			page: currentPage,
			totalPages,
			totalRecords: totalCountForPagination
		}
	};
};

export const actions: Actions = {
	delete: async ({ request, locals }) => {
		if (!locals.user) {
			return fail(401, { error: 'Sesi login tidak sah.' });
		}

		const formData = await request.formData();
		const recordId = String(formData.get('id') || '').trim();

		if (!recordId) {
			return fail(400, { error: 'ID catatan riwayat tidak valid.' });
		}

		try {
			const res = await deleteAnalysisRecord(recordId, locals.user.id);
			if (!res.success) {
				return fail(404, { error: 'Catatan tidak ditemukan atau Anda tidak memiliki akses.' });
			}

			// Hapus file fisik gambar di private Supabase bucket jika ada
			if (res.image_path) {
				await deleteStorageImage(res.image_path);
			}

			return { success: true };
		} catch (err: unknown) {
			const msg = err instanceof Error ? err.message : String(err);
			console.error('[Action: delete history error]:', msg);
			return fail(500, { error: 'Gagal menghapus riwayat analisis.' });
		}
	}
};
