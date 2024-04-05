import React from 'react';
import BuildTile from './BuildTile'; 

const builds = [
  { id: 1, title: 'Build 1' },
  { id: 2, title: 'Build 2' },
  { id: 3, title: 'Build 3' },
  { id: 4, title: 'Build 4' },
  { id: 5, title: 'Build 5' },
  { id: 6, title: 'Build 6' },
];

const Build = () => {
    return (
      <div className="container max-w-6xl mx-auto px-4 py-8">
        {/* set to 3x2 */}
        <div className="grid grid-cols-3 grid-rows-2 gap-4 h-screen">
          {builds.map(build => (
            <div key={build.id} className="col-span-1 row-span-1 flex justify-center items-center p-4">
              <BuildTile buildId={build.id} title={build.title} />
            </div>
          ))}
        </div>
      </div>
    );
  };
  

export default Build;
