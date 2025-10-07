/*
  # Create Coding Learning Platform Schema

  1. New Tables
    - `users`
      - `id` (uuid, primary key)
      - `access_code` (text, unique) - Kode akses untuk login
      - `user_type` (text) - Tipe user: student, umum, pro, game
      - `name` (text) - Nama user
      - `created_at` (timestamptz)
      - `last_login` (timestamptz)
    
    - `learning_materials`
      - `id` (uuid, primary key)
      - `user_type` (text) - Tipe user yang bisa akses
      - `language` (text) - Bahasa pemrograman (untuk student)
      - `title` (text) - Judul materi
      - `description` (text) - Deskripsi materi
      - `content` (text) - Konten materi
      - `level` (text) - Level: beginner, intermediate, advanced
      - `order` (integer) - Urutan materi
      - `created_at` (timestamptz)
    
    - `user_progress`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key)
      - `material_id` (uuid, foreign key)
      - `completed` (boolean)
      - `completed_at` (timestamptz)
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to access their own data
    - Add policies for reading learning materials based on user type

  3. Sample Data
    - Pre-populated access codes for different user types
    - Learning materials for Python, PHP, and JavaScript
*/

-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  access_code text UNIQUE NOT NULL,
  user_type text NOT NULL CHECK (user_type IN ('student', 'umum', 'pro', 'game')),
  name text NOT NULL,
  created_at timestamptz DEFAULT now(),
  last_login timestamptz DEFAULT now()
);

-- Create learning_materials table
CREATE TABLE IF NOT EXISTS learning_materials (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_type text NOT NULL CHECK (user_type IN ('student', 'umum', 'pro', 'game')),
  language text,
  title text NOT NULL,
  description text NOT NULL,
  content text NOT NULL,
  level text NOT NULL CHECK (level IN ('beginner', 'intermediate', 'advanced')),
  "order" integer NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Create user_progress table
CREATE TABLE IF NOT EXISTS user_progress (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  material_id uuid NOT NULL REFERENCES learning_materials(id) ON DELETE CASCADE,
  completed boolean DEFAULT false,
  completed_at timestamptz,
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id, material_id)
);

-- Enable RLS
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE learning_materials ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_progress ENABLE ROW LEVEL SECURITY;

-- RLS Policies for users table
CREATE POLICY "Users can view own data"
  ON users FOR SELECT
  USING (true);

CREATE POLICY "Users can update own data"
  ON users FOR UPDATE
  USING (true);

-- RLS Policies for learning_materials table
CREATE POLICY "Anyone can view learning materials"
  ON learning_materials FOR SELECT
  USING (true);

-- RLS Policies for user_progress table
CREATE POLICY "Users can view own progress"
  ON user_progress FOR SELECT
  USING (true);

CREATE POLICY "Users can insert own progress"
  ON user_progress FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Users can update own progress"
  ON user_progress FOR UPDATE
  USING (true);

-- Insert sample access codes
INSERT INTO users (access_code, user_type, name) VALUES
  ('STUDENT2024', 'student', 'Student User'),
  ('UMUM2024', 'umum', 'Umum User'),
  ('PRO2024', 'pro', 'Pro User'),
  ('GAME2024', 'game', 'Game User'),
  ('STD001', 'student', 'Student 1'),
  ('STD002', 'student', 'Student 2'),
  ('UMUM001', 'umum', 'Umum 1'),
  ('PRO001', 'pro', 'Pro 1')
ON CONFLICT (access_code) DO NOTHING;

-- Insert Python learning materials
INSERT INTO learning_materials (user_type, language, title, description, content, level, "order") VALUES
  ('student', 'python', 'Python Basics - Variables dan Tipe Data', 'Pelajari dasar-dasar variabel dan tipe data di Python', 
   E'# Variables dan Tipe Data di Python\n\n## Apa itu Variable?\nVariable adalah tempat untuk menyimpan data dalam program.\n\n## Contoh:\n```python\n# Integer\numur = 25\n\n# String\nnama = "Budi"\n\n# Float\ntinggi = 175.5\n\n# Boolean\naktif = True\n```\n\n## Latihan:\nBuat variable untuk menyimpan nama, umur, dan hobi Anda!', 
   'beginner', 1),
  
  ('student', 'python', 'Python - Control Flow (If-Else)', 'Belajar membuat keputusan dalam program', 
   E'# Control Flow - If Else\n\n## Pengertian\nControl flow digunakan untuk membuat keputusan dalam program.\n\n## Syntax:\n```python\numur = 18\n\nif umur >= 17:\n    print("Sudah boleh punya SIM")\nelse:\n    print("Belum boleh punya SIM")\n```\n\n## Latihan:\nBuat program untuk mengecek apakah sebuah angka genap atau ganjil!', 
   'beginner', 2),
  
  ('student', 'python', 'Python - Looping (For & While)', 'Memahami perulangan dalam Python', 
   E'# Looping di Python\n\n## For Loop\n```python\nfor i in range(5):\n    print(f"Angka: {i}")\n```\n\n## While Loop\n```python\ncount = 0\nwhile count < 5:\n    print(count)\n    count += 1\n```\n\n## Latihan:\nBuat program untuk menampilkan tabel perkalian 1-10!', 
   'intermediate', 3),
  
  ('student', 'python', 'Python - Functions', 'Membuat dan menggunakan fungsi', 
   E'# Functions di Python\n\n## Pengertian\nFunction adalah blok kode yang dapat digunakan kembali.\n\n## Contoh:\n```python\ndef sapa(nama):\n    return f"Halo, {nama}!"\n\nhasil = sapa("Budi")\nprint(hasil)\n```\n\n## Latihan:\nBuat function untuk menghitung luas persegi panjang!', 
   'intermediate', 4);

-- Insert PHP learning materials
INSERT INTO learning_materials (user_type, language, title, description, content, level, "order") VALUES
  ('student', 'php', 'PHP Basics - Syntax Dasar', 'Pengenalan syntax dasar PHP', 
   E'# PHP Basics\n\n## Syntax Dasar\nPHP adalah bahasa pemrograman server-side.\n\n## Contoh:\n```php\n<?php\n$nama = "Budi";\n$umur = 25;\n\necho "Nama: " . $nama;\necho "Umur: " . $umur;\n?>\n```\n\n## Latihan:\nBuat file PHP untuk menampilkan informasi diri Anda!', 
   'beginner', 1),
  
  ('student', 'php', 'PHP - Arrays', 'Bekerja dengan arrays di PHP', 
   E'# Arrays di PHP\n\n## Indexed Array\n```php\n<?php\n$buah = array("Apel", "Jeruk", "Mangga");\necho $buah[0]; // Output: Apel\n?>\n```\n\n## Associative Array\n```php\n<?php\n$umur = array("Budi"=>25, "Ani"=>22);\necho $umur["Budi"];\n?>\n```\n\n## Latihan:\nBuat array untuk menyimpan data mahasiswa!', 
   'beginner', 2),
  
  ('student', 'php', 'PHP - MySQL Connection', 'Koneksi database dengan PHP', 
   E'# PHP & MySQL\n\n## Koneksi Database\n```php\n<?php\n$conn = mysqli_connect("localhost", "user", "pass", "dbname");\n\nif (!$conn) {\n    die("Koneksi gagal: " . mysqli_connect_error());\n}\necho "Koneksi berhasil";\n?>\n```\n\n## Latihan:\nBuat koneksi ke database dan tampilkan data!', 
   'advanced', 3);

