import { query } from '$lib/server/db';

export type UserRole = 'admin' | 'user';

export interface UserRecord {
	id: string;
	email: string;
	password_hash: string;
	full_name: string | null;
	user_role: UserRole;
	email_verified: boolean;
	created_at: Date;
	updated_at: Date;
}

/**
 * Cari pengguna berdasarkan alamat email
 */
export async function findUserByEmail(email: string): Promise<UserRecord | null> {
	const res = await query(
		`SELECT id, email, password_hash, full_name, user_role, email_verified, created_at, updated_at 
     FROM users 
     WHERE LOWER(email) = LOWER($1) 
     LIMIT 1`,
		[email.trim()]
	);

	if (res.rows.length === 0) return null;
	return res.rows[0] as UserRecord;
}

/**
 * Cari pengguna berdasarkan UUID
 */
export async function findUserById(id: string): Promise<UserRecord | null> {
	const res = await query(
		`SELECT id, email, password_hash, full_name, user_role, email_verified, created_at, updated_at 
     FROM users 
     WHERE id = $1 
     LIMIT 1`,
		[id]
	);

	if (res.rows.length === 0) return null;
	return res.rows[0] as UserRecord;
}

/**
 * Buat akun baru pengguna (default user_role: 'user', email_verified: false)
 */
export async function createUser(
	email: string,
	passwordHash: string,
	fullName: string,
	role: UserRole = 'user'
): Promise<UserRecord> {
	const res = await query(
		`INSERT INTO users (email, password_hash, full_name, user_role, email_verified)
     VALUES (LOWER($1), $2, $3, $4, FALSE)
     RETURNING id, email, password_hash, full_name, user_role, email_verified, created_at, updated_at`,
		[email.trim(), passwordHash, fullName.trim(), role]
	);

	return res.rows[0] as UserRecord;
}

/**
 * Verifikasi email pengguna
 */
export async function verifyUserEmail(userId: string): Promise<boolean> {
	const res = await query(
		`UPDATE users 
     SET email_verified = TRUE, updated_at = NOW() 
     WHERE id = $1`,
		[userId]
	);

	return (res.rowCount ?? 0) > 0;
}

/**
 * Update profil pengguna
 */
export async function updateUserProfile(
	userId: string,
	data: { full_name?: string }
): Promise<UserRecord | null> {
	const res = await query(
		`UPDATE users 
     SET full_name = COALESCE($2, full_name), updated_at = NOW() 
     WHERE id = $1
     RETURNING id, email, password_hash, full_name, user_role, email_verified, created_at, updated_at`,
		[userId, data.full_name]
	);

	if (res.rows.length === 0) return null;
	return res.rows[0] as UserRecord;
}
