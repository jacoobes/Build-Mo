import React from 'react';
import BuildTile from './BuildTile'; 


const Build = () => {
    const [builds, setBuilds] = React.useState([]);
    const [err, setErr] = React.useState(null)
    React.useEffect(() => {
        fetch("/api/builds")
          .then(res => res.json())
          .then(jsn=> setBuilds(jsn))
          .catch(setErr)
    }, [])
    return (
      <div className="container max-w-6xl mx-auto px-4 py-8">
          {err ? <p>{err.message}</p>
               : <div className="grid grid-cols-3 grid-rows-2 gap-4 h-screen">
                  {!builds.length
                      ? <div className="col-span-1 row-span-1 flex justify-center items-center p-4">
                          Get Building!
                        </div>
                      : builds.map(build => (
                          <div key={build.id} className="col-span-1 row-span-1 flex justify-center items-center p-4">
                              <BuildTile buildId={build.id} title={build.title} />
                          </div>
                      ))}
                  </div>}
      </div>
    );
  };
  

export default Build;
