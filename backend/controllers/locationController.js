const Location = require("../models/Location");
const Hotel = require("../models/Hotel");

// 1. Get All Locations//
exports.getAllLocations = async (req, res) => {
  try {
    const locations = await Location.findAll({ 
      include: [{ model: Hotel }], 
      order: [['createdAt', 'DESC']] 
    });
    res.json({ success: true, data: locations });
  } catch (error) {
    console.error("Fetch Error:", error);
    res.status(500).json({ success: false, message: "Failed to fetch locations" });
  }
};

// 2. Get Single Location Detail//
exports.getSingleLocation = async (req, res) => {
  try {
    const location = await Location.findByPk(req.params.id, {
      include: [{ model: Hotel }]
    });
    if (!location) return res.status(404).json({ success: false, message: "Location not found" });
    res.json({ success: true, data: location });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 3. Create Location
exports.createLocation = async (req, res) => {
  try {
    const { name, location, price, rating, description, hotelId, itinerary } = req.body;
    
    // Itinerary handling
    const formattedItinerary = typeof itinerary === 'object' ? JSON.stringify(itinerary) : itinerary;

    const newLocation = await Location.create({
      name,
      location,
      price,
      rating: rating || 5.0,
      description,
      hotelId: hotelId || null, 
      itinerary: formattedItinerary,
      image: req.file ? req.file.filename : ""
    });

    res.status(201).json({ success: true, data: newLocation });
  } catch (error) {
    console.error("Creation Error:", error);
    res.status(500).json({ success: false, message: "Error creating package" });
  }
};

// 4. Update Location
exports.updateLocation = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, location, price, rating, description, hotelId, itinerary } = req.body;
    
    let updateData = { name, location, price, rating, description, hotelId };

    if (itinerary) {
      updateData.itinerary = typeof itinerary === 'object' ? JSON.stringify(itinerary) : itinerary;
    }

    if (req.file) {
      updateData.image = req.file.filename;
    }

    const [updated] = await Location.update(updateData, { where: { id } });
    
    if (updated) {
      const updatedItem = await Location.findByPk(id, { include: [{ model: Hotel }] });
      return res.json({ success: true, data: updatedItem });
    }
    res.status(404).json({ success: false, message: "Location not found" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 5. Delete Location
exports.deleteLocation = async (req, res) => {
  try {
    const deleted = await Location.destroy({ where: { id: req.params.id } });
    if (deleted) return res.json({ success: true, message: "Deleted successfully" });
    res.status(404).json({ success: false, message: "Location not found" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};