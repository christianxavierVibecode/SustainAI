# Implementation Plan: 004 - Dashboard Overview & Analytics

## Overview
Mengimplementasikan halaman **Dashboard sub menu Overview** (`/dashboard/overview`) yang menampilkan metrik analitik personal pengguna, ringkasan 4 indikator utama, grafik garis tren fluktuasi harga sampah berdasarkan subkategori, serta grafik lingkaran (donut/pie) komposisi jenis sampah yang telah dianalisis. Seluruh data disajikan secara dinamis dari basis data PostgreSQL via native driver.

---

## Technical Breakdown: Pemetaan Data & Sumber Tabel

Berikut adalah rincian teknis kebutuhan data pada halaman Overview, formula agregasi, dan tabel PostgreSQL yang terlibat:

### 1. Empat Indikator Utama (Metric Summary Cards)
| Indikator | Sumber Tabel | Logika Query Raw SQL | Keterangan |
| :--- | :--- | :--- | :--- |
| **Total Analisis** | `analysis_records` | `COUNT(*) WHERE user_id = $1` | Menghitung seluruh catatan analisis (sampah + tanaman) milik pengguna yang sedang login. |
| **Sampah Dianalisis** | `analysis_records` | `COUNT(*) WHERE user_id = $1 AND analysis_type = 'waste'` | Jumlah spesifik analisis sampah yang dilakukan pengguna. |
| **Tanaman Dianalisis** | `analysis_records` | `COUNT(*) WHERE user_id = $1 AND analysis_type = 'plant'` | Jumlah spesifik analisis tanaman/penyakit yang dilakukan pengguna. |
| **Sampah Berpotensi Didaur Ulang** | `analysis_records` `JOIN analysis_waste_details` | `COUNT(*) WHERE ar.user_id = $1 AND ar.analysis_type = 'waste' AND awd.is_recyclable = TRUE` | Menghitung sampah hasil deteksi AI milik pengguna yang memiliki status `is_recyclable = true`. |

> *Optimasi Backend:* Keempat metrik ringkasan ini dapat dieksekusi dalam satu single query agregat menggunakan `FILTER (WHERE ...)` untuk efisiensi latensi database:
> ```sql
> SELECT 
>     COUNT(ar.id) AS total_analysis,
>     COUNT(ar.id) FILTER (WHERE ar.analysis_type = 'waste') AS total_waste,
>     COUNT(ar.id) FILTER (WHERE ar.analysis_type = 'plant') AS total_plant,
>     COUNT(ar.id) FILTER (WHERE ar.analysis_type = 'waste' AND awd.is_recyclable = TRUE) AS recyclable_waste
> FROM analysis_records ar
> LEFT JOIN analysis_waste_details awd ON ar.id = awd.analysis_id
> WHERE ar.user_id = $1 AND ar.status = 'completed';
> ```

---

### 2. Grafik Fluktuasi Harga Sampah Berdasarkan Jenis (Line Chart)
*Fungsi:* Menampilkan riwayat pergerakan harga komoditas sampah per subkategori sepanjang waktu untuk memberikan wawasan nilai ekonomi daur ulang kepada pengguna.

- **Sumber Tabel:** `waste_price` `JOIN waste_sub_categories` `JOIN waste_categories`
- **Data yang Diambil:**
  - `waste_sub_categories.name` (label nama jenis sampah, misal: *Kardus, PET, Besi, Minyak Jelantah*)
  - `waste_price.price` (nominal harga IDR)
  - `waste_price.created_at` (timestamp observasi harga)
- **Logika Query Raw SQL:**
  ```sql
  SELECT 
      wsc.name AS sub_category_name,
      wc.name AS category_name,
      wp.price,
      wp.created_at
  FROM waste_price wp
  JOIN waste_sub_categories wsc ON wp.waste_sub_category_id = wsc.id
  JOIN waste_categories wc ON wsc.category_id = wc.id
  ORDER BY wp.created_at ASC;
  ```
- **Transformasi Data (Server/Client):** Data dikelompokkan berdasarkan `sub_category_name` sebagai dataset garis series dengan sumbu X adalah tanggal (`created_at`) dan sumbu Y adalah nominal harga (`price`). Filter kategori (misal: Plastik, Kertas, Logam) dapat disediakan untuk kenyamanan interaksi pengguna.

---

### 3. Grafik Komposisi Jenis Sampah yang Dianalisis (Pie/Donut Chart)
*Fungsi:* Memvisualisasikan persentase sebaran kategori sampah yang telah dipindai oleh pengguna (atau dataset global jika pengguna baru belum memiliki riwayat analisis yang cukup).

- **Sumber Tabel:** `analysis_records` `JOIN analysis_waste_details` `LEFT JOIN waste_sub_categories` `LEFT JOIN waste_categories`
- **Data yang Diambil:**
  - Nama kelompok kategori (`waste_categories.name` atau fallback ke `awd.classification`)
  - Jumlah kemunculan (`COUNT(*)`)
