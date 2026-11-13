<script lang="ts">
	import { onMount } from 'svelte';
	import Chart from 'chart.js/auto';
	import type { WastePriceTrendRecord } from '$lib/server/db/dashboard';

	let { data }: { data: WastePriceTrendRecord[] } = $props();

	let canvasEl = $state<HTMLCanvasElement | null>(null);
	let chartInstance: Chart | null = null;
	let selectedCategory = $state<string>('Semua');

	// Ambil daftar kategori unik untuk tombol filter
	let categories = $derived(['Semua', ...Array.from(new Set(data.map((d) => d.category_name)))]);

	// Palet warna ramah lingkungan untuk tiap garis subkategori
	const colorPalette = [
		'#006948', // primary green
		'#0F766E', // accent teal
		'#0284C7', // info sky
		'#D97706', // amber
		'#8D4B00', // tertiary orange
		'#E11D48', // rose
		'#16A34A', // emerald
		'#4F46E5', // indigo
		'#0D9488', // dark teal
		'#65A30D'  // lime
	];

	function renderChart() {
		if (!canvasEl) return;

		// Filter data berdasarkan kategori yang dipilih
		const filteredData =
			selectedCategory === 'Semua'
				? data
				: data.filter((d) => d.category_name === selectedCategory);

		// Urutkan tanggal unik untuk label sumbu X
		const uniqueDates = Array.from(
			new Set(
				filteredData.map((d) =>
					new Date(d.created_at).toLocaleDateString('id-ID', {
						month: 'short',
						day: 'numeric'
					})
				)
			)
		);

		// Dapatkan subkategori unik
		const uniqueSubCats = Array.from(new Set(filteredData.map((d) => d.sub_category_name)));

		// Siapkan datasets untuk Chart.js
		const datasets = uniqueSubCats.map((subCat, idx) => {
			const color = colorPalette[idx % colorPalette.length];
			const dataPoints = uniqueDates.map((dateStr) => {
				const item = filteredData.find(
					(d) =>
						d.sub_category_name === subCat &&
						new Date(d.created_at).toLocaleDateString('id-ID', {
							month: 'short',
							day: 'numeric'
						}) === dateStr
				);
				return item ? item.price : null;
			});

			return {
				label: subCat,
				data: dataPoints,
				borderColor: color,
				backgroundColor: color + '22',
				tension: 0.35,
				fill: false,
				pointRadius: 4,
				pointHoverRadius: 6,
				pointBackgroundColor: color,
				borderWidth: 2.2,
				spanGaps: true
			};
		});

		if (chartInstance) {
			chartInstance.destroy();
		}

		chartInstance = new Chart(canvasEl, {
			type: 'line',
			data: {
				labels: uniqueDates,
				datasets
			},
			options: {
				responsive: true,
				maintainAspectRatio: false,
				interaction: {
					mode: 'index',
					intersect: false
				},
				plugins: {
					legend: {
						position: 'top',
						labels: {
							boxWidth: 12,
							font: { family: 'Plus Jakarta Sans', size: 11, weight: 'bold' },
							color: '#64748B'
						}
					},
					tooltip: {
						backgroundColor: '#0F172A',
						titleFont: { family: 'Plus Jakarta Sans', size: 12 },
						bodyFont: { family: 'Inter', size: 11 },
						padding: 10,
						cornerRadius: 8,
						callbacks: {
							label: (ctx) => ` ${ctx.dataset.label}: Rp ${(ctx.raw as number)?.toLocaleString('id-ID') || 0} / kg`
						}
					}
				},
				scales: {
					x: {
						grid: { display: false },
						ticks: {
							font: { family: 'Inter', size: 11 },
							color: '#64748B'
						}
					},
					y: {
						grid: { color: '#E2E8F0' },
						ticks: {
							font: { family: 'Inter', size: 11 },
							color: '#64748B',
							callback: (val) => `Rp ${(Number(val) / 1000).toFixed(0)}k`
						}
					}
				}
			}
		});
	}

	onMount(() => {
		renderChart();
		return () => {
			if (chartInstance) chartInstance.destroy();
		};
	});

	// Re-render chart saat filter berubah
	$effect(() => {
		if (selectedCategory && canvasEl) {
			renderChart();
		}
	});
</script>

<div class="bg-surface-card border border-border-subtle rounded-2xl p-5 sm:p-6 shadow-xs flex flex-col justify-between">
	<!-- Chart Header & Filter Category Tabs -->
	<div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5">
		<div>
			<div class="flex items-center gap-2">
				<span class="material-symbols-outlined text-primary text-xl">trending_up</span>
				<h3 class="font-display font-bold text-base text-text-strong">
					Tren Fluktuasi Harga Sampah Acuan
				</h3>
			</div>
			<p class="text-xs text-text-muted mt-0.5">
				Riwayat observasi harga beli komoditas daur ulang (Rp / kg) berdasarkan Bank Sampah.
			</p>
		</div>

		<!-- Category Filter Pills -->
		<div class="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
			{#each categories as cat}
				<button
					type="button"
					onclick={() => (selectedCategory = cat)}
					class="px-2.5 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer border {selectedCategory === cat
						? 'bg-primary text-on-primary border-primary shadow-xs'
						: 'bg-surface-base text-text-muted border-border-subtle hover:text-text-strong hover:border-primary/50'}"
				>
					{cat}
				</button>
			{/each}
		</div>
	</div>

	<!-- Canvas Container -->
	<div class="w-full h-72 sm:h-80 relative">
		<canvas bind:this={canvasEl}></canvas>
	</div>
</div>
