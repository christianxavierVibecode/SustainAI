<script lang="ts">
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
	import type { PageProps } from './$types';
	import type { WastePriceItem } from '$lib/server/db/wastePrice';

	let { data, form }: PageProps = $props();

	// State Modal Add/Edit
	let isModalOpen = $state(false);
	let modalMode = $state<'create' | 'edit'>('create');
	let isSubmitting = $state(false);

	// Form fields
	let formId = $state<number | null>(null);
	let formSubCategoryId = $state<number>(1);
	let formPrice = $state<number | string>('');
	let formCreatedAt = $state<string>('');

	// State Modal Delete
	let isDeleteModalOpen = $state(false);
	let itemToDelete = $state<WastePriceItem | null>(null);
	let isDeleting = $state(false);

	// Search & Filter state
	let searchInput = $state('');

	$effect(() => {
		searchInput = data.filters.search || '';
	});

	// Helper grouping subcategories by category
	let groupedSubCategories = $derived.by(() => {
		const map = new Map<string, Array<{ id: number; name: string }>>();
		for (const item of data.subCategories) {
			if (!map.has(item.category_name)) {
				map.set(item.category_name, []);
			}
			map.get(item.category_name)!.push({
				id: item.sub_category_id,
				name: item.sub_category_name
			});
		}
		return Array.from(map.entries());
	});

	function openCreateModal() {
		modalMode = 'create';
		formId = null;
		formSubCategoryId = data.subCategories[0]?.sub_category_id ?? 1;
		formPrice = '';
		// Default to current local datetime-local format: YYYY-MM-DDTHH:mm
		const now = new Date();
		const offset = now.getTimezoneOffset() * 60000;
		formCreatedAt = new Date(now.getTime() - offset).toISOString().slice(0, 16);
		isModalOpen = true;
	}

	function openEditModal(item: WastePriceItem) {
		modalMode = 'edit';
		formId = item.id;
		formSubCategoryId = item.waste_sub_category_id;
		formPrice = item.price;
		// Format to YYYY-MM-DDTHH:mm
		const d = new Date(item.created_at);
		const offset = d.getTimezoneOffset() * 60000;
		formCreatedAt = new Date(d.getTime() - offset).toISOString().slice(0, 16);
		isModalOpen = true;
	}

	function closeModal() {
		isModalOpen = false;
	}

	function confirmDelete(item: WastePriceItem) {
		itemToDelete = item;
		isDeleteModalOpen = true;
	}

	function closeDeleteModal() {
		isDeleteModalOpen = false;
		itemToDelete = null;
	}

	function handleCategoryFilter(categoryId: number | null) {
		const url = new URL(page.url.href);
		if (categoryId) {
			url.searchParams.set('category', categoryId.toString());
		} else {
			url.searchParams.delete('category');
		}
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

	function goToPage(p: number) {
		if (p < 1 || p > data.pagination.totalPages) return;
		const url = new URL(page.url.href);
		url.searchParams.set('page', p.toString());
		goto(url.toString());
	}

	function formatDateTime(isoString: string) {
		const d = new Date(isoString);
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
	<title>Admin - Manajemen Harga Sampah | SustainAI</title>
</svelte:head>

<div class="min-h-screen bg-surface-base text-text-strong font-body flex flex-col justify-between selection:bg-brand-mint selection:text-brand-forest">
	<!-- HEADER ADMIN -->
	<header class="w-full bg-surface-card border-b border-border-subtle py-3.5 px-4 sm:px-8 sticky top-0 z-40 flex items-center justify-between shadow-xs">
		<div class="flex items-center gap-3">
			<a href="/admin" class="w-10 h-10 rounded-xl bg-brand-mint-subtle border border-border-focus/30 flex items-center justify-center p-1.5 shadow-xs">
				<img alt="SustainAI Logo" class="w-full h-full object-contain" src="/SustainAI-Icon.webp" />
			</a>
			<div>
				<div class="font-display font-extrabold text-base sm:text-lg text-primary leading-tight">
					SustainAI Admin
				</div>
				<div class="text-[11px] font-medium text-text-muted">
					Waste Price Management &amp; Observability
				</div>
			</div>
		</div>

		<div class="flex items-center gap-3 sm:gap-4">
			<span class="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full bg-accent-amber-subtle text-accent-amber border border-accent-amber/20">
				<span class="w-2 h-2 rounded-full bg-accent-amber animate-pulse"></span>
				<span class="hidden sm:inline">Admin Mode</span>
			</span>

			<form method="POST" action="/get-started?/logout">
				<button
					type="submit"
					class="text-xs font-semibold text-danger-rose hover:underline cursor-pointer flex items-center gap-1 py-1 px-2 rounded-lg hover:bg-danger-rose-subtle transition-all"
				>
					<span class="material-symbols-outlined text-[16px]">logout</span>
					<span class="hidden sm:inline">Keluar</span>
				</button>
			</form>
		</div>
	</header>

	<!-- MAIN CONTENT -->
	<main class="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
		<!-- HEADER TITLE & STATS CARDS -->
		<div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
			<div>
				<h1 class="font-display font-extrabold text-2xl sm:text-3xl text-text-strong tracking-tight">
					Manajemen Harga Acuan Sampah
				</h1>
				<p class="text-xs sm:text-sm text-text-muted mt-1">
					Observasi dan perbarui tren harga beli komoditas daur ulang (Rp / kg) yang menjadi rujukan ekonomi sirkular.
				</p>
			</div>

			<button
				type="button"
				onclick={openCreateModal}
				class="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary hover:bg-brand-emerald-dark text-on-primary text-xs font-bold transition-all shadow-md active:scale-95 cursor-pointer self-start sm:self-auto shrink-0"
			>
				<span class="material-symbols-outlined text-[18px]">add</span>
				<span>Tambah Observasi Harga</span>
			</button>
		</div>

		<!-- ALERT FEEDBACK -->
		{#if form?.actionSuccess}
			<div class="p-4 rounded-xl bg-brand-mint-subtle border border-brand-mint/40 text-primary text-xs font-semibold flex items-center gap-2.5 shadow-xs">
				<span class="material-symbols-outlined text-[20px]">check_circle</span>
				<span>{form.actionSuccess}</span>
			</div>
		{/if}
		{#if form?.actionError}
			<div class="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-medium flex items-center gap-2.5 shadow-xs">
				<span class="material-symbols-outlined text-[20px] text-red-500">error</span>
				<span>{form.actionError}</span>
			</div>
		{/if}

		<!-- 3 STATS METRICS -->
		<div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
			<div class="bg-surface-card border border-border-subtle rounded-2xl p-5 shadow-xs flex items-center gap-4">
				<div class="w-12 h-12 rounded-xl bg-brand-mint-subtle flex items-center justify-center text-primary shrink-0">
					<span class="material-symbols-outlined text-2xl">receipt_long</span>
				</div>
				<div>
					<div class="text-xs font-medium text-text-muted">Total Observasi Harga</div>
					<div class="font-display font-extrabold text-xl text-text-strong mt-0.5">
						{data.stats.total_records} Record
					</div>
				</div>
			</div>

			<div class="bg-surface-card border border-border-subtle rounded-2xl p-5 shadow-xs flex items-center gap-4">
				<div class="w-12 h-12 rounded-xl bg-info-sky-subtle flex items-center justify-center text-info-sky shrink-0">
					<span class="material-symbols-outlined text-2xl">category</span>
				</div>
				<div>
					<div class="text-xs font-medium text-text-muted">Subkategori Aktif</div>
					<div class="font-display font-extrabold text-xl text-text-strong mt-0.5">
						{data.stats.total_sub_categories} Komoditas
					</div>
				</div>
			</div>

			<div class="bg-surface-card border border-border-subtle rounded-2xl p-5 shadow-xs flex items-center gap-4">
				<div class="w-12 h-12 rounded-xl bg-accent-amber-subtle flex items-center justify-center text-accent-amber shrink-0">
					<span class="material-symbols-outlined text-2xl">payments</span>
				</div>
				<div>
					<div class="text-xs font-medium text-text-muted">Rata-rata Harga Pasar</div>
					<div class="font-display font-extrabold text-xl text-text-strong mt-0.5">
						Rp {Math.round(data.stats.average_price).toLocaleString('id-ID')} / kg
					</div>
				</div>
			</div>
		</div>

		<!-- FILTER & SEARCH TOOLBAR -->
		<div class="bg-surface-card border border-border-subtle rounded-2xl p-4 sm:p-5 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
			<!-- Category Tabs -->
			<div class="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
				<button
					type="button"
					onclick={() => handleCategoryFilter(null)}
					class="px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer border {!data.filters.category
						? 'bg-primary text-on-primary border-primary shadow-xs'
						: 'bg-surface-base text-text-muted border-border-subtle hover:text-text-strong hover:border-primary/50'}"
				>
					Semua Kategori
				</button>
				{#each data.categories as cat}
					<button
						type="button"
						onclick={() => handleCategoryFilter(cat.id)}
						class="px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer border {data.filters.category === cat.id
							? 'bg-primary text-on-primary border-primary shadow-xs'
							: 'bg-surface-base text-text-muted border-border-subtle hover:text-text-strong hover:border-primary/50'}"
					>
						{cat.name}
					</button>
				{/each}
			</div>

			<!-- Search Bar -->
			<form onsubmit={handleSearchSubmit} class="relative w-full md:w-72 shrink-0">
				<span class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-text-muted">
					<span class="material-symbols-outlined text-[18px]">search</span>
				</span>
				<input
					type="text"
					bind:value={searchInput}
					placeholder="Cari nama komoditas..."
					class="w-full pl-9 pr-8 py-2 rounded-xl border border-border-subtle bg-surface-base text-xs text-text-strong placeholder:text-text-muted focus:outline-hidden focus:border-primary focus:ring-1 focus:ring-primary transition-all"
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
						class="absolute inset-y-0 right-0 flex items-center pr-2.5 text-text-muted hover:text-text-strong cursor-pointer"
					>
						<span class="material-symbols-outlined text-[16px]">close</span>
					</button>
				{/if}
			</form>
		</div>

		<!-- TABLE DATA WASTE PRICE -->
		<div class="bg-surface-card border border-border-subtle rounded-2xl shadow-xs overflow-hidden">
			<div class="overflow-x-auto">
				<table class="w-full text-left text-xs border-collapse">
					<thead>
						<tr class="bg-surface-base border-b border-border-subtle text-text-muted font-bold uppercase tracking-wider">
							<th class="py-3.5 px-4 w-16">ID</th>
							<th class="py-3.5 px-4">Tanggal Observasi</th>
							<th class="py-3.5 px-4">Kategori Utama</th>
							<th class="py-3.5 px-4">Subkategori Komoditas</th>
							<th class="py-3.5 px-4">Harga Acuan (Rp/kg)</th>
							<th class="py-3.5 px-4 text-right">Aksi</th>
						</tr>
					</thead>
					<tbody class="divide-y divide-border-subtle">
						{#if data.prices.length === 0}
							<tr>
								<td colspan="6" class="py-12 text-center text-text-muted">
									<div class="flex flex-col items-center justify-center space-y-2">
										<span class="material-symbols-outlined text-4xl text-text-muted/60">search_off</span>
										<div class="font-semibold text-text-strong text-sm">Tidak ada data observasi ditemukan</div>
										<p class="text-[11px] max-w-sm">
											Coba sesuaikan kata kunci pencarian atau bersihkan filter kategori Anda.
										</p>
									</div>
								</td>
							</tr>
						{:else}
							{#each data.prices as item}
								<tr class="hover:bg-surface-base/60 transition-colors">
									<td class="py-3.5 px-4 font-mono font-medium text-text-muted">
										#{item.id}
									</td>
									<td class="py-3.5 px-4 whitespace-nowrap text-text-strong font-medium">
										{formatDateTime(item.created_at)}
									</td>
									<td class="py-3.5 px-4">
										<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-brand-mint-subtle text-primary border border-border-focus/30">
											{item.category_name}
										</span>
									</td>
									<td class="py-3.5 px-4 font-semibold text-text-strong">
										{item.sub_category_name}
									</td>
									<td class="py-3.5 px-4 font-display font-extrabold text-sm text-text-strong">
										Rp {item.price.toLocaleString('id-ID')}
									</td>
									<td class="py-3.5 px-4 text-right whitespace-nowrap">
										<div class="inline-flex items-center gap-1.5">
											<button
												type="button"
												onclick={() => openEditModal(item)}
												class="p-1.5 rounded-lg text-text-muted hover:text-primary hover:bg-surface-base transition-colors cursor-pointer"
												title="Edit Observasi Harga"
											>
												<span class="material-symbols-outlined text-[18px]">edit</span>
											</button>
											<button
												type="button"
												onclick={() => confirmDelete(item)}
												class="p-1.5 rounded-lg text-text-muted hover:text-danger-rose hover:bg-danger-rose-subtle transition-colors cursor-pointer"
												title="Hapus Observasi Harga"
											>
												<span class="material-symbols-outlined text-[18px]">delete</span>
											</button>
										</div>
									</td>
								</tr>
							{/each}
						{/if}
					</tbody>
				</table>
			</div>

			<!-- PAGINATION CONTROLS -->
			{#if data.pagination.totalPages > 1}
				<div class="p-4 border-t border-border-subtle bg-surface-base flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-text-muted">
					<div>
						Menampilkan baris <strong>{(data.pagination.currentPage - 1) * data.pagination.itemsPerPage + 1}</strong> hingga <strong>{Math.min(data.pagination.currentPage * data.pagination.itemsPerPage, data.pagination.totalCount)}</strong> dari total <strong>{data.pagination.totalCount}</strong> data
					</div>

					<div class="flex items-center gap-1">
						<button
							type="button"
							disabled={data.pagination.currentPage <= 1}
							onclick={() => goToPage(data.pagination.currentPage - 1)}
							class="px-2.5 py-1.5 rounded-lg border border-border-subtle bg-surface-card hover:bg-surface-card-subtle disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer flex items-center"
						>
							<span class="material-symbols-outlined text-[16px]">chevron_left</span>
						</button>

						{#each Array.from({ length: data.pagination.totalPages }, (_, i) => i + 1) as p}
							{#if p === 1 || p === data.pagination.totalPages || Math.abs(p - data.pagination.currentPage) <= 1}
								<button
									type="button"
									onclick={() => goToPage(p)}
									class="px-3 py-1 rounded-lg border text-xs font-semibold cursor-pointer transition-all {p === data.pagination.currentPage
										? 'bg-primary text-on-primary border-primary shadow-xs'
										: 'bg-surface-card border-border-subtle text-text-muted hover:text-text-strong'}"
								>
									{p}
								</button>
							{:else if p === 2 || p === data.pagination.totalPages - 1}
								<span class="px-1 text-text-muted">...</span>
							{/if}
						{/each}

						<button
							type="button"
							disabled={data.pagination.currentPage >= data.pagination.totalPages}
							onclick={() => goToPage(data.pagination.currentPage + 1)}
							class="px-2.5 py-1.5 rounded-lg border border-border-subtle bg-surface-card hover:bg-surface-card-subtle disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer flex items-center"
						>
							<span class="material-symbols-outlined text-[16px]">chevron_right</span>
						</button>
					</div>
				</div>
			{/if}
		</div>
	</main>

	<!-- MODAL FORM: CREATE / EDIT -->
	{#if isModalOpen}
		<div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
			<div class="bg-surface-card border border-border-subtle rounded-2xl max-w-md w-full p-6 shadow-xl space-y-5 animate-in fade-in zoom-in-95 duration-150">
				<div class="flex items-center justify-between pb-3 border-b border-border-subtle">
					<div class="flex items-center gap-2.5">
						<div class="w-9 h-9 rounded-xl bg-brand-mint-subtle flex items-center justify-center text-primary">
							<span class="material-symbols-outlined text-[20px]">
								{modalMode === 'create' ? 'add_circle' : 'edit_note'}
							</span>
						</div>
						<h3 class="font-display font-bold text-base text-text-strong">
							{modalMode === 'create' ? 'Tambah Observasi Harga' : 'Edit Observasi Harga'}
						</h3>
					</div>
					<button
						type="button"
						onclick={closeModal}
						class="text-text-muted hover:text-text-strong p-1 rounded-lg cursor-pointer"
					>
						<span class="material-symbols-outlined text-[20px]">close</span>
					</button>
				</div>

				<form
					method="POST"
					action={modalMode === 'create' ? '?/create' : '?/update'}
					use:enhance={() => {
						isSubmitting = true;
						return async ({ update }) => {
							await update();
							isSubmitting = false;
							isModalOpen = false;
						};
					}}
					class="space-y-4 text-xs"
				>
					{#if modalMode === 'edit' && formId}
						<input type="hidden" name="id" value={formId} />
					{/if}

					<!-- Subcategory dropdown -->
					<div>
						<label for="waste_sub_category_id" class="block font-bold text-text-strong uppercase tracking-wider mb-1.5">
							Komoditas Sampah (Subkategori)
						</label>
						<select
							id="waste_sub_category_id"
							name="waste_sub_category_id"
							required
							bind:value={formSubCategoryId}
							class="w-full px-3 py-2.5 rounded-xl border border-border-subtle bg-surface-card text-text-strong text-xs focus:outline-hidden focus:border-primary focus:ring-1 focus:ring-primary"
						>
							{#each groupedSubCategories as [catName, subCats]}
								<optgroup label={catName}>
									{#each subCats as sub}
										<option value={sub.id}>{sub.name}</option>
									{/each}
								</optgroup>
							{/each}
						</select>
					</div>

					<!-- Price input -->
					<div>
						<label for="price" class="block font-bold text-text-strong uppercase tracking-wider mb-1.5">
							Harga Acuan (Rp / kg)
						</label>
						<div class="relative">
							<span class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-text-muted font-bold text-xs">
								Rp
							</span>
							<input
								id="price"
								name="price"
								type="number"
								step="1"
								min="0"
								required
								bind:value={formPrice}
								placeholder="Contoh: 3500"
								class="w-full pl-9 pr-3 py-2.5 rounded-xl border border-border-subtle bg-surface-card text-text-strong text-xs font-semibold focus:outline-hidden focus:border-primary focus:ring-1 focus:ring-primary"
							/>
						</div>
					</div>

					<!-- Created at input -->
					<div>
						<label for="created_at" class="block font-bold text-text-strong uppercase tracking-wider mb-1.5">
							Tanggal & Waktu Observasi
						</label>
						<input
							id="created_at"
							name="created_at"
							type="datetime-local"
							bind:value={formCreatedAt}
							class="w-full px-3 py-2.5 rounded-xl border border-border-subtle bg-surface-card text-text-strong text-xs focus:outline-hidden focus:border-primary focus:ring-1 focus:ring-primary"
						/>
						<p class="text-[11px] text-text-muted mt-1">
							Kosongkan jika ingin menggunakan waktu saat ini (NOW).
						</p>
					</div>

					<div class="pt-2 flex items-center justify-end gap-2">
						<button
							type="button"
							onclick={closeModal}
							class="px-4 py-2 rounded-xl border border-border-subtle text-text-strong hover:bg-surface-base font-semibold cursor-pointer"
						>
							Batal
						</button>
						<button
							type="submit"
							disabled={isSubmitting || !formPrice}
							class="px-5 py-2 rounded-xl bg-primary hover:bg-brand-emerald-dark text-on-primary font-bold shadow-xs active:scale-95 cursor-pointer disabled:opacity-50"
						>
							{#if isSubmitting}
								Menyimpan...
							{:else}
								Simpan Observasi
							{/if}
						</button>
					</div>
				</form>
			</div>
		</div>
	{/if}

	<!-- MODAL FORM: DELETE CONFIRMATION -->
	{#if isDeleteModalOpen && itemToDelete}
		<div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
			<div class="bg-surface-card border border-border-subtle rounded-2xl max-w-sm w-full p-6 shadow-xl space-y-4 animate-in fade-in zoom-in-95 duration-150">
				<div class="w-12 h-12 rounded-2xl bg-danger-rose-subtle text-danger-rose flex items-center justify-center mx-auto">
					<span class="material-symbols-outlined text-3xl">warning</span>
				</div>

				<div class="text-center space-y-1">
					<h3 class="font-display font-bold text-base text-text-strong">
						Hapus Observasi Harga?
					</h3>
					<p class="text-xs text-text-muted leading-relaxed">
						Anda akan menghapus data harga untuk <strong>{itemToDelete.sub_category_name}</strong> (Rp {itemToDelete.price.toLocaleString('id-ID')}). Tindakan ini tidak dapat dibatalkan.
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
							closeDeleteModal();
						};
					}}
					class="pt-2 flex items-center justify-center gap-3 text-xs"
				>
					<input type="hidden" name="id" value={itemToDelete.id} />
					<button
						type="button"
						onclick={closeDeleteModal}
						class="w-full px-4 py-2.5 rounded-xl border border-border-subtle text-text-strong font-semibold hover:bg-surface-base cursor-pointer"
					>
						Batal
					</button>
					<button
						type="submit"
						disabled={isDeleting}
						class="w-full px-4 py-2.5 rounded-xl bg-danger-rose hover:bg-rose-700 text-white font-bold shadow-xs active:scale-95 cursor-pointer disabled:opacity-50"
					>
						{#if isDeleting}
							Menghapus...
						{:else}
							Ya, Hapus
						{/if}
					</button>
				</form>
			</div>
		</div>
	{/if}

	<!-- FOOTER -->
	<footer class="w-full py-4 text-center text-xs text-text-muted border-t border-border-subtle bg-surface-card">
		<span>&copy; 2026 SustainAI Administration. Restricted Area.</span>
	</footer>
</div>
