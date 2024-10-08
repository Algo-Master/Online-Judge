import "../Css/Profilepage.css";
import React from "react";

// A mock profile data, replace this with real data from your backend or API
const userProfile = {
  username: "Undead_King",
  rank: "Expert",
  rating: 1813,
  maxRating: 1912,
  contribution: 100,
  country: "India",
  organization: "AlgoHub",
  friends: 150,
  contestsParticipated: 35,
  solvedProblems: 400,
  avatarUrl:
    "https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png", // Sample avatar URL
};

const Profilepage = () => {
  return (
    <div className="profile-container">
      {/* Profile Header */}
      <div className="profile-header">
        <div className="profile-avatar">
          <img src={userProfile.avatarUrl} alt="avatar" />
        </div>
        <div className="profile-info">
          <h2 className="profile-username">{userProfile.username}</h2>
          <p className="profile-rank">
            <strong>Rank:</strong> {userProfile.rank}
          </p>
          <p className="profile-rating">
            <strong>Current Rating:</strong> {userProfile.rating}
          </p>
          <p className="profile-max-rating">
            <strong>Max Rating:</strong> {userProfile.maxRating}
          </p>
          <p className="profile-contribution">
            <strong>Contribution:</strong> {userProfile.contribution}
          </p>
        </div>
      </div>

      {/* Profile Details */}
      <div className="profile-details">
        <div className="profile-item">
          <strong>Country:</strong> {userProfile.country}
        </div>
        <div className="profile-item">
          <strong>Organization:</strong> {userProfile.organization}
        </div>
        <div className="profile-item">
          <strong>Friends:</strong> {userProfile.friends}
        </div>
        <div className="profile-item">
          <strong>Contests Participated:</strong>{" "}
          {userProfile.contestsParticipated}
        </div>
        <div className="profile-item">
          <strong>Solved Problems:</strong> {userProfile.solvedProblems}
        </div>
      </div>

      {/* Contests and Problem Section */}
      <div className="profile-activity">
        <h3>Recent Contests</h3>
        {/* Add contests or solved problems data here */}
        <p>Placeholder for contests data...</p>
      </div>
    </div>
  );
};

export default Profilepage;
