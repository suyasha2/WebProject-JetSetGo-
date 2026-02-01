const express = require("express");
const cors = require("cors");
require("dotenv").config();
const sequelize = require("./config/db");
const authRoutes = require("./routes/authRoutes");

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);

// Server start
const PORT = process.env.PORT || 8000;

sequelize.sync({ alter: true })
  .then(() => {
    console.log("✅ DB Connected Successfully");
    app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
  })
  .catch(err => {
    console.log("❌ DB Error details:");
    console.error(err);
  });