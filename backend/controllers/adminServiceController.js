// adminServiceController.js - Yo check gara hai
exports.createAdminService = async (req, res) => {
  try {
    const { title, name, phone, availability } = req.body; // Exactly matches frontend
    const newService = await AdminService.create({ title, name, phone, availability });
    res.status(201).json({ success: true, data: newService });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};