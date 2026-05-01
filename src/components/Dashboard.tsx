import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import type { LearningMaterial } from '../types/learning';
import { encodeId } from '../utils/hashId';
import CoreBot from './CoreBot'; 

// Import Data Statis Modul
import { MOCK_MATERIALS as OTHER_MATERIALS } from '../data/otherData';
import { MOCK_MATERIALS as PYTHON_MATERIALS } from '../data/pythonData';
import { MOCK_MATERIALS as GO_MATERIALS } from '../data/golangData';
import { MOCK_MATERIALS as MYSQL_MATERIALS } from '../data/mysqlData';
import { MOCK_MATERIALS as TS_MATERIAL } from '../data/tsData';
import { MOCK_MATERIALS as JS_MATERIAL } from '../data/jsData';
import { MOCK_MATERIALS as PSQL_MATERIAL } from '../data/posgresData';
import { MOCK_MATERIALS as RB_MATERIAL } from '../data/rubyData';
import { MOCK_MATERIALS as REACTJS_MATERIAL } from '../data/reactjsData';
import { MOCK_MATERIALS as NEXTJS_MATERIAL } from '../data/nextjsData';
import { MOCK_MATERIALS as NEXTJSEND_MATERIAL } from '../data/nextjsendData';
import { MOCK_MATERIALS as PYTHON_DA_MATERIALS } from '../data/pythonDataAnalysis';
import { MOCK_MATERIALS as ENG_MATERIALS } from '../data/englishTechData';
import { MOCK_MATERIALS as JP_MATERIALS } from '../data/japaneseData';
import { MOCK_MATERIALS as UIUX_MATERIALS } from '../data/uiuxData';
import { MOCK_MATERIALS as AGILE_MATERIALS } from '../data/agileScrumData';
import { MOCK_MATERIALS as PM_MATERIALS } from '../data/productManagementData';
import ProfilePage from './ProfilePage';

// Import Icons
import {
  LogOut, BookOpen, Award, ChevronRight, X, User as UserIcon,
  Menu, Loader2, Search, Crown, Lock, Download, CheckCircle,
  FileText, RefreshCw, AlertTriangle, Target, Zap, TrendingUp,
  Clock, Star, PlayCircle, Brain, Rocket, Code, Trophy, Flame,
  Layout, Smartphone, Database, Globe, Terminal, Layers, Cpu, 
  Sparkles, MessageCircle, Boxes, Languages, Users, PenTool, HelpCircle, ArrowLeft,
  Bot, Minus, ChevronLeft, ExternalLink, ShieldAlert, MonitorPlay, Building2, MapPin, Briefcase,
  BookMarked, Send, Cloud, HardDrive, ChevronDown
} from 'lucide-react';

/* ================================
 * Config & Types
 * ================================ */
const API_BASE = 'https://authx.astbyte.com';

type Category = 'all' | 'web-dev' | 'mobile' | 'backend' | 'data-science' | 'devops' | 'framework' | 'language';

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
  rating: number;
  totalStudents: string;
  prerequisites?: string[]; 
};

/* ================================
 * DATA SLIDER PROMO / EVENTS
 * ================================ */
const SLIDER_DATA = [
  {
    id: 1,
    image: "promo-banner/Get-a-10%-discount.png",
    title: "Promo 2026 Stack - Diskon 5%",
    desc: "Daftar sekarang dan dapatkan potongan 5% khusus untuk member premium! Kuota terbatas.",
    link: "/pricing",
    badge: "Hot Promo"
  },
  {
    id: 2,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIteuuRIZhV7abothS4WlRYMDsqnTZApMFSg&s",
    title: "Gabung menjadi member Prioritas Coreline",
    desc: "Nikmati akses eksklusif ke konten premium, mentor ahli, dan fitur prioritas lainnya. Daftar sekarang untuk pengalaman belajar yang lebih mendalam!",
    link: "/priority-member",
    badge: "Prioritas"
  },
];

/* ================================
 * CATEGORY MAPPING FOR SECTIONS
 * ================================ */
const CATEGORIES_INFO = [
  { id: 'web-dev', label: 'Web Development', icon: Globe },
  { id: 'framework', label: 'Framework & Libraries', icon: Boxes },
  { id: 'mobile', label: 'Mobile Development', icon: Smartphone },
  { id: 'backend', label: 'Backend & Database', icon: Terminal },
  { id: 'devops', label: 'DevOps & Cloud', icon: Zap },
  { id: 'data-science', label: 'AI & Data Science', icon: Brain },
  { id: 'language', label: 'Language & Soft Skill', icon: Languages },
];

type Plan = 'free' | 'pro' | 'plus' | 'ultra' | 'ultimate';

/* ================================
 * Main Component
 * ================================ */
