import React from 'react';
// Steps for the chatbot conversation
const steps = [
    {
        id: '1',
        message: 'What is your name?', // Initial message
        trigger: '2', // Next step ID
    },
    {
        id: '2',
        user: true, // User input
        trigger: '3', // Next step ID
    },
    {
        id: '3',
        message: 'Hi {previousValue}, nice to meet you!', // Response message
        end: true, // End the conversation
    },
];

// Chatbot theme
const theme = {
    background: '#f7bc75' // Background color
};

// Chatbot component
const Bot = () => (
    <p>Hello</p>
);

export default Bot;
