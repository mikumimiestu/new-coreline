// src/pages/ManualQRISPage.tsx
import { useMemo, useState, useEffect } from 'react';
import {
  Copy,
  QrCode,
  Shield,
  Phone,
  BadgeCheck,
  ArrowRight,
  BadgePercent,
  CreditCard,
  Info as InfoIcon,
  AlertTriangle,
  Zap,
  Check,
} from 'lucide-react';

type Tier = 'student' | 'pro' | 'plus';
type Cycle = 'monthly' | 'yearly';
type MethodTab = 'qris' | 'bank' | 'va' | 'ewallet' | 'retail';

const MERCHANT_NAME = 'Xenza ID';
const NMID = 'ID1023244802444';
const WHATSAPP = '6285183209494';
const QR_IMAGE_PATH = '/qr.jpg';

const DEFAULT_PRICE: Record<Tier, { monthly: number; yearly: number }> = {
  student: { monthly: 0, yearly: 0 },
  pro: { monthly: 25000, yearly: 240000 },
  plus: { monthly: 149000, yearly: 1440000 },
};

const VOUCHERS: Record<
  string,
  { type: 'percent' | 'fixed'; value: number; note?: string }
> = {
  CORELINESATU: { type: 'percent', value: 5, note: 'Diskon 5%' },
  ASTBYTEJAYA25: { type: 'percent', value: 15, note: 'Diskon 15%' },
  HARUSCORELINE: { type: 'fixed', value: 70000, note: 'Potongan Rp70.000' },
};

const rupiah = (n: number) =>
  new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(Math.max(0, Math.round(n)));

function uniqueFromPayload(amount: number, seed: number) {
  if (!amount) return 0;
  const base = (amount * 97 + seed) % 900;
  return Math.floor(base) + 100;
}

function makeOrderId() {
  const d = new Date();
  const ts = [d.getFullYear(), d.getMonth() + 1, d.getDate()]
    .map((v) => String(v).padStart(2, '0'))
    .join('');
  const hms = [d.getHours(), d.getMinutes(), d.getSeconds()]
    .map((v) => String(v).padStart(2, '0'))
    .join('');
  return `ORD-${ts}-${hms}`;
}

function calcDiscount(nominal: number, code: string) {
  if (!code) return { valid: false, amount: 0, label: '' };
  const v = VOUCHERS[code.toUpperCase().trim()];
  if (!v) return { valid: false, amount: 0, label: '' };
  let disc =
    v.type === 'percent' ? Math.floor((nominal * v.value) / 100) : v.value;
  disc = Math.min(disc, nominal);
  const label =
    v.note || (v.type === 'percent' ? `${v.value}%` : rupiah(v.value));
  return { valid: true, amount: disc, label };
}

type BrandLogo = {
  id: string;
  name: string;
  src?: string;
  comingSoon?: boolean;
};

const BANK_LOGOS: BrandLogo[] = [
  { id: 'bca', name: 'BCA', src: '/logos/bca.png' },
  { id: 'bni', name: 'BNI', src: '/logos/bni.png' },
  { id: 'mandiri', name: 'Mandiri', src: '/logos/mandiri.png' },
  { id: 'bri', name: 'BRI', src: '/logos/bri.png', comingSoon: true },
  { id: 'uob', name: 'UOB', src: '/logos/uob.png', comingSoon: true },
  { id: 'cimb', name: 'CIMB', src: '/logos/cimb.png', comingSoon: true },
  {
    id: 'ocbcnisp',
    name: 'OCBC NISP',
    src: '/logos/ocbc.png',
    comingSoon: true,
  },
];

const VA_LOGOS: BrandLogo[] = [
  { id: 'bca', name: 'BCA VA', src: '/logos/bca.png', comingSoon: true },
  { id: 'bni', name: 'BNI VA', src: '/logos/bni.png', comingSoon: true },
];

const EWALLET_LOGOS: BrandLogo[] = [
  { id: 'gopay', name: 'GoPay', src: '/logos/gopay.png' },
  { id: 'dana', name: 'DANA', src: '/logos/dana.png' },
  { id: 'shopeepay', name: 'ShopeePay', src: '/logos/spay.png' },
  { id: 'linkaja', name: 'LinkAja', src: '/logos/linkaja.png', comingSoon: true },
  { id: 'ovo', name: 'OVO', src: '/logos/ovo.png', comingSoon: true },
];

