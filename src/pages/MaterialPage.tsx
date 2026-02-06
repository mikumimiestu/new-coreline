import { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import type { LearningMaterial } from '../types/learning';
import { MOCK_MATERIALS as STUDENT_MATERIALS } from '../data/mockData';
import { MOCK_MATERIALS as OTHER_MATERIALS } from '../data/otherData';
import { MOCK_MATERIALS as PYTHON_MATERIALS } from '../data/pythonData';
import { MOCK_MATERIALS as GO_MATERIALS } from '../data/golangData';
import { MOCK_MATERIALS as MYSQL_MATERIALS } from '../data/mysqlData';
import { MOCK_MATERIALS as TS_MATERIAL } from '../data/tsData';
import { MOCK_MATERIALS as JS_MATERIAL } from '../data/jsData';
import { MOCK_MATERIALS as PSQL_MATERIAL } from '../data/posgresData';
import { MOCK_MATERIALS as RB_MATERIAL } from '../data/rubyData';
import { 
  ArrowLeft, BookOpen, ChevronRight, ChevronLeft, 
  Clock, Target, Award, CheckCircle, XCircle, Home,
  Loader2, Download, Share2, Bookmark
} from 'lucide-react';
import MaterialContent from '../components/MaterialContent';

const API_BASE = 'https://authx.astbyte.com';

const ALL_MATERIALS: LearningMaterial[] = [
  ...STUDENT_MATERIALS,
  ...OTHER_MATERIALS,
  ...PYTHON_MATERIALS,
  ...GO_MATERIALS,
  ...MYSQL_MATERIALS,
  ...TS_MATERIAL,
  ...JS_MATERIAL,
  ...PSQL_MATERIAL,
  ...RB_MATERIAL,
];

type Plan = 'free' | 'pro' | 'plus';

export default function MaterialPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [progress, setProgress] = useState(0);
  const [isCompleting, setIsCompleting] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);

  const material = ALL_MATERIALS.find((m) => m.id === id);

  const getPlanFromUser = (u: any): Plan => {
    const type = (u?.subscription_type ?? 'free').toString().toLowerCase().trim();
    if (type === 'plus') return 'plus';
    if (type === 'pro') return 'pro';
    return 'free';
  };

  const plan = getPlanFromUser(user);
  const isPremium = ['pro', 'plus'].includes(plan);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  useEffect(() => {
    if (!material || !user || !isPremium) return;

    const fetchProgress = async () => {
      let token = localStorage.getItem('astbyte_token');
      if (!token && (user as any).token) token = (user as any).token;

      if (!token) return;

      try {
        const response = await fetch(`${API_BASE}/api/learning/progress`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
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

  const handleMarkComplete = async () => {
    if (!material || !user || !isPremium) return;

    let token = localStorage.getItem('astbyte_token');
    if (!token && (user as any).token) token = (user as any).token;

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
      console.error("Gagal sync ke server:", err);
      alert("Gagal menyimpan progress.");
    } finally {
      setIsCompleting(false);
    }
  };

  if (!material) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 p-6">
        <div className="max-w-lg w-full rounded-3xl p-8 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-2 border-slate-200 dark:border-slate-800 text-center shadow-2xl">
          <div className="w-20 h-20 bg-gradient-to-br from-red-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <XCircle className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-black text-slate-900 dark:text-white mb-3">Materi Tidak Ditemukan</h1>
          <p className="text-slate-600 dark:text-slate-400 mb-8">Materi yang kamu cari tidak tersedia atau sudah dihapus.</p>
          <button
            onClick={() => navigate('/dashboard')}
            className="w-full px-6 py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg hover:shadow-xl"
          >
            Kembali ke Dashboard
          </button>
        </div>
      </div>
    );
  }

  // Find next and previous materials
  const userType = (user as any)?.user_type || 'student';
  const sameLangMaterials = ALL_MATERIALS
    .filter(m => m.language === material.language && m.user_type === userType)
    .sort((a, b) => a.order - b.order);
  
  const currentIndex = sameLangMaterials.findIndex(m => m.id === material.id);
  const prevMaterial = currentIndex > 0 ? sameLangMaterials[currentIndex - 1] : null;
  const nextMaterial = currentIndex < sameLangMaterials.length - 1 ? sameLangMaterials[currentIndex + 1] : null;

  const levelColors = {
    beginner: 'from-emerald-500 to-green-500',
    intermediate: 'from-amber-500 to-orange-500',
    advanced: 'from-rose-500 to-pink-500',
  };

  const levelLabels = {
    beginner: 'Pemula',
    intermediate: 'Menengah',
    advanced: 'Lanjutan',
  };

  const isCompleted = progress === 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/30 dark:from-[#0B0F19] dark:via-slate-950 dark:to-slate-900">
      
      {/* Navbar */}
      <header className="sticky top-0 z-40 bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl border-b border-white/20 dark:border-slate-800/50 shadow-lg">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate('/dashboard')}
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all group"
              >
                <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                <span className="hidden sm:inline">Dashboard</span>
              </button>
              
              <div className="h-8 w-px bg-slate-200 dark:bg-slate-800"></div>
              
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl shadow-lg">
                  <BookOpen className="w-5 h-5 text-white" />
                </div>
                <div className="hidden md:block">
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Modul #{material.order}</p>
                  <p className="text-sm font-black text-slate-900 dark:text-white">{material.language?.toUpperCase()}</p>
                </div>
              </div>
            </div>

            {isPremium && (
              <div className="flex items-center gap-3">
                {isSyncing && (
                  <div className="hidden md:flex items-center gap-2 text-sm font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 px-4 py-2 rounded-full">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span className="hidden sm:inline">Syncing...</span>
                  </div>
                )}
                
                <button
                  onClick={handleMarkComplete}
                  disabled={isCompleting}
                  className={`px-4 sm:px-6 py-2.5 rounded-xl font-bold text-sm transition-all flex items-center gap-2 shadow-lg hover:shadow-xl disabled:opacity-50 ${
                    isCompleted
                      ? 'bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 hover:bg-green-100 dark:hover:bg-green-900/30 border-2 border-green-200 dark:border-green-800'
                      : 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700'
                  }`}
                >
                  {isCompleting ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : isCompleted ? (
                    <><CheckCircle className="w-4 h-4" /> <span className="hidden sm:inline">Selesai</span></>
                  ) : (
                    <><Target className="w-4 h-4" /> <span className="hidden sm:inline">Tandai Selesai</span></>
                  )}
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Material Header */}
        <div className="mb-8">
          <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-3xl border-2 border-slate-200 dark:border-slate-800 p-8 shadow-xl">
            <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 mb-6">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-4">
                  <span className={`px-4 py-1.5 rounded-xl text-xs font-black uppercase bg-gradient-to-r ${
                    levelColors[material.level as keyof typeof levelColors]
                  } text-white shadow-lg`}>
                    {levelLabels[material.level as keyof typeof levelLabels]}
                  </span>
                  {material.language && (
                    <span className="px-4 py-1.5 rounded-xl text-xs font-black uppercase bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 border-2 border-blue-200 dark:border-blue-800">
                      {material.language}
                    </span>
                  )}
                  {isCompleted && (
                    <span className="px-4 py-1.5 rounded-xl text-xs font-black uppercase bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 flex items-center gap-1.5">
                      <CheckCircle className="w-3.5 h-3.5" /> COMPLETED
                    </span>
                  )}
                </div>
                
                <h1 className="text-4xl sm:text-5xl font-black text-slate-900 dark:text-white mb-4 leading-tight">
                  {material.title}
                </h1>
                
                <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                  {material.description}
                </p>
              </div>

              {isPremium && (
                <div className="flex flex-col gap-3">
                  <div className="bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl p-6 text-white shadow-xl min-w-[200px]">
                    <div className="flex items-center gap-3 mb-3">
                      <Target className="w-6 h-6" />
                      <span className="text-sm font-bold opacity-90">Progress</span>
                    </div>
                    <p className="text-5xl font-black mb-2">{progress}%</p>
                    <div className="h-2 w-full bg-white/20 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-white rounded-full transition-all duration-500"
                        style={{ width: `${progress}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Progress for non-premium users */}
            {!isPremium && (
              <div className="bg-gradient-to-r from-amber-50 via-orange-50 to-amber-50 dark:from-amber-900/20 dark:via-orange-900/20 dark:to-amber-900/20 rounded-2xl p-6 border-2 border-amber-200 dark:border-amber-800/50">
                <div className="flex items-start gap-4">
                  <Award className="w-8 h-8 text-amber-600 dark:text-amber-500 flex-shrink-0 mt-1" />
                  <div className="flex-1">
                    <h3 className="text-lg font-black text-amber-900 dark:text-amber-400 mb-2">
                      Upgrade untuk Track Progress
                    </h3>
                    <p className="text-sm text-amber-700 dark:text-amber-500 mb-4">
                      Dapatkan fitur tracking progress, sertifikat, dan akses ke semua materi premium.
                    </p>
                    <Link 
                      to="/pricing"
                      className="inline-block px-6 py-3 bg-gradient-to-r from-amber-600 to-orange-600 text-white rounded-xl font-bold text-sm hover:from-amber-700 hover:to-orange-700 transition-all shadow-lg hover:shadow-xl"
                    >
                      Lihat Paket Premium →
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Material Content */}
        <div className="material-content bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-3xl border-2 border-slate-200 dark:border-slate-800 p-8 sm:p-12 shadow-xl mb-8">
          <MaterialContent content={material.content} />
        </div>

        {/* Navigation Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          {prevMaterial ? (
            <button
              onClick={() => navigate(`/materials/${prevMaterial.id}`)}
              className="group flex items-center gap-4 p-6 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-2xl border-2 border-slate-200 dark:border-slate-800 hover:border-blue-500 dark:hover:border-blue-500 transition-all shadow-lg hover:shadow-xl"
            >
              <div className="p-3 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl group-hover:scale-110 transition-transform">
                <ChevronLeft className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1 text-left">
                <p className="text-xs text-slate-500 dark:text-slate-400 font-bold mb-1">SEBELUMNYA</p>
                <p className="text-sm font-black text-slate-900 dark:text-white line-clamp-1">{prevMaterial.title}</p>
              </div>
            </button>
          ) : (
            <div></div>
          )}

          {nextMaterial ? (
            <button
              onClick={() => navigate(`/materials/${nextMaterial.id}`)}
              className="group flex items-center gap-4 p-6 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 rounded-2xl transition-all shadow-lg hover:shadow-xl sm:col-start-2"
            >
              <div className="flex-1 text-left">
                <p className="text-xs text-blue-100 font-bold mb-1">SELANJUTNYA</p>
                <p className="text-sm font-black text-white line-clamp-1">{nextMaterial.title}</p>
              </div>
              <div className="p-3 bg-white/20 rounded-xl group-hover:scale-110 transition-transform">
                <ChevronRight className="w-6 h-6 text-white" />
              </div>
            </button>
          ) : (
            <div className="sm:col-start-2"></div>
          )}
        </div>

        {/* Back to Dashboard Button */}
        <div className="text-center">
          <button
            onClick={() => navigate('/dashboard')}
            className="inline-flex items-center gap-2 px-6 py-3 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-xl font-bold hover:bg-slate-200 dark:hover:bg-slate-700 transition-all"
          >
            <Home className="w-5 h-5" />
            Kembali ke Dashboard
          </button>
        </div>

      </main>
    </div>
  );
}
