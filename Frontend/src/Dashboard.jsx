import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Search, Star, MapPin, LayoutDashboard, 
  Bell, BookmarkCheck, MessageSquare, LogOut, 
  User, CheckCircle, Clock, Filter, Settings, Heart
} from 'lucide-react';

const Dashboard = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');
  const [activeTab, setActiveTab] = useState('explore');
  const [searchQuery, setSearchQuery] = useState('');
  const [showBookingAlert, setShowBookingAlert] = useState(false);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) navigate("/login");
    else setUserName(user);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const locations = [
    { id: 1, name: "Mount Everest", location: "Solukhumbu", price: "1,50,000", rating: 4.9, tags: ["Adventure"] },
    { id: 2, name: "Pokhara Lakeside", location: "Pokhara", price: "35,000", rating: 4.7, tags: ["Relax"] },
    { id: 3, name: "Chitwan Jungle", location: "Chitwan", price: "28,000", rating: 4.6, tags: ["Wildlife"] },
    { id: 4, name: "Pashupatinath", location: "Kathmandu", price: "5,000", rating: 4.8, tags: ["Spiritual"] },
    { id: 5, name: "Lumbini Garden", location: "Rupandehi", price: "12,000", rating: 4.5, tags: ["Peace"] },
  ];

  const toggleFavorite = (id) => {
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(favId => favId !== id) : [...prev, id]
    );
  };

  const filteredLocations = locations.filter(l => 
    l.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const favoriteLocations = locations.filter(l => favorites.includes(l.id));

  return (
    <div className="flex min-h-screen bg-[#F8FAFC]">
      {/* SIDEBAR */}
      <aside className="w-64 bg-white border-r border-slate-200 flex flex-col fixed h-full z-20">
        <div className="p-6">
          <div className="flex items-center gap-2 mb-10">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">J</div>
            <span className="text-xl font-black text-slate-800 tracking-tight">JetSetGo</span>
          </div>

          <nav className="space-y-2">
            <SidebarItem icon={<LayoutDashboard size={20}/>} label="Explore" active={activeTab === 'explore'} onClick={() => setActiveTab('explore')} />
            <SidebarItem icon={<BookmarkCheck size={20}/>} label="My Bookings" active={activeTab === 'bookings'} onClick={() => setActiveTab('bookings')} />
            
            {/* FAVORITES TAB */}
            <SidebarItem 
                icon={<Heart size={20} className={favorites.length > 0 ? "fill-red-500 text-red-500" : ""}/>} 
                label="Favourites" 
                active={activeTab === 'favorites'} 
                onClick={() => setActiveTab('favorites')} 
                badge={favorites.length > 0 ? favorites.length : null} 
            />

            <SidebarItem icon={<Bell size={20}/>} label="Notifications" active={activeTab === 'alerts'} onClick={() => setActiveTab('alerts')} badge="2" />
            <SidebarItem icon={<MessageSquare size={20}/>} label="My Reviews" active={activeTab === 'reviews'} onClick={() => setActiveTab('reviews')} />
            <SidebarItem icon={<Settings size={20}/>} label="Settings" active={activeTab === 'settings'} onClick={() => setActiveTab('settings')} />
          </nav>
        </div>

        <div className="mt-auto p-6 border-t border-slate-100">
          <button onClick={handleLogout} className="flex items-center gap-3 text-slate-500 hover:text-red-600 transition-colors font-semibold">
            <LogOut size={20} /> Logout
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 ml-64">
        <header className="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-8 sticky top-0 z-10">
          <div className="relative w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Search destinations..." 
              className="w-full bg-slate-50 border-none rounded-xl py-2 pl-10 focus:ring-2 focus:ring-blue-500 transition-all"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm font-bold text-slate-800">{userName}</p>
              <p className="text-xs text-slate-400">Premium Member</p>
            </div>
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
              <User size={20} />
            </div>
          </div>
        </header>

        <div className="p-8">
          <div className="mb-8">
            <h2 className="text-2xl font-black text-slate-800">Welcome Back, {userName.split(' ')[0]}!</h2>
            <p className="text-slate-500 text-sm">Find and book your next trip across Nepal.</p>
          </div>

          {/* EXPLORE VIEW */}
          {activeTab === 'explore' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-slate-800 tracking-tight">Popular Destinations</h3>
                <button className="flex items-center gap-2 text-sm font-bold text-blue-600 bg-blue-50 px-4 py-2 rounded-lg">
                  <Filter size={16}/> Filter
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredLocations.map(loc => (
                  <DestinationCard 
                    key={loc.id} 
                    loc={loc} 
                    isFavorite={favorites.includes(loc.id)}
                    onFavorite={() => toggleFavorite(loc.id)}
                    onBook={() => { setShowBookingAlert(true); setTimeout(() => setShowBookingAlert(false), 3000); }}
                  />
                ))}
              </div>
            </div>
          )}

          {/* FAVORITES VIEW */}
          {activeTab === 'favorites' && (
            <div>
              <h3 className="text-xl font-bold text-slate-800 mb-6">Your Favourites</h3>
              {favoriteLocations.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {favoriteLocations.map(loc => (
                    <DestinationCard 
                        key={loc.id} 
                        loc={loc} 
                        isFavorite={true}
                        onFavorite={() => toggleFavorite(loc.id)}
                        onBook={() => { setShowBookingAlert(true); setTimeout(() => setShowBookingAlert(false), 3000); }}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-slate-200">
                    <Heart size={48} className="mx-auto text-slate-200 mb-4" />
                    <p className="text-slate-500 font-medium">No favorites added yet.</p>
                </div>
              )}
            </div>
          )}

          {/* Other tabs remain as placeholders for your logic */}
          {activeTab === 'alerts' && (
            <div className="bg-white rounded-3xl p-8 border border-slate-100">
              <h3 className="text-xl font-bold mb-6">Notifications</h3>
              <p className="text-slate-500">No new alerts.</p>
            </div>
          )}
        </div>
      </main>

      {showBookingAlert && (
        <div className="fixed bottom-10 right-10 bg-slate-900 text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-4 z-50 animate-bounce">
          <div className="bg-green-500 rounded-full p-1"><CheckCircle size={20}/></div>
          <div>
            <p className="font-bold">Processing Booking!</p>
            <p className="text-xs text-slate-400">Check your email for details.</p>
          </div>
        </div>
      )}
    </div>
  );
};

