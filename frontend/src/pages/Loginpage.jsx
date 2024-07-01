import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../UserData";
import { ToastContainer, toast } from "react-toastify";
import "../Css/loginpage.css";
import googleLogo from "../Assets/GoogleLogo.png";

const Loginpage = () => {
  const navigate = useNavigate();
  const userdata = useContext(UserContext);
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
      const { success, message, existinguser } = data;

      if (success) {
        handleSuccess(message);
        userdata.setUser(existinguser);

        setTimeout(() => {
          navigate("/");
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
    <div className="loginpage">
      <div className="loginslip">
        <div className="logindescrip">
          <div className="lrname">
            <span className="lrname1">Algo</span>
            <span className="lrname2">Hub</span>
          </div>
          <div className="lrhead">
            <h2>Sign in</h2>
          </div>
        </div>
        <div className="lrcontent">
          <input
            className="lrinputs"
            type="email"
            name="email"
            value={email}
            placeholder="Username or Email Address*"
            onChange={handleOnChange}
          />
          <input
            className="lrinputs topspace"
            type="password"
            name="password"
            value={password}
            placeholder="Password*"
            onChange={handleOnChange}
          />
          <button className="lrbutton">Continue</button>
        </div>
        <div className="lr-seperator">
          <span className="line">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
          <span className="or-text">OR</span>
          <span className="line">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
        </div>
        <div className="other-options">
          <button className="google-signin">
          <img src={googleLogo} alt="Google Logo" className="google-logo" />
              Continue with Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default Loginpage;
