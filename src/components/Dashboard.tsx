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
 * THEMED DATA: MODERN TECH PALETTE
 * ================================ */
const languageData: readonly Lang[] = [
  // --- WEB DEVELOPMENT ---
  { 
    id: 'javascript', 
    category: ['web-dev', 'backend'],
    name: 'JavaScript', 
    iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
    gradient: 'from-yellow-400 via-yellow-500 to-amber-500', 
    description: 'Fondasi Web Modern',
    badge: 'Wajib'
  },
  { 
    id: 'typescript', 
    category: ['web-dev', 'backend'],
    name: 'TypeScript', 
    iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg',
    gradient: 'from-blue-500 via-blue-600 to-indigo-700', 
    description: 'Aplikasi Skala Besar',
    badge: 'Pilihan Pro'
  },
  { 
    id: 'ruby', 
    category: ['web-dev', 'backend'],
    name: 'Ruby on Rails', 
    iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/ruby/ruby-original.svg',
    gradient: 'from-rose-500 to-red-700', 
    description: 'Pengembangan Cepat'
  },
  { 
    id: 'php', 
    category: ['web-dev', 'backend'],
    name: 'PHP & Laravel', 
    iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg',
    gradient: 'from-indigo-500 via-violet-600 to-purple-800', 
    description: 'Backend Powerhouse'
  },

  // --- DATA SCIENCE & AI ---
  { 
    id: 'python', 
    category: ['data-science', 'backend'],
    name: 'Python', 
    iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
    gradient: 'from-green-500 via-emerald-500 to-teal-600', 
    description: 'AI & Data Science',
    badge: 'Terpopuler'
  },

  // --- SYSTEM & BACKEND ---
  { 
    id: 'go', 
    category: ['backend', 'devops'],
    name: 'Go (Golang)', 
    iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original.svg',
    gradient: 'from-cyan-400 via-sky-500 to-blue-600',
    description: 'Sistem Performa Tinggi'
  },
  
  // --- DATABASE ---
  { 
    id: 'sql', 
    category: ['backend', 'data-science'],
    name: 'MySQL', 
    iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg',
    gradient: 'from-orange-400 via-amber-500 to-orange-600', 
    description: 'Manajemen Database'
  },
  { 
    id: 'postgresql', 
    category: ['backend', 'data-science'],
    name: 'PostgreSQL', 
    iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg',
    comingSoon: true,
    gradient: 'from-blue-400 via-indigo-500 to-slate-700',
    description: 'Advanced SQL'
  },

  // --- MOBILE ---
  { 
    id: 'dart', 
    category: ['mobile'],
    name: (<div className="flex items-center gap-1.5">Dart</div>), 
    iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dart/dart-original.svg',
    gradient: 'from-cyan-400 via-teal-500 to-emerald-500',
    description: 'Aplikasi Flutter',
    comingSoon: false 
  },

  // --- PATHS ---
  {
    id: 'fullstack-path',
    category: ['web-dev'],
    name: 'Fullstack Developer',
    icon: Globe,
    gradient: 'from-blue-400 to-cyan-600',
    description: 'Dari Nol ke Ahli Web',
    comingSoon: true,
    badge: 'Jalur'
  },
  {
    id: 'mobile-master',
    category: ['mobile'],
    name: 'Mobile Architect',
    icon: Smartphone,
    gradient: 'from-violet-500 to-purple-700',
    description: 'iOS & Android',
    comingSoon: true,
    badge: 'Jalur'
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
    document.title = 'Dashboard | Coreline by AstByte';
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

  // 3. Logic Certificate (PREMIUM LUXURY CERTIFICATE)
const generateCertificate = async (langId: string) => {
  if (!user || !isPremium) return;
  setGeneratingCert(true);

  try {
    const { default: jsPDF } = await import("jspdf");

    const doc = new jsPDF({
      orientation: "landscape",
      unit: "mm",
      format: "a4"
    });

    const w = doc.internal.pageSize.getWidth();
    const h = doc.internal.pageSize.getHeight();

    const name = user.full_name || "Developer";

    const date = new Date().toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric"
    });

    const certId = "ABT-" + Math.random().toString(36).substring(2, 10).toUpperCase();

    // =========================
    // Background
    // =========================

    doc.setFillColor(255, 255, 255);
    doc.rect(0, 0, w, h, "F");

    // =========================
    // GOLD DOUBLE FRAME
    // =========================

    doc.setDrawColor(212, 175, 55);
    doc.setLineWidth(1.6);
    doc.rect(6, 6, w - 12, h - 12);

    doc.setLineWidth(0.6);
    doc.rect(10, 10, w - 20, h - 20);

    // =========================
    // INNER THIN FRAME
    // =========================

    doc.setDrawColor(200, 200, 200);
    doc.setLineWidth(0.3);
    doc.rect(14, 14, w - 28, h - 28);

    // =========================
    // CORNER ORNAMENT
    // =========================

    const size = 20;

    doc.setDrawColor(212, 175, 55);
    doc.setLineWidth(0.8);

    // top left
    doc.line(14, 14, 14 + size, 14);
    doc.line(14, 14, 14, 14 + size);

    // top right
    doc.line(w - 14, 14, w - 14 - size, 14);
    doc.line(w - 14, 14, w - 14, 14 + size);

    // bottom left
    doc.line(14, h - 14, 14 + size, h - 14);
    doc.line(14, h - 14, 14, h - 14 - size);

    // bottom right
    doc.line(w - 14, h - 14, w - 14 - size, h - 14);
    doc.line(w - 14, h - 14, w - 14, h - 14 - size);

    // =========================
    // WATERMARK EMBLEM
    // =========================

    doc.setDrawColor(230, 230, 230);
    doc.setLineWidth(0.5);

    doc.circle(w / 2, h / 2 + 5, 40);

    doc.setFont("times", "bold");
    doc.setFontSize(40);
    doc.setTextColor(240, 240, 240);

    doc.text("AB", w / 2, h / 2 + 15, {
      align: "center"
    });

    // =========================
    // HEADER
    // =========================

    doc.setFont("times", "bold");
    doc.setFontSize(38);
    doc.setTextColor(212, 175, 55);

    doc.text("CERTIFICATE", w / 2, 50, { align: "center" });

    doc.setFontSize(22);
    doc.text("OF ACHIEVEMENT", w / 2, 62, { align: "center" });

    // divider line
    doc.setDrawColor(212, 175, 55);
    doc.setLineWidth(0.6);
    doc.line(w / 2 - 60, 68, w / 2 + 60, 68);

    // =========================
    // SUBTITLE
    // =========================

    doc.setFont("helvetica", "normal");
    doc.setFontSize(14);
    doc.setTextColor(100, 100, 100);

    doc.text(
      "This certificate is proudly presented to",
      w / 2,
      85,
      { align: "center" }
    );

    // =========================
    // NAME
    // =========================

    doc.setFont("times", "bold");
    doc.setFontSize(48);
    doc.setTextColor(30, 30, 30);

    doc.text(name, w / 2, 110, {
      align: "center"
    });

    // underline name
    doc.setDrawColor(212, 175, 55);
    doc.setLineWidth(0.7);
    doc.line(w / 2 - 70, 115, w / 2 + 70, 115);

    // =========================
    // DESCRIPTION
    // =========================

    doc.setFont("helvetica", "normal");
    doc.setFontSize(14);
    doc.setTextColor(90, 90, 90);

    doc.text(
      "for successfully completing the programming course",
      w / 2,
      130,
      { align: "center" }
    );

    // COURSE TITLE
    doc.setFont("helvetica", "bold");
    doc.setFontSize(26);
    doc.setTextColor(212, 175, 55);

    doc.text(langId.toUpperCase(), w / 2, 145, {
      align: "center"
    });

    // =========================
    // SIGNATURE AREA
    // =========================

    const signY = h - 45;

    doc.setDrawColor(120, 120, 120);
    doc.setLineWidth(0.4);

    doc.line(w / 2 - 95, signY, w / 2 - 45, signY);
    doc.line(w / 2 + 45, signY, w / 2 + 95, signY);

    doc.setFontSize(12);
    doc.setTextColor(80, 80, 80);

    doc.text("CEO & Founder", w / 2 - 70, signY + 7, { align: "center" });
    doc.text("Program Director", w / 2 + 70, signY + 7, { align: "center" });

    doc.setFont("helvetica", "bold");

    doc.text("Astral Byte", w / 2 - 70, signY + 16, { align: "center" });
    doc.text("NewCoreline", w / 2 + 70, signY + 16, { align: "center" });

    // =========================
    // FOOTER
    // =========================

    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.setTextColor(120, 120, 120);

    doc.text(`Issued: ${date}`, 20, h - 15);

    doc.text(`Certificate ID: ${certId}`, w - 20, h - 15, {
      align: "right"
    });

    // =========================
    // SAVE
    // =========================

    doc.save(`AstByte_Certificate_${langId}.pdf`);

  } catch (err) {
    console.error(err);
    alert("Gagal generate sertifikat");
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
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center gap-4">
      <div className="w-16 h-16 border-4 border-slate-200 border-t-blue-600 rounded-full animate-spin flex items-center justify-center">
         <Terminal className="w-6 h-6 text-blue-600 animate-pulse" />
      </div>
    </div>
  );

  if (!user) return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.4] bg-[linear-gradient(rgba(203,213,225,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(203,213,225,0.5)_1px,transparent_1px)] bg-[size:30px_30px]"></div>
      <div className="text-center p-8 bg-white/80 backdrop-blur-md rounded-3xl border border-slate-200 shadow-xl relative z-10 max-w-md w-full">
        <h1 className="text-3xl font-bold text-slate-900 mb-4">Sesi Berakhir</h1>
        <p className="text-slate-600 mb-6">Silakan login kembali untuk melanjutkan sesi belajar Anda.</p>
        <Link to="/login" className="px-6 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-colors inline-block w-full shadow-md">Masuk Kembali</Link>
      </div>
    </div>
  );

  if (showProfile) return <ProfilePage onBack={() => setShowProfile(false)} />;

  return (
    // ROOT BG: Slate 50 (Light Theme)
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans relative overflow-x-hidden selection:bg-blue-500/30">
      
      {/* --- DECORATIVE BACKGROUNDS --- */}
      {/* Tech Grid Pattern */}
      <div className="fixed inset-0 opacity-[0.4] pointer-events-none z-0 bg-[linear-gradient(rgba(203,213,225,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(203,213,225,0.5)_1px,transparent_1px)] bg-[size:30px_30px]"></div>
      
      {/* Gradient Glows */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-gradient-to-b from-blue-200/40 to-transparent -z-10" />
      <div className="absolute top-20 right-0 w-96 h-96 bg-cyan-300/20 rounded-full blur-3xl pointer-events-none" />

      {/* NAVBAR */}
      <nav className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/80 backdrop-blur-xl supports-[backdrop-filter]:bg-white/60 shadow-sm">
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="">
                {/* Asumsi logo putih, kita pakai background biru solid biar kontras */}
              </div>
              <div className="flex items-center gap-3 group cursor-pointer">
                <img src="/icon3.png" alt="NewCoreline Icon" className="w-full h-10 object-contain" />
            </div>
            </Link>
          </div>

          <div className="flex items-center gap-4">
            {isSyncing && (
              <div className="hidden md:flex items-center gap-2 text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1.5 rounded-full border border-blue-200 shadow-sm">
                <RefreshCw className="w-3 h-3 animate-spin" /> Menyimpan...
              </div>
            )}

            <div className="hidden md:block text-right">
              <div className="text-sm font-bold text-slate-900">{user.full_name}</div>
              <div className={`text-[10px] font-black uppercase tracking-wider inline-block px-2 py-0.5 rounded border mt-0.5 shadow-sm ${
                plan === 'ultra' ? 'bg-purple-100 text-purple-700 border-purple-200' :
                plan === 'plus' ? 'bg-indigo-100 text-indigo-700 border-indigo-200' :
                plan === 'pro'  ? 'bg-blue-100 text-blue-700 border-blue-200' :
                'bg-slate-100 text-slate-600 border-slate-200'
              }`}>
                {plan} Member
              </div>
            </div>

            <button onClick={() => setShowProfile(true)} className="p-2.5 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl transition-all text-slate-600 hover:text-blue-600 shadow-sm">
              <UserIcon className="w-5 h-5" />
            </button>
            <button onClick={logout} className="p-2.5 bg-red-50 hover:bg-red-100 border border-red-200 rounded-xl transition-all text-red-500 hover:text-red-600 shadow-sm">
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </nav>

      {/* MAIN CONTENT */}
      <main className="container mx-auto px-6 py-10 relative z-10">

        {/* UPGRADE BANNER */}
        {plan !== 'ultra' && (
          <div className="mb-10 animate-fade-in-up">
            <div className={`relative overflow-hidden rounded-3xl border p-8 shadow-lg transition-all hover:scale-[1.01] ${
              plan === 'free' 
                ? 'bg-gradient-to-r from-white via-slate-50 to-white border-slate-200' 
                : 'bg-gradient-to-r from-blue-50 via-indigo-50 to-white border-blue-200'
            }`}>
              {/* Tech Accents */}
              <div className="absolute top-0 right-0 w-64 h-full bg-gradient-to-l from-blue-500/5 to-transparent pointer-events-none"></div>
              <Cpu className="absolute -bottom-10 -right-10 w-48 h-48 text-slate-200 rotate-12" />

              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border bg-blue-100 text-blue-700 border-blue-200 shadow-sm">
                      {plan === 'free' ? 'Unlock All Features' : 'Tingkatkan Akses'}
                    </div>
                  </div>
                  
                  <h2 className="text-3xl font-extrabold text-slate-900 mb-2 leading-tight">
                    {plan === 'free' ? 'Upgrade ke Paket PRO' : 'Upgrade ke Paket ULTRA'}
                  </h2>
                  
                  <p className="text-slate-600 max-w-2xl text-sm leading-relaxed font-medium">
                    Dapatkan akses penuh ke seluruh materi premium, studi kasus industri, sertifikat eksklusif, dan dukungan mentor prioritas.
                  </p>
                </div>

                <Link 
                  to="/pricing" 
                  className="group relative px-8 py-4 rounded-xl font-bold text-white shadow-lg transition-all transform hover:-translate-y-1 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 border border-blue-400/50 flex-shrink-0"
                >
                  <span className="flex items-center gap-3 text-sm uppercase tracking-wider">
                    <Crown className="w-5 h-5 fill-current text-yellow-300" />
                    Upgrade Sekarang
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
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold mb-4 shadow-sm">
                <Sparkles className="w-4 h-4 text-blue-500" /> Mari Mulai Belajar Hari Ini
              </div>
              <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 mb-4 leading-tight">
                Tingkatkan Skillmu, <br />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-500">
                  Kuasai Teknologi Masa Depan.
                </span>
              </h1>
              <p className="text-slate-600 text-lg max-w-xl mb-8 font-medium">
                Pilih jalur belajarmu. Pelajari keahlian coding terkini, bangun portofolio profesional, dan raih karir impian di industri digital.
              </p>

              {/* TABS */}
              <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                {[
                  { id: 'all', label: 'Semua Kategori', icon: Layout },
                  { id: 'web-dev', label: 'Web Dev', icon: Globe },
                  { id: 'data-science', label: 'AI & Data', icon: Brain },
                  { id: 'backend', label: 'Backend', icon: Terminal },
                  { id: 'mobile', label: 'Mobile', icon: Smartphone },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as Category)}
                    className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all border ${
                      activeTab === tab.id
                        ? 'bg-blue-50 text-blue-700 border-blue-300 shadow-sm'
                        : 'bg-white border-slate-200 text-slate-500 hover:bg-slate-50 hover:text-slate-700 hover:border-slate-300 shadow-sm'
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
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              placeholder={selectedLanguage ? "Cari materi di modul ini..." : "Cari teknologi (Contoh: React, Python)..."}
              className="w-full bg-white border border-slate-200 rounded-xl py-4 pl-12 pr-4 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all shadow-sm"
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
                    className={`group relative h-full text-left transition-all duration-300 hover:-translate-y-1.5 ${
                      lang.comingSoon ? 'opacity-50 grayscale cursor-not-allowed' : 'cursor-pointer'
                    }`}
                  >
                    {/* Card Container */}
                    <div className="relative h-full bg-white rounded-2xl p-6 flex flex-col border border-slate-200 group-hover:border-blue-300 shadow-sm group-hover:shadow-xl transition-all overflow-hidden">
                      
                      {/* Hover Glow Effect */}
                      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/5 to-transparent rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>

                      {/* Badge */}
                      {lang.badge && !lang.comingSoon && (
                        <div className="absolute top-4 right-4 bg-blue-50 text-blue-600 text-[10px] font-black px-2 py-1 rounded border border-blue-200 shadow-sm">
                          {lang.badge}
                        </div>
                      )}
                      
                      {/* Icon Container */}
                      <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${lang.gradient} flex items-center justify-center mb-5 shadow-md group-hover:scale-105 transition-transform duration-300`}>
                        {lang.iconUrl ? (
                          <img src={lang.iconUrl} alt="icon" className="w-8 h-8 object-contain drop-shadow-md" />
                        ) : (
                          <lang.icon className="w-8 h-8 text-white drop-shadow-md" />
                        )}
                      </div>

                      {/* Texts */}
                      <div className="mb-4 flex-1 relative z-10">
                        <h3 className="text-xl font-extrabold text-slate-900 mb-1 group-hover:text-blue-600 transition-colors">
                          {lang.name}
                        </h3>
                        <p className="text-sm text-slate-500 font-medium leading-relaxed">
                          {lang.description}
                        </p>
                      </div>

                      {/* Footer */}
                      {lang.comingSoon ? (
                        <div className="mt-auto pt-4 border-t border-slate-100 relative z-10">
                          <span className="flex items-center gap-2 text-xs font-bold text-slate-500 bg-slate-100 px-3 py-1.5 rounded-lg w-fit border border-slate-200">
                            <Clock className="w-3 h-3" /> Segera Hadir
                          </span>
                        </div>
                      ) : showProgress ? (
                        <div className="mt-auto relative z-10">
                          <div className="flex justify-between text-xs font-bold text-slate-600 mb-2">
                            <span>{lang.completed}/{lang.total} Modul</span>
                            <span className={lang.isComplete ? 'text-blue-600' : 'text-slate-500'}>{lang.progress}%</span>
                          </div>
                          <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden border border-slate-200/50">
                            <div 
                              className={`h-full rounded-full transition-all duration-500 bg-gradient-to-r ${lang.gradient}`}
                              style={{ width: `${lang.progress}%` }}
                            ></div>
                          </div>
                          {lang.isComplete && (
                            <button
                              onClick={(e) => { e.stopPropagation(); generateCertificate(lang.id); }}
                              disabled={generatingCert}
                              className="mt-4 w-full py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-bold rounded-xl border border-blue-200 flex items-center justify-center gap-2 transition-all shadow-sm"
                            >
                              {generatingCert ? <Loader2 className="w-3 h-3 animate-spin"/> : <Award className="w-3 h-3"/>}
                              Unduh Sertifikat
                            </button>
                          )}
                        </div>
                      ) : (
                        <div className="mt-auto flex items-center text-sm font-bold text-blue-600 group-hover:text-blue-500 transition-colors relative z-10">
                          Lihat Modul <ChevronRight className="w-4 h-4 ml-1" />
                        </div>
                      )}
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
                className="group flex items-center gap-2 text-slate-500 hover:text-blue-600 mb-8 font-bold text-sm transition-colors"
              >
                <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center group-hover:bg-blue-50 transition-colors border border-slate-200 shadow-sm">
                  <ChevronRight className="w-4 h-4 rotate-180" />
                </div>
                Kembali ke Halaman Utama
              </button>

              <div className="flex items-center gap-6 mb-10 p-6 bg-white rounded-3xl border border-slate-200 relative overflow-hidden shadow-lg">
                <div className="absolute right-0 top-0 w-64 h-full bg-gradient-to-l from-blue-500/5 to-transparent pointer-events-none"></div>
                
                <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${languageStats.find(l => l.id === selectedLanguage)?.gradient} flex items-center justify-center shadow-lg z-10`}>
                  <img src={languageStats.find(l => l.id === selectedLanguage)?.iconUrl} className="w-10 h-10 object-contain drop-shadow-md" alt="Icon" />
                </div>
                <div className="z-10">
                  <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-2">
                    {languageStats.find(l => l.id === selectedLanguage)?.name}
                  </h2>
                  <div className="flex items-center gap-3 text-slate-600 text-sm font-medium">
                    <span className="bg-slate-100 px-3 py-1 rounded-lg border border-slate-200">
                      {materials.length} Modul
                    </span>
                    <span>•</span>
                    <span className="text-blue-600 font-bold">
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
                      className={`group relative bg-white border border-slate-200 hover:border-blue-300 rounded-2xl p-6 transition-all duration-300 shadow-sm ${locked ? 'opacity-70 bg-slate-50' : 'hover:shadow-md'}`}
                      style={{ animationDelay: `${idx * 50}ms` }}
                    >
                      <div className="flex gap-5 items-start">
                        {/* Status Icon */}
                        <div className={`flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center text-lg font-black transition-colors ${
                          isCompleted ? 'bg-emerald-50 text-emerald-600 border border-emerald-200' :
                          locked ? 'bg-slate-100 text-slate-400 border border-slate-200' :
                          'bg-blue-50 text-blue-600 border border-blue-200'
                        }`}>
                          {isCompleted ? <CheckCircle className="w-6 h-6" /> : locked ? <Lock className="w-5 h-5" /> : <BookOpen className="w-5 h-5" />}
                        </div>

                        <div className="flex-1">
                          <div className="flex justify-between items-start mb-2">
                            <h3 className={`text-lg font-bold ${locked ? 'text-slate-500' : 'text-slate-900 group-hover:text-blue-600 transition-colors'}`}>
                              {m.title}
                            </h3>
                            {isPremium && !locked && (
                              <div className="flex gap-2">
                                <button
                                  onClick={(e) => { e.stopPropagation(); toggleModuleCompletion(m.id); }}
                                  className={`p-2 rounded-lg transition-all border ${isCompleted ? 'bg-emerald-50 text-emerald-600 border-emerald-200' : 'bg-white text-slate-400 border-slate-200 hover:bg-slate-50 hover:text-blue-600 hover:border-blue-200'}`}
                                  title="Tandai Selesai"
                                >
                                  <CheckCircle className="w-4 h-4" />
                                </button>
                                {plan === 'plus' && (
                                  <button className="p-2 rounded-lg bg-indigo-50 text-indigo-600 border border-indigo-200 hover:bg-indigo-100 transition-all">
                                    <Download className="w-4 h-4" />
                                  </button>
                                )}
                              </div>
                            )}
                          </div>
                          
                          <p className="text-slate-500 text-sm mb-4 line-clamp-2 leading-relaxed font-medium">{m.description}</p>
                          
                          <button
                            onClick={() => !locked && handleStartModule(m.id)}
                            disabled={locked}
                            className={`px-5 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 transition-all ${
                              locked ? 'bg-slate-100 text-slate-500 cursor-not-allowed border border-slate-200' :
                              isCompleted ? 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 hover:text-blue-600' :
                              'bg-gradient-to-r from-blue-600 to-cyan-500 text-white hover:shadow-lg border border-blue-400/50 hover:-translate-y-0.5'
                            }`}
                          >
                            {locked ? 'Terkunci (Pro/Ultra)' : isCompleted ? 'Ulangi Materi' : 'Mulai Belajar'}
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