import { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import type { LearningMaterial } from '../types/learning';
import { decodeId, encodeId } from '../utils/hashId'; // IMPORT encodeId DI SINI

// Import Data
import { MOCK_MATERIALS as OTHER_MATERIALS } from '../data/otherData';
import { MOCK_MATERIALS as PYTHON_MATERIALS } from '../data/pythonData';
import { MOCK_MATERIALS as GO_MATERIALS } from '../data/golangData';
import { MOCK_MATERIALS as MYSQL_MATERIALS } from '../data/mysqlData';
import { MOCK_MATERIALS as TS_MATERIAL } from '../data/tsData';
import { MOCK_MATERIALS as JS_MATERIAL } from '../data/jsData';
import { MOCK_MATERIALS as PSQL_MATERIAL } from '../data/posgresData';
import { MOCK_MATERIALS as RB_MATERIAL } from '../data/rubyData';
import { MOCK_MATERIALS as REACTJS_MATERIAL } from '../data/reactjsData';
import { MOCK_MATERIALS as NEXTJS_MATERIAL } from '../data/nextjsData';
import { MOCK_MATERIALS as NEXTJSEND_MATERIAL } from '../data/nextjsendData';

// Icons & Components
import { 
  ArrowLeft, BookOpen, ChevronRight, ChevronLeft, 
  Target, CheckCircle, XCircle, Home,
  Loader2, AlertTriangle
} from 'lucide-react';
import MaterialContent from '../components/MaterialContent';

const API_BASE = 'https://authx.astbyte.com';

// Gabungkan semua materi untuk pencarian ID
const ALL_MATERIALS: LearningMaterial[] = [
  ...OTHER_MATERIALS, ...PYTHON_MATERIALS, 
  ...GO_MATERIALS, ...MYSQL_MATERIALS, ...TS_MATERIAL, 
  ...JS_MATERIAL, ...PSQL_MATERIAL, ...RB_MATERIAL,
  ...REACTJS_MATERIAL, ...NEXTJS_MATERIAL, ...NEXTJSEND_MATERIAL
];

type Plan = 'free' | 'pro' | 'plus';

export default function MaterialPage() {
  const { id: rawId } = useParams<{ id: string }>(); // Ini dapet ID yang acak
  const id = decodeId(rawId || ''); // Ini balikin ID jadi "ts-01"
  const navigate = useNavigate();
  const { user } = useAuth();

  // State
  const [progress, setProgress] = useState(0);
  const [isCompleting, setIsCompleting] = useState(false);
  const [showScreenshotWarning, setShowScreenshotWarning] = useState(false);
  const [isWindowBlurred, setIsWindowBlurred] = useState(false);

  const material = ALL_MATERIALS.find((m) => m.id === id);

  // Helper
  const getPlanFromUser = (u: any): Plan => {
    const type = (u?.subscription_type ?? 'free').toString().toLowerCase().trim();
    if (type === 'plus') return 'plus';
    if (type === 'pro') return 'pro';
    return 'free';
  };

  const plan = getPlanFromUser(user);
  const isPremium = ['pro', 'plus'].includes(plan);

  // Scroll to top on change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  // Proteksi Screenshot & Blur kalau kehilangan fokus
  useEffect(() => {
    // 1. Deteksi Tombol PrintScreen
    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === 'PrintScreen') {
        setShowScreenshotWarning(true);
        navigator.clipboard.writeText("Screenshot tidak diizinkan di platform ini.");
        setTimeout(() => setShowScreenshotWarning(false), 3000);
      }
    };

    // 2. Layar Hitam saat Window Kehilangan Fokus (Snipping tool / pindah tab)
    const handleBlur = () => setIsWindowBlurred(true);
    const handleFocus = () => setIsWindowBlurred(false);
    const handleVisibilityChange = () => {
      setIsWindowBlurred(document.hidden);
    };

    window.addEventListener('keyup', handleKeyUp);
    window.addEventListener('blur', handleBlur);
    window.addEventListener('focus', handleFocus);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      window.removeEventListener('keyup', handleKeyUp);
      window.removeEventListener('blur', handleBlur);
      window.removeEventListener('focus', handleFocus);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  // Fetch Progress
  useEffect(() => {
    if (!material || !user || !isPremium) return;

    const fetchProgress = async () => {
      let token = localStorage.getItem('astbyte_token') || (user as any).token;
      if (!token) return;

      try {
        const response = await fetch(`${API_BASE}/api/learning/progress`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });

        if (response.ok) {
          const result = await response.json();
          const dbData = result.data || {};
          setProgress(dbData[material.id] || 0);
        }
      } catch (error) {
        console.error("Error fetching progress:", error);
      }
    };

    fetchProgress();
  }, [material, user, isPremium]);

  // Handle Mark Complete
  const handleMarkComplete = async () => {
    if (!material || !user || !isPremium) return;

    let token = localStorage.getItem('astbyte_token') || (user as any).token;
    if (!token) {
      alert("Sesi habis, silakan login ulang.");
      return;
    }

    setIsCompleting(true);
    const newProgress = progress === 100 ? 0 : 100;

    try {
      const response = await fetch(`${API_BASE}/api/learning/progress`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          material_id: material.id,
          progress: newProgress
        })
      });

      if (response.ok) {
        setProgress(newProgress);
      } else {
        throw new Error("Gagal update database");
      }
    } catch (err) {
      console.error("Gagal sync:", err);
      alert("Gagal menyimpan progress.");
    } finally {
      setIsCompleting(false);
    }
  };

  // Not Found State
  if (!material) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 p-6 relative overflow-hidden">
        <div className="max-w-md w-full bg-white border border-slate-200 rounded-3xl p-10 text-center shadow-xl relative z-10">
          <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6 text-red-500">
            <XCircle className="w-8 h-8" />
          </div>
          <h1 className="text-2xl font-black text-slate-900 mb-3">Materi Tidak Ditemukan</h1>
          <p className="text-slate-500 mb-8 font-medium">Materi yang kamu cari tidak tersedia atau sudah dihapus.</p>
          <button
            onClick={() => navigate('/dashboard')}
            className="w-full px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold transition-all shadow-md"
          >
            Kembali ke Dashboard
          </button>
        </div>
      </div>
    );
  }

  // Navigation Logic
  const userType = (user as any)?.user_type || 'student';
  const sameLangMaterials = ALL_MATERIALS
    .filter(m => m.language === material.language && m.user_type === userType)
    .sort((a, b) => a.order - b.order);
  
  const currentIndex = sameLangMaterials.findIndex(m => m.id === material.id);
  const prevMaterial = currentIndex > 0 ? sameLangMaterials[currentIndex - 1] : null;
  const nextMaterial = currentIndex < sameLangMaterials.length - 1 ? sameLangMaterials[currentIndex + 1] : null;

  // UI Helpers
  const isCompleted = progress === 100;
  const levelBadgeColor = {
    beginner: 'bg-emerald-50 text-emerald-600 border-emerald-200',
    intermediate: 'bg-amber-50 text-amber-600 border-amber-200',
    advanced: 'bg-rose-50 text-rose-600 border-rose-200',
    expert: 'bg-purple-50 text-purple-600 border-purple-200',
  }[material.level] || 'bg-slate-100 text-slate-600 border-slate-200';

  const userInfoText = `${(user as any)?.email || 'User'} - ${new Date().toLocaleDateString()}`;

  return (
    <>
      {/* SCREENSHOT WARNING OVERLAY - Muncul saat PrintScreen */}
      {showScreenshotWarning && (
        <div className="fixed inset-0 z-[99999] bg-black text-white flex flex-col items-center justify-center p-6 text-center">
          <AlertTriangle className="w-24 h-24 text-red-500 mb-6 animate-pulse" />
          <h1 className="text-4xl font-black mb-4 uppercase tracking-widest text-red-500">Tindakan Dilarang!</h1>
          <p className="text-xl text-slate-300 max-w-lg">
            Sistem mendeteksi percobaan screenshot.
          </p>
          <p className="mt-8 text-sm text-slate-500 font-mono">
            IP / Akun tercatat: {userInfoText}
          </p>
        </div>
      )}

      {/* WINDOW BLUR OVERLAY - Layar Hitam saat ganti tab / pake snipping tool */}
      {isWindowBlurred && (
        <div className="fixed inset-0 z-[99999] bg-black flex items-center justify-center">
          <p className="text-slate-500 font-mono text-sm opacity-50">Konten disembunyikan untuk keamanan - ASTBYTE</p>
        </div>
      )}

      <div className="min-h-screen bg-slate-50 text-slate-800 font-sans relative">
        
        {/* WATERMARK OVERLAY - Lebih clean & elegan (nggak terlalu ribut) */}
        <div className="fixed inset-0 pointer-events-none z-[9998] flex flex-col justify-between p-8 opacity-[0.05] select-none mix-blend-multiply overflow-hidden">
          <div className="text-right text-lg font-bold text-slate-900">{userInfoText}</div>
          <div className="flex justify-center items-center h-full w-full absolute top-0 left-0">
            <div className="text-3xl sm:text-5xl font-black text-slate-900 -rotate-12 tracking-widest whitespace-nowrap">
              ASTBYTE • {userInfoText}
            </div>
          </div>
          <div className="text-left text-lg font-bold text-slate-900 mt-auto">{userInfoText}</div>
        </div>

        {/* Navbar */}
        <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-slate-200 shadow-sm no-print">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
            <div className="flex items-center gap-4 sm:gap-6">
              <button
                onClick={() => navigate('/dashboard')}
                className="group flex items-center gap-2 px-4 py-2.5 text-sm font-bold text-slate-500 hover:text-blue-600 transition-colors bg-slate-50 hover:bg-blue-50 rounded-full border border-slate-200 shadow-sm"
              >
                <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                <span className="hidden sm:inline">Dashboard</span>
              </button>
              
              <div className="h-6 w-px bg-slate-200 hidden sm:block"></div>
              
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 border border-blue-100 shadow-sm">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div className="hidden md:block leading-tight">
                  <p className="text-[10px] text-slate-500 font-extrabold uppercase tracking-wider">Module #{material.order}</p>
                  <p className="text-sm font-bold text-slate-900 line-clamp-1 max-w-[200px]">{material.title}</p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              {isPremium && (
                <button
                  onClick={handleMarkComplete}
                  disabled={isCompleting}
                  className={`px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2 shadow-sm disabled:opacity-50 border ${
                    isCompleted
                      ? 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100 hover:shadow-md'
                      : 'bg-blue-600 text-white hover:bg-blue-700 border-transparent shadow-md hover:-translate-y-0.5'
                  }`}
                >
                  {isCompleting ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : isCompleted ? (
                    <><CheckCircle className="w-4 h-4" /> <span className="hidden sm:inline">Completed</span></>
                  ) : (
                    <><Target className="w-4 h-4" /> <span className="hidden sm:inline">Mark Complete</span></>
                  )}
                </button>
              )}
            </div>
          </div>
        </header>

        <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 relative z-10 print-hide">
          
          {/* HERO SECTION */}
          <div className="mb-10 bg-white border border-slate-200 rounded-[2.5rem] p-8 sm:p-10 shadow-lg animate-fade-in-up">
            <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-8">
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-3 mb-6">
                  <span className={`px-3 py-1.5 rounded-lg text-[10px] font-extrabold uppercase tracking-widest border shadow-sm ${levelBadgeColor}`}>
                    {material.level}
                  </span>
                  <span className="px-3 py-1.5 rounded-lg text-[10px] font-extrabold uppercase tracking-widest bg-blue-50 text-blue-700 border border-blue-200 shadow-sm">
                    {material.language}
                  </span>
                </div>
                
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 mb-6 leading-tight tracking-tight">
                  {material.title}
                </h1>
                
                <p className="text-lg text-slate-600 font-medium leading-relaxed max-w-2xl">
                  {material.description}
                </p>
              </div>
              
              <div className="shrink-0 w-full lg:w-72">
                {isPremium && (
                  <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 relative overflow-hidden group shadow-sm hover:shadow-md transition-shadow">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 group-hover:opacity-100 opacity-50 transition-opacity"></div>
                    <div className="relative">
                      <div className="flex items-center gap-2 mb-4 text-slate-500 text-xs font-black uppercase tracking-widest">
                        <Target className="w-4 h-4 text-blue-600" />
                        Your Progress
                      </div>
                      <div className="flex items-baseline gap-1 mb-4">
                        <span className="text-4xl font-black text-slate-900">{progress}</span>
                        <span className="text-sm font-bold text-slate-500">%</span>
                      </div>
                      <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden border border-slate-300/50">
                        <div 
                          className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full transition-all duration-700 ease-out"
                          style={{ width: `${progress}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* CONTENT AREA */}
          <div className="bg-white border border-slate-200 text-slate-700 rounded-[2.5rem] p-8 sm:p-12 shadow-xl mb-10 animate-fade-in-up select-none" style={{ animationDelay: '100ms' }}>
            <div className="prose prose-slate prose-lg max-w-none prose-headings:font-black prose-headings:text-slate-900 prose-p:text-slate-700 prose-p:font-medium prose-strong:text-slate-900 prose-ul:text-slate-700 prose-ol:text-slate-700 prose-a:text-blue-600 hover:prose-a:text-blue-700 prose-code:text-blue-700 prose-code:bg-blue-50 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md prose-pre:bg-slate-900 prose-pre:text-slate-50 prose-pre:border prose-pre:border-slate-800 prose-pre:shadow-lg prose-img:rounded-2xl prose-img:shadow-md">
               <MaterialContent content={material.content} />
            </div>
          </div>

          {/* FOOTER NAVIGATION */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12 animate-fade-in-up no-print" style={{ animationDelay: '200ms' }}>
            {prevMaterial && (
              <button
                // URL menggunakan encodeId()
                onClick={() => navigate(`/materials/${encodeId(prevMaterial.id)}`)}
                className="group flex items-center gap-4 p-5 bg-white hover:bg-slate-50 border border-slate-200 hover:border-blue-300 rounded-2xl transition-all text-left shadow-sm hover:shadow-md"
              >
                <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center border border-slate-200 group-hover:scale-110 transition-transform">
                  <ChevronLeft className="w-5 h-5 text-slate-500 group-hover:text-blue-600" />
                </div>
                <div>
                  <p className="text-[10px] text-slate-500 font-extrabold uppercase tracking-widest mb-1">Previous Lesson</p>
                  <p className="text-sm font-bold text-slate-900 line-clamp-1 group-hover:text-blue-700 transition-colors">{prevMaterial.title}</p>
                </div>
              </button>
            )}

            {nextMaterial && (
              <button
                // URL menggunakan encodeId()
                onClick={() => navigate(`/materials/${encodeId(nextMaterial.id)}`)}
                className="group flex items-center justify-between gap-4 p-5 bg-blue-600 hover:bg-blue-700 border border-blue-500 rounded-2xl transition-all text-left shadow-lg shadow-blue-600/20 transform hover:-translate-y-0.5"
              >
                <div className="pl-2">
                  <p className="text-[10px] text-blue-200 font-extrabold uppercase tracking-widest mb-1">Next Lesson</p>
                  <p className="text-sm font-bold text-white line-clamp-1">{nextMaterial.title}</p>
                </div>
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-sm">
                  <ChevronRight className="w-5 h-5 text-white" />
                </div>
              </button>
            )}
          </div>

          <div className="text-center pb-8 no-print">
             <button 
               onClick={() => navigate('/dashboard')}
               className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white border border-slate-200 text-slate-600 hover:text-blue-600 hover:border-blue-200 transition-all text-sm font-bold shadow-sm hover:shadow-md"
             >
                <Home className="w-4 h-4" />
                Back to Dashboard
             </button>
          </div>

        </main>

        <style>{`
          @keyframes fade-in-up { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
          .animate-fade-in-up { animation: fade-in-up 0.5s ease-out forwards; }
          
          /* Cegah select text */
          .select-none {
            -webkit-user-select: none;
            -ms-user-select: none;
            user-select: none;
          }

          /* Trik Anti Print / Save as PDF */
          @media print {
            body { background-color: black !important; color: black !important; }
            .print-hide, .no-print, header, main { display: none !important; }
            html::after {
              content: "MATERI DILINDUNGI HAK CIPTA. MENCETAK TIDAK DIIZINKAN.";
              display: flex; align-items: center; justify-content: center;
              height: 100vh; width: 100vw; color: red; font-size: 24px;
              font-weight: bold; text-align: center; background-color: black;
            }
          }
        `}</style>
      </div>
    </>
  );
}