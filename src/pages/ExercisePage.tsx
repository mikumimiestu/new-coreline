import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, PenTool, Play, CheckCircle, 
  Terminal, FileCode, AlertCircle, Loader2
} from 'lucide-react';

// --- MOCK DATA LATIHAN ---
const MOCK_EXERCISE = {
  title: "Hello World Function",
  description: "Buatlah sebuah fungsi JavaScript bernama `sayHello` yang mengembalikan string `'Hello World!'`.",
  expectedOutput: "Hello World!",
  initialCode: "// Tulis kodemu di bawah ini:\nfunction sayHello() {\n  \n}\n\n// console.log(sayHello());"
};

export default function ExercisePage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [code, setCode] = useState(MOCK_EXERCISE.initialCode);
  const [isExecuting, setIsExecuting] = useState(false);
  const [output, setOutput] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState<boolean | null>(null);

  useEffect(() => {
    document.title = 'Latihan Praktik | Coreline';
    window.scrollTo(0, 0);
  }, [id]);

  const handleRunCode = () => {
    setIsExecuting(true);
    setOutput(null);
    setIsSuccess(null);

    // Simulasi proses eksekusi kode (Mock)
    setTimeout(() => {
      // Logic bohongan ngecek kode
      if (code.includes("return 'Hello World!'") || code.includes('return "Hello World!"')) {
        setOutput("> Executing code...\n> Output: 'Hello World!'\n\n✅ Test passed!");
        setIsSuccess(true);
      } else {
        setOutput("> Executing code...\n> Output: undefined\n\n❌ Test failed. Pastikan function mengembalikan 'Hello World!'.");
        setIsSuccess(false);
      }
      setIsExecuting(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-sky-50 text-blue-950 font-bold font-sans selection:bg-blue-500/30 relative flex flex-col">
      {/* Navbar Minimalis */}
      <nav className="sticky top-0 z-50 border-b border-blue-900 bg-white/80 backdrop-blur-xl shadow-[4px_4px_0px_#1e3a8a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-amber-600 transition-colors bg-white hover:bg-amber-50 px-4 py-2 rounded-none border-2 border-blue-900 border-blue-900 shadow-[4px_4px_0px_#1e3a8a] hover:shadow-[4px_4px_0px_#1e3a8a]">
            <ArrowLeft className="w-4 h-4" /> Batal & Kembali
          </button>
          <div className="flex items-center gap-2 font-black text-blue-950 font-bold">
            <PenTool className="w-5 h-5 text-amber-500" /> Latihan Praktik
          </div>
        </div>
      </nav>

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-8 flex flex-col lg:flex-row gap-6 lg:gap-8">
        
        {/* PANEL KIRI: Task Description */}
        <div className="lg:w-1/3 flex flex-col gap-6">
          <div className="bg-white border-2 border-blue-900 border-blue-900 rounded-none p-6 md:p-8 shadow-[4px_4px_0px_#1e3a8a]">
            <div className="flex items-center gap-2 text-amber-600 text-sm font-extrabold uppercase tracking-widest mb-4">
               <FileCode className="w-5 h-5" /> Tugas {id?.split('-').pop()}
            </div>
            <h1 className="text-2xl font-black text-blue-950 font-bold mb-4">{MOCK_EXERCISE.title}</h1>
            <p className="text-blue-950 font-bold font-medium leading-relaxed mb-6">
              {MOCK_EXERCISE.description}
            </p>
            
            <div className="bg-sky-50 border-2 border-blue-900 border-blue-900 rounded-none p-4">
              <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Expected Output:</p>
              <code className="text-sm font-mono font-bold text-blue-950 font-bold bg-white px-3 py-1.5 rounded-none border-2 border-blue-900 border-blue-900 block shadow-[4px_4px_0px_#1e3a8a]">
                {MOCK_EXERCISE.expectedOutput}
              </code>
            </div>
          </div>

          {/* Sukses Alert (Jika berhasil) */}
          {isSuccess && (
            <div className="bg-emerald-50 border-2 border-blue-900 border-emerald-200 rounded-none p-6 shadow-[4px_4px_0px_#1e3a8a] animate-fade-in-up text-center">
              <div className="w-12 h-12 bg-emerald-100 rounded-none flex items-center justify-center mx-auto mb-3">
                <CheckCircle className="w-6 h-6 text-emerald-600" />
              </div>
              <h3 className="font-bold text-emerald-800 mb-2">Kerja Bagus!</h3>
              <p className="text-emerald-600 text-sm font-medium mb-4">Kamu telah menyelesaikan latihan ini dengan benar.</p>
              <button 
                onClick={() => navigate(-1)}
                className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-none shadow-[4px_4px_0px_#1e3a8a] transition-colors"
              >
                Kembali ke Modul
              </button>
            </div>
          )}
        </div>

        {/* PANEL KANAN: Editor & Console */}
        <div className="lg:w-2/3 flex flex-col gap-4">
          
          {/* EDITOR AREA */}
          <div className="flex-1 bg-slate-900 rounded-none overflow-hidden border-2 border-blue-900 border-blue-900 shadow-[4px_4px_0px_#1e3a8a] flex flex-col min-h-[400px]">
            {/* Editor Header */}
            <div className="bg-slate-950 px-6 py-3 flex items-center justify-between border-b border-blue-900">
              <div className="flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-none bg-red-500/80"></div>
                  <div className="w-3 h-3 rounded-none bg-yellow-500/80"></div>
                  <div className="w-3 h-3 rounded-none bg-green-500/80"></div>
                </div>
                <span className="ml-4 text-xs font-bold text-slate-500 font-mono tracking-wider">main.js</span>
              </div>
              <button
                onClick={handleRunCode}
                disabled={isExecuting}
                className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs px-4 py-1.5 rounded-none transition-colors shadow-[4px_4px_0px_#1e3a8a] disabled:opacity-50"
              >
                {isExecuting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Play className="w-4 h-4 fill-current" />}
                RUN CODE
              </button>
            </div>
            
            {/* Textarea Code */}
            <div className="flex-1 relative p-4">
               <textarea
                 value={code}
                 onChange={(e) => setCode(e.target.value)}
                 spellCheck={false}
                 className="w-full h-full min-h-[300px] bg-transparent text-slate-200 font-mono text-sm leading-relaxed outline-none resize-none"
                 style={{ fontFamily: "'Fira Code', 'Courier New', Courier, monospace" }}
               />
            </div>
          </div>

          {/* CONSOLE / OUTPUT AREA */}
          <div className="bg-white border-2 border-blue-900 border-blue-900 rounded-none p-6 shadow-[4px_4px_0px_#1e3a8a] min-h-[150px]">
             <div className="flex items-center gap-2 text-slate-500 text-xs font-black uppercase tracking-widest mb-3">
               <Terminal className="w-4 h-4" /> Output Console
             </div>
             
             {isExecuting ? (
               <div className="flex items-center gap-3 text-slate-400 font-mono text-sm p-4 bg-sky-50 rounded-none border-2 border-blue-900 border-blue-900">
                 <Loader2 className="w-4 h-4 animate-spin" /> Menjalankan kode...
               </div>
             ) : output ? (
               <pre className={`font-mono text-sm p-4 rounded-none whitespace-pre-wrap ${isSuccess ? 'bg-emerald-50 text-emerald-800 border-2 border-blue-900 border-emerald-100' : 'bg-red-50 text-red-800 border-2 border-blue-900 border-red-100'}`}>
                 {output}
               </pre>
             ) : (
               <div className="text-slate-400 italic text-sm p-4 bg-sky-50 rounded-none border-2 border-blue-900 border-blue-900 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4" /> Klik "RUN CODE" untuk melihat hasil eksekusi.
               </div>
             )}
          </div>
        </div>

      </main>

      <style>{`
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fade-in-up { animation: fadeInUp 0.4s ease-out forwards; }
      `}</style>
    </div>
  );
}