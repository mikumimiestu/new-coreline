// src/pages/ManualQRISPage.tsx
// Pay New Coreline by Xenza ID — Versi lengkap + Virtual Account (BCA/BNI) Coming Soon.
//
// Update:
// - Tambah tab "VA" (Virtual Account) — status Coming Soon, tapi ditandai "Instant".
// - VA hanya BCA & BNI.
// - Tampilkan nomor VA (contoh) + langkah pembayaran.
// - WhatsApp confirm auto menyesuaikan (menyebut Virtual Account + nomor VA contoh jika ada).
//
// Catatan:
// - Channel Coming Soon tetap bisa dipilih untuk preview UI (tidak memproses transaksi nyata).
// - “Total Transfer” tetap satu-satunya yang bisa di-copy.
// - Anti-inspect deterrent tetap aktif.

import { useMemo, useState, useEffect } from "react";
import {
  Copy, QrCode, Shield, Phone, BadgeCheck, ArrowRight,
  BadgePercent, CreditCard, Info as InfoIcon, AlertTriangle, Zap
} from "lucide-react";

type Tier = "student" | "pro" | "plus";
type Cycle = "monthly" | "yearly";
type MethodTab = "qris" | "bank" | "va" | "ewallet" | "retail";

const MERCHANT_NAME = "Xenza ID";
const NMID = "ID1023244802444";
const WHATSAPP = "6285183209494";
const QR_IMAGE_PATH = "/qr.jpg";

// Default prices (fallback if amount not provided)
const DEFAULT_PRICE: Record<Tier, { monthly: number; yearly: number }> = {
  student: { monthly: 0, yearly: 0 },
  pro: { monthly: 25000, yearly: 240000 },
  plus: { monthly: 149000, yearly: 1440000 },
};

// Demo vouchers
const VOUCHERS: Record<string, { type: "percent" | "fixed"; value: number; note?: string }> = {
  CORELINESATU: { type: "percent", value: 5, note: "Diskon 5%" },
  ASTBYTEJAYA25: { type: "percent", value: 15, note: "Diskon 15%" },
  HARUSCORELINE: { type: "fixed", value: 70000, note: "Potongan Rp70.000" },
};

const rupiah = (n: number) =>
  new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 })
    .format(Math.max(0, Math.round(n)));

function uniqueFromPayload(amount: number, seed: number) {
  if (!amount) return 0;
  const base = (amount * 97 + seed) % 900;
  return Math.floor(base) + 100; // 100..999
}

function makeOrderId() {
  const d = new Date();
  const ts = [d.getFullYear(), d.getMonth() + 1, d.getDate()].map((v) => String(v).padStart(2, "0")).join("");
  const hms = [d.getHours(), d.getMinutes(), d.getSeconds()].map((v) => String(v).padStart(2, "0")).join("");
  return `ORD-${ts}-${hms}`;
}

function calcDiscount(nominal: number, code: string) {
  if (!code) return { valid: false, amount: 0, label: "" };
  const v = VOUCHERS[code.toUpperCase().trim()];
  if (!v) return { valid: false, amount: 0, label: "" };
  let disc = v.type === "percent" ? Math.floor((nominal * v.value) / 100) : v.value;
  disc = Math.min(disc, nominal);
  const label = v.note || (v.type === "percent" ? `${v.value}%` : rupiah(v.value));
  return { valid: true, amount: disc, label };
}

// Logo sets (local files or text fallback)
type BrandLogo = { id: string; name: string; src?: string; comingSoon?: boolean };

const BANK_LOGOS: BrandLogo[] = [
  { id: "bca", name: "BCA", src: "/logos/bca.png" },
  { id: "bni", name: "BNI", src: "/logos/bni.png" },
  { id: "mandiri", name: "Mandiri", src: "/logos/mandiri.png" },
  { id: "bri", name: "BRI", src: "/logos/bri.png", comingSoon: true  },
  { id: "uob", name: "UOB", src: "/logos/uob.png", comingSoon: true  },
  { id: "cimb", name: "CIMB", src: "/logos/cimb.png", comingSoon: true  },
  { id: "ocbcnisp", name: "OCBC NISP", src: "/logos/ocbc.png", comingSoon: true },
];

