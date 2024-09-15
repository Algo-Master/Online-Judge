import { Xnav } from "./Navbar";
import axios from "axios";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../UserData";
import features from "../Assets/icons8-three-dots-50.png";
import { ToastContainer, toast } from "react-toastify";
import "./Header.css";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

export const Xheader = () => {
  const navigate = useNavigate(); // GET THE NAVIGATION FUNCTION
  const { user, setUser, isAuthenticated, setIsAuthenticated } =
    useContext(UserContext);
  // HANDLE NAVIGATION TO SIGNUP PAGE
  const handleSignUp = () => navigate("/register");

  // HANDLE NAVIGATION TO LOGIN PAGE
  const handleLogIn = () => {
    navigate("/login"); // NAVIGATE TO THE LOGIN PAGE
  };

  const handleError = (err) =>
    toast.error(err, {
      position: "top-center",
    });

  const handleSuccess = (msg) =>
    toast.success(msg, {
      position: "top-center",
    });

  const handleLogOut = async () => {
    try {
      const { data } = await axios.post(
        `${backendUrl}logout`,
        {},
        { withCredentials: true }
      );
      const { success, message } = data;

      if (success) {
        handleSuccess(message);
        setUser(null);
        setIsAuthenticated(false);
      } else {
        handleError(message);
      }
    } catch (error) {
      const errorMessage = error.response?.data || "Something went wrong";
      handleError(errorMessage);
    }
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
              <button className="profilebutton">
                {user.picture ? (
                  <img
                    src={user.picture}
                    alt="Profile"
                    className="profile-img"
                  />
                ) : (
                  <div className="first_letter">{user.firstName.slice(0, 1)}</div>
                )}
              </button>
              <button className="button" onClick={handleLogOut}>
                Sign Out
              </button>
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
      <ToastContainer />
    </div>
  );
};
