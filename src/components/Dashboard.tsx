import { useEffect, useMemo, useState, useRef } from 'react';
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
  Menu, Languages, Loader2, Search, Filter, Crown, Lock,
  Download, CheckCircle, FileText, RefreshCw,
  BookLock, AlertTriangle, Target, Zap
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
};

const languageData: readonly Lang[] = [
  { 
    id: 'python', 
    name: 'Python (Py 3.10+)', 
    iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
    gradient: 'from-blue-500 to-yellow-500'
  },
  { 
    id: 'php', 
    name: 'PHP (8.0+)', 
    iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg',
    comingSoon: true,
    gradient: 'from-indigo-500 to-purple-500'
  },
  { 
    id: 'javascript', 
    name: 'JavaScript (ES6+)', 
    iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
    comingSoon: true,
    gradient: 'from-yellow-400 to-orange-500'
  },
  { 
    id: 'typescript', 
    name: 'TypeScript', 
    iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg',
    gradient: 'from-blue-600 to-cyan-500'
  },
  { 
    id: 'postgresql', 
    name: 'PostgreSQL', 
    iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg',
    comingSoon: true,
    gradient: 'from-blue-600 to-indigo-600'
  },
  { 
    id: 'dart', 
    name: (<div className="flex items-center gap-1">
      Dart
      <AlertTriangle className="w-4 h-4 text-yellow-500" />
    </div>), 
    iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dart/dart-original.svg',
    gradient: 'from-blue-400 to-cyan-400'
  },
] as const;

type Level = 'beginner' | 'intermediate' | 'advanced';
type SortKey = 'order' | 'title' | 'level';
type Plan = 'free' | 'pro' | 'plus';

/* ================================
 * Skeleton Loader Component
 * ================================ */
const SkeletonCard = () => (
  <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 animate-pulse">
    <div className="flex justify-between items-start mb-4">
      <div className="w-10 h-10 bg-slate-200 dark:bg-slate-800 rounded-xl"></div>
      <div className="w-20 h-6 bg-slate-200 dark:bg-slate-800 rounded-lg"></div>
    </div>
    <div className="h-5 bg-slate-200 dark:bg-slate-800 rounded w-3/4 mb-2"></div>
    <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-full mb-2"></div>
    <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-5/6 mb-4"></div>
    <div className="h-2 bg-slate-200 dark:bg-slate-800 rounded-full w-full mb-4"></div>
    <div className="h-10 bg-slate-200 dark:bg-slate-800 rounded-xl w-full"></div>
  </div>
);

/* ================================
 * Stats Card Component
 * ================================ */
interface StatsCardProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  gradient: string;
}

