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

### 1. Flowchart User Flow Diagram

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
    Z --> AA[Frontend mengolah JSON dan menampilkan hasil]

    AA --> AB{Modul yang dianalisis?}
    AB -- Sampah --> AC[Ambil dataset referensi bank sampah dari PostgreSQL]
    AC --> AD[Tampilkan informasi harga dan lokasi bank sampah]
    AB -- Tanaman --> AE[Tampilkan hasil dan rekomendasi perawatan]

    AD --> AF[Pengguna dapat membuka Riwayat Saya]
    AE --> AF
```

### 2. Langkah-Langkah User Flow

#### A. Mengakses Aplikasi dan Masuk ke Dashboard

1. Pengguna membuka landing page SustainAI.
2. Untuk menggunakan fitur utama aplikasi, pengguna perlu masuk ke akun terlebih dahulu.
3. Jika belum memiliki akun, pengguna dapat melakukan registrasi melalui halaman pendaftaran.
4. Setelah memiliki akun, pengguna melakukan login menggunakan kredensial yang terdaftar.
5. Jika proses login berhasil, pengguna akan diarahkan ke dashboard.

#### B. Menjelajahi Dashboard

Dashboard menyediakan lima halaman utama yang dapat diakses melalui sidebar:

- **Overview** — Menampilkan ringkasan aktivitas dan informasi kontekstual pengguna, meliputi:
  - Total Analisis.
  - Sampah Dianalisis.
  - Tanaman Dianalisis.
  - Sampah Berpotensi Didaur Ulang.
  - Grafik Fluktuasi Harga Sampah Berdasarkan Jenis dalam bentuk diagram garis.
  - Grafik Komposisi Jenis Sampah yang Dianalisis dalam bentuk diagram lingkaran.
- **Waste Analyzer** — Halaman untuk mengunggah atau mengambil gambar sampah dan mendapatkan hasil analisis.
- **Plant Analyzer** — Halaman untuk mengunggah atau mengambil gambar tanaman guna mengetahui indikasi hama atau penyakit.
- **Riwayat Saya** — Menampilkan seluruh catatan hasil analisis yang telah tersimpan.
- **Setting** — Halaman pengaturan akun. Pengguna dapat memperbarui nama, email, foto profil, dan password.

#### C. Melakukan Analisis Sampah atau Tanaman

1. Pengguna membuka halaman **Waste Analyzer** atau **Plant Analyzer**, sesuai jenis analisis yang ingin dilakukan.
2. Pengguna mengunggah gambar dari perangkat atau mengambil gambar secara langsung menggunakan kamera.
3. Frontend mengirimkan gambar ke endpoint backend SvelteKit untuk diproses.
4. Backend memvalidasi gambar dan menentukan prompt yang sesuai dengan modul analisis yang dipilih.
5. Backend mengirimkan gambar beserta prompt tersebut ke Gemini API.
6. Gemini menganalisis gambar dan mengembalikan hasil analisis dalam format JSON.
7. Backend memeriksa struktur dan isi respons JSON. Jika formatnya tidak sesuai, backend menangani kesalahan tersebut agar aplikasi dapat memberikan respons yang tepat.
8. Jika respons valid, backend menyimpan hasil analisis ke PostgreSQL sebagai catatan riwayat pengguna.
9. Backend mengirimkan hasil analisis kepada frontend.
10. Frontend mengolah data JSON dan menampilkan hasil analisis dalam bentuk antarmuka yang mudah dipahami.

#### D. Menampilkan Informasi Bank Sampah

1. Setelah analisis sampah berhasil, aplikasi mengambil data referensi bank sampah dari PostgreSQL.
2. Data tersebut menggunakan dataset yang telah disiapkan, termasuk informasi harga dan lokasi bank sampah.
3. Aplikasi menampilkan informasi tersebut sebagai referensi agar pengguna memperoleh gambaran mengenai tempat penyaluran sampah yang sesuai.

> **Catatan:** Informasi harga dan lokasi bank sampah pada versi demo bersumber dari dataset yang disiapkan di PostgreSQL, sehingga belum tentu mencerminkan kondisi atau harga terkini.

#### E. Melihat Riwayat Analisis

1. Setiap hasil analisis yang berhasil diproses dan disimpan akan menjadi catatan riwayat pengguna.
2. Pengguna membuka menu **Riwayat Saya** untuk melihat seluruh catatan analisis yang tersimpan.
3. Riwayat tersebut mencakup analisis sampah maupun tanaman, sehingga pengguna dapat meninjau kembali hasil analisis sebelumnya.

#### F. Mengelola Pengaturan Akun

1. Pengguna membuka menu **Setting** melalui sidebar dashboard.
2. Pengguna dapat memperbarui informasi akun, seperti nama, email, dan foto profil.
3. Pengguna juga dapat mengganti password untuk menjaga keamanan akun.

---

**Ringkasan:** SustainAI membawa pengguna dari proses masuk ke aplikasi, melakukan analisis gambar sampah atau tanaman dengan bantuan Gemini AI, hingga memperoleh hasil analisis dan rekomendasi. Hasil analisis yang berhasil disimpan ke PostgreSQL dapat dilihat kembali melalui halaman Riwayat Saya, sedangkan data referensi bank sampah membantu pengguna menentukan langkah pengelolaan sampah selanjutnya.

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

1\. Pengguna membuka halaman utama (Landing Page).\
Pengguna mengunjungi website SustainAI untuk mengenal aplikasi dan melihat fitur-fitur yang tersedia.

2\. Pengguna melakukan registrasi atau login.\
Jika belum memiliki akun, pengguna dapat membuat akun terlebih dahulu. Jika sudah memiliki akun, pengguna cukup masuk menggunakan informasi login.

3\. Sistem memeriksa proses login.\
Sistem akan memeriksa apakah informasi login yang dimasukkan benar. Jika salah, pengguna diminta mencoba login kembali. Jika berhasil, pengguna akan diarahkan ke halaman dashboard.

4\. Pengguna masuk ke halaman Dashboard.\
Setelah berhasil login, pengguna dapat mengakses berbagai fitur SustainAI melalui menu navigasi di sebelah kiri.

5\. Pengguna memilih fitur yang ingin digunakan.\
Terdapat beberapa menu yang dapat dipilih, yaitu Overview, Waste Analyzer, Plant Analyzer, Riwayat Saya, dan Setting.

6\. Pengguna mengunggah atau mengambil foto.\
Pada menu Waste Analyzer, pengguna memasukkan foto sampah yang ingin dianalisis. Sementara itu, pada menu Plant Analyzer, pengguna memasukkan foto tanaman yang ingin diperiksa.

7\. Gambar dikirim ke sistem backend.\
Setelah gambar dipilih, aplikasi akan mengirimkannya ke backend untuk diproses lebih lanjut.

8\. Backend memeriksa gambar dan menentukan jenis analisis.\
Sistem akan memeriksa gambar yang dikirim dan menentukan instruksi analisis yang sesuai, apakah untuk menganalisis sampah atau tanaman.

9\. Backend mengirim gambar ke Gemini AI.\
Gambar beserta instruksi analisis dikirim ke Gemini AI agar dapat diperiksa dan dipahami oleh kecerdasan buatan.

10\. Gemini AI menganalisis gambar.\
Gemini AI akan mengenali objek pada gambar dan menyusun informasi berdasarkan jenis analisis yang diminta.

11\. Gemini AI mengirimkan hasil analisis dalam format JSON.\
Hasil analisis dikirim kembali ke backend dalam format JSON agar dapat dibaca dan diproses oleh aplikasi.

12\. Backend memeriksa hasil analisis.\
Sistem akan memastikan bahwa hasil dari Gemini AI memiliki format dan struktur data yang benar. Jika hasilnya tidak valid, aplikasi akan menampilkan pesan kesalahan dan mengarahkan pengguna kembali ke halaman analisis yang sesuai. Jika valid, hasil analisis akan disimpan ke database PostgreSQL.

13\. Aplikasi menampilkan hasil analisis kepada pengguna.\
Hasil yang sudah berhasil diproses akan dikirim ke frontend dan ditampilkan pada halaman aplikasi.

- Waste Analyzer: Menampilkan informasi sampah, dampak lingkungan, tips daur ulang, serta informasi harga dan lokasi bank sampah.
- Plant Analyzer: Menampilkan informasi tanaman, kemungkinan hama atau penyakit, gejala, penyebab, serta rekomendasi perawatan dan pencegahan.

Pengguna juga dapat membuka menu Riwayat Saya untuk melihat hasil analisis yang pernah dilakukan.

Gambaran sederhananya: pengguna memasukkan foto → sistem mengirim foto ke Gemini AI → AI menganalisis foto → backend memeriksa dan menyimpan hasil → aplikasi menampilkan hasil analisis kepada pengguna.

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
