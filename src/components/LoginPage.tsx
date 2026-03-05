import { useState, useRef } from 'react';
import {
  Lock, AlertCircle, Loader2, Check, MessageCircle, ArrowRight,
  Sparkles, Shield, Trophy, Users, WifiOff, ChevronLeft, Moon, 
  CloudMoon, Star, Quote, Code2, BookOpen, ShieldCheck
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

  const features = [
    { icon: CloudMoon, t: "Ngabuburit Produktif", d: "Isi waktu luang puasa dengan menambah skill baru yang bermanfaat." },
    { icon: Trophy, t: "Sertifikat Berkah", d: "Dapatkan sertifikat kelulusan yang valid untuk menunjang karir masa depan." },
    { icon: Users, t: "Komunitas Silaturahmi", d: "Akses grup diskusi eksklusif bersama mentor dan teman-teman sejawat." },
    { icon: WifiOff, t: "Mode I'tikaf", d: "Materi bisa diakses secara terstruktur, bantu kamu lebih fokus belajar." }
  ];

  const testimonials = [
    { name: "Ahmad R.", role: "Mahasiswa IT", text: "Platform belajar yang pas banget buat ngabuburit. Materinya mudah dipahami dan sangat terstruktur!", rating: 5 },
    { name: "Siti N.", role: "Web Developer", text: "Alhamdulillah bisa upgrade skill bareng mentor yang expert. Sertifikatnya juga sangat berguna.", rating: 5 },
    { name: "Budi S.", role: "Freelancer", text: "Komunitasnya aktif dan saling bantu. Recommended banget buat yang mau belajar coding dari nol.", rating: 5 }
  ];

  return (
    // Wrapper utama: dibuat bisa di-scroll (overflow-y-auto)
    <div className="relative min-h-screen overflow-x-hidden overflow-y-auto bg-[#022c22] text-slate-100 font-sans selection:bg-amber-500/30 flex flex-col">
      
      {/* --- BACKGROUND AMBIENCE (Fixed) --- */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/arabesque.png')]"></div>
        <div className="absolute -top-24 -right-24 h-[500px] w-[500px] rounded-full bg-amber-500/10 blur-[120px] animate-pulse" />
        <div className="absolute bottom-0 -left-16 h-96 w-96 rounded-full bg-emerald-600/10 blur-[100px]" />
      </div>

      {!showForm ? (
        /* =========================================
         * STATE 1: FULL LANDING PAGE VIEW
         * ========================================= */
        <div className="relative z-10 w-full flex-grow flex flex-col">
          
          {/* Lampion khusus Hero Section */}
          <HangingLantern left="left-10" height="h-24" delay="0s" />
          <HangingLantern left="right-20" height="h-16" delay="1.5s" />

          {/* NAVBAR */}
          <nav className="container mx-auto px-6 py-6 flex items-center justify-between z-30">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-amber-500 to-yellow-600 shadow-lg">
                <Moon className="h-5 w-5 text-[#022c22] fill-current" />
              </div>
              <span className="text-xl font-serif font-bold text-white tracking-wide">Coreline.</span>
            </div>
            <button 
              onClick={() => setShowForm(true)}
              className="px-6 py-2.5 bg-emerald-800/80 hover:bg-emerald-700 text-emerald-100 border border-emerald-600 rounded-xl font-bold transition-all"
            >
              Masuk
            </button>
          </nav>

          {/* HERO SECTION */}
          <section className="container mx-auto px-6 py-16 md:py-24 text-center flex flex-col items-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-900/50 border border-emerald-700/50 text-amber-400 text-sm font-semibold mb-8 animate-fade-in">
              <Sparkles className="w-4 h-4" /> Spesial Ramadhan 1447 H
            </div>
            
            <h1 className="mb-6 text-4xl md:text-6xl lg:text-7xl font-serif font-black tracking-tight text-white drop-shadow-md max-w-4xl leading-tight animate-fade-in" style={{animationDelay: '0.1s'}}>
              Marhaban ya <br className="md:hidden" />
              <span className="bg-gradient-to-r from-amber-300 to-yellow-500 bg-clip-text text-transparent">Ramadhan</span>
            </h1>
            
            <p className="text-lg md:text-xl text-emerald-200/90 font-medium max-w-2xl mb-12 animate-fade-in" style={{animationDelay: '0.2s'}}>
              Platform belajar interaktif Coreline by AstByte. Tetap produktif dan tambah *skill coding* sambil menunggu waktu berbuka puasa.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto animate-fade-in" style={{animationDelay: '0.3s'}}>
              <button
                onClick={() => setShowForm(true)}
                className="group relative flex items-center justify-center gap-3 bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-400 hover:to-yellow-500 text-[#022c22] px-8 py-4 rounded-xl font-bold text-lg transition-all transform hover:-translate-y-1 shadow-[0_0_20px_rgba(245,158,11,0.4)] w-full sm:w-auto"
              >
                Mulai Belajar Sekarang
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              
              <a
                href="https://axid.astbyte.com/"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 bg-[#064e3b]/80 border border-emerald-700 hover:bg-[#064e3b] text-white px-8 py-4 rounded-xl font-bold text-lg transition-all w-full sm:w-auto"
              >
                Daftar Akun Gratis
              </a>
            </div>
          </section>

          {/* STATS & INFO SECTION */}
          <section className="bg-gradient-to-b from-transparent to-[#064e3b]/30 py-16 border-y border-emerald-900/50">
            <div className="container mx-auto px-6 max-w-5xl">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                {[
                  { icon: Code2, n: "50+", l: "Modul Belajar" },
                  { icon: Users, n: "500+", l: "Member Aktif" },
                  { icon: BookOpen, n: "100%", l: "Materi Praktik" },
                  { icon: Shield, n: "24/7", l: "Dukungan Mentor" }
                ].map((stat, idx) => (
                  <div key={idx} className="flex flex-col items-center">
                    <stat.icon className="w-8 h-8 text-emerald-400 mb-3 opacity-80" />
                    <h3 className="text-3xl font-black text-white font-serif mb-1">{stat.n}</h3>
                    <p className="text-sm text-emerald-300/80 font-medium">{stat.l}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* FEATURES SECTION */}
          <section className="container mx-auto px-6 py-20 max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-serif font-black text-white mb-4">Keutamaan Belajar Bersama Kami</h2>
              <p className="text-emerald-200/70 max-w-2xl mx-auto">"Barangsiapa menempuh jalan untuk mencari ilmu, maka Allah akan mudahkan baginya jalan menuju surga."</p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((item, i) => (
                <div key={i} className="flex flex-col p-8 rounded-2xl bg-[#022c22]/60 border border-emerald-800 hover:border-amber-500/50 hover:bg-[#064e3b]/50 transition-all transform hover:-translate-y-2 backdrop-blur-sm shadow-xl group">
                  <div className="p-4 bg-emerald-900/50 rounded-xl text-amber-400 mb-6 inline-block w-fit group-hover:scale-110 transition-transform">
                    <item.icon className="w-8 h-8" />
                  </div>
                  <h4 className="font-bold text-white text-lg mb-3">{item.t}</h4>
                  <p className="text-sm text-emerald-300/80 leading-relaxed">{item.d}</p>
                </div>
              ))}
            </div>
          </section>

          {/* TESTIMONIAL / RATING SECTION */}
          <section className="py-20 bg-[#064e3b]/20 relative">
            <div className="container mx-auto px-6 max-w-6xl">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-serif font-black text-white mb-4">Apa Kata Mereka?</h2>
                <div className="flex items-center justify-center gap-1 text-amber-400 mb-2">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 fill-current" />)}
                </div>
                <p className="text-emerald-200/70">Rating rata-rata 4.9/5 dari ribuan member kami.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {testimonials.map((testi, i) => (
                  <div key={i} className="bg-[#022c22]/80 p-8 rounded-2xl border border-emerald-800/60 relative shadow-lg">
                    <Quote className="absolute top-6 right-6 w-8 h-8 text-emerald-800/40" />
                    <div className="flex items-center gap-1 text-amber-400 mb-6">
                      {[...Array(testi.rating)].map((_, idx) => <Star key={idx} className="w-4 h-4 fill-current" />)}
                    </div>
                    <p className="text-emerald-100 text-sm leading-relaxed mb-6 italic">"{testi.text}"</p>
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-emerald-800 flex items-center justify-center text-amber-400 font-bold font-serif">
                        {testi.name.charAt(0)}
                      </div>
                      <div>
                        <h4 className="font-bold text-white text-sm">{testi.name}</h4>
                        <p className="text-xs text-emerald-400">{testi.role}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* FOOTER */}
          <footer className="mt-auto bg-[#011c16] border-t border-emerald-900 pt-16 pb-8">
            <div className="container mx-auto px-6 max-w-6xl">
              <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-12 text-center md:text-left">
                <div>
                  <div className="flex items-center gap-2 justify-center md:justify-start mb-4">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500">
                      <Moon className="h-4 w-4 text-[#022c22] fill-current" />
                    </div>
                    <span className="text-2xl font-serif font-bold text-white">Coreline.</span>
                  </div>
                  <p className="text-emerald-400/60 text-sm max-w-xs">
                    Platform belajar interaktif by AstByte. Mengedukasi generasi digital dengan kurikulum terbaik.
                  </p>
                </div>
                
                <div className="flex flex-col items-center md:items-end">
                  {/* BADGE TERSERTIFIKASI */}
                  <div className="flex items-center gap-3 p-4 bg-[#064e3b]/40 border border-emerald-700/50 rounded-xl mb-4">
                    <ShieldCheck className="w-8 h-8 text-amber-400" />
                    <div className="text-left">
                      <p className="text-xs text-emerald-400 font-medium uppercase tracking-wider">Keamanan & Kualitas Terjamin</p>
                      <p className="text-sm text-white font-bold">Tersertifikasi oleh AstByte</p>
                    </div>
                  </div>
                  
                  <a href={waHref} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-emerald-400 hover:text-amber-400 transition-colors text-sm font-medium">
                    <MessageCircle className="w-4 h-4" /> Hubungi Admin via WhatsApp
                  </a>
                </div>
              </div>

              <div className="border-t border-emerald-900/50 pt-8 text-center text-xs font-medium text-emerald-600">
                © {new Date().getFullYear()} Coreline by Astbyte. Edisi Spesial Ramadhan 1447 H. All rights reserved.
              </div>
            </div>
          </footer>

        </div>
      ) : (
        /* =========================================
         * STATE 2: LOGIN FORM VIEW (Centered)
         * ========================================= */
        <div className="relative z-10 w-full flex-grow flex items-center justify-center py-12 px-4 animate-fade-in">
          <div className="w-full max-w-5xl">
            {/* Header Mini */}
            <header className="mb-10 text-center relative z-10">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-500 to-yellow-600 shadow-[0_0_20px_rgba(245,158,11,0.4)] animate-float">
                <Moon className="h-7 w-7 text-[#022c22] fill-current" />
              </div>
              <h2 className="text-2xl font-serif font-black tracking-tight text-white drop-shadow-md">
                Coreline <span className="text-amber-400">AstByte</span>
              </h2>
            </header>

            <div className="grid items-stretch gap-6 md:grid-cols-2 md:gap-8 relative z-10">
              {/* KIRI: LOGIN FORM CARD */}
              <div className="relative group animate-slide-in-left">
                <div className="absolute -inset-0.5 bg-gradient-to-br from-emerald-500/30 to-amber-500/30 rounded-3xl blur opacity-75 group-hover:opacity-100 transition duration-1000"></div>
                
                <div className="relative h-full bg-[#064e3b]/90 backdrop-blur-xl border border-emerald-800/50 rounded-2xl p-6 md:p-8 shadow-2xl">
                  <button
                    onClick={() => { setShowForm(false); setError(''); }}
                    className="mb-6 flex items-center gap-2 text-sm font-bold text-emerald-400 hover:text-amber-300 transition-colors"
                  >
                    <ChevronLeft className="w-4 h-4" /> Kembali ke Beranda
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
                      {loading ? <Loader2 className="w-5 h-5 animate-spin"/> : "Masuk ke Area Member"}
                      {!loading && <ArrowRight className="w-5 h-5"/>}
                    </button>
                  </form>
                </div>
              </div>

              {/* KANAN: FEATURES / DECORATION */}
              <div className="relative animate-slide-in-right hidden md:block">
                <div className="h-full bg-gradient-to-br from-[#064e3b] to-[#022c22] rounded-2xl p-8 border border-emerald-800 shadow-2xl relative overflow-hidden flex flex-col justify-center">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>

                  <div className="relative z-10">
                    <h3 className="text-2xl font-serif font-black text-white mb-2 flex items-center gap-2">
                      <Sparkles className="w-6 h-6 text-amber-400" /> Keutamaan Ilmu
                    </h3>
                    <p className="text-emerald-200/80 text-sm mb-8 leading-relaxed">
                      "Barangsiapa menempuh jalan untuk mencari ilmu, maka Allah akan mudahkan baginya jalan menuju surga."
                    </p>

                    <div className="space-y-4">
                      {features.map((item, i) => (
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
          </div>
        </div>
      )}

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700;900&display=swap');
        .font-serif { font-family: 'Playfair Display', serif; }

        @keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
        .animate-float { animation: float 3s ease-in-out infinite; }
        
        @keyframes swing { 0%, 100% { transform: rotate(-5deg); } 50% { transform: rotate(5deg); } }
        .animate-swing { animation: swing 4s ease-in-out infinite; }

        @keyframes fade-in { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fade-in { animation: fade-in 0.6s ease-out forwards; }
        
        @keyframes slide-in-left { from { opacity: 0; transform: translateX(-20px); } to { opacity: 1; transform: translateX(0); } }
        .animate-slide-in-left { animation: slide-in-left 0.6s ease-out; }
        
        @keyframes slide-in-right { from { opacity: 0; transform: translateX(20px); } to { opacity: 1; transform: translateX(0); } }
        .animate-slide-in-right { animation: slide-in-right 0.6s ease-out; }

        @keyframes shake { 0%, 100% { transform: translateX(0); } 25% { transform: translateX(-5px); } 75% { transform: translateX(5px); } }
        .animate-shake { animation: shake 0.3s ease-in-out; }

        @keyframes bounce-in { 0% { transform: scale(0.9); opacity: 0; } 50% { transform: scale(1.05); opacity: 1; } 100% { transform: scale(1); opacity: 1; } }
        .animate-bounce-in { animation: bounce-in 0.4s ease-out forwards; }
      `}</style>
    </div>
  );
}