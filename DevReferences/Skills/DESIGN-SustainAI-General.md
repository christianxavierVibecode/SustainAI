# DESIGN-SustainAI.md

Panduan sistem desain **SustainAI – Sustainability & Waste Intelligence Platform**.
Dokumen ini adalah acuan tetap untuk seluruh halaman aplikasi. Manusia dan agen AI wajib mengikutinya saat membuat atau mengubah halaman apa pun.

---

## 1. Identitas visual

Karakter: **eco-tech yang bersih, tenang, dan berbasis data**. Latar terang abu-kebiruan, permukaan putih, aksen hijau zamrud. Warna dipakai untuk makna, bukan dekorasi.

Prinsip:

1. **Hijau adalah identitas dan aksi utama.** `primary` hanya untuk aksi utama, status aktif, dan data positif.
2. **Warna membawa makna.** Setiap kategori dan status punya warna tetap di seluruh aplikasi. Tidak boleh dipakai silang.
3. **Permukaan putih di atas kanvas abu muda.** Hierarki dibentuk oleh border tipis dan bayangan halus, bukan latar pekat.
4. **Angka adalah bintang.** Metrik ditampilkan besar dan tebal, satuan kecil dan redup.
5. **Lega tapi padat informasi.** Radius besar, padding lega, jarak antarelemen konsisten.
6. **Interaksi halus dan cepat.** Transisi singkat, tanpa animasi dekoratif.
7. **Mobile-first.** Setiap tampilan harus berfungsi dari lebar 375 px hingga desktop.

---

## 2. Palet warna

### 2.1 Brand

| Variabel             | Hex       | Peran                                                   |
| -------------------- | --------- | ------------------------------------------------------- |
| `primary`            | `#006948` | Aksi utama, item aktif, seri data utama, teks penekanan |
| `primary-container`  | `#00855d` | Varian hijau lebih terang untuk kontainer               |
| `brand-emerald-dark` | `#047857` | Keadaan hover untuk `primary`                           |
| `brand-forest`       | `#064E3B` | Teks di atas latar mint, warna teks seleksi             |
| `brand-mint`         | `#34D399` | Seri data sekunder, highlight seleksi                   |
| `brand-mint-subtle`  | `#ECFDF5` | Latar item aktif, chip positif, tile ikon               |
| `border-focus`       | `#10B981` | Cincin fokus, penanda status online, garis aksen        |

### 2.2 Semantik (solid + subtle)

Warna solid untuk teks dan ikon. Warna subtle untuk latar. Selalu dipakai berpasangan.

| Makna               | Solid                      | Hex                   | Subtle                | Hex       |
| ------------------- | -------------------------- | --------------------- | --------------------- | --------- |
| Sukses / daur ulang | `primary` / `brand-forest` | `#006948` / `#064E3B` | `brand-mint-subtle`   | `#ECFDF5` |
| Kompos / organik    | `accent-teal`              | `#0F766E`             | `accent-teal-subtle`  | `#CCFBF1` |
| Info                | `info-sky`                 | `#0284C7`             | `info-sky-subtle`     | `#E0F2FE` |
| Peringatan          | `accent-amber`             | `#F59E0B`             | `accent-amber-subtle` | `#FEF3C7` |
| Bahaya / B3         | `danger-rose`              | `#E11D48`             | `danger-rose-subtle`  | `#FFE4E6` |

### 2.3 Netral

| Variabel              | Hex       | Peran                                            |
| --------------------- | --------- | ------------------------------------------------ |
| `surface-base`        | `#F8FAFC` | Latar halaman                                    |
| `surface-card`        | `#FFFFFF` | Permukaan: kartu, panel, navigasi, modal, menu   |
| `surface-card-subtle` | `#F1F5F9` | Track progress, chip netral, latar ikon netral   |
| `text-strong`         | `#0F172A` | Judul, angka, isi utama, tooltip (sebagai latar) |
| `text-muted`          | `#64748B` | Deskripsi, label, satuan, ikon nonaktif          |
| `border-subtle`       | `#E2E8F0` | Semua garis pemisah dan kontur permukaan         |

Abu tambahan untuk seri data residual: `slate-200`, `slate-300`, `slate-400` dari palet slate standar.

### 2.4 Palet tambahan (cadangan)

Dipakai hanya bila token di atas tidak cukup (misalnya status error sistem atau kebutuhan dark mode kelak).

