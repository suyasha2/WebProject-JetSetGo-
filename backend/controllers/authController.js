const User = require("../models/User");
const bcrypt = require("bcryptjs");

// --- REGISTER ---
exports.register = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;

   
    if (!fullName || !email || !password) {
      return res.status(400).json({ success: false, message: "Please fill all fields!" });
    }

    const existingUser = await User.findOne({ where: { email: email.trim() } });
    if (existingUser) {
      return res.status(400).json({ success: false, message: "Email already registered!" });
    }
    const nameParts = fullName.trim().split(" ");
    const firstName = nameParts[0];
    const lastName = nameParts.length > 1 ? nameParts.slice(1).join(" ") : "";

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      first_name: firstName,
      last_name: lastName,
      email: email.trim().toLowerCase(),
      password: hashedPassword
    });

    res.status(201).json({ 
      success: true, 
      message: "Account created successfully!",
      user: { id: newUser.id, email: newUser.email } 
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// --- LOGIN ---
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ 
      where: { email: email.trim().toLowerCase() } 
    });

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found!" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: "Invalid credentials!" });
    }

    // Get the user data explicitly
    const userData = user.get({ plain: true });
    
    console.log("User data from DB:", userData); // Debug: See what's coming from DB

    res.status(200).json({ 
      success: true, 
      message: "Login successful!", 
      user: { 
        id: userData.id,  // Explicitly get the id
        fullName: `${userData.first_name || ''} ${userData.last_name || ''}`.trim() || userData.fullName || email.split('@')[0], 
        email: userData.email,
        first_name: userData.first_name,
        last_name: userData.last_name
      } 
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ success: false, message: "Login failed!" });
  }
};

// --- RESET PASSWORD ---
exports.resetPassword = async (req, res) => {
  try {
    const { id } = req.params;
    const { password } = req.body;

    if (!password || password.length < 6) {
        return res.status(400).json({ success: false, message: "Password must be 6+ chars." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    
    const updated = await User.update(
        { password: hashedPassword }, 
        { where: { id: id } }
    );

    if (updated[0] === 0) {
        return res.status(404).json({ success: false, message: "User not found." });
    }

    res.status(200).json({ success: true, message: "Password updated!" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Reset failed." });
  }
};