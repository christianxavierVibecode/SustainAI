<script lang="ts">
	import { enhance } from '$app/forms';
	import type { PageProps } from './$types';

	let { data, form }: PageProps = $props();

	// Local form state
	let fullName = $state('');
	$effect(() => {
		if (data.profile?.full_name !== undefined) {
			fullName = data.profile.full_name ?? '';
		}
	});
	let currentPassword = $state('');
	let newPassword = $state('');
	let confirmPassword = $state('');

	// Toggle visibility password
	let showCurrentPassword = $state(false);
	let showNewPassword = $state(false);
	let showConfirmPassword = $state(false);

	// Status loading form
	let isSavingProfile = $state(false);
	let isSavingPassword = $state(false);

	// Client-side validation message for password mismatch
	let clientPasswordError = $derived(
		confirmPassword && newPassword !== confirmPassword
			? 'Konfirmasi kata sandi tidak cocok dengan kata sandi baru.'
			: ''
	);

	// Inisial avatar pengguna
	let userInitials = $derived(
		(fullName || data.profile?.email || 'U')
			.split(' ')
			.map((n: string) => n[0])
			.slice(0, 2)
			.join('')
			.toUpperCase()
	);

	// Format tanggal bergabung
	function formatDate(isoString?: string | null) {
		if (!isoString) return '-';
		try {
			const d = new Date(isoString);
			return d.toLocaleDateString('id-ID', {
				day: 'numeric',
				month: 'long',
				year: 'numeric'
			});
		} catch {
			return isoString;
		}
	}
</script>

<svelte:head>
	<title>Pengaturan Akun & Keamanan | SustainAI</title>
</svelte:head>

