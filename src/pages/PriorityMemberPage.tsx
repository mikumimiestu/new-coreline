import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft, GraduationCap, Clock, CreditCard, 
  CheckCircle, MessageCircle, Calendar, ShieldCheck, 
  Target, Rocket, Code2, Database
} from 'lucide-react';

/* ================================
 * DATA PROGRAM BIMBINGAN (1 SEMESTER)
 * ================================ */
const PRIORITY_PROGRAMS = [
  {
    id: "frontend",
    title: "Frontend Mastery",
    icon: <Code2 className="w-8 h-8" />,
    desc: "Fokus menguasai UI/UX, React, Vue, hingga Next.js. Siap jadi Frontend Engineer dalam 6 bulan.",
    price: 3500000,
    color: "blue",
    features: [
      "HTML, CSS, JS Lanjutan",
      "React.js & Next.js",
      "State Management & API Integration",
      "Final Project: E-Commerce Web"
    ]
  },
  {
    id: "backend",
    title: "Backend & API",
    icon: <Database className="w-8 h-8" />,
    desc: "Kuasai arsitektur server, database, dan security. Belajar Node.js & Golang dari nol.",
    price: 3500000,
    color: "emerald",
    features: [
      "Node.js & Express / Golang",
      "SQL (PostgreSQL) & NoSQL",
      "Authentication & Security",
      "Final Project: Microservices API"
    ]
  },
  {
    id: "fullstack",
    title: "Fullstack Engineer",
    icon: <Rocket className="w-8 h-8" />,
    desc: "Program komprehensif dari Frontend hingga Backend + Dasar DevOps & Deployment.",
    price: 5000000,
    color: "purple",
    popular: true,
    features: [
      "Semua materi Frontend & Backend",
      "Docker & Basic CI/CD",
      "System Design Architecture",
      "Final Project: Full SaaS App"
    ]
  }
];

/* ================================
 * MAIN COMPONENT
 * ================================ */
