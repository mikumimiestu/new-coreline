# 📚 NewCoreline — Platform Belajar Coding & Tech Skills

> **Coreline by AstByte** adalah platform edukasi digital interaktif untuk mempelajari berbagai keterampilan teknologi, mulai dari pemrograman dasar hingga keterampilan non-coding profesional.

---

## 🖥️ Tech Stack

| Kategori          | Teknologi                                                      |
| ----------------- | -------------------------------------------------------------- |
| **Framework**     | React 18 + TypeScript                                          |
| **Build Tool**    | Vite 5                                                         |
| **Styling**       | Tailwind CSS 3                                                 |
| **Routing**       | React Router DOM v7                                            |
| **Icons**         | Lucide React                                                   |
| **AI Chatbot**    | Google Generative AI (Gemini Flash Lite)                       |
| **Auth & API**    | AstByte AuthX REST API (`https://authx.astbyte.com`)           |
| **Sertifikat**    | jsPDF + html2canvas                                            |
| **reCAPTCHA**     | react-google-recaptcha                                         |
| **Markdown**      | react-markdown + remark-gfm                                    |
| **Maps**          | Leaflet + react-leaflet                                        |
| **Enkripsi**      | crypto-js                                                      |
| **Database**      | Supabase (via `@supabase/supabase-js`)                         |
| **Backend**       | Python Flask (untuk fitur tambahan)                            |
| **Deployment**    | Vercel                                                         |

---

## 📁 Struktur Proyek

```
new-coreline/
├── backend/                    # Backend Flask (Python)
│   ├── app.py                  # Server Flask untuk fitur tambahan
│   └── data.sql                # Skema database SQL
│
├── public/                     # Asset statis (logo, ikon, gambar)
│
├── src/                        # Source code utama (Frontend React)
│   ├── App.tsx                 # Root component & routing utama
│   ├── main.tsx                # Entry point aplikasi
│   ├── index.css               # Global CSS (Tailwind directives)
│   │
│   ├── components/             # Komponen UI utama
│   │   ├── LoginPage.tsx       # Halaman Landing Page & Login
│   │   ├── Dashboard.tsx       # Dashboard utama (Katalog Kursus, Progress)
│   │   ├── ProfilePage.tsx     # Halaman Profil Pengguna
│   │   ├── CoreBot.tsx         # Asisten AI Chatbot (Gemini)
│   │   ├── MaterialContent.tsx # Renderer konten materi pembelajaran
│   │   ├── Pay.tsx             # Halaman pembayaran & top-up saldo
│   │   ├── Pricing.tsx         # Halaman paket langganan (Free/Pro/Plus/Ultra)
│   │   ├── Promo.tsx           # Halaman promo & diskon
│   │   ├── ComingSoon.tsx      # Placeholder halaman "Segera Hadir"
│   │   └── AdLoadingPage.tsx   # Halaman loading dengan iklan
│   │
│   ├── pages/                  # Halaman-halaman fitur
│   │   ├── MaterialPage.tsx    # Halaman navigasi & daftar materi
│   │   ├── QuizPage.tsx        # Halaman kuis interaktif
│   │   ├── ExercisePage.tsx    # Halaman latihan coding
│   │   ├── TutorialPage.tsx    # Halaman tutorial Git & alat dev
│   │   ├── OfflineMentoringPage.tsx  # Halaman mentoring offline (Ultimate)
│   │   └── PriorityMemberPage.tsx    # Halaman fitur member prioritas
│   │
│   ├── data/                   # Data kurikulum & materi pembelajaran
│   │   ├── pythonData.ts       # Materi Python (Dasar - Intermediate, 30 modul)
│   │   ├── pythonDataAnalysis.ts # Materi Python Data Analysis (20 modul)
│   │   ├── jsData.ts           # Materi JavaScript (15 modul)
│   │   ├── tsData.ts           # Materi TypeScript (15 modul)
│   │   ├── golangData.ts       # Materi Go/Golang (15 modul)
│   │   ├── mysqlData.ts        # Materi MySQL (15 modul)
│   │   ├── posgresData.ts      # Materi PostgreSQL (15 modul)
│   │   ├── rubyData.ts         # Materi Ruby (15 modul)
│   │   ├── reactjsData.ts      # Materi React.js (15 modul)
│   │   ├── nextjsData.ts       # Materi Next.js Dasar (15 modul)
│   │   ├── nextjsendData.ts    # Materi Next.js Lanjutan
│   │   ├── englishTechData.ts  # Materi English for Tech (15 modul)
│   │   ├── japaneseData.ts     # Materi Japanese N5-N4 for IT (15 modul)
│   │   ├── uiuxData.ts         # Materi UI/UX Design (15 modul)
│   │   ├── agileScrumData.ts   # Materi Agile & Scrum (15 modul)
│   │   ├── productManagementData.ts # Materi Product Management (15 modul)
│   │   ├── otherData.ts        # Materi lainnya (PHP, dll.)
│   │   ├── quiz/               # Data kuis per modul
│   │   └── latihan/            # Data latihan coding per modul
│   │
│   ├── contexts/               # React Context API
│   │   └── AuthContext.tsx     # Context autentikasi (login, logout, token)
│   │
│   ├── routers/                # Routing & guards
│   │   └── ProtectedRoute.tsx  # Route guard untuk halaman terproteksi
│   │
│   ├── utils/                  # Fungsi utilitas
│   │   ├── encoding.ts         # Fungsi encoding/decoding
│   │   ├── encryption.js       # Fungsi enkripsi (AES via crypto-js)
│   │   └── hashId.ts           # Fungsi hashing ID
│   │
│   ├── lib/                    # Library & konfigurasi
│   │   └── supabase.ts         # Konfigurasi client Supabase
│   │
│   └── types/                  # Type definitions (TypeScript)
│
├── index.html                  # HTML entry point
├── vite.config.ts              # Konfigurasi Vite
├── tailwind.config.js          # Konfigurasi Tailwind CSS
├── postcss.config.js           # Konfigurasi PostCSS
├── tsconfig.json               # Konfigurasi TypeScript (root)
├── tsconfig.app.json           # Konfigurasi TypeScript (app)
├── tsconfig.node.json          # Konfigurasi TypeScript (node)
├── eslint.config.js            # Konfigurasi ESLint
├── vercel.json                 # Konfigurasi deployment Vercel
├── package.json                # Dependencies & scripts
└── .env                        # Environment variables (Gemini API Key)
```

---

## 🚀 Fitur Utama

### 🎓 Platform Pembelajaran
- **15+ Kursus Aktif** — Coding (Python, JS, TS, Go, React, Next.js, Ruby, MySQL, PostgreSQL) dan Non-Coding (UI/UX, Agile & Scrum, Product Management, English for Tech, Japanese N5-N4).
- **200+ Modul Pembelajaran** — Setiap kursus berisi 15-30 modul terstruktur dari dasar hingga lanjutan.
- **Kuis & Latihan Interaktif** — Setiap modul dilengkapi kuis pilihan ganda dan latihan coding langsung.
- **Progress Tracking** — Sistem pelacakan progres belajar real-time per modul dan per kursus.

### 🏆 Sertifikasi
- **Sertifikat Otomatis** — Sertifikat PDF dihasilkan otomatis (via jsPDF) setelah kursus selesai 100%.
- **Unduh ke Perangkat atau CloudNest** — Pilihan download sertifikat langsung atau simpan ke cloud.

### 🤖 CoreBot AI
- **Asisten AI berbasis Gemini** — Chatbot pintar yang memahami konteks pengguna (nama, plan, progress).
- **Rate Limiting** — Batasan 3 pertanyaan per 30 detik untuk mencegah penyalahgunaan.
- **Formatting Otomatis** — Respons AI diformat dengan bold, italic, dan link otomatis.

