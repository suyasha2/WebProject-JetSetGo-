const express = require('express');
const router = express.Router();
const Notification = require('../models/Notification'); 

// Get Notifications by Username
router.get('/:username', async (req, res) => {
    try {
        const { username } = req.params;
        const data = await Notification.findAll({
            where: { username: username.trim() },
            order: [['createdAt', 'DESC']]
        });
        res.json({ success: true, data });
    } catch (err) {
        res.status(500).json({ success: false, message: "Server Error" });
    }
});

// Clear Notifications by Username
router.delete('/clear/:username', async (req, res) => {
    try {
        const { username } = req.params;
        await Notification.destroy({ where: { username: username } });
        res.json({ success: true, message: "Cleared" });
    } catch (err) {
        res.status(500).json({ success: false, message: "Error" });
    }
});

module.exports = router;