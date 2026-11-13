<script lang="ts">
	import { enhance } from '$app/forms';
	import type { ActionData, PageData } from './$types';

	let { data, form }: { data: PageData; form: ActionData } = $props();

	let otpValue = $state('');
	let isSubmitting = $state(false);

	function fillDemoOtp() {
		otpValue = data.demoOtpCode;
	}
</script>

<svelte:head>
	<title>Verifikasi OTP Akun - SustainAI</title>
</svelte:head>

<div class="bg-surface-base text-text-strong font-body antialiased min-h-screen flex flex-col justify-between selection:bg-brand-mint selection:text-brand-forest">
	<!-- Top Navigation -->
	<header class="w-full bg-surface-card border-b border-border-subtle py-3.5 px-4 lg:px-10 sticky top-0 z-50">
		<div class="max-w-7xl mx-auto flex items-center justify-between">
			<a class="flex items-center gap-3 focus:outline-none" href="/">
				<div class="w-10 h-10 rounded-xl bg-brand-mint-subtle border border-border-focus/30 flex items-center justify-center p-1.5 shadow-xs">
					<img alt="SustainAI Logo" class="w-full h-full object-contain" src="/SustainAI-Icon.webp" />
				</div>
				<div class="flex flex-col">
					<span class="font-display font-extrabold text-xl text-primary leading-tight">SustainAI</span>
					<span class="text-[11px] font-medium text-text-muted">Account Verification</span>
				</div>
			</a>
			<a href="/get-started" class="text-xs sm:text-sm font-semibold text-text-muted hover:text-primary transition-colors">
				Batal &amp; Kembali
			</a>
		</div>
	</header>

	<!-- Main OTP Box -->
	<main class="flex-1 max-w-lg w-full mx-auto px-4 py-12 flex items-center justify-center">
		<div class="bg-surface-card rounded-2xl border border-border-subtle p-6 sm:p-8 shadow-xl w-full relative">
			<div class="absolute top-0 left-8 right-8 h-1 bg-gradient-to-r from-primary via-brand-mint to-accent-teal rounded-t-full"></div>

			<div class="text-center mb-6">
				<div class="w-14 h-14 rounded-2xl bg-brand-mint-subtle text-primary border border-brand-mint flex items-center justify-center mx-auto mb-3 shadow-xs">
					<span class="material-symbols-outlined text-3xl">mark_email_read</span>
				</div>
				<h2 class="font-display font-bold text-2xl text-text-strong">Verifikasi Akun Anda</h2>
				<p class="text-xs sm:text-sm text-text-muted mt-1">
					Kode verifikasi dikirimkan ke <strong class="text-text-strong">{data.email}</strong>
				</p>
			</div>

			<!-- Banner Edukasi OTP Demo -->
			<div class="mb-6 p-4 rounded-xl bg-brand-mint-subtle/80 border border-brand-mint/40 text-brand-forest text-xs leading-relaxed">
				<div class="flex items-center gap-2 font-bold text-primary mb-1">
					<span class="material-symbols-outlined text-base">info</span>
					<span>Mode Demo &amp; Pengujian MVP</span>
				</div>
				<p class="text-text-strong">
					Untuk menjaga keamanan akun, SustainAI menggunakan verifikasi OTP yang dikirimkan ke email terdaftar. Namun, untuk keperluan Demo &amp; Pengujian MVP, silakan gunakan kode verifikasi berikut:
				</p>
				<div class="mt-2.5 flex items-center justify-between bg-white px-3 py-2 rounded-lg border border-brand-mint shadow-xs">
					<span class="font-mono text-base font-extrabold text-primary tracking-widest">{data.demoOtpCode}</span>
					<button
						type="button"
						onclick={fillDemoOtp}
						class="text-[11px] font-bold text-primary hover:underline cursor-pointer flex items-center gap-1"
					>
						<span>Salin ke Form</span>
						<span class="material-symbols-outlined text-[14px]">content_paste</span>
					</button>
				</div>
			</div>

			{#if form?.error}
				<div class="mb-4 p-3 rounded-xl bg-danger-rose-subtle border border-danger-rose/30 text-danger-rose text-xs flex items-center gap-2">
					<span class="material-symbols-outlined text-base shrink-0">error</span>
					<span>{form.error}</span>
				</div>
			{/if}

			<!-- Form Submit OTP -->
			<form
				method="POST"
				use:enhance={() => {
					isSubmitting = true;
					return async ({ update }) => {
						await update();
						isSubmitting = false;
					};
				}}
				class="space-y-4"
			>
				<input type="hidden" name="email" value={data.email} />

				<div class="space-y-1.5">
					<label class="block text-xs font-semibold text-text-strong text-center" for="otp-input">
						Masukkan 6 Digit Kode OTP
					</label>
					<input
						id="otp-input"
						name="otp"
						type="text"
						inputmode="numeric"
						maxlength="6"
						required
						bind:value={otpValue}
						placeholder="123456"
						class="w-full h-12 text-center text-xl font-mono tracking-widest font-bold rounded-xl border border-border-subtle bg-surface-base text-text-strong focus:border-primary focus:ring-2 focus:ring-brand-mint-subtle transition-all outline-none"
					/>
				</div>

				<button
					type="submit"
					disabled={isSubmitting || otpValue.length < 6}
					class="w-full h-11 rounded-lg bg-primary hover:bg-brand-emerald-dark text-white font-semibold text-sm shadow-sm transition-all duration-200 flex items-center justify-center gap-2 active:scale-98 cursor-pointer disabled:opacity-50"
				>
					{#if isSubmitting}
						<span class="material-symbols-outlined text-base animate-spin">autorenew</span>
						<span>Memverifikasi Akun...</span>
					{:else}
						<span class="material-symbols-outlined text-base">verified</span>
						<span>Verifikasi &amp; Masuk Workspace</span>
					{/if}
				</button>
			</form>
		</div>
	</main>

	<!-- Footer -->
	<footer class="w-full py-4 text-center text-xs text-text-muted">
		<span>&copy; 2026 SustainAI. Multi-modal Environmental Intelligence Platform.</span>
	</footer>
</div>
