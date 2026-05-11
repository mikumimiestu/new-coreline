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
    title: 'Visual Studio Code',
    icon: '💻',
    install: [
      { 
        title: '1. Unduh Installer Resmi', 
        desc: 'Buka browser dan kunjungi https://code.visualstudio.com. Klik tombol besar bertuliskan "Download for Windows" atau pilih versi untuk Mac/Linux. Tunggu hingga file .exe atau .dmg selesai diunduh sepenuhnya.' 
      },
      { 
        title: '2. Menjalankan Instalasi', 
        desc: 'Buka file yang baru saja diunduh. Klik "I accept the agreement". Klik "Next" terus-menerus. PENTING: Saat sampai di halaman "Select Additional Tasks", centang SEMUA kotak yang tersedia, termasuk "Add to PATH" dan "Open with Code". Lalu klik Install.' 
      },
      {
        title: '3. Verifikasi & Halaman Sambutan',
        desc: 'Setelah selesai, klik "Finish" untuk membuka VS Code. Jika kamu melihat jendela dengan tema gelap dan tulisan "Get Started", berarti instalasi kamu berhasil!'
      }
    ],
    usage: [
      { 
        title: '1. Membuat Ruang Kerja (Workspace)', 
        desc: 'Buatlah folder baru di komputer kamu (misal: "Belajar-Coding"). Di VS Code, klik menu "File" > "Open Folder", lalu pilih folder tersebut. Sekarang kamu punya tempat untuk menyimpan semua kodemu.' 
      },
      { 
        title: '2. Membuat File Pertama', 
        desc: 'Klik ikon "New File" di kolom kiri (Explorer) atau tekan Ctrl+N. Beri nama file tersebut `index.html`. Ketikkan tanda seru (!) lalu tekan Enter untuk membuat struktur HTML otomatis. Jangan lupa tekan Ctrl+S untuk simpan.' 
      },
      { 
        title: '3. Memasang Ekstensi "Live Server"', 
        desc: 'Klik ikon kotak-kotak di menu kiri (Extensions). Cari "Live Server" oleh Ritwick Dey, lalu klik Install. Ini berguna agar kamu bisa melihat hasil kodemu di browser secara otomatis setiap kali file disimpan.' 
      }
    ]
  },
  {
    id: 'python',
    title: 'Python (Backend)',
    icon: '🐍',
    install: [
      { 
        title: '1. Persiapan Unduhan', 
        desc: 'Buka https://www.python.org/downloads/. Klik tombol kuning "Download Python 3.x.x". Pastikan kamu tidak mengunduh versi yang terlalu lama (dibawah versi 3.10).' 
      },
      { 
        title: '2. Pemasangan & Konfigurasi PATH', 
        desc: 'Jalankan installer. SEBELUM klik "Install Now", kamu WAJIB mencentang kotak "Add Python to PATH" di bagian paling bawah. Ini agar komputer kamu mengenali perintah python di terminal. Jika sudah, baru klik Install Now.' 
      },
      { 
        title: '3. Tes Melalui Terminal', 
        desc: 'Tekan tombol Windows di keyboard, ketik "cmd" dan Enter. Di jendela hitam yang muncul, ketik perintah di bawah ini. Jika muncul angka versi Python, selamat kamu berhasil!', 
        code: 'python --version' 
      }
    ],
    usage: [
      { 
        title: '1. Menyiapkan Script', 
        desc: 'Di VS Code, buat file baru bernama `hello.py`. Ketik kode: `nama = input("Siapa namamu? "); print("Halo " + nama)`. Simpan file tersebut.' 
      },
      { 
        title: '2. Eksekusi Program', 
        desc: 'Buka Terminal di VS Code (Ctrl+`). Ketik perintah di bawah ini untuk menjalankan programmu. Masukkan namamu saat diminta dan lihat hasilnya!', 
        code: 'python hello.py' 
      }
    ]
  },
  {
    id: 'nodejs',
    title: 'Node.js (JavaScript)',
    icon: '🌐',
    install: [
      { 
        title: '1. Memilih Versi LTS', 
        desc: 'Kunjungi https://nodejs.org. Kamu akan melihat dua pilihan: LTS dan Current. PILIH LTS (Long Term Support) karena ini adalah versi paling stabil dan jarang error untuk belajar.' 
      },
      { 
        title: '2. Proses Wizard', 
        desc: 'Jalankan installer. Klik "Next" untuk semua tahap. Jika muncul pilihan "Automatically install the necessary tools", biarkan kosong saja (opsional) agar proses lebih cepat. Klik Install.' 
      },
      { 
        title: '3. Verifikasi Command Line', 
        desc: 'Buka terminal/CMD, lalu ketik perintah berikut untuk memastikan Node.js dan NPM (pengelola paket) sudah aktif:', 
        code: 'node -v\nnpm -v' 
      }
    ],
    usage: [
      { 
        title: '1. Inisialisasi Project', 
        desc: 'Masuk ke folder projectmu di terminal, lalu jalankan perintah ini untuk membuat file konfigurasi `package.json`. Ini adalah identitas dari project Node.js kamu.', 
        code: 'npm init -y' 
      },
      { 
        title: '2. Mengelola Library (NPM)', 
        desc: 'Jika kamu butuh fitur tambahan, gunakan NPM. Contoh, mari instal library "colors" agar terminalmu bisa berwarna:', 
        code: 'npm install colors' 
      }
    ]
  },
  {
    id: 'git',
    title: 'Git (Version Control)',
    icon: '📦',
    install: [
      { 
        title: '1. Unduh Git SCM', 
        desc: 'Buka https://git-scm.com. Download versi terbaru. Untuk Windows, pilih "64-bit Git for Windows Setup".' 
      },
      { 
        title: '2. Pengaturan Default Editor', 
        desc: 'Saat instalasi, akan muncul banyak pilihan. Saat ditanya "Choosing the default editor used by Git", pilih "Use Visual Studio Code as Git\'s default editor". Sisanya biarkan default (klik Next sampai akhir).' 
      },
      { 
        title: '3. Identitas Global', 
        desc: 'Buka terminal dan jalankan dua perintah ini agar Git tahu siapa yang menulis kode. Gunakan nama dan email aslimu:', 
        code: 'git config --global user.name "Nama Lengkapmu"\ngit config --global user.email "email@kamu.com"' 
      }
    ],
    usage: [
      { 
        title: '1. Membuat Repositori', 
        desc: 'Di terminal folder projectmu, jalankan perintah ini. Sekarang Git akan mulai memantau setiap perubahan karakter yang kamu ketik.', 
        code: 'git init' 
      },
      { 
        title: '2. Menandai & Menyimpan (Commit)', 
        desc: 'Gunakan perintah ini untuk "memotret" kondisi kodemu saat ini sebagai backup.', 
        code: 'git add .\ngit commit -m "Latihan pertama saya"' 
      }
    ]
  },
  {
    id: 'db',
    title: 'Database GUI',
    icon: '🗄️',
    install: [
      { 
        title: '1. Unduh DBeaver Community', 
        desc: 'Kunjungi https://dbeaver.io/download/. Pilih "Windows 64 bit (installer)" atau versi macOS sesuai laptopmu. Pastikan pilih versi Community (Gratis).' 
      },
      { 
        title: '2. Jalankan Installer', 
        desc: 'Buka installer, pilih bahasa, klik Next. Jika ditanya komponen, biarkan default dan klik Install. DBeaver akan otomatis menyertakan driver Java yang dibutuhkan.' 
      }
    ],
    usage: [
      { 
        title: '1. Koneksi Pertama', 
        desc: 'Buka DBeaver. Klik ikon "Colokan Listrik" di pojok kiri atas. Pilih "MySQL" (atau database yang kamu pelajari di Coreline). Klik Next.' 
      },
      { 
        title: '2. Database Settings', 
        desc: 'Masukkan Server Host (biasanya localhost), Username (root), dan Password database kamu. Klik "Test Connection". Jika muncul pesan "Connected", klik Finish.' 
      }
    ]
  },
  {
    id: 'api',
    title: 'Postman (API)',
    icon: '🚀',
    install: [
      { 
        title: '1. Unduh App Desktop', 
        desc: 'Kunjungi https://www.postman.com/downloads/. Sebenarnya ada versi web, tapi versi Desktop jauh lebih stabil dan bisa mengakses server lokal (localhost) dengan lebih mudah.' 
      },
      { 
        title: '2. Instalasi & Akun', 
        desc: 'Jalankan installer. Kamu bisa klik "Skip and go to the app" jika tidak ingin membuat akun sekarang, tapi membuat akun disarankan agar data tes kamu tidak hilang.' 
      }
    ],
    usage: [
      { 
        title: '1. Membuat Request', 
        desc: 'Klik ikon (+) di tengah layar. Di kolom URL, masukkan alamat API (contoh: https://jsonplaceholder.typicode.com/posts). Pastikan sebelah kiri URL bertuliskan GET.' 
      },
      { 
        title: '2. Analisis Response', 
        desc: 'Klik tombol biru "Send". Di bagian bawah layar (Response), kamu akan melihat data berupa JSON. Jika muncul angka 200 OK, berarti API tersebut berjalan normal.' 
      }
    ]
  },
  {
    id: 'coreline',
    title: 'Panduan Platform',
    icon: '🚀',
    install: [
      { 
        title: '1. Navigasi Dashboard', 
        desc: 'Dashboard adalah pusat belajarmu. Di sini kamu bisa melihat daftar semua course yang tersedia, dari dasar hingga advanced.' 
      },
      { 
        title: '2. Membaca Materi', 
        desc: 'Klik pada salah satu course untuk mulai membaca materi. Materi disusun secara sistematis agar mudah dipahami oleh pemula.' 
      }
    ],
    usage: [
      { 
        title: '1. Mengambil Quiz', 
        desc: 'Setiap modul memiliki quiz. Selesaikan quiz dengan nilai minimal untuk membuka progres modul berikutnya.' 
      },
      { 
        title: '2. Konsultasi AI (Gemma)', 
        desc: 'Gunakan fitur Gemma 4 31B Chat untuk bertanya tentang kode yang sulit. Gemma tahu progres belajarmu dan akan memberikan jawaban yang personal.' 
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
    <div className="min-h-screen bg-sky-50 text-blue-950 font-bold font-sans relative overflow-x-hidden selection:bg-blue-500/30">
      
      {/* --- BACKGROUNDS (Matching Dashboard) --- */}
      <div className="fixed inset-0 opacity-[0.4] pointer-events-none z-0 bg-[linear-gradient(rgba(203,213,225,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(203,213,225,0.5)_1px,transparent_1px)] bg-[size:30px_30px]"></div>
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-gradient-to-b from-blue-100/50 to-transparent -z-10" />
      <div className="absolute top-20 right-0 w-96 h-96 bg-cyan-300/20 rounded-none blur-3xl pointer-events-none" />

      {/* --- MAIN CONTENT --- */}
      <main className="container mx-auto px-4 sm:px-6 py-10 relative z-10 flex-1 min-h-screen max-w-6xl">
        
        {/* Navigation / Back Button */}
        <div className="animate-fade-in-up mb-8">
          {/* Ganti <a> pakai <Link to="/"> kalau pakai react-router */}
          <a href="/" className="group flex items-center gap-2 text-slate-500 hover:text-blue-600 font-bold text-sm transition-colors bg-white px-4 py-2.5 rounded-none border-2 border-blue-900 border-blue-900 shadow-[4px_4px_0px_#1e3a8a] hover:shadow-[4px_4px_0px_#1e3a8a] w-fit">
            <ArrowLeft className="w-4 h-4" /> Kembali ke Dashboard
          </a>
        </div>

        {/* Hero Section */}
        <div className="mb-10 animate-fade-in-up" style={{ animationDelay: '100ms' }}>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-none bg-blue-50 border-2 border-blue-900 border-blue-900 text-blue-700 text-xs font-bold mb-4 shadow-[4px_4px_0px_#1e3a8a]">
            <Sparkles className="w-4 h-4 text-blue-500" /> Panduan Pemula
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-blue-950 font-bold mb-4 leading-tight">
            Persiapan <span className="bg-clip-text text-transparent bg-blue-600 border-2 border-blue-900 shadow-[4px_4px_0px_#1e3a8a] text-white hover:bg-blue-700 hover:shadow-[6px_6px_0px_#1e3a8a] hover:-translate-y-1 transition-all">Workspace Ngoding</span>
          </h1>
          <p className="text-blue-950 font-bold max-w-2xl text-base font-medium leading-relaxed">
            Ikuti panduan langkah demi langkah ini untuk menginstal dan menggunakan berbagai tools yang wajib kamu miliki sebelum memulai course di Coreline.
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-8 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
          
          {/* Sidebar Navigation */}
          <aside className="w-full md:w-72 flex-shrink-0">
            <div className="bg-white/80 backdrop-blur-xl rounded-none shadow-[4px_4px_0px_#1e3a8a] border-2 border-blue-900 border-blue-900 p-5 sticky top-24">
              <h2 className="text-xs font-extrabold text-slate-400 uppercase tracking-wider mb-4 px-2">Pilih Tools</h2>
              <nav className="space-y-2">
                {tutorials.map((tut) => (
                  <button
                    key={tut.id}
                    onClick={() => setActiveTabId(tut.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-none text-left transition-all font-bold ${
                      activeTabId === tut.id
                        ? 'bg-blue-50 text-blue-700 border-2 border-blue-900 border-blue-900 shadow-[4px_4px_0px_#1e3a8a]'
                        : 'text-blue-950 font-bold hover:bg-sky-50 border-2 border-blue-900 border-blue-900 hover:border-blue-900'
                    }`}
                  >
                    <span className="text-2xl w-8 h-8 flex items-center justify-center drop-shadow-[4px_4px_0px_#1e3a8a]">{tut.icon}</span>
                    {tut.title}
                    {activeTabId === tut.id && <ChevronRight className="w-4 h-4 ml-auto text-blue-500" />}
                  </button>
                ))}
              </nav>
            </div>
          </aside>

          {/* Content Area */}
          <div className="flex-1">
            <div className="bg-white rounded-none shadow-[4px_4px_0px_#1e3a8a] border-2 border-blue-900 border-blue-900 overflow-hidden relative">
              <div className="absolute right-0 top-0 w-64 h-full bg-gradient-to-l from-blue-500/5 to-transparent pointer-events-none"></div>

              {/* View Mode Toggle */}
              <div className="p-6 md:p-8 border-b border-blue-900 flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
                <h2 className="text-2xl font-extrabold text-blue-950 font-bold flex items-center gap-3">
                  <Laptop className="w-6 h-6 text-blue-600" />
                  {activeTutorial.title}
                </h2>

                <div className="flex p-1 bg-sky-100 rounded-none border-2 border-blue-900 border-blue-900 shrink-0">
                  <button
                    onClick={() => setViewMode('install')}
                    className={`flex items-center gap-2 px-5 py-2 rounded-none text-sm font-bold transition-all ${
                      viewMode === 'install'
                        ? 'bg-white text-blue-600 shadow-[4px_4px_0px_#1e3a8a] border-2 border-blue-900 border-blue-900'
                        : 'text-slate-500 hover:text-blue-950 font-bold'
                    }`}
                  >
                    <Settings className="w-4 h-4" /> Instalasi
                  </button>
                  <button
                    onClick={() => setViewMode('usage')}
                    className={`flex items-center gap-2 px-5 py-2 rounded-none text-sm font-bold transition-all ${
                      viewMode === 'usage'
                        ? 'bg-white text-blue-600 shadow-[4px_4px_0px_#1e3a8a] border-2 border-blue-900 border-blue-900'
                        : 'text-slate-500 hover:text-blue-950 font-bold'
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
                      className="group relative bg-white border-2 border-blue-900 border-blue-900 hover:border-blue-900 rounded-none p-5 sm:p-6 transition-all duration-300 shadow-[4px_4px_0px_#1e3a8a] hover:shadow-[4px_4px_0px_#1e3a8a]"
                    >
                      <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 sm:items-start">
                        {/* Number Badge */}
                        <div className="flex-shrink-0">
                          <div className="w-12 h-12 rounded-none bg-blue-50 text-blue-600 border-2 border-blue-900 border-blue-900 flex items-center justify-center text-lg font-black shadow-[4px_4px_0px_#1e3a8a] group-hover:bg-blue-600 group-hover:text-white transition-colors">
                            {index + 1}
                          </div>
                        </div>
                        
                        {/* Step Details */}
                        <div className="flex-1">
                          <h3 className="text-lg font-extrabold text-blue-950 font-bold mb-2 group-hover:text-blue-600 transition-colors">
                            {step.title}
                          </h3>
                          <p className="text-blue-950 font-bold mb-4 leading-relaxed font-medium">
                            {step.desc}
                          </p>
                          
                          {/* Code Block if exists */}
                          {step.code && (
                            <div className="bg-slate-900 rounded-none p-4 overflow-x-auto shadow-[4px_4px_0px_#1e3a8a] border-2 border-blue-900 border-blue-900">
                              <div className="flex items-center gap-2 mb-3 border-b border-blue-900 pb-2">
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
                <div className="mt-8 bg-blue-50 border-2 border-blue-900 border-blue-900 rounded-none p-6 flex items-start sm:items-center gap-4">
                   <div className="p-3 bg-white rounded-none shadow-[4px_4px_0px_#1e3a8a] text-blue-600">
                     <CheckCircle className="w-6 h-6" />
                   </div>
                   <div>
                     <h4 className="text-sm font-extrabold text-blue-950 font-bold mb-1">Sudah selesai mengatur semuanya?</h4>
                     <p className="text-sm text-blue-950 font-bold font-medium">Jika kamu sudah berhasil mengikuti semua langkah di atas, kamu sudah siap seratus persen untuk melanjutkan materi belajar di Dashboard!</p>
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