# SustainAI — Database Seed Data (MVP)

Data di bawah merupakan data dummy untuk pengembangan/demo, bukan data operasional yang telah diverifikasi. UUID akun dan analisis dapat dibuat saat proses seed dijalankan. `password_hash` wajib berisi hash password (Argon2id/bcrypt), bukan password plaintext.

## 1. `users`

Kolom mengikuti schema MVP: `id, email, password_hash, full_name, email_verified, created_at, updated_at`. kolom `id` menggunakan UUID v4

| id                                     | email               | password_hash                                                  | full_name            | user_role | email_verified | created_at             | updated_at             |
| -------------------------------------- | ------------------- | -------------------------------------------------------------- | -------------------- | --------- | -------------- | ---------------------- | ---------------------- |
| `abef1065-b725-4998-814a-65832ed042b4` | user@genforces.com  | `$2b$10$rKbHrfZce9MkU.J63NkJ5.GC.tH5Ef1Auu9zZQInDzY3F2SnP3cnm` | GenForces Demo User  | user      | true           | 2026-11-01 13:13:47+07 | 2026-11-01 18:13:44+07 |
| `1b3fac7c-68c6-4595-89cc-08951422f0ae` | admin@genforces.com | `$2b$10$3Om8d8PA7xai8B.yoAsOTewHscrL0ZQ0GwMw8fotyTccKhUZgA8EO` | SustainAI Demo Admin | admin     | true           | 2026-11-02 18:13:44+07 | 2026-11-02 18:13:44+07 |

## 2. `waste_categories`

|  id | name              | description                                                                                       |
| --: | ----------------- | ------------------------------------------------------------------------------------------------- |
|   1 | Plastik           | Sampah berbahan dasar plastik yang dikelompokkan berdasarkan jenis resin dan ketebalannya.        |
|   2 | Kertas dan Karton | Sampah berbahan serat kayu yang mudah dilebur kembali menjadi bubur kertas.                       |
|   3 | Logam             | Sampah berbahan besi atau non-besi yang memiliki nilai jual relatif tinggi untuk peleburan ulang. |
|   4 | Kaca              | Sampah berbahan kaca, baik dalam bentuk wadah utuh maupun pecahan (beling).                       |
|   5 | Khusus            | Sampah kategori khusus yang memerlukan penanganan berbeda, seperti minyak goreng bekas.           |

## 3. `waste_sub_categories`

Harga tidak lagi disimpan di tabel subkategori. Setiap observasi harga dicatat di `waste_price` dan direferensikan melalui `waste_sub_category_id`.

|  id | category_id | name                       | description                                                               | created_at             |
| --: | ----------: | -------------------------- | ------------------------------------------------------------------------- | ---------------------- |
|   1 |           1 | PET / PETE (Kode 1)        | Botol plastik bening/transparan bekas air mineral atau botol jus.         | 2026-11-09 16:17:06+07 |
|   2 |           1 | HDPE (Kode 2)              | Plastik tebal dan kaku seperti botol sampo, botol deterjen, atau jeriken. | 2026-11-09 16:17:06+07 |
|   3 |           1 | PP (Kode 5)                | Gelas plastik bening, tutup botol, dan wadah makanan transparan.          | 2026-11-09 16:17:06+07 |
|   4 |           1 | Plastik Campuran / Kerasan | Mainan plastik bekas, baskom rusak, atau gantungan baju.                  | 2026-11-09 16:17:06+07 |
|   5 |           2 | Kardus (Corrugated)        | Kotak paket belanja online, kardus mi instan, atau kotak susu.            | 2026-11-09 16:17:06+07 |
|   6 |           2 | Kertas Putih / Arsip       | Kertas HVS bekas cetak, dokumen kantor, atau buku tulis bekas.            | 2026-11-09 16:17:06+07 |
|   7 |           2 | Koran                      | Surat kabar bekas.                                                        | 2026-11-09 16:17:06+07 |
|   8 |           2 | Dupleks / Buram            | Kertas kemasan obat, kotak jajan, atau majalah berwarna.                  | 2026-11-09 16:17:06+07 |
|   9 |           3 | Besi / Baja                | Paku bekas, pagar besi rusak, seng, dan pipa besi.                        | 2026-11-09 16:17:06+07 |
|  10 |           3 | Aluminium                  | Kaleng minuman ringan, kaleng susu, atau wadah aluminium foil.            | 2026-11-09 16:17:06+07 |
|  11 |           3 | Tembaga & Kuningan         | Serabut bagian dalam kabel listrik atau keran air kuningan.               | 2026-11-09 16:17:06+07 |
|  12 |           4 | Botol Kaca Utuh            | Botol kecap, botol sirup, atau botol selai dalam kondisi tidak pecah.     | 2026-11-09 16:17:06+07 |
|  13 |           4 | Kaca Pecah (Beling)        | Pecahan kaca bening atau berwarna yang akan dilebur ulang.                | 2026-11-09 16:17:06+07 |
|  14 |           5 | Minyak Jelantah            | Minyak goreng bekas pakai untuk bahan baku biodiesel (per liter/kg).      | 2026-11-09 16:17:06+07 |

