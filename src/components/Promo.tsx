// src/pages/PromoPage.tsx
import { useEffect, useState } from "react";
import { CalendarDays, Share2, CheckCircle, XCircle, Gift } from "lucide-react";

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
  const [selectedPromo, setSelectedPromo] = useState<Promo | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // 🧾 Data promo (bisa diganti dari API nanti)
  const promos: Promo[] = [
    {
      id: "coreline-october",
      title: "Promo Coreline Oktober 2025 🎉",
      description:
        "Nikmati potongan 20% untuk paket Plus dan Pro selama bulan Oktober! Kesempatan terbatas untuk semua pelajar.",
      startDate: "2025-10-01",
      endDate: "2025-10-31",
      image: "/promo/example.png",
      link: "https://newcoreline.astbyte.com",
    },
    {
      id: "coreline-student-week",
      title: "Coreline Student Week 💡",
      description:
        "Dapatkan akses gratis ke 5 modul premium Coreline Student Week! Belajar dasar pemrograman tanpa biaya.",
      startDate: "2025-11-01",
      endDate: "2025-11-07",
      image: "/promo/example.png",
    },
    {
      id: "coreline-pro-anniversary",
      title: "Coreline Pro Anniversary 🔥",
      description:
        "Ulang tahun Coreline! Dapatkan bonus mentoring 1-on-1 GRATIS untuk semua pelanggan baru paket Pro.",
      startDate: "2025-12-01",
      endDate: "2025-12-15",
      image: "/promo/coreline-anniversary.jpg",
    },
  ];

  useEffect(() => {
    document.title = "Promo Terbaru | AstByte";
    const metaTitle = document.querySelector('meta[property="og:title"]');
    const metaDesc = document.querySelector('meta[property="og:description"]');
    const metaImage = document.querySelector('meta[property="og:image"]');
    const metaIcon = document.querySelector('link[rel="icon"]');

    if (metaTitle)
      metaTitle.setAttribute("content", "Promo Terbaru dari AstByte 🎁");
    if (metaDesc)
      metaDesc.setAttribute(
        "content",
        "Temukan promo dan penawaran spesial dari AstByte — Coreline, Amagi, dan produk lainnya!"
      );
    if (metaImage)
      metaImage.setAttribute("content", "/promo/default-banner.jpg");
    if (metaIcon) metaIcon.setAttribute("href", "/logos/astbyte-icon.png");
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

    // ubah meta tag share agar sesuai promo yang dipilih
    const metaTitle = document.querySelector('meta[property="og:title"]');
    const metaDesc = document.querySelector('meta[property="og:description"]');
    const metaImage = document.querySelector('meta[property="og:image"]');

    if (metaTitle) metaTitle.setAttribute("content", promo.title);
    if (metaDesc) metaDesc.setAttribute("content", promo.description);
    if (metaImage) metaImage.setAttribute("content", promo.image);

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(shareUrl);
        setCopiedId(promo.id);
        setTimeout(() => setCopiedId(null), 2000);
      }
    } catch (err) {
      console.error("Share failed:", err);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900 text-slate-800 dark:text-slate-100">
      {/* Header */}
      <header className="text-center py-10">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-indigo-600 to-sky-500 text-white shadow-sm">
          <Gift className="w-4 h-4" /> Promo AstByte
        </div>
        <h1 className="mt-4 text-3xl sm:text-4xl font-extrabold">
          Penawaran Terbaru dari AstByte 🚀
        </h1>
        <p className="mt-2 text-slate-600 dark:text-slate-300">
          Dapatkan promo eksklusif dari produk AstByte seperti Coreline & Amagi.
        </p>
      </header>

      {/* List Promo */}
      <main className="container mx-auto max-w-6xl px-4 pb-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {promos.map((promo) => {
            const active = isActive(promo.startDate, promo.endDate);
            const start = new Date(promo.startDate).toLocaleDateString("id-ID", {
              day: "numeric",
              month: "long",
              year: "numeric",
            });
            const end = new Date(promo.endDate).toLocaleDateString("id-ID", {
              day: "numeric",
              month: "long",
              year: "numeric",
            });

            return (
              <div
                key={promo.id}
                className={`overflow-hidden rounded-2xl shadow-lg ring-1 ring-black/5 dark:ring-white/10 ${
                  active
                    ? "bg-white dark:bg-slate-900"
                    : "bg-slate-100 dark:bg-slate-800/80 opacity-90"
                }`}
              >
                {/* Banner */}
                <div className="aspect-[16/9] overflow-hidden">
                  <img
                    src={promo.image}
                    alt={promo.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Content */}
                <div className="p-5">
                  <div className="flex items-center justify-between mb-2">
                    <h2 className="text-xl font-bold">{promo.title}</h2>
                    {active ? (
                      <span className="inline-flex items-center gap-1 text-green-600 text-sm font-medium">
                        <CheckCircle className="w-4 h-4" /> Aktif
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-red-600 text-sm font-medium">
                        <XCircle className="w-4 h-4" /> Berakhir
                      </span>
                    )}
                  </div>

                  <p className="text-slate-600 dark:text-slate-300 mb-3 line-clamp-3">
                    {promo.description}
                  </p>

                  <div className="flex items-center gap-2 text-sm text-slate-500 mb-4">
                    <CalendarDays className="w-4 h-4" />
                    <span>
                      {start} — {end}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    {promo.link ? (
                      <a
                        href={promo.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-sky-600 dark:text-cyan-300 hover:underline font-medium"
                      >
                        Kunjungi Promo →
                      </a>
                    ) : (
                      <span className="text-xs text-slate-500">
                        *Tidak ada link promo
                      </span>
                    )}

                    <button
                      onClick={() => handleShare(promo)}
                      className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-sky-500 text-white px-3 py-2 rounded-lg text-sm font-semibold hover:opacity-90"
                    >
                      <Share2 className="w-4 h-4" />
                      {copiedId === promo.id ? "Tautan Disalin" : "Bagikan"}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <p className="text-center text-xs text-slate-500 mt-12">
          Halaman promo ini disediakan oleh{" "}
          <b className="text-sky-600">AstByte</b> — semua promo resmi
          Coreline & Amagi tercantum di sini.
        </p>
      </main>
    </div>
  );
}
