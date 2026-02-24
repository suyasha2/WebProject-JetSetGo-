const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Review = sequelize.define("Review", {
  username: { type: DataTypes.STRING, allowNull: false },
  rating: { type: DataTypes.INTEGER, allowNull: false },
  comment: { type: DataTypes.TEXT, allowNull: false },
  locationName: { type: DataTypes.STRING, allowNull: true } 
}, { 
  tableName: "reviews", 
  timestamps: true 
});

module.exports = Review;