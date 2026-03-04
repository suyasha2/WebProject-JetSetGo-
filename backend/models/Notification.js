const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Notification = sequelize.define("Notification", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  title: { type: DataTypes.STRING, allowNull: false }, 
  desc: { type: DataTypes.TEXT, allowNull: false },    
  type: { type: DataTypes.STRING, defaultValue: "info" },
  username: { type: DataTypes.STRING, allowNull: true } 
}, {
  timestamps: true 
});

module.exports = Notification;