const RETAIL_LOGOS: BrandLogo[] = [
  {
    id: 'indomaret',
    name: 'Indomaret',
    src: '/logos/indomaret.png',
    comingSoon: true,
  },
  {
    id: 'alfamart',
    name: 'Alfamart',
    src: '/logos/alfamart.png',
    comingSoon: true,
  },
];

const makeWaLink = (p: {
  orderId: string;
  nominal: number;
  discount: number;
  unique: number;
  total: number;
  tier: Tier;
  cycle: Cycle;
  methodTab: MethodTab;
  brandName?: string;
  voucher?: string;
  comingSoon?: boolean;
  retailCode?: string;
  vaNumber?: string;
}) => {
  let methodText =
    p.methodTab === 'qris'
      ? 'QRIS'
      : p.methodTab === 'bank'
      ? `transfer bank${p.brandName ? ` (${p.brandName})` : ''}`
      : p.methodTab === 'va'
      ? `virtual account${p.brandName ? ` (${p.brandName})` : ''}`
      : p.methodTab === 'ewallet'
      ? `e-wallet${p.brandName ? ` (${p.brandName})` : ''}`
      : `retail${p.brandName ? ` (${p.brandName})` : ''}`;

  const header =
    p.methodTab === 'qris'
      ? 'Saya sudah melakukan pembayaran via QRIS.'
      : p.methodTab === 'va'
      ? 'Saya akan membayar via Virtual Account (instant).'
      : `Saya mau bayar lewat ${methodText}.`;

  const extraRetail =
    p.methodTab === 'retail'
      ? p.comingSoon
        ? '\n\nCatatan: Channel retail ini masih COMING SOON. Mohon panduan lebih lanjut/alternatif pembayaran.'
        : p.retailCode
        ? `\n• Kode Retail: ${p.retailCode}\nSaya akan menunjukkan kode ini ke kasir.`
        : ''
      : '';

  const extraVA =
    p.methodTab === 'va'
      ? `\n• Nomor VA: ${p.vaNumber || '-'}\n• Sifat: INSTANT (Coming Soon)`
      : '';

  const text = `Halo Admin Xenza 👋
${header}

• Order ID : ${p.orderId}
• Paket    : ${p.tier.toUpperCase()} (${p.cycle})
• Merchant : ${MERCHANT_NAME}
• NMID     : ${NMID}
• Nominal  : ${rupiah(p.nominal)}
• Diskon   : ${p.discount > 0 ? '-' + rupiah(p.discount) : '-'}
• Kode unik: ${p.unique}
• Total TF : ${rupiah(p.total)}
${p.voucher ? `• Voucher  : ${p.voucher.toUpperCase()}` : ''}${extraVA}${extraRetail}

Saya akan kirim bukti transfer (screenshot) setelah ini. Terima kasih 🙏`;
  return `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(text)}`;
};

