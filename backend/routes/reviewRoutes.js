const express = require("express");
const router = express.Router();
const Review = require("../models/review"); 
const Notification = require("../models/Notification");

// 1. POST://
router.post("/", async (req, res) => {
  try {
    const { username, rating, comment, locationName, locationId } = req.body;
    const finalRating = (rating && rating > 0) ? rating : 5;

    const newReview = await Review.create({ 
      username, 
      rating: finalRating, 
      comment, 
      locationName, 
      locationId 
    });

   
    await Notification.create({
      title: "NEW REVIEW RECEIVED ⭐",
      desc: `${username} rated ${locationName || 'a location'} with ${finalRating} stars.`,
      type: "review",
      username: "admin" 
    });

    res.status(201).json({ success: true, data: newReview });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// 2. GET//

router.get("/all", async (req, res) => {
  try {
    const reviews = await Review.findAll({ order: [['createdAt', 'DESC']] });
    res.status(200).json({ success: true, data: reviews });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// 3. DELETE//

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await Review.destroy({ where: { id: id } });
    res.json({ success: true, message: "Review Deleted!" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;