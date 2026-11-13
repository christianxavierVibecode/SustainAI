# Implementation Plan: 007 - Account Settings Sub Menu

## 1. Overview
Mengimplementasikan halaman **Dashboard sub menu Setting (Pengaturan Akun)** pada route `/dashboard/setting`. Halaman ini memungkinkan pengguna memperbarui informasi profil akun mereka (Nama Lengkap, Foto Profil/Avatar) dan memperbarui kata sandi (Change Password) dengan validasi keamanan berbasis PostgreSQL via native driver dan SvelteKit form actions.

---

## 2. Kebutuhan Data & Query Database (Raw SQL)

Operasi pada sub menu Setting berpusat pada tabel `users`.

### A. Query Profil Pengguna (Load Data)
```sql
SELECT 
    id,
    email,
    full_name,
    user_role,
    email_verified,
    created_at,
    updated_at
FROM users
WHERE id = $1;
```

### B. Query Update Profil Pengguna
```sql
UPDATE users
SET 
    full_name = $1,
    updated_at = NOW()
WHERE id = $2;
```

### C. Query Verifikasi & Ganti Password
1. **Ambil Password Hash Saat Ini:**
   ```sql
   SELECT password_hash FROM users WHERE id = $1;
   ```
2. **Update Password Baru (setelah verifikasi bcrypt dan validasi format):**
   ```sql
   UPDATE users
   SET 
       password_hash = $1,
       updated_at = NOW()
   WHERE id = $2;
   ```

---

## 3. Scope & Deliverables

1. **Server Load & Form Actions (`src/routes/dashboard/setting/+page.server.ts`)**:
   - `load`: Mengambil data profil terbaru dari pengguna terautentikasi (`locals.user.id`).
   - `action: updateProfile`:
     - Memvalidasi input `full_name` (panjang karakter, sanitasi).
     - Mengeksekusi query raw SQL update tabel `users`.
     - Mengembalikan pesan feedback sukses/gagal.
   - `action: updatePassword`:
     - Memvalidasi password saat ini (*current password*) menggunakan `bcryptjs.compare`.
     - Memvalidasi kekuatan password baru (minimal 8 karakter, konfirmasi password cocok).
     - Menghindari penggunaan password baru yang sama persis dengan password lama.
     - Melakukan hash password baru via `bcryptjs.hash` dan menyimpannya ke database.
2. **Frontend UI Components (`src/routes/dashboard/setting/+page.svelte`)**:
   - Mengadopsi tata letak modern dan styling responsif dari file referensi UI `DevReferences/Referensi UI/Setting.html`.
   - **Section 1 - Informasi Akun / Profil:**
     - Avatar preview / inisial pengguna dengan badge role (`user` / `admin`).
     - Input field Nama Lengkap (`full_name`) yang dapat diedit.
     - Input field Email (`email`) dengan status badge "Terverifikasi" (readonly untuk menjaga integritas login).
     - Tanggal bergabung akun (`created_at`).
     - Tombol "Simpan Perubahan Profil" dengan feedback status loading.
   - **Section 2 - Keamanan & Ganti Password:**
     - Input Password Saat Ini (*Current Password*).
     - Input Password Baru (*New Password*) dengan indikator visibilitas (toggle show/hide password).
     - Input Konfirmasi Password Baru (*Confirm New Password*).
     - Tombol "Perbarui Password".
   - **Alert & Toast Notification**: Feedback visual yang jelas saat profil atau password berhasil/gagal diperbarui.

---

## 4. Step-by-Step Implementation

1. **Database Access Layer (`src/lib/server/db/users.ts`)**:
   - Tambahkan fungsi raw SQL:
     - `getUserProfileById(userId: string)`
     - `updateUserProfile(userId: string, fullName: string)`
     - `updateUserPassword(userId: string, newHashedPassword: string)`
2. **Server Actions Implementation (`src/routes/dashboard/setting/+page.server.ts`)**:
   - Proteksi route: pastikan `locals.user` valid, redirect ke `/auth/login` jika tidak terautentikasi.
   - Buat action `updateProfile` dengan validasi schema input sederhana.
   - Buat action `updatePassword` lengkap dengan komparasi `bcryptjs` dan penanganan error yang aman (tidak membocorkan detail sensitif).
3. **Frontend UI Design (`src/routes/dashboard/setting/+page.svelte`)**:
   - Susun komponen card terpisah (Profile Card & Security Card) mengacu pada referensi UI `Setting.html`.
   - Gunakan progressive enhancement SvelteKit (`use:enhance`) agar submit form berjalan mulus tanpa reload halaman penuh.
   - Tambahkan validasi sisi klien (konfirmasi password cocok sebelum form dikirim).

---

## 5. Verification & Acceptance Criteria
- [x] Pengguna yang membuka `/dashboard/setting` dapat melihat data nama dan email mereka secara akurat.
- [x] Pengguna dapat memperbarui nama lengkap, dan data langsung ter-update di basis data PostgreSQL (`updated_at` terbarui).
- [x] Input password saat ini yang salah ditolak dengan pesan error yang jelas dan ramah pengguna.
- [x] Password baru berhasil di-hash dengan aman menggunakan `bcryptjs` dan disimpan ke database.
- [x] Setelah password berhasil diubah, pengguna dapat login kembali menggunakan kredensial baru tersebut.
- [x] Antarmuka responsif dan konsisten dengan komponen desain tema SustainAI.
