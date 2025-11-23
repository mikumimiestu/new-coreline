// src/pages/ManualQRISPage.tsx
import { useMemo, useState, useEffect } from "react";
import {
  Copy,
  Shield,
  BadgeCheck,
  ArrowRight,
  BadgePercent,
  Info as InfoIcon,
  AlertTriangle,
  Check,
  Wallet,
  Loader2,
  User,
} from "lucide-react";

type Tier = "student" | "pro" | "plus";
type Cycle = "monthly" | "yearly";

const MERCHANT_NAME = "Xenza ID";
const NMID = "ID1023244802444";

// API base: localhost saat dev, authx saat prod
const API_BASE = "https://authx.astbyte.com";

const TOKEN_KEY = "astbyte_token";

const DEFAULT_PRICE: Record<Tier, { monthly: number; yearly: number }> = {
  student: { monthly: 0, yearly: 0 },
  pro: { monthly: 25000, yearly: 240000 },
  plus: { monthly: 149000, yearly: 1440000 },
};

const VOUCHERS: Record<
  string,
  { type: "percent" | "fixed"; value: number; note?: string }
> = {
  CORELINESATU: { type: "percent", value: 5, note: "Diskon 5%" },
  ASTBYTEJAYA25: { type: "percent", value: 15, note: "Diskon 15%" },
  HARUSCORELINE: { type: "fixed", value: 70000, note: "Potongan Rp70.000" },
};

const rupiah = (n: number) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(Math.max(0, Math.round(n)));

function makeOrderId() {
  const d = new Date();
  const ts = [d.getFullYear(), d.getMonth() + 1, d.getDate()]
    .map((v) => String(v).padStart(2, "0"))
    .join("");
  const hms = [d.getHours(), d.getMinutes(), d.getSeconds()]
    .map((v) => String(v).padStart(2, "0"))
    .join("");
  return `ORD-${ts}-${hms}`;
}

function calcDiscount(nominal: number, code: string) {
  if (!code) return { valid: false, amount: 0, label: "" };
  const v = VOUCHERS[code.toUpperCase().trim()];
  if (!v) return { valid: false, amount: 0, label: "" };
  let disc =
    v.type === "percent" ? Math.floor((nominal * v.value) / 100) : v.value;
  disc = Math.min(disc, nominal);
  const label =
    v.note || (v.type === "percent" ? `${v.value}%` : rupiah(v.value));
  return { valid: true, amount: disc, label };
}

type AuthUser = {
  public_id: string;
  full_name: string;
  email: string;
  balance: number;
};

