import { query } from '$lib/server/db';

export interface HistoryItem {
	id: string;
	analysis_type: 'waste' | 'plant';
	status: string;
	image_path: string;
	ai_model: string;
	result: Record<string, unknown>;
	created_at: string;
	// Waste details
	waste_detected_name?: string | null;
	waste_classification?: string | null;
	is_recyclable?: boolean | null;
	// Plant details
	plant_name?: string | null;
	detected_pest_disease?: string | null;
	// Signed URL
	signed_image_url?: string | null;
}

export interface HistorySummary {
	total_records: number;
	total_waste: number;
	total_plant: number;
}

export interface GetHistoryOptions {
	type?: string | null;
	search?: string | null;
	limit?: number;
	offset?: number;
}

/**
 * 1. Ambil daftar riwayat analisis milik user dengan filter & pagination
 */
export async function getUserAnalysisHistory(
	userId: string,
	options: GetHistoryOptions = {}
): Promise<HistoryItem[]> {
	const { type = null, search = null, limit = 9, offset = 0 } = options;

	const filterType = type && type !== 'all' ? type : null;
	const filterSearch = search && search.trim() !== '' ? search.trim() : null;

	const sql = `
		SELECT 
			ar.id,
			ar.analysis_type,
			ar.status,
			ar.image_path,
			ar.ai_model,
			ar.result,
			ar.created_at,
			-- Detail Sampah (jika analysis_type = 'waste')
			awd.detected_name AS waste_detected_name,
			awd.classification AS waste_classification,
			awd.is_recyclable,
			-- Detail Tanaman (jika analysis_type = 'plant')
			apd.plant_name,
			apd.detected_pest_disease
		FROM analysis_records ar
		LEFT JOIN analysis_waste_details awd ON ar.id = awd.analysis_id
		LEFT JOIN analysis_plant_details apd ON ar.id = apd.analysis_id
		WHERE ar.user_id = $1
		  AND ($2::varchar IS NULL OR ar.analysis_type = $2)
		  AND ($3::varchar IS NULL OR 
		       awd.detected_name ILIKE '%' || $3 || '%' OR 
		       apd.plant_name ILIKE '%' || $3 || '%' OR 
		       apd.detected_pest_disease ILIKE '%' || $3 || '%')
		ORDER BY ar.created_at DESC
		LIMIT $4 OFFSET $5;
	`;

	const res = await query(sql, [userId, filterType, filterSearch, limit, offset]);

	return res.rows.map((row) => ({
		id: row.id,
		analysis_type: row.analysis_type,
		status: row.status,
		image_path: row.image_path,
		ai_model: row.ai_model,
		result: typeof row.result === 'string' ? JSON.parse(row.result) : row.result || {},
		created_at: new Date(row.created_at).toISOString(),
		waste_detected_name: row.waste_detected_name,
		waste_classification: row.waste_classification,
		is_recyclable: row.is_recyclable,
		plant_name: row.plant_name,
		detected_pest_disease: row.detected_pest_disease
	}));
}

/**
 * 2. Ambil ringkasan total riwayat analisis milik user (untuk pagination & count tabs)
 */
export async function getUserHistorySummary(
	userId: string,
	search?: string | null
): Promise<HistorySummary & { filtered_count: number }> {
	const filterSearch = search && search.trim() !== '' ? search.trim() : null;

	const sql = `
		SELECT 
			COUNT(ar.id)::int AS total_records,
			COUNT(ar.id) FILTER (WHERE ar.analysis_type = 'waste')::int AS total_waste,
			COUNT(ar.id) FILTER (WHERE ar.analysis_type = 'plant')::int AS total_plant,
			COUNT(ar.id) FILTER (
				WHERE $2::varchar IS NULL OR 
				      awd.detected_name ILIKE '%' || $2 || '%' OR 
				      apd.plant_name ILIKE '%' || $2 || '%' OR 
				      apd.detected_pest_disease ILIKE '%' || $2 || '%'
			)::int AS filtered_count
		FROM analysis_records ar
		LEFT JOIN analysis_waste_details awd ON ar.id = awd.analysis_id
		LEFT JOIN analysis_plant_details apd ON ar.id = apd.analysis_id
		WHERE ar.user_id = $1;
	`;

	const res = await query(sql, [userId, filterSearch]);
	const row = res.rows[0];

	return {
		total_records: row?.total_records || 0,
		total_waste: row?.total_waste || 0,
		total_plant: row?.total_plant || 0,
		filtered_count: row?.filtered_count || 0
	};
}

/**
 * 3. Hapus catatan riwayat analisis milik user
 * Mengembalikan image_path agar file fisik di Supabase Storage dapat ikut dihapus
 */
export async function deleteAnalysisRecord(
	recordId: string,
	userId: string
): Promise<{ success: boolean; image_path?: string }> {
	// Ambil path gambar terlebih dahulu
	const checkSql = `
		SELECT image_path 
		FROM analysis_records 
		WHERE id = $1 AND user_id = $2;
	`;
	const checkRes = await query(checkSql, [recordId, userId]);

	if (checkRes.rows.length === 0) {
		return { success: false };
	}

	const imagePath = checkRes.rows[0].image_path;

	// Hapus catatan (CASCADE akan menghapus analysis_waste_details/analysis_plant_details)
	const deleteSql = `
		DELETE FROM analysis_records 
		WHERE id = $1 AND user_id = $2;
	`;
	const deleteRes = await query(deleteSql, [recordId, userId]);

	return {
		success: (deleteRes.rowCount ?? 0) > 0,
		image_path: imagePath
	};
}
