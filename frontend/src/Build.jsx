import React from 'react';
import BuildTile from './BuildTile'; 
import {  Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card' 
import { PlusIcon } from '@radix-ui/react-icons'
const Build = () => {
    const [builds, setBuilds] = React.useState([]);
    const [added, setAdded] = React.useState(false);
    const [err, setErr] = React.useState(null)
    React.useEffect(() => {
        fetch("/api/builds", { credentials: "include" , })
          .then(res => res.json())
          .then(jsn=> setBuilds(jsn))
          .catch(e => { setErr(e); setBuilds([]) })
    }, [added]);

    const onClickGetBuilding = ev => {
        const buildName = prompt("Name for your new build:");
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
    const deleteBuild = build => {
        return e => {
            e.stopPropagation();
            const s = confirm("are u sure");
            if(!s) return
            fetch(`/api/builds/${build._id}`, { method: "DELETE", credentials: 'include' })
                .then(res => res.json())
                .then(success => {
                    if(success) {
                        setAdded(!added)
                    }
                })
        }
    }
    return (err 
        ? <p>{err.message}</p>
        : <div className="grid grid-cols-3 grid-rows-2 gap-4 h-screen">
             <Card>
                <CardContent >
                    <Button className="w-full h-full justify-center" onClick={onClickGetBuilding}>
                        <PlusIcon/>
                    </Button>
                </CardContent>
              </Card>
             {builds.map(build => <BuildTile build={build} deleteBuild={deleteBuild(build)}/>)}
          </div>);
  };
  

export default Build;
