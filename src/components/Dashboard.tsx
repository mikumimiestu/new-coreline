import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import type { LearningMaterial } from '../types/learning';
import { MOCK_MATERIALS as OTHER_MATERIALS } from '../data/otherData';
import { MOCK_MATERIALS as PYTHON_MATERIALS } from '../data/pythonData';
import { MOCK_MATERIALS as GO_MATERIALS } from '../data/golangData';
import { MOCK_MATERIALS as MYSQL_MATERIALS } from '../data/mysqlData';
import { MOCK_MATERIALS as TS_MATERIAL } from '../data/tsData';
import { MOCK_MATERIALS as JS_MATERIAL } from '../data/jsData';
import { MOCK_MATERIALS as PSQL_MATERIAL } from '../data/posgresData';
import { MOCK_MATERIALS as RB_MATERIAL } from '../data/rubyData';
import ProfilePage from './ProfilePage';
import {
  LogOut, BookOpen, Award, ChevronRight, X, User as UserIcon,
  Menu, Loader2, Search, Crown, Lock, Download, CheckCircle,
  FileText, RefreshCw, AlertTriangle, Target, Zap, TrendingUp,
  Clock, Star, PlayCircle, Brain, Rocket, Code, Trophy, Flame,
  Layout, Smartphone, Database, Globe, Terminal, Layers, Cpu, Sparkles,
  Moon, CloudMoon, Sun
} from 'lucide-react';

/* ================================
 * Config & Types
 * ================================ */
const API_BASE = 'https://authx.astbyte.com';

type Category = 'all' | 'web-dev' | 'mobile' | 'backend' | 'data-science' | 'devops';

type Lang = {
  id: string;
  category: Category[];
  name: string | JSX.Element;
  iconUrl?: string;
  icon?: any;
  comingSoon?: boolean;
  gradient: string;
  description: string;
  badge?: string;
};

/* ================================
 * THEMED DATA: RAMADHAN PALETTE
 * ================================ */
const languageData: readonly Lang[] = [
  // --- WEB DEVELOPMENT ---
  { 
    id: 'javascript', 
    category: ['web-dev', 'backend'],
    name: 'JavaScript', 
    iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
    gradient: 'from-amber-400 via-yellow-500 to-amber-600', // Gold (Cahaya)
    description: 'Fondasi Web Modern',
    badge: 'Wajib'
  },
  { 
    id: 'typescript', 
    category: ['web-dev', 'backend'],
    name: 'TypeScript', 
    iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg',
    gradient: 'from-emerald-500 via-teal-600 to-emerald-700', // Islamic Green
    description: 'Aplikasi Skala Besar',
    badge: 'Pilihan Pro'
  },
  { 
    id: 'ruby', 
    category: ['web-dev', 'backend'],
    name: 'Ruby on Rails', 
    iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/ruby/ruby-original.svg',
    gradient: 'from-rose-700 to-red-900', // Warna Kurma/Sunset
    description: 'Pengembangan Cepat'
  },
  { 
    id: 'php', 
    category: ['web-dev', 'backend'],
    name: 'PHP & Laravel', 
    iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg',
    gradient: 'from-indigo-600 via-violet-700 to-slate-900', // Malam Hari
    description: 'Backend Powerhouse'
  },

  // --- DATA SCIENCE & AI ---
  { 
    id: 'python', 
    category: ['data-science', 'backend'],
    name: 'Python', 
    iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
    gradient: 'from-green-600 via-emerald-600 to-teal-800', // Green Nature
    description: 'AI & Data Science',
    badge: 'Terpopuler'
  },

  // --- SYSTEM & BACKEND ---
  { 
    id: 'go', 
    category: ['backend', 'devops'],
    name: 'Go (Golang)', 
    iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original.svg',
    gradient: 'from-cyan-600 via-sky-700 to-blue-900',
    description: 'Sistem Performa Tinggi'
  },
  
  // --- DATABASE ---
  { 
    id: 'sql', 
    category: ['backend', 'data-science'],
    name: 'MySQL', 
    iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg',
    gradient: 'from-amber-500 via-orange-600 to-red-700', // Senja
    description: 'Manajemen Database'
  },
  { 
    id: 'postgresql', 
    category: ['backend', 'data-science'],
    name: 'PostgreSQL', 
    iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg',
    comingSoon: true,
    gradient: 'from-slate-600 via-slate-700 to-slate-900',
    description: 'Advanced SQL'
  },

  // --- MOBILE ---
  { 
    id: 'dart', 
    category: ['mobile'],
    name: (<div className="flex items-center gap-1.5">Dart</div>), 
    iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dart/dart-original.svg',
    gradient: 'from-teal-400 via-emerald-500 to-green-600',
    description: 'Aplikasi Flutter',
    comingSoon: false 
  },

  // --- PATHS ---
  {
    id: 'fullstack-path',
    category: ['web-dev'],
    name: 'Fullstack Berkah',
    icon: Globe,
    gradient: 'from-emerald-400 to-green-700',
    description: 'Dari Nol ke Jago Web',
    comingSoon: true,
    badge: 'Jalur'
  },
  {
    id: 'mobile-master',
    category: ['mobile'],
    name: 'Mobile Architect',
    icon: Smartphone,
    gradient: 'from-violet-700 to-purple-900',
    description: 'iOS & Android',
    comingSoon: true,
    badge: 'Jalur'
  }
] as const;

