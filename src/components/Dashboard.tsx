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
  Clock, Star, PlayCircle, Brain, Rocket, Code, Trophy, Flame
} from 'lucide-react';

/* ================================
 * Config & Types
 * ================================ */
const API_BASE = 'https://authx.astbyte.com';

type Lang = {
  id: 'python' | 'php' | 'javascript' | 'typescript' | 'ruby' | 'go' | 'sql' | 'postgresql' | 'java' | 'swift' | 'dart';
  name: string | JSX.Element;
  iconUrl: string;
  comingSoon?: boolean;
  gradient: string;
  description: string;
};

const languageData: readonly Lang[] = [
  { 
    id: 'python', 
    name: 'Python', 
    iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
    gradient: 'from-blue-500 via-blue-600 to-indigo-600',
    description: 'Backend, AI & Data Science'
  },
  { 
    id: 'typescript', 
    name: 'TypeScript', 
    iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg',
    gradient: 'from-blue-600 via-cyan-600 to-blue-700',
    description: 'Type-safe JavaScript Development'
  },
  { 
    id: 'go', 
    name: 'Go', 
    iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original.svg',
    gradient: 'from-cyan-500 via-teal-600 to-cyan-700',
    description: 'High-performance Systems'
  },
  { 
    id: 'sql', 
    name: 'MySQL', 
    iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg',
    gradient: 'from-orange-500 via-amber-600 to-yellow-600',
    description: 'Database Management'
  },
  { 
    id: 'ruby', 
    name: 'Ruby', 
    iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/ruby/ruby-original.svg',
    gradient: 'from-red-500 via-rose-600 to-red-700',
    description: 'Web Development with Rails'
  },
  { 
    id: 'postgresql', 
    name: 'PostgreSQL', 
    iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg',
    comingSoon: true,
    gradient: 'from-blue-600 via-indigo-700 to-blue-800',
    description: 'Advanced Database Systems'
  },
  { 
    id: 'javascript', 
    name: 'JavaScript', 
    iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
    comingSoon: true,
    gradient: 'from-yellow-400 via-amber-500 to-orange-500',
    description: 'Modern Web Development'
  },
  { 
    id: 'php', 
    name: 'PHP', 
    iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg',
    comingSoon: true,
    gradient: 'from-indigo-500 via-purple-600 to-indigo-700',
    description: 'Server-side Web Programming'
  },
  { 
    id: 'dart', 
    name: (<div className="flex items-center gap-1.5">
      Dart <AlertTriangle className="w-3.5 h-3.5 text-yellow-400" />
    </div>), 
    iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dart/dart-original.svg',
    gradient: 'from-blue-400 via-cyan-500 to-teal-500',
    description: 'Flutter & Mobile Development'
  },
] as const;

type Level = 'beginner' | 'intermediate' | 'advanced';
type Plan = 'free' | 'pro' | 'plus';

/* ================================
 * Skeleton Components
 * ================================ */
const SkeletonHeroCard = () => (
  <div className="rounded-3xl bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 p-8 animate-pulse">
    <div className="flex items-start justify-between mb-6">
      <div>
        <div className="h-8 bg-slate-300 dark:bg-slate-700 rounded-xl w-48 mb-3"></div>
        <div className="h-4 bg-slate-300 dark:bg-slate-700 rounded w-32"></div>
      </div>
      <div className="w-16 h-16 bg-slate-300 dark:bg-slate-700 rounded-2xl"></div>
    </div>
    <div className="grid grid-cols-3 gap-4 mb-6">
      <div className="h-20 bg-slate-300 dark:bg-slate-700 rounded-xl"></div>
      <div className="h-20 bg-slate-300 dark:bg-slate-700 rounded-xl"></div>
      <div className="h-20 bg-slate-300 dark:bg-slate-700 rounded-xl"></div>
    </div>
    <div className="h-12 bg-slate-300 dark:bg-slate-700 rounded-xl"></div>
  </div>
);

