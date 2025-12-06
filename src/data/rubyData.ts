import type { LearningMaterial } from '../types/learning';

export const MOCK_MATERIALS: LearningMaterial[] = [
  // ==================== RUBY MATERIALS ====================
  {
    id: 'rb-01',
    user_type: 'student',
    language: 'ruby',
    title: 'Pengenalan Ruby & Lingkungan Kerja',
    description: 'Filosofi Matz, IRB, Rbenv/RVM, dan Hello World.',
    content: `# 💎 Pengenalan Ruby

## Apa itu Ruby?
Ruby adalah bahasa pemrograman **dinamis**, **open source**, dan fokus pada kesederhanaan.
Diciptakan oleh **Yukihiro "Matz" Matsumoto**.

> "Ruby is designed to make programmers happy."

**Karakteristik:**
- **Semuanya adalah Object:** Angka, string, bahkan \`true/false\` adalah object.
- **Ekspresif:** Sintaksnya sangat mirip bahasa Inggris.
- **Web Development:** Sangat populer berkat framework **Ruby on Rails**.

---

## 🛠️ Setup Environment (Industry Standard)
Jangan install Ruby bawaan OS secara langsung. Gunakan **Version Manager** agar bisa gonta-ganti versi per project.

1.  **Version Manager:** Gunakan **rbenv** (rekomendasi) atau **RVM**.
2.  **Interactive Ruby (IRB):**
    Ketik \`irb\` di terminal untuk mencoba kode secara langsung.

## 💻 Hello World & Sintaks Dasar
Buat file \`main.rb\`.

\`\`\`ruby
# Output ke layar (dengan new line)
puts "Hello, Ruby World!"

# Output tanpa new line
print "Loading..."

# P (Inspect): Berguna untuk debugging (menampilkan tipe data mentah)
p [1, 2, 3] # Output: [1, 2, 3]
\`\`\`

## 🎯 Outcome Modul
- Mengerti filosofi Ruby.
- Bisa menggunakan IRB.
- Menjalankan file \`.rb\` via terminal (\`ruby main.rb\`).
`,
    level: 'beginner',
    order: 1,
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: 'rb-02',
    user_type: 'student',
    language: 'ruby',
    title: 'Variabel, Simbol, & String Interpolation',
    description: 'Perbedaan String vs Symbol, dan Interpolasi #{}.',
    content: `# Tipe Data Inti

## 1. Variabel & Konvensi Penamaan
Ruby menggunakan *Snake Case* untuk variabel dan method.

\`\`\`ruby
nama_lengkap = "Budi Santoso" # String
umur = 25                     # Integer
tinggi = 170.5                # Float
is_active = true              # Boolean
\`\`\`

## 2. String Interpolation
Menggabungkan variabel ke dalam string. Wajib pakai **kutip dua** (\`""\`).

\`\`\`ruby
nama = "Ruby"
# Cara Modern (Interpolation)
puts "Belajar #{nama} itu menyenangkan!" 

# Kutip satu ('') tidak memproses interpolasi
puts 'Belajar #{nama}' # Output mentah: Belajar #{nama}
\`\`\`

## 3. Symbols (:symbol)
Ini konsep unik Ruby. Symbol mirip string, tapi **immutable** (tidak bisa diubah) dan **hemat memori**.
Biasanya dipakai untuk *Key* pada Hash atau status.

\`\`\`ruby
status = :pending  # Ini Symbol
status2 = "pending" # Ini String

# Cek Object ID
puts :pending.object_id # ID sama terus (Hemat memori)
puts "pending".object_id # ID berubah tiap kali dibuat
\`\`\`

## 🎯 Outcome Modul
- Paham kapan pakai String vs Symbol (Gunakan Symbol untuk identifier/key).
- Terbiasa dengan \`#{var}\`.
`,
    level: 'beginner',
    order: 2,
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: 'rb-03',
    user_type: 'student',
    language: 'ruby',
    title: 'Control Flow: Unless & Case',
    description: 'If, Elsif, Unless (Negasi If), dan Case Statement.',
    content: `# Logika Alur Program

## 1. If & Elsif
\`\`\`ruby
nilai = 80

if nilai >= 90
  puts "A"
elsif nilai >= 75
  puts "B"
else
  puts "C"
end
\`\`\`

## 2. Unless (Khas Ruby)
Kebalikan dari \`if\`. Dibaca: "Kecuali jika..."
Sangat disukai karena membuat kode lebih natural.

\`\`\`ruby
login = false

# Jangan tulis: if !login
unless login
  puts "Silakan Login dulu"
end

# One-liner (Modifier)
puts "Akses Ditolak" unless login
\`\`\`

## 3. Case (Switch)
Sangat powerful, bisa cek tipe data atau range.

\`\`\`ruby
usia = 15

case usia
when 0..12
  puts "Anak-anak"
when 13..19
  puts "Remaja"
else
  puts "Dewasa"
end
\`\`\`

## 🎯 Outcome Modul
- Bisa menulis kode yang "English-like" dengan \`unless\`.
- Menggunakan Range \`..\` dalam \`case\`.
`,
    level: 'beginner',
    order: 3,
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: 'rb-04',
    user_type: 'student',
    language: 'ruby',
    title: 'Collections & Iterators (The Ruby Way)',
    description: 'Array, Hash, dan meninggalkan For Loop demi .each dan .map.',
    content: `# Struktur Data & Iterasi

Di Ruby, **jangan gunakan For Loop** (misal \`for i in 0..n\`). Itu gaya bahasa C/Java.
Gunakan **Method Iterator** bawaan.

## 1. Array
\`\`\`ruby
buah = ["Apel", "Jeruk", "Mangga"]

# Menambah data
buah << "Pisang" 

# Iterasi (Gaya Ruby)
buah.each do |item|
  puts "Saya suka #{item}"
end
\`\`\`

## 2. Hash (Dictionary)
Pasangan Key-Value. Standar industri menggunakan **Symbol** sebagai key.

\`\`\`ruby
# Syntax Modern (Ruby 1.9+)
user = { 
  name: "Dino", 
  role: :admin, 
  active: true 
}

puts user[:name] # Akses pakai symbol
\`\`\`

## 3. Map & Select
\`\`\`ruby
angka = [1, 2, 3, 4, 5]

# Map: Mengubah data (return array baru)
kuadrat = angka.map { |n| n * 2 } 
# => [2, 4, 6, 8, 10]

# Select: Filter data (return array baru)
genap = angka.select { |n| n.even? } 
# => [2, 4]
\`\`\`

## 🎯 Outcome Modul
- Meninggalkan \`for\` loop.
- Mahir menggunakan \`.each\`, \`.map\`, dan \`.select\`.
- Menggunakan Symbol keys di Hash (\`{ key: value }\`).
`,
    level: 'intermediate',
    order: 4,
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: 'rb-05',
    user_type: 'student',
    language: 'ruby',
    title: 'Methods, Blocks & Yield',
    description: 'Implicit Return, Keyword Arguments, dan Konsep Block yang powerful.',
    content: `# Methods & Blocks

## 1. Method
Ruby otomatis me-return baris terakhir (Implicit Return). \`return\` opsional.

\`\`\`ruby
# Keyword Arguments (Wajib isi nama param saat panggil)
def sapa(nama:, waktu: "Pagi")
  "Selamat #{waktu}, #{nama}!" # Return otomatis
end

puts sapa(nama: "Budi") # Output: Selamat Pagi, Budi!
puts sapa(waktu: "Sore", nama: "Ani") # Urutan tidak masalah
\`\`\`

## 2. Blocks & Yield
Fitur "Magic" Ruby. Kita bisa mengirim potongan kode (Block) ke dalam method.

\`\`\`ruby
def html_tag(tag)
  print "<#{tag}>"
  yield if block_given? # Jalankan kode block di sini
  print "</#{tag}>"
end

# Pemanggilan:
html_tag(:div) do
  print "Ini isi konten"
end
# Output: <div>Ini isi konten</div>
\`\`\`

## 🎯 Outcome Modul
- Mengerti *Implicit Return*.
- Bisa membuat method yang menerima Block (\`yield\`).
- Paham kenapa \`.each do ... end\` bekerja (karena itu Block!).
`,
    level: 'intermediate',
    order: 5,
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: 'rb-06',
    user_type: 'student',
    language: 'ruby',
    title: 'OOP: Class & Accessor',
    description: 'Class, Initialize, attr_reader/writer, dan Self.',
    content: `# Object Oriented Ruby

## 1. Definisi Class
Nama class harus **PascalCase**.

\`\`\`ruby
class Kucing
  # Getter & Setter otomatis
  attr_accessor :nama, :warna 
  
  # Constructor
  def initialize(nama, warna)
    @nama = nama   # @variable adalah Instance Variable
    @warna = warna
  end

  def meong
    "#{@nama} berkata: Meong!"
  end
end

tom = Kucing.new("Tom", "Abu-abu")
tom.warna = "Hitam" # Mengubah warna (karena attr_accessor)
puts tom.meong
\`\`\`

## 2. Accessor (Getter/Setter Shortcut)
Di bahasa lain kita tulis manual \`getNama()\` dan \`setNama()\`.
Di Ruby:
- \`attr_reader\`: Hanya baca (Read-only).
- \`attr_writer\`: Hanya tulis.
- \`attr_accessor\`: Baca dan Tulis.

## 3. Inheritance
\`\`\`ruby
class Hewan
  def bernafas; puts "Hosh hosh"; end
end

class Anjing < Hewan # Tanda < artinya extends
end
\`\`\`

## 🎯 Outcome Modul
- Mengerti fungsi \`@variable\` (scope instance).
- Tidak lagi menulis Getter/Setter manual, pakai \`attr_accessor\`.
`,
    level: 'advanced',
    order: 6,
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: 'rb-07',
    user_type: 'student',
    language: 'ruby',
    title: 'Modules & Mixins',
    description: 'Mengatasi masalah Multiple Inheritance dengan Module (Include vs Extend).',
    content: `# Modules & Mixins

Ruby tidak support *Multiple Inheritance* (satu anak punya 2 bapak).
Solusinya: **Modules (Mixins)**.

## 1. Definisi Module
Module adalah kumpulan method yang bisa "ditempel" ke class lain.

\`\`\`ruby
module BisaTerbang
  def terbang
    puts "Wusss... terbang ke langit!"
  end
end

module BisaBerenang
  def berenang
    puts "Byur... berenang!"
  end
end
\`\`\`

## 2. Include (Instance Method)
Menambahkan kemampuan ke *object* (instance).

\`\`\`ruby
class Bebek
  include BisaTerbang
  include BisaBerenang
end

donald = Bebek.new
donald.terbang  # Wusss...
donald.berenang # Byur...
\`\`\`

## 3. Extend (Class Method)
Menambahkan kemampuan ke *Class* itu sendiri.

\`\`\`ruby
module Logger
  def log(msg)
    puts "[LOG]: #{msg}"
  end
end

class Server
  extend Logger
end

Server.log("Server starting...") # Panggil tanpa new
\`\`\`

## 🎯 Outcome Modul
- Paham beda Class dan Module (Module tidak bisa di-\`new\`).
- Mengerti beda \`include\` vs \`extend\`.
`,
    level: 'advanced',
    order: 7,
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: 'rb-08',
    user_type: 'student',
    language: 'ruby',
    title: 'Ecosystem: Gems, Bundler & Testing',
    description: 'Mengelola library dengan Gemfile dan pengenalan RSpec.',
    content: `# Ruby Ecosystem

Kekuatan Ruby ada pada komunitas dan library-nya (**Gems**).

## 1. Bundler & Gemfile
Setiap project Ruby modern pasti punya file bernama \`Gemfile\`. Ini mirip \`package.json\` di Node.js.

\`\`\`ruby
# Gemfile
source 'https://rubygems.org'

gem 'sinatra'
gem 'rspec', group: :test
\`\`\`

Terminal:
\`\`\`bash
bundle install # Install semua library
\`\`\`

## 2. Testing dengan RSpec
Ruby memiliki budaya testing yang sangat kuat (TDD/BDD).
Standar industri adalah **RSpec**.

\`\`\`ruby
# calculator_spec.rb
RSpec.describe Calculator do
  it "adds two numbers correctly" do
    calc = Calculator.new
    expect(calc.add(2, 3)).to eq(5)
  end
end
\`\`\`
*Kode di atas dibaca seperti bahasa Inggris: "Expect calculator add 2, 3 to equal 5".*

## 🎯 Outcome Modul
- Bisa setup project dengan \`bundle init\`.
- Tidak takut menulis Test case sederhana.
`,
    level: 'advanced',
    order: 8,
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: 'rb-09',
    user_type: 'student',
    language: 'ruby',
    title: 'Studi Kasus 1: Log File Analyzer',
    description: 'Latihan manipulasi String, Hash Counting, dan File I/O.',
    content: `# Studi Kasus 1: Server Log Analyzer

## 📜 Skenario
Anda memiliki file log server (\`server.log\`).
Setiap baris berisi IP Address dan Status Code.
Tugas:
1.  Baca file log.
2.  Hitung berapa kali setiap IP melakukan request.
3.  Cari IP mana yang paling sering akses (Top Visitor).

Contoh isi log:
\`\`\`text
192.168.1.1 - 200
192.168.1.2 - 404
192.168.1.1 - 200
\`\`\`

## 💻 Solusi Code
\`\`\`ruby
class LogAnalyzer
  def initialize(file_path)
    @file_path = file_path
    @ip_counts = Hash.new(0) # Default value 0
  end

  def analyze
    unless File.exist?(@file_path)
      puts "File tidak ditemukan!"
      return
    end

    # Baca file baris per baris (Hemat memori)
    File.foreach(@file_path) do |line|
      process_line(line)
    end

    display_results
  end

  private

  def process_line(line)
    # Split string: "192.168.1.1 - 200" -> ambil IP index 0
    ip = line.split(" - ").first
    @ip_counts[ip] += 1
  end

  def display_results
    # Sort hash berdasarkan value (jumlah) secara descending
    sorted = @ip_counts.sort_by { |ip, count| -count }

    puts "--- Laporan Pengunjung ---"
    sorted.each do |ip, count|
      puts "#{ip}: #{count} request"
    end

    top_ip = sorted.first
    puts "\n🏆 Top Visitor: #{top_ip[0]} (#{top_ip[1]} hits)"
  end
end

# --- SETUP DUMMY FILE UNTUK DEMO ---
File.write("server.log", "10.0.0.1 - 200\n10.0.0.2 - 404\n10.0.0.1 - 200\n10.0.0.3 - 500")

# --- EKSEKUSI ---
analyzer = LogAnalyzer.new("server.log")
analyzer.analyze
\`\`\`

## ✅ Hasil yang Diharapkan
\`\`\`text
--- Laporan Pengunjung ---
10.0.0.1: 2 request
10.0.0.2: 1 request
10.0.0.3: 1 request

🏆 Top Visitor: 10.0.0.1 (2 hits)
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
    title: 'Studi Kasus 2: Sistem Perpustakaan (OOP)',
    description: 'Latihan Class Relation, Module, dan Error Handling.',
    content: `# Studi Kasus 2: Library Management System

## 📜 Skenario
Sistem perpustakaan sederhana.
1.  **Module \`Loanable\`**: Berisi logika meminjam dan mengembalikan.
2.  **Class \`Book\`**: Memiliki judul dan status ketersediaan.
3.  **Class \`Member\`**: Bisa meminjam buku.
4.  Validasi: Tidak bisa meminjam buku yang sedang dipinjam orang lain.

## 💻 Solusi Code
\`\`\`ruby
# 1. Module (Mixin)
module Loanable
  def borrow!
    if @available
      @available = false
      true # Berhasil
    else
      false # Gagal
    end
  end

  def return!
    @available = true
  end

  def available?
    @available
  end
end

# 2. Class Book
class Book
  include Loanable # Tempel kemampuan Loanable
  attr_reader :title

  def initialize(title)
    @title = title
    @available = true
  end

  def to_s
    status = @available ? "Tersedia" : "Dipinjam"
    "[#{status}] #{@title}"
  end
end

# 3. Class Member
class Member
  attr_reader :name

  def initialize(name)
    @name = name
    @borrowed_books = []
  end

  def borrow_book(book)
    if book.borrow!
      @borrowed_books << book
      puts "✅ #{@name} berhasil meminjam '#{book.title}'"
    else
      puts "❌ Maaf, '#{book.title}' sedang tidak tersedia."
    end
  end

  def list_books
    puts "\nBuku yang dipinjam #{@name}:"
    @borrowed_books.each { |b| puts "- #{b.title}" }
  end
end

# --- EKSEKUSI ---
buku1 = Book.new("Harry Potter")
buku2 = Book.new("Lord of the Rings")

dino = Member.new("Dino")
budi = Member.new("Budi")

puts buku1 # [Tersedia] Harry Potter

dino.borrow_book(buku1) # Sukses
budi.borrow_book(buku1) # Gagal (sudah dipinjam Dino)
dino.borrow_book(buku2) # Sukses

dino.list_books
\`\`\`

## ✅ Hasil yang Diharapkan
\`\`\`text
[Tersedia] Harry Potter
✅ Dino berhasil meminjam 'Harry Potter'
❌ Maaf, 'Harry Potter' sedang tidak tersedia.
✅ Dino berhasil meminjam 'Lord of the Rings'

Buku yang dipinjam Dino:
- Harry Potter
- Lord of the Rings
\`\`\`
`,
    level: 'advanced',
    order: 10,
    created_at: '2025-01-01T00:00:00Z'
  },
];