<script lang="ts">
	import { page } from '$app/state';
	import type { LayoutProps } from './$types';

	let { data, children }: LayoutProps = $props();

	let isMobileSidebarOpen = $state(false);

	function toggleSidebar() {
		isMobileSidebarOpen = !isMobileSidebarOpen;
	}

	function closeSidebar() {
		isMobileSidebarOpen = false;
	}

	// Menu navigasi dashboard
	const navItems = [
		{ label: 'Overview', href: '/dashboard/overview', icon: 'dashboard' },
		{ label: 'Waste Classifier', href: '/dashboard/waste', icon: 'delete' },
		{ label: 'Plant Disease', href: '/dashboard/plant', icon: 'potted_plant' },
		{ label: 'Riwayat Analisis', href: '/dashboard/reports', icon: 'bar_chart' },
		{ label: 'Pengaturan Akun', href: '/dashboard/setting', icon: 'settings' }
	];

	// Inisial avatar user
	let userInitials = $derived(
		(data.user?.full_name || data.user?.email || 'U')
			.split(' ')
			.map((n: string) => n[0])
			.slice(0, 2)
			.join('')
			.toUpperCase()
	);
</script>

<div class="bg-surface-base text-text-strong font-body-md antialiased min-h-screen flex selection:bg-brand-mint selection:text-brand-forest">
	<!-- SIDEBAR KANONIKAL -->
	<aside
		id="appSidebar"
		aria-label="Main Navigation"
		class="fixed left-0 top-0 bottom-0 z-50 w-64 bg-surface-card border-r border-border-subtle flex flex-col justify-between py-6 px-4 shadow-xs overflow-y-auto transition-transform duration-300 ease-out {isMobileSidebarOpen
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
			<a href="/dashboard/overview" class="flex items-center gap-3 px-2 group">
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
						Intelligence Platform
					</div>
				</div>
			</a>

			<!-- Navigation Links -->
			<nav aria-label="Main Navigation" class="flex flex-col gap-1.5">
				{#each navItems as item}
					{@const isActive = page.url.pathname.startsWith(item.href)}
					<a
						href={item.href}
						onclick={closeSidebar}
						class="flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all cursor-pointer {isActive
							? 'bg-brand-mint-subtle text-primary font-semibold shadow-xs border border-border-focus/30'
							: 'text-text-muted hover:text-text-strong hover:bg-surface-base'}"
					>
						<span
							class="material-symbols-outlined text-[20px]"
							style={isActive ? "font-variation-settings: 'FILL' 1" : ''}
						>
							{item.icon}
						</span>
						<span class="text-xs sm:text-sm">{item.label}</span>
						{#if isActive}
							<span class="ml-auto w-1.5 h-4 rounded-full bg-primary"></span>
						{/if}
					</a>
				{/each}
			</nav>
		</div>

		<!-- Profil Singkat & Logout di Footer Sidebar -->
		<div class="flex flex-col gap-3 pt-4 border-t border-border-subtle">
			<div class="flex items-center gap-3 px-2 py-2 rounded-xl bg-surface-base border border-border-subtle">
				<div
					class="w-9 h-9 rounded-full bg-accent-teal-subtle text-accent-teal font-bold flex items-center justify-center text-xs border border-accent-teal/30 shrink-0"
				>
					{userInitials}
				</div>
				<div class="flex flex-col min-w-0 flex-1">
					<div class="text-xs font-semibold text-text-strong truncate">
						{data.user?.full_name || 'Pengguna'}
					</div>
					<div class="text-[11px] text-text-muted truncate">
						{data.user?.email}
					</div>
				</div>
				<a
					href="/logout"
					title="Keluar"
					class="material-symbols-outlined text-[18px] text-text-muted hover:text-danger-rose transition-colors p-1"
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

	<!-- MAIN VIEWPORT WRAPPER -->
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
				<span class="hidden sm:inline text-xs text-text-muted">Dashboard</span>
				<span class="hidden sm:inline text-text-muted">/</span>
				<span class="truncate text-xs font-bold text-text-strong">
					{navItems.find((n) => page.url.pathname.startsWith(n.href))?.label || 'Overview'}
				</span>
			</div>

			<!-- Right Actions: Scan Cepat & Akun -->
			<div class="flex items-center gap-3">
				<a
					href="/dashboard/waste"
					class="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-primary hover:bg-brand-emerald-dark text-on-primary font-semibold text-xs transition-all active:scale-95 shadow-xs cursor-pointer"
				>
					<span class="material-symbols-outlined text-[18px]">add_a_photo</span>
					<span class="hidden sm:inline">Pindai Baru</span>
				</a>

				<div
					class="w-8 h-8 rounded-full bg-brand-mint-subtle border border-primary/30 flex items-center justify-center text-primary font-bold text-xs"
					title={data.user?.email}
				>
					{userInitials}
				</div>
			</div>
		</header>

		<!-- KONTEN HALAMAN -->
		<main class="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
			{@render children()}
		</main>

		<!-- FOOTER DASHBOARD -->
		<footer class="w-full py-4 px-6 text-center text-xs text-text-muted border-t border-border-subtle bg-surface-card mt-auto">
			<span>&copy; 2026 SustainAI. Platform Analisis Keberlanjutan &amp; Nilai Ekonomi Daur Ulang.</span>
		</footer>
	</div>
</div>
