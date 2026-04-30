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
  Receipt,
  Info,
  Plus
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext'; // Import useAuth untuk auto-read

/* =========================================
   TYPES & CONFIG
   ========================================= */
type Tier = 'student' | 'pro' | 'plus' | 'ultra' | 'ultimate'; // Tambah ultimate
type Cycle = 'monthly' | 'yearly';

const MERCHANT_NAME = 'AstByte System';
const API_BASE = 'https://authx.astbyte.com'; // Ganti ke localhost jika dev
const TOKEN_KEY = 'astbyte_token';
const PPN_RATE = 0.11; // 11% PPN

// Disesuaikan dengan harga diskon promo yang ada di Pricing Page
const DEFAULT_PRICE: Record<Tier, { monthly: number; yearly: number }> = {
  student: { monthly: 0, yearly: 0 },
  pro: { monthly: 22500, yearly: 225000 },
  plus: { monthly: 67500, yearly: 675000 },
  ultra: { monthly: 112500, yearly: 1125000 },
  ultimate: { monthly: 280000, yearly: 2800000 },
};

// Voucher Codes dengan batasan Tier & Cycle
type VoucherConfig = {
  type: 'percent' | 'fixed';
  value: number;
  note: string;
  validTiers?: Tier[]; // Voucher hanya berlaku untuk tier ini (opsional)
  validCycles?: Cycle[]; // Voucher hanya berlaku untuk cycle ini (opsional)
  freePPN?: boolean; // Trik baru: true jika voucher ini menggratiskan PPN
};

const VOUCHERS: Record<string, VoucherConfig> = {
  ASTBYTEJAYA26: { 
    type: 'percent', 
    value: 5, 
    note: 'Diskon 5%',
  },
  APRISK: { 
    type: 'percent', 
    value: 10, 
    note: 'Diskon 10%',
  },
  HARUSCORELINE: { 
    type: 'fixed', 
    value: 70000, 
    note: 'Potongan Rp70.000 (Hanya Tahunan)',
    validTiers: ['plus', 'ultra', 'ultimate'], // Hanya untuk Plus, Ultra, Ultimate
    validCycles: ['yearly']
  },
  SUPER60K: {
    type: 'fixed',
    value: 60000,
    note: 'Potongan Rp60.000 & Bebas PPN',
    freePPN: true, // <- Menggratiskan PPN
    validTiers: ['ultimate']
  },
  HBDASTBYTE: {
    type: 'percent',
    value: 40,
    note: 'Potongan 40%',
    validTiers: ['pro', 'plus', 'ultra', 'ultimate']
  }
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

function calcDiscount(nominal: number, code: string, currentTier: Tier, currentCycle: Cycle) {
  if (!code) return { valid: false, amount: 0, label: '', error: '', freePPN: false };
  
  const v = VOUCHERS[code.toUpperCase().trim()];
  if (!v) return { valid: false, amount: 0, label: '', error: 'Kode voucher tidak valid atau kedaluwarsa.', freePPN: false };

  // Pengecekan Batasan (Constraints)
  if (v.validTiers && !v.validTiers.includes(currentTier)) {
    return { valid: false, amount: 0, label: '', error: `Voucher ini tidak berlaku untuk paket ${currentTier.toUpperCase()}.`, freePPN: false };
  }
  if (v.validCycles && !v.validCycles.includes(currentCycle)) {
    return { valid: false, amount: 0, label: '', error: `Voucher ini tidak berlaku untuk langganan ${currentCycle === 'monthly' ? 'Bulanan' : 'Tahunan'}.`, freePPN: false };
  }
  
  let disc = v.type === 'percent' ? Math.floor((nominal * v.value) / 100) : v.value;
  disc = Math.min(disc, nominal); // Diskon tidak boleh melebihi harga
  
  const label = v.note || (v.type === 'percent' ? `Diskon ${v.value}%` : `Potongan ${rupiah(v.value)}`);
  return { valid: true, amount: disc, label, error: '', freePPN: v.freePPN || false };
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
  const { user: authContextUser } = useAuth(); // Ambil dari context auth
  
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

  // Auto-Read Data User dari Context API jika sudah login
  useEffect(() => {
    const autoLoadUser = async () => {
      let currentToken = localStorage.getItem(TOKEN_KEY) || (authContextUser as any)?.token;
      
      if (currentToken) {
        setToken(currentToken);
        setLoadingCheck(true);
        try {
          // Fetch the latest balance & info to be safe
          const res = await fetch(`${API_BASE}/api/auth/me`, {
            headers: { Authorization: `Bearer ${currentToken}` }
          });
          const data = await res.json();
          if (res.ok && data?.data?.user) {
            setUser({
              public_id: data.data.user.public_id,
              full_name: data.data.user.full_name,
              email: data.data.user.email,
              balance: data.data.user.balance ?? 0,
            });
          }
        } catch (err) {
          console.error("Auto load user failed:", err);
        } finally {
          setLoadingCheck(false);
        }
      }
    };

    autoLoadUser();
  }, [authContextUser]);

  // Computed Values (Math Logic)
  const orderId = useMemo(() => makeOrderId(), []);
  
  const nominalRaw = useMemo(() => {
    const defaults = DEFAULT_PRICE[tierParam] || DEFAULT_PRICE['student'];
    return Number.isFinite(amountParam) ? Math.max(0, Math.round(amountParam)) : defaults[cycleParam];
  }, [tierParam, cycleParam, amountParam]);

  // Kalkulasi Pembayaran
  const disc = useMemo(() => calcDiscount(nominalRaw, voucher, tierParam, cycleParam), [nominalRaw, voucher, tierParam, cycleParam]);
  const subtotal = Math.max(0, nominalRaw - disc.amount); // Harga setelah diskon
  
  // PPN Logic: Jika voucher memberikan free PPN, maka PPN 0, jika tidak hitung 11% dari subtotal
  const rawPpnAmount = Math.round(subtotal * PPN_RATE);
  const ppnAmount = disc.freePPN ? 0 : rawPpnAmount; 
  
  const grandTotal = subtotal + ppnAmount; // Total akhir yang harus dibayar

  useEffect(() => {
    document.title = 'Checkout Pembayaran | Coreline';
  }, []);

  // --- Actions ---
  const handleCopyTotal = async () => {
    try {
      await navigator.clipboard.writeText(String(grandTotal));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch { /* noop */ }
  };

  // Ini fungsi Manual Fallback kalau context API belum login / expired
  const handleCheckPublicId = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);
    setUser(null);
    setToken(null);

    const pid = publicId.trim();
    if (!pid) {
      setErrorMsg('Harap masukkan Public ID Anda terlebih dahulu.');
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
        throw new Error(data?.message || 'Akun tidak ditemukan atau ID tidak valid.');
      }

      const t = data?.data?.token;
      const u = data?.data?.user;

      if (!t || !u) throw new Error('Respons data pengguna tidak valid.');

      setToken(t);
      if (typeof window !== 'undefined') localStorage.setItem(TOKEN_KEY, t);

      setUser({
        public_id: u.public_id,
        full_name: u.full_name,
        email: u.email,
        balance: u.balance ?? 0,
      });

    } catch (err: any) {
      setErrorMsg(err.message || 'Gagal mengecek akun. Pastikan sistem sedang online.');
    } finally {
      setLoadingCheck(false);
    }
  };

  const handlePay = async () => {
    setErrorMsg(null);
    setSuccessMsg(null);

    if (!token || !user) {
      setErrorMsg('Sesi telah berakhir atau tidak valid. Silakan verifikasi akun ulang.');
      return;
    }

    if (user.balance < grandTotal) {
      setErrorMsg(`Saldo tidak mencukupi. Saldo Anda: ${rupiah(user.balance)}, Tagihan: ${rupiah(grandTotal)}.`);
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
          amount: grandTotal, // Mengirimkan grand total (sudah termasuk PPN)
          order_id: orderId,
          tier: tierParam,
          cycle: cycleParam,
          voucher_code: disc.valid ? voucher : null, // Hanya kirim kode jika valid
        }),
      });

      const data = await res.json();
      if (!res.ok || data?.status !== 'success') {
        throw new Error(data?.message || 'Pembayaran gagal diproses.');
      }

      const newBalance = data?.data?.balance !== undefined ? Number(data.data.balance) : user.balance - grandTotal;
      setUser(prev => prev ? { ...prev, balance: newBalance } : prev);
      
      setSuccessMsg('Pembayaran Berhasil! Mengalihkan ke halaman dashboard...');
      
      setTimeout(() => {
        window.location.href = '/dashboard';
      }, 2500);

    } catch (err: any) {
      setErrorMsg(err.message || 'Terjadi kesalahan sistem saat memproses transaksi Anda.');
    } finally {
      setLoadingPay(false);
    }
  };

  const isBalanceSufficient = user ? user.balance >= grandTotal : false;

  return (
    // Light Theme Container
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans selection:bg-blue-500/30 transition-colors duration-300 relative overflow-hidden">
      
      {/* Background Ambience (Grid & Glows) */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {/* Subtle Grid Pattern */}
        <div className="absolute inset-0 opacity-[0.4] bg-[linear-gradient(rgba(203,213,225,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(203,213,225,0.5)_1px,transparent_1px)] bg-[size:30px_30px]"></div>
        {/* Soft Glows */}
        <div className="absolute top-[-10%] left-[-10%] w-[40vw] h-[40vw] max-w-[600px] max-h-[600px] bg-blue-300/30 rounded-full blur-[100px]" />
        <div className="absolute bottom-[-10%] right-[-5%] w-[35vw] h-[35vw] max-w-[500px] max-h-[500px] bg-emerald-300/20 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 py-6 md:py-12">
        
        {/* HEADER SECTION */}
        <header className="mb-8 md:mb-12">
          <a href="/pricing" className="inline-flex items-center gap-2 text-slate-500 hover:text-blue-600 transition-colors text-sm font-bold mb-6 w-fit bg-white px-4 py-2.5 rounded-full shadow-sm border border-slate-200 hover:shadow-md hover:-translate-y-0.5 transform">
            <ArrowLeft className="w-4 h-4" /> Kembali ke Paket
          </a>
          
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="max-w-xl">
              <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight flex items-center gap-4 drop-shadow-sm">
                <img src="/logos/axipay.png" alt="AxiPay" className="h-10 md:h-12 w-auto object-contain filter brightness-0 opacity-80" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">
                  Checkout
                </span>
              </h1>
            </div>

            {/* Saldo Badge (Desktop & Tablet) */}
            {user && (
              <div className="hidden sm:flex items-center gap-5 bg-white border border-slate-200 rounded-3xl p-5 shadow-lg shadow-slate-200/50 transition-all hover:scale-[1.02]">
                <div className="text-right">
                  <p className="text-xs text-slate-500 uppercase tracking-widest font-bold mb-1">Saldo Tersedia</p>
                  <p className="text-2xl font-black text-slate-900 font-mono tracking-tight">{rupiah(user.balance)}</p>
                </div>
                <div className={`h-14 w-14 rounded-2xl flex items-center justify-center border transition-colors shadow-sm ${isBalanceSufficient ? 'bg-emerald-50 text-emerald-600 border-emerald-200' : 'bg-red-50 text-red-600 border-red-200'}`}>
                  {isBalanceSufficient ? <Wallet className="w-7 h-7" /> : <AlertTriangle className="w-7 h-7" />}
                </div>
              </div>
            )}
          </div>
        </header>

        <main className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          
          {/* ==========================================
              LEFT COLUMN: FORM & PAYMENT DETAILS
              ========================================== */}
          <div className="lg:col-span-7 space-y-6 md:space-y-8">
            
            {/* Step 1: Identification */}
            <section className="bg-white border border-slate-200 rounded-[2rem] p-6 md:p-8 shadow-xl shadow-slate-200/50 relative overflow-hidden transition-all duration-300">
              <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-blue-500 to-indigo-600" />
              
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 font-extrabold border border-blue-100 text-lg shadow-sm">1</div>
                  <h2 className="text-xl md:text-2xl font-bold text-slate-900">Verifikasi Akun</h2>
                </div>
                {user && <BadgeCheck className="w-8 h-8 text-emerald-500 animate-in zoom-in" />}
              </div>

              {!user ? (
                <form onSubmit={handleCheckPublicId} className="space-y-5">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Public ID AstByte</label>
                    <div className="relative group">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
                      <input
                        type="text"
                        value={publicId}
                        onChange={(e) => setPublicId(e.target.value)}
                        placeholder="Contoh: 3e02d5cb-xxxx-xxxx..."
                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-4 pl-12 pr-4 text-slate-900 placeholder:text-slate-400 focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all outline-none font-mono text-sm md:text-base shadow-inner focus:bg-white"
                      />
                    </div>
                    <p className="mt-2.5 text-xs md:text-sm text-slate-500 flex items-center gap-1.5 font-medium">
                      <Info className="w-4 h-4" /> Masukkan Public ID jika tidak login otomatis.
                    </p>
                  </div>
                  
                  <button
                    type="submit"
                    disabled={loadingCheck || !publicId.trim()}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-2xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-500/30 disabled:opacity-50 disabled:cursor-not-allowed text-base md:text-lg hover:-translate-y-0.5"
                  >
                    {loadingCheck ? <Loader2 className="w-6 h-6 animate-spin" /> : 'Hubungkan Akun'}
                  </button>
                </form>
              ) : (
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 md:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-xl font-bold text-white shadow-md shadow-blue-500/20">
                      {user.full_name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-extrabold text-slate-900 text-lg">{user.full_name}</p>
                      <p className="text-sm text-slate-500 font-medium mt-0.5">{user.email}</p>
                    </div>
                  </div>
                  {/* Tombol Logout/Ganti Akun ini akan men-clear state user saat ini agar muncul form input */}
                  <button 
                    onClick={() => { setUser(null); setToken(null); }}
                    className="px-5 py-2.5 text-sm font-bold text-slate-600 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 hover:text-blue-600 transition-all text-center shadow-sm"
                  >
                    Ganti Akun
                  </button>
                </div>
              )}
            </section>

            {/* Mobile Saldo Badge (Tampil hanya saat user login & di mobile) */}
            {user && (
              <div className="sm:hidden flex items-center justify-between bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
                <div>
                  <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-1">Saldo Anda</p>
                  <p className="text-lg font-black text-slate-900 font-mono">{rupiah(user.balance)}</p>
                </div>
                <div className={`p-2.5 rounded-xl border ${isBalanceSufficient ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-red-50 text-red-600 border-red-100'}`}>
                   {isBalanceSufficient ? <Check className="w-5 h-5"/> : <AlertTriangle className="w-5 h-5"/>}
                </div>
              </div>
            )}

            {/* Step 2: Payment Details */}
            <section className={`bg-white border border-slate-200 rounded-[2rem] p-6 md:p-8 shadow-xl shadow-slate-200/50 relative overflow-hidden transition-all duration-500 ${!user ? 'opacity-40 pointer-events-none grayscale-[0.5]' : 'opacity-100'}`}>
              <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-emerald-400 to-teal-500" />
              
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600 font-extrabold border border-emerald-100 text-lg shadow-sm">2</div>
                <h2 className="text-xl md:text-2xl font-bold text-slate-900">Rincian Pembayaran</h2>
              </div>

              <div className="space-y-6 md:space-y-8">
                
                {/* Product Info Box */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 md:p-6 rounded-2xl bg-slate-50 border border-slate-200 shadow-sm">
                  <div className="flex items-center gap-4">
                    <div className="p-3.5 bg-white rounded-2xl text-blue-600 shadow-sm border border-slate-200">
                      <CreditCard className="w-7 h-7" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-500 mb-1">Berlangganan</p>
                      <p className="text-lg md:text-xl font-extrabold text-slate-900 capitalize flex items-center flex-wrap gap-2">
                        {tierParam} Plan 
                        <span className="text-blue-700 text-xs md:text-sm font-bold px-2.5 py-1 bg-blue-100 rounded-lg border border-blue-200 uppercase">{cycleParam}</span>
                      </p>
                    </div>
                  </div>
                  <div className="sm:text-right border-t sm:border-t-0 border-slate-200 pt-4 sm:pt-0 mt-2 sm:mt-0">
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Harga Dasar</p>
                    <p className="text-xl md:text-2xl font-black text-slate-900">{rupiah(nominalRaw)}</p>
                  </div>
                </div>

                {/* Voucher Input */}
                <div>
                   <label className="block text-sm font-bold text-slate-700 mb-2">Kode Promo / Voucher</label>
                   <div className="relative group">
                      <BadgePercent className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-emerald-500 transition-colors" />
                      <input
                        type="text"
                        value={voucher}
                        onChange={(e) => setVoucher(e.target.value.toUpperCase())}
                        placeholder="Masukkan kode voucher..."
                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-4 pl-12 pr-4 text-slate-900 placeholder:text-slate-400 focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all outline-none font-bold tracking-widest uppercase shadow-inner focus:bg-white"
                      />
                   </div>
                   {/* Voucher Status Indicator */}
                   {disc.valid ? (
                     <div className="mt-3 text-sm font-bold text-emerald-700 flex items-center gap-2 bg-emerald-50 px-4 py-3 rounded-xl w-fit border border-emerald-200 shadow-sm animate-in fade-in">
                       <Check className="w-5 h-5 text-emerald-600" /> {disc.label} berhasil diterapkan! (-{rupiah(disc.amount)})
                     </div>
                   ) : voucher.length > 0 && !disc.valid ? (
                     <p className="mt-3 text-sm font-medium text-red-600 flex items-center gap-1.5"><AlertTriangle className="w-4 h-4"/> {disc.error}</p>
                   ) : null}
                </div>

                {/* Alert Messages */}
                {errorMsg && (
                  <div className="p-4 md:p-5 rounded-2xl bg-red-50 border border-red-200 flex items-start gap-3 animate-in fade-in shadow-sm">
                    <AlertTriangle className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
                    <p className="text-sm md:text-base font-bold text-red-800">{errorMsg}</p>
                  </div>
                )}
                {successMsg && (
                  <div className="p-4 md:p-5 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-start gap-3 animate-in fade-in shadow-sm">
                    <Check className="w-6 h-6 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <p className="text-sm md:text-base font-bold text-emerald-800">{successMsg}</p>
                  </div>
                )}

                {/* Action Button */}
                <button
                  onClick={handlePay}
                  disabled={loadingPay || !isBalanceSufficient}
                  className={`
                    w-full py-4 md:py-5 rounded-2xl font-extrabold text-lg md:text-xl flex items-center justify-center gap-3 transition-all duration-300
                    ${isBalanceSufficient 
                      ? 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-xl shadow-blue-500/30 hover:-translate-y-0.5' 
                      : 'bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200'
                    }
                  `}
                >
                  {loadingPay ? (
                    <>
                      <Loader2 className="w-6 h-6 animate-spin" /> Memproses Transaksi...
                    </>
                  ) : !isBalanceSufficient ? (
                    <>
                      <AlertTriangle className="w-6 h-6" /> Saldo Anda Tidak Cukup
                    </>
                  ) : (
                    <>
                      Bayar Sekarang <ArrowRight className="w-6 h-6" />
                    </>
                  )}
                </button>
              </div>
            </section>

          </div>

          {/* ==========================================
              RIGHT COLUMN: INVOICE / RECEIPT
              ========================================== */}
          <div className="lg:col-span-5 space-y-6 md:mt-0 mt-4">
            <div className="sticky top-8 lg:top-12">
              <div className="bg-white rounded-[2rem] p-0 shadow-2xl shadow-slate-200/80 relative overflow-hidden border border-slate-200 flex flex-col">
                
                {/* Receipt Header Ribbon */}
                <div className="h-3 w-full bg-gradient-to-r from-blue-500 via-indigo-500 to-emerald-500" />
                
                <div className="p-6 md:p-8 flex-1">
                  <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-blue-100 shadow-sm">
                      <Receipt className="w-8 h-8 text-blue-600" />
                    </div>
                    <h3 className="text-2xl font-black tracking-widest text-slate-900 uppercase">Invoice</h3>
                    <p className="text-slate-500 text-sm font-mono font-bold mt-2 bg-slate-50 border border-slate-200 inline-block px-3 py-1 rounded-full">{orderId}</p>
                  </div>

                  {/* Merchant & Order Details */}
                  <div className="space-y-4 border-b-2 border-dashed border-slate-200 pb-6 mb-6">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-500 text-sm font-bold">Merchant</span>
                      <span className="font-extrabold text-slate-900 text-right">{MERCHANT_NAME}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-500 text-sm font-bold">Tanggal</span>
                      <span className="font-extrabold text-slate-900 text-right">
                        {new Date().toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric'})}
                      </span>
                    </div>
                  </div>

                  {/* Math Calculations */}
                  <div className="space-y-4">
                     {/* 1. Base Price */}
                     <div className="flex justify-between items-center text-slate-700 font-bold">
                        <span>Harga Normal</span>
                        <span>{rupiah(nominalRaw)}</span>
                     </div>
                     
                     {/* 2. Discount */}
                     {disc.amount > 0 && (
                       <div className="flex justify-between items-center text-emerald-600 font-bold bg-emerald-50 border border-emerald-100 px-3 py-1.5 -mx-3 rounded-lg">
                          <span>Potongan Voucher</span>
                          <span>-{rupiah(disc.amount)}</span>
                       </div>
                     )}

                     {/* 3. Subtotal (DPP) */}
                     <div className="flex justify-between items-center pt-4 border-t border-slate-100 text-slate-900 font-black text-lg">
                        <span>Subtotal</span>
                        <span>{rupiah(subtotal)}</span>
                     </div>
                     
                     {/* 4. PPN */}
                     <div className="flex justify-between items-center text-slate-500 font-bold text-sm mt-2">
                        <span className="flex items-center gap-1.5">
                          <Plus className="w-3.5 h-3.5" /> PPN (11%)
                          {disc.freePPN && <span className="bg-emerald-100 text-emerald-700 text-[10px] px-2 py-0.5 rounded-md ml-1">GRATIS</span>}
                        </span>
                        <div className="flex items-center gap-2">
                          {disc.freePPN && <span className="line-through text-slate-300 font-medium">{rupiah(rawPpnAmount)}</span>}
                          <span className={disc.freePPN ? "text-emerald-600" : ""}>{rupiah(ppnAmount)}</span>
                        </div>
                     </div>
                  </div>
                </div>

                {/* Grand Total Area (Highlight) */}
                <div className="bg-slate-50 p-6 md:p-8 pt-6 relative border-t border-slate-200">
                   <div className="flex flex-col mb-5">
                      <span className="font-black text-slate-500 uppercase tracking-widest text-xs mb-2">Total Pembayaran</span>
                      <div className="flex justify-between items-end">
                        <span className="text-3xl md:text-4xl font-black text-blue-600 tracking-tight leading-none drop-shadow-sm">
                          {rupiah(grandTotal)}
                        </span>
                        <button onClick={handleCopyTotal} className="p-2.5 bg-white hover:bg-blue-50 rounded-xl text-slate-500 hover:text-blue-600 transition-colors border border-slate-200 hover:border-blue-200 shadow-sm group" title="Salin Nominal">
                           {copied ? <Check className="w-5 h-5 text-emerald-600"/> : <Copy className="w-5 h-5 group-hover:scale-110 transition-transform"/>}
                        </button>
                      </div>
                   </div>

                  <div className="bg-white rounded-xl p-4 flex items-center justify-between border border-slate-200 shadow-sm mt-4">
                    <span className="text-sm font-bold text-slate-600">Metode</span>
                    <div className="flex items-center gap-2 font-bold text-slate-900 bg-blue-50 px-3 py-1.5 rounded-lg border border-blue-100 shadow-sm">
                      <Wallet className="w-4 h-4 text-blue-600" />
                      AxiPay
                    </div>
                  </div>
                </div>

                {/* Receipt Zigzag Bottom Effect */}
                <div className="absolute -bottom-3 left-0 w-full h-6 bg-[#f8fafc] [mask-image:linear-gradient(to_right,transparent_0%,#000_50%,transparent_100%),radial-gradient(circle_at_bottom,transparent_6px,#000_7px)] [mask-size:100%_100%,20px_20px] [mask-composite:intersect]" />
              </div>
              
              {/* Security Badge */}
              <div className="mt-8 flex items-center justify-center gap-2.5 text-slate-500 text-sm font-bold">
                <Shield className="w-5 h-5 text-emerald-500" />
                <span>Transaksi dijamin aman & terenkripsi</span>
              </div>
            </div>
          </div>

        </main>
      </div>
      
      {/* Footer */}
      <footer className="py-8 text-center mt-12 pb-12">
        <p className="text-slate-400 text-sm font-medium">
          &copy; {new Date().getFullYear()} AstByte Technology. All rights reserved.
        </p>
      </footer>
    </div>
  );
}