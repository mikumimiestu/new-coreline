import { LearningMaterial } from '../types/learning';

export const MOCK_MATERIALS: LearningMaterial[] = [
  // ==================== REACT & TAILWIND CORE MATERIALS ====================
  {
    id: 'react-01',
    user_type: 'student',
    language: 'react', // atau 'typescript' jika aplikasi lo spesifik TS
    title: 'Modern React Setup: Vite & Tailwind CSS',
    description: 'Selamat tinggal Create-React-App! Membangun pondasi secepat kilat dengan Vite dan Tailwind.',
    content: `# ⚛️ Modul 1: Modern Setup (Vite + Tailwind)

React adalah *library* untuk membuat User Interface (UI) berbasis komponen. Di era modern, kita tidak lagi menggunakan \`create-react-app\` karena lambat. Standar industri saat ini adalah **Vite**.

Sedangkan **Tailwind CSS** adalah *framework CSS utility-first* yang bikin kita bisa nge- *styling* langsung di dalam HTML/JSX tanpa perlu bolak-balik ke file \`.css\`.

## 1. Setup Project Baru
Buka terminal dan jalankan perintah ini secara berurutan:

\`\`\`bash
# 1. Inisiasi project Vite + React
npm create vite@latest belajar-react -- --template react

# 2. Masuk ke folder & Install dependencies bawaan
cd belajar-react
npm install

# 3. Install Tailwind CSS & tool pendukungnya
npm install -D tailwindcss postcss autoprefixer

# 4. Generate file konfigurasi Tailwind
npx tailwindcss init -p
\`\`\`

## 2. Konfigurasi Tailwind
Buka file \`tailwind.config.js\` dan atur agar Tailwind men- *scan* semua file komponen kita:

\`\`\`javascript
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
\`\`\`

Lalu, timpa isi file \`src/index.css\` dengan:
\`\`\`css
@tailwind base;
@tailwind components;
@tailwind utilities;
\`\`\`

## 3. Hello World (Tailwind Style)
Buka \`src/App.jsx\`, bersihkan isinya, dan tulis ini:

\`\`\`jsx
function App() {
  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center">
      <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
        Hello Frontend Master, Bro! 🚀
      </h1>
    </div>
  )
}

export default App
\`\`\`
Jalankan \`npm run dev\`. Boom! UI cantik instan.

## 📝 Quiz Singkat
1. Kenapa kita memilih Vite dibandingkan Create-React-App?
2. Apa fungsi dari \`@tailwind utilities\` di file CSS utama?
`,
    level: 'beginner',
    order: 1,
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: 'react-02',
    user_type: 'student',
    language: 'react',
    title: 'JSX & The Power of Tailwind Utility Classes',
    description: 'Memahami sintaks JSX dan cara memanipulasi warna, spacing, dan tipografi dengan Tailwind.',
    content: `# 🎨 Modul 2: JSX & Tailwind Fundamentals

## 1. Apa itu JSX?
JSX (JavaScript XML) adalah sintaks ajaib React yang mengizinkan kita menulis HTML di dalam JavaScript. 
**Aturan Emas JSX:**
1. Gunakan \`className\` bukan \`class\` (karena \`class\` adalah *keyword* bawaan JS).
2. Semua tag wajib ditutup (contoh: \`<img />\` atau \`<input />\`).
3. Hanya boleh me- *return* SATU elemen induk (*Wrapper*), atau gunakan Fragment \`<> ... </>\`.

## 2. Anatomi Tailwind CSS
Tailwind bekerja dengan sistem "Satu Class = Satu Style CSS".

\`\`\`jsx
const ProfileCard = () => {
  return (
    // p-6 = padding 1.5rem, max-w-sm = max-width small, rounded-xl = border-radius extra large
    <div className="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-lg flex items-center gap-x-4">
      
      {/* w-12 h-12 = width/height 3rem, rounded-full = lingkaran sempurna */}
      <div className="w-12 h-12 rounded-full bg-indigo-500 flex-shrink-0"></div>
      
      <div>
        {/* text-xl = font-size besar, font-medium = font-weight 500, text-slate-900 = warna hitam keabu-abuan */}
        <h2 className="text-xl font-medium text-slate-900">Frontend Bro</h2>
        {/* text-slate-500 = warna abu-abu */}
        <p className="text-slate-500">Membangun UI yang gila!</p>
      </div>
      
    </div>
  );
};

export default ProfileCard;
\`\`\`

## 3. JavaScript Expression di dalam JSX
Kita bisa menyelipkan logika JavaScript langsung ke dalam UI menggunakan kurung kurawal \`{\}\`.

\`\`\`jsx
const salam = "Halo Bro!";
const isOnline = true;

return (
  <div>
    <h1>{salam.toUpperCase()}</h1>
    {/* Menggunakan Ternary Operator untuk Styling Dinamis */}
    <span className={\`px-3 py-1 rounded-full text-white \${isOnline ? 'bg-green-500' : 'bg-red-500'}\`}>
      {isOnline ? 'Online' : 'Offline'}
    </span>
  </div>
)
\`\`\`

## ✍️ Latihan (20 Menit)
Buat sebuah komponen UI untuk "Notifikasi Sukses". Gunakan *background* hijau muda, teks hijau tua, ikon ceklis (bisa pakai kotak warna lain sbg *placeholder*), dan *border radius* penuh pakai Tailwind!
`,
    level: 'beginner',
    order: 2,
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: 'react-03',
    user_type: 'student',
    language: 'react',
    title: 'Komponen Berkelanjutan (Components & Props)',
    description: 'Memecah UI menjadi potongan-potongan kecil yang bisa digunakan ulang (Reusable Components).',
    content: `# 🧱 Modul 3: Components & Props

Daripada membuat file raksasa berisi ribuan baris HTML, React menyuruh kita memecah UI menjadi blok-blok Lego yang disebut **Components**.

## 1. Membuat Reusable Component
Kita butuh tombol yang dipakai di banyak tempat. Daripada *copy-paste* Tailwind class panjang-panjang, kita jadikan dia Komponen!

\`\`\`jsx
// file: Button.jsx
// 'props' adalah parameter yang dilempar dari luar
const Button = ({ children, variant = 'primary', onClick }) => {
  // Logic untuk menentukan warna berdasarkan 'variant'
  const baseStyle = "px-4 py-2 font-semibold rounded-lg shadow-md transition duration-300";
  const variants = {
    primary: "bg-blue-500 text-white hover:bg-blue-600",
    danger: "bg-red-500 text-white hover:bg-red-600",
    outline: "bg-transparent border-2 border-slate-700 text-slate-700 hover:bg-slate-100"
  };

  return (
    <button 
      onClick={onClick} 
      className={\`\${baseStyle} \${variants[variant]}\`}
    >
      {children}
    </button>
  );
};

export default Button;
\`\`\`

## 2. Memanggil Komponen (Prop Drilling Dasar)
Sekarang, kita bisa pakai tombol itu di mana saja dengan mudah.

\`\`\`jsx
import Button from './Button';

const App = () => {
  return (
    <div className="p-10 flex gap-4">
      {/* 'children' adalah teks yang diapit tag (<>...</>) */}
      <Button variant="primary" onClick={() => alert('Save!')}>
        Simpan Data
      </Button>
      
      <Button variant="danger">
        Hapus Akun
      </Button>
      
      <Button variant="outline">
        Batal
      </Button>
    </div>
  );
};
\`\`\`

## 📝 Quiz Singkat
1. Apa fungsi dari *Destructuring* \`({ children, variant })\` pada parameter *Component*?
2. Mengapa merancang komponen (seperti Button) yang *reusable* sangat penting di React?
`,
    level: 'beginner',
    order: 3,
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: 'react-04',
    user_type: 'student',
    language: 'react',
    title: 'Reaktivitas UI (useState Hook)',
    description: 'Menambahkan "ingatan" ke dalam komponen dan merender ulang UI secara dinamis saat state berubah.',
    content: `# 🧠 Modul 4: State Management (useState)

Di HTML/JS biasa, kalau variabel berubah, kita harus *query element* lalu ganti \`.innerHTML\`-nya. Di React, kita pakai **State**. Jika *State* berubah, React akan **merender ulang (re-render)** UI secara otomatis!

## 1. Aturan Mutlak State
**JANGAN PERNAH** mengubah state secara langsung (misal: \`count = count + 1\`). Kamu **WAJIB** menggunakan fungsi *setter* (misal: \`setCount(count + 1)\`) agar React tahu dia harus memperbarui layar.

## 2. Implementasi Counter Sederhana

\`\`\`jsx
import { useState } from 'react';

const CounterCard = () => {
  // useState mereturn array: [variabel_nilai, fungsi_pengubah]
  const [count, setCount] = useState(0);

  return (
    <div className="max-w-xs p-6 bg-slate-800 rounded-2xl shadow-xl text-center">
      <h2 className="text-slate-300 text-lg mb-2">Jumlah Barang</h2>
      <p className="text-5xl font-black text-white mb-6">{count}</p>
      
      <div className="flex justify-center gap-3">
        <button 
          onClick={() => setCount(count - 1)}
          className="w-12 h-12 bg-red-500 rounded-full text-white text-2xl hover:bg-red-600 transition"
        >
          -
        </button>
        <button 
          onClick={() => setCount(count + 1)}
          className="w-12 h-12 bg-emerald-500 rounded-full text-white text-2xl hover:bg-emerald-600 transition"
        >
          +
        </button>
      </div>
    </div>
  );
};

export default CounterCard;
\`\`\`

## 3. State dengan Array/Object (Spread Operator)
Ingat, *State* itu *Immutable* (tidak bisa dimodifikasi sebagian). Kalau tipenya *Object* atau *Array*, gunakan *Spread Operator* \`...\`.

\`\`\`jsx
const [user, setUser] = useState({ name: "Bro", level: 1 });

// ✅ Cara Benar: Copy semua property lama, lalu timpa level-nya
const levelUp = () => {
  setUser({ ...user, level: user.level + 1 });
};
\`\`\`

## ✍️ Latihan (20 Menit)
Buat komponen \`ToggleTheme\`. Punya *state* \`isDarkMode\`. Buat UI yang berisi teks "Current Mode: Dark/Light". Jika *button* diklik, mode berubah, dan warna *background div*-nya berubah antara hitam dan putih pakai *Tailwind class*.
`,
    level: 'intermediate',
    order: 4,
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: 'react-05',
    user_type: 'student',
    language: 'react',
    title: 'Siklus Hidup & Efek Samping (useEffect Hook)',
    description: 'Menghubungkan React ke sistem luar (API, Event Listener, Timer) tanpa merusak siklus re-render.',
    content: `# ⚡ Modul 5: Side Effects (useEffect)

Kadang kita butuh aplikasi React melakukan hal di luar UI: memanggil data dari *Server* (API), mengeset *Timer*, atau memanipulasi judul *Tab Browser*. Ini disebut **Side Effects**. Tempatnya ada di \`useEffect\`.

## 1. Anatomi useEffect & Dependency Array

\`\`\`jsx
import { useState, useEffect } from 'react';

const Tracker = () => {
  const [count, setCount] = useState(0);

  // 1. Array Kosong [] -> Dijalankan HANYA SEKALI saat komponen pertama kali muncul (Mount)
  useEffect(() => {
    console.log("Komponen dipasang ke layar!");
  }, []);

  // 2. Ada isinya [count] -> Dijalankan saat komponen muncul DAN setiap kali 'count' berubah
  useEffect(() => {
    document.title = \`Klik sebanyak \${count} kali\`;
  }, [count]);

  // 3. Tanpa array -> JANGAN DIPAKAI KECUALI TERPAKSA! (Akan jalan di setiap re-render, bikin aplikasi lag)
  // useEffect(() => { ... }) 

  return <button onClick={() => setCount(count + 1)}>Klik Gue</button>;
};
\`\`\`

## 2. Cleanup Function (Mencegah Memory Leak)
Kalau kamu pasang *Event Listener* atau *Timer*, kamu **WAJIB** membersihkannya saat komponen hilang dari layar (Unmount).

\`\`\`jsx
useEffect(() => {
  const timer = setInterval(() => {
    console.log("Satu detik berlalu...");
  }, 1000);

  // Fungsi return ini adalah 'Cleanup'
  return () => {
    clearInterval(timer);
    console.log("Timer dimatikan!");
  };
}, []);
\`\`\`

## ✍️ Latihan (30 Menit)
1. Buat *state* \`mousePos\` berbentuk *object* \`{ x: 0, y: 0 }\`.
2. Gunakan \`useEffect\` untuk memasang \`window.addEventListener('mousemove', ...)\` yang mengupdate state \`mousePos\` dengan posisi \`e.clientX\` dan \`e.clientY\`.
3. Tampilkan nilainya ke layar. **PENTING:** Jangan lupa hapus *event listener*-nya di *Cleanup Function*!
`,
    level: 'intermediate',
    order: 5,
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: 'react-06',
    user_type: 'student',
    language: 'react',
    title: 'Responsive Web Design (Flexbox & Grid Tailwind)',
    description: 'Menguasai Layouting UI React untuk Mobile, Tablet, dan Desktop dengan Tailwind Modifiers.',
    content: `# 📱 Modul 6: Responsive Layout (Grid & Flex)

Di industri, aplikasi tidak dirancang untuk layar laptop saja (*Mobile-First Design*). Tailwind punya *modifier* layar: \`sm:\`, \`md:\`, \`lg:\`, \`xl:\`.

## 1. Flexbox Navigation Bar
Membangun *Header* modern yang rapi secara horizontal.

\`\`\`jsx
const Navbar = () => {
  return (
    // Flex, items di tengah vertikal, dan dibuat saling menjauh ke ujung (space-between)
    <nav className="flex items-center justify-between p-4 bg-slate-900 text-white shadow-md">
      <div className="font-bold text-2xl text-cyan-400">TechBro.</div>
      
      {/* Hidden di mobile, muncul (flex) mulai layar medium (Tablet) */}
      <ul className="hidden md:flex gap-x-8 font-medium">
        <li className="hover:text-cyan-400 cursor-pointer transition">Home</li>
        <li className="hover:text-cyan-400 cursor-pointer transition">Produk</li>
        <li className="hover:text-cyan-400 cursor-pointer transition">Tentang</li>
      </ul>

      <button className="bg-cyan-500 px-5 py-2 rounded-lg hover:bg-cyan-600 transition">
        Login
      </button>
    </nav>
  );
};
\`\`\`

## 2. CSS Grid untuk List Produk
*Grid* adalah alat terbaik untuk menyusun tata letak *Card*!

\`\`\`jsx
const ProductList = () => {
  // Array dummy menggunakan metode Array.from
  const products = Array.from({ length: 6 }, (_, i) => \`Produk \${i + 1}\`);

  return (
    // 1 Kolom di HP, 2 Kolom di Tablet, 3 Kolom di Laptop, 4 Kolom di TV
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-8 bg-slate-100">
      
      {products.map((item, index) => (
        <div key={index} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 hover:shadow-xl transition">
          <div className="bg-slate-200 h-40 rounded-xl mb-4"></div> {/* Placeholder Gambar */}
          <h3 className="font-bold text-lg text-slate-800">{item}</h3>
          <p className="text-slate-500 text-sm">Rp 150.000</p>
        </div>
      ))}

    </div>
  );
};
\`\`\`

## 📝 Quiz Singkat
1. Apa perbedaan utama *Flexbox* (\`flex\`) dan *Grid* (\`grid\`)? Kapan sebaiknya kita memakai keduanya?
2. Jika kita punya class \`bg-red-500 md:bg-blue-500 lg:bg-green-500\`, warna apa yang tampil di layar iPad (Medium)?
`,
    level: 'intermediate',
    order: 6,
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: 'react-07',
    user_type: 'student',
    language: 'react',
    title: 'Advanced Form Handling & Validation UI',
    description: 'Mengontrol input pengguna secara penuh menggunakan State (Controlled Components).',
    content: `# 📝 Modul 7: Forms & User Input

Menangani form di React berbeda dengan HTML biasa. Kita merebut "kuasa" data dari DOM HTML ke dalam State React. Ini disebut **Controlled Components**.

## 1. Form Single Input & Multiple Input

\`\`\`jsx
import { useState } from 'react';

const RegisterForm = () => {
  // Menggunakan 1 State Object untuk banyak input agar rapi
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });

  // Fungsi dinamis untuk menangani semua perubahan input
  const handleChange = (e) => {
    const { name, value } = e.target;
    // Spread operator untuk tidak menimpa data yang lain
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Mencegah browser me-refresh halaman!
    console.log("Data dikirim ke server:", formData);
    alert(\`Welcome, \${formData.username}!\`);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 bg-white rounded-xl shadow-md flex flex-col gap-4">
      <h2 className="text-2xl font-bold text-slate-800 mb-4">Buat Akun</h2>
      
      {/* Input menggunakan Tailwind Forms Styling */}
      <input 
        type="text" 
        name="username"
        value={formData.username} 
        onChange={handleChange}
        placeholder="Username" 
        className="px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
        required
      />
      
      <input 
        type="email" 
        name="email"
        value={formData.email} 
        onChange={handleChange}
        placeholder="Email Address" 
        className="px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        required
      />

      <button type="submit" className="mt-2 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition">
        Daftar Sekarang
      </button>
    </form>
  );
};

export default RegisterForm;
\`\`\`

## Keunggulan Controlled Components
1. **Validasi Instan:** Kita bisa menonaktifkan tombol submit secara dinamis (contoh: \`disabled={formData.password.length < 8}\`).
2. **Format Masking:** Kita bisa memaksa huruf besar semua atau otomatis menambahkan pemisah ribuan pada input harga *saat user sedang mengetik*.
`,
    level: 'intermediate',
    order: 7,
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: 'react-08',
    user_type: 'student',
    language: 'react',
    title: 'Single Page Application (React Router v6)',
    description: 'Pindah-pindah halaman secara instan tanpa me-refresh browser menggunakan React Router.',
    content: `# 🗺️ Modul 8: Routing (SPA Concept)

Aplikasi React adalah **Single Page Application (SPA)**. Saat *user* pindah halaman, kita tidak memuat ulang (refresh) HTML dari server, tapi React hanya mengganti komponen yang ada di layar. Ini membuat web terasa secepat aplikasi *Native Mobile*.

*Note: Install dulu package-nya: \`npm install react-router-dom\`*

## 1. Setup Router (main.jsx)
Bungkus komponen utama aplikasimu dengan \`BrowserRouter\`.

\`\`\`jsx
import { BrowserRouter } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
\`\`\`

## 2. Navigasi & Mendefinisikan Rute (App.jsx)
Gunakan tag \`<Link>\` dari React Router, BUKAN tag \`<a>\` HTML standar (karena \`<a>\` akan memicu *refresh* layar).

\`\`\`jsx
import { Routes, Route, Link, NavLink } from 'react-router-dom';

const Home = () => <h1 className="text-3xl font-bold">🏠 Halaman Beranda</h1>;
const About = () => <h1 className="text-3xl font-bold">ℹ️ Halaman Tentang Kami</h1>;
const NotFound = () => <h1 className="text-3xl font-bold text-red-500">❌ 404 Tidak Ditemukan</h1>;

const App = () => {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans">
      {/* Navigasi Global */}
      <nav className="p-4 bg-white shadow flex gap-6">
        <Link to="/" className="text-blue-600 font-medium hover:underline">Home</Link>
        
        {/* NavLink punya fitur ajaib: bisa mendeteksi apakah kita sedang di rute ini (Active State) */}
        <NavLink 
          to="/about" 
          className={({ isActive }) => 
            \`font-medium \${isActive ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-slate-500'}\`
          }
        >
          About
        </NavLink>
      </nav>

      {/* Render Area (Komponen berganti-ganti di sini) */}
      <main className="p-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<NotFound />} /> {/* Catch-all route */}
        </Routes>
      </main>
    </div>
  );
};
\`\`\`

## ✍️ Latihan (20 Menit)
Tambahkan Rute Dinamis! Buat rute \`/user/:id\`. Lalu di dalam komponen UserProfile, tangkap parameter \`id\` tersebut menggunakan *hook* bawaan router yaitu \`useParams()\` dan tampilkan di layar: "Ini adalah profil user bernomor: X".
`,
    level: 'intermediate',
    order: 8,
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: 'react-09',
    user_type: 'student',
    language: 'react',
    title: 'Prop Drilling Crisis & Context API',
    description: 'Menyelamatkan aplikasi dari lemparan state yang terlalu dalam dengan Global State bawaan React.',
    content: `# 🌍 Modul 9: Context API (Global State)

Bayangkan komponen A (Root) punya data \`user\`. Data ini mau dipakai di komponen Z (Cucu paling bawah). Kalau pakai *Props*, kamu harus mengopernya A -> B -> C -> ... -> Z. Ini disebut **Prop Drilling** (menyebalkan!).

Solusinya: **Context API**. Kita buat sebuah "brankas data" global yang bisa diambil langsung oleh komponen Z tanpa harus melewati komponen di atasnya.

## 1. Membuat Context & Provider (ThemeContext.jsx)
\`\`\`jsx
import { createContext, useState } from 'react';

// 1. Buat Brankasnya
export const ThemeContext = createContext();

// 2. Buat Pembungkusnya (Provider)
export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  // 3. Masukkan data/fungsi ke dalam brankas (value)
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
\`\`\`

## 2. Menggunakan Context di Komponen Apapun!
\`\`\`jsx
// file: Navbar.jsx & App.jsx
import { useContext } from 'react';
import { ThemeContext } from './ThemeContext';

const Navbar = () => {
  // Ambil langsung dari brankas pakai useContext
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <button 
      onClick={toggleTheme}
      className="px-4 py-2 rounded-lg bg-indigo-500 text-white font-bold"
    >
      Switch to {theme === 'light' ? 'Dark' : 'Light'} Mode
    </button>
  );
};

// Jangan lupa bungkus aplikasimu dengan Provider di file akar (main.jsx atau App.jsx)!
const App = () => {
  const { theme } = useContext(ThemeContext);
  
  return (
    // Memadukan Context dengan class Tailwind "dark"
    <div className={\`min-h-screen \${theme === 'dark' ? 'bg-slate-900 text-white' : 'bg-white text-slate-900'}\`}>
      <Navbar />
      <h1 className="p-8 text-2xl">Aplikasi Keren Bro</h1>
    </div>
  )
}
\`\`\`

*Pro Tip Tailwind:* Jika ingin lebih pro, aktifkan \`darkMode: 'class'\` di \`tailwind.config.js\`, lalu kamu bisa nambahin kelas \`dark:bg-slate-900\` langsung di tag HTML-mu!
`,
    level: 'advanced',
    order: 9,
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: 'react-10',
    user_type: 'student',
    language: 'react',
    title: 'Logic Separation: Custom Hooks',
    description: 'Menyembunyikan kerumitan logika state dan efek samping ke dalam Hook buatan sendiri.',
    content: `# 🪝 Modul 10: Custom Hooks

*Software Engineer* yang jago tahu kapan harus memisahkan *Logic* (Matematika/API) dari *View* (UI/HTML). Di React, caranya adalah membuat **Custom Hook**. Hook hanyalah fungsi JavaScript biasa yang namanya diawali dengan \`use\`.

## 1. Masalah: Logika yang Berulang
Bayangkan kamu punya 3 halaman berbeda yang semuanya butuh logika "Mendeteksi Ukuran Layar Window" (misalnya untuk merubah UI kalau layar mengecil). Masa iya nulis \`useState\` dan \`useEffect\` yang sama 3 kali?

## 2. Solusi: Bikin \`useWindowSize\`
\`\`\`javascript
// file: hooks/useWindowSize.js
import { useState, useEffect } from 'react';

export const useWindowSize = () => {
  const [size, setSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    
    // Jangan lupa Cleanup!
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return size; // Kembalikan statenya
};
\`\`\`

## 3. Implementasi di Komponen
Lihat betapa bersihnya komponen UI kita sekarang!

\`\`\`jsx
import { useWindowSize } from './hooks/useWindowSize';

const HeroSection = () => {
  const { width } = useWindowSize(); // Panggil Custom Hook!
  
  const isMobile = width < 768; // Tailwind 'md' breakpoint

  return (
    <div className={\`flex items-center justify-center h-screen \${isMobile ? 'bg-amber-100' : 'bg-blue-100'}\`}>
      <h1 className="text-3xl font-black text-slate-800">
        {isMobile ? "Versi Layar HP 📱" : "Versi Layar Desktop 💻"}
      </h1>
      <p className="absolute bottom-10">Lebar Pixel Saat Ini: {width}px</p>
    </div>
  );
};
\`\`\`

## ✍️ Latihan (30 Menit)
Buat custom hook bernama \`useToggle(initialValue)\` yang mengembalikan sebuah *state boolean* dan sebuah fungsi untuk membalik nilainya (*true* jadi *false*, *false* jadi *true*). Gunakan di komponen untuk menampilkan/menyembunyikan sebuah modal (Pop-up) buatan Tailwind!
`,
    level: 'advanced',
    order: 10,
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: 'react-11',
    user_type: 'student',
    language: 'react',
    title: 'Data Fetching & Skeleton UI',
    description: 'Menarik data dari REST API, menangani Loading/Error State, dan membuat efek Skeleton bawaan Tailwind.',
    content: `# 📡 Modul 11: Data Fetching & UI States

Frontend tidak ada gunanya tanpa data dari Backend. Mari kita tarik data dari API publik, dan berikan pengalaman pengguna (UX) yang berkelas pakai **Tailwind Pulse Animation (Skeleton Loader)**.

## 1. Async Data Fetching dengan \`useEffect\`

\`\`\`jsx
import { useState, useEffect } from 'react';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Definisi fungsi Async di dalam useEffect
    const fetchUsers = async () => {
      try {
        // Simulasi delay jaringan agar skeleton terlihat
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        const res = await fetch('https://jsonplaceholder.typicode.com/users');
        if (!res.ok) throw new Error("Gagal mengambil data dari server");
        
        const data = await res.json();
        setUsers(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false); // Matikan loading, baik sukses maupun gagal
      }
    };

    fetchUsers();
  }, []);

  // --- RENDERING UI STATES ---
  
  // 1. STATE: ERROR
  if (error) return <div className="p-4 bg-red-100 text-red-600 rounded-lg">{error}</div>;

  // 2. STATE: LOADING (Skeleton UI dengan Tailwind 'animate-pulse')
  if (isLoading) {
    return (
      <div className="grid gap-4 p-4">
        {[1, 2, 3].map((n) => (
          <div key={n} className="animate-pulse flex space-x-4 p-4 bg-slate-50 rounded-xl">
            <div className="rounded-full bg-slate-200 h-12 w-12"></div>
            <div className="flex-1 space-y-4 py-1">
              <div className="h-4 bg-slate-200 rounded w-3/4"></div>
              <div className="h-4 bg-slate-200 rounded w-1/2"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  // 3. STATE: SUCCESS (Data Ready)
  return (
    <ul className="grid gap-4 p-4">
      {users.map(user => (
        <li key={user.id} className="p-4 border border-slate-200 rounded-xl shadow-sm flex items-center gap-4 hover:bg-slate-50">
          <div className="rounded-full bg-blue-500 h-12 w-12 flex items-center justify-center text-white font-bold">
            {user.name.charAt(0)}
          </div>
          <div>
            <h3 className="font-bold text-slate-800">{user.name}</h3>
            <p className="text-sm text-slate-500">{user.email}</p>
          </div>
        </li>
      ))}
    </ul>
  );
};
\`\`\`

*(Note Pro: Di *Production*, developer jarang nulis fetch manual seperti ini. Mereka pakai library \`React Query\` atau \`SWR\` untuk menangani caching & fetching otomatis).*
`,
    level: 'advanced',
    order: 11,
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: 'react-12',
    user_type: 'student',
    language: 'react',
    title: 'Performance Optimization (Memoization)',
    description: 'Mencegah Re-render yang tidak perlu menggunakan useMemo, useCallback, dan React.memo.',
    content: `# 🚀 Modul 12: Performance Optimization

React secara *default* akan me-render ulang (Re-render) SELURUH komponen turunan (Child) jika komponen induknya (Parent) berubah state-nya. Jika aplikasi mu sudah sangat kompleks (misal: grafik *trading crypto*), ini akan bikin browser ngelag (Render Blocking).

## 1. React.memo (Mengingat Komponen)
Membungkus komponen agar tidak di-render ulang jika \`props\`-nya tidak berubah.

\`\`\`jsx
import { memo, useState } from 'react';

// Anak tidak akan di-render ulang walau Parent berubah, KECUALI props 'title' berubah.
const HeavyChild = memo(({ title }) => {
  console.log("HeavyChild dirender!"); // Cek console untuk membuktikan
  
  // Simulasi proses rendering berat...
  let start = Date.now();
  while (Date.now() - start < 500) {} 

  return <div className="p-4 bg-purple-100 rounded-lg">{title}</div>;
});
\`\`\`

## 2. useMemo (Mengingat Hasil Perhitungan)
Jangan hitung ulang matematika berat (algoritma kompleks / filter array besar) jika datanya tidak berubah!

\`\`\`jsx
import { useMemo } from 'react';

const Dashboard = ({ transactions }) => {
  const [filter, setFilter] = useState('');

  // ❌ BAD: Dihitung ulang tiap kali user ngetik di input filter
  // const totalPendapatan = transactions.reduce((a, b) => a + b.amount, 0);

  // ✅ PRO: Hasil perhitungan DISIMPAN (di-cache). 
  // Hanya dihitung ulang JIKA array 'transactions' berubah isi datanya.
  const totalPendapatan = useMemo(() => {
    console.log("Menghitung ulang omzet...");
    return transactions.reduce((total, trx) => total + trx.amount, 0);
  }, [transactions]); // <-- Dependency Array

  return (
    <div>
       <input onChange={(e) => setFilter(e.target.value)} placeholder="Cari..." />
       <h1>Total Rp {totalPendapatan}</h1>
    </div>
  )
}
\`\`\`

## 3. useCallback (Mengingat Fungsi)
Mengingat definisi sebuah fungsi agar tidak dikira sebagai "objek baru" oleh React di setiap render (Sangat berguna jika dilempar sebagai Prop ke komponen turunan yang menggunakan \`React.memo\`).
`,
    level: 'advanced',
    order: 12,
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: 'react-13',
    user_type: 'student',
    language: 'react',
    title: 'Modern Global State Management (Zustand)',
    description: 'Menggantikan Redux yang rumit dengan Zustand yang simpel, ringan, dan tanpa boilerplate.',
    content: `# 🐻 Modul 13: State Management Modern (Zustand)

Dulu, untuk mengelola *Global State* di aplikasi raksasa, semua orang memakai **Redux**. Masalahnya, *Redux* itu punya banyak *boilerplate* (kode setup yang panjang dan rumit).

Saat ini, bintang barunya adalah **Zustand** (bahasa Jerman: 'Keadaan'). Setupnya cuma hitungan detik!

*Install dulu: \`npm install zustand\`*

## 1. Membuat Store Global
Satu file kecil yang menyimpan state dan fungsinya. Tidak perlu repot bikin *Provider* membungkus aplikasi!

\`\`\`jsx
// file: store/useCartStore.js
import { create } from 'zustand';

export const useCartStore = create((set) => ({
  // Data (State)
  cartItems: 0,
  
  // Fungsi (Actions)
  addToCart: () => set((state) => ({ cartItems: state.cartItems + 1 })),
  clearCart: () => set({ cartItems: 0 }),
}));
\`\`\`

## 2. Panggil Store di Komponen Manapun!
Mau di *Navbar* paling atas, atau di *Button* paling bawah, tinggal panggil *Custom Hook*-nya.

\`\`\`jsx
// file: components/Navbar.jsx
import { useCartStore } from '../store/useCartStore';

const Navbar = () => {
  // Hanya menarik 'cartItems' agar tidak re-render jika fungsi lain berubah
  const cartItems = useCartStore((state) => state.cartItems);

  return (
    <nav className="p-4 bg-indigo-600 text-white flex justify-between">
      <h1 className="font-bold">GigaStore</h1>
      
      {/* Icon Keranjang dengan Badge Tailwind */}
      <div className="relative">
        <span>🛒 Keranjang</span>
        {cartItems > 0 && (
          <span className="absolute -top-2 -right-4 bg-red-500 text-xs px-2 py-1 rounded-full">
            {cartItems}
          </span>
        )}
      </div>
    </nav>
  );
};

// file: components/ProductItem.jsx
import { useCartStore } from '../store/useCartStore';

const ProductItem = () => {
  // Menarik fungsi action
  const addToCart = useCartStore((state) => state.addToCart);

  return (
    <div className="p-4 border rounded-xl w-48 text-center mt-10">
      <h3 className="font-bold mb-2">Sepatu Keren</h3>
      <button 
        onClick={addToCart}
        className="w-full bg-slate-900 text-white py-2 rounded-lg hover:bg-slate-800"
      >
        Tambah ke Cart
      </button>
    </div>
  );
}
\`\`\`

Gampang banget kan?! Tanpa pusing mikirin *Dispatch*, *Reducers*, atau *Action Types*.
`,
    level: 'expert',
    order: 13,
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: 'react-14',
    user_type: 'student',
    language: 'react',
    title: 'Studi Kasus 1: Interactive Dashboard UI',
    description: 'Menjahit konsep Grid Layout, Component Splitting, dan Chart (UI Component).',
    content: `# 🛠️ Project 1: Admin Dashboard UI

## 📜 Tujuan
Menggabungkan kehebatan **CSS Grid Tailwind** dengan pemecahan komponen React untuk merakit halaman Dasbor level industri.

## 💻 Struktur Layout (App.jsx)
Ini adalah kerangka dasar UI untuk aplikasi berbasis Sidebar + Content Area.

\`\`\`jsx
import Sidebar from './Sidebar';
import Header from './Header';
import StatsCard from './StatsCard';
import RecentActivity from './RecentActivity';

const DashboardLayout = () => {
  return (
    // Membagi layar mentok jadi 2 area utama: Sidebar (tetap) dan Main (sisa ruang)
    <div className="flex h-screen overflow-hidden bg-slate-50 font-sans">
      
      {/* SIDEBAR COMPONENT (Tersembunyi di HP, muncul di Desktop) */}
      <aside className="w-64 bg-slate-900 text-slate-300 hidden md:flex flex-col">
        <div className="h-16 flex items-center justify-center font-black text-xl text-white tracking-widest border-b border-slate-700">
          ADMIN.IO
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <a href="#" className="block p-3 bg-indigo-600 text-white rounded-lg">📊 Dashboard</a>
          <a href="#" className="block p-3 hover:bg-slate-800 rounded-lg transition">👥 Users</a>
          <a href="#" className="block p-3 hover:bg-slate-800 rounded-lg transition">⚙️ Settings</a>
        </nav>
      </aside>

      {/* KONTEN UTAMA */}
      <div className="flex-1 flex flex-col relative overflow-y-auto">
        
        {/* HEADER COMPONENT */}
        <header className="h-16 bg-white shadow-sm flex items-center justify-between px-8 sticky top-0 z-10">
          <h2 className="text-xl font-bold text-slate-800">Overview</h2>
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-slate-200 border-2 border-indigo-500 overflow-hidden">
               {/* Avatar placeholder */}
            </div>
          </div>
        </header>

        {/* AREA DASBOR */}
        <main className="p-8">
          
          {/* Baris 1: 4 Kartu Statistik Pakai Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatsCard title="Total Revenue" value="Rp 24M" trend="+12%" />
            <StatsCard title="New Users" value="1,245" trend="+5%" />
            <StatsCard title="Active Subs" value="890" trend="-2%" isNegative />
            <StatsCard title="Tickets" value="12" trend="Resolved" />
          </div>

          {/* Baris 2: Chart Area & Activity Area */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Chart Area makan 2 kolom */}
            <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-slate-200 p-6 h-96 flex items-center justify-center">
               <span className="text-slate-400">Area Chart (Pakai Recharts / Chart.js)</span>
            </div>

            {/* Activity makan 1 kolom */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 h-96">
               <h3 className="font-bold text-slate-800 mb-4">Recent Activity</h3>
               <div className="space-y-4">
                 {/* List item */}
                 <div className="flex items-center gap-3">
                   <div className="w-2 h-2 rounded-full bg-green-500"></div>
                   <p className="text-sm text-slate-600">User #1024 paid invoice</p>
                 </div>
               </div>
            </div>

          </div>
        </main>
      </div>
      
    </div>
  );
};

export default DashboardLayout;
\`\`\`
`,
    level: 'expert',
    order: 14,
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: 'react-15',
    user_type: 'student',
    language: 'react',
    title: 'Studi Kasus 2: E-Commerce Storefront',
    description: 'Proyek Akhir Masterclass: State Cart Slide-Over, Komponen Produk, dan Absolute Positioning Tailwind.',
    content: `# 🛒 Project 2: E-Commerce Frontend

## 📜 Tujuan
Ujian akhir kemampuan *Frontend Engineer*. Kita akan membuat UI *Storefront* dan fitur keranjang geser (*Slide-over Modal*) menggunakan **Absolute/Fixed Positioning** dari Tailwind yang dikontrol oleh *State* React.

## 💻 Implementasi Kode Utama

\`\`\`jsx
import { useState } from 'react';

const Storefront = () => {
  // State untuk mengontrol muncul/hilangnya slide-over keranjang
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 relative overflow-hidden">
      
      {/* NAVBAR */}
      <nav className="flex justify-between items-center p-6 bg-white shadow-sm">
        <h1 className="text-2xl font-black italic">SWAG.CO</h1>
        <button 
          onClick={() => setIsCartOpen(true)}
          className="relative p-2 bg-slate-100 rounded-full hover:bg-slate-200 transition"
        >
          🛍️ <span className="absolute top-0 right-0 bg-red-500 w-3 h-3 rounded-full animate-bounce"></span>
        </button>
      </nav>

      {/* PRODUCT GRID */}
      <main className="max-w-7xl mx-auto p-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {/* Card Dummy */}
          {[1, 2, 3, 4, 5, 6].map(i => (
            <div key={i} className="group">
              <div className="w-full h-80 bg-slate-200 rounded-2xl overflow-hidden relative">
                {/* Overlay muncul saat di-hover (Efek Keren Tailwind) */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition duration-300">
                   <button className="bg-white text-slate-900 px-6 py-2 rounded-full font-bold transform translate-y-4 group-hover:translate-y-0 transition">
                     Quick Add
                   </button>
                </div>
              </div>
              <div className="mt-4 flex justify-between items-center">
                <h3 className="font-semibold text-slate-800">Streetwear Tee #{i}</h3>
                <p className="text-slate-500 font-medium">$45</p>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* ======================================================== */}
      {/* SLIDE-OVER CART COMPONENT (Absolute/Fixed Magic Tailwind) */}
      {/* ======================================================== */}
      
      {/* Latar Hitam Transparan (Backdrop) */}
      {isCartOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 transition-opacity"
          onClick={() => setIsCartOpen(false)} // Klik luar keranjang untuk tutup
        ></div>
      )}

      {/* Panel Keranjang (Menganimasikan geseran dari Kanan ke Kiri) */}
      <div 
        className={\`fixed top-0 right-0 h-full w-full sm:w-96 bg-white z-50 shadow-2xl transform transition-transform duration-300 ease-in-out \${isCartOpen ? 'translate-x-0' : 'translate-x-full'}\`}
      >
        <div className="p-6 h-full flex flex-col">
          {/* Header Cart */}
          <div className="flex justify-between items-center border-b pb-4 mb-4">
            <h2 className="text-2xl font-bold">Your Cart</h2>
            <button 
              onClick={() => setIsCartOpen(false)}
              className="text-slate-400 hover:text-slate-800 text-2xl"
            >
              &times;
            </button>
          </div>

          {/* Isi Cart (Bisa scroll jika barang banyak) */}
          <div className="flex-1 overflow-y-auto">
            {/* Dummy Item di dalam cart */}
            <div className="flex gap-4 mb-4">
              <div className="w-20 h-24 bg-slate-200 rounded-lg"></div>
              <div className="flex-1">
                <h4 className="font-bold">Streetwear Tee #1</h4>
                <p className="text-slate-500">$45</p>
                <div className="flex items-center gap-2 mt-2">
                   <button className="w-6 h-6 border rounded">-</button>
                   <span>1</span>
                   <button className="w-6 h-6 border rounded">+</button>
                </div>
              </div>
            </div>
          </div>

          {/* Checkout Footer */}
          <div className="border-t pt-4 mt-auto">
            <div className="flex justify-between font-bold text-lg mb-4">
              <span>Total</span>
              <span>$45.00</span>
            </div>
            <button className="w-full bg-slate-900 text-white py-4 rounded-xl font-bold hover:bg-slate-800 transition">
              Checkout Now
            </button>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Storefront;
\`\`\`

## 🏆 Kesimpulan Masterclass
*Boom!* Lo baru aja nyelesaiin fondasi utama dari UI Modern *Engineering*. Dengan gabungan *Virtual DOM React*, keajaiban *Utility Classes Tailwind*, dan penguasaan *State*, lo udah siap buat diadu ngerjain projek *Frontend* skala perusahaan. Terus eksplor *ecosystem* ini bro, *keep coding*!
`,
    level: 'expert',
    order: 15,
    created_at: '2025-01-01T00:00:00Z'
  }
];