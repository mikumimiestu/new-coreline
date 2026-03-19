import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft, Search, Navigation, MapPin, 
  Building2, Loader2, CheckCircle, MessageCircle, X,
  AlertTriangle, Globe
} from 'lucide-react';
import { MapContainer, TileLayer, Marker, Tooltip, useMapEvents, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// --- Perbaikan Bug Icon Marker Leaflet di React ---
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

/* ================================
 * DATA KANTOR PERUSAHAAN
 * ================================ */
const OFFICE_LOCATION = {
  center: [-0.9488235, 100.4602757] as [number, number], // Titik Real PT ASTRAL BYTE TECHNOLOGY
  name: "PT ASTRAL BYTE TECHNOLOGY (ASTBYTE)"
};

/* ================================
 * KOMPONEN HELPER PETA (INTERAKTIF)
 * ================================ */
function MapEvents({ setPinPos, setSearchText, checkAreaAvailability, mapCenter, mapZoom }: any) {
  const map = useMap();

  useEffect(() => {
    if (mapCenter) {
      map.flyTo(mapCenter, mapZoom, { animate: true, duration: 1.5 });
    }
  }, [mapCenter, mapZoom, map]);

  useMapEvents({
    async click(e) {
      const { lat, lng } = e.latlng;
      setPinPos([lat, lng]);

      try {
        const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`);
        const data = await res.json();
        
        if (data && data.display_name) {
          setSearchText(data.display_name);
          checkAreaAvailability(data.display_name);
        } else {
           const fallbackText = `Titik Peta (${lat.toFixed(4)}, ${lng.toFixed(4)})`;
           setSearchText(fallbackText);
           checkAreaAvailability("");
        }
      } catch (error) {
        const fallbackText = `Titik Peta (${lat.toFixed(4)}, ${lng.toFixed(4)})`;
        setSearchText(fallbackText);
        checkAreaAvailability("");
      }
    },
  });
  return null;
}

/* ================================
 * MAIN COMPONENT
 * ================================ */
export default function OfflineMentoringPage() {
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState('');
  const [isLocating, setIsLocating] = useState(false);
  
  // State Peta - Default: Pusat Kota Padang
  const [mapCenter, setMapCenter] = useState<[number, number]>([-0.9471, 100.3511]); 
  const [mapZoom, setMapZoom] = useState<number>(12);
  const [pinPos, setPinPos] = useState<[number, number] | null>(null);
  
  // State Ketersediaan Area (idle / available / unavailable)
  const [availability, setAvailability] = useState<'idle' | 'available' | 'unavailable'>('idle');

  const checkAreaAvailability = (locationName: string) => {
    const query = locationName.toLowerCase();
    const validAreas = [
      'indarung', 'lubuk kilangan', 'lubukkilangan', 'kuranji', 
      'pauh', 'gadut', 'bandar buat', 'lubuk begalung', 'lubukbegalung','nangka', 'gadut', 'padang besi', 'padang basi'
    ];
    
    const isAvailable = validAreas.some(area => query.includes(area));

    if (isAvailable) {
      setAvailability('available');
    } else if (query.trim() === '') {
      setAvailability('idle');
      setPinPos(null);
    } else {
      // Jika di luar jangkauan (tapi tetap bisa dipesan dengan biaya)
      setAvailability('unavailable');
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchText) {
        checkAreaAvailability(searchText);
      } else {
        setAvailability('idle');
        setPinPos(null);
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [searchText]);

  const handleGetLocation = () => {
    setIsLocating(true);
    
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          const userPos: [number, number] = [latitude, longitude];
          
          setPinPos(userPos);
          setMapCenter(userPos);
          setMapZoom(14);

          try {
            const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`);
            const data = await res.json();
            const address = data.display_name || `Lokasi Anda (${latitude.toFixed(4)}, ${longitude.toFixed(4)})`;
            
            setSearchText(address);
            checkAreaAvailability(address);
          } catch (error) {
            setSearchText("Lokasi Terdeteksi");
            checkAreaAvailability("");
          }
          setIsLocating(false);
        },
        (error) => {
          console.error(error);
          setIsLocating(false);
          alert("Gagal mendapatkan lokasi. Pastikan izin GPS pada browser aktif.");
        },
        { enableHighAccuracy: true }
      );
    } else {
      setIsLocating(false);
      alert("Browser Anda tidak mendukung fitur lokasi.");
    }
  };

  const handleShowAvailableArea = () => {
    // Terbangkan kamera ke sekitar Padang (Indarung/Lubuk Kilangan)
    setMapCenter([-0.9400, 100.4300]);
    setMapZoom(12);
  };

  const handleBooking = () => {
    // Sisipkan note bahwa user mau bayar fee kalau lokasinya unavailable
    const isExtraFee = availability === 'unavailable';
    const feeNote = isExtraFee ? "\n\n*(Saya bersedia membayar biaya tambahan transport karena lokasi berada di luar jangkauan gratis)*" : "";
    
    const text = encodeURIComponent(`Halo admin Coreline, saya member Ultimate. Saya ingin menjadwalkan sesi Mentoring Offline di lokasi: \n\n📍 ${searchText}${feeNote}\n\nMohon konfirmasi jadwal mentor yang tersedia ya.`);
    window.open(`https://wa.me/6285183209494?text=${text}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans selection:bg-amber-500/30 overflow-x-hidden relative flex flex-col">
      
      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 opacity-[0.4] bg-[linear-gradient(rgba(203,213,225,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(203,213,225,0.5)_1px,transparent_1px)] bg-[size:30px_30px]"></div>
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-amber-300/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-orange-300/10 rounded-full blur-[100px]" />
      </div>

      {/* Navbar Minimalis */}
      <nav className="sticky top-0 z-40 w-full border-b border-slate-200 bg-white/80 backdrop-blur-xl shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <button onClick={() => navigate(-1)} className="group flex items-center gap-2 px-4 py-2 text-sm font-bold text-slate-500 hover:text-amber-600 transition-colors bg-white rounded-full border border-slate-200 shadow-sm hover:shadow-md">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Kembali
          </button>
          
          <div className="flex items-center gap-2 bg-amber-50 border border-amber-200 px-4 py-2 rounded-xl">
             <Building2 className="w-4 h-4 text-amber-600" />
             <span className="text-sm font-black text-amber-700 uppercase tracking-wider">Ultimate Feature</span>
          </div>
        </div>
      </nav>

      <main className="relative z-10 max-w-7xl mx-auto px-4 py-10 sm:px-6 lg:px-8 flex flex-col flex-1 w-full">
        
        <div className="flex flex-col lg:flex-row gap-8">
            {/* Kolom Kiri: Info & Search */}
            <div className="w-full lg:w-5/12 flex flex-col animate-fade-in-up">
               <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 text-white mb-6 shadow-lg shadow-amber-500/30">
                  <MapPin className="w-7 h-7" />
               </div>
               <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">
                 Tentukan Titik Temu Mentoring
               </h1>
               <p className="text-slate-600 text-sm font-medium leading-relaxed mb-8">
                 Ketik lokasi atau langsung <b className="text-slate-800">klik pada area peta</b> untuk mengatur titik kumpul mentoring offline Anda.
               </p>

               {/* Input Search */}
               <div className="relative w-full mb-4">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input 
                     type="text"
                     value={searchText}
                     onChange={(e) => setSearchText(e.target.value)}
                     placeholder="Cari lokasi secara manual..."
                     className="w-full bg-white border border-slate-200 rounded-2xl py-4 pl-12 pr-10 text-slate-900 font-bold placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-all shadow-sm"
                  />
                  {searchText && (
                     <button onClick={() => setSearchText('')} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                        <X className="w-5 h-5" />
                     </button>
                  )}
               </div>

               {/* Get Location Button */}
               <button 
                  onClick={handleGetLocation}
                  disabled={isLocating}
                  className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl font-bold transition-all shadow-sm active:scale-95 border bg-white border-slate-200 text-slate-700 hover:bg-slate-50 hover:text-amber-600 hover:border-amber-200 disabled:opacity-70 disabled:cursor-not-allowed mb-8"
               >
                  {isLocating ? <Loader2 className="w-5 h-5 animate-spin" /> : <Navigation className="w-5 h-5 text-blue-500" />}
                  Deteksi Lokasi Anda Saat Ini
               </button>

               {/* Status Ketersediaan Panel */}
               {availability !== 'idle' && (
                  <div className={`p-6 rounded-3xl border shadow-sm transition-all duration-500 ${
                     availability === 'available' 
                       ? 'bg-emerald-50 border-emerald-200 text-emerald-800' 
                       : 'bg-orange-50 border-orange-200 text-orange-800'
                  }`}>
                     <div className="flex items-center gap-3 mb-3">
                        {availability === 'available' ? (
                           <CheckCircle className="w-7 h-7 text-emerald-500 shrink-0" />
                        ) : (
                           <AlertTriangle className="w-7 h-7 text-orange-500 shrink-0" />
                        )}
                        <h3 className="font-extrabold text-lg">
                           {availability === 'available' ? 'Area Terjangkau!' : 'Dikenakan Biaya Tambahan'}
                       </h3>
                     </div>
                     
                     <p className="text-sm font-medium mb-6 leading-relaxed opacity-90 line-clamp-4">
                        {availability === 'available' 
                          ? `Keren! Titik yang dipilih berada dalam jangkauan mentor kami secara GRATIS. Klik tombol di bawah untuk proses penjadwalan via WhatsApp.`
                          : `Lokasi tersebut berada di luar area utama layanan kami. Anda tetap bisa menjadwalkan mentoring di area ini dengan tambahan biaya transport mentor.`
                        }
                     </p>

                     <div className="flex flex-col gap-3">
                         <button 
                            onClick={handleBooking}
                            className={`w-full flex items-center justify-center gap-2 px-6 py-3.5 ${
                              availability === 'available' ? 'bg-slate-900 hover:bg-slate-800 text-white' : 'bg-orange-600 hover:bg-orange-700 text-white'
                            } rounded-xl font-bold transition-all shadow-md hover:shadow-lg active:scale-95`}
                         >
                            <MessageCircle className="w-5 h-5" /> Hubungi Admin via WA
                         </button>

                         {availability !== 'available' && (
                            <button 
                               onClick={handleShowAvailableArea}
                               className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-white hover:bg-slate-50 text-slate-800 border border-slate-200 rounded-xl font-bold transition-all shadow-sm active:scale-95"
                            >
                               <MapPin className="w-5 h-5 text-amber-500" /> Tampilkan Area Gratis
                            </button>
                         )}
                     </div>
                  </div>
               )}
            </div>

            {/* Kolom Kanan: Peta */}
            <div className="w-full lg:w-7/12 animate-fade-in-up flex flex-col" style={{ animationDelay: '150ms' }}>
               <div className="relative w-full flex-1 min-h-[400px] lg:min-h-[500px] rounded-[2.5rem] border-4 border-white shadow-xl overflow-hidden z-10 bg-slate-100">
                  
                  {/* Pesan Bantuan Sebelum Klik Peta */}
                  {!pinPos && (
                     <div className="absolute top-4 left-1/2 -translate-x-1/2 z-[1000] pointer-events-none">
                        <div className="bg-slate-900/80 backdrop-blur-md px-6 py-3 rounded-full text-white font-bold text-sm shadow-lg flex items-center gap-2 animate-bounce">
                           <MapPin className="w-4 h-4 text-amber-400" /> Silakan klik di area peta
                        </div>
                     </div>
                  )}

                  {/* Komponen Peta Utama */}
                  <MapContainer center={mapCenter} zoom={mapZoom} style={{ height: '100%', width: '100%', zIndex: 1 }}>
                    <TileLayer
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />

                    {/* Marker Khusus Kantor Perusahaan */}
                    <Marker position={OFFICE_LOCATION.center}>
                      <Tooltip
                        direction="bottom"
                        offset={[0, 20]}
                        opacity={1}
                        permanent
                        className="inline-flex items-center gap-2 font-extrabold text-amber-700 bg-amber-50 border-amber-200 shadow-md"
                      >
                        <img src="https://www.astbyte.com/icon.png" className="h-6 w-6" alt="ASTBYTE" />
                        <span>{OFFICE_LOCATION.name}</span>
                      </Tooltip>
                    </Marker>

                    {/* Marker Titik Pilihan User */}
                    {pinPos && <Marker position={pinPos} />}
                    
                    <MapEvents 
                      setPinPos={setPinPos} 
                      setSearchText={setSearchText} 
                      checkAreaAvailability={checkAreaAvailability} 
                      mapCenter={mapCenter} 
                      mapZoom={mapZoom}
                    />
                  </MapContainer>
               </div>
            </div>
        </div>

        {/* --- INFORMASI JANGKAUAN WILAYAH BAWAH --- */}
        <div className="mt-12 bg-white rounded-3xl p-8 border border-slate-200 shadow-sm animate-fade-in-up" style={{ animationDelay: '200ms' }}>
          <h3 className="text-xl font-extrabold text-slate-900 mb-6 flex items-center gap-2">
            <MapPin className="w-6 h-6 text-amber-500" /> Informasi Jangkauan Wilayah
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Area Tercover Saat Ini */}
            <div className="bg-emerald-50 rounded-2xl p-6 border border-emerald-100">
              <h4 className="font-bold text-emerald-800 mb-3 flex items-center gap-2">
                <CheckCircle className="w-5 h-5" /> Area Tercover Gratis
              </h4>
              <ul className="text-sm font-medium text-emerald-700 space-y-2">
                <li><span className="font-extrabold text-emerald-900 inline-block w-24">Provinsi</span> : Sumatera Barat</li>
                <li><span className="font-extrabold text-emerald-900 inline-block w-24">Kota</span> : Padang</li>
                <li className="pt-2 border-t border-emerald-200/50">
                  <span className="font-extrabold text-emerald-900 block mb-1">Daftar Lokasi:</span> 
                  Indarung, Lubuk Kilangan, Kuranji, Pauh, Gadut, Bandar Buat, Lubuk Begalung, Gadut, Padang Basi.
                </li>
              </ul>
            </div>

            {/* Area Sedang Dibangun (Coming Soon Lokal) */}
            <div className="bg-amber-50 rounded-2xl p-6 border border-amber-100">
              <h4 className="font-bold text-amber-800 mb-3 flex items-center gap-2">
                <Building2 className="w-5 h-5" /> Sedang Pengembangan
              </h4>
              <ul className="text-sm font-medium text-amber-700 space-y-2">
                <li><span className="font-extrabold text-amber-900 inline-block w-24">Provinsi</span> : Sumatera Barat</li>
                <li><span className="font-extrabold text-amber-900 inline-block w-24">Target Kota</span> : Bukittinggi, Payakumbuh, Pariaman</li>
                <li className="pt-3 italic text-xs text-amber-600 font-bold border-t border-amber-200/50">
                  * Kami sedang mempersiapkan infrastruktur dan mentor ahli terbaik untuk menjangkau area-area ini!
                </li>
              </ul>
            </div>

            {/* Area Ekspansi Nasional (Luar Sumbar) */}
            <div className="bg-purple-50 rounded-2xl p-6 border border-purple-100">
              <h4 className="font-bold text-purple-800 mb-3 flex items-center gap-2">
                <Globe className="w-5 h-5" /> Ekspansi Nasional
              </h4>
              <ul className="text-sm font-medium text-purple-700 space-y-2">
                <li><span className="font-extrabold text-purple-900 inline-block w-24">Wilayah</span> : Luar Sumbar</li>
                <li><span className="font-extrabold text-purple-900 inline-block w-24">Target Area</span> : Jakarta, Pekan Baru, Medan</li>
                <li className="pt-3 italic text-xs text-purple-600 font-bold border-t border-purple-200/50">
                  * Coreline akan segera hadir dengan pengalaman mentoring tatap muka premium di kota-kota besar Indonesia.
                </li>
              </ul>
            </div>

          </div>
        </div>

      </main>

      <style>{`
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fade-in-up { animation: fadeInUp 0.5s ease-out forwards; }
        
        .leaflet-container { outline: none !important; }
        .leaflet-tooltip { background: rgba(255,255,255,0.85); border-radius: 8px; padding: 4px 8px; }
      `}</style>
    </div>
  );
}
