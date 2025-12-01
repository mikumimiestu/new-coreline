import { useState, useRef } from 'react';
import {
  Lock,
  AlertCircle,
  Loader2,
  Check,
  MessageCircle,
  Clock,
  ArrowRight,
  Sparkles,
  Shield,
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import ReCAPTCHA from 'react-google-recaptcha';

const AUTHX_BASE = 'https://authx.astbyte.com';
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

    // Validate reCAPTCHA
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

      // Add reCAPTCHA token to request body
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
        
        // Reset reCAPTCHA on error
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
      // Reset reCAPTCHA on error
      recaptchaRef.current?.reset();
      setRecaptchaToken(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-blue-50 via-white to-cyan-50 dark:from-slate-900 dark:via-slate-950 dark:to-slate-900">
      {/* Enhanced Animated gradient blobs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 -right-24 h-96 w-96 animate-pulse rounded-full bg-gradient-to-br from-cyan-400/40 to-blue-500/30 blur-3xl dark:from-cyan-500/30 dark:to-blue-600/20" />
        <div className="absolute -bottom-16 -left-16 h-96 w-96 animate-pulse rounded-full bg-gradient-to-tr from-blue-400/40 to-cyan-500/30 blur-3xl animation-delay-2000 dark:from-blue-500/30 dark:to-cyan-600/20" />
        <div className="absolute top-1/2 left-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 animate-pulse rounded-full bg-gradient-to-r from-purple-400/20 to-pink-500/20 blur-3xl animation-delay-4000 dark:from-purple-500/10 dark:to-pink-600/10" />
      </div>

      <div className="relative container mx-auto px-4 py-10 md:py-16">
        <div className="mx-auto max-w-6xl">
          {/* Enhanced Header with animation */}
          <header className="mb-10 text-center md:mb-14">
            <div className="animate-fade-in-down mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-2xl bg-white/80 shadow-xl shadow-blue-500/20 ring-1 ring-black/5 backdrop-blur transition-transform duration-500 hover:scale-110 hover:shadow-2xl hover:shadow-blue-500/30 dark:bg-slate-800/60 dark:shadow-cyan-500/20 dark:hover:shadow-cyan-500/30">
              <img
                src="/icon.png"
                alt="coreline logo"
                className="h-12 w-12 animate-float"
              />
            </div>
            <h1 className="animate-fade-in text-3xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-600 dark:from-cyan-400 dark:to-blue-400 md:text-5xl">
              Coreline Platform
            </h1>
            <p className="animate-fade-in-up mt-3 text-base text-gray-600 dark:text-slate-300 md:text-lg">
              Platform Pembelajaran Coding Interaktif ✨
            </p>
          </header>

          {/* Content */}
          <section className="grid items-stretch gap-6 md:grid-cols-2 md:gap-8">
            {/* Left: Enhanced Form card with animations */}
            <div className="animate-slide-in-left group relative overflow-hidden rounded-2xl bg-white/90 p-6 shadow-2xl ring-1 ring-black/5 backdrop-blur-xl transition-all duration-500 hover:shadow-blue-500/20 dark:bg-slate-900/80 dark:ring-white/10 dark:hover:shadow-cyan-500/20 md:p-8">
              {/* Gradient overlay on hover */}
              <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                <div className="absolute -top-24 -right-24 h-48 w-48 rounded-full bg-gradient-to-br from-blue-500/10 to-cyan-500/10 blur-2xl" />
              </div>

              <div className="relative z-10">
                <div className="mb-6 flex items-center gap-3">
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 text-white shadow-lg shadow-blue-500/30 transition-transform duration-300 hover:scale-110 dark:from-cyan-600 dark:to-blue-600">
                    <Lock className="h-6 w-6" />
                  </span>
                  <div>
                    <h2 className="flex items-center gap-2 text-xl font-bold text-gray-900 dark:text-white md:text-2xl">
                      Login dengan Astbyte Account
                      <Sparkles className="h-5 w-5 animate-pulse text-cyan-500" />
                    </h2>
                    <p className="text-xs text-gray-500 dark:text-slate-400">
                      Satu akun untuk semua platform Astbyte.
                    </p>
                  </div>
                </div>

                {/* Success message with animation */}
                {isSuccess && (
                  <div className="animate-bounce-in mb-4 flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50/80 p-4 text-emerald-700 shadow-lg dark:border-emerald-900/40 dark:bg-emerald-900/20 dark:text-emerald-200">
                    <Check className="h-5 w-5 animate-spin-slow flex-shrink-0" />
                    <span className="text-sm font-semibold">
                      Login berhasil! Redirecting...
                    </span>
                  </div>
                )}

                {/* Enhanced Toggle mode with smooth transition */}
                <div className="mb-5 inline-flex w-full rounded-xl bg-gray-100 p-1.5 text-xs font-medium text-gray-600 shadow-inner dark:bg-slate-800 dark:text-slate-200">
                  <button
                    type="button"
                    className={`group relative flex-1 rounded-lg px-4 py-2.5 transition-all duration-300 ${
                      mode === 'email'
                        ? 'bg-white text-gray-900 shadow-md scale-105 dark:bg-slate-900 dark:text-white'
                        : 'opacity-70 hover:opacity-100'
                    }`}
                    onClick={() => {
                      setMode('email');
                      setError('');
                    }}
                  >
                    <span className="relative z-10">Email &amp; Password</span>
                    {mode === 'email' && (
                      <span className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-500/10 to-cyan-500/10" />
                    )}
                  </button>
                  <button
                    type="button"
                    className={`group relative flex-1 rounded-lg px-4 py-2.5 transition-all duration-300 ${
                      mode === 'publicId'
                        ? 'bg-white text-gray-900 shadow-md scale-105 dark:bg-slate-900 dark:text-white'
                        : 'opacity-70 hover:opacity-100'
                    }`}
                    onClick={() => {
                      setMode('publicId');
                      setError('');
                    }}
                  >
                    <span className="relative z-10">Public ID</span>
                    {mode === 'publicId' && (
                      <span className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-500/10 to-cyan-500/10" />
                    )}
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                  {mode === 'email' ? (
                    <div className="animate-fade-in space-y-5">
                      <div>
                        <label
                          htmlFor="username"
                          className="mb-2 block text-sm font-semibold text-gray-700 dark:text-slate-200"
                        >
                          Username Astbyte
                        </label>
                        <div className="group relative flex items-center overflow-hidden rounded-xl border-2 border-gray-300 bg-white px-4 py-3 text-sm outline-none transition-all duration-300 focus-within:border-blue-500 focus-within:shadow-lg focus-within:shadow-blue-500/20 hover:border-gray-400 dark:border-slate-600 dark:bg-slate-800 dark:text-white dark:focus-within:border-cyan-400 dark:focus-within:shadow-cyan-400/20 dark:hover:border-slate-500">
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
                            className="w-full bg-transparent text-base outline-none placeholder:text-gray-400 dark:placeholder:text-slate-400"
                          />
                          <span className="ml-2 select-none text-xs font-medium text-gray-500 transition-colors group-focus-within:text-blue-600 dark:text-slate-300 dark:group-focus-within:text-cyan-400">
                            @astbyte.com
                          </span>
                        </div>
                      </div>

                      <div>
                        <label
                          htmlFor="password"
                          className="mb-2 block text-sm font-semibold text-gray-700 dark:text-slate-200"
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
                          placeholder="Masukkan password Astbyte kamu"
                          className="w-full rounded-xl border-2 border-gray-300 bg-white px-4 py-3 text-base text-gray-900 outline-none transition-all duration-300 placeholder:text-gray-400 hover:border-gray-400 focus:border-blue-500 focus:shadow-lg focus:shadow-blue-500/20 dark:border-slate-600 dark:bg-slate-800 dark:text-white dark:placeholder:text-slate-400 dark:hover:border-slate-500 dark:focus:border-cyan-400 dark:focus:shadow-cyan-400/20"
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="animate-fade-in">
                      <label
                        htmlFor="publicId"
                        className="mb-2 block text-sm font-semibold text-gray-700 dark:text-slate-200"
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
                        className="w-full rounded-xl border-2 border-gray-300 bg-white px-4 py-3 text-base text-gray-900 outline-none transition-all duration-300 placeholder:text-gray-400 hover:border-gray-400 focus:border-blue-500 focus:shadow-lg focus:shadow-blue-500/20 dark:border-slate-600 dark:bg-slate-800 dark:text-white dark:placeholder:text-slate-400 dark:hover:border-slate-500 dark:focus:border-cyan-400 dark:focus:shadow-cyan-400/20"
                      />
                      <p className="mt-2 text-xs text-gray-500 dark:text-slate-400">
                        Public ID bisa kamu lihat di halaman Account Center
                        Astbyte.
                      </p>
                    </div>
                  )}

                  {/* reCAPTCHA v2 Checkbox */}
                  <div className="flex justify-center">
                    <ReCAPTCHA
                      ref={recaptchaRef}
                      sitekey={RECAPTCHA_SITE_KEY}
                      onChange={onRecaptchaChange}
                      theme="light"
                    />
                  </div>

                  {error && (
                    <div
                      className="animate-shake flex items-start gap-3 rounded-xl border-2 border-red-200 bg-red-50/90 p-4 text-red-700 shadow-lg dark:border-red-900/40 dark:bg-red-900/30 dark:text-red-200"
                      role="alert"
                    >
                      <AlertCircle className="mt-0.5 h-5 w-5 flex-shrink-0 animate-pulse" />
                      <span className="text-sm font-medium">{error}</span>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={loading || isSuccess || !recaptchaToken}
                    className="group relative inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 px-4 py-3.5 text-base font-bold text-white shadow-xl shadow-blue-600/30 outline-none transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-blue-600/40 focus-visible:ring-4 focus-visible:ring-blue-500/40 disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:scale-100 dark:from-cyan-600 dark:to-blue-600 dark:shadow-cyan-600/30 dark:hover:shadow-cyan-600/40"
                  >
                    <span className="absolute inset-0 h-full w-full bg-gradient-to-r from-cyan-600 to-blue-600 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                    <span className="relative z-10 flex items-center gap-2">
                      {loading ? (
                        <>
                          <Loader2 className="h-5 w-5 animate-spin" />
                          Memproses...
                        </>
                      ) : isSuccess ? (
                        <>
                          <Check className="h-5 w-5" />
                          Berhasil!
                        </>
                      ) : (
                        <>
                          Masuk
                          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </>
                      )}
                    </span>
                  </button>

                  {/* reCAPTCHA Badge Info */}
                  <div className="flex items-center justify-center gap-2 text-xs text-gray-500 dark:text-slate-400">
                    <Shield className="h-3.5 w-3.5" />
                    <span>Protected by Google reCAPTCHA</span>
                  </div>

                  <p className="text-center text-xs text-gray-500 dark:text-slate-400">
                    Belum punya Astbyte Account?{' '}
                    <a
                      href="https://axid.astbyte.com/"
                      target="_blank"
                      rel="noreferrer"
                      className="font-bold text-blue-600 underline decoration-2 underline-offset-2 transition-colors hover:text-blue-700 dark:text-cyan-300 dark:hover:text-cyan-200"
                    >
                      Daftar di axid.astbyte.com
                    </a>
                  </p>

                  <a
                    href={waHref}
                    target="_blank"
                    rel="noreferrer"
                    className="group relative inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-emerald-600 to-green-600 px-4 py-3 text-sm font-bold text-white shadow-xl shadow-emerald-600/30 outline-none transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-emerald-600/40 focus-visible:ring-4 focus-visible:ring-emerald-500/40"
                  >
                    <span className="absolute inset-0 h-full w-full bg-gradient-to-r from-green-600 to-emerald-600 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                    <span className="relative z-10 flex items-center gap-2">
                      <MessageCircle className="h-5 w-5 transition-transform group-hover:rotate-12" />
                      <span>Butuh bantuan login? Chat WhatsApp Admin</span>
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </a>

                  <p className="text-center text-xs text-gray-500 dark:text-slate-400">
                    Atau email kami di{' '}
                    <a
                      href="mailto:admin@astbyte.com"
                      className="font-semibold underline decoration-2 underline-offset-2 transition-colors hover:text-gray-700 dark:hover:text-white"
                    >
                      admin@astbyte.com
                    </a>
                  </p>
                </form>
              </div>
            </div>

            {/* Right: Enhanced Info card - SAME AS BEFORE */}
            <div className="animate-slide-in-right group relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-600 via-cyan-600 to-blue-700 p-6 text-white shadow-2xl ring-1 ring-black/5 transition-all duration-500 hover:shadow-blue-500/40 dark:from-cyan-700 dark:via-blue-700 dark:to-cyan-800 dark:hover:shadow-cyan-500/40 md:p-8">
              <div className="pointer-events-none absolute inset-0 opacity-30">
                <div className="absolute top-0 right-0 h-64 w-64 animate-pulse rounded-full bg-gradient-to-br from-white/20 to-transparent blur-3xl" />
                <div className="absolute bottom-0 left-0 h-64 w-64 animate-pulse rounded-full bg-gradient-to-tr from-white/20 to-transparent blur-3xl animation-delay-2000" />
              </div>

              <div className="relative z-10">
                <div className="mb-6">
                  <h3 className="flex items-center gap-2 text-xl font-bold md:text-2xl">
                    Tipe Pengguna
                    <Sparkles className="h-5 w-5 animate-pulse" />
                  </h3>
                  <p className="mt-2 text-sm text-white/90 md:text-base">
                    Pilih jalur belajar sesuai kebutuhan Anda.
                  </p>
                </div>

                <div className="grid gap-3">
                  <div className="group/card animate-fade-in rounded-xl bg-white/10 p-4 backdrop-blur-sm ring-1 ring-white/20 transition-all duration-300 hover:scale-[1.02] hover:bg-white/15 hover:shadow-lg">
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold">👨‍🎓 Student</h4>
                      <span className="animate-pulse rounded-full bg-emerald-500/30 px-3 py-1 text-[10px] font-bold text-emerald-100 ring-1 ring-emerald-200/40 shadow-lg">
                        Tersedia
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-blue-50/90">
                      Akses materi Python, PHP, dan JavaScript
                    </p>
                  </div>

                  {[
                    { icon: '🌐', title: 'Umum', desc: 'Pengenalan programming & algoritma dasar' },
                    { icon: '💼', title: 'Pro', desc: 'Design patterns & clean code principles' },
                    { icon: '🎮', title: 'Game', desc: 'Game development & Unity fundamentals' },
                  ].map((item, idx) => (
                    <div
                      key={item.title}
                      className="animate-fade-in group/card relative overflow-hidden rounded-xl bg-white/5 p-4 opacity-90 backdrop-blur-sm ring-1 ring-white/10 transition-all duration-300 hover:scale-[1.02] hover:bg-white/10 hover:opacity-100"
                      style={{ animationDelay: `${(idx + 1) * 100}ms` }}
                    >
                      <div className="flex items-center justify-between">
                        <h4 className="font-bold">{item.icon} {item.title}</h4>
                        <span className="inline-flex items-center gap-1 rounded-full bg-yellow-400/20 px-2.5 py-1 text-[10px] font-bold text-yellow-100 ring-1 ring-yellow-200/40 shadow-lg">
                          <Lock className="h-3.5 w-3.5" />
                          Coming Soon
                        </span>
                      </div>
                      <p className="mt-1 text-sm text-blue-50/80">{item.desc}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {[
                    'Kurikulum terstruktur & praktik langsung',
                    'Progress tracking & sertifikat',
                    'Akses materi terbaru mingguan',
                    'Kelas live & forum diskusi',
                  ].map((benefit, idx) => (
                    <div
                      key={benefit}
                      className="animate-fade-in flex items-center gap-2 text-sm text-white/95 transition-transform hover:translate-x-1"
                      style={{ animationDelay: `${(idx + 5) * 100}ms` }}
                    >
                      <span className="inline-flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-white/20 shadow-lg transition-transform hover:scale-110">
                        <Check className="h-3.5 w-3.5" />
                      </span>
                      <span>{benefit}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-6 animate-fade-in rounded-xl bg-white/10 p-4 ring-1 ring-white/20 backdrop-blur-sm transition-all duration-300 hover:bg-white/15 hover:shadow-lg" style={{ animationDelay: '900ms' }}>
                  <p className="mb-3 font-bold">Butuh bantuan cepat?</p>
                  <div className="flex flex-wrap items-center gap-2">
                    <a
                      href={waHref}
                      target="_blank"
                      rel="noreferrer"
                      className="group/btn inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold text-white ring-1 ring-white transition-all hover:bg-white/10 hover:shadow-lg"
                    >
                      <MessageCircle className="h-4 w-4 transition-transform group-hover/btn:rotate-12" />
                      WhatsApp Admin
                    </a>
                    <span className="inline-flex items-center gap-1 rounded-full bg-white/20 px-3 py-1.5 text-[10px] font-semibold shadow-lg">
                      <Clock className="h-3.5 w-3.5 animate-pulse" />
                      Very Speed &lt; 1 jam
                    </span>
                  </div>
                  <p className="mt-2 text-xs text-white/80">
                    atau email:{' '}
                    <a
                      href="mailto:admin@astbyte.com"
                      className="font-semibold underline decoration-2 underline-offset-2 transition-colors hover:text-white"
                    >
                      admin@astbyte.com
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </section>

          <footer className="animate-fade-in mt-10 text-center text-xs text-gray-500 dark:text-slate-400" style={{ animationDelay: '1000ms' }}>
            © {new Date().getFullYear()} Coreline. All rights reserved. Made with
            ❤️ by Astbyte Team
          </footer>
        </div>
      </div>

      {/* Custom CSS for animations - SAME AS BEFORE */}
      <style>{`
        @keyframes fade-in-down {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
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
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes slide-in-right {
          from {
            opacity: 0;
            transform: translateX(30px);
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
            transform: translateX(-5px);
          }
          20%, 40%, 60%, 80% {
            transform: translateX(5px);
          }
        }
        
        @keyframes float {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        
        .animate-fade-in-down {
          animation: fade-in-down 0.6s ease-out;
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out;
        }
        
        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
        }
        
        .animate-slide-in-left {
          animation: slide-in-left 0.6s ease-out;
        }
        
        .animate-slide-in-right {
          animation: slide-in-right 0.6s ease-out;
        }
        
        .animate-bounce-in {
          animation: bounce-in 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        }
        
        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        .animate-spin-slow {
          animation: spin-slow 2s linear infinite;
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