// UPDATED DESTINATION CARD COMPONENT
const DestinationCard = ({ loc, isFavorite, onFavorite, onBook }) => (
    <div className="bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl transition-all group overflow-hidden">
        {/* Top Image Section */}
        <div className="h-48 bg-slate-200 relative">
            <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-blue-600">
                {loc.tags[0]}
            </div>
        </div>

        {/* Content Section */}
        <div className="p-6">
            <div className="flex justify-between items-start mb-2">
                <h4 className="text-lg font-bold text-slate-800">{loc.name}</h4>
                {/* Heart and Review Side-by-Side */}
                <div className="flex items-center gap-3">
                    <button 
                        onClick={(e) => { e.stopPropagation(); onFavorite(); }}
                        className={`transition-colors ${isFavorite ? 'text-red-500' : 'text-slate-300 hover:text-red-400'}`}
                    >
                        <Heart size={20} fill={isFavorite ? "currentColor" : "none"} />
                    </button>
                    <div className="flex items-center gap-1 text-amber-400 border-l border-slate-100 pl-3">
                        <Star size={14} className="fill-current"/> 
                        <span className="text-xs font-black text-slate-700">{loc.rating}</span>
                    </div>
                </div>
            </div>
            <p className="text-slate-400 text-sm flex items-center gap-1 mb-4">
                <MapPin size={14}/> {loc.location}
            </p>
            <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                <span className="text-blue-600 font-black text-lg">Rs. {loc.price}</span>
                <button 
                    onClick={onBook}
                    className="bg-slate-900 text-white text-xs font-bold px-4 py-2 rounded-xl hover:bg-blue-600 transition-colors"
                >
                    Book Now
                </button>
            </div>
        </div>
    </div>
);

const SidebarItem = ({ icon, label, active, onClick, badge }) => (
  <button 
    onClick={onClick}
    className={`w-full flex items-center justify-between p-3 rounded-xl transition-all ${active ? 'bg-blue-600 text-white shadow-lg shadow-blue-100' : 'text-slate-500 hover:bg-slate-50'}`}
  >
    <div className="flex items-center gap-3 font-bold text-sm">
      {icon} {label}
    </div>
    {badge && <span className={`text-[10px] px-2 py-0.5 rounded-full ${active ? 'bg-white text-blue-600' : 'bg-red-500 text-white'}`}>{badge}</span>}
  </button>
);

const NotificationItem = ({ title, desc, time }) => (
  <div className="flex items-start gap-4 p-4 hover:bg-slate-50 rounded-2xl transition-all border-b border-slate-50">
    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 shrink-0"><Bell size={18}/></div>
    <div>
      <h5 className="font-bold text-slate-800">{title}</h5>
      <p className="text-sm text-slate-500">{desc}</p>
      <span className="text-[10px] text-slate-400 mt-2 block uppercase font-bold">{time}</span>
    </div>
  </div>
);

export default Dashboard;