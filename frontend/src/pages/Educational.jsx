// ProblemsPage.js
import React, { useState, useEffect, useContext } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import axios from "axios";
import Sidebar from "../Components/Sidebar.jsx";
import "../Css/educational.css";
import { UserContext } from "../UserData.jsx"; // Adjust the path as needed
import { Xheader } from "../Components/Header.jsx";
import { Xfooter } from "../Components/Footer.jsx";

import Algebra from "./Algebra_Contents/Algebra.jsx";
import Prime_Number from "./Algebra_Contents/Prime_Number.jsx";
import Linear_Congruence_Equation from "./Algebra_Contents/Linear_Congruence_Equation.jsx";

import Dynamic_Programming from "./Dynamic_Programming_Contents/Dynamic_Programming.jsx";
import Bottom_Up_Dynamic_Programming from "./Dynamic_Programming_Contents/Bottom_Up_Dynamic_Programming.jsx";
import Speeding_up_Fibonacci_with_Dynamic_Programming_Memoization from "./Dynamic_Programming_Contents/Speeding_up_Fibonacci_with_Dynamic_Programming_Memoization.jsx";

import Graph from "./Graph_Contents/Graph.jsx";
import BFS from "./Graph_Contents/BFS.jsx";
import DFS from "./Graph_Contents/DFS.jsx";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Educational = () => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext); // Get the current user information from context
  // console.log(user);

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
      <Xheader />
      <div className="edubody">
        <Sidebar />
        <div className="content">
          <Routes>
            {/* Using Routes for nested paths */}
            <Route path="algebra" element={<Algebra />} />{" "}
            {/* Default content */}
            <Route path="algebra/prime_number" element={<Prime_Number />} />
            <Route
              path="algebra/linear_congruence_equations"
              element={<Linear_Congruence_Equation />}
            />
            <Route
              path="dynamic_programming"
              element={<Dynamic_Programming />}
            />{" "}
            {/*Default content */}
            <Route
              path="dynamic_programming/bottom-up-dynamic-programming"
              element={<Bottom_Up_Dynamic_Programming />}
            />
            <Route
              path="dynamic_programming/speeding-up-fibonacci-with-dynamic-programming-memoization"
              element={
                <Speeding_up_Fibonacci_with_Dynamic_Programming_Memoization />
              }
            />
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
