import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, Building2, ShieldCheck, Wifi, Coffee, Star } from 'lucide-react';

const HotelDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [hotel, setHotel] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:8000/api/hotels/${id}`)
      .then(res => res.json())
      .then(result => {
        if (result.success) setHotel(result.data);
      })
      .catch(err => console.error("Fetch error:", err))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return (
    <div className="h-screen flex items-center justify-center font-black italic text-sky-500 animate-pulse text-2xl uppercase">
      JetSetGo...
    </div>
  );

  if (!hotel) return <div className="h-screen flex items-center justify-center font-black uppercase text-slate-400">Hotel Details Not Found</div>;

  return (
    <div className="min-h-screen bg-white text-left font-sans">
      <div className="relative h-[60vh] w-full overflow-hidden">
        <img
          src={`http://localhost:8000/uploads/${hotel.image}`}
          className="w-full h-full object-cover"
          alt={hotel.name}
        />
        <div className="absolute inset-0 bg-black/20"></div>
        <button
          onClick={() => navigate(-1)}
          className="absolute top-10 left-10 bg-white p-5 rounded-full shadow-2xl hover:bg-sky-500 hover:text-white transition-all active:scale-90"
        >
          <ArrowLeft size={24} />
        </button>
      </div>

      <div className="max-w-4xl mx-auto px-8 -mt-24 relative z-10 pb-20">
        <div className="bg-white rounded-[60px] shadow-2xl p-16 border border-slate-50">
          <div className="flex justify-between items-start mb-10">
            <div className="text-left">
              <span className="bg-sky-50 text-sky-600 text-[10px] font-black px-6 py-2.5 rounded-full uppercase tracking-widest border border-sky-100 mb-6 inline-block italic">Selected Accommodation</span>
              <h1 className="text-6xl font-[1000] italic uppercase tracking-tighter text-slate-900 leading-[0.9]">{hotel.name}</h1>
              <p className="flex items-center gap-2 text-slate-400 font-bold uppercase text-xs mt-6 tracking-[0.2em]">
                <MapPin size={18} className="text-sky-500" /> {hotel.location}
              </p>
            </div>
            <div className="text-right">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Standard Rate</p>
              <h4 className="text-4xl font-[1000] text-sky-600 italic leading-none">Rs. {hotel.price}</h4>
              <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest mt-1">Per Night</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            <div className="bg-slate-50/50 p-8 rounded-[40px] flex flex-col items-center text-center border border-slate-100">
              <Building2 className="text-sky-500 mb-3" size={32} />
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 leading-none">Luxury Stay</span>
            </div>
            <div className="bg-slate-50/50 p-8 rounded-[40px] flex flex-col items-center text-center border border-slate-100">
              <ShieldCheck className="text-sky-500 mb-3" size={32} />
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 leading-none">Secured Area</span>
            </div>
            <div className="bg-slate-50/50 p-8 rounded-[40px] flex flex-col items-center text-center border border-slate-100">
              <Wifi className="text-sky-500 mb-3" size={32} />
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 leading-none">Free Access</span>
            </div>
          </div>

          <div className="space-y-8 text-left">
            <h3 className="text-xl font-black italic uppercase tracking-tighter text-slate-900 border-b-4 border-sky-500 inline-block">Hotel Description</h3>

            {/* ADMIN DESCRIPTION DISPLAY*/}
            <p className="text-slate-600 text-xl font-medium leading-relaxed italic whitespace-pre-line bg-sky-50/30 p-10 rounded-[40px]">
              "{hotel.description}"
            </p>
          </div>

          <button
            onClick={() => navigate(-1)}
            className="w-full mt-16 bg-sky-500 text-white px-14 py-5 rounded-full font-black uppercase text-xs tracking-[0.3em] hover:bg-sky-600 transition-all shadow-xl shadow-sky-100 active:scale-95 flex items-center justify-center gap-4 group"
          >
            Return to Trip
            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default HotelDetail;