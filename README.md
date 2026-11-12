<div align="center">

<!-- Ganti placeholder dengan logo resmi SustainAI -->
<img src="https://placehold.co/180x180/16a34a/ffffff?text=SustainAI" alt="SustainAI Logo" width="180">

# 🌿 SustainAI

### AI-Powered Waste & Plant Analyzer

**From Recognition to Sustainable Action**

Platform asisten keberlanjutan berbasis AI untuk membantu masyarakat mengenali sampah, memahami indikasi penyakit tanaman, dan mengambil tindakan yang lebih ramah lingkungan.

<!-- Ganti DEMO_URL dengan URL aplikasi yang telah dipublikasikan -->

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

## 📌 Tentang SustainAI

**SustainAI** adalah aplikasi web yang memanfaatkan AI multimodal untuk menganalisis gambar sampah dan tanaman yang menunjukkan indikasi gangguan. Hasil analisis disajikan secara terstruktur agar pengguna dapat memahami objek yang dianalisis dan memperoleh rekomendasi tindakan.

SustainAI memiliki dua modul utama:

- **Waste Analyzer** — Mengidentifikasi dan mengklasifikasikan sampah, menjelaskan dampak lingkungannya, serta memberikan tips daur ulang dan informasi bank sampah.
- **Plant Disease Analyzer** — Mengidentifikasi tanaman dan indikasi hama atau penyakit berdasarkan gambar, disertai informasi gejala, kemungkinan penyebab, rekomendasi perawatan, dan pencegahan.

Alur yang ingin dihadirkan SustainAI adalah **identifikasi → pemahaman → rekomendasi → tindakan**. Informasi harga dan lokasi bank sampah pada versi demo dapat menggunakan dataset contoh dan bukan merupakan data real-time.

### Filosofi Nama

Nama **SustainAI** menggabungkan kata _Sustain_ (keberlanjutan dan pelestarian lingkungan) dengan _AI_ (_Artificial Intelligence_). Nama ini merepresentasikan pemanfaatan kecerdasan buatan untuk membantu masyarakat mengambil keputusan yang lebih berkelanjutan. SustainAI bukan sekadar pengenal gambar, tetapi juga asisten yang mengarahkan pengguna untuk memahami hasil identifikasi dan menentukan tindakan selanjutnya.

## 💡 Latar Belakang dan Permasalahan

Informasi mengenai pengelolaan sampah dan kesehatan tanaman tersebar di berbagai sumber. Masyarakat dapat mengalami kesulitan untuk:

- Mengidentifikasi jenis sampah dan menentukan cara pengelolaan yang tepat.
- Mengetahui sampah yang berpotensi didaur ulang atau disalurkan ke bank sampah.
- Menemukan informasi harga dan lokasi bank sampah yang relevan.
- Mengenali indikasi awal hama atau penyakit tanaman.
- Menentukan langkah perawatan awal berdasarkan kondisi tanaman.

Kondisi tersebut dapat menyebabkan sampah yang masih berpotensi dimanfaatkan tercampur atau berakhir sebagai limbah. Di sisi lain, gangguan tanaman berisiko terlambat ditangani karena kurangnya informasi awal yang mudah diakses.

## 🎯 Solusi

SustainAI menyediakan analisis gambar melalui antarmuka web. Pengguna dapat mengambil foto atau mengunggah gambar, memilih modul analisis, kemudian melihat hasilnya dalam tampilan terstruktur.

Backend menggunakan instruksi khusus (_hardcoded prompt_) sesuai modul untuk mengarahkan Gemini API menghasilkan respons JSON. Backend kemudian memvalidasi struktur respons sebelum mengirimkan hasil kepada frontend untuk ditampilkan.

> **Batasan informasi:** Hasil analisis AI bersifat indikatif dan dapat keliru. Analisis tanaman bukan pengganti diagnosis ahli. Informasi harga dan lokasi bank sampah pada versi demo perlu dikonfirmasi kepada pengelola terkait.

## 👥 Target Pengguna

| Target pengguna       | Kebutuhan                                           |
| --------------------- | --------------------------------------------------- |
| Masyarakat umum       | Memilah dan mengelola sampah rumah tangga.          |
| Pengguna bank sampah  | Mengetahui jenis sampah yang berpotensi disalurkan. |
| Petani                | Mendapatkan indikasi awal gangguan tanaman.         |
| Pelajar dan mahasiswa | Mengakses edukasi lingkungan berbasis teknologi.    |

## ✨ Fitur

### ♻️ Waste Analyzer

