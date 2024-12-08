import React, { useState, useContext, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../UserData.jsx";
import { useGoogleLogin, GoogleLogin } from "@react-oauth/google";
import { ToastContainer, toast } from "react-toastify";
import "../Css/loginpage.css";
import googleLogo from "../Assets/GoogleLogo.png";
import githubLogo from "../Assets/GitHubLogo.png";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const Loginpage = () => {
  const navigate = useNavigate();
  const { setUser, setIsAuthenticated } =
    useContext(UserContext);
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
        `${backendUrl}login`,
        { ...inputValue },
        { withCredentials: true }
      );
      const { success, message, existinguser } = data;

      if (success) {
        localStorage.setItem("token", data.token); // Save token to localStorage
        handleSuccess(message);
        setUser(existinguser);
        setIsAuthenticated(true);

        setTimeout(() => {
          navigate("/");
        }, 1000);
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

  const handleGoogleSuccess = async (tokenResponse) => {
    try {
      console.log(tokenResponse);
      const { data } = await axios.post(
        `${backendUrl}google-login`,
        {
          access_token: tokenResponse.access_token,
        },
        { withCredentials: true }
      );

      const { success, message, existinguser } = data;

      if (success) {
        handleSuccess(message);
        setUser(existinguser);
        setIsAuthenticated(true);

        setTimeout(() => {
          navigate("/");
        }, 1000);
      } else {
        handleError(message);
      }
    } catch (error) {
      console.error("Google login failed", error);
    }
  };

  const handleGoogleFailure = (response) => {
    console.error("Google login failed", response);
  };

  const googleLogin = useGoogleLogin({
    onSuccess: handleGoogleSuccess,
    onError: handleGoogleFailure,
    // scope: "openid profile email",
    // flow: "implicit",
    // responseType: "id_token"
  });

  // useEffect(() => {
  //   if (user) {
  //     console.log("User state updated:", user);
  //   }
  // }, [user]);

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
          <button className="lrbutton" onClick={(e) => handleSubmit(e)}>
            Continue
          </button>
        </div>
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
          <button className="google-signin" onClick={() => googleLogin()}>
            <img src={googleLogo} alt="Google Logo" className="google-logo" />
            Continue with Google
          </button>
          <button className="google-signin lower-space">
            <img
              src={githubLogo}
              alt="GitHub Logo"
              className="github-logo google-logo"
            />
            Continue with GitHub
          </button>
        </div>
      </div>
      <div className="loginslip upper-space lower-space">
        <div className="logintoreg">
          <p>
            Don't have an account?{" "}
            <Link className="logintoreglink" to="/register">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Loginpage;
