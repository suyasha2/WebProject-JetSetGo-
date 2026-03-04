const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Review = sequelize.define("Review", {
  username: { type: DataTypes.STRING, allowNull: false },
 
  rating: { 
    type: DataTypes.INTEGER, 
    allowNull: false, 
    defaultValue: 5,
    validate: {
      min: 1, 
      max: 5
    }
  },
  comment: { type: DataTypes.TEXT, allowNull: false },
  locationName: { type: DataTypes.STRING, allowNull: true },
  locationId: { type: DataTypes.INTEGER, allowNull: true } 
}, { 
  tableName: "reviews", 
  timestamps: true 
});

module.exports = Review;