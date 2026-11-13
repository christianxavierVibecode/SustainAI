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

	// Palet warna ramah lingkungan & profesional untuk tiap garis subkategori
	const colorPalette = [
		'#006948', // primary green
		'#0F766E', // accent teal
		'#0284C7', // info sky
		'#D97706', // amber
		'#8D4B00', // tertiary orange
		'#E11D48', // rose
		'#16A34A', // emerald
		'#6366F1', // indigo
		'#0D9488', // dark teal
		'#84CC16', // lime
		'#EC4899', // pink
		'#8B5CF6'  // violet
	];

	function renderChart() {
		if (!canvasEl) return;

		// Filter data berdasarkan kategori yang dipilih
		const filteredData =
			selectedCategory === 'Semua'
				? data
				: data.filter((d) => d.category_name === selectedCategory);

		if (filteredData.length === 0) {
			if (chartInstance) {
				chartInstance.destroy();
				chartInstance = null;
			}
			return;
		}

		// Urutkan data berdasarkan waktu secara kronologis
		const sortedData = [...filteredData].sort(
			(a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
		);

		// Dapatkan daftar label tanggal unik berformat rapi (contoh: "18 Agu")
		const uniqueDateMap = new Map<string, string>();
		sortedData.forEach((d) => {
			const rawDate = d.created_at.split('T')[0];
			if (!uniqueDateMap.has(rawDate)) {
				const formatted = new Date(d.created_at).toLocaleDateString('id-ID', {
					day: 'numeric',
					month: 'short'
				});
				uniqueDateMap.set(rawDate, formatted);
			}
		});

		const rawDateKeys = Array.from(uniqueDateMap.keys());
		const labels = Array.from(uniqueDateMap.values());

		// Dapatkan subkategori unik
		const uniqueSubCats = Array.from(new Set(sortedData.map((d) => d.sub_category_name)));

		// Bangun datasets garis (Line Chart) untuk Chart.js
		const ctx = canvasEl.getContext('2d');
		const datasets = uniqueSubCats.map((subCat, idx) => {
			const color = colorPalette[idx % colorPalette.length];

			// Membuat gradien halus di bawah garis jika context 2D tersedia
			let gradientBackground = color + '15';
			if (ctx) {
				const gradient = ctx.createLinearGradient(0, 0, 0, 300);
				gradient.addColorStop(0, color + '28');
				gradient.addColorStop(1, color + '00');
				gradientBackground = gradient as unknown as string;
			}

			const dataPoints = rawDateKeys.map((dateKey) => {
				const match = sortedData.find(
					(d) => d.sub_category_name === subCat && d.created_at.startsWith(dateKey)
				);
				return match ? match.price : null;
			});

			return {
				label: subCat,
				data: dataPoints,
				borderColor: color,
				backgroundColor: gradientBackground,
				fill: true,
				tension: 0.35, // kurva garis halus (smooth spline)
				pointRadius: 4,
				pointHoverRadius: 7,
				pointBackgroundColor: color,
				pointHoverBackgroundColor: '#FFFFFF',
				pointBorderColor: '#FFFFFF',
				pointHoverBorderColor: color,
				pointBorderWidth: 2,
				pointHoverBorderWidth: 2.5,
				borderWidth: 2.5,
				spanGaps: true
			};
		});

		if (chartInstance) {
			chartInstance.destroy();
		}

		chartInstance = new Chart(canvasEl, {
			type: 'line',
			data: {
				labels,
				datasets
			},
			options: {
				responsive: true,
				maintainAspectRatio: false,
				interaction: {
					mode: 'index',
					intersect: false
				},
				animation: {
					duration: 650,
					easing: 'easeOutQuart'
				},
				plugins: {
					legend: {
						position: 'top',
						align: 'end',
						labels: {
							boxWidth: 10,
							boxHeight: 10,
							usePointStyle: true,
							pointStyle: 'circle',
							font: {
								family: 'Plus Jakarta Sans, sans-serif',
								size: 11,
								weight: 'bold'
							},
							color: '#64748B',
							padding: 14
						}
					},
					tooltip: {
						backgroundColor: '#0F172A',
						titleColor: '#F8FAFC',
						bodyColor: '#E2E8F0',
						titleFont: {
							family: 'Plus Jakarta Sans, sans-serif',
							size: 12,
							weight: 'bold'
						},
						bodyFont: {
							family: 'Inter, sans-serif',
							size: 11
						},
						padding: {
							top: 8,
							bottom: 8,
							left: 12,
							right: 12
						},
						cornerRadius: 10,
						borderWidth: 1,
						borderColor: 'rgba(255, 255, 255, 0.1)',
						displayColors: true,
						boxWidth: 8,
						boxHeight: 8,
						usePointStyle: true,
						callbacks: {
							title: (items) => (items[0] ? `Observasi: ${items[0].label}` : ''),
							label: (ctx) => {
								const val = ctx.raw as number | null;
								if (val === null || val === undefined) return ` ${ctx.dataset.label}: -`;
								return ` ${ctx.dataset.label}: Rp ${val.toLocaleString('id-ID')} / kg`;
							}
						}
					}
				},
				scales: {
					x: {
						grid: {
							display: false
						},
						border: {
							display: false
						},
						ticks: {
							font: {
								family: 'Inter, sans-serif',
								size: 11,
								weight: 500
							},
							color: '#64748B',
							padding: 8
						}
					},
					y: {
						grid: {
							color: '#F1F5F9'
						},
						border: {
							display: false,
							dash: [4, 4]
						},
						ticks: {
							font: {
								family: 'Inter, sans-serif',
								size: 11
							},
							color: '#64748B',
							padding: 8,
							callback: (val) => `Rp ${(Number(val) / 1000).toLocaleString('id-ID')}k`
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

	// Re-render grafik saat data atau pilihan filter berubah secara reaktif
	$effect(() => {
		if (selectedCategory && canvasEl && data) {
			renderChart();
		}
	});
</script>

<div class="bg-surface-card border border-border-subtle rounded-2xl p-5 sm:p-6 shadow-xs flex flex-col justify-between">
	<!-- Chart Header & Filter Category Tabs -->
	<div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5">
		<div>
			<div class="flex items-center gap-2">
				<div class="w-8 h-8 rounded-lg bg-brand-mint-subtle border border-brand-mint/30 flex items-center justify-center text-primary">
					<span class="material-symbols-outlined text-[18px]">trending_up</span>
				</div>
				<h3 class="font-display font-bold text-base text-text-strong">
					Tren Fluktuasi Harga Sampah Acuan
				</h3>
			</div>
			<p class="text-xs text-text-muted mt-1">
				Grafik garis observasi harga beli komoditas daur ulang (Rp / kg) berdasarkan Bank Sampah mitra.
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

	<!-- Canvas Container (Line Chart) -->
	<div class="w-full h-72 sm:h-80 relative">
		<canvas bind:this={canvasEl}></canvas>
	</div>
</div>
