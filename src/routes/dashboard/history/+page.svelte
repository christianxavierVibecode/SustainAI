<script lang="ts">
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
	import type { PageData, ActionData } from './$types';
	import type { HistoryItem } from '$lib/server/db/history';

	let { data, form }: { data: PageData; form: ActionData } = $props();

	// Modal State untuk Detail Lengkap
	let selectedRecord = $state<HistoryItem | null>(null);

	// Modal State untuk Konfirmasi Hapus
	let recordToDelete = $state<HistoryItem | null>(null);
	let isDeleting = $state(false);

	// Input Pencarian
	let searchInput = $state('');

	$effect(() => {
		searchInput = data.filters.search;
	});

	function openDetail(record: HistoryItem) {
		selectedRecord = record;
	}

	function closeDetail() {
		selectedRecord = null;
	}

	function confirmDelete(record: HistoryItem, event: MouseEvent) {
		event.stopPropagation();
		recordToDelete = record;
	}

	function closeDeleteModal() {
		recordToDelete = null;
	}

	function setTypeFilter(newType: string) {
		const url = new URL(page.url.href);
		url.searchParams.set('type', newType);
		url.searchParams.set('page', '1');
		goto(url.toString());
	}

	function handleSearchSubmit(e: SubmitEvent) {
		e.preventDefault();
		const url = new URL(page.url.href);
		if (searchInput.trim()) {
			url.searchParams.set('search', searchInput.trim());
		} else {
			url.searchParams.delete('search');
		}
		url.searchParams.set('page', '1');
		goto(url.toString());
	}

	function goToPage(newPage: number) {
		const url = new URL(page.url.href);
		url.searchParams.set('page', String(newPage));
		goto(url.toString());
	}

	function formatDate(iso: string) {
		const d = new Date(iso);
		return d.toLocaleDateString('id-ID', {
			day: 'numeric',
			month: 'short',
			year: 'numeric',
			hour: '2-digit',
			minute: '2-digit'
		});
	}
</script>

<svelte:head>
	<title>Riwayat Analisis - SustainAI Dashboard</title>
</svelte:head>