const VA_LOGOS: BrandLogo[] = [
  // VA hanya BCA & BNI, status masih Coming Soon (tapi ditandai Instant)
  { id: "bca", name: "BCA VA", src: "/logos/bca.png", comingSoon: true },
  { id: "bni", name: "BNI VA", src: "/logos/bni.png", comingSoon: true },
];

const EWALLET_LOGOS: BrandLogo[] = [
  { id: "gopay", name: "GoPay", src: "/logos/gopay.png" },
  { id: "dana", name: "DANA", src: "/logos/dana.png" },
  { id: "shopeepay", name: "ShopeePay", src: "/logos/spay.png" },
  { id: "linkaja", name: "LinkAja", src: "/logos/linkaja.png", comingSoon: true },
  { id: "ovo", name: "OVO", src: "/logos/ovo.png", comingSoon: true },
];

const RETAIL_LOGOS: BrandLogo[] = [
  { id: "indomaret", name: "Indomaret", src: "/logos/indomaret.png", comingSoon: true },
  { id: "alfamart", name: "Alfamart", src: "/logos/alfamart.png", comingSoon: true },
];

// Build WhatsApp confirmation link with proper wording
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
    p.methodTab === "qris"
      ? "QRIS"
      : p.methodTab === "bank"
      ? `transfer bank${p.brandName ? ` (${p.brandName})` : ""}`
      : p.methodTab === "va"
      ? `virtual account${p.brandName ? ` (${p.brandName})` : ""}`
      : p.methodTab === "ewallet"
      ? `e-wallet${p.brandName ? ` (${p.brandName})` : ""}`
      : `retail${p.brandName ? ` (${p.brandName})` : ""}`;

  const header =
    p.methodTab === "qris"
      ? "Saya sudah melakukan pembayaran via QRIS."
      : p.methodTab === "va"
      ? "Saya akan membayar via Virtual Account (instant)."
      : `Saya mau bayar lewat ${methodText}.`;

  const extraRetail =
    p.methodTab === "retail"
      ? (p.comingSoon
          ? "\n\nCatatan: Channel retail ini masih COMING SOON. Mohon panduan lebih lanjut/alternatif pembayaran."
          : p.retailCode
          ? `\n• Kode Retail: ${p.retailCode}\nSaya akan menunjukkan kode ini ke kasir.`
          : "")
      : "";

  const extraVA =
    p.methodTab === "va"
      ? `\n• Nomor VA: ${p.vaNumber || "-"}\n• Sifat: INSTANT (Coming Soon)`
      : "";

  const text = `Halo Admin Xenza 👋
${header}

• Order ID : ${p.orderId}
• Paket    : ${p.tier.toUpperCase()} (${p.cycle})
• Merchant : ${MERCHANT_NAME}
• NMID     : ${NMID}
• Nominal  : ${rupiah(p.nominal)}
• Diskon   : ${p.discount > 0 ? "-" + rupiah(p.discount) : "-"}
• Kode unik: ${p.unique}
• Total TF : ${rupiah(p.total)}
${p.voucher ? `• Voucher  : ${p.voucher.toUpperCase()}` : ""}${extraVA}${extraRetail}

Saya akan kirim bukti transfer (screenshot) setelah ini. Terima kasih 🙏`;
  return `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(text)}`;
};

