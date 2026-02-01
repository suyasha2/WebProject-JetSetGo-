import React from "react";
import { Link } from "react-router-dom";

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
      image: destination1, // Variable use gareko
      desc: "Experience the top of the world."
    },
    {
      id: 2,
      name: "Pokhara Valley",
      image: destination2, // Variable use gareko
      desc: "Serene lakes and mountain views."
    }
  ];

  return (
    <div className="min-h-screen bg-white text-gray-800 font-sans">

      {/* ================= NAVBAR ================= */}
      <nav className="flex items-center justify-between px-10 py-6 border-b border-blue-50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 flex items-center justify-center">
            {/* LOGO ACTIVE GAREKO */}
            <img src={logo} alt="JetSetGo Logo" className="w-full h-full object-contain" />
          </div>

          <span className="text-3xl font-black text-blue-600 tracking-tighter">
            JetSetGo
          </span>
        </div>

        <div className="hidden md:flex space-x-8 font-medium">
          <a href="#home" className="hover:text-blue-600 transition">Home</a>
          <a href="#destinations" className="hover:text-blue-600 transition">Destinations</a>
          <a href="#contact" className="hover:text-blue-600 transition">Contact</a>
        </div>
      </nav>

      {/* ================= HERO SECTION ================= */}
      <header className="px-10 py-16 md:py-24 flex flex-col md:flex-row items-center gap-12 max-w-7xl mx-auto">
        <div className="flex-1">
          <h1 className="text-5xl md:text-6xl font-extrabold leading-tight mb-6">
            Travel Nepal <br />
            <span className="text-blue-600">Without Limits.</span>
          </h1>

          <p className="text-lg text-gray-600 mb-8 max-w-lg">
            JetSetGo is Nepal's simplest booking platform. Find the best hotels,
            flights, and trekking guides with just a few clicks.
          </p>

          <Link to="/login">
            <button className="bg-blue-600 text-white px-10 py-4 rounded-lg font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-100">
              Start Booking
            </button>
          </Link>
        </div>

        {/* HERO IMAGE ACTIVE GAREKO */}
        <div className="flex-1 w-full h-[400px] rounded-3xl shadow-2xl overflow-hidden">
          <img src={heroImage} alt="Nepal" className="w-full h-full object-cover" />
        </div>
      </header>

      {/* ================= DESTINATIONS ================= */}
      <section id="destinations" className="bg-blue-50 py-20 px-10">
        <div className="max-w-7xl mx-auto text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Top Destinations</h2>
          <div className="w-20 h-1 bg-blue-600 mx-auto"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-10 max-w-5xl mx-auto">
          {destinations.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all group"
            >
              {/* DESTINATION IMAGE ACTIVE GAREKO */}
              <div className="w-full h-64 overflow-hidden">
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                />
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{item.name}</h3>
                <p className="text-gray-500">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer id="contact" className="bg-white border-t border-blue-50 py-16 px-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-10">
          <div>
            <h2 className="text-2xl font-black text-blue-600 mb-4">
              JetSetGo
            </h2>
            <p className="text-gray-500 max-w-xs">
              Your trusted partner for exploring the beautiful landscapes of Nepal.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-12">
            <div>
              <h4 className="font-bold text-gray-900 mb-4">Contact Us</h4>
              <ul className="space-y-2 text-gray-600">
                <li>📞 +977 1 4XXXXXX</li>
                <li>📱 +977 98XXXXXXXX</li>
                <li>✉️ support@jetsetgo.com.np</li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-gray-900 mb-4">Location</h4>
              <p className="text-gray-600">
                Thamel, Kathmandu <br />
                Nepal
              </p>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-gray-100 text-center text-sm text-gray-400">
          © {new Date().getFullYear()} JetSetGo Nepal. All rights reserved.
        </div>
      </footer>

    </div>
  );
};

export default JetSetGoLanding;