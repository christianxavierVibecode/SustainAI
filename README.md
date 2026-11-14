<div align="center">

<!-- Ganti placeholder dengan logo resmi SustainAI -->
<img src="DevReferences/Tampilan Aplikasi/SustainAI-Icon-transparant.webp" alt="SustainAI Logo" width="180">

# 🌿 SustainAI

### AI-Powered Waste & Plant Analyzer

**From Recognition to Sustainable Action** · _SustainAI, Empowering For Sustainability_

Platform asisten keberlanjutan berbasis AI untuk membantu masyarakat mengenali sampah, memahami indikasi penyakit tanaman, dan mengambil tindakan yang lebih ramah lingkungan.

<!-- Ganti DEMO_URL dengan URL aplikasi yang telah dipublikasikan -->

<a href="https://youtu.be/sdnMh_Qu42I"><img src="DevReferences/Tampilan Aplikasi/1. Landing Page - Hero.PNG" alt="SustainAI Demo" width="90%"></a>

<p>
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

### 🌍 Sustainable Development Goals (SDGs)

SustainAI dikembangkan sebagai solusi teknologi berbasis _Artificial Intelligence_ (AI) yang mendukung pencapaian _Sustainable Development Goals_ (SDGs), khususnya:

**SDG 12 — Responsible Consumption and Production**  
_Konsumsi dan Produksi yang Bertanggung Jawab_

SustainAI berkontribusi dalam mendorong pengelolaan sampah yang lebih bertanggung jawab melalui identifikasi dan klasifikasi sampah, edukasi daur ulang, serta penyediaan informasi referensi harga dan bank sampah. Melalui Waste Analyzer, masyarakat diharapkan dapat memahami potensi pemanfaatan sampah dan mengambil keputusan yang lebih bijak dalam pengelolaan limbah.

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
| **History**        | Menampilkan catatan hasil analisis yang tersimpan.                         |
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
- Pengembangan dashboard statistik aktivitas pengelolaan sampah.
- Estimasi jejak karbon menggunakan metodologi dan faktor emisi yang tervalidasi.
- Perluasan cakupan analisis untuk lebih banyak jenis sampah dan tanaman.
- Dukungan terhadap berbagai bahasa.
- Penyediaan edukasi dan pengingat terkait pemilahan sampah.
- Pengumpulan umpan balik pengguna untuk mengevaluasi dan meningkatkan kualitas hasil analisis.

## 🖼️ Tampilan Aplikasi

<!-- Screenshot aktual aplikasi SustainAI -->

<div align="center">

|                             Tampilan Halaman Utama Aplikasi / Landing Page                             |                                               Tampilan Hasil Analisis Tanaman (Gambar Valid)                                               |
| :----------------------------------------------------------------------------------------------------: | :----------------------------------------------------------------------------------------------------------------------------------------: |
| <img src="DevReferences/Tampilan Aplikasi/1. Landing Page - Hero.PNG" alt="Landing Page" width="100%"> | <img src="DevReferences/Tampilan Aplikasi/2. Dashboard - Plant Analyzer - Response Avaible.PNG" alt="Plant Analyzer - Valid" width="100%"> |
|                            _Tampilan Halaman Utama Aplikasi / Landing Page_                            |                             _Tampilan Hasil Analisis Tanaman ketika user menginput gambar tanaman yang valid_                              |

|                                                Tampilan Hasil Analisis Tanaman (Gambar Tidak Valid)                                                |                                               Tampilan Hasil Analisis Sampah (Gambar Valid)                                                |
| :------------------------------------------------------------------------------------------------------------------------------------------------: | :----------------------------------------------------------------------------------------------------------------------------------------: |
| <img src="DevReferences/Tampilan Aplikasi/2. Dashboard - Plant Analyzer - Response Not Avaible.PNG" alt="Plant Analyzer - Not Valid" width="100%"> | <img src="DevReferences/Tampilan Aplikasi/3. Dashboard - Waste Analyzer - Response Avaible.PNG" alt="Waste Analyzer - Valid" width="100%"> |
|                              _Tampilan Hasil Analisis Tanaman ketika user menginput gambar tanaman yang tidak valid_                               |                              _Tampilan Hasil Analisis Sampah ketika user menginput gambar sampah yang valid_                               |

