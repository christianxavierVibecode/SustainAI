# Implementation Plan: 006 - Analysis History Sub Menu

## 1. Overview
Mengimplementasikan halaman **Dashboard sub menu Riwayat Saya (History / Reports)** pada route `/dashboard/history`. Halaman ini memungkinkan pengguna meninjau seluruh catatan riwayat analisis gambar yang pernah mereka lakukan (baik sampah maupun tanaman), memfilter berdasarkan jenis modul atau rentang tanggal, mencari berdasarkan kata kunci hasil deteksi, melihat gambar asli yang tersimpan di Supabase Storage, memeriksa detail lengkap rekomendasi AI via drawer/modal, serta menghapus riwayat analisis.

---

## 2. Kebutuhan Data & Query Database (Raw SQL)

Halaman Riwayat bersumber dari tabel utama `analysis_records` yang di-*join* ke tabel rincian modul (`analysis_waste_details` dan `analysis_plant_details`) menggunakan native PostgreSQL driver.

### A. Query List Riwayat dengan Filter & Pagination
```sql
SELECT 
    ar.id,
    ar.analysis_type,
    ar.status,
    ar.image_path,
    ar.ai_model,
    ar.result,
    ar.created_at,
    -- Detail Sampah (jika analysis_type = 'waste')
    awd.detected_name AS waste_detected_name,
    awd.classification AS waste_classification,
    awd.is_recyclable,
    -- Detail Tanaman (jika analysis_type = 'plant')
    apd.plant_name,
    apd.detected_pest_disease
FROM analysis_records ar
LEFT JOIN analysis_waste_details awd ON ar.id = awd.analysis_id
LEFT JOIN analysis_plant_details apd ON ar.id = apd.analysis_id
WHERE ar.user_id = $1
  AND ($2::varchar IS NULL OR ar.analysis_type = $2)
  AND ($3::varchar IS NULL OR 
       awd.detected_name ILIKE '%' || $3 || '%' OR 
       apd.plant_name ILIKE '%' || $3 || '%' OR 
       apd.detected_pest_disease ILIKE '%' || $3 || '%')
ORDER BY ar.created_at DESC
LIMIT $4 OFFSET $5;
```

### B. Query Total Count (Untuk Pagination / Metrik)
```sql
SELECT 
    COUNT(ar.id) AS total_records,
    COUNT(ar.id) FILTER (WHERE ar.analysis_type = 'waste') AS total_waste,
    COUNT(ar.id) FILTER (WHERE ar.analysis_type = 'plant') AS total_plant
FROM analysis_records ar
WHERE ar.user_id = $1;
```

### C. Query Hapus Riwayat (Delete Record)
```sql
DELETE FROM analysis_records 
WHERE id = $1 AND user_id = $2;
```
*(Catatan: Karena tabel `analysis_waste_details` dan `analysis_plant_details` memiliki foreign key `ON DELETE CASCADE`, penghapusan pada `analysis_records` otomatis membersihkan data rincian terkait).*

---

## 3. Scope & Deliverables

1. **Server Load Function (`src/routes/dashboard/history/+page.server.ts`)**:
   - Memvalidasi session pengguna (`locals.user`).
   - Menerima query parameter: `type` (`all`, `waste`, `plant`), `search` (keyword pencarian), dan `page` (nomor halaman pagination).
   - Menjalankan parameterized raw SQL query via driver PostgreSQL.
   - Karena bucket Supabase Storage bersifat **Private**, server memanfaatkan helper `createSignedImageUrl(imagePath, 3600)` untuk menghasilkan **Signed URL (Temporary Token)** berdurasi 1 jam secara batch untuk setiap record riwayat yang akan dirender ke browser.
2. **Delete Action (`+page.server.ts` / API action)**:
   - Form action `deleteRecord` untuk menghapus baris riwayat milik pengguna.
   - Menghapus file gambar fisik di private bucket Supabase Storage menggunakan client service role agar tidak meninggalkan file yatim (*orphaned files*).
