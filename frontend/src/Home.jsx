import { Link } from "react-router-dom";
import './index.css';
import { useState } from 'react'
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"


export default function MainPage() {
  return (
    <div>
      <nav
        className="flex justify-between items-center px-4 py-4 text-black bg-white"
        style={{ fontFamily: 'Poppins, sans-serif' }}
      >
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
        <div>
          <Link
            to="/login"
            className="bg-primary hover:bg-primary-hover text-white font-bold py-2 px-4 rounded"
          >
            Login
          </Link>
        </div>
      </nav>

      <div className="flex flex-col items-center justify-center h-screen bg-white text-black"
      style={{ fontFamily: 'Poppins, sans-serif' }}>
        <h1 className="text-4xl font-bold mb-4">Empower Your Setup</h1>
        <p className="text-lg mb-8">Seamless PC building made simple</p>
        <button className="bg-primary hover:bg-primary-hover text-white font-bold py-2.5 px-4 rounded">
          Get Started
        </button>
      </div>
    </div>
  );
}
