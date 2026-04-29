import { LearningMaterial } from '../types/learning';

export const MOCK_MATERIALS: LearningMaterial[] = [
  // ==================== PYTHON BASIC TO INTERMEDIATE MATERIALS ====================
  {
    id: 'py-01',
    user_type: 'student',
    language: 'python',
    title: 'Modul 1: Pengenalan Python & Dasar Pemrograman',
    description: 'Mengenal Python, cara instalasi, dan menulis program pertama Anda dengan fungsi print() dan variabel.',
    content: `# 🐍 Modul 1: Pengenalan Python & Dasar Pemrograman

## 1. Apa itu Python?
Python adalah bahasa pemrograman tingkat tinggi yang diciptakan oleh **Guido van Rossum** pada tahun 1991. Python sangat populer karena sintaksnya yang mudah dibaca dan mirip dengan bahasa Inggris. Python digunakan secara luas dalam Web Development, Data Science, Kecerdasan Buatan (AI), dan Otomatisasi.

## 2. Kenapa Belajar Python?
- **Mudah Dipelajari:** Sintaksnya bersih dan tidak membutuhkan banyak tanda baca kompleks seperti titik koma (\`;\`) atau kurung kurawal (\`{}\`).
- **Komunitas Besar:** Jika Anda mengalami masalah, ribuan solusi sudah tersedia di internet.
- **Multiguna:** Bisa digunakan untuk hampir semua jenis pengembangan perangkat lunak.

## 3. Menulis Kode Pertama Anda
Di Python, untuk menampilkan teks ke layar, kita menggunakan fungsi \`print()\`.

\`\`\`python
# Ini adalah komentar, baris ini tidak akan dieksekusi oleh Python
print("Halo, Dunia!")
print("Selamat datang di kelas Python dasar.")
\`\`\`

## 4. Variabel Dasar
Variabel adalah wadah untuk menyimpan data. Di Python, Anda tidak perlu mendeklarasikan tipe data secara eksplisit.

\`\`\`python
nama = "Budi"        # Menyimpan teks (String)
umur = 20            # Menyimpan angka (Integer)
sedang_belajar = True # Menyimpan nilai kebenaran (Boolean)

print("Nama saya", nama)
print("Umur saya", umur, "tahun")
\`\`\`

---

## 📝 Quiz Singkat
1. Siapa pencipta bahasa pemrograman Python?
2. Fungsi apa yang digunakan untuk menampilkan teks ke layar?

## ✍️ Latihan (10 Menit)
1. Buatlah variabel untuk menyimpan nama lengkap, hobi, dan tahun lahir Anda.
2. Gunakan fungsi \`print()\` untuk menampilkan kalimat perkenalan diri Anda menggunakan variabel tersebut.
`,
    level: 'beginner',
    order: 1,
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: 'py-02',
    user_type: 'student',
    language: 'python',
    title: 'Modul 2: Tipe Data & Operasi Dasar',
    description: 'Mempelajari tipe data primitif, konversi tipe data (casting), operasi aritmatika, dan menerima input dari user.',
    content: `# 🔢 Modul 2: Tipe Data & Operasi Dasar

## 1. Tipe Data Primitif di Python
Setiap nilai di Python memiliki tipe data. Berikut adalah tipe data dasar yang paling sering digunakan:
- **String (\`str\`)**: Teks, diapit oleh tanda kutip tunggal (\`'\`) atau ganda (\`"\`). Contoh: \`"Hello"\`
- **Integer (\`int\`)**: Angka bulat. Contoh: \`100\`, \`-5\`
- **Float (\`float\`)**: Angka desimal. Contoh: \`3.14\`, \`0.5\`
- **Boolean (\`bool\`)**: Nilai kebenaran, hanya bisa \`True\` atau \`False\`.

\`\`\`python
teks = "Python Seru" # str
angka_bulat = 42     # int
angka_desimal = 3.5  # float
lulus = True         # bool

# Mengecek tipe data menggunakan type()
print(type(teks)) # Output: <class 'str'>
\`\`\`

## 2. Operasi Aritmatika
Python dapat digunakan sebagai kalkulator dengan operator aritmatika standar:
- Penjumlahan: \`+\`
- Pengurangan: \`-\`
- Perkalian: \`*\`
- Pembagian (Hasil float): \`/\`
- Pembagian Bulat (Floor division): \`//\`
- Sisa Bagi (Modulo): \`%\`
- Pangkat: \`**\`

\`\`\`python
a = 10
b = 3
print(a + b)  # 13
print(a / b)  # 3.3333...
print(a // b) # 3
print(a % b)  # 1 (sisa bagi dari 10 dibagi 3)
print(a ** b) # 1000 (10 pangkat 3)
\`\`\`

## 3. Menerima Input dari User (Input & Casting)
Kita bisa meminta user memasukkan data menggunakan \`input()\`.
**Penting:** Hasil dari \`input()\` selalu berupa String (\`str\`). Jika butuh angka, kita harus mengubah (casting) tipe datanya.

\`\`\`python
# Meminta input
nama = input("Masukkan nama Anda: ")

# Meminta input angka dan langsung diubah menjadi integer (casting)
tahun_lahir_str = input("Masukkan tahun lahir Anda: ")
tahun_lahir = int(tahun_lahir_str)

umur = 2025 - tahun_lahir
print("Halo", nama, "umur Anda adalah", umur)
\`\`\`

---

## 📝 Quiz Singkat
1. Apa hasil dari \`10 % 3\`?
2. Jika \`x = input("Masukkan umur: ")\`, apa tipe data awal dari variabel \`x\`?

## ✍️ Latihan (15 Menit)
1. Buat program sederhana untuk menghitung luas persegi panjang.
2. Minta input panjang dan lebar dari user (gunakan \`float()\`).
3. Kalikan panjang dan lebar, lalu print hasilnya ("Luas persegi panjang adalah: ...").
`,
    level: 'beginner',
    order: 2,
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: 'py-03',
    user_type: 'student',
    language: 'python',
    title: 'Modul 3: Percabangan & Logika (If-Else)',
    description: 'Mengendalikan alur program menggunakan kondisional (If, Elif, Else) dan operator logika (And, Or, Not).',
    content: `# 🔀 Modul 3: Percabangan & Logika

Program seringkali perlu mengambil keputusan berdasarkan suatu kondisi. Di Python, kita menggunakan percabangan.

## 1. Operator Perbandingan
Sebelum membuat keputusan, kita membandingkan nilai menggunakan operator yang menghasilkan \`True\` atau \`False\`:
- \`==\` : Sama dengan
- \`!=\` : Tidak sama dengan
- \`>\`  : Lebih dari
- \`<\`  : Kurang dari
- \`>=\` : Lebih dari sama dengan
- \`<=\` : Kurang dari sama dengan

## 2. Percabangan \`if\`, \`elif\`, \`else\`
Python menggunakan indentasi (spasi/tab masuk ke dalam) untuk menentukan blok kode.

\`\`\`python
nilai = 85

if nilai >= 90:
    print("Grade A - Luar Biasa!")
elif nilai >= 80:
    print("Grade B - Bagus!")
elif nilai >= 70:
    print("Grade C - Cukup.")
else:
    print("Grade D - Belajar lagi ya!")
\`\`\`
*Catatan: \`elif\` singkatan dari "else if". Anda bisa menggunakan \`elif\` sebanyak yang dibutuhkan. Blok \`else\` menangkap semua kondisi yang tidak terpenuhi di atasnya.*

## 3. Operator Logika (And, Or, Not)
Kita bisa menggabungkan beberapa kondisi sekaligus.
- **\`and\`**: Bernilai \`True\` jika KEDUA kondisi benar.
- **\`or\`**: Bernilai \`True\` jika SALAH SATU kondisi benar.
- **\`not\`**: Membalikkan nilai (contoh: \`not True\` menjadi \`False\`).

\`\`\`python
punya_ktp = True
umur = 20

if umur >= 17 and punya_ktp:
    print("Boleh membuat SIM.")
else:
    print("Belum boleh membuat SIM.")
\`\`\`

---

## 📝 Quiz Singkat
1. Apa bedanya \`=\` (satu sama dengan) dan \`==\` (dua sama dengan)?
2. Jika \`x = 5\`, apakah hasil dari kondisi \`x > 2 and x < 4\`?

## ✍️ Latihan (20 Menit)
1. Buat program yang meminta input angka dari user.
2. Tentukan apakah angka tersebut "Positif", "Negatif", atau "Nol" menggunakan struktur \`if-elif-else\`.
`,
    level: 'beginner',
    order: 3,
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: 'py-04',
    user_type: 'student',
    language: 'python',
    title: 'Modul 4: Perulangan (Loops)',
    description: 'Melakukan tugas berulang secara otomatis menggunakan For Loop, While Loop, dan mengendalikannya dengan Break/Continue.',
    content: `# 🔄 Modul 4: Perulangan (Loops)

Perulangan sangat penting agar kita tidak perlu menulis kode yang sama berulang-ulang.

## 1. For Loop (Perulangan Pasti)
\`for\` digunakan saat kita tahu persis berapa kali kita ingin mengulang, atau saat kita ingin menelusuri kumpulan data (seperti list atau string).

Fungsi \`range(start, stop)\` sangat sering digunakan bersama \`for\` untuk menghasilkan deretan angka.

\`\`\`python
# Akan mengulang dari 0 sampai 4 (stop di 5)
print("Contoh Range 1:")
for i in range(5):
    print("Perulangan ke-", i)

# Range dengan start dan stop (mulai 1 sampai 5)
print("\\nContoh Range 2:")
for angka in range(1, 6):
    print(angka)
\`\`\`

## 2. While Loop (Perulangan Bersyarat)
\`while\` digunakan saat perulangan bergantung pada kondisi tertentu yang bernilai \`True\`. Loop akan berhenti jika kondisi menjadi \`False\`.

\`\`\`python
hitung = 3
while hitung > 0:
    print("Sisa waktu:", hitung)
    hitung -= 1  # Sama dengan hitung = hitung - 1
print("Waktu habis!")
\`\`\`
*Hati-hati: Jika kondisi \`while\` tidak pernah bernilai \`False\`, program akan berjalan terus menerus (Infinite Loop).*

## 3. Kendali Loop: Break dan Continue
- **\`break\`**: Langsung menghentikan keseluruhan loop saat itu juga.
- **\`continue\`**: Meloncati sisa kode di iterasi saat ini, lalu lanjut ke iterasi loop berikutnya.

\`\`\`python
# Contoh Break
for i in range(10):
    if i == 4:
        break # Berhenti ketika i adalah 4
    print(i) # Output: 0, 1, 2, 3

# Contoh Continue
for i in range(5):
    if i == 2:
        continue # Melewati angka 2
    print(i) # Output: 0, 1, 3, 4
\`\`\`

---

## 📝 Quiz Singkat
1. Jika ada \`for x in range(3, 6):\`, angka berapa saja yang akan dicetak?
2. Apa fungsi \`break\` dalam perulangan?

## ✍️ Latihan (20 Menit)
1. Buat program dengan \`while\` loop yang meminta user memasukkan kata sandi (misal: "rahasia").
2. Jika kata sandi salah, terus tanyakan "Masukkan sandi: ".
3. Jika benar, hentikan loop (gunakan \`break\`) dan print "Akses diberikan".
`,
    level: 'beginner',
    order: 4,
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: 'py-05',
    user_type: 'student',
    language: 'python',
    title: 'Modul 5: Struktur Data: List & Tuple',
    description: 'Menyimpan banyak data dalam satu variabel berurutan menggunakan List (Bisa diubah) dan Tuple (Tidak bisa diubah).',
    content: `# 📦 Modul 5: Struktur Data: List & Tuple

Variabel biasa hanya bisa menyimpan satu nilai. Untuk menyimpan banyak nilai sekaligus dalam urutan tertentu, kita bisa menggunakan List dan Tuple.

## 1. List (Daftar yang bisa diubah)
List didefinisikan dengan kurung siku \`[]\`. Elemen dalam List dapat diakses melalui nomor urutannya yang disebut **Index** (dimulai dari 0). List bersifat *mutable* (isinya bisa ditambah, dihapus, atau diubah).

\`\`\`python
buah = ["Apel", "Jeruk", "Mangga"]

# Mengakses elemen
print(buah[0]) # Apel
print(buah[-1]) # Mangga (Index negatif menghitung dari belakang)

# Mengubah elemen
buah[1] = "Anggur"

# Menambah elemen di akhir list
buah.append("Pisang")

# Menghapus elemen
buah.remove("Apel") # Berdasarkan nilai
del buah[0]         # Berdasarkan index

print(buah) # ['Anggur', 'Mangga', 'Pisang']
\`\`\`

### Menelusuri (Iterasi) List
Kita sangat sering menggunakan \`for\` untuk membaca seluruh isi list.
\`\`\`python
for b in buah:
    print("- " + b)
\`\`\`

## 2. Tuple (Daftar yang Kaku)
Tuple sangat mirip dengan list, namun ditulis menggunakan kurung biasa \`()\`. Bedanya? Tuple bersifat **Immutable** (setelah dibuat, isinya TIDAK bisa diubah, ditambah, atau dihapus).

\`\`\`python
koordinat = (10, 20)
print(koordinat[0]) # 10

# koordinat[0] = 15 # INI AKAN ERROR! Tuple tidak bisa diubah nilainya.
\`\`\`
*Kenapa butuh Tuple?* Karena isinya tidak bisa diubah, Tuple sedikit lebih cepat dari List dan lebih aman untuk menyimpan data konstan (seperti koordinat, warna RGB, dll).

## 3. List Slicing (Memotong List)
Kita bisa mengambil beberapa elemen list sekaligus menggunakan format \`list[mulai:sampai_sebelum]\`.

\`\`\`python
angka = [10, 20, 30, 40, 50]
print(angka[1:4]) # Mengambil dari index 1 hingga sebelum index 4 -> [20, 30, 40]
print(angka[:3])  # Mengambil dari awal sampai sebelum index 3 -> [10, 20, 30]
\`\`\`

---

## 📝 Quiz Singkat
1. Apa perbedaan utama antara List dan Tuple?
2. Jika \`data = ["a", "b", "c", "d"]\`, apa hasil dari \`data[-2]\`?

## ✍️ Latihan (20 Menit)
1. Buat sebuah list berisi 5 angka sembarang.
2. Gunakan perulangan \`for\` untuk menelusuri list tersebut.
3. Hitung total penjumlahan dari semua angka dalam list tersebut (simpan dalam variabel \`total\`) lalu print hasilnya.
`,
    level: 'beginner',
    order: 5,
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: 'py-06',
    user_type: 'student',
    language: 'python',
    title: 'Modul 6: Struktur Data: Dictionary & Set',
    description: 'Menyimpan data dengan pasangan Kunci-Nilai menggunakan Dictionary, dan kumpulan data unik tanpa urutan menggunakan Set.',
    content: `# 🏷️ Modul 6: Struktur Data: Dictionary & Set

Selain List yang berurutan menggunakan index angka, ada tipe struktur data lain yang sangat berguna untuk kasus spesifik.

## 1. Dictionary (Kamus Kunci-Nilai)
Dictionary (\`dict\`) menyimpan data dalam pasangan **Key-Value** (Kunci-Nilai), seperti buku telepon di mana "Nama" merujuk pada "Nomor Telepon". Dictionary menggunakan kurung kurawal \`{}\` dengan format \`kunci: nilai\`.

\`\`\`python
siswa = {
    "nama": "Ali",
    "umur": 21,
    "jurusan": "Informatika"
}

# Mengakses nilai menggunakan kuncinya
print(siswa["nama"]) # Output: Ali

# Menambah / Memperbarui data
siswa["IPK"] = 3.8       # Menambah kunci baru
siswa["umur"] = 22       # Memperbarui nilai
print(siswa)

# Iterasi Dictionary
for key, value in siswa.items():
    print(f"{key} : {value}")
\`\`\`

## 2. Set (Himpunan Data Unik)
Set juga menggunakan \`{}\` (namun tanpa pasangan \`:\`). Karakteristik utama Set adalah:
- **Unik:** Tidak boleh ada data ganda (duplikat akan otomatis dihapus).
- **Tidak Berurutan:** Tidak ada index (tidak bisa diakses seperti \`set[0]\`).

Sangat berguna untuk mencari data unik atau operasi himpunan (gabungan, irisan).

\`\`\`python
# Elemen ganda (angka 2) otomatis dibuang
angka_unik = {1, 2, 2, 3, 4, 4, 5}
print(angka_unik) # Output: {1, 2, 3, 4, 5}

# Operasi Himpunan
A = {1, 2, 3}
B = {3, 4, 5}

print(A.union(B))        # Gabungan: {1, 2, 3, 4, 5}
print(A.intersection(B)) # Irisan (Yang ada di keduanya): {3}
\`\`\`

---

## 📝 Quiz Singkat
1. Untuk mengakses nilai di dalam List kita menggunakan Index angka. Jika di dalam Dictionary, kita menggunakan apa?
2. Struktur data apa yang otomatis membuang elemen yang duplikat?

## ✍️ Latihan (20 Menit)
1. Buat sebuah \`Dictionary\` kosong bernama \`kontak\`.
2. Tambahkan 2 pasangan data baru. Contoh kuncinya adalah nama teman, dan nilainya adalah nomor teleponnya.
3. Coba print nomor telepon dari salah satu teman menggunakan kunci (nama) nya!
`,
    level: 'beginner',
    order: 6,
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: 'py-07',
    user_type: 'student',
    language: 'python',
    title: 'Modul 7: Fungsi (Functions) & Modularitas',
    description: 'Membungkus kode yang sering dipakai menjadi blok Fungsi yang bisa dipanggil berulang kali, menggunakan Argumen dan Return.',
    content: `# 🛠️ Modul 7: Fungsi (Functions) & Modularitas

Jika kita menyalin-tempel (copy-paste) blok kode yang sama berkali-kali di program kita, itu pertanda buruk! Solusinya adalah membungkus kode tersebut ke dalam **Fungsi**.

## 1. Mendefinisikan dan Memanggil Fungsi
Kita membuat fungsi menggunakan kata kunci \`def\` diikuti nama fungsi, kurung \`()\`, dan titik dua \`:\`.

\`\`\`python
# Mendefinisikan fungsi
def sapa():
    print("Halo, selamat datang di program ini!")

# Memanggil (menggunakan) fungsi
sapa()
sapa()
\`\`\`

## 2. Argumen (Parameter) Fungsi
Fungsi bisa menerima data masuk yang disebut **Argumen**. Hal ini membuat fungsi menjadi fleksibel.

\`\`\`python
def sapa_nama(nama):
    print(f"Halo {nama}, selamat datang!")

sapa_nama("Budi")
sapa_nama("Siti")
\`\`\`

## 3. Mengembalikan Nilai (\`return\`)
Fungsi seringkali memproses data lalu memberikan hasil akhirnya. Gunakan \`return\` untuk mengirim kembali hasil hitungan, bukan sekadar mem-print-nya.

\`\`\`python
def tambah(a, b):
    hasil = a + b
    return hasil

# Nilai dari return disimpan ke variabel
total = tambah(5, 7)
print("Total adalah:", total) # 12
\`\`\`
*Catatan: Saat program mencapai baris \`return\`, fungsi tersebut akan langsung selesai dan keluar.*

## 4. Default Argumen (Nilai Bawaan)
Kita bisa memberikan nilai default pada parameter. Jika user memanggil fungsi tanpa mengisi parameter tersebut, nilai default akan dipakai.

\`\`\`python
def cetak_profil(nama, negara="Indonesia"):
    print(f"{nama} berasal dari {negara}")

cetak_profil("Andi")               # "Andi berasal dari Indonesia"
cetak_profil("John", "Amerika")    # "John berasal dari Amerika"
\`\`\`

---

## 📝 Quiz Singkat
1. Apa kata kunci yang digunakan untuk membuat fungsi di Python?
2. Apa bedanya mem-\`print()\` hasil dalam fungsi dengan me-\`return\` hasil dalam fungsi?

## ✍️ Latihan (25 Menit)
1. Buat fungsi bernama \`hitung_diskon(harga_awal, persen_diskon)\`.
2. Di dalam fungsi, hitung besaran diskon dan kembalikan (\`return\`) harga akhir (harga_awal dikurangi diskon).
3. Panggil fungsi tersebut dengan argumen harga 100.000 dan diskon 20%, simpan hasilnya ke dalam variabel, lalu print hasilnya.
`,
    level: 'beginner',
    order: 7,
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: 'py-08',
    user_type: 'student',
    language: 'python',
    title: 'Modul 8: Penanganan Error (Exception Handling)',
    description: 'Menangani error saat program berjalan (runtime error) secara anggun menggunakan blok Try, Except, Else, dan Finally.',
    content: `# 🛡️ Modul 8: Penanganan Error (Exception Handling)

Di dunia nyata, program akan sering mengalami masalah: user memasukkan huruf saat diminta angka, file tidak ditemukan, atau koneksi internet terputus. Jika dibiarkan, program akan **Crash** (berhenti total secara tiba-tiba).

Untuk mencegah crash, kita menggunakan Exception Handling (Blok \`try-except\`).

## 1. Blok Try-Except Dasar
Kita menaruh kode yang "berpotensi error" di dalam blok \`try\`. Jika terjadi error, Python tidak akan crash, melainkan melompat ke blok \`except\`.

\`\`\`python
try:
    angka = int(input("Masukkan sebuah angka: "))
    hasil = 100 / angka
    print("Hasil 100 dibagi angka Anda adalah:", hasil)
except ValueError:
    # Error jika user tidak memasukkan angka (misal memasukkan huruf "A")
    print("Error: Harap masukkan sebuah angka yang valid!")
except ZeroDivisionError:
    # Error jika user memasukkan angka 0
    print("Error: Tidak bisa membagi dengan nol!")
\`\`\`

## 2. Menangkap Semua Error Secara Umum
Jika kita tidak tahu jenis error apa yang mungkin muncul, kita bisa menggunakan \`except Exception as e:\` untuk menangkap detail pesannya.

\`\`\`python
try:
    data = [1, 2, 3]
    print(data[10]) # Akan memicu IndexError
except Exception as e:
    print(f"Terjadi kesalahan yang tidak terduga: {e}")
\`\`\`

## 3. Blok Tambahan: Else dan Finally
- **\`else\`**: Dieksekusi **HANYA JIKA** blok \`try\` berhasil (tidak ada error sama sekali).
- **\`finally\`**: Akan **SELALU** dieksekusi di akhir, baik terjadi error maupun tidak. Biasanya digunakan untuk "membersihkan" sesuatu, seperti menutup file.

\`\`\`python
try:
    x = int(input("Pilih angka (1/2): "))
except ValueError:
    print("Itu bukan angka!")
else:
    print("Bagus, Anda memasukkan angka yang benar.")
finally:
    print("Selesai memproses input.")
\`\`\`

---

## 📝 Quiz Singkat
1. Blok apa yang digunakan untuk menangkap masalah dan mencegah program crash?
2. Kapan blok \`finally\` dieksekusi?

## ✍️ Latihan (20 Menit)
1. Buat program kalkulator pembagian sederhana.
2. Minta input 2 angka dari user.
3. Gunakan blok \`try-except\` untuk memastikan aplikasi tidak crash jika user menginputkan teks atau membagi dengan 0.
`,
    level: 'intermediate',
    order: 8,
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: 'py-09',
    user_type: 'student',
    language: 'python',
    title: 'Modul 9: Membaca & Menulis File (File I/O)',
    description: 'Cara membuka, membaca konten, dan menulis teks ke dalam file eksternal (txt) menggunakan Context Manager (With Open).',
    content: `# 📂 Modul 9: Membaca & Menulis File

Saat variabel hilang ketika program ditutup, satu-satunya cara menyimpan data secara permanen adalah dengan menyimpannya ke dalam File atau Database.

## 1. Membuka File (Metode Lama vs Baru)
Cara kuno membuka file adalah dengan \`f = open()\` lalu wajib memanggil \`f.close()\` (Jika lupa close, file bisa rusak!).
Cara Modern dan Terbaik di Python adalah menggunakan blok \`with\`.

\`with open()\` akan secara otomatis menutup file ketika blok selesai, bahkan jika terjadi error di tengah-tengah. Ini disebut **Context Manager**.

## 2. Menulis File (Write Mode \`'w'\`)
Mode \`'w'\` akan membuat file baru. Jika file sudah ada, isi lamanya akan **dihapus bersih** lalu diganti dengan yang baru.

\`\`\`python
# Menulis file (w = write)
with open("catatan.txt", "w") as file:
    file.write("Ini baris pertama.\\n") # \\n untuk pindah baris
    file.write("Ini baris kedua.\\n")
print("File berhasil dibuat!")
\`\`\`

## 3. Menambah Isi File (Append Mode \`'a'\`)
Jika tidak ingin menghapus isi lama, gunakan mode \`'a'\` (append). Ini akan menambahkan tulisan di bagian paling bawah.

\`\`\`python
with open("catatan.txt", "a") as file:
    file.write("Ini baris tambahan dari append mode.\\n")
\`\`\`

## 4. Membaca File (Read Mode \`'r'\`)
Mode bawaan adalah \`'r'\`. Kita bisa membaca seluruh file, atau membacanya baris demi baris menggunakan perulangan.

\`\`\`python
# Membaca seluruh file sekaligus
with open("catatan.txt", "r") as file:
    konten = file.read()
    print("Isi file:")
    print(konten)

# Membaca baris demi baris (Lebih hemat memori untuk file besar)
with open("catatan.txt", "r") as file:
    for baris in file:
        print(baris.strip()) # .strip() membuang newline bawaan di akhir
\`\`\`

---

## 📝 Quiz Singkat
1. Kenapa kita sangat disarankan menggunakan \`with open( ... )\` saat berinteraksi dengan file?
2. Apa bedanya mode \`"w"\` dan \`"a"\` saat membuka file?

## ✍️ Latihan (25 Menit)
1. Buat program yang meminta user menginputkan "Daftar Belanja" (misal: "Telur", "Beras").
2. Gunakan mode \`"a"\` untuk menambahkan setiap barang ke dalam file \`belanja.txt\`.
3. Setelah selesai, tulis kode untuk membuka kembali \`belanja.txt\` dengan mode \`"r"\` dan print seluruh isinya!
`,
    level: 'intermediate',
    order: 9,
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: 'py-10',
    user_type: 'student',
    language: 'python',
    title: 'Modul 10: Pengenalan Object-Oriented Programming (OOP)',
    description: 'Paradigma PBO Dasar: Membuat Cetakan (Class), Objek (Instance), Atribut, Method, dan Konsep Pewarisan (Inheritance).',
    content: `# 🏛️ Modul 10: Object-Oriented Programming (OOP) Dasar

OOP adalah cara berpikir/paradigma dalam pemrograman di mana kita memodelkan program sebagai sekumpulan "Objek" yang saling berinteraksi, seperti di dunia nyata.

## 1. Class (Cetakan) dan Object
- **Class:** Adalah cetakan biru (Blueprint) atau konsep abstrak. Contoh: "Mobil"
- **Object/Instance:** Adalah wujud nyata dari cetakan tersebut. Contoh: "Toyota Avanza warna Hitam B 1234 CD"

\`\`\`python
# Mendefinisikan Class
class Kucing:
    # __init__ adalah "Constructor". Dipanggil otomatis saat object dibuat.
    def __init__(self, nama, warna):
        # self merujuk pada object itu sendiri
        self.nama = nama       # Ini disebut Atribut (Variabel di dalam class)
        self.warna = warna
        
    # Ini disebut Method (Fungsi di dalam class)
    def meong(self):
        print(f"{self.nama} bilang: Meooong!!")

# Membuat Object dari Class Kucing
kucing1 = Kucing("Oyen", "Oranye")
kucing2 = Kucing("Milo", "Coklat")

# Mengakses Atribut dan Method
print(kucing1.nama)   # Oyen
kucing2.meong()       # Milo bilang: Meooong!!
\`\`\`

## 2. Mengapa butuh \`self\`?
Kata kunci \`self\` wajib menjadi argumen pertama pada method di dalam class. \`self\` adalah cara object mengenali data miliknya sendiri, sehingga data "Oyen" tidak tertukar dengan "Milo".

## 3. Inheritance (Pewarisan)
Pewarisan memungkinkan kita membuat class baru yang mewarisi sifat dari class lain yang sudah ada. Menghemat penulisan ulang kode!

\`\`\`python
class Hewan:
    def bernafas(self):
        print("Menghirup oksigen...")

# Burung mewarisi Hewan
class Burung(Hewan):
    def terbang(self):
        print("Mengepakkan sayap!")

burung_elang = Burung()
burung_elang.bernafas() # Bisa memakai fungsi dari Class Induk (Hewan)
burung_elang.terbang()  # Bisa memakai fungsi spesifiknya sendiri
\`\`\`

---

## 📝 Quiz Singkat
1. Di dalam OOP, apa istilah untuk "Blueprint/Cetakan" dan "Benda nyata hasil cetakan"?
2. Fungsi spesial bernama apa di Python yang dipanggil otomatis saat kita membuat sebuah object (Constructor)?

## ✍️ Latihan (30 Menit)
1. Buat class bernama \`RekeningBank\`.
2. Di \`__init__\`, minta \`nama_pemilik\` dan set atribut \`saldo = 0\`.
3. Buat method \`setor(jumlah)\` yang menambah saldo, dan \`tarik(jumlah)\` yang mengurangi saldo (pastikan saldo tidak boleh minus!).
4. Buat objek rekening untuk Anda sendiri, setor Rp 50.000, tarik Rp 20.000, lalu print sisa saldonya.
`,
    level: 'intermediate',
    order: 10,
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: 'py-11',
    user_type: 'student',
    language: 'python',
    title: 'Modul 11: Python Package & Virtual Environment',
    description: 'Menggunakan PIP untuk menginstal library eksternal, membuat Virtual Environment (venv) untuk isolasi project, dan menulis requirements.txt.',
    content: `# 📦 Modul 11: Python Package & Virtual Environment

Kekuatan utama Python adalah pada komunitasnya yang telah membuat ribuan alat (Library/Package) gratis yang siap pakai!

## 1. PIP (Python Package Installer)
PIP adalah alat bawaan Python yang digunakan untuk mengunduh package dari internet (melalui PyPI - Python Package Index).

Contoh, kita butuh alat untuk mendownload halaman web. Kita tidak perlu koding dari awal, kita cukup instal package populer bernama \`requests\`.
Buka Terminal/Command Prompt lalu ketik:
\`\`\`bash
pip install requests
\`\`\`

Setelah terinstal, kita bisa menggunakannya di kode kita:
\`\`\`python
import requests

response = requests.get("https://api.github.com")
print(response.status_code) # Biasanya 200 (OK)
\`\`\`

## 2. Kenapa Butuh Virtual Environment (venv)?
Bayangkan Anda membuat Project A dengan Django versi 3, lalu 6 bulan kemudian membuat Project B dengan Django versi 4. Jika Anda menginstal semuanya secara "Global" di komputer Anda, versi tersebut akan saling tabrak dan merusak project lainnya (disebut *Dependency Hell*).

**Solusi:** Kita membuat "Ruang Isolasi" (Virtual Environment) untuk setiap proyek.

## 3. Cara Menggunakan Venv
Lakukan ini di Terminal, berada di dalam folder project Anda:

**Langkah 1: Membuat venv (cukup sekali)**
\`\`\`bash
python -m venv env
\`\`\`
*(Perintah ini akan membuat folder bernama \`env\` yang berisi instalasi Python mandiri)*

**Langkah 2: Mengaktifkan venv (Lakukan setiap akan ngoding)**
- Windows: \`env\\Scripts\\activate\`
- macOS/Linux: \`source env/bin/activate\`
*(Tanda bahwa venv aktif: akan ada awalan \`(env)\` di terminal Anda)*

**Langkah 3: Menginstal paket di dalam venv**
Sekarang jalankan \`pip install ...\`. Paket hanya akan terinstal untuk folder ini saja.

**Langkah 4: Mencatat Dependensi**
Agar teman Anda tahu paket apa saja yang butuh diinstal:
\`\`\`bash
pip freeze > requirements.txt
\`\`\`

---

## 📝 Quiz Singkat
1. Apa nama alat bawaan Python untuk mendownload dan menginstal package dari internet?
2. Mengapa kita wajib menggunakan Virtual Environment di dalam project yang serius?

## ✍️ Latihan (20 Menit)
1. Buat folder baru bernama \`proyek_kalkulator\`.
2. Buka terminal, masuk ke folder tersebut, lalu buat virtual environment bernama \`venv\`.
3. Aktifkan venv tersebut! Cek apakah tanda \`(venv)\` muncul di terminal.
`,
    level: 'intermediate',
    order: 11,
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: 'py-12',
    user_type: 'student',
    language: 'python',
    title: 'Modul 12: List Comprehension & Fitur Fungsional',
    description: 'Menulis kode lebih Pythonic dan ringkas dengan List Comprehension, serta pengenalan Lambda, Map, dan Filter.',
    content: `# ✨ Modul 12: List Comprehension & Fitur Fungsional

Di Python menengah (Intermediate), kita belajar menulis kode agar lebih elegan, ringkas, dan "Pythonic".

## 1. List Comprehension
Cara standar (dan panjang) untuk membuat list baru berdasarkan list yang lama:
\`\`\`python
angka = [1, 2, 3, 4, 5]
kuadrat = []
for a in angka:
    kuadrat.append(a * a)
\`\`\`

Kita bisa meringkas 4 baris di atas menjadi 1 baris menggunakan List Comprehension!
Format: \`[EKSPRESI for ITEM in KUMPULAN if KONDISI]\`

\`\`\`python
angka = [1, 2, 3, 4, 5]
# List Comprehension
kuadrat = [a * a for a in angka]
print(kuadrat) # [1, 4, 9, 16, 25]

# Dengan filter kondisi bersyarat (Hanya angka ganjil)
ganjil_kuadrat = [a * a for a in angka if a % 2 != 0]
print(ganjil_kuadrat) # [1, 9, 25]
\`\`\`

## 2. Fungsi Lambda (Fungsi Anonim)
Fungsi biasa dibuat dengan \`def\`. \`lambda\` digunakan untuk membuat fungsi kecil "sekali pakai" tanpa nama dalam satu baris.

\`\`\`python
# Fungsi biasa
def tambah_dua(x):
    return x + 2

# Menggunakan lambda
tambah_lambda = lambda x: x + 2

print(tambah_lambda(5)) # 7
\`\`\`

## 3. Map & Filter
Biasanya digunakan berdampingan dengan fungsi lambda.

- **\`map(fungsi, list)\`**: Menjalankan fungsi ke setiap elemen di dalam list.
- **\`filter(fungsi, list)\`**: Membuang elemen list yang fungsinya mengembalikan \`False\`.

\`\`\`python
data = [10, 15, 20, 25, 30]

# Membagi semua angka dengan 2 (map)
hasil_map = list(map(lambda x: x / 2, data))
print(hasil_map) # [5.0, 7.5, 10.0, 12.5, 15.0]

# Memfilter yang lebih besar dari 18 (filter)
hasil_filter = list(filter(lambda x: x > 18, data))
print(hasil_filter) # [20, 25, 30]
\`\`\`

---

## 📝 Quiz Singkat
1. Ubah perulangan ini menjadi List Comprehension: \`for i in range(5): listku.append(i * 10)\`
2. Apakah \`lambda\` bisa memiliki lebih dari 1 baris kode (multi-line)?

## ✍️ Latihan (20 Menit)
1. Diberikan list \`suhu_celcius = [0, 10, 20, 30, 40]\`.
2. Gunakan **List Comprehension** untuk membuat list baru bernama \`suhu_fahrenheit\`.
*(Rumus konversi: F = (C * 9/5) + 32)*
3. Print list hasilnya.
`,
    level: 'intermediate',
    order: 12,
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: 'py-13',
    user_type: 'student',
    language: 'python',
    title: 'Modul 13: Fungsi Lanjutan (*args, **kwargs, Type Hinting)',
    description: 'Menangani fungsi dengan parameter tak terbatas menggunakan *args dan **kwargs, serta standar Type Hinting industri.',
    content: `# 🚀 Modul 13: Fungsi Lanjutan

## 1. Menerima Banyak Argumen (*args)
Pernahkah Anda bertanya bagaimana fungsi bawaan seperti \`print(1, 2, 3, 4)\` bisa menerima berapapun argumen? Jawabannya adalah dengan menaruh bintang satu \`*\` di depan argumen. \`*args\` (Arbitrary Arguments) akan membungkus sisa argumen menjadi **Tuple**.

\`\`\`python
def jumlahkan_semua(*args):
    total = 0
    for angka in args:
        total += angka
    return total

print(jumlahkan_semua(10, 20))         # 30
print(jumlahkan_semua(1, 2, 3, 4, 5))  # 15
\`\`\`

## 2. Menerima Argumen Kata Kunci (**kwargs)
Bintang dua \`**\` digunakan jika argumen yang diberikan berupa format *Key-Value* (misal \`nama="Andi"\`). \`**kwargs\` (Keyword Arguments) akan menampung data tersebut menjadi sebuah **Dictionary**.

\`\`\`python
def cetak_data(**kwargs):
    for kunci, nilai in kwargs.items():
        print(f"{kunci}: {nilai}")

cetak_data(nama="Budi", umur=25, kota="Jakarta")
# Output:
# nama: Budi
# umur: 25
# kota: Jakarta
\`\`\`

## 3. Type Hinting (Saran Tipe Data)
Python bersifat dinamis (tidak mewajibkan deklarasi tipe data). Tapi, di dunia kerja/industri, sangat disarankan menggunakan **Type Hinting**.
Fungsinya? Agar editor (seperti VS Code) bisa mendeteksi error lebih awal dan memberikan *Autocomplete* (saran ketik) yang akurat.

\`\`\`python
# Tanda ':' setelah variabel adalah Type Hint untuk input
# Tanda '->' adalah Type Hint untuk Return fungsi

def sapa_user(nama: str, umur: int) -> str:
    return f"Halo {nama}, tahun depan umurmu {umur + 1}"

# Jika di IDE Anda memanggil sapa_user(10, "Budi"), IDE akan memberi peringatan garis bawah merah (warning).
\`\`\`

---

## 📝 Quiz Singkat
1. Argumen yang ditangkap oleh \`*args\` akan disimpan sebagai tipe data apa? (List/Tuple/Dict/Set)
2. Apa tujuan utama dari penggunaan Type Hinting di Python 3?

## ✍️ Latihan (20 Menit)
1. Buat sebuah fungsi bernama \`buat_profil(nama_depan, nama_belakang, **kwargs)\`.
2. Fungsi tersebut harus me-return sebuah string/teks rapi yang berisi nama lengkap dan data tambahan yang dimasukkan secara dinamis lewat kwargs (seperti jurusan, hobi, dll).
`,
    level: 'intermediate',
    order: 13,
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: 'py-14',
    user_type: 'student',
    language: 'python',
    title: 'Modul 14: Pemrograman Berbasis Modul & Best Practices',
    description: 'Memecah program besar menjadi beberapa file modul, importing file, dan memahami magic variable `__name__ == "__main__"`.',
    content: `# 🧩 Modul 14: Pemrograman Berbasis Modul

Ketika program Anda sudah sangat panjang (mencapai ribuan baris), menaruh semuanya di satu file \`main.py\` adalah mimpi buruk. Solusinya? Pecah menjadi beberapa modul (file). Setiap file Python yang memiliki akhiran \`.py\` adalah Modul.

## 1. Membuat dan Meng-import Modul
Buat file baru bernama \`matematika.py\`:
\`\`\`python
# File: matematika.py
def tambah(a, b):
    return a + b

PI = 3.14159
\`\`\`

Di file lain (misal \`main.py\`), Anda bisa memanggilnya dengan \`import\`.
\`\`\`python
# File: main.py
import matematika

# Memanggil fungsi
hasil = matematika.tambah(10, 5)
print("Hasil:", hasil)

# Memanggil variabel
print("Nilai PI:", matematika.PI)
\`\`\`

Anda juga bisa meng-import secara spesifik untuk menghemat pengetikan:
\`\`\`python
from matematika import tambah, PI

print(tambah(2, 3))
\`\`\`

## 2. Misteri \`if __name__ == "__main__":\`
Anda mungkin sering melihat blok kode ini di file-file open source:

\`\`\`python
def jalankan_aplikasi():
    print("Aplikasi berjalan...")

if __name__ == "__main__":
    jalankan_aplikasi()
\`\`\`

**Mengapa ini penting?**
- Ketika Anda menjalankan file secara langsung di terminal (\`python file.py\`), Python akan men-set variabel ajaib \`__name__\` menjadi string \`"__main__"\`.
- Namun, jika file tersebut di-\`import\` oleh file lain, \`__name__\` akan berisi nama filenya, sehingga blok \`if\` di atas **TIDAK** akan tereksekusi.
- Ini mencegah kode utama berjalan dua kali atau dieksekusi secara tak sengaja ketika di-import. **Ini adalah Standar Industri!**

## 3. Best Practices (Aturan Penulisan Kode - PEP 8)
PEP 8 adalah pedoman gaya penulisan Python agar rapi dan sama di seluruh dunia:
- **Indentasi:** Gunakan 4 spasi (bukan tab!).
- **Variabel & Fungsi:** Pakai huruf kecil dengan garis bawah (\`snake_case\`). Contoh: \`nama_lengkap\`.
- **Class:** Pakai awalan huruf kapital (\`PascalCase\`). Contoh: \`RekeningBank\`.
- **Konstanta:** Pakai huruf besar semua (\`UPPER_CASE\`). Contoh: \`MAX_TIMEOUT = 60\`.

---

## 📝 Quiz Singkat
1. File dengan ekstensi apa di Python yang disebut sebagai Modul?
2. Jika Anda membuat variabel konstan bernilai 3.14 yang tidak boleh diubah, bagaimana format penamaan yang direkomendasikan oleh PEP 8?

## ✍️ Latihan (25 Menit)
1. Buat file bernama \`utilitas.py\` yang berisi fungsi \`sapa_pagi(nama)\`.
2. Buat file \`utama.py\`. Import \`sapa_pagi\` dari modul \`utilitas.py\`.
3. Di dalam \`utama.py\`, tulis blok standar industri \`if __name__ == "__main__":\` dan letakkan eksekusi pemanggilan fungsi di bawah blok tersebut!
`,
    level: 'intermediate',
    order: 14,
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: 'py-15',
    user_type: 'student',
    language: 'python',
    title: 'Modul 15: Mini Project - Aplikasi Manajemen Kontak',
    description: 'Menggabungkan semua ilmu dasar-menengah (While loop, Dictionary, File I/O, Error Handling) menjadi aplikasi utuh berbasis Terminal (CLI).',
    content: `# 🏆 Modul 15: Mini Project - Manajemen Kontak (CLI)

Selamat! Anda telah mempelajari seluruh fundamental Python dari dasar hingga menengah. Sekarang saatnya membuktikan pemahaman Anda dengan membangun Aplikasi CLI (Command Line Interface).

## 🎯 Objektif Proyek
Kita akan membuat "Buku Kontak". Fitur utamanya:
1. Menampilkan semua kontak
2. Menambah kontak baru
3. Mencari kontak berdasarkan nama
4. Menyimpan data otomatis ke file \`kontak.txt\` agar tidak hilang saat aplikasi ditutup.

## 🛠️ Langkah-langkah Pembuatan

### Step 1: Struktur Data
Kita akan menggunakan **Dictionary**. Nama sebagai Key, dan Nomor sebagai Value.
Contoh: \`{"Budi": "08123", "Siti": "08567"}\`

### Step 2: Fungsi Load & Save (File I/O)
Buat fungsi membaca \`kontak.txt\` dan mengisi Dictionary saat aplikasi dimulai.
Buat fungsi menulis Dictionary ke \`kontak.txt\` setiap ada penambahan data. (Gunakan pemisah baris/koma).

### Step 3: Infinite Loop & Menu (While)
Gunakan \`while True:\` untuk terus menampilkan opsi menu (1. Tambah, 2. Tampil, 3. Keluar) hingga user memilih opsi "Keluar".

### Step 4: Menyatukan Semua dengan Error Handling
Bungkus logika di atas dan pastikan program tidak crash jika file \`kontak.txt\` belum ada di awal eksekusi (Gunakan \`try-except FileNotFoundError\`).

---

## 💻 Referensi Kode Utama (Silakan Kembangkan!)

\`\`\`python
import os

FILE_KONTAK = "kontak.txt"

def muat_kontak() -> dict:
    data_kontak = {}
    try:
        with open(FILE_KONTAK, "r") as file:
            for baris in file:
                nama, nomor = baris.strip().split(",")
                data_kontak[nama] = nomor
    except FileNotFoundError:
        pass # Jika file tidak ada, biarkan dictionary kosong
    return data_kontak

def simpan_kontak(data_kontak: dict):
    with open(FILE_KONTAK, "w") as file:
        for nama, nomor in data_kontak.items():
            file.write(f"{nama},{nomor}\\n")

def main():
    kontak = muat_kontak()
    
    while True:
        print("\\n=== BUKU KONTAK ===")
        print("1. Tampilkan Kontak")
        print("2. Tambah Kontak")
        print("3. Keluar")
        
        pilihan = input("Pilih menu (1/2/3): ")
        
        if pilihan == '1':
            if not kontak:
                print("Kontak masih kosong!")
            else:
                for nama, no in kontak.items():
                    print(f"- {nama} : {no}")
                    
        elif pilihan == '2':
            nama = input("Masukkan Nama: ")
            no = input("Masukkan Nomor HP: ")
            kontak[nama] = no
            simpan_kontak(kontak)
            print("Kontak berhasil disimpan!")
            
        elif pilihan == '3':
            print("Sampai jumpa!")
            break
            
        else:
            print("Pilihan tidak valid.")

if __name__ == "__main__":
    main()
\`\`\`

**🚀 Selamat!** Dengan selesainya Modul 15 ini, Anda telah memiliki pondasi Python yang kuat untuk melanjutkan ke tingkat Advanced, Web Development (Django/FastAPI), atau Data Science!
`,
    level: 'intermediate',
    order: 15,
    created_at: '2025-01-01T00:00:00Z'
  },
  // ==================== PYTHON ADVANCED MATERIALS ====================
  {
    id: 'py-16',
    user_type: 'student',
    language: 'python',
    title: 'Modul 16: Advanced OOP - Dunder Methods & MRO',
    description: 'Menguasai Object-Oriented Programming lebih dalam dengan Magic Methods (Dunder), @property, dan Multiple Inheritance (MRO).',
    content: `# 🏛️ Modul 16: Advanced OOP

Selamat datang di Python Advanced! Kita akan membedah kemampuan OOP Python yang jarang diketahui pemula.

## 1. Magic Methods (Dunder Methods)
Dunder singkatan dari *Double Underscore*. Anda pasti tahu \`__init__\`, tapi ada banyak dunder method lain yang bisa kita manfaatkan untuk meng-overload operator bawaan Python.

\`\`\`python
class Vektor:
    def __init__(self, x, y):
        self.x = x
        self.y = y

    # Overload operator tambah (+)
    def __add__(self, other):
        return Vektor(self.x + other.x, self.y + other.y)

    # Overload cara print object
    def __str__(self):
        return f"Vektor({self.x}, {self.y})"

v1 = Vektor(2, 4)
v2 = Vektor(1, 5)
print(v1 + v2) # Output: Vektor(3, 9)
\`\`\`

## 2. Property Decorator (@property)
Di bahasa seperti Java, kita sering membuat \`get_umur()\` dan \`set_umur()\`. Di Python, cara *Pythonic* adalah menggunakan \`@property\`.

\`\`\`python
class Karyawan:
    def __init__(self, nama, gaji):
        self.nama = nama
        self._gaji = gaji # Atribut protected (konvensi _)

    @property
    def gaji(self): # Getter
        return self._gaji

    @gaji.setter
    def gaji(self, nominal): # Setter dengan validasi
        if nominal < 0:
            raise ValueError("Gaji tidak bisa negatif!")
        self._gaji = nominal

k = Karyawan("Budi", 5000)
k.gaji = 6000 # Terlihat seperti mengubah variabel biasa, padahal memanggil setter!
\`\`\`

## 3. Multiple Inheritance & MRO (Method Resolution Order)
Python mendukung pewarisan dari banyak class sekaligus. MRO adalah aturan urutan pencarian method.

\`\`\`python
class Mamalia:
    def bersuara(self):
        print("Suara Mamalia")

class Burung:
    def bersuara(self):
        print("Suara Burung")

class Kelelawar(Mamalia, Burung):
    pass

k = Kelelawar()
k.bersuara() # Output: Suara Mamalia (Karena Mamalia ditulis duluan di pewarisan)
print(Kelelawar.mro()) # Menampilkan urutan pencarian
\`\`\`

---
## 📝 Quiz Singkat
1. Dunder method apa yang dipanggil saat kita menggunakan \`len(obj)\`?
2. Apa kegunaan utama dari \`@property\`?
`,
    level: 'advanced',
    order: 16,
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: 'py-17',
    user_type: 'student',
    language: 'python',
    title: 'Modul 17: Iterators & Generators',
    description: 'Menghemat penggunaan RAM dan memori saat memproses data besar menggunakan \`yield\`, Generator Expression, dan Iterator.',
    content: `# 🔄 Modul 17: Iterators & Generators

Saat memproses data berukuran Gigabyte (seperti Log file atau Database), menggunakan List biasa akan membuat komputer *Crash* kehabisan RAM. Solusinya? **Generators**.

## 1. Perbedaan Iterables dan Iterators
- **Iterable**: Objek yang bisa diulang (List, String). Bisa dikenakan \`iter()\`.
- **Iterator**: Objek yang mengembalikan data satu-persatu saat fungsi \`next()\` dipanggil.

\`\`\`python
data = [1, 2, 3]
iterator_data = iter(data)

print(next(iterator_data)) # 1
print(next(iterator_data)) # 2
\`\`\`

## 2. Generators dengan \`yield\`
Generator adalah fungsi yang "dijeda" (paused) saat mengembalikan nilai menggunakan \`yield\`, dan bisa dilanjutkan kembali. Memori hanya digunakan untuk 1 data pada satu waktu!

\`\`\`python
def pembuat_angka(batas):
    num = 1
    while num <= batas:
        yield num # Jeda di sini dan kembalikan num
        num += 1

gen = pembuat_angka(3)
print(next(gen)) # 1
print(next(gen)) # 2
print(next(gen)) # 3
# print(next(gen)) # Akan menghasilkan StopIteration Error
\`\`\`

## 3. Generator Expression
Sama seperti List Comprehension, tapi menggunakan kurung biasa \`()\`. Menghasilkan Generator Object, bukan List.

\`\`\`python
# List Comprehension (Memori besar)
kuadrat_list = [x**2 for x in range(1000000)]

# Generator Expression (Sangat hemat memori)
kuadrat_gen = (x**2 for x in range(1000000))

import sys
print("Ukuran List:", sys.getsizeof(kuadrat_list), "bytes")
print("Ukuran Gen :", sys.getsizeof(kuadrat_gen), "bytes") # Jauh lebih kecil!
\`\`\`

---
## 📝 Quiz Singkat
1. Apa perbedaan utama antara \`return\` dan \`yield\`?
2. Mengapa Generator sangat direkomendasikan untuk memproses data berukuran besar?
`,
    level: 'advanced',
    order: 17,
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: 'py-18',
    user_type: 'student',
    language: 'python',
    title: 'Modul 18: Decorators',
    description: 'Memanipulasi dan menambahkan perilaku pada fungsi lain (Metaprogramming) menggunakan Decorators tingkat lanjut.',
    content: `# 🎀 Modul 18: Decorators

Decorator memungkinkan kita memodifikasi kelakuan fungsi atau class lain secara elegan, tanpa perlu mengubah source code aslinya. Sering dipakai di Web Framework (seperti Django/Flask) untuk Caching atau Pengecekan Login.

## 1. Konsep Dasar Decorator
Di Python, fungsi adalah *First-Class Object*, artinya fungsi bisa di-passing sebagai argumen ke fungsi lain.

\`\`\`python
def pembungkus(fungsi_target):
    def fungsi_dalam():
        print("=== Sebelum fungsi berjalan ===")
        fungsi_target()
        print("=== Setelah fungsi berjalan ===")
    return fungsi_dalam

@pembungkus # Ini adalah cara memanggil Decorator
def sapa():
    print("Halo, dunia!")

sapa()
\`\`\`

## 2. Decorator dengan Argumen (*args, **kwargs)
Bagaimana jika fungsi target butuh argumen? Kita gunakan \`*args\` dan \`**kwargs\` di fungsi *wrapper*.

\`\`\`python
import time

def pengukur_waktu(fungsi):
    def wrapper(*args, **kwargs):
        start = time.time()
        hasil = fungsi(*args, **kwargs)
        end = time.time()
        print(f"[{fungsi.__name__}] dieksekusi dalam {end - start:.4f} detik")
        return hasil
    return wrapper

@pengukur_waktu
def loop_lama(n):
    return sum([x for x in range(n)])

loop_lama(1000000)
\`\`\`

## 3. Decorator yang Menerima Argumen Khusus
Kita bisa menambahkan 1 lapis fungsi lagi agar Decorator bisa menerima konfigurasi.

\`\`\`python
def ulangi(kali):
    def decorator(fungsi):
        def wrapper(*args, **kwargs):
            for _ in range(kali):
                hasil = fungsi(*args, **kwargs)
            return hasil
        return wrapper
    return decorator

@ulangi(kali=3)
def print_salam():
    print("Selamat Pagi!")

print_salam()
\`\`\`

---
## 📝 Quiz Singkat
1. Apa arti dari *Fungsi adalah First-Class Object*?
2. Bagaimana cara meneruskan parameter acak pada fungsi Wrapper di dalam Decorator?
`,
    level: 'advanced',
    order: 18,
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: 'py-19',
    user_type: 'student',
    language: 'python',
    title: 'Modul 19: Asynchronous Programming (Asyncio)',
    description: 'Menangani Concurrency dengan Non-Blocking I/O menggunakan Event Loop, Coroutines, dan keyword async/await.',
    content: `# ⚡ Modul 19: Asynchronous Programming (Asyncio)

Kode Python standar berjalan secara *Synchronous* (berjalan satu per satu dari atas ke bawah). Jika ada proses *download* data yang lama (Misal 5 detik), program akan membeku (Block). **Asyncio** memecahkan masalah ini dengan sistem *Non-Blocking*.

## 1. Coroutines (\`async\` dan \`await\`)
Fungsi yang diberi awalan \`async def\` disebut **Coroutine**. Coroutine tidak bisa dieksekusi langsung, harus dijalankan dalam sebuah *Event Loop*.

\`\`\`python
import asyncio
import time

async def masak_kopi():
    print("Mulai masak kopi...")
    await asyncio.sleep(2) # Menunggu (Non-blocking)
    print("Kopi Selesai!")
    return "Kopi"

async def panggang_roti():
    print("Mulai panggang roti...")
    await asyncio.sleep(3) # Menunggu (Non-blocking)
    print("Roti Selesai!")
    return "Roti"
\`\`\`

## 2. Event Loop (\`asyncio.gather\`)
Untuk menjalankan Coroutines secara BERSAMAAN (Concurrent), kita kumpulkan mereka menggunakan \`asyncio.gather\`.

\`\`\`python
async def main():
    start = time.time()
    
    # Menjalankan 2 fungsi sekaligus
    hasil = await asyncio.gather(
        masak_kopi(),
        panggang_roti()
    )
    
    end = time.time()
    print(f"Total waktu: {end - start:.2f} detik")
    print("Hasil:", hasil)

# Cara mengeksekusi Async program
if __name__ == "__main__":
    asyncio.run(main())
\`\`\`
*Catatan: Total waktu yang dihabiskan adalah 3 detik (Waktu terlama), bukan 5 detik (2+3)! Ini karena mereka berjalan berdampingan.*

## 3. Kapan Menggunakan Asyncio?
Asyncio sempurna untuk pekerjaan **I/O Bound** (Network request, baca/tulis file, database query). JANGAN gunakan Asyncio untuk **CPU Bound** (Proses hitungan matematika berat), untuk itu gunakan Multiprocessing.

---
## 📝 Quiz Singkat
1. Apa nama fungsi bawaan asyncio untuk menjalankan beberapa coroutine secara bersamaan?
2. Jika Anda membuat program pemrosesan AI / *Machine Learning* yang berat di perhitungan kalkulasi angka, apakah cocok menggunakan Asyncio?
`,
    level: 'advanced',
    order: 19,
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: 'py-20',
    user_type: 'student',
    language: 'python',
    title: 'Modul 20: Advanced Data Structures (Collections)',
    description: 'Eksplorasi modul \`collections\`: Counter, defaultdict, namedtuple, dan deque untuk optimasi struktur data.',
    content: `# 🧱 Modul 20: Advanced Data Structures

Python punya built-in library bernama \`collections\` yang menyediakan alternatif struktur data berkinerja tinggi dibanding list atau dict biasa.

## 1. Counter (Menghitung Frekuensi)
Menghitung kemunculan elemen dalam list tanpa menggunakan *for loop* dan logika rumit.

\`\`\`python
from collections import Counter

kata = ["apel", "jeruk", "apel", "pisang", "jeruk", "apel"]
hitung = Counter(kata)

print(hitung)             # Counter({'apel': 3, 'jeruk': 2, 'pisang': 1})
print(hitung.most_common(1)) # Mengambil 1 paling sering muncul -> [('apel', 3)]
\`\`\`

## 2. DefaultDict (Dictionary Tanpa KeyError)
Jika mengakses kunci yang belum ada di Dict biasa, akan memicu \`KeyError\`. \`defaultdict\` akan otomatis membuat kunci tersebut dengan nilai default.

\`\`\`python
from collections import defaultdict

# Set default berupa integer (0)
skor = defaultdict(int)

skor["Ali"] += 10 # "Ali" tadinya tidak ada, tapi langsung di-set 0, lalu ditambah 10
print(skor["Ali"]) # 10
print(skor["Budi"]) # 0 (Otomatis dibuat)
\`\`\`

## 3. NamedTuple (Tuple yang Mudah Dibaca)
Tuple sangat ringan, tapi mengakses nilainya dengan index \`data[0]\` sangat tidak rapi. \`namedtuple\` menggabungkan keringanan Tuple dengan kemudahan Dictionary.

\`\`\`python
from collections import namedtuple

# Membuat "Class" sederhana
Pemain = namedtuple("Pemain", ["nama", "level", "job"])

p1 = Pemain(nama="Zaki", level=99, job="Warrior")

print(p1.nama) # Jauh lebih rapi dibanding p1[0]
print(p1.job)
\`\`\`

## 4. Deque (Double Ended Queue)
List biasa sangat lambat (O(N)) jika kita menambah/menghapus data dari posisi paling depan (index 0). \`deque\` membuat operasi hapus/tambah dari ujung kiri dan kanan secepat kilat (O(1)).

\`\`\`python
from collections import deque

antrean = deque(["Andi", "Budi", "Citra"])
antrean.appendleft("Zaki") # Menyelak ke paling depan
antrean.pop()              # Membuang paling belakang

print(antrean) # deque(['Zaki', 'Andi', 'Budi'])
\`\`\`

---
## 📝 Quiz Singkat
1. Apa solusi cepat dari modul \`collections\` untuk menghitung huruf/kata terbanyak dalam teks?
2. Kapan sebaiknya kita menggunakan \`deque\` dibanding \`list\`?
`,
    level: 'advanced',
    order: 20,
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: 'py-21',
    user_type: 'student',
    language: 'python',
    title: 'Modul 21: Context Managers & \`contextlib\`',
    description: 'Membangun blok \`with\` sendiri untuk manajemen resource otomatis dengan class dunder (__enter__ & __exit__) atau decorator @contextmanager.',
    content: `# 📦 Modul 21: Context Managers

Anda pasti sering menggunakan blok \`with open('file.txt') as f:\`. Blok \`with\` adalah fitur *Context Manager* yang menjamin suatu *Resource* (seperti Koneksi DB atau File) dibersihkan/ditutup secara otomatis, walau terjadi error!

## 1. Custom Context Manager menggunakan Class
Kita bisa membuat blok \`with\` kita sendiri menggunakan Dunder Methods: \`__enter__\` dan \`__exit__\`.

\`\`\`python
class KoneksiDatabase:
    def __init__(self, host):
        self.host = host

    def __enter__(self):
        print(f"[!] Membuka koneksi ke {self.host}")
        return self # Nilai ini yang akan masuk ke "as"

    def __exit__(self, exc_type, exc_val, traceback):
        print(f"[!] Menutup koneksi ke {self.host}")
        if exc_type: # Jika ada Error
            print(f"Terjadi error: {exc_val}")
        # Return True akan "menekan" (menelan) error agar program tidak crash
        return False 

with KoneksiDatabase("localhost:5432") as db:
    print("Sedang mengambil data pengguna...")
    # raise Exception("Simulasi database putus!")
\`\`\`

## 2. Cara Cepat dengan \`@contextmanager\`
Menulis class cukup panjang. Python punya modul \`contextlib\` agar kita bisa membuat blok \`with\` hanya menggunakan fungsi berbasis *Generator* (\`yield\`).

\`\`\`python
from contextlib import contextmanager

@contextmanager
def buka_file_html(nama_file):
    print(f"<html>\\n<body>")
    yield nama_file # Jeda dan kirim file ke blok 'with'
    print(f"</body>\\n</html>")

with buka_file_html("index.html") as file:
    print(f"  <h1>Halo, {file}</h1>")

# Output:
# <html>
# <body>
#   <h1>Halo, index.html</h1>
# </body>
# </html>
\`\`\`

---
## 📝 Quiz Singkat
1. Dunder method apa yang akan selalu dieksekusi di akhir blok \`with\` meskipun terjadi Error?
2. Jika fungsi \`__exit__\` mengembalikan nilai \`True\`, apa dampaknya terhadap *Exception/Error* yang sedang terjadi?
`,
    level: 'advanced',
    order: 21,
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: 'py-22',
    user_type: 'student',
    language: 'python',
    title: 'Modul 22: Regular Expressions (Regex)',
    description: 'Pencarian, pemfilteran, dan manipulasi String tingkat lanjut dengan pola Regex menggunakan library \`re\`.',
    content: `# 🔍 Modul 22: Regular Expressions (Regex)

Regex adalah bahasa mini untuk mencari dan mencocokkan *Pola Teks* (Pattern). Sangat esensial untuk validasi Email, scraping web, dan pembersihan data.

## 1. Fungsi Dasar \`re\` di Python
Kita menggunakan modul bawaan \`import re\`.
- \`re.search()\` : Mencari pola (berhenti saat pertama kali ketemu).
- \`re.findall()\` : Mencari semua yang cocok dan memasukkannya ke List.
- \`re.sub()\` : Mengganti/Replace teks berdasarkan pola.

\`\`\`python
import re

teks = "Halo, nomor WA saya 0812-3456-7890 dan teman saya 0899-1111-2222"

# Mencari format pola Nomor HP (Contoh: 4 digit - 4 digit - 4 digit)
# \\d = digit (angka). {4} = jumlah angka.
pola = r"\\d{4}-\\d{4}-\\d{4}"

hasil = re.findall(pola, teks)
print("Nomor ditemukan:", hasil)
# Output: ['0812-3456-7890', '0899-1111-2222']
\`\`\`

## 2. Validasi Email dengan Regex
Contoh nyata yang paling sering dipakai di Backend:

\`\`\`python
email = "test.user@perusahaan.com"
email_salah = "user@domain..com"

# Penjelasan Pola:
# ^ dan $     = Awal dan Akhir string
# [a-zA-Z0-9.-]+ = Karakter alphanumeric, titik, atau strip minimal 1 buah
pola_email = r"^[a-zA-Z0-9.-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$"

if re.search(pola_email, email):
    print("Email 1 Valid!")

if not re.search(pola_email, email_salah):
    print("Email 2 Tidak Valid!")
\`\`\`

## 3. Membersihkan Data (Sanitization)
Menghapus semua karakter yang bukan alfabet menggunakan \`re.sub()\`.

\`\`\`python
kotor = "Bera$$!pa har#ga b^&arang in*i?"
# Mengganti semua karakter yang BUKAN huruf dan spasi ([^a-zA-Z\\s]) dengan string kosong
bersih = re.sub(r"[^a-zA-Z\\s]", "", kotor)
print(bersih) # "Berapa harga barang ini"
\`\`\`

---
## 📝 Quiz Singkat
1. Jika \`\\d\` digunakan untuk mencari angka (Digit), apa yang digunakan untuk mencari sebuah Kata (Alfabet/Word)? (Silakan riset tentang Regex Cheatsheet)
2. Apa guna karakter awalan \`r""\` (Raw String) saat menulis Pola Regex di Python?
`,
    level: 'advanced',
    order: 22,
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: 'py-23',
    user_type: 'student',
    language: 'python',
    title: 'Modul 23: Metaprogramming & Reflection',
    description: 'Menulis kode yang bisa memanipulasi kode lain secara dinamis: getattr, setattr, dan pengenalan Metaclasses.',
    content: `# 🧠 Modul 23: Metaprogramming & Reflection

Metaprogramming adalah menulis program yang dapat "membaca, memahami, atau mengubah" program lain atau dirinya sendiri saat program sedang berjalan (Runtime). 

## 1. Reflection dengan \`getattr\`, \`setattr\`, \`hasattr\`
Biasanya kita mengakses atribut dengan nama yang *Hardcoded* (misal: \`user.nama\`). Dengan fungsi dinamis ini, kita bisa mengakses atribut menggunakan String.

\`\`\`python
class Pengguna:
    def __init__(self):
        self.nama = "Admin"
        self.level = 100

user = Pengguna()

# Mengecek apakah atribut ada
if hasattr(user, "nama"):
    # Mengambil atribut menggunakan string
    # Mirip dengan user.nama
    print(getattr(user, "nama")) 

# Menyetel/Membuat atribut baru secara dinamis
nama_kolom = "pekerjaan"
setattr(user, nama_kolom, "Developer")
print(user.pekerjaan) # "Developer"
\`\`\`

## 2. Fungsi \`type()\` Tingkat Lanjut (Membuat Class Dinamis)
\`type()\` tidak hanya untuk mengecek tipe data. Jika kita memberikan 3 argumen (\`type(nama, pewarisan, dict_atribut)\`), ia akan membuat Class baru secara dinamis (on-the-fly)!

\`\`\`python
# Membuat class "Robot" tanpa menulis \`class Robot:\`
RobotDinamic = type('Robot', (), {'kekuatan': 9000, 'nama': 'Optimus'})

r1 = RobotDinamic()
print(r1.nama)     # Optimus
print(r1.kekuatan) # 9000
\`\`\`

## 3. Metaclasses (Pembuat Class)
Metaclass adalah "Class dari sebuah Class". Class membuat Objek, Metaclass membuat Class.
Contoh: Memaksa semua nama fungsi di dalam class harus huruf kecil (*Lowercase*).

\`\`\`python
class PaksaHurufKecilMeta(type):
    def __new__(cls, name, bases, attrs):
        huruf_kecil_attrs = {}
        for kunci, nilai in attrs.items():
            if not kunci.startswith("__"): # Abaikan dunder method
                huruf_kecil_attrs[kunci.lower()] = nilai
            else:
                huruf_kecil_attrs[kunci] = nilai
                
        return super().__new__(cls, name, bases, huruf_kecil_attrs)

class Pengujian(metaclass=PaksaHurufKecilMeta):
    # Sengaja menggunakan huruf kapital
    def CETAK_NAMA(self):
        print("Tercetak!")

p = Pengujian()
p.cetak_nama() # Otomatis diubah menjadi lowercase oleh Metaclass!
\`\`\`

---
## 📝 Quiz Singkat
1. Jika nama atribut/kolom database kita terima dari input User dalam bentuk *String*, fungsi apa yang kita gunakan untuk menarik properti class tersebut secara dinamis?
2. Apa kegunaan parameter \`metaclass=...\` pada definisi suatu class?
`,
    level: 'advanced',
    order: 23,
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: 'py-24',
    user_type: 'student',
    language: 'python',
    title: 'Modul 24: Testing & Debugging',
    description: 'Membangun aplikasi tahan banting dengan Unit Testing menggunakan \`unittest\`, \`pytest\`, dan teknik Mocking.',
    content: `# 🐛 Modul 24: Testing & Debugging

Programmer handal tidak mengetes aplikasinya secara manual. Mereka menulis kode untuk mengetes kode mereka sendiri (Automated Testing / TDD).

## 1. Menggunakan \`unittest\` (Bawaan Python)
Modul bawaan untuk melakukan *Unit Testing* terhadap logika spesifik.

\`\`\`python
import unittest

def hitung_diskon(harga, persen):
    if persen < 0 or persen > 100:
        raise ValueError("Diskon tidak valid")
    return harga - (harga * persen / 100)

# Class Testing
class TestPerhitungan(unittest.TestCase):
    
    def test_diskon_normal(self):
        hasil = hitung_diskon(100000, 20)
        self.assertEqual(hasil, 80000) # Harus persis sama
        
    def test_diskon_error(self):
        # Memastikan exception dipicu jika diskon minus
        with self.assertRaises(ValueError):
            hitung_diskon(50000, -10)

if __name__ == '__main__':
    unittest.main()
\`\`\`

## 2. Pengenalan PyTest (Standar Industri Baru)
Meski \`unittest\` bagus, industri kini lebih banyak menggunakan **PyTest** karena penulisannya sangat ringkas tanpa perlu OOP class.

*(Membutuhkan \`pip install pytest\`)*
\`\`\`python
# file: test_app.py
def kali(a, b):
    return a * b

# Di pytest, kita cukup menggunakan assert standar Python!
def test_perkalian_sukses():
    assert kali(4, 5) == 20
    
def test_perkalian_negatif():
    assert kali(2, -3) == -6
\`\`\`
Jalankan di terminal cukup dengan mengetik: \`pytest\`

## 3. Mocking (Memalsukan Eksekusi)
Bagaimana jika fungsi Anda melakukan *request HTTP* atau *insert Database*? Kita tidak ingin hal itu benar-benar dijalankan saat *Testing* (Memakan waktu dan merusak DB produksi). Kita memalsukannya (*Mocking*).

\`\`\`python
from unittest.mock import MagicMock

class APIClient:
    def fetch_data(self):
        # Misal ini memanggil API internet sungguhan
        pass

# Dalam testing:
client = APIClient()
# Ganti fungsi sungguhan dengan tiruan (Mock)
client.fetch_data = MagicMock(return_value={"status": "OK", "data": "Tiruan"})

print(client.fetch_data()) # Mengembalikan data palsu tanpa menyentuh internet!
\`\`\`

---
## 📝 Quiz Singkat
1. Kenapa kita memerlukan \`Mocking\` dalam proses testing suatu aplikasi Backend?
2. Jika menggunakan \`pytest\`, *keyword* apa dari Python standar yang menjadi tumpuan utama pengecekan *Test Case*?
`,
    level: 'advanced',
    order: 24,
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: 'py-25',
    user_type: 'student',
    language: 'python',
    title: 'Modul 25: Final Advanced Project - Asynchronous API Scraper',
    description: 'Proyek akhir level Advanced: Menggabungkan Asyncio, Aiohttp, OOP, dan Context Manager untuk menarik data secara massal dari internet super cepat.',
    content: `# 🏆 Modul 25: Final Advanced Project

Selamat! Anda mencapai puncak ilmu Python Backend *Core*. Proyek ini akan menggabungkan **Asyncio, OOP (Dunder/Property), dan Context Managers** ke dalam arsitektur nyata: *Asynchronous API Scraper*.

## 🎯 Objektif Proyek
Mengambil data (JSON) dari ratusan URL secara paralel menggunakan library \`aiohttp\`. Kecepatannya bisa 100x lebih cepat dibanding \`requests\` biasa!

*(Anda butuh menginstal \`pip install aiohttp\`)*

## 💻 Implementasi Arsitektur

\`\`\`python
import asyncio
import aiohttp
import time
from dataclasses import dataclass

@dataclass
class APIResult:
    url: str
    status: int
    data: dict

class AsyncScraper:
    def __init__(self, urls: list[str]):
        self._urls = urls
        self._results = []

    @property
    def url_count(self) -> int:
        return len(self._urls)

    # Coroutine privat untuk mengambil 1 halaman
    async def _fetch(self, session, url) -> APIResult:
        try:
            async with session.get(url, timeout=5) as response:
                json_data = await response.json()
                return APIResult(url, response.status, json_data)
        except Exception as e:
            return APIResult(url, 500, {"error": str(e)})

    # Fungsi utama yang mengorkestrasi Async Tasks
    async def run_scraper(self):
        print(f"[!] Mulai scraping {self.url_count} URLs...")
        start_time = time.time()

        # Context manager Async (aiohttp session)
        async with aiohttp.ClientSession() as session:
            # Membuat list of Coroutines
            tasks = [self._fetch(session, url) for url in self._urls]
            
            # Eksekusi paralel semuanya secara concurrent!
            self._results = await asyncio.gather(*tasks)

        print(f"[✅] Selesai dalam {time.time() - start_time:.2f} detik")

    # Dunder untuk iterasi hasil
    def __iter__(self):
        return iter(self._results)


# --- MAIN EXECUTION ---
async def main():
    # Simulasi memanggil Dummy REST API Publik
    daftar_url = [f"https://jsonplaceholder.typicode.com/posts/{i}" for i in range(1, 21)]
    
    scraper = AsyncScraper(daftar_url)
    await scraper.run_scraper()

    # Iterasi hasil berkat __iter__
    for res in scraper:
        print(f"Status: {res.status} | URL: {res.url[-15:]} | Judul: {res.data.get('title', 'Error')[:20]}...")

if __name__ == "__main__":
    # Menjalankan Event Loop
    asyncio.run(main())
\`\`\`

### Kenapa Proyek Ini *Advanced*?
1. Menggunakan **Dataclasses** (\`@dataclass\`) untuk merepresentasikan objek *Data Transfer*.
2. Mematuhi **OOP Enkapsulasi** dengan memisahkan variabel *private* (\`_urls\`) dan properti *getter* (\`url_count\`).
3. Menggunakan **Asyncio & Aiohttp** untuk mencapai Konkurensi I/O yang *Massive*.
4. Mengimplementasikan **Dunder \`__iter__\`** sehingga objek scraper bisa langsung di-\`for loop\`!

**🚀 Selamat dan Luar Biasa!** Anda sekarang resmi memiliki tingkat kedalaman pemahaman Python setara *Senior Python Backend Engineer*! Langkah selanjutnya? Buat REST API sungguhan menggunakan **FastAPI** atau **Django**!
`,
    level: 'expert',
    order: 25,
    created_at: '2025-01-01T00:00:00Z'
  }
];