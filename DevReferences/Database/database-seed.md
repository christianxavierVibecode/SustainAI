# SustainAI — Database Seed Data

Dokumen ini berisi data dummy untuk seluruh tabel pada `schema.sql`. Data bank sampah, alamat, koordinat, dan harga di bawah **hanya data contoh untuk kebutuhan pengembangan/demo**, bukan informasi operasional yang telah diverifikasi.

> **Catatan implementasi:** Gunakan ID contoh secara konsisten saat memasukkan data. UUID pada tabel pengguna dan analisis dapat dibuat saat proses seed dijalankan. Password pada tabel `users` wajib berupa hash hasil algoritma password hashing (misalnya Argon2id atau bcrypt), bukan password teks biasa.

## 1. `users`

| id | username | email | password_hash | full_name | avatar_url | email_verified |
|---|---|---|---|---|---|---|
| `11111111-1111-4111-8111-111111111111` | genforce | genforce@example.test | `<HASH_PASSWORD_DEMO>` | GenForces Demo | `https://example.test/avatar/genforce.png` | true |
| `22222222-2222-4222-8222-222222222222` | sustain_user | user@example.test | `<HASH_PASSWORD_USER>` | SustainAI Demo User | NULL | true |

`created_at` dan `updated_at` menggunakan waktu saat seed dijalankan jika tidak ditentukan.

## 2. `waste_categories`

| id | name | description |
|---:|---|---|
| 1 | Plastik | Sampah berbahan dasar plastik yang dikelompokkan berdasarkan jenis resin dan ketebalannya. |
| 2 | Kertas dan Karton | Sampah berbahan serat kayu yang dapat diolah kembali menjadi bubur kertas. |
| 3 | Logam | Sampah berbahan besi atau non-besi yang dapat diproses untuk didaur ulang. |
| 4 | Kaca | Sampah berbahan kaca, baik berupa wadah utuh maupun pecahan. |
| 5 | Khusus | Sampah yang memerlukan penanganan khusus, seperti minyak goreng bekas. |

## 3. `waste_sub_categories`

Harga tidak disimpan di tabel ini. Harga per bank sampah disimpan di `waste_bank_prices` agar setiap bank dapat memiliki harga berbeda.

| id | category_id | name | description |
|---:|---:|---|---|
| 1 | 1 | PET / PETE (Kode 1) | Botol plastik bening bekas air mineral atau jus. |
| 2 | 1 | HDPE (Kode 2) | Plastik tebal dan kaku seperti botol sampo, deterjen, atau jeriken. |
| 3 | 1 | PP (Kode 5) | Gelas plastik, tutup botol, dan wadah makanan. |
| 4 | 1 | Plastik Campuran / Kerasan | Mainan plastik, baskom rusak, atau gantungan baju. |
| 5 | 2 | Kardus (Corrugated) | Kardus paket, kardus mi instan, atau kotak kemasan. |
| 6 | 2 | Kertas Putih / Arsip | Kertas HVS, dokumen kantor, atau buku tulis bekas. |
| 7 | 2 | Koran | Surat kabar bekas. |
| 8 | 2 | Dupleks / Buram | Kertas kemasan obat, kotak makanan, atau majalah berwarna. |
| 9 | 3 | Besi / Baja | Paku, pagar besi rusak, seng, atau pipa besi. |
| 10 | 3 | Aluminium | Kaleng minuman, kaleng susu, atau material aluminium. |
| 11 | 3 | Tembaga & Kuningan | Material tembaga dari kabel atau benda berbahan kuningan. |
| 12 | 4 | Botol Kaca Utuh | Botol kecap, sirup, atau selai yang tidak pecah. |
| 13 | 4 | Kaca Pecah (Beling) | Pecahan kaca bening atau berwarna. |
| 14 | 5 | Minyak Jelantah | Minyak goreng bekas untuk pengolahan lebih lanjut. |

## 4. `waste_banks`

Koordinat berikut merupakan placeholder ilustratif. Ganti dengan koordinat dan alamat bank sampah yang telah diverifikasi sebelum aplikasi digunakan secara publik.

