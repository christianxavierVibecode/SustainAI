<script lang="ts">
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
	import { tick } from 'svelte';
	import type { PageProps } from './$types';
	import type { WastePriceItem } from '$lib/server/db/wastePrice';

	let { data, form }: PageProps = $props();

	// Sidebar responsive mobile state
	let isMobileSidebarOpen = $state(false);
	function toggleSidebar() {
		isMobileSidebarOpen = !isMobileSidebarOpen;
	}
	function closeSidebar() {
		isMobileSidebarOpen = false;
	}

	// Loading state saat filter atau pencarian diklik
	let isFiltering = $state(false);

	// State Modal Add/Edit
	let isModalOpen = $state(false);
	let modalMode = $state<'create' | 'edit'>('create');
	let isSubmitting = $state(false);

	// Form fields
	let formId = $state<number | null>(null);
	let formSubCategoryId = $state<number>(1);
	let formRawPrice = $state<number>(0);
	let formPriceFormatted = $state<string>('');

	// Custom Live Search Subcategory state
	let subCategorySearch = $state('');
	let isSubCategoryDropdownOpen = $state(false);
	let highlightedIndex = $state(0);
	let subCategoryInputEl = $state<HTMLInputElement | null>(null);
	let subCategoryListContainerEl = $state<HTMLDivElement | null>(null);

	// Custom Date & Time state
	let selectedDateStr = $state(''); // YYYY-MM-DD
	let selectedHour = $state('12'); // 00 - 23
	let selectedMinute = $state('00'); // 00 - 59

	// State Modal Delete
	let isDeleteModalOpen = $state(false);
	let itemToDelete = $state<WastePriceItem | null>(null);
	let isDeleting = $state(false);

	// Search & Filter state
	let searchInput = $state('');

	$effect(() => {
		searchInput = data.filters.search || '';
	});

	// Inisial avatar user admin
	let userInitials = $derived(
		(data.user?.full_name || data.user?.email || 'A')
			.split(' ')
			.map((n: string) => n[0])
			.slice(0, 2)
			.join('')
			.toUpperCase()
	);

	// Filtered subcategories for live search
	let filteredSubCategories = $derived.by(() => {
		const q = subCategorySearch.trim().toLowerCase();
		if (!q) return data.subCategories;
		return data.subCategories.filter(
			(sc) =>
				sc.sub_category_name.toLowerCase().includes(q) ||
				sc.category_name.toLowerCase().includes(q)
		);
	});

	// Selected subcategory object
	let selectedSubCategory = $derived(
		data.subCategories.find((sc) => sc.sub_category_id === formSubCategoryId) ||
			data.subCategories[0]
	);

	// Format Rupiah helper (misal: 3500 -> "3.500")
	function formatRupiah(value: number | string): string {
		const numStr = value.toString().replace(/\D/g, '');
		if (!numStr) return '';
		return parseInt(numStr, 10).toLocaleString('id-ID');
	}

	function handlePriceInput(e: Event) {
		const input = e.target as HTMLInputElement;
		const digits = input.value.replace(/\D/g, '');
		if (!digits) {
			formRawPrice = 0;
			formPriceFormatted = '';
			return;
		}
		const num = parseInt(digits, 10);
		formRawPrice = num;
		formPriceFormatted = num.toLocaleString('id-ID');
	}

	// Helper info nama hari dalam Bahasa Indonesia dari YYYY-MM-DD
	let dateDayName = $derived.by(() => {
		if (!selectedDateStr) return '';
		try {
			const [y, m, d] = selectedDateStr.split('-').map(Number);
			const date = new Date(y, m - 1, d);
			return date.toLocaleDateString('id-ID', { weekday: 'long' });
		} catch {
			return '';
		}
	});

	// ISO timestamp gabungan dari input custom tanggal dan jam
	let finalCreatedAtIso = $derived.by(() => {
		if (!selectedDateStr) return '';
		return `${selectedDateStr}T${selectedHour.padStart(2, '0')}:${selectedMinute.padStart(2, '0')}:00`;
	});

	// Buka modal create
	function openCreateModal() {
		modalMode = 'create';
		formId = null;
		formSubCategoryId = data.subCategories[0]?.sub_category_id ?? 1;
		subCategorySearch = data.subCategories[0]?.sub_category_name ?? '';
		isSubCategoryDropdownOpen = false;
		highlightedIndex = 0;
		formRawPrice = 0;
		formPriceFormatted = '';

		const now = new Date();
		const year = now.getFullYear();
		const month = String(now.getMonth() + 1).padStart(2, '0');
		const day = String(now.getDate()).padStart(2, '0');
		selectedDateStr = `${year}-${month}-${day}`;
		selectedHour = String(now.getHours()).padStart(2, '0');
		selectedMinute = String(now.getMinutes()).padStart(2, '0');

		isModalOpen = true;
	}

	// Buka modal edit
	function openEditModal(item: WastePriceItem) {
		modalMode = 'edit';
		formId = item.id;
		formSubCategoryId = item.waste_sub_category_id;
		subCategorySearch = item.sub_category_name;
		isSubCategoryDropdownOpen = false;
		highlightedIndex = 0;
		formRawPrice = item.price;
		formPriceFormatted = formatRupiah(item.price);

		const d = new Date(item.created_at);
		const year = d.getFullYear();
		const month = String(d.getMonth() + 1).padStart(2, '0');
		const day = String(d.getDate()).padStart(2, '0');
		selectedDateStr = `${year}-${month}-${day}`;
		selectedHour = String(d.getHours()).padStart(2, '0');
		selectedMinute = String(d.getMinutes()).padStart(2, '0');

		isModalOpen = true;
	}

	function closeModal() {
		isModalOpen = false;
		isSubCategoryDropdownOpen = false;
	}

	function confirmDelete(item: WastePriceItem) {
		itemToDelete = item;
		isDeleteModalOpen = true;
	}

	function closeDeleteModal() {
		isDeleteModalOpen = false;
		itemToDelete = null;
	}

	// Global Keydown listener untuk ESC (menutup dropdown/modal form/konfirmasi hapus)
	function handleGlobalKeydown(e: KeyboardEvent) {
		if (e.key === 'Escape') {
			if (isSubCategoryDropdownOpen) {
				isSubCategoryDropdownOpen = false;
				e.stopPropagation();
				return;
			}
			if (isModalOpen) {
				closeModal();
				return;
			}
			if (isDeleteModalOpen) {
				closeDeleteModal();
				return;
			}
			if (isMobileSidebarOpen) {
				closeSidebar();
				return;
			}
		}
	}

	// Navigasi keyboard pada live search subkategori (Arrow Up/Down, Enter/Space)
	async function handleSubCategoryKeydown(e: KeyboardEvent) {
		if (!isSubCategoryDropdownOpen) {
			if (e.key === 'ArrowDown' || e.key === 'ArrowUp' || e.key === 'Enter') {
				isSubCategoryDropdownOpen = true;
				e.preventDefault();
			}
			return;
		}

		if (e.key === 'ArrowDown') {
			e.preventDefault();
			if (filteredSubCategories.length === 0) return;
			highlightedIndex = (highlightedIndex + 1) % filteredSubCategories.length;
			scrollActiveItemIntoView();
		} else if (e.key === 'ArrowUp') {
			e.preventDefault();
			if (filteredSubCategories.length === 0) return;
			highlightedIndex =
				(highlightedIndex - 1 + filteredSubCategories.length) % filteredSubCategories.length;
			scrollActiveItemIntoView();
		} else if (e.key === 'Enter' || e.key === ' ') {
			e.preventDefault();
			if (filteredSubCategories[highlightedIndex]) {
				selectSubCategory(filteredSubCategories[highlightedIndex]);
			}
		} else if (e.key === 'Tab') {
			isSubCategoryDropdownOpen = false;
		}
	}

	async function scrollActiveItemIntoView() {
		await tick();
		if (!subCategoryListContainerEl) return;
		const activeEl = subCategoryListContainerEl.querySelector(`[data-index="${highlightedIndex}"]`);
		if (activeEl) {
			activeEl.scrollIntoView({ block: 'nearest' });
		}
	}

	function selectSubCategory(item: { sub_category_id: number; sub_category_name: string; category_name: string }) {
		formSubCategoryId = item.sub_category_id;
		subCategorySearch = item.sub_category_name;
		isSubCategoryDropdownOpen = false;
	}

	async function handleCategoryFilter(categoryId: number | null) {
		isFiltering = true;
		const url = new URL(page.url.href);
		if (categoryId) {
			url.searchParams.set('category', categoryId.toString());
		} else {
			url.searchParams.delete('category');
		}
		url.searchParams.set('page', '1');
		await goto(url.toString());
		isFiltering = false;
	}

	async function handleSearchSubmit(e: SubmitEvent) {
		e.preventDefault();
		isFiltering = true;
		const url = new URL(page.url.href);
		if (searchInput.trim()) {
			url.searchParams.set('search', searchInput.trim());
		} else {
			url.searchParams.delete('search');
		}
		url.searchParams.set('page', '1');
		await goto(url.toString());
		isFiltering = false;
	}

	async function goToPage(p: number) {
		if (p < 1 || p > data.pagination.totalPages) return;
		isFiltering = true;
		const url = new URL(page.url.href);
		url.searchParams.set('page', p.toString());
		await goto(url.toString());
		isFiltering = false;
	}

	function formatDateTime(isoString: string) {
		const d = new Date(isoString);
		return d.toLocaleDateString('id-ID', {
			weekday: 'short',
			day: 'numeric',
			month: 'short',
			year: 'numeric',
			hour: '2-digit',
			minute: '2-digit'
		});
	}
