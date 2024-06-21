const express = require("express");
const app = express();
const cors = require("cors");
const { DBConnection } = require("./database/db");

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

const Problem = require("./models/Problem")
const dotenv = require("dotenv");
dotenv.config();

const { generateFile } = require("./generateFile");
const { executecpp } = require("./executecpp");

DBConnection();

app.get("/", (req, res) => {
  res.end("Hello World!!");
});

app.get("/problems/:problemId", async (req, res) => {
  // console.log("request has reached to compiler server");
  const { problemId } = req.params;
  try {
      const problem = await Problem.findById(problemId);
      if (!problem) {
          return res.status(404).json({ error: 'Problem not found' });
      }
      res.json({ problem });
  } catch (error) {
      console.error('Error fetching problem data:', error);
      res.status(500).json({ error: 'Error fetching problem data' });
  }
});

app.post("/run", async (req, res) => {
  const { language = "cpp", code } = req.body;
  if (code === undefined) {
    res
      .status(400)
      .json({ success: false, error: "Empty code body provided!" });
  }
  try {
    const filePath = generateFile(language, code);
    const output = await executecpp(filePath);
    res.json({ filePath, output });
  } catch (error) {
    console.log("Error generating and executing file");
  }
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server listening on Port: ${PORT}`);
});
