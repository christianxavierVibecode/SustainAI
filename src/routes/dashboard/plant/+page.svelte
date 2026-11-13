<script lang="ts">
	import ImageUploadArea from '$lib/components/analysis/ImageUploadArea.svelte';
	import AnalysisLoadingModal from '$lib/components/analysis/AnalysisLoadingModal.svelte';
	import type { PlantAnalysisResult } from '$lib/server/ai/gemini';

	let selectedFile = $state<File | null>(null);
	let previewUrl = $state<string | null>(null);
	let isAnalyzing = $state(false);
	let errorMessage = $state<string | null>(null);

	// State Hasil Analisis
	let analysisResult = $state<PlantAnalysisResult | null>(null);
	let resultImageUrl = $state<string | null>(null);

	function handleImageSelected(file: File) {
		selectedFile = file;
		errorMessage = null;
		analysisResult = null;
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

			const res = await fetch('/api/analyze/plant', {
				method: 'POST',
				body: formData
			});

			const data = await res.json();

			if (!res.ok || !data.success) {
				throw new Error(data.error || 'Terjadi kesalahan saat mendiagnosis tanaman.');
			}

			analysisResult = data.result;
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
	<title>Plant Disease Diagnostics - SustainAI Dashboard</title>
</svelte:head>

<div class="space-y-6">
	<!-- ========================================================================= -->
	<!-- HEADER BANNER                                                             -->
	<!-- ========================================================================= -->
	<div class="bg-surface-card border border-border-subtle rounded-2xl p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
		<div class="space-y-1">
			<h1 class="font-display font-extrabold text-2xl sm:text-3xl text-text-strong tracking-tight">
				Plant Disease Diagnostics
			</h1>
			<p class="text-xs sm:text-sm text-text-muted leading-relaxed max-w-2xl">
				Unggah foto daun atau bagian tanaman yang sakit untuk identifikasi dini penyakit, penyebab patogen, rekomendasi perawatan alami, dan tips pencegahan.
			</p>
		</div>

		<div class="flex items-center gap-2">
			<div class="w-10 h-10 rounded-xl bg-accent-teal-subtle flex items-center justify-center text-accent-teal">
				<span class="material-symbols-outlined text-2xl">potted_plant</span>
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
						Unggah Tanaman untuk Dianalisis
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
						<img src={previewUrl} alt="Preview Tanaman" class="w-full h-full object-contain" />
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
							<span>Diagnosis Tanaman Sekarang</span>
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
				? 'bg-accent-teal-subtle/50 border-accent-teal/40 text-accent-teal'
				: 'bg-accent-amber-subtle/50 border-accent-amber/40 text-accent-amber'}">
				<div class="flex items-center gap-3">
					<span class="material-symbols-outlined text-2xl">
						{analysisResult.isValidImage ? 'psychology_alt' : 'info'}
					</span>
					<div>
						<div class="font-display font-bold text-sm">
							{analysisResult.isValidImage
								? 'Diagnosis Kesehatan Tanaman Selesai'
								: 'Peringatan: Verifikasi Visual Tanaman'}
						</div>
						<div class="text-xs opacity-90 mt-0.5">
							Model Google Gemini 3.5 Flash telah memproses gejala dan indikasi kesehatan tanaman Anda.
						</div>
					</div>
				</div>

				<button
					type="button"
					onclick={resetAnalysis}
					class="px-3.5 py-1.5 rounded-xl bg-surface-card border border-border-subtle text-xs font-semibold text-text-strong shadow-xs hover:border-primary transition-all cursor-pointer self-start sm:self-auto"
				>
					Diagnosis Tanaman Lain
				</button>
			</div>

			<!-- Result Details Layout -->
			<div class="bg-surface-card border border-border-subtle rounded-2xl p-6 shadow-xs space-y-6">
				<!-- Header Info -->
				<div class="flex flex-col sm:flex-row gap-5 items-start">
					<!-- Thumbnail Gambar -->
					<div class="w-full sm:w-48 h-48 rounded-xl overflow-hidden border border-border-subtle bg-slate-900 shrink-0">
						<img
							src={resultImageUrl || previewUrl}
							alt="Hasil Diagnosis Tanaman"
							class="w-full h-full object-cover"
						/>
					</div>

					<!-- Ringkasan Diagnostik -->
					<div class="flex-1 space-y-3 min-w-0">
						<div class="flex flex-wrap items-center gap-2">
							<span class="px-2.5 py-1 rounded-full text-xs font-bold bg-accent-teal-subtle text-accent-teal border border-accent-teal/30">
								Tanaman: {analysisResult.plant_name}
							</span>
							<span class="px-2.5 py-1 rounded-full text-xs font-semibold bg-danger-rose-subtle text-danger-rose border border-danger-rose/20">
								Indikasi: {analysisResult.detected_pest_disease}
							</span>
						</div>

						<h2 class="font-display font-extrabold text-2xl text-text-strong">
							{analysisResult.detected_pest_disease}
						</h2>

						<div class="text-xs text-text-muted leading-relaxed">
							<strong class="text-text-strong">Gejala Visual Terlihat:</strong> {analysisResult.symptoms}
						</div>

						<div class="text-xs text-text-muted leading-relaxed">
							<strong class="text-text-strong">Kemungkinan Penyebab:</strong> {analysisResult.possible_cause}
						</div>
					</div>
				</div>

				<!-- Grid 3 Kolom Rincian Penanganan -->
				<div class="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-border-subtle">
					<!-- Card 1: Rekomendasi Perawatan -->
					<div class="p-4 rounded-xl bg-brand-mint-subtle/30 border border-brand-mint/20 space-y-2">
						<div class="flex items-center gap-1.5 text-xs font-bold text-brand-forest">
							<span class="material-symbols-outlined text-base">healing</span>
							<span>Rekomendasi Perawatan</span>
						</div>
						<p class="text-xs text-text-muted leading-relaxed">
							{analysisResult.care_recommendation}
						</p>
					</div>

					<!-- Card 2: Tips Pencegahan -->
					<div class="p-4 rounded-xl bg-accent-teal-subtle/30 border border-accent-teal/20 space-y-2">
						<div class="flex items-center gap-1.5 text-xs font-bold text-accent-teal">
							<span class="material-symbols-outlined text-base">shield</span>
							<span>Tips Pencegahan</span>
						</div>
						<p class="text-xs text-text-muted leading-relaxed">
							{analysisResult.prevention_tips}
						</p>
					</div>

					<!-- Card 3: Potensi Dampak Tanaman -->
					<div class="p-4 rounded-xl bg-accent-amber-subtle/30 border border-accent-amber/20 space-y-2">
						<div class="flex items-center gap-1.5 text-xs font-bold text-accent-amber">
							<span class="material-symbols-outlined text-base">coronavirus</span>
							<span>Potensi Dampak Tanaman</span>
						</div>
						<p class="text-xs text-text-muted leading-relaxed">
							{analysisResult.plant_impact}
						</p>
					</div>
				</div>
			</div>
		</div>
	{/if}

	<!-- Loading Feedback Modal -->
	<AnalysisLoadingModal
		isOpen={isAnalyzing}
		title="Mendiagnosis Tanaman..."
		message="Sistem sedang menganalisis gejala daun, mencocokkan pola patogen tanaman, dan merumuskan saran penanganan alami..."
	/>
</div>
