const express = require("express");
const app = express();
const cors = require("cors");
const { DBConnection } = require("./database/db");
const User = require("./models/User");
const Problem = require("./models/Problem");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const corsOptions = {
  origin: "http://localhost:5173", // Replace with your frontend origin
  credentials: true, // Include cookies if necessary
  // allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  // methods: 'GET, POST, PUT, DELETE, OPTIONS', // Allowed HTTP methods
  // maxAge: 3600, // How long (in seconds) the options preflight request can be cached
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

DBConnection();

app.get("/", (req, res) => {
  res.send("Hello World!!");
});

app.post("/register", async (req, res) => {
  try {
    // Get all the data from the frontend
    const { firstName, lastName, email, password } = req.body;

    // Check all the data exists or not
    if (!(firstName && lastName && email && password)) {
      return res
        .status(400)
        .json({ success: false, message: "Please enter all the credentials" });
    }

    //Add validations to phone number and email if u want

    // Check if user already exists or not
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).send("User already exists with same email");
    }

    // Hash the password or Encrypt the Data
    const hashedpassword = await bcrypt.hash(password, 10);

    // Store the user in Database
    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedpassword,
      solvedProblems,
      admin: false
    });

    // Generate a token for user and send it
    const token = jwt.sign({ id: user._id, email }, process.env.SECRET_KEY, {
      expiresIn: "1h",
    });
    user.token = token;
    user.password = undefined;
    res.status(200).json({
      success: true, // Sole change in the code from class.
      message: "You have successfully registered!",
      user,
    });
  } catch (error) {
    console.log(error);
  }
});

app.post("/login", async (req, res) => {
  try {
    // Get all the data from the frontend
    const { email, password } = req.body;

    // Check all the data exists or not
    if (!(email && password)) {
      return res.status(400).send("Please enter all the details");
    }

    // Check if user already exists or not
    const existinguser = await User.findOne({ email }); // The User document is fetched here
    if (!existinguser) {
      return res.status(400).send("User not registered");
    }

    //Match the user entered password with the hashed password present in the database
    const pass = await bcrypt.compare(password, existinguser.password);
    if (!pass) {
      res.status(400).send("The login credentials doesn't match");
    }

    // Generate a token for user and send it
    const token = jwt.sign({ id: existinguser._id }, process.env.SECRET_KEY, {
      expiresIn: "1h",
    });
    existinguser.token = token;
    existinguser.password = undefined;

    // Store token in Cookies with options
    const options = {
      expires: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
      httpOnly: true, // only manipulated by ur server not by frontend/client
    };

    // Send the data
    res.status(200).cookie("token", token, options).json({
      message: "You have successfully logged in",
      success: true,
      token,
    });
  } catch (error) {
    console.log(error);
    res.send("Login Problem but request recieved");
  }
});

// -----------------------FETCH CURRENT USER DATA -----------------------------------------

app.get("/authenticate", async (req, res) => {
  const token = req.cookies?.token;
  console.log("Request recieved and token is: ", token);
  if (!token) {
    return res.status(401).send("Authentication required!");
  }
  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    const user = await User.findById(decoded.id).select("-password"); // Exclude password
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json({ success: true, user });
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return res
        .status(401)
        .json({ error: "Token expired. Please log in again." });
    }
    console.error("Error fetching user data:", error);
    res.status(500).json({ error: "Error fetching user data" });
  }
});

// ------------------------------------ ADD PROBLEM ------------------------------------

app.post("/problems/add-problem", async (req, res) => {
  try {
      const { title, difficulty, description, acceptanceRate, inputFormat, outputFormat, testCases } = req.body;

      if (!title || !difficulty || !description || !acceptanceRate || !inputFormat || !outputFormat) {
          return res.status(400).send("Please fill all required fields");
      }

      // Get the highest current problem number and increment it for the new problem
      const highestProblem = await Problem.findOne().sort('-number').exec();
      const newProblemNumber = highestProblem ? highestProblem.number + 1 : 1;

      const problem = new Problem({
          number: newProblemNumber,
          title,
          difficulty,
          description,
          inputFormat,
          outputFormat,
          acceptance_rate: acceptanceRate,
          testCases,
      });

      await problem.save();
      res.status(201).json({ message: 'Problem added successfully', problem });
  } catch (error) {
      console.error(error);
      res.status(500).send("Internal Atlas server error");
  }
});

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server is listening on the Port ${port}!!`);
});