export default function ManualQRISPage() {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    document.title = 'Pay | New Coreline by Xenza ID';
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (
        e.key === 'F12' ||
        (e.ctrlKey &&
          e.shiftKey &&
          ['I', 'J', 'C'].includes(e.key.toUpperCase())) ||
        (e.ctrlKey && e.key.toUpperCase() === 'U')
      ) {
        e.preventDefault();
        alert('Inspect element dinonaktifkan.');
      }
    };
    const onCtx = (e: MouseEvent) => e.preventDefault();
    document.addEventListener('keydown', onKey);
    document.addEventListener('contextmenu', onCtx);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('contextmenu', onCtx);
    };
  }, []);

  const params = new URLSearchParams(
    typeof window !== 'undefined' ? window.location.search : ''
  );
  const tierParam = (params.get('tier') as Tier) || 'student';
  const cycleParam = (params.get('cycle') as Cycle) || 'monthly';
  const amountParam = Number(params.get('amount') || NaN);

  const nominalRaw = useMemo(() => {
    const defaults = DEFAULT_PRICE[tierParam];
    return Number.isFinite(amountParam)
      ? Math.max(0, Math.round(amountParam))
      : defaults[cycleParam];
  }, [tierParam, cycleParam, amountParam]);

  const orderId = useMemo(() => makeOrderId(), []);
  const [voucher, setVoucher] = useState('');
  const [methodTab, setMethodTab] = useState<MethodTab>('qris');
  const [selectedBrand, setSelectedBrand] = useState<string>();

  const disc = useMemo(
    () => calcDiscount(nominalRaw, voucher),
    [nominalRaw, voucher]
  );
  const nominalAfterDisc = Math.max(0, nominalRaw - disc.amount);
  const unique = useMemo(
    () => uniqueFromPayload(nominalAfterDisc, Date.now() % 1e6),
    [nominalAfterDisc]
  );
  const total = nominalAfterDisc + unique;

  const brandFromSets =
    methodTab === 'bank'
      ? BANK_LOGOS.find((b) => b.id === selectedBrand)
      : methodTab === 'va'
      ? VA_LOGOS.find((v) => v.id === selectedBrand)
      : methodTab === 'ewallet'
      ? EWALLET_LOGOS.find((e) => e.id === selectedBrand)
      : methodTab === 'retail'
      ? RETAIL_LOGOS.find((r) => r.id === selectedBrand)
      : undefined;

  const brandName = brandFromSets?.name;
  const brandComingSoon = !!brandFromSets?.comingSoon;

  const retailCode = useMemo(() => {
    if (methodTab !== 'retail' || !selectedBrand) return '';
    const seed = orderId.replace(/\D/g, '').slice(-6);
    const base = `${seed}${(unique % 1000).toString().padStart(3, '0')}${(
      nominalAfterDisc % 1000
    )
      .toString()
      .padStart(3, '0')}`;
    return base.slice(0, 12);
  }, [methodTab, selectedBrand, orderId, unique, nominalAfterDisc]);

  const vaNumber = useMemo(() => {
    if (methodTab !== 'va' || !selectedBrand) return '';
    const prefix = selectedBrand === 'bca' ? '3901' : '8060';
    const seed = orderId.replace(/\D/g, '').slice(-10);
    const body = `${prefix}${seed}${(unique % 1000)
      .toString()
      .padStart(3, '0')}`;
    return body.slice(0, 16);
  }, [methodTab, selectedBrand, orderId, unique]);

  const onCopyTotal = async () => {
    try {
      await navigator.clipboard.writeText(String(total));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  };

  const waLink = makeWaLink({
    orderId,
    nominal: nominalRaw,
    discount: disc.amount,
    unique,
    total,
    tier: tierParam,
    cycle: cycleParam,
    methodTab,
    brandName,
    voucher,
    comingSoon: brandComingSoon || methodTab === 'retail' || methodTab === 'va',
    retailCode: methodTab === 'retail' ? retailCode : undefined,
    vaNumber: methodTab === 'va' ? vaNumber : undefined,
  });

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900 text-slate-800 dark:text-slate-100 select-none">
      <main className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 max-w-6xl">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-4 py-2 text-xs font-medium text-gray-700 dark:text-slate-300 shadow-sm">
            <BadgeCheck className="w-4 h-4 text-blue-600 dark:text-cyan-400" />
            Pay New Coreline by Xenza ID
          </div>
          <h1 className="mt-6 text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white">
            Pembayaran Aman & Terverifikasi
          </h1>
          <p className="mt-3 text-base text-gray-600 dark:text-slate-300 max-w-2xl mx-auto">
            Pilih metode pembayaran, lakukan transfer sesuai total yang tertera, lalu
            konfirmasi via WhatsApp
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left: Summary */}
          <div className="rounded-2xl border border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-8 shadow-sm">
            {/* Merchant */}
            <div className="flex items-center justify-between pb-6 border-b border-gray-200 dark:border-slate-800">
              <div>
                <div className="text-xs uppercase font-medium text-gray-500 dark:text-slate-400 mb-1">
                  Merchant
                </div>
                <div className="text-xl font-bold text-gray-900 dark:text-white">
                  {MERCHANT_NAME}
                </div>
                <div className="text-xs text-gray-500 dark:text-slate-400 font-mono mt-0.5">
                  NMID: {NMID}
                </div>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gray-100 dark:bg-slate-800">
                <QrCode className="w-6 h-6 text-gray-700 dark:text-slate-300" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 py-6 border-b border-gray-200 dark:border-slate-800">
              <StatItem label="Paket" value={tierParam.toUpperCase()} />
              <StatItem
                label="Siklus"
                value={cycleParam === 'yearly' ? 'Tahunan' : 'Bulanan'}
              />
            </div>

            {/* Voucher */}
            <div className="py-6 border-b border-gray-200 dark:border-slate-800">
              <label className="text-sm font-medium text-gray-700 dark:text-slate-200 flex items-center gap-2 mb-3">
                <BadgePercent className="w-4 h-4 text-gray-500 dark:text-slate-400" />
                Kode Voucher (opsional)
              </label>
              <div className="flex rounded-lg border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-900 overflow-hidden focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/20 dark:focus-within:border-cyan-400 dark:focus-within:ring-cyan-400/20 transition-all">
                <input
                  type="text"
                  className="flex-1 bg-transparent px-4 py-2.5 outline-none uppercase tracking-wider text-sm font-medium text-gray-900 dark:text-white placeholder:text-gray-400"
                  placeholder="MASUKKAN KODE"
                  value={voucher}
                  onChange={(e) => setVoucher(e.target.value)}
                />
                <div className="px-4 py-2.5 min-w-32 text-right flex items-center justify-end border-l border-gray-200 dark:border-slate-700">
                  {disc.valid ? (
                    <span className="inline-flex items-center gap-1 rounded-md bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300 px-2 py-1 text-xs font-semibold">
                      <Check className="w-3 h-3" />
                      {disc.label}
                    </span>
                  ) : voucher.trim() ? (
                    <span className="text-xs font-medium text-amber-600 dark:text-amber-400">
                      Tidak valid
                    </span>
                  ) : (
                    <span className="text-xs text-gray-400">-</span>
                  )}
                </div>
              </div>
            </div>

            {/* Amount summary */}
            <div className="pt-6">
              <div className="space-y-3 mb-4">
                <Row label="Order ID" value={orderId} mono />
                <Row label="Nominal" value={rupiah(nominalRaw)} />
                {disc.valid && disc.amount > 0 && (
                  <Row
                    label="Diskon Voucher"
                    value={`- ${rupiah(disc.amount)}`}
                    highlight
                  />
                )}
                <Row
                  label="Setelah Diskon"
                  value={rupiah(Math.max(0, nominalRaw - disc.amount))}
                />
                <Row label="Kode Unik" value={String(unique)} mono />
              </div>

              {/* TOTAL */}
              <div className="mt-4 pt-4 border-t-2 border-gray-200 dark:border-slate-700">
                <div className="flex items-center justify-between gap-4 mb-2">
                  <div className="text-sm font-semibold text-gray-700 dark:text-slate-300">
                    Total Transfer
                  </div>
                  <button
                    onClick={onCopyTotal}
                    className="inline-flex items-center gap-1.5 bg-gray-900 dark:bg-white text-white dark:text-gray-900 px-3 py-1.5 rounded-lg text-xs font-semibold hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
                    title="Salin total"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        Tersalin
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        Salin
                      </>
                    )}
                  </button>
                </div>
                <div className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white">
                  {rupiah(total)}
                </div>
              </div>

              <div className="mt-4 flex items-start gap-2 text-xs text-gray-500 dark:text-slate-400">
                <Shield className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <span>
                  Pastikan nominal dan kode unik sesuai sebelum melakukan transfer
                </span>
              </div>
            </div>
          </div>

          {/* Right: Method & content */}
          <div className="rounded-2xl border border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-8 shadow-sm">
            <div className="flex items-center gap-2 text-base font-semibold text-gray-900 dark:text-white mb-6">
              <CreditCard className="w-5 h-5 text-gray-600 dark:text-slate-400" />
              Pilih Metode Pembayaran
            </div>

            <div className="inline-flex w-full rounded-lg border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-900 p-1 mb-6">
              {(['qris', 'bank', 'va', 'ewallet', 'retail'] as MethodTab[]).map(
                (tab) => (
                  <button
                    key={tab}
                    onClick={() => {
                      setMethodTab(tab);
                      setSelectedBrand(undefined);
                    }}
                    className={`flex-1 px-3 py-2 rounded-md text-xs font-semibold transition-colors ${
                      methodTab === tab
                        ? 'bg-white dark:bg-slate-800 text-gray-900 dark:text-white shadow-sm'
                        : 'text-gray-600 dark:text-slate-400 hover:text-gray-900 dark:hover:text-white'
                    }`}
                  >
                    {tab === 'qris'
                      ? 'QRIS'
                      : tab === 'bank'
                      ? 'Bank'
                      : tab === 'va'
                      ? 'VA'
                      : tab === 'ewallet'
                      ? 'E-Wallet'
                      : 'Retail'}
                  </button>
                )
              )}
            </div>

            {/* Content per method */}
            <div className="mb-6">
              {methodTab === 'qris' ? (
                <div>
                  <div className="text-sm font-medium text-gray-600 dark:text-slate-300 mb-4">
                    Scan QR code berikut dengan aplikasi e-wallet atau mobile banking
                  </div>
                  <div className="aspect-square rounded-xl bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 grid place-items-center overflow-hidden">
                    <img
                      src={QR_IMAGE_PATH}
                      alt="QRIS Xenza"
                      className="w-full h-full object-contain p-6"
                    />
                  </div>
                </div>
              ) : methodTab === 'bank' ? (
                <LogoGrid
                  title="Pilih Bank"
                  items={BANK_LOGOS}
                  selectedId={selectedBrand}
                  onSelect={(id) => setSelectedBrand(id)}
                />
              ) : methodTab === 'va' ? (
                <>
                  <LogoGrid
                    title="Pilih Virtual Account"
                    items={VA_LOGOS}
                    selectedId={selectedBrand}
                    onSelect={(id) => setSelectedBrand(id)}
                  />
                  <div className="mt-6 rounded-xl border border-gray-200 dark:border-slate-800 overflow-hidden">
                    <div className="px-4 py-3 bg-gray-50 dark:bg-slate-800 flex items-center justify-between border-b border-gray-200 dark:border-slate-700">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-gray-900 dark:text-white">
                          Nomor Virtual Account
                        </span>
                        <span className="inline-flex items-center gap-1 text-emerald-700 dark:text-emerald-400 text-xs font-semibold px-2 py-0.5 rounded-md bg-emerald-100 dark:bg-emerald-900/30">
                          <Zap className="w-3 h-3" />
                          Instant
                        </span>
                      </div>
                      <span className="inline-flex items-center gap-1 text-amber-700 dark:text-amber-400 text-xs font-semibold px-2 py-0.5 rounded-md bg-amber-100 dark:bg-amber-900/30">
                        <AlertTriangle className="w-3 h-3" />
                        Coming Soon
                      </span>
                    </div>
                    <div className="px-4 py-5 bg-white dark:bg-slate-900">
                      {selectedBrand ? (
                        <>
                          <div className="text-2xl font-mono font-bold tracking-widest text-gray-900 dark:text-white mb-3">
                            {vaNumber || '—'}
                          </div>
                          <div className="text-xs text-gray-500 dark:text-slate-400 mb-5">
                            * Nomor di atas adalah contoh. Nomor asli akan tampil saat
                            channel aktif.
                          </div>
                          <div>
                            <div className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
                              Cara Pembayaran via {brandName}
                            </div>
                            <ol className="text-sm text-gray-600 dark:text-slate-300 list-decimal pl-5 space-y-2">
                              <li>
                                Buka mobile banking atau internet banking{' '}
                                {brandName?.replace(' VA', '')}
                              </li>
                              <li>Pilih menu Virtual Account</li>
                              <li>Masukkan nomor VA di atas</li>
                              <li>
                                Pastikan nominal {rupiah(total)} dan nama penerima sesuai
                              </li>
                              <li>Konfirmasi pembayaran dan simpan bukti</li>
                              <li>Kirim bukti via WhatsApp untuk verifikasi</li>
                            </ol>
                          </div>
                        </>
                      ) : (
                        <div className="text-center py-8 text-sm text-gray-500 dark:text-slate-400">
                          Pilih Virtual Account terlebih dahulu
                        </div>
                      )}
                    </div>
                  </div>
                </>
              ) : methodTab === 'ewallet' ? (
                <LogoGrid
                  title="Pilih E-Wallet"
                  items={EWALLET_LOGOS}
                  selectedId={selectedBrand}
                  onSelect={(id) => setSelectedBrand(id)}
                />
              ) : (
                <>
                  <LogoGrid
                    title="Pilih Gerai Retail"
                    items={RETAIL_LOGOS}
                    selectedId={selectedBrand}
                    onSelect={(id) => setSelectedBrand(id)}
                  />
                  <div className="mt-6 rounded-xl border border-gray-200 dark:border-slate-800 overflow-hidden">
                    <div className="px-4 py-3 bg-gray-50 dark:bg-slate-800 flex items-center justify-between border-b border-gray-200 dark:border-slate-700">
                      <span className="text-sm font-semibold text-gray-900 dark:text-white">
                        Kode Pembayaran
                      </span>
                      <span className="inline-flex items-center gap-1 text-amber-700 dark:text-amber-400 text-xs font-semibold px-2 py-0.5 rounded-md bg-amber-100 dark:bg-amber-900/30">
                        <AlertTriangle className="w-3 h-3" />
                        Coming Soon
                      </span>
                    </div>
                    <div className="px-4 py-5 bg-white dark:bg-slate-900">
                      {selectedBrand ? (
                        <>
                          <div className="text-2xl font-mono font-bold tracking-widest text-gray-900 dark:text-white mb-3">
                            {retailCode || '—'}
                          </div>
                          <div className="text-xs text-gray-500 dark:text-slate-400 mb-5">
                            * Kode di atas adalah contoh. Kode asli akan tampil saat
                            channel aktif.
                          </div>
                          <div>
                            <div className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
                              Cara Pembayaran di {brandName}
                            </div>
                            <ol className="text-sm text-gray-600 dark:text-slate-300 list-decimal pl-5 space-y-2">
                              <li>Datang ke gerai {brandName} terdekat</li>
                              <li>Tunjukkan kode pembayaran ini ke kasir</li>
                              <li>Sebutkan nominal total: {rupiah(total)}</li>
                              <li>Selesaikan pembayaran dan simpan struk</li>
                              <li>Kirimkan foto struk via WhatsApp untuk verifikasi</li>
                            </ol>
                          </div>
                        </>
                      ) : (
                        <div className="text-center py-8 text-sm text-gray-500 dark:text-slate-400">
                          Pilih gerai retail terlebih dahulu
                        </div>
                      )}
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* WHY MANUAL */}
            <div className="mb-6 rounded-lg border border-blue-200 dark:border-cyan-800/40 bg-blue-50 dark:bg-blue-900/10 p-4">
              <div className="flex items-start gap-2 text-sm font-medium text-gray-900 dark:text-white mb-2">
                <InfoIcon className="w-4 h-4 flex-shrink-0 mt-0.5 text-blue-600 dark:text-cyan-400" />
                Mengapa konfirmasi manual?
              </div>
              <p className="text-sm text-gray-600 dark:text-slate-300 mb-3">
                Untuk memastikan keamanan dan akurasi transaksi, kami memverifikasi
                setiap pembayaran secara manual karena:
              </p>
              <ul className="text-sm text-gray-600 dark:text-slate-300 list-disc pl-5 space-y-1">
                <li>Mencocokkan nominal dan kode unik dengan tepat</li>
                <li>Mencegah fraud dan transaksi ganda</li>
                <li>Menyesuaikan waktu settlement antar channel</li>
                <li>Memastikan aktivasi akses ke akun yang benar</li>
              </ul>
            </div>

            {/* WA Confirm */}
            <a
              href={waLink}
              target="_blank"
              rel="noreferrer"
              className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-emerald-600 text-white px-4 py-3 text-sm font-semibold hover:bg-emerald-700 transition-colors shadow-sm"
            >
              <Phone className="w-4 h-4" />
              Konfirmasi via WhatsApp
            </a>

            <div className="mt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs text-gray-500 dark:text-slate-400">
              <span>
                Pembayaran manual. Tim kami akan verifikasi bukti transfer Anda.
              </span>
              <a
                href="/pricing"
                className="inline-flex items-center gap-1 text-blue-600 dark:text-cyan-400 hover:text-blue-700 dark:hover:text-cyan-300 font-medium transition-colors"
              >
                Kembali
                <ArrowRight className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>

        {/* Fallback note */}
        {!Number.isFinite(Number(params.get('amount'))) && (
          <div className="mt-8 rounded-lg border border-amber-200 dark:border-amber-800/40 bg-amber-50 dark:bg-amber-900/10 text-amber-800 dark:text-amber-200 p-4 text-sm">
            <div className="flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 flex-shrink-0 mt-0.5" />
              <div>
                Nominal tidak terdeteksi dari URL. Sistem menggunakan harga default
                paket <strong>{tierParam.toUpperCase()}</strong> (
                <strong>{cycleParam}</strong>). Untuk nominal spesifik, pastikan link
                dari halaman pricing menyertakan parameter{' '}
                <code className="mx-1 px-1.5 py-0.5 rounded bg-black/10 dark:bg-white/10 font-mono text-xs">
                  amount
                </code>
                .
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="text-center text-sm text-gray-500 dark:text-slate-400 py-8 border-t border-gray-200 dark:border-slate-800">
        Powered by <strong>XenzaDigital</strong> — Halaman pembayaran ini dibuat
        oleh XenzaDigital (Xenza ID)
      </footer>
    </div>
  );
}

function StatItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg bg-gray-50 dark:bg-slate-800 p-3">
      <div className="text-xs font-medium text-gray-500 dark:text-slate-400 mb-1">
        {label}
      </div>
      <div className="text-sm font-semibold text-gray-900 dark:text-white">
        {value}
      </div>
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
      <div className="text-sm text-gray-600 dark:text-slate-300">{label}</div>
      <div
        className={`text-sm font-semibold ${
          highlight
            ? 'text-emerald-700 dark:text-emerald-400'
            : 'text-gray-900 dark:text-white'
        } ${mono ? 'font-mono tracking-wider' : ''}`}
      >
        {value}
      </div>
    </div>
  );
}

