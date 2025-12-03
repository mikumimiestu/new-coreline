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
  LogOut,
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
  const { user } = useAuth(); // Asumsi useAuth juga punya fungsi logout jika perlu

  const [authUser, setAuthUser] = useState<any>(null);
  const [subs, setSubs] = useState<Subscription[]>([]);
  const [loading, setLoading] = useState(true);

  // Edit State
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    phone: '',
  });

  // UI State
  const [copied, setCopied] = useState(false);
  const [showPublicId, setShowPublicId] = useState(false);
  const [photoError, setPhotoError] = useState(false);
  const [toast, setToast] = useState<{ type: 'success' | 'error'; msg: string } | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

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
          setFormData({
            full_name: meData.data.user.full_name,
            email: meData.data.user.email,
            phone: meData.data.user.phone || '',
          });
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

  const showToast = (type: 'success' | 'error', msg: string) => {
    setToast({ type, msg });
    setTimeout(() => setToast(null), 3000);
  };

  const handleCopyId = () => {
    if (!authUser?.public_id) return;
    navigator.clipboard.writeText(authUser.public_id);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const validate = () => {
    const e: Record<string, string> = {};
    if (!formData.full_name.trim()) e.full_name = 'Nama lengkap wajib diisi.';
    if (!formData.email.includes('@')) e.email = 'Format email tidak valid.';
    if (!formData.phone) e.phone = 'Nomor HP wajib diisi.';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSave = async () => {
    if (!validate()) return;
    setSaving(true);
    const token = localStorage.getItem('authx_token');

    try {
      const form = new FormData();
      form.append('full_name', formData.full_name);
      form.append('email', formData.email);
      form.append('phone', formData.phone);

      const res = await fetch(`${AUTHX_BASE}/api/account`, {
        method: 'PUT',
        headers: { Authorization: `Bearer ${token}` },
        body: form,
      });

      const data = await res.json();

      if (!res.ok) {
        showToast('error', data.message || 'Gagal memperbarui profil.');
      } else {
        showToast('success', 'Profil berhasil diperbarui!');
        setAuthUser(data.data.user);
        setIsEditing(false);
      }
    } catch {
      showToast('error', 'Terjadi kesalahan jaringan.');
    } finally {
      setSaving(false);
    }
  };

  const getMaskedPublicId = (id: string) => {
    if (!id) return '';
    if (id.length <= 8) return '••••••••';
    return `${id.slice(0, 4)}••••••••${id.slice(-4)}`;
  };

  // ================= RENDER HELPERS =================
  
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 dark:bg-slate-950">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-10 w-10 animate-spin text-blue-600 dark:text-blue-400" />
          <p className="text-sm font-medium text-slate-500 animate-pulse">Memuat profil...</p>
        </div>
      </div>
    );
  }

  if (!authUser) {
    return (
      <div className="flex min-h-screen items-center justify-center p-4 bg-slate-50 dark:bg-slate-950">
        <div className="w-full max-w-md rounded-2xl bg-white p-8 text-center shadow-xl dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/30">
            <X className="h-8 w-8 text-red-600 dark:text-red-400" />
          </div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">Akses Ditolak</h2>
          <p className="mt-2 text-slate-600 dark:text-slate-400 mb-6">
            Sesi Anda telah berakhir atau data tidak ditemukan.
          </p>
          <button
            onClick={onBack}
            className="w-full rounded-xl bg-blue-600 py-3 font-semibold text-white hover:bg-blue-700 transition-colors"
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
  
  // Theme color based on sub
  const accentColor = isPro ? 'text-amber-500' : isPlus ? 'text-purple-500' : 'text-blue-500';
  const ringColor = isPro ? 'ring-amber-500' : isPlus ? 'ring-purple-500' : 'ring-blue-500';
  const gradientBg = isPro 
    ? 'bg-gradient-to-r from-amber-500 to-yellow-500' 
    : isPlus 
      ? 'bg-gradient-to-r from-purple-600 to-pink-500' 
      : 'bg-gradient-to-r from-blue-600 to-cyan-500';

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-12 transition-colors duration-300">
      {/* Background Decor */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-blue-400/20 dark:bg-blue-600/10 rounded-full blur-[80px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-400/20 dark:bg-purple-600/10 rounded-full blur-[80px]" />
      </div>

      {/* Navbar Simple */}
      <nav className="sticky top-0 z-30 w-full border-b border-white/10 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4 sm:px-6">
          <button
            onClick={onBack}
            className="group flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition-all hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Kembali
          </button>
          <span className="text-sm font-bold text-slate-400 tracking-wider uppercase">Profile</span>
        </div>
      </nav>

      <main className="relative z-10 mx-auto max-w-5xl space-y-6 px-4 py-8 sm:px-6">
        
        {/* HEADER SECTION: Avatar & Basic Info */}
        <div className="relative overflow-hidden rounded-3xl bg-white dark:bg-slate-900 shadow-xl shadow-slate-200/50 dark:shadow-black/50 border border-slate-200 dark:border-slate-800 p-6 sm:p-10 animate-fade-in">
          <div className="flex flex-col md:flex-row items-center gap-8">
            
            {/* Avatar */}
            <div className="relative group shrink-0">
              <div className={`absolute -inset-1 rounded-full ${gradientBg} opacity-75 blur transition duration-500 group-hover:opacity-100`} />
              <img
                src={avatarUrl}
                onError={() => setPhotoError(true)}
                alt="Profile"
                className="relative h-32 w-32 rounded-full object-cover ring-4 ring-white dark:ring-slate-900 shadow-2xl"
              />
              <div className="absolute bottom-1 right-1 flex h-8 w-8 items-center justify-center rounded-full bg-white dark:bg-slate-800 shadow-lg text-blue-500 ring-2 ring-white dark:ring-slate-900">
                <ShieldCheck className="h-5 w-5" />
              </div>
            </div>

            {/* Info */}
            <div className="flex-1 text-center md:text-left space-y-2">
              <div className="flex flex-col md:flex-row items-center md:items-start gap-3">
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  {authUser.full_name}
                  {(isPro || isPlus) && <Sparkles className={`h-6 w-6 ${accentColor}`} />}
                </h1>
                
                {authUser.subscription_status === 'active' && (
                  <span className={`px-3 py-1 rounded-full text-xs font-bold text-white uppercase tracking-wider shadow-lg ${gradientBg}`}>
                    {authUser.subscription_type}
                  </span>
                )}
              </div>
              
              <p className="text-slate-500 dark:text-slate-400 font-medium flex items-center justify-center md:justify-start gap-2">
                <Mail className="h-4 w-4" /> {authUser.email}
              </p>

              <div className="pt-2">
                <p className="text-xs text-slate-400 uppercase tracking-widest font-semibold mb-1">Public ID</p>
                <div className="inline-flex items-center gap-2 rounded-xl bg-slate-100 dark:bg-slate-800 p-1.5 pr-3 ring-1 ring-slate-200 dark:ring-slate-700">
                  <div className="rounded-lg bg-white dark:bg-slate-900 px-3 py-1.5 font-mono text-sm font-semibold text-slate-700 dark:text-slate-300 min-w-[140px] text-center">
                    {showPublicId ? authUser.public_id : getMaskedPublicId(authUser.public_id)}
                  </div>
                  <button 
                    onClick={() => setShowPublicId(!showPublicId)}
                    className="p-1.5 text-slate-500 hover:text-blue-500 transition-colors"
                  >
                    {showPublicId ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                  <button 
                    onClick={handleCopyId}
                    className="p-1.5 text-slate-500 hover:text-blue-500 transition-colors"
                    title="Copy ID"
                  >
                    {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* LEFT COL: Personal Info Form */}
          <div className="lg:col-span-2 space-y-6">
            <div className="rounded-3xl bg-white dark:bg-slate-900 shadow-lg border border-slate-200 dark:border-slate-800 p-6 sm:p-8 animate-slide-in-up">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <UserIcon className="h-5 w-5 text-blue-500" />
                  Informasi Pribadi
                </h2>
              </div>

              <div className="grid gap-5">
                <Field
                  label="Nama Lengkap"
                  icon={<UserIcon className="h-4 w-4" />}
                  value={formData.full_name}
                  isEditing={isEditing}
                  onChange={(v) => setFormData({ ...formData, full_name: v })}
                  error={errors.full_name}
                />
                <Field
                  label="Alamat Email"
                  icon={<Mail className="h-4 w-4" />}
                  value={formData.email}
                  isEditing={isEditing}
                  onChange={(v) => setFormData({ ...formData, email: v })}
                  error={errors.email}
                  type="email"
                />
                <Field
                  label="Nomor Telepon"
                  icon={<Phone className="h-4 w-4" />}
                  value={formData.phone}
                  isEditing={isEditing}
                  onChange={(v) => setFormData({ ...formData, phone: v })}
                  error={errors.phone}
                  type="tel"
                />
              </div>
            </div>
          </div>

          {/* RIGHT COL: Subscriptions */}
          <div className="lg:col-span-1">
            <div className="h-full rounded-3xl bg-white dark:bg-slate-900 shadow-lg border border-slate-200 dark:border-slate-800 p-6 sm:p-8 animate-slide-in-up" style={{ animationDelay: '100ms' }}>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2 mb-6">
                <CreditCard className="h-5 w-5 text-purple-500" />
                Langganan
              </h2>

              <div className="space-y-4">
                {subs.length === 0 ? (
                  <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-200 dark:border-slate-800 py-8 px-4 text-center">
                    <div className="mb-3 rounded-full bg-slate-100 dark:bg-slate-800 p-3">
                      <CreditCard className="h-6 w-6 text-slate-400" />
                    </div>
                    <p className="text-sm font-medium text-slate-500">Belum ada riwayat langganan.</p>
                  </div>
                ) : (
                  subs.map((sub) => (
                    <div
                      key={sub.id}
                      className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-50 to-white dark:from-slate-800 dark:to-slate-900 p-4 shadow-sm ring-1 ring-slate-200 dark:ring-slate-700 transition-all hover:shadow-md"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex items-center gap-2">
                          <Crown className="h-4 w-4 text-amber-500" />
                          <span className="font-bold text-slate-800 dark:text-slate-100 text-sm uppercase">{sub.subscribe_type}</span>
                        </div>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
                          ACTIVE
                        </span>
                      </div>
                      
                      <div className="space-y-1">
                        <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                          <Calendar className="h-3 w-3" />
                          {sub.start_date} - {sub.end_date}
                        </p>
                        <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                          via {sub.payment_method}
                        </p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

        </div>
      </main>

      {/* TOAST NOTIFICATION */}
      {toast && (
        <div className="fixed bottom-6 left-1/2 z-50 flex -translate-x-1/2 items-center gap-3 rounded-xl bg-slate-900/90 px-4 py-3 text-white shadow-2xl backdrop-blur-md animate-bounce-in">
          {toast.type === 'success' ? (
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-green-500">
              <Check className="h-3.5 w-3.5 text-white" />
            </div>
          ) : (
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-red-500">
              <X className="h-3.5 w-3.5 text-white" />
            </div>
          )}
          <span className="text-sm font-medium">{toast.msg}</span>
        </div>
      )}

      {/* CSS Animations */}
      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: scale(0.98); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes slide-in-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes bounce-in {
          0% { opacity: 0; transform: translate(-50%, 20px) scale(0.9); }
          50% { transform: translate(-50%, -5px) scale(1.02); }
          100% { opacity: 1; transform: translate(-50%, 0) scale(1); }
        }
        .animate-fade-in { animation: fade-in 0.5s ease-out forwards; }
        .animate-slide-in-up { animation: slide-in-up 0.5s ease-out forwards; }
        .animate-bounce-in { animation: bounce-in 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards; }
      `}</style>
    </div>
  );
}

// ================= COMPONENT: FIELD =================

interface FieldProps {
  label: string;
  value: string;
  icon: JSX.Element;
  isEditing: boolean;
  onChange: (val: string) => void;
  error?: string;
  type?: string;
}

function Field({ label, value, icon, isEditing, onChange, error, type = 'text' }: FieldProps) {
  return (
    <div className="group">
      <label className="mb-1.5 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
        {icon}
        {label}
      </label>
      
      {isEditing ? (
        <div className="relative">
          <input
            type={type}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className={`w-full rounded-xl border bg-slate-50 px-4 py-2.5 text-sm font-medium text-slate-900 placeholder-slate-400 outline-none transition-all focus:ring-2 dark:bg-slate-800 dark:text-white 
              ${error 
                ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' 
                : 'border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 dark:border-slate-700'
              }`}
          />
          {error && <p className="mt-1 text-xs font-semibold text-red-500 flex items-center gap-1"><X className="h-3 w-3"/> {error}</p>}
        </div>
      ) : (
        <div className="w-full rounded-xl bg-slate-50 dark:bg-slate-800/50 px-4 py-3 text-sm font-semibold text-slate-800 dark:text-slate-200 border border-transparent dark:border-slate-700/50">
          {value || <span className="text-slate-400 italic">Tidak diatur</span>}
        </div>
      )}
    </div>
  );
}