| id | name | address | city | province | postal_code | latitude | longitude | phone | is_active |
|---:|---|---|---|---|---|---:|---:|---|---|
| 1 | Bank Sampah Demo Melati | Jl. Contoh Lingkungan No. 10 | Yogyakarta | DI Yogyakarta | 55111 | -7.7956 | 110.3695 | 080000000001 | true |
| 2 | Bank Sampah Demo Sejahtera | Jl. Contoh Hijau No. 25 | Yogyakarta | DI Yogyakarta | 55112 | -7.8014 | 110.3647 | 080000000002 | true |
| 3 | Bank Sampah Demo Lestari | Jl. Contoh Bersih No. 5 | Sleman | DI Yogyakarta | 55281 | -7.7167 | 110.3550 | 080000000003 | true |

`opening_hours` contoh:

```json
{
  "monday": "08:00-15:00",
  "tuesday": "08:00-15:00",
  "wednesday": "08:00-15:00",
  "thursday": "08:00-15:00",
  "friday": "08:00-11:00",
  "saturday": "08:00-12:00",
  "sunday": "closed"
}
```

## 5. `waste_bank_prices`

Seluruh harga dalam Rupiah (IDR). Unit `kg` berarti harga per kilogram. Nilai ini hanya contoh dataset demo.

| id | waste_bank_id | sub_category_id | price | unit | is_available | valid_from | source_note |
|---:|---:|---:|---:|---|---|---|---|
| 1 | 1 | 1 | 3500 | kg | true | 2026-01-01 | Harga dummy demo |
| 2 | 1 | 2 | 4000 | kg | true | 2026-01-01 | Harga dummy demo |
| 3 | 1 | 3 | 4500 | kg | true | 2026-01-01 | Harga dummy demo |
| 4 | 1 | 5 | 2500 | kg | true | 2026-01-01 | Harga dummy demo |
| 5 | 1 | 6 | 3000 | kg | true | 2026-01-01 | Harga dummy demo |
| 6 | 1 | 9 | 4500 | kg | true | 2026-01-01 | Harga dummy demo |
| 7 | 1 | 10 | 9000 | kg | true | 2026-01-01 | Harga dummy demo |
| 8 | 1 | 14 | 6000 | liter | true | 2026-01-01 | Harga dummy demo |
| 9 | 2 | 1 | 3200 | kg | true | 2026-01-01 | Harga dummy demo |
| 10 | 2 | 4 | 2000 | kg | true | 2026-01-01 | Harga dummy demo |
| 11 | 2 | 5 | 2700 | kg | true | 2026-01-01 | Harga dummy demo |
| 12 | 2 | 7 | 2200 | kg | true | 2026-01-01 | Harga dummy demo |
| 13 | 2 | 10 | 8800 | kg | true | 2026-01-01 | Harga dummy demo |
| 14 | 3 | 1 | 3600 | kg | true | 2026-01-01 | Harga dummy demo |
| 15 | 3 | 2 | 4100 | kg | true | 2026-01-01 | Harga dummy demo |
| 16 | 3 | 8 | 1300 | kg | true | 2026-01-01 | Harga dummy demo |
| 17 | 3 | 9 | 4600 | kg | true | 2026-01-01 | Harga dummy demo |
| 18 | 3 | 11 | 65000 | kg | true | 2026-01-01 | Harga dummy demo |
| 19 | 3 | 12 | 500 | kg | true | 2026-01-01 | Harga dummy demo |

## 6. `analysis_records`

Riwayat analisis menyimpan satu record untuk setiap permintaan analisis, baik modul sampah maupun tanaman. `result` menyimpan JSON tervalidasi dari Gemini. Kolom `image_url` dan `image_storage_key` bersifat opsional sesuai strategi penyimpanan gambar.

| id | user_id | analysis_type | status | image_url | ai_provider | ai_model | prompt_version | analyzed_at |
|---|---|---|---|---|---|---|---|---|
| `aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa` | `11111111-1111-4111-8111-111111111111` | waste | completed | `https://example.test/uploads/plastic-bottle.jpg` | Google Gemini | Gemini 3.6 Flash | waste-v1 | 2026-01-10T09:30:00Z |
| `bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb` | `11111111-1111-4111-8111-111111111111` | plant | completed | `https://example.test/uploads/tomato-leaf.jpg` | Google Gemini | Gemini 3.6 Flash | plant-v1 | 2026-01-11T10:15:00Z |
| `cccccccc-cccc-4ccc-8ccc-cccccccccccc` | `22222222-2222-4222-8222-222222222222` | waste | completed | `https://example.test/uploads/cardboard.jpg` | Google Gemini | Gemini 3.6 Flash | waste-v1 | 2026-01-12T13:00:00Z |

