import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';

dotenv.config();

const SUPABASE_URL = process.env.SUPABASE_URL || '';
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
const SUPABASE_BUCKET_NAME = process.env.SUPABASE_BUCKET_NAME || 'SustainAI-UserPhoto';

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
	console.warn('[Storage] Peringatan: Kredensial Supabase Storage belum lengkap di environment server.');
}

export const supabaseAdmin = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
	auth: {
		persistSession: false,
		autoRefreshToken: false
	}
});

/**
 * Upload gambar analisis ke Private Supabase Storage Bucket
 * Format imagePath: waste/uuid_waste_timestamp.ext atau plant/uuid_plant_timestamp.ext
 */
export async function uploadAnalysisImage(
	fileBuffer: Buffer,
	imagePath: string,
	mimeType: string
): Promise<{ success: boolean; path: string; error?: string }> {
	try {
		const { data, error } = await supabaseAdmin.storage
			.from(SUPABASE_BUCKET_NAME)
			.upload(imagePath, fileBuffer, {
				contentType: mimeType,
				upsert: true
			});

		if (error) {
			console.error('[Storage Upload Error]:', error);
			return { success: false, path: imagePath, error: error.message };
		}

		return { success: true, path: data?.path || imagePath };
	} catch (err: unknown) {
		const msg = err instanceof Error ? err.message : String(err);
		console.error('[Storage Upload Exception]:', msg);
		return { success: false, path: imagePath, error: msg };
	}
}

/**
 * Buat Signed URL berbatas waktu (default 3600 detik = 1 jam) untuk mengakses gambar di Private Bucket
 */
export async function createSignedImageUrl(
	imagePath: string,
	expiresInSeconds: number = 3600
): Promise<string | null> {
	if (!imagePath) return null;

	try {
		const { data, error } = await supabaseAdmin.storage
			.from(SUPABASE_BUCKET_NAME)
			.createSignedUrl(imagePath, expiresInSeconds);

		if (error) {
			console.error('[Storage SignedUrl Error]:', error);
			return null;
		}

		return data?.signedUrl || null;
	} catch (err) {
		console.error('[Storage SignedUrl Exception]:', err);
		return null;
	}
}