- Mengunggah gambar atau mengambil foto sampah secara langsung.
- Menganalisis dan mengklasifikasikan sampah menggunakan AI.
- Menampilkan nama dan kategori sampah.
- Menjelaskan dampak lingkungan.
- Memberikan _recycling tips_ atau saran daur ulang.
- Menampilkan informasi harga berdasarkan dataset yang tersedia.
- Menampilkan informasi lokasi bank sampah.

### 🌱 Plant Disease Analyzer

- Mengunggah gambar atau mengambil foto tanaman secara langsung.
- Mengidentifikasi tanaman menggunakan AI.
- Menampilkan indikasi hama atau penyakit.
- Menjelaskan gejala visual dan kemungkinan penyebab.
- Memberikan rekomendasi perawatan dan tips pencegahan.
- Menampilkan potensi dampak gangguan terhadap tanaman.

### 📊 Dashboard dan Manajemen Akun

Dashboard menyediakan lima halaman yang dapat diakses melalui sidebar:

| Halaman            | Fungsi                                                                     |
| ------------------ | -------------------------------------------------------------------------- |
| **Overview**       | Menampilkan ringkasan aktivitas, statistik analisis, dan visualisasi data. |
| **Waste Analyzer** | Menjalankan analisis gambar sampah.                                        |
| **Plant Analyzer** | Menjalankan analisis gambar tanaman.                                       |
| **Riwayat Saya**   | Menampilkan catatan hasil analisis yang tersimpan.                         |
| **Setting**        | Mengelola nama, email, foto profil, dan password akun.                     |

Informasi yang ditampilkan pada halaman **Overview** meliputi:

- Total Analisis.
- Sampah Dianalisis.
- Tanaman Dianalisis.
- Sampah Berpotensi Didaur Ulang.
- Grafik garis **Fluktuasi Harga Sampah Berdasarkan Jenis**.
- Grafik lingkaran **Komposisi Jenis Sampah yang Dianalisis**.

## 🚀 Rencana Pengembangan

Pengembangan SustainAI selanjutnya dapat mencakup beberapa fitur berikut (bukan fitur yang akan tersedia pada MVP):

- Integrasi data harga bank sampah secara real-time.
- Pencarian bank sampah berdasarkan lokasi pengguna dan jarak terdekat.
- Verifikasi berkala terhadap jenis sampah yang diterima dan harga yang ditawarkan bank sampah.
- Penyediaan riwayat analisis sampah dan tanaman.
- Pengembangan dashboard statistik aktivitas pengelolaan sampah.
- Estimasi jejak karbon menggunakan metodologi dan faktor emisi yang tervalidasi.
- Perluasan cakupan analisis untuk lebih banyak jenis sampah dan tanaman.
- Dukungan terhadap berbagai bahasa.
- Penyediaan edukasi dan pengingat terkait pemilahan sampah.
- Pengumpulan umpan balik pengguna untuk mengevaluasi dan meningkatkan kualitas hasil analisis.

## 🖼️ Tampilan Aplikasi

<!-- Ganti gambar placeholder dengan screenshot aktual, misalnya:
<img src="docs/images/homepage.png" alt="SustainAI Homepage" width="85%">
-->

<div align="center">

|                                                        Homepage                                                         |                                                           Waste Analyzer                                                            |
| :---------------------------------------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------------------------------------------------: |
| <img src="https://placehold.co/600x340/f0fdf4/166534?text=Homepage+Screenshot" alt="Homepage placeholder" width="100%"> | <img src="https://placehold.co/600x340/f0fdf4/166534?text=Waste+Analyzer+Screenshot" alt="Waste Analyzer placeholder" width="100%"> |
|                                                  _Screenshot homepage_                                                  |                                                     _Screenshot Waste Analyzer_                                                     |

|                                                       Plant Disease Analyzer                                                        |                                                            Analysis Result                                                            |
| :---------------------------------------------------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------------------------------------------------: |
| <img src="https://placehold.co/600x340/f0fdf4/166534?text=Plant+Analyzer+Screenshot" alt="Plant Analyzer placeholder" width="100%"> | <img src="https://placehold.co/600x340/f0fdf4/166534?text=Analysis+Result+Screenshot" alt="Analysis Result placeholder" width="100%"> |
|                                                     _Screenshot Plant Analyzer_                                                     |                                                      _Screenshot hasil analisis_                                                      |

</div>

## 🎬 Demo Aplikasi

