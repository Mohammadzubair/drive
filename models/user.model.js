const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    minlenght: [3, "Name must be at least 3 characters long"],
  },

  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    minlenght: [13, "Email must be at least 13 characters long"],
  },

  password: {
    type: String,
    required: true,
    trim: true,
    minlenght: [6, "Password must be at least 6 characters long"],
  },

  confirm_password: {
    type: String,
    required: true,
    trim: true,
    minlenght: [6, "Password must be at least 6 characters long"],
  },
});

const user = mongoose.model("user", userSchema);

module.exports = user;
