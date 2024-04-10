const express = require('express');
const bodyParser = require('body-parser'); // You're already using express.json(), bodyParser is redundant here
const axios = require('axios');
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const path = require('path');
const axios = require('axios'); // Ensure axios is required at the top

require('dotenv').config();


const app = express();
const PORT = process.env.PORT || 3000;

// Middleware for parsing JSON bodies
// app.use(bodyParser.json()); // Deprecated, using express.json() instead
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({
  origin: 'http://localhost:3001' // Adjust as per your frontend's port if different
}));

// MongoDB connection
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
});

// Import routers
const profileRouter = require('./routes/profile');
const userRouter = require('./routes/user');

// Your existing routes
app.use('/profile', profileRouter);
app.use('/user', userRouter);

// New route for chat messages
app.post('/api/chat', async (req, res) => {
  const { message } = req.body;
  try {
    // Corrected to use GEMINI_API_URL for the endpoint and GEMINI_API_KEY for the bearer token
    const response = await axios.post(process.env.GEMINI_API_URL, {
      // Make sure your request payload here matches the expected structure by the Gemini API
      prompt: message,
    }, {
      headers: {
        'Authorization': `Bearer ${process.env.GEMINI_API_KEY}`,
        'Content-Type': 'application/json',
      },
    });
    
    console.log('Request to Gemini API:', req.body);
    console.log('Response from Gemini API:', response.data);
    console.error('Error communicating with Gemini API:', error.response ? error.response.data : error);

    
    res.json(response.data);
  } catch (error) {
    console.error('Error communicating with Gemini API:', error.response ? error.response.data : error);
    res.status(500).json({ error: 'Failed to fetch response from Gemini API' });
  }
});


app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../speakeasyapp/src/components', 'MainPage.js'));
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
});
