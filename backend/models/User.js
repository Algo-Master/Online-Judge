const mongoose = require("mongoose");

// Need to implement the solved problems part

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    default: null,
    required: true,
  },
  lastName: {
    type: String,
    default: null,
  },
  email: {
    type: String,
    default: null,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  solvedProblems: {
    type: Array,
    default: [],
  },
  role: {
    type: String,
    default: false,
  },
});

module.exports = mongoose.model("User", userSchema);
