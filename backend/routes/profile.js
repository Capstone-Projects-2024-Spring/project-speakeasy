const router = require('express').Router();
let Profile = require('../models/profile.model');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

// Register Route
router.route('/register').post(async (req, res) => {
    try {
      // Extract user data from request body
      const { firstName, lastName, languages, location } = req.body;
  
      // Create profile
      const newProfile = new Profile({
        firstName,
        lastName,
        languages,
        location
      });
  
      // Save the user to the database
      const savedProfile = await newProfile.save();
  
      res.json({ message: 'Profile saved successfully!', profile: savedProfile }); // Respond with success message and basic user info
    } catch (err) {
      console.error(err);
      res.status(500).json('Error: ' + err.message); // Handle errors gracefully
    }
  });


// find prof by ID
router.route('/:id').get(async (req, res) => {
  try {
    const profile = await Profile.findById(req.params.id);
    if (!profile) {
      return res.status(404).json('Profile not found.');
    }
    res.json(profile);
  } catch (err) {
    console.error(err);
    res.status(500).json('Error: ' + err.message);
  }
});

// Update prof
router.route('/update/:id').put(async (req, res) => {
  try {
    const { firstName, lastName, languages, location } = req.body;
    const updatedProfile = await Profile.findByIdAndUpdate(req.params.id, {
      firstName,
      lastName,
      languages,
      location
    }, { new: true });
    if (!updatedProfile) {
      return res.status(404).json('Profile not found.');
    }
    res.json(updatedProfile);
  } catch (err) {
    console.error(err);
    res.status(500).json('Error: ' + err.message);
  }
});

// Delete profile
router.route('/delete/:id').delete(async (req, res) => {
  try {
    const deletedProfile = await Profile.findByIdAndDelete(req.params.id);
    if (!deletedProfile) {
      return res.status(404).json('Profile not found.');
    }
    res.json({ message: 'Profile deleted successfully.' });
  } catch (err) {
    console.error(err);
    res.status(500).json('Error: ' + err.message);
  }
});

module.exports = router;