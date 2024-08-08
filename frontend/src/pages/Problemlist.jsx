// ProblemsPage.js
import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
const backendUrl = import.meta.env.VITE_BACKEND_URL;
import "../Css/problemlist.css";
import { UserContext } from "../UserData"; // Adjust the path as needed
import { Xheader } from "../Components/Header";
import { Xfooter } from "../Components/Footer";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CodingProblems = () => {
  const [codingProblems, setCodingProblems] = useState([]);

  function getStatusClass(difficulty) {
    if (difficulty === "Easy") {
      return "status easy";
    } else if (difficulty === "Medium") {
      return "status medium";
    } else {
      return "status hard";
    }
  }

  useEffect(() => {
    const fetchProblems = async () => {
      try {
        const response = await axios.get(`${backendUrl}problemslist`);
        // console.log(response);
        setCodingProblems(response.data);
      } catch (error) {
        console.error("Error fetching problems:", error);
      }
    };

    fetchProblems();
  }, []);

  return (
    <div className="table" id="customers_table">
      <section className="table__header">
        <h1>Problems List</h1>
        <div className="input-group">
          <input type="search" placeholder="Search Data..."></input>
          <img src="images/search.png" alt=""></img>
        </div>
      </section>
      <section className="table__body">
        <table>
          <thead>
            <tr>
              <th>Id</th>
              <th>Title</th>
              <th>Difficulty</th>
              <th>Problem Rating</th>
              <th>Solvers</th>
              <th>Status</th>
              <th>Acceptance</th>
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
                  <p className={getStatusClass(problem.difficulty)}>
                    {problem.difficulty}
                  </p>
                </td>
                <td>
                  <p>
                    <strong>{problem.rating}</strong>
                  </p>
                </td>
                <td>
                  <p>
                    <strong>{problem.solvers}</strong>
                  </p>
                </td>
                <td>
                  <p>
                    <strong>No</strong>
                  </p>
                </td>
                <td>
                  <p>
                    <strong>{problem.acceptance}%</strong>
                  </p>
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

      <div className="body">
        <CodingProblems />
      </div>
      <Xfooter />
    </div>
  );
};

export default Problemlist;