- **Logika Query Raw SQL:**
  ```sql
  SELECT 
      COALESCE(wc.name, awd.classification, 'Lainnya') AS category_name,
      COUNT(awd.analysis_id) AS total_count
  FROM analysis_records ar
  JOIN analysis_waste_details awd ON ar.id = awd.analysis_id
  LEFT JOIN waste_sub_categories wsc ON awd.sub_category_id = wsc.id
  LEFT JOIN waste_categories wc ON wsc.category_id = wc.id
  WHERE ar.user_id = $1 AND ar.status = 'completed'
  GROUP BY category_name
  ORDER BY total_count DESC;
  ```
- **Fallback State:** Jika pengguna baru belum memiliki data analisis sampah, UI menyajikan state visual alternatif yang elegan atau memuat data representatif awal dari dataset sistem dengan keterangan informatif.

---

### 4. Daftar Aktivitas Terbaru (Recent Activity Feed / Mini Table)
- **Sumber Tabel:** `analysis_records`, `analysis_waste_details`, `analysis_plant_details`
- **Logika:** Mengambil 5 aktivitas analisis terakhir milik pengguna (`LIMIT 5 ORDER BY ar.created_at DESC`) untuk ditampilkan pada widget aktivitas terbaru di dashboard.

---

## Scope & Deliverables
1. **Dashboard Shared Layout & Navigation**:
   - Komponen Sidebar dan Header navigasi responsif yang menampung 5 menu pengguna: *Overview, Waste Analyzer, Plant Analyzer, Riwayat Saya, Setting*, serta opsi Logout.
   - Penanda rute aktif (*active route highlight*) pada menu sidebar.
2. **Server Data Loader (`+page.server.ts`)**:
   - Memvalidasi autentikasi via `locals.user` (redirect ke `/auth/login` jika belum login).
   - Menjalankan raw query SQL teroptimasi untuk mengambil ringkasan indikator, histori harga sampah, dan komposisi kategori sampah.
3. **Komponen Visualisasi Grafik**:
   - Mengintegrasikan library charting ringan & modern yang kompatibel dengan SvelteKit (misal: **Chart.js** via `svelte-chartjs` atau ApexCharts murni) untuk merender Line Chart dan Donut Chart.
4. **Halaman UI Overview (`+page.svelte`)**:
   - Grid 4 Metric Cards (Total Analisis, Sampah, Tanaman, Daur Ulang) lengkap dengan icon visual modern dan aksen warna bertema kelestarian lingkungan.
   - Sesi utama grafik fluktuasi harga sampah yang responsif dan interaktif.
   - Sesi grafik komposisi sampah berdampingan dengan daftar aktivitas terbaru.

---

## Step-by-Step Implementation

1. **Pasang Library Charting**:
   - Install pustaka chart ringan: `npm install chart.js` (atau paket helper terkait).
2. **Setup Dashboard Layout**:
   - Buat file layout `src/routes/dashboard/+layout.svelte` dan `+layout.server.ts` yang memuat struktur sidebar, header profil pengguna, dan container konten utama.
3. **Data Access Queries (`src/lib/server/db/dashboard.ts`)**:
   - Tulis modul fungsi raw SQL native:
     - `getDashboardOverviewStats(userId: string)`
     - `getWastePriceTrends()`
     - `getWasteCompositionStats(userId: string)`
     - `getRecentActivities(userId: string, limit?: number)`
4. **Server Page Load (`src/routes/dashboard/overview/+page.server.ts`)**:
   - Panggil fungsi database di atas secara paralel menggunakan `Promise.all` demi performa response time terbaik.
   - Return data bersih ke frontend.
5. **Frontend View Implementation (`src/routes/dashboard/overview/+page.svelte`)**:
   - Terapkan layout kartu metrik menggunakan styling Tailwind CSS yang serasi dengan referensi UI (`DevReferences/Referensi UI/Dashboard.html`).
   - Buat komponen `PriceTrendChart.svelte` untuk visualisasi diagram garis tren fluktuasi harga.
   - Buat komponen `WasteCompositionChart.svelte` untuk visualisasi diagram donut komposisi sampah.
   - Tambahkan state kosong (*empty state*) yang informatif bagi pengguna baru.

---

## Verification & Acceptance Criteria
- [ ] Rute `/dashboard/overview` terproteksi dan hanya dapat diakses pengguna terautentikasi.
- [ ] 4 Kartu metrik menampilkan angka akurat hasil agregasi query database `analysis_records` dan `analysis_waste_details`.
- [ ] Grafik fluktuasi harga berhasil merender seluruh 42 titik data histori harga dari tabel `waste_price` secara kronologis.
- [ ] Grafik komposisi kategori sampah menampilkan proporsi persentase yang sesuai dengan record analisis sampah pengguna.
- [ ] Desain antarmuka responsif di layar mobile maupun desktop serta konsisten dengan tema desain SustainAI.
