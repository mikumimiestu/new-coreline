import type { LearningMaterial } from '../types/learning';

export interface User {
  id: string;
  access_code: string;
  photo_url?: string;
  user_type: 'student' | 'umum' | 'pro' | 'game';
  name: string;
  username: string;
  email: string;
  phone: string | null;
  subscription_type: 'free' | 'plus' | 'pro';
  subscription_period: 'monthly' | 'yearly' | null;
  subscription_start: string | null;
  subscription_end: string | null;
  subscription_status: 'active' | 'expired' | 'cancelled';
  created_at: string;
  last_login: string;
}
export interface Subscription {
  id: string;
  user_id: string;
  subscription_type: 'plus' | 'pro';
  period: 'monthly' | 'yearly';
  amount: number;
  currency: string;
  status: 'pending' | 'paid' | 'failed' | 'cancelled';
  start_date: string | null;
  end_date: string | null;
  payment_date: string | null;
  created_at: string;
}

export const MOCK_MATERIALS: LearningMaterial[] = [
  // ==================== PYTHON MATERIALS ====================
  {
    id: 'py-01',
    user_type: 'student',
    language: 'python',
    title: 'Pengenalan Python (Apa itu & Sejarah)',
    description: 'Definisi, ekosistem, sejarah Python, dan instalasi dasar.',
    content: `# 🐍 Pengenalan Python

## Apa itu Python?
Python adalah bahasa pemrograman **high-level**, **interpreted**, dan **multi-paradigm** (mendukung prosedural, OOP, dan fungsional).
Filosofi utamanya adalah **readability** (keterbacaan kode) dan **developer productivity** (produktivitas pengembang).

> "Python is powerful... and fast; plays well with others; runs everywhere; is friendly & easy to learn; is Open."

**Karakteristik Utama:**
- **Sintaks Sederhana:** Mirip bahasa Inggris, mengurangi "boilerplate code".
- **Interpreted:** Kode dieksekusi baris per baris, memudahkan debugging.
- **Dynamic Typing:** Tidak perlu mendeklarasikan tipe data variabel secara eksplisit (misal: \`int x\`).
- **Batteries Included:** Memiliki standard library yang sangat lengkap.

---

## 🕰️ Sejarah Singkat
Python dibuat oleh **Guido van Rossum** di CWI (Belanda) sebagai proyek hobi saat liburan Natal.

| Tahun | Versi/Event | Fitur Kunci |
|:---:|:---|:---|
| 1991 | **Python 0.9.0** | Rilis publik pertama (Functions, classes, lists, dicts). |
| 2000 | **Python 2.0** | List comprehensions, Garbage collection. |
| 2008 | **Python 3.0** | *Breaking change* besar-besaran untuk membereskan inkonsistensi (Unicode default). |
| 2020 | **Python 2 EOL** | Python 2 resmi dimatikan. Semua industri pindah ke Python 3. |
| 2024+ | **Python 3.12+** | Peningkatan performa signifikan, error message yang lebih manusiawi. |

---

## 💡 Mengapa Python Mendominasi Industri?
1. **Data Science & AI:** De-facto standard (NumPy, Pandas, PyTorch).
2. **Web Development:** Framework cepat dan aman (Django, FastAPI).
3. **Automation:** Scripting untuk DevOps, bot, dan scraping sangat mudah.
4. **Cross-Platform:** Berjalan di Windows, Mac, Linux, hingga Raspberry Pi.

---

## 💻 Mari Mencoba Coding!

### 1. Hello World
\`\`\`python
# Fungsi print() digunakan untuk menampilkan output ke layar
print("Halo, selamat datang di dunia Python!")
\`\`\`

### 2. Input & Output Interaktif
\`\`\`python
# Mengambil input dari user (selalu bertipe string)
nama = input("Masukkan nama Anda: ")

# f-string (Python 3.6+) untuk menyisipkan variabel ke string
print(f"Senang bertemu denganmu, {nama}!")
\`\`\`

---

## 🧠 Konsep Dasar Sintaks

### Variabel & Tipe Data Dasar
Python menentukan tipe data secara otomatis saat *runtime*.
\`\`\`python
umur = 21           # Integer (bilangan bulat)
tinggi = 170.5      # Float (desimal)
nama = "Zaki"       # String (teks)
is_student = True   # Boolean (True/False)
hobi = ["Coding", "Gaming"] # List (daftar)
\`\`\`

### Indentasi itu Wajib!
Tidak seperti C++ atau Java yang menggunakan \`{}\`, Python menggunakan **spasi/indentasi** untuk blok kode.
\`\`\`python
if umur >= 18:
    print("Sudah Dewasa")  # Baris ini menjorok ke dalam (4 spasi)
    print("Boleh membuat KTP")
else:
    print("Belum Dewasa")
\`\`\`

---

## 🎯 Outcome Modul
Setelah modul ini, Anda diharapkan:
1. Mengerti filosofi "Zen of Python".
2. Bisa menginstal Python dan menjalankannya di terminal.
3. Memahami perbedaan mendasar Python dengan bahasa lain (seperti C/Java).
`,
    level: 'beginner',
    order: 1,
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: 'py-02',
    user_type: 'student',
    language: 'python',
    title: 'Lingkungan Kerja & Best Practices',
    description: 'Virtual Environment, PEP 8, Type Hinting, dan Modern Syntax.',
    content: `# Lingkungan Kerja & Standar Kode

## 1. Virtual Environment (Wajib!)
Mengapa butuh ini? Agar library antar project tidak bentrok (misal: Project A butuh Django 3, Project B butuh Django 5).

**Cara Membuat & Aktivasi:**
\`\`\`bash
# 1. Buat folder environment bernama .venv
python -m venv .venv

# 2. Aktivasi
# Windows:
.venv\\Scripts\\activate
# Mac/Linux:
source .venv/bin/activate

# 3. Cek apakah sudah aktif (biasanya ada tanda (.venv) di terminal)
which python  # atau 'where python' di windows
\`\`\`

## 2. Struktur Proyek Modern
Jangan menaruh semua kode di satu folder sembarangan. Gunakan \`pyproject.toml\` sebagai standar konfigurasi modern.

\`\`\`toml
# pyproject.toml (Pengganti requirements.txt & setup.py lama)
[project]
name = "aplikasi_saya"
version = "0.1.0"
dependencies = [
    "requests",
    "pandas"
]
requires-python = ">=3.10"
\`\`\`

## 3. Type Hinting & Anotasi
Python tetap *dynamic*, tapi *type hints* membantu editor (VS Code) mendeteksi bug lebih awal.

\`\`\`python
# Tanpa Type Hint (Bisa error kalau 'a' bukan angka)
def tambah_lama(a, b):
    return a + b

# Dengan Type Hint (Jelas dan aman)
def tambah_baru(a: int, b: int) -> int:
    return a + b

hasil: int = tambah_baru(10, 5)
\`\`\`

## 4. Modern Control Flow
### Match Case (Switch Case ala Python 3.10+)
\`\`\`python
status = 404

match status:
    case 200:
        print("Sukses!")
    case 404:
        print("Tidak ditemukan")
    case 500 | 501 | 502:
        print("Server Error")
    case _:
        print("Status tidak dikenal")
\`\`\`

## 5. Menjaga Kualitas Kode (Linting & Formatting)
Kode yang rapi adalah kode yang profesional. Gunakan tools ini:
- **Ruff**: Linter ultra-cepat (menggantikan Flake8/Isort).
- **Black**: Formatter kode otomatis (tidak perlu debat soal spasi).
- **Mypy**: Pengecek tipe data statis.

\`\`\`bash
pip install ruff black mypy
ruff check .   # Cek error style
black .        # Rapikan kode otomatis
\`\`\`

## Outcome Modul
- Mampu mensetup environment yang terisolasi.
- Menulis kode yang "Clean" sesuai standar PEP 8.
- Menggunakan fitur modern Python 3.10+.
`,
    level: 'beginner',
    order: 2,
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: 'py-03',
    user_type: 'student',
    language: 'python',
    title: 'Struktur Data & Algoritma Pythonic',
    description: 'List, Dict, Set, Tuple, List Comprehension, dan Big-O.',
    content: `# Struktur Data & Algoritma

## 1. Empat Sekawan (Built-in Collections)

| Tipe | Sintaks | Sifat | Kegunaan Utama |
|:---|:---:|:---|:---|
| **List** | \`[1, 2]\` | Mutable, Terurut | Data berurutan, tumpukan (stack). |
| **Tuple** | \`(1, 2)\` | Immutable, Terurut | Data fix (koordinat, config). Lebih hemat memori. |
| **Dict** | \`{"a": 1}\` | Mutable, Key-Value | Lookup data cepat (Hash Map). |
| **Set** | \`{1, 2}\` | Mutable, Unik | Menghapus duplikat, operasi himpunan. |

### Contoh Penggunaan:
\`\`\`python
# List Operation
users = ["Miku", "Luka"]
users.append("Rin")  # Tambah belakang

# Dictionary Access
data = {"id": 1, "score": 90}
# Gunakan .get() agar tidak error jika key tidak ada
email = data.get("email", "default@mail.com")

# Set untuk Unique
angka = [1, 2, 2, 3, 3, 3]
unik = set(angka) # Hasil: {1, 2, 3}
\`\`\`

## 2. Comprehensions (Fitur "Sakti" Python)
Cara menyingkat pembuatan list/dict dalam satu baris.

\`\`\`python
# Cara Biasa (Panjang)
kuadrat = []
for x in range(10):
    if x % 2 == 0:
        kuadrat.append(x * x)

# List Comprehension (Pythonic)
# [output FOR item IN iterable IF condition]
kuadrat = [x * x for x in range(10) if x % 2 == 0]
\`\`\`

## 3. Kompleksitas Waktu (Big-O)
Penting untuk performa aplikasi besar.

- **O(1) - Constant:** Cepat sekali. Contoh: Akses index list \`arr[5]\`, Cek key dict \`"id" in user\`.
- **O(N) - Linear:** Semakin banyak data, semakin lambat. Contoh: \`for loop\`, \`x in list\`.

> **Tips:** Jika sering mencari data ("apakah user X ada?"), ubah List menjadi **Set** atau **Dict** agar pencarian menjadi O(1).

## Outcome Modul
- Tidak salah memilih struktur data (misal: jangan pakai List untuk pencarian jutaan data).
- Bisa menulis kode one-liner yang mudah dibaca (*comprehension*).
`,
    level: 'intermediate',
    order: 3,
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: 'py-04',
    user_type: 'student',
    language: 'python',
    title: 'Functional Programming & Iterators',
    description: 'Decorator, Generator, Context Manager, dan Lambda.',
    content: `# Teknik Lanjut Python

## 1. Decorator
Fungsi yang "membungkus" fungsi lain untuk menambah fitur tanpa mengubah kode aslinya (misal: logging, autentikasi, timing).

\`\`\`python
from functools import wraps

def proteksi_admin(fungsi_asli):
    @wraps(fungsi_asli)
    def wrapper(user_role):
        if user_role != "admin":
            print("⛔ Akses Ditolak!")
            return
        return fungsi_asli(user_role)
    return wrapper

@proteksi_admin
def hapus_database(role):
    print("✅ Database dihapus.")

hapus_database("guest") # Output: Akses Ditolak
hapus_database("admin") # Output: Database dihapus
\`\`\`

## 2. Generator & Yield
Menghemat memori dengan menghasilkan data "satu per satu" (lazy evaluation), bukan menyimpannya sekaligus di memori (seperti List).

\`\`\`python
# Fungsi Generator
def generate_angka_besar(n):
    for i in range(n):
        yield i  # "Pause" fungsi dan kembalikan nilai

# Penggunaan (Hemat RAM meski n = 1 milyar)
for angka in generate_angka_besar(1000000):
    pass # Proses angka satu per satu
\`\`\`

## 3. Context Manager (with statement)
Mengelola resource (file, database, network) agar otomatis ditutup meskipun terjadi error.

\`\`\`python
# Cara Manual (Rawan Lupa Close)
f = open("data.txt", "w")
f.write("halo")
f.close()

# Cara Pythonic (With Statement)
with open("data.txt", "w") as f:
    f.write("halo")
# File otomatis tertutup di sini, bahkan jika error.
\`\`\`

## Outcome Modul
- Memahami cara kerja framework (seperti route \`@app.get\` di FastAPI yang merupakan decorator).
- Menulis kode yang efisien memori dengan Generator.
`,
    level: 'intermediate',
    order: 4,
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: 'py-05',
    user_type: 'student',
    language: 'python',
    title: 'OOP Lanjutan & Arsitektur',
    description: 'Dataclasses, SOLID Principles, dan Design Patterns.',
    content: `# Object-Oriented Programming (OOP) Modern

## 1. Dataclasses (Python 3.7+)
Membuat class untuk menyimpan data tanpa perlu menulis \`__init__\`, \`__repr__\`, dll secara manual.

\`\`\`python
from dataclasses import dataclass

@dataclass
class Product:
    name: str
    price: int
    stock: int = 0

    def total_value(self) -> int:
        return self.price * self.stock

p1 = Product("Laptop", 15000000, 2)
print(p1) # Output: Product(name='Laptop', price=15000000, stock=2)
\`\`\`

## 2. Prinsip SOLID
Panduan agar kode OOP mudah dimaintenance.

- **S (Single Responsibility):** Satu class hanya mengurus satu hal.
- **O (Open/Closed):** Terbuka untuk ekstensi, tertutup untuk modifikasi.
- **L (Liskov Substitution):** Subclass harus bisa menggantikan Parent-nya tanpa error.
- **I (Interface Segregation):** Jangan memaksa client mengimplementasikan method yang tidak dipakai.
- **D (Dependency Inversion):** Bergantung pada abstraksi, bukan detail konkret.

## 3. Design Patterns Sederhana
### Strategy Pattern (Mengganti algoritma saat runtime)
Berguna misal untuk metode pembayaran yang berbeda-beda.

\`\`\`python
from typing import Protocol

class PaymentStrategy(Protocol):
    def pay(self, amount: int): ...

class OVO:
    def pay(self, amount: int): print(f"Bayar {amount} pakai OVO")

class Gopay:
    def pay(self, amount: int): print(f"Bayar {amount} pakai Gopay")

def checkout(strategy: PaymentStrategy, total: int):
    strategy.pay(total)

checkout(OVO(), 50000)
\`\`\`

## Outcome Modul
- Mampu mendesain struktur class yang rapi dan skalabel.
- Mengurangi *boilerplate code* menggunakan Dataclasses.
`,
    level: 'advanced',
    order: 5,
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: 'py-06',
    user_type: 'student',
    language: 'python',
    title: 'Testing, Debugging & Packaging',
    description: 'Unit Testing dengan Pytest, Error Handling, dan Packaging.',
    content: `# Software Quality Assurance

## 1. Error Handling (Try-Except)
Jangan biarkan aplikasi crash. Tangkap error spesifik.

\`\`\`python
import logging

try:
    hasil = 10 / 0
except ZeroDivisionError:
    logging.error("Tidak bisa membagi dengan nol!")
except Exception as e:
    logging.critical(f"Error tidak dikenal: {e}")
finally:
    print("Blok ini selalu dijalankan (cleanup).")
\`\`\`

## 2. Unit Testing (Pytest)
Testing memastikan fitur lama tidak rusak saat Anda menambah fitur baru.
Standar industri menggunakan **Pytest** daripada \`unittest\` bawaan karena lebih simpel.

\`\`\`python
# file: test_math.py
from my_app import tambah

def test_tambah_positif():
    assert tambah(2, 3) == 5

def test_tambah_negatif():
    assert tambah(-1, -1) == -2
\`\`\`

Jalankan di terminal:
\`\`\`bash
pytest -v
\`\`\`

## 3. Packaging
Mengemas kode agar bisa diinstall orang lain (\`pip install package-mu\`).
Struktur folder standar:
\`\`\`
my_project/
├── src/
│   └── mypackage/
│       ├── __init__.py
│       └── main.py
├── tests/
├── pyproject.toml
└── README.md
\`\`\`

## Outcome Modul
- Tidak takut refactoring kode karena ada Test.
- Mampu membuat log error yang berguna untuk debugging.
`,
    level: 'advanced',
    order: 6,
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: 'py-07',
    user_type: 'student',
    language: 'python',
    title: 'Concurrency: Asyncio & Multithreading',
    description: 'Menangani proses berat (I/O Bound vs CPU Bound).',
    content: `# Concurrency & Parallelism

## Kapan pakai apa?
Python punya keterbatasan **GIL (Global Interpreter Lock)**, jadi pahami ini:

1. **I/O Bound (Network/Disk):** Gunakan **Asyncio** atau **Threading**.
   - Contoh: Request ke API, query DB, baca file.
2. **CPU Bound (Perhitungan Berat):** Gunakan **Multiprocessing**.
   - Contoh: Image processing, enkripsi video, machine learning.

## 1. Asyncio (Modern Way)
Sangat populer di Web Framework modern (FastAPI).

\`\`\`python
import asyncio

async def ambil_data(id):
    print(f"Mengambil data {id}...")
    await asyncio.sleep(1) # Simulasi delay IO
    print(f"Data {id} selesai.")
    return f"Item {id}"

async def main():
    # Jalankan 3 tugas sekaligus (concurrent)
    hasil = await asyncio.gather(
        ambil_data(1),
        ambil_data(2),
        ambil_data(3)
    )
    print(hasil)

asyncio.run(main())
\`\`\`

## 2. Profiling
Jangan asal optimasi ("premature optimization"). Ukur dulu mana yang lambat.
\`\`\`bash
# Melihat fungsi mana yang memakan waktu paling lama
python -m cProfile -s time script_saya.py
\`\`\`

## Outcome Modul
- Bisa membuat aplikasi web yang mampu menangani ribuan request (Async).
- Memahami mengapa Python kadang disebut "lambat" dan cara mengatasinya.
`,
    level: 'advanced',
    order: 7,
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: 'py-08',
    user_type: 'student',
    language: 'python',
    title: 'Final Project & Kesiapan Industri',
    description: 'FastAPI, Pandas Basics, Security, dan CI/CD.',
    content: `# Puncak Pembelajaran: Real World Python

## 1. Web API dengan FastAPI
Framework tercepat saat ini. Gabungan fitur modern Python (Async + Type Hint).

\`\`\`python
from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

class Item(BaseModel):
    nama: str
    harga: int

@app.post("/items/")
async def create_item(item: Item):
    return {"message": f"Barang {item.nama} disimpan", "pajak": item.harga * 0.1}
\`\`\`

## 2. Intro Data Analysis (Pandas)
Skill wajib meskipun anda Backend Engineer.
\`\`\`python
import pandas as pd

data = {"Nama": ["Ali", "Budi"], "Gaji": [5000, 7000]}
df = pd.DataFrame(data)

# Filter data mudah
orang_kaya = df[df["Gaji"] > 6000]
print(orang_kaya)
\`\`\`

## 3. CI/CD & Security
Di industri, kode tidak dideploy manual dari laptop.
- **CI (Continuous Integration):** Github Actions otomatis menjalankan \`pytest\` dan \`ruff\` setiap kali push.
- **Security:** Jangan pernah hardcode password/API Key di kodingan! Gunakan **Environment Variables (.env)**.

## 🏆 Final Project Requirements
Buatlah REST API sederhana untuk **Sistem Manajemen Toko**:
1.  **Tech:** FastAPI + SQLModel (atau SQLAlchemy).
2.  **Fitur:** CRUD Barang, Transaksi, dan Auth sederhana (JWT).
3.  **Code Quality:** Harus lolos linter (\`ruff\`) dan ada Type Hints.
4.  **Test:** Minimal 2 test case (Success & Fail scenario).
5.  **Docs:** README.md yang menjelaskan cara install & run.

## Outcome Modul
- Siap melamar kerja sebagai Junior Python Developer / Backend Engineer.
- Memiliki portofolio kode yang memenuhi standar industri.
`,
    level: 'advanced',
    order: 8,
    created_at: '2025-01-01T00:00:00Z'
  },
];