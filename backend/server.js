const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const User = require('./models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

const profileRouter = require('./routes/profile');
const userRouter = require('./routes/user');

app.use('/profile', profileRouter);
app.use('/user', userRouter);


app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});

// Signup Endpoint
/*app.post('/signup', async (req, res) => {
  // Extract info from request
  const { name, email, password } = req.body;

  // Hash password and create user, then save to DB (pseudo-code)
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({ name, email, password: hashedPassword });
  
  try {
    const savedUser = await newUser.save();
    // Respond with success or redirect, etc.
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(500).json({ message: "Error creating user", error: error.message });
  }
});*/

// Login Endpoint
/*app.post('/login', async (req, res) => {
  // Find user by email, validate password, generate token, etc. (pseudo-code)
  const user = await User.findOne({ email: req.body.email });
  const valid = await bcrypt.compare(req.body.password, user.password);
  
  if (valid) {
    // Generate token or session
    res.json({ message: "Login successful" });
  } else {
    res.status(400).json({ message: "Invalid credentials" });
  }
});*/