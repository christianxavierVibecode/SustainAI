import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import pg from 'pg';

dotenv.config();

const { Pool } = pg;

const connectionString = process.env.DATABASE_URL;

if (!connectionString || connectionString.includes('USER:PASSWORD@HOST')) {
	console.error('❌ Error: Variabel DATABASE_URL pada file .env belum diisi dengan koneksi PostgreSQL yang valid.');
	console.error('Contoh: DATABASE_URL="postgresql://postgres.[REF]:[PASS]@aws-0-[REGION].pooler.supabase.com:6543/postgres"');
	process.exit(1);
}

const isCloudDb = connectionString.includes('supabase') || connectionString.includes('neon') || connectionString.includes('aws');

const pool = new Pool({
	connectionString,
	ssl: isCloudDb ? { rejectUnauthorized: false } : undefined
});

async function runMigration() {
	const schemaPath = path.resolve(process.cwd(), 'DevReferences/Database/schema.sql');
	if (!fs.existsSync(schemaPath)) {
		console.error(`❌ File schema tidak ditemukan di: ${schemaPath}`);
		process.exit(1);
	}

	const sql = fs.readFileSync(schemaPath, 'utf8');
	console.log('🔄 Memulai eksekusi migrasi schema PostgreSQL dari DevReferences/Database/schema.sql...');

	const client = await pool.connect();
	try {
		await client.query('BEGIN');
		await client.query(sql);
		await client.query('COMMIT');
		console.log('✅ Migrasi skema database berhasil dieksekusi! Seluruh tabel dan indeks telah dibuat.');
	} catch (err) {
		await client.query('ROLLBACK');
		console.error('❌ Gagal menjalankan migrasi schema:', err);
		process.exit(1);
	} finally {
		client.release();
		await pool.end();
	}
}

runMigration();
