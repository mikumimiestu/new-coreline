import React, { useState, useRef, useEffect } from 'react';
import { Bot, Send, Loader2, BrainCircuit, Sparkles, ChevronLeft, Trash2, History, Zap, ShieldCheck } from 'lucide-react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { useAuth } from '../contexts/AuthContext';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Link, useNavigate } from 'react-router-dom';

// --- Setup Gemini API ---
const apiKey = import.meta.env.VITE_GEMINI_API_KEY || ""; 
const genAI = new GoogleGenerativeAI(apiKey);

const AUTHX_BASE = 'https://authx.astbyte.com';

export default function LyraChatPage() {
  const { user } = useAuth();
  const [userData, setUserData] = useState<any>(null);
  const [userSubs, setUserSubs] = useState<any[]>([]);
  const [userProgress, setUserProgress] = useState<Record<string, number>>({});
  const navigate = useNavigate();
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [askCount, setAskCount] = useState(0);
  const [cooldownTime, setCooldownTime] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const [chatMessages, setChatMessages] = useState<{sender: 'bot' | 'user', text: string, model?: 'Lyra', thought?: string}[]>([
    { 
      sender: 'bot', 
      text: `Halo! Selamat datang di Lyra Nebula 31B Center. Ada yang bisa aku bantu untuk belajarmu hari ini?`, 
      model: 'Lyra' 
    }
  ]);

  // --- Fetch User Data ---
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
        console.error('Lyra failed to fetch user data:', e);
      }
    }
    fetchUserData();
  }, [user]);

  // Scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [chatMessages, isLoading]);

  // Cooldown timer
  useEffect(() => {
    if (cooldownTime > 0) {
      const timer = setInterval(() => setCooldownTime(prev => prev - 1), 1000);
      return () => clearInterval(timer);
    }
  }, [cooldownTime]);

  const callGemma = async (prompt: string, systemInstruction: string) => {
    const model = genAI.getGenerativeModel({ 
      model: "gemma-4-31b-it",
      systemInstruction: systemInstruction 
    });
    const result = await model.generateContent(prompt);
    return result.response.text();
  };

  const handleSendMessage = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!inputText.trim() || isLoading || cooldownTime > 0) return;

    const userMessage = inputText.trim();
    setInputText("");
    setChatMessages(prev => [...prev, { sender: 'user', text: userMessage }]);
    setIsLoading(true);

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
        text: `Maaf, kamu sudah mencapai batas pertanyaan harian untuk paket **${subType.toUpperCase()}**. Silakan upgrade paketmu untuk kuota yang lebih besar! 🚀` 
      }]);
      setIsLoading(false);
      return;
    }

    const userContextString = `
    NAMA: ${userData?.full_name || 'User'}
    PAKET: ${userData?.subscription_type || 'Free'}
    PROGRESS: ${JSON.stringify(userProgress)}
    `;

    const projectSummary = `
      INTERNAL PROJECT CONTEXT (Coreline v2):
      - Framework: Vite + React (TypeScript).
      - Main Routes: Dashboard (/), Profile (/profile), Materials (/materials/:id), Quiz (/quiz/:id), Pricing (/pricing).
      - Specialized Pages: Offline Mentoring (/offline-mentoring), Priority Member (/priority-member), Tutorial (/tutorial).
    `;

    const systemPrompt = `
      Kamu adalah Lyra Nebula 31B, asisten AI resmi Coreline by AstByte.
      Kamu berada di halaman Chat Dedicated Fullscreen.
      ${projectSummary}
      IDENTITAS USER: ${userContextString}
      
      ATURAN FORMATTING (SANGAT KETAT):
      1. JANGAN menulis label seperti "Neural Reasoning Process", "Verified Output", atau "Lyra v3.1" di dalam teksmu. Label-label itu sudah ada di UI sistem.
      2. Responmu WAJIB diawali dengan [THOUGHT].
      3. Responmu WAJIB memisahkan analisis dan jawaban dengan tag [RESPONSE].
      
      STRUKTUR WAJIB:
      [THOUGHT]
      (Analisis progres user & strategi jawaban)
      
      [RESPONSE]
      (Jawaban ramah Bahasa Indonesia)
    `;

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
        const parts = botResponse.split("[THOUGHT]");
        
        // Jika [THOUGHT] ada di akhir (sering terjadi jika model "lupa")
        if (botResponse.lastIndexOf("[THOUGHT]") > botResponse.length / 2) {
          finalText = parts[0].trim();
          finalThought = parts[1].trim();
        } else {
          // Jika [THOUGHT] ada di awal tapi tanpa [RESPONSE]
          const contentAfterThought = botResponse.replace(/\[THOUGHT\]/g, "").trim();
          // Cari sapaan sebagai pemisah manual
          const greetingMatch = contentAfterThought.match(/(Halo|Halo,|Gila|Hai|Halo!|Selamat)\s+\w+/i);
          if (greetingMatch && greetingMatch.index !== undefined) {
            finalThought = contentAfterThought.substring(0, greetingMatch.index).trim();
            finalText = contentAfterThought.substring(greetingMatch.index).trim();
          } else {
            finalThought = "Analisis internal.";
            finalText = contentAfterThought;
          }
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

      // Bersihkan sisa-sisa marker atau label UI yang mungkin ter-hallucinate oleh model
      const uiLabels = [/Neural Reasoning Process/gi, /Verified Output/gi, /Lyra v3\.1/gi, /Neural Sync Active/gi];
      uiLabels.forEach(pattern => {
        finalText = finalText.replace(pattern, "");
        finalThought = finalThought.replace(pattern, "");
      });

      finalText = finalText.replace(/\[RESPONSE\]/g, "").replace(/\[THOUGHT\]/g, "").trim();
      finalThought = finalThought.replace(/\[RESPONSE\]/g, "").replace(/\[THOUGHT\]/g, "").trim();

      setChatMessages(prev => [...prev, { 
        sender: 'bot', 
        text: finalText, 
        model: 'Lyra',
        thought: finalThought 
      }]);

      setAskCount(prev => prev + 1);
    } catch (error) {
      console.error("AI Error:", error);
      setChatMessages(prev => [...prev, { sender: 'bot', text: 'Maaf, sistem Lyra sedang sibuk. Coba lagi nanti ya!' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-200 flex flex-col font-sans selection:bg-blue-500/30">
      {/* Header */}
      <header className="h-16 shrink-0 border-b border-blue-900 bg-slate-900/50 backdrop-blur-xl flex items-center justify-between px-4 md:px-8 z-50 sticky top-0">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate('/')} className="p-2 hover:bg-white/5 rounded-none transition-all text-slate-400 hover:text-white">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-none bg-blue-600 border-2 border-blue-900 shadow-[4px_4px_0px_#1e3a8a] text-white hover:bg-blue-700 hover:shadow-[6px_6px_0px_#1e3a8a] hover:-translate-y-1 transition-all flex items-center justify-center shadow-[4px_4px_0px_#1e3a8a] shadow-[4px_4px_0px_#1e3a8a]">
              <Bot className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-sm md:text-base font-black text-white uppercase tracking-wider leading-none">Lyra Nebula 31B</h1>
              <div className="flex items-center gap-1.5 mt-1">
                <div className="w-1.5 h-1.5 bg-emerald-400 rounded-none animate-pulse" />
                <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest">Neural Sync Active</span>
              </div>
            </div>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-3 bg-white/5 px-4 py-2 rounded-none border-2 border-blue-900 border-blue-900">
          <Zap className="w-4 h-4 text-amber-400" />
          <span className="text-xs font-bold uppercase tracking-widest text-slate-400">Quota: {askCount}/{userData?.subscription_type === 'ultimate' ? '∞' : '50'}</span>
        </div>
      </header>

      {/* Main Chat Area */}
      <main className="flex-1 overflow-hidden flex flex-col max-w-5xl mx-auto w-full relative">
        <div 
          ref={scrollRef}
          className="flex-1 overflow-y-auto p-4 md:p-8 space-y-8 scrollbar-hide"
        >
          {chatMessages.map((msg, i) => (
            <div key={i} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} animate-message-pop`}>
              <div className={`flex flex-col gap-2 max-w-[85%] md:max-w-[70%] ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>
                
                {/* Bot Thought Process (Accordion style) */}
                {msg.sender === 'bot' && msg.thought && (
                  <details className="group/thought bg-white/5 border-2 border-blue-900 border-blue-900 rounded-none overflow-hidden transition-all w-full">
                    <summary className="flex items-center gap-3 p-3 cursor-pointer hover:bg-white/10 transition-colors list-none">
                      <BrainCircuit className="w-4 h-4 text-blue-400" />
                      <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Neural Reasoning Process</span>
                    </summary>
                    <div className="p-4 border-t border-blue-900 bg-black/20 text-xs leading-relaxed text-slate-400 italic font-medium whitespace-pre-wrap">
                      {msg.thought}
                    </div>
                  </details>
                )}

                <div className={`p-4 md:p-6 rounded-none shadow-[4px_4px_0px_#1e3a8a] relative ${
                  msg.sender === 'user' 
                    ? 'bg-blue-600 text-white rounded-tr-none border-2 border-blue-900 border-blue-900' 
                    : 'bg-slate-800/80 backdrop-blur-md text-slate-100 rounded-tl-none border-2 border-blue-900 border-blue-900'
                }`}>
                  <div className="prose prose-invert prose-sm md:prose-base max-w-none prose-headings:font-black prose-a:text-blue-400 prose-code:bg-black/30 prose-code:p-1 prose-code:rounded-none prose-pre:bg-black/50 prose-pre:border-2 border-blue-900 prose-pre:border-blue-900">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                      {msg.text}
                    </ReactMarkdown>
                  </div>

                  {msg.sender === 'bot' && (
                    <div className="mt-4 pt-4 border-t border-blue-900 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
                        <span className="text-[9px] font-black uppercase tracking-widest text-slate-500 italic">Verified Output</span>
                      </div>
                      <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">Lyra v3.1</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex justify-start animate-pulse">
              <div className="bg-slate-800/50 p-4 rounded-none border-2 border-blue-900 border-blue-900 flex items-center gap-3">
                <Loader2 className="w-4 h-4 animate-spin text-blue-400" />
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Lyra is thinking...</span>
              </div>
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="shrink-0 p-4 md:p-8 bg-gradient-to-t from-[#0f172a] via-[#0f172a]/90 to-transparent">
          <form 
            onSubmit={handleSendMessage}
            className="max-w-3xl mx-auto relative group"
          >
            <input 
              type="text" 
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Tanya Lyra tentang coding, progresmu, atau navigasi..."
              className="w-full bg-slate-800/80 backdrop-blur-xl border-2 border-blue-900 border-blue-900 rounded-none py-4 md:py-5 pl-6 pr-16 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-900 transition-all placeholder:text-slate-500 shadow-[4px_4px_0px_#1e3a8a]"
            />
            <button 
              type="submit"
              disabled={isLoading || !inputText.trim()}
              className="absolute right-2 top-2 bottom-2 px-4 bg-blue-600 hover:bg-blue-500 disabled:bg-slate-700 disabled:opacity-50 text-white rounded-none transition-all flex items-center justify-center shadow-[4px_4px_0px_#1e3a8a] shadow-[4px_4px_0px_#1e3a8a]"
            >
              <Send className="w-5 h-5" />
            </button>
          </form>
          <p className="text-center text-[10px] text-slate-500 mt-4 uppercase tracking-[0.2em] font-bold">
            Powered by Lyra Nebula 31B Engine • Coreline AI Division
          </p>
        </div>
      </main>
    </div>
  );
}