type Level = 'beginner' | 'intermediate' | 'advanced';
type Plan = 'free' | 'pro' | 'plus' | 'ultra';

/* ================================
 * Internal Helper: Decorative Lantern
 * ================================ */
const HangingLantern = ({ height = 'h-24', delay = '0s', left = 'left-10' }: { height?: string, delay?: string, left?: string }) => (
  <div className={`absolute top-0 ${left} flex flex-col items-center z-0 animate-bounce`} style={{ animationDuration: '3s', animationDelay: delay }}>
    {/* Tali */}
    <div className={`w-[1px] ${height} bg-amber-500/50`}></div>
    {/* Badan Lampion */}
    <div className="w-8 h-10 bg-gradient-to-b from-amber-600 to-amber-800 rounded-t-lg rounded-b-xl border border-amber-400/50 shadow-[0_0_15px_rgba(245,158,11,0.5)] flex items-center justify-center relative">
      {/* Detail Dalam */}
      <div className="w-4 h-6 bg-yellow-200/20 rounded-full blur-[1px]"></div>
    </div>
    {/* Rumbai */}
    <div className="flex gap-[2px] mt-[1px]">
       <div className="w-[2px] h-3 bg-red-500"></div>
       <div className="w-[2px] h-4 bg-red-500"></div>
       <div className="w-[2px] h-3 bg-red-500"></div>
    </div>
  </div>
);

/* ================================
 * Main Component
 * ================================ */
