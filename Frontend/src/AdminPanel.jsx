import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search, Star, MapPin, LayoutDashboard,
  LogOut, ShieldAlert, Plus, Bell,
  Trash2, ShieldCheck, X, Settings,
  PlusCircle, MessageSquare, Hotel, ClipboardList, Calendar, Users, ChevronRight
} from 'lucide-react';
import logo from "./assets/logo.png";
import AdminTravelServices from './AdminTravelServices';
import NotificationDropdown from './NotificationDropdown';

// --- REVIEW MODAL (FOR INDIVIDUAL LOCATION) ---
const ReviewsModal = ({ location, onClose }) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetch(`http://localhost:8000/api/reviews/${location.id}`)
      .then(res => res.json())
      .then(result => {
        if (result.success) setReviews(result.data);
        setLoading(false);
      }).catch(() => setLoading(false));
  }, [location.id]);
  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-[300] flex items-center justify-center p-6 text-slate-900">
      <div className="bg-white w-full max-w-lg rounded-[40px] p-10 relative shadow-2xl animate-in zoom-in duration-300">
        <button onClick={onClose} className="absolute top-6 right-6 text-slate-300 hover:text-slate-900 cursor-pointer"><X size={24} /></button>
        <h3 className="text-2xl font-[1000] uppercase italic mb-6">User <span className="text-sky-500">Reviews.</span></h3>
        <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar text-left">
          {loading ? (
            <p className="text-center py-10 font-black text-sky-500 animate-pulse uppercase italic">Loading...</p>
          ) : reviews.length > 0 ? (
            reviews.map((rev, idx) => (
              <div key={idx} className="bg-slate-50 p-6 rounded-3xl border border-slate-100">
                <div className="flex justify-between items-center mb-2">
                  <p className="font-black text-xs text-slate-900 uppercase italic">{rev.username || 'Anonymous'}</p>
                  <div className="flex text-amber-400 items-center gap-1"><Star size={10} fill="currentColor" /> {rev.rating}</div>
                </div>
                <p className="text-slate-500 text-xs font-bold">{rev.comment}</p>
              </div>
            ))
          ) : (
            <div className="text-center py-10 opacity-20"><MessageSquare size={40} className="mx-auto mb-2" /><p className="font-black uppercase text-xs italic">No reviews yet</p></div>
          )}
        </div>
      </div>
    </div>
  );
};

