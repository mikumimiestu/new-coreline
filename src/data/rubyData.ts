import type { LearningMaterial } from '../types/learning';

export const MOCK_MATERIALS: LearningMaterial[] = [
  // ==================== LEVEL 1: BEGINNER (DASAR) ====================
  {
    id: 'rb-01',
    user_type: 'student',
    language: 'ruby',
    title: '1. Pengenalan: Matz & Lingkungan Kerja',
    description: 'Filosofi Ruby, Instalasi (Rbenv), dan Hello World.',
    content: `# 💎 Pengenalan Ruby

## Apa itu Ruby?
Ruby adalah bahasa pemrograman **dinamis**, **open source**, yang fokus pada *kesederhanaan* dan *produktivitas*.
Diciptakan oleh **Yukihiro "Matz" Matsumoto** dari Jepang.

> "Ruby is designed to make programmers happy."

**Karakteristik Utama:**
- **Semuanya adalah Object:** Angka \`1\`, \`nil\`, bahkan \`class\` itu sendiri adalah object.
- **English-like:** Sintaksnya sangat mirip bahasa Inggris natural.

## 🛠️ Setup Environment (Penting!)
Jangan gunakan Ruby bawaan sistem operasi (System Ruby). Gunakan **Version Manager**.
1.  **Install Rbenv (Mac/Linux) atau RubyInstaller (Windows).**
2.  **IRB (Interactive Ruby):**
    Ketik \`irb\` di terminal untuk masuk ke *playground* Ruby.

## 💻 Hello World
Buat file \`hello.rb\`:

\`\`\`ruby
# Output dengan baris baru (seperti console.log)
puts "Hello Ruby!"

# Output tanpa baris baru
print "Loading..."

# Inspect (Untuk debugging, menampilkan struktur data mentah)
p [1, 2, 3] 
\`\`\`

Jalankan di terminal:
\`\`\`bash
ruby hello.rb
\`\`\`

## 🎯 Outcome
- Mengerti kenapa Ruby disebut "Developer Friendly".
- Bisa menjalankan file script Ruby.
`,
    level: 'beginner',
    order: 1,
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: 'rb-02',
    user_type: 'student',
    language: 'ruby',
    title: '2. Basic Syntax & Symbols',
    description: 'Variabel, Interpolasi #{}, dan Konsep Symbol (:nama).',
    content: `# Sintaks Dasar Ruby

## 1. Variabel
Ruby menggunakan *Snake Case* (\`nama_variabel\`). Tidak perlu deklarasi tipe (Dynamic Typing).

\`\`\`ruby
nama_lengkap = "Budi Santoso"
umur = 25
tinggi_badan = 170.5
is_active = true
\`\`\`

## 2. String Interpolation
Menggabungkan variabel ke dalam string. **Wajib pakai kutip dua (\`"\`)**.

\`\`\`ruby
kegiatan = "Belajar"
# Cara Ruby (Interpolasi)
puts "#{kegiatan} Ruby itu seru!" 

# Kutip satu (') dianggap string literal (mentah)
puts '#{kegiatan} Ruby' # Output: #{kegiatan} Ruby
\`\`\`

## 3. Symbols (\`:symbol\`)
Ini konsep paling unik di Ruby.
- **String:** Mutable (bisa diubah), boros memori.
- **Symbol:** Immutable (kekal), hemat memori, diawali titik dua \`:\`.

\`\`\`ruby
# String: Object ID berbeda tiap dibuat
puts "halo".object_id 
puts "halo".object_id 

# Symbol: Object ID selalu sama (Efisien)
puts :halo.object_id
puts :halo.object_id
\`\`\`
*Gunakan Symbol untuk Key pada Hash, Status, atau Identifier.*

## 🎯 Outcome
- Terbiasa dengan sintaks \`#{variable}\`.
- Mengerti perbedaan String vs Symbol.
`,
    level: 'beginner',
    order: 2,
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: 'rb-03',
    user_type: 'student',
    language: 'ruby',
    title: '3. Control Flow: The "Ruby Way"',
    description: 'If, Elsif, Unless (Negasi), dan Case Statement.',
    content: `# Logika Alur Program

Ruby punya cara unik untuk menulis logika agar terbaca seperti kalimat bahasa Inggris.

## 1. If & Elsif
\`\`\`ruby
nilai = 85

if nilai >= 90
  puts "A"
elsif nilai >= 75
  puts "B"
else
  puts "C"
end
\`\`\`

## 2. Unless (Khas Ruby)
\`:Unless\` berarti "Kecuali jika". Kebalikan dari \`if\`.

\`\`\`ruby
gagal_login = false

# Daripada tulis: if !gagal_login
unless gagal_login
  puts "Silakan Masuk Dashboard"
end

# One-liner (Modifier Syntax) - Sangat populer!
puts "Akses Ditolak" if gagal_login
puts "Selamat Datang" unless gagal_login
\`\`\`

## 3. Case (Switch)
Bisa mengecek Range atau Tipe Data.

\`\`\`ruby
umur = 15

case umur
when 0..12 then puts "Anak-anak"
when 13..19 then puts "Remaja"
else puts "Dewasa"
end
\`\`\`

## 🎯 Outcome
- Bisa menulis kode yang ekspresif menggunakan \`unless\`.
- Mengerti penggunaan Range (\`..\`).
`,
    level: 'beginner',
    order: 3,
    created_at: '2025-01-01T00:00:00Z'
  },

  // ==================== LEVEL 2: INTERMEDIATE (MENENGAH) ====================
  {
    id: 'rb-04',
    user_type: 'student',
    language: 'ruby',
    title: '4. Collections & Iterators',
    description: 'Array, Hash, dan meninggalkan For Loop demi .each.',
    content: `# Struktur Data & Iterasi



Di Ruby, **hindari For Loop** (\`for i in 0..n\`). Itu gaya bahasa C/Java.
Gunakan **Method Iterator** bawaan yang lebih elegan.

## 1. Array & Iterasi
\`\`\`ruby
hobi = ["Coding", "Gaming", "Reading"]

# Menambah data
hobi << "Sleeping"

# Cara Ruby: .each
hobi.each do |item|
  puts "Saya suka #{item}"
end
\`\`\`

## 2. Hash (Dictionary)
Pasangan Key-Value. Standar industri menggunakan **Symbol** sebagai key (\`key: value\`).

\`\`\`ruby
user = {
  name: "Dino",
  role: :admin, # Symbol
  active: true
}

puts user[:name]     # ✅ Benar
puts user["name"]    # ❌ Nil (Salah, karena key-nya symbol)
\`\`\`

## 3. Map & Select (Functional Style)
\`\`\`ruby
angka = [1, 2, 3, 4, 5]

# Map: Mengubah data (return array baru)
kuadrat = angka.map { |n| n * 2 } # [2, 4, 6, 8, 10]

# Select: Filter data
genap = angka.select { |n| n.even? } # [2, 4]
\`\`\`

## 🎯 Outcome
- Meninggalkan \`for\` loop selamanya.
- Paham sintaks Hash modern \`{ key: val }\`.
`,
    level: 'intermediate',
    order: 4,
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: 'rb-05',
    user_type: 'student',
    language: 'ruby',
    title: '5. Methods, Blocks & Yield',
    description: 'Implicit Return dan Konsep Block (Yield) yang powerful.',
    content: `# Methods & Blocks

Ini adalah jantung kekuatan Ruby.

## 1. Method & Implicit Return
Ruby otomatis me-return hasil dari baris terakhir. Kata kunci \`return\` opsional.

\`\`\`ruby
# Keyword Arguments (Wajib isi nama param)
def hitung_luas(panjang:, lebar:)
  panjang * lebar # Otomatis di-return
end

puts hitung_luas(panjang: 10, lebar: 5)
\`\`\`

## 2. Blocks & Yield
Block adalah potongan kode (di antara \`do..end\` atau \`{...}\`) yang dikirim ke method.

\`\`\`ruby
def html_wrapper(tag)
  print "<#{tag}>"
  yield if block_given? # Eksekusi blok kode di sini
  print "</#{tag}>"
end

# Pemanggilan:
html_wrapper(:div) do
  print "Halo Dunia"
end
# Output: <div>Halo Dunia</div>
\`\`\`

## 🎯 Outcome
- Tidak bingung kenapa method tidak ada \`return\`-nya.
- Paham mekanisme \`.each do ... end\` (itu sebenarnya menggunakan \`yield\` di belakang layar).
`,
    level: 'intermediate',
    order: 5,
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: 'rb-06',
    user_type: 'student',
    language: 'ruby',
    title: '6. OOP: Class & Inheritance',
    description: 'Class, Instance Variable (@), dan attr_accessor.',
    content: `# Object Oriented Ruby



## 1. Class Structure
\`\`\`ruby
class Kucing
  # Metaprogramming: Membuat getter & setter otomatis
  attr_accessor :nama, :energi

  def initialize(nama)
    @nama = nama    # @var = Instance Variable (Private scope)
    @energi = 100
  end

  def main
    @energi -= 10
    "#{@nama} sedang bermain!"
  end
end

tom = Kucing.new("Tom")
tom.nama = "Tomas" # Bisa diubah karena attr_accessor
puts tom.main
\`\`\`

## 2. Inheritance
Tanda \`<\` digunakan untuk pewarisan.

\`\`\`ruby
class Hewan
  def bernapas; puts "Hosh hosh"; end
end

class Anjing < Hewan
  def suara; puts "Guk guk"; end
end
\`\`\`

## 🎯 Outcome
- Mengerti fungsi \`@variable\` vs \`variable\` biasa.
- Menggunakan \`attr_accessor\` untuk mempersingkat kode.
`,
    level: 'intermediate',
    order: 6,
    created_at: '2025-01-01T00:00:00Z'
  },

  // ==================== LEVEL 3: ADVANCED & EXPERT ====================
  {
    id: 'rb-07',
    user_type: 'student',
    language: 'ruby',
    title: '7. Modules & Mixins',
    description: 'Solusi Multiple Inheritance: Include vs Extend.',
    content: `# Modules (Mixins)

Ruby tidak support *Multiple Inheritance*. Solusinya adalah **Module**.



## 1. Include (Instance Method)
Menambahkan kemampuan ke **Object** (instance).

\`\`\`ruby
module BisaTerbang
  def terbang
    "Wusss... terbang!"
  end
end

class Burung
  include BisaTerbang
end

p Burung.new.terbang # ✅ Bisa
\`\`\`

## 2. Extend (Class Method)
Menambahkan kemampuan ke **Class** itu sendiri.

\`\`\`ruby
module Logger
  def log(msg)
    puts "[LOG SYSTEM]: #{msg}"
  end
end

class Server
  extend Logger
end

Server.log("Booting up...") # ✅ Panggil langsung dari Class
\`\`\`

## 🎯 Outcome
- Bisa menyusun kode modular yang rapi (DRY - Don't Repeat Yourself).
`,
    level: 'advanced',
    order: 7,
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: 'rb-08',
    user_type: 'student',
    language: 'ruby',
    title: '8. Expert: Metaprogramming',
    description: 'Kode yang menulis kode. Rahasia framework Rails.',
    content: `# Metaprogramming 🧙‍♂️

Ini adalah teknik tingkat lanjut di mana kita menulis kode yang bisa memanipulasi kode itu sendiri saat runtime.

## 1. define_method
Membuat method secara dinamis.

\`\`\`ruby
class Robot
  # Kita ingin buat method: jalan, lari, lompat
  ["jalan", "lari", "lompat"].each do |aksi|
    define_method(aksi) do
      "Robot sedang #{aksi}"
    end
  end
end

r = Robot.new
puts r.lari   # Method 'lari' tercipta otomatis!
puts r.lompat
\`\`\`

## 2. method_missing
Menangkap panggilan method yang tidak ada (Error Handler untuk method).

\`\`\`ruby
class MagicBox
  def method_missing(method_name, *args)
    "Maaf, method '#{method_name}' tidak ditemukan. Anda mencoba argumen: #{args}"
  end
end

box = MagicBox.new
puts box.buka_pintu("Kunci Emas") 
# Output tidak error, tapi ditangkap oleh method_missing
\`\`\`

## 🎯 Outcome
- Memahami bagaimana Library/Gem Ruby bekerja secara "Magic".
`,
    level: 'expert',
    order: 8,
    created_at: '2025-01-01T00:00:00Z'
  },

  // ==================== STUDI KASUS ====================
  {
    id: 'rb-09',
    user_type: 'student',
    language: 'ruby',
    title: 'Studi Kasus 1: CSV Parser & Analyzer',
    description: 'Latihan File I/O, String Manipulation, dan Hash Counting.',
    content: `# Studi Kasus: CSV Data Analyzer

## 📜 Misi
Anda punya file \`data.csv\` berisi data penjualan: \`Produk,Harga,Kota\`.
Tugas:
1. Baca file.
2. Hitung total penjualan per Kota.

## 💻 Solusi
\`\`\`ruby
require 'csv' # Library bawaan

class SalesAnalyzer
  def initialize(filename)
    @filename = filename
    @city_sales = Hash.new(0) # Default value 0
  end

  def analyze
    # Baca CSV baris per baris
    CSV.foreach(@filename, headers: true) do |row|
      city = row['Kota']
      price = row['Harga'].to_i
      
      @city_sales[city] += price
    end
  end

  def report
    puts "--- Laporan Penjualan ---"
    # Sort dari yang terbesar (descending)
    sorted = @city_sales.sort_by { |_, v| -v }
    
    sorted.each do |city, total|
      # Format mata uang sederhana
      puts "#{city}: Rp #{total}"
    end
  end
end

# --- DUMMY FILE CREATION (Untuk Test) ---
File.write('data.csv', "Produk,Harga,Kota\nLaptop,1000,Jakarta\nMouse,50,Bandung\nMonitor,200,Jakarta")

# --- EKSEKUSI ---
app = SalesAnalyzer.new('data.csv')
app.analyze
app.report
\`\`\`
`,
    level: 'advanced',
    order: 9,
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: 'rb-10',
    user_type: 'student',
    language: 'ruby',
    title: 'Studi Kasus 2: DSL (Domain Specific Language)',
    description: 'Membuat bahasa konfigurasi sendiri ala Ruby.',
    content: `# Studi Kasus Expert: Membuat DSL HTML Generator

## 📜 Misi
Buat class yang memungkinkan kita menulis HTML dengan sintaks Ruby yang bersih, seperti ini:
\`\`\`ruby
HTML.generate do
  h1 "Judul Besar"
  p "Ini paragraf"
end
\`\`\`

## 💻 Solusi (Metaprogramming)
\`\`\`ruby
class HTMLGenerator
  def initialize
    @html = ""
  end

  # Method ini menangkap 'h1', 'p', 'div', dll
  def method_missing(tag, text = "")
    @html << "<#{tag}>#{text}</#{tag}>\n"
  end

  # Class method untuk entry point
  def self.generate(&block)
    generator = HTMLGenerator.new
    # instance_eval menjalankan block di dalam konteks instance generator
    generator.instance_eval(&block) 
    puts generator.html_result
  end

  def html_result
    @html
  end
end

# --- EKSEKUSI ---
HTMLGenerator.generate do
  h1 "Selamat Datang di Ruby"
  h2 "Metaprogramming itu Sakti"
  p "Kode ini digenerate secara dinamis tanpa mendefinisikan method h1/p satu per satu."
end
\`\`\`

## ✅ Hasil Output
\`\`\`html
<h1>Selamat Datang di Ruby</h1>
<h2>Metaprogramming itu Sakti</h2>
<p>Kode ini digenerate secara dinamis...</p>
\`\`\`
`,
    level: 'expert',
    order: 10,
    created_at: '2025-01-01T00:00:00Z'
  },
];