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

JS berjalan di browser (Client-side) dan di server (Node.js).

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
- Setup mental "Default ke \`const\`, ganti \`let\` kalau terpaksa".
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

JS adalah *Dynamically Typed*. Satu variabel bisa berubah tipe datanya.

## 1. Primitives & Template Literal
\`\`\`javascript
let nama = "Budi";      // String
let umur = 25;          // Number (Int/Float sama saja)
let isPro = true;       // Boolean
let kosong = null;      // Value-nya "kosong"
let gaAda = undefined;  // Belum diset value

// Template Literal (Backtick) - WAJIB PAKAI INI
console.log(\`Halo \${nama}, umurmu \${umur}\`); 
\`\`\`

## 2. The "Bad Parts": Type Coercion
JS suka memaksa ubah tipe data. 


\`\`\`javascript
console.log(1 + "1");  // "11" (Angka dipaksa jadi String)
console.log(10 - "5"); // 5    (String dipaksa jadi Angka) - Aneh kan?

// Perbandingan: == vs ===
console.log(5 == "5");  // true (Cek nilai saja, tipe bodo amat)
console.log(5 === "5"); // false (Cek Nilai DAN Tipe) ✅ WAJIB PAKAI INI
\`\`\`

## 3. Truthy & Falsy
Di JS, semua nilai adalah **True**, KECUALI 6 hal ini (**Falsy**):
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
- Selalu pakai \`===\`.
- Paham konsep Truthy/Falsy untuk validasi form.
`,
    level: 'beginner',
    order: 2,
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: 'js-03',
    user_type: 'student',
    language: 'javascript',
    title: '3. Functions: Arrow vs Declaration',
    description: 'Revolusi ES6 Arrow Function dan Default Parameters.',
    content: `# Modern Functions

## 1. Arrow Function (ES6)
Cara penulisan modern yang lebih ringkas dan menangani keyword \`this\` dengan lebih baik.

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
\`\`\`javascript
// Jika nama kosong, otomatis diisi "Guest"
const sapa = (nama = "Guest") => \`Halo \${nama}\`;

console.log(sapa()); // "Halo Guest"
console.log(sapa("Dino")); // "Halo Dino"
\`\`\`

## 🎯 Outcome
- Bisa mengubah fungsi lama menjadi Arrow Function.
- Mengerti *Implicit Return* (tanpa kurung kurawal).
`,
    level: 'beginner',
    order: 3,
    created_at: '2025-01-01T00:00:00Z'
  },

  // ==================== LEVEL 2: INTERMEDIATE (MENENGAH) ====================
  {
    id: 'js-04',
    user_type: 'student',
    language: 'javascript',
    title: '4. Array Magic: Map, Filter, Reduce',
    description: 'Meninggalkan For Loop manual demi Functional Programming.',
    content: `# Array Manipulation

Di dunia kerja modern, kita jarang pakai \`for (let i=0...)\`. Kita pakai *Higher Order Functions*.

\`\`\`javascript
const harga = [1000, 2000, 3000, 4000, 5000];
\`\`\`

## 1. MAP (Transformasi)
Mengubah setiap elemen array menjadi bentuk baru. Jumlah index TETAP.
\`\`\`javascript
// Diskon 50% semua barang
const diskon = harga.map(item => item * 0.5);
console.log(diskon); // [500, 1000, 1500, 2000, 2500]
\`\`\`

## 2. FILTER (Penyaringan)
Menyaring elemen sesuai kondisi. Jumlah index BISA BERKURANG.
\`\`\`javascript
// Ambil yang mahal saja (> 2500)
const mahal = harga.filter(item => item > 2500);
console.log(mahal); // [3000, 4000, 5000]
\`\`\`

## 3. REDUCE (Totaling)
Merangkum array menjadi SATU nilai (misal: total harga).
\`\`\`javascript
// acc = akumulator (penampung), curr = item saat ini
const total = harga.reduce((acc, curr) => acc + curr, 0); 
console.log(total); // 15000
\`\`\`

## 🎯 Outcome
- Wajib hafal \`map\`, \`filter\`, \`reduce\` karena ini pondasi React/Vue.
`,
    level: 'intermediate',
    order: 4,
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: 'js-05',
    user_type: 'student',
    language: 'javascript',
    title: '5. DOM Manipulation & Events',
    description: 'Menghubungkan Logic JS ke HTML. querySelector adalah raja.',
    content: `# Document Object Model (DOM)



DOM adalah representasi HTML yang bisa diotak-atik oleh JS.

## 1. Selecting Elements
Lupakan \`getElementById\`, gunakan **querySelector** (seperti CSS selector).
\`\`\`javascript
const judul = document.querySelector("h1"); // Tag
const tombol = document.querySelector(".btn-save"); // Class
const input = document.querySelector("#username"); // ID
\`\`\`

## 2. Event Listener
Menambahkan interaksi (klik, ketik, scroll).
\`\`\`javascript
tombol.addEventListener("click", function() {
  judul.style.color = "red";
  judul.textContent = "Judul Berubah!";
  
  // Ambil value input
  console.log("Input user:", input.value);
});
\`\`\`

## 🎯 Outcome
- Bisa membuat website interaktif sederhana.
- Tahu cara mengambil value dari Form.
`,
    level: 'intermediate',
    order: 5,
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: 'js-06',
    user_type: 'student',
    language: 'javascript',
    title: '6. Asynchronous: Promise & Async/Await',
    description: 'Menangani proses lama (API Call) agar browser tidak hang.',
    content: `# Asynchronous JavaScript

JS itu *Single Threaded* (Satu jalur). Kalau ada proses lama (download file), dia harus "janji" (Promise) dikerjakan di background agar website tidak macet.

## 1. Konsep Promise
\`\`\`javascript
const janji = new Promise((resolve, reject) => {
  let sukses = true;
  if (sukses) resolve("Berhasil!");
  else reject("Gagal!");
});
\`\`\`

## 2. Async / Await (The Modern Standard)
Syntactic sugar agar kode async terlihat rapi seperti kode biasa.

\`\`\`javascript
// Simulasi ambil data server (2 detik)
const getUser = () => {
  return new Promise(resolve => setTimeout(() => resolve("Dino"), 2000));
};

const main = async () => {
  console.log("Loading...");
  
  try {
    const user = await getUser(); // Tunggu di sini sampai selesai
    console.log("User ditemukan:", user);
  } catch (error) {
    console.log("Error:", error);
  }
};

main();
\`\`\`

## 🎯 Outcome
- Paham kenapa \`console.log\` di bawah request API bisa jalan duluan kalau tidak di-\`await\`.
`,
    level: 'intermediate',
    order: 6,
    created_at: '2025-01-01T00:00:00Z'
  },

  // ==================== LEVEL 3: ADVANCED & EXPERT (SENIOR TOPICS) ====================
  {
    id: 'js-07',
    user_type: 'student',
    language: 'javascript',
    title: '7. Advanced: Destructuring & Spread',
    description: 'Fitur ES6+ untuk memanipulasi Object/Array dengan elegan.',
    content: `# ES6+ Features

Fitur "Quality of Life" yang wajib dikuasai sebelum masuk Framework.

## 1. Destructuring (Bongkar Paket)
\`\`\`javascript
const mhs = {
  nama: "Budi",
  alamat: { kota: "Jakarta", pos: 123 }
};

// Cara Lama
// const nama = mhs.nama;

// Cara Baru (Destructuring)
const { nama, alamat: { kota } } = mhs;
console.log(nama, kota); // Budi, Jakarta
\`\`\`

## 2. Spread Operator (...)
Copy array/object tanpa merusak aslinya (*Immutability*).

\`\`\`javascript
const hobiLama = ["Makan", "Tidur"];
// Gabung array
const hobiBaru = ["Coding", ...hobiLama, "Gaming"];

const userA = { name: "A", role: "User" };
// Update object (Override role)
const userB = { ...userA, role: "Admin" };

console.log(userB); // { name: "A", role: "Admin" }
\`\`\`

## 🎯 Outcome
- Coding lebih cepat dan bersih.
- Memahami konsep *Immutability*.
`,
    level: 'advanced',
    order: 7,
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: 'js-08',
    user_type: 'student',
    language: 'javascript',
    title: '8. Expert: Closures & Currying',
    description: 'Konsep Lexical Scope, Function Factory, dan Private Variables.',
    content: `# Closures



Closure adalah kemampuan function untuk **mengingat variabel di lingkungan sekitarnya (Lexical Scope)** meskipun lingkungan itu sudah selesai dieksekusi.

## 1. Basic Closure (Data Privacy)
\`\`\`javascript
function createCounter() {
  let count = 0; // Variabel ini "terkurung" di dalam, tidak bisa diakses dari luar
  
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
// console.log(count); // Error: count is not defined
\`\`\`

## 2. Practical Use: Function Factory (Currying)
\`\`\`javascript
const multiplier = (factor) => (number) => number * factor;

const kaliDua = multiplier(2);
const kaliLima = multiplier(5);

console.log(kaliDua(10)); // 20
console.log(kaliLima(10)); // 50
\`\`\`

## 🎯 Outcome
- Memahami cara kerja *useState* di React (itu pakai Closure!).
- Bisa membuat *private variable* di JS.
`,
    level: 'expert',
    order: 8,
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: 'js-09',
    user_type: 'student',
    language: 'javascript',
    title: '9. Expert: Prototypes & This',
    description: 'Jantung JS sebenarnya (bukan Class tapi Prototype).',
    content: `# Prototypes & Inheritance

JavaScript sebenarnya tidak punya Class (seperti Java). Class di ES6 hanyalah *Syntactic Sugar* di atas **Prototype**.

## 1. Prototype Chain
Setiap object di JS punya "induk" yang disebut Prototype.

\`\`\`javascript
const hewan = {
  makan: function() { console.log("Nyam nyam"); }
};

const kucing = Object.create(hewan);
kucing.meong = function() { console.log("Meow"); };

kucing.meong(); // Meow
kucing.makan(); // Nyam nyam (Mengambil dari Prototype induknya)
\`\`\`

## 2. Masalah Keyword 'this'
Nilai \`this\` berubah tergantung **SIAPA YANG MEMANGGIL**.

\`\`\`javascript
const obj = {
  nama: "Objek A",
  sapa: function() { console.log(this.nama); }
};

const sapaLuar = obj.sapa;
sapaLuar(); // undefined! (Karena 'this' sekarang mengacu ke Global/Window)

// Solusi: Bind
const sapaBenar = obj.sapa.bind(obj);
sapaBenar(); // "Objek A"
\`\`\`

## 🎯 Outcome
- Tidak bingung saat \`this\` menjadi undefined.
- Mengerti mekanik asli JS di balik layar.
`,
    level: 'expert',
    order: 9,
    created_at: '2025-01-01T00:00:00Z'
  },

  // ==================== STUDI KASUS ====================
  {
    id: 'js-10',
    user_type: 'student',
    language: 'javascript',
    title: 'Studi Kasus 1: Fetch API & DOM Rendering',
    description: 'Aplikasi pencarian user GitHub sederhana.',
    content: `# Studi Kasus: GitHub User Finder

## 📜 Misi
1.  User mengetik username GitHub.
2.  App mengambil data via API GitHub.
3.  Tampilkan Avatar dan Bio di HTML.

## 💻 Solusi
\`\`\`javascript
const input = document.querySelector("#username");
const btn = document.querySelector("#btn-search");
const resultDiv = document.querySelector("#result");

const searchUser = async () => {
  const username = input.value;
  resultDiv.innerHTML = "Loading...";

  try {
    const response = await fetch(\`https://api.github.com/users/\${username}\`);
    
    if (!response.ok) throw new Error("User tidak ditemukan");
    
    const data = await response.json();
    
    // Render HTML
    resultDiv.innerHTML = \`
      <div class="card">
        <img src="\${data.avatar_url}" width="100" />
        <h3>\${data.name || username}</h3>
        <p>\${data.bio || "Tidak ada bio"}</p>
        <p>Followers: \${data.followers}</p>
      </div>
    \`;
  } catch (err) {
    resultDiv.innerHTML = \`<p style="color:red">\${err.message}</p>\`;
  }
};

btn.addEventListener("click", searchUser);
\`\`\`
`,
    level: 'advanced',
    order: 10,
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: 'js-11',
    user_type: 'student',
    language: 'javascript',
    title: 'Studi Kasus 2: Mini Reactive Store (Observer Pattern)',
    description: 'Expert: Membuat sistem state management ala Redux dari nol.',
    content: `# Expert Case: Reactive Store

Kita akan membuat sistem di mana jika data berubah, UI otomatis update (konsep dasar React/Vue).

## 💻 Solusi (Observer Pattern)
\`\`\`javascript
class Store {
  constructor(initialState) {
    this.state = initialState;
    this.listeners = [];
  }

  // 1. Subscribe: Daftarkan fungsi yang mau dikabari kalau data berubah
  subscribe(listener) {
    this.listeners.push(listener);
  }

  // 2. SetState: Ubah data dan kabari semua listener
  setState(newState) {
    this.state = { ...this.state, ...newState }; // Merge state
    this.notify();
  }

  notify() {
    this.listeners.forEach(listener => listener(this.state));
  }
}

// --- PENGGUNAAN ---

const appStore = new Store({ count: 0, user: "Guest" });

// Komponen UI (Pura-pura)
function renderUI(state) {
  console.log(\`[UI UPDATE] User: \${state.user}, Count: \${state.count}\`);
}

function logAnalytics(state) {
  console.log(\`[ANALYTICS] Data changed to count \${state.count}\`);
}

// Subscribe
appStore.subscribe(renderUI);
appStore.subscribe(logAnalytics);

// Simulasi Interaksi
console.log("--- Initial ---");
appStore.setState({ count: 1 });
console.log("--- Change User ---");
appStore.setState({ user: "Dino", count: 2 });
\`\`\`

## ✅ Hasil
\`\`\`text
--- Initial ---
[UI UPDATE] User: Guest, Count: 1
[ANALYTICS] Data changed to count 1
--- Change User ---
[UI UPDATE] User: Dino, Count: 2
[ANALYTICS] Data changed to count 2
\`\`\`
`,
    level: 'expert',
    order: 11,
    created_at: '2025-01-01T00:00:00Z'
  },
];