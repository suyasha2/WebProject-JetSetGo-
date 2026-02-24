const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Location = sequelize.define("Location", {
  name: { type: DataTypes.STRING, allowNull: false },
  location: { type: DataTypes.STRING, allowNull: false },
  price: { type: DataTypes.STRING, allowNull: false },
  rating: { type: DataTypes.FLOAT, defaultValue: 0 },
  tags: { type: DataTypes.JSON, defaultValue: [] },
  image: { type: DataTypes.STRING, allowNull: true }, // YO THAPNU PARCHA
});

module.exports = Location;