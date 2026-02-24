const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Favorite = sequelize.define("Favorite", {
  username: { 
    type: DataTypes.STRING, 
    allowNull: false 
  },
  locationId: { 
    type: DataTypes.INTEGER, 
    allowNull: false 
  }
}, { 
  tableName: "favorites", 
  timestamps: true 
});

module.exports = Favorite;