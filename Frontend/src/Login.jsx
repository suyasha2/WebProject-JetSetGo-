import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, ArrowRight, Loader2 } from "lucide-react";

// ===== ASSET IMPORTS =====
import logo from "./assets/logo.png";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Backend Port 8000 ma run huna parcha
      const res = await fetch("http://localhost:8000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success) {
        // User ko name local storage ma save garne Dashboard ma dekhauna
        localStorage.setItem("user", data.user.fullName);
        navigate("/dashboard");
      } else {
        alert(data.message || "Invalid Credentials");
      }
    } catch (err) {
      console.error("Login Error:", err);
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
        
        {/* LEFT SIDE: BRANDING PANEL */}
        <div className="w-full lg:w-1/2 p-4 md:p-12 flex flex-col justify-center">
          <div className="space-y-7">
            <div className="flex items-center gap-4">
              <div className="bg-white p-2.5 rounded-2xl shadow-md border border-sky-100">
                <img src={logo} alt="Logo" className="w-12 h-12 object-contain" />
              </div>
              <span className="text-3xl font-black tracking-tighter text-sky-600">JetSetGo</span>
            </div>

            <h1 className="text-6xl md:text-[85px] font-black leading-[0.9] tracking-tight text-slate-900">
              Fast, Efficient <br /> 
              <span className="text-sky-500">and Productive.</span>
            </h1>

            <p className="text-slate-600 text-xl font-medium max-w-md leading-relaxed opacity-90">
              Manage your travel journey with JetSetGo. Access the best hotels and book your next adventure—all in one place.
            </p>
          </div>
        </div>

        {/* RIGHT SIDE: LOGIN FORM */}
        <div className="w-full lg:w-1/2 flex items-center justify-center mt-12 lg:mt-0">
          <div className="bg-white rounded-[55px] shadow-[0_30px_70px_-20px_rgba(14,165,233,0.15)] w-full max-w-[480px] p-10 md:p-16 border border-white">
            
            <div className="mb-12 text-center lg:text-left">
              <h2 className="text-4xl font-black text-slate-800 mb-2">Sign In</h2>
              <p className="text-slate-400 font-medium">Please enter your credentials</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-7">
              {/* Email Field */}
              <div className="space-y-2.5">
                <label className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Email Address</label>
                <div className="relative">
                   <Mail className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300" size={20} />
                   <input
                    type="email"
                    placeholder="name@example.com"
                    className="w-full pl-16 pr-7 py-5 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-4 focus:ring-sky-500/10 focus:border-sky-400 focus:bg-white transition-all text-slate-700 font-medium"
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-2.5">
                <label className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Password</label>
                <div className="relative">
                  <Lock className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300" size={20} />
                  <input
                    type="password"
                    placeholder="••••••••"
                    className="w-full pl-16 pr-7 py-5 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-4 focus:ring-sky-500/10 focus:border-sky-400 focus:bg-white transition-all text-slate-700 font-medium"
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="flex justify-end pr-1">
                 <Link to="/forgot-password" intrinsic="true" className="text-xs font-bold text-slate-400 hover:text-sky-500 transition">
                    Forgot Password?
                  </Link>
              </div>

              {/* Submit Button */}
              <button 
                type="submit"
                disabled={loading}
                className="w-full bg-sky-500 text-white py-5 rounded-2xl font-black text-lg shadow-xl shadow-sky-200/50 hover:bg-slate-900 active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:bg-slate-200 mt-4"
              >
                {loading ? <Loader2 className="animate-spin" /> : (
                  <>
                    Sign In <ArrowRight size={22} />
                  </>
                )}
              </button>
            </form>

            <div className="mt-12 text-center">
              <p className="text-slate-400 text-sm font-medium">
                New here? <Link to="/register" className="text-sky-500 font-black hover:underline underline-offset-4 ml-1">Create Account</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;