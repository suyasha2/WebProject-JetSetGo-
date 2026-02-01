const express = require("express");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
const User = require("../models/User"); 
const router = express.Router();

// --- 1. LOGIN ---
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    // Database ma email khojne
    const user = await User.findOne({ where: { email: email.trim() } });

    if (!user) {
      return res.status(404).json({ success: false, message: "User bhetiyen!" });
    }

    // Password check garne (Hashed password sanga compare garne)
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: "Password milena!" });
    }

    res.status(200).json({ 
      success: true, 
      message: "Login successful!", 
      user: { fullName: user.fullName, email: user.email } 
    });
  } catch (err) {
    console.error("Login Error:", err);
    res.status(500).json({ success: false, message: "Server error bhayo!" });
  }
});

// --- 2. FORGOT PASSWORD ---
router.post("/forgot-password", async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ where: { email: email.trim() } });
    
    if (!user) {
      return res.status(404).json({ success: false, message: "Email bhetiyen!" });
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "suyashaneupane64@gmail.com", 
        pass: "hvilramtunlykmua", // Tapaiko naya App Password
      },
    });

    const mailOptions = {
      from: '"JetSetGo" <suyashaneupane64@gmail.com>',
      to: email,
      subject: "Password Reset Link",
      html: `
        <div style="font-family: sans-serif; padding: 20px; border: 1px solid #eee;">
          <h2>Password Reset Request</h2>
          <p>Tala ko button ma click garera password feri halnus:</p>
          <a href="http://localhost:5173/reset-password/${user.id}" 
             style="background: #2563eb; color: white; padding: 12px 25px; text-decoration: none; border-radius: 5px; display: inline-block;">
             Reset Password
          </a>
        </div>`
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: true, message: "Email gayo!" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// --- 3. RESET PASSWORD ---
router.post("/reset-password/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    await User.update({ password: hashedPassword }, { where: { id } });
    res.status(200).json({ success: true, message: "Password successfully updated!" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Update fail bhayo." });
  }
});

module.exports = router;