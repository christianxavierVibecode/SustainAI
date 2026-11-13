import { query, pool } from '$lib/server/db';
import type { WasteAnalysisResult, PlantAnalysisResult } from '$lib/server/ai/gemini';

export interface WastePriceReference {
	sub_category_id: number;
	sub_category_name: string;
	category_name: string;
	current_price: number;
	unit: string;
	price_history?: { price: number; date: string }[];
}

/**
 * Mencari referensi harga Bank Sampah berdasarkan kemiripan nama / klasifikasi sampah
 */
export async function findWastePriceReference(
	detectedName: string,
	classification: string
): Promise<WastePriceReference | null> {
	try {
		// Cari subkategori yang paling relevan berdasarkan string matching (case-insensitive)
		const subCatSql = `
			SELECT wsc.id AS sub_category_id, wsc.name AS sub_category_name, wc.name AS category_name
			FROM waste_sub_categories wsc
			JOIN waste_categories wc ON wsc.category_id = wc.id
			WHERE LOWER(wsc.name) LIKE LOWER($1) 
			   OR LOWER($2) LIKE LOWER('%' || wsc.name || '%')
			   OR LOWER(wc.name) = LOWER($3)
			ORDER BY 
				CASE 
					WHEN LOWER(wsc.name) LIKE LOWER($1) THEN 1
					WHEN LOWER($2) LIKE LOWER('%' || wsc.name || '%') THEN 2
					ELSE 3
				END
			LIMIT 1;
		`;

		const subCatRes = await query(subCatSql, [
			`%${detectedName.trim()}%`,
			detectedName.trim(),
			classification.trim()
		]);

		if (subCatRes.rows.length === 0) {
			return null;
		}

		const subCat = subCatRes.rows[0];

		// Ambil harga terkini dari subkategori tersebut
		const priceSql = `
			SELECT price, created_at
			FROM waste_price
			WHERE waste_sub_category_id = $1
			ORDER BY created_at DESC
			LIMIT 5;
		`;

		const priceRes = await query(priceSql, [subCat.sub_category_id]);
		const currentPrice = priceRes.rows[0]?.price ? Number(priceRes.rows[0].price) : 0;

		return {
			sub_category_id: subCat.sub_category_id,
			sub_category_name: subCat.sub_category_name,
			category_name: subCat.category_name,
			current_price: currentPrice,
			unit: 'kg',
			price_history: priceRes.rows.map((r) => ({
				price: Number(r.price),
				date: new Date(r.created_at).toISOString()
			}))
		};
	} catch (err) {
		console.error('[findWastePriceReference error]:', err);
		return null;
	}
}

/**
 * Menyimpan hasil analisis sampah secara transaksional
 */
export async function saveWasteAnalysisTransaction(
	analysisId: string,
	userId: string,
	imagePath: string,
	geminiResult: WasteAnalysisResult,
	priceRef: WastePriceReference | null
): Promise<void> {
	const client = await pool.connect();
	try {
		await client.query('BEGIN');

		// 1. Insert analysis_records
		const insertRecordSql = `
			INSERT INTO analysis_records (
				id, user_id, analysis_type, status, image_path,
				ai_provider, ai_model, prompt_version, result, created_at
			) VALUES (
				$1, $2, 'waste', 'completed', $3,
				'Google Gemini', 'gemini-3.5-flash', 'waste-v1', $4, NOW()
			);
		`;
		await client.query(insertRecordSql, [
			analysisId,
			userId,
			imagePath,
			JSON.stringify(geminiResult)
		]);

		// 2. Insert analysis_waste_details
		const insertWasteDetailSql = `
			INSERT INTO analysis_waste_details (
				analysis_id, sub_category_id, is_recyclable,
				detected_name, classification, environmental_impact, recycling_tips
			) VALUES (
				$1, $2, $3, $4, $5, $6, $7
			);
		`;
		await client.query(insertWasteDetailSql, [
			analysisId,
			priceRef?.sub_category_id || null,
			geminiResult.is_recyclable,
			geminiResult.waste_name,
			geminiResult.classification,
			geminiResult.environmental_impact,
			geminiResult.recycling_tips
		]);

		await client.query('COMMIT');
	} catch (err) {
		await client.query('ROLLBACK');
		console.error('[saveWasteAnalysisTransaction rollback]:', err);
		throw err;
	} finally {
		client.release();
	}
}

/**
 * Menyimpan hasil analisis tanaman secara transaksional
 */
export async function savePlantAnalysisTransaction(
	analysisId: string,
	userId: string,
	imagePath: string,
	geminiResult: PlantAnalysisResult
): Promise<void> {
	const client = await pool.connect();
	try {
		await client.query('BEGIN');

		// 1. Insert analysis_records
		const insertRecordSql = `
			INSERT INTO analysis_records (
				id, user_id, analysis_type, status, image_path,
				ai_provider, ai_model, prompt_version, result, created_at
			) VALUES (
				$1, $2, 'plant', 'completed', $3,
				'Google Gemini', 'gemini-3.5-flash', 'plant-v1', $4, NOW()
			);
		`;
		await client.query(insertRecordSql, [
			analysisId,
			userId,
			imagePath,
			JSON.stringify(geminiResult)
		]);

		// 2. Insert analysis_plant_details
		const insertPlantDetailSql = `
			INSERT INTO analysis_plant_details (
				analysis_id, plant_name, detected_pest_disease, symptoms,
				possible_cause, care_recommendation, prevention_tips, plant_impact
			) VALUES (
				$1, $2, $3, $4, $5, $6, $7, $8
			);
		`;
		await client.query(insertPlantDetailSql, [
			analysisId,
			geminiResult.plant_name,
			geminiResult.detected_pest_disease,
			geminiResult.symptoms,
			geminiResult.possible_cause,
			geminiResult.care_recommendation,
			geminiResult.prevention_tips,
			geminiResult.plant_impact
		]);

		await client.query('COMMIT');
	} catch (err) {
		await client.query('ROLLBACK');
		console.error('[savePlantAnalysisTransaction rollback]:', err);
		throw err;
	} finally {
		client.release();
	}
}
