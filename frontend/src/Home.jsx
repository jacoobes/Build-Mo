import React from 'react';
import './index.css';
// Other imports as necessary

export default function MainPage() {
  return (
    <div>
      
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