const StatsCard = ({ icon, label, value, gradient }: StatsCardProps) => (
  <div className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${gradient} p-6 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1`}>
    <div className="absolute top-0 right-0 -mt-4 -mr-4 h-24 w-24 rounded-full bg-white/10 blur-2xl"></div>
    <div className="relative">
      <div className="mb-2">{icon}</div>
      <p className="text-sm font-medium text-white/80 mb-1">{label}</p>
      <p className="text-3xl font-bold">{value}</p>
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
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(() =>
    typeof window !== 'undefined' ? localStorage.getItem('cl_lang') : null
  );

  const [progressMap, setProgressMap] = useState<Record<string, number>>({});
  const [isSyncing, setIsSyncing] = useState(false);
  const [isFetchingProgress, setIsFetchingProgress] = useState(true);
  const [showProfile, setShowProfile] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [downloadingPdf, setDownloadingPdf] = useState<string | null>(null);
  const [generatingCert, setGeneratingCert] = useState(false);

  const [searchText, setSearchText] = useState('');
  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] = useState<SortKey>('order');

  useEffect(() => {
    document.title = 'Dashboard | New Coreline by AstByte';
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

  useEffect(() => {
    const t = setTimeout(() => setQuery(searchText), 300);
    return () => clearTimeout(t);
  }, [searchText]);

  useEffect(() => {
    if (selectedLanguage) localStorage.setItem('cl_lang', selectedLanguage);
    else localStorage.removeItem('cl_lang');
  }, [selectedLanguage]);

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
  const nextHref = '/pricing';
  const isPremium = ['pro', 'plus'].includes(plan);

  const userTitle = useMemo(() => {
    switch (userType) {
      case 'student': return 'Code Path Student';
      case 'umum': return 'Jalur Pembelajaran Umum';
      case 'pro': return 'Akselerasi Profesional';
      case 'game': return 'Pengembangan Game';
      default: return 'Dashboard Pembelajaran';
    }
  }, [userType]);

  const isModuleLocked = (moduleOrder: number) => {
    if (moduleOrder <= 2) return false;
    return plan === 'free';
  };

  const levelPill = (level: Level) => {
    const map = {
      beginner: 'bg-gradient-to-r from-emerald-500 to-green-500 text-white border-0',
      intermediate: 'bg-gradient-to-r from-amber-500 to-orange-500 text-white border-0',
      advanced: 'bg-gradient-to-r from-rose-500 to-pink-500 text-white border-0',
    };
    return map[level] || 'bg-slate-100 text-slate-700 border-slate-200';
  };

  const levelLabel: Record<Level, string> = {
    beginner: 'Pemula',
    intermediate: 'Menengah',
    advanced: 'Lanjutan',
  };

  // OPSI 4: Redirect ke halaman ad interstitial sebelum masuk materi
  const handleStartModule = (materialId: string) => {
    if (isPremium) {
      // Premium user langsung masuk
      navigate(`/materials/${encodeURIComponent(materialId)}`);
    } else {
      // Free user redirect ke halaman ad dulu
      navigate(`/ad-loading?next=${encodeURIComponent(materialId)}`);
    }
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

  const checkCertificateEligibility = () => {
    if (!selectedLanguage) return false;
    if (materials.length === 0) return false;
    if (!isPremium) return false;
    const allCompleted = materials.every(m => (progressMap[m.id] || 0) === 100);
    return allCompleted;
  };

  const generateCertificate = async () => {
    if (!selectedLanguage || !user || !isPremium) return;
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
        lightGrey: [240, 240, 240] as [number, number, number],
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
      doc.text('ASTRAL BYTE TECHNOLOGY', 25, 20);

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

      const langName = languageData.find(l => l.id === selectedLanguage)?.name || selectedLanguage?.toUpperCase();
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

  const downloadModulePDF = async (material: LearningMaterial) => {
    if (plan !== 'plus') {
      alert('Fitur ini khusus member Plus!');
      return;
    }
    setDownloadingPdf(material.id);
    try {
      const { default: jsPDF } = await import('jspdf');
      const html2canvas = (await import('html2canvas')).default;
      navigate(`/materials/${encodeURIComponent(material.id)}`);
      await new Promise(resolve => setTimeout(resolve, 2000));
      const element = document.querySelector('.material-content');
      if (!element) throw new Error('Content not found');
      const clone = element.cloneNode(true) as HTMLElement;
      Object.assign(clone.style, {
        background: '#fff', padding: '40px', maxWidth: '800px',
        position: 'absolute', left: '-9999px', top: '0', color: '#000'
      });
      clone.querySelectorAll('.pdf-code-block').forEach((el) => {
        Object.assign((el as HTMLElement).style, { background: '#f8f9fa', border: '1px solid #dee2e6' });
      });
      clone.querySelectorAll('*').forEach((el) => {
        if (el instanceof HTMLElement) el.style.color = 'black';
      });
      document.body.appendChild(clone);
      const canvas = await html2canvas(clone, { scale: 2, useCORS: true, backgroundColor: '#ffffff' });
      document.body.removeChild(clone);
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgWidth = 210;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= 297;
      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= 297;
      }
      pdf.save(`${material.title.replace(/\s+/g, '_')}.pdf`);
      navigate('/dashboard');
    } catch (error) {
      console.error(error);
      alert('Gagal membuat PDF.');
      navigate('/dashboard');
    } finally {
      setDownloadingPdf(null);
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
    const q = query.trim().toLowerCase();
    if (q) {
      list = list.filter((m) => m.title.toLowerCase().includes(q) || m.description.toLowerCase().includes(q));
    }
    list.sort((a, b) => {
      if (sortKey === 'order') return a.order - b.order;
      if (sortKey === 'title') return a.title.localeCompare(b.title);
      if (sortKey === 'level') return levelLabel[a.level as Level].localeCompare(levelLabel[b.level as Level]);
      return 0;
    });
    setMaterials(list);
    const timer = setTimeout(() => setLoading(false), 200);
    return () => clearTimeout(timer);
  }, [user, selectedLanguage, query, sortKey]);

  const stats = useMemo(() => {
    const total = materials.length;
    const completed = materials.filter(m => (progressMap[m.id] || 0) === 100).length;
    const avgProgress = total > 0
      ? Math.round(materials.reduce((acc, m) => acc + (progressMap[m.id] || 0), 0) / total)
      : 0;

    return { total, completed, avgProgress };
  }, [materials, progressMap]);

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

  const Sidebar = ({ mobile }: { mobile?: boolean }) => (
    <div className={`flex flex-col gap-3 ${mobile ? '' : 'sticky top-24'}`}>
      {!mobile && (
        <div className="mb-4">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1 flex items-center gap-2">
            <Languages className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            Filter Bahasa
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400">Pilih bahasa pemrograman</p>
        </div>
      )}
      <div className="space-y-2">
        {languageData.map((lang) => {
          const active = selectedLanguage === lang.id;
          return (
            <button
              key={lang.id}
              disabled={!!lang.comingSoon}
              onClick={() => {
                if (!lang.comingSoon) {
                  setSelectedLanguage(active ? null : lang.id);
                  if (mobile) setIsSidebarOpen(false);
                }
              }}
              className={`
                group relative flex items-center gap-3 w-full p-4 rounded-xl text-left transition-all duration-300
                ${active
                  ? `bg-gradient-to-r ${lang.gradient} text-white shadow-xl scale-105`
                  : 'bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-blue-300 dark:hover:border-blue-600 hover:shadow-lg'
                }
                ${lang.comingSoon ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:-translate-y-1'}
              `}
            >
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${active ? 'bg-white/20' : 'bg-slate-100 dark:bg-slate-700'}`}>
                <img src={lang.iconUrl} alt={typeof lang.name === 'string' ? lang.name : 'Language'} className="h-6 w-6 object-contain" />
              </div>
              <span className="font-bold text-sm flex-1">{lang.name}</span>
              {lang.comingSoon && (
                <div className="px-2 py-1 bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 text-xs font-bold rounded-md">
                  Soon
                </div>
              )}
              {active && (
                <CheckCircle className="w-5 h-5 text-white" />
              )}
            </button>
          );
        })}
      </div>
      {selectedLanguage && (
        <button
          onClick={() => setSelectedLanguage(null)}
          className="mt-4 w-full text-sm font-bold text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-500 flex items-center justify-center gap-2 py-3 bg-red-50 dark:bg-red-900/20 rounded-xl hover:bg-red-100 dark:hover:bg-red-900/30 transition-all"
        >
          <X className="w-4 h-4" /> Reset Filter
        </button>
      )}
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/30 dark:from-[#0B0F19] dark:via-slate-950 dark:to-slate-900 font-sans">

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
                  Menyimpan...
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

              {userType === 'student' && (
                <button
                  onClick={() => setIsSidebarOpen(true)}
                  className="lg:hidden p-3 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-all"
                >
                  <Menu className="w-6 h-6" />
                </button>
              )}

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

      {/* MOBILE DRAWER */}
      {isSidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-md animate-fade-in" onClick={() => setIsSidebarOpen(false)} />
          <div className="absolute left-0 top-0 h-full w-4/5 max-w-sm bg-white dark:bg-slate-900 shadow-2xl overflow-y-auto transform transition-transform duration-300 ease-out">
            <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-indigo-600 p-6 flex justify-between items-center z-10">
              <h2 className="text-2xl font-black text-white">Menu</h2>
              <button onClick={() => setIsSidebarOpen(false)} className="p-2 hover:bg-white/20 rounded-lg transition-colors">
                <X className="w-7 h-7 text-white" />
              </button>
            </div>
            <div className="p-6">
              <Sidebar mobile />
            </div>
          </div>
        </div>
      )}

      {/* MAIN CONTENT */}
      <main className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="mb-10">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-8">
            <div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white tracking-tight mb-3 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">
                {userTitle}
              </h1>
              <p className="text-slate-600 dark:text-slate-400 text-lg sm:text-xl font-medium">
                Selamat datang kembali, <span className="font-bold text-blue-600 dark:text-blue-400">{user.full_name}</span> 👋
              </p>
            </div>
            {!isPremium && (
              <div className="flex items-center gap-4 bg-gradient-to-r from-amber-50 via-orange-50 to-amber-50 dark:from-amber-900/20 dark:via-orange-900/20 dark:to-amber-900/20 px-6 py-4 rounded-2xl border-2 border-amber-200 dark:border-amber-800/50 shadow-lg hover:shadow-xl transition-shadow">
                <Crown className="w-8 h-8 text-amber-600 dark:text-amber-500 flex-shrink-0" />
                <div>
                  <span className="block font-black text-amber-900 dark:text-amber-400 text-lg">Upgrade ke Premium!</span>
                  <Link to={nextHref} className="text-sm text-amber-700 dark:text-amber-500 underline hover:text-amber-800 font-semibold">
                    Lihat Paket & Harga →
                  </Link>
                </div>
              </div>
            )}
          </div>

          {isPremium && selectedLanguage && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
              <StatsCard
                icon={<BookOpen className="w-8 h-8" />}
                label="Total Materi"
                value={stats.total}
                gradient="from-blue-600 to-cyan-600"
              />
              <StatsCard
                icon={<CheckCircle className="w-8 h-8" />}
                label="Selesai"
                value={stats.completed}
                gradient="from-green-600 to-emerald-600"
              />
              <StatsCard
                icon={<Target className="w-8 h-8" />}
                label="Rata-rata Progress"
                value={`${stats.avgProgress}%`}
                gradient="from-purple-600 to-pink-600"
              />
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
              <input
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                placeholder="Cari materi pembelajaran..."
                className="w-full pl-12 pr-5 py-4 rounded-2xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white outline-none focus:ring-4 focus:ring-blue-500/30 focus:border-blue-500 transition-all shadow-sm hover:shadow-md text-base font-medium"
              />
            </div>
            <div className="flex items-center gap-3 bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-2xl px-5 py-4 shadow-sm hover:shadow-md transition-all">
              <Filter className="w-5 h-5 text-slate-400 flex-shrink-0" />
              <select
                value={sortKey}
                onChange={(e) => setSortKey(e.target.value as SortKey)}
                className="bg-transparent outline-none text-base font-bold text-slate-700 dark:text-slate-200 cursor-pointer"
              >
                <option value="order">Urutan Modul</option>
                <option value="title">Judul (A-Z)</option>
                <option value="level">Tingkat Kesulitan</option>
              </select>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          <div className="hidden lg:block lg:col-span-3">
            <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-3xl border border-slate-200 dark:border-slate-800 p-6 shadow-xl sticky top-24">
              <Sidebar />
            </div>
          </div>

          <div className={userType === 'student' ? 'lg:col-span-9' : 'lg:col-span-12'}>

            {checkCertificateEligibility() && (
              <div className="mb-8 p-8 rounded-3xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-6 animate-fade-in relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-32 -mt-32"></div>
                <div className="flex items-center gap-5 relative z-10">
                  <div className="p-4 bg-white/20 backdrop-blur-sm rounded-2xl">
                    <Award className="w-12 h-12 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl sm:text-3xl font-black mb-2">🎉 Selamat! Anda Lulus!</h2>
                    <p className="text-blue-100 text-base font-medium">
                      Anda telah menyelesaikan semua modul {languageData.find(l => l.id === selectedLanguage)?.name}.
                    </p>
                  </div>
                </div>
                <button
                  onClick={generateCertificate}
                  disabled={generatingCert}
                  className="px-8 py-4 bg-white text-blue-600 rounded-2xl font-black text-lg shadow-xl hover:bg-blue-50 transition-all flex items-center gap-3 disabled:opacity-70 hover:scale-105 transform relative z-10"
                >
                  {generatingCert ? <Loader2 className="w-6 h-6 animate-spin" /> : <FileText className="w-6 h-6" />}
                  {generatingCert ? 'Membuat...' : 'Klaim Sertifikat'}
                </button>
              </div>
            )}

            <div className="flex items-center gap-3 mb-6 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-2xl p-5 border border-slate-200 dark:border-slate-800 shadow-lg">
              <div className="p-3 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-black text-slate-900 dark:text-white flex-1">Daftar Modul</h2>
              <span className="text-base font-black text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-5 py-2 rounded-full border-2 border-slate-200 dark:border-slate-700">
                {materials.length} Materi
              </span>
            </div>

            {loading ? (
              <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <SkeletonCard key={i} />
                ))}
              </div>
            ) : materials.length === 0 ? (
              <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-3xl border-2 border-dashed border-slate-300 dark:border-slate-700 p-16 text-center shadow-xl">
                <div className="w-24 h-24 bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-700 rounded-full flex items-center justify-center mx-auto mb-6">
                  <BookLock className="w-12 h-12 text-slate-400" />
                </div>
                <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-3">Materi Sedang Diperbarui</h3>
                <p className="text-slate-500 dark:text-slate-400 text-lg">Kami sedang merapikan konten untuk pengalaman belajar yang lebih baik.</p>
              </div>
            ) : (
              <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {materials.map((m, idx) => {
                  const locked = isModuleLocked(m.order);
                  const isDownloading = downloadingPdf === m.id;
                  const progress = isPremium ? getProgress(m.id) : 0;
                  const isCompleted = isPremium && progress === 100;

                  return (
                    <div
                      key={m.id}
                      className={`group relative flex flex-col rounded-3xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-2 transition-all duration-300
                        ${locked
                          ? 'border-slate-200 dark:border-slate-800'
                          : 'border-slate-200 dark:border-slate-800 hover:border-blue-500/50 hover:shadow-2xl hover:-translate-y-2 cursor-pointer'
                        }
                      `}
                      style={{ animation: `fadeInUp 0.4s ease-out forwards`, animationDelay: `${idx * 50}ms`, opacity: 0 }}
                    >
                      {!locked && (
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 to-indigo-500/0 group-hover:from-blue-500/5 group-hover:to-indigo-500/5 rounded-3xl transition-all duration-300 pointer-events-none"></div>
                      )}

                      <div className={`p-6 flex-1 relative z-10 ${locked ? 'blur-[2px] opacity-60 pointer-events-none' : ''}`}>
                        <div className="flex justify-between items-start mb-5">
                          <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg transition-all duration-300 ${
                            locked ? 'bg-slate-100 dark:bg-slate-800' :
                            isCompleted ? 'bg-gradient-to-br from-green-500 to-emerald-500 text-white group-hover:scale-110 group-hover:rotate-6' :
                            'bg-gradient-to-br from-blue-500 to-indigo-500 text-white group-hover:scale-110 group-hover:rotate-6'
                          }`}>
                            {isCompleted ? <CheckCircle className="w-7 h-7" /> : <Award className="w-7 h-7" />}
                          </div>
                          <span className={`px-3 py-1.5 rounded-xl text-xs font-black uppercase tracking-wider shadow-md ${levelPill(m.level as Level)}`}>
                            {levelLabel[m.level as Level]}
                          </span>
                        </div>

                        <h3 className="text-xl font-black text-slate-900 dark:text-white mb-3 line-clamp-2 min-h-[3.5rem] group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                          {m.order}. {m.title}
                        </h3>
                        <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-3 mb-5 leading-relaxed">
                          {m.description}
                        </p>

                        {isPremium && (
                          <div className="mb-5">
                            <div className="flex justify-between text-xs font-bold mb-2">
                              <span className={isCompleted ? 'text-green-600 dark:text-green-400' : 'text-slate-500 dark:text-slate-400'}>
                                {isFetchingProgress ? 'Syncing...' : isCompleted ? '✓ Selesai' : 'Progress'}
                              </span>
                              <span className="text-slate-700 dark:text-slate-300">{progress}%</span>
                            </div>
                            <div className="h-3 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden shadow-inner">
                              {isFetchingProgress ? (
                                <div className="h-full bg-gradient-to-r from-blue-400 to-blue-600 animate-pulse w-full"></div>
                              ) : (
                                <div
                                  className={`h-full transition-all duration-700 ${isCompleted ? 'bg-gradient-to-r from-green-500 to-emerald-500' : 'bg-gradient-to-r from-blue-500 to-indigo-500'}`}
                                  style={{ width: `${progress}%` }}
                                />
                              )}
                            </div>
                          </div>
                        )}

                        {m.language && (
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500"></div>
                            <span className="text-xs font-black text-slate-500 dark:text-slate-400 uppercase tracking-wider">{m.language}</span>
                          </div>
                        )}
                      </div>

                      {!locked && (
                        <div className="p-5 border-t-2 border-slate-100 dark:border-slate-800 bg-gradient-to-br from-slate-50/50 to-slate-100/50 dark:from-slate-800/30 dark:to-slate-900/30 backdrop-blur-sm rounded-b-3xl mt-auto relative z-10">
                          <div className="flex gap-3 mb-3">
                            <button
                              onClick={() => handleStartModule(m.id)}
                              className="flex-1 inline-flex justify-center items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-base font-black py-3.5 rounded-2xl transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                            >
                              {isCompleted ? 'Ulangi' : 'Mulai Belajar'} <ChevronRight className="w-5 h-5" />
                            </button>

                            {plan === 'plus' && (
                              <button
                                onClick={() => downloadModulePDF(m)}
                                disabled={isDownloading}
                                className="px-4 py-3 bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:text-blue-600 hover:border-blue-400 rounded-2xl transition-all shadow-md hover:shadow-lg"
                                title="Download PDF"
                              >
                                {isDownloading ? <Loader2 className="w-6 h-6 animate-spin" /> : <Download className="w-6 h-6" />}
                              </button>
                            )}
                          </div>

                          {isPremium && (
                            <button
                              onClick={() => toggleModuleCompletion(m.id)}
                              className={`w-full text-sm font-bold py-2.5 rounded-xl border-2 transition-all ${
                                isCompleted
                                  ? 'bg-green-50 text-green-700 border-green-300 hover:bg-green-100 dark:bg-green-900/20 dark:text-green-400 dark:border-green-700'
                                  : 'bg-white text-slate-600 border-slate-200 hover:text-blue-600 hover:border-blue-300 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700'
                              }`}
                            >
                              {isCompleted ? '✓ Tandai Belum Selesai' : 'Tandai Selesai'}
                            </button>
                          )}
                        </div>
                      )}

                      {locked && (
                        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-white/50 dark:bg-black/50 backdrop-blur-sm rounded-3xl">
                          <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-2xl text-center border-2 border-slate-200 dark:border-slate-700 max-w-[85%]">
                            <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-500 text-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                              <Lock className="w-8 h-8" />
                            </div>
                            <h4 className="font-black text-xl text-slate-900 dark:text-white mb-2">Premium Content</h4>
                            <p className="text-sm text-slate-500 dark:text-slate-400 mb-5">Upgrade untuk membuka materi ini.</p>
                            <Link
                              to="/pricing"
                              className="inline-block px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white text-sm font-black rounded-xl transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                            >
                              Upgrade Sekarang
                            </Link>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </main>

      <footer className="mt-auto border-t-2 border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl py-10">
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="h-10 w-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center text-white font-bold shadow-lg">
              C
            </div>
            <span className="text-lg font-black text-slate-900 dark:text-white">Coreline by AstByte</span>
          </div>
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-2">
            &copy; {new Date().getFullYear()} Astral Byte Technology (AstByte). All rights reserved.
          </p>
          <p className="text-xs text-slate-400 dark:text-slate-500 font-mono">v1.01.26.14</p>
        </div>
      </footer>

      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in { animation: fadeInUp 0.5s ease-out forwards; }
      `}</style>
    </div>
  );
}
