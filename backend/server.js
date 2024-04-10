const express = require('express');
const bodyParser = require('body-parser'); // You're already using express.json(), bodyParser is redundant here
const axios = require('axios');
const cors = require('cors');
const mongoose = require('mongoose');
const User = require('./models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const path = require('path');
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
app.use('/profile', profileRouter);
app.use('/user', userRouter);

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Placeholder for integrating with the Gemini API
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`;

// Endpoint to handle chat messages from the frontend
app.post('/api/chat', async (req, res) => {
  const { message } = req.body;
  try {
      const apiResponse = await axios.post(GEMINI_API_URL, {
          contents: [
            { 
              role: "user",
              parts: [{ text: message }]
            }
          ]
      }, {
          headers: {
              'Content-Type': 'application/json'
          }
      });

      // Adjust the path to the text in the response according to the actual structure of the Gemini API response
      const responseText = apiResponse.data.text; // This may need adjustment based on the actual response
      res.json({ text: responseText });
  } catch (error) {
      console.error('Error calling Gemini API:', error.message);
      res.status(500).json({ error: "Error processing your message", details: error.message });
  }
});

// Redirect for root access, adjust as necessary
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../speakeasyapp/src/components', 'MainPage.js'));
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
});