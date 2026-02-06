import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Star, MapPin, CheckCircle, Clock, Hotel, Calendar, Info, Zap } from 'lucide-react';

const DestinationDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const detailData = {
    1: { 
      name: "Mount Everest", 
      location: "Solukhumbu", 
      price: "1,00,000", 
      rating: "4.9", 
      desc: "Experience the top of the world. Mount Everest is the world's highest peak, offering a life-changing adventure through Sherpa culture and majestic Himalayan views.", 
      duration: "7 Days",
      packages: ["Professional Sherpa Guide", "Private Luxury Transport", "All Permits & Fees"],
      itinerary: [
        { day: "01", title: "Kathmandu Arrival", detail: "Pick up from airport and transfer to your designated premium hotel (1,400m)." },
        { day: "02", title: "Flight to Lukla / Phakding", detail: "Scenic flight to Lukla and begin your hike to Phakding (2,640m)." },
        { day: "03", title: "Trek to Namche Bazaar", detail: "Uphill trek through pine forests to reach the famous Sherpa capital (3,440m)." },
        { day: "04", title: "Everest View Day", detail: "Acclimatization hike to the Everest View Hotel for panoramic mountain views." },
        { day: "05", title: "Trek to Tengboche", detail: "Visit the famous Tengboche Monastery with stunning views of Ama Dablam." },
        { day: "06", title: "Return to Lukla", detail: "Complete your descent back to Lukla and celebrate the journey's end." },
        { day: "07", title: "Flight to Kathmandu", detail: "Fly back to Kathmandu and transfer to your hotel for final departure." }
      ],
      hotels: [{ name: "Everest View Luxury Lodge", rating: "5 Star" }, { name: "Sherpa Heritage Home", rating: "4 Star" }]
    },
    2: { 
      name: "Pokhara Lakeside", 
      location: "Pokhara", 
      price: "35,000", 
      rating: "4.7", 
      desc: "Relax by the serene Phewa Lake. Pokhara is the ultimate gateway to the Annapurna range, offering a blend of adventure and tranquility.", 
      duration: "5 Days",
      packages: ["Guided City Tour", "Boating & Sunrise Trip", "Luxury Lakeside Stay"],
      itinerary: [
        { day: "01", title: "Kathmandu → Pokhara", detail: "Tourist bus journey, hotel check-in, and evening walk along Lakeside." },
        { day: "02", title: "City & Cultural Tour", detail: "Guided tour including Devi’s Fall, Gupteshwor Cave, and World Peace Pagoda." },
        { day: "03", title: "Boating & Adventure", detail: "Boating on Phewa Lake, relax at lakeside cafés, and evening sunset view." },
        { day: "04", title: "Leisure & Paragliding", detail: "Free day for optional activities like paragliding or short hikes around Sarangkot." },
        { day: "05", title: "Departure", detail: "Breakfast at hotel, check-out, and return journey to Kathmandu." }
      ],
      hotels: [{ name: "Fish Tail Lodge", rating: "5 Star" }, { name: "Temple Tree Resort", rating: "5 Star" }]
    },
    3: { 
      name: "Chitwan Jungle", 
      location: "Chitwan", 
      price: "25,000", 
      rating: "4.6", 
      desc: "Explore the wild side of Nepal. Spot rhinos and tigers in their natural habitat within the lush subtropical forests.", 
      duration: "3 Days",
      packages: ["Jeep Safari Adventure", "Tharu Cultural Program", "Riverside Jungle Walk"],
      itinerary: [
        { day: "01", title: "Arrival & Culture", detail: "Arrival, lunch, Canoeing, Jungle Walk, and Tharu Cultural Program." },
        { day: "02", title: "Safari Day", detail: "Jeep Safari, Elephant Breeding Center, and evening village walk." },
        { day: "03", title: "Departure", detail: "Breakfast at the lodge followed by check-out and departure." }
      ],
      hotels: [{ name: "Meghauli Serai", rating: "4.9 Star" }, { name: "Green Park Chitwan", rating: "4.7 Star" }]
    },
    4: { 
      name: "Pashupatinath", 
      location: "Kathmandu", 
      price: "4,000", 
      rating: "4.8", 
      desc: "Visit the holiest Hindu temple in Nepal. Experience the spiritual vibe and the serene evening Aarati by the Bagmati river.", 
      duration: "1 Day",
      packages: ["Private Car Transfer", "Certified Local Guide", "All Entry Fees Covered", "Darshan coordination"],
      itinerary: [
        { day: "06:00 AM", title: "Pick-up", detail: "Private pick-up from your location in Kathmandu." },
        { day: "07:00 AM", title: "Temple Arrival", detail: "Arrival at Pashupatinath temple complex for Darshan and exploration." },
        { day: "12:30 PM", title: "Lunch", detail: "Traditional Nepali lunch at a nearby authentic restaurant." },
        { day: "04:30 PM", title: "Return Drop", detail: "Transfer back to your hotel. Trip ends." }
      ],
      hotels: [{ name: "Mahadev Hotel", rating: "4.2 Star" }, { name: "Hotel JS Pashupati", rating: "4.5 Star" }]
    },
    5: { 
      name: "Lumbini Garden", 
      location: "Lumbini", 
      price: "17,000", 
      rating: "4.7", 
      desc: "Journey to the birthplace of Lord Buddha. Explore the Sacred Garden and international monasteries representing global peace.", 
      duration: "3 Days",
      packages: ["Private Transport", "Rickshaw Sightseeing", "Expert Guide", "Heritage Entry Fees"],
      itinerary: [
        { day: "01", title: "Arrival & Monastery", detail: "Check-in and guided tour of the Sacred Garden and Peace Flame." },
        { day: "02", title: "Maya Devi Temple", detail: "Visit Maya Devi Temple, Ashokan Pillar, and Monastery Complex via Rickshaw." },
        { day: "03", title: "Departure", detail: "Breakfast and return journey to Kathmandu or Bhairahawa." }
      ],
      hotels: [{ name: "Lumbini Five Elements", rating: "5 Star" }, { name: "Village Lodge", rating: "5 Star" }]
    }
  };

  const destination = detailData[id] || detailData[1];

  return (
    <div className="min-h-screen bg-[#F0F9FF] font-sans pb-20">
      
      {/* HEADER */}
      <header className="bg-white/80 backdrop-blur-md p-6 sticky top-0 z-50 flex items-center gap-4 border-b border-sky-100 shadow-sm">
        <button onClick={() => navigate('/dashboard')} className="p-2 hover:bg-sky-100 rounded-full transition-all">
          <ArrowLeft size={24} className="text-sky-600" />
        </button>
        <h1 className="text-xl font-[1000] uppercase tracking-tighter text-slate-800">Destination Details</h1>
      </header>

      <div className="max-w-5xl mx-auto mt-10 p-6 space-y-8">
        
        {/* TOP: DESCRIPTION SECTION */}
        <div className="bg-white p-10 rounded-[40px] border border-sky-100 shadow-sm">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
            <div>
              <h2 className="text-5xl font-[1000] text-slate-900 tracking-tight leading-none mb-3">{destination.name}</h2>
              <p className="flex items-center gap-2 text-slate-400 font-black text-lg italic">
                <MapPin size={22} className="text-sky-500"/> {destination.location}, Nepal
              </p>
            </div>
            <div className="bg-amber-50 px-6 py-3 rounded-2xl flex items-center gap-3 border border-amber-100 shadow-sm shrink-0">
              <Star size={24} className="fill-amber-400 text-amber-400" />
              <span className="font-[1000] text-2xl text-amber-700">{destination.rating}</span>
            </div>
          </div>

          <div className="bg-sky-50/50 p-8 rounded-[30px] border border-sky-100 relative overflow-hidden">
            <h4 className="text-xs font-black text-sky-600 uppercase tracking-widest mb-3 flex items-center gap-2 relative z-10">
              <Zap size={14} className="fill-sky-600" /> About this trip
            </h4>
            <p className="text-xl text-slate-700 font-bold leading-relaxed relative z-10 italic">
              "{destination.desc}"
            </p>
          </div>
        </div>

        {/* BOTTOM: TWO COLUMNS */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* LEFT: FULL TRIP SCHEDULE (Paila ko jastai full detail) */}
          <div className="bg-white p-8 rounded-[40px] border border-sky-100 shadow-sm">
            <div className="flex items-center gap-3 mb-8 border-b border-slate-50 pb-4">
               <Calendar size={24} className="text-sky-600" />
               <h3 className="text-xl font-[1000] uppercase text-slate-800 tracking-tight">Full Trip Schedule</h3>
            </div>
            <div className="space-y-10 relative">
              <div className="absolute left-[19px] top-2 bottom-2 w-0.5 bg-sky-100"></div>
              {destination.itinerary.map((item, index) => (
                <div key={index} className="flex gap-6 relative z-10">
                  <div className="w-10 h-10 bg-sky-600 text-white rounded-2xl flex items-center justify-center font-black text-[9px] shadow-lg shadow-sky-200 shrink-0 text-center px-1 uppercase border-2 border-white">
                    {item.day}
                  </div>
                  <div>
                    <h4 className="font-black text-slate-800 text-lg leading-none mb-2">{item.title}</h4>
                    <p className="text-sm text-slate-500 font-bold leading-relaxed">{item.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT: PACKAGE DETAILS & PRICING */}
          <div className="space-y-8">
            <div className="bg-white p-8 rounded-[40px] border border-sky-100 shadow-sm space-y-8">
              
              <div className="flex items-center gap-4 font-black text-sky-700 bg-sky-50 p-6 rounded-3xl border border-sky-100">
                <Clock size={28} />
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase tracking-widest opacity-60">Total Duration</span>
                  <span className="text-2xl">{destination.duration} Trip</span>
                </div>
              </div>


