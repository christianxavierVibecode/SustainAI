import { query } from '$lib/server/db';

export interface WastePriceItem {
	id: number;
	waste_sub_category_id: number;
	sub_category_name: string;
	category_id: number;
	category_name: string;
	price: number;
	created_at: string;
}

export interface WasteSubCategoryOption {
	sub_category_id: number;
	sub_category_name: string;
	category_id: number;
	category_name: string;
}

export interface CategoryOption {
	id: number;
	name: string;
}

export interface WastePriceStats {
	total_records: number;
	total_sub_categories: number;
	average_price: number;
	max_price: number;
}

/**
 * Mengambil daftar data harga terpaginasi dengan filter kategori dan pencarian nama
 */
export async function getWastePriceList(options: {
	categoryId?: number | null;
	search?: string;
	limit?: number;
	offset?: number;
}): Promise<WastePriceItem[]> {
	const limit = options.limit ?? 10;
	const offset = options.offset ?? 0;
	const categoryId = options.categoryId ?? null;
	const search = options.search?.trim() ? `%${options.search.trim()}%` : null;

	const sql = `
		SELECT 
			wp.id,
			wp.waste_sub_category_id,
			wsc.name AS sub_category_name,
			wc.id AS category_id,
			wc.name AS category_name,
			wp.price,
			wp.created_at
		FROM waste_price wp
		JOIN waste_sub_categories wsc ON wp.waste_sub_category_id = wsc.id
		JOIN waste_categories wc ON wsc.category_id = wc.id
		WHERE 
			($1::bigint IS NULL OR wc.id = $1)
			AND ($2::text IS NULL OR wsc.name ILIKE $2 OR wc.name ILIKE $2)
		ORDER BY wp.created_at DESC, wp.id DESC
		LIMIT $3 OFFSET $4;
	`;

	const res = await query(sql, [categoryId, search, limit, offset]);

	return res.rows.map((row) => ({
		id: Number(row.id),
		waste_sub_category_id: Number(row.waste_sub_category_id),
		sub_category_name: row.sub_category_name,
		category_id: Number(row.category_id),
		category_name: row.category_name,
		price: Number(row.price),
		created_at: new Date(row.created_at).toISOString()
	}));
}

/**
 * Menghitung total jumlah baris untuk paginasi
 */
export async function countWastePrices(options: {
	categoryId?: number | null;
	search?: string;
}): Promise<number> {
	const categoryId = options.categoryId ?? null;
	const search = options.search?.trim() ? `%${options.search.trim()}%` : null;

	const sql = `
		SELECT COUNT(wp.id)::int AS total
		FROM waste_price wp
		JOIN waste_sub_categories wsc ON wp.waste_sub_category_id = wsc.id
		JOIN waste_categories wc ON wsc.category_id = wc.id
		WHERE 
			($1::bigint IS NULL OR wc.id = $1)
			AND ($2::text IS NULL OR wsc.name ILIKE $2 OR wc.name ILIKE $2);
	`;

	const res = await query(sql, [categoryId, search]);
	return res.rows[0]?.total ?? 0;
}

/**
 * Mengambil opsi relasi subkategori untuk dropdown input/edit
 */
export async function getWasteSubCategoryOptions(): Promise<WasteSubCategoryOption[]> {
	const sql = `
		SELECT 
			wsc.id AS sub_category_id,
			wsc.name AS sub_category_name,
			wc.id AS category_id,
			wc.name AS category_name
		FROM waste_sub_categories wsc
		JOIN waste_categories wc ON wsc.category_id = wc.id
		ORDER BY wc.name ASC, wsc.name ASC;
	`;

	const res = await query(sql);
	return res.rows.map((r) => ({
		sub_category_id: Number(r.sub_category_id),
		sub_category_name: r.sub_category_name,
		category_id: Number(r.category_id),
		category_name: r.category_name
	}));
}

/**
 * Mengambil daftar kategori utama untuk filter tab/dropdown
 */
export async function getWasteCategoryOptions(): Promise<CategoryOption[]> {
	const sql = `SELECT id, name FROM waste_categories ORDER BY id ASC;`;
	const res = await query(sql);
	return res.rows.map((r) => ({
		id: Number(r.id),
		name: r.name
	}));
}

/**
 * Mengambil ringkasan statistik untuk kartu metrik admin
 */
export async function getWastePriceStats(): Promise<WastePriceStats> {
	const sql = `
		SELECT 
			COUNT(wp.id)::int AS total_records,
			COUNT(DISTINCT wp.waste_sub_category_id)::int AS total_sub_categories,
			COALESCE(AVG(wp.price), 0)::numeric(12,2) AS average_price,
			COALESCE(MAX(wp.price), 0)::numeric(12,2) AS max_price
		FROM waste_price wp;
	`;

	const res = await query(sql);
	const r = res.rows[0];
	return {
		total_records: r ? Number(r.total_records) : 0,
		total_sub_categories: r ? Number(r.total_sub_categories) : 0,
		average_price: r ? Number(r.average_price) : 0,
		max_price: r ? Number(r.max_price) : 0
	};
}

/**
 * Tambah observasi harga baru (Create)
 */
export async function createWastePrice(data: {
	subCategoryId: number;
	price: number;
	createdAt?: string;
}): Promise<WastePriceItem | null> {
	const sql = `
		INSERT INTO waste_price (waste_sub_category_id, price, created_at)
		VALUES ($1, $2, COALESCE($3::timestamptz, NOW()))
		RETURNING id, waste_sub_category_id, price, created_at;
	`;

	const res = await query(sql, [data.subCategoryId, data.price, data.createdAt || null]);
	if (res.rows.length === 0) return null;

	const row = res.rows[0];
	// Ambil data join untuk respons lengkap
	const detailSql = `
		SELECT 
			wp.id,
			wp.waste_sub_category_id,
			wsc.name AS sub_category_name,
			wc.id AS category_id,
			wc.name AS category_name,
			wp.price,
			wp.created_at
		FROM waste_price wp
		JOIN waste_sub_categories wsc ON wp.waste_sub_category_id = wsc.id
		JOIN waste_categories wc ON wsc.category_id = wc.id
		WHERE wp.id = $1;
	`;
	const detailRes = await query(detailSql, [row.id]);
	const d = detailRes.rows[0];

	return {
		id: Number(d.id),
		waste_sub_category_id: Number(d.waste_sub_category_id),
		sub_category_name: d.sub_category_name,
		category_id: Number(d.category_id),
		category_name: d.category_name,
		price: Number(d.price),
		created_at: new Date(d.created_at).toISOString()
	};
}

/**
 * Perbarui data harga (Update)
 */
export async function updateWastePrice(
	id: number,
	data: {
		subCategoryId: number;
		price: number;
		createdAt?: string;
	}
): Promise<boolean> {
	const sql = `
		UPDATE waste_price
		SET 
			waste_sub_category_id = $1,
			price = $2,
			created_at = COALESCE($3::timestamptz, created_at)
		WHERE id = $4;
	`;

	const res = await query(sql, [data.subCategoryId, data.price, data.createdAt || null, id]);
	return (res.rowCount ?? 0) > 0;
}

/**
 * Hapus data harga berdasarkan id (Delete)
 */
export async function deleteWastePrice(id: number): Promise<boolean> {
	const sql = `DELETE FROM waste_price WHERE id = $1;`;
	const res = await query(sql, [id]);
	return (res.rowCount ?? 0) > 0;
}
