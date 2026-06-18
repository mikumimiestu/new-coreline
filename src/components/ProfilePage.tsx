import { useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import {
  User as UserIcon, Mail, Phone, CreditCard, ArrowLeft, Copy, Check,
  ShieldCheck, Loader2, Sparkles, Calendar, Crown, Edit3, X, Eye, EyeOff,
  Zap, CheckCircle, ExternalLink, AlertCircle, Layout, Trophy, BookOpen,
  Activity, Star, Settings, MessageCircle, Heart, Receipt
} from 'lucide-react';

// Import Data Materi buat nyocokin ID dengan Judul Modul
import { MOCK_MATERIALS as OTHER_MATERIALS } from '../data/otherData';
import { MOCK_MATERIALS as PYTHON_MATERIALS } from '../data/pythonData';
import { MOCK_MATERIALS as GO_MATERIALS } from '../data/golangData';
import { MOCK_MATERIALS as MYSQL_MATERIALS } from '../data/mysqlData';
import { MOCK_MATERIALS as TS_MATERIAL } from '../data/tsData';
import { MOCK_MATERIALS as JS_MATERIAL } from '../data/jsData';
import { MOCK_MATERIALS as PSQL_MATERIAL } from '../data/posgresData';
import { MOCK_MATERIALS as RB_MATERIAL } from '../data/rubyData';
import { MOCK_MATERIALS as PYTHON_DA_MATERIALS } from '../data/pythonDataAnalysis';
import { MOCK_MATERIALS as ENG_MATERIALS } from '../data/englishTechData';
import { MOCK_MATERIALS as JP_MATERIALS } from '../data/japaneseData';
import { MOCK_MATERIALS as UIUX_MATERIALS } from '../data/uiuxData';
import { MOCK_MATERIALS as AGILE_MATERIALS } from '../data/agileScrumData';
import { MOCK_MATERIALS as PM_MATERIALS } from '../data/productManagementData';

/* ================================
 * CONFIG & TYPES
 * ================================ */
const AUTHX_BASE = 'https://authx.astbyte.com';

interface Subscription {
  id: number;
  email: string;
  public_id: string;
  subscribe_type: string;
  period: string;
  start_date: string;
  end_date: string;
  payment_method: string;
  status?: 'active' | 'expired';
}

interface ProfilePageProps {
  onBack: () => void;
}

// Map ID bahasa ke Nama Keren Course-nya
const COURSE_NAME_MAP: Record<string, string> = {
  'javascript': 'JavaScript',
  'typescript': 'TypeScript',
  'php': 'PHP',
  'nodejs': 'Node.js',
  'react': 'React.js',
  'vuejs': 'Vue.js',
  'nextjs': 'Next.js',
  'reactnative': 'React Native',
  'python': 'Python',
  'go': 'Go (Golang)',
  'sql': 'MySQL',
  'postgresql': 'PostgreSQL',
  'docker': 'Docker',
  'kubernetes': 'Kubernetes',
  'english-tech': 'English for Tech',
  'japanese': 'Japanese N5-N4',
  'py-da': 'Python Data Analysis',
  'ui-ux': 'UI/UX Design',
  'agile-scrum': 'Agile & Scrum',
  'product-management': 'Product Management'
};

/* ================================
 * MAIN COMPONENT
 * ================================ */
export default function ProfilePage({ onBack }: ProfilePageProps) {
  const { user } = useAuth();
  const navigate = useNavigate();

  // Data State
  const [authUser, setAuthUser] = useState<any>(null);
  const [subs, setSubs] = useState<Subscription[]>([]);
  const [progressMap, setProgressMap] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);

  // UI State
  const [showEditModal, setShowEditModal] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showPublicId, setShowPublicId] = useState(false);
  const [photoError, setPhotoError] = useState(false);

  // --- 1. LOAD DATA ---
  useEffect(() => {
    const token = localStorage.getItem('astbyte_token') || (user as any)?.token;
    
    if (!token) {
      setLoading(false);
      return;
    }

    async function loadData() {
      try {
        // Fetch User Detail
        const meRes = await fetch(`${AUTHX_BASE}/api/auth/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const meData = await meRes.json();
        if (meRes.ok) setAuthUser(meData.data.user);

        // Fetch Subscriptions
        const subRes = await fetch(`${AUTHX_BASE}/api/subscriptions/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const subData = await subRes.json();
        if (subRes.ok && subData?.data?.subscriptions) {
          setSubs(subData.data.subscriptions);
        }

        // Fetch Progress Pembelajaran
        const progRes = await fetch(`${AUTHX_BASE}/api/learning/progress`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const progData = await progRes.json();
        if (progRes.ok) {
          setProgressMap(progData.data || {});
        }

      } catch (e) {
        console.error('Load error:', e);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [user]);

  // --- 2. ACTIONS ---
  const handleCopyId = () => {
    if (!authUser?.public_id) return;
    navigator.clipboard.writeText(authUser.public_id);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getMaskedPublicId = (id: string) => {
    if (!id) return '';
    if (id.length <= 8) return '••••••••';
    return `${id.slice(0, 4)}••••••••${id.slice(-4)}`;
  };

  const handleRedirectToAXID = () => {
    window.open('https://axid.astbyte.com', '_blank');
    setShowEditModal(false);
  };

  // --- 3. FILTER & COMPUTE COMPLETED COURSES ---
  const completedCourses = useMemo(() => {
    if (!authUser) return { inProgress: [] as any[], finished: [] as any[] };
    
    const userType = authUser.user_type || 'student';
    // Gabung semua materi
    const allMaterials = [
      ...OTHER_MATERIALS, ...PYTHON_MATERIALS, ...PYTHON_DA_MATERIALS, ...GO_MATERIALS,
      ...MYSQL_MATERIALS, ...TS_MATERIAL, ...JS_MATERIAL,
      ...PSQL_MATERIAL, ...RB_MATERIAL,
      ...ENG_MATERIALS, ...JP_MATERIALS, ...UIUX_MATERIALS, ...AGILE_MATERIALS, ...PM_MATERIALS
    ].filter(m => m.user_type === userType);

    // Grouping progress berdasarkan course/language
    const courseStats: Record<string, { total: number, completed: number, id: string }> = {};

    allMaterials.forEach(m => {
      // Fix TS Error: Skip kalau languagenya null
      if (!m.language) return;

      if (!courseStats[m.language]) {
        courseStats[m.language] = { total: 0, completed: 0, id: m.language };
      }
      courseStats[m.language].total += 1;
      
      if (progressMap[m.id] === 100) {
        courseStats[m.language].completed += 1;
      }
    });

    const inProgress: any[] = [];
    const finished: any[] = [];

    Object.values(courseStats).forEach(c => {
      if (c.total === 0) return;
      if (c.completed > 0 && c.completed < c.total) {
        inProgress.push({
          id: c.id,
          name: COURSE_NAME_MAP[c.id] || c.id.toUpperCase(),
          totalModules: c.total,
          completed: c.completed,
          progress: Math.round((c.completed / c.total) * 100)
        });
      } else if (c.completed === c.total) {
        finished.push({
          id: c.id,
          name: COURSE_NAME_MAP[c.id] || c.id.toUpperCase(),
          totalModules: c.total,
          completed: c.completed,
          progress: 100
        });
      }
    });

    return { inProgress, finished };
  }, [authUser, progressMap]);


  // --- 4. RENDER HELPERS ---
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-sky-50/50 backdrop-blur-sm">
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 border-4 border-blue-900 border-t-blue-600 rounded-none animate-spin flex items-center justify-center shadow-[4px_4px_0px_#1e3a8a]">
             <UserIcon className="w-6 h-6 text-blue-600 animate-pulse" />
          </div>
          <p className="text-sm font-bold text-slate-500 animate-pulse">Memuat Profil...</p>
        </div>
      </div>
    );
  }

  if (!authUser) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-sky-50 p-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.4] bg-[linear-gradient(rgba(203,213,225,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(203,213,225,0.5)_1px,transparent_1px)] bg-[size:30px_30px]"></div>
        
        <div className="w-full max-w-md bg-white/80 backdrop-blur-xl border-2 border-blue-900 border-blue-900 rounded-[2.5rem] p-10 text-center shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)] relative z-10">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-none bg-red-50 text-red-500 border-2 border-blue-900 border-red-100 shadow-[4px_4px_0px_#1e3a8a]">
            <AlertCircle className="h-10 w-10" />
          </div>
          <h2 className="text-3xl font-black text-blue-950 font-bold mb-2 tracking-tight">Akses Ditolak</h2>
          <p className="text-slate-500 mb-8 font-medium">Sesi Anda telah berakhir atau data tidak ditemukan.</p>
          <button onClick={onBack} className="w-full py-4 bg-sky-100 hover:bg-slate-200 text-blue-950 font-bold rounded-none font-bold transition-all border-2 border-blue-900 border-blue-900 shadow-[4px_4px_0px_#1e3a8a]">
            Kembali
          </button>
        </div>
      </div>
    );
  }

  // --- 5. DATA DERIVED DARI API ---
  const planType = authUser.subscription_type?.toLowerCase() || 'free';
  const isPro = planType === 'pro';
  const isPlus = planType === 'plus';
  const isUltra = planType === 'ultra';
  
  const accentGradient = isPro || isUltra
    ? 'from-amber-400 to-orange-500' 
    : isPlus 
    ? 'from-fuchsia-500 to-purple-600' 
    : 'from-blue-600 to-cyan-500';

  const avatarUrl = authUser.avatar_url && !photoError
    ? `${AUTHX_BASE}${authUser.avatar_url}`
    : `https://ui-avatars.com/api/?background=f8fafc&color=0f172a&name=${encodeURIComponent(authUser.full_name)}`;

  // Kalkulasi Statistik Real dari API
  const joinYear = authUser.created_at ? new Date(authUser.created_at).getFullYear() : new Date().getFullYear();
  const totalTransactions = subs.length;
  const isPremiumActive = authUser.subscription_status === 'active';

  // Generate Badges Dinamis berdasarkan kondisi API
  const dynamicBadges = [];
  
  dynamicBadges.push({ 
    id: 1, name: "Verified ID", desc: "Akun terverifikasi Coreline.", 
    icon: ShieldCheck, color: "text-blue-500", bg: "bg-blue-50/80", border: "border-blue-900" 
  });

  if (isPremiumActive && planType !== 'free') {
    dynamicBadges.push({ 
      id: 2, name: "Sultan", desc: `Akses fitur ${planType.toUpperCase()}.`, 
      icon: Crown, color: "text-purple-500", bg: "bg-purple-50/80", border: "border-purple-100" 
    });
  }

  if (totalTransactions > 1) {
    dynamicBadges.push({ 
      id: 3, name: "Pelanggan Setia", desc: `${totalTransactions}x riwayat transaksi.`, 
      icon: Receipt, color: "text-amber-500", bg: "bg-amber-50/80", border: "border-amber-100" 
    });
  }

  dynamicBadges.push({ 
    id: 4, name: "Pelajar Aktif", desc: "Siap eksplorasi modul digital.", 
    icon: BookOpen, color: "text-emerald-500", bg: "bg-emerald-50/80", border: "border-emerald-100" 
  });


  return (
    <div className="min-h-screen bg-sky-50/50 text-blue-950 font-bold font-sans selection:bg-blue-500/30">
      
      {/* Background Ambience (Liquid iOS Style) */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-blue-400/10 rounded-none blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-cyan-400/10 rounded-none blur-[120px]" />
        <div className="absolute top-[40%] left-[20%] w-[400px] h-[400px] bg-indigo-400/5 rounded-none blur-[100px]" />
      </div>

      {/* Navbar (Glassy) */}
      <nav className="sticky top-0 z-40 w-full border-b border-blue-900 bg-white/60 backdrop-blur-2xl shadow-[0_4px_30px_rgba(0,0,0,0.03)] supports-[backdrop-filter]:bg-white/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <button onClick={onBack} className="group flex items-center gap-2 px-5 py-2.5 text-sm font-bold text-blue-950 font-bold hover:text-blue-600 transition-all bg-white/80 rounded-none border-2 border-blue-900 border-blue-900 shadow-[4px_4px_0px_#1e3a8a] hover:shadow-[4px_4px_0px_#1e3a8a] backdrop-blur-md">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Kembali
          </button>
          
          <div className="flex items-center gap-4">
             <div className="hidden sm:flex items-center gap-2 bg-white/60 border-2 border-blue-900 border-blue-900 px-4 py-2.5 rounded-none shadow-[4px_4px_0px_#1e3a8a] backdrop-blur-md">
               <UserIcon className="w-4 h-4 text-blue-600" />
               <span className="text-sm font-bold text-blue-950 font-bold">Profil Saya</span>
             </div>
             <button
                onClick={() => setShowEditModal(true)}
                className="flex items-center gap-2 px-6 py-2.5 rounded-none bg-blue-600 border-2 border-blue-900 shadow-[4px_4px_0px_#1e3a8a] text-white hover:bg-blue-700 hover:shadow-[6px_6px_0px_#1e3a8a] hover:-translate-y-1 transition-all hover:from-blue-700 hover:to-cyan-600 text-white text-sm font-bold transition-all shadow-[4px_4px_0px_#1e3a8a] hover:shadow-[4px_4px_0px_#1e3a8a] border-2 border-blue-900 border-blue-900 hover:-translate-y-0.5"
              >
                <Edit3 className="w-4 h-4" />
                <span className="hidden sm:inline">Edit Profile</span>
              </button>
          </div>
        </div>
      </nav>

      <main className="relative z-10 max-w-7xl mx-auto px-4 py-10 sm:px-6 lg:px-8 space-y-8">
        
        {/* HEADER CARD (Premium Glass Look) */}
        <div className="relative overflow-hidden rounded-[2.5rem] bg-white/80 backdrop-blur-xl border-2 border-blue-900 border-blue-900 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] p-8 sm:p-12 animate-fade-in-up">
          <div className={`absolute top-0 right-0 w-80 h-80 bg-gradient-to-br ${accentGradient} opacity-[0.08] rounded-none blur-3xl -mr-20 -mt-20 pointer-events-none`}></div>

          <div className="relative flex flex-col lg:flex-row items-center lg:items-start gap-10">
            {/* Avatar */}
            <div className="relative group shrink-0">
               <div className={`absolute -inset-2 bg-gradient-to-br ${accentGradient} rounded-none opacity-30 blur-xl group-hover:opacity-50 transition-all duration-500`}></div>
               <img
                  src={avatarUrl}
                  onError={() => setPhotoError(true)}
                  alt="Profile"
                  className="relative w-40 h-40 rounded-none object-cover border-4 border-blue-900 shadow-[4px_4px_0px_#1e3a8a] bg-sky-50 transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute bottom-2 right-2 w-12 h-12 bg-white rounded-none flex items-center justify-center border-[3px] border-blue-900 shadow-[4px_4px_0px_#1e3a8a] z-10">
                  <ShieldCheck className="w-6 h-6 text-emerald-500" />
                </div>
            </div>

            {/* Info */}
            <div className="flex-1 text-center lg:text-left space-y-5 w-full pt-2">
              <div>
                <h1 className="text-4xl sm:text-5xl font-black text-blue-950 font-bold flex flex-col lg:flex-row items-center gap-3 lg:gap-4 justify-center lg:justify-start tracking-tight">
                  {authUser.full_name}
                  {isPremiumActive && planType !== 'free' && <Sparkles className={`w-8 h-8 text-transparent bg-clip-text bg-gradient-to-r ${accentGradient}`} />}
                </h1>
                
                <div className="mt-5 flex flex-wrap gap-3 justify-center lg:justify-start">
                  {isPremiumActive && planType !== 'free' ? (
                    <span className={`inline-flex items-center gap-1.5 px-5 py-2 rounded-none text-xs font-black text-white uppercase tracking-widest shadow-[4px_4px_0px_#1e3a8a] bg-gradient-to-r ${accentGradient}`}>
                      <Crown className="w-4 h-4" />
                      {planType} Member
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 px-5 py-2 rounded-none text-xs font-black text-blue-950 font-bold bg-sky-100 border-2 border-blue-900 border-blue-900 uppercase tracking-widest shadow-[4px_4px_0px_#1e3a8a]">
                      <Layout className="w-4 h-4" />
                      Free Member
                    </span>
                  )}
                  <span className="inline-flex items-center gap-1.5 px-5 py-2 rounded-none text-xs font-bold bg-emerald-50/80 text-emerald-700 border-2 border-blue-900 border-emerald-100 shadow-[4px_4px_0px_#1e3a8a] backdrop-blur-sm">
                    <CheckCircle className="w-4 h-4 text-emerald-600" />
                    Verified Account
                  </span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 text-blue-950 font-bold text-sm font-medium">
                <div className="flex items-center gap-2 bg-white/60 border-2 border-blue-900 border-blue-900 px-5 py-2.5 rounded-none shadow-[4px_4px_0px_#1e3a8a] backdrop-blur-md">
                  <Mail className="w-4 h-4 text-blue-500" /> {authUser.email}
                </div>
                {authUser.phone && (
                   <div className="flex items-center gap-2 bg-white/60 border-2 border-blue-900 border-blue-900 px-5 py-2.5 rounded-none shadow-[4px_4px_0px_#1e3a8a] backdrop-blur-md">
                    <Phone className="w-4 h-4 text-emerald-500" /> {authUser.phone}
                  </div>
                )}
              </div>

              {/* Public ID */}
              <div className="pt-3">
                 <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 pl-1">ASTBYTE PUBLIC ID</p>
                 <div className="inline-flex items-center gap-2 p-1.5 bg-sky-50/80 border-2 border-blue-900 border-blue-900 rounded-none shadow-[4px_4px_0px_#1e3a8a] backdrop-blur-sm">
                    <div className="px-5 py-2.5 font-mono text-sm font-bold text-blue-950 font-bold min-w-[150px] text-center tracking-wider">
                       {showPublicId ? authUser.public_id : getMaskedPublicId(authUser.public_id)}
                    </div>
                    <div className="flex border-l border-blue-900 pl-1.5 gap-1">
                      <button onClick={() => setShowPublicId(!showPublicId)} className="p-2.5 text-slate-400 hover:text-blue-600 hover:bg-white rounded-none transition-all shadow-[4px_4px_0px_#1e3a8a]" title="Tampilkan ID">
                        {showPublicId ? <EyeOff className="w-4 h-4"/> : <Eye className="w-4 h-4"/>}
                      </button>
                      <button onClick={handleCopyId} className="p-2.5 text-slate-400 hover:text-blue-600 hover:bg-white rounded-none transition-all shadow-[4px_4px_0px_#1e3a8a]" title="Salin ID">
                        {copied ? <Check className="w-4 h-4 text-emerald-500"/> : <Copy className="w-4 h-4"/>}
                      </button>
                    </div>
                 </div>
              </div>
            </div>
          </div>
        </div>

        {/* QUICK STATS - DYNAMIC DARI API */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 animate-fade-in-up" style={{ animationDelay: '50ms' }}>
           <StatCard icon={<Calendar />} title="Bergabung Sejak" value={`${joinYear}`} color="text-blue-600" bg="bg-blue-50/80" />
           <StatCard icon={<Receipt />} title="Total Transaksi" value={`${totalTransactions} Transaksi`} color="text-amber-500" bg="bg-amber-50/80" />
           <StatCard icon={<ShieldCheck />} title="Tipe Member" value={planType.toUpperCase()} color="text-purple-600" bg="bg-purple-50/80" />
           <StatCard icon={<Activity />} title="Status Akun" value={isPremiumActive ? 'Aktif' : 'Basic'} color="text-emerald-600" bg="bg-emerald-50/80" />
        </div>

        {/* CONTENT GRID UTAMA */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
           
           {/* LEFT COLUMN: Personal Info, Badges & Completed Courses */}
           <div className="lg:col-span-2 space-y-8">
              
              {/* Personal Info Box */}
              <div className="bg-white/80 backdrop-blur-xl border-2 border-blue-900 border-blue-900 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.05)] rounded-[2rem] p-8 sm:p-10 animate-fade-in-up" style={{ animationDelay: '100ms' }}>
                 <div className="flex items-center justify-between mb-8 pb-5 border-b border-blue-900">
                    <div className="flex items-center gap-4">
                       <div className="p-3.5 bg-blue-50/80 border-2 border-blue-900 border-blue-900 rounded-none shadow-[4px_4px_0px_#1e3a8a]">
                          <UserIcon className="w-6 h-6 text-blue-600" />
                       </div>
                       <h2 className="text-2xl font-black text-blue-950 font-bold tracking-tight">Informasi Pribadi</h2>
                    </div>
                 </div>
                 
                 <div className="grid md:grid-cols-2 gap-6">
                    <Field label="Nama Lengkap" value={authUser.full_name} icon={<UserIcon className="w-4 h-4"/>} />
                    <Field label="Email Utama" value={authUser.email} icon={<Mail className="w-4 h-4"/>} />
                    <Field label="Nomor Telepon" value={authUser.phone || '-'} icon={<Phone className="w-4 h-4"/>} />
                    <Field label="Role Akses" value={authUser.user_type || 'Student'} icon={<Layout className="w-4 h-4"/>} />
                 </div>
              </div>

              {/* Badges / Pencapaian Dinamis API */}
              <div className="bg-white/80 backdrop-blur-xl border-2 border-blue-900 border-blue-900 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.05)] rounded-[2rem] p-8 sm:p-10 animate-fade-in-up" style={{ animationDelay: '150ms' }}>
                 <div className="flex items-center gap-4 mb-8">
                    <div className="p-3.5 bg-amber-50/80 border-2 border-blue-900 border-amber-100 rounded-none shadow-[4px_4px_0px_#1e3a8a]">
                       <AwardIcon className="w-6 h-6 text-amber-500" />
                    </div>
                    <div>
                       <h2 className="text-2xl font-black text-blue-950 font-bold tracking-tight">Pencapaian Akun</h2>
                       <p className="text-sm text-slate-500 font-medium mt-1">Status dan lencana berdasarkan aktivitas kamu.</p>
                    </div>
                 </div>

                 <div className="grid grid-cols-2 sm:grid-cols-4 gap-5">
                    {dynamicBadges.map(badge => (
                       <div key={badge.id} className="bg-white border-2 border-blue-900 border-blue-900 rounded-none p-5 text-center hover:shadow-[4px_4px_0px_#1e3a8a] hover:border-blue-900 transition-all group shadow-[4px_4px_0px_#1e3a8a]">
                          <div className={`w-14 h-14 mx-auto rounded-none flex items-center justify-center ${badge.bg} ${badge.border} border-2 border-blue-900 mb-4 group-hover:scale-110 group-hover:-translate-y-1 transition-all duration-300 shadow-[4px_4px_0px_#1e3a8a]`}>
                             <badge.icon className={`w-7 h-7 ${badge.color}`} />
                          </div>
                          <h4 className="font-bold text-blue-950 font-bold text-sm mb-1.5">{badge.name}</h4>
                          <p className="text-[10px] text-slate-500 font-medium leading-relaxed">{badge.desc}</p>
                       </div>
                    ))}
                 </div>
              </div>

              {/* Course Sedang Dipelajari */}
              <div className="bg-white/80 backdrop-blur-xl border-2 border-blue-900 border-blue-900 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.05)] rounded-[2rem] p-8 sm:p-10 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
                 <div className="flex items-center gap-4 mb-8">
                    <div className="p-3.5 bg-blue-50/80 border-2 border-blue-900 border-blue-900 rounded-none shadow-[4px_4px_0px_#1e3a8a]">
                       <Activity className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                       <h2 className="text-2xl font-black text-blue-950 font-bold tracking-tight">Sedang Dipelajari</h2>
                       <p className="text-sm text-slate-500 font-medium mt-1">Lanjutkan kursus yang sedang kamu pelajari saat ini.</p>
                    </div>
                 </div>

                 <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                    {completedCourses.inProgress.length === 0 ? (
                       <div className="text-center py-12 border-2 border-dashed border-blue-900 rounded-[1.5rem] bg-sky-50/50 backdrop-blur-sm">
                          <BookOpen className="w-10 h-10 text-slate-300 mx-auto mb-3" />
                          <p className="text-slate-500 font-medium text-sm">Belum ada course yang sedang dipelajari.</p>
                       </div>
                    ) : (
                       completedCourses.inProgress.map((course: any) => (
                          <div key={course.id} className="group flex flex-col p-5 bg-white border-2 border-blue-900 border-blue-900 shadow-[4px_4px_0px_#1e3a8a] rounded-[1.5rem] hover:border-blue-900 hover:shadow-[4px_4px_0px_#1e3a8a] hover:-translate-y-0.5 transition-all duration-300">
                             <div className="flex items-center justify-between mb-3">
                                <div className="flex items-center gap-4">
                                   <div className="w-12 h-12 bg-blue-50/80 text-blue-600 rounded-none flex items-center justify-center shrink-0 shadow-[4px_4px_0px_#1e3a8a] border-2 border-blue-900 border-blue-900 group-hover:scale-105 transition-transform">
                                      <Layout className="w-6 h-6" />
                                   </div>
                                   <div>
                                      <h4 className="font-extrabold text-blue-950 font-bold text-[15px] line-clamp-1 group-hover:text-blue-600 transition-colors">{course.name}</h4>
                                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">
                                        {course.completed} / {course.totalModules} Modul Selesai
                                      </p>
                                   </div>
                                </div>
                                <span className="text-xs font-black text-blue-600 bg-blue-50 px-3 py-1.5 rounded-none border-2 border-blue-900 border-blue-900 shrink-0 shadow-[4px_4px_0px_#1e3a8a]">
                                  {course.progress}%
                                </span>
                             </div>
                             <div className="w-full h-1.5 bg-sky-100 rounded-none overflow-hidden">
                               <div className="h-full bg-blue-500 rounded-none" style={{ width: `${course.progress}%` }}></div>
                             </div>
                          </div>
                       ))
                    )}
                 </div>
              </div>

              {/* Course Selesai 100% */}
              <div className="bg-white/80 backdrop-blur-xl border-2 border-blue-900 border-blue-900 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.05)] rounded-[2rem] p-8 sm:p-10 animate-fade-in-up" style={{ animationDelay: '250ms' }}>
                 <div className="flex items-center gap-4 mb-8">
                    <div className="p-3.5 bg-emerald-50/80 border-2 border-blue-900 border-emerald-100 rounded-none shadow-[4px_4px_0px_#1e3a8a]">
                       <Trophy className="w-6 h-6 text-emerald-600" />
                    </div>
                    <div>
                       <h2 className="text-2xl font-black text-blue-950 font-bold tracking-tight">Course Selesai & Sertifikat</h2>
                       <p className="text-sm text-slate-500 font-medium mt-1">Daftar course yang berhasil kamu tamatkan secara penuh.</p>
                    </div>
                 </div>

                 <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                    {completedCourses.finished.length === 0 ? (
                       <div className="text-center py-12 border-2 border-dashed border-blue-900 rounded-[1.5rem] bg-sky-50/50 backdrop-blur-sm">
                          <Trophy className="w-10 h-10 text-slate-300 mx-auto mb-3" />
                          <p className="text-slate-500 font-medium text-sm">Belum ada course yang berhasil diselesaikan 100%.</p>
                       </div>
                    ) : (
                       completedCourses.finished.map((course: any) => (
                          <div key={course.id} className="group flex flex-col p-5 bg-white border-2 border-blue-900 border-blue-900 shadow-[4px_4px_0px_#1e3a8a] rounded-[1.5rem] hover:border-emerald-200 hover:shadow-[4px_4px_0px_#1e3a8a] hover:-translate-y-0.5 transition-all duration-300">
                             <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                   <div className="w-12 h-12 bg-emerald-50/80 text-emerald-600 rounded-none flex items-center justify-center shrink-0 shadow-[4px_4px_0px_#1e3a8a] border-2 border-blue-900 border-emerald-100 group-hover:scale-105 transition-transform">
                                      <Trophy className="w-6 h-6" />
                                   </div>
                                   <div>
                                      <h4 className="font-extrabold text-blue-950 font-bold text-[15px] line-clamp-1 group-hover:text-emerald-600 transition-colors">{course.name}</h4>
                                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">
                                        Tamat • {course.totalModules} Modul
                                      </p>
                                   </div>
                                </div>
                                <span className="text-[10px] font-black text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-none border-2 border-blue-900 border-emerald-100 shrink-0 shadow-[4px_4px_0px_#1e3a8a] flex items-center gap-1">
                                  <CheckCircle className="w-3 h-3" /> 100%
                                </span>
                             </div>
                          </div>
                       ))
                    )}
                 </div>
              </div>

           </div>

           {/* RIGHT COLUMN: Subscriptions & Quick Actions */}
           <div className="lg:col-span-1 space-y-8">
              
              {/* Quick Actions / Links (Premium Dark Card) */}
              <div className="bg-slate-900 rounded-[2.5rem] p-8 sm:p-10 shadow-[4px_4px_0px_#1e3a8a] text-white relative overflow-hidden animate-fade-in-up group" style={{ animationDelay: '300ms' }}>
                 <div className="absolute top-0 right-0 w-48 h-48 bg-blue-500/20 rounded-none blur-3xl -mr-10 -mt-10 pointer-events-none transition-transform duration-700 group-hover:scale-110"></div>
                 <div className="absolute bottom-0 left-0 w-32 h-32 bg-purple-500/20 rounded-none blur-2xl -ml-10 -mb-10 pointer-events-none transition-transform duration-700 group-hover:scale-110"></div>
                 
                 <h3 className="text-xl font-black mb-6 flex items-center gap-3 relative z-10">
                    <Settings className="w-6 h-6 text-blue-400" /> Pengaturan Cepat
                 </h3>
                 <div className="space-y-4 relative z-10">
                    <button onClick={() => setShowEditModal(true)} className="w-full flex items-center justify-between p-4 bg-white/5 hover:bg-white/10 border-2 border-blue-900 border-blue-900 rounded-none transition-all font-medium text-sm backdrop-blur-sm group/btn">
                       <span className="flex items-center gap-3"><Edit3 className="w-4 h-4 text-blue-400 group-hover/btn:scale-110 transition-transform" /> Ubah Password</span>
                       <ExternalLink className="w-4 h-4 text-slate-400" />
                    </button>
                    <a href="https://wa.me/6285183209494" target="_blank" rel="noreferrer" className="w-full flex items-center justify-between p-4 bg-white/5 hover:bg-white/10 border-2 border-blue-900 border-blue-900 rounded-none transition-all font-medium text-sm backdrop-blur-sm group/btn">
                       <span className="flex items-center gap-3"><MessageCircle className="w-4 h-4 text-emerald-400 group-hover/btn:scale-110 transition-transform" /> Bantuan CS</span>
                       <ExternalLink className="w-4 h-4 text-slate-400" />
                    </a>
                 </div>
              </div>

              {/* Subscriptions Box */}
              <div className="bg-white/80 backdrop-blur-xl border-2 border-blue-900 border-blue-900 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.05)] rounded-[2.5rem] p-8 sm:p-10 animate-fade-in-up" style={{ animationDelay: '250ms' }}>
                <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
                  <div className="flex items-center gap-4">
                     <div className="p-3.5 bg-purple-50/80 border-2 border-blue-900 border-purple-100 rounded-none shadow-[4px_4px_0px_#1e3a8a]">
                        <CreditCard className="w-6 h-6 text-purple-600" />
                     </div>
                     <h2 className="text-xl font-black text-blue-950 font-bold tracking-tight">Riwayat Langganan</h2>
                  </div>
                  <button 
                    onClick={() => {
                      const returnUrl = encodeURIComponent(window.location.origin);
                      window.location.href = `https://axid.astbyte.com/v2-dashboard-nexara/subscription?returnUrl=${returnUrl}`;
                    }}
                    className="text-sm font-bold text-purple-600 hover:text-white bg-purple-50 hover:bg-purple-600 px-5 py-2.5 rounded-none transition-all border-2 border-blue-900 border-purple-100 shadow-[4px_4px_0px_#1e3a8a] flex items-center gap-2 hover:-translate-y-0.5"
                  >
                    <Zap className="w-4 h-4" /> Kelola Langganan
                  </button>
                </div>

                <div className="space-y-5 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                   {subs.length === 0 ? (
                      <div className="text-center py-10 border-2 border-dashed border-blue-900 rounded-[1.5rem] bg-sky-50/50 backdrop-blur-sm">
                         <p className="text-slate-500 font-medium text-sm">Belum ada riwayat langganan.</p>
                      </div>
                   ) : (
                      subs.map(sub => {
                        const type = sub.subscribe_type?.toLowerCase();
                        const grad = type === 'pro' || type === 'ultra' ? 'from-amber-400 to-orange-500' : type === 'plus' ? 'from-fuchsia-500 to-purple-600' : 'from-blue-600 to-cyan-500';
                        
                        return (
                          <div key={sub.id} className="relative group bg-white border-2 border-blue-900 border-blue-900 shadow-[4px_4px_0px_#1e3a8a] rounded-[1.5rem] overflow-hidden hover:border-blue-900 hover:shadow-[4px_4px_0px_#1e3a8a] hover:-translate-y-0.5 transition-all duration-300">
                             <div className={`absolute top-0 left-0 w-2 h-full bg-gradient-to-b ${grad}`}></div>
                             <div className="p-5 pl-7">
                                <div className="flex justify-between items-start mb-4">
                                   <div>
                                      <h3 className="font-black text-blue-950 font-bold uppercase text-[15px] tracking-tight">{sub.subscribe_type}</h3>
                                      <p className="text-[11px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">{sub.period}</p>
                                   </div>
                                   <div className={`p-2 rounded-none bg-gradient-to-br ${grad} shadow-[4px_4px_0px_#1e3a8a] group-hover:scale-105 transition-transform`}>
                                      <Crown className="w-4 h-4 text-white" />
                                   </div>
                                </div>
                                
                                <div className="space-y-2 border-t border-blue-900 pt-3">
                                   <div className="flex items-center gap-2.5 text-[11px] font-bold text-slate-500">
                                      <Calendar className="w-3.5 h-3.5 text-blue-500"/>
                                      {sub.start_date} - {sub.end_date}
                                   </div>
                                   <div className="flex items-center gap-2.5 text-[11px] font-bold text-slate-500">
                                      <Zap className="w-3.5 h-3.5 text-amber-500"/>
                                      via {sub.payment_method}
                                   </div>
                                </div>
                             </div>
                          </div>
                        );
                      })
                   )}
                </div>
              </div>

           </div>
        </div>
      </main>

      {/* EDIT MODAL (PENGALIHAN AXID) */}
      {showEditModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-md animate-fade-in">
          <div className="w-full max-w-lg bg-white/90 backdrop-blur-2xl border-2 border-blue-900 border-blue-900 rounded-[2.5rem] overflow-hidden shadow-[4px_4px_0px_#1e3a8a] animate-scale-in">
             <div className="bg-blue-600 border-2 border-blue-900 shadow-[4px_4px_0px_#1e3a8a] text-white hover:bg-blue-700 hover:shadow-[6px_6px_0px_#1e3a8a] hover:-translate-y-1 transition-all p-8 text-center relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/20 rounded-none blur-2xl -mr-10 -mt-10 pointer-events-none"></div>
                <button onClick={() => setShowEditModal(false)} className="absolute top-5 right-5 p-2 bg-black/10 hover:bg-black/20 rounded-none text-white transition-colors backdrop-blur-sm">
                   <X className="w-5 h-5" />
                </button>
                <div className="w-16 h-16 bg-white/20 rounded-none flex items-center justify-center mx-auto mb-5 backdrop-blur-md shadow-[4px_4px_0px_#1e3a8a] border-2 border-blue-900 border-blue-900">
                   <AlertCircle className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-black text-white tracking-tight">Edit Profile</h3>
                <p className="text-blue-100 text-sm font-medium mt-1.5">Sistem Terintegrasi AstByte</p>
             </div>
             
             <div className="p-8 sm:p-10">
                <div className="bg-blue-50/80 backdrop-blur-sm border-2 border-blue-900 border-blue-900 rounded-[1.5rem] p-5 mb-8">
                   <p className="text-blue-950 font-bold text-sm text-center leading-relaxed font-medium">
                      Untuk keamanan dan sinkronisasi data antar platform, perubahan profil dan password dikelola terpusat di <span className="font-bold text-blue-600">AXID AstByte</span>.
                   </p>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4">
                   <button onClick={() => setShowEditModal(false)} className="flex-1 py-4 bg-sky-50 hover:bg-sky-100 text-blue-950 font-bold border-2 border-blue-900 border-blue-900 rounded-none font-bold transition-all shadow-[4px_4px_0px_#1e3a8a]">
                      Batal
                   </button>
                   <button onClick={handleRedirectToAXID} className="flex-1 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-none font-bold flex items-center justify-center gap-2 transition-all shadow-[4px_4px_0px_#1e3a8a] shadow-[4px_4px_0px_#1e3a8a] hover:-translate-y-0.5">
                      <ExternalLink className="w-4 h-4" />
                      Buka Portal AXID
                   </button>
                </div>
             </div>
          </div>
        </div>
      )}

      {/* Styles */}
      <style>{`
        @keyframes fade-in-up { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes scale-in { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
        @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
        .animate-fade-in-up { animation: fade-in-up 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .animate-scale-in { animation: scale-in 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .animate-fade-in { animation: fade-in 0.3s ease-out forwards; }
        
        /* Premium Custom Scrollbar */
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #94a3b8; }
      `}</style>
    </div>
  );
}

// --- SUB-COMPONENTS --- //

function Field({ label, value, icon }: { label: string, value: string, icon: any }) {
  return (
    <div>
       <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2.5">
          <span className="text-blue-500">{icon}</span> {label}
       </label>
       <div className="w-full bg-sky-50/80 backdrop-blur-sm border-2 border-blue-900 border-blue-900 rounded-none px-5 py-4 text-blue-950 font-bold font-bold text-[15px] shadow-[4px_4px_0px_#1e3a8a]">
          {value || <span className="text-slate-400 italic font-medium">Belum diatur</span>}
       </div>
    </div>
  );
}

function StatCard({ icon, title, value, color, bg }: { icon: any, title: string, value: string, color: string, bg: string }) {
   return (
      <div className="bg-white/80 backdrop-blur-xl border-2 border-blue-900 border-blue-900 rounded-[1.5rem] p-5 shadow-[0_4px_20px_-5px_rgba(0,0,0,0.05)] hover:shadow-[4px_4px_0px_#1e3a8a] transition-all duration-300 hover:-translate-y-1 flex flex-col gap-4">
         <div className={`p-3.5 w-fit rounded-none ${bg} ${color} shadow-[4px_4px_0px_#1e3a8a]`}>
            {icon}
         </div>
         <div>
            <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-1">{title}</p>
            <p className="text-[17px] font-black text-blue-950 font-bold tracking-tight">{value}</p>
         </div>
      </div>
   );
}

// Icon Wrapper untuk Award
function AwardIcon(props: any) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="12" cy="8" r="6"></circle>
      <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"></path>
    </svg>
  );
}