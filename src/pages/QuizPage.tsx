import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, Brain, CheckCircle, XCircle, 
  Award, ChevronRight, AlertTriangle, RefreshCw
} from 'lucide-react';

// --- MOCK DATABASE KUIS ---
// Di real app, fetch data ini dari API: `GET /api/quizzes/${id}`
const getQuizData = (id: string) => {
  const QUIZZES_DB: Record<string, any> = {
    // Contoh jika ID modulnya mengandung kata 'javascript' atau 'js'
    'js-basic': {
      title: "Fundamental JavaScript",
      questions: [
        {
          id: 1,
          question: "Manakah dari berikut ini yang merupakan tipe data primitif dalam JavaScript?",
          options: ["Array", "Object", "String", "Function"],
          correctAnswer: 2
        },
        {
          id: 2,
          question: "Apa fungsi dari perintah 'console.log()'?",
          options: [
            "Menghapus data di browser",
            "Menampilkan output ke konsol",
            "Menyimpan data ke database",
            "Membuat variabel baru"
          ],
          correctAnswer: 1
        }
      ]
    },
    // Contoh jika ID modulnya mengandung kata 'python'
    'py-basic': {
      title: "Fundamental Python",
      questions: [
        {
          id: 1,
          question: "Bagaimana cara membuat fungsi di Python?",
          options: ["function myFunc():", "def myFunc():", "create myFunc():", "func myFunc():"],
          correctAnswer: 1
        },
        {
          id: 2,
          question: "Tipe data koleksi mana di Python yang sifatnya 'immutable' (tidak bisa diubah)?",
          options: ["List", "Dictionary", "Set", "Tuple"],
          correctAnswer: 3
        }
      ]
    }
  };

  // Cek apakah ada data persis sesuai ID
  if (QUIZZES_DB[id]) return QUIZZES_DB[id];

  // Kalau tidak ada di DB, generate kuis dinamis berdasarkan ID-nya (Fallback)
  const languageGuess = id.split('-')[0].toUpperCase();
  return {
    title: `Kuis Evaluasi: Modul ${languageGuess}`,
    questions: [
      {
        id: 1,
        question: `Pertanyaan pertama terkait konsep di modul ${id}. Manakah pernyataan yang benar?`,
        options: ["Pernyataan A", "Pernyataan B", "Pernyataan C", "Semua Benar"],
        correctAnswer: 3
      },
      {
        id: 2,
        question: `Konsep utama yang diajarkan pada modul ${id} adalah...`,
        options: ["Sintaks dasar", "Struktur data", "OOP", "Tergantung bahasa pemrogramannya"],
        correctAnswer: 3
      }
    ]
  };
};

