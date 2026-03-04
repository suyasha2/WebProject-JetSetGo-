const jwt = require("jsonwebtoken");

const protect = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer")) {
      return res.status(401).json({ success: false, message: "No token found!" });
    }
    const token = authHeader.split(" ")[1];
    
    // Check: Timro .env ma JWT_SECRET j chha, tei yaha huna parcha
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "your_jwt_secret");
    req.user = decoded; 
    next();
  } catch (err) {
    // Yadi token expire vayo vane yaha error aaucha
    res.status(401).json({ success: false, message: "Session expired, please login again" });
  }
};

module.exports = { protect };