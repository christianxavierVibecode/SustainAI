<div align="center">

<!-- Ganti dengan logo aplikasi -->
<img src="https://placehold.co/180x180/16a34a/ffffff?text=SustainAI" alt="SustainAI Logo" width="180">

# 🌿 SustainAI

### AI-Powered Waste & Plant Analyzer

**From Recognition to Sustainable Action**

Platform asisten keberlanjutan berbasis AI untuk membantu masyarakat mengenali sampah, memahami indikasi penyakit tanaman, dan mengambil tindakan yang lebih ramah lingkungan.

<!-- PLACEHOLDER DEMO APLIKASI: ganti DEMO_URL dengan URL demo -->

<a href="DEMO_URL"><img src="https://placehold.co/960x540/14532d/ffffff?text=SustainAI+Application+Demo" alt="SustainAI Demo" width="90%"></a>

<p>
<a href="DEMO_URL">🌐 Live Demo</a> ·
<a href="#-tampilan-aplikasi">🖼️ Application Preview</a> ·
<a href="#-instalasi-dan-konfigurasi">🛠️ Installation</a>
</p>

![Category](https://img.shields.io/badge/Category-Web%20Application-2563eb?style=for-the-badge)
![AI](https://img.shields.io/badge/AI-Gemini-16a34a?style=for-the-badge)
![Framework](https://img.shields.io/badge/Framework-SvelteKit-ff3e00?style=for-the-badge)

</div>

---

## 📌 Tentang Proyek

**SustainAI** adalah aplikasi web yang memanfaatkan AI multimodal untuk menganalisis gambar sampah dan tanaman yang menunjukkan gejala gangguan. Hasil analisis disajikan secara terstruktur agar pengguna memahami objek dan memperoleh rekomendasi tindakan.

SustainAI memiliki dua modul:

- **Waste Analyzer** — mengenali dan mengklasifikasikan sampah, menjelaskan dampak lingkungan, serta memberikan tips daur ulang dan informasi bank sampah.
- **Plant Disease Analyzer** — mengidentifikasi tanaman dan indikasi hama atau penyakit berdasarkan gambar, disertai gejala, kemungkinan penyebab, rekomendasi perawatan, dan pencegahan.

SustainAI menghubungkan proses **identifikasi → pemahaman → rekomendasi → tindakan**. Informasi harga dan lokasi bank sampah untuk demo dapat menggunakan dataset contoh, bukan data real-time.

## 💡 Filosofi Nama

**SustainAI** menggabungkan kata **Sustain** (keberlanjutan dan pelestarian lingkungan) dengan **AI** (_Artificial Intelligence_). Nama ini merepresentasikan pemanfaatan kecerdasan buatan untuk membantu masyarakat mengambil keputusan yang lebih berkelanjutan. SustainAI bukan sekadar pengenal gambar, melainkan asisten yang mengarahkan pengguna menuju tindakan lingkungan yang tepat.

## 🎯 Masalah yang Diangkat

Informasi pengelolaan sampah dan kesehatan tanaman tersebar di berbagai sumber. Masyarakat dapat kesulitan untuk:

- Mengidentifikasi jenis sampah dan menentukan pengelolaan yang tepat.
- Mengetahui sampah yang dapat didaur ulang atau disalurkan ke bank sampah.
- Menemukan informasi harga dan lokasi bank sampah yang relevan.
- Mengenali gejala awal hama atau penyakit tanaman.
- Menentukan langkah perawatan awal berdasarkan kondisi tanaman.

Akibatnya, sampah yang masih berpotensi dimanfaatkan dapat tercampur atau berakhir sebagai limbah, sementara gangguan tanaman dapat terlambat ditangani.

## 🧭 Solusi yang Ditawarkan

SustainAI menyediakan analisis gambar melalui antarmuka web sederhana. Pengguna mengambil foto atau mengunggah gambar, memilih modul, lalu melihat hasil dalam tampilan terstruktur.

Backend menggunakan instruksi khusus (_hardcoded prompt_) untuk mengarahkan model menghasilkan JSON sesuai skema modul. Respons divalidasi sebelum dikirim ke frontend untuk ditampilkan sebagai informasi yang mudah dipahami.

> **Catatan:** Analisis AI bersifat indikatif dan dapat keliru. Hasil analisis tanaman bukan pengganti diagnosis ahli. Harga dan lokasi bank sampah perlu dikonfirmasi kepada pengelola terkait.

## 👥 Target Pengguna

| Pengguna              | Kebutuhan                                           |
| --------------------- | --------------------------------------------------- |
| Masyarakat umum       | Memilah dan mengelola sampah rumah tangga.          |
| Pengguna bank sampah  | Mengetahui jenis sampah yang berpotensi disalurkan. |
| Petani                | Mendapatkan indikasi awal gangguan tanaman.         |
| Pelajar dan mahasiswa | Mengakses edukasi lingkungan berbasis teknologi.    |

## ✨ Fitur Utama

### 🌱 Plant Disease Analyzer

- Upload atau mengambil foto tanaman.
- Analisis Gambar sampah berbasis AI.
- Menampilkan nama tanaman.
- Menampilkan indikasi hama atau penyakit.
- Menjelaskan gejala visual dan kemungkinan penyebab.
- Memberikan rekomendasi perawatan dan tips pencegahan.
- Menampilkan potensi dampak terhadap tanaman.

### ♻️ Waste Analyzer

- Upload atau mengambil foto sampah.
- Analisis dan klasifikasi sampah berbasis AI.
- Menampilkan nama dan kategori sampah.
- Menjelaskan dampak lingkungan.
- Memberikan _recycling tips_.
- Menampilkan harga sampah berdasarkan dataset yang tersedia.
- Menampilkan lokasi bank sampah.

## 🚀 Rencana Pengembangan

- Integrasi harga bank sampah secara real-time.
- Pencarian bank sampah berdasarkan lokasi pengguna dan jarak.
- Verifikasi berkala jenis sampah yang diterima dan harga.
- Riwayat analisis sampah dan tanaman.
- Dashboard statistik aktivitas pengelolaan sampah.
- Estimasi jejak karbon dengan metodologi dan faktor emisi tervalidasi.
- Dukungan lebih banyak jenis sampah, tanaman, dan bahasa.
- Edukasi serta pengingat pemilahan sampah.
- Umpan balik pengguna untuk mengevaluasi kualitas analisis.

## 🖼️ Tampilan Aplikasi

<!-- Ganti placeholder dengan screenshot aplikasi, misalnya:
<img src="docs/images/homepage.png" alt="SustainAI Homepage" width="85%">
-->

<div align="center">

|                                                        Homepage                                                         |                                                           Waste Analyzer                                                            |
| :---------------------------------------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------------------------------------------------: |
| <img src="https://placehold.co/600x340/f0fdf4/166534?text=Homepage+Screenshot" alt="Homepage placeholder" width="100%"> | <img src="https://placehold.co/600x340/f0fdf4/166534?text=Waste+Analyzer+Screenshot" alt="Waste Analyzer placeholder" width="100%"> |
|                                                   screenshot homepage                                                   |                                                      screenshot Waste Analyzer                                                      |

|                                                       Plant Disease Analyzer                                                        |                                                            Analysis Result                                                            |
| :---------------------------------------------------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------------------------------------------------: |
| <img src="https://placehold.co/600x340/f0fdf4/166534?text=Plant+Analyzer+Screenshot" alt="Plant Analyzer placeholder" width="100%"> | <img src="https://placehold.co/600x340/f0fdf4/166534?text=Analysis+Result+Screenshot" alt="Analysis Result placeholder" width="100%"> |
|                                                      screenshot Plant Analyzer                                                      |                                                       screenshot hasil analisis                                                       |

</div>

## 🎬 Demo Aplikasi

<!-- PLACEHOLDER VIDEO: ganti DEMO_VIDEO_URL.
Untuk GIF repository, contoh: <img src="docs/demo.gif" alt="SustainAI demo" width="90%">
-->

<div align="center">

[![SustainAI Demo](https://placehold.co/960x540/14532d/ffffff?text=Click+to+Watch+SustainAI+Demo)](DEMO_VIDEO_URL)

**[▶️ Tonton Demo Aplikasi](DEMO_VIDEO_URL)**

</div>

## 🧱 Teknologi yang Digunakan

| Teknologi                                 | Peran                                                |
| ----------------------------------------- | ---------------------------------------------------- |
| [Svelte](https://svelte.dev/)             | Pembangunan antarmuka interaktif.                    |
| [SvelteKit](https://svelte.dev/docs/kit)  | Full-stack framework, routing, dan server endpoints. |
| [Tailwind CSS](https://tailwindcss.com/)  | Styling dan UI responsif.                            |
| [PostgreSQL](https://www.postgresql.org/) | Database relasional.                                 |
| [Vercel](https://vercel.com/)             | Deployment dan hosting.                              |
| [Gemini API](https://ai.google.dev/)      | Mesin analisis gambar multimodal berbasis AI.        |

## 🏗️ Arsitektur Sistem

### Diagram Arsitektur

```text
┌──────────────────────────────┐
│             USER             │
│ Browser / Smartphone         │
│ Upload or Capture Image      │
│ View Analysis History        │
└──────────────┬───────────────┘
               │ HTTPS: Image + Analyzer Type
               ▼
┌──────────────────────────────┐
│       FRONTEND (SVELTE)      │
│ - Image Preview              │
│ - Input Validation           │
└──────────────┬───────────────┘
               │ POST /api/analyze-*
               ▼
┌──────────────────────────────┐
│      SVELTEKIT BACKEND       │
│ - Validate Request           │
│ - Select Hardcoded Prompt    │
│ - Prepare Image Payload      │
└──────────────┬───────────────┘
               │ Prompt + Image
               ▼
┌──────────────────────────────┐
│          GEMINI API          │
│ - Modal Image Analysis       │
│ - Generate Structured JSON   │
└──────────────┬───────────────┘
               │ JSON Response
               ▼
┌──────────────────────────────┐
│      SVELTEKIT BACKEND       │
│ - Parse & Validate JSON      │
│ - Handle Invalid Response    │
│ - Save Analysis Record       │
│ - Return API Response        │
└──────────────┬───────────────┘
               │
       ┌───────┴────────┐
       │                │
       ▼                ▼
┌───────────────┐  ┌──────────────────────┐
│  PostgreSQL   │  │       FRONTEND       │
│               │  │                      │
│ Analysis      │  │ Parse JSON Response  │
│ History       │  │ Render Result UI     │
│ Records       │  │ Show Recommendations │
└───────────────┘  └──────────┬───────────┘
                              │
                              ▼
                   ┌──────────────────────┐
                   │      USER ACTION     │
                   │ - Manage Waste       │
                   │ - Care for Plants    │
                   │ - View History       │
                   └──────────────────────┘

┌──────────────────────────────┐
│          PostgreSQL          │
│      Reference Dataset       │
│ - Waste Bank Locations       │
│ - Waste Bank Prices          │
│ - Accepted Waste Types       │
└──────────────┬───────────────┘
               │ Query Reference Data
               ▼
┌──────────────────────────────┐
│      SVELTEKIT BACKEND       │
│ Retrieve Waste Bank Dataset  │
│ for Analysis Result          │
└──────────────┬───────────────┘
               │ Reference Data
               ▼
┌──────────────────────────────┐
│       FRONTEND (SVELTE)      │
│ Display Waste Bank Info      │
│ - Price                      │
│ - Location                   │
│ - Accepted Waste Types       │
└──────────────────────────────┘
```

### Sequence Diagram — Request hingga Parsing Frontend

```mermaid
sequenceDiagram
    actor User
    participant UI as Svelte Frontend
    participant API as SvelteKit Backend
    participant Gemini as Gemini API
    participant DB as PostgreSQL

    User->>UI: Upload / capture image
    UI->>UI: Preview and validate image
    User->>UI: Submit analysis

    UI->>API: POST /api/analyze-waste or /api/analyze-plant

    API->>API: Validate request
    API->>API: Select hardcoded prompt
    API->>API: Prepare image payload

    API->>Gemini: Send prompt + image
    Gemini->>Gemini: Analyze image
    Gemini-->>API: Return structured JSON

    API->>API: Parse and validate JSON

    alt Valid JSON response
        API->>DB: Save analysis record
        DB-->>API: Confirm record saved

        API->>DB: Query waste bank reference dataset
        DB-->>API: Return prices, locations, and accepted waste types

        API-->>UI: Return analysis JSON + reference data
        UI->>UI: Parse JSON response
        UI->>UI: Render analysis result
        UI->>UI: Display recommendations

        UI->>UI: Display waste bank information

        UI-->>User: Show analysis result

    else Invalid JSON response
        API->>API: Handle invalid response
        API-->>UI: Return error response
        UI-->>User: Display error message
    end

    opt User opens analysis history
        User->>UI: Request analysis history
        UI->>API: GET /api/history
        API->>DB: Retrieve analysis records
        DB-->>API: Return history records
        API-->>UI: Return history JSON
        UI->>UI: Parse and render history
        UI-->>User: Display analysis history
    end
```

### Ringkasan Alur Data

1. Pengguna mengunggah atau mengambil gambar melalui frontend aplikasi.
2. Gambar dikirim ke endpoint backend SvelteKit untuk diproses.
3. Backend memvalidasi gambar dan menentukan prompt sesuai modul analisis yang dipilih.
4. Backend mengirimkan gambar beserta prompt ke Gemini API.
5. Gemini menganalisis gambar dan mengembalikan hasil dalam format JSON.
6. Backend memvalidasi struktur JSON yang diterima serta menangani respons yang tidak sesuai format.
7. Hasil analisis dikirim kembali ke frontend dan disimpan ke database sebagai catatan riwayat analisis.
8. Frontend mengolah respons JSON dan menampilkan hasil analisis kepada pengguna.
9. Untuk mendukung fitur rekomendasi, aplikasi mengambil data referensi bank sampah dari PostgreSQL yang berisi dataset demo.

**Keamanan:** API key Gemini hanya disimpan di environment variable server, tidak dikirim ke browser atau dimasukkan ke repository.

## 🛠️ Instalasi dan Konfigurasi

### Prasyarat

- Node.js versi LTS yang kompatibel dengan proyek.
- npm.
- Git.
- PostgreSQL atau layanan PostgreSQL yang dapat diakses.
- Gemini API key dari Google AI Studio.

### 1. Clone Repository

```bash
git clone <REPOSITORY_URL>
cd <REPOSITORY_DIRECTORY>
```

Ganti placeholder dengan URL repository dan nama direktori proyek.

### 2. Install Dependencies

```bash
npm install
```

### 3. Konfigurasi Environment Variables

Buat file `.env` berdasarkan `.env.example`:

```bash
cp .env.example .env
```

Contoh `.env.example`:

```dotenv
# Gemini API Keys
GEMINI_API_KEY_WASTE_ANALYZER=
GEMINI_API_KEY_PLANT_ANALYZER=

# PostgreSQL
DATABASE_URL=

# Application
PUBLIC_APP_URL=http://localhost:5173
```

| Variable                        | Kegunaan                                     |
| ------------------------------- | -------------------------------------------- |
| `GEMINI_API_KEY_WASTE_ANALYZER` | API key Gemini untuk Waste Analyzer.         |
| `GEMINI_API_KEY_PLANT_ANALYZER` | API key Gemini untuk Plant Disease Analyzer. |
| `DATABASE_URL`                  | Connection string PostgreSQL.                |
| `PUBLIC_APP_URL`                | URL aplikasi untuk konfigurasi tertentu.     |

Sesuaikan nama variabel dengan source code aktual. Jika kedua modul menggunakan satu API key, konfigurasi dapat disederhanakan.

Contoh connection string:

```dotenv
DATABASE_URL="postgresql://USER:PASSWORD@HOST:5432/DATABASE_NAME"
```

Jangan gunakan kredensial asli di `.env.example`. Pastikan `.env` masuk ke `.gitignore`.

### 4. Konfigurasi Database

Pastikan PostgreSQL berjalan dan database sudah dibuat. Jika proyek menggunakan migration, jalankan perintah sesuai ORM atau library yang dipakai.

```bash
npm run db:migrate
```

Perintah migration di atas hanya contoh. Bila harga dan lokasi bank sampah memakai dataset hardcode pada demo, konfigurasi database dapat disesuaikan dengan implementasi aktual.

### 5. Menjalankan Aplikasi

```bash
npm run dev
```

Buka alamat yang ditampilkan terminal, umumnya:

```text
http://localhost:5173
```

Build production:

```bash
npm run build
npm run preview
```

Periksa juga batas ukuran upload dan penanganan error API.

## 🔐 Akun Demonstrasi

| Field    | Credential            |
| -------- | --------------------- |
| Username | `genforce`            |
| Password | `GENFORCES_JUARA_123` |

## 👨‍💻 Tim Pengembang

| Nama Anggota                   | GitHub                                                                                 |
| ------------------------------ | -------------------------------------------------------------------------------------- |
| **MUHAMMAD FADIL AKMAL HAFIZ** | [@muhammadfadilakmalhafizzyf-lang](https://github.com/muhammadfadilakmalhafizzyf-lang) |
| **XAVIER CHRISTIAN RIHI**      | [@christianxaviervibecode](https://github.com/christianxaviervibecode)                 |
| **RUBU YAFO PUTRA MASNENO**    | [@rubuproject](https://github.com/rubuproject)                                         |
| **ALVITHO P SIPAYUNG**         | [@alvithops](https://github.com/alvithops)                                             |

**Nama Tim:** GenForces  
**Kategori:** Web Application  
**Kompetisi:** Logicodix2026 — Green Environment & Sustainability

---

<div align="center">

### 🌱 Recognize. Understand. Act.

**SustainAI — Technology for a More Sustainable Future**

</div>
