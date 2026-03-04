const express = require('express');
const router = express.Router();
const locationController = require('../controllers/locationController');
const multer = require('multer');
const path = require('path');

// Multer Config with File Filter
const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: (req, file, cb) => {
    cb(null, `IMG-${Date.now()}${path.extname(file.originalname)}`);
  }
});

const upload = multer({ 
  storage,
  limits: { fileSize: 5 * 1024 * 1024 } 
});

// GET
router.get('/', locationController.getAllLocations);
router.get('/:id', locationController.getSingleLocation);

// POST/PUT/DELETE
router.post('/', upload.single('image'), locationController.createLocation);
router.put('/:id', upload.single('image'), locationController.updateLocation);
router.delete('/:id', locationController.deleteLocation);

module.exports = router;