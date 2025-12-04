import type { LearningMaterial } from '../types/learning';
export interface User {
  id: string;
  access_code: string;
  photo_url?: string;
  user_type: 'student' | 'umum' | 'pro' | 'game';
  name: string;
  username: string;
  email: string;
  phone: string | null;
  subscription_type: 'free' | 'plus' | 'pro';
  subscription_period: 'monthly' | 'yearly' | null;
  subscription_start: string | null;
  subscription_end: string | null;
  subscription_status: 'active' | 'expired' | 'cancelled';
  created_at: string;
  last_login: string;
}
export interface Subscription {
  id: string;
  user_id: string;
  subscription_type: 'plus' | 'pro';
  period: 'monthly' | 'yearly';
  amount: number;
  currency: string;
  status: 'pending' | 'paid' | 'failed' | 'cancelled';
  start_date: string | null;
  end_date: string | null;
  payment_date: string | null;
  created_at: string;
}

export const MOCK_MATERIALS: LearningMaterial[] = [
  // ==================== JAVASCRIPT MATERIALS ====================
  {
    id: 'js-01',
    user_type: 'student',
    language: 'javascript',
    title: 'Pengenalan JavaScript & Evolusi ECMAScript',
    description: 'Sejarah JS, standar ECMAScript, runtime (Browser & Node).',
    content: `# Pengenalan JavaScript

## Ringkasan
JavaScript adalah bahasa **single-threaded**, **prototype-based**, berjalan di **browser** dan **Node.js** (server).

## Evolusi ECMAScript (Ringkas)
| Edisi | Tahun | Fitur Kunci |
|:--:|:--:|:--|
| ES5 | 2009 | strict mode, Array extras |
| ES6 | 2015 | let/const, arrow fn, class, modules |
| ES2020+ | 2020– | BigInt, optional chaining, nullish coalescing |

## Runtime
- **Browser**: DOM, Web APIs
- **Node.js**: V8, fs, http, npm

\`\`\`javascript
console.log("Halo JS!");
\`\`\`

## Outcome Modul
- Mengetahui posisi JS di stack modern & bedanya Browser vs Node.
`,
    level: 'beginner',
    order: 1,
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: 'js-02',
    user_type: 'student',
    language: 'javascript',
    title: 'Bahasa & Tipe: Scope, Hoisting, Module, Strict Mode',
    description: 'Fundamental bahasa, coercion, module ESM, gaya modern.',
    content: `# Bahasa & Tipe

## Scope & Hoisting
\`\`\`javascript
"use strict";
let x = 1;
{
  let x = 2; // block scope
}
console.log(x); // 1
\`\`\`

## Tipe & Coercion
\`\`\`javascript
Number("10") === 10; // true
"5" + 1 // "51" (string concat)
\`\`\`

## Modules (ESM)
\`\`\`javascript
// math.js
export function add(a,b){ return a+b; }

// main.js
import { add } from "./math.js";
console.log(add(2,3));
\`\`\`

## Outcome Modul
- Menghindari pitfall coercion & paham **ESM** modern.
`,
    level: 'beginner',
    order: 2,
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: 'js-03',
    user_type: 'student',
    language: 'javascript',
    title: 'Asynchronous JS: Event Loop, Promise, async/await',
    description: 'Microtask vs macrotask, fetch API, error handling async.',
    content: `# Async JS

## Event Loop Singkat
- **Call Stack**, **Web APIs**, **Callback Queue**, **Microtask Queue** (Promise)

## Promise & async/await
\`\`\`javascript
function delay(ms){ return new Promise(r => setTimeout(r, ms)); }

async function main(){
  await delay(100);
  return "done";
}

main().then(console.log).catch(console.error);
\`\`\`

## Error Handling
\`\`\`javascript
async function getJSON(url){
  const res = await fetch(url);
  if(!res.ok) throw new Error("HTTP " + res.status);
  return res.json();
}
\`\`\`

## Outcome Modul
- Menulis kode **async/await** idiomatis & paham event loop.
`,
    level: 'intermediate',
    order: 3,
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: 'js-04',
    user_type: 'student',
    language: 'javascript',
    title: 'DOM & Web APIs Modern',
    description: 'DOM query/update, fetch, Storage, Worker, Performance.',
    content: `# DOM & Web APIs

## DOM Manipulation
\`\`\`javascript
const btn = document.querySelector("#go");
btn.addEventListener("click", () => {
  const el = document.createElement("div");
  el.textContent = "Clicked!";
  document.body.appendChild(el);
});
\`\`\`

## Storage & Fetch
\`\`\`javascript
localStorage.setItem("token","xxx");
const token = localStorage.getItem("token");

const res = await fetch("/api/data");
const data = await res.json();
\`\`\`

## Web Workers (Ringkas)
Pisahkan kerja CPU-bound ke worker agar UI tetap responsif.

## Outcome Modul
- Mampu integrasi **Web APIs** dan menulis UI tanpa blocking.
`,
    level: 'intermediate',
    order: 4,
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: 'js-05',
    user_type: 'student',
    language: 'javascript',
    title: 'Node.js Fundamentals & Tooling',
    description: 'npm/yarn/pnpm, fs/http, ESM vs CJS, env, scripts.',
    content: `# Node.js & Tooling

## npm & Scripts
\`\`\`bash
npm init -y
npm run dev
\`\`\`

## fs & http
\`\`\`javascript
import { readFile } from "node:fs/promises";
import http from "node:http";

const server = http.createServer(async (req,res)=>{
  const html = await readFile("./index.html","utf8");
  res.writeHead(200,{"content-type":"text/html"}).end(html);
});
server.listen(3000);
\`\`\`

## ESM vs CJS
- Gunakan **"type": "module"** di package.json untuk ESM default.

## Outcome Modul
- Menulis server Node dasar dan memahami ekosistem npm.
`,
    level: 'intermediate',
    order: 5,
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: 'js-06',
    user_type: 'student',
    language: 'javascript',
    title: 'Quality: ESLint, Prettier, Vitest/Jest & TS via JSDoc',
    description: 'Standar proyek, test, coverage, type-check ringan.',
    content: `# Kualitas Kode & Testing

## Lint & Format
\`\`\`bash
npm i -D eslint prettier
npx eslint --init
\`\`\`

## Test (Vitest/Jest)
\`\`\`bash
npm i -D vitest
npx vitest
\`\`\`

\`\`\`javascript
// math.test.js
import { expect, test } from "vitest";
import { add } from "./math.js";
test("add", ()=> expect(add(2,3)).toBe(5));
\`\`\`

## Type-Check via JSDoc
\`\`\`javascript
/**
 * @param {number} a
 * @param {number} b
 * @returns {number}
 */
export function add(a,b){ return a+b; }
\`\`\`

## Outcome Modul
- Proyek **linted**, **formatted**, dan **tested** dengan coverage.
`,
    level: 'advanced',
    order: 6,
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: 'js-07',
    user_type: 'student',
    language: 'javascript',
    title: 'Arsitektur & Pola: FP/OOP, Modular, State & Data Layer',
    description: 'SOLID di JS, dependency injection ringan, error boundary.',
    content: `# Arsitektur & Pola

## Modular & Dependency Injection
\`\`\`javascript
// payment.js
export class Gopay { pay(x){ console.log("Gopay:", x); } }
export class Dana { pay(x){ console.log("Dana:", x); } }

// checkout.js
export function checkout(provider, amount){
  provider.pay(amount);
}
\`\`\`

## FP vs OOP
- FP: pure function, immutability (gunakan Object.freeze/structuredClone saat perlu)
- OOP: class, encapsulation, inheritance/komposisi

## Error Handling & Boundary
- Centralized error handler, logging, fallback UI (di React/Next)

## Outcome Modul
- Mendesain modul berskala tim, efisien & maintainable.
`,
    level: 'advanced',
    order: 7,
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: 'js-08',
    user_type: 'student',
    language: 'javascript',
    title: 'Security, Performance Web, CI/CD & Final Assessment',
    description: 'OWASP dasar, perf budget, Lighthouse, build pipeline, rubrik.',
    content: `# Security, Performance & Sertifikasi

## Security (Ringkas)
- **OWASP**: XSS (escape output), CSRF (SameSite cookie/token), SSRF, Injection
- Audit deps: \`npm audit\`, lockfile, update rutin

## Performance
- Code-splitting, lazy loading
- Gambar: responsive, formats modern
- **Lighthouse** & web-vitals

## CI/CD (contoh GitHub Actions)
\`\`\`yaml
name: web-ci
on: [push, pull_request]
jobs:
  ci:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: '20' }
      - run: npm ci
      - run: npm run lint
      - run: npm run test -- --coverage
      - run: npm run build
\`\`\`

## Final Project (Wajib)
- SPA/SSR kecil (Next/Vite vanilla) dengan:
  - State mgmt ringan
  - Routing, fetch API, error boundary
  - Test unit (≥ 80% coverage), lint/format pass

## Rubrik Sertifikasi
| Aspek | Bobot | Kriteria Lulus |
|:--|:--:|:--|
| Arsitektur & Kode | 35% | Modular, bersih, konsisten |
| Test & Kualitas | 25% | Coverage ≥ 80% |
| Security & Perf | 20% | Audit deps bersih, skor Lighthouse ≥ 90 |
| Dokumentasi | 20% | README, arsitektur, instruksi build/deploy |

## Outcome Modul
- Siap praktik industri, deployment, dan dinyatakan kompeten.
`,
    level: 'advanced',
    order: 8,
    created_at: '2025-01-01T00:00:00Z'
  },

  // ==================== TYPESCRIPT MATERIALS (NEW - FULL) ====================
  {
    id: 'ts-01',
    user_type: 'student',
    language: 'typescript',
    title: 'Pengenalan TypeScript & Evolusi',
    description: 'Apa itu TypeScript, sejarah, keunggulan vs JavaScript, ekosistem & use cases industri.',
    content: `# 🔷 Pengenalan TypeScript

## Apa itu TypeScript?
TypeScript adalah **superset** dari JavaScript yang menambahkan **static typing** dan fitur modern ke dalam bahasa.
Dikembangkan oleh **Microsoft** dan dirilis pertama kali tahun **2012**.

TypeScript di-**compile** (transpile) ke JavaScript murni, sehingga bisa berjalan di mana saja JS berjalan:
Browser, Node.js, Deno, Bun, React Native, Electron, dll.

---

## 🕰️ Sejarah TypeScript
| Tahun | Versi | Milestone |
|:---:|:---:|:---|
| 2012 | 0.8 | Rilis publik pertama oleh Microsoft |
| 2014 | 1.0 | Stabil, adopsi mulai meningkat |
| 2016 | 2.0 | Non-nullable types, control flow analysis |
| 2018 | 3.0 | Project references, unknown type |
| 2020 | 4.0 | Variadic tuple types, labeled tuples |
| 2023 | 5.0 | Decorators standar, const type params |
| 2024 | 5.4+ | NoInfer, improved narrowing |

---

## 💡 Kenapa TypeScript?

### Keunggulan vs JavaScript
| Aspek | JavaScript | TypeScript |
|:--|:--|:--|
| Typing | Dynamic (runtime) | Static (compile-time) |
| Error Detection | Saat runtime | Saat development |
| IDE Support | Terbatas | Autocomplete, refactor, intellisense |
| Maintainability | Sulit di skala besar | Lebih mudah, self-documenting |
| Learning Curve | Mudah | Sedikit lebih tinggi |

### Manfaat Utama
- **Catch bugs early** – error ketahuan sebelum runtime
- **Better tooling** – autocomplete, refactoring, go-to-definition
- **Self-documenting code** – tipe sebagai dokumentasi
- **Safer refactoring** – perubahan terdeteksi di seluruh codebase
- **Team collaboration** – kontrak antar modul lebih jelas

---

## ⚙️ Ekosistem & Use Cases

### Frontend
- **React + TypeScript** (CRA, Vite, Next.js)
- **Vue 3** (native TS support)
- **Angular** (built with TypeScript)
- **Svelte** (dengan preprocessor)

### Backend
- **Node.js** + Express/Fastify/NestJS
- **Deno** (TypeScript native)
- **Bun** (runtime modern)

### Full-Stack Frameworks
- **Next.js**, **Nuxt 3**, **Remix**, **SvelteKit**
- **tRPC** – end-to-end type safety

### Tooling
- **ESLint** + @typescript-eslint
- **Prettier**
- **ts-node**, **tsx** (run TS langsung)
- **Vitest**, **Jest** (testing)

---

## 💻 Hello TypeScript

### File pertama: \`hello.ts\`
\`\`\`typescript
// Variabel dengan tipe eksplisit
const message: string = "Halo, TypeScript!";
const year: number = 2025;
const isActive: boolean = true;

console.log(message);
console.log(\`Tahun: \${year}, Aktif: \${isActive}\`);
\`\`\`

### Compile & Run
\`\`\`bash
# Install TypeScript
npm install -g typescript

# Compile ke JavaScript
tsc hello.ts

# Jalankan hasil
node hello.js

# Atau langsung dengan tsx/ts-node
npx tsx hello.ts
\`\`\`

---

## 🔧 Konfigurasi Dasar: tsconfig.json
\`\`\`json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "outDir": "./dist",
    "rootDir": "./src"
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules"]
}
\`\`\`

---

## 🆚 TypeScript vs JavaScript

\`\`\`javascript
// JavaScript - error baru ketahuan saat runtime
function greet(name) {
  return "Hello, " + name.toUpperCase();
}
greet(123); // Runtime error!
\`\`\`

\`\`\`typescript
// TypeScript - error langsung terdeteksi
function greet(name: string): string {
  return "Hello, " + name.toUpperCase();
}
greet(123); // ❌ Compile error: Argument of type 'number' is not assignable
greet("Budi"); // ✅ OK
\`\`\`

---

## 🎯 Outcome Modul
- Memahami apa itu TypeScript dan bedanya dengan JavaScript
- Mengetahui sejarah dan evolusi TypeScript
- Mengenal ekosistem dan use cases di industri
- Dapat setup project TypeScript sederhana
- Menulis dan compile file TypeScript pertama
`,
    level: 'beginner',
    order: 1,
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: 'ts-02',
    user_type: 'student',
    language: 'typescript',
    title: 'Tipe Dasar & Type Annotations',
    description: 'Primitive types, arrays, tuples, enums, any/unknown/never, type inference.',
    content: `# Tipe Dasar TypeScript

## Primitive Types
\`\`\`typescript
// String
let nama: string = "Mikumiestu";
let greeting: string = \`Halo, \${nama}!\`;

// Number (integer & float sama)
let umur: number = 21;
let harga: number = 99.99;
let hex: number = 0xff;
let binary: number = 0b1010;

// Boolean
let aktif: boolean = true;
let verified: boolean = false;

// Null & Undefined
let kosong: null = null;
let belumAda: undefined = undefined;

// Symbol & BigInt
let id: symbol = Symbol("id");
let bigNumber: bigint = 9007199254740991n;
\`\`\`

---

## Arrays
\`\`\`typescript
// Dua cara deklarasi array
let angka: number[] = [1, 2, 3, 4, 5];
let nama: Array<string> = ["Andi", "Budi", "Cici"];

// Array dengan union type
let campuran: (string | number)[] = [1, "dua", 3, "empat"];

// Readonly array
let fixed: readonly number[] = [1, 2, 3];
// fixed.push(4); // ❌ Error: readonly
\`\`\`

---

## Tuples
Tuple adalah array dengan panjang dan tipe yang tetap per posisi.
\`\`\`typescript
// Tuple dasar
let koordinat: [number, number] = [10.5, 20.3];
let user: [number, string, boolean] = [1, "Andi", true];

// Labeled tuples (TS 4.0+)
type Point = [x: number, y: number, z?: number];
let point3D: Point = [1, 2, 3];
let point2D: Point = [1, 2];

// Destructuring
const [userId, userName, isActive] = user;
console.log(userName); // "Andi"

// Rest dalam tuple
type StringNumberBooleans = [string, number, ...boolean[]];
let data: StringNumberBooleans = ["hello", 42, true, false, true];
\`\`\`

---

## Enums
\`\`\`typescript
// Numeric enum (default)
enum Direction {
  Up,      // 0
  Down,    // 1
  Left,    // 2
  Right    // 3
}
let arah: Direction = Direction.Up;

// Custom values
enum Status {
  Pending = 1,
  Processing = 2,
  Completed = 10,
  Failed = -1
}

// String enum (recommended for clarity)
enum Color {
  Red = "RED",
  Green = "GREEN",
  Blue = "BLUE"
}

// Const enum (inline saat compile, lebih efisien)
const enum HttpStatus {
  OK = 200,
  NotFound = 404,
  ServerError = 500
}
let status = HttpStatus.OK; // Jadi literal 200 setelah compile
\`\`\`

---

## Any, Unknown, Never

### any – Matikan type checking (hindari!)
\`\`\`typescript
let apapun: any = "string";
apapun = 123;       // OK
apapun = true;      // OK
apapun.foo.bar;     // OK (tapi bisa runtime error!)
\`\`\`

### unknown – Type-safe any (harus narrowing dulu)
\`\`\`typescript
let input: unknown = getUserInput();

// Harus cek dulu sebelum pakai
if (typeof input === "string") {
  console.log(input.toUpperCase()); // OK setelah narrowing
}

// Atau dengan assertion
const str = input as string;
\`\`\`

### never – Tidak pernah return / impossible state
\`\`\`typescript
// Fungsi yang tidak pernah return
function throwError(msg: string): never {
  throw new Error(msg);
}

function infiniteLoop(): never {
  while (true) {}
}

// Exhaustive check
type Shape = "circle" | "square";
function getArea(shape: Shape): number {
  switch (shape) {
    case "circle": return Math.PI * 10;
    case "square": return 100;
    default:
      const _exhaustive: never = shape;
      return _exhaustive;
  }
}
\`\`\`

---

## Type Inference
TypeScript bisa **menyimpulkan** tipe tanpa annotation eksplisit.

\`\`\`typescript
// Inference dari nilai
let nama = "Andi";        // string
let umur = 21;            // number
let aktif = true;         // boolean
let items = [1, 2, 3];    // number[]

// Best common type
let campuran = [1, "dua"]; // (string | number)[]

// Contextual typing
document.addEventListener("click", (event) => {
  // event otomatis bertipe MouseEvent
  console.log(event.clientX);
});

// Return type inference
function tambah(a: number, b: number) {
  return a + b; // Return type: number (inferred)
}
\`\`\`

---

## Literal Types
\`\`\`typescript
// String literal
let direction: "left" | "right" | "up" | "down" = "left";

// Number literal
let diceRoll: 1 | 2 | 3 | 4 | 5 | 6 = 4;

// Boolean literal
let success: true = true;

// Const assertion (as const)
const config = {
  url: "https://api.example.com",
  method: "GET"
} as const;
// config.method bertipe "GET", bukan string
\`\`\`

---

## 🎯 Outcome Modul
- Menguasai semua primitive types di TypeScript
- Memahami perbedaan array vs tuple
- Menggunakan enum dengan tepat
- Membedakan any, unknown, dan never
- Memanfaatkan type inference untuk kode lebih bersih
- Menggunakan literal types untuk nilai spesifik
`,
    level: 'beginner',
    order: 2,
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: 'ts-03',
    user_type: 'student',
    language: 'typescript',
    title: 'Functions & Type Signatures',
    description: 'Parameter types, return types, optional/default params, rest params, overloads, generics dasar.',
    content: `# Functions di TypeScript

## Basic Function Types
\`\`\`typescript
// Function declaration dengan tipe
function tambah(a: number, b: number): number {
  return a + b;
}

// Arrow function
const kurang = (a: number, b: number): number => a - b;

// Function expression
const kali: (x: number, y: number) => number = function(x, y) {
  return x * y;
};

// Type alias untuk function
type MathOperation = (a: number, b: number) => number;
const bagi: MathOperation = (a, b) => a / b;
\`\`\`

---

## Optional & Default Parameters
\`\`\`typescript
// Optional parameter (dengan ?)
function greet(name: string, greeting?: string): string {
  return \`\${greeting || "Hello"}, \${name}!\`;
}
greet("Andi");           // "Hello, Andi!"
greet("Andi", "Halo");   // "Halo, Andi!"

// Default parameter
function createUser(
  name: string,
  role: string = "user",
  active: boolean = true
) {
  return { name, role, active };
}
createUser("Budi");                    // { name: "Budi", role: "user", active: true }
createUser("Admin", "admin", false);   // { name: "Admin", role: "admin", active: false }
\`\`\`

---

## Rest Parameters
\`\`\`typescript
// Rest parameter harus di akhir
function sum(...numbers: number[]): number {
  return numbers.reduce((acc, n) => acc + n, 0);
}
sum(1, 2, 3, 4, 5); // 15

// Dengan parameter lain
function log(prefix: string, ...messages: string[]): void {
  messages.forEach(msg => console.log(\`[\${prefix}] \${msg}\`));
}
log("INFO", "Server started", "Port 3000");

// Typed tuple rest
function padStart(padding: number, ...strings: string[]): string[] {
  return strings.map(s => s.padStart(padding));
}
\`\`\`

---

## Function Overloads
Gunakan overload untuk fungsi dengan multiple signatures.
\`\`\`typescript
// Overload signatures
function format(value: string): string;
function format(value: number): string;
function format(value: Date): string;

// Implementation signature
function format(value: string | number | Date): string {
  if (typeof value === "string") {
    return value.trim();
  } else if (typeof value === "number") {
    return value.toFixed(2);
  } else {
    return value.toISOString();
  }
}

format("  hello  "); // "hello"
format(3.14159);     // "3.14"
format(new Date());  // "2025-01-01T..."

// Praktis: createElement style
function createElement(tag: "a"): HTMLAnchorElement;
function createElement(tag: "canvas"): HTMLCanvasElement;
function createElement(tag: "div"): HTMLDivElement;
function createElement(tag: string): HTMLElement {
  return document.createElement(tag);
}

const link = createElement("a");     // HTMLAnchorElement
const canvas = createElement("canvas"); // HTMLCanvasElement
\`\`\`

---

## Generic Functions
Generics membuat fungsi fleksibel tanpa kehilangan type safety.
\`\`\`typescript
// Basic generic
function identity<T>(value: T): T {
  return value;
}
identity<string>("hello"); // "hello"
identity(42);              // number (inferred)

// Multiple type parameters
function pair<K, V>(key: K, value: V): [K, V] {
  return [key, value];
}
pair("name", "Andi");  // [string, string]
pair(1, true);         // [number, boolean]

// Generic dengan constraint
function getLength<T extends { length: number }>(item: T): number {
  return item.length;
}
getLength("hello");    // 5
getLength([1, 2, 3]);  // 3
// getLength(123);     // ❌ Error: number tidak punya length

// Generic array function
function first<T>(arr: T[]): T | undefined {
  return arr[0];
}
first([1, 2, 3]);      // number | undefined
first(["a", "b"]);     // string | undefined

// Generic dengan default
function createArray<T = string>(length: number, value: T): T[] {
  return Array(length).fill(value);
}
createArray(3, "x");   // string[]
createArray(3, 42);    // number[]
\`\`\`

---

## This Parameter
\`\`\`typescript
interface User {
  name: string;
  greet(this: User): string;
}

const user: User = {
  name: "Andi",
  greet() {
    return \`Hello, \${this.name}\`;
  }
};

// Callback dengan explicit this
function onClick(this: HTMLButtonElement, event: Event) {
  this.disabled = true; // this = HTMLButtonElement
}
\`\`\`

---

## Void vs Never vs Undefined
\`\`\`typescript
// void - fungsi tidak return value meaningful
function logMessage(msg: string): void {
  console.log(msg);
  // return undefined; // implisit
}

// undefined - eksplisit return undefined
function findUser(id: number): User | undefined {
  return users.find(u => u.id === id);
}

// never - fungsi tidak pernah return (throw/infinite)
function fail(message: string): never {
  throw new Error(message);
}
\`\`\`

---

## Callback & Higher-Order Functions
\`\`\`typescript
// Callback type
type Callback<T> = (data: T) => void;

function fetchData<T>(url: string, callback: Callback<T>): void {
  // fetch...
  callback({} as T);
}

// Higher-order function
function withLogging<T extends (...args: any[]) => any>(fn: T): T {
  return ((...args: Parameters<T>) => {
    console.log("Calling with:", args);
    const result = fn(...args);
    console.log("Result:", result);
    return result;
  }) as T;
}

const loggedAdd = withLogging((a: number, b: number) => a + b);
loggedAdd(2, 3); // Logs: Calling with: [2, 3], Result: 5
\`\`\`

---

## 🎯 Outcome Modul
- Menulis function dengan type annotations lengkap
- Menggunakan optional, default, dan rest parameters
- Membuat function overloads untuk multi-signature
- Menguasai generic functions dengan constraints
- Memahami perbedaan void, never, dan undefined
- Membuat higher-order functions type-safe
`,
    level: 'beginner',
    order: 3,
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: 'ts-04',
    user_type: 'student',
    language: 'typescript',
    title: 'Object Types, Interfaces & Type Aliases',
    description: 'Object shapes, interface vs type, extending, intersection, index signatures, mapped types.',
    content: `# Object Types, Interfaces & Type Aliases

## Object Type Annotations
\`\`\`typescript
// Inline object type
function printUser(user: { name: string; age: number }): void {
  console.log(\`\${user.name}, \${user.age} tahun\`);
}

// Optional properties
let config: {
  host: string;
  port: number;
  ssl?: boolean;  // optional
} = { host: "localhost", port: 3000 };

// Readonly properties
let point: {
  readonly x: number;
  readonly y: number;
} = { x: 10, y: 20 };
// point.x = 5; // ❌ Error: readonly
\`\`\`

---

## Interfaces
Interface mendefinisikan **kontrak** untuk object shapes.
\`\`\`typescript
interface User {
  id: number;
  name: string;
  email: string;
  avatar?: string;           // optional
  readonly createdAt: Date;  // readonly
}

const user: User = {
  id: 1,
  name: "Andi",
  email: "andi@email.com",
  createdAt: new Date()
};

// Interface untuk function
interface Greeter {
  (name: string): string;
}

const greet: Greeter = (name) => \`Hello, \${name}!\`;
\`\`\`

---

## Type Aliases
Type alias bisa untuk tipe apapun, tidak hanya object.
\`\`\`typescript
// Object type alias
type Point = {
  x: number;
  y: number;
};

// Union type
type ID = string | number;

// Tuple type
type Coordinate = [number, number];

// Function type
type Handler = (event: Event) => void;

// Literal type
type Status = "pending" | "success" | "error";

// Conditional
type NonNullable<T> = T extends null | undefined ? never : T;
\`\`\`

---

## Interface vs Type Alias

| Aspek | Interface | Type Alias |
|:--|:--|:--|
| Object shapes | ✅ | ✅ |
| Primitives/Union/Tuple | ❌ | ✅ |
| Extends/Implements | ✅ | ✅ (dengan &) |
| Declaration merging | ✅ | ❌ |
| Computed properties | ❌ | ✅ |

\`\`\`typescript
// Declaration merging (hanya interface)
interface Window {
  customProp: string;
}
// Sekarang Window punya customProp

// Union (hanya type)
type Result = Success | Error;

// Intersection (keduanya bisa)
interface A { a: string; }
interface B { b: number; }
type AB = A & B;  // atau:
interface AB2 extends A, B {}
\`\`\`

---

## Extending & Intersection
\`\`\`typescript
// Interface extends
interface Person {
  name: string;
  age: number;
}

interface Employee extends Person {
  employeeId: string;
  department: string;
}

// Multiple extends
interface Manager extends Employee {
  subordinates: Employee[];
}

// Type intersection (&)
type PersonType = {
  name: string;
  age: number;
};

type EmployeeType = PersonType & {
  employeeId: string;
  department: string;
};

// Mixing interface & type
interface Animal {
  name: string;
}
type Pet = Animal & {
  owner: string;
};
\`\`\`

---

## Index Signatures
Untuk object dengan dynamic keys.
\`\`\`typescript
// String index
interface Dictionary {
  [key: string]: string;
}

const colors: Dictionary = {
  red: "#ff0000",
  green: "#00ff00",
  blue: "#0000ff"
};

// Number index
interface NumberArray {
  [index: number]: string;
}

const arr: NumberArray = ["a", "b", "c"];

// Mixed dengan fixed keys
interface Config {
  name: string;
  version: string;
  [key: string]: string | number | boolean;
}

// Template literal index (TS 4.4+)
interface EventHandlers {
  [key: \`on\${string}\`]: (event: Event) => void;
}
const handlers: EventHandlers = {
  onClick: (e) => {},
  onHover: (e) => {}
};
\`\`\`

---

## Utility Types
TypeScript menyediakan utility types built-in.
\`\`\`typescript
interface User {
  id: number;
  name: string;
  email: string;
  password: string;
}

// Partial - semua jadi optional
type PartialUser = Partial<User>;
// { id?: number; name?: string; ... }

// Required - semua jadi required
type RequiredUser = Required<PartialUser>;

// Readonly - semua jadi readonly
type ReadonlyUser = Readonly<User>;

// Pick - ambil beberapa property
type UserBasic = Pick<User, "id" | "name">;
// { id: number; name: string; }

// Omit - hilangkan beberapa property
type UserPublic = Omit<User, "password">;
// { id: number; name: string; email: string; }

// Record - object dengan key type tertentu
type UserRoles = Record<string, "admin" | "user" | "guest">;
const roles: UserRoles = {
  andi: "admin",
  budi: "user"
};

// ReturnType & Parameters
type AddFn = (a: number, b: number) => number;
type AddReturn = ReturnType<AddFn>;      // number
type AddParams = Parameters<AddFn>;      // [number, number]
\`\`\`

---

## Mapped Types
Transformasi types secara programmatic.
\`\`\`typescript
// Custom mapped type
type Nullable<T> = {
  [K in keyof T]: T[K] | null;
};

interface User {
  name: string;
  age: number;
}

type NullableUser = Nullable<User>;
// { name: string | null; age: number | null; }

// Dengan modifiers
type Mutable<T> = {
  -readonly [K in keyof T]: T[K];  // remove readonly
};

type Optional<T> = {
  [K in keyof T]+?: T[K];  // add optional
};

// Key remapping (TS 4.1+)
type Getters<T> = {
  [K in keyof T as \`get\${Capitalize<string & K>}\`]: () => T[K];
};

type UserGetters = Getters<User>;
// { getName: () => string; getAge: () => number; }
\`\`\`

---

## 🎯 Outcome Modul
- Mendeklarasikan object types dengan annotations
- Memilih kapan pakai interface vs type alias
- Extending interfaces dan type intersection
- Menggunakan index signatures untuk dynamic keys
- Memanfaatkan utility types (Partial, Pick, Omit, dll)
- Membuat custom mapped types
`,
    level: 'intermediate',
    order: 4,
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: 'ts-05',
    user_type: 'student',
    language: 'typescript',
    title: 'Advanced Types: Union, Narrowing & Type Guards',
    description: 'Union/intersection types, discriminated unions, type guards, assertion functions, branded types.',
    content: `# Advanced Types

## Union Types
\`\`\`typescript
// Basic union
type StringOrNumber = string | number;
let value: StringOrNumber = "hello";
value = 42;  // OK

// Union dengan literal
type Status = "loading" | "success" | "error";
type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

// Nullable type
type MaybeString = string | null | undefined;

// Function dengan union parameter
function formatId(id: string | number): string {
  if (typeof id === "string") {
    return id.toUpperCase();
  }
  return id.toString().padStart(5, "0");
}
\`\`\`

---

## Type Narrowing
TypeScript mempersempit tipe berdasarkan kondisi.
\`\`\`typescript
function process(value: string | number | null) {
  // typeof guard
  if (typeof value === "string") {
    console.log(value.toUpperCase()); // value: string
  } else if (typeof value === "number") {
    console.log(value.toFixed(2));    // value: number
  } else {
    console.log("null value");         // value: null
  }
}

// Truthiness narrowing
function printLength(str: string | null) {
  if (str) {
    console.log(str.length); // str: string
  }
}

// Equality narrowing
function compare(a: string | number, b: string | boolean) {
  if (a === b) {
    // a dan b: string (satu-satunya overlap)
    console.log(a.toUpperCase());
  }
}

// in operator narrowing
type Fish = { swim: () => void };
type Bird = { fly: () => void };

function move(animal: Fish | Bird) {
  if ("swim" in animal) {
    animal.swim(); // animal: Fish
  } else {
    animal.fly();  // animal: Bird
  }
}

// instanceof narrowing
function logDate(value: Date | string) {
  if (value instanceof Date) {
    console.log(value.toISOString()); // value: Date
  } else {
    console.log(value);               // value: string
  }
}
\`\`\`

---

## Discriminated Unions
Pattern powerful untuk type-safe state handling.
\`\`\`typescript
// Discriminant: properti literal yang berbeda
interface LoadingState {
  status: "loading";
}

interface SuccessState {
  status: "success";
  data: string[];
}

interface ErrorState {
  status: "error";
  error: string;
}

type RequestState = LoadingState | SuccessState | ErrorState;

function handleState(state: RequestState) {
  switch (state.status) {
    case "loading":
      console.log("Loading...");
      break;
    case "success":
      console.log("Data:", state.data); // TS tahu ada data
      break;
    case "error":
      console.log("Error:", state.error); // TS tahu ada error
      break;
  }
}

// Praktis: Redux-style actions
type Action =
  | { type: "ADD_TODO"; payload: string }
  | { type: "TOGGLE_TODO"; payload: number }
  | { type: "DELETE_TODO"; payload: number };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "ADD_TODO":
      return { ...state, todos: [...state.todos, action.payload] };
    case "TOGGLE_TODO":
    case "DELETE_TODO":
      // action.payload: number di sini
      return state;
  }
}
\`\`\`

---

## Custom Type Guards
User-defined type predicates.
\`\`\`typescript
// Type predicate dengan 'is'
function isString(value: unknown): value is string {
  return typeof value === "string";
}

function process(value: unknown) {
  if (isString(value)) {
    console.log(value.toUpperCase()); // value: string
  }
}

// Type guard untuk interface
interface User {
  id: number;
  name: string;
  email: string;
}

interface Admin extends User {
  role: "admin";
  permissions: string[];
}

function isAdmin(user: User): user is Admin {
  return "role" in user && (user as Admin).role === "admin";
}

function greetUser(user: User | Admin) {
  if (isAdmin(user)) {
    console.log(\`Admin: \${user.name}, Permissions: \${user.permissions}\`);
  } else {
    console.log(\`User: \${user.name}\`);
  }
}

// Array filter dengan type guard
const values: (string | number)[] = [1, "two", 3, "four"];
const strings = values.filter((v): v is string => typeof v === "string");
// strings: string[]
\`\`\`

---

## Assertion Functions
\`\`\`typescript
// Assert function (throws jika false)
function assertIsNumber(value: unknown): asserts value is number {
  if (typeof value !== "number") {
    throw new Error("Not a number!");
  }
}

function double(value: unknown): number {
  assertIsNumber(value);
  return value * 2;  // value: number setelah assertion
}

// Assert non-null
function assertDefined<T>(value: T | null | undefined): asserts value is T {
  if (value === null || value === undefined) {
    throw new Error("Value is not defined");
  }
}

function process(name: string | null) {
  assertDefined(name);
  console.log(name.toUpperCase()); // name: string
}
\`\`\`

---

## Branded Types (Nominal Typing)
TypeScript struktural, tapi bisa "brand" untuk uniqueness.
\`\`\`typescript
// Brand type
type Brand<T, B> = T & { __brand: B };

type UserId = Brand<number, "UserId">;
type OrderId = Brand<number, "OrderId">;

function getUser(id: UserId): User { /* ... */ }
function getOrder(id: OrderId): Order { /* ... */ }

// Constructor functions
function createUserId(id: number): UserId {
  return id as UserId;
}

function createOrderId(id: number): OrderId {
  return id as OrderId;
}

const userId = createUserId(1);
const orderId = createOrderId(1);

getUser(userId);   // ✅ OK
// getUser(orderId); // ❌ Error: type mismatch
// getUser(1);       // ❌ Error: number bukan UserId

// Praktis: validated strings
type Email = Brand<string, "Email">;
type URL = Brand<string, "URL">;

function validateEmail(email: string): Email | null {
  const emailRegex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
  return emailRegex.test(email) ? (email as Email) : null;
}
\`\`\`

---

## Type Assertions
\`\`\`typescript
// as syntax (recommended)
const canvas = document.getElementById("canvas") as HTMLCanvasElement;

// Angle bracket syntax (tidak untuk JSX)
const input = <HTMLInputElement>document.getElementById("input");

// Non-null assertion (!)
function process(element: HTMLElement | null) {
  const width = element!.clientWidth; // yakin tidak null
}

// Const assertion
const config = {
  endpoint: "/api",
  timeout: 3000
} as const;
// Tipe: { readonly endpoint: "/api"; readonly timeout: 3000; }

// Double assertion (hindari kecuali memang perlu)
const value = "hello" as unknown as number; // force cast
\`\`\`

---

## 🎯 Outcome Modul
- Menguasai union types dan narrowing patterns
- Mengimplementasi discriminated unions untuk state management
- Membuat custom type guards dengan 'is' predicate
- Menggunakan assertion functions untuk runtime checks
- Memahami branded types untuk nominal typing
- Type assertions yang aman dan tepat
`,
    level: 'intermediate',
    order: 5,
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: 'ts-06',
    user_type: 'student',
    language: 'typescript',
    title: 'Generics Advanced & Conditional Types',
    description: 'Generic constraints, default types, conditional types, infer, template literals.',
    content: `# Generics Advanced

## Generic Constraints
\`\`\`typescript
// extends constraint
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

const user = { name: "Andi", age: 25 };
getProperty(user, "name");  // string
getProperty(user, "age");   // number
// getProperty(user, "foo"); // ❌ Error

// Multiple constraints dengan intersection
interface HasId { id: number; }
interface HasName { name: string; }

function processEntity<T extends HasId & HasName>(entity: T): string {
  return \`\${entity.id}: \${entity.name}\`;
}

// Constructor constraint
interface Constructor<T> {
  new (...args: any[]): T;
}

function createInstance<T>(Ctor: Constructor<T>): T {
  return new Ctor();
}
\`\`\`

---

## Generic Classes & Interfaces
\`\`\`typescript
// Generic class
class Container<T> {
  private items: T[] = [];

  add(item: T): void {
    this.items.push(item);
  }

  get(index: number): T | undefined {
    return this.items[index];
  }

  getAll(): T[] {
    return [...this.items];
  }
}

const stringContainer = new Container<string>();
stringContainer.add("hello");

// Generic interface
interface Repository<T, ID = number> {
  findById(id: ID): Promise<T | null>;
  findAll(): Promise<T[]>;
  save(entity: T): Promise<T>;
  delete(id: ID): Promise<boolean>;
}

class UserRepository implements Repository<User> {
  async findById(id: number): Promise<User | null> { /* ... */ }
  async findAll(): Promise<User[]> { /* ... */ }
  async save(user: User): Promise<User> { /* ... */ }
  async delete(id: number): Promise<boolean> { /* ... */ }
}
\`\`\`

---

## Conditional Types
Tipe yang bergantung pada kondisi.
\`\`\`typescript
// Basic conditional
type IsString<T> = T extends string ? true : false;

type A = IsString<string>;  // true
type B = IsString<number>;  // false

// Extract type
type ExtractArrayType<T> = T extends (infer U)[] ? U : never;

type NumArray = ExtractArrayType<number[]>;    // number
type StrArray = ExtractArrayType<string[]>;    // string
type NotArray = ExtractArrayType<string>;      // never

// Promise unwrap
type Awaited<T> = T extends Promise<infer U> ? Awaited<U> : T;

type Result = Awaited<Promise<Promise<string>>>; // string

// Function return type extraction
type GetReturnType<T> = T extends (...args: any[]) => infer R ? R : never;

type Fn = (x: number) => string;
type FnReturn = GetReturnType<Fn>; // string
\`\`\`

---

## Distributive Conditional Types
\`\`\`typescript
// Union distributes over conditional
type ToArray<T> = T extends any ? T[] : never;

type StrOrNumArray = ToArray<string | number>;
// = ToArray<string> | ToArray<number>
// = string[] | number[]

// Non-distributive (dengan tuple)
type ToArrayNonDist<T> = [T] extends [any] ? T[] : never;

type StrOrNumArrayND = ToArrayNonDist<string | number>;
// = (string | number)[]

// Exclude & Extract
type MyExclude<T, U> = T extends U ? never : T;
type MyExtract<T, U> = T extends U ? T : never;

type T1 = MyExclude<"a" | "b" | "c", "a">;      // "b" | "c"
type T2 = MyExtract<"a" | "b" | "c", "a" | "f">; // "a"
\`\`\`

---

## Infer Keyword
\`\`\`typescript
// Infer parameter types
type FirstParam<T> = T extends (first: infer F, ...rest: any[]) => any
  ? F
  : never;

type FP = FirstParam<(a: string, b: number) => void>; // string

// Infer dalam object
type PropType<T, K extends keyof T> = T extends { [P in K]: infer V }
  ? V
  : never;

interface User {
  name: string;
  age: number;
}

type NameType = PropType<User, "name">; // string

// Infer recursive
type Flatten<T> = T extends Array<infer U> ? Flatten<U> : T;

type Nested = number[][][];
type Flat = Flatten<Nested>; // number
\`\`\`

---

## Template Literal Types
\`\`\`typescript
// Basic template literal
type Greeting = \`Hello, \${string}!\`;
const g: Greeting = "Hello, World!"; // OK

// Union expansion
type Color = "red" | "green" | "blue";
type Size = "small" | "medium" | "large";

type ColorSize = \`\${Color}-\${Size}\`;
// "red-small" | "red-medium" | "red-large" | "green-small" | ...

// Event handlers
type EventName = "click" | "focus" | "blur";
type HandlerName = \`on\${Capitalize<EventName>}\`;
// "onClick" | "onFocus" | "onBlur"

// CSS units
type CSSValue = \`\${number}px\` | \`\${number}em\` | \`\${number}%\`;
const width: CSSValue = "100px"; // OK

// Intrinsic string manipulation
type Upper = Uppercase<"hello">;      // "HELLO"
type Lower = Lowercase<"HELLO">;      // "hello"
type Cap = Capitalize<"hello">;       // "Hello"
type Uncap = Uncapitalize<"Hello">;   // "hello"

// Practical: getter/setter types
type Getters<T> = {
  [K in keyof T as \`get\${Capitalize<string & K>}\`]: () => T[K];
};

type Setters<T> = {
  [K in keyof T as \`set\${Capitalize<string & K>}\`]: (value: T[K]) => void;
};

interface Person {
  name: string;
  age: number;
}

type PersonGetters = Getters<Person>;
// { getName: () => string; getAge: () => number; }
\`\`\`

---

## Variadic Tuple Types
\`\`\`typescript
// Rest in tuple
type Concat<T extends unknown[], U extends unknown[]> = [...T, ...U];

type Result = Concat<[1, 2], [3, 4]>; // [1, 2, 3, 4]

// First & Rest
type First<T extends unknown[]> = T extends [infer F, ...unknown[]] ? F : never;
type Rest<T extends unknown[]> = T extends [unknown, ...infer R] ? R : never;

type F = First<[1, 2, 3]>; // 1
type R = Rest<[1, 2, 3]>;  // [2, 3]

// Length
type Length<T extends unknown[]> = T["length"];

type Len = Length<[1, 2, 3]>; // 3

// Practical: typed curry
type Curry<F> = F extends (...args: infer A) => infer R
  ? A extends [infer First, ...infer Rest]
    ? (arg: First) => Curry<(...args: Rest) => R>
    : R
  : never;
\`\`\`

---

## 🎯 Outcome Modul
- Menguasai generic constraints advanced
- Membuat conditional types dengan infer
- Memahami distributive conditional types
- Menggunakan template literal types
- Memanipulasi tuple types dengan variadic patterns
- Membangun utility types custom yang kompleks
`,
    level: 'advanced',
    order: 6,
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: 'ts-07',
    user_type: 'student',
    language: 'typescript',
    title: 'OOP & Classes di TypeScript',
    description: 'Classes, access modifiers, abstract classes, interfaces implementation, decorators.',
    content: `# OOP & Classes

## Class Basics
\`\`\`typescript
class User {
  // Properties dengan tipe
  id: number;
  name: string;
  email: string;
  private password: string;
  readonly createdAt: Date;

  // Constructor
  constructor(id: number, name: string, email: string, password: string) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
    this.createdAt = new Date();
  }

  // Methods
  getInfo(): string {
    return \`\${this.name} (\${this.email})\`;
  }

  // Private method
  private hashPassword(pw: string): string {
    return \`hashed_\${pw}\`;
  }
}

const user = new User(1, "Andi", "andi@email.com", "secret");
console.log(user.getInfo());
\`\`\`

---

## Parameter Properties (Shorthand)
\`\`\`typescript
class Product {
  constructor(
    public id: number,
    public name: string,
    public price: number,
    private stock: number = 0,
    readonly sku: string
  ) {}

  // Properties otomatis dari constructor params
}

const product = new Product(1, "Laptop", 15000000, 10, "LAP-001");
console.log(product.name); // "Laptop"
\`\`\`

---

## Access Modifiers
\`\`\`typescript
class BankAccount {
  public accountNumber: string;      // accessible anywhere
  protected balance: number;          // accessible in class & subclass
  private pin: string;                // only in this class
  readonly #secret: string;           // ES private field (truly private)

  constructor(accountNumber: string, initialBalance: number, pin: string) {
    this.accountNumber = accountNumber;
    this.balance = initialBalance;
    this.pin = pin;
    this.#secret = "internal";
  }

  public deposit(amount: number): void {
    this.balance += amount;
  }

  protected validatePin(pin: string): boolean {
    return this.pin === pin;
  }
}

class SavingsAccount extends BankAccount {
  private interestRate: number = 0.05;

  addInterest(): void {
    // Bisa akses protected
    this.balance += this.balance * this.interestRate;
  }

  withdraw(amount: number, pin: string): boolean {
    if (this.validatePin(pin) && this.balance >= amount) {
      this.balance -= amount;
      return true;
    }
    return false;
  }
}
\`\`\`

---

## Getters & Setters
\`\`\`typescript
class Temperature {
  private _celsius: number = 0;

  get celsius(): number {
    return this._celsius;
  }

  set celsius(value: number) {
    if (value < -273.15) {
      throw new Error("Below absolute zero!");
    }
    this._celsius = value;
  }

  get fahrenheit(): number {
    return (this._celsius * 9/5) + 32;
  }

  set fahrenheit(value: number) {
    this._celsius = (value - 32) * 5/9;
  }
}

const temp = new Temperature();
temp.celsius = 25;
console.log(temp.fahrenheit); // 77
temp.fahrenheit = 100;
console.log(temp.celsius);    // 37.78
\`\`\`

---

## Static Members
\`\`\`typescript
class MathUtils {
  static PI: number = 3.14159;
  static E: number = 2.71828;

  static add(a: number, b: number): number {
    return a + b;
  }

  static multiply(a: number, b: number): number {
    return a * b;
  }

  // Static block (TS 4.4+)
  static {
    console.log("MathUtils initialized");
  }
}

console.log(MathUtils.PI);         // 3.14159
console.log(MathUtils.add(2, 3));  // 5

// Singleton pattern
class Database {
  private static instance: Database;

  private constructor() {}

  static getInstance(): Database {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }
}
\`\`\`

---

## Abstract Classes
\`\`\`typescript
abstract class Shape {
  abstract readonly name: string;

  constructor(public color: string) {}

  // Abstract method - harus diimplement
  abstract getArea(): number;
  abstract getPerimeter(): number;

  // Concrete method - bisa langsung dipakai
  describe(): string {
    return \`\${this.color} \${this.name} with area \${this.getArea()}\`;
  }
}

class Circle extends Shape {
  readonly name = "Circle";

  constructor(color: string, public radius: number) {
    super(color);
  }

  getArea(): number {
    return Math.PI * this.radius ** 2;
  }

  getPerimeter(): number {
    return 2 * Math.PI * this.radius;
  }
}

class Rectangle extends Shape {
  readonly name = "Rectangle";

  constructor(
    color: string,
    public width: number,
    public height: number
  ) {
    super(color);
  }

  getArea(): number {
    return this.width * this.height;
  }

  getPerimeter(): number {
    return 2 * (this.width + this.height);
  }
}
\`\`\`

---

## Implementing Interfaces
\`\`\`typescript
interface Printable {
  print(): void;
}

interface Saveable {
  save(): Promise<void>;
  load(): Promise<void>;
}

// Implement multiple interfaces
class Document implements Printable, Saveable {
  constructor(public title: string, public content: string) {}

  print(): void {
    console.log(\`Printing: \${this.title}\`);
  }

  async save(): Promise<void> {
    // save logic
  }

  async load(): Promise<void> {
    // load logic
  }
}

// Class sebagai interface
class Point {
  x: number = 0;
  y: number = 0;
}

class Point3D implements Point {
  x: number = 0;
  y: number = 0;
  z: number = 0;
}
\`\`\`

---

## Decorators (TS 5.0+)
\`\`\`typescript
// Enable: "experimentalDecorators": true di tsconfig

// Class decorator
function Sealed(constructor: Function) {
  Object.seal(constructor);
  Object.seal(constructor.prototype);
}

@Sealed
class Greeter {
  greeting: string;
  constructor(message: string) {
    this.greeting = message;
  }
}

// Method decorator
function Log(target: any, key: string, descriptor: PropertyDescriptor) {
  const original = descriptor.value;
  descriptor.value = function(...args: any[]) {
    console.log(\`Calling \${key} with\`, args);
    const result = original.apply(this, args);
    console.log(\`Result:\`, result);
    return result;
  };
}

class Calculator {
  @Log
  add(a: number, b: number): number {
    return a + b;
  }
}

// Property decorator
function MinLength(length: number) {
  return function(target: any, propertyKey: string) {
    let value: string;

    Object.defineProperty(target, propertyKey, {
      get: () => value,
      set: (newValue: string) => {
        if (newValue.length < length) {
          throw new Error(\`\${propertyKey} must be at least \${length} chars\`);
        }
        value = newValue;
      }
    });
  };
}

class User {
  @MinLength(3)
  username: string = "";
}
\`\`\`

---

## 🎯 Outcome Modul
- Menguasai class syntax TypeScript lengkap
- Memahami access modifiers dan encapsulation
- Menggunakan abstract classes untuk base types
- Implementing interfaces dengan benar
- Membuat dan menggunakan decorators
- Design patterns dengan classes (Singleton, Factory, dll)
`,
    level: 'intermediate',
    order: 7,
    created_at:
      '2025-01-01T00:00:00Z'
  },
  {
    id: 'ts-08',
    user_type: 'student',
    language: 'typescript',
    title: 'Project Setup, Testing, Best Practices & Sertifikasi',
    description: 'tsconfig advanced, monorepo, testing dengan Vitest, ESLint, CI/CD, rubrik sertifikasi.',
    content: `# Project Setup & Best Practices

## tsconfig.json Advanced
\`\`\`json
{
  "compilerOptions": {
    // Target & Module
    "target": "ES2022",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "lib": ["ES2022", "DOM", "DOM.Iterable"],
    
    // Strict Mode (WAJIB)
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "noUncheckedIndexedAccess": true,
    
    // Module Interop
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "forceConsistentCasingInFileNames": true,
    
    // Output
    "outDir": "./dist",
    "rootDir": "./src",
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true,
    
    // Path Aliases
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"],
      "@components/*": ["src/components/*"],
      "@utils/*": ["src/utils/*"]
    },
    
    // Advanced
    "skipLibCheck": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "verbatimModuleSyntax": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist", "**/*.test.ts"]
}
\`\`\`

---

## Struktur Project Modern
\`\`\`
my-ts-project/
├── src/
│   ├── index.ts
│   ├── types/
│   │   ├── index.ts
│   │   └── api.types.ts
│   ├── utils/
│   │   ├── index.ts
│   │   └── helpers.ts
│   ├── services/
│   │   └── user.service.ts
│   └── components/
│       └── Button.tsx
├── tests/
│   ├── setup.ts
│   └── user.service.test.ts
├── tsconfig.json
├── package.json
├── vitest.config.ts
└── eslint.config.js
\`\`\`

---

## ESLint + TypeScript
\`\`\`javascript
// eslint.config.js (Flat Config - ESLint 9+)
import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.strictTypeChecked,
  ...tseslint.configs.stylisticTypeChecked,
  {
    languageOptions: {
      parserOptions: {
        project: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/explicit-function-return-type': 'warn',
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/prefer-nullish-coalescing': 'error',
      '@typescript-eslint/prefer-optional-chain': 'error',
    },
  }
);
\`\`\`

---

## Testing dengan Vitest
\`\`\`typescript
// vitest.config.ts
import { defineConfig } from 'vitest/config';
import path from 'path';

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html', 'lcov'],
      exclude: ['node_modules', 'dist', '**/*.d.ts'],
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
\`\`\`

\`\`\`typescript
// tests/user.service.test.ts
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { UserService } from '@/services/user.service';

describe('UserService', () => {
  let service: UserService;

  beforeEach(() => {
    service = new UserService();
  });

  it('should create user with valid data', async () => {
    const user = await service.create({
      name: 'Andi',
      email: 'andi@email.com',
    });

    expect(user).toBeDefined();
    expect(user.id).toBeTypeOf('number');
    expect(user.name).toBe('Andi');
  });

  it('should throw error for invalid email', async () => {
    await expect(
      service.create({ name: 'Test', email: 'invalid' })
    ).rejects.toThrow('Invalid email');
  });

  // Mock external dependencies
  it('should call API with correct params', async () => {
    const mockFetch = vi.fn().mockResolvedValue({ ok: true });
    vi.stubGlobal('fetch', mockFetch);

    await service.sync();

    expect(mockFetch).toHaveBeenCalledWith(
      expect.stringContaining('/api/users'),
      expect.any(Object)
    );

    vi.unstubAllGlobals();
  });
});
\`\`\`

---

## Type-Safe API Layer
\`\`\`typescript
// types/api.types.ts
export interface ApiResponse<T> {
  data: T;
  meta: {
    total: number;
    page: number;
    limit: number;
  };
}

export interface ApiError {
  code: string;
  message: string;
  details?: Record<string, string[]>;
}

// services/api.service.ts
type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

interface RequestConfig<T = unknown> {
  method: HttpMethod;
  body?: T;
  headers?: Record<string, string>;
}

async function apiRequest<TResponse, TBody = unknown>(
  endpoint: string,
  config: RequestConfig<TBody>
): Promise<TResponse> {
  const response = await fetch(\`\${BASE_URL}\${endpoint}\`, {
    method: config.method,
    headers: {
      'Content-Type': 'application/json',
      ...config.headers,
    },
    body: config.body ? JSON.stringify(config.body) : undefined,
  });

  if (!response.ok) {
    const error: ApiError = await response.json();
    throw new Error(error.message);
  }

  return response.json() as Promise<TResponse>;
}

// Type-safe API calls
export const api = {
  users: {
    getAll: () => 
      apiRequest<ApiResponse<User[]>>('/users', { method: 'GET' }),
    getById: (id: number) => 
      apiRequest<User>(\`/users/\${id}\`, { method: 'GET' }),
    create: (data: CreateUserDto) => 
      apiRequest<User, CreateUserDto>('/users', { method: 'POST', body: data }),
  },
};
\`\`\`

---

## CI/CD Pipeline
\`\`\`yaml
# .github/workflows/ci.yml
name: CI

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  build-and-test:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Type Check
        run: npx tsc --noEmit

      - name: Lint
        run: npm run lint

      - name: Test with Coverage
        run: npm run test -- --coverage

      - name: Build
        run: npm run build

      - name: Upload Coverage
        uses: codecov/codecov-action@v3
        with:
          files: ./coverage/lcov.info
\`\`\`

---

## Best Practices Checklist

### Type Safety
- ✅ Enable \`strict: true\` di tsconfig
- ✅ Hindari \`any\`, gunakan \`unknown\` + narrowing
- ✅ Prefer \`interface\` untuk public API, \`type\` untuk unions/complex
- ✅ Gunakan \`const assertions\` untuk literal objects
- ✅ Leverage discriminated unions untuk state

### Code Quality
- ✅ ESLint dengan @typescript-eslint
- ✅ Prettier untuk formatting
- ✅ Husky + lint-staged untuk pre-commit
- ✅ Consistent naming: PascalCase (types), camelCase (vars/functions)

### Testing
- ✅ Unit test dengan Vitest/Jest
- ✅ Coverage target ≥ 80%
- ✅ Type-check tests juga
- ✅ Mock external dependencies

### Documentation
- ✅ JSDoc untuk public APIs
- ✅ README dengan setup instructions
- ✅ Type exports untuk library consumers

---

## Final Project (Wajib)

Bangun **REST API atau Full-Stack App** dengan requirements:

1. **Tech Stack:**
   - Backend: Express/Fastify dengan TypeScript
   - Atau Full-Stack: Next.js dengan TypeScript
   - Database: PostgreSQL/MySQL dengan Prisma/Drizzle

2. **Features:**
   - CRUD operations dengan proper typing
   - Authentication (JWT/Session)
   - Input validation (Zod)
   - Error handling dengan custom types

3. **Quality:**
   - Strict TypeScript config
   - ESLint + Prettier
   - Unit tests ≥ 80% coverage
   - Type-safe API layer

---

## Rubrik Sertifikasi TypeScript

| Aspek | Bobot | Kriteria Lulus |
|:--|:--:|:--|
| Type Safety | 35% | Strict mode, no any, proper generics |
| Code Architecture | 25% | Modular, SOLID, proper interfaces |
| Testing | 20% | Coverage ≥ 80%, type-safe tests |
| Tooling & CI | 10% | ESLint pass, CI pipeline works |
| Documentation | 10% | Types documented, README complete |

---

## 🎯 Outcome Modul
- Setup project TypeScript production-ready
- Konfigurasi ESLint + Prettier untuk TypeScript
- Testing dengan Vitest dan coverage
- CI/CD pipeline untuk TypeScript projects
- Best practices yang dipakai di industri
- Siap assessment dan sertifikasi
`,
    level: 'advanced',
    order: 8,
    created_at: '2025-01-01T00:00:00Z'
  },

  // ==================== RUBY MATERIALS (NEW - FULL 8 MODULES) ====================
  {
    id: 'rb-01',
    user_type: 'student',
    language: 'ruby',
    title: 'Pengenalan Ruby & Filosofi',
    description: 'Apa itu Ruby, sejarah, filosofi "Programmer Happiness", ekosistem & use cases.',
    content: `# 💎 Pengenalan Ruby

## Apa itu Ruby?
Ruby adalah bahasa pemrograman **dynamic**, **object-oriented**, dan **interpreted** yang dirancang untuk **produktivitas** dan **kesenangan programmer**.

Diciptakan oleh **Yukihiro "Matz" Matsumoto** dari Jepang dan dirilis tahun **1995**.

> "Ruby is designed to make programmers happy." — Matz

---

## 🕰️ Sejarah Ruby
| Tahun | Versi | Milestone |
|:---:|:---:|:---|
| 1995 | 0.95 | Rilis publik pertama di Jepang |
| 2000 | 1.6 | Dokumentasi bahasa Inggris |
| 2004 | 1.8 | Ruby on Rails lahir, popularitas meledak |
| 2007 | 1.9 | Performance improvements, new VM (YARV) |
| 2013 | 2.0 | Keyword arguments, lazy enumerators |
| 2020 | 3.0 | Ractor (concurrency), RBS (type signatures) |
| 2023 | 3.2+ | YJIT (faster JIT), pattern matching mature |

---

## 💡 Filosofi Ruby

### Prinsip Utama
1. **Programmer Happiness** — Kode harus menyenangkan ditulis
2. **Principle of Least Surprise** — Perilaku sesuai ekspektasi
3. **Everything is an Object** — Bahkan angka dan nil
4. **Duck Typing** — "If it walks like a duck..."
5. **Convention over Configuration** — Ikuti konvensi, kurangi konfigurasi

### Matz's Design Goals
- Lebih powerful dari Perl
- Lebih OOP dari Python
- Sintaks natural seperti bahasa manusia

---

## ⚙️ Ekosistem Ruby

### Web Development
- **Ruby on Rails** — Full-stack framework paling populer
- **Sinatra** — Micro-framework minimalis
- **Hanami** — Modern, clean architecture
- **Roda** — Fast routing tree web toolkit

### Background Jobs
- **Sidekiq** — Redis-backed job processing
- **Resque** — Background jobs dengan Redis
- **GoodJob** — PostgreSQL-based jobs

### Testing
- **RSpec** — BDD testing framework
- **Minitest** — Built-in, minimal testing
- **Capybara** — Integration/E2E testing

### Tools & Utilities
- **Bundler** — Dependency management
- **RubyGems** — Package manager
- **RuboCop** — Linter & formatter
- **Pry** — Powerful REPL debugger

---

## 💻 Hello Ruby

### File pertama: \`hello.rb\`
\`\`\`ruby
# Variabel dan output
nama = "Miku"
umur = 21

puts "Halo, #{nama}!"
puts "Umur: #{umur} tahun"

# Everything is an object
puts 42.class          # Integer
puts "hello".class     # String
puts nil.class         # NilClass
puts true.class        # TrueClass

# Method pada angka
puts 5.times { print "Ruby! " }
puts (-10).abs         # 10
puts 3.14.round        # 3
\`\`\`

### Menjalankan Ruby
\`\`\`bash
# Install Ruby (dengan rbenv)
rbenv install 3.2.2
rbenv global 3.2.2

# Jalankan file
ruby hello.rb

# Interactive Ruby (IRB)
irb
>> puts "Hello from IRB"
\`\`\`

---

## 🆚 Ruby vs Python vs JavaScript

| Aspek | Ruby | Python | JavaScript |
|:--|:--|:--|:--|
| Filosofi | Programmer happiness | Explicit is better | Flexibility |
| OOP Style | Pure OOP | Multi-paradigm | Prototype-based |
| Blocks | First-class | Limited (lambdas) | Callbacks/Promises |
| Web Framework | Rails (opinionated) | Django/Flask | Express/Next.js |
| Typing | Dynamic | Dynamic (+ hints) | Dynamic (+ TS) |
| Syntax | Natural, expressive | Clean, whitespace | C-style braces |

---

## 🔧 Setup Development Environment

### Dengan rbenv (Recommended)
\`\`\`bash
# Install rbenv
git clone https://github.com/rbenv/rbenv.git ~/.rbenv
echo 'export PATH="$HOME/.rbenv/bin:$PATH"' >> ~/.bashrc
echo 'eval "$(rbenv init -)"' >> ~/.bashrc

# Install ruby-build
git clone https://github.com/rbenv/ruby-build.git ~/.rbenv/plugins/ruby-build

# Install Ruby
rbenv install 3.2.2
rbenv global 3.2.2

# Verify
ruby -v
gem -v
\`\`\`

### Project Setup
\`\`\`bash
# Buat project
mkdir my_ruby_app && cd my_ruby_app

# Gemfile untuk dependencies
bundle init

# Install dependencies
bundle install
\`\`\`

---

## 🎯 Outcome Modul
- Memahami filosofi dan karakteristik Ruby
- Mengetahui sejarah dan evolusi Ruby
- Mengenal ekosistem dan use cases
- Setup environment Ruby dengan rbenv
- Menulis dan menjalankan script Ruby pertama
`,
    level: 'beginner',
    order: 1,
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: 'rb-02',
    user_type: 'student',
    language: 'ruby',
    title: 'Tipe Data, Variabel & Operator',
    description: 'Numbers, strings, symbols, arrays, hashes, ranges, nil, operators, type conversion.',
    content: `# Tipe Data & Variabel Ruby

## Tipe Data Dasar

### Numbers
\`\`\`ruby
# Integer
umur = 25
besar = 1_000_000  # underscore untuk readability
hex = 0xFF         # 255
binary = 0b1010    # 10
octal = 0o17       # 15

# Float
harga = 99.99
pi = 3.14159

# Rational & Complex (bawaan)
rasio = Rational(2, 3)  # 2/3
kompleks = Complex(1, 2) # 1+2i

# Operasi
puts 10 / 3      # 3 (integer division)
puts 10.0 / 3    # 3.333...
puts 10 % 3      # 1 (modulo)
puts 2 ** 10     # 1024 (power)
\`\`\`

### Strings
\`\`\`ruby
# Single vs Double quotes
single = 'Hello'         # Literal, tidak interpolasi
double = "Hello, #{nama}" # Interpolasi

# Multi-line
paragraf = <<~HEREDOC
  Ini adalah paragraf
  dengan multiple lines.
  Indentasi otomatis dihapus.
HEREDOC

# String methods
str = "  Hello Ruby  "
puts str.strip          # "Hello Ruby"
puts str.upcase         # "  HELLO RUBY  "
puts str.downcase       # "  hello ruby  "
puts str.length         # 14
puts str.include?("Ruby") # true
puts str.gsub("Ruby", "World") # "  Hello World  "
puts str.split(" ")     # ["Hello", "Ruby"]

# String manipulation
puts "Ruby" * 3         # "RubyRubyRuby"
puts "Hello" + " " + "World" # "Hello World"
puts "Hello" << " World" # "Hello World" (mutates)

# Character access
puts "Ruby"[0]          # "R"
puts "Ruby"[-1]         # "y"
puts "Ruby"[0..1]       # "Ru"
\`\`\`

### Symbols
Symbol adalah string immutable yang lebih efisien untuk identifier.
\`\`\`ruby
# Symbol vs String
status = :active        # Symbol
nama = "Andi"           # String

# Symbol selalu sama object_id
puts :hello.object_id == :hello.object_id  # true
puts "hello".object_id == "hello".object_id # false

# Use cases: hash keys, method names
user = {
  name: "Andi",        # Symbol key (shorthand)
  :age => 25,          # Symbol key (explicit)
  "city" => "Jakarta"  # String key
}

# Convert
puts "hello".to_sym    # :hello
puts :hello.to_s       # "hello"
\`\`\`

---

## Collections

### Arrays
\`\`\`ruby
# Membuat array
arr = [1, 2, 3, 4, 5]
mixed = [1, "two", :three, 4.0]
words = %w[apple banana cherry]  # ["apple", "banana", "cherry"]
symbols = %i[one two three]       # [:one, :two, :three]

# Access & Slicing
puts arr[0]         # 1
puts arr[-1]        # 5
puts arr[1..3]      # [2, 3, 4]
puts arr.first(2)   # [1, 2]
puts arr.last(2)    # [4, 5]

# Manipulasi
arr.push(6)         # [1,2,3,4,5,6]
arr << 7            # [1,2,3,4,5,6,7]
arr.pop             # 7, arr = [1,2,3,4,5,6]
arr.shift           # 1, arr = [2,3,4,5,6]
arr.unshift(0)      # [0,2,3,4,5,6]

# Methods penting
[3,1,2].sort        # [1,2,3]
[1,2,2,3].uniq      # [1,2,3]
[1,2,3].reverse     # [3,2,1]
[1,2,3].include?(2) # true
[1,2] + [3,4]       # [1,2,3,4]
[1,2,3] - [2]       # [1,3]
[1,2] & [2,3]       # [2] (intersection)
[1,2] | [2,3]       # [1,2,3] (union)
\`\`\`

### Hashes
\`\`\`ruby
# Membuat hash
user = {
  name: "Andi",
  age: 25,
  email: "andi@email.com"
}

# Access
puts user[:name]      # "Andi"
puts user.fetch(:age) # 25
puts user.fetch(:foo, "default") # "default"

# Methods
puts user.keys        # [:name, :age, :email]
puts user.values      # ["Andi", 25, "andi@email.com"]
puts user.key?(:name) # true
puts user.value?("Andi") # true

# Manipulasi
user[:phone] = "08123456"   # tambah
user.delete(:email)          # hapus
user.merge({ city: "Jakarta" }) # gabung (new hash)
user.merge!({ city: "Jakarta" }) # gabung (mutate)

# Iterate
user.each do |key, value|
  puts "#{key}: #{value}"
end

# Transform
user.transform_keys(&:to_s)     # string keys
user.transform_values(&:to_s)   # string values
\`\`\`

### Ranges
\`\`\`ruby
# Inclusive vs Exclusive
inclusive = 1..5    # 1, 2, 3, 4, 5
exclusive = 1...5   # 1, 2, 3, 4

# Methods
puts (1..5).to_a          # [1, 2, 3, 4, 5]
puts (1..5).include?(3)   # true
puts (1..10).cover?(5)    # true
puts ('a'..'e').to_a      # ["a","b","c","d","e"]

# Use cases
case score
when 90..100 then "A"
when 80..89 then "B"
when 70..79 then "C"
else "D"
end

# Infinite range (Ruby 2.6+)
numbers = [1, 2, 3, 4, 5]
puts numbers[2..]   # [3, 4, 5]
puts numbers[..2]   # [1, 2, 3]
\`\`\`

---

## Variabel & Scope
\`\`\`ruby
# Local variable
nama = "Andi"

# Instance variable (dalam class)
@nama = "Andi"

# Class variable
@@counter = 0

# Global variable (hindari!)
$debug = true

# Constants
MAX_SIZE = 100
PI = 3.14159

# Parallel assignment
a, b, c = 1, 2, 3
x, y = y, x  # swap

# Splat
first, *rest = [1, 2, 3, 4]  # first=1, rest=[2,3,4]
*init, last = [1, 2, 3, 4]   # init=[1,2,3], last=4
\`\`\`

---

## Operators
\`\`\`ruby
# Comparison
puts 1 == 1       # true (value equality)
puts 1.eql?(1.0)  # false (type + value)
puts 1.equal?(1)  # true (object identity)
puts 1 <=> 2      # -1 (spaceship: -1, 0, 1)

# Logical
puts true && false   # false
puts true || false   # true
puts !true           # false

# Safe navigation (Ruby 2.3+)
user&.name           # nil if user is nil

# Or-equals (memoization)
@result ||= expensive_calculation

# Ternary
status = age >= 18 ? "adult" : "minor"

# Pattern matching operator (Ruby 3.0+)
case [1, 2, 3]
in [a, b, c]
  puts "a=#{a}, b=#{b}, c=#{c}"
end
\`\`\`

---

## 🎯 Outcome Modul
- Menguasai semua tipe data Ruby
- Manipulasi strings, arrays, dan hashes
- Memahami perbedaan symbol vs string
- Menggunakan ranges dengan benar
- Mengerti scope variabel
- Operator Ruby termasuk safe navigation
`,
    level: 'beginner',
    order: 2,
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: 'rb-03',
    user_type: 'student',
    language: 'ruby',
    title: 'Control Flow, Loops & Iterators',
    description: 'if/unless/case, while/until, for, each, map, select, iterators, blocks.',
    content: `# Control Flow & Iterators

## Conditionals

### if / elsif / else
\`\`\`ruby
score = 85

if score >= 90
  grade = "A"
elsif score >= 80
  grade = "B"
elsif score >= 70
  grade = "C"
else
  grade = "D"
end

# One-liner (modifier form)
puts "Lulus!" if score >= 70

# Inline assignment
grade = if score >= 90 then "A"
        elsif score >= 80 then "B"
        else "C"
        end

# Ternary
status = score >= 70 ? "Pass" : "Fail"
\`\`\`

### unless (kebalikan if)
\`\`\`ruby
logged_in = false

unless logged_in
  puts "Please login first"
end

# Modifier form
puts "Welcome!" unless logged_in

# Hindari unless dengan else (gunakan if)
# ❌ unless condition ... else ... end
# ✅ if condition ... else ... end
\`\`\`

### case / when
\`\`\`ruby
day = "Monday"

message = case day
          when "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"
            "Weekday"
          when "Saturday", "Sunday"
            "Weekend"
          else
            "Unknown"
          end

# Case dengan ranges
case score
when 90..100 then "A"
when 80...90 then "B"
when 70...80 then "C"
else "D"
end

# Case dengan class check
def describe(obj)
  case obj
  when String
    "It's a string: #{obj}"
  when Integer
    "It's an integer: #{obj}"
  when Array
    "It's an array with #{obj.length} items"
  else
    "Unknown type"
  end
end

# Case dengan regex
case email
when /\A[\w+\-.]+@[a-z\d\-]+\.[a-z]+\z/i
  "Valid email"
else
  "Invalid email"
end
\`\`\`

### Pattern Matching (Ruby 3.0+)
\`\`\`ruby
# Basic pattern matching
case [1, 2, 3]
in [a, b, c]
  puts "a=#{a}, b=#{b}, c=#{c}"
end

# Hash pattern
user = { name: "Andi", age: 25, role: "admin" }

case user
in { name:, role: "admin" }
  puts "Admin: #{name}"
in { name:, role: "user" }
  puts "User: #{name}"
end

# Guard conditions
case data
in { status: "success", data: Array => items } if items.any?
  puts "Got #{items.length} items"
in { status: "error", message: }
  puts "Error: #{message}"
end

# One-line pattern (Ruby 3.0+)
user => { name:, age: }
puts "#{name} is #{age} years old"
\`\`\`

---

## Loops

### while / until
\`\`\`ruby
# while
counter = 0
while counter < 5
  puts counter
  counter += 1
end

# until (kebalikan while)
counter = 0
until counter >= 5
  puts counter
  counter += 1
end

# Modifier form
counter = 0
puts counter += 1 while counter < 5

# begin...end (do-while style)
begin
  input = gets.chomp
end while input != "quit"
\`\`\`

### for (jarang dipakai)
\`\`\`ruby
# For dengan range
for i in 1..5
  puts i
end

# For dengan array
for item in ["a", "b", "c"]
  puts item
end

# Lebih Ruby-ish: gunakan each
(1..5).each { |i| puts i }
\`\`\`

### Loop Control
\`\`\`ruby
# break - keluar dari loop
10.times do |i|
  break if i == 5
  puts i
end

# next - skip ke iterasi berikutnya
10.times do |i|
  next if i.even?
  puts i  # hanya odd numbers
end

# redo - ulangi iterasi (tanpa increment)
count = 0
5.times do |i|
  count += 1
  redo if count < 3 && i == 0
  puts "i=#{i}, count=#{count}"
end

# retry - mulai loop dari awal (dalam begin/rescue)
\`\`\`

---

## Iterators & Blocks

### times, upto, downto
\`\`\`ruby
# times
5.times { |i| puts i }      # 0, 1, 2, 3, 4
5.times { puts "Hello" }     # 5x tanpa index

# upto / downto
1.upto(5) { |n| puts n }     # 1, 2, 3, 4, 5
5.downto(1) { |n| puts n }   # 5, 4, 3, 2, 1

# step
1.step(10, 2) { |n| puts n } # 1, 3, 5, 7, 9
\`\`\`

### each
\`\`\`ruby
# Array each
[1, 2, 3].each do |num|
  puts num * 2
end

# Hash each
{ a: 1, b: 2 }.each do |key, value|
  puts "#{key}: #{value}"
end

# each_with_index
%w[a b c].each_with_index do |item, index|
  puts "#{index}: #{item}"
end

# each_with_object
result = [1, 2, 3].each_with_object({}) do |num, hash|
  hash[num] = num * 2
end
# => {1=>2, 2=>4, 3=>6}
\`\`\`

### map / collect
\`\`\`ruby
# Transform elements
numbers = [1, 2, 3, 4, 5]

doubled = numbers.map { |n| n * 2 }
# => [2, 4, 6, 8, 10]

# Shorthand dengan Symbol#to_proc
words = ["hello", "world"]
upper = words.map(&:upcase)
# => ["HELLO", "WORLD"]

# map dengan index
result = numbers.map.with_index { |n, i| "#{i}: #{n}" }
\`\`\`

### select / reject / find
\`\`\`ruby
numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

# select - ambil yang match
evens = numbers.select { |n| n.even? }
# => [2, 4, 6, 8, 10]

# reject - buang yang match
odds = numbers.reject { |n| n.even? }
# => [1, 3, 5, 7, 9]

# find - ambil pertama yang match
first_even = numbers.find { |n| n.even? }
# => 2

# find_all (alias select)
# detect (alias find)

# partition - split jadi 2 array
evens, odds = numbers.partition(&:even?)
# evens = [2,4,6,8,10], odds = [1,3,5,7,9]
\`\`\`

### reduce / inject
\`\`\`ruby
# Sum
sum = [1, 2, 3, 4, 5].reduce(0) { |acc, n| acc + n }
# => 15

# Shorthand
sum = [1, 2, 3, 4, 5].reduce(:+)
# => 15

# Build hash
pairs = [[:a, 1], [:b, 2], [:c, 3]]
hash = pairs.reduce({}) do |acc, (key, value)|
  acc[key] = value
  acc
end
# => {:a=>1, :b=>2, :c=>3}

# Find max manually
max = [3, 1, 4, 1, 5].reduce do |best, n|
  n > best ? n : best
end
# => 5
\`\`\`

### Other Useful Iterators
\`\`\`ruby
numbers = [1, 2, 3, 4, 5]

# any? / all? / none?
numbers.any?(&:even?)   # true
numbers.all?(&:positive?) # true
numbers.none?(&:negative?) # true

# count
numbers.count           # 5
numbers.count(&:even?)  # 2

# sum / min / max
numbers.sum             # 15
numbers.min             # 1
numbers.max             # 5
numbers.minmax          # [1, 5]

# sort / sort_by
[3, 1, 4].sort          # [1, 3, 4]
[3, 1, 4].sort { |a, b| b <=> a } # [4, 3, 1]
users.sort_by { |u| u[:age] }

# group_by
[1, 2, 3, 4, 5, 6].group_by(&:even?)
# => {false=>[1,3,5], true=>[2,4,6]}

# take / drop
numbers.take(3)         # [1, 2, 3]
numbers.drop(3)         # [4, 5]

# first / last
numbers.first(2)        # [1, 2]
numbers.last(2)         # [4, 5]

# flatten / compact
[[1, 2], [3, 4]].flatten  # [1, 2, 3, 4]
[1, nil, 2, nil].compact  # [1, 2]

# zip
[1, 2, 3].zip(["a", "b", "c"])
# => [[1,"a"], [2,"b"], [3,"c"]]
\`\`\`

---

## 🎯 Outcome Modul
- Menguasai if/unless/case conditionals
- Pattern matching Ruby 3.0+
- Loops: while, until, for
- Iterator methods: each, map, select, reduce
- Method chaining dengan iterators
- Block syntax (do...end vs curly braces)
`,
    level: 'beginner',
    order: 3,
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: 'rb-04',
    user_type: 'student',
    language: 'ruby',
    title: 'Methods, Blocks, Procs & Lambdas',
    description: 'Defining methods, arguments, blocks, yield, Proc, Lambda, closures.',
    content: `# Methods & Blocks

## Defining Methods
\`\`\`ruby
# Basic method
def greet(name)
  "Hello, #{name}!"  # implicit return
end

puts greet("Andi")  # "Hello, Andi!"

# Explicit return
def divide(a, b)
  return nil if b.zero?
  a / b
end

# Multiple return values
def stats(numbers)
  [numbers.min, numbers.max, numbers.sum]
end

min, max, total = stats([1, 2, 3, 4, 5])

# Predicate methods (return boolean, end with ?)
def valid?(email)
  email.include?("@")
end

# Bang methods (mutate, end with !)
def upcase!(str)
  str.upcase!  # mutates original
end

# Setter methods (end with =)
def name=(value)
  @name = value.strip
end
\`\`\`

---

## Arguments

### Default Arguments
\`\`\`ruby
def greet(name, greeting = "Hello")
  "#{greeting}, #{name}!"
end

greet("Andi")           # "Hello, Andi!"
greet("Andi", "Halo")   # "Halo, Andi!"
\`\`\`

### Keyword Arguments
\`\`\`ruby
def create_user(name:, email:, role: "user", active: true)
  {
    name: name,
    email: email,
    role: role,
    active: active
  }
end

create_user(name: "Andi", email: "andi@mail.com")
create_user(name: "Admin", email: "admin@mail.com", role: "admin")

# Required keyword (tanpa default = required)
def connect(host:, port:)  # keduanya wajib
  "#{host}:#{port}"
end
\`\`\`

### Splat Arguments
\`\`\`ruby
# Single splat (*) - array of positional args
def sum(*numbers)
  numbers.reduce(0, :+)
end

sum(1, 2, 3, 4, 5)  # 15

# Double splat (**) - hash of keyword args
def configure(**options)
  options.each { |k, v| puts "#{k}: #{v}" }
end

configure(host: "localhost", port: 3000)

# Kombinasi
def complex(required, *args, key:, **options, &block)
  # required: positional wajib
  # args: array of extra positional
  # key: required keyword
  # options: hash of extra keywords
  # block: optional block
end
\`\`\`

### Argument Forwarding (Ruby 2.7+)
\`\`\`ruby
# Forward semua arguments
def wrapper(...)
  original_method(...)
end

# Forward anonymous block
def with_logging(&)
  puts "Starting..."
  result = perform(&)
  puts "Done!"
  result
end
\`\`\`

---

## Blocks

### Block Syntax
\`\`\`ruby
# Curly braces (single line)
[1, 2, 3].each { |n| puts n }

# do...end (multi-line)
[1, 2, 3].each do |n|
  result = n * 2
  puts result
end

# Block dengan multiple params
{ a: 1, b: 2 }.each do |key, value|
  puts "#{key} => #{value}"
end
\`\`\`

### yield
\`\`\`ruby
# Basic yield
def with_greeting
  puts "Before"
  yield  # execute block here
  puts "After"
end

with_greeting { puts "Hello!" }
# Before
# Hello!
# After

# yield dengan arguments
def transform(value)
  yield(value)
end

result = transform(5) { |n| n * 2 }  # 10

# Multiple yields
def twice
  yield
  yield
end

twice { puts "Ruby!" }  # "Ruby!" 2x

# Check if block given
def maybe_yield
  if block_given?
    yield
  else
    "No block"
  end
end
\`\`\`

### Explicit Block Parameter
\`\`\`ruby
# Capture block sebagai Proc
def with_block(&block)
  puts block.class  # Proc
  block.call        # execute
  yield             # juga bisa
end

with_block { puts "Hello" }

# Pass block ke method lain
def outer(&block)
  inner(&block)
end

def inner
  yield
end
\`\`\`

---

## Procs

### Creating Procs
\`\`\`ruby
# Proc.new
greeter = Proc.new { |name| "Hello, #{name}!" }
greeter.call("Andi")  # "Hello, Andi!"

# proc shorthand
doubler = proc { |n| n * 2 }
doubler.call(5)  # 10

# Multiple call syntaxes
doubler.call(5)   # 10
doubler.(5)       # 10
doubler[5]        # 10
doubler === 5     # 10
\`\`\`

### Proc Characteristics
\`\`\`ruby
# Procs tidak strict dengan arguments
my_proc = proc { |a, b| "a=#{a}, b=#{b}" }
my_proc.call(1)       # "a=1, b="  (b is nil)
my_proc.call(1, 2, 3) # "a=1, b=2" (3 ignored)

# return dalam Proc keluar dari enclosing method
def test_proc
  my_proc = proc { return "from proc" }
  my_proc.call
  "from method"  # tidak tercapai!
end

test_proc  # "from proc"
\`\`\`

---

## Lambdas

### Creating Lambdas
\`\`\`ruby
# lambda keyword
greeter = lambda { |name| "Hello, #{name}!" }

# -> (stabby lambda) - preferred
doubler = ->(n) { n * 2 }
doubler.call(5)  # 10

# Multi-line lambda
processor = ->(data) do
  result = data.map(&:upcase)
  result.join(", ")
end
\`\`\`

### Lambda vs Proc
\`\`\`ruby
# 1. Argument checking - Lambda STRICT
my_lambda = ->(a, b) { "#{a}, #{b}" }
my_lambda.call(1)      # ArgumentError!
my_lambda.call(1, 2, 3) # ArgumentError!

my_proc = proc { |a, b| "#{a}, #{b}" }
my_proc.call(1)        # OK, b=nil

# 2. return behavior - Lambda returns to lambda, Proc returns to enclosing
def test_lambda
  my_lambda = -> { return "from lambda" }
  my_lambda.call
  "from method"  # TERCAPAI
end

test_lambda  # "from method"

def test_proc
  my_proc = proc { return "from proc" }
  my_proc.call
  "from method"  # TIDAK tercapai
end

test_proc  # "from proc"
\`\`\`

| Aspect | Proc | Lambda |
|:--|:--|:--|
| Created by | Proc.new, proc {} | lambda {}, -> {} |
| Argument check | Lenient | Strict |
| return | Returns from enclosing method | Returns from lambda only |
| Check | proc.lambda? => false | lambda.lambda? => true |

---

## Closures
\`\`\`ruby
# Blocks, Procs, Lambdas adalah closures
def counter
  count = 0
  -> { count += 1 }  # captures count
end

c = counter
c.call  # 1
c.call  # 2
c.call  # 3

# Practical: configuration
def configure
  config = {}
  yield(config)
  config
end

result = configure do |c|
  c[:host] = "localhost"
  c[:port] = 3000
end
# => {:host=>"localhost", :port=>3000}
\`\`\`

---

## Symbol#to_proc
\`\`\`ruby
# Shorthand untuk simple blocks
[1, 2, 3].map(&:to_s)        # ["1", "2", "3"]
["hello", "world"].map(&:upcase) # ["HELLO", "WORLD"]
[1, 2, 3, 4].select(&:even?) # [2, 4]

# Equivalent to:
[1, 2, 3].map { |n| n.to_s }

# Custom method
class User
  def self.active?(user)
    user.active
  end
end

users.select(&User.method(:active?))
\`\`\`

---

## 🎯 Outcome Modul
- Mendefinisikan methods dengan berbagai argument types
- Memahami block, yield, dan block_given?
- Membedakan Proc vs Lambda
- Menggunakan closures untuk state management
- Symbol#to_proc shorthand
`,
    level: 'intermediate',
    order: 4,
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: 'rb-05',
    user_type: 'student',
    language: 'ruby',
    title: 'Object-Oriented Programming',
    description: 'Classes, inheritance, modules, mixins, access control, SOLID principles.',
    content: `# OOP di Ruby

## Classes & Objects

### Basic Class
\`\`\`ruby
class User
  # Class-level accessor generators
  attr_reader :id          # getter only
  attr_writer :status      # setter only
  attr_accessor :name, :email  # getter + setter

  # Class variable
  @@user_count = 0

  # Constant
  MAX_NAME_LENGTH = 100

  # Constructor
  def initialize(name, email)
    @id = generate_id
    @name = name
    @email = email
    @status = :active
    @@user_count += 1
  end

  # Instance method
  def info
    "#{@name} (#{@email})"
  end

  # Class method
  def self.count
    @@user_count
  end

  # Alternative class method syntax
  class << self
    def create(name, email)
      new(name, email)
    end
  end

  private

  def generate_id
    SecureRandom.uuid
  end
end

# Usage
user = User.new("Andi", "andi@mail.com")
puts user.name          # "Andi"
user.name = "Budi"      # setter
puts User.count         # 1
\`\`\`

---

## Access Control
\`\`\`ruby
class BankAccount
  def initialize(balance)
    @balance = balance
  end

  # Public (default)
  def deposit(amount)
    @balance += amount if valid_amount?(amount)
  end

  def withdraw(amount)
    @balance -= amount if valid_withdrawal?(amount)
  end

  def balance
    @balance
  end

  # Protected - accessible by same class or subclass instances
  protected

  def transfer_to(other_account, amount)
    if valid_withdrawal?(amount)
      @balance -= amount
      other_account.receive_transfer(amount)  # can call protected
    end
  end

  def receive_transfer(amount)
    @balance += amount
  end

  # Private - only within same instance
  private

  def valid_amount?(amount)
    amount.positive?
  end

  def valid_withdrawal?(amount)
    valid_amount?(amount) && amount <= @balance
  end
end

# Ruby 2.7+ private dengan def
class ModernClass
  private def secret_method
    "secret"
  end
end
\`\`\`

---

## Inheritance
\`\`\`ruby
class Animal
  attr_reader :name

  def initialize(name)
    @name = name
  end

  def speak
    raise NotImplementedError, "Subclass must implement"
  end

  def info
    "#{@name} is a #{self.class}"
  end
end

class Dog < Animal
  def speak
    "Woof!"
  end

  def fetch
    "#{@name} fetches the ball"
  end
end

class Cat < Animal
  def initialize(name, indoor: true)
    super(name)  # call parent constructor
    @indoor = indoor
  end

  def speak
    "Meow!"
  end
end

dog = Dog.new("Buddy")
puts dog.speak     # "Woof!"
puts dog.info      # "Buddy is a Dog"
puts dog.fetch     # "Buddy fetches the ball"

cat = Cat.new("Whiskers", indoor: false)
puts cat.speak     # "Meow!"

# Check inheritance
puts Dog < Animal          # true
puts dog.is_a?(Animal)     # true
puts dog.instance_of?(Dog) # true
puts dog.class.ancestors   # [Dog, Animal, Object, Kernel, BasicObject]
\`\`\`

---

## Modules & Mixins

### Module sebagai Namespace
\`\`\`ruby
module Payments
  class CreditCard
    def charge(amount)
      "Charging #{amount} to credit card"
    end
  end

  class BankTransfer
    def transfer(amount)
      "Transferring #{amount} via bank"
    end
  end

  # Module method
  def self.supported_methods
    [:credit_card, :bank_transfer]
  end
end

# Usage
cc = Payments::CreditCard.new
Payments.supported_methods
\`\`\`

### Module sebagai Mixin
\`\`\`ruby
module Loggable
  def log(message)
    puts "[#{self.class}] #{message}"
  end

  def debug(message)
    log("DEBUG: #{message}") if $DEBUG
  end
end

module Serializable
  def to_json
    require 'json'
    JSON.generate(to_h)
  end

  def to_h
    instance_variables.each_with_object({}) do |var, hash|
      hash[var.to_s.delete('@').to_sym] = instance_variable_get(var)
    end
  end
end

class User
  include Loggable       # instance methods
  extend Serializable    # class methods (rarely used this way)

  attr_accessor :name, :email

  def initialize(name, email)
    @name = name
    @email = email
    log("User created: #{name}")
  end
end

user = User.new("Andi", "andi@mail.com")
user.log("Testing")      # include adds instance method
puts user.to_json        # from Serializable via to_h
\`\`\`

### prepend vs include
\`\`\`ruby
module Timestamped
  def save
    @updated_at = Time.now
    super  # call original
  end
end

class Record
  prepend Timestamped  # Timestamped BEFORE Record in chain

  def save
    puts "Saving record..."
  end
end

r = Record.new
r.save
# @updated_at set FIRST, then "Saving record..."

# Method lookup order with prepend:
# [Timestamped, Record, Object, Kernel, BasicObject]
\`\`\`

---

## Composition over Inheritance
\`\`\`ruby
# Dependency Injection
class EmailNotifier
  def notify(user, message)
    puts "Email to #{user.email}: #{message}"
  end
end

class SmsNotifier
  def notify(user, message)
    puts "SMS to #{user.phone}: #{message}"
  end
end

class OrderService
  def initialize(notifier:)
    @notifier = notifier
  end

  def complete_order(order)
    # process order...
    @notifier.notify(order.user, "Order #{order.id} completed!")
  end
end

# Usage - inject dependency
email_service = OrderService.new(notifier: EmailNotifier.new)
sms_service = OrderService.new(notifier: SmsNotifier.new)
\`\`\`

---

## Duck Typing
\`\`\`ruby
# "If it walks like a duck and quacks like a duck..."
# Ruby tidak peduli CLASS, yang penting METHOD-nya ada

class Duck
  def quack
    "Quack!"
  end
end

class Person
  def quack
    "I'm pretending to be a duck!"
  end
end

def make_it_quack(duck_like_thing)
  duck_like_thing.quack
end

make_it_quack(Duck.new)    # "Quack!"
make_it_quack(Person.new)  # "I'm pretending to be a duck!"

# Check dengan respond_to?
def safe_quack(obj)
  if obj.respond_to?(:quack)
    obj.quack
  else
    "Can't quack"
  end
end
\`\`\`

---

## Struct & Data
\`\`\`ruby
# Struct - quick class generator
User = Struct.new(:name, :email, keyword_init: true) do
  def greeting
    "Hello, #{name}!"
  end
end

user = User.new(name: "Andi", email: "andi@mail.com")
puts user.name       # "Andi"
puts user.greeting   # "Hello, Andi!"

# Data (Ruby 3.2+) - immutable value object
Point = Data.define(:x, :y) do
  def distance_from_origin
    Math.sqrt(x**2 + y**2)
  end
end

point = Point.new(3, 4)
puts point.x                  # 3
puts point.distance_from_origin # 5.0
# point.x = 10                # Error! immutable
\`\`\`

---

## SOLID Principles
\`\`\`ruby
# S - Single Responsibility
class UserValidator
  def valid?(user)
    user.name.present? && user.email.include?("@")
  end
end

class UserRepository
  def save(user)
    # database logic only
  end
end

# O - Open/Closed (via modules/inheritance)
module Discountable
  def apply_discount(percentage)
    @price * (1 - percentage / 100.0)
  end
end

# L - Liskov Substitution
# Subclasses harus bisa menggantikan parent tanpa breaking

# I - Interface Segregation (via small modules)
module Printable
  def print; end
end

module Exportable
  def export; end
end

# D - Dependency Inversion (via injection)
class Service
  def initialize(repository:, notifier:)
    @repository = repository
    @notifier = notifier
  end
end
\`\`\`

---

## 🎯 Outcome Modul
- Membuat classes dengan attr_* accessors
- Memahami inheritance dan method lookup
- Menggunakan modules untuk namespace dan mixins
- Composition dengan dependency injection
- Duck typing dan respond_to?
- Menerapkan SOLID principles
`,
    level: 'intermediate',
    order: 5,
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: 'rb-06',
    user_type: 'student',
    language: 'ruby',
    title: 'Error Handling, File I/O & Testing',
    description: 'Exceptions, begin/rescue/ensure, file operations, RSpec/Minitest basics.',
    content: `# Error Handling, I/O & Testing

## Exception Handling

### Basic rescue
\`\`\`ruby
begin
  result = 10 / 0
rescue ZeroDivisionError => e
  puts "Error: #{e.message}"
  result = 0
end

# Inline rescue (gunakan hati-hati)
result = 10 / 0 rescue 0

# Multiple exception types
begin
  risky_operation
rescue ArgumentError => e
  puts "Bad argument: #{e.message}"
rescue TypeError => e
  puts "Type error: #{e.message}"
rescue => e  # catch semua StandardError
  puts "Unexpected: #{e.class} - #{e.message}"
end
\`\`\`

### ensure & else
\`\`\`ruby
def read_file(path)
  file = File.open(path)
  content = file.read
  content
rescue Errno::ENOENT => e
  puts "File not found: #{path}"
  nil
rescue => e
  puts "Error reading file: #{e.message}"
  nil
else
  # Jalan jika TIDAK ada exception
  puts "File read successfully"
  content
ensure
  # SELALU jalan
  file&.close
  puts "Cleanup done"
end
\`\`\`

### raise & Custom Exceptions
\`\`\`ruby
# Raise exception
def divide(a, b)
  raise ArgumentError, "Cannot divide by zero" if b.zero?
  a / b
end

# Custom exception class
class ValidationError < StandardError
  attr_reader :field, :code

  def initialize(message, field: nil, code: nil)
    super(message)
    @field = field
    @code = code
  end
end

class InsufficientFundsError < StandardError; end

def withdraw(amount)
  raise InsufficientFundsError, "Not enough balance" if amount > @balance
  raise ValidationError.new("Invalid amount", field: :amount, code: "INVALID") if amount <= 0
  @balance -= amount
end

# Catch custom exception
begin
  withdraw(1000)
rescue ValidationError => e
  puts "Validation failed on #{e.field}: #{e.message}"
rescue InsufficientFundsError => e
  puts "Cannot withdraw: #{e.message}"
end
\`\`\`

### retry & raise
\`\`\`ruby
# retry - coba ulang
attempts = 0

begin
  attempts += 1
  connect_to_server
rescue ConnectionError
  retry if attempts < 3
  raise  # re-raise exception setelah 3x
end

# raise tanpa argument = re-raise current exception
begin
  something_risky
rescue => e
  log_error(e)
  raise  # re-raise sama persis
end
\`\`\`

---

## File I/O

### Reading Files
\`\`\`ruby
# Baca seluruh file
content = File.read("data.txt")

# Baca per line
lines = File.readlines("data.txt", chomp: true)

# Baca dengan block (auto-close)
File.open("data.txt", "r") do |file|
  file.each_line do |line|
    puts line
  end
end

# Check file exists
if File.exist?("data.txt")
  content = File.read("data.txt")
end

# File info
puts File.size("data.txt")
puts File.mtime("data.txt")  # modification time
puts File.directory?("data.txt")  # false
\`\`\`

### Writing Files
\`\`\`ruby
# Write (overwrite)
File.write("output.txt", "Hello, World!")

# Append
File.open("log.txt", "a") do |file|
  file.puts "Log entry at #{Time.now}"
end

# Write dengan block
File.open("data.txt", "w") do |file|
  file.puts "Line 1"
  file.puts "Line 2"
  file.write "No newline"
end
\`\`\`

### Working with Directories
\`\`\`ruby
# List files
Dir.entries(".")              # [".", "..", "file.rb", ...]
Dir.glob("*.rb")              # ["app.rb", "test.rb"]
Dir.glob("**/*.rb")           # recursive

# Create directory
Dir.mkdir("new_folder")
FileUtils.mkdir_p("a/b/c")    # nested

# Change directory
Dir.chdir("src") do
  # working in src/
end
# back to original

# Current directory
puts Dir.pwd
\`\`\`

### CSV & JSON
\`\`\`ruby
require 'csv'
require 'json'

# CSV
CSV.foreach("data.csv", headers: true) do |row|
  puts row["name"]
end

data = CSV.read("data.csv", headers: true)
data.each { |row| puts row.to_h }

CSV.open("output.csv", "w") do |csv|
  csv << ["name", "age"]
  csv << ["Andi", 25]
end

# JSON
json_string = '{"name": "Andi", "age": 25}'
data = JSON.parse(json_string, symbolize_names: true)
puts data[:name]

hash = { name: "Budi", age: 30 }
json_output = JSON.generate(hash)
json_pretty = JSON.pretty_generate(hash)

File.write("data.json", JSON.pretty_generate(hash))
\`\`\`

---

## Testing dengan RSpec

### Setup RSpec
\`\`\`bash
# Gemfile
gem 'rspec', '~> 3.12'

# Install & init
bundle install
rspec --init
\`\`\`

### Basic Tests
\`\`\`ruby
# spec/calculator_spec.rb
require_relative '../lib/calculator'

RSpec.describe Calculator do
  describe '#add' do
    it 'adds two positive numbers' do
      calc = Calculator.new
      expect(calc.add(2, 3)).to eq(5)
    end

    it 'handles negative numbers' do
      calc = Calculator.new
      expect(calc.add(-1, 1)).to eq(0)
    end
  end

  describe '#divide' do
    let(:calc) { Calculator.new }

    it 'divides two numbers' do
      expect(calc.divide(10, 2)).to eq(5)
    end

    it 'raises error for division by zero' do
      expect { calc.divide(10, 0) }.to raise_error(ZeroDivisionError)
    end
  end
end
\`\`\`

### Matchers
\`\`\`ruby
# Equality
expect(result).to eq(expected)      # ==
expect(result).to eql(expected)     # eql?
expect(result).to be(expected)      # equal? (same object)

# Truthiness
expect(value).to be_truthy
expect(value).to be_falsey
expect(value).to be_nil

# Comparisons
expect(10).to be > 5
expect(5).to be_between(1, 10)

# Collections
expect([1, 2, 3]).to include(2)
expect([1, 2, 3]).to contain_exactly(3, 2, 1)
expect({ a: 1 }).to have_key(:a)

# Strings
expect("hello").to start_with("he")
expect("hello").to end_with("lo")
expect("hello").to match(/ell/)

# Types
expect(obj).to be_a(String)
expect(obj).to be_an_instance_of(User)
expect(obj).to respond_to(:name)

# Changes
expect { x += 1 }.to change { x }.by(1)
expect { array << 1 }.to change { array.size }.from(0).to(1)
\`\`\`

### before, after, let
\`\`\`ruby
RSpec.describe User do
  # Lazy-loaded, memoized
  let(:user) { User.new("Andi", "andi@mail.com") }

  # let! forces immediate evaluation
  let!(:admin) { User.new("Admin", "admin@mail.com") }

  # Setup sebelum each test
  before(:each) do
    # reset database, setup fixtures
  end

  # Cleanup setelah each test
  after(:each) do
    # cleanup
  end

  # Sekali untuk seluruh describe block
  before(:all) do
    # expensive setup
  end

  it 'has a name' do
    expect(user.name).to eq("Andi")
  end
end
\`\`\`

### Mocking & Stubbing
\`\`\`ruby
RSpec.describe OrderService do
  let(:notifier) { instance_double(EmailNotifier) }
  let(:service) { OrderService.new(notifier: notifier) }

  describe '#complete' do
    it 'sends notification' do
      order = Order.new(id: 1)

      # Expect this method to be called
      expect(notifier).to receive(:notify)
        .with(order.user, /completed/)

      service.complete(order)
    end

    it 'handles notification failure' do
      order = Order.new(id: 1)

      # Stub to raise error
      allow(notifier).to receive(:notify)
        .and_raise(NetworkError)

      expect { service.complete(order) }
        .not_to raise_error
    end
  end
end
\`\`\`

---

## Testing dengan Minitest

### Basic Minitest
\`\`\`ruby
# test/calculator_test.rb
require 'minitest/autorun'
require_relative '../lib/calculator'

class CalculatorTest < Minitest::Test
  def setup
    @calc = Calculator.new
  end

  def test_add
    assert_equal 5, @calc.add(2, 3)
  end

  def test_divide
    assert_equal 5, @calc.divide(10, 2)
  end

  def test_divide_by_zero
    assert_raises(ZeroDivisionError) do
      @calc.divide(10, 0)
    end
  end
end

# Run: ruby test/calculator_test.rb
\`\`\`

---

## 🎯 Outcome Modul
- Exception handling dengan begin/rescue/ensure
- Custom exception classes
- File I/O: read, write, CSV, JSON
- Testing dengan RSpec: describe, it, expect
- Matchers, let, before/after hooks
- Mocking dan stubbing
`,
    level: 'intermediate',
    order: 6,
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: 'rb-07',
    user_type: 'student',
    language: 'ruby',
    title: 'Metaprogramming & Advanced Ruby',
    description: 'method_missing, define_method, class_eval, hooks, DSL creation.',
    content: `# Metaprogramming Ruby

## Reflection & Introspection
\`\`\`ruby
class User
  attr_accessor :name, :email

  def initialize(name, email)
    @name = name
    @email = email
  end

  def greet
    "Hello!"
  end

  private

  def secret
    "shhh"
  end
end

user = User.new("Andi", "andi@mail.com")

# Introspection
puts user.class                   # User
puts user.class.superclass        # Object
puts user.class.ancestors         # [User, Object, Kernel, BasicObject]

puts user.methods.count           # semua methods
puts user.public_methods(false)   # [:name, :email, :greet, ...]
puts user.private_methods(false)  # [:secret]

puts user.instance_variables      # [:@name, :@email]
puts user.instance_variable_get(:@name)  # "Andi"

puts User.instance_methods(false) # methods defined di User
puts User.constants               # constants dalam User
\`\`\`

---

## Dynamic Method Definition

### define_method
\`\`\`ruby
class ApiClient
  ENDPOINTS = [:users, :posts, :comments]

  ENDPOINTS.each do |endpoint|
    define_method("get_#{endpoint}") do |id = nil|
      path = id ? "/#{endpoint}/#{id}" : "/#{endpoint}"
      fetch(path)
    end

    define_method("create_#{endpoint}") do |data|
      post("/#{endpoint}", data)
    end
  end

  private

  def fetch(path)
    puts "GET #{path}"
  end

  def post(path, data)
    puts "POST #{path} with #{data}"
  end
end

client = ApiClient.new
client.get_users
client.get_posts(1)
client.create_comments({ body: "Nice!" })
\`\`\`

### method_missing
\`\`\`ruby
class FlexibleHash
  def initialize(hash = {})
    @data = hash
  end

  def method_missing(name, *args)
    name_str = name.to_s

    if name_str.end_with?("=")
      # Setter: obj.foo = value
      key = name_str.chomp("=").to_sym
      @data[key] = args.first
    elsif name_str.end_with?("?")
      # Predicate: obj.foo?
      key = name_str.chomp("?").to_sym
      !!@data[key]
    else
      # Getter: obj.foo
      @data[name]
    end
  end

  def respond_to_missing?(name, include_private = false)
    true  # atau logika lebih spesifik
  end
end

obj = FlexibleHash.new(name: "Andi")
puts obj.name          # "Andi"
obj.email = "a@mail.com"
puts obj.email         # "a@mail.com"
puts obj.email?        # true
puts obj.phone?        # false
\`\`\`

---

## class_eval & instance_eval
\`\`\`ruby
# class_eval - execute dalam konteks class
class User
end

User.class_eval do
  attr_accessor :nickname

  def greet
    "Hello, #{@nickname || 'stranger'}!"
  end
end

user = User.new
user.nickname = "Miku"
puts user.greet  # "Hello, Miku!"

# instance_eval - execute dalam konteks instance
class Config
  def initialize(&block)
    instance_eval(&block) if block_given?
  end

  def set(key, value)
    instance_variable_set("@#{key}", value)
  end

  def get(key)
    instance_variable_get("@#{key}")
  end
end

config = Config.new do
  set :host, "localhost"
  set :port, 3000
end

puts config.get(:host)  # "localhost"
\`\`\`

---

## Hooks & Callbacks
\`\`\`ruby
class Base
  # Called when class is subclassed
  def self.inherited(subclass)
    puts "#{subclass} inherited from #{self}"
  end

  # Called when module is included
  def self.included(base)
    puts "#{self} included in #{base}"
  end

  # Called when module is extended
  def self.extended(base)
    puts "#{self} extended by #{base}"
  end

  # Called when method is added
  def self.method_added(name)
    puts "Method added: #{name}"
  end

  # Called when constant is missing
  def self.const_missing(name)
    puts "Constant missing: #{name}"
    nil
  end
end

module Trackable
  def self.included(base)
    base.extend(ClassMethods)
    base.include(InstanceMethods)
  end

  module ClassMethods
    def track_calls
      @call_count ||= 0
    end
  end

  module InstanceMethods
    def tracked_method
      self.class.instance_variable_set(:@call_count,
        (self.class.instance_variable_get(:@call_count) || 0) + 1)
    end
  end
end
\`\`\`

---

## Building a DSL
\`\`\`ruby
# Simple DSL for defining routes
class Router
  def initialize
    @routes = []
  end

  def get(path, &handler)
    @routes << { method: :get, path: path, handler: handler }
  end

  def post(path, &handler)
    @routes << { method: :post, path: path, handler: handler }
  end

  def namespace(prefix, &block)
    @current_prefix = prefix
    instance_eval(&block)
    @current_prefix = nil
  end

  def routes
    @routes
  end

  private

  def full_path(path)
    @current_prefix ? "#{@current_prefix}#{path}" : path
  end
end

# DSL usage
router = Router.new

router.instance_eval do
  get "/" do
    "Welcome!"
  end

  get "/users" do
    "List users"
  end

  namespace "/api" do
    get "/status" do
      "OK"
    end
  end
end

puts router.routes

# More advanced: Configuration DSL
class AppConfig
  class << self
    def configure(&block)
      instance_eval(&block)
    end

    def database(&block)
      @database_config = DatabaseConfig.new
      @database_config.instance_eval(&block)
      @database_config
    end

    def server(&block)
      @server_config = ServerConfig.new
      @server_config.instance_eval(&block)
      @server_config
    end
  end
end

# Clean DSL
AppConfig.configure do
  database do
    adapter "postgresql"
    host "localhost"
    name "myapp_development"
  end

  server do
    port 3000
    workers 4
  end
end
\`\`\`

---

## Refinements (Scoped Monkey Patching)
\`\`\`ruby
# Safer than global monkey patching
module StringExtensions
  refine String do
    def shout
      "#{upcase}!"
    end

    def whisper
      "(#{downcase})"
    end
  end
end

# Tanpa refinement
"hello".shout  # NoMethodError

# Dengan refinement
class Greeter
  using StringExtensions

  def greet(name)
    "Hello".shout + " " + name.whisper
  end
end

Greeter.new.greet("Andi")  # "HELLO! (andi)"
\`\`\`

---

## Object Allocation & GC
\`\`\`ruby
# Object allocation
obj = Object.allocate  # create tanpa initialize

# ObjectSpace
ObjectSpace.each_object(String).count  # jumlah String objects
ObjectSpace.each_object(MyClass) { |obj| puts obj }

# Manual GC (jarang diperlukan)
GC.start

# Finalizers (cleanup saat object di-GC)
class TempFile
  def initialize(path)
    @path = path
    ObjectSpace.define_finalizer(self, self.class.cleanup(path))
  end

  def self.cleanup(path)
    proc { File.delete(path) if File.exist?(path) }
  end
end
\`\`\`

---

## 🎯 Outcome Modul
- Introspection: methods, instance_variables, ancestors
- Dynamic method definition: define_method, method_missing
- class_eval dan instance_eval
- Hooks: inherited, included, method_added
- Building Domain-Specific Languages (DSL)
- Refinements untuk scoped monkey patching
`,
    level: 'advanced',
    order: 7,
    created_at: '2025-01-01T00:00:00Z'
  },
  // Lanjutan rb-08 (yang terpotong)
  {
    id: 'rb-08',
    user_type: 'student',
    language: 'ruby',
    title: 'Ruby on Rails Intro, Gems, CI/CD & Sertifikasi',
    description: 'Rails basics, Bundler, popular gems, testing best practices, CI pipeline, rubrik.',
    content: `# Rails, Gems & Sertifikasi

## Ruby on Rails Overview

### MVC Architecture
\`\`\`
app/
├── controllers/    # Handle HTTP requests
│   └── users_controller.rb
├── models/         # Business logic & data
│   └── user.rb
├── views/          # Templates (ERB, Haml)
│   └── users/
│       ├── index.html.erb
│       └── show.html.erb
├── helpers/        # View helpers
├── jobs/           # Background jobs
└── mailers/        # Email sending
config/
├── routes.rb       # URL routing
├── database.yml    # DB configuration
└── application.rb  # App settings
db/
├── migrate/        # Database migrations
└── seeds.rb        # Seed data
\`\`\`

### Quick Rails Setup
\`\`\`bash
# Install Rails
gem install rails

# Create new app
rails new myapp --database=postgresql

# Or with API-only mode
rails new myapi --api --database=postgresql

cd myapp

# Generate scaffold
rails generate scaffold User name:string email:string

# Migrate database
rails db:create
rails db:migrate

# Start server
rails server
\`\`\`

### Basic Controller
\`\`\`ruby
# app/controllers/users_controller.rb
class UsersController < ApplicationController
  before_action :authenticate_user!, except: [:index, :show]
  before_action :set_user, only: [:show, :update, :destroy]

  def index
    @users = User.all
    render json: @users
  end

  def show
    render json: @user
  end

  def create
    @user = User.new(user_params)
    if @user.save
      render json: @user, status: :created
    else
      render json: @user.errors, status: :unprocessable_entity
    end
  end

  def update
    if @user.update(user_params)
      render json: @user
    else
      render json: @user.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @user.destroy
    head :no_content
  end

  private

  def set_user
    @user = User.find(params[:id])
  end

  def user_params
    params.require(:user).permit(:name, :email)
  end
end
\`\`\`

### Basic Model
\`\`\`ruby
# app/models/user.rb
class User < ApplicationRecord
  has_many :posts, dependent: :destroy
  has_many :comments
  belongs_to :organization, optional: true

  validates :name, presence: true, length: { minimum: 2 }
  validates :email, presence: true,
                    uniqueness: { case_sensitive: false },
                    format: { with: URI::MailTo::EMAIL_REGEXP }

  before_save :normalize_email

  scope :active, -> { where(active: true) }
  scope :recent, -> { order(created_at: :desc) }

  def full_name
    "\#{first_name} \#{last_name}"
  end

  private

  def normalize_email
    self.email = email.downcase.strip
  end
end
\`\`\`

---

## Bundler & Gemfile
\`\`\`ruby
# Gemfile
source 'https://rubygems.org'

ruby '3.2.2'

# Framework
gem 'rails', '~> 7.1'

# Database
gem 'pg', '~> 1.5'

# Authentication
gem 'devise', '~> 4.9'
gem 'jwt', '~> 2.7'

# API
gem 'jbuilder', '~> 2.11'
gem 'rack-cors'

# Background Jobs
gem 'sidekiq', '~> 7.1'
gem 'redis', '~> 5.0'

# Utilities
gem 'puma', '~> 6.3'
gem 'bootsnap', require: false

group :development, :test do
  gem 'rspec-rails', '~> 6.0'
  gem 'factory_bot_rails'
  gem 'faker'
  gem 'pry-byebug'
end

group :development do
  gem 'rubocop', require: false
  gem 'rubocop-rails', require: false
  gem 'rubocop-rspec', require: false
end

group :test do
  gem 'shoulda-matchers'
  gem 'simplecov', require: false
  gem 'webmock'
  gem 'vcr'
end
\`\`\`

### Bundler Commands
\`\`\`bash
bundle install          # Install gems
bundle update           # Update all gems
bundle update rails     # Update specific gem
bundle exec rails s     # Run dengan bundled gems
bundle outdated         # Show outdated gems
bundle audit            # Security check (bundler-audit)
\`\`\`

---

## Popular Gems

### Authentication & Authorization
- **Devise** - Full authentication solution
- **JWT** - JSON Web Tokens
- **Pundit** - Authorization policies
- **CanCanCan** - Role-based authorization

### API & Serialization
- **jbuilder** - JSON views
- **Active Model Serializers** - JSON:API serialization
- **Blueprinter** - Fast serializer

### Background Jobs
- **Sidekiq** - Redis-backed job processing
- **GoodJob** - Postgres-backed jobs
- **Solid Queue** - Rails 8+ built-in

### Testing
- **RSpec** - BDD testing framework
- **FactoryBot** - Test data factories
- **Faker** - Fake data generation
- **VCR** - Record HTTP interactions

### Code Quality
- **RuboCop** - Linter & formatter
- **Brakeman** - Security scanner
- **SimpleCov** - Code coverage

---

## Testing Best Practices

### RSpec dengan Rails
\`\`\`ruby
# spec/rails_helper.rb
require 'spec_helper'
ENV['RAILS_ENV'] ||= 'test'
require_relative '../config/environment'
require 'rspec/rails'

Dir[Rails.root.join('spec', 'support', '**', '*.rb')].each { |f| require f }

RSpec.configure do |config|
  config.include FactoryBot::Syntax::Methods
  config.use_transactional_fixtures = true
  config.infer_spec_type_from_file_location!
end

Shoulda::Matchers.configure do |config|
  config.integrate do |with|
    with.test_framework :rspec
    with.library :rails
  end
end
\`\`\`

### Model Spec
\`\`\`ruby
# spec/models/user_spec.rb
RSpec.describe User, type: :model do
  describe 'associations' do
    it { should have_many(:posts).dependent(:destroy) }
    it { should belong_to(:organization).optional }
  end

  describe 'validations' do
    it { should validate_presence_of(:name) }
    it { should validate_presence_of(:email) }
    it { should validate_uniqueness_of(:email).case_insensitive }
  end

  describe '#full_name' do
    it 'returns first and last name' do
      user = build(:user, first_name: 'John', last_name: 'Doe')
      expect(user.full_name).to eq('John Doe')
    end
  end
end
\`\`\`

### Request Spec
\`\`\`ruby
# spec/requests/users_spec.rb
RSpec.describe 'Users API', type: :request do
  let!(:users) { create_list(:user, 5) }
  let(:user_id) { users.first.id }

  describe 'GET /users' do
    before { get '/users' }

    it 'returns users' do
      expect(json).not_to be_empty
      expect(json.size).to eq(5)
    end

    it 'returns status code 200' do
      expect(response).to have_http_status(200)
    end
  end

  describe 'POST /users' do
    let(:valid_attributes) { { name: 'Andi', email: 'andi@mail.com' } }

    context 'when the request is valid' do
      before { post '/users', params: valid_attributes }

      it 'creates a user' do
        expect(json['name']).to eq('Andi')
      end

      it 'returns status code 201' do
        expect(response).to have_http_status(201)
      end
    end

    context 'when the request is invalid' do
      before { post '/users', params: { name: '' } }

      it 'returns status code 422' do
        expect(response).to have_http_status(422)
      end
    end
  end
end
\`\`\`

### Factories
\`\`\`ruby
# spec/factories/users.rb
FactoryBot.define do
  factory :user do
    name { Faker::Name.name }
    email { Faker::Internet.unique.email }
    password { 'password123' }

    trait :admin do
      role { 'admin' }
    end

    trait :with_posts do
      after(:create) do |user|
        create_list(:post, 3, user: user)
      end
    end
  end
end

# Usage
create(:user)
create(:user, :admin)
create(:user, :with_posts)
build(:user)  # tidak save ke DB
\`\`\`

---

## CI/CD Pipeline
\`\`\`yaml
# .github/workflows/ci.yml
name: Ruby CI

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest

    services:
      postgres:
        image: postgres:15
        env:
          POSTGRES_PASSWORD: postgres
        ports:
          - 5432:5432
        options: >-
          --health-cmd pg_isready
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5

      redis:
        image: redis:7
        ports:
          - 6379:6379

    steps:
      - uses: actions/checkout@v4

      - name: Setup Ruby
        uses: ruby/setup-ruby@v1
        with:
          ruby-version: '3.2'
          bundler-cache: true

      - name: Setup Database
        env:
          RAILS_ENV: test
          DATABASE_URL: postgres://postgres:postgres@localhost:5432/test
        run: |
          bundle exec rails db:create
          bundle exec rails db:schema:load

      - name: Run RuboCop
        run: bundle exec rubocop

      - name: Run Brakeman
        run: bundle exec brakeman -q

      - name: Run Tests
        env:
          RAILS_ENV: test
          DATABASE_URL: postgres://postgres:postgres@localhost:5432/test
          REDIS_URL: redis://localhost:6379
        run: bundle exec rspec --format documentation

      - name: Upload Coverage
        uses: codecov/codecov-action@v3
        with:
          files: ./coverage/.resultset.json
\`\`\`

---

## Final Project Ruby

Bangun **API Backend** atau **Full-Stack Rails App**:

1. **Requirements:**
   - Rails 7+ dengan PostgreSQL
   - Authentication (Devise atau JWT)
   - Authorization (Pundit)
   - Background jobs (Sidekiq)
   - RESTful API design

2. **Features:**
   - User management (CRUD)
   - At least 2 related resources
   - Proper validations & error handling
   - Search/filter functionality

3. **Quality:**
   - RSpec tests ≥ 80% coverage
   - RuboCop passing
   - Brakeman security scan clean
   - Documentation (README, API docs)

---

## Rubrik Sertifikasi Ruby

| Aspek | Bobot | Kriteria Lulus |
|:--|:--:|:--|
| Ruby Fundamentals | 25% | OOP, blocks, modules, metaprogramming |
| Rails Proficiency | 25% | MVC, ActiveRecord, routing, concerns |
| Testing | 25% | RSpec, factories, coverage ≥ 80% |
| Code Quality | 15% | RuboCop clean, SOLID principles |
| Documentation | 10% | README, inline docs, API spec |

---

## 🎯 Outcome Modul
- Memahami Rails MVC architecture
- Menggunakan Bundler dan popular gems
- Testing best practices dengan RSpec
- CI/CD pipeline untuk Ruby projects
- Siap sertifikasi dan praktik industri
`,
    level: 'advanced',
    order: 8,
    created_at: '2025-01-01T00:00:00Z'
  },

  // ==================== EXISTING MATERIALS (KEEP AS IS) ====================
  {
    id: '3',
    user_type: 'umum',
    language: 'javascript',
    title: 'JavaScript Fundamentals',
    description: 'Dasar-dasar JavaScript untuk web development',
    content: `# JavaScript Fundamentals

JavaScript adalah bahasa pemrograman untuk membuat website interaktif.

## Variables

\`\`\`javascript
let name = "John";
const age = 25;
var city = "Jakarta";
\`\`\`

## Functions

\`\`\`javascript
function greet(name) {
    return "Hello, " + name;
}

console.log(greet("World"));
\`\`\`

## Arrow Functions

\`\`\`javascript
const add = (a, b) => a + b;
console.log(add(5, 3));
\`\`\``,
    level: 'beginner',
    order: 1,
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: '4',
    user_type: 'pro',
    language: 'php',
    title: 'PHP Advanced Concepts',
    description: 'Konsep advanced PHP untuk professional',
    content: `# PHP Advanced Concepts

## OOP (Object-Oriented Programming)

\`\`\`php
<?php
class User {
    private $name;
    private $email;

    public function __construct($name, $email) {
        $this->name = $name;
        $this->email = $email;
    }

    public function getName() {
        return $this->name;
    }
}

$user = new User("John", "john@email.com");
echo $user->getName();
?>
\`\`\`

## Namespace

\`\`\`php
<?php
namespace App\\Models;

class Product {
    // Product implementation
}
?>
\`\`\``,
    level: 'advanced',
    order: 1,
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: '5',
    user_type: 'game',
    language: 'javascript',
    title: 'Game Development Basics',
    description: 'Dasar-dasar membuat game dengan JavaScript',
    content: `# Game Development Basics

## Canvas API

\`\`\`javascript
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Draw rectangle
ctx.fillStyle = 'red';
ctx.fillRect(50, 50, 100, 100);

// Draw circle
ctx.beginPath();
ctx.arc(200, 200, 50, 0, Math.PI * 2);
ctx.fillStyle = 'blue';
ctx.fill();
\`\`\`

## Game Loop

\`\`\`javascript
let x = 0;

function gameLoop() {
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Update
    x += 1;

    // Draw
    ctx.fillRect(x, 100, 50, 50);

    // Loop
    requestAnimationFrame(gameLoop);
}

gameLoop();
\`\`\``,
    level: 'intermediate',
    order: 1,
    created_at: '2025-01-01T00:00:00Z'
  },
];

export const MOCK_SUBSCRIPTIONS: Subscription[] = [
  {
    id: '1',
    user_id: '2',
    subscription_type: 'plus',
    period: 'monthly',
    amount: 99000,
    currency: 'IDR',
    status: 'paid',
    start_date: '2025-09-01T00:00:00Z',
    end_date: '2025-10-01T00:00:00Z',
    payment_date: '2025-09-01T00:00:00Z',
    created_at: '2025-09-01T00:00:00Z'
  },
  {
    id: '2',
    user_id: '3',
    subscription_type: 'pro',
    period: 'yearly',
    amount: 1990000,
    currency: 'IDR',
    status: 'paid',
    start_date: '2025-01-01T00:00:00Z',
    end_date: '2026-01-01T00:00:00Z',
    payment_date: '2025-01-01T00:00:00Z',
    created_at: '2025-01-01T00:00:00Z'
  },
];
