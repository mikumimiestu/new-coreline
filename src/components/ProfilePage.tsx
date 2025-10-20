import { useEffect, useMemo, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Subscription, MOCK_SUBSCRIPTIONS } from '../data/mockData';
import {
  User as UserIcon,
  Mail,
  Phone,
  CreditCard,
  Calendar,
  CheckCircle,
  XCircle,
  Crown,
  Sparkles,
  ArrowLeft,
  Copy,
  Check,
  ShieldCheck,
  Edit3,
} from 'lucide-react';

interface ProfilePageProps {
  onBack: () => void;
}

export default function ProfilePage({ onBack }: ProfilePageProps) {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showPricing, setShowPricing] = useState(false);
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [toast, setToast] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: user?.name || '',
    username: user?.username || '',
    email: user?.email || '',
    phone: user?.phone || '',
  });

  useEffect(() => {
    if (user) {
      const userSubs = MOCK_SUBSCRIPTIONS
        .filter((s) => s.user_id === user.id)
        .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
      setSubscriptions(userSubs);
    }
  }, [user]);

  // Derived
  const planBadge = useMemo(() => getSubscriptionBadge(user?.subscription_type), [user?.subscription_type]);
  const statusBadge = useMemo(() => getStatusBadge(user?.subscription_status), [user?.subscription_status]);

  // Helpers
  function getSubscriptionBadge(type?: string) {
    if (type === 'pro') {
      return (
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-full font-semibold">
          <Crown className="w-4 h-4" /> PRO
        </div>
      );
    }
    if (type === 'plus') {
      return (
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-full font-semibold">
          <Sparkles className="w-4 h-4" /> PLUS
        </div>
      );
    }
    return (
      <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-full font-semibold">FREE</div>
    );
  }

  function getStatusBadge(status?: string) {
    if (status === 'active') {
      return (
        <div className="inline-flex items-center gap-1 text-green-600">
          <CheckCircle className="w-4 h-4" />
          <span className="text-sm font-medium">Aktif</span>
        </div>
      );
    }
    return (
      <div className="inline-flex items-center gap-1 text-red-600">
        <XCircle className="w-4 h-4" />
        <span className="text-sm font-medium">Tidak Aktif</span>
      </div>
    );
  }

  function formatDate(dateString: string | null | undefined) {
    if (!dateString) return '-';
    try {
      return new Date(dateString).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
    } catch {
      return '-';
    }
  }

  function formatCurrency(amount: number) {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(amount);
  }

  function validate() {
    const e: Record<string, string> = {};
    if (!formData.name.trim()) e.name = 'Nama wajib diisi';
    if (!/^[a-zA-Z0-9_]{3,}$/.test(formData.username)) e.username = 'Username minimal 3 karakter (huruf/angka/_)';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) e.email = 'Email tidak valid';
    if (formData.phone && !/^0\d{8,13}$/.test(formData.phone.replace(/\D/g, ''))) e.phone = 'No. HP tidak valid';
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function handleSave() {
    if (!user) return;
    if (!validate()) return;

    setSaving(true);
    try {
      const updatedUser = { ...user, ...formData } as typeof user;
      localStorage.setItem('user', JSON.stringify(updatedUser));
      // Optional: if app listens to this event, components can refresh without reload
      window.dispatchEvent(new CustomEvent('user-updated', { detail: updatedUser }));
      setToast('Profil berhasil disimpan');
      setIsEditing(false);
    } catch {
      setToast('Gagal menyimpan profil');
    } finally {
      setSaving(false);
      setTimeout(() => setToast(null), 2000);
    }
  }

  function handleCopyId() {
    if (!user?.id) return;
    navigator.clipboard.writeText(user.id);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  }

  const pricingPlans = [
    {
      type: 'plus' as const,
      name: 'Plus',
      icon: <Sparkles className="w-8 h-8" />,
      color: 'from-blue-500 to-cyan-500',
      features: ['Akses semua materi dasar', 'Sertifikat penyelesaian', 'Forum diskusi', 'Update materi rutin', 'Email support'],
      monthly: 99_000,
      yearly: 990_000,
    },
    {
      type: 'pro' as const,
      name: 'Pro',
      icon: <Crown className="w-8 h-8" />,
      color: 'from-yellow-400 to-orange-500',
      features: ['Semua fitur Plus', 'Akses materi advanced', 'Project real-world', 'Mentoring 1-on-1', 'Priority support', 'Akses selamanya ke materi'],
      monthly: 199_000,
      yearly: 1_990_000,
      popular: true,
    },
  ];

  async function handleSubscribe(planType: 'plus' | 'pro', period: 'monthly' | 'yearly') {
    if (!user) return;
    const plan = pricingPlans.find((p) => p.type === planType);
    if (!plan) return;

    const amount = period === 'monthly' ? plan.monthly : plan.yearly;
    const startDate = new Date();
    const endDate = new Date();
    if (period === 'monthly') endDate.setMonth(endDate.getMonth() + 1);
    else endDate.setFullYear(endDate.getFullYear() + 1);

    const newSubscription: Subscription = {
      id: Date.now().toString(),
      user_id: user.id,
      subscription_type: planType,
      period,
      amount,
      currency: 'IDR',
      status: 'paid',
      start_date: startDate.toISOString(),
      end_date: endDate.toISOString(),
      payment_date: startDate.toISOString(),
      created_at: startDate.toISOString(),
    };

    MOCK_SUBSCRIPTIONS.push(newSubscription);

    const updatedUser = {
      ...user,
      subscription_type: planType,
      subscription_period: period,
      subscription_start: startDate.toISOString(),
      subscription_end: endDate.toISOString(),
      subscription_status: 'active' as const,
    };

    localStorage.setItem('user', JSON.stringify(updatedUser));
    window.dispatchEvent(new CustomEvent('user-updated', { detail: updatedUser }));
    setToast('Paket berhasil diaktifkan');
    setShowPricing(false);
    // refresh UI bits
    setSubscriptions((prev) => [newSubscription, ...prev]);
  }

  const avatar = (
    <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-600 text-white">
      <span className="text-xl font-bold">{initials(formData.name || user?.name)}</span>
      <span className="absolute -bottom-2 right-0 rounded-full bg-white p-1 shadow ring-1 ring-black/5">
        <ShieldCheck className="h-4 w-4 text-blue-600" />
      </span>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-950 dark:via-slate-950 dark:to-slate-900 pb-8">
      {/* Top bar */}
      <div className="bg-white/80 dark:bg-slate-900/70 backdrop-blur ring-1 ring-black/5 dark:ring-white/10 mb-6 sticky top-0 z-30">
        <div className="container mx-auto px-4 py-3">
          <button onClick={onBack} className="inline-flex items-center gap-2 text-gray-800 dark:text-slate-200 hover:opacity-80">
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Kembali ke Dashboard</span>
          </button>
        </div>
      </div>

      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-4xl">
          {/* Card */}
          <div className="overflow-hidden rounded-2xl ring-1 ring-black/5 dark:ring-white/10 bg-white/80 dark:bg-slate-900/70 shadow">
            <div className="bg-gradient-to-r from-blue-600 to-cyan-600 px-6 py-8 text-white">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-4">
                  {avatar}
                  <div>
                    <h1 className="text-2xl sm:text-3xl font-bold mb-1">Profil Saya</h1>
                    <p className="text-white/80">Kelola informasi akun Anda</p>
                  </div>
                </div>
                {planBadge}
              </div>
            </div>

            <div className="p-6 sm:p-8 space-y-6">
              {/* Basic info grid */}
              <div className="grid md:grid-cols-2 gap-6">
                {/* Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-slate-200 mb-2">
                    <UserIcon className="w-4 h-4 inline mr-2" /> Nama Lengkap
                  </label>
                  {isEditing ? (
                    <>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className={`w-full px-4 py-2 rounded-lg border ${errors.name ? 'border-red-400 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200'} focus:ring-2 focus:border-transparent bg-white/70 dark:bg-slate-800 dark:text-white`}
                      />
                      {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name}</p>}
                    </>
                  ) : (
                    <p className="text-gray-900 dark:text-white font-medium">{user?.name}</p>
                  )}
                </div>

                {/* ID */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-slate-200 mb-2">User ID</label>
                  <div className="flex items-center gap-2">
                    <p className="text-gray-900 dark:text-white font-mono text-sm truncate" title={user?.id}>{user?.id?.slice(0, 10)}</p>
                    <button onClick={handleCopyId} className="inline-flex items-center gap-1 rounded-md bg-gray-100 dark:bg-slate-800 px-2 py-1 text-xs hover:opacity-90">
                      {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />} {copied ? 'Disalin' : 'Salin'}
                    </button>
                  </div>
                </div>

                {/* Username */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-slate-200 mb-2">
                    <UserIcon className="w-4 h-4 inline mr-2" /> Username
                  </label>
                  {isEditing ? (
                    <>
                      <input
                        type="text"
                        value={formData.username}
                        onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                        className={`w-full px-4 py-2 rounded-lg border ${errors.username ? 'border-red-400 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200'} focus:ring-2 focus:border-transparent bg-white/70 dark:bg-slate-800 dark:text-white`}
                      />
                      {errors.username && <p className="mt-1 text-xs text-red-600">{errors.username}</p>}
                    </>
                  ) : (
                    <p className="text-gray-900 dark:text-white font-medium">@{user?.username}</p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-slate-200 mb-2">
                    <Mail className="w-4 h-4 inline mr-2" /> Email
                  </label>
                  {isEditing ? (
                    <>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className={`w-full px-4 py-2 rounded-lg border ${errors.email ? 'border-red-400 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200'} focus:ring-2 focus:border-transparent bg-white/70 dark:bg-slate-800 dark:text-white`}
                      />
                      {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email}</p>}
                    </>
                  ) : (
                    <p className="text-gray-900 dark:text-white">{user?.email}</p>
                  )}
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-slate-200 mb-2">
                    <Phone className="w-4 h-4 inline mr-2" /> No. HP
                  </label>
                  {isEditing ? (
                    <>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="08xx-xxxx-xxxx"
                        className={`w-full px-4 py-2 rounded-lg border ${errors.phone ? 'border-red-400 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200'} focus:ring-2 focus:border-transparent bg-white/70 dark:bg-slate-800 dark:text-white`}
                      />
                      {errors.phone && <p className="mt-1 text-xs text-red-600">{errors.phone}</p>}
                    </>
                  ) : (
                    <p className="text-gray-900 dark:text-white">{user?.phone || '-'}</p>
                  )}
                </div>
              </div>

              {/* Actions
              {isEditing ? (
                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={handleSave}
                    disabled={saving}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 disabled:opacity-60"
                  >
                    {saving ? 'Menyimpan…' : (<><Edit3 className="w-4 h-4" /> Simpan</>)}
                  </button>
                  <button onClick={() => { setIsEditing(false); setErrors({}); setFormData({
                    name: user?.name || '', username: user?.username || '', email: user?.email || '', phone: user?.phone || ''
                  }); }} className="px-5 py-2.5 rounded-lg bg-gray-200 text-gray-800 font-semibold hover:bg-gray-300">Batal</button>
                </div>
              ) : (
                <button onClick={() => setIsEditing(true)} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700">
                  <Edit3 className="w-4 h-4" /> Edit Profil
                </button>
              )} */}
            </div>
          </div>

          {/* Subscription status */}
          <div className="rounded-2xl ring-1 ring-black/5 dark:ring-white/10 bg-white/80 dark:bg-slate-900/70 mt-6 p-6 sm:p-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-gray-700 dark:text-slate-200" />
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Status Paket</h2>
              </div>
              {statusBadge}
            </div>

            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div className="bg-gray-50 dark:bg-slate-800 rounded-lg p-4">
                <p className="text-sm text-gray-600 dark:text-slate-400 mb-1">Paket Saat Ini</p>
                <p className="text-lg font-bold text-gray-900 dark:text-white uppercase">{user?.subscription_type}</p>
              </div>
              <div className="bg-gray-50 dark:bg-slate-800 rounded-lg p-4">
                <p className="text-sm text-gray-600 dark:text-slate-400 mb-1">Periode</p>
                <p className="text-lg font-bold text-gray-900 dark:text-white capitalize">
                  {user?.subscription_period ? (user.subscription_period === 'monthly' ? 'Bulanan' : 'Tahunan') : '-'}
                </p>
              </div>
              <div className="bg-gray-50 dark:bg-slate-800 rounded-lg p-4">
                <p className="text-sm text-gray-600 dark:text-slate-400 mb-1 flex items-center gap-1"><Calendar className="w-4 h-4" /> Tanggal Mulai</p>
                <p className="text-lg font-bold text-gray-900 dark:text-white">{formatDate(user?.subscription_start)}</p>
              </div>
              <div className="bg-gray-50 dark:bg-slate-800 rounded-lg p-4">
                <p className="text-sm text-gray-600 dark:text-slate-400 mb-1 flex items-center gap-1"><Calendar className="w-4 h-4" /> Tanggal Berakhir</p>
                <p className="text-lg font-bold text-gray-900 dark:text-white">{formatDate(user?.subscription_end)}</p>
              </div>
            </div>

            <a href="/pricing">
              <button className="w-full py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-cyan-700">
                Upgrade Paket Sekarang
              </button>
            </a>
          </div>

          {/* History */}
          {subscriptions.length > 0 && (
            <div className="rounded-2xl ring-1 ring-black/5 dark:ring-white/10 bg-white/80 dark:bg-slate-900/70 mt-6 p-6 sm:p-8">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Riwayat Pembayaran</h2>
              <div className="space-y-3">
                {subscriptions.map((sub) => (
                  <div key={sub.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-slate-800 rounded-lg">
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white uppercase">{sub.subscription_type}</p>
                      <p className="text-sm text-gray-600 dark:text-slate-400">{sub.period === 'monthly' ? 'Bulanan' : 'Tahunan'} • {formatDate(sub.payment_date)}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-gray-900 dark:text-white">{formatCurrency(sub.amount)}</p>
                      <span className={`text-xs px-2 py-1 rounded-full ${sub.status === 'paid' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>{sub.status === 'paid' ? 'Lunas' : sub.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Pricing Modal */}
      {showPricing && (
        <div className="fixed inset-0 bg-black/50 dark:bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl max-w-5xl w-full my-8 ring-1 ring-black/5 dark:ring-white/10">
            <div className="p-6 border-b border-gray-200 dark:border-slate-800 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Pilih Paket Langganan</h2>
              <button onClick={() => setShowPricing(false)} className="p-2 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-lg">
                <XCircle className="w-6 h-6 text-gray-600 dark:text-slate-300" />
              </button>
            </div>

            <div className="p-6">
              <div className="grid md:grid-cols-2 gap-6">
                {pricingPlans.map((plan) => (
                  <div key={plan.type} className={`relative rounded-2xl border-2 p-6 ${plan.popular ? 'border-orange-500 shadow-lg' : 'border-gray-200 dark:border-slate-700'}`}>
                    {plan.popular && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-sm font-semibold rounded-full">POPULER</div>
                    )}

                    <div className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${plan.color} text-white mb-4`}>{plan.icon}</div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{plan.name}</h3>

                    <div className="mb-6">
                      <div className="flex items-baseline gap-2 mb-2">
                        <span className="text-3xl font-bold text-gray-900 dark:text-white">{formatCurrency(plan.monthly)}</span>
                        <span className="text-gray-600 dark:text-slate-400">/bulan</span>
                      </div>
                      <div className="flex items-baseline gap-2">
                        <span className="text-2xl font-bold text-gray-900 dark:text-white">{formatCurrency(plan.yearly)}</span>
                        <span className="text-gray-600 dark:text-slate-400">/tahun</span>
                        <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-semibold">Hemat {Math.round((1 - plan.yearly / (plan.monthly * 12)) * 100)}%</span>
                      </div>
                    </div>

                    <ul className="space-y-3 mb-6">
                      {plan.features.map((f, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-700 dark:text-slate-300">{f}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="space-y-2">
                      <button onClick={() => handleSubscribe(plan.type, 'monthly')} className={`${plan.popular ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white hover:from-yellow-500 hover:to-orange-600' : 'bg-blue-600 hover:bg-blue-700 text-white'} w-full py-3 rounded-lg font-semibold`}>
                        Langganan Bulanan
                      </button>
                      <button onClick={() => handleSubscribe(plan.type, 'yearly')} className="w-full py-3 border-2 border-gray-300 dark:border-slate-700 text-gray-700 dark:text-slate-200 rounded-lg font-semibold hover:border-gray-400 dark:hover:border-slate-600">
                        Langganan Tahunan
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50">
          <div className="rounded-xl bg-gray-900 text-white px-4 py-2 shadow-lg text-sm">{toast}</div>
        </div>
      )}
    </div>
  );
}

function initials(name?: string) {
  if (!name) return 'CL';
  const parts = name.trim().split(/\s+/).slice(0, 2);
  return parts.map((p) => p[0]?.toUpperCase()).join('');
}
