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
    'py-01': {
      title: "Kuis: Modul 1 - Setup & Filosofi",
      questions: [
        {
          id: 1,
          question: "Apa fungsi utama dari Virtual Environment (.venv)?",
          options: [
            "Meningkatkan kecepatan eksekusi kode Python",
            "Mengisolasi dependensi proyek agar tidak terjadi bentrok",
            "Mengubah kode Python menjadi bytecode",
            "Menjalankan program secara global di OS"
          ],
          correctAnswer: 1
        },
        {
          id: 2,
          question: "Mengapa kita perlu menggunakan blok 'if __name__ == \"__main__\":' pada struktur file profesional?",
          options: [
            "Agar file aman dan tidak otomatis tereksekusi saat di-import oleh modul lain",
            "Untuk mendeklarasikan variabel global",
            "Sebagai syarat utama membuat fungsi main() di Python",
            "Agar kode bisa dibaca oleh interpreter C-Python"
          ],
          correctAnswer: 0
        }
      ]
    },
    'py-02': {
      title: "Kuis: Modul 2 - Tipe Data & Variabel",
      questions: [
        {
          id: 1,
          question: "Manakah dari berikut ini yang merupakan tipe data Mutable (bisa diubah isinya)?",
          options: ["String", "Tuple", "List", "Integer"],
          correctAnswer: 2
        },
        {
          id: 2,
          question: "Jika variabel dideklarasikan 'x = 10', lalu kita ubah 'x = 20', apa yang sebenarnya terjadi di memori Python?",
          options: [
            "Nilai objek 10 langsung ditimpa menjadi 20",
            "Python membuat objek baru bernilai 20 dan memindahkan label 'x' ke objek tersebut",
            "Akan terjadi error karena Integer itu Immutable",
            "Memori akan menyimpan dua nilai di alamat yang sama"
          ],
          correctAnswer: 1
        }
      ]
    },
    'py-03': {
      title: "Kuis: Modul 3 - Control Flow",
      questions: [
        {
          id: 1,
          question: "Apa keunggulan utama dari Structural Pattern Matching (match-case) di Python 3.10+ dibandingkan if-else biasa?",
          options: [
            "Bisa membedah dan melakukan unpacking pada struktur data secara langsung",
            "Mengeksekusi kode jauh lebih cepat pada operasi matematika",
            "Hanya bisa digunakan untuk mengecek tipe data primitif",
            "Menggantikan fungsi if sepenuhnya dalam semua kasus"
          ],
          correctAnswer: 0
        },
        {
          id: 2,
          question: "Apa kegunaan utama dari fungsi zip() saat melakukan iterasi (looping)?",
          options: [
            "Mengkompres file kode Python",
            "Mendapatkan index dari setiap iterasi data",
            "Mengurutkan data berdasarkan abjad",
            "Menggabungkan dua atau lebih list agar bisa diiterasi secara paralel"
          ],
          correctAnswer: 3
        }
      ]
    },
    'py-04': {
      title: "Kuis: Modul 4 - Data Structures",
      questions: [
        {
          id: 1,
          question: "Mengapa mengecek keanggotaan data ('if x in data') menggunakan tipe 'Set' jauh lebih cepat daripada 'List'?",
          options: [
            "Karena Set memiliki kompleksitas O(1) berbasis Hash Table",
            "Karena Set mengurutkan datanya dari A-Z secara otomatis",
            "Karena Set hanya bisa diisi dengan angka",
            "Karena Set ditulis langsung dengan bahasa mesin"
          ],
          correctAnswer: 0
        },
        {
          id: 2,
          question: "Apa output dari List Comprehension berikut: [x**2 for x in range(3)]",
          options: [
            "[1, 2, 3]", 
            "[0, 2, 4]", 
            "[0, 1, 4]", 
            "[1, 4, 9]"
          ],
          correctAnswer: 2
        }
      ]
    },
    'py-05': {
      title: "Kuis: Modul 5 - Advanced Functions",
      questions: [
        {
          id: 1,
          question: "Apa perbedaan mendasar antara keyword 'return' dan 'yield' dalam Python?",
          options: [
            "yield menghasilkan error jika data kosong, return mengembalikan list kosong",
            "return mengakhiri fungsi, sedangkan yield menjeda fungsi dan menyimpannya di memori (Lazy Evaluation)",
            "keduanya melakukan hal yang sama persis",
            "yield hanya bisa mengembalikan nilai string"
          ],
          correctAnswer: 1
        },
        {
          id: 2,
          question: "Bagaimana mekanisme utama sebuah fungsi Decorator bekerja?",
          options: [
            "Menghapus fungsi target dari memori",
            "Mengubah fungsi biasa menjadi sebuah Class object",
            "Membungkus fungsi target untuk memodifikasi kelakuannya tanpa harus merubah kode asli fungsi tersebut",
            "Mempercepat proses kompilasi kode saat dijalankan"
          ],
          correctAnswer: 2
        }
      ]
    },
    'py-06': {
      title: "Kuis: Modul 6 - OOP Mastery",
      questions: [
        {
          id: 1,
          question: "Kapan waktu yang paling umum untuk menggunakan decorator '@classmethod'?",
          options: [
            "Untuk memanipulasi variabel instance (self) secara langsung",
            "Untuk membuat Alternative Constructors (cara lain membuat objek)",
            "Untuk menghitung operasi matematika dasar",
            "Untuk menghapus objek dari memori (Garbage Collection)"
          ],
          correctAnswer: 1
        },
        {
          id: 2,
          question: "Mengapa di Python lebih disarankan menggunakan '@property' dibandingkan langsung membuat variabel public (misal: self.gaji = 500)?",
          options: [
            "Karena @property memperbolehkan kita menyisipkan validasi logika (Setter) tanpa mengubah cara pemanggilan variabelnya",
            "Agar variabel otomatis terenkripsi di memori",
            "Hanya karena terlihat lebih estetik",
            "Membuat kode kompatibel dengan bahasa Java"
          ],
          correctAnswer: 0
        }
      ]
    },
    'py-07': {
      title: "Kuis: Modul 7 - Exceptions & Managers",
      questions: [
        {
          id: 1,
          question: "Pada struktur Exception 'try-except-else-finally', kapankah blok 'else' akan dieksekusi?",
          options: [
            "Hanya jika terjadi error tipe ValueError",
            "Selalu dieksekusi di akhir program tidak peduli ada error atau tidak",
            "Hanya jika blok 'try' berhasil dieksekusi tanpa memicu error sama sekali",
            "Saat program mengalami crash sistem"
          ],
          correctAnswer: 2
        },
        {
          id: 2,
          question: "Di dalam Custom Context Manager (blok 'with'), apa kegunaan parameter dalam fungsi '__exit__'?",
          options: [
            "Untuk membuka koneksi database",
            "Untuk mendeklarasikan variabel global",
            "Menjalankan perulangan while secara otomatis",
            "Menangkap dan menangani tipe exception, nilai error, dan traceback jika terjadi masalah di dalam blok with"
          ],
          correctAnswer: 3
        }
      ]
    },
    'py-08': {
      title: "Kuis: Modul 8 - Asyncio",
      questions: [
        {
          id: 1,
          question: "Apa perbedaan utama antara 'time.sleep()' dan 'asyncio.sleep()'?",
          options: [
            "time.sleep() memblokir seluruh proses (synchronous), sedangkan asyncio.sleep() tidak memblokir (non-blocking) sehingga CPU bisa mengerjakan tugas lain",
            "asyncio.sleep() dieksekusi lebih lambat dari time.sleep()",
            "time.sleep() digunakan khusus untuk request internet",
            "Tidak ada bedanya, fungsinya sama persis"
          ],
          correctAnswer: 0
        },
        {
          id: 2,
          question: "Fungsi apa yang umum digunakan untuk menjalankan/mengeksekusi coroutine async dari luar (lingkungan synchronous)?",
          options: [
            "await main()",
            "asyncio.start(main())",
            "asyncio.run(main())",
            "Thread.start(main())"
          ],
          correctAnswer: 2
        }
      ]
    }
  };

  // Cek apakah ada data persis sesuai ID
  if (QUIZZES_DB[id]) return QUIZZES_DB[id];

  // Kalau tidak ada di DB, generate kuis dinamis berdasarkan ID-nya (Fallback)
  return {
    title: `Kuis Evaluasi: ${id}`,
    questions: [
      {
        id: 1,
        question: `Pertanyaan terkait proyek atau studi kasus di modul ${id}. Apakah fungsi utamanya?`,
        options: ["Pilihan A", "Pilihan B", "Pilihan C", "Implementasi Praktik Terbaik"],
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
            <p className="text-slate-500 font-medium mb-8">Kamu telah menyelesaikan {quizData.title}.</p>

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