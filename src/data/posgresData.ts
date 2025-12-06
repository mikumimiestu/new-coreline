import type { LearningMaterial } from '../types/learning';

export const MOCK_MATERIALS: LearningMaterial[] = [
  // ==================== POSTGRESQL MATERIALS ====================
  {
    id: 'pg-01',
    user_type: 'student',
    language: 'postgresql',
    title: 'Pengenalan PostgreSQL & Arsitektur',
    description: 'Kenapa Postgres? Arsitektur MVCC, Instalasi, dan tool psql/pgAdmin.',
    content: `# 🐘 Pengenalan PostgreSQL

## Apa itu PostgreSQL?
PostgreSQL adalah ORDBMS (*Object-Relational Database Management System*) yang sangat powerful.
Berbeda dengan MySQL yang fokus pada kecepatan baca sederhana, Postgres fokus pada **Integritas Data**, **Fitur Kompleks**, dan **Standard Compliance**.

**Keunggulan Utama di Industri:**
1.  **JSONB Support:** Bisa berfungsi seperti NoSQL (MongoDB) tapi tetap Relasional.
2.  **PostGIS:** Standar emas untuk data geografis (Peta/Lokasi).
3.  **Concurrency (MVCC):** *Multi-Version Concurrency Control*. Membaca data tidak pernah memblokir penulisan data, dan sebaliknya.

## 🛠️ Tools
1.  **psql:** Command Line Interface (CLI) bawaan yang sangat powerful.
2.  **pgAdmin 4:** GUI resmi untuk manajemen.
3.  **DBeaver:** Universal tool (Rekomendasi).

## 💻 Koneksi Dasar (psql)
\`\`\`bash
# Login sebagai user 'postgres' (superuser)
psql -U postgres

# Perintah Meta (Unik di psql, diawali backslash)
\\l       -- List semua database
\\c mydb  -- Connect ke database 'mydb'
\\dt      -- List semua tabel (Describe Tables)
\\q       -- Quit
\`\`\`

## 🎯 Outcome Modul
- Memahami beda filosofi MySQL vs Postgres.
- Bisa menggunakan perintah dasar \`psql\`.
`,
    level: 'beginner',
    order: 1,
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: 'pg-02',
    user_type: 'student',
    language: 'postgresql',
    title: 'DDL Modern: Data Types & Schema',
    description: 'UUID, TEXT vs VARCHAR, Serial vs Identity, dan Array.',
    content: `# Desain Schema Modern

Postgres memiliki tipe data yang sangat kaya. Jangan gunakan cara lama!

## 1. Primary Key Modern (UUID vs Identity)
* **SERIAL (Lama):** Mirip Auto Increment di MySQL.
* **IDENTITY (Baru/Standar SQL):** Lebih aman dan standar.
* **UUID (Industri):** *Universally Unique Identifier*. Wajib untuk sistem terdistribusi/Microservices agar ID tidak bisa ditebak.

\`\`\`sql
-- Mengaktifkan ekstensi UUID (hanya sekali per DB)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE users (
    -- ID Acak 128-bit (Sangat aman)
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    
    -- Di Postgres, TEXT sama cepatnya dengan VARCHAR(n)
    -- Gunakan TEXT saja kecuali memang butuh limit karakter bisnis.
    email TEXT UNIQUE NOT NULL,
    nama TEXT NOT NULL,
    
    -- Postgres support ARRAY! (Satu kolom isi banyak string)
    tags TEXT[], 
    
    is_active BOOLEAN DEFAULT true
);
\`\`\`

## 2. JSONB (Binary JSON)
Menyimpan data semi-terstruktur.
* **JSON:** Disimpan sebagai teks (lambat diproses).
* **JSONB:** Disimpan sebagai binary (bisa di-index, sangat cepat).

\`\`\`sql
CREATE TABLE products (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name TEXT,
    attributes JSONB -- Bisa simpan { "warna": "merah", "size": "L" }
);
\`\`\`

## 🎯 Outcome Modul
- Beralih dari \`INT Auto Increment\` ke \`UUID\` atau \`IDENTITY\`.
- Menggunakan \`TEXT\` daripada \`VARCHAR(255)\`.
- Mengenal tipe data Array.
`,
    level: 'beginner',
    order: 2,
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: 'pg-03',
    user_type: 'student',
    language: 'postgresql',
    title: 'DML Powerful: Returning & Upsert',
    description: 'Fitur RETURNING (hemat round-trip) dan ON CONFLICT (Upsert).',
    content: `# DML Lanjutan

Postgres memiliki fitur DML yang jarang dimiliki database lain.

## 1. RETURNING Clause
Biasanya setelah INSERT, kita butuh ID data yang baru masuk.
* **Cara Lama:** INSERT dulu, lalu SELECT MAX(id). (2x jalan).
* **Cara Postgres:** Langsung kembalikan data.

\`\`\`sql
INSERT INTO users (email, nama) 
VALUES ('budi@mail.com', 'Budi')
RETURNING id, created_at; 
-- Output: Mengembalikan UUID dan Waktu buat langsung!
\`\`\`

## 2. UPSERT (On Conflict)
Gabungan UPDATE dan INSERT. Jika data sudah ada, update. Jika belum, insert.

\`\`\`sql
INSERT INTO products (id, name, stock)
VALUES (1, 'Laptop', 10)
ON CONFLICT (id) 
DO UPDATE SET 
    stock = products.stock + EXCLUDED.stock, -- Tambah stok lama + baru
    name = EXCLUDED.name;
\`\`\`

## 3. Copy (Bulk Insert Super Cepat)
Untuk import CSV jutaan baris.
\`\`\`sql
COPY users(name, email) 
FROM '/path/to/data.csv' 
DELIMITER ',' CSV HEADER;
\`\`\`

## 🎯 Outcome Modul
- Aplikasi lebih cepat dengan \`RETURNING\` (mengurangi query select ulang).
- Bisa menangani duplikasi data dengan elegan menggunakan \`ON CONFLICT\`.
`,
    level: 'intermediate',
    order: 3,
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: 'pg-04',
    user_type: 'student',
    language: 'postgresql',
    title: 'Query Analytics: CTE & Window Functions',
    description: 'Common Table Expressions (WITH) dan Ranking/Partisi data.',
    content: `# Analisis Data Tingkat Lanjut

Fitur wajib untuk membuat dashboard atau laporan keuangan.

## 1. CTE (Common Table Expressions)
Membuat query yang mudah dibaca dengan memecahnya menjadi bagian-bagian kecil (seperti variabel sementara). Gunakan \`WITH\`.

\`\`\`sql
WITH total_penjualan AS (
    SELECT user_id, SUM(total) as omzet
    FROM orders
    GROUP BY user_id
),
user_kaya AS (
    SELECT * FROM total_penjualan WHERE omzet > 10000000
)
-- Query Utama
SELECT u.nama, k.omzet 
FROM users u
JOIN user_kaya k ON u.id = k.user_id;
\`\`\`

## 2. Window Functions
Melakukan kalkulasi antar baris tanpa mengelompokkan (Group By) baris tersebut.

\`\`\`sql
SELECT 
    nama,
    departemen,
    gaji,
    -- Ranking gaji per departemen
    RANK() OVER (PARTITION BY departemen ORDER BY gaji DESC) as ranking,
    -- Rata-rata gaji di departemen tersebut (muncul di setiap baris)
    AVG(gaji) OVER (PARTITION BY departemen) as rata_rata_dept
FROM karyawan;
\`\`\`

## 🎯 Outcome Modul
- Tidak lagi membuat *Subquery* bertingkat yang membingungkan (Ganti dengan CTE).
- Bisa membuat ranking juara kelas/gaji dengan mudah.
`,
    level: 'intermediate',
    order: 4,
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: 'pg-05',
    user_type: 'student',
    language: 'postgresql',
    title: 'NoSQL di SQL: JSONB Deep Dive',
    description: 'Query JSON, Operator -> vs ->>, dan Indexing JSON.',
    content: `# Hybrid Database (SQL + NoSQL)

Postgres sering menggantikan MongoDB karena fitur JSONB-nya yang robust.

## 1. Insert JSONB
\`\`\`sql
INSERT INTO products (name, attributes) VALUES 
('Sepatu Nike', '{ "warna": "Putih", "ukuran": [40, 41, 42], "tags": ["sport", "lari"] }');
\`\`\`

## 2. Query JSONB
* \`->\`  : Mengambil sebagai JSON object (masih ada kutip).
* \`->>\` : Mengambil sebagai Text (kutip hilang).

\`\`\`sql
-- Cari produk berwarna Putih
SELECT name 
FROM products 
WHERE attributes->>'warna' = 'Putih';

-- Cari produk yang punya ukuran 42 (Cek dalam array JSON)
SELECT name 
FROM products 
WHERE attributes->'ukuran' @> '42'; -- Operator Contains (@>)
\`\`\`

## 3. Kapan pakai JSONB?
* Atribut produk yang dinamis (Baju ada warna, Laptop ada RAM).
* Log audit / respon API.
* **Jangan pakai JSONB untuk data relasional utama!**

## 🎯 Outcome Modul
- Bisa memanipulasi data JSON layaknya tabel biasa.
- Mengerti penggunaan operator panah JSON (\`->>\`).
`,
    level: 'advanced',
    order: 5,
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: 'pg-06',
    user_type: 'student',
    language: 'postgresql',
    title: 'Performance: Indexing (B-Tree vs GIN)',
    description: 'Jenis Index Postgres, Explain Analyze, dan Partial Index.',
    content: `# Optimasi Performa Tingkat Lanjut

Postgres punya banyak jenis index, tidak hanya B-Tree.

## 1. B-Tree (Default)
Untuk data yang bisa diurutkan (=, >, <). Cocok untuk ID, Email, Tanggal.
\`\`\`sql
CREATE INDEX idx_email ON users(email);
\`\`\`

## 2. GIN (Generalized Inverted Index)
Wajib untuk **JSONB** dan **Full Text Search**.
B-Tree tidak bisa mengindex isi di dalam JSON.

\`\`\`sql
-- Indexing seluruh isi JSONB agar pencarian cepat
CREATE INDEX idx_attr ON products USING GIN (attributes);
\`\`\`

## 3. Partial Index
Hanya mengindex baris tertentu (Hemat disk).
\`\`\`sql
-- Hanya index user yang aktif (yang tidak aktif jarang dicari)
CREATE INDEX idx_active_users ON users(email) WHERE is_active = true;
\`\`\`

## 4. EXPLAIN ANALYZE
Menjalankan query beneran dan mengukur waktunya.
\`\`\`sql
EXPLAIN ANALYZE SELECT * FROM users WHERE email = 'budi@mail.com';
\`\`\`

## 🎯 Outcome Modul
- Menggunakan **GIN Index** untuk kolom JSONB.
- Bisa menghemat storage dengan Partial Index.
`,
    level: 'advanced',
    order: 6,
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: 'pg-07',
    user_type: 'student',
    language: 'postgresql',
    title: 'Advanced Features: Materialized Views & Functions',
    description: 'Caching query berat dengan Materialized View dan PL/pgSQL.',
    content: `# Fitur Enterprise

## 1. Materialized Views (MatView)
Berbeda dengan View biasa (virtual), MatView **menyimpan hasil query secara fisik** di disk.
Sangat cepat untuk report berat, tapi datanya tidak realtime.

\`\`\`sql
CREATE MATERIALIZED VIEW laporan_bulanan AS
SELECT ... (Query berat join 5 tabel) ...
WITH DATA;

-- Query ke sini secepat kilat (karena sudah disimpan)
SELECT * FROM laporan_bulanan;

-- Refresh data (misal diset tiap jam via Cron)
REFRESH MATERIALIZED VIEW laporan_bulanan;
\`\`\`

## 2. PL/pgSQL Functions
Bahasa prosedural Postgres.

\`\`\`sql
CREATE OR REPLACE FUNCTION hitung_pajak(harga DEC) RETURNS DEC AS $$
BEGIN
    RETURN harga * 0.11;
END;
$$ LANGUAGE plpgsql;

SELECT hitung_pajak(100000);
\`\`\`

## 🎯 Outcome Modul
- Menggunakan Materialized View untuk caching laporan berat.
- Dasar pembuatan fungsi custom.
`,
    level: 'advanced',
    order: 7,
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: 'pg-08',
    user_type: 'student',
    language: 'postgresql',
    title: 'Maintenance: VACUUM & Roles',
    description: 'Masalah bloat pada MVCC, Vacuuming, dan Manajemen User.',
    content: `# Maintenance & Security

## 1. Masalah "Bloat" & VACUUM
Karena Postgres menggunakan MVCC, saat data di-update/delete, data lama tidak langsung hilang (hanya ditandai "mati"). Ini memakan disk space ("bloat").
Postgres punya **AutoVacuum** daemon, tapi kadang perlu manual.

\`\`\`sql
-- Membersihkan ruang kosong dan update statistik optimizer
VACUUM ANALYZE users;

-- (Hati-hati) Membersihkan total & mengunci tabel
-- VACUUM FULL users; 
\`\`\`

## 2. Role Based Access Control (RBAC)
User dan Group di Postgres disebut **Role**.

\`\`\`sql
-- Buat Role Group
CREATE ROLE dev_team;
GRANT SELECT, INSERT ON ALL TABLES IN SCHEMA public TO dev_team;

-- Buat User dan masukkan ke Group
CREATE USER andi WITH PASSWORD '123';
GRANT dev_team TO andi;
\`\`\`

## 🎯 Outcome Modul
- Paham konsep "Dead Tuples" dan fungsi VACUUM.
- Bisa manajemen hak akses user secara berkelompok.
`,
    level: 'advanced',
    order: 8,
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: 'pg-09',
    user_type: 'student',
    language: 'postgresql',
    title: 'Studi Kasus 1: FinTech - Running Balance',
    description: 'Kasus menghitung saldo berjalan (mutasi rekening) menggunakan Window Functions.',
    content: `# Studi Kasus 1: Mutasi Rekening (FinTech)

## 📜 Skenario
Anda membuat aplikasi dompet digital.
User ingin melihat **Mutasi Rekening** dimana saldo akhirnya terlihat di setiap baris transaksi (Running Balance).
Ini sangat sulit dilakukan dengan SQL biasa, tapi mudah dengan Postgres **Window Functions**.

Tabel: \`transactions\` (id, date, amount).
* Amount positif = Uang masuk.
* Amount negatif = Uang keluar.

## 💻 Solusi Code
\`\`\`sql
-- 1. Setup Data Dummy
CREATE TABLE transactions (
    id SERIAL PRIMARY KEY,
    trx_date DATE,
    amount DECIMAL(10,2),
    description TEXT
);

INSERT INTO transactions (trx_date, amount, description) VALUES
('2024-01-01', 1000000, 'Topup Awal'),
('2024-01-02', -50000,  'Beli Pulsa'),
('2024-01-03', -150000, 'Bayar Listrik'),
('2024-01-04', 200000,  'Cashback');

-- 2. Query Running Balance
SELECT 
    trx_date,
    description,
    amount,
    -- Fitur Ajaib: SUM() OVER (ORDER BY ...)
    -- Ini akan menjumlahkan baris saat ini dengan SEMUA baris sebelumnya
    SUM(amount) OVER (ORDER BY id) as running_balance
FROM transactions;
\`\`\`

## ✅ Hasil yang Diharapkan
Perhatikan kolom \`running_balance\` yang bertambah/berkurang akumulatif.

\`\`\`text
  trx_date  |  description  |  amount   | running_balance 
------------+---------------+-----------+-----------------
 2024-01-01 | Topup Awal    |   1000000 |         1000000
 2024-01-02 | Beli Pulsa    |    -50000 |          950000
 2024-01-03 | Bayar Listrik |   -150000 |          800000
 2024-01-04 | Cashback      |    200000 |         1000000
\`\`\`
`,
    level: 'advanced',
    order: 9,
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: 'pg-10',
    user_type: 'student',
    language: 'postgresql',
    title: 'Studi Kasus 2: E-Commerce Product Filter (JSONB)',
    description: 'Pencarian produk kompleks dengan atribut dinamis menggunakan JSONB dan GIN Index.',
    content: `# Studi Kasus 2: Dynamic Product Attributes

## 📜 Skenario
Anda membangun E-Commerce elektronik.
Setiap kategori produk punya spek beda:
* Laptop: punya CPU, RAM, Storage.
* Baju: punya Warna, Ukuran, Bahan.
* HP: punya Kamera, Baterai.

Membuat kolom terpisah (\`col_cpu\`, \`col_size\`) sangat tidak efisien (banyak NULL).
Solusi: Gunakan satu kolom **JSONB**.

Tugas: Cari Laptop yang RAM-nya 16GB **ATAU** 8GB, dan Urutkan berdasarkan Storage.

## 💻 Solusi Code
\`\`\`sql
-- 1. Setup Tabel & Index GIN
CREATE TABLE gadgets (
    id SERIAL PRIMARY KEY,
    name TEXT,
    specs JSONB
);

-- Index GIN agar query JSON ngebut
CREATE INDEX idx_specs ON gadgets USING GIN (specs);

-- 2. Data Dummy
INSERT INTO gadgets (name, specs) VALUES
('MacBook Pro', '{"type": "Laptop", "ram": "16GB", "storage": "512GB", "color": "Grey"}'),
('Asus ZenBook', '{"type": "Laptop", "ram": "8GB", "storage": "1TB", "color": "Blue"}'),
('iPhone 15',    '{"type": "Phone", "ram": "6GB", "storage": "128GB", "color": "Black"}'),
('Lenovo Legion','{"type": "Laptop", "ram": "16GB", "storage": "1TB", "color": "Black"}');

-- 3. Query Kompleks
SELECT 
    name, 
    specs->>'ram' as ram,
    specs->>'storage' as storage
FROM gadgets
WHERE 
    specs->>'type' = 'Laptop' -- Filter Tipe
    AND 
    (specs->>'ram' = '16GB' OR specs->>'ram' = '8GB') -- Filter RAM
ORDER BY 
    specs->>'storage' DESC; -- Sorting berdasarkan isi JSON
\`\`\`

## ✅ Hasil yang Diharapkan
iPhone tidak muncul (karena tipe Phone).
\`\`\`text
     name      | ram  | storage 
---------------+------+---------
 MacBook Pro   | 16GB | 512GB
 Asus ZenBook  | 8GB  | 1TB
 Lenovo Legion | 16GB | 1TB
\`\`\`
*(Catatan: Sorting string "1TB" vs "512GB" mungkin butuh casting ke int jika ingin akurat secara numerik, tapi secara konsep JSON query sudah benar).*
`,
    level: 'advanced',
    order: 10,
    created_at: '2025-01-01T00:00:00Z'
  },
];