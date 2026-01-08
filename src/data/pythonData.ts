import { LearningMaterial } from '../types/learning';

export const MOCK_MATERIALS: LearningMaterial[] = [
  // ==================== PYTHON MATERIALS ====================
  {
    id: 'py-01',
    user_type: 'student',
    language: 'python',
    title: 'Pengenalan Python & Lingkungan Kerja Profesional',
    description: 'Filosofi Python, Arsitektur Interpreter, Manajemen Dependensi Modern, dan Standar PEP 8.',
    content: `# 🐍 Modul 1: Python Deep Dive & Professional Setup

## 1. Filosofi & Ekosistem Python
Python diciptakan oleh **Guido van Rossum** pada 1991. Keunggulannya bukan pada kecepatan eksekusi mentah, melainkan pada **produktivitas pengembang**.

### Zen of Python (PEP 20)
Python memiliki filosofi desain yang bisa kamu akses dengan mengetik \`import this\` di terminal Python. Tiga poin intinya:
1. **Readability Counts**: Kode dibaca lebih sering daripada ditulis.
2. **There should be one—and preferably only one—obvious way to do it**: Menghindari ambiguitas.
3. **If the implementation is hard to explain, it's a bad idea**: Kesederhanaan adalah kunci.



---

## 2. Arsitektur: Bagaimana Python Bekerja?
Python adalah bahasa **Interpreted**, namun secara teknis ia melalui tahap kompilasi:
1. **Source Code (.py)**: Kode yang kamu tulis.
2. **Bytecode (.pyc)**: Kode sumber dikonversi menjadi instruksi tingkat rendah yang dipahami mesin.
3. **Python Virtual Machine (PVM)**: Interpreter yang membaca bytecode dan menjalankannya di sistem operasi.

> **Note:** Inilah alasan Python bersifat *cross-platform*. Kamu menulis kode sekali, dan PVM di Windows/Linux/Mac yang akan menyesuaikannya.

---

## 3. Setup Lingkungan Kerja Profesional (The Right Way)
Di industri, kita tidak pernah mengandalkan "Global Python". Kita menggunakan isolasi untuk menghindari **Dependency Hell**.

### A. Instalasi & Verifikasi
Pastikan Python 3.10 atau lebih baru terpasang.
\`\`\`bash
python --version
\`\`\`

### B. Virtual Environments (venv)
Virtual environment adalah salinan terisolasi dari Python untuk proyek spesifik.


**Workflow Eksekusi:**
1. **Inisialisasi Proyek:**
   \`\`\`bash
   mkdir proyek_python && cd proyek_python
   \`\`\`
2. **Membuat Lingkungan Terisolasi:**
   \`\`\`bash
   # Folder '.venv' adalah standar industri untuk menaruh file environment
   python -m venv .venv
   \`\`\`
3. **Aktivasi (Penting!):**
   - **Windows:** \`.venv\\Scripts\\activate\`
   - **macOS/Linux:** \`source .venv/bin/activate\`
   *Ciri berhasil: Muncul tanda (.venv) di depan prompt terminal.*

---

## 4. Manajemen Paket dengan PIP & Requirements
\`pip\` (Package Installer for Python) memungkinkan kita mengunduh ribuan library dari **PyPI** (Python Package Index).

**Manajemen Dependensi:**
* **Install Library:** \`pip install pandas\`
* **List Library:** \`pip list\`
* **Freeze (Dokumentasi):** \`pip freeze > requirements.txt\`
  *Fungsi: Agar rekan tim bisa menginstal library yang sama dengan \`pip install -r requirements.txt\`.*

---

## 5. Menulis Kode Pertama: Scripting & Boilerplate
Struktur file Python profesional biasanya menggunakan blok \`if __name__ == "__main__":\`. Ini memastikan kode hanya berjalan jika file dieksekusi langsung, bukan saat di-import oleh file lain.

\`\`\`python
# file: hello.py

def main():
    # Menggunakan f-string (fitur Python 3.6+) untuk performa & readability
    user = "Engineer"
    print(f"Status: System Active. Welcome, {user}.")

if __name__ == "__main__":
    # Titik masuk utama aplikasi
    main()
\`\`\`

---

## ✍️ Latihan Terstruktur (20 Menit)
1. **Isolasi**: Buat folder baru \`lab_python\`, buat venv di dalamnya, dan aktifkan.
2. **Eksperimen PIP**: Install library \`art\`.
3. **Scripting**: Buat file \`app.py\` yang mencetak nama kamu dalam bentuk ASCII art menggunakan library tersebut.
4. **Dokumentasi**: Hasilkan file \`requirements.txt\` dari environment tersebut.

## 🎯 Target Kompetensi
- Mampu menjelaskan alur kerja interpreter Python.
- Mampu melakukan setup proyek yang bersih dan terisolasi.
- Memahami standarisasi struktur kode profesional (PEP 8 dasar).
`,
    level: 'beginner',
    order: 1,
    created_at: '2025-01-01T00:00:00Z'
},
  {
    id: 'py-02',
    user_type: 'student',
    language: 'python',
    title: 'Data Types & Type Hinting: Menulis Kode Robust',
    description: 'Eksplorasi tipe data primitif, Dynamic Typing vs Static Typing, Memory Reference, dan manipulasi String modern.',
    content: `# 🏗️ Modul 2: Data Types & Type Hinting (Robust Coding)

## 1. Memahami Variabel & Memory Reference
Di Python, variabel bukanlah "kotak" yang menyimpan nilai, melainkan **label** yang menunjuk ke sebuah objek di memori.



### Karakteristik Utama:
* **Dynamic Typing**: Kamu tidak perlu mendeklarasikan tipe data secara eksplisit (Python akan menebaknya).
* **Strong Typing**: Python tidak akan mengizinkan operasi antar tipe yang tidak kompatibel (misal: \`5 + "10"\` akan error, berbeda dengan JavaScript).

---

## 2. Deep Dive: Tipe Data & Immutability
Python membagi data menjadi dua kategori besar yang krusial untuk dipahami agar tidak terjadi bug saat manipulasi data:

| Tipe Data | Contoh | Sifat | Penjelasan |
| :--- | :--- | :--- | :--- |
| **int** | \`10\`, \`-5\` | Immutable | Bilangan bulat tanpa batas (Arbitrary Precision). |
| **float** | \`3.14\`, \`2.0\` | Immutable | Bilangan desimal (IEEE 754 double precision). |
| **str** | \`"Python"\` | Immutable | Urutan karakter Unicode. |
| **bool** | \`True\`, \`False\` | Immutable | Nilai logika (Subclass dari integer: 1 & 0). |

> **Konsep Penting:** **Immutable** berarti nilai objek tersebut tidak bisa diubah setelah dibuat. Jika kamu mengubah string, Python sebenarnya membuat string baru di memori.

---

## 3. Modern Type Hinting (Standar Industri)
Walaupun Python dinamis, industri (Google, Meta, Netflix) menggunakan **Type Hinting** untuk menjaga kualitas kode di proyek besar.

\`\`\`python
from typing import Final, Optional

# Konstanta (Gunakan Final agar nilainya tidak sengaja diubah)
PI: Final[float] = 3.14159

# Variabel dengan Type Hinting
username: str = "dian_tech"
is_active: bool = True

# Type Hinting Koleksi (Python 3.9+)
tags: list[str] = ["python", "backend", "fastapi"]
user_profile: dict[str, int] = {"id": 1, "level": 10}

# Optional: Jika variabel boleh bernilai None
middle_name: Optional[str] = None
\`\`\`
*Keuntungan: IDE (VS Code/PyCharm) akan memberikan peringatan jika kamu mencoba memasukkan tipe data yang salah.*

---

## 4. Master String Manipulation & F-Strings
F-Strings bukan hanya untuk mencetak variabel, tapi juga untuk **ekspresi langsung** dan **formatting**.

\`\`\`python
# 1. Padding & Alignment
print(f"|{'Menu':^20}|")  # Tengah (Center)
print(f"|{'Harga':<20}|") # Rata Kiri

# 2. Number Formatting (Sangat Penting untuk Aplikasi Finansial)
salary: int = 15500000
tax_rate: float = 0.11
total_tax: float = salary * tax_rate

print(f"Gaji Pokok: Rp {salary:,.0f}") # Output: Rp 15,500,000
print(f"Pajak (11%): Rp {total_tax:,.2f}") # 2 angka di belakang koma

# 3. String Methods Modern
slug = "  Belajar-Python-Mudah  ".strip().lower().replace("-", " ")
print(slug) # "belajar python mudah"
\`\`\`

---

## 5. Type Casting & Input Validation
Karena \`input()\` selalu menghasilkan \`str\`, kita harus melakukan konversi yang aman.

\`\`\`python
try:
    user_age = int(input("Masukkan umur: "))
    days_lived = user_age * 365
    print(f"Anda telah hidup sekitar {days_lived:,} hari.")
except ValueError:
    print("Error: Harap masukkan angka yang valid!")
\`\`\`

---

## ✍️ Latihan Modul 2 (20 Menit)
**Proyek: Sistem Invoice Sederhana**
1.  Buat variabel dengan Type Hinting untuk: \`nama_produk\`, \`harga_satuan\`, dan \`jumlah_beli\`.
2.  Hitung \`subtotal\` dan beri diskon 10% jika \`subtotal\` di atas 100.000.
3.  Tampilkan output dengan format seperti ini:
    \`\`\`text
    --- INVOICE ---
    Produk  : [Nama Produk]
    Total   : Rp [Harga dengan pemisah ribuan]
    Diskon  : [Persen Diskon]%
    AKHIR   : Rp [Total Akhir]
    ----------------
    \`\`\`

## 🎯 Outcome Modul
- Mampu membedakan objek mutable dan immutable.
- Mampu menulis kode yang "Self-Documenting" dengan Type Hinting.
- Mahir melakukan formatting data numerik dan teks untuk UI/Laporan.
`,
    level: 'beginner',
    order: 2,
    created_at: '2025-01-01T00:00:00Z'
},
  {
    id: 'py-03',
    user_type: 'student',
    language: 'python',
    title: 'Control Flow: Logika Kompleks & Optimasi Loop',
    description: 'Menguasai Match Case, Walrus Operator, Short-circuit logic, dan teknik iterasi efisien.',
    content: `# 🧠 Modul 3: Control Flow & Logic Optimization

## 1. Alur Logika & Short-Circuit Evaluation
Sebelum masuk ke sintaks, kamu harus paham bagaimana Python mengevaluasi logika. Python menggunakan **Short-circuiting**: jika hasil akhir sudah bisa ditentukan dari kondisi pertama, kondisi kedua tidak akan diperiksa.



\`\`\`python
# Contoh efisiensi: fungsi cek_database() tidak akan dijalankan jika user_id adalah 0
if user_id != 0 and cek_database(user_id):
    print("User ditemukan")
\`\`\`

---

## 2. Percabangan Modern: Structural Pattern Matching
Python 3.10 memperkenalkan \`match-case\`. Ini bukan sekadar \`switch-case\` biasa; ini adalah **Pattern Matching**.

\`\`\`python
def process_command(command: str):
    # Pattern matching bisa membedah struktur data
    match command.split():
        case ["quit"]:
            print("Sistem dimatikan...")
        case ["load", filename]:
            print(f"Memuat file: {filename}")
        case ["move", x, y] if int(y) > 0: # Guard condition
            print(f"Bergerak ke koordinat {x}, {y}")
        case _:
            print("Perintah tidak dikenali.")
\`\`\`

---

## 3. Walrus Operator (\`:=\`): Penugasan dalam Ekspresi
Resmi hadir di Python 3.8, operator ini sangat berguna untuk menghindari pemanggilan fungsi yang berat berulang kali dalam satu blok kondisi.

\`\`\`python
# CASE: Membaca input user sampai mereka mengetik 'exit'
while (user_input := input("Perintah: ").lower()) != "exit":
    print(f"Memproses {user_input}...")
\`\`\`

---

## 4. Iterasi Tingkat Lanjut (Loops)
Loop di Python dirancang untuk **Readability**. Hindari penggunaan \`range(len(data))\` jika tidak sangat diperlukan.

### A. Enumerate & Zip
\`\`\`python
names = ["Alice", "Bob", "Charlie"]
scores = [85, 92, 78]

# Menggabungkan dua list secara paralel dengan zip()
for name, score in zip(names, scores):
    print(f"Siswa: {name} | Nilai: {score}")

# Mendapatkan index dengan enumerate()
for i, name in enumerate(names, start=1):
    print(f"Rangking {i}: {name}")
\`\`\`

### B. List Comprehension (Pythonic Way)
Cara elegan untuk membuat list baru dari iterasi dalam satu baris.
\`\`\`python
angka = [1, 2, 3, 4, 5, 6]
# Ambil angka genap saja dan kuadratkan
kuadrat_genap = [x**2 for x in angka if x % 2 == 0] 
# Output: [4, 16, 36]
\`\`\`

---

## 5. Control Statement: Break, Continue, Else
Tahukah kamu? Loop di Python punya blok \`else\`. Blok \`else\` pada loop akan dijalankan **hanya jika** loop selesai secara normal (tidak terkena \`break\`).

\`\`\`python
for i in range(3):
    pw = input("Password: ")
    if pw == "admin":
        print("Login Berhasil!")
        break
else:
    # Berjalan jika user salah 3x (loop habis tanpa break)
    print("Kesempatan habis. Akun terkunci.")
\`\`\`

---

## ✍️ Latihan Modul 3 (20 Menit)
**Proyek: Smart Inventory Monitor**
1.  Buat list dictionary \`stok_barang = [{"nama": "Monitor", "jumlah": 5}, {"nama": "Mouse", "jumlah": 0}]\`.
2.  Gunakan loop untuk memeriksa setiap barang.
3.  Gunakan **Match Case** atau **If-Else** untuk menentukan status:
    - Jika jumlah > 10: "Stok Aman"
    - Jika jumlah 1 - 10: "Stok Menipis"
    - Jika jumlah 0: "Habis Total"
4.  Tambahkan fitur: Gunakan **List Comprehension** untuk membuat list baru berisi hanya nama barang yang stoknya "Habis Total".

## 🎯 Outcome Modul
- Mengurangi redundansi kode dengan Walrus Operator.
- Mampu memproses data koleksi secara paralel menggunakan \`zip\`.
- Memahami teknik pembuatan list secara instan dengan Comprehension.
`,
    level: 'beginner',
    order: 3,
    created_at: '2025-01-01T00:00:00Z'
},
  {
    id: 'py-04',
    user_type: 'student',
    language: 'python',
    title: 'Data Structures Deep Dive & Comprehensions',
    description: 'Memahami Mutability, Performa Dictionary (O(1)), Slicing, dan Advanced Comprehensions.',
    content: `# 🏗️ Modul 4: Data Structures Deep Dive (Efficiency First)

## 1. Analisis Struktur Data: Performa & Memori
Sebagai developer intermediate, kamu harus memilih struktur data bukan hanya berdasarkan fitur, tapi juga efisiensi.

| Struktur | Tipe | Keunggulan | Kasus Penggunaan |
| :--- | :--- | :--- | :--- |
| **List** \`[]\` | Mutable | Urutan (Order) terjaga | Daftar transaksi, antrean data. |
| **Tuple** \`()\` | Immutable | Hemat memori & Cepat | Koordinat GPS, Konfigurasi DB. |
| **Set** \`{}\` | Mutable | Unik & Cek member kilat | Menghapus duplikat, filter kategori. |
| **Dict** \`{:}\` | Mutable | Key-Value mapping | Caching, Data JSON, Profil user. |



---

## 2. Advanced Slicing & Unpacking
Jangan gunakan loop hanya untuk mengambil sebagian data atau memecah isi list.

\`\`\`python
data = [100, 200, 300, 400, 500]

# Slicing [start:stop:step]
top_three = data[:3]    # [100, 200, 300]
reverse = data[::-1]    # Membalikkan list

# Extended Iterable Unpacking
head, *middle, tail = data
# head = 100, middle = [200, 300, 400], tail = 500
\`\`\`

---

## 3. The Power of Sets (O(1) Complexity)
Mengecek keberadaan member (\`in\`) di **List** butuh waktu lebih lama seiring bertambahnya data (O(n)). Di **Set**, waktunya konstan (O(1)).

\`\`\`python
# Operasi Himpunan (Set Theory)
admin_group = {"ali", "budi"}
editor_group = {"budi", "cici"}

# Siapa yang punya kedua akses? (Intersection)
both = admin_group & editor_group # {"budi"}

# Gabungkan semua user unik (Union)
all_users = admin_group | editor_group # {"ali", "budi", "cici"}
\`\`\`

---

## 4. Master Comprehensions (List & Dict)
Comprehension bukan sekadar menyingkat kode, tapi juga seringkali lebih cepat secara eksekusi karena dioptimalkan di level C-Python.

### A. List Comprehension dengan Logika Kompleks
\`\`\`python
# Rumus: [hasil_true if kondisi else hasil_false for item in iterable]
scores = [45, 80, 55, 90, 30]
status = ["LULUS" if s >= 60 else "REMIDIAL" for s in scores]
\`\`\`

### B. Dictionary Comprehension
Mengubah list menjadi mapping secara instan.
\`\`\`python
users = [("1", "Admin"), ("2", "Staff")]
user_dict = {uid: role for uid, role in users}
# Output: {'1': 'Admin', '2': 'Staff'}
\`\`\`

---

## 5. Dictionary Safe Access & Defaulting
Menghindari \`KeyError\` adalah tanda kode yang robust.

\`\`\`python
settings = {"theme": "dark"}

# 1. Method .get()
font = settings.get("font", "Arial") # Arial sebagai fallback

# 2. Method .setdefault()
# Jika key tidak ada, isi dengan nilai default dan kembalikan nilainya
lang = settings.setdefault("lang", "id") 
\`\`\`

---

## ✍️ Latihan Modul 4 (25 Menit)
**Proyek: Data Analyst Mini Tool**
Kamu memiliki data mentah log masuk user (banyak duplikat):
\`log_masuk = ["Budi", "Siti", "Budi", "Andi", "Siti", "Andi", "Andi"]\`

1.  Dapatkan daftar **user unik** menggunakan Set.
2.  Gunakan **Dictionary Comprehension** untuk menghitung panjang karakter dari masing-masing nama unik tersebut (Contoh: \`{"Budi": 4, ...}\`).
3.  Gunakan **List Comprehension** untuk membuat list baru berisi nama user yang panjangnya lebih dari 4 karakter, ubah semua menjadi **HURUF KAPITAL**.

## 🎯 Outcome Modul
- Mampu mengoptimalkan pencarian data menggunakan Set.
- Mahir memanipulasi list/dict tanpa menggunakan loop konvensional yang panjang.
- Memahami konsep unpacking untuk manajemen variabel yang lebih clean.
`,
    level: 'intermediate',
    order: 4,
    created_at: '2025-01-01T00:00:00Z'
},
  {
    id: 'py-05',
    user_type: 'student',
    language: 'python',
    title: 'Functions, Scoping & Lambda Expressions',
    description: 'Memahami parameter *args, **kwargs, Global vs Local Scope, dan fungsi anonim.',
    content: `# Functions: Reusability & Modularitas

## 1. Parameter Fleksibel: *args & **kwargs
Kadang kita tidak tahu berapa banyak argumen yang akan dikirim user.

- **\*args**: Mengumpulkan argumen posisi sebagai **Tuple**.
- **\*\*kwargs**: Mengumpulkan argumen kata kunci sebagai **Dictionary**.

\`\`\`python
def buat_laporan(judul: str, *nilai: int, **metadata: str):
    print(f"--- {judul} ---")
    rata_rata = sum(nilai) / len(nilai)
    print(f"Rata-rata: {rata_rata}")
    
    for key, value in metadata.items():
        print(f"{key.capitalize()}: {value}")

buat_laporan("Nilai Siswa", 80, 90, 85, guru="Pak Budi", kelas="12-A")
\`\`\`

---

## 2. Memahami Scope (Lingkup Variabel)
Aturan **LEGB** (Local, Enclosing, Global, Built-in).

\`\`\`python
total = 0 # Global

def tambah(n):
    global total # Wajib deklarasi jika ingin mengubah variabel global
    total += n

tambah(10)
print(total) # 10
\`\`\`
*Catatan: Penggunaan \`global\` sebaiknya dihindari dalam desain sistem besar karena sulit didebug.*

---

## 3. Lambda & Higher-Order Functions
Lambda adalah fungsi tanpa nama (anonymous) untuk tugas sekali pakai.

\`\`\`python
# Format: lambda arguments: expression
tambah_sepuluh = lambda x: x + 10
print(tambah_sepuluh(5)) # 15

# Contoh nyata: Sorting list of dict
users = [
    {"nama": "Zaki", "umur": 25},
    {"nama": "Abby", "umur": 20}
]
users.sort(key=lambda u: u["umur"]) # Urutkan berdasarkan umur
\`\`\`

---

## ✍️ Latihan Modul 5 (20 Menit)
1.  Buatlah fungsi bernama \`hitung_total_belanja\` yang menerima \`*prices\` (list harga barang).
2.  Tambahkan parameter keyword \`**diskon\` untuk memproses potongan harga (contoh: \`diskon=0.1\` untuk 10%).
3.  Gunakan Lambda untuk memformat hasil akhir menjadi string "Total: Rp xxxxx".

## 🎯 Outcome Modul
- Mampu mendesain fungsi yang fleksibel.
- Memahami kapan harus menggunakan lambda dibanding fungsi \`def\`.
`,
    level: 'intermediate',
    order: 5,
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: 'py-06',
    user_type: 'student',
    language: 'python',
    title: 'OOP Modern: Dari Class Standard ke Dataclasses',
    description: 'Enkapsulasi, Inheritance, Dunder Methods, dan kemudahan Python Dataclasses.',
    content: `# Object Oriented Programming (OOP) Modern

OOP memungkinkan kita memetakan masalah dunia nyata ke dalam kode.



## 1. Class Standard & Enkapsulasi
Gunakan tanda underscore \`__\` untuk membuat variabel "Private".

\`\`\`python
class RekeningBank:
    def __init__(self, pemilik: str, saldo_awal: int):
        self.pemilik = pemilik
        self.__saldo = saldo_awal # Private attribute

    def cek_saldo(self):
        return f"Saldo {self.pemilik}: {self.__saldo}"

    def setor(self, jumlah: int):
        if jumlah > 0:
            self.__saldo += jumlah
\`\`\`

---

## 2. Dunder Methods (Magic Methods)
Pernahkah Anda bertanya bagaimana \`print(objek)\` menampilkan teks yang bagus? Itu menggunakan \`__str__\`.

\`\`\`python
class Buku:
    def __init__(self, judul, penulis):
        self.judul = judul
        self.penulis = penulis

    def __str__(self): # Mengatur tampilan saat di-print
        return f"'{self.judul}' oleh {self.penulis}"

buku1 = Buku("Laskar Pelangi", "Andrea Hirata")
print(buku1) # 'Laskar Pelangi' oleh Andrea Hirata
\`\`\`

---

## 3. Dataclasses (Pythonic & Ringkas)
Sejak Python 3.7, kita punya \`@dataclass\`. Sangat bagus untuk class yang fungsinya cuma buat "simpan data".

\`\`\`python
from dataclasses import dataclass

@dataclass
class User:
    id: int
    username: str
    email: str
    is_admin: bool = False # Default value

# Tidak perlu nulis __init__ lagi!
u1 = User(1, "rian_dev", "rian@mail.com")
print(u1) # User(id=1, username='rian_dev', email='rian@mail.com', is_admin=False)
\`\`\`

---

## ✍️ Latihan Modul 6 (25 Menit)
1.  Buat class \`Kendaraan\` dengan atribut \`merk\` dan \`tahun\`.
2.  Buat subclass \`Mobil\` yang mewarisi \`Kendaraan\` dan tambah atribut \`jumlah_pintu\`.
3.  Implementasikan method \`deskripsi()\` di class \`Mobil\` untuk menampilkan info lengkapnya.
4.  Coba buat objek mobil dan panggil methodnya.

## 🎯 Outcome Modul
- Mampu mengorganisir kode ke dalam objek yang terstruktur.
- Menghemat waktu koding dengan menggunakan Dataclasses.
`,
    level: 'advanced',
    order: 6,
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: 'py-07',
    user_type: 'student',
    language: 'python',
    title: 'Exception Handling & File Operations',
    description: 'Membangun aplikasi tahan banting (robust) dan manajemen file I/O.',
    content: `# Penanganan Error & Sistem File

## 1. Try, Except, Else, Finally
Jangan biarkan program Anda mati hanya karena satu kesalahan kecil.

\`\`\`python
try:
    with open("config.json", "r") as file:
        data = file.read()
except FileNotFoundError:
    print("⚠️ File config tidak ditemukan, menggunakan default.")
except Exception as e:
    print(f"❌ Terjadi kesalahan fatal: {e}")
else:
    print("✅ File berhasil dibaca tanpa error.")
finally:
    print("🔄 Proses pembersihan/cleaning selesai.")
\`\`\`

---

## 2. Context Manager (\`with\` statement)
Selalu gunakan \`with\` saat membuka file atau koneksi database. Ini memastikan file **otomatis ditutup** meskipun terjadi error di tengah jalan.

\`\`\`python
# Menulis file (mode 'w' = overwrite, 'a' = append)
log_data = ["User login", "Upload file", "Logout"]

with open("logs.txt", "w") as f:
    for line in log_data:
        f.write(f"{line}\n")
\`\`\`

---

## 3. Custom Exceptions
Anda bisa membuat jenis error sendiri untuk logika bisnis Anda.

\`\`\`python
class UmurTidakValid(Exception):
    pass

def daftar_sim(umur: int):
    if umur < 17:
        raise UmurTidakValid("Belum cukup umur untuk membuat SIM!")
    return "Pendaftaran diproses."
\`\`\`

---

## ✍️ Latihan Modul 7 (20 Menit)
1.  Buatlah sebuah file bernama \`guestbook.txt\` secara manual atau via koding.
2.  Buat program yang meminta input nama pengunjung terus menerus.
3.  Simpan setiap nama ke dalam file tersebut (satu nama per baris).
4.  Gunakan \`try-except\` untuk menangani jika seandainya disk penuh atau file tidak bisa diakses.

## 🎯 Outcome Modul
- Program tidak crash saat bertemu input tidak valid.
- Mampu mengelola data persisten sederhana lewat file teks.
`,
    level: 'advanced',
    order: 7,
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: 'py-08',
    user_type: 'student',
    language: 'python',
    title: 'Networking & Integration: API with Requests',
    description: 'Berinteraksi dengan dunia luar: HTTP Requests, JSON Parsing, dan API Integration.',
    content: `# Python & The Web

Python adalah bahasa favorit untuk integrasi API dan web scraping.

## 1. Memahami Library \`requests\`
Library ini adalah standar industri untuk melakukan HTTP calls.

\`\`\`python
import requests

def get_crypto_price(coin: str):
    url = f"https://api.coingecko.com/api/v3/simple/price?ids={coin}&vs_currencies=idr"
    
    try:
        response = requests.get(url, timeout=10)
        response.raise_for_status() # Raise error jika status 4xx atau 5xx
        
        data = response.json() # Parse JSON otomatis jadi Dict
        return data[coin]["idr"]
    except requests.exceptions.RequestException as e:
        return f"Error: {e}"

print(f"Harga Bitcoin: Rp {get_crypto_price('bitcoin'):,}")
\`\`\`

---

## 2. Mengelola JSON yang Kompleks
Data dari API biasanya bersarang (nested). Gunakan teknik akses dictionary yang aman.

\`\`\`python
payload = {
    "status": "success",
    "data": {
        "users": [
            {"id": 1, "name": "Andi"},
            {"id": 2, "name": "Budi"}
        ]
    }
}

# Mengambil nama user kedua
nama_user = payload.get("data", {}).get("users", [])[1].get("name")
\`\`\`

---

## 3. HTTP Methods: POST & Headers
Saat mengirim data (seperti login atau post artikel), kita menggunakan method POST.

\`\`\`python
headers = {"Authorization": "Bearer TOKEN_RAHASIA"}
payload = {"title": "Belajar Python", "body": "Konten materi..."}

res = requests.post("https://api.medium.com/posts", json=payload, headers=headers)
\`\`\`

---

## ✍️ Latihan Modul 8 (30 Menit)
1.  Cari API publik gratis (Contoh: JSONPlaceholder atau PokeAPI).
2.  Buat script Python yang mengambil daftar 10 user pertama.
3.  Tampilkan hanya nama dan email mereka ke terminal.
4.  Simpan daftar tersebut ke file \`users_export.json\` menggunakan library \`json\`.

## 🎯 Outcome Modul
- Mampu menghubungkan aplikasi Python dengan layanan luar.
- Paham cara menangani data JSON yang kompleks.
`,
    level: 'advanced',
    order: 8,
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: 'py-09',
    user_type: 'student',
    language: 'python',
    title: 'Studi Kasus 1: Financial Tracker & Analyzer',
    description: 'Proyek Akhir 1: Mengolah data transaksi, menghitung persentase, dan statistik belanja.',
    content: `# Project: Personal Financial Tracker

## 📜 Tujuan
Membangun sistem untuk mencatat pengeluaran, mengkategorikannya, dan memberikan statistik sederhana.

## 🔧 Fitur yang Akan Dibuat
1.  **Input Transaksi**: Nama barang, Kategori (Makan, Transport, Hiburan), Harga.
2.  **Statistik Kategori**: Menjumlahkan total belanja per kategori.
3.  **Laporan Hemat**: Mencari transaksi termahal dan termurah.

## 💻 Implementasi Kode (Best Practice)
\`\`\`python
from dataclasses import dataclass
from typing import List

@dataclass
class Transaction:
    name: str
    category: str
    amount: int

class FinanceTracker:
    def __init__(self):
        self.history: List[Transaction] = []

    def add_record(self, name: str, category: str, amount: int):
        new_item = Transaction(name, category, amount)
        self.history.append(new_item)

    def get_total(self) -> int:
        return sum(t.amount for t in self.history)

    def get_report_by_category(self):
        report = {}
        for t in self.history:
            report[t.category] = report.get(t.category, 0) + t.amount
        return report

# --- Eksekusi ---
my_wallet = FinanceTracker()
my_wallet.add_record("Nasi Padang", "Makan", 25000)
my_wallet.add_record("Gojek", "Transport", 15000)
my_wallet.add_record("Steak", "Makan", 150000)
my_wallet.add_record("Bioskop", "Hiburan", 50000)

print(f"Total Pengeluaran: Rp {my_wallet.get_total():,}")
print("Detail per Kategori:")
for cat, total in my_wallet.get_report_by_category().items():
    print(f"- {cat}: Rp {total:,}")

# List Comprehension untuk cari yang mahal
mahal = [t.name for t in my_wallet.history if t.amount > 30000]
print(f"Barang mahal (>30rb): {', '.join(mahal)}")
\`\`\`

---

## ✍️ Tantangan Pengembangan
Tambahkan fitur untuk menyimpan data \`history\` ke dalam file CSV agar data tidak hilang saat program ditutup.
`,
    level: 'advanced',
    order: 9,
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: 'py-10',
    user_type: 'student',
    language: 'python',
    title: 'Studi Kasus 2: Library Management System (Full OOP)',
    description: 'Proyek Akhir 2: Desain sistem manajemen buku dengan Inheritance, Search, dan Stock Control.',
    content: `# Project: Smart Library System

## 📜 Tujuan
Menggabungkan semua konsep: OOP, List Management, Search Logic, dan Validasi.

## 🔧 Spesifikasi
1.  **Class Book**: Menyimpan judul, penulis, dan status tersedia/dipinjam.
2.  **Class Library**: Koleksi buku dengan fitur:
    * Cari buku berdasarkan judul (case-insensitive).
    * Peminjaman buku (update status).
    * Pengembalian buku.

## 💻 Implementasi Kode
\`\`\`python
class Book:
    def __init__(self, title: str, author: str):
        self.title = title
        self.author = author
        self.is_loaned = False

    def __str__(self):
        status = "Dipinjam" if self.is_loaned else "Tersedia"
        return f"[{status}] {self.title} - {self.author}"

class Library:
    def __init__(self):
        self.books: list[Book] = []

    def add_book(self, book: Book):
        self.books.append(book)

    def find_book(self, keyword: str):
        # Case insensitive search
        results = [b for b in self.books if keyword.lower() in b.title.lower()]
        return results

    def loan_book(self, title: str):
        for b in self.books:
            if b.title.lower() == title.lower():
                if not b.is_loaned:
                    b.is_loaned = True
                    return f"✅ Berhasil meminjam {b.title}"
                return "❌ Maaf, buku sedang dipinjam orang lain."
        return "❌ Buku tidak ditemukan."

# --- Simulasi ---
lib = Library()
lib.add_book(Book("Python 101", "Guido Van Rossum"))
lib.add_book(Book("Clean Code", "Robert C. Martin"))
lib.add_book(Book("The Hobbit", "J.R.R. Tolkien"))

# 1. Cari buku
print("Hasil Pencarian 'Python':")
for b in lib.find_book("python"):
    print(b)

# 2. Pinjam Buku
print(f"\n{lib.loan_book('The Hobbit')}")
print(lib.loan_book('The Hobbit')) # Coba pinjam lagi (harus gagal)

# 3. Laporan Akhir
print("\nKoleksi Perpustakaan Sekarang:")
for b in lib.books:
    print(b)
\`\`\`

---

## 🏆 Kesimpulan Kurikulum
Selamat! Anda telah menempuh perjalanan dari instalasi hingga membangun sistem OOP yang kompleks. Python adalah perjalanan panjang, langkah selanjutnya adalah memilih spesialisasi: **Data Science (Pandas)**, **Web (Django)**, atau **AI (PyTorch)**.
`,
    level: 'advanced',
    order: 10,
    created_at: '2025-01-01T00:00:00Z'
  },
];