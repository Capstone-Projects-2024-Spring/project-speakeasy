const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const messageSchema = new Schema({
    name: {
        type: String,
        required: true,
        enum: ['User', 'Chatbot']
    },
    message: {
        type: String,
        required: true
    },
});

// Define a session schema for groups of messages
const sessionSchema = new Schema({
    interactions: [messageSchema],  // Array of message subdocuments
    timestamp: {
        type: Date,
        default: Date.now
    }
});

const historySchema = new Schema({
    chatbot: [sessionSchema],
    translator: [sessionSchema],
    roleplaying: [sessionSchema],
    vocabulary: [sessionSchema]
}, {
    timestamps: true
});

const History = mongoose.model('History', historySchema);

module.exports = History;
