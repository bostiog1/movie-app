import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

const InterviewChatGPT = () => {
  const [counter, setCounter] = useState(1);
  const [users, setUsers] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (counter > 1) {
      fetchUsers(counter);
    }
  }, [counter]);

  const fetchUsers = async (size) => {
    try {
      const response = await axios.get(
        `https://random-data-api.com/api/v2/users?size=${size}`
      );
      // console.log('users ', users);
      // console.log('response ', response.data);
      const data = Array.isArray(response.data)
        ? response.data
        : [response.data];

      setUsers(data);
    } catch (error) {
      setError(error);
      if (error.response && error.response.status === 429) {
        console.error("Rate limit exceeded. Retrying after delay...");
        setTimeout(() => {
          fetchUsers(size);
        }, 3000); // Retry after 3 seconds
      } else {
        console.error("Error fetching users:", error);
      }
    } finally {
      setIsFetching(false);
    }
  };

  return (
    <div className="App">
      <h1>User Data Fetcher</h1>
      <button onClick={() => setCounter(counter + 1)} disabled={isFetching}>
        {isFetching ? 'Fetching...' : '+'}
      </button>
      {error && <p className="error">Error: {error.message}</p>}
      <div className="user-list">
        {users.map((user) => (
          <div key={user.id} className="user-card">
            <p>First Name: {user.first_name}</p>
            <p>Last Name: {user.last_name}</p>
            <p>Gender: {user.gender}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InterviewChatGPT;
