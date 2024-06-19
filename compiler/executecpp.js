const fs = require("fs");
const path = require("path");
const { exec } = require("child_process");

const outputPath = path.join(__dirname, "executables");

if (!fs.existsSync(outputPath)) {
  fs.mkdirSync(outputPath, { recursive: true });
}

const executecpp = (filePath) => {
  const jobId = path.basename(filePath).split(".")[0];
  const outputFilename = `${jobId}.exe`;
  const outPath = path.join(outputPath, outputFilename);

  return new Promise((resolve, reject) => {
    // Concatenating the commands by using &&, basically 3 different commands are running!!
    exec(
      `g++ ${filePath} -o ${outPath} && cd ${outputPath} && .\\${outputFilename}`,
      (error, stdout, stderr) => {
        if (error) reject(error);
        if (stderr) reject(stderr);
        resolve(stdout);
      }
    );
  });

  // return outPath;
};

module.exports = { executecpp };
