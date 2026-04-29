import { useState, useRef, useEffect } from 'react';
import {
  Lock, AlertCircle, Loader2, Check, MessageCircle, ArrowRight,
  Sparkles, Shield, Trophy, Users, WifiOff, ChevronLeft, Terminal, 
  Laptop, Star, Quote, Code2, BookOpen, ShieldCheck, Cpu,
  Target, Zap, PlayCircle, CheckCircle2, GraduationCap, Layers,
  Brain, Award, HelpCircle, ChevronDown, ChevronUp
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import ReCAPTCHA from 'react-google-recaptcha';

const RECAPTCHA_SITE_KEY = '6LcHoB0sAAAAAGwuOnnHNhKOHBfdai_JbmB0118Z';
const API_BASE = 'https://authx.astbyte.com';

export default function LoginPage() {
  const [showForm, setShowForm] = useState(false);
  const [mode, setMode] = useState<'email' | 'publicId'>('email');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [publicId, setPublicId] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);

  const { login } = useAuth();
  const recaptchaRef = useRef<ReCAPTCHA>(null);

  const waHref = 'https://api.whatsapp.com/send/?phone=6285183209494&text=Halo+AstByte%2C+saya+ingin+mendapatkan+informasi+tentang+Coreline.&type=phone_number&app_absent=0';

  const onRecaptchaChange = (token: string | null) => {
    setRecaptchaToken(token);
    if (error && error.includes('reCAPTCHA')) setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!recaptchaToken) {
      setError('Mohon selesaikan verifikasi "I\'m not a robot".');
      return;
    }

    try {
      let url = '';
      let body: any = {};

      if (mode === 'email') {
        const trimmedUser = username.trim().toLowerCase();
        if (!trimmedUser || !password) {
          setError('Username dan password wajib diisi.');
          return;
        }
        const email = `${trimmedUser}@astbyte.com`;
        url = 'https://authx.astbyte.com/api/auth/login';
        body = { email, password };
      } else {
        const trimmedPublicId = publicId.trim();
        if (!trimmedPublicId) {
          setError('Public ID wajib diisi.');
          return;
        }
        url = 'https://authx.astbyte.com/api/auth/login/public-id';
        body = { public_id: trimmedPublicId };
      }

      setLoading(true);
      body.recaptcha_token = recaptchaToken;

      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      let data: any = null;
      try { data = await res.json(); } catch { data = null; }

      if (!res.ok) {
        const backendMessage = data?.message;
        const fallback = mode === 'email' ? 'Login gagal.' : 'ID tidak ditemukan.';
        setError(backendMessage || fallback);
        recaptchaRef.current?.reset();
        setRecaptchaToken(null);
        return;
      }

      const token = data?.data?.token;
      if (!token) {
        setError('Token tidak valid.');
        return;
      }

      localStorage.setItem('astbyte_token', token);
      const ok = await login(token);
      
      if (!ok) {
        setError('Gagal inisialisasi sesi.');
        return;
      }

      setIsSuccess(true);
      setTimeout(() => { window.location.href = '/'; }, 1500);

    } catch (err) {
      console.error(err);
      setError('Terjadi kesalahan koneksi.');
      recaptchaRef.current?.reset();
      setRecaptchaToken(null);
    } finally {
      setLoading(false);
    }
  };

  const features = [
    { icon: Laptop, t: "Kurikulum Standar Industri", d: "Materi disusun oleh praktisi IT aktif, mengacu pada kebutuhan skill terkini di perusahaan teknologi." },
    { icon: Trophy, t: "Sertifikasi Profesional", d: "Dapatkan sertifikat valid setiap menyelesaikan course untuk memperkuat CV dan portofolio karirmu." },
    { icon: Brain, t: "Kuis & Latihan Interaktif", d: "Setiap modul dilengkapi kuis dan latihan coding langsung agar pemahaman lebih mendalam." },
    { icon: Users, t: "Komunitas & Mentor", d: "Bergabung dengan komunitas developer aktif dan dapatkan bimbingan dari mentor berpengalaman." },
    { icon: Layers, t: "15+ Jalur Belajar", d: "Dari Python, JavaScript, React, hingga UI/UX Design dan Product Management — semua tersedia." },
    { icon: GraduationCap, t: "Dari Pemula ke Profesional", d: "Alur belajar terstruktur dari level dasar hingga advanced, cocok untuk siapa saja tanpa syarat." }
  ];

  // State untuk data kursus dari API
  const [apiCourses, setApiCourses] = useState<any[]>([]);
  const [isLoadingCourses, setIsLoadingCourses] = useState(true);

  // Fetch katalog kursus dari API saat komponen dimuat
  useEffect(() => {
    async function fetchCourses() {
      try {
        const res = await fetch(`${API_BASE}/api/coreline/courses`);
        if (res.ok) {
          const data = await res.json();
          if (data.data && Array.isArray(data.data)) {
            // Filter: tidak comingSoon, totalStudents > 100, ambil 5 terpopuler
            const popularCourses = data.data
              .filter((c: any) => !c.comingSoon && Number(c.totalStudents || 0) > 100)
              .sort((a: any, b: any) => Number(b.totalStudents || 0) - Number(a.totalStudents || 0))
              .slice(0, 4);
            setApiCourses(popularCourses);
          }
        }
      } catch (e) {
        console.error('Failed to fetch courses for catalog:', e);
      } finally {
        setIsLoadingCourses(false);
      }
    }
    fetchCourses();
  }, []);

  const learningPaths = [
    { icon: Target, title: "1. Pilih Jalur Belajar", desc: "Tentukan minatmu — Web Dev, Data Science, UI/UX, atau Soft Skill. Kami punya 15+ jalur yang siap kamu eksplorasi." },
    { icon: PlayCircle, title: "2. Belajar & Praktik", desc: "Pelajari teori terstruktur, kerjakan kuis interaktif, dan selesaikan latihan coding langsung di setiap modul." },
    { icon: CheckCircle2, title: "3. Raih Sertifikat", desc: "Setelah seluruh modul selesai 100%, sertifikat profesional otomatis bisa kamu unduh dan gunakan." }
  ];

  const testimonials = [
    { name: "Ahmad R.", role: "Junior Developer", text: "Platform belajar yang pas banget buat upskilling. Materinya mudah dipahami dari dasar sampai advanced!", rating: 5 },
    { name: "Siti N.", role: "UI/UX Designer", text: "Kurikulumnya terstruktur rapi. Alhamdulillah bisa upgrade skill bareng mentor expert. Sertifikatnya sangat berguna.", rating: 5 },
    { name: "Budi S.", role: "Freelance Engineer", text: "Komunitasnya sangat aktif dan saling bantu. Recommended banget buat yang mau pivot karir ke dunia IT.", rating: 5 }
  ];

  const faqs = [
    { q: "Apakah Coreline cocok untuk pemula yang belum pernah coding?", a: "Tentu! Semua kursus dirancang dari level paling dasar. Kami menyediakan penjelasan langkah demi langkah yang mudah dipahami bahkan jika kamu belum pernah menulis satu baris kode pun." },
    { q: "Bagaimana cara mendapatkan sertifikat?", a: "Sertifikat akan otomatis tersedia untuk diunduh setelah kamu menyelesaikan 100% modul pada sebuah course. Sertifikat bisa diunduh dalam format PDF langsung dari Dashboard." },
    { q: "Apa perbedaan akun Free dan Premium?", a: "Akun Free bisa mengakses beberapa modul awal di setiap course. Akun Premium (Pro/Plus/Ultra/Ultimate) mendapat akses penuh ke seluruh materi, sertifikat, kuis, dan fitur mentoring." },
    { q: "Ada berapa total kursus yang tersedia?", a: "Saat ini kami memiliki 15+ kursus aktif mulai dari Python, JavaScript, React, Go, TypeScript, hingga non-coding seperti UI/UX Design, Agile & Scrum, Product Management, English for Tech, dan Japanese N5-N4." },
  ];

  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    // Wrapper utama: Tema Terang (bg-slate-50)
    <div className="relative min-h-screen overflow-x-hidden overflow-y-auto bg-slate-50 text-slate-800 font-sans selection:bg-blue-500/30 flex flex-col">
      
      {/* --- BACKGROUND AMBIENCE (Cerah) --- */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {/* Subtle Grid */}
        <div className="absolute inset-0 opacity-[0.4] bg-[linear-gradient(rgba(203,213,225,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(203,213,225,0.5)_1px,transparent_1px)] bg-[size:30px_30px]"></div>
        
        {/* Glow Effects - Disesuaikan untuk light theme */}
        <div className="absolute -top-24 -right-24 h-[500px] w-[500px] rounded-full bg-blue-300/20 blur-[120px] animate-pulse" />
        <div className="absolute bottom-0 -left-16 h-96 w-96 rounded-full bg-cyan-300/20 blur-[100px]" />
      </div>

      {!showForm ? (
        /* =========================================
         * STATE 1: FULL LANDING PAGE VIEW
         * ========================================= */
        <div className="relative z-10 w-full flex-grow flex flex-col">
          
          {/* NAVBAR */}
          <nav className="container mx-auto px-6 py-6 flex items-center justify-between z-30">
            <div className="flex items-center gap-3 group cursor-pointer">
                {/* Asumsi logo aslinya putih, dikasih background gelap dikit biar keliatan di light theme */}
                <img src="/icon3.png" alt="NewCoreline Icon" className="w-full h-10 object-contain" />
            </div>
            <button 
              onClick={() => setShowForm(true)}
              className="px-6 py-2.5 bg-white hover:bg-slate-100 text-slate-800 border border-slate-200 rounded-xl font-bold transition-all shadow-sm hover:shadow"
            >
              Masuk
            </button>
          </nav>

          {/* HERO SECTION */}
          <section className="container mx-auto px-6 py-16 md:py-24 text-center flex flex-col items-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 border border-blue-200 text-blue-700 text-sm font-bold mb-8 animate-fade-in shadow-sm">
              <Sparkles className="w-4 h-4 text-blue-600" /> 15+ Kursus Aktif • 200+ Modul Pembelajaran
            </div>
            
            <h1 className="mb-6 text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-900 drop-shadow-sm max-w-4xl leading-tight animate-fade-in" style={{animationDelay: '0.1s'}}>
              Platform Belajar<br className="hidden md:block" />
              <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">Coding & Tech Skills</span>
            </h1>
            
            <p className="text-lg md:text-xl text-slate-600 font-medium max-w-2xl mb-8 animate-fade-in" style={{animationDelay: '0.2s'}}>
              Kuasai Python, JavaScript, React, Go, Data Analysis, UI/UX Design, hingga Product Management — semua dalam satu platform interaktif dengan sertifikat resmi.
            </p>

            <div className="flex flex-wrap justify-center gap-3 mb-12 animate-fade-in" style={{animationDelay: '0.25s'}}>
              {["Python", "JavaScript", "React", "Go", "TypeScript", "UI/UX", "Data Analysis", "Agile & Scrum"].map(tag => (
                <span key={tag} className="px-3 py-1.5 bg-white border border-slate-200 text-slate-600 text-xs font-bold rounded-lg shadow-sm">{tag}</span>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto animate-fade-in" style={{animationDelay: '0.3s'}}>
              <button
                onClick={() => setShowForm(true)}
                className="group relative flex items-center justify-center gap-3 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all transform hover:-translate-y-1 shadow-[0_10px_20px_rgba(37,99,235,0.2)] w-full sm:w-auto"
              >
                Mulai Belajar Sekarang
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              
              <a
                href="https://axid.astbyte.com/register"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 px-8 py-4 rounded-xl font-bold text-lg transition-all w-full sm:w-auto hover:border-slate-400 shadow-sm"
              >
                Daftar Akun Gratis
              </a>
            </div>
          </section>

          {/* STATS SECTION (Biru Solid biar Pop-out) */}
          <section className="bg-gradient-to-r from-blue-700 to-blue-900 py-12 relative overflow-hidden">
            <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
            <div className="container mx-auto px-6 max-w-5xl relative z-10">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                {[
                  { icon: Code2, n: "50+", l: "Modul Belajar" },
                  { icon: Users, n: "500+", l: "Member Aktif" },
                  { icon: BookOpen, n: "100%", l: "Materi Praktik" },
                  { icon: Shield, n: "24/7", l: "Dukungan Mentor" }
                ].map((stat, idx) => (
                  <div key={idx} className="flex flex-col items-center group">
                    <stat.icon className="w-8 h-8 text-cyan-300 mb-3 opacity-90 group-hover:scale-110 transition-transform group-hover:text-cyan-200" />
                    <h3 className="text-3xl font-black text-white mb-1 drop-shadow-sm">{stat.n}</h3>
                    <p className="text-sm text-blue-200 font-medium">{stat.l}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* NEW SECTION: ALUR BELAJAR */}
          <section className="container mx-auto px-6 py-20 max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">Gimana Cara Mulainya?</h2>
              <p className="text-slate-600 max-w-2xl mx-auto">Kami mendesain alur belajar yang terstruktur supaya kamu nggak bingung harus mulai dari mana.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
              {/* Garis penghubung (Hanya muncul di desktop) */}
              <div className="hidden md:block absolute top-12 left-[15%] right-[15%] h-1 bg-slate-200 z-0"></div>
              
              {learningPaths.map((step, i) => (
                <div key={i} className="relative z-10 flex flex-col items-center text-center group">
                  <div className="w-24 h-24 rounded-full bg-white border-4 border-slate-100 shadow-xl flex items-center justify-center mb-6 group-hover:border-blue-500 transition-colors">
                    <step.icon className="w-10 h-10 text-blue-600" />
                  </div>
                  <h4 className="font-bold text-slate-900 text-xl mb-3">{step.title}</h4>
                  <p className="text-sm text-slate-600 leading-relaxed max-w-xs">{step.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* FEATURES SECTION */}
          <section className="bg-slate-100 py-20 border-y border-slate-200">
            <div className="container mx-auto px-6 max-w-6xl">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">Mengapa Memilih Coreline?</h2>
                <p className="text-slate-600 max-w-2xl mx-auto">Kami menyediakan ekosistem belajar yang komprehensif untuk membantu kamu berkembang dari pemula hingga menjadi ahli.</p>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {features.map((item, i) => (
                  <div key={i} className="flex flex-col p-8 rounded-2xl bg-white border border-slate-200 hover:border-blue-400 hover:shadow-2xl transition-all transform hover:-translate-y-2 group">
                    <div className="p-4 bg-blue-50 rounded-xl text-blue-600 mb-6 inline-block w-fit group-hover:bg-blue-600 group-hover:text-white transition-colors shadow-sm">
                      <item.icon className="w-8 h-8" />
                    </div>
                    <h4 className="font-bold text-slate-900 text-lg mb-3">{item.t}</h4>
                    <p className="text-sm text-slate-600 leading-relaxed">{item.d}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* COURSE CATALOG PREVIEW (Dari API) */}
          <section className="py-20">
            <div className="container mx-auto px-6 max-w-6xl">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">Katalog Kursus Populer</h2>
                <p className="text-slate-600 max-w-2xl mx-auto">Jelajahi berbagai kursus coding dan non-coding yang siap membawa karirmu ke level berikutnya.</p>
              </div>
              
              {isLoadingCourses ? (
                <div className="flex flex-col items-center justify-center py-12">
                  <Loader2 className="w-8 h-8 text-blue-500 animate-spin mb-4" />
                  <p className="text-sm font-bold text-slate-500">Memuat katalog kursus...</p>
                </div>
              ) : apiCourses.length === 0 ? (
                <p className="text-center text-slate-500">Tidak dapat memuat katalog kursus saat ini.</p>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                  {apiCourses.map((course, i) => (
                    <div key={course.id || i} className="group bg-white border border-slate-200 rounded-2xl overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer">
                      <div className={`h-24 bg-gradient-to-br ${course.gradient || 'from-slate-400 to-slate-600'} flex items-center justify-center relative`}>
                        <div className="absolute inset-0 bg-black/10 mix-blend-overlay"></div>
                        {course.iconUrl ? (
                          <img src={course.iconUrl} alt={course.name} className="w-12 h-12 object-contain drop-shadow-lg group-hover:scale-110 transition-transform relative z-10" />
                        ) : (
                          <BookOpen className="w-10 h-10 text-white drop-shadow-lg group-hover:scale-110 transition-transform relative z-10" />
                        )}
                      </div>
                      <div className="p-4">
                        <h4 className="font-bold text-slate-900 text-sm mb-1 line-clamp-1">{course.name}</h4>
                        <p className="text-xs text-slate-500 mb-2 line-clamp-1">{course.description}</p>
                        <div className="flex items-center gap-2">
                          {course.badge && (
                            <span className="text-[10px] font-black text-purple-600 bg-purple-50 px-2 py-0.5 rounded border border-purple-100">{course.badge}</span>
                          )}
                          <span className="flex items-center gap-1 text-[10px] font-bold text-amber-600">
                            <Star className="w-3 h-3 fill-current" /> {course.rating || '0.0'}
                          </span>
                          <span className="text-[10px] font-bold text-slate-400">{course.totalStudents || '0'} siswa</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>

          {/* TESTIMONIAL / RATING SECTION */}
          <section className="py-20 relative">
            <div className="container mx-auto px-6 max-w-6xl">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">Apa Kata Mereka?</h2>
                <div className="flex items-center justify-center gap-1 text-yellow-500 mb-2">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-6 h-6 fill-current" />)}
                </div>
                <p className="text-slate-600">Rating rata-rata 4.9/5 dari ribuan member aktif kami.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {testimonials.map((testi, i) => (
                  <div key={i} className="bg-white p-8 rounded-2xl border border-slate-200 relative shadow-lg hover:shadow-xl transition-shadow">
                    <Quote className="absolute top-6 right-6 w-8 h-8 text-slate-100" />
                    <div className="flex items-center gap-1 text-yellow-500 mb-6 relative z-10">
                      {[...Array(testi.rating)].map((_, idx) => <Star key={idx} className="w-4 h-4 fill-current" />)}
                    </div>
                    <p className="text-slate-700 text-sm leading-relaxed mb-6 italic relative z-10">"{testi.text}"</p>
                    <div className="flex items-center gap-4 border-t border-slate-100 pt-6">
                      <div className="w-12 h-12 rounded-full bg-blue-100 border border-blue-200 flex items-center justify-center text-blue-700 font-bold text-lg shadow-sm">
                        {testi.name.charAt(0)}
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900 text-sm">{testi.name}</h4>
                        <p className="text-xs text-slate-500 font-medium">{testi.role}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* FAQ SECTION */}
          <section className="bg-slate-100 py-20 border-y border-slate-200">
            <div className="container mx-auto px-6 max-w-3xl">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">Pertanyaan yang Sering Diajukan</h2>
                <p className="text-slate-600">Temukan jawaban untuk pertanyaan umum tentang platform Coreline.</p>
              </div>
              
              <div className="space-y-4">
                {faqs.map((faq, i) => (
                  <div key={i} className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                    <button 
                      onClick={() => setOpenFaq(openFaq === i ? null : i)}
                      className="w-full flex items-center justify-between p-6 text-left"
                    >
                      <span className="font-bold text-slate-800 pr-4">{faq.q}</span>
                      {openFaq === i ? <ChevronUp className="w-5 h-5 text-blue-500 shrink-0" /> : <ChevronDown className="w-5 h-5 text-slate-400 shrink-0" />}
                    </button>
                    {openFaq === i && (
                      <div className="px-6 pb-6 text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-4 animate-fade-in">
                        {faq.a}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* CTA (Call To Action) */}
          <section className="container mx-auto px-6 py-12 mb-12">
            <div className="bg-slate-900 rounded-3xl p-10 md:p-16 text-center relative overflow-hidden shadow-2xl">
              <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]"></div>
              <div className="absolute -top-24 -left-24 h-64 w-64 rounded-full bg-blue-500/40 blur-[80px]" />
              <div className="absolute -bottom-24 -right-24 h-64 w-64 rounded-full bg-cyan-400/40 blur-[80px]" />
              
              <div className="relative z-10">
                <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-6">Siap Menjadi Expert Selanjutnya?</h2>
                <p className="text-lg text-slate-300 mb-10 max-w-2xl mx-auto">Bergabunglah dengan ribuan talenta digital lainnya dan mulai perjalanan belajarmu hari ini.</p>
                <button
                  onClick={() => setShowForm(true)}
                  className="bg-white text-slate-900 hover:bg-blue-50 px-10 py-4 rounded-xl font-extrabold text-lg transition-all transform hover:-translate-y-1 shadow-[0_10px_20px_rgba(0,0,0,0.2)]"
                >
                  Masuk ke Dashboard
                </button>
              </div>
            </div>
          </section>

          {/* FOOTER */}
          <footer className="mt-auto bg-white border-t border-slate-200 pt-16 pb-8">
            <div className="container mx-auto px-6 max-w-6xl">
              <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-12 text-center md:text-left">
                <div>
                  <div className="flex items-center gap-2 justify-center md:justify-start mb-4 bg-slate-800 p-2 rounded-xl w-fit mx-auto md:mx-0">
                    <img src="/logo.png" alt="NewCoreline Icon" className="h-8 object-contain" />
                    <span className="text-xl font-bold text-white mr-2">NewCoreline.</span>
                  </div>
                  <p className="text-slate-500 text-sm max-w-xs">
                    Platform edukasi digital by AstByte. Membentuk generasi talenta teknologi yang siap bersaing di industri global.
                  </p>
                </div>
                
                <div className="flex flex-col items-center md:items-end">
                  {/* BADGE TERSERTIFIKASI */}
                  <div className="flex items-center gap-3 p-4 bg-slate-50 border border-slate-200 rounded-xl mb-4 shadow-sm">
                    <ShieldCheck className="w-8 h-8 text-blue-600" />
                    <div className="text-left">
                      <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">Kualitas & Kurikulum Terjamin</p>
                      <p className="text-sm text-slate-800 font-bold flex items-center gap-1">Tersertifikasi oleh <img src="icon2.png" alt="AstByte Icon" className='h-4 w-auto ml-1 filter contrast-125' /></p>
                    </div>
                  </div>
                  
                  <a href={waHref} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-blue-600 hover:text-blue-500 transition-colors text-sm font-bold">
                    <MessageCircle className="w-4 h-4" /> Hubungi Dukungan Admin
                  </a>
                </div>
              </div>

              <div className="border-t border-slate-100 pt-8 text-center text-sm font-medium text-slate-400">
                © {new Date().getFullYear()} NewCoreline by AstByte. Hak cipta dilindungi undang-undang.
              </div>
            </div>
          </footer>

        </div>
      ) : (
        /* =========================================
         * STATE 2: LOGIN FORM VIEW (Centered - Light Mode)
         * ========================================= */
        <div className="relative z-10 w-full flex-grow flex items-center justify-center py-12 px-4 animate-fade-in">
          <div className="w-full max-w-5xl">
            {/* Header Mini */}
            <header className="mb-10 text-center relative z-10">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center animate-float ">
                <img src="/logo.png" alt="NewCoreline Icon" className="w-full h-full object-contain" />
              </div>
              <h2 className="text-2xl font-bold tracking-tight text-slate-900 drop-shadow-sm">
                New <span className="text-blue-600">Coreline</span>
              </h2>
            </header>

            <div className="grid items-stretch gap-6 md:grid-cols-2 md:gap-8 relative z-10">
              {/* KIRI: LOGIN FORM CARD (Bersih & Putih) */}
              <div className="relative group animate-slide-in-left">
                <div className="absolute -inset-0.5 bg-gradient-to-br from-blue-300 to-cyan-300 rounded-3xl blur opacity-30 group-hover:opacity-60 transition duration-1000"></div>
                
                <div className="relative h-full bg-white backdrop-blur-xl border border-slate-200 rounded-2xl p-6 md:p-8 shadow-2xl">
                  <button
                    onClick={() => { setShowForm(false); setError(''); }}
                    className="mb-6 flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-blue-600 transition-colors"
                  >
                    <ChevronLeft className="w-4 h-4" /> Kembali ke Beranda
                  </button>

                  <div className="mb-6">
                    <h2 className="text-3xl font-extrabold text-slate-900 mb-2">Selamat Datang! 👋</h2>
                    <p className="text-slate-500 text-sm">Silakan masuk menggunakan kredensial AstByte Anda.</p>
                  </div>

                  {isSuccess && (
                    <div className="mb-4 p-4 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center gap-3 text-emerald-700 font-bold text-sm animate-bounce-in shadow-sm">
                      <Check className="w-5 h-5 text-emerald-600" /> Autentikasi berhasil! Memuat dashboard...
                    </div>
                  )}

                  {/* Toggle Button */}
                  <div className="grid grid-cols-2 gap-2 p-1.5 bg-slate-100 rounded-xl mb-6 border border-slate-200">
                    <button
                      type="button"
                      onClick={() => { setMode('email'); setError(''); }}
                      className={`py-2 text-sm font-bold rounded-lg transition-all ${mode === 'email' ? 'bg-white text-blue-600 shadow-sm border border-slate-200' : 'text-slate-500 hover:text-slate-700'}`}
                    >
                      Email
                    </button>
                    <button
                      type="button"
                      onClick={() => { setMode('publicId'); setError(''); }}
                      className={`py-2 text-sm font-bold rounded-lg transition-all ${mode === 'publicId' ? 'bg-white text-blue-600 shadow-sm border border-slate-200' : 'text-slate-500 hover:text-slate-700'}`}
                    >
                      Public ID
                    </button>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-5">
                    {mode === 'email' ? (
                      <>
                        <div className="space-y-1.5">
                          <label className="text-xs font-bold uppercase tracking-wider text-slate-700">Username</label>
                          <div className="relative group">
                            <input
                              type="text"
                              value={username}
                              onChange={(e) => setUsername(e.target.value.toLowerCase().replace('@astbyte.com', ''))}
                              placeholder="username"
                              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3.5 text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all outline-none focus:bg-white"
                            />
                            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm font-bold">@astbyte.com</span>
                          </div>
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-xs font-bold uppercase tracking-wider text-slate-700">Password</label>
                          <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3.5 text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all outline-none focus:bg-white"
                          />
                        </div>
                      </>
                    ) : (
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold uppercase tracking-wider text-slate-700">Public ID</label>
                        <input
                          type="text"
                          value={publicId}
                          onChange={(e) => setPublicId(e.target.value)}
                          placeholder="Contoh: 3f4a6b2c..."
                          className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3.5 text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all outline-none focus:bg-white"
                        />
                        <p className="text-xs text-slate-500 font-medium mt-1">ID terdapat di pengaturan profil akun.</p>
                      </div>
                    )}

                    <div className="flex justify-center pt-2 scale-95 origin-center">
                      <ReCAPTCHA ref={recaptchaRef} sitekey={RECAPTCHA_SITE_KEY} onChange={onRecaptchaChange} theme="light" />
                    </div>

                    {error && (
                      <div className="p-3 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3 text-red-600 text-sm font-medium animate-shake shadow-sm">
                        <AlertCircle className="w-5 h-5 shrink-0" />
                        {error}
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={loading || isSuccess || !recaptchaToken}
                      className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white font-bold py-3.5 rounded-xl shadow-[0_5px_15px_rgba(37,99,235,0.3)] transition-all transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {loading ? <Loader2 className="w-5 h-5 animate-spin"/> : "Masuk ke Dashboard"}
                      {!loading && <ArrowRight className="w-5 h-5"/>}
                    </button>
                  </form>
                </div>
              </div>

              {/* KANAN: FEATURES / DECORATION (Vibrant Gradient Panel) */}
              <div className="relative animate-slide-in-right hidden md:block">
                <div className="h-full bg-gradient-to-br from-blue-600 to-cyan-500 rounded-2xl p-8 shadow-2xl relative overflow-hidden flex flex-col justify-center border border-blue-400/30">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>
                  <div className="absolute bottom-0 left-0 w-40 h-40 bg-white/10 rounded-full blur-2xl -ml-10 -mb-10 pointer-events-none"></div>

                  <div className="relative z-10">
                    <h3 className="text-3xl font-extrabold text-white mb-3 flex items-center gap-3 drop-shadow-md">
                      <Zap className="w-8 h-8 text-yellow-300" /> Upgrade Skillmu!
                    </h3>
                    <p className="text-blue-50 text-sm mb-8 leading-relaxed font-medium">
                      "Investasi terbaik yang bisa kamu lakukan adalah berinvestasi pada dirimu sendiri melalui pendidikan dan peningkatan keahlian."
                    </p>

                    <div className="space-y-4">
                      {features.slice(0, 3).map((item, i) => (
                        <div key={i} className="flex items-start gap-4 p-4 rounded-xl bg-white/10 border border-white/20 backdrop-blur-sm hover:bg-white/20 transition-colors shadow-sm">
                          <div className="p-2 bg-white/20 rounded-lg text-white shadow-inner">
                            <item.icon className="w-5 h-5" />
                          </div>
                          <div>
                            <h4 className="font-bold text-white text-sm mb-1">{item.t}</h4>
                            <p className="text-xs text-blue-100 line-clamp-2">{item.d}</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-8 pt-6 border-t border-white/20">
                      <p className="text-xs font-bold text-blue-100 uppercase tracking-widest mb-3">Butuh Bantuan Akses?</p>
                      <a href={waHref} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 w-full py-3 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white font-bold rounded-xl transition-all shadow-md border border-white/30">
                        <MessageCircle className="w-5 h-5" /> Chat Tim Support
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
        .animate-float { animation: float 3s ease-in-out infinite; }
        
        @keyframes fade-in { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fade-in { animation: fade-in 0.6s ease-out forwards; }
        
        @keyframes slide-in-left { from { opacity: 0; transform: translateX(-20px); } to { opacity: 1; transform: translateX(0); } }
        .animate-slide-in-left { animation: slide-in-left 0.6s ease-out; }
        
        @keyframes slide-in-right { from { opacity: 0; transform: translateX(20px); } to { opacity: 1; transform: translateX(0); } }
        .animate-slide-in-right { animation: slide-in-right 0.6s ease-out; }

        @keyframes shake { 0%, 100% { transform: translateX(0); } 25% { transform: translateX(-5px); } 75% { transform: translateX(5px); } }
        .animate-shake { animation: shake 0.3s ease-in-out; }

        @keyframes bounce-in { 0% { transform: scale(0.9); opacity: 0; } 50% { transform: scale(1.05); opacity: 1; } 100% { transform: scale(1); opacity: 1; } }
        .animate-bounce-in { animation: bounce-in 0.4s ease-out forwards; }
      `}</style>
    </div>
  );
}