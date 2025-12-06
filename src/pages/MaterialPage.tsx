import { useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import type { LearningMaterial } from '../types/learning';
import { MOCK_MATERIALS as STUDENT_MATERIALS } from '../data/mockData';
import { MOCK_MATERIALS as OTHER_MATERIALS } from '../data/otherData';
import { MOCK_MATERIALS as PYTHON_MATERIALS } from '../data/pythonData';
import { MOCK_MATERIALS as GO_MATERIALS } from '../data/golangData';
import { MOCK_MATERIALS as MYSQL_MATERIALS } from '../data/mysqlData';
import { MOCK_MATERIALS as  TS_MATERIAL } from '../data/tsData';
import { MOCK_MATERIALS as  JS_MATERIAL } from '../data/jsData';
import { MOCK_MATERIALS as  PSQL_MATERIAL } from '../data/posgresData';
import { MOCK_MATERIALS as  RB_MATERIAL } from '../data/rubyData';
import { ArrowLeft, BookOpen } from 'lucide-react';
import MaterialContent from '../components/MaterialContent';

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

export default function MaterialPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const material = ALL_MATERIALS.find((m) => m.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!material) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="max-w-lg w-full rounded-xl p-6 ring-1 ring-black/5 dark:ring-white/10 bg-white dark:bg-slate-900 text-center">
          <p className="text-lg font-semibold mb-3">Materi tidak ditemukan</p>
          <button
            onClick={() => navigate(-1)}
            className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
          >
            Kembali
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-950 dark:via-slate-950 dark:to-slate-900">
      <header className="sticky top-0 z-30 bg-white/80 dark:bg-slate-900/70 backdrop-blur ring-1 ring-black/5 dark:ring-white/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
          <Link
            to="/dashboard"
            className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 dark:text-cyan-300 hover:underline"
          >
            <ArrowLeft className="w-4 h-4" /> Kembali
          </Link>
          <div className="flex items-center gap-2 text-slate-700 dark:text-slate-200">
            <BookOpen className="w-5 h-5" />
            <span className="font-semibold">Materi</span>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 🔥 Tambah class "material-content" di sini */}
        <div className="material-content rounded-2xl bg-white dark:bg-slate-900 ring-1 ring-black/5 dark:ring-white/10 p-6 sm:p-8 shadow">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white mb-3">
            {material.title}
          </h1>
          <div className="mb-6 flex flex-wrap items-center gap-3">
            {material.level && (
              <span className="text-xs px-3 py-1 rounded-full font-semibold bg-gray-100 text-gray-700 dark:bg-slate-800 dark:text-slate-200 border border-gray-300 dark:border-slate-700">
                {material.level.toUpperCase()}
              </span>
            )}
            {material.language && (
              <span className="text-xs px-3 py-1 rounded-full font-semibold bg-blue-100 text-blue-700 dark:bg-cyan-900/40 dark:text-cyan-200">
                {material.language.toUpperCase()}
              </span>
            )}
          </div>

          <MaterialContent content={material.content} />
        </div>
      </main>
    </div>
  );
}
