import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search, Star, LayoutDashboard, BookmarkCheck, Heart,
  Settings as SettingsIcon, ShieldAlert, LogOut,
  ChevronRight, Bell, Ticket, Trash2, CheckCircle2,
  User, Mail, Lock, MapPin, Camera, Save, MessageSquare, X
} from 'lucide-react';

// Naya Component Import
import UserSettings from './UserSettings';
import TravelServices from './TravelServices';
import logo from "./assets/logo.png";

const Dashboard = () => {
  const navigate = useNavigate();
  const notificationRef = useRef(null);

  const [userName, setUserName] = useState('');
  const [activeTab, setActiveTab] = useState('explore');
  const [searchQuery, setSearchQuery] = useState('');

  const [myBookings, setMyBookings] = useState([]);
  const [locations, setLocations] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [isNotifyOpen, setIsNotifyOpen] = useState(false);

  // --- REVIEW MODAL STATES ---
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [selectedLoc, setSelectedLoc] = useState(null);
  const [reviewData, setReviewData] = useState({ rating: 5, comment: '' });
  const [allReviews, setAllReviews] = useState([]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setIsNotifyOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getLoggedUser = () => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) return null;
    try {
      const parsed = JSON.parse(storedUser);
      return parsed.username || parsed;
    } catch (e) { return storedUser; }
  };

  const fetchData = async () => {
    const user = getLoggedUser();
    try {
      const locRes = await fetch('http://localhost:8000/api/locations');
      const lData = await locRes.json();
      if (lData.success) {
        setLocations(lData.data || []);
      } else {
        setLocations(lData || []);
      }

      if (user) {
        const favRes = await fetch(`http://localhost:8000/api/favorites/${user}`);
        const fData = await favRes.json();
        if (fData.success) setFavorites(fData.data || []);

        const nRes = await fetch(`http://localhost:8000/api/notifications/${user}`);
        const nData = await nRes.json();
        if (nData.success) setNotifications(nData.data || []);
      }
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  const fetchMyBookings = async () => {
    const user = getLoggedUser();
    if (!user) return;

    const endpoint = user.toLowerCase() === 'admin'
      ? `http://localhost:8000/api/bookings/all`
      : `http://localhost:8000/api/bookings/user/${user}`;

    try {
      const res = await fetch(endpoint);
      const result = await res.json();
      if (result.success) {
        setMyBookings(result.data || []);
      } else {
        setMyBookings([]);
      }
    } catch (err) {
      console.error("Booking load error:", err);
      setMyBookings([]);
    }
  };
  const fetchAllReviews = async () => {
    try {
      const res = await fetch('http://localhost:8000/api/reviews/all');
      const result = await res.json();
    
      if (result.success) {
        setAllReviews(result.data || []);
      } else if (Array.isArray(result)) {
        setAllReviews(result);
      }
    } catch (err) {
      console.error("Error fetching reviews:", err);
    }
  };

  useEffect(() => {
    const user = getLoggedUser();
    if (!user) {
      navigate("/login");
    } else {
      setUserName(user);
      fetchData();
      fetchMyBookings();
      fetchAllReviews(); 
    }
  }, [navigate]);

  useEffect(() => {
    if (activeTab === 'bookings') fetchMyBookings();
    if (activeTab === 'reviews') fetchAllReviews();
  }, [activeTab]);

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    const user = getLoggedUser();
    try {
      const res = await fetch(`http://localhost:8000/api/reviews`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: user,
          locationId: selectedLoc.id || selectedLoc._id,
          locationName: selectedLoc.name,
          rating: Number(reviewData.rating),
          comment: reviewData.comment
        })
      });
      const result = await res.json();
      if (result.success) {
        setShowReviewModal(false);
        setReviewData({ rating: 5, comment: '' });
        fetchData(); 
        fetchAllReviews(); 

        alert("Review submitted successfully!");
      }
    } catch (err) { console.error(err); }
  };

  const clearNotifications = async () => {
    const user = getLoggedUser();
    try {
      await fetch(`http://localhost:8000/api/notifications/clear/${user}`, { method: 'DELETE' });
      setNotifications([]);
      setIsNotifyOpen(false);
    } catch (err) { console.error(err); }
  };

  const deleteBooking = async (id) => {
    if (window.confirm("Are you sure you want to delete this booking?")) {
      try {
        const res = await fetch(`http://localhost:8000/api/bookings/delete/${id}`, {
          method: "DELETE"
        });
        const result = await res.json();
        if (result.success) {
          setMyBookings(prev => prev.filter(b => String(b.id || b._id) !== String(id)));
        } else {
          alert("Error: " + result.message);
        }
      } catch (err) {
        console.error("Delete error:", err); -
          alert("Server error while deleting.");
      }
    }
  };

  const toggleFavorite = async (id) => {
    const user = getLoggedUser();
    try {
      const res = await fetch('http://localhost:8000/api/favorites/toggle', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: user, locationId: id })
      });
      const result = await res.json();
      if (result.success) {
        setFavorites(prev => result.action === "added" ? [...prev, id] : prev.filter(f => f !== id));
      }
    } catch (err) { console.error(err); }
  };

  const filteredExplore = (locations || []).filter(l =>
    l.name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex min-h-screen bg-[#F0F9FF]">
      {/* SIDEBAR */}
      <aside className="w-72 bg-gradient-to-b from-sky-600 to-blue-700 fixed h-full z-20 flex flex-col shadow-2xl">
        <div className="p-8 text-left">
          <div className="flex items-center gap-3 mb-12">
            <img src={logo} alt="Logo" className="w-10 h-10 bg-white p-1.5 rounded-xl shadow-lg" />
            <span className="text-2xl font-[1000] text-white uppercase italic tracking-tighter">JetSetGo</span>
          </div>
          <nav className="space-y-2">
            <SidebarItem icon={<LayoutDashboard size={20} />} label="Explore" active={activeTab === 'explore'} onClick={() => setActiveTab('explore')} />
            <SidebarItem icon={<BookmarkCheck size={20} />} label="My Bookings" active={activeTab === 'bookings'} onClick={() => setActiveTab('bookings')} />
            <SidebarItem icon={<Heart size={20} />} label="Favourites" active={activeTab === 'favorites'} onClick={() => setActiveTab('favorites')} />
            <SidebarItem icon={<MessageSquare size={20} />} label="Reviews" active={activeTab === 'reviews'} onClick={() => setActiveTab('reviews')} />
            <SidebarItem icon={<ShieldAlert size={20} />} label="Services" active={activeTab === 'services'} onClick={() => setActiveTab('services')} />
            <SidebarItem icon={<SettingsIcon size={20} />} label="Settings" active={activeTab === 'settings'} onClick={() => setActiveTab('settings')} />
          </nav>
        </div>
        <div className="mt-auto p-8 border-t border-white/10 text-left">
          <button onClick={() => { localStorage.clear(); navigate("/login"); }} className="flex items-center gap-3 text-white font-black uppercase text-xs w-full hover:bg-red-500/20 p-4 rounded-2xl transition-all cursor-pointer">
            <LogOut size={18} /> Logout
          </button>
        </div>
      </aside>

      <main className="flex-1 ml-72">
        {/* HEADER */}
        <header className="h-24 bg-white/80 backdrop-blur-md border-b border-sky-100 flex items-center justify-between px-10 sticky top-0 z-30">
          <div className="relative w-96 text-left">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input type="text" placeholder="Search..." className="w-full bg-sky-50 border-none rounded-2xl py-3 pl-12 font-bold outline-none" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
          </div>

          <div className="flex items-center gap-6">
            <div className="relative" ref={notificationRef}>
              <button
                onClick={() => setIsNotifyOpen(!isNotifyOpen)}
                className="p-3 bg-white border border-sky-100 rounded-2xl text-slate-600 hover:bg-sky-50 transition-all cursor-pointer relative"
              >
                <Bell size={22} />
                {notifications.length > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-[10px] font-black rounded-full flex items-center justify-center border-2 border-white">
                    {notifications.length}
                  </span>
                )}
              </button>
              {isNotifyOpen && (
                <div className="absolute right-0 mt-4 w-80 bg-white rounded-[30px] shadow-2xl border border-sky-50 z-50 overflow-hidden text-left">
                  <div className="p-5 border-b border-slate-50 flex justify-between items-center bg-sky-50/50">
                    <p className="font-black text-xs uppercase italic text-slate-800">Notifications</p>
                    <button onClick={clearNotifications} className="text-[10px] font-black text-sky-600 uppercase hover:underline cursor-pointer">Clear All</button>
                  </div>
                  <div className="max-h-80 overflow-y-auto p-2">
                    {notifications?.length === 0 ? (
                      <div className="p-10 text-center text-slate-400 text-xs font-bold uppercase italic">No new alerts</div>
                    ) : (
                      notifications?.map((n, i) => (
                        <div key={i} className="p-4 border-b border-slate-50 last:border-0 hover:bg-slate-50 rounded-2xl transition-all">
                          <p className="font-black text-sky-600 text-[10px] uppercase mb-1">{n.title || "Update"}</p>
                          <p className="text-slate-600 text-xs font-bold leading-tight">{n.desc || n.message}</p>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>

            <div className="flex items-center gap-2 border-l border-sky-100 pl-6">
              <span className="text-sm font-[1000] text-slate-800 uppercase italic tracking-tighter leading-none">
                {userName || "Traveler"}
              </span>
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            </div>
          </div>
        </header>

        <div className="p-10">
          {activeTab === 'explore' && (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">
              {filteredExplore.map(loc => (
                <DestinationCard
                  key={loc.id || loc._id} loc={loc}
                  isFavorite={favorites.includes(loc.id || loc._id)}
                  onFavorite={() => toggleFavorite(loc.id || loc._id)}
                  onReviewClick={() => { setSelectedLoc(loc); setShowReviewModal(true); }}
                  onClick={() => navigate(`/destination/${loc.id || loc._id}`)}
                />
              ))}
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="max-w-5xl text-left">
              <h2 className="text-4xl font-[1000] uppercase italic text-slate-900 mb-8">Traveler <span className="text-sky-600">Feedbacks</span></h2>
              <div className="grid grid-cols-1 gap-6">
                {allReviews.length > 0 ? (
                  allReviews.map((rev, idx) => (
                    <div key={idx} className="bg-white p-8 rounded-[35px] border border-sky-50 shadow-sm flex gap-6 items-start">
                      <div className="w-14 h-14 bg-amber-100 rounded-2xl flex items-center justify-center text-amber-600 shrink-0">
                        <User size={28} />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-center mb-2">
                          <h4 className="font-black text-slate-800 uppercase italic tracking-tighter">{rev.username}</h4>
                          <div className="flex items-center gap-1 text-amber-500 bg-amber-50 px-3 py-1 rounded-full text-xs font-black">
                            <Star size={12} fill="currentColor" /> {rev.rating}
                          </div>
                        </div>
                        <p className="text-sky-600 text-[10px] font-black uppercase mb-3 flex items-center gap-1">
                          <MapPin size={10} /> {rev.locationName}
                        </p>
                        <p className="text-slate-600 font-medium leading-relaxed italic">"{rev.comment}"</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="py-20 text-center font-black text-slate-300 uppercase italic">No reviews found yet.</div>
                )}
              </div>
            </div>
          )}

          {/* ... Bookings and other tabs ... */}
          {activeTab === 'bookings' && (
            <div className="max-w-6xl space-y-10 text-left">
              <h2 className="text-4xl font-[1000] uppercase italic text-slate-900 leading-none">
                {userName.toLowerCase() === 'admin' ? 'Manage All' : 'Your'} <span className="text-sky-600">Journeys</span>
              </h2>
              <div className="grid grid-cols-1 gap-6">
                {myBookings?.length > 0 ? (
                  myBookings.map(b => (
                    <div key={b.id || b._id} className="bg-white rounded-[40px] border border-slate-100 shadow-sm flex flex-col md:flex-row overflow-hidden">
                      <div className="md:w-32 bg-sky-50 flex flex-col items-center justify-center p-6 border-r border-slate-50">
                        <Ticket size={24} className="text-sky-600 mb-1" />
                        <span className="text-[8px] font-black text-sky-600 uppercase italic">CONFIRMED</span>
                      </div>
                      <div className="flex-1 p-8 text-left">
                        <div className="flex justify-between items-start mb-6">
                          <h4 className="text-3xl font-[1000] uppercase italic tracking-tighter text-slate-900 leading-none">
                            {b.locationName || b.location_name}
                          </h4>
                          {userName.toLowerCase() === 'admin' && (
                            <p className="text-[10px] font-black text-sky-600 uppercase italic">Customer: {b.username}</p>
                          )}
                          <div className="bg-green-50 text-green-600 px-4 py-1.5 rounded-full text-[9px] font-black uppercase italic border border-green-100 flex items-center gap-1"><CheckCircle2 size={12} /> Success</div>
                        </div>
                        <div className="grid grid-cols-3 gap-8 py-6 border-y border-slate-50 mb-6">
                          <div><p className="text-[9px] font-black text-slate-400 uppercase">Departure</p><p className="font-bold text-slate-700">{b.travelDate ? new Date(b.travelDate).toDateString() : 'N/A'}</p></div>
                          <div><p className="text-[9px] font-black text-slate-400 uppercase">Passengers</p><p className="font-bold text-slate-700">{b.guests} Persons</p></div>
                          <div><p className="text-[9px] font-black text-slate-400 uppercase">Holder</p><p className="font-bold text-slate-700">{b.fullName}</p></div>
                        </div>
                        <div className="flex justify-between items-center">
                          <p className="text-[12px] text-slate-400 font-bold italic">Contact: <span className="text-slate-800">{b.phone}</span></p>
                          <button onClick={() => deleteBooking(b.id || b._id)} className="flex items-center gap-2 bg-red-50 text-red-500 px-6 py-2.5 rounded-2xl font-black text-xs uppercase border border-red-100 hover:bg-red-500 hover:text-white transition-all cursor-pointer">
                           <Trash2 size={16} /> {userName.toLowerCase() === 'admin' ? 'Remove Booking' : 'Cancel Booking'}
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="py-20 text-center">
                    <p className="font-black uppercase italic text-slate-300">No bookings found yet.</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'favorites' && (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">
              {locations.filter(l => favorites.includes(l.id || l._id)).map(loc => (
                <DestinationCard
                  key={loc.id || loc._id} loc={loc} isFavorite={true}
                  onFavorite={() => toggleFavorite(loc.id || loc._id)}
                  onReviewClick={() => { setSelectedLoc(loc); setShowReviewModal(true); }}
                  onClick={() => navigate(`/destination/${loc.id || loc._id}`)}
                />
              ))}
            </div>
          )}

          {activeTab === 'services' && <TravelServices />}
          {activeTab === 'settings' && <UserSettings userName={userName} />}

        </div>
      </main>

      {/* --- REVIEW MODAL --- */}
      {showReviewModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-[40px] p-10 shadow-2xl relative">
            <button onClick={() => setShowReviewModal(false)} className="absolute top-6 right-6 text-slate-300 hover:text-slate-500 cursor-pointer"><X size={24} /></button>
            <h3 className="text-2xl font-[1000] uppercase italic text-slate-900 mb-6">Rate <span className="text-sky-600">Your Trip</span></h3>
            <form onSubmit={handleReviewSubmit} className="space-y-6 text-left">
              <div>
                <label className="text-[10px] font-black uppercase text-slate-400 block mb-2">Rating (1-5)</label>
                <input
                  type="number"
                  min="1"
                  max="5"
                  className="w-full bg-sky-50 rounded-2xl p-4 font-bold outline-none"
                  value={reviewData.rating}
                  onChange={(e) => setReviewData({ ...reviewData, rating: parseInt(e.target.value) || 5 })}
                />
              </div>
              <div>
                <label className="text-[10px] font-black uppercase text-slate-400 block mb-2">Comment</label>
                <textarea required className="w-full bg-sky-50 rounded-2xl p-4 font-bold outline-none h-32 resize-none" placeholder="Share your experience..." value={reviewData.comment} onChange={(e) => setReviewData({ ...reviewData, comment: e.target.value })} />
              </div>
              <button type="submit" className="w-full bg-sky-600 text-white py-4 rounded-2xl font-black uppercase italic tracking-widest hover:bg-sky-700 transition-all cursor-pointer">Submit FeedBack</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

const SidebarItem = ({ icon, label, active, onClick }) => (
  <button onClick={onClick} className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all duration-300 cursor-pointer ${active ? 'bg-white text-sky-600 shadow-xl' : 'text-sky-100 hover:bg-white/10'}`}>
    {icon} <span className="font-black text-[12px] uppercase tracking-widest">{label}</span>
  </button>
);

const DestinationCard = ({ loc, isFavorite, onFavorite, onReviewClick, onClick }) => {
  const reviewsCount = loc.Reviews?.length || 0;

  const avgRating = reviewsCount > 0
    ? (loc.Reviews.reduce((acc, curr) => acc + (curr.rating || 0), 0) / reviewsCount).toFixed(1)
    : "5.0";

  return (
    <div onClick={onClick} className="bg-white rounded-[40px] border border-sky-50 shadow-sm hover:shadow-xl transition-all overflow-hidden group cursor-pointer text-left">
      <div className="h-64 overflow-hidden relative">
        <img src={`http://localhost:8000/uploads/${loc.image}`} alt={loc.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
      </div>
      <div className="p-8">
        <div className="mb-4 text-2xl font-[1000] text-slate-900 tracking-tighter uppercase italic leading-none">{loc.name}</div>
        <div className="flex items-center justify-end gap-3 mb-6">
          <button onClick={(e) => { e.stopPropagation(); onFavorite(); }} className={`flex items-center gap-2 px-4 py-2 rounded-xl font-black text-[10px] uppercase border cursor-pointer ${isFavorite ? 'bg-red-50 border-red-100 text-red-500' : 'bg-slate-50 border-slate-100 text-slate-400'}`}>
            <Heart size={14} fill={isFavorite ? "currentColor" : "none"} /> {isFavorite ? "Saved" : "Favorite"}
          </button>
          <button onClick={(e) => { e.stopPropagation(); onReviewClick(); }} className="flex items-center gap-2 px-4 py-2 bg-amber-50 border border-amber-100 rounded-xl font-black text-[10px] uppercase text-amber-600 cursor-pointer">
            <Star size={14} fill="currentColor" /> {avgRating} {reviewsCount > 0 ? 'Review' : 'Rating'}
          </button>
        </div>
        <div className="flex items-center justify-between border-t border-slate-50 pt-6">
          <span className="text-sky-600 font-[1000] text-2xl italic tracking-tighter">Rs. {loc.price}</span>
          <div className="bg-sky-600 text-white p-3 rounded-2xl shadow-lg"><ChevronRight size={20} /></div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;