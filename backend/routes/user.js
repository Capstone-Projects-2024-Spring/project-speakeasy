const router = require('express').Router();
const User = require('../models/user.model');
const Profile = require('../models/profile.model');
const History = require('../models/history.model');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");


// Register Route
router.route('/register').post(async (req, res) => {
    try {
      // Extract user data from request body
      const { firstName, lastName, email, password, languages, dailyTarget } = req.body;
  
      // Check for existing user with same email
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json('Email already in use');
      }

      // Create a profile
      const newProfile = new Profile({
          firstName,
          lastName,
          languages,
          dailyTarget
      });

      // Initialize chatbot history with a welcome message
      const initialChatbotSession = {
        interactions: [{
            name: 'Chatbot',
            message: 'Hello! what would you like to know?'
        }],
        timestamp: new Date()
      };

      // Initialize chatbot history with a welcome message
      const initialTranslatorSession = {
        interactions: [{
            name: 'Chatbot',
            message: 'Welcome to translator! Send me anything, and I will translate it back for you.'
        }],
        timestamp: new Date()
      };

      // Initialize chatbot history with a welcome message
      const initialRoleplayingSession = {
        interactions: [{
            name: 'Chatbot',
            message: 'Welcome to roleplaying! Let me know what you want to roleplay to get started.'
        }],
        timestamp: new Date()
      };

      // Initialize chatbot history with a welcome message
      const initialVocabularySession = {
        interactions: [{
            name: 'Chatbot',
            message: 'Welcome to Vocab Practice! Give me any vocabulary terms you want to start with.'
        }],
        timestamp: new Date()
      };
      
      // Create a history
      const newHistory = new History({
        chatbot: [initialChatbotSession],
        translator: [initialTranslatorSession],
        roleplaying: [initialRoleplayingSession],
        vocabulary: [initialVocabularySession]
      });

      // Save the profile to the database
      const profile = await newProfile.save();
      const history = await newHistory.save();

      // Create a new user
      const newUser = new User({
        email,
        password,
        profile: profile._id,  // Link to the profile document
        history: history._id,  // Link to the history document
      });
  
      // Save the user to the database
      const savedUser = await newUser.save();

      res.json({ message: 'User registered successfully!', user: savedUser }); // Respond with success message and basic user info
    } catch (err) {
      console.error(err);
      res.status(500).json('Error: ' + err.message); // Handle errors gracefully
    }
});
  
// Login route
router.route('/login').post(async (req, res) => {
  try {
    const { email, password } = req.body; // use email to login? can change to username instead.

    const thisUser = await User.findOne({email})

    if (!thisUser) {
      return res.status(400).json({ message: 'Unable to login: invalid credentials.' });
    }

    passwordMatch = await bcrypt.compare(password, thisUser.password);

    if (!passwordMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: thisUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ message: 'Successfully logged in.', token, user: { _id: thisUser._id, name: thisUser.name, email: thisUser.email } });
  } catch (err) {
    console.error(err);
    res.status(500).json('Error: ' + err.message);
  }
});

router.route('/:userID').get(async (req, res) => {
  try {
      // Extract the userID from the URL parameters
      const { userID } = req.params;

      // Find the user in the database by their ID
      const user = await User.findById(userID).populate('profile');

      if (!user)
        return res.status(404).json({ message: 'User not found' });

      // Check if the user has a linked profile
      if (user.profile)
          res.json(user.profile);
      else
          res.status(404).json({ message: 'Profile not found for this user' });
  } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error fetching profile data' });
  }
});

router.route('/:userID/update').put(async (req, res) => {
  try {
    const { userID } = req.params;
    const { firstName, lastName, password } = req.body;
    const { languages, dailyTarget } = req.body;

    // Find the user in the database by their ID
    const user = await User.findById(userID).populate('profile');

    if (!user)
      return res.status(404).json({ message: 'User not found' });

    if (user.profile) {
      const profile = user.profile;
      // Update the first name if provided
      if (firstName) profile.firstName = firstName;
      // Update the last name if provided
      if (lastName) profile.lastName = lastName;
      // Update the language if provided
      if (languages) profile.languages = languages;
      // Update the daily time target if provided
      if (dailyTarget) profile.dailyTarget = dailyTarget;
      await profile.save();

      if (password) {
        user.password = password;
      }
      await user.save();
  
      res.send({ message: 'Profile updated successfully', user });
    } else {
      res.status(404).json({ message: 'Profile not found for this user' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching profile data' });
  }
});

module.exports = router;