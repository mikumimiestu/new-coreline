import type { LearningMaterial } from '../types/learning';

export const MOCK_MATERIALS: LearningMaterial[] = [
  // ==================== LEVEL 1: BEGINNER (DASAR) ====================
  {
    id: 'js-01',
    user_type: 'student',
    language: 'javascript',
    title: '1. Hello World & Variable Standards',
    description: 'Cara kerja JS Engine, Console, dan aturan mati var vs let vs const.',
    content: `# 🟡 Pengenalan JavaScript

## Apa itu JavaScript?
JavaScript (JS) adalah bahasa pemrograman yang membuat website menjadi **hidup**.
- **HTML:** Tulang (Struktur).
- **CSS:** Baju (Tampilan).
- **JS:** Otak (Logika, Data, Interaksi).



JS berjalan di browser (Client-side) dan di server (Node.js). V8 Engine adalah mesin di balik Google Chrome dan Node.js yang mengeksekusi kode JS kita dengan sangat cepat.

## 1. Output & Debugging
\`\`\`javascript
console.log("Halo Dunia"); // Debugging standar
console.table({nama: "Budi", umur: 20}); // Menampilkan data tabel rapi
alert("Pop up!"); // Interaksi kasar (jarang dipakai di app modern)
\`\`\`

## 2. Variabel: Aturan Modern
⚠️ **Haram menggunakan \`var\` di project modern!** \`var\` memiliki masalah *hoisting* dan *scope* yang menyebabkan bug fatal.

| Keyword | Bisa Diubah? | Scope | Kapan Dipakai? |
|:---|:---:|:---|:---|
| **const** | ❌ Tidak | Block | **Gunakan 95% waktu coding.** |
| **let** | ✅ Ya | Block | Gunakan hanya jika nilai *pasti* berubah (loop, counter). |
| **var** | ✅ Ya | Function | **Legacy.** Jangan dipakai. |

\`\`\`javascript
const PI = 3.14;
// PI = 3.15; // ❌ Error: Assignment to constant variable.

let skor = 0;
skor = 10; // ✅ Aman
\`\`\`

## 🎯 Outcome
- Setup mental: "Default ke \`const\`, ganti \`let\` kalau terpaksa".
- Bisa melihat log di Browser Console (F12).
`,
    level: 'beginner',
    order: 1,
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: 'js-02',
    user_type: 'student',
    language: 'javascript',
    title: '2. Types, Coercion & Truthy/Falsy',
    description: 'Hati-hati dengan "Magic" JS saat menjumlahkan string dan angka.',
    content: `# Tipe Data & Keunikan JS

JS adalah *Dynamically Typed*. Satu variabel bisa berubah tipe datanya tanpa dideklarasikan ulang.

## 1. Primitives & Template Literal
\`\`\`javascript
let nama = "Budi";      // String
let umur = 25;          // Number (Int/Float sama saja)
let isPro = true;       // Boolean
let kosong = null;      // Value-nya sengaja di-"kosong"-kan
let gaAda = undefined;  // Belum diset value sama sekali

// Template Literal (Backtick \`) - WAJIB PAKAI INI DI INDUSTRI
console.log(\`Halo \${nama}, umurmu \${umur}\`); 
\`\`\`

## 2. The "Bad Parts": Type Coercion
JS suka memaksa ubah tipe data di luar nalar kita. 

\`\`\`javascript
console.log(1 + "1");  // "11" (Angka dipaksa jadi String)
console.log(10 - "5"); // 5    (String dipaksa jadi Angka) - Aneh kan?

// Perbandingan: == vs ===
console.log(5 == "5");  // true (Cek nilai saja, tipe bodo amat)
console.log(5 === "5"); // false (Cek Nilai DAN Tipe) ✅ WAJIB PAKAI INI
\`\`\`

## 3. Truthy & Falsy
Di JS, semua nilai dianggap **True** dalam kondisi (if/else), KECUALI 6 hal ini (**Falsy**):
1. \`false\`
2. \`0\` (nol)
3. \`""\` (string kosong)
4. \`null\`
5. \`undefined\`
6. \`NaN\` (Not a Number)

\`\`\`javascript
const user = ""; // String kosong = Falsy
if (user) {
  console.log("Ada user");
} else {
  console.log("User kosong"); // Ini yang jalan
}
\`\`\`

## 🎯 Outcome
- Selalu pakai \`===\` untuk menghindari bug konyol.
- Paham konsep Truthy/Falsy untuk validasi form yang elegan.
`,
    level: 'beginner',
    order: 2,
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: 'js-03',
    user_type: 'student',
    language: 'javascript',
    title: '3. Control Flow & Logic',
    description: 'Percabangan (If/Else, Ternary) dan Perulangan (For, While).',
    content: `# Logika & Perulangan

Bagaimana cara membuat keputusan dalam kode dan mengulang tugas tanpa capek.

## 1. Ternary Operator (If/Else Modern)
Di React/Vue, kamu akan jarang pakai \`if/else\` panjang, melainkan pakai *Ternary*.

\`\`\`javascript
const nilai = 80;

// Cara Lama:
let status;
if (nilai >= 75) {
  status = "Lulus";
} else {
  status = "Gagal";
}

// Cara Modern (Ternary): Kondisi ? Jika_True : Jika_False
const statusModern = nilai >= 75 ? "Lulus" : "Gagal";
console.log(statusModern); // "Lulus"
\`\`\`

## 2. Perulangan Dasar (For Loop)
\`\`\`javascript
// for(nilai_awal; kondisi_berhenti; penambahan)
for (let i = 1; i <= 5; i++) {
  console.log(\`Perulangan ke-\${i}\`);
}
\`\`\`

## 🎯 Outcome
- Bisa membuat alur logika sederhana.
- Menguasai Ternary operator untuk mempersingkat kode if/else.
`,
    level: 'beginner',
    order: 3,
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: 'js-04',
    user_type: 'student',
    language: 'javascript',
    title: '4. Functions: Arrow vs Declaration',
    description: 'Revolusi ES6 Arrow Function dan Default Parameters.',
    content: `# Modern Functions

Fungsi adalah blok kode yang bisa dipakai berulang kali.

## 1. Arrow Function (ES6)
Cara penulisan modern yang lebih ringkas dan sering dipakai di dunia kerja.

\`\`\`javascript
// Cara Lama (Declaration)
function tambah(a, b) {
  return a + b;
}

// Cara Baru (Arrow Function)
const kali = (a, b) => {
  return a * b;
};

// One-Liner (Implicit Return) - Sangat sering dipakai di React
const bagi = (a, b) => a / b;

console.log(bagi(10, 2)); // 5
\`\`\`

## 2. Default Parameters
Menghindari error jika *user* lupa memasukkan argumen.
\`\`\`javascript
// Jika nama kosong, otomatis diisi "Guest"
const sapa = (nama = "Guest") => \`Halo \${nama}\`;

console.log(sapa()); // "Halo Guest"
console.log(sapa("Dino")); // "Halo Dino"
\`\`\`

## 🎯 Outcome
- Bisa mengubah fungsi lama menjadi Arrow Function.
- Mengerti *Implicit Return* (tanpa keyword \`return\` dan kurung kurawal).
`,
    level: 'beginner',
    order: 4,
    created_at: '2025-01-01T00:00:00Z'
  },

  // ==================== LEVEL 2: INTERMEDIATE (MENENGAH) ====================
  {
    id: 'js-05',
    user_type: 'student',
    language: 'javascript',
    title: '5. Array Magic: Map, Filter, Reduce',
    description: 'Meninggalkan For Loop manual demi Functional Programming.',
    content: `# Array Manipulation

Di dunia kerja modern (seperti di React), kita jarang pakai \`for (let i=0...)\` untuk memproses Array. Kita pakai *Higher Order Functions*.

\`\`\`javascript
const harga = [1000, 2000, 3000, 4000, 5000];
\`\`\`

## 1. MAP (Transformasi)
Mengubah setiap elemen array menjadi bentuk baru. **Jumlah data TETAP**.
\`\`\`javascript
// Diskon 50% semua barang
const diskon = harga.map(item => item * 0.5);
console.log(diskon); // [500, 1000, 1500, 2000, 2500]
\`\`\`

## 2. FILTER (Penyaringan)
Menyaring elemen sesuai kondisi. **Jumlah data BISA BERKURANG**.
\`\`\`javascript
// Ambil yang mahal saja (> 2500)
const mahal = harga.filter(item => item > 2500);
console.log(mahal); // [3000, 4000, 5000]
\`\`\`

## 3. REDUCE (Totaling)
Merangkum/menggabungkan array menjadi **SATU nilai** (misal: total harga keranjang belanja).
\`\`\`javascript
// acc = akumulator (penampung), curr = item saat ini, 0 = nilai awal
const total = harga.reduce((acc, curr) => acc + curr, 0); 
console.log(total); // 15000
\`\`\`

## 🎯 Outcome
- Wajib hafal \`map\`, \`filter\`, \`reduce\` di luar kepala karena ini pondasi manipulasi data di Frontend modern.
`,
    level: 'intermediate',
    order: 5,
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: 'js-06',
    user_type: 'student',
    language: 'javascript',
    title: '6. DOM Manipulation & Events',
    description: 'Menghubungkan Logic JS ke HTML. querySelector adalah raja.',
    content: `# Document Object Model (DOM)



DOM adalah representasi struktur HTML sebagai sebuah "pohon" (Tree) yang bisa dibaca dan diotak-atik oleh JS.

## 1. Selecting Elements
Lupakan \`getElementById\`, gunakan **querySelector** (seperti CSS selector: pakai \`.\` untuk class, \`#\` untuk id).
\`\`\`javascript
const judul = document.querySelector("h1"); // Tag
const tombol = document.querySelector(".btn-save"); // Class
const input = document.querySelector("#username"); // ID
\`\`\`

## 2. Event Listener
Menambahkan interaksi (klik, ketik, scroll).
\`\`\`javascript
tombol.addEventListener("click", () => {
  // Mengubah CSS via JS
  judul.style.color = "red";
  
  // Mengubah teks
  judul.textContent = "Data Berhasil Disimpan!";
  
  // Mengambil value dari inputan user
  console.log("Input user:", input.value);
});
\`\`\`

## 🎯 Outcome
- Tahu cara memanipulasi elemen web secara langsung via JS.
- Bisa mengambil *value* dari Form HTML untuk diproses.
`,
    level: 'intermediate',
    order: 6,
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: 'js-07',
    user_type: 'student',
    language: 'javascript',
    title: '7. Asynchronous: Promise & Async/Await',
    description: 'Menangani API Call & mencegah browser macet dengan Event Loop.',
    content: `# Asynchronous JavaScript

JS itu *Single Threaded* (hanya bisa kerjakan satu tugas dalam satu waktu). Kalau ada proses lama (download file/tarik data API), JS akan menyerahkannya ke Web APIs di background, lalu lanjut membaca baris kode berikutnya.



## 1. Konsep Promise (Janji)
Sebuah Promise punya 3 status: *Pending* (menunggu), *Fulfilled* (berhasil), atau *Rejected* (gagal).

## 2. Async / Await (The Modern Standard)
Cara modern agar kode *async* (tidak sinkron) terlihat rapi seperti kode biasa, tanpa terjebak *Callback Hell*.

\`\`\`javascript
// Simulasi ambil data server (butuh waktu 2 detik)
const getUser = () => {
  return new Promise(resolve => setTimeout(() => resolve("Dino"), 2000));
};

const main = async () => {
  console.log("1. Loading...");
  
  try {
    // await MENGHENTIKAN SEMENTARA eksekusi di fungsi ini sampai data datang
    const user = await getUser(); 
    console.log("2. User ditemukan:", user);
  } catch (error) {
    console.log("Error:", error);
  }
  
  console.log("3. Selesai");
};

main();
// Output: 
// 1. Loading...
// (Tunggu 2 detik)
// 2. User ditemukan: Dino
// 3. Selesai
\`\`\`

## 🎯 Outcome
- Paham cara menggunakan \`try...catch\` untuk menangani error.
- Bisa menahan proses JS dengan \`await\` saat memanggil API.
`,
    level: 'intermediate',
    order: 7,
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: 'js-08',
    user_type: 'student',
    language: 'javascript',
    title: '8. ES6 Modules (Import / Export)',
    description: 'Membagi kode menjadi file-file kecil yang rapi dan terstruktur.',
    content: `# Modules

Di project nyata, kode JS tidak pernah ditaruh di 1 file panjang. Kita membaginya menjadi modul-modul (file terpisah).

## 1. Export (Mengekspos fungsi/variabel)
\`math.js\`:
\`\`\`javascript
// Named Export (Bisa banyak per file)
export const tambah = (a, b) => a + b;
export const kurang = (a, b) => a - b;

// Default Export (Hanya 1 per file, biasanya untuk Komponen Utama)
const kalkulator = { merk: "Casio" };
export default kalkulator;
\`\`\`

## 2. Import (Menggunakan fungsi dari file lain)
\`app.js\`:
\`\`\`javascript
// Import Default (Bebas kasih nama apa saja, tidak pakai kurung kurawal)
import MesinHitung from './math.js';

// Import Named (Nama WAJIB sama, pakai kurung kurawal)
import { tambah, kurang } from './math.js';

console.log(MesinHitung.merk); // Casio
console.log(tambah(5, 5));     // 10
\`\`\`

## 🎯 Outcome
- Bisa menghubungkan file JS satu dengan yang lain.
- Siap masuk ke arsitektur *Component-Based* seperti React/Vue/Angular.
`,
    level: 'intermediate',
    order: 8,
    created_at: '2025-01-01T00:00:00Z'
  },

  // ==================== LEVEL 3: ADVANCED & EXPERT (SENIOR TOPICS) ====================
  {
    id: 'js-09',
    user_type: 'student',
    language: 'javascript',
    title: '9. Advanced: Destructuring & Spread',
    description: 'Fitur ES6+ untuk memanipulasi Object/Array dengan sangat elegan.',
    content: `# ES6+ Features

Fitur "Quality of Life" yang wajib dikuasai agar kode terlihat seperti *Senior Developer*.

## 1. Destructuring (Bongkar Paket)
Mengekstrak nilai dari Object/Array menjadi variabel terpisah.
\`\`\`javascript
const mhs = {
  nama: "Budi",
  alamat: { kota: "Jakarta", pos: 123 }
};

// Cara Lama (Bikin capek ngetik)
// const nama = mhs.nama;
// const kota = mhs.alamat.kota;

// Cara Baru (Destructuring)
const { nama, alamat: { kota } } = mhs;
console.log(nama, kota); // Budi Jakarta
\`\`\`

## 2. Spread Operator (...)
Meng-copy atau menggabungkan array/object tanpa merusak data aslinya (*Immutability*).

\`\`\`javascript
const hobiLama = ["Makan", "Tidur"];
// Gabung array
const hobiBaru = ["Coding", ...hobiLama, "Gaming"];

const userA = { name: "A", role: "User" };
// Update object: Copy semua dari userA, tapi timpa 'role' jadi Admin
const userB = { ...userA, role: "Admin" };

console.log(userB); // { name: "A", role: "Admin" }
\`\`\`

## 🎯 Outcome
- Koding lebih cepat, bersih, dan ringkas.
- Memahami konsep *Immutability* (tidak merusak data asal), aturan emas di Redux/React State.
`,
    level: 'advanced',
    order: 9,
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: 'js-10',
    user_type: 'student',
    language: 'javascript',
    title: '10. OOP: Classes & Inheritance',
    description: 'Object Oriented Programming versi Modern JS.',
    content: `# Classes di JavaScript

Sejak ES6, JS punya *syntactic sugar* berupa \`class\` agar mirip dengan bahasa OOP lain (Java, C#).

## 1. Class & Constructor
\`\`\`javascript
class Kendaraan {
  // Constructor: Fungsi yang jalan otomatis saat objek dibuat
  constructor(merk, roda) {
    this.merk = merk;
    this.roda = roda;
  }

  jalan() {
    console.log(\`\${this.merk} sedang berjalan dengan \${this.roda} roda.\`);
  }
}

const avanza = new Kendaraan("Toyota", 4);
avanza.jalan(); // Toyota sedang berjalan dengan 4 roda.
\`\`\`

## 2. Inheritance (Pewarisan)
\`\`\`javascript
class MobilSport extends Kendaraan {
  constructor(merk, turbo) {
    super(merk, 4); // super() memanggil constructor milik class Induk (Kendaraan)
    this.turbo = turbo;
  }

  ngebut() {
    console.log(\`Wush! \${this.merk} ngebut pakai \${this.turbo} turbo!\`);
  }
}

const ferrari = new MobilSport("Ferrari", "Twin");
ferrari.jalan();  // Mewarisi method dari Kendaraan
ferrari.ngebut(); // Method miliknya sendiri
\`\`\`

## 🎯 Outcome
- Bisa memodelkan data dunia nyata ke dalam bentuk Class.
- Memahami *Blueprint* pembuatan objek.
`,
    level: 'advanced',
    order: 10,
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: 'js-11',
    user_type: 'student',
    language: 'javascript',
    title: '11. Expert: Closures & Currying',
    description: 'Konsep Lexical Scope, Function Factory, dan Private Variables.',
    content: `# Closures

Closure adalah kemampuan function untuk **mengingat variabel di lingkungan sekitarnya (Lexical Scope)** meskipun function induknya sudah selesai dieksekusi. Ini konsep level *Senior*.

## 1. Basic Closure (Data Privacy)
Di JS murni, kita bisa menyembunyikan data agar tidak diubah sembarangan dari luar.
\`\`\`javascript
function createCounter() {
  let count = 0; // Variabel private! Terkurung di dalam function.
  
  return function() {
    count++;
    return count;
  };
}

const counterA = createCounter();
const counterB = createCounter();

console.log(counterA()); // 1
console.log(counterA()); // 2
console.log(counterB()); // 1 (Instance terpisah!)
// console.log(count); // Error: count is not defined (Aman dari luar)
\`\`\`

## 2. Practical Use: Function Factory (Currying)
Memecah fungsi dengan banyak argumen menjadi rangkaian fungsi berantai.
\`\`\`javascript
const multiplier = (factor) => (number) => number * factor;

const kaliDua = multiplier(2);
const kaliLima = multiplier(5);

console.log(kaliDua(10)); // 20
console.log(kaliLima(10)); // 50
\`\`\`

## 🎯 Outcome
- Memahami cara kerja \`useState\` di React (di balik layar, React pakai Closure!).
- Bisa membuat struktur kode yang *secure* via Function Scope.
`,
    level: 'expert',
    order: 11,
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: 'js-12',
    user_type: 'student',
    language: 'javascript',
    title: '12. Expert: Prototypes & This',
    description: 'Jantung JS sebenarnya (bukan Class tapi Prototype).',
    content: `# Prototypes & Keyword 'This'



JavaScript *sebenarnya* tidak punya Class. \`class\` di ES6 itu aslinya diubah menjadi **Prototype** di belakang layar oleh JS Engine. JS murni berbasis *Prototypal Inheritance*.

## 1. Prototype Chain
Setiap object di JS punya "induk gaib" yang disebut \`__proto__\` atau Prototype. Jika sebuah objek tidak punya fungsi tertentu, dia akan mencarinya ke *Prototype* induknya secara berantai.

\`\`\`javascript
const hewan = {
  makan: function() { console.log("Nyam nyam"); }
};

// Kucing mewarisi hewan via Prototype
const kucing = Object.create(hewan);
kucing.meong = function() { console.log("Meow"); };

kucing.meong(); // Meow
kucing.makan(); // Nyam nyam (Karena kucing tidak punya makan(), dia ambil dari Prototype hewan)
\`\`\`

## 2. Tricky 'this'
Berbeda dengan bahasa lain, nilai \`this\` di JS berubah tergantung **SIAPA YANG MEMANGGIL** fungsinya pada saat eksekusi, bukan di mana ia ditulis.

\`\`\`javascript
const obj = {
  nama: "Objek A",
  sapa: function() { console.log(this.nama); }
};

obj.sapa(); // "Objek A" -> Dipanggil oleh 'obj', maka 'this' = obj

const sapaLuar = obj.sapa;
sapaLuar(); // undefined! -> Dipanggil tanpa objek induk (Global), 'this' lepas!

// Solusi: Ikat secara paksa pakai .bind()
const sapaBenar = obj.sapa.bind(obj);
sapaBenar(); // "Objek A"
\`\`\`

## 🎯 Outcome
- Bisa membaca *source code library* JS tua.
- Tidak bingung saat \`this\` tiba-tiba menjadi undefined atau merujuk ke Window/Global object.
`,
    level: 'expert',
    order: 12,
    created_at: '2025-01-01T00:00:00Z'
  },

  // ==================== STUDI KASUS ====================
  {
    id: 'js-13',
    user_type: 'student',
    language: 'javascript',
    title: 'Studi Kasus 1: Fetch API & DOM Rendering',
    description: 'Aplikasi pencarian user GitHub sederhana.',
    content: `# Studi Kasus: GitHub User Finder

## 📜 Misi
1. User mengetik username GitHub di kolom input.
2. Saat tombol diklik, JS mengambil data via API publik GitHub.
3. Mengelola status Loading/Error.
4. Render hasilnya (Avatar, Nama, Followers) ke DOM HTML.

## 💻 Solusi
\`\`\`javascript
const input = document.querySelector("#username");
const btn = document.querySelector("#btn-search");
const resultDiv = document.querySelector("#result");

const searchUser = async () => {
  const username = input.value;
  
  if (!username) return alert("Masukkan username dulu!");
  
  // Set Loading State
  resultDiv.innerHTML = "Mencari data...";

  try {
    const response = await fetch(\`https://api.github.com/users/\${username}\`);
    
    // Cek jika API balikin status 404 (Not Found)
    if (!response.ok) throw new Error("User tidak ditemukan di GitHub.");
    
    const data = await response.json();
    
    // Render UI pakai Template Literal
    resultDiv.innerHTML = \`
      <div class="card" style="border: 1px solid #ccc; padding: 1rem; margin-top: 1rem;">
        <img src="\${data.avatar_url}" width="100" style="border-radius: 50%" />
        <h3>\${data.name || username}</h3>
        <p>\${data.bio || "User ini tidak memiliki bio."}</p>
        <p><strong>Followers:</strong> \${data.followers} | <strong>Following:</strong> \${data.following}</p>
        <a href="\${data.html_url}" target="_blank">Lihat Profil GitHub</a>
      </div>
    \`;
  } catch (err) {
    // Render Error UI
    resultDiv.innerHTML = \`<p style="color:red; font-weight:bold;">\${err.message}</p>\`;
  }
};

btn.addEventListener("click", searchUser);
\`\`\`
`,
    level: 'advanced',
    order: 13,
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: 'js-14',
    user_type: 'student',
    language: 'javascript',
    title: 'Studi Kasus 2: Mini Reactive Store (Observer Pattern)',
    description: 'Expert: Membuat sistem state management ala Redux/Vuex dari nol.',
    content: `# Expert Case: Reactive Store

Di React (Redux) atau Vue (Pinia), jika sebuah "State" (Data pusat) berubah, UI akan otomatis *re-render*. Bagaimana cara kerjanya di balik layar? Kita pakai **Observer Pattern**.

## 💻 Solusi
\`\`\`javascript
class Store {
  constructor(initialState) {
    this.state = initialState; // Data pusat
    this.listeners = [];       // Array untuk menampung fungsi-fungsi yang antre ingin di-update
  }

  // 1. Subscribe: Mendaftarkan fungsi komponen agar dikabari saat data berubah
  subscribe(listener) {
    this.listeners.push(listener);
  }

  // 2. SetState: Fungsi tunggal untuk mengubah data
  setState(newState) {
    // Gabungkan state lama dengan data baru
    this.state = { ...this.state, ...newState }; 
    // Teriak/Kabari semua fungsi yang sudah subscribe!
    this.notify();
  }

  // 3. Notify: Menjalankan semua fungsi yang antre
  notify() {
    this.listeners.forEach(listener => listener(this.state));
  }
}

// ====================
// PENGGUNAAN DI APLIKASI
// ====================

const appStore = new Store({ count: 0, user: "Guest" });

// Anggap ini adalah fungsi untuk Re-render UI
function renderUI(state) {
  console.log(\`[UI RE-RENDER] User sekarang: \${state.user}, Counter: \${state.count}\`);
}

// Anggap ini fungsi untuk mencatat log ke Server
function logAnalytics(state) {
  console.log(\`[ANALYTICS] Terdeteksi perubahan data. Count: \${state.count}\`);
}

// Kita daftarkan kedua fungsi di atas ke dalam Store
appStore.subscribe(renderUI);
appStore.subscribe(logAnalytics);

// Simulasi Interaksi User mengubah data
console.log("--- Initial Data ---");
appStore.setState({ count: 1 }); // User klik tombol tambah

console.log("\\n--- User Login ---");
appStore.setState({ user: "Dino", count: 2 });
\`\`\`

## ✅ Hasil Output di Console
\`\`\`text
--- Initial Data ---
[UI RE-RENDER] User sekarang: Guest, Counter: 1
[ANALYTICS] Terdeteksi perubahan data. Count: 1

--- User Login ---
[UI RE-RENDER] User sekarang: Dino, Counter: 2
[ANALYTICS] Terdeteksi perubahan data. Count: 2
\`\`\`
`,
    level: 'expert',
    order: 14,
    created_at: '2025-01-01T00:00:00Z'
  },
];