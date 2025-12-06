import type { LearningMaterial } from '../types/learning';

export const MOCK_MATERIALS: LearningMaterial[] = [
  // ==================== TYPESCRIPT MATERIALS ====================
  {
    id: 'ts-01',
    user_type: 'student',
    language: 'typescript',
    title: 'Pengenalan TypeScript: Why & Setup',
    description: 'Apa itu Superset JS, Static Typing, dan konfigurasi tsconfig.json.',
    content: `# 📘 Pengenalan TypeScript

## Apa itu TypeScript?
TypeScript (TS) adalah *superset* dari JavaScript. Artinya, semua kode JS yang valid adalah kode TS yang valid.
Bedanya: **TypeScript menambahkan Static Typing**.

**Masalah di JavaScript:**
\`\`\`javascript
function tambah(a, b) {
  return a + b;
}
tambah("10", 5); // Hasil: "105" (String concat, padahal maunya matematika)
// Error baru ketahuan saat aplikasi dijalankan (Runtime).
\`\`\`

**Solusi TypeScript:**
\`\`\`typescript
function tambah(a: number, b: number): number {
  return a + b;
}
tambah("10", 5); // ❌ Error langsung muncul di editor (Compile time).
\`\`\`

---

## 🛠️ Instalasi & Setup
TypeScript butuh "Compiler" (\`tsc\`) untuk mengubah kode \`.ts\` menjadi \`.js\` agar bisa dibaca browser.

1.  **Install:**
    \`\`\`bash
    npm install -g typescript ts-node
    \`\`\`
2.  **Inisialisasi Project:**
    \`\`\`bash
    tsc --init
    \`\`\`
    Ini akan membuat file \`tsconfig.json\`.

## ⚙️ tsconfig.json Penting
File konfigurasi untuk mengatur aturan main TS.
\`\`\`json
{
  "compilerOptions": {
    "target": "es2016",       // Versi JS output
    "module": "commonjs",     // Sistem modul (Node.js)
    "strict": true,           // Wajib! Mode ketat (no implicit any)
    "outDir": "./dist",       // Folder output .js
    "rootDir": "./src"        // Folder sumber .ts
  }
}
\`\`\`

## 🎯 Outcome Modul
- Mengerti beda *Static Typing* (TS) vs *Dynamic Typing* (JS).
- Bisa setup environment TypeScript dasar.
`,
    level: 'beginner',
    order: 1,
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: 'ts-02',
    user_type: 'student',
    language: 'typescript',
    title: 'Basic Types & Type Inference',
    description: 'Primitive types, Array, Tuple, Any, dan Type Inference.',
    content: `# Tipe Data Dasar

## 1. Primitives
Tipe data standar JavaScript, tapi dideklarasikan secara eksplisit.

\`\`\`typescript
let username: string = "Dino";
let age: number = 25;
let isActive: boolean = true;
let anything: any = "Bahaya"; // Hindari 'any' sebisa mungkin!
\`\`\`

## 2. Array & Tuple
\`\`\`typescript
// Array biasa
let hobbies: string[] = ["Coding", "Gaming"];
let scores: Array<number> = [90, 85, 88];

// Tuple (Array dengan panjang dan tipe urutan tetap)
// Cocok untuk koordinat atau format data csv sederhana
let role: [number, string] = [1, "Admin"];
// role[0] harus number, role[1] harus string
\`\`\`

## 3. Type Inference (Penebakan Otomatis)
TS cukup pintar. Anda tidak harus selalu menulis tipe data jika nilainya sudah jelas.

\`\`\`typescript
let kampus = "Universitas Indonesia"; 
// TS otomatis tahu 'kampus' itu string.
// kampus = 100; // ❌ Error: Type 'number' is not assignable to type 'string'.
\`\`\`

## 4. Union Types (Si "Atau")
Variabel yang bisa menerima lebih dari satu tipe.

\`\`\`typescript
let id: string | number;
id = 101;   // OK
id = "A-1"; // OK
\`\`\`

## 🎯 Outcome Modul
- Terbiasa menulis tipe data eksplisit.
- Memahami kapan menggunakan Tuple dan Union.
`,
    level: 'beginner',
    order: 2,
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: 'ts-03',
    user_type: 'student',
    language: 'typescript',
    title: 'Object Shape: Interface vs Type Alias',
    description: 'Mendefinisikan bentuk objek, Optional properties, dan Readonly.',
    content: `# Interface vs Type

Cara mendefinisikan "bentuk" (shape) dari sebuah object. Ini fitur yang paling sering dipakai.

## 1. Interface
Biasanya digunakan untuk mendefinisikan struktur Object atau Class. Bisa di-*extend*.

\`\`\`typescript
interface User {
  id: number;
  name: string;
  email?: string;      // Optional (boleh ada, boleh tidak)
  readonly role: string; // Tidak bisa diubah setelah dibuat
}

const u1: User = {
  id: 1,
  name: "Budi",
  role: "Admin"
};

// u1.role = "User"; // ❌ Error: Read-only property
\`\`\`

## 2. Type Alias
Lebih fleksibel. Bisa untuk object, union, atau primitive.

\`\`\`typescript
// Object Type
type Point = {
  x: number;
  y: number;
};

// Union Type (Hanya bisa pakai 'type', tidak bisa 'interface')
type Status = "Success" | "Pending" | "Failed"; // Literal Type

let currentStatus: Status = "Pending";
// currentStatus = "Error"; // ❌ Error: Type '"Error"' is not assignable to type 'Status'.
\`\`\`

## Kapan pakai yang mana?
- Gunakan **Interface** untuk mendefinisikan objek/API response (karena fitur *extends* lebih rapi).
- Gunakan **Type** untuk Union, Tuple, atau fungsi kompleks.

## 🎯 Outcome Modul
- Bisa membuat kontrak data (contract) menggunakan Interface.
- Mengerti konsep *Optional chaining* (\`?\`) dan *Readonly*.
`,
    level: 'intermediate',
    order: 3,
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: 'ts-04',
    user_type: 'student',
    language: 'typescript',
    title: 'Functions & Narrowing',
    description: 'Typing arguments, return types, void, dan Type Guards.',
    content: `# Fungsi & Validasi Tipe

## 1. Typing Function
\`\`\`typescript
// (a: tipe, b: tipe): tipe_return
const multiply = (a: number, b: number): number => {
  return a * b;
};

// Void: Fungsi yang tidak mengembalikan nilai
function logPesan(pesan: string): void {
  console.log(pesan);
}
\`\`\`

## 2. Narrowing (Penyempitan Tipe)
Saat menggunakan Union Type (\`string | number\`), kita harus cek tipe datanya dulu sebelum melakukan operasi spesifik.

\`\`\`typescript
function printId(id: string | number) {
  if (typeof id === "string") {
    // Di dalam blok ini, TS tahu id adalah STRING
    console.log("ID Huruf Besar:", id.toUpperCase());
  } else {
    // Di sini, TS tahu id pasti NUMBER
    console.log("ID Angka:", id.toFixed(2));
  }
}
\`\`\`

## 🎯 Outcome Modul
- Mencegah bug umum seperti \`undefined\` pada argumen fungsi.
- Memahami konsep *Type Guard* (\`typeof\`, \`instanceof\`).
`,
    level: 'intermediate',
    order: 4,
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: 'ts-05',
    user_type: 'student',
    language: 'typescript',
    title: 'Generics: Reusable Code',
    description: 'Konsep Generics <T>, Generic Functions, dan Generic Interfaces.',
    content: `# Generics <T>

Generics memungkinkan kita membuat komponen yang bisa bekerja dengan **berbagai tipe data**, namun tetap menjaga keamanan tipe.
Bayangkan \`T\` sebagai **variabel untuk tipe data**.

## 1. Masalah Tanpa Generics
\`\`\`typescript
function identity(arg: any): any {
  return arg;
}
// Kita kehilangan info tipe. Masuk string, keluar any.
\`\`\`

## 2. Solusi Generics
\`\`\`typescript
function identity<T>(arg: T): T {
  return arg;
}

let output1 = identity<string>("Halo"); // Tipe jadi string
let output2 = identity<number>(100);    // Tipe jadi number
// output2.toUpperCase(); // ❌ Error, karena TS tahu output2 adalah number
\`\`\`

## 3. Generic Interface (Sangat berguna untuk API Response)
\`\`\`typescript
interface ApiResponse<T> {
  status: number;
  message: string;
  data: T; // Isi data bisa berubah-ubah strukturnya
}

interface User { name: string }
interface Product { title: string; price: number }

const responseUser: ApiResponse<User> = {
  status: 200,
  message: "OK",
  data: { name: "Dino" } // Harus sesuai interface User
};

const responseProduct: ApiResponse<Product> = {
  status: 200,
  message: "OK",
  data: { title: "Laptop", price: 5000 } // Harus sesuai Product
};
\`\`\`

## 🎯 Outcome Modul
- Tidak takut melihat simbol \`<T>\`.
- Bisa membuat wrapper API response yang dinamis.
`,
    level: 'advanced',
    order: 5,
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: 'ts-06',
    user_type: 'student',
    language: 'typescript',
    title: 'Utility Types: Senjata Rahasia TS',
    description: 'Partial, Required, Pick, Omit, Record. Wajib untuk React/Backend.',
    content: `# Utility Types

TypeScript menyediakan "alat bantu" untuk memanipulasi tipe yang sudah ada.

Misalkan kita punya interface induk:
\`\`\`typescript
interface Todo {
  title: string;
  description: string;
  completed: boolean;
}
\`\`\`

## 1. Partial<T>
Membuat semua properti jadi **Optional**. Berguna untuk fungsi *Update*.
\`\`\`typescript
// Saat update, kita mungkin cuma mau ganti title saja
function updateTodo(fields: Partial<Todo>) {
  // fields bisa berisi { title: "Baru" } tanpa error field lain kurang
}
\`\`\`

## 2. Pick<T, Keys> & Omit<T, Keys>
- **Pick:** Pilih sebagian properti saja.
- **Omit:** Buang sebagian properti.

\`\`\`typescript
// Tipe baru hanya berisi title dan completed
type TodoPreview = Pick<Todo, "title" | "completed">;

// Tipe baru tanpa description
type TodoSimple = Omit<Todo, "description">;
\`\`\`

## 3. Record<Keys, Type>
Membuat objek dengan key dan value tertentu. Pengganti \`object\` biasa.
\`\`\`typescript
// Key harus string (nama page), Value harus string (url)
const nav: Record<string, string> = {
  home: "/home",
  about: "/about",
  // contact: 123 // ❌ Error: Value must be string
};
\`\`\`

## 🎯 Outcome Modul
- Coding lebih cepat dengan memanipulasi tipe yang ada daripada menulis ulang.
- Menguasai tools yang sering muncul di library React/Vue.
`,
    level: 'advanced',
    order: 6,
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: 'ts-07',
    user_type: 'student',
    language: 'typescript',
    title: 'Studi Kasus 1: Manajemen Keranjang Belanja',
    description: 'Latihan menerapkan Interface, Array of Objects, dan Function Logic.',
    content: `# Studi Kasus 1: Shopping Cart Logic

## 📜 Skenario
Anda diminta membuat logic backend sederhana untuk fitur keranjang belanja e-commerce.
1.  Setiap produk punya \`id\`, \`name\`, dan \`price\`.
2.  Item di keranjang (\`CartItem\`) adalah produk dengan tambahan \`qty\` (jumlah).
3.  Buat fungsi untuk menambah item dan menghitung total harga.

## 💻 Solusi Code
\`\`\`typescript
interface Product {
  id: number;
  name: string;
  price: number;
}

// Inheritance: CartItem mewarisi semua sifat Product + ada qty
interface CartItem extends Product {
  qty: number;
}

class ShoppingCart {
  private items: CartItem[] = [];

  addToCart(product: Product, quantity: number): void {
    // Cek apakah barang sudah ada?
    const existingItem = this.items.find((item) => item.id === product.id);

    if (existingItem) {
      existingItem.qty += quantity;
    } else {
      // Spread operator untuk menggabungkan product + qty
      this.items.push({ ...product, qty: quantity });
    }
  }

  getTotal(): number {
    return this.items.reduce((total, item) => total + (item.price * item.qty), 0);
  }

  showCart(): void {
    console.log("Isi Keranjang:", JSON.stringify(this.items, null, 2));
  }
}

// --- EKSEKUSI ---
const cart = new ShoppingCart();
const laptop: Product = { id: 1, name: "MacBook", price: 15000000 };
const mouse: Product = { id: 2, name: "Logitech", price: 200000 };

cart.addToCart(laptop, 1);
cart.addToCart(mouse, 2); // Beli 2 mouse
cart.addToCart(laptop, 1); // Tambah 1 laptop lagi (Total jadi 2)

cart.showCart();
console.log("Total Bayar: Rp", cart.getTotal());
\`\`\`

## ✅ Hasil yang Diharapkan
\`\`\`text
Isi Keranjang: [
  { "id": 1, "name": "MacBook", "price": 15000000, "qty": 2 },
  { "id": 2, "name": "Logitech", "price": 200000, "qty": 2 }
]
Total Bayar: Rp 30400000
\`\`\`
`,
    level: 'advanced',
    order: 7,
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: 'ts-08',
    user_type: 'student',
    language: 'typescript',
    title: 'Studi Kasus 2: Flexible API Handler (Generics)',
    description: 'Latihan menerapkan Generics <T> untuk menangani response API yang beragam.',
    content: `# Studi Kasus 2: Type-Safe API Fetcher

## 📜 Skenario
Aplikasi Anda mengambil data dari berbagai endpoint API (/users, /products, /settings).
Format respon dari server backend SELALU konsisten:
\`\`\`json
{
  "success": true,
  "data": ... (isi beda-beda tergantung endpoint) ...
}
\`\`\`
Tugas: Buat fungsi \`fetchData\` yang menggunakan **Generics**, agar saat kita mengambil data Users, autocomplete editor tahu isinya adalah User, bukan \`any\`.

## 💻 Solusi Code
\`\`\`typescript
// 1. Bentuk Response Standar Backend
interface BaseResponse<T> {
  success: boolean;
  data: T;
  error?: string;
}

// 2. Definisi Tipe Data Aplikasi
interface UserProfile {
  id: number;
  username: string;
}

interface ProductDetail {
  sku: string;
  stock: number;
}

// 3. Fungsi Simulasi Fetch API dengan Generics
async function fetchData<T>(endpoint: string): Promise<BaseResponse<T>> {
  console.log(\`Fetching from \${endpoint}...\`);
  
  // Simulasi data dummy berdasarkan endpoint
  // (Di dunia nyata ini adalah fetch() atau axios.get())
  let dummyData: any;
  
  if (endpoint === "/user/1") {
    dummyData = { id: 1, username: "dev_master" };
  } else if (endpoint === "/product/A") {
    dummyData = { sku: "XYZ-99", stock: 50 };
  }

  return {
    success: true,
    data: dummyData as T // Casting ke T
  };
}

// --- EKSEKUSI ---
async function main() {
  // Kasus A: Ambil User
  // Kita beri tahu Generics bahwa T adalah UserProfile
  const userRes = await fetchData<UserProfile>("/user/1");
  
  if (userRes.success) {
    // Autocomplete aktif! Ketik userRes.data. akan muncul 'username'
    console.log("User:", userRes.data.username.toUpperCase());
  }

  // Kasus B: Ambil Product
  const prodRes = await fetchData<ProductDetail>("/product/A");
  
  if (prodRes.success) {
    // Autocomplete tahu di sini adanya 'stock', bukan 'username'
    console.log("Stock:", prodRes.data.stock);
  }
}

main();
\`\`\`

## ✅ Hasil yang Diharapkan
\`\`\`text
Fetching from /user/1...
User: DEV_MASTER
Fetching from /product/A...
Stock: 50
\`\`\`
*Poin penting: Jika anda mencoba akses \`prodRes.data.username\`, TypeScript akan memberi garis merah (Error) sebelum kode dijalankan.*
`,
    level: 'advanced',
    order: 8,
    created_at: '2025-01-01T00:00:00Z'
  },
];