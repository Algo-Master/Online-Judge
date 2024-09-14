const express = require("express");
const app = express();
const cors = require("cors");
const { DBConnection } = require("./database/db");
const User = require("./models/User");
const Problem = require("./models/Problem");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { authenticate, authorize } = require("./auth");
const cookieParser = require("cookie-parser");
const { OAuth2Client } = require("google-auth-library");

const corsOptions = {
  origin: "https://algohub7.vercel.app", // Replace with your frontend origin
  credentials: true, // Include cookies if necessary
  // allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  // methods: 'GET, POST, PUT, DELETE, OPTIONS', // Allowed HTTP methods
  // maxAge: 3600, // How long (in seconds) the options preflight request can be cached
};

app.use(cookieParser());
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

DBConnection();

app.get("/", (req, res) => {
  res.send("Hi folks, this is the AlgoHub Backend Server!! Hope u enjoy our platform and learn interesting Algorithms");
});

app.post("/register", async (req, res) => {
  try {
    // Get all the data from the frontend
    const { firstName, lastName, email, password } = req.body;

    // Check all the data exists or not
    if (!(firstName && lastName && email && password)) {
      return res.status(400).send("Please enter all the credentials");
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
    await User.create({
      firstName,
      lastName,
      email,
      password: hashedpassword,
      role: "user",
    });

    // Generate a token for user and send it if required
    // const token = jwt.sign({ id: user._id, email }, process.env.SECRET_KEY, {
    //   expiresIn: "1h",
    // });
    // user.token = token;
    // user.password = undefined;
    res.status(200).json({
      success: true, // Sole change in the code from class.
      message: "You have successfully registered!",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal server error");
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
    const token = jwt.sign(
      { id: existinguser._id, role: existinguser.role },
      process.env.SECRET_KEY,
      {
        algorithm: "HS256",
        expiresIn: "1h",
      }
    );
    // existinguser.token = token;
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
      existinguser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal server error");
  }
});

// ----------------------- GOOGLE LOGIN -----------------------------------------

app.post("/google-login", async (req, res) => {
  const { access_token } = req.body;

  try {
    const response = await fetch(
      "https://www.googleapis.com/oauth2/v3/userinfo",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Error fetching user info: ${response.status}`);
    }

    const data = await response.json();
    console.log(data);

    let existinguser = await User.findOne({ email: data.email });

    if (!existinguser) {

      existinguser = await User.create({
        firstName: data.given_name,
        lastName: data.family_name || "",
        email: data.email,
        password: "null", // Google authenticated users don't need a password
        role: "user",
      });
    }

    // Generate a token for user and send it
    const token = jwt.sign(
      { id: existinguser._id, role: existinguser.role },
      process.env.SECRET_KEY,
      {
        algorithm: "HS256",
        expiresIn: "1h",
      }
    );

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
      existinguser,
    });
  } catch (error) {
    console.error(error);
    res.status(401).json({ error: "Invalid Google token" });
  }
});

// ----------------------- LOGOUT -----------------------------------------

app.post("/logout", (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ success: true, message: "Successfully logged out" });
});

// ----------------------- FETCH CURRENT USER DATA -----------------------------------------

app.get("/authenticate", async (req, res) => {
  const token = req.cookies?.token;
  // console.log(token);
  if (!token) {
    return res.status(401).send("Authentication required!");
  }
  const verified = authenticate(token);
  switch (verified) {
    case 0:
      return res.status(400).send("Token has been tampered with");
      break;
    case 2:
      return res.status(401).send("Token expired. Please log in again.");
      break;
    // ... more cases
    default:
      const decrypted = jwt.verify(token, process.env.SECRET_KEY);
      const user = await User.findById(decrypted.id).select("-password"); // Exclude password
      res.status(200).json({ success: true, user });
  }
});

// -------------------------------- FETCHING PROBLEM DATA -------------------------------

app.get("/problems/:problemId", async (req, res) => {
  const { problemId } = req.params;
  try {
    const problem = await Problem.findById(problemId);
    if (!problem) {
      return res.status(400).send("Problem not found");
    }
    problem.testcases = undefined;
    res.status(200).json({ success: true, problem });
  } catch (error) {
    console.error("Error fetching problem data:", error);
    res.status(500).send("Error fetching problem data");
  }
});

// ------------------------------------ ADD PROBLEM ------------------------------------

app.post("/problems/add-problem", async (req, res) => {
  console.log("Add Problem Request recieved");
  const token = req.cookies?.token;
  // console.log(token);
  if (!token) {
    return res.status(401).send("Authentication required!");
  }
  const verified = authorize(token, "problem_setter");
  switch (verified) {
    case 0:
      console.log("User is not a problem_setter");
      return res
        .status(400)
        .send(
          "You are Unauthorized to add problems or else Token has been tampered with"
        );
      break;
    case 2:
      return res.status(401).send("Token expired. Please log in again.");
      break;
    default:
      console.log("User is authorized");
  }

  try {
    const {
      title,
      timel,
      meml,
      rating,
      difficulty,
      statement,
      inputcriteria,
      outputcriteria,
      examples,
      testcases,
      notes,
      solvers,
      acceptance,
    } = req.body;

    if (
      !title ||
      !timel ||
      !meml ||
      !rating ||
      !difficulty ||
      !statement ||
      !inputcriteria ||
      !outputcriteria ||
      !examples ||
      !testcases
    ) {
      console.log(req.body);
      return res.status(400).send("Please fill all required fields");
    }

    // Get the highest current problem number and increment it for the new problem
    const highestProblem = await Problem.findOne().sort("-number").exec();
    const newProblemNumber = highestProblem ? highestProblem.number + 1 : 1;

    const problem = new Problem({
      number: newProblemNumber,
      title,
      timel,
      meml,
      rating,
      difficulty,
      statement,
      inputcriteria,
      outputcriteria,
      examples,
      testcases,
      notes,
      solvers,
      acceptance,
    });

    await problem.save();
    res
      .status(201)
      .json({ success: true, message: "Problem added successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Atlas server error");
  }
});

// ------------------------------------ FETCH PROBLEMS ------------------------------------

app.get("/problemslist", async (req, res) => {
  try {
    const problems = await Problem.find({});
    res.status(200).json(problems);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
});

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server is listening on the Port ${port}!!`);
});
