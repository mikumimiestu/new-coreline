import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, Terminal, Settings, PlayCircle, 
  Code, Laptop, Sparkles, CheckCircle, ChevronRight
} from 'lucide-react';
// Uncomment baris di bawah ini jika menggunakan react-router-dom:
// import { Link } from 'react-router-dom'; 

// --- Tipe Data (TypeScript) ---
interface Step {
  title: string;
  desc: string;
  code?: string;
}

interface Tutorial {
  id: string;
  title: string;
  icon: string | JSX.Element;
  install: Step[];
  usage: Step[];
}

// --- Data Tutorial ---
const tutorials: Tutorial[] = [
  {
    id: 'vscode',
    title: 'VS Code',
    icon: '💻',
    install: [
      { 
        title: 'Unduh Installer', 
        desc: 'Silakan kunjungi situs resmi code.visualstudio.com dan unduh installer yang sesuai dengan sistem operasi kamu (Windows, Mac, atau Linux).' 
      },
      { 
        title: 'Proses Instalasi', 
        desc: 'Jalankan file installer yang sudah diunduh. Ikuti instruksi di layar (cukup klik Next). Pastikan kamu mencentang opsi "Add to PATH" jika muncul agar VS Code bisa diakses dari terminal.' 
      },
      {
        title: 'Pemasangan Selesai',
        desc: 'Setelah instalasi selesai, buka aplikasi Visual Studio Code. Kamu akan disambut dengan halaman "Get Started".'
      }
    ],
    usage: [
      { 
        title: 'Membuka Folder Project', 
        desc: 'Untuk mulai membuat project, klik menu "File" di kiri atas, lalu pilih "Open Folder". Pilih folder kosong tempat kamu akan menyimpan kode.' 
      },
      { 
        title: 'Membuka Terminal Bawaan', 
        desc: 'VS Code memiliki terminal bawaan. Kamu bisa membukanya dengan menekan pintasan keyboard `Ctrl + \`` (tombol backtick di bawah Esc) atau melalui menu "Terminal" > "New Terminal".' 
      },
      { 
        title: 'Install Ekstensi (Opsional namun Penting)', 
        desc: 'Klik ikon kotak-kotak di menu sebelah kiri (Extensions). Sangat disarankan untuk mencari dan menginstal ekstensi "Prettier - Code formatter" agar kodemu otomatis rapi saat disimpan.' 
      }
    ]
  },
  {
    id: 'python',
    title: 'Python',
    icon: '🐍',
    install: [
      { 
        title: 'Unduh Python', 
        desc: 'Kunjungi situs python.org dan masuk ke menu Downloads. Pilih versi terbaru yang stabil untuk sistem operasi kamu.' 
      },
      { 
        title: 'Centang "Add Python to PATH"', 
        desc: 'PENTING: Saat pertama kali menjalankan installer (khusus Windows), pastikan kotak kecil bertuliskan "Add Python to PATH" di bagian bawah layar sudah dicentang sebelum menekan tombol Install.' 
      },
      { 
        title: 'Verifikasi Instalasi', 
        desc: 'Buka Terminal atau Command Prompt (CMD), lalu ketikkan perintah di bawah ini untuk memastikan Python sudah terpasang dengan baik:', 
        code: 'python --version' 
      }
    ],
    usage: [
      { 
        title: 'Membuat File Python', 
        desc: 'Di dalam VS Code, buat file baru dan beri nama `main.py`. Ketikkan kode sederhana ini ke dalam file tersebut: `print("Halo, saya siap belajar Python!")` lalu simpan (Ctrl+S).' 
      },
      { 
        title: 'Menjalankan Kode', 
        desc: 'Buka terminal di VS Code, pastikan kamu berada di folder yang sama dengan file `main.py`, lalu ketik perintah berikut untuk menjalankannya:', 
        code: 'python main.py' 
      },
      { 
        title: 'Menginstal Library Eksternal (PIP)', 
        desc: 'Python memiliki PIP (Package Installer). Jika kamu butuh fitur tambahan (misalnya untuk mengambil data dari internet), kamu bisa menginstalnya lewat terminal:', 
        code: 'pip install requests' 
      }
    ]
  },
  {
    id: 'nodejs',
    title: 'Node.js',
    icon: '🌐',
    install: [
      { 
        title: 'Unduh Node.js LTS', 
        desc: 'Buka situs nodejs.org. Sangat disarankan untuk mengunduh versi yang berlabel "LTS" (Long Term Support) karena versi ini jauh lebih stabil untuk pemula.' 
      },
      { 
        title: 'Proses Instalasi', 
        desc: 'Jalankan installer-nya. Kamu bisa langsung menekan Next hingga proses selesai tanpa perlu mengubah pengaturan default-nya.' 
      },
      { 
        title: 'Verifikasi Node & NPM', 
        desc: 'Buka terminal kamu, lalu cek apakah Node.js beserta NPM (Node Package Manager) sudah terinstal dengan mengetik perintah berikut secara bergantian:', 
        code: 'node -v\nnpm -v' 
      }
    ],
    usage: [
      { 
        title: 'Inisialisasi Project (NPM Init)', 
        desc: 'Untuk memulai project berbasis Node.js yang rapi, kamu butuh file `package.json`. Jalankan perintah ini di terminal dalam folder projectmu:', 
        code: 'npm init -y' 
      },
      { 
        title: 'Menjalankan Script JavaScript', 
        desc: 'Buat file bernama `app.js`, isikan dengan kode: `console.log("Node.js berhasil berjalan!");`. Jalankan file tersebut dengan perintah:', 
        code: 'node app.js' 
      },
      { 
        title: 'Menginstal Package', 
        desc: 'Jika kamu ingin membuat server web dengan framework Express, kamu bisa menginstalnya dengan mudah melalui NPM:', 
        code: 'npm install express' 
      }
    ]
  },
  {
    id: 'git',
    title: 'Git & GitHub',
    icon: '📦',
    install: [
      { 
        title: 'Unduh Git', 
        desc: 'Buka situs git-scm.com/downloads dan pilih sistem operasi kamu. Git adalah alat wajib untuk melacak perubahan pada kodemu.' 
      },
      { 
        title: 'Proses Instalasi', 
        desc: 'Jalankan installer. Meskipun ada banyak opsi yang muncul, kamu bisa terus menekan Next dan menggunakan pengaturan default bawaan Git.' 
      },
      { 
        title: 'Konfigurasi Awal (Wajib)', 
        desc: 'Setelah terinstal, buka terminal dan beri tahu Git siapa kamu. Ganti nama dan email di bawah ini dengan milikmu sendiri:', 
        code: 'git config --global user.name "Nama Kamu"\ngit config --global user.email "email@kamu.com"' 
      }
    ],
    usage: [
      { 
        title: 'Inisialisasi Git di Project', 
        desc: 'Buka terminal di dalam folder project kodemu, lalu jalankan perintah ini untuk mulai melacak folder tersebut menggunakan Git:', 
        code: 'git init' 
      },
      { 
        title: 'Menyimpan Perubahan (Commit)', 
        desc: 'Setiap kali kamu selesai membuat fitur, simpan perubahannya. Tambahkan semua file terlebih dahulu, lalu beri pesan yang jelas.', 
        code: 'git add .\ngit commit -m "Menambahkan fitur login"' 
      },
      { 
        title: 'Melihat Status File', 
        desc: 'Jika kamu bingung file apa saja yang baru diubah atau belum disimpan, jalankan perintah status:', 
        code: 'git status' 
      }
    ]
  },
  {
    id: 'docker',
    title: 'Docker',
    icon: '🐳',
    install: [
      { 
        title: 'Unduh Docker Desktop', 
        desc: 'Kunjungi docs.docker.com/get-docker/ dan unduh Docker Desktop. Docker berguna agar aplikasimu bisa berjalan konsisten di perangkat mana saja.' 
      },
      { 
        title: 'Persyaratan Khusus Windows (WSL 2)', 
        desc: 'Jika kamu menggunakan Windows, Docker biasanya meminta kamu untuk menginstal atau mengaktifkan WSL 2 (Windows Subsystem for Linux). Pastikan kamu menyetujuinya saat proses instalasi.' 
      },
      { 
        title: 'Verifikasi Instalasi', 
        desc: 'Buka Docker Desktop agar mesin Docker berjalan di latar belakang. Kemudian buka terminal dan cek versinya:', 
        code: 'docker --version' 
      }
    ],
    usage: [
      { 
        title: 'Menjalankan Container Pertama', 
        desc: 'Mari kita tes apakah Docker sudah berfungsi penuh dengan menjalankan "image" percobaan bernama hello-world:', 
        code: 'docker run hello-world' 
      },
      { 
        title: 'Melihat Container yang Aktif', 
        desc: 'Untuk melihat proses aplikasi (container) apa saja yang sedang berjalan di dalam Docker kamu saat ini:', 
        code: 'docker ps' 
      },
      { 
        title: 'Menghentikan Container', 
        desc: 'Jika ada container yang ingin dimatikan, cari ID-nya menggunakan perintah `docker ps`, lalu gunakan perintah stop:', 
        code: 'docker stop <container_id_disini>' 
      }
    ]
  }
];

