const express = require("express");
const app = express();
const cors = require("cors");
const { DBConnection } = require("./database/db");
const User = require("./models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

DBConnection();

app.get("/", (req, res) => {
  res.send("Hello World!!");
});

app.post("/register", async (req, res) => {
  try {
    // Get all the data from the frontend
    const { firstname, lastname, email, password } = req.body;

    // Check all the data exists or not
    if (!(firstname && lastname && email && password)) {
      return res.status(400).send("Please enter all the details");
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
      firstname,
      lastname,
      email,
      password: hashedpassword,
    });

    // Generate a token for user and send it
    const token = jwt.sign({ id: user._id, email }, process.env.SECRET_KEY, {
      expiresIn: "1h",
    });
    user.token = token;
    user.password = undefined;
    res
      .status(200)
      .json({ success: true, message: "You have successfully registered!", user });
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
  }
});

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server is listening on the Port ${port}!!`);
});
