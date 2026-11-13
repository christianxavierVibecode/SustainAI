<script lang="ts">
	import { page } from '$app/state';

	// Ambil status dan pesan error dari $app/state
	let status = $derived(page.status ?? 404);
	let message = $derived(
		page.error?.message ||
			(status === 404
				? 'Halaman yang Anda cari tidak dapat ditemukan atau telah dipindahkan.'
				: 'Terjadi kesalahan sistem saat memproses permintaan Anda.')
	);

	let is404 = $derived(status === 404);
</script>

<svelte:head>
	<title>{status} - {is404 ? 'Halaman Tidak Ditemukan' : 'Terjadi Kesalahan'} | SustainAI</title>
</svelte:head>

<div class="min-h-screen bg-surface-base text-text-strong flex flex-col justify-between selection:bg-brand-mint selection:text-brand-forest relative overflow-hidden">
	<!-- Background Decorative Blobs -->
	<div class="absolute -top-32 -left-32 w-96 h-96 bg-brand-mint-subtle rounded-full blur-3xl opacity-70 pointer-events-none"></div>
	<div class="absolute -bottom-32 -right-32 w-96 h-96 bg-accent-teal-subtle rounded-full blur-3xl opacity-70 pointer-events-none"></div>
	<div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl pointer-events-none"></div>

	<!-- TOP MINIMAL NAV -->
	<header class="w-full px-6 py-5 max-w-7xl mx-auto flex items-center justify-between relative z-10">
		<a href="/" class="flex items-center gap-3 group">
			<div class="w-10 h-10 rounded-xl bg-brand-mint-subtle border border-border-focus/30 flex items-center justify-center p-1.5 shadow-xs transition-transform group-hover:scale-105">
				<img src="/SustainAI-Icon.webp" alt="SustainAI Logo" class="w-full h-full object-contain" />
			</div>
			<div>
				<div class="font-display font-extrabold text-lg text-primary leading-none">
					SustainAI
				</div>
				<div class="text-[11px] font-medium text-text-muted mt-0.5">
					Intelligence Platform
				</div>
			</div>
		</a>

		<a
			href="/dashboard/overview"
			class="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold text-text-strong bg-surface-card border border-border-subtle hover:bg-surface-card-subtle transition-all shadow-xs"
		>
			<span class="material-symbols-outlined text-[18px]">dashboard</span>
			<span>Buka Dashboard</span>
		</a>
	</header>

	<!-- MAIN CONTENT CONTAINER -->
	<main class="flex-1 flex items-center justify-center px-4 py-12 relative z-10">
		<div class="max-w-xl w-full text-center space-y-8">
			<!-- Visual Illustration Card -->
			<div class="relative inline-block">
				<div class="w-32 h-32 sm:w-36 sm:h-36 mx-auto rounded-3xl bg-brand-mint-subtle/80 border border-brand-mint/40 flex items-center justify-center shadow-lg shadow-brand-mint/10">
					{#if is404}
						<span class="material-symbols-outlined text-primary text-6xl sm:text-7xl select-none animate-pulse">
							travel_explore
						</span>
					{:else}
						<span class="material-symbols-outlined text-danger-rose text-6xl sm:text-7xl select-none animate-bounce">
							report_problem
						</span>
					{/if}
				</div>
				<!-- Badge Floating Code -->
				<div class="absolute -bottom-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-surface-card border border-border-subtle shadow-md">
					<span class="font-display font-extrabold text-sm sm:text-base tracking-widest text-primary">
						ERROR {status}
					</span>
				</div>
			</div>

			<!-- Teks Judul & Deskripsi -->
			<div class="space-y-3 pt-2">
				<h1 class="font-display text-3xl sm:text-4xl font-extrabold text-text-strong tracking-tight">
					{#if is404}
						Oops! Halaman Tidak Ditemukan
					{:else}
						Terjadi Gangguan Sistem
					{/if}
				</h1>
				<p class="text-text-muted text-sm sm:text-base max-w-md mx-auto leading-relaxed">
					{message}
				</p>
			</div>

			<!-- Rekomendasi Pintasan Tautan -->
			<div class="p-4 sm:p-5 rounded-2xl bg-surface-card border border-border-subtle shadow-xs text-left space-y-3">
				<div class="text-xs font-bold uppercase tracking-wider text-text-muted flex items-center gap-1.5">
					<span class="material-symbols-outlined text-[16px] text-primary">assistant_navigation</span>
					Navigasi Cepat yang Mungkin Anda Butuhkan:
				</div>
				<div class="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
					<a
						href="/dashboard/waste"
						class="flex items-center gap-2.5 p-2.5 rounded-xl border border-border-subtle hover:border-primary hover:bg-brand-mint-subtle/30 transition-all text-text-strong font-medium group"
					>
						<span class="material-symbols-outlined text-[18px] text-primary group-hover:scale-110 transition-transform">delete</span>
						<span>Waste Classifier</span>
					</a>
					<a
						href="/dashboard/plant"
						class="flex items-center gap-2.5 p-2.5 rounded-xl border border-border-subtle hover:border-primary hover:bg-brand-mint-subtle/30 transition-all text-text-strong font-medium group"
					>
						<span class="material-symbols-outlined text-[18px] text-primary group-hover:scale-110 transition-transform">potted_plant</span>
						<span>Plant Disease</span>
					</a>
					<a
						href="/dashboard/history"
						class="flex items-center gap-2.5 p-2.5 rounded-xl border border-border-subtle hover:border-primary hover:bg-brand-mint-subtle/30 transition-all text-text-strong font-medium group"
					>
						<span class="material-symbols-outlined text-[18px] text-primary group-hover:scale-110 transition-transform">history</span>
						<span>Riwayat Analisis</span>
					</a>
					<a
						href="/dashboard/setting"
						class="flex items-center gap-2.5 p-2.5 rounded-xl border border-border-subtle hover:border-primary hover:bg-brand-mint-subtle/30 transition-all text-text-strong font-medium group"
					>
						<span class="material-symbols-outlined text-[18px] text-primary group-hover:scale-110 transition-transform">settings</span>
						<span>Pengaturan Akun</span>
					</a>
				</div>
			</div>

			<!-- Tombol CTA Kembali -->
			<div class="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
				<a
					href="/"
					class="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-surface-card border border-border-subtle hover:bg-surface-card-subtle text-text-strong text-xs font-bold transition-all shadow-xs cursor-pointer active:scale-95"
				>
					<span class="material-symbols-outlined text-[18px]">home</span>
					<span>Halaman Utama</span>
				</a>
				<a
					href="/dashboard/overview"
					class="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-primary hover:bg-brand-emerald-dark text-on-primary text-xs font-bold transition-all shadow-md active:scale-95 cursor-pointer"
				>
					<span class="material-symbols-outlined text-[18px]">arrow_back</span>
					<span>Kembali ke Dashboard</span>
				</a>
			</div>
		</div>
	</main>

	<!-- MINIMAL FOOTER -->
	<footer class="w-full py-5 px-6 text-center text-xs text-text-muted border-t border-border-subtle bg-surface-card/60 relative z-10">
		<span>&copy; 2026 SustainAI Intelligence Platform. Seluruh hak cipta dilindungi.</span>
	</footer>
</div>
