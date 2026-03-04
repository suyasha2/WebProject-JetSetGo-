import React from "react";
import { Link } from "react-router-dom";
import { 
  LayoutDashboard, Heart, Bell, 
  BookmarkCheck, Mail, Phone, MapPin 
} from 'lucide-react';

// ===== ASSET IMPORTS =====
// Inlai timro assets folder ma bhako exact name sanga match gara:
import logo from "./assets/logo.png";
import heroImage from "./assets/hero.jpg";
import destination1 from "./assets/destination1.jpg";
import destination2 from "./assets/destination2.jpg";

// Dashboard/Features ko images
import dashImg from "./assets/dashboard.jpg"; 
import favImg from "./assets/favourites.jpg";
import alertImg from "./assets/alerts.jpg";
import bookImg from "./assets/bookings.jpg";

const JetSetGoLanding = () => {

  const destinations = [
    {
      id: 1,
      name: "Everest Region",
      image: destination1,
      desc: "Experience the top of the world with expert guides and premium logistics."
    },
    {
      id: 2,
      name: "Pokhara Valley",
      image: destination2,
      desc: "Serene lakes and breathtaking Annapurna views from your luxury stay."
    }
  ];

  const appFeatures = [
    {
      title: "Smart Dashboard",
      desc: "Personalized recommendations for your next trek.",
      icon: <LayoutDashboard size={20} className="text-sky-600" />,
      image: dashImg, // Import gareko image yaha use bhako chha
      color: "bg-sky-50"
    },
    {
      title: "Save Favourites",
      desc: "One-tap save for all your dream destinations.",
      icon: <Heart size={20} className="text-sky-500" />,
      image: favImg,
      color: "bg-sky-50"
    },
    {
      title: "Real-time Alerts",
      desc: "Instant notifications for your booking status.",
      icon: <Bell size={20} className="text-sky-600" />,
      image: alertImg,
      color: "bg-sky-50"
    },
    {
      title: "Easy Bookings",
      desc: "Seamless payment and ticket management.",
      icon: <BookmarkCheck size={20} className="text-sky-600" />,
      image: bookImg,
      color: "bg-sky-50"
    }
  ];

  return (
    <div className="min-h-screen bg-[#F0F9FF] text-slate-900 font-sans scroll-smooth flex flex-col">

      {/* ================= NAVBAR ================= */}
      <nav className="flex items-center justify-between px-12 py-7 border-b border-sky-100 sticky top-0 bg-white/90 backdrop-blur-md z-50">
        <div className="flex items-center gap-3">
          <div className="bg-white p-1.5 rounded-xl shadow-sm border border-sky-50">
            <img src={logo} alt="JetSetGo Logo" className="w-8 h-8 object-contain" />
          </div>
          <span className="text-3xl font-[1000] text-sky-600 tracking-tighter uppercase">
            JetSetGo
          </span>
        </div>

        <div className="hidden md:flex space-x-12">
          {['home', 'features', 'destinations', 'contact'].map((item) => (
            <a 
              key={item}
              href={`#${item}`} 
              className="text-[12px] font-[900] uppercase tracking-[0.25em] text-slate-900 hover:text-sky-600 transition-all relative group"
            >
              {item}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-sky-600 transition-all group-hover:w-full"></span>
            </a>
          ))}
        </div>

        <Link to="/login">
          <button className="bg-sky-500 text-white px-10 py-3.5 rounded-full font-black uppercase text-[11px] tracking-[0.2em] hover:bg-sky-600 shadow-xl shadow-sky-100 transition-all active:scale-95">
            Login
          </button>
        </Link>
      </nav>

      {/* ================= HERO SECTION ================= */}
      <header id="home" className="px-12 py-20 md:py-40 flex flex-col md:flex-row items-center gap-20 max-w-7xl mx-auto flex-grow">
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-6xl md:text-[84px] font-[1000] leading-[0.95] mb-8 text-slate-900 tracking-tighter">
            Travel Nepal <br />
            <span className="text-sky-600">Without Limits.</span>
          </h1>
          <p className="text-xl text-slate-500 font-bold mb-12 max-w-lg mx-auto md:mx-0 leading-relaxed">
            Nepal's most powerful booking ecosystem. Discover hidden trails, 
            premium stays, and manage adventures via our smart dashboard.
          </p>
          <Link to="/login">
            <button className="bg-sky-500 text-white px-14 py-6 rounded-full font-black uppercase text-xs tracking-[0.3em] hover:bg-sky-600 transition-all shadow-2xl shadow-sky-100 active:scale-95">
              Start Your Journey
            </button>
          </Link>
        </div>

        <div className="flex-1 w-full h-[550px] rounded-[4rem] shadow-2xl overflow-hidden rotate-3 hover:rotate-0 transition-transform duration-1000 border-[20px] border-white relative">
          <img src={heroImage} alt="Nepal" className="w-full h-full object-cover" />
        </div>
      </header>

      {/* ================= APP FEATURES SECTION ================= */}
      <section id="features" className="py-40 px-12 bg-white rounded-t-[5rem] shadow-inner mt-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24">
            <span className="text-sky-500 font-[1000] uppercase tracking-[0.4em] text-[11px]">Sneak Peek</span>
            <h2 className="text-5xl font-black mt-4 text-slate-950 tracking-tight uppercase">Inside the App</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {appFeatures.map((feature, index) => (
              <div key={index} className="group bg-white rounded-[3rem] border border-sky-50 overflow-hidden hover:shadow-2xl hover:shadow-sky-100/50 transition-all duration-500">
                {/* Aba yaha Image dekhincha */}
                <div className={`h-48 ${feature.color} overflow-hidden`}>
                  <img 
                    src={feature.image} 
                    alt={feature.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" 
                  />
                </div>
                
                <div className="p-10">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-2.5 bg-sky-100 rounded-2xl text-sky-600">{feature.icon}</div>
                    <h3 className="text-xl font-black text-slate-900 tracking-tight">{feature.title}</h3>
                  </div>
                  <p className="text-slate-500 text-sm font-bold leading-relaxed">
                    {feature.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= DESTINATIONS ================= */}
      <section id="destinations" className="bg-[#F8FAFC] py-40 px-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-4">
            <div>
              <h2 className="text-5xl font-black text-slate-950 tracking-tight uppercase">Popular Places</h2>
              <p className="text-slate-500 font-bold text-lg mt-2">Curated Himalayan experiences for you.</p>
            </div>
            <div className="h-1 flex-1 bg-sky-100 mb-5 mx-16 hidden md:block"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-16">
            {destinations.map((item) => (
              <div key={item.id} className="bg-white rounded-[4rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all group border border-sky-50">
                <div className="w-full h-[450px] overflow-hidden relative">
                    <div className="absolute top-10 right-10 bg-sky-500 text-white px-6 py-2.5 rounded-full font-black text-[11px] uppercase tracking-widest z-10 shadow-xl shadow-sky-200/50">
                        Trending
                    </div>
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />
                </div>
                <div className="p-12">
                  <h3 className="text-4xl font-black text-slate-900 mb-4 tracking-tight uppercase">{item.name}</h3>
                  <p className="text-slate-500 font-bold mb-10 leading-relaxed text-xl">{item.desc}</p>
                  <Link to="/login" className="text-sky-600 font-black uppercase text-[12px] tracking-[0.3em] hover:text-sky-400 transition-colors inline-flex items-center gap-3">
                    Explore Region <span className="text-2xl">→</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer id="contact" className="bg-slate-950 text-white pt-40 pb-20 px-12 rounded-t-[5rem] mt-auto">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-24">
            <div className="col-span-1">
              <h2 className="text-5xl font-[1000] text-sky-500 mb-10 tracking-tighter uppercase">JetSetGo</h2>
              <p className="text-slate-400 font-bold leading-loose text-xl">
                Redefining travel logistics in Nepal. Your premium gateway to the top of the world.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-20 col-span-1 md:col-span-2">
              <div>
                <h4 className="font-black text-white mb-10 uppercase tracking-[0.3em] text-[12px] text-sky-500">Navigation</h4>
                <ul className="space-y-6 text-slate-400 font-black text-xs uppercase tracking-widest">
                  <li><a href="#home" className="hover:text-sky-500 transition">Home</a></li>
                  <li><a href="#features" className="hover:text-sky-500 transition">App Features</a></li>
                  <li><a href="#destinations" className="hover:text-sky-500 transition">Destinations</a></li>
                </ul>
              </div>

              <div>
                <h4 className="font-black text-white mb-10 uppercase tracking-[0.3em] text-[12px] text-sky-500">Contact Us</h4>
                <ul className="space-y-8 text-slate-400 font-bold text-sm">
                  <li className="flex items-center gap-5">
                    <div className="p-3 bg-slate-900 rounded-2xl text-sky-500"><Mail size={22} /></div>
                    <span className="font-black uppercase text-[11px] tracking-wider text-slate-300">support@jetsetgo.com</span>
                  </li>
                  <li className="flex items-center gap-5">
                    <div className="p-3 bg-slate-900 rounded-2xl text-sky-500"><Phone size={22} /></div>
                    <span className="font-black uppercase text-[11px] tracking-wider text-slate-300">+977 1 4XXXXXX</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="mt-40 pt-12 border-t border-slate-900 text-center text-[11px] font-[1000] uppercase tracking-[0.5em] text-slate-600">
            © {new Date().getFullYear()} JetSetGo Nepal • Luxury Travel Logistics
          </div>
        </div>
      </footer>
    </div>
  );
};

export default JetSetGoLanding;