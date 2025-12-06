import type { LearningMaterial } from '../types/learning';

export const MOCK_MATERIALS: LearningMaterial[] = [
  // ==================== MYSQL MATERIALS ====================
  {
    id: 'sql-01',
    user_type: 'student',
    language: 'sql',
    title: 'Pengenalan Database & Arsitektur MySQL',
    description: 'Konsep RDBMS, Storage Engine (InnoDB vs MyISAM), dan Tools.',
    content: `# 🐬 Pengenalan MySQL & RDBMS

## Apa itu RDBMS?
**Relational Database Management System** adalah sistem penyimpanan data berbentuk **Tabel** yang saling berhubungan.
MySQL adalah RDBMS paling populer di dunia web development.

**Hierarki Data:**
1.  **Database:** Wadah besar (misal: \`toko_online\`).
2.  **Table:** Kumpulan data sejenis (misal: \`users\`, \`products\`).
3.  **Column (Field):** Atribut (misal: \`email\`, \`harga\`).
4.  **Row (Record):** Satu baris data.

---

## 🏗️ Storage Engine: InnoDB vs MyISAM
Saat membuat tabel, Anda memilih "mesin" penyimpanannya.
1.  **InnoDB (Default & Wajib):**
    * Mendukung **Transactions (ACID)**.
    * Mendukung **Foreign Keys** (Relasi).
    * Aman jika mati lampu (Crash recovery).
2.  **MyISAM (Jadul):**
    * Cepat untuk baca, tapi rawan korup.
    * Tidak mendukung transaksi.
    * *Hindari penggunaan MyISAM di aplikasi modern.*

## 💻 Sintaks Dasar
\`\`\`sql
-- Melihat daftar database
SHOW DATABASES;

-- Membuat & Memilih Database
CREATE DATABASE latihan_sql;
USE latihan_sql;

-- Melihat tabel yang ada
SHOW TABLES;
\`\`\`

## 🎯 Outcome Modul
- Memahami kenapa **InnoDB** adalah standar industri.
- Bisa membuat database baru via query.
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
    description: 'Memilih tipe data yang tepat (DECIMAL vs FLOAT), Primary Key, dan Constraints.',
    content: `# Data Definition Language (DDL)

Desain tabel yang buruk akan membuat aplikasi lambat selamanya.

## 1. Tipe Data Krusial
| Kategori | Tipe | Penggunaan | Kapan Dipakai? |
|:---|:---|:---|:---|
| **Angka** | \`INT\` | Bilangan bulat | ID, Stok, Umur. |
| | \`BIGINT\` | Angka besar | ID Transaksi (Milyaran). |
| | \`DECIMAL(M,D)\` | Desimal Presisi | **UANG/GAJI** (Jangan pakai Float!). |
| **Teks** | \`VARCHAR(n)\` | Variabel | Nama, Email (Hemat memori). |
| | \`CHAR(n)\` | Tetap | Kode Pos, Kode Negara (ID, US). |
| | \`TEXT\` | Panjang | Artikel, Deskripsi. |
| **Waktu** | \`TIMESTAMP\` | Waktu UTC | Log aktivitas (created_at). |

## 2. Membuat Tabel (Create Table)
\`\`\`sql
CREATE TABLE karyawan (
    id INT AUTO_INCREMENT PRIMARY KEY, -- Unik & Otomatis nambah
    nik CHAR(10) UNIQUE NOT NULL,      -- Tidak boleh kembar & kosong
    nama VARCHAR(100) NOT NULL,
    gaji DECIMAL(15, 2) DEFAULT 0,     -- Default 0 jika tidak diisi
    status ENUM('Tetap', 'Kontrak'),   -- Pilihan terbatas
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
\`\`\`

## 3. Alter Table (Revisi Struktur)
\`\`\`sql
-- Tambah kolom baru
ALTER TABLE karyawan ADD COLUMN no_hp VARCHAR(15);

-- Ubah tipe data
ALTER TABLE karyawan MODIFY COLUMN nama VARCHAR(150);
\`\`\`

## 🎯 Outcome Modul
- Tahu bahaya menggunakan FLOAT untuk uang (gunakan DECIMAL).
- Mengerti fungsi \`PRIMARY KEY\` dan \`UNIQUE\`.
`,
    level: 'beginner',
    order: 2,
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: 'sql-03',
    user_type: 'student',
    language: 'sql',
    title: 'DML: Manipulasi Data (CRUD)',
    description: 'Insert, Select, Update (Safe Mode), dan Soft Delete.',
    content: `# Data Manipulation Language (DML)

## 1. INSERT (Menambah Data)
\`\`\`sql
-- Single Insert
INSERT INTO karyawan (nik, nama, gaji, status) 
VALUES ('1234567890', 'Budi', 5000000, 'Tetap');

-- Bulk Insert (Lebih Cepat)
INSERT INTO karyawan (nik, nama, gaji, status) VALUES 
('111', 'Siti', 4500000, 'Kontrak'),
('222', 'Rudi', 6000000, 'Tetap');
\`\`\`

## 2. SELECT (Mengambil Data)
\`\`\`sql
-- Filter (WHERE) & Sort (ORDER BY)
SELECT nama, gaji FROM karyawan 
WHERE status = 'Tetap' AND gaji > 5000000
ORDER BY gaji DESC; -- Gaji tertinggi di atas

-- Pagination (LIMIT & OFFSET)
SELECT * FROM karyawan LIMIT 10 OFFSET 0;
\`\`\`

## 3. UPDATE & DELETE (Bahaya!)
⚠️ **Wajib pakai WHERE!** Jika lupa, semua data akan berubah/hilang.

\`\`\`sql
-- Update Gaji Rudi
UPDATE karyawan 
SET gaji = 6500000 
WHERE nama = 'Rudi';

-- Delete (Hapus Permanen)
DELETE FROM karyawan WHERE id = 1;
\`\`\`

> **Soft Delete (Best Practice):**
> Di industri, data jarang dihapus fisik. Kita pakai flag.
> \`UPDATE karyawan SET is_deleted = 1 WHERE id = 1;\`

## 🎯 Outcome Modul
- Bisa CRUD dasar.
- Selalu ingat bahaya Update tanpa Where.
`,
    level: 'intermediate',
    order: 3,
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: 'sql-04',
    user_type: 'student',
    language: 'sql',
    title: 'Relasi Tabel & JOIN Operations',
    description: 'Foreign Key, Inner vs Left Join, dan Group By.',
    content: `# JOIN & Relasi

## 1. Foreign Key (Kunci Tamu)
Menghubungkan tabel anak ke tabel induk.
Misal: \`orders\` milik \`users\`.

\`\`\`sql
CREATE TABLE orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT, 
    total DECIMAL(10,2),
    -- Membuat aturan relasi
    FOREIGN KEY (user_id) REFERENCES karyawan(id) ON DELETE CASCADE
);
\`\`\`

## 2. Jenis JOIN 

[Image of SQL Joins Venn Diagram]


### INNER JOIN (Irisan)
Hanya menampilkan data yang punya pasangan di kedua tabel.
\`\`\`sql
SELECT k.nama, o.total 
FROM karyawan k
INNER JOIN orders o ON k.id = o.user_id;
-- Karyawan yang belum pernah order TIDAK MUNCUL.
\`\`\`

### LEFT JOIN (Semua Kiri)
Menampilkan semua Karyawan, walau belum punya order (order akan NULL).
\`\`\`sql
SELECT k.nama, o.total 
FROM karyawan k
LEFT JOIN orders o ON k.id = o.user_id;
-- Berguna untuk mencari "Siapa yang belum pernah beli?"
\`\`\`

## 3. Agregasi (Group By)
Menghitung total per kelompok.
\`\`\`sql
SELECT user_id, SUM(total) as total_belanja
FROM orders
GROUP BY user_id;
\`\`\`

## 🎯 Outcome Modul
- Tidak tertukar antara Inner dan Left Join.
- Bisa membuat laporan rekapitulasi dengan \`SUM\` dan \`GROUP BY\`.
`,
    level: 'intermediate',
    order: 4,
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: 'sql-05',
    user_type: 'student',
    language: 'sql',
    title: 'Advanced: Transaction (ACID) & Normalization',
    description: 'Menjamin konsistensi data transaksi keuangan dan teori normalisasi.',
    content: `# Integritas Data

## 1. Transaction (ACID)
Bayangkan transfer uang: Saldo A berkurang, Saldo B bertambah.
Jika mati lampu di tengah jalan, uang A hilang tapi B tidak nambah.
Solusi: **Transaction**.

\`\`\`sql
START TRANSACTION;

UPDATE rekening SET saldo = saldo - 50000 WHERE id = 1; -- A
-- Jika error di sini, lakukan ROLLBACK

UPDATE rekening SET saldo = saldo + 50000 WHERE id = 2; -- B

COMMIT; -- Simpan permanen jika keduanya sukses.
\`\`\`

## 2. Normalisasi
Teknik memecah tabel agar tidak ada data duplikat (Redundansi).
* **1NF:** Satu kolom satu nilai (Jangan: Hobi = "Bola, Renang").
* **2NF & 3NF:** Pisahkan data yang tidak berhubungan langsung dengan Primary Key ke tabel lain (Master Data).

## 🎯 Outcome Modul
- Wajib pakai Transaction untuk fitur keuangan.
- Mengerti kenapa tabel harus dipecah-pecah (Normalisasi).
`,
    level: 'advanced',
    order: 5,
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: 'sql-06',
    user_type: 'student',
    language: 'sql',
    title: 'Performance Tuning: Indexing',
    description: 'Cara kerja B-Tree Index, Explain Analyze, dan optimasi query lambat.',
    content: `# Optimasi Performa

Kenapa query bisa lambat? Biasanya karena **Full Table Scan**.

## 1. Indexing
Index seperti "Daftar Isi" di buku. Tanpa index, MySQL baca halaman 1 sampai akhir. Dengan index, langsung lompat ke halaman tujuan.

\`\`\`sql
-- Membuat index pada kolom email agar login cepat
CREATE INDEX idx_email ON karyawan(email);
\`\`\`

## 2. EXPLAIN (Alat Debugging)
Sebelum menyalahkan server, cek query Anda.
\`\`\`sql
EXPLAIN SELECT * FROM karyawan WHERE email = 'budi@mail.com';
\`\`\`
* Lihat kolom **type**:
    * \`ALL\` = Buruk (Baca semua data).
    * \`const\` / \`ref\` = Bagus (Pakai Index).

## 3. Trade-off
* **Index mempercepat SELECT.**
* **Index memperlambat INSERT/UPDATE** (karena harus update daftar isi juga).
* *Jangan meng-index semua kolom!*

## 🎯 Outcome Modul
- Bisa membaca output \`EXPLAIN\`.
- Tahu kolom mana yang perlu di-index (biasanya yang ada di WHERE/JOIN).
`,
    level: 'advanced',
    order: 6,
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: 'sql-07',
    user_type: 'student',
    language: 'sql',
    title: 'Programmable SQL: Views & Stored Procedures',
    description: 'Memindahkan logika bisnis ke database.',
    content: `# Fitur Lanjutan

## 1. Views (Tabel Virtual)
Menyimpan query kompleks agar mudah dipanggil ulang.

\`\`\`sql
CREATE VIEW laporan_gaji AS
SELECT k.nama, k.status, SUM(o.total) as total_omzet
FROM karyawan k
JOIN orders o ON k.id = o.user_id
GROUP BY k.id;

-- Cara pakai
SELECT * FROM laporan_gaji WHERE total_omzet > 1000000;
\`\`\`

## 2. Stored Procedures
Fungsi yang disimpan di database.

\`\`\`sql
DELIMITER //
CREATE PROCEDURE NaikGaji(IN persentase INT)
BEGIN
    UPDATE karyawan SET gaji = gaji + (gaji * persentase / 100);
END //
DELIMITER ;

-- Panggil
CALL NaikGaji(10);
\`\`\`

## 🎯 Outcome Modul
- Bisa menyederhanakan query panjang menjadi View.
- Mengerti konsep Stored Procedure.
`,
    level: 'advanced',
    order: 7,
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: 'sql-08',
    user_type: 'student',
    language: 'sql',
    title: 'Admin & Security',
    description: 'Manajemen User, Hak Akses (GRANT), dan Backup.',
    content: `# Database Administration

Jangan gunakan user \`root\` untuk aplikasi!

## 1. Membuat User Khusus
\`\`\`sql
CREATE USER 'app_user'@'localhost' IDENTIFIED BY 'password_rahasia';
\`\`\`

## 2. Grant Privileges (Hak Akses)
Berikan akses secukupnya (*Least Privilege Principle*).

\`\`\`sql
-- Hanya boleh baca dan tulis di db_toko
GRANT SELECT, INSERT, UPDATE, DELETE ON db_toko.* TO 'app_user'@'localhost';

-- FLUSH agar efeknya jalan
FLUSH PRIVILEGES;
\`\`\`

## 3. Backup (Dump)
Perintah terminal (bukan SQL console).
\`\`\`bash
mysqldump -u root -p db_toko > backup_toko.sql
\`\`\`

## 🎯 Outcome Modul
- Mampu mengamankan database dengan user terpisah.
- Bisa melakukan backup data.
`,
    level: 'advanced',
    order: 8,
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: 'sql-09',
    user_type: 'student',
    language: 'sql',
    title: 'Studi Kasus 1: Laporan Penjualan E-Commerce',
    description: 'Latihan mendesain tabel relasional, insert data dummy, dan query report kompleks.',
    content: `# Studi Kasus 1: E-Commerce Report

## 📜 Skenario
Buat skema database sederhana untuk Toko Online:
1.  **Users:** (id, nama, kota).
2.  **Products:** (id, nama_barang, kategori, harga).
3.  **Orders:** (id, user_id, tanggal).
4.  **OrderDetails:** (order_id, product_id, qty).

**Tugas:** Tampilkan laporan "Siapa user yang belanja paling banyak (secara nominal Rupiah)?"

## 💻 Solusi Code (Query)
\`\`\`sql
-- 1. Insert Data Dummy (Pastikan tabel sudah dibuat)
INSERT INTO users (nama, kota) VALUES ('Ali', 'Jakarta'), ('Budi', 'Surabaya');
INSERT INTO products (nama_barang, harga) VALUES ('Laptop', 5000000), ('Mouse', 100000);

-- Ali beli Laptop (1) dan Mouse (2)
INSERT INTO orders (id, user_id) VALUES (101, 1); 
INSERT INTO order_details VALUES (101, 1, 1), (101, 2, 2); -- 1 Laptop, 2 Mouse

-- Budi beli Mouse (5)
INSERT INTO orders (id, user_id) VALUES (102, 2);
INSERT INTO order_details VALUES (102, 2, 5); 

-- 2. Query Laporan Kompleks
SELECT 
    u.nama, 
    u.kota,
    SUM(p.harga * od.qty) as total_belanja
FROM users u
JOIN orders o ON u.id = o.user_id
JOIN order_details od ON o.id = od.order_id
JOIN products p ON od.product_id = p.id
GROUP BY u.id
ORDER BY total_belanja DESC;
\`\`\`

## ✅ Hasil yang Diharapkan
\`\`\`text
+------+----------+---------------+
| nama | kota     | total_belanja |
+------+----------+---------------+
| Ali  | Jakarta  | 5200000.00    |
| Budi | Surabaya | 500000.00     |
+------+----------+---------------+
*Penjelasan: Ali belanja 5jt + (100rb x 2) = 5.2jt.*
\`\`\`
`,
    level: 'advanced',
    order: 9,
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: 'sql-10',
    user_type: 'student',
    language: 'sql',
    title: 'Studi Kasus 2: Sistem Stok Otomatis (Trigger)',
    description: 'Menggunakan Database Trigger untuk otomatisasi pengurangan stok.',
    content: `# Studi Kasus 2: Automasi Stok

## 📜 Skenario
Anda ingin agar setiap kali ada penjualan di tabel \`penjualan\`, stok di tabel \`barang\` **berkurang otomatis** tanpa perlu coding di PHP/Backend.
Gunakan fitur **Trigger**.

## 💻 Solusi Code
\`\`\`sql
-- 1. Persiapan Tabel
CREATE TABLE barang (
    id INT PRIMARY KEY,
    nama VARCHAR(50),
    stok INT
);

CREATE TABLE penjualan (
    id INT AUTO_INCREMENT PRIMARY KEY,
    barang_id INT,
    qty INT
);

INSERT INTO barang VALUES (1, 'Kopi Susu', 100);

-- 2. Membuat Trigger
DELIMITER //
CREATE TRIGGER kurangi_stok
AFTER INSERT ON penjualan
FOR EACH ROW
BEGIN
    -- Kurangi stok barang sesuai qty yang dijual
    UPDATE barang 
    SET stok = stok - NEW.qty
    WHERE id = NEW.barang_id;
END //
DELIMITER ;

-- 3. Simulasi Transaksi
INSERT INTO penjualan (barang_id, qty) VALUES (1, 5);
INSERT INTO penjualan (barang_id, qty) VALUES (1, 10);
\`\`\`

## ✅ Hasil yang Diharapkan
Saat kita cek tabel barang, stok harusnya berkurang 15 (dari 100 jadi 85).

\`\`\`sql
SELECT * FROM barang;
\`\`\`

**Output:**
\`\`\`text
+----+-----------+------+
| id | nama      | stok |
+----+-----------+------+
|  1 | Kopi Susu |   85 |
+----+-----------+------+
\`\`\`
`,
    level: 'advanced',
    order: 10,
    created_at: '2025-01-01T00:00:00Z'
  },
];