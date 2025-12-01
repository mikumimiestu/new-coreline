import { useState, useRef } from 'react';
import {
  Lock,
  AlertCircle,
  Loader2,
  Check,
  MessageCircle,
  ArrowRight,
  Sparkles,
  Shield,
  Code2,
  Zap,
  Trophy,
  Users,
  BookOpen,
  Rocket,
  WifiOffIcon,
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import ReCAPTCHA from 'react-google-recaptcha';

const RECAPTCHA_SITE_KEY = '6LcHoB0sAAAAAGwuOnnHNhKOHBfdai_JbmB0118Z';

export default function LoginPage() {
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

  const waHref =
    'https://api.whatsapp.com/send/?phone=6285183209494&text=Halo+AstByte%2C+saya+ingin+mendapatkan+informasi+tentang+Coreline.&type=phone_number&app_absent=0';

  const onRecaptchaChange = (token: string | null) => {
    setRecaptchaToken(token);
    if (error && error.includes('reCAPTCHA')) {
      setError('');
    }
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
      try {
        data = await res.json();
      } catch {
        data = null;
      }

      if (!res.ok) {
        console.log('[AUTHX ERROR]', res.status, data);
        const backendMessage = data?.message;
        const fallback =
          mode === 'email'
            ? 'Login dengan email & password gagal.'
            : 'Login dengan Public ID gagal (mungkin endpoint belum tersedia di authx).';

        setError(backendMessage || fallback);
        recaptchaRef.current?.reset();
        setRecaptchaToken(null);
        return;
      }

      const token = data?.data?.token;
      if (!token) {
        setError('Token tidak ditemukan dari server authx.');
        recaptchaRef.current?.reset();
        setRecaptchaToken(null);
        return;
      }

      localStorage.setItem('authx_token', token);

      const ok = await login(token);
      if (!ok) {
        setError('Login berhasil di Astbyte, tapi gagal di aplikasi.');
        recaptchaRef.current?.reset();
        setRecaptchaToken(null);
        return;
      }

      setIsSuccess(true);
      setTimeout(() => {
        window.location.href = '/';
      }, 1500);
    } catch (err) {
      console.error(err);
      setError('Terjadi kesalahan. Silakan coba lagi.');
      recaptchaRef.current?.reset();
      setRecaptchaToken(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-950 dark:via-slate-900 dark:to-indigo-950">
      {/* Animated background elements */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 -right-24 h-96 w-96 animate-pulse rounded-full bg-gradient-to-br from-blue-400/30 to-indigo-500/20 blur-3xl" />
        <div className="absolute -bottom-16 -left-16 h-96 w-96 animate-pulse rounded-full bg-gradient-to-tr from-indigo-400/30 to-blue-500/20 blur-3xl animation-delay-2000" />
        <div className="absolute top-1/2 left-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 animate-pulse rounded-full bg-gradient-to-r from-cyan-400/10 to-blue-500/10 blur-3xl animation-delay-4000" />
      </div>

      <div className="relative container mx-auto px-4 py-8 md:py-12">
        <div className="mx-auto max-w-6xl">
          {/* Header */}
          <header className="mb-8 text-center md:mb-12">
            <div className="animate-fade-in-down mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/90 shadow-xl shadow-blue-500/20 ring-1 ring-black/5 backdrop-blur transition-transform duration-500 hover:scale-110 dark:bg-slate-800/80">
              <img
                src="/icon.png"
                alt="coreline logo"
                className="h-10 w-10 animate-float"
              />
            </div>
            <h1 className="animate-fade-in mb-2 text-3xl font-bold tracking-tight text-slate-900 dark:text-white md:text-4xl">
              Welcome to <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent dark:from-blue-400 dark:to-indigo-400">Coreline</span>
            </h1>
            <p className="animate-fade-in-up text-sm text-slate-600 dark:text-slate-300 md:text-base">
              Platform Pembelajaran Coding Interaktif ✨
            </p>
          </header>

          {/* Main Content */}
          <section className="grid items-start gap-6 md:grid-cols-2 md:gap-8">
            {/* Left: Login Form - order-1 untuk mobile dan desktop */}
            <div className="animate-slide-in-left order-1">
              <div className="group relative overflow-hidden rounded-2xl bg-white/95 p-6 shadow-xl ring-1 ring-slate-200/50 backdrop-blur-xl transition-all duration-500 hover:shadow-2xl dark:bg-slate-900/95 dark:ring-slate-700/50 md:p-8">
                <div className="relative z-10">
                  <div className="mb-6 flex items-center gap-3">
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-lg">
                      <Lock className="h-5 w-5" />
                    </span>
                    <div>
                      <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                        Login ke Akun Anda
                      </h2>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        Gunakan Astbyte Account untuk masuk
                      </p>
                    </div>
                  </div>

                  {isSuccess && (
                    <div className="animate-bounce-in mb-4 flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-emerald-700 dark:border-emerald-900/40 dark:bg-emerald-900/20 dark:text-emerald-300">
                      <Check className="h-5 w-5 flex-shrink-0" />
                      <span className="text-sm font-medium">
                        Login berhasil! Redirecting...
                      </span>
                    </div>
                  )}

                  {/* Mode Toggle */}
                  <div className="mb-5 inline-flex w-full rounded-xl bg-slate-100 p-1 text-xs font-medium dark:bg-slate-800">
                    <button
                      type="button"
                      className={`flex-1 rounded-lg px-3 py-2 transition-all duration-200 ${
                        mode === 'email'
                          ? 'bg-white text-slate-900 shadow-sm dark:bg-slate-900 dark:text-white'
                          : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
                      }`}
                      onClick={() => {
                        setMode('email');
                        setError('');
                      }}
                    >
                      Email & Password
                    </button>
                    <button
                      type="button"
                      className={`flex-1 rounded-lg px-3 py-2 transition-all duration-200 ${
                        mode === 'publicId'
                          ? 'bg-white text-slate-900 shadow-sm dark:bg-slate-900 dark:text-white'
                          : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
                      }`}
                      onClick={() => {
                        setMode('publicId');
                        setError('');
                      }}
                    >
                      Public ID
                    </button>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                    {mode === 'email' ? (
                      <div className="animate-fade-in space-y-4">
                        <div>
                          <label
                            htmlFor="username"
                            className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-200"
                          >
                            Username Astbyte
                          </label>
                          <div className="group relative flex items-center overflow-hidden rounded-lg border-2 border-slate-300 bg-white px-3 py-2.5 text-sm transition-all focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/20 hover:border-slate-400 dark:border-slate-600 dark:bg-slate-800 dark:focus-within:border-blue-400 dark:hover:border-slate-500">
                            <input
                              id="username"
                              name="username"
                              type="text"
                              autoComplete="username"
                              value={username}
                              onChange={(e) => {
                                setUsername(
                                  e.target.value
                                    .toLowerCase()
                                    .replace('@astbyte.com', '')
                                );
                                if (error) setError('');
                              }}
                              placeholder="misal: amagi"
                              className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400 dark:text-white dark:placeholder:text-slate-500"
                            />
                            <span className="ml-2 select-none text-xs text-slate-500 dark:text-slate-400">
                              @astbyte.com
                            </span>
                          </div>
                        </div>

                        <div>
                          <label
                            htmlFor="password"
                            className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-200"
                          >
                            Password
                          </label>
                          <input
                            id="password"
                            name="password"
                            type="password"
                            autoComplete="current-password"
                            value={password}
                            onChange={(e) => {
                              setPassword(e.target.value);
                              if (error) setError('');
                            }}
                            placeholder="Masukkan password"
                            className="w-full rounded-lg border-2 border-slate-300 bg-white px-3 py-2.5 text-sm outline-none transition-all placeholder:text-slate-400 hover:border-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-slate-600 dark:bg-slate-800 dark:text-white dark:placeholder:text-slate-500 dark:hover:border-slate-500 dark:focus:border-blue-400"
                          />
                        </div>
                      </div>
                    ) : (
                      <div className="animate-fade-in">
                        <label
                          htmlFor="publicId"
                          className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-200"
                        >
                          Public ID Astbyte
                        </label>
                        <input
                          id="publicId"
                          name="publicId"
                          type="text"
                          value={publicId}
                          onChange={(e) => {
                            setPublicId(e.target.value.trim());
                            if (error) setError('');
                          }}
                          placeholder="Contoh: 3f4a6b2c-xxxx-xxxx..."
                          className="w-full rounded-lg border-2 border-slate-300 bg-white px-3 py-2.5 text-sm outline-none transition-all placeholder:text-slate-400 hover:border-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-slate-600 dark:bg-slate-800 dark:text-white dark:placeholder:text-slate-500 dark:hover:border-slate-500 dark:focus:border-blue-400"
                        />
                        <p className="mt-1.5 text-xs text-slate-500 dark:text-slate-400">
                          Public ID bisa kamu lihat di Account Center Astbyte.
                        </p>
                      </div>
                    )}

                    {/* reCAPTCHA */}
                    <div className="flex justify-center py-2">
                      <ReCAPTCHA
                        ref={recaptchaRef}
                        sitekey={RECAPTCHA_SITE_KEY}
                        onChange={onRecaptchaChange}
                        theme="light"
                      />
                    </div>

                    {error && (
                      <div
                        className="animate-shake flex items-start gap-2 rounded-lg border border-red-200 bg-red-50 p-3 text-red-700 dark:border-red-900/40 dark:bg-red-900/30 dark:text-red-200"
                        role="alert"
                      >
                        <AlertCircle className="mt-0.5 h-4 w-4 flex-shrink-0" />
                        <span className="text-xs font-medium">{error}</span>
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={loading || isSuccess || !recaptchaToken}
                      className="group relative inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/30 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl focus-visible:ring-2 focus-visible:ring-blue-500/50 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:scale-100"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          Memproses...
                        </>
                      ) : isSuccess ? (
                        <>
                          <Check className="h-4 w-4" />
                          Berhasil!
                        </>
                      ) : (
                        <>
                          Masuk
                          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </>
                      )}
                    </button>

                    <div className="flex items-center justify-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
                      <Shield className="h-3 w-3" />
                      <span>Protected by reCAPTCHA</span>
                    </div>

                    <p className="text-center text-xs text-slate-600 dark:text-slate-400">
                      Belum punya akun?{' '}
                      <a
                        href="https://axid.astbyte.com/"
                        target="_blank"
                        rel="noreferrer"
                        className="font-semibold text-blue-600 hover:underline dark:text-blue-400"
                      >
                        Daftar di sini
                      </a>
                    </p>
                  </form>
                </div>
              </div>
            </div>

            {/* Right: Platform Features - order-2 untuk mobile dan desktop */}
            <div className="animate-slide-in-right order-2">
              <div className="overflow-hidden rounded-2xl bg-gradient-to-br from-blue-600 via-indigo-600 to-blue-700 p-6 text-white shadow-2xl dark:from-blue-700 dark:via-indigo-700 dark:to-blue-800 md:p-8">
                <div className="mb-6">
                  <h3 className="mb-2 flex items-center gap-2 text-xl font-bold md:text-2xl">
                    <Sparkles className="h-5 w-5" />
                    Kenapa Coreline?
                  </h3>
                  <p className="text-sm text-blue-50">
                    Platform pembelajaran coding modern dengan fitur lengkap
                  </p>
                </div>

                <div className="space-y-3">
                  {[
                    {
                      icon: Code2,
                      title: 'Materi Lengkap',
                      desc: 'Python, PHP, JavaScript & bahasa populer lainnya',
                    },
                    {
                      icon: Trophy,
                      title: 'Sertifikat Resmi',
                      desc: 'Dapatkan sertifikat setelah menyelesaikan kursus',
                    },
                    {
                      icon: Users,
                      title: 'Support',
                      desc: 'Diskusi & kolaborasi dengan mentor',
                    },
                    {
                      icon: BookOpen,
                      title: 'Update Materi',
                      desc: 'Materi baru sesuai tren industri',
                    },
                    {
                      icon: WifiOffIcon,
                      title: 'Akses Offline',
                      desc: 'Unduh materi untuk belajar tanpa koneksi internet',
                    },
                  ].map((feature, idx) => (
                    <div
                      key={feature.title}
                      className="animate-fade-in group flex items-start gap-3 rounded-xl bg-white/10 p-4 backdrop-blur-sm ring-1 ring-white/20 transition-all hover:bg-white/15"
                      style={{ animationDelay: `${idx * 100}ms` }}
                    >
                      <span className="inline-flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-white/20 shadow-lg transition-transform group-hover:scale-110">
                        <feature.icon className="h-5 w-5" />
                      </span>
                      <div>
                        <h4 className="mb-0.5 font-semibold">{feature.title}</h4>
                        <p className="text-xs text-blue-50/90">{feature.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 rounded-xl bg-white/10 p-4 ring-1 ring-white/20 backdrop-blur-sm">
                  <p className="mb-3 font-semibold">Butuh bantuan?</p>
                  <a
                    href={waHref}
                    target="_blank"
                    rel="noreferrer"
                    className="group/btn inline-flex w-full items-center justify-center gap-2 rounded-lg bg-emerald-500 px-4 py-2.5 text-sm font-semibold text-white shadow-lg transition-all hover:bg-emerald-600 hover:shadow-xl"
                  >
                    <MessageCircle className="h-4 w-4" />
                    Chat WhatsApp Admin
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover/btn:translate-x-1" />
                  </a>
                  <p className="mt-2 text-center text-xs text-white/80">
                    atau email{' '}
                    <a
                      href="mailto:admin@astbyte.com"
                      className="font-semibold underline hover:text-white"
                    >
                      admin@astbyte.com
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </section>

          <footer className="animate-fade-in mt-8 text-center text-xs text-slate-500 dark:text-slate-400">
            © {new Date().getFullYear()} Coreline by Astbyte. All rights reserved.
          </footer>
        </div>
      </div>

      {/* Animations */}
      <style>{`
        @keyframes fade-in-down {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        
        @keyframes slide-in-left {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes slide-in-right {
          from {
            opacity: 0;
            transform: translateX(20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes bounce-in {
          0% {
            opacity: 0;
            transform: scale(0.3);
          }
          50% {
            transform: scale(1.05);
          }
          70% {
            transform: scale(0.9);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        @keyframes shake {
          0%, 100% {
            transform: translateX(0);
          }
          10%, 30%, 50%, 70%, 90% {
            transform: translateX(-3px);
          }
          20%, 40%, 60%, 80% {
            transform: translateX(3px);
          }
        }
        
        @keyframes float {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-8px);
          }
        }
        
        .animate-fade-in-down {
          animation: fade-in-down 0.5s ease-out;
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.5s ease-out;
        }
        
        .animate-fade-in {
          animation: fade-in 0.4s ease-out;
        }
        
        .animate-slide-in-left {
          animation: slide-in-left 0.5s ease-out;
        }
        
        .animate-slide-in-right {
          animation: slide-in-right 0.5s ease-out;
        }
        
        .animate-bounce-in {
          animation: bounce-in 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        }
        
        .animate-shake {
          animation: shake 0.4s ease-in-out;
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
}
