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
    timestamp: {
        type: Date,
        default: Date.now
    }
});

const historySchema = new Schema({
    chatbot: [messageSchema],
    translator: [messageSchema],
    roleplaying: [messageSchema],
    vocabulary: [messageSchema]
}, {
    timestamps: true
});


const History = mongoose.model('History', historySchema);

module.exports = History;
