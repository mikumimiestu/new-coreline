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
    await asyncio.sleep(2) # Simulasi non-blocking delay (CPU bisa ngerjain yang lain)
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

# Titik masuk program async
if __name__ == "__main__":
    asyncio.run(main())
\`\`\`
*Coba perhatikan: Tanpa async, butuh 3 detik (2+1). Dengan async, cuma butuh 2 detik karena jalan paralel!*

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
Membangun tool CLI (Command Line) murni Python untuk mensortir file ke dalam folder berdasarkan ekstensinya, menggunakan Generator agar hemat memori dan Decorator untuk logging.

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

# 2. Generator untuk List File (Hemat Memori untuk folder isi jutaan file)
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

    # Iterasi langsung dari Generator
    for file_path in get_files_generator(target_folder):
        extension = file_path.suffix.lstrip('.')
        if not extension:
            continue # Abaikan file tanpa ekstensi

        # Buat folder destinasi
        dest_folder = Path(target_folder) / extension
        dest_folder.mkdir(exist_ok=True)

        # Pindahkan file
        shutil.move(str(file_path), str(dest_folder / file_path.name))
        print(f"Memindahkan: {file_path.name} -> /{extension}")

if __name__ == "__main__":
    # Cara pakai: Buat folder 'test_dir' isi file sembarang
    # organize_folder("./test_dir")
    pass
\`\`\`

---

## ✍️ Tantangan Pengembangan
Modifikasi script ini agar menggunakan **Custom Exception** jika folder tidak ada, dan gunakan \`match-case\` untuk mem-bundle ekstensi (misal: .jpg, .png masuk ke folder "Images" bukan ke folder nama ekstensinya).
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
Menguji pemahaman *Core Python OOP* level expert. Bebas dari library eksternal, hanya murni arsitektur bahasa Python yang solid.

## 💻 Implementasi Kode

\`\`\`python
from dataclasses import dataclass, field
import uuid

# 1. Custom Exception
class PeminjamanError(Exception):
    pass

# 2. Dataclass modern
@dataclass
class Buku:
    judul: str
    penulis: str
    _is_loaned: bool = field(default=False, init=False) # Tersembunyi, tak perlu di init
    id: str = field(default_factory=lambda: str(uuid.uuid4())[:8])

    @property
    def status(self):
        return "Dipinjam" if self._is_loaned else "Tersedia"

    def pinjam(self):
        if self._is_loaned:
            raise PeminjamanError(f"Buku '{self.judul}' sedang dipinjam.")
        self._is_loaned = True

    def kembalikan(self):
        self._is_loaned = False

    # Dunder Method
    def __str__(self):
        return f"[{self.id}] {self.judul} oleh {self.penulis} ({self.status})"

# 3. Pengelola Data
class Perpustakaan:
    def __init__(self):
        self.__koleksi = [] # Private list

    def tambah_buku(self, buku: Buku):
        self.__koleksi.append(buku)

    # Generator untuk pencarian
    def cari_buku(self, kata_kunci: str):
        for buku in self.__koleksi:
            if kata_kunci.lower() in buku.judul.lower():
                yield buku

    # Dunder agar objek Perpustakaan bisa di iterasi
    def __iter__(self):
        return iter(self.__koleksi)

# --- Eksekusi ---
if __name__ == "__main__":
    perpus = Perpustakaan()
    perpus.tambah_buku(Buku("Automate The Boring Stuff", "Al Sweigart"))
    perpus.tambah_buku(Buku("Fluent Python", "Luciano Ramalho"))

    # Menggunakan fitur iterasi kustom (__iter__)
    buku_target = list(perpus)[1]
    
    try:
        print(f"Mencoba meminjam: {buku_target.judul}...")
        buku_target.pinjam()
        print("Berhasil dipinjam!")
        
        # Coba pinjam lagi (akan memicu Exception)
        buku_target.pinjam()
    except PeminjamanError as e:
        print(f"ERROR: {e}")

    print("\\nStatus Terakhir:")
    for b in perpus:
        print(b)
\`\`\`

## 🏆 Kesimpulan Masterclass
Selamat! Anda baru saja menguasai arsitektur inti dari Python. Dengan memahami fundamental dan *expert core* ini, Anda tidak akan sekadar "menempel kode", melainkan siap merancang *framework* atau mengoptimasi sistem *backend* berskala besar.
`,
    level: 'expert',
    order: 10,
    created_at: '2025-01-01T00:00:00Z'
  }
];