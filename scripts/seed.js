import dotenv from 'dotenv';
import pg from 'pg';

dotenv.config();

const { Pool } = pg;

const connectionString = process.env.DATABASE_URL;

if (!connectionString || connectionString.includes('USER:PASSWORD@HOST')) {
	console.error('❌ Error: Variabel DATABASE_URL pada file .env belum diisi dengan koneksi PostgreSQL yang valid.');
	process.exit(1);
}

const isCloudDb = connectionString.includes('supabase') || connectionString.includes('neon') || connectionString.includes('aws');

const pool = new Pool({
	connectionString,
	ssl: isCloudDb ? { rejectUnauthorized: false } : undefined
});

async function runSeed() {
	const client = await pool.connect();
	console.log('🌱 Memulai proses seeding data dummy ke database PostgreSQL...');

	try {
		await client.query('BEGIN');

		// 1. Seed users
		console.log('-> Seeding users...');
		const users = [
			{
				id: 'abef1065-b725-4998-814a-65832ed042b4',
				email: 'user@genforces.com',
				password_hash: '$2b$10$rKbHrfZce9MkU.J63NkJ5.GC.tH5Ef1Auu9zZQInDzY3F2SnP3cnm',
				full_name: 'GenForces Demo User',
				user_role: 'user',
				email_verified: true,
				created_at: '2026-11-01 13:13:47+07',
				updated_at: '2026-11-01 18:13:44+07'
			},
			{
				id: '1b3fac7c-68c6-4595-89cc-08951422f0ae',
				email: 'admin@genforces.com',
				password_hash: '$2b$10$3Om8d8PA7xai8B.yoAsOTewHscrL0ZQ0GwMw8fotyTccKhUZgA8EO',
				full_name: 'SustainAI Demo Admin',
				user_role: 'admin',
				email_verified: true,
				created_at: '2026-11-02 18:13:44+07',
				updated_at: '2026-11-02 18:13:44+07'
			}
		];

		for (const u of users) {
			await client.query(
				`INSERT INTO users (id, email, password_hash, full_name, user_role, email_verified, created_at, updated_at)
				 VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
				 ON CONFLICT (id) DO UPDATE SET
				   email = EXCLUDED.email,
				   password_hash = EXCLUDED.password_hash,
				   full_name = EXCLUDED.full_name,
				   user_role = EXCLUDED.user_role,
				   email_verified = EXCLUDED.email_verified`,
				[u.id, u.email, u.password_hash, u.full_name, u.user_role, u.email_verified, u.created_at, u.updated_at]
			);
		}

		// 2. Seed waste_categories
		console.log('-> Seeding waste_categories...');
		const wasteCategories = [
			{ id: 1, name: 'Plastik', description: 'Sampah berbahan dasar plastik yang dikelompokkan berdasarkan jenis resin dan ketebalannya.' },
			{ id: 2, name: 'Kertas dan Karton', description: 'Sampah berbahan serat kayu yang mudah dilebur kembali menjadi bubur kertas.' },
			{ id: 3, name: 'Logam', description: 'Sampah berbahan besi atau non-besi yang memiliki nilai jual relatif tinggi untuk peleburan ulang.' },
			{ id: 4, name: 'Kaca', description: 'Sampah berbahan kaca, baik dalam bentuk wadah utuh maupun pecahan (beling).' },
			{ id: 5, name: 'Khusus', description: 'Sampah kategori khusus yang memerlukan penanganan berbeda, seperti minyak goreng bekas.' }
		];

		for (const c of wasteCategories) {
			await client.query(
				`INSERT INTO waste_categories (id, name, description)
				 VALUES ($1, $2, $3)
				 ON CONFLICT (id) DO UPDATE SET
				   name = EXCLUDED.name,
				   description = EXCLUDED.description`,
				[c.id, c.name, c.description]
			);
		}

		// 3. Seed waste_sub_categories
		console.log('-> Seeding waste_sub_categories...');
		const wasteSubCategories = [
			{ id: 1, category_id: 1, name: 'PET / PETE (Kode 1)', description: 'Botol plastik bening/transparan bekas air mineral atau botol jus.' },
			{ id: 2, category_id: 1, name: 'HDPE (Kode 2)', description: 'Plastik tebal dan kaku seperti botol sampo, botol deterjen, atau jeriken.' },
			{ id: 3, category_id: 1, name: 'PP (Kode 5)', description: 'Gelas plastik bening, tutup botol, dan wadah makanan transparan.' },
			{ id: 4, category_id: 1, name: 'Plastik Campuran / Kerasan', description: 'Mainan plastik bekas, baskom rusak, atau gantungan baju.' },
			{ id: 5, category_id: 2, name: 'Kardus (Corrugated)', description: 'Kotak paket belanja online, kardus mi instan, atau kotak susu.' },
			{ id: 6, category_id: 2, name: 'Kertas Putih / Arsip', description: 'Kertas HVS bekas cetak, dokumen kantor, atau buku tulis bekas.' },
			{ id: 7, category_id: 2, name: 'Koran', description: 'Surat kabar bekas.' },
			{ id: 8, category_id: 2, name: 'Dupleks / Buram', description: 'Kertas kemasan obat, kotak jajan, atau majalah berwarna.' },
			{ id: 9, category_id: 3, name: 'Besi / Baja', description: 'Paku bekas, pagar besi rusak, seng, dan pipa besi.' },
			{ id: 10, category_id: 3, name: 'Aluminium', description: 'Kaleng minuman ringan, kaleng susu, atau wadah aluminium foil.' },
			{ id: 11, category_id: 3, name: 'Tembaga & Kuningan', description: 'Serabut bagian dalam kabel listrik atau keran air kuningan.' },
			{ id: 12, category_id: 4, name: 'Botol Kaca Utuh', description: 'Botol kecap, botol sirup, atau botol selai dalam kondisi tidak pecah.' },
			{ id: 13, category_id: 4, name: 'Kaca Pecah (Beling)', description: 'Pecahan kaca bening atau berwarna yang akan dilebur ulang.' },
			{ id: 14, category_id: 5, name: 'Minyak Jelantah', description: 'Minyak goreng bekas pakai untuk bahan baku biodiesel (per liter/kg).' }
		];

		for (const sc of wasteSubCategories) {
			await client.query(
				`INSERT INTO waste_sub_categories (id, category_id, name, description)
				 VALUES ($1, $2, $3, $4)
				 ON CONFLICT (id) DO UPDATE SET
				   category_id = EXCLUDED.category_id,
				   name = EXCLUDED.name,
				   description = EXCLUDED.description`,
				[sc.id, sc.category_id, sc.name, sc.description]
			);
		}

		// 4. Seed waste_price (42 records)
		console.log('-> Seeding waste_price (42 records)...');
		const wastePrices = [
			[1, 1, 3500, '2026-08-18 14:17:00+07'],
			[2, 6, 3000, '2026-08-19 08:24:00+07'],
			[3, 8, 1200, '2026-08-20 12:41:00+07'],
			[4, 13, 200, '2026-08-21 16:26:00+07'],
			[5, 4, 2000, '2026-08-22 09:58:00+07'],
			[6, 9, 4500, '2026-08-23 13:33:00+07'],
			[7, 1, 3600, '2026-08-24 10:06:00+07'],
			[8, 7, 1900, '2026-08-25 15:14:00+07'],
			[9, 12, 500, '2026-08-26 11:52:00+07'],
			[10, 5, 2400, '2026-08-27 08:39:00+07'],
			[11, 9, 4600, '2026-08-28 14:55:00+07'],
			[12, 2, 4100, '2026-08-29 12:27:00+07'],
			[13, 14, 6100, '2026-08-30 09:44:00+07'],
			[14, 6, 3050, '2026-08-31 16:09:00+07'],
			[15, 11, 65000, '2026-09-01 10:31:00+07'],
			[16, 3, 4600, '2026-09-02 13:18:00+07'],
			[17, 8, 1150, '2026-09-03 08:56:00+07'],
			[18, 13, 220, '2026-09-04 15:41:00+07'],
			[19, 4, 1900, '2026-09-05 11:07:00+07'],
			[20, 10, 8900, '2026-09-06 14:23:00+07'],
			[21, 2, 4000, '2026-09-07 09:12:00+07'],
			[22, 7, 2100, '2026-09-08 16:34:00+07'],
			[23, 12, 550, '2026-09-09 12:03:00+07'],
			[24, 5, 2500, '2026-09-10 10:46:00+07'],
			[25, 10, 9000, '2026-09-11 15:29:00+07'],
			[26, 3, 4500, '2026-09-12 08:17:00+07'],
			[27, 14, 6000, '2026-09-13 13:52:00+07'],
			[28, 6, 3100, '2026-09-14 11:38:00+07'],
			[29, 8, 1250, '2026-09-15 16:11:00+07'],
			[30, 11, 67000, '2026-09-16 09:26:00+07'],
			[31, 2, 4200, '2026-09-17 14:47:00+07'],
			[32, 13, 250, '2026-09-18 10:19:00+07'],
			[33, 4, 2100, '2026-09-19 17:05:00+07'],
			[34, 9, 4700, '2026-09-20 12:32:00+07'],
			[35, 7, 2000, '2026-09-21 08:43:00+07'],
			[36, 12, 500, '2026-09-22 15:16:00+07'],
			[37, 10, 9200, '2026-09-23 10:54:00+07'],
			[38, 1, 3700, '2026-09-24 13:21:00+07'],
			[39, 5, 2600, '2026-09-25 09:37:00+07'],
			[40, 14, 6200, '2026-09-26 14:08:00+07'],
			[41, 3, 4300, '2026-09-27 11:15:00+07'],
			[42, 11, 66000, '2026-09-28 16:42:00+07']
		];

		// Bersihkan atau timpa waste_price dummy untuk demo konsisten
		await client.query('DELETE FROM waste_price WHERE id <= 42');
		for (const p of wastePrices) {
			await client.query(
				`INSERT INTO waste_price (id, waste_sub_category_id, price, created_at)
				 OVERRIDING SYSTEM VALUE
				 VALUES ($1, $2, $3, $4)`,
				[p[0], p[1], p[2], p[3]]
			);
		}

		// 5. Seed analysis_records & details
		console.log('-> Seeding analysis_records & details...');
		const analysisRecords = [
			{
				id: 'f1221e2a-0dfe-4b81-b6d0-76e536cfc2df',
				user_id: 'abef1065-b725-4998-814a-65832ed042b4',
				analysis_type: 'waste',
				status: 'completed',
				image_path: 'waste/f1221e2a-0dfe-4b81-b6d0-76e536cfc2df-waste-1794232269.jpg',
				ai_provider: 'Google Gemini',
				ai_model: 'Gemini 3.5 Flash',
				prompt_version: 'waste-v1',
				result: {
					waste_name: 'Botol plastik PET',
					classification: 'Plastik',
					environmental_impact: 'Dapat bertahan lama di lingkungan jika tidak dikelola dengan benar.',
					recycling_tips: 'Kosongkan isi botol, bilas, keringkan, dan pisahkan tutupnya sesuai ketentuan fasilitas daur ulang.',
					is_recyclable: true
				},
				created_at: '2026-09-28 16:42:00+07'
			},
			{
				id: '30c5493e-3e47-44ea-bab7-13cfa97536cb',
				user_id: 'abef1065-b725-4998-814a-65832ed042b4',
				analysis_type: 'plant',
				status: 'completed',
				image_path: 'plant/30c5493e-3e47-44ea-bab7-13cfa97536cb-plant-1794232290.jpg',
				ai_provider: 'Google Gemini',
				ai_model: 'Gemini 3.5 Flash',
				prompt_version: 'plant-v1',
				result: {
					plant_name: 'Tanaman tomat',
					detected_pest_disease: 'Indikasi penyakit bercak daun',
					symptoms: 'Terlihat bercak pada permukaan daun.',
					possible_cause: 'Kemungkinan infeksi patogen; perlu pemeriksaan lebih lanjut.',
					care_recommendation: 'Pisahkan daun yang terdampak berat dan hindari membasahi daun saat penyiraman.',
					prevention_tips: 'Jaga sirkulasi udara dan pantau kondisi tanaman secara berkala.',
					plant_impact: 'Gangguan berat dapat mengurangi luas daun sehat dan produktivitas tanaman.'
				},
				created_at: '2026-09-29 11:12:00+07'
			},
			{
				id: '49927af5-d976-4fae-9a2d-b216c649a966',
				user_id: '1b3fac7c-68c6-4595-89cc-08951422f0ae',
				analysis_type: 'waste',
				status: 'completed',
				image_path: 'waste/49927af5-d976-4fae-9a2d-b216c649a966-waste-1794232290.jpg',
				ai_provider: 'Google Gemini',
				ai_model: 'Gemini 3.5 Flash',
				prompt_version: 'waste-v1',
				result: {
					waste_name: 'Kardus bekas',
					classification: 'Kertas dan Karton',
					environmental_impact: 'Penumpukan kardus dapat menambah volume sampah jika basah dan rusak.',
					recycling_tips: 'Pastikan kardus kering, lipat, dan pisahkan dari kontaminan minyak/plastik.',
					is_recyclable: true
				},
				created_at: '2026-09-30 13:22:00+07'
			}
		];

		for (const ar of analysisRecords) {
			await client.query(
				`INSERT INTO analysis_records (id, user_id, analysis_type, status, image_path, ai_provider, ai_model, prompt_version, result, created_at)
				 VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
				 ON CONFLICT (id) DO UPDATE SET
				   status = EXCLUDED.status,
				   result = EXCLUDED.result`,
				[ar.id, ar.user_id, ar.analysis_type, ar.status, ar.image_path, ar.ai_provider, ar.ai_model, ar.prompt_version, JSON.stringify(ar.result), ar.created_at]
			);
		}

		// Analysis Waste Details
		await client.query(
			`INSERT INTO analysis_waste_details (analysis_id, sub_category_id, is_recyclable, detected_name, classification, environmental_impact, recycling_tips)
			 VALUES 
			 ('f1221e2a-0dfe-4b81-b6d0-76e536cfc2df', 1, true, 'Botol plastik PET', 'Plastik', 'Dapat bertahan lama di lingkungan jika tidak dikelola.', 'Kosongkan, bilas, keringkan, lalu pilah sesuai ketentuan daur ulang.'),
			 ('49927af5-d976-4fae-9a2d-b216c649a966', 5, true, 'Kardus bekas', 'Kertas dan Karton', 'Penumpukan kardus dapat menambah volume sampah.', 'Pastikan kardus kering, lipat, dan pisahkan dari kontaminan.')
			 ON CONFLICT (analysis_id) DO UPDATE SET
			   detected_name = EXCLUDED.detected_name`
		);

		// Analysis Plant Details
		await client.query(
			`INSERT INTO analysis_plant_details (analysis_id, plant_name, detected_pest_disease, symptoms, possible_cause, care_recommendation, prevention_tips, plant_impact)
			 VALUES 
			 ('30c5493e-3e47-44ea-bab7-13cfa97536cb', 'Tanaman tomat', 'Indikasi penyakit bercak daun', 'Terlihat bercak pada permukaan daun.', 'Kemungkinan infeksi patogen; perlu pemeriksaan lebih lanjut.', 'Pisahkan daun yang terdampak berat dan hindari membasahi daun saat penyiraman.', 'Jaga sirkulasi udara dan pantau kondisi tanaman secara berkala.', 'Gangguan berat dapat mengurangi luas daun sehat dan produktivitas tanaman.')
			 ON CONFLICT (analysis_id) DO UPDATE SET
			   plant_name = EXCLUDED.plant_name`
		);

		await client.query('COMMIT');
		console.log('✅ Seeding database berhasil selesai tanpa kendala!');
	} catch (err) {
		await client.query('ROLLBACK');
		console.error('❌ Gagal menjalankan seeding database:', err);
		process.exit(1);
	} finally {
		client.release();
		await pool.end();
	}
}

runSeed();
