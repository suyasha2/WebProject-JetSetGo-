const Service = require('../models/Service');

exports.createAdminService = async (req, res) => {
  try {
    const { name, location, price, description } = req.body;
    const image = req.file ? req.file.filename : "default.jpg";

    const newService = await Service.create({ 
      hotelName: name, 
      location, 
      price, 
      description, 
      image 
    });

    res.status(201).json({ success: true, data: newService });
  } catch (err) {
    console.error("Error:", err.message);
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.getAdminServices = async (req, res) => {
  try {
    const services = await Service.findAll();
    res.status(200).json({ success: true, data: services });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.updateAdminService = async (req, res) => {  };
exports.deleteAdminService = async (req, res) => {  };