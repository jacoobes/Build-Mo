import React from 'react';
import BuildTile from './BuildTile'; 
import {  Button } from '@/components/ui/button'

const Build = () => {
    const [builds, setBuilds] = React.useState([]);
    const [added, setAdded] = React.useState(false);
    const [err, setErr] = React.useState(null)
    React.useEffect(() => {
        fetch("/api/builds", { credentials: "include" })
          .then(res => res.json())
          .then(jsn=> setBuilds(jsn))
          .catch(setErr)
    }, [added]);

    const onClickGetBuilding = ev => {
        const buildName = prompt("Enter the name for your new build:");
        if (!buildName){
            console.log('Build Creation Cancelled');
            return;
        }
        fetch('/api/create-new-build', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: `{ "buildName": "${buildName}" }` 
        })
        .then(res => res.json())
        .then(() => setAdded(!added))
        .catch(err => setErr(err))
    }

    return (
      <div className="container max-w-6xl mx-auto px-4 py-8">
          {err ? <p>{err.message}</p>
               : <div className="grid grid-cols-3 grid-rows-2 gap-4 h-screen">
                      <div className="col-span-1 row-span-1 flex justify-center items-center p-4">
                         (<Button onClick={onClickGetBuilding}>
                            <span> 
                                Start Building!
                            </span>
                          </Button>)
                         {builds.map(build => 
                            (<div key={build._id} className="col-span-1 row-span-1 flex justify-center items-center p-4">
                                <BuildTile buildId={build._id} title={build.title} />
                            </div>))}
                       </div>
                 </div>}
        </div>
    );
  };
  

export default Build;
