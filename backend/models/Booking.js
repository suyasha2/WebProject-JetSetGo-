const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Booking = sequelize.define("Booking", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  fullName: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false },
  phone: { type: DataTypes.STRING, allowNull: false },
  guests: { type: DataTypes.INTEGER, defaultValue: 1 },
  travelDate: { type: DataTypes.DATEONLY, allowNull: false },
  locationName: { type: DataTypes.STRING, allowNull: false },
  username: { type: DataTypes.STRING, allowNull: false } // Yo field mandatory hunchha
}, {
  timestamps: true 
});

module.exports = Booking;