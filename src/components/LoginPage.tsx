import { useState, useRef } from 'react';
import {
  Lock, AlertCircle, Loader2, Check, MessageCircle, ArrowRight,
  Sparkles, Shield, Code2, Trophy, Users, BookOpen, WifiOff,
  Layout, ChevronLeft, Moon, Star, CloudMoon, Coffee
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import ReCAPTCHA from 'react-google-recaptcha';

const RECAPTCHA_SITE_KEY = '6LcHoB0sAAAAAGwuOnnHNhKOHBfdai_JbmB0118Z';

/* ================================
 * Helper: Lampion Gantung (Dekorasi)
 * ================================ */
const HangingLantern = ({ height = 'h-24', delay = '0s', left = 'left-10' }: { height?: string, delay?: string, left?: string }) => (
  <div className={`absolute top-0 ${left} flex flex-col items-center z-20 animate-swing origin-top`} style={{ animationDelay: delay }}>
    {/* Tali */}
    <div className={`w-[1px] ${height} bg-amber-500/50`}></div>
    {/* Badan Lampion */}
    <div className="w-8 h-10 bg-gradient-to-b from-amber-600 to-amber-800 rounded-t-lg rounded-b-xl border border-amber-400/50 shadow-[0_0_15px_rgba(245,158,11,0.6)] flex items-center justify-center relative">
      {/* Cahaya Dalam */}
      <div className="w-4 h-6 bg-yellow-100/30 rounded-full blur-[2px] animate-pulse"></div>
    </div>
    {/* Rumbai */}
    <div className="flex gap-[2px] mt-[1px]">
       <div className="w-[1px] h-3 bg-red-500/80"></div>
       <div className="w-[1px] h-4 bg-red-500/80"></div>
       <div className="w-[1px] h-3 bg-red-500/80"></div>
    </div>
  </div>
);

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
      setError('Mohon selesaikan verifikasi "I\'m not a robot".');
      return;
    }

    try {
      let url = '';
      let body: any = {};

      if (mode === 'email') {
        const trimmedUser = username.trim().toLowerCase();
        if (!trimmedUser || !password) {
          setError('Username dan password wajib diisi.');
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

      localStorage.setItem('astbyte_token', token);
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
    <div className="relative min-h-screen overflow-hidden bg-[#022c22] text-slate-100 font-sans selection:bg-amber-500/30">
      
      {/* --- BACKGROUND AMBIENCE (Ramadhan Night) --- */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {/* Pattern Overlay */}
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/arabesque.png')]"></div>
        
        {/* Glows */}
        <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-amber-500/10 blur-[100px] animate-pulse" />
        <div className="absolute -bottom-16 -left-16 h-96 w-96 rounded-full bg-emerald-600/10 blur-[100px]" />
      </div>

      {/* --- HANGING LANTERNS --- */}
      <HangingLantern left="left-10" height="h-32" delay="0s" />
      <HangingLantern left="right-20" height="h-24" delay="1.5s" />

      <div className="relative container mx-auto px-4 py-8 md:py-12 min-h-screen flex flex-col justify-center">
        <div className="mx-auto max-w-6xl w-full">
          
          {/* --- HEADER --- */}
          <header className="mb-10 text-center relative z-10">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-500 to-yellow-600 shadow-[0_0_20px_rgba(245,158,11,0.4)] animate-float">
              <Moon className="h-8 w-8 text-[#022c22] fill-current" />
            </div>
            <h1 className="mb-2 text-3xl font-serif font-black tracking-tight text-white md:text-4xl drop-shadow-md">
              Marhaban ya <span className="bg-gradient-to-r from-amber-300 to-yellow-500 bg-clip-text text-transparent">Ramadhan</span>
            </h1>
            <p className="text-emerald-200/80 font-medium">
              Tetap produktif dan tambah skill coding sambil menunggu berbuka.
            </p>
          </header>

          {/* --- MAIN LAYOUT --- */}
          <div className="grid items-stretch gap-6 md:grid-cols-2 md:gap-8 max-w-5xl mx-auto relative z-10">
            
            {/* LEFT: LOGIN FORM CARD */}
            <div className="relative group animate-slide-in-left">
               {/* Card Glow Border */}
              <div className="absolute -inset-0.5 bg-gradient-to-br from-emerald-500/30 to-amber-500/30 rounded-3xl blur opacity-75 group-hover:opacity-100 transition duration-1000"></div>
              
              <div className="relative h-full bg-[#064e3b]/90 backdrop-blur-xl border border-emerald-800/50 rounded-2xl p-6 md:p-8 shadow-2xl">
                {!showForm ? (
                  // STATE 1: INITIAL VIEW
                  <div className="h-full flex flex-col justify-center space-y-6 animate-fade-in">
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-xl bg-emerald-900/50 flex items-center justify-center border border-emerald-700">
                        <Lock className="h-6 w-6 text-amber-400" />
                      </div>
                      <div>
                        <h2 className="text-xl font-bold text-white font-serif">Area Member</h2>
                        <p className="text-sm text-emerald-200/70">Silakan masuk untuk melanjutkan.</p>
                      </div>
                    </div>

                    <div className="py-6">
                      <button
                        onClick={() => setShowForm(true)}
                        className="group relative w-full flex items-center justify-center gap-3 bg-gradient-to-r from-slate-100 to-slate-200 hover:from-white hover:to-white text-[#022c22] px-6 py-4 rounded-xl font-bold text-base transition-all transform hover:-translate-y-1 shadow-xl shadow-amber-500/10"
                      >
                        <span>Masuk dengan</span>
                        <img src="/icon2.png" alt="Astbyte" className="h-5 w-auto" />
                        <ArrowRight className="w-5 h-5 ml-auto opacity-0 group-hover:opacity-100 transition-opacity absolute right-4 text-emerald-700" />
                      </button>
                    </div>

                    <div className="mt-auto bg-[#022c22]/50 rounded-xl p-5 border border-emerald-800 text-center">
                      <p className="text-sm font-medium text-emerald-300 mb-3">Belum bergabung?</p>
                      <a
                        href="https://axid.astbyte.com/"
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 text-amber-400 hover:text-amber-300 font-bold text-sm hover:underline"
                      >
                        Daftar Akun Gratis <ArrowRight className="h-4 w-4" />
                      </a>
                    </div>
                  </div>
                ) : (
                  // STATE 2: FORM INPUT VIEW
                  <div className="animate-fade-in">
                    <button
                      onClick={() => { setShowForm(false); setError(''); }}
                      className="mb-6 flex items-center gap-2 text-sm font-bold text-emerald-400 hover:text-amber-300 transition-colors"
                    >
                      <ChevronLeft className="w-4 h-4" /> Kembali
                    </button>

                    <div className="mb-6">
                       <h2 className="text-2xl font-serif font-black text-white mb-1">Ahlan wa Sahlan!</h2>
                       <p className="text-emerald-200/70 text-sm">Masukkan kredensial akun AstByte Anda.</p>
                    </div>

                    {isSuccess && (
                       <div className="mb-4 p-3 bg-emerald-500/20 border border-emerald-500/30 rounded-xl flex items-center gap-3 text-emerald-300 font-bold text-sm animate-bounce-in">
                          <Check className="w-5 h-5 text-emerald-400" /> Login sukses! Mengalihkan...
                       </div>
                    )}

                    {/* Toggle Button */}
                    <div className="grid grid-cols-2 gap-2 p-1 bg-[#022c22] rounded-xl mb-6 border border-emerald-900 shadow-inner">
                      <button
                        type="button"
                        onClick={() => { setMode('email'); setError(''); }}
                        className={`py-2 text-sm font-bold rounded-lg transition-all ${mode === 'email' ? 'bg-emerald-800 text-amber-300 shadow-lg border border-emerald-700' : 'text-emerald-500 hover:text-emerald-300'}`}
                      >
                        Email
                      </button>
                      <button
                        type="button"
                        onClick={() => { setMode('publicId'); setError(''); }}
                        className={`py-2 text-sm font-bold rounded-lg transition-all ${mode === 'publicId' ? 'bg-emerald-800 text-amber-300 shadow-lg border border-emerald-700' : 'text-emerald-500 hover:text-emerald-300'}`}
                      >
                        Public ID
                      </button>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                      {mode === 'email' ? (
                        <>
                           <div className="space-y-1.5">
                              <label className="text-xs font-bold uppercase tracking-wider text-emerald-400/80">Username</label>
                              <div className="relative group">
                                <input
                                  type="text"
                                  value={username}
                                  onChange={(e) => setUsername(e.target.value.toLowerCase().replace('@astbyte.com', ''))}
                                  placeholder="username"
                                  className="w-full bg-[#022c22]/80 border border-emerald-800 rounded-xl px-4 py-3.5 text-white placeholder:text-emerald-700 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all outline-none"
                                />
                                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-emerald-600 text-sm font-medium">@astbyte.com</span>
                              </div>
                           </div>
                           <div className="space-y-1.5">
                              <label className="text-xs font-bold uppercase tracking-wider text-emerald-400/80">Password</label>
                              <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                className="w-full bg-[#022c22]/80 border border-emerald-800 rounded-xl px-4 py-3.5 text-white placeholder:text-emerald-700 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all outline-none"
                              />
                           </div>
                        </>
                      ) : (
                        <div className="space-y-1.5">
                           <label className="text-xs font-bold uppercase tracking-wider text-emerald-400/80">Public ID</label>
                           <input
                              type="text"
                              value={publicId}
                              onChange={(e) => setPublicId(e.target.value)}
                              placeholder="Contoh: 3f4a6b2c..."
                              className="w-full bg-[#022c22]/80 border border-emerald-800 rounded-xl px-4 py-3.5 text-white placeholder:text-emerald-700 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all outline-none"
                           />
                           <p className="text-xs text-emerald-500">ID terdapat di pengaturan akun.</p>
                        </div>
                      )}

                      <div className="flex justify-center pt-2 scale-90 origin-center">
                         <ReCAPTCHA ref={recaptchaRef} sitekey={RECAPTCHA_SITE_KEY} onChange={onRecaptchaChange} theme="dark" />
                      </div>

                      {error && (
                         <div className="p-3 bg-red-900/20 border border-red-500/20 rounded-xl flex items-start gap-3 text-red-300 text-sm font-medium animate-shake">
                            <AlertCircle className="w-5 h-5 shrink-0 text-red-400" />
                            {error}
                         </div>
                      )}

                      <button
                        type="submit"
                        disabled={loading || isSuccess || !recaptchaToken}
                        className="w-full bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-400 hover:to-yellow-500 text-[#022c22] font-bold py-3.5 rounded-xl shadow-[0_0_15px_rgba(245,158,11,0.3)] transition-all transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                      >
                         {loading ? <Loader2 className="w-5 h-5 animate-spin"/> : "Mulai Belajar"}
                         {!loading && <ArrowRight className="w-5 h-5"/>}
                      </button>
                    </form>
                  </div>
                )}
              </div>
            </div>

            {/* RIGHT: FEATURES / DECORATION */}
            <div className="relative animate-slide-in-right hidden md:block">
              <div className="h-full bg-gradient-to-br from-[#064e3b] to-[#022c22] rounded-2xl p-8 border border-emerald-800 shadow-2xl relative overflow-hidden flex flex-col justify-center">
                 {/* Decor */}
                 <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>

                 <div className="relative z-10">
                    <h3 className="text-2xl font-serif font-black text-white mb-2 flex items-center gap-2">
                       <Sparkles className="w-6 h-6 text-amber-400" /> Keutamaan Ilmu
                    </h3>
                    <p className="text-emerald-200/80 text-sm mb-8 leading-relaxed">
                       "Barangsiapa menempuh jalan untuk mencari ilmu, maka Allah akan mudahkan baginya jalan menuju surga."
                    </p>

                    <div className="space-y-4">
                       {[
                          { icon: CloudMoon, t: "Ngabuburit Produktif", d: "Isi waktu luang dengan skill baru" },
                          { icon: Trophy, t: "Sertifikat Berkah", d: "Validasi skill untuk karir masa depan" },
                          { icon: Users, t: "Komunitas Silaturahmi", d: "Diskusi santun dengan mentor & teman" },
                          { icon: WifiOff, t: "Mode I'tikaf (Offline)", d: "Fokus belajar tanpa gangguan sinyal" }
                       ].map((item, i) => (
                          <div key={i} className="flex items-start gap-4 p-3 rounded-xl bg-[#022c22]/60 border border-emerald-800 hover:border-amber-500/30 hover:bg-[#064e3b]/50 transition-colors">
                             <div className="p-2 bg-emerald-900/50 rounded-lg text-amber-400">
                                <item.icon className="w-5 h-5" />
                             </div>
                             <div>
                                <h4 className="font-bold text-emerald-50 text-sm">{item.t}</h4>
                                <p className="text-xs text-emerald-400/70">{item.d}</p>
                             </div>
                          </div>
                       ))}
                    </div>

                    <div className="mt-8 pt-6 border-t border-emerald-800/50">
                       <p className="text-xs font-bold text-emerald-500 uppercase tracking-widest mb-3">Butuh Bantuan?</p>
                       <a href={waHref} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 w-full py-3 bg-emerald-700 hover:bg-emerald-600 text-white font-bold rounded-xl transition-all shadow-lg shadow-emerald-700/30">
                          <MessageCircle className="w-5 h-5" /> Chat Admin WhatsApp
                       </a>
                    </div>
                 </div>
              </div>
            </div>

          </div>

          <footer className="mt-12 text-center text-xs font-medium text-emerald-600/60">
            © {new Date().getFullYear()} Coreline by Astbyte. Edisi Spesial Ramadhan 1446 H.
          </footer>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700;900&display=swap');
        .font-serif { font-family: 'Playfair Display', serif; }

        @keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
        .animate-float { animation: float 3s ease-in-out infinite; }
        
        @keyframes swing { 0%, 100% { transform: rotate(-5deg); } 50% { transform: rotate(5deg); } }
        .animate-swing { animation: swing 4s ease-in-out infinite; }

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