import { useState, useRef } from 'react';
import {
  Lock, AlertCircle, Loader2, Check, MessageCircle, ArrowRight,
  Sparkles, Shield, Code2, Trophy, Users, BookOpen, WifiOff,
  Layout, ChevronLeft
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import ReCAPTCHA from 'react-google-recaptcha';

const RECAPTCHA_SITE_KEY = '6LcHoB0sAAAAAGwuOnnHNhKOHBfdai_JbmB0118Z';

export default function LoginPage() {
  const [showForm, setShowForm] = useState(false);
  const [mode, setMode] = useState<'email' | 'publicId'>('email');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [publicId, setPublicId] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);

  const { login } = useAuth();
  const recaptchaRef = useRef<ReCAPTCHA>(null);

  const waHref = 'https://api.whatsapp.com/send/?phone=6285183209494&text=Halo+AstByte%2C+saya+ingin+mendapatkan+informasi+tentang+Coreline.&type=phone_number&app_absent=0';

  const onRecaptchaChange = (token: string | null) => {
    setRecaptchaToken(token);
    if (error && error.includes('reCAPTCHA')) setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!recaptchaToken) {
      setError('Mohon centang "I\'m not a robot" terlebih dahulu.');
      return;
    }

    try {
      let url = '';
      let body: any = {};

      if (mode === 'email') {
        const trimmedUser = username.trim().toLowerCase();
        if (!trimmedUser || !password) {
          setError('Username Astbyte dan password wajib diisi.');
          return;
        }
        const email = `${trimmedUser}@astbyte.com`;
        url = 'https://authx.astbyte.com/api/auth/login';
        body = { email, password };
      } else {
        const trimmedPublicId = publicId.trim();
        if (!trimmedPublicId) {
          setError('Public ID wajib diisi.');
          return;
        }
        url = 'https://authx.astbyte.com/api/auth/login/public-id';
        body = { public_id: trimmedPublicId };
      }

      setLoading(true);
      body.recaptcha_token = recaptchaToken;

      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      let data: any = null;
      try { data = await res.json(); } catch { data = null; }

      if (!res.ok) {
        const backendMessage = data?.message;
        const fallback = mode === 'email' ? 'Login gagal.' : 'ID tidak ditemukan.';
        setError(backendMessage || fallback);
        recaptchaRef.current?.reset();
        setRecaptchaToken(null);
        return;
      }

      const token = data?.data?.token;
      if (!token) {
        setError('Token tidak valid.');
        return;
      }

      localStorage.setItem('astbyte_token', token); // Konsisten nama token dgn page lain
      const ok = await login(token);
      
      if (!ok) {
        setError('Gagal inisialisasi sesi.');
        return;
      }

      setIsSuccess(true);
      setTimeout(() => { window.location.href = '/'; }, 1500);

    } catch (err) {
      console.error(err);
      setError('Terjadi kesalahan koneksi.');
      recaptchaRef.current?.reset();
      setRecaptchaToken(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#0F172A] text-slate-200 font-sans selection:bg-blue-500/30">
      
      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-blue-600/10 blur-[100px] animate-pulse" />
        <div className="absolute -bottom-16 -left-16 h-96 w-96 rounded-full bg-indigo-600/10 blur-[100px]" />
      </div>

      <div className="relative container mx-auto px-4 py-8 md:py-12 min-h-screen flex flex-col justify-center">
        <div className="mx-auto max-w-6xl w-full">
          
          {/* Header */}
          <header className="mb-10 text-center">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 shadow-lg shadow-blue-500/20 animate-float">
              <img src="/icon.png" alt="Logo" className="h-8 w-8 brightness-0 invert" />
            </div>
            <h1 className="mb-2 text-3xl font-black tracking-tight text-white md:text-4xl">
              Welcome to <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">Coreline</span>
            </h1>
            <p className="text-slate-400 font-medium">
              Platform Pembelajaran Coding Interaktif by AstByte
            </p>
          </header>

          {/* Main Layout */}
          <div className="grid items-stretch gap-6 md:grid-cols-2 md:gap-8 max-w-5xl mx-auto">
            
            {/* LEFT: Login Form */}
            <div className="relative group animate-slide-in-left">
               {/* Card Glow Border */}
              <div className="absolute -inset-0.5 bg-gradient-to-br from-blue-500/20 to-indigo-500/20 rounded-3xl blur opacity-75 group-hover:opacity-100 transition duration-1000"></div>
              
              <div className="relative h-full bg-slate-900/90 backdrop-blur-xl border border-slate-800 rounded-2xl p-6 md:p-8 shadow-2xl">
                {!showForm ? (
                  // STATE 1: Initial
                  <div className="h-full flex flex-col justify-center space-y-6 animate-fade-in">
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-xl bg-slate-800 flex items-center justify-center border border-slate-700">
                        <Lock className="h-6 w-6 text-blue-500" />
                      </div>
                      <div>
                        <h2 className="text-xl font-bold text-white">Login Account</h2>
                        <p className="text-sm text-slate-400">Masuk untuk melanjutkan belajar</p>
                      </div>
                    </div>

                    <div className="py-6">
                      <button
                        onClick={() => setShowForm(true)}
                        className="group relative w-full flex items-center justify-center gap-3 bg-white hover:bg-slate-100 text-slate-900 px-6 py-4 rounded-xl font-bold text-base transition-all transform hover:-translate-y-1 shadow-xl shadow-white/5"
                      >
                        <span>Login dengan</span>
                        <img src="/icon2.png" alt="Astbyte" className="h-5 w-auto" />
                        <ArrowRight className="w-5 h-5 ml-auto opacity-0 group-hover:opacity-100 transition-opacity absolute right-4 text-slate-400" />
                      </button>
                    </div>

                    <div className="mt-auto bg-slate-950/50 rounded-xl p-5 border border-slate-800 text-center">
                      <p className="text-sm font-medium text-slate-400 mb-3">Belum punya akun Astbyte?</p>
                      <a
                        href="https://axid.astbyte.com/"
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 font-bold text-sm hover:underline"
                      >
                        Daftar Gratis Sekarang <ArrowRight className="h-4 w-4" />
                      </a>
                    </div>
                  </div>
                ) : (
                  // STATE 2: Form Input
                  <div className="animate-fade-in">
                    <button
                      onClick={() => { setShowForm(false); setError(''); }}
                      className="mb-6 flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-white transition-colors"
                    >
                      <ChevronLeft className="w-4 h-4" /> Kembali
                    </button>

                    <div className="mb-6">
                       <h2 className="text-2xl font-black text-white mb-1">Welcome Back!</h2>
                       <p className="text-slate-400 text-sm">Masukkan kredensial akun AstByte Anda.</p>
                    </div>

                    {isSuccess && (
                       <div className="mb-4 p-3 bg-green-500/10 border border-green-500/20 rounded-xl flex items-center gap-3 text-green-400 font-bold text-sm animate-bounce-in">
                          <Check className="w-5 h-5" /> Login berhasil! Mengalihkan...
                       </div>
                    )}

                    {/* Toggle */}
                    <div className="grid grid-cols-2 gap-2 p-1 bg-slate-950 rounded-xl mb-6 border border-slate-800">
                      <button
                        type="button"
                        onClick={() => { setMode('email'); setError(''); }}
                        className={`py-2 text-sm font-bold rounded-lg transition-all ${mode === 'email' ? 'bg-slate-800 text-white shadow' : 'text-slate-500 hover:text-slate-300'}`}
                      >
                        Email
                      </button>
                      <button
                        type="button"
                        onClick={() => { setMode('publicId'); setError(''); }}
                        className={`py-2 text-sm font-bold rounded-lg transition-all ${mode === 'publicId' ? 'bg-slate-800 text-white shadow' : 'text-slate-500 hover:text-slate-300'}`}
                      >
                        Public ID
                      </button>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                      {mode === 'email' ? (
                        <>
                           <div className="space-y-1.5">
                              <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Username</label>
                              <div className="relative group">
                                <input
                                  type="text"
                                  value={username}
                                  onChange={(e) => setUsername(e.target.value.toLowerCase().replace('@astbyte.com', ''))}
                                  placeholder="username"
                                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3.5 text-white placeholder:text-slate-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all outline-none"
                                />
                                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 text-sm font-medium">@astbyte.com</span>
                              </div>
                           </div>
                           <div className="space-y-1.5">
                              <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Password</label>
                              <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3.5 text-white placeholder:text-slate-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all outline-none"
                              />
                           </div>
                        </>
                      ) : (
                        <div className="space-y-1.5">
                           <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Public ID</label>
                           <input
                              type="text"
                              value={publicId}
                              onChange={(e) => setPublicId(e.target.value)}
                              placeholder="Contoh: 3f4a6b2c..."
                              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3.5 text-white placeholder:text-slate-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all outline-none"
                           />
                           <p className="text-xs text-slate-500">ID dapat dilihat di pengaturan akun AstByte.</p>
                        </div>
                      )}

                      <div className="flex justify-center pt-2">
                         <ReCAPTCHA ref={recaptchaRef} sitekey={RECAPTCHA_SITE_KEY} onChange={onRecaptchaChange} theme="dark" />
                      </div>

                      {error && (
                         <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl flex items-start gap-3 text-red-400 text-sm font-medium animate-shake">
                            <AlertCircle className="w-5 h-5 shrink-0" />
                            {error}
                         </div>
                      )}

                      <button
                        type="submit"
                        disabled={loading || isSuccess || !recaptchaToken}
                        className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-blue-600/20 transition-all transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                      >
                         {loading ? <Loader2 className="w-5 h-5 animate-spin"/> : "Masuk Sekarang"}
                         {!loading && <ArrowRight className="w-5 h-5"/>}
                      </button>
                    </form>
                  </div>
                )}
              </div>
            </div>

            {/* RIGHT: Features */}
            <div className="relative animate-slide-in-right">
              <div className="h-full bg-gradient-to-br from-blue-900 to-indigo-950 rounded-2xl p-8 border border-blue-800/50 shadow-2xl relative overflow-hidden">
                 {/* Decor */}
                 <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>

                 <div className="relative z-10">
                    <h3 className="text-2xl font-black text-white mb-2 flex items-center gap-2">
                       <Sparkles className="w-6 h-6 text-yellow-400" /> Kenapa Coreline?
                    </h3>
                    <p className="text-blue-200 text-sm mb-8">Platform coding modern dengan ekosistem lengkap.</p>

                    <div className="space-y-4">
                       {[
                          { icon: Code2, t: "Materi Lengkap", d: "Python, Go, TS, & SQL Path" },
                          { icon: Trophy, t: "Sertifikat Resmi", d: "Validasi skill profesionalmu" },
                          { icon: Users, t: "Komunitas", d: "Diskusi langsung dengan mentor" },
                          { icon: WifiOff, t: "Offline Mode", d: "Belajar kapanpun tanpa internet" }
                       ].map((item, i) => (
                          <div key={i} className="flex items-start gap-4 p-3 rounded-xl bg-blue-950/40 border border-blue-800/30 hover:bg-blue-900/40 transition-colors">
                             <div className="p-2 bg-blue-500/20 rounded-lg text-blue-300">
                                <item.icon className="w-5 h-5" />
                             </div>
                             <div>
                                <h4 className="font-bold text-white text-sm">{item.t}</h4>
                                <p className="text-xs text-blue-300/80">{item.d}</p>
                             </div>
                          </div>
                       ))}
                    </div>

                    <div className="mt-8 pt-6 border-t border-blue-800/50">
                       <p className="text-xs font-bold text-blue-300 uppercase tracking-widest mb-3">Butuh Bantuan?</p>
                       <a href={waHref} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl transition-all shadow-lg shadow-emerald-600/20">
                          <MessageCircle className="w-5 h-5" /> Chat Admin WhatsApp
                       </a>
                    </div>
                 </div>
              </div>
            </div>

          </div>

          <footer className="mt-12 text-center text-xs font-medium text-slate-600">
            © {new Date().getFullYear()} Coreline by Astbyte. All rights reserved.
          </footer>
        </div>
      </div>

      <style>{`
        @keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
        .animate-float { animation: float 3s ease-in-out infinite; }
        
        @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
        .animate-fade-in { animation: fade-in 0.5s ease-out; }
        
        @keyframes slide-in-left { from { opacity: 0; transform: translateX(-20px); } to { opacity: 1; transform: translateX(0); } }
        .animate-slide-in-left { animation: slide-in-left 0.6s ease-out; }
        
        @keyframes slide-in-right { from { opacity: 0; transform: translateX(20px); } to { opacity: 1; transform: translateX(0); } }
        .animate-slide-in-right { animation: slide-in-right 0.6s ease-out; }

        @keyframes shake { 0%, 100% { transform: translateX(0); } 25% { transform: translateX(-5px); } 75% { transform: translateX(5px); } }
        .animate-shake { animation: shake 0.3s ease-in-out; }
      `}</style>
    </div>
  );
}