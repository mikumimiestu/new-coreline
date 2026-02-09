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
  Layout, Smartphone, Database, Globe, Terminal, Layers, Cpu, Sparkles
} from 'lucide-react';

/* ================================
 * Config & Types
 * ================================ */
const API_BASE = 'https://authx.astbyte.com';

type Category = 'all' | 'web-dev' | 'mobile' | 'backend' | 'data-science' | 'devops';

type Lang = {
  id: string;
  category: Category[]; // Array agar satu bahasa bisa masuk beberapa kategori
  name: string | JSX.Element;
  iconUrl?: string;
  icon?: any; // Fallback icon jika tidak ada URL
  comingSoon?: boolean;
  gradient: string;
  description: string;
  badge?: string; // e.g. "Popular", "New"
};

// DATA UTAMA: Digabungkan dengan Konsep "Path/Combinasi"
const languageData: readonly Lang[] = [
  // --- WEB DEVELOPMENT ---
  { 
    id: 'javascript', 
    category: ['web-dev', 'backend'],
    name: 'JavaScript', 
    iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
    comingSoon: true,
    gradient: 'from-yellow-400 via-orange-500 to-red-500',
    description: 'Modern Web Development',
    badge: 'Essential'
  },
  { 
    id: 'typescript', 
    category: ['web-dev', 'backend'],
    name: 'TypeScript', 
    iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg',
    gradient: 'from-blue-600 via-cyan-500 to-blue-700',
    description: 'Scalable Enterprise Apps',
    badge: 'Pro Choice'
  },
  { 
    id: 'ruby', 
    category: ['web-dev', 'backend'],
    name: 'Ruby on Rails', 
    iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/ruby/ruby-original.svg',
    gradient: 'from-red-600 to-rose-700',
    description: 'Rapid Web Application Dev'
  },
  { 
    id: 'php', 
    category: ['web-dev', 'backend'],
    name: 'PHP & Laravel', 
    iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg',
    comingSoon: true,
    gradient: 'from-indigo-500 via-purple-600 to-indigo-800',
    description: 'Server-side Powerhouse'
  },

  // --- DATA SCIENCE & AI ---
  { 
    id: 'python', 
    category: ['data-science', 'backend'],
    name: 'Python', 
    iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
    gradient: 'from-blue-500 via-indigo-500 to-purple-600',
    description: 'AI, Data Science & Backend',
    badge: 'Best Seller'
  },

  // --- SYSTEM & BACKEND ---
  { 
    id: 'go', 
    category: ['backend', 'devops'],
    name: 'Go (Golang)', 
    iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original.svg',
    gradient: 'from-cyan-500 via-teal-500 to-emerald-600',
    description: 'High Performance Systems'
  },
  
  // --- DATABASE ---
  { 
    id: 'sql', 
    category: ['backend', 'data-science'],
    name: 'MySQL', 
    iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg',
    gradient: 'from-orange-500 via-amber-600 to-yellow-600',
    description: 'Relational Database Mgmt'
  },
  { 
    id: 'postgresql', 
    category: ['backend', 'data-science'],
    name: 'PostgreSQL', 
    iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg',
    comingSoon: true,
    gradient: 'from-blue-700 via-indigo-800 to-slate-800',
    description: 'Advanced SQL Systems'
  },

  // --- MOBILE ---
  { 
    id: 'dart', 
    category: ['mobile'],
    name: (<div className="flex items-center gap-1.5">Dart</div>), 
    iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dart/dart-original.svg',
    gradient: 'from-teal-400 via-cyan-500 to-blue-500',
    description: 'Flutter Mobile Apps',
    comingSoon: false // Asumsi lu punya datanya atau mau ditampilkan
  },

  // --- KOMBINASI / PATH BARU (Placeholder Feature) ---
  {
    id: 'fullstack-path',
    category: ['web-dev'],
    name: 'Fullstack Master',
    icon: Globe,
    gradient: 'from-emerald-500 to-teal-700',
    description: 'Zero to Hero Web Developer',
    comingSoon: true,
    badge: 'Path'
  },
  {
    id: 'mobile-master',
    category: ['mobile'],
    name: 'Mobile Architect',
    icon: Smartphone,
    gradient: 'from-violet-600 to-fuchsia-600',
    description: 'iOS & Android Ecosystem',
    comingSoon: true,
    badge: 'Path'
  }
] as const;