## 4. `waste_price`

Untuk kebutuhan visualisasi diagram garis, setiap subkategori memiliki tiga record harga pada minggu yang berbeda. Perubahan harga dan tanggal berikut merupakan data simulasi, bukan riwayat harga aktual.

Setiap perubahan harga disimpan sebagai record baru. Oleh karena itu, tabel `waste_price` hanya menggunakan kolom `created_at` sebagai waktu pencatatan dan tidak memerlukan `updated_at`.

| ID  | waste_sub_category_id | Price (IDR) | created_at             |
| --- | --------------------- | ----------- | ---------------------- |
| 1   | 1                     | 2.500       | 2026-08-18 14:17:00+07 |
| 2   | 6                     | 4.800       | 2026-08-19 08:24:00+07 |
| 3   | 8                     | 700         | 2026-08-20 12:41:00+07 |
| 4   | 13                    | 450         | 2026-08-21 16:26:00+07 |
| 5   | 4                     | 3.800       | 2026-08-22 09:58:00+07 |
| 6   | 9                     | 2.200       | 2026-08-23 13:33:00+07 |
| 7   | 1                     | 5.200       | 2026-08-24 10:06:00+07 |
| 8   | 7                     | 800         | 2026-08-25 15:14:00+07 |
| 9   | 12                    | 1.100       | 2026-08-26 11:52:00+07 |
| 10  | 5                     | 4.900       | 2026-08-27 08:39:00+07 |
| 11  | 9                     | 6.800       | 2026-08-28 14:55:00+07 |
| 12  | 2                     | 2.100       | 2026-08-29 12:27:00+07 |
| 13  | 14                    | 9.500       | 2026-08-30 09:44:00+07 |
| 14  | 6                     | 1.900       | 2026-08-31 16:09:00+07 |
| 15  | 11                    | 38.000      | 2026-09-01 10:31:00+07 |
| 16  | 3                     | 7.200       | 2026-09-02 13:18:00+07 |
| 17  | 8                     | 2.100       | 2026-09-03 08:56:00+07 |
| 18  | 13                    | 80          | 2026-09-04 15:41:00+07 |
| 19  | 4                     | 1.500       | 2026-09-05 11:07:00+07 |
| 20  | 10                    | 14.500      | 2026-09-06 14:23:00+07 |
| 21  | 2                     | 5.800       | 2026-09-07 09:12:00+07 |
| 22  | 7                     | 3.200       | 2026-09-08 16:34:00+07 |
| 23  | 12                    | 250         | 2026-09-09 12:03:00+07 |
| 24  | 5                     | 1.200       | 2026-09-10 10:46:00+07 |
| 25  | 10                    | 5.500       | 2026-09-11 15:29:00+07 |
| 26  | 3                     | 2.800       | 2026-09-12 08:17:00+07 |
| 27  | 14                    | 3.200       | 2026-09-13 13:52:00+07 |
| 28  | 6                     | 6.500       | 2026-09-14 11:38:00+07 |
| 29  | 8                     | 450         | 2026-09-15 16:11:00+07 |
| 30  | 11                    | 85.000      | 2026-09-16 09:26:00+07 |
| 31  | 2                     | 1.800       | 2026-09-17 14:47:00+07 |
| 32  | 13                    | 600         | 2026-09-18 10:19:00+07 |
| 33  | 4                     | 4.500       | 2026-09-19 17:05:00+07 |
| 34  | 9                     | 3.100       | 2026-09-20 12:32:00+07 |
| 35  | 7                     | 1.100       | 2026-09-21 08:43:00+07 |
| 36  | 12                    | 1.400       | 2026-09-22 15:16:00+07 |
| 37  | 10                    | 11.800      | 2026-09-23 10:54:00+07 |
| 38  | 1                     | 1.600       | 2026-09-24 13:21:00+07 |
| 39  | 5                     | 5.800       | 2026-09-25 09:37:00+07 |
| 40  | 14                    | 15.000      | 2026-09-26 14:08:00+07 |
| 41  | 3                     | 5.500       | 2026-09-27 11:15:00+07 |
| 42  | 11                    | 42.000      | 2026-09-28 16:42:00+07 |

## 5. `analysis_records`

Contoh data mengikuti struktur sebelumnya. Hasil JSON tervalidasi Gemini disimpan pada `result`, format penamaan pada kolom `image_path` menggunakan format `<<analysis_records.id>>_<<analysis_records.analysis_type>>_<<unix-timestamp>>.<<format gambar>>`;

