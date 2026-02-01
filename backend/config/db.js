const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_NAME || 'final', 
  process.env.DB_USER || 'postgres', 
  process.env.DB_PASSWORD || 'your_db_password', 
  {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5433, // <--- PGAdmin ko port check garnus (5432 or 5433)
    dialect: 'postgres',
    logging: false,
  }
);

module.exports = sequelize;