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
  Percent,
  Terminal,
  MapPin,
  Building2
} from "lucide-react";

/**
 * Coreline Pricing Page - Modern Tech Edition (Promo 10% + Extra Yearly Discount)
 * Theme: Light Theme (Slate-50, White, Blue, Purple)
 */

const TOKEN_KEY = "astbyte_token";

export default function PricingPage() {
  const [billing, setBilling] = useState<"monthly" | "yearly">("monthly");

  useEffect(() => {
    document.title = "Harga & Paket | Coreline by AstByte";
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

  // DATA PAKET DENGAN HARGA DISKON 10% (Tahunan dihitung bayar 10 bulan aja + disc 10%)
  const tiers = [
    {
      id: "pro",
      name: "Pro",
      tagline: "Tingkatkan skill dengan modul premium",
      icon: <Zap className="w-5 h-5" />,
      // Base: 25rb -> Disc 10% -> 22.5rb
      monthly: 22500, 
      originalMonthly: 25000,
      // Base Year (10 bulan): 250rb -> Disc 10% -> 225rb
      yearly: 225000,
      originalYearly: 250000,
      popular: false,
      features: [
        { label: "Semua materi fundamental", ok: true },
        { label: "Modul materi lengkap & kuis", ok: true },
        { label: "Sertifikat Kelulusan Resmi", ok: true },
        { label: "Storage Cloud 5 GB", ok: true },
        { label: "Mentoring Chat 1:1", ok: false },
        { label: "Akses Full Source Code", ok: false },
        { label: "Live Mentoring Video Call", ok: false },
      ],
      colorTheme: "cyan"
    },
    {
      id: "plus",
      name: "Plus",
      tagline: "Resource lengkap & dukungan prioritas",
      icon: <Crown className="w-5 h-5" />,
      // Base: 75rb -> Disc 10% -> 67.5rb
      monthly: 67500,
      originalMonthly: 75000,
      // Base Year (10 bulan): 750rb -> Disc 10% -> 675rb
      yearly: 675000,
      originalYearly: 750000,
      popular: true,
      features: [
        { label: "Semua fitur di paket Pro", ok: true },
        { label: "Mentoring via Chat 1:1", ok: true },
        { label: "Akses Full Source Code Project", ok: true },
        { label: "Template Portofolio Siap Pakai", ok: true },
        { label: "Storage Cloud 10 GB", ok: true },
        { label: "Live Mentoring Video Call", ok: false },
        { label: "Konsultasi Karir & CV", ok: false },
      ],
      colorTheme: "blue"
    },
    {
      id: "ultra",
      name: "Ultra",
      tagline: "Akselerasi karir & mentoring eksklusif",
      icon: <Rocket className="w-5 h-5" />,
      // Base: 125rb -> Disc 10% -> 112.5rb
      monthly: 112500,
      originalMonthly: 125000,
      // Base Year (10 bulan): 1.25jt -> Disc 10% -> 1.125jt
      yearly: 1125000,
      originalYearly: 1250000,
      popular: false,
      features: [
        { label: "Semua fitur di paket Plus", ok: true },
        { label: "Live Mentoring (Video Call)", ok: true },
        { label: "Code Review Personal", ok: true },
        { label: "Konsultasi Karir & Review CV", ok: true },
        { label: "Prioritas Rekomendasi Kerja", ok: true },
        { label: "Storage Cloud 20 GB", ok: true },
        { label: "Mentoring Tatap Muka (Offline)", ok: false },
      ],
      colorTheme: "purple"
    },
    {
      id: "ultimate",
      name: "Ultimate",
      tagline: "Pengalaman belajar VIP dengan mentor offline",
      icon: <Building2 className="w-5 h-5" />,
      // Base: 310rb -> Harga Promo: 280rb
      monthly: 280000,
      originalMonthly: 310000,
      // Base Year (10 bulan): 3.1jt -> Harga Promo: 2.8jt
      yearly: 2800000,
      originalYearly: 3100000,
      popular: false,
      isNew: true,
      features: [
        { label: "Semua fitur di paket Ultra", ok: true },
        { label: "Mentoring Offline 3x Sebulan", ok: true },
        { label: "On-Site Code Review & Debugging", ok: true },
        { label: "Akses Private Networking Event", ok: true },
        { label: "Grup Mastermind Eksklusif", ok: true },
        { label: "Dukungan Proyek Skala Enterprise", ok: true },
        { label: "Storage Cloud 50 GB", ok: true },
      ],
      colorTheme: "amber",
      areaRestriction: "Area Tertentu, Pastikan cek coverage area sebelum memilih paket ini"
    },
  ] as const;

  const faqs = [
    {
      q: "Sampai kapan promo spesial 10% ini berlaku?",
      a: "Promo diskon 10% berlaku selama periode peluncuran platform. Harga akan kembali normal setelah kuota pendaftar pertama terpenuhi.",
    },
    {
      q: "Apa keuntungan langganan tahunan?",
      a: "Selain diskon 10%, paket tahunan dihitung hanya 10 bulan tagihan. Artinya Anda menghemat biaya 2 bulan penuh jika dibandingkan dengan langganan bulanan!",
    },
    {
      q: "Bagaimana sistem Mentoring Offline di paket Ultimate?",
      a: "Untuk member Ultimate, Anda berhak menjadwalkan 3 kali sesi tatap muka langsung (offline) dengan mentor ahli kami setiap bulannya di lokasi yang disepakati (coworking space/cafe). Saat ini, fitur offline ini hanya tersedia untuk area tertentu.",
    },
    {
      q: "Apakah saya bisa upgrade dari paket Plus ke Ultra atau Ultimate?",
      a: "Tentu bisa. Anda dapat melakukan upgrade kapan pun, tagihan akan disesuaikan secara prorata pada siklus penagihan berikutnya.",
    },
  ];

  const testimonials = [
    {
      id: 1,
      text: "Materinya sangat komprehensif, cocok banget buat upskilling. Lulus dari paket Pro langsung dapet sertifikat buat melengkapi LinkedIn saya.",
      author: "Ruby",
      role: "Alumni Coreline Pro"
    },
    {
      id: 2,
      text: "Investasi leher ke atas terbaik. Upgrade ke Ultra pas promo gini worth it banget. Mentornya sangat sabar pas sesi video call.",
      author: "Dimas",
      role: "Member Coreline Ultra"
    },
    {
      id: 3,
      text: "Ambil paket Ultimate adalah keputusan terbaik! Ketemu mentor langsung offline bikin error debugging yang biasanya berhari-hari selesai dalam hitungan jam.",
      author: "Sarah",
      role: "Member Coreline Ultimate"
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans selection:bg-blue-500/30 overflow-hidden relative">
      
      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none">
         <div className="absolute inset-0 opacity-[0.4] bg-[linear-gradient(rgba(203,213,225,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(203,213,225,0.5)_1px,transparent_1px)] bg-[size:30px_30px]"></div>
         <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-blue-300/20 blur-[100px] animate-pulse" />
         <div className="absolute bottom-1/4 -left-24 h-96 w-96 rounded-full bg-cyan-300/20 blur-[100px]" />
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-full bg-gradient-to-b from-blue-200/30 to-transparent" />
      </div>

      {/* Hero */}
      <header className="relative pt-20 pb-16 z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-1.5 text-xs font-bold text-blue-700 mb-6 shadow-sm animate-bounce-slow">
              <Percent className="w-4 h-4 fill-current text-blue-600" /> PROMO SPESIAL: DISKON 10%
            </div>
            
            <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-slate-900 mb-6 leading-tight">
              Tingkatkan Skill, <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500 drop-shadow-sm">
                Akselerasi Karirmu.
              </span>
            </h1>
            
            <p className="text-slate-600 max-w-2xl mx-auto text-lg mb-10 font-medium">
              Pilih paket belajar premium yang sesuai dengan target karirmu. Nikmati akses tanpa batas ke kurikulum berstandar industri dan dukungan mentor profesional.
            </p>

            {/* Billing Toggle */}
            <div className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-slate-100/80 p-1.5 shadow-sm relative z-20">
              <button
                onClick={() => setBilling("monthly")}
                className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${
                  billing === "monthly"
                    ? "bg-white text-slate-900 shadow-sm border border-slate-200"
                    : "text-slate-500 hover:text-slate-700 hover:bg-slate-200/50"
                }`}
              >
                Bulanan
              </button>
              <button
                onClick={() => setBilling("yearly")}
                className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all relative ${
                  billing === "yearly"
                    ? "bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-md shadow-blue-500/20"
                    : "text-slate-500 hover:text-slate-700 hover:bg-slate-200/50"
                }`}
              >
                Tahunan
                <span className="absolute -top-3 -right-3 rotate-12 bg-amber-500 text-white text-[10px] font-black px-2 py-0.5 rounded-full shadow-sm border border-amber-400 animate-pulse">
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
                className={`relative flex flex-col h-full rounded-3xl p-6 sm:p-8 transition-all duration-300 hover:-translate-y-2 border backdrop-blur-md ${
                  t.popular
                    ? "border-blue-300 bg-white shadow-[0_15px_40px_rgba(59,130,246,0.15)] z-10 scale-105 md:scale-100"
                    : t.id === "ultimate"
                    ? "border-amber-300 bg-gradient-to-b from-white to-amber-50/30 shadow-[0_15px_40px_rgba(245,158,11,0.15)] z-10"
                    : "border-slate-200 bg-white/60 hover:bg-white shadow-sm hover:shadow-lg"
                }`}
              >
                {/* Badges */}
                {t.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-4 py-1 text-xs font-black shadow-lg shadow-blue-500/30 uppercase tracking-wider whitespace-nowrap">
                    <Star className="w-3 h-3 fill-current text-yellow-300" /> Paling Diminati
                  </div>
                )}
                {/* @ts-ignore */}
                {t.isNew && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 inline-flex items-center gap-1 rounded-full bg-amber-500 text-white px-4 py-1 text-xs font-black shadow-lg shadow-amber-500/30 uppercase tracking-wider whitespace-nowrap">
                    <Sparkles className="w-3 h-3 fill-current text-yellow-100" /> VIP Mentoring
                  </div>
                )}

                <div className="mb-4">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 shadow-sm border ${
                    t.colorTheme === "cyan" ? "bg-cyan-50 text-cyan-600 border-cyan-200" :
                    t.colorTheme === "blue" ? "bg-blue-50 text-blue-600 border-blue-200" :
                    t.colorTheme === "purple" ? "bg-purple-50 text-purple-600 border-purple-200" :
                    "bg-amber-50 text-amber-600 border-amber-200"
                  }`}>
                    {t.icon}
                  </div>
                  <h3 className="text-2xl font-extrabold text-slate-900">{t.name}</h3>
                  <p className="text-sm text-slate-500 mt-2 font-medium min-h-[40px] leading-relaxed">
                    {t.tagline}
                  </p>
                </div>

                {/* PRICING SECTION */}
                <div className="mb-8">
                  <div>
                    {isDiscounted && (
                      <div className="flex items-center gap-2 mb-1">
                          <span className="text-sm line-through text-slate-400 font-medium">
                            {currency(originalPrice)}
                          </span>
                          <span className="bg-blue-50 text-blue-700 text-[10px] font-bold px-2 py-0.5 rounded-full border border-blue-200 animate-pulse whitespace-nowrap shadow-sm">
                            -10% PROMO
                          </span>
                      </div>
                    )}
                    <div className="flex items-baseline gap-1">
                      <span className={`text-4xl font-extrabold tracking-tight ${isDiscounted ? "text-blue-600" : "text-slate-900"}`}>
                        {currency(currentPrice)}
                      </span>
                      <span className="text-sm font-semibold text-slate-500">
                        /{billing === "monthly" ? "bln" : "thn"}
                      </span>
                    </div>
                  </div>
                  {billing === "yearly" && (
                     <p className="text-xs text-emerald-600 font-bold mt-2 bg-emerald-50 inline-block px-2 py-1 rounded-md border border-emerald-100">
                       (Ditagih Rp {currency(currentPrice)} /tahun)
                     </p>
                  )}
                  {/* Area Restriction for Ultimate */}
                  {/* @ts-ignore */}
                  {t.areaRestriction && (
                     <p className="text-[10px] text-amber-700 font-bold mt-3 flex items-center gap-1 bg-amber-100/50 p-1.5 rounded-md border border-amber-200/50 leading-tight">
                       <MapPin className="w-3 h-3 flex-shrink-0" />
                       {/* @ts-ignore */}
                       {t.areaRestriction}
                     </p>
                  )}
                </div>

                <ul className="space-y-4 mb-8 flex-1">
                  {t.features.map((f, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm">
                      <div className={`mt-0.5 flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center border ${
                        f.ok
                          ? t.colorTheme === "purple" ? "bg-purple-100 text-purple-600 border-purple-200" 
                          : t.colorTheme === "amber" ? "bg-amber-100 text-amber-600 border-amber-200"
                          : "bg-blue-50 text-blue-600 border-blue-200"
                          : "bg-slate-50 text-slate-300 border-slate-100"
                      }`}>
                        <Check className="w-3 h-3" strokeWidth={3} />
                      </div>
                      <span className={`${
                        f.ok
                          ? "text-slate-700 font-medium"
                          : "text-slate-400 line-through decoration-slate-300"
                      }`}>
                        {f.label}
                      </span>
                    </li>
                  ))}
                </ul>

                <a
                  href={payHref(t.id, currentPrice)}
                  className={`w-full inline-flex items-center justify-center gap-2 rounded-xl px-4 py-3.5 text-sm font-bold transition-all transform active:scale-95 shadow-md ${
                    t.id === "pro"
                      ? "bg-gradient-to-r from-blue-600 to-cyan-500 text-white hover:from-blue-700 hover:to-cyan-600 shadow-blue-500/20"
                      : t.id === "plus"
                      ? "bg-gradient-to-r from-indigo-600 to-blue-600 text-white hover:from-indigo-700 hover:to-blue-700 shadow-indigo-500/20"
                      : t.id === "ultra"
                      ? "bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white hover:from-purple-700 hover:to-fuchsia-700 shadow-purple-500/20"
                      : "bg-gradient-to-r from-amber-500 to-orange-600 text-white hover:from-amber-600 hover:to-orange-700 shadow-amber-500/20"
                  }`}
                >
                  Pilih Paket {t.name}
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            );
          })}
        </div>

        {/* Need help */}
        <div className="mt-12 rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-md">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-50 text-blue-600 rounded-full border border-blue-100 shadow-sm">
              <Terminal className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-extrabold text-slate-900 text-lg">Butuh Bantuan Memilih Paket?</h4>
              <p className="text-slate-500 text-sm font-medium">
                Hubungi tim support kami untuk berkonsultasi mengenai paket yang paling sesuai dengan target karirmu.
              </p>
            </div>
          </div>
          <a
            href="https://wa.me/6285183209494?text=Halo%20Coreline%2C%20saya%20ingin%20konsultasi%20mengenai%20paket%20belajar"
            className="flex-shrink-0 inline-flex items-center gap-2 rounded-xl bg-blue-50 text-blue-700 px-6 py-3 text-sm font-bold hover:bg-blue-100 transition shadow-sm border border-blue-200"
          >
            <MessageCircle className="w-4 h-4" />
            Hubungi Support
          </a>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 pb-16 hidden lg:block relative z-10">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-extrabold text-slate-900">
            Perbandingan Spesifikasi Detail
          </h2>
          <p className="text-slate-500 mt-2 font-medium">
            Lihat fasilitas lengkap yang akan Anda dapatkan di setiap tingkatan paket premium.
          </p>
        </div>
        
        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl">
          <table className="w-full text-sm text-left">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="py-5 pl-8 pr-4 font-extrabold text-slate-900 w-1/4">FITUR PLATFORM</th>
                <th className="py-5 px-4 font-extrabold text-cyan-600 text-center w-[18%]">Pro</th>
                <th className="py-5 px-4 font-extrabold text-blue-600 text-center w-[18%]">Plus</th>
                <th className="py-5 px-4 font-extrabold text-purple-600 text-center w-[18%]">Ultra</th>
                <th className="py-5 px-4 font-extrabold text-amber-600 text-center w-[18%] bg-amber-50/50">Ultimate</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {[
                { name: "Sertifikat Kompetensi Resmi", v: [true, true, true, true], icon: BadgeCheck },
                { name: "Mentoring Chat 1:1", v: [false, true, true, true], icon: MessageCircle },
                { name: "Akses Full Source Code", v: [false, true, true, true], icon: Code2 },
                { name: "Template Portofolio Siap Pakai", v: [false, true, true, true], icon: Briefcase },
                { name: "Live Mentoring Video Call", v: [false, false, true, true], icon: MonitorPlay },
                { name: "Review Code Personal", v: [false, false, true, true], icon: Code2 },
                { name: "Prioritas Lowongan Kerja", v: [false, false, true, true], icon: Star },
                { name: "Mentoring Offline (Tatap Muka)", v: [false, false, false, true], icon: Building2 },
                { name: "Private Networking Event", v: [false, false, false, true], icon: Sparkles },
              ].map((row, i) => (
                <tr key={i} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-4 pl-8 pr-4 font-bold text-slate-700 flex items-center gap-2">
                    {row.icon && <row.icon className={`w-4 h-4 ${
                      i >= 7 ? 'text-amber-500' : i >= 4 ? 'text-purple-500' : 'text-blue-500'
                    }`} />}
                    {row.name}
                  </td>
                  {row.v.map((active, j) => {
                    const cellColor = j === 3 ? "amber" : j === 2 ? "purple" : "blue";
                    const isBgCell = j === 3 ? "bg-amber-50/30" : "";
                    
                    return (
                      <td key={j} className={`py-4 px-4 text-center ${isBgCell}`}>
                        {active ? (
                          <div className={`inline-flex items-center justify-center w-6 h-6 rounded-full border ${
                            cellColor === "amber" ? "bg-amber-100 text-amber-600 border-amber-200" :
                            cellColor === "purple" ? "bg-purple-100 text-purple-600 border-purple-200" :
                            "bg-blue-50 text-blue-600 border-blue-200"
                          }`}>
                            <Check className="w-4 h-4" strokeWidth={3} />
                          </div>
                        ) : (
                          <div className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-slate-50 text-slate-300 border border-slate-100">
                            <Check className="w-4 h-4" />
                          </div>
                        )}
                      </td>
                    );
                  })}
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
          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-md">
            <h3 className="text-2xl font-extrabold text-slate-900 flex items-center gap-2 mb-6">
              <BadgeCheck className="w-6 h-6 text-blue-600" /> Kata Alumni Kami
            </h3>
            <div className="space-y-6">
              {testimonials.map((t) => (
                <div
                  key={t.id}
                  className="rounded-2xl bg-slate-50 border border-slate-100 p-5 relative hover:border-blue-200 transition-colors"
                >
                  <p className="text-slate-600 italic relative z-10 text-sm leading-relaxed font-medium">
                    "{t.text}"
                  </p>
                  <div className="mt-4 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center font-bold text-xs text-blue-700 border border-blue-200 shadow-sm">
                      {t.author[0]}
                    </div>
                    <div>
                      <p className="text-sm font-extrabold text-slate-900">{t.author}</p>
                      <p className="text-xs text-slate-500 font-medium">{t.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* FAQs */}
          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-md">
            <h3 className="text-2xl font-extrabold text-slate-900 flex items-center gap-2 mb-6">
              <HelpCircle className="w-6 h-6 text-blue-600" />{" "}
              Pertanyaan Umum
            </h3>
            <div className="space-y-4">
              {faqs.map((f, i) => (
                <div key={i} className="rounded-2xl border border-slate-200 overflow-hidden bg-white shadow-sm hover:border-blue-300 transition-colors">
                  <details className="group">
                    <summary className="flex cursor-pointer list-none items-center justify-between p-5 text-sm font-bold text-slate-800 hover:bg-slate-50 transition-colors">
                      {f.q}
                      <span className="ml-3 text-slate-400 transition-transform group-open:rotate-180">
                        ▼
                      </span>
                    </summary>
                    <div className="px-5 pb-5 text-sm leading-relaxed text-slate-600 border-t border-slate-100 pt-4 bg-slate-50/50">
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
          <p className="text-slate-600 font-medium mb-6">
            Pilih paket belajar yang tepat dan percepat karir Anda sekarang juga.
          </p>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-8 py-3.5 font-bold text-slate-700 hover:bg-slate-50 transition shadow-md hover:shadow-lg hover:-translate-y-0.5"
          >
            Pilih Paket Belajar
            <ArrowRight className="w-4 h-4 text-blue-600" />
          </button>
        </div>
      </section>

      <style>{`
        @keyframes fade-in { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fade-in { animation: fade-in 0.6s ease-out; }
        
        @keyframes bounce-slow { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-3px); } }
        .animate-bounce-slow { animation: bounce-slow 2.5s infinite ease-in-out; }
      `}</style>
    </div>
  );
}