| Kelompok            | Variabel dan hex                                                                                                                                                                                                                                                                                                                           |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Permukaan           | `background` `#f8f9ff`, `surface` `#f8f9ff`, `surface-bright` `#f8f9ff`, `surface-dim` `#cbdbf5`, `surface-tint` `#006c4a`, `surface-container-lowest` `#ffffff`, `surface-container-low` `#eff4ff`, `surface-container` `#e5eeff`, `surface-container-high` `#dce9ff`, `surface-container-highest` `#d3e4fe`, `surface-variant` `#d3e4fe` |
| Teks pada permukaan | `on-surface` `#0b1c30`, `on-surface-variant` `#3d4a42`, `on-background` `#0b1c30`                                                                                                                                                                                                                                                          |
| Inverse             | `inverse-surface` `#213145`, `inverse-on-surface` `#eaf1ff`, `inverse-primary` `#68dba9`                                                                                                                                                                                                                                                   |
| Garis               | `outline` `#6d7a72`, `outline-variant` `#bccac0`                                                                                                                                                                                                                                                                                           |
| Primary lanjutan    | `on-primary` `#ffffff`, `on-primary-container` `#f5fff7`, `primary-fixed` `#85f8c4`, `primary-fixed-dim` `#68dba9`, `on-primary-fixed` `#002114`, `on-primary-fixed-variant` `#005137`                                                                                                                                                     |
| Secondary           | `secondary` `#006a61`, `on-secondary` `#ffffff`, `secondary-container` `#86f2e4`, `on-secondary-container` `#006f66`, `secondary-fixed` `#89f5e7`, `secondary-fixed-dim` `#6bd8cb`, `on-secondary-fixed` `#00201d`, `on-secondary-fixed-variant` `#005049`                                                                                 |
| Tertiary            | `tertiary` `#8d4b00`, `on-tertiary` `#ffffff`, `tertiary-container` `#b15f00`, `on-tertiary-container` `#fffbff`, `tertiary-fixed` `#ffdcc3`, `tertiary-fixed-dim` `#ffb77d`, `on-tertiary-fixed` `#2f1500`, `on-tertiary-fixed-variant` `#6e3900`                                                                                         |
| Error               | `error` `#ba1a1a`, `on-error` `#ffffff`, `error-container` `#ffdad6`, `on-error-container` `#93000a`                                                                                                                                                                                                                                       |

### 2.5 Aturan pemakaian warna

1. **Kategori sampah tetap di seluruh aplikasi:**

   | Kategori                | Warna                                     |
   | ----------------------- | ----------------------------------------- |
   | Recyclable / daur ulang | `primary`, latar `brand-mint-subtle`      |
   | Compost / organik       | `accent-teal`, latar `accent-teal-subtle` |
   | Hazardous / B3          | `danger-rose`, latar `danger-rose-subtle` |
   | Kertas (visualisasi)    | `accent-amber`                            |
   | Landfill / residual     | abu slate                                 |

2. **Seri visualisasi data:**

   | Seri                 | Variabel              | Hex                          |
   | -------------------- | --------------------- | ---------------------------- |
   | Recyclable / Plastik | `primary`             | `#006948`                    |
   | Compost / Organik    | `brand-mint`          | `#34D399`                    |
   | Kertas               | `accent-amber`        | `#F59E0B`                    |
   | Landfill / lainnya   | slate                 | `slate-200` s.d. `slate-400` |
   | Track / latar grafik | `surface-card-subtle` | `#F1F5F9`                    |

   Satu seri memakai satu warna yang sama di grafik, legenda, dan ringkasan.

3. Latar chip, badge, dan tile ikon memakai token `*-subtle`. Teks dan ikon di atasnya memakai token solid pasangannya.
4. Dilarang memakai hex mentah di luar palet ini.
5. Warna tidak boleh menjadi satu-satunya penanda makna. Sertakan selalu teks atau ikon.
6. `accent-amber` hanya untuk isian, ikon, dan bar. Teks kecil bernuansa peringatan memakai `tertiary` (`#8d4b00`) karena kontras `accent-amber` di atas putih hanya sekitar 2:1.
7. Aksi destruktif memakai `danger-rose`. Aksi utama memakai `primary`. Satu area hanya punya satu aksi utama.

---

## 3. Tipografi

Dua keluarga font:

- **Plus Jakarta Sans** (bobot 500–800): judul, angka metrik, display.
- **Inter** (bobot 400–700): isi teks dan label.
- Cadangan: `sans-serif`. Kode memakai `monospace`.

Skala (setiap token mengikat ukuran, tinggi baris, letter-spacing, dan bobot):

