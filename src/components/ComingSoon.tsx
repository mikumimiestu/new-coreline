// src/pages/ComingSoonPage.tsx
import { useState, useEffect } from 'react';
import {
  Rocket,
  ArrowLeft,
  Mail,
  Check,
  Sparkles,
  Construction,
  Bell,
} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function ComingSoonPage() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  useEffect(() => {
    document.title = 'Segera Hadir | Coreline by AstByte';
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus('loading');
    
    // Simulasi API call
    setTimeout(() => {
      setStatus('success');
      setEmail('');
    }, 1500);
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-[#0B0F19] text-white font-sans overflow-hidden selection:bg-blue-500/30">
      
      {/* BACKGROUND EFFECTS */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Top Blob */}
        <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-blue-600/20 rounded-full blur-[120px] animate-pulse" />
        {/* Bottom Blob */}
        <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[120px]" />
        
        {/* Grid Pattern Overlay */}
        <div 
          className="absolute inset-0 opacity-[0.03]" 
          style={{ 
            backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', 
            backgroundSize: '40px 40px' 
          }} 
        />
      </div>

      {/* NAVBAR SIMPLE */}
      <nav className="absolute top-0 w-full p-6 flex justify-between items-center z-20">
        <Link 
          to="/" 
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 transition-all text-sm font-medium text-slate-300 hover:text-white backdrop-blur-md"
        >
          <ArrowLeft className="w-4 h-4" />
          Kembali ke Beranda
        </Link>
        <div className="hidden sm:block font-bold text-lg tracking-tight text-white/50">
          ASTBYTE
        </div>
      </nav>

      {/* MAIN CONTENT CARD */}
      <main className="relative z-10 w-full max-w-3xl px-6 text-center">
        
        {/* Icon & Badge */}
        <div className="flex flex-col items-center animate-fade-in-up">
          <div className="relative mb-8 group cursor-default">
            <div className="absolute inset-0 bg-blue-500 blur-2xl opacity-20 group-hover:opacity-40 transition-opacity duration-500" />
            <div className="relative w-20 h-20 bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-3xl flex items-center justify-center shadow-2xl transform group-hover:scale-110 transition-transform duration-500">
              <Rocket className="w-10 h-10 text-blue-400" />
            </div>
            
            {/* Floating Elements */}
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-slate-800 rounded-xl border border-slate-700 flex items-center justify-center animate-bounce delay-700">
              <Sparkles className="w-4 h-4 text-amber-400" />
            </div>
            <div className="absolute -bottom-2 -left-2 w-8 h-8 bg-slate-800 rounded-xl border border-slate-700 flex items-center justify-center animate-bounce delay-1000">
              <Construction className="w-4 h-4 text-emerald-400" />
            </div>
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-widest mb-6">
            <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
            Under Construction
          </div>
        </div>

        {/* Headings */}
        <div className="space-y-6 mb-12 animate-fade-in-up" style={{ animationDelay: '100ms' }}>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-tight">
            Sesuatu yang <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">Luar Biasa</span> <br className="hidden sm:block" />
            Sedang Kami Racik.
          </h1>
          <p className="text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Kami sedang menyiapkan fitur baru untuk meningkatkan pengalaman belajar coding Anda. 
            Pantau terus, kami akan segera meluncur! 🚀
          </p>
        </div>

        {/* Waitlist Form */}
        <div className="max-w-md mx-auto animate-fade-in-up" style={{ animationDelay: '200ms' }}>
          {status === 'success' ? (
            <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex flex-col items-center gap-2 animate-scale-in">
              <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                <Check className="w-6 h-6" />
              </div>
              <p className="font-semibold text-emerald-100">Terima kasih! Kami akan memberi kabar.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl blur opacity-30 group-hover:opacity-75 transition duration-500" />
              <div className="relative flex items-center bg-slate-900 rounded-xl p-1.5 border border-slate-800">
                <div className="pl-4 text-slate-500">
                  <Mail className="w-5 h-5" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Masukkan email untuk notifikasi..."
                  className="flex-1 bg-transparent border-none text-white placeholder:text-slate-500 focus:ring-0 px-4 py-3 outline-none w-full"
                  required
                />
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold transition-all disabled:opacity-70 flex items-center gap-2"
                >
                  {status === 'loading' ? (
                    'Menyimpan...'
                  ) : (
                    <>
                      Kabari Saya <Bell className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
              <p className="mt-3 text-xs text-slate-500">
                *Kami tidak akan mengirim spam. Hanya update penting.
              </p>
            </form>
          )}
        </div>

        {/* Footer Stats / Social Proof */}
        <div className="mt-16 pt-8 border-t border-white/5 grid grid-cols-2 sm:grid-cols-3 gap-8 animate-fade-in-up" style={{ animationDelay: '300ms' }}>
          <div>
            <div className="text-2xl font-bold text-white">2.5k+</div>
            <div className="text-xs text-slate-500 uppercase tracking-wide font-medium mt-1">Student Waiting</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-white">99%</div>
            <div className="text-xs text-slate-500 uppercase tracking-wide font-medium mt-1">Completion</div>
          </div>
          <div className="col-span-2 sm:col-span-1">
            <div className="text-2xl font-bold text-white">Segera</div>
            <div className="text-xs text-slate-500 uppercase tracking-wide font-medium mt-1">Release Date</div>
          </div>
        </div>

      </main>

      {/* FOOTER */}
      <footer className="absolute bottom-6 text-center w-full z-10">
        <p className="text-xs text-slate-600">
          &copy; {new Date().getFullYear()} AstByte Technology. Making the future.
        </p>
      </footer>

      {/* Global Styles */}
      <style>{`
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes scale-in {
          from { opacity: 0; transform: scale(0.9); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
        }
        .animate-scale-in {
          animation: scale-in 0.4s ease-out forwards;
        }
      `}</style>
    </div>
  );
}