| id                                     | user_id                                | analysis_type | status    | image_path                                                                 | ai_provider   | ai_model         | prompt_version | created_at             |
| -------------------------------------- | -------------------------------------- | ------------- | --------- | -------------------------------------------------------------------------- | ------------- | ---------------- | -------------- | ---------------------- |
| `f1221e2a-0dfe-4b81-b6d0-76e536cfc2df` | `abef1065-b725-4998-814a-65832ed042b4` | waste         | completed | `waste-analysis/f1221e2a-0dfe-4b81-b6d0-76e536cfc2df_waste_1794232269.jpg` | Google Gemini | gemini-3.5-flash | waste-v1       | 2026-09-28 16:42:00+07 |
| `30c5493e-3e47-44ea-bab7-13cfa97536cb` | `abef1065-b725-4998-814a-65832ed042b4` | plant         | completed | `plant-analysis/30c5493e-3e47-44ea-bab7-13cfa97536cb_plant_1794232290.jpg` | Google Gemini | gemini-3.5-flash | plant-v1       | 2026-09-29 11:12:00+07 |
| `49927af5-d976-4fae-9a2d-b216c649a966` | `abef1065-b725-4998-814a-65832ed042b4` | waste         | completed | `waste-analysis/49927af5-d976-4fae-9a2d-b216c649a966_plant_1794232290.jpg` | Google Gemini | gemini-3.5-flash | waste-v1       | 2026-09-30 13:22:00+07 |

Contoh `result` untuk analisis sampah:

```json
{
  "waste_name": "Botol plastik PET",
  "classification": "Plastik",
  "environmental_impact": "Dapat bertahan lama di lingkungan jika tidak dikelola dengan benar.",
  "recycling_tips": "Kosongkan isi botol, bilas, keringkan, dan pisahkan tutupnya sesuai ketentuan fasilitas daur ulang.",
  "is_recyclable": true
}
```

Contoh `result` untuk analisis tanaman:

```json
{
  "plant_name": "Tanaman tomat",
  "detected_pest_disease": "Indikasi penyakit bercak daun",
  "symptoms": "Terlihat bercak pada permukaan daun.",
  "possible_cause": "Kemungkinan infeksi patogen; perlu pemeriksaan lebih lanjut.",
  "care_recommendation": "Pisahkan daun yang terdampak berat dan hindari membasahi daun saat penyiraman.",
  "prevention_tips": "Jaga sirkulasi udara dan pantau kondisi tanaman secara berkala.",
  "plant_impact": "Gangguan berat dapat mengurangi luas daun sehat dan produktivitas tanaman."
}
```

## 6. `analysis_waste_details`

| analysis_id                            | sub_category_id | is_recyclable | detected_name     | classification    | environmental_impact                                   | recycling_tips                                                       |
| -------------------------------------- | --------------: | ------------- | ----------------- | ----------------- | ------------------------------------------------------ | -------------------------------------------------------------------- |
| `f1221e2a-0dfe-4b81-b6d0-76e536cfc2df` |               1 | true          | Botol plastik PET | Plastik           | Dapat bertahan lama di lingkungan jika tidak dikelola. | Kosongkan, bilas, keringkan, lalu pilah sesuai ketentuan daur ulang. |
| `49927af5-d976-4fae-9a2d-b216c649a966` |               5 | true          | Kardus bekas      | Kertas dan Karton | Penumpukan kardus dapat menambah volume sampah.        | Pastikan kardus kering, lipat, dan pisahkan dari kontaminan.         |

`analysis_id` harus merujuk ke `analysis_records` dengan `analysis_type = 'waste'`.

## 7. `analysis_plant_details`

| analysis_id                            | plant_name    | detected_pest_disease         | symptoms                             | possible_cause                                               | care_recommendation                                                            | prevention_tips                                                 | plant_impact                                                               |
| -------------------------------------- | ------------- | ----------------------------- | ------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------------------------ | --------------------------------------------------------------- | -------------------------------------------------------------------------- |
| `30c5493e-3e47-44ea-bab7-13cfa97536cb` | Tanaman tomat | Indikasi penyakit bercak daun | Terlihat bercak pada permukaan daun. | Kemungkinan infeksi patogen; perlu pemeriksaan lebih lanjut. | Pisahkan daun yang terdampak berat dan hindari membasahi daun saat penyiraman. | Jaga sirkulasi udara dan pantau kondisi tanaman secara berkala. | Gangguan berat dapat mengurangi luas daun sehat dan produktivitas tanaman. |

`analysis_id` harus merujuk ke `analysis_records` dengan `analysis_type = 'plant'`.

## Relasi antar tabel

```text
users
  └── 1:N ── analysis_records
                 ├── 1:0..1 ── analysis_waste_details
                 └── 1:0..1 ── analysis_plant_details

waste_categories
  └── 1:N ── waste_sub_categories
                 ├── 1:N ── analysis_waste_details
                 └── 1:N ── waste_price
```

## Catatan MVP

- `analysis_records` adalah tabel induk riwayat dan menghubungkan analisis dengan pemilik akun.
- `result` menyimpan respons AI lengkap; tabel detail menampung atribut yang perlu difilter/diagregasi.
- Data detail waste dan plant dipisahkan; isi tabel detail harus sesuai dengan `analysis_type`.
- `waste_price` adalah data harga umum per subkategori, bukan harga yang ditawarkan oleh bank sampah tertentu.
- Untuk grafik harga historis, ambil record berdasarkan `waste_sub_category_id` dan urutkan `created_at` secara ascending. Harga baru harus ditambahkan sebagai baris baru, bukan mengubah baris lama.