| Token                 | Ukuran / tinggi baris | Letter-spacing | Bobot | Font              | Pemakaian                                |
| --------------------- | --------------------- | -------------- | ----- | ----------------- | ---------------------------------------- |
| `display-hero`        | 48 / 56 px            | -0.025em       | 800   | Plus Jakarta Sans | Hero, halaman pembuka                    |
| `display-hero-mobile` | 32 / 40 px            | -0.02em        | 800   | Plus Jakarta Sans | Hero di mobile                           |
| `metric-display`      | 32 / 36 px            | -0.02em        | 800   | Plus Jakarta Sans | Angka metrik utama                       |
| `headline-xl`         | 36 / 44 px            | -0.02em        | 700   | Plus Jakarta Sans | Judul halaman besar                      |
| `headline-xl-mobile`  | 26 / 32 px            | -0.015em       | 700   | Plus Jakarta Sans | Varian mobile                            |
| `headline-lg`         | 28 / 36 px            | -0.015em       | 700   | Plus Jakarta Sans | Judul halaman standar                    |
| `headline-lg-mobile`  | 22 / 28 px            | -0.01em        | 700   | Plus Jakarta Sans | Varian mobile                            |
| `headline-md`         | 20 / 28 px            | -0.01em        | 600   | Plus Jakarta Sans | Judul bagian/panel, logo teks            |
| `headline-sm`         | 16 / 24 px            | 0              | 600   | Plus Jakarta Sans | Judul kecil, judul dialog                |
| `body-lg`             | 18 / 28 px            | -0.005em       | 400   | Inter             | Paragraf pembuka                         |
| `body-md`             | 15 / 22 px            | 0              | 400   | Inter             | Isi teks standar, subjudul               |
| `body-sm`             | 13 / 18 px            | 0.005em        | 400   | Inter             | Deskripsi, isi tabel                     |
| `label-lg`            | 14 / 20 px            | 0.01em         | 600   | Inter             | Label penting, breadcrumb                |
| `label-md`            | 12 / 16 px            | 0.02em         | 600   | Inter             | Navigasi, label metrik, tombol           |
| `label-sm`            | 11 / 14 px            | 0.03em         | 500   | Inter             | Legenda, meta waktu, badge, header tabel |
| `code-mono`           | 12 / 16 px            | 0              | 500   | monospace         | ID, kode                                 |

Aturan:

1. Judul halaman memakai `headline-lg`, judul bagian memakai `headline-md`, subjudul memakai `body-md` atau `body-sm` berwarna `text-muted`.
2. Angka metrik memakai `metric-display`. Satuannya memakai `body-md`, bobot medium, `text-muted`, sejajar baseline.
3. Header kolom tabel memakai `label-sm`, huruf kapital, `text-muted`.
4. `label-sm` (11 px) hanya untuk metadata, bukan konten utama.
5. Penyesuaian bobot lokal (semibold, bold, extrabold) boleh untuk penekanan, tanpa mengubah ukuran token.
6. Teks yang bisa panjang dipotong dengan ellipsis, bukan dikecilkan.

---

## 4. Spasi

Skala dasar: kelipatan 4 px.

| Variabel        | Nilai | Pemakaian                                 |
| --------------- | ----- | ----------------------------------------- |
| `space-xs`      | 4 px  | Jarak sangat rapat                        |
| `space-sm`      | 8 px  | Jarak ikon–teks rapat, antar-elemen kecil |
| `space-md`      | 16 px | Jarak dasar antarelemen, margin mobile    |
| `space-lg`      | 24 px | Jarak antarbagian, gutter                 |
| `space-xl`      | 40 px | Jarak antar-area besar                    |
| `gutter`        | 24 px | Jarak antarkolom/kartu (desktop)          |
| `gutter-mobile` | 12 px | Jarak antarkolom/kartu (mobile)           |
| `margin`        | 32 px | Margin halaman (desktop)                  |
| `margin-mobile` | 16 px | Margin halaman (mobile)                   |

Ritme yang dipakai di aplikasi:

| Konteks                                  | Nilai                                           |
| ---------------------------------------- | ----------------------------------------------- |
| Padding halaman                          | 16 px (mobile), 24 px (tablet), 32 px (desktop) |
| Jarak antarbagian vertikal               | 24 px                                           |
| Padding permukaan ringkas (kartu metrik) | 20 px                                           |
| Padding permukaan standar (panel)        | 24 px                                           |
| Jarak antarpermukaan dalam satu baris    | 20–24 px                                        |
| Jarak ikon–teks                          | 8–12 px                                         |
| Padding sel/baris tabel                  | 12 px                                           |

Gunakan hanya nilai dari skala ini. Tidak ada angka spasi acak.

