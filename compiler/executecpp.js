const fs = require("fs");
const path = require("path");
const { exec } = require("child_process");

const outputPath = path.join(__dirname, "executables");

if (!fs.existsSync(outputPath)) {
  fs.mkdirSync(outputPath, { recursive: true });
}

// executecpp.js
const executecpp = (filePath, inputFilePath) => {
  const jobId = path.basename(filePath).split(".")[0];
  const outputFilename = `${jobId}.exe`;
  const outPath = path.join(outputPath, outputFilename);

  return new Promise((resolve, reject) => {
    exec(
      `g++ ${filePath} -o ${outPath} && cd ${outputPath} && .\\${outputFilename} < ${inputFilePath}`,
      (error, stdout, stderr) => {
        if (error) reject(error);
        else if (stderr) reject(stderr);
        else {
          // Normalize line endings to '\n'
          const normalizedOutput = stdout.replace(/\r\n/g, '\n').trim();
          resolve(normalizedOutput);
        }
      }
    );
  });
};

module.exports = { executecpp };
