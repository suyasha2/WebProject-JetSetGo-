const express = require("express");
const Service = require("../models/Service");
const router = express.Router();

// Get all services
router.get("/all", async (req, res) => {
  try {
    const data = await Service.findAll();
    res.json({ success: true, data });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
});

// Add new service
router.post("/add", async (req, res) => {
  try {
    const newService = await Service.create(req.body);
    res.json({ success: true, data: newService });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
});

// Delete service
router.delete("/delete/:id", async (req, res) => {
  try {
    await Service.destroy({ where: { id: req.params.id } });
    res.json({ success: true });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
});

module.exports = router;