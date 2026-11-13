import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { findUserByEmail, createUser } from '$lib/server/db/users';
import { comparePassword, hashPassword, setAuthCookie, signToken } from '$lib/server/auth';

export const load: PageServerLoad = async ({ locals, url }) => {
	if (locals.user) {
		if (locals.user.user_role === 'admin') {
			throw redirect(303, '/admin');
		} else {
			throw redirect(303, '/dashboard/overview');
		}
	}

	return {
		mode: url.searchParams.get('mode') === 'register' ? 'register' : 'login',
		redirectTo: url.searchParams.get('redirectTo') || ''
	};
};

export const actions: Actions = {
	login: async ({ request, cookies, url }) => {
		const formData = await request.formData();
		const email = String(formData.get('email') || '').trim();
		const password = String(formData.get('password') || '');
		const redirectTo = String(formData.get('redirectTo') || url.searchParams.get('redirectTo') || '');

		if (!email || !password) {
			return fail(400, {
				mode: 'login',
				error: 'Email dan password wajib diisi.',
				email
			});
		}

		try {
			const user = await findUserByEmail(email);
			if (!user) {
				return fail(400, {
					mode: 'login',
					error: 'Kombinasi email atau kata sandi tidak ditemukan.',
					email
				});
			}

			const passwordMatch = await comparePassword(password, user.password_hash);
			if (!passwordMatch) {
				return fail(400, {
					mode: 'login',
					error: 'Kombinasi email atau kata sandi tidak sesuai.',
					email
				});
			}

			// Cek apakah akun belum diverifikasi
			if (!user.email_verified) {
				// Arahkan ke halaman verifikasi OTP
				throw redirect(303, `/get-started/verify-otp?email=${encodeURIComponent(user.email)}`);
			}

			// Buat session JWT cookie
			const token = signToken({
				id: user.id,
				email: user.email,
				full_name: user.full_name,
				user_role: user.user_role
			});

			setAuthCookie(cookies, token);

			// Redirect sesuai peran user
			if (user.user_role === 'admin') {
				throw redirect(303, '/admin');
			}

			if (redirectTo && redirectTo.startsWith('/dashboard')) {
				throw redirect(303, redirectTo);
			}

			throw redirect(303, '/dashboard/overview');
		} catch (err) {
			// Jika err adalah SvelteKit redirect response, rethrow
			if (err && typeof err === 'object' && 'status' in err && 'location' in err) {
				throw err;
			}
			console.error('[Action: login] error:', err);
			return fail(500, {
				mode: 'login',
				error: 'Terjadi kendala pada server saat memproses login. Silakan coba beberapa saat lagi.',
				email
			});
		}
	},

	register: async ({ request }) => {
		const formData = await request.formData();
		const fullName = String(formData.get('name') || '').trim();
		const email = String(formData.get('email') || '').trim();
		const password = String(formData.get('password') || '');
		const confirm = String(formData.get('confirm') || '');

		if (!fullName || !email || !password) {
			return fail(400, {
				mode: 'register',
				error: 'Nama lengkap, email, dan kata sandi wajib diisi.',
				fullName,
				email
			});
		}

		if (password.length < 6) {
			return fail(400, {
				mode: 'register',
				error: 'Kata sandi minimal harus 6 karakter.',
				fullName,
				email
			});
		}

		if (password !== confirm) {
			return fail(400, {
				mode: 'register',
				error: 'Konfirmasi kata sandi tidak cocok.',
				fullName,
				email
			});
		}

		try {
			const existingUser = await findUserByEmail(email);
			if (existingUser) {
				return fail(400, {
					mode: 'register',
					error: 'Alamat email ini sudah terdaftar. Silakan masuk menggunakan tab Sign In.',
					fullName,
					email
				});
			}

			const passwordHash = await hashPassword(password);
			await createUser(email, passwordHash, fullName, 'user');

			// Arahkan ke halaman verifikasi OTP
			throw redirect(303, `/get-started/verify-otp?email=${encodeURIComponent(email)}`);
		} catch (err) {
			if (err && typeof err === 'object' && 'status' in err && 'location' in err) {
				throw err;
			}
			console.error('[Action: register] error:', err);
			return fail(500, {
				mode: 'register',
				error: 'Gagal membuat akun baru. Pastikan koneksi database aktif dan coba lagi.',
				fullName,
				email
			});
		}
	},

	logout: async ({ cookies }) => {
		cookies.delete('sustainai_session', { path: '/' });
		throw redirect(303, '/get-started');
	}
};