export default function Dashboard() {
  const { user, logout, loading: authLoading } = useAuth();
  const navigate = useNavigate();

  const [languageData, setLanguageData] = useState<Lang[]>([]);
  const [loadingCourses, setLoadingCourses] = useState(true);

  const [materials, setMaterials] = useState<LearningMaterial[]>([]);
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<Category>('all');
  const [progressMap, setProgressMap] = useState<Record<string, number>>({});
  
  const [isSyncing, setIsSyncing] = useState(false);
  const [isFetchingProgress, setIsFetchingProgress] = useState(true);
  const [showProfile, setShowProfile] = useState(false);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState('');

  // Rating State
  const [userRating, setUserRating] = useState<number>(0);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [reviewText, setReviewText] = useState('');
  const [isSubmittingRating, setIsSubmittingRating] = useState(false);
  const [ratingSuccess, setRatingSuccess] = useState(false);

  // Slider State
  const [currentSlide, setCurrentSlide] = useState(0);

  // Certificate Dropdown State
  const [generatingCert, setGeneratingCert] = useState(false);
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);

  const LAST_UPDATE = "20 Apr 2026, 11:20 PM";

  useEffect(() => {
    document.title = 'Dashboard | Coreline by AstByte';
  }, []);

  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDER_DATA.length);
    }, 5000);
    return () => clearInterval(slideInterval);
  }, []);

  useEffect(() => {
    setUserRating(0);
    setHoverRating(0);
    setReviewText('');
    setRatingSuccess(false);
  }, [selectedLanguage]);

  useEffect(() => {
    let isMounted = true;
    const fetchCourses = async () => {
      try {
        setLoadingCourses(true);
        const response = await fetch(`${API_BASE}/api/coreline/courses`);
        if (response.ok) {
          const result = await response.json();
          if (isMounted && result.status === "success") {
            const coursesFromDb: Lang[] = result.data.map((c: any) => ({
              ...c,
              rating: c.rating ? parseFloat(c.rating).toFixed(1) : "0.0", 
              totalStudents: c.totalStudents || "0",
            }));
            setLanguageData(coursesFromDb);
          }
        }
      } catch (error) { console.error(error); } 
      finally { if (isMounted) setLoadingCourses(false); }
    };
    fetchCourses();
    return () => { isMounted = false; };
  }, []);

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

  const resolveUserType = (): 'student' | 'umum' | 'pro' | 'game' => {
    const raw = (user as any)?.user_type;
    return ['student', 'umum', 'pro', 'game'].includes(raw) ? raw : 'student';
  };
  const getPlanFromUser = (u: any): Plan => {
    const type = (u?.subscription_type ?? 'free').toString().toLowerCase().trim();
    if (type === 'ultimate') return 'ultimate';
    if (type === 'ultra') return 'ultra';
    if (type === 'plus') return 'plus';
    if (type === 'pro') return 'pro';
    return 'free';
  };

  const userType = resolveUserType();
  const plan = getPlanFromUser(user);
  const isPremium = plan !== 'free';

  const canAccessVideoCall = ['ultra', 'ultimate'].includes(plan);
  const canAccessOfflineMentoring = plan === 'ultimate';
  const canAccessPortfolioTemplate = isPremium;

  const toggleModuleCompletion = async (materialId: string, courseId: string) => {
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

      if (newProgress === 100 && courseId) {
        fetch(`${API_BASE}/api/coreline/courses/${courseId}/enroll`, {
          method: 'POST',
          headers: { 'Authorization': `Bearer ${token}` }
        }).catch(e => console.error("Auto-enrollment error", e));
      }
    } catch (err) {
      console.error(err);
      setProgressMap(prev => ({ ...prev, [materialId]: currentProgress })); 
    } finally {
      setIsSyncing(false);
    }
  };

  const getProgress = (id: string) => progressMap[id] || 0;
  
  const isModuleLocked = (moduleOrder: number) => {
    if (moduleOrder <= 2) return false;
    return plan === 'free';
  };

  const handleStartModule = async (materialId: string, courseId: string) => {
    let token = localStorage.getItem('astbyte_token') || (user as any).token;
    if (token) {
      try {
        await fetch(`${API_BASE}/api/coreline/courses/${courseId}/enroll`, {
          method: 'POST',
          headers: { 'Authorization': `Bearer ${token}` }
        });
      } catch (e) { console.error("Enrollment error", e); }
    }

    if (isPremium) {
      navigate(`/materials/${encodeId(materialId)}`);
    } else {
      navigate(`/ad-loading?next=${encodeId(materialId)}`);
    }
  };

  const processCertificate = async (langId: string, toLocal: boolean, toCloud: boolean) => {
    if (!user || !isPremium) return;
    
    setGeneratingCert(true);
    setOpenDropdownId(null); 

    try {
      const { default: jsPDF } = await import("jspdf");
      const doc = new jsPDF({ orientation: "landscape", unit: "mm", format: "a4" });
      const w = doc.internal.pageSize.getWidth();
      const h = doc.internal.pageSize.getHeight();
      const name = user.full_name || "Developer";
      const date = new Date().toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" });
      const certId = "ABT-" + Math.random().toString(36).substring(2, 10).toUpperCase();

      doc.setFillColor(255, 255, 255); doc.rect(0, 0, w, h, "F");
      doc.setDrawColor(212, 175, 55); doc.setLineWidth(1.6); doc.rect(6, 6, w - 12, h - 12);
      doc.setLineWidth(0.6); doc.rect(10, 10, w - 20, h - 20);
      doc.setDrawColor(200, 200, 200); doc.setLineWidth(0.3); doc.rect(14, 14, w - 28, h - 28);
      
      const size = 20; doc.setDrawColor(212, 175, 55); doc.setLineWidth(0.8);
      doc.line(14, 14, 14 + size, 14); doc.line(14, 14, 14, 14 + size);
      doc.line(w - 14, 14, w - 14 - size, 14); doc.line(w - 14, 14, w - 14, 14 + size);
      doc.line(14, h - 14, 14 + size, h - 14); doc.line(14, h - 14, 14, h - 14 - size);
      doc.line(w - 14, h - 14, w - 14 - size, h - 14); doc.line(w - 14, h - 14, w - 14, h - 14 - size);

      doc.setDrawColor(230, 230, 230); doc.setLineWidth(0.5); doc.circle(w / 2, h / 2 + 5, 40);
      doc.setFont("times", "bold"); doc.setFontSize(40); doc.setTextColor(240, 240, 240);
      doc.text("AB", w / 2, h / 2 + 15, { align: "center" });

      doc.setFont("times", "bold"); doc.setFontSize(38); doc.setTextColor(212, 175, 55);
      doc.text("CERTIFICATE", w / 2, 50, { align: "center" });
      doc.setFontSize(22); doc.text("OF ACHIEVEMENT", w / 2, 62, { align: "center" });

      doc.setDrawColor(212, 175, 55); doc.setLineWidth(0.6); doc.line(w / 2 - 60, 68, w / 2 + 60, 68);

      doc.setFont("helvetica", "normal"); doc.setFontSize(14); doc.setTextColor(100, 100, 100);
      doc.text("This certificate is proudly presented to", w / 2, 85, { align: "center" });

      doc.setFont("times", "bold"); doc.setFontSize(48); doc.setTextColor(30, 30, 30);
      doc.text(name, w / 2, 110, { align: "center" });

      doc.setDrawColor(212, 175, 55); doc.setLineWidth(0.7); doc.line(w / 2 - 70, 115, w / 2 + 70, 115);

      doc.setFont("helvetica", "normal"); doc.setFontSize(14); doc.setTextColor(90, 90, 90);
      doc.text("for successfully completing the programming course", w / 2, 130, { align: "center" });

      doc.setFont("helvetica", "bold"); doc.setFontSize(26); doc.setTextColor(212, 175, 55);
      doc.text(langId.toUpperCase(), w / 2, 145, { align: "center" });

      const signY = h - 45;
      doc.setDrawColor(120, 120, 120); doc.setLineWidth(0.4);
      doc.line(w / 2 - 95, signY, w / 2 - 45, signY); doc.line(w / 2 + 45, signY, w / 2 + 95, signY);

      doc.setFontSize(12); doc.setTextColor(80, 80, 80);
      doc.text("CEO & Founder", w / 2 - 70, signY + 7, { align: "center" });
      doc.text("Program Director", w / 2 + 70, signY + 7, { align: "center" });

      doc.setFont("helvetica", "bold");
      doc.text("Astral Byte", w / 2 - 70, signY + 16, { align: "center" });
      doc.text("NewCoreline", w / 2 + 70, signY + 16, { align: "center" });

      doc.setFont("helvetica", "normal"); doc.setFontSize(10); doc.setTextColor(120, 120, 120);
      doc.text(`Issued: ${date}`, 20, h - 15);
      doc.text(`Certificate ID: ${certId}`, w - 20, h - 15, { align: "right" });

      const fileName = `AstByte_Certificate_${langId.toUpperCase()}.pdf`;
      let successMessages = [];

      if (toLocal) {
        doc.save(fileName);
        successMessages.push("diunduh ke perangkat");
      }

      if (toCloud) {
        const pdfBlob = doc.output('blob');
        const pdfFile = new File([pdfBlob], fileName, { type: 'application/pdf' });
        let token = localStorage.getItem('astbyte_token') || (user as any).token;
        
        if (token) {
          const formData = new FormData();
          formData.append('file', pdfFile);
          formData.append('name', fileName);
          formData.append('type', 'document'); 
          formData.append('size', pdfBlob.size.toString());

          const res = await fetch(`${API_BASE}/api/storage/files`, {
            method: 'POST',
            headers: { 'Authorization': `Bearer ${token}` },
            body: formData
          });

          const json = await res.json();
          if (json.status === 'success') {
            successMessages.push("dicadangkan ke CloudNest");
          } else {
            console.error("Gagal simpan ke CloudNest", json);
            alert(`Gagal mencadangkan ke CloudNest: ${json.message}`);
          }
        }
      }

      if (successMessages.length > 0) {
        alert(`Selamat! Sertifikat berhasil ${successMessages.join(" dan ")}.`);
      }

    } catch (err) {
      console.error(err); alert("Gagal memproses sertifikat");
    } finally {
      setGeneratingCert(false);
    }
  };

  const handleSubmitRating = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || userRating === 0 || !selectedLanguage) return;

    let token = localStorage.getItem('astbyte_token') || (user as any).token;
    if (!token) return;

    setIsSubmittingRating(true);
    try {
      const res = await fetch(`${API_BASE}/api/coreline/courses/${selectedLanguage}/rate`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ rating: userRating, review: reviewText })
      });

      const data = await res.json();
      if (res.ok && data.status === 'success') {
        setRatingSuccess(true);
      } else {
        alert(data.message || "Gagal mengirim rating");
      }
    } catch (err) {
      console.error(err);
      alert("Terjadi kesalahan jaringan.");
    } finally {
      setIsSubmittingRating(false);
    }
  };

  useEffect(() => {
    if (!user) return;
    setLoading(true);
    
    const allMaterials: LearningMaterial[] = [
      ...OTHER_MATERIALS, ...PYTHON_MATERIALS, ...PYTHON_DA_MATERIALS, ...GO_MATERIALS,
      ...MYSQL_MATERIALS, ...TS_MATERIAL, ...JS_MATERIAL,
      ...PSQL_MATERIAL, ...RB_MATERIAL, ...REACTJS_MATERIAL, ...NEXTJS_MATERIAL,
      ...NEXTJSEND_MATERIAL, ...ENG_MATERIALS, ...JP_MATERIALS, ...UIUX_MATERIALS, ...AGILE_MATERIALS, ...PM_MATERIALS
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
  
  const allLanguageStats = useMemo(() => {
    const allMaterials = [
      ...OTHER_MATERIALS, ...PYTHON_MATERIALS, ...PYTHON_DA_MATERIALS, ...GO_MATERIALS,
      ...MYSQL_MATERIALS, ...TS_MATERIAL, ...JS_MATERIAL,
      ...PSQL_MATERIAL, ...RB_MATERIAL, ...REACTJS_MATERIAL, ...NEXTJS_MATERIAL,
      ...NEXTJSEND_MATERIAL, ...ENG_MATERIALS, ...JP_MATERIALS, ...UIUX_MATERIALS, ...AGILE_MATERIALS, ...PM_MATERIALS
    ].filter((m) => m.user_type === userType);

    return languageData.map(lang => {
      const langMaterials = allMaterials.filter(m => m.language === lang.id);
      const completed = langMaterials.filter(m => (progressMap[m.id] || 0) === 100).length;
      const total = langMaterials.length;
      const progress = total > 0 ? Math.round((completed / total) * 100) : 0;
      
      return { ...lang, total, completed, progress, isComplete: completed === total && total > 0 };
    });
  }, [progressMap, userType, languageData]);

  // Logic buat nentuin course terakhir yang dipelajarin user (progress > 0 && < 100)
  const lastActiveCourse = useMemo(() => {
    if (!allLanguageStats || allLanguageStats.length === 0) return null;
    const inProgress = allLanguageStats.filter(l => l.progress > 0 && l.progress < 100);
    if (inProgress.length > 0) {
      // Ambil yang paling tinggi progressnya atau terserah mau di sort gmn, kita sort by progress
      return inProgress.sort((a, b) => b.progress - a.progress)[0];
    }
    return null;
  }, [allLanguageStats]);

  const completedLangIds = useMemo(() => {
    const set = new Set<string>();
    allLanguageStats.forEach(l => {
      if (l.isComplete) set.add(l.id);
    });
    return set;
  }, [allLanguageStats]);

  const filteredLanguageStats = useMemo(() => {
    return allLanguageStats.filter(lang => {
      const matchSearch = lang.name.toString().toLowerCase().includes(searchText.toLowerCase()) || 
                          lang.description.toLowerCase().includes(searchText.toLowerCase());
      const matchTab = activeTab === 'all' || lang.category.includes(activeTab);
      return matchSearch && matchTab;
    });
  }, [allLanguageStats, searchText, activeTab]);

  const userGlobalStats = useMemo(() => {
    let completedModules = 0;
    Object.values(progressMap).forEach(val => { if (val === 100) completedModules++; });
    return {
      completed: completedModules,
      totalCourseAccess: allLanguageStats.length
    }
  }, [progressMap, allLanguageStats]);

  if (authLoading || loadingCourses) return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center gap-4">
      <div className="w-16 h-16 border-4 border-slate-200 border-t-blue-600 rounded-full animate-spin flex items-center justify-center">
         <Terminal className="w-6 h-6 text-blue-600 animate-pulse" />
      </div>
      <p className="text-slate-500 font-bold animate-pulse">Memuat Server...</p>
    </div>
  );

  if (!user) return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.4] bg-[linear-gradient(rgba(203,213,225,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(203,213,225,0.5)_1px,transparent_1px)] bg-[size:30px_30px]"></div>
      <div className="text-center p-8 bg-white/80 backdrop-blur-md rounded-3xl border border-slate-200 shadow-xl relative z-10 max-w-md w-full">
        <h1 className="text-3xl font-bold text-slate-900 mb-4">Sesi Berakhir</h1>
        <p className="text-slate-600 mb-6 font-medium">Silakan login kembali untuk melanjutkan sesi belajar Anda.</p>
        <Link to="/login" className="px-6 py-3.5 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-colors inline-block w-full shadow-md">Masuk Kembali</Link>
      </div>
    </div>
  );

  if (showProfile) return <ProfilePage onBack={() => setShowProfile(false)} />;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans relative overflow-x-hidden selection:bg-blue-500/30">
      
      <div className="fixed inset-0 opacity-[0.4] pointer-events-none z-0 bg-[linear-gradient(rgba(203,213,225,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(203,213,225,0.5)_1px,transparent_1px)] bg-[size:30px_30px]"></div>
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-gradient-to-b from-blue-100/50 to-transparent -z-10" />
      <div className="absolute top-20 right-0 w-96 h-96 bg-cyan-300/20 rounded-full blur-3xl pointer-events-none" />

      <nav className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/80 backdrop-blur-xl supports-[backdrop-filter]:bg-white/60 shadow-sm">
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link to="/" className="flex items-center gap-3 group cursor-pointer hover:opacity-80 transition-opacity">
                <img src="/icon3.png" alt="NewCoreline Icon" className="h-9 object-contain opacity-90"/>
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
                plan === 'ultimate' ? 'bg-amber-100 text-amber-700 border-amber-200' :
                plan === 'ultra' ? 'bg-purple-100 text-purple-700 border-purple-200' :
                plan === 'plus' ? 'bg-indigo-100 text-indigo-700 border-indigo-200' :
                plan === 'pro'  ? 'bg-blue-100 text-blue-700 border-blue-200' :
                'bg-slate-100 text-slate-600 border-slate-200'
              }`}>
                {plan} Member
              </div>
            </div>

            <button onClick={() => setShowProfile(true)} className="p-2.5 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl transition-all text-slate-600 hover:text-blue-600 shadow-sm hover:shadow">
              <UserIcon className="w-5 h-5" />
            </button>
            <button onClick={logout} className="p-2.5 bg-red-50 hover:bg-red-100 border border-red-200 rounded-xl transition-all text-red-500 hover:text-red-600 shadow-sm hover:shadow">
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 sm:px-6 py-10 relative z-10 flex-1 min-h-screen">

        {plan !== 'ultimate' && (
          <div className="mb-8 animate-fade-in-up">
            <div className={`relative overflow-hidden rounded-3xl border p-8 shadow-lg transition-all hover:shadow-xl ${
              plan === 'free' 
                ? 'bg-gradient-to-r from-white via-slate-50 to-white border-slate-200' 
                : 'bg-gradient-to-r from-blue-50 via-indigo-50 to-white border-blue-200'
            }`}>
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
                    {plan === 'free' ? 'Upgrade ke Paket Premium' : 'Upgrade ke Paket Ultimate'}
                  </h2>
                  
                  <p className="text-slate-600 max-w-2xl text-sm leading-relaxed font-medium">
                    Dapatkan akses penuh ke seluruh materi premium, sertifikat eksklusif, studi kasus industri, dan dukungan mentor profesional.
                  </p>
                </div>

                <Link 
                  to="/pricing" 
                  className="group relative px-8 py-4 rounded-xl font-bold text-white shadow-lg transition-all transform hover:-translate-y-1 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 border border-blue-400/50 flex-shrink-0 animate-pulse"
                >
                  <span className="flex items-center gap-3 text-sm uppercase tracking-wider">
                    <Crown className="w-5 h-5 fill-current text-yellow-300" /> Upgrade Sekarang
                  </span>
                </Link>
              </div>
            </div>
          </div>
        )}

        <div className="mb-10 text-center md:text-left">
          {!selectedLanguage && (
            <>
              {/* LMS STYLE HERO SECTION */}
              <div className="bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 rounded-[2rem] p-8 md:p-12 text-white shadow-2xl mb-12 relative overflow-hidden flex flex-col md:flex-row justify-between items-center gap-10 animate-fade-in-up">
                {/* Background Details */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 w-72 h-72 bg-cyan-500/20 rounded-full blur-3xl -ml-20 -mb-20 pointer-events-none"></div>

                <div className="relative z-10 w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left">
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-200 text-[11px] font-black uppercase tracking-widest mb-6 backdrop-blur-md shadow-sm">
                    <Sparkles className="w-4 h-4 text-cyan-300" /> Selamat datang kembali
                  </div>
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-5 leading-[1.1] tracking-tight">
                    Halo, <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-200">{user.full_name?.split(' ')[0]}!</span>
                  </h1>
                  <p className="text-blue-100/80 font-medium text-base md:text-lg mb-8 max-w-md leading-relaxed">
                    Siap untuk menguasai keahlian baru hari ini? Lanjutkan progressmu dan raih impian karirmu.
                  </p>
                  <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
                    <div className="bg-white/10 backdrop-blur-md rounded-2xl px-6 py-4 border border-white/10 flex items-center gap-4">
                      <div className="p-3 bg-emerald-500/20 rounded-xl"><Target className="w-6 h-6 text-emerald-300"/></div>
                      <div>
                        <div className="text-2xl font-black text-white">{userGlobalStats.completed}</div>
                        <div className="text-[10px] text-emerald-200 font-bold uppercase tracking-widest">Modul Selesai</div>
                      </div>
                    </div>
                    <div className="bg-white/10 backdrop-blur-md rounded-2xl px-6 py-4 border border-white/10 flex items-center gap-4">
                      <div className="p-3 bg-purple-500/20 rounded-xl"><Boxes className="w-6 h-6 text-purple-300"/></div>
                      <div>
                        <div className="text-2xl font-black text-white">{userGlobalStats.totalCourseAccess}</div>
                        <div className="text-[10px] text-purple-200 font-bold uppercase tracking-widest">Course Akses</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="relative z-10 w-full md:w-[45%] lg:w-[40%]">
                  {lastActiveCourse ? (
                    <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-7 border border-white/20 shadow-2xl hover:border-white/30 transition-colors">
                      <div className="flex items-center justify-between mb-5">
                        <span className="text-xs font-black text-cyan-300 uppercase tracking-widest flex items-center gap-2">
                          <Clock className="w-4 h-4"/> Terakhir Belajar
                        </span>
                      </div>
                      <div className="flex items-center gap-5 mb-6">
                        <div className={`w-16 h-16 rounded-2xl ${lastActiveCourse.gradient} flex items-center justify-center shrink-0 shadow-inner`}>
                          {lastActiveCourse.iconUrl ? <img src={lastActiveCourse.iconUrl} className="w-8 h-8 object-contain drop-shadow-md" alt="" /> : <Boxes className="w-8 h-8 text-white"/>}
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-extrabold text-white mb-2 line-clamp-1">{lastActiveCourse.name}</h3>
                          <div className="flex items-center gap-3">
                            <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
                              <div className="h-full bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full" style={{ width: `${lastActiveCourse.progress}%` }}></div>
                            </div>
                            <span className="text-cyan-300 text-[10px] font-black">{lastActiveCourse.progress}%</span>
                          </div>
                        </div>
                      </div>
                      <button onClick={() => setSelectedLanguage(lastActiveCourse.id)} className="w-full py-3.5 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-400 hover:to-blue-500 text-white font-bold rounded-xl transition-all shadow-lg hover:shadow-blue-500/30 flex items-center justify-center gap-2">
                        Lanjutkan Kursus <ChevronRight className="w-4 h-4"/>
                      </button>
                    </div>
                  ) : (
                    <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 text-center shadow-2xl">
                      <div className="w-20 h-20 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-5 border border-blue-400/30">
                        <Rocket className="w-10 h-10 text-cyan-300" />
                      </div>
                      <h3 className="text-2xl font-extrabold text-white mb-2">Mulai Perjalananmu!</h3>
                      <p className="text-blue-200/80 text-sm mb-6 font-medium">Pilih course pertamamu dari katalog di bawah untuk memulai pembelajaran.</p>
                      <button onClick={() => window.scrollTo({top: 500, behavior: 'smooth'})} className="px-6 py-3 bg-white text-slate-900 font-bold rounded-xl hover:bg-slate-100 transition-colors">
                        Jelajahi Katalog
                      </button>
                    </div>
                  )}
                </div>
              </div>
              
              {/* QUICK NAVIGATION SECTION */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10 animate-fade-in-up" style={{ animationDelay: '100ms' }}>
                <Link 
                  to="/offline-mentoring" 
                  className="flex items-center gap-4 p-5 bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md hover:border-blue-300 transition-all group"
                >
                  <div className="p-3 bg-blue-100 rounded-xl text-blue-600 group-hover:scale-110 transition-transform shadow-inner">
                    <Users className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-sm font-black text-slate-900 uppercase tracking-tight">Mentoring Offline</div>
                    <div className="text-[10px] text-slate-500 font-bold">Bimbingan Tatap Muka</div>
                  </div>
                  <ChevronRight className="w-4 h-4 ml-auto text-slate-300 group-hover:text-blue-500 transition-colors" />
                </Link>
                <Link 
                  to="/tutorial" 
                  className="flex items-center gap-4 p-5 bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md hover:border-amber-300 transition-all group"
                >
                  <div className="p-3 bg-amber-100 rounded-xl text-amber-600 group-hover:scale-110 transition-transform shadow-inner">
                    <BookOpen className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-sm font-black text-slate-900 uppercase tracking-tight">Tutorial</div>
                    <div className="text-[10px] text-slate-500 font-bold">Panduan Belajar</div>
                  </div>
                  <ChevronRight className="w-4 h-4 ml-auto text-slate-300 group-hover:text-amber-500 transition-colors" />
                </Link>
                <Link 
                  to="/lyra" 
                  className="flex items-center gap-4 p-5 bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl border border-slate-700 shadow-xl hover:shadow-blue-500/20 hover:border-blue-500/50 transition-all group overflow-hidden relative"
                >
                  <div className="absolute top-0 right-0 p-1 bg-blue-500 text-[8px] font-black text-white uppercase tracking-tighter -rotate-45 translate-x-3 translate-y-1 w-16 text-center shadow-md">NEW</div>
                  <div className="p-3 bg-blue-500 rounded-xl text-white group-hover:scale-110 group-hover:rotate-6 transition-all shadow-lg shadow-blue-500/30">
                    <Bot className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-sm font-black text-white uppercase tracking-tight">Lyra AI Chat</div>
                    <div className="text-[10px] text-blue-200/60 font-bold">Asisten Virtual 31B</div>
                  </div>
                  <ChevronRight className="w-4 h-4 ml-auto text-white/30 group-hover:text-blue-400 transition-colors" />
                </Link>
              </div>

              <div className="flex items-center justify-between mb-4 px-1">
                <h2 className="text-2xl font-extrabold text-slate-900">Katalog Kursus</h2>
              </div>
              <div className="flex overflow-x-auto pb-4 -mx-4 px-4 md:mx-0 md:px-0 gap-3 md:flex-wrap scrollbar-hide mb-6">
                {[{ id: 'all', label: 'Semua Kategori', icon: Layout }, ...CATEGORIES_INFO].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as Category)}
                    className={`flex items-center whitespace-nowrap gap-2 px-5 py-2.5 rounded-full text-sm font-bold transition-all border shadow-sm flex-shrink-0 ${
                      activeTab === tab.id
                        ? 'bg-slate-900 text-white border-slate-800 shadow-slate-900/20'
                        : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-slate-800 hover:border-slate-300'
                    }`}
                  >
                    <tab.icon className="w-4 h-4" /> {tab.label}
                  </button>
                ))}
              </div>
            </>
          )}

          <div className="relative max-w-xl mb-10 mx-auto md:mx-0">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              placeholder={selectedLanguage ? "Cari materi di modul ini..." : "Cari course (Contoh: React, Python, Docker)..."}
              className="w-full bg-white border border-slate-200 rounded-xl py-4 pl-12 pr-4 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all shadow-sm font-medium"
            />
          </div>

          {/* === BAGIAN GRID COURSE === */}
          {!selectedLanguage ? (
            <div className="space-y-12">
              {CATEGORIES_INFO.filter(cat => activeTab === 'all' || activeTab === cat.id).map((catInfo) => {
                const sectionLanguages = filteredLanguageStats.filter(lang => 
                  activeTab === 'all' ? lang.category[0] === catInfo.id : lang.category.includes(catInfo.id as Category)
                );

                if (sectionLanguages.length === 0) return null;

                const hasActiveDropdown = sectionLanguages.some(l => l.id === openDropdownId);

                return (
                  <div key={catInfo.id} className={`animate-fade-in-up relative ${hasActiveDropdown ? 'z-[100]' : 'z-10'}`}>
                    
                    {/* Header Kategori dengan Tombol "Lihat Semua Materi" */}
                    <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                      <div className="flex items-center gap-3">
                        <div className="p-2.5 bg-blue-100 rounded-xl text-blue-600 shadow-sm border border-blue-200">
                          <catInfo.icon className="w-5 h-5" />
                        </div>
                        <h2 className="text-2xl font-extrabold text-slate-800">{catInfo.label}</h2>
                      </div>
                      
                      {/* Tombol Lihat Semua (Hanya muncul jika tab "Semua Kategori" aktif) */}
                      {activeTab === 'all' && (
                        <button 
                          onClick={() => setActiveTab(catInfo.id as Category)} 
                          className="text-sm font-bold text-blue-600 hover:text-blue-700 bg-blue-50 hover:bg-blue-100 px-4 py-2 rounded-lg transition-colors flex items-center gap-1 border border-blue-100"
                        >
                          Lihat Semua <ChevronRight className="w-4 h-4" />
                        </button>
                      )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 relative">
                      {sectionLanguages.map((lang) => {
                        const showProgress = isPremium && lang.total > 0;
                        const missingPrereqs = lang.prerequisites?.filter(reqId => !completedLangIds.has(reqId)) || [];
                        const isLockedByPrereq = missingPrereqs.length > 0;
                        const missingNames = missingPrereqs.map(reqId => languageData.find(l => l.id === reqId)?.name).join(', ');

                        return (
                          <div
                            key={lang.id}
                            onClick={() => {
                              if (!lang.comingSoon && !isLockedByPrereq && openDropdownId !== lang.id) {
                                setSelectedLanguage(lang.id);
                              }
                            }}
                            className={`group flex flex-col h-full bg-white rounded-2xl border border-slate-200 transition-all duration-300 ${openDropdownId === lang.id ? 'z-[110] relative shadow-xl ring-2 ring-blue-500/20' : 'z-10'} ${
                              lang.comingSoon ? 'opacity-70 cursor-not-allowed grayscale-[50%]' : 
                              isLockedByPrereq ? 'cursor-not-allowed opacity-80' : 
                              'cursor-pointer shadow-sm hover:shadow-xl hover:-translate-y-1 hover:border-slate-300'
                            }`}
                          >
                            {/* Card Header Thumbnail */}
                            <div className={`h-36 w-full rounded-t-2xl overflow-hidden ${lang.gradient} relative flex items-center justify-center`}>
                              <div className="absolute inset-0 bg-black/10 mix-blend-overlay"></div>
                              {lang.iconUrl ? (
                                <img src={lang.iconUrl} alt="icon" className="w-16 h-16 object-contain drop-shadow-2xl transform group-hover:scale-110 transition-transform duration-500" />
                              ) : (
                                <Boxes className="w-16 h-16 text-white drop-shadow-2xl transform group-hover:scale-110 transition-transform duration-500" />
                              )}
                              
                              {/* Badge */}
                              {lang.badge && !lang.comingSoon && (
                                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-slate-800 text-[10px] font-black px-2.5 py-1 rounded border border-white/50 shadow-sm uppercase tracking-wider">
                                  {lang.badge}
                                </div>
                              )}

                              {/* Coming Soon Overlay */}
                              {lang.comingSoon && (
                                <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center">
                                  <span className="flex items-center gap-1.5 text-white text-[11px] font-bold px-3 py-1.5 rounded-full bg-white/20 border border-white/30 uppercase tracking-widest shadow-lg">
                                    <Clock className="w-3 h-3" /> Segera Hadir
                                  </span>
                                </div>
                              )}
                            </div>

                            {/* Card Body */}
                            <div className="p-5 flex flex-col flex-1 relative bg-white">
                              {/* Ratings & Students */}
                              <div className="flex items-center gap-3 text-xs font-bold text-slate-500 mb-3">
                                <span className="flex items-center gap-1"><Star className="w-3.5 h-3.5 text-amber-500 fill-current" /> {lang.rating}</span>
                                <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
                                <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5" /> {lang.totalStudents} Siswa</span>
                              </div>

                              <h3 className="text-lg font-extrabold text-slate-900 mb-2 line-clamp-1 group-hover:text-blue-600 transition-colors">
                                {lang.name}
                              </h3>
                              <p className="text-sm font-medium text-slate-500 line-clamp-2 leading-relaxed mb-5">
                                {lang.description}
                              </p>

                              {/* Footer Action Area */}
                              <div className="mt-auto pt-4 border-t border-slate-100 relative">
                                {isLockedByPrereq ? (
                                  <div className="text-xs font-bold text-rose-600 bg-rose-50 p-2.5 rounded-lg border border-rose-100 flex flex-col gap-1">
                                    <span className="flex items-center gap-1.5 uppercase tracking-wide text-[10px]">
                                      <ShieldAlert className="w-3 h-3"/> Terkunci Prasyarat
                                    </span>
                                    <span className="text-slate-600 font-medium line-clamp-1">Selesaikan: <b className="text-slate-800">{missingNames}</b></span>
                                  </div>
                                ) : showProgress ? (
                                  <div className="relative">
                                    <div className="flex justify-between items-end text-[10px] font-extrabold text-slate-500 mb-2 uppercase tracking-widest">
                                      <span>Progress</span>
                                      <span className={lang.isComplete ? 'text-blue-600 text-xs' : 'text-slate-700'}>{lang.progress}%</span>
                                    </div>
                                    <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden mb-3">
                                      <div className="h-full bg-blue-500 rounded-full" style={{ width: `${lang.progress}%` }}></div>
                                    </div>

                                    {lang.isComplete && (
                                      <div className="relative w-full">
                                        <button
                                          onClick={(e) => { 
                                            e.stopPropagation(); 
                                            setOpenDropdownId(openDropdownId === lang.id ? null : lang.id); 
                                          }}
                                          disabled={generatingCert && openDropdownId === lang.id}
                                          className="w-full py-2 bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-bold rounded-lg border border-slate-200 flex items-center justify-between px-3 transition-colors"
                                        >
                                          <span className="flex items-center gap-2">
                                            {generatingCert && openDropdownId === lang.id ? <Loader2 className="w-3.5 h-3.5 animate-spin text-blue-600"/> : <Award className="w-3.5 h-3.5 text-amber-500"/>}
                                            Sertifikat
                                          </span>
                                          <ChevronDown className={`w-3.5 h-3.5 transition-transform ${openDropdownId === lang.id ? 'rotate-180' : ''}`} />
                                        </button>

                                        {openDropdownId === lang.id && (
                                          <>
                                            <div className="fixed inset-0 z-[9998]" onClick={(e) => { e.stopPropagation(); setOpenDropdownId(null); }}></div>
                                            <div className="absolute top-full left-0 mt-2 w-full bg-white rounded-xl shadow-xl border border-slate-200 z-[9999] overflow-hidden animate-fade-in-up" onClick={(e) => e.stopPropagation()}>
                                              <div className="p-1 flex flex-col">
                                                <button onClick={(e) => { e.stopPropagation(); processCertificate(lang.id, true, false); }} className="flex items-center gap-2 w-full p-2 text-left text-xs font-bold text-slate-600 hover:bg-slate-50 hover:text-blue-600 rounded-lg transition-colors">
                                                  <HardDrive className="w-3.5 h-3.5" /> Ke Perangkat
                                                </button>
                                                <button onClick={(e) => { e.stopPropagation(); processCertificate(lang.id, false, true); }} className="flex items-center gap-2 w-full p-2 text-left text-xs font-bold text-slate-600 hover:bg-slate-50 hover:text-blue-600 rounded-lg transition-colors">
                                                  <Cloud className="w-3.5 h-3.5" /> Ke CloudNest
                                                </button>
                                              </div>
                                            </div>
                                          </>
                                        )}
                                      </div>
                                    )}
                                  </div>
                                ) : !lang.comingSoon ? (
                                  <div className="flex items-center justify-between text-sm font-bold text-blue-600 group-hover:text-blue-700 transition-colors">
                                    <span>Mulai Belajar</span>
                                    <div className="w-6 h-6 rounded-full bg-blue-50 flex items-center justify-center group-hover:bg-blue-100 transition-colors transform group-hover:translate-x-1">
                                      <ChevronRight className="w-3.5 h-3.5" />
                                    </div>
                                  </div>
                                ) : null}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            // === BAGIAN DETAIL MODULE (Ketik dipilih) ===
            <div className="max-w-4xl mx-auto animate-fade-in-up">
              <button onClick={() => setSelectedLanguage(null)} className="group flex items-center gap-2 text-slate-500 hover:text-blue-600 mb-8 font-bold text-sm transition-colors bg-white px-4 py-2.5 rounded-full border border-slate-200 shadow-sm hover:shadow-md w-fit">
                <ArrowLeft className="w-4 h-4" /> Kembali ke Kategori
              </button>

              <div className="flex flex-col sm:flex-row sm:items-center gap-6 mb-10 p-6 sm:p-8 bg-white rounded-3xl border border-slate-200 relative overflow-hidden shadow-md">
                <div className="absolute right-0 top-0 w-64 h-full bg-gradient-to-l from-blue-500/5 to-transparent pointer-events-none"></div>
                <div className={`w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-gradient-to-br ${filteredLanguageStats.find(l => l.id === selectedLanguage)?.gradient} flex items-center justify-center shadow-lg z-10 shrink-0`}>
                  {filteredLanguageStats.find(l => l.id === selectedLanguage)?.iconUrl ? (
                    <img src={filteredLanguageStats.find(l => l.id === selectedLanguage)?.iconUrl} className="w-10 h-10 sm:w-12 sm:h-12 object-contain drop-shadow-md" alt="Icon" />
                  ) : (
                    <Boxes className="w-10 h-10 text-white" />
                  )}
                </div>
                <div className="z-10">
                  <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-3 tracking-tight">
                    {filteredLanguageStats.find(l => l.id === selectedLanguage)?.name}
                  </h2>
                  <div className="flex flex-wrap items-center gap-3 text-slate-600 text-sm font-medium">
                    <span className="bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200 flex items-center gap-1.5 font-bold shadow-sm">
                      <BookOpen className="w-4 h-4 text-blue-600" /> {materials.length} Modul
                    </span>
                    <span className="bg-amber-50 text-amber-700 px-3 py-1.5 rounded-lg border border-amber-200 flex items-center gap-1.5 font-bold shadow-sm">
                      <Star className="w-4 h-4 fill-current text-amber-500" /> {filteredLanguageStats.find(l => l.id === selectedLanguage)?.rating}
                    </span>
                    {isPremium && (
                       <span className="text-blue-700 font-bold bg-blue-50 px-3 py-1.5 rounded-lg border border-blue-200 flex items-center gap-1.5 shadow-sm">
                         <Target className="w-4 h-4" /> {filteredLanguageStats.find(l => l.id === selectedLanguage)?.progress}% Selesai
                       </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                {materials.length === 0 ? (
                   <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 border-dashed">
                      <Terminal className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                      <h3 className="text-xl font-bold text-slate-700">Modul Belum Tersedia</h3>
                      <p className="text-slate-500 mt-2 font-medium">Materi untuk kategori ini sedang dalam tahap penyusunan. Cek lagi nanti!</p>
                   </div>
                ) : (
                  materials.map((m, idx) => {
                    const locked = isModuleLocked(m.order);
                    const progress = isPremium ? getProgress(m.id) : 0;
                    const isCompleted = isPremium && progress === 100;
                    const hasQuiz = (m as any).has_quiz ?? (idx % 3 === 2); 
                    const hasExercise = (m as any).has_exercise ?? (idx % 2 === 1); 
                    const estTime = (m as any).estimated_time ?? 15;

                    return (
                      <div key={m.id} className={`group relative bg-white border border-slate-200 hover:border-blue-300 rounded-2xl p-5 sm:p-6 transition-all duration-300 shadow-sm ${locked ? 'opacity-70 bg-slate-50' : 'hover:shadow-md'}`} style={{ animationDelay: `${idx * 50}ms` }}>
                        <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 sm:items-start">
                          <div className={`flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center text-lg font-black transition-colors shadow-sm ${
                            isCompleted ? 'bg-emerald-50 text-emerald-600 border border-emerald-200' :
                            locked ? 'bg-slate-100 text-slate-400 border border-slate-200' :
                            'bg-blue-50 text-blue-600 border border-blue-200'
                          }`}>
                            {isCompleted ? <CheckCircle className="w-6 h-6" /> : locked ? <Lock className="w-5 h-5" /> : <PlayCircle className="w-6 h-6" />}
                          </div>

                          <div className="flex-1">
                            <div className="flex justify-between items-start mb-1">
                              <h3 className={`text-lg font-extrabold ${locked ? 'text-slate-500' : 'text-slate-900 group-hover:text-blue-600 transition-colors'}`}>
                                {m.order}. {m.title}
                              </h3>
                              {isPremium && !locked && (
                                <div className="flex gap-2">
                                  <button onClick={(e) => { e.stopPropagation(); toggleModuleCompletion(m.id, selectedLanguage!); }} className={`p-2.5 rounded-lg transition-all border shadow-sm ${isCompleted ? 'bg-emerald-50 text-emerald-600 border-emerald-200 hover:bg-emerald-100' : 'bg-white text-slate-400 border-slate-200 hover:bg-slate-50 hover:text-blue-600 hover:border-blue-200'}`} title={isCompleted ? "Batal Selesai" : "Tandai Selesai"}>
                                    <CheckCircle className="w-4 h-4" />
                                  </button>
                                  {plan === 'plus' && (
                                    <button className="p-2.5 rounded-lg bg-indigo-50 text-indigo-600 border border-indigo-200 hover:bg-indigo-100 transition-all shadow-sm" title="Unduh Materi">
                                      <Download className="w-4 h-4" />
                                    </button>
                                  )}
                                </div>
                              )}
                            </div>
                            
                            <p className="text-slate-600 text-sm line-clamp-2 leading-relaxed font-medium mb-3 pr-8">{m.description}</p>
                            
                            <div className="flex flex-wrap items-center gap-2 mb-4">
                               <span className="flex items-center gap-1 text-[10px] font-extrabold px-2.5 py-1 rounded bg-slate-100 text-slate-600 border border-slate-200 shadow-sm uppercase tracking-wider">
                                 <Clock className="w-3 h-3" /> ~{estTime} Min
                               </span>
                            </div>
                            
                            <div className="flex flex-wrap items-center gap-2 sm:gap-3 mt-4 pt-4 border-t border-slate-100">
                              <button
                                onClick={() => !locked && handleStartModule(m.id, selectedLanguage!)}
                                disabled={locked}
                                className={`flex-1 sm:flex-none px-6 py-2.5 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-all ${
                                  locked ? 'bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200 shadow-none' :
                                  isCompleted ? 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 hover:text-blue-600 shadow-sm' :
                                  'bg-gradient-to-r from-blue-600 to-cyan-500 text-white hover:shadow-lg border border-blue-400/50 hover:-translate-y-0.5'
                                }`}
                              >
                                {locked ? 'Terkunci (Pro ke atas)' : isCompleted ? 'Ulangi Materi' : 'Mulai Belajar'}
                                {!locked && <ChevronRight className="w-4 h-4" />}
                              </button>

                              {!locked && hasQuiz && (
                                <button onClick={() => navigate(`/quiz/${m.id}`)} className="px-5 py-2.5 bg-purple-50 text-purple-700 hover:bg-purple-100 border border-purple-200 rounded-xl text-sm font-bold transition-all shadow-sm hover:shadow-md flex items-center justify-center gap-2 flex-1 sm:flex-none">
                                  <Brain className="w-4 h-4" /> Kuis
                                </button>
                              )}

                              {!locked && hasExercise && (
                                <button onClick={() => navigate(`/exercise/${m.id}`)} className="px-5 py-2.5 bg-amber-50 text-amber-700 hover:bg-amber-100 border border-amber-200 rounded-xl text-sm font-bold transition-all shadow-sm hover:shadow-md flex items-center justify-center gap-2 flex-1 sm:flex-none">
                                  <PenTool className="w-4 h-4" /> Praktik
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}

                {materials.length > 0 && selectedLanguage && (
                  <div className="mt-12 bg-gradient-to-br from-white to-slate-50 rounded-3xl border border-slate-200 p-8 shadow-md relative overflow-hidden">
                    {ratingSuccess ? (
                      <div className="text-center py-6 animate-fade-in-up">
                        <div className="w-16 h-16 bg-emerald-100 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4 border-4 border-emerald-50">
                          <CheckCircle className="w-8 h-8" />
                        </div>
                        <h3 className="text-2xl font-black text-slate-800 mb-2">Terima Kasih!</h3>
                        <p className="text-slate-500 font-medium">Ulasan kamu sangat berarti untuk perkembangan materi Coreline.</p>
                      </div>
                    ) : (
                      <form onSubmit={handleSubmitRating} className="relative z-10">
                        <div className="text-center mb-6">
                          <h3 className="text-2xl font-black text-slate-800 mb-2">Bagaimana pengalaman belajarmu?</h3>
                          <p className="text-slate-500 text-sm font-medium">Beri nilai untuk materi <span className="font-bold text-blue-600">{filteredLanguageStats.find(l => l.id === selectedLanguage)?.name}</span></p>
                        </div>
                        
                        <div className="flex justify-center gap-2 mb-6">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <button
                              key={star}
                              type="button"
                              onMouseEnter={() => setHoverRating(star)}
                              onMouseLeave={() => setHoverRating(0)}
                              onClick={() => setUserRating(star)}
                              className="focus:outline-none transform transition-transform hover:scale-110"
                            >
                              <Star className={`w-10 h-10 transition-colors ${
                                star <= (hoverRating || userRating) 
                                  ? 'fill-amber-400 text-amber-500 drop-shadow-md' 
                                  : 'text-slate-300'
                              }`} />
                            </button>
                          ))}
                        </div>

                        <div className="max-w-xl mx-auto">
                          <textarea 
                            value={reviewText}
                            onChange={(e) => setReviewText(e.target.value)}
                            placeholder="Tulis ulasanmu di sini (opsional)..."
                            className="w-full bg-white border border-slate-200 rounded-xl p-4 text-sm font-medium text-slate-700 placeholder:text-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all resize-none shadow-sm mb-4"
                            rows={3}
                          ></textarea>
                          
                          <button 
                            type="submit" 
                            disabled={userRating === 0 || isSubmittingRating}
                            className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-bold rounded-xl flex items-center justify-center gap-2 transition-all shadow-md"
                          >
                            {isSubmittingRating ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-4 h-4" />}
                            Kirim Penilaian
                          </button>
                        </div>
                      </form>
                    )}
                  </div>
                )}

              </div>
            </div>
          )}

          {!selectedLanguage && (
            <div className="mt-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl p-8 md:p-12 relative overflow-hidden shadow-xl animate-fade-in-up" style={{animationDelay: '300ms'}}>
               <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none"></div>
               <div className="absolute bottom-0 left-0 w-40 h-40 bg-black/10 rounded-full blur-2xl -ml-10 -mb-10 pointer-events-none"></div>
               
               <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                  <div className="text-center md:text-left">
                     <h2 className="text-2xl md:text-3xl font-black text-white mb-3 flex items-center gap-3 justify-center md:justify-start">
                       <HelpCircle className="w-8 h-8 text-yellow-300" /> Butuh Bantuan Belajar?
                     </h2>
                     <p className="text-blue-100 font-medium max-w-lg leading-relaxed">
                       Jangan sungkan menggunakan fitur bot di pojok kanan bawah, atau gabung forum komunitas kami!
                     </p>
                  </div>
               </div>
            </div>
          )}

        </div>
      </main>

      <footer className="bg-white border-t border-slate-200 py-8 relative z-10">
        <div className="container mx-auto px-6 text-center text-slate-500 font-medium">
          <p className="mb-2">&copy; {new Date().getFullYear()} Coreline by AstByte. All rights reserved.</p>
          <div className="flex items-center justify-center gap-2 text-xs font-bold bg-slate-50 px-3 py-1.5 rounded-full border border-slate-200 w-fit mx-auto shadow-sm">
            <RefreshCw className="w-3 h-3 text-blue-500" /> Last Update: {LAST_UPDATE}
          </div>
        </div>
      </footer>

      <CoreBot />
      
      <style>{`
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fade-in-up { animation: fadeInUp 0.4s ease-out forwards; }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}