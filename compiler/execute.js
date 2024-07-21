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
          const normalizedOutput = stdout.replace(/\r\n/g, "\n").trim();
          resolve(normalizedOutput);
        }
      }
    );
  });
};

// executejava.js
const executejava = (filePath, inputFilePath) => {
  const jobId = path.basename(filePath).split(".")[0];

  return new Promise((resolve, reject) => {
    exec(
      `javac ${filePath} -d ${outputPath} && cd ${outputPath}`,
      (error, stdout, stderr) => {
        if (error) reject(error);
        else if (stderr) reject(stderr);
        else {
          const className = getClassName(filePath);
          // Rename the compiled .class file to the UUID
          const originalClassFile = path.join(outputPath, `${className}.class`);
          const renamedClassFile = path.join(outputPath, `${jobId}.class`);
          console.log(className);
          fs.renameSync(originalClassFile, renamedClassFile);
          console.log(`java ${jobId} < ${inputFilePath}`);

          exec(`java ${jobId} < ${inputFilePath}`, (execError, execStdout, execStderr) => {
            if (execError) return reject(execError);
            if (execStderr) return reject(execStderr);
            else {
              console.log(command);
              const normalizedOutput = execStdout.replace(/\r\n/g, "\n").trim();
              console.log(normalizedOutput);
              resolve(normalizedOutput);
            }
          });
        }
      }
    );
  });
};

function getClassName(filePath) {
  try {
    // Read the file content synchronously
    const data = fs.readFileSync(filePath, "utf8");

    // Regular expression to match class name
    const classRegex = /\bclass\s+(\w+)/;
    const match = data.match(classRegex);

    if (match && match[1]) {
      console.log("Class name:", match[1]);
      return match[1];
    } else {
      console.log("No class name found");
      return null;
    }
  } catch (err) {
    console.error("Error reading the file:", err);
    return null;
  }
}

// executePy.js
const executePy = (filePath, inputFilePath) => {
  console.log(`python ${filePath} < ${inputFilePath}`);
  
  return new Promise((resolve, reject) => {
    exec(`python ${filePath} < ${inputFilePath}`, (error, stdout, stderr) => {
      if (error) reject(error);
      else if (stderr) reject(stderr);
      else {
        const normalizedOutput = stdout.replace(/\r\n/g, "\n").trim();
        resolve(normalizedOutput);
      }
    });
  });
};

module.exports = { executecpp, executejava, executePy };
