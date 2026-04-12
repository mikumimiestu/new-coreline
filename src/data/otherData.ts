import { LearningMaterial } from '../types/learning';

export const MOCK_MATERIALS: LearningMaterial[] = [
  // ==================== PHP + MYSQL CORE MATERIALS ====================
  {
    id: 'php-db-01',
    user_type: 'student',
    language: 'php',
    title: 'Fundamental Database Relasional (MySQL)',
    description: 'Konsep dasar Tabel, Primary Key, Foreign Key, dan Normalisasi Data.',
    content: `# 🗄️ Modul 1: Fundamental MySQL

Sebelum PHP bisa ngobrol dengan *Database*, kita harus paham dulu bahasa ibu-nya si *Database*, yaitu **SQL (Structured Query Language)**. MySQL adalah sistem manajemen database relasional (RDBMS).

## 1. Relasi & Kunci (Keys)
Data di MySQL disimpan dalam bentuk **Tabel** (Baris dan Kolom). Agar antar tabel bisa saling terhubung, kita butuh "Kunci".
- **Primary Key (PK):** ID unik untuk setiap baris. Tidak boleh ada duplikat. (Contoh: \`id_user\`, \`nim\`).
- **Foreign Key (FK):** Kunci tamu. PK dari tabel lain yang numpang di tabel kita untuk menciptakan relasi. (Contoh: \`user_id\` di dalam tabel \`pesanan\`).

## 2. Sintaks Dasar DDL (Data Definition Language)
Membuat kerangka tabelnya dulu sebelum diisi data.

\`\`\`sql
-- Membuat tabel users
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Membuat tabel pesanan yang berelasi dengan users
CREATE TABLE pesanan (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    total DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
\`\`\`
*(Catatan: \`ON DELETE CASCADE\` artinya kalau *user* dihapus, semua pesanannya otomatis ikut terhapus).*

---

## 📝 Quiz Singkat
1. Apa kegunaan utama dari *Primary Key*?
2. Mengapa tipe data \`VARCHAR\` selalu membutuhkan batasan panjang (misal: \`VARCHAR(50)\`)?

## ✍️ Latihan (15 Menit)
1. Buka PHPMyAdmin atau *tool* MySQL *client* favoritmu.
2. Buat database baru bernama \`belajar_db\`.
3. Buat tabel \`produk\` dengan kolom: \`id\` (PK), \`nama\` (VARCHAR), \`harga\` (INT), dan \`stok\` (INT).
`,
    level: 'beginner',
    order: 1,
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: 'php-db-02',
    user_type: 'student',
    language: 'php',
    title: 'Koneksi PHP ke MySQL (PDO Standard)',
    description: 'Mengapa PDO lebih baik dari MySQLi, dan cara membuat koneksi yang solid.',
    content: `# 🔌 Modul 2: PDO (PHP Data Objects)

Di PHP, ada dua cara populer konek ke MySQL: **MySQLi** dan **PDO**. 
Industri modern mewajibkan penggunaan **PDO** karena mendukung banyak jenis database (bukan cuma MySQL) dan lebih aman menggunakan *Object-Oriented syntax*.

## 1. DSN (Data Source Name)
DSN adalah *string* yang menyimpan informasi tipe database, host, dan nama database.

\`\`\`php
<?php
// file: koneksi.php
\$host = '127.0.0.1'; // Jangan pakai 'localhost' agar menghindari masalah socket DNS
\$db   = 'belajar_db';
\$user = 'root';
\$pass = '';
\$charset = 'utf8mb4'; // Standar modern agar mendukung Emoji 😎

// Setup DSN
\$dsn = "mysql:host=\$host;dbname=\$db;charset=\$charset";

// Setup Opsi PDO
\$options = [
    // Ubah error menjadi Exception agar mudah di-catch
    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
    // Ambil data langsung menjadi Associative Array (bukan index angka)
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    // Matikan emulasi prepare statement agar keamanan SQL Injection maksimal
    PDO::ATTR_EMULATE_PREPARES   => false,
];

try {
    // Membuat instance PDO (Koneksi terjadi di sini)
    \$pdo = new PDO(\$dsn, \$user, \$pass, \$options);
    echo "✅ Berhasil konek ke database!";
} catch (PDOException \$e) {
    // Tangkap error jika koneksi gagal
    exit("❌ Gagal Konek Database: " . \$e->getMessage());
}
\`\`\`

---

## ✍️ Latihan (15 Menit)
1. Buat file \`database.php\` dan salin kode di atas.
2. Ubah variabel \`\$db\` menjadi nama database yang tidak ada. Lihat pesan *error* yang muncul di layar (Exception-nya bekerja!).
3. Kembalikan ke nama database yang benar. File ini akan kita *include* di modul-modul berikutnya.
`,
    level: 'beginner',
    order: 2,
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: 'php-db-03',
    user_type: 'student',
    language: 'php',
    title: 'CRUD Part 1: Create & Read Data',
    description: 'Menyisipkan data dengan INSERT dan menarik data menggunakan SELECT.',
    content: `# 📥 Modul 3: Create & Read (CRUD 1)

**PENTING:** Jangan pernah menempelkan variabel PHP langsung ke dalam *string* SQL seperti ini: \`"SELECT * FROM users WHERE nama = '\$nama'"\`. Ini adalah celah bunuh diri bernama **SQL Injection**. Selalu gunakan tanda tanya \`?\` (Prepared Statement).

## 1. Create (Menambah Data - INSERT)
\`\`\`php
<?php
require 'koneksi.php'; // Mengambil \$pdo dari file sebelumnya

// Data simulasi dari form $_POST
\$nama_produk = "Keyboard Mekanikal";
\$harga = 750000;
\$stok = 10;

// 1. Prepare: Siapkan kerangka SQL
\$stmt = \$pdo->prepare("INSERT INTO produk (nama, harga, stok) VALUES (?, ?, ?)");

// 2. Execute: Jalankan kerangka dengan data asli (urutan array harus sama dengan tanda ?)
if (\$stmt->execute([\$nama_produk, \$harga, \$stok])) {
    echo "Produk berhasil ditambah! ID: " . \$pdo->lastInsertId();
}
\`\`\`

---

## 2. Read (Menampilkan Data - SELECT)
Ada 2 cara narik data:
- \`fetch()\` -> Kalau datanya cuma 1 baris (seperti cari user by ID).
- \`fetchAll()\` -> Kalau datanya banyak baris (seperti daftar produk).

\`\`\`php
<?php
require 'koneksi.php';

// Menarik Semua Data
\$stmt = \$pdo->query("SELECT * FROM produk ORDER BY id DESC");
\$semua_produk = \$stmt->fetchAll();

echo "<ul>";
foreach (\$semua_produk as \$p) {
    echo "<li>" . \$p['nama'] . " - Rp" . \$p['harga'] . "</li>";
}
echo "</ul>";

// Menarik 1 Data Spesifik (Gunakan Prepare!)
\$cari_id = 1;
\$stmt_satu = \$pdo->prepare("SELECT * FROM produk WHERE id = ?");
\$stmt_satu->execute([\$cari_id]);
\$produk_spesifik = \$stmt_satu->fetch();

if (\$produk_spesifik) {
    echo "Ditemukan: " . \$produk_spesifik['nama'];
} else {
    echo "Produk tidak ada.";
}
\`\`\`

## ✍️ Latihan (20 Menit)
1. Buat form HTML sederhana untuk input nama produk dan harga.
2. Tangkap data dengan \`\$_POST\`.
3. Lakukan proses \`INSERT\` ke database menggunakan PDO Prepared Statements.
`,
    level: 'intermediate',
    order: 3,
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: 'php-db-04',
    user_type: 'student',
    language: 'php',
    title: 'CRUD Part 2: Update & Delete Data',
    description: 'Memperbarui baris yang ada dan menghapus data dengan aman menggunakan klausa WHERE.',
    content: `# 📤 Modul 4: Update & Delete (CRUD 2)

Hati-hati saat menggunakan UPDATE dan DELETE! Jika kamu lupa menambahkan klausa \`WHERE\`, **SELURUH DATA DI TABEL AKAN BERUBAH/TERHAPUS!**

## 1. Update (Memperbarui Data)
Mekanismenya persis seperti INSERT, kita butuh kerangka \`prepare\` lalu kita kirim *array* nilainya di \`execute\`.

\`\`\`php
<?php
require 'koneksi.php';

// Misal user mengedit harga produk ID ke-1
\$id_target = 1;
\$harga_baru = 800000;
\$stok_baru = 15;

\$sql = "UPDATE produk SET harga = ?, stok = ? WHERE id = ?";
\$stmt = \$pdo->prepare(\$sql);

// Eksekusi urut: harga, stok, lalu id
\$stmt->execute([\$harga_baru, \$stok_baru, \$id_target]);

// rowCount() berguna untuk mengecek ada berapa baris yang berhasil diubah
if (\$stmt->rowCount() > 0) {
    echo "Data berhasil diperbarui!";
} else {
    echo "Tidak ada data yang berubah (mungkin ID tidak ketemu atau nilainya sama).";
}
\`\`\`

---

## 2. Delete (Menghapus Data)
Paling simpel, tapi paling mematikan.

\`\`\`php
<?php
require 'koneksi.php';

\$id_hapus = 2; // ID yang diklik dari tombol "Hapus"

\$stmt = \$pdo->prepare("DELETE FROM produk WHERE id = ?");
\$stmt->execute([\$id_hapus]);

if (\$stmt->rowCount() > 0) {
    echo "Produk ID \$id_hapus resmi dihapus dari muka bumi.";
} else {
    echo "Gagal menghapus. Data tidak ditemukan.";
}
\`\`\`

## ✍️ Latihan (20 Menit)
1. Buat daftar produk HTML dengan sebuah tombol berbentuk \`<a>\` (link) bertuliskan "Hapus" yang mengarah ke URL \`hapus.php?id=... (ID masing-masing)\`.
2. Di file \`hapus.php\`, tangkap ID-nya menggunakan \`\$_GET['id']\`.
3. Jalankan sintaks \`DELETE\` PDO untuk menghapus produk berdasarkan ID tersebut.
`,
    level: 'intermediate',
    order: 4,
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: 'php-db-05',
    user_type: 'student',
    language: 'php',
    title: 'Relasi Data Terpadu: SQL JOINs di PHP',
    description: 'Menggabungkan data dari tabel berbeda (INNER, LEFT) dalam satu kali query.',
    content: `# 🤝 Modul 5: SQL JOINs (Menggabungkan Tabel)

Di database, data itu dipisah-pisah (Normalisasi). Tapi untuk nampilin ke *user*, data itu harus digabung. Di sinilah \`JOIN\` beraksi.

**Skenario:** Kita punya tabel \`users\` dan tabel \`artikel\`. Setiap artikel punya \`user_id\` (siapa yang nulis). Kita mau nampilin judul artikel beserta nama penulisnya.

### Jangan Gunakan Query di dalam Loop!
❌ **Bad Practice:** Melakukan \`SELECT * FROM artikel\`, lalu me-looping hasilnya, dan di dalam *loop* melakukan \`SELECT nama FROM users WHERE id = ...\`. Ini akan mematikan *server* jika ada 1000 artikel.

✅ **Best Practice:** Gunakan \`JOIN\` untuk mengambilnya sekaligus dalam 1 tarikan napas.

\`\`\`php
<?php
require 'koneksi.php';

// INNER JOIN: Hanya mengambil artikel yang ada penulisnya.
// Pilih kolom spesifik untuk menghindari nama kolom yang tabrakan (contoh: id)
\$sql = "
    SELECT 
        artikel.id AS artikel_id, 
        artikel.judul, 
        users.nama AS nama_penulis, 
        users.email
    FROM artikel
    INNER JOIN users ON artikel.user_id = users.id
    ORDER BY artikel.id DESC
";

\$stmt = \$pdo->query(\$sql);
\$berita = \$stmt->fetchAll();

foreach (\$berita as \$b) {
    echo "<h2>" . htmlspecialchars(\$b['judul']) . "</h2>";
    echo "<p>Ditulis oleh: " . htmlspecialchars(\$b['nama_penulis']) . " (" . htmlspecialchars(\$b['email']) . ")</p>";
    echo "<hr>";
}
\`\`\`

### INNER vs LEFT JOIN
- **INNER JOIN:** Hasilnya cuma keluar kalau tabel A dan tabel B ada jodohnya.
- **LEFT JOIN:** Semua data di tabel A (tabel utama) PASTI KELUAR, gak peduli di tabel B dia punya pasangan atau nggak (kalau nggak ada, nilainya jadi \`NULL\`).

## ✍️ Latihan (20 Menit)
1. Buat tabel \`kategori_produk\` (id, nama_kategori) dan ubah tabel \`produk\` dengan menambahkan \`kategori_id\`.
2. Gunakan \`LEFT JOIN\` untuk menampilkan semua produk. Jika produk tersebut tidak ada kategorinya (kategori_id NULL), tampilkan label "Tanpa Kategori" menggunakan logika PHP \`??\`.
`,
    level: 'advanced',
    order: 5,
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: 'php-db-06',
    user_type: 'student',
    language: 'php',
    title: 'Membangun Fitur Pencarian (Search & Filter)',
    description: 'Menggunakan operator LIKE dengan keamanan tingkat tinggi di PDO Prepared Statements.',
    content: `# 🔍 Modul 6: Fitur Pencarian (LIKE Operator)

Kalau di modul algoritma kita nyari data dari dalam *Array* PHP, sekarang kita nyuruh database MySQL langsung yang nyari datanya pakai klausa \`LIKE\`.

## 1. Sintaks LIKE di MySQL
- \`WHERE judul LIKE 'PHP%'\`: Berawalan "PHP".
- \`WHERE judul LIKE '%PHP'\`: Berakhiran "PHP".
- \`WHERE judul LIKE '%PHP%'\`: Mengandung kata "PHP" di mana saja (paling umum).

## 2. Menggabungkan LIKE dengan Prepared Statements
Ini agak *tricky*. Kita tidak bisa menulis \`LIKE '%?%'\`. Tanda baca \`%\` harus digabung dulu di variabel PHP, baru dilempar ke kerangka \`execute()\`.

\`\`\`php
<?php
require 'koneksi.php';

// Simulasi user ngetik "laptop" di form search
\$keyword_user = \$_GET['search'] ?? '';

// Kalau keyword kosong, tampilkan semua
if (empty(\$keyword_user)) {
    \$stmt = \$pdo->query("SELECT * FROM produk LIMIT 20");
} else {
    // Siapkan query
    \$sql = "SELECT * FROM produk WHERE nama LIKE ? OR deskripsi LIKE ?";
    \$stmt = \$pdo->prepare(\$sql);
    
    // Gabungkan wildcard % ke variabel PHP
    \$search_param = '%' . \$keyword_user . '%';
    
    // Eksekusi (dua ? = butuh dua nilai)
    \$stmt->execute([\$search_param, \$search_param]);
}

\$hasil = \$stmt->fetchAll();

echo "Menemukan " . count(\$hasil) . " data:\\n";
foreach (\$hasil as \$item) {
    echo "- " . htmlspecialchars(\$item['nama']) . "\\n";
}
\`\`\`

## ✍️ Latihan (20 Menit)
1. Buat form pencarian menggunakan metode GET.
2. Kombinasikan script ini agar \`search_param\` yang dimasukkan *user* tidak mengandung karakter terlarang (*hint*: gunakan \`trim()\`, \`htmlspecialchars()\`).
`,
    level: 'advanced',
    order: 6,
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: 'php-db-07',
    user_type: 'student',
    language: 'php',
    title: 'Advanced Query: Aggregate Functions & Group By',
    description: 'Membuat Dashboard Reporting menggunakan fungsi SUM, COUNT, AVG di SQL.',
    content: `# 📊 Modul 7: Aggregate & Reporting

Aplikasi yang sudah berjalan butuh halaman *Dashboard Admin* untuk melihat laporan ringkasan. Alih-alih menarik ribuan baris data ke PHP lalu dihitung manual pakai \`foreach\`, lebih cepat menyuruh MySQL langsung yang menghitungnya!

## 1. Aggregate Functions
MySQL punya fungsi matematika bawaan:
- \`COUNT()\`: Menghitung jumlah baris.
- \`SUM()\`: Menjumlahkan isi angka.
- \`AVG()\`: Mencari rata-rata.

\`\`\`php
<?php
require 'koneksi.php';

// Menghitung total seluruh pendapatan dari tabel pesanan
\$stmt = \$pdo->query("SELECT SUM(total_harga) as total_omzet FROM pesanan WHERE status = 'Lunas'");
\$data = \$stmt->fetch();

echo "Total Omzet: Rp " . number_format(\$data['total_omzet'], 0, ',', '.');
\`\`\`

---

## 2. GROUP BY (Mengelompokkan Data)
Sangat berguna untuk bikin grafik. Misal: Berapa omzet per-bulan? Atau, berapa jumlah produk per-kategori?

\`\`\`php
<?php
require 'koneksi.php';

// SQL: Hitung total barang, DARI tabel produk, KELOMPOKKAN berdasarkan kategorinya.
\$sql = "
    SELECT kategori_id, COUNT(*) as jumlah_item 
    FROM produk 
    GROUP BY kategori_id
    ORDER BY jumlah_item DESC
";
\$stmt = \$pdo->query(\$sql);
\$laporan = \$stmt->fetchAll();

echo "<h3>Stok Per Kategori:</h3>";
foreach (\$laporan as \$row) {
    echo "Kategori ID " . \$row['kategori_id'] . " punya " . \$row['jumlah_item'] . " barang.<br>";
}
\`\`\`

## ✍️ Latihan (30 Menit)
1. Modifikasi query \`GROUP BY\` di atas.
2. Gunakan \`JOIN\` agar yang tampil bukan \`kategori_id\` (angka), melainkan \`nama_kategori\` (teks) dari tabel sebelahnya.
`,
    level: 'expert',
    order: 7,
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: 'php-db-08',
    user_type: 'student',
    language: 'php',
    title: 'Database Transactions (ACID Properties)',
    description: 'Menjaga integritas data saat melakukan multiple queries. Konsep Rollback & Commit.',
    content: `# 🛡️ Modul 8: Transaksi Database (ACID)

**Studi Kasus:** Sistem Transfer Bank.
1. Saldo Andi dikurangi Rp 50.000 (Sukses).
2. Tiba-tiba server mati mendadak! (Listrik padam).
3. Saldo Budi belum ditambah Rp 50.000 (Gagal).
**Hasil:** Uang hilang di udara! Ini adalah bencana.

Untuk mencegahnya, kita bungkus query tersebut dalam **Transaction**. Sifatnya: Berhasil SEMUA, atau Gagal SEMUA.

## 1. Implementasi Transaction di PDO
\`\`\`php
<?php
require 'koneksi.php';

try {
    // 1. Kunci Database! Mulai Transaksi.
    \$pdo->beginTransaction();

    // 2. Lakukan Operasi A (Kurangi Saldo Pengirim)
    \$stmt1 = \$pdo->prepare("UPDATE rekening SET saldo = saldo - 50000 WHERE id_user = ?");
    \$stmt1->execute([1]); // ID Andi

    // (Simulasi error server)
    // throw new Exception("Tiba-tiba server nge-lag!");

    // 3. Lakukan Operasi B (Tambah Saldo Penerima)
    \$stmt2 = \$pdo->prepare("UPDATE rekening SET saldo = saldo + 50000 WHERE id_user = ?");
    \$stmt2->execute([2]); // ID Budi

    // 4. Jika semua mulus sampai baris ini, SIMPAN PERMANEN!
    \$pdo->commit();
    echo "Transfer Sukses 100%!";

} catch (Exception \$e) {
    // 5. BATALKAN SEMUA PERUBAHAN JIKA ADA ERROR!
    \$pdo->rollBack();
    echo "Transfer Gagal. Saldo dikembalikan ke semula. Alasan: " . \$e->getMessage();
}
\`\`\`

## 📝 Quiz Singkat
Mengapa fitur Transaksi (Transactions) sangat wajib digunakan dalam fitur Checkout E-Commerce? (Petunjuk: Ada hubungannya dengan tabel stok barang dan tabel tagihan).
`,
    level: 'expert',
    order: 8,
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: 'php-db-09',
    user_type: 'student',
    language: 'php',
    title: 'Konsep Soft Deletes & Audit Trails',
    description: 'Praktik industri backend: Jangan pernah pakai perintah DELETE secara fisik.',
    content: `# 🗑️ Modul 9: Soft Deletes

Di dunia *backend* tingkat industri, kita diharamkan untuk menghapus data secara fisik dari tabel menggunakan sintaks \`DELETE FROM\`. Mengapa?
1. Untuk history pelacakan data (*Audit*).
2. Jika terhapus tidak sengaja, sangat sulit dipulihkan (*Restore*).

Solusinya: **Soft Delete**.

## 1. Menambahkan Kolom Timestamp
Di tabel MySQL, tambahkan kolom baru \`deleted_at\` dengan tipe data \`DATETIME\`, default nilainya adalah \`NULL\`.

## 2. Cara Kerja Soft Delete di PHP

\`\`\`php
<?php
require 'koneksi.php';

// === PROSES MENGHAPUS (Soft Delete) ===
// Kita TIDAK menggunakan DELETE, tapi UPDATE kolom deleted_at menjadi waktu saat ini
\$id_hapus = 5;
\$sql_hapus = "UPDATE produk SET deleted_at = NOW() WHERE id = ?";
\$stmt_hapus = \$pdo->prepare(\$sql_hapus);
\$stmt_hapus->execute([\$id_hapus]);

echo "Produk dimasukkan ke tong sampah (Soft Deleted).<br>";


// === PROSES MENAMPILKAN DATA (Read) ===
// Wajib tambahkan kondisi WHERE deleted_at IS NULL agar produk yang "terhapus" tidak muncul di web
\$sql_tampil = "SELECT * FROM produk WHERE deleted_at IS NULL";
\$stmt_tampil = \$pdo->query(\$sql_tampil);
\$produk_aktif = \$stmt_tampil->fetchAll();

echo "Jumlah produk aktif: " . count(\$produk_aktif);
\`\`\`

## ✍️ Latihan (20 Menit)
1. Buat sistem "Trash Bin" (Tong Sampah) untuk aplikasi.
2. Buat query SQL di PHP untuk menampilkan khusus produk-produk yang *sudah dihapus* saja (*hint*: kebalikan dari \`IS NULL\` adalah \`IS NOT NULL\`).
3. Sediakan fitur tombol "Restore", yang jika diklik akan meng-update kolom \`deleted_at\` kembali menjadi \`NULL\`.
`,
    level: 'expert',
    order: 9,
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: 'php-db-10',
    user_type: 'student',
    language: 'php',
    title: 'Arsitektur Clean Code: Repository Pattern',
    description: 'Pemisahan logika SQL (Query) dari Controller/HTML untuk kode yang mudah di-maintain.',
    content: `# 🏗️ Modul 10: Repository Pattern

Kalau proyekmu sudah sangat besar, menaruh kode \`\$pdo->query()\` di dalam file HTML akan membuatnya sangat berantakan (disebut *Spaghetti Code*).

*Programmer Backend Pro* memisahkan semua interaksi database ke dalam sebuah *Class* khusus. Inilah **Repository Pattern**.

## 1. Implementasi Repository Class

\`\`\`php
<?php
// file: UserRepository.php
class UserRepository {
    // Injeksi objek PDO ke dalam class
    public function __construct(private PDO \$db) {}

    public function getAllActiveUsers(): array {
        \$stmt = \$this->db->query("SELECT * FROM users WHERE status = 'active'");
        return \$stmt->fetchAll();
    }

    public function findById(int \$id): ?array {
        \$stmt = \$this->db->prepare("SELECT * FROM users WHERE id = ?");
        \$stmt->execute([\$id]);
        \$result = \$stmt->fetch();
        // Return null jika false
        return \$result ?: null;
    }

    public function create(string \$nama, string \$email): bool {
        \$stmt = \$this->db->prepare("INSERT INTO users (nama, email) VALUES (?, ?)");
        return \$stmt->execute([\$nama, \$email]);
    }
}
\`\`\`

## 2. Penggunaan di File Tampilan (View / Controller)

\`\`\`php
<?php
// file: index.php
require 'koneksi.php'; // inisiasi $pdo
require 'UserRepository.php';

// Injeksi $pdo ke Repository
\$userRepo = new UserRepository(\$pdo);

// Kode di halaman ini jadi SANGAT BERSIH dan mudah dibaca!
\$aktifUsers = \$userRepo->getAllActiveUsers();
\$detailBudi = \$userRepo->findById(1);

// Mau bikin user baru?
// \$userRepo->create("Siska", "siska@mail.com");

foreach (\$aktifUsers as \$u) {
    echo "<li>" . htmlspecialchars(\$u['nama']) . "</li>";
}
\`\`\`

## 🎯 Target Kompetensi
Dengan memakai *Repository Pattern*, jika suatu hari bos-mu minta pindah *database* dari MySQL ke PostgreSQL, kamu cuma perlu ngubah kode di dalam \`UserRepository.php\`. File HTML (*front-end*)-nya nggak perlu diotak-atik sama sekali!
`,
    level: 'expert',
    order: 10,
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: 'php-db-11',
    user_type: 'student',
    language: 'php',
    title: 'Masalah Performa: Mengatasi N+1 Query Problem',
    description: 'Studi kasus umum di backend yang membunuh performa aplikasi dan cara mengatasinya dengan Eager Loading mentah.',
    content: `# 🐌 Modul 11: N+1 Query Problem

Ini adalah penyebab 90% website PHP menjadi lemot (lambat) saat data mulai membesar.

## 1. Analisis Bencana N+1
Misal kita ingin menampilkan daftar Penulis beserta data detail Artikel-nya.
❌ **Cara Pemula (N+1 Problem):**
1. Tarik semua penulis -> (1 Query awal).
2. Melakukan looping PHP per-penulis.
3. Di dalam loop, tarik data artikel -> (N kali Query tambahan).

Jika ada 100 penulis, script ini akan memanggil **101 Query** ke *database* MySQL secara berurutan. Ini SANGAT LAMBAT.

## 2. Solusi: Eager Loading dengan IN Clause
Ambil semuanya dalam 2 langkah saja!

\`\`\`php
<?php
require 'koneksi.php';

// Langkah 1: Tarik semua penulis (1 Query)
\$stmtUsers = \$pdo->query("SELECT id, nama FROM users LIMIT 10");
\$users = \$stmtUsers->fetchAll();

// Jika kosong, stop.
if (empty(\$users)) exit;

// Ekstrak semua ID penulis menggunakan fungsi sakti array_column
\$userIds = array_column(\$users, 'id'); 
// Hasilnya: [1, 2, 3, 4, 5...]

// Buat tanda tanya (?) sebanyak jumlah ID secara dinamis
\$placeholders = str_repeat('?,', count(\$userIds) - 1) . '?';

// Langkah 2: Tarik semua artikel milik penulis-penulis tersebut SEKALIGUS (1 Query pakai fitur IN)
\$sqlArtikel = "SELECT * FROM artikel WHERE user_id IN (\$placeholders)";
\$stmtArtikel = \$pdo->prepare(\$sqlArtikel);
\$stmtArtikel->execute(\$userIds);
\$semuaArtikel = \$stmtArtikel->fetchAll();

// Langkah 3: Gabungkan datanya di memori PHP (Bukan di Database)
// Membuat index dictionary agar mappingnya secepat O(1)
\$artikelMap = [];
foreach (\$semuaArtikel as \$art) {
    \$artikelMap[\$art['user_id']][] = \$art; // Dikelompokkan by user_id
}

// Hasil Akhir (Render ke HTML)
foreach (\$users as \$u) {
    echo "<h3>" . htmlspecialchars(\$u['nama']) . "</h3>";
    
    // Cari artikelnya dari Map Memory yang sudah kita susun tadi
    \$artikelUserIni = \$artikelMap[\$u['id']] ?? [];
    
    echo "<ul>";
    foreach (\$artikelUserIni as \$a) {
        echo "<li>" . htmlspecialchars(\$a['judul']) . "</li>";
    }
    echo "</ul>";
}
\`\`\`
**Kesimpulan:** Apapun kondisinya, entah ada 100 atau 10.000 penulis, kode di atas **tetap hanya menjalankan 2 Query ke MySQL**. *Mind-blowing*, kan?
`,
    level: 'expert',
    order: 11,
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: 'php-db-12',
    user_type: 'student',
    language: 'php',
    title: 'Manajemen Jutaan Data (Memory Optimization)',
    description: 'Mengolah ekspor data besar tanpa membuat RAM Server meledak menggunakan Buffered Queries & Generators.',
    content: `# 🧠 Modul 12: Memory Optimization (Big Data)

Bayangkan fitur: "Export Laporan Penjualan 5 Tahun ke Excel". Baris di tabel MySQL ada 5.000.000 baris.
Jika kamu memakai \`\$stmt->fetchAll()\`, PHP akan mencoba menyedot 5 juta data tersebut dan merubahnya menjadi Array sekaligus di dalam RAM Server. Hasilnya? **Fatal Error: Allowed memory size exhausted!**

## Solusi: Tarik Data Satu-Satu pakai While Loop (Unbuffered/Lazy)

Fungsi \`fetch()\`, dipadukan dengan loop \`while\` akan mengambil data satu per satu dari antrean MySQL, memprosesnya di memori PHP, lalu membuangnya sebelum mengambil baris berikutnya. 

\`\`\`php
<?php
require 'koneksi.php';

// Buka file tujuan untuk ditulis secara streaming (menulis bertahap)
\$file = fopen('laporan_besar.csv', 'w');

// Tambahkan header CSV
fputcsv(\$file, ['ID Transaksi', 'Total', 'Tanggal']);

\$stmt = \$pdo->query("SELECT id, total_harga, created_at FROM pesanan");

// Selama masih ada baris yang bisa ditarik, masukkan ke variabel \$row
// Begitu tabel habis, \$row bernilai false, loop berhenti.
while (\$row = \$stmt->fetch()) {
    
    // Tulis 1 baris tersebut langsung ke file CSV (Harddisk)
    fputcsv(\$file, [
        \$row['id'], 
        \$row['total_harga'], 
        \$row['created_at']
    ]);
    
    // Memori \$row langsung bersih dan siap menampung baris berikutnya!
}

fclose(\$file);
echo "Berhasil Export Jutaan Data tanpa membebani RAM!";
\`\`\`

## 📝 Quiz Singkat
Dalam kondisi apa fungsi \`fetchAll()\` boleh digunakan dengan aman? (Hint: Berhubungan dengan teknik *Pagination* yang membatasi *output* hanya 10-50 baris per halaman).
`,
    level: 'expert',
    order: 12,
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: 'php-db-13',
    user_type: 'student',
    language: 'php',
    title: 'Studi Kasus Arsitektur Database: E-Commerce',
    description: 'Merancang Skema Tabel (Entity Relationship) yang kokoh untuk sistem Toko Online.',
    content: `# 🛒 Modul 13: Schema Architecture (E-Commerce)

Pemrograman *Backend* bukan sekadar ngoding, tapi **Merancang Struktur Data**. Kalau tabel *database*-nya ngawur, kodenya bakal penuh *bug* sampai kiamat.

Berikut ini adalah Standar Industri untuk struktur *database E-Commerce* (Toko Online).

## 1. Desain Relasi Tabel Inti

1. **Tabel \`users\`** (Pembeli & Admin)
   - \`id\` (PK)
   - \`nama\`
   - \`email\`

2. **Tabel \`products\`** (Barang Jualan)
   - \`id\` (PK)
   - \`nama\`
   - \`harga\`
   - \`stok\`

3. **Tabel \`orders\`** (Faktur Pembelian Keseluruhan)
   - \`id\` (PK)
   - \`user_id\` (FK) -> Siapa pembelinya.
   - \`tanggal\`
   - \`status_pembayaran\`
   - \`total_tagihan\` -> Penting dicatat mati di sini, karena harga *product* suatu saat bisa naik/berubah.

4. **Tabel \`order_items\`** (Rincian Barang per Faktur)
   - \`id\` (PK)
   - \`order_id\` (FK) -> Masuk ke faktur yang mana.
   - \`product_id\` (FK) -> Barang apa yang dibeli.
   - \`harga_saat_beli\` -> Wajib ada! Merekam harga saat itu juga.
   - \`qty\` (Jumlah barang yang dibeli).

---

## 2. Kenapa Butuh Tabel \`order_items\`?
Karena ini relasi **Many-to-Many**. Satu *Order* bisa berisi banyak *Product*. Satu *Product* bisa dibeli di banyak *Order*. Relasi Many-to-Many WAJIB diselesaikan dengan memunculkan tabel perantara (Tabel *Pivot/Junction*), yaitu \`order_items\`.

## ✍️ Tantangan Pengembangan (Database Simulation)
Gunakan kode Transaction (Modul 8). Buat skrip simulasi proses Checkout!
Langkahnya:
1. \`BEGIN TRANSACTION\`.
2. Insert 1 baris ke tabel \`orders\` (Ambil ID barunya pakai \`\$pdo->lastInsertId()\`).
3. Looping isi keranjang, Insert ke tabel \`order_items\` menggunakan ID Order tadi.
4. Di dalam loop yang sama, jalankan query \`UPDATE products SET stok = stok - ?\` untuk mengurangi stok fisiknya.
5. Jika ada stok yang kurang dari 0, lempar *Exception*.
6. \`COMMIT\`. Jika *Exception*, maka \`ROLLBACK\`.
`,
    level: 'expert',
    order: 13,
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: 'php-db-14',
    user_type: 'student',
    language: 'php',
    title: 'Keamanan Lanjut: SQL Modes & Strict Data',
    description: 'Menjinakkan MySQL Strict Mode dan memahami bahaya Insecure Direct Object Reference (IDOR).',
    content: `# 🔒 Modul 14: Security Level 2 (IDOR & Strict Mode)

Mencegah SQL Injection itu syarat minimal (Wajib pakai Prepared Statement). Di level industri, ada celah lain yang sering jebol!

## 1. IDOR (Insecure Direct Object Reference)
Celah logika di mana *hacker* memanipulasi parameter URL.
Misal URL web kamu: \`edit_profil.php?user_id=5\`.
*Hacker* iseng mengganti angka 5 menjadi 1 (ID milik Admin).

❌ **Kode Rentan:**
\`\`\`php
\$id = \$_GET['user_id'];
\$stmt = \$pdo->prepare("UPDATE users SET password = 'hacked' WHERE id = ?");
\$stmt->execute([\$id]); // Boom! Password admin keganti.
\`\`\`

✅ **Kode Aman (Verifikasi Kepemilikan Sesi):**
Jangan percaya URL. Selalu cek apakah ID yang ada di URL adalah miliknya sendiri (cocokkan dengan \`\$_SESSION\`), KECUALI dia adalah *superadmin*.

\`\`\`php
session_start();
\$id_target = (int) \$_GET['user_id'];
\$id_login = \$_SESSION['login_user_id'];
\$role = \$_SESSION['role'];

if (\$id_target !== \$id_login && \$role !== 'admin') {
    http_response_code(403);
    exit("FORBIDDEN: Anda tidak berhak mengubah profil orang lain!");
}
// Lanjut update...
\`\`\`

---

## 2. MySQL Strict Mode
Secara *default*, MySQL kadang terlalu "baik hati". Kalau kamu masukin teks yang kepanjangan (kolom dibatasi 50 huruf, tapi kamu masukin 60), MySQL lawas akan memotongnya diam-diam tanpa kasih pesan *error*. Ini bahaya karena data terpotong (Korupsi Data).

Selalu pastikan *SQL Mode* server-mu dalam keadaan \`STRICT_TRANS_TABLES\`. Di PHP PDO, tangani dengan validasi panjang teks *backend* sebelum dikirim ke MySQL.

\`\`\`php
// Contoh validasi mentah di PHP
if (strlen(\$_POST['username']) > 50) {
    throw new Exception("Karakter username terlalu panjang.");
}
\`\`\`
`,
    level: 'expert',
    order: 14,
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: 'php-db-15',
    user_type: 'student',
    language: 'php',
    title: 'Database Performance: EXPLAIN & Indexing',
    description: 'Bukan kode PHP-nya yang lambat, tapi Struktur Tabelnya! Memahami kekuatan INDEX di MySQL.',
    content: `# 🚀 Modul 15: Indexing (Turbo Charge Your DB)

Ada kalanya kode PHP kamu sudah sangat efisien, tanpa N+1 *Problem*, tapi waktu di-*load* masih butuh 5 detik. Biasanya masalahnya ada di **Query MySQL yang butuh Tuning**.

## 1. Analisis Lambat dengan EXPLAIN
Taruh perintah \`EXPLAIN\` sebelum query \`SELECT\` kamu di aplikasi MySQL Client (PHPMyAdmin/DBeaver) untuk melihat "Cara Kerja" mesin MySQL mencari datamu.

\`\`\`sql
EXPLAIN SELECT * FROM users WHERE email = 'budi@mail.com';
\`\`\`
Jika hasil pada kolom **"type"** bertuliskan **ALL**, itu berarti *bencana*. Artinya MySQL membaca satu per satu (Linear Search) dari baris ke-1 sampai ke-sejuta untuk mencari *email* tersebut (*Table Scan*).

## 2. Magic bernama INDEX
*Index* (Indeks) mirip seperti Daftar Isi di sebuah buku tebal. Daripada kamu membalik halaman satu per satu (*Table Scan*), kamu melihat Daftar Isi dan langsung menuju halaman yang dituju. (Meningkatkan performa dari \`O(N)\` menjadi \`O(log N)\`).

\`\`\`sql
-- Tambahkan INDEX pada kolom email
ALTER TABLE users ADD INDEX idx_email (email);
\`\`\`

Jalankan kembali query \`EXPLAIN\`. Kolom "type" sekarang berubah menjadi **ref** (Referenced). Pencarian yang tadinya butuh 2 detik, sekarang selesai dalam 0.001 detik!

## 3. Kapan Harus Bikin Index?
JANGAN berikan *Index* ke semua kolom (Bikin ukuran *Database* membengkak dan memperlambat proses \`INSERT\`).
Berikan *Index* **HANYA** pada:
1. Kolom yang sering dipakai di dalam klausa \`WHERE\`. (Contoh: \`status\`, \`email\`).
2. Kolom yang sering dipakai untuk \`JOIN\` / Foreign Keys (Contoh: \`user_id\`).
3. Kolom yang sering dipakai untuk mengurutkan (\`ORDER BY\`).

## 🏆 Kesimpulan PHP & Database Mastery
Selamat! Anda baru saja menyelami *best practice* level Senior Backend Developer. Mulai dari koneksi aman pakai **PDO**, relasi **JOIN**, manipulasi miliaran data via **Generator**, keamanan ketat memblokir **SQL Injection & IDOR**, hingga meracik resep performa gila via **Indexing**. 

Selamat membangun *Web Backend* raksasa pertamamu!
`,
    level: 'expert',
    order: 15,
    created_at: '2025-01-01T00:00:00Z'
  }
];