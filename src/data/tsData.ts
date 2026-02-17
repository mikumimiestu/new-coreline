import type { LearningMaterial } from '../types/learning';

export const MOCK_MATERIALS: LearningMaterial[] = [
  // ==================== LEVEL 1: BEGINNER (DASAR) ====================
  {
    id: 'ts-01',
    user_type: 'student',
    language: 'typescript',
    title: '1. Pengenalan: Hello World & Setup',
    description: 'Instalasi, konfigurasi tsconfig.json, dan eksekusi kode pertama.',
    content: `# 📘 Pengenalan TypeScript

## Apa itu TypeScript?
TypeScript (TS) adalah *superset* dari JavaScript. Artinya, TS adalah JavaScript + **Type System**.
Browser tidak mengerti TS, jadi kita butuh **Compiler** (\`tsc\`) untuk mengubah (compile) TS menjadi JavaScript biasa.

## 🚀 Tutorial: Setup Pertama Kali
1.  **Install TypeScript Global:**
    \`\`\`bash
    npm install -g typescript ts-node
    \`\`\`
    *(ts-node berguna untuk menjalankan file .ts langsung di terminal tanpa compile manual)*

2.  **Buat Folder Project:**
    \`\`\`bash
    mkdir belajar-ts
    cd belajar-ts
    tsc --init
    \`\`\`
    Perintah ini membuat file \`tsconfig.json\`.

3.  **Coding Pertama (index.ts):**
    Buat file \`index.ts\` dan ketik:
    \`\`\`typescript
    let pesan: string = "Hello World TypeScript";
    console.log(pesan);
    \`\`\`

4.  **Jalankan:**
    \`\`\`bash
    ts-node index.ts
    \`\`\`

## ⚙️ tsconfig.json Penting
Pastikan setting ini aktif di \`tsconfig.json\` untuk standar modern:
\`\`\`json
{
  "compilerOptions": {
    "target": "es2018",       // Versi JS output
    "module": "commonjs",     // Sistem modul
    "strict": true,           // Wajib! Mode ketat (no implicit any)
    "rootDir": "./src",       // Tempat file .ts
    "outDir": "./dist"        // Tempat hasil compile .js
  }
}
\`\`\`

## 🎯 Outcome
- Berhasil menjalankan file TypeScript pertama.
- Memahami alur kerja TS -> JS.
`,
    level: 'beginner',
    order: 1,
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: 'ts-02',
    user_type: 'student',
    language: 'typescript',
    title: '2. Basic Types & Primitives',
    description: 'Tipe data primitif, Array, Tuple, dan bahaya tipe Any.',
    content: `# Tipe Data Dasar

Di TS, kita mendefinisikan tipe variabel secara eksplisit (atau membiarkan TS menebaknya/Inference).

## 1. Primitives
\`\`\`typescript
let username: string = "Dino";
let age: number = 25;
let isStudent: boolean = true;

// Bahaya! Jangan sering pakai 'any'.
// 'any' mematikan fitur pengecekan TS.
let randomData: any = "Bisa string";
randomData = 100; // Tidak error, tapi berbahaya
\`\`\`

## 2. Array & Tuple
\`\`\`typescript
// Array
let skills: string[] = ["JS", "TS", "React"];
let grades: Array<number> = [90, 85, 88];

// Tuple: Array dengan panjang & tipe urutan tetap
// Cocok untuk format data ketat seperti CSV row atau koordinat
let userRole: [number, string] = [1, "Admin"];
// userRole[0] = "Admin"; // ❌ Error: Index 0 harus number
\`\`\`

## 3. Union Types (Si "Atau")
Variabel yang bisa menerima lebih dari satu tipe.
\`\`\`typescript
let id: string | number;
id = 101;     // OK
id = "U-101"; // OK
// id = true; // ❌ Error
\`\`\`

## 🎯 Outcome
- Bisa mendeklarasikan variabel dengan tipe yang aman.
- Tahu kapan menggunakan Tuple vs Array biasa.
`,
    level: 'beginner',
    order: 2,
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: 'ts-03',
    user_type: 'student',
    language: 'typescript',
    title: '3. Object Shape: Interface vs Type',
    description: 'Mendefinisikan bentuk objek, Optional properties, dan Readonly.',
    content: `# Interface vs Type Alias

Bagaimana cara kita memberi tipe pada sebuah Object?

## 1. Interface
Biasanya digunakan untuk model data (Entity). Bisa diperluas (extend).

\`\`\`typescript
interface User {
  id: number;
  name: string;
  email?: string;      // Tanda '?' artinya Optional (boleh kosong)
  readonly role: string; // 'readonly' = tidak bisa diedit setelah dibuat
}

const u1: User = {
  id: 1,
  name: "Budi",
  role: "Admin"
};

// u1.role = "User"; // ❌ Error: Read-only property
\`\`\`

## 2. Type Alias
Lebih fleksibel. Bisa untuk object, tapi juga bisa untuk Union atau Primitive custom.

\`\`\`typescript
// Custom Type untuk status
type Status = "Success" | "Pending" | "Failed"; // Literal Type

let appStatus: Status = "Pending";
// appStatus = "Error"; // ❌ Error: Hanya boleh 3 kata di atas
\`\`\`

## Kapan pakai yang mana?
- **Interface:** Untuk Objek, Class, atau Response API.
- **Type:** Untuk Union, Tuple, atau fungsi yang kompleks.

## 🎯 Outcome
- Bisa membuat kontrak data (Schema) yang rapi.
- Memahami Optional Property (\`?\`).
`,
    level: 'beginner',
    order: 3,
    created_at: '2025-01-01T00:00:00Z'
  },

  // ==================== LEVEL 2: INTERMEDIATE (MENENGAH) ====================
  {
    id: 'ts-04',
    user_type: 'student',
    language: 'typescript',
    title: '4. Functions & Narrowing',
    description: 'Typing arguments, return types, dan teknik Narrowing.',
    content: `# Fungsi & Validasi Tipe

## 1. Typing Function
Format: \`(param: tipe): tipe_return\`

\`\`\`typescript
const multiply = (a: number, b: number): number => {
  return a * b;
};

// Void: Fungsi yang tidak mengembalikan nilai (hanya aksi)
function logError(pesan: string): void {
  console.error(pesan);
}
\`\`\`

## 2. Narrowing (Penyempitan Tipe)
Saat menggunakan Union Type (\`string | number\`), TS butuh kepastian tipe apa yang sedang diproses.

\`\`\`typescript
function printId(id: string | number) {
  // id.toUpperCase(); // ❌ Error: number tidak punya toUpperCase

  if (typeof id === "string") {
    // Di dalam blok ini, TS tahu id 100% STRING
    console.log("ID String:", id.toUpperCase());
  } else {
    // Di sini, TS tahu id pasti NUMBER
    console.log("ID Number:", id.toFixed(2));
  }
}
\`\`\`

## 🎯 Outcome
- Mencegah bug *undefined* atau salah operasi pada fungsi.
- Memahami konsep *Type Guard* (\`typeof\`).
`,
    level: 'intermediate',
    order: 4,
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: 'ts-05',
    user_type: 'student',
    language: 'typescript',
    title: '5. Classes & OOP Modern',
    description: 'Class, Access Modifiers (Public/Private), dan Abstract Class.',
    content: `# Object Oriented Programming (OOP) di TS

TypeScript mengubah cara kita menulis Class di JS menjadi lebih mirip Java/C#.

## 1. Access Modifiers
Mengatur siapa yang boleh mengakses properti.

\`\`\`typescript
class BankAccount {
  public owner: string;       // Bisa diakses siapa saja
  private _balance: number;   // HANYA bisa diakses di dalam class ini
  protected type: string;     // Bisa diakses class ini & turunannya (anak)

  constructor(owner: string, balance: number) {
    this.owner = owner;
    this._balance = balance;
    this.type = "Savings";
  }

  deposit(amount: number) {
    this._balance += amount;
  }

  getBalance() {
    return this._balance;
  }
}

const myAccount = new BankAccount("Dino", 1000);
myAccount.deposit(500);
// console.log(myAccount._balance); // ❌ Error: Property '_balance' is private.
\`\`\`

## 2. Abstract Class
Sebuah "cetakan dasar" yang tidak bisa dibuat objeknya langsung, tapi harus di-extend oleh class lain.

\`\`\`typescript
abstract class Hewan {
  constructor(public nama: string) {}
  
  // Method ini WAJIB di-implementasikan oleh anak class
  abstract bersuara(): void; 
  
  bernapas() {
    console.log("Sedang bernapas...");
  }
}

class Kucing extends Hewan {
  bersuara() {
    console.log("Meow!");
  }
}

// const h = new Hewan("A"); // ❌ Error: Cannot create instance of abstract class
\`\`\`

## 🎯 Outcome
- Siap menggunakan Framework OOP seperti NestJS atau Angular.
- Mengerti enkapsulasi data.
`,
    level: 'intermediate',
    order: 5,
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: 'ts-06',
    user_type: 'student',
    language: 'typescript',
    title: '6. Generics: Reusable Code',
    description: 'Konsep Generics <T> agar kode fleksibel namun tetap type-safe.',
    content: `# Generics <T>

Generics memungkinkan kita membuat komponen yang bisa bekerja dengan **berbagai tipe data**. Bayangkan \`T\` sebagai **variabel untuk tipe data**.

## 1. Masalah Tanpa Generics
\`\`\`typescript
function identity(arg: any): any {
  return arg;
}
// Masuk string, keluar 'any'. Kita kehilangan proteksi tipe.
\`\`\`

## 2. Solusi Generics
\`\`\`typescript
function identity<T>(arg: T): T {
  return arg;
}

// Cara pakai:
let output1 = identity<string>("Halo"); // Tipe output1 otomatis string
let output2 = identity<number>(100);    // Tipe output2 otomatis number
\`\`\`

## 3. Generic Interface (Wajib untuk API Response)
Pola paling umum di Frontend/Backend.

\`\`\`typescript
interface ApiResponse<T> {
  status: number;
  message: string;
  data: T; // Isi data bisa berubah-ubah strukturnya
}

interface User { name: string }
interface Product { title: string; price: number }

// Response berisi User
const resUser: ApiResponse<User> = {
  status: 200,
  message: "OK",
  data: { name: "Dino" } 
};

// Response berisi Product
const resProduct: ApiResponse<Product> = {
  status: 200,
  message: "OK",
  data: { title: "Laptop", price: 5000 }
};
\`\`\`

## 🎯 Outcome
- Tidak takut melihat simbol \`<T>\`.
- Bisa membuat wrapper API response yang dinamis.
`,
    level: 'intermediate',
    order: 6,
    created_at: '2025-01-01T00:00:00Z'
  },

  // ==================== LEVEL 3: ADVANCED (MAHIR) ====================
  {
    id: 'ts-07',
    user_type: 'student',
    language: 'typescript',
    title: '7. Utility Types',
    description: 'Partial, Pick, Omit, Record. Tools wajib developer produktif.',
    content: `# Utility Types

TypeScript menyediakan "alat bantu" (built-in) untuk memanipulasi tipe.

Misalkan kita punya interface induk:
\`\`\`typescript
interface Todo {
  title: string;
  description: string;
  completed: boolean;
}
\`\`\`

## 1. Partial<T> & Required<T>
- \`Partial\`: Membuat semua properti jadi optional (untuk update form).
- \`Required\`: Kebalikannya.

\`\`\`typescript
function updateTodo(fields: Partial<Todo>) {
  // fields bisa cuma { completed: true } tanpa error
}
\`\`\`

## 2. Pick<T, K> & Omit<T, K>
- \`Pick\`: Ambil sebagian properti saja.
- \`Omit\`: Buang sebagian properti.

\`\`\`typescript
// Tipe baru hanya berisi title dan completed
type TodoPreview = Pick<Todo, "title" | "completed">;

// Tipe baru tanpa description
type TodoSimple = Omit<Todo, "description">;
\`\`\`

## 3. Record<K, V>
Membuat objek dinamis dengan key dan value tertentu.
\`\`\`typescript
// Key harus string (ID user), Value harus number (Score)
const scores: Record<string, number> = {
  "user_1": 100,
  "user_2": 85,
  // "user_3": "High" // ❌ Error: Value must be number
};
\`\`\`

## 🎯 Outcome
- Coding lebih cepat dengan memanipulasi tipe yang ada.
`,
    level: 'advanced',
    order: 7,
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: 'ts-08',
    user_type: 'student',
    language: 'typescript',
    title: '8. Advanced Types: Mapped & Conditional',
    description: 'Teknik "Sihir" TypeScript: keyof, typeof, dan logika tipe.',
    content: `# Advanced Type Manipulation

Ini adalah level di mana Anda mulai "memprogram" tipe data itu sendiri.

## 1. keyof Operator
Mengambil *key* dari sebuah object interface sebagai Union Type.
\`\`\`typescript
interface Person {
  name: string;
  age: number;
}
type PersonKeys = keyof Person; // "name" | "age"
\`\`\`

## 2. Mapped Types
Membuat tipe baru berdasarkan perulangan key tipe lain.
Contoh: Membuat tipe yang semua field-nya *boolean* (untuk validasi form).

\`\`\`typescript
// Loop semua key di T, ubah valuenya jadi boolean
type Flags<T> = {
  [Key in keyof T]: boolean;
};

type PersonFlags = Flags<Person>;
/* Hasilnya:
{
  name: boolean;
  age: boolean;
}
*/
\`\`\`

## 3. Conditional Types
Logika \`if-else\` dalam definisi tipe.
\`Format: T extends U ? X : Y\`

\`\`\`typescript
type IsString<T> = T extends string ? "Yes" : "No";

type A = IsString<string>;  // "Yes"
type B = IsString<number>;  // "No"
\`\`\`

## 🎯 Outcome
- Memahami cara kerja library kompleks (seperti Redux/Prisma).
- Bisa membuat tipe yang sangat dinamis.
`,
    level: 'expert',
    order: 8,
    created_at: '2025-01-01T00:00:00Z'
  },

  // ==================== STUDI KASUS (PRACTICE) ====================
  {
    id: 'ts-09',
    user_type: 'student',
    language: 'typescript',
    title: 'Studi Kasus 1: Shopping Cart Logic',
    description: 'Latihan menerapkan Interface, Inheritance, dan Array Logic.',
    content: `# Studi Kasus: Shopping Cart

## 📜 Misi
Buat logic keranjang belanja di mana:
1.  Item keranjang punya \`qty\`.
2.  Bisa hitung total harga.
3.  Menggunakan **Class** dan **Interface**.

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
    const existing = this.items.find((item) => item.id === product.id);
    if (existing) {
      existing.qty += quantity;
    } else {
      this.items.push({ ...product, qty: quantity });
    }
  }

  getTotal(): number {
    return this.items.reduce((sum, item) => sum + (item.price * item.qty), 0);
  }
}

// --- TEST ---
const cart = new ShoppingCart();
cart.addToCart({ id: 1, name: "MacBook", price: 15 }, 1);
cart.addToCart({ id: 2, name: "Mouse", price: 2 }, 5);

console.log("Total:", cart.getTotal()); // Total: 25
\`\`\`
`,
    level: 'intermediate',
    order: 9,
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: 'ts-10',
    user_type: 'student',
    language: 'typescript',
    title: 'Studi Kasus 2: Flexible API Handler',
    description: 'Penerapan Generics <T> untuk handle berbagai response API.',
    content: `# Studi Kasus: Generic API Fetcher

## 📜 Misi
Buat fungsi \`fetchData\` yang tipe return-nya mengikuti endpoint yang dipanggil.

## 💻 Solusi Code
\`\`\`typescript
interface BaseResponse<T> {
  success: boolean;
  data: T;
}

interface User { id: number; username: string; }
interface Product { sku: string; stock: number; }

// Generic Function
async function fetchData<T>(endpoint: string): Promise<BaseResponse<T>> {
  // Simulasi fetch
  const dummy: any = endpoint.includes("user") 
    ? { id: 1, username: "admin" } 
    : { sku: "ABC", stock: 99 };

  return { success: true, data: dummy };
}

async function main() {
  // 1. Fetch User (Explicit Generic)
  const userRes = await fetchData<User>("/api/user");
  console.log(userRes.data.username); // Autocomplete: username ✅

  // 2. Fetch Product
  const prodRes = await fetchData<Product>("/api/product");
  console.log(prodRes.data.stock); // Autocomplete: stock ✅
}
\`\`\`
`,
    level: 'advanced',
    order: 10,
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: 'ts-11',
    user_type: 'student',
    language: 'typescript',
    title: 'Studi Kasus 3: Type-Safe Event Emitter',
    description: 'Level Expert: Menggabungkan Keyof, Mapped Types, dan Generics.',
    content: `# Expert Case: Type-Safe Event Emitter

## 📜 Masalah
Event Emitter biasa di JS tidak aman. Kita bisa kirim nama event yang salah atau data payload yang tidak sesuai dengan event-nya.

## 🎯 Goal
Buat class \`TypedEmitter\` dimana:
1.  Hanya nama event yang terdaftar yang boleh dipanggil (\`on\` / \`emit\`).
2.  Argument data harus sesuai dengan nama eventnya.

## 💻 Solusi "Level Dewa"
\`\`\`typescript
// 1. Definisikan Peta Event & Data-nya
type AppEvents = {
  "login": { userId: number; time: Date };
  "logout": void;
  "error": { message: string; code: number };
};

// 2. Generic Class untuk Emitter
class TypedEmitter<Events> {
  // Simpan listener (fungsi callback)
  private listeners: Partial<Record<keyof Events, Function[]>> = {};

  // Method ON:
  // - EventName dibatasi hanya key dari T (AppEvents)
  // - Callback argumennya otomatis menyesuaikan tipe payload dari EventName tersebut
  on<K extends keyof Events>(eventName: K, callback: (data: Events[K]) => void) {
    if (!this.listeners[eventName]) {
      this.listeners[eventName] = [];
    }
    this.listeners[eventName]!.push(callback);
  }

  // Method EMIT:
  // - Data yang dikirim WAJIB sesuai tipe Events[K]
  emit<K extends keyof Events>(eventName: K, data: Events[K]) {
    const eventListeners = this.listeners[eventName];
    if (eventListeners) {
      eventListeners.forEach(fn => fn(data));
    }
  }
}

// --- EKSEKUSI ---
const app = new TypedEmitter<AppEvents>();

// ✅ Valid
app.on("login", (payload) => {
  // TS otomatis tahu payload punya userId & time!
  console.log("User Login:", payload.userId);
});

app.emit("login", { userId: 1, time: new Date() }); // ✅ OK

// ❌ Error Cases (Dicegah TS sebelum running):
// app.on("register", () => {}); // Error: Event "register" tidak ada di AppEvents
// app.emit("login", { userId: "budi" }); // Error: userId harus number
// app.emit("error", { message: "Fail" }); // Error: Kurang properti 'code'
\`\`\`

## 🧠 Analisis
Kode di atas menggunakan teknik:
- **Generic Constraint** (\`K extends keyof Events\`): Membatasi input string.
- **Indexed Access Type** (\`Events[K]\`): Mengambil tipe data spesifik berdasarkan key yang dipilih.
`,
    level: 'expert',
    order: 11,
    created_at: '2025-01-01T00:00:00Z'
  },
];