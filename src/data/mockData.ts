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
];