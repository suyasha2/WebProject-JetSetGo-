import React, { useState, useEffect } from 'react';
import { Hotel, Phone, Clock, Map } from 'lucide-react';

const TravelServices = () => {
  const [services, setServices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Database bata services fetch garne logic
  const fetchServices = async () => {
    try {
      const res = await fetch('http://localhost:8000/api/services/all');
      const result = await res.json();
      if (result.success) {
        setServices(result.data);
      }
    } catch (err) {
      console.error("Error fetching services:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  // Backend bata aayeko data lai Category anusar group garne (Everest, Pokhara, etc.)
  const categories = [...new Set(services.map(s => s.category))];

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sky-500"></div>
      </div>
    );
  }

  return (
    <div className="animate-in fade-in slide-in-from-bottom duration-500 space-y-12">
      {/* Heading */}
      <div className="border-b-4 border-sky-500/20 pb-4">
        <h1 className="text-4xl font-[1000] text-sky-600 uppercase tracking-tighter">
          Travel Services
        </h1>
        <p className="text-slate-500 font-bold mt-1 uppercase text-[10px] tracking-widest">Local Contact Directory</p>
      </div>
      
      {categories.length > 0 ? (
        categories.map((cat, index) => (
          <div key={index} className="space-y-4">
            <div className="flex items-center gap-3">
              <Map className="text-sky-500" size={20} />
              <h2 className="text-xl font-black text-slate-800 uppercase tracking-tight">{cat}</h2>
            </div>

            <div className="overflow-hidden rounded-[24px] border-2 border-sky-100 bg-white shadow-xl shadow-sky-900/5">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-sky-50 text-sky-700 border-b-2 border-sky-100">
                    <th className="p-6 font-black uppercase text-[11px] tracking-widest">
                      <div className="flex items-center gap-2"><Hotel size={16} /> Hotel Name</div>
                    </th>
                    <th className="p-6 font-black uppercase text-[11px] tracking-widest">
                      <div className="flex items-center gap-2"><Phone size={16} /> Phone</div>
                    </th>
                    <th className="p-6 font-black uppercase text-[11px] tracking-widest">
                      <div className="flex items-center gap-2"><Clock size={16} /> Status</div>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-sky-50">
                  {services.filter(s => s.category === cat).map((item, i) => (
                    <tr key={i} className="hover:bg-sky-50/30 transition-all">
                      <td className="p-6 font-bold text-slate-800">{item.hotelName}</td>
                      <td className="p-6 font-bold text-sky-600 tracking-wide">{item.phone}</td>
                      <td className="p-6">
                        <span className="inline-block px-4 py-1.5 bg-sky-100 text-sky-700 rounded-xl font-black text-[10px] uppercase">
                          {item.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))
      ) : (
        <div className="text-center py-20 bg-white rounded-[45px] border-2 border-dashed border-slate-100">
           <p className="text-slate-400 font-black uppercase text-sm tracking-widest">No services added yet by admin.</p>
        </div>
      )}
    </div>
  );
};

export default TravelServices;