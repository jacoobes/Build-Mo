// Navbar.jsx

import { Link } from "react-router-dom";
import { DropdownMenuRadioGroupDemo } from "./components/ui/radiogroup";
import { useAuth } from "@/hooks/useAuth.jsx";
import { useLocalStorage, useSessionStorage } from "@/hooks/useLocalStorage.jsx";
import { useEffect, useState } from "react";

const Navbar = () => {
  const { user } = useAuth();

  return (
    <nav className="flex flex-col justify-between items-center px-4 py-4 text-foreground bg-background border-b-2 border-border sm:flex-row" style={{ fontFamily: 'Poppins, sans-serif' }}>
      <div className="flex items-center space-x-4 mb-4 sm:mb-0">
        <Link to="/" className="text-2xl font-bold">
          Build'Mo
        </Link>
      </div>

      <div className="flex-1 flex flex-col items-center space-y-4 sm:flex-row sm:justify-center sm:space-x-20 sm:space-y-0 text-xl font-medium">
        <Link to="/build" className="hover:text-gray-300">
          Build
        </Link>
        <Link to="/parts" className="hover:text-gray-300">
          Parts
        </Link>
        <Link to="/posts" className="hover:text-gray-300">
          Forums
        </Link>
      </div>

      <div className="flex items-center space-x-6 mt-4 sm:mt-0 sm:mr-6">
        <DropdownMenuRadioGroupDemo></DropdownMenuRadioGroupDemo>
        {user ? (
          <div className="mr-4">
            <Link
              to="/logout"
              className="bg-primary hover:bg-primary-hover text-white font-bold py-2 px-4 rounded"
            >
              Logout
            </Link>
          </div>
        ) : (
          <div className="mr-4">
            <Link
              to="/login"
              className="bg-primary hover:bg-primary-hover text-white font-bold py-2 px-4 rounded"
            >
              Login
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
