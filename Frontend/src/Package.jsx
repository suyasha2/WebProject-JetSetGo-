import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Star, Hotel as HotelIcon, X, ChevronRight } from 'lucide-react';

const Packages = () => {
  const [locations, setLocations] = useState([]);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:8000/api/locations')
      .then(res => res.json())
      .then(result => { 
        if (result.success) setLocations(result.data); 
      });
  }, []);

  const renderItinerary = (itineraryData) => {
    try {
      if (!itineraryData) return null;
      const items = typeof itineraryData === 'string' ? JSON.parse(itineraryData) : itineraryData;
      return items.map((item, idx) => (
        <div key={idx} className="relative pl-8 pb-5 border-l-2 border-slate-100 last:border-0 text-left">
          <div className="absolute -left-[7px] top-0 w-3 h-3 rounded-full bg-white border-2 border-sky-500"></div>
          <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Day {item.day || (idx + 1)}</p>
          <h5 className="font-bold text-slate-800 text-xs italic">{item.title}</h5>
        </div>
      ));
    } catch (e) { return null; }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-10 font-sans text-left">
      <h1 className="text-5xl md:text-7xl font-black italic mb-16 uppercase tracking-tighter">Exclusive <span className="text-sky-500">Packages</span></h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {locations.map(pkg => (
          <div key={pkg.id} className="bg-white rounded-[45px] overflow-hidden shadow-sm hover:shadow-2xl transition-all border border-slate-100 group">
            <div className="relative h-72 overflow-hidden cursor-pointer" onClick={() => navigate(`/destination/${pkg.id}`)}>
              <img src={`http://localhost:8000/uploads/${pkg.image}`} className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-700" alt={pkg.name} />
              <div className="absolute top-6 right-6 bg-white/90 backdrop-blur px-4 py-1.5 rounded-full flex items-center gap-1.5 border border-white/50">
                <Star size={12} className="fill-amber-400 text-amber-400" />
                <span className="text-[11px] font-black text-slate-900">{pkg.rating || "4.9"}</span>
              </div>
            </div>
            <div className="p-8">
              <h3 className="text-2xl font-black mb-2 uppercase italic tracking-tighter text-slate-900">{pkg.name}</h3>
              <p className="text-slate-400 text-[10px] font-black uppercase mb-8 flex items-center gap-1.5 tracking-wider"><MapPin size={14} className="text-sky-500" /> {pkg.location}</p>
              <div className="flex gap-4">
                <button onClick={() => setSelectedPackage(pkg)} className="flex-1 bg-slate-50 text-slate-600 py-4 rounded-full font-black text-[10px] uppercase hover:bg-sky-50 transition-all tracking-widest active:scale-95">Quick View</button>
                <button onClick={() => navigate(`/destination/${pkg.id}`)} className="flex-1 bg-sky-500 text-white py-4 rounded-full font-black text-[10px] uppercase hover:bg-sky-600 transition-all tracking-widest shadow-lg shadow-sky-100 active:scale-95">Full Page</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* QUICK VIEW MODAL */}
      {selectedPackage && (
        <div className="fixed inset-0 z-[100] bg-slate-900/40 backdrop-blur-md flex items-center justify-center p-6">
          <div className="bg-white w-full max-w-4xl rounded-[50px] overflow-hidden flex flex-col md:flex-row max-h-[85vh] relative shadow-2xl border border-white">
            <button onClick={() => setSelectedPackage(null)} className="absolute top-6 right-6 p-2.5 bg-white text-slate-900 rounded-full z-10 shadow-md hover:bg-red-50 hover:text-red-500 transition-all"><X size={20} /></button>
            <div className="md:w-5/12 relative">
              <img src={`http://localhost:8000/uploads/${selectedPackage.image}`} className="w-full h-full object-cover" alt="Selected" />
            </div>
            <div className="md:w-7/12 p-12 overflow-y-auto bg-white flex flex-col">
              <div className="mb-8">
                <span className="bg-sky-50 text-sky-600 text-[9px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest border border-sky-100 mb-4 inline-block">Best Seller</span>
                <h2 className="text-4xl font-[1000] uppercase italic tracking-tighter text-slate-900 leading-none">{selectedPackage.name}</h2>
              </div>
              <div className="space-y-8 flex-grow">
                {/* Hotel Logic Fixed with /hotel-detail path */}
                <div 
                  className={`flex items-center gap-4 p-2 rounded-2xl transition-all ${selectedPackage.Hotel ? "cursor-pointer hover:bg-slate-50" : "opacity-50"}`}
                  onClick={() => selectedPackage.Hotel && navigate(`/hotel-detail/${selectedPackage.Hotel.id}`)}
                >
                  <div className="w-12 h-12 bg-sky-50 rounded-2xl flex items-center justify-center text-sky-500 border border-sky-100"><HotelIcon size={24} /></div>
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Accommodation {selectedPackage.Hotel && "(Click for Details)"}</p>
                    <p className="text-sm font-black text-slate-800 italic uppercase">
                      {selectedPackage.Hotel ? selectedPackage.Hotel.name : "Standard Stay Included"}
                    </p>
                  </div>
                </div>
                <div className="pt-6 border-t border-slate-50">
                  <p className="text-[10px] font-black text-sky-500 uppercase tracking-[0.2em] mb-5">Brief Itinerary</p>
                  <div className="max-h-[180px] overflow-y-auto pr-2 custom-scrollbar">
                    {renderItinerary(selectedPackage.itinerary)}
                  </div>
                </div>
              </div>
              <div className="mt-10 pt-8 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Total Stay</p>
                  <h4 className="text-4xl font-[1000] italic tracking-tight text-slate-900 leading-none">Rs. {selectedPackage.price}</h4>
                </div>
                <button onClick={() => navigate(`/booking/${selectedPackage.id}`)} className="bg-sky-500 text-white px-10 py-5 rounded-full font-black uppercase text-[11px] tracking-widest transition-all shadow-xl shadow-sky-100 flex items-center gap-3 group hover:bg-sky-600 active:scale-95">
                  Reserve <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Packages;