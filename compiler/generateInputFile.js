const fs = require("fs");
const path = require("path");
const { v4: uuid } = require("uuid");

// Automation to create a new Inputs Folder
const dirInput = path.join(__dirname, "Inputs");

// Now check whether the path exists or not; if not, create that filepath
if (!fs.existsSync(dirInput)) {
    fs.mkdirSync(dirInput, { recursive: true });
}

const generateInputFile = async (input) => {
    // console.log("Trying to generate the input file");
    const jobId = uuid(); // generate random jobId i.e file name
    const inputFileName = `${jobId}.txt`;
    const inputFilePath = path.join(dirInput, inputFileName); // Move the file to the dirInput file path=> But it will not show inside Inputs folder until we write something on that file
    // console.log(inputFilePath);
    fs.writeFileSync(inputFilePath, input); // Write the input into the file inputFilePath
    return inputFilePath;
};

module.exports = { generateInputFile };