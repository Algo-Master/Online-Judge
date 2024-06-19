import React from "react";
import { useNavigate } from "react-router-dom";

import '../Css/landingpage.css';

function Landingpage() {
    const navigate = useNavigate(); // GET THE NAVIGATION FUNCTION

    // HANDLE NAVIGATION TO SIGNUP PAGE
    const handleSignUp = () => navigate("/register");

    // HANDLE NAVIGATION TO LOGIN PAGE
    const handleLogIn = () => {
        navigate("/login"); // NAVIGATE TO THE LOGIN PAGE
    };

    return (
        <div>
            <div className="header">
                <img src="/Assets/logo.png" alt="Logo" />
            </div>
            <div className="contentHome">
                <h2>Welcome to Algoxhub</h2>
                <p>A friendly place to learn and grow. Get started with a coding challenge, check out our courses, or just hang out and chat.</p>
                <button className="signin btnhome" onClick={handleSignUp}>Sign Up</button>
                <p className="checking">Already have an account?</p>
                <button className="login btnhome" onClick={handleLogIn}>Log In</button>
            </div>
        </div>
    );
}

export default Landingpage;