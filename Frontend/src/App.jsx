import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// --- USER COMPONENTS ---
import JetSetGoLanding from './JetSetGoLanding';
import Login from './Login'; 
import Register from './Register';
import Dashboard from './Dashboard';
import DestinationDetail from './DestinationDetail';
import BookingPage from './BookingPage';
import HotelDetail from './HotelDetail';
import UserSettings from './UserSettings'; 

// --- PASSWORD RECOVERY ---
import ForgotPassword from './ForgotPassword';
import ResetPassword from './ResetPassword';

// --- ADMIN COMPONENTS ---
import AdminLogin from './AdminLogin'; 
import AdminPanel from './AdminPanel';


function App() {
  return (
    <Router>
      <Routes>
        {/* --- Public Routes --- */}
        <Route path="/" element={<JetSetGoLanding />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        {/* --- User Protected Routes --- */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/user-settings" element={<UserSettings />} /> 
        <Route path="/destination/:id" element={<DestinationDetail />} />
        <Route path="/booking/:id" element={<BookingPage />} />
        <Route path="/hotel-detail/:id" element={<HotelDetail />} />
        
        {/* --- Password Recovery Routes --- */}
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:id" element={<ResetPassword />} />
        
        {/* --- Admin Routes --- */}
        <Route path="/admin-auth" element={<AdminLogin />} />
        <Route path="/admin-panel" element={<AdminPanel />} />
        

        {/* --- 404 - Page Not Found --- */}
        <Route path="*" element={
          <div className="h-screen flex items-center justify-center font-black uppercase italic text-slate-400">
            404 | Flight Not Found
          </div>
        } />
      </Routes>
    </Router>
  );
}

export default App;