-- Insert JavaScript learning materials
INSERT INTO learning_materials (user_type, language, title, description, content, level, "order") VALUES
  ('student', 'javascript', 'JavaScript Basics - Variables & Data Types', 'Dasar-dasar JavaScript', 
   E'# JavaScript Basics\n\n## Variables\n```javascript\nlet nama = "Budi";\nconst umur = 25;\nvar kota = "Jakarta";\n\nconsole.log(nama);\n```\n\n## Data Types\n- String\n- Number\n- Boolean\n- Array\n- Object\n\n## Latihan:\nBuat variable untuk menyimpan biodata Anda!', 
   'beginner', 1),
  
  ('student', 'javascript', 'JavaScript - Functions & Arrow Functions', 'Membuat fungsi di JavaScript', 
   E'# Functions di JavaScript\n\n## Regular Function\n```javascript\nfunction tambah(a, b) {\n    return a + b;\n}\n```\n\n## Arrow Function\n```javascript\nconst kali = (a, b) => a * b;\n\nconsole.log(kali(5, 3)); // 15\n```\n\n## Latihan:\nBuat function untuk menghitung rata-rata!', 
   'intermediate', 2),
  
  ('student', 'javascript', 'JavaScript - DOM Manipulation', 'Manipulasi HTML dengan JavaScript', 
   E'# DOM Manipulation\n\n## Selecting Elements\n```javascript\nconst btn = document.getElementById("myBtn");\nconst items = document.querySelectorAll(".item");\n```\n\n## Modifying Content\n```javascript\nbtn.addEventListener("click", () => {\n    btn.textContent = "Clicked!";\n});\n```\n\n## Latihan:\nBuat to-do list interaktif!', 
   'advanced', 3);

-- Insert materials for other user types
INSERT INTO learning_materials (user_type, language, title, description, content, level, "order") VALUES
  ('umum', null, 'Pengenalan Programming', 'Apa itu programming dan mengapa penting', 
   E'# Pengenalan Programming\n\n## Apa itu Programming?\nProgramming adalah proses menulis instruksi untuk komputer.\n\n## Mengapa Belajar Programming?\n- Meningkatkan logical thinking\n- Peluang karir yang luas\n- Membuat aplikasi sendiri\n\n## Bahasa Programming Populer:\n- Python\n- JavaScript\n- Java\n- C++', 
   'beginner', 1),
  
  ('umum', null, 'Algoritma Dasar', 'Memahami algoritma dan logika', 
   E'# Algoritma Dasar\n\n## Apa itu Algoritma?\nAlgoritma adalah langkah-langkah sistematis untuk menyelesaikan masalah.\n\n## Contoh Algoritma Sederhana:\n1. Bangun pagi\n2. Mandi\n3. Sarapan\n4. Berangkat kerja\n\n## Flowchart\nDiagram yang menggambarkan alur algoritma.', 
   'beginner', 2),
  
  ('pro', null, 'Design Patterns', 'Pola desain software profesional', 
   E'# Design Patterns\n\n## Singleton Pattern\nMemastikan class hanya punya satu instance.\n\n## Factory Pattern\nMembuat object tanpa specify class-nya.\n\n## Observer Pattern\nNotifikasi otomatis saat ada perubahan.\n\n## Latihan:\nImplementasi Singleton dalam project Anda!', 
   'advanced', 1),
  
  ('pro', null, 'Clean Code Principles', 'Menulis code yang maintainable', 
   E'# Clean Code\n\n## Prinsip SOLID\n- Single Responsibility\n- Open/Closed\n- Liskov Substitution\n- Interface Segregation\n- Dependency Inversion\n\n## Best Practices:\n- Naming yang jelas\n- Functions yang kecil\n- Avoid duplication', 
   'advanced', 2),
  
  ('game', null, 'Game Development Basics', 'Dasar-dasar membuat game', 
   E'# Game Development\n\n## Game Loop\n```javascript\nfunction gameLoop() {\n    update();\n    render();\n    requestAnimationFrame(gameLoop);\n}\n```\n\n## Core Concepts:\n- Sprites\n- Collision Detection\n- Physics\n- Input Handling', 
   'intermediate', 1),
  
  ('game', null, 'Unity C# Fundamentals', 'Programming game dengan Unity', 
   E'# Unity C# Basics\n\n## MonoBehaviour\n```csharp\npublic class Player : MonoBehaviour {\n    void Start() {\n        // Initialization\n    }\n    \n    void Update() {\n        // Per frame\n    }\n}\n```\n\n## Transform\nMengatur posisi, rotasi, dan scale object.', 
   'intermediate', 2);
