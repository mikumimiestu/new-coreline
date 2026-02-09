import { useEffect, useState } from "react";
import {
  Check,
  Zap,
  Crown,
  Sparkles,
  MessageCircle,
  ArrowRight,
  BadgeCheck,
  HelpCircle,
  Star,
  Code2,
  Rocket, // Icon baru untuk Ultra
  MonitorPlay,
  Briefcase
} from "lucide-react";

/**
 * Coreline Pricing Page
 * - React + TailwindCSS (no external state)
 * - Monthly/Yearly toggle with ~20% discount for yearly
 * - Four tiers: Student (Free), Pro, Plus, Ultra
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
        { label: "Mode offline (download)", ok: false },
        { label: "Akses Source Code Project", ok: false },
        { label: "Sertifikat terverifikasi", ok: false },
      ],
    },
    {
      id: "pro",
      name: "Pro",
      tagline: "Level up dengan modul premium",
      icon: <Zap className="w-5 h-5" />,
      monthly: 20000,
      yearly: 192000, // Diskon 20%
      popular: true, // Masih popular karena entry level berbayar
      features: [
        { label: "Semua di Student", ok: true },
        { label: "Modul materi lengkap", ok: true },
        { label: "Akses Quiz & Latihan", ok: true },
        { label: "Sertifikat Coreline", ok: true },
        { label: "Real project portfolio", ok: false },
        { label: "Akses Source Code Project", ok: false },
      ],
    },
    {
      id: "plus",
      name: "Plus",
      tagline: "Resource lengkap & dukungan prioritas",
      icon: <Crown className="w-5 h-5" />,
      monthly: 68000,
      yearly: 650000, 
      popular: false,
      features: [
        { label: "Semua di Pro", ok: true },
        { label: "Mentoring Chat 1:1", ok: true },
        { label: "Akses Source Code Project", ok: true },
        { label: "Template portofolio", ok: true },
        { label: "Live Code Review", ok: false },
        { label: "Konsultasi Karir", ok: false },
      ],
    },
    {
      id: "ultra",
      name: "Ultra",
      tagline: "Akselerasi karir & mentoring eksklusif",
      icon: <Rocket className="w-5 h-5" />,
      monthly: 125000,
      yearly: 1200000, // Diskon 20% dari (125rb x 12 = 1.5jt)
      popular: false,
      isNew: true,
      features: [
        { label: "Semua di Plus", ok: true },
        { label: "Live Mentoring (Video Call)", ok: true },
        { label: "Code Review Personal", ok: true },
        { label: "Konsultasi Karir & CV", ok: true },
        { label: "Akses Project Enterprise", ok: true },
        { label: "Prioritas Lowongan Kerja", ok: true },
      ],
    },
  ] as const;

  const faqs = [
    {
      q: "Apa bedanya Plus dan Ultra?",
      a: "Paket Plus fokus pada resource code dan bantuan chat. Paket Ultra memberikan pengalaman mentoring langsung (Video Call), review code mendalam, dan bimbingan karir.",
    },
    {
      q: "Apakah bisa ganti paket kapan saja?",
      a: "Bisa. Upgrade/downgrade kapan pun; tagihan akan disesuaikan secara prorata tergantung metode pembayaran Anda.",
    },
    {
      q: "Apa itu Akses Source Code di paket Plus/Ultra?",
      a: "Anda akan mendapatkan full source code project real-world untuk dipelajari strukturnya. Sangat berguna untuk portofolio.",
    },
    {
      q: "Bagaimana sertifikat diterbitkan?",
      a: "Sertifikat otomatis keluar saat progres materi mencapai 100% di aplikasi Coreline Anda (Khusus Pro, Plus & Ultra).",
    },
  ];

  const testimonials = [
    {
      id: 1,
      text: "Materinya enak simple, enak di ikuti, proyeknya relevan. Lulus Pro langsung dapet sertifikat buat portfolio.",
      author: "Ruby",
      role: "Alumni Coreline Pro"
    },
    {
      id: 2,
      text: "Upgrade ke Ultra worth it banget buat yang mau switch career. Sesi mentoring video call ngebuka wawasan banget.",
      author: "Dimas",
      role: "Member Coreline Ultra"
    },
    {
      id: 3,
      text: "Template portofolio dari paket Plus bikin saya lebih pede buat apply freelance. Balik modal cepet!",
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
          <div className="max-w-3xl mx-auto text-center lg:text-left">
            <div className="inline-flex items-center gap-2 rounded-full border border-sky-200/70 dark:border-cyan-800/40 bg-white/70 dark:bg-slate-900/60 px-3 py-1 text-xs font-semibold text-sky-700 dark:text-cyan-300 mb-6">
              <BadgeCheck className="w-4 h-4" /> Investasi Leher ke Atas Terbaik
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-6">
              Pilih Paket Sesuai <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-600 to-violet-600 dark:from-cyan-400 dark:to-purple-400">Target Karirmu</span>
            </h1>
            <p className="text-slate-600 dark:text-slate-300 max-w-2xl mx-auto lg:mx-0 text-lg">
              Dari belajar santai hingga persiapan karir profesional. Upgrade skill coding kamu dengan kurikulum standar industri.
            </p>

            {/* Billing Toggle */}
            <div className="mt-8 inline-flex items-center gap-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white/80 dark:bg-slate-900/60 p-1.5 shadow-sm">
              <button
                onClick={() => setBilling("monthly")}
                className={`px-6 py-2.5 rounded-lg text-sm font-bold transition-all ${
                  billing === "monthly"
                    ? "bg-slate-900 text-white shadow-md dark:bg-white dark:text-slate-900"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                Bulanan
              </button>
              <button
                onClick={() => setBilling("yearly")}
                className={`px-6 py-2.5 rounded-lg text-sm font-bold transition-all relative ${
                  billing === "yearly"
                    ? "bg-slate-900 text-white shadow-md dark:bg-white dark:text-slate-900"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                Tahunan
                <span className="absolute -top-3 -right-3 rotate-12 bg-amber-400 text-amber-950 text-[10px] font-black px-2 py-0.5 rounded-full shadow-sm border border-white dark:border-slate-800">
                  HEMAT 20%
                </span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Cards Grid */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 pb-10 sm:pb-16">
        {/* Responsive Grid: 1 col mobile, 2 col tablet, 4 col desktop */}
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4 items-start">
          {tiers.map((t) => (
            <div
              key={t.id}
              className={`relative flex flex-col h-full rounded-3xl p-6 sm:p-8 transition-all duration-300 hover:-translate-y-1 ${
                t.popular
                  ? "ring-2 ring-sky-500 bg-white dark:bg-slate-900 shadow-xl shadow-sky-500/10 z-10"
                  : t.id === "ultra"
                  ? "ring-2 ring-violet-500 bg-slate-50 dark:bg-slate-900/80 shadow-2xl shadow-violet-500/20 z-10"
                  : "ring-1 ring-slate-200 dark:ring-slate-800 bg-white/60 dark:bg-slate-900/40 hover:shadow-lg"
              }`}
            >
              {/* Badges */}
              {t.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 inline-flex items-center gap-1 rounded-full bg-sky-500 text-white px-4 py-1 text-xs font-bold shadow-lg shadow-sky-500/30 uppercase tracking-wider">
                  <Star className="w-3 h-3 fill-current" /> Paling Populer
                </div>
              )}
              {/* @ts-ignore */}
              {t.isNew && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 inline-flex items-center gap-1 rounded-full bg-violet-600 text-white px-4 py-1 text-xs font-bold shadow-lg shadow-violet-600/30 uppercase tracking-wider">
                  <Rocket className="w-3 h-3 fill-current" /> Best Value
                </div>
              )}

              <div className="mb-6">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 ${
                  t.id === "student" ? "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400" :
                  t.id === "pro" ? "bg-sky-100 text-sky-600 dark:bg-sky-900/30 dark:text-sky-400" :
                  t.id === "plus" ? "bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400" :
                  "bg-violet-100 text-violet-600 dark:bg-violet-900/30 dark:text-violet-400"
                }`}>
                  {t.icon}
                </div>
                <h3 className="text-2xl font-black text-slate-900 dark:text-white">{t.name}</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 font-medium min-h-[40px]">
                  {t.tagline}
                </p>
              </div>

              <div className="mb-8">
                {t.monthly === 0 ? (
                  <span className="text-4xl font-black text-slate-900 dark:text-white">
                    Gratis
                  </span>
                ) : (
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-black text-slate-900 dark:text-white">
                      {currency(price(t.monthly, t.yearly))}
                    </span>
                    <span className="text-sm font-semibold text-slate-500 dark:text-slate-400">
                      /{billing === "monthly" ? "bln" : "thn"}
                    </span>
                  </div>
                )}
                {billing === "yearly" && t.monthly > 0 && (
                   <p className="text-xs text-emerald-600 dark:text-emerald-400 font-bold mt-2">
                     Hemat {(price(t.monthly, t.yearly) / 12) < t.monthly ? "20%" : ""} per bulan
                   </p>
                )}
              </div>

              <ul className="space-y-4 mb-8 flex-1">
                {t.features.map((f, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm">
                    <div className={`mt-0.5 flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center ${
                      f.ok
                        ? t.id === "ultra" ? "bg-violet-100 text-violet-700 dark:bg-violet-900/50 dark:text-violet-300" 
                        : "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300"
                        : "bg-slate-100 text-slate-400 dark:bg-slate-800 dark:text-slate-600"
                    }`}>
                      <Check className="w-3 h-3" strokeWidth={3} />
                    </div>
                    <span className={`${
                      f.ok
                        ? "text-slate-700 dark:text-slate-200 font-medium"
                        : "text-slate-400 dark:text-slate-600"
                    }`}>
                      {f.label}
                    </span>
                  </li>
                ))}
              </ul>

              <a
                href={payHref(t.id, t.monthly, t.yearly)}
                className={`w-full inline-flex items-center justify-center gap-2 rounded-xl px-4 py-3.5 text-sm font-bold transition-all transform active:scale-95 ${
                  t.id === "student"
                    ? "bg-slate-100 text-slate-900 hover:bg-slate-200 dark:bg-slate-800 dark:text-white dark:hover:bg-slate-700"
                    : t.id === "pro"
                    ? "bg-sky-500 text-white hover:bg-sky-600 shadow-lg shadow-sky-500/25 hover:shadow-sky-500/40"
                    : t.id === "plus"
                    ? "bg-amber-500 text-white hover:bg-amber-600 shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40"
                    : "bg-gradient-to-r from-violet-600 to-indigo-600 text-white hover:from-violet-500 hover:to-indigo-500 shadow-lg shadow-violet-500/30 hover:shadow-violet-500/50"
                }`}
              >
                {t.id === "student" ? "Mulai Sekarang" : "Pilih Paket " + t.name}
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          ))}
        </div>

        {/* Need help */}
        <div className="mt-12 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-sky-100 dark:bg-sky-900/30 text-sky-600 dark:text-sky-400 rounded-full">
              <MessageCircle className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-slate-900 dark:text-white text-lg">Butuh konsultasi paket?</h4>
              <p className="text-slate-600 dark:text-slate-400 text-sm">
                Chat tim kami untuk mendapatkan rekomendasi paket yang cocok dengan tujuan karirmu.
              </p>
            </div>
          </div>
          <a
            href="https://wa.me/6285183209494?text=Halo%20Coreline%2C%20saya%20ingin%20konsultasi%20soal%20paket%20Ultra"
            className="flex-shrink-0 inline-flex items-center gap-2 rounded-xl bg-emerald-500 text-white px-6 py-3 text-sm font-bold hover:bg-emerald-600 transition shadow-lg shadow-emerald-500/20"
          >
            Chat WhatsApp
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 pb-16 hidden lg:block">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-black text-slate-900 dark:text-white">
            Perbandingan Detail Fitur
          </h2>
          <p className="text-slate-500 dark:text-slate-400 mt-2">
            Lihat apa yang membedakan setiap paket.
          </p>
        </div>
        
        <div className="overflow-hidden rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xl">
          <table className="w-full text-sm text-left">
            <thead className="bg-slate-50 dark:bg-slate-800/50">
              <tr>
                <th className="py-5 pl-8 pr-4 font-bold text-slate-900 dark:text-white w-1/4">FITUR</th>
                <th className="py-5 px-4 font-bold text-slate-900 dark:text-white text-center w-1/6">Student</th>
                <th className="py-5 px-4 font-bold text-sky-600 dark:text-sky-400 text-center w-1/6">Pro</th>
                <th className="py-5 px-4 font-bold text-amber-600 dark:text-amber-400 text-center w-1/6">Plus</th>
                <th className="py-5 px-4 font-bold text-violet-600 dark:text-violet-400 text-center w-1/6 bg-violet-50 dark:bg-violet-900/20">Ultra</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {[
                { name: "Akses Materi Dasar", v: [true, true, true, true] },
                { name: "Modul Premium & Kuis", v: [false, true, true, true] },
                { name: "Sertifikat Digital", v: [false, true, true, true] },
                { name: "Mentoring Chat 1:1", v: [false, false, true, true] },
                { name: "Akses Source Code", v: [false, false, true, true], icon: Code2 },
                { name: "Live Mentoring (Video Call)", v: [false, false, false, true], icon: MonitorPlay },
                { name: "Review Code Personal", v: [false, false, false, true], icon: Code2 },
                { name: "Konsultasi Karir & CV", v: [false, false, false, true], icon: Briefcase },
                { name: "Prioritas Lowongan Kerja", v: [false, false, false, true], icon: Star },
              ].map((row, i) => (
                <tr key={i} className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                  <td className="py-4 pl-8 pr-4 font-medium text-slate-700 dark:text-slate-300 flex items-center gap-2">
                    {row.icon && <row.icon className={`w-4 h-4 ${i >= 5 ? 'text-violet-500' : 'text-slate-400'}`} />}
                    {row.name}
                  </td>
                  {row.v.map((active, j) => (
                    <td key={j} className={`py-4 px-4 text-center ${j === 3 ? 'bg-violet-50/50 dark:bg-violet-900/10' : ''}`}>
                      {active ? (
                        <div className={`inline-flex items-center justify-center w-6 h-6 rounded-full ${
                          j === 3 
                            ? "bg-violet-100 text-violet-600 dark:bg-violet-900/40 dark:text-violet-300" 
                            : "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400"
                        }`}>
                          <Check className="w-4 h-4" strokeWidth={3} />
                        </div>
                      ) : (
                        <div className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-slate-100 text-slate-300 dark:bg-slate-800 dark:text-slate-600">
                          <Check className="w-4 h-4" />
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
          <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 p-8 shadow-sm">
            <h3 className="text-2xl font-black text-slate-900 dark:text-white flex items-center gap-2 mb-6">
              <BadgeCheck className="w-6 h-6 text-emerald-500" /> Kata Mereka
            </h3>
            <div className="space-y-6">
              {testimonials.map((t) => (
                <div
                  key={t.id}
                  className="rounded-2xl bg-slate-50 dark:bg-slate-800 p-5 relative"
                >
                  <p className="text-slate-700 dark:text-slate-300 italic relative z-10">
                    "{t.text}"
                  </p>
                  <div className="mt-4 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center font-bold text-xs">
                      {t.author[0]}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-900 dark:text-white">{t.author}</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">{t.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* FAQs */}
          <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 p-8 shadow-sm">
            <h3 className="text-2xl font-black text-slate-900 dark:text-white flex items-center gap-2 mb-6">
              <HelpCircle className="w-6 h-6 text-sky-600 dark:text-cyan-400" />{" "}
              FAQ
            </h3>
            <div className="space-y-4">
              {faqs.map((f, i) => (
                <div key={i} className="rounded-2xl border border-slate-100 dark:border-slate-800 overflow-hidden">
                  <details className="group">
                    <summary className="flex cursor-pointer list-none items-center justify-between p-5 text-sm font-bold text-slate-800 dark:text-slate-200 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                      {f.q}
                      <span className="ml-3 text-slate-400 transition-transform group-open:rotate-180">
                        ▼
                      </span>
                    </summary>
                    <div className="px-5 pb-5 text-sm leading-relaxed text-slate-600 dark:text-slate-400 bg-white dark:bg-slate-900">
                      {f.a}
                    </div>
                  </details>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer CTA */}
        <div className="mt-16 text-center">
          <p className="text-slate-500 dark:text-slate-400 mb-6">
            Masih ragu? Coba dulu paket gratisnya. Tidak perlu kartu kredit.
          </p>
          <a
            href={payHref("student", 0, 0)}
            className="inline-flex items-center gap-2 rounded-full border-2 border-slate-200 dark:border-slate-700 bg-transparent px-8 py-3 font-bold text-slate-900 dark:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition"
          >
            Daftar Student Account
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </section>
    </div>
  );
}