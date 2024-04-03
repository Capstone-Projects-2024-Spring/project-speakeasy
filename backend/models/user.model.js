const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;

const userSchema = new Schema({
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
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true // Ensure email addresses are always lowercase for consistency
    },
    password: {
      type: String,
      required: true,
      minlength: 8 // Enforce a minimum password length for security
    }
}, {
    timestamps: true
});

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
  
    const salt = await bcrypt.genSalt(10); // Adjust salt rounds as needed
  
    this.password = await bcrypt.hash(this.password, salt);
  
    next();
  });

const User = mongoose.model('User', userSchema);

module.exports = User;