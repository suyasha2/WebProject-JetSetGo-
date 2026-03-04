const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const User = sequelize.define("User", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  fullName: { 
    type: DataTypes.STRING, 
    allowNull: true 
  }, 
  email: { 
    type: DataTypes.STRING, 
    allowNull: false, 
    unique: true 
  },
  password: { 
    type: DataTypes.STRING, 
    allowNull: false 
  },
  first_name: { 
    type: DataTypes.STRING,
    allowNull: true 
  },
  last_name: { 
    type: DataTypes.STRING,
    allowNull: true 
  },
  phone_number: { 
    type: DataTypes.STRING,
    allowNull: true 
  },
  address: { 
    type: DataTypes.TEXT,
    allowNull: true 
  }
}, { 
  tableName: "users",
  timestamps: true // This adds createdAt and updatedAt fields
});

module.exports = User;