---

## 5. Radius

| Variabel         | Nilai   | Dipakai untuk                                          |
| ---------------- | ------- | ------------------------------------------------------ |
| `radius-default` | 4 px    | Elemen sangat kecil                                    |
| `radius-md`      | 6 px    | Tombol ikon kecil                                      |
| `radius-lg`      | 8 px    | Tombol, item navigasi, menu, tooltip, input, thumbnail |
| `radius-xl`      | 12 px   | Kontrol berkelompok, tile ikon, logo                   |
| `radius-2xl`     | 16 px   | Kartu, panel, modal (permukaan utama)                  |
| `radius-full`    | 9999 px | Badge, pill, avatar, titik status, progress bar        |

Batang grafik memakai radius 6 px hanya pada sisi atas.

---

## 6. Elevasi dan bayangan

| Variabel            | Nilai                                                                     | Dipakai untuk                                           |
| ------------------- | ------------------------------------------------------------------------- | ------------------------------------------------------- |
| `shadow-eco-subtle` | `0 1px 3px 0 rgba(15,23,42,.05), 0 1px 2px -1px rgba(15,23,42,.05)`       | Keadaan normal semua permukaan (kartu, panel)           |
| `shadow-eco-hover`  | `0 10px 15px -3px rgba(5,150,105,.06), 0 4px 6px -4px rgba(15,23,42,.04)` | Hover pada permukaan interaktif (bayangan hijau lembut) |
| `shadow-sm`         | `0 1px 3px 0 rgb(0 0 0/.1), 0 1px 2px -1px rgb(0 0 0/.1)`                 | Bilah navigasi tetap                                    |
| `shadow-lg`         | `0 10px 15px -3px rgb(0 0 0/.1), 0 4px 6px -4px rgb(0 0 0/.1)`            | Menu dropdown, tooltip, toast                           |
| `shadow-xl`         | `0 20px 25px -5px rgb(0 0 0/.1), 0 8px 10px -6px rgb(0 0 0/.1)`           | Modal/dialog                                            |

Permukaan selalu memakai kombinasi **border `border-subtle` + bayangan**. Overlay (di belakang modal) memakai hitam 40% opasitas, dan overlay navigasi mobile memakai slate gelap 40% dengan blur.

---

## 7. Ikonografi

1. Satu set ikon: **Material Symbols Outlined**. Tidak boleh mencampur pustaka ikon lain.
2. Gaya default garis (fill 0, bobot 400). Gaya terisi (fill 1) hanya untuk penanda **status aktif** pada navigasi.
3. Ukuran baku: 24 px (kontrol navigasi utama), 20 px (navigasi, tile ikon, tombol ikon), 18 px (ikon pendamping label, ikon status), 16 px (item menu), 14 px (di dalam pill dan link).
4. Warna ikon mengikuti teks di sekitarnya atau token semantik. Ikon netral/nonaktif memakai `text-muted`.
5. Tile ikon: kotak 36 px, radius 12 px, latar `*-subtle`, ikon solid pasangannya. Warna tile menunjukkan makna: mint (volume), teal (diversi/organik), sky (karbon/info), netral (sistem/perangkat).
6. Logo: ubin 40 px, radius 12 px, latar `brand-mint-subtle`, border `border-focus` 20% opasitas. Teks "SustainAI" memakai `headline-md` berwarna `primary`, tagline "Intelligence Platform" memakai `label-sm` `text-muted`.

---

## 8. Motion

| Interaksi                             | Durasi                 | Catatan                                           |
| ------------------------------------- | ---------------------- | ------------------------------------------------- |
| Perubahan warna/latar saat hover      | 150 ms                 | Easing standar                                    |
| Tombol utama (hover dan tekan)        | 150 ms ease-in-out     | Saat ditekan skala 95%                            |
| Bayangan dan kenaikan hover permukaan | 200 ms                 | Beralih `shadow-eco-subtle` ke `shadow-eco-hover` |
| Panel masuk/keluar dari tepi (drawer) | 300 ms ease-out        |                                                   |
| Perubahan tinggi batang grafik        | 350 ms ease            |                                                   |
| Toast masuk/keluar                    | 200 ms                 | Naik/turun 8 px + fade, tampil ±3 detik           |
| Indikator "live"                      | berulang               | Efek ping pada titik status                       |
| Proses pemindaian                     | 1,1 s linear, berulang | Sapuan gradien mint transparan                    |

Aturan:

