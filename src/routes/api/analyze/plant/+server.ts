import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import crypto from 'node:crypto';
import { analyzePlantImage } from '$lib/server/ai/gemini';
import { uploadAnalysisImage, createSignedImageUrl } from '$lib/server/storage';
import { savePlantAnalysisTransaction } from '$lib/server/db/analysis';

const ALLOWED_MIME_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB

export const POST: RequestHandler = async ({ request, locals }) => {
	// 1. Validasi Autentikasi
	if (!locals.user) {
		return json({ error: 'Sesi login telah kedaluwarsa. Silakan masuk kembali.' }, { status: 401 });
	}

	try {
		const formData = await request.formData();
		const file = formData.get('image');

		if (!file || !(file instanceof File)) {
			return json({ error: 'File gambar wajib diunggah.' }, { status: 400 });
		}

		if (!ALLOWED_MIME_TYPES.includes(file.type)) {
			return json(
				{ error: 'Format file tidak didukung. Harap gunakan format JPEG, PNG, atau WebP.' },
				{ status: 400 }
			);
		}

		if (file.size > MAX_FILE_SIZE) {
			return json(
				{ error: 'Ukuran file terlalu besar. Maksimum ukuran file adalah 5 MB.' },
				{ status: 400 }
			);
		}

		// 2. Baca file buffer & konversi Base64 untuk AI
		const arrayBuffer = await file.arrayBuffer();
		const buffer = Buffer.from(arrayBuffer);
		const base64Image = buffer.toString('base64');

		// 3. Eksekusi Paralel (Hybrid Approach): Panggil Gemini AI & Upload Supabase Storage
		const analysisId = crypto.randomUUID();
		const timestamp = Math.floor(Date.now() / 1000);
		const ext = file.type.split('/')[1] === 'jpeg' ? 'jpg' : file.type.split('/')[1] || 'jpg';
		const storagePath = `plant/${analysisId}_plant_${timestamp}.${ext}`;

		const [geminiResult, uploadResult] = await Promise.all([
			analyzePlantImage(base64Image, file.type),
			uploadAnalysisImage(buffer, storagePath, file.type)
		]);

		// 4. Simpan transaksi ke database PostgreSQL jika gambar valid
		if (geminiResult.isValidImage) {
			await savePlantAnalysisTransaction(analysisId, locals.user.id, storagePath, geminiResult);
		}

		// 5. Dapatkan signed URL gambar untuk preview langsung
		const signedImageUrl = await createSignedImageUrl(storagePath, 3600);

		return json({
			success: true,
			analysisId,
			result: geminiResult,
			imageUrl: signedImageUrl || `data:${file.type};base64,${base64Image}`,
			storagePath: uploadResult.path
		});
	} catch (err: unknown) {
		const msg = err instanceof Error ? err.message : String(err);
		console.error('[API /api/analyze/plant error]:', msg);
		return json(
			{ error: 'Gagal memproses diagnosis tanaman. Pastikan koneksi server dan AI aktif.' },
			{ status: 500 }
		);
	}
};