export default function Dashboard() {
  const { user, logout, loading: authLoading } = useAuth();
  const navigate = useNavigate();

  // State
  const [materials, setMaterials] = useState<LearningMaterial[]>([]);
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<Category>('all');
  const [progressMap, setProgressMap] = useState<Record<string, number>>({});
  
  // UI State
  const [isSyncing, setIsSyncing] = useState(false);
  const [isFetchingProgress, setIsFetchingProgress] = useState(true);
  const [showProfile, setShowProfile] = useState(false);
  const [loading, setLoading] = useState(true);
  const [downloadingPdf, setDownloadingPdf] = useState<string | null>(null);
  const [generatingCert, setGeneratingCert] = useState(false);
  const [searchText, setSearchText] = useState('');

  // Setup Title
  useEffect(() => {
    document.title = 'Ramadhan Lounge | NewCoreline by AstByte';
  }, []);

  // 1. Logic Fetch Progress
  useEffect(() => {
    let isMounted = true;
    const fetchProgressFromServer = async () => {
      if (!user) return;
      let token = localStorage.getItem('astbyte_token');
      if (!token && (user as any).token) token = (user as any).token;

      if (!token) return;

      try {
        setIsFetchingProgress(true);
        const response = await fetch(`${API_BASE}/api/learning/progress`, {
          method: 'GET',
          headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' }
        });

        if (response.ok) {
          const result = await response.json();
          if (isMounted) setProgressMap(result.data || {});
        }
      } catch (error) {
        console.error("Database Error:", error);
      } finally {
        if (isMounted) setIsFetchingProgress(false);
      }
    };
    fetchProgressFromServer();
    return () => { isMounted = false; };
  }, [user]);

  // User & Plan Resolvers
  const resolveUserType = (): 'student' | 'umum' | 'pro' | 'game' => {
    const raw = (user as any)?.user_type;
    return ['student', 'umum', 'pro', 'game'].includes(raw) ? raw : 'student';
  };
  const getPlanFromUser = (u: any): Plan => {
    const type = (u?.subscription_type ?? 'free').toString().toLowerCase().trim();
    if (type === 'ultra') return 'ultra';
    if (type === 'plus') return 'plus';
    if (type === 'pro') return 'pro';
    return 'free';
  };

  const userType = resolveUserType();
  const plan = getPlanFromUser(user);
  const isPremium = ['pro', 'plus', 'ultra'].includes(plan);

  // 2. Logic Update Progress / Sync
  const toggleModuleCompletion = async (materialId: string) => {
    if (!isPremium || !user) return;

    let token = localStorage.getItem('astbyte_token') || (user as any).token;
    if (!token) { alert("Sesi habis."); return; }

    const currentProgress = progressMap[materialId] || 0;
    const newProgress = currentProgress === 100 ? 0 : 100;

    setProgressMap(prev => ({ ...prev, [materialId]: newProgress }));
    setIsSyncing(true);

    try {
      await fetch(`${API_BASE}/api/learning/progress`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ material_id: materialId, progress: newProgress })
      });
    } catch (err) {
      console.error(err);
      setProgressMap(prev => ({ ...prev, [materialId]: currentProgress })); // Revert
    } finally {
      setIsSyncing(false);
    }
  };

  const getProgress = (id: string) => progressMap[id] || 0;
  
  const isModuleLocked = (moduleOrder: number) => {
    if (moduleOrder <= 2) return false;
    return plan === 'free';
  };

  const handleStartModule = (materialId: string) => {
    if (isPremium) navigate(`/materials/${encodeURIComponent(materialId)}`);
    else navigate(`/ad-loading?next=${encodeURIComponent(materialId)}`);
  };

  // 3. Logic Certificate (THEME: GOLD & EMERALD)
  const generateCertificate = async (langId: string) => {
  if (!user || !isPremium) return;
  setGeneratingCert(true);

  try {
    const { default: jsPDF } = await import('jspdf');
    const doc = new jsPDF({ orientation: 'landscape', unit: 'mm', format: 'a4' });

    const w = doc.internal.pageSize.getWidth();
    const h = doc.internal.pageSize.getHeight();

    // Background: Deep Emerald Green (Masjid color)
    doc.setFillColor(6, 78, 59); // emerald-900
    doc.rect(0, 0, w, h, 'F');

    // Decorative Circle: Gold
    doc.setFillColor(217, 119, 6); // amber-600
    doc.circle(w / 2, h / 2, 95, 'F');

    // Inner Circle: Darker Green
    doc.setFillColor(2, 44, 34); // emerald-950
    doc.circle(w / 2, h / 2, 88, 'F');

    // Ornaments lines
    doc.setDrawColor(251, 191, 36); // amber-400
    doc.setLineWidth(0.5);
    doc.circle(w / 2, h / 2, 84);
    
    // Header
    doc.setFont('times', 'bold'); // Serif font for elegance
    doc.setFontSize(30);
    doc.setTextColor(253, 230, 138); // amber-200
    doc.text('CERTIFICATE OF COMPLETION', w / 2, 46, { align: 'center' });

    doc.setFontSize(14);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(167, 243, 208); // emerald-200
    doc.text('Ramadhan Coding Bootcamp by AstByte', w / 2, 60, { align: 'center' });

    // Name
    doc.setFontSize(42);
    doc.setFont('times', 'bold');
    doc.setTextColor(255, 255, 255);
    doc.text(user.full_name || 'Peserta Ramadhan', w / 2, h / 2 - 5, { align: 'center' });

    // Divider
    doc.setDrawColor(251, 191, 36);
    doc.line(w / 2 - 70, h / 2 + 5, w / 2 + 70, h / 2 + 5);

    // Context
    doc.setFontSize(16);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(209, 250, 229);
    doc.text('Telah menyelesaikan program pembelajaran', w / 2, h / 2 + 25, { align: 'center' });

    doc.setFontSize(22);
    doc.setFont('times', 'bold');
    doc.setTextColor(252, 211, 77); // amber-300
    doc.text(`${langId.toUpperCase()}`, w / 2, h / 2 + 40, { align: 'center' });

    // Footer
    const date = new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
    doc.setFontSize(12);
    doc.setFont('helvetica', 'italic');
    doc.setTextColor(167, 243, 208);
    doc.text(`Padang, ${date}`, w / 2, h - 30, { align: 'center' });

    doc.save(`Sertifikat_Ramadhan_${langId}.pdf`);
  } catch (err) {
    console.error(err);
    alert('Gagal generate sertifikat');
  } finally {
    setGeneratingCert(false);
  }
};

  // 4. Logic Fetch Materials
  useEffect(() => {
    if (!user) return;
    setLoading(true);
    
    const allMaterials: LearningMaterial[] = [
      ...OTHER_MATERIALS, ...PYTHON_MATERIALS, ...GO_MATERIALS,
      ...MYSQL_MATERIALS, ...TS_MATERIAL, ...JS_MATERIAL,
      ...PSQL_MATERIAL, ...RB_MATERIAL
    ];
    
    let list = allMaterials.filter((m) => m.user_type === userType);
    if (selectedLanguage) list = list.filter((m) => m.language === selectedLanguage);
    
    const q = searchText.trim().toLowerCase();
    if (q) {
      list = list.filter((m) => m.title.toLowerCase().includes(q) || m.description.toLowerCase().includes(q));
    }
    
    list.sort((a, b) => a.order - b.order);
    setMaterials(list);
    
    const timer = setTimeout(() => setLoading(false), 300);
    return () => clearTimeout(timer);
  }, [user, selectedLanguage, searchText, userType]);

  // Filtering Logic
  const filteredLanguages = useMemo(() => {
    return languageData.filter(lang => {
      const matchSearch = lang.name.toString().toLowerCase().includes(searchText.toLowerCase()) || 
                          lang.description.toLowerCase().includes(searchText.toLowerCase());
      const matchTab = activeTab === 'all' || lang.category.includes(activeTab);
      return matchSearch && matchTab;
    });
  }, [searchText, activeTab]);

  const languageStats = useMemo(() => {
    const allMaterials = [
      ...OTHER_MATERIALS, ...PYTHON_MATERIALS, ...GO_MATERIALS,
      ...MYSQL_MATERIALS, ...TS_MATERIAL, ...JS_MATERIAL,
      ...PSQL_MATERIAL, ...RB_MATERIAL
    ].filter((m) => m.user_type === userType);

    return filteredLanguages.map(lang => {
      const langMaterials = allMaterials.filter(m => m.language === lang.id);
      const completed = langMaterials.filter(m => (progressMap[m.id] || 0) === 100).length;
      const total = langMaterials.length;
      const progress = total > 0 ? Math.round((completed / total) * 100) : 0;
      
      return { ...lang, total, completed, progress, isComplete: completed === total && total > 0 };
    });
  }, [filteredLanguages, progressMap, userType]);

  // --- RENDER ---

  if (authLoading) return (
    <div className="min-h-screen bg-[#022c22] flex flex-col items-center justify-center gap-4">
      <div className="w-20 h-20 border-4 border-amber-500 border-t-emerald-800 rounded-full animate-spin flex items-center justify-center">
         <Moon className="w-8 h-8 text-amber-400 animate-pulse" />
      </div>
    </div>
  );

  if (!user) return (
    <div className="min-h-screen bg-[#022c22] flex items-center justify-center p-6 bg-[url('https://www.transparenttextures.com/patterns/arabesque.png')]">
      <div className="text-center p-8 bg-[#064e3b]/80 backdrop-blur-md rounded-3xl border border-amber-500/30">
        <h1 className="text-3xl font-serif font-bold text-amber-100 mb-4">Sesi Imsak (Berakhir)</h1>
        <p className="text-emerald-200 mb-6">Silakan login kembali untuk melanjutkan ibadah koding.</p>
        <Link to="/login" className="px-6 py-2 bg-amber-500 text-amber-950 font-bold rounded-xl hover:bg-amber-400 transition-colors">Masuk Kembali</Link>
      </div>
    </div>
  );

  if (showProfile) return <ProfilePage onBack={() => setShowProfile(false)} />;

  return (
    // ROOT BG: Dark Emerald + Islamic Pattern Overlay
    <div className="min-h-screen bg-[#022c22] text-slate-100 font-sans relative overflow-x-hidden">
      
      {/* --- DECORATIVE BACKGROUNDS --- */}
      {/* Pattern Overlay (Subtle) */}
      <div className="fixed inset-0 opacity-10 pointer-events-none z-0" 
           style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23d97706' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }}>
      </div>
      
      {/* Gradient Glows */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-gradient-to-b from-[#065f46]/40 to-transparent -z-10" />
      
      {/* HANGING LANTERNS (DECORATION) */}
      <HangingLantern left="left-[10%]" height="h-32" delay="0s" />
      <HangingLantern left="left-[85%]" height="h-24" delay="1s" />
      <HangingLantern left="left-[15%]" height="h-16" delay="2s" />
      <HangingLantern left="left-[90%]" height="h-40" delay="0.5s" />

      {/* NAVBAR */}
      <nav className="sticky top-0 z-50 border-b border-amber-500/20 bg-[#022c22]/80 backdrop-blur-xl supports-[backdrop-filter]:bg-[#022c22]/60">
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link to="/" className="flex items-center gap-3 group">
              {/* Logo: Moon & Star */}
              <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-yellow-600 rounded-xl flex items-center justify-center shadow-[0_0_15px_rgba(245,158,11,0.4)] group-hover:rotate-12 transition-transform">
                <Moon className="text-[#022c22] w-6 h-6 fill-current" />
              </div>
              <div className="leading-tight">
                <h1 className="text-xl font-serif font-black text-amber-50 tracking-wide">NewCoreline</h1>
                <p className="text-[10px] text-emerald-400 font-bold tracking-widest uppercase">Ramadhan Edition</p>
              </div>
            </Link>
          </div>

          <div className="flex items-center gap-4">
            {isSyncing && (
              <div className="hidden md:flex items-center gap-2 text-xs font-bold text-amber-300 bg-amber-900/30 px-3 py-1.5 rounded-full border border-amber-500/30">
                <RefreshCw className="w-3 h-3 animate-spin" /> Menyimpan...
              </div>
            )}

            <div className="hidden md:block text-right">
              <div className="text-sm font-bold text-emerald-100">{user.full_name}</div>
              <div className={`text-[10px] font-black uppercase tracking-wider inline-block px-2 py-0.5 rounded border ${
                plan === 'ultra' ? 'bg-amber-900/40 text-amber-300 border-amber-500/50' :
                plan === 'plus' ? 'bg-emerald-900/40 text-emerald-300 border-emerald-500/50' :
                'bg-slate-800 text-slate-400 border-slate-700'
              }`}>
                {plan} Jamaah
              </div>
            </div>

            <button onClick={() => setShowProfile(true)} className="p-2.5 bg-[#064e3b] hover:bg-[#065f46] border border-emerald-700 rounded-xl transition-all text-emerald-100">
              <UserIcon className="w-5 h-5" />
            </button>
            <button onClick={logout} className="p-2.5 bg-red-900/20 hover:bg-red-900/40 border border-red-900/30 rounded-xl transition-all text-red-400">
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </nav>

      {/* MAIN CONTENT */}
      <main className="container mx-auto px-6 py-10 relative z-10">

        {/* UPGRADE BANNER (KETUPAT/BEDUG THEME VIBE) */}
        {plan !== 'ultra' && (
          <div className="mb-10 animate-fade-in-up">
            <div className={`relative overflow-hidden rounded-3xl border p-8 shadow-2xl transition-all hover:scale-[1.01] ${
              plan === 'free' 
                ? 'bg-gradient-to-r from-[#064e3b] via-[#047857] to-[#022c22] border-amber-500/40' 
                : 'bg-gradient-to-r from-blue-900 via-indigo-900 to-[#022c22] border-blue-500/40'
            }`}>
              {/* Islamic Star Pattern SVG Background */}
              <div className="absolute top-0 right-0 w-64 h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/arabesque.png')]"></div>
              
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border bg-amber-500/20 text-amber-300 border-amber-500/40">
                      {plan === 'free' ? 'Berkah Ramadhan' : 'Tingkatkan Ilmu'}
                    </div>
                  </div>
                  
                  <h2 className="text-3xl font-serif font-black text-white mb-2 leading-tight">
                    {plan === 'free' ? 'Upgrade Paket Bedug PRO' : 'Upgrade Paket Sahur ULTRA'}
                  </h2>
                  
                  <p className="text-emerald-100/80 max-w-2xl text-sm leading-relaxed">
                    Manfaatkan waktu luang di bulan puasa. Dapatkan akses materi premium, sertifikat eksklusif, dan mentor yang siap membantu 24/7.
                  </p>
                </div>

                <Link 
                  to="/pricing" 
                  className="group relative px-8 py-4 rounded-xl font-bold text-[#022c22] shadow-[0_0_20px_rgba(245,158,11,0.3)] transition-all transform hover:-translate-y-1 bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-300 hover:to-yellow-400"
                >
                  <span className="flex items-center gap-3 text-sm uppercase tracking-wider">
                    <Crown className="w-5 h-5 fill-current" />
                    Ambil Berkah Sekarang
                  </span>
                </Link>
              </div>
            </div>
          </div>
        )}

        
        {/* HERO HEADER */}
        <div className="mb-12 text-center md:text-left">
          {!selectedLanguage && (
            <div className="mb-10 animate-fade-in-up relative">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-900/50 border border-emerald-700/50 text-emerald-300 text-xs font-bold mb-4">
                <CloudMoon className="w-4 h-4" /> Edisi Spesial Ramadhan 1446 H
              </div>
              <h1 className="text-4xl md:text-6xl font-serif font-black text-white mb-4 leading-tight">
                Ngabuburit Produktif <br />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-500 filter drop-shadow-[0_0_10px_rgba(245,158,11,0.3)]">
                  Jago Coding Sebelum Lebaran.
                </span>
              </h1>
              <p className="text-emerald-200/70 text-lg max-w-xl mb-8">
                Pilih jalur belajarmu. Tingkatkan skill teknologi, bangun portofolio, dan raih kemenangan karir di hari yang fitri.
              </p>

              {/* TABS (PILL SHAPE WITH GOLD ACCENT) */}
              <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                {[
                  { id: 'all', label: 'Semua Jalur', icon: Layout },
                  { id: 'web-dev', label: 'Web Dev', icon: Globe },
                  { id: 'data-science', label: 'AI & Data', icon: Brain },
                  { id: 'backend', label: 'Backend', icon: Terminal },
                  { id: 'mobile', label: 'Mobile', icon: Smartphone },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as Category)}
                    className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold transition-all border ${
                      activeTab === tab.id
                        ? 'bg-gradient-to-r from-amber-600 to-amber-700 text-white border-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.3)]'
                        : 'bg-[#064e3b]/50 border-emerald-800 text-emerald-300 hover:bg-[#065f46] hover:text-white'
                    }`}
                  >
                    <tab.icon className="w-4 h-4" />
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* SEARCH BAR */}
          <div className="relative max-w-xl mb-10 mx-auto md:mx-0">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-amber-500" />
            <input
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              placeholder={selectedLanguage ? "Cari materi kuliah..." : "Cari teknologi (Contoh: Laravel, Python)..."}
              className="w-full bg-[#064e3b]/40 border border-emerald-800/50 rounded-2xl py-4 pl-12 pr-4 text-emerald-100 placeholder:text-emerald-700 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all backdrop-blur-sm"
            />
          </div>

          {/* GRID TAMPILAN (CARD DESIGN UPDATE) */}
          {!selectedLanguage ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {languageStats.map((lang, idx) => {
                const showProgress = isPremium && lang.total > 0;
                
                return (
                  <button
                    key={lang.id}
                    disabled={!!lang.comingSoon}
                    onClick={() => !lang.comingSoon && setSelectedLanguage(lang.id)}
                    className={`group relative h-full text-left transition-all duration-300 hover:-translate-y-2 ${
                      lang.comingSoon ? 'opacity-60 grayscale cursor-not-allowed' : 'cursor-pointer'
                    }`}
                  >
                    {/* Card Container with Dome-like top border radius */}
                    <div className="relative h-full bg-gradient-to-b from-[#065f46] to-[#022c22] rounded-t-[2rem] rounded-b-2xl p-[1px] shadow-lg hover:shadow-[0_0_20px_rgba(16,185,129,0.2)]">
                      {/* Inner Border Gradient */}
                      <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/20 to-transparent rounded-t-[2rem] rounded-b-2xl pointer-events-none"></div>
                      
                      {/* Card Content */}
                      <div className="relative h-full bg-[#022c22] rounded-t-[1.9rem] rounded-b-[0.9rem] p-6 flex flex-col border border-emerald-800/50 group-hover:border-amber-500/50 transition-colors">
                        
                        {/* Badge */}
                        {lang.badge && !lang.comingSoon && (
                          <div className="absolute top-4 right-4 bg-amber-500/20 text-amber-300 text-[10px] font-black px-2 py-1 rounded border border-amber-500/30 shadow-[0_0_10px_rgba(245,158,11,0.2)]">
                            {lang.badge}
                          </div>
                        )}
                        
                        {/* Icon Container (Glowing) */}
                        <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${lang.gradient} flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 transition-transform duration-500`}>
                          {lang.iconUrl ? (
                            <img src={lang.iconUrl} alt="icon" className="w-8 h-8 object-contain drop-shadow-md" />
                          ) : (
                            <lang.icon className="w-8 h-8 text-white drop-shadow-md" />
                          )}
                        </div>

                        {/* Texts */}
                        <div className="mb-4 flex-1">
                          <h3 className="text-xl font-serif font-bold text-white mb-1 group-hover:text-amber-400 transition-colors">
                            {lang.name}
                          </h3>
                          <p className="text-sm text-emerald-200/60 font-medium leading-relaxed">
                            {lang.description}
                          </p>
                        </div>

                        {/* Footer */}
                        {lang.comingSoon ? (
                          <div className="mt-auto pt-4 border-t border-emerald-900">
                            <span className="flex items-center gap-2 text-xs font-bold text-amber-500/80 bg-amber-900/10 px-3 py-1.5 rounded-lg w-fit">
                              <Clock className="w-3 h-3" /> Segera Hadir
                            </span>
                          </div>
                        ) : showProgress ? (
                          <div className="mt-auto">
                            <div className="flex justify-between text-xs font-bold text-emerald-400 mb-2">
                              <span>{lang.completed}/{lang.total} Modul</span>
                              <span className={lang.isComplete ? 'text-amber-400' : 'text-emerald-400'}>{lang.progress}%</span>
                            </div>
                            <div className="h-1.5 w-full bg-emerald-900 rounded-full overflow-hidden">
                              <div 
                                className={`h-full rounded-full transition-all duration-500 bg-gradient-to-r ${lang.gradient}`}
                                style={{ width: `${lang.progress}%` }}
                              ></div>
                            </div>
                            {lang.isComplete && (
                              <button
                                onClick={(e) => { e.stopPropagation(); generateCertificate(lang.id); }}
                                disabled={generatingCert}
                                className="mt-4 w-full py-2 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-white text-xs font-bold rounded-lg border border-amber-500/50 flex items-center justify-center gap-2 transition-all shadow-lg"
                              >
                                {generatingCert ? <Loader2 className="w-3 h-3 animate-spin"/> : <Award className="w-3 h-3"/>}
                                Unduh Sertifikat
                              </button>
                            )}
                          </div>
                        ) : (
                          <div className="mt-auto flex items-center text-sm font-bold text-emerald-500 group-hover:text-amber-400 transition-colors">
                            Mulai Tadarus Kode <ChevronRight className="w-4 h-4 ml-1" />
                          </div>
                        )}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          ) : (
            /* MODULE LIST VIEW */
            <div className="max-w-4xl mx-auto animate-fade-in-up">
              <button
                onClick={() => setSelectedLanguage(null)}
                className="group flex items-center gap-2 text-emerald-400 hover:text-amber-400 mb-8 font-bold text-sm transition-colors"
              >
                <div className="w-8 h-8 rounded-full bg-emerald-900/50 flex items-center justify-center group-hover:bg-amber-500/20 transition-colors border border-emerald-800">
                  <ChevronRight className="w-4 h-4 rotate-180" />
                </div>
                Kembali ke Halaman Utama
              </button>

              <div className="flex items-center gap-6 mb-10 p-6 bg-gradient-to-r from-[#064e3b] to-transparent rounded-3xl border border-emerald-800/50 relative overflow-hidden">
                <div className="absolute right-0 top-0 h-full w-32 bg-[url('https://www.transparenttextures.com/patterns/arabesque.png')] opacity-10"></div>
                
                <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${languageStats.find(l => l.id === selectedLanguage)?.gradient} flex items-center justify-center shadow-2xl z-10`}>
                  <img src={languageStats.find(l => l.id === selectedLanguage)?.iconUrl} className="w-10 h-10 object-contain" alt="Icon" />
                </div>
                <div className="z-10">
                  <h2 className="text-3xl md:text-4xl font-serif font-black text-white mb-2">
                    {languageStats.find(l => l.id === selectedLanguage)?.name}
                  </h2>
                  <div className="flex items-center gap-3 text-emerald-200 text-sm font-medium">
                    <span className="bg-emerald-900/50 px-3 py-1 rounded-lg border border-emerald-700">
                      {materials.length} Modul
                    </span>
                    <span>•</span>
                    <span className="text-amber-400">
                      {languageStats.find(l => l.id === selectedLanguage)?.progress}% Selesai
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                {materials.map((m, idx) => {
                  const locked = isModuleLocked(m.order);
                  const progress = isPremium ? getProgress(m.id) : 0;
                  const isCompleted = isPremium && progress === 100;
                  
                  return (
                    <div
                      key={m.id}
                      className={`group relative bg-[#022c22] border border-emerald-800/40 hover:border-amber-500/50 rounded-2xl p-6 transition-all duration-300 ${locked ? 'opacity-60' : 'hover:bg-[#064e3b]/30 hover:shadow-lg hover:shadow-amber-500/5'}`}
                      style={{ animationDelay: `${idx * 50}ms` }}
                    >
                      <div className="flex gap-5 items-start">
                        {/* Status Icon */}
                        <div className={`flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center text-lg font-black transition-colors ${
                          isCompleted ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' :
                          locked ? 'bg-slate-900 text-slate-600 border border-slate-800' :
                          'bg-gradient-to-br from-amber-500 to-yellow-600 text-[#022c22] shadow-[0_0_10px_rgba(245,158,11,0.3)]'
                        }`}>
                          {isCompleted ? <CheckCircle className="w-6 h-6" /> : locked ? <Lock className="w-5 h-5" /> : <BookOpen className="w-5 h-5" />}
                        </div>

                        <div className="flex-1">
                          <div className="flex justify-between items-start mb-2">
                            <h3 className={`text-lg font-bold font-serif ${locked ? 'text-slate-500' : 'text-emerald-50 group-hover:text-amber-400 transition-colors'}`}>
                              {m.title}
                            </h3>
                            {isPremium && !locked && (
                              <div className="flex gap-2">
                                <button
                                  onClick={(e) => { e.stopPropagation(); toggleModuleCompletion(m.id); }}
                                  className={`p-2 rounded-lg transition-all ${isCompleted ? 'bg-emerald-500/10 text-emerald-400' : 'bg-emerald-900/50 text-emerald-400 hover:bg-emerald-800 hover:text-amber-400'}`}
                                  title="Tandai Selesai"
                                >
                                  <CheckCircle className="w-4 h-4" />
                                </button>
                                {plan === 'plus' && (
                                  <button className="p-2 rounded-lg bg-emerald-900/50 text-purple-400 hover:bg-purple-900/30 transition-all">
                                    <Download className="w-4 h-4" />
                                  </button>
                                )}
                              </div>
                            )}
                          </div>
                          
                          <p className="text-emerald-200/50 text-sm mb-4 line-clamp-2">{m.description}</p>
                          
                          <button
                            onClick={() => !locked && handleStartModule(m.id)}
                            disabled={locked}
                            className={`px-5 py-2.5 rounded-lg text-sm font-bold flex items-center gap-2 transition-all ${
                              locked ? 'bg-slate-900 text-slate-600 cursor-not-allowed' :
                              isCompleted ? 'bg-emerald-900 text-emerald-200 hover:bg-emerald-800' :
                              'bg-gradient-to-r from-amber-600 to-yellow-600 text-[#022c22] hover:shadow-[0_0_15px_rgba(245,158,11,0.3)]'
                            }`}
                          >
                            {locked ? 'Terkunci' : isCompleted ? 'Ulangi Materi' : 'Mulai Belajar'}
                            {!locked && <ChevronRight className="w-4 h-4" />}
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </main>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700;900&display=swap');
        .font-serif { font-family: 'Playfair Display', serif; }
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fade-in-up { animation: fadeInUp 0.4s ease-out forwards; }
      `}</style>
    </div>
  );
}