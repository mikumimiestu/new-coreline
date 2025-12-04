import { useEffect, useState } from "react";
import {
  Check,
  Zap,
  Crown,
  Sparkles,
  Shield,
  MessageCircle,
  ArrowRight,
  BadgeCheck,
  HelpCircle,
  Star,
  Code2, 
} from "lucide-react";

/**
 * Coreline Pricing Page
 * - React + TailwindCSS (no external state)
 * - Monthly/Yearly toggle with ~20% discount for yearly
 * - Three tiers: Student (Free), Pro, Plus
 * - Feature comparison, FAQs, Testimonials
 * - CTA -> /pay?tier=...&amount=...&cycle=monthly|yearly&token=...
 */

const TOKEN_KEY = "astbyte_token";

export default function PricingPage() {
  const [billing, setBilling] = useState<"monthly" | "yearly">("monthly");

  useEffect(() => {
    document.title = "Pricing | New Coreline by AstByte";
  }, []);

  const currency = (n: number) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(n);

  const price = (monthly: number, yearly: number) =>
    billing === "monthly" ? monthly : yearly;

  // helper ambil token dari localStorage (kalau ada)
  const getToken = () => {
    if (typeof window === "undefined") return "";
    return localStorage.getItem(TOKEN_KEY) || "";
  };

  // helper buat bikin link ke /pay + ikut sertakan token
  const payHref = (id: string, monthly: number, yearly: number) => {
    const base = "/pay";
    const tier = encodeURIComponent(id);
    const amount = price(monthly, yearly);
    const cycle = billing;
    const token = getToken();

    const params = new URLSearchParams();
    params.set("tier", tier);
    params.set("amount", String(amount));
    params.set("cycle", cycle);
    if (token) {
      params.set("token", token);
    }

    return `${base}?${params.toString()}`;
  };

  const tiers = [
    {
      id: "student",
      name: "Student",
      tagline: "Mulai gratis untuk belajar tanpa hambatan",
      icon: <Sparkles className="w-5 h-5" />,
      monthly: 0,
      yearly: 0,
      popular: false,
      features: [
        { label: "Akses pengenalan materi", ok: true },
        { label: "Progress & penyimpanan lokal", ok: false },
        { label: "No ads", ok: false },
        { label: "Mode offline (download materi)", ok: false },
        { label: "Akses Source Code Project", ok: false },
        { label: "Sertifikat terverifikasi", ok: false },
      ],
    },
    {
      id: "pro",
      name: "Pro",
      tagline: "Level up dengan modul premium & sertifikat",
      icon: <Zap className="w-5 h-5" />,
      monthly: 20000,
      yearly: 192000, // Diskon 20% dari (20rb x 12)
      popular: true,
      features: [
        { label: "Semua di Student", ok: true },
        { label: "Modul materi lengkap", ok: true },
        { label: "Akses Quiz & Latihan", ok: true },
        { label: "Sertifikat terverifikasi Coreline", ok: true },
        { label: "Real project & review portofolio", ok: false },
        { label: "Akses Source Code Project", ok: false },
      ],
    },
    {
      id: "plus",
      name: "Plus",
      tagline: "Akses penuh ke semua resource & kode",
      icon: <Crown className="w-5 h-5" />,
      monthly: 68000,
      yearly: 650000, // Diskon ~20% dari (68rb x 12)
      popular: false,
      features: [
        { label: "Semua di Pro", ok: true },
        { label: "Mentoring prioritas 1:1 (Chat)", ok: true },
        { label: "Akses Source Code & Asset Project", ok: true },
        { label: "Dukungan prioritas", ok: true },
        { label: "Template portofolio profesional", ok: true },
        { label: "Free (1) website portofolio" , ok: true}
      ],
    },
  ] as const;

  const faqs = [
    {
      q: "Apakah bisa ganti paket kapan saja?",
      a: "Bisa. Upgrade/downgrade kapan pun; tagihan akan disesuaikan secara prorata tergantung metode pembayaran Anda.",
    },
    {
      q: "Apa itu Akses Source Code di paket Plus?",
      a: "Di paket Plus, Anda akan mendapatkan beberapa source code untuk dipelajari. Ini berguna untuk memahami struktur codingan yang baik dan rapi.",
    },
    {
      q: "Bagaimana sertifikat diterbitkan?",
      a: "Sertifikat otomatis keluar saat progres materi mencapai 100% di aplikasi Coreline Anda (Khusus Pro & Plus).",
    },
  ];

  // Data Testimoni yang berbeda-beda
  const testimonials = [
    {
      id: 1,
      text: "Materinya enak simple, enak di ikuti, proyeknya relevan. Lulus Pro langsung dapet sertifikat buat portfolio.",
      author: "Ruby",
      role: "Alumni Coreline Pro"
    },
    {
      id: 2,
      text: "Akses source code di paket Plus sangat membantu saya memahami struktur codingan yang rapi. Worth every penny!",
      author: "Dimas",
      role: "Member Coreline Plus"
    },
    {
      id: 3,
      text: "Awalnya ragu, tapi fitur template portofolio-nya bikin saya lebih pede buat apply freelance. Makasih AstByte!",
      author: "Sarah",
      role: "Frontend Developer"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900">
      {/* Hero */}
      <header className="relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-20 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-300 via-transparent to-transparent" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-sky-200/70 dark:border-cyan-800/40 bg-white/70 dark:bg-slate-900/60 px-3 py-1 text-xs font-semibold text-sky-700 dark:text-cyan-300">
              <BadgeCheck className="w-4 h-4" /> Harga transparan, manfaat
              maksimal
            </div>
            <h1 className="mt-4 text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              Invest ke diri sendiri, mulai dari{" "}
              <span className="text-sky-600 dark:text-cyan-400">gratis</span>
            </h1>
            <p className="mt-4 text-slate-600 dark:text-slate-300 max-w-2xl">
              Pilih paket yang pas buat perjalanan belajarmu. Upgrade kapan
              saja. Berhenti kapan saja.
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
                Tahunan{" "}
                <span className="ml-1 inline-block rounded bg-amber-100 text-amber-700 px-2 py-0.5 text-[11px]">
                  Hemat ~20%
                </span>
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
                t.popular
                  ? "border-2 border-sky-300/70 dark:border-cyan-700/50"
                  : ""
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
                  <p className="text-sm text-slate-600 dark:text-slate-300">
                    {t.tagline}
                  </p>
                </div>
              </div>

              <div className="mt-5 flex items-end gap-2">
                {t.monthly === 0 ? (
                  <span className="text-3xl sm:text-4xl font-extrabold">
                    Gratis
                  </span>
                ) : (
                  <>
                    <span className="text-3xl sm:text-4xl font-extrabold">
                      {currency(price(t.monthly, t.yearly))}
                    </span>
                    <span className="text-sm text-slate-600 dark:text-slate-300">
                      / {billing === "monthly" ? "bulan" : "tahun"}
                    </span>
                  </>
                )}
              </div>

              <ul className="mt-6 space-y-3">
                {t.features.map((f, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm">
                    <span
                      className={`mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-full ${
                        f.ok
                          ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300"
                          : "bg-slate-100 text-slate-400 dark:bg-slate-800 dark:text-slate-500"
                      }`}
                    >
                      <Check className="w-4 h-4" />
                    </span>
                    <span
                      className={`${
                        f.ok
                          ? "text-slate-800 dark:text-slate-200"
                          : "text-slate-400 dark:text-slate-500"
                      }`}
                    >
                      {f.label}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA -> /pay (+ token) */}
              <a
                href={payHref(t.id, t.monthly, t.yearly)}
                className={`mt-7 group w-full inline-flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold transition ${
                  t.id === "student"
                    ? "bg-slate-900 text-white hover:bg-slate-800 dark:bg-white dark:text-slate-900 hover:opacity-90"
                    : t.id === "pro"
                    ? "bg-sky-600 text-white hover:bg-sky-700"
                    : "bg-amber-500 text-white hover:bg-amber-600"
                }`}
              >
                {t.id === "student"
                  ? "Mulai Gratis"
                  : t.id === "pro"
                  ? "Upgrade Pro"
                  : "Gabung Plus"}
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
              </a>
            </div>
          ))}
        </div>

        {/* Need help */}
        <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-between gap-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/60 p-5">
          <div className="flex items-center gap-3 text-slate-800 dark:text-slate-200">
            <MessageCircle className="w-5 h-5 text-sky-600 dark:text-cyan-400" />
            <p className="text-sm">
              Masih bingung pilih paket? Chat tim kami untuk rekomendasi.
            </p>
          </div>
          <a
            href="https://wa.me/6285183209494?text=Halo%20Coreline%2C%20saya%20ingin%20konsultasi%20soal%20paket%20harga"
            className="inline-flex items-center gap-2 rounded-xl bg-emerald-500 text-white px-4 py-2.5 text-sm font-semibold hover:bg-emerald-600"
          >
            Konsultasi via WhatsApp
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
          Perbandingan Fitur
        </h2>
        <div className="mt-5 overflow-x-auto rounded-2xl ring-1 ring-black/5 dark:ring-white/10 bg-white/90 dark:bg-slate-900/70">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="text-left border-b border-slate-200 dark:border-slate-800">
                <th className="py-4 pl-5 pr-3 font-semibold">Fitur</th>
                <th className="py-4 px-3 font-semibold">Student</th>
                <th className="py-4 px-3 font-semibold">Pro</th>
                <th className="py-4 px-3 font-semibold">Plus</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Materi dasar", true, true, true],
                ["Modul premium & Kuis", false, true, true],
                ["Sertifikat otomatis", false, true, true],
                ["No ads", false, true, true],
                ["Mentoring 1:1 (Chat)", false, false, true],
                ["Akses Source Code Project", false, false, true], // Pengganti Kelas Live
                ["Dukungan prioritas", false, false, true],
                ["Template portofolio profesional", false, false, true],
                ["Free (1) website portofolio", false, false, true],
              ].map((row, i) => (
                <tr
                  key={i}
                  className="border-t border-slate-100 dark:border-slate-800"
                >
                  <td className="py-3 pl-5 pr-3 text-slate-800 dark:text-slate-200 flex items-center gap-2">
                     {row[0] === "Akses Source Code Project" && <Code2 className="w-4 h-4 text-amber-500"/>}
                     {row[0] as string}
                  </td>
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
              {testimonials.map((t) => (
                <blockquote
                  key={t.id}
                  className="rounded-xl bg-slate-50 dark:bg-slate-800/60 p-4"
                >
                  <p className="text-[15px] text-slate-700 dark:text-slate-300">
                    “{t.text}”
                  </p>
                  <footer className="mt-2 text-xs text-slate-500 font-medium">
                    — {t.author} | <span className="text-sky-600 dark:text-sky-400">{t.role}</span>
                  </footer>
                </blockquote>
              ))}
            </div>
          </div>

          {/* FAQs */}
          <div className="rounded-2xl ring-1 ring-black/5 dark:ring-white/10 bg-white/90 dark:bg-slate-900/70 p-6">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-sky-600 dark:text-cyan-400" />{" "}
              Pertanyaan Umum
            </h3>
            <div className="mt-4 divide-y divide-slate-200 dark:divide-slate-800">
              {faqs.map((f, i) => (
                <details key={i} className="group py-3">
                  <summary className="flex cursor-pointer list-none items-center justify-between text-sm font-semibold text-slate-800 dark:text-slate-200">
                    {f.q}
                    <span className="ml-3 text-slate-400 group-open:rotate-180 transition-transform">
                      ▾
                    </span>
                  </summary>
                  <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                    {f.a}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </div>

        {/* Footer CTA -> /pay untuk Student (ikut token juga) */}
        <div className="mt-10 text-center">
          <a
            href={payHref("student", 0, 0)}
            className="inline-flex items-center gap-2 rounded-2xl bg-slate-900 text-white dark:bg-white dark:text-slate-900 px-6 py-3 font-semibold hover:opacity-90"
          >
            Coba Student Gratis Sekarang
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </section>
    </div>
  );
}