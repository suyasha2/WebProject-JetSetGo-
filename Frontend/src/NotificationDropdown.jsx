import React, { useState, useRef, useEffect } from 'react';
import { Bell, ClipboardList, Star } from 'lucide-react';

const NotificationDropdown = () => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const dropdownRef = useRef(null);

  // --- Fetching from: /api/notifications/admin ---
  const fetchNotifications = async () => {
    try {
      const res = await fetch('http://localhost:8000/api/notifications/admin');
      if (!res.ok) throw new Error("404 Not Found");
      const result = await res.json();
      if (result.success) {
        setNotifications(result.data || []);
      }
    } catch (err) {
      console.error("Notification Fetch Error:", err);
    }
  };

  useEffect(() => {
    fetchNotifications();
    const interval = setInterval(fetchNotifications, 5000); 
    
    const handleClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) setShowNotifications(false);
    };
    document.addEventListener("mousedown", handleClick);
    return () => {
      clearInterval(interval);
      document.removeEventListener("mousedown", handleClick);
    };
  }, []);

  const handleClearAll = async () => {
    if (!window.confirm("Clear all notification?")) return;
    try {
      const res = await fetch('http://localhost:8000/api/notifications/clear/admin', { 
        method: 'DELETE' 
      });
      const result = await res.json();
      if (result.success) setNotifications([]);
    } catch (err) {
      console.error("Clear Error:", err);
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button 
        onClick={() => setShowNotifications(!showNotifications)}
        className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400 hover:text-sky-500 hover:bg-sky-50 transition-all cursor-pointer relative"
      >
        <Bell size={22} />
        {notifications.length > 0 && (
          <span className="absolute top-3 right-3 w-2.5 h-2.5 bg-red-500 border-2 border-white rounded-full animate-pulse"></span>
        )}
      </button>

      {showNotifications && (
        <div className="absolute right-0 mt-4 w-85 bg-white rounded-[35px] shadow-2xl border border-slate-50 overflow-hidden z-[100] animate-in fade-in slide-in-from-top-5 duration-300 text-left">
          <div className="p-6 border-b border-slate-50 flex justify-between items-center bg-slate-50/30">
            <p className="font-[1000] uppercase italic text-sm tracking-tighter text-slate-800">Live Alerts</p>
            {notifications.length > 0 && (
              <span className="bg-sky-500 text-white text-[9px] font-black px-2 py-1 rounded-lg italic">{notifications.length} NEW</span>
            )}
          </div>

          <div className="max-h-[400px] overflow-y-auto custom-scrollbar">
            {notifications.length > 0 ? (
              notifications.map((n) => (
                <div key={n.id} className="p-6 border-b border-slate-50 hover:bg-slate-50/80 transition-all group">
                  <div className="flex items-start gap-3">
                    <div className={`p-2 rounded-xl ${n.title?.includes('BOOKING') ? 'bg-green-50 text-green-500' : 'bg-amber-50 text-amber-500'}`}>
                      {n.title?.includes('BOOKING') ? <ClipboardList size={14}/> : <Star size={14}/>}
                    </div>
                    <div>
                      <p className="font-[1000] text-[11px] text-slate-900 italic uppercase mb-1 leading-none group-hover:text-sky-600 transition-colors">{n.title}</p>
                      <p className="text-xs text-slate-500 font-bold leading-relaxed">{n.desc}</p>
                      <p className="text-[9px] font-black text-slate-300 uppercase italic mt-2 tracking-widest">
                        {n.createdAt ? new Date(n.createdAt).toLocaleString() : 'JUST NOW'}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-12 text-center opacity-20">
                <Bell size={40} className="mx-auto mb-3 text-slate-400" />
                <p className="font-black text-[10px] uppercase italic">System is Quiet</p>
              </div>
            )}
          </div>

          {notifications.length > 0 && (
            <div className="p-4 bg-white border-t border-slate-50">
              <button 
                onClick={handleClearAll}
                className="w-full py-4 rounded-[20px] text-[10px] font-black uppercase text-white bg-red-500 hover:bg-red-600 transition-all italic cursor-pointer tracking-widest"
              >
                Clear All Alerts
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default NotificationDropdown;