export default function QuizPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Ambil data kuis berdasarkan ID modul dari URL
  const quizData = getQuizData(id || '');

  useEffect(() => {
    document.title = 'Kuis Modul | Coreline';
    window.scrollTo(0, 0);
  }, [id]);

  const currentQ = quizData.questions[currentIdx];
  const isLastQuestion = currentIdx === quizData.questions.length - 1;
  const progress = ((currentIdx + 1) / quizData.questions.length) * 100;

  const handleSelectOption = (optIdx: number) => {
    if (isSubmitted) return;
    setSelectedAnswers(prev => ({ ...prev, [currentIdx]: optIdx }));
  };

  const handleNext = () => {
    if (currentIdx < quizData.questions.length - 1) setCurrentIdx(prev => prev + 1);
  };

  const handlePrev = () => {
    if (currentIdx > 0) setCurrentIdx(prev => prev - 1);
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
  };

  // Kalkulasi Skor
  const calculateScore = () => {
    let correct = 0;
    quizData.questions.forEach((q: any, idx: number) => {
      if (selectedAnswers[idx] === q.correctAnswer) correct++;
    });
    return { correct, total: quizData.questions.length, percentage: Math.round((correct / quizData.questions.length) * 100) };
  };

  const scoreData = calculateScore();

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans selection:bg-blue-500/30 relative overflow-x-hidden">
      {/* Background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 opacity-[0.4] bg-[linear-gradient(rgba(203,213,225,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(203,213,225,0.5)_1px,transparent_1px)] bg-[size:30px_30px]"></div>
        <div className="absolute top-[-10%] left-[-10%] w-[40vw] h-[40vw] bg-purple-300/20 rounded-full blur-[100px]" />
      </div>

      {/* Navbar Minimalis */}
      <nav className="sticky top-0 z-50 border-b border-slate-200 bg-white/80 backdrop-blur-xl shadow-sm">
        <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
          <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-purple-600 transition-colors bg-white hover:bg-purple-50 px-4 py-2 rounded-full border border-slate-200 shadow-sm hover:shadow">
            <ArrowLeft className="w-4 h-4" /> Keluar Kuis
          </button>
          <div className="flex items-center gap-2 font-black text-slate-900">
            <Brain className="w-5 h-5 text-purple-600" /> Kuis Interaktif
          </div>
        </div>
      </nav>

      <main className="max-w-3xl mx-auto px-4 py-10 relative z-10">
        
        {!isSubmitted ? (
          <div className="animate-fade-in-up">
            {/* Header Kuis & Progress */}
            <div className="mb-8">
              <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-6">{quizData.title}</h1>
              
              <div className="flex justify-between items-center text-sm font-bold text-slate-500 mb-2">
                <span>Pertanyaan {currentIdx + 1} dari {quizData.questions.length}</span>
                <span className="text-purple-600">{Math.round(progress)}% Selesai</span>
              </div>
              <div className="h-2.5 w-full bg-slate-200 rounded-full overflow-hidden shadow-inner">
                <div 
                  className="h-full bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full transition-all duration-500"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>

            {/* Kotak Pertanyaan */}
            <div className="bg-white border border-slate-200 rounded-[2rem] p-6 md:p-10 shadow-lg mb-6">
              <h2 className="text-xl md:text-2xl font-bold text-slate-900 leading-relaxed mb-8">
                {currentQ.question}
              </h2>

              <div className="space-y-4">
                {currentQ.options.map((opt: string, oIdx: number) => {
                  const isSelected = selectedAnswers[currentIdx] === oIdx;
                  return (
                    <button
                      key={oIdx}
                      onClick={() => handleSelectOption(oIdx)}
                      className={`w-full text-left p-5 rounded-2xl border-2 transition-all font-medium text-base md:text-lg flex items-center justify-between group
                        ${isSelected 
                          ? 'border-purple-500 bg-purple-50 text-purple-900 shadow-md' 
                          : 'border-slate-200 bg-white text-slate-700 hover:border-purple-300 hover:bg-slate-50'
                        }`}
                    >
                      <div className="flex items-center gap-4">
                        <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center font-bold text-sm transition-colors
                          ${isSelected ? 'border-purple-500 bg-purple-500 text-white' : 'border-slate-300 text-slate-400 group-hover:border-purple-300'}`}>
                          {String.fromCharCode(65 + oIdx)}
                        </div>
                        {opt}
                      </div>
                      {isSelected && <CheckCircle className="w-6 h-6 text-purple-600" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Navigasi Bawah */}
            <div className="flex items-center justify-between">
              <button 
                onClick={handlePrev} 
                disabled={currentIdx === 0}
                className="px-6 py-3.5 rounded-xl font-bold text-slate-600 bg-white border border-slate-200 hover:bg-slate-50 disabled:opacity-50 shadow-sm transition-all"
              >
                Kembali
              </button>

              {!isLastQuestion ? (
                <button 
                  onClick={handleNext}
                  disabled={selectedAnswers[currentIdx] === undefined}
                  className="px-8 py-3.5 rounded-xl font-bold text-white bg-purple-600 hover:bg-purple-700 disabled:opacity-50 shadow-md shadow-purple-500/20 transition-all flex items-center gap-2"
                >
                  Selanjutnya <ChevronRight className="w-5 h-5" />
                </button>
              ) : (
                <button 
                  onClick={handleSubmit}
                  disabled={Object.keys(selectedAnswers).length < quizData.questions.length}
                  className="px-8 py-3.5 rounded-xl font-bold text-white bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 shadow-lg shadow-emerald-500/20 transition-all flex items-center gap-2 transform hover:-translate-y-0.5"
                >
                  Kumpulkan <CheckCircle className="w-5 h-5" />
                </button>
              )}
            </div>
            
            {Object.keys(selectedAnswers).length < quizData.questions.length && isLastQuestion && (
               <p className="text-center text-amber-600 text-sm font-bold mt-4 flex items-center justify-center gap-1.5">
                 <AlertTriangle className="w-4 h-4"/> Harap jawab semua pertanyaan sebelum mengumpulkan.
               </p>
            )}
          </div>
        ) : (
          /* --- HALAMAN HASIL (RESULT) --- */
          <div className="bg-white border border-slate-200 rounded-[2.5rem] p-8 md:p-12 shadow-xl text-center animate-fade-in-up">
            <div className={`w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg
              ${scoreData.percentage >= 70 ? 'bg-emerald-50 text-emerald-500 border border-emerald-200' : 'bg-amber-50 text-amber-500 border border-amber-200'}`}>
              <Award className="w-12 h-12" />
            </div>
            
            <h2 className="text-3xl font-black text-slate-900 mb-2">Kuis Selesai!</h2>
            <p className="text-slate-500 font-medium mb-8">Kamu telah menyelesaikan kuis {quizData.title}.</p>

            <div className="bg-slate-50 border border-slate-200 rounded-3xl p-8 mb-8 inline-block min-w-[250px]">
              <p className="text-sm font-extrabold text-slate-500 uppercase tracking-widest mb-2">Nilai Akhir</p>
              <div className={`text-6xl font-black ${scoreData.percentage >= 70 ? 'text-emerald-600' : 'text-amber-600'}`}>
                {scoreData.percentage}
              </div>
              <p className="text-sm font-bold text-slate-600 mt-3">Benar {scoreData.correct} dari {scoreData.total}</p>
            </div>

            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button 
                onClick={() => { setIsSubmitted(false); setCurrentIdx(0); setSelectedAnswers({}); }}
                className="px-8 py-4 rounded-xl font-bold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 shadow-sm transition-all flex items-center justify-center gap-2"
              >
                <RefreshCw className="w-5 h-5" /> Ulangi Kuis
              </button>
              <button 
                onClick={() => navigate(-1)}
                className="px-8 py-4 rounded-xl font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-md shadow-blue-500/20 transition-all transform hover:-translate-y-0.5"
              >
                Kembali ke Modul
              </button>
            </div>
          </div>
        )}
      </main>

      <style>{`
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fade-in-up { animation: fadeInUp 0.5s ease-out forwards; }
      `}</style>
    </div>
  );
}