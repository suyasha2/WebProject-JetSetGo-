const express = require('express');
const router = express.Router();
const Notification = require('../models/Notification'); 

// 1. Get all notifications 
router.get('/', async (req, res) => {
    try {
        const data = await Notification.findAll({
            order: [['createdAt', 'DESC']]
        });
        res.json({ success: true, data });
    } catch (err) {
        res.status(500).json({ success: false, message: "Server Error" });
    }
});

// 2. Clear all notifications
router.delete('/clear', async (req, res) => {
    try {
        await Notification.destroy({
            where: {},
            truncate: true 
        });
        res.status(200).json({ success: true, message: "All notifications cleared" });
    } catch (err) {
        res.status(500).json({ success: false, message: "Error clearing data" });
    }
});

module.exports = router;