<!-- Ganti DEMO_VIDEO_URL dengan URL video demo. Untuk GIF repository:
<img src="docs/demo.gif" alt="SustainAI demo" width="90%">
-->

<div align="center">

[![SustainAI Demo](https://placehold.co/960x540/14532d/ffffff?text=Click+to+Watch+SustainAI+Demo)](DEMO_VIDEO_URL)

**[▶️ Tonton Demo Aplikasi](DEMO_VIDEO_URL)**

</div>

## 🧱 Teknologi

| Teknologi                                 | Peran                                                |
| ----------------------------------------- | ---------------------------------------------------- |
| [Svelte](https://svelte.dev/)             | Membangun antarmuka pengguna yang interaktif.        |
| [SvelteKit](https://svelte.dev/docs/kit)  | Full-stack framework, routing, dan server endpoints. |
| [Tailwind CSS](https://tailwindcss.com/)  | Styling dan pembangunan UI responsif.                |
| [PostgreSQL](https://www.postgresql.org/) | Database relasional untuk menyimpan data aplikasi.   |
| [Vercel](https://vercel.com/)             | Deployment dan hosting aplikasi.                     |
| [Gemini API](https://ai.google.dev/)      | Mesin AI multimodal untuk analisis gambar.           |

## 🗄️ Rancangan Database

Berikut adalah diagram rancangan dan relasi database PostgreSQL yang digunakan oleh SustainAI.

<div align="center">

<a href="https://github.com/christianxavierVibecode/SustainAI/blob/ded322535291ce7e147ab256257439a2bdf1059c/DevReferences/Database/schema.png">
  <img src="https://raw.githubusercontent.com/christianxavierVibecode/SustainAI/ded322535291ce7e147ab256257439a2bdf1059c/DevReferences/Database/schema.png" alt="Diagram rancangan dan relasi database SustainAI" width="95%">
</a>

</div>

### Fungsi Tabel

| Tabel                    | Fungsi                                                                                                                                                                                                             |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `users`                  | Menyimpan akun pengguna, termasuk email, password hash, nama, status verifikasi, dan timestamp. Digunakan untuk autentikasi serta pengelolaan akun.                                                                |
| `waste_categories`       | Menyimpan kategori utama sampah sebagai pengelompokan jenis sampah pada Waste Analyzer.                                                                                                                            |
| `waste_sub_categories`   | Menyimpan jenis sampah yang lebih spesifik dan relasinya ke kategori utama. Digunakan untuk klasifikasi hasil analisis serta referensi harga.                                                                      |
| `waste_price`            | Menyimpan riwayat harga untuk setiap subkategori sampah. Data ini menjadi sumber grafik fluktuasi harga dan informasi harga pada fitur Waste Analyzer.                                                             |
| `analysis_records`       | Menyimpan catatan utama setiap analisis pengguna, seperti jenis modul (sampah/tanaman), status, lokasi file gambar, model AI, hasil JSON, dan waktu analisis. Menjadi sumber Riwayat Saya dan statistik Dashboard. |
| `analysis_waste_details` | Menyimpan detail khusus hasil Waste Analyzer, seperti subkategori sampah dan informasi hasil analisis yang terkait dengan satu `analysis_records`.                                                                 |
| `analysis_plant_details` | Menyimpan detail khusus hasil Plant Disease Analyzer, seperti identitas tanaman, indikasi penyakit, gejala, penyebab, dan rekomendasi perawatan yang terkait dengan satu `analysis_records`.                       |

> `analysis_records` berperan sebagai tabel utama riwayat analisis, sedangkan `analysis_waste_details` dan `analysis_plant_details` menyimpan detail sesuai modul yang digunakan.

---

## 🏗️ Arsitektur dan Alur Sistem

Bagian ini menjelaskan perjalanan pengguna, komponen sistem, serta komunikasi antarkomponen. Diagram alur digunakan untuk melihat proses dari sisi pengguna, sedangkan diagram arsitektur dan sequence menjelaskan pemrosesan teknis di baliknya.

### 1. User Flow Diagram

```mermaid
flowchart TD
    A([Mulai]) --> B[Pengguna membuka Landing Page]
    B --> C{Sudah memiliki akun?}

    C -- Belum --> D[Registrasi akun]
    C -- Sudah --> E[Login]
    D --> E

    E --> F{Login berhasil?}
    F -- Tidak --> E
    F -- Ya --> G[Dashboard Pengguna]

    G --> H{Pilih menu}
    H --> I[Overview]
    H --> J2[Modul Utama]
    J2 --> J[Waste Analyzer]
    J2 --> K[Plant Analyzer]
    H --> L[Riwayat Saya]
    H --> M[Setting]


    J --> N[Unggah atau ambil foto sampah]
    K --> O[Unggah atau ambil foto tanaman]
    N --> P[Kirim gambar ke backend SvelteKit]
    O --> P

    P --> Q[Validasi gambar dan pilih prompt sesuai modul]
    Q --> R[Kirim gambar dan prompt ke Gemini API]
    R --> S[Gemini menganalisis gambar]
    S --> T[Gemini mengembalikan hasil dalam format JSON]
    T --> U[Backend memvalidasi struktur JSON]

    U --> V{Respons JSON valid?}
    V -- Tidak --> W[Backend menangani respons tidak valid]
    W --> X[Frontend menampilkan pesan kesalahan]
    X -- Kembali ke modul <br> Waste / Plant Analyser--> J2

    V -- Ya --> Y[Simpan hasil analisis ke PostgreSQL]
    Y --> Z[Kirim hasil analisis ke frontend]
    Z --> AA[Frontend menampilkan hasil analisis]

    AA --> AB{Jenis analisis?}
    AB -- Sampah --> AC[Ambil dataset referensi bank sampah]
    AC --> AD[Tampilkan harga dan lokasi bank sampah]
    AB -- Tanaman --> AE[Tampilkan rekomendasi perawatan]

    AD --> AF[Pengguna dapat membuka Riwayat Saya]
    AE --> AF
```

### 2. Langkah-Langkah User Flow

#### A. Mengakses Aplikasi

1. Pengguna membuka landing page SustainAI.
2. Untuk menggunakan fitur utama, pengguna perlu masuk ke akun.
3. Pengguna yang belum memiliki akun dapat melakukan registrasi.
4. Setelah memiliki akun, pengguna login menggunakan kredensial yang terdaftar.
5. Jika login berhasil, pengguna diarahkan ke dashboard. Jika gagal, pengguna diminta mencoba kembali.

#### B. Menjelajahi Dashboard

Pengguna dapat mengakses lima halaman melalui sidebar:

- **Overview** — Menampilkan ringkasan aktivitas, empat indikator utama (Total Analisis, Sampah Dianalisis, Tanaman Dianalisis, dan Sampah Berpotensi Didaur Ulang), grafik fluktuasi harga sampah berdasarkan jenis, serta komposisi jenis sampah yang dianalisis.
- **Waste Analyzer** — Halaman untuk mengunggah atau mengambil gambar sampah dan memperoleh hasil analisis.
- **Plant Analyzer** — Halaman untuk mengunggah atau mengambil gambar tanaman guna mengetahui indikasi hama atau penyakit.
- **Riwayat Saya** — Menampilkan catatan hasil analisis yang telah tersimpan.
- **Setting** — Memungkinkan pengguna memperbarui nama, email, foto profil, dan password.

#### C. Melakukan Analisis Gambar

1. Pengguna membuka **Waste Analyzer** atau **Plant Analyzer** sesuai kebutuhan.
2. Pengguna mengunggah gambar dari perangkat atau mengambil gambar menggunakan kamera.
3. Frontend mengirim gambar ke endpoint backend SvelteKit.
4. Backend memvalidasi gambar dan menentukan prompt berdasarkan modul yang dipilih.
5. Backend mengirim gambar beserta prompt ke Gemini API.
6. Gemini menganalisis gambar dan mengembalikan hasil dalam format JSON.
7. Backend memeriksa struktur respons. Jika respons tidak valid, backend menangani kesalahan dan frontend menampilkan pesan yang sesuai.
8. Jika respons valid, backend menyimpan hasil analisis ke PostgreSQL sebagai riwayat pengguna.
9. Backend mengirim hasil analisis kepada frontend.
10. Frontend mengolah data dan menampilkan hasil sesuai modul yang digunakan.

#### D. Menampilkan Informasi Bank Sampah

1. Setelah analisis sampah berhasil, aplikasi mengambil data referensi bank sampah dari PostgreSQL.
2. Dataset dapat berisi informasi harga, lokasi, dan jenis sampah yang diterima.
3. Aplikasi menampilkan data tersebut sebagai referensi tempat penyaluran sampah.

> **Catatan:** Informasi harga dan lokasi bank sampah pada versi demo bersumber dari dataset yang disiapkan, sehingga belum tentu mencerminkan kondisi atau harga terkini.

#### E. Melihat Riwayat dan Mengelola Akun

- **Riwayat analisis:** Pengguna membuka menu **Riwayat Saya** untuk meninjau kembali hasil analisis sampah maupun tanaman yang tersimpan.
- **Pengaturan akun:** Pengguna membuka menu **Setting** untuk memperbarui nama, email, foto profil, atau password.

### 3. Diagram Arsitektur Sistem

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
│ - Render Analysis Result     │
└──────────────┬───────────────┘
               │ HTTP Request
               ▼
┌──────────────────────────────┐
│      SVELTEKIT BACKEND       │
│ - Validate Request           │
│ - Select Module Prompt       │
│ - Prepare Image Payload      │
└──────────────┬───────────────┘
               │ Prompt + Image
               ▼
┌──────────────────────────────┐
│          GEMINI API          │
│ - Multimodal Image Analysis  │
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
┌───────────────┐  ┌──────────────────────────┐
│  PostgreSQL   │  │   FRONTEND (SVELTE)      │
│               │  │                          │
│ Analysis      │  │ Parse API (JSON) Respons │
│ History       │  │ Render Analysis UI       │
│ Records       │  │ Show Recommendations     │
└───────────────┘  └──────────┬───────────────┘
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

### 4. Sequence Diagram

Diagram berikut menggambarkan komunikasi antara pengguna, frontend, backend, Gemini API, dan PostgreSQL selama proses analisis. Pengambilan dataset bank sampah hanya dilakukan untuk analisis sampah.

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
    API->>API: Select module prompt
    API->>API: Prepare image payload

    API->>Gemini: Send prompt + image
    Gemini->>Gemini: Analyze image
    Gemini-->>API: Return structured JSON
    API->>API: Parse and validate JSON

    alt Valid JSON response
        API->>DB: Save analysis record
        DB-->>API: Confirm record saved

        opt Waste Analyzer
            API->>DB: Query waste bank reference dataset
            DB-->>API: Return prices, locations, accepted waste types
        end

        API-->>UI: Return analysis result and relevant reference data
        UI->>UI: Parse response and render result
        UI-->>User: Show analysis result

    else Invalid JSON response
        API->>API: Handle invalid response
        API-->>UI: Return error response
        UI-->>User: Display error message
    end

    opt User opens analysis history
        User->>UI: Open analysis history
        UI->>API: GET /api/history
        API->>DB: Retrieve analysis records
        DB-->>API: Return history records
        API-->>UI: Return history data
        UI->>UI: Render history
        UI-->>User: Display analysis history
    end
```

## 🛠️ Instalasi dan Konfigurasi

### Prasyarat

- Node.js versi LTS yang kompatibel dengan proyek.
- npm.
- Git.
- PostgreSQL atau layanan PostgreSQL yang dapat diakses.
- Gemini API key dari [Google AI Studio](https://aistudio.google.com/).

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

Sesuaikan nama variabel dengan implementasi source code. Jika kedua modul menggunakan satu API key, konfigurasi dapat disederhanakan.

Contoh connection string:

```dotenv
DATABASE_URL="postgresql://USER:PASSWORD@HOST:5432/DATABASE_NAME"
```

**Penting:** Jangan masukkan kredensial asli ke `.env.example`. Pastikan `.env` tercantum di `.gitignore`. API key Gemini harus disimpan sebagai environment variable server dan tidak boleh dikirim ke browser atau di-commit ke repository.

### 4. Konfigurasi Database

Pastikan PostgreSQL berjalan dan database telah dibuat. Jika proyek menggunakan migration, jalankan perintah yang sesuai dengan ORM atau library database yang digunakan.

```bash
npm run db:migrate
```

Perintah tersebut merupakan contoh dan perlu disesuaikan dengan script yang tersedia di `package.json`. Jika dataset bank sampah disiapkan melalui mekanisme lain, sesuaikan langkah konfigurasi dengan implementasi proyek.

### 5. Menjalankan Aplikasi

Jalankan development server:

```bash
npm run dev
```

Buka alamat yang ditampilkan di terminal, umumnya:

```text
http://localhost:5173
```

Untuk membuat dan menjalankan build production:

```bash
npm run build
npm run preview
```

Pastikan konfigurasi environment, koneksi database, batas ukuran upload, dan penanganan error API telah disesuaikan sebelum deployment.

## 🔐 Akun Demonstrasi

| Field    | Credential                      |
| -------- | ------------------------------- |
| Username | `christianxavier@genforces.com` |
| Password | `GENFORCES_JUARA_123`           |

> Akun ini hanya untuk keperluan demonstrasi.

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
