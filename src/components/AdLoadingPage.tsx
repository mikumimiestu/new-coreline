import { useEffect, useRef, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { CheckCircle, Zap, Clock } from 'lucide-react';


export default function AdLoadingPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(10);
  const hasInjected = useRef(false);


  const nextMaterialId = searchParams.get('next');


  // Timer Countdown dengan Auto-Redirect
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown((prev) => prev - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      // Auto-redirect saat countdown = 0
      if (nextMaterialId) {
        navigate(`/materials/${encodeURIComponent(nextMaterialId)}`);
      } else {
        navigate('/dashboard');
      }
    }
  }, [countdown, navigate, nextMaterialId]);


  // Injeksi Script Adsterra
  useEffect(() => {
    if (!hasInjected.current) {
      const script = document.createElement('script');
      script.src = 'https://pl28467035.effectivegatecpm.com/6f13d85cf0212ab9aa6a4e87a32c0096/invoke.js';
      script.async = true;
      script.setAttribute('data-cfasync', 'false');
      
      const container = document.getElementById('container-6f13d85cf0212ab9aa6a4e87a32c0096');
      if (container) {
        container.appendChild(script);
        hasInjected.current = true;
      }
    }


    // Lock Scroll
    const scrollY = window.scrollY;
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = '100%';
    
    return () => {
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      window.scrollTo(0, scrollY);
    };
  }, []);


  const handleContinue = () => {
    if (nextMaterialId) {
      navigate(`/materials/${encodeURIComponent(nextMaterialId)}`);
    } else {
      navigate('/dashboard');
    }
  };


  // Hitung progress percentage (dari 10 ke 0)
  const progress = (countdown / 10) * 100;
  const circumference = 2 * Math.PI * 80; // radius = 80 (lebih kecil)
  const strokeDashoffset = circumference - (progress / 100) * circumference;


  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 p-4">
      <div className="relative w-full max-w-3xl my-auto">
        
        {/* Circular Countdown Timer - LEBIH KECIL */}
        <div className="flex justify-center items-center mb-6">
          <div className="relative w-48 h-48">
            {/* SVG Circle Background */}
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 180 180">
              {/* Background Circle */}
              <circle
                cx="90"
                cy="90"
                r="80"
                fill="none"
                stroke="rgba(255, 255, 255, 0.1)"
                strokeWidth="12"
              />
              {/* Progress Circle */}
              <circle
                cx="90"
                cy="90"
                r="80"
                fill="none"
                stroke="url(#gradient)"
                strokeWidth="12"
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                className="transition-all duration-1000 ease-linear"
              />
              {/* Gradient Definition */}
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#3b82f6" />
                  <stop offset="50%" stopColor="#8b5cf6" />
                  <stop offset="100%" stopColor="#ec4899" />
                </linearGradient>
              </defs>
            </svg>

            {/* Countdown Number di Tengah Circle */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <Clock className="w-8 h-8 text-white/40 mb-1" />
              <div className="text-5xl font-black text-black drop-shadow-2xl">
                {countdown}
              </div>
              <div className="text-sm font-semibold text-black mt-1 uppercase tracking-wider">
                Detik
              </div>
            </div>

            {/* Pulse Animation Ring */}
            {countdown > 0 && (
              <div className="absolute inset-0 rounded-full border-2 border-white/20 animate-ping"></div>
            )}
          </div>
        </div>


        {/* Status Text */}
        <div className="text-center mb-6">
          <h2 className="text-black text-2xl font-bold mb-2">
            {countdown > 0 ? 'Siapkan Materi Belajar' : 'Mengarahkan...'}
          </h2>
          <p className="text-black-300 text-base">
            {countdown > 0 ? 'Halaman akan otomatis terbuka' : 'Mohon tunggu sebentar'}
          </p>
        </div>


        {/* Adsterra Banner Container */}
        <div className="bg-white dark:bg-slate-800 rounded-3xl overflow-hidden shadow-[0_0_60px_rgba(0,0,0,0.8)] border-2 border-white/20 p-6 min-h-[450px] flex items-center justify-center relative">
          
          {/* Background Placeholder */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-400 p-8 text-center">
            <Zap className="w-16 h-16 mb-4 opacity-20 animate-pulse" />
            <p className="text-sm font-medium opacity-50">Memuat konten sponsor...</p>
          </div>


          {/* KONTAINER IKLAN ADSTERRA */}
          <div 
            id="container-6f13d85cf0212ab9aa6a4e87a32c0096" 
            className="w-full relative z-10 flex justify-center items-center overflow-hidden min-h-[400px]"
          >
            {/* Banner iklan akan muncul di sini */}
          </div>
        </div>


        {/* Tombol Manual Continue */}
        {countdown === 0 && (
          <button
            onClick={handleContinue}
            className="absolute -top-2 -right-2 sm:-right-4 z-60 px-6 py-3 rounded-full bg-green-600 hover:bg-green-700 text-black shadow-2xl transition-all animate-bounce-in border-2 border-white/20 font-black text-sm"
          >
            Lanjut Belajar →
          </button>
        )}


        {/* Support Message */}
        <div className="mt-8 text-center space-y-3">
          <p className="text-black text-lg font-bold drop-shadow-lg">
            🙏 Terima kasih telah mendukung Coreline!
          </p>
          <p className="text-black text-sm">
            Iklan membantu kami menyediakan konten berkualitas secara gratis
          </p>
          <div className="inline-block px-4 py-2 bg-white/10 rounded-full border border-white/10 backdrop-blur-sm">
            <span className="text-xs text-slate-300 uppercase tracking-widest font-bold">Sponsored Content</span>
          </div>
        </div>
      </div>


      <style>{`
        @keyframes bounceIn {
          0% { transform: scale(0); }
          70% { transform: scale(1.1); }
          100% { transform: scale(1); }
        }
        .animate-bounce-in { 
          animation: bounceIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards; 
        }
      `}</style>
    </div>
  );
}
