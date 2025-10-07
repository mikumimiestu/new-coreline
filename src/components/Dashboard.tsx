import { useEffect, useMemo, useRef, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { LearningMaterial, MOCK_MATERIALS } from '../data/mockData';
import MaterialContent from './MaterialContent';
import ProfilePage from './ProfilePage';
import {
  LogOut,
  BookOpen,
  Code2,
  Award,
  ChevronRight,
  X,
  User as UserIcon,
  Menu,
  Languages,
  Loader2,
  Search,
  Filter,
  Moon,
  SunMedium,
} from 'lucide-react';

// --- Language filter config ---
const languageData = [
  { id: 'python', name: 'Python', icon: '🐍' },
  { id: 'php', name: 'PHP', icon: '🐘' },
  { id: 'javascript', name: 'JavaScript', icon: '⚡' },
] as const;

type Level = 'beginner' | 'intermediate' | 'advanced';

type SortKey = 'order' | 'title' | 'level';

export default function Dashboard() {
  const { user, logout } = useAuth();

  const [materials, setMaterials] = useState<LearningMaterial[]>([]);
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(() =>
    typeof window !== 'undefined' ? localStorage.getItem('cl_lang') : null
  );
  const [selectedMaterial, setSelectedMaterial] = useState<LearningMaterial | null>(null);
  const [showProfile, setShowProfile] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] = useState<SortKey>('order');
  const [dark, setDark] = useState<boolean>(() =>
    typeof document !== 'undefined' ? document.documentElement.classList.contains('dark') : false
  );

  const drawerRef = useRef<HTMLDivElement>(null);

  // --- helpers ---
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

  const userTitle = useMemo(() => {
    switch (user?.user_type) {
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
  }, [user?.user_type]);

  // --- effects ---
  useEffect(() => {
    if (!user) return;
    setLoading(true);

    // filter by user type
    let list = MOCK_MATERIALS.filter((m) => m.user_type === user.user_type);

    // filter by language
    if (selectedLanguage) {
      list = list.filter((m) => m.language === selectedLanguage);
    }

    // search by title/desc
    const q = query.trim().toLowerCase();
    if (q) {
      list = list.filter(
        (m) => m.title.toLowerCase().includes(q) || m.description.toLowerCase().includes(q)
      );
    }

    // sort
    list.sort((a, b) => {
      if (sortKey === 'order') return a.order - b.order;
      if (sortKey === 'title') return a.title.localeCompare(b.title);
      if (sortKey === 'level') return levelLabel[a.level as Level].localeCompare(levelLabel[b.level as Level]);
      return 0;
    });

    setMaterials(list);
    const timer = setTimeout(() => setLoading(false), 300); // small delay for smoother UX
    return () => clearTimeout(timer);
  }, [user, selectedLanguage, query, sortKey]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (selectedLanguage) localStorage.setItem('cl_lang', selectedLanguage);
      else localStorage.removeItem('cl_lang');
    }
  }, [selectedLanguage]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (selectedMaterial) setSelectedMaterial(null);
        if (isSidebarOpen) setIsSidebarOpen(false);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [selectedMaterial, isSidebarOpen]);

  const handleLanguageSelect = (langId: string) => {
    setSelectedLanguage(selectedLanguage === langId ? null : langId);
    setIsSidebarOpen(false);
  };

  const toggleTheme = () => {
    const root = document.documentElement;
    const enable = !root.classList.contains('dark');
    root.classList.toggle('dark', enable);
    setDark(enable);
  };

  if (showProfile) return <ProfilePage onBack={() => setShowProfile(false)} />;

  // --- Components ---
  const LanguageSidebar = () => (
    <div className={`p-6 ${user?.user_type === 'student' ? 'lg:block' : 'hidden'} bg-white/80 dark:bg-slate-900/70 shadow-xl lg:shadow-none lg:rounded-xl ring-1 ring-black/5 dark:ring-white/10`}>
      <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
        <Languages className="w-5 h-5 text-blue-600 dark:text-cyan-400" />
        Jalur Bahasa
      </h3>
      <div className="flex flex-col gap-3">
        {languageData.map((lang) => (
          <button
            key={lang.id}
            onClick={() => handleLanguageSelect(lang.id)}
            className={`flex items-center gap-4 p-4 rounded-lg transition text-left w-full ring-1 ring-black/5 dark:ring-white/10
            ${selectedLanguage === lang.id
              ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20'
              : 'bg-gray-50/80 dark:bg-slate-800/70 text-gray-700 dark:text-slate-200 hover:bg-blue-50/80 hover:text-blue-700 dark:hover:bg-slate-800'}
            `}
          >
            <span className="text-2xl">{lang.icon}</span>
            <span className="font-semibold">{lang.name}</span>
          </button>
        ))}
        {selectedLanguage && (
          <button
            onClick={() => setSelectedLanguage(null)}
            className="flex items-center justify-center gap-2 mt-2 py-2 text-sm text-gray-600 dark:text-slate-300 hover:text-red-600 dark:hover:text-red-400 transition"
          >
            <X className="w-4 h-4" />
            Reset Filter
          </button>
        )}
      </div>
    </div>
  );

  const Toolbar = () => (
    <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
      <div className="relative flex-1 min-w-[220px]">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Cari materi (judul/deskripsi)"
          className="w-full rounded-xl border border-gray-200 dark:border-slate-700 bg-white/70 dark:bg-slate-900/60 pl-10 pr-4 py-2.5 text-sm text-gray-800 dark:text-white outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/15"
        />
      </div>
      <div className="flex items-center gap-2">
        <div className="inline-flex items-center gap-2 rounded-xl border border-gray-200 dark:border-slate-700 bg-white/70 dark:bg-slate-900/60 px-3 py-2">
          <Filter className="h-4 w-4 text-gray-400" />
          <select
            value={sortKey}
            onChange={(e) => setSortKey(e.target.value as SortKey)}
            className="bg-transparent text-sm text-gray-800 dark:text-white outline-none"
          >
            <option value="order">Urutan Modul</option>
            <option value="title">Judul A-Z</option>
            <option value="level">Level</option>
          </select>
        </div>
        <button
          onClick={toggleTheme}
          className="inline-flex items-center gap-2 rounded-xl border border-gray-200 dark:border-slate-700 bg-white/70 dark:bg-slate-900/60 px-3 py-2 text-sm text-gray-700 dark:text-slate-200 hover:bg-gray-50 dark:hover:bg-slate-800"
          title={dark ? 'Switch to Light' : 'Switch to Dark'}
        >
          {dark ? <SunMedium className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          <span className="hidden sm:inline">{dark ? 'Light' : 'Dark'}</span>
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-950 dark:via-slate-950 dark:to-slate-900">
      {/* Navbar */}
      <nav className="sticky top-0 z-40 bg-white/80 dark:bg-slate-900/70 backdrop-blur ring-1 ring-black/5 dark:ring-white/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl">
                <img src="/icon.png" alt="coreline logo" />
              </div>
              <div>
                <h1 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">Coreline</h1>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-slate-300">Hai, {user?.name}!</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {user?.user_type === 'student' && (
                <button
                  onClick={() => setIsSidebarOpen(true)}
                  className="p-2 lg:hidden text-gray-700 dark:text-slate-200 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-lg transition"
                  title="Filter Bahasa"
                >
                  <Menu className="w-6 h-6" />
                </button>
              )}

              <button
                onClick={() => setShowProfile(true)}
                className="flex items-center gap-2 px-3 py-2 text-gray-800 dark:text-slate-200 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-lg transition"
                title="Profil"
              >
                <UserIcon className="w-5 h-5" />
                <span className="hidden md:inline">Profil</span>
              </button>
              <button
                onClick={logout}
                className="flex items-center gap-2 px-3 py-2 bg-red-500 text-white hover:bg-red-600 rounded-lg transition font-semibold"
                title="Keluar"
              >
                <LogOut className="w-5 h-5" />
                <span className="hidden md:inline">Keluar</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Sidebar Drawer */}
      {isSidebarOpen && user?.user_type === 'student' && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setIsSidebarOpen(false)} />
          <div
            ref={drawerRef}
            className="absolute left-0 top-0 h-full w-4/5 max-w-sm bg-white dark:bg-slate-900 shadow-2xl p-6 transform transition-transform duration-300 ease-in-out"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-800 dark:text-white">Filter Bahasa</h2>
              <button onClick={() => setIsSidebarOpen(false)} className="p-1 text-gray-600 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-lg" aria-label="Tutup Sidebar">
                <X className="w-6 h-6" />
              </button>
            </div>
            <LanguageSidebar />
          </div>
        </div>
      )}

      {/* Main */}
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <div className="mb-6 sm:mb-8 rounded-2xl bg-white/80 dark:bg-slate-900/70 ring-1 ring-black/5 dark:ring-white/10 p-6 sm:p-8 shadow">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-blue-800 dark:text-cyan-300 mb-2">{userTitle}</h2>
          <p className="text-gray-600 dark:text-slate-300 text-sm sm:text-base">Akses materi dan lanjutkan perjalanan coding Anda hari ini!</p>
          <div className="mt-5"><Toolbar /></div>
        </div>

        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          {/* Sidebar Desktop */}
          <div className="hidden lg:col-span-3 lg:block">
            <LanguageSidebar />
          </div>

          {/* Content */}
          <div className={`${user?.user_type === 'student' ? 'lg:col-span-9' : 'lg:col-span-12'}`}>
            <div className="flex items-center gap-3 mb-4 sm:mb-6">
              <BookOpen className="w-6 h-6 text-blue-600 dark:text-cyan-400" />
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">Materi Tersedia</h3>
              {selectedLanguage && (
                <span className="text-xs sm:text-sm font-semibold px-3 py-1 bg-blue-100 text-blue-700 dark:bg-cyan-900/40 dark:text-cyan-200 rounded-full">
                  Filter: {selectedLanguage.toUpperCase()}
                </span>
              )}
            </div>

            {loading ? (
              <div className="text-center py-16 sm:py-20 rounded-xl bg-white/70 dark:bg-slate-900/60 ring-1 ring-black/5 dark:ring-white/10">
                <Loader2 className="inline-block animate-spin h-10 w-10 text-blue-600 dark:text-cyan-400" />
                <p className="mt-4 text-gray-600 dark:text-slate-300 text-base sm:text-lg font-medium">Memuat materi pembelajaran...</p>
              </div>
            ) : materials.length === 0 ? (
              <div className="rounded-xl bg-white/70 dark:bg-slate-900/60 p-10 sm:p-12 text-center ring-2 ring-dashed ring-gray-200 dark:ring-slate-700">
                <BookOpen className="w-14 h-14 sm:w-16 sm:h-16 text-gray-400 dark:text-slate-500 mx-auto mb-4" />
                <p className="text-base sm:text-lg text-gray-700 dark:text-slate-300 font-medium">
                  {user?.user_type === 'student' && !selectedLanguage
                    ? 'Pilih bahasa pemrograman dari filter untuk memulai'
                    : 'Belum ada materi yang sesuai dengan profil Anda atau filter yang dipilih.'}
                </p>
              </div>
            ) : (
              <div className="grid gap-4 sm:gap-6">
                {materials.map((m) => (
                  <article
                    key={m.id}
                    className="cursor-pointer rounded-2xl bg-white/80 dark:bg-slate-900/70 p-5 sm:p-6 shadow-md ring-1 ring-black/5 dark:ring-white/10 transition hover:shadow-lg hover:ring-blue-500/30 dark:hover:ring-cyan-400/30"
                    onClick={() => setSelectedMaterial(m)}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="mb-2 flex items-center gap-3">
                          <Award className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600 dark:text-cyan-400" />
                          <h4 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white leading-snug">
                            {m.order}. {m.title}
                          </h4>
                        </div>
                        <p className="ml-8 text-gray-600 dark:text-slate-300 mb-3">{m.description}</p>
                        <div className="ml-8 flex flex-wrap items-center gap-3">
                          <span className={`text-[11px] sm:text-xs px-3 py-1 rounded-full font-semibold border ${levelPill(m.level as Level)}`}>
                            {levelLabel[m.level as Level]}
                          </span>
                          {m.language && (
                            <span className="text-[11px] sm:text-xs px-3 py-1 rounded-full font-semibold bg-gray-100 text-gray-700 dark:bg-slate-800 dark:text-slate-200 border border-gray-300 dark:border-slate-700">
                              {m.language.toUpperCase()}
                            </span>
                          )}
                        </div>
                      </div>
                      <ChevronRight className="mt-1 h-6 w-6 text-blue-500 dark:text-cyan-300 flex-shrink-0" />
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Material Modal */}
      {selectedMaterial && (
        <div className="fixed inset-0 bg-black/60 dark:bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl max-w-4xl w-full my-8 max-h-[90vh] flex flex-col ring-1 ring-black/5 dark:ring-white/10">
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-slate-800 sticky top-0 bg-white dark:bg-slate-900 z-10">
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">{selectedMaterial.title}</h3>
                <div className="mt-2 flex flex-wrap items-center gap-3">
                  <span className={`text-xs sm:text-sm px-3 py-1 rounded-full font-semibold border ${levelPill(selectedMaterial.level as Level)}`}>
                    {levelLabel[selectedMaterial.level as Level]}
                  </span>
                  {selectedMaterial.language && (
                    <span className="text-xs sm:text-sm px-3 py-1 rounded-full font-semibold bg-blue-100 text-blue-700 dark:bg-cyan-900/40 dark:text-cyan-200">
                      {selectedMaterial.language.toUpperCase()}
                    </span>
                  )}
                </div>
              </div>
              <button
                onClick={() => setSelectedMaterial(null)}
                className="p-2 text-gray-600 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-full transition"
                aria-label="Tutup Materi"
              >
                <X className="w-7 h-7" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 sm:p-8">
              <MaterialContent content={selectedMaterial.content} />
            </div>

            <div className="p-6 border-t border-gray-200 dark:border-slate-800 bg-gray-50/60 dark:bg-slate-900/60 flex justify-end">
              <button
                onClick={() => setSelectedMaterial(null)}
                className="px-6 sm:px-8 py-2.5 sm:py-3 bg-blue-600 dark:bg-cyan-600 text-white rounded-xl font-semibold hover:bg-blue-700 dark:hover:bg-cyan-500 transition shadow-lg shadow-blue-600/20 dark:shadow-cyan-600/20"
              >
                Selesai / Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
