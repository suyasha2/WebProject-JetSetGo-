const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Location = sequelize.define("Location", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  location: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  rating: {
    type: DataTypes.FLOAT,
    defaultValue: 5.0,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  image: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  hotelId: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  itinerary: {
    type: DataTypes.TEXT, 
    allowNull: true,
  }
});

module.exports = Location;