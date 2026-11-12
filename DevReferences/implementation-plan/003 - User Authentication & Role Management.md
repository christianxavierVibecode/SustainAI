# Implementation Plan: 003 - User Authentication & Role Management

## Overview

Mengimplementasikan modul autentikasi menyeluruh (Register, Verifikasi OTP Demo, Login, Logout) dan otorisasi berbasis Role (`user` vs `admin`) pada SustainAI menggunakan SvelteKit, database driver PostgreSQL murni, token JWT pada HTTP-only cookie, dan hashing `bcryptjs`.

## Technical Decisions (Mutlak)

1. **Penyimpanan Role**:
   - Memanfaatkan enum PostgreSQL `CREATE TYPE user_role_enum AS ENUM ('admin', 'user');` yang sudah didefinisikan pada `schema.sql`.
   - Kolom di tabel `users` adalah **`user_role user_role_enum NOT NULL DEFAULT 'user'`**.
2. **Session & Token Management**:
   - Token **JWT (JSON Web Token)** disimpan di **HTTP-only cookie** (`SameSite=Lax`, `Secure` pada production, `Path=/`).
   - Tidak memerlukan tabel `sessions` terpisah di database untuk menjaga arsitektur tetap ringan dan cepat.
3. **Password Security**:
   - Menggunakan library **`bcryptjs`** untuk hashing saat register dan komparasi password saat login.
4. **Alur Verifikasi OTP Demo**:
   - Kode OTP hardcode demo: `123456`.
   - Banner edukasi/notifikasi resmi pada UI verifikasi:
     > _"Untuk menjaga keamanan akun, SustainAI menggunakan verifikasi OTP yang dikirimkan ke email terdaftar. Namun, untuk keperluan Demo & Pengujian MVP, silakan gunakan kode verifikasi berikut: **123456**."_
   - Akun baru dibuat dengan `email_verified = false`, lalu setelah input OTP `123456` valid, status berubah menjadi `email_verified = true`.
5. **Akses Kontrol Berbasis Peran (RBAC)**:
   - **Role `user`**: Memiliki akses ke 5 sub-modul dashboard pengguna (`/dashboard/overview`, `/dashboard/waste`, `/dashboard/plant`, `/dashboard/history`, `/dashboard/setting`).
   - **Role `admin`**: Diarahkan khusus ke panel administrasi pengelolaan harga sampah (`/admin/waste-prices`) untuk menambah observasi harga ke tabel `waste_price`. Admin dibatasi dari analisis personal pengguna biasa.

## Scope & Deliverables

1. **Database Schema & Seeder Alignment**:
   - Memastikan aplikasi memanfaatkan kolom `user_role` dengan tipe enum `user_role_enum` pada tabel `users`.
   - Menyelaraskan script seeder agar akun demo memuat pengguna `user` (`christianxavier@genforces.com`) dan admin `admin` (`admin@genforces.com`) sesuai dengan `DevReferences/Database/database-seed.md`.
2. **Backend Authentication Layer**:
   - Helper JWT di `src/lib/server/auth.ts`: fungsi `signToken(payload)`, `verifyToken(token)`, dan penanganan cookie (payload menyertakan `id`, `email`, dan `user_role`).
   - Password hashing helper: fungsi `hashPassword(plain)` dan `comparePassword(plain, hashed)` via `bcryptjs`.
   - Global hooks di `src/hooks.server.ts`: membaca cookie auth pada setiap request, memvalidasi JWT, mengisi `event.locals.user` (termasuk atribut `user_role`), dan menerapkan route guard (redirect jika unauthenticated atau akses role tidak sesuai).
3. **Form Actions & API Endpoints**:
   - `/auth/register`: Form submit data (email, full_name, password). Kolom `user_role` otomatis diset `'user'`.
   - `/auth/verify-otp`: Validasi kode OTP (verifikasi kecocokan dengan `123456`), mengubah `email_verified = true`, lalu otomatis login atau redirect ke halaman login.
   - `/auth/login`: Verifikasi email, password hash, dan status verifikasi email. Menghasilkan JWT cookie dan mengarahkan pengguna sesuai nilai `user_role` (`user` -> `/dashboard`, `admin` -> `/admin`).
   - `/auth/logout`: Menghapus HTTP-only cookie dan me-redirect ke landing page/login.
4. **Frontend UI Components**:
   - Halaman Login responsif dengan form validasi dan alert error informatif.
   - Halaman Register responsif dengan indikator kekuatan input.
   - Halaman Verifikasi OTP yang menampilkan kode demo `123456` dan card banner informasi sesuai keputusan.

## Step-by-Step Implementation

1. **Dependencies**:
   - Pasang library: `npm install bcryptjs jsonwebtoken` serta TypeScript types `npm install -D @types/bcryptjs @types/jsonwebtoken`.
   - Tambahkan variabel rahasia `JWT_SECRET` pada `.env` dan `.env.example`.
2. **Database Queries Alignment**:
   - Buat fungsi query database raw via native driver di `src/lib/server/db/users.ts`:
     - `createUser(email, passwordHash, fullName)` (insert dengan default `user_role = 'user'`)
     - `findUserByEmail(email)` (mengambil kolom `id`, `email`, `password_hash`, `full_name`, `user_role`, `email_verified`)
     - `verifyUserEmail(userId)`
     - `updateUserProfile(userId, data)`
3. **Server Helpers**:
   - Buat `src/lib/server/auth.ts` untuk pembuatan JWT, verifikasi token, dan fungsi hash `bcryptjs`. Simpan `user_role` di dalam payload token JWT.
4. **Hooks & Routing Guards (`src/hooks.server.ts`)**:
   - Intersep setiap request: jika ada cookie auth, decode token dan pasang ke `event.locals.user`.
   - Lindungi route `/dashboard/*` khusus untuk pengguna terautentikasi dengan `user_role === 'user'`.
   - Lindungi route `/admin/*` khusus untuk pengguna dengan `user_role === 'admin'`.
   - Redirect pengguna yang sudah login jika mencoba membuka kembali `/auth/login` atau `/auth/register`.
5. **Implementasi Halaman & Form Actions**:
   - Buat route `src/routes/auth/register/+page.svelte` dan `+page.server.ts`.
   - Buat route `src/routes/auth/verify-otp/+page.svelte` dan `+page.server.ts` dengan banner OTP demo.
   - Buat route `src/routes/auth/login/+page.svelte` dan `+page.server.ts`.
   - Buat endpoint/action logout di `src/routes/auth/logout/+page.server.ts`.

## Verification & Acceptance Criteria

- [ ] Kolom `user_role` bertipe enum `user_role_enum` terbaca dan terisi dengan benar pada query database.
- [ ] User baru yang mendaftar via form register otomatis memiliki `user_role = 'user'`.
- [ ] Halaman verifikasi OTP menampilkan kode demo `123456` beserta banner informasi yang disempurnakan.
- [ ] Input kode `123456` berhasil memverifikasi akun (`email_verified = true`). Kode selain itu ditolak.
- [ ] Login menggunakan akun demo user mengarahkan ke dashboard pengguna (`/dashboard/overview`).
- [ ] Login menggunakan akun demo admin mengarahkan ke panel admin (`/admin`).
- [ ] Route guard di `hooks.server.ts` mencegah user biasa mengakses panel `/admin` dan mencegah admin mengakses modul dashboard user biasa (jika dipisahkan).
- [ ] Logout membersihkan session cookie dan membatalkan akses ke route terproteksi.
