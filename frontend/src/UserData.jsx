// UserContext.js
import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

// Create the UserContext which is a central storage for a specific type of data in your React application
const UserContext = createContext();

// UserProvider component that will wrap around parts of your app that need access to the user data
const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        // Making a GET request to fetch the authenticated user
        const response = await axios.get(`http://localhost:5000/authenticate`, {
          withCredentials: true, // Ensure credentials (cookies) are included
        });
        console.log("User data fetched:", response.data); // Log the response data for debugging
        setIsAuthenticated(true);
        setUser(response.data.user); // Update the user state with fetched user data
      } catch (error) {
        console.error(
          "Error fetching user:",
          error.response ? error.response.data : error.message
        );
        // You can add additional error handling here (e.g., setting user to null, showing an error message)
      }
    };

    // Fetch the user data when the component mounts
    fetchUser();
  }, []); // Empty dependency array means this effect runs once on mount

  // Provide the user data and a way to update it (setUser) to any components that need it
  return (
    <UserContext.Provider
      value={{ user, setUser, isAuthenticated, setIsAuthenticated }}
    >
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
