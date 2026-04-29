import { LearningMaterial } from '../types/learning';

export const MOCK_MATERIALS: LearningMaterial[] = [
  // ==================== PYTHON DATA ANALYSIS MATERIALS ====================
  {
    id: 'py-da-01',
    user_type: 'student',
    language: 'py-da',
    title: 'Modul 1: Pengenalan Data Analysis dengan Python',
    description: 'Kenapa Python menjadi standar di industri data? Mengenal ekosistem Data Science (NumPy, Pandas, Matplotlib) dan pengenalan Jupyter Notebook.',
    content: `# 📊 Modul 1: Pengenalan Data Analysis dengan Python

Selamat datang di dunia Data Analysis! Di era digital ini, data adalah "minyak" baru, dan Python adalah alat kilang terbaiknya.

## 1. Kenapa Python untuk Data Analysis?
- **Mudah dipelajari:** Sintaks Python bersih dan fokus pada penyelesaian masalah.
- **Ekosistem Kuat:** Memiliki library lengkap (Data Wrangling hingga Machine Learning).
- **Integrasi Penuh:** Mudah dihubungkan dengan Database (SQL), API, maupun Dashboard.

## 2. "The Holy Trinity" (Tiga Pilar Utama)
Tiga library yang akan menjadi senjata utama Anda:
1. **NumPy (Numerical Python):** Fondasi komputasi numerik berkinerja tinggi berbasis Array.
2. **Pandas:** Analisis dan manipulasi data terstruktur (seperti Excel/Tabel).
3. **Matplotlib & Seaborn:** Visualisasi data untuk menceritakan wawasan (Data Storytelling).

## 3. Jupyter Notebook: Sahabat Data Analyst
Berbeda dengan Software Engineer yang menggunakan IDE klasik, Data Analyst menggunakan **Jupyter Notebook**.
Jupyter memungkinkan eksekusi kode *per blok* (Cell) dan langsung merender output berupa Tabel atau Grafik secara interaktif di layar.

---
## 📝 Quiz Singkat
1. Sebutkan 3 library paling fundamental dalam ekosistem Data Analysis Python!
2. Mengapa Data Analyst lebih menyukai Jupyter Notebook dibandingkan Editor teks biasa?
`,
    level: 'beginner',
    order: 1,
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: 'py-da-02',
    user_type: 'student',
    language: 'py-da',
    title: 'Modul 2: Setup Lingkungan Kerja (Environment)',
    description: 'Cara setup environment menggunakan Anaconda atau Pip, serta dasar-dasar menggunakan Jupyter Notebook / Google Colab.',
    content: `# ⚙️ Modul 2: Setup Lingkungan Kerja

Dalam pengolahan data, kita sangat bergantung pada library eksternal. Karenanya, Setup Environment yang benar adalah kunci!

## 1. Google Colab (Cara Tercepat)
Bagi pemula, **Google Colaboratory (Colab)** adalah cara paling instan.
- Gratis, disediakan oleh Google.
- Berjalan di Browser, tidak perlu instalasi apa pun di laptop Anda.
- Semua library data (NumPy, Pandas) sudah terinstal otomatis.
- Cukup buka: \`colab.research.google.com\`

## 2. Instalasi Lokal dengan PIP & VENV
Jika Anda ingin bekerja di komputer sendiri (menggunakan VS Code Jupyter Extension):
\`\`\`bash
# 1. Buat Virtual Environment
python -m venv data_env

# 2. Aktifkan Environment
# Windows:
data_env\\Scripts\\activate
# Mac/Linux:
source data_env/bin/activate

# 3. Install Library Wajib
pip install jupyter pandas numpy matplotlib seaborn openpyxl
\`\`\`

## 3. Menggunakan Anaconda
Di industri, banyak perusahaan menggunakan distribusi **Anaconda** karena memanajemen dependensi C/C++ yang kadang rumit di Data Science dengan lebih rapi menggunakan command \`conda\`.

---
## 📝 Quiz Singkat
1. Apa keuntungan utama menggunakan Google Colab untuk belajar Data Science?
2. Sebutkan perintah pip untuk menginstal Pandas dan NumPy secara bersamaan!
`,
    level: 'beginner',
    order: 2,
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: 'py-da-03',
    user_type: 'student',
    language: 'py-da',
    title: 'Modul 3: Review Cepat Python untuk Data',
    description: 'Menyegarkan kembali struktur data dasar (List, Dictionary) dan fitur fungsional (Lambda, List Comprehension) yang esensial untuk Data Analysis.',
    content: `# 🔁 Modul 3: Review Python untuk Data

Sebelum masuk ke Pandas, mari kita tajamkan kembali fitur "Native Python" yang akan sering Anda pakai.

## 1. List Comprehension (Wajib!)
Saat memproses ribuan data, iterasi menggunakan List Comprehension jauh lebih cepat dan rapi.

\`\`\`python
harga_usd = [10, 25, 50]
kurs = 15000

# Mengonversi USD ke IDR dalam 1 baris
harga_idr = [usd * kurs for usd in harga_usd]
print(harga_idr) # [150000, 375000, 750000]
\`\`\`

## 2. Dictionary untuk Pemetaan (Mapping)
Sangat berguna untuk "menerjemahkan" isi tabel data nantinya.

\`\`\`python
kode_negara = {"ID": "Indonesia", "SG": "Singapura"}
data_kode = ["ID", "SG", "ID"]

terjemahan = [kode_negara[kode] for kode in data_kode]
print(terjemahan) # ['Indonesia', 'Singapura', 'Indonesia']
\`\`\`

## 3. Lambda Functions
Fungsi anonim (satu baris) sangat vital saat kita menggunakan fitur transformasi \`apply()\` di Pandas nanti.

\`\`\`python
# Fungsi membersihkan karakter kotor pada teks (simulasi)
bersihkan_teks = lambda teks: teks.strip().lower().replace("$", "")

print(bersihkan_teks("  1500$  ")) # "1500"
\`\`\`

---
## ✍️ Latihan (10 Menit)
1. Diberikan list \`suhu_celcius = [0, 20, 30, 40]\`.
2. Gunakan **List Comprehension** dan rumus \`(C * 9/5) + 32\` untuk merubahnya menjadi suhu fahrenheit di variabel \`suhu_f\`.
`,
    level: 'beginner',
    order: 3,
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: 'py-da-04',
    user_type: 'student',
    language: 'py-da',
    title: 'Modul 4: Pengenalan NumPy & Ndarray',
    description: 'Memahami dasar komputasi numerik di Python menggunakan Numpy Array yang jauh lebih cepat daripada Python List.',
    content: `# 🔢 Modul 4: Pengenalan NumPy

**NumPy** (*Numerical Python*) adalah jantung matematika Python. Mengapa repot-repot belajar NumPy? Karena kalkulasi di NumPy menggunakan C di balik layar, sehingga bisa **50x hingga 100x lebih cepat** dibandingkan Python List biasa!

## 1. Membuat NumPy Array (ndarray)
Konsep utama NumPy adalah **N-Dimensional Array** (ndarray). Data harus memiliki tipe yang *sama*.

\`\`\`python
import numpy as np

# Mengubah List menjadi Array 1 Dimensi (Vector)
data_list = [10, 20, 30]
arr1d = np.array(data_list)
print(arr1d)

# Membuat Array 2 Dimensi (Matrix / Tabel)
matrix = np.array([
    [1, 2, 3],
    [4, 5, 6]
])
print("Dimensi matrix:", matrix.shape) # Output: (2, 3) -> 2 Baris, 3 Kolom
\`\`\`

## 2. Kemampuan Pembuatan Cepat
Seringkali kita butuh array dummy untuk perhitungan.

\`\`\`python
# Membuat array berisi angka 0 (Panjang 5)
nol = np.zeros(5)

# Array range angka berurutan (0 sampai 9)
angka = np.arange(10)

# Array nilai acak antara 0 dan 1 (Matriks 2x2)
acak = np.random.rand(2, 2)
\`\`\`

## 3. Konsep Vectorization
Anda tidak butuh perulangan \`for\` untuk memproses seluruh data array!

\`\`\`python
arr = np.array([1, 2, 3, 4])
# Mengalikan semua elemen dengan 10 tanpa Loop!
hasil = arr * 10
print(hasil) # [10, 20, 30, 40]
\`\`\`

---
## 📝 Quiz Singkat
1. Kenapa NumPy Array jauh lebih cepat dari List bawaan Python saat perhitungan matematis?
2. Bagaimana cara membuat array 1 dimensi berisi angka 0 sampai 99 secara instan?
`,
    level: 'beginner',
    order: 4,
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: 'py-da-05',
    user_type: 'student',
    language: 'py-da',
    title: 'Modul 5: Manipulasi Array NumPy',
    description: 'Cara mengekstrak, memotong (slicing), mengubah bentuk (reshape), dan memfilter data di dalam Array NumPy.',
    content: `# ✂️ Modul 5: Manipulasi NumPy Array

Bagaimana kita mengekstrak dan mengubah wujud data dalam matriks?

## 1. Indexing & Slicing
Caranya sangat mirip dengan Python List, tapi lebih kuat untuk Matriks 2 Dimensi (Baris, Kolom).

\`\`\`python
import numpy as np

# Matriks 3 baris x 4 kolom
data = np.array([
    [10, 20, 30, 40],
    [50, 60, 70, 80],
    [90, 100, 110, 120]
])

# Format: data[baris, kolom]
print(data[0, 1]) # 20 (Baris index 0, Kolom index 1)

# Mengambil seluruh Baris pertama
print(data[0, :]) # [10, 20, 30, 40]

# Mengambil seluruh Kolom kedua
print(data[:, 1]) # [20, 60, 100]
\`\`\`

## 2. Reshaping (Mengubah Wujud)
Kita bisa mengubah array 1 dimensi menjadi 2 dimensi (atau sebaliknya) dengan syarat **total elemennya sama**.

\`\`\`python
arr = np.arange(12) # Array 0 sampai 11 (Total 12 angka)

# Ubah menjadi matriks 3 baris x 4 kolom
matriks = arr.reshape(3, 4)
print(matriks)

# Ubah kembali menjadi 1 dimensi rata (Flatten)
rata = matriks.flatten()
\`\`\`

## 3. Filtering dengan Boolean Indexing
Ini adalah *Magis* sesungguhnya NumPy. Kita bisa memfilter data hanya menggunakan syarat kondisi!

\`\`\`python
umur = np.array([15, 20, 25, 12, 30])

# Cek kondisi (mengembalikan array [False, True, True, False, True])
dewasa = umur >= 17

# Ekstrak data yang True saja
hasil = umur[dewasa]
print("Hanya yang dewasa:", hasil) # [20, 25, 30]

# Cara kilat 1 baris
print(umur[umur < 17]) # [15, 12]
\`\`\`

---
## ✍️ Latihan (10 Menit)
1. Buat sebuah array NumPy berisikan angka 1 sampai 20! (Gunakan \`arange\`).
2. Gunakan *Boolean Indexing* untuk mengambil **angka genap** saja dari array tersebut (\`arr % 2 == 0\`).
`,
    level: 'intermediate',
    order: 5,
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: 'py-da-06',
    user_type: 'student',
    language: 'py-da',
    title: 'Modul 6: Operasi Agregasi NumPy',
    description: 'Menghitung statistik dasar secara langsung dari Array: Mean, Sum, Max, Min, dan Standard Deviation.',
    content: `# 📈 Modul 6: Agregasi dan Statistik NumPy

Data mentah tidak punya makna sebelum diolah (diagregasi) menjadi informasi statistik dasar (Berapa rata-rata? Berapa total? dll).

## 1. Fungsi Statistik Dasar
NumPy menyediakan fungsi agregasi super cepat (berlaku pada Array 1D maupun 2D).

\`\`\`python
import numpy as np

gaji_jt = np.array([5, 12, 7, 5, 25, 8])

print("Total:", np.sum(gaji_jt))       # Penjumlahan seluruh isi
print("Rata-rata:", np.mean(gaji_jt))  # Rata-rata
print("Tertinggi:", np.max(gaji_jt))   # Nilai Max
print("Index Gaji Tertinggi:", np.argmax(gaji_jt)) # Letak index si max (Output: 4)
\`\`\`

## 2. Mengukur Sebaran Data (Statistik Deskriptif)
Dalam Data Science, kita wajib tahu rentang data kita. Rata-rata bisa menipu jika ada "Pencilan" (Outlier) ekstrim.

\`\`\`python
# Median (Nilai Tengah) kebal terhadap pencilan
print("Nilai Tengah:", np.median(gaji_jt))

# Standar Deviasi (Seberapa jauh deviasi data menyimpang dari rata-ratanya)
print("Standar Deviasi:", np.std(gaji_jt))
\`\`\`

## 3. Agregasi dengan Axis (Sumbu) pada Matriks
Pada array 2 Dimensi (Matriks), kita bisa memilih mau menghitung per-Kolom atau per-Baris.
- \`axis=0\` : Menghitung secara Vertikal (Per Kolom)
- \`axis=1\` : Menghitung secara Horizontal (Per Baris)

\`\`\`python
penjualan = np.array([
    # Sepeda, Motor, Mobil
    [10, 5, 2], # Toko A
    [8,  3, 1], # Toko B
    [20, 10, 5] # Toko C
])

# Berapa total penjualan SEPEDA, MOTOR, MOBIL (Semua toko)? => Hitung Kolom
total_per_item = np.sum(penjualan, axis=0)
print("Item Terjual:", total_per_item) # [38, 18, 8]

# Berapa total unit terjual di masing-masing TOKO? => Hitung Baris
total_per_toko = np.sum(penjualan, axis=1)
print("Toko Terjual:", total_per_toko) # [17, 12, 35]
\`\`\`

---
## 📝 Quiz Singkat
1. Apa kegunaan fungsi \`np.argmax()\`?
2. Jika kita menjumlahkan matriks 2D dengan \`axis=0\`, arah penjumlahannya vertikal atau horizontal?
`,
    level: 'intermediate',
    order: 6,
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: 'py-da-07',
    user_type: 'student',
    language: 'py-da',
    title: 'Modul 7: Pengenalan Pandas & DataFrame',
    description: 'Memasuki inti Data Analysis! Memahami Pandas Series (1 Dimensi) dan DataFrame (Tabel 2 Dimensi) serta cara membaca file eksternal.',
    content: `# 🐼 Modul 7: Pengenalan Pandas

Jika NumPy bekerja memproses Angka secara buta (seperti kalkulator saintifik), **Pandas** hadir membawa "Tabel Excel" ber-label ke dalam dunia Python! 

Pandas dibangun *di atas* NumPy. Artinya, Panda mewarisi kecepatan NumPy namun jauh lebih kaya fitur.

## 1. Struktur Data Utama Pandas: Series
**Series** adalah array 1 dimensi (mirip satu kolom dalam tabel), bedanya, ia memiliki Index (Label) yang bisa dikustomisasi.

\`\`\`python
import pandas as pd

# Membuat series dengan index nama siswa
nilai = pd.Series([90, 85, 75], index=["Andi", "Budi", "Citra"])
print(nilai)
# Output:
# Andi     90
# Budi     85
# Citra    75
# dtype: int64

# Ambil nilai berdasarkan Label!
print("Nilai Andi:", nilai["Andi"])
\`\`\`

## 2. Struktur Superpower: DataFrame
**DataFrame** adalah gabungan beberapa Series yang membentuk Tabel 2 Dimensi (Ada Kolom dan Baris).

\`\`\`python
# Membuat DataFrame dari Dictionary Python
data = {
    "Nama": ["Andi", "Budi", "Citra"],
    "Umur": [22, 21, 23],
    "Jurusan": ["IT", "Sastra", "IT"]
}

df = pd.DataFrame(data)
print(df)
# Output:
#     Nama  Umur Jurusan
# 0   Andi    22      IT
# 1   Budi    21  Sastra
# 2  Citra    23      IT
\`\`\`

## 3. Membaca dan Menulis File External (I/O)
Di dunia nyata, kita tidak menulis data manual. Kita membacanya dari File CSV, Excel, atau SQL!

\`\`\`python
# Membaca file CSV
df_penjualan = pd.read_csv("penjualan.csv")

# Membaca Excel
# df_karyawan = pd.read_excel("data_hr.xlsx")

# Inspeksi awal (Melihat 5 data paling atas)
print(df_penjualan.head())

# Menyimpan kembali setelah diolah (Menulis Data)
# df_penjualan.to_csv("laporan_bersih.csv", index=False)
\`\`\`

---
## 📝 Quiz Singkat
1. Apa perbedaan utama antara \`Series\` dan \`DataFrame\` di Pandas?
2. Method apa yang digunakan untuk mengintip 5 baris pertama dari sebuah DataFrame?
`,
    level: 'intermediate',
    order: 7,
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: 'py-da-08',
    user_type: 'student',
    language: 'py-da',
    title: 'Modul 8: Data Selection & Filtering Pandas',
    description: 'Cara menyeleksi kolom tertentu, mengambil baris spesifik menggunakan loc/iloc, dan menyaring data bersyarat.',
    content: `# 🎯 Modul 8: Selection & Filtering di Pandas

Bagaimana kita mengambil data dari DataFrame? 

## 1. Memilih Kolom (Selection)
Sangat mirip dengan mengekstrak nilai Dictionary!

\`\`\`python
import pandas as pd

data = {"Nama": ["Ali", "Budi", "Citra"], "Umur": [20, 25, 30], "Gaji": [5, 8, 12]}
df = pd.DataFrame(data)

# Mengambil 1 kolom (Hasilnya adalah object Series)
umur = df["Umur"]
# atau df.Umur (Hanya jika nama kolom tidak ada spasi)

# Mengambil banyak kolom (Gunakan list di dalam list [[]] )
profil = df[["Nama", "Gaji"]]
print(profil)
\`\`\`

## 2. Memilih Baris dengan \`iloc\` dan \`loc\`
- **\`iloc\` (Index Location):** Memilih berdasarkan posisi angka murni (0, 1, 2...).
- **\`loc\` (Label Location):** Memilih berdasarkan nama index atau nama kolom.

\`\`\`python
# iloc [baris, kolom]
print(df.iloc[0])   # Menampilkan seluruh data baris ke-0 (Ali)
print(df.iloc[0:2]) # Baris ke-0 dan 1

# Menjadikan Nama sebagai Index tabel (menggantikan 0,1,2)
df.set_index("Nama", inplace=True)

# Menggunakan loc
print(df.loc["Budi"]) # Langsung mencari baris berlabel "Budi"!
# Spesifik baris Budi, kolom Gaji
print(df.loc["Budi", "Gaji"]) # Output: 8
\`\`\`

## 3. Filtering dengan Kondisi (Sangat Mirip NumPy!)
Inilah keahlian Data Analyst. "Tolong carikan karyawan berumur di atas 23 tahun!"

\`\`\`python
# DataFrame dikembalikan ke index normal (0,1,2)
df.reset_index(inplace=True)

# Kondisi Boolean
karyawan_senior = df[df["Umur"] > 23]
print(karyawan_senior)
# Hanya menampilkan Budi dan Citra

# Filter Ganda (Gunakan & untuk AND, | untuk OR. Wajib diapit kurung!)
syarat = (df["Umur"] > 23) & (df["Gaji"] >= 10)
print(df[syarat])
# Hanya Citra yang muncul
\`\`\`

---
## ✍️ Latihan (15 Menit)
1. Buat DataFrame bebas (misal Toko Buah: Nama Buah, Harga, Stok).
2. Tampilkan HANYA data Buah yang Harganya di atas 10.000 menggunakan Filtering Pandas!
`,
    level: 'intermediate',
    order: 8,
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: 'py-da-09',
    user_type: 'student',
    language: 'py-da',
    title: 'Modul 9: Data Cleaning Bag.1 (Missing Values)',
    description: 'Data mentah tidak pernah sempurna. Pelajari cara mendeteksi NaN dan menanganinya dengan dropna atau fillna.',
    content: `# 🧹 Modul 9: Data Cleaning (Missing Values)

Di dunia industri, data kotor (berantakan, bolong, salah format) menyumbang 80% dari beban kerja seorang Analyst! Masalah nomor 1: **Missing Values** (Data Bolong / \`NaN\`).

## 1. Mendeteksi Missing Values (\`NaN\`)
\`NaN\` (Not a Number) adalah representasi Pandas untuk data kosong (Null/None).

\`\`\`python
import pandas as pd
import numpy as np

df = pd.DataFrame({
    "Nama": ["Ali", "Budi", "Citra", "Deni"],
    "Umur": [25, np.nan, 22, 28],
    "Skor": [90, 85, np.nan, np.nan]
})

# Mengecek jumlah data kosong di masing-masing kolom
print(df.isnull().sum())
# Nama    0
# Umur    1
# Skor    2
\`\`\`

## 2. Strategi 1: Membuang Data (\`dropna\`)
Cara tercepat, namun berbahaya karena bisa membuang banyak data penting jika tidak hati-hati.

\`\`\`python
# Membuang SEMUA BARIS yang mengandung minimal satu NaN
bersih_keras = df.dropna()
print(bersih_keras) # Hanya Ali yang tersisa!

# Membuang kolom yang ada NaN (Jarang digunakan)
# df.dropna(axis=1)

# Hanya buang baris jika 'Umur' yang kosong (Skor kosong tidak masalah)
bersih_umur = df.dropna(subset=["Umur"])
\`\`\`

## 3. Strategi 2: Mengisi Kekosongan (\`fillna\`) - Recommended
Ini disebut *Imputation*. Memasukkan nilai pengganti secara masuk akal, seperti angka 0, atau rata-rata (Mean) dari kolom tersebut.

\`\`\`python
# Isi semua NaN dengan angka 0
df_nol = df.fillna(0)

# Cara Pintar: Isi Umur yang kosong dengan RATA-RATA umur semua orang!
mean_umur = df["Umur"].mean() # Rata-rata dari (25+22+28)/3
df["Umur"] = df["Umur"].fillna(mean_umur)

# Isi Skor yang kosong dengan tulisan "Tidak Ujian"
df["Skor"] = df["Skor"].fillna("Tidak Ujian")

print(df)
\`\`\`

---
## 📝 Quiz Singkat
1. Properti/Method Pandas apa yang digunakan untuk mendeteksi apakah data bernilai Null/NaN?
2. Sebutkan kelemahan menggunakan fungsi \`dropna()\` tanpa argumen pada dataset yang punya banyak kekosongan data!
`,
    level: 'intermediate',
    order: 9,
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: 'py-da-10',
    user_type: 'student',
    language: 'py-da',
    title: 'Modul 10: Data Cleaning Bag.2 (Duplikasi & Format)',
    description: 'Membersihkan data yang dobel (duplikat), menstandarkan teks, dan memperbaiki tipe data kolom (misal dari string ke datetime).',
    content: `# 🛠️ Modul 10: Data Cleaning (Duplikasi & Tipe Data)

Selain data bolong, dua musuh besar lainnya adalah **Duplikasi** dan **Salah Tipe Data**.

## 1. Menangani Data Duplikat
Sistem kasir sering kali menyimpan transaksi ganda secara tidak sengaja karena *double click*.

\`\`\`python
import pandas as pd

df = pd.DataFrame({
    "ID": ["A1", "B2", "A1", "C3"],
    "Pembeli": ["Ali", "Budi", "Ali", "Citra"],
    "Total": [50, 120, 50, 80]
})

# Mengecek baris mana yang terdeteksi sebagai duplikat (mengembalikan True/False)
print("Baris duplikat:", df.duplicated())

# Membuang duplikat (menyisakan data pertama saja)
# inplace=True artinya DataFrame asli langsung diperbarui (tanpa perlu df = df.drop...)
df.drop_duplicates(inplace=True)
print(df)
\`\`\`

## 2. Memperbaiki Tipe Data
Anggaplah Anda mengimpor data Harga dari Excel dan berformat: \`"Rp 150.000"\` (bertipe *String/Object*). Anda tidak bisa menghitung rata-ratanya karena ia bukan Angka murni!

\`\`\`python
df_harga = pd.DataFrame({"Harga": ["15000", "20000", "35000"]})

print(df_harga.dtypes) # Output: Object (String)

# Mengubah (Casting) ke bentuk Integer (Angka)
df_harga["Harga"] = df_harga["Harga"].astype(int)

# Sekarang kita bisa menghitung rata-ratanya!
print(df_harga["Harga"].mean()) 
\`\`\`

## 3. Konversi Data Tanggal (Datetime)
Tanggal yang diimpor dari CSV hampir pasti dibaca sebagai String. Wajib dikonversi ke format **Datetime** agar kita bisa mengekstrak Bulan/Tahun.

\`\`\`python
df_waktu = pd.DataFrame({"Tanggal": ["2023-01-15", "2023-05-20"]})

# Konversi string -> Datetime
df_waktu["Tanggal"] = pd.to_datetime(df_waktu["Tanggal"])

# Jika sudah berwujud datetime, Pandas punya sihir (aksesor .dt)
df_waktu["Tahun"] = df_waktu["Tanggal"].dt.year
df_waktu["Bulan"] = df_waktu["Tanggal"].dt.month
print(df_waktu)
\`\`\`

---
## 📝 Quiz Singkat
1. Parameter apa yang digunakan pada berbagai method Pandas (seperti drop_duplicates) agar perubahan langsung terjadi ke memori DataFrame asli tanpa di-assign ulang?
2. Mengapa kita wajib menggunakan \`pd.to_datetime\` jika memiliki kolom kalender di file CSV?
`,
    level: 'intermediate',
    order: 10,
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: 'py-da-11',
    user_type: 'student',
    language: 'py-da',
    title: 'Modul 11: Transformasi & Feature Engineering',
    description: 'Mengubah isi data, membuat kolom baru dari operasi matematis, dan menggunakan fungsi apply() & map() tingkat lanjut.',
    content: `# 🧪 Modul 11: Transformasi Data

Kadang data tidak punya kolom yang kita inginkan, sehingga kita harus menciptakannya sendiri berdasarkan perhitungan dari kolom lain (*Feature Engineering*).

## 1. Membuat Kolom Baru dengan Operasi Sederhana
Pandas sangat pintar karena otomatis menggunakan sistem *Vectorization*.

\`\`\`python
import pandas as pd

df = pd.DataFrame({
    "Barang": ["A", "B", "C"],
    "Harga": [1000, 2000, 3000],
    "Jumlah": [2, 5, 10]
})

# Membuat kolom "Total Bayar" secara langsung
df["Total_Bayar"] = df["Harga"] * df["Jumlah"]
print(df)
\`\`\`

## 2. Merubah Kategori dengan \`map()\`
\`map()\` digunakan untuk memetakan kamus (*Dictionary*) secara instan pada satu Kolom.

\`\`\`python
gender_code = {"M": "Laki-laki", "F": "Perempuan"}
df_user = pd.DataFrame({"Gender": ["M", "F", "M", "M"]})

# Terjemahkan sandi M/F menjadi teks utuh
df_user["Gender_Full"] = df_user["Gender"].map(gender_code)
print(df_user)
\`\`\`

## 3. Transformasi Bebas dengan \`apply()\`
\`apply()\` adalah method paling sakti. Kita bisa menempelkan **fungsi Python apa saja** (terutama fungsi *lambda*) ke seluruh data dalam suatu kolom!

\`\`\`python
# Menambahkan Diskon 10% JIKA Harga di atas 1500
def kalkulasi_diskon(harga):
    if harga > 1500:
        return harga * 0.9 # Diskon 10%
    return harga

df["Harga_Final"] = df["Harga"].apply(kalkulasi_diskon)

# Versi Singkat dengan Lambda (Sangat Umum)
# df["Harga_Final"] = df["Harga"].apply(lambda x: x * 0.9 if x > 1500 else x)

print(df)
\`\`\`

---
## ✍️ Latihan (15 Menit)
1. Buat DataFrame dengan kolom "Nama" dan "Nilai_Ujian" (Isi antara 50 - 100).
2. Buat fungsi evaluasi. JIKA nilai >= 75 return "Lulus", selain itu return "Remedial".
3. Gunakan \`apply()\` untuk membuat kolom baru "Status" berdasarkan evaluasi tersebut!
`,
    level: 'intermediate',
    order: 11,
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: 'py-da-12',
    user_type: 'student',
    language: 'py-da',
    title: 'Modul 12: Pengelompokan (Groupby & Aggregation)',
    description: 'Kunci analisis data: Mengelompokkan baris berdasarkan kategori (SQL GROUP BY) dan menghitung metrik agregasinya.',
    content: `# 📊 Modul 12: Groupby & Aggregation

Pertanyaan bos: *"Berapa total penjualan dari masing-masing Kota pada bulan lalu?"*
Untuk menjawab ini, Anda menggunakan **Groupby**! (Ini sama persis dengan konsep \`GROUP BY\` di SQL).

## 1. Mekanisme Split-Apply-Combine
Saat kita menggunakan \`groupby\`, Pandas melakukan 3 hal:
1. **Split**: Memecah DataFrame besar menjadi blok-blok kecil berdasarkan kategori (Misal: Dipisah per Kota).
2. **Apply**: Menerapkan fungsi matematika pada tiap blok (Misal: \`sum()\` atau \`mean()\`).
3. **Combine**: Menyusun kembali hasil perhitungannya menjadi satu DataFrame ringkas!

\`\`\`python
import pandas as pd

df = pd.DataFrame({
    "Cabang": ["Jakarta", "Bandung", "Jakarta", "Bandung", "Surabaya"],
    "Sales": ["Ali", "Budi", "Citra", "Deni", "Eka"],
    "Penjualan": [150, 200, 100, 300, 250]
})

# 1. Mengelompokkan berdasarkan Cabang, lalu menghitung Total Penjualannya
total_per_cabang = df.groupby("Cabang")["Penjualan"].sum()
print(total_per_cabang)
# Output:
# Cabang
# Bandung     500
# Jakarta     250
# Surabaya    250
\`\`\`

## 2. Aggregation Multiple Function (\`agg\`)
Kita bisa menghitung banyak statistik sekaligus menggunakan fungsi \`.agg()\`.
"Berapa Total Penjualannya, Rata-ratanya, dan Nilai Penjualan Tertinggi di tiap cabang?"

\`\`\`python
ringkasan = df.groupby("Cabang")["Penjualan"].agg(["sum", "mean", "max"])
print(ringkasan)
# Output Tabel:
#            sum   mean  max
# Cabang                    
# Bandung    500  250.0  300
# Jakarta    250  125.0  150
# Surabaya   250  250.0  250
\`\`\`

## 3. Multiple Grouping
Kita bisa mengelompokkan berdasarkan **Dua Kolom** sekaligus!

\`\`\`python
# Jika ada kolom "Bulan", kita bisa hitung:
# df.groupby(["Cabang", "Bulan"])["Penjualan"].sum()
\`\`\`

---
## 📝 Quiz Singkat
1. Apa method Pandas yang fungsinya sama persis dengan fungsi SQL \`GROUP BY\`?
2. Sebutkan 3 macam fungsi perhitungan (statistik dasar) yang bisa dikenakan setelah data dikelompokkan!
`,
    level: 'advanced',
    order: 12,
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: 'py-da-13',
    user_type: 'student',
    language: 'py-da',
    title: 'Modul 13: Menggabungkan Data (Merge, Join, Concat)',
    description: 'Menyambungkan multiple DataFrame (Tabel) secara vertikal maupun horizontal meniru relasi tabel di Database SQL.',
    content: `# 🔗 Modul 13: Menggabungkan DataFrame

Di perusahaan, data tidak pernah berada di 1 file CSV. Tabel *User* dan Tabel *Transaksi* pasti terpisah. Bagaimana menyatukannya?

## 1. Concat (Menyambung/Tumpuk Tabel)
Digunakan untuk menempelkan data secara baris (Vertikal - menambah data ke bawah) atau kolom (Horizontal - ke samping). Syarat utamanya adalah struktur tabel sama.

\`\`\`python
import pandas as pd

# Data Bulan Januari
df_jan = pd.DataFrame({"ID": [1, 2], "Nilai": [100, 200]})
# Data Bulan Februari
df_feb = pd.DataFrame({"ID": [3, 4], "Nilai": [300, 400]})

# Tumpuk ke bawah secara vertikal
df_gabung = pd.concat([df_jan, df_feb], ignore_index=True)
print(df_gabung)
\`\`\`

## 2. Merge (Relasi Tabel / SQL Join)
Ini adalah metode paling canggih dan esensial. \`merge\` menghubungkan dua tabel berdasarkan **Kunci/ID** yang sama.

Macam-macam tipe Merge (how):
- **inner**: (Default) Hanya data yang kuncinya ADA di KEDUA tabel yang digabungkan.
- **left**: Semua data di tabel Kiri dipertahankan, jika di tabel kanan tidak ada info terkait, diisi \`NaN\`.
- **right**: Kebalikan dari left.
- **outer**: Semua data dari kedua belah pihak masuk.

\`\`\`python
tabel_user = pd.DataFrame({
    "User_ID": [101, 102, 103],
    "Nama": ["Ali", "Budi", "Citra"]
})

tabel_transaksi = pd.DataFrame({
    "Tx_ID": ["T1", "T2", "T3"],
    "User_ID": [101, 101, 999], # Ada User 999 yg tidak dikenal
    "Jumlah": [5000, 12000, 3000]
})

# Lakukan INNER JOIN (Hanya ID yang cocok di kedua belah tabel, yaitu 101)
hasil_inner = pd.merge(tabel_transaksi, tabel_user, on="User_ID", how="inner")
print("Hasil Inner Join:")
print(hasil_inner)
# Output tidak akan memuat Budi (tidak punya Tx), atau ID 999 (tidak dikenali di tabel_user).

# Lakukan LEFT JOIN (Pertahankan semua Transaksi, cari info usernya)
hasil_left = pd.merge(tabel_transaksi, tabel_user, on="User_ID", how="left")
print("\\nHasil Left Join:")
print(hasil_left)
# ID 999 akan masuk, namun kolom Nama diisi NaN (Kosong).
\`\`\`

---
## 📝 Quiz Singkat
1. Jika kita ingin menggabungkan 2 tabel namun hanya mengambil *irisan* / data yang cocok di keduanya, tipe JOIN apa yang kita pakai?
2. Apa bedanya \`pd.concat\` dan \`pd.merge\` secara fundamental?
`,
    level: 'advanced',
    order: 13,
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: 'py-da-14',
    user_type: 'student',
    language: 'py-da',
    title: 'Modul 14: Reshaping Data (Pivot Tables & Melt)',
    description: 'Memutar (Pivot) struktur baris menjadi kolom layaknya Excel Pivot Table, dan melakukan unpivot (Melt).',
    content: `# 🔄 Modul 14: Pivot Tables & Data Reshaping

Anda pasti pernah membuat **Pivot Table** di Excel untuk laporan akhir. Pandas bisa melakukan hal yang sama dalam 1 baris kode!

## 1. Pivot Table (Meringkas Data)
Pivot Table mengubah nilai unik dalam sebuah baris menjadi Kolom Baru (menciptakan ringkasan agregasi).

\`\`\`python
import pandas as pd

df = pd.DataFrame({
    "Tahun": [2020, 2020, 2021, 2021, 2021],
    "Bulan": ["Jan", "Feb", "Jan", "Feb", "Feb"],
    "Sales": [100, 200, 150, 250, 50]
})

# "Tolong jadikan Tahun sebagai Baris (Index), Bulan sebagai Kolom, dan Jumlahkan (sum) nilai Sales-nya!"
ringkasan = pd.pivot_table(df, 
                           values="Sales", 
                           index="Tahun", 
                           columns="Bulan", 
                           aggfunc="sum",
                           fill_value=0) # Isi 0 jika kombinasinya kosong

print(ringkasan)
# Output:
# Bulan  Feb  Jan
# Tahun          
# 2020   200  100
# 2021   300  150
\`\`\`

## 2. Melt (Un-Pivot / Melelehkan Tabel)
Jika Pivot membuat tabel jadi lebar (Wide format), \`melt\` melakukan kebalikannya. Mengubah kolom-kolom tabel menjadi panjang ke bawah (Long format). Format Long sangat sering diminta oleh algoritma Machine Learning!

\`\`\`python
df_lebar = pd.DataFrame({
    "Hari": ["Senin", "Selasa"],
    "Apel": [5, 10],
    "Jeruk": [2, 4]
})

# Mari "Lelehkan" kolom Apel dan Jeruk menjadi 1 kolom penanda (Buah)
df_panjang = pd.melt(df_lebar, 
                     id_vars=["Hari"],       # Kolom yang dipertahankan utuh
                     var_name="Nama_Buah",   # Nama kolom asal
                     value_name="Terjual")   # Isinya

print(df_panjang)
# Output:
#      Hari Nama_Buah  Terjual
# 0   Senin      Apel        5
# 1  Selasa      Apel       10
# 2   Senin     Jeruk        2
# 3  Selasa     Jeruk        4
\`\`\`

---
## 📝 Quiz Singkat
1. Parameter apa pada \`pd.pivot_table()\` yang digunakan untuk merubah fungsi default Mean menjadi Penjumlahan (Sum)?
2. Secara singkat, apa fungsi dari method \`melt()\` pada pandas?
`,
    level: 'advanced',
    order: 14,
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: 'py-da-15',
    user_type: 'student',
    language: 'py-da',
    title: 'Modul 15: Visualisasi Dasar Matplotlib',
    description: 'Beralih ke Visualisasi Data! Membangun grafik fundamental seperti Line, Bar, dan Scatter Plot untuk menceritakan data.',
    content: `# 📈 Modul 15: Pengenalan Matplotlib

Sebagus apapun agregasi data yang Anda buat menggunakan Pandas, jika disajikan dalam bentuk "Tabel Angka", Manajer/Klien Anda akan kesulitan membacanya. Otak manusia memproses Gambar ribuan kali lebih cepat daripada teks!

**Matplotlib (pyplot)** adalah "Kakek Moyang" library visualisasi data di Python.

## 1. Membuat Grafik Garis (Line Chart)
Line Chart sangat cocok untuk melihat Tren seiring berjalannya Waktu (*Time Series*).

\`\`\`python
import matplotlib.pyplot as plt

bulan = ["Jan", "Feb", "Mar", "Apr", "Mei"]
penjualan = [100, 120, 90, 150, 200]

# Memulai kanvas plot (x_axis, y_axis)
plt.plot(bulan, penjualan)

# Tampilkan ke layar (Sangat penting saat tidak di Jupyter)
plt.show()
\`\`\`

## 2. Diagram Batang (Bar Chart)
Cocok untuk membandingkan jumlah Kategori yang berbeda.

\`\`\`python
kota = ["Jakarta", "Bandung", "Surabaya"]
suhu = [34, 28, 35]

plt.bar(kota, suhu, color='skyblue')
plt.show()
\`\`\`

## 3. Scatter Plot (Grafik Titik)
Sangat berguna bagi analis untuk mencari apakah ada HUBUNGAN KORELASI antara 2 variabel angka.
Misal: *"Apakah luas rumah berpengaruh terhadap harga rumah?"*

\`\`\`python
luas_rumah = [50, 80, 100, 150, 200]
harga_juta = [400, 600, 850, 1200, 1800]

# plt.scatter(Variabel_Sebab_X, Variabel_Akibat_Y)
plt.scatter(luas_rumah, harga_juta, color='red', marker='x')
plt.show()
\`\`\`
*(Jika titik-titiknya membentuk pola diagonal naik, artinya korelasinya Positif! Luas naik = Harga Naik)*

---
## 📝 Quiz Singkat
1. Library apa yang menjadi standar industri dasar untuk plot grafik di Python?
2. Jenis grafik apa yang paling tepat digunakan jika kita ingin menganalisa Tren Harga Saham selama 5 tahun terakhir?
`,
    level: 'advanced',
    order: 15,
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: 'py-da-16',
    user_type: 'student',
    language: 'py-da',
    title: 'Modul 16: Kustomisasi Visualisasi Matplotlib',
    description: 'Menjadikan grafik siap tayang di presentasi (Titles, Labels, Legends) dan membuat multi-grafik dengan Subplots.',
    content: `# 🎨 Modul 16: Kustomisasi Visualisasi Matplotlib

Grafik tanpa label sumbu X/Y dan Judul adalah sebuah bencana. Siapapun yang membacanya tidak akan mengerti apa yang grafik itu sampaikan. Kita wajib mengkustomisasinya!

## 1. Menambahkan Judul, Label, dan Legenda

\`\`\`python
import matplotlib.pyplot as plt

tahun = [2020, 2021, 2022, 2023]
profit_a = [10, 15, 14, 20]
profit_b = [5, 12, 18, 22]

# Menambahkan line plot (dengan atribut 'label' untuk Legenda)
plt.plot(tahun, profit_a, label="Perusahaan A", color="blue", marker="o", linestyle="--")
plt.plot(tahun, profit_b, label="Perusahaan B", color="red", marker="s")

# WAJIB ADA:
plt.title("Perbandingan Profit Tahunan", fontsize=16)
plt.xlabel("Tahun Pembukuan")
plt.ylabel("Profit (Dalam Miliar Rupiah)")

# Menampilkan Legenda (Keterangan Warna)
plt.legend()

# Menambahkan grid / kotak garis bantu agar mudah dibaca
plt.grid(True)

plt.show()
\`\`\`

## 2. Membuat Banyak Grafik dalam 1 Kanvas (Subplots)
Jika Anda butuh membuat *Dashboard* berisi banyak grafik berdampingan, gunakan konsep *Subplots*.

Konsep ini berorientasi Objek (OOP) di Matplotlib, menggunakan object \`Figure\` (Kanvas besar) dan \`Axes\` (Grafik kecil individu).

\`\`\`python
# Membuat Kanvas berisi 1 Baris, 2 Kolom grafik. Ukuran kanvas 10x4 inch.
fig, axes = plt.subplots(nrows=1, ncols=2, figsize=(10, 4))

# axes[0] merujuk ke grafik kiri
axes[0].plot(tahun, profit_a, color="blue")
axes[0].set_title("Grafik Kiri (Line)")

# axes[1] merujuk ke grafik kanan
axes[1].bar(tahun, profit_b, color="red")
axes[1].set_title("Grafik Kanan (Bar)")

# Merapikan jarak antar grafik agar tidak bertabrakan
plt.tight_layout()
plt.show()
\`\`\`

---
## ✍️ Latihan (15 Menit)
1. Buat satu dataset Dummy berisikan Nama-Nama Kota dan Populasi Jiwanya.
2. Buatlah Diagram Batang (Bar Chart) berwarna hijau!
3. Tambahkan Judul "Populasi Kota 2023" serta label X (Nama Kota) dan label Y (Total Populasi).
`,
    level: 'expert',
    order: 16,
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: 'py-da-17',
    user_type: 'student',
    language: 'py-da',
    title: 'Modul 17: Visualisasi Statistik Lanjutan (Seaborn)',
    description: 'Membuat visualisasi tingkat lanjut yang cantik secara otomatis dengan Seaborn. Mengenal Distribution Plot, Box Plot, dsb.',
    content: `# 🐬 Modul 17: Visualisasi dengan Seaborn

Matplotlib sangat kuat, namun butuh koding panjang untuk membuat grafik rumit dan warnanya terlihat "Kuno". 
Hadirnya **Seaborn** memecahkan masalah itu! Seaborn dibangun *di atas* Matplotlib, terintegrasi sempurna dengan Pandas DataFrame, dan jauh lebih elegan.

## 1. Boxplot (Mencari Pencilan/Outlier)
Boxplot sering dihindari orang awam karena susah dibaca, padahal bagi analis ini adalah senjata mematikan untuk mengetahui Sebaran Data, Nilai Median, Kuartil, dan Mendeteksi Data Pencilan Ekstrim (Titik-titik di luar kotak).

\`\`\`python
import seaborn as sns
import matplotlib.pyplot as plt

# Load dataset bawaan seaborn (Kumpulan tagihan di Restoran)
df_tips = sns.load_dataset("tips")

# Kita cek persebaran 'Total Tagihan' berdasar 'Hari'
sns.boxplot(data=df_tips, x="day", y="total_bill", palette="Set2")
plt.title("Persebaran Tagihan Per Hari")
plt.show()
\`\`\`

## 2. Histograms / Distribution Plot
Mengetahui Mayoritas data kita berada di angka berapa. (Membentuk kurva lonceng / *Normal Distribution*).

\`\`\`python
# kde=True akan menggambar garis Kurva kemulusan
sns.histplot(data=df_tips, x="total_bill", bins=20, kde=True, color="purple")
plt.title("Distribusi Total Tagihan")
plt.show()
\`\`\`
*(Dari grafik akan terlihat bahwa mayoritas tamu memesan makanan seharga kisaran $10-$20)*

## 3. Barplot Otomatis dengan Confidence Interval
Hebatnya Seaborn, saat kita memasukkan banyak baris data, ia tidak menampilkan semuanya. Ia otomatis menghitung **Rata-rata (Mean)** untuk ditampilkan sebagai *Bar*, dan memberi garis vertikal di atas Bar sebagai batas Margin of Error.

\`\`\`python
# Rata-rata tagihan berdasarkan Gender
sns.barplot(data=df_tips, x="sex", y="total_bill")
plt.show()
\`\`\`

---
## 📝 Quiz Singkat
1. Library apa yang berjalan di atas Matplotlib dan membuat grafik statistik indah hanya dengan 1 baris kode?
2. Jenis grafik apa di Seaborn yang paling sering diandalkan analis untuk mendeteksi Nilai Outliers (Pencilan Ekstrim)?
`,
    level: 'expert',
    order: 17,
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: 'py-da-18',
    user_type: 'student',
    language: 'py-da',
    title: 'Modul 18: Membedah Korelasi (Pairplot & Heatmap)',
    description: 'Menganalisis hubungan kuat antar banyak variabel fitur secara simultan dengan Pairplot dan Correlation Heatmap.',
    content: `# 🔗 Modul 18: Korelasi Data

Fase inti Data Science adalah mencari tahu: *"Apa penyebab turunnya Penjualan?"*
Kita harus mencari **Korelasi** (Hubungan Matematis) antar variabel.

Korelasi berkisar antara -1 (Berbanding Terbalik Sempurna) hingga 1 (Berbanding Lurus Sempurna). 0 Artinya tidak ada hubungan sama sekali.

## 1. Scatter Plot Multifungsi (Seaborn scatterplot)
\`\`\`python
import seaborn as sns
import matplotlib.pyplot as plt

df_tips = sns.load_dataset("tips")

# Apakah Semakin Besar Tagihannya, Uang Tip yang diberikan juga makin besar?
# hue="time" memisahkan warna titik berdasar jam makan siang/malam!
sns.scatterplot(data=df_tips, x="total_bill", y="tip", hue="time")
plt.show()
\`\`\`

## 2. Pairplot (Matrix Visualisasi)
Saat Anda punya dataset berisi 5 Kolom Numerik (Angka). Pairplot akan menggambar Scatterplot antara *Setiap Kombinasi Kolom* dalam sekejap!

\`\`\`python
df_iris = sns.load_dataset("iris") # Dataset bunga
# Menggambar matriks scatterplot 4x4 secara otomatis!
sns.pairplot(df_iris, hue="species")
plt.show()
\`\`\`

## 3. Correlation Matrix dengan Heatmap
Ini adalah grafik "Wajib" setiap Data Analyst. Menggambarkan Korelasi angka murni menggunakan "Peta Suhu/Warna".

\`\`\`python
# 1. Pastikan DataFrame Anda HANYA berisi Angka sebelum dikorelasikan!
df_angka = df_tips.select_dtypes(include=['float64', 'int64'])

# 2. Hitung Matriks Korelasinya di Pandas
korelasi = df_angka.corr()

# 3. Lempar matriks itu ke Seaborn Heatmap
# annot=True menampilkan angka nilai korelasi di dalam kotak
# cmap menentukan palet warna (Biru ke Merah dll)
sns.heatmap(korelasi, annot=True, cmap="coolwarm", fmt=".2f")
plt.title("Matriks Korelasi Tagihan")
plt.show()
\`\`\`
*(Dalam Heatmap, kotak berwarna paling gelap / paling merah yang memiliki angka mendekati 1 atau -1 berarti punya Hubungan Paling Kuat!)*

---
## 📝 Quiz Singkat
1. Angka 0.9 pada hasil perhitungan Matriks Korelasi menunjukkan hubungan yang ... ?
2. Fungsi Seaborn apa yang menerima Pandas Correlation Matrix lalu merendernya dalam bentuk Peta Warna berpiksel kotak-kotak?
`,
    level: 'expert',
    order: 18,
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: 'py-da-19',
    user_type: 'student',
    language: 'py-da',
    title: 'Modul 19: Exploratory Data Analysis (EDA) Framework',
    description: 'Teori Arsitektur dan Langkah Terstruktur dalam melakukan Eksplorasi Data: Mulai dari Inspeksi, Pembersihan, hingga Insight.',
    content: `# 🕵️‍♂️ Modul 19: Exploratory Data Analysis (EDA)

Semua ilmu coding Pandas dan Matplotlib Anda di modul sebelumnya akan sia-sia jika Anda tidak punya metodologi kerangka kerja yang jelas. EDA (Exploratory Data Analysis) adalah proses investigasi data bergaya "Detektif".

## Tahapan Resmi Melakukan EDA
Ikuti langkah (*Framework*) baku di bawah ini untuk semua kasus data analisis yang Anda hadapi!

### Langkah 1: Data Understanding (Inspeksi Awal)
Tanya pada Data: *"Kamu ini wujudnya seperti apa?"*
- Baca data: \`df = pd.read_csv(...)\`
- Lihat wujud asli: \`df.head()\` dan \`df.tail()\`
- Cek dimensi (Total Baris & Kolom): \`df.shape\`
- Cek Tipe Data dan Missing Values ringkas: \`df.info()\`
- Cek Statistik Dasar (Rata-rata dll): \`df.describe()\`

### Langkah 2: Data Cleaning (Pembersihan)
Tanya pada Data: *"Apakah kamu punya cacat yang harus diobati?"*
- Cari Duplikat: \`df.duplicated().sum()\` -> Hapus jika ada!
- Cari Missing Values: \`df.isnull().sum()\` -> Drop atau Fill (\`fillna\`)!
- Perbaiki Tipe Data: Ubah string tanggal jadi \`datetime\`.

### Langkah 3: Univariate Analysis (Eksplorasi Per-Kolom Tunggal)
Menganalisis satu per satu kolom tanpa menghubungkannya dengan kolom lain. Tujuannya untuk melihat Sebaran Data dan Outlier.
- Untuk Data Numerik: Plot Histogram dan Boxplot.
- Untuk Data Kategorik (Teks): Plot Bar Chart atau Pie Chart (Frekuensi).

### Langkah 4: Bivariate/Multivariate Analysis (Analisis Hubungan)
Ini penentuan kesimpulan. Menghubungkan variabel "Penyebab (Fitur)" terhadap variabel "Akibat (Target)".
- Cek Korelasi Matriks dengan Heatmap.
- Plot Scatterplot jika Keduanya Angka.
- Plot Boxplot/Barplot untuk perbandingan antara Kategori dan Angka.

### Langkah 5: Deriving Insights & Recommendations
Data Analyst dibayar bukan untuk membuat *script* Python. Data Analyst dibayar untuk **mengambil Keputusan Bisnis**.
Ubah grafik tersebut menjadi Insight! (Misal: *"Penjualan hari sabtu naik 40%, mari tambah shift karyawan hari sabtu."*)

---
## 📝 Quiz Singkat
1. Apa fungsi dari \`df.describe()\` saat melakukan tahap Inspeksi Awal?
2. Bivariate Analysis adalah analisis yang menghubungkan berapa banyak Kolom (Variabel) secara bersamaan?
`,
    level: 'expert',
    order: 19,
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: 'py-da-20',
    user_type: 'student',
    language: 'py-da',
    title: 'Modul 20: Final Project - Analisis Data E-Commerce',
    description: 'Proyek Akhir Data Analysis: Menganalisis skenario Real-World. Membaca CSV, cleaning, EDA, Visualisasi, dan Bisnis Insight.',
    content: `# 🏆 Modul 20: Final Project E-Commerce EDA

Gunakan Jupyter Notebook atau Google Colab untuk mengeksekusi ini! 
Anggap Anda baru direkrut sebagai **Junior Data Analyst**. Manajer Anda memberikan file \`sales_data.csv\` kotor dan meminta ringkasan bisnis.

*(Kode di bawah adalah Alur Penyelesaian utuhnya, gunakan ini sebagai referensi untuk portofolio Github Anda)*

## STEP 1: Import Library & Inspeksi
\`\`\`python
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns

# 1. Load Data (Anggap Data sudah ada)
# df = pd.read_csv("sales_data.csv")

# Simulasi data dummy:
df = pd.DataFrame({
    "Order_ID": [1, 2, 2, 4, 5],
    "Product": ["Kulkas", "TV", "TV", "Kipas", None],
    "Price": [1500, 800, 800, 200, 300],
    "Date": ["2023-01-10", "2023-01-12", "2023-01-12", "2023-02-05", "2023-02-18"]
})

print(df.info()) # Cek kekosongan dan tipe data
\`\`\`

## STEP 2: Data Cleaning
\`\`\`python
# Hapus Duplikat (Order ID 2 muncul 2 kali persis)
df = df.drop_duplicates()

# Menangani Missing Value di 'Product' (Ganti dengan tulisan 'Unknown')
df["Product"] = df["Product"].fillna("Unknown")

# Konversi Date menjadi format waktu sesungguhnya
df["Date"] = pd.to_datetime(df["Date"])
df["Month"] = df["Date"].dt.month_name() # Mengekstrak nama bulan
\`\`\`

## STEP 3: Aggregation (Pengelompokan)
\`\`\`python
# Tanya: Berapa Total Revenue (Pemasukan) per Produk?
revenue_per_product = df.groupby("Product")["Price"].sum().sort_values(ascending=False).reset_index()

# Tanya: Berapa Total Penjualan per Bulan?
monthly_sales = df.groupby("Month")["Price"].sum().reset_index()
\`\`\`

## STEP 4: Data Visualization & Insight
\`\`\`python
# Set Tema visualisasi agar estetik
sns.set_theme(style="whitegrid")
fig, axes = plt.subplots(1, 2, figsize=(14, 5))

# Plot 1: Revenue per Product
sns.barplot(data=revenue_per_product, x="Product", y="Price", ax=axes[0], palette="viridis")
axes[0].set_title("Total Pemasukan Per Produk", fontweight="bold")
axes[0].set_ylabel("Revenue ($)")

# Plot 2: Trend Penjualan Bulanan
sns.lineplot(data=monthly_sales, x="Month", y="Price", ax=axes[1], marker="o", color="crimson", linewidth=2)
axes[1].set_title("Trend Pemasukan Bulanan", fontweight="bold")

plt.tight_layout()
plt.show()
\`\`\`

## STEP 5: Business Insight (Laporan ke Manajer)
Berdasarkan analisis grafis:
1. **Produk Terbaik:** "Kulkas" mendominasi pemasukan tertinggi meskipun hanya laku 1 unit, karena harganya paling mahal. Fokuskan iklan ke produk *High-Ticket* ini.
2. **Isu Data:** Terdapat produk yang terjual namun namanya tidak tercatat dalam database sistem (Label "Unknown"). Tim Data Engineering perlu mengecek bug di sistem kasir.

**🎉 KELULUSAN TERBAIK!**
Selamat, Anda telah mengantongi semua *skill* yang diuji dalam wawancara kerja **Junior Data Analyst / Data Scientist** di tahap teknikal. Terus perkaya portofolio Anda menggunakan dataset asli dari situs seperti Kaggle.com!
`,
    level: 'expert',
    order: 20,
    created_at: '2025-01-01T00:00:00Z'
  }
];
