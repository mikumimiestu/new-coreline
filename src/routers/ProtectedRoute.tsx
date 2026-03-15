// src/routes/ProtectedRoute.tsx
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requirePremium?: boolean; // Tambahan prop untuk proteksi halaman berbayar
}

export default function ProtectedRoute({ children, requirePremium = false }: ProtectedRouteProps) {
  const { user, loading } = useAuth();
  const location = useLocation();

  // 1. Tampilkan loading spinner saat mengecek sesi
  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-slate-200 border-t-blue-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  // 2. Jika user belum login, lempar ke halaman login
  if (!user) {
    // Simpan lokasi asal agar setelah login bisa di-redirect balik (opsional)
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // 3. Jika route ini khusus premium, cek tipe langganan user
  if (requirePremium) {
    const planType = (user as any).subscription_type?.toLowerCase().trim() || 'free';
    const isPremium = ['pro', 'plus', 'ultra'].includes(planType);

    if (!isPremium) {
      // Jika user masih gratis, lempar ke halaman pricing/dashboard
      return <Navigate to="/pricing" replace />;
    }
  }

  // 4. Jika lolos semua pengecekan, render halamannya
  return <>{children}</>;
}