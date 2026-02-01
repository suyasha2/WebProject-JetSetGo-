import React from "react";
import { Link } from "react-router-dom";
import { 
  LayoutDashboard, Heart, Bell, 
  BookmarkCheck, Mail, Phone, MapPin 
} from 'lucide-react';

// ===== ASSET IMPORTS =====
import logo from "./assets/logo.png";
import heroImage from "./assets/hero.jpg";
import destination1 from "./assets/destination1.jpg";
import destination2 from "./assets/destination2.jpg";

const JetSetGoLanding = () => {

  const destinations = [
    {
      id: 1,
      name: "Everest Region",
      image: destination1,
      desc: "Experience the top of the world."
    },
    {
      id: 2,
      name: "Pokhara Valley",
      image: destination2,
      desc: "Serene lakes and mountain views."
    }
  ];

  const appFeatures = [
    {
      title: "Smart Dashboard",
      desc: "Get personalized travel recommendations based on your interests.",
      icon: <LayoutDashboard size={32} className="text-blue-600" />,
      color: "bg-blue-50"
    },
    {
      title: "Save Favourites",
      desc: "Keep track of the places you love with our one-tap heart feature.",
      icon: <Heart size={32} className="text-red-500" />,
      color: "bg-red-50"
    },
    {
      title: "Real-time Alerts",
      desc: "Get notified instantly about price drops and booking confirmations.",
      icon: <Bell size={32} className="text-orange-500" />,
      color: "bg-orange-50"
    },
    {
      title: "Easy Bookings",
      desc: "Manage all your travel tickets and hotel stays in one organized place.",
      icon: <BookmarkCheck size={32} className="text-green-600" />,
      color: "bg-green-50"
    }
  ];

  return (
    <div className="min-h-screen bg-white text-gray-800 font-sans scroll-smooth">

      {/* ================= NAVBAR ================= */}
      <nav className="flex items-center justify-between px-10 py-6 border-b border-blue-50 sticky top-0 bg-white/80 backdrop-blur-md z-50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10">
            <img src={logo} alt="JetSetGo Logo" className="w-full h-full object-contain" />
          </div>
          <span className="text-3xl font-black text-blue-600 tracking-tighter">
            JetSetGo
          </span>
        </div>

        <div className="hidden md:flex space-x-8 font-bold text-sm uppercase tracking-wide">
          <a href="#home" className="hover:text-blue-600 transition">Home</a>
          <a href="#features" className="hover:text-blue-600 transition">App Features</a>
          <a href="#destinations" className="hover:text-blue-600 transition">Destinations</a>
          {/* Added Contact Link */}
          <a href="#contact" className="hover:text-blue-600 transition">Contact</a>
        </div>

        <Link to="/login">
          <button className="bg-blue-600 text-white px-6 py-2 rounded-full font-bold hover:bg-slate-900 transition-all shadow-md">
            Login
          </button>
        </Link>
      </nav>

      {/* ================= HERO SECTION ================= */}
      <header id="home" className="px-10 py-16 md:py-24 flex flex-col md:flex-row items-center gap-12 max-w-7xl mx-auto">
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-5xl md:text-7xl font-extrabold leading-tight mb-6">
            Travel Nepal <br />
            <span className="text-blue-600 underline decoration-blue-100">Without Limits.</span>
          </h1>
          <p className="text-lg text-gray-600 mb-8 max-w-lg mx-auto md:mx-0">
            JetSetGo is Nepal's simplest booking platform. Find the best hotels,
            flights, and trekking guides with just a few clicks.
          </p>
          <Link to="/login">
            <button className="bg-slate-900 text-white px-10 py-4 rounded-xl font-bold hover:bg-blue-600 transition-all shadow-xl">
              Start Your Journey
            </button>
          </Link>
        </div>

        <div className="flex-1 w-full h-[450px] rounded-[2rem] shadow-2xl overflow-hidden rotate-2 hover:rotate-0 transition-transform duration-500">
          <img src={heroImage} alt="Nepal" className="w-full h-full object-cover" />
        </div>
      </header>

      {/* ================= APP FEATURES SECTION ================= */}
      <section id="features" className="py-24 px-10 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-blue-600 font-bold uppercase tracking-widest text-sm">Experience the App</span>
            <h2 className="text-4xl font-black mt-2">Inside JetSetGo</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {appFeatures.map((feature, index) => (
              <div key={index} className={`p-8 rounded-3xl border border-slate-50 ${feature.color} hover:-translate-y-2 transition-transform duration-300`}>
                <div className="bg-white w-16 h-16 rounded-2xl flex items-center justify-center shadow-sm mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= DESTINATIONS ================= */}
      <section id="destinations" className="bg-slate-50 py-24 px-10 rounded-t-[3rem]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-4">
            <div>
              <h2 className="text-4xl font-black mb-2">Popular Places</h2>
              <p className="text-gray-500">Curated by travel experts across Nepal.</p>
            </div>
            <div className="h-1 flex-1 bg-slate-200 mb-4 mx-8 hidden md:block"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-10">
            {destinations.map((item) => (
              <div key={item.id} className="bg-white rounded-[2rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all group border border-slate-100">
                <div className="w-full h-80 overflow-hidden relative">
                    <div className="absolute top-6 right-6 bg-white/90 backdrop-blur px-4 py-1 rounded-full font-bold text-sm text-blue-600 z-10">
                        Trending
                    </div>
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-black mb-2">{item.name}</h3>
                  <p className="text-gray-500 mb-6">{item.desc}</p>
                  <Link to="/login" className="text-blue-600 font-bold hover:underline">Explore Region →</Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= FOOTER / CONTACT SECTION ================= */}
      <footer id="contact" className="bg-slate-900 text-white py-20 px-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            <div className="col-span-1">
              <h2 className="text-3xl font-black text-blue-400 mb-6">JetSetGo</h2>
              <p className="text-gray-400 leading-relaxed">
                Your trusted partner for exploring the beautiful landscapes of Nepal. 
                From the Himalayas to the Terai, we've got you covered.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-12 col-span-1 md:col-span-2">
              <div>
                <h4 className="font-bold text-white mb-6 uppercase tracking-widest text-sm underline decoration-blue-500 underline-offset-8">Quick Links</h4>
                <ul className="space-y-4 text-gray-400 font-medium">
                  <li><a href="#home" className="hover:text-blue-400 transition">Home</a></li>
                  <li><a href="#features" className="hover:text-blue-400 transition">Features</a></li>
                  <li><a href="#destinations" className="hover:text-blue-400 transition">Destinations</a></li>
                </ul>
              </div>

              {/* Enhanced Contact Details */}
              <div>
                <h4 className="font-bold text-white mb-6 uppercase tracking-widest text-sm underline decoration-blue-500 underline-offset-8">Get In Touch</h4>
                <ul className="space-y-4 text-gray-400 font-medium">
                  <li className="flex items-center gap-3">
                    <Mail size={18} className="text-blue-400" /> 
                    <span>support@jetsetgo.com.np</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Phone size={18} className="text-blue-400" /> 
                    <span>+977 98XXXXXXXX</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <MapPin size={18} className="text-blue-400" /> 
                    <span>Thamel, Kathmandu, Nepal</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-20 pt-8 border-t border-slate-800 text-center text-sm text-gray-500">
            © {new Date().getFullYear()} JetSetGo Nepal. All rights reserved.
          </div>
        </div>
      </footer>

    </div>
  );
};

export default JetSetGoLanding;