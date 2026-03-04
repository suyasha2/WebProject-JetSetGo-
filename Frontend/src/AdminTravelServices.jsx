import React, { useState, useEffect } from 'react';
import { Plus, Trash2, X, Map, Phone, Clock, Hotel } from 'lucide-react';

const AdminTravelServices = () => {
  const [services, setServices] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ 
    category: '', 
    hotelName: '', 
    phone: '', 
    status: '' 
  });

  const fetchServices = async () => {
    try {
      // Backend Route matches: router.get("/all")
      const res = await fetch('http://localhost:8000/api/services/all');
      const result = await res.json();
      if (result.success) {
        setServices(result.data || []);
      }
    } catch (err) { 
      console.error("Error fetching services:", err); 
    }
  };

  useEffect(() => { 
    fetchServices(); 
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Backend Route matches: router.post("/add")
      const res = await fetch('http://localhost:8000/api/services/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData) 
      });
      
      const result = await res.json();
      if (result.success) {
        setIsModalOpen(false);
        setFormData({ category: '', hotelName: '', phone: '', status: '' });
        fetchServices();
        alert("Success! Data saved in pgAdmin.");
      } else {
        alert("Error: " + (result.message || "Failed to save"));
      }
    } catch (err) { 
      alert("Server connection failed!");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this entry?")) {
      try {
        // Backend Route matches: router.delete("/delete/:id")
        const res = await fetch(`http://localhost:8000/api/services/delete/${id}`, { 
          method: 'DELETE' 
        });
        const result = await res.json();
        if (result.success) fetchServices();
      } catch (err) { console.error(err); }
    }
  };

  // Grouping by 'category' (e.g. Everest Region)
  const categories = [...new Set(services.map(s => s.category))];

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-8 border-b-4 border-sky-50 pb-6">
        <div>
          <h2 className="text-3xl font-[1000] text-sky-600 uppercase italic">Travel Services</h2>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Database: pgAdmin (PostgreSQL)</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)} 
          className="bg-slate-900 text-white px-8 py-4 rounded-2xl font-black uppercase text-[11px] flex items-center gap-2 hover:bg-sky-600 transition-all shadow-xl shadow-sky-900/10"
        >
          <Plus size={18}/> Add New Service
        </button>
      </div>

      <div className="space-y-12">
        {categories.length > 0 ? categories.map(cat => (
          <div key={cat} className="space-y-5">
            <h3 className="flex items-center gap-3 text-slate-800 font-[1000] uppercase tracking-tighter text-xl italic">
              <Map className="text-sky-500" size={22} /> {cat}
            </h3>
            
            <div className="bg-white rounded-[40px] shadow-2xl shadow-sky-900/5 border border-sky-100 overflow-hidden">
              <table className="w-full text-left">
                <thead className="bg-sky-50/50 border-b-2 border-sky-100 text-[11px] font-black text-sky-700 uppercase tracking-widest">
                  <tr>
                    <th className="px-10 py-6">Hotel Name</th>
                    <th className="px-10 py-6">Phone</th>
                    <th className="px-10 py-6">Status</th>
                    <th className="px-10 py-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-sky-50">
                  {services.filter(s => s.category === cat).map(service => (
                    <tr key={service.id} className="hover:bg-sky-50/20 transition-all">
                      <td className="px-10 py-6 font-bold text-slate-800">{service.hotelName}</td>
                      <td className="px-10 py-6 font-black text-sky-600 tracking-tight">{service.phone}</td>
                      <td className="px-10 py-6">
                        <span className="bg-sky-100/80 text-sky-700 text-[10px] font-[1000] px-4 py-2 rounded-xl uppercase">
                          {service.status}
                        </span>
                      </td>
                      <td className="px-10 py-6 text-right">
                        <button 
                          onClick={() => handleDelete(service.id)} 
                          className="p-3 bg-red-50 text-red-400 hover:bg-red-500 hover:text-white rounded-2xl transition-all"
                        >
                          <Trash2 size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )) : (
          <div className="text-center py-20 bg-white rounded-[40px] border border-dashed border-sky-200 text-slate-400 font-bold uppercase text-xs tracking-widest">
            No services added yet. Click "Add New Service" to start.
          </div>
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-[200] flex items-center justify-center p-6">
          <div className="bg-white w-full max-w-lg rounded-[50px] p-12 relative shadow-2xl">
            <button 
              type="button"
              onClick={() => setIsModalOpen(false)} 
              className="absolute top-8 right-8 text-slate-300 hover:text-slate-900"
            >
              <X size={28}/>
            </button>
            <h3 className="text-3xl font-[1000] uppercase italic mb-10 text-slate-900">Add <span className="text-sky-600">Entry</span></h3>
            
            <form onSubmit={handleSubmit} className="space-y-5">
              <input 
                className="w-full bg-slate-50 border border-slate-100 p-5 rounded-3xl outline-none font-bold" 
                placeholder="Region (e.g. EVEREST REGION)" 
                value={formData.category} 
                onChange={e => setFormData({...formData, category: e.target.value})} 
                required 
              />
              <input 
                className="w-full bg-slate-50 border border-slate-100 p-5 rounded-3xl outline-none font-bold" 
                placeholder="Hotel Name" 
                value={formData.hotelName} 
                onChange={e => setFormData({...formData, hotelName: e.target.value})} 
                required 
              />
              <input 
                className="w-full bg-slate-50 border border-slate-100 p-5 rounded-3xl outline-none font-bold" 
                placeholder="Phone Number" 
                value={formData.phone} 
                onChange={e => setFormData({...formData, phone: e.target.value})} 
                required 
              />
              <input 
                className="w-full bg-slate-50 border border-slate-100 p-5 rounded-3xl outline-none font-bold" 
                placeholder="Status (e.g. OPEN 24/7)" 
                value={formData.status} 
                onChange={e => setFormData({...formData, status: e.target.value})} 
                required 
              />
              <button 
                type="submit" 
                className="w-full bg-sky-600 text-white p-6 rounded-[30px] font-black uppercase text-sm tracking-widest hover:bg-slate-900 transition-all shadow-2xl shadow-sky-600/20"
              >
                Save to pgAdmin
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminTravelServices;