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
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-none backdrop-blur border-2 border-blue-900 border-blue-900 flex items-center justify-center mb-2">
                <Clock className="w-6 h-6 text-white/80" />
              </div>
              <div className="text-4xl font-black bg-blue-600 border-2 border-blue-900 shadow-[4px_4px_0px_#1e3a8a] text-white hover:bg-blue-700 hover:shadow-[6px_6px_0px_#1e3a8a] hover:-translate-y-1 transition-all bg-clip-text text-transparent drop-shadow-[4px_4px_0px_#1e3a8a]">
                {countdown}
              </div>
              <div className="text-xs font-bold text-blue-950 font-bold uppercase tracking-widest mt-1">
                Detik
              </div>
            </div>

            <div className="absolute inset-0 rounded-none bg-gradient-to-r from-blue-400/20 to-purple-400/20 blur-xl opacity-60 animate-pulse" />
          </div>
        </div>

        <div className="text-center mb-8 px-2">
          <h2 className="text-2xl font-black bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 bg-clip-text text-transparent mb-2 drop-shadow-[4px_4px_0px_#1e3a8a]">
            {countdown > 0 ? '📚 Siap Belajar' : '🚀 Loading...'}
          </h2>
          <p className="text-sm text-blue-950 font-bold dark:text-slate-400 font-medium max-w-sm mx-auto leading-tight">
            {countdown > 0 ? 'Auto lanjut dalam' : 'Sedang memproses...'}
          </p>
        </div>

        <div className="bg-white/85 dark:bg-slate-900/85 backdrop-blur-xl rounded-none shadow-[4px_4px_0px_#1e3a8a] border-2 border-blue-900 border-blue-900 dark:border-blue-900 p-6 mb-8 overflow-hidden group">
          <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-blue-500/50 via-purple-500/50 to-pink-500/50 -skew-x-12" />
          
          <div className="relative z-10 flex flex-col items-center justify-center min-h-[280px]">
            <div 
              id="container-6f13d85cf0212ab9aa6a4e87a32c0096" 
              className="w-full h-[240px] relative flex justify-center items-center overflow-hidden rounded-none bg-gradient-to-br from-slate-100/60 to-slate-200/60 dark:from-slate-800/60 dark:to-slate-700/60 border-2 border-blue-900 border-blue-900 dark:border-blue-900 shadow-[4px_4px_0px_#1e3a8a]"
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
              className="group relative px-8 py-3 rounded-none bg-blue-600 border-2 border-blue-900 shadow-[4px_4px_0px_#1e3a8a] text-white hover:bg-blue-700 hover:shadow-[6px_6px_0px_#1e3a8a] hover:-translate-y-1 transition-all text-white font-black text-base shadow-[4px_4px_0px_#1e3a8a] hover:shadow-[6px_6px_0px_#1e3a8a] hover:-translate-y-1 hover:-translate-x-1 transition-all border-2 border-blue-900 border-blue-900 hover:border-blue-900 hover:-translate-y-0.5 transition-all duration-300 flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4 group-hover:scale-110" />
              <span>Lanjut</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1" />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-0 transition-transform duration-700" />
            </button>
          </div>
        )}

        <div className="text-center space-y-2 px-2">
          <div className="inline-flex items-center gap-2 bg-white/80 dark:bg-slate-800/80 backdrop-blur px-6 py-2.5 rounded-none border-2 border-blue-900 border-blue-900 shadow-[4px_4px_0px_#1e3a8a]">
            <CheckCircle className="w-5 h-5 text-emerald-500" />
            <p className="font-bold text-sm text-blue-950 font-bold dark:text-white">Terima kasih! ✨</p>
          </div>
          <div className="px-4 py-1.5 bg-gradient-to-r from-slate-100/70 to-slate-200/70 dark:from-slate-800/70 dark:to-slate-700/70 rounded-none border-2 border-blue-900 border-blue-900 text-xs font-bold text-blue-950 font-bold uppercase tracking-wider">
            Coreline Sponsors
          </div>
        </div>
      </div>
    </div>
  );
}
