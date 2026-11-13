<script lang="ts">
	import type { PageData } from './$types';
	import PriceTrendChart from '$lib/components/dashboard/PriceTrendChart.svelte';
	import WasteCompositionChart from '$lib/components/dashboard/WasteCompositionChart.svelte';

	let { data }: { data: PageData } = $props();

	// 4 Ringkasan Metrik
	let stats = $derived(data.stats);

	function formatDateTime(isoStr: string) {
		const d = new Date(isoStr);
		return d.toLocaleDateString('id-ID', {
			day: 'numeric',
			month: 'short',
			hour: '2-digit',
			minute: '2-digit'
		});
	}
</script>

<svelte:head>
	<title>Overview - SustainAI Dashboard</title>
</svelte:head>

<div class="space-y-6">
	<!-- ========================================================================= -->
	<!-- SECTION 1: HEADER & WELCOME BANNER                                        -->
	<!-- ========================================================================= -->
	<div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-surface-card border border-border-subtle rounded-2xl p-6 shadow-xs">
		<div class="space-y-1">
			<div class="flex items-center gap-2">
				<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-brand-mint-subtle text-brand-forest border border-brand-mint/30">
					Active Session
				</span>
				<span class="text-xs text-text-muted">| Monitoring Analitik Keberlanjutan</span>
			</div>
			<h1 class="font-display font-extrabold text-2xl sm:text-3xl text-text-strong tracking-tight">
				Selamat Datang, {data.user?.full_name || 'Rekan Pengguna'}!
			</h1>
			<p class="text-xs sm:text-sm text-text-muted leading-relaxed max-w-2xl">
				Pantau indikator efisiensi pemilahan sampah, deteksi kesehatan tanaman, dan analisis tren ekonomi sirkular Anda secara real-time.
			</p>
		</div>

		<!-- Quick Action CTA -->
		<div class="flex items-center gap-3 shrink-0">
			<a
				href="/dashboard/waste"
				class="px-4 py-2.5 rounded-xl bg-primary hover:bg-brand-emerald-dark text-on-primary font-semibold text-xs sm:text-sm flex items-center gap-2 transition-all shadow-xs active:scale-95 cursor-pointer"
			>
				<span class="material-symbols-outlined text-[18px]">add_a_photo</span>
				<span>Analisis Baru</span>
			</a>
		</div>
	</div>

	<!-- ========================================================================= -->
	<!-- SECTION 2: 4-COLUMN SUMMARY METRIC CARDS                                  -->
	<!-- ========================================================================= -->
	<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
		<!-- Card 1: Total Analisis -->
		<div class="bg-surface-card border border-border-subtle rounded-2xl p-5 shadow-xs hover:border-primary/50 transition-all flex flex-col justify-between">
			<div class="flex items-start justify-between">
				<div>
					<span class="text-xs font-medium text-text-muted">Total Analisis AI</span>
					<div class="font-display font-extrabold text-2xl sm:text-3xl text-text-strong mt-1">
						{stats.total_analysis}
					</div>
				</div>
				<div class="w-10 h-10 rounded-xl bg-brand-mint-subtle flex items-center justify-center text-primary">
					<span class="material-symbols-outlined text-2xl">insights</span>
				</div>
			</div>
			<div class="pt-3 mt-3 border-t border-border-subtle flex items-center gap-1.5 text-[11px] text-text-muted">
				<span class="material-symbols-outlined text-accent-teal text-sm">check_circle</span>
				<span>Agregasi seluruh pemindaian</span>
			</div>
		</div>

		<!-- Card 2: Sampah Dianalisis -->
		<div class="bg-surface-card border border-border-subtle rounded-2xl p-5 shadow-xs hover:border-primary/50 transition-all flex flex-col justify-between">
			<div class="flex items-start justify-between">
				<div>
					<span class="text-xs font-medium text-text-muted">Sampah Dianalisis</span>
					<div class="font-display font-extrabold text-2xl sm:text-3xl text-primary mt-1">
						{stats.total_waste}
					</div>
				</div>
				<div class="w-10 h-10 rounded-xl bg-info-sky-subtle flex items-center justify-center text-info-sky">
					<span class="material-symbols-outlined text-2xl">delete_sweep</span>
				</div>
			</div>
			<div class="pt-3 mt-3 border-t border-border-subtle flex items-center gap-1.5 text-[11px] text-text-muted">
				<span class="material-symbols-outlined text-info-sky text-sm">recycling</span>
				<span>Klasifikasi &amp; nilai ekonomi</span>
			</div>
		</div>

		<!-- Card 3: Tanaman Dianalisis -->
		<div class="bg-surface-card border border-border-subtle rounded-2xl p-5 shadow-xs hover:border-primary/50 transition-all flex flex-col justify-between">
			<div class="flex items-start justify-between">
				<div>
					<span class="text-xs font-medium text-text-muted">Tanaman Dianalisis</span>
					<div class="font-display font-extrabold text-2xl sm:text-3xl text-accent-teal mt-1">
						{stats.total_plant}
					</div>
				</div>
				<div class="w-10 h-10 rounded-xl bg-accent-teal-subtle flex items-center justify-center text-accent-teal">
					<span class="material-symbols-outlined text-2xl">potted_plant</span>
				</div>
			</div>
			<div class="pt-3 mt-3 border-t border-border-subtle flex items-center gap-1.5 text-[11px] text-text-muted">
				<span class="material-symbols-outlined text-accent-teal text-sm">spa</span>
				<span>Deteksi hama &amp; penyakit</span>
			</div>
		</div>

		<!-- Card 4: Sampah Dapat Didaur Ulang -->
		<div class="bg-surface-card border border-border-subtle rounded-2xl p-5 shadow-xs hover:border-primary/50 transition-all flex flex-col justify-between">
			<div class="flex items-start justify-between">
				<div>
					<span class="text-xs font-medium text-text-muted">Potensi Daur Ulang</span>
					<div class="font-display font-extrabold text-2xl sm:text-3xl text-accent-amber mt-1">
						{stats.recyclable_waste}
					</div>
				</div>
				<div class="w-10 h-10 rounded-xl bg-accent-amber-subtle flex items-center justify-center text-accent-amber">
					<span class="material-symbols-outlined text-2xl">autorenew</span>
				</div>
			</div>
			<div class="pt-3 mt-3 border-t border-border-subtle flex items-center gap-1.5 text-[11px] text-text-muted">
				<span class="material-symbols-outlined text-accent-amber text-sm">eco</span>
				<span>
					{stats.total_waste > 0
						? `${((stats.recyclable_waste / stats.total_waste) * 100).toFixed(0)}% rasio pemulihan daur ulang`
						: 'Kategori sirkular siap pilah'}
				</span>
			</div>
		</div>
	</div>

	<!-- ========================================================================= -->
	<!-- SECTION 3: TREN FLUKTUASI HARGA SAMPAH (LINE CHART)                       -->
	<!-- ========================================================================= -->
	<PriceTrendChart data={data.priceTrends} />

	<!-- ========================================================================= -->
	<!-- SECTION 4: KOMPOSISI SAMPAH & RECENT ACTIVITIES                           -->
	<!-- ========================================================================= -->
	<div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
		<!-- Donut Chart Komposisi Sampah (1 Kolom) -->
		<div class="lg:col-span-1">
			<WasteCompositionChart data={data.composition} />
		</div>

		<!-- Feed Aktivitas Analisis Terbaru (2 Kolom) -->
		<div class="lg:col-span-2 bg-surface-card border border-border-subtle rounded-2xl p-5 sm:p-6 shadow-xs flex flex-col justify-between">
			<div>
				<div class="flex items-center justify-between mb-4">
					<div class="flex items-center gap-2">
						<span class="material-symbols-outlined text-primary text-xl">history</span>
						<h3 class="font-display font-bold text-base text-text-strong">
							Aktivitas Analisis Terbaru
						</h3>
					</div>
					<a
						href="/dashboard/history"
						class="text-xs font-semibold text-primary hover:underline flex items-center gap-1"
					>
						<span>Lihat Semua</span>
						<span class="material-symbols-outlined text-sm">arrow_forward</span>
					</a>
				</div>

				{#if data.recentActivities.length === 0}
					<div class="py-12 text-center bg-surface-base/50 rounded-xl border border-dashed border-border-subtle">
						<span class="material-symbols-outlined text-3xl text-text-muted mb-2">document_scanner</span>
						<div class="text-xs font-semibold text-text-strong mb-1">Belum Ada Catatan Analisis</div>
						<p class="text-[11px] text-text-muted max-w-xs mx-auto mb-4">
							Hasil pemindaian sampah atau tanaman Anda akan tercatat secara otomatis di sini.
						</p>
						<a
							href="/dashboard/waste"
							class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary text-on-primary text-xs font-semibold shadow-xs"
						>
							<span class="material-symbols-outlined text-sm">add_a_photo</span>
							<span>Mulai Pindai</span>
						</a>
					</div>
				{:else}
					<div class="space-y-3">
						{#each data.recentActivities as act}
							<div class="flex items-center justify-between gap-3 p-3 rounded-xl bg-surface-base hover:bg-surface-card-subtle transition-all border border-border-subtle">
								<div class="flex items-center gap-3 min-w-0">
									<div
										class="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 {act.analysis_type === 'waste'
											? 'bg-info-sky-subtle text-info-sky'
											: 'bg-accent-teal-subtle text-accent-teal'}"
									>
										<span class="material-symbols-outlined text-xl">
											{act.analysis_type === 'waste' ? 'delete' : 'potted_plant'}
										</span>
									</div>
									<div class="min-w-0">
										<div class="text-xs sm:text-sm font-semibold text-text-strong truncate">
											{act.title}
										</div>
										<div class="text-[11px] text-text-muted truncate">
											{act.subtitle}
										</div>
									</div>
								</div>

								<div class="text-right shrink-0">
									<span
										class="inline-block px-2 py-0.5 rounded-full text-[10px] font-semibold {act.analysis_type === 'waste'
											? act.is_recyclable
												? 'bg-brand-mint-subtle text-brand-forest border border-brand-mint/30'
												: 'bg-danger-rose-subtle text-danger-rose border border-danger-rose/20'
											: 'bg-accent-teal-subtle text-accent-teal border border-accent-teal/20'}"
									>
										{act.badge}
									</span>
									<div class="text-[10px] text-text-muted mt-1">
										{formatDateTime(act.created_at)}
									</div>
								</div>
							</div>
						{/each}
					</div>
				{/if}
			</div>

			<!-- Footer Info Bar -->
			<div class="mt-4 pt-3 border-t border-border-subtle flex items-center justify-between text-xs text-text-muted">
				<span class="flex items-center gap-1">
					<span class="w-2 h-2 rounded-full bg-border-focus"></span>
					AI Model: Google Gemini 3.5 Flash
				</span>
				<span>Total 5 log terkini</span>
			</div>
		</div>
	</div>
</div>
