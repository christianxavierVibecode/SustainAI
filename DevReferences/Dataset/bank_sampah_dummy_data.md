# Data Dummy Bank Sampah

## 1. Tabel `categories`

| id (PK) | name | description |
| :--- | :--- | :--- |
| **1** | Plastik | Sampah berbahan dasar plastik yang dikelompokkan berdasarkan jenis resin dan ketebalannya. |
| **2** | Kertas dan Karton | Sampah berbahan serat kayu yang mudah dilebur kembali menjadi bubur kertas. |
| **3** | Logam | Sampah berbahan besi atau non-besi yang memiliki nilai jual relatif tinggi untuk peleburan ulang. |
| **4** | Kaca | Sampah berbahan kaca, baik dalam bentuk wadah utuh maupun pecahan (beling). |
| **5** | Khusus | Sampah kategori khusus yang memerlukan penanganan berbeda, seperti minyak goreng bekas. |

## 2. Tabel `sub_categories`

| id (PK) | category_id (FK) | name | description | price |
| :--- | :--- | :--- | :--- | :--- |
| **1** | 1 | PET / PETE (Kode 1) | Botol plastik bening/transparan bekas air mineral atau botol jus. | 3500 |
| **2** | 1 | HDPE (Kode 2) | Plastik tebal dan kaku seperti botol sampo, botol deterjen, atau jeriken. | 4000 |
| **3** | 1 | PP (Kode 5) | Gelas plastik bening, tutup botol, dan wadah makanan transparan. | 4500 |
| **4** | 1 | Plastik Campuran / Kerasan | Mainan plastik bekas, baskom rusak, atau gantungan baju. | 2000 |
| **5** | 2 | Kardus (Corrugated) | Kotak paket belanja online, kardus mi instan, atau kotak susu. | 2500 |
| **6** | 2 | Kertas Putih / Arsip | Kertas HVS bekas cetak, dokumen kantor, atau buku tulis bekas. | 3000 |
| **7** | 2 | Koran | Surat kabar bekas. | 2000 |
| **8** | 2 | Dupleks / Buram | Kertas kemasan obat, kotak jajan, atau majalah berwarna. | 1200 |
| **9** | 3 | Besi / Baja | Paku bekas, pagar besi rusak, seng, dan pipa besi. | 4500 |
| **10** | 3 | Aluminium | Kaleng minuman ringan, kaleng susu, atau wadah aluminium foil. | 9000 |
| **11** | 3 | Tembaga & Kuningan | Serabut bagian dalam kabel listrik atau keran air kuningan. | 65000 |
| **12** | 4 | Botol Kaca Utuh | Botol kecap, botol sirup, atau botol selai dalam kondisi tidak pecah. | 500 |
| **13** | 4 | Kaca Pecah (Beling) | Pecahan kaca bening atau berwarna yang akan dilebur ulang. | 200 |
| **14** | 5 | Minyak Jelantah | Minyak goreng bekas pakai untuk bahan baku biodiesel (per liter/kg). | 6000 |
