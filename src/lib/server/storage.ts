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
 * Upload gambar analisis ke Public Supabase Storage Bucket (CDN Caching aktif)
 * Format imagePath: waste-analysis/uuid_waste_timestamp.ext atau plant-analysis/uuid_plant_timestamp.ext
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
 * Ambil Public CDN URL permanen untuk gambar di Public Supabase Storage Bucket
 * Cepat, sinkron, tanpa network round-trip, dan memanfaatkan Cloudflare/Supabase Edge CDN Cache
 */
export function getPublicImageUrl(imagePath: string): string | null {
	if (!imagePath) return null;

	const { data } = supabaseAdmin.storage
		.from(SUPABASE_BUCKET_NAME)
		.getPublicUrl(imagePath);

	return data?.publicUrl || null;
}

/**
 * Helper kompatibilitas lama: mengembalikan Public CDN URL
 */
export async function createSignedImageUrl(
	imagePath: string,
	_expiresInSeconds: number = 3600
): Promise<string | null> {
	return getPublicImageUrl(imagePath);
}

/**
 * Hapus gambar dari Public Supabase Storage Bucket
 */
export async function deleteStorageImage(imagePath: string): Promise<boolean> {
	if (!imagePath) return false;

	try {
		const { error } = await supabaseAdmin.storage
			.from(SUPABASE_BUCKET_NAME)
			.remove([imagePath]);

		if (error) {
			console.error('[Storage Delete Error]:', error);
			return false;
		}

		return true;
	} catch (err) {
		console.error('[Storage Delete Exception]:', err);
		return false;
	}
}
