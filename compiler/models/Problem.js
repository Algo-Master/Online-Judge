// models/Problem.js
const mongoose = require('mongoose');

const problemSchema = new mongoose.Schema({
    number: {
        type: Number,
        required: true,
        unique: true 
    },
    title: {
        type: String,
        required: true
    },
    difficulty: {
        type: String,
        required: true
    },
    solved: {
        type: String,
        default: "No"
    },
    acceptance_rate: {
        type: Number,
        default:  null,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    inputFormat: { 
        type: String,
        required: true
    },
    outputFormat: { 
        type: String,
        required: true
    },
    testCases: [
        {
            input: String,
            inputValue: String,
            output: String,
            explanation: String 
        }
    ]
});

module.exports = mongoose.model('Problem', problemSchema);