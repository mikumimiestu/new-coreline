// src/pages/PromoPage.tsx
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
} from 'lucide-react';

interface Promo {
  id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  image: string; // URL gambar banner
  link?: string; // Link eksternal/detail jika ada
}

export default function PromoPage() {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Mock Data
  const promos: Promo[] = [
    {
      id: 'coreline-october',
      title: 'Flash Sale Oktober 2025',
      description:
        'Nikmati potongan 20% untuk paket Plus dan Pro. Kesempatan terbatas untuk upgrade skill coding kamu dengan harga lebih hemat.',
      startDate: '2025-10-01',
      endDate: '2025-10-31',
      image: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&q=80&w=800', // Contoh gambar
      link: 'https://newcoreline.astbyte.com/pricing',
    },
    {
      id: 'coreline-student-week',
      title: 'Student Week Special',
      description:
        'Akses gratis ke 5 modul premium pilihan khusus pengguna Student. Waktunya eksplorasi materi lanjutan tanpa biaya.',
      startDate: '2025-11-01',
      endDate: '2025-11-07',
      image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=800',
    },
    {
      id: 'coreline-pro-anniversary',
      title: 'Anniversary Gift',
      description:
        'Ulang tahun Coreline! Bonus mentoring 1-on-1 gratis untuk setiap pembelian paket tahunan Pro atau Plus.',
      startDate: '2025-12-01',
      endDate: '2025-12-15',
      image: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&q=80&w=800',
    },
  ];

  // --- Effects & Logic ---
  useEffect(() => {
    document.title = 'Promo & Penawaran | AstByte';
    
    // SEO Meta Tags update (Optional)
    const updateMeta = (name: string, content: string) => {
      let meta = document.querySelector(`meta[property="${name}"]`);
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute('property', name);
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', content);
    };

    updateMeta('og:title', 'Promo Terbaru AstByte');
    updateMeta('og:description', 'Temukan diskon dan penawaran menarik untuk produk Coreline.');
  }, []);

  const now = new Date();

  function isActive(start: string, end: string) {
    const s = new Date(start);
    const e = new Date(end);
    // Set end date to end of day
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

  async function handleShare(promo: Promo) {
    const shareUrl = `${window.location.origin}/promo/${promo.id}`; // Asumsi routing
    const shareData = {
      title: promo.title,
      text: `${promo.description}\nCek promo ini:`,
      url: shareUrl,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        // Fallback desktop
        await navigator.clipboard.writeText(shareUrl);
        setCopiedId(promo.id);
        setTimeout(() => setCopiedId(null), 2000);
      }
    } catch (err) {
      console.error('Share failed/cancelled:', err);
    }
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#0B0F19] font-sans text-slate-900 dark:text-slate-100">
      
      {/* BACKGROUND DECORATION */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-500/5 dark:bg-blue-500/10 rounded-full blur-3xl translate-x-1/3 -translate-y-1/3" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-emerald-500/5 dark:bg-emerald-500/10 rounded-full blur-3xl -translate-x-1/3 translate-y-1/3" />
      </div>

      {/* HEADER HERO */}
      <header className="relative pt-20 pb-12 sm:pt-24 text-center px-4 z-10">
        <div className="animate-fade-in-up">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 dark:border-blue-800 bg-white dark:bg-slate-900 px-4 py-1.5 shadow-sm mb-6">
            <Gift className="w-4 h-4 text-blue-600 dark:text-cyan-400" />
            <span className="text-xs font-bold text-slate-700 dark:text-slate-200 uppercase tracking-wider">
              Special Offers
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-4">
            Promo & Penawaran Terbaru
          </h1>
          <p className="max-w-2xl mx-auto text-lg text-slate-600 dark:text-slate-400">
            Dapatkan diskon eksklusif untuk upgrade skill coding kamu di Coreline. 
            Jangan sampai ketinggalan!
          </p>
        </div>
      </header>

      {/* PROMO GRID */}
      <main className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-24 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {promos.map((promo, idx) => {
            const active = isActive(promo.startDate, promo.endDate);
            
            return (
              <div
                key={promo.id}
                style={{ animationDelay: `${idx * 100}ms` }}
                className={`group flex flex-col rounded-2xl overflow-hidden border transition-all duration-300 hover:-translate-y-1 animate-fade-in-up
                  ${active 
                    ? 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow-lg hover:shadow-xl hover:border-blue-300 dark:hover:border-blue-700' 
                    : 'bg-slate-50 dark:bg-slate-900/50 border-slate-200 dark:border-slate-800 opacity-80 grayscale-[0.5]'
                  }
                `}
              >
                {/* Image Area */}
                <div className="relative h-48 sm:h-52 overflow-hidden bg-slate-200 dark:bg-slate-800">
                  <img
                    src={promo.image}
                    alt={promo.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  
                  {/* Overlay Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent opacity-60" />

                  {/* Status Badge */}
                  <div className="absolute top-4 right-4">
                    {active ? (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500 text-white text-xs font-bold shadow-lg">
                        <CheckCircle className="w-3.5 h-3.5" /> Aktif
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-600 text-white text-xs font-bold shadow-lg">
                        <XCircle className="w-3.5 h-3.5" /> Berakhir
                      </span>
                    )}
                  </div>
                </div>

                {/* Content Area */}
                <div className="flex flex-col flex-1 p-6">
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <h2 className="text-xl font-bold text-slate-900 dark:text-white line-clamp-2 leading-tight">
                      {promo.title}
                    </h2>
                    <Tag className="w-5 h-5 text-blue-500 shrink-0 mt-1" />
                  </div>

                  <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-3 mb-5 flex-1">
                    {promo.description}
                  </p>

                  <div className="space-y-4">
                    {/* Date Info */}
                    <div className="flex items-center gap-3 py-3 border-t border-slate-100 dark:border-slate-800">
                      <div className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400">
                        <Clock className="w-4 h-4" />
                      </div>
                      <div className="text-xs">
                        <p className="text-slate-500 dark:text-slate-500 font-medium uppercase tracking-wide">Periode Promo</p>
                        <p className="text-slate-800 dark:text-slate-200 font-semibold">
                          {formatDate(promo.startDate)} - {formatDate(promo.endDate)}
                        </p>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-3">
                      {promo.link ? (
                        <a
                          href={promo.link}
                          target="_blank"
                          rel="noreferrer"
                          className="flex-1 inline-flex justify-center items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold transition-colors shadow-sm shadow-blue-500/30"
                        >
                          Lihat Detail
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      ) : (
                        <button disabled className="flex-1 px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-400 text-sm font-medium cursor-not-allowed">
                          Info Saja
                        </button>
                      )}

                      <button
                        onClick={() => handleShare(promo)}
                        className={`px-4 py-2.5 rounded-xl border font-semibold text-sm transition-all flex items-center gap-2
                          ${copiedId === promo.id 
                            ? 'bg-green-50 border-green-200 text-green-600 dark:bg-green-900/20 dark:border-green-800 dark:text-green-400'
                            : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                          }
                        `}
                        title="Bagikan Promo"
                      >
                        {copiedId === promo.id ? <Check className="w-4 h-4" /> : <Share2 className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        
        <div className="mt-16 text-center">
          <p className="text-xs text-slate-400 dark:text-slate-500">
            Syarat & Ketentuan berlaku untuk setiap promo. Hubungi CS jika ada kendala.
          </p>
        </div>
      </main>

      {/* Style Animations */}
      <style>{`
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>
    </div>
  );
}