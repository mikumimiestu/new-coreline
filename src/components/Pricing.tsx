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
  Rocket,
  MonitorPlay,
  Briefcase,
  CloudMoon,
  Percent
} from "lucide-react";

/**
 * Coreline Pricing Page - Ramadhan Edition (Promo 20%)
 * Theme: Night of Glory (Emerald, Gold, Midnight Blue)
 */

const TOKEN_KEY = "astbyte_token";

/* ================================
 * Helper: Decorative Lantern
 * ================================ */
const HangingLantern = ({ height = 'h-24', delay = '0s', left = 'left-10' }: { height?: string, delay?: string, left?: string }) => (
  <div className={`absolute top-0 ${left} flex flex-col items-center z-20 animate-swing origin-top hidden md:flex`} style={{ animationDelay: delay }}>
    <div className={`w-[1px] ${height} bg-amber-500/50`}></div>
    <div className="w-8 h-10 bg-gradient-to-b from-amber-600 to-amber-800 rounded-t-lg rounded-b-xl border border-amber-400/50 shadow-[0_0_15px_rgba(245,158,11,0.6)] flex items-center justify-center relative">
      <div className="w-4 h-6 bg-yellow-100/30 rounded-full blur-[2px] animate-pulse"></div>
    </div>
    <div className="flex gap-[2px] mt-[1px]">
       <div className="w-[1px] h-3 bg-red-500/80"></div>
       <div className="w-[1px] h-4 bg-red-500/80"></div>
    </div>
  </div>
);

