// src/pages/Dashboard.tsx
import { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import type { LearningMaterial } from '../types/learning';
import { MOCK_MATERIALS as STUDENT_MATERIALS } from '../data/mockData';
import { MOCK_MATERIALS as OTHER_MATERIALS } from '../data/otherData';
import ProfilePage from './ProfilePage';
import {
  LogOut,
  BookOpen,
  Award,
  ChevronRight,
  X,
  User as UserIcon,
  Menu,
  Languages,
  Loader2,
  Search,
  Filter,
  PartyPopper,
  Crown,
  Lock,
  Download,
} from 'lucide-react';


/* ================================
 * Language filter config
 * ================================ */
type Lang = {
  id: 'python' | 'php' | 'javascript' | 'typescript' | 'ruby' | 'go' | 'mysql' | 'postgresql';
  name: string;
  iconUrl: string;
  comingSoon?: boolean;
};


const languageData: readonly Lang[] = [
  {
    id: 'python',
    name: 'Python',
    iconUrl:
      'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
  },
  {
    id: 'php',
    name: 'PHP',
    iconUrl:
      'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg',
  },
  {
    id: 'javascript',
    name: 'JavaScript',
    iconUrl:
      'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
  },
  {
    id: 'typescript',
    name: 'TypeScript',
    iconUrl:
      'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg',
  },
  {
    id: 'ruby',
    name: 'Ruby',
    iconUrl:
      'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/ruby/ruby-original.svg',
  },
  {
    id: 'go',
    name: 'Go',
    iconUrl:
      'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original.svg',
    comingSoon: true,
  },
  {
    id: 'mysql',
    name: 'MySQL',
    iconUrl:
      'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg',
    comingSoon: true,
  },
  {
    id: 'postgresql',
    name: 'PostgreSQL',
    iconUrl:
      'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg',
    comingSoon: true,
  },
] as const;


type Level = 'beginner' | 'intermediate' | 'advanced';
type SortKey = 'order' | 'title' | 'level';
type Plan = 'free' | 'pro' | 'plus';


export default function Dashboard() {
  const { user, logout, loading: authLoading } = useAuth();
  const navigate = useNavigate();


  useEffect(() => {
    document.title = 'Dashboard | New Coreline by AstByte';
  }, []);


  const [materials, setMaterials] = useState<LearningMaterial[]>([]);
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(() =>
    typeof window !== 'undefined' ? localStorage.getItem('cl_lang') : null
  );
  const [showProfile, setShowProfile] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [downloadingPdf, setDownloadingPdf] = useState<string | null>(null);


  // --- SEARCH ---
  const [searchText, setSearchText] = useState('');
  const [query, setQuery] = useState('');
  useEffect(() => {
    const t = setTimeout(() => setQuery(searchText), 200);
    return () => clearTimeout(t);
  }, [searchText]);


  const [sortKey, setSortKey] = useState<SortKey>('order');
  const drawerRef = useRef<HTMLDivElement>(null);


  const levelLabel: Record<Level, string> = {
    beginner: 'Pemula',
    intermediate: 'Menengah',
    advanced: 'Lanjutan',
  };


  const levelPill = (level: Level) => {
    switch (level) {
      case 'beginner':
        return 'bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-200 dark:border-green-900/40';
      case 'intermediate':
        return 'bg-yellow-50 text-yellow-700 border-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-200 dark:border-yellow-900/40';
      case 'advanced':
        return 'bg-red-50 text-red-700 border-red-200 dark:bg-red-900/20 dark:text-red-200 dark:border-red-900/40';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };


  // helper: user_type (dari AuthX optional, default: student)
  const resolveUserType = (): 'student' | 'umum' | 'pro' | 'game' => {
    const raw = (user as any)?.user_type;
    if (raw === 'umum' || raw === 'pro' || raw === 'game' || raw === 'student') {
      return raw;
    }
    return 'student';
  };


  const userTitle = useMemo(() => {
    const ut = resolveUserType();
    switch (ut) {
      case 'student':
        return 'Code Path Student';
      case 'umum':
        return 'Jalur Pembelajaran Umum';
      case 'pro':
        return 'Akselerasi Profesional';
      case 'game':
        return 'Pengembangan Game';
      default:
        return 'Dashboard Pembelajaran';
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);


  // --- PLAN from subscription (source of truth) ---
  const getPlanFromUser = (u: any): Plan => {
    const type = (u?.subscription_type ?? 'free')
      .toString()
      .toLowerCase()
      .trim() as string;


    if (type === 'plus') return 'plus';
    if (type === 'pro') return 'pro';
    return 'free';
  };


  const plan: Plan = getPlanFromUser(user);


  const nextTier = plan === 'free' ? 'Pro' : plan === 'pro' ? 'Plus' : null;
  const nextHref =
    plan === 'free'
      ? '/pricing'
      : plan === 'pro'
      ? '/pricing'
      : undefined;


  // --- Helper: Check if module is locked ---
  const isModuleLocked = (moduleOrder: number): boolean => {
    // Modul 1 & 2 gratis untuk semua user
    if (moduleOrder <= 2) return false;
    
    // Modul 3+ butuh Pro atau Plus
    return plan === 'free';
  };


  // --- Helper: Download PDF (Plus only) ---
  const downloadModulePDF = async (material: LearningMaterial) => {
    if (plan !== 'plus') {
      alert('Fitur download PDF hanya tersedia untuk paket Plus!');
      return;
    }

    setDownloadingPdf(material.id);

    try {
      // Dynamically import jsPDF and html2canvas
      const { default: jsPDF } = await import('jspdf');
      const html2canvas = (await import('html2canvas')).default;

      // Navigate to material page to capture content
      navigate(`/materials/${encodeURIComponent(material.id)}`);
      
      // Wait for page to render
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Find the main content element (adjust selector based on your MaterialPage structure)
      const element = document.querySelector('.material-content') || document.body;

      // Generate canvas from HTML
      const canvas = await html2canvas(element as HTMLElement, {
        scale: 2,
        useCORS: true,
        logging: false,
        allowTaint: true,
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      
      const imgWidth = 210; // A4 width in mm
      const pageHeight = 297; // A4 height in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;

      // Add first page
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      // Add additional pages if content is longer
      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      // Save PDF
      const filename = `${material.title.replace(/[^a-z0-9]/gi, '_')}.pdf`;
      pdf.save(filename);

      // Go back to dashboard
      navigate('/dashboard');
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Gagal membuat PDF. Silakan coba lagi.');
    } finally {
      setDownloadingPdf(null);
    }
  };


  // --- load materials ---
  useEffect(() => {
    if (!user) return;
    setLoading(true);


    const userType = resolveUserType();


    // Gabung semua materials dari kedua sumber
    const allMaterials: LearningMaterial[] = [
      ...STUDENT_MATERIALS,
      ...OTHER_MATERIALS,
    ];


    let list = allMaterials.filter((m) => m.user_type === userType);


    if (selectedLanguage) {
      list = list.filter((m) => m.language === selectedLanguage);
    }


    const q = query.trim().toLowerCase();
    if (q) {
      list = list.filter(
        (m) =>
          m.title.toLowerCase().includes(q) ||
          m.description.toLowerCase().includes(q)
      );
    }


    list.sort((a, b) => {
      if (sortKey === 'order') return a.order - b.order;
      if (sortKey === 'title') return a.title.localeCompare(b.title);
      if (sortKey === 'level')
        return levelLabel[a.level as Level].localeCompare(
          levelLabel[b.level as Level]
        );
      return 0;
    });


    setMaterials(list);
    const timer = setTimeout(() => setLoading(false), 150);
    return () => clearTimeout(timer);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, selectedLanguage, query, sortKey]);


  // persist selected language
  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (selectedLanguage) localStorage.setItem('cl_lang', selectedLanguage);
      else localStorage.removeItem('cl_lang');
    }
  }, [selectedLanguage]);


  // Kalau lagi cek token ke authx
  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950">
        <div className="text-center animate-pulse">
          <Loader2 className="mx-auto h-10 w-10 animate-spin text-blue-600 dark:text-cyan-400" />
          <p className="mt-3 text-sm text-gray-600 dark:text-slate-300">
            Memverifikasi sesi Astbyte kamu...
          </p>
        </div>
      </div>
    );
  }


  // Kalau belum login sama sekali
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-950 dark:via-slate-950 dark:to-slate-900 px-4">
        <div className="max-w-md w-full bg-white/90 dark:bg-slate-900/80 rounded-2xl shadow-xl ring-1 ring-black/5 dark:ring-white/10 p-6 sm:p-8 text-center space-y-4">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
            Kamu belum login
          </h1>
          <p className="text-sm text-gray-600 dark:text-slate-300">
            Silakan login dulu dengan Astbyte Account untuk mengakses Dashboard Coreline.
          </p>
          <Link
            to="/login"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 hover:bg-blue-700 focus-visible:ring-4 focus-visible:ring-blue-500/30 transition-transform transform hover:-translate-y-0.5"
          >
            Masuk ke Coreline
          </Link>
        </div>
      </div>
    );
  }


  if (showProfile) return <ProfilePage onBack={() => setShowProfile(false)} />;


  /* ================================
   * Components
   * ================================ */


  const LanguageSidebar = ({ mode = 'desktop' }: { mode?: 'desktop' | 'mobile' }) => {
    const isDesktop = mode === 'desktop';


    return (
      <aside
        className={[
          'p-5 sm:p-6',
          'flex flex-col',
          isDesktop
            ? 'bg-white/80 dark:bg-slate-900/70 shadow-xl lg:shadow-none lg:rounded-xl ring-1 ring-black/5 dark:ring-white/10 lg:sticky lg:top-[82px] rounded-2xl'
            : 'bg-transparent shadow-none ring-0 rounded-none',
        ].join(' ')}
      >
        {isDesktop && (
          <h3 className="text-lg sm:text-xl font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
            <Languages className="w-5 h-5 text-blue-600 dark:text-cyan-400" />
            Jalur Bahasa
          </h3>
        )}


        {!isDesktop && (
          <h3 className="text-base font-semibold text-gray-800 dark:text-white mb-3 flex items-center gap-2">
            <Languages className="w-4 h-4 text-blue-600 dark:text-cyan-400" />
            Pilih Bahasa
          </h3>
        )}


        <div className="flex flex-col gap-3">
          {languageData.map((lang) => {
            const isActive = selectedLanguage === lang.id;
            const disabled = !!lang.comingSoon;


            return (
              <button
                key={lang.id}
                onClick={() => {
                  if (!disabled) setSelectedLanguage(isActive ? null : lang.id);
                  setIsSidebarOpen(false);
                }}
                disabled={disabled}
                className={[
                  'group flex items-center gap-4 p-3.5 rounded-xl transition-all text-left w-full ring-1 ring-black/5 dark:ring-white/10',
                  'transform duration-200',
                  isActive
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/25 scale-[1.02]'
                    : 'bg-gray-50/80 dark:bg-slate-800/70 text-gray-700 dark:text-slate-200 hover:bg-blue-50/80 hover:text-blue-700 dark:hover:bg-slate-800 hover:-translate-y-0.5',
                  disabled ? 'opacity-60 cursor-not-allowed hover:translate-y-0' : 'cursor-pointer',
                ].join(' ')}
                title={disabled ? `${lang.name} — Coming Soon` : lang.name}
              >
                <div className="h-8 w-8 rounded-lg bg-white dark:bg-slate-900 shadow-sm flex items-center justify-center">
                  <img
                    src={lang.iconUrl}
                    alt=""
                    className="h-6 w-6 object-contain"
                  />
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-semibold text-sm sm:text-base">
                    {lang.name}
                  </span>
                  {lang.comingSoon && (
                    <span className="inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full border border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-900/40 dark:bg-amber-900/20 dark:text-amber-200">
                      <Lock className="w-3 h-3" />
                      Coming&nbsp;Soon
                    </span>
                  )}
                </div>
              </button>
            );
          })}


          {selectedLanguage && (
            <button
              onClick={() => setSelectedLanguage(null)}
              className="flex items-center justify-center gap-2 mt-2 py-2 text-xs sm:text-sm text-gray-600 dark:text-slate-300 hover:text-red-600 dark:hover:text-red-400 transition"
            >
              <X className="w-4 h-4" />
              Reset Filter
            </button>
          )}
        </div>
      </aside>
    );
  };


  const UpgradeBanner = () => {
    if (plan === 'plus') {
      return (
        <div className="mt-4 rounded-xl ring-1 ring-emerald-200/60 dark:ring-emerald-800/40 bg-gradient-to-r from-emerald-50 via-white to-emerald-50 dark:from-emerald-900/10 dark:via-slate-900 dark:to-emerald-900/10 p-4 sm:p-5 transition-all duration-300 hover:shadow-md">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            <p className="text-sm sm:text-base font-semibold text-emerald-800 dark:text-emerald-300 flex items-center gap-2">
              <PartyPopper className="w-5 h-5" />
              Selamat! Kamu di paket{' '}
              <span className="underline decoration-emerald-400 decoration-2">
                Plus
              </span>
              {' '}— Download PDF tersedia!
            </p>
          </div>
        </div>
      );
    }


    return (
      <div className="mt-4 rounded-xl ring-1 ring-black/5 dark:ring-white/10 bg-gradient-to-r from-amber-50 via-white to-amber-50 dark:from-slate-800 dark:via-slate-900 dark:to-slate-800 p-4 sm:p-5 transition-all duration-300 hover:shadow-md">
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
          <p className="text-sm sm:text-base font-semibold text-amber-800 dark:text-amber-300 flex items-center gap-2">
            <Crown className="w-5 h-5" />
            Upgrade ke{' '}
            <span className="underline decoration-amber-400 decoration-2">
              {nextTier}
            </span>{' '}
            untuk akses penuh semua path & modul premium.
          </p>
          {nextTier && nextHref && (
            <Link
              to={nextHref}
              className="inline-flex items-center justify-center px-4 py-2 rounded-lg bg-amber-500 text-white text-sm font-semibold hover:bg-amber-600 transition-transform transform hover:-translate-y-0.5"
            >
              Ke {nextTier}
            </Link>
          )}
        </div>
      </div>
    );
  };


  const Toolbar = () => (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between flex-wrap">
        <div className="relative flex-1 min-w-[220px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            placeholder="Cari materi (judul/deskripsi)"
            autoComplete="off"
            spellCheck={false}
            className="w-full rounded-xl border border-gray-200 dark:border-slate-700 bg-white/70 dark:bg-slate-900/60 pl-10 pr-4 py-2.5 text-sm text-gray-800 dark:text-white outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/15 transition-all"
          />
        </div>


        <div className="flex items-center gap-2 justify-end">
          <div className="inline-flex items-center gap-2 rounded-xl border border-gray-200 dark:border-slate-700 bg-white/70 dark:bg-slate-900/60 px-3 py-2">
            <Filter className="h-4 w-4 text-gray-400" />
            <select
              value={sortKey}
              onChange={(e) => setSortKey(e.target.value as SortKey)}
              className="bg-transparent text-xs sm:text-sm text-gray-800 dark:text-white outline-none"
            >
              <option value="order">Urutan Modul</option>
              <option value="title">Judul A-Z</option>
              <option value="level">Level</option>
            </select>
          </div>
        </div>
      </div>


      <UpgradeBanner />
    </div>
  );


  const userType = resolveUserType();


  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-950 dark:via-slate-950 dark:to-slate-900 flex flex-col">
      {/* Navbar */}
      <nav className="sticky top-0 z-40 bg-white/80 dark:bg-slate-900/70 backdrop-blur ring-1 ring-black/5 dark:ring-white/10 shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <a href="/" className="block h-8 w-8">
                <img
                  src="/icon.png"
                  alt="coreline logo"
                  className="h-8 w-8 object-contain"
                />
              </a>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <h1 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">
                    Coreline
                  </h1>
                  <a href="https://www.astbyte.com">
                    <span className="text-[9px] uppercase tracking-wide font-semibold text-blue-500 bg-blue-50 dark:bg-blue-500/10 px-2 py-0.5 rounded-full">
                      by AstByte
                    </span>
                  </a>
                </div>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-slate-300">
                  Hai, {user.full_name || user.email || 'User'} 👋
                </p>
              </div>
            </div>


            <div className="flex items-center gap-2">
              {userType === 'student' && (
                <button
                  onClick={() => setIsSidebarOpen(true)}
                  className="p-2 lg:hidden text-gray-700 dark:text-slate-200 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-lg transition"
                  title="Filter Bahasa"
                >
                  <Menu className="w-5 h-5" />
                </button>
              )}


              <button
                onClick={() => setShowProfile(true)}
                className="flex items-center gap-2 px-3 py-2 text-gray-800 dark:text-slate-200 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-lg transition text-sm"
                title="Profil"
              >
                <UserIcon className="w-4 h-4" />
                <span className="hidden md:inline">Profil</span>
              </button>
              <button
                onClick={logout}
                className="flex items-center gap-2 px-3 py-2 bg-red-500 text-white hover:bg-red-600 rounded-lg transition text-sm font-semibold"
                title="Keluar"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden md:inline">Keluar</span>
              </button>
            </div>
          </div>
        </div>
      </nav>


      {/* Mobile Sidebar Drawer */}
      {isSidebarOpen && userType === 'student' && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm animate-fade-in"
            onClick={() => setIsSidebarOpen(false)}
          />
          <div
            ref={drawerRef}
            className="absolute left-0 top-0 h-full w-full max-w-sm bg-white dark:bg-slate-900 shadow-2xl flex flex-col transform transition-transform duration-300 ease-out"
          >
            <div className="flex justify-between items-center px-5 pt-5 pb-3 border-b border-gray-200/70 dark:border-slate-800">
              <h2 className="text-lg font-bold text-gray-800 dark:text-white">
                Filter Bahasa
              </h2>
              <button
                onClick={() => setIsSidebarOpen(false)}
                className="p-1.5 text-gray-600 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-lg"
                aria-label="Tutup Sidebar"
              >
                <X className="w-5 h-5" />
              </button>
            </div>


            {/* konten scrollable */}
            <div className="flex-1 overflow-y-auto px-5 pb-6">
              <LanguageSidebar mode="mobile" />
            </div>
          </div>
        </div>
      )}


      {/* Main */}
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-10 flex-1">
        <div className="mb-6 sm:mb-8 rounded-2xl bg-white/80 dark:bg-slate-900/70 ring-1 ring-black/5 dark:ring-white/10 p-6 sm:p-8 shadow-sm transition-all duration-300">
          <div className="flex flex-col gap-2">
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-blue-800 dark:text-cyan-300 tracking-tight">
                {userTitle}
              </h2>
              <p className="text-gray-600 dark:text-slate-300 text-sm sm:text-base mt-1">
                Akses materi dan lanjutkan perjalanan coding kamu hari ini. 🚀
              </p>
            </div>
            <Toolbar />
          </div>
        </div>


        <div className="lg:grid lg:grid-cols-12 lg:gap-8 items-start">
          {/* Sidebar Desktop */}
          <div className="hidden lg:col-span-3 lg:block">
            <LanguageSidebar mode="desktop" />
          </div>


          {/* Content */}
          <div
            className={
              userType === 'student' ? 'lg:col-span-9 space-y-4' : 'lg:col-span-12 space-y-4'
            }
          >
            <div className="flex flex-wrap items-center gap-3 mb-3 sm:mb-4">
              <div className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600 dark:text-cyan-400" />
                <h3 className="text-lg sm:text-2xl font-bold text-gray-900 dark:text-white">
                  Materi Tersedia
                </h3>
              </div>
              {selectedLanguage && (
                <span className="text-xs sm:text-sm font-semibold px-3 py-1 bg-blue-100 text-blue-700 dark:bg-cyan-900/40 dark:text-cyan-200 rounded-full">
                  Filter: {selectedLanguage.toUpperCase()}
                </span>
              )}
              <span className="text-xs sm:text-sm text-gray-500 dark:text-slate-400">
                {materials.length} modul siap dipelajari
              </span>
            </div>


            {loading ? (
              <div className="text-center py-12 sm:py-16 rounded-2xl bg-white/70 dark:bg-slate-900/60 ring-1 ring-black/5 dark:ring-white/10">
                <Loader2 className="inline-block animate-spin h-10 w-10 text-blue-600 dark:text-cyan-400" />
                <p className="mt-4 text-gray-600 dark:text-slate-300 text-base sm:text-lg font-medium">
                  Memuat materi pembelajaran...
                </p>
              </div>
            ) : materials.length === 0 ? (
              <div className="rounded-2xl bg-white/70 dark:bg-slate-900/60 p-10 sm:p-12 text-center ring-2 ring-dashed ring-gray-200 dark:ring-slate-700">
                <BookOpen className="w-14 h-14 sm:w-16 sm:h-16 text-gray-400 dark:text-slate-500 mx-auto mb-4" />
                <p className="text-base sm:text-lg text-gray-700 dark:text-slate-300 font-medium">
                  {userType === 'student' && !selectedLanguage
                    ? 'Pilih bahasa pemrograman dari filter untuk memulai.'
                    : 'Belum ada materi yang sesuai dengan profil Anda atau filter yang dipilih.'}
                </p>
              </div>
            ) : (
              <div className="grid gap-4 sm:gap-5 md:grid-cols-2 xl:grid-cols-3">
                {materials.map((m, index) => {
                  const locked = isModuleLocked(m.order);
                  const isDownloading = downloadingPdf === m.id;

                  return locked ? (
                    // Locked Module Card
                    <div
                      key={m.id}
                      className="group relative block rounded-2xl bg-white/80 dark:bg-slate-900/70 p-5 sm:p-6 shadow-md ring-1 ring-black/5 dark:ring-white/10"
                      style={{
                        animation: `fadeInUp 0.35s ease-out both`,
                        animationDelay: `${index * 40}ms`,
                      }}
                    >
                      {/* Blurred Content */}
                      <div className="blur-[3px] select-none pointer-events-none">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <div className="mb-2 flex items-center gap-3">
                              <div className="h-8 w-8 rounded-xl bg-blue-50 dark:bg-cyan-900/20 flex items-center justify-center">
                                <Award className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 dark:text-cyan-400" />
                              </div>
                              <h4 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white leading-snug">
                                {m.order}. {m.title}
                              </h4>
                            </div>
                            <p className="ml-0 sm:ml-1 text-sm sm:text-[15px] text-gray-600 dark:text-slate-300 mb-3 line-clamp-3">
                              {m.description}
                            </p>
                            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                              <span
                                className={`text-[11px] sm:text-xs px-3 py-1 rounded-full font-semibold border ${levelPill(
                                  m.level as Level
                                )}`}
                              >
                                {levelLabel[m.level as Level]}
                              </span>
                              {m.language && (
                                <span className="text-[11px] sm:text-xs px-3 py-1 rounded-full font-semibold bg-gray-100 text-gray-700 dark:bg-slate-800 dark:text-slate-200 border border-gray-300 dark:border-slate-700">
                                  {m.language.toUpperCase()}
                                </span>
                              )}
                            </div>
                          </div>
                          <ChevronRight className="mt-1 h-5 w-5 text-blue-400 dark:text-cyan-300 flex-shrink-0" />
                        </div>
                      </div>

                      {/* Lock Overlay */}
                      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-slate-900/60 via-slate-800/50 to-slate-900/60 dark:from-slate-950/80 dark:via-slate-900/70 dark:to-slate-950/80 flex items-center justify-center">
                        <div className="text-center p-4 z-10">
                          <Lock className="w-10 h-10 sm:w-12 sm:h-12 text-amber-400 dark:text-amber-300 mx-auto mb-2 drop-shadow-lg" />
                          <p className="text-sm font-bold text-white mb-1">
                            Modul Premium
                          </p>
                          <p className="text-xs text-gray-200 dark:text-gray-300 mb-3">
                            Upgrade ke Pro/Plus untuk akses
                          </p>
                          <Link
                            to="/pricing"
                            className="inline-flex items-center gap-1.5 px-4 py-2 bg-amber-500 text-white text-sm font-semibold rounded-lg hover:bg-amber-600 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                          >
                            <Crown className="w-4 h-4" />
                            Upgrade Sekarang
                          </Link>
                        </div>
                      </div>
                    </div>
                  ) : (
                    // Unlocked Module Card
                    <div
                      key={m.id}
                      className="group relative block rounded-2xl bg-white/80 dark:bg-slate-900/70 p-5 sm:p-6 shadow-md ring-1 ring-black/5 dark:ring-white/10 transition-all duration-300 hover:shadow-xl hover:ring-blue-500/30 dark:hover:ring-cyan-400/30"
                      style={{
                        animation: `fadeInUp 0.35s ease-out both`,
                        animationDelay: `${index * 40}ms`,
                      }}
                    >
                      <Link
                        to={`/materials/${encodeURIComponent(m.id)}`}
                        className="block"
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <div className="mb-2 flex items-center gap-3">
                              <div className="h-8 w-8 rounded-xl bg-blue-50 dark:bg-cyan-900/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                                <Award className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 dark:text-cyan-400" />
                              </div>
                              <h4 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white leading-snug">
                                {m.order}. {m.title}
                              </h4>
                            </div>
                            <p className="ml-0 sm:ml-1 text-sm sm:text-[15px] text-gray-600 dark:text-slate-300 mb-3 line-clamp-3">
                              {m.description}
                            </p>
                            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                              <span
                                className={`text-[11px] sm:text-xs px-3 py-1 rounded-full font-semibold border ${levelPill(
                                  m.level as Level
                                )}`}
                              >
                                {levelLabel[m.level as Level]}
                              </span>
                              {m.language && (
                                <span className="text-[11px] sm:text-xs px-3 py-1 rounded-full font-semibold bg-gray-100 text-gray-700 dark:bg-slate-800 dark:text-slate-200 border border-gray-300 dark:border-slate-700">
                                  {m.language.toUpperCase()}
                                </span>
                              )}
                            </div>
                          </div>
                          <ChevronRight className="mt-1 h-5 w-5 text-blue-400 dark:text-cyan-300 flex-shrink-0 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </Link>

                      {/* Download PDF Button (Plus Only) */}
                      {plan === 'plus' && (
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            downloadModulePDF(m);
                          }}
                          disabled={isDownloading}
                          className="mt-3 w-full flex items-center justify-center gap-2 px-3 py-2 bg-emerald-500 text-white text-xs font-semibold rounded-lg hover:bg-emerald-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                          title="Download sebagai PDF (Plus Feature)"
                        >
                          {isDownloading ? (
                            <>
                              <Loader2 className="w-3.5 h-3.5 animate-spin" />
                              Generating PDF...
                            </>
                          ) : (
                            <>
                              <Download className="w-3.5 h-3.5" />
                              Download PDF
                            </>
                          )}
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </main>


      {/* Simple keyframe for fadeInUp */}
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translate3d(0, 10px, 0);
          }
          to {
            opacity: 1;
            transform: translate3d(0, 0, 0);
          }
        }
        .animate-fade-in {
          animation: fadeInUp 0.25s ease-out;
        }
      `}</style>
    </div>
  );
}
