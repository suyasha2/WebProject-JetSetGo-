const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { 
  getAdminServices, 
  createAdminService, 
  updateAdminService, 
  deleteAdminService 
} = require('../controllers/adminServiceController');

// Multer Setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage });

router.get('/', getAdminServices);
router.post('/', upload.single('image'), createAdminService); 
router.put('/:id', updateAdminService);
router.delete('/:id', deleteAdminService);

module.exports = router;