export default function TutorialPage() {
  const [activeTabId, setActiveTabId] = useState<string>(tutorials[0].id);
  const [viewMode, setViewMode] = useState<'install' | 'usage'>('install');

  const activeTutorial = tutorials.find(t => t.id === activeTabId) || tutorials[0];
  const stepsToShow = viewMode === 'install' ? activeTutorial.install : activeTutorial.usage;

  // Title update
  useEffect(() => {
    document.title = 'Tutorial Setup Workspace | Coreline by AstByte';
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans relative overflow-x-hidden selection:bg-blue-500/30">
      
      {/* --- BACKGROUNDS (Matching Dashboard) --- */}
      <div className="fixed inset-0 opacity-[0.4] pointer-events-none z-0 bg-[linear-gradient(rgba(203,213,225,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(203,213,225,0.5)_1px,transparent_1px)] bg-[size:30px_30px]"></div>
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-gradient-to-b from-blue-100/50 to-transparent -z-10" />
      <div className="absolute top-20 right-0 w-96 h-96 bg-cyan-300/20 rounded-full blur-3xl pointer-events-none" />

      {/* --- MAIN CONTENT --- */}
      <main className="container mx-auto px-4 sm:px-6 py-10 relative z-10 flex-1 min-h-screen max-w-6xl">
        
        {/* Navigation / Back Button */}
        <div className="animate-fade-in-up mb-8">
          {/* Ganti <a> pakai <Link to="/"> kalau pakai react-router */}
          <a href="/" className="group flex items-center gap-2 text-slate-500 hover:text-blue-600 font-bold text-sm transition-colors bg-white px-4 py-2.5 rounded-full border border-slate-200 shadow-sm hover:shadow-md w-fit">
            <ArrowLeft className="w-4 h-4" /> Kembali ke Dashboard
          </a>
        </div>

        {/* Hero Section */}
        <div className="mb-10 animate-fade-in-up" style={{ animationDelay: '100ms' }}>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold mb-4 shadow-sm">
            <Sparkles className="w-4 h-4 text-blue-500" /> Panduan Pemula
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4 leading-tight">
            Persiapan <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-500">Workspace Ngoding</span>
          </h1>
          <p className="text-slate-600 max-w-2xl text-base font-medium leading-relaxed">
            Ikuti panduan langkah demi langkah ini untuk menginstal dan menggunakan berbagai tools yang wajib kamu miliki sebelum memulai course di Coreline.
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-8 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
          
          {/* Sidebar Navigation */}
          <aside className="w-full md:w-72 flex-shrink-0">
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-sm border border-slate-200 p-5 sticky top-24">
              <h2 className="text-xs font-extrabold text-slate-400 uppercase tracking-wider mb-4 px-2">Pilih Tools</h2>
              <nav className="space-y-2">
                {tutorials.map((tut) => (
                  <button
                    key={tut.id}
                    onClick={() => setActiveTabId(tut.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl text-left transition-all font-bold ${
                      activeTabId === tut.id
                        ? 'bg-blue-50 text-blue-700 border border-blue-200 shadow-sm'
                        : 'text-slate-600 hover:bg-slate-50 border border-transparent hover:border-slate-200'
                    }`}
                  >
                    <span className="text-2xl w-8 h-8 flex items-center justify-center drop-shadow-sm">{tut.icon}</span>
                    {tut.title}
                    {activeTabId === tut.id && <ChevronRight className="w-4 h-4 ml-auto text-blue-500" />}
                  </button>
                ))}
              </nav>
            </div>
          </aside>

          {/* Content Area */}
          <div className="flex-1">
            <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden relative">
              <div className="absolute right-0 top-0 w-64 h-full bg-gradient-to-l from-blue-500/5 to-transparent pointer-events-none"></div>

              {/* View Mode Toggle */}
              <div className="p-6 md:p-8 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
                <h2 className="text-2xl font-extrabold text-slate-900 flex items-center gap-3">
                  <Laptop className="w-6 h-6 text-blue-600" />
                  {activeTutorial.title}
                </h2>

                <div className="flex p-1 bg-slate-100 rounded-xl border border-slate-200 shrink-0">
                  <button
                    onClick={() => setViewMode('install')}
                    className={`flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-bold transition-all ${
                      viewMode === 'install'
                        ? 'bg-white text-blue-600 shadow-sm border border-slate-200/50'
                        : 'text-slate-500 hover:text-slate-700'
                    }`}
                  >
                    <Settings className="w-4 h-4" /> Instalasi
                  </button>
                  <button
                    onClick={() => setViewMode('usage')}
                    className={`flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-bold transition-all ${
                      viewMode === 'usage'
                        ? 'bg-white text-blue-600 shadow-sm border border-slate-200/50'
                        : 'text-slate-500 hover:text-slate-700'
                    }`}
                  >
                    <PlayCircle className="w-4 h-4" /> Penggunaan
                  </button>
                </div>
              </div>

              {/* Steps Rendering */}
              <div className="p-6 md:p-8 relative z-10">
                <div className="space-y-6">
                  {stepsToShow.map((step, index) => (
                    <div 
                      key={index} 
                      className="group relative bg-white border border-slate-200 hover:border-blue-300 rounded-2xl p-5 sm:p-6 transition-all duration-300 shadow-sm hover:shadow-md"
                    >
                      <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 sm:items-start">
                        {/* Number Badge */}
                        <div className="flex-shrink-0">
                          <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 border border-blue-200 flex items-center justify-center text-lg font-black shadow-sm group-hover:bg-blue-600 group-hover:text-white transition-colors">
                            {index + 1}
                          </div>
                        </div>
                        
                        {/* Step Details */}
                        <div className="flex-1">
                          <h3 className="text-lg font-extrabold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
                            {step.title}
                          </h3>
                          <p className="text-slate-600 mb-4 leading-relaxed font-medium">
                            {step.desc}
                          </p>
                          
                          {/* Code Block if exists */}
                          {step.code && (
                            <div className="bg-slate-900 rounded-xl p-4 overflow-x-auto shadow-inner border border-slate-800">
                              <div className="flex items-center gap-2 mb-3 border-b border-slate-700/50 pb-2">
                                <Terminal className="w-4 h-4 text-slate-400" />
                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Terminal / CLI</span>
                              </div>
                              <pre className="text-sm text-cyan-400 font-mono whitespace-pre-wrap">
                                <code>{step.code}</code>
                              </pre>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Footer Bantuan */}
                <div className="mt-8 bg-blue-50 border border-blue-200 rounded-2xl p-6 flex items-start sm:items-center gap-4">
                   <div className="p-3 bg-white rounded-full shadow-sm text-blue-600">
                     <CheckCircle className="w-6 h-6" />
                   </div>
                   <div>
                     <h4 className="text-sm font-extrabold text-slate-800 mb-1">Sudah selesai mengatur semuanya?</h4>
                     <p className="text-sm text-slate-600 font-medium">Jika kamu sudah berhasil mengikuti semua langkah di atas, kamu sudah siap seratus persen untuk melanjutkan materi belajar di Dashboard!</p>
                   </div>
                </div>

              </div>

            </div>
          </div>
        </div>
      </main>

      {/* Style Animations */}
      <style>{`
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fade-in-up { animation: fadeInUp 0.4s ease-out forwards; }
      `}</style>
    </div>
  );
}