</script>

<svelte:window onkeydown={handleGlobalKeydown} />

<svelte:head>
	<title>Admin - Manajemen Harga Sampah | SustainAI</title>
</svelte:head>

<div class="bg-surface-base text-text-strong font-body-md antialiased min-h-screen flex selection:bg-brand-mint selection:text-brand-forest">
	<!-- ========================================================================= -->
	<!-- SIDEBAR KANONIKAL SESUAI DASHBOARD OVERVIEW                              -->
	<!-- ========================================================================= -->
	<aside
		id="adminSidebar"
		aria-label="Admin Navigation"
		class="fixed left-0 top-0 bottom-0 z-50 sm:w-64 w-70 bg-surface-card border-r border-border-subtle flex flex-col justify-between py-6 px-4 shadow-xs overflow-y-auto transition-transform duration-300 ease-out {isMobileSidebarOpen
			? 'translate-x-0'
			: '-translate-x-full lg:translate-x-0'}"
	>
		<!-- Tombol Tutup Sidebar Mobile -->
		<button
			type="button"
			onclick={closeSidebar}
			aria-label="Close navigation"
			class="lg:hidden absolute top-4 right-3 p-1.5 rounded-md text-text-muted hover:text-text-strong hover:bg-surface-base transition-colors cursor-pointer"
		>
			<span class="material-symbols-outlined text-[20px]">close</span>
		</button>

		<div class="flex flex-col gap-6">
			<!-- Logo & Brand Header -->
			<a href="/admin" class="flex items-center gap-3 px-2 group">
				<div
					class="w-10 h-10 rounded-xl bg-brand-mint-subtle flex items-center justify-center text-primary border border-border-focus/20 shadow-xs overflow-hidden p-1 transition-transform group-hover:scale-105"
				>
					<img
						src="/SustainAI-Icon.webp"
						alt="SustainAI Logo"
						class="w-full h-full object-contain"
					/>
				</div>
				<div>
					<div class="text-headline-md font-headline-md font-bold text-primary tracking-tight leading-none">
						SustainAI
					</div>
					<div class="text-[11px] font-medium text-text-muted mt-1">
						Admin Control Center
					</div>
				</div>
			</a>

			<!-- Admin Badge Box -->
			<div
				class="bg-accent-amber-subtle/70 rounded-xl p-3 border border-accent-amber/30 flex items-center justify-between gap-2"
			>
				<div class="flex items-center gap-2">
					<span
						class="material-symbols-outlined text-accent-amber text-[20px]"
						style="font-variation-settings: 'FILL' 1;"
					>
						shield_person
					</span>
					<div>
						<div class="text-xs font-bold text-text-strong">Admin Role</div>
						<div class="text-[10px] text-accent-amber font-semibold">Observabilitas &amp; CRUD</div>
					</div>
				</div>
				<span class="w-2 h-2 rounded-full bg-accent-amber animate-pulse"></span>
			</div>

			<!-- Navigation Links -->
			<nav aria-label="Admin Navigation" class="flex flex-col gap-1.5">
				<a
					href="/admin"
					onclick={closeSidebar}
					class="flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all cursor-pointer bg-brand-mint-subtle text-primary font-semibold shadow-xs border border-border-focus/30"
				>
					<span
						class="material-symbols-outlined text-[20px]"
						style="font-variation-settings: 'FILL' 1;"
					>
						price_change
					</span>
					<span class="text-xs font-bold">Harga Sampah (CRUD)</span>
					<span class="ml-auto w-1.5 h-4 rounded-full bg-primary"></span>
				</a>

			</nav>
		</div>

		<!-- Profil Singkat & Logout di Footer Sidebar -->
		<div class="flex flex-col gap-3 pt-4 border-t border-border-subtle">
			<div class="flex items-center gap-3 px-2 py-2 rounded-xl bg-surface-base border border-border-subtle">
				<div
					class="w-9 h-9 rounded-full bg-accent-amber-subtle text-accent-amber font-bold flex items-center justify-center text-xs border border-accent-amber/30 shrink-0"
				>
					{userInitials}
				</div>
				<div class="flex flex-col min-w-0 flex-1">
					<div class="text-xs font-semibold text-text-strong truncate">
						{data.user?.full_name || 'Admin'}
					</div>
					<div class="text-[11px] text-text-muted truncate">
						{data.user?.email}
					</div>
				</div>
				<!-- Tombol Logout teruji langsung via /logout -->
				<a
					href="/logout"
					title="Keluar dari Akun"
					class="material-symbols-outlined text-[18px] text-text-muted hover:text-danger-rose transition-colors p-1.5 rounded-lg hover:bg-danger-rose-subtle cursor-pointer"
				>
					logout
				</a>
			</div>
		</div>
	</aside>

	<!-- Mobile Sidebar Backdrop -->
	{#if isMobileSidebarOpen}
		<button
			type="button"
			onclick={closeSidebar}
			aria-label="Close navigation overlay"
			class="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-xs lg:hidden cursor-default w-full h-full border-0 p-0"
		></button>
	{/if}

	<!-- ========================================================================= -->
	<!-- MAIN VIEWPORT WRAPPER (MATCHING DASHBOARD OVERVIEW)                       -->
	<!-- ========================================================================= -->
	<div class="flex-1 flex flex-col min-w-0 lg:ml-64">
		<!-- HEADER NAVIGASI ATAS -->
		<header
			class="sticky top-0 z-30 flex items-center justify-between gap-4 px-4 sm:px-6 h-16 w-full bg-surface-card/90 backdrop-blur-md border-b border-border-subtle shadow-xs"
		>
			<!-- Hamburger Mobile & Breadcrumb -->
			<div class="flex items-center gap-3 min-w-0">
				<button
					type="button"
					onclick={toggleSidebar}
					class="lg:hidden p-2 -ml-1 rounded-lg text-text-muted hover:text-text-strong hover:bg-surface-base transition-colors cursor-pointer"
					aria-label="Toggle navigation menu"
				>
					<span class="material-symbols-outlined text-[24px]">menu</span>
				</button>
				<span class="hidden sm:inline font-display font-extrabold text-primary text-base">SustainAI</span>
				<span class="hidden sm:inline text-text-muted">/</span>
				<span class="hidden sm:inline text-xs text-text-muted">Admin</span>
				<span class="hidden sm:inline text-text-muted">/</span>
				<span class="truncate text-xs font-bold text-text-strong">
					Manajemen Harga Sampah
				</span>
			</div>

			<!-- Right Actions: Scan Cepat, Logout & Profil -->
			<div class="flex items-center gap-3">
				<button
					type="button"
					onclick={openCreateModal}
					class="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-primary hover:bg-brand-emerald-dark text-on-primary font-semibold text-xs transition-all active:scale-95 shadow-xs cursor-pointer"
				>
					<span class="material-symbols-outlined text-[18px]">add</span>
					<span class="hidden sm:inline">Tambah Harga</span>
				</button>

				<div
					class="w-8 h-8 rounded-full bg-accent-amber-subtle border border-accent-amber/30 flex items-center justify-center text-accent-amber font-bold text-xs"
					title={data.user?.email}
				>
					{userInitials}
				</div>
			</div>
		</header>

		<!-- KONTEN UTAMA ADMIN -->
		<main class="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto space-y-6">
			<!-- HEADER TITLE & CTA -->
			<div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
				<div>
					<h1 class="font-display font-extrabold text-2xl sm:text-3xl text-text-strong tracking-tight">
						Manajemen Harga Acuan Sampah
					</h1>
					<p class="text-xs sm:text-sm text-text-muted mt-1">
						Observasi dan perbarui tren harga beli komoditas daur ulang (Rp / kg) yang menjadi rujukan ekonomi sirkular.
					</p>
				</div>
			</div>

			<!-- ALERT FEEDBACK -->
			{#if form?.actionSuccess}
				<div class="p-4 rounded-xl bg-brand-mint-subtle border border-brand-mint/40 text-primary text-xs font-semibold flex items-center gap-2.5 shadow-xs animate-in fade-in">
					<span class="material-symbols-outlined text-[20px]">check_circle</span>
					<span>{form.actionSuccess}</span>
				</div>
			{/if}
			{#if form?.actionError}
				<div class="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-medium flex items-center gap-2.5 shadow-xs animate-in fade-in">
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
						disabled={isFiltering}
						onclick={() => handleCategoryFilter(null)}
						class="px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer border {!data.filters.category
							? 'bg-primary text-on-primary border-primary shadow-xs'
							: 'bg-surface-base text-text-muted border-border-subtle hover:text-text-strong hover:border-primary/50'} disabled:opacity-50"
					>
						Semua Kategori
					</button>
					{#each data.categories as cat}
						<button
							type="button"
							disabled={isFiltering}
							onclick={() => handleCategoryFilter(cat.id)}
							class="px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer border {data.filters.category === cat.id
								? 'bg-primary text-on-primary border-primary shadow-xs'
								: 'bg-surface-base text-text-muted border-border-subtle hover:text-text-strong hover:border-primary/50'} disabled:opacity-50"
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
						class="w-full pl-12 pr-8 py-3 rounded-xl border border-border-subtle bg-surface-base text-xs text-text-strong placeholder:text-text-muted focus:outline-hidden focus:border-primary focus:ring-1 focus:ring-primary transition-all"
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

			<!-- TABLE DATA WASTE PRICE WITH LOADING OVERLAY -->
			<div class="bg-surface-card border border-border-subtle rounded-2xl shadow-xs overflow-hidden relative">
				<!-- Loading Overlay saat memfilter data -->
				{#if isFiltering}
					<div class="absolute inset-0 z-20 bg-surface-card/75 backdrop-blur-xs flex flex-col items-center justify-center gap-2 animate-in fade-in duration-150">
						<span class="material-symbols-outlined text-3xl text-primary animate-spin">
							progress_activity
						</span>
						<span class="text-xs font-bold text-text-strong">Memuat Data Harga...</span>
					</div>
				{/if}

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
								disabled={data.pagination.currentPage <= 1 || isFiltering}
								onclick={() => goToPage(data.pagination.currentPage - 1)}
								class="px-2.5 py-1.5 rounded-lg border border-border-subtle bg-surface-card hover:bg-surface-card-subtle disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer flex items-center"
							>
								<span class="material-symbols-outlined text-[16px]">chevron_left</span>
							</button>

							{#each Array.from({ length: data.pagination.totalPages }, (_, i) => i + 1) as p}
								{#if p === 1 || p === data.pagination.totalPages || Math.abs(p - data.pagination.currentPage) <= 1}
									<button
										type="button"
										disabled={isFiltering}
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
								disabled={data.pagination.currentPage >= data.pagination.totalPages || isFiltering}
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

		<!-- FOOTER DASHBOARD ADMIN -->
		<footer class="w-full py-4 px-6 text-center text-xs text-text-muted border-t border-border-subtle bg-surface-card mt-auto">
			<span>&copy; 2026 SustainAI Administration. Platform Analisis Keberlanjutan &amp; Nilai Ekonomi Daur Ulang.</span>
		</footer>
	</div>
</div>

<!-- ========================================================================= -->
<!-- MODAL FORM: CREATE / EDIT WITH POP-UP ANIMATION & ESC LISTENER            -->
<!-- ========================================================================= -->
{#if isModalOpen}
	<div
		class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm transition-opacity duration-200"
		onclick={(e) => {
			if (e.target === e.currentTarget) closeModal();
		}}
		role="presentation"
	>
		<div
			class="bg-surface-card border border-border-subtle rounded-3xl max-w-lg w-full p-6 sm:p-7 shadow-2xl space-y-5 transform transition-all duration-200 ease-out scale-100 opacity-100 animate-in fade-in zoom-in-95"
		>
			<!-- Modal Header -->
			<div class="flex items-center justify-between pb-3.5 border-b border-border-subtle">
				<div class="flex items-center gap-3">
					<div class="w-10 h-10 rounded-2xl bg-brand-mint-subtle flex items-center justify-center text-primary shadow-xs">
						<span class="material-symbols-outlined text-[22px]">
							{modalMode === 'create' ? 'add_circle' : 'edit_note'}
						</span>
					</div>
					<div>
						<h3 class="font-display font-extrabold text-base text-text-strong">
							{modalMode === 'create' ? 'Tambah Observasi Harga' : 'Edit Observasi Harga'}
						</h3>
						<p class="text-[11px] text-text-muted">
							{modalMode === 'create' ? 'Catat data harga komoditas daur ulang baru.' : `Memperbarui data harga ID #${formId}`}
						</p>
					</div>
				</div>
				<button
					type="button"
					onclick={closeModal}
					class="text-text-muted hover:text-text-strong p-1.5 rounded-xl hover:bg-surface-base transition-colors cursor-pointer"
					title="Tutup (ESC)"
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

				<!-- Hidden input to submit the actual sub_category_id -->
				<input type="hidden" name="waste_sub_category_id" value={formSubCategoryId} />
				<!-- Hidden input to submit the final unformatted numeric price -->
				<input type="hidden" name="price" value={formRawPrice} />
				<!-- Hidden input to submit the combined date-time in ISO format -->
				<input type="hidden" name="created_at" value={finalCreatedAtIso} />

				<!-- ============================================================= -->
				<!-- 1. LIVE SEARCH CUSTOM INPUT: KOMODITAS SAMPAH                -->
				<!-- ============================================================= -->
				<div class="relative">
					<div class="flex items-center justify-between mb-3">
						<label for="subcategory_search_input" class="block font-bold text-text-strong uppercase tracking-wider text-[11px]">
							Komoditas Sampah (Subkategori)
						</label>
						<span class="text-[10px] text-text-muted">
							Gunakan <kbd class="px-1 py-0.5 rounded bg-surface-base border border-border-subtle font-mono text-[9px]">↑</kbd> <kbd class="px-1 py-0.5 rounded bg-surface-base border border-border-subtle font-mono text-[9px]">↓</kbd> &amp; <kbd class="px-1 py-0.5 rounded bg-surface-base border border-border-subtle font-mono text-[9px]">Enter</kbd>
						</span>
					</div>

					<div class="relative">
						<span class="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-text-muted">
							<span class="material-symbols-outlined text-[18px]">search</span>
						</span>
						<input
							id="subcategory_search_input"
							bind:this={subCategoryInputEl}
							type="text"
							autocomplete="off"
							placeholder="Ketik untuk mencari komoditas..."
							bind:value={subCategorySearch}
							onfocus={() => {
								isSubCategoryDropdownOpen = true;
								highlightedIndex = 0;
							}}
							onkeydown={handleSubCategoryKeydown}
							class="w-full pl-12 pr-9 py-3 mb-2 rounded-xl border border-border-subtle bg-surface-base text-text-strong text-xs font-medium focus:outline-hidden focus:border-primary focus:ring-2 focus:ring-brand-mint/20 transition-all"
						/>
						<button
							type="button"
							onclick={() => (isSubCategoryDropdownOpen = !isSubCategoryDropdownOpen)}
							class="absolute inset-y-0 right-0 flex items-center pr-3 text-text-muted hover:text-text-strong cursor-pointer"
							tabindex="-1"
						>
							<span class="material-symbols-outlined text-[18px] transition-transform {isSubCategoryDropdownOpen ? 'rotate-180' : ''}">
								expand_more
							</span>
						</button>
					</div>

					<!-- Selected item badge preview -->
					{#if selectedSubCategory}
						<div class="mt-1.5 flex items-center gap-2 text-[11px]">
							<span class="text-text-muted">Terpilih:</span>
							<span class="inline-flex items-center gap-1 font-semibold text-primary bg-brand-mint-subtle px-2 py-0.5 rounded-md border border-brand-mint/30">
								<span class="w-1.5 h-1.5 rounded-full bg-primary"></span>
								{selectedSubCategory.category_name} &bull; {selectedSubCategory.sub_category_name}
							</span>
						</div>
					{/if}

					<!-- Floating Live Search Dropdown -->
					{#if isSubCategoryDropdownOpen}
						<div
							bind:this={subCategoryListContainerEl}
							class="absolute z-50 left-0 right-0 mt-1.5 max-h-56 overflow-y-auto rounded-2xl border border-border-subtle bg-surface-card shadow-xl p-1.5 space-y-0.5 text-xs animate-in fade-in duration-100"
						>
							{#if filteredSubCategories.length === 0}
								<div class="py-4 text-center text-text-muted text-[11px]">
									Tidak ada komoditas cocok dengan "<strong>{subCategorySearch}</strong>"
								</div>
							{:else}
								{#each filteredSubCategories as item, idx}
									{@const isHighlighted = idx === highlightedIndex}
									{@const isCurrentSelected = item.sub_category_id === formSubCategoryId}
									<button
										type="button"
										data-index={idx}
										onmouseenter={() => (highlightedIndex = idx)}
										onclick={() => selectSubCategory(item)}
										class="w-full text-left px-3 py-2 rounded-xl flex items-center justify-between cursor-pointer transition-colors {isHighlighted
											? 'bg-brand-mint-subtle text-primary font-bold'
											: isCurrentSelected
												? 'bg-surface-base text-primary font-semibold'
												: 'text-text-strong hover:bg-surface-base'}"
									>
										<div class="flex items-center gap-2 min-w-0">
											<span class="px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-surface-base text-text-muted border border-border-subtle shrink-0">
												{item.category_name}
											</span>
											<span class="truncate">{item.sub_category_name}</span>
										</div>
										{#if isCurrentSelected}
											<span class="material-symbols-outlined text-[16px] text-primary shrink-0">check</span>
										{/if}
									</button>
								{/each}
							{/if}
						</div>
					{/if}
				</div>

				<!-- ============================================================= -->
				<!-- 2. AUTO-FORMATTING RUPIAH: HARGA ACUAN                        -->
				<!-- ============================================================= -->
				<div>
					<label for="price_formatted_input" class="block font-bold text-text-strong uppercase tracking-wider text-[11px] mb-1.5">
						Harga Acuan (Rp / kg)
					</label>
					<div class="relative">
						<span class="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none font-display font-extrabold text-xs text-primary">
							Rp
						</span>
						<input
							id="price_formatted_input"
							type="text"
							inputmode="numeric"
							required
							value={formPriceFormatted}
							oninput={handlePriceInput}
							placeholder="0"
							class="w-full pl-10 pr-16 py-2.5 rounded-xl border border-border-subtle bg-surface-base text-text-strong font-display font-bold text-sm tracking-wide focus:outline-hidden focus:border-primary focus:ring-2 focus:ring-brand-mint/20 transition-all"
						/>
						<span class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-text-muted font-medium text-xs">
							/ kg
						</span>
					</div>
					<p class="text-[11px] text-text-muted mt-3">
						Nominal otomatis diformat ribuan dengan pemisah titik (misal: <strong>3.500</strong>).
					</p>
				</div>

				<!-- ============================================================= -->
				<!-- 3. CUSTOM UI: TANGGAL, HARI, DAN JAM OBSERVASI                -->
				<!-- ============================================================= -->
				<div class="space-y-2 p-3.5 rounded-2xl bg-surface-base border border-border-subtle">
					<div class="flex items-center justify-between">
						<label for="date_picker_input" class="block font-bold text-text-strong uppercase tracking-wider text-[11px]">
							Waktu &amp; Tanggal Observasi
						</label>
						{#if dateDayName}
							<span class="inline-flex items-center gap-1 text-[11px] font-bold text-accent-teal bg-accent-teal-subtle px-2 py-0.5 rounded-md border border-accent-teal/30">
								<span class="material-symbols-outlined text-[14px]">calendar_today</span>
								Hari {dateDayName}
							</span>
						{/if}
					</div>

					<div class="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
						<!-- Custom Date Input with Day info -->
						<div>
							<span class="block text-[10px] font-semibold text-text-muted mb-1">Pilih Tanggal:</span>
							<input
								id="date_picker_input"
								type="date"
								required
								bind:value={selectedDateStr}
								class="w-full px-3 py-2 rounded-xl border border-border-subtle bg-surface-card text-text-strong text-xs font-semibold focus:outline-hidden focus:border-primary focus:ring-1 focus:ring-primary"
							/>
						</div>

						<!-- Custom Time Input (Jam & Menit) -->
						<div>
							<span class="block text-[10px] font-semibold text-text-muted mb-1">Pilih Jam &amp; Menit:</span>
							<div class="flex items-center gap-2">
								<div class="relative flex-1">
									<select
										bind:value={selectedHour}
										class="w-full px-2 py-2 rounded-xl border border-border-subtle bg-surface-card text-text-strong text-xs font-semibold text-center focus:outline-hidden focus:border-primary"
									>
										{#each Array.from({ length: 24 }, (_, i) => String(i).padStart(2, '0')) as h}
											<option value={h}>{h}</option>
										{/each}
									</select>
								</div>
								<span class="font-bold text-text-muted">:</span>
								<div class="relative flex-1">
									<select
										bind:value={selectedMinute}
										class="w-full px-2 py-2 rounded-xl border border-border-subtle bg-surface-card text-text-strong text-xs font-semibold text-center focus:outline-hidden focus:border-primary"
									>
										{#each Array.from({ length: 60 }, (_, i) => String(i).padStart(2, '0')) as m}
											<option value={m}>{m}</option>
										{/each}
									</select>
								</div>
								<span class="text-[11px] font-medium text-text-muted">WIB</span>
							</div>
						</div>
					</div>
				</div>

				<!-- Action Buttons -->
				<div class="pt-2 flex items-center justify-end gap-2.5">
					<button
						type="button"
						onclick={closeModal}
						class="px-4 py-2.5 rounded-xl border border-border-subtle text-text-strong hover:bg-surface-base font-semibold cursor-pointer transition-colors"
					>
						Batal
					</button>
					<button
						type="submit"
						disabled={isSubmitting || formRawPrice <= 0 || !selectedDateStr}
						class="px-6 py-2.5 rounded-xl bg-primary hover:bg-brand-emerald-dark text-on-primary font-bold shadow-md active:scale-95 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed transition-all"
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

<!-- ========================================================================= -->
<!-- MODAL FORM: DELETE CONFIRMATION WITH POP-UP ANIMATION & ESC LISTENER      -->
<!-- ========================================================================= -->
{#if isDeleteModalOpen && itemToDelete}
	<div
		class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm transition-opacity duration-200"
		onclick={(e) => {
			if (e.target === e.currentTarget) closeDeleteModal();
		}}
		role="presentation"
	>
		<div
			class="bg-surface-card border border-border-subtle rounded-3xl max-w-sm w-full p-6 sm:p-7 shadow-2xl space-y-4 transform transition-all duration-200 ease-out scale-100 opacity-100 animate-in fade-in zoom-in-95"
		>
			<div class="w-14 h-14 rounded-2xl bg-danger-rose-subtle text-danger-rose flex items-center justify-center mx-auto shadow-xs">
				<span class="material-symbols-outlined text-3xl">delete_forever</span>
			</div>

			<div class="text-center space-y-1.5">
				<h3 class="font-display font-extrabold text-base text-text-strong">
					Hapus Observasi Harga?
				</h3>
				<p class="text-xs text-text-muted leading-relaxed">
					Anda akan menghapus data harga untuk <strong>{itemToDelete.sub_category_name}</strong> sebesar <strong class="text-text-strong font-display">Rp {itemToDelete.price.toLocaleString('id-ID')}</strong>. Tindakan ini tidak dapat dibatalkan.
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
				class="pt-3 flex items-center justify-center gap-3 text-xs"
			>
				<input type="hidden" name="id" value={itemToDelete.id} />
				<button
					type="button"
					onclick={closeDeleteModal}
					class="w-full px-4 py-2.5 rounded-xl border border-border-subtle text-text-strong font-semibold hover:bg-surface-base cursor-pointer transition-colors"
				>
					Batal
				</button>
				<button
					type="submit"
					disabled={isDeleting}
					class="w-full px-4 py-2.5 rounded-xl bg-danger-rose hover:bg-rose-700 text-white font-bold shadow-md active:scale-95 cursor-pointer disabled:opacity-50 transition-all"
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
