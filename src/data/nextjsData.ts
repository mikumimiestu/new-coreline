import { LearningMaterial } from '../types/learning';

export const MOCK_MATERIALS: LearningMaterial[] = [
  // ==================== NEXT.JS UI CORE MATERIALS ====================
  {
    id: 'next-01',
    user_type: 'student',
    language: 'nextjs',
    title: 'Pengenalan Next.js App Router & Setup',
    description: 'Framework React untuk Production. Setup Vite sudah usang? Mari beralih ke Next.js App Router.',
    content: `# ⚛️ Modul 1: Welcome to Next.js App Router

React itu keren, tapi untuk bikin aplikasi web skala besar (*Production*), kita butuh Framework. **Next.js** adalah rajanya Framework React saat ini.

Mulai versi 13+, Next.js merombak total sistemnya menggunakan **App Router** (folder \`app\`). Ini mengubah cara kita mendesain UI secara drastis!

## 1. Setup Project Next.js + Tailwind
Buka terminal dan jalankan perintah sakti ini (semua *tool* seperti Tailwind, ESLint, dan TypeScript otomatis di-setup oleh Next.js!):

\`\`\`bash
npx create-next-app@latest belajar-nextjs
\`\`\`

Saat ditanya, pilih konfigurasi ini bro:
- Would you like to use TypeScript? **Yes**
- Would you like to use ESLint? **Yes**
- Would you like to use Tailwind CSS? **Yes**
- Would you like to use \`src/\` directory? **Yes**
- Would you like to use App Router? **Yes** (PENTING!)

## 2. Struktur Folder UI Next.js
Setelah selesai, masuk ke folder \`src/app/\`. Kamu akan melihat 3 file ajaib ini:
1. \`layout.tsx\`: Kerangka luar UI kamu (Navbar, Footer, tag HTML/Body).
2. \`page.tsx\`: Konten UI spesifik untuk halaman tersebut.
3. \`globals.css\`: Tempat *import* Tailwind CSS.

## 3. Hello World UI
Buka \`src/app/page.tsx\`, hapus semua isinya, dan mari kita buat UI simpel pakai Tailwind:

\`\`\`tsx
export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-950">
      <div className="text-center">
        <h1 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600 mb-4">
          Next.js UI Master
        </h1>
        <p className="text-slate-400 text-lg">
          Membangun antarmuka kelas dunia, bro! 🚀
        </p>
      </div>
    </main>
  );
}
\`\`\`
Jalankan \`npm run dev\` dan buka \`localhost:3000\`.

## 📝 Quiz Singkat
1. Apa perbedaan utama React biasa (Vite) dengan Next.js dalam urusan *setup* awal?
2. File apa yang bertanggung jawab menampung struktur dasar HTML seperti \`<html>\` dan \`<body>\` di Next.js App Router?
`,
    level: 'beginner',
    order: 1,
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: 'next-02',
    user_type: 'student',
    language: 'nextjs',
    title: 'Sistem Layouting & Nested Routes',
    description: 'Memahami cara kerja file layout.tsx dan page.tsx untuk menyusun antarmuka yang berlapis.',
    content: `# 🧱 Modul 2: Layouts & Nested UI

Di React biasa (pakai React Router), bikin Layout untuk *Dashboard* yang ada *Sidebar*-nya itu ribet. Di Next.js, ini jadi semudah bikin folder!

## 1. Konsep Layouting
Di Next.js, file \`layout.tsx\` membungkus file \`page.tsx\` yang ada di folder yang sama (maupun folder di bawahnya).

Ubah file \`src/app/layout.tsx\` kamu menjadi seperti ini:

\`\`\`tsx
import './globals.css';

// Ini akan membungkus SELURUH HALAMAN di websitemu!
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body className="bg-slate-50 text-slate-900 font-sans">
        {/* Navbar Global */}
        <nav className="p-4 bg-white shadow-sm flex justify-between items-center">
          <div className="font-bold text-indigo-600 text-xl">MyNextApp</div>
          <button className="px-4 py-2 bg-slate-900 text-white rounded-lg">Login</button>
        </nav>
        
        {/* Konten Halaman (page.tsx) akan dirender di dalam children ini */}
        <main className="max-w-6xl mx-auto p-6">
          {children}
        </main>
      </body>
    </html>
  );
}
\`\`\`

## 2. Membuat Halaman Baru (Routing)
Next.js menggunakan **File-based Routing**. 
Mau bikin halaman \`/dashboard\`? Gampang!
1. Buat folder baru di dalam \`app\`: \`src/app/dashboard/\`.
2. Buat file bernama \`page.tsx\` di dalam folder tersebut.

\`\`\`tsx
// file: src/app/dashboard/page.tsx
export default function DashboardPage() {
  return (
    <div className="p-6 bg-white rounded-2xl shadow-sm border border-slate-100">
      <h1 className="text-2xl font-bold mb-2">Ini Halaman Dashboard</h1>
      <p className="text-slate-500">Perhatikan bahwa Navbar dari RootLayout masih tetap ada di atas!</p>
    </div>
  );
}
\`\`\`

Buka \`localhost:3000/dashboard\`. Boom! Routing instan tanpa *setup* *library* eksternal.

## ✍️ Latihan (15 Menit)
1. Buat folder baru bernama \`about\` di dalam folder \`app\`.
2. Buat file \`page.tsx\` di dalamnya, lalu desain UI sederhana (Judul "Tentang Kami" dan sedikit teks) pakai Tailwind.
3. Kunjungi \`localhost:3000/about\`.
`,
    level: 'beginner',
    order: 2,
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: 'next-03',
    user_type: 'student',
    language: 'nextjs',
    title: 'Paradigma Baru: Server vs Client Components',
    description: 'Rahasia performa Next.js. Kapan harus menggunakan "use client" dan kapan membiarkannya di Server.',
    content: `# 🧠 Modul 3: Server & Client Components

Ini adalah konsep **PALING PENTING** di Next.js App Router. Jika kamu tidak paham ini, UI-mu akan berantakan!

Secara default, SEMUA komponen di Next.js App Router adalah **React Server Components (RSC)**. Artinya, HTML-nya di- *render* (digambar) di komputer Server, lalu dikirim ke Browser dalam bentuk matang. Ini bikin web super cepat dan bagus buat SEO.

## 1. Masalah dengan Server Components
Server Components **TIDAK BISA** menggunakan fitur Interaktif (*Hooks*):
- ❌ \`useState\`, \`useEffect\`
- ❌ *Event Listeners* (\`onClick\`, \`onChange\`)
- ❌ *Browser API* (\`window.innerWidth\`)

## 2. Solusinya: "use client"
Kalau kamu butuh bikin Tombol yang bisa diklik atau Form yang bisa diketik, kamu harus mengubah komponen tersebut menjadi **Client Component** dengan menambahkan *directive* \`"use client"\` di baris paling atas.

\`\`\`tsx
// file: src/app/components/CounterCard.tsx
"use client"; // PENTING! Tanpa ini, useState akan error!

import { useState } from 'react';

export default function CounterCard() {
  const [count, setCount] = useState(0);

  return (
    <div className="p-6 bg-white rounded-xl shadow-md text-center max-w-sm">
      <h2 className="text-lg font-bold">Interaktif UI</h2>
      <p className="text-4xl font-black my-4 text-blue-600">{count}</p>
      
      {/* onClick hanya jalan di Client Components! */}
      <button 
        onClick={() => setCount(count + 1)}
        className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition"
      >
        Tambah Angka
      </button>
    </div>
  );
}
\`\`\`

## 3. Aturan Emas Arsitektur UI
Jangan menaruh \`"use client"\` di file \`layout.tsx\` atau \`page.tsx\` utama! 
Biarkan halaman utama menjadi *Server Component* agar cepat. Jika butuh tombol interaktif, pisahkan tombol tersebut ke file *Component* sendiri, beri \`"use client"\`, lalu import ke halaman utamanya.

## 📝 Quiz Singkat
1. Kenapa kita tidak boleh menaruh \`"use client"\` di semua komponen biar gampang aja?
2. Jika aku membuat UI Daftar Blog yang hanya menampilkan teks dari *Database*, apakah aku butuh \`"use client"\`?
`,
    level: 'intermediate',
    order: 3,
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: 'next-04',
    user_type: 'student',
    language: 'nextjs',
    title: 'Navigasi UI: Link & usePathname',
    description: 'Cara pindah halaman ala SPA dan membuat Active Navigation UI (Deteksi menu yang sedang aktif).',
    content: `# 🗺️ Modul 4: Navigasi & Active Links

Di Next.js, JANGAN PERNAH memakai tag \`<a href="...">\` biasa untuk pindah halaman internal. Itu akan membuat browser me- *refresh* seluruh halaman (lambat!).

Gunakan komponen \`<Link>\` bawaan Next.js.

## 1. Dasar Komponen Link
\`\`\`tsx
import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="flex gap-4 p-4 bg-slate-900 text-white">
      {/* Cepat, instan, pre-fetched secara otomatis di background! */}
      <Link href="/" className="hover:text-blue-400">Home</Link>
      <Link href="/dashboard" className="hover:text-blue-400">Dashboard</Link>
    </nav>
  );
}
\`\`\`

---

## 2. UI Navigasi Aktif (Active Link)
Seringkali kita butuh UI penanda, "Oh, kita lagi ada di menu Dashboard". Untuk mengetahui *URL path* saat ini, kita gunakan *hook* \`usePathname\`.

**PENTING:** Karena menggunakan *Hooks*, komponen Navbar ini wajib diberi \`"use client"\`.

\`\`\`tsx
// file: src/app/components/Sidebar.tsx
"use client"; // Wajib karena kita pakai hooks

import Link from 'next/link';
import { usePathname } from 'next/navigation'; // import dari next/navigation, bukan router!

export default function Sidebar() {
  const pathname = usePathname(); // contoh nilai: "/dashboard"

  const links = [
    { name: 'Home', href: '/' },
    { name: 'Dashboard', href: '/dashboard' },
    { name: 'Settings', href: '/settings' },
  ];

  return (
    <aside className="w-64 bg-white border-r h-screen p-4 flex flex-col gap-2">
      {links.map((link) => {
        // Cek apakah url saat ini sama dengan url link
        const isActive = pathname === link.href;

        return (
          <Link 
            key={link.name} 
            href={link.href}
            className={\`px-4 py-3 rounded-lg font-medium transition-colors \${
              isActive 
                ? 'bg-blue-50 text-blue-700' // Style jika aktif
                : 'text-slate-600 hover:bg-slate-50' // Style jika tidak aktif
            }\`}
          >
            {link.name}
          </Link>
        );
      })}
    </aside>
  );
}
\`\`\`

## ✍️ Latihan (20 Menit)
Buatlah sebuah \`TopNavbar\` menggunakan \`"use client"\` dan \`usePathname\`. Buat 3 menu: \`Home (/)\`, \`Products (/products)\`, dan \`Cart (/cart)\`. Beri efek *underline* berwarna merah pakai Tailwind pada menu yang sedang aktif dikunjungi *User*.
`,
    level: 'intermediate',
    order: 4,
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: 'next-05',
    user_type: 'student',
    language: 'nextjs',
    title: 'Optimasi UI Mutlak: Image & Font',
    description: 'Mencegah Layout Shift dan mengoptimalkan aset UI menggunakan next/image dan next/font.',
    content: `# 🖼️ Modul 5: UI Optimization (Image & Font)

Gambar dan Font besar adalah pembunuh utama performa UI (LCP - Largest Contentful Paint). Next.js memecahkan masalah ini dengan elegan.

## 1. Komponen next/image
Jangan pakai tag \`<img>\` HTML! Gunakan \`<Image>\` dari Next.js. Fitur otomatisnya:
- Otomatis konversi gambar ke format WebP (ukurannya 50% lebih kecil).
- Otomatis membuat versi kecil untuk layar HP dan versi besar untuk Layar Desktop.
- Mencegah CLS (Cumulative Layout Shift) atau loncatan UI saat gambar di-*load*.

\`\`\`tsx
import Image from 'next/image';

export default function HeroSection() {
  return (
    <div className="relative w-full h-[400px] rounded-2xl overflow-hidden">
      {/* fill: Mengisi kontainer induk (induk wajib punya class 'relative')
        object-cover: Sama seperti background-size: cover
        priority: Prioritaskan load gambar ini (karena ada di hero paling atas)
      */}
      <Image 
        src="/banner-promo.jpg" // Gambar wajib ditaruh di folder 'public'
        alt="Banner Promo"
        fill
        className="object-cover"
        priority 
      />
      
      <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
        <h1 className="text-white text-4xl font-bold">Diskon Besar!</h1>
      </div>
    </div>
  );
}
\`\`\`

---

## 2. Komponen next/font
Nggak perlu lagi ngambil font dari *Google Fonts* via URL HTML yang bikin *loading* tertahan. Next.js men-*download* font-nya saat *build time* (lokal)!

\`\`\`tsx
// file: src/app/layout.tsx
import { Inter, Space_Grotesk } from 'next/font/google';

// Inisiasi Font
const inter = Inter({ subsets: ['latin'] });
const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], variable: '--font-space' });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      {/* Terapkan class inter.className ke body agar jadi font utama */}
      <body className={\`\${inter.className} \${spaceGrotesk.variable}\`}>
        
        <h1 className="font-space">Ini akan menggunakan Font Space Grotesk karena kita udah set variablenya di tailwind.config</h1>
        <p>Ini font Inter biasa.</p>
        
        {children}
      </body>
    </html>
  );
}
\`\`\`

*(Catatan: Untuk menggunakan variabel \`font-space\` di atas, kamu harus menambahkan \`fontFamily: { space: ['var(--font-space)'] }\` di \`tailwind.config.ts\`).*
`,
    level: 'intermediate',
    order: 5,
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: 'next-06',
    user_type: 'student',
    language: 'nextjs',
    title: 'Loading UI & Error States',
    description: 'Mengendalikan pengalaman pengguna saat aplikasi sedang memuat data atau mengalami kegagalan (Skeleton & Fallbacks).',
    content: `# ⏳ Modul 6: Loading & Error UI

Saat UI sedang menunggu data dari *database/API*, kita tidak boleh membiarkan layar kosong putih (*White Screen of Death*). 

Di Next.js App Router, file penanganan UI ini **sudah diatur oleh sistem berdasarkan nama file-nya**.

## 1. UI Loading Otomatis (loading.tsx)
Cukup buat file bernama \`loading.tsx\` di folder mana saja. Saat \`page.tsx\` di folder tersebut sedang mengambil data *Async*, Next.js otomatis menampilkan UI \`loading.tsx\`!

\`\`\`tsx
// file: src/app/dashboard/loading.tsx
export default function DashboardLoading() {
  return (
    <div className="p-6">
      {/* Memanfaatkan Tailwind Pulse untuk Efek Skeleton */}
      <div className="animate-pulse space-y-6">
        {/* Skeleton Judul */}
        <div className="h-8 bg-slate-200 rounded w-1/4"></div>
        
        {/* Skeleton 3 Kartu */}
        <div className="grid grid-cols-3 gap-6">
          <div className="h-32 bg-slate-200 rounded-xl"></div>
          <div className="h-32 bg-slate-200 rounded-xl"></div>
          <div className="h-32 bg-slate-200 rounded-xl"></div>
        </div>
      </div>
    </div>
  );
}
\`\`\`

---

## 2. UI Error (error.tsx)
Gimana kalau *server error* atau data gagal diambil? Aplikasi nggak boleh *crash*. Buat file \`error.tsx\`.
**PENTING:** Komponen Error **WAJIB** menjadi Client Component (\`"use client"\`) agar fitur *recover* (tombol coba lagi) berfungsi.

\`\`\`tsx
// file: src/app/dashboard/error.tsx
"use client"; 

import { useEffect } from 'react';

// Next.js otomatis melempar prop 'error' dan fungsi 'reset'
export default function ErrorBoundary({ error, reset }: { error: Error, reset: () => void }) {
  useEffect(() => {
    // Bisa dikirim ke layanan log error seperti Sentry
    console.error("Terjadi error di UI:", error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center h-64 bg-red-50 rounded-2xl border border-red-100">
      <h2 className="text-xl font-bold text-red-600 mb-2">Waduh! Ada yang salah nih bro.</h2>
      <p className="text-red-400 mb-6">{error.message}</p>
      <button
        onClick={() => reset()} // Coba render ulang halaman!
        className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
      >
        Coba Lagi
      </button>
    </div>
  );
}
\`\`\`

## 3. UI Not Found (not-found.tsx)
Ditampilkan khusus jika *user* masuk ke URL yang *ngaco*, atau jika kamu memanggil fungsi \`notFound()\` di dalam kodemu.

\`\`\`tsx
// file: src/app/not-found.tsx
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="text-center mt-20">
      <h1 className="text-6xl font-black text-slate-800">404</h1>
      <p className="text-slate-500 mt-2 mb-6">Halaman ilang disedot alien 👽</p>
      <Link href="/" className="bg-slate-900 text-white px-6 py-3 rounded-lg">Balik ke Home</Link>
    </div>
  );
}
\`\`\`
`,
    level: 'intermediate',
    order: 6,
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: 'next-07',
    user_type: 'student',
    language: 'nextjs',
    title: 'Advanced Tailwind: clsx & tailwind-merge',
    description: 'Senjata rahasia Engineer untuk membuat Design System Komponen yang fleksibel dan bersih dari bentrok CSS.',
    content: `# 🎨 Modul 7: Pro Styling (clsx & twMerge)

Membangun komponen UI yang *reusable* (Bisa dipakai berulang kali) di Next.js butuh trik khusus untuk memanipulasi *class string* Tailwind.

Di industri (*shadcn/ui*, UI libraries modern), kita menggunakan kombinasi paket \`clsx\` dan \`tailwind-merge\`.

## 1. Kenapa Butuh tailwind-merge?
Misal kamu punya komponen tombol default: \`<button className="bg-blue-500 p-4">\`.
Lalu kamu mau memakai tombol itu tapi mengubah warnanya: \`<Button className="bg-red-500" />\`.
Jika class digabung string biasa jadi: \`bg-blue-500 bg-red-500 p-4\`. **Tailwind akan bentrok!** \`tailwind-merge\` akan otomatis menghapus warna biru dan memenangkan warna merah.

## 2. Setup Utility (cn)
*Install* dulu paketnya: \`npm install clsx tailwind-merge\`

Buat satu file *utility* untuk proyekmu:

\`\`\`typescript
// file: src/lib/utils.ts
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// Fungsi 'cn' (classNames) ini adalah standar industri!
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
\`\`\`

## 3. Implementasi Pembuatan Design System
Mari buat komponen Tombol (Button) yang sangat dinamis, aman dari bentrok, dan kondisional.

\`\`\`tsx
// file: src/components/ui/Button.tsx
import { cn } from "@/lib/utils"; // import fungsi yang baru dibuat

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

export function Button({ 
  className, 
  variant = 'primary', 
  size = 'md', 
  ...props 
}: ButtonProps) {
  
  return (
    <button
      className={cn(
        // 1. Base styles (selalu ada)
        "inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2",
        
        // 2. Variants (Kondisional)
        {
          "bg-slate-900 text-white hover:bg-slate-800": variant === 'primary',
          "bg-red-500 text-white hover:bg-red-600": variant === 'danger',
          "hover:bg-slate-100 text-slate-900": variant === 'ghost',
        },

        // 3. Size
        {
          "h-8 px-3 text-sm": size === 'sm',
          "h-10 px-4 py-2": size === 'md',
          "h-12 px-8 text-lg": size === 'lg',
        },
        
        // 4. Custom class dari luar (Bisa menimpa style di atas pakai tailwind-merge!)
        className
      )}
      {...props}
    />
  );
}
\`\`\`

## 4. Cara Penggunaan di Halaman
\`\`\`tsx
// file: src/app/page.tsx
import { Button } from "@/components/ui/Button";

export default function Page() {
  return (
    <div className="flex gap-4">
      {/* Tombol standar */}
      <Button>Simpan</Button> 
      
      {/* Tombol Merah Kecil */}
      <Button variant="danger" size="sm">Hapus</Button> 
      
      {/* MAGIC: Tombol primary tapi kita paksa roundednya jadi bulat penuh via class luar! */}
      <Button className="rounded-full bg-emerald-500">Upgrade Pro</Button> 
    </div>
  )
}
\`\`\`
`,
    level: 'advanced',
    order: 7,
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: 'next-08',
    user_type: 'student',
    language: 'nextjs',
    title: 'Studi Kasus 1: Modern Landing Page',
    description: 'Merakit komponen Server dan Client untuk halaman depan website yang super kilat dan animatif.',
    content: `# 🚀 Project 1: Modern UI Landing Page

## 📜 Tujuan
Menggabungkan kekuatan **Server Components** (agar SEO kuat & *loading* awal cepat) dan **Client Components** (untuk animasi dan interaksi) di Next.js.

## 💻 Implementasi Arsitektur
Kita akan membuat Halaman Beranda (Hero Section + Features).

### 1. Komponen Client (Interaktif / Animasi)
Kita buat sebuah efek *Reveal* untuk memunculkan teks/gambar saat di-*scroll* atau diload.

\`\`\`tsx
// file: src/components/FadeIn.tsx
"use client"; 

import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils'; // Anggap kita pakai fungsi 'cn' dari modul sebelumnya

export function FadeIn({ children, delay = 0 }: { children: React.ReactNode, delay?: number }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div className={cn(
      "transition-all duration-1000 ease-out",
      isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
    )}>
      {children}
    </div>
  );
}
\`\`\`

### 2. Halaman Utama (Server Component)
File ini tetap dirender di server. Komponen \`<FadeIn>\` akan diselipkan ke dalamnya sebagai "Pulau Interaktivitas".

\`\`\`tsx
// file: src/app/page.tsx
import { FadeIn } from "@/components/FadeIn";
import Image from "next/image";
import Link from "next/link";

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      
      {/* NAVBAR (Statis) */}
      <nav className="p-6 flex justify-between items-center max-w-7xl mx-auto">
        <div className="font-black text-2xl text-slate-900 tracking-tighter">UI.NXT</div>
        <Link href="/login" className="font-semibold text-slate-600 hover:text-slate-900">Sign In</Link>
      </nav>

      {/* HERO SECTION */}
      <section className="max-w-7xl mx-auto px-6 pt-20 pb-32 text-center flex flex-col items-center">
        
        {/* Kita bungkus konten dengan Client Component animasi kita! */}
        <FadeIn delay={100}>
          <div className="inline-block py-1 px-3 rounded-full bg-blue-100 text-blue-700 font-medium text-sm mb-6 border border-blue-200">
            ✨ Next.js 14 App Router Ready
          </div>
        </FadeIn>

        <FadeIn delay={300}>
          <h1 className="text-6xl md:text-8xl font-bold tracking-tight text-slate-900 mb-6 leading-tight">
            Build Fast.<br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
              Ship Faster.
            </span>
          </h1>
        </FadeIn>

        <FadeIn delay={500}>
          <p className="text-xl text-slate-500 max-w-2xl mb-10">
            Kerangka dasar UI yang memadukan kecepatan Server Components dan keindahan interaksi Client. Tanpa pusing, tanpa lag.
          </p>
          
          <div className="flex gap-4">
            <button className="px-8 py-4 bg-slate-900 text-white rounded-full font-bold text-lg hover:bg-slate-800 transition shadow-xl shadow-slate-900/20">
              Get Started
            </button>
            <button className="px-8 py-4 bg-white text-slate-900 border border-slate-200 rounded-full font-bold text-lg hover:bg-slate-50 transition">
              View Components
            </button>
          </div>
        </FadeIn>

      </section>

      {/* GAMBAR HERO */}
      <section className="max-w-6xl mx-auto px-6 pb-20">
        <FadeIn delay={800}>
          <div className="w-full h-[500px] relative bg-slate-200 rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
            {/* Pakai next/image untuk performa dewa */}
            <Image 
              src="/dashboard-mockup.png" 
              alt="Dashboard Preview" 
              fill
              className="object-cover"
              priority
            />
          </div>
        </FadeIn>
      </section>

    </main>
  );
}
\`\`\`

## 🏆 Kesimpulan Uji Coba
Dengan memisahkan file \`FadeIn\` (Client) dari \`page.tsx\` (Server), SEO website kamu tetap aman karena struktur HTML utama digambar di server, sementara Browser hanya perlu menjalankan JS sedikit saja untuk menganimasikan kelas Tailwind.
`,
    level: 'expert',
    order: 8,
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: 'next-09',
    user_type: 'student',
    language: 'nextjs',
    title: 'Studi Kasus 2: Dynamic Dashboard Layout',
    description: 'Praktek langsung pembuatan nested routing, Active Sidebar, dan Grid Layout khusus area Admin Dashboard.',
    content: `# 📊 Project 2: Admin Dashboard UI

## 📜 Tujuan
Aplikasi SAAS (Software As A Service) pasti punya Dashboard. Kita akan membangun arsitektur UI *Dashboard* berlapis menggunakan fitur Nested Layouts Next.js.

## 1. Struktur Folder File
\`\`\`text
src/app/
 ├── layout.tsx         (Root Layout - Landing Page dkk)
 ├── (dashboard)/       (Folder Path Group - Tidak masuk ke URL!)
 │    ├── layout.tsx    (DASHBOARD LAYOUT - Hanya untuk halaman dashboard)
 │    ├── dashboard/
 │    │    └── page.tsx (/dashboard - Konten utama)
 │    └── settings/
 │         └── page.tsx (/settings - Halaman pengaturan)
\`\`\`
*(Catatan: Menaruh nama folder dalam tanda kurung \`(dashboard)\` adalah fitur Route Groups Next.js untuk merapikan file tanpa merusak URL).*

## 2. Implementasi Dashboard Layout
File ini akan membungkus Sidebar dan Area Konten.

\`\`\`tsx
// file: src/app/(dashboard)/layout.tsx
import Link from 'next/link';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen bg-slate-100 font-sans">
      
      {/* SIDEBAR (Statis) */}
      <aside className="w-64 bg-slate-900 text-white flex flex-col">
        <div className="h-16 flex items-center justify-center border-b border-slate-800 font-bold text-xl tracking-wider">
          ADMIN.IO
        </div>
        
        <nav className="flex-1 p-4 flex flex-col gap-2">
          {/* Untuk produksi nyata, extract bagian ini jadi Client Component dengan usePathname untuk status 'Active' */}
          <Link href="/dashboard" className="p-3 bg-indigo-600 rounded-lg text-sm font-medium">
            📊 Overview
          </Link>
          <Link href="/settings" className="p-3 text-slate-400 hover:bg-slate-800 hover:text-white rounded-lg text-sm font-medium transition">
            ⚙️ Settings
          </Link>
        </nav>

        {/* Profil User di Bawah Sidebar */}
        <div className="p-4 border-t border-slate-800 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-slate-700"></div>
          <div>
            <p className="text-sm font-bold">Bro Developer</p>
            <p className="text-xs text-slate-400">Pro Plan</p>
          </div>
        </div>
      </aside>

      {/* KONTEN UTAMA (Kanan) */}
      <div className="flex-1 flex flex-col overflow-hidden">
        
        {/* HEADER TOP */}
        <header className="h-16 bg-white shadow-sm flex items-center justify-between px-8">
          <h2 className="font-semibold text-slate-800">Welcome back!</h2>
          <button className="px-4 py-2 bg-slate-100 text-slate-600 rounded-md text-sm font-medium">Log out</button>
        </header>

        {/* KONTEN DINAMIS (Dari page.tsx) */}
        <main className="flex-1 overflow-y-auto p-8">
          {children} 
        </main>

      </div>
    </div>
  );
}
\`\`\`

## 3. Implementasi Konten Dashboard
\`\`\`tsx
// file: src/app/(dashboard)/dashboard/page.tsx

export default function DashboardOverview() {
  return (
    <div className="space-y-6">
      
      {/* BREADCRUMBS & TITLE */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Overview</h1>
        <p className="text-slate-500 text-sm">Lihat metrik penjualan kamu minggu ini.</p>
      </div>

      {/* STATS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Card 1 */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <p className="text-sm text-slate-500 font-medium mb-1">Total Pendapatan</p>
          <h3 className="text-3xl font-black text-slate-800">Rp 45.2M</h3>
          <p className="text-sm text-emerald-600 font-medium mt-2">↑ +12.5% dari bulan lalu</p>
        </div>

        {/* Card 2 */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <p className="text-sm text-slate-500 font-medium mb-1">User Baru</p>
          <h3 className="text-3xl font-black text-slate-800">2,451</h3>
          <p className="text-sm text-emerald-600 font-medium mt-2">↑ +4.1% dari bulan lalu</p>
        </div>

        {/* Card 3 */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <p className="text-sm text-slate-500 font-medium mb-1">Tingkat Bouncing</p>
          <h3 className="text-3xl font-black text-slate-800">42%</h3>
          <p className="text-sm text-red-500 font-medium mt-2">↓ -2% dari bulan lalu</p>
        </div>

      </div>

      {/* EMPTY STATE AREA */}
      <div className="h-96 border-2 border-dashed border-slate-300 rounded-2xl flex flex-col items-center justify-center text-center">
        <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center text-2xl mb-4">📈</div>
        <h3 className="font-bold text-slate-700">Belum Ada Chart</h3>
        <p className="text-slate-500 text-sm max-w-sm mt-1">Sambungkan ke API backend untuk mulai memvisualisasikan data grafik di area ini.</p>
      </div>

    </div>
  );
}
\`\`\`

## 🏆 Akhir dari Next.js UI Masterclass
Mantap bro! Dengan menguasai struktur UI ini, lo udah punya bekal arsitektur standar industri skala perusahaan. *Routing*, *Layouting*, *Styling dinamis*, dan pemisahan logika *Server/Client* udah ada di tangan lo. Lanjut bangun *portfolio* keren lo! 🚀
`,
    level: 'expert',
    order: 9,
    created_at: '2025-01-01T00:00:00Z'
  }
];