// ProblemsPage.js
import React, { useState, useEffect, useContext } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import axios from "axios";
import Sidebar from "../Components/Sidebar";
import "../Css/educational.css";
import { UserContext } from "../UserData"; // Adjust the path as needed
import { Xnav } from "../Components/Navbar";
import { Xfooter } from "../Components/Footer";

import Algebra from "./Algebra_Contents/Algebra";
import Prime_Number from "./Algebra_Contents/Prime_Number";
import Linear_Congruence_Equation from "./Algebra_Contents/Linear_Congruence_Equation";

import Dynamic_Programming from "./Dynamic_Programming_Contents/Dynamic_Programming";
import Bottom_Up_Dynamic_Programming from "./Dynamic_Programming_Contents/Bottom_Up_Dynamic_Programming";
import Speeding_up_Fibonacci_with_Dynamic_Programming_Memoization from "./Dynamic_Programming_Contents/Speeding_up_Fibonacci_with_Dynamic_Programming_Memoization";

import Graph from "./Graph_Contents/Graph";
import BFS from "./Graph_Contents/BFS"
import DFS from "./Graph_Contents/DFS"

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Educational = () => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext); // Get the current user information from context
  // console.log(user);

  // HANDLE NAVIGATION TO SIGNUP PAGE
  const handleSignUp = () => navigate("/register");

  // HANDLE NAVIGATION TO LOGIN PAGE
  const handleLogIn = () => {
    navigate("/login"); // NAVIGATE TO THE LOGIN PAGE
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
      <div className="edubody">
        <Sidebar />
        <div className="content">
          <Routes>
            {/* Using Routes for nested paths */}
            <Route path="algebra" element={<Algebra />} /> {/* Default content */}
            <Route path="algebra/prime_number" element={<Prime_Number />} />
            <Route path="algebra/linear_congruence_equations" element={<Linear_Congruence_Equation />} />
            <Route path="dynamic_programming" element={<Dynamic_Programming />} /> {/*Default content */}
            <Route path="dynamic_programming/bottom-up-dynamic-programming" element={<Bottom_Up_Dynamic_Programming />} />
            <Route path="dynamic_programming/speeding-up-fibonacci-with-dynamic-programming-memoization" element={<Speeding_up_Fibonacci_with_Dynamic_Programming_Memoization />} />
            <Route path="graphs" element={<Graph />} /> {/* Default content */}
            <Route path="graphs/bfs" element={<BFS />} />
            <Route path="graphs/dfs" element={<DFS />} />
            {/* <Route path=":subPath" element={<ContentArea />} />{" "} */}
            {/* Dynamic content */}
          </Routes>
        </div>
      </div>
      <Xfooter />
    </div>
  );
};

export default Educational;
