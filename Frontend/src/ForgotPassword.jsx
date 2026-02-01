import { useState } from "react";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("http://localhost:8000/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (data.success) {
        setMessage("Success: " + data.message);
      } else {
        setMessage("Error: " + data.message);
      }
    } catch (err) {
      setMessage("Error: Server is not responding.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-blue-200 via-blue-100 to-white">
      <div className="bg-white/80 backdrop-blur-xl w-full max-w-md rounded-3xl shadow-2xl border border-white p-10">
        
        <div className="flex flex-col items-center mb-8">
          <div className="w-20 h-20 rounded-2xl bg-blue-100 flex items-center justify-center shadow-lg mb-4">
            <span className="text-blue-600 font-black text-xl">Logo</span>
          </div>
          <h2 className="text-2xl font-black text-gray-800 tracking-tight">Forgot Password?</h2>
          <p className="text-gray-500 text-sm text-center">Enter your email to receive a reset link.</p>
        </div>

        {message && (
          <div className={`mb-6 p-4 rounded-xl text-center text-sm font-bold ${
            message.includes("Success") ? "bg-green-100 text-green-600 border border-green-200" : "bg-red-100 text-red-600 border border-red-200"
          }`}>
            {message}
          </div>
        )}

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-1">
            <label className="text-xs font-bold text-blue-600 uppercase tracking-wider ml-1">Email Address</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="suyashaneupane64@gmail.com"
              className="w-full px-5 py-3 rounded-xl bg-blue-50 focus:ring-2 focus:ring-blue-400 outline-none transition"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl font-bold text-lg shadow-xl shadow-blue-200 transition-all disabled:bg-gray-400"
          >
            {loading ? "Sending link..." : "Send Reset Link"}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-gray-100 text-center">
          <Link to="/login" className="text-blue-600 font-bold hover:text-blue-800 transition">Back to Login</Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;