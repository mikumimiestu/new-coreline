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
    title: 'Pengenalan Python & Lingkungan Kerja',
    description: 'Filosofi Python, Instalasi, Virtual Environment (venv), dan Cara Kerja Interpreter.',
    content: `# 🐍 Pengenalan Python

## Apa itu Python?
Python adalah bahasa pemrograman **High-level**, **Interpreted**, dan **General-purpose**.
Terkenal dengan filosofi *"Readability counts"* (Keterbacaan itu penting). Kode Python seringkali terlihat seperti Bahasa Inggris sederhana.

**Kenapa Python Populer?**
1.  **Data Science & AI:** (Pandas, NumPy, PyTorch).
2.  **Web Backend:** (Django, FastAPI).
3.  **Automation/Scripting:** (Bot, Scraping).

---

## 🛠️ Lingkungan Kerja (Wajib Tahu!)
Pemula sering salah karena menginstal library secara global. **Gunakan Virtual Environment** agar project tidak saling bentrok.

### 1. Membuat Virtual Environment (Venv)
\`\`\`bash
# Mac/Linux
python3 -m venv .venv
source .venv/bin/activate

# Windows
python -m venv .venv
.venv\\Scripts\\activate
\`\`\`
*Tanda sukses: Di terminal muncul tulisan (.venv).*

### 2. Struktur Project Modern
\`\`\`text
my_project/
├── .venv/            # Folder environment (JANGAN DI-EDIT)
├── src/              # Kode sumber
│   └── main.py
├── requirements.txt  # Daftar library
└── README.md
\`\`\`

## 💻 Program Pertama
\`\`\`python
# print() adalah fungsi bawaan untuk output
print("Hello World!") 

# Indentasi (Spasi) sangat krusial di Python!
if True:
    print("Ini menjorok ke dalam (4 spasi)")
    # print("Ini error jika spasinya tidak pas")
\`\`\`

## 🎯 Outcome Modul
- Bisa membuat isolasi project dengan \`venv\`.
- Mengerti bahwa Python menggunakan **Indentasi** sebagai pengganti \`{}\` (kurung kurawal).
`,
    level: 'beginner',
    order: 1,
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: 'py-02',
    user_type: 'student',
    language: 'python',
    title: 'Variabel, Tipe Data & Type Hinting',
    description: 'Dynamic Typing vs Static Type Hints, f-strings, dan Input User.',
    content: `# Variabel & Modern Python

## 1. Variabel & Tipe Data
Python itu *Dynamic Typing* (tipe data ditentukan otomatis), TAPI di industri modern kita menggunakan **Type Hints** agar kode lebih aman dan jelas.

\`\`\`python
# Cara Lama (Tanpa Type Hint)
nama = "Budi"
umur = 20

# Cara Modern (Type Hints - Python 3.6+)
# Variable: tipe = nilai
nama_lengkap: str = "Budi Santoso"
usia: int = 25
tinggi_badan: float = 170.5
is_active: bool = True

# List dengan tipe spesifik
hobi: list[str] = ["Coding", "Gaming"] 
\`\`\`
*Catatan: Type hint di Python tidak memaksakan error saat runtime, tapi sangat membantu editor (VS Code) mendeteksi bug.*

## 2. F-Strings (Format String)
Lupakan \`%\` atau \`.format()\`. Gunakan **f-string**.

\`\`\`python
item = "Laptop"
harga = 5000000

# Praktis dan Cepat
print(f"Harga {item} adalah Rp {harga:,}") 
# Output: Harga Laptop adalah Rp 5,000,000
\`\`\`

## 3. Input User
\`\`\`python
# Input selalu menghasilkan STRING
angka_input = input("Masukkan angka: ") 

# Harus dikonversi (Casting) jika ingin dihitung
angka_asli = int(angka_input)
print(f"Hasil kali dua: {angka_asli * 2}")
\`\`\`

## 🎯 Outcome Modul
- Terbiasa menulis kode dengan **Type Hints**.
- Selalu menggunakan **f-string** untuk menggabungkan teks.
- Paham konsep *Casting* tipe data.
`,
    level: 'beginner',
    order: 2,
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: 'py-03',
    user_type: 'student',
    language: 'python',
    title: 'Kontrol Alur: Logic & Loops',
    description: 'If-Elif-Else, Match Case (Switch), For Loops, dan Walrus Operator.',
    content: `# Logic & Loops

## 1. Percabangan (If - Elif - Else)
\`\`\`python
nilai = 85

if nilai >= 90:
    print("Grade A")
elif nilai >= 75:
    print("Grade B")
else:
    print("Grade C")
\`\`\`

## 2. Match Case (Python 3.10+)
Pengganti *Switch Case* yang sangat powerful.

\`\`\`python
status = 404

match status:
    case 200:
        print("Success")
    case 400 | 404: # Bisa multiple conditions
        print("Client Error")
    case 500:
        print("Server Error")
    case _: # Default case
        print("Unknown Status")
\`\`\`

## 3. Walrus Operator (:=)
Melakukan assignment (pemberian nilai) di dalam ekspresi if/while.
\`\`\`python
# Tanpa Walrus
data = input("Masukkan data: ")
if len(data) > 0:
    print(f"Data diterima: {data}")

# Dengan Walrus (Lebih ringkas)
if (n := len(input("Masukkan data: "))) > 0:
    print(f"Data diterima, panjang karakter: {n}")
\`\`\`

## 4. Loops (Perulangan)
\`\`\`python
# For Loop (Range)
for i in range(5): # 0 s/d 4
    print(i)

# While Loop
counter = 0
while counter < 3:
    print("Jalan...")
    counter += 1
\`\`\`

## 🎯 Outcome Modul
- Bisa menggunakan **Match Case** untuk logika kompleks.
- Mengenal **Walrus Operator** untuk kode yang lebih efisien.
`,
    level: 'beginner',
    order: 3,
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: 'py-04',
    user_type: 'student',
    language: 'python',
    title: 'Struktur Data: List, Dict, Set, Tuple',
    description: 'Perbedaan Mutability, Dictionary Methods, dan List Comprehension.',
    content: `# Struktur Data Python

## 1. Empat Tipe Koleksi Utama
| Tipe | Sintaks | Sifat | Kegunaan |
|:---|:---:|:---|:---|
| **List** | \`[]\` | Mutable (Bisa ubah) | Data berurutan, tumpukan. |
| **Tuple** | \`()\` | Immutable (Tetap) | Koordinat, Config statis. |
| **Set** | \`{}\` | Unik, Unordered | Menghapus duplikat. |
| **Dict** | \`{:}\` | Key-Value | Menyimpan data objek/JSON. |

\`\`\`python
# List
users = ["Andi", "Budi"]
users.append("Caca") 

# Tuple (Aman dari perubahan tidak sengaja)
koordinat = (10, 20)
# koordinat[0] = 50 # ❌ Error!

# Set (Operasi Himpunan)
angka = {1, 2, 2, 3} 
print(angka) # {1, 2, 3} -> Duplikat hilang otomatis
\`\`\`

## 2. Dictionary (Sangat Penting)
\`\`\`python
mhs = {"nama": "Dino", "nilai": 90}

# Akses Aman (.get) -> Mencegah error jika key tidak ada
print(mhs.get("alamat", "Tidak Diketahui")) 

# Iterasi Key & Value
for k, v in mhs.items():
    print(f"{k}: {v}")
\`\`\`

## 3. List Comprehension (Pythonic Way)
Fitur "Sakti" Python untuk membuat list dalam satu baris.

\`\`\`python
angka = [1, 2, 3, 4, 5]

# Cara Biasa
kuadrat = []
for x in angka:
    if x % 2 == 0:
        kuadrat.append(x**2)

# Cara Pythonic (One Liner)
# [hasil for item in iterable if kondisi]
kuadrat = [x**2 for x in angka if x % 2 == 0]
\`\`\`

## 🎯 Outcome Modul
- Tidak tertukar antara List dan Tuple.
- Bisa menyingkat loop 5 baris menjadi 1 baris dengan **Comprehension**.
`,
    level: 'intermediate',
    order: 4,
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: 'py-05',
    user_type: 'student',
    language: 'python',
    title: 'Functions & Modules',
    description: 'Definisi fungsi, *args **kwargs, Lambda, dan Import modules.',
    content: `# Fungsi & Modularitas

## 1. Fungsi Dasar & Return Hint
\`\`\`python
def hitung_luas(panjang: int, lebar: int) -> int:
    """Ini adalah Docstring (dokumentasi fungsi)."""
    return panjang * lebar
\`\`\`

## 2. Args & Kwargs (Parameter Fleksibel)
\`\`\`python
# *args: Menerima banyak argumen sebagai Tuple
def jumlahkan(*angka):
    return sum(angka)

print(jumlahkan(10, 20, 30)) # 60

# **kwargs: Menerima banyak argumen keyword sebagai Dictionary
def cetak_profil(**data):
    for k, v in data.items():
        print(f"{k}: {v}")

cetak_profil(nama="Budi", umur=20, hobi="Lari")
\`\`\`

## 3. Lambda (Fungsi Anonim)
Fungsi kecil satu baris, biasanya untuk sorting atau filter.
\`\`\`python
data = [(1, "B"), (3, "A"), (2, "C")]

# Sort berdasarkan elemen kedua (Huruf)
data.sort(key=lambda x: x[1]) 
# Hasil: [(3, "A"), (1, "B"), (2, "C")]
\`\`\`

## 4. Modules
Memecah kode ke file lain.
\`\`\`python
# matematika.py
def tambah(a, b): return a + b

# main.py
import matematika as mtk
# atau
from matematika import tambah
\`\`\`

## 🎯 Outcome Modul
- Bisa membuat fungsi yang menerima input tak terbatas (*args).
- Mengerti penggunaan Lambda untuk operasi singkat.
`,
    level: 'intermediate',
    order: 5,
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: 'py-06',
    user_type: 'student',
    language: 'python',
    title: 'OOP Modern: Classes & Dataclasses',
    description: 'Konsep OOP, Constructor, Inheritance, dan @dataclass.',
    content: `# Object Oriented Programming (OOP)

## 1. Class Standard
\`\`\`python
class Kucing:
    # Constructor
    def __init__(self, nama: str, warna: str):
        self.nama = nama    # Property/Attribute
        self.warna = warna
    
    # Method (Fungsi dalam class)
    def meong(self):
        return f"{self.nama} berkata: Meong!"

tom = Kucing("Tom", "Abu-abu")
print(tom.meong())
\`\`\`

## 2. Dataclasses (Python 3.7+)
Membuat class data jauh lebih singkat tanpa perlu menulis \`__init__\` manual. Sangat disukai di industri modern.

\`\`\`python
from dataclasses import dataclass

@dataclass
class Produk:
    nama: str
    harga: int
    stok: int = 0 # Default value

    def total_aset(self) -> int:
        return self.harga * self.stok

p1 = Produk("Laptop", 10000000, 5)
print(p1) 
# Output otomatis rapi: Produk(nama='Laptop', harga=10000000, stok=5)
\`\`\`

## 🎯 Outcome Modul
- Paham konsep \`self\`.
- Beralih menggunakan **@dataclass** untuk objek penyimpan data sederhana.
`,
    level: 'advanced',
    order: 6,
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: 'py-07',
    user_type: 'student',
    language: 'python',
    title: 'Error Handling & File Handling',
    description: 'Try-Except, Finally, Raise, dan Context Manager (with open).',
    content: `# Error & File Handling

## 1. Menangani Error (Try-Except)
Mencegah program crash saat ada kesalahan.

\`\`\`python
try:
    angka = int(input("Bagi 10 dengan: "))
    hasil = 10 / angka
    print(f"Hasil: {hasil}")
except ValueError:
    print("❌ Masukkan angka saja!")
except ZeroDivisionError:
    print("❌ Tidak bisa membagi dengan nol!")
except Exception as e:
    print(f"❌ Error tidak dikenal: {e}")
finally:
    print("Program selesai (selalu dijalankan).")
\`\`\`

## 2. File Handling (Context Manager)
Gunakan \`with\` agar file otomatis ditutup.

\`\`\`python
# Menulis File
with open("catatan.txt", "w") as f:
    f.write("Baris pertama\n")
    f.write("Baris kedua")

# Membaca File
try:
    with open("catatan.txt", "r") as f:
        isi = f.read()
        print(isi)
except FileNotFoundError:
    print("File tidak ditemukan!")
\`\`\`

## 🎯 Outcome Modul
- Program lebih *robust* (tahan banting) terhadap input user yang salah.
- Bisa membaca dan menulis file teks dengan aman.
`,
    level: 'advanced',
    order: 7,
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: 'py-08',
    user_type: 'student',
    language: 'python',
    title: 'Libraries Wajib: Requests & JSON',
    description: 'Berinteraksi dengan API eksternal dan format JSON.',
    content: `# Bekerja dengan Data Eksternal

Di dunia nyata, Python sering dipakai untuk memanggil API.

## 1. JSON (JavaScript Object Notation)
Format pertukaran data standar.

\`\`\`python
import json

data_dict = {"nama": "Ali", "hobi": ["Bola", "Code"]}

# Dict -> JSON String (Serialization)
json_str = json.dumps(data_dict) 

# JSON String -> Dict (Deserialization)
data_asli = json.loads(json_str)
\`\`\`

## 2. Requests (Panggil API)
*Note: Perlu install \`pip install requests\`*

\`\`\`python
# Pseudo-code (karena tidak bisa run pip di sini)
import requests

response = requests.get("https://api.github.com/users/google")

if response.status_code == 200:
    data = response.json() # Otomatis jadi Dict
    print(f"User: {data['login']}")
else:
    print("Gagal mengambil data")
\`\`\`

## 🎯 Outcome Modul
- Mengerti cara mengubah Dictionary ke JSON dan sebaliknya.
- Siap untuk mengambil data dari internet (API).
`,
    level: 'advanced',
    order: 8,
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: 'py-09',
    user_type: 'student',
    language: 'python',
    title: 'Studi Kasus 1: Analisis Data Nilai Siswa',
    description: 'Latihan List Comprehension, Dict, dan Logika Statistik dasar.',
    content: `# Studi Kasus 1: Student Grade Analyzer

## 📜 Skenario
Anda memiliki data nilai siswa yang berantakan (raw data).
Tugas:
1.  Filter siswa yang **aktif** saja.
2.  Hitung **rata-rata nilai** setiap siswa.
3.  Tentukan status kelulusan (Lulus jika rata-rata >= 75).
4.  Cari siswa dengan nilai rata-rata tertinggi.

## 💻 Solusi Code
\`\`\`python
# Data Mentah (List of Dictionaries)
students = [
    {"name": "Andi", "scores": [80, 90, 85], "active": True},
    {"name": "Budi", "scores": [60, 50, 70], "active": True},
    {"name": "Cici", "scores": [90, 95, 100], "active": False}, # Tidak aktif
    {"name": "Dedi", "scores": [70, 75, 74], "active": True},
]

def analyze_grades(data: list[dict]):
    results = []
    
    # 1. Filter & Process Loop
    for s in data:
        if not s["active"]:
            continue # Skip jika tidak aktif
            
        # 2. Hitung Rata-rata
        avg_score = sum(s["scores"]) / len(s["scores"])
        
        # 3. Tentukan Status
        status = "Lulus" if avg_score >= 75 else "Remedial"
        
        # Simpan hasil olahan
        results.append({
            "name": s["name"],
            "average": round(avg_score, 1),
            "status": status
        })
    
    # 4. Cari Juara (Menggunakan max dengan key lambda)
    top_student = max(results, key=lambda x: x["average"])
    
    return results, top_student

# --- EKSEKUSI ---
processed_data, champion = analyze_grades(students)

print("--- Laporan Nilai ---")
for siswa in processed_data:
    print(f"{siswa['name']}: {siswa['average']} [{siswa['status']}]")

print(f"\n🏆 Juara Kelas: {champion['name']} (Nilai: {champion['average']})")
\`\`\`

## ✅ Hasil yang Diharapkan
\`\`\`text
--- Laporan Nilai ---
Andi: 85.0 [Lulus]
Budi: 60.0 [Remedial]
Dedi: 73.0 [Remedial]

🏆 Juara Kelas: Andi (Nilai: 85.0)
\`\`\`
`,
    level: 'advanced',
    order: 9,
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: 'py-10',
    user_type: 'student',
    language: 'python',
    title: 'Studi Kasus 2: Sistem ATM Sederhana (OOP)',
    description: 'Latihan Class, Error Handling, dan Validasi Logika.',
    content: `# Studi Kasus 2: Simple ATM System

## 📜 Skenario
Buatlah class \`ATM\` yang mensimulasikan mesin uang.
Fitur:
1.  **Cek Saldo**.
2.  **Deposit (Setor Tunai):** Tidak boleh negatif.
3.  **Withdraw (Tarik Tunai):** Tidak boleh melebihi saldo dan minimal sisa saldo 50.000.
4.  Gunakan **Exception Handling** untuk validasi error.

## 💻 Solusi Code
\`\`\`python
class InsufficientFundsError(Exception):
    """Custom Error jika saldo kurang"""
    pass

class ATM:
    def __init__(self, owner: str, balance: int = 0):
        self.owner = owner
        self.__balance = balance # Private attribute (enkapsulasi)

    def check_balance(self):
        print(f"Saldo {self.owner}: Rp {self.__balance:,}")

    def deposit(self, amount: int):
        if amount <= 0:
            print("❌ Deposit harus lebih dari 0!")
            return
        self.__balance += amount
        print(f"✅ Berhasil setor: Rp {amount:,}")

    def withdraw(self, amount: int):
        try:
            if amount <= 0:
                raise ValueError("Jumlah penarikan tidak valid.")
            
            if amount > self.__balance:
                raise InsufficientFundsError("Saldo tidak mencukupi.")
            
            # Aturan bank: sisa minimal 50rb
            if (self.__balance - amount) < 50000:
                raise ValueError("Saldo mengendap minimal harus Rp 50.000")

            self.__balance -= amount
            print(f"✅ Berhasil tarik: Rp {amount:,}")
            
        except (ValueError, InsufficientFundsError) as e:
            print(f"⛔ Transaksi Gagal: {e}")

# --- EKSEKUSI ---
my_atm = ATM("Raju", 100000) # Saldo awal 100rb

my_atm.check_balance()
my_atm.deposit(50000)    # Saldo jadi 150rb
my_atm.withdraw(200000)  # Gagal (Kurang saldo)
my_atm.withdraw(120000)  # Gagal (Sisa saldo < 50rb. 150-120 = 30)
my_atm.withdraw(50000)   # Berhasil. Sisa 100rb.
my_atm.check_balance()
\`\`\`

## ✅ Hasil yang Diharapkan
\`\`\`text
Saldo Raju: Rp 100,000
✅ Berhasil setor: Rp 50,000
⛔ Transaksi Gagal: Saldo tidak mencukupi.
⛔ Transaksi Gagal: Saldo mengendap minimal harus Rp 50.000
✅ Berhasil tarik: Rp 50,000
Saldo Raju: Rp 100,000
\`\`\`
`,
    level: 'advanced',
    order: 10,
    created_at: '2025-01-01T00:00:00Z'
  },
];