const fs = require("fs");
const path = require("path");
const { v4: uuid } = require("uuid");

const dirCodes = path.join(__dirname, "codes");

if (!fs.existsSync(dirCodes)) {
  fs.mkdirSync(dirCodes, { recursive: true });
}

const generateFile = (language, code) => {
  // Create the directory for the specific language if it doesn't exist
  const languageDir = path.join(dirCodes, language);
  if (!fs.existsSync(languageDir)) {
    fs.mkdirSync(languageDir, { recursive: true });
  }

  // Generate a unique filename with the language as extension
  const jobId = uuid();
  const filename = `${jobId}.${language}`;
  const filePath = path.join(languageDir, filename);

  // Write the code to the file
  fs.writeFileSync(filePath, code);
  return filePath;
};

module.exports = { generateFile };
