const express = require('express');
const bodyParser = require('body-parser'); // You're already using express.json(), bodyParser is redundant here
const axios = require('axios');
const cors = require('cors');
const mongoose = require('mongoose');
const User = require('./models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const path = require('path');
const { GoogleGenerativeAI, HarmBlockThreshold, HarmCategory } = require("@google/generative-ai");
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;
const speech = require('@google-cloud/speech');
const speechClient = new speech.SpeechClient();
process.env.GOOGLE_APPLICATION_CREDENTIALS = "./SpeakeasyServiceAccount.json";

// Require necessary modules
const multer = require('multer'); // for handling multipart/form-data (file uploads)
const storage = multer.memoryStorage(); // store files in memory
const upload = multer({ storage: storage });

app.post('/api/speech-to-text', upload.single('audio'), async (req, res) => {
  console.log("Received audio file for speech-to-text");
    const audioBytes = req.file.buffer.toString('base64');
    const audio = {
        content: audioBytes,
    };

    const request = {
        audio: audio,
        config: {
            encoding: 'LINEAR16', // Ensure this matches the encoding from the client
            sampleRateHertz: 16000, // Ensure this matches the sample rate from the client
            languageCode: 'en-US', // Adjust language code as needed
        },
    };

    try {
        const [response] = await speechClient.recognize(request);
        const transcription = response.results
            .map(result => result.alternatives[0].transcript)
            .join('\n');
        res.send({ transcript: transcription });
    } catch (err) {
        console.error('ERROR:', err);
        res.status(500).send({ error: err.message });
    }
});

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

const aiConfig = {
  gemini: {
    textOnlyModel: "gemini-pro",
    apiKey: process.env.GEMINI_API_KEY,

    // Gemini Safety Settings
    // Explore all Harm categories here -> https://ai.google.dev/api/rest/v1beta/HarmCategory
    // Explore all threshold categories -> https://ai.google.dev/docs/safety_setting_gemini
    safetySettings: [
      {
        category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
        threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
      },
      {
        category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
        threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
      },
      {
        category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_HARASSMENT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
    ],
  },
};

const genAI = new GoogleGenerativeAI(aiConfig.gemini.apiKey);

const aiController = async (req, res) => {
  const modelType = req.body.modelType;

  if (modelType === "text_only") {
    const botReply = await textOnly(req.body.prompt);

    if (botReply?.Error) {
      return res.status(404).json({ Error: botReply.Error });
    }

    res.status(200).json({ 
      messages: [
        { text: req.body.prompt, sender: "user" },
        { text: botReply.result, sender: "bot" }
      ]
    });
  } else {
    res.status(404).json({ result: "Invalid Model Selected" });
  }
};

const textOnly = async (prompt) => {
  const model = genAI.getGenerativeModel({
    model: aiConfig.gemini.textOnlyModel,
    safetySettings: aiConfig.gemini.safetySettings,
  });

  // prompt is a single string
  try {
    const result = await model.generateContent(prompt);
    const chatResponse = result?.response?.text();

    return { result: chatResponse };
  } catch (error) {
    console.error("textOnly | error", error);
    return { Error: "Uh oh! Caught error while fetching AI response" };
  }
};

// Import routers
const profileRouter = require('./routes/profile');
const userRouter = require('./routes/user');
const historyRouter = require('./routes/history');
app.use('/profile', profileRouter);
app.use('/user', userRouter);
app.use('/history', historyRouter);

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Placeholder for integrating with the Gemini API
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`;

// Endpoint to handle chat messages from the frontend
app.post('/api/chat', aiController);

// Redirect for root access, adjust as necessary
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../speakeasyapp/src/components', 'MainPage.js'));
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
}); 