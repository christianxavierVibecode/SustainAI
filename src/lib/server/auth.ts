import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import type { Cookies } from '@sveltejs/kit';
import type { UserRole } from '$lib/server/db/users';

const JWT_SECRET = process.env.JWT_SECRET || 'sustainai-secret-default-key-change-in-prod';
const AUTH_COOKIE_NAME = 'sustainai_session';

export interface AuthTokenPayload {
	id: string;
	email: string;
	full_name: string | null;
	user_role: UserRole;
}

/**
 * Hash plain password menggunakan bcrypt
 */
export async function hashPassword(plainText: string): Promise<string> {
	const salt = await bcrypt.genSalt(10);
	return bcrypt.hash(plainText, salt);
}

/**
 * Bandingkan plain password dengan hash yang tersimpan
 */
export async function comparePassword(plainText: string, hashed: string): Promise<boolean> {
	return bcrypt.compare(plainText, hashed);
}

/**
 * Generate JWT token
 */
export function signToken(payload: AuthTokenPayload): string {
	return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });
}

/**
 * Verifikasi dan decode JWT token
 */
export function verifyToken(token: string): AuthTokenPayload | null {
	try {
		return jwt.verify(token, JWT_SECRET) as AuthTokenPayload;
	} catch {
		return null;
	}
}

/**
 * Set HTTP-Only authentication cookie
 */
export function setAuthCookie(cookies: Cookies, token: string) {
	cookies.set(AUTH_COOKIE_NAME, token, {
		path: '/',
		httpOnly: true,
		sameSite: 'lax',
		secure: process.env.NODE_ENV === 'production',
		maxAge: 60 * 60 * 24 * 7 // 7 hari
	});
}

/**
 * Hapus authentication cookie (logout)
 */
export function clearAuthCookie(cookies: Cookies) {
	cookies.delete(AUTH_COOKIE_NAME, {
		path: '/'
	});
}

/**
 * Ambil token dari cookie
 */
export function getAuthToken(cookies: Cookies): string | undefined {
	return cookies.get(AUTH_COOKIE_NAME);
}
