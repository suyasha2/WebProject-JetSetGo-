import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Mail, ArrowLeft, Loader2, KeyRound } from "lucide-react";

// ===== ASSET IMPORTS =====
import logo from "./assets/logo.png";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: "", text: "" });

    try {
      const response = await fetch("http://localhost:8000/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (data.success) {
        setMessage({ type: "success", text: data.message });
      } else {
        setMessage({ type: "error", text: data.message });
      }
    } catch (err) {
      setMessage({ type: "error", text: "Server is not responding. Please try again later." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-[#bae6fd] via-[#e0f2fe] to-[#f0f9ff] font-sans relative overflow-hidden">
      
      {/* Dynamic Background Glows */}
      <div className="absolute top-[-15%] left-[-10%] w-[700px] h-[700px] bg-sky-300/30 rounded-full blur-[130px]"></div>
      <div className="absolute bottom-[-10%] right-[-5%] w-[600px] h-[600px] bg-blue-200/40 rounded-full blur-[100px]"></div>

      <div className="w-full max-w-[1250px] flex flex-col lg:flex-row min-h-[700px] p-6 md:p-12 items-center z-10">
        
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
              Forgot your <br /> 
              <span className="text-sky-500">password?</span>
            </h1>

            <p className="text-slate-600 text-xl font-medium max-w-md leading-relaxed opacity-90">
              Don't worry! It happens. Enter your email and we'll send you instructions to reset it safely.
            </p>
          </div>
        </div>

        {/* RIGHT SIDE: FORM (Premium White Card) */}
        <div className="w-full lg:w-1/2 flex items-center justify-center mt-12 lg:mt-0">
          <div className="bg-white rounded-[55px] shadow-[0_30px_70px_-20px_rgba(14,165,233,0.15)] w-full max-w-[480px] p-10 md:p-16 border border-white">
            
            <div className="mb-10 text-center lg:text-left">
              <div className="inline-flex items-center justify-center w-14 h-14 bg-sky-50 text-sky-500 rounded-2xl mb-6">
                <KeyRound size={30} />
              </div>
              <h2 className="text-4xl font-black text-slate-800 mb-2">Reset Password</h2>
              <p className="text-slate-400 font-medium">Enter your registered email address</p>
            </div>

            {/* Success/Error Message */}
            {message.text && (
              <div className={`mb-8 p-5 rounded-2xl text-sm font-bold flex items-center gap-3 animate-in fade-in slide-in-from-top-2 ${
                message.type === "success" 
                ? "bg-green-50 text-green-600 border border-green-100" 
                : "bg-red-50 text-red-600 border border-red-100"
              }`}>
                <div className={`w-2 h-2 rounded-full shrink-0 ${message.type === "success" ? "bg-green-500" : "bg-red-500"}`}></div>
                {message.text}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-7">
              {/* Email Field */}
              <div className="space-y-2.5">
                <label className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Email Address</label>
                <div className="relative group">
                  <Mail className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-sky-500 transition-colors" size={20} />
                  <input
                    type="email"
                    placeholder="traveler@example.com"
                    className="w-full pl-14 pr-7 py-4.5 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-4 focus:ring-sky-500/10 focus:border-sky-400 focus:bg-white transition-all text-slate-700 font-medium placeholder:text-slate-300"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button 
                type="submit"
                disabled={loading}
                className="w-full bg-sky-500 text-white py-4.5 rounded-2xl font-black text-lg shadow-xl shadow-sky-200/50 hover:bg-slate-900 active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:bg-slate-200 mt-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="animate-spin" size={22} />
                    Sending Link...
                  </>
                ) : (
                  "Send Reset Link"
                )}
              </button>
            </form>

            <div className="mt-10 text-center">
              <Link to="/login" className="inline-flex items-center gap-2 text-sky-600 font-black hover:text-slate-900 transition group underline-offset-8 hover:underline">
                <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                Back to Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;