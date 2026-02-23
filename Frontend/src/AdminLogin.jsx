import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, Lock, Mail } from 'lucide-react';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleAdminAuth = (e) => {
    e.preventDefault();
    // Admin credentials logic
    if (email === "admin@travel.com" && password === "admin123") {
      localStorage.setItem('role', 'admin');
      alert("Welcome to Admin Console");
      navigate('/admin-panel');
    } else {
      alert("Unauthorized: Access denied for non-admins.");
    }
  };

  return (
    
    <div className="min-h-screen bg-[#F0F9FF] flex items-center justify-center p-6 font-sans">
      <div className="w-full max-w-md bg-white rounded-[40px] shadow-2xl p-10 border border-sky-100">
        
        {/* HEADER SECTION */}
        <div className="text-center mb-10">
          <div className="inline-flex p-4 bg-sky-100 rounded-3xl mb-4">
            <ShieldCheck size={40} className="text-sky-600" />
          </div>
          <h1 className="text-3xl font-[1000] text-slate-900 uppercase tracking-tighter">
            Admin Portal
          </h1>
          <p className="text-slate-400 font-bold text-sm italic">Staff Authentication Only</p>
        </div>

        <form onSubmit={handleAdminAuth} className="space-y-6">
          {/* ADMIN EMAIL */}
          <div className="space-y-2">
            <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Admin ID</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
              <input 
                type="email" 
                required
                className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl py-4 pl-12 pr-4 font-bold text-slate-700 focus:border-sky-500 focus:outline-none transition-all"
                placeholder="admin@travel.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          {/* ADMIN PASSWORD */}
          <div className="space-y-2">
            <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Secure Key</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
              <input 
                type="password" 
                required
                className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl py-4 pl-12 pr-4 font-bold text-slate-700 focus:border-sky-500 focus:outline-none transition-all"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <button 
            type="submit"
            className="w-full bg-slate-900 text-white py-5 rounded-2xl font-[1000] uppercase text-xs tracking-[0.2em] shadow-xl hover:bg-sky-600 active:scale-95 transition-all mt-4"
          >
            Access Admin Panel
          </button>
        </form>

        <div className="mt-8 text-center">
          <button 
            onClick={() => navigate('/login')}
            className="text-slate-400 font-bold text-[10px] uppercase tracking-tighter hover:text-sky-600"
          >
            ← Back to User Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;