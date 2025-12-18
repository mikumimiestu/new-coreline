import { LearningMaterial } from '../types/learning';

export const MOCK_MATERIALS: LearningMaterial[] = [
  // ==================== PYTHON MATERIALS ====================
  {
    id: 'py-01',
    user_type: 'student',
    language: 'python',
    title: 'Pengenalan Python & Lingkungan Kerja Profesional',
    description: 'Filosofi Python, Ekosistem, Instalasi, Virtual Environment (venv), dan Deep Dive Interpreter.',
    content: `# 🐍 Pengenalan Python & Setup Profesional

## Mengapa Belajar Python di 2024/2025?
Python bukan sekadar bahasa pemrograman; ia adalah ekosistem. Python digunakan oleh raksasa teknologi seperti Google (YouTube), Meta (Instagram), dan NASA. 

**Filosofi Zen of Python (PEP 20):**
* *Beautiful is better than ugly.*
* *Explicit is better than implicit.*
* *Simple is better than complex.*

---

## 🛠️ Manajemen Lingkungan (Workflow Industri)
Banyak pemula merusak instalasi Python sistem mereka karena menginstal library secara global. Kita akan menggunakan **Virtual Environments**.



### 1. Memasang Python
Pastikan Anda mengunduh dari [python.org](https://python.org). Cek versi Anda di terminal:
\`\`\`bash
python --version  # Minimal 3.10+ direkomendasikan
\`\`\`

### 2. Isolasi Proyek dengan Venv
Virtual environment mengisolasi dependensi antar proyek. Jika Proyek A butuh Django 3 dan Proyek B butuh Django 4, venv adalah solusinya.

\`\`\`bash
# 1. Buat folder proyek
mkdir belajar-python && cd belajar-python

# 2. Buat venv
python -m venv .venv

# 3. Aktivasi
# Windows:
.venv\\Scripts\\activate
# Mac/Linux:
source .venv/bin/activate
\`\`\`

### 3. Ekosistem pip & requirements.txt
\`pip\` adalah package manager Python. Untuk mencatat apa saja yang diinstal:
\`\`\`bash
pip install requests  # Contoh instal library
pip freeze > requirements.txt  # Menyimpan daftar library
\`\`\`

---

## 💻 Eksekusi Kode: Script vs Interactive
1.  **Interactive (REPL):** Ketik \`python\` di terminal. Bagus untuk tes cepat.
2.  **Scripting:** Membuat file \`.py\`. Cara standar membangun aplikasi.

\`\`\`python
# main.py
def salam(nama: str):
    """Fungsi sederhana untuk menyapa."""
    print(f"Halo, {nama}! Selamat datang di dunia Python.")

if __name__ == "__main__":
    salam("Programmer")
\`\`\`

---

## ✍️ Latihan Modul 1 (15 Menit)
1.  Buatlah sebuah virtual environment baru bernama \`env_latihan\`.
2.  Install library \`cowsay\` menggunakan pip.
3.  Buat file \`app.py\`, import cowsay, dan jalankan \`cowsay.cow('Python itu keren!')\`.

## 🎯 Outcome Modul
- Memahami beda Python global vs virtual environment.
- Mampu mengelola library pihak ketiga secara profesional.
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
    description: 'Eksplorasi tipe data primitif, Dynamic Typing vs Static Typing, dan manipulasi String modern.',
    content: `# Variabel & Modern Python Typing

## 1. Deep Dive: Tipe Data Primitif
Python memang "dynamic", tapi di baliknya setiap data memiliki tipe yang ketat.

* **int**: Bilangan bulat (tanpa batas ukuran di Python 3!).
* **float**: Bilangan desimal (presisi ganda).
* **str**: Teks (Unicode secara default).
* **bool**: \`True\` atau \`False\`.

---

## 2. Type Hinting (Standar Industri Baru)
Sejak Python 3.6+, komunitas beralih ke Type Hinting. Mengapa?
1.  **Auto-complete** di VS Code menjadi lebih akurat.
2.  **Static Analysis** (menggunakan tool seperti \`mypy\`) untuk menangkap bug sebelum kode dijalankan.

\`\`\`python
# Cara penulisan: variable_name: type = value
username: str = "alex_dev"
login_attempts: int = 3
is_premium: bool = False
wallet_balance: float = 150.75

# Type hinting pada koleksi (Python 3.9+)
daftar_nilai: list[int] = [80, 90, 100]
konfigurasi: dict[str, str] = {"theme": "dark", "lang": "id"}
\`\`\`

---

## 3. String Manipulation & F-Strings
Lupakan cara lama \`"Halo " + nama\`. Python punya **f-strings** yang sangat powerful.

\`\`\`python
nama = "Budi"
skor = 95.5678

# Format angka: .2f artinya 2 angka di belakang koma
# Ribuan: {angka:,}
pesan = f"Halo {nama}, skor akhir Anda adalah {skor:.2f}"
print(pesan) # Halo Budi, skor akhir Anda adalah 95.57

# Method String yang sering dipakai
raw_input = "  python_developer  "
clean_input = raw_input.strip().upper() # "PYTHON_DEVELOPER"
\`\`\`

---

## 4. Konversi Data (Type Casting)
Hati-hati dengan input user! Semua input dari terminal dianggap **String**.

\`\`\`python
# Program hitung umur
tahun_lahir = input("Tahun berapa kamu lahir? ") 
# Jika input "1995", maka tahun_lahir adalah str "1995"

umur = 2025 - int(tahun_lahir) # Konversi str -> int
print(f"Umur kamu: {umur} tahun")
\`\`\`

---

## ✍️ Latihan Modul 2 (15 Menit)
Buatlah program "Kalkulator Gaji Sederhana":
1.  Minta input nama (str), gaji pokok (int), dan jumlah hari lembur (int).
2.  Setiap hari lembur dibayar 50.000.
3.  Tampilkan total gaji dengan format ribuan (Contoh: Rp 5,000,000) menggunakan f-string.

## 🎯 Outcome Modul
- Terbiasa menggunakan Type Hinting.
- Menguasai formatting string untuk laporan data.
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
    description: 'Menguasai Match Case, Walrus Operator, dan teknik iterasi yang efisien.',
    content: `# Logic & Loops: Mengatur Alur Program

## 1. Percabangan Modern: Match Case
Di Python 3.10+, kita mendapatkan \`match-case\` yang jauh lebih rapi dibanding \`if-elif\` bertumpuk.

\`\`\`python
def handle_error(status_code: int):
    match status_code:
        case 200:
            return "OK"
        case 400 | 404: # Logical OR
            return "Client Error"
        case 500:
            return "Server Error"
        case _: # Wildcard (default)
            return "Unknown Code"
\`\`\`

---

## 2. Walrus Operator (\`:=\`)
Operator ini memungkinkan kita memberi nilai ke variabel **di dalam** kondisi \`if\` atau \`while\`. Sangat berguna untuk efisiensi kode.

\`\`\`python
# Tanpa Walrus: panggil fungsi len() dua kali
if len(data := get_api_data()) > 0:
    print(f"Dapat {len(data)} data")

# Dengan Walrus: simpan hasil len() ke variabel 'n' sekaligus dicek
if (n := len(get_api_data())) > 0:
    print(f"Data ditemukan: {n} item")
\`\`\`

---

## 3. Iterasi Efisien (Loops)
Python tidak menggunakan loop gaya C (\`i++\`). Kita melakukan iterasi langsung pada objek.

\`\`\`python
items = ["Laptop", "Mouse", "Keyboard"]

# Gunakan enumerate untuk mendapatkan index
for index, item in enumerate(items, start=1):
    print(f"{index}. {item}")

# Loop pada Dictionary
prices = {"Laptop": 1000, "Mouse": 50}
for name, price in prices.items():
    print(f"{name} seharga")
\`\`\`

---

## 4. Break, Continue, Pass
- \`break\`: Berhenti total dari loop.
- \`continue\`: Lompat ke iterasi berikutnya.
- \`pass\`: Placeholder (biar kode tidak error saat kosong).

---

## ✍️ Latihan Modul 3 (20 Menit)
Buatlah program "Login System":
1.  Tentukan \`correct_password = "admin123"\`.
2.  Berikan user maksimal 3 kali kesempatan input password.
3.  Jika benar, tampilkan "Akses Diterima" dan keluar loop (\`break\`).
4.  Jika salah 3 kali, tampilkan "Akun Terblokir".

## 🎯 Outcome Modul
- Mampu menyederhanakan logika percabangan.
- Menggunakan \`enumerate\` untuk pengelolaan index loop yang bersih.
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
    description: 'Memahami Mutability, Performa Dictionary, dan List Comprehension satu baris.',
    content: `# Struktur Data & Efisiensi



## 1. List vs Tuple: Kapan pakai mana?
- **List \`[]\`**: Mutable (Bisa diubah). Gunakan jika data akan bertambah/berkurang.
- **Tuple \`()\`**: Immutable (Tetap). Gunakan untuk data koordinat, konfigurasi, atau data yang tidak boleh berubah secara tidak sengaja (lebih cepat & hemat memori).

\`\`\`python
def get_db_config():
    return ("localhost", 5432, "admin") # Tuple cocok untuk config
\`\`\`

---

## 2. Set: Operasi Himpunan & Unik
Set \`{}\` sangat cepat untuk mengecek apakah suatu item ada dalam list (O(1) complexity).

\`\`\`python
email_list = ["a@b.com", "c@d.com", "a@b.com"]
unique_emails = set(email_list) # Menghapus duplikat otomatis
\`\`\`

---

## 3. List Comprehension: "The Pythonic Way"
Ini adalah cara membuat list baru dari list lama dengan satu baris kode yang elegan.

**Rumus:** \`[hasil for item in iterable if kondisi]\`

\`\`\`python
angka = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

# Cara Tradisional (5 baris)
genap = []
for x in angka:
    if x % 2 == 0:
        genap.append(x * 2)

# Cara Comprehension (1 baris)
genap_cepet = [x * 2 for x in angka if x % 2 == 0]
\`\`\`

---

## 4. Dictionary: Advanced Methods
Dictionary adalah tulang punggung Python. Gunakan \`.get()\` untuk menghindari program crash.

\`\`\`python
user = {"id": 1, "name": "Rian"}

# Buruk: user["email"] -> Akan Error KeyError jika tidak ada
# Baik:
email = user.get("email", "tidak@ada.com") # Default value jika key hilang
\`\`\`

---

## ✍️ Latihan Modul 4 (20 Menit)
Diberikan list harga produk dalam USD: \`prices_usd = [10, 25, 50, 100]\`.
1.  Gunakan **List Comprehension** untuk mengubahnya ke IDR (asumsi 1 USD = 15.000).
2.  Hanya sertakan produk yang harganya setelah dikonversi di atas 500.000.
3.  Simpan hasilnya dalam sebuah **Set**.

## 🎯 Outcome Modul
- Mampu membedakan penggunaan struktur data sesuai kebutuhan performa.
- Menguasai penulisan kode ringkas dengan Comprehension.
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