<div class="space-y-8 max-w-5xl mx-auto pb-12">
	<!-- HEADER HALAMAN -->
	<div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-border-subtle">
		<div>
			<div class="flex items-center gap-3">
				<h1 class="text-2xl font-display font-extrabold text-text-strong tracking-tight">
					Pengaturan Akun
				</h1>
				<span class="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-brand-mint-subtle text-primary border border-border-focus/30">
					Profil & Keamanan
				</span>
			</div>
			<p class="text-sm text-text-muted mt-1">
				Kelola informasi profil pribadi, visibilitas identitas akun, serta keamanan kata sandi Anda.
			</p>
		</div>
		<div class="flex items-center gap-2">
			<span class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-surface-card border border-border-subtle text-text-strong shadow-xs">
				<span class="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
				Akun Terverifikasi
			</span>
		</div>
	</div>

	<!-- GRID DUA KOLOM: PROFIL & GANTI PASSWORD -->
	<div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
		
		<!-- ========================================================= -->
		<!-- SECTION 1: PROFIL & INFORMASI AKUN (COL 7)               -->
		<!-- ========================================================= -->
		<div class="lg:col-span-7 space-y-6">
			<div class="bg-surface-card rounded-2xl border border-border-subtle p-6 sm:p-7 shadow-xs">
				<div class="flex items-center justify-between pb-4 border-b border-border-subtle">
					<div class="flex items-center gap-3">
						<div class="w-10 h-10 rounded-xl bg-brand-mint-subtle flex items-center justify-center text-primary border border-border-focus/20 shadow-xs">
							<span class="material-symbols-outlined text-[22px]">badge</span>
						</div>
						<div>
							<h2 class="text-base font-bold text-text-strong">Informasi Pribadi</h2>
							<p class="text-xs text-text-muted">Perbarui data identitas yang ditampilkan di seluruh platform.</p>
						</div>
					</div>
					<span class="px-2.5 py-1 rounded-lg text-xs font-bold uppercase tracking-wider bg-surface-base text-text-muted border border-border-subtle">
						{data.profile?.user_role || 'user'}
					</span>
				</div>

				<!-- Alert Feedback Profile -->
				{#if form?.profileSuccess}
					<div class="mt-4 p-3.5 rounded-xl bg-brand-mint-subtle border border-brand-mint/40 text-primary text-xs font-semibold flex items-center gap-2.5">
						<span class="material-symbols-outlined text-[20px]">check_circle</span>
						<span>{form.profileSuccess}</span>
					</div>
				{/if}
				{#if form?.profileError}
					<div class="mt-4 p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-medium flex items-center gap-2.5">
						<span class="material-symbols-outlined text-[20px] text-red-500">error</span>
						<span>{form.profileError}</span>
					</div>
				{/if}

				<!-- Avatar & Ringkasan Identitas -->
				<div class="mt-6 flex flex-col sm:flex-row items-center gap-5 p-4 rounded-xl bg-surface-base border border-border-subtle">
					<div class="w-16 h-16 rounded-full bg-brand-mint-subtle border-2 border-primary/30 flex items-center justify-center text-primary font-extrabold text-xl shadow-xs shrink-0">
						{userInitials}
					</div>
					<div class="text-center sm:text-left min-w-0">
						<div class="text-base font-bold text-text-strong truncate">
							{data.profile?.full_name || 'Pengguna Tanpa Nama'}
						</div>
						<div class="text-xs text-text-muted mt-0.5 truncate flex items-center justify-center sm:justify-start gap-1.5">
							<span class="material-symbols-outlined text-[15px] text-text-muted">mail</span>
							{data.profile?.email}
						</div>
						<div class="text-[11px] text-text-muted mt-1">
							Terdaftar sejak: <span class="font-medium text-text-strong">{formatDate(data.profile?.created_at)}</span>
						</div>
					</div>
				</div>

				<!-- Form Ubah Profil -->
				<form
					method="POST"
					action="?/updateProfile"
					use:enhance={() => {
						isSavingProfile = true;
						return async ({ update }) => {
							await update();
							isSavingProfile = false;
						};
					}}
					class="mt-6 space-y-4"
				>
					<div>
						<label for="full_name" class="block text-xs font-bold text-text-strong uppercase tracking-wider mb-2">
							Nama Lengkap
						</label>
						<div class="relative">
							<span class="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-text-muted">
								<span class="material-symbols-outlined text-[20px]">person</span>
							</span>
							<input
								id="full_name"
								name="full_name"
								type="text"
								required
								minlength="2"
								maxlength="100"
								bind:value={fullName}
								placeholder="Masukkan nama lengkap Anda"
								class="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border-subtle bg-surface-card text-text-strong text-sm focus:outline-hidden focus:border-primary focus:ring-2 focus:ring-brand-mint/20 transition-all"
							/>
						</div>
						<p class="text-[11px] text-text-muted mt-1.5">
							Nama ini akan digunakan pada laporan, hasil analisis, serta identitas akun Anda.
						</p>
					</div>

					<div>
						<label for="email" class="block text-xs font-bold text-text-strong uppercase tracking-wider mb-2">
							Alamat Email (Akun Utama)
						</label>
						<div class="relative">
							<span class="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-text-muted">
								<span class="material-symbols-outlined text-[20px]">alternate_email</span>
							</span>
							<input
								id="email"
								type="email"
								value={data.profile?.email ?? ''}
								readonly
								disabled
								class="w-full pl-10 pr-28 py-2.5 rounded-xl border border-border-subtle bg-surface-base text-text-muted text-sm cursor-not-allowed select-none opacity-80"
							/>
							<div class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
								<span class="inline-flex items-center gap-1 text-[11px] font-semibold text-primary bg-brand-mint-subtle px-2 py-0.5 rounded-md border border-brand-mint/30">
									<span class="material-symbols-outlined text-[14px]">check</span>
									Aktif
								</span>
							</div>
						</div>
						<p class="text-[11px] text-text-muted mt-1.5">
							Email terkunci sebagai pengenal unik autentikasi akun.
						</p>
					</div>

					<div class="pt-3 flex justify-end">
						<button
							type="submit"
							disabled={isSavingProfile}
							class="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary hover:bg-brand-emerald-dark text-on-primary font-semibold text-xs transition-all shadow-xs active:scale-95 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
						>
							{#if isSavingProfile}
								<span class="material-symbols-outlined text-[18px] animate-spin">progress_activity</span>
								<span>Menyimpan...</span>
							{:else}
								<span class="material-symbols-outlined text-[18px]">save</span>
								<span>Simpan Perubahan</span>
							{/if}
						</button>
					</div>
				</form>
			</div>
		</div>

		<!-- ========================================================= -->
		<!-- SECTION 2: KEAMANAN & GANTI PASSWORD (COL 5)             -->
		<!-- ========================================================= -->
		<div class="lg:col-span-5 space-y-6">
			<div class="bg-surface-card rounded-2xl border border-border-subtle p-6 sm:p-7 shadow-xs">
				<div class="flex items-center gap-3 pb-4 border-b border-border-subtle">
					<div class="w-10 h-10 rounded-xl bg-accent-teal-subtle flex items-center justify-center text-accent-teal border border-accent-teal/20 shadow-xs">
						<span class="material-symbols-outlined text-[22px]">lock_reset</span>
					</div>
					<div>
						<h2 class="text-base font-bold text-text-strong">Keamanan Sandi</h2>
						<p class="text-xs text-text-muted">Perbarui kata sandi akun secara berkala.</p>
					</div>
				</div>

				<!-- Alert Feedback Password -->
				{#if form?.passwordSuccess}
					<div class="mt-4 p-3.5 rounded-xl bg-brand-mint-subtle border border-brand-mint/40 text-primary text-xs font-semibold flex items-center gap-2.5">
						<span class="material-symbols-outlined text-[20px]">verified</span>
						<span>{form.passwordSuccess}</span>
					</div>
				{/if}
				{#if form?.passwordError}
					<div class="mt-4 p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-medium flex items-center gap-2.5">
						<span class="material-symbols-outlined text-[20px] text-red-500">error</span>
						<span>{form.passwordError}</span>
					</div>
				{/if}

				<!-- Form Ganti Password -->
				<form
					method="POST"
					action="?/updatePassword"
					use:enhance={() => {
						isSavingPassword = true;
						return async ({ update }) => {
							await update();
							isSavingPassword = false;
							if (!form?.passwordError) {
								currentPassword = '';
								newPassword = '';
								confirmPassword = '';
							}
						};
					}}
					class="mt-6 space-y-4"
				>
					<!-- Password Saat Ini -->
					<div>
						<label for="current_password" class="block text-xs font-bold text-text-strong uppercase tracking-wider mb-2">
							Kata Sandi Saat Ini
						</label>
						<div class="relative">
							<span class="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-text-muted">
								<span class="material-symbols-outlined text-[20px]">key</span>
							</span>
							<input
								id="current_password"
								name="current_password"
								type={showCurrentPassword ? 'text' : 'password'}
								required
								bind:value={currentPassword}
								placeholder="Masukkan sandi lama"
								class="w-full pl-10 pr-10 py-2.5 rounded-xl border border-border-subtle bg-surface-card text-text-strong text-sm focus:outline-hidden focus:border-primary focus:ring-2 focus:ring-brand-mint/20 transition-all"
							/>
							<button
								type="button"
								onclick={() => (showCurrentPassword = !showCurrentPassword)}
								class="absolute inset-y-0 right-0 flex items-center pr-3 text-text-muted hover:text-text-strong cursor-pointer"
								title="Lihat / Sembunyikan"
							>
								<span class="material-symbols-outlined text-[20px]">
									{showCurrentPassword ? 'visibility_off' : 'visibility'}
								</span>
							</button>
						</div>
					</div>

					<!-- Password Baru -->
					<div>
						<label for="new_password" class="block text-xs font-bold text-text-strong uppercase tracking-wider mb-2">
							Kata Sandi Baru
						</label>
						<div class="relative">
							<span class="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-text-muted">
								<span class="material-symbols-outlined text-[20px]">lock</span>
							</span>
							<input
								id="new_password"
								name="new_password"
								type={showNewPassword ? 'text' : 'password'}
								required
								minlength="8"
								bind:value={newPassword}
								placeholder="Minimal 8 karakter"
								class="w-full pl-10 pr-10 py-2.5 rounded-xl border border-border-subtle bg-surface-card text-text-strong text-sm focus:outline-hidden focus:border-primary focus:ring-2 focus:ring-brand-mint/20 transition-all"
							/>
							<button
								type="button"
								onclick={() => (showNewPassword = !showNewPassword)}
								class="absolute inset-y-0 right-0 flex items-center pr-3 text-text-muted hover:text-text-strong cursor-pointer"
								title="Lihat / Sembunyikan"
							>
								<span class="material-symbols-outlined text-[20px]">
									{showNewPassword ? 'visibility_off' : 'visibility'}
								</span>
							</button>
						</div>
					</div>

					<!-- Konfirmasi Password Baru -->
					<div>
						<label for="confirm_password" class="block text-xs font-bold text-text-strong uppercase tracking-wider mb-2">
							Konfirmasi Kata Sandi Baru
						</label>
						<div class="relative">
							<span class="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-text-muted">
								<span class="material-symbols-outlined text-[20px]">lock_clock</span>
							</span>
							<input
								id="confirm_password"
								name="confirm_password"
								type={showConfirmPassword ? 'text' : 'password'}
								required
								minlength="8"
								bind:value={confirmPassword}
								placeholder="Ulangi kata sandi baru"
								class="w-full pl-10 pr-10 py-2.5 rounded-xl border border-border-subtle bg-surface-card text-text-strong text-sm focus:outline-hidden focus:border-primary focus:ring-2 focus:ring-brand-mint/20 transition-all"
							/>
							<button
								type="button"
								onclick={() => (showConfirmPassword = !showConfirmPassword)}
								class="absolute inset-y-0 right-0 flex items-center pr-3 text-text-muted hover:text-text-strong cursor-pointer"
								title="Lihat / Sembunyikan"
							>
								<span class="material-symbols-outlined text-[20px]">
									{showConfirmPassword ? 'visibility_off' : 'visibility'}
								</span>
							</button>
						</div>
						{#if clientPasswordError}
							<p class="text-[11px] text-red-600 mt-1.5 flex items-center gap-1 font-medium">
								<span class="material-symbols-outlined text-[14px]">warning</span>
								{clientPasswordError}
							</p>
						{/if}
					</div>

					<div class="pt-3">
						<button
							type="submit"
							disabled={isSavingPassword || Boolean(clientPasswordError) || !newPassword || !currentPassword}
							class="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-primary hover:bg-brand-emerald-dark text-on-primary font-semibold text-xs transition-all shadow-xs active:scale-95 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
						>
							{#if isSavingPassword}
								<span class="material-symbols-outlined text-[18px] animate-spin">progress_activity</span>
								<span>Memperbarui Sandi...</span>
							{:else}
								<span class="material-symbols-outlined text-[18px]">security</span>
								<span>Perbarui Kata Sandi</span>
							{/if}
						</button>
					</div>
				</form>
			</div>

			<!-- Info Keamanan Tambahan -->
			<div class="p-4 rounded-xl bg-brand-mint-subtle/40 border border-brand-mint/30 flex items-start gap-3 text-xs text-brand-forest">
				<span class="material-symbols-outlined text-primary text-[20px] shrink-0 mt-0.5">shield</span>
				<div>
					<span class="font-bold">Keamanan Enkripsi End-to-End:</span>
					<p class="mt-0.5 text-text-muted text-[11px] leading-relaxed">
						Kata sandi Anda dienkripsi satu arah menggunakan salted bcrypt (10 rounds). Kami tidak pernah menyimpan kata sandi dalam teks mentah.
					</p>
				</div>
			</div>
		</div>

	</div>
</div>