### 💳 Sistem Langganan
- **4 Tier Member** — Free, Pro/Plus, Ultra (Mentoring Online), Ultimate (Mentoring Offline).
- **Pembayaran** — Integrasi pembayaran via saldo AstByte.
- **Riwayat Transaksi** — Tersimpan dan ditampilkan di halaman profil.

### 👤 Profil Pengguna
- **Dashboard Pelajar** — Menampilkan kursus yang sedang dipelajari & yang sudah selesai.
- **Lencana Pencapaian** — Badge dinamis berdasarkan aktivitas (Verified, Sultan, Pelanggan Setia, dll).
- **Integrasi AXID** — Edit profil terhubung ke sistem identitas AstByte.

### 🔒 Keamanan
- **reCAPTCHA v2** — Verifikasi login untuk mencegah bot.
- **Token-based Auth** — JWT token disimpan di localStorage.
- **Protected Routes** — Route guard mencegah akses tanpa autentikasi.
- **Enkripsi** — Fungsi enkripsi AES untuk data sensitif.

---

## ⚙️ Cara Menjalankan

### Prasyarat
- **Node.js** v18+
- **npm** v9+

### Instalasi

```bash
# 1. Clone repositori
git clone <repository-url>
cd new-coreline

# 2. Install dependensi
npm install

# 3. Buat file .env di root (jika belum ada)
echo "VITE_GEMINI_API_KEY=your_gemini_api_key" > .env

# 4. Jalankan development server
npm run dev
```

### Scripts

| Perintah           | Deskripsi                              |
| ------------------ | -------------------------------------- |
| `npm run dev`      | Jalankan dev server (Vite)             |
| `npm run build`    | Build untuk produksi                   |
| `npm run preview`  | Preview hasil build                    |
| `npm run lint`     | Jalankan ESLint                        |
| `npm run typecheck`| Cek tipe TypeScript                    |

---

## 🌐 API Endpoints yang Digunakan

Base URL: `https://authx.astbyte.com`

| Endpoint                                       | Method | Deskripsi                          |
| ---------------------------------------------- | ------ | ---------------------------------- |
| `/api/auth/login`                              | POST   | Login via email                    |
| `/api/auth/login/public-id`                    | POST   | Login via Public ID                |
| `/api/auth/me`                                 | GET    | Data user yang sedang login        |
| `/api/subscriptions/me`                        | GET    | Riwayat langganan user             |
| `/api/learning/progress`                       | GET    | Progress belajar user              |
| `/api/learning/progress`                       | POST   | Update progress modul              |
| `/api/coreline/courses`                        | GET    | Daftar semua kursus                |
| `/api/coreline/courses/{id}/rate`              | POST   | Submit rating kursus               |
| `/api/coreline/courses/{id}/reviews`           | GET    | Ambil ulasan kursus                |

---

## 📄 Deployment

Proyek ini di-deploy menggunakan **Vercel**. Konfigurasi deployment ada di `vercel.json`:

```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

Konfigurasi ini memastikan semua route SPA diarahkan ke `index.html`.

---

## 📝 Catatan Penting

- **Backtick Escaping** — Saat menambahkan konten materi di file `src/data/*.ts`, pastikan karakter backtick (`` ` ``) di dalam template literal di-escape dengan backslash (`\`), agar tidak menyebabkan error _tagged template expression_.
- **Registrasi Modul Baru** — Setiap file data kursus baru harus diimpor dan didaftarkan di 3 file: `Dashboard.tsx`, `ProfilePage.tsx`, dan `MaterialPage.tsx`.
- **Environment Variable** — Gemini API key harus disimpan di `.env` sebagai `VITE_GEMINI_API_KEY`.

---

© 2026 NewCoreline by AstByte. All rights reserved.
