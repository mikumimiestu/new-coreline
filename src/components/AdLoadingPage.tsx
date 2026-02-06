// src/components/AdLoadingPage.tsx
import { useEffect, useRef, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { 
  CheckCircle, Zap, Clock, ArrowRight, ShieldCheck,
  Sparkles, Crown 
} from 'lucide-react';

export default function AdLoadingPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(10);
  const hasInjected = useRef(false);

  const nextMaterialId = searchParams.get('next');

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown((prev) => prev - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      if (nextMaterialId) {
        navigate(`/materials/${encodeURIComponent(nextMaterialId)}`);
      } else {
        navigate('/dashboard');
      }
    }
  }, [countdown, navigate, nextMaterialId]);

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

  const progress = (countdown / 10) * 100;
  const circumference = 2 * Math.PI * 65;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="fixed inset-5 mt-40 flex items-center justify-center bg-gradient-to-br from-slate-50/95 via-blue-50/90 to-indigo-50/90 dark:from-slate-950/98 dark:via-slate-900/95 dark:to-slate-900/95 p-4">
      
      <div className="relative w-full max-w-md">
        
        <div className="flex justify-center mb-8">
          <div className="relative w-40 h-40 group">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 160 160">
              <circle
                cx="80"
                cy="80"
                r="65"
                fill="none"
                stroke="rgba(255,255,255,0.15)"
                strokeWidth="8"
              />
              <circle
                cx="80"
                cy="80"
                r="65"
                fill="none"
                stroke="url(#gradient)"
                strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                className="transition-all duration-1000 ease-linear"
              />
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="rgb(59 130 246)" />
                  <stop offset="50%" stopColor="rgb(139 92 246)" />
                  <stop offset="100%" stopColor="rgb(236 72 153)" />
                </linearGradient>
              </defs>
            </svg>

            <div className="absolute inset-0 flex flex-col items-center justify-center px-2">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-xl backdrop-blur border border-white/20 flex items-center justify-center mb-2">
                <Clock className="w-6 h-6 text-white/80" />
              </div>
              <div className="text-4xl font-black bg-gradient-to-r from-slate-900 to-slate-900 bg-clip-text text-transparent drop-shadow-xl">
                {countdown}
              </div>
              <div className="text-xs font-bold text-slate-700 uppercase tracking-widest mt-1">
                Detik
              </div>
            </div>

            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400/20 to-purple-400/20 blur-xl opacity-60 animate-pulse" />
          </div>
        </div>

        <div className="text-center mb-8 px-2">
          <h2 className="text-2xl font-black bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 bg-clip-text text-transparent mb-2 drop-shadow-lg">
            {countdown > 0 ? '📚 Siap Belajar' : '🚀 Loading...'}
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 font-medium max-w-sm mx-auto leading-tight">
            {countdown > 0 ? 'Auto lanjut dalam' : 'Sedang memproses...'}
          </p>
        </div>

        <div className="bg-white/85 dark:bg-slate-900/85 backdrop-blur-xl rounded-2xl shadow-2xl border border-slate-200/60 dark:border-slate-800/60 p-6 mb-8 overflow-hidden group">
          <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-blue-500/50 via-purple-500/50 to-pink-500/50 -skew-x-12" />
          
          <div className="relative z-10 flex flex-col items-center justify-center min-h-[280px]">
            <div 
              id="container-6f13d85cf0212ab9aa6a4e87a32c0096" 
              className="w-full h-[240px] relative flex justify-center items-center overflow-hidden rounded-xl bg-gradient-to-br from-slate-100/60 to-slate-200/60 dark:from-slate-800/60 dark:to-slate-700/60 border border-slate-200/40 dark:border-slate-700/40 shadow-sm"
            />
            
            <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-slate-400 dark:text-slate-500 pointer-events-none">
              <Zap className="w-12 h-12 mb-3 opacity-30 animate-pulse" />
              <p className="text-sm font-medium opacity-60">Loading sponsor...</p>
            </div>
          </div>
        </div>

        {countdown === 0 && (
          <div className="flex justify-center mb-6">
            <button
              onClick={handleContinue}
              className="group relative px-8 py-3 rounded-2xl bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-black text-base shadow-2xl hover:shadow-3xl border border-white/20 hover:border-white/40 hover:-translate-y-0.5 transition-all duration-300 flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4 group-hover:scale-110" />
              <span>Lanjut</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1" />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-0 transition-transform duration-700" />
            </button>
          </div>
        )}

        <div className="text-center space-y-2 px-2">
          <div className="inline-flex items-center gap-2 bg-white/80 dark:bg-slate-800/80 backdrop-blur px-6 py-2.5 rounded-2xl border border-slate-200/50 shadow-lg">
            <CheckCircle className="w-5 h-5 text-emerald-500" />
            <p className="font-bold text-sm text-slate-900 dark:text-white">Terima kasih! ✨</p>
          </div>
          <div className="px-4 py-1.5 bg-gradient-to-r from-slate-100/70 to-slate-200/70 dark:from-slate-800/70 dark:to-slate-700/70 rounded-xl border border-slate-200/40 text-xs font-bold text-slate-600 uppercase tracking-wider">
            Coreline Sponsors
          </div>
        </div>
      </div>
    </div>
  );
}
