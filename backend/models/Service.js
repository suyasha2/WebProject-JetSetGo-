const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Service = sequelize.define('Service', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  hotelName: { type: DataTypes.STRING, allowNull: false },
  location: { type: DataTypes.STRING, allowNull: true },
  price: { type: DataTypes.STRING, allowNull: true },
  description: { type: DataTypes.TEXT, allowNull: true },
  image: { type: DataTypes.STRING, allowNull: true },
  category: { type: DataTypes.STRING, defaultValue: "HOTEL" },
  phone: { type: DataTypes.STRING, defaultValue: "N/A" },
  status: { type: DataTypes.STRING, defaultValue: "OPEN 24/7" }
});

module.exports = Service;