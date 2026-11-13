import pg from 'pg';
import dotenv from 'dotenv';

// Muat variabel environment dari file .env (jika belum dimuat oleh runtime)
dotenv.config();

const { Pool } = pg;

// Ambil DATABASE_URL dari process.env (Node runtime)
const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
	console.warn('[Database] Peringatan: DATABASE_URL belum dikonfigurasi di environment server.');
}

const isCloudDb =
	connectionString?.includes('supabase') ||
	connectionString?.includes('neon') ||
	connectionString?.includes('render') ||
	connectionString?.includes('aws');

export const pool = new Pool({
	connectionString,
	ssl: isCloudDb ? { rejectUnauthorized: false } : undefined,
	max: 10,
	idleTimeoutMillis: 30000,
	connectionTimeoutMillis: 5000
});

export const query = (text: string, params?: unknown[]) => pool.query(text, params);
