<script lang="ts">
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<svelte:head>
	<title>Dashboard Overview - SustainAI</title>
</svelte:head>

<div class="min-h-screen bg-surface-base text-text-strong font-body flex flex-col justify-between">
	<!-- Navbar Header Sederhana -->
	<header class="w-full bg-surface-card border-b border-border-subtle py-3.5 px-6 sticky top-0 z-50 flex items-center justify-between">
		<div class="flex items-center gap-3">
			<div class="w-10 h-10 rounded-xl bg-brand-mint-subtle border border-border-focus/30 flex items-center justify-center p-1.5 shadow-xs">
				<img alt="SustainAI Logo" class="w-full h-full object-contain" src="/SustainAI-Icon.webp" />
			</div>
			<div>
				<div class="font-display font-extrabold text-lg text-primary leading-tight">SustainAI</div>
				<div class="text-[11px] font-medium text-text-muted">Dashboard Pengguna</div>
			</div>
		</div>

		<div class="flex items-center gap-4">
			<div class="text-right hidden sm:block">
				<div class="text-xs font-bold text-text-strong">{data.user?.full_name || 'Pengguna'}</div>
				<div class="text-[11px] text-text-muted">{data.user?.email}</div>
			</div>
			<a
				href="/logout"
				class="text-xs font-semibold text-danger-rose hover:underline cursor-pointer flex items-center gap-1 bg-surface-base px-3 py-1.5 rounded-lg border border-border-subtle"
			>
				<span class="material-symbols-outlined text-[16px]">logout</span>
				<span>Keluar</span>
			</a>
		</div>
	</header>

	<!-- Main Content Stub -->
	<main class="flex-1 max-w-5xl w-full mx-auto p-6 md:p-8">
		<div class="bg-surface-card border border-border-subtle rounded-2xl p-6 sm:p-8 shadow-xs mb-6">
			<div class="flex items-center gap-2 mb-2">
				<span class="material-symbols-outlined text-primary text-2xl">verified_user</span>
				<h1 class="font-display font-bold text-2xl text-text-strong">Selamat Datang di SustainAI</h1>
			</div>
			<p class="text-xs sm:text-sm text-text-muted leading-relaxed">
				Halo <strong class="text-text-strong">{data.user?.full_name || data.user?.email}</strong>! Akun Anda telah terverifikasi dan sesi login Anda aktif sebagai <span class="text-primary font-bold">User</span>. Modul analisis lengkap akan dibangun pada rencana implementasi selanjutnya (004 &amp; 005).
			</p>
		</div>

		<div class="grid grid-cols-1 md:grid-cols-3 gap-6">
			<div class="p-6 rounded-2xl bg-surface-card border border-border-subtle shadow-xs">
				<div class="w-10 h-10 rounded-xl bg-brand-mint-subtle flex items-center justify-center text-primary mb-3">
					<span class="material-symbols-outlined text-2xl">delete_sweep</span>
				</div>
				<h3 class="font-display font-bold text-base text-text-strong mb-1">Waste Analyzer</h3>
				<p class="text-xs text-text-muted leading-relaxed">
					Deteksi jenis sampah, kategori daur ulang, estimasi nilai ekonomi, dan panduan pengelolaan.
				</p>
			</div>

			<div class="p-6 rounded-2xl bg-surface-card border border-border-subtle shadow-xs">
				<div class="w-10 h-10 rounded-xl bg-accent-teal-subtle flex items-center justify-center text-accent-teal mb-3">
					<span class="material-symbols-outlined text-2xl">potted_plant</span>
				</div>
				<h3 class="font-display font-bold text-base text-text-strong mb-1">Plant Disease Analyzer</h3>
				<p class="text-xs text-text-muted leading-relaxed">
					Identifikasi gejala penyakit tanaman dan rekomendasi penanganan ramah lingkungan.
				</p>
			</div>

			<div class="p-6 rounded-2xl bg-surface-card border border-border-subtle shadow-xs">
				<div class="w-10 h-10 rounded-xl bg-info-sky-subtle flex items-center justify-center text-info-sky mb-3">
					<span class="material-symbols-outlined text-2xl">query_stats</span>
				</div>
				<h3 class="font-display font-bold text-base text-text-strong mb-1">Eco-Impact Analytics</h3>
				<p class="text-xs text-text-muted leading-relaxed">
					Pelacakan reduksi emisi karbon, poin keberlanjutan, dan riwayat analisis cerdas Anda.
				</p>
			</div>
		</div>
	</main>

	<!-- Footer -->
	<footer class="w-full py-4 text-center text-xs text-text-muted border-t border-border-subtle bg-surface-card">
		<span>&copy; 2026 SustainAI. Mengakselerasi Keberlanjutan Lingkungan dengan AI.</span>
	</footer>
</div>
