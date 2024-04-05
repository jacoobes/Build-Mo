// Navbar.jsx
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center px-4 py-4 text-black bg-background border-b-2 border-border" style={{ fontFamily: 'Poppins, sans-serif' }}>
        <div className="flex items-center space-x-4">
          <Link to="/" className="text-2xl font-bold">
            Build'Mo
          </Link>
        </div>
        <div className="flex items-center justify-between space-x-20 text-xl font-medium">
          <Link to="/build" className="hover:text-gray-300">
            Build
          </Link>
          <Link to="/parts" className="hover:text-gray-300">
            Parts
          </Link>
          <Link to="/forums" className="hover:text-gray-300">
            Forums
          </Link>
        </div>
        <div className="mr-12">
          <Link to="/login" className="bg-primary hover:bg-primary-hover text-white font-bold py-2 px-4 rounded">
            Login
          </Link>
        </div>
      </nav>
  );
};

export default Navbar;
