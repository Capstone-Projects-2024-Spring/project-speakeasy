const router = require('express').Router();
let User = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");


// Register Route
router.route('/register').post(async (req, res) => {
    try {
      // Extract user data from request body
      const { name, email, password } = req.body;
  
      // Check for existing user with same email
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json('Email already in use');
      }
  
      // Hash password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
  
      // Create a new user
      const newUser = new User({
        name,
        email,
        password: hashedPassword
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

    const passwordMatch = await bcrypt.compare(password, thisUser.password);

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

module.exports = router;