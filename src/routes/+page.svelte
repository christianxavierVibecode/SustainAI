<script lang="ts">
	import { Sparkles, ArrowRight, ShieldCheck, Leaf, Recycle } from '@lucide/svelte';
</script>

<svelte:head>
	<title>SustainAI - AI-Powered Waste & Plant Analyzer</title>
</svelte:head>

<div class="min-h-screen flex flex-col bg-slate-50 text-slate-900">
	<!-- Header -->
	<header class="w-full bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-30">
		<div class="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
			<div class="flex items-center gap-3">
				<div class="w-9 h-9 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center p-1">
					<img src="/favicon.webp" alt="SustainAI Logo" class="w-full h-full object-contain" />
				</div>
				<div>
					<span class="font-bold text-xl text-emerald-800 tracking-tight font-display">SustainAI</span>
					<span class="text-xs text-slate-500 hidden sm:inline ml-2">Intelligence Platform</span>
				</div>
			</div>

			<div class="flex items-center gap-3">
				<a
					href="/auth/login"
					class="px-4 py-2 text-sm font-semibold text-slate-700 hover:text-emerald-700 transition-colors"
				>
					Masuk
				</a>
				<a
					href="/auth/register"
					class="px-4 py-2 text-sm font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg shadow-sm transition-all"
				>
					Daftar Akun
				</a>
			</div>
		</div>
	</header>

	<!-- Hero Section -->
	<main class="flex-1 max-w-5xl mx-auto px-4 py-16 sm:py-24 flex flex-col items-center text-center">
		<div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold mb-6 border border-emerald-200">
			<Sparkles class="w-3.5 h-3.5" />
			<span>AI-Powered Sustainability Assistant</span>
		</div>

		<h1 class="text-4xl sm:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight max-w-4xl mb-6">
			Dari Pengenalan Objek Menuju <span class="text-emerald-700 underline decoration-emerald-300">Aksi Berkelanjutan</span>
		</h1>

		<p class="text-lg text-slate-600 max-w-2xl mb-10 leading-relaxed">
			Platform asisten AI multimodal untuk mengenali dan mengklasifikasikan sampah, memahami indikasi penyakit tanaman, serta memberikan rekomendasi tindakan yang ramah lingkungan.
		</p>

		<div class="flex flex-wrap items-center justify-center gap-4 mb-16">
			<a
				href="/dashboard/overview"
				class="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-semibold shadow-md transition-all active:scale-95"
			>
				<span>Buka Dashboard</span>
				<ArrowRight class="w-4 h-4" />
			</a>
			<a
				href="/auth/register"
				class="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white hover:bg-slate-100 text-slate-700 font-semibold border border-slate-300 shadow-sm transition-all"
			>
				<span>Coba Gratis Demo</span>
			</a>
		</div>

		<!-- 2 Modul Utama Preview Cards -->
		<div class="grid grid-cols-1 md:grid-cols-2 gap-6 w-full text-left">
			<!-- Waste Card -->
			<div class="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
				<div class="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center mb-4 border border-emerald-100">
					<Recycle class="w-6 h-6" />
				</div>
				<h3 class="text-xl font-bold text-slate-900 mb-2">Waste Analyzer</h3>
				<p class="text-sm text-slate-600 mb-4 leading-relaxed">
					Klasifikasi jenis sampah secara presisi, pahami dampak lingkungannya, tips daur ulang, serta peroleh referensi harga dan lokasi bank sampah.
				</p>
				<span class="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-100">
					Mendukung SDG 12
				</span>
			</div>

			<!-- Plant Card -->
			<div class="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
				<div class="w-12 h-12 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center mb-4 border border-teal-100">
					<Leaf class="w-6 h-6" />
				</div>
				<h3 class="text-xl font-bold text-slate-900 mb-2">Plant Disease Analyzer</h3>
				<p class="text-sm text-slate-600 mb-4 leading-relaxed">
					Deteksi indikasi awal hama atau penyakit pada tanaman berdasarkan ciri visual daun dan peroleh panduan perawatan serta pencegahan.
				</p>
				<span class="text-xs font-semibold text-teal-700 bg-teal-50 px-2.5 py-1 rounded-md border border-teal-100">
					Multimodal Vision AI
				</span>
			</div>
		</div>
	</main>

	<!-- Footer -->
	<footer class="w-full bg-white border-t border-slate-200 py-6 text-center text-xs text-slate-500">
		<p>&copy; 2026 SustainAI — Developed by Team GenForces (Logicodix2026).</p>
	</footer>
</div>
