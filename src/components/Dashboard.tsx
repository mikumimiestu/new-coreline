import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import type { LearningMaterial } from '../types/learning';
import { MOCK_MATERIALS as STUDENT_MATERIALS } from '../data/mockData';
import { MOCK_MATERIALS as OTHER_MATERIALS } from '../data/otherData';
import ProfilePage from './ProfilePage';
import {
  LogOut, BookOpen, Award, ChevronRight, X, User as UserIcon,
  Menu, Languages, Loader2, Search, Filter, Crown, Lock,
  Download, CheckCircle, FileText, RefreshCw
} from 'lucide-react';

/* ================================
 * Config & Types
 * ================================ */
const API_BASE = 'https://authx.astbyte.com';

type Lang = {
  id: 'python' | 'php' | 'javascript' | 'typescript' | 'ruby' | 'go' | 'mysql' | 'postgresql';
  name: string;
  iconUrl: string;
  comingSoon?: boolean;
};

const languageData: readonly Lang[] = [
  { id: 'python', name: 'Python', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
  { id: 'php', name: 'PHP', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg' },
  { id: 'javascript', name: 'JavaScript', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
  { id: 'typescript', name: 'TypeScript', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg' },
  { id: 'ruby', name: 'Ruby', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/ruby/ruby-original.svg' },
  { id: 'go', name: 'Go', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original.svg', comingSoon: true },
  { id: 'mysql', name: 'MySQL', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg', comingSoon: true },
  { id: 'postgresql', name: 'PostgreSQL', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg', comingSoon: true },
] as const;

type Level = 'beginner' | 'intermediate' | 'advanced';
type SortKey = 'order' | 'title' | 'level';
type Plan = 'free' | 'pro' | 'plus';

/* ================================
 * Main Component
 * ================================ */
export default function Dashboard() {
  // CATATAN: Token Login (JWT) tetap butuh disimpan di localstorage/cookie browser 
  // sebagai "Kunci" identitas user. Tapi DATA PROGRESS-nya kita ambil murni server.
  const { user, logout, loading: authLoading } = useAuth(); 
  const navigate = useNavigate();

  // --- States ---
  const [materials, setMaterials] = useState<LearningMaterial[]>([]);
  // Filter bahasa boleh disimpan di local biar user gak capek filter ulang
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(() =>
    typeof window !== 'undefined' ? localStorage.getItem('cl_lang') : null
  );
  
  const [progressMap, setProgressMap] = useState<Record<string, number>>({});
  const [isSyncing, setIsSyncing] = useState(false);
  const [isFetchingProgress, setIsFetchingProgress] = useState(true); // Loading state khusus progress

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

  // --- 1. LOAD PROGRESS (Murni Database / Server Side) ---
  useEffect(() => {
    let isMounted = true;

    const fetchProgressFromServer = async () => {
      if (!user) return;
      
      // Ambil Token auth (Kunci masuk)
      // Kita coba ambil dari berbagai sumber agar di HP terbaca
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
            // Langsung pakai data dari database, abaikan data lokal
            const dbData = result.data || {};
            console.log("Database Sync OK:", dbData);
            setProgressMap(dbData);
          }
        } else {
            console.error("Gagal ambil data database:", response.status);
        }
      } catch (error) {
        console.error("Koneksi Database Error:", error);
      } finally {
        if (isMounted) setIsFetchingProgress(false);
      }
    };

    fetchProgressFromServer();

    return () => { isMounted = false; };
  }, [user]); // Re-fetch cuma kalau user berubah (login)

  // Debounce search
  useEffect(() => {
    const t = setTimeout(() => setQuery(searchText), 300);
    return () => clearTimeout(t);
  }, [searchText]);

  // Persist lang selection only
  useEffect(() => {
    if (selectedLanguage) localStorage.setItem('cl_lang', selectedLanguage);
    else localStorage.removeItem('cl_lang');
  }, [selectedLanguage]);

  // --- Logic Helpers ---
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
      beginner: 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20',
      intermediate: 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-500/10 dark:text-amber-400 dark:border-amber-500/20',
      advanced: 'bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-500/10 dark:text-rose-400 dark:border-rose-500/20',
    };
    return map[level] || 'bg-slate-50 text-slate-700 border-slate-200';
  };

  const levelLabel: Record<Level, string> = {
    beginner: 'Pemula',
    intermediate: 'Menengah',
    advanced: 'Lanjutan',
  };

  // --- 2. UPDATE PROGRESS KE SERVER (Revised) ---
  const toggleModuleCompletion = async (materialId: string) => {
    if (!isPremium || !user) return;

    // Ambil Token
    let token = localStorage.getItem('astbyte_token');
    if (!token && (user as any).token) token = (user as any).token;

    if (!token) {
        alert("Sesi habis, silakan login ulang.");
        return;
    }

    const currentProgress = progressMap[materialId] || 0;
    const newProgress = currentProgress === 100 ? 0 : 100;
    
    // Optimistic Update (Update UI biar user ngerasa cepet)
    // TAPI tidak kita simpan ke localStorage, cuma state sementara
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
      
      if (!response.ok) {
        throw new Error("Gagal update database");
      }
      // Sukses? Kita tidak perlu ngapa-ngapain karena state UI sudah update
      // Dan data di database sudah tersimpan.
    } catch (err) {
      console.error("Gagal sync ke server:", err);
      // Revert UI jika gagal (Kembalikan ke status sebelumnya)
      alert("Gagal menyimpan ke database. Cek koneksi internet.");
      setProgressMap(prev => ({ ...prev, [materialId]: currentProgress }));
    } finally {
      setIsSyncing(false);
    }
  };

  const getProgress = (id: string) => progressMap[id] || 0;

  // Check eligibility for certificate
  const checkCertificateEligibility = () => {
    if (!selectedLanguage) return false;
    if (materials.length === 0) return false;
    if (!isPremium) return false;
    const allCompleted = materials.every(m => (progressMap[m.id] || 0) === 100);
    return allCompleted;
  };

  // --- Certificate Generator (Client Side PDF) ---
  const generateCertificate = async () => {
    if (!selectedLanguage || !user || !isPremium) return;
    setGeneratingCert(true);

    try {
      const { default: jsPDF } = await import('jspdf');
      // Format A4 Landscape
      const doc = new jsPDF({ orientation: 'landscape', unit: 'mm', format: 'a4' });
      
      const width = doc.internal.pageSize.getWidth();
      const height = doc.internal.pageSize.getHeight();
      
      // Modern Color Palette
      const colors = {
        navy: [10, 25, 47] as [number, number, number], // Deep Navy
        gold: [197, 160, 89] as [number, number, number], // Muted Gold
        white: [255, 255, 255] as [number, number, number],
        lightGrey: [240, 240, 240] as [number, number, number],
        darkGrey: [50, 50, 50] as [number, number, number],
        textGrey: [100, 100, 100] as [number, number, number]
      };

      // 1. Background Clean
      doc.setFillColor(...colors.white);
      doc.rect(0, 0, width, height, 'F');

      // 2. Desain Geometris Modern (Aksen Kiri & Kanan)
      // Blok Navy di Kiri
      doc.setFillColor(...colors.navy);
      doc.rect(0, 0, 15, height, 'F'); 

      // Segitiga Emas di Pojok Kanan Atas
      doc.setFillColor(...colors.gold);
      doc.triangle(width, 0, width - 60, 0, width, 60, 'F');
      
      // Aksen Garis Bawah
      doc.setDrawColor(...colors.navy);
      doc.setLineWidth(1);
      doc.line(25, height - 20, width - 25, height - 20);

      // --- KONTEN ---
      
      const centerX = (width + 15) / 2; // Center offset karena ada sidebar kiri 15mm

      // HEADER: Company Name (Kecil di atas)
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(...colors.textGrey);
      doc.setFontSize(10);
      doc.text('ASTRAL BYTE TECHNOLOGY', 25, 20);

      // TITLE: CERTIFICATE
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(...colors.navy);
      doc.setFontSize(50);
      doc.setCharSpace(2); // Huruf agak renggang biar elegan
      doc.text('CERTIFICATE', centerX, 60, { align: 'center' });

      // SUBTITLE: OF ACHIEVEMENT
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(...colors.gold);
      doc.setFontSize(16);
      doc.setCharSpace(4);
      doc.text('OF ACHIEVEMENT', centerX, 70, { align: 'center' });

      // NAMA USER
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(...colors.darkGrey);
      doc.setFontSize(36);
      doc.setCharSpace(0);
      const userName = user.full_name || 'Student Name';
      doc.text(userName, centerX, 100, { align: 'center' });

      // GARIS DI BAWAH NAMA (Pemisah)
      doc.setDrawColor(...colors.gold);
      doc.setLineWidth(0.5);
      doc.line(centerX - 40, 105, centerX + 40, 105);

      // BODY TEXT
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(...colors.textGrey);
      doc.setFontSize(12);
      doc.text('This certificate is proudly presented to the above mentioned for', centerX, 118, { align: 'center' });
      doc.text('successfully demonstrating professional mastery in:', centerX, 124, { align: 'center' });

      // NAMA KURSUS (LANGUAGE)
      const langName = languageData.find(l => l.id === selectedLanguage)?.name || selectedLanguage?.toUpperCase();
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(...colors.navy);
      doc.setFontSize(24);
      doc.text(`${langName} PROGRAMMING`, centerX, 140, { align: 'center' });

      // --- FOOTER & SIGNATURE ---
      
      const dateStr = new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
      // Generate Fake ID
      const certID = `ID: ABT-${Math.floor(100000 + Math.random() * 900000)}-${new Date().getFullYear()}`;

      const bottomY = 165;
      
      // Kolom Kiri: Tanggal
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(...colors.textGrey);
      doc.setFontSize(10);
      doc.text('Date Issued', 50, bottomY);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(...colors.darkGrey);
      doc.setFontSize(12);
      doc.text(dateStr, 50, bottomY + 7);

      // Kolom Kanan: Tanda Tangan (Simulasi)
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(...colors.textGrey);
      doc.setFontSize(10);
      doc.text('Authorized Signature', width - 60, bottomY, { align: 'center' });
      
      // Garis Tanda Tangan
      doc.setDrawColor(...colors.navy);
      doc.line(width - 80, bottomY + 5, width - 40, bottomY + 5);
      
      doc.setFont('helvetica', 'bolditalic'); // Simulasi tanda tangan
      doc.setTextColor(...colors.navy);
      doc.setFontSize(14);
      doc.text('AstByte Team', width - 60, bottomY - 2, { align: 'center' });

      // CERTIFICATE ID (Pojok Kiri Bawah - Kecil)
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(150, 150, 150);
      doc.setFontSize(8);
      doc.text(certID, 25, height - 10);

      // Simpan
      doc.save(`Certificate_${langName}_${user.full_name.replace(/\s+/g, '_')}.pdf`);

    } catch (err) {
      console.error(err);
      alert("Gagal membuat sertifikat");
    } finally {
      setGeneratingCert(false);
    }
  };

  // --- PDF Module Logic ---
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
         if(el instanceof HTMLElement) el.style.color = 'black'; 
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

  // --- Data Loading ---
  useEffect(() => {
    if (!user) return;
    setLoading(true);
    const allMaterials: LearningMaterial[] = [...STUDENT_MATERIALS, ...OTHER_MATERIALS];
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

  // --- Auth Checks ---
  if (authLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-950 gap-4">
        <Loader2 className="h-10 w-10 animate-spin text-blue-600 dark:text-cyan-400" />
        <p className="text-sm font-medium text-slate-500 animate-pulse">Memuat data...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 px-4">
        <div className="max-w-md w-full bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 p-8 text-center">
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Sesi Berakhir</h1>
          <p className="text-slate-600 dark:text-slate-400 mb-6">Silakan login kembali untuk mengakses materi.</p>
          <Link to="/login" className="block w-full rounded-xl bg-blue-600 py-3 text-sm font-bold text-white hover:bg-blue-700 transition">
            Masuk Sekarang
          </Link>
        </div>
      </div>
    );
  }

  if (showProfile) return <ProfilePage onBack={() => setShowProfile(false)} />;

  /* ================================
   * Sub-Components (Internal)
   * ================================ */
  const Sidebar = ({ mobile }: { mobile?: boolean }) => (
    <div className={`flex flex-col gap-3 ${mobile ? '' : 'sticky top-24'}`}>
      {!mobile && (
        <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-2 flex items-center gap-2">
          <Languages className="w-5 h-5 text-blue-600" />
          Filter Bahasa
        </h3>
      )}
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
              group relative flex items-center gap-3 p-3 rounded-xl border text-left transition-all
              ${active 
                ? 'bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-500/30' 
                : 'bg-white dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'}
              ${lang.comingSoon ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer hover:-translate-y-0.5'}
            `}
          >
            <img src={lang.iconUrl} alt={lang.name} className="h-6 w-6 object-contain" />
            <span className="font-semibold text-sm flex-1">{lang.name}</span>
            {lang.comingSoon && <Lock className="w-3 h-3 text-slate-400" />}
          </button>
        );
      })}
      {selectedLanguage && (
        <button 
          onClick={() => setSelectedLanguage(null)} 
          className="mt-2 text-xs font-semibold text-red-500 hover:text-red-600 flex items-center justify-center gap-1"
        >
          <X className="w-3 h-3" /> Reset Filter
        </button>
      )}
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] dark:bg-[#0B0F19] font-sans">
      
      {/* NAVBAR */}
      <nav className="sticky top-0 z-40 w-full border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-3">
              <Link to="/" className="flex items-center gap-2 group">
                <div className="h-9 w-9 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-xl shadow-blue-500/30 shadow-lg group-hover:scale-105 transition-transform">C</div>
                <div className="hidden sm:block">
                  <h1 className="text-lg font-bold text-slate-900 dark:text-white leading-none">Coreline</h1>
                  <span className="text-[10px] font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-widest">Learning</span>
                </div>
              </Link>
            </div>

            <div className="flex items-center gap-2 sm:gap-4">
              {isSyncing && (
                <div className="hidden md:flex items-center gap-1.5 text-xs font-medium text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-full animate-pulse">
                  <RefreshCw className="w-3 h-3 animate-spin" />
                  Saving...
                </div>
              )}

              <div className="hidden md:flex flex-col items-end mr-2">
                <span className="text-sm font-bold text-slate-800 dark:text-white">{user.full_name}</span>
                <span className="text-[10px] text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full">
                  {plan === 'free' ? 'Starter Plan' : `${plan} Plan`}
                </span>
              </div>
              
              {userType === 'student' && (
                <button
                  onClick={() => setIsSidebarOpen(true)}
                  className="lg:hidden p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg"
                >
                  <Menu className="w-5 h-5" />
                </button>
              )}

              <button onClick={() => setShowProfile(true)} className="p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors">
                <UserIcon className="w-5 h-5" />
              </button>
              <button onClick={logout} className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors">
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* MOBILE DRAWER */}
      {isSidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fade-in" onClick={() => setIsSidebarOpen(false)} />
          <div className="absolute left-0 top-0 h-full w-4/5 max-w-xs bg-white dark:bg-slate-900 shadow-2xl p-6 overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">Menu</h2>
              <button onClick={() => setIsSidebarOpen(false)}><X className="w-6 h-6 text-slate-500" /></button>
            </div>
            <Sidebar mobile />
          </div>
        </div>
      )}

      {/* MAIN CONTENT */}
      <main className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* HEADER & TOOLBAR */}
        <div className="mb-8 space-y-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-2">
                {userTitle}
              </h1>
              <p className="text-slate-600 dark:text-slate-400 text-lg">
                Selamat datang kembali, mari lanjutkan progressmu.
              </p>
            </div>
            {!isPremium && (
              <div className="hidden md:flex items-center gap-3 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 px-4 py-2 rounded-xl border border-amber-200 dark:border-amber-800/50">
                <Crown className="w-5 h-5 text-amber-600 dark:text-amber-500" />
                <div className="text-sm">
                  <span className="font-bold text-amber-800 dark:text-amber-400">Upgrade Plan?</span>
                  <Link to={nextHref} className="ml-2 text-amber-600 dark:text-amber-500 underline hover:text-amber-700">Lihat Harga</Link>
                </div>
              </div>
            )}
          </div>

          {/* Search & Sort */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                placeholder="Cari materi pembelajaran..."
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500 transition-shadow shadow-sm"
              />
            </div>
            <div className="flex items-center gap-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 shadow-sm">
              <Filter className="w-4 h-4 text-slate-400" />
              <select
                value={sortKey}
                onChange={(e) => setSortKey(e.target.value as SortKey)}
                className="bg-transparent outline-none text-sm font-medium text-slate-700 dark:text-slate-200 cursor-pointer"
              >
                <option value="order">Urutan Modul</option>
                <option value="title">Judul (A-Z)</option>
                <option value="level">Tingkat Kesulitan</option>
              </select>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* SIDEBAR (Desktop) */}
          <div className="hidden lg:block lg:col-span-3">
             <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm sticky top-24">
               <Sidebar />
             </div>
          </div>

          {/* MATERIAL GRID */}
          <div className={userType === 'student' ? 'lg:col-span-9' : 'lg:col-span-12'}>
            
            {checkCertificateEligibility() && (
              <div className="mb-6 p-6 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg flex flex-col sm:flex-row items-center justify-between gap-4 animate-fade-in">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-white/20 rounded-full">
                    <Award className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold">Selamat! Anda Lulus.</h2>
                    <p className="text-blue-100 text-sm">
                      Anda telah menyelesaikan semua modul {languageData.find(l => l.id === selectedLanguage)?.name}.
                    </p>
                  </div>
                </div>
                <button
                  onClick={generateCertificate}
                  disabled={generatingCert}
                  className="px-6 py-3 bg-white text-blue-600 rounded-xl font-bold shadow-sm hover:bg-blue-50 transition-colors flex items-center gap-2 disabled:opacity-70"
                >
                  {generatingCert ? <Loader2 className="w-5 h-5 animate-spin"/> : <FileText className="w-5 h-5"/>}
                  {generatingCert ? 'Membuat...' : 'Klaim Sertifikat'}
                </button>
              </div>
            )}

            <div className="flex items-center gap-2 mb-6">
              <BookOpen className="w-5 h-5 text-slate-400" />
              <h2 className="text-lg font-bold text-slate-800 dark:text-white">Daftar Modul</h2>
              <span className="ml-auto text-sm font-semibold text-slate-500 bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full">
                {materials.length} Materi
              </span>
            </div>

            {loading ? (
               <div className="py-20 text-center">
                 <Loader2 className="w-10 h-10 animate-spin text-blue-500 mx-auto mb-4" />
                 <p className="text-slate-500">Menyiapkan materi...</p>
               </div>
            ) : materials.length === 0 ? (
               <div className="bg-white dark:bg-slate-900 rounded-2xl border border-dashed border-slate-300 dark:border-slate-700 p-12 text-center">
                 <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
                   <Search className="w-8 h-8 text-slate-400" />
                 </div>
                 <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Tidak ditemukan</h3>
                 <p className="text-slate-500">Coba ubah filter bahasa atau kata kunci pencarian.</p>
               </div>
            ) : (
              <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {materials.map((m, idx) => {
                  const locked = isModuleLocked(m.order);
                  const isDownloading = downloadingPdf === m.id;
                  
                  // Progress Logic: Murni dari State (yang didapat dari DB)
                  const progress = isPremium ? getProgress(m.id) : 0;
                  const isCompleted = isPremium && progress === 100;

                  return (
                    <div 
                      key={m.id}
                      className={`group relative flex flex-col rounded-2xl bg-white dark:bg-slate-900 border transition-all duration-300
                        ${locked 
                          ? 'border-slate-200 dark:border-slate-800 overflow-hidden' 
                          : 'border-slate-200 dark:border-slate-800 hover:border-blue-500/50 hover:shadow-xl hover:-translate-y-1'
                        }
                      `}
                      style={{ animation: `fadeInUp 0.4s ease-out forwards`, animationDelay: `${idx * 50}ms`, opacity: 0 }}
                    >
                      <div className={`p-6 flex-1 ${locked ? 'blur-[2px] opacity-60 pointer-events-none' : ''}`}>
                        <div className="flex justify-between items-start mb-4">
                          <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${locked ? 'bg-slate-100 dark:bg-slate-800' : isCompleted ? 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400' : 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'}`}>
                             {isCompleted ? <CheckCircle className="w-5 h-5"/> : <Award className="w-5 h-5" />}
                          </div>
                          <span className={`px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider border ${levelPill(m.level as Level)}`}>
                            {levelLabel[m.level as Level]}
                          </span>
                        </div>
                        
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 line-clamp-2 min-h-[3.5rem]">
                          {m.order}. {m.title}
                        </h3>
                        <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-3 mb-4">
                          {m.description}
                        </p>

                        {isPremium && (
                          <div className="mb-4">
                            <div className="flex justify-between text-xs font-semibold mb-1">
                               <span className={isCompleted ? 'text-green-600' : 'text-slate-500'}>
                                 {isFetchingProgress ? 'Syncing DB...' : isCompleted ? 'Selesai' : 'Progress'}
                               </span>
                               <span className="text-slate-700 dark:text-slate-300">{progress}%</span>
                            </div>
                            <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                               {isFetchingProgress ? (
                                   <div className="h-full bg-blue-400/50 animate-pulse w-full"></div>
                               ) : (
                                   <div 
                                     className={`h-full transition-all duration-500 ${isCompleted ? 'bg-green-500' : 'bg-blue-500'}`} 
                                     style={{ width: `${progress}%` }}
                                   />
                               )}
                            </div>
                          </div>
                        )}

                        {m.language && (
                           <div className="flex items-center gap-2">
                             <span className="w-2 h-2 rounded-full bg-slate-300 dark:bg-slate-600"></span>
                             <span className="text-xs font-semibold text-slate-500 uppercase">{m.language}</span>
                           </div>
                        )}
                      </div>

                      {!locked && (
                          <div className="p-4 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 rounded-b-2xl mt-auto">
                             <div className="flex gap-2 mb-2">
                              <Link 
                                to={`/materials/${encodeURIComponent(m.id)}`}
                                className="flex-1 inline-flex justify-center items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold py-2.5 rounded-xl transition-colors"
                              >
                                {isCompleted ? 'Ulangi' : 'Mulai'} <ChevronRight className="w-4 h-4" />
                              </Link>
                              
                              {plan === 'plus' && (
                                <button
                                  onClick={() => downloadModulePDF(m)}
                                  disabled={isDownloading}
                                  className="px-3 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:text-blue-600 rounded-xl hover:border-blue-300 transition-colors"
                                  title="Download PDF"
                                >
                                  {isDownloading ? <Loader2 className="w-5 h-5 animate-spin"/> : <Download className="w-5 h-5"/>}
                                </button>
                              )}
                             </div>
                             
                             {isPremium && (
                               <button 
                                  onClick={() => toggleModuleCompletion(m.id)}
                                  className={`w-full text-xs font-medium py-1.5 rounded-lg border transition-colors ${isCompleted ? 'bg-green-50 text-green-700 border-green-200 hover:bg-green-100' : 'bg-white text-slate-500 border-slate-200 hover:text-blue-600'}`}
                               >
                                  {isCompleted ? 'Tandai Belum Selesai' : 'Tandai Selesai (Simpan ke Server)'}
                               </button>
                             )}
                          </div>
                      )}

                      {locked && (
                        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-white/40 dark:bg-black/40 backdrop-blur-[1px]">
                           <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-2xl text-center border border-slate-200 dark:border-slate-700 max-w-[80%]">
                             <div className="w-12 h-12 bg-amber-100 dark:bg-amber-900/30 text-amber-600 rounded-full flex items-center justify-center mx-auto mb-3">
                               <Lock className="w-6 h-6" />
                             </div>
                             <h4 className="font-bold text-slate-900 dark:text-white mb-1">Premium</h4>
                             <p className="text-xs text-slate-500 mb-4">Upgrade untuk membuka.</p>
                             <Link to="/pricing" className="inline-block px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold rounded-lg transition-colors">
                               Upgrade
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

      <footer className="mt-auto border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 py-8">
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <p className="text-xs text-slate-400">
            &copy; {new Date().getFullYear()} Astral Byte Technology (AstByte). All rights reserved.
          </p>
           <div className="flex items-center justify-center gap-4 text-slate-400 text-sm mb-2">
            <p className='hover:text-blue-500 transition-colors text-xs'>v.1.1 (Beta)</p>
          </div>
        </div>
      </footer>

      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in { animation: fadeInUp 0.3s ease-out forwards; }
      `}</style>
    </div>
  );
}