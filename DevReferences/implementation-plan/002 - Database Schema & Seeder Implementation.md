# Implementation Plan: 002 - Database Schema & Seeder Implementation

## Overview
Menghubungkan aplikasi SvelteKit dengan basis data PostgreSQL menggunakan **database driver langsung (tanpa ORM)**, mengeksekusi DDL script dari `schema.sql` untuk membuat struktur tabel dan index, serta menjalankan script seeder data dummy dari `database-seed.md` menggunakan raw SQL queries.

## Scope & Deliverables
1. **Database Driver & Connection Pool**:
   - Memilih dan memasang native PostgreSQL driver murni (direkomendasikan driver modern dan performan untuk SvelteKit/Node: `postgres` dari Porsager atau `pg` / `node-postgres`).
   - Membuat connection pool singleton di `src/lib/server/db.ts` menggunakan connection string `DATABASE_URL`.
   - Menghindari penggunaan ORM (seperti Prisma, Drizzle, TypeORM, dll.) agar kontrol query raw SQL penuh dan beban runtime minimal.
2. **Eksekusi Schema Migration (Raw SQL DDL)**:
   - Membuat script migration/init database (`scripts/migrate.ts` atau `scripts/init-db.js`) yang membaca langsung file `DevReferences/Database/schema.sql` dan mengeksekusinya via driver.
   - Memastikan semua tabel, relasi foreign key, constraint, dan index terbentuk:
     - `users` (UUID v4, email, password_hash, full_name, email_verified, timestamp)
     - `waste_categories` & `waste_sub_categories`
     - `waste_price` (riwayat observasi harga)
     - `analysis_records` (tipe 'waste'/'plant', result JSONB, foreign key user)
     - `analysis_waste_details` & `analysis_plant_details`
     - GIN index untuk kolom `result` JSONB dan B-tree index pendukung lainnya.
3. **Database Seeder (Raw SQL DML)**:
   - Membuat script seeder (`scripts/seed.ts` atau `scripts/seed.js`) yang mengeksekusi parameterized query SQL murni (`INSERT INTO ... VALUES (...)`).
   - Menyuntikkan data dummy teruji dari `DevReferences/Database/database-seed.md`:
     - 2 Akun pengguna (termasuk demo user `christianxavier@genforces.com` dengan password hash).
     - 5 Kategori utama sampah dan 14 subkategori sampah.
     - 42 Record histori pergerakan harga sampah (`waste_price`) untuk mendukung grafik analitik fluktuasi harga.
     - Contoh data riwayat analisis pada `analysis_records`, `analysis_waste_details`, dan `analysis_plant_details`.
   - Menggunakan query yang aman (idempotent, misal `ON CONFLICT DO NOTHING`) agar seed bisa dijalankan ulang tanpa duplikasi error.

## Step-by-Step Implementation
1. Pasang dependency database driver PostgreSQL murni:
   - `npm install postgres` (atau `npm install pg` & `@types/pg`) serta `dotenv` (untuk runner script CLI).
2. Siapkan file singleton client database di `src/lib/server/db.ts` dengan ekspor pool client untuk dipakai oleh server routes/actions SvelteKit.
3. Siapkan script DDL `scripts/migrate.js` (atau `.ts`) yang membaca file `DevReferences/Database/schema.sql` menggunakan Node `fs.readFileSync` lalu mengeksekusinya langsung melalui driver.
4. Siapkan script DML `scripts/seed.js` (atau `.ts`) berisi data array terstruktur dari `database-seed.md` yang di-*insert* menggunakan parameterized raw query.
5. Daftarkan perintah praktis di `package.json`:
   - `"db:migrate": "node scripts/migrate.js"`
   - `"db:seed": "node scripts/seed.js"`
6. Uji coba eksekusi koneksi, migrasi tabel, dan seeding data secara lokal, lalu verifikasi hasil query via driver.

## Verification & Acceptance Criteria
- [ ] Tidak ada dependensi ORM yang dipasang di proyek; murni menggunakan database driver PostgreSQL.
- [ ] Koneksi database singleton terisolasi di sisi server (`src/lib/server/db.ts`) dan aman dari eksposur client.
- [ ] Script `npm run db:migrate` berhasil membuat 7 tabel utama dan seluruh index dari `schema.sql`.
- [ ] Script `npm run db:seed` berhasil mengeksekusi raw query insert untuk seluruh data dummy (akun demo, kategori/subkategori, 42 baris harga, dan catatan analisis).
- [ ] Query uji coba via driver berhasil mengambil data akun demo dan data harga sampah tanpa kendala.
