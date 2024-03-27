import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocalStorage } from "./hooks/useLocalStorage";

const Logout = () => {
  const navigate = useNavigate();
  const [itemName, setItemName] = useState('');
  const [user, setUser] = useLocalStorage("user", null);

  const handleLogout = async () => {
    try {
      const response = await fetch('http://localhost:5005/logout', {
        method: 'GET',
        credentials: 'include', // Include cookies in the request
      });
      if (response.ok) {
        // Redirect to login page after logout
        navigate('/login');
      } else {
        console.error('Logout failed');
      }
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const handleCreateNewBuild = async () => {
    try {
        console.log(user.id);
      const response = await fetch('http://localhost:5005/create-new-build', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userId: user.id})
      });
      if (response.ok) {
        console.log('New build created successfully');
      } else {
        console.error('Failed to create new build');
      }
    } catch (error) {
      console.error('Error creating new build:', error);
    }
  };

  return (
    <div style={{ marginTop: '20px' }}>
      <h1>Click the buttons</h1>
      <button onClick={handleLogout} style={{ marginRight: '10px' }}>Logout</button>
      <button onClick={handleCreateNewBuild} style={{ marginRight: '10px' }}>Create New Build</button>
    </div>
  );
};

export default Logout;
