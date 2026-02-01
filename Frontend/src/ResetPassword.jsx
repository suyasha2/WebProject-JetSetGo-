import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const ResetPassword = () => {
    const { id } = useParams(); 
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if(password !== confirmPassword) {
            return setMessage("Password didnt match !");
        }

        try {
            // BACKEND URL CHECK GARNUS (localhost:8000)
            const res = await axios.post(`http://localhost:8000/api/auth/reset-password/${id}`, { password });
            
            if (res.data.success) {
                alert("Password reset successfully.");
                navigate('/login'); 
            }
        } catch (err) {
            setMessage("Error: Password cannot be changed.");
        }
    };

    return (
        <div style={{ maxWidth: "400px", margin: "50px auto", textAlign: "center", fontFamily: "Arial" }}>
            <h2>Enter your new Password</h2>
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
                <input 
                    type="password" 
                    placeholder="New Password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    required 
                    style={{ padding: "12px", borderRadius: "5px", border: "1px solid #ccc" }}
                />
                <input 
                    type="password" 
                    placeholder="Confirm New Password" 
                    value={confirmPassword} 
                    onChange={(e) => setConfirmPassword(e.target.value)} 
                    required 
                    style={{ padding: "12px", borderRadius: "5px", border: "1px solid #ccc" }}
                />
                <button type="submit" style={{ padding: "12px", background: "#2563eb", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" }}>
                    Update Password
                </button>
            </form>
            {message && <p style={{ color: "red", marginTop: "10px" }}>{message}</p>}
        </div>
    );
};

export default ResetPassword;