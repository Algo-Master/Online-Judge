// ProblemsPage.js
import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './ProblemsCSS.css';
import { UserContext } from './UserContext'; // Adjust the path as needed

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CodingProblems = () => {
  const [codingProblems, setCodingProblems] = useState([]);

  useEffect(() => {
    const fetchProblems = async () => {
      try {
        const response = await axios.get('https://api.codequest.me/problemslist');
        setCodingProblems(response.data);
      } catch (error) {
        console.error('Error fetching problems:', error);
      }
    };

    fetchProblems();
  }, []);

  return (
    <div className="list">
      <ToastContainer />
      <table>
        <thead>
          <tr>
            <th>NUMBER</th>
            <th>TITLE</th>
            <th>DIFFICULTY</th>
            <th>SOLVED</th>
            <th>ACCEPTANCE RATE</th>
          </tr>
        </thead>
        <tbody>
          {codingProblems.map((problem, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>
                <div className="prbTitle">
                  <Link to={`/problems/${problem._id}`}>{problem.title}</Link>
                </div>
              </td>
              <td>{problem.difficulty}</td>
              <td>{problem.solved ? 'No' : ''}</td>
              <td>{problem.acceptance_rate}%</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const ProblemsPage = () => {
  const [isMinimized, setIsMinimized] = useState(false);
  const navigate = useNavigate();
  const user = useContext(UserContext); // Get the current user information from context
  // console.log({user});

  const handleDashMainBtnClick = () => {
    setIsMinimized(prevState => !prevState);
  };

  const onClickProfileBtn = () => {
    // console.log('User data from context:', user);
    //     if (user) {
    //         console.log('User ID:', user.user._id);
    //     }
    if (user && user.user._id) { 
      navigate(`/profile/${user.user._id}`); 
    } else {
      console.error('User ID not found');
      toast.error('User ID not found!', {
        position: "top-center",
      });
      setTimeout(() => {
        navigate(`/login`);
      }, 2000); 
    }
  };

  return (
    <div className="split">
      <div className={`dashboard ${isMinimized ? 'minimized' : ''}`}>
        <button className='btnPrb dashMainBtn' onClick={handleDashMainBtnClick}>
          <img src="/Assets/DashboardLogo.png" alt="Logo" />
          <span>{!isMinimized && 'Dashboard'}</span>
        </button>
        <button className='btnPrb'>
          <img src="/Assets/3LineLogo.png" alt="Logo" />
          <span>{!isMinimized && 'Leaderboard'}</span>
        </button>
        <button className='btnPrb'>
          <img src="/Assets/DiscussionLogo.png" alt="Logo" />
          <span>{!isMinimized && 'Discussion'}</span>
        </button>
        <button className='btnPrb'>
          <img src="/Assets/ProgressLogo.png" alt="Logo" />
          <span>{!isMinimized && 'Progress'}</span>
        </button>
        <button className='btnPrb' onClick={onClickProfileBtn}>
          <img src="/Assets/ProfileLogo.png" alt="Logo" />
          <span>{!isMinimized && 'Profile'}</span>
        </button>
        
        {/* Conditional rendering for the Add Problem button */}
        {user && user.user.Admin && (
          <button className='btnPrb' onClick={() => navigate('/problems/add-problem')}>
            <img src="/Assets/addProblem.png" alt="Logo" />
            <span>{!isMinimized && 'Add Problem'}</span>
          </button>
        )}
      </div>

      <div className="prbRightSide">
        <div className="search">
          <h1>Problems</h1>
          <input type="text" className="inpPrb" placeholder="Search Problems" />
        </div>

        <div className="tags">
          <button className='PrbTagsBtn'>All</button>
          <button className='PrbTagsBtn'>Easy</button>
          <button className='PrbTagsBtn'>Medium</button>
          <button className='PrbTagsBtn'>Hard</button>
          <button className='PrbTagsBtn'>Binary Search</button>
          <button className='PrbTagsBtn'>Recursion</button>
          <button className='PrbTagsBtn'>DP</button>
          <button className='PrbTagsBtn'>Back Tracking</button>
          <button className='PrbTagsBtn'>Graph</button>
          <button className='PrbTagsBtn'>Array</button>
          <button className='PrbTagsBtn'>String</button>
          <button className='PrbTagsBtn'>LinkedList</button>
        </div>

        <CodingProblems />
      </div>
    </div>
  );
};

export default ProblemsPage;