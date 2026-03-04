const express = require("express");
const router = express.Router();
const Booking = require("../models/Booking");
const Notification = require("../models/Notification");

// 1. ADD BOOKING
router.post("/add", async (req, res) => {
  try {
    const { fullName, email, phone, guests, travelDate, location_name, username } = req.body;
    const newBooking = await Booking.create({
      fullName, 
      email, 
      phone,
      guests: parseInt(guests) || 1,
      travelDate,
      locationName: location_name,
      username
    });

    await Notification.create({
      title: "Booking Success! ✈️",
      desc: `Your trip to ${location_name} is confirmed.`,
      username: username 
    });

    await Notification.create({
      title: "New Booking Alert! 🚨",
      desc: `${fullName} booked a trip to ${location_name}`,
      username: "admin" 
    });

    res.json({ success: true, message: "Booking success", data: newBooking });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// 2. GET ALL BOOKINGS 
router.get("/all", async (req, res) => {
  try {
    const data = await Booking.findAll({ 
      order: [['createdAt', 'DESC']] 
    });
    res.json({ success: true, data: data }); 
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// 3. GET USER BOOKINGS 
router.get("/user/:username", async (req, res) => {
  try {
    const { username } = req.params;
    const data = await Booking.findAll({ 
      where: { username: username.trim() },
      order: [['createdAt', 'DESC']] 
    });
    res.json({ success: true, data: data }); 
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// 4. DELETE BOOKING
router.delete("/delete/:id", async (req, res) => {
  try {
    const booking = await Booking.findByPk(req.params.id);
    if (!booking) return res.status(404).json({ success: false, message: "Not found" });

    await Booking.destroy({ where: { id: req.params.id } });

    await Notification.create({
      title: "Booking Cancelled ❌",
      desc: `${booking.fullName} cancelled the trip to ${booking.locationName}`,
      username: "admin"
    });

    res.json({ success: true, message: "Booking deleted" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;