import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, User, ArrowRight, Loader2 } from "lucide-react";

// ===== ASSET IMPORTS =====
import logo from "./assets/logo.png";

const Register = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      return alert("Passwords do not match!");
    }

    setLoading(true);
    try {
      const response = await fetch("http://localhost:8000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: formData.fullName,
          email: formData.email,
          password: formData.password
        }),
      });

      const data = await response.json();
      if (data.success) {
        alert("Account Created! Please Login.");
        navigate("/login");
      } else {
        alert(data.message || "Registration failed");
      }
    } catch (err) {
      console.error("Register Error:", err);
      alert("Backend server is not working. Terminal ma 'node server.js' run garnus.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-[#bae6fd] via-[#e0f2fe] to-[#f0f9ff] font-sans relative overflow-hidden">
      
      {/* Dynamic Background Glows */}
      <div className="absolute top-[-15%] left-[-10%] w-[700px] h-[700px] bg-sky-300/30 rounded-full blur-[130px]"></div>
      <div className="absolute bottom-[-10%] right-[-5%] w-[600px] h-[600px] bg-blue-200/40 rounded-full blur-[100px]"></div>

      <div className="w-full max-w-[1250px] flex flex-col lg:flex-row min-h-[750px] p-6 md:p-12 items-center z-10">
        
        {/* LEFT SIDE: BRANDING PANEL (Matched with Login) */}
        <div className="w-full lg:w-1/2 p-4 md:p-12 flex flex-col justify-center">
          <div className="space-y-7">
            <div className="flex items-center gap-4">
              <div className="bg-white p-2.5 rounded-2xl shadow-md border border-sky-100">
                <img src={logo} alt="Logo" className="w-12 h-12 object-contain" />
              </div>
              <span className="text-3xl font-black tracking-tighter text-sky-600">JetSetGo</span>
            </div>

            <h1 className="text-6xl md:text-[85px] font-black leading-[0.9] tracking-tight text-slate-900">
              Join the <br /> 
              <span className="text-sky-500">community.</span>
            </h1>

            <p className="text-slate-600 text-xl font-medium max-w-md leading-relaxed opacity-90">
              Create an account to save your favorite destinations and manage your bookings in one click.
            </p>
          </div>
        </div>

        {/* RIGHT SIDE: REGISTER FORM (Matched Width with Login) */}
        <div className="w-full lg:w-1/2 flex items-center justify-center mt-12 lg:mt-0">
          <div className="bg-white rounded-[55px] shadow-[0_30px_70px_-20px_rgba(14,165,233,0.15)] w-full max-w-[480px] p-10 md:p-14 border border-white">
            
            <div className="mb-10 text-center lg:text-left">
              <h2 className="text-4xl font-black text-slate-800 mb-2">Create Account</h2>
              <p className="text-slate-400 font-medium">Join us to explore Nepal</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Full Name */}
              <div className="space-y-2">
                <label className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Full Name</label>
                <div className="relative">
                  <User className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300" size={20} />
                  <input
                    type="text"
                    placeholder="John Doe"
                    className="w-full pl-16 pr-7 py-4.5 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-4 focus:ring-sky-500/10 focus:border-sky-400 focus:bg-white transition-all text-slate-700 font-medium"
                    onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                    required
                  />
                </div>
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300" size={20} />
                  <input
                    type="email"
                    placeholder="name@gmail.com"
                    className="w-full pl-16 pr-7 py-4.5 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-4 focus:ring-sky-500/10 focus:border-sky-400 focus:bg-white transition-all text-slate-700 font-medium"
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    required
                  />
                </div>
              </div>

              {/* Passwords Grid for compact look */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Password</label>
                  <input
                    type="password"
                    placeholder="••••"
                    className="w-full px-6 py-4.5 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:border-sky-400 transition-all text-slate-700 font-medium"
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Confirm</label>
                  <input
                    type="password"
                    placeholder="••••"
                    className="w-full px-6 py-4.5 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:border-sky-400 transition-all text-slate-700 font-medium"
                    onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                    required
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button 
                type="submit"
                disabled={loading}
                className="w-full bg-sky-500 text-white py-5 rounded-2xl font-black text-lg shadow-xl shadow-sky-200/50 hover:bg-slate-900 active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:bg-slate-200 mt-4"
              >
                {loading ? <Loader2 className="animate-spin" /> : (
                  <>
                    Create Account <ArrowRight size={22} />
                  </>
                )}
              </button>
            </form>

            <div className="mt-10 text-center">
              <p className="text-slate-400 text-sm font-medium">
                Already have an account? <Link to="/login" className="text-sky-500 font-black hover:underline underline-offset-4 ml-1">Sign In</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;