export default function ManualQRISPage() {
  const [copied, setCopied] = useState(false);

  const [user, setUser] = useState<AuthUser | null>(null);
  const [loadingUser, setLoadingUser] = useState(false);
  const [balanceError, setBalanceError] = useState<string | null>(null);
  const [balanceSuccess, setBalanceSuccess] = useState<string | null>(null);
  const [payingWithBalance, setPayingWithBalance] = useState(false);

  // NEW: input Public ID + loading login
  const [publicId, setPublicId] = useState("");
  const [checkingPublicId, setCheckingPublicId] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const [publicIdError, setPublicIdError] = useState<string | null>(null);

  useEffect(() => {
    document.title = "Pay with Balance | New Coreline by Xenza ID";
  }, []);

  const params =
    typeof window !== "undefined"
      ? new URLSearchParams(window.location.search)
      : new URLSearchParams();
  const tierParam = (params.get("tier") as Tier) || "student";
  const cycleParam = (params.get("cycle") as Cycle) || "monthly";
  const amountParam = Number(params.get("amount") || NaN);

  const nominalRaw = useMemo(() => {
    const defaults = DEFAULT_PRICE[tierParam];
    return Number.isFinite(amountParam)
      ? Math.max(0, Math.round(amountParam))
      : defaults[cycleParam];
  }, [tierParam, cycleParam, amountParam]);

  const orderId = useMemo(() => makeOrderId(), []);
  const [voucher, setVoucher] = useState("");

  const disc = useMemo(
    () => calcDiscount(nominalRaw, voucher),
    [nominalRaw, voucher]
  );
  const nominalAfterDisc = Math.max(0, nominalRaw - disc.amount);
  const total = nominalAfterDisc;

  const onCopyTotal = async () => {
    try {
      await navigator.clipboard.writeText(String(total));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // ignore
    }
  };

  // Step 1: user isi Public ID -> login ke authx -> dapat token + user
  const handleCheckPublicId = async (e: React.FormEvent) => {
    e.preventDefault();
    setPublicIdError(null);
    setBalanceError(null);
    setBalanceSuccess(null);
    setUser(null);
    setToken(null);

    const trimmed = publicId.trim();
    if (!trimmed) {
      setPublicIdError("Public ID wajib diisi.");
      return;
    }

    setCheckingPublicId(true);

    try {
      const res = await fetch(`${API_BASE}/api/auth/login/public-id`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ public_id: trimmed }),
      });

      const data = await res.json();

      if (!res.ok) {
        setPublicIdError(
          data?.message || "Login dengan Public ID gagal. Coba lagi."
        );
        return;
      }

      const t = data?.data?.token;
      const u = data?.data?.user;
      if (!t || !u) {
        setPublicIdError("Token atau data user tidak ditemukan dari server.");
        return;
      }

      // simpan token ke state + localStorage
      setToken(t);
      if (typeof window !== "undefined") {
        localStorage.setItem(TOKEN_KEY, t);
      }

      // set user dari respons login langsung (sudah cukup)
      setUser({
        public_id: u.public_id,
        full_name: u.full_name,
        email: u.email,
        balance: u.balance ?? 0,
      });
    } catch (err) {
      console.error(err);
      setPublicIdError("Terjadi kesalahan jaringan. Coba lagi beberapa saat.");
    } finally {
      setCheckingPublicId(false);
    }
  };

  // Step 2: Bayar pakai saldo AstByte (wajib sudah ada token + user)
  const handlePayWithBalance = async () => {
    setBalanceError(null);
    setBalanceSuccess(null);

    if (!token) {
      setBalanceError(
        "Kamu belum login dengan Public ID. Silakan cek akun terlebih dahulu."
      );
      return;
    }

    if (!user) {
      setBalanceError("Data user tidak tersedia. Silakan cek akun lagi.");
      return;
    }

    if (user.balance < total) {
      setBalanceError(
        `Saldo tidak cukup. Saldo kamu ${rupiah(
          user.balance
        )}, sedangkan total yang harus dibayar ${rupiah(total)}.`
      );
      return;
    }

    setPayingWithBalance(true);

    try {
      const res = await fetch(`${API_BASE}/api/payment/pay-balance`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          amount: total,
          order_id: orderId,
          tier: tierParam,
          cycle: cycleParam,
          voucher_code: voucher || null,
        }),
      });

      const data = await res.json();
      if (!res.ok || data?.status !== "success") {
        setBalanceError(
          data?.message || "Gagal memproses pembayaran saldo. Coba lagi."
        );
        return;
      }

      const newBalance =
        data?.data?.balance !== undefined
          ? Number(data.data.balance)
          : user.balance - total;

      setUser((prev) =>
        prev ? { ...prev, balance: newBalance } : prev
      );
      setBalanceSuccess("Pembayaran dengan saldo AstByte berhasil!");

      // Redirect ke halaman utama setelah 1.5 detik
      if (typeof window !== "undefined") {
        setTimeout(() => {
          window.location.href = "/";
        }, 1500);
      }
    } catch (err) {
      console.error(err);
      setBalanceError("Terjadi kesalahan jaringan. Coba beberapa saat lagi.");
    } finally {
      setPayingWithBalance(false);
    }
  };

  const balanceEnough = user ? user.balance >= total : false;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Header */}
        <header className="mb-6 sm:mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-2xl bg-slate-900 border border-sky-500/60 flex items-center justify-center shadow-[0_0_35px_rgba(56,189,248,0.7)]">
              <QrIcon />
            </div>
            <div>
              <h1 className="text-lg sm:text-xl font-semibold tracking-tight bg-gradient-to-r from-sky-400 via-blue-300 to-indigo-300 bg-clip-text text-transparent">
                Bayar dengan Saldo AstByte
              </h1>
              <p className="text-xs sm:text-sm text-slate-400">
                Subscripsi New Coreline by Xenza ID
              </p>
            </div>
          </div>

          {user && (
            <div className="rounded-2xl bg-slate-900 border border-slate-700 px-4 py-2.5 flex items-center gap-3 shadow-[0_16px_40px_rgba(15,23,42,1)]">
              <div className="flex flex-col">
                <span className="text-[11px] text-slate-400">Saldo kamu</span>
                <span className="text-sm sm:text-base font-semibold text-slate-50">
                  {rupiah(user.balance)}
                </span>
              </div>
              <div className="h-8 w-px bg-slate-800" />
              <div className="flex flex-col">
                <span className="text-[11px] text-slate-400">Status</span>
                <span
                  className={`text-xs font-medium ${
                    balanceEnough ? "text-emerald-400" : "text-amber-300"
                  }`}
                >
                  {balanceEnough ? "Saldo cukup" : "Saldo kurang"}
                </span>
              </div>
            </div>
          )}
        </header>

        <main className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-5 sm:gap-6 items-start">
          {/* Left */}
          <div className="space-y-4 sm:space-y-5">
            {/* Public ID Section */}
            <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-5 sm:p-6 shadow-[0_20px_55px_rgba(15,23,42,1)]">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-7 h-7 rounded-2xl bg-sky-500/20 border border-sky-500/60 flex items-center justify-center">
                  <User className="w-4 h-4 text-sky-300" />
                </div>
                <h2 className="text-sm sm:text-base font-semibold text-slate-50">
                  Masukkan Public ID AstByte
                </h2>
              </div>
              <p className="text-[11px] sm:text-xs text-slate-400 mb-3">
                Public ID bisa kamu lihat di halaman Account Center AstByte.
                Data akun & saldo akan dicek sebelum pembayaran.
              </p>
              <form onSubmit={handleCheckPublicId} className="space-y-3">
                <input
                  type="text"
                  value={publicId}
                  onChange={(e) => {
                    setPublicId(e.target.value);
                    setPublicIdError(null);
                    setBalanceError(null);
                    setBalanceSuccess(null);
                  }}
                  placeholder="Contoh: 3e02d5cb-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
                  className="w-full rounded-2xl border border-slate-700 bg-slate-950/80 px-3.5 py-2.5 text-sm text-slate-100 placeholder:text-slate-500 focus:border-sky-500 focus:ring-2 focus:ring-sky-500/60 outline-none"
                />
                {publicIdError && (
                  <div className="rounded-2xl border border-red-300/70 bg-red-50/10 px-3 py-2 text-xs text-red-200 flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <span>{publicIdError}</span>
                  </div>
                )}
                <button
                  type="submit"
                  disabled={checkingPublicId}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-sky-500/90 hover:bg-sky-400 text-slate-950 px-4 py-2.5 text-sm sm:text-base font-semibold shadow-[0_16px_40px_rgba(56,189,248,0.9)] transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {checkingPublicId ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Mengecek Akun...
                    </>
                  ) : (
                    <>
                      <Check className="w-4 h-4" />
                      Cek Akun & Saldo
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Paket & Diskon */}
            <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-5 sm:p-6 shadow-[0_20px_55px_rgba(15,23,42,1)]">
              <div className="flex items-center justify-between gap-3 mb-4">
                <div>
                  <p className="text-xs text-slate-400 mb-1">Paket Dipilih</p>
                  <p className="text-base sm:text-lg font-semibold text-slate-50">
                    {tierParam.toUpperCase()} •{" "}
                    <span className="capitalize">{cycleParam}</span>
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-[11px] text-slate-400">Order ID</p>
                  <p className="text-xs font-mono text-slate-200">{orderId}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-4">
                <StatItem label="Nominal Paket" value={rupiah(nominalRaw)} />
                <StatItem
                  label="Diskon"
                  value={
                    disc.valid && disc.amount > 0
                      ? `-${rupiah(disc.amount)} (${disc.label})`
                      : "Tidak ada"
                  }
                />
              </div>

              <div className="rounded-2xl border border-sky-500/60 bg-gradient-to-r from-sky-500/20 via-sky-500/15 to-indigo-500/20 px-4 py-3 flex items-center justify-between gap-3">
                <div>
                  <p className="text-xs text-sky-100/80 mb-1">
                    Total Bayar (dari saldo)
                  </p>
                  <p className="text-lg sm:text-xl font-semibold text-slate-50">
                    {rupiah(total)}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={onCopyTotal}
                  className="inline-flex items-center gap-1.5 rounded-full bg-slate-950/80 border border-sky-400/80 px-3 py-1.5 text-[11px] text-sky-100 hover:bg-slate-900 transition-colors"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>Tersalin</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Total</span>
                    </>
                  )}
                </button>
              </div>

              {/* Voucher */}
              <div className="mt-4 space-y-2.5">
                <label className="text-sm font-medium text-slate-200">
                  Kode Voucher (opsional)
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={voucher}
                    onChange={(e) => setVoucher(e.target.value)}
                    placeholder="Masukkan kode voucher"
                    className="flex-1 rounded-2xl border border-slate-700 bg-slate-950/80 px-3.5 py-2.5 text-sm text-slate-100 placeholder:text-slate-500 focus:border-sky-500 focus:ring-2 focus:ring-sky-500/60 outline-none"
                  />
                  <div className="hidden sm:flex items-center gap-1.5 rounded-2xl bg-slate-900 border border-slate-700 px-3 py-2 text-[11px] text-slate-300">
                    <BadgePercent className="w-3.5 h-3.5 text-sky-300" />
                    <span>Promo tersedia</span>
                  </div>
                </div>
                {disc.valid && (
                  <p className="text-xs text-emerald-300">
                    Voucher aktif: {disc.label} (potongan {rupiah(disc.amount)})
                  </p>
                )}
              </div>
            </div>

            {/* Error / Success */}
            {balanceError || balanceSuccess ? (
              <div
                className={`rounded-2xl border px-4 py-3 text-xs sm:text-sm flex items-start gap-2 ${
                  balanceError
                    ? "border-red-200 bg-red-50/10 text-red-200"
                    : "border-emerald-200 bg-emerald-50/10 text-emerald-200"
                }`}
              >
                {balanceError ? (
                  <AlertTriangle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                ) : (
                  <Check className="w-4 h-4 mt-0.5 flex-shrink-0" />
                )}
                <span>{balanceError || balanceSuccess}</span>
              </div>
            ) : null}

            {/* Tombol Bayar */}
            <button
              type="button"
              onClick={handlePayWithBalance}
              disabled={
                payingWithBalance ||
                !user ||
                !token ||
                !Number.isFinite(total) ||
                total <= 0
              }
              className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-slate-950 text-slate-50 px-4 py-3 text-sm sm:text-base font-semibold hover:bg-slate-900 transition-colors shadow-[0_20px_55px_rgba(15,23,42,1)] disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {payingWithBalance ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Memproses Pembayaran...
                </>
              ) : (
                <>
                  <Wallet className="w-4 h-4" />
                  Bayar dengan Saldo AstByte
                  <span className="text-xs opacity-80">
                    ({rupiah(total)})
                  </span>
                </>
              )}
            </button>

            <div className="mt-3 flex items-start justify-between gap-2 text-[11px] sm:text-xs text-slate-500">
              <span>
                Pembayaran saldo diproses langsung oleh sistem. Pastikan kamu
                sudah cek Public ID kamu di atas.
              </span>
              <a
                href="/pricing"
                className="inline-flex items-center gap-1 text-sky-400 hover:text-sky-300 font-medium transition-colors"
              >
                Kembali
                <ArrowRight className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* Right */}
          <div className="space-y-4 sm:space-y-5">
            <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-5 sm:p-6">
              <div className="flex items-center gap-2 mb-3">
                <Shield className="w-4 h-4 text-sky-300" />
                <h2 className="text-sm sm:text-base font-semibold text-slate-50">
                  Info Akun
                </h2>
              </div>
              {user ? (
                <div className="space-y-2 text-xs sm:text-sm">
                  <Row label="Nama" value={user.full_name} />
                  <Row label="Email" value={user.email} />
                  <Row label="Saldo" value={rupiah(user.balance)} highlight />
                </div>
              ) : (
                <p className="text-xs text-slate-400">
                  Masukkan Public ID di sebelah kiri untuk menampilkan data
                  akun & saldo.
                </p>
              )}
            </div>

            <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-5 sm:p-6">
              <div className="flex items-center gap-2 mb-3">
                <BadgeCheck className="w-4 h-4 text-emerald-300" />
                <h2 className="text-sm sm:text-base font-semibold text-slate-50">
                  Ringkasan Order
                </h2>
              </div>
              <div className="space-y-2 text-xs sm:text-sm">
                <Row
                  label="Paket"
                  value={`${tierParam.toUpperCase()} (${cycleParam})`}
                />
                <Row label="Merchant" value={MERCHANT_NAME} />
                <Row label="NMID" value={NMID} mono />
                <Row label="Order ID" value={orderId} mono />
                <Row label="Nominal Paket" value={rupiah(nominalRaw)} />
                <Row
                  label="Diskon"
                  value={
                    disc.valid && disc.amount > 0
                      ? `-${rupiah(disc.amount)} (${disc.label})`
                      : "-"
                  }
                />
                <Row
                  label="Total dari Saldo"
                  value={rupiah(total)}
                  highlight
                />
              </div>
            </div>

            {!Number.isFinite(amountParam) && (
              <div className="rounded-2xl border border-amber-200/40 bg-amber-50/10 text-amber-200 p-4 text-xs sm:text-sm">
                <div className="flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                  <div>
                    Nominal tidak terdeteksi dari URL. Sistem menggunakan harga
                    default paket{" "}
                    <strong>{tierParam.toUpperCase()}</strong> (
                    <strong>{cycleParam}</strong>). Untuk nominal spesifik,
                    pastikan link dari halaman pricing menyertakan parameter{" "}
                    <code className="mx-1 px-1.5 py-0.5 rounded bg-black/10 font-mono text-[10px]">
                      amount
                    </code>
                    .
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>

      <footer className="text-center text-xs sm:text-sm text-slate-500 py-6 border-t border-slate-800">
        Powered by <strong>XenzaDigital</strong> — Halaman pembayaran ini
        dibuat oleh XenzaDigital (Xenza ID)
      </footer>
    </div>
  );
}

function StatItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-slate-900 border border-slate-800 p-3">
      <div className="text-[11px] font-medium text-slate-400 mb-1">
        {label}
      </div>
      <div className="text-sm font-semibold text-slate-50">{value}</div>
    </div>
  );
}

function Row({
  label,
  value,
  mono,
  highlight,
}: {
  label: string;
  value: string;
  mono?: boolean;
  highlight?: boolean;
}) {
  return (
    <div className="flex items-center justify-between gap-4">
      <div className="text-xs sm:text-sm text-slate-300">{label}</div>
      <div
        className={`text-xs sm:text-sm font-semibold ${
          highlight ? "text-emerald-300" : "text-slate-50"
        } ${mono ? "font-mono tracking-wider" : ""}`}
      >
        {value}
      </div>
    </div>
  );
}

function QrIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="w-5 h-5 text-sky-300"
      fill="none"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
        d="M3 3h8v8H3V3zm10 0h8v8h-8V3zM3 13h8v8H3v-8zm10 4h4v4h-4v-4z"
      />
    </svg>
  );
}
