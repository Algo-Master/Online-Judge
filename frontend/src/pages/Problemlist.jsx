// ProblemsPage.js
import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../Css/problemlist.css";
import { UserContext } from "../UserData"; // Adjust the path as needed
import { Xnav } from "../Components/Navbar";
import { Xfooter } from "../Components/Footer";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CodingProblems = () => {
  const [codingProblems, setCodingProblems] = useState([]);

  useEffect(() => {
    const fetchProblems = async () => {
      try {
        const response = await axios.get("http://localhost:5000/problemslist");
        // console.log(response);
        setCodingProblems(response.data);
      } catch (error) {
        console.error("Error fetching problems:", error);
      }
    };

    fetchProblems();
  }, []);

  return (
    <div class="table" id="customers_table">
      <section class="table__header">
        <h1>Problems List</h1>
        <div class="input-group">
          <input type="search" placeholder="Search Data..."></input>
          <img src="images/search.png" alt=""></img>
        </div>
        <div class="export__file">
          {/* <label for="export-file" class="export__file-btn" title="Export File"></label>
                <input type="checkbox" id="export-file"></input>
                <div class="export__file-options">
                    <label>Export As &nbsp; &#10140;</label>
                    <label for="export-file" id="toPDF">PDF <img src="images/pdf.png" alt=""></img></label>
                    <label for="export-file" id="toJSON">JSON <img src="images/json.png" alt=""></img></label>
                    <label for="export-file" id="toCSV">CSV <img src="images/csv.png" alt=""></img></label>
                    <label for="export-file" id="toEXCEL">EXCEL <img src="images/excel.png" alt=""></img></label>
                </div> */}
        </div>
      </section>
      <section class="table__body">
        <table>
          <thead>
            <tr>
              <th>Id</th>
              <th>Title</th>
              <th> Problem Rating</th>
              <th>Solvers</th>
              <th>Status</th>
              <th>Acceptance rate</th>
            </tr>
          </thead>
          <tbody>
            {codingProblems.map((problem, index) => (
              <tr key={index}>
                <td>
                  <strong>{index + 1}</strong>
                </td>
                <td>
                  <div className="prbTitle">
                    <Link to={`/problems/${problem._id}`}>
                      <strong>{problem.title}</strong>
                    </Link>
                  </div>
                </td>
                <td>
                  <strong>{problem.difficulty}</strong>
                </td>
                <td>
                  <p className="status no">
                    <strong>{problem.solved ? "No" : ""}</strong>
                  </p>
                </td>
                <td>
                  <strong>{problem.acceptance_rate}%</strong>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
};

const Problemlist = () => {
  const [isMinimized, setIsMinimized] = useState(false);
  const navigate = useNavigate();
  const { user } = useContext(UserContext); // Get the current user information from context
  // console.log(user);

  // HANDLE NAVIGATION TO SIGNUP PAGE
  const handleSignUp = () => navigate("/register");

  // HANDLE NAVIGATION TO LOGIN PAGE
  const handleLogIn = () => {
    navigate("/login"); // NAVIGATE TO THE LOGIN PAGE
  };

  const handleDashMainBtnClick = () => {
    setIsMinimized((prevState) => !prevState);
  };

  const onClickProfileBtn = () => {
    // console.log('User data from context:', user);
    // if (user) {
    //     console.log('User ID:', user.user._id);
    // }
    if (user && user._id) {
      navigate(`/profile/${user._id}`);
    } else {
      console.error("User ID not found");
      toast.error("User ID not found!", {
        position: "top-center",
      });
      setTimeout(() => {
        navigate(`/login`);
      }, 2000);
    }
  };

  return (
    <div>
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
        <Xnav />
      </div>

      <div className="body">
        <CodingProblems />
      </div>
      <Xfooter />
    </div>
  );
};

export default Problemlist;