// --- NEW: REVIEWS MANAGEMENT VIEW (WITH DELETE) ---
const AdminReviewsView = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAllReviews = async () => {
    setLoading(true);
    try {
      const res = await fetch('http://localhost:8000/api/reviews/all');
      const result = await res.json();
      if (result.success) setReviews(result.data);
    } catch (err) { console.error("Error fetching reviews:", err); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchAllReviews(); }, []);

  // DELETE FUNCTION
  const deleteReview = async (id) => {
    if (window.confirm("Permanent delete?")) {
      try {
        const res = await fetch(`http://localhost:8000/api/reviews/${id}`, { method: 'DELETE' });
        const result = await res.json();
        if (result.success) {
          setReviews(reviews.filter(r => r.id !== id));
        } else {
          alert("Delete garda error aayo.");
        }
      } catch (err) {
        console.error("Delete error:", err);
      }
    }
  };

  if (loading) return <div className="text-center py-20 font-black italic text-sky-500 animate-pulse text-xl uppercase">Loading Reviews...</div>;

  return (
    <div className="animate-in fade-in duration-500 text-left">
      <h2 className="text-5xl font-[1000] text-slate-900 uppercase italic tracking-tighter mb-10">All <span className="text-sky-500">Feedback.</span></h2>
      <div className="bg-white rounded-[45px] border border-slate-50 shadow-sm overflow-hidden text-slate-900">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-100">
              <th className="p-8 text-[10px] font-black uppercase tracking-widest text-slate-400">User</th>
              <th className="p-8 text-[10px] font-black uppercase tracking-widest text-slate-400">Location</th>
              <th className="p-8 text-[10px] font-black uppercase tracking-widest text-slate-400">Feedback</th>
              <th className="p-8 text-[10px] font-black uppercase tracking-widest text-slate-400">Stars</th>
              <th className="p-8 text-[10px] font-black uppercase tracking-widest text-slate-400 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {reviews.length > 0 ? reviews.map((rev) => (
              <tr key={rev.id} className="hover:bg-slate-50/50 transition-all group">
                <td className="p-8 font-black text-sm text-slate-900 uppercase italic">{rev.username}</td>
                <td className="p-8 font-bold text-[10px] text-sky-500 uppercase italic">{rev.locationName || 'Travel Package'}</td>
                <td className="p-8 text-sm text-slate-600 font-bold">"{rev.comment}"</td>
                <td className="p-8 font-black text-amber-500 italic flex items-center gap-1">
                  <Star size={12} fill="currentColor" /> {rev.rating}
                </td>
                <td className="p-8 text-right">
                  <button onClick={() => deleteReview(rev.id)} className="p-4 bg-red-50 text-red-400 rounded-2xl hover:bg-red-500 hover:text-white transition-all cursor-pointer">
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            )) : (
              <tr><td colSpan="5" className="p-20 text-center font-black uppercase text-slate-200 italic text-2xl tracking-widest">No Reviews Found</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// --- USERS VIEW WITH TOTAL COUNT ---
const AdminUsersView = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalUsers, setTotalUsers] = useState(0); // Add state for total count
  
  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await fetch('http://localhost:8000/api/users/all');
      const result = await res.json();
      if (result.success) {
        setUsers(result.data);
        setTotalUsers(result.data.length); // Set total count from data length
      }
    } catch (err) {
      console.error("Fetch Users Error:", err);
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => { fetchUsers(); }, []);
  
  if (loading) return <div className="text-center py-20 font-black italic text-sky-500 animate-pulse text-xl uppercase">Loading Users...</div>;
  
  return (
    <div className="animate-in fade-in duration-500 text-left">
      <div className="flex justify-between items-center mb-10">
        <div className="flex items-center gap-4">
          <h2 className="text-5xl font-[1000] text-slate-900 uppercase italic tracking-tighter">
            Registered <span className="text-sky-500">Users.</span>
          </h2>
          {/* Add total users badge */}
          <div className="bg-sky-500 text-white px-4 py-2 rounded-full text-sm font-black flex items-center gap-2">
            <Users size={16} />
            <span>Total: {totalUsers}</span>
          </div>
        </div>
        <button 
          onClick={fetchUsers} 
          className="bg-sky-50 text-sky-600 px-6 py-3 rounded-2xl font-black text-[10px] uppercase hover:bg-sky-100 transition-all border border-sky-100 italic cursor-pointer"
        >
          Refresh List
        </button>
      </div>
      
      <div className="bg-white rounded-[45px] border border-slate-50 shadow-sm overflow-hidden text-slate-900">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-100">
              <th className="p-8 text-[10px] font-black uppercase tracking-widest text-slate-400">User Details</th>
              <th className="p-8 text-[10px] font-black uppercase tracking-widest text-slate-400">Email Address</th>
              <th className="p-8 text-[10px] font-black uppercase tracking-widest text-slate-400">Joined Date</th>
              <th className="p-8 text-[10px] font-black uppercase tracking-widest text-slate-400 text-right">Role</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {users.length > 0 ? users.map((u) => (
              <tr key={u.id} className="hover:bg-slate-50/50 transition-all group">
                <td className="p-8 flex items-center gap-4">
                  <div className="w-12 h-12 bg-slate-900 rounded-2xl flex items-center justify-center text-white font-black italic shadow-lg">
                    {u.fullName?.charAt(0)}
                  </div>
                  <div>
                    <p className="font-black text-sm text-slate-900 uppercase italic leading-none">
                      {u.fullName || 'No Name'}
                    </p>
                    <p className="text-[10px] text-slate-400 font-bold uppercase mt-1">
                      ID: #{u.id}
                    </p>
                  </div>
                </td>
                <td className="p-8 font-bold text-sm text-slate-600 italic">{u.email}</td>
                <td className="p-8 font-black text-xs text-slate-500 uppercase italic">
                  <Calendar size={14} className="inline mr-2 text-sky-500" /> 
                  {u.createdAt ? new Date(u.createdAt).toLocaleDateString() : 'N/A'}
                </td>
                <td className="p-8 text-right text-xs font-black uppercase italic text-sky-500">
                  User
                </td>
              </tr>
            )) : (
              <tr>
                <td colSpan="4" className="p-20 text-center font-black uppercase text-slate-200 italic text-2xl tracking-widest">
                  No Users Registered
                </td>
              </tr>
            )}
          </tbody>
        </table>
        
        {/* Add footer with total count */}
        <div className="bg-slate-50 p-6 border-t border-slate-100 flex justify-between items-center">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            Showing {users.length} of {totalUsers} users
          </span>
          <span className="text-xs font-black text-sky-500 uppercase">
            Last updated: {new Date().toLocaleTimeString()}
          </span>
        </div>
      </div>
    </div>
  );
};

// --- BOOKINGS VIEW ---
const AdminBookingsView = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetch('http://localhost:8000/api/bookings/all')
      .then(res => res.json())
      .then(result => {
        if (result.success) setBookings(result.data);
        setLoading(false);
      }).catch(() => setLoading(false));
  }, []);
  const deleteBooking = async (id) => {
    if (window.confirm("Delete this booking?")) {
      const res = await fetch(`http://localhost:8000/api/bookings/delete/${id}`, { method: 'DELETE' });
      const result = await res.json();
      if (result.success) setBookings(bookings.filter(b => b.id !== id));
    }
  };
  if (loading) return <div className="text-center py-20 font-black italic text-sky-500 animate-pulse text-xl uppercase">Loading Bookings...</div>;
  return (
    <div className="animate-in fade-in duration-500 text-left">
      <h2 className="text-5xl font-[1000] text-slate-900 uppercase italic tracking-tighter mb-10">Master <span className="text-sky-500">Bookings.</span></h2>
      <div className="bg-white rounded-[45px] border border-slate-50 shadow-sm overflow-hidden text-slate-900">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-100">
              <th className="p-8 text-[10px] font-black uppercase tracking-widest text-slate-400">Customer</th>
              <th className="p-8 text-[10px] font-black uppercase tracking-widest text-slate-400">Destination</th>
              <th className="p-8 text-[10px] font-black uppercase tracking-widest text-slate-400">Travel Date</th>
              <th className="p-8 text-[10px] font-black uppercase tracking-widest text-slate-400">Guests</th>
              <th className="p-8 text-[10px] font-black uppercase tracking-widest text-slate-400 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {bookings.map((b) => (
              <tr key={b.id} className="hover:bg-slate-50/50 transition-all group">
                <td className="p-8 flex items-center gap-4">
                  <div className="w-12 h-12 bg-sky-100 rounded-2xl flex items-center justify-center text-sky-600 font-black italic">{b.fullName?.charAt(0)}</div>
                  <div>
                    <p className="font-black text-sm text-slate-900 uppercase italic leading-none">{b.fullName}</p>
                    <p className="text-[10px] text-slate-400 font-bold uppercase mt-1">{b.email}</p>
                  </div>
                </td>
                <td className="p-8 font-bold text-sm uppercase text-slate-600 italic">{b.locationName}</td>
                <td className="p-8 font-black text-xs text-slate-500 uppercase italic">{b.travelDate}</td>
                <td className="p-8">
                  <span className="bg-slate-100 px-3 py-1.5 rounded-xl font-black text-[11px] text-slate-700 uppercase italic">{b.guests || 1} Person(s)</span>
                </td>
                <td className="p-8 text-right">
                  <button onClick={() => deleteBooking(b.id)} className="p-4 bg-red-50 text-red-400 rounded-2xl hover:bg-red-500 hover:text-white transition-all cursor-pointer"><Trash2 size={18} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// --- HOTELS VIEW ---
const AdminHotelsView = ({ hotels, onRefresh }) => {
  const handleDeleteHotel = async (id) => {
    if (window.confirm("Delete this hotel? This might affect packages linked to it.")) {
      try {
        const res = await fetch(`http://localhost:8000/api/hotels/${id}`, { method: 'DELETE' });
        const result = await res.json();
        if (result.success) {
          alert("Hotel deleted successfully");
          onRefresh();
        }
      } catch (err) { alert("Error deleting hotel"); }
    }
  };
  return (
    <div className="animate-in fade-in duration-500 text-left">
      <h2 className="text-5xl font-[1000] text-slate-900 uppercase italic tracking-tighter mb-10">Hotel <span className="text-sky-500">Database.</span></h2>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">
        {hotels.map(h => (
          <div key={h.id} className="bg-white rounded-[45px] border border-slate-50 shadow-sm overflow-hidden group">
            <div className="h-48 overflow-hidden">
              <img src={`http://localhost:8000/uploads/${h.image}`} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt={h.name} />
            </div>
            <div className="p-8">
              <h4 className="text-xl font-black text-slate-900 uppercase italic">{h.name}</h4>
              <p className="text-slate-400 text-xs font-bold uppercase italic mb-4">{h.location}</p>
              <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                <span className="text-sky-500 font-black italic">Rs. {h.price}/night</span>
                <button onClick={() => handleDeleteHotel(h.id)} className="p-4 rounded-2xl bg-red-50 text-red-400 hover:bg-red-500 hover:text-white transition-all cursor-pointer">
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// --- MAIN ADMIN PANEL ---
const AdminPanel = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('explore');
  const [searchQuery, setSearchQuery] = useState('');
  const [locations, setLocations] = useState([]);
  const [hotels, setHotels] = useState([]);
  const [isAddPackageModalOpen, setIsAddPackageModalOpen] = useState(false);
  const [isAddHotelModalOpen, setIsAddHotelModalOpen] = useState(false);
  const [isHotelSuccess, setIsHotelSuccess] = useState(false);
  const [selectedForReview, setSelectedForReview] = useState(null);
  const [newLoc, setNewLoc] = useState({
    name: '', location: '', price: '', rating: 5.0, image: null, description: '', hotelId: '', itinerary: [{ day: '', title: '' }]
  });
  const [newHotel, setNewHotel] = useState({ name: '', location: '', price: '', description: '', image: null });
  const fetchData = async () => {
    try {
      const locRes = await fetch('http://localhost:8000/api/locations');
      const locResult = await locRes.json();
      if (locResult.success) setLocations(locResult.data);
      const hotelRes = await fetch('http://localhost:8000/api/hotels');
      const hotelResult = await hotelRes.json();
      if (hotelResult.success) setHotels(hotelResult.data);
    } catch (err) { console.error("Fetch error:", err); }
  };
  useEffect(() => { fetchData(); }, []);
  const handleDeletePackage = async (id) => {
    if (window.confirm("Delete this package?")) {
      const res = await fetch(`http://localhost:8000/api/locations/${id}`, { method: 'DELETE' });
      if ((await res.json()).success) fetchData();
    }
  };
  const handlePackageSubmit = async (e) => {
    e.preventDefault();
    if (!newLoc.image) return alert("Upload cover image!");
    const formData = new FormData();
    formData.append('name', newLoc.name);
    formData.append('location', newLoc.location);
    formData.append('price', newLoc.price);
    formData.append('rating', parseFloat(newLoc.rating));
    formData.append('description', newLoc.description);
    formData.append('hotelId', newLoc.hotelId);
    formData.append('image', newLoc.image);
    formData.append('itinerary', JSON.stringify(newLoc.itinerary));
    const res = await fetch('http://localhost:8000/api/locations', { method: 'POST', body: formData });
    if ((await res.json()).success) {
      setIsAddPackageModalOpen(false);
      setNewLoc({ name: '', location: '', price: '', rating: 5.0, image: null, description: '', hotelId: '', itinerary: [{ day: '', title: '' }] });
      fetchData();
    }
  };
  const handleHotelSubmit = async (e) => {
    e.preventDefault();
    if (!newHotel.image) return alert("Upload hotel image!");
    const formData = new FormData();
    formData.append('name', newHotel.name);
    formData.append('location', newHotel.location);
    formData.append('price', newHotel.price);
    formData.append('description', newHotel.description);
    formData.append('image', newHotel.image);
    try {
      const res = await fetch('http://localhost:8000/api/hotels', { method: 'POST', body: formData });
      const result = await res.json();
      if (result.success) {
        setIsHotelSuccess(true);
        setTimeout(() => {
          setIsHotelSuccess(false);
          setIsAddHotelModalOpen(false);
          setNewHotel({ name: '', location: '', price: '', description: '', image: null });
          fetchData();
        }, 2500);
      }
    } catch (err) { alert("Server Error!"); }
  };
  const filteredLocations = locations.filter(loc => loc.name.toLowerCase().includes(searchQuery.toLowerCase()));
  const getHotelName = (id) => {
    if (!id) return "Not Linked";
    const found = hotels.find(h => String(h.id) === String(id));
    return found ? found.name : "Not Linked";
  };
  return (
    <div className="flex min-h-screen bg-[#F8FAFC]">
      <aside className="w-72 bg-sky-600 fixed h-full z-20 flex flex-col shadow-2xl text-left">
        <div className="p-8">
          <div className="flex items-center gap-3 mb-12">
            <div className="bg-white p-1.5 rounded-xl"><img src={logo} alt="Logo" className="w-8 h-8" /></div>
            <span className="text-2xl font-[1000] text-white tracking-tighter uppercase italic">JetSetGo</span>
          </div>
          <nav className="space-y-4">
            <SidebarItem icon={<LayoutDashboard size={22} />} label="EXPLORE" active={activeTab === 'explore'} onClick={() => setActiveTab('explore')} />
            <SidebarItem icon={<Hotel size={22} />} label="HOTELS" active={activeTab === 'hotels'} onClick={() => setActiveTab('hotels')} />
            <SidebarItem icon={<ClipboardList size={22} />} label="BOOKINGS" active={activeTab === 'bookings'} onClick={() => setActiveTab('bookings')} />
            {/* ADDED REVIEWS SIDEBAR */}
            <SidebarItem icon={<MessageSquare size={22} />} label="REVIEWS" active={activeTab === 'reviews'} onClick={() => setActiveTab('reviews')} />
            <SidebarItem icon={<Users size={22} />} label="USERS" active={activeTab === 'users'} onClick={() => setActiveTab('users')} />
            <SidebarItem icon={<ShieldAlert size={22} />} label="SERVICES" active={activeTab === 'services'} onClick={() => setActiveTab('services')} />
          </nav>
        </div>
        <div className="mt-auto p-8">
          <button onClick={() => { localStorage.clear(); navigate("/login"); }} className="flex items-center gap-3 text-white font-black uppercase text-[13px] w-full p-4 hover:bg-white/10 rounded-2xl transition-all cursor-pointer"><LogOut size={20} /> LOGOUT</button>
        </div>
      </aside>
      <main className="flex-1 ml-72">
        <header className="h-24 bg-white/80 backdrop-blur-md border-b border-slate-100 flex items-center justify-between px-10 sticky top-0 z-[100] text-slate-900">
          <div className="relative w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <input type="text" placeholder="Search..." className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-3 pl-12 outline-none font-bold" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
          </div>
          <div className="flex items-center gap-6">
            <NotificationDropdown />
            <div className="flex items-center gap-4 border-l border-slate-100 pl-6">
              <div className="text-right"><p className="text-sm font-[1000] text-slate-800 uppercase italic">ADMIN</p><p className="text-[9px] font-black text-sky-500 uppercase">Main Controller</p></div>
              <div className="w-12 h-12 bg-slate-900 rounded-2xl flex items-center justify-center text-white shadow-lg"><ShieldCheck size={24} /></div>
            </div>
          </div>
        </header>
        <div className="p-10">
          {activeTab === 'users' && <AdminUsersView />}
          {activeTab === 'bookings' && <AdminBookingsView />}
          {activeTab === 'reviews' && <AdminReviewsView />}
          {activeTab === 'services' && <AdminTravelServices />}
          {activeTab === 'hotels' && <AdminHotelsView hotels={hotels} onRefresh={fetchData} />}
          {activeTab === 'explore' && (
            <div className="text-left">
              <div className="flex justify-between items-end mb-12">
                <h2 className="text-5xl font-[1000] text-slate-900 uppercase italic tracking-tighter">Trip <span className="text-sky-500">Inventory.</span></h2>
                <div className="flex gap-4">
                  <button onClick={() => setIsAddHotelModalOpen(true)} className="bg-white text-sky-500 px-8 py-4 rounded-full font-black uppercase text-xs tracking-[0.2em] flex items-center gap-2 hover:bg-sky-50 border border-sky-100 transition-all shadow-xl shadow-sky-100/20 active:scale-95 cursor-pointer">
                    <Hotel size={18} /> Add Hotel
                  </button>
                  <button onClick={() => setIsAddPackageModalOpen(true)} className="bg-sky-500 text-white px-8 py-4 rounded-full font-black uppercase text-xs tracking-[0.2em] flex items-center gap-2 hover:bg-sky-600 transition-all shadow-xl shadow-sky-100 active:scale-95 cursor-pointer">
                    <Plus size={18} /> Add Package
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">
                {filteredLocations.map(loc => (
                  <div key={loc.id} className="bg-white rounded-[45px] border border-slate-50 shadow-sm hover:shadow-2xl transition-all overflow-hidden group relative">
                    <div className="absolute top-4 left-4 z-10">
                      <span className="bg-white/90 backdrop-blur px-4 py-2 rounded-full text-[10px] font-black text-sky-500 shadow-sm uppercase italic flex items-center gap-2"><Hotel size={12} /> {getHotelName(loc.hotelId)}</span>
                    </div>
                    <div className="h-64 bg-slate-100 overflow-hidden">
                      <img src={`http://localhost:8000/uploads/${loc.image}`} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" alt={loc.name} />
                    </div>
                    <div className="p-8">
                      <div className="flex justify-between items-start mb-6">
                        <div><h4 className="text-2xl font-black text-slate-900 mb-1">{loc.name}</h4><p className="text-slate-400 font-bold flex items-center gap-1.5 text-xs uppercase italic"><MapPin size={14} className="text-sky-500" /> {loc.location}</p></div>
                        <button onClick={() => setSelectedForReview(loc)} className="bg-amber-50 px-3 py-1.5 rounded-xl border border-amber-100 text-amber-600 text-xs font-black flex items-center gap-1 hover:bg-amber-500 hover:text-white transition-all cursor-pointer"><Star size={14} className="fill-current" /> {loc.rating}</button>
                      </div>
                      <div className="flex items-center justify-between pt-6 border-t border-slate-50">
                        <span className="text-sky-500 font-[1000] text-2xl tracking-tighter">Rs. {loc.price}</span>
                        <button onClick={() => handleDeletePackage(loc.id)} className="p-4 rounded-2xl bg-red-50 text-red-400 hover:bg-red-500 hover:text-white transition-all cursor-pointer"><Trash2 size={18} /></button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        {selectedForReview && <ReviewsModal location={selectedForReview} onClose={() => setSelectedForReview(null)} />}
        {isAddPackageModalOpen && (
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-[130] flex items-center justify-center p-6 overflow-y-auto">
            <div className="bg-white w-full max-w-2xl rounded-[50px] p-12 relative shadow-2xl my-10 animate-in zoom-in">
              <button onClick={() => setIsAddPackageModalOpen(false)} className="absolute top-8 right-8 text-slate-300 hover:text-slate-900 cursor-pointer"><X size={28} /></button>
              <h3 className="text-3xl font-[1000] uppercase italic mb-8 text-left">Create <span className="text-sky-500">Package</span></h3>
              <form onSubmit={handlePackageSubmit} className="space-y-4 text-left">
                <input className="w-full bg-slate-50 border p-4 rounded-2xl outline-none font-bold" placeholder="Destination Name" value={newLoc.name} onChange={(e) => setNewLoc({ ...newLoc, name: e.target.value })} required />
                <div className="grid grid-cols-2 gap-4">
                  <input className="bg-slate-50 border p-4 rounded-2xl outline-none font-bold" placeholder="Location" value={newLoc.location} onChange={(e) => setNewLoc({ ...newLoc, location: e.target.value })} required />
                  <input className="bg-slate-50 border p-4 rounded-2xl outline-none font-bold" placeholder="Price" value={newLoc.price} onChange={(e) => setNewLoc({ ...newLoc, price: e.target.value })} required />
                </div>
                <select className="w-full bg-slate-50 border p-4 rounded-2xl outline-none font-bold text-slate-600 appearance-none cursor-pointer" value={newLoc.hotelId} onChange={(e) => setNewLoc({ ...newLoc, hotelId: e.target.value })} required>
                  <option value="">Link Accommodation (Hotel)</option>
                  {hotels.map(h => <option key={h.id} value={h.id}>{h.name} - {h.location}</option>)}
                </select>
                <textarea className="w-full bg-slate-50 border p-4 rounded-2xl outline-none font-bold" placeholder="Full Description" rows="4" value={newLoc.description} onChange={(e) => setNewLoc({ ...newLoc, description: e.target.value })} required />
                <div className="p-6 bg-slate-900 rounded-[30px] space-y-4">
                  <div className="flex justify-between items-center text-white"><label className="font-black text-[10px] uppercase tracking-widest">Itinerary Details</label><button type="button" onClick={() => setNewLoc({ ...newLoc, itinerary: [...newLoc.itinerary, { day: '', title: '' }] })} className="text-sky-400 font-black text-[10px] uppercase cursor-pointer">+ Add Step</button></div>
                  {newLoc.itinerary.map((step, idx) => (
                    <div key={idx} className="flex gap-2"><input className="w-20 bg-white/10 p-3 rounded-xl text-white text-xs font-bold" placeholder="Day" value={step.day} onChange={(e) => { const updated = [...newLoc.itinerary]; updated[idx].day = e.target.value; setNewLoc({ ...newLoc, itinerary: updated }); }} /><input className="flex-1 bg-white/10 p-3 rounded-xl text-white text-xs font-bold" placeholder="Title" value={step.title} onChange={(e) => { const updated = [...newLoc.itinerary]; updated[idx].title = e.target.value; setNewLoc({ ...newLoc, itinerary: updated }); }} /></div>
                  ))}
                </div>
                <div className="border-2 border-dashed rounded-3xl p-6 bg-slate-50 text-center"><input type="file" id="add-pkg-file" className="hidden" onChange={(e) => setNewLoc({ ...newLoc, image: e.target.files[0] })} /><label htmlFor="add-pkg-file" className="cursor-pointer text-sky-600 font-black text-sm uppercase block w-full">{newLoc.image ? newLoc.image.name : "Upload Cover Image"}</label></div>
                <button type="submit" className="w-full bg-sky-500 text-white p-5 rounded-full font-black uppercase text-xs tracking-[0.3em] shadow-xl shadow-sky-100 hover:bg-sky-600 transition-all active:scale-95 flex items-center justify-center gap-3 cursor-pointer">
                  Save & Publish <ChevronRight size={18} />
                </button>
              </form>
            </div>
          </div>
        )}
        {isAddHotelModalOpen && (
          <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-md z-[500] flex items-center justify-center p-6 overflow-y-auto">
            <div className="bg-white w-full max-w-xl rounded-[50px] p-12 relative shadow-2xl text-slate-900 text-left border-[6px] border-white my-auto animate-in zoom-in duration-300">
              {isHotelSuccess ? (
                <div className="flex flex-col items-center justify-center py-16 animate-in zoom-in duration-500">
                  <div className="w-24 h-24 bg-green-500 text-white rounded-full flex items-center justify-center mb-6 shadow-2xl animate-bounce">
                    <ShieldCheck size={56} strokeWidth={3} />
                  </div>
                  <h3 className="text-4xl font-[1000] uppercase italic text-center">Hotel <br /> <span className="text-green-500">Registered!</span></h3>
                  <p className="text-slate-400 font-bold mt-4 uppercase text-[10px] tracking-[0.3em]">Done & Saved to Database</p>
                </div>
              ) : (
                <>
                  <button onClick={() => setIsAddHotelModalOpen(false)} className="absolute top-8 right-8 text-slate-300 hover:text-slate-900 cursor-pointer z-[520]"><X size={28} /></button>
                  <h3 className="text-3xl font-[1000] uppercase italic mb-8">Register <span className="text-sky-500">Hotel.</span></h3>
                  <form onSubmit={handleHotelSubmit} className="space-y-4 relative z-[510]">
                    <input className="w-full bg-slate-50 border p-4 rounded-2xl outline-none font-bold focus:border-sky-500" placeholder="Hotel Name" value={newHotel.name} onChange={(e) => setNewHotel({ ...newHotel, name: e.target.value })} required />
                    <input className="w-full bg-slate-50 border p-4 rounded-2xl outline-none font-bold focus:border-sky-500" placeholder="Location" value={newHotel.location} onChange={(e) => setNewHotel({ ...newHotel, location: e.target.value })} required />
                    <input className="w-full bg-slate-50 border p-4 rounded-2xl outline-none font-bold focus:border-sky-500" placeholder="Price/Night" value={newHotel.price} onChange={(e) => setNewHotel({ ...newHotel, price: e.target.value })} required />
                    <textarea className="w-full bg-slate-50 border p-4 rounded-2xl outline-none font-bold focus:border-sky-500" placeholder="Facilities" rows="3" value={newHotel.description} onChange={(e) => setNewHotel({ ...newHotel, description: e.target.value })} required />
                    <div className="border-2 border-dashed rounded-3xl p-6 bg-slate-50 text-center relative">
                      <input type="file" id="hotel-f" className="hidden" onChange={(e) => setNewHotel({ ...newHotel, image: e.target.files[0] })} />
                      <label htmlFor="hotel-f" className="cursor-pointer text-sky-500 font-black text-sm uppercase block w-full">{newHotel.image ? newHotel.image.name : "Upload Image"}</label>
                    </div>
                    <button type="submit" className="w-full bg-sky-500 text-white p-5 rounded-full font-black uppercase text-xs tracking-[0.3em] shadow-xl shadow-sky-100 hover:bg-sky-600 transition-all active:scale-95 flex items-center justify-center gap-3 cursor-pointer relative z-[600]">
                      Register Hotel Now <ChevronRight size={18} />
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
const SidebarItem = ({ icon, label, active, onClick }) => (
  <button onClick={onClick} className={`w-full flex items-center p-4 rounded-2xl transition-all cursor-pointer ${active ? 'bg-white text-sky-600 shadow-lg' : 'text-white hover:bg-white/10'}`}>
    <div className="flex items-center gap-4">{icon} <span className="font-black text-[13px] uppercase tracking-widest">{label}</span></div>
  </button>
);
export default AdminPanel;