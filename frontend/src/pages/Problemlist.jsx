// ProblemsPage.js
import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
const backendUrl = import.meta.env.VITE_BACKEND_URL;
import "../Css/problemlist.css";
import { UserContext } from "../UserData"; // Adjust the path as needed
import { Xheader } from "../Components/Header";
import { Xfooter } from "../Components/Footer";

import left_arrow from "../Assets/left-arrow.png";
import right_arrow from "../Assets/right-arrow.png";
import double_left_arrow from "../Assets/double-left-arrow.png";
import double_right_arrow from "../Assets/double-right-arrow.png";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CodingProblems = () => {
  const [codingProblems, setCodingProblems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(1);

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

  const indexOfLastProblem = currentPage * rowsPerPage;
  const indexOfFirstProblem = indexOfLastProblem - rowsPerPage;
  const currentProblems = codingProblems.slice(
    indexOfFirstProblem,
    indexOfLastProblem
  );

  const totalPages = Math.ceil(codingProblems.length / rowsPerPage);

  const handleStartPage = () => {
    if (currentPage > 1) {
      setCurrentPage(1);
    }
  }

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleLastPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(totalPages);
    }
  }

  return (
    <div>
      <p className="table-title">Problem Queue</p>
      <div className="table-container">
        <table className="admob-table">
          <thead>
            <tr>
              <th>Id</th>
              <th>Title</th>
              <th>Difficulty</th>
              <th>Rating</th>
              <th>Solvers</th>
              <th>Status</th>
              <th>Acceptance</th>
              <th>Author</th>
            </tr>
          </thead>
          <tbody>
            {currentProblems.map((problem, index) => (
              <tr key={index}>
                <td>{indexOfFirstProblem + index + 1}</td>
                <td>
                  <div>
                    <Link
                      to={`/problems/${problem._id}`}
                      className="problemLink"
                    >
                      <strong>{problem.title}</strong>
                    </Link>
                  </div>
                </td>
                <td className={getStatusClass(problem.difficulty)}>
                  {problem.difficulty}
                </td>
                <td>{problem.rating}</td>
                <td>{problem.solvers}</td>
                <td>No</td>
                <td>{problem.acceptance}%</td>
                <td>rimo07</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="pagination">
          <button
            onClick={handleStartPage}
            disabled={currentPage === 1}
          >
            <img className="lftrgtsize" src={double_left_arrow} />
          </button>
          <button onClick={handlePrevPage} disabled={currentPage === 1}>
            <img className="lftrgtsize" src={left_arrow} />
          </button>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
          >
            <img className="lftrgtsize" src={right_arrow} />
          </button>
          <button
            onClick={handleLastPage}
            disabled={currentPage === totalPages}
          >
            <img className="lftrgtsize" src={double_right_arrow} />
          </button>
        </div>
      </div>
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
