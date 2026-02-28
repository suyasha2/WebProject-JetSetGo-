import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft, MapPin, Star, ChevronRight,
  Info, Calendar, Hotel, Building2
} from 'lucide-react';

const DestinationDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [destination, setDestination] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/locations/${id}`);
        const result = await response.json();
        if (result.success) setDestination(result.data);
      } catch (err) {
        console.error("Error fetching detail:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchDetail();
  }, [id]);

  const renderItinerary = (itineraryData) => {
    try {
      if (!itineraryData) return null;
      const items = typeof itineraryData === 'string' ? JSON.parse(itineraryData) : itineraryData;
      return items.map((item, idx) => (
        <div key={idx} className="relative pl-10 pb-12 border-l-2 border-sky-100 last:border-0 text-left">
          <div className="absolute -left-[11px] top-0 w-5 h-5 rounded-full bg-white border-4 border-sky-500 shadow-sm"></div>
          <div className="bg-white p-6 rounded-[30px] border border-slate-50 shadow-sm hover:shadow-md transition-all">
            <p className="text-[10px] font-[1000] text-sky-500 uppercase tracking-[0.2em] mb-2">Day {item.day || (idx + 1)}</p>
            <h5 className="font-black text-slate-900 text-xl italic tracking-tighter">{item.title}</h5>
          </div>
        </div>
      ));
    } catch (e) { return null; }
  };

  if (loading) return <div className="h-screen flex items-center justify-center bg-white"><div className="text-2xl font-black italic text-sky-600 animate-pulse uppercase tracking-tighter">JetSetGo...</div></div>;
  if (!destination) return <div className="h-screen flex items-center justify-center font-black uppercase text-slate-400">Not Found</div>;

  return (
    <div className="min-h-screen bg-[#FDFDFD] pb-20">
      <nav className="p-8 flex items-center justify-between sticky top-0 bg-white/60 backdrop-blur-xl z-50">
        <button onClick={() => navigate(-1)} className="group flex items-center gap-3 bg-white border border-slate-200 px-6 py-3 rounded-full font-black uppercase text-[10px] tracking-widest hover:bg-sky-500 hover:text-white transition-all shadow-sm active:scale-95">
          <ArrowLeft size={18} /> BACK
        </button>
        <div className="flex items-center gap-2 bg-white px-5 py-2.5 rounded-full border border-slate-100 shadow-sm">
          <Star size={16} className="fill-amber-400 text-amber-400" />
          <span className="font-black text-slate-900">{destination.rating || "4.9"}</span>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          <div className="lg:col-span-5 text-left">
            <div className="sticky top-32">
              <div className="relative rounded-[50px] overflow-hidden shadow-2xl border-[12px] border-white group">
                <img src={`http://localhost:8000/uploads/${destination.image}`} className="w-full h-[650px] object-cover" alt={destination.name} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                <div className="absolute bottom-12 left-12 text-white text-left">
                  <h2 className="text-5xl font-[1000] uppercase italic tracking-tighter mb-2 leading-none">{destination.name}</h2>
                  <p className="font-bold uppercase text-[10px] flex items-center gap-2 tracking-[0.2em] text-sky-300"><MapPin size={16} /> {destination.location}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 text-left">
            <h1 className="text-7xl md:text-8xl font-[1000] text-slate-900 uppercase italic tracking-tighter leading-[0.8] mb-12">
              Explore <br /><span className="text-sky-600">The Trip.</span>
            </h1>

            <div className="space-y-6 mb-16">
              <h3 className="flex items-center gap-3 font-black uppercase text-[11px] text-slate-400 tracking-widest"><Info size={18} /> About Package</h3>
              <p className="text-slate-500 text-xl font-medium leading-relaxed italic">"{destination.description}"</p>
            </div>

            <div className="space-y-10 mb-16 text-left">
              <h3 className="flex items-center gap-3 font-black uppercase text-[11px] text-slate-400 tracking-widest"><Calendar size={18} /> Itinerary Plan</h3>
              <div className="mt-8">{renderItinerary(destination.itinerary)}</div>
            </div>

            {/* --- CLICKABLE ACCOMMODATION (FIXED LOGIC) --- */}
            <div className="space-y-6 mb-32 pt-8 border-t border-slate-100">
              <h3 className="flex items-center gap-3 font-black uppercase text-[11px] text-slate-400 tracking-widest text-left"><Hotel size={18} /> Accommodation</h3>
              
              <div 
                onClick={() => {
                  
                  if (destination.Hotel?.id) {
                    navigate(`/hotel-detail/${destination.Hotel.id}`);
                  }
                }}
                className={`group flex items-center justify-between p-8 rounded-[40px] border transition-all duration-300 text-left
                ${destination.Hotel ? "bg-sky-50/50 border-sky-100 cursor-pointer hover:shadow-2xl hover:bg-sky-100" : "bg-slate-50 border-slate-100 opacity-50"}`}
              >
                <div className="flex items-center gap-6">
                  <div className="w-16 h-16 bg-white rounded-[20px] flex items-center justify-center shadow-sm text-sky-500 group-hover:scale-110 transition-transform">
                    <Building2 size={32} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-sky-600 uppercase tracking-[0.2em] mb-1">Stay At</p>
                    <h4 className="text-3xl font-[1000] text-slate-900 italic tracking-tighter group-hover:text-sky-600 transition-colors">
                      {destination.Hotel?.name || "Premium Hotel Stay"}
                    </h4>
                    {destination.Hotel && (
                      <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-1 block group-hover:text-slate-500 leading-none">
                        Click for Admin's photos & description →
                      </span>
                    )}
                  </div>
                </div>
                <ChevronRight size={28} className="text-sky-300 group-hover:translate-x-2 transition-transform" />
              </div>
            </div>

            <div className="sticky bottom-10 bg-white/80 backdrop-blur-xl border border-white/50 p-6 rounded-[35px] shadow-2xl flex items-center justify-between gap-6 z-40">
              <div className="pl-4 text-left">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Total Package</p>
                <div className="flex items-baseline gap-1">
                  <h4 className="text-4xl font-[1000] tracking-tighter italic text-slate-900">Rs. {destination.price}</h4>
                  <span className="text-slate-400 font-bold italic text-[11px]">/Person</span>
                </div>
              </div>
              <button onClick={() => navigate(`/booking/${destination.id}`)} className="bg-sky-500 text-white px-12 py-5 rounded-full font-black uppercase text-xs tracking-[0.2em] hover:bg-sky-600 shadow-xl shadow-sky-100 flex items-center justify-center gap-4 group transition-all active:scale-95 cursor-pointer">
                Reserve Now <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DestinationDetail;