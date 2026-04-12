import { LearningMaterial } from '../types/learning';

export const MOCK_MATERIALS: LearningMaterial[] = [
  // ==================== MYSQL CORE & DDL ====================
  {
    id: 'mysql-01',
    user_type: 'student',
    language: 'mysql',
    title: 'Pengenalan RDBMS & Data Definition Language (DDL)',
    description: 'Konsep Database Relasional, Tipe Data MySQL, dan perintah CREATE, ALTER, DROP.',
    content: `# 🐬 Modul 1: RDBMS & DDL Dasar

MySQL adalah sebuah **Relational Database Management System (RDBMS)**. Artinya, data disimpan dalam bentuk tabel (baris & kolom) yang saling berelasi.

## 1. Tipe Data Esensial di MySQL
Sebelum membuat tabel, kamu wajib tahu tipe data yang tepat agar hemat memori:
- **INT / BIGINT:** Angka bulat (ID, Stok).
- **VARCHAR(n):** Teks dengan batas maksimal (Nama, Email, Password Hash).
- **TEXT:** Teks panjang tak terbatas (Artikel, Deskripsi).
- **DECIMAL(m, d):** Angka desimal presisi tinggi untuk UANG (Harga, Saldo).
- **DATETIME / TIMESTAMP:** Waktu dan tanggal.

## 2. DDL (Data Definition Language)
DDL adalah bahasa SQL untuk **mendefinisikan kerangka** database, bukan isinya.

\`\`\`sql
-- 1. Membuat Database
CREATE DATABASE IF NOT EXISTS e_commerce;
USE e_commerce;

-- 2. Membuat Tabel Utama
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3. Memodifikasi Tabel yang sudah ada (ALTER)
ALTER TABLE users ADD COLUMN phone_number VARCHAR(15) AFTER email;

-- 4. Menghapus Tabel (Hati-hati!)
-- DROP TABLE users;
\`\`\`

---

## 📝 Quiz Singkat
1. Apa perbedaan \`VARCHAR(50)\` dengan \`TEXT\`?
2. Kapan waktu yang tepat menggunakan tipe data \`DECIMAL\` dibandingkan \`FLOAT\`?

## ✍️ Latihan (15 Menit)
1. Buat database \`sekolah\`.
2. Buat tabel \`siswa\` dengan kolom: \`nisn\` (VARCHAR, Primary Key), \`nama_lengkap\` (VARCHAR), \`tanggal_lahir\` (DATE).
`,
    level: 'beginner',
    order: 1,
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: 'mysql-02',
    user_type: 'student',
    language: 'mysql',
    title: 'Data Manipulation Language (DML): CRUD Dasar',
    description: 'Menyisipkan (INSERT), membaca (SELECT), mengubah (UPDATE), dan menghapus (DELETE) baris data.',
    content: `# 📝 Modul 2: DML (CRUD Operations)

DML digunakan untuk memanipulasi **ISI** dari tabel.

## 1. INSERT (Create)
Menambahkan baris baru ke dalam tabel.

\`\`\`sql
-- Menambah satu baris
INSERT INTO users (username, email, phone_number) 
VALUES ('budi_dev', 'budi@mail.com', '0812345678');

-- Menambah banyak baris sekaligus (Bulk Insert - Jauh lebih cepat!)
INSERT INTO users (username, email) VALUES 
('siska_it', 'siska@mail.com'),
('andi_ops', 'andi@mail.com');
\`\`\`

---

## 2. SELECT (Read)
Menarik data dari tabel. Jangan biasakan pakai \`SELECT *\` di *production* jika tabelnya sangat lebar, panggil nama kolomnya secara spesifik.

\`\`\`sql
-- Bad practice jika tabel punya 50 kolom
SELECT * FROM users; 

-- Best practice
SELECT id, username, email FROM users;
\`\`\`

---

## 3. UPDATE & DELETE (Wajib pakai WHERE!)
**🚨 PERINGATAN:** Jika kamu menjalankan \`UPDATE\` atau \`DELETE\` tanpa klausa \`WHERE\`, **SELURUH DATA DI TABEL AKAN BERUBAH/TERHAPUS!**

\`\`\`sql
-- Mengubah nomor HP milik Budi (ID = 1)
UPDATE users 
SET phone_number = '089999999', is_active = FALSE 
WHERE id = 1;

-- Menghapus Andi dari sistem
DELETE FROM users WHERE username = 'andi_ops';
\`\`\`

## ✍️ Latihan (15 Menit)
1. Masukkan 3 data *dummy* ke tabel \`siswa\` yang kamu buat di Modul 1.
2. Lakukan \`UPDATE\` untuk mengganti nama salah satu siswa berdasarkan \`nisn\`-nya.
`,
    level: 'beginner',
    order: 2,
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: 'mysql-03',
    user_type: 'student',
    language: 'mysql',
    title: 'Filtering, Sorting & Pagination',
    description: 'Mencari spesifik data menggunakan WHERE, LIKE, IN, BETWEEN, ORDER BY, dan LIMIT.',
    content: `# 🔍 Modul 3: Filtering & Pagination

Data di industri bisa jutaan baris. Kamu harus bisa memfilternya dengan presisi.

## 1. WHERE & Operator Logika
\`\`\`sql
-- Mencari yang harganya di atas 50rb DAN stoknya kurang dari 10
SELECT nama_produk, harga, stok 
FROM products 
WHERE harga > 50000 AND stok < 10;

-- IN (Sama seperti rentetan OR yang panjang)
SELECT * FROM orders 
WHERE status IN ('Pending', 'Processing', 'Failed');

-- BETWEEN (Rentang angka atau tanggal)
SELECT * FROM orders 
WHERE created_at BETWEEN '2025-01-01' AND '2025-01-31';
\`\`\`

---

## 2. LIKE (Pencarian String)
- \`%\` mewakili jumlah karakter tak terbatas.
- \`_\` mewakili tepat satu karakter.

\`\`\`sql
-- Mencari email yang berakhiran '@gmail.com'
SELECT * FROM users WHERE email LIKE '%@gmail.com';

-- Mencari username yang huruf keduanya adalah 'A' (M[a]ngga, B[a]nana)
SELECT * FROM users WHERE username LIKE '_a%';
\`\`\`

---

## 3. ORDER BY & LIMIT (Dasar Pagination Web)
\`\`\`sql
-- Mengurutkan dari harga termahal ke termurah (DESCending), batasi 10 data
SELECT * FROM products 
ORDER BY harga DESC 
LIMIT 10;

-- PAGINATION: Ambil 10 data, tapi lewati (OFFSET) 20 data pertama (Ini adalah Halaman ke-3)
SELECT * FROM products 
ORDER BY id ASC 
LIMIT 10 OFFSET 20;
\`\`\`

## ✍️ Latihan (20 Menit)
1. Buat *query* untuk mencari 5 pelanggan terakhir yang mendaftar bulan ini, urutkan berdasarkan tanggal daftar dari yang paling baru.
`,
    level: 'intermediate',
    order: 3,
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: 'mysql-04',
    user_type: 'student',
    language: 'mysql',
    title: 'Aggregate Functions & GROUP BY',
    description: 'Menghitung statistik (SUM, AVG, COUNT) dan menggunakan HAVING untuk memfilter hasil grup.',
    content: `# 📊 Modul 4: Agregasi & Statistik

Fungsi agregasi mengubah banyak baris menjadi satu nilai statistik.

## 1. Fungsi Bawaan (COUNT, SUM, AVG, MAX, MIN)
\`\`\`sql
-- Berapa total seluruh pendapatan toko?
SELECT SUM(total_tagihan) AS total_omzet FROM orders WHERE status = 'Lunas';

-- Berapa harga produk paling murah dan paling mahal?
SELECT MIN(harga) AS harga_termurah, MAX(harga) AS harga_termahal FROM products;

-- Berapa jumlah user aktif?
SELECT COUNT(id) AS jumlah_user FROM users WHERE is_active = TRUE;
\`\`\`

---

## 2. GROUP BY (Mengelompokkan Data)
Bagaimana jika kita ingin melihat *total omzet PER bulan* atau *jumlah produk PER kategori*? Gunakan \`GROUP BY\`.

\`\`\`sql
-- Menghitung jumlah produk di masing-masing kategori
SELECT kategori, COUNT(*) AS jumlah_item 
FROM products 
GROUP BY kategori;
\`\`\`

---

## 3. HAVING (Filter untuk GROUP BY)
Klausa \`WHERE\` memfilter *sebelum* dikelompokkan. Jika kamu ingin memfilter data *setelah* hasil kelompok itu dihitung, gunakan \`HAVING\`.

\`\`\`sql
-- Tampilkan kategori yang memiliki LEBIH DARI 50 produk
SELECT kategori, COUNT(*) AS jumlah_item 
FROM products 
GROUP BY kategori 
HAVING jumlah_item > 50;
\`\`\`

## ✍️ Latihan (20 Menit)
Tulis *query* SQL untuk menghitung *rata-rata gaji* (kolom: \`gaji\`) dari tabel \`karyawan\`, dikelompokkan berdasarkan \`departemen\`, tapi hanya tampilkan departemen yang rata-rata gajinya di atas Rp 10.000.000!
`,
    level: 'intermediate',
    order: 4,
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: 'mysql-05',
    user_type: 'student',
    language: 'mysql',
    title: 'Relasi Tabel Lanjut & Foreign Keys',
    description: 'Menjaga integritas data (Referential Integrity) menggunakan constraints.',
    content: `# 🔗 Modul 5: Foreign Keys & Integrity

Database yang baik tidak mengizinkan "Data Yatim Piatu" (*Orphan Data*). 
Misal: Kamu menghapus user A, tapi pesanan/tagihan user A masih tertinggal di database. Ini merusak integritas!

## Membuat Foreign Key dengan Constraints

\`\`\`sql
CREATE TABLE orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    total DECIMAL(10,2),
    -- Menjadikan user_id sebagai Foreign Key yang menunjuk ke tabel users
    CONSTRAINT fk_user_order 
    FOREIGN KEY (user_id) REFERENCES users(id)
    -- Jika user dihapus, apa yang terjadi pada pesanan ini?
    ON DELETE CASCADE  
    ON UPDATE CASCADE
);
\`\`\`

### Aturan ON DELETE:
1. **CASCADE:** Ikut terhapus. (Cocok untuk: Hapus User -> Postingannya terhapus).
2. **RESTRICT / NO ACTION:** Menolak penghapusan User jika dia masih punya Pesanan. (Sangat aman!).
3. **SET NULL:** User dihapus, kolom \`user_id\` di pesanan berubah jadi \`NULL\` (Sejarah pesanan tetap ada sebagai *Guest*).

## ✍️ Latihan (20 Menit)
Jika kamu membuat tabel \`comments\` yang berelasi ke tabel \`posts\`, aturan \`ON DELETE\` apa yang paling logis untuk diterapkan? Buat sintaks \`CREATE TABLE\`-nya!
`,
    level: 'intermediate',
    order: 5,
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: 'mysql-06',
    user_type: 'student',
    language: 'mysql',
    title: 'Mastering SQL JOINs',
    description: 'INNER JOIN, LEFT JOIN, RIGHT JOIN, dan seni menggabungkan tabel tanpa merusak data.',
    content: `# 🤝 Modul 6: Mastering JOINs

Karena data kita sudah terpisah di berbagai tabel berkat *Foreign Keys*, kita butuh \`JOIN\` untuk menyatukannya kembali saat ingin dibaca oleh *User*.

## 1. INNER JOIN (Irisan Pasti)
Hanya menampilkan baris yang memiliki pasangan di **KEDUA** tabel.

\`\`\`sql
-- Menampilkan nama siswa dan kelasnya. 
-- Jika ada siswa yang belum punya kelas, dia TIDAK AKAN TAMPIL.
SELECT siswa.nama, kelas.nama_kelas 
FROM siswa
INNER JOIN kelas ON siswa.kelas_id = kelas.id;
\`\`\`

## 2. LEFT JOIN (Amankan Kiri)
Semua baris di tabel KIRI (tabel pertama yang disebut) PASTI TAMPIL. Jika tidak punya pasangan di kanan, nilainya jadi \`NULL\`.

\`\`\`sql
-- Menampilkan SEMUA siswa. 
-- Jika dia tidak punya kelas, nama_kelas akan berisi NULL.
SELECT siswa.nama, kelas.nama_kelas 
FROM siswa
LEFT JOIN kelas ON siswa.kelas_id = kelas.id;
\`\`\`

## 3. RIGHT JOIN (Jarang Dipakai)
Kebalikan dari *Left Join*. Semua kelas pasti tampil, meskipun kelas itu kosong (tidak ada siswanya).

## 4. Multi-Table JOIN
Kamu bisa nge-JOIN 3-4 tabel sekaligus!

\`\`\`sql
SELECT orders.id, users.username, products.nama, order_items.qty
FROM orders
JOIN users ON orders.user_id = users.id
JOIN order_items ON order_items.order_id = orders.id
JOIN products ON order_items.product_id = products.id;
\`\`\`

## 📝 Quiz Singkat
Jika kamu ingin membuat laporan "Daftar User yang TIDAK PERNAH belanja sama sekali", *JOIN* apa yang kamu gunakan dan apa kondisi *WHERE*-nya? (*Hint: Gunakan LEFT JOIN dan periksa NULL*).
`,
    level: 'advanced',
    order: 6,
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: 'mysql-07',
    user_type: 'student',
    language: 'mysql',
    title: 'Subqueries & Common Table Expressions (CTE)',
    description: 'Query di dalam Query. Menyederhanakan kompleksitas dengan WITH clause.',
    content: `# 🧅 Modul 7: Subqueries & CTE

Kadang, satu *query* saja tidak cukup untuk mendapatkan jawaban.

## 1. Subquery (Query di dalam Query)
Mencari data berdasarkan hasil dari proses pencarian lain.

\`\`\`sql
-- Siapa saja karyawan yang gajinya DI ATAS rata-rata perusahaan?
SELECT nama, gaji 
FROM karyawan 
WHERE gaji > (SELECT AVG(gaji) FROM karyawan);
\`\`\`
*(Subquery dieksekusi lebih dulu, misal hasilnya 8.000.000, lalu query utama berjalan).*

---

## 2. CTE (Common Table Expression) - Modern SQL
*Subqueries* yang bertingkat-tingkat sangat sulit dibaca (*Spaghetti SQL*). CTE (menggunakan kata kunci \`WITH\`) membuat tabel *temporary* di memori yang sangat mudah dibaca dari atas ke bawah.

\`\`\`sql
-- Menghitung total belanja masing-masing user, lalu cari siapa saja yang total belanjanya masuk kelas "VIP" (> 10 juta)

WITH TotalBelanjaUser AS (
    SELECT user_id, SUM(total_tagihan) as grand_total
    FROM orders
    GROUP BY user_id
)
-- Panggil CTE seperti tabel biasa!
SELECT users.username, TotalBelanjaUser.grand_total 
FROM TotalBelanjaUser
JOIN users ON TotalBelanjaUser.user_id = users.id
WHERE TotalBelanjaUser.grand_total > 10000000;
\`\`\`

## ✍️ Latihan (30 Menit)
Buatlah sebuah *CTE* bernama \`PenjualanBulanIni\` yang merangkum omzet toko, lalu di *query* utamanya panggil CTE tersebut untuk mencari omzet dari karyawan ber-ID spesifik.
`,
    level: 'advanced',
    order: 7,
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: 'mysql-08',
    user_type: 'student',
    language: 'mysql',
    title: 'Built-in Functions (String, Date & Math)',
    description: 'Memanipulasi output data langsung di level database sebelum dikirim ke backend.',
    content: `# 🛠️ Modul 8: String, Date & Math Functions

Memanipulasi format di level Database (MySQL) seringkali lebih efisien daripada memanipulasinya di level Backend (PHP/JS).

## 1. String Functions
\`\`\`sql
-- CONCAT: Menggabungkan teks
SELECT CONCAT(first_name, ' ', last_name) AS full_name FROM users;

-- UPPER & LOWER: Kapitalisasi
SELECT UPPER(kategori) FROM products;

-- COALESCE: Mengganti NULL dengan nilai default (Sangat Berguna!)
SELECT nama, COALESCE(no_telepon, 'Belum Mengisi HP') AS kontak FROM users;
\`\`\`

## 2. Date/Time Functions
Sangat vital untuk membuat laporan periode waktu!

\`\`\`sql
-- Mengekstrak bagian dari waktu
SELECT nama, YEAR(created_at) AS tahun_daftar, MONTHNAME(created_at) AS bulan FROM users;

-- Menghitung selisih waktu (DATEDIFF)
-- Tampilkan order yang belum dibayar dan sudah lewat dari 3 hari!
SELECT * FROM orders 
WHERE status = 'Pending' 
AND DATEDIFF(NOW(), created_at) > 3;

-- FORMAT TANGGAL
SELECT DATE_FORMAT(created_at, '%d %M %Y') AS format_indo FROM orders;
\`\`\`

## 3. Math & Control Flow (CASE WHEN)
Membuat logika \`if-else\` langsung di dalam SQL!

\`\`\`sql
SELECT nama_produk, stok,
    CASE 
        WHEN stok = 0 THEN 'Habis'
        WHEN stok < 10 THEN 'Hampir Habis'
        ELSE 'Aman'
    END AS status_stok
FROM products;
\`\`\`
`,
    level: 'advanced',
    order: 8,
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: 'mysql-09',
    user_type: 'student',
    language: 'mysql',
    title: 'Views & Virtual Tables',
    description: 'Menyimpan query raksasa sebagai "tabel virtual" untuk menyederhanakan kode backend.',
    content: `# 👁️ Modul 9: MySQL Views

Pernahkah kamu menulis *query JOIN* yang panjangnya 20 baris? 
Daripada menaruh *query* mengerikan itu di kode *Backend* (PHP/Node.js) berulang kali, simpan saja di MySQL sebagai **VIEW**!

*View* adalah "Tabel Virtual". Dia tidak menyimpan data fisik, dia hanya menyimpan *Query*. Saat dipanggil, dia mengeksekusi *query* tersebut secara *real-time*.

## Membuat View

\`\`\`sql
CREATE VIEW v_laporan_penjualan_lengkap AS
SELECT 
    orders.id AS invoice_id,
    users.username AS nama_pembeli,
    products.nama AS barang_dibeli,
    order_items.qty,
    (order_items.qty * order_items.harga_saat_beli) AS subtotal,
    orders.created_at AS tanggal_transaksi
FROM orders
JOIN users ON orders.user_id = users.id
JOIN order_items ON order_items.order_id = orders.id
JOIN products ON order_items.product_id = products.id;
\`\`\`

## Cara Memakainya di Backend
Sangat ajaib! Di bahasa pemrogramanmu, kamu cukup memanggil *View* ini seolah-olah dia adalah tabel biasa yang datanya sudah sangat rapi!

\`\`\`sql
-- Di backend (PHP/JS), query-nya jadi SANGAT BERSIH:
SELECT * FROM v_laporan_penjualan_lengkap 
WHERE nama_pembeli = 'budi_dev'
ORDER BY tanggal_transaksi DESC;
\`\`\`

## Keuntungan Views:
1. **Penyederhanaan:** Menyembunyikan *logic SQL* yang rumit dari *developer Backend*.
2. **Keamanan:** Membatasi akses *user* ke tabel asli (Misal: Kita buat View \`v_karyawan_publik\` yang isinya semua kolom kecuali kolom \`gaji\`).
`,
    level: 'advanced',
    order: 9,
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: 'mysql-10',
    user_type: 'student',
    language: 'mysql',
    title: 'Stored Procedures & Functions',
    description: 'Memprogram logika if-else dan perulangan langsung di dalam engine database MySQL.',
    content: `# ⚙️ Modul 10: Stored Procedures

MySQL bukan sekadar tempat menyimpan data. MySQL punya bahasa pemrogramannya sendiri untuk mengeksekusi *logic* bisnis! 

**Stored Procedure** adalah kumpulan blok kode SQL (bisa berisi IF, WHILE, variabel) yang disimpan di *database* dan bisa dipanggil kapan saja. Jauh lebih cepat dari *Backend* karena prosesnya dieksekusi langsung di dekat *Harddisk/Memory*.

## Membuat Procedure Transfer Saldo (Dengan Transaksi)

Ubah \`DELIMITER\` agar MySQL tidak menganggap titik koma (\`;\`) di dalam kode sebagai penutup eksekusi.

\`\`\`sql
DELIMITER //

CREATE PROCEDURE TransferSaldo(
    IN p_pengirim_id INT, 
    IN p_penerima_id INT, 
    IN p_nominal DECIMAL(10,2)
)
BEGIN
    -- Deklarasi Exception Handler jika terjadi error (Otomatis Rollback)
    DECLARE EXIT HANDLER FOR SQLEXCEPTION 
    BEGIN
        ROLLBACK;
        SELECT 'Transfer Gagal: Terjadi Kesalahan Data' AS Status;
    END;

    -- Mulai Transaksi ACID
    START TRANSACTION;

    -- Kurangi pengirim
    UPDATE dompet SET saldo = saldo - p_nominal WHERE user_id = p_pengirim_id;
    
    -- Tambah penerima
    UPDATE dompet SET saldo = saldo + p_nominal WHERE user_id = p_penerima_id;

    -- Simpan Log Transaksi
    INSERT INTO history_transfer (dari_id, ke_id, nominal) 
    VALUES (p_pengirim_id, p_penerima_id, p_nominal);

    -- Simpan Permanen
    COMMIT;
    SELECT 'Transfer Sukses' AS Status;
END //

DELIMITER ;
\`\`\`

## Mengeksekusi dari Backend
Di PHP/Node.js, kamu cukup mengirimkan satu baris perintah:

\`\`\`sql
CALL TransferSaldo(1, 2, 50000);
\`\`\`

Jaringan antara *Server* dan *Database* tidak dibebani oleh bolak-balik 3 query berbeda. Performa meroket!
`,
    level: 'expert',
    order: 10,
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: 'mysql-11',
    user_type: 'student',
    language: 'mysql',
    title: 'Database Triggers',
    description: 'Menjalankan action otomatis "Sebelum" atau "Sesudah" data masuk/diubah/dihapus.',
    content: `# ⚡ Modul 11: Triggers (Reaksi Otomatis)

*Trigger* adalah *Stored Procedure* yang **berjalan otomatis secara gaib** saat terjadi event \`INSERT\`, \`UPDATE\`, atau \`DELETE\` di tabel tertentu.

Sangat berguna untuk: 
- Membuat Catatan Audit (*Log History*).
- Kalkulasi Stok otomatis.
- Validasi data kompleks.

## Contoh Kasus: Log Harga Lama
Jika bos mengubah harga sebuah produk, kita ingin *database otomatis* mencatat harga lamanya ke dalam tabel \`log_harga\` untuk *history*.

\`\`\`sql
DELIMITER //

CREATE TRIGGER after_product_update
AFTER UPDATE ON products
FOR EACH ROW -- Dieksekusi untuk setiap baris yang berubah
BEGIN
    -- Cek jika harganya benar-benar berubah
    -- OLD.x adalah nilai lama, NEW.x adalah nilai baru
    IF OLD.harga <> NEW.harga THEN
        INSERT INTO log_harga (product_id, harga_lama, harga_baru, diubah_pada)
        VALUES (OLD.id, OLD.harga, NEW.harga, NOW());
    END IF;
END //

DELIMITER ;
\`\`\`

---

## 🚨 Bahaya Triggers
Triggers itu **"Invisible"** (Tidak terlihat di kode *Backend*). 
Jika *Backend Programmer* bingung *"Kenapa setiap kali saya update produk, ada data aneh yang masuk ke tabel log ya?"*, mereka akan pusing mencari *bug* di PHP-nya, padahal pelakunya adalah *MySQL Trigger* yang bersembunyi.
Gunakan dengan bijak dan dokumentasikan!
`,
    level: 'expert',
    order: 11,
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: 'mysql-12',
    user_type: 'student',
    language: 'mysql',
    title: 'Normalisasi Database (1NF, 2NF, 3NF)',
    description: 'Teknik mendesain tabel anti-reduksi untuk sistem backend berskala besar.',
    content: `# 📐 Modul 12: Normalisasi (Desain Tabel)

Desain tabel yang ngawur akan menghasilkan ukuran database membengkak (*Data Redundancy*) dan rawan modifikasi yang salah (*Anomalies*). 
Solusinya: **Normalisasi**.

Misal kita punya tabel mentah bon belanja (Belum Normal):
| ID_Bon | Nama_Kasir | Barang_Dibeli          | Total |
|--------|------------|------------------------|-------|
| 001    | Siska      | Sabun, Shampo, Sikat   | 50000 |

## 1. First Normal Form (1NF)
**Aturan:** Setiap kolom hanya boleh berisi SATU nilai mutlak (*Atomic*). Tidak boleh ada koma-komaan di dalam sel.
❌ \`Sabun, Shampo, Sikat\` itu melanggar 1NF.
✅ Harus dipecah menjadi baris-baris terpisah ke bawah.

## 2. Second Normal Form (2NF)
**Aturan:** Sudah 1NF, dan **semua kolom non-key harus bergantung Penuh pada Primary Key**.
Jika dipecah ke bawah, ID_Bon 001 akan muncul 3 kali. Nama Kasir "Siska" akan tertulis berulang-ulang 3 kali (Redundansi).
✅ Solusi: Pisahkan menjadi tabel \`Transaksi\` (ID_Bon, Kasir, Total) dan tabel \`Detail_Transaksi\` (ID_Bon, Nama_Barang).

## 3. Third Normal Form (3NF)
**Aturan:** Sudah 2NF, dan **Tidak boleh ada ketergantungan Transitif** (Kolom A bergantung ke Kolom B, dan Kolom B bergantung ke PK).
Misal di tabel \`Transaksi\` kita tambah kolom \`No_HP_Kasir\`. Ini salah! \`No_HP_Kasir\` itu nempelnya ke Identitas si "Kasir", bukan ke "Transaksi" secara langsung.
✅ Solusi: Buat tabel Master \`Kasir\` (ID_Kasir, Nama, No_HP). Di tabel \`Transaksi\`, cukup cantumkan \`ID_Kasir\` saja (*Foreign Key*).

### Kesimpulan 3NF:
Setiap kolom dalam tabel harus berisi tentang Kuncinya (PK), Seluruh Kuncinya, dan **Tidak ada yang lain selain Kuncinya**.
`,
    level: 'expert',
    order: 12,
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: 'mysql-13',
    user_type: 'student',
    language: 'mysql',
    title: 'Transaction Control Language (TCL) & ACID',
    description: 'Menjamin konsistensi data absolut. Sifat Atomicity, Consistency, Isolation, dan Durability.',
    content: `# 🛡️ Modul 13: Transaksi & ACID Properties

MySQL InnoDB *Engine* mensupport sifat **ACID** (Syarat mutlak untuk sistem Perbankan / E-Commerce).

- **Atomicity:** Semua rangkaian *query* berhasil, atau digagalkan semua. Tidak ada yang berhasil separuh.
- **Consistency:** Aturan database (tipe data, *foreign key*) tidak bisa dilanggar selama transaksi.
- **Isolation:** Transaksi yang berjalan bersamaan (User A dan User B membeli barang yang sama di detik yang sama) tidak akan saling mengganggu.
- **Durability:** Jika transaksi sudah di-COMMIT, biarpun listrik server putus detik itu juga, data dipastikan aman di *Harddisk*.

## Praktik TCL di MySQL
\`\`\`sql
-- 1. Matikan mode auto-commit (yang biasanya otomatis save per query)
START TRANSACTION;

-- 2. Lakukan manipulasi
UPDATE products SET stok = stok - 1 WHERE id = 5;
INSERT INTO orders (user_id, total) VALUES (1, 50000);

-- 3. Cek hasil. Jika ada salah logika di otakmu, kamu bisa ROLLBACK
-- ROLLBACK; (Membatalkan seluruh perubahan sejak START TRANSACTION)

-- 4. Jika yakin benar, SIMPAN PERMANEN
COMMIT;
\`\`\`

## Isolasi (Race Condition)
Pernah lihat tiket konser ludes, tapi 2 orang berhasil beli tiket ke-100 secara bersamaan? Itu karena kurangnya *Isolation Level*.
Gunakan penguncian baris (Row-level Locking) dengan perintah \`FOR UPDATE\`.

\`\`\`sql
-- Mengunci baris produk ID 5 agar tidak bisa disentuh oleh transaksi/user lain sampai transaksi ini di-COMMIT!
SELECT stok FROM products WHERE id = 5 FOR UPDATE;
\`\`\`
`,
    level: 'expert',
    order: 13,
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: 'mysql-14',
    user_type: 'student',
    language: 'mysql',
    title: 'Performance Mastery: EXPLAIN & Indexing B-Tree',
    description: 'Rahasia di balik kecepatan pencarian MySQL. Memahami Full Table Scan vs Index Seek.',
    content: `# 🚀 Modul 14: B-Tree Indexing & EXPLAIN

*Database Developer* Senior dinilai dari kemampuannya melakukan *Query Tuning* saat aplikasi mulai melambat.

## 1. EXPLAIN (Membaca Pikiran MySQL)
Jika aplikasimu lambat, *copy query* tersebut dan tambahkan kata \`EXPLAIN\` di depannya.

\`\`\`sql
EXPLAIN SELECT * FROM users WHERE last_name = 'Wijaya';
\`\`\`
**Perhatikan kolom "type" di hasil EXPLAIN:**
- \`ALL\`: Kiamat. MySQL mengecek jutaan baris satu per satu (*Full Table Scan*).
- \`index\`: Mengecek *full* dari index (Masih kurang bagus).
- \`ref\`: Bagus! Menggunakan *Index* untuk mencari langsung ke alamat memori.
- \`const\`: Sempurna. Pencarian berdasarkan *Primary Key* (O(1)).

## 2. Membuat Index (B-Tree Data Structure)
*Index* mengurutkan data di memori menggunakan algoritma *Balanced Tree* (B-Tree).

\`\`\`sql
-- Membuat index pada kolom last_name
CREATE INDEX idx_lastname ON users(last_name);
\`\`\`

## 3. Aturan Emas Indexing (PENTING!)
1. **Jangan Index Semua Kolom!** Setiap kali ada \`INSERT/UPDATE\`, MySQL harus membuang tenaga untuk menyusun ulang struktur pohon *Index*-nya. *Index* mempercepat *SELECT*, tapi memperlambat *INSERT/UPDATE*.
2. **Kiri ke Kanan:** Jika kamu membuat *Composite Index* \`CREATE INDEX idx_nama ON users(first_name, last_name)\`.
   - \`WHERE first_name = 'A'\` -> Index terpakai.
   - \`WHERE first_name = 'A' AND last_name = 'B'\` -> Index terpakai penuh.
   - \`WHERE last_name = 'B'\` -> **Index TIDAK TERPAKAI!** B-Tree hanya bekerja dari cabang paling kiri.
3. **Kardinalitas Tinggi:** Jangan bikin *Index* untuk kolom \`jenis_kelamin\` (karena variasinya cuma L dan P). Bikin *Index* untuk data yang bervariasi luas seperti \`email\` atau \`nik\`.
`,
    level: 'expert',
    order: 14,
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: 'mysql-15',
    user_type: 'student',
    language: 'mysql',
    title: 'Modern MySQL: JSON Data Type & NoSQL Hybrid',
    description: 'Menggabungkan kekuatan Relasional dengan fleksibilitas skema NoSQL (MongoDB style) di MySQL 8.',
    content: `# 👽 Modul 15: JSON & Hybrid Database

Sejak MySQL versi 5.7+ (terutama 8.0+), kamu tidak perlu lagi bimbang memilih antara RDBMS (MySQL) atau NoSQL (MongoDB). MySQL sudah men-support penuh **Tipe Data JSON**!

Ini sangat berguna untuk menyimpan data yang struktur kolomnya berubah-ubah secara dinamis, misalnya "Spesifikasi Produk" (Laptop punya CPU & RAM, Kemeja punya Ukuran & Bahan). Tidak mungkin kita membuat 100 kolom terpisah!

## 1. Membuat Kolom JSON
\`\`\`sql
CREATE TABLE produk_hybrid (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nama VARCHAR(100),
    harga DECIMAL(10,2),
    -- Kolom sakti JSON
    spesifikasi JSON 
);
\`\`\`

## 2. Insert Data JSON Lengkap
\`\`\`sql
INSERT INTO produk_hybrid (nama, harga, spesifikasi) VALUES 
('MacBook Pro', 25000000, '{"ram": "16GB", "storage": "512GB SSD", "ports": ["USB-C", "MagSafe"]}'),
('Kemeja Flanel', 150000, '{"ukuran": "L", "bahan": "Katun", "warna": "Merah Hitam"}');
\`\`\`

## 3. Query Mengekstrak Value JSON (Operator ->>)
MySQL bisa melakukan *query* ke dalam elemen JSON tersebut dengan sangat cepat!

\`\`\`sql
-- Mencari semua produk yang "ukuran" JSON-nya adalah "L"
SELECT nama, harga 
FROM produk_hybrid 
WHERE spesifikasi->>'$.ukuran' = 'L';

-- Mengambil nilai "ram" dari spesifikasi laptop
SELECT nama, spesifikasi->>'$.ram' AS kapasitas_ram 
FROM produk_hybrid 
WHERE spesifikasi->>'$.ram' IS NOT NULL;
\`\`\`

## 🏆 Kesimpulan Masterclass Database Engineer
Gila bro! Lu baru aja menamatkan *roadmap* **Senior Database Engineer**! Mulai dari bikin relasi dan normalisasi tabel 3NF, menyusun CTE mutakhir, menjahit Transaksi ACID layaknya bank global, optimasi logika *B-Tree Indexing*, sampai berkreasi dengan tipe data dinamis *JSON* ala NoSQL. 

Sekarang, apapun bahasa *Backend* yang lu pakai (PHP, Node.js, Python, Golang), *Database* lu udah sekokoh beton!
`,
    level: 'expert',
    order: 15,
    created_at: '2025-01-01T00:00:00Z'
  }
];