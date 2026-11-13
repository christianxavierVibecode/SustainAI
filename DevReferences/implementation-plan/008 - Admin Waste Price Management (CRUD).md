# Implementation Plan: 008 - Admin Waste Price Management (CRUD)

## 1. Overview
Rencana implementasi ini mengatur pembuatan modul **Manajemen Harga Sampah (CRUD Waste Price)** pada route `/admin`. Modul ini dirancang khusus untuk pengguna dengan hak akses **Administrator (`user_role = 'admin'`)** guna mengelola, memperbarui, menambah, dan menghapus data observasi harga acuan sampah pada tabel `waste_price`, yang menjadi basis data analisis ekonomi sirkular dan grafik tren di platform SustainAI.

---

## 2. Kebutuhan Data & Query Database (Raw SQL)

Modul ini berinteraksi dengan tiga tabel terkait: `waste_price`, `waste_sub_categories`, dan `waste_categories`.

### A. List Data & Filter (Read / Query)
```sql
SELECT 
    wp.id,
    wp.waste_sub_category_id,
    wsc.name AS sub_category_name,
    wc.id AS category_id,
    wc.name AS category_name,
    wp.price,
    wp.created_at
FROM waste_price wp
JOIN waste_sub_categories wsc ON wp.waste_sub_category_id = wsc.id
JOIN waste_categories wc ON wsc.category_id = wc.id
WHERE 
    ($1::bigint IS NULL OR wc.id = $1)
    AND ($2::text IS NULL OR wsc.name ILIKE '%' || $2 || '%')
ORDER BY wp.created_at DESC, wp.id DESC
LIMIT $3 OFFSET $4;
```

### B. List Dropdown Kategori & Subkategori (Options Helper)
```sql
SELECT 
    wsc.id AS sub_category_id,
    wsc.name AS sub_category_name,
    wc.id AS category_id,
    wc.name AS category_name
FROM waste_sub_categories wsc
JOIN waste_categories wc ON wsc.category_id = wc.id
ORDER BY wc.name ASC, wsc.name ASC;
```

### C. Tambah Data Baru (Create)
```sql
INSERT INTO waste_price (waste_sub_category_id, price, created_at)
VALUES ($1, $2, COALESCE($3, NOW()))
RETURNING id, waste_sub_category_id, price, created_at;
```

### D. Perbarui Data (Update)
```sql
UPDATE waste_price
SET 
    waste_sub_category_id = $1,
    price = $2,
    created_at = $3
WHERE id = $4
RETURNING id, waste_sub_category_id, price, created_at;
```

### E. Hapus Data (Delete)
```sql
DELETE FROM waste_price
WHERE id = $1;
```

---

## 3. Scope & Arsitektur

### 1. Database Access Layer (`src/lib/server/db/wastePrice.ts`)
- `getWastePriceList(options: { categoryId?, search?, limit?, offset? })`: Mengambil data tabel dengan paginasi, pencarian nama subkategori, dan filter kategori utama.
- `countWastePrices(options: { categoryId?, search? })`: Menghitung total data untuk keperluan paginasi.
- `getWasteSubCategoryOptions()`: Mengambil opsi relasi kategori & subkategori untuk dropdown formulir.
- `createWastePrice(data: { subCategoryId: number, price: number, createdAt?: string })`: Menambah observasi harga baru.
- `updateWastePrice(id: number, data: { subCategoryId: number, price: number, createdAt: string })`: Memperbarui data harga.
- `deleteWastePrice(id: number)`: Menghapus data harga berdasarkan primary key `id`.

### 2. Server Load & Form Actions (`src/routes/admin/+page.server.ts`)
- **Route Guard**: Memastikan pengguna login dan memiliki `user_role === 'admin'`. Jika bukan admin, redirect ke `/get-started` atau `/dashboard/overview`.
- **`load` Handler**:
  - Membaca URL query params (`page`, `search`, `category`).
  - Memuat daftar harga terpaginasi (10 item per halaman).
  - Memuat opsi dropdown kategori/subkategori.
  - Menghitung ringkasan statistik (total record, rerata harga, komoditas tertinggi).
