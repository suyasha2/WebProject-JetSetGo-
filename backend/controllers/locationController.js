const Location = require("../models/Location");

exports.getAllLocations = async (req, res) => {
  try {
    const locations = await Location.findAll();
    res.json({ success: true, data: locations });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.createLocation = async (req, res) => {
  try {
    const imageData = req.file ? req.file.filename : "";
    const location = await Location.create({ ...req.body, image: imageData });
    res.status(201).json({ success: true, data: location });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.updateLocation = async (req, res) => {
  try {
    const { id } = req.params;
    // Explicitly taking data from req.body
    const { name, location, price, rating } = req.body;
    let updateData = { name, location, price, rating };

    if (req.file) {
      updateData.image = req.file.filename;
    }

    const [updated] = await Location.update(updateData, { where: { id } });
    if (updated) {
      const updatedItem = await Location.findByPk(id);
      return res.json({ success: true, data: updatedItem });
    }
    res.status(404).json({ success: false, message: "Package not found" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.deleteLocation = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Location.destroy({ where: { id } });
    if (deleted) return res.json({ success: true, message: "Deleted successfully" });
    res.status(404).json({ success: false, message: "Not found" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};