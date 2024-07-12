import { Xnav } from "./Navbar";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../UserData";
import features from "../Assets/icons8-three-dots-50.png";
import "./Header.css";

export const Xheader = () => {
  const navigate = useNavigate(); // GET THE NAVIGATION FUNCTION
  const { user, isAuthenticated } = useContext(UserContext);
  // HANDLE NAVIGATION TO SIGNUP PAGE
  const handleSignUp = () => navigate("/register");

  // HANDLE NAVIGATION TO LOGIN PAGE
  const handleLogIn = () => {
    navigate("/login"); // NAVIGATE TO THE LOGIN PAGE
  };

  const isProblemPage = /^\/problems\/[a-zA-Z0-9]+$/.test(location.pathname); // Check if the path matches the problem page pattern

  return (
    <div className="header">
      <div className="nalore">
        <div className="ojname">
          <span className="ojname1">Algo</span>
          <span className="ojname2">Hub</span>
        </div>
        <div className="button-group">
          <button className="button">
            <img className="threedot" src={features} alt="logo" />
          </button>
          {isAuthenticated ? (
            <>
              <button className="profilebutton">{user.firstName.slice(0,1)}</button>
              <button className="button">Sign Out</button>
            </>
          ) : (
            <>
              <button className="button" onClick={handleLogIn}>
                Sign In
              </button>
              <button className="buttonsignup" onClick={handleSignUp}>
                Sign up
              </button>
            </>
          )}
        </div>
      </div>
      {location?.pathname === "/" && (
        <div className="slogan_container">
          <h1>Master Algorithms, Ace Challenges</h1>
          <p className="slogan_descrip">
            AlgoHub: The Ultimate Destination to Unlock the Elegance of
            Algorithms and Excel in Coding Challenges
          </p>
        </div>
      )}
      {!isProblemPage && <Xnav />}
    </div>
  );
};
