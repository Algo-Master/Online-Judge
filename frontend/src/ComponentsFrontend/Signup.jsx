import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// // import "./compcss/signup.css";
// // import rocket from "../assets/rocket.png"

const host = import.meta.env.VITE_BACKEND_URL;

const Signup = () => {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState({
    email: "",
    password: "",
    firstname: "",
    lastname: "",
  });
  const { email, password, firstname, lastname } = inputValue;

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };

  const handleError = (err) =>
    toast.error(err, {
      position: "bottom-left",
    });

  const handleSuccess = (msg) =>
    toast.success(msg, {
      position: "bottom-right",
    });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("post request sent");
      const { data } = await axios.post(`${host}/register`, {
        ...inputValue,
      });
      console.log("data recieved: ", data);
      const { success, message } = data;
      if (success) {
        localStorage.setItem("token", data.token);
        handleSuccess(message);
        console.log("Navigating to /home...");
        setTimeout(() => {
          navigate("/home");
        }, 1000);
      } else {
        handleError(message);
      }
    } catch (error) {
      console.log(error);
    }
    setInputValue({
      ...inputValue,
      email: "",
      password: "",
      firstname: "",
      lastname: "",
    });
  };

  return (
    <div className="signupfull">
      <h1>Online Judge</h1>
      <div className="form_container">
        <h2>Signup Account</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label className="email" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={email}
              placeholder="Enter your email"
              onChange={handleOnChange}
            />
          </div>
          <div>
            <label className="firstname" htmlFor="firstname">
              First Name
            </label>
            <input
              type="text"
              name="firstname"
              value={firstname}
              placeholder="Enter your first name"
              onChange={handleOnChange}
            />
          </div>
          <div>
            <label className="lastname" htmlFor="lastname">
              Last Name
            </label>
            <input
              type="text"
              name="lastname"
              value={lastname}
              placeholder="Enter your last name"
              onChange={handleOnChange}
            />
          </div>
          <div>
            <label className="email" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={password}
              placeholder="Enter your password"
              onChange={handleOnChange}
            />
          </div>
          <button className="sub" type="submit">
            Submit
          </button>
          <span>
            Already have an account? <Link to={"/"}>Login</Link>
          </span>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
};

export default Signup;
