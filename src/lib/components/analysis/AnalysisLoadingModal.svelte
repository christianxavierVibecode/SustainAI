<script lang="ts">
	let {
		isOpen = false,
		title = 'Menganalisis Gambar...',
		message = 'Model AI Gemini 3.5 Flash sedang memproses visual dan memverifikasi klasifikasi...'
	}: {
		isOpen: boolean;
		title?: string;
		message?: string;
	} = $props();
</script>

{#if isOpen}
	<div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
		<div class="bg-surface-card border border-border-subtle rounded-3xl p-6 sm:p-8 max-w-sm w-full text-center shadow-xl space-y-5">
			<!-- Animated Pulse Ring Indicator -->
			<div class="relative w-20 h-20 mx-auto flex items-center justify-center">
				<div class="absolute inset-0 rounded-full bg-primary/20 animate-ping"></div>
				<div class="relative w-16 h-16 rounded-full bg-brand-mint-subtle border border-primary/30 flex items-center justify-center text-primary shadow-xs">
					<span class="material-symbols-outlined text-3xl animate-spin">cyclone</span>
				</div>
			</div>

			<!-- Loading Texts -->
			<div class="space-y-1.5">
				<h3 class="font-display font-extrabold text-lg text-text-strong">
					{title}
				</h3>
				<p class="text-xs text-text-muted leading-relaxed">
					{message}
				</p>
			</div>

			<!-- AI Provider Tag -->
			<div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-base border border-border-subtle text-[11px] font-semibold text-text-muted">
				<span class="w-2 h-2 rounded-full bg-border-focus animate-pulse"></span>
				<span>Google Gemini 3.5 Flash Active</span>
			</div>
		</div>
	</div>
{/if}
