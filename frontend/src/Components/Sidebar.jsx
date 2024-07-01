// src/Components/Sidebar.js
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = () => {
  const [openSections, setOpenSections] = useState({
    section1: false,
    section2: false,
    section3: false,
  });

  const toggleSection = (section) => {
    setOpenSections((prevOpenSections) => ({
      ...prevOpenSections,
      [section]: !prevOpenSections[section],
    }));
  };

  return (
    <div className="sidebar">
      <ul>
        <li onClick={() => toggleSection("section1")}>
          <Link to="algebra">
            {/* Link to sub-path for Algebra */}
            <strong>Algebra</strong>
          </Link>
          <ul className={`sublist ${openSections.section1 ? "open" : ""}`}>
            <li>
              <Link to="algebra/prime_number">Prime Number</Link>
            </li>
            <li>
              <Link to="algebra/linear_congruence_equations">Linear Congruence Equation</Link>
            </li>
          </ul>
        </li>
        <li onClick={() => toggleSection("section2")}>
          <Link to="dynamic_programming">
            {/* Link to sub-path for Dynamic Programming */}
            <strong>Dynamic Programming</strong>
          </Link>
          <ul className={`sublist ${openSections.section2 ? "open" : ""}`}>
            <li>
              <Link to="dynamic_programming/bottom-up-dynamic-programming">Bottom-up Dynamic Programming</Link>
            </li>
            <li>
              <Link to="dynamic_programming/speeding-up-fibonacci-with-dynamic-programming-memoization">Speeding up Fibonacci with Dynamic Programming (Memoization)</Link>
            </li>
          </ul>
        </li>
        <li onClick={() => toggleSection("section3")}>
          <Link to="graphs">
            {/* Link to sub-path for Graphs */}
            <strong>Graphs</strong>
          </Link>
          <ul className={`sublist ${openSections.section3 ? "open" : ""}`}>
            <li>
              <Link to="graphs/bfs">BFS</Link>
            </li>
            <li>
              <Link to="graphs/dfs">DFS</Link>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
