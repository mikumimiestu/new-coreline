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

export interface LearningMaterial {
  id: string;
  user_type: string;
  language: string | null;
  title: string;
  description: string;
  content: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  order: number;
  created_at: string;
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

export const MOCK_USERS: User[] = [
  {
    id: '1011',
    access_code: 'MIKU001',
    user_type: 'student',
    photo_url: '/user/male.png',
    name: 'Mikumiestu',
    username: 'mikumistu',
    email: 'mikumiestu@astbyte.com',
    phone: '628123456789',
    subscription_type: 'pro',
    subscription_period: null,
    subscription_start: null,
    subscription_end: null,
    subscription_status: 'active',
    created_at: '2025-01-01T00:00:00Z',
    last_login: '2025-10-07T00:00:00Z'
  },
  {
    id: '2',
    access_code: 'UMUM001',
    user_type: 'umum',
    name: 'Siti Nurhaliza',
    username: 'sitinur',
    email: 'siti@email.com',
    phone: '082345678901',
    subscription_type: 'plus',
    subscription_period: 'monthly',
    subscription_start: '2025-09-01T00:00:00Z',
    subscription_end: '2025-10-01T00:00:00Z',
    subscription_status: 'active',
    created_at: '2025-02-01T00:00:00Z',
    last_login: '2025-10-07T00:00:00Z'
  },
  {
    id: '3',
    access_code: 'PRO001',
    user_type: 'pro',
    name: 'Ahmad Developer',
    username: 'ahmaddev',
    email: 'ahmad@pro.com',
    phone: '083456789012',
    subscription_type: 'pro',
    subscription_period: 'yearly',
    subscription_start: '2025-01-01T00:00:00Z',
    subscription_end: '2026-01-01T00:00:00Z',
    subscription_status: 'active',
    created_at: '2025-01-01T00:00:00Z',
    last_login: '2025-10-07T00:00:00Z'
  },
  {
    id: '4',
    access_code: 'GAME001',
    user_type: 'game',
    name: 'Rina Gamedev',
    username: 'rinagame',
    email: 'rina@game.com',
    phone: '084567890123',
    subscription_type: 'free',
    subscription_period: null,
    subscription_start: null,
    subscription_end: null,
    subscription_status: 'active',
    created_at: '2025-03-01T00:00:00Z',
    last_login: '2025-10-07T00:00:00Z'
  }
];

export const MOCK_MATERIALS: LearningMaterial[] = [
  {
  id: 'py-01',
  user_type: 'student',
  language: 'python',
  title: 'Pengenalan Python (Apa itu & Sejarah)',
  description: 'Definisi, ekosistem, dan sejarah Python; use cases industri.',
  content: `# 🐍 Pengenalan Python

## Apa itu Python?
Python adalah bahasa pemrograman **high-level**, **interpreted**, dan **multi-paradigm** (prosedural, OOP, dan fungsional).  
Fokus utama Python adalah **readability** (mudah dibaca) dan **developer productivity** (cepat dikembangkan).

**Karakteristik Utama:**
- Sintaks sederhana & ekspresif
- Dynamic typing (tipe data fleksibel)
- Cross-platform (Windows, macOS, Linux)
- Ribuan library siap pakai melalui **PyPI**
- Open-source & gratis digunakan

---

## 🕰️ Sejarah Singkat
| Tahun | Peristiwa | Catatan |
|:---:|:---|:---|
| 1989 | Guido van Rossum mulai mengembangkan | CWI (Belanda) |
| 1991 | Rilis Python 0.9.0 | Class, fungsi, exception pertama |
| 1994 | Python 1.0 | Tambah lambda, map/filter/reduce |
| 2000 | Python 2.0 | Garbage Collection, List Comprehension |
| 2008 | Python 3.0 | Breaking changes, Unicode-first |
| 2010s–2020s | 3.4–3.12+ | Asyncio, f-string, walrus (:=), pattern matching |

---

## 💡 Kenapa Python Populer?
- **Mudah dipelajari** – sintaks mirip bahasa manusia  
- **Serbaguna** – bisa untuk web, data, AI, IoT, automasi  
- **Komunitas besar** – dokumentasi & forum melimpah  
- **Didukung perusahaan besar** seperti Google, NASA, Netflix, Spotify  
- **Banyak peluang kerja** di bidang data dan AI  

---

## ⚙️ Kegunaan Utama
### 🧠 Data Science & Machine Learning
- Library: NumPy, Pandas, Matplotlib, Scikit-learn, TensorFlow, PyTorch  
- Contoh: prediksi harga saham, analisis data, deteksi wajah  

### 🌐 Web Development
- Framework: Django, Flask, FastAPI  
- Contoh: aplikasi web, REST API, backend sistem  

### ⚙️ Automation & Scripting
- Contoh: bot Telegram, scraping, manajemen file, cron task  

### 🧩 DevOps & Infrastruktur
- Tools: Ansible, Fabric, Docker SDK  
- Contoh: deployment otomatis, CI/CD, server config  

### 🎮 Game & IoT
- Library: Pygame, MicroPython, Raspberry Pi  
- Contoh: game edukasi, kontrol perangkat pintar  

---

## 💻 Contoh Pertama
\`\`\`python
print("Halo, dunia Python!")
\`\`\`

### Input-Output sederhana
\`\`\`python
nama = input("Siapa nama kamu? ")
print(f"Halo, {nama}!")
\`\`\`

---

## 🧠 Konsep Dasar Python

### Variabel & Tipe Data
\`\`\`python
umur = 21          # int
nama = "Raju"      # string
nilai = 92.5       # float
aktif = True       # boolean
\`\`\`

### Struktur Kondisi
\`\`\`python
if umur >= 18:
    print("Dewasa")
else:
    print("Belum dewasa")
\`\`\`

### Perulangan
\`\`\`python
for i in range(5):
    print("Iterasi ke-", i)
\`\`\`

### Fungsi
\`\`\`python
def salam(nama):
    return f"Halo, {nama}!"

print(salam("Mikumiestu"))
\`\`\`

### OOP (Object-Oriented Programming)
\`\`\`python
class Mahasiswa:
    def __init__(self, nama, jurusan):
        self.nama = nama
        self.jurusan = jurusan

    def info(self):
        print(f"{self.nama} dari jurusan {self.jurusan}")

mhs1 = Mahasiswa("Zaki", "Informatika")
mhs1.info()
\`\`\`

---

## 🚀 Fitur Modern Python (3.x)
- **F-String:** \`f"Halo {nama}!"\`  
- **Async/Await:** untuk concurrency & IO async  
- **Type Hints:** \`def tambah(a: int, b: int) -> int:\`  
- **Pattern Matching:** (Python 3.10+)  
- **Walrus Operator (:=):** assignment di dalam ekspresi  

---

## ✅ Kelebihan Python
- Mudah dipelajari & fleksibel  
- Komunitas global yang aktif  
- Banyak library & framework  
- Cocok untuk AI, data, dan prototyping  

## ⚠️ Kelemahan Python
- Eksekusi lebih lambat dari C/C++  
- Tidak ideal untuk mobile native  
- Memakan memori lebih banyak  

---

## 🎯 Outcome Modul
- Memahami filosofi dan karakteristik Python  
- Mengenal sejarah dan evolusi versi 2 → 3  
- Mengetahui area penerapan Python di industri  
- Dapat menulis script Python dasar  
- Mengenal fitur modern Python versi terbaru  
`,
  level: 'beginner',
  order: 1,
  created_at: '2025-01-01T00:00:00Z'
}
  ,
  {
    id: 'py-02',
    user_type: 'student',
    language: 'python',
    title: 'Lingkungan Kerja, Sintaks Dasar & Standar Kode',
    description: 'venv/pip, struktur proyek, PEP 8, typing, f-strings, kontrol alur.',
    content: `# Lingkungan & Dasar Python

## Setup Lingkungan
\`\`\`bash
python -m venv .venv
source .venv/bin/activate  # Windows: .venv\\Scripts\\activate
pip install --upgrade pip
\`\`\`

## Struktur Proyek Minimal (pyproject)
\`\`\`toml
# pyproject.toml
[project]
name = "hello_app"
version = "0.1.0"
dependencies = []
\`\`\`

## Dasar Sintaks
\`\`\`python
from __future__ import annotations

name: str = "Miku"
age: int = 20
print(f"Halo {name}, umur {age}")
\`\`\`

## Kontrol Alur
\`\`\`python
score = 87
grade = ("A" if score >= 85 else "B")
for i in range(3):
    print(i)
\`\`\`

## PEP 8, Lint & Format
- PEP 8 (nama fungsi snake_case, 4 spasi, max line ~ 88/100)
- Tools: **ruff** (lint), **black** (formatter), **mypy** (typing)

\`\`\`bash
pip install ruff black mypy
ruff check .
black .
mypy .
\`\`\`

## Outcome Modul
- Bisa membuat venv, pakai pip, dan pyproject.
- Menulis kode sesuai **PEP 8** dan **typing hints**.
`,
    level: 'beginner',
    order: 2,
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: 'py-03',
    user_type: 'student',
    language: 'python',
    title: 'Struktur Data, Algoritma, dan Kompleksitas',
    description: 'List, tuple, dict, set; comprehension; big-O; tips performa.',
    content: `# Struktur Data & Algoritma

## Koleksi Built-in
\`\`\`python
nums = [1, 2, 3]          # list (mutable)
pair = (10, "x")          # tuple (immutable)
info = {"name": "Zaki"}   # dict (key-value)
uniq = {1, 2, 2, 3}       # set (unik)
\`\`\`

## Comprehension & Generator
\`\`\`python
squares = [x*x for x in range(10) if x%2==0]
gen = (x*x for x in range(1_000_000))  # lazy
\`\`\`

## Kompleksitas (Ringkas)
| Operasi | List | Dict/Set |
|:--|:--:|:--:|
| akses by index | O(1) | — |
| append | amortized O(1) | — |
| mencari key | — | avg O(1) |
| in (membership) | O(n) | avg O(1) |

## Tips Performa
- Pakai **dict/set** untuk membership test.
- Pertimbangkan **array**/**numpy** untuk numerik besar.

## Outcome Modul
- Memilih struktur data tepat dengan pertimbangan **big-O**.
`,
    level: 'intermediate',
    order: 3,
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: 'py-04',
    user_type: 'student',
    language: 'python',
    title: 'Fungsi Lanjut: Closures, Decorators, Iterators & Generators',
    description: 'FP idioms modern, iterables/iterators, context manager.',
    content: `# Fungsi Lanjut & FP Idioms

## Closures & Decorators
\`\`\`python
from time import perf_counter
from functools import wraps

def timeit(fn):
    @wraps(fn)
    def wrapper(*a, **kw):
        t0 = perf_counter()
        try:
            return fn(*a, **kw)
        finally:
            print(f"{fn.__name__}: {perf_counter()-t0:.6f}s")
    return wrapper

@timeit
def work(n: int) -> int:
    return sum(range(n))

work(10_000_000)
\`\`\`

## Iterators & Generators
\`\`\`python
class Counter:
    def __init__(self, n:int): self.n=n
    def __iter__(self): return self
    def __next__(self):
        if self.n<=0: raise StopIteration
        self.n-=1
        return self.n

def stream_chunks(path:str, size:int=8192):
    with open(path, "rb") as f:
        while True:
            b = f.read(size)
            if not b: break
            yield b
\`\`\`

## Context Manager
\`\`\`python
from contextlib import contextmanager

@contextmanager
def db_session(conn):
    try:
        yield conn.cursor()
        conn.commit()
    except:
        conn.rollback()
        raise
\`\`\`

## Outcome Modul
- Menulis decorator idiomatis, memahami **iterator protocol**, dan **context manager**.
`,
    level: 'intermediate',
    order: 4,
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: 'py-05',
    user_type: 'student',
    language: 'python',
    title: 'OOP Modern, Dataclass & Design Patterns',
    description: 'Class, inheritance/comp, dataclass, SOLID, patterns praktis.',
    content: `# OOP Modern & Patterns

## Dataclass & Properties
\`\`\`python
from dataclasses import dataclass

@dataclass(slots=True)
class User:
    id: int
    name: str
\`\`\`

## SOLID (Ringkas)
| Prinsip | Inti |
|:--|:--|
| S | Satu alasan perubahan |
| O | Open for extension, closed for modification |
| L | Subkelas tidak mengubah kontrak |
| I | Interface khusus, kecil |
| D | Bergantung pada abstraksi |

## Patterns Umum
- **Factory**, **Adapter**, **Strategy**, **Repository**, **Dependency Injection** (via constructor)

\`\`\`python
from typing import Protocol

class Payment(Protocol):
    def pay(self, amount:int) -> None: ...

class Gopay:
    def pay(self, amount:int)->None:
        print("Gopay:", amount)

class Dana:
    def pay(self, amount:int)->None:
        print("Dana:", amount)

def checkout(p: Payment, amount:int):
    p.pay(amount)

checkout(Gopay(), 10000)
\`\`\`

## Outcome Modul
- Mendesain class **SOLID** dan menerapkan **pattern** dengan typing yang kuat.
`,
    level: 'advanced',
    order: 5,
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: 'py-06',
    user_type: 'student',
    language: 'python',
    title: 'I/O, Errors, Logging, Testing & Packaging',
    description: 'File I/O, exception, logging, pytest, coverage, packaging.',
    content: `# I/O, Errors, Logging, Testing, Packaging

## Exception & Logging
\`\`\`python
import logging
logging.basicConfig(level=logging.INFO)

try:
    1/0
except ZeroDivisionError as e:
    logging.error("error: %s", e)
\`\`\`

## Test & Coverage
\`\`\`bash
pip install pytest pytest-cov
pytest -q
pytest --cov=src
\`\`\`

## Paket & Distribusi (pyproject)
\`\`\`toml
[project]
name = "certlib"
version = "0.1.0"
dependencies = ["requests"]
[tool.setuptools.packages.find]
where = ["src"]
\`\`\`

Struktur:
\`\`\`
src/
  certlib/
    __init__.py
    core.py
tests/
  test_core.py
\`\`\`

## Outcome Modul
- Menulis **unit test**, mengatur **logging**, dan membuat paket terdistribusi.
`,
    level: 'advanced',
    order: 6,
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: 'py-07',
    user_type: 'student',
    language: 'python',
    title: 'Konkuren & Performa: asyncio vs threading vs multiprocessing',
    description: 'Event loop, task, await; GIL; profiling & optimisasi.',
    content: `# Concurrency & Performance

## Asyncio Dasar
\`\`\`python
import asyncio

async def fetch(n:int):
    await asyncio.sleep(0.1)
    return n

async def main():
    res = await asyncio.gather(*(fetch(i) for i in range(5)))
    print(res)

asyncio.run(main())
\`\`\`

## Threading vs Multiprocessing
- **Threading**: I/O-bound (terhambat **GIL** untuk CPU-bound)
- **Multiprocessing**: CPU-bound, biaya IPC lebih besar

## Profiling & Optimasi
\`\`\`bash
python -m cProfile -o prof.out app.py
snakeviz prof.out
\`\`\`

Tips: gunakan **vectorization** (NumPy), **caching**, dan **pydantic** v2 untuk validasi cepat.

## Outcome Modul
- Memilih model konkuren yang tepat dan melakukan **profiling** performa.
`,
    level: 'advanced',
    order: 7,
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: 'py-08',
    user_type: 'student',
    language: 'python',
    title: 'Data/ML, Web API (FastAPI), Security, CI/CD & Final Assessment',
    description: 'Pandas ringkas, FastAPI, keamanan input, CI lint+test, rubrik sertifikasi.',
    content: `# Stack Industri & Sertifikasi

## Pandas (Ringkas)
\`\`\`python
import pandas as pd
df = pd.DataFrame({"x":[1,2,3], "y":[2,4,6]})
print(df.describe())
\`\`\`

## FastAPI Mini-API
\`\`\`python
from fastapi import FastAPI
app = FastAPI()

@app.get("/health")
def health():
    return {"ok": True}
\`\`\`

## Security & Best Practices
- Validasi input (pydantic), hindari eval/exec
- Prinsip **Least Privilege**, simpan secrets via env
- Logging sanitization (PII)

## CI/CD (contoh)
\`\`\`yaml
# .github/workflows/ci.yml
name: ci
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-python@v5
        with: { python-version: '3.12' }
      - run: pip install -U pip && pip install -r requirements.txt
      - run: ruff check .
      - run: black --check .
      - run: pytest --maxfail=1 --disable-warnings -q
\`\`\`

## Final Project (Wajib)
- Bangun REST API FastAPI (CRUD + auth sederhana)
- Unit test (≥ 80% coverage), lint & format lulus
- Dokumentasi (README + ERD/diagram arsitektur)

## Rubrik Sertifikasi
| Aspek | Bobot | Kriteria Lulus |
|:--|:--:|:--|
| Kode & Arsitektur | 35% | Modular, SOLID, typed |
| Test & Kualitas | 25% | Coverage ≥ 80%, ruff/black/mypy pass |
| Security & Env | 20% | Env & secret benar, input tervalidasi |
| Dokumentasi | 20% | README, API spec, diagram jelas |

## Outcome Modul
- Siap ujian internal, **portfolio-grade** project, dan praktik industri nyata.
`,
    level: 'advanced',
    order: 8,
    created_at: '2025-01-01T00:00:00Z'
  },
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
"5" + 1 // "6"? salah -> "51" (string concat)
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
  }
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
  }
];
