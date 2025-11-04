// src/components/ProfilePage.tsx
import { useEffect, useMemo, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Subscription, MOCK_SUBSCRIPTIONS } from "../data/mockData";
import {
  User as UserIcon,
  Mail,
  Phone,
  CreditCard,
  CheckCircle,
  XCircle,
  Crown,
  Sparkles,
  ArrowLeft,
  Copy,
  Check,
  ShieldCheck,
  Edit3,
  Loader2,
  Image as ImageIcon,
} from "lucide-react";

interface ProfilePageProps {
  onBack: () => void;
}

export default function ProfilePage({ onBack }: ProfilePageProps) {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [copied, setCopied] = useState(false);
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [toast, setToast] = useState<string | null>(null);

  // --- NEW: track photo error (fallback ke inisial) ---
  const [photoError, setPhotoError] = useState(false);

  const [formData, setFormData] = useState({
    name: user?.name || "",
    username: user?.username || "",
    email: user?.email || "",
    phone: user?.phone || "",
  });

  // Sinkronisasi form ketika user berganti (misal refresh/restore dari localStorage)
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        username: user.username || "",
        email: user.email || "",
        phone: (user.phone as string) || "",
      });
      setPhotoError(false);
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      const userSubs = MOCK_SUBSCRIPTIONS
        .filter((s) => s.user_id === user.id)
        .sort(
          (a, b) =>
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );
      setSubscriptions(userSubs);
    }
  }, [user]);

  const planBadge = useMemo(
    () => getSubscriptionBadge(user?.subscription_type),
    [user?.subscription_type]
  );
  const statusBadge = useMemo(
    () => getStatusBadge(user?.subscription_status),
    [user?.subscription_status]
  );

  function getSubscriptionBadge(type?: string) {
    if (type === "pro") {
      return (
        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-full text-sm font-semibold shadow-sm">
          <Crown className="w-4 h-4" /> PRO
        </div>
      );
    }
    if (type === "plus") {
      return (
        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-full text-sm font-semibold shadow-sm">
          <Sparkles className="w-4 h-4" /> PLUS
        </div>
      );
    }
    return (
      <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-gray-200 text-gray-700 rounded-full text-sm font-semibold">
        FREE
      </div>
    );
  }

  function getStatusBadge(status?: string) {
    if (status === "active") {
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
    if (!dateString) return "-";
    try {
      return new Date(dateString).toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });
    } catch {
      return "-";
    }
  }

  function formatCurrency(amount: number) {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);
  }

  function validate() {
    const e: Record<string, string> = {};
    if (!formData.name.trim()) e.name = "Nama wajib diisi";
    if (!/^[a-zA-Z0-9_]{3,}$/.test(formData.username))
      e.username = "Username minimal 3 karakter (huruf/angka/_)";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      e.email = "Email tidak valid";
    if (
      formData.phone &&
      !/^0\d{8,13}$/.test(formData.phone.replace(/\D/g, ""))
    )
      e.phone = "No. HP tidak valid";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function handleSave() {
    if (!user) return;
    if (!validate()) return;

    setSaving(true);
    try {
      const updatedUser = { ...user, ...formData } as typeof user;
      localStorage.setItem("user", JSON.stringify(updatedUser));
      window.dispatchEvent(new CustomEvent("user-updated", { detail: updatedUser }));
      setToast("Profil berhasil disimpan");
      setIsEditing(false);
    } catch {
      setToast("Gagal menyimpan profil");
    } finally {
      setSaving(false);
      setTimeout(() => setToast(null), 2000);
    }
  }

  function handleCancel() {
    if (!user) return;
    setFormData({
      name: user.name || "",
      username: user.username || "",
      email: user.email || "",
      phone: (user.phone as string) || "",
    });
    setErrors({});
    setIsEditing(false);
  }

  function handleCopyId() {
    if (!user?.id) return;
    navigator.clipboard.writeText(user.id);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  }

  // --- NEW: Avatar with photo_url fallback ---
  const avatar = (
    <div className="relative h-16 w-16 sm:h-20 sm:w-20">
      {user?.photo_url && !photoError ? (
        <img
          src={user.photo_url}
          alt={user.name || "User avatar"}
          className="h-full w-full rounded-full object-cover ring-2 ring-white/60 shadow-md"
          onError={() => setPhotoError(true)}
          loading="lazy"
        />
      ) : (
        <div className="relative flex h-full w-full items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-cyan-600 text-white ring-2 ring-white/60 shadow-md">
          <span className="text-xl sm:text-2xl font-bold">
            {initials(formData.name || user?.name)}
          </span>
        </div>
      )}

      {/* verified badge */}
      <span className="absolute -bottom-2 right-0 rounded-full bg-white p-1 shadow ring-1 ring-black/5">
        <ShieldCheck className="h-4 w-4 text-blue-600" />
      </span>

      {/* edit hint (visual only) */}
      <span className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-t from-black/0 via-black/0 to-black/10"></span>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-950 dark:via-slate-950 dark:to-slate-900 pb-8">
      {/* Top bar */}
      <div className="bg-white/80 dark:bg-slate-900/70 backdrop-blur ring-1 ring-black/5 dark:ring-white/10 mb-6 sticky top-0 z-30">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 text-gray-800 dark:text-slate-200 hover:opacity-80"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Kembali ke Dashboard</span>
          </button>
        </div>
      </div>

      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-4xl">
          {/* Card */}
          <div className="overflow-hidden rounded-2xl ring-1 ring-black/5 dark:ring-white/10 bg-white/80 dark:bg-slate-900/70 shadow">
            {/* Header gradient */}
            <div className="bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-blue-600 via-sky-600 to-cyan-500 px-6 py-8 text-white">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-4">
                  {avatar}
                  <div>
                    <h1 className="text-2xl sm:text-3xl font-bold mb-1">
                      Profil Saya
                    </h1>
                    <p className="text-white/85">
                      Kelola informasi akun Anda dengan mudah
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {planBadge}
                </div>
              </div>
            </div>

            <div className="p-6 sm:p-8 space-y-6">
              {/* Basic info grid */}
              <div className="grid md:grid-cols-2 gap-6">
                {/* Nama */}
                <ProfileField
                  label="Nama Lengkap"
                  icon={<UserIcon className="w-4 h-4 inline mr-2" />}
                  value={formData.name}
                  isEditing={isEditing}
                  error={errors.name}
                  onChange={(val) => setFormData({ ...formData, name: val })}
                />

                {/* User ID */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-slate-200 mb-2">
                    User ID
                  </label>
                  <div className="flex items-center gap-2">
                    <p
                      className="text-gray-900 dark:text-white font-mono text-sm truncate"
                      title={user?.id}
                    >
                      {user?.id ?? "-"}
                    </p>
                    <button
                      onClick={handleCopyId}
                      className="inline-flex items-center gap-1 rounded-md bg-gray-100 dark:bg-slate-800 px-2 py-1 text-xs hover:opacity-90"
                    >
                      {copied ? (
                        <Check className="w-3.5 h-3.5" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                      {copied ? "Disalin" : "Salin"}
                    </button>
                  </div>
                </div>

                <ProfileField
                  label="Username"
                  icon={<UserIcon className="w-4 h-4 inline mr-2" />}
                  value={formData.username}
                  isEditing={isEditing}
                  error={errors.username}
                  onChange={(val) => setFormData({ ...formData, username: val })}
                />

                <ProfileField
                  label="Email"
                  icon={<Mail className="w-4 h-4 inline mr-2" />}
                  value={formData.email}
                  isEditing={isEditing}
                  error={errors.email}
                  onChange={(val) => setFormData({ ...formData, email: val })}
                />

                <ProfileField
                  label="No. HP"
                  icon={<Phone className="w-4 h-4 inline mr-2" />}
                  value={formData.phone}
                  isEditing={isEditing}
                  error={errors.phone}
                  placeholder="08xx-xxxx-xxxx"
                  onChange={(val) => setFormData({ ...formData, phone: val })}
                />
              </div>

              {/* Photo helper (info kecil)
              <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-800/40 p-4 text-xs sm:text-sm text-slate-600 dark:text-slate-300 flex items-start gap-3">
                <ImageIcon className="w-4 h-4 mt-0.5" />
                <p>
                  Foto profil akan otomatis diambil dari data user (<code>photo_url</code>) di <b>mockData</b>. 
                  Jika gambar tidak ditemukan, sistem menampilkan inisial nama dengan latar gradien.
                </p>
              </div> */}
            </div>
          </div>

          {/* Status Paket */}
          <div className="rounded-2xl ring-1 ring-black/5 dark:ring-white/10 bg-white/80 dark:bg-slate-900/70 mt-6 p-6 sm:p-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-gray-700 dark:text-slate-200" />
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  Status Paket
                </h2>
              </div>
              {statusBadge}
            </div>

            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <StatusItem
                label="Paket Saat Ini"
                value={user?.subscription_type?.toUpperCase() || "-"}
              />
              <StatusItem
                label="Periode"
                value={
                  user?.subscription_period
                    ? user.subscription_period === "monthly"
                      ? "Bulanan"
                      : "Tahunan"
                    : "-"
                }
              />
              <StatusItem
                label="Tanggal Mulai"
                value={formatDate(user?.subscription_start)}
              />
              <StatusItem
                label="Tanggal Berakhir"
                value={formatDate(user?.subscription_end)}
              />
            </div>

            <a
              href="/pricing"
              className="block w-full text-center py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-cyan-700"
            >
              Upgrade Paket Sekarang
            </a>
          </div>

          {/* History */}
          {subscriptions.length > 0 && (
            <div className="rounded-2xl ring-1 ring-black/5 dark:ring-white/10 bg-white/80 dark:bg-slate-900/70 mt-6 p-6 sm:p-8">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                Riwayat Pembayaran
              </h2>
              <div className="space-y-3">
                {subscriptions.map((sub) => (
                  <div
                    key={sub.id}
                    className="flex items-center justify-between p-4 bg-gray-50 dark:bg-slate-800 rounded-lg"
                  >
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white uppercase">
                        {sub.subscription_type}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-slate-400">
                        {sub.period === "monthly" ? "Bulanan" : "Tahunan"} •{" "}
                        {formatDate(sub.payment_date)}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-gray-900 dark:text-white">
                        {formatCurrency(sub.amount)}
                      </p>
                      <span
                        className={`text-xs px-2 py-1 rounded-full ${
                          sub.status === "paid"
                            ? "bg-green-100 text-green-700"
                            : "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {sub.status === "paid" ? "Lunas" : sub.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50">
          <div className="rounded-xl bg-gray-900 text-white px-4 py-2 shadow-lg text-sm">
            {toast}
          </div>
        </div>
      )}
    </div>
  );
}

function ProfileField({
  label,
  icon,
  value,
  onChange,
  isEditing,
  error,
  placeholder,
}: {
  label: string;
  icon?: JSX.Element;
  value: string;
  isEditing: boolean;
  error?: string;
  placeholder?: string;
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 dark:text-slate-200 mb-2">
        {icon} {label}
      </label>
      {isEditing ? (
        <>
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className={`w-full px-4 py-2 rounded-lg border ${
              error
                ? "border-red-400 focus:ring-red-200"
                : "border-gray-300 focus:ring-blue-200"
            } focus:ring-2 focus:border-transparent bg-white/70 dark:bg-slate-800 dark:text-white`}
          />
          {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
        </>
      ) : (
        <p className="text-gray-900 dark:text-white font-medium break-words">{value || "-"}</p>
      )}
    </div>
  );
}

function StatusItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-gray-50 dark:bg-slate-800 rounded-lg p-4">
      <p className="text-sm text-gray-600 dark:text-slate-400 mb-1">{label}</p>
      <p className="text-lg font-bold text-gray-900 dark:text-white">{value}</p>
    </div>
  );
}

function initials(name?: string) {
  if (!name) return "CL";
  const parts = name.trim().split(/\s+/).slice(0, 2);
  return parts.map((p) => p[0]?.toUpperCase()).join("");
}
