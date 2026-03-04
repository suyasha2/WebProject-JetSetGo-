const User = require("../models/User");
const bcrypt = require("bcryptjs");

// URL bata ID liyera profile tanne
exports.getUserProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id, { attributes: { exclude: ['password'] } });
    if (!user) return res.status(404).json({ success: false, message: "User not found" });
    res.status(200).json({ success: true, user });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// URL bata ID liyera profile update garne
exports.updateProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const { email, ...updateData } = req.body; 
    await User.update(updateData, { where: { id: id } });
    res.json({ success: true, message: "Profile Updated in Database!" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Update Failed" });
  }
};