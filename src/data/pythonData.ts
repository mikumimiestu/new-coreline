import { LearningMaterial } from '../types/learning';

export const MOCK_MATERIALS: LearningMaterial[] = [
  // ==================== PYTHON CORE MATERIALS ====================
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
Tiga poin inti filosofi desain Python:
1. **Readability Counts**: Kode dibaca lebih sering daripada ditulis.
2. **There should be one—and preferably only one—obvious way to do it**: Menghindari ambiguitas.
3. **If the implementation is hard to explain, it's a bad idea**: Kesederhanaan adalah kunci.

---

## 2. Setup Lingkungan Kerja Profesional
Di industri, kita **haram** mengandalkan "Global Python". Kita menggunakan isolasi (Virtual Environment) untuk menghindari **Dependency Hell**.

**Workflow Eksekusi:**
1. **Inisialisasi Proyek:** \`mkdir belajar_python && cd belajar_python\`
2. **Buat Virtual Environment:** \`python -m venv .venv\`
3. **Aktivasi:** - Windows: \`.venv\\Scripts\\activate\`
   - macOS/Linux: \`source .venv/bin/activate\`
4. **Manajemen Paket:** - Install: \`pip install ruff\` (Linter modern)
   - Freeze: \`pip freeze > requirements.txt\`

---

## 3. Menulis Kode Pertama (Boilerplate Profesional)
Struktur file Python selalu menggunakan blok \`if __name__ == "__main__":\` agar file aman saat di-import oleh modul lain.

\`\`\`python
# file: hello.py
def main():
    user = "Developer"
    print(f"System Active. Welcome, {user}!")

if __name__ == "__main__":
    main()
\`\`\`

---

## 📝 Quiz Singkat
1. Apa fungsi dari Virtual Environment (\`.venv\`)?
2. Mengapa kita perlu menggunakan \`if __name__ == "__main__":\`?

## ✍️ Latihan (15 Menit)
1. Buat folder baru, inisialisasi \`.venv\`, dan aktifkan.
2. Buat file \`main.py\`, tulis fungsi sederhana yang menyapa nama Anda.
3. Jalankan file tersebut dari terminal menggunakan \`python main.py\`.

## 🎯 Target Kompetensi
- Paham alur kerja interpreter.
- Mampu setup proyek Python yang terisolasi.
`,
    level: 'beginner',
    order: 1,
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: 'py-02',
    user_type: 'student',
    language: 'python',
    title: 'Data Types, Variabel & Type Hinting',
    description: 'Eksplorasi tipe data primitif, Mutability, Memory Reference, dan String Manipulation.',
    content: `# 🏗️ Modul 2: Data Types & Type Hinting

## 1. Variabel & Memory Reference
Di Python, variabel bukanlah "kotak" penyimpan nilai, tapi **label** yang menunjuk ke objek di memori. Python menggunakan **Dynamic Typing** (tipe data ditentukan otomatis) tapi **Strongly Typed** (tidak bisa menjumlahkan angka dan string secara langsung).

## 2. Immutability vs Mutability
Konsep paling penting di Python:
- **Immutable** (Tidak bisa diubah setelah dibuat): \`int\`, \`float\`, \`str\`, \`bool\`, \`tuple\`.
- **Mutable** (Bisa diubah isinya): \`list\`, \`dict\`, \`set\`.

---

## 3. Modern Type Hinting (Standar Industri)
Walau dinamis, *best practice* saat ini mewajibkan **Type Hinting** agar kode mudah dibaca dan di-debug oleh IDE.

\`\`\`python
from typing import Final, Optional

# Konstanta
PI: Final[float] = 3.14159

# Variabel biasa
username: str = "admin_dev"
is_active: bool = True

# Koleksi data modern (Python 3.9+)
tags: list[str] = ["backend", "api"]
user_profile: dict[str, int] = {"id": 1, "level": 99}

# Boleh bernilai None
middle_name: Optional[str] = None
\`\`\`

---

## 4. Master String Manipulation & F-Strings
F-Strings (Python 3.6+) adalah cara terbaik memanipulasi teks.

\`\`\`python
salary: int = 15500000
# Formatting angka dengan pemisah ribuan dan desimal
print(f"Gaji: Rp {salary:,.2f}") # Output: Rp 15,500,000.00

# String Methods
slug = "  Python Developer  ".strip().lower().replace(" ", "-")
print(slug) # Output: python-developer
\`\`\`

---

## 📝 Quiz Singkat
1. Apa bedanya tipe data *Mutable* dan *Immutable*?
2. Jika \`x = 10\`, lalu kita ketik \`x = 20\`, apakah kita mengubah nilai int 10 atau membuat objek baru?

## ✍️ Latihan (20 Menit)
1. Buat program sederhana untuk menghitung BMI (Body Mass Index).
2. Minta input berat badan (kg) dan tinggi badan (cm) dari user menggunakan \`input()\`.
3. Lakukan konversi tipe data yang aman menggunakan \`try...except ValueError\`.
4. Cetak hasil BMI menggunakan f-string dengan 1 angka di belakang koma.
`,
    level: 'beginner',
    order: 2,
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: 'py-03',
    user_type: 'student',
    language: 'python',
    title: 'Control Flow & Logic Optimization',
    description: 'Percabangan Match Case, Walrus Operator, dan teknik iterasi efisien.',
    content: `# 🧠 Modul 3: Control Flow & Loops

## 1. Structural Pattern Matching (Match-Case)
Di Python 3.10+, kita punya \`match-case\` yang jauh lebih sakti dari switch-case biasa karena bisa membedah struktur data (Unpacking).

\`\`\`python
command = "move 10 20"

match command.split():
    case ["quit"]:
        print("Keluar...")
    case ["move", x, y] if int(y) > 0: # Guard clause
        print(f"Maju ke X:{x}, Y:{y}")
    case _:
        print("Perintah salah.")
\`\`\`

---

## 2. Walrus Operator (\`:=\`)
Memungkinkan assign variabel sekaligus mengeceknya dalam satu baris (sangat berguna untuk efisiensi memori di loops).

\`\`\`python
# Terus jalankan sampai user ketik 'exit'
while (cmd := input("Command: ").lower()) != "exit":
    print(f"Processing: {cmd}")
\`\`\`

---

## 3. Iterasi Level Menengah: Enumerate & Zip
Jangan pernah pakai \`for i in range(len(data))\`. Gunakan cara "Pythonic".

\`\`\`python
names = ["Ali", "Budi"]
scores = [90, 85]

# Menggabungkan 2 list secara paralel
for name, score in zip(names, scores):
    print(f"{name} dapet {score}")

# Mendapatkan index
for index, name in enumerate(names, start=1):
    print(f"{index}. {name}")
\`\`\`

---

## 📝 Quiz Singkat
1. Kapan sebaiknya kita menggunakan \`match-case\` dibanding \`if-elif-else\`?
2. Apa kegunaan utama dari fungsi \`zip()\`?

## ✍️ Latihan (20 Menit)
1. Buat list berisi 5 angka acak.
2. Gunakan \`for\` loop dipadukan dengan blok \`else\` (For-Else loop).
3. Cari angka genap dalam list. Jika ketemu, \`break\`. Jika loop selesai tanpa menemukan angka genap (masuk blok else), print "Tidak ada angka genap".
`,
    level: 'intermediate',
    order: 3,
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: 'py-04',
    user_type: 'student',
    language: 'python',
    title: 'Data Structures Deep Dive & Comprehensions',
    description: 'Kompleksitas List vs Set, Dictionary operations, dan List/Dict Comprehensions.',
    content: `# 🧱 Modul 4: Data Structures & Comprehensions

## 1. Big O & Pemilihan Struktur Data
Programmer ahli tahu kapan harus pakai List, Set, atau Dict:
- **List**: O(n) untuk pencarian. Cepat untuk iterasi urut.
- **Set**: O(1) untuk pencarian. Pakai ini untuk cek keanggotaan (\`if x in data\`) dan membuang duplikat!
- **Dict**: O(1) key lookup. Mapping data terbaik.

---

## 2. Advanced Slicing & Unpacking
Cara elegan memanipulasi list tanpa loop.

\`\`\`python
data = [1, 2, 3, 4, 5]
reverse = data[::-1] # Dibalik

# Extended Unpacking
head, *middle, tail = data
print(middle) # [2, 3, 4]
\`\`\`

---

## 3. Comprehensions (Pythonic & Cepat)
Comprehensions dieksekusi di level C, sehingga lebih cepat dari loop biasa.

\`\`\`python
# List Comprehension
scores = [45, 80, 55, 90]
status = ["Lulus" if s >= 60 else "Gagal" for s in scores]

# Dictionary Comprehension
users = [("id1", "Ali"), ("id2", "Budi")]
user_dict = {uid: name.upper() for uid, name in users}
\`\`\`

---

## 📝 Quiz Singkat
1. Kenapa mengecek data \`if "budi" in set_nama\` jauh lebih cepat daripada \`list_nama\` pada data yang berjumlah jutaan?
2. Tulis output dari \`[x**2 for x in range(3)]\`.

## ✍️ Latihan (20 Menit)
1. Diberikan list kotor: \`emails = ["a@mail.com", "b@mail.com", "a@mail.com", "c@mail.com"]\`
2. Hilangkan duplikat menggunakan **Set**.
3. Gunakan **Dictionary Comprehension** untuk membuat dictionary berisi email sebagai key, dan panjang karakternya sebagai value.
`,
    level: 'intermediate',
    order: 4,
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: 'py-05',
    user_type: 'student',
    language: 'python',
    title: 'Advanced Functions: Decorators & Generators',
    description: 'Membedah *args, **kwargs, Lambda, Yield (Generators), dan Decorators (Metaprogramming).',
    content: `# ⚙️ Modul 5: Advanced Functions (Expert Core)

## 1. Argumen Fleksibel: *args & **kwargs
\`\`\`python
def config_server(host, *ports, **settings):
    print(f"Host: {host}, Ports (Tuple): {ports}")
    print(f"Settings (Dict): {settings}")

config_server("localhost", 80, 443, debug=True, timeout=30)
\`\`\`

---

## 2. Generators (Efisiensi Memori Tingkat Dewa)
Jika kamu memproses file 10GB, menggunakan list biasa akan membuat RAM penuh (Crash). Gunakan **Generators** (\`yield\`). Generator menghasilkan data satu-per-satu (Lazy Evaluation).

\`\`\`python
def infinite_sequence():
    num = 0
    while True:
        yield num # Mengembalikan nilai sementara & pause fungsi
        num += 1

gen = infinite_sequence()
print(next(gen)) # 0
print(next(gen)) # 1
\`\`\`

---

## 3. Decorators (Metaprogramming Dasar)
Decorator memungkinkan kita memodifikasi kelakuan fungsi lain tanpa mengubah kodenya (misal untuk logging, timer, atau autentikasi).

\`\`\`python
import time

# Fungsi pembuat Decorator
def timer_decorator(func):
    def wrapper(*args, **kwargs):
        start = time.time()
        result = func(*args, **kwargs)
        end = time.time()
        print(f"[{func.__name__}] dieksekusi dalam {end-start:.4f} detik")
        return result
    return wrapper

@timer_decorator # Tempelkan ke fungsi target
def proses_lama(n):
    return sum(i**2 for i in range(n))

proses_lama(1000000)
\`\`\`

---

## 📝 Quiz Singkat
1. Apa perbedaan utama fungsi yang menggunakan \`return\` vs \`yield\`?
2. Bagaimana cara kerja fungsi *Wrapper* di dalam sebuah Decorator?

## ✍️ Latihan (30 Menit)
1. Buat sebuah decorator bernama \`@require_auth\`.
2. Decorator ini mengecek variabel global \`USER_ROLE\`. Jika \`USER_ROLE != "admin"\`, tolak eksekusi fungsi dan print "Access Denied".
3. Buat fungsi \`delete_database()\` dan tempelkan decorator tersebut. Uji dengan role admin dan user biasa.
`,
    level: 'advanced',
    order: 5,
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: 'py-06',
    user_type: 'student',
    language: 'python',
    title: 'OOP Mastery: Dunder, Properties & Class Methods',
    description: 'Enkapsulasi tingkat lanjut, @property, @classmethod, dan Multiple Inheritance.',
    content: `# 🏛️ Modul 6: OOP Mastery

OOP di Python sangat fleksibel. Mari pelajari fitur tingkat lanjutnya.

## 1. @property (Getter & Setter Elegan)
Jangan pakai metode Java seperti \`get_umur()\` atau \`set_umur()\`. Gunakan \`@property\`.

\`\`\`python
class Karyawan:
    def __init__(self, nama, gaji):
        self.nama = nama
        self._gaji = gaji # Protected

    @property
    def gaji(self): # Getter
        return self._gaji

    @gaji.setter
    def gaji(self, nominal): # Setter dengan validasi
        if nominal < 0:
            raise ValueError("Gaji tidak bisa minus!")
        self._gaji = nominal

k = Karyawan("Andi", 5000)
k.gaji = 6000 # Pemanggilan terlihat seperti variabel biasa, tapi fungsi setter berjalan!
\`\`\`

---

## 2. Class Methods & Static Methods
- **@classmethod**: Menerima class (\`cls\`) sebagai argumen pertama. Sering dipakai untuk *Alternative Constructors*.
- **@staticmethod**: Tidak menerima \`self\` atau \`cls\`. Murni fungsi utility yang menempel di dalam class.

\`\`\`python
import datetime

class User:
    def __init__(self, nama, umur):
        self.nama = nama
        self.umur = umur

    @classmethod
    def dari_tahun_lahir(cls, nama, tahun_lahir):
        umur = datetime.date.today().year - tahun_lahir
        return cls(nama, umur) # Memanggil __init__

u = User.dari_tahun_lahir("Budi", 1995)
\`\`\`

---

## 3. Dunder Methods (Magic Methods)
Overloading operator standar menggunakan method bawaan (Double Underscores).
- \`__str__\`: Format string (untuk user).
- \`__len__\`: Custom return untuk fungsi \`len()\`.
- \`__add__\`: Custom behavior untuk operator \`+\`.

---

## 📝 Quiz Singkat
1. Kapan waktu yang tepat menggunakan \`@classmethod\`?
2. Mengapa kita butuh \`@property\` dibanding langsung memanipulasi variabel public?

## ✍️ Latihan (30 Menit)
1. Buat class \`KeranjangBelanja\`.
2. Gunakan \`__len__\` agar saat dipanggil \`len(keranjang)\` mengembalikan jumlah total item.
3. Gunakan \`@property\` untuk method \`total_harga\` yang otomatis menghitung seluruh harga item yang ada di list.
`,
    level: 'advanced',
    order: 6,
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: 'py-07',
    user_type: 'student',
    language: 'python',
    title: 'Exception Handling & Custom Context Managers',
    description: 'Membangun aplikasi tahan banting dan mendesain blok `with` buatan sendiri.',
    content: `# 🛡️ Modul 7: Exceptions & Context Managers

## 1. Custom Exceptions
Buat program lebih terbaca dengan Hierarchy Exception buatan sendiri.

\`\`\`python
class BankError(Exception):
    """Base exception untuk sistem bank"""
    pass

class SaldoTidakCukup(BankError):
    pass

def tarik_tunai(saldo, jumlah):
    if jumlah > saldo:
        raise SaldoTidakCukup(f"Gagal. Saldo kurang {jumlah - saldo}")
    return saldo - jumlah
\`\`\`

---

## 2. Custom Context Manager (__enter__ & __exit__)
Anda tahu blok \`with open(file) as f:\`? Anda bisa membuat blok \`with\` sendiri untuk resource lain (misal: koneksi DB) agar otomatis menutup/membersihkan resource.

\`\`\`python
class KoneksiDatabase:
    def __init__(self, db_name):
        self.db_name = db_name

    def __enter__(self):
        print(f"Membuka koneksi ke {self.db_name}")
        return self # Objek yang ditangkap oleh 'as'

    def __exit__(self, exc_type, exc_val, traceback):
        # Selalu berjalan saat keluar blok 'with', error maupun sukses
        print(f"Menutup koneksi ke {self.db_name}")
        if exc_type:
            print(f"Terjadi error: {exc_val}")
        return True # Menekan exception agar program tidak crash

with KoneksiDatabase("Produksi_DB") as db:
    print("Sedang melakukan query...")
    raise ValueError("Simulasi error query") # Program tidak akan crash!
\`\`\`

---

## 📝 Quiz Singkat
1. Pada \`try-except-else-finally\`, kapan blok \`else\` dieksekusi?
2. Apa argumen ajaib di \`__exit__\` yang menangani exception?

## ✍️ Latihan (20 Menit)
1. Buat Custom Context Manager bernama \`Timer\`.
2. Saat masuk blok \`with\`, catat waktu mulai.
3. Saat keluar blok \`with\`, catat waktu selesai, dan print selisih waktunya ("Proses memakan waktu: X detik").
`,
    level: 'advanced',
    order: 7,
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: 'py-08',
    user_type: 'student',
    language: 'python',
    title: 'Asynchronous Programming (Asyncio)',
    description: 'Bekerja secara konkuren: Coroutines, Event Loop, dan eksekusi Non-Blocking.',
    content: `# ⚡ Modul 8: Asyncio & Concurrency

Python standar berjalan secara *Synchronous* (satu perintah kelar, baru lanjut ke perintah berikutnya). Di tingkat expert, jika ada proses I/O (seperti baca file besar), kita menggunakan **Asyncio** agar program tidak nge-hang (Non-blocking).

## 1. Memahami Coroutine (\`async\` & \`await\`)
Fungsi yang diawali dengan \`async def\` tidak mengembalikan hasil langsung, melainkan mengembalikan objek **Coroutine**. Untuk menjalankannya, butuh *Event Loop*.

\`\`\`python
import asyncio
import time

async def masak_air():
    print("Mulai masak air...")
    await asyncio.sleep(2) # Simulasi non-blocking delay
    print("Air mendidih!")
    return "Kopi Siap"

async def goreng_telur():
    print("Mulai goreng telur...")
    await asyncio.sleep(1)
    print("Telur matang!")

async def main():
    start = time.time()
    
    # Menjalankan tugas secara BERSAMAAN (Concurrent)
    hasil = await asyncio.gather(
        masak_air(),
        goreng_telur()
    )
    
    print(f"Selesai dalam {time.time() - start:.2f} detik")

if __name__ == "__main__":
    asyncio.run(main())
\`\`\`

---

## 📝 Quiz Singkat
1. Apa perbedaan utama antara \`time.sleep()\` dan \`asyncio.sleep()\`?
2. Fungsi apa yang digunakan untuk mengeksekusi coroutine dari kode *synchronous* reguler?

## ✍️ Latihan (30 Menit)
1. Buat 3 coroutine yang mensimulasikan proses download file (gunakan \`asyncio.sleep\` dengan waktu random 1-3 detik).
2. Gunakan \`asyncio.gather\` di fungsi \`main()\` untuk menjalankan ketiganya secara konkuren.
3. Hitung total waktu yang dihemat dibandingkan jika menjalankannya secara *synchronous*.
`,
    level: 'expert',
    order: 8,
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: 'py-09',
    user_type: 'student',
    language: 'python',
    title: 'Studi Kasus 1: Advanced CLI File Organizer',
    description: 'Proyek Murni Python: Script utilitas tingkat lanjut dengan Generators dan Decorators.',
    content: `# 🛠️ Project 1: Advanced File Organizer

## 📜 Tujuan
Membangun tool CLI murni Python untuk mensortir file ke dalam folder berdasarkan ekstensinya, menggunakan Generator agar hemat memori dan Decorator untuk logging.

## 💻 Implementasi Kode

\`\`\`python
import os
import shutil
from pathlib import Path

# 1. Decorator untuk Tracking Operasi
def log_operation(func):
    def wrapper(*args, **kwargs):
        print(f"⚙️ Memulai tugas: {func.__name__}...")
        result = func(*args, **kwargs)
        print("✅ Tugas Selesai.")
        return result
    return wrapper

# 2. Generator untuk List File (Hemat Memori)
def get_files_generator(folder_path):
    path = Path(folder_path)
    for file_path in path.iterdir():
        if file_path.is_file():
            yield file_path

# 3. Logika Utama
@log_operation
def organize_folder(target_folder):
    if not os.path.exists(target_folder):
        print("Folder tidak ditemukan!")
        return

    for file_path in get_files_generator(target_folder):
        extension = file_path.suffix.lstrip('.')
        if not extension:
            continue

        dest_folder = Path(target_folder) / extension
        dest_folder.mkdir(exist_ok=True)

        shutil.move(str(file_path), str(dest_folder / file_path.name))
        print(f"Memindahkan: {file_path.name} -> /{extension}")

if __name__ == "__main__":
    pass
\`\`\`
`,
    level: 'expert',
    order: 9,
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: 'py-10',
    user_type: 'student',
    language: 'python',
    title: 'Studi Kasus 2: Robust Library System (Full Pythonic OOP)',
    description: 'Proyek Final: Menggabungkan Dataclasses, Properties, Custom Exceptions, dan Dunder Methods.',
    content: `# 🏛️ Project 2: Robust Library System

## 📜 Tujuan
Menguji pemahaman *Core Python OOP* level expert. Bebas dari library eksternal.

## 💻 Implementasi Kode

\`\`\`python
from dataclasses import dataclass, field
import uuid

class PeminjamanError(Exception):
    pass

@dataclass
class Buku:
    judul: str
    penulis: str
    _is_loaned: bool = field(default=False, init=False)
    id: str = field(default_factory=lambda: str(uuid.uuid4())[:8])

    @property
    def status(self):
        return "Dipinjam" if self._is_loaned else "Tersedia"

    def pinjam(self):
        if self._is_loaned:
            raise PeminjamanError(f"Buku '{self.judul}' sedang dipinjam.")
        self._is_loaned = True

    def __str__(self):
        return f"[{self.id}] {self.judul} oleh {self.penulis} ({self.status})"

class Perpustakaan:
    def __init__(self):
        self.__koleksi = []

    def tambah_buku(self, buku: Buku):
        self.__koleksi.append(buku)

    def cari_buku(self, kata_kunci: str):
        for buku in self.__koleksi:
            if kata_kunci.lower() in buku.judul.lower():
                yield buku

    def __iter__(self):
        return iter(self.__koleksi)

if __name__ == "__main__":
    perpus = Perpustakaan()
    perpus.tambah_buku(Buku("Automate The Boring Stuff", "Al Sweigart"))
    
    buku_target = list(perpus)[0]
    buku_target.pinjam()
    print("Berhasil dipinjam!")
\`\`\`
`,
    level: 'expert',
    order: 10,
    created_at: '2025-01-01T00:00:00Z'
  },
  // ==================== ALGORITHMS & DATA STRUCTURES (NEW) ====================
  {
    id: 'py-11',
    user_type: 'student',
    language: 'python',
    title: 'Algoritma Pencarian (Searching): Linear & Binary Search',
    description: 'Memahami dasar pencarian data dan optimasi dari O(n) menjadi O(log n) dengan Binary Search.',
    content: `# 🔍 Modul 11: Algoritma Pencarian (Searching)

Dalam pemrograman, menemukan data dengan cepat adalah kunci performa aplikasi. Kita akan bahas dua algoritma utama: **Linear Search** dan **Binary Search**.

## 1. Linear Search (Pencarian Berurutan)
Cara paling sederhana: cek item satu per satu dari awal sampai akhir.
- **Kelebihan:** Data tidak perlu diurutkan sebelumnya.
- **Kekurangan:** Lambat jika datanya banyak. Kompleksitas waktunya adalah O(n).

\`\`\`python
def linear_search(arr: list, target: int) -> int:
    """Mengembalikan index dari target, atau -1 jika tidak ditemukan."""
    for i in range(len(arr)):
        if arr[i] == target:
            return i
    return -1

# Testing
data = [10, 50, 30, 70, 80, 20]
print("Index target 70:", linear_search(data, 70)) # Output: 3
\`\`\`

---

## 2. Binary Search (Pencarian Bagi Dua)
Cara kerja bagaikan mencari kata di kamus: buka tengahnya, cek apakah kata tersebut ada di paruh kiri atau kanan, lalu ulangi.
- **Syarat Mutlak:** Array atau list **HARUS** sudah dalam keadaan terurut (sorted).
- **Performa:** Sangat cepat! Kompleksitas waktunya O(log n).

### Cara Kerja (Step-by-Step):
1. Tentukan batas \`kiri\` (index 0) dan \`kanan\` (index terakhir).
2. Cari nilai \`tengah\` = (kiri + kanan) // 2.
3. Jika nilai tengah = target, pencarian selesai!
4. Jika nilai tengah < target, geser batas \`kiri\` ke \`tengah + 1\` (karena target pasti di kanan).
5. Jika nilai tengah > target, geser batas \`kanan\` ke \`tengah - 1\` (target pasti di kiri).

\`\`\`python
def binary_search(arr: list, target: int) -> int:
    kiri = 0
    kanan = len(arr) - 1
    
    while kiri <= kanan:
        tengah = (kiri + kanan) // 2
        
        if arr[tengah] == target:
            return tengah # Ketemu!
        elif arr[tengah] < target:
            kiri = tengah + 1 # Buang paruh kiri
        else:
            kanan = tengah - 1 # Buang paruh kanan
            
    return -1 # Tidak ditemukan

# Testing (Pastikan data terurut!)
data_terurut = [10, 20, 30, 50, 70, 80]
print("Index target 70:", binary_search(data_terurut, 70)) # Output: 4
\`\`\`

## ✍️ Latihan (20 Menit)
1. Buat list berisi 1000 angka acak yang sudah di-sort.
2. Hitung berapa kali perulangan \`while\` terjadi pada \`binary_search\` saat mencari angka tertentu dengan menambahkan variabel counter. Buktikan logikanya jauh lebih cepat dari \`linear_search\`!
`,
    level: 'intermediate',
    order: 11,
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: 'py-12',
    user_type: 'student',
    language: 'python',
    title: 'Algoritma Pengurutan Dasar (Basic Sorting)',
    description: 'Mempelajari algoritma sorting sederhana: Bubble Sort dan Selection Sort (O(n^2)).',
    content: `# 📊 Modul 12: Pengurutan Dasar (Basic Sorting)

Sebelum masuk ke algoritma kompleks, bro harus paham dulu dasar-dasar memindahkan posisi elemen di memori. Walau lambat (O(n^2)), ini fundamental banget!

## 1. Bubble Sort (Gelembung)
Algoritma ini bekerja dengan membandingkan elemen yang bersebelahan dan menukarnya (swap) jika urutannya salah. Elemen terbesar akan "menggelembung" ke paling kanan.

### Cara Kerja:
1. Looping dari elemen pertama ke elemen terakhir.
2. Jika elemen ke-i > elemen ke-(i+1), tukar posisi mereka!
3. Ulangi terus sampai tidak ada pertukaran lagi.

\`\`\`python
def bubble_sort(arr: list) -> list:
    n = len(arr)
    for i in range(n):
        # Optimasi: Jika array sudah terurut, hentikan loop
        swapped = False
        
        # Elemen terakhir (sejumlah i) sudah pasti berada di posisi benar
        for j in range(0, n - i - 1):
            if arr[j] > arr[j + 1]:
                # Tukar posisi (Pythonic way)
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
                swapped = True
                
        if not swapped:
            break # Berhenti jika tidak ada lagi yang ditukar
            
    return arr

print("Bubble Sort:", bubble_sort([64, 34, 25, 12, 22, 11, 90]))
\`\`\`

---

## 2. Selection Sort (Pemilihan)
Membagi array jadi 2 bagian: Kiri (sudah terurut) dan Kanan (belum terurut). Dia mencari nilai paling kecil di bagian kanan, lalu menaruhnya di ujung batas kiri.

\`\`\`python
def selection_sort(arr: list) -> list:
    n = len(arr)
    for i in range(n):
        # Anggap elemen ke-i adalah yang terkecil saat ini
        min_idx = i
        
        # Cari elemen yang lebih kecil di sisa array (bagian kanan)
        for j in range(i + 1, n):
            if arr[j] < arr[min_idx]:
                min_idx = j
                
        # Tukar elemen terkecil yang ditemukan dengan elemen pertama di sisa array
        arr[i], arr[min_idx] = arr[min_idx], arr[i]
        
    return arr

print("Selection Sort:", selection_sort([29, 10, 14, 37, 14]))
\`\`\`

## ✍️ Latihan (20 Menit)
1. Modifikasi \`bubble_sort\` agar bisa melakukan sorting secara menurun (Descending). Apa yang perlu diubah pada simbol operatornya?
`,
    level: 'intermediate',
    order: 12,
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: 'py-13',
    user_type: 'student',
    language: 'python',
    title: 'Advanced Sorting: Divide & Conquer (Quick Sort)',
    description: 'Menguasai paradigma Divide and Conquer dengan Quick Sort (O(n log n)).',
    content: `# 🚀 Modul 13: Advanced Sorting (Divide & Conquer)

Algoritma pengurutan dasar lambat untuk jutaan data. Solusinya? **Divide and Conquer** (Pecah dan Taklukkan). Di modul ini kita akan membedah **Quick Sort**, salah satu algoritma tercepat (O(n log n)).

## 1. Memahami Logika Quick Sort
Ide utamanya adalah memilih satu elemen sebagai **Pivot** (poros), lalu memisahkan array menjadi dua grup:
1. Grup yang nilainya **lebih kecil** dari Pivot.
2. Grup yang nilainya **lebih besar** dari Pivot.
Setelah dipisah, proses diulang (Rekursi) untuk masing-masing grup, lalu digabung kembali.

### Implementasi Super Pythonic (Menggunakan List Comprehension)
Cara ini sangat mudah dibaca, meskipun memakan memori sedikit lebih banyak karena kita membuat list baru di setiap iterasi.

\`\`\`python
def quick_sort(arr: list) -> list:
    # Base case: Jika array kosong atau isi 1, otomatis sudah terurut
    if len(arr) <= 1:
        return arr
    else:
        # Pilih elemen terakhir sebagai pivot
        pivot = arr.pop()
        
        # Partisi array menggunakan List Comprehension
        lebih_kecil = [x for x in arr if x <= pivot]
        lebih_besar = [x for x in arr if x > pivot]
        
        # Panggil ulang secara rekursif, lalu gabungkan: (Kecil) + Pivot + (Besar)
        return quick_sort(lebih_kecil) + [pivot] + quick_sort(lebih_besar)

# Testing
data_mentah = [33, 10, 55, 71, 29, 99, 14]
hasil_sort = quick_sort(data_mentah.copy())
print(f"Data Awal: {data_mentah}")
print(f"Hasil Quick Sort: {hasil_sort}")
\`\`\`

---

## 2. Kenapa Rekursi itu Penting?
Di Python, rekursi (fungsi yang memanggil dirinya sendiri) adalah nyawa dari algoritma *Tree* dan *Sorting*.
Aturan wajib rekursi: **Harus punya Base Case!**
Jika di \`quick_sort\` base case-nya (\`if len(arr) <= 1\`) tidak ada, program akan mengalami *RecursionError (Maximum recursion depth exceeded)*.

## ✍️ Latihan (30 Menit)
1. Python memiliki built-in method \`.sort()\` dan fungsi \`sorted()\`. Tahukah kamu algoritma apa yang dipakai Python di belakang layar? (Clue: Namanya Timsort, gabungan dari Merge Sort dan Insertion Sort).
2. Buat fungsi \`merge_sort()\` sederhana dengan konsep membagi dua list ke kiri dan kanan sampai tersisa 1 elemen!
`,
    level: 'advanced',
    order: 13,
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: 'py-14',
    user_type: 'student',
    language: 'python',
    title: 'Struktur Data Lanjut: Stack & Queue',
    description: 'Membuat tumpukan LIFO (Stack) dan antrean FIFO (Queue) yang efisien menggunakan collections.deque.',
    content: `# 🥞 Modul 14: Stack & Queue

Di dunia nyata, kita sering butuh menyimpan data dengan aturan spesifik. Misalnya *Undo/Redo* di Word, atau Antrean print dokumen.

## 1. Stack (Tumpukan / LIFO)
Aturannya **LIFO** (Last In, First Out). Yang terakhir masuk, yang pertama keluar. Bayangkan seperti menumpuk piring.

Di Python, List bawaan sudah sangat optimal untuk dijadikan Stack!
- **Push (Tambah):** Gunakan \`.append()\`
- **Pop (Ambil & Hapus):** Gunakan \`.pop()\`

\`\`\`python
stack_browser = []

# Navigasi website (Push)
stack_browser.append("google.com")
stack_browser.append("youtube.com")
stack_browser.append("github.com")
print("Histori saat ini:", stack_browser)

# Klik tombol 'Back' (Pop)
halaman_terakhir = stack_browser.pop()
print("Back dari:", halaman_terakhir) # Keluar github.com
print("Sisa histori:", stack_browser) # Sisa youtube & google
\`\`\`

---

## 2. Queue (Antrean / FIFO)
Aturannya **FIFO** (First In, First Out). Yang pertama masuk, yang pertama keluar. Bayangkan antrean di kasir supermarket.

**🚨 PENTING:** Jangan gunakan List biasa untuk Queue! Menghapus elemen pertama dari List (\`list.pop(0)\`) itu lambat (O(n)) karena semua elemen di belakangnya harus digeser satu per satu.
Gunakan \`collections.deque\` (Double Ended Queue) untuk performa instan O(1)!

\`\`\`python
from collections import deque

antrean_tiket = deque(["Andi", "Budi"])

# Ada yang datang masuk antrean (Enqueue)
antrean_tiket.append("Citra")
antrean_tiket.append("Deni")
print("Antrean saat ini:", antrean_tiket)

# Loket melayani pelanggan (Dequeue)
dilayani = antrean_tiket.popleft() # Cepat dan efisien!
print(f"Sedang melayani: {dilayani}") # Andi keluar duluan
print("Sisa Antrean:", antrean_tiket)
\`\`\`

## ✍️ Latihan (20 Menit)
1. Buat fungsi \`is_balanced(kurung: str) -> bool\` yang menggunakan **Stack** untuk mengecek apakah sepasang tanda kurung valid.
   Contoh: \`"{[()]}"\` -> True, \`"{[(])}"\` -> False.
   (Hint: Push jika kurung buka, Pop dan cek pasangannya jika kurung tutup).
`,
    level: 'advanced',
    order: 14,
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: 'py-15',
    user_type: 'student',
    language: 'python',
    title: 'Graph & Tree Traversal (BFS & DFS)',
    description: 'Merepresentasikan Graph dengan Dictionary dan menjelajahinya menggunakan algoritma BFS dan DFS.',
    content: `# 🕸️ Modul 15: Graph, Tree & Traversal

Bagaimana Google Maps mencari jalan? Bagaimana AI mencari langkah catur? Jawabannya ada pada struktur data **Graph** dan **Tree**!

## 1. Representasi Graph di Python
Graph adalah kumpulan Node (Simpul) yang dihubungkan oleh Edge (Garis). Cara paling umum merepresentasikan Graph di Python adalah menggunakan **Adjacency List** berbasis Dictionary.

\`\`\`python
# Teman-temannya setiap orang (Graph tak berarah)
graph_sosmed = {
    'A': ['B', 'C'],
    'B': ['A', 'D', 'E'],
    'C': ['A', 'F'],
    'D': ['B'],
    'E': ['B', 'F'],
    'F': ['C', 'E']
}
\`\`\`

---

## 2. Depth First Search (DFS)
"Selami sedalam mungkin ke satu cabang, kalau buntu baru mundur (backtrack)."
DFS sangat mudah diimplementasikan menggunakan **Stack** atau **Recursion**.

\`\`\`python
def dfs(graph: dict, start: str, visited=None):
    if visited is None:
        visited = set() # Set untuk mencatat node yang sudah dikunjungi
        
    visited.add(start)
    print(start, end=" -> ")
    
    # Jelajahi semua tetangga yang belum dikunjungi
    for tetangga in graph[start]:
        if tetangga not in visited:
            dfs(graph, tetangga, visited)

print("Jalur DFS:")
dfs(graph_sosmed, 'A') 
# Output (bisa bervariasi tergantung urutan dict): A -> B -> D -> E -> F -> C ->
\`\`\`

---

## 3. Breadth First Search (BFS)
"Cek semua tetangga terdekat (level 1) dulu, baru turun ke level 2."
BFS wajib menggunakan **Queue**. Sangat bagus untuk mencari *Shortest Path* (Rute Terpendek).

\`\`\`python
from collections import deque

def bfs(graph: dict, start: str):
    visited = set([start])
    queue = deque([start]) # Masukkan node awal ke antrean
    
    while queue:
        # Ambil orang antrean paling depan
        node_sekarang = queue.popleft()
        print(node_sekarang, end=" -> ")
        
        # Cek semua temannya
        for tetangga in graph[node_sekarang]:
            if tetangga not in visited:
                visited.add(tetangga)
                queue.append(tetangga) # Masukkan teman ke antrean

print("\\nJalur BFS:")
bfs(graph_sosmed, 'A') 
# Output: A -> B -> C -> D -> E -> F ->
\`\`\`

## 🏆 Kesimpulan Algoritma Master
Gokil! Bro baru aja nyelesaiin materi Algoritma paling *core* di Computer Science! 
Kalau bro menguasai modul 1-15 ini, logika dan pemahaman struktur data Python bro udah ada di level *Software Engineer* beneran!
`,
    level: 'expert',
    order: 15,
    created_at: '2025-01-01T00:00:00Z'
  }
];