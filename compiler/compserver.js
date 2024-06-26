const express = require("express");
const app = express();
const { DBConnection } = require("./database/db");
const Problem = require("./models/Problem");
const { generateInputFile } = require("./generateInputFile");
const cors = require("cors");

const corsOptions = {
  origin: "http://localhost:5173", // Replace with your frontend origin
  // credentials: true, // Include cookies if necessary
  // allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  // methods: 'GET, POST, PUT, DELETE, OPTIONS', // Allowed HTTP methods
  // maxAge: 3600, // How long (in seconds) the options preflight request can be cached
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

DBConnection();

const dotenv = require("dotenv");
dotenv.config();

const { generateFile } = require("./generateFile");
const { executecpp } = require("./executecpp");

app.get("/", (req, res) => {
  res.end("Hello World!!");
});

app.post("/run", async (req, res) => {
  const { language = "cpp", code, manualTestCase: input } = req.body;
  if (!code) {
    return res.status(401).json({ success: false, error: "Code not found" }); // success-> use in production grade
  }
  if (!input) {
    return res.status(401).json({ success: false, error: "Input not found" }); // success-> use in production grade
  }
  try {
    // Create a file using {lang, code}
    const filePath = await generateFile(language, code);
    //Create a file for CustomInput
    const inputFilePath = await generateInputFile(input);
    const output =
      language === "cpp"
        ? await executecpp(filePath, inputFilePath)
        : "Sorry we are only accepting C++ solution only for now";
    res.status(200).json({ success: true, filePath, output });
  } catch (error) {
    console.log("Error generating and executing file");
    res
      .status(500)
      .json({ success: false, message: "Error generating and executing file" });
  }
});

app.post("/submit", async (req, res) => {
  const { lang = "cpp", code, problemId } = req.body;
  // console.log("Ya we are recieving ur request with lang: ", lang, " code: ", code, " problemId: ", problemId);

  if (!code) {
    console.log("Code not present");
    return res.status(401).json({ success: false, error: "Code not found" }); // success-> use in production grade
  }

  try {
    // Fetch problem and its test cases
    const problem = await Problem.findById(problemId);
    if (!problem) {
      return res
        .status(404)
        .json({ success: false, error: "Problem not found" });
    }

    // Generate code file
    const filePath = await generateFile(lang, code);

    // Iterate through each test case
    for (const testCase of problem.testCases) {
      // Generate input file for each test case
      const inputFilePath = await generateInputFile(testCase.inputValue);

      try {
        const output =
        lang === "cpp"
        ? await executecpp(filePath, inputFilePath)
        : "Sorry we are only accepting C++ solution only for now";
        // Add similar blocks for other languages as needed
        // console.log("Code Execution is done");

        // Trim any extra whitespace from the output and expected output
        const cleanedOutput = output.trim();
        const expectedOutput = testCase.output.trim();

        if (cleanedOutput !== expectedOutput) {
          return res.json({
            success: false,
            verdict: "Wrong Answer",
            failedTestCase: testCase.input,
          });
        }
      } catch (error) {
        return res.json({
          success: false,
          error: error.message,
          verdict: error.message,
          failedTestCase: testCase.input,
        });
      }
    }

    return res.json({
      success: true,
      verdict: "Accepted",
      output: "Accepted",
    });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server listening on Port: ${PORT}`);
});
