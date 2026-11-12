# Implementation Plan: 002 - Database Schema & Seeder Implementation

## Overview
Menghubungkan aplikasi SvelteKit dengan basis data PostgreSQL, menerapkan struktur tabel sesuai rancangan `schema.sql`, serta mengeksekusi seed data dummy dari `database-seed.md` untuk kebutuhan demonstrasi MVP.

## Scope & Deliverables
1. **Database Client & Konfigurasi**:
   - Integrasi database driver/ORM PostgreSQL (misal: `postgres` / `pg` connection pool atau Drizzle/Prisma sesuai preferensi stack SvelteKit).
   - Singleton client database di `src/lib/server/db.ts` dengan memanfaatkan connection string `DATABASE_URL`.
2. **Eksekusi Migration & Schema**:
   - Membuat dan mengeksekusi DDL script sesuai `DevReferences/Database/schema.sql`:
     - `users` (UUID v4, email, password_hash, full_name, email_verified, timestamp)
     - `waste_categories` & `waste_sub_categories`
     - `waste_price` (riwayat pergerakan harga tanpa overwrite)
     - `analysis_records` (induk analisis, JSONB result, foreign key user)
     - `analysis_waste_details` & `analysis_plant_details`
     - Index pendukung: `idx_analysis_user_date`, `idx_analysis_type_date`, `idx_analysis_result_gin`, dll.
3. **Database Seeder**:
   - Membuat script seeder (`scripts/seed.ts` atau script runnable `npm run db:seed`).
   - Menyuntikkan data dummy teruji dari `DevReferences/Database/database-seed.md`:
     - 2 Akun pengguna (termasuk demo user `christianxavier@genforces.com` dengan password hash bcrypt).
     - 5 Kategori utama sampah dan 14 subkategori sampah.
     - 42 Record histori pergerakan harga sampah (`waste_price`) untuk mendukung chart fluktuasi harga.
     - Record contoh `analysis_records`, `analysis_waste_details`, dan `analysis_plant_details`.

## Step-by-Step Implementation
1. Pasang dependency database client (misal `pg` beserta `@types/pg` atau `postgres`) dan helper hash password `bcryptjs`.
2. Buat koneksi pool database terisolasi di `src/lib/server/db.ts` dengan penanganan error koneksi yang jelas.
3. Siapkan script migrasi/init DDL yang membaca atau mengeksekusi instruksi dari `schema.sql`.
4. Siapkan script seeder yang mengonversi data Markdown tabel `database-seed.md` menjadi query INSERT idempotent (menggunakan `ON CONFLICT DO NOTHING` atau reset aman).
5. Tambahkan shortcut script pada `package.json` (misalnya: `"db:init"` dan `"db:seed"`).
6. Uji koneksi dan query dasar dari aplikasi SvelteKit untuk memastikan relasi antar tabel valid.

## Verification & Acceptance Criteria
- [ ] Koneksi ke PostgreSQL berhasil dilakukan tanpa kebocoran credential.
- [ ] Seluruh 7 tabel utama dan indeks berhasil terbuat sesuai `schema.sql`.
- [ ] Script seeder berhasil dijalankan tanpa error.
- [ ] Akun demo dapat ditemukan di tabel `users` dengan hash password yang valid.
- [ ] Data relasi kategori, subkategori, dan histori harga 42 record terisi lengkap.
