# Implementation Plan: 002 - Database Schema & Seeder Implementation

## Overview
Menghubungkan aplikasi SvelteKit dengan basis data PostgreSQL menggunakan **database driver langsung (tanpa ORM)** (`pg`), mengeksekusi DDL script dari `schema.sql` untuk membuat struktur tabel dan index, serta menjalankan script seeder data dummy dari `database-seed.md` menggunakan raw SQL queries.

## Scope & Deliverables
1. **Database Driver & Connection Pool**:
   - Memasang native PostgreSQL driver murni: `pg` dan `@types/pg`.
   - Membuat connection pool singleton di `src/lib/server/db.ts` menggunakan connection string `DATABASE_URL`.
   - Menerapkan kontrol query raw SQL penuh tanpa dependensi ORM (Prisma/Drizzle/TypeORM).
2. **Eksekusi Schema Migration (Raw SQL DDL)**:
   - Script migrasi `scripts/migrate.js` membaca file `DevReferences/Database/schema.sql` dan mengeksekusinya dalam satu transaksi atomik (`BEGIN ... COMMIT`).
   - Membuat enum `user_role_enum` serta 7 tabel utama dan seluruh index pendukung:
     - `users` (UUID v4, email, password_hash, full_name, user_role, email_verified, timestamp)
     - `waste_categories` & `waste_sub_categories`
     - `waste_price` (riwayat observasi harga)
     - `analysis_records` (tipe 'waste'/'plant', result JSONB, foreign key user)
     - `analysis_waste_details` & `analysis_plant_details`
     - GIN index untuk kolom `result` JSONB dan B-tree index pendukung lainnya.
3. **Database Seeder (Raw SQL DML)**:
   - Script seeder `scripts/seed.js` mengeksekusi parameterized query raw SQL idempotent:
     - 2 Akun pengguna (Demo User & Demo Admin).
     - 5 Kategori utama sampah dan 14 subkategori sampah.
     - 42 Record pergerakan harga sampah (`waste_price`) untuk visualisasi line chart.
     - Record riwayat analisis pada `analysis_records`, `analysis_waste_details`, dan `analysis_plant_details`.
4. **NPM Scripts Integration**:
   - `"db:migrate": "node scripts/migrate.js"`
   - `"db:seed": "node scripts/seed.js"`

## Step-by-Step Implementation
1. [x] Pasang dependensi driver `pg`, `@types/pg`, dan `dotenv`.
2. [x] Buat modul singleton `src/lib/server/db.ts` dengan ekspor `pool` dan fungsi `query(text, params)`.
3. [x] Buat script runner migrasi `scripts/migrate.js` untuk mengeksekusi `DevReferences/Database/schema.sql`.
4. [x] Buat script runner seeder `scripts/seed.js` untuk menginjeksi data terstruktur dari `DevReferences/Database/database-seed.md`.
5. [x] Daftarkan perintah script `"db:migrate"` dan `"db:seed"` pada `package.json`.
6. [x] Uji coba validasi script dan type-checking (`npm run check` -> 0 errors, 0 warnings).

## Verification & Acceptance Criteria
- [x] **Tanpa ORM**: Tidak ada ORM yang dipasang; murni menggunakan database driver native `pg` (`node-postgres`).
- [x] **Singleton Server-side Client**: Modul koneksi `src/lib/server/db.ts` terisolasi di sisi server dan siap digunakan oleh endpoints SvelteKit.
- [x] **Runner Script Migrasi & Seeder Siap Pakai**: Script `npm run db:migrate` dan `npm run db:seed` telah siap dieksekusi begitu kredensial `DATABASE_URL` PostgreSQL asli diisi di `.env`.
- [x] **Type Checking & Diagnostics**: `svelte-check` lulus 100% tanpa error maupun warning.
