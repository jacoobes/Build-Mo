// App.js
import { BrowserRouter as Router, Routes, Route, useNavigate, Navigate } from 'react-router-dom'; // Import Routes component
import RegisterPage from './Register.jsx';
import LoginPage from './Login.jsx';
import AuthenticationPage from './Home.jsx';
import LogoutPage from './Logout.jsx';
import DataGrid from './Parts.jsx';
import { useAuth, AuthProvider } from './hooks/useAuth.jsx'
import ForumPage from './components/forum.jsx';
import Post from './components/forumpost.jsx';
import BuildPage from './Build.jsx';
import BuildDetail from './BuildDetail';
import Navbar from './Navbar'; 

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  if (!user) {
    // user is not authenticated
    return <Navigate to="/login" />;
  }
  return children;
};

const App = () => {
  return (
    <Router>
      <AuthProvider>
      <Navbar />
          <Routes> {/* Wrap Route components in Routes */}
            <Route path="/" element={<AuthenticationPage/>}/>
            <Route path="/parts" element = { <DataGrid/> } />
            <Route path="/register" element={<RegisterPage />} /> {/* Use element prop */}
            <Route path="/login" element={<LoginPage />} /> {/* Use element prop */}
            <Route path="/logout" element={<LogoutPage />} /> {}
            <Route path="/forums" element={<ForumPage/> } />
            <Route path="/forums/:forumId" element={<Post/> } />
            <Route path="/build" element={<BuildPage />} />
            <Route path="/build/:buildId" element={<BuildDetail />} />
          </Routes>

      </AuthProvider>
    </Router>
  );
};

export default App;
