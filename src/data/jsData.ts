import type { LearningMaterial } from '../types/learning';

export const MOCK_MATERIALS: LearningMaterial[] = [
  // ==================== JAVASCRIPT MATERIALS ====================
  {
    id: 'js-01',
    user_type: 'student',
    language: 'javascript',
    title: 'Pengenalan JavaScript & Variabel',
    description: 'Sejarah, cara kerja engine, var vs let vs const, dan tipe data.',
    content: `# 🟡 Pengenalan JavaScript

## Apa itu JavaScript?
JavaScript (JS) adalah bahasa pemrograman yang membuat website menjadi **interaktif**.
- **HTML:** Tulang/Struktur.
- **CSS:** Kulit/Tampilan.
- **JS:** Otak/Logika (Animasi, Klik tombol, Ambil data server).

JS adalah bahasa **Interpreted** (dijalankan langsung oleh browser/Node.js) dan **Dynamically Typed** (tipe data bisa berubah).

---

## 1. Menampilkan Output
\`\`\`javascript
console.log("Halo Dunia!"); // Untuk debugging
alert("Selamat Datang!");   // Popup di browser
\`\`\`

## 2. Variabel: let vs const vs var
⚠️ **Lupakan \`var\`!** Di standar modern (ES6), kita hanya menggunakan \`let\` dan \`const\`.

| Keyword | Bisa Diubah? | Scope | Kapan Dipakai? |
|:---|:---:|:---|:---|
| **const** | ❌ Tidak | Block | **Default choice**. Gunakan untuk nilai tetap. |
| **let** | ✅ Ya | Block | Gunakan jika nilai *pasti* akan berubah (loop, counter). |
| **var** | ✅ Ya | Function | **Legacy**. Hindari karena rawan bug (hoisting). |

\`\`\`javascript
const pi = 3.14;
// pi = 3.15; // ❌ Error! Tidak bisa diubah.

let skor = 0;
skor = 10; // ✅ Boleh.

// Blok Scope
if (true) {
    let rahasia = "Kode";
}
// console.log(rahasia); // ❌ Error: rahasia tidak dikenal di sini.
\`\`\`

## 🎯 Outcome Modul
- Mengerti peran JS di web.
- Tidak lagi menggunakan \`var\`.
- Bisa menampilkan output ke Console.
`,
    level: 'beginner',
    order: 1,
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: 'js-02',
    user_type: 'student',
    language: 'javascript',
    title: 'Tipe Data & Operator',
    description: 'Primitive types, Template Literals, dan Perangkap Type Coercion.',
    content: `# Tipe Data & Keunikan JS

## 1. Tipe Data Dasar (Primitives)
\`\`\`javascript
let nama = "Budi";       // String
let umur = 25;           // Number (Bulat & Desimal sama)
let isLogin = true;      // Boolean
let kosong = null;       // Sengaja dikosongkan
let tidakAda = undefined; // Belum didefinisikan
\`\`\`

## 2. Template Literals (Backtick)
Cara modern menggabungkan string variabel. Jangan pakai \`+\` lagi.
\`\`\`javascript
let barang = "Laptop";
let harga = 5000;

// Cara Lama (Ribet)
console.log("Harga " + barang + " adalah " + harga);

// Cara Baru (ES6)
console.log(\`Harga \${barang} adalah \${harga}\`);
\`\`\`

## 3. Operator & Type Coercion (Hati-hati!)
JS suka "memaksa" ubah tipe data. Ini sumber bug terbesar.

\`\`\`javascript
console.log(1 + "1"); // "11" (Angka jadi String lalu digabung)
console.log(10 - "5"); // 5 (String "5" dipaksa jadi Angka)

// Perbandingan: == vs ===
console.log(5 == "5");  // true (Nilai sama, tipe bodo amat)
console.log(5 === "5"); // false (Tipe beda: Number vs String)
\`\`\`

> **Aturan Emas:** Selalu gunakan **\`===\`** (Triple Equals) agar aman!

## 🎯 Outcome Modul
- Terbiasa menggunakan Backtick (\`).
- Mengerti bahaya \`1 + "1"\`.
- Selalu menggunakan \`===\` untuk if-else.
`,
    level: 'beginner',
    order: 2,
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: 'js-03',
    user_type: 'student',
    language: 'javascript',
    title: 'Logika & Pengkondisian',
    description: 'If-Else, Ternary Operator, dan Truthy/Falsy values.',
    content: `# Logic Control Flow

## 1. If - Else Standard
\`\`\`javascript
let nilai = 80;

if (nilai >= 90) {
    console.log("A");
} else if (nilai >= 70) {
    console.log("B");
} else {
    console.log("C");
}
\`\`\`

## 2. Ternary Operator (One Liner)
Pengganti If-Else sederhana. Sangat sering dipakai di React.
\`\`\`javascript
// Format: kondisi ? benar : salah
let status = (nilai >= 75) ? "Lulus" : "Remedial";
\`\`\`

## 3. Truthy & Falsy (Unik di JS)
Di JS, semua nilai dianggap **True**, KECUALI 6 hal ini (**Falsy**):
1. \`false\`
2. \`0\` (nol)
3. \`""\` (string kosong)
4. \`null\`
5. \`undefined\`
6. \`NaN\` (Not a Number)

\`\`\`javascript
let inputUser = ""; // String kosong = Falsy

if (inputUser) {
    console.log("User mengisi data");
} else {
    console.log("Data kosong"); // Ini yang jalan
}
\`\`\`

## 🎯 Outcome Modul
- Bisa menulis logika pendek dengan Ternary Operator.
- Memahami bahwa \`0\` dan string kosong \`""\` dianggap \`false\`.
`,
    level: 'beginner',
    order: 3,
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: 'js-04',
    user_type: 'student',
    language: 'javascript',
    title: 'Functions & Arrow Functions',
    description: 'Function Declaration vs Expression vs Arrow Function.',
    content: `# Fungsi Modern

## 1. Cara Lama (Declaration)
\`\`\`javascript
function sapa(nama) {
    return "Halo " + nama;
}
\`\`\`

## 2. Cara Modern (Arrow Function)
Diperkenalkan di ES6. Lebih ringkas dan prilaku \`this\` yang lebih aman.

\`\`\`javascript
// Versi lengkap
const hitungLuas = (panjang, lebar) => {
    return panjang * lebar;
};

// Versi One-Liner (Otomatis return, tanpa kurung kurawal)
const kaliDua = angka => angka * 2;

console.log(kaliDua(5)); // 10
\`\`\`

## 3. Parameter Default
\`\`\`javascript
// Jika nama tidak diisi, otomatis "Guest"
const login = (nama = "Guest") => {
    console.log(\`Selamat datang, \${nama}\`);
};

login(); // "Selamat datang, Guest"
\`\`\`

## 🎯 Outcome Modul
- Bisa mengubah fungsi biasa menjadi **Arrow Function**.
- Mengerti konsep default parameter.
`,
    level: 'intermediate',
    order: 4,
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: 'js-05',
    user_type: 'student',
    language: 'javascript',
    title: 'Array & Object Manipulation',
    description: 'Map, Filter, Reduce, dan Object Property.',
    content: `# Data Structures

## 1. Array Methods (Wajib Hafal!)
Daripada pakai \`for\` loop manual, gunakan method bawaan ini.

\`\`\`javascript
const angka = [10, 20, 30, 40];

// MAP: Mengubah setiap elemen (jumlah elemen tetap)
const bagiDua = angka.map(item => item / 2); 
// Hasil: [5, 10, 15, 20]

// FILTER: Menyaring elemen (jumlah elemen bisa berkurang)
const diatas20 = angka.filter(item => item > 20);
// Hasil: [30, 40]

// FIND: Mencari SATU elemen pertama yang cocok
const cari = angka.find(item => item === 20);
// Hasil: 20
\`\`\`

## 2. Object
\`\`\`javascript
const mhs = {
    nama: "Dino",
    jurusan: "TI",
    alamat: {
        kota: "Jakarta",
        kodePos: 12345
    }
};

// Akses data
console.log(mhs.nama);        // Dot notation (Umum)
console.log(mhs["jurusan"]);  // Bracket notation (Jika key dinamis)
console.log(mhs.alamat.kota); // Nested object
\`\`\`

## 🎯 Outcome Modul
- Tidak lagi menggunakan \`for(let i=0...)\` untuk manipulasi array sederhana.
- Mahir menggunakan \`map\` dan \`filter\`.
`,
    level: 'intermediate',
    order: 5,
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: 'js-06',
    user_type: 'student',
    language: 'javascript',
    title: 'DOM Manipulation (Interaksi Browser)',
    description: 'querySelector, Event Listener, dan manipulasi HTML via JS.',
    content: `# Document Object Model (DOM)

Bagaimana JS mengubah tampilan HTML.

## 1. Memilih Elemen (Selector)
\`\`\`javascript
// Ambil elemen berdasarkan ID
const judul = document.getElementById("judul-utama");

// Ambil elemen css selector (Paling sakti)
const tombol = document.querySelector(".btn-submit"); 
const semuaList = document.querySelectorAll("li"); // Mengembalikan Array-like
\`\`\`

## 2. Event Listener (Interaksi)
Jangan pasang \`onclick\` di HTML! Pisahkan logika di JS.

\`\`\`javascript
const btn = document.querySelector("#btn-klik");

btn.addEventListener("click", () => {
    alert("Tombol diklik!");
    
    // Ubah style via JS
    btn.style.backgroundColor = "red";
    btn.textContent = "Sudah Diklik";
});
\`\`\`

## 3. Membuat Elemen Baru
\`\`\`javascript
const divBaru = document.createElement("div");
divBaru.textContent = "Saya elemen baru";
document.body.appendChild(divBaru);
\`\`\`

## 🎯 Outcome Modul
- Bisa memilih elemen HTML dengan \`querySelector\`.
- Bisa membuat tombol berfungsi saat diklik.
`,
    level: 'intermediate',
    order: 6,
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: 'js-07',
    user_type: 'student',
    language: 'javascript',
    title: 'Asynchronous: Promise & Async/Await',
    description: 'Callback Hell, Konsep Promise, dan Async/Await modern.',
    content: `# Asynchronous JavaScript

JS itu "Single Threaded" (satu jalur). Jika loading data lama, website bisa macet. Solusinya: Async.

## 1. Konsep Promise
Janji yang hasilnya mungkin **Sukses (Resolved)** atau **Gagal (Rejected)** di masa depan.

\`\`\`javascript
const janji = new Promise((resolve, reject) => {
    let sukses = true;
    if (sukses) resolve("Berhasil!");
    else reject("Gagal!");
});

janji
    .then(res => console.log(res)) // Kalau sukses
    .catch(err => console.log(err)); // Kalau gagal
\`\`\`

## 2. Async / Await (Cara Modern)
Syntactic sugar agar kode async terlihat seperti kode sync (berurutan). Lebih mudah dibaca daripada \`.then()\`.

\`\`\`javascript
// Simulasi ambil data server (2 detik)
const ambilData = () => {
    return new Promise(resolve => {
        setTimeout(() => resolve("Data Server"), 2000);
    });
};

const prosesUtama = async () => {
    console.log("Loading...");
    
    try {
        const hasil = await ambilData(); // Tunggu sampai selesai, baru lanjut
        console.log("Diterima:", hasil);
    } catch (error) {
        console.log("Error:", error);
    }
};

prosesUtama();
\`\`\`

## 🎯 Outcome Modul
- Paham kenapa butuh Async (biar web tidak hang).
- Bisa mengubah Promise chain (\`.then\`) menjadi \`async/await\`.
`,
    level: 'advanced',
    order: 7,
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: 'js-08',
    user_type: 'student',
    language: 'javascript',
    title: 'ES6+ Features: Destructuring & Spread',
    description: 'Fitur modern yang wajib dikuasai untuk React/Vue.',
    content: `# Modern JavaScript (ES6+)

Fitur-fitur "Syntax Candy" yang membuat koding lebih cepat.

## 1. Destructuring (Bongkar Paket)
Mengambil isi array/object dengan cepat.

\`\`\`javascript
const user = { nama: "Siti", umur: 20, kota: "Bandung" };

// Cara Lama
// const nama = user.nama;
// const umur = user.umur;

// Cara Baru
const { nama, kota } = user; 
console.log(nama, kota); // Siti, Bandung
\`\`\`

## 2. Spread Operator (...)
Mengkopi atau menggabungkan array/object.

\`\`\`javascript
const hobiLama = ["Renang", "Lari"];
const hobiBaru = ["Gaming", ...hobiLama, "Koding"];

// hobiBaru: ["Gaming", "Renang", "Lari", "Koding"]
// Array lama tidak rusak (Immutable concept)
\`\`\`

## 3. Modules (Import/Export)
Memecah kode ke banyak file.
\`\`\`javascript
// file: matematika.js
export const tambah = (a, b) => a + b;

// file: main.js
import { tambah } from './matematika.js';
console.log(tambah(2, 3));
\`\`\`

## 🎯 Outcome Modul
- Coding lebih ringkas dan elegan.
- Siap untuk belajar Framework JS (React, Vue, Svelte).
`,
    level: 'advanced',
    order: 8,
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: 'js-09',
    user_type: 'student',
    language: 'javascript',
    title: 'Studi Kasus 1: Sistem Validasi Form',
    description: 'Latihan Logika: Membuat validasi password dan email tanpa library.',
    content: `# Studi Kasus 1: Form Validator Logic

## 📜 Skenario
Anda diminta membuat fungsi validasi pendaftaran user.
Aturan validasi:
1. **Email** harus mengandung karakter "@" dan tidak boleh diawali "@".
2. **Password** minimal 8 karakter.
3. **Password** harus mengandung setidaknya satu angka.

Input: Object user (\`{email, password}\`).
Output: Array berisi pesan error. Jika kosong \`[]\`, berarti valid.

## 💻 Solusi Code
\`\`\`javascript
function validateRegister(input) {
    const errors = [];
    const { email, password } = input; // Destructuring

    // 1. Validasi Email
    if (!email) {
        errors.push("Email wajib diisi");
    } else if (!email.includes("@") || email.startsWith("@")) {
        errors.push("Format email tidak valid");
    }

    // 2. Validasi Password
    if (!password) {
        errors.push("Password wajib diisi");
    } else {
        if (password.length < 8) {
            errors.push("Password minimal 8 karakter");
        }
        
        // Cek angka menggunakan Regex sederhana atau loop
        // /[0-9]/ menest apakah ada angka 0-9
        const adaAngka = /[0-9]/.test(password); 
        if (!adaAngka) {
            errors.push("Password harus mengandung angka");
        }
    }

    return {
        isValid: errors.length === 0,
        errors: errors
    };
}

// --- PENGUJIAN ---

// Kasus A: Data Ngawur
const userA = { email: "budi.com", password: "pwd" };
console.log("User A:", validateRegister(userA));

// Kasus B: Data Benar
const userB = { email: "budi@mail.com", password: "Rahasia123" };
console.log("User B:", validateRegister(userB));
\`\`\`

## ✅ Hasil yang Diharapkan
\`\`\`text
User A: {
  isValid: false,
  errors: [
    'Format email tidak valid',
    'Password minimal 8 karakter',
    'Password harus mengandung angka'
  ]
}

User B: {
  isValid: true,
  errors: []
}
\`\`\`
`,
    level: 'advanced',
    order: 9,
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: 'js-10',
    user_type: 'student',
    language: 'javascript',
    title: 'Studi Kasus 2: Dashboard Data Karyawan (Async)',
    description: 'Simulasi fetch API, filtering data, dan menampilkan statistik.',
    content: `# Studi Kasus 2: Employee Dashboard Logic

## 📜 Skenario
Anda membangun dashboard HR. Anda harus:
1.  Mengambil data karyawan dari server (Simulasi Async).
2.  Data mentah mungkin kotor (gaji dalam string, ada yang null).
3.  Tugas:
    - Ambil data.
    - Bersihkan data (Gaji jadi number).
    - Filter karyawan yang gajinya > 5 Juta.
    - Hitung total pengeluaran gaji untuk karyawan tersebut.

## 💻 Solusi Code
\`\`\`javascript
// 1. Simulasi API (JANGAN DIUBAH)
const fetchEmployees = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve([
                { id: 1, name: "Andi", salary: "4000000", active: true },
                { id: 2, name: "Budi", salary: "8000000", active: true },
                { id: 3, name: "Citra", salary: "12000000", active: false }, // Tidak aktif
                { id: 4, name: "Dewi", salary: "6000000", active: true }
            ]);
        }, 1000);
    });
};

// 2. Logic Utama
async function processPayroll() {
    console.log("🔄 Mengambil data...");
    
    try {
        const rawData = await fetchEmployees();

        // Chain Methods: Filter -> Map
        const qualifiedEmployees = rawData
            .filter(emp => emp.active === true) // Hanya yang aktif
            .map(emp => {
                // Konversi gaji string ke number
                return { 
                    ...emp, 
                    salary: Number(emp.salary) 
                };
            })
            .filter(emp => emp.salary > 5000000); // Gaji di atas 5jt

        // Hitung Total (Reduce)
        const totalBudget = qualifiedEmployees.reduce((total, emp) => {
            return total + emp.salary;
        }, 0);

        // Format Rupiah
        const formatRupiah = new Intl.NumberFormat('id-ID', {
            style: 'currency', currency: 'IDR'
        }).format(totalBudget);

        console.log("✅ Data Diproses:");
        console.log(qualifiedEmployees);
        console.log("💰 Total Budget Gaji Tinggi:", formatRupiah);

    } catch (err) {
        console.log("Error:", err);
    }
}

// Eksekusi
processPayroll();
\`\`\`

## ✅ Hasil yang Diharapkan
\`\`\`text
🔄 Mengambil data...
(Menunggu 1 detik...)
✅ Data Diproses:
[
  { id: 2, name: 'Budi', salary: 8000000, active: true },
  { id: 4, name: 'Dewi', salary: 6000000, active: true }
]
💰 Total Budget Gaji Tinggi: Rp 14.000.000,00
\`\`\`
`,
    level: 'advanced',
    order: 10,
    created_at: '2025-01-01T00:00:00Z'
  },
];