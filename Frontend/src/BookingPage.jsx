import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, Loader2, Users, Calendar, MapPin, ClipboardList } from 'lucide-react';

const BookingPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [destination, setDestination] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const currentUser = localStorage.getItem("user");

  useEffect(() => {
    fetch(`http://localhost:8000/api/locations/${id}`)
      .then(res => res.json())
      .then(result => {
        if (result.success) setDestination(result.data);
        setLoading(false);
      }).catch(() => setLoading(false));
  }, [id]);

  const [formData, setFormData] = useState({
    fullName: '', email: '', phone: '', guests: 1, travelDate: ''
  });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await fetch('http://localhost:8000/api/bookings/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          ...formData, 
          location_name: destination.name, 
          username: currentUser 
        }),
      });
      const result = await response.json();

      if (result.success) {
        // --- NOTIFICATION LOGIC START ---
        const newNotif = {
          id: Date.now(),
          title: "Booking Requested! ✈️",
          desc: `Your trip to ${destination.name} is being processed.`,
          time: "Just now",
          isRead: false
        };
        const existingNotifs = JSON.parse(localStorage.getItem("notifications") || "[]");
        localStorage.setItem("notifications", JSON.stringify([newNotif, ...existingNotifs]));
        // --- NOTIFICATION LOGIC END ---

        setIsSubmitting(false);
        setShowSuccess(true);
      }
    } catch (err) {
      setIsSubmitting(false);
      alert("Database error!");
    }
  };

  if (loading) return <div className="h-screen flex items-center justify-center font-black italic text-sky-500 animate-pulse text-2xl tracking-tighter uppercase">JetSetGo...</div>;

  return (
    <div className="min-h-screen bg-[#FDFDFD] text-slate-900 font-sans pb-20 relative text-left">
      {showSuccess && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-900/60 backdrop-blur-md">
          <div className="bg-white rounded-[50px] p-12 text-center shadow-2xl max-w-sm w-full border border-sky-100 animate-in zoom-in duration-300">
            <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6 text-white shadow-lg">
              <CheckCircle2 size={40} />
            </div>
            <h2 className="text-3xl font-[1000] italic uppercase tracking-tighter mb-2">Request Sent!</h2>
            <p className="text-slate-500 font-bold text-xs uppercase tracking-widest leading-relaxed mb-8">Notification added to your dashboard.</p>
            <button onClick={() => navigate('/dashboard')} className="w-full bg-slate-900 text-white py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest">Go to Dashboard</button>
          </div>
        </div>
      )}

      {/* Header & Form Section (Same as before) */}
      <div className="w-full h-[35vh] relative overflow-hidden flex items-center justify-center">
        <img src={`http://localhost:8000/uploads/${destination.image}`} className="absolute inset-0 w-full h-full object-cover scale-110 blur-[2px] opacity-20" alt="bg" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#FDFDFD]"></div>
        <div className="relative z-10 flex flex-col items-center text-center px-6">
          <button onClick={() => navigate(-1)} className="mb-6 flex items-center gap-2 bg-white border border-slate-100 px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-sm hover:bg-sky-500 hover:text-white transition-all"><ArrowLeft size={14} /> Back</button>
          <h1 className="text-5xl md:text-7xl font-[1000] italic uppercase tracking-tighter leading-none">Booking <span className="text-sky-500">Form.</span></h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 -mt-10 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* LEFT FORM */}
          <div className="lg:col-span-8">
            <div className="bg-white rounded-[45px] shadow-sm p-10 md:p-16 border border-slate-50">
              <form onSubmit={handleSubmit} className="space-y-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div className="space-y-3">
                    <label className="text-[11px] font-black uppercase text-slate-400">Full Name</label>
                    <input required name="fullName" onChange={handleChange} type="text" placeholder="Your Name" className="w-full border-b-2 border-slate-100 py-4 font-bold outline-none focus:border-sky-500 bg-transparent" />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[11px] font-black uppercase text-slate-400">Email Address</label>
                    <input required name="email" onChange={handleChange} type="email" placeholder="email@example.com" className="w-full border-b-2 border-slate-100 py-4 font-bold outline-none focus:border-sky-500 bg-transparent" />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                  <div className="space-y-3">
                    <label className="text-[11px] font-black uppercase text-slate-400">Contact Number</label>
                    <input required name="phone" onChange={handleChange} type="tel" placeholder="+977" className="w-full border-b-2 border-slate-100 py-4 font-bold outline-none focus:border-sky-500 bg-transparent" />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[11px] font-black uppercase text-slate-400">Total Guests</label>
                    <input required name="guests" value={formData.guests} onChange={handleChange} type="number" min="1" className="w-full border-b-2 border-slate-100 py-4 font-bold outline-none focus:border-sky-500 bg-transparent" />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[11px] font-black uppercase text-slate-400">Travel Date</label>
                    <input required name="travelDate" onChange={handleChange} type="date" className="w-full border-b-2 border-slate-100 py-4 font-bold outline-none focus:border-sky-500 bg-transparent" />
                  </div>
                </div>
                <button type="submit" disabled={isSubmitting} className="w-full md:w-auto bg-sky-500 text-white px-16 py-6 rounded-full font-black uppercase text-xs tracking-[0.3em] hover:bg-sky-600 shadow-xl flex items-center justify-center gap-4">
                  {isSubmitting ? <Loader2 className="animate-spin" /> : <>Send Booking Request <ClipboardList size={20} /></>}
                </button>
              </form>
            </div>
          </div>

          {/* SIDEBAR */}
          <div className="lg:col-span-4">
            <div className="bg-[#D6E9FF] rounded-[50px] p-10 text-slate-900 sticky top-10 border border-sky-200">
              <h3 className="text-xl font-[1000] italic uppercase tracking-tighter mb-10 border-b border-sky-300/40 pb-5 text-sky-700">Trip Info</h3>
              <div className="space-y-8">
                <div className="flex items-center gap-5 bg-white/80 p-5 rounded-[30px]">
                  <img src={`http://localhost:8000/uploads/${destination.image}`} className="w-20 h-20 rounded-2xl object-cover" alt="mini" />
                  <div>
                    <h4 className="font-black italic text-base uppercase leading-tight">{destination.name}</h4>
                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest flex items-center gap-1"><MapPin size={10} /> {destination.location}</p>
                  </div>
                </div>
                <div className="space-y-4 font-black uppercase text-[10px] tracking-widest text-slate-500">
                   <div className="flex justify-between items-center bg-white/30 p-4 rounded-2xl">
                      <span>Guests:</span>
                      <span className="text-slate-900 text-xs">{formData.guests} Persons</span>
                   </div>
                   <div className="flex justify-between items-center bg-white/30 p-4 rounded-2xl">
                      <span>Date:</span>
                      <span className="text-slate-900 text-xs">{formData.travelDate || 'TBD'}</span>
                   </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;