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
    <div className="min-h-screen bg-slate-50 dark:bg-[#0B0F19] font-sans transition-colors duration-300">
      {/* BACKGROUND DECORATION */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-500/10 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10">
        {/* HEADER */}
        <header className="pt-24 pb-16 px-4 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-sm font-bold mb-6 tracking-wide uppercase">
            <Gift className="w-4 h-4" />
            Eksklusif Penawaran
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white mb-6 tracking-tight">
            Hemat Lebih <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-500">Banyak.</span>
          </h1>
          <p className="max-w-xl mx-auto text-slate-600 dark:text-slate-400 text-lg leading-relaxed">
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
                      ? 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none hover:shadow-2xl hover:border-blue-400 dark:hover:border-blue-500' 
                      : 'bg-slate-100 dark:bg-slate-900/40 border-slate-200 dark:border-slate-800 grayscale opacity-75'
                    }
                  `}
                >
                  {/* Image Container - Rasio 9:16 */}
                  <div className="relative aspect-[9/16] overflow-hidden">
                    <img
                      src={promo.image}
                      alt={promo.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/20 to-transparent opacity-80" />

                    {/* Content on Image */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                      <div className="flex items-center gap-2 mb-2">
                        {active ? (
                          <span className="flex items-center gap-1 text-[10px] font-bold bg-emerald-500 px-2 py-0.5 rounded-full uppercase tracking-widest">
                            <CheckCircle className="w-3 h-3" /> Aktif
                          </span>
                        ) : (
                          <span className="flex items-center gap-1 text-[10px] font-bold bg-slate-700 px-2 py-0.5 rounded-full uppercase tracking-widest">
                            <XCircle className="w-3 h-3" /> Berakhir
                          </span>
                        )}
                      </div>
                      <h2 className="text-2xl font-black leading-tight mb-2 group-hover:text-blue-400 transition-colors">
                        {promo.title}
                      </h2>
                      <div className="flex items-center gap-2 text-slate-300 text-xs font-medium">
                        <Clock className="w-3.5 h-3.5" />
                        <span>Sampai {formatDate(promo.endDate)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="flex flex-col p-6 space-y-5 bg-white dark:bg-slate-900">
                    <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed line-clamp-2">
                      {promo.description}
                    </p>

                    {/* PROMO CODE SECTION */}
                    {promo.promoCode && (
                      <div className="relative group/code">
                        <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1.5 ml-1">
                          Copy Kode Promo
                        </p>
                        <button
                          onClick={() => copyToClipboard(promo.promoCode!, promo.id, 'code')}
                          className="w-full flex items-center justify-between gap-3 px-4 py-3 rounded-2xl border-2 border-dashed border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 hover:bg-blue-50 dark:hover:bg-blue-900/10 hover:border-blue-300 transition-all group"
                        >
                          <span className="font-mono font-bold text-blue-600 dark:text-blue-400 tracking-wider">
                            {promo.promoCode}
                          </span>
                          {copiedCode === promo.id ? (
                            <Check className="w-4 h-4 text-emerald-500" />
                          ) : (
                            <Copy className="w-4 h-4 text-slate-400 group-hover:text-blue-500" />
                          )}
                        </button>
                      </div>
                    )}

                    {/* ACTIONS */}
                    <div className="flex items-center gap-3 pt-2">
                      <a
                        href={promo.link || '#'}
                        target="_blank"
                        rel="noreferrer"
                        className={`flex-1 flex items-center justify-center gap-2 py-3.5 rounded-2xl font-bold text-sm transition-all shadow-lg
                          ${active 
                            ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:scale-[1.02] active:scale-95 shadow-blue-500/10' 
                            : 'bg-slate-200 dark:bg-slate-800 text-slate-400 cursor-not-allowed shadow-none'
                          }`}
                      >
                        Klaim Sekarang
                        <ExternalLink className="w-4 h-4" />
                      </a>
                      
                      <button
                        onClick={() => copyToClipboard(`${window.location.origin}/promo/${promo.id}`, promo.id, 'share')}
                        className="p-3.5 rounded-2xl border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
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
          
          <div className="mt-20 py-8 border-t border-slate-200 dark:border-slate-800 text-center">
            <p className="text-sm text-slate-400 dark:text-slate-600 italic">
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