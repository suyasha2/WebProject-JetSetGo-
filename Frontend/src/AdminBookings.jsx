import React, { useState, useEffect } from 'react';
import { Trash2, Calendar, User, MapPin, Users } from 'lucide-react';

const AdminBookings = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8000/api/bookings/all') 
      .then(res => res.json())
      .then(result => {
        if (result.success) setBookings(result.data);
      });
  }, []);

  const deleteBooking = async (id) => {
    if (window.confirm("Yo booking hataune ho?")) {
      await fetch(`http://localhost:8000/api/bookings/delete/${id}`, { method: 'DELETE' });
      setBookings(bookings.filter(b => b.id !== id));
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 text-left">
      <h2 className="text-4xl font-[1000] text-slate-900 uppercase italic tracking-tighter">
        Recent <span className="text-[#007BFF]">Bookings</span>
      </h2>
      
      <div className="bg-white rounded-[40px] border border-slate-100 shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-100">
              <th className="p-6 text-[10px] font-black uppercase tracking-widest text-slate-400">Customer</th>
              <th className="p-6 text-[10px] font-black uppercase tracking-widest text-slate-400">Destination</th>
              <th className="p-6 text-[10px] font-black uppercase tracking-widest text-slate-400">Travel Date</th>
              <th className="p-6 text-[10px] font-black uppercase tracking-widest text-slate-400">Guests</th>
              <th className="p-6 text-[10px] font-black uppercase tracking-widest text-slate-400">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {bookings.map((b) => (
              <tr key={b.id} className="hover:bg-slate-50/50 transition-all">
                <td className="p-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-sky-100 rounded-xl flex items-center justify-center text-sky-600"><User size={18}/></div>
                    <div>
                      <p className="font-black text-sm text-slate-900 uppercase italic">{b.fullName}</p>
                      <p className="text-[10px] text-slate-400 font-bold">{b.email}</p>
                    </div>
                  </div>
                </td>
                <td className="p-6 font-bold text-sm uppercase text-slate-600 flex items-center gap-2 mt-2">
                  <MapPin size={14} className="text-sky-500"/> {b.locationName}
                </td>
                <td className="p-6">
                  <div className="flex items-center gap-2 text-xs font-black text-slate-500 italic">
                    <Calendar size={14}/> {b.travelDate}
                  </div>
                </td>
                <td className="p-6">
                  <div className="flex items-center gap-2 text-xs font-black text-slate-900 bg-slate-100 w-fit px-3 py-1 rounded-lg">
                    <Users size={14}/> {b.guests}
                  </div>
                </td>
                <td className="p-6">
                  <button onClick={() => deleteBooking(b.id)} className="p-3 bg-red-50 text-red-400 rounded-xl hover:bg-red-500 hover:text-white transition-all">
                    <Trash2 size={16}/>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {bookings.length === 0 && (
          <div className="p-20 text-center font-black uppercase text-slate-300 italic tracking-widest">No bookings found</div>
        )}
      </div>
    </div>
  );
};

export default AdminBookings;