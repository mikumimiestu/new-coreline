import React, { useState, useRef, useEffect } from 'react';
import { Bot, Minus, MessageCircle, Send, Loader2, Maximize2, Minimize2, Timer } from 'lucide-react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { useAuth } from '../contexts/AuthContext';

// --- Setup Gemini API ---
const apiKey = import.meta.env.VITE_GEMINI_API_KEY || ""; 
const genAI = new GoogleGenerativeAI(apiKey);
const AUTHX_BASE = 'https://authx.astbyte.com';

// --- Data FAQ Chatbot (Fallback Cepat) ---
const chatbotFaqs = [
  { q: "Cara upgrade akun?", a: "Untuk upgrade, klik tombol 'Upgrade Sekarang' berkedip di atas, atau dari menu Profile." },
  { q: "Kapan sertifikat bisa diunduh?", a: "Otomatis setelah menyelesaikan progres 100% pada sebuah modul bahasa pemrograman." },
  { q: "Hubungi Admin?", a: "Kamu bisa menghubungi Admin via WhatsApp di +62 851-8320-9494 ya!" }
];

export default function CoreBot() {
  const { user } = useAuth();
  
  // State UI & Chat
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // --- STATE RATE LIMIT (Batas Pertanyaan) ---
  const [askCount, setAskCount] = useState(0);
  const [cooldownTime, setCooldownTime] = useState(0);

  // State User Data untuk AI Context
  const [userData, setUserData] = useState<any>(null);
  const [userSubs, setUserSubs] = useState<any[]>([]);
  const [userProgress, setUserProgress] = useState<Record<string, number>>({});

  const [chatMessages, setChatMessages] = useState<{sender: 'bot' | 'user', text: string}[]>([
    { sender: 'bot', text: 'Halo! Saya CoreBot, asisten AI resmi dari Coreline. Ada yang bisa saya bantu hari ini?' }
  ]);

  // --- 1. Fetch User Data saat komponen load ---
  useEffect(() => {
    const token = localStorage.getItem('astbyte_token') || (user as any)?.token;
    if (!token) return;

    async function fetchUserData() {
      try {
        const meRes = await fetch(`${AUTHX_BASE}/api/auth/me`, { headers: { Authorization: `Bearer ${token}` } });
        const meData = await meRes.json();
        if (meRes.ok) setUserData(meData.data.user);

        const subRes = await fetch(`${AUTHX_BASE}/api/subscriptions/me`, { headers: { Authorization: `Bearer ${token}` } });
        const subData = await subRes.json();
        if (subRes.ok && subData?.data?.subscriptions) setUserSubs(subData.data.subscriptions);

        const progRes = await fetch(`${AUTHX_BASE}/api/learning/progress`, { headers: { Authorization: `Bearer ${token}` } });
        const progData = await progRes.json();
        if (progRes.ok) setUserProgress(progData.data || {});
        
      } catch (e) {
        console.error('CoreBot failed to fetch user data:', e);
      }
    }

    fetchUserData();
  }, [user]);

  // --- 2. Logic Countdown Timer untuk Cooldown ---
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (cooldownTime > 0) {
      timer = setInterval(() => {
        setCooldownTime((prev) => {
          if (prev <= 1) {
            setAskCount(0); // Reset hitungan pertanyaan kalau cooldown kelar
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [cooldownTime]);

  // Auto-scroll ke pesan terbaru
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages, isChatOpen, isExpanded]);

  // --- 3. Fungsi Formatting Teks Biar Rapi ---
  const formatBotMessage = (text: string) => {
    if (!text) return '';
    return text
      .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>') // Format Bold
      .replace(/\*([^*]+)\*/g, '<em>$1</em>') // Format Italic
      .replace(/(https?:\/\/[^\s]+)/g, "<a href='$1' target='_blank' class='underline font-bold text-blue-500 hover:text-blue-700 transition-colors'>$1</a>") // Format Link
      // Hapus replace newline (\n) dengan <br> karena kita pakai CSS 'whitespace-pre-wrap' biar list otomatis rapi
  };

  // --- Fungsi Penanganan FAQ (Instan) ---
  const handleAskFaq = (faq: {q: string, a: string}) => {
    if (cooldownTime > 0) return; // Cegah klik FAQ saat cooldown

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
    if (!inputText.trim() || isLoading || cooldownTime > 0) return;

    const userMessage = inputText.trim();
    setChatMessages(prev => [...prev, { sender: 'user', text: userMessage }]);
    setInputText("");
    setIsLoading(true);

    try {
      const model = genAI.getGenerativeModel({ model: "gemini-flash-lite-latest" });
      
      let userContextString = "Status Pengguna: Belum Login / Guest.";
      if (userData) {
        userContextString = `
        INFORMASI PENGGUNA YANG SEDANG MENYAPA KAMU:
        - Nama: ${userData.full_name || 'User'}
        - Email: ${userData.email}
        - Tipe Member: ${userData.subscription_type || 'Free'}
        - Status Langganan: ${userData.subscription_status || 'Tidak Aktif'}
        - Total Riwayat Transaksi: ${userSubs.length}
        - ID Publik: ${userData.public_id || '-'}
        - Data Progress Belajar: ${JSON.stringify(userProgress)}
        `;
      }

      // --- SYSTEM PROMPT ---
      const prompt = `
        Kamu adalah CoreBot, asisten AI resmi untuk platform belajar coding "Coreline by AstByte". 
        Gunakan bahasa Indonesia yang santai, ramah, empati, namun tetap profesional. Cukup berikan jawaban yang jelas, singkat, dan mudah dipahami. Jika tidak tahu jawabannya, jujur saja bilang tidak tahu, jangan coba-coba buat jawaban palsu, dan pastikan tidak selalu memberikan jawaban beserta data user.
        
        ${userContextString}

        Panduan pengetahuan:
        1. Fitur Premium: Pro/Plus (Akses materi penuh, sertifikat), Ultra (Mentoring Online), Ultimate (Mentoring Offline & Online).
        2. Sertifikat otomatis bisa diunduh jika modul mencapai 100%.
        3. Kontak CS/Admin: WA di +62 851-8320-9494.

        Instruksi Formatting WAJIB:
        - Gunakan paragraf yang pendek dan berikan jeda baris (Enter) antar paragraf agar mudah dibaca.
        - Jika membuat daftar (list), gunakan tanda strip (-) dan buat baris baru untuk setiap poin.
        - Panggil user dengan nama depannya.
        
        Pertanyaan user: "${userMessage}"
      `;

      const result = await model.generateContent(prompt);
      const botResponse = result.response.text();

      setChatMessages(prev => [...prev, { sender: 'bot', text: botResponse }]);

      // --- Eksekusi Rate Limit ---
      const newCount = askCount + 1;
      setAskCount(newCount);
      if (newCount >= 3) {
        setCooldownTime(30); // Set cooldown 30 detik
      }

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
      {/* Container utama dengan position: fixed biar nempel di pojok kanan bawah layar */}
      <div className="fixed bottom-6 right-6 z-[9999] flex flex-col items-end">
        {isChatOpen ? (
          <div 
            className={`bg-white rounded-2xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] origin-bottom-right chat-lux-anim
              ${isExpanded 
                ? 'w-[90vw] md:w-[600px] h-[80vh] md:h-[700px]'
                : 'w-80 sm:w-[26rem] h-[500px]'
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
              
              <div className="flex items-center gap-1">
                <button onClick={() => setIsExpanded(!isExpanded)} className="hover:bg-white/20 p-2 rounded-xl transition-all">
                  {isExpanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                </button>
                <button onClick={() => setIsChatOpen(false)} className="hover:bg-white/20 p-2 rounded-xl transition-all">
                  <Minus className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Area Pesan */}
            <div className="flex-1 overflow-y-auto p-4 bg-slate-50/50 flex flex-col gap-4">
              {chatMessages.map((msg, i) => (
                <div key={i} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} animate-message-pop`}>
                  <div className={`max-w-[85%] p-3.5 rounded-2xl text-sm leading-relaxed shadow-sm whitespace-pre-wrap ${
                    msg.sender === 'user' 
                      ? 'bg-blue-600 text-white rounded-br-sm' 
                      : 'bg-white border border-slate-200 text-slate-800 rounded-bl-sm'
                  }`}>
                    <span dangerouslySetInnerHTML={{ 
                      __html: msg.sender === 'bot' ? formatBotMessage(msg.text) : formatBotMessage(msg.text)
                    }} />
                  </div>
                </div>
              ))}
              
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

            {/* Area Notifikasi Cooldown */}
            {cooldownTime > 0 && (
              <div className="bg-amber-50 border-t border-amber-200 p-2.5 flex items-center justify-center gap-2 text-amber-700 text-xs font-bold shrink-0 animate-pulse">
                <Timer className="w-4 h-4" />
                <span>Limit tercapai. Tunggu {cooldownTime} detik lagi ya!</span>
              </div>
            )}

            {/* Input Area & FAQ */}
            <div className="bg-white border-t border-slate-100 shrink-0">
              <div className="flex gap-2 overflow-x-auto p-3 scrollbar-hide border-b border-slate-50">
                {chatbotFaqs.map((faq, i) => (
                  <button 
                    key={i} 
                    onClick={() => handleAskFaq(faq)} 
                    disabled={isLoading || cooldownTime > 0}
                    className="whitespace-nowrap text-[11px] text-blue-700 bg-blue-50 hover:bg-blue-100 px-3.5 py-2 rounded-full transition-colors font-bold border border-blue-100 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {faq.q}
                  </button>
                ))}
              </div>

              <form onSubmit={handleSendMessage} className="p-3 flex gap-2 items-center">
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder={cooldownTime > 0 ? "Bentar ya, lagi cooldown..." : "Tanya seputar Coreline..."}
                  disabled={isLoading || cooldownTime > 0}
                  className="flex-1 bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-sm font-medium focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all disabled:bg-slate-100 disabled:cursor-not-allowed"
                />
                <button 
                  type="submit"
                  disabled={!inputText.trim() || isLoading || cooldownTime > 0}
                  className="p-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg flex-shrink-0"
                >
                  <Send className="w-5 h-5" />
                </button>
              </form>
            </div>
            
          </div>
        ) : (
          <button 
            onClick={() => setIsChatOpen(true)} 
            className="bg-gradient-to-br from-blue-500 to-blue-700 text-white p-4 rounded-full shadow-[0_10px_40px_-10px_rgba(59,130,246,0.8)] hover:scale-110 transition-all duration-300 flex items-center justify-center group border border-blue-400 relative" 
          >
             <MessageCircle className="w-7 h-7" />
             <span className="absolute top-0 right-0 w-3.5 h-3.5 bg-red-500 border-2 border-white rounded-full animate-pulse"></span>
             
             <span className="absolute right-full mr-4 bg-slate-800 text-white text-xs font-bold px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none hidden md:block shadow-lg">
               Ada kendala? Tanya CoreBot di sini.
             </span>
          </button>
        )}
      </div>

      <style>{`
        @keyframes chatLuxPop {
          0% { opacity: 0; transform: scale(0.8) translateY(20px); }
          60% { opacity: 1; transform: scale(1.02) translateY(-5px); }
          100% { opacity: 1; transform: scale(1) translateY(0); }
        }
        .chat-lux-anim { animation: chatLuxPop 0.5s cubic-bezier(0.23, 1, 0.32, 1) forwards; }
        @keyframes messagePop {
          0% { opacity: 0; transform: translateY(10px) scale(0.95); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
        .animate-message-pop { animation: messagePop 0.3s ease-out forwards; }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </>
  );
}