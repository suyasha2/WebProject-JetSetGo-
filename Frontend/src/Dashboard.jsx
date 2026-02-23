import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Search, Star, MapPin, LayoutDashboard, 
  BookmarkCheck, MessageSquare, LogOut, 
  User, Heart, Settings as SettingsIcon, ShieldAlert, X
} from 'lucide-react';

import Settings from './components/Settings';
import TravelServices from './TravelServices'; 
import logo from "./assets/logo.png";

const Dashboard = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');
  const [activeTab, setActiveTab] = useState('explore');
  const [searchQuery, setSearchQuery] = useState('');
  
  const [locations, setLocations] = useState([]); 
  const [favorites, setFavorites] = useState([]); 
  const [reviews, setReviews] = useState([]); 

  // MODAL STATES
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedLoc, setSelectedLoc] = useState(null);
  const [tempReview, setTempReview] = useState({ rating: 5, comment: "" });

  const fetchData = async () => {
    try {
      const locRes = await fetch('http://localhost:8000/api/locations');
      const lData = await locRes.json();
      if (lData.success) setLocations(lData.data);

      const revRes = await fetch('http://localhost:8000/api/reviews/all');
      const rData = await revRes.json();
      if (rData.success) setReviews(rData.data);

      const user = localStorage.getItem("user");
      const favRes = await fetch(`http://localhost:8000/api/favorites/${user}`);
      const fData = await favRes.json();
      if (fData.success) setFavorites(fData.data);
    } catch (err) { console.error(err); }
  };

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) navigate("/login");
    else {
      setUserName(user);
      fetchData();
    }
  }, [navigate]);

  const toggleFavorite = async (id) => {
    try {
      const res = await fetch('http://localhost:8000/api/favorites/toggle', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: userName, locationId: id })
      });
      const result = await res.json();
      if (result.success) {
        setFavorites(prev => result.action === "added" ? [...prev, id] : prev.filter(f => f !== id));
      }
    } catch (err) { console.error(err); }
  };

  const submitReview = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:8000/api/reviews/add', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          username: userName, 
          rating: tempReview.rating, 
          comment: tempReview.comment,
          locationName: selectedLoc.name 
        })
      });
      if ((await res.json()).success) {
        setIsModalOpen(false);
        setTempReview({ rating: 5, comment: "" });
        fetchData(); // List update garna
      }
    } catch (err) { alert("Error saving review"); }
  };

  const filteredExplore = locations.filter(l => 
    l.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    l.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex min-h-screen bg-[#F0F9FF]">
      {/* SIDEBAR */}
      <aside className="w-72 bg-gradient-to-b from-sky-600 to-blue-700 fixed h-full z-20 flex flex-col">
        <div className="p-8">
          <div className="flex items-center gap-3 mb-12">
            <img src={logo} alt="Logo" className="w-8 h-8 bg-white p-1 rounded-lg" />
            <span className="text-2xl font-black text-white uppercase italic tracking-tighter">JetSetGo</span>
          </div>
          <nav className="space-y-3">
            <SidebarItem icon={<LayoutDashboard size={20}/>} label="Explore" active={activeTab === 'explore'} onClick={() => setActiveTab('explore')} />
            <SidebarItem icon={<BookmarkCheck size={20}/>} label="My Bookings" active={activeTab === 'bookings'} onClick={() => setActiveTab('bookings')} />
            <SidebarItem icon={<Heart size={20}/>} label="Favourites" active={activeTab === 'favorites'} onClick={() => setActiveTab('favorites')} />
            <SidebarItem icon={<ShieldAlert size={20}/>} label="Services" active={activeTab === 'services'} onClick={() => setActiveTab('services')} />
            <SidebarItem icon={<MessageSquare size={20}/>} label="My Reviews" active={activeTab === 'reviews'} onClick={() => setActiveTab('reviews')} />
            <SidebarItem icon={<SettingsIcon size={20}/>} label="Settings" active={activeTab === 'settings'} onClick={() => setActiveTab('settings')} />
          </nav>
        </div>
        <div className="mt-auto p-8 border-t border-white/10">
          <button onClick={() => {localStorage.clear(); navigate("/login");}} className="flex items-center gap-3 text-white font-black uppercase text-xs w-full hover:bg-white/10 p-4 rounded-2xl transition-all"><LogOut size={18} /> Logout</button>
        </div>
      </aside>

      <main className="flex-1 ml-72">
        <header className="h-24 bg-white/70 backdrop-blur-md border-b border-sky-100 flex items-center justify-between px-10 sticky top-0 z-10">
          <div className="relative w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input type="text" placeholder="Search..." className="w-full bg-sky-50 border-none rounded-2xl py-3 pl-12 font-bold outline-none" value={searchQuery} onChange={(e)=>setSearchQuery(e.target.value)} />
          </div>
          <div className="flex items-center gap-4">
            <p className="text-sm font-black text-slate-800 uppercase tracking-tighter">{userName}</p>
            <div className="w-10 h-10 bg-sky-600 rounded-xl flex items-center justify-center text-white"><User size={20}/></div>
          </div>
        </header>

        <div className="p-10">
          {activeTab === 'explore' && (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">
              {filteredExplore.map(loc => (
                <DestinationCard 
                  key={loc.id} 
                  loc={loc} 
                  isFavorite={favorites.includes(loc.id)} 
                  onFavorite={() => toggleFavorite(loc.id)} 
                  onRateClick={() => { setSelectedLoc(loc); setIsModalOpen(true); }}
                />
              ))}
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="max-w-4xl space-y-6">
              <h2 className="text-2xl font-black uppercase mb-6">Recent <span className="text-sky-600">Travel Reviews</span></h2>
              {reviews.map(rev => (
                <div key={rev.id} className="bg-white p-8 rounded-[35px] border border-sky-50 shadow-sm">
                  <div className="flex justify-between items-start mb-2">
                    <p className="font-black text-slate-800 uppercase text-xs">{rev.username}</p>
                    <div className="flex text-amber-400">
                      {[...Array(5)].map((_, i) => <Star key={i} size={14} className={i < rev.rating ? "fill-current" : "text-slate-100"}/>)}
                    </div>
                  </div>
                  <p className="text-sky-500 font-black text-sm mb-3 uppercase tracking-tighter">{rev.locationName}</p>
                  <p className="text-slate-600 font-bold italic">"{rev.comment}"</p>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'favorites' && (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">
               {locations.filter(l => favorites.includes(l.id)).map(loc => (
                 <DestinationCard key={loc.id} loc={loc} isFavorite={true} onFavorite={() => toggleFavorite(loc.id)} onRateClick={() => { setSelectedLoc(loc); setIsModalOpen(true); }} />
               ))}
            </div>
          )}

          {activeTab === 'services' && <TravelServices />}
          {activeTab === 'settings' && <Settings />}
        </div>
      </main>

      {/* REVIEW POPUP MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-[100] flex items-center justify-center p-6">
          <div className="bg-white w-full max-w-md rounded-[45px] p-10 relative">
            <button onClick={() => setIsModalOpen(false)} className="absolute top-8 right-8 text-slate-400 hover:text-slate-900"><X size={24}/></button>
            <h3 className="text-2xl font-black uppercase text-center mb-8">Rate <span className="text-sky-600">{selectedLoc?.name}</span></h3>
            <form onSubmit={submitReview} className="space-y-6">
              <div className="flex justify-center gap-2">
                {[1, 2, 3, 4, 5].map((num) => (
                  <Star key={num} size={35} className={`cursor-pointer ${tempReview.rating >= num ? 'text-amber-400 fill-current' : 'text-slate-200'}`} onClick={() => setTempReview({...tempReview, rating: num})}/>
                ))}
              </div>
              <textarea className="w-full bg-slate-50 border-none rounded-3xl p-5 font-bold outline-none min-h-[120px]" placeholder="Tell us about your experience..." value={tempReview.comment} onChange={(e) => setTempReview({...tempReview, comment: e.target.value})} required />
              <button type="submit" className="w-full bg-slate-900 text-white p-5 rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-sky-600 transition-all">Submit Review</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

const SidebarItem = ({ icon, label, active, onClick }) => (
  <button onClick={onClick} className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all ${active ? 'bg-white text-sky-600 shadow-xl' : 'text-sky-100 hover:bg-white/10'}`}>
    {icon} <span className="font-black text-[12px] uppercase tracking-widest">{label}</span>
  </button>
);

const DestinationCard = ({ loc, isFavorite, onFavorite, onRateClick }) => (
    <div className="bg-white rounded-[40px] border border-sky-50 shadow-sm hover:shadow-xl transition-all overflow-hidden group">
        <div className="h-56 overflow-hidden">
            <img src={`http://localhost:8000/uploads/${loc.image}`} alt={loc.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
        </div>
        <div className="p-8">
            <div className="flex justify-between items-start mb-6">
                <div>
                  <h4 className="text-xl font-black text-slate-900">{loc.name}</h4>
                  <p className="text-slate-400 font-bold text-sm italic"><MapPin size={14} className="inline mr-1" /> {loc.location}</p>
                </div>
                <button onClick={(e) => { e.stopPropagation(); onFavorite(); }} className={`p-2.5 rounded-2xl border ${isFavorite ? 'text-red-500 bg-red-50' : 'text-slate-300'}`}>
                  <Heart size={20} fill={isFavorite ? "currentColor" : "none"} />
                </button>
            </div>
            <div className="flex items-center justify-between border-t pt-6">
              <span className="text-sky-600 font-black text-xl">Rs. {loc.price}</span>
              {/* RATING BOX CLICKABLE BANAKO */}
              <div onClick={onRateClick} className="flex items-center gap-1 bg-amber-50 px-2 py-1 rounded-lg cursor-pointer hover:bg-amber-100 transition-colors">
                <Star size={14} className="text-amber-400 fill-current" />
                <span className="text-xs font-black text-amber-600">{loc.rating}</span>
              </div>
            </div>
        </div>
    </div>
);

export default Dashboard;