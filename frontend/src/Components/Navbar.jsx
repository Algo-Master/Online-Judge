import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css"

export const Xnav = () => {
  return (
    <nav className="navbar">
      <Link to="/" className="navlinks">Home</Link>
      <Link to="/problemslist" className="navlinks">Problemset</Link>
      <Link to="/nopage" className="navlinks">Ratings</Link>
      <Link to="/nopage" className="navlinks">EDU</Link>
      <Link to="/nopage" className="navlinks">Discuss</Link>
      <Link to="/nopage" className="navlinks">Contests</Link>
      <Link to="/problems/add-problem" className="navlinks">Problem++</Link>
      <Link to="/nopage" className="navlinks">GYM</Link>
    </nav>
  );
};