3. **Frontend UI Implementation (`src/routes/dashboard/history/+page.svelte`)**:
   - Mengadopsi tata letak dan komponen visual dari file referensi UI `DevReferences/Referensi UI/Reports.html`.
   - **Filter Tabs**: Tab pemilih "Semua Analisis", "Sampah (Waste)", dan "Tanaman (Plants)".
   - **Search Bar & Filter Tanggal**: Kolom input pencarian cepat untuk memfilter nama objek atau penyakit.
   - **History Cards / Data Grid**: Menampilkan thumbnail gambar, badge jenis analisis, nama objek terdeteksi, status kelayakan daur ulang/indikasi penyakit, dan waktu analisis.
   - **Detail Modal / Drawer**: Menampilkan seluruh data JSON rekomendasi AI (gejala visual, penyebab, tips daur ulang, perawatan, dan dampak lingkungan) saat salah satu kartu diklik.
   - **Pagination Controls**: Tombol *Previous* / *Next* dan indikator halaman aktif.
   - **Empty State**: Tampilan ilustrasi/pesan kosong yang rapi jika belum ada riwayat analisis.

---

## 4. Step-by-Step Implementation

1. **Database Access Layer (`src/lib/server/db/history.ts`)**:
   - Buat fungsi `getUserAnalysisHistory(userId, options: { type?, search?, limit?, offset? })`.
   - Buat fungsi `getUserHistorySummary(userId)`.
   - Buat fungsi `deleteAnalysisRecord(recordId, userId)`.
2. **Supabase Storage Private Image Resolver (`src/lib/server/storage.ts`)**:
   - Karena bucket berstatus **private**, tag `<img>` di browser tidak dapat langsung mengakses URL mentah.
   - Buat fungsi helper `createSignedImageUrl(imagePath: string, expiresIn: number = 3600): Promise<string>` menggunakan method `supabase.storage.from(bucket).createSignedUrl(imagePath, expiresIn)`.
   - Pada `+page.server.ts`, daftar item riwayat dipetakan melalui `Promise.all` untuk membubuhkan signed URL bertoken sementara ke dalam objek response yang dikirim ke frontend Svelte.
   - Buat fungsi `deleteStorageImage(imagePath: string)` untuk menghapus file fisik di private bucket ketika pengguna menghapus riwayat analisis.
3. **Server Load & Actions (`src/routes/dashboard/history/+page.server.ts`)**:
   - Pasang handler `load` yang membaca URL params (`url.searchParams`) dan memanggil fungsi database secara terisolasi.
   - Pasang form actions `delete` yang memeriksa kepemilikan data (`user_id = locals.user.id`) sebelum eksekusi penghapusan.
4. **Komponen Tampilan Frontend (`src/routes/dashboard/history/+page.svelte`)**:
   - Desain layout responsif berbasis Tailwind CSS mengacu pada `Reports.html`.
   - Implementasikan komponen kartu riwayat interaktif dengan modal popup untuk membaca rincian diagnosis lengkap.
   - Tambahkan konfirmasi modal sebelum aksi penghapusan dilakukan.

---

## 5. Verification & Acceptance Criteria
- [x] Pengguna hanya dapat melihat catatan analisis milik akun mereka sendiri (`user_id = locals.user.id`).
- [x] Thumbnail gambar dari Supabase Storage berhasil dimuat dengan benar pada kartu riwayat.
- [x] Filter tab berfungsi memisahkan riwayat analisis Sampah dan Tanaman.
- [x] Pencarian kata kunci berhasil memfilter riwayat berdasarkan nama tanaman/sampah secara responsif.
- [x] Mengklik salah satu riwayat membuka modal detail yang menyajikan seluruh rincian hasil AI (dampak, tips daur ulang, atau rekomendasi perawatan).
- [x] Fitur hapus riwayat berhasil menghapus record dari PostgreSQL dan memperbarui tampilan tanpa merusak data lain.
