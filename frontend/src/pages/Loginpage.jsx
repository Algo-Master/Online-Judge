import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "../Css/loginpage.css";
import googleLogo from "../Assets/GoogleLogo.png";

const Loginpage = () => {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState({
    email: "",
    password: "",
  });

  const { email, password } = inputValue;

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
        `http://localhost:5000/login`,
        { ...inputValue },
        { withCredentials: true }
      );
      const { success, message } = data;

      if (success) {
        handleSuccess(message);
        setTimeout(() => {
          navigate("/problemslist");
        }, 2000);
      } else {
        handleError(message);
      }
    } catch (error) {
      const errorMessage = error.response?.data || "Something went wrong";
      handleError(errorMessage);
    }
    setInputValue({
      email: "",
      password: "",
    });
  };

  return (
    <div className="LoginPage">
      <div className="header">
        <img src="/Assets/logo.png" alt="Logo" />
      </div>
      <div className="content">
        <h2>Log In</h2>
        <form onSubmit={handleSubmit}>
          <div className="boxes">
            <h5 className="top">Email</h5>
            <input
              type="email"
              name="email"
              value={email}
              placeholder="Enter your email"
              onChange={handleOnChange}
            />
            <h5>Password</h5>
            <input
              type="password"
              name="password"
              value={password}
              placeholder="Enter your password"
              onChange={handleOnChange}
            />
            <button className="loginPg" type="submit">
              Log In
            </button>
            <p className="checking">or</p>
            <button className="google">
              <img src={googleLogo} alt="Google Logo" className="google-logo" />
              Continue with Google
            </button>
          </div>
        </form>
        <p className="last">Don't have an account?</p>
        <Link to="/register" className="last">
          Sign up
        </Link>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Loginpage;
