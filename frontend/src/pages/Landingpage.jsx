import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Xnav } from "../Components/Navbar";
import { Xfooter } from "../Components/Footer";
import "../Css/landingpage.css";

function Landingpage() {
  const navigate = useNavigate(); // GET THE NAVIGATION FUNCTION
  const location = useLocation(); // Getting the path for Landing Page for optional render.

  // HANDLE NAVIGATION TO SIGNUP PAGE
  const handleSignUp = () => navigate("/register");

  // HANDLE NAVIGATION TO LOGIN PAGE
  const handleLogIn = () => {
    navigate("/login"); // NAVIGATE TO THE LOGIN PAGE
  };

  return (
    <div className="container">
      <div className="header">
        <div className="nalore">
          <div className="ojname">
            <span className="ojname1">Algo</span>
            <span className="ojname2">Hub</span>
          </div>
          <div className="button-group">
            <button className="button">Button 1</button>
            <button className="button" onClick={handleLogIn}>
              Sign In
            </button>
            <button className="buttonsignup" onClick={handleSignUp}>
              Sign up
            </button>
          </div>
        </div>
        {location.pathname === "/" && (
          <div className="slogan_container">
            <h1>Master Algorithms, Ace Challenges</h1>
            <p className="slogan_descrip">AlgoHub: The Ultimate Destination to Unlock the Elegance of Algorithms and Excel in Coding Challenges</p>
          </div>
        )}
        <Xnav />
      </div>
      <div className="body">
        <div className="changelog">
          <h2>Changelog</h2>
          <ul>
            <li>
              <p>June 26, 2024: CSS modifications are being adjusted</p>
            </li>
          </ul>
        </div>
      </div>
      <Xfooter />
    </div>
  );
}

export default Landingpage;
