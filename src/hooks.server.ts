import type { Handle } from '@sveltejs/kit/hooks';
import { redirect } from '@sveltejs/kit';
import { getAuthToken, verifyToken } from '$lib/server/auth';
import { findUserById } from '$lib/server/db/users';

export const handle: Handle = async ({ event, resolve }) => {
	const token = getAuthToken(event.cookies);

	if (token) {
		const payload = verifyToken(token);
		if (payload && payload.id) {
			try {
				const user = await findUserById(payload.id);
				if (user) {
					event.locals.user = {
						id: user.id,
						email: user.email,
						full_name: user.full_name,
						user_role: user.user_role,
						email_verified: user.email_verified
					};
				} else {
					event.locals.user = null;
				}
			} catch (err) {
				console.error('[hooks.server.ts] Error checking user session:', err);
				event.locals.user = null;
			}
		} else {
			event.locals.user = null;
		}
	} else {
		event.locals.user = null;
	}

	const { pathname } = event.url;
	const user = event.locals.user;

	// Route Guard untuk Dashboard User (/dashboard/*)
	if (pathname.startsWith('/dashboard')) {
		if (!user) {
			throw redirect(303, `/get-started?redirectTo=${encodeURIComponent(pathname)}`);
		}

		if (user.user_role !== 'user') {
			// Admin diarahkan ke panel admin jika mencoba mengakses dashboard user biasa
			throw redirect(303, '/admin');
		}
	}

	// Route Guard untuk Admin Panel (/admin/*)
	if (pathname.startsWith('/admin')) {
		if (!user) {
			throw redirect(303, `/get-started?redirectTo=${encodeURIComponent(pathname)}`);
		}

		if (user.user_role !== 'admin') {
			// User biasa dilarang mengakses panel admin
			throw redirect(303, '/dashboard/overview');
		}
	}

	// Jika pengguna sudah terautentikasi dan mencoba mengakses /get-started
	if (pathname === '/get-started' && user) {
		if (user.user_role === 'admin') {
			throw redirect(303, '/admin');
		} else {
			throw redirect(303, '/dashboard/overview');
		}
	}

	return resolve(event);
};
