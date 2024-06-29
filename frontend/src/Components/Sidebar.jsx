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
              <a href="#subsection1-1">Subsection 1-1</a>
            </li>
            <li>
              <a href="#subsection1-2">Subsection 1-2</a>
            </li>
          </ul>
        </li>
        <li onClick={() => toggleSection("section2")}>
          <Link to="dynamic-programming">
            {/* Link to sub-path for Dynamic Programming */}
            <strong>Dynamic Programming</strong>
          </Link>
          <ul className={`sublist ${openSections.section2 ? "open" : ""}`}>
            <li>
              <a href="#subsection2-1">Subsection 2-1</a>
            </li>
            <li>
              <a href="#subsection2-2">Subsection 2-2</a>
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
