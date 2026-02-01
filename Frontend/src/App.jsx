import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import JetSetGoLanding from './JetSetGoLanding';
import Login from './Login';
import Register from './Register';
import ForgotPassword from './ForgotPassword';
import ResetPassword from './ResetPassword';
import Dashboard from './Dashboard'; // Dashboard import gareko

function App() {
  return (
    <Router>
      <Routes>
        {/* Home / Landing Page */}
        <Route path="/" element={<JetSetGoLanding />} />

        {/* Dashboard - Login bhayepachhi khulne */}
        <Route path="/dashboard" element={<Dashboard />} />

        {/* Authentication Pages */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Password Recovery Flow */}
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:id" element={<ResetPassword />} />
      </Routes>
    </Router>
  );
}

export default App;