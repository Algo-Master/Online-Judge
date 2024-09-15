// models/Problem.js
const mongoose = require("mongoose");

/* Need to implement Solvers and Acceptance sections
  So basically we need to maintain data like how many submissions has been recieved (One of Each User)
  and data of how many of them were correct!! Tyhe acceptance value shall be automatically be shown in the UI*/

const problemSchema = new mongoose.Schema({
  number: {
    type: Number,
    required: true,
    unique: true,
  },
  title: {
    type: String,
    required: true,
  },
  timel: {
    type: Number,
    required: true,
  },
  meml: {
    type: Number,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  difficulty: {
    type: String,
    required: true,
  },
  statement: {
    type: String,
    required: true,
  },
  inputcriteria: {
    type: String,
    required: true,
  },
  outputcriteria: {
    type: String,
    required: true,
  },
  examples: [
    {
      exinput: String,
      exoutput: String,
    },
  ],
  testcases: [
    {
      testinput: String,
      testoutput: String,
    },
  ],
  notes: {
    type: String,
  },
  solvers: {
    type: Number,
    required: true,
  },
  acceptance: {
    type: Number,
    default: null,
    required: true,
  },
  setter: {
    type: String,
    required: true,
  }
});

module.exports = mongoose.model("Problem", problemSchema);
