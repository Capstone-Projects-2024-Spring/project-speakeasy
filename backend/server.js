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

const languageVoiceMap = {
  'English': { languageCode: 'en-US', name: 'en-US-Standard-C' },
  'Spanish': { languageCode: 'es-ES', name: 'es-ES-Standard-A' },
  'French': { languageCode: 'fr-FR', name: 'fr-FR-Standard-A' },
  'German': { languageCode: 'de-DE', name: 'de-DE-Standard-A' },
  'Italian': { languageCode: 'it-IT', name: 'it-IT-Standard-A'}
  // Add more language-voice mappings as needed
};

app.post("/synthesize", async(req, res) => {
  const text = req.body.text
  const apiKey = process.env.TTS_API_KEY
  const language = req.body.language
  console.log('Selected Language:', language)
  const endpoint =`https://texttospeech.googleapis.com/v1beta1/text:synthesize?key=${apiKey}`;
  const voice = languageVoiceMap[language] || languageVoiceMap['English'];
  console.log('Selected Voice:', voice)

  const payload = {
    "audioConfig": {
      "audioEncoding": "LINEAR16",
      "effectsProfileId": [
        "small-bluetooth-speaker-class-device"
      ],
      "pitch": 0,
      "speakingRate": 1
    },
    "input": {
      "text": text
    },
    "voice": voice
  }
  try {
    const response = await axios.post(endpoint, payload);
    res.json(response.data);
  } catch (error) {
    console.error('Error synthesizing speech:', error);
    res.status(500).json({ error: 'Failed to synthesize speech' });
  }
})



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

  try {
    const result = await model.generateContent(prompt);
    const chatResponse = result?.response?.text();

    return { result: chatResponse };
  } catch (error) {
    console.error("textOnly | error", error);

    if (error.message.includes("Candidate was blocked due to SAFETY")) {
      return {
        result: "I apologize, but the response generated was blocked due to safety concerns. Please try rephrasing your message or providing a different prompt.",
      };
    } else {
      return { Error: "Uh oh! Caught error while fetching AI response" };
    }
  }
};;

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