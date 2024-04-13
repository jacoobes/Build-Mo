import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocalStorage } from "./hooks/useLocalStorage";
import { useAuth } from './hooks/useAuth';

const Logout = () => {
  const navigate = useNavigate();
  const [itemName, setItemName] = useState('');
  const [buildList, setBuildList] = useState([]);
  const { logout } = useAuth()


  const handleLogout = async () => {
    try {
      const response = await fetch('/api/logout', {
        method: 'POST',
        credentials: 'include', // Include cookies in the request
      });
      if (response.ok) {
        logout()
        // Redirect to login page after logout
        navigate('/login');
      } else {
        console.error('Logout failed');
      }
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };
  useEffect(() => {
    fetchBuilds();
    handleLogout()
  }, []);
  const handleCreateNewBuild = async () => {
    try {
      const buildName = prompt("Enter the name for your new build:");
      if (!buildName){
        console.log('Build Creation Cancelled');
        return;
      }
      console.log(buildName);
      const response = await fetch('/create-new-build', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userId: user.id, buildName})
      });
      console.log(response);
      if (response.ok) {
        const data = await response.json();
        navigate('/parts');
        console.log('New build created successfully');
      } else {
        console.error('Failed to create new build');
      }
    } catch (error) {
      console.error('Error creating new build:', error);
    }
  };

  const fetchBuilds = async (userId) => {
      try {
        const response = await fetch(`/api/builds`, {
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json'
          }
        });
        if (response.ok) {
          const data = await response.json();
          setBuildList(data);
        } else {
          console.error('Failed to fetch builds');
        }
      } catch (err) {
        console.error('Error fetching builds:', err);
      }
    };


  return (
    <div style={{ marginTop: '20px' }}>
      <h1>Click the buttons</h1>
      <button onClick={handleLogout} style={{ marginRight: '10px' }}>Logout</button>
      <button onClick={handleCreateNewBuild} style={{ marginRight: '10px' }}>Create New Build</button>
      <ul>
        {buildList.map(build => (
          <li key={build._id}>{build.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Logout;