Contoh nilai `result` untuk record pertama:

```json
{
  "waste_name": "Botol plastik PET",
  "classification": "Plastik",
  "environmental_impact": "Dapat bertahan lama di lingkungan jika tidak dikelola dengan benar.",
  "recycling_tips": "Kosongkan isi botol, bilas, keringkan, dan pisahkan tutupnya sesuai ketentuan fasilitas daur ulang.",
  "is_recyclable": true
}
```

Contoh nilai `result` untuk record kedua:

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

## 7. `analysis_waste_details`

Data ringkas yang dinormalisasi untuk memudahkan filter, agregasi dashboard, dan pencarian kategori. `analysis_id` harus merujuk ke record dengan `analysis_type = waste`.

| analysis_id | sub_category_id | is_recyclable | detected_name | classification | environmental_impact | recycling_tips |
|---|---:|---|---|---|---|---|
| `aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa` | 1 | true | Botol plastik PET | Plastik | Dapat bertahan lama di lingkungan jika tidak dikelola. | Kosongkan, bilas, keringkan, lalu pilah sesuai ketentuan daur ulang. |
| `cccccccc-cccc-4ccc-8ccc-cccccccccccc` | 5 | true | Kardus bekas | Kertas dan Karton | Penumpukan kardus dapat menambah volume sampah. | Pastikan kardus kering, lipat, dan pisahkan dari kontaminan. |

## 8. `analysis_plant_details`

Data ringkas yang dinormalisasi untuk pencarian dan tampilan riwayat. `analysis_id` harus merujuk ke record dengan `analysis_type = plant`.

| analysis_id | plant_name | detected_pest_disease | symptoms | possible_cause | care_recommendation | prevention_tips | plant_impact |
|---|---|---|---|---|---|---|---|
| `bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb` | Tanaman tomat | Indikasi penyakit bercak daun | Terlihat bercak pada permukaan daun. | Kemungkinan infeksi patogen; perlu pemeriksaan lebih lanjut. | Pisahkan daun yang terdampak berat dan hindari membasahi daun saat penyiraman. | Jaga sirkulasi udara dan pantau kondisi tanaman secara berkala. | Gangguan berat dapat mengurangi luas daun sehat dan produktivitas tanaman. |

---

## Relasi Antar Tabel

```text
users
  └── 1 : N ── analysis_records
                  ├── 1 : 0..1 ── analysis_waste_details
                  └── 1 : 0..1 ── analysis_plant_details

waste_categories
  └── 1 : N ── waste_sub_categories
                  ├── 1 : N ── analysis_waste_details
                  └── 1 : N ── waste_bank_prices
                                      └── N : 1 ── waste_banks
```

## Catatan Penggunaan

1. `analysis_records` menjadi tabel utama riwayat dan menghubungkan hasil analisis dengan pemilik akun.
2. `result` bertipe JSONB menjaga respons AI lengkap, sedangkan tabel detail menyimpan kolom yang sering difilter atau diagregasi.
3. Detail waste dan plant dipisahkan agar kolom kedua jenis analisis tidak bercampur. Hanya tabel detail yang sesuai dengan `analysis_type` yang boleh diisi oleh aplikasi.
4. `waste_bank_prices` menghubungkan bank sampah dengan subkategori dan memungkinkan harga berbeda antarbank serta perubahan harga dari waktu ke waktu.
5. Overview dapat menghitung Total Analisis, Sampah Dianalisis, dan Tanaman Dianalisis dari `analysis_records`. Jumlah sampah berpotensi didaur ulang dapat dihitung dari `analysis_waste_details.is_recyclable`.
6. Grafik komposisi jenis sampah dapat dihitung dari `analysis_waste_details` dan `waste_sub_categories`. Grafik tren harga dapat menggunakan `waste_bank_prices`; untuk grafik historis yang akurat, simpan snapshot harga berkala karena tabel ini hanya menyimpan harga yang berlaku per periode.
7. Data dummy bank sampah dan harga harus diganti atau diverifikasi sebelum dipakai untuk memberikan rekomendasi nyata kepada pengguna.
