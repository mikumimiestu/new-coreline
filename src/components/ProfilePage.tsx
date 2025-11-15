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

  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [copied, setCopied] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [toast, setToast] = useState<string | null>(null);

  // toggle visibility public ID
  const [showPublicId, setShowPublicId] = useState(false);

  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    phone: '',
  });

  const [photoError, setPhotoError] = useState(false);

  // =============================
  // LOAD DATA USER + SUBSCRIPTIONS
  // =============================
  useEffect(() => {
    const token = localStorage.getItem('authx_token');
    if (!token) {
      setLoading(false);
      return;
    }

    async function loadData() {
      try {
        // GET /me
        const meRes = await fetch(`${AUTHX_BASE}/api/auth/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const meData = await meRes.json();

        if (!meRes.ok) {
          setLoading(false);
          return;
        }

        setAuthUser(meData.data.user);
        setFormData({
          full_name: meData.data.user.full_name,
          email: meData.data.user.email,
          phone: meData.data.user.phone || '',
        });

        // GET /subscriptions/me
        const subRes = await fetch(`${AUTHX_BASE}/api/subscriptions/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const subData = await subRes.json();

        if (subRes.ok && subData?.data?.subscriptions) {
          setSubs(subData.data.subscriptions);
        }
      } catch (e) {
        console.log('Load error:', e);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  // =============================
  // UPDATE PROFILE
  // =============================
  function validate() {
    const e: Record<string, string> = {};

    if (!formData.full_name.trim()) e.full_name = 'Nama wajib diisi.';
    if (!formData.email.includes('@')) e.email = 'Email tidak valid.';
    if (!formData.phone) e.phone = 'Nomor HP wajib diisi.';

    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function handleSave() {
    if (!validate()) return;

    const token = localStorage.getItem('authx_token');
    if (!token) return;

    setSaving(true);

    const form = new FormData();
    form.append('full_name', formData.full_name);
    form.append('email', formData.email);
    form.append('phone', formData.phone);

    try {
      const res = await fetch(`${AUTHX_BASE}/api/account`, {
        method: 'PUT',
        headers: { Authorization: `Bearer ${token}` },
        body: form,
      });

      const data = await res.json();

      if (!res.ok) {
        setToast(data.message || 'Gagal memperbarui profil.');
      } else {
        setToast('Profil berhasil diperbarui! ✨');
        setAuthUser(data.data.user);
        setIsEditing(false);
      }
    } catch {
      setToast('Terjadi kesalahan.');
    } finally {
      setSaving(false);
      setTimeout(() => setToast(null), 2500);
    }
  }

  // =============================
  // COPY PUBLIC ID
  // =============================
  function handleCopyId() {
    if (!authUser?.public_id) return;
    navigator.clipboard.writeText(authUser.public_id);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  // toggle public ID visibility
  function togglePublicIdVisibility() {
    setShowPublicId((v) => !v);
  }

  // mask public ID
  function getMaskedPublicId(id: string) {
    if (!id) return '';
    if (id.length <= 8) return '•'.repeat(id.length);
    const firstPart = id.slice(0, 4);
    const lastPart = id.slice(-4);
    const middleLength = id.length - 8;
    return `${firstPart}${'•'.repeat(middleLength)}${lastPart}`;
  }

  // =============================
  // LOADING STATE
  // =============================
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-950 dark:via-slate-950 dark:to-slate-900 overflow-x-hidden">
        <div className="text-center animate-fade-in">
          <div className="relative mb-4">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="h-20 w-20 rounded-full bg-blue-500/20 animate-ping" />
            </div>
            <Loader2 className="relative mx-auto h-12 w-12 animate-spin text-blue-600 dark:text-cyan-400" />
          </div>
          <p className="text-base font-medium text-gray-600 dark:text-slate-300">
            Memuat profil kamu...
          </p>
        </div>
      </div>
    );
  }

  if (!authUser) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-950 dark:via-slate-950 dark:to-slate-900 p-6 overflow-x-hidden">
        <div className="animate-scale-in max-w-md w-full bg-white/90 dark:bg-slate-900/80 rounded-2xl shadow-2xl ring-1 ring-black/5 dark:ring-white/10 p-8 text-center backdrop-blur-xl">
          <div className="mb-6 mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-red-500 to-rose-500 shadow-xl shadow-red-500/30">
            <X className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
            Belum Login
          </h1>
          <p className="text-gray-600 dark:text-slate-300 mb-6">
            Silakan login terlebih dahulu.
          </p>
          <button
            onClick={onBack}
            className="group inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 px-6 py-3 text-sm font-bold text-white shadow-xl shadow-blue-600/30 transition-all hover:scale-105 hover:shadow-2xl"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Kembali
          </button>
        </div>
      </div>
    );
  }

  // =============================
  // AVATAR LOGIC
  // =============================
  const avatarUrl =
    authUser.avatar_url && !photoError
      ? `${AUTHX_BASE}${authUser.avatar_url}`
      : `https://ui-avatars.com/api/?background=random&name=${encodeURIComponent(
          authUser.full_name || 'User'
        )}`;

  const subType = authUser.subscription_type?.toLowerCase();

  // helper: frame style by subscription type
  const frameClass =
    subType === 'plus'
      ? 'from-purple-500 via-pink-500 to-cyan-400'
      : subType === 'pro'
      ? 'from-amber-400 via-yellow-500 to-amber-600'
      : 'from-blue-500 to-cyan-500';

  return (
    <div className="min-h-screen relative pb-10 bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-950 dark:via-slate-950 dark:to-slate-900 overflow-x-hidden">
      {/* Background blobs (now absolute, bukan fixed, supaya aman di mobile) */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-[-8rem] right-[-6rem] h-80 w-80 animate-blob rounded-full bg-gradient-to-br from-blue-400/30 to-cyan-400/30 blur-3xl dark:from-blue-500/20 dark:to-cyan-500/20" />
        <div className="absolute bottom-[-8rem] left-[-6rem] h-80 w-80 animate-blob animation-delay-2000 rounded-full bg-gradient-to-tr from-purple-400/30 to-pink-400/30 blur-3xl dark:from-purple-500/20 dark:to-pink-500/20" />
      </div>

      {/* Top bar */}
      <div className="animate-slide-down sticky top-0 z-20 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl shadow-md ring-1 ring-black/5 dark:ring-white/10 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto py-3 flex justify-between items-center">
          <button
            onClick={onBack}
            className="group flex items-center gap-2 text-gray-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-cyan-400 transition-all font-semibold"
          >
            <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
            Kembali
          </button>
        </div>
      </div>

      <div className="relative max-w-4xl mx-auto mt-6 sm:mt-8 px-4 sm:px-6">
        {/* PROFILE CARD */}
        <div className="animate-fade-in bg-white/95 dark:bg-slate-900/85 backdrop-blur-xl p-5 sm:p-7 rounded-2xl shadow-2xl ring-1 ring-black/5 dark:ring-white/10 transition-all hover:shadow-blue-500/20 dark:hover:shadow-cyan-500/20">
          {/* Header avatar + info */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-6 sm:mb-8">
            {/* Avatar dengan frame baru */}
            <div className="relative">
              <div className="relative group">
                {/* outer glow frame */}
                <div
                  className={`absolute inset-[-6px] rounded-3xl bg-gradient-to-r ${frameClass} opacity-60 blur-md group-hover:opacity-90 transition-opacity`}
                />
                {/* glass card */}
                <div className="relative rounded-3xl bg-slate-950/5 dark:bg-white/5 p-1 ring-1 ring-white/30 dark:ring-slate-700 shadow-xl">
                  <div
                    className={`rounded-3xl bg-gradient-to-r ${frameClass} p-[2px]`}
                  >
                    <div className="rounded-3xl bg-white dark:bg-slate-900 p-2">
                      <img
                        src={avatarUrl}
                        alt="Avatar"
                        className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl object-cover shadow-md transition-transform group-hover:scale-105"
                        onError={() => setPhotoError(true)}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Verified badge */}
              <div className="absolute -bottom-2 -right-2 flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-green-500 shadow-lg ring-4 ring-white dark:ring-slate-900 z-10">
                <ShieldCheck className="h-5 w-5 text-white" />
              </div>
            </div>

            <div className="flex-1 text-center sm:text-left">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white mb-2 flex items-center justify-center sm:justify-start gap-2">
                {authUser.full_name}
                <Sparkles className="h-6 w-6 text-cyan-500 animate-pulse" />
              </h1>
              <p className="text-gray-600 dark:text-slate-300 flex items-center justify-center sm:justify-start gap-2 mb-3">
                <Mail className="h-4 w-4" />
                <span className="break-all">{authUser.email}</span>
              </p>

              {/* Subscription Badge */}
              {authUser.subscription_type &&
                authUser.subscription_status === 'active' && (
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900 text-white text-xs sm:text-sm shadow-lg border border-white/10">
                    <div
                      className={`flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-r ${frameClass}`}
                    >
                      <Crown className="h-3.5 w-3.5 text-white" />
                    </div>
                    <span className="uppercase tracking-wide font-semibold">
                      {authUser.subscription_type}
                    </span>
                  </div>
                )}
            </div>
          </div>

          {/* PUBLIC ID CARD */}
          <div className="animate-fade-in mb-7 p-5 rounded-2xl bg-gradient-to-r from-slate-50 to-blue-50 dark:from-slate-800 dark:to-slate-700 ring-1 ring-gray-200 dark:ring-slate-600 shadow-inner">
            <div className="flex items-center gap-2 mb-3">
              <ShieldCheck className="h-5 w-5 text-blue-600 dark:text-cyan-400" />
              <p className="text-sm font-bold text-gray-700 dark:text-slate-200">
                Public ID Astbyte
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-2 sm:items-center">
              <code className="flex-1 font-mono text-xs sm:text-sm bg-white dark:bg-slate-900 px-3 sm:px-4 py-2.5 rounded-xl text-gray-800 dark:text-slate-200 font-semibold ring-1 ring-gray-300 dark:ring-slate-600 shadow-sm break-all">
                {showPublicId
                  ? authUser.public_id
                  : getMaskedPublicId(authUser.public_id)}
              </code>

              <div className="flex items-center gap-2 sm:flex-shrink-0">
                <button
                  onClick={togglePublicIdVisibility}
                  className="group flex items-center justify-center bg-slate-700 hover:bg-slate-800 px-3 py-2 rounded-xl text-white font-semibold shadow-md text-xs sm:text-sm transition-all hover:scale-105"
                  title={showPublicId ? 'Sembunyikan ID' : 'Tampilkan ID'}
                >
                  {showPublicId ? (
                    <EyeOff className="h-4 w-4 sm:h-5 sm:w-5 transition-transform group-hover:scale-110" />
                  ) : (
                    <Eye className="h-4 w-4 sm:h-5 sm:w-5 transition-transform group-hover:scale-110" />
                  )}
                </button>

                <button
                  onClick={handleCopyId}
                  className="group flex items-center gap-1.5 sm:gap-2 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 px-3 sm:px-4 py-2 rounded-xl text-white text-xs sm:text-sm font-semibold shadow-lg transition-all hover:scale-105 whitespace-nowrap"
                  title="Salin Public ID"
                >
                  {copied ? (
                    <>
                      <Check className="h-4 w-4 sm:h-5 sm:w-5 animate-bounce-in" />
                      <span className="hidden sm:inline">Disalin!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4 sm:h-5 sm:w-5 transition-transform group-hover:scale-110" />
                      <span className="hidden sm:inline">Salin</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* EDITABLE FIELDS */}
          <div className="space-y-5">
            <Field
              label="Nama Lengkap"
              icon={<UserIcon className="w-5 h-5" />}
              value={formData.full_name}
              editable={isEditing}
              error={errors.full_name}
              onChange={(v) => setFormData((f) => ({ ...f, full_name: v }))}
            />

            <Field
              label="Email"
              icon={<Mail className="w-5 h-5" />}
              value={formData.email}
              editable={isEditing}
              error={errors.email}
              onChange={(v) => setFormData((f) => ({ ...f, email: v }))}
            />

            <Field
              label="Nomor HP"
              icon={<Phone className="w-5 h-5" />}
              value={formData.phone}
              editable={isEditing}
              error={errors.phone}
              onChange={(v) => setFormData((f) => ({ ...f, phone: v }))}
            />
          </div>
        </div>

        {/* SUBSCRIPTIONS */}
        <div className="animate-fade-in mt-6 bg-white/95 dark:bg-slate-900/85 backdrop-blur-xl p-5 sm:p-7 rounded-2xl shadow-2xl ring-1 ring-black/5 dark:ring-white/10">
          <h2 className="text-lg sm:text-xl font-bold mb-5 sm:mb-6 flex items-center gap-3 text-gray-900 dark:text-white">
            <div className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 shadow-lg">
              <CreditCard className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            </div>
            Riwayat Langganan
          </h2>

          {subs.length === 0 ? (
            <div className="text-center py-10 rounded-2xl bg-gray-50 dark:bg-slate-800/60 ring-1 ring-gray-200 dark:ring-slate-700">
              <div className="flex h-14 w-14 mx-auto mb-4 items-center justify-center rounded-xl bg-gray-200 dark:bg-slate-700">
                <CreditCard className="h-7 w-7 text-gray-400 dark:text-slate-500" />
              </div>
              <p className="text-gray-600 dark:text-slate-300 font-medium text-sm sm:text-base">
                Belum ada subscription.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {subs.map((s, idx) => (
                <div
                  key={s.id}
                  style={{ animationDelay: `${idx * 80}ms` }}
                  className="animate-slide-in-up group p-4 sm:p-5 bg-gradient-to-r from-gray-50 to-blue-50 dark:from-slate-800 dark:to-slate-700 rounded-2xl ring-1 ring-gray-200 dark:ring-slate-600 shadow-md transition-all hover:shadow-xl hover:ring-blue-500/50 dark:hover:ring-cyan-400/50"
                >
                  <div className="flex flex-col sm:flex-row justify-between gap-3 sm:gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1.5">
                        <Crown className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                        <p className="font-bold text-sm sm:text-base uppercase text-gray-900 dark:text-white">
                          {s.subscribe_type}
                        </p>
                      </div>
                      <p className="text-xs sm:text-sm text-gray-600 dark:text-slate-300 flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        {s.period} • {s.payment_method}
                      </p>
                    </div>
                    <div className="text-left sm:text-right text-xs sm:text-sm">
                      <p className="font-semibold text-gray-700 dark:text-slate-200">
                        {s.start_date}
                      </p>
                      <p className="text-gray-500 dark:text-slate-400">
                        s/d {s.end_date}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* TOAST */}
      {toast && (
        <div className="animate-bounce-in fixed bottom-6 left-1/2 -translate-x-1/2 z-50 max-w-[90vw] px-4 sm:px-6 py-3 bg-gradient-to-r from-gray-900 to-slate-900 text-white rounded-xl shadow-2xl ring-1 ring-white/10 backdrop-blur-xl">
          <div className="flex items-center gap-2">
            <Check className="h-5 w-5 text-emerald-400" />
            <span className="font-semibold text-sm sm:text-base">{toast}</span>
          </div>
        </div>
      )}

      {/* Custom CSS for animations & globals */}
      <style>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slide-down {
          from { opacity: 0; transform: translateY(-16px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slide-in-up {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes scale-in {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes bounce-in {
          0% { opacity: 0; transform: scale(0.3); }
          50% { transform: scale(1.05); }
          70% { transform: scale(0.97); }
          100% { opacity: 1; transform: scale(1); }
        }
        @keyframes blob {
          0%,100% { transform: translate(0,0) scale(1); }
          33% { transform: translate(24px,-32px) scale(1.1); }
          66% { transform: translate(-20px,18px) scale(0.9); }
        }

        .animate-fade-in { animation: fade-in 0.45s ease-out; }
        .animate-slide-down { animation: slide-down 0.4s ease-out; }
        .animate-slide-in-up { animation: slide-in-up 0.45s ease-out; }
        .animate-scale-in { animation: scale-in 0.4s ease-out; }
        .animate-bounce-in { animation: bounce-in 0.45s cubic-bezier(0.68,-0.55,0.265,1.55); }
        .animate-blob { animation: blob 8s ease-in-out infinite; }
        .animation-delay-2000 { animation-delay: 2s; }

        /* Hilangin horizontal scroll global (jaga-jaga) */
        body {
          overflow-x: hidden;
        }
      `}</style>
    </div>
  );
}

function Field({
  label,
  icon,
  value,
  editable,
  error,
  onChange,
}: {
  label: string;
  icon: JSX.Element;
  value: string;
  editable: boolean;
  error?: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="animate-fade-in group">
      <label className="flex items-center gap-2 text-xs sm:text-sm font-bold text-gray-700 dark:text-slate-200 mb-1.5">
        <span className="text-blue-600 dark:text-cyan-400">{icon}</span>
        {label}
      </label>
      {editable ? (
        <>
          <input
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className={`w-full px-3.5 py-2.5 sm:px-4 sm:py-3 rounded-xl border-2 bg-white dark:bg-slate-900 text-gray-900 dark:text-white text-sm sm:text-base font-medium outline-none transition-all ${
              error
                ? 'border-red-500 ring-4 ring-red-500/20'
                : 'border-gray-300 dark:border-slate-600 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 dark:focus:border-cyan-400 dark:focus:ring-cyan-400/20'
            }`}
          />
          {error && (
            <p className="mt-1.5 text-xs text-red-600 dark:text-red-400 font-semibold flex items-center gap-1">
              <X className="h-3 w-3" />
              {error}
            </p>
          )}
        </>
      ) : (
        <p className="px-3.5 py-2.5 sm:px-4 sm:py-3 rounded-xl bg-gray-50 dark:bg-slate-800 text-gray-800 dark:text-slate-200 text-sm sm:text-base font-semibold ring-1 ring-gray-200 dark:ring-slate-700 break-all">
          {value || '-'}
        </p>
      )}
    </div>
  );
}