const Review = require("../models/review");
const User = require("../models/User");

exports.addReview = async (req, res) => {
  try {
    const { comment, rating, locationId, userId } = req.body; 
    const newReview = await Review.create({ comment, rating, locationId, userId });
    res.status(201).json({ success: true, data: newReview });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.findAll({
      include: [{ model: User, attributes: ['fullName', 'email'] }]
    });
    res.status(200).json({ success: true, data: reviews });
  } catch (err) {
    res.status(500).json({ success: false, message: "Error fetching reviews" });
  }
};