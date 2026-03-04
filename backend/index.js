const express = require("express");
const cors = require("cors");
const path = require("path"); 
require("dotenv").config();
const sequelize = require("./config/db");

const User = require("./models/User");
const Location = require("./models/Location");
const Hotel = require("./models/Hotel");
const Booking = require("./models/Booking");
const Review = require("./models/review");
const Notification = require("./models/Notification");

Location.belongsTo(Hotel, { foreignKey: "hotelId", onDelete: 'CASCADE' });
Hotel.hasMany(Location, { foreignKey: "hotelId", onDelete: 'CASCADE' });
Review.belongsTo(Location, { foreignKey: "locationId", onDelete: 'CASCADE' });
Location.hasMany(Review, { foreignKey: "locationId", onDelete: 'CASCADE' });

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true })); 
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const authRoutes = require("./routes/authRoutes"); 
const userRoutes = require("./routes/userRoutes"); 
const locationRoutes = require("./routes/locationRoutes");
const hotelRoutes = require("./routes/hotelRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const favoriteRoutes = require("./routes/favoriteRoutes"); 
const reviewRoutes = require("./routes/reviewRoutes"); 
const serviceRoutes = require("./routes/serviceRoutes"); 
const notificationRoutes = require("./routes/notification");

app.use("/api/auth", authRoutes); 
app.use("/api/users", userRoutes); 
app.use("/api/locations", locationRoutes);
app.use("/api/hotels", hotelRoutes); 
app.use("/api/bookings", bookingRoutes); 
app.use("/api/favorites", favoriteRoutes); 
app.use("/api/reviews", reviewRoutes); 
app.use("/api/services", serviceRoutes); 
app.use("/api/notifications", notificationRoutes);

const PORT = process.env.PORT || 8000;
sequelize.sync({ alter: true }) 
  .then(() => {
    console.log("✅ Everything Synced: Fav, Review, Service & User Ready!");
    app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
  })
  .catch(err => console.error("❌ DB Error:", err.message));