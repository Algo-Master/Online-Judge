import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../Css/registrationpage.css";
import googleLogo from "../Assets/GoogleLogo.png";
import eyeopen from "../Assets/eye.png";
import eyeclosed from "../Assets/eyeclosed.png";

function Registrationpage() {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false); // State to track password visibility

  const { firstName, lastName, email, password } = inputValue;

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };

  const handleError = (err) =>
    toast.error(err, {
      position: "top-center",
    });

  const handleSuccess = (msg) =>
    toast.success(msg, {
      position: "top-center",
    });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:5000/register",
        { ...inputValue },
        { withCredentials: true }
      );

      const { success, message } = data;

      if (success) {
        handleSuccess(message);
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } else {
        handleError(message);
      }
    } catch (error) {
      const errorMessage = error.response.data;
      handleError(errorMessage);
    }
    setInputValue({
      ...inputValue,
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    });
  };

  return (
    <div className="registrationpage">
      <div className="regisdescrip">
        <div className="lrname">
          <span className="lrname1">Algo</span>
          <span className="lrname2">Hub</span>
        </div>
        <div className="lrhead">
          <h2>Create your account</h2>
        </div>
      </div>
      <input
        className="reginput write_small"
        type="email"
        name="email"
        value={email}
        placeholder="Enter your email"
        onChange={handleOnChange}
      />
      <p className="suggest">
        We suggest signing up with your coding-related email address.
      </p>
      <input
        className="reginput write_small"
        type="text"
        name="firstName"
        value={firstName}
        placeholder="Enter your first name"
        onChange={handleOnChange}
      />
      <input
        className="reginput topspace write_small"
        type="text"
        name="lastName"
        value={lastName}
        placeholder="Enter your last name"
        onChange={handleOnChange}
      />
      <div className="password-wrapper topspace">
        <input
          className="passinput write_small"
          type={showPassword ? "text" : "password"} // Toggle input type based on showPassword state
          name="password"
          value={password}
          placeholder="Enter your password"
          onChange={handleOnChange}
        />
        <span
          className="password-toggle-icon"
          onClick={() => setShowPassword(!showPassword)} // Toggle showPassword state
        >
          {showPassword ? <img className="visibilitytoggle" src={eyeclosed} /> : <img className="visibilitytoggle" src={eyeopen} />}
        </span>
      </div>
      <button className="lrbutton write_small topspace" onClick={(e) => handleSubmit(e)}>
        Sign up
      </button>
      <div className="lr-seperator">
        <span className="line">
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        </span>
        <span className="or-text">OR</span>
        <span className="line">
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        </span>
      </div>
      <div className="other-options">
        <button className="google-signin write_small">
          <img src={googleLogo} alt="Google Logo" className="google-logo" />
          Continue with Google
        </button>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Registrationpage;