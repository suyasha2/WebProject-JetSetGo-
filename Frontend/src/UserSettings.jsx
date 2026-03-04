import React, { useState, useEffect } from "react";
import axios from "axios";
import { User, Shield, Lock, Save, Mail, Phone, MapPin, Trash2, AlertTriangle } from "lucide-react";

const UserSettings = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [formData, setFormData] = useState({
    first_name: "", 
    last_name: "", 
    email: "", 
    address: "", 
    phone_number: ""
  });
  
  const [securityData, setSecurityData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  const [deletePassword, setDeletePassword] = useState("");
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deleteLoading, setDeleteLoading] = useState(false);

  // Fetch user data
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userId = localStorage.getItem("userId"); 
        console.log("Fetching user with ID:", userId);
        
        if(!userId) {
          setError("No user ID found. Please login again.");
          setLoading(false);
          return;
        }
        
        const res = await axios.get(`http://localhost:8000/api/users/${userId}`);
        
        console.log("User data response:", res.data);
        
        if (res.data.success) {
          setFormData({
            first_name: res.data.user.first_name || "",
            last_name: res.data.user.last_name || "",
            email: res.data.user.email || "",
            phone_number: res.data.user.phone_number || "",
            address: res.data.user.address || ""
          });
        } else {
          setError(res.data.message || "Failed to load user data");
        }
      } catch (err) {
        console.error("Fetch error:", err);
        setError("Error loading user data. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    
    fetchUser();
  }, []);

  // Update Profile
  const handleProfileUpdate = async () => {
    const userId = localStorage.getItem("userId"); 
    
    if(!userId) {
      alert("User ID not found. Please login again.");
      return;
    }

    try {
      const res = await axios.put(`http://localhost:8000/api/users/update/${userId}`, formData);
      
      if (res.data.success) {
        alert("Profile updated successfully!");
      } else {
        alert(res.data.message || "Update failed!");
      }
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Update Failed!");
    }
  };

  // Update Password
  const handlePasswordUpdate = async () => {
    if (securityData.newPassword !== securityData.confirmPassword) {
      alert("New passwords do not match!");
      return;
    }
    
    if (securityData.newPassword.length < 6) {
      alert("Password must be at least 6 characters long!");
      return;
    }
    
    try {
      const userId = localStorage.getItem("userId");
      
      if(!userId) {
        alert("User ID not found. Please login again.");
        return;
      }
      
      const res = await axios.put(`http://localhost:8000/api/users/update-password/${userId}`, {
        currentPassword: securityData.currentPassword,
        newPassword: securityData.newPassword
      });
      
      if (res.data.success) {
        alert("Password updated successfully!");
        setSecurityData({ currentPassword: "", newPassword: "", confirmPassword: "" });
      } else {
        alert(res.data.message || "Password update failed");
      }
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Password update failed");
    }
  };

  // Delete Account - USING POST METHOD
  const handleDeleteAccount = async () => {
    if (!deletePassword) {
      alert("Please enter your password to confirm account deletion.");
      return;
    }

    setDeleteLoading(true);
    
    try {
      const userId = localStorage.getItem("userId");
      const userEmail = formData.email;
      
      if(!userId) {
        alert("User ID not found. Please login again.");
        setDeleteLoading(false);
        return;
      }
      
      // USING POST INSTEAD OF DELETE
      const res = await axios.post(`http://localhost:8000/api/users/delete-account/${userId}`, {
        password: deletePassword,
        email: userEmail
      });
      
      if (res.data.success) {
        alert("Your account has been successfully deleted. You will be redirected to the home page.");
        
        // Clear local storage
        localStorage.removeItem("userId");
        localStorage.removeItem("userEmail");
        localStorage.removeItem("token");
        localStorage.clear(); // Clear all just to be safe
        
        // Redirect to home page or login page
        window.location.href = "/";
      } else {
        alert(res.data.message || "Account deletion failed");
        setShowDeleteConfirm(false);
        setDeletePassword("");
      }
    } catch (err) {
      console.error("Delete account error:", err);
      
      // More detailed error message
      const errorMessage = err.response?.data?.message || 
                          err.message || 
                          "Account deletion failed. Please try again.";
      alert(errorMessage);
      
      setShowDeleteConfirm(false);
      setDeletePassword("");
    } finally {
      setDeleteLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-xl font-bold text-slate-400">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-xl font-bold text-red-400">{error}</div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-10 flex bg-white shadow-xl rounded-[30px] overflow-hidden min-h-[600px]">
      {/* Sidebar */}
      <div className="w-1/4 border-r p-5 space-y-4">
        <h1 className="text-xl font-black mb-10 text-slate-800 tracking-tighter">SETTINGS</h1>
        <button 
          onClick={() => setActiveTab("profile")} 
          className={`w-full p-4 rounded-xl flex items-center gap-3 font-bold transition-all ${activeTab === 'profile' ? 'bg-sky-50 text-sky-600 shadow-sm' : 'text-gray-400 hover:bg-slate-50'}`}
        >
          <User size={20} /> Profile
        </button>
        <button 
          onClick={() => setActiveTab("security")} 
          className={`w-full p-4 rounded-xl flex items-center gap-3 font-bold transition-all ${activeTab === 'security' ? 'bg-sky-50 text-sky-600 shadow-sm' : 'text-gray-400 hover:bg-slate-50'}`}
        >
          <Shield size={20} /> Security
        </button>
        <button 
          onClick={() => setActiveTab("danger")} 
          className={`w-full p-4 rounded-xl flex items-center gap-3 font-bold transition-all ${activeTab === 'danger' ? 'bg-red-50 text-red-600 shadow-sm' : 'text-gray-400 hover:bg-slate-50'}`}
        >
          <Trash2 size={20} /> Danger Zone
        </button>
      </div>

      {/* Main Content */}
      <div className="w-3/4 p-10">
        {activeTab === "profile" ? (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold italic uppercase tracking-tight">Personal <span className="text-sky-600">Details</span></h2>

            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-400 ml-1">FIRST NAME</label>
                <input 
                  type="text" 
                  placeholder="First Name" 
                  value={formData.first_name || ""} 
                  onChange={(e) => setFormData({ ...formData, first_name: e.target.value })} 
                  className="w-full p-4 bg-slate-50 rounded-xl outline-none focus:ring-2 ring-sky-100 transition-all" 
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-400 ml-1">LAST NAME</label>
                <input 
                  type="text" 
                  placeholder="Last Name" 
                  value={formData.last_name || ""} 
                  onChange={(e) => setFormData({ ...formData, last_name: e.target.value })} 
                  className="w-full p-4 bg-slate-50 rounded-xl outline-none focus:ring-2 ring-sky-100 transition-all" 
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-400 ml-1">EMAIL ADDRESS (Read Only)</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-4 text-gray-300" size={18} />
                  <input 
                    type="email" 
                    value={formData.email || ""} 
                    disabled 
                    className="w-full p-4 pl-12 bg-gray-100 text-gray-500 rounded-xl cursor-not-allowed outline-none" 
                  />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-400 ml-1">PHONE NUMBER</label>
                <div className="relative">
                  <Phone className="absolute left-4 top-4 text-gray-300" size={18} />
                  <input 
                    type="text" 
                    placeholder="Phone" 
                    value={formData.phone_number || ""} 
                    onChange={(e) => setFormData({ ...formData, phone_number: e.target.value })} 
                    className="w-full p-4 pl-12 bg-slate-50 rounded-xl outline-none focus:ring-2 ring-sky-100" 
                  />
                </div>
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-400 ml-1">ADDRESS</label>
              <div className="relative">
                <MapPin className="absolute left-4 top-4 text-gray-300" size={18} />
                <textarea 
                  placeholder="Your full address..." 
                  value={formData.address || ""} 
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })} 
                  className="w-full p-4 pl-12 bg-slate-50 rounded-xl outline-none focus:ring-2 ring-sky-100 h-24" 
                />
              </div>
            </div>

            <button 
              onClick={handleProfileUpdate} 
              className="bg-sky-600 hover:bg-sky-700 text-white px-10 py-4 rounded-xl font-bold flex items-center gap-2 shadow-lg shadow-sky-100 transition-all"
            >
              <Save size={18} /> Update Profile
            </button>
          </div>
        ) : activeTab === "security" ? (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold italic uppercase text-sky-600 tracking-tight">Security Settings</h2>
            <p className="text-gray-400 text-sm">Keep your account secure by updating your password regularly.</p>
            <div className="max-w-md space-y-4 pt-4">
              <input 
                type="password" 
                placeholder="Current Password" 
                value={securityData.currentPassword} 
                onChange={(e) => setSecurityData({ ...securityData, currentPassword: e.target.value })} 
                className="w-full p-4 bg-slate-50 rounded-xl outline-none focus:ring-2 ring-sky-100" 
              />
              <div className="h-[1px] bg-slate-100 my-2"></div>
              <input 
                type="password" 
                placeholder="New Password" 
                value={securityData.newPassword} 
                onChange={(e) => setSecurityData({ ...securityData, newPassword: e.target.value })} 
                className="w-full p-4 bg-slate-50 rounded-xl outline-none focus:ring-2 ring-sky-100" 
              />
              <input 
                type="password" 
                placeholder="Confirm New Password" 
                value={securityData.confirmPassword} 
                onChange={(e) => setSecurityData({ ...securityData, confirmPassword: e.target.value })} 
                className="w-full p-4 bg-slate-50 rounded-xl outline-none focus:ring-2 ring-sky-100" 
              />
              <button 
                onClick={handlePasswordUpdate} 
                className="w-full bg-slate-900 hover:bg-black text-white px-8 py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all mt-4"
              >
                <Lock size={18} /> Change Password
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold italic uppercase text-red-600 tracking-tight">Danger Zone</h2>
            <p className="text-gray-400 text-sm">Permanently delete your account and all associated data. This action cannot be undone.</p>
            
            <div className="bg-red-50 border border-red-200 rounded-xl p-6 mt-4 max-w-md">
              <div className="flex items-start gap-4">
                <div className="bg-red-100 p-3 rounded-full">
                  <AlertTriangle className="text-red-600" size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-red-800 mb-1">Delete Account</h3>
                  <p className="text-sm text-red-600 mb-4">
                    Once you delete your account, all your data including bookings, favorites, and reviews will be permanently removed.
                  </p>
                  
                  {!showDeleteConfirm ? (
                    <button
                      onClick={() => setShowDeleteConfirm(true)}
                      className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition-all text-sm"
                    >
                      <Trash2 size={16} /> Delete My Account
                    </button>
                  ) : (
                    <div className="space-y-4">
                      <p className="text-sm font-bold text-red-800">Please enter your password to confirm:</p>
                      <input
                        type="password"
                        placeholder="Enter your password"
                        value={deletePassword}
                        onChange={(e) => setDeletePassword(e.target.value)}
                        className="w-full p-3 bg-white border border-red-200 rounded-xl outline-none focus:ring-2 ring-red-200"
                        autoFocus
                      />
                      <div className="flex gap-3">
                        <button
                          onClick={handleDeleteAccount}
                          disabled={deleteLoading}
                          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-xl font-bold flex items-center gap-2 transition-all text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {deleteLoading ? (
                            <>
                              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                              Deleting...
                            </>
                          ) : (
                            <>
                              <Trash2 size={16} /> Confirm Delete
                            </>
                          )}
                        </button>
                        <button
                          onClick={() => {
                            setShowDeleteConfirm(false);
                            setDeletePassword("");
                          }}
                          className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-xl font-bold transition-all text-sm"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserSettings;