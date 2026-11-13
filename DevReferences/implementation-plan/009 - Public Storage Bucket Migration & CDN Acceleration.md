# Implementation Plan: 009 - Public Storage Bucket Migration & CDN Acceleration

## 1. Overview & Latar Belakang
Pada arsitektur saat ini, berkas foto hasil analisis (`waste-analysis` & `plant-analysis`) diunggah ke Supabase Storage bucket berstatus **Private (`SustainAI-UserPhoto`)**.
Setiap kali browser menampilkan kartu analisis atau riwayat (pada endpoint API analisis maupun halaman `/dashboard/history`), server harus meminta token bertanda tangan (*Signed URL*) ke Supabase Storage melalui panggilan API `createSignedUrl()`.

### Dampak Private Bucket:
1. **Latensi Tambahan (Network Round-Trip)**: Server harus melakukan panggilan HTTP tambahan ke Supabase API secara sekuensial atau batch (`Promise.all`) hanya untuk meresolusi token URL gambar sebelum HTML dirender ke pengguna.
2. **Ketiadaan Browser & Edge Cache**: URL bertanda tangan mengandung token query string yang selalu berubah (`token=...`), sehingga browser dan Global CDN tidak dapat melakukan caching statis gambar secara optimal.
3. **Masa Berlaku URL Terbatas**: Signed URL kedaluwarsa setelah durasi tertentu (misal 1 jam), menyebabkan gambar rusak jika halaman web atau modal dibiarkan terbuka dalam waktu lama.

### Solusi & Tujuan:
Melakukan migrasi ke **Public Storage Bucket**. Dengan konfigurasi public bucket:
- Gambar dapat langsung diakses via URL publik permanen berkinerja tinggi dari Supabase Global CDN:  
  `https://<project-ref>.supabase.co/storage/v1/object/public/<bucket-name>/<image-path>`
- Tidak ada lagi pemanggilan API server-side `createSignedUrl` pada saat memuat data riwayat, sehingga respon server menjadi instan.
- Gambar otomatis di-*cache* oleh CDN Edge dan browser pengguna menggunakan header HTTP `Cache-Control: public, max-age=31536000` (atau konfigurasi cache default Supabase).

---

## 2. Analisis Titik Perubahan (Impact Analysis)

Berikut adalah modul dan file yang terdampak migrasi:

| No | Modul / Berkas | Kondisi Saat Ini (Private) | Kondisi Baru (Public CDN) |
|---|---|---|---|
| 1 | **Supabase Storage Bucket** | Bucket berstatus Private | Konfigurasi bucket diubah menjadi **Public** di Supabase Dashboard / SQL Storage API |
| 2 | `src/lib/server/storage.ts` | Menggunakan `createSignedUrl(...)` async ke server Supabase | Menggunakan `getPublicImageUrl(imagePath)` sinkron/langsung tanpa network overhead via `supabaseAdmin.storage.from(bucket).getPublicUrl(imagePath).data.publicUrl` |
| 3 | `src/routes/api/analyze/waste/+server.ts` | Memanggil `createSignedImageUrl(storagePath, 3600)` | Mengambil `getPublicImageUrl(storagePath)` langsung |
| 4 | `src/routes/api/analyze/plant/+server.ts` | Memanggil `createSignedImageUrl(storagePath, 3600)` | Mengambil `getPublicImageUrl(storagePath)` langsung |
| 5 | `src/routes/dashboard/history/+page.server.ts` | Memetakan seluruh riwayat via `Promise.all(history.map(createSignedImageUrl))` | Langsung memasangkan `imageUrl = getPublicImageUrl(item.image_path)` secara instan tanpa `Promise.all` dan tanpa request async tambahan |
| 6 | `src/routes/dashboard/overview/+page.server.ts` | Aktivitas terbaru menggunakan path / format statis | Menyediakan `publicUrl` langsung untuk gambar thumbnail di overview dashboard |

---

## 3. Detail Arsitektur & Helper Storage Baru

### A. Helper Publik di `src/lib/server/storage.ts`
```typescript
/**
 * Ambil Public CDN URL permanen untuk gambar di Public Supabase Storage Bucket
 * Cepat, sinkron, memanfaatkan Cloudflare/Supabase Edge CDN Cache
 */
export function getPublicImageUrl(imagePath: string): string | null {
	if (!imagePath) return null;

	const { data } = supabaseAdmin.storage
		.from(SUPABASE_BUCKET_NAME)
		.getPublicUrl(imagePath);

	return data?.publicUrl || null;
}
```

### B. Backward-Compatibility Helper
Fungsi `createSignedImageUrl(imagePath)` tetap dipertahankan sementara sebagai wrapper yang memanggil `getPublicImageUrl(imagePath)` agar tidak merusak kode lain (*zero regression*), namun fungsi asinkron berlebih dihilangkan dari jalur pemuatan data riwayat.

---

## 4. Step-by-Step Implementation

1. **Konfigurasi Supabase Storage Bucket**:
   - Pastikan bucket `SustainAI-UserPhoto` (atau nama bucket yang ditentukan pada `.env`) disetel ke mode **Public Bucket**.
   - Berikan izin `SELECT` public policy (bacaan umum) pada objek storage di skema `storage.objects` agar CDN Supabase dapat menyajikan gambar secara publik tanpa token auth.
2. **Refactor Storage Helper (`src/lib/server/storage.ts`)**:
   - Tambahkan fungsi `getPublicImageUrl(imagePath: string): string`.
   - Perbarui dokumentasi kode agar mencerminkan penggunaan CDN cache.
3. **Optimasi Endpoint API Analisis (`src/routes/api/analyze/waste/+server.ts` & `plant/+server.ts`)**:
   - Ganti pemanggilan pembuatan signed URL dengan `getPublicImageUrl`.
   - Respon JSON langsung menyertakan `imageUrl` CDN publik berkecepatan tinggi.
4. **Optimasi Route History (`src/routes/dashboard/history/+page.server.ts`)**:
   - Hapus loop asinkron `Promise.all` pembuat signed URL.
   - Sambungkan `getPublicImageUrl(item.image_path)` langsung ke pemetaan data riwayat, menghemat waktu muat halaman hingga 70-80%.
5. **Verifikasi & Acceptance Test**:
   - Jalankan `npm run check` untuk memastikan 0 error dan 0 warning.
   - Uji pemuatan gambar di browser via tab Network (pastikan respons berstatus `200 OK` atau `304 Not Modified` dari Cloudflare/Supabase CDN Cache).
   - Pastikan fitur hapus gambar (`deleteStorageImage`) tetap berjalan sebagaimana mestinya.

---

## 5. Verification & Acceptance Criteria
- [ ] Bucket Supabase Storage disetel ke mode publik dan dapat diakses tanpa token rahasia/sementara.
- [ ] Fungsi `getPublicImageUrl` mengembalikan URL publik berformat `https://.../storage/v1/object/public/...`.
- [ ] Halaman `/dashboard/history` memuat gambar thumbnail secara instan tanpa latensi pembuatan signed URL per item.
- [ ] Endpoint `/api/analyze/waste` dan `/api/analyze/plant` mengembalikan `imageUrl` CDN publik setelah gambar berhasil diunggah.
- [ ] Gambar dapat di-cache oleh browser pengguna dengan header caching yang efisien.
- [ ] Aksi penghapusan riwayat analisis tetap berhasil menghapus berkas gambar dari storage publik via service role key.
- [ ] Seluruh pengujian kode (`npm run check` & `npm run build`) berhasil 100%.
