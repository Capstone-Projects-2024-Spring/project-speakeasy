const express = require('express');
const router = express.Router();
const History = require('../models/history.model');
const User = require('../models/user.model');

// Endpoint to add a new history entry for a specific user
router.post('/add/:userId', async (req, res) => {
    const { userID } = req.params;
    const { chatbot, translator, roleplaying, vocabulary } = req.body;
    console.log("POO");
    try {
        const user = await User.findOne({ userID });
        if (!user)
            return res.status(404).json({ message: 'User not found' });

        const history = await History.findById(user.history);
        if (!history)
            return res.status(404).json({ message: 'History not found' });

        // Helper function to create a session of messages
        const createSession = (messages) => {
            return {
                interactions: messages.map(msg => ({
                    name: msg.name,
                    message: msg.message,
                    timestamp: msg.timestamp || new Date()
                })),
                timestamp: new Date()  // Timestamp for the session
            };
        };

        // Append new data to the respective fields
        if (chatbot) history.chatbot.push(createSession(chatbot));
        if (translator) history.translator.push(createSession(translator));
        if (roleplaying) history.roleplaying.push(createSession(roleplaying));
        if (vocabulary) history.vocabulary.push(createSession(vocabulary));

        await history.save();
        res.status(201).json({ message: "History updated successfully", history });
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
