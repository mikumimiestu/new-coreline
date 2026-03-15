import { useEffect, useState } from 'react';
import {
  CalendarDays,
  Share2,
  CheckCircle,
  XCircle,
  Gift,
  Clock,
  ExternalLink,
  Copy,
  Check,
  Tag,
  Ticket
} from 'lucide-react';

interface Promo {
  id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  image: string;
  link?: string;
  promoCode?: string; // Field baru untuk kode promo
}

export default function PromoPage() {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  // Mock Data dengan tambahan Promo Code
  const promos: Promo[] = [
    {
      id: 'coreline-januari-2026',
      title: 'Flash Sale Januari 2026',
      description:
        'Nikmati potongan 10% untuk paket Plus dan Pro. Kesempatan terbatas untuk upgrade skill coding kamu dengan harga lebih hemat.',
      startDate: '2026-01-01',
      endDate: '2026-01-31',
      image: '/promo/promo-januari-2026.jpeg',
      link: 'https://newcoreline.astbyte.com/pricing',
      promoCode: 'JANSTART'
    },
    {
      id: 'coreline-astbytejaya-2026',
      title: 'AstByte Jaya 2026',
      description:
        'Nikmati potongan 5% untuk paket Plus dan Pro. Kesempatan terbatas untuk upgrade skill coding kamu dengan harga lebih hemat.',
      startDate: '2026-01-15',
      endDate: '2026-12-31',
      image: '/icon.png',
      promoCode: 'ASTBYTEJAYA26'
    },
    // {
    //   id: 'coreline-pro-anniversary',
    //   title: 'Anniversary Gift',
    //   description:
    //     'Ulang tahun Coreline! Bonus mentoring 1-on-1 gratis untuk setiap pembelian paket tahunan Pro atau Plus.',
    //   startDate: '2025-12-01',
    //   endDate: '2025-12-15',
    //   image: 'https://images.unsplash.com/photo-1557683316-973673baf926?auto=format&fit=crop&q=80&w=800',
    //   promoCode: 'HBDCORELINE'
    // },
  ];

  useEffect(() => {
    document.title = 'Promo & Penawaran | AstByte';
  }, []);

  const now = new Date();

  function isActive(start: string, end: string) {
    const s = new Date(start);
    const e = new Date(end);
    e.setHours(23, 59, 59, 999);
    return now >= s && now <= e;
  }

  function formatDate(dateString: string) {
    return new Date(dateString).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  }

  const copyToClipboard = async (text: string, id: string, type: 'share' | 'code') => {
    try {
      await navigator.clipboard.writeText(text);
      if (type === 'share') {
        setCopiedId(id);
        setTimeout(() => setCopiedId(null), 2000);
      } else {
        setCopiedCode(id);
        setTimeout(() => setCopiedCode(null), 2000);
      }
    } catch (err) {
      console.error('Failed to copy!', err);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans transition-colors duration-300 overflow-hidden relative selection:bg-blue-500/30">
      
      {/* BACKGROUND DECORATION (Light Theme) */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {/* Subtle Grid */}
        <div className="absolute inset-0 opacity-[0.4] bg-[linear-gradient(rgba(203,213,225,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(203,213,225,0.5)_1px,transparent_1px)] bg-[size:30px_30px]"></div>
        
        {/* Glows */}
        <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-300/30 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-300/20 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10">
        {/* HEADER */}
        <header className="pt-24 pb-16 px-4 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200 text-sm font-bold mb-6 tracking-wide uppercase shadow-sm">
            <Gift className="w-4 h-4" />
            Eksklusif Penawaran
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-slate-900 mb-6 tracking-tight">
            Hemat Lebih <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 drop-shadow-sm">Banyak.</span>
          </h1>
          <p className="max-w-xl mx-auto text-slate-600 text-lg leading-relaxed font-medium">
            Dapatkan akses ke materi premium dengan harga spesial. Gunakan kode promo di bawah sebelum masa berlaku habis.
          </p>
        </header>

        {/* PROMO GRID */}
        <main className="container mx-auto max-w-7xl px-4 sm:px-6 pb-24">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
            {promos.map((promo, idx) => {
              const active = isActive(promo.startDate, promo.endDate);
              
              return (
                <div
                  key={promo.id}
                  style={{ animationDelay: `${idx * 150}ms` }}
                  className={`group relative flex flex-col rounded-3xl overflow-hidden border transition-all duration-500 animate-slide-up
                    ${active 
                      ? 'bg-white border-slate-200 shadow-lg hover:shadow-2xl hover:border-blue-300 hover:-translate-y-1.5' 
                      : 'bg-slate-100/50 border-slate-200 grayscale-[0.8] opacity-80'
                    }
                  `}
                >
                  {/* Image Container - Rasio 9:16 */}
                  <div className="relative aspect-[9/16] overflow-hidden bg-slate-200">
                    <img
                      src={promo.image}
                      alt={promo.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    
                    {/* Gradient Overlay (Gelap di bawah biar teks putih kebaca) */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent opacity-80" />

                    {/* Content on Image */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                      <div className="flex items-center gap-2 mb-2">
                        {active ? (
                          <span className="flex items-center gap-1 text-[10px] font-bold bg-emerald-500 text-white px-2.5 py-1 rounded-full uppercase tracking-widest shadow-sm">
                            <CheckCircle className="w-3 h-3" /> Aktif
                          </span>
                        ) : (
                          <span className="flex items-center gap-1 text-[10px] font-bold bg-slate-700 text-slate-200 px-2.5 py-1 rounded-full uppercase tracking-widest border border-slate-600 shadow-sm">
                            <XCircle className="w-3 h-3" /> Berakhir
                          </span>
                        )}
                      </div>
                      <h2 className="text-2xl font-black leading-tight mb-2 group-hover:text-blue-300 transition-colors drop-shadow-md">
                        {promo.title}
                      </h2>
                      <div className="flex items-center gap-2 text-slate-300 text-xs font-bold drop-shadow-sm">
                        <Clock className="w-3.5 h-3.5" />
                        <span>Sampai {formatDate(promo.endDate)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="flex flex-col p-6 space-y-5 bg-white">
                    <p className="text-sm text-slate-600 leading-relaxed line-clamp-2 font-medium">
                      {promo.description}
                    </p>

                    {/* PROMO CODE SECTION */}
                    {promo.promoCode && (
                      <div className="relative group/code">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 ml-1">
                          Copy Kode Promo
                        </p>
                        <button
                          onClick={() => active && copyToClipboard(promo.promoCode!, promo.id, 'code')}
                          disabled={!active}
                          className={`w-full flex items-center justify-between gap-3 px-4 py-3.5 rounded-2xl border-2 border-dashed transition-all group
                            ${active 
                              ? 'border-slate-200 bg-slate-50 hover:bg-blue-50 hover:border-blue-300 cursor-pointer' 
                              : 'border-slate-200 bg-slate-50 cursor-not-allowed'
                            }
                          `}
                        >
                          <span className={`font-mono font-black tracking-wider text-base ${active ? 'text-blue-600' : 'text-slate-400'}`}>
                            {promo.promoCode}
                          </span>
                          {copiedCode === promo.id ? (
                            <Check className="w-5 h-5 text-emerald-500" />
                          ) : (
                            <Copy className={`w-5 h-5 transition-colors ${active ? 'text-slate-400 group-hover:text-blue-600' : 'text-slate-300'}`} />
                          )}
                        </button>
                      </div>
                    )}

                    {/* ACTIONS */}
                    <div className="flex items-center gap-3 pt-2">
                      <a
                        href={active ? (promo.link || '#') : '#'}
                        target={active ? "_blank" : "_self"}
                        rel="noreferrer"
                        className={`flex-1 flex items-center justify-center gap-2 py-3.5 rounded-2xl font-bold text-sm transition-all
                          ${active 
                            ? 'bg-slate-900 text-white hover:bg-blue-700 hover:-translate-y-0.5 active:scale-95 shadow-lg shadow-slate-900/20' 
                            : 'bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200'
                          }`}
                      >
                        Klaim Sekarang
                        <ExternalLink className="w-4 h-4" />
                      </a>
                      
                      <button
                        onClick={() => copyToClipboard(`${window.location.origin}/promo/${promo.id}`, promo.id, 'share')}
                        className={`p-3.5 rounded-2xl border transition-all shadow-sm
                          ${active
                            ? 'border-slate-200 text-slate-600 bg-white hover:bg-slate-50 hover:text-blue-600 hover:border-blue-200'
                            : 'border-slate-200 text-slate-400 bg-slate-50'
                          }`}
                        title="Bagikan"
                      >
                        {copiedId === promo.id ? <Check className="w-5 h-5 text-emerald-500" /> : <Share2 className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          
          <div className="mt-20 py-8 border-t border-slate-200 text-center">
            <p className="text-sm text-slate-500 font-medium italic">
              *Syarat dan ketentuan berlaku. Pastikan kode promo dimasukkan saat checkout.
            </p>
          </div>
        </main>
      </div>

      <style>{`
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-slide-up {
          animation: slide-up 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
        }
      `}</style>
    </div>
  );
}