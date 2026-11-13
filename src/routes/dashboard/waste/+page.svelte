<script lang="ts">
	import ImageUploadArea from '$lib/components/analysis/ImageUploadArea.svelte';
	import AnalysisLoadingModal from '$lib/components/analysis/AnalysisLoadingModal.svelte';
	import WasteBankMapIframe from '$lib/components/analysis/WasteBankMapIframe.svelte';
	import type { WasteAnalysisResult } from '$lib/server/ai/gemini';
	import type { WastePriceReference } from '$lib/server/db/analysis';

	let selectedFile = $state<File | null>(null);
	let previewUrl = $state<string | null>(null);
	let isAnalyzing = $state(false);
	let errorMessage = $state<string | null>(null);

	// State Hasil Analisis
	let analysisResult = $state<WasteAnalysisResult | null>(null);
	let priceReference = $state<WastePriceReference | null>(null);
	let resultImageUrl = $state<string | null>(null);

	function handleImageSelected(file: File) {
		selectedFile = file;
		errorMessage = null;
		analysisResult = null;
		priceReference = null;
		if (previewUrl) {
			URL.revokeObjectURL(previewUrl);
		}
		previewUrl = URL.createObjectURL(file);
	}

	function resetAnalysis() {
		selectedFile = null;
		if (previewUrl) {
			URL.revokeObjectURL(previewUrl);
			previewUrl = null;
		}
		analysisResult = null;
		priceReference = null;
		resultImageUrl = null;
		errorMessage = null;
	}

	async function runAnalysis() {
		if (!selectedFile) return;

		isAnalyzing = true;
		errorMessage = null;

		try {
			const formData = new FormData();
			formData.append('image', selectedFile);

			const res = await fetch('/api/analyze/waste', {
				method: 'POST',
				body: formData
			});

			const data = await res.json();

			if (!res.ok || !data.success) {
				throw new Error(data.error || 'Terjadi kesalahan saat memproses analisis.');
			}

			analysisResult = data.result;
			priceReference = data.priceReference;
			resultImageUrl = data.imageUrl || previewUrl;
		} catch (err: unknown) {
			const msg = err instanceof Error ? err.message : String(err);
			errorMessage = msg;
		} finally {
			isAnalyzing = false;
		}
	}
</script>

<svelte:head>
	<title>Waste Classifier - SustainAI Dashboard</title>
</svelte:head>

