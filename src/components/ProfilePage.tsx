import { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import {
  User as UserIcon, Mail, Phone, CreditCard, ArrowLeft, Copy, Check,
  ShieldCheck, Loader2, Sparkles, Calendar, Crown, Edit3, X, Eye, EyeOff,
  Zap, CheckCircle, ExternalLink, AlertCircle, Layout
} from 'lucide-react';

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
  status?: 'active' | 'expired'; // Optional logic
}

interface ProfilePageProps {
  onBack: () => void;
}

/* ================================
 * MAIN COMPONENT
 * ================================ */
export default function ProfilePage({ onBack }: ProfilePageProps) {
  const { user } = useAuth();

  // Data State
  const [authUser, setAuthUser] = useState<any>(null);
  const [subs, setSubs] = useState<Subscription[]>([]);
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

  // --- 3. RENDER HELPERS ---
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#0F172A]">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-10 h-10 text-blue-500 animate-spin" />
          <p className="text-sm font-bold text-slate-400 animate-pulse">Memuat Profil...</p>
        </div>
      </div>
    );
  }

  if (!authUser) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#0F172A] p-6">
        <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-10 text-center">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-red-500/10 text-red-500">
            <Layout className="h-8 w-8" />
          </div>
          <h2 className="text-2xl font-black text-white mb-2">Akses Ditolak</h2>
          <p className="text-slate-400 mb-8">Sesi Anda telah berakhir atau data tidak ditemukan.</p>
          <button onClick={onBack} className="w-full py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-xl font-bold transition-all">
            Kembali
          </button>
        </div>
      </div>
    );
  }

  // Determine Visual Style based on Plan
  const planType = authUser.subscription_type?.toLowerCase() || 'free';
  const isPro = planType === 'pro';
  const isPlus = planType === 'plus';

  const accentGradient = isPro 
    ? 'from-amber-400 to-orange-600' 
    : isPlus 
    ? 'from-fuchsia-500 to-purple-600' 
    : 'from-blue-500 to-indigo-600';

  const avatarUrl = authUser.avatar_url && !photoError
    ? `${AUTHX_BASE}${authUser.avatar_url}`
    : `https://ui-avatars.com/api/?background=0F172A&color=fff&name=${encodeURIComponent(authUser.full_name)}`;

  return (
    <div className="min-h-screen bg-[#0F172A] text-slate-200 font-sans selection:bg-blue-500/30">
      
      {/* Background Ambience */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[100px]" />
      </div>

      {/* Navbar */}
      <nav className="sticky top-0 z-40 w-full border-b border-slate-800 bg-[#0F172A]/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <button onClick={onBack} className="group flex items-center gap-2 px-4 py-2 text-sm font-bold text-slate-400 hover:text-white transition-colors">
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            Kembali
          </button>
          
          <div className="flex items-center gap-3">
             <div className="hidden sm:flex items-center gap-2 bg-slate-900 border border-slate-800 px-4 py-2 rounded-xl">
               <UserIcon className="w-4 h-4 text-blue-500" />
               <span className="text-sm font-bold text-slate-200">Profil Saya</span>
             </div>
             <button
                onClick={() => setShowEditModal(true)}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all shadow-lg shadow-blue-600/20"
              >
                <Edit3 className="w-4 h-4" />
                <span className="hidden sm:inline">Edit Profile</span>
              </button>
          </div>
        </div>
      </nav>

      <main className="relative z-10 max-w-7xl mx-auto px-4 py-10 sm:px-6 lg:px-8 space-y-8">
        
        {/* HEADER CARD */}
        <div className="relative overflow-hidden rounded-[2.5rem] bg-slate-900/80 border border-slate-800 p-8 sm:p-12 animate-fade-in-up">
          {/* Decorative Glow */}
          <div className={`absolute top-0 right-0 w-64 h-64 bg-gradient-to-br ${accentGradient} opacity-10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none`}></div>

          <div className="relative flex flex-col lg:flex-row items-center lg:items-start gap-10">
            {/* Avatar */}
            <div className="relative group shrink-0">
               <div className={`absolute -inset-1 bg-gradient-to-br ${accentGradient} rounded-full opacity-50 blur-lg group-hover:opacity-80 transition-opacity duration-500`}></div>
               <img
                  src={avatarUrl}
                  onError={() => setPhotoError(true)}
                  alt="Profile"
                  className="relative w-40 h-40 rounded-full object-cover border-4 border-[#0F172A] shadow-2xl"
                />
                <div className="absolute bottom-2 right-2 w-10 h-10 bg-slate-900 rounded-full flex items-center justify-center border-2 border-slate-800">
                  <ShieldCheck className="w-5 h-5 text-green-500" />
                </div>
            </div>

            {/* Info */}
            <div className="flex-1 text-center lg:text-left space-y-5 w-full">
              <div>
                <h1 className="text-4xl sm:text-5xl font-black text-white flex flex-col lg:flex-row items-center gap-3 lg:gap-4 justify-center lg:justify-start">
                  {authUser.full_name}
                  {(isPro || isPlus) && <Sparkles className={`w-8 h-8 text-transparent bg-clip-text bg-gradient-to-r ${accentGradient}`} />}
                </h1>
                
                <div className="mt-3 flex flex-wrap gap-3 justify-center lg:justify-start">
                  {authUser.subscription_status === 'active' && (
                    <span className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-black text-white uppercase tracking-widest shadow-lg bg-gradient-to-r ${accentGradient}`}>
                      <Crown className="w-3 h-3" />
                      {planType} Member
                    </span>
                  )}
                  <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold bg-slate-800 text-slate-400 border border-slate-700">
                    <CheckCircle className="w-3 h-3 text-green-500" />
                    Verified Account
                  </span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 text-slate-400 text-sm font-medium">
                <div className="flex items-center gap-2 bg-slate-800/50 px-4 py-2 rounded-xl">
                  <Mail className="w-4 h-4 text-blue-500" /> {authUser.email}
                </div>
                {authUser.phone && (
                   <div className="flex items-center gap-2 bg-slate-800/50 px-4 py-2 rounded-xl">
                    <Phone className="w-4 h-4 text-green-500" /> {authUser.phone}
                  </div>
                )}
              </div>

              {/* Public ID */}
              <div className="pt-2">
                 <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">ASTBYTE PUBLIC ID</p>
                 <div className="inline-flex items-center gap-2 p-1.5 bg-slate-950/50 border border-slate-800 rounded-xl">
                    <div className="px-4 py-2 font-mono text-sm font-bold text-white min-w-[140px] text-center tracking-wide">
                       {showPublicId ? authUser.public_id : getMaskedPublicId(authUser.public_id)}
                    </div>
                    <div className="flex border-l border-slate-800 pl-1">
                      <button onClick={() => setShowPublicId(!showPublicId)} className="p-2 text-slate-500 hover:text-white hover:bg-slate-800 rounded-lg transition-colors">
                        {showPublicId ? <EyeOff className="w-4 h-4"/> : <Eye className="w-4 h-4"/>}
                      </button>
                      <button onClick={handleCopyId} className="p-2 text-slate-500 hover:text-blue-400 hover:bg-slate-800 rounded-lg transition-colors">
                        {copied ? <Check className="w-4 h-4 text-green-500"/> : <Copy className="w-4 h-4"/>}
                      </button>
                    </div>
                 </div>
              </div>
            </div>
          </div>
        </div>

        {/* CONTENT GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
           {/* LEFT: Personal Info */}
           <div className="lg:col-span-2 space-y-6">
              <div className="bg-slate-900/50 border border-slate-800 rounded-[2rem] p-8 animate-fade-in-up" style={{ animationDelay: '100ms' }}>
                 <div className="flex items-center gap-3 mb-8">
                    <div className="p-3 bg-blue-500/10 rounded-xl">
                       <UserIcon className="w-6 h-6 text-blue-500" />
                    </div>
                    <h2 className="text-xl font-black text-white">Informasi Pribadi</h2>
                 </div>
                 
                 <div className="grid gap-6">
                    <Field label="Nama Lengkap" value={authUser.full_name} icon={<UserIcon className="w-4 h-4"/>} />
                    <Field label="Email" value={authUser.email} icon={<Mail className="w-4 h-4"/>} />
                    <Field label="Nomor Telepon" value={authUser.phone || '-'} icon={<Phone className="w-4 h-4"/>} />
                 </div>
              </div>
           </div>

           {/* RIGHT: Subscriptions */}
           <div className="lg:col-span-1">
              <div className="bg-slate-900/50 border border-slate-800 rounded-[2rem] p-8 h-full animate-fade-in-up" style={{ animationDelay: '200ms' }}>
                <div className="flex items-center gap-3 mb-6">
                   <div className="p-3 bg-purple-500/10 rounded-xl">
                      <CreditCard className="w-6 h-6 text-purple-500" />
                   </div>
                   <h2 className="text-xl font-black text-white">Langganan</h2>
                </div>

                <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
                   {subs.length === 0 ? (
                      <div className="text-center py-10 border-2 border-dashed border-slate-800 rounded-2xl">
                         <p className="text-slate-500 font-medium text-sm">Belum ada riwayat langganan.</p>
                      </div>
                   ) : (
                      subs.map(sub => {
                        const type = sub.subscribe_type?.toLowerCase();
                        const grad = type === 'pro' ? 'from-amber-500 to-orange-600' : type === 'plus' ? 'from-fuchsia-600 to-purple-600' : 'from-blue-600 to-indigo-600';
                        
                        return (
                          <div key={sub.id} className="relative group bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden hover:border-slate-600 transition-colors">
                             <div className={`absolute top-0 left-0 w-1 h-full bg-gradient-to-b ${grad}`}></div>
                             <div className="p-5 pl-6">
                                <div className="flex justify-between items-start mb-3">
                                   <div>
                                      <h3 className="font-black text-white uppercase text-lg tracking-tight">{sub.subscribe_type}</h3>
                                      <p className="text-xs text-slate-500 font-bold">{sub.period}</p>
                                   </div>
                                   <div className={`p-1.5 rounded-lg bg-gradient-to-br ${grad} shadow-lg`}>
                                      <Crown className="w-4 h-4 text-white" />
                                   </div>
                                </div>
                                
                                <div className="space-y-1.5 border-t border-slate-800 pt-3">
                                   <div className="flex items-center gap-2 text-xs font-medium text-slate-400">
                                      <Calendar className="w-3.5 h-3.5 text-blue-500"/>
                                      {sub.start_date} - {sub.end_date}
                                   </div>
                                   <div className="flex items-center gap-2 text-xs font-medium text-slate-400">
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

      {/* EDIT MODAL */}
      {showEditModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-lg bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl animate-scale-in">
             <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-8 text-center relative">
                <button onClick={() => setShowEditModal(false)} className="absolute top-4 right-4 p-2 bg-black/10 hover:bg-black/20 rounded-xl text-white transition-colors">
                   <X className="w-5 h-5" />
                </button>
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-md">
                   <AlertCircle className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-black text-white">Edit Profile</h3>
                <p className="text-blue-100 text-sm font-medium">Redirect to Auth Provider</p>
             </div>
             
             <div className="p-8">
                <div className="bg-blue-500/10 border border-blue-500/20 rounded-2xl p-5 mb-6">
                   <p className="text-slate-300 text-sm text-center leading-relaxed">
                      Untuk keamanan data, perubahan profil dikelola terpusat di <span className="font-bold text-blue-400">AXID AstByte</span>. Anda akan dialihkan ke halaman tersebut.
                   </p>
                </div>
                
                <div className="flex gap-3">
                   <button onClick={() => setShowEditModal(false)} className="flex-1 py-3.5 bg-slate-800 hover:bg-slate-700 text-white rounded-xl font-bold transition-all">
                      Batal
                   </button>
                   <button onClick={handleRedirectToAXID} className="flex-1 py-3.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg shadow-blue-600/20">
                      <ExternalLink className="w-4 h-4" />
                      Buka AXID
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
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #334155; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #475569; }
      `}</style>
    </div>
  );
}

// Sub-Component for cleaner code
function Field({ label, value, icon }: { label: string, value: string, icon: any }) {
  return (
    <div>
       <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2">
          <span className="text-blue-500">{icon}</span> {label}
       </label>
       <div className="w-full bg-slate-950 border border-slate-800 rounded-xl px-5 py-3.5 text-slate-200 font-bold text-sm">
          {value || <span className="text-slate-600 italic font-normal">Not set</span>}
       </div>
    </div>
  );
}