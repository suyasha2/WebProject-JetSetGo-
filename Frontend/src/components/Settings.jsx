import React, { useState, useRef, useEffect } from 'react';
import { User, Camera, Lock, Shield, Mail, Save, ShieldCheck, RefreshCcw } from 'lucide-react';

const AdminSettings = () => {
  const [activeSubTab, setActiveSubTab] = useState('profile');
  const [profileImg, setProfileImg] = useState(localStorage.getItem('userProfilePic') || null);
  const fileInputRef = useRef(null);

  // Form states to store input values
  const [formData, setFormData] = useState({
    fullName: 'Suyasha Neupane',
    email: 'suyasha@gmail.com'
  });

  // Handle Input Changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // --- SAVE TO DATABASE LOGIC ---
  const handleSave = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/admin/update', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (data.success) {
        alert("Profile updated in database!");
      }
    } catch (err) {
      console.error("Save failed", err);
    }
  };

  // --- Profile Picture Upload Logic ---
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const uploadData = new FormData();
    uploadData.append('profilePic', file);

    try {
      const response = await fetch('http://localhost:8000/api/upload-profile', {
        method: 'POST',
        body: uploadData,
      });
      const data = await response.json();
      if (data.success) {
        setProfileImg(data.imageUrl);
        localStorage.setItem('userProfilePic', data.imageUrl);
      }
    } catch (err) { console.error("Upload failed", err); }
  };

  return (
    <div className="animate-in fade-in duration-500">
      <div className="mb-10">
        <h2 className="text-5xl font-[1000] text-slate-900 uppercase italic tracking-tighter leading-none">
          System <span className="text-[#007BFF]">Settings</span>
        </h2>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* SIDE TABS */}
        <div className="w-full lg:w-64 space-y-2">
          <SettingsTab icon={<User size={18}/>} label="Profile" active={activeSubTab === 'profile'} onClick={() => setActiveSubTab('profile')} />
          <SettingsTab icon={<Lock size={18}/>} label="Security" active={activeSubTab === 'security'} onClick={() => setActiveSubTab('security')} />
        </div>

        {/* CONTENT */}
        <div className="flex-1 bg-white rounded-[45px] p-8 md:p-12 border border-slate-50 shadow-sm relative overflow-hidden">
          {activeSubTab === 'profile' && (
            <div className="space-y-10 animate-in slide-in-from-bottom-4 duration-700">
              
              {/* Header Card */}
              <div className="relative overflow-hidden bg-gradient-to-r from-slate-900 to-slate-800 rounded-[40px] p-10 text-white shadow-2xl">
                <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
                  <div className="relative group">
                    <div className="w-32 h-32 rounded-[35px] bg-gradient-to-tr from-[#007BFF] to-blue-400 p-1 shadow-[0_0_30px_rgba(0,123,255,0.3)]">
                      <div className="w-full h-full bg-slate-900 rounded-[32px] flex items-center justify-center overflow-hidden">
                        {profileImg ? <img src={profileImg} className="w-full h-full object-cover" /> : <span className="text-5xl font-black italic">A</span>}
                      </div>
                    </div>
                    <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" />
                    <button onClick={() => fileInputRef.current.click()} className="absolute -bottom-2 -right-2 p-3 bg-white text-[#007BFF] rounded-2xl shadow-xl hover:scale-110"><Camera size={20} /></button>
                  </div>
                  <div>
                    <h4 className="text-3xl font-[1000] tracking-tighter uppercase italic">{formData.fullName}</h4>
                    <p className="text-slate-400 font-bold text-xs uppercase tracking-[0.2em]">Verified Administrator</p>
                  </div>
                </div>
              </div>

              {/* Inputs */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <InputGroup 
                    label="Full Name" 
                    name="fullName" 
                    value={formData.fullName} 
                    onChange={handleChange} 
                    icon={<User size={18} className="text-[#007BFF]" />} 
                  />
                  <InputGroup 
                    label="Official Email" 
                    name="email" 
                    value={formData.email} 
                    onChange={handleChange} 
                    icon={<Mail size={18} className="text-[#007BFF]" />} 
                  />
                </div>
              </div>

              {/* SAVE BUTTON */}
              <div className="pt-8 border-t border-slate-100 flex justify-end">
                <button 
                  onClick={handleSave}
                  className="bg-[#007BFF] text-white px-10 py-5 rounded-[25px] font-[1000] uppercase text-xs tracking-[0.2em] flex items-center gap-3 hover:bg-slate-900 transition-all shadow-xl active:scale-95"
                >
                  <Save size={18} /> Save to Database
                </button>
              </div>
            </div>
          )}
          {/* Security Tab part remains same... */}
        </div>
      </div>
    </div>
  );
};

// Updated InputGroup to handle values
const InputGroup = ({ label, name, value, onChange, type = "text", icon }) => (
  <div className="space-y-3">
    <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2">{label}</label>
    <div className="relative group">
      <div className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#007BFF] transition-colors">{icon}</div>
      <input 
        type={type} 
        name={name}
        value={value}
        onChange={onChange}
        className="w-full bg-slate-50 border-2 border-transparent rounded-[22px] py-5 pl-14 pr-6 outline-none font-bold text-slate-700 focus:border-blue-100 focus:bg-white transition-all shadow-sm"
      />
    </div>
  </div>
);

const SettingsTab = ({ icon, label, active, onClick }) => (
  <button onClick={onClick} className={`w-full flex items-center gap-4 p-5 rounded-3xl font-black uppercase text-[11px] tracking-widest transition-all ${active ? 'bg-white text-[#007BFF] shadow-xl border border-slate-50 translate-x-2' : 'text-slate-400 hover:text-slate-600'}`}>{icon} {label}</button>
);

export default AdminSettings;