function LogoGrid({
  title,
  items,
  selectedId,
  onSelect,
}: {
  title: string;
  items: BrandLogo[];
  selectedId?: string;
  onSelect: (id: string) => void;
}) {
  return (
    <div>
      <div className="text-sm font-medium text-gray-700 dark:text-slate-200 mb-4">
        {title}
      </div>
      <div className="grid grid-cols-3 gap-3">
        {items.map((it) => {
          const isSel = selectedId === it.id;
          return (
            <button
              key={it.id}
              onClick={() => onSelect(it.id)}
              className={`relative aspect-square rounded-lg border-2 transition-all ${
                isSel
                  ? 'border-blue-600 dark:border-cyan-400 bg-blue-50 dark:bg-blue-900/20'
                  : 'border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-gray-300 dark:hover:border-slate-600'
              }`}
              title={it.comingSoon ? 'Coming Soon' : it.name}
            >
              <div className="absolute inset-0 flex items-center justify-center p-3">
                {it.src ? (
                  <img
                    src={it.src}
                    alt={it.name}
                    className="h-full w-full object-contain"
                  />
                ) : (
                  <span className="text-xs font-semibold text-gray-700 dark:text-slate-200">
                    {it.name}
                  </span>
                )}
              </div>
              {it.comingSoon && (
                <span className="absolute top-1.5 right-1.5 text-[9px] font-semibold rounded bg-amber-500 text-white px-1.5 py-0.5">
                  Soon
                </span>
              )}
              {isSel && !it.comingSoon && (
                <div className="absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 dark:bg-cyan-400">
                  <Check className="h-3 w-3 text-white dark:text-gray-900" />
                </div>
              )}
            </button>
          );
        })}
      </div>
      <div className="mt-3 text-xs text-gray-500 dark:text-slate-400">
        {selectedId ? (
          <>
            Terpilih: <strong>{items.find((x) => x.id === selectedId)?.name}</strong>
          </>
        ) : (
          <>Silakan pilih salah satu metode pembayaran</>
        )}
      </div>
    </div>
  );
}
