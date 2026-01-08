// src/components/ProfilePage.tsx
import { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import {
  User as UserIcon,
  Mail,
  Phone,
  CreditCard,
  ArrowLeft,
  Copy,
  Check,
  ShieldCheck,
  Loader2,
  Sparkles,
  Calendar,
  Crown,
  Edit3,
  Save,
  X,
  Eye,
  EyeOff,
  Star,
  Award,
  Zap,
  CheckCircle,
  ExternalLink,
  AlertCircle,
} from 'lucide-react';

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
}

interface ProfilePageProps {
  onBack: () => void;
}

export default function ProfilePage({ onBack }: ProfilePageProps) {
  const { user } = useAuth();

  const [authUser, setAuthUser] = useState<any>(null);
  const [subs, setSubs] = useState<Subscription[]>([]);
  const [loading, setLoading] = useState(true);

  // Modal State
  const [showEditModal, setShowEditModal] = useState(false);

  // UI State
  const [copied, setCopied] = useState(false);
  const [showPublicId, setShowPublicId] = useState(false);
  const [photoError, setPhotoError] = useState(false);

  // ================= LOAD DATA =================
  useEffect(() => {
    const token = localStorage.getItem('authx_token');
    if (!token) {
      setLoading(false);
      return;
    }

    async function loadData() {
      try {
        // 1. Get User
        const meRes = await fetch(`${AUTHX_BASE}/api/auth/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const meData = await meRes.json();

        if (meRes.ok) {
          setAuthUser(meData.data.user);
        }

        // 2. Get Subscriptions
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
  }, []);

  // ================= ACTIONS =================

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

  const handleEditProfile = () => {
    setShowEditModal(true);
  };

  const handleRedirectToAXID = () => {
    window.open('https://axid.astbyte.com', '_blank');
    setShowEditModal(false);
  };

  // ================= RENDER HELPERS =================

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
        <div className="flex flex-col items-center gap-4">
          <div className="relative">
            <div className="w-20 h-20 border-4 border-blue-200 dark:border-blue-900 rounded-full"></div>
            <div className="w-20 h-20 border-4 border-blue-600 dark:border-blue-400 border-t-transparent rounded-full animate-spin absolute top-0 left-0"></div>
          </div>
          <p className="text-base font-bold text-slate-700 dark:text-slate-300 animate-pulse">Memuat profil...</p>
        </div>
      </div>
    );
  }

  if (!authUser) {
    return (
      <div className="flex min-h-screen items-center justify-center p-4 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
        <div className="w-full max-w-md rounded-3xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl p-10 text-center shadow-2xl border border-slate-200 dark:border-slate-800">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-red-500 to-pink-500 shadow-xl">
            <X className="h-10 w-10 text-white" />
          </div>
          <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-3">Akses Ditolak</h2>
          <p className="text-slate-600 dark:text-slate-400 mb-8 text-lg">
            Sesi Anda telah berakhir atau data tidak ditemukan.
          </p>
          <button
            onClick={onBack}
            className="w-full rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 py-4 font-black text-white hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            Kembali ke Beranda
          </button>
        </div>
      </div>
    );
  }

  const avatarUrl =
    authUser.avatar_url && !photoError
      ? `${AUTHX_BASE}${authUser.avatar_url}`
      : `https://ui-avatars.com/api/?background=0F172A&color=fff&name=${encodeURIComponent(
          authUser.full_name || 'User'
        )}`;

  const isPro = authUser.subscription_type?.toLowerCase() === 'pro';
  const isPlus = authUser.subscription_type?.toLowerCase() === 'plus';

  const gradientBg = isPro
    ? 'from-amber-500 to-orange-500'
    : isPlus
    ? 'from-purple-600 to-pink-500'
    : 'from-blue-600 to-indigo-600';

  const glowColor = isPro
    ? 'shadow-amber-500/30'
    : isPlus
    ? 'shadow-purple-500/30'
    : 'shadow-blue-500/30';

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/30 dark:from-[#0B0F19] dark:via-slate-950 dark:to-slate-900 pb-12 transition-colors duration-300">
      {/* Background Decor */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-blue-400/20 dark:bg-blue-600/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-400/20 dark:bg-purple-600/10 rounded-full blur-[100px]" />
      </div>

      {/* Navbar */}
      <nav className="sticky top-0 z-40 w-full border-b border-white/20 dark:border-slate-800/50 bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl shadow-lg">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-20 items-center justify-between">
            <button
              onClick={onBack}
              className="group flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-bold text-slate-600 transition-all hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
            >
              <ArrowLeft className="h-5 w-5 transition-transform group-hover:-translate-x-1" />
              <span className="hidden sm:inline">Kembali ke Dashboard</span>
              <span className="sm:hidden">Kembali</span>
            </button>

            <div className="flex items-center gap-3">
              <div className="hidden sm:flex items-center gap-2 bg-slate-100 dark:bg-slate-800 px-4 py-2 rounded-xl">
                <UserIcon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                <span className="text-sm font-black text-slate-900 dark:text-white">Profil Saya</span>
              </div>
              <button
                onClick={handleEditProfile}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-sm hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                <Edit3 className="w-4 h-4" />
                <span className="hidden sm:inline">Edit Profile</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="relative z-10 mx-auto max-w-7xl space-y-8 px-4 py-10 sm:px-6 lg:px-8">
        {/* HEADER CARD: Avatar & Basic Info */}
        <div className="relative overflow-hidden rounded-3xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl shadow-2xl border border-slate-200 dark:border-slate-800 p-8 sm:p-12 animate-fade-in">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full blur-3xl -mr-32 -mt-32"></div>

          <div className="relative flex flex-col lg:flex-row items-center lg:items-start gap-8">
            {/* Avatar Section */}
            <div className="relative group shrink-0">
              <div className={`absolute -inset-2 bg-gradient-to-r ${gradientBg} opacity-75 blur-xl transition duration-500 group-hover:opacity-100 rounded-full ${glowColor}`} />
              <div className="relative">
                <img
                  src={avatarUrl}
                  onError={() => setPhotoError(true)}
                  alt="Profile"
                  className="relative h-40 w-40 rounded-full object-cover ring-4 ring-white dark:ring-slate-900 shadow-2xl"
                />
                <div className="absolute bottom-2 right-2 flex h-12 w-12 items-center justify-center rounded-full bg-white dark:bg-slate-800 shadow-xl">
                  <ShieldCheck className="h-6 w-6 text-green-500" />
                </div>
              </div>
            </div>

            {/* Info Section */}
            <div className="flex-1 text-center lg:text-left space-y-4 w-full">
              <div className="space-y-3">
                <div className="flex flex-col lg:flex-row items-center lg:items-start gap-3">
                  <h1 className="text-4xl sm:text-5xl font-black text-slate-900 dark:text-white flex items-center gap-3">
                    {authUser.full_name}
                    {(isPro || isPlus) && <Sparkles className={`h-8 w-8 text-transparent bg-clip-text bg-gradient-to-r ${gradientBg}`} />}
                  </h1>
                </div>

                {authUser.subscription_status === 'active' && (
                  <div className="flex justify-center lg:justify-start">
                    <span className={`inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-black text-white uppercase tracking-wider shadow-xl bg-gradient-to-r ${gradientBg}`}>
                      <Crown className="h-4 w-4" />
                      {authUser.subscription_type} Member
                    </span>
                  </div>
                )}
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-4 py-2 rounded-xl">
                  <Mail className="h-5 w-5" />
                  <span className="font-semibold text-sm">{authUser.email}</span>
                </div>
                {authUser.phone && (
                  <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-4 py-2 rounded-xl">
                    <Phone className="h-5 w-5" />
                    <span className="font-semibold text-sm">{authUser.phone}</span>
                  </div>
                )}
              </div>

              {/* Public ID Section */}
              <div className="pt-4">
                <p className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-widest font-bold mb-2">Public ID</p>
                <div className="inline-flex items-center gap-2 rounded-2xl bg-slate-100 dark:bg-slate-800 p-2 pr-4 ring-2 ring-slate-200 dark:ring-slate-700">
                  <div className="rounded-xl bg-white dark:bg-slate-900 px-4 py-2.5 font-mono text-sm font-black text-slate-700 dark:text-slate-300 min-w-[160px] text-center">
                    {showPublicId ? authUser.public_id : getMaskedPublicId(authUser.public_id)}
                  </div>
                  <button
                    onClick={() => setShowPublicId(!showPublicId)}
                    className="p-2 text-slate-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700"
                  >
                    {showPublicId ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                  <button
                    onClick={handleCopyId}
                    className="p-2 text-slate-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700"
                    title="Copy ID"
                  >
                    {copied ? <Check className="h-5 w-5 text-green-500" /> : <Copy className="h-5 w-5" />}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* LEFT COL: Personal Info */}
          <div className="lg:col-span-2 space-y-8">
            <div className="rounded-3xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl shadow-xl border border-slate-200 dark:border-slate-800 p-8 animate-slide-in-up">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-black text-slate-900 dark:text-white flex items-center gap-3">
                  <div className="p-3 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl">
                    <UserIcon className="h-6 w-6 text-white" />
                  </div>
                  Informasi Pribadi
                </h2>
              </div>

              <div className="grid gap-6">
                <Field
                  label="Nama Lengkap"
                  icon={<UserIcon className="h-5 w-5" />}
                  value={authUser.full_name}
                />
                <Field
                  label="Alamat Email"
                  icon={<Mail className="h-5 w-5" />}
                  value={authUser.email}
                />
                <Field
                  label="Nomor Telepon"
                  icon={<Phone className="h-5 w-5" />}
                  value={authUser.phone || '-'}
                />
              </div>
            </div>
          </div>

          {/* RIGHT COL: Subscriptions */}
          <div className="lg:col-span-1">
            <div className="h-full rounded-3xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl shadow-xl border border-slate-200 dark:border-slate-800 p-8 animate-slide-in-up" style={{ animationDelay: '100ms' }}>
              <h2 className="text-2xl font-black text-slate-900 dark:text-white flex items-center gap-3 mb-6">
                <div className="p-3 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl">
                  <CreditCard className="h-6 w-6 text-white" />
                </div>
                Langganan
              </h2>

              {/* Scrollable Container */}
              <div className="max-h-[500px] overflow-y-auto pr-2 space-y-4 custom-scrollbar">
                {subs.length === 0 ? (
                  <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-300 dark:border-slate-700 py-12 px-6 text-center bg-slate-50 dark:bg-slate-800/50">
                    <div className="mb-4 rounded-full bg-slate-200 dark:bg-slate-700 p-4">
                      <CreditCard className="h-8 w-8 text-slate-400" />
                    </div>
                    <p className="text-sm font-bold text-slate-500 dark:text-slate-400">
                      Belum ada riwayat langganan
                    </p>
                  </div>
                ) : (
                  subs.map((sub) => {
                    const subType = sub.subscribe_type?.toLowerCase();
                    const subGradient = subType === 'pro'
                      ? 'from-amber-500 to-orange-500'
                      : subType === 'plus'
                      ? 'from-purple-600 to-pink-500'
                      : 'from-blue-600 to-indigo-600';

                    return (
                      <div
                        key={sub.id}
                        className="group relative overflow-hidden rounded-2xl bg-white dark:bg-slate-800 shadow-lg border-2 border-slate-200 dark:border-slate-700 transition-all hover:shadow-xl hover:-translate-y-1"
                      >
                        <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${subGradient}`}></div>

                        <div className="p-6 space-y-4">
                          <div className="flex justify-between items-start">
                            <div className="flex items-center gap-3">
                              <div className={`p-2 bg-gradient-to-br ${subGradient} rounded-xl shadow-lg`}>
                                <Crown className="h-5 w-5 text-white" />
                              </div>
                              <div>
                                <span className="font-black text-slate-900 dark:text-white text-lg uppercase">
                                  {sub.subscribe_type}
                                </span>
                                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                                  {sub.period}
                                </p>
                              </div>
                            </div>
                            <span className="text-xs font-black px-3 py-1.5 rounded-full bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 flex items-center gap-1">
                              <CheckCircle className="h-3 w-3" />
                              ACTIVE
                            </span>
                          </div>

                          <div className="space-y-2 pt-2 border-t border-slate-200 dark:border-slate-700">
                            <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                              <Calendar className="h-4 w-4 text-blue-500" />
                              <span className="font-semibold">
                                {sub.start_date} - {sub.end_date}
                              </span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                              <Zap className="h-4 w-4 text-purple-500" />
                              <span className="font-semibold">via {sub.payment_method}</span>
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

      {/* EDIT PROFILE MODAL */}
      {showEditModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-lg rounded-3xl bg-white dark:bg-slate-900 shadow-2xl border-2 border-slate-200 dark:border-slate-800 animate-scale-in overflow-hidden">
            {/* Header */}
            <div className="relative bg-gradient-to-r from-blue-600 to-indigo-600 p-8 text-center">
              <button
                onClick={() => setShowEditModal(false)}
                className="absolute top-4 right-4 p-2 rounded-xl bg-white/20 hover:bg-white/30 transition-colors"
              >
                <X className="h-5 w-5 text-white" />
              </button>
              <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
                <AlertCircle className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-3xl font-black text-white mb-2">Edit Profile</h3>
              <p className="text-blue-100 text-sm font-semibold">Pemberitahuan Penting</p>
            </div>

            {/* Content */}
            <div className="p-8 space-y-6">
              <div className="bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-200 dark:border-blue-800 rounded-2xl p-6">
                <p className="text-slate-700 dark:text-slate-300 text-base leading-relaxed font-medium text-center">
                  Edit profile hanya dapat dilakukan melalui platform <span className="font-black text-blue-600 dark:text-blue-400">AXID AstByte</span>. Silakan kunjungi halaman AXID untuk mengelola profil Anda.
                </p>
              </div>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => setShowEditModal(false)}
                  className="flex-1 px-6 py-4 rounded-xl border-2 border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-bold hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
                >
                  Batal
                </button>
                <button
                  onClick={handleRedirectToAXID}
                  className="flex-1 px-6 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-black hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
                >
                  <ExternalLink className="h-5 w-5" />
                  Buka AXID
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CSS Animations */}
      {/* CSS Hanya berlaku untuk animasi saja */}
      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes slide-in-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes scale-in {
          from { opacity: 0; transform: scale(0.9); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fade-in { animation: fade-in 0.3s ease-out forwards; }
        .animate-slide-in-up { animation: slide-in-up 0.6s ease-out forwards; }
        .animate-scale-in { animation: scale-in 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) forwards; }

        /* Custom Scrollbar */
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, rgb(147, 51, 234), rgb(219, 39, 119));
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, rgb(126, 34, 206), rgb(190, 24, 93));
        }

        /* Firefox */
        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: rgb(147, 51, 234) transparent;
        }
      `}</style>
    </div>
  );
}

// ================= COMPONENT: FIELD =================

interface FieldProps {
  label: string;
  value: string;
  icon: JSX.Element;
}

function Field({ label, value, icon }: FieldProps) {
  return (
    <div className="group">
      <label className="mb-3 flex items-center gap-2 text-xs font-black uppercase tracking-wider text-slate-600 dark:text-slate-400">
        <div className="text-blue-600 dark:text-blue-400">{icon}</div>
        {label}
      </label>

      <div className="w-full rounded-2xl bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-800/50 px-6 py-4 text-base font-bold text-slate-800 dark:text-slate-200 border-2 border-slate-200 dark:border-slate-700 shadow-sm">
        {value || <span className="text-slate-400 italic font-normal">Tidak diatur</span>}
      </div>
    </div>
  );
}