import React, { useState, useRef, useEffect } from 'react';
import { Bot, Minus, MessageCircle, Send, Loader2, Maximize2, Minimize2 } from 'lucide-react';
import { GoogleGenerativeAI } from '@google/generative-ai';

// --- Setup Gemini API ---
const apiKey = import.meta.env.VITE_GEMINI_API_KEY || ""; 
const genAI = new GoogleGenerativeAI(apiKey);

// --- Data FAQ Chatbot (Fallback Cepat) ---
const chatbotFaqs = [
  { q: "Cara upgrade akun?", a: "Untuk upgrade, klik tombol 'Upgrade Sekarang' berkedip di atas, atau dari menu Profile." },
  { q: "Kapan sertifikat bisa diunduh?", a: "Otomatis setelah menyelesaikan progres 100% pada sebuah modul bahasa pemrograman." },
  { q: "Hubungi Admin?", a: "Kamu bisa menghubungi Admin via WhatsApp di +62 851-8320-9494 ya!" }
];

export default function CoreBot() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false); // State buat besar-kecilin ukuran
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [chatMessages, setChatMessages] = useState<{sender: 'bot' | 'user', text: string}[]>([
    { sender: 'bot', text: 'Halo! Saya CoreBot, asisten AI resmi dari Coreline. Ada yang bisa saya bantu hari ini?' }
  ]);

  // Auto-scroll ke pesan terbaru
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages, isChatOpen, isExpanded]);

  // --- Fungsi Penanganan FAQ (Instan) ---
  const handleAskFaq = (faq: {q: string, a: string}) => {
    setChatMessages(prev => [...prev, { sender: 'user', text: faq.q }]);
    setIsLoading(true);
    setTimeout(() => {
      setChatMessages(prev => [...prev, { sender: 'bot', text: faq.a }]);
      setIsLoading(false);
    }, 600);
  };

  // --- Fungsi Penanganan Input Bebas (Gemini AI) ---
  const handleSendMessage = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!inputText.trim() || isLoading) return;

    const userMessage = inputText.trim();
    setChatMessages(prev => [...prev, { sender: 'user', text: userMessage }]);
    setInputText("");
    setIsLoading(true);

    try {
      const model = genAI.getGenerativeModel({ model: "gemini-flash-lite-latest" });
      
      // --- SYSTEM PROMPT ---
      const prompt = `
        Kamu adalah CoreBot, asisten AI resmi untuk platform belajar coding "Coreline by AstByte". 
        Gunakan bahasa Indonesia yang santai, ramah, empati, namun tetap profesional (gunakan sapaan "kamu" atau "kak").
        
        Berikut adalah panduan pengetahuanmu tentang Coreline:
        1. Tentang Platform: Coreline by AstByte menyediakan tutorial dan kursus programming dari basic hingga expert (Web Dev, Mobile, Backend, DevOps, Data Science).
        2. Tingkat Membership: Terdapat tier Free, Pro, Plus, Ultra, dan Ultimate.
        3. Fitur Premium: 
           - Pro & Plus: Mendapat akses materi penuh, template portofolio, dan unduh sertifikat.
           - Ultra: Tambahan fitur Video Call Mentoring.
           - Ultimate: Tambahan Video Call dan Mentoring Offline.
        4. Sistem Prasyarat (Prerequisite): Beberapa modul lanjutan akan terkunci otomatis jika user belum menyelesaikan modul dasarnya (Contoh: React wajib lulus JS/TS dulu).
        5. Sertifikat: Otomatis terbuka dan bisa diunduh jika progres materi mencapai 100%.
        6. KONTAK ADMIN PENTING: Jika user bertanya tentang cara menghubungi admin, CS, error pembayaran, butuh bantuan teknis berlanjut, atau ingin menjadwalkan Video Call/Mentoring Offline, BERIKAN NOMOR WA INI: +62 851-8320-9494 (atau berikan link: https://wa.me/6285183209494).

        Pertanyaan dari user: "${userMessage}"
        
        Jawablah langsung ke intinya berdasarkan pengetahuan di atas. Jangan mengarang fitur yang tidak ada.
      `;

      const result = await model.generateContent(prompt);
      const botResponse = result.response.text();

      setChatMessages(prev => [...prev, { sender: 'bot', text: botResponse }]);
    } catch (error) {
      console.error("Error Gemini API:", error);
      setChatMessages(prev => [...prev, { 
        sender: 'bot', 
        text: 'Maaf ya, server AI kami sedang padat. Boleh coba ketik lagi pertanyaannya?' 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="fixed bottom-6 right-6 z-[9999] isolation-auto">
        {isChatOpen ? (
          <div 
            className={`bg-white rounded-2xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] origin-bottom-right chat-lux-anim
              ${isExpanded 
                ? 'w-[90vw] md:w-[600px] h-[80vh] md:h-[700px]' // Ukuran membesar
                : 'w-80 sm:w-[26rem] h-[500px]' // Ukuran normal
              }
            `}
          >
            
            {/* Header Bot */}
            <div className="bg-gradient-to-r from-blue-600 to-cyan-500 p-4 flex items-center justify-between text-white shrink-0 shadow-sm transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-white/20 rounded-full flex items-center justify-center shadow-inner">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-sm tracking-wide">CoreBot AI</h3>
                  <div className="flex items-center gap-1.5 text-[10px] font-medium text-blue-100">
                    <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse shadow-[0_0_8px_rgba(74,222,128,0.8)]"></span> Sedang Online
                  </div>
                </div>
              </div>
              
              {/* Kumpulan Tombol Aksi (Maximize & Close) */}
              <div className="flex items-center gap-1">
                <button 
                  onClick={() => setIsExpanded(!isExpanded)} 
                  className="hover:bg-white/20 p-2 rounded-xl transition-all"
                  title={isExpanded ? "Perkecil Chat" : "Perbesar Chat"}
                >
                  {isExpanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                </button>
                <button 
                  onClick={() => setIsChatOpen(false)} 
                  className="hover:bg-white/20 p-2 rounded-xl transition-all"
                  title="Tutup Chat"
                >
                  <Minus className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Area Pesan (Scrollable) */}
            <div className="flex-1 overflow-y-auto p-4 bg-slate-50/50 flex flex-col gap-4">
              {chatMessages.map((msg, i) => (
                <div key={i} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} animate-message-pop`}>
                  <div className={`max-w-[85%] p-3.5 rounded-2xl text-sm leading-relaxed shadow-sm ${
                    msg.sender === 'user' 
                      ? 'bg-blue-600 text-white rounded-br-sm' 
                      : 'bg-white border border-slate-200 text-slate-700 rounded-bl-sm'
                  }`}>
                    <span dangerouslySetInnerHTML={{ 
                      __html: msg.text.replace(/(https?:\/\/[^\s]+)/g, "<a href='$1' target='_blank' class='underline font-bold text-blue-400 hover:text-blue-300'>$1</a>") 
                    }} />
                  </div>
                </div>
              ))}
              
              {/* Indikator Loading */}
              {isLoading && (
                <div className="flex justify-start animate-pulse">
                  <div className="bg-white border border-slate-200 text-slate-500 p-3.5 rounded-2xl rounded-bl-sm shadow-sm flex items-center gap-2.5">
                    <Loader2 className="w-4 h-4 animate-spin text-blue-500" />
                    <span className="text-xs font-bold tracking-wide">Sedang mengetik...</span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area & FAQ */}
            <div className="bg-white border-t border-slate-100 shrink-0">
              {/* FAQ Horizontal Scroll */}
              <div className="flex gap-2 overflow-x-auto p-3 scrollbar-hide border-b border-slate-50">
                {chatbotFaqs.map((faq, i) => (
                  <button 
                    key={i} 
                    onClick={() => handleAskFaq(faq)} 
                    disabled={isLoading}
                    className="whitespace-nowrap text-[11px] text-blue-700 bg-blue-50 hover:bg-blue-100 px-3.5 py-2 rounded-full transition-colors font-bold border border-blue-100 disabled:opacity-50"
                  >
                    {faq.q}
                  </button>
                ))}
              </div>

              {/* Input Form */}
              <form onSubmit={handleSendMessage} className="p-3 flex gap-2 items-center">
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="Tanya seputar Coreline..."
                  disabled={isLoading}
                  className="flex-1 bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-sm font-medium focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all disabled:bg-slate-100"
                />
                <button 
                  type="submit"
                  disabled={!inputText.trim() || isLoading}
                  className="p-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg flex-shrink-0"
                >
                  <Send className="w-5 h-5" />
                </button>
              </form>
            </div>
            
          </div>
        ) : (
          /* Tombol Floating / Bulat di Pojok */
          <button 
            onClick={() => setIsChatOpen(true)} 
            className="bg-gradient-to-br from-blue-500 to-blue-700 text-white p-4 rounded-full shadow-[0_10px_40px_-10px_rgba(59,130,246,0.8)] hover:scale-110 transition-all duration-300 flex items-center justify-center group border border-blue-400 relative" 
            title="Buka Chat AI"
          >
             <MessageCircle className="w-7 h-7" />
             <span className="absolute top-0 right-0 w-3.5 h-3.5 bg-red-500 border-2 border-white rounded-full animate-pulse"></span>
             
             <span className="absolute right-full mr-4 bg-slate-800 text-white text-xs font-bold px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none hidden md:block shadow-lg">
               Ada kendala? Tanya CoreBot di sini.
             </span>
          </button>
        )}
      </div>

      {/* --- INLINE STYLE UNTUK ANIMASI MEWAH --- */}
      <style>{`
        /* Animasi masuk jendela chat yang smooth & bouncy */
        @keyframes chatLuxPop {
          0% { opacity: 0; transform: scale(0.8) translateY(20px); }
          60% { opacity: 1; transform: scale(1.02) translateY(-5px); }
          100% { opacity: 1; transform: scale(1) translateY(0); }
        }
        .chat-lux-anim {
          animation: chatLuxPop 0.5s cubic-bezier(0.23, 1, 0.32, 1) forwards;
        }

        /* Animasi pop-up ringan untuk setiap bubble chat baru */
        @keyframes messagePop {
          0% { opacity: 0; transform: translateY(10px) scale(0.95); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
        .animate-message-pop {
          animation: messagePop 0.3s ease-out forwards;
        }

        /* Hide scrollbar untuk FAQ biar bersih */
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </>
  );
}