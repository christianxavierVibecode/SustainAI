<script lang="ts">
	import { onMount } from 'svelte';
	import Chart from 'chart.js/auto';
	import type { WasteCompositionRecord } from '$lib/server/db/dashboard';

	let { data }: { data: WasteCompositionRecord[] } = $props();

	let canvasEl = $state<HTMLCanvasElement | null>(null);
	let chartInstance: Chart | null = null;

	const colors = [
		'#006948', // primary
		'#0F766E', // teal
		'#0284C7', // sky
		'#D97706', // amber
		'#8D4B00', // tertiary
		'#E11D48', // rose
		'#94A3B8'  // slate
	];

	let totalItems = $derived(data.reduce((acc, curr) => acc + curr.total_count, 0));

	function renderChart() {
		if (!canvasEl) return;

		// Jika data kosong, tampilkan fallback visual
		if (data.length === 0) return;

		if (chartInstance) {
			chartInstance.destroy();
		}

		chartInstance = new Chart(canvasEl, {
			type: 'doughnut',
			data: {
				labels: data.map((d) => d.category_name),
				datasets: [
					{
						data: data.map((d) => d.total_count),
						backgroundColor: colors.slice(0, data.length),
						borderWidth: 2,
						borderColor: '#FFFFFF',
						hoverOffset: 6
					}
				]
			},
			options: {
				responsive: true,
				maintainAspectRatio: false,
				cutout: '72%',
				plugins: {
					legend: {
						display: false
					},
					tooltip: {
						backgroundColor: '#0F172A',
						titleFont: { family: 'Plus Jakarta Sans', size: 12 },
						bodyFont: { family: 'Inter', size: 11 },
						cornerRadius: 8,
						callbacks: {
							label: (ctx) => {
								const val = ctx.raw as number;
								const pct = totalItems > 0 ? ((val / totalItems) * 100).toFixed(1) : '0';
								return ` ${ctx.label}: ${val} item (${pct}%)`;
							}
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

	$effect(() => {
		if (data && canvasEl) {
			renderChart();
		}
	});
</script>

<div class="bg-surface-card border border-border-subtle rounded-2xl p-5 sm:p-6 shadow-xs flex flex-col justify-between h-full">
	<!-- Header -->
	<div class="mb-4">
		<div class="flex items-center gap-2">
			<span class="material-symbols-outlined text-primary text-xl">pie_chart</span>
			<h3 class="font-display font-bold text-base text-text-strong">
				Komposisi Kategori Sampah
			</h3>
		</div>
		<p class="text-xs text-text-muted mt-0.5">
			Distribusi persentase jenis sampah dari hasil analisis Anda.
		</p>
	</div>

	{#if data.length === 0}
		<!-- Empty State Visual -->
		<div class="flex-1 flex flex-col items-center justify-center p-6 text-center bg-surface-base/50 rounded-xl border border-dashed border-border-subtle my-2">
			<span class="material-symbols-outlined text-3xl text-text-muted mb-2">donut_large</span>
			<div class="text-xs font-semibold text-text-strong mb-1">Belum Ada Data Sampah</div>
			<p class="text-[11px] text-text-muted max-w-[200px] leading-relaxed">
				Mulai lakukan pemindaian pada Waste Classifier untuk melihat sebaran kategori sampah Anda.
			</p>
		</div>
	{:else}
		<!-- Donut Chart Canvas Container with Center Label -->
		<div class="relative w-full h-52 sm:h-56 my-auto flex items-center justify-center">
			<canvas bind:this={canvasEl}></canvas>
			<!-- Center Stat Label -->
			<div class="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
				<span class="font-display font-extrabold text-2xl text-text-strong leading-none">
					{totalItems}
				</span>
				<span class="text-[11px] text-text-muted font-medium mt-1">Item Sampah</span>
			</div>
		</div>

		<!-- Custom Legend Breakdown -->
		<div class="grid grid-cols-2 gap-2 pt-4 mt-2 border-t border-border-subtle">
			{#each data as item, idx}
				{@const pct = totalItems > 0 ? ((item.total_count / totalItems) * 100).toFixed(0) : '0'}
				{@const clr = colors[idx % colors.length]}
				<div class="flex items-center gap-2 text-xs">
					<span class="w-2.5 h-2.5 rounded-full shrink-0" style="background-color: {clr}"></span>
					<span class="text-text-muted truncate flex-1">{item.category_name}</span>
					<span class="font-bold text-text-strong shrink-0">{pct}%</span>
				</div>
			{/each}
		</div>
	{/if}
</div>