<div class="space-y-6">
	<!-- ========================================================================= -->
	<!-- HEADER BANNER & STATS                                                     -->
	<!-- ========================================================================= -->
	<div class="bg-surface-card border border-border-subtle rounded-2xl p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
		<div class="space-y-1">
			<div class="flex items-center gap-2">
				<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-brand-mint-subtle text-brand-forest border border-brand-mint/30">
					Riwayat Saya
				</span>
				<span class="text-xs text-text-muted">| Arsip Hasil Diagnosis &amp; Klasifikasi</span>
			</div>
			<h1 class="font-display font-extrabold text-2xl sm:text-3xl text-text-strong tracking-tight">
				Riwayat Analisis AI
			</h1>
			<p class="text-xs sm:text-sm text-text-muted leading-relaxed max-w-2xl">
				Tinjau catatan pemindaian sampah dan tanaman terdahulu, periksa foto asli beresolusi tinggi di penyimpanan aman, dan akses kembali rekomendasi cerdas.
			</p>
		</div>

		<!-- Mini Stat Counter Pills -->
		<div class="flex items-center gap-2 self-start sm:self-auto shrink-0">
			<div class="px-3.5 py-2 rounded-xl bg-surface-base border border-border-subtle text-center">
				<div class="text-[10px] text-text-muted font-medium">Total Sampah</div>
				<div class="font-display font-bold text-base text-primary">{data.summary.total_waste}</div>
			</div>
			<div class="px-3.5 py-2 rounded-xl bg-surface-base border border-border-subtle text-center">
				<div class="text-[10px] text-text-muted font-medium">Total Tanaman</div>
				<div class="font-display font-bold text-accent-teal">{data.summary.total_plant}</div>
			</div>
		</div>
	</div>

	<!-- ========================================================================= -->
	<!-- FILTER TABS & SEARCH CONTROLS                                             -->
	<!-- ========================================================================= -->
	<div class="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-surface-card border border-border-subtle rounded-2xl p-4 shadow-xs">
		<!-- Type Filter Pills -->
		<div class="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
			<button
				type="button"
				onclick={() => setTypeFilter('all')}
				class="px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer border {data.filters.type === 'all'
					? 'bg-primary text-on-primary border-primary shadow-xs'
					: 'bg-surface-base text-text-muted border-border-subtle hover:text-text-strong'}"
			>
				Semua ({data.summary.total_records})
			</button>

			<button
				type="button"
				onclick={() => setTypeFilter('waste')}
				class="px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer border {data.filters.type === 'waste'
					? 'bg-primary text-on-primary border-primary shadow-xs'
					: 'bg-surface-base text-text-muted border-border-subtle hover:text-text-strong'}"
			>
				Sampah ({data.summary.total_waste})
			</button>

			<button
				type="button"
				onclick={() => setTypeFilter('plant')}
				class="px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer border {data.filters.type === 'plant'
					? 'bg-primary text-on-primary border-primary shadow-xs'
					: 'bg-surface-base text-text-muted border-border-subtle hover:text-text-strong'}"
			>
				Tanaman ({data.summary.total_plant})
			</button>
		</div>

		<!-- Search Input Form -->
		<form onsubmit={handleSearchSubmit} class="relative w-full md:w-80">
			<span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-text-muted text-[18px]">
				search
			</span>
			<input
				type="text"
				bind:value={searchInput}
				placeholder="Cari nama tanaman / sampah..."
				class="w-full pl-9 pr-8 py-2 rounded-xl bg-surface-base border border-border-subtle text-xs text-text-strong placeholder:text-text-muted focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
			/>
			{#if searchInput}
				<button
					type="button"
					onclick={() => {
						searchInput = '';
						const url = new URL(page.url.href);
						url.searchParams.delete('search');
						url.searchParams.set('page', '1');
						goto(url.toString());
					}}
					class="material-symbols-outlined absolute right-2.5 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-strong text-[16px] cursor-pointer"
				>
					close
				</button>
			{/if}
		</form>
	</div>

	<!-- Alert Feedback jika aksi hapus gagal -->
	{#if form?.error}
		<div class="p-4 rounded-xl bg-danger-rose-subtle border border-danger-rose/30 text-danger-rose text-xs flex items-center gap-2">
			<span class="material-symbols-outlined text-lg">error</span>
			<span>{form.error}</span>
		</div>
	{/if}

	<!-- ========================================================================= -->
	<!-- HISTORY GRID / EMPTY STATE                                                -->
	<!-- ========================================================================= -->
	{#if data.history.length === 0}
		<div class="py-16 text-center bg-surface-card rounded-2xl border border-dashed border-border-subtle p-6 space-y-3">
			<div class="w-14 h-14 rounded-2xl bg-surface-base border border-border-subtle flex items-center justify-center text-text-muted mx-auto shadow-xs">
				<span class="material-symbols-outlined text-3xl">folder_off</span>
			</div>
			<div class="font-display font-bold text-base text-text-strong">
				Tidak Ada Riwayat Analisis Ditemukan
			</div>
			<p class="text-xs text-text-muted max-w-sm mx-auto leading-relaxed">
				{data.filters.search
					? `Tidak ditemukan catatan yang cocok dengan kata kunci "${data.filters.search}". Coba kata kunci lain.`
					: 'Anda belum memiliki riwayat analisis. Silakan gunakan Waste Classifier atau Plant Disease Diagnostics untuk mulai memindai.'}
			</p>
			<div class="pt-2 flex items-center justify-center gap-3">
				<a
					href="/dashboard/waste"
					class="px-4 py-2 rounded-xl bg-primary text-on-primary font-semibold text-xs shadow-xs hover:bg-brand-emerald-dark transition-all flex items-center gap-1.5"
				>
					<span class="material-symbols-outlined text-sm">delete</span>
					<span>Pindai Sampah</span>
				</a>
				<a
					href="/dashboard/plant"
					class="px-4 py-2 rounded-xl bg-surface-base border border-border-subtle text-text-strong font-semibold text-xs shadow-xs hover:bg-surface-card transition-all flex items-center gap-1.5"
				>
					<span class="material-symbols-outlined text-sm">potted_plant</span>
					<span>Diagnosis Tanaman</span>
				</a>
			</div>
		</div>
	{:else}
		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
			{#each data.history as item}
				{@const isWaste = item.analysis_type === 'waste'}
				<!-- History Card -->
				<div
					role="button"
					tabindex="0"
					onclick={() => openDetail(item)}
					onkeydown={(e) => e.key === 'Enter' && openDetail(item)}
					class="bg-surface-card border border-border-subtle rounded-2xl p-4 shadow-xs hover:border-primary/50 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group"
				>
					<div class="space-y-3">
						<!-- Thumbnail Image & Type Badge -->
						<div class="relative w-full aspect-video rounded-xl overflow-hidden bg-slate-900 border border-border-subtle">
							{#if item.signed_image_url}
								<img
									src={item.signed_image_url}
									alt="Thumbnail Hasil Analisis"
									class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
								/>
							{:else}
								<div class="w-full h-full flex items-center justify-center text-text-muted text-xs">
									<span class="material-symbols-outlined text-2xl mr-1">image_not_supported</span>
									<span>Gambar Terproteksi</span>
								</div>
							{/if}

							<!-- Top Floating Badges -->
							<div class="absolute top-2 left-2 flex items-center gap-1.5">
								<span
									class="px-2 py-0.5 rounded-lg text-[10px] font-bold backdrop-blur-md shadow-xs {isWaste
										? 'bg-info-sky-subtle/90 text-info-sky border border-info-sky/30'
										: 'bg-accent-teal-subtle/90 text-accent-teal border border-accent-teal/30'}"
								>
									{isWaste ? 'Sampah' : 'Tanaman'}
								</span>

								{#if isWaste && item.is_recyclable !== undefined}
									<span
										class="px-2 py-0.5 rounded-lg text-[10px] font-bold backdrop-blur-md shadow-xs {item.is_recyclable
											? 'bg-brand-mint-subtle/90 text-brand-forest border border-brand-mint/40'
											: 'bg-danger-rose-subtle/90 text-danger-rose border border-danger-rose/30'}"
									>
										{item.is_recyclable ? 'Recyclable' : 'Residu'}
									</span>
								{/if}
							</div>

							<!-- Tombol Hapus Cepat di Sudut Gambar -->
							<button
								type="button"
								onclick={(e) => confirmDelete(item, e)}
								class="absolute top-2 right-2 w-7 h-7 rounded-lg bg-black/60 hover:bg-danger-rose text-white flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 shadow-sm cursor-pointer"
								title="Hapus Catatan Ini"
							>
								<span class="material-symbols-outlined text-[16px]">delete</span>
							</button>
						</div>

						<!-- Card Content -->
						<div>
							<div class="text-[11px] text-text-muted">
								{formatDate(item.created_at)}
							</div>
							<h3 class="font-display font-bold text-base text-text-strong truncate mt-0.5">
								{isWaste
									? item.waste_detected_name || 'Sampah Terdeteksi'
									: item.plant_name || 'Tanaman Terdeteksi'}
							</h3>
							<p class="text-xs text-text-muted line-clamp-2 mt-1 leading-relaxed">
								{isWaste
									? item.waste_classification || 'Klasifikasi Daur Ulang'
									: item.detected_pest_disease || 'Diagnosis Kesehatan'}
							</p>
						</div>
					</div>

					<!-- Card Action Footer -->
					<div class="pt-3 mt-3 border-t border-border-subtle flex items-center justify-between text-xs font-semibold text-primary">
						<span class="flex items-center gap-1 text-[11px] text-text-muted font-normal">
							<span class="material-symbols-outlined text-sm">visibility</span>
							<span>Klik untuk rincian</span>
						</span>
						<span class="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">
							arrow_forward
						</span>
					</div>
				</div>
			{/each}
		</div>

		<!-- ========================================================================= -->
		<!-- PAGINATION CONTROLS                                                       -->
		<!-- ========================================================================= -->
		{#if data.filters.totalPages > 1}
			<div class="flex items-center justify-between gap-4 pt-4 border-t border-border-subtle">
				<div class="text-xs text-text-muted">
					Halaman <strong class="text-text-strong">{data.filters.page}</strong> dari <strong class="text-text-strong">{data.filters.totalPages}</strong> (Total {data.filters.totalRecords} data)
				</div>

				<div class="flex items-center gap-2">
					<button
						type="button"
						onclick={() => goToPage(data.filters.page - 1)}
						disabled={data.filters.page <= 1}
						class="px-3 py-1.5 rounded-xl border border-border-subtle text-xs font-semibold text-text-strong bg-surface-card hover:bg-surface-base transition-all disabled:opacity-40 disabled:pointer-events-none cursor-pointer flex items-center gap-1 shadow-xs"
					>
						<span class="material-symbols-outlined text-sm">chevron_left</span>
						<span>Sebelumnya</span>
					</button>

					<button
						type="button"
						onclick={() => goToPage(data.filters.page + 1)}
						disabled={data.filters.page >= data.filters.totalPages}
						class="px-3 py-1.5 rounded-xl border border-border-subtle text-xs font-semibold text-text-strong bg-surface-card hover:bg-surface-base transition-all disabled:opacity-40 disabled:pointer-events-none cursor-pointer flex items-center gap-1 shadow-xs"
					>
						<span>Berikutnya</span>
						<span class="material-symbols-outlined text-sm">chevron_right</span>
					</button>
				</div>
			</div>
		{/if}
	{/if}

	<!-- ========================================================================= -->
	<!-- MODAL DETAIL LENGKAP                                                      -->
	<!-- ========================================================================= -->
	{#if selectedRecord}
		{@const isWaste = selectedRecord.analysis_type === 'waste'}
		{@const res = selectedRecord.result as Record<string, any>}
		<div
			class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in"
			role="dialog"
			aria-modal="true"
		>
			<div class="bg-surface-card border border-border-subtle rounded-3xl max-w-2xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
				<!-- Modal Header -->
				<div class="p-5 sm:p-6 border-b border-border-subtle flex items-center justify-between gap-4 bg-surface-card shrink-0">
					<div class="flex items-center gap-2.5">
						<div
							class="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 {isWaste
								? 'bg-info-sky-subtle text-info-sky'
								: 'bg-accent-teal-subtle text-accent-teal'}"
						>
							<span class="material-symbols-outlined text-2xl">
								{isWaste ? 'delete_sweep' : 'potted_plant'}
							</span>
						</div>
						<div>
							<div class="font-display font-extrabold text-base sm:text-lg text-text-strong leading-tight">
								{isWaste
									? selectedRecord.waste_detected_name || 'Rincian Analisis Sampah'
									: selectedRecord.plant_name || 'Rincian Diagnosis Tanaman'}
							</div>
							<div class="text-[11px] text-text-muted mt-0.5">
								Dianalisis pada {formatDate(selectedRecord.created_at)}
							</div>
						</div>
					</div>

					<button
						type="button"
						onclick={closeDetail}
						aria-label="Tutup modal"
						class="w-8 h-8 rounded-full bg-surface-base hover:bg-surface-card-subtle text-text-muted hover:text-text-strong flex items-center justify-center transition-colors cursor-pointer"
					>
						<span class="material-symbols-outlined text-lg">close</span>
					</button>
				</div>

				<!-- Modal Scrollable Body -->
				<div class="p-5 sm:p-6 overflow-y-auto space-y-5 flex-1">
					<!-- Gambar Penuh & Badges -->
					<div class="flex flex-col sm:flex-row gap-5 items-start">
						{#if selectedRecord.signed_image_url}
							<div class="w-full sm:w-52 h-52 rounded-2xl overflow-hidden bg-slate-900 border border-border-subtle shrink-0">
								<img
									src={selectedRecord.signed_image_url}
									alt="Gambar Lengkap Hasil Analisis"
									class="w-full h-full object-cover"
								/>
							</div>
						{/if}

						<div class="flex-1 space-y-3 min-w-0">
							<div class="flex flex-wrap items-center gap-2">
								<span class="px-2.5 py-1 rounded-full text-xs font-bold {isWaste
									? selectedRecord.is_recyclable
										? 'bg-brand-mint-subtle text-brand-forest border border-brand-mint/30'
										: 'bg-danger-rose-subtle text-danger-rose border border-danger-rose/20'
									: 'bg-accent-teal-subtle text-accent-teal border border-accent-teal/30'}">
									{isWaste
										? selectedRecord.is_recyclable
											? 'Dapat Didaur Ulang (Recyclable)'
											: 'Residu / Non-Recyclable'
										: `Indikasi: ${selectedRecord.detected_pest_disease || 'Terdeteksi'}`}
								</span>

								<span class="px-2.5 py-1 rounded-full text-xs font-semibold bg-surface-base text-text-muted border border-border-subtle">
									AI: {selectedRecord.ai_model}
								</span>
							</div>

							{#if isWaste}
								<div class="text-xs text-text-muted">
									<strong class="text-text-strong">Kategori:</strong> {selectedRecord.waste_classification || res.classification || '-'}
								</div>
							{:else}
								<div class="text-xs text-text-muted">
									<strong class="text-text-strong">Tanaman:</strong> {selectedRecord.plant_name || res.plant_name || '-'}
								</div>
								<div class="text-xs text-text-muted">
									<strong class="text-text-strong">Gejala:</strong> {res.symptoms || '-'}
								</div>
							{/if}
						</div>
					</div>

					<!-- Rincian Hasil Analisis AI Sesuai Tipe -->
					{#if isWaste}
						<div class="space-y-3">
							<div class="p-4 rounded-xl bg-surface-base border border-border-subtle space-y-1">
								<div class="flex items-center gap-1.5 text-xs font-bold text-text-strong">
									<span class="material-symbols-outlined text-accent-amber text-base">nature_people</span>
									<span>Dampak Lingkungan</span>
								</div>
								<p class="text-xs text-text-muted leading-relaxed">
									{res.environmental_impact || 'Tidak ada data rincian.'}
								</p>
							</div>

							<div class="p-4 rounded-xl bg-brand-mint-subtle/30 border border-brand-mint/20 space-y-1">
								<div class="flex items-center gap-1.5 text-xs font-bold text-brand-forest">
									<span class="material-symbols-outlined text-primary text-base">tips_and_updates</span>
									<span>Rekomendasi Pemilahan &amp; Daur Ulang</span>
								</div>
								<p class="text-xs text-text-muted leading-relaxed">
									{res.recycling_tips || 'Tidak ada rekomendasi khusus.'}
								</p>
							</div>
						</div>
					{:else}
						<div class="space-y-3">
							<div class="p-4 rounded-xl bg-surface-base border border-border-subtle space-y-1">
								<div class="flex items-center gap-1.5 text-xs font-bold text-text-strong">
									<span class="material-symbols-outlined text-accent-amber text-base">help_outline</span>
									<span>Kemungkinan Penyebab</span>
								</div>
								<p class="text-xs text-text-muted leading-relaxed">
									{res.possible_cause || 'Tidak dapat dipastikan.'}
								</p>
							</div>

							<div class="p-4 rounded-xl bg-brand-mint-subtle/30 border border-brand-mint/20 space-y-1">
								<div class="flex items-center gap-1.5 text-xs font-bold text-brand-forest">
									<span class="material-symbols-outlined text-primary text-base">healing</span>
									<span>Rekomendasi Perawatan</span>
								</div>
								<p class="text-xs text-text-muted leading-relaxed">
									{res.care_recommendation || 'Tidak ada rekomendasi.'}
								</p>
							</div>

							<div class="p-4 rounded-xl bg-accent-teal-subtle/30 border border-accent-teal/20 space-y-1">
								<div class="flex items-center gap-1.5 text-xs font-bold text-accent-teal">
									<span class="material-symbols-outlined text-accent-teal text-base">shield</span>
									<span>Tips Pencegahan</span>
								</div>
								<p class="text-xs text-text-muted leading-relaxed">
									{res.prevention_tips || 'Tidak ada data pencegahan.'}
								</p>
							</div>

							<div class="p-4 rounded-xl bg-surface-base border border-border-subtle space-y-1">
								<div class="flex items-center gap-1.5 text-xs font-bold text-text-strong">
									<span class="material-symbols-outlined text-danger-rose text-base">coronavirus</span>
									<span>Potensi Dampak Terhadap Tanaman</span>
								</div>
								<p class="text-xs text-text-muted leading-relaxed">
									{res.plant_impact || 'Dampak tidak spesifik.'}
								</p>
							</div>
						</div>
					{/if}
				</div>

				<!-- Modal Footer -->
				<div class="p-4 sm:p-5 border-t border-border-subtle bg-surface-base flex items-center justify-between shrink-0">
					<button
						type="button"
						onclick={(e) => {
							const rec = selectedRecord;
							closeDetail();
							if (rec) confirmDelete(rec, e);
						}}
						class="px-3 py-1.5 rounded-xl border border-danger-rose/30 text-danger-rose hover:bg-danger-rose-subtle text-xs font-semibold transition-all cursor-pointer flex items-center gap-1"
					>
						<span class="material-symbols-outlined text-sm">delete</span>
						<span>Hapus Catatan</span>
					</button>

					<button
						type="button"
						onclick={closeDetail}
						class="px-4 py-1.5 rounded-xl bg-surface-card border border-border-subtle text-xs font-semibold text-text-strong hover:bg-surface-base transition-all cursor-pointer shadow-xs"
					>
						Tutup
					</button>
				</div>
			</div>
		</div>
	{/if}

	<!-- ========================================================================= -->
	<!-- MODAL KONFIRMASI HAPUS                                                    -->
	<!-- ========================================================================= -->
	{#if recordToDelete}
		<div
			class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in"
			role="dialog"
			aria-modal="true"
		>
			<div class="bg-surface-card border border-border-subtle rounded-3xl p-6 max-w-sm w-full shadow-2xl space-y-4">
				<div class="w-12 h-12 rounded-2xl bg-danger-rose-subtle text-danger-rose flex items-center justify-center mx-auto shadow-xs">
					<span class="material-symbols-outlined text-2xl">delete_forever</span>
				</div>

				<div class="text-center space-y-1">
					<h3 class="font-display font-bold text-base text-text-strong">
						Hapus Catatan Riwayat?
					</h3>
					<p class="text-xs text-text-muted leading-relaxed">
						Apakah Anda yakin ingin menghapus catatan analisis ini? File gambar dan hasil diagnosis akan dihapus permanen.
					</p>
				</div>

				<form
					method="POST"
					action="?/delete"
					use:enhance={() => {
						isDeleting = true;
						return async ({ update }) => {
							await update();
							isDeleting = false;
							recordToDelete = null;
						};
					}}
					class="flex items-center gap-3 pt-2"
				>
					<input type="hidden" name="id" value={recordToDelete.id} />

					<button
						type="button"
						onclick={closeDeleteModal}
						class="flex-1 py-2 rounded-xl border border-border-subtle text-xs font-semibold text-text-strong hover:bg-surface-base transition-all cursor-pointer"
					>
						Batal
					</button>

					<button
						type="submit"
						disabled={isDeleting}
						class="flex-1 py-2 rounded-xl bg-danger-rose hover:bg-red-700 text-white text-xs font-semibold transition-all shadow-xs cursor-pointer disabled:opacity-50"
					>
						{isDeleting ? 'Menghapus...' : 'Ya, Hapus'}
					</button>
				</form>
			</div>
		</div>
	{/if}
</div>
