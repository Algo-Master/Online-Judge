import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Xheader } from "../Components/Header.jsx";
import { Xfooter } from "../Components/Footer.jsx";
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
              <p>June 8, 2024: Login and Registering at Backend completed</p>
            </li>
            <li>
              <p>June 17, 2024: OJ compiler Integrated</p>
            </li>
            <li>
              <p>June 26, 2024: CSS modifications are being adjusted</p>
            </li>
            <li>
              <p>Designs are being dealt with</p>
            </li>
            <li>
              <p>July 9, 2024: 404 Not Found and Exp_page implemented</p>
            </li>
          </ul>
        </div>
      </div>
      <Xfooter />
    </div>
  );
};

export default Landingpage;
