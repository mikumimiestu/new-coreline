import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";

// Components & Pages
import LoginPage from "./components/LoginPage";
import Dashboard from "./components/Dashboard";
import PricingPage from "./components/Pricing";
import MaterialPage from "./pages/MaterialPage";
import ManualQRISPage from "./components/Pay";
import PromoPage from "./components/Promo";
import ComingSoonPage from "./components/ComingSoon";
import AdLoadingPage from './components/AdLoadingPage';
import OfflineMentoringPage from "./pages/OfflineMentoringPage";
import PriorityMemberPage from "./pages/PriorityMemberPage";
import TutorialPage from "./pages/TutorialPage";

// Import Quiz & Exercise Pages yang baru dibuat
import QuizPage from "./pages/QuizPage";
import ExercisePage from "./pages/ExercisePage";

// Import ProtectedRoute yang baru dibuat
import ProtectedRoute from "./routers/ProtectedRoute";

function AppContent() {
  const { user, loading } = useAuth();

  // Loading Screen yang disesuaikan dengan Light Theme
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-4">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-slate-200 border-t-blue-600 shadow-sm"></div>
          <p className="text-sm font-bold text-slate-500 animate-pulse">Memuat aplikasi...</p>
        </div>
      </div>
    );
  }

  return (
    <Routes>
      {/* Halaman utama: kalau user login → Dashboard, kalau belum → Login */}
      <Route path="/" element={user ? <Dashboard /> : <LoginPage />} />

      {/* Halaman materi: Diproteksi KHUSUS untuk user Premium (Pro, Plus, Ultra) */}
      <Route 
        path="/materials/:id" 
        element={
          <ProtectedRoute requirePremium={true}>
            <MaterialPage />
          </ProtectedRoute>
        } 
      />

      {/* Halaman Kuis: Diproteksi KHUSUS untuk user Premium */}
      <Route 
        path="/quiz/:id" 
        element={
          <ProtectedRoute requirePremium={true}>
            <QuizPage />
          </ProtectedRoute>
        } 
      />

      {/* Halaman Latihan Praktik: Diproteksi KHUSUS untuk user Premium */}
      <Route 
        path="/exercise/:id" 
        element={
          <ProtectedRoute requirePremium={true}>
            <ExercisePage />
          </ProtectedRoute>
        } 
      />
      
      {/* Pricing bisa diakses siapa pun */}
      <Route path="/pricing" element={<PricingPage />} />

      {/* Halaman pembayaran manual QRIS */}
      <Route 
        path="/pay" 
        element={
          <ProtectedRoute>
            <ManualQRISPage />
          </ProtectedRoute>
        } 
      />

      {/* Halaman promo */}
      <Route path="/promo" element={<PromoPage />} />

      {/* Halaman offline mentor */}
      <Route 
        path="/offline-mentoring" 
        element={
          <ProtectedRoute>
            <OfflineMentoringPage />
          </ProtectedRoute>
        } 
      />

      {/* Halaman prioritas member */}
      <Route 
        path="/priority-member" 
        element={
          <ProtectedRoute requirePremium={true}>
            <PriorityMemberPage />
          </ProtectedRoute>
        } 
      />

      {/* Halaman Tutorial */}
      <Route path="/tutorial" element={<TutorialPage />} />
      
      {/* Halaman segera hadir */}
      <Route path="/coming-soon" element={<ComingSoonPage />} />

      {/* Halaman AdLoading untuk user gratisan */}
      <Route 
        path="/ad-loading" 
        element={
          <ProtectedRoute>
            <AdLoadingPage />
          </ProtectedRoute>
        } 
      />

      {/* Optional placeholder lama (boleh hapus kalau nggak dipakai) */}
      <Route path="/checkout/pro" element={<div className="p-8 text-slate-800">Checkout Pro (placeholder)</div>} />
      <Route path="/checkout/prime" element={<div className="p-8 text-slate-800">Checkout Prime (placeholder)</div>} />

      {/* Redirect 404 ke / */}
      <Route path="*" element={<Navigate to="/" replace />} />
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