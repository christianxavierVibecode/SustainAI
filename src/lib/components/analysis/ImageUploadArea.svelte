<script lang="ts">
	let {
		onImageSelected,
		isAnalyzing = false
	}: {
		onImageSelected: (file: File) => void;
		isAnalyzing?: boolean;
	} = $props();

	let fileInput = $state<HTMLInputElement | null>(null);
	let isDragging = $state(false);
	let isCameraActive = $state(false);
	let videoEl = $state<HTMLVideoElement | null>(null);
	let streamInstance: MediaStream | null = null;
	let cameraError = $state<string | null>(null);

	function handleFileChange(event: Event) {
		const target = event.target as HTMLInputElement;
		if (target.files && target.files.length > 0) {
			onImageSelected(target.files[0]);
		}
	}

	function handleDrop(event: DragEvent) {
		event.preventDefault();
		isDragging = false;
		if (event.dataTransfer?.files && event.dataTransfer.files.length > 0) {
			const file = event.dataTransfer.files[0];
			if (file.type.startsWith('image/')) {
				onImageSelected(file);
			}
		}
	}

	function handleDragOver(event: DragEvent) {
		event.preventDefault();
		isDragging = true;
	}

	function handleDragLeave() {
		isDragging = false;
	}

	async function startCamera() {
		cameraError = null;
		isCameraActive = true;
		try {
			streamInstance = await navigator.mediaDevices.getUserMedia({
				video: { facingMode: 'environment', width: { ideal: 1280 }, height: { ideal: 720 } }
			});
			if (videoEl) {
				videoEl.srcObject = streamInstance;
				videoEl.play();
			}
		} catch (err: unknown) {
			const msg = err instanceof Error ? err.message : String(err);
			console.error('Camera access error:', msg);
			cameraError = 'Tidak dapat mengakses kamera. Pastikan izin kamera telah diberikan.';
			stopCamera();
		}
	}

	function stopCamera() {
		if (streamInstance) {
			streamInstance.getTracks().forEach((track) => track.stop());
			streamInstance = null;
		}
		isCameraActive = false;
	}

	function capturePhoto() {
		if (!videoEl) return;
		const canvas = document.createElement('canvas');
		canvas.width = videoEl.videoWidth || 640;
		canvas.height = videoEl.videoHeight || 480;
		const ctx = canvas.getContext('2d');
		if (ctx) {
			ctx.drawImage(videoEl, 0, 0, canvas.width, canvas.height);
			canvas.toBlob(
				(blob) => {
					if (blob) {
						const file = new File([blob], `capture_${Date.now()}.jpg`, { type: 'image/jpeg' });
						stopCamera();
						onImageSelected(file);
					}
				},
				'image/jpeg',
				0.9
			);
		}
	}
</script>

<div class="space-y-4">
	{#if isCameraActive}
		<!-- Live Camera Viewport -->
		<div class="relative bg-slate-900 rounded-2xl overflow-hidden border border-border-subtle aspect-video flex items-center justify-center shadow-md">
			<!-- svelte-ignore a11y_media_has_caption -->
			<video bind:this={videoEl} autoplay playsinline class="w-full h-full object-cover"></video>

			<!-- Camera Controls Overlay -->
			<div class="absolute bottom-4 inset-x-0 flex items-center justify-center gap-4 z-10">
				<button
					type="button"
					onclick={stopCamera}
					class="px-3 py-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-white text-xs font-semibold backdrop-blur-md transition-all cursor-pointer flex items-center gap-1.5"
				>
					<span class="material-symbols-outlined text-sm">close</span>
					<span>Batal</span>
				</button>

				<button
					type="button"
					onclick={capturePhoto}
					class="w-14 h-14 rounded-full bg-white text-primary border-4 border-primary flex items-center justify-center shadow-lg hover:scale-105 active:scale-95 transition-all cursor-pointer"
					title="Ambil Foto"
				>
					<span class="material-symbols-outlined text-3xl">photo_camera</span>
				</button>
			</div>
		</div>
	{:else}
		<!-- Drag-and-drop & File Selection Box -->
		<div
			role="button"
			tabindex="0"
			ondragover={handleDragOver}
			ondragleave={handleDragLeave}
			ondrop={handleDrop}
			onclick={() => fileInput?.click()}
			onkeydown={(e) => e.key === 'Enter' && fileInput?.click()}
			class="border-2 border-dashed rounded-2xl p-8 text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-3 {isDragging
				? 'border-primary bg-brand-mint-subtle/50 scale-[0.99]'
				: 'border-border-subtle bg-surface-card hover:border-primary/50 hover:bg-surface-base'}"
		>
			<input
				bind:this={fileInput}
				type="file"
				accept="image/jpeg,image/png,image/webp"
				onchange={handleFileChange}
				class="hidden"
				disabled={isAnalyzing}
			/>

			<div class="w-14 h-14 rounded-2xl bg-brand-mint-subtle text-primary flex items-center justify-center shadow-xs">
				<span class="material-symbols-outlined text-3xl">cloud_upload</span>
			</div>

			<div>
				<h4 class="font-display font-bold text-sm sm:text-base text-text-strong">
					Unggah Foto atau Seret ke Sini
				</h4>
				<p class="text-xs text-text-muted mt-1">
					Mendukung format JPG, PNG, atau WebP (Maksimal 5 MB).
				</p>
			</div>

			<!-- Quick Choice Actions -->
			<div class="flex items-center gap-3 pt-2">
				<span class="px-3 py-1.5 rounded-lg bg-surface-base border border-border-subtle text-xs font-semibold text-text-strong shadow-xs flex items-center gap-1.5">
					<span class="material-symbols-outlined text-[16px]">folder_open</span>
					<span>Pilih Berkas</span>
				</span>

				<button
					type="button"
					onclick={(e) => {
						e.stopPropagation();
						startCamera();
					}}
					class="px-3 py-1.5 rounded-lg bg-brand-mint-subtle border border-border-focus/30 text-xs font-semibold text-primary shadow-xs hover:bg-brand-mint-subtle/80 flex items-center gap-1.5 cursor-pointer"
				>
					<span class="material-symbols-outlined text-[16px]">photo_camera</span>
					<span>Buka Kamera</span>
				</button>
			</div>
		</div>
	{/if}

	{#if cameraError}
		<div class="p-3 rounded-xl bg-danger-rose-subtle border border-danger-rose/30 text-danger-rose text-xs flex items-center gap-2">
			<span class="material-symbols-outlined text-base">warning</span>
			<span>{cameraError}</span>
		</div>
	{/if}
</div>
