import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Xheader } from "../Components/Header";
import { Xfooter } from "../Components/Footer";
import "../Css/landingpage.css";

const Landingpage = () => {
  const navigate = useNavigate(); // GET THE NAVIGATION FUNCTION
  const location = useLocation(); // Getting the path for Landing Page for optional render.

  return (
    <div className="container">
    <Xheader />
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
};

export default Landingpage;