<div class="space-y-6">
	<!-- ========================================================================= -->
	<!-- HEADER BANNER                                                             -->
	<!-- ========================================================================= -->
	<div class="bg-surface-card border border-border-subtle rounded-2xl p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
		<div class="space-y-1">
			<div class="flex items-center gap-2">
				<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-brand-mint-subtle text-brand-forest border border-brand-mint/30">
					SDG 12 Circular Economy
				</span>
				<span class="text-xs text-text-muted">| Klasifikasi Material &amp; Estimasi Nilai</span>
			</div>
			<h1 class="font-display font-extrabold text-2xl sm:text-3xl text-text-strong tracking-tight">
				Waste Classifier &amp; Economic Value
			</h1>
			<p class="text-xs sm:text-sm text-text-muted leading-relaxed max-w-2xl">
				Ambil foto atau unggah gambar sampah untuk identifikasi jenis material, potensi daur ulang, panduan reduksi dampak lingkungan, dan acuan harga Bank Sampah.
			</p>
		</div>

		<div class="flex items-center gap-2">
			<div class="w-10 h-10 rounded-xl bg-info-sky-subtle flex items-center justify-center text-info-sky">
				<span class="material-symbols-outlined text-2xl">recycling</span>
			</div>
		</div>
	</div>

	<!-- ========================================================================= -->
	<!-- MAIN WORKFLOW: UPLOAD & INPUT AREA                                        -->
	<!-- ========================================================================= -->
	{#if !analysisResult}
		<div class="bg-surface-card border border-border-subtle rounded-2xl p-6 shadow-xs space-y-5">
			<div class="flex items-center justify-between border-b border-border-subtle pb-3">
				<div>
					<h3 class="font-display font-bold text-base text-text-strong">
						Unggah Sampah untuk Dianalisis
					</h3>
					<p class="text-xs text-text-muted mt-0.5">
						Pilih berkas foto atau gunakan kamera langsung perangkat Anda.
					</p>
				</div>
				{#if selectedFile}
					<button
						type="button"
						onclick={resetAnalysis}
						class="text-xs text-danger-rose hover:underline font-semibold flex items-center gap-1 cursor-pointer"
					>
						<span class="material-symbols-outlined text-sm">restart_alt</span>
						<span>Ganti Gambar</span>
					</button>
				{/if}
			</div>

			{#if !selectedFile}
				<ImageUploadArea onImageSelected={handleImageSelected} {isAnalyzing} />
			{:else}
				<!-- Image Preview & Action Controls -->
				<div class="space-y-4">
					<div class="relative max-w-md mx-auto aspect-video rounded-2xl overflow-hidden border border-border-subtle bg-slate-900 shadow-md flex items-center justify-center">
						<img src={previewUrl} alt="Preview Sampah" class="w-full h-full object-contain" />
						<div class="absolute bottom-2 left-2 px-2.5 py-1 rounded-lg bg-black/60 text-white text-[11px] backdrop-blur-xs flex items-center gap-1.5">
							<span class="material-symbols-outlined text-sm text-border-focus">check_circle</span>
							<span class="truncate max-w-[200px]">{selectedFile.name}</span>
						</div>
					</div>

					<div class="flex items-center justify-center gap-3 pt-2">
						<button
							type="button"
							onclick={resetAnalysis}
							class="px-4 py-2.5 rounded-xl border border-border-subtle text-xs font-semibold text-text-muted hover:text-text-strong hover:bg-surface-base transition-all cursor-pointer"
						>
							Pilih Ulang
						</button>

						<button
							type="button"
							onclick={runAnalysis}
							disabled={isAnalyzing}
							class="px-6 py-2.5 rounded-xl bg-primary hover:bg-brand-emerald-dark text-on-primary font-semibold text-xs sm:text-sm flex items-center gap-2 shadow-xs transition-all active:scale-95 cursor-pointer disabled:opacity-50"
						>
							<span class="material-symbols-outlined text-[18px]">psychology</span>
							<span>Analisis Sampah Sekarang</span>
						</button>
					</div>
				</div>
			{/if}

			{#if errorMessage}
				<div class="p-4 rounded-xl bg-danger-rose-subtle border border-danger-rose/30 text-danger-rose text-xs flex items-start gap-2.5">
					<span class="material-symbols-outlined text-lg shrink-0">error</span>
					<div class="leading-relaxed font-medium">{errorMessage}</div>
				</div>
			{/if}
		</div>
	{:else}
		<!-- ========================================================================= -->
		<!-- ANALYSIS RESULT VIEWPORT                                                  -->
		<!-- ========================================================================= -->
		<div class="space-y-6">
			<!-- Result Alert Banner -->
			<div class="p-4 rounded-2xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs {analysisResult.isValidImage
				? 'bg-brand-mint-subtle/50 border-brand-mint/40 text-brand-forest'
				: 'bg-accent-amber-subtle/50 border-accent-amber/40 text-accent-amber'}">
				<div class="flex items-center gap-3">
					<span class="material-symbols-outlined text-2xl">
						{analysisResult.isValidImage ? 'verified' : 'info'}
					</span>
					<div>
						<div class="font-display font-bold text-sm">
							{analysisResult.isValidImage
								? 'Analisis Sampah Berhasil Diverifikasi'
								: 'Peringatan: Gambar Membutuhkan Konfirmasi'}
						</div>
						<div class="text-xs opacity-90 mt-0.5">
							Model Google Gemini 3.5 Flash telah memproses karakteristik visual sampah Anda.
						</div>
					</div>
				</div>

				<button
					type="button"
					onclick={resetAnalysis}
					class="px-3.5 py-1.5 rounded-xl bg-surface-card border border-border-subtle text-xs font-semibold text-text-strong shadow-xs hover:border-primary transition-all cursor-pointer self-start sm:self-auto"
				>
					Pindai Sampah Lain
				</button>
			</div>

			<!-- Result Details Layout: 2 Kolom -->
			<div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
				<!-- Kolom Kiri: Visual & Detail Identifikasi (2 Kolom) -->
				<div class="lg:col-span-2 space-y-6">
					<div class="bg-surface-card border border-border-subtle rounded-2xl p-6 shadow-xs space-y-5">
						<div class="flex flex-col sm:flex-row gap-5 items-start">
							<!-- Thumbnail Gambar -->
							<div class="w-full sm:w-44 h-44 rounded-xl overflow-hidden border border-border-subtle bg-slate-900 shrink-0">
								<img
									src={resultImageUrl || previewUrl}
									alt="Hasil Analisis"
									class="w-full h-full object-cover"
								/>
							</div>

							<!-- Informasi Utama Identifikasi -->
							<div class="flex-1 space-y-3 min-w-0">
								<div class="flex flex-wrap items-center gap-2">
									<span class="px-2.5 py-1 rounded-full text-xs font-bold {analysisResult.is_recyclable
										? 'bg-brand-mint-subtle text-brand-forest border border-brand-mint/30'
										: 'bg-danger-rose-subtle text-danger-rose border border-danger-rose/20'}">
										{analysisResult.is_recyclable ? 'Bisa Didaur Ulang (Recyclable)' : 'Residu / Non-Recyclable'}
									</span>
									<span class="px-2.5 py-1 rounded-full text-xs font-semibold bg-surface-base text-text-muted border border-border-subtle">
										Kategori: {analysisResult.classification}
									</span>
								</div>

								<h2 class="font-display font-extrabold text-2xl text-text-strong">
									{analysisResult.waste_name}
								</h2>

								<!-- Estimasi Harga jika tersedia -->
								{#if priceReference}
									<div class="p-3.5 rounded-xl bg-surface-base border border-border-subtle flex items-center justify-between">
										<div>
											<div class="text-[11px] text-text-muted font-medium">Acuan Harga Bank Sampah:</div>
											<div class="text-xs font-bold text-text-strong mt-0.5">{priceReference.sub_category_name}</div>
										</div>
										<div class="text-right">
											<div class="font-display font-extrabold text-lg text-primary">
												Rp {priceReference.current_price.toLocaleString('id-ID')}
											</div>
											<div class="text-[10px] text-text-muted">per {priceReference.unit}</div>
										</div>
									</div>
								{/if}
							</div>
						</div>

						<!-- Penjelasan Dampak Lingkungan -->
						<div class="pt-4 border-t border-border-subtle space-y-2">
							<div class="flex items-center gap-2 text-xs font-bold text-text-strong">
								<span class="material-symbols-outlined text-accent-amber text-lg">nature_people</span>
								<span>Dampak Lingkungan &amp; Konservasi</span>
							</div>
							<p class="text-xs sm:text-sm text-text-muted leading-relaxed bg-surface-base p-4 rounded-xl border border-border-subtle">
								{analysisResult.environmental_impact}
							</p>
						</div>

						<!-- Panduan & Tips Daur Ulang -->
						<div class="space-y-2">
							<div class="flex items-center gap-2 text-xs font-bold text-text-strong">
								<span class="material-symbols-outlined text-primary text-lg">tips_and_updates</span>
								<span>Rekomendasi Pemilahan &amp; Daur Ulang</span>
							</div>
							<p class="text-xs sm:text-sm text-text-muted leading-relaxed bg-brand-mint-subtle/30 p-4 rounded-xl border border-brand-mint/20">
								{analysisResult.recycling_tips}
							</p>
						</div>
					</div>
				</div>

				<!-- Kolom Kanan: Peta Bank Sampah (1 Kolom) -->
				<div class="lg:col-span-1">
					<WasteBankMapIframe />
				</div>
			</div>
		</div>
	{/if}

	<!-- Peta Google My Maps Selalu Ditampilkan di Bawah Form Saat Mode Standby -->
	{#if !analysisResult}
		<WasteBankMapIframe />
	{/if}

	<!-- Loading Feedback Modal -->
	<AnalysisLoadingModal
		isOpen={isAnalyzing}
		title="Menganalisis Sampah..."
		message="Sistem sedang memproses visual material, mengklasifikasikan jenis daur ulang, dan mencocokkan acuan harga Bank Sampah..."
	/>
</div>
