const express = require("express");
const router = express.Router();
const hotelController = require("../controllers/hotelController");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage: storage });

router.post("/", upload.single("image"), hotelController.addHotel);
router.get("/", hotelController.getAllHotels);
router.get("/:id", hotelController.getSingleHotel);
router.delete("/:id", hotelController.deleteHotel); 

module.exports = router;