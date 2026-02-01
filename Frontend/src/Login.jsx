import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "./assets/logo.png";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("http://localhost:8000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success) {
        // Dashboard ma pathauna bhanda agadi data save gareko
        localStorage.setItem("user", data.user.fullName);
        alert("Login successful!");
        
        // REDIRECTION: Aba dashboard ma janchha
        navigate("/dashboard"); 
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.error("Login Error:", err);
      alert("Backend server is not working.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#EBF3FF] p-6">
      <div className="bg-white p-10 rounded-[40px] shadow-2xl w-full max-w-[450px] flex flex-col items-center">
        <div className="w-20 h-20 bg-[#DCE9FF] rounded-2xl flex items-center justify-center shadow-inner mb-6 overflow-hidden">
          <img src={logo} alt="JetSetGo Logo" className="w-full h-full object-contain p-2" />
        </div>

        <h2 className="text-3xl font-black text-[#2D3748] mb-2 text-center">Login</h2>
        <p className="text-gray-500 text-sm mb-8 text-center">Welcome back to JetSetGo</p>

        <form onSubmit={handleSubmit} className="w-full space-y-5">
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-[#2563EB] uppercase tracking-wider ml-1">Email</label>
            <input
              type="email"
              placeholder="suyasha64@gmail.com"
              className="w-full p-4 bg-[#F0F5FF] rounded-2xl outline-none focus:ring-2 focus:ring-blue-400 transition-all text-gray-700"
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
          </div>

          <div className="space-y-1 relative">
            <div className="flex justify-between items-center px-1">
              <label className="text-[10px] font-bold text-[#2563EB] uppercase tracking-wider">Password</label>
              <Link to="/forgot-password" intrinsic="true" className="text-[10px] font-bold text-[#2563EB] uppercase hover:underline">
                Forgot?
              </Link>
            </div>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full p-4 bg-[#F0F5FF] rounded-2xl outline-none focus:ring-2 focus:ring-blue-400 transition-all text-gray-700"
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
            />
          </div>

          <button 
            type="submit"
            disabled={loading}
            className="w-full bg-[#2563EB] text-white py-4 rounded-2xl font-bold text-lg shadow-lg shadow-blue-200 hover:bg-blue-700 active:scale-[0.98] transition-all mt-4 disabled:bg-gray-400"
          >
            {loading ? "Processing..." : "Sign In"}
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-gray-500 text-sm font-medium">
            New? <Link to="/register" className="text-[#2563EB] font-bold hover:underline">Register</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;