- **Form Actions**:
  - `action: create`: Validasi `waste_sub_category_id` (harus valid ID), `price` (angka positif >= 0), dan `created_at` opsional.
  - `action: update`: Validasi `id`, `waste_sub_category_id`, `price`, dan `created_at`.
  - `action: delete`: Validasi `id` dan eksekusi penghapusan.

### 3. Frontend UI (`src/routes/admin/+page.svelte`)
- Mengusung tema desain modern SustainAI (Tailwind CSS, Plus Jakarta Sans, dan Material Symbols Outlined).
- **Stat Cards**:
  - Total Data Observasi Harga.
  - Jumlah Subkategori Terdaftar.
  - Rata-rata Harga Pasar.
- **Toolbar & Filter**:
  - Input pencarian responsif berdasarkan nama sampah.
  - Dropdown filter kategori utama (Plastik, Kertas, Logam, Kaca, Khusus).
  - Tombol aksi "+ Tambah Observasi Harga" yang membuka modal input.
- **Tabel Data Responsif**:
  - Kolom: ID, Tanggal Observasi, Kategori Utama, Subkategori Komoditas, Nominal Harga (Rp/kg), dan Aksi (Edit & Hapus).
  - Paginasi interaktif (Next / Prev / Page Numbers).
- **Modal Komponen**:
  - **Modal Create/Edit**: Formulir input dengan dropdown subkategori terkelompok (*grouped by category*), input nominal harga (format angka), tanggal observasi, dan tombol submit dengan status loading.
  - **Modal Konfirmasi Hapus**: Dialog konfirmasi peringatan sebelum data dihapus secara permanen dari PostgreSQL.

---

## 4. Step-by-Step Implementation

1. **Membuat Data Layer `src/lib/server/db/wastePrice.ts`**:
   - Tulis fungsi-fungsi raw SQL query yang aman dari SQL Injection (menggunakan parameterized queries `$1, $2, ...`).
2. **Implementasi Server Actions & Load di `src/routes/admin/+page.server.ts`**:
   - Pasang autentikasi ketat `locals.user?.user_role === 'admin'`.
   - Implementasikan action `create`, `update`, dan `delete` lengkap dengan pesan error/feedback yang ramah pengguna.
3. **Mengembangkan Antarmuka Admin di `src/routes/admin/+page.svelte`**:
   - Rancang antarmuka tabel data elegan, modal interaktif form add/edit, dan dialog konfirmasi delete.
   - Sambungkan progressive enhancement `use:enhance` agar form submit bekerja tanpa kedip/reload halaman.
4. **Verifikasi & Acceptance Test**:
   - Jalankan `npm run check` untuk memverifikasi 0 kesalahan tipe data TypeScript/Svelte.
   - Jalankan `npm run build` untuk memastikan kompilasi adapter produksi sukses.
   - Uji skenario: Tambah harga baru -> Lihat di tabel -> Edit harga -> Hapus harga -> Cek integritas pada grafik tren di dashboard.

---

## 5. Verification & Acceptance Criteria
- [ ] Hanya pengguna dengan `user_role = 'admin'` yang dapat mengakses rute `/admin` dan menjalankan aksi CRUD.
- [ ] Pengguna biasa (`user_role = 'user'`) atau pengunjung tanpa autentikasi otomatis ditolak dan diarahkan ke rute yang sesuai.
- [ ] Admin dapat melihat daftar observasi harga terpaginasi lengkap dengan relasi nama kategori dan subkategori.
- [ ] Admin dapat memfilter data berdasarkan kategori dan mencari berdasarkan nama komoditas.
- [ ] Admin berhasil menambahkan data harga baru ke tabel `waste_price`.
- [ ] Admin berhasil mengedit harga maupun tanggal observasi dari record yang dipilih.
- [ ] Admin berhasil menghapus record harga dengan konfirmasi yang aman.
- [ ] Form action memiliki penanganan validasi input yang kuat (nominal harga tidak boleh negatif/kosong, subkategori harus valid).
- [ ] Seluruh perubahan data langsung tercermin pada basis data PostgreSQL dan grafik tren harga di dashboard pengguna.
