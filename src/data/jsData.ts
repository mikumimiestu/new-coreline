import { LearningMaterial } from '../types/learning';

export const MOCK_MATERIALS: LearningMaterial[] = [
  // ==================== JAVASCRIPT CORE MATERIALS ====================
  {
    id: 'js-01',
    user_type: 'student',
    language: 'javascript',
    title: 'Pengenalan JavaScript & Ekosistem Node.js',
    description: 'Arsitektur V8 Engine, Node.js, Manajemen Paket (npm), dan Setup Proyek Modern.',
    content: `# 🟡 Modul 1: JS Deep Dive & Professional Setup

## 1. Filosofi & Ekosistem JavaScript
JavaScript (JS) diciptakan oleh **Brendan Eich** dalam 10 hari pada tahun 1995. Awalnya hanya untuk browser, kini dengan adanya **Node.js** (berbasis V8 Engine dari Google), JS bisa berjalan di server, mobile, hingga IoT.

JS menggunakan sifat **Single-threaded, Non-blocking, Asynchronous**.

---

## 2. Setup Lingkungan Kerja Profesional
Di industri, kita menggunakan **Node.js** dan **npm (Node Package Manager)** untuk mengatur proyek.

**Workflow Eksekusi:**
1. **Inisialisasi Proyek:** \`mkdir belajar_js && cd belajar_js\`
2. **Buat file package.json:** \`npm init -y\` (Ini seperti "KTP" proyekmu).
3. **Manajemen Paket:** - Install dependency: \`npm install nodemon --save-dev\` (tool agar auto-restart saat kode diubah).
4. **Jalankan script:** Tambahkan \`"start": "node main.js"\` di package.json.

---

## 3. Menulis Kode Pertama (Modern ES6+)
Kita sudah meninggalkan \`var\`. Sekarang standar industri adalah menggunakan \`const\` dan ES6 Modules (opsional, tambahkan \`"type": "module"\` di package.json).

\`\`\`javascript
// file: index.js
const main = () => {
  const user = "Developer";
  console.log(\`System Active. Welcome, \${user}!\`);
};

// Cek apakah file ini dijalankan langsung
if (require.main === module) {
  main();
}
\`\`\`

---

## 📝 Quiz Singkat
1. Apa fungsi dari \`package.json\` dalam sebuah proyek Node.js?
2. Mengapa Node.js disebut *non-blocking*?

## ✍️ Latihan (15 Menit)
1. Buat folder baru, inisialisasi npm (\`npm init -y\`).
2. Buat file \`index.js\`, tulis fungsi sederhana yang menyapa nama Anda.
3. Jalankan file tersebut dari terminal menggunakan \`node index.js\`.

## 🎯 Target Kompetensi
- Paham konsep dasar ekosistem Node.js.
- Mampu setup proyek JS berbasis npm.
`,
    level: 'beginner',
    order: 1,
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: 'js-02',
    user_type: 'student',
    language: 'javascript',
    title: 'Variables, Data Types & Modern Syntax',
    description: 'Memahami let vs const, Tipe Data Primitif vs Referensi, dan Template Literals.',
    content: `# 🏗️ Modul 2: Data Types & Modern Syntax

## 1. Variabel: Jangan Pakai 'var'!
Di JS modern (ES6+), kita punya aturan ketat:
- **const**: Gunakan ini *secara default*. Nilainya tidak bisa di-*reassign* (diisi ulang).
- **let**: Gunakan ini *hanya* jika nilainya pasti akan berubah (misal: di dalam loop).
- **var**: **Tinggalkan!** Bikin pusing karena masalah *Hoisting* dan *Scope*.

---

## 2. Primitives vs Reference Types
Ini sering jadi pertanyaan *interview*:
- **Primitif** (\`String\`, \`Number\`, \`Boolean\`, \`Undefined\`, \`Null\`): Disalin berdasarkan nilainya (*Pass by Value*).
- **Referensi** (\`Object\`, \`Array\`, \`Function\`): Disalin berdasarkan alamat memorinya (*Pass by Reference*).

\`\`\`javascript
// Bukti Reference Type
const userA = { nama: "Budi" };
const userB = userA; 

userB.nama = "Andi";
console.log(userA.nama); // Output: Andi (Ikut berubah karena memorinya sama!)
\`\`\`

---

## 3. Template Literals & Destructuring
Manipulasi string terbaik menggunakan *Template Literals* (menggunakan backtick).

\`\`\`javascript
const salary = 15500000;
// Format angka ke format Rupiah standar
const formatRupiah = new Intl.NumberFormat('id-ID', {
  style: 'currency', currency: 'IDR'
}).format(salary);

console.log(\`Gaji bulanan lo: \${formatRupiah}\`);

// Object Destructuring (Biar nggak ngetik panjang-panjang)
const config = { host: 'localhost', port: 8080 };
const { host, port } = config; 
console.log(\`Running on \${host}:\${port}\`);
\`\`\`

---

## 📝 Quiz Singkat
1. Apa yang terjadi jika kita mencoba mengubah isi array yang dideklarasikan dengan \`const\`?
2. Kapan waktu yang tepat menggunakan \`let\` dibandingkan \`const\`?

## ✍️ Latihan (20 Menit)
1. Buat program sederhana untuk menghitung BMI.
2. Gunakan tipe data referensi (Object) untuk menyimpan berat dan tinggi.
3. Buat string menggunakan *Template Literal* yang menyebutkan status obesitas/normal.
`,
    level: 'beginner',
    order: 2,
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: 'js-03',
    user_type: 'student',
    language: 'javascript',
    title: 'Control Flow, Ternary & Short-Circuiting',
    description: 'Switch-case, Ternary Operator, Optional Chaining (?.), dan Nullish Coalescing (??).',
    content: `# 🧠 Modul 3: Control Flow & Logic

## 1. Ternary Operator (If-Else 1 Baris)
Sangat berguna untuk menyederhanakan kode.

\`\`\`javascript
const nilai = 85;
// if-else panjang:
let status;
if (nilai >= 75) status = "Lulus"; else status = "Gagal";

// Cara Pro (Ternary):
const statusPro = nilai >= 75 ? "Lulus" : "Gagal";
console.log(statusPro);
\`\`\`

---

## 2. Modern Logic: Optional Chaining (?.) & Nullish Coalescing (??)
Sering kita dapat data dari API yang tidak lengkap dan bikin aplikasi *crash*. Ini solusinya:

\`\`\`javascript
const user = {
  id: 1,
  profile: {
    // email: "user@mail.com" // anggap email ini tidak ada dari DB
  }
};

// ❌ Cara Lama (Rawan Crash / Uncaught TypeError)
// const email = user.profile.email.toLowerCase(); 

// ✅ Cara Modern (Optional Chaining)
// Kalau email undefined, dia berhenti dan gak error.
const email = user.profile?.email?.toLowerCase(); 

// Nullish Coalescing (??)
// Berikan nilai default JIKA data sebelah kirinya null / undefined.
const username = user.profile?.name ?? "Guest User";
console.log(username); // Output: Guest User
\`\`\`

---

## 3. Looping: for...of vs for...in
Jangan pakai \`for (let i = 0; ...)\` lagi jika tidak perlu *index*.
- **for...of**: Untuk iterasi Array.
- **for...in**: Untuk iterasi *keys* pada Object.

\`\`\`javascript
const tags = ['js', 'web', 'api'];
for (const tag of tags) {
  console.log(\`Tag: \${tag}\`);
}
\`\`\`

---

## ✍️ Latihan (20 Menit)
1. Buat object \`mahasiswa\` dengan *nested object* \`alamat.kota\`.
2. Hapus \`kota\`, lalu gunakan *Optional Chaining* dan *Nullish Coalescing* untuk mengamankan kodenya agar jika kota tidak ada, kembalikan string "Kota Tidak Diketahui".
`,
    level: 'intermediate',
    order: 3,
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: 'js-04',
    user_type: 'student',
    language: 'javascript',
    title: 'Struktur Data Lanjut: Array Methods Mastery',
    description: 'High Order Array Methods: Map, Filter, Reduce, dan Spread Operator.',
    content: `# 🧱 Modul 4: Data Structures & Array Methods

Programmer JS sejati sangat jarang menggunakan loop manual (\`for\` atau \`while\`) untuk memanipulasi data. Mereka menggunakan *High-Order Methods*.

## 1. Map, Filter, Reduce (Holy Trinity)

\`\`\`javascript
const products = [
  { name: 'Laptop', price: 15000, category: 'Tech' },
  { name: 'Mouse', price: 500, category: 'Tech' },
  { name: 'Buku', price: 100, category: 'Stationery' }
];

// 1. FILTER: Ambil yang kategorinya Tech saja
const techProducts = products.filter(p => p.category === 'Tech');

// 2. MAP: Modifikasi datanya (misal: tambah diskon)
const discounted = techProducts.map(p => ({
  name: p.name,
  price: p.price * 0.9 // Diskon 10%
}));

// 3. REDUCE: Hitung total harga
const totalBelanja = discounted.reduce((total, p) => total + p.price, 0);

console.log(totalBelanja); // Output: 13950
\`\`\`

---

## 2. Spread Operator (...)
Cara paling bersih untuk *copy* atau menggabungkan object/array tanpa merusak aslinya (Immutability).

\`\`\`javascript
const defaultTheme = { mode: 'light', font: 'Arial' };
const userTheme = { mode: 'dark' };

// Gabungkan object (yang kanan menimpa yang kiri)
const finalConfig = { ...defaultTheme, ...userTheme };
console.log(finalConfig); // { mode: 'dark', font: 'Arial' }

const arr1 = [1, 2];
const arr2 = [...arr1, 3, 4]; // [1, 2, 3, 4]
\`\`\`

---

## 📝 Quiz Singkat
1. Apa perbedaan output dari method \`.map()\` dan \`.filter()\`?
2. Mengapa \`.reduce()\` membutuhkan argumen angka \`0\` di bagian akhir parameternya?

## ✍️ Latihan (20 Menit)
1. Diberikan array kotor berisi angka dan string: \`[1, "2", "halo", 3, 4]\`.
2. Gunakan \`.filter()\` untuk membuang semua data ber-tipe string (gunakan \`typeof\`).
3. Gunakan \`.reduce()\` untuk menjumlahkan semua angka yang tersisa.
`,
    level: 'intermediate',
    order: 4,
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: 'js-05',
    user_type: 'student',
    language: 'javascript',
    title: 'Advanced Functions: Arrow, Closures & Callbacks',
    description: 'First-class citizens, Arrow Functions, Lexical Scope, dan teknik Currying/Closures.',
    content: `# ⚙️ Modul 5: Advanced Functions (Expert Core)

Di JavaScript, fungsi adalah *First-Class Citizens* (Bisa disimpan di variabel, dilempar ke fungsi lain, atau di-*return* dari fungsi).

## 1. Arrow Functions (=>)
Lebih pendek dan mengikat konteks \`this\` (lexical scope) dari tempat ia dideklarasikan.

\`\`\`javascript
// Function biasa
function tambah(a, b) {
  return a + b;
}

// Arrow function (Implicit return jika satu baris)
const tambahPro = (a, b) => a + b;
\`\`\`

---

## 2. Closures (Teknik Tingkat Dewa)
Closure adalah kemampuan sebuah fungsi untuk "mengingat" variabel di scope luarnya, meskipun fungsi luar tersebut sudah selesai dijalankan. Sangat berguna untuk *Data Privacy*.

\`\`\`javascript
function createCounter() {
  let count = 0; // Variabel ini "tersembunyi" (Private)

  return {
    increment: () => {
      count++;
      return count;
    },
    decrement: () => {
      count--;
      return count;
    }
  };
}

const myCounter = createCounter();
console.log(myCounter.increment()); // 1
console.log(myCounter.increment()); // 2
console.log(myCounter.count); // undefined (Tidak bisa diakses langsung!)
\`\`\`

---

## 3. Callbacks
Callback adalah fungsi yang dilempar sebagai argumen ke fungsi lain. Biasanya dipakai untuk proses asynchronous dasar.

\`\`\`javascript
const downloadFile = (url, callback) => {
  console.log(\`Mulai download dari \${url}...\`);
  setTimeout(() => {
    callback("File-Isi-Rahasia.pdf"); // Panggil setelah 2 detik
  }, 2000);
};

downloadFile("https://example.com/file", (result) => {
  console.log(\`Download Selesai! Mendapatkan: \${result}\`);
});
\`\`\`

## ✍️ Latihan (30 Menit)
1. Buat sebuah fungsi *Closure* bernama \`createBankAccount(initialBalance)\`.
2. Buat method internal \`deposit(amount)\` dan \`withdraw(amount)\`.
3. Pastikan \`withdraw\` menolak penarikan jika uang tidak cukup, dan saldo tidak bisa diubah langsung dari luar.
`,
    level: 'advanced',
    order: 5,
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: 'js-06',
    user_type: 'student',
    language: 'javascript',
    title: 'OOP Mastery: Classes, Prototypes & The "this" Keyword',
    description: 'Modern ES6 Classes, constructor, encapsulation (Private fields #), dan warisan.',
    content: `# 🏛️ Modul 6: OOP Mastery

JavaScript pada dasarnya berbasis *Prototype*, namun sejak ES6, kita punya *Syntax Sugar* bernama \`class\` yang mirip bahasa OOP tradisional (Java/Python).

## 1. Class & Constructor
\`\`\`javascript
class Karyawan {
  // Private field (Fitur Modern JS)
  #gaji; 

  constructor(nama, gajiAwal) {
    this.nama = nama;
    this.#gaji = gajiAwal;
  }

  // Getter
  get infoGaji() {
    return \`Rp \${this.#gaji}\`;
  }

  // Setter dengan validasi
  set naikGaji(nominal) {
    if (nominal < 0) throw new Error("Gaji tidak bisa minus!");
    this.#gaji += nominal;
  }
}

const staff = new Karyawan("Budi", 5000000);
staff.naikGaji = 1000000;
console.log(staff.infoGaji); // Rp 6000000
// console.log(staff.#gaji); // ERROR! Private field tidak bisa diakses
\`\`\`

---

## 2. Inheritance (Pewarisan)
Gunakan kata kunci \`extends\` dan panggil \`super()\` untuk mengeksekusi constructor milik parent.

\`\`\`javascript
class Manager extends Karyawan {
  constructor(nama, gajiAwal, departemen) {
    super(nama, gajiAwal); // Wajib panggil parent constructor
    this.departemen = departemen;
  }

  // Polymorphism (Override method)
  get infoGaji() {
    return \`[Rahasia Manager] \${super.infoGaji}\`;
  }
}

const bos = new Manager("Siska", 15000000, "IT");
console.log(bos.infoGaji);
\`\`\`

---

## 3. Misteri Keyword 'this'
Di JS, nilai \`this\` ditentukan **BAGAIMANA** fungsi dipanggil, bukan di mana ia dibuat (kecuali Arrow Function).
- Jika dipanggil dari object: \`this\` = object tersebut.
- Arrow function tidak punya \`this\` sendiri, dia minjem dari scope luarnya!

## ✍️ Latihan (30 Menit)
1. Buat class \`Kendaraan\` dengan properti \`merk\` dan \`tahun\`.
2. Buat class turunan \`Mobil\` yang punya method \`startEngine()\`.
3. Gunakan *Private Fields* untuk menyimpan status mesin (hidup/mati).
`,
    level: 'advanced',
    order: 6,
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: 'js-07',
    user_type: 'student',
    language: 'javascript',
    title: 'Exception Handling & Modules',
    description: 'Blok try...catch...finally, Custom Error Object, dan ES6 Export/Import.',
    content: `# 🛡️ Modul 7: Errors & Modules

Aplikasi yang baik tidak akan nge-hang/crash layarnya menjadi putih saat terjadi error, melainkan menangkapnya secara elegan.

## 1. Exception Handling (try-catch)
\`\`\`javascript
const bagiAngka = (a, b) => {
  if (typeof a !== 'number' || typeof b !== 'number') {
    // Melempar Custom Error
    throw new TypeError("Input harus berupa angka!");
  }
  if (b === 0) {
    throw new Error("Tidak bisa dibagi dengan nol!");
  }
  return a / b;
};

try {
  console.log("Mencoba proses...");
  const hasil = bagiAngka(10, 0);
  console.log(hasil); // Baris ini tidak tereksekusi jika error
} catch (error) {
  // Menangkap error dan menampilkannya tanpa nge-crash aplikasi
  console.error(\`🚨 TERJADI KESALAHAN: \${error.message}\`);
} finally {
  console.log("Proses Selesai (Ini selalu jalan).");
}
\`\`\`

---

## 2. Sistem Modul (ES6 Moudles)
Membagi kode ke banyak file agar rapi (*Separation of Concerns*).

**File math.js (Export):**
\`\`\`javascript
export const PI = 3.14159;

export function luasLingkaran(r) {
  return PI * r * r;
}

// Default export (Hanya boleh 1 per file)
export default class Kalkulator {}
\`\`\`

**File main.js (Import):**
\`\`\`javascript
// Import named export (harus pakai kurung kurawal)
import { PI, luasLingkaran } from './math.js';
// Import default export (tanpa kurung kurawal, nama bebas)
import MainKalkulator from './math.js';

console.log(luasLingkaran(10));
\`\`\`
*(Catatan: Di Node.js, pastikan ada \`"type": "module"\` di package.json).*

## ✍️ Latihan (20 Menit)
1. Buat file \`database.js\`, isinya sebuah fungsi yang jika parameter ID kurang dari 0 akan memunculkan Error "ID tidak valid".
2. Di file \`app.js\`, import fungsi tersebut.
3. Gunakan \`try...catch\` di dalam \`app.js\` untuk menjalankan fungsinya.
`,
    level: 'advanced',
    order: 7,
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: 'js-08',
    user_type: 'student',
    language: 'javascript',
    title: 'Asynchronous JS (Promises & Async/Await)',
    description: 'Menjinakkan proses Asynchronous, lepas dari Callback Hell dengan modern Fetch dan Async/Await.',
    content: `# ⚡ Modul 8: Async/Await & Promises

JavaScript itu *Single-Threaded* (cuma punya 1 "tangan" buat kerja). Kalau JS disuruh nunggu *download* file 1GB, aplikasinya nge-*freeze*? TIDAK. JS mendelegasikan tugas I/O ke Browser/Node.js, dan lanjut ke baris berikutnya (*Non-Blocking*).

## 1. Janji Manis (Promises)
Promise adalah objek yang mewakili penyelesaian (atau kegagalan) dari sebuah operasi *asynchronous*.
State-nya ada 3: **Pending**, **Fulfilled** (Berhasil), **Rejected** (Gagal).

\`\`\`javascript
const masakNasi = new Promise((resolve, reject) => {
  const adaBeras = true;
  setTimeout(() => {
    if (adaBeras) resolve("🍚 Nasi Matang!");
    else reject("💥 Beras habis boss!");
  }, 2000);
});

// Cara baca promise model lama (.then/.catch)
masakNasi
  .then((hasil) => console.log(hasil))
  .catch((error) => console.log(error));
\`\`\`

---

## 2. Async / Await (Modern Way)
Di ES8 (2017), kita diperkenalkan dengan \`async/await\`. Kodenya terlihat *synchronous* (berurutan) padahal dia asinkronus! Jauh lebih rapi.

\`\`\`javascript
// Fetch API (Bawaan modern JS untuk request HTTP)
const getUserData = async (userId) => {
  try {
    console.log(\`Fetching data untuk user \${userId}...\`);
    
    // Tunggu sampai fetch selesai
    const response = await fetch(\`https://jsonplaceholder.typicode.com/users/\${userId}\`);
    
    if (!response.ok) throw new Error("Gagal mengambil data");
    
    // Tunggu sampai data di-parse jadi JSON
    const data = await response.json(); 
    console.log(\`✅ Data diterima: \${data.name}\`);
    
  } catch (error) {
    console.error(\`❌ Error: \${error.message}\`);
  }
};

getUserData(1);
\`\`\`

---

## 3. Promise.all()
Kalau punya 3 request yang **TIDAK** saling bergantung, jalanin barengan aja biar ngebut!

\`\`\`javascript
const p1 = fetch('api/data1');
const p2 = fetch('api/data2');
// Tunggu keduanya selesai bersamaan
const [res1, res2] = await Promise.all([p1, p2]);
\`\`\`

## ✍️ Latihan (30 Menit)
1. Buat fungsi \`delay(ms)\` yang mengembalikan sebuah \`Promise\` dan di-*resolve* dengan \`setTimeout\`.
2. Gunakan \`async/await\` untuk memanggil \`delay(2000)\`, lalu cetak "Selesai menunggu 2 detik!".
`,
    level: 'expert',
    order: 8,
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: 'js-09',
    user_type: 'student',
    language: 'javascript',
    title: 'Studi Kasus 1: Node.js CLI File Explorer',
    description: 'Proyek JS Murni: Script utilitas membaca file sistem dengan FS Modul Asynchronous.',
    content: `# 🛠️ Project 1: Asynchronous CLI File Explorer

## 📜 Tujuan
Membangun tool CLI menggunakan Node.js untuk membaca isi direktori secara asynchronous dan menampilkan detail ukuran file (dalam Kilobyte).

## 💻 Implementasi Kode

\`\`\`javascript
import fs from 'fs/promises'; // Gunakan versi Promise dari File System
import path from 'path';

const scanFolder = async (folderPath) => {
  try {
    // 1. Cek apakah folder eksis
    await fs.access(folderPath);
    console.log(\`\\n📂 Scanning direktori: \${folderPath}...\`);

    // 2. Baca isi folder (membaca file dan foldernya)
    const files = await fs.readdir(folderPath);

    if (files.length === 0) {
      console.log("Folder kosong.");
      return;
    }

    // 3. Iterasi dan proses masing-masing item
    for (const file of files) {
      const fullPath = path.join(folderPath, file);
      
      // Ambil detail stat dari file
      const stats = await fs.stat(fullPath);

      if (stats.isDirectory()) {
        console.log(\`[DIR]  📁 \${file}\`);
      } else {
        const sizeInKB = (stats.size / 1024).toFixed(2);
        console.log(\`[FILE] 📄 \${file} (\${sizeInKB} KB)\`);
      }
    }
  } catch (error) {
    if (error.code === 'ENOENT') {
      console.error("❌ Error: Folder tidak ditemukan!");
    } else {
      console.error(\`❌ Terjadi kesalahan: \${error.message}\`);
    }
  }
};

// Eksekusi (Jalankan file ini dengan mengetik 'node main.js ./')
const targetDir = process.argv[2] || './'; 
scanFolder(targetDir);
\`\`\`

---

## ✍️ Tantangan Pengembangan
Modifikasi script ini agar menggunakan \`Promise.all()\` di dalam loop untuk memproses \`fs.stat()\` secara paralel agar jauh lebih cepat ketika memproses ribuan file.
`,
    level: 'expert',
    order: 9,
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: 'js-10',
    user_type: 'student',
    language: 'javascript',
    title: 'Studi Kasus 2: Robust E-Commerce Cart (OOP)',
    description: 'Proyek Final: Menggabungkan ES6 Classes, Map/Reduce, dan Private Fields.',
    content: `# 🛒 Project 2: E-Commerce Cart System

## 📜 Tujuan
Menguji pemahaman *Core JavaScript OOP* dan manipulasi *Array*.

## 💻 Implementasi Kode

\`\`\`javascript
// 1. Class Product
class Product {
  constructor(id, nama, harga) {
    this.id = id;
    this.nama = nama;
    this.harga = harga;
  }
}

// 2. Class CartItem
class CartItem {
  constructor(product, qty) {
    this.product = product;
    this.qty = qty;
  }
  
  get subtotal() {
    return this.product.harga * this.qty;
  }
}

// 3. Class Cart Controller
class ShoppingCart {
  #items = []; // Private field, gak bisa diotak-atik dari luar

  tambahItem(product, qty = 1) {
    const existing = this.#items.find(item => item.product.id === product.id);
    if (existing) {
      existing.qty += qty;
    } else {
      this.#items.push(new CartItem(product, qty));
    }
    console.log(\`✅ \${qty}x \${product.nama} ditambahkan.\`);
  }

  hapusItem(productId) {
    this.#items = this.#items.filter(item => item.product.id !== productId);
    console.log(\`🗑️ Item ID \${productId} dihapus.\`);
  }

  // Menggunakan getter & array method reduce
  get totalHarga() {
    return this.#items.reduce((total, item) => total + item.subtotal, 0);
  }

  cetakStruk() {
    console.log("\\n=== STRUK BELANJA ===");
    this.#items.forEach(item => {
      console.log(\`- \${item.product.nama} x\${item.qty} = Rp \${item.subtotal}\`);
    });
    console.log(\`---------------------\\nTOTAL: Rp \${this.totalHarga}\\n=====================\`);
  }
}

// --- Eksekusi ---
const laptop = new Product(1, "MacBook Pro", 25000000);
const mouse = new Product(2, "Logitech Master", 1500000);

const cartUser = new ShoppingCart();
cartUser.tambahItem(laptop, 1);
cartUser.tambahItem(mouse, 2);

cartUser.cetakStruk();

// Keamanan: Coba retas array item-nya dari luar
// cartUser.#items = []; // ERROR! Private field dilindungi oleh ES6 Engine.
\`\`\`
`,
    level: 'expert',
    order: 10,
    created_at: '2025-01-01T00:00:00Z'
  },
  // ==================== ALGORITHMS & DATA STRUCTURES (JS) ====================
  {
    id: 'js-11',
    user_type: 'student',
    language: 'javascript',
    title: 'Algoritma Pencarian (Searching): Linear & Binary Search',
    description: 'Memahami dasar pencarian data dan optimasi dari O(n) menjadi O(log n) dengan Binary Search.',
    content: `# 🔍 Modul 11: Algoritma Pencarian (Searching)

Dalam pemrograman, menemukan data dengan cepat adalah kunci performa aplikasi. Kita akan bahas dua algoritma utama: **Linear Search** dan **Binary Search**.

## 1. Linear Search (Pencarian Berurutan)
Cara paling sederhana: cek item satu per satu dari awal sampai akhir. JS punya method bawaan untuk ini: \`.indexOf()\` atau \`.find()\`. Kompleksitas O(n).

\`\`\`javascript
const linearSearch = (arr, target) => {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === target) return i;
  }
  return -1; // Tidak ditemukan
};

// Testing
const data = [10, 50, 30, 70, 80, 20];
console.log("Index target 70:", linearSearch(data, 70)); // Output: 3
\`\`\`

---

## 2. Binary Search (Pencarian Bagi Dua)
Cara kerja bagaikan mencari kata di kamus: buka tengahnya, cek apakah kata tersebut ada di paruh kiri atau kanan, lalu ulangi.
- **Syarat Mutlak:** Array **HARUS** sudah dalam keadaan terurut (sorted).
- **Performa:** Sangat cepat! Kompleksitas O(log n).

### Implementasi:
Di JS, pembagian tidak otomatis dibulatkan seperti di Python (//). Kita wajib menggunakan \`Math.floor()\` untuk mendapatkan index tengah.

\`\`\`javascript
const binarySearch = (arr, target) => {
  let kiri = 0;
  let kanan = arr.length - 1;
  
  while (kiri <= kanan) {
    // Bulatkan ke bawah agar bisa jadi index array
    let tengah = Math.floor((kiri + kanan) / 2);
    
    if (arr[tengah] === target) {
      return tengah; // Ketemu!
    } else if (arr[tengah] < target) {
      kiri = tengah + 1; // Buang paruh kiri
    } else {
      kanan = tengah - 1; // Buang paruh kanan
    }
  }
  return -1;
};

// Testing (Pastikan data terurut!)
const dataTerurut = [10, 20, 30, 50, 70, 80];
console.log("Index target 70:", binarySearch(dataTerurut, 70)); // Output: 4
\`\`\`

## ✍️ Latihan (20 Menit)
1. Bikin list angka urut dari 1 sampai 1.000.000 menggunakan \`Array.from()\`.
2. Gunakan fungsi \`binarySearch\` untuk mencari angka \`999999\`. Catat \`console.time('binary')\` untuk melihat betapa super kilat algoritma ini dieksekusi oleh mesin V8!
`,
    level: 'intermediate',
    order: 11,
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: 'js-12',
    user_type: 'student',
    language: 'javascript',
    title: 'Algoritma Pengurutan Dasar (Basic Sorting)',
    description: 'Mempelajari algoritma sorting sederhana: Bubble Sort dan Selection Sort (O(n^2)).',
    content: `# 📊 Modul 12: Pengurutan Dasar (Basic Sorting)

Sebelum masuk ke algoritma kompleks, bro harus paham dulu dasar-dasar memindahkan posisi elemen di memori. Ini krusial buat ngebangun nalar *logic*.

## 1. Bubble Sort (Gelembung)
Membandingkan elemen bersebelahan dan menukarnya jika salah urutan. Elemen terbesar "menggelembung" ke paling kanan.

\`\`\`javascript
const bubbleSort = (arr) => {
  const n = arr.length;
  for (let i = 0; i < n; i++) {
    let swapped = false;
    
    // Kurangi i di loop kedua, karena i elemen terakhir sudah pasti terurut
    for (let j = 0; j < n - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        // Swap menggunakan Destructuring JS
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        swapped = true;
      }
    }
    // Jika dalam 1 putaran tidak ada yang ditukar, berarti array sudah urut
    if (!swapped) break;
  }
  return arr;
};

console.log("Bubble Sort:", bubbleSort([64, 34, 25, 12, 22, 11, 90]));
\`\`\`

---

## 2. Selection Sort (Pemilihan)
Mencari nilai paling kecil di bagian array yang belum terurut, lalu menaruhnya di batas kiri.

\`\`\`javascript
const selectionSort = (arr) => {
  const n = arr.length;
  for (let i = 0; i < n; i++) {
    let minIdx = i;
    
    // Cari yang lebih kecil di sisi kanan
    for (let j = i + 1; j < n; j++) {
      if (arr[j] < arr[minIdx]) {
        minIdx = j;
      }
    }
    
    // Tukar posisinya
    if (minIdx !== i) {
      [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
    }
  }
  return arr;
};

console.log("Selection Sort:", selectionSort([29, 10, 14, 37, 14]));
\`\`\`

## ✍️ Latihan (20 Menit)
1. Modifikasi script \`bubbleSort\` agar menerima 1 parameter tambahan \`isAscending\` berjenis boolean.
2. Jika true, urutkan dari kecil ke besar. Jika false, dari besar ke kecil (Ubah logika pembandingnya \`>\` jadi \`<\`).
`,
    level: 'intermediate',
    order: 12,
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: 'js-13',
    user_type: 'student',
    language: 'javascript',
    title: 'Advanced Sorting: Divide & Conquer (Quick Sort)',
    description: 'Menguasai paradigma Divide and Conquer dengan Quick Sort (O(n log n)).',
    content: `# 🚀 Modul 13: Advanced Sorting (Divide & Conquer)

Algoritma dasar \`O(n^2)\` terlalu lambat untuk jutaan data. Solusinya? **Divide and Conquer**. Algoritma ini akan memecah data besar jadi fragmen kecil lalu dieksekusi secara rekursif. Mari kita bedah **Quick Sort**.

## 1. Memahami Logika Quick Sort
Pilih 1 elemen sebagai **Pivot**. Buat 2 grup: Grup Kiri (lebih kecil dari pivot) dan Grup Kanan (lebih besar dari pivot). Rekursi kedua grup, lalu gabungkan: \`Kiri + Pivot + Kanan\`.

### Implementasi Modern (ES6 Filter & Spread)
Cara ini elegan walau agak boros memori karena kita terus membuat Array baru dengan \`.filter()\`.

\`\`\`javascript
const quickSort = (arr) => {
  // Base case: Array isi 1 atau 0 sudah pasti terurut
  if (arr.length <= 1) {
    return arr;
  }

  // Pilih elemen terakhir sebagai Pivot, dan keluarkan dari array
  const pivot = arr.pop();
  
  // Pisahkan menggunakan filter()
  const lebihKecil = arr.filter(x => x <= pivot);
  const lebihBesar = arr.filter(x => x > pivot);
  
  // Panggil ulang, lalu gabung pakai Spread Operator
  return [...quickSort(lebihKecil), pivot, ...quickSort(lebihBesar)];
};

// Ingat: .pop() itu memanipulasi array asli, jadi kita lempar hasil copian-nya aja
const dataMentah = [33, 10, 55, 71, 29, 99, 14];
const hasilSort = quickSort([...dataMentah]); 

console.log(\`Data Awal: \${dataMentah}\`);
console.log(\`Hasil Quick Sort: \${hasilSort}\`);
\`\`\`

---

## 2. Bagaimana dengan JS built-in \`.sort()\`?
PENTING BRO! Jika lo pakai \`arr.sort()\` di JS tanpa parameter, JS akan mengubah semua angka menjadi **String** dan mengurutkannya sesuai abjad. 
\`[10, 2, 30].sort()\` -> Outputnya \`[10, 2, 30]\` (salah!).

Cara benernya: \`arr.sort((a, b) => a - b)\`. Ini disebut fungsi *Comparator*. Di balik layar, engine V8 Node.js/Chrome pakai variasi Timsort.

## ✍️ Latihan (30 Menit)
1. Cobalah jalankan program \`[5, 20, 100, 3].sort()\` di JS. Amati error logikanya.
2. Perbaiki fungsi bawaan JS tersebut dengan menambahkan arrow function \`(a, b) => b - a\` untuk mengurutkan secara descending.
`,
    level: 'advanced',
    order: 13,
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: 'js-14',
    user_type: 'student',
    language: 'javascript',
    title: 'Struktur Data Lanjut: Stack & Queue',
    description: 'Membuat tumpukan LIFO (Stack) dan antrean FIFO (Queue) menggunakan Array JS yang dimodifikasi.',
    content: `# 🥞 Modul 14: Stack & Queue

Di JavaScript, tipe data Array punya *method-method* ajaib yang membuatnya bisa berfungsi sebagai Stack maupun Queue.

## 1. Stack (Tumpukan / LIFO)
Aturannya **LIFO** (Last In, First Out). Yang terakhir masuk, yang pertama keluar. Contoh: Tombol Undo.

- **Masuk (Push):** \`.push()\` (nambah ke belakang)
- **Keluar (Pop):** \`.pop()\` (buang dari belakang)

\`\`\`javascript
const stackBrowser = [];

// Navigasi website (Push)
stackBrowser.push("google.com");
stackBrowser.push("youtube.com");
stackBrowser.push("github.com");
console.log("Histori:", stackBrowser);

// Klik tombol 'Back' (Pop)
const halamanTerakhir = stackBrowser.pop();
console.log("Back dari:", halamanTerakhir); // github.com
console.log("Sisa histori:", stackBrowser); // [google, youtube]
\`\`\`

---

## 2. Queue (Antrean / FIFO)
Aturannya **FIFO** (First In, First Out). Yang pertama masuk, dia yang pertama keluar (kayak kasir).

- **Masuk (Enqueue):** \`.push()\` (antre di belakang)
- **Keluar (Dequeue):** \`.shift()\` (panggil yang terdepan)

*Note: Fungsi \`.shift()\` sebenarnya kurang efisien di array super besar (O(n)), tapi untuk aplikasi standar JS, V8 Engine sudah mengoptimasinya.*

\`\`\`javascript
class Queue {
  constructor() {
    this.items = [];
  }
  
  enqueue(elemen) {
    this.items.push(elemen);
  }
  
  dequeue() {
    // Buang item pertama dari array dan kembalikan nilainya
    if(this.isEmpty()) return "Antrean Kosong!";
    return this.items.shift(); 
  }
  
  isEmpty() {
    return this.items.length === 0;
  }
}

const loket = new Queue();
loket.enqueue("Andi");
loket.enqueue("Budi");

console.log(\`Melayani: \${loket.dequeue()}\`); // Melayani: Andi
\`\`\`

## ✍️ Latihan (20 Menit)
1. Buat fungsi \`isBalanced(kurung)\` menggunakan \`Stack\` untuk ngecek tanda kurung. 
   Contoh: \`"{[()]}"\` (Valid/True), \`"{[(])}"\` (Tidak Valid/False).
`,
    level: 'advanced',
    order: 14,
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: 'js-15',
    user_type: 'student',
    language: 'javascript',
    title: 'Graph & Tree Traversal (BFS & DFS)',
    description: 'Merepresentasikan Graph dengan Object List dan menjelajahinya secara rekursif.',
    content: `# 🕸️ Modul 15: Graph, Tree & Traversal

Bagaimana AI Game mencari jalan (*Pathfinding*)? Atau Facebook memberikan rekomendasi "Orang yang Mungkin Anda Kenal"? Di baliknya ada algoritma **Graph**!

## 1. Representasi Graph di JavaScript
Kita merepresentasikan jaringan teman ini menggunakan *Object* (Adjacency List).

\`\`\`javascript
const graphSosmed = {
  'A': ['B', 'C'],
  'B': ['A', 'D', 'E'],
  'C': ['A', 'F'],
  'D': ['B'],
  'E': ['B', 'F'],
  'F': ['C', 'E']
};
\`\`\`

---

## 2. Depth First Search (DFS)
DFS menyelam seru ke ujung cabang sebelum balik lagi. Paling gampang diimplementasikan pakai **Rekursi**.

\`\`\`javascript
// Gunakan JS Set() agar pencarian super cepat (O(1)) dan tidak ada duplikat
const dfs = (graph, start, visited = new Set()) => {
  visited.add(start);
  process.stdout.write(start + " -> "); // Print kesamping di Node.js
  
  for (const tetangga of graph[start]) {
    // Kalau temannya belum dikunjungi, masuk ke profil temannya!
    if (!visited.has(tetangga)) {
      dfs(graph, tetangga, visited);
    }
  }
};

console.log("Jalur DFS:");
dfs(graphSosmed, 'A'); 
// A -> B -> D -> E -> F -> C ->
\`\`\`

---

## 3. Breadth First Search (BFS)
BFS lebih seperti "Cek dulu teman level 1 gue siapa aja, baru lanjut ngecek temannya temen". Ini wajib pakai struktur **Queue**. Sangat bagus untuk rute terpendek!

\`\`\`javascript
const bfs = (graph, start) => {
  const visited = new Set([start]);
  const queue = [start]; // Array sbg Queue
  
  while (queue.length > 0) {
    const nodeSekarang = queue.shift(); // Dequeue (keluar antrean)
    process.stdout.write(nodeSekarang + " -> ");
    
    // Cek semua relasinya
    for (const tetangga of graph[nodeSekarang]) {
      if (!visited.has(tetangga)) {
        visited.add(tetangga);
        queue.push(tetangga); // Enqueue (masuk antrean)
      }
    }
  }
};

console.log("\\n\\nJalur BFS:");
bfs(graphSosmed, 'A'); 
// A -> B -> C -> D -> E -> F ->
\`\`\`

## 🏆 Kesimpulan Algoritma Master
Selesai bro! Penguasaan struktur data dan algoritma fundamental di JavaScript ini ibarat lo udah pegang *black card* di dunia *Programming*. Lo siap bikin *library* lo sendiri atau tembus tes koding perusahaan top!
`,
    level: 'expert',
    order: 15,
    created_at: '2025-01-01T00:00:00Z'
  }
];