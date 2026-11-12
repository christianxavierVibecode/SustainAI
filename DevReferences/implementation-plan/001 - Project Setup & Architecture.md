# Implementation Plan: 001 - Project Setup & Architecture

## Overview
Mempersiapkan fondasi aplikasi SustainAI menggunakan SvelteKit, Tailwind CSS, TypeScript, serta konfigurasi environment dan tooling pendukung lainnya agar siap untuk pengembangan fitur MVP.

## Scope & Deliverables
1. **Inisialisasi Project**:
   - Setup project SvelteKit (Skeleton project / TypeScript).
   - Setup Tailwind CSS & PostCSS untuk styling responsif.
   - Konfigurasi icon library (Lucide-svelte atau heroicons sesuai kebutuhan UI).
2. **Konfigurasi Environment**:
   - Pembuatan template `.env.example` dan `.env` yang memuat variabel kunci:
     - `DATABASE_URL`
     - `GEMINI_API_KEY_WASTE_ANALYZER`
     - `GEMINI_API_KEY_PLANT_ANALYZER`
     - `PUBLIC_APP_URL`
3. **Struktur Direktori**:
   - `src/lib/server/`: logic backend (koneksi database, AI client, authentication helper).
   - `src/lib/components/`: komponen UI reusable (Navbar, Sidebar, Button, Modal, Card, Input).
   - `src/routes/`: routing halaman aplikasi (Landing, Auth, Dashboard, 404).
   - `static/`: aset gambar publik, placeholder demo.
4. **Tooling & Code Quality**:
   - Konfigurasi Prettier, ESLint, dan TypeScript config.

## Step-by-Step Implementation
1. Inisialisasi template SvelteKit di root project.
2. Pasang dependencies inti:
   - Framework & UI: `tailwindcss`, `@tailwindcss/typography`, `postcss`, `autoprefixer`, `lucide-svelte`.
3. Atur konfigurasi `tailwind.config.js` dengan palet warna tema SustainAI (dominan emerald/green dan netral slate).
4. Buat layout root dasar (`src/routes/+layout.svelte` dan `src/routes/+layout.server.ts`).
5. Uji coba development server dengan menjalankan `npm run dev` untuk memastikan build berjalan normal pada `http://localhost:5173`.

## Verification & Acceptance Criteria
- [ ] Dev server SvelteKit dapat dijalankan tanpa error (`npm run dev`).
- [ ] Tailwind CSS terkompilasi dan styling berfungsi dengan baik di browser.
- [ ] Struktur folder dasar telah tertata rapi sesuai standar SvelteKit.
- [ ] Variabel environment telah didefinisikan di `.env.example` tanpa membocorkan secret asli.
