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
} from 'lucide-react';

interface Promo {
  id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  image: string;
  link?: string;
}

export default function PromoPage() {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const promos: Promo[] = [
    {
      id: 'coreline-october',
      title: 'Promo Coreline Oktober 2025',
      description:
        'Nikmati potongan 20% untuk paket Plus dan Pro selama bulan Oktober. Kesempatan terbatas untuk semua pelajar.',
      startDate: '2025-10-01',
      endDate: '2025-10-31',
      image: '/promo/example.png',
      link: 'https://newcoreline.astbyte.com',
    },
    {
      id: 'coreline-student-week',
      title: 'Coreline Student Week',
      description:
        'Dapatkan akses gratis ke 5 modul premium Coreline Student Week. Belajar dasar pemrograman tanpa biaya.',
      startDate: '2025-11-01',
      endDate: '2025-11-07',
      image: '/promo/example.png',
    },
    {
      id: 'coreline-pro-anniversary',
      title: 'Coreline Pro Anniversary',
      description:
        'Ulang tahun Coreline! Dapatkan bonus mentoring 1-on-1 gratis untuk semua pelanggan baru paket Pro.',
      startDate: '2025-12-01',
      endDate: '2025-12-15',
      image: '/promo/coreline-anniversary.jpg',
    },
  ];

  useEffect(() => {
    document.title = 'Promo Terbaru | AstByte';
    const metaTitle = document.querySelector('meta[property="og:title"]');
    const metaDesc = document.querySelector('meta[property="og:description"]');
    const metaImage = document.querySelector('meta[property="og:image"]');
    const metaIcon = document.querySelector('link[rel="icon"]');

    if (metaTitle)
      metaTitle.setAttribute('content', 'Promo Terbaru dari AstByte');
    if (metaDesc)
      metaDesc.setAttribute(
        'content',
        'Temukan promo dan penawaran spesial dari AstByte — Coreline, Amagi, dan produk lainnya.'
      );
    if (metaImage)
      metaImage.setAttribute('content', '/promo/default-banner.jpg');
    if (metaIcon) metaIcon.setAttribute('href', '/logos/astbyte-icon.png');
  }, []);

  const now = new Date();

  function isActive(start: string, end: string) {
    const s = new Date(start);
    const e = new Date(end);
    return now >= s && now <= e;
  }

  async function handleShare(promo: Promo) {
    const shareUrl = `${window.location.origin}/promo/${promo.id}.html`;
    const shareData = {
      title: promo.title,
      text: `${promo.description}\nLihat promo lengkap di sini:`,
      url: shareUrl,
    };

    const metaTitle = document.querySelector('meta[property="og:title"]');
    const metaDesc = document.querySelector('meta[property="og:description"]');
    const metaImage = document.querySelector('meta[property="og:image"]');

    if (metaTitle) metaTitle.setAttribute('content', promo.title);
    if (metaDesc) metaDesc.setAttribute('content', promo.description);
    if (metaImage) metaImage.setAttribute('content', promo.image);

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(shareUrl);
        setCopiedId(promo.id);
        setTimeout(() => setCopiedId(null), 2000);
      }
    } catch (err) {
      console.error('Share failed:', err);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900 text-slate-800 dark:text-slate-100">
      {/* Header */}
      <header className="relative overflow-hidden py-16 sm:py-20">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-100 via-transparent to-transparent dark:from-blue-900/20 opacity-40" />
        
        <div className="relative container mx-auto max-w-4xl px-4 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-700 text-gray-700 dark:text-slate-300 text-sm font-medium shadow-sm mb-6">
            <Gift className="w-4 h-4 text-blue-600 dark:text-cyan-400" />
            Promo AstByte
          </div>
          
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white mb-4">
            Penawaran Terbaru
          </h1>
          
          <p className="text-lg text-gray-600 dark:text-slate-300 max-w-2xl mx-auto">
            Dapatkan promo eksklusif dari produk AstByte seperti Coreline dan Amagi
          </p>
        </div>
      </header>

      {/* List Promo */}
      <main className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {promos.map((promo, idx) => {
            const active = isActive(promo.startDate, promo.endDate);
            const start = new Date(promo.startDate).toLocaleDateString('id-ID', {
              day: 'numeric',
              month: 'short',
              year: 'numeric',
            });
            const end = new Date(promo.endDate).toLocaleDateString('id-ID', {
              day: 'numeric',
              month: 'short',
              year: 'numeric',
            });

            return (
              <div
                key={promo.id}
                style={{ animationDelay: `${idx * 100}ms` }}
                className={`group animate-fade-in-up overflow-hidden rounded-2xl shadow-lg ring-1 transition-all duration-300 hover:shadow-xl ${
                  active
                    ? 'bg-white dark:bg-slate-900 ring-gray-200 dark:ring-slate-800 hover:ring-blue-500/50 dark:hover:ring-cyan-400/50'
                    : 'bg-gray-50 dark:bg-slate-900/50 ring-gray-200 dark:ring-slate-800 opacity-75'
                }`}
              >
                {/* Status Badge */}
                <div className="absolute top-4 right-4 z-10">
                  {active ? (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500 text-white text-xs font-semibold shadow-lg">
                      <CheckCircle className="w-3.5 h-3.5" />
                      Aktif
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gray-500 text-white text-xs font-semibold shadow-lg">
                      <XCircle className="w-3.5 h-3.5" />
                      Berakhir
                    </span>
                  )}
                </div>

                {/* Banner */}
                <div className="relative aspect-[16/9] overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 dark:from-slate-800 dark:to-slate-700">
                  <img
                    src={promo.image}
                    alt={promo.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Content */}
                <div className="p-6">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-cyan-400 transition-colors">
                    {promo.title}
                  </h2>

                  <p className="text-sm text-gray-600 dark:text-slate-300 mb-4 line-clamp-3 leading-relaxed">
                    {promo.description}
                  </p>

                  <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-slate-400 mb-6 pb-6 border-b border-gray-200 dark:border-slate-700">
                    <Clock className="w-4 h-4" />
                    <span className="font-medium">
                      {start} — {end}
                    </span>
                  </div>

                  <div className="flex items-center justify-between gap-3">
                    {promo.link ? (
                      <a
                        href={promo.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-sm text-blue-600 dark:text-cyan-400 hover:text-blue-700 dark:hover:text-cyan-300 font-semibold transition-colors"
                      >
                        Lihat Detail
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    ) : (
                      <span className="text-xs text-gray-400 dark:text-slate-500">
                        Tidak ada link
                      </span>
                    )}

                    <button
                      onClick={() => handleShare(promo)}
                      className="inline-flex items-center gap-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors shadow-sm"
                    >
                      {copiedId === promo.id ? (
                        <>
                          <Check className="w-4 h-4" />
                          Tersalin
                        </>
                      ) : (
                        <>
                          <Share2 className="w-4 h-4" />
                          Bagikan
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer Note */}
        <div className="mt-16 text-center">
          <p className="text-sm text-gray-500 dark:text-slate-400">
            Halaman promo ini disediakan oleh{' '}
            <span className="font-semibold text-gray-900 dark:text-white">
              AstByte
            </span>
            . Semua promo resmi Coreline dan Amagi tercantum di sini.
          </p>
        </div>
      </main>

      {/* Custom CSS */}
      <style>{`
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

        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out;
        }
      `}</style>
    </div>
  );
}
