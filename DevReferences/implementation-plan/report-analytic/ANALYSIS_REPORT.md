# 📊 Laporan Analisis Arsitektur & AI Integration — SustainAI Analyzer

> **Dibuat:** 2026-11-12  
> **Analis:** Antigravity AI (Google DeepMind)  
> **Referensi Dokumentasi:** [`ARCHITECTURE.md`](./ARCHITECTURE.md) · [`README.md`](../../../xampp/htdocs/project/hackaton/sustainAI/README.md) · [Gemini API Docs](https://ai.google.dev/gemini-api/docs/image-understanding)

---

## 1. Konteks Proyek

**SustainAI** adalah aplikasi web berbasis AI yang berfokus pada keberlanjutan lingkungan, selaras dengan UN Sustainable Development Goals (SDGs). Aplikasi ini menyediakan tiga modul analisis utama:

| Modul | Fungsi | Jenis File Input |
|---|---|---|
| **Waste Analyzer** | Klasifikasi dan analisis sampah | Gambar (PNG/JPG, maks 5MB) |
| **Plant Disease Analyzer** | Deteksi penyakit/hama tanaman | Gambar (PNG/JPG, maks 5MB) |
| **CV Analyzer** | Penilaian dan rekomendasi CV | Dokumen PDF (maks 10MB) |

---

## 2. Temuan: Dua Proyek Berbeda

Selama analisis ditemukan bahwa terdapat **dua proyek SustainAI yang berbeda** namun berkaitan:

| Aspek | Proyek ini (`ARCHITECTURE.md`) | Proyek SvelteKit (`README.md`) |
|---|---|---|
| **Framework** | Next.js 16 / React 19 | SvelteKit / Svelte |
| **Bahasa** | TypeScript | TypeScript/Svelte |
| **Database** | Tidak ada (stateless) | PostgreSQL |
| **Autentikasi** | Tidak ada | Login/Register |
| **Riwayat Analisis** | Tidak ada | ✅ Disimpan di DB |
| **Dashboard** | Tidak ada | ✅ 5 halaman |
| **Lokasi** | `SustainAi_Analyzer_App-main/` | `xampp/htdocs/.../sustainAI/` |

> Proyek Next.js ini merupakan versi **MVP frontend-only**, sementara proyek SvelteKit adalah versi **full-stack** dengan fitur lebih lengkap. Keduanya menggunakan Gemini API sebagai engine AI-nya.

---

## 3. Arsitektur Aplikasi (Proyek Next.js)

### 3.1 Layer Arsitektur

```
Presentation Layer (React Components)
        ↓
State Management Layer (Context API + Hooks)
        ↓
Utility Layer (lib/ — i18n, helpers)
        ↓
Route Layer (Next.js App Router)
        ↓
API Layer (app/api/ — Route Handlers)
        ↓
External AI Service (Gemini API)
```

### 3.2 Struktur Direktori Utama

```
SustainAi_Analyzer_App/
├── app/
│   ├── api/
│   │   ├── analyze-cv/route.tsx       ← CV Analyzer endpoint
│   │   ├── analyze-plant/route.tsx    ← Plant Disease endpoint
│   │   └── analyze-waste/route.tsx    ← Waste Analyzer endpoint
│   ├── CV-Analyzer/
│   ├── Plant-Disease-Analyzer/
│   ├── Waste-Analyzer/
│   └── layout.tsx
├── components/
│   ├── ui/                            ← Radix UI base components
│   └── ...                            ← Feature sections
├── lib/
│   ├── language-context.tsx           ← i18n Context
│   └── translations.ts                ← EN/ID dictionary
└── hooks/
    └── use-in-view.ts                 ← Scroll animation hook
```

### 3.3 Tech Stack

| Teknologi | Versi | Peran |
|---|---|---|
| Next.js | 16 | Full-stack framework |
| React | 19 | UI library |
| TypeScript | 5 | Type safety |
| Tailwind CSS | 4 | Styling |
| Radix UI | — | Accessible components |
| React Hook Form + Zod | — | Form validation |
| Vercel Analytics | — | Usage tracking |
| Gemini API | v1beta | AI engine |

---

## 4. Data Flow Analisis (End-to-End)

### 4.1 Alur Lengkap Request Analisis

```
User membuka halaman analyzer (Waste/Plant/CV)
        ↓
Upload file via form input (drag & drop / file picker)
        ↓
Client-side: preview & validasi awal
        ↓
Submit → POST FormData ke Next.js API route
  - FormData berisi: file (binary) + language ("en"/"id")
        ↓
Server-side API Route:
  1. Validasi MIME type (PNG/JPG atau PDF)
  2. Validasi ukuran file (5MB atau 10MB)
  3. Konversi: file.arrayBuffer() → Buffer → Base64
  4. Pilih prompt: PROMPT_EN atau PROMPT_ID
        ↓
Kirim ke Gemini API (generativelanguage.googleapis.com)
  - Method: POST
  - Format: JSON dengan inline_data (Base64)
  - Model: gemini-3-flash-preview
        ↓
Gemini memproses input multimodal (teks + gambar/PDF)
  → Mengembalikan teks JSON terstruktur
        ↓
Server: JSON.parse(rawText) → validasi struktur
        ↓
NextResponse.json(parsed) → dikirim ke frontend
        ↓
Frontend merender hasil analisis ke user
```

---

## 5. Analisis Teknis: Pendekatan Pengiriman File ke Gemini API

### 5.1 Metode yang Digunakan: **Inline Base64 (`inline_data`)**

Ketiga API route menggunakan pendekatan yang seragam:

```typescript
// Langkah encoding — sama di semua route
const buffer = Buffer.from(await file.arrayBuffer());
const base64File = buffer.toString("base64");

// Payload ke Gemini API
{
  contents: [{
    parts: [
      { text: prompt },              // ← Hardcoded prompt teks
      {
        inline_data: {
          mime_type: file.type,      // ← MIME type file
          data: base64File           // ← Base64 encoded file
        }
      }
    ]
  }]
}
```

### 5.2 Pola Prompt

Setiap modul memiliki **prompt hardcoded** di server yang:
- Ditulis dalam **dua bahasa** (Inggris dan Indonesia)
- Dipilih berdasarkan parameter `language` dari FormData
- Menginstruksikan Gemini untuk **selalu merespons dalam format JSON murni**
- Mendefinisikan **skema JSON output** secara eksplisit

---

## 6. Perbandingan Tiga Pendekatan Image Input ke Gemini API

Berdasarkan dokumentasi resmi [Gemini API — Image Understanding](https://ai.google.dev/gemini-api/docs/image-understanding):

### 6.1 ① Inline Data — Base64 *(digunakan SustainAI)*

**Cara kerja:** File dibaca sebagai binary → di-encode ke Base64 → disematkan langsung di JSON request body.

| | |
|---|---|
| ✅ **Kelebihan** | Sederhana, stateless, tidak butuh server storage, privasi terjaga, implementasi minimal |
| ❌ **Kekurangan** | Payload membengkak ~33% (overhead Base64), tidak efisien untuk file besar, tidak bisa reuse |
| 📏 **Batas ukuran** | ~20MB total request |

---

### 6.2 ② Passing via URL — `file_data` dengan URL publik

**Cara kerja:** Hanya URL gambar yang dikirim ke Gemini. Gemini menarik gambar sendiri dari URL tersebut.

| | |
|---|---|
| ✅ **Kelebihan** | Payload request sangat ringan, hemat bandwidth server, cocok jika gambar sudah di CDN |
| ❌ **Kekurangan** | Gambar HARUS publicly accessible, tidak cocok untuk file upload langsung dari user, privasi lemah |
| 📏 **Batas ukuran** | Tergantung server sumber gambar |

---

### 6.3 ③ File API Upload — `fileData` via Google File API

**Cara kerja:** File di-upload terlebih dahulu ke Google server → mendapat `file_uri` → URI dipakai di `generateContent` tanpa kirim ulang data.

| | |
|---|---|
| ✅ **Kelebihan** | Kapasitas besar (hingga 2 GB), payload `generateContent` ringan, efisien untuk multi-prompt pada file yang sama |
| ❌ **Kekurangan** | Dua tahap request (upload + query), perlu manajemen `file_uri`, file dihapus otomatis setelah 48 jam |
| 📏 **Batas ukuran** | 2 GB per file, total 20 GB per project |

---

### 6.4 Tabel Perbandingan

| Aspek | ① Inline Base64 | ② URL | ③ File API |
|---|:---:|:---:|:---:|
| Max ukuran file | ~20MB | ~20MB | **2 GB** |
| Overhead payload | +33% | Sangat kecil | Sangat kecil |
| File harus publik? | Tidak | **Ya** | Tidak |
| Butuh upload terpisah? | Tidak | Tidak | **Ya** |
| Bisa reuse? | Tidak | Ya (URL persisten) | Ya (48 jam) |
| Butuh state management? | Tidak | Tidak | **Ya** |
| Kompleksitas implementasi | Rendah | Rendah | Moderat |
| Cocok untuk stateless API? | **Ya** | Ya | Tidak ideal |

---

## 7. Rekomendasi & Kesimpulan

### 7.1 Pendekatan Saat Ini: Sudah Tepat ✅

Penggunaan **Inline Base64** pada proyek ini sudah merupakan pilihan yang **paling tepat** untuk kondisi saat ini, dengan pertimbangan:

1. **Ukuran file kecil** — Batas 5MB (gambar) dan 10MB (PDF) jauh di bawah limit 20MB
2. **Arsitektur stateless** — Tidak ada database untuk menyimpan `file_uri` atau session
3. **File dari user upload** — Tidak ada URL publik yang bisa direferensikan langsung
4. **Single-use analysis** — Satu request = satu analisis = tidak perlu reuse file
5. **Privasi user** — File tidak disimpan di server manapun, langsung diproses

### 7.2 Kapan Perlu Beralih Pendekatan?

| Kondisi | Rekomendasi |
|---|---|
| Mendukung video atau gambar resolusi sangat tinggi (>20MB) | Migrasi ke **File API** |
| Gambar user disimpan ke cloud storage (Supabase/S3/GCS) | Pertimbangkan **URL approach** |
| Satu gambar dianalisis dengan banyak prompt berbeda | Migrasi ke **File API** |
| Skala pengguna sangat besar, butuh efisiensi bandwidth | Evaluasi **File API** |
| File tetap di bawah 20MB dan satu kali pakai | Tetap **Inline Base64** |

### 7.3 Potensi Peningkatan Arsitektur

Jika proyek berkembang ke arah **full-stack** (seperti versi SvelteKit), beberapa area yang bisa ditingkatkan:

- **Database** — Simpan riwayat analisis (PostgreSQL/Supabase)
- **Autentikasi** — NextAuth untuk manajemen user
- **Cloud Storage** — Supabase Storage/AWS S3 untuk menyimpan gambar (membuka opsi URL approach ke Gemini)
- **Caching** — SWR atau React Query untuk mencegah re-analisis file yang sama
- **Error Handling** — Retry logic jika Gemini API timeout atau respons tidak valid

---

## 8. Ringkasan Eksekutif

> SustainAI Analyzer adalah aplikasi web Next.js yang mengintegrasikan Gemini API untuk analisis multimodal (gambar dan dokumen). Arsitekturnya modular dengan pemisahan concern yang jelas antara UI, state management, dan API layer.
>
> Untuk pengiriman file ke Gemini, aplikasi menggunakan pendekatan **Inline Base64 (`inline_data`)** — gambar/PDF di-encode ke Base64 di server, lalu dikirim bersamaan dengan **hardcoded prompt** dalam satu JSON request body. Pendekatan ini dipilih dengan tepat mengingat batasan file yang kecil (5-10MB), arsitektur stateless tanpa database, dan kebutuhan single-use analysis per request.
>
> Dibandingkan dua alternatif lain (URL dan File API), Inline Base64 paling cocok untuk kondisi proyek saat ini. Migrasi ke File API baru relevan jika aplikasi berkembang untuk mendukung file berukuran besar atau analisis multi-prompt pada file yang sama.

---

*Laporan ini dibuat berdasarkan analisis kode sumber di `app/api/`, dokumentasi `ARCHITECTURE.md`, `README.md`, dan referensi dokumentasi resmi Gemini API.*
