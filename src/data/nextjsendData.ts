import { LearningMaterial } from '../types/learning';

export const MOCK_MATERIALS: LearningMaterial[] = [
  {
    id: 'next-be-01',
    user_type: 'student',
    language: 'nextjsend',
    title: 'Arsitektur Backend Next.js (App Router)',
    description: 'Memahami Route Handlers vs Server Actions. Kapan bikin API, kapan langsung tembak database.',
    content: `# ⚙️ Modul 1: Next.js Backend Architecture

Dulu, kalau mau bikin Fullstack, kita harus bikin 2 *repository* terpisah (misal: React untuk Frontend, Express.js untuk Backend). Di Next.js, semuanya menyatu dalam 1 *project*!

Di Next.js App Router (versi 13+), ada 2 cara utama membangun Backend:

## 1. Route Handlers (Gaya REST API Tradisional)
Digunakan jika kamu ingin membuat API publik (bisa diakses oleh aplikasi Mobile, IoT, atau *client* lain).
File-nya wajib bernama \`route.ts\` dan ditempatkan di dalam folder \`app/api/...\`.

\`\`\`typescript
// file: src/app/api/hello/route.ts
import { NextResponse } from 'next/server';

// Menangani HTTP GET Request
export async function GET() {
  return NextResponse.json({ message: "Halo dari Next.js Backend!" });
}
\`\`\`

## 2. Server Actions (Cara Modern & Gaib!)
Digunakan jika Backend ini HANYA untuk melayani web Next.js itu sendiri. Kamu **tidak perlu membuat API endpoint**. Cukup buat fungsi biasa dengan tulisan \`"use server"\`, lalu panggil fungsi itu langsung dari tombol HTML/React di Frontend!

\`\`\`typescript
// file: src/actions/userActions.ts
"use server"; // Wajib di baris pertama!

export async function updateUser(formData: FormData) {
  const name = formData.get('name');
  // Logic simpan ke database langsung di sini!
  console.log("Menyimpan user:", name);
}
\`\`\`

## 📝 Quiz Singkat
1. Apa nama file yang WAJIB digunakan jika kita ingin membuat endpoint REST API di folder \`app\`?
2. Kapan waktu yang tepat menggunakan *Route Handlers* dibandingkan *Server Actions*?
`,
    level: 'beginner',
    order: 1,
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: 'next-be-02',
    user_type: 'student',
    language: 'nextjsend',
    title: 'Database Setup dengan Prisma ORM',
    description: 'Menghubungkan Next.js ke PostgreSQL/MySQL menggunakan Prisma, ORM paling populer di ekosistem TS.',
    content: `# 🗄️ Modul 2: Prisma ORM & Database Setup

Di ekosistem TypeScript/Next.js, kita jarang menulis *query SQL* mentah. Kita menggunakan **Prisma ORM**. Prisma akan membaca kerangka database kita dan memberikan *auto-complete* (IntelliSense) luar biasa saat kita ngoding.

## 1. Instalasi Prisma
Buka terminal di *project* Next.js kamu:
\`\`\`bash
npm install prisma --save-dev
npx prisma init
\`\`\`

Ini akan membuat folder \`prisma\` dan file \`.env\`.

## 2. Konfigurasi Database (PostgreSQL / MySQL)
Buka file \`.env\` dan masukkan URL database-mu.

\`\`\`env
# Contoh PostgreSQL (Supabase/Neon)
DATABASE_URL="postgresql://johndoe:randompassword@localhost:5432/mydb?schema=public"

# Jika pakai MySQL, ganti URL-nya:
# DATABASE_URL="mysql://johndoe:randompassword@localhost:3306/mydb"
\`\`\`

Lalu, buka file \`prisma/schema.prisma\`:

\`\`\`prisma
generator client {
  provider = "prisma-client-js"
}

// Ganti provider jadi "mysql" jika kamu pakai MySQL
datasource db {
  provider = "postgresql" 
  url      = env("DATABASE_URL")
}

// Membuat Tabel User
model User {
  id        Int      @id @default(autoincrement())
  email     String   @unique
  name      String?
  createdAt DateTime @default(now())
}
\`\`\`

## 3. Eksekusi Migrasi
Jalankan perintah ini untuk menciptakan tabel di *database* fisikmu dan meng- *generate* Prisma Client:

\`\`\`bash
npx prisma migrate dev --name init
npm install @prisma/client
\`\`\`

## 4. Prisma Client Singleton (Best Practice Next.js)
Buat file ini agar koneksi *database* tidak jebol (Terlalu banyak koneksi) saat Next.js melakukan *Hot Reload* di *Development*.

\`\`\`typescript
// file: src/lib/prisma.ts
import { PrismaClient } from '@prisma/client';

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
\`\`\`
`,
    level: 'beginner',
    order: 2,
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: 'next-be-03',
    user_type: 'student',
    language: 'nextjsend',
    title: 'Membangun REST API (Route Handlers)',
    description: 'Membuat endpoint GET dan POST standar, menerima Body JSON, dan Query Params.',
    content: `# 🌐 Modul 3: Membangun REST API

Mari kita buat API Endpoint murni untuk membaca dan menambah *User* ke dalam Database menggunakan **Route Handlers** dan **Prisma**.

Endpoint kita adalah: \`http://localhost:3000/api/users\`

\`\`\`typescript
// file: src/app/api/users/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma'; // Import prisma dari modul sebelumnya

// === HTTP GET (Membaca Data) ===
export async function GET(request: NextRequest) {
  try {
    // Menangkap Query Parameter (misal: /api/users?limit=5)
    const searchParams = request.nextUrl.searchParams;
    const limit = searchParams.get('limit');

    const users = await prisma.user.findMany({
      take: limit ? parseInt(limit) : undefined,
      orderBy: { createdAt: 'desc' }
    });

    return NextResponse.json({ success: true, data: users }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Gagal mengambil data" }, { status: 500 });
  }
}

// === HTTP POST (Menambah Data) ===
export async function POST(request: NextRequest) {
  try {
    // Menangkap data JSON dari Body Request
    const body = await request.json();
    const { email, name } = body;

    // Validasi Manual Sederhana
    if (!email) {
      return NextResponse.json({ error: "Email wajib diisi!" }, { status: 400 });
    }

    // Insert ke Database via Prisma
    const newUser = await prisma.user.create({
      data: {
        email: email,
        name: name
      }
    });

    return NextResponse.json({ success: true, data: newUser }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Email mungkin sudah terdaftar" }, { status: 500 });
  }
}
\`\`\`

## ✍️ Latihan (20 Menit)
Buatlah folder baru \`src/app/api/products/route.ts\`. Buat fungsi \`POST\` yang menerima JSON \`{ "name": "Laptop", "price": 15000000 }\` dan menyimpannya ke *Database* (Kamu harus *update* schema prisma dan *migrate* dulu ya!).
`,
    level: 'intermediate',
    order: 3,
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: 'next-be-04',
    user_type: 'student',
    language: 'nextjsend',
    title: 'Server Actions: Backend Tanpa API Endpoint',
    description: 'Menghubungkan Form UI langsung ke Database tanpa fetch, tanpa axios, tanpa repot.',
    content: `# ⚡ Modul 4: Keajaiban Server Actions

Jika *Frontend* dan *Backend* mu ada di Next.js yang sama, lupakan *REST API*! Gunakan **Server Actions**. Ini adalah fungsi yang berjalan 100% di Server, tapi bisa dipanggil seolah-olah fungsi biasa di React!

## 1. Membuat Fungsi Server Action
\`\`\`typescript
// file: src/actions/todoActions.ts
"use server"; // Wajib ada agar fungsi ini tidak bocor ke browser!

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache'; // Fungsi sakti Next.js

// Parameter formData otomatis didapat dari tag <form> di HTML
export async function createTodo(formData: FormData) {
  // Ambil isi input yang atribut name="task"
  const task = formData.get('task') as string;

  if (!task || task.trim() === '') {
    throw new Error('Tugas tidak boleh kosong');
  }

  // Simpan ke DB
  await prisma.todo.create({
    data: { title: task }
  });

  // MAGIC: Suruh Next.js me-refresh UI halaman "/" secara instan tanpa reload browser!
  revalidatePath('/'); 
}
\`\`\`

## 2. Memanggilnya di UI (Client / Server Component)
\`\`\`tsx
// file: src/app/page.tsx
import { createTodo } from '@/actions/todoActions';
import { prisma } from '@/lib/prisma';

export default async function TodoPage() {
  // BACA DATA: Tarik langsung dari DB di dalam Server Component UI!
  const todos = await prisma.todo.findMany();

  return (
    <main className="p-8 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Daftar Tugas</h1>
      
      {/* TULIS DATA: Pasang fungsi Server Action langsung di atribut 'action' */}
      <form action={createTodo} className="flex gap-2 mb-8">
        <input 
          type="text" 
          name="task" // Wajib ada atribut name
          placeholder="Tugas baru..." 
          className="border p-2 rounded w-full"
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Tambah
        </button>
      </form>

      <ul>
        {todos.map(todo => (
          <li key={todo.id} className="p-3 bg-slate-100 mb-2 rounded">
            {todo.title}
          </li>
        ))}
      </ul>
    </main>
  );
}
\`\`\`

**Gila kan?** Gak ada \`fetch\`, gak ada \`useEffect\`, gak ada \`loading state\` manual. Kodenya ringkas banget, tapi performanya super cepat dan SEO-*friendly*!
`,
    level: 'intermediate',
    order: 4,
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: 'next-be-05',
    user_type: 'student',
    language: 'nextjsend',
    title: 'Validasi Data Lapis Baja (Zod)',
    description: 'Memastikan data dari User bersih, aman, dan sesuai tipe sebelum menyentuh Database.',
    content: `# 🛡️ Modul 5: Validasi Backend dengan Zod

Jangan pernah percaya data dari *User*. Meskipun di HTML kamu sudah pakai \`required\` atau \`type="email"\`, *Hacker* bisa membobolnya via *Postman*. 
Kita wajib memvalidasinya di level *Backend* menggunakan library **Zod**.

*Install: \`npm install zod\`*

## 1. Membuat Schema Validasi
\`\`\`typescript
// file: src/validators/userValidator.ts
import { z } from 'zod';

export const UserSchema = z.object({
  email: z.string().email({ message: "Format email salah bro!" }),
  name: z.string().min(3, { message: "Nama minimal 3 karakter." }).max(50),
  age: z.coerce.number().min(18, { message: "Harus 18 tahun ke atas." }) // coerce mengubah string input jadi angka
});
\`\`\`

## 2. Implementasi Zod di Server Action
\`\`\`typescript
// file: src/actions/registerAction.ts
"use server";

import { UserSchema } from '@/validators/userValidator';
import { prisma } from '@/lib/prisma';

export async function registerUser(formData: FormData) {
  // Ubah formData menjadi object biasa
  const rawData = {
    email: formData.get('email'),
    name: formData.get('name'),
    age: formData.get('age'),
  };

  // Validasi data pakai Zod (safeParse tidak akan membuat aplikasi crash jika gagal)
  const validatedFields = UserSchema.safeParse(rawData);

  // Jika tidak lolos validasi
  if (!validatedFields.success) {
    // Ambil pesan error dari Zod dan lempar kembali ke UI
    return {
      error: validatedFields.error.flatten().fieldErrors
    };
  }

  // Jika sukses, insert ke DB
  await prisma.user.create({
    data: validatedFields.data // data ini sudah dijamin TypeScript tipe dan isinya benar!
  });

  return { success: "Pendaftaran berhasil!" };
}
\`\`\`
`,
    level: 'intermediate',
    order: 5,
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: 'next-be-06',
    user_type: 'student',
    language: 'nextjsend',
    title: 'Advanced Prisma: Relasi & Eager Loading',
    description: 'Menangani relasi One-to-Many dan transaksi Database dengan Prisma.',
    content: `# 🔗 Modul 6: Relasi Database Prisma

Aplikasi nyata tidak hanya punya 1 tabel. Mari kita hubungkan tabel \`User\` dengan tabel \`Post\`.

## 1. Desain Skema Relasi
Buka \`schema.prisma\`:

\`\`\`prisma
model User {
  id    Int    @id @default(autoincrement())
  name  String
  // 1 User bisa punya banyak Post (Array)
  posts Post[] 
}

model Post {
  id       Int    @id @default(autoincrement())
  title    String
  
  // Foreign Key ke tabel User
  authorId Int
  author   User   @relation(fields: [authorId], references: [id])
}
\`\`\`
*Jangan lupa jalankan: \`npx prisma migrate dev\`*

## 2. Query Data Berelasi (Eager Loading)
Di MySQL murni kita pakai \`JOIN\`. Di Prisma, kita pakai \`include\`.

\`\`\`typescript
// Menarik semua User BESERTA postingannya
const usersWithPosts = await prisma.user.findMany({
  include: {
    posts: true // Ini adalah Magic JOIN dari Prisma
  }
});

// Output JSON-nya otomatis berbentuk Hierarki (Nested Object):
/*
[
  {
    id: 1, name: "Budi",
    posts: [ { id: 1, title: "Belajar NextJS" }, { id: 2, title: "Prisma Keren" } ]
  }
]
*/
\`\`\`

## 3. Database Transactions
Jika kita ingin menyimpan User baru dan langsung membuatkan Post pertamanya dalam satu tarikan napas (Jika salah satu gagal, dibatalkan semua).

\`\`\`typescript
const buatUserDanPost = async (nama: string, judulPost: string) => {
  const result = await prisma.$transaction(async (tx) => {
    // 1. Buat User
    const newUser = await tx.user.create({
      data: { name: nama }
    });

    // 2. Buat Post menggunakan ID user yang baru saja jadi
    const newPost = await tx.post.create({
      data: {
        title: judulPost,
        authorId: newUser.id
      }
    });

    return { newUser, newPost };
  });
  
  console.log("Sukses!", result);
};
\`\`\`
`,
    level: 'advanced',
    order: 6,
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: 'next-be-07',
    user_type: 'student',
    language: 'nextjsend',
    title: 'Keamanan Backend: Middleware',
    description: 'Melindungi rute API dan halaman Admin menggunakan sistem Middleware Edge Next.js.',
    content: `# 🚷 Modul 7: Middleware & Perlindungan Route

Gimana caranya melindungi halaman \`/admin\` atau *endpoint* \`/api/admin\` agar tidak bisa dibuka oleh orang yang belum login? Kita cegat mereka di "Pintu Gerbang" menggunakan **Middleware**.

Middleware di Next.js berjalan di *Edge* (sangat cepat, sebelum *request* mencapai *server* Node.js).

## 1. Membuat Middleware
Buat file \`middleware.ts\` tepat di direktori *root* (sejajar dengan folder \`src\` atau \`app\`).

\`\`\`typescript
// file: middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Simulasi mengecek token (Biasanya dari Cookie atau Header JWT)
  const authToken = request.cookies.get('token')?.value;

  // Jika user mencoba masuk ke URL yang berawalan /admin
  if (request.nextUrl.pathname.startsWith('/admin')) {
    
    // Jika tidak punya token, tendang kembali ke halaman login!
    if (!authToken) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
    
    // Jika token ada, lanjut proses
    // (Di real-world, kamu harus memverifikasi JWT-nya di sini)
  }

  // Jika url bukan /admin, biarkan lewat
  return NextResponse.next();
}

// Config ini berguna agar middleware HANYA dijalankan pada path tertentu
// untuk menghemat performa server.
export const config = {
  matcher: ['/admin/:path*'], // Jalan di /admin, /admin/users, /admin/settings, dll
};
\`\`\`

## 📝 Quiz Singkat
Mengapa *Middleware* diletakkan sejajar dengan folder \`src\` atau \`app\`, bukan di dalam folder \`api\`? (*Hint: Middleware bertugas mengontrol seluruh jenis route, bukan cuma API*).
`,
    level: 'advanced',
    order: 7,
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: 'next-be-08',
    user_type: 'student',
    language: 'nextjsend',
    title: 'Caching Data & Revalidation',
    description: 'Menguasai strategi caching agresif Next.js untuk membuat backend secepat kilat (ISR).',
    content: `# ⚡ Modul 8: Data Caching (Next.js Superpower)

Di Backend konvensional, jika ada 1000 *user* membuka *web* bersamaan, *database* akan dipanggil 1000 kali. Server bisa *down*.
Di Next.js, ada sistem **Caching**. Hasil dari *database* disimpan di memori super cepat, lalu disajikan ke ribuan *user* tanpa menyentuh *database* lagi!

## 1. Cache Default (Waktu Bebas)
\`\`\`typescript
// Fungsi ini berjalan di Server Component
async function getKatalogProduk() {
  // Dalam realitas, Prisma tidak otomatis di-cache oleh Next.js (berbeda dengan fetch).
  // Tapi kita bisa membungkusnya dengan 'unstable_cache' bawaan Next.js.
  
  // Untuk fetch API eksternal, Next.js otomatis melakukan cache!
  const res = await fetch('https://api.toko.com/katalog', {
    // Simpan data di cache, tapi UPDATE/refresh cache-nya setiap 3600 detik (1 Jam)
    next: { revalidate: 3600 } 
  });
  
  return res.json();
}
\`\`\`
Konsep ini disebut **ISR (Incremental Static Regeneration)**. *Website*-mu akan berasa statis (instan), tapi datanya tetap *update* secara berkala.

## 2. On-Demand Revalidation (Update Paksa)
Gimana kalau Admin mengubah harga produk, masa iya pembeli harus nunggu 1 jam biar harganya berubah di layar? Kita bisa paksa hapus *cache*-nya saat itu juga (On-Demand).

\`\`\`typescript
// file: src/actions/produkActions.ts
"use server";

import { revalidateTag, revalidatePath } from 'next/cache';
import { prisma } from '@/lib/prisma';

export async function updateHargaProduk(id: number, hargaBaru: number) {
  // 1. Update ke Database
  await prisma.product.update({
    where: { id },
    data: { price: hargaBaru }
  });

  // 2. HAPUS CACHE!
  // Cara A: Refresh semua data di URL '/produk'
  revalidatePath('/produk'); 

  // Cara B: Refresh spesifik fetch yang ditandai tag 'katalog'
  // revalidateTag('katalog'); 
}
\`\`\`
`,
    level: 'expert',
    order: 8,
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: 'next-be-09',
    user_type: 'student',
    language: 'nextjsend',
    title: 'Studi Kasus 1: Secure API Dashboard',
    description: 'Membangun API Endpoint rahasia dengan Proteksi Token dan Prisma Pagination.',
    content: `# 🛠️ Project 1: Secure Dashboard API

## 📜 Tujuan
Membangun *Route Handler* (REST API) berstandar industri untuk menampilkan daftar transaksi yang diamankan oleh pengecekan Authorization Header.

## 💻 Implementasi Kode

\`\`\`typescript
// file: src/app/api/transactions/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(req: NextRequest) {
  try {
    // 1. KEAMANAN: Cek Header Authorization (Biasanya format: "Bearer <token>")
    const authHeader = req.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized Access' }, { status: 401 });
    }

    const token = authHeader.split(' ')[1];
    // Simulasi verifikasi token (Di real app, gunakan JWT verify)
    if (token !== 'secret-admin-token-123') {
      return NextResponse.json({ error: 'Invalid Token' }, { status: 403 });
    }

    // 2. PAGINATION PARAMETERS
    const url = req.nextUrl;
    const page = parseInt(url.searchParams.get('page') || '1');
    const limit = parseInt(url.searchParams.get('limit') || '10');
    const skip = (page - 1) * limit;

    // 3. DATABASE QUERY
    // Menggunakan Prisma transaction agar count dan data berjalan paralel (sangat efisien!)
    const [transactions, totalData] = await prisma.$transaction([
      prisma.transaction.findMany({
        skip: skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          user: { select: { name: true, email: true } } // Eager loading khusus nama & email
        }
      }),
      prisma.transaction.count() // Hitung total seluruh baris untuk informasi Pagination
    ]);

    // 4. RESPON JSON STANDAR INDUSTRI
    return NextResponse.json({
      success: true,
      meta: {
        current_page: page,
        per_page: limit,
        total_data: totalData,
        total_pages: Math.ceil(totalData / limit)
      },
      data: transactions
    }, { status: 200 });

  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
\`\`\`
`,
    level: 'expert',
    order: 9,
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: 'next-be-10',
    user_type: 'student',
    language: 'nextjsend',
    title: 'Studi Kasus 2: Fullstack Server Action Checkout',
    description: 'Proyek Puncak: Logika Transaksi E-Commerce kompleks, Error Handling Zod, dan React useFormState.',
    content: `# 🛒 Project 2: E-Commerce Checkout Action

## 📜 Tujuan
Ujian akhir *Next.js Backend Master*. Kita akan memproses Form Checkout (Order barang), memvalidasinya dengan Zod, memotong saldo/stok menggunakan Transaksi Database ACID di Prisma, dan memberikan *feedback error* yang presisi kembali ke UI.

## 1. Skema Database & Zod Validator
\`\`\`typescript
// file: src/lib/schemas.ts
import { z } from 'zod';

export const CheckoutSchema = z.object({
  userId: z.coerce.number(),
  productId: z.coerce.number(),
  qty: z.coerce.number().min(1, "Minimal beli 1 barang"),
});
\`\`\`

## 2. Server Action Utama
\`\`\`typescript
// file: src/actions/checkoutAction.ts
"use server";

import { prisma } from '@/lib/prisma';
import { CheckoutSchema } from '@/lib/schemas';
import { revalidatePath } from 'next/cache';

// Fungsi ini mengembalikan State object (sukses/error) yang akan ditangkap oleh useFormState di React
export async function processCheckout(prevState: any, formData: FormData) {
  
  // 1. Zod Validation
  const parsed = CheckoutSchema.safeParse({
    userId: formData.get('userId'),
    productId: formData.get('productId'),
    qty: formData.get('qty'),
  });

  if (!parsed.success) {
    return { status: 'error', message: parsed.error.errors[0].message };
  }

  const { userId, productId, qty } = parsed.data;

  try {
    // 2. PRISMA ACID TRANSACTION
    // Semua query di dalam ini terjamin berhasil semua atau batal semua
    await prisma.$transaction(async (tx) => {
      
      // a. Kunci (Lock) & Cek Produk
      const product = await tx.product.findUnique({ where: { id: productId }});
      if (!product || product.stock < qty) {
        throw new Error(\`Stok tidak cukup. Sisa: \${product?.stock || 0}\`);
      }

      // b. Kurangi Stok
      await tx.product.update({
        where: { id: productId },
        data: { stock: { decrement: qty } }
      });

      // c. Catat Order
      await tx.order.create({
        data: {
          userId,
          productId,
          qty,
          totalPrice: product.price * qty,
          status: 'PAID'
        }
      });
    });

    // 3. Sukses, bersihkan cache halaman toko
    revalidatePath('/store');
    return { status: 'success', message: 'Checkout berhasil diproses!' };

  } catch (error: any) {
    // 4. Tangkap error dari dalam transaksi (seperti error stok tadi)
    return { status: 'error', message: error.message || 'Terjadi kesalahan sistem' };
  }
}
\`\`\`

## 3. Komponen Frontend (Client Component Form)
Lihat betapa rapihnya React memanggil fungsi *Backend* yang kompleks di atas menggunakan *hook* \`useActionState\` (pengganti \`useFormState\` di React 19).

\`\`\`tsx
// file: src/app/components/CheckoutForm.tsx
"use client";

import { useActionState } from 'react';
import { processCheckout } from '@/actions/checkoutAction';

export default function CheckoutForm() {
  // useActionState menjembatani fungsi Server Action dengan State UI
  // state awal berupa object null
  const [state, formAction, isPending] = useActionState(processCheckout, null);

  return (
    <form action={formAction} className="p-6 border rounded-xl bg-white shadow flex flex-col gap-4">
      <h2 className="text-xl font-bold">Beli Langsung</h2>

      {/* Input Tersembunyi (Biasanya dari auth/props URL) */}
      <input type="hidden" name="userId" value="1" />
      <input type="hidden" name="productId" value="99" />

      <div>
        <label className="block text-sm text-slate-500 mb-1">Jumlah Barang</label>
        <input 
          type="number" 
          name="qty" 
          defaultValue={1}
          className="border p-2 rounded w-full"
        />
      </div>

      {/* Tampilkan Pesan Error / Sukses dari Backend */}
      {state?.status === 'error' && <p className="text-red-500 text-sm font-medium">❌ {state.message}</p>}
      {state?.status === 'success' && <p className="text-green-500 text-sm font-medium">✅ {state.message}</p>}

      <button 
        type="submit" 
        disabled={isPending}
        className="bg-indigo-600 text-white py-2 rounded-lg font-bold disabled:bg-slate-400"
      >
        {isPending ? 'Memproses Transaksi...' : 'Bayar Sekarang'}
      </button>
    </form>
  );
}
\`\`\`

## 🏆 Kesimpulan Masterclass Backend Next.js
Gokil bro! Lo baru aja menamatkan arsitektur Backend paling modern di dunia web dev saat ini. Lupakan pusingnya setup server Express, kelola CORS, atau bikin endpoint fetch manual. 

Dengan **Next.js + Prisma + Zod + Server Actions**, lo bisa nge- *ship* fitur dengan kecepatan cahaya, tapi tetap *strict*, aman dari SQL Injection, dan kokoh untuk *Production* skala besar. Lanjut rakit aplikasi impian lo!
`,
    level: 'expert',
    order: 10,
    created_at: '2025-01-01T00:00:00Z'
  }
];