|                                                Tampilan Hasil Analisis Sampah (Gambar Tidak Valid)                                                 |                                      Tampilan Halaman Overview Dashboard                                      |
| :------------------------------------------------------------------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------------------------: |
| <img src="DevReferences/Tampilan Aplikasi/3. Dashboard - Waste Analyzer - Response Not Avaible.PNG" alt="Waste Analyzer - Not Valid" width="100%"> | <img src="DevReferences/Tampilan Aplikasi/4. Dashboard - Overview.PNG" alt="Dashboard Overview" width="100%"> |
|                               _Tampilan Hasil Analisis Sampah ketika user menginput gambar sampah yang tidak valid_                                |                                     _Tampilan Halaman Overview Dashboard_                                     |

|                                       Tampilan Halaman History Hasil Analisis                                       |
| :-----------------------------------------------------------------------------------------------------------------: |
| <img src="DevReferences/Tampilan Aplikasi/5. Dashboard - History Analyzer.PNG" alt="History Analyzer" width="100%"> |
|                                      _Tampilan Halaman history hasil Analisis_                                      |

</div>

## 🎬 Demo Aplikasi

<div align="center">

[![SustainAI Demo Video](https://img.youtube.com/vi/sdnMh_Qu42I/maxresdefault.jpg)](https://youtu.be/sdnMh_Qu42I)

**[▶️ Tonton Demo Aplikasi di YouTube](https://youtu.be/sdnMh_Qu42I)**

</div>

## 🧱 Teknologi

| Teknologi                                 | Peran                                                          |
| ----------------------------------------- | -------------------------------------------------------------- |
| [Svelte](https://svelte.dev/)             | Membangun antarmuka pengguna yang interaktif.                  |
| [SvelteKit](https://svelte.dev/docs/kit)  | Full-stack framework, routing, dan server endpoints.           |
| [Tailwind CSS](https://tailwindcss.com/)  | Styling dan pembangunan UI responsif.                          |
| [PostgreSQL](https://www.postgresql.org/) | Database relasional dan storage untuk menyimpan data aplikasi. |
| [Vercel](https://vercel.com/)             | Deployment dan hosting aplikasi.                               |
| [Gemini API](https://ai.google.dev/)      | Mesin AI multimodal untuk analisis gambar.                     |

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
    H --> L[History]
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
- **History** — Menampilkan catatan hasil analisis yang telah tersimpan.
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

- **Riwayat analisis:** Pengguna membuka menu **History** untuk meninjau kembali hasil analisis sampah maupun tanaman yang tersimpan.
- **Pengaturan akun:** Pengguna membuka menu **Setting** untuk memperbarui nama, email, foto profil, atau password.

### 3. Diagram Arsitektur Sistem

```text
┌──────────────────────────────┐
│             USER             │
│ Browser / Smartphone         │
│ - Upload / Kamera Foto       │
│ - Lihat Riwayat & Analitik   │
└──────────────┬───────────────┘
               │ HTTPS: FormData (Image Binary + Analyzer Type)
               ▼
┌──────────────────────────────┐
│       FRONTEND (SVELTE)      │
│ - Client-side Image Preview  │
│ - Validasi Tipe & Ukuran     │
│ - Render Analisis & Rekomend │
└──────────────┬───────────────┘
               │ HTTP POST /api/analyze/waste atau /api/analyze/plant
               ▼
┌──────────────────────────────┐
│      SVELTEKIT BACKEND       │
│ - Validasi Request Server    │
│ - Pilih Hardcoded Prompt     │
│ - Generate UUID & Timestamp  │
│ - Konversi Buffer -> Base64  │
└───────┬──────────────┬───────┘
        │              │
 ┌──────┴──────┐ ┌─────┴─────────────────────────────────┐
 │ (1) Base64  │ │ (2) Binary Upload (Public CDN Bucket) │
 ▼             ▼ ▼                                       ▼
┌──────────────────────────────┐        ┌───────────────────────────────┐
│          GEMINI API          │        │    SUPABASE STORAGE BUCKET    │
│       gemini-3.5-flash       │        │ - Public CDN Storage (Cached) │
│ - Fast Multimodal Inference  │        │ - Simpan Foto Persisten       │
│ - Inline Base64 Processing   │        │ - Format uuid-type-time.ext   │
│ - Kembalikan JSON Terstruktur│        └──────────────┬────────────────┘
└──────────────┬───────────────┘                       │
               │ JSON Response                         │ Image Path Relatif / Public URL
               ▼                                       ▼
┌──────────────────────────────────────────────────────────────┐
│                      SVELTEKIT BACKEND                       │
│ - Parse & Validasi Struktur JSON Respons AI                  │
│ - Tangani Kasus Objek/Gambar Tidak Valid                     │
│ - Simpan Catatan & Path Gambar ke Database                   │
└──────────────────────────────┬───────────────────────────────┘
                               │
                ┌──────────────┴──────────────┐
                ▼                             ▼
┌──────────────────────────────┐  ┌──────────────────────────┐
│          PostgreSQL          │  │     FRONTEND (SVELTE)    │
│  (Supabase / Native Driver)  │  │                          │
│ - users (RBAC & Auth)        │  │ Parse Respons API (JSON) │
│ - analysis_records (JSONB)   │  │ Render Hasil Analisis UI │
│ - analysis_waste/plant_detail│  │ Tampilkan Rekomendasi    │
│ - waste_price & categories   │  └──────────┬───────────────┘
└──────────────┬───────────────┘             │
               │ Query Referensi Data        ▼
               │ (Khusus Modul Waste) ┌──────────────────────┐
               └──────────────┐       │      USER ACTION     │
                              ▼       │ - Kelola Sampah      │
┌──────────────────────────────┐      │ - Rawat Tanaman      │
│     SVELTEKIT BACKEND        │      │ - Riwayat (Signed URL│
│ Ambil Dataset Harga & Lokasi │      └──────────────────────┘
└──────────────┬───────────────┘
               │ Data Referensi
               ▼
┌──────────────────────────────┐
│       FRONTEND (SVELTE)      │
│ Tampilkan Estimasi Harga     │
│ Bank Sampah & Lokasi         │
└──────────────────────────────┘
```

### 4. Sequence Diagram

Diagram berikut menggambarkan alur komunikasi antara pengguna, frontend, backend SvelteKit, Google Gemini API, Supabase Storage (Public Bucket dengan Akselerasi CDN), dan PostgreSQL. Proses inferensi AI (Base64) dan penyimpanan persisten gambar dieksekusi secara efisien secara paralel di backend:

```mermaid
sequenceDiagram
    autonumber
    actor User as Pengguna
    participant UI as Svelte Frontend
    participant API as SvelteKit Backend
    participant Gemini as Gemini API (gemini-3.5-flash)
    participant Storage as Supabase Storage (Public CDN)
    participant DB as PostgreSQL

    User->>UI: Ambil foto via kamera atau upload gambar
    UI->>UI: Preview & validasi ukuran file (< 5MB)
    User->>UI: Klik "Analisis Sekarang"

    UI->>API: POST /api/analyze/waste atau /api/analyze/plant (FormData)
    API->>API: Validasi MIME & ukuran file
    API->>API: Generate UUID & Timestamp
    API->>API: Konversi Buffer -> Inline Base64

    par Eksekusi Paralel (AI Inference & Persistensi Gambar)
        API->>Gemini: POST generateContent (Prompt + Inline Base64 Data)
        API->>Storage: Upload binary ke public CDN bucket (Service Role)
    end

    Storage-->>API: Konfirmasi upload sukses & kembalikan image_path
    Gemini-->>API: Mengembalikan respons teks JSON terstruktur
    API->>API: Parse & validasi integritas struktur JSON

    alt Respons AI Valid
        API->>DB: INSERT INTO analysis_records (id, image_path, result JSONB, ...)

        opt Khusus Modul Waste
            API->>DB: INSERT INTO analysis_waste_details (...)
            API->>DB: Query referensi harga sampah (waste_price & subkategori)
            DB-->>API: Return harga & lokasi bank sampah
        end

        opt Khusus Modul Plant
            API->>DB: INSERT INTO analysis_plant_details (...)
        end

        DB-->>API: Konfirmasi commit transaksi
        API-->>UI: 200 OK (Hasil analisis AI + data referensi + Public CDN Image URL)
        UI-->>User: Tampilkan kartu hasil analisis & rekomendasi tindakan

    else Respons AI Tidak Valid / Gambar Ditolak
        API->>DB: Catat analysis_records status 'failed'
        API-->>UI: Return error response
        UI-->>User: Tampilkan pesan kesalahan yang informatif
    end

    opt Pengguna Membuka Riwayat Saya (History)
        User->>UI: Buka menu Riwayat Saya
        UI->>API: GET /dashboard/history
        API->>DB: Query riwayat analisis pengguna
        DB-->>API: Daftar record (memuat image_path)
        API->>API: Konversi image_path ke Public CDN URL (Instan tanpa round-trip)
        API-->>UI: Data riwayat lengkap + Public CDN Image URLs
        UI-->>User: Render daftar riwayat dan thumbnail gambar ter-cache cepat
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
# ==============================================================================
# Google Gemini API
# Model Target: gemini-3.5-flash
# Endpoint: https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash:generateContent?key=...
# ==============================================================================
GEMINI_API_KEY_WASTE_ANALYZER=AIzaSy...
GEMINI_API_KEY_PLANT_ANALYZER=AIzaSy...

# ==============================================================================
# Database PostgreSQL (Supabase / Local) via Native Driver
# ==============================================================================
DATABASE_URL="postgresql://postgres.[PROJECT-REF]:[PASSWORD]@aws-0-[REGION].pooler.supabase.com:6543/postgres"

# ==============================================================================
# Supabase Storage (Public CDN Bucket)
# Digunakan untuk persistensi foto analisis berakselerasi CDN & caching cepat
# ==============================================================================
SUPABASE_URL="https://[PROJECT-REF].supabase.co"
SUPABASE_SERVICE_ROLE_KEY="eyJhbGciOi..."
SUPABASE_BUCKET_NAME="SustainAI-UserPhoto"

# ==============================================================================
# Autentikasi & Keamanan (JWT & Demo OTP)
# ==============================================================================
JWT_SECRET="super-secret-jwt-key-change-this-in-production"
DEMO_OTP_CODE="123456"

# ==============================================================================
# Aplikasi
# ==============================================================================
PUBLIC_APP_URL="http://localhost:5173"
```

| Variable                        |  Lingkungan   | Kegunaan & Keterangan                                                                     |
| :------------------------------ | :-----------: | :---------------------------------------------------------------------------------------- |
| `GEMINI_API_KEY_WASTE_ANALYZER` |  Server-side  | API key Gemini untuk analisis modul Waste Analyzer.                                       |
| `GEMINI_API_KEY_PLANT_ANALYZER` |  Server-side  | API key Gemini untuk analisis modul Plant Disease Analyzer.                               |
| `DATABASE_URL`                  |  Server-side  | Connection string PostgreSQL (kompatibel dengan Supabase pooler/direct connection).       |
| `SUPABASE_URL`                  |  Server-side  | URL project Supabase instance.                                                            |
| `SUPABASE_SERVICE_ROLE_KEY`     |  Server-side  | Secret key berprivilese penuh untuk mengunggah dan menghapus objek storage di Supabase.   |
| `SUPABASE_BUCKET_NAME`          |  Server-side  | Nama bucket public storage tempat penyimpanan file gambar (misal: `SustainAI-UserPhoto`). |
| `JWT_SECRET`                    |  Server-side  | Kunci enkripsi/signing token JWT sesi login pada HTTP-only cookie.                        |
| `DEMO_OTP_CODE`                 |  Server-side  | Kode OTP hardcode untuk demonstrasi verifikasi registrasi (`123456`).                     |
| `PUBLIC_APP_URL`                | Client/Server | Base URL aplikasi web SvelteKit.                                                          |

> **Penting:** Semua secret key di atas dikelola murni di sisi server SvelteKit dan tidak pernah dikirim ke browser client demi keamanan maksimal.

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

| Role           | Email / Username      | Password   | Deskripsi                                              |
| -------------- | --------------------- | ---------- | ------------------------------------------------------ |
| **User Biasa** | `user@genforces.com`  | `12345678` | Akses modul dashboard pengguna (`/dashboard/overview`) |
| **Admin**      | `admin@genforces.com` | `87654321` | Akses panel administrasi harga sampah (`/admin`)       |

> Akun ini disiapkan otomatis melalui database seeder (`npm run db:seed`) untuk keperluan demonstrasi dan pengujian MVP. Kredensial demo ini juga dapat diisi otomatis via tombol preset pada halaman `/get-started`.

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