export default function PricingPage() {
  const [billing, setBilling] = useState<"monthly" | "yearly">("monthly");

  useEffect(() => {
    document.title = "Promo Ramadhan | Coreline by AstByte";
  }, []);

  const currency = (n: number) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(n);

  // Helper untuk memilih harga based on toggle
  const price = (monthly: number, yearly: number) =>
    billing === "monthly" ? monthly : yearly;

  const getToken = () => {
    if (typeof window === "undefined") return "";
    return localStorage.getItem(TOKEN_KEY) || "";
  };

  const payHref = (id: string, amount: number) => {
    const base = "/pay";
    const tier = encodeURIComponent(id);
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

  // DATA PAKET DENGAN HARGA DISKON 20%
  const tiers = [
    {
      id: "student",
      name: "Student",
      tagline: "Mulai gratis untuk ngabuburit produktif",
      icon: <Sparkles className="w-5 h-5" />,
      // Free Tier: No Discount Logic needed
      monthly: 0, 
      originalMonthly: 0,
      yearly: 0,
      originalYearly: 0,
      popular: false,
      features: [
        { label: "Akses pengenalan materi", ok: true },
        { label: "Progress & penyimpanan lokal", ok: false },
        { label: "Tanpa Iklan", ok: false },
        { label: "Mode I'tikaf (Offline)", ok: false },
        { label: "Akses Source Code Project", ok: false },
        { label: "Sertifikat Ramadhan", ok: false },
      ],
    },
    {
      id: "pro",
      name: "Pro",
      tagline: "Tingkatkan skill dengan modul premium",
      icon: <Zap className="w-5 h-5" />,
      // Base: 20rb -> Disc 20% -> 16rb
      monthly: 16000, 
      originalMonthly: 20000,
      // Base Year: 192rb -> Disc 20% -> 153.6rb
      yearly: 153600,
      originalYearly: 192000,
      popular: true,
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
      // Base: 68rb -> Disc 20% -> 54.4rb
      monthly: 54400,
      originalMonthly: 68000,
      // Base Year: 650rb -> Disc 20% -> 520rb
      yearly: 520000,
      originalYearly: 650000,
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
      // Base: 125rb -> Disc 20% -> 100rb
      monthly: 100000,
      originalMonthly: 125000,
      // Base Year: 1.2jt -> Disc 20% -> 960rb
      yearly: 960000,
      originalYearly: 1200000,
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
      q: "Sampai kapan promo Ramadhan ini berlaku?",
      a: "Promo diskon 20% berlaku selama bulan Ramadhan 1447 H. Harga akan kembali normal setelah Lebaran.",
    },
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
  ];

  const testimonials = [
    {
      id: 1,
      text: "Materinya enak simple, cocok banget buat nunggu buka puasa. Lulus Pro langsung dapet sertifikat buat portfolio.",
      author: "Ruby",
      role: "Alumni Coreline Pro"
    },
    {
      id: 2,
      text: "Investasi THR terbaik. Upgrade ke Ultra pas promo gini worth it banget. Mentornya sabar banget.",
      author: "Dimas",
      role: "Member Coreline Ultra"
    },
    {
      id: 3,
      text: "Template portofolio dari paket Plus bikin saya lebih pede buat apply freelance sebelum lebaran.",
      author: "Sarah",
      role: "Frontend Developer"
    }
  ];

  return (
    <div className="min-h-screen bg-[#022c22] text-slate-100 font-sans selection:bg-amber-500/30 overflow-hidden relative">
      
      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none">
         <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/arabesque.png')]"></div>
         <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-amber-500/10 blur-[100px] animate-pulse" />
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-full bg-gradient-to-b from-[#064e3b]/30 to-transparent" />
      </div>

      {/* Hanging Lanterns */}
      <HangingLantern left="left-20" height="h-32" delay="0s" />
      <HangingLantern left="right-20" height="h-40" delay="1s" />

      {/* Hero */}
      <header className="relative pt-20 pb-16 z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            
            {/* Promo Banner */}
            <div className="inline-flex items-center gap-2 rounded-full border border-red-500/50 bg-red-900/30 px-4 py-1.5 text-xs font-bold text-red-200 mb-6 shadow-[0_0_20px_rgba(220,38,38,0.4)] animate-bounce-slow">
              <Percent className="w-4 h-4 fill-current" /> PROMO SPESIAL RAMADHAN: DISKON 20%
            </div>
            
            <h1 className="text-4xl sm:text-6xl font-serif font-black tracking-tight text-white mb-6 leading-tight drop-shadow-lg">
              Investasi Ilmu <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-500">
                Pahala Mengalir.
              </span>
            </h1>
            
            <p className="text-emerald-200/80 max-w-2xl mx-auto text-lg mb-10">
              Manfaatkan bulan suci untuk upgrade skill coding dengan harga lebih hemat. Pilih paket yang sesuai dan raih kemenangan karir.
            </p>

            {/* Billing Toggle (Styled) */}
            <div className="inline-flex items-center gap-2 rounded-2xl border border-emerald-800 bg-[#022c22]/80 p-1.5 shadow-lg relative z-20">
              <button
                onClick={() => setBilling("monthly")}
                className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${
                  billing === "monthly"
                    ? "bg-emerald-600 text-white shadow-lg shadow-emerald-500/20"
                    : "text-emerald-400 hover:text-emerald-200"
                }`}
              >
                Bulanan
              </button>
              <button
                onClick={() => setBilling("yearly")}
                className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all relative ${
                  billing === "yearly"
                    ? "bg-gradient-to-r from-amber-500 to-yellow-600 text-[#022c22] shadow-lg shadow-amber-500/30"
                    : "text-emerald-400 hover:text-emerald-200"
                }`}
              >
                Tahunan
                <span className="absolute -top-3 -right-3 rotate-12 bg-red-600 text-white text-[10px] font-black px-2 py-0.5 rounded-full shadow-sm border border-red-400 animate-pulse">
                  HEMAT EXTRA
                </span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Cards Grid */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 pb-10 sm:pb-16 relative z-10">
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4 items-start">
          {tiers.map((t) => {
            const currentPrice = price(t.monthly, t.yearly);
            const originalPrice = price(t.originalMonthly, t.originalYearly);
            const isDiscounted = currentPrice < originalPrice;

            return (
              <div
                key={t.id}
                className={`relative flex flex-col h-full rounded-3xl p-6 sm:p-8 transition-all duration-300 hover:-translate-y-2 border ${
                  t.popular
                    ? "border-amber-500/50 bg-[#064e3b]/80 shadow-[0_0_30px_rgba(245,158,11,0.15)] z-10 scale-105 md:scale-100"
                    : t.id === "ultra"
                    ? "border-purple-500/50 bg-[#1e1b4b]/60 shadow-[0_0_30px_rgba(139,92,246,0.15)] z-10"
                    : "border-emerald-800/50 bg-[#022c22]/60 hover:bg-[#064e3b]/40 hover:shadow-lg"
                }`}
              >
                {/* Badges */}
                {t.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-amber-500 to-yellow-600 text-[#022c22] px-4 py-1 text-xs font-black shadow-lg shadow-amber-500/30 uppercase tracking-wider">
                    <Star className="w-3 h-3 fill-current" /> Paling Diminati
                  </div>
                )}
                {/* @ts-ignore */}
                {t.isNew && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 inline-flex items-center gap-1 rounded-full bg-violet-600 text-white px-4 py-1 text-xs font-black shadow-lg shadow-violet-600/30 uppercase tracking-wider">
                    <Rocket className="w-3 h-3 fill-current" /> Best Value
                  </div>
                )}

                <div className="mb-4">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 shadow-inner ${
                    t.id === "student" ? "bg-emerald-900/50 text-emerald-400 border border-emerald-700" :
                    t.id === "pro" ? "bg-amber-900/30 text-amber-400 border border-amber-500/30" :
                    t.id === "plus" ? "bg-cyan-900/30 text-cyan-400 border border-cyan-500/30" :
                    "bg-violet-900/30 text-violet-400 border border-violet-500/30"
                  }`}>
                    {t.icon}
                  </div>
                  <h3 className="text-2xl font-serif font-black text-white">{t.name}</h3>
                  <p className="text-sm text-emerald-200/60 mt-2 font-medium min-h-[40px] leading-relaxed">
                    {t.tagline}
                  </p>
                </div>

                {/* PRICING SECTION */}
                <div className="mb-8">
                  {t.monthly === 0 ? (
                    <span className="text-4xl font-serif font-black text-white">
                      Gratis
                    </span>
                  ) : (
                    <div>
                      {/* Original Price (Strikethrough) */}
                      {isDiscounted && (
                        <div className="flex items-center gap-2 mb-1">
                           <span className="text-sm line-through text-slate-500 font-medium">
                             {currency(originalPrice)}
                           </span>
                           <span className="bg-red-500/20 text-red-300 text-[10px] font-bold px-2 py-0.5 rounded-full border border-red-500/30 animate-pulse">
                             -20% RAMADHAN
                           </span>
                        </div>
                      )}
                      
                      {/* Current Price */}
                      <div className="flex items-baseline gap-1">
                        <span className={`text-4xl font-serif font-black ${isDiscounted ? "text-amber-400" : "text-white"}`}>
                          {currency(currentPrice)}
                        </span>
                        <span className="text-sm font-semibold text-emerald-400">
                          /{billing === "monthly" ? "bln" : "thn"}
                        </span>
                      </div>
                    </div>
                  )}
                  {billing === "yearly" && t.monthly > 0 && (
                     <p className="text-xs text-amber-500/80 font-bold mt-2">
                       (Harga total setahun)
                     </p>
                  )}
                </div>

                <ul className="space-y-4 mb-8 flex-1">
                  {t.features.map((f, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm">
                      <div className={`mt-0.5 flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center ${
                        f.ok
                          ? t.id === "ultra" ? "bg-violet-500/20 text-violet-300" : "bg-emerald-500/20 text-emerald-400"
                          : "bg-slate-800 text-slate-600"
                      }`}>
                        <Check className="w-3 h-3" strokeWidth={3} />
                      </div>
                      <span className={`${
                        f.ok
                          ? "text-emerald-50 font-medium"
                          : "text-slate-500 line-through decoration-slate-600"
                      }`}>
                        {f.label}
                      </span>
                    </li>
                  ))}
                </ul>

                <a
                  href={payHref(t.id, currentPrice)}
                  className={`w-full inline-flex items-center justify-center gap-2 rounded-xl px-4 py-3.5 text-sm font-bold transition-all transform active:scale-95 shadow-lg ${
                    t.id === "student"
                      ? "bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white"
                      : t.id === "pro"
                      ? "bg-gradient-to-r from-amber-500 to-yellow-600 text-[#022c22] hover:from-amber-400 hover:to-yellow-500 shadow-amber-500/20"
                      : t.id === "plus"
                      ? "bg-gradient-to-r from-cyan-600 to-teal-600 text-white hover:from-cyan-500 hover:to-teal-500 shadow-cyan-500/20"
                      : "bg-gradient-to-r from-violet-600 to-indigo-600 text-white hover:from-violet-500 hover:to-indigo-500 shadow-violet-500/20"
                  }`}
                >
                  {t.id === "student" ? "Daftar Gratis" : "Ambil Promo " + t.name}
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            );
          })}
        </div>

        {/* Need help */}
        <div className="mt-12 rounded-3xl border border-emerald-800 bg-[#064e3b]/40 backdrop-blur-sm p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-inner">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-emerald-900/50 text-amber-400 rounded-full border border-emerald-700">
              <MessageCircle className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold font-serif text-white text-lg">Bingung pilih paket?</h4>
              <p className="text-emerald-200/70 text-sm">
                Chat admin kami untuk konsultasi paket yang cocok. Promo diskon bisa berakhir sewaktu-waktu.
              </p>
            </div>
          </div>
          <a
            href="https://wa.me/6285183209494?text=Halo%20Coreline%2C%20saya%20ingin%20konsultasi%20soal%20promo%20Ramadhan"
            className="flex-shrink-0 inline-flex items-center gap-2 rounded-xl bg-emerald-600 text-white px-6 py-3 text-sm font-bold hover:bg-emerald-500 transition shadow-lg shadow-emerald-600/20"
          >
            Chat WhatsApp
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 pb-16 hidden lg:block relative z-10">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-serif font-black text-white">
            Perbandingan Fitur Lengkap
          </h2>
          <p className="text-emerald-200/60 mt-2">
            Detail spesifikasi setiap tingkatan paket.
          </p>
        </div>
        
        <div className="overflow-hidden rounded-3xl border border-emerald-800 bg-[#064e3b]/20 backdrop-blur-md shadow-2xl">
          <table className="w-full text-sm text-left">
            <thead className="bg-emerald-900/50">
              <tr>
                <th className="py-5 pl-8 pr-4 font-bold text-white w-1/4">FITUR</th>
                <th className="py-5 px-4 font-bold text-emerald-400 text-center w-1/6">Student</th>
                <th className="py-5 px-4 font-bold text-amber-400 text-center w-1/6">Pro</th>
                <th className="py-5 px-4 font-bold text-cyan-400 text-center w-1/6">Plus</th>
                <th className="py-5 px-4 font-bold text-violet-400 text-center w-1/6 bg-violet-900/10">Ultra</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-emerald-800/50">
              {[
                { name: "Akses Materi Dasar", v: [true, true, true, true] },
                { name: "Modul Premium & Kuis", v: [false, true, true, true] },
                { name: "Sertifikat Ramadhan", v: [false, true, true, true] },
                { name: "Mentoring Chat 1:1", v: [false, false, true, true] },
                { name: "Akses Source Code", v: [false, false, true, true], icon: Code2 },
                { name: "Live Mentoring (Video Call)", v: [false, false, false, true], icon: MonitorPlay },
                { name: "Review Code Personal", v: [false, false, false, true], icon: Code2 },
                { name: "Konsultasi Karir & CV", v: [false, false, false, true], icon: Briefcase },
                { name: "Prioritas Lowongan Kerja", v: [false, false, false, true], icon: Star },
              ].map((row, i) => (
                <tr key={i} className="hover:bg-emerald-800/30 transition-colors">
                  <td className="py-4 pl-8 pr-4 font-medium text-emerald-100 flex items-center gap-2">
                    {row.icon && <row.icon className={`w-4 h-4 ${i >= 5 ? 'text-violet-400' : 'text-emerald-500'}`} />}
                    {row.name}
                  </td>
                  {row.v.map((active, j) => (
                    <td key={j} className={`py-4 px-4 text-center ${j === 3 ? 'bg-violet-900/10' : ''}`}>
                      {active ? (
                        <div className={`inline-flex items-center justify-center w-6 h-6 rounded-full ${
                          j === 3 
                            ? "bg-violet-900/50 text-violet-300" 
                            : "bg-emerald-900/50 text-emerald-400"
                        }`}>
                          <Check className="w-4 h-4" strokeWidth={3} />
                        </div>
                      ) : (
                        <div className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-slate-800 text-slate-600">
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
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 pb-20 relative z-10">
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Testimonials */}
          <div className="rounded-3xl border border-emerald-800 bg-[#064e3b]/20 p-8 shadow-sm">
            <h3 className="text-2xl font-serif font-black text-white flex items-center gap-2 mb-6">
              <BadgeCheck className="w-6 h-6 text-amber-400" /> Kata Mereka
            </h3>
            <div className="space-y-6">
              {testimonials.map((t) => (
                <div
                  key={t.id}
                  className="rounded-2xl bg-[#022c22]/80 border border-emerald-800 p-5 relative"
                >
                  <p className="text-emerald-100 italic relative z-10 text-sm leading-relaxed">
                    "{t.text}"
                  </p>
                  <div className="mt-4 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-emerald-800 flex items-center justify-center font-bold text-xs text-amber-400">
                      {t.author[0]}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-white">{t.author}</p>
                      <p className="text-xs text-emerald-400">{t.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* FAQs */}
          <div className="rounded-3xl border border-emerald-800 bg-[#064e3b]/20 p-8 shadow-sm">
            <h3 className="text-2xl font-serif font-black text-white flex items-center gap-2 mb-6">
              <HelpCircle className="w-6 h-6 text-emerald-400" />{" "}
              FAQ
            </h3>
            <div className="space-y-4">
              {faqs.map((f, i) => (
                <div key={i} className="rounded-2xl border border-emerald-800 overflow-hidden">
                  <details className="group">
                    <summary className="flex cursor-pointer list-none items-center justify-between p-5 text-sm font-bold text-white bg-[#022c22] hover:bg-[#064e3b] transition-colors">
                      {f.q}
                      <span className="ml-3 text-emerald-500 transition-transform group-open:rotate-180">
                        ▼
                      </span>
                    </summary>
                    <div className="px-5 pb-5 text-sm leading-relaxed text-emerald-200/80 bg-[#022c22]">
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
          <p className="text-emerald-200/60 mb-6">
            Masih ragu? Coba dulu paket gratisnya. Tidak perlu kartu kredit.
          </p>
          <a
            href={payHref("student", 0)}
            className="inline-flex items-center gap-2 rounded-full border border-emerald-600 bg-[#064e3b]/30 px-8 py-3 font-bold text-white hover:bg-emerald-800 hover:border-emerald-500 transition shadow-lg"
          >
            Daftar Student Account
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </section>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700;900&display=swap');
        .font-serif { font-family: 'Playfair Display', serif; }

        @keyframes swing { 0%, 100% { transform: rotate(-5deg); } 50% { transform: rotate(5deg); } }
        .animate-swing { animation: swing 4s ease-in-out infinite; }

        @keyframes fade-in { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fade-in { animation: fade-in 0.6s ease-out; }
        
        @keyframes bounce-slow { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-5px); } }
        .animate-bounce-slow { animation: bounce-slow 2s infinite; }
      `}</style>
    </div>
  );
}