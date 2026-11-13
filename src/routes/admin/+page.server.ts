import { fail, redirect } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';
import {
	getWastePriceList,
	countWastePrices,
	getWasteSubCategoryOptions,
	getWasteCategoryOptions,
	getWastePriceStats,
	createWastePrice,
	updateWastePrice,
	deleteWastePrice
} from '$lib/server/db/wastePrice';

const ITEMS_PER_PAGE = 10;

export const load: PageServerLoad = async ({ locals, url }) => {
	// 1. Route guard RBAC: Hanya role admin yang boleh mengakses
	if (!locals.user) {
		throw redirect(303, '/get-started?redirectTo=/admin');
	}

	if (locals.user.user_role !== 'admin') {
		throw redirect(303, '/dashboard/overview');
	}

	// 2. Parse query parameters
	const pageParam = parseInt(url.searchParams.get('page') || '1', 10);
	const currentPage = isNaN(pageParam) || pageParam < 1 ? 1 : pageParam;

	const searchParam = url.searchParams.get('search') || '';
	const categoryParam = url.searchParams.get('category');
	const categoryId = categoryParam && !isNaN(parseInt(categoryParam, 10)) ? parseInt(categoryParam, 10) : null;

	const offset = (currentPage - 1) * ITEMS_PER_PAGE;

	// 3. Ambil data secara paralel
	const [prices, totalCount, subCategories, categories, stats] = await Promise.all([
		getWastePriceList({
			categoryId,
			search: searchParam,
			limit: ITEMS_PER_PAGE,
			offset
		}),
		countWastePrices({
			categoryId,
			search: searchParam
		}),
		getWasteSubCategoryOptions(),
		getWasteCategoryOptions(),
		getWastePriceStats()
	]);

	const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE) || 1;

	return {
		user: locals.user,
		prices,
		pagination: {
			currentPage,
			totalPages,
			totalCount,
			itemsPerPage: ITEMS_PER_PAGE
		},
		filters: {
			search: searchParam,
			category: categoryId
		},
		subCategories,
		categories,
		stats
	};
};

export const actions: Actions = {
	create: async ({ request, locals }) => {
		if (!locals.user || locals.user.user_role !== 'admin') {
			return fail(403, { actionError: 'Akses ditolak. Anda bukan administrator.' });
		}

		const formData = await request.formData();
		const subCategoryId = parseInt(formData.get('waste_sub_category_id')?.toString() || '', 10);
		const price = parseFloat(formData.get('price')?.toString() || '');
		const createdAtRaw = formData.get('created_at')?.toString()?.trim();

		if (isNaN(subCategoryId) || subCategoryId <= 0) {
			return fail(400, { actionError: 'Silakan pilih subkategori sampah yang valid.' });
		}

		if (isNaN(price) || price < 0) {
			return fail(400, { actionError: 'Nominal harga harus berupa angka positif.' });
		}

		try {
			const createdAt = createdAtRaw ? new Date(createdAtRaw).toISOString() : undefined;
			await createWastePrice({
				subCategoryId,
				price,
				createdAt
			});

			return { actionSuccess: 'Data observasi harga berhasil ditambahkan.' };
		} catch (err) {
			console.error('[Admin CRUD create error]:', err);
			return fail(500, { actionError: 'Gagal menambahkan observasi harga baru.' });
		}
	},

	update: async ({ request, locals }) => {
		if (!locals.user || locals.user.user_role !== 'admin') {
			return fail(403, { actionError: 'Akses ditolak. Anda bukan administrator.' });
		}

		const formData = await request.formData();
		const id = parseInt(formData.get('id')?.toString() || '', 10);
		const subCategoryId = parseInt(formData.get('waste_sub_category_id')?.toString() || '', 10);
		const price = parseFloat(formData.get('price')?.toString() || '');
		const createdAtRaw = formData.get('created_at')?.toString()?.trim();

		if (isNaN(id) || id <= 0) {
			return fail(400, { actionError: 'ID data harga tidak valid.' });
		}

		if (isNaN(subCategoryId) || subCategoryId <= 0) {
			return fail(400, { actionError: 'Silakan pilih subkategori sampah yang valid.' });
		}

		if (isNaN(price) || price < 0) {
			return fail(400, { actionError: 'Nominal harga harus berupa angka positif.' });
		}

		try {
			const createdAt = createdAtRaw ? new Date(createdAtRaw).toISOString() : undefined;
			const success = await updateWastePrice(id, {
				subCategoryId,
				price,
				createdAt
			});

			if (!success) {
				return fail(404, { actionError: 'Data harga tidak ditemukan atau gagal diperbarui.' });
			}

			return { actionSuccess: 'Data observasi harga berhasil diperbarui.' };
		} catch (err) {
			console.error('[Admin CRUD update error]:', err);
			return fail(500, { actionError: 'Terjadi kesalahan sistem saat memperbarui data harga.' });
		}
	},

	delete: async ({ request, locals }) => {
		if (!locals.user || locals.user.user_role !== 'admin') {
			return fail(403, { actionError: 'Akses ditolak. Anda bukan administrator.' });
		}

		const formData = await request.formData();
		const id = parseInt(formData.get('id')?.toString() || '', 10);

		if (isNaN(id) || id <= 0) {
			return fail(400, { actionError: 'ID data tidak valid.' });
		}

		try {
			const success = await deleteWastePrice(id);
			if (!success) {
				return fail(404, { actionError: 'Data harga tidak ditemukan atau sudah dihapus.' });
			}

			return { actionSuccess: 'Data observasi harga berhasil dihapus secara permanen.' };
		} catch (err) {
			console.error('[Admin CRUD delete error]:', err);
			return fail(500, { actionError: 'Gagal menghapus data harga dari basis data.' });
		}
	}
};
