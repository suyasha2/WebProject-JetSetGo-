const Hotel = require("../models/Hotel");

// 1. Add Hotel
exports.addHotel = async (req, res) => {
  try {
    const { name, location, price, description } = req.body;
    const image = req.file ? req.file.filename : null;
    if (!image) return res.status(400).json({ success: false, message: "Image upload failed!" });

    const newHotel = await Hotel.create({ name, location, price, description, image });
    res.status(201).json({ success: true, message: "Hotel Registered Successfully!", data: newHotel });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error!" });
  }
};

// 2. Get All Hotels
exports.getAllHotels = async (req, res) => {
  try {
    const hotels = await Hotel.findAll({ order: [["createdAt", "DESC"]] });
    res.status(200).json({ success: true, data: hotels });
  } catch (error) {
    res.status(500).json({ success: false, message: "Fetch Error!" });
  }
};

// 3. Get Single Hotel
exports.getSingleHotel = async (req, res) => {
  try {
    const hotel = await Hotel.findByPk(req.params.id);
    if (!hotel) return res.status(404).json({ success: false, message: "Hotel not found" });
    res.json({ success: true, data: hotel });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 4. Delete Hotel /
exports.deleteHotel = async (req, res) => {
  try {
    const hotel = await Hotel.findByPk(req.params.id);
    if (!hotel) {
      return res.status(404).json({ success: false, message: "Hotel not found!" });
    }
    await hotel.destroy();
    res.status(200).json({ success: true, message: "Hotel Deleted Successfully!" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Delete Error: Hotel is linked to a package!" });
  }
};