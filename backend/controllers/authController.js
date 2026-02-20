const User = require("../models/User"); // तपाइँको User Model को path
const bcrypt = require("bcryptjs");

exports.register = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;

    // १. प्रयोगकर्ता पहिले नै छ कि छैन चेक गर्ने
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ success: false, message: "Email already exists!" });
    }

    // २. पासवर्ड ह्यास गर्ने
    const hashedPassword = await bcrypt.hash(password, 10);

    // ३. नयाँ प्रयोगकर्ता बनाउने (fullName लाई यहाँ username मा राखिएको छ)
    await User.create({
      username: fullName, 
      email: email,
      password: hashedPassword
    });

    res.status(201).json({ success: true, message: "User registered successfully!" });
  } catch (error) {
    console.error("Register Error:", error);
    res.status(500).json({ success: false, message: "Server Error during registration." });
  }
};