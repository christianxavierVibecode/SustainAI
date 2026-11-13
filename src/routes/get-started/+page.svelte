<script lang="ts">
	import { enhance } from '$app/forms';
	import type { ActionData, PageData } from './$types';

	let { data, form }: { data: PageData; form: ActionData } = $props();

	// Reactive state mode: 'login' | 'register'
	// Use derived to reactively track form/data changes (avoids state_referenced_locally warning)
	let _modeOverride = $state<'login' | 'register' | null>(null);
	let mode = $derived<'login' | 'register'>(
		_modeOverride ??
		(form?.mode as 'login' | 'register') ??
		(data.mode as 'login' | 'register') ??
		'login'
	);

	let activePersona = $state<'auditor' | 'agronomist' | 'esg'>('auditor');
	let isSubmitting = $state(false);

	// Autofill persona demo credentials
	function selectPersona(persona: 'auditor' | 'agronomist' | 'esg') {
		activePersona = persona;
		const emailInput = document.getElementById('login-email') as HTMLInputElement | null;
		const passwordInput = document.getElementById('login-password') as HTMLInputElement | null;

		if (persona === 'auditor') {
			if (emailInput) emailInput.value = 'christianxavier@genforces.com';
			if (passwordInput) passwordInput.value = 'UserSustainAI2026!';
		} else if (persona === 'agronomist') {
			if (emailInput) emailInput.value = 'admin@genforces.com';
			if (passwordInput) passwordInput.value = 'AdminSustainAI2026!';
		} else {
			if (emailInput) emailInput.value = 'demo.esg@sustainai.io';
			if (passwordInput) passwordInput.value = 'SustainAI2026!';
		}
	}
</script>

<svelte:head>
	<title>Get Started - SustainAI Intelligence Platform</title>
</svelte:head>

<div class="bg-surface-base text-text-strong font-body antialiased min-h-screen flex flex-col justify-between selection:bg-brand-mint selection:text-brand-forest">
	<!-- Top Global Floating Header Bar -->
	<header class="w-full bg-surface-card border-b border-border-subtle py-3.5 px-4 lg:px-10 sticky top-0 z-50">
		<div class="max-w-7xl mx-auto flex items-center justify-between">
			<!-- Brand & Platform Identity -->
			<a class="flex items-center gap-3 group focus:outline-none" href="/">
				<div class="w-10 h-10 rounded-xl bg-brand-mint-subtle border border-border-focus/30 flex items-center justify-center p-1.5 transition-transform group-hover:scale-105 shadow-xs">
					<img alt="SustainAI Logo" class="w-full h-full object-contain" src="/SustainAI-Icon.webp" />
				</div>
				<div class="flex flex-col">
					<span class="font-display font-extrabold text-xl text-primary leading-tight tracking-tight">SustainAI</span>
					<span class="text-[11px] font-medium text-text-muted tracking-wide leading-none">Intelligence Platform • UN SDG Aligned</span>
				</div>
			</a>

			<!-- System Operational Status & Back to Home Link -->
			<div class="flex items-center gap-4">
				<div class="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full bg-surface-base border border-border-subtle text-text-muted text-xs font-medium">
					<span class="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
					<span>Operational Telemetry Active</span>
				</div>
				<a
					href="/"
					class="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-text-muted hover:text-primary transition-colors px-3 py-1.5 rounded-lg hover:bg-surface-base"
				>
					<span class="material-symbols-outlined text-[18px]">arrow_back</span>
					<span>Ke Beranda</span>
				</a>
			</div>
		</div>
	</header>

	<!-- Main Canvas Content: Asymmetric Split Screen Presentation -->
	<main class="flex-1 max-w-7xl w-full mx-auto px-4 lg:px-8 py-8 lg:py-12 flex items-center">
		<div class="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 w-full items-stretch">
			<!-- LEFT COLUMN: Mission Vision & SDG Modules -->
			<section class="lg:col-span-7 flex flex-col justify-between space-y-6">
				<!-- Hero Introduction -->
				<div class="space-y-4">
					<div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-mint-subtle border border-primary/20 text-brand-forest">
						<span class="material-symbols-outlined text-base">verified</span>
						<span class="font-label-md text-xs sm:text-sm font-semibold">Verified Environmental Telemetry &amp; ML Auditing</span>
					</div>
					<h1 class="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-text-strong tracking-tight leading-tight">
						AI-Powered Solutions for <span class="text-primary underline decoration-brand-mint decoration-wavy decoration-2">Global Sustainable</span> Development
					</h1>
					<p class="text-base text-text-muted max-w-2xl leading-relaxed">
						Arsitektur kecerdasan multimodal terpadu untuk klasifikasi pengelolaan sampah presisi, diagnosis kesehatan tanaman agrikultur, dan audit aksi keberlanjutan berbasis SDG 12 &amp; SDG 2.
					</p>
				</div>

				<!-- Bento Grid: 3 Core Analyzers -->
				<div class="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
					<!-- Card 1: Plant Disease Diagnostics -->
					<div class="bg-surface-card border border-border-subtle rounded-2xl p-5 hover:border-primary transition-all duration-200 group flex flex-col justify-between shadow-xs hover:shadow-md">
						<div class="space-y-3">
							<div class="w-10 h-10 rounded-xl bg-brand-mint-subtle flex items-center justify-center text-primary group-hover:scale-105 transition-transform">
								<span class="material-symbols-outlined text-2xl">potted_plant</span>
							</div>
							<div class="inline-block px-2 py-0.5 rounded text-[11px] font-semibold bg-accent-amber-subtle text-accent-amber border border-accent-amber/20">
								SDG 2 Zero Hunger
							</div>
							<h3 class="font-display font-bold text-base text-text-strong">Plant Diagnostics</h3>
							<p class="text-xs text-text-muted leading-relaxed">
								Deteksi indikasi dini patogen, bercak daun, dan klorosis menggunakan model visi edge untuk perlindungan hasil panen.
							</p>
						</div>
						<div class="pt-3 mt-3 border-t border-border-subtle flex items-center justify-between text-xs font-semibold text-primary">
							<span class="text-text-muted font-normal">97.6% Precision</span>
							<span class="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>
						</div>
					</div>

					<!-- Card 2: Waste Classifier -->
					<div class="bg-surface-card border border-border-subtle rounded-2xl p-5 hover:border-primary transition-all duration-200 group flex flex-col justify-between shadow-xs hover:shadow-md">
						<div class="space-y-3">
							<div class="w-10 h-10 rounded-xl bg-info-sky-subtle flex items-center justify-center text-info-sky group-hover:scale-105 transition-transform">
								<span class="material-symbols-outlined text-2xl">recycling</span>
							</div>
							<div class="inline-block px-2 py-0.5 rounded text-[11px] font-semibold bg-brand-mint-subtle text-brand-forest border border-brand-mint/30">
								SDG 12 Circular
							</div>
							<h3 class="font-display font-bold text-base text-text-strong">Waste Classifier</h3>
							<p class="text-xs text-text-muted leading-relaxed">
								Pilah sampah organik, daur ulang, dan B3 dengan analisis estimasi nilai ekonomi serta penanganan ramah lingkungan.
							</p>
						</div>
						<div class="pt-3 mt-3 border-t border-border-subtle flex items-center justify-between text-xs font-semibold text-primary">
							<span class="text-text-muted font-normal">14,850+ kg Diverted</span>
							<span class="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>
						</div>
					</div>

					<!-- Card 3: Environmental Audit -->
					<div class="bg-surface-card border border-border-subtle rounded-2xl p-5 hover:border-primary transition-all duration-200 group flex flex-col justify-between shadow-xs hover:shadow-md">
						<div class="space-y-3">
							<div class="w-10 h-10 rounded-xl bg-surface-card-subtle flex items-center justify-center text-text-strong group-hover:scale-105 transition-transform border border-border-subtle">
								<span class="material-symbols-outlined text-2xl">insights</span>
							</div>
							<div class="inline-block px-2 py-0.5 rounded text-[11px] font-semibold bg-accent-teal-subtle text-accent-teal border border-accent-teal/20">
								SDG 13 Climate Action
							</div>
							<h3 class="font-display font-bold text-base text-text-strong">Carbon &amp; Reports</h3>
							<p class="text-xs text-text-muted leading-relaxed">
								Pelaporan agregasi reduksi jejak karbon dan visualisasi audit kepatuhan regulasi lingkungan hidup.
							</p>
						</div>
						<div class="pt-3 mt-3 border-t border-border-subtle flex items-center justify-between text-xs font-semibold text-primary">
							<span class="text-text-muted font-normal">Real-Time Sync</span>
							<span class="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>
						</div>
					</div>
				</div>

				<!-- Telemetry Footer Bar -->
				<div class="bg-surface-card rounded-xl border border-border-subtle p-4 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xs">
					<div class="flex items-center gap-3">
						<div class="w-9 h-9 rounded-lg bg-surface-base border border-border-subtle flex items-center justify-center text-primary">
							<span class="material-symbols-outlined text-lg">monitoring</span>
						</div>
						<div>
							<p class="text-[11px] uppercase tracking-wider text-text-muted font-semibold">Live Impact Telemetry</p>
							<p class="text-xs sm:text-sm font-bold text-text-strong">14,850+ kg sampah teralihkan • 97.6% akurasi model visi</p>
						</div>
					</div>
					<span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-brand-mint-subtle text-brand-forest border border-brand-mint/30">
						<span class="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
						SDG Framework Validated
					</span>
				</div>
			</section>

			<!-- RIGHT COLUMN: Authentication & Portal Login / Register Section -->
			<section class="lg:col-span-5 flex flex-col justify-center">
				<div class="bg-surface-card rounded-2xl border border-border-subtle p-6 sm:p-8 shadow-lg relative">
					<!-- Top Accent Bar -->
					<div class="absolute top-0 left-8 right-8 h-1 bg-gradient-to-r from-primary via-brand-mint to-accent-teal rounded-t-full"></div>

					<!-- Header Titles -->
					<div class="mb-5 space-y-1">
						<div class="flex items-center justify-between">
							<h2 class="font-display font-bold text-2xl text-text-strong tracking-tight">
								{mode === 'login' ? 'Selamat Datang' : 'Buat Akun Baru'}
							</h2>
							<span class="px-2 py-0.5 rounded text-xs font-semibold bg-surface-base border border-border-subtle text-text-muted">
								Demo MVP
							</span>
						</div>
						<p class="text-xs sm:text-sm text-text-muted">
							{mode === 'login'
								? 'Masukkan kredensial Anda untuk mengakses dashboard analisis SustainAI.'
								: 'Daftarkan profil Anda untuk mulai menggunakan asisten AI keberlanjutan.'}
						</p>
					</div>

					<!-- Auth Mode Toggle (Sign In / Create Account) -->
					<div class="mb-5">
						<div class="grid grid-cols-2 p-1 bg-surface-base rounded-xl border border-border-subtle text-center">
							<button
								type="button"
								onclick={() => (_modeOverride = 'login')}
								class="py-2 px-3 rounded-lg font-semibold text-xs sm:text-sm transition-all flex items-center justify-center gap-1.5 cursor-pointer {mode === 'login'
									? 'bg-surface-card text-primary shadow-xs border border-border-subtle'
									: 'text-text-muted hover:text-text-strong'}"
							>
								<span class="material-symbols-outlined text-[18px]">login</span>
								<span>Sign In</span>
							</button>
							<button
								type="button"
								onclick={() => (_modeOverride = 'register')}
								class="py-2 px-3 rounded-lg font-semibold text-xs sm:text-sm transition-all flex items-center justify-center gap-1.5 cursor-pointer {mode === 'register'
									? 'bg-surface-card text-primary shadow-xs border border-border-subtle'
									: 'text-text-muted hover:text-text-strong'}"
							>
								<span class="material-symbols-outlined text-[18px]">person_add</span>
								<span>Create Account</span>
							</button>
						</div>
					</div>

					<!-- Form Feedback Error Alert -->
					{#if form?.error}
						<div class="mb-4 p-3 rounded-xl bg-danger-rose-subtle border border-danger-rose/30 text-danger-rose text-xs flex items-start gap-2">
							<span class="material-symbols-outlined text-[18px] shrink-0">error</span>
							<span class="leading-relaxed font-medium">{form.error}</span>
						</div>
					{/if}

					<!-- Persona Preset Demo Chips (Hanya di mode Login) -->
					{#if mode === 'login'}
						<div class="mb-5">
							<div class="block text-xs font-medium text-text-muted mb-2">Preset Akun Demo (Klik untuk Autofill):</div>
							<div class="grid grid-cols-3 gap-2">
								<button
									type="button"
									onclick={() => selectPersona('auditor')}
									class="text-center py-2 px-1 rounded-xl transition-all text-xs font-semibold flex flex-col items-center gap-1 cursor-pointer border {activePersona === 'auditor'
										? 'border-primary bg-brand-mint-subtle text-brand-forest shadow-xs'
										: 'border-border-subtle bg-surface-card text-text-muted hover:border-primary/50'}"
								>
									<span class="material-symbols-outlined text-base">person</span>
									<span class="truncate w-full">Demo User</span>
								</button>

								<button
									type="button"
									onclick={() => selectPersona('agronomist')}
									class="text-center py-2 px-1 rounded-xl transition-all text-xs font-semibold flex flex-col items-center gap-1 cursor-pointer border {activePersona === 'agronomist'
										? 'border-primary bg-brand-mint-subtle text-brand-forest shadow-xs'
										: 'border-border-subtle bg-surface-card text-text-muted hover:border-primary/50'}"
								>
									<span class="material-symbols-outlined text-base">admin_panel_settings</span>
									<span class="truncate w-full">Demo Admin</span>
								</button>

								<button
									type="button"
									onclick={() => selectPersona('esg')}
									class="text-center py-2 px-1 rounded-xl transition-all text-xs font-semibold flex flex-col items-center gap-1 cursor-pointer border {activePersona === 'esg'
										? 'border-primary bg-brand-mint-subtle text-brand-forest shadow-xs'
										: 'border-border-subtle bg-surface-card text-text-muted hover:border-primary/50'}"
								>
									<span class="material-symbols-outlined text-base">eco</span>
									<span class="truncate w-full">Eco Guest</span>
								</button>
							</div>
						</div>
					{/if}

					<!-- LOGIN FORM -->
					{#if mode === 'login'}
						<form
							method="POST"
							action="?/login"
							use:enhance={() => {
								isSubmitting = true;
								return async ({ update }) => {
									await update();
									isSubmitting = false;
								};
							}}
							class="space-y-4"
						>
							<input type="hidden" name="redirectTo" value={data.redirectTo} />

							<!-- Email Input -->
							<div class="space-y-1.5">
								<label class="block text-xs font-semibold text-text-strong" for="login-email">
									Alamat Email
								</label>
								<div class="relative rounded-lg">
									<div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-text-muted">
										<span class="material-symbols-outlined text-lg">mail</span>
									</div>
									<input
										id="login-email"
										name="email"
										type="email"
										required
										placeholder="contoh: christianxavier@genforces.com"
										value={form?.email || 'christianxavier@genforces.com'}
										class="w-full h-11 pl-10 pr-3.5 rounded-lg border border-border-subtle bg-surface-card text-text-strong text-xs sm:text-sm focus:border-primary focus:ring-2 focus:ring-brand-mint-subtle transition-all outline-none"
									/>
								</div>
							</div>

							<!-- Password Input -->
							<div class="space-y-1.5">
								<div class="flex items-center justify-between">
									<label class="block text-xs font-semibold text-text-strong" for="login-password">
										Kata Sandi
									</label>
									<button
										type="button"
										onclick={() => alert('Untuk akun demo silakan gunakan password preset demo yang tersedia.')}
										class="text-xs text-primary hover:text-brand-emerald-dark font-medium transition-colors cursor-pointer"
									>
										Lupa sandi?
									</button>
								</div>
								<div class="relative rounded-lg">
									<div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-text-muted">
										<span class="material-symbols-outlined text-lg">key</span>
									</div>
									<input
										id="login-password"
										name="password"
										type="password"
										required
										placeholder="••••••••••••"
										value="UserSustainAI2026!"
										class="w-full h-11 pl-10 pr-10 rounded-lg border border-border-subtle bg-surface-card text-text-strong text-xs sm:text-sm focus:border-primary focus:ring-2 focus:ring-brand-mint-subtle transition-all outline-none"
									/>
								</div>
							</div>

							<!-- Submit Button -->
							<button
								type="submit"
								disabled={isSubmitting}
								class="w-full h-11 rounded-lg bg-primary hover:bg-brand-emerald-dark text-white font-semibold text-sm shadow-sm hover:shadow transition-all duration-200 flex items-center justify-center gap-2 active:scale-98 cursor-pointer disabled:opacity-50 mt-2"
							>
								{#if isSubmitting}
									<span class="material-symbols-outlined text-base animate-spin">autorenew</span>
									<span>Memverifikasi...</span>
								{:else}
									<span class="material-symbols-outlined text-base">login</span>
									<span>Masuk ke Workspace</span>
								{/if}
							</button>
						</form>
					{/if}

					<!-- REGISTER FORM -->
					{#if mode === 'register'}
						<form
							method="POST"
							action="?/register"
							use:enhance={() => {
								isSubmitting = true;
								return async ({ update }) => {
									await update();
									isSubmitting = false;
								};
							}}
							class="space-y-4"
						>
							<!-- Full Name -->
							<div class="space-y-1.5">
								<label class="block text-xs font-semibold text-text-strong" for="reg-name">
									Nama Lengkap
								</label>
								<div class="relative rounded-lg">
									<div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-text-muted">
										<span class="material-symbols-outlined text-lg">badge</span>
									</div>
									<input
										id="reg-name"
										name="name"
										type="text"
										required
										placeholder="Nama Anda"
										value={form?.fullName || ''}
										class="w-full h-11 pl-10 pr-3.5 rounded-lg border border-border-subtle bg-surface-card text-text-strong text-xs sm:text-sm focus:border-primary focus:ring-2 focus:ring-brand-mint-subtle transition-all outline-none"
									/>
								</div>
							</div>

							<!-- Email -->
							<div class="space-y-1.5">
								<label class="block text-xs font-semibold text-text-strong" for="reg-email">
									Alamat Email
								</label>
								<div class="relative rounded-lg">
									<div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-text-muted">
										<span class="material-symbols-outlined text-lg">mail</span>
									</div>
									<input
										id="reg-email"
										name="email"
										type="email"
										required
										placeholder="email.anda@domain.com"
										value={form?.email || ''}
										class="w-full h-11 pl-10 pr-3.5 rounded-lg border border-border-subtle bg-surface-card text-text-strong text-xs sm:text-sm focus:border-primary focus:ring-2 focus:ring-brand-mint-subtle transition-all outline-none"
									/>
								</div>
							</div>

							<!-- Password -->
							<div class="space-y-1.5">
								<label class="block text-xs font-semibold text-text-strong" for="reg-password">
									Kata Sandi (Min. 6 Karakter)
								</label>
								<div class="relative rounded-lg">
									<div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-text-muted">
										<span class="material-symbols-outlined text-lg">lock</span>
									</div>
									<input
										id="reg-password"
										name="password"
										type="password"
										required
										minlength="6"
										placeholder="Minimal 6 karakter"
										class="w-full h-11 pl-10 pr-10 rounded-lg border border-border-subtle bg-surface-card text-text-strong text-xs sm:text-sm focus:border-primary focus:ring-2 focus:ring-brand-mint-subtle transition-all outline-none"
									/>
								</div>
							</div>

							<!-- Password Confirm -->
							<div class="space-y-1.5">
								<label class="block text-xs font-semibold text-text-strong" for="reg-confirm">
									Konfirmasi Kata Sandi
								</label>
								<div class="relative rounded-lg">
									<div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-text-muted">
										<span class="material-symbols-outlined text-lg">verified_user</span>
									</div>
									<input
										id="reg-confirm"
										name="confirm"
										type="password"
										required
										minlength="6"
										placeholder="Ulangi kata sandi"
										class="w-full h-11 pl-10 pr-3.5 rounded-lg border border-border-subtle bg-surface-card text-text-strong text-xs sm:text-sm focus:border-primary focus:ring-2 focus:ring-brand-mint-subtle transition-all outline-none"
									/>
								</div>
							</div>

							<!-- Submit Register Button -->
							<button
								type="submit"
								disabled={isSubmitting}
								class="w-full h-11 rounded-lg bg-primary hover:bg-brand-emerald-dark text-white font-semibold text-sm shadow-sm hover:shadow transition-all duration-200 flex items-center justify-center gap-2 active:scale-98 cursor-pointer disabled:opacity-50 mt-2"
							>
								{#if isSubmitting}
									<span class="material-symbols-outlined text-base animate-spin">autorenew</span>
									<span>Mendaftarkan akun...</span>
								{:else}
									<span class="material-symbols-outlined text-base">person_add</span>
									<span>Daftar &amp; Dapatkan OTP Demo</span>
								{/if}
							</button>
						</form>
					{/if}
				</div>
			</section>
		</div>
	</main>

	<!-- Footer Bar -->
	<footer class="w-full bg-surface-card border-t border-border-subtle py-4 px-4 text-center text-xs text-text-muted">
		<div class="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
			<span>&copy; 2026 SustainAI. Multi-modal Environmental Intelligence Platform.</span>
			<span class="text-primary font-medium">Recognize. Understand. Act.</span>
		</div>
	</footer>
</div>
