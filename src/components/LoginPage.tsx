import { useState} from 'react';
import { Code2, Lock, AlertCircle, Loader2, Check } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

/**
 * Modern, responsive, accessible login page using an access code.
 * Extra contents added:
 * - Contoh Kode Akses (copy-to-clipboard)
 * - Keuntungan (benefits)
 * - Help/Support card
 * - FAQ section
 */
export default function LoginPage() {
  const [accessCode, setAccessCode] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const normalized = (val: string) =>
    val
      .toUpperCase()
      .replace(/\s+/g, '') // remove spaces
      .slice(0, 24); // guardrail

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const trimmed = normalized(accessCode);
    if (!trimmed) {
      setError('Kode akses wajib diisi.');
      return;
    }

    setLoading(true);
    try {
      const success = await login(trimmed);
      if (!success) {
        setError('Kode akses tidak valid. Silakan coba lagi.');
      }
    } catch (_err) {
      setError('Terjadi kesalahan. Silakan coba lagi.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAccessCode(normalized(e.target.value));
    if (error) setError('');
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const text = e.clipboardData.getData('text');
    setAccessCode(normalized(text));
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 dark:from-slate-900 dark:via-slate-950 dark:to-slate-900">
      {/* Decorative gradient blobs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-cyan-400/30 blur-3xl dark:bg-cyan-500/20" />
        <div className="absolute -bottom-16 -left-16 h-80 w-80 rounded-full bg-blue-400/30 blur-3xl dark:bg-blue-500/20" />
      </div>

      <div className="relative container mx-auto px-4 py-10 md:py-16">
        <div className="mx-auto max-w-6xl">
          {/* Header */}
          <header className="text-center mb-10 md:mb-14">
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/60 shadow-sm ring-1 ring-black/5 backdrop-blur dark:bg-slate-800/40">
              <img src="/icon.png" alt="coreline logo" />
            </div>
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-gray-900 dark:text-white">
              Coreline Platform
            </h1>
            <p className="mt-2 text-base md:text-lg text-gray-600 dark:text-slate-300">
              Platform Pembelajaran Coding Interaktif
            </p>
          </header>

          {/* Content */}
          <section className="grid gap-6 md:grid-cols-2 md:gap-8 items-stretch">
            {/* Left: Form card */}
            <div className="relative rounded-2xl bg-white/80 p-6 md:p-8 shadow-xl ring-1 ring-black/5 backdrop-blur dark:bg-slate-900/70 dark:ring-white/10">
              <div className="mb-6 flex items-center gap-3">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-cyan-900/40 dark:text-cyan-300">
                  <Lock className="h-5 w-5" />
                </span>
                <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">Login</h2>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                <div>
                  <label htmlFor="accessCode" className="mb-2 block text-sm font-medium text-gray-700 dark:text-slate-200">
                    Kode Akses
                  </label>
                  <div className="relative">
                    <input
                      id="accessCode"
                      name="accessCode"
                      type="text"
                      inputMode="text"
                      autoComplete="one-time-code"
                      value={accessCode}
                      onChange={handleChange}
                      onPaste={handlePaste}
                      placeholder="Contoh: STUDENT2024"
                      aria-invalid={!!error}
                      aria-describedby={error ? 'accessCode-error' : undefined}
                      className="peer w-full rounded-xl border border-gray-300 bg-white/70 px-4 py-3 text-base font-semibold tracking-wider text-gray-900 placeholder:font-normal placeholder:tracking-normal placeholder:text-gray-400 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 disabled:opacity-60 dark:border-slate-600 dark:bg-slate-800 dark:text-white dark:placeholder:text-slate-400 dark:focus:border-cyan-400 dark:focus:ring-cyan-400/20"
                    />
                    {/* Uppercase hint */}
                    <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 select-none rounded-md bg-gray-100 px-2 py-1 text-[10px] font-bold tracking-widest text-gray-500 shadow-sm ring-1 ring-black/5 dark:bg-slate-700 dark:text-slate-200 dark:ring-white/10">
                      UPPERCASE
                    </span>
                  </div>
                  <p className="mt-2 text-xs text-gray-500 dark:text-slate-400">
                    Tips: tempelkan (paste) kode dari clipboard, kami akan merapikannya otomatis.
                  </p>
                </div>

                {error && (
                  <div
                    id="accessCode-error"
                    className="flex items-start gap-2 rounded-xl border border-red-200 bg-red-50/80 p-3 text-red-700 dark:border-red-900/40 dark:bg-red-900/20 dark:text-red-200"
                    role="alert"
                  >
                    <AlertCircle className="mt-0.5 h-5 w-5 flex-shrink-0" />
                    <span className="text-sm">{error}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="relative inline-flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-base font-semibold text-white shadow-lg shadow-blue-600/20 outline-none transition hover:bg-blue-700 focus-visible:ring-4 focus-visible:ring-blue-500/30 disabled:cursor-not-allowed disabled:opacity-70 dark:bg-cyan-600 dark:hover:bg-cyan-500 dark:shadow-cyan-600/20"
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      Memproses...
                    </>
                  ) : (
                    <>Masuk</>
                  )}
                </button>

                <p className="text-center text-xs text-gray-500 dark:text-slate-400">
                  Jika belum memiliki kode akses, silakan hubungi admin kami melalui <a href="https://api.whatsapp.com/send/?phone=6285183209494&text=Halo+AstByte%2C+saya+ingin+mendapatkan+code+akses+coreline.&type=phone_number&app_absent=0" className="underline underline-offset-2 hover:text-white">WhatsApp</a>.
                </p>
              </form>
            </div>

            {/* Right: Info card */}
            <div className="relative rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-600 p-6 md:p-8 text-white shadow-xl ring-1 ring-black/5 dark:from-cyan-700 dark:to-blue-700">
              <div className="mb-5">
                <h3 className="text-xl md:text-2xl font-bold">Tipe Pengguna</h3>
                <p className="mt-1 text-white/80 text-sm md:text-base">
                  Pilih jalur belajar sesuai kebutuhan Anda.
                </p>
              </div>

              <div className="grid gap-3">
                <div className="rounded-xl bg-white/10 p-4 backdrop-blur-sm">
                  <h4 className="font-semibold">👨‍🎓 Student</h4>
                  <p className="text-sm text-blue-50/90">Akses materi Python, PHP, dan JavaScript</p>
                </div>
                <div className="rounded-xl bg-white/10 p-4 backdrop-blur-sm">
                  <h4 className="font-semibold">🌐 Umum</h4>
                  <p className="text-sm text-blue-50/90">Pengenalan programming dan algoritma dasar</p>
                </div>
                <div className="rounded-xl bg-white/10 p-4 backdrop-blur-sm">
                  <h4 className="font-semibold">💼 Pro</h4>
                  <p className="text-sm text-blue-50/90">Design patterns dan clean code principles</p>
                </div>
                <div className="rounded-xl bg-white/10 p-4 backdrop-blur-sm">
                  <h4 className="font-semibold">🎮 Game</h4>
                  <p className="text-sm text-blue-50/90">Game development dan Unity fundamentals</p>
                </div>
              </div>

              {/* Benefits */}
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  'Kurikulum terstruktur & praktik langsung',
                  'Progress tracking & sertifikat',
                  'Akses materi terbaru mingguan',
                  'Kelas live & forum diskusi',
                ].map((b) => (
                  <div key={b} className="flex items-center gap-2 text-sm text-white/90">
                    <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-white/20">
                      <Check className="h-3 w-3" />
                    </span>
                    <span>{b}</span>
                  </div>
                ))}
              </div>

              {/* Help */}
              <div className="mt-6 rounded-xl bg-white/10 p-4 text-sm">
                <p className="mb-1 font-semibold">Butuh bantuan?</p>
                <p className="text-white/80">
                  Hubungi support kami di{' '}
                  <a href="mailto:support@codelearn.id" className="underline underline-offset-2 hover:text-white">admin@astbyte.com</a>{' '}
                  atau hubungi admin kami <a href="https://api.whatsapp.com/send/?phone=6285183209494&text=Halo+AstByte%2C+saya+ingin+mendapatkan+code+akses+coreline.&type=phone_number&app_absent=0" className="underline underline-offset-2 hover:text-white">WhatsApp</a>.
                </p>
              </div>
            </div>
          </section>

          {/* FAQ */}
          <section id="faq" className="mx-auto mt-10 max-w-3xl">
            <h3 className="mb-4 text-center text-xl font-bold text-gray-900 dark:text-white">Pertanyaan Umum</h3>
            <div className="space-y-3">
              <details className="group rounded-xl border border-gray-200 bg-white/70 p-4 shadow-sm open:shadow-md dark:border-slate-700 dark:bg-slate-900/60">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-2">
                  <span className="text-sm font-semibold text-gray-800 dark:text-slate-100">Di mana saya mendapatkan kode akses?</span>
                  <span className="text-xs text-gray-500 group-open:hidden">Buka</span>
                  <span className="text-xs text-gray-500 hidden group-open:inline">Tutup</span>
                </summary>
                <p className="mt-2 text-sm text-gray-600 dark:text-slate-300">Kode akses dikirim oleh admin/instruktur. Jika belum menerima, silakan hubungi support atau mendaftar jalur yang diinginkan.</p>
              </details>
              <details className="group rounded-xl border border-gray-200 bg-white/70 p-4 shadow-sm open:shadow-md dark:border-slate-700 dark:bg-slate-900/60">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-2">
                  <span className="text-sm font-semibold text-gray-800 dark:text-slate-100">Apakah huruf kecil diperbolehkan?</span>
                  <span className="text-xs text-gray-500 group-open:hidden">Buka</span>
                  <span className="text-xs text-gray-500 hidden group-open:inline">Tutup</span>
                </summary>
                <p className="mt-2 text-sm text-gray-600 dark:text-slate-300">Masukkan kode apa adanya; sistem akan otomatis merapikan menjadi huruf besar tanpa spasi.</p>
              </details>
              <details className="group rounded-xl border border-gray-200 bg-white/70 p-4 shadow-sm open:shadow-md dark:border-slate-700 dark:bg-slate-900/60">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-2">
                  <span className="text-sm font-semibold text-gray-800 dark:text-slate-100">Apakah data saya aman?</span>
                  <span className="text-xs text-gray-500 group-open:hidden">Buka</span>
                  <span className="text-xs text-gray-500 hidden group-open:inline">Tutup</span>
                </summary>
                <p className="mt-2 text-sm text-gray-600 dark:text-slate-300">Kami menerapkan praktik keamanan yang baik dan tidak menyimpan kode akses lebih lama dari yang diperlukan untuk proses autentikasi.</p>
              </details>
            </div>
          </section>

          <footer className="mt-10 text-center text-xs text-gray-500 dark:text-slate-400">
            © {new Date().getFullYear()} Coreline. All rights reserved.
          </footer>
        </div>
      </div>
    </div>
  );
}