export default function ManualQRISPage() {
  // Set browser tab title
  useEffect(() => {
    document.title = "Pay | New Coreline by Xenza ID";
  }, []);

  // Anti-inspect deterrent (not foolproof)
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (
        e.key === "F12" ||
        (e.ctrlKey && e.shiftKey && ["I", "J", "C"].includes(e.key.toUpperCase())) ||
        (e.ctrlKey && e.key.toUpperCase() === "U")
      ) {
        e.preventDefault();
        alert("Inspect element dinonaktifkan.");
      }
    };
    const onCtx = (e: MouseEvent) => e.preventDefault();
    document.addEventListener("keydown", onKey);
    document.addEventListener("contextmenu", onCtx);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("contextmenu", onCtx);
    };
  }, []);

  const params = new URLSearchParams(typeof window !== "undefined" ? window.location.search : "");
  const tierParam = (params.get("tier") as Tier) || "student";
  const cycleParam = (params.get("cycle") as Cycle) || "monthly";
  const amountParam = Number(params.get("amount") || NaN);

  const nominalRaw = useMemo(() => {
    const defaults = DEFAULT_PRICE[tierParam];
    return Number.isFinite(amountParam) ? Math.max(0, Math.round(amountParam)) : defaults[cycleParam];
  }, [tierParam, cycleParam, amountParam]);

  const orderId = useMemo(() => makeOrderId(), []);
  const [voucher, setVoucher] = useState("");
  const [methodTab, setMethodTab] = useState<MethodTab>("qris");
  const [selectedBrand, setSelectedBrand] = useState<string>();

  const disc = useMemo(() => calcDiscount(nominalRaw, voucher), [nominalRaw, voucher]);
  const nominalAfterDisc = Math.max(0, nominalRaw - disc.amount);
  const unique = useMemo(() => uniqueFromPayload(nominalAfterDisc, Date.now() % 1e6), [nominalAfterDisc]);
  const total = nominalAfterDisc + unique;

  const brandFromSets =
    methodTab === "bank"
      ? BANK_LOGOS.find((b) => b.id === selectedBrand)
      : methodTab === "va"
      ? VA_LOGOS.find((v) => v.id === selectedBrand)
      : methodTab === "ewallet"
      ? EWALLET_LOGOS.find((e) => e.id === selectedBrand)
      : methodTab === "retail"
      ? RETAIL_LOGOS.find((r) => r.id === selectedBrand)
      : undefined;

  const brandName = brandFromSets?.name;
  const brandComingSoon = !!brandFromSets?.comingSoon;

  // Retail: generate example payment code (dummy) for UX preview
  const retailCode = useMemo(() => {
    if (methodTab !== "retail" || !selectedBrand) return "";
    const seed = orderId.replace(/\D/g, "").slice(-6);
    // 12-digit demo code
    const base = `${seed}${(unique % 1000).toString().padStart(3, "0")}${(nominalAfterDisc % 1000)
      .toString()
      .padStart(3, "0")}`;
    return base.slice(0, 12);
  }, [methodTab, selectedBrand, orderId, unique, nominalAfterDisc]);

  // VA: generate example VA number (dummy) for UX preview
  const vaNumber = useMemo(() => {
    if (methodTab !== "va" || !selectedBrand) return "";
    // Contoh prefix (dummy): BCA=3901, BNI=8060
    const prefix = selectedBrand === "bca" ? "3901" : "8060";
    const seed = orderId.replace(/\D/g, "").slice(-10);
    // Bentuk nomor VA contoh 16 digit: prefix (4) + seed (10) + unique (3) dipotong 16
    const body = `${prefix}${seed}${(unique % 1000).toString().padStart(3, "0")}`;
    return body.slice(0, 16);
  }, [methodTab, selectedBrand, orderId, unique]);

  const onCopyTotal = async () => {
    try {
      await navigator.clipboard.writeText(String(total));
      alert("Total transfer disalin: " + rupiah(total));
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
    comingSoon: brandComingSoon || methodTab === "retail" || methodTab === "va",
    retailCode: methodTab === "retail" ? retailCode : undefined,
    vaNumber: methodTab === "va" ? vaNumber : undefined,
  });

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900 text-slate-800 dark:text-slate-100 select-none">
      <main className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 max-w-5xl">
        {/* Header */}
        <div className="mb-6 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-sky-200/70 dark:border-cyan-800/40 bg-white/80 dark:bg-slate-900/60 px-3 py-1 text-xs font-semibold text-sky-700 dark:text-cyan-300">
            <BadgeCheck className="w-4 h-4" /> Pay New Coreline by Xenza ID
          </div>
          <h1 className="mt-3 text-2xl sm:text-4xl font-extrabold tracking-tight">Pembayaran Aman & Terverifikasi</h1>
          <p className="mt-2 text-slate-600 dark:text-slate-300">
            Pilih metode (QRIS / Bank / <b>VA</b> / E-Wallet / Retail), lakukan pembayaran sesuai <b>Total Transfer</b>, lalu konfirmasi via WhatsApp.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Left: Summary */}
          <div className="rounded-2xl ring-1 ring-black/5 dark:ring-white/10 bg-white/90 dark:bg-slate-900/70 p-5 sm:p-6">
            {/* Merchant */}
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs uppercase text-slate-500">Merchant</div>
                <div className="text-lg font-bold">{MERCHANT_NAME}</div>
                <div className="text-xs text-slate-500">NMID: {NMID}</div>
              </div>
              <div className="grid place-items-center rounded-xl bg-slate-100 dark:bg-slate-800 p-2">
                <QrCode className="w-6 h-6 text-sky-600 dark:text-cyan-400" />
              </div>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3">
              <StatItem label="Paket" value={tierParam.toUpperCase()} />
              <StatItem label="Siklus" value={cycleParam === "yearly" ? "Tahunan" : "Bulanan"} />
            </div>

            {/* Voucher */}
            <div className="mt-4">
              <label className="text-sm text-slate-600 dark:text-slate-300 flex items-center gap-2">
                <BadgePercent className="w-4 h-4" /> Kode Voucher (opsional)
              </label>
              <div className="mt-1 flex rounded-xl border border-slate-200 dark:border-slate-700 bg-white/70 dark:bg-slate-900 overflow-hidden">
                <input
                  type="text"
                  className="w-full bg-transparent px-4 py-3 outline-none uppercase tracking-wider"
                  value={voucher}
                  onChange={(e) => setVoucher(e.target.value)}
                />
                <div className="px-3 py-3 text-xs text-slate-500 min-w-36 text-right">
                  {disc.valid ? (
                    <span className="inline-flex items-center gap-1 rounded-lg bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300 px-2 py-1">
                      {disc.label} −{rupiah(disc.amount)}
                    </span>
                  ) : voucher.trim() ? (
                    <span className="text-amber-600">Kode tidak valid</span>
                  ) : (
                    <span className="text-slate-400">Opsional</span>
                  )}
                </div>
              </div>
            </div>

            {/* Amount summary */}
            <div className="mt-5 divide-y divide-slate-200 dark:divide-slate-800 rounded-xl overflow-hidden ring-1 ring-black/5 dark:ring-white/10">
              <Row label="Order ID" value={orderId} />
              <Row label="Nominal" value={rupiah(nominalRaw)} />
              {disc.valid && disc.amount > 0 && <Row label="Diskon Voucher" value={`- ${rupiah(disc.amount)} (${disc.label})`} />}
              <Row label="Nominal Setelah Diskon" value={rupiah(Math.max(0, nominalRaw - disc.amount))} />
              <Row label="Kode Unik (3 digit)" value={String(unique)} />
              {/* TOTAL — emphasize + only one with copy */}
              <div className="flex items-center justify-between gap-3 px-4 py-5 bg-emerald-50/80 dark:bg-emerald-900/30 ring-1 ring-emerald-200 dark:ring-emerald-800">
                <div className="text-base font-bold text-emerald-800 dark:text-emerald-200">Total Transfer</div>
                <div className="flex items-center gap-3">
                  <div className="text-2xl sm:text-3xl font-extrabold text-emerald-700 dark:text-emerald-300">{rupiah(total)}</div>
                  <button
                    onClick={onCopyTotal}
                    className="inline-flex items-center gap-1 rounded-lg bg-emerald-600 text-white px-3 py-1.5 text-xs font-semibold hover:bg-emerald-700"
                    title="Salin total"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    Salin
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-4 flex items-center gap-2 text-[12px] text-slate-500">
              <Shield className="w-4 h-4" /> Pastikan nominal & kode unik sesuai sebelum transfer.
            </div>
          </div>

          {/* Right: Method & content */}
          <div className="rounded-2xl ring-1 ring-black/5 dark:ring-white/10 bg-white/90 dark:bg-slate-900/70 p-5 sm:p-6">
            <div className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-200">
              <CreditCard className="w-4 h-4" /> Pilih Metode Pembayaran
            </div>
            <div className="mt-3 inline-flex rounded-xl border border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900 p-1">
              {(["qris", "bank", "va", "ewallet", "retail"] as MethodTab[]).map((tab) => (
                <button
                  key={tab}
                  onClick={() => {
                    setMethodTab(tab);
                    setSelectedBrand(undefined);
                  }}
                  className={`px-4 py-2 rounded-lg text-sm font-semibold transition ${
                    methodTab === tab ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900" : "text-slate-700 dark:text-slate-200"
                  }`}
                >
                  {tab === "qris" ? "QRIS" : tab === "bank" ? "Bank" : tab === "va" ? "VA" : tab === "ewallet" ? "E-Wallet" : "Retail"}
                </button>
              ))}
            </div>

            {/* Content per method */}
            {methodTab === "qris" ? (
              <div className="mt-4">
                <div className="text-sm text-slate-500 mb-2">Scan QR berikut di aplikasi e-wallet/bank kamu:</div>
                <div className="aspect-square rounded-2xl bg-slate-50 dark:bg-slate-800 grid place-items-center overflow-hidden">
                  <img src={QR_IMAGE_PATH} alt="QRIS Xenza" className="w-full h-full object-contain p-4" />
                </div>
              </div>
            ) : methodTab === "bank" ? (
              <LogoGrid
                title="Pilih Bank:"
                items={BANK_LOGOS}
                selectedId={selectedBrand}
                onSelect={(id) => setSelectedBrand(id)}
              />
            ) : methodTab === "va" ? (
              <>
                <LogoGrid
                  title="Pilih Virtual Account (Instant):"
                  items={VA_LOGOS}
                  selectedId={selectedBrand}
                  onSelect={(id) => setSelectedBrand(id)}
                />
                {/* VA number preview */}
                <div className="mt-4 rounded-2xl ring-1 ring-black/5 dark:ring-white/10 overflow-hidden">
                  <div className="px-4 py-3 bg-slate-100 dark:bg-slate-800/60 text-sm font-semibold flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span>Nomor Virtual Account (contoh)</span>
                      <span className="inline-flex items-center gap-1 text-emerald-700 dark:text-emerald-300 text-[11px]">
                        <Zap className="w-3.5 h-3.5" /> Instant
                      </span>
                    </div>
                    <span className="inline-flex items-center gap-1 text-amber-700 dark:text-amber-300">
                      <AlertTriangle className="w-4 h-4" /> Coming Soon
                    </span>
                  </div>
                  <div className="px-4 py-5 bg-white/90 dark:bg-slate-900/70">
                    {selectedBrand ? (
                      <>
                        <div className="text-2xl font-mono font-bold tracking-widest text-slate-900 dark:text-white">
                          {vaNumber || "—"}
                        </div>
                        <div className="mt-3 text-xs text-slate-500">
                          * Nomor di atas adalah <b>contoh</b>. Nomor asli akan tampil saat channel aktif.
                        </div>
                        <div className="mt-4">
                          <div className="text-sm font-semibold">Cara Bayar VA {brandName} (nanti saat aktif):</div>
                          <ol className="mt-2 text-sm text-slate-700 dark:text-slate-300 list-decimal pl-5 space-y-1.5">
                            <li>Buka m-banking/i-banking {brandName?.replace(" VA", "")} kamu.</li>
                            <li>Pilih menu <b>Virtual Account</b> dan masukkan nomor VA di atas.</li>
                            <li>Pastikan nominal <b>{rupiah(total)}</b> dan nama penerima sesuai.</li>
                            <li>Konfirmasi & bayar. Simpan bukti pembayaran.</li>
                            <li>Kirim bukti via WhatsApp untuk verifikasi cepat.</li>
                          </ol>
                        </div>
                      </>
                    ) : (
                      <div className="text-sm text-slate-500">Pilih Virtual Account terlebih dahulu.</div>
                    )}
                  </div>
                </div>
              </>
            ) : methodTab === "ewallet" ? (
              <LogoGrid
                title="Pilih E-Wallet:"
                items={EWALLET_LOGOS}
                selectedId={selectedBrand}
                onSelect={(id) => setSelectedBrand(id)}
              />
            ) : (
              <>
                <LogoGrid
                  title="Pilih Gerai Retail:"
                  items={RETAIL_LOGOS}
                  selectedId={selectedBrand}
                  onSelect={(id) => setSelectedBrand(id)}
                />

                {/* Retail payment code & steps (coming soon preview) */}
                <div className="mt-4 rounded-2xl ring-1 ring-black/5 dark:ring-white/10 overflow-hidden">
                  <div className="px-4 py-3 bg-slate-100 dark:bg-slate-800/60 text-sm font-semibold flex items-center justify-between">
                    <span>Kode Pembayaran (contoh)</span>
                    <span className="inline-flex items-center gap-1 text-amber-700 dark:text-amber-300">
                      <AlertTriangle className="w-4 h-4" /> Coming Soon
                    </span>
                  </div>
                  <div className="px-4 py-5 bg-white/90 dark:bg-slate-900/70">
                    {selectedBrand ? (
                      <>
                        <div className="text-2xl font-mono font-bold tracking-widest text-slate-900 dark:text-white">
                          {retailCode || "—"}
                        </div>
                        <div className="mt-3 text-xs text-slate-500">
                          * Kode di atas adalah <b>contoh</b>. Kode asli akan tampil saat channel aktif.
                        </div>
                        <div className="mt-4">
                          <div className="text-sm font-semibold">Cara Bayar di {brandName} (nanti saat aktif):</div>
                          <ol className="mt-2 text-sm text-slate-700 dark:text-slate-300 list-decimal pl-5 space-y-1.5">
                            <li>Tunjukkan <b>kode pembayaran</b> ini ke kasir {brandName}.</li>
                            <li>Sebutkan nominal total: <b>{rupiah(total)}</b>.</li>
                            <li>Selesaikan pembayaran dan simpan <b>struk</b>.</li>
                            <li>Kirimkan foto struk via WhatsApp untuk verifikasi.</li>
                          </ol>
                        </div>
                      </>
                    ) : (
                      <div className="text-sm text-slate-500">Pilih gerai retail terlebih dahulu.</div>
                    )}
                  </div>
                </div>
              </>
            )}

            {/* WHY MANUAL CONFIRMATION */}
            <div className="mt-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-800/40 p-4">
              <div className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-200">
                <InfoIcon className="w-4 h-4" />
                Kenapa konfirmasi pembayaran <i>manual</i>?
              </div>
              <p className="mt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                Untuk keamanan & akurasi. Beberapa kanal (bank/e-wallet/retail) tidak selalu mengirim notifikasi otomatis yang konsisten.
                Dengan bukti transfer/struk, tim kami bisa:
              </p>
              <ul className="mt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300 list-disc pl-5 space-y-1">
                <li>Mencocokkan <b>nominal + kode unik</b> agar tidak salah input.</li>
                <li>Menghindari <b>fraud/chargeback</b> & transaksi ganda.</li>
                <li>Menyesuaikan perbedaan waktu <b>settlement</b> antar kanal.</li>
                <li>Memastikan aktivasi akses tepat ke akun yang benar.</li>
              </ul>
            </div>

            {/* WA Confirm */}
            <a
              href={waLink}
              target="_blank"
              rel="noreferrer"
              className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-500 text-white px-4 py-3 text-sm font-semibold hover:bg-emerald-600"
            >
              <Phone className="w-4 h-4" />
              Konfirmasi via WhatsApp
            </a>

            <div className="mt-3 text-[12px] text-slate-500 flex items-center justify-between">
              <span>* Pembayaran ini <b>manual</b>. Tim kami akan verifikasi bukti, lalu mengaktifkan akses Anda.</span>
              <a href="/pricing" className="inline-flex items-center gap-1 text-sky-600 dark:text-cyan-300 hover:underline">
                Kembali ke Pricing <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>

        {/* Fallback note if amount missing */}
        {!Number.isFinite(Number(params.get("amount"))) && (
          <div className="mt-6 rounded-xl bg-amber-50 text-amber-800 dark:bg-amber-900/20 dark:text-amber-200 p-4 text-sm">
            Nominal tidak terdeteksi dari link. Sistem memakai <b>harga default</b> paket {tierParam.toUpperCase()} ({cycleParam}).
            Untuk nominal spesifik, pastikan link dari pricing menyertakan <code className="mx-1 px-1 rounded bg-black/5">amount</code>.
          </div>
        )}
      </main>

      {/* Footer attribution */}
      <footer className="text-center text-xs sm:text-sm text-slate-500 dark:text-slate-400 py-6 border-t border-slate-200 dark:border-slate-800">
        Sponsored by <b>XenzaDigital</b> — halaman pembayaran ini dibuat oleh <b>XenzaDigital (Xenza ID)</b>.
      </footer>
    </div>
  );
}

function StatItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg bg-slate-50 dark:bg-slate-800/60 p-3">
      <div className="text-xs text-slate-500">{label}</div>
      <div className="text-sm font-semibold">{value}</div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-3 px-4 py-3 bg-white/70 dark:bg-slate-900">
      <div className="text-sm text-slate-600 dark:text-slate-300">{label}</div>
      <div className="text-sm font-semibold text-slate-800 dark:text-slate-100">{value}</div>
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
  items: { id: string; name: string; src?: string; comingSoon?: boolean }[];
  selectedId?: string;
  onSelect: (id: string) => void;
}) {
  return (
    <div className="mt-4">
      <div className="text-sm text-slate-600 dark:text-slate-300 mb-2">{title}</div>
      <div className="grid grid-cols-3 gap-3">
        {items.map((it) => {
          const isSel = selectedId === it.id;
          return (
            <button
              key={it.id}
              onClick={() => onSelect(it.id)}
              className={`relative w-full h-full grid place-items-center p-3 rounded-xl border transition ${
                isSel
                  ? "border-sky-400 ring-2 ring-sky-200 dark:ring-cyan-800 bg-white dark:bg-slate-800"
                  : "border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 hover:opacity-90"
              }`}
              title={it.comingSoon ? "Coming Soon" : it.name}
            >
              {it.src ? (
                <img src={it.src} alt={it.name} className="h-8 object-contain" />
              ) : (
                <span className="text-sm font-semibold">{it.name}</span>
              )}
              {it.comingSoon && (
                <span className="absolute top-2 right-2 text-[10px] font-semibold rounded bg-amber-100 text-amber-700 px-2 py-0.5">
                  Coming Soon
                </span>
              )}
            </button>
          );
        })}
      </div>
      <div className="mt-2 text-xs text-slate-500">
        {selectedId ? (
          <>
            Dipilih: <b>{items.find((x) => x.id === selectedId)?.name}</b>
          </>
        ) : (
          <>Silakan pilih salah satu metode pembayaran di atas.</>
        )}
      </div>
    </div>
  );
}
