<div class="bg-surface-card border border-border-subtle rounded-2xl p-5 sm:p-6 shadow-xs flex flex-col justify-between">
	<!-- Header Peta -->
	<div class="flex items-start justify-between gap-3 mb-4">
		<div>
			<div class="flex items-center gap-2">
				<span class="material-symbols-outlined text-primary text-xl">map</span>
				<h3 class="font-display font-bold text-base text-text-strong">
					Peta Lokasi Bank Sampah Terdekat
				</h3>
			</div>
			<p class="text-xs text-text-muted mt-0.5">
				Temukan fasilitas penimbangan, drop-point resmi, dan bank sampah di sekitar lokasi Anda.
			</p>
		</div>
		<span class="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-brand-mint-subtle text-brand-forest border border-brand-mint/30 shrink-0">
			Google My Maps
		</span>
	</div>

	<!-- Google My Maps Iframe Sesuai Spesifikasi Plan 005 -->
	<div class="w-full rounded-xl overflow-hidden border border-border-subtle shadow-xs bg-surface-base">
		<iframe
			src="https://www.google.com/maps/d/u/0/viewer?mid=1zvmwKLiUlW0xpqzvYB-XkNahcR3DdcA&femb=1&ll=-7.802529142105196%2C110.37516666666666&z=14"
			width="100%"
			height="380"
			style="border:0; border-radius: 0.75rem;"
			allowfullscreen={true}
			loading="lazy"
			referrerpolicy="no-referrer-when-downgrade"
			title="Peta Lokasi Bank Sampah Terdekat"
		></iframe>
	</div>

	<!-- Footer Note -->
	<div class="mt-3 text-[11px] text-text-muted flex items-center justify-between">
		<span>Sumber data: Jaringan Bank Sampah &amp; DLH Yogyakarta</span>
		<span class="flex items-center gap-1 text-primary">
			<span class="material-symbols-outlined text-sm">near_me</span>
			<span>Area DI Yogyakarta</span>
		</span>
	</div>
</div>
