// App.js

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Import Routes component
import RegisterPage from './Register.jsx';
import LoginPage from './Login.jsx';

const App = () => {
  return (
    <Router>
      <Routes> {/* Wrap Route components in Routes */}
        <Route path="/register" element={<RegisterPage />} /> {/* Use element prop */}
        <Route path="/login" element={<LoginPage />} /> {/* Use element prop */}
        {/* Add more routes as needed */}
      </Routes>
    </Router>
  );
};

export default App;
