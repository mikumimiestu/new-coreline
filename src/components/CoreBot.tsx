import React, { useState, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Bot, Minus, MessageCircle, Send, Loader2, Maximize2, Minimize2, Timer, Settings2, Cpu, BrainCircuit, Sparkles, ChevronDown, Terminal, Info } from 'lucide-react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { useAuth } from '../contexts/AuthContext';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

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
  
  const location = useLocation();
  
  // Jangan tampilkan widget melayang jika sedang di halaman chat khusus Lyra
  if (location.pathname === '/lyra') return null;

  // State Thinking
  const [isThinking, setIsThinking] = useState(false);

  const [chatMessages, setChatMessages] = useState<{sender: 'bot' | 'user', text: string, model?: 'Lyra', thought?: string}[]>([
    { sender: 'bot', text: 'Halo! Saya Lyra Nebula 31B, asisten AI resmi dari Coreline. Ada yang bisa saya bantu hari ini?', model: 'Lyra' }
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

  // --- 3. Fungsi Formatting Teks ---
  // Kita pakai ReactMarkdown sekarang, tapi tetap simpan helper jika butuh post-processing
  const formatBotMessage = (text: string) => {
    if (!text) return '';
    return text; // ReactMarkdown handles formatting
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

  // --- Fungsi Pemanggilan Gemma (Gemma 4 31B Engine) ---
  const callGemma = async (prompt: string, systemInstruction: string) => {
    const model = genAI.getGenerativeModel({ 
      model: "gemma-4-31b-it",
      systemInstruction: systemInstruction 
    });
    const result = await model.generateContent(prompt);
    return result.response.text();
  };

  // --- Fungsi Penanganan Input Bebas ---
  const handleSendMessage = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!inputText.trim() || isLoading || cooldownTime > 0) return;

    const userMessage = inputText.trim();
    setChatMessages(prev => [...prev, { sender: 'user', text: userMessage }]);
    setInputText("");
    setIsLoading(true);
    setIsThinking(true);

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

    const projectSummary = `
      INTERNAL PROJECT CONTEXT (Coreline v2):
      - Framework: Vite + React (TypeScript).
      - Main Routes: Dashboard (/), Profile (/profile), Materials (/materials/:id), Quiz (/quiz/:id), Pricing (/pricing).
      - Specialized Pages: Offline Mentoring (/offline-mentoring), Priority Member (/priority-member), Tutorial (/tutorial).
      - Components: CoreBot (You are here), Dashboard (LMS Catalog), MaterialContent (Reading).
    `;

    const systemPrompt = `
      Kamu adalah Lyra Nebula 31B, asisten AI resmi Coreline by AstByte.
      Kamu terintegrasi ke dalam sistem project dengan struktur berikut:
      ${projectSummary}
      
      IDENTITAS USER REAL-TIME:
      ${userContextString}
      
      TUGAS UTAMA:
      1. Membantu navigasi platform Coreline (Arahkan ke route yang sesuai jika user bertanya).
      2. Menjawab pertanyaan teknis coding.
      3. Memberikan motivasi berdasarkan progres belajar user.
      
      ATURAN FORMATTING (WAJIB):
      - Responmu HARUS mengikuti format ini:
      
      [THOUGHT]
      (Tuliskan analisis data user dan rencana jawabanmu di sini. JANGAN tampilkan bagian ini ke user secara langsung.)
      
      [RESPONSE]
      (Tuliskan jawaban ramah dalam Bahasa Indonesia di sini. Mulai dengan "Halo [Nama]!" atau sapaan akrab lainnya.)
      
      PENTING: Jangan menulis teks apapun sebelum tag [THOUGHT].

      DATA PENGETAHUAN:
      - Premium: Pro/Plus (Materi & Sertifikat), Ultra (Online Mentor), Ultimate (Offline & Online Mentor).
      - Sertifikat: Otomatis jika modul 100%.
      - CS: WA +62 851-8320-9494.
      - Katalog: Python, JS, TS, Go, React, Next.js, UI/UX, Product Mgmt, dll.
    `;

    // --- LOGIKA LIMIT BERDASARKAN PAKET ---
    const subType = (userData?.subscription_type || 'free').toLowerCase();
    const limits: Record<string, number> = {
      'free': 5,
      'pro': 30,
      'plus': 60,
      'ultra': 120,
      'ultimate': 999
    };
    const maxAsk = limits[subType] || 5;

    if (askCount >= maxAsk) {
      setChatMessages(prev => [...prev, { 
        sender: 'bot', 
        text: `Maaf ${userData?.full_name?.split(' ')[0] || 'User'}, kamu sudah mencapai batas pertanyaan harian untuk paket **${subType.toUpperCase()}** (${maxAsk} pertanyaan). Silakan upgrade paketmu untuk kuota yang lebih besar! 🚀` 
      }]);
      return;
    }

    try {
      const botResponse = await callGemma(userMessage, systemPrompt);

      // --- ADVANCED PARSER ---
      let finalThought = "";
      let finalText = botResponse;

      // 1. Cek format standar [THOUGHT]...[RESPONSE]...
      if (botResponse.includes("[RESPONSE]")) {
        const parts = botResponse.split("[RESPONSE]");
        finalText = parts[1].trim();
        finalThought = parts[0].replace(/\[THOUGHT\]/g, "").trim();
      } 
      // 2. Cek jika model menulis [THOUGHT] tapi lupa [RESPONSE]
      else if (botResponse.includes("[THOUGHT]")) {
        const thoughtIndex = botResponse.indexOf("[THOUGHT]");
        const contentAfterThought = botResponse.substring(thoughtIndex + 9).trim();
        
        // Cari sapaan sebagai pemisah manual
        const greetingMatch = contentAfterThought.match(/(Halo|Halo,|Gila|Hai|Halo!)\s+\w+/i);
        if (greetingMatch && greetingMatch.index !== undefined) {
          finalThought = contentAfterThought.substring(0, greetingMatch.index).trim();
          finalText = contentAfterThought.substring(greetingMatch.index).trim();
        } else {
          finalThought = contentAfterThought;
          finalText = "Maaf, sepertinya aku sedikit bingung. Bisa tanya lagi?";
        }
      }
      // 3. Fallback jika berantakan (Model langsung jawab tanpa tag)
      else {
        const lines = botResponse.split("\n");
        const firstGreetingLine = lines.findIndex(l => l.trim().match(/^(Halo|Gila|Hai|Selamat)/i));
        if (firstGreetingLine > 0) {
          finalThought = lines.slice(0, firstGreetingLine).join("\n").trim();
          finalText = lines.slice(firstGreetingLine).join("\n").trim();
        }
      }

      // Bersihkan sisa-sisa marker yang mungkin tertinggal
      finalText = finalText.replace(/\[RESPONSE\]/g, "").replace(/\[THOUGHT\]/g, "").trim();

      setChatMessages(prev => [...prev, { 
        sender: 'bot', 
        text: finalText, 
        model: 'Lyra',
        thought: finalThought 
      }]);

      const newCount = askCount + 1;
      setAskCount(newCount);
      if (newCount >= 5) setCooldownTime(30);

    } catch (error) {
      console.error("AI Handler failed:", error);
      setChatMessages(prev => [...prev, { 
        sender: 'bot', 
        text: 'Maaf ya, engine AI kami sedang sibuk. Silakan coba lagi sebentar lagi.' 
      }]);
    } finally {
      setIsLoading(false);
      setIsThinking(false);
    }
  };

  return (
    <>
      <div className="fixed bottom-4 right-4 md:bottom-8 md:right-8 z-[9999] flex flex-col items-end">
        {isChatOpen ? (
          <div 
            className={`bg-white rounded-none shadow-[4px_4px_0px_#1e3a8a] border-2 border-blue-900 border-blue-900 flex flex-col overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] origin-bottom-right chat-lux-anim
              ${isExpanded 
                ? 'w-[90vw] md:w-[600px] h-[80vh] md:h-[700px]'
                : 'w-80 sm:w-[26rem] h-[500px]'
              }
            `}
          >
            
            {/* Header Bot */}
            <div className="bg-blue-600 border-2 border-blue-900 shadow-[4px_4px_0px_#1e3a8a] text-white hover:bg-blue-700 hover:shadow-[6px_6px_0px_#1e3a8a] hover:-translate-y-1 transition-all p-4 flex items-center justify-between text-white shrink-0 shadow-[4px_4px_0px_#1e3a8a] relative transition-colors z-20">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-none bg-white/20 backdrop-blur-md flex items-center justify-center border-2 border-blue-900 border-blue-900 shadow-[4px_4px_0px_#1e3a8a]">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="text-sm font-black text-white uppercase tracking-wider leading-none">Lyra Nebula 31B</h3>
                    <div className="group/info relative cursor-help">
                      <Info className="w-3 h-3 text-white/50 hover:text-white transition-colors" />
                      <div className="absolute left-0 top-full mt-2 w-48 p-2.5 bg-slate-900/95 backdrop-blur-md rounded-none shadow-[4px_4px_0px_#1e3a8a] border-2 border-blue-900 border-blue-900 text-[9px] font-medium leading-relaxed text-blue-100 opacity-0 group-hover/info:opacity-100 transition-opacity pointer-events-none z-[100]">
                        <div className="font-black text-white mb-1 uppercase tracking-widest text-[8px] flex items-center gap-1">
                          <Sparkles className="w-2.5 h-2.5 text-blue-400" /> Lyra Engine Detail
                        </div>
                        Lyra Nebula 31B adalah asisten AI yang dibangun di atas fondasi <span className="text-blue-400 font-bold italic">Gemma 4 31B</span> yang telah disempurnakan khusus untuk ekosistem Coreline.
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 mt-0.5">
                    <div className="w-1.5 h-1.5 bg-emerald-400 rounded-none animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.6)]" />
                    <span className="text-[9px] font-bold text-emerald-200 uppercase tracking-widest">Active System</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-1">
                <button onClick={() => setIsExpanded(!isExpanded)} className="hover:bg-white/20 p-2 rounded-none transition-all">
                  {isExpanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                </button>
                <button onClick={() => setIsChatOpen(false)} className="hover:bg-white/20 p-2 rounded-none transition-all">
                  <Minus className="w-5 h-5" />
                </button>
              </div>
            </div>



            <div className="flex-1 overflow-y-auto p-4 bg-sky-50/50 flex flex-col gap-4 relative z-10">
              {chatMessages.map((msg, i) => (
                <div key={i} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} animate-message-pop`}>
                  <div className="flex flex-col gap-1 max-w-[90%]">
                    {msg.sender === 'bot' && msg.thought && (
                      <details className="group/thought bg-sky-100 border-2 border-blue-900 border-blue-900 rounded-none mb-1 overflow-hidden transition-all">
                        <summary className="flex items-center gap-2 p-2.5 cursor-pointer hover:bg-slate-200/50 transition-colors list-none">
                          <div className="p-1 bg-white rounded-none shadow-[4px_4px_0px_#1e3a8a]">
                            <BrainCircuit className="w-3 h-3 text-blue-500 group-open/thought:rotate-12 transition-transform" />
                          </div>
                          <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">CoreBot Thinking Process</span>
                          <ChevronDown className="w-3 h-3 ml-auto text-slate-400 group-open/thought:rotate-180 transition-transform" />
                        </summary>
                        <div className="p-3 border-t border-blue-900 bg-white/50 text-[11px] leading-relaxed text-blue-950 font-bold font-medium italic whitespace-pre-wrap animate-fade-in">
                          {msg.thought}
                        </div>
                      </details>
                    )}
                    
                    <div className={`p-4 rounded-none text-sm leading-relaxed shadow-[4px_4px_0px_#1e3a8a] ${
                      msg.sender === 'user' 
                        ? 'bg-blue-600 text-white rounded-br-sm' 
                        : 'bg-white border-2 border-blue-900 border-blue-900 text-blue-950 font-bold rounded-bl-sm'
                    }`}>
                      {msg.sender === 'bot' ? (
                        <article className="prose prose-sm max-w-none prose-slate prose-p:leading-relaxed prose-pre:p-0 prose-pre:bg-transparent prose-code:text-blue-600 prose-code:bg-blue-50 prose-code:px-1 prose-code:py-0.5 prose-code:rounded-none prose-strong:text-blue-700 prose-ul:my-2 prose-li:my-1">
                          <ReactMarkdown 
                            remarkPlugins={[remarkGfm]}
                            components={{
                              code({node, inline, className, children, ...props}: any) {
                                const match = /language-(\w+)/.exec(className || '');
                                return !inline ? (
                                  <div className="my-4 rounded-none overflow-hidden border-2 border-blue-900 border-blue-900 bg-slate-900 shadow-[4px_4px_0px_#1e3a8a]">
                                    <div className="bg-slate-800 px-4 py-1.5 flex items-center justify-between border-b border-blue-900">
                                      <div className="flex items-center gap-2">
                                        <Terminal className="w-3.5 h-3.5 text-slate-400" />
                                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{match ? match[1] : 'code'}</span>
                                      </div>
                                    </div>
                                    <pre className="p-4 overflow-x-auto text-[13px] leading-relaxed text-blue-100 font-mono">
                                      <code className={className} {...props}>
                                        {children}
                                      </code>
                                    </pre>
                                  </div>
                                ) : (
                                  <code className="bg-blue-50 text-blue-600 px-1.5 py-0.5 rounded-none font-bold text-[13px]" {...props}>
                                    {children}
                                  </code>
                                );
                              }
                            }}
                          >
                            {msg.text}
                          </ReactMarkdown>
                        </article>
                      ) : (
                        <div className="whitespace-pre-wrap">{msg.text}</div>
                      )}
                    </div>
                    {msg.sender === 'bot' && msg.model && (
                      <div className="flex items-center gap-1 px-1 mt-0.5">
                        <div className="w-1 h-1 rounded-none bg-blue-400" />
                        <span className="text-[9px] font-black uppercase tracking-tighter text-slate-400 italic">
                          Responded by <span className="text-blue-500">Lyra Nebula 31B</span>
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
              
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white border-2 border-blue-900 border-blue-900 p-4 rounded-none rounded-bl-sm shadow-[4px_4px_0px_#1e3a8a] flex flex-col gap-3 min-w-[200px] animate-message-pop">
                    <div className="flex items-center gap-3">
                      {isThinking ? (
                        <div className="relative">
                          <BrainCircuit className="w-5 h-5 text-blue-500 animate-pulse" />
                          <div className="absolute -top-1 -right-1 w-2 h-2 bg-cyan-400 rounded-none animate-ping" />
                        </div>
                      ) : (
                        <Loader2 className="w-5 h-5 animate-spin text-blue-500" />
                      )}
                      <span className="text-xs font-black tracking-wide text-blue-950 font-bold uppercase">
                        {isThinking ? 'CoreBot sedang berfikir...' : 'Sedang mengetik...'}
                      </span>
                    </div>
                    
                    <div className="flex gap-1">
                      <div className="w-1.5 h-1.5 bg-blue-400 rounded-none animate-bounce [animation-delay:-0.3s]"></div>
                      <div className="w-1.5 h-1.5 bg-blue-500 rounded-none animate-bounce [animation-delay:-0.15s]"></div>
                      <div className="w-1.5 h-1.5 bg-cyan-500 rounded-none animate-bounce"></div>
                    </div>
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
            <div className="bg-white border-t border-blue-900 shrink-0">
              <div className="flex gap-2 overflow-x-auto p-3 scrollbar-hide border-b border-blue-900">
                {chatbotFaqs.map((faq, i) => (
                  <button 
                    key={i} 
                    onClick={() => handleAskFaq(faq)} 
                    disabled={isLoading || cooldownTime > 0}
                    className="whitespace-nowrap text-[11px] text-blue-700 bg-blue-50 hover:bg-blue-100 px-3.5 py-2 rounded-none transition-colors font-bold border-2 border-blue-900 border-blue-900 disabled:opacity-50 disabled:cursor-not-allowed"
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
                  className="flex-1 bg-sky-50 border-2 border-blue-900 border-blue-900 rounded-none py-3 px-4 text-sm font-medium focus:outline-none focus:border-blue-900 focus:ring-2 focus:ring-blue-500/20 transition-all disabled:bg-sky-100 disabled:cursor-not-allowed"
                />
                <button 
                  type="submit"
                  disabled={!inputText.trim() || isLoading || cooldownTime > 0}
                  className="p-3 bg-blue-600 hover:bg-blue-700 text-white rounded-none transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-[4px_4px_0px_#1e3a8a] hover:shadow-[4px_4px_0px_#1e3a8a] flex-shrink-0"
                >
                  <Send className="w-5 h-5" />
                </button>
              </form>
            </div>
            
          </div>
        ) : (
          <button 
            onClick={() => setIsChatOpen(true)} 
            className="bg-blue-600 border-2 border-blue-900 shadow-[4px_4px_0px_#1e3a8a] text-white hover:bg-blue-700 hover:shadow-[6px_6px_0px_#1e3a8a] hover:-translate-y-1 transition-all text-white p-4 rounded-none shadow-[0_10px_40px_-10px_rgba(59,130,246,0.8)] hover:scale-110 transition-all duration-300 flex items-center justify-center group border-2 border-blue-900 border-blue-900 relative" 
          >
             <MessageCircle className="w-7 h-7" />
             <span className="absolute top-0 right-0 w-3.5 h-3.5 bg-red-500 border-2 border-blue-900 rounded-none animate-pulse"></span>
             
             <span className="absolute right-full mr-4 bg-slate-800 text-white text-xs font-bold px-3 py-2 rounded-none opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none hidden md:block shadow-[4px_4px_0px_#1e3a8a]">
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
        
        /* Custom Prose Overrides */
        .prose pre { margin: 0 !important; }
        .prose ul { list-style-type: disc !important; padding-left: 1.25rem !important; }
        .prose ol { list-style-type: decimal !important; padding-left: 1.25rem !important; }
        .prose li { margin-top: 0.25rem !important; margin-bottom: 0.25rem !important; }
        .prose p { margin-top: 0.5rem !important; margin-bottom: 0.5rem !important; }
      `}</style>
    </>
  );
}