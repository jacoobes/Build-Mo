// App.js
import { BrowserRouter as Router, Routes, Route, useNavigate, Navigate } from 'react-router-dom'; // Import Routes component
import RegisterPage from './Register.jsx';
import LoginPage from './Login.jsx';
import AuthenticationPage from './Home.jsx';
import LogoutPage from './Logout.jsx';
import DataGrid from './Parts.jsx';
import { useAuth, AuthProvider } from './hooks/useAuth.jsx'
import PostPage from './components/forum.jsx';
import Post from './components/forumpost.jsx';
import BuildPage from './Build.jsx';
import ForumCreate from './ForumCreate.jsx';
import BuildDetail from './BuildDetail';
import Navbar from './Navbar'; 
import { ThemeProvider} from './components/ThemeProvider.jsx';

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
      <ThemeProvider>
      <AuthProvider>
      <Navbar />
          <Routes> {/* Wrap Route components in Routes */}
            <Route path="/" element={<AuthenticationPage/>}/>
            <Route path="/parts" element = { <DataGrid/> } />
            <Route path="/register" element={<RegisterPage />} /> {/* Use element prop */}
            <Route path="/login" element={<LoginPage />} /> {/* Use element prop */}
            <Route path="/logout" element={<LogoutPage />} /> {}
            <Route path="/posts" element={<PostPage/> } />
            <Route path="/posts/:postId" element={<Post/> } />
            <Route path="/post-create" element={<ForumCreate/> } />
            <Route path="/build" element={
                <ProtectedRoute> 
                    <BuildPage/>
                </ProtectedRoute>
            } />
            <Route path="/build/:buildId" element={
                <ProtectedRoute>
                    <BuildDetail />
                </ProtectedRoute>
            } />
          </Routes>
      </AuthProvider>
      </ThemeProvider>
    </Router>
  );
};

export default App;
