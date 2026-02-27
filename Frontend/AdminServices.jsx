import React, { useState, useEffect } from 'react';
import { Plus, Trash2, X, Map, Phone, Clock, Building2 } from 'lucide-react';

const AdminServices = () => {
  const [services, setServices] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ category: '', hotelName: '', phone: '', status: '' });

  const fetchServices = async () => {
    const res = await fetch('http://localhost:8000/api/services/all');
    const result = await res.json();
    if (result.success) setServices(result.data);
  };

  useEffect(() => { fetchServices(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('http://localhost:8000/api/services/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });
    if ((await res.json()).success) {
      setIsModalOpen(false);
      setFormData({ category: '', hotelName: '', phone: '', status: '' });
      fetchServices();
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this service entry?")) {
      await fetch(`http://localhost:8000/api/services/delete/${id}`, { method: 'DELETE' });
      fetchServices();
    }
  };

  // Grouping logic display//
  const categories = [...new Set(services.map(s => s.category))];

  return (
    <div className="p-10 bg-[#F0F9FF] min-h-screen">
      <div className="flex justify-between items-center mb-10">
        <div>
          <h2 className="text-4xl font-[1000] text-sky-600 uppercase italic tracking-tighter">Travel <span className="text-slate-900">Services</span></h2>
          <p className="text-slate-400 font-bold text-xs uppercase tracking-widest mt-1">Manage Local Contact Directory</p>
        </div>
        <button onClick={() => setIsModalOpen(true)} className="bg-sky-600 text-white px-6 py-3 rounded-2xl font-black uppercase text-xs flex items-center gap-2 hover:bg-slate-900 transition-all shadow-lg">
          <Plus size={18}/> Add New Service
        </button>
      </div>

      <div className="space-y-12">
        {categories.map(cat => (
          <div key={cat} className="space-y-4">
            <h3 className="flex items-center gap-2 text-slate-800 font-black uppercase tracking-tighter text-xl">
              <Map className="text-sky-500" size={24} /> {cat}
            </h3>
            
            <div className="bg-white rounded-[35px] shadow-sm border border-sky-50 overflow-hidden">
              <table className="w-full text-left">
                <thead className="bg-sky-50/50 border-b border-sky-100 text-[10px] font-black text-sky-600 uppercase tracking-widest">
                  <tr>
                    <th className="px-8 py-5">Hotel Name</th>
                    <th className="px-8 py-5">Phone</th>
                    <th className="px-8 py-5">Status</th>
                    <th className="px-8 py-5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {services.filter(s => s.category === cat).map(service => (
                    <tr key={service.id} className="hover:bg-sky-50/30 transition-colors group">
                      <td className="px-8 py-5 font-bold text-slate-700">{service.hotelName}</td>
                      <td className="px-8 py-5 font-black text-sky-600">{service.phone}</td>
                      <td className="px-8 py-5">
                        <span className="bg-sky-100 text-sky-600 text-[9px] font-black px-3 py-1 rounded-full uppercase">
                          {service.status}
                        </span>
                      </td>
                      <td className="px-8 py-5 text-right">
                        <button onClick={() => handleDelete(service.id)} className="p-2 text-red-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all">
                          <Trash2 size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>

      {/* ADD MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[100] flex items-center justify-center p-6">
          <div className="bg-white w-full max-w-md rounded-[45px] p-10 relative shadow-2xl">
            <button onClick={() => setIsModalOpen(false)} className="absolute top-6 right-6 text-slate-300 hover:text-slate-900"><X size={24}/></button>
            <h3 className="text-2xl font-black uppercase italic mb-8 text-slate-900">Add <span className="text-sky-600">Service</span></h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input className="w-full bg-slate-50 border border-slate-100 p-4 rounded-2xl outline-none font-bold text-sm" placeholder="Category (e.g. EVEREST REGION)" value={formData.category} onChange={e => setFormData({...formData, category: e.target.value.toUpperCase()})} required />
              <input className="w-full bg-slate-50 border border-slate-100 p-4 rounded-2xl outline-none font-bold text-sm" placeholder="Hotel Name" value={formData.hotelName} onChange={e => setFormData({...formData, hotelName: e.target.value})} required />
              <input className="w-full bg-slate-50 border border-slate-100 p-4 rounded-2xl outline-none font-bold text-sm" placeholder="Phone Number" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} required />
              <input className="w-full bg-slate-50 border border-slate-100 p-4 rounded-2xl outline-none font-bold text-sm" placeholder="Status (e.g. OPEN 24/7)" value={formData.status} onChange={e => setFormData({...formData, status: e.target.value.toUpperCase()})} required />
              <button className="w-full bg-sky-600 text-white p-5 rounded-3xl font-black uppercase text-xs tracking-widest hover:bg-slate-900 transition-all shadow-xl">Save Directory</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminServices;