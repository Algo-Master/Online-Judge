const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const dotenv = require("dotenv");
dotenv.config();

const { generateFile } = require("./generateFile");
const { executecpp } = require("./executecpp");

app.get("/", (req, res) => {
  res.end("Hello World!!");
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
