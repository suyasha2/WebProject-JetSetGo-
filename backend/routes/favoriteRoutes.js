const express = require("express");
const router = express.Router();
const Favorite = require("../models/Favorite");

// 1. Get all favorite IDs for a specific user
router.get("/:username", async (req, res) => {
  try {
    const { username } = req.params;
    const favs = await Favorite.findAll({ where: { username } });
    
    const favIds = favs.map(f => f.locationId);
    res.json({ success: true, data: favIds });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// 2. Toggle Favorite (Add if not exists, Remove if exists)
router.post("/toggle", async (req, res) => {
  const { username, locationId } = req.body;
  try {
    const existing = await Favorite.findOne({ where: { username, locationId } });

    if (existing) {
      await existing.destroy(); 
      return res.json({ success: true, action: "removed" });
    } else {
      await Favorite.create({ username, locationId }); 
      return res.json({ success: true, action: "added" });
    }
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;