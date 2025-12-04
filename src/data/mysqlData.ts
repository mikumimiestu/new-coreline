import type { LearningMaterial } from '../types/learning';

export const MOCK_MATERIALS: LearningMaterial[] = [
  // ==================== MYSQL MATERIALS ====================
  {
    id: 'sql-01',
    user_type: 'student',
    language: 'sql',
    title: 'Pengenalan Database Relasional & Arsitektur MySQL',
    description: 'Konsep RDBMS, Arsitektur Client-Server, Storage Engine, dan Instalasi.',
    content: `# 🐬 Pengenalan MySQL & RDBMS

## Apa itu RDBMS?
**RDBMS (Relational Database Management System)** adalah sistem penyimpanan data yang mengorganisir data ke dalam **Tabel** (baris dan kolom) yang saling berhubungan (berelasi).

**Hierarki Data:**
1.  **Database:** Wadah besar (misal: \`toko_online\`).
2.  **Table:** Kumpulan data sejenis (misal: \`users\`, \`products\`).
3.  **Column (Field):** Atribut data (misal: \`email\`, \`harga\`).
4.  **Row (Record):** Satu data spesifik (misal: \`User Budi\`).

---

## 🏗️ Arsitektur MySQL
MySQL bekerja dengan konsep **Client-Server**:
1.  **Server (MySQL Daemon/mysqld):** Proses yang berjalan di background, menyimpan data di disk, dan memproses query.
2.  **Client:** Aplikasi yang mengirim perintah (WorkBench, DBeaver, PHP, Python, Terminal).

### Storage Engine: InnoDB vs MyISAM
Saat membuat tabel, Anda memilih "mesin" penyimpanannya.
-   **InnoDB (Default & Wajib):** Mendukung **Transactions (ACID)**, **Foreign Keys**, dan **Row-level locking**. Gunakan ini untuk 99% kasus.
-   **MyISAM (Legacy):** Cepat untuk baca, tapi tidak mendukung transaksi. Rentan data korup jika mati lampu.

---

## 🛠️ Persiapan Tools
Hindari hanya menggunakan CMD/Terminal. Gunakan GUI agar produktif:
1.  **MySQL Workbench:** Tool resmi Oracle.
2.  **DBeaver:** Universal (bisa PostgreSQL juga), sangat populer.
3.  **XAMPP/Laragon:** Paket instalasi mudah untuk Windows.

---

## 💻 Sintaks Dasar (SQL)
SQL (Structured Query Language) tidak case-sensitive, tapi standar industri menulis **KEYWORD** dengan huruf besar.

\`\`\`sql
-- Melihat daftar database
SHOW DATABASES;

-- Memilih database aktif
USE nama_database;

-- Melihat daftar tabel
SHOW TABLES;
\`\`\`

## 🎯 Outcome Modul
- Memahami beda Excel vs Database.
- Mengerti kenapa harus pakai **InnoDB**.
- Bisa menginstal dan konek ke database server.
`,
    level: 'beginner',
    order: 1,
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: 'sql-02',
    user_type: 'student',
    language: 'sql',
    title: 'DDL: Mendesain Tabel & Tipe Data',
    description: 'Create Database/Table, Tipe Data Tepat (INT vs BIGINT, CHAR vs VARCHAR), dan Constraints.',
    content: `# Data Definition Language (DDL)

DDL adalah perintah untuk mendefinisikan struktur database (\`CREATE\`, \`ALTER\`, \`DROP\`).

## 1. Tipe Data (Sangat Krusial!)
Salah pilih tipe data = boros memori dan lambat.

| Kategori | Tipe | Penjelasan | Kapan Dipakai? |
|:---|:---|:---|:---|
| **Angka** | \`INT\` | Bilangan bulat standar | ID, Jumlah barang. |
| | \`BIGINT\` | Angka sangat besar | ID YouTube, Saldo Bank Global. |
| | \`DECIMAL(M,D)\` | Desimal presisi tinggi | **Uang/Gaji** (JANGAN PAKAI FLOAT/DOUBLE!). |
| **Teks** | \`VARCHAR(n)\` | Panjang variabel | Nama, Email, Alamat. |
| | \`CHAR(n)\` | Panjang tetap | Kode pos, Kode Negara (ID, US). |
| | \`TEXT\` | Teks panjang | Artikel blog, Deskripsi produk. |
| **Waktu** | \`DATETIME\` | Tanggal & Jam | Tgl transaksi (tetap). |
| | \`TIMESTAMP\` | Ikut zona waktu server | Log aktivitas, Created_at. |

## 2. Membuat Tabel (Create Table)
Perhatikan \`PRIMARY KEY\` dan \`AUTO_INCREMENT\`.

\`\`\`sql
CREATE DATABASE sekolah;
USE sekolah;

CREATE TABLE siswa (
    id INT AUTO_INCREMENT PRIMARY KEY, -- ID unik otomatis nambah (1, 2, 3...)
    nisn CHAR(10) UNIQUE NOT NULL,     -- Tidak boleh kosong & harus unik
    nama_lengkap VARCHAR(100) NOT NULL,
    alamat TEXT,
    jenis_kelamin ENUM('L', 'P'),      -- Pilihan terbatas
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP -- Otomatis terisi waktu sekarang
);
\`\`\`

## 3. Constraints (Batasan)
Menjaga kualitas data agar tidak "sampah".
- \`PRIMARY KEY\`: Identitas unik baris (Wajib ada).
- \`NOT NULL\`: Data tidak boleh kosong.
- \`UNIQUE\`: Data tidak boleh kembar (misal: Email, NIK).
- \`DEFAULT\`: Nilai bawaan jika user tidak isi.

## 4. Mengubah Struktur (Alter)
\`\`\`sql
-- Menambah kolom baru
ALTER TABLE siswa ADD COLUMN no_hp VARCHAR(15);

-- Mengubah tipe data
ALTER TABLE siswa MODIFY COLUMN nama_lengkap VARCHAR(150);
\`\`\`

## 🎯 Outcome Modul
- Bisa mendesain tabel dengan tipe data yang efisien.
- Paham bahaya menggunakan FLOAT untuk uang (gunakan DECIMAL).
- Mengerti penggunaan Primary Key.
`,
    level: 'beginner',
    order: 2,
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: 'sql-03',
    user_type: 'student',
    language: 'sql',
    title: 'DML: CRUD Operation (Create, Read, Update, Delete)',
    description: 'Insert data, Select dengan filter canggih, Update aman, dan Delete.',
    content: `# Data Manipulation Language (DML)

Ini adalah perintah sehari-hari programmer: Mengelola isi data.

## 1. INSERT (Menambah Data)
\`\`\`sql
-- Insert satu baris
INSERT INTO siswa (nisn, nama_lengkap, jenis_kelamin) 
VALUES ('1234567890', 'Budi Santoso', 'L');

-- Insert banyak baris sekaligus (Bulk Insert) - Lebih cepat!
INSERT INTO siswa (nisn, nama_lengkap, jenis_kelamin) VALUES 
('111', 'Siti', 'P'),
('222', 'Rudi', 'L');
\`\`\`

## 2. SELECT (Mengambil Data)
Perintah paling kompleks dan powerful.

\`\`\`sql
-- Ambil semua (Hati-hati jika data jutaan!)
SELECT * FROM siswa;

-- Ambil kolom tertentu saja (Best Practice)
SELECT nama_lengkap, alamat FROM siswa;

-- FILTERING (WHERE)
SELECT * FROM siswa WHERE jenis_kelamin = 'L';
SELECT * FROM siswa WHERE nama_lengkap LIKE '%Budi%'; -- Cari yang ada kata 'Budi'

-- SORTING (ORDER BY)
SELECT * FROM siswa ORDER BY created_at DESC; -- Terbaru paling atas

-- LIMIT (Pagination)
SELECT * FROM siswa LIMIT 10 OFFSET 0; -- Halaman 1 (10 data)
\`\`\`

## 3. UPDATE (Mengubah Data)
⚠️ **PERINGATAN KERAS:** Selalu gunakan \`WHERE\`! Jika lupa, **semua** data tabel akan berubah.

\`\`\`sql
-- Benar
UPDATE siswa 
SET alamat = 'Jl. Baru No 1', no_hp = '081234' 
WHERE id = 1;

-- SALAH (Bencana!)
-- UPDATE siswa SET alamat = 'Hilang'; 
\`\`\`

## 4. DELETE (Menghapus Data)
Sama seperti Update, wajib pakai \`WHERE\`.

\`\`\`sql
DELETE FROM siswa WHERE id = 5;
\`\`\`

> **Tips Industri:** Jarang ada aplikasi yang benar-benar melakukan \`DELETE\`. Biasanya menggunakan **Soft Delete** (tambah kolom \`is_deleted = 1\`) agar data bisa dipulihkan jika tidak sengaja terhapus.

## 🎯 Outcome Modul
- Bisa melakukan CRUD dasar.
- Paham bahaya Update/Delete tanpa Where.
- Mengerti konsep Soft Delete.
`,
    level: 'intermediate',
    order: 3,
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: 'sql-04',
    user_type: 'student',
    language: 'sql',
    title: 'Relasi Tabel & JOIN',
    description: 'One-to-Many, Many-to-Many, Inner Join, Left Join, dan Foreign Keys.',
    content: `# Relasi & JOIN

Kekuatan utama SQL adalah menggabungkan data dari banyak tabel.

## 1. Konsep Relasi (Foreign Key)
Bayangkan aplikasi Toko.
-   Tabel \`users\` (User)
-   Tabel \`orders\` (Pesanan)

Satu user bisa punya banyak pesanan (**One-to-Many**).
Kita butuh kolom **Foreign Key (FK)** di tabel anak (\`orders\`) yang menunjuk ke tabel induk (\`users\`).

\`\`\`sql
CREATE TABLE orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT, -- Ini Foreign Key
    total DECIMAL(10, 2),
    FOREIGN KEY (user_id) REFERENCES users(id) -- Membuat aturan relasi
);
\`\`\`

## 2. Jenis-Jenis JOIN

### A. INNER JOIN (Irisan)
Hanya menampilkan data yang **ADA DI KEDUA** tabel. Jika User belum pernah belanja, dia tidak muncul.
\`\`\`sql
SELECT users.nama, orders.total
FROM users
INNER JOIN orders ON users.id = orders.user_id;
\`\`\`

### B. LEFT JOIN (Kiri Lengkap) 
Menampilkan **SEMUA** data tabel kiri (\`users\`), walaupun tidak punya pasangan di kanan (\`orders\`).
Jika tidak punya order, kolom total akan berisi \`NULL\`.
\`\`\`sql
SELECT users.nama, orders.total
FROM users
LEFT JOIN orders ON users.id = orders.user_id;
\`\`\`
*Gunakan ini untuk melihat: "Siapa user yang belum pernah belanja?" (cari yang orders.id NULL).*

### C. RIGHT JOIN
Kebalikan Left Join. Jarang dipakai.

## 3. Aggregate Functions & Group By
Menghitung rekapitulasi data.

\`\`\`sql
-- Menghitung total belanja per user
SELECT 
    users.nama, 
    COUNT(orders.id) as jumlah_transaksi,
    SUM(orders.total) as total_uang
FROM users
LEFT JOIN orders ON users.id = orders.user_id
GROUP BY users.id; -- Wajib di-group jika pakai COUNT/SUM
\`\`\`

## 🎯 Outcome Modul
- Tidak bingung lagi beda \`INNER\` dan \`LEFT\` Join.
- Bisa mendesain relasi antar tabel (FK).
- Bisa membuat laporan rekapitulasi dengan \`GROUP BY\`.
`,
    level: 'intermediate',
    order: 4,
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: 'sql-05',
    user_type: 'student',
    language: 'sql',
    title: 'Advanced: Database Normalization & Transaction (ACID)',
    description: 'Teori Normalisasi (1NF, 2NF, 3NF) dan integritas transaksi.',
    content: `# Desain & Integritas Data

## 1. Normalisasi Database
Teknik mengorganisir kolom dan tabel untuk mengurangi **Redundansi** (data kembar) dan menjaga integritas.

-   **1NF (First Normal Form):** Setiap kolom harus bernilai tunggal (atomik). Tidak boleh ada kolom \`hobi\` isinya "Mancing, Gaming, Tidur". Pecah jadi tabel lain.
-   **2NF:** Harus 1NF + Semua kolom non-kunci harus bergantung penuh pada Primary Key.
-   **3NF:** Harus 2NF + Tidak ada ketergantungan transitif (kolom bergantung pada kolom lain yang bukan primary key).
    * *Contoh salah:* Tabel \`transaksi\` punya kolom \`kode_barang\`, \`nama_barang\`, \`harga_barang\`.
    * *Masalah:* Jika nama barang berubah, harus update semua baris transaksi.
    * *Solusi:* Pisah jadi tabel \`barang\`. Di transaksi cukup simpan \`kode_barang\`.

## 2. Transactions (ACID)
Fitur vital untuk aplikasi keuangan/stok. Menjamin sekumpulan query **Sukses Semua** atau **Gagal Semua**.

**ACID:**
-   **A**tomicity: All or nothing.
-   **C**onsistency: Data valid sebelum & sesudah.
-   **I**solation: Transaksi tidak saling ganggu.
-   **D**urability: Jika sukses, data tersimpan permanen walau mati lampu.

### Contoh Kasus: Transfer Uang
Budi transfer ke Ani. Langkah:
1.  Kurangi saldo Budi.
2.  Tambah saldo Ani.

Apa yang terjadi jika langkah 1 sukses, tapi langkah 2 error? Uang hilang! Solusinya: **Transaction**.

\`\`\`sql
START TRANSACTION;

UPDATE rekening SET saldo = saldo - 10000 WHERE id = 1; -- Budi
-- Misal terjadi error di sini, atau server mati...
UPDATE rekening SET saldo = saldo + 10000 WHERE id = 2; -- Ani

COMMIT; -- Simpan permanen jika semua lancar.
-- ROLLBACK; -- Batalkan semua jika ada error.
\`\`\`

## 🎯 Outcome Modul
- Mampu menormalisasi tabel agar tidak redundan.
- Wajib menggunakan Transaction untuk operasi sensitif.
`,
    level: 'advanced',
    order: 5,
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: 'sql-06',
    user_type: 'student',
    language: 'sql',
    title: 'Performance Tuning: Indexing & Query Optimization',
    description: 'Cara kerja Index (B-Tree), Explain Analyze, dan mempercepat query lambat.',
    content: `# Performance Tuning: Indexing

Kenapa database bisa mencari 1 data di antara 1 juta data dalam 0.01 detik? Jawabannya: **INDEX**.

## 1. Analogi Index
Bayangkan buku setebal 1000 halaman tentang "Resep Masakan".
-   **Tanpa Index (Full Table Scan):** Anda buka halaman 1 sampai 1000 satu per satu cari "Nasi Goreng". Lambat!
-   **Dengan Index:** Anda buka halaman belakang (Indeks Alfabet), cari "N", temukan "Nasi Goreng: hal 50". Langsung buka halaman 50. Cepat!

## 2. Cara Membuat Index
\`\`\`sql
-- Membuat index di kolom email agar login cepat
CREATE INDEX idx_email ON users(email);

-- Index gabungan (Composite Index)
CREATE INDEX idx_nama_alamat ON users(nama, alamat);
\`\`\`

## 3. Kapan Pakai Index?
**Good for:**
-   Kolom yang sering dipakai di \`WHERE\`, \`JOIN\`, \`ORDER BY\`.
-   Kolom Foreign Key.

**Bad for:**
-   Tabel kecil (cuma 10 baris).
-   Kolom yang isinya sering berubah (Insert/Update jadi lambat karena harus update Index juga).
-   Kolom dengan kardinalitas rendah (misal: Jenis Kelamin, isinya cuma L/P. Index tidak efektif).

## 4. Analisis Query (EXPLAIN)
Sebelum komplain server lambat, cek query Anda.

\`\`\`sql
EXPLAIN SELECT * FROM users WHERE email = 'zaki@mail.com';
\`\`\`
Lihat kolom **type** dan **rows**. Jika type = \`ALL\`, artinya Full Table Scan (Bahaya!). Jika type = \`ref\` atau \`const\`, artinya Index terpakai (Bagus).

## 🎯 Outcome Modul
- Mengerti *trade-off* index (Baca cepat, Tulis agak lambat).
- Bisa membaca output \`EXPLAIN\` untuk debugging query lambat.
`,
    level: 'advanced',
    order: 6,
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: 'sql-07',
    user_type: 'student',
    language: 'sql',
    title: 'Final Project: Full Stack Database Integration',
    description: 'Stored Procedures, Views, Security, dan Integrasi Aplikasi.',
    content: `# Expert Level & Integrasi

## 1. Views (Tabel Virtual)
Menyederhanakan query kompleks atau menyembunyikan kolom sensitif.
\`\`\`sql
CREATE VIEW laporan_penjualan AS
SELECT o.id, u.nama, o.total, o.created_at
FROM orders o
JOIN users u ON o.user_id = u.id;

-- Cara pakai (seolah-olah tabel biasa)
SELECT * FROM laporan_penjualan WHERE total > 100000;
\`\`\`

## 2. Stored Procedures
Menyimpan logika pemrograman (IF, LOOP) langsung di database.
\`\`\`sql
DELIMITER //
CREATE PROCEDURE GetCustomerLevel(IN userId INT, OUT lvl VARCHAR(20))
BEGIN
    DECLARE totalBelanja DECIMAL(10,2);
    SELECT SUM(total) INTO totalBelanja FROM orders WHERE user_id = userId;
    
    IF totalBelanja > 1000000 THEN
        SET lvl = 'VIP';
    ELSE
        SET lvl = 'REGULAR';
    END IF;
END //
DELIMITER ;
\`\`\`

## 3. Keamanan (SQL Injection)
Jangan pernah menggabungkan string query secara manual di aplikasi!
\`\`\`python
# BAHAYA (SQL Injection)
query = "SELECT * FROM users WHERE nama = '" + input_user + "'"

# AMAN (Prepared Statement / Parameterized Query)
cursor.execute("SELECT * FROM users WHERE nama = %s", (input_user,))
\`\`\`

## 🏆 Final Project Requirements
Buatlah Database untuk **Sistem Perpustakaan Kampus**:
1.  **Tabel:** \`mahasiswa\`, \`buku\`, \`peminjaman\`.
2.  **Relasi:** One-to-Many (Mhs -> Peminjaman), Many-to-Many tidak langsung (Peminjaman -> Detail -> Buku).
3.  **Fitur:** - Trigger: Saat buku dipinjam, stok buku berkurang otomatis.
    - View: \`buku_terlaris\` (buku paling sering dipinjam).
    - Transaction: Prosedur peminjaman buku.
4.  **Indexing:** Index pada kolom \`judul_buku\` dan \`nama_mahasiswa\`.

## Outcome Modul
- Siap menjadi **Database Administrator** atau **Backend Engineer**.
- Memahami keamanan database tingkat lanjut.
`,
    level: 'advanced',
    order: 7,
    created_at: '2025-01-01T00:00:00Z'
  },
];