const SkeletonLanguageCard = () => (
  <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 animate-pulse">
    <div className="flex items-center gap-4 mb-4">
      <div className="w-12 h-12 bg-slate-200 dark:bg-slate-800 rounded-xl"></div>
      <div className="flex-1">
        <div className="h-5 bg-slate-200 dark:bg-slate-800 rounded w-24 mb-2"></div>
        <div className="h-3 bg-slate-200 dark:bg-slate-800 rounded w-32"></div>
      </div>
    </div>
    <div className="h-2 bg-slate-200 dark:bg-slate-800 rounded-full mb-3"></div>
    <div className="flex justify-between">
      <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-20"></div>
      <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-16"></div>
    </div>
  </div>
);

/* ================================
 * Main Component
 * ================================ */
export default function Dashboard() {
  const { user, logout, loading: authLoading } = useAuth();
  const navigate = useNavigate();

  const [materials, setMaterials] = useState<LearningMaterial[]>([]);
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);
  const [progressMap, setProgressMap] = useState<Record<string, number>>({});
  const [isSyncing, setIsSyncing] = useState(false);
  const [isFetchingProgress, setIsFetchingProgress] = useState(true);
  const [showProfile, setShowProfile] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [downloadingPdf, setDownloadingPdf] = useState<string | null>(null);
  const [generatingCert, setGeneratingCert] = useState(false);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    document.title = 'Dashboard | Coreline by AstByte';
  }, []);

  useEffect(() => {
    let isMounted = true;

    const fetchProgressFromServer = async () => {
      if (!user) return;

      let token = localStorage.getItem('astbyte_token');
      if (!token && (user as any).token) token = (user as any).token;

      if (!token) {
        console.warn("Belum ada token auth, menunggu login...");
        return;
      }

      try {
        setIsFetchingProgress(true);
        const response = await fetch(`${API_BASE}/api/learning/progress`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (response.ok) {
          const result = await response.json();
          if (isMounted) {
            const dbData = result.data || {};
            setProgressMap(dbData);
          }
        }
      } catch (error) {
        console.error("Koneksi Database Error:", error);
      } finally {
        if (isMounted) setIsFetchingProgress(false);
      }
    };

    fetchProgressFromServer();
    return () => { isMounted = false; };
  }, [user]);

  const resolveUserType = (): 'student' | 'umum' | 'pro' | 'game' => {
    const raw = (user as any)?.user_type;
    return ['student', 'umum', 'pro', 'game'].includes(raw) ? raw : 'student';
  };

  const getPlanFromUser = (u: any): Plan => {
    const type = (u?.subscription_type ?? 'free').toString().toLowerCase().trim();
    if (type === 'plus') return 'plus';
    if (type === 'pro') return 'pro';
    return 'free';
  };

  const userType = resolveUserType();
  const plan = getPlanFromUser(user);
  const isPremium = ['pro', 'plus'].includes(plan);

  const isModuleLocked = (moduleOrder: number) => {
    if (moduleOrder <= 2) return false;
    return plan === 'free';
  };

  const toggleModuleCompletion = async (materialId: string) => {
    if (!isPremium || !user) return;

    let token = localStorage.getItem('astbyte_token');
    if (!token && (user as any).token) token = (user as any).token;

    if (!token) {
      alert("Sesi habis, silakan login ulang.");
      return;
    }

    const currentProgress = progressMap[materialId] || 0;
    const newProgress = currentProgress === 100 ? 0 : 100;

    setProgressMap(prev => ({ ...prev, [materialId]: newProgress }));
    setIsSyncing(true);

    try {
      const response = await fetch(`${API_BASE}/api/learning/progress`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          material_id: materialId,
          progress: newProgress
        })
      });

      if (!response.ok) throw new Error("Gagal update database");
    } catch (err) {
      console.error("Gagal sync ke server:", err);
      alert("Gagal menyimpan ke database.");
      setProgressMap(prev => ({ ...prev, [materialId]: currentProgress }));
    } finally {
      setIsSyncing(false);
    }
  };

  const getProgress = (id: string) => progressMap[id] || 0;

  const handleStartModule = (materialId: string) => {
    if (isPremium) {
      navigate(`/materials/${encodeURIComponent(materialId)}`);
    } else {
      navigate(`/ad-loading?next=${encodeURIComponent(materialId)}`);
    }
  };

  const generateCertificate = async (langId: string) => {
    if (!user || !isPremium) return;
    setGeneratingCert(true);

    try {
      const { default: jsPDF } = await import('jspdf');
      const doc = new jsPDF({ orientation: 'landscape', unit: 'mm', format: 'a4' });

      const width = doc.internal.pageSize.getWidth();
      const height = doc.internal.pageSize.getHeight();

      const colors = {
        navy: [10, 25, 47] as [number, number, number],
        gold: [197, 160, 89] as [number, number, number],
        white: [255, 255, 255] as [number, number, number],
        darkGrey: [50, 50, 50] as [number, number, number],
        textGrey: [100, 100, 100] as [number, number, number]
      };

      doc.setFillColor(...colors.white);
      doc.rect(0, 0, width, height, 'F');
      doc.setFillColor(...colors.navy);
      doc.rect(0, 0, 15, height, 'F');
      doc.setFillColor(...colors.gold);
      doc.triangle(width, 0, width - 60, 0, width, 60, 'F');

      doc.setDrawColor(...colors.navy);
      doc.setLineWidth(1);
      doc.line(25, height - 20, width - 25, height - 20);

      const centerX = (width + 15) / 2;

      doc.setFont('helvetica', 'bold');
      doc.setTextColor(...colors.textGrey);
      doc.setFontSize(10);
      doc.text('PT. ASTRAL BYTE TECHNOLOGY', 25, 20);

      doc.setFont('helvetica', 'bold');
      doc.setTextColor(...colors.navy);
      doc.setFontSize(50);
      doc.setCharSpace(2);
      doc.text('CERTIFICATE', centerX, 60, { align: 'center' });

      doc.setFont('helvetica', 'normal');
      doc.setTextColor(...colors.gold);
      doc.setFontSize(16);
      doc.setCharSpace(4);
      doc.text('OF ACHIEVEMENT', centerX, 70, { align: 'center' });

      doc.setFont('helvetica', 'bold');
      doc.setTextColor(...colors.darkGrey);
      doc.setFontSize(36);
      doc.setCharSpace(0);
      const userName = user.full_name || 'Student Name';
      doc.text(userName, centerX, 100, { align: 'center' });

      doc.setDrawColor(...colors.gold);
      doc.setLineWidth(0.5);
      doc.line(centerX - 40, 105, centerX + 40, 105);

      doc.setFont('helvetica', 'normal');
      doc.setTextColor(...colors.textGrey);
      doc.setFontSize(12);
      doc.text('This certificate is proudly presented to the above mentioned for', centerX, 118, { align: 'center' });
      doc.text('successfully demonstrating professional mastery in:', centerX, 124, { align: 'center' });

      const langName = languageData.find(l => l.id === langId)?.name || langId.toUpperCase();
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(...colors.navy);
      doc.setFontSize(24);
      doc.text(`${langName} PROGRAMMING`, centerX, 140, { align: 'center' });

      const dateStr = new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
      const certID = `ID: ABT-${Math.floor(100000 + Math.random() * 900000)}-${new Date().getFullYear()}`;

      const bottomY = 165;

      doc.setFont('helvetica', 'normal');
      doc.setTextColor(...colors.textGrey);
      doc.setFontSize(10);
      doc.text('Date Issued', 50, bottomY);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(...colors.darkGrey);
      doc.setFontSize(12);
      doc.text(dateStr, 50, bottomY + 7);

      doc.setFont('helvetica', 'normal');
      doc.setTextColor(...colors.textGrey);
      doc.setFontSize(10);
      doc.text('Authorized Signature', width - 60, bottomY, { align: 'center' });

      doc.setDrawColor(...colors.navy);
      doc.line(width - 80, bottomY + 5, width - 40, bottomY + 5);

      doc.setFont('helvetica', 'bolditalic');
      doc.setTextColor(...colors.navy);
      doc.setFontSize(14);
      doc.text('AstByte Team', width - 60, bottomY - 2, { align: 'center' });

      doc.setFont('helvetica', 'normal');
      doc.setTextColor(150, 150, 150);
      doc.setFontSize(8);
      doc.text(certID, 25, height - 10);

      doc.save(`Certificate_${langName}_${user.full_name.replace(/\s+/g, '_')}.pdf`);

    } catch (err) {
      console.error(err);
      alert("Gagal membuat sertifikat");
    } finally {
      setGeneratingCert(false);
    }
  };

  useEffect(() => {
    if (!user) return;
    setLoading(true);
    
    const allMaterials: LearningMaterial[] = [
      ...OTHER_MATERIALS,
      ...PYTHON_MATERIALS,
      ...GO_MATERIALS,
      ...MYSQL_MATERIALS,
      ...TS_MATERIAL,
      ...JS_MATERIAL,
      ...PSQL_MATERIAL,
      ...RB_MATERIAL
    ];
    
    let list = allMaterials.filter((m) => m.user_type === userType);
    
    if (selectedLanguage) {
      list = list.filter((m) => m.language === selectedLanguage);
    }
    
    const q = searchText.trim().toLowerCase();
    if (q) {
      list = list.filter((m) => 
        m.title.toLowerCase().includes(q) || 
        m.description.toLowerCase().includes(q)
      );
    }
    
    list.sort((a, b) => a.order - b.order);
    
    setMaterials(list);
    const timer = setTimeout(() => setLoading(false), 300);
    return () => clearTimeout(timer);
  }, [user, selectedLanguage, searchText, userType]);

  const languageStats = useMemo(() => {
    const allMaterials: LearningMaterial[] = [
      ...OTHER_MATERIALS, ...PYTHON_MATERIALS, ...GO_MATERIALS,
      ...MYSQL_MATERIALS, ...TS_MATERIAL, ...JS_MATERIAL,
      ...PSQL_MATERIAL, ...RB_MATERIAL
    ].filter((m) => m.user_type === userType);

    return languageData.map(lang => {
      const langMaterials = allMaterials.filter(m => m.language === lang.id);
      const completed = langMaterials.filter(m => (progressMap[m.id] || 0) === 100).length;
      const total = langMaterials.length;
      const progress = total > 0 ? Math.round((completed / total) * 100) : 0;
      
      return {
        ...lang,
        total,
        completed,
        progress,
        isComplete: completed === total && total > 0
      };
    });
  }, [progressMap, userType]);

  const overallStats = useMemo(() => {
    const allUserMaterials = [
      ...OTHER_MATERIALS, ...PYTHON_MATERIALS, ...GO_MATERIALS,
      ...MYSQL_MATERIALS, ...TS_MATERIAL, ...JS_MATERIAL,
      ...PSQL_MATERIAL, ...RB_MATERIAL
    ].filter((m) => m.user_type === userType);

    const completed = allUserMaterials.filter(m => (progressMap[m.id] || 0) === 100).length;
    const inProgress = allUserMaterials.filter(m => {
      const prog = progressMap[m.id] || 0;
      return prog > 0 && prog < 100;
    }).length;
    const streak = 5; // Could be calculated from actual user activity
    const totalTime = Math.floor(completed * 2.5); // Rough estimate: 2.5h per completed module

    return { completed, inProgress, streak, totalTime };
  }, [progressMap, userType]);

  if (authLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 gap-4">
        <div className="relative">
          <div className="w-20 h-20 border-4 border-blue-200 dark:border-blue-900 rounded-full"></div>
          <div className="w-20 h-20 border-4 border-blue-600 dark:border-blue-400 border-t-transparent rounded-full animate-spin absolute top-0 left-0"></div>
        </div>
        <p className="text-base font-bold text-slate-700 dark:text-slate-300 animate-pulse">Memuat Dashboard...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 px-4">
        <div className="max-w-md w-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 p-10 text-center">
          <div className="w-20 h-20 bg-gradient-to-br from-red-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <LogOut className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-3">Sesi Berakhir</h1>
          <p className="text-slate-600 dark:text-slate-400 mb-8 text-lg">Silakan login kembali untuk melanjutkan pembelajaran.</p>
          <Link to="/login" className="block w-full rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 py-4 text-base font-bold text-white hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
            Masuk Sekarang
          </Link>
        </div>
      </div>
    );
  }

  if (showProfile) return <ProfilePage onBack={() => setShowProfile(false)} />;

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/30 dark:from-[#0B0F19] dark:via-slate-950 dark:to-slate-900">

      {/* NAVBAR */}
      <nav className="sticky top-0 z-40 w-full border-b border-white/20 dark:border-slate-800/50 bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl shadow-lg">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-20 items-center justify-between">
            <div className="flex items-center gap-4">
              <Link to="/" className="flex items-center gap-3 group">
                <div className="h-12 w-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center text-white font-bold text-2xl shadow-xl shadow-blue-500/30 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                  C
                </div>
                <div>
                  <h1 className="hidden sm:block text-xl font-black text-slate-900 dark:text-white leading-none tracking-tight">
                    Coreline
                  </h1>
                  <div className="flex items-center gap-1.5 text-xs text-gray-600 dark:text-gray-400 font-medium">
                    <span>by</span>
                    <img src="/icon2.png" className="h-5 w-auto mt-1" alt="AstByte" />
                  </div>
                </div>
              </Link>
            </div>

            <div className="flex items-center gap-3">
              {isSyncing && (
                <div className="hidden md:flex items-center gap-2 text-sm font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 px-4 py-2 rounded-full animate-pulse border border-blue-200 dark:border-blue-800">
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  Syncing...
                </div>
              )}

              <div className="hidden md:flex flex-col items-end bg-slate-100 dark:bg-slate-800 px-4 py-2 rounded-xl">
                <span className="text-sm font-bold text-slate-900 dark:text-white">{user.full_name}</span>
                <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                  plan === 'plus' ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white' :
                  plan === 'pro' ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white' :
                  'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
                }`}>
                  {plan === 'free' ? 'Starter' : plan.toUpperCase()}
                </span>
              </div>

              <button
                onClick={() => setShowProfile(true)}
                className="p-3 text-slate-600 dark:text-slate-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-xl transition-all hover:text-blue-600 dark:hover:text-blue-400"
              >
                <UserIcon className="w-6 h-6" />
              </button>
              <button
                onClick={logout}
                className="p-3 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-all hover:text-red-600"
              >
                <LogOut className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* MAIN CONTENT */}
      <main className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8 py-10">
        
        {/* Hero Section */}
        <div className="mb-12">
          <div className="flex flex-col lg:flex-row items-start justify-between gap-6 mb-8">
            <div>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-slate-900 dark:text-white mb-4 leading-tight">
                Hey, <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">{user.full_name.split(' ')[0]}</span> 👋
              </h1>
              <p className="text-slate-600 dark:text-slate-400 text-xl font-medium">
                Lanjutkan perjalanan coding-mu hari ini
              </p>
            </div>
            {!isPremium && (
              <div className="flex items-center gap-4 bg-gradient-to-r from-amber-50 via-orange-50 to-amber-50 dark:from-amber-900/20 dark:via-orange-900/20 dark:to-amber-900/20 px-6 py-4 rounded-2xl border-2 border-amber-200 dark:border-amber-800/50 shadow-lg hover:shadow-xl transition-all">
                <Crown className="w-8 h-8 text-amber-600 dark:text-amber-500 flex-shrink-0" />
                <div>
                  <span className="block font-black text-amber-900 dark:text-amber-400 text-lg">Upgrade ke Premium!</span>
                  <Link to="/pricing" className="text-sm text-amber-700 dark:text-amber-500 underline hover:text-amber-800 font-semibold">
                    Lihat Paket →
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Quick Stats */}
          {isPremium && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
              <div className="bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl p-4 text-white shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all">
                <a 
                  href="/tutorial" 
                  className="flex items-center gap-3 mb-2 p-2 rounded-lg hover:bg-white/10 transition-all cursor-pointer"
                >
                  <BookOpen className="w-6 h-6" />
                  <span className="text-sm font-bold opacity-90">Tutorial?</span>
                </a>
              </div>
            </div>
          )}
        </div>

        {/* Search Bar */}
        {selectedLanguage && (
          <div className="mb-8">
            <div className="relative max-w-2xl">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
              <input
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                placeholder="Cari materi pembelajaran..."
                className="w-full pl-14 pr-5 py-4 rounded-2xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white outline-none focus:ring-4 focus:ring-blue-500/30 focus:border-blue-500 transition-all shadow-sm hover:shadow-md text-base font-medium"
              />
            </div>
          </div>
        )}

        {/* Language Selection / Learning Path */}
        {!selectedLanguage ? (
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl shadow-lg">
                <Code className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-3xl font-black text-slate-900 dark:text-white">Pilih Learning Path</h2>
                <p className="text-slate-600 dark:text-slate-400 font-medium">Mulai perjalanan belajar dengan bahasa pilihanmu</p>
              </div>
            </div>

            {loading ? (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <SkeletonLanguageCard key={i} />
                ))}
              </div>
            ) : (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {languageStats.map((lang) => {
                  const showProgress = isPremium && lang.total > 0;
                  
                  return (
                    <button
                      key={lang.id}
                      disabled={!!lang.comingSoon}
                      onClick={() => !lang.comingSoon && setSelectedLanguage(lang.id)}
                      className={`group relative overflow-hidden rounded-3xl p-6 text-left transition-all duration-300 ${
                        lang.comingSoon
                          ? 'opacity-60 cursor-not-allowed bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800'
                          : 'cursor-pointer bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 hover:border-blue-500 dark:hover:border-blue-500 hover:shadow-2xl hover:-translate-y-2'
                      }`}
                    >
                      {!lang.comingSoon && (
                        <>
                          <div className={`absolute inset-0 bg-gradient-to-br ${lang.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>
                          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-white/0 to-white/10 dark:from-black/0 dark:to-black/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-500"></div>
                        </>
                      )}
                      
                      <div className="relative z-10">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center gap-4">
                            <div className={`w-14 h-14 rounded-xl flex items-center justify-center shadow-lg transition-all duration-300 ${
                              lang.comingSoon 
                                ? 'bg-slate-100 dark:bg-slate-800' 
                                : `bg-gradient-to-br ${lang.gradient} group-hover:scale-110 group-hover:rotate-6`
                            }`}>
                              <img 
                                src={lang.iconUrl} 
                                alt={typeof lang.name === 'string' ? lang.name : 'Language'} 
                                className="h-8 w-8 object-contain" 
                              />
                            </div>
                            <div>
                              <h3 className="text-xl font-black text-slate-900 dark:text-white mb-1">
                                {lang.name}
                              </h3>
                              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                                {lang.description}
                              </p>
                            </div>
                          </div>
                          
                          {lang.comingSoon && (
                            <div className="px-3 py-1 bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 text-xs font-bold rounded-lg">
                              Soon
                            </div>
                          )}
                          
                          {showProgress && lang.isComplete && (
                            <div className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs font-bold rounded-lg flex items-center gap-1">
                              <CheckCircle className="w-3 h-3" /> Complete
                            </div>
                          )}
                        </div>

                        {showProgress && (
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span className="font-bold text-slate-700 dark:text-slate-300">
                                {lang.completed}/{lang.total} modules
                              </span>
                              <span className="font-black text-blue-600 dark:text-blue-400">
                                {lang.progress}%
                              </span>
                            </div>
                            <div className="h-2.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                              <div 
                                className={`h-full bg-gradient-to-r ${lang.gradient} rounded-full transition-all duration-500`}
                                style={{ width: `${lang.progress}%` }}
                              ></div>
                            </div>
                          </div>
                        )}

                        {!lang.comingSoon && !showProgress && (
                          <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-200 dark:border-slate-800">
                            <span className="text-sm font-bold text-slate-500 dark:text-slate-400">
                              {lang.total} modules available
                            </span>
                            <ChevronRight className="w-5 h-5 text-blue-600 dark:text-blue-400 group-hover:translate-x-1 transition-transform" />
                          </div>
                        )}

                        {showProgress && lang.isComplete && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              generateCertificate(lang.id);
                            }}
                            disabled={generatingCert}
                            className="mt-4 w-full px-4 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-bold text-sm shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 disabled:opacity-70"
                          >
                            {generatingCert ? (
                              <><Loader2 className="w-4 h-4 animate-spin" /> Generating...</>
                            ) : (
                              <><Award className="w-4 h-4" /> Get Certificate</>
                            )}
                          </button>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        ) : (
          /* Module List View */
          <div>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setSelectedLanguage(null)}
                  className="p-3 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-all group"
                >
                  <ChevronRight className="w-6 h-6 text-slate-600 dark:text-slate-400 rotate-180 group-hover:-translate-x-1 transition-transform" />
                </button>
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-br ${
                    languageStats.find(l => l.id === selectedLanguage)?.gradient
                  } shadow-lg`}>
                    <img 
                      src={languageStats.find(l => l.id === selectedLanguage)?.iconUrl} 
                      alt="Language" 
                      className="h-7 w-7 object-contain" 
                    />
                  </div>
                  <div>
                    <h2 className="text-3xl font-black text-slate-900 dark:text-white">
                      {languageStats.find(l => l.id === selectedLanguage)?.name}
                    </h2>
                    <p className="text-slate-600 dark:text-slate-400 font-medium">
                      {materials.length} modules • {languageStats.find(l => l.id === selectedLanguage)?.progress || 0}% complete
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {loading ? (
              <div className="grid gap-4">
                {[1, 2, 3].map((i) => (
                  <SkeletonHeroCard key={i} />
                ))}
              </div>
            ) : materials.length === 0 ? (
              <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-3xl border-2 border-dashed border-slate-300 dark:border-slate-700 p-16 text-center shadow-xl">
                <div className="w-24 h-24 bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-700 rounded-full flex items-center justify-center mx-auto mb-6">
                  <BookOpen className="w-12 h-12 text-slate-400" />
                </div>
                <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-3">Tidak ada materi ditemukan</h3>
                <p className="text-slate-500 dark:text-slate-400 text-lg">Coba kata kunci pencarian yang berbeda</p>
              </div>
            ) : (
              <div className="space-y-4">
                {materials.map((m, idx) => {
                  const locked = isModuleLocked(m.order);
                  const progress = isPremium ? getProgress(m.id) : 0;
                  const isCompleted = isPremium && progress === 100;
                  const isInProgress = isPremium && progress > 0 && progress < 100;

                  return (
                    <div
                      key={m.id}
                      className={`group relative overflow-hidden rounded-2xl bg-white dark:bg-slate-900 border-2 transition-all duration-300 ${
                        locked
                          ? 'border-slate-200 dark:border-slate-800 opacity-75'
                          : 'border-slate-200 dark:border-slate-800 hover:border-blue-500 dark:hover:border-blue-500 hover:shadow-2xl cursor-pointer'
                      }`}
                      style={{ animation: `fadeInUp 0.3s ease-out forwards`, animationDelay: `${idx * 50}ms`, opacity: 0 }}
                    >
                      {!locked && (
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-indigo-500/0 to-purple-500/0 group-hover:from-blue-500/5 group-hover:via-indigo-500/5 group-hover:to-purple-500/5 transition-all duration-500"></div>
                      )}

                      {locked && (
                        <div className="absolute top-4 right-4 z-20 bg-amber-100 dark:bg-amber-900/30 px-4 py-2 rounded-full flex items-center gap-2 shadow-lg">
                          <Lock className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                          <span className="text-xs font-bold text-amber-600 dark:text-amber-400">Premium Only</span>
                        </div>
                      )}

                      {isCompleted && (
                        <div className="absolute top-4 right-4 z-20 bg-green-100 dark:bg-green-900/30 px-4 py-2 rounded-full flex items-center gap-2 shadow-lg">
                          <CheckCircle className="w-4 h-4 text-green-600 dark:text-green-400" />
                          <span className="text-xs font-bold text-green-600 dark:text-green-400">Completed</span>
                        </div>
                      )}

                      <div className="relative z-10 p-6">
                        <div className="flex items-start gap-6">
                          <div className={`flex-shrink-0 w-16 h-16 rounded-2xl flex items-center justify-center text-2xl font-black shadow-lg transition-all duration-300 ${
                            locked ? 'bg-slate-100 dark:bg-slate-800 text-slate-400' :
                            isCompleted ? 'bg-gradient-to-br from-green-500 to-emerald-500 text-white' :
                            isInProgress ? 'bg-gradient-to-br from-purple-500 to-pink-500 text-white' :
                            'bg-gradient-to-br from-blue-500 to-indigo-500 text-white group-hover:scale-110 group-hover:rotate-6'
                          }`}>
                            {m.order}
                          </div>

                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-4 mb-3">
                              <div className="flex-1">
                                <h3 className={`text-2xl font-black mb-2 ${
                                  locked ? 'text-slate-500 dark:text-slate-600' : 'text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400'
                                } transition-colors`}>
                                  {m.title}
                                </h3>
                                <p className={`text-sm leading-relaxed ${
                                  locked ? 'text-slate-400 dark:text-slate-600' : 'text-slate-600 dark:text-slate-400'
                                }`}>
                                  {m.description}
                                </p>
                              </div>
                            </div>

                            {isPremium && !locked && (
                              <div className="mb-4">
                                <div className="flex justify-between text-xs font-bold mb-2">
                                  <span className={isCompleted ? 'text-green-600 dark:text-green-400' : 'text-slate-500 dark:text-slate-400'}>
                                    Progress
                                  </span>
                                  <span className="text-slate-700 dark:text-slate-300">{progress}%</span>
                                </div>
                                <div className="h-2.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                                  <div 
                                    className={`h-full rounded-full transition-all duration-500 ${
                                      isCompleted ? 'bg-gradient-to-r from-green-500 to-emerald-500' :
                                      isInProgress ? 'bg-gradient-to-r from-purple-500 to-pink-500' :
                                      'bg-gradient-to-r from-blue-500 to-indigo-500'
                                    }`}
                                    style={{ width: `${progress}%` }}
                                  ></div>
                                </div>
                              </div>
                            )}

                            <div className="flex items-center gap-3">
                              <button
                                onClick={() => !locked && handleStartModule(m.id)}
                                disabled={locked}
                                className={`flex-1 px-6 py-3 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 ${
                                  locked
                                    ? 'bg-slate-100 dark:bg-slate-800 text-slate-400 cursor-not-allowed'
                                    : isCompleted
                                    ? 'bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 hover:bg-green-100 dark:hover:bg-green-900/30 border-2 border-green-200 dark:border-green-800'
                                    : 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-xl'
                                }`}
                              >
                                {locked ? (
                                  <><Lock className="w-4 h-4" /> Locked</>
                                ) : isCompleted ? (
                                  <><CheckCircle className="w-4 h-4" /> Review</>
                                ) : isInProgress ? (
                                  <><PlayCircle className="w-4 h-4" /> Continue Learning</>
                                ) : (
                                  <><Rocket className="w-4 h-4" /> Start Learning</>
                                )}
                              </button>

                              {isPremium && !locked && (
                                <button
                                  onClick={() => toggleModuleCompletion(m.id)}
                                  className={`px-4 py-3 rounded-xl font-bold text-sm transition-all ${
                                    isCompleted
                                      ? 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                                      : 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/30'
                                  }`}
                                >
                                  {isCompleted ? 'Unmark' : 'Mark Done'}
                                </button>
                              )}

                              {plan === 'plus' && !locked && (
                                <button
                                  onClick={() => {/* Download PDF logic */}}
                                  disabled={downloadingPdf === m.id}
                                  className="px-4 py-3 bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 rounded-xl font-bold text-sm hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-all disabled:opacity-50"
                                >
                                  {downloadingPdf === m.id ? (
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                  ) : (
                                    <Download className="w-4 h-4" />
                                  )}
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </main>

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
