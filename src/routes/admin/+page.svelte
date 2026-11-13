<script lang="ts">
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<svelte:head>
	<title>Admin Workspace - SustainAI</title>
</svelte:head>

<div class="min-h-screen bg-surface-base text-text-strong font-body flex flex-col justify-between">
	<header class="w-full bg-surface-card border-b border-border-subtle py-3.5 px-6 sticky top-0 z-50 flex items-center justify-between">
		<div class="flex items-center gap-3">
			<div class="w-10 h-10 rounded-xl bg-brand-mint-subtle border border-border-focus/30 flex items-center justify-center p-1.5 shadow-xs">
				<img alt="SustainAI Logo" class="w-full h-full object-contain" src="/SustainAI-Icon.webp" />
			</div>
			<div>
				<div class="font-display font-extrabold text-lg text-primary leading-tight">SustainAI Admin</div>
				<div class="text-[11px] font-medium text-text-muted">Waste Price Management &amp; Observability</div>
			</div>
		</div>

		<div class="flex items-center gap-4">
			<span class="text-xs font-semibold px-2.5 py-1 rounded-full bg-accent-amber-subtle text-accent-amber border border-accent-amber/20">
				Admin Mode
			</span>
			<form method="POST" action="/get-started?/logout">
				<button
					type="submit"
					class="text-xs font-semibold text-danger-rose hover:underline cursor-pointer flex items-center gap-1"
				>
					<span class="material-symbols-outlined text-[16px]">logout</span>
					<span>Keluar</span>
				</button>
			</form>
		</div>
	</header>

	<main class="flex-1 max-w-5xl w-full mx-auto p-6 md:p-8">
		<div class="bg-surface-card border border-border-subtle rounded-2xl p-6 sm:p-8 shadow-xs mb-6">
			<h1 class="font-display font-bold text-2xl text-text-strong mb-2">Panel Administrasi Harga Sampah</h1>
			<p class="text-xs sm:text-sm text-text-muted leading-relaxed">
				Selamat datang, <strong class="text-text-strong">{data.user?.full_name || data.user?.email}</strong>. Sebagai administrator, Anda memiliki akses observasi harga pasar komoditas sampah dan manajemen data acuan daur ulang.
			</p>
		</div>

		<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
			<div class="p-6 rounded-2xl bg-surface-card border border-border-subtle shadow-xs">
				<div class="w-10 h-10 rounded-xl bg-brand-mint-subtle flex items-center justify-center text-primary mb-3">
					<span class="material-symbols-outlined text-2xl">price_change</span>
				</div>
				<h3 class="font-display font-bold text-base text-text-strong mb-1">Manajemen Harga Acuan</h3>
				<p class="text-xs text-text-muted leading-relaxed mb-4">
					Pembaruan harga komoditas sampah berdasarkan observasi berkala Bank Sampah.
				</p>
				<span class="text-xs font-semibold text-primary bg-brand-mint-subtle px-2.5 py-1 rounded-md">
					Koleksi Aktif: 16 Kategori
				</span>
			</div>

			<div class="p-6 rounded-2xl bg-surface-card border border-border-subtle shadow-xs">
				<div class="w-10 h-10 rounded-xl bg-info-sky-subtle flex items-center justify-center text-info-sky mb-3">
					<span class="material-symbols-outlined text-2xl">shield_person</span>
				</div>
				<h3 class="font-display font-bold text-base text-text-strong mb-1">Status Hak Akses (RBAC)</h3>
				<p class="text-xs text-text-muted leading-relaxed mb-4">
					Role Anda adalah <strong class="text-primary font-mono">admin</strong>. Rute panel pengguna biasa (/dashboard/*) terproteksi dan terisolasi.
				</p>
				<span class="text-xs font-semibold text-accent-teal bg-accent-teal-subtle px-2.5 py-1 rounded-md">
					RBAC Active &amp; Verified
				</span>
			</div>
		</div>
	</main>

	<footer class="w-full py-4 text-center text-xs text-text-muted border-t border-border-subtle bg-surface-card">
		<span>&copy; 2026 SustainAI Administration. Restricted Area.</span>
	</footer>
</div>