type Level = 'beginner' | 'intermediate' | 'advanced';
type Plan = 'free' | 'pro' | 'plus' | 'ultra';

/* ================================
 * Main Component
 * ================================ */
export default function Dashboard() {
  const { user, logout, loading: authLoading } = useAuth();
  const navigate = useNavigate();

  // State
  const [materials, setMaterials] = useState<LearningMaterial[]>([]);
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<Category>('all'); // State untuk Tab Kategori
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
    document.title = 'Dashboard | Coreline by AstByte';
  }, []);

  // 1. Logic Fetch Progress (TETAP ADA)
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

  // 2. Logic Update Progress / Sync (TETAP ADA)
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

  // 3. Logic Certificate (TETAP ADA)
  const generateCertificate = async (langId: string) => {
  if (!user || !isPremium) return;
  setGeneratingCert(true);

  try {
    const { default: jsPDF } = await import('jspdf');
    const doc = new jsPDF({ orientation: 'landscape', unit: 'mm', format: 'a4' });

    const w = doc.internal.pageSize.getWidth();
    const h = doc.internal.pageSize.getHeight();

    /* ================= MATTE DARK BACKGROUND ================= */
    doc.setFillColor(14, 18, 32); // deep navy
    doc.rect(0, 0, w, h, 'F');

    /* ================= SUBTLE RADIAL GLOW ================= */
    doc.setFillColor(22, 28, 55);
    doc.circle(w / 2, h / 2, 95, 'F');

    doc.setFillColor(14, 18, 32);
    doc.circle(w / 2, h / 2, 88, 'F');

    /* ================= ASTRAL ORBIT LINES ================= */
    doc.setDrawColor(180, 190, 210); // platinum
    doc.setLineWidth(0.4);
    doc.circle(w / 2, h / 2, 84);
    doc.circle(w / 2, h / 2, 78);

    /* ================= MICRO STARS ================= */
    doc.setFillColor(200, 205, 220);
    for (let i = 0; i < 14; i++) {
      doc.circle(
        Math.random() * (w - 60) + 30,
        Math.random() * (h - 60) + 30,
        0.35,
        'F'
      );
    }

    /* ================= BORDER ================= */
    doc.setDrawColor(180, 190, 210);
    doc.setLineWidth(1);
    doc.roundedRect(18, 18, w - 36, h - 36, 12, 12);

    /* ================= HEADER ================= */
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(26);
    doc.setTextColor(235, 238, 245);
    doc.text('CERTIFICATE OF COMPLETION', w / 2, 46, {
      align: 'center'
    });

    /* ================= BRAND ================= */
    doc.setFontSize(13);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(170, 175, 190);
    doc.text('Issued by PT. Astral Byte Technology', w / 2, 62, {
      align: 'center'
    });

    /* ================= NAME ================= */
    doc.setFontSize(38);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(255, 255, 255);
    doc.text(user.full_name || 'Participant Name', w / 2, h / 2 - 6, {
      align: 'center'
    });

    doc.setDrawColor(180, 190, 210);
    doc.setLineWidth(0.6);
    doc.line(w / 2 - 62, h / 2 + 2, w / 2 + 62, h / 2 + 2);

    /* ================= PROGRAM ================= */
    doc.setFontSize(17);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(190, 195, 210);
    doc.text('has successfully completed the', w / 2, h / 2 + 26, {
      align: 'center'
    });

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(19);
    doc.setTextColor(220, 225, 235);
    doc.text(`${langId.toUpperCase()} Certification Program`, w / 2, h / 2 + 42, {
      align: 'center'
    });

    /* ================= DATE ================= */
    const date = new Date().toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });

    doc.setFontSize(13);
    doc.setFont('helvetica', 'italic');
    doc.setTextColor(160, 165, 185);
    doc.text(`Issued on ${date}`, w / 2, h / 2 + 62, {
      align: 'center'
    });

    /* ================= SIGNATURE ================= */
    doc.setDrawColor(180, 190, 210);
    doc.line(w - 100, h - 52, w - 40, h - 52);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(13);
    doc.setTextColor(235, 238, 245);
    doc.text('Zaki Mushthafa Billah', w - 70, h - 44, {
      align: 'center'
    });

    doc.setFontSize(11);
    doc.setFont('helvetica', 'normal');
    doc.text('Founder & CEO — ASTBYTE', w - 70, h - 36, {
      align: 'center'
    });

    /* ================= FOOTER ================= */
    doc.setFontSize(10);
    doc.setTextColor(140, 145, 165);
    doc.text('ASTBYTE • Luxury Astral Digital Certificate', 24, h - 22);

    doc.save(
      `Luxury_Astral_Certificate_${langId}_${(user.full_name || 'Participant')
        .replace(/\s+/g, '_')}.pdf`
    );
  } catch (err) {
    console.error(err);
    alert('Gagal generate sertifikat');
  } finally {
    setGeneratingCert(false);
  }
};

  // 4. Logic Fetch Materials (TETAP ADA)
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

  // Logic Filtering untuk Tampilan Grid
  const filteredLanguages = useMemo(() => {
    return languageData.filter(lang => {
      // Filter by Search
      const matchSearch = lang.name.toString().toLowerCase().includes(searchText.toLowerCase()) || 
                          lang.description.toLowerCase().includes(searchText.toLowerCase());
      
      // Filter by Tab
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
    <div className="min-h-screen bg-[#0F172A] flex flex-col items-center justify-center gap-4">
      <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );

  if (!user) return (
    <div className="min-h-screen bg-[#0F172A] flex items-center justify-center p-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-white mb-4">Sesi Berakhir</h1>
        <Link to="/login" className="text-blue-500 hover:underline">Masuk Kembali</Link>
      </div>
    </div>
  );

  if (showProfile) return <ProfilePage onBack={() => setShowProfile(false)} />;

  return (
    <div className="min-h-screen bg-[#0F172A] text-slate-200 font-sans selection:bg-blue-500/30">
      
      {/* Background Decor */}
      <div className="fixed top-0 left-0 w-full h-96 bg-gradient-to-b from-blue-900/20 to-transparent -z-10 pointer-events-none" />

      {/* NAVBAR: Dark & Glassy */}
      <nav className="sticky top-0 z-50 border-b border-slate-800 bg-[#0F172A]/80 backdrop-blur-xl">
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-600/20 group-hover:rotate-6 transition-transform">
                <Zap className="text-white w-5 h-5 fill-current" />
              </div>
              <div className="leading-tight">
                <h1 className="text-xl font-black text-white tracking-tight">Coreline</h1>
                <p className="text-[10px] text-slate-400 font-bold tracking-widest uppercase">By AstByte</p>
              </div>
            </Link>
          </div>

          <div className="flex items-center gap-4">
            {isSyncing && (
              <div className="hidden md:flex items-center gap-2 text-xs font-bold text-blue-400 bg-blue-500/10 px-3 py-1.5 rounded-full border border-blue-500/20">
                <RefreshCw className="w-3 h-3 animate-spin" /> Syncing...
              </div>
            )}

            <div className="hidden md:block text-right">
              <div className="text-sm font-bold text-white">{user.full_name}</div>
              <div className={`text-[10px] font-black uppercase tracking-wider inline-block px-2 py-0.5 rounded ${
                plan === 'ultra' ? 'bg-violet-500/20 text-violet-400' :
                plan === 'plus' ? 'bg-purple-500/20 text-purple-400' :
                plan === 'pro' ? 'bg-amber-500/20 text-amber-400' :
                'bg-slate-700 text-slate-400'
              }`}>
                {plan} Plan
              </div>
            </div>

            <button onClick={() => setShowProfile(true)} className="p-2.5 bg-slate-800 hover:bg-slate-700 rounded-xl transition-all text-slate-300 hover:text-white">
              <UserIcon className="w-5 h-5" />
            </button>
            <button onClick={logout} className="p-2.5 bg-red-500/10 hover:bg-red-500/20 rounded-xl transition-all text-red-400 group">
              <LogOut className="w-5 h-5 group-hover:scale-110 transition-transform" />
            </button>
          </div>
        </div>
      </nav>

      {/* MAIN CONTENT */}
      <main className="container mx-auto px-6 py-10">

        {/* =======================================================
            UPGRADE BANNER SECTION (DYNAMIC)
           ======================================================= */}
        {plan !== 'ultra' && (
          <div className="mb-8 animate-fade-in-up">
            <div className={`relative overflow-hidden rounded-3xl border p-8 shadow-2xl transition-all hover:scale-[1.01] ${
              plan === 'free' 
                ? 'bg-gradient-to-r from-amber-900/40 via-orange-900/30 to-[#0F172A] border-amber-500/30' 
                : plan === 'pro'
                ? 'bg-gradient-to-r from-blue-900/40 via-indigo-900/30 to-[#0F172A] border-blue-500/30'
                : 'bg-gradient-to-r from-violet-900/40 via-fuchsia-900/30 to-[#0F172A] border-violet-500/30'
            }`}>
              
              {/* Background Glows */}
              <div className={`absolute -top-24 -right-24 w-80 h-80 rounded-full blur-[80px] opacity-40 ${
                plan === 'free' ? 'bg-amber-500' : 
                plan === 'pro' ? 'bg-blue-500' : 
                'bg-violet-500'
              }`}></div>

              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${
                      plan === 'free' 
                        ? 'bg-amber-500/20 text-amber-400 border-amber-500/40' 
                        : plan === 'pro'
                        ? 'bg-blue-500/20 text-blue-400 border-blue-500/40'
                        : 'bg-violet-500/20 text-violet-400 border-violet-500/40'
                    }`}>
                      {plan === 'free' ? 'Unlock Potential' : plan === 'pro' ? 'Go Ultimate' : 'Go Beyond'}
                    </div>
                    {plan === 'free' && <div className="text-amber-200 text-xs font-medium animate-pulse">🔥 Limited Offer</div>}
                  </div>
                  
                  <h2 className="text-3xl font-black text-white mb-2 leading-tight">
                    {plan === 'free' ? 'Upgrade to PRO Membership' : 
                     plan === 'pro' ? 'Level Up to PLUS Access' : 
                     'Become an ULTRA Member'}
                  </h2>
                  
                  <p className="text-slate-300 max-w-2xl text-sm md:text-base leading-relaxed">
                    {plan === 'free' 
                      ? 'Buka akses ke semua materi premium, dapatkan sertifikat kelulusan eksklusif, dan mulai bangun portofolio coding profesional Anda sekarang.' 
                      : plan === 'pro'
                      ? 'Dapatkan fitur download materi offline, akses mentoring chat prioritas, dan source code project.'
                      : 'Nikmati mentoring eksklusif via Video Call, Code Review personal, dan konsultasi karir langsung dengan expert.'
                    }
                  </p>
                </div>

                <Link 
                  to="/pricing" 
                  className={`group relative px-8 py-4 rounded-xl font-bold text-white shadow-xl transition-all transform hover:-translate-y-1 ${
                    plan === 'free'
                      ? 'bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 shadow-amber-500/20'
                      : plan === 'pro'
                      ? 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 shadow-blue-500/20'
                      : 'bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 shadow-violet-500/20'
                  }`}
                >
                  <span className="flex items-center gap-3 text-sm uppercase tracking-wider">
                    {plan === 'free' ? <Crown className="w-5 h-5 fill-current" /> : 
                     plan === 'pro' ? <Sparkles className="w-5 h-5 fill-current" /> :
                     <Rocket className="w-5 h-5 fill-current" />}
                    
                    {plan === 'free' ? 'Get PRO Access' : 
                     plan === 'pro' ? 'Get PLUS Access' : 
                     'Get ULTRA Access'}
                  </span>
                </Link>
              </div>
            </div>
          </div>
        )}

        
        {/* HERO SECTION */}
        <div className="mb-12">
          {!selectedLanguage && (
            <div className="mb-10 animate-fade-in-up">
              <h1 className="text-4xl md:text-6xl font-black text-white mb-4 leading-tight">
                Master the Future <br />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-500">
                  of Technology.
                </span>
              </h1>
              <p className="text-slate-400 text-lg max-w-xl mb-8">
                Pilih jalur karirmu. Dari Web Development, AI, hingga Mobile Apps. Pelajari skill yang dibutuhkan industri saat ini.
              </p>

              {/* TABS CATEGORY (Fitur Baru) */}
              <div className="flex flex-wrap gap-2">
                {[
                  { id: 'all', label: 'All Paths', icon: Layout },
                  { id: 'web-dev', label: 'Web Dev', icon: Globe },
                  { id: 'data-science', label: 'AI & Data', icon: Brain },
                  { id: 'backend', label: 'Backend', icon: Terminal },
                  { id: 'mobile', label: 'Mobile', icon: Smartphone },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as Category)}
                    className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold transition-all ${
                      activeTab === tab.id
                        ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/25 ring-2 ring-blue-400/50'
                        : 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white'
                    }`}
                  >
                    <tab.icon className="w-4 h-4" />
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* SEARCH BAR (Visible if filtering or inside module) */}
          <div className="relative max-w-xl mb-10">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
            <input
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              placeholder={selectedLanguage ? "Cari modul pelajaran..." : "Cari bahasa atau teknologi..."}
              className="w-full bg-slate-900/50 border border-slate-700 rounded-2xl py-4 pl-12 pr-4 text-white placeholder:text-slate-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
            />
          </div>

          {/* GRID TAMPILAN UTAMA (Language/Path Cards) */}
          {!selectedLanguage ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {languageStats.map((lang, idx) => {
                const showProgress = isPremium && lang.total > 0;
                
                return (
                  <button
                    key={lang.id}
                    disabled={!!lang.comingSoon}
                    onClick={() => !lang.comingSoon && setSelectedLanguage(lang.id)}
                    className={`group relative overflow-hidden rounded-[2rem] p-1 text-left transition-all duration-300 hover:-translate-y-2 ${
                      lang.comingSoon ? 'opacity-60 grayscale cursor-not-allowed' : 'cursor-pointer'
                    }`}
                  >
                    {/* Card Border Gradient & Body */}
                    <div className="absolute inset-0 bg-gradient-to-br from-slate-700 to-slate-800 rounded-[2rem]"></div>
                    <div className="relative h-full bg-[#0F172A] hover:bg-slate-900 rounded-[1.9rem] p-6 border border-slate-800 group-hover:border-slate-600 transition-colors flex flex-col">
                      
                      {/* Badge if exists */}
                      {lang.badge && !lang.comingSoon && (
                        <div className="absolute top-4 right-4 bg-blue-500/10 text-blue-400 text-[10px] font-black px-2 py-1 rounded uppercase tracking-wider border border-blue-500/20">
                          {lang.badge}
                        </div>
                      )}
                      
                      {/* Icon */}
                      <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${lang.gradient} flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 transition-transform duration-500`}>
                        {lang.iconUrl ? (
                          <img src={lang.iconUrl} alt={typeof lang.name === 'string' ? lang.name : 'Lang'} className="w-8 h-8 object-contain" />
                        ) : (
                          <lang.icon className="w-8 h-8 text-white" />
                        )}
                      </div>

                      {/* Content */}
                      <div className="mb-4 flex-1">
                        <h3 className="text-xl font-black text-white mb-1 group-hover:text-blue-400 transition-colors">
                          {lang.name}
                        </h3>
                        <p className="text-sm text-slate-500 font-medium leading-relaxed">
                          {lang.description}
                        </p>
                      </div>

                      {/* Footer / Progress */}
                      {lang.comingSoon ? (
                        <div className="mt-auto pt-4 border-t border-slate-800">
                          <span className="flex items-center gap-2 text-xs font-bold text-amber-500 bg-amber-500/10 px-3 py-1.5 rounded-lg w-fit">
                            <Clock className="w-3 h-3" /> Coming Soon
                          </span>
                        </div>
                      ) : showProgress ? (
                        <div className="mt-auto">
                          <div className="flex justify-between text-xs font-bold text-slate-400 mb-2">
                            <span>{lang.completed}/{lang.total} Module</span>
                            <span className={lang.isComplete ? 'text-green-400' : 'text-blue-400'}>{lang.progress}%</span>
                          </div>
                          <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                            <div 
                              className={`h-full rounded-full transition-all duration-500 bg-gradient-to-r ${lang.gradient}`}
                              style={{ width: `${lang.progress}%` }}
                            ></div>
                          </div>
                          {lang.isComplete && (
                            <button
                              onClick={(e) => { e.stopPropagation(); generateCertificate(lang.id); }}
                              disabled={generatingCert}
                              className="mt-4 w-full py-2 bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold rounded-lg border border-slate-700 flex items-center justify-center gap-2 transition-all"
                            >
                              {generatingCert ? <Loader2 className="w-3 h-3 animate-spin"/> : <Award className="w-3 h-3"/>}
                              Get Certificate
                            </button>
                          )}
                        </div>
                      ) : (
                        <div className="mt-auto flex items-center text-sm font-bold text-slate-600 group-hover:text-white transition-colors">
                          Start Path <ChevronRight className="w-4 h-4 ml-1" />
                        </div>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          ) : (
            /* MODULE LIST VIEW (Detail) */
            <div className="max-w-4xl mx-auto animate-fade-in-up">
              <button
                onClick={() => setSelectedLanguage(null)}
                className="group flex items-center gap-2 text-slate-400 hover:text-white mb-8 font-bold text-sm transition-colors"
              >
                <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center group-hover:bg-blue-600 transition-colors">
                  <ChevronRight className="w-4 h-4 rotate-180" />
                </div>
                Back to Paths
              </button>

              <div className="flex items-center gap-6 mb-10">
                <div className={`w-20 h-20 rounded-3xl bg-gradient-to-br ${languageStats.find(l => l.id === selectedLanguage)?.gradient} flex items-center justify-center shadow-2xl`}>
                  <img src={languageStats.find(l => l.id === selectedLanguage)?.iconUrl} className="w-10 h-10 object-contain" alt="Icon" />
                </div>
                <div>
                  <h2 className="text-3xl md:text-4xl font-black text-white mb-2">
                    {languageStats.find(l => l.id === selectedLanguage)?.name}
                  </h2>
                  <div className="flex items-center gap-3 text-slate-400 text-sm font-medium">
                    <span className="bg-slate-800 px-3 py-1 rounded-lg text-white">
                      {materials.length} Modules
                    </span>
                    <span>•</span>
                    <span className="text-blue-400">
                      {languageStats.find(l => l.id === selectedLanguage)?.progress}% Completed
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
                      className={`group relative bg-slate-900 border border-slate-800 hover:border-blue-500/50 rounded-2xl p-6 transition-all duration-300 ${locked ? 'opacity-60' : 'hover:bg-slate-800/50 hover:shadow-lg hover:shadow-blue-900/10'}`}
                      style={{ animationDelay: `${idx * 50}ms` }}
                    >
                      <div className="flex gap-5 items-start">
                        {/* Number / Status Icon */}
                        <div className={`flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center text-lg font-black transition-colors ${
                          isCompleted ? 'bg-green-500/20 text-green-400' :
                          locked ? 'bg-slate-800 text-slate-500' :
                          'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                        }`}>
                          {isCompleted ? <CheckCircle className="w-6 h-6" /> : locked ? <Lock className="w-5 h-5" /> : m.order}
                        </div>

                        <div className="flex-1">
                          <div className="flex justify-between items-start mb-2">
                            <h3 className={`text-lg font-bold ${locked ? 'text-slate-500' : 'text-white group-hover:text-blue-400 transition-colors'}`}>
                              {m.title}
                            </h3>
                            {/* Action Buttons (Mark Done / PDF) */}
                            {isPremium && !locked && (
                              <div className="flex gap-2">
                                <button
                                  onClick={(e) => { e.stopPropagation(); toggleModuleCompletion(m.id); }}
                                  className={`p-2 rounded-lg transition-all ${isCompleted ? 'bg-green-500/10 text-green-400' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'}`}
                                  title={isCompleted ? "Mark Undone" : "Mark Done"}
                                >
                                  <CheckCircle className="w-4 h-4" />
                                </button>
                                {plan === 'plus' && (
                                  <button className="p-2 rounded-lg bg-slate-800 text-purple-400 hover:bg-purple-500/20 transition-all">
                                    <Download className="w-4 h-4" />
                                  </button>
                                )}
                              </div>
                            )}
                          </div>
                          
                          <p className="text-slate-500 text-sm mb-4 line-clamp-2">{m.description}</p>
                          
                          <button
                            onClick={() => !locked && handleStartModule(m.id)}
                            disabled={locked}
                            className={`px-5 py-2.5 rounded-lg text-sm font-bold flex items-center gap-2 transition-all ${
                              locked ? 'bg-slate-800 text-slate-500 cursor-not-allowed' :
                              isCompleted ? 'bg-slate-800 text-white hover:bg-slate-700' :
                              'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:shadow-lg hover:shadow-blue-600/25'
                            }`}
                          >
                            {locked ? 'Locked' : isCompleted ? 'Review Material' : 'Start Learning'}
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
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fade-in-up { animation: fadeInUp 0.4s ease-out forwards; }
      `}</style>
    </div>
  );
}