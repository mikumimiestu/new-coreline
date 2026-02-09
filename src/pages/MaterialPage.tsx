import { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import type { LearningMaterial } from '../types/learning';

// Import Data
import { MOCK_MATERIALS as STUDENT_MATERIALS } from '../data/mockData';
import { MOCK_MATERIALS as OTHER_MATERIALS } from '../data/otherData';
import { MOCK_MATERIALS as PYTHON_MATERIALS } from '../data/pythonData';
import { MOCK_MATERIALS as GO_MATERIALS } from '../data/golangData';
import { MOCK_MATERIALS as MYSQL_MATERIALS } from '../data/mysqlData';
import { MOCK_MATERIALS as TS_MATERIAL } from '../data/tsData';
import { MOCK_MATERIALS as JS_MATERIAL } from '../data/jsData';
import { MOCK_MATERIALS as PSQL_MATERIAL } from '../data/posgresData';
import { MOCK_MATERIALS as RB_MATERIAL } from '../data/rubyData';

// Icons & Components
import { 
  ArrowLeft, BookOpen, ChevronRight, ChevronLeft, 
  Target, CheckCircle, XCircle, Home,
  Loader2, Award
} from 'lucide-react';
import MaterialContent from '../components/MaterialContent';

const API_BASE = 'https://authx.astbyte.com';

// Gabungkan semua materi untuk pencarian ID
const ALL_MATERIALS: LearningMaterial[] = [
  ...STUDENT_MATERIALS, ...OTHER_MATERIALS, ...PYTHON_MATERIALS, 
  ...GO_MATERIALS, ...MYSQL_MATERIALS, ...TS_MATERIAL, 
  ...JS_MATERIAL, ...PSQL_MATERIAL, ...RB_MATERIAL,
];

type Plan = 'free' | 'pro' | 'plus';

export default function MaterialPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();

  // State
  const [progress, setProgress] = useState(0);
  const [isCompleting, setIsCompleting] = useState(false);

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
    const newProgress = progress === 100 ? 0 : 100; // Toggle logic

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
      <div className="min-h-screen flex items-center justify-center bg-[#0F172A] p-6">
        <div className="max-w-md w-full bg-slate-900 border border-slate-800 rounded-3xl p-10 text-center shadow-2xl">
          <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-6 text-red-500">
            <XCircle className="w-8 h-8" />
          </div>
          <h1 className="text-2xl font-black text-white mb-3">Materi Tidak Ditemukan</h1>
          <p className="text-slate-400 mb-8">Materi yang kamu cari tidak tersedia atau sudah dihapus.</p>
          <button
            onClick={() => navigate('/dashboard')}
            className="w-full px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold transition-all"
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
    beginner: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    intermediate: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    advanced: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
  }[material.level] || 'bg-slate-800 text-slate-400';

  return (
    <div className="min-h-screen bg-[#0F172A] text-slate-200 font-sans selection:bg-blue-500/30">
      
      {/* Background Ambience */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[100px]" />
      </div>

      {/* Navbar */}
      <header className="sticky top-0 z-40 bg-[#0F172A]/80 backdrop-blur-xl border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <button
              onClick={() => navigate('/dashboard')}
              className="group flex items-center gap-2 px-4 py-2 text-sm font-bold text-slate-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              <span className="hidden sm:inline">Dashboard</span>
            </button>
            
            <div className="h-6 w-px bg-slate-800 hidden sm:block"></div>
            
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-blue-600/20 flex items-center justify-center text-blue-500">
                <BookOpen className="w-4 h-4" />
              </div>
              <div className="hidden md:block leading-tight">
                <p className="text-[10px] text-slate-500 font-black uppercase tracking-wider">Module #{material.order}</p>
                <p className="text-sm font-bold text-white line-clamp-1 max-w-[200px]">{material.title}</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {isPremium && (
              <button
                onClick={handleMarkComplete}
                disabled={isCompleting}
                className={`px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2 shadow-lg disabled:opacity-50 ${
                  isCompleted
                    ? 'bg-green-500/10 text-green-400 border border-green-500/20 hover:bg-green-500/20'
                    : 'bg-blue-600 text-white hover:bg-blue-500 shadow-blue-600/20'
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

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 relative z-10">
        
        {/* HERO SECTION */}
        <div className="mb-10 bg-slate-900/50 border border-slate-800 rounded-[2.5rem] p-8 sm:p-10 animate-fade-in-up">
          <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-8">
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-3 mb-6">
                <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest border ${levelBadgeColor}`}>
                  {material.level}
                </span>
                <span className="px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest bg-blue-500/10 text-blue-400 border border-blue-500/20">
                  {material.language}
                </span>
              </div>
              
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-6 leading-tight">
                {material.title}
              </h1>
              
              <p className="text-lg text-slate-400 leading-relaxed max-w-2xl">
                {material.description}
              </p>
            </div>

            {/* Progress Card (Premium) or CTA (Free) */}
            <div className="shrink-0 w-full lg:w-72">
              {isPremium ? (
                <div className="bg-slate-950 border border-slate-800 rounded-3xl p-6 relative overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-purple-600/5 group-hover:opacity-100 opacity-50 transition-opacity"></div>
                  <div className="relative">
                    <div className="flex items-center gap-2 mb-4 text-slate-400 text-xs font-bold uppercase tracking-wider">
                      <Target className="w-4 h-4 text-blue-500" />
                      Your Progress
                    </div>
                    <div className="flex items-baseline gap-1 mb-4">
                      <span className="text-4xl font-black text-white">{progress}</span>
                      <span className="text-sm font-bold text-slate-500">%</span>
                    </div>
                    <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full transition-all duration-700 ease-out"
                        style={{ width: `${progress}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ) : (
                <div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* CONTENT AREA - FIXED DARK MODE TEXT */}
        {/* PERBAIKAN DI SINI:
            Saya menambahkan 'text-slate-300' di container utama sebagai fallback.
            Dan menambahkan class typography spesifik untuk memaksa warna terang pada:
            - Headings (h1-h6): text-white
            - Paragraphs (p), Lists (ul/ol): text-slate-300
            - Bold (strong): text-white
        */}
        <div className="bg-slate-900 border border-slate-800 text-slate-300 rounded-[2rem] p-8 sm:p-12 shadow-2xl mb-10 animate-fade-in-up" style={{ animationDelay: '100ms' }}>
          <div className="prose prose-invert prose-lg max-w-none prose-headings:font-black prose-headings:text-white prose-p:text-slate-300 prose-strong:text-white prose-ul:text-slate-300 prose-ol:text-slate-300 prose-a:text-blue-400 prose-code:text-blue-300 prose-pre:bg-[#0B0F19] prose-pre:border prose-pre:border-slate-800">
             <MaterialContent content={material.content} />
          </div>
        </div>

        {/* FOOTER NAVIGATION */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
          {prevMaterial ? (
            <button
              onClick={() => navigate(`/materials/${prevMaterial.id}`)}
              className="group flex items-center gap-4 p-5 bg-slate-900/50 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 rounded-2xl transition-all text-left"
            >
              <div className="w-12 h-12 bg-slate-950 rounded-xl flex items-center justify-center border border-slate-800 group-hover:scale-110 transition-transform">
                <ChevronLeft className="w-5 h-5 text-slate-400 group-hover:text-white" />
              </div>
              <div>
                <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest mb-1">Previous Lesson</p>
                <p className="text-sm font-bold text-white line-clamp-1 group-hover:text-blue-400 transition-colors">{prevMaterial.title}</p>
              </div>
            </button>
          ) : ( <div /> )}

          {nextMaterial ? (
            <button
              onClick={() => navigate(`/materials/${nextMaterial.id}`)}
              className="group flex items-center justify-between gap-4 p-5 bg-blue-600 hover:bg-blue-500 border border-blue-500 rounded-2xl transition-all text-left shadow-lg shadow-blue-600/20"
            >
              <div className="pl-2">
                <p className="text-[10px] text-blue-200 font-black uppercase tracking-widest mb-1">Next Lesson</p>
                <p className="text-sm font-bold text-white line-clamp-1">{nextMaterial.title}</p>
              </div>
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <ChevronRight className="w-5 h-5 text-white" />
              </div>
            </button>
          ) : ( <div /> )}
        </div>

        {/* BACK BUTTON */}
        <div className="text-center pb-8">
           <button 
             onClick={() => navigate('/dashboard')}
             className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-600 transition-all text-sm font-bold"
           >
              <Home className="w-4 h-4" />
              Back to Dashboard
           </button>
        </div>

      </main>

      <style>{`
        @keyframes fade-in-up { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fade-in-up { animation: fade-in-up 0.5s ease-out forwards; }
      `}</style>
    </div>
  );
}