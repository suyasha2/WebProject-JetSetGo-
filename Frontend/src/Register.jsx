import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

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
        alert(data.message);
      }
    } catch (err) {
      alert("Backend is not running. Please check terminal.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#EBF3FF] p-6">
      <div className="bg-white p-10 rounded-[40px] shadow-2xl w-full max-w-[450px] flex flex-col items-center">
        
        {/* LOGO BOX */}
        <div className="w-20 h-20 bg-[#DCE9FF] rounded-2xl flex items-center justify-center shadow-inner mb-6">
          <span className="text-[#2563EB] font-black text-xl">Logo</span>
        </div>

        <h2 className="text-3xl font-black text-[#2D3748] mb-1 text-center">Create Account</h2>
        <p className="text-gray-500 text-sm mb-8 text-center">Join JetSetGo & explore Nepal</p>

        <form onSubmit={handleSubmit} className="w-full space-y-4">
          {/* FULL NAME */}
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-[#2563EB] uppercase tracking-wider ml-1">Full Name</label>
            <input
              type="text"
              placeholder="John Doe"
              className="w-full p-4 bg-[#F0F5FF] rounded-2xl outline-none focus:ring-2 focus:ring-blue-400 transition-all"
              onChange={(e) => setFormData({...formData, fullName: e.target.value})}
              required
            />
          </div>

          {/* EMAIL */}
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-[#2563EB] uppercase tracking-wider ml-1">Email</label>
            <input
              type="email"
              placeholder="john@example.com"
              className="w-full p-4 bg-[#F0F5FF] rounded-2xl outline-none focus:ring-2 focus:ring-blue-400 transition-all"
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              required
            />
          </div>

          {/* PASSWORD */}
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-[#2563EB] uppercase tracking-wider ml-1">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full p-4 bg-[#F0F5FF] rounded-2xl outline-none focus:ring-2 focus:ring-blue-400 transition-all"
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              required
            />
          </div>

          {/* CONFIRM PASSWORD */}
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-[#2563EB] uppercase tracking-wider ml-1">Confirm Password</label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full p-4 bg-[#F0F5FF] rounded-2xl outline-none focus:ring-2 focus:ring-blue-400 transition-all"
              onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
              required
            />
          </div>

          <button 
            disabled={loading}
            className="w-full bg-[#2563EB] text-white py-4 rounded-2xl font-bold text-lg shadow-lg shadow-blue-200 hover:bg-blue-700 active:scale-[0.98] transition-all mt-4"
          >
            {loading ? "Processing..." : "Create Account"}
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-gray-500 text-sm font-medium">
            Already have an account?{" "}
            <Link to="/login" className="text-[#2563EB] font-bold hover:underline">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;