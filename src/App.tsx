import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import LoginPage from "./components/LoginPage";
import Dashboard from "./components/Dashboard";
import PricingPage from "./components/Pricing";
import MaterialPage from "./pages/MaterialPage";
import ManualQRISPage from "./components/Pay";
import PromoPage from "./components/Promo";
import ComingSoonPage from "./components/ComingSoon";
import AdLoadingPage from './components/AdLoadingPage';

function AppContent() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-gray-300 border-t-blue-600"></div>
          <p className="mt-4 text-gray-600">Memuat...</p>
        </div>
      </div>
    );
  }

  return (
    <Routes>
      {/* Halaman utama: kalau user login → Dashboard, kalau belum → Login */}
      <Route path="/" element={user ? <Dashboard /> : <LoginPage />} />

      {/* Halaman materi, bisa diakses siapa pun */}
      <Route path="/materials/:id" element={<MaterialPage />} />

      {/* Pricing bisa diakses siapa pun */}
      <Route path="/pricing" element={<PricingPage />} />

      {/* Halaman pembayaran manual QRIS (match dengan href dari Pricing: /pay?tier=...&amount=...&cycle=...) */}
      <Route path="/pay" element={<ManualQRISPage />} />

      {/* Halaman promo */}
      <Route path="/promo" element={<PromoPage />} />

      {/* Halaman segera hadir */}
      <Route path="/coming-soon" element={<ComingSoonPage />} />

      {/* Optional placeholder lama (boleh hapus kalau nggak dipakai) */}
      <Route path="/checkout/pro" element={<div className="p-8">Checkout Pro (placeholder)</div>} />
      <Route path="/checkout/prime" element={<div className="p-8">Checkout Prime (placeholder)</div>} />

      {/* Redirect 404 ke / */}
      <Route path="*" element={<Navigate to="/" replace />} />

      <Route path="/ad-loading" element={<AdLoadingPage />} />
    </Routes>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </AuthProvider>
  );
}
