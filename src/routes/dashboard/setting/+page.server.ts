import { fail } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';
import { getUserProfileById, updateUserProfile, updateUserPassword } from '$lib/server/db/users';
import { comparePassword, hashPassword, signToken, setAuthCookie } from '$lib/server/auth';

export const load: PageServerLoad = async ({ locals }) => {
	// Locals sudah diverifikasi oleh hooks.server.ts & dashboard layout
	const userId = locals.user?.id;
	if (!userId) {
		return { profile: null };
	}

	const profile = await getUserProfileById(userId);

	return {
		profile: profile
			? {
					id: profile.id,
					email: profile.email,
					full_name: profile.full_name,
					user_role: profile.user_role,
					email_verified: profile.email_verified,
					created_at: profile.created_at.toISOString(),
					updated_at: profile.updated_at.toISOString()
				}
			: null
	};
};

export const actions: Actions = {
	updateProfile: async ({ request, locals, cookies }) => {
		if (!locals.user?.id) {
			return fail(401, {
				profileError: 'Sesi anda telah berakhir. Silakan login kembali.'
			});
		}

		const formData = await request.formData();
		const fullName = formData.get('full_name')?.toString().trim() ?? '';

		if (!fullName) {
			return fail(400, {
				profileError: 'Nama lengkap tidak boleh kosong.',
				fullName
			});
		}

		if (fullName.length < 2 || fullName.length > 100) {
			return fail(400, {
				profileError: 'Nama lengkap harus antara 2 hingga 100 karakter.',
				fullName
			});
		}

		try {
			const updated = await updateUserProfile(locals.user.id, { full_name: fullName });

			if (!updated) {
				return fail(500, {
					profileError: 'Gagal memperbarui profil pengguna.',
					fullName
				});
			}

			// Perbarui JWT session cookie agar sinkron di seluruh komponen layout
			const newToken = signToken({
				id: updated.id,
				email: updated.email,
				full_name: updated.full_name,
				user_role: updated.user_role
			});
			setAuthCookie(cookies, newToken);

			return {
				profileSuccess: 'Profil Anda berhasil diperbarui.'
			};
		} catch (err) {
			console.error('[Account Setting] Error updating profile:', err);
			return fail(500, {
				profileError: 'Terjadi kesalahan sistem saat menyimpan profil.',
				fullName
			});
		}
	},

	updatePassword: async ({ request, locals }) => {
		if (!locals.user?.id) {
			return fail(401, {
				passwordError: 'Sesi anda telah berakhir. Silakan login kembali.'
			});
		}

		const formData = await request.formData();
		const currentPassword = formData.get('current_password')?.toString() ?? '';
		const newPassword = formData.get('new_password')?.toString() ?? '';
		const confirmPassword = formData.get('confirm_password')?.toString() ?? '';

		if (!currentPassword) {
			return fail(400, {
				passwordError: 'Kata sandi saat ini harus diisi.'
			});
		}

		if (!newPassword || newPassword.length < 8) {
			return fail(400, {
				passwordError: 'Kata sandi baru minimal harus 8 karakter.'
			});
		}

		if (newPassword !== confirmPassword) {
			return fail(400, {
				passwordError: 'Konfirmasi kata sandi baru tidak cocok.'
			});
		}

		try {
			// 1. Ambil data pengguna saat ini untuk memverifikasi password hash lama
			const user = await getUserProfileById(locals.user.id);
			if (!user) {
				return fail(404, {
					passwordError: 'Pengguna tidak ditemukan.'
				});
			}

			// 2. Verifikasi current password
			const isMatch = await comparePassword(currentPassword, user.password_hash);
			if (!isMatch) {
				return fail(400, {
					passwordError: 'Kata sandi saat ini yang Anda masukkan salah.'
				});
			}

			// 3. Pastikan password baru tidak sama persis dengan password lama
			const isSame = await comparePassword(newPassword, user.password_hash);
			if (isSame) {
				return fail(400, {
					passwordError: 'Kata sandi baru tidak boleh sama dengan kata sandi lama.'
				});
			}

			// 4. Hash password baru & simpan ke DB
			const newHashed = await hashPassword(newPassword);
			const success = await updateUserPassword(locals.user.id, newHashed);

			if (!success) {
				return fail(500, {
					passwordError: 'Gagal memperbarui kata sandi. Silakan coba beberapa saat lagi.'
				});
			}

			return {
				passwordSuccess: 'Kata sandi berhasil diperbarui.'
			};
		} catch (err) {
			console.error('[Account Setting] Error updating password:', err);
			return fail(500, {
				passwordError: 'Terjadi kesalahan sistem saat memperbarui kata sandi.'
			});
		}
	}
};
