// BuildTile.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const BuildTile = ({ buildId, title }) => {
  const navigate = useNavigate();
  const goToBuildDetails = () => {
    navigate(`/build/${buildId}`);
  };

  // tailwind styling
  return (
    <div
      onClick={goToBuildDetails}
      className="w-full h-full bg-primary text-white font-bold rounded-lg hover:bg-primary-hover transition duration-300 cursor-pointer flex flex-col items-center justify-center"
    >
      <span className="text-xl mb-2">{title}</span>
      {/* bio here */}
      <span className="text-sm">More Info</span>
      {/* image ere */}
      <div className="w-16 h-16 bg-gray-200 rounded-full mt-2"></div>
    </div>
  );
};


export default BuildTile;
