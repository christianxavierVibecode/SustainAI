import { query } from '$lib/server/db';

export interface DashboardOverviewStats {
	total_analysis: number;
	total_waste: number;
	total_plant: number;
	recyclable_waste: number;
}

export interface WastePriceTrendRecord {
	sub_category_id: number;
	sub_category_name: string;
	category_name: string;
	price: number;
	created_at: string;
}

export interface WasteCompositionRecord {
	category_name: string;
	total_count: number;
}

export interface RecentActivityRecord {
	id: string;
	analysis_type: 'waste' | 'plant';
	status: string;
	image_path: string;
	ai_model: string;
	created_at: string;
	title: string;
	subtitle: string;
	badge: string;
	is_recyclable?: boolean;
}

/**
 * 1. Mengambil ringkasan 4 indikator metrik utama pengguna
 */
export async function getDashboardOverviewStats(userId: string): Promise<DashboardOverviewStats> {
	const sql = `
		SELECT 
			COUNT(ar.id)::int AS total_analysis,
			COUNT(ar.id) FILTER (WHERE ar.analysis_type = 'waste')::int AS total_waste,
			COUNT(ar.id) FILTER (WHERE ar.analysis_type = 'plant')::int AS total_plant,
			COUNT(ar.id) FILTER (WHERE ar.analysis_type = 'waste' AND awd.is_recyclable = TRUE)::int AS recyclable_waste
		FROM analysis_records ar
		LEFT JOIN analysis_waste_details awd ON ar.id = awd.analysis_id
		WHERE ar.user_id = $1 AND ar.status = 'completed';
	`;

	const res = await query(sql, [userId]);
	const row = res.rows[0];

	return {
		total_analysis: row?.total_analysis || 0,
		total_waste: row?.total_waste || 0,
		total_plant: row?.total_plant || 0,
		recyclable_waste: row?.recyclable_waste || 0
	};
}

/**
 * 2. Mengambil riwayat tren harga sampah dari tabel waste_price
 */
export async function getWastePriceTrends(): Promise<WastePriceTrendRecord[]> {
	const sql = `
		SELECT 
			wsc.id AS sub_category_id,
			wsc.name AS sub_category_name,
			wc.name AS category_name,
			wp.price,
			wp.created_at
		FROM waste_price wp
		JOIN waste_sub_categories wsc ON wp.waste_sub_category_id = wsc.id
		JOIN waste_categories wc ON wsc.category_id = wc.id
		ORDER BY wp.created_at ASC;
	`;

	const res = await query(sql);
	return res.rows.map((row) => ({
		sub_category_id: row.sub_category_id,
		sub_category_name: row.sub_category_name,
		category_name: row.category_name,
		price: Number(row.price),
		created_at: new Date(row.created_at).toISOString()
	}));
}

/**
 * 3. Mengambil komposisi kategori sampah yang dianalisis pengguna
 */
export async function getWasteCompositionStats(userId: string): Promise<WasteCompositionRecord[]> {
	const sql = `
		SELECT 
			COALESCE(wc.name, awd.classification, 'Lainnya') AS category_name,
			COUNT(awd.analysis_id)::int AS total_count
		FROM analysis_records ar
		JOIN analysis_waste_details awd ON ar.id = awd.analysis_id
		LEFT JOIN waste_sub_categories wsc ON awd.sub_category_id = wsc.id
		LEFT JOIN waste_categories wc ON wsc.category_id = wc.id
		WHERE ar.user_id = $1 AND ar.status = 'completed'
		GROUP BY category_name
		ORDER BY total_count DESC;
	`;

	const res = await query(sql, [userId]);
	return res.rows.map((row) => ({
		category_name: row.category_name,
		total_count: Number(row.total_count)
	}));
}

/**
 * 4. Mengambil daftar 5 aktivitas analisis terakhir pengguna
 */
export async function getRecentActivities(
	userId: string,
	limit: number = 5
): Promise<RecentActivityRecord[]> {
	const sql = `
		SELECT 
			ar.id,
			ar.analysis_type,
			ar.status,
			ar.image_path,
			ar.ai_model,
			ar.created_at,
			awd.detected_name AS waste_detected_name,
			awd.classification AS waste_classification,
			awd.is_recyclable AS waste_is_recyclable,
			apd.plant_name,
			apd.detected_pest_disease
		FROM analysis_records ar
		LEFT JOIN analysis_waste_details awd ON ar.id = awd.analysis_id
		LEFT JOIN analysis_plant_details apd ON ar.id = apd.analysis_id
		WHERE ar.user_id = $1
		ORDER BY ar.created_at DESC
		LIMIT $2;
	`;

	const res = await query(sql, [userId, limit]);
	return res.rows.map((row) => {
		const isWaste = row.analysis_type === 'waste';
		return {
			id: row.id,
			analysis_type: row.analysis_type,
			status: row.status,
			image_path: row.image_path,
			ai_model: row.ai_model,
			created_at: new Date(row.created_at).toISOString(),
			title: isWaste
				? row.waste_detected_name || 'Sampah Terdeteksi'
				: row.plant_name || 'Tanaman Terdeteksi',
			subtitle: isWaste
				? row.waste_classification || 'Klasifikasi Daur Ulang'
				: row.detected_pest_disease || 'Kondisi Tanaman',
			badge: isWaste
				? row.waste_is_recyclable
					? 'Dapat Didaur Ulang'
					: 'Residu / Non-Recyclable'
				: 'Diagnosis AI',
			is_recyclable: isWaste ? Boolean(row.waste_is_recyclable) : undefined
		};
	});
}
