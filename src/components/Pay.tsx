// src/pages/ManualQRISPage.tsx
import { useMemo, useState, useEffect } from 'react';
import {
  Copy,
  Shield,
  BadgeCheck,
  ArrowRight,
  BadgePercent,
  AlertTriangle,
  Check,
  Wallet,
  Loader2,
  User,
  CreditCard,
  QrCode,
  ArrowLeft,
} from 'lucide-react';

/* =========================================
   TYPES & CONFIG
   ========================================= */
type Tier = 'student' | 'pro' | 'plus';
type Cycle = 'monthly' | 'yearly';

const MERCHANT_NAME = 'AstByte System';
const API_BASE = 'https://authx.astbyte.com'; // Ganti ke localhost jika dev
const TOKEN_KEY = 'astbyte_token';

const DEFAULT_PRICE: Record<Tier, { monthly: number; yearly: number }> = {
  student: { monthly: 0, yearly: 0 },
  pro: { monthly: 25000, yearly: 240000 },
  plus: { monthly: 149000, yearly: 1440000 },
};

// Voucher Codes
const VOUCHERS: Record<string, { type: 'percent' | 'fixed'; value: number; note?: string }> = {
  // CORELINESATU: { type: 'percent', value: 5, note: 'Diskon 5%' }, // Mulai --/--/2026
  ASTBYTEJAYA26: { type: 'percent', value: 5, note: 'Diskon 5%' }, // Berakhir 30 Desember 2026
  HARUSCORELINE: { type: 'fixed', value: 70000, note: 'Potongan Rp70.000' }, // Mulai 02/02/2026
  // MABA2026: { type: 'fixed', value: 50000, note: 'Promo Mahasiswa Baru' }, // Mulai --/--/2026
  FEBARU: { type: 'percent', value: 10, note: 'Diskon Bulan Februari 10%' }, // Berakhir 30/2/2026
};

/* =========================================
   HELPERS
   ========================================= */
const rupiah = (n: number) =>
  new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
    minimumFractionDigits: 0,
  }).format(Math.max(0, Math.round(n)));

function makeOrderId() {
  const d = new Date();
  const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
  const ts = [d.getFullYear(), d.getMonth() + 1, d.getDate()]
    .map((v) => String(v).padStart(2, '0')).join('');
  return `TRX-${ts}-${random}`;
}

function calcDiscount(nominal: number, code: string) {
  if (!code) return { valid: false, amount: 0, label: '' };
  const v = VOUCHERS[code.toUpperCase().trim()];
  if (!v) return { valid: false, amount: 0, label: '' };
  
  let disc = v.type === 'percent' ? Math.floor((nominal * v.value) / 100) : v.value;
  disc = Math.min(disc, nominal); // Diskon tidak boleh melebihi harga
  
  const label = v.note || (v.type === 'percent' ? `Diskon ${v.value}%` : `Potongan ${rupiah(v.value)}`);
  return { valid: true, amount: disc, label };
}

type AuthUser = {
  public_id: string;
  full_name: string;
  email: string;
  balance: number;
};

/* =========================================
   MAIN COMPONENT
   ========================================= */
export default function ManualQRISPage() {
  // State
  const [user, setUser] = useState<AuthUser | null>(null);
  const [publicId, setPublicId] = useState('');
  const [voucher, setVoucher] = useState('');
  const [token, setToken] = useState<string | null>(null);
  
  // UI State
  const [loadingCheck, setLoadingCheck] = useState(false);
  const [loadingPay, setLoadingPay] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  // URL Params
  const params = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : new URLSearchParams();
  const tierParam = (params.get('tier') as Tier) || 'student';
  const cycleParam = (params.get('cycle') as Cycle) || 'monthly';
  const amountParam = Number(params.get('amount') || NaN);

  // Computed Values
  const orderId = useMemo(() => makeOrderId(), []);
  
  const nominalRaw = useMemo(() => {
    const defaults = DEFAULT_PRICE[tierParam];
    return Number.isFinite(amountParam) ? Math.max(0, Math.round(amountParam)) : defaults[cycleParam];
  }, [tierParam, cycleParam, amountParam]);

  const disc = useMemo(() => calcDiscount(nominalRaw, voucher), [nominalRaw, voucher]);
  const total = Math.max(0, nominalRaw - disc.amount);

  useEffect(() => {
    document.title = 'Pembayaran Saldo | Coreline';
  }, []);

  // --- Actions ---

  const handleCopyTotal = async () => {
    try {
      await navigator.clipboard.writeText(String(total));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch { /* noop */ }
  };

  const handleCheckPublicId = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);
    setUser(null);
    setToken(null);

    const pid = publicId.trim();
    if (!pid) {
      setErrorMsg('Harap masukkan Public ID.');
      return;
    }

    setLoadingCheck(true);

    try {
      const res = await fetch(`${API_BASE}/api/auth/login/public-id`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ public_id: pid }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.message || 'ID tidak ditemukan atau tidak valid.');
      }

      const t = data?.data?.token;
      const u = data?.data?.user;

      if (!t || !u) throw new Error('Data user tidak valid.');

      setToken(t);
      if (typeof window !== 'undefined') localStorage.setItem(TOKEN_KEY, t);

      setUser({
        public_id: u.public_id,
        full_name: u.full_name,
        email: u.email,
        balance: u.balance ?? 0,
      });

    } catch (err: any) {
      setErrorMsg(err.message || 'Gagal mengecek akun.');
    } finally {
      setLoadingCheck(false);
    }
  };

  const handlePay = async () => {
    setErrorMsg(null);
    setSuccessMsg(null);

    if (!token || !user) {
      setErrorMsg('Sesi tidak valid. Silakan cek akun ulang.');
      return;
    }

    if (user.balance < total) {
      setErrorMsg(`Saldo tidak cukup. Saldo: ${rupiah(user.balance)}, Tagihan: ${rupiah(total)}.`);
      return;
    }

    setLoadingPay(true);

    try {
      const res = await fetch(`${API_BASE}/api/payment/pay-balance`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
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
      if (!res.ok || data?.status !== 'success') {
        throw new Error(data?.message || 'Pembayaran gagal.');
      }

      // Update local balance state for UX
      const newBalance = data?.data?.balance !== undefined ? Number(data.data.balance) : user.balance - total;
      setUser(prev => prev ? { ...prev, balance: newBalance } : prev);
      
      setSuccessMsg('Pembayaran berhasil! Mengalihkan...');
      
      setTimeout(() => {
        window.location.href = '/dashboard';
      }, 2000);

    } catch (err: any) {
      setErrorMsg(err.message || 'Terjadi kesalahan sistem.');
    } finally {
      setLoadingPay(false);
    }
  };

  const isBalanceSufficient = user ? user.balance >= total : false;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0B0F19] text-slate-900 dark:text-slate-100 font-sans selection:bg-blue-200 dark:selection:bg-blue-900/50 transition-colors duration-300">
      
      {/* Background Ambience (Dual Mode) */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-[20%] -left-[10%] w-[600px] h-[600px] bg-blue-200/40 dark:bg-blue-600/10 rounded-full blur-[100px] transition-colors duration-500" />
        <div className="absolute top-[20%] -right-[10%] w-[500px] h-[500px] bg-purple-200/40 dark:bg-purple-600/10 rounded-full blur-[100px] transition-colors duration-500" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 py-10">
        
        {/* HEADER */}
        <header className="mb-10">
          <a href="/pricing" className="inline-flex items-center gap-2 text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 mb-6 transition-colors text-sm font-medium">
            <ArrowLeft className="w-4 h-4" /> Kembali ke Pilihan Paket
          </a>
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                  <img src="/logos/axipay.png" alt="AxiPay Logo" className='h-22 w-44 ml-[-28px] filter invert hue-rotate-180' />
                </h1>
              </div>
              <p className="text-slate-600 dark:text-slate-400 max-w-lg">
                Gunakan saldo akun AstByte Anda untuk berlangganan layanan Coreline secara instan tanpa biaya admin.
              </p>
            </div>

            {/* Saldo Badge (Desktop) */}
            {user && (
              <div className="hidden md:flex items-center gap-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-xl shadow-slate-200/50 dark:shadow-slate-900/50 backdrop-blur-sm">
                <div className="text-right">
                  <p className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wider font-semibold">Saldo Tersedia</p>
                  <p className="text-xl font-bold text-slate-900 dark:text-white font-mono">{rupiah(user.balance)}</p>
                </div>
                <div className={`h-10 w-10 rounded-full flex items-center justify-center border ${isBalanceSufficient ? 'bg-emerald-50 text-emerald-600 border-emerald-100 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20' : 'bg-red-50 text-red-600 border-red-100 dark:bg-red-500/10 dark:text-red-400 dark:border-red-500/20'}`}>
                  {isBalanceSufficient ? <Check className="w-5 h-5" /> : <AlertTriangle className="w-5 h-5" />}
                </div>
              </div>
            )}
          </div>
        </header>

        <main className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT COLUMN: FORM */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Step 1: Identification */}
            <div className="bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm backdrop-blur-md relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-1 h-full bg-blue-500" />
              
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-300 font-bold border border-slate-200 dark:border-slate-700">1</div>
                  <h2 className="text-lg font-bold text-slate-900 dark:text-white">Identifikasi Akun</h2>
                </div>
                {user && <BadgeCheck className="w-5 h-5 text-emerald-500 dark:text-emerald-400" />}
              </div>

              {!user ? (
                <form onSubmit={handleCheckPublicId} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-2">Masukkan Public ID</label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 dark:text-slate-500" />
                      <input
                        type="text"
                        value={publicId}
                        onChange={(e) => setPublicId(e.target.value)}
                        placeholder="Contoh: 3e02d5cb-xxxx-xxxx..."
                        className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-xl py-3.5 pl-12 pr-4 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-600 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all outline-none font-mono text-sm shadow-inner"
                      />
                    </div>
                    <p className="mt-2 text-xs text-slate-500 dark:text-slate-500">Public ID dapat dilihat pada menu Account Center di dashboard utama.</p>
                  </div>
                  
                  <button
                    type="submit"
                    disabled={loadingCheck}
                    className="w-full bg-slate-900 dark:bg-slate-800 hover:bg-slate-800 dark:hover:bg-slate-700 text-white font-semibold py-3 rounded-xl transition-all flex items-center justify-center gap-2 shadow-md hover:shadow-lg border border-transparent dark:border-slate-700"
                  >
                    {loadingCheck ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Cek Ketersediaan Akun'}
                  </button>
                </form>
              ) : (
                <div className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 flex items-center justify-between group-hover:border-blue-300 dark:group-hover:border-blue-700 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 flex items-center justify-center text-sm font-bold text-white">
                      {user.full_name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-bold text-slate-900 dark:text-white">{user.full_name}</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400 font-mono">{user.email}</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => { setUser(null); setToken(null); }}
                    className="text-xs text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300 font-medium underline"
                  >
                    Ganti Akun
                  </button>
                </div>
              )}
            </div>

            {/* Step 2: Payment Details */}
            <div className={`bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm backdrop-blur-md relative overflow-hidden transition-opacity duration-500 ${!user ? 'opacity-50 pointer-events-none' : 'opacity-100'}`}>
              <div className="absolute top-0 left-0 w-1 h-full bg-emerald-500" />
              
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-300 font-bold border border-slate-200 dark:border-slate-700">2</div>
                <h2 className="text-lg font-bold text-slate-900 dark:text-white">Rincian Pembayaran</h2>
              </div>

              <div className="space-y-6">
                {/* Product Info */}
                <div className="flex justify-between items-center p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-100 dark:bg-blue-500/20 rounded-lg text-blue-600 dark:text-blue-400">
                      <CreditCard className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Langganan</p>
                      <p className="text-lg font-bold text-slate-900 dark:text-white capitalize">{tierParam} Plan <span className="text-slate-500 dark:text-slate-500 text-sm font-normal">({cycleParam})</span></p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-slate-900 dark:text-white">{rupiah(nominalRaw)}</p>
                  </div>
                </div>

                {/* Voucher Input */}
                <div>
                   <label className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-2">Kode Voucher</label>
                   <div className="relative flex gap-2">
                     <div className="relative flex-1">
                        <BadgePercent className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 dark:text-slate-500" />
                        <input
                          type="text"
                          value={voucher}
                          onChange={(e) => setVoucher(e.target.value)}
                          placeholder="Punya kode promo?"
                          className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-xl py-3 pl-12 pr-4 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-600 focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all outline-none text-sm uppercase shadow-inner"
                        />
                     </div>
                   </div>
                   {disc.valid && (
                     <div className="mt-2 text-xs font-medium text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                       <Check className="w-3 h-3" /> {disc.label} diterapkan (-{rupiah(disc.amount)})
                     </div>
                   )}
                </div>

                {/* Total Calculation */}
                <div className="border-t border-slate-200 dark:border-slate-800 pt-4 space-y-2">
                   <div className="flex justify-between text-sm text-slate-500 dark:text-slate-400">
                     <span>Subtotal</span>
                     <span>{rupiah(nominalRaw)}</span>
                   </div>
                   {disc.amount > 0 && (
                     <div className="flex justify-between text-sm text-emerald-600 dark:text-emerald-400">
                       <span>Diskon</span>
                       <span>-{rupiah(disc.amount)}</span>
                     </div>
                   )}
                   <div className="flex justify-between items-center pt-2">
                     <span className="font-bold text-slate-900 dark:text-white">Total Tagihan</span>
                     <div className="flex items-center gap-2">
                        <span className="text-2xl font-bold text-slate-900 dark:text-white">{rupiah(total)}</span>
                        <button onClick={handleCopyTotal} className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-slate-500 dark:text-slate-400 transition-colors">
                           {copied ? <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400"/> : <Copy className="w-4 h-4"/>}
                        </button>
                     </div>
                   </div>
                </div>

                {/* Status Messages */}
                {errorMsg && (
                  <div className="p-4 rounded-xl bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-red-500 dark:text-red-400 flex-shrink-0" />
                    <p className="text-sm text-red-700 dark:text-red-200">{errorMsg}</p>
                  </div>
                )}
                {successMsg && (
                  <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 flex items-start gap-3">
                    <Check className="w-5 h-5 text-emerald-500 dark:text-emerald-400 flex-shrink-0" />
                    <p className="text-sm text-emerald-700 dark:text-emerald-200">{successMsg}</p>
                  </div>
                )}

                {/* Action Button */}
                <button
                  onClick={handlePay}
                  disabled={loadingPay || !isBalanceSufficient}
                  className={`
                    w-full py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all shadow-lg
                    ${isBalanceSufficient 
                      ? 'bg-blue-600 hover:bg-blue-700 dark:hover:bg-blue-500 text-white shadow-blue-600/20' 
                      : 'bg-slate-200 dark:bg-slate-800 text-slate-500 cursor-not-allowed border border-transparent dark:border-slate-700'
                    }
                  `}
                >
                  {loadingPay ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" /> Memproses...
                    </>
                  ) : !isBalanceSufficient ? (
                    <>
                      <AlertTriangle className="w-5 h-5" /> Saldo Tidak Cukup
                    </>
                  ) : (
                    <>
                      Bayar Sekarang <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </button>
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: RECEIPT */}
          <div className="lg:col-span-5 space-y-6">
            <div className="sticky top-8">
              <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 shadow-2xl shadow-slate-200/50 dark:shadow-black/50 relative overflow-hidden border border-slate-100 dark:border-slate-800">
                {/* Receipt Decoration */}
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 via-indigo-500 to-emerald-500" />
                <div className="absolute -bottom-3 left-0 w-full h-6 bg-slate-50 dark:bg-[#0B0F19] [mask-image:linear-gradient(to_right,transparent_0%,#000_50%,transparent_100%),radial-gradient(circle_at_bottom,transparent_6px,#000_7px)] [mask-size:100%_100%,20px_20px] [mask-composite:intersect]" />

                <div className="text-center mb-6">
                  <div className="w-12 h-12 bg-slate-100 dark:bg-slate-800 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <QrCode className="w-6 h-6 text-slate-900 dark:text-white" />
                  </div>
                  <h3 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">INVOICE</h3>
                  <p className="text-slate-500 dark:text-slate-400 text-xs font-mono mt-1">{orderId}</p>
                </div>

                <div className="space-y-4 border-b-2 border-dashed border-slate-200 dark:border-slate-700 pb-6 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500 dark:text-slate-400">Merchant</span>
                    <span className="font-semibold text-slate-900 dark:text-white">{MERCHANT_NAME}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500 dark:text-slate-400">Tanggal</span>
                    <span className="font-semibold text-slate-900 dark:text-white">{new Date().toLocaleDateString('id-ID')}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500 dark:text-slate-400">Item</span>
                    <span className="font-semibold text-slate-900 dark:text-white">{tierParam.toUpperCase()} / {cycleParam}</span>
                  </div>
                </div>

                <div className="space-y-2 mb-8">
                   <div className="flex justify-between text-sm font-medium text-slate-600 dark:text-slate-300">
                      <span>Harga</span>
                      <span>{rupiah(nominalRaw)}</span>
                   </div>
                   {disc.amount > 0 && (
                     <div className="flex justify-between text-sm text-emerald-600 dark:text-emerald-400">
                        <span>Diskon</span>
                        <span>-{rupiah(disc.amount)}</span>
                     </div>
                   )}
                   <div className="flex justify-between text-xl font-extrabold mt-4 pt-4 border-t border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white">
                      <span>Total</span>
                      <span>{rupiah(total)}</span>
                   </div>
                </div>

                <div className="bg-slate-50 dark:bg-slate-800 rounded-xl p-4 text-center border border-slate-100 dark:border-slate-700">
                  <p className="text-xs text-slate-500 dark:text-slate-400 mb-2">Metode Pembayaran</p>
                  <div className="flex items-center justify-center gap-2 font-bold text-slate-800 dark:text-white">
                    <Wallet className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                    AxiPay
                  </div>
                </div>

              </div>
              
              {/* Security Badge */}
              <div className="mt-6 flex items-center justify-center gap-2 text-slate-400 dark:text-slate-500 text-xs">
                <Shield className="w-4 h-4" />
                <span>Pembayaran Anda aman</span>
              </div>
            </div>
          </div>

        </main>
      </div>
      
      {/* Footer */}
      <footer className="py-8 text-center border-t border-slate-200 dark:border-slate-800 mt-12 bg-white dark:bg-slate-950">
        <p className="text-slate-500 dark:text-slate-400 text-sm">
          &copy; {new Date().getFullYear()} AstByte Technology. All rights reserved.
        </p>
      </footer>
    </div>
  );
}