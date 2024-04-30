const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const profileSchema = new Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
    minlength: 1
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
    minlength: 1
  },
  languages: {
    type: [String],
    required: true, // must have initial language, i.e. array length of 1.
    default: ['English'] // Starting language
  },
  dailyTarget: {
    type: Number,
    default: 10 // Daily target time in minutes, default 10 minutes
  }
}, {
  timestamps: true
});

profileSchema.pre('save', async function (next) {
  next();
});

const Profile = mongoose.model('Profile', profileSchema);

module.exports = Profile;