export default function PriorityMemberPage() {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Bimbingan Prioritas | Coreline by AstByte";
  }, []);

  const formatRupiah = (angka: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(angka);
  };

  const handleRegisterWA = (programTitle?: string) => {
    const baseText = "Halo admin Coreline, saya tertarik untuk mendaftar program *Bimbingan Prioritas (1 Semester)*.";
    const programText = programTitle ? `\n\nSaya ingin mengambil program: *${programTitle}*.` : "";
    const askText = "\n\nMohon info lebih lanjut mengenai jadwal mulai kelas dan proses pembayaran DP 70%-nya. Terima kasih!";
    
    const waUrl = `https://wa.me/6285183209494?text=${encodeURIComponent(baseText + programText + askText)}`;
    window.open(waUrl, '_blank');
  };

  return (
    <div className="min-h-screen bg-sky-50 text-blue-950 font-bold font-sans selection:bg-blue-500/30 overflow-x-hidden relative flex flex-col">
      
      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 opacity-[0.4] bg-[linear-gradient(rgba(203,213,225,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(203,213,225,0.5)_1px,transparent_1px)] bg-[size:30px_30px]"></div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-gradient-to-b from-blue-200/40 via-purple-200/20 to-transparent blur-[100px]" />
      </div>

      {/* Navbar Minimalis */}
      <nav className="sticky top-0 z-40 w-full border-b border-blue-900 bg-white/80 backdrop-blur-xl shadow-[4px_4px_0px_#1e3a8a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <button onClick={() => navigate(-1)} className="group flex items-center gap-2 px-4 py-2 text-sm font-bold text-slate-500 hover:text-blue-600 transition-colors bg-white rounded-none border-2 border-blue-900 border-blue-900 shadow-[4px_4px_0px_#1e3a8a] hover:shadow-[4px_4px_0px_#1e3a8a]">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Kembali
          </button>
          
          <div className="flex items-center gap-2 bg-blue-50 border-2 border-blue-900 border-blue-900 px-4 py-2 rounded-none">
             <GraduationCap className="w-4 h-4 text-blue-600" />
             <span className="text-sm font-black text-blue-700 uppercase tracking-wider">Premium Bootcamp</span>
          </div>
        </div>
      </nav>

      <main className="relative z-10 max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8 flex-1 w-full">
        
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in-up">
           <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-none bg-slate-900 text-white text-xs font-black uppercase tracking-widest mb-6 shadow-[4px_4px_0px_#1e3a8a]">
              <Clock className="w-4 h-4 text-amber-400" /> Durasi 1 Semester (6 Bulan)
           </div>
           <h1 className="text-4xl sm:text-5xl font-extrabold text-blue-950 font-bold mb-6 tracking-tight leading-tight">
             Program Bimbingan <span className="text-transparent bg-clip-text bg-blue-600 border-2 border-blue-900 shadow-[4px_4px_0px_#1e3a8a] text-white hover:bg-blue-700 hover:shadow-[6px_6px_0px_#1e3a8a] hover:-translate-y-1 transition-all">Prioritas</span>
           </h1>
           <p className="text-blue-950 font-bold text-lg font-medium leading-relaxed">
             Belajar intensif layaknya *bootcamp* eksklusif. Kurikulum terstruktur, dimentori langsung oleh praktisi industri, dan jaminan *ready-to-work* setelah lulus.
           </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 animate-fade-in-up" style={{ animationDelay: '100ms' }}>
          {PRIORITY_PROGRAMS.map((program) => (
            <div key={program.id} className={`relative bg-white rounded-[2rem] border-2 border-blue-900 p-8 shadow-[4px_4px_0px_#1e3a8a] hover:shadow-[4px_4px_0px_#1e3a8a] transition-all duration-300 flex flex-col ${
              program.popular ? 'border-purple-300 ring-4 ring-purple-500/10 scale-105 md:scale-105 z-10' : 'border-blue-900 hover:border-blue-900'
            }`}>
              
              {program.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-600 border-2 border-blue-900 shadow-[4px_4px_0px_#1e3a8a] text-white hover:bg-blue-700 hover:shadow-[6px_6px_0px_#1e3a8a] hover:-translate-y-1 transition-all text-white text-xs font-black px-4 py-1.5 rounded-none shadow-[4px_4px_0px_#1e3a8a] uppercase tracking-wider whitespace-nowrap">
                  Paling Diminati
                </div>
              )}

              <div className="mb-6">
                <div className={`w-16 h-16 rounded-none flex items-center justify-center mb-6 shadow-[4px_4px_0px_#1e3a8a] ${
                  program.color === 'blue' ? 'bg-blue-50 text-blue-600' :
                  program.color === 'emerald' ? 'bg-emerald-50 text-emerald-600' :
                  'bg-purple-50 text-purple-600'
                }`}>
                  {program.icon}
                </div>
                <h2 className="text-2xl font-black text-blue-950 font-bold mb-2">{program.title}</h2>
                <p className="text-sm text-slate-500 font-medium leading-relaxed min-h-[60px]">
                  {program.desc}
                </p>
              </div>

              <div className="mb-8 border-t border-blue-900 pt-6">
                <div className="text-sm font-bold text-slate-400 mb-1 uppercase tracking-wider">Total Investasi</div>
                <div className="text-3xl font-extrabold text-blue-950 font-bold tracking-tight">
                  {formatRupiah(program.price)}
                </div>
                <div className="mt-2 text-xs font-bold text-amber-600 bg-amber-50 inline-block px-2.5 py-1 rounded-none border-2 border-blue-900 border-amber-200">
                  DP Mulai {formatRupiah(program.price * 0.7)} (70%)
                </div>
              </div>

              <div className="flex-1 mb-8">
                <ul className="space-y-4">
                  {program.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm font-medium text-blue-950 font-bold">
                      <CheckCircle className={`w-5 h-5 shrink-0 ${
                        program.color === 'blue' ? 'text-blue-500' :
                        program.color === 'emerald' ? 'text-emerald-500' :
                        'text-purple-500'
                      }`} />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <button 
                onClick={() => handleRegisterWA(program.title)}
                className={`w-full py-4 rounded-none font-bold transition-all shadow-[4px_4px_0px_#1e3a8a] active:scale-95 flex items-center justify-center gap-2 ${
                  program.popular 
                    ? 'bg-blue-600 border-2 border-blue-900 shadow-[4px_4px_0px_#1e3a8a] text-white hover:bg-blue-700 hover:shadow-[6px_6px_0px_#1e3a8a] hover:-translate-y-1 transition-all text-white hover:shadow-[6px_6px_0px_#1e3a8a] hover:-translate-y-1 hover:-translate-x-1 transition-all/30' 
                    : 'bg-slate-900 text-white hover:bg-slate-800'
                }`}
              >
                <MessageCircle className="w-5 h-5" /> Daftar via WhatsApp
              </button>
            </div>
          ))}
        </div>

        {/* Section Penjelasan Cicilan */}
        <div className="max-w-4xl mx-auto bg-white rounded-none border-2 border-blue-900 border-blue-900 p-8 sm:p-10 shadow-[4px_4px_0px_#1e3a8a] animate-fade-in-up" style={{ animationDelay: '200ms' }}>
           <div className="flex flex-col md:flex-row gap-8 items-center">
              
              <div className="shrink-0 w-24 h-24 bg-blue-50 rounded-none flex items-center justify-center border-2 border-blue-900 border-blue-900">
                 <CreditCard className="w-12 h-12 text-blue-600" />
              </div>
              
              <div className="flex-1 text-center md:text-left">
                 <h3 className="text-2xl font-extrabold text-blue-950 font-bold mb-3">
                   Sistem Pembayaran Fleksibel (Cicilan)
                 </h3>
                 <p className="text-blue-950 font-bold font-medium leading-relaxed mb-6">
                   Kami paham investasi pendidikan itu penting. Oleh karena itu, Coreline memberikan opsi cicilan yang sangat bersahabat agar kamu bisa fokus belajar tanpa beban di awal.
                 </p>
                 
                 <div className="grid sm:grid-cols-2 gap-4">
                    <div className="bg-sky-50 border-2 border-blue-900 border-blue-900 rounded-none p-5 relative overflow-hidden">
                       <div className="absolute top-0 right-0 w-16 h-16 bg-blue-100 rounded-none blur-xl -mr-8 -mt-8"></div>
                       <div className="flex items-center gap-2 mb-2 relative z-10">
                          <span className="w-6 h-6 rounded-none bg-blue-600 text-white text-xs font-black flex items-center justify-center">1</span>
                          <h4 className="font-bold text-blue-950 font-bold">Pembayaran DP</h4>
                       </div>
                       <p className="text-sm text-blue-950 font-bold font-medium relative z-10">
                         Minimal <b className="text-blue-950 font-bold">70%</b> dari total biaya program untuk booking kursi dan akses awal materi.
                       </p>
                    </div>

                    <div className="bg-sky-50 border-2 border-blue-900 border-blue-900 rounded-none p-5 relative overflow-hidden">
                       <div className="absolute top-0 right-0 w-16 h-16 bg-amber-100 rounded-none blur-xl -mr-8 -mt-8"></div>
                       <div className="flex items-center gap-2 mb-2 relative z-10">
                          <span className="w-6 h-6 rounded-none bg-amber-500 text-white text-xs font-black flex items-center justify-center">2</span>
                          <h4 className="font-bold text-blue-950 font-bold">Pelunasan</h4>
                       </div>
                       <p className="text-sm text-blue-950 font-bold font-medium relative z-10">
                         Sisa biaya (30%) dilunasi pada <b className="text-blue-950 font-bold">cicilan kedua</b> (Bulan ke-2 pembelajaran).
                       </p>
                    </div>
                 </div>
              </div>

           </div>
        </div>

        {/* Info Pendaftaran Bawah */}
        <div className="mt-12 text-center max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: '300ms' }}>
           <ShieldCheck className="w-10 h-10 text-emerald-500 mx-auto mb-4" />
           <h4 className="text-lg font-bold text-blue-950 font-bold mb-2">Kuota Terbatas Setiap Semesternya!</h4>
           <p className="text-slate-500 text-sm font-medium mb-6">
             Untuk menjaga kualitas mentoring, kami membatasi jumlah siswa per batch kelas bimbingan prioritas. Amankan kursimu sekarang melalui WhatsApp resmi kami.
           </p>
           <button 
             onClick={() => handleRegisterWA()}
             className="inline-flex items-center gap-2 px-8 py-4 bg-slate-900 hover:bg-slate-800 text-white rounded-none font-bold transition-all shadow-[4px_4px_0px_#1e3a8a] hover:shadow-[4px_4px_0px_#1e3a8a] hover:-translate-y-1"
           >
             <MessageCircle className="w-5 h-5" /> Konsultasi Program ke Admin
           </button>
        </div>

      </main>

      <style>{`
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fade-in-up { animation: fadeInUp 0.5s ease-out forwards; }
      `}</style>
    </div>
  );
}