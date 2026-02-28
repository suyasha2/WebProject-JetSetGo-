// Express Route Setup
const express = require('express');
const router = express.Router();

const Notification = require('../models/Notification'); 

// 1. notifications API
router.get('/', async (req, res) => {
    try {
        const data = await Notification.find().sort({ createdAt: -1 });
        res.json(data);
    } catch (err) {
        res.status(500).json({ message: "Server Error" });
    }
});

// 2. Clear All Notifications API 
router.delete('/clear', async (req, res) => {
    try {
        await Notification.deleteMany({}); 
        res.status(200).json({ message: "All notifications cleared" });
    } catch (err) {
        res.status(500).json({ message: "Error clearing data" });
    }
});

module.exports = router;