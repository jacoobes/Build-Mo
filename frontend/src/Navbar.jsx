// Navbar.jsx
import { Link } from "react-router-dom";
import { Switch } from "@/components/ui/switch"
import { useTheme } from "./components/ThemeProvider";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { DropdownMenuRadioGroupDemo } from "./components/ui/radiogroup";
import { useAuth } from "@/hooks/useAuth.jsx";
import {useLocalStorage, useSessionStorage} from "@/hooks/useLocalStorage.jsx";
import { useEffect, useState } from "react";



const Navbar = () => {
    const { user } = useAuth();
  return (
    <nav className="flex justify-between items-center px-4 py-4 text-foreground bg-background border-b-2 border-border" style={{ fontFamily: 'Poppins, sans-serif' }}>
      <div className="flex items-center space-x-4">
        <Link to="/" className="text-2xl font-bold">Build'Mo</Link>
      </div>

      <div className="flex-1 flex justify-center space-x-20 text-xl font-medium">
        <Link to="/build" className="hover:text-gray-300">Build</Link>
        <Link to="/parts" className="hover:text-gray-300">Parts</Link>
        <Link to="/forums" className="hover:text-gray-300">Forums</Link>
      </div>

      <div className="flex items-center space-x-6 mr-6">
        <DropdownMenuRadioGroupDemo>
        </DropdownMenuRadioGroupDemo>
          {user ?
          <div className="mr-4">
              <Link to="/logout" className="bg-primary hover:bg-primary-hover text-white font-bold py-2 px-4 rounded">Logout</Link>
          </div>
              :
          <div className="mr-4">
          <Link to="/login" className="bg-primary hover:bg-primary-hover text-white font-bold py-2 px-4 rounded">Login</Link>
        </div>}
      </div>
    </nav>
  );
};

export default Navbar;
