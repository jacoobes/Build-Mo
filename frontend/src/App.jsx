// App.js

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Import Routes component
import RegisterPage from './Register.jsx';
import LoginPage from './Login.jsx';
import AuthenticationPage from './Home.jsx';
import LogoutPage from './Logout.jsx';

const App = () => {
  return (
    <Router>
      <Routes> {/* Wrap Route components in Routes */}
        <Route path="/" element={<AuthenticationPage/>}/>
        <Route path="/register" element={<RegisterPage />} /> {/* Use element prop */}
        <Route path="/login" element={<LoginPage />} /> {/* Use element prop */}
        <Route path="/logout" element={<LogoutPage />} /> {}
        {/* Add more routes as needed */}
      </Routes>
    </Router>
  );
};

export default App;
