import { useState } from "react";
import { Check, Zap, Crown, Sparkles, Shield, MessageCircle, ArrowRight, BadgeCheck, HelpCircle, Star } from "lucide-react";

/**
 * Coreline Pricing Page
 * - React + TailwindCSS (no external state)
 * - Monthly/Yearly toggle with ~20% discount for yearly
 * - Three tiers: Student (Free), Pro, Prime
 * - Feature comparison, FAQs, Testimonials
 * - CTA buttons wired to placeholder links (replace with your routes/checkout)
 */

export default function PricingPage() {
  const [billing, setBilling] = useState<"monthly" | "yearly">("monthly");

  const currency = (n: number) =>
    new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(n);

  const price = (monthly: number, yearly: number) => (billing === "monthly" ? monthly : yearly);

  const tiers = [
    {
      id: "student",
      name: "Student",
      tagline: "Mulai gratis untuk belajar tanpa hambatan",
      icon: <Sparkles className="w-5 h-5" />,
      monthly: 0,
      yearly: 0,
      cta: { label: "Mulai Gratis", href: "/register" },
      popular: false,
      features: [
        { label: "Akses materi dasar (bahasa pemrograman pilihan)", ok: true },
        { label: "Progress & penyimpanan lokal", ok: true },
        { label: "Kuis & evaluasi berkala", ok: false },
        { label: "Mode offline (tertentu)", ok: false },
        { label: "Mentoring prioritas", ok: false },
        { label: "Modul premium & proyek nyata", ok: false },
        { label: "Sertifikat terverifikasi Coreline", ok: false },
      ],
    },
    {
      id: "pro",
      name: "Pro",
      tagline: "Level up dengan modul premium & sertifikat",
      icon: <Zap className="w-5 h-5" />,
      monthly: 79000,
      yearly: 760000, // ~20% off
      cta: { label: "Upgrade Pro", href: "/checkout/pro" },
      popular: true,
      features: [
        { label: "Semua di Student", ok: true },
        { label: "Modul premium & studi kasus nyata", ok: true },
        { label: "Progress cloud sync multi-device", ok: true },
        { label: "Sertifikat terverifikasi Coreline", ok: true },
        { label: "Mentoring grup (2×/bulan)", ok: false },
        { label: "Job-ready project & review portofolio", ok: false },
        { label: "Mentoring prioritas 1:1", ok: false },
      ],
    },
    {
      id: "prime",
      name: "Prime",
      tagline: "Pendampingan 1:1 & jalur karier intensif",
      icon: <Crown className="w-5 h-5" />,
      monthly: 149000,
      yearly: 1440000,
      cta: { label: "Gabung Prime", href: "/checkout/prime" },
      popular: false,
      features: [
        { label: "Semua di Pro", ok: true },
        { label: "Mentoring prioritas 1:1 (4×/bulan)", ok: true },
        { label: "Kelas live mingguan + rekaman", ok: true },
        { label: "Bimbingan karier & simulasi interview", ok: true },
        { label: "Rekomendasi kerja & network industri", ok: true },
        { label: "SLAs dukungan < 24 jam", ok: true },
      ],
    },
  ];

  const faqs = [
    {
      q: "Apakah bisa ganti paket kapan saja?",
      a: "Bisa. Upgrade/downgrade kapan pun; tagihan akan disesuaikan secara prorata tergantung metode pembayaran Anda.",
    },
    { q: "Apakah ada diskon untuk pelajar?", a: "Ya, Student gratis. Untuk Pro/Prime kadang ada promo musiman—pantau pengumuman kami." },
    { q: "Bagaimana sertifikat diterbitkan?", a: "Sertifikat otomatis keluar saat progres materi mencapai 100% di aplikasi Coreline Anda." },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900">
      {/* Hero */}
      <header className="relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-20 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-300 via-transparent to-transparent" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-sky-200/70 dark:border-cyan-800/40 bg-white/70 dark:bg-slate-900/60 px-3 py-1 text-xs font-semibold text-sky-700 dark:text-cyan-300">
              <BadgeCheck className="w-4 h-4" /> Harga transparan, manfaat maksimal
            </div>
            <h1 className="mt-4 text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              Invest ke diri sendiri, mulai dari <span className="text-sky-600 dark:text-cyan-400">gratis</span>
            </h1>
            <p className="mt-4 text-slate-600 dark:text-slate-300 max-w-2xl">
              Pilih paket yang pas buat perjalanan belajarmu. Upgrade kapan saja. Berhenti kapan saja.
            </p>

            {/* Billing Toggle */}
            <div className="mt-6 inline-flex items-center gap-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white/80 dark:bg-slate-900/60 p-1">
              <button
                onClick={() => setBilling("monthly")}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition ${
                  billing === "monthly"
                    ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900"
                    : "text-slate-700 dark:text-slate-200"
                }`}
              >
                Bulanan
              </button>
              <button
                onClick={() => setBilling("yearly")}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition ${
                  billing === "yearly"
                    ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900"
                    : "text-slate-700 dark:text-slate-200"
                }`}
              >
                Tahunan <span className="ml-1 inline-block rounded bg-amber-100 text-amber-700 px-2 py-0.5 text-[11px]">Hemat ~20%</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Cards */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 pb-10 sm:pb-16">
        <div className="grid gap-6 md:grid-cols-3">
          {tiers.map((t) => (
            <div
              key={t.id}
              className={`relative rounded-2xl ring-1 ring-black/5 dark:ring-white/10 bg-white/90 dark:bg-slate-900/70 p-6 sm:p-8 shadow transition hover:shadow-lg ${
                t.popular ? "border-2 border-sky-300/70 dark:border-cyan-700/50" : ""
              }`}
            >
              {t.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 inline-flex items-center gap-1 rounded-full bg-sky-600 text-white px-3 py-1 text-xs font-semibold shadow">
                  <Star className="w-4 h-4" /> Paling Populer
                </div>
              )}

              <div className="flex items-center gap-2 text-slate-900 dark:text-white">
                <div className="grid place-items-center rounded-xl bg-slate-100 dark:bg-slate-800 p-2 text-sky-600 dark:text-cyan-400">
                  {t.icon}
                </div>
                <div>
                  <h3 className="text-xl font-bold">{t.name}</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-300">{t.tagline}</p>
                </div>
              </div>

              <div className="mt-5 flex items-end gap-2">
                {t.monthly === 0 ? (
                  <span className="text-3xl sm:text-4xl font-extrabold">Gratis</span>
                ) : (
                  <>
                    <span className="text-3xl sm:text-4xl font-extrabold">{currency(price(t.monthly, t.yearly))}</span>
                    <span className="text-sm text-slate-600 dark:text-slate-300">/ {billing === "monthly" ? "bulan" : "tahun"}</span>
                  </>
                )}
              </div>

              <ul className="mt-6 space-y-3">
                {t.features.map((f, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm">
                    <span
                      className={`mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-full ${
                        f.ok ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300" : "bg-slate-100 text-slate-400 dark:bg-slate-800 dark:text-slate-500"
                      }`}
                    >
                      <Check className="w-4 h-4" />
                    </span>
                    <span className={`${f.ok ? "text-slate-800 dark:text-slate-200" : "text-slate-400 dark:text-slate-500"}`}>{f.label}</span>
                  </li>
                ))}
              </ul>

              <a
                href={t.cta.href}
                className={`mt-7 group w-full inline-flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold transition ${
                  t.id === "student"
                    ? "bg-slate-900 text-white hover:bg-slate-800 dark:bg-white dark:text-slate-900 hover:opacity-90"
                    : t.id === "pro"
                    ? "bg-sky-600 text-white hover:bg-sky-700"
                    : "bg-amber-500 text-white hover:bg-amber-600"
                }`}
              >
                {t.cta.label}
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
              </a>

              {/* Guarantee */}
              <div className="mt-4 flex items-center gap-2 text-[12px] text-slate-500 dark:text-slate-400">
                <Shield className="w-4 h-4" /> Garansi 7 hari uang kembali (syarat berlaku)
              </div>
            </div>
          ))}
        </div>

        {/* Need help */}
        <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-between gap-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/60 p-5">
          <div className="flex items-center gap-3 text-slate-800 dark:text-slate-200">
            <MessageCircle className="w-5 h-5 text-sky-600 dark:text-cyan-400" />
            <p className="text-sm">Masih bingung pilih paket? Chat tim kami untuk rekomendasi.</p>
          </div>
          <a
            href="https://wa.me/6281234567890?text=Halo%20Coreline%2C%20saya%20ingin%20konsultasi%20soal%20paket%20harga"
            className="inline-flex items-center gap-2 rounded-xl bg-emerald-500 text-white px-4 py-2.5 text-sm font-semibold hover:bg-emerald-600"
          >
            Konsultasi via WhatsApp
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">Perbandingan Fitur</h2>
        <div className="mt-5 overflow-x-auto rounded-2xl ring-1 ring-black/5 dark:ring-white/10 bg-white/90 dark:bg-slate-900/70">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="text-left border-b border-slate-200 dark:border-slate-800">
                <th className="py-4 pl-5 pr-3 font-semibold">Fitur</th>
                <th className="py-4 px-3 font-semibold">Student</th>
                <th className="py-4 px-3 font-semibold">Pro</th>
                <th className="py-4 px-3 font-semibold">Prime</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Materi dasar", true, true, true],
                ["Modul premium", false, true, true],
                ["Sertifikat otomatis", false, true, true],
                ["Cloud sync", false, true, true],
                ["Mentoring grup", false, true, true],
                ["Mentoring 1:1", false, false, true],
                ["Bimbingan karier", false, true, true],
              ].map((row, i) => (
                <tr key={i} className="border-t border-slate-100 dark:border-slate-800">
                  <td className="py-3 pl-5 pr-3 text-slate-800 dark:text-slate-200">{row[0] as string}</td>
                  {[1, 2, 3].map((col) => (
                    <td key={col} className="py-3 px-3">
                      {(row[col] as boolean) ? (
                        <div className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300">
                          <Check className="w-4 h-4" />
                        </div>
                      ) : (
                        <div className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-slate-100 text-slate-400 dark:bg-slate-800 dark:text-slate-500">
                          <Check className="w-4 h-4 opacity-0" />
                        </div>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Testimonials + FAQs */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Testimonials */}
          <div className="rounded-2xl ring-1 ring-black/5 dark:ring-white/10 bg-white/90 dark:bg-slate-900/70 p-6">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <BadgeCheck className="w-5 h-5 text-emerald-500" /> Cerita Sukses
            </h3>
            <div className="mt-4 space-y-5">
              {[1, 2, 3].map((i) => (
                <blockquote key={i} className="rounded-xl bg-slate-50 dark:bg-slate-800/60 p-4">
                  <p className="text-[15px] text-slate-700 dark:text-slate-300">
                    “Materinya enak diikuti, proyeknya relevan. Lulus Pro langsung dapet sertifikat—kepake buat apply kerja!”
                  </p>
                  <footer className="mt-2 text-xs text-slate-500">— Alumni Coreline Pro #{i}</footer>
                </blockquote>
              ))}
            </div>
          </div>

          {/* FAQs */}
          <div className="rounded-2xl ring-1 ring-black/5 dark:ring-white/10 bg-white/90 dark:bg-slate-900/70 p-6">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-sky-600 dark:text-cyan-400" /> Pertanyaan Umum
            </h3>
            <div className="mt-4 divide-y divide-slate-200 dark:divide-slate-800">
              {faqs.map((f, i) => (
                <details key={i} className="group py-3">
                  <summary className="flex cursor-pointer list-none items-center justify-between text-sm font-semibold text-slate-800 dark:text-slate-200">
                    {f.q}
                    <span className="ml-3 text-slate-400 group-open:rotate-180 transition-transform">▾</span>
                  </summary>
                  <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </div>

        {/* Footer CTA */}
        <div className="mt-10 text-center">
          <a
            href="/register"
            className="inline-flex items-center gap-2 rounded-2xl bg-slate-900 text-white dark:bg-white dark:text-slate-900 px-6 py-3 font-semibold hover:opacity-90"
          >
            Coba Student Gratis Sekarang <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </section>
    </div>
  );
}
