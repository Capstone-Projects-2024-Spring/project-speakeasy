const express = require('express');
const router = express.Router();
const History = require('../models/history.model');

// Endpoint to add a new history entry
router.post('/add', async (req, res) => {
    const { userId, chatbot, translator, roleplaying, vocabulary } = req.body;
    try {
        const newHistory = new History({
            userId,
            chatbot,
            translator,
            roleplaying,
            vocabulary
        });
        await newHistory.save();
        res.status(201).json(newHistory);
    } catch (error) {
        res.status(400).json({ message: 'Failed to add history', error: error.message });
    }
});

// Endpoint to retrieve history for a specific user
router.get('/user/:userId', async (req, res) => {
    try {
        const histories = await History.find({ userId: req.params.userId });
        if (!histories.length) {
            return res.status(404).json({ message: 'No history found for this user' });
        }
        res.json(histories);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching history', error: error.message });
    }
});

module.exports = router;
