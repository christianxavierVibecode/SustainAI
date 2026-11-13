import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { findUserByEmail, verifyUserEmail } from '$lib/server/db/users';
import { setAuthCookie, signToken } from '$lib/server/auth';

const DEMO_OTP = process.env.DEMO_OTP_CODE || '123456';

export const load: PageServerLoad = async ({ url, locals }) => {
	if (locals.user) {
		if (locals.user.user_role === 'admin') {
			throw redirect(303, '/admin');
		} else {
			throw redirect(303, '/dashboard/overview');
		}
	}

	const email = url.searchParams.get('email') || '';
	if (!email) {
		throw redirect(303, '/get-started');
	}

	return {
		email,
		demoOtpCode: DEMO_OTP
	};
};

export const actions: Actions = {
	default: async ({ request, cookies }) => {
		const formData = await request.formData();
		const email = String(formData.get('email') || '').trim();
		const otp = String(formData.get('otp') || '').trim();

		if (!email || !otp) {
			return fail(400, {
				error: 'Email dan kode verifikasi OTP wajib diisi.',
				email
			});
		}

		if (otp !== DEMO_OTP) {
			return fail(400, {
				error: 'Kode verifikasi tidak sesuai. Gunakan kode pengujian demo 123456.',
				email
			});
		}

		try {
			const user = await findUserByEmail(email);
			if (!user) {
				return fail(404, {
					error: 'Data pengguna tidak ditemukan. Silakan lakukan registrasi ulang.',
					email
				});
			}

			// Aktifkan verifikasi email di database
			await verifyUserEmail(user.id);

			// Buat session cookie login
			const token = signToken({
				id: user.id,
				email: user.email,
				full_name: user.full_name,
				user_role: user.user_role
			});

			setAuthCookie(cookies, token);

			if (user.user_role === 'admin') {
				throw redirect(303, '/admin');
			}

			throw redirect(303, '/dashboard/overview');
		} catch (err) {
			if (err && typeof err === 'object' && 'status' in err && 'location' in err) {
				throw err;
			}
			console.error('[Action verify-otp] error:', err);
			return fail(500, {
				error: 'Terjadi kendala saat memverifikasi akun. Silakan coba kembali.',
				email
			});
		}
	}
};
