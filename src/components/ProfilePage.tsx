import { useEffect, useState, useMemo } from 'react';
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
  'japanese': 'Japanese N5-N4'
};

/* ================================
 * MAIN COMPONENT
 * ================================ */
export default function ProfilePage({ onBack }: ProfilePageProps) {
  const { user } = useAuth();

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
    if (!authUser) return [];
    
    const userType = authUser.user_type || 'student';
    // Gabung semua materi
    const allMaterials = [
      ...OTHER_MATERIALS, ...PYTHON_MATERIALS, ...GO_MATERIALS,
      ...MYSQL_MATERIALS, ...TS_MATERIAL, ...JS_MATERIAL,
      ...PSQL_MATERIAL, ...RB_MATERIAL
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

    // Filter yang totalnya > 0 dan completed === total (Berarti tamat 100% course tsb)
    const finished = Object.values(courseStats).filter(
      c => c.total > 0 && c.completed === c.total
    );

    // Format output untuk dirender
    return finished.map(f => ({
       id: f.id,
       name: COURSE_NAME_MAP[f.id] || f.id.toUpperCase(),
       totalModules: f.total
    }));
  }, [authUser, progressMap]);


  // --- 4. RENDER HELPERS ---
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-10 h-10 text-blue-600 animate-spin" />
          <p className="text-sm font-bold text-slate-500 animate-pulse">Memuat Profil...</p>
        </div>
      </div>
    );
  }

  if (!authUser) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 p-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.4] bg-[linear-gradient(rgba(203,213,225,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(203,213,225,0.5)_1px,transparent_1px)] bg-[size:30px_30px]"></div>
        
        <div className="w-full max-w-md bg-white border border-slate-200 rounded-3xl p-10 text-center shadow-xl relative z-10">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-red-50 text-red-500 border border-red-100">
            <Layout className="h-8 w-8" />
          </div>
          <h2 className="text-2xl font-black text-slate-900 mb-2">Akses Ditolak</h2>
          <p className="text-slate-500 mb-8 font-medium">Sesi Anda telah berakhir atau data tidak ditemukan.</p>
          <button onClick={onBack} className="w-full py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold transition-all border border-slate-200">
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
    : 'from-blue-500 to-cyan-500';

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
    icon: ShieldCheck, color: "text-blue-500", bg: "bg-blue-100", border: "border-blue-200" 
  });

  if (isPremiumActive && planType !== 'free') {
    dynamicBadges.push({ 
      id: 2, name: "Sultan", desc: `Akses fitur ${planType.toUpperCase()}.`, 
      icon: Crown, color: "text-purple-500", bg: "bg-purple-100", border: "border-purple-200" 
    });
  }

  if (totalTransactions > 1) {
    dynamicBadges.push({ 
      id: 3, name: "Pelanggan Setia", desc: `${totalTransactions}x riwayat transaksi.`, 
      icon: Receipt, color: "text-amber-500", bg: "bg-amber-100", border: "border-amber-200" 
    });
  }

  dynamicBadges.push({ 
    id: 4, name: "Pelajar Aktif", desc: "Siap eksplorasi modul digital.", 
    icon: BookOpen, color: "text-emerald-500", bg: "bg-emerald-100", border: "border-emerald-200" 
  });


  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans selection:bg-blue-500/30">
      
      {/* Background Ambience (Light Theme) */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-blue-300/20 rounded-full blur-[100px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-cyan-300/20 rounded-full blur-[100px]" />
      </div>

      {/* Navbar */}
      <nav className="sticky top-0 z-40 w-full border-b border-slate-200 bg-white/80 backdrop-blur-xl shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <button onClick={onBack} className="group flex items-center gap-2 px-4 py-2 text-sm font-bold text-slate-500 hover:text-blue-600 transition-colors bg-white rounded-full border border-slate-200 shadow-sm hover:shadow-md">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Kembali ke Dashboard
          </button>
          
          <div className="flex items-center gap-3">
             <div className="hidden sm:flex items-center gap-2 bg-slate-50 border border-slate-200 px-4 py-2 rounded-xl">
               <UserIcon className="w-4 h-4 text-blue-600" />
               <span className="text-sm font-bold text-slate-700">Profil Saya</span>
             </div>
             <button
                onClick={() => setShowEditModal(true)}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white text-sm font-bold transition-all shadow-md hover:shadow-lg shadow-blue-500/20 border border-blue-400/50"
              >
                <Edit3 className="w-4 h-4" />
                <span className="hidden sm:inline">Edit Profile</span>
              </button>
          </div>
        </div>
      </nav>

      <main className="relative z-10 max-w-7xl mx-auto px-4 py-10 sm:px-6 lg:px-8 space-y-8">
        
        {/* HEADER CARD */}
        <div className="relative overflow-hidden rounded-[2.5rem] bg-white border border-slate-200 p-8 sm:p-12 shadow-xl animate-fade-in-up">
          <div className={`absolute top-0 right-0 w-64 h-64 bg-gradient-to-br ${accentGradient} opacity-[0.15] rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none`}></div>

          <div className="relative flex flex-col lg:flex-row items-center lg:items-start gap-10">
            {/* Avatar */}
            <div className="relative group shrink-0">
               <div className={`absolute -inset-1 bg-gradient-to-br ${accentGradient} rounded-full opacity-40 blur-lg group-hover:opacity-60 transition-opacity duration-500`}></div>
               <img
                  src={avatarUrl}
                  onError={() => setPhotoError(true)}
                  alt="Profile"
                  className="relative w-40 h-40 rounded-full object-cover border-4 border-white shadow-lg bg-slate-100"
                />
                <div className="absolute bottom-2 right-2 w-10 h-10 bg-white rounded-full flex items-center justify-center border-2 border-slate-100 shadow-md">
                  <ShieldCheck className="w-5 h-5 text-emerald-500" />
                </div>
            </div>

            {/* Info */}
            <div className="flex-1 text-center lg:text-left space-y-5 w-full">
              <div>
                <h1 className="text-4xl sm:text-5xl font-black text-slate-900 flex flex-col lg:flex-row items-center gap-3 lg:gap-4 justify-center lg:justify-start tracking-tight">
                  {authUser.full_name}
                  {isPremiumActive && planType !== 'free' && <Sparkles className={`w-8 h-8 text-transparent bg-clip-text bg-gradient-to-r ${accentGradient}`} />}
                </h1>
                
                <div className="mt-4 flex flex-wrap gap-3 justify-center lg:justify-start">
                  {isPremiumActive && planType !== 'free' ? (
                    <span className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-black text-white uppercase tracking-widest shadow-md bg-gradient-to-r ${accentGradient}`}>
                      <Crown className="w-3 h-3" />
                      {planType} Member
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-black text-slate-600 bg-slate-100 border border-slate-200 uppercase tracking-widest shadow-sm">
                      <Layout className="w-3 h-3" />
                      Free Member
                    </span>
                  )}
                  <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 shadow-sm">
                    <CheckCircle className="w-3 h-3 text-emerald-600" />
                    Verified Account
                  </span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 text-slate-600 text-sm font-medium">
                <div className="flex items-center gap-2 bg-slate-50 border border-slate-100 px-4 py-2 rounded-xl shadow-sm">
                  <Mail className="w-4 h-4 text-blue-500" /> {authUser.email}
                </div>
                {authUser.phone && (
                   <div className="flex items-center gap-2 bg-slate-50 border border-slate-100 px-4 py-2 rounded-xl shadow-sm">
                    <Phone className="w-4 h-4 text-emerald-500" /> {authUser.phone}
                  </div>
                )}
              </div>

              {/* Public ID */}
              <div className="pt-2">
                 <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">ASTBYTE PUBLIC ID</p>
                 <div className="inline-flex items-center gap-2 p-1.5 bg-slate-50 border border-slate-200 rounded-xl shadow-sm">
                    <div className="px-4 py-2 font-mono text-sm font-bold text-slate-700 min-w-[140px] text-center tracking-wide">
                       {showPublicId ? authUser.public_id : getMaskedPublicId(authUser.public_id)}
                    </div>
                    <div className="flex border-l border-slate-200 pl-1">
                      <button onClick={() => setShowPublicId(!showPublicId)} className="p-2 text-slate-400 hover:text-blue-600 hover:bg-white rounded-lg transition-colors shadow-sm" title="Tampilkan ID">
                        {showPublicId ? <EyeOff className="w-4 h-4"/> : <Eye className="w-4 h-4"/>}
                      </button>
                      <button onClick={handleCopyId} className="p-2 text-slate-400 hover:text-blue-600 hover:bg-white rounded-lg transition-colors shadow-sm ml-1" title="Salin ID">
                        {copied ? <Check className="w-4 h-4 text-emerald-500"/> : <Copy className="w-4 h-4"/>}
                      </button>
                    </div>
                 </div>
              </div>
            </div>
          </div>
        </div>

        {/* QUICK STATS - DYNAMIC DARI API */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 animate-fade-in-up" style={{ animationDelay: '50ms' }}>
           <StatCard icon={<Calendar />} title="Bergabung Sejak" value={`${joinYear}`} color="text-blue-600" bg="bg-blue-50" />
           <StatCard icon={<Receipt />} title="Total Transaksi" value={`${totalTransactions} Transaksi`} color="text-amber-500" bg="bg-amber-50" />
           <StatCard icon={<ShieldCheck />} title="Tipe Member" value={planType.toUpperCase()} color="text-purple-600" bg="bg-purple-50" />
           <StatCard icon={<Activity />} title="Status Akun" value={isPremiumActive ? 'Aktif' : 'Basic'} color="text-emerald-600" bg="bg-emerald-50" />
        </div>

        {/* CONTENT GRID UTAMA */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
           
           {/* LEFT COLUMN: Personal Info, Badges & Completed Courses */}
           <div className="lg:col-span-2 space-y-8">
              
              {/* Personal Info Box */}
              <div className="bg-white border border-slate-200 shadow-lg rounded-[2rem] p-8 animate-fade-in-up" style={{ animationDelay: '100ms' }}>
                 <div className="flex items-center justify-between mb-8 border-b border-slate-100 pb-4">
                    <div className="flex items-center gap-3">
                       <div className="p-3 bg-blue-50 border border-blue-100 rounded-xl">
                          <UserIcon className="w-6 h-6 text-blue-600" />
                       </div>
                       <h2 className="text-xl font-black text-slate-900">Informasi Pribadi</h2>
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
              <div className="bg-white border border-slate-200 shadow-lg rounded-[2rem] p-8 animate-fade-in-up" style={{ animationDelay: '150ms' }}>
                 <div className="flex items-center gap-3 mb-6">
                    <div className="p-3 bg-amber-50 border border-amber-100 rounded-xl">
                       <AwardIcon className="w-6 h-6 text-amber-500" />
                    </div>
                    <div>
                       <h2 className="text-xl font-black text-slate-900">Pencapaian Akun</h2>
                       <p className="text-sm text-slate-500 font-medium mt-1">Status dan lencana berdasarkan aktivitas kamu.</p>
                    </div>
                 </div>

                 <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
                    {dynamicBadges.map(badge => (
                       <div key={badge.id} className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-center hover:shadow-md transition-shadow group">
                          <div className={`w-12 h-12 mx-auto rounded-full flex items-center justify-center ${badge.bg} ${badge.border} border mb-3 group-hover:scale-110 transition-transform`}>
                             <badge.icon className={`w-6 h-6 ${badge.color}`} />
                          </div>
                          <h4 className="font-bold text-slate-800 text-sm mb-1">{badge.name}</h4>
                          <p className="text-[10px] text-slate-500 font-medium leading-relaxed">{badge.desc}</p>
                       </div>
                    ))}
                 </div>
              </div>

              {/* BARU: Course Selesai 100% (Bukan Modul Satuan) */}
              <div className="bg-white border border-slate-200 shadow-lg rounded-[2rem] p-8 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
                 <div className="flex items-center gap-3 mb-6">
                    <div className="p-3 bg-emerald-50 border border-emerald-100 rounded-xl">
                       <Trophy className="w-6 h-6 text-emerald-600" />
                    </div>
                    <div>
                       <h2 className="text-xl font-black text-slate-900">Course Selesai (100%)</h2>
                       <p className="text-sm text-slate-500 font-medium mt-1">Daftar course yang berhasil kamu tamatkan secara penuh.</p>
                    </div>
                 </div>

                 <div className="space-y-3 max-h-[350px] overflow-y-auto pr-2 custom-scrollbar">
                    {completedCourses.length === 0 ? (
                       <div className="text-center py-10 border-2 border-dashed border-slate-200 rounded-2xl bg-slate-50">
                          <p className="text-slate-500 font-medium text-sm">Belum ada course yang berhasil diselesaikan 100%.</p>
                       </div>
                    ) : (
                       completedCourses.map(course => (
                          <div key={course.id} className="flex items-center justify-between p-4 bg-slate-50 border border-slate-200 rounded-2xl hover:border-emerald-300 hover:shadow-md transition-all">
                             <div className="flex items-center gap-4">
                                <div className="w-10 h-10 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center shrink-0 shadow-sm border border-emerald-200">
                                   <Trophy className="w-5 h-5" />
                                </div>
                                <div>
                                   <h4 className="font-bold text-slate-800 text-sm line-clamp-1">{course.name}</h4>
                                   <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mt-1">
                                     Tamat • {course.totalModules} Modul
                                   </p>
                                </div>
                             </div>
                             <span className="text-xs font-black text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200 shrink-0 shadow-sm">
                               100%
                             </span>
                          </div>
                       ))
                    )}
                 </div>
              </div>

           </div>

           {/* RIGHT COLUMN: Subscriptions & Quick Actions */}
           <div className="lg:col-span-1 space-y-8">
              
              {/* Subscriptions Box */}
              <div className="bg-white border border-slate-200 shadow-lg rounded-[2rem] p-8 animate-fade-in-up" style={{ animationDelay: '250ms' }}>
                <div className="flex items-center gap-3 mb-6">
                   <div className="p-3 bg-purple-50 border border-purple-100 rounded-xl">
                      <CreditCard className="w-6 h-6 text-purple-600" />
                   </div>
                   <h2 className="text-xl font-black text-slate-900">Riwayat Langganan</h2>
                </div>

                <div className="space-y-4 max-h-[350px] overflow-y-auto pr-2 custom-scrollbar">
                   {subs.length === 0 ? (
                      <div className="text-center py-10 border-2 border-dashed border-slate-200 rounded-2xl bg-slate-50">
                         <p className="text-slate-500 font-medium text-sm">Belum ada riwayat langganan premium.</p>
                      </div>
                   ) : (
                      subs.map(sub => {
                        const type = sub.subscribe_type?.toLowerCase();
                        const grad = type === 'pro' || type === 'ultra' ? 'from-amber-400 to-orange-500' : type === 'plus' ? 'from-fuchsia-500 to-purple-600' : 'from-blue-500 to-cyan-500';
                        
                        return (
                          <div key={sub.id} className="relative group bg-slate-50 border border-slate-200 rounded-2xl overflow-hidden hover:border-blue-300 hover:shadow-md transition-all">
                             <div className={`absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b ${grad}`}></div>
                             <div className="p-5 pl-6">
                                <div className="flex justify-between items-start mb-3">
                                   <div>
                                      <h3 className="font-black text-slate-900 uppercase text-lg tracking-tight">{sub.subscribe_type}</h3>
                                      <p className="text-xs text-slate-500 font-bold">{sub.period}</p>
                                   </div>
                                   <div className={`p-1.5 rounded-lg bg-gradient-to-br ${grad} shadow-md`}>
                                      <Crown className="w-4 h-4 text-white" />
                                   </div>
                                </div>
                                
                                <div className="space-y-1.5 border-t border-slate-200 pt-3">
                                   <div className="flex items-center gap-2 text-xs font-medium text-slate-600">
                                      <Calendar className="w-3.5 h-3.5 text-blue-500"/>
                                      {sub.start_date} - {sub.end_date}
                                   </div>
                                   <div className="flex items-center gap-2 text-xs font-medium text-slate-600">
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

              {/* Quick Actions / Links */}
              <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-[2rem] p-8 shadow-xl text-white relative overflow-hidden animate-fade-in-up" style={{ animationDelay: '300ms' }}>
                 <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl pointer-events-none"></div>
                 <h3 className="text-lg font-black mb-4 flex items-center gap-2">
                    <Settings className="w-5 h-5 text-slate-300" /> Pengaturan Cepat
                 </h3>
                 <div className="space-y-3 relative z-10">
                    <button onClick={() => setShowEditModal(true)} className="w-full flex items-center justify-between p-3.5 bg-white/10 hover:bg-white/20 border border-white/10 rounded-xl transition-all font-medium text-sm">
                       <span className="flex items-center gap-3"><Edit3 className="w-4 h-4 text-blue-400" /> Ubah Password</span>
                       <ExternalLink className="w-4 h-4 text-slate-400" />
                    </button>
                    <a href="https://wa.me/6285183209494" target="_blank" rel="noreferrer" className="w-full flex items-center justify-between p-3.5 bg-white/10 hover:bg-white/20 border border-white/10 rounded-xl transition-all font-medium text-sm">
                       <span className="flex items-center gap-3"><MessageCircle className="w-4 h-4 text-emerald-400" /> Bantuan CS</span>
                       <ExternalLink className="w-4 h-4 text-slate-400" />
                    </a>
                 </div>
              </div>

           </div>
        </div>
      </main>

      {/* EDIT MODAL (PENGALIHAN AXID) */}
      {showEditModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-lg bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-2xl animate-scale-in">
             <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-8 text-center relative">
                <button onClick={() => setShowEditModal(false)} className="absolute top-4 right-4 p-2 bg-black/10 hover:bg-black/20 rounded-xl text-white transition-colors">
                   <X className="w-5 h-5" />
                </button>
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-md shadow-inner">
                   <AlertCircle className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-black text-white">Edit Profile</h3>
                <p className="text-blue-100 text-sm font-medium mt-1">Sistem Terintegrasi AstByte</p>
             </div>
             
             <div className="p-8">
                <div className="bg-blue-50 border border-blue-100 rounded-2xl p-5 mb-6">
                   <p className="text-slate-600 text-sm text-center leading-relaxed">
                      Untuk keamanan dan sinkronisasi data antar platform, perubahan profil dan password dikelola terpusat di <span className="font-bold text-blue-600">AXID AstByte</span>.
                   </p>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-3">
                   <button onClick={() => setShowEditModal(false)} className="flex-1 py-3.5 bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 rounded-xl font-bold transition-all shadow-sm">
                      Batal
                   </button>
                   <button onClick={handleRedirectToAXID} className="flex-1 py-3.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-md shadow-blue-600/20">
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
        .animate-fade-in-up { animation: fade-in-up 0.5s ease-out forwards; }
        .animate-scale-in { animation: scale-in 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        
        /* Light Theme Custom Scrollbar */
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
       <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2">
          <span className="text-blue-500">{icon}</span> {label}
       </label>
       <div className="w-full bg-slate-50 border border-slate-200 rounded-xl px-5 py-3.5 text-slate-800 font-bold text-sm shadow-sm">
          {value || <span className="text-slate-400 italic font-medium">Belum diatur</span>}
       </div>
    </div>
  );
}

function StatCard({ icon, title, value, color, bg }: { icon: any, title: string, value: string, color: string, bg: string }) {
   return (
      <div className="bg-white border border-slate-200 rounded-[1.5rem] p-5 shadow-sm hover:shadow-md transition-shadow flex items-center gap-4">
         <div className={`p-3 rounded-xl ${bg} ${color}`}>
            {icon}
         </div>
         <div>
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">{title}</p>
            <p className="text-lg font-black text-slate-800">{value}</p>
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