1. Durasi transisi UI maksimal 350 ms.
2. Animasi berulang hanya untuk status "live" atau "sedang memproses".
3. Hormati preferensi _reduced motion_: animasi berulang dimatikan.
4. Scroll ke anchor berjalan halus dengan offset agar tidak tertutup navigasi atas.

---

## 9. Konten dan suara antarmuka

1. Bahasa UI default: **Bahasa Indonesia**, ringkas, profesional, berorientasi data.
2. _Title Case_ untuk nama fitur dan judul bagian. _Sentence case_ untuk deskripsi dan pesan.

---

## 10. Aksesibilitas

1. Semua kontrol interaktif bisa difokus keyboard dengan indikator fokus terlihat (cincin `border-focus`).
2. Tombol yang hanya berisi ikon wajib memiliki label teks alternatif.
3. Warna bukan satu-satunya penanda makna (lihat 2.5).
4. Kontras teks minimal 4,5:1. `text-muted` di atas putih sudah memenuhi. `accent-amber` tidak boleh dipakai sebagai teks kecil.
5. Target sentuh minimal sekitar 36 × 36 px.
6. Grafik wajib punya deskripsi ringkas atau alternatif data (tabel).
7. Dialog memindahkan fokus ke dalamnya saat dibuka dan mengembalikannya saat ditutup. Dialog bisa ditutup dengan Escape.
8. Halaman bertanda bahasa dokumen yang benar dan item navigasi aktif ditandai sebagai halaman saat ini.

---

## 11. Tema

Aplikasi saat ini **hanya tema terang**. Dark mode belum didefinisikan. Bila kelak ditambahkan, mulai dari `inverse-surface` dan `inverse-on-surface`, lalu uji ulang kontras semua pasangan solid/subtle.

---

## 12. Aturan untuk agen AI dan pembuat halaman

**Wajib**

1. Pakai hanya variabel dan hex dari bagian 2 untuk warna, bagian 3 untuk tipografi, bagian 4 untuk spasi, bagian 5 untuk radius, dan bagian 6 untuk bayangan.
2. Pertahankan makna warna kategori sampah dan status (2.5) di setiap halaman.
3. Permukaan konten selalu: latar `surface-card`, border `border-subtle`, radius 16 px, `shadow-eco-subtle`.
4. Latar halaman selalu `surface-base`. Teks utama `text-strong`, teks sekunder `text-muted`.
5. Status dan kategori ditampilkan sebagai pill: latar `*-subtle`, teks solid pasangannya, radius penuh, bobot semibold, `label-sm`.
6. Hanya satu aksi utama (`primary`) per area. Aksi berbahaya memakai `danger-rose`.
7. Ikon hanya dari Material Symbols Outlined, mengikuti ukuran di bagian 7.
8. Angka metrik memakai `metric-display` dengan satuan dan konteks (bagian 3 dan 9).
9. Rancang mobile-first dan pastikan tidak ada scroll horizontal pada halaman. Konten lebar (tabel, grafik) bergulir di dalam wadahnya sendiri.
10. Identitas bersama (logo, nama platform, pola navigasi, footer kredit) identik di semua halaman.

**Dilarang**

1. Menambah warna, font, radius, atau bayangan baru di luar dokumen ini. Bila memang perlu, perbarui dokumen ini terlebih dahulu.
2. Memakai hex mentah di luar palet.
3. Memakai `accent-amber` sebagai warna teks kecil di atas putih.
4. Mengubah warna kategori Recyclable, Compost, atau Hazardous.
5. Memakai pustaka ikon lain, ilustrasi dekoratif, atau emoji di luar aturan 9.6.
6. Memakai lebih dari satu aksi utama dalam satu area.
7. Membuat animasi berulang yang tidak terkait status "live" atau "memproses".
8. Menyampaikan makna hanya dengan warna.

**Checklist sebelum halaman diserahkan**

- [ ] Semua warna, teks, spasi, radius, dan bayangan berasal dari dokumen ini.
- [ ] Hierarki tipografi benar: judul halaman, judul bagian, isi, meta.
- [ ] Kategori dan status memakai warna serta label yang tepat.
- [ ] Tampilan benar di 375 px, 768 px, dan 1280 px.
- [ ] Fokus keyboard terlihat, ikon-saja punya label, kontras terpenuhi.
- [ ] Transisi mengikuti tabel motion dan menghormati _reduced motion_.# DESIGN-SustainAI.md

Panduan sistem desain **SustainAI – Sustainability & Waste Intelligence Platform**.
Dokumen ini adalah acuan tetap untuk seluruh halaman aplikasi. Manusia dan agen AI wajib mengikutinya saat membuat atau mengubah halaman apa pun.

---
