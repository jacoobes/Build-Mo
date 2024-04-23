import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHeader,  
  TableHead,
  TableRow ,
    TableCaption
} from "@/components/ui/table";
import { DropdownMenu, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator }  from '@/components/ui/dropdown-menu'
import { PlusIcon } from '@radix-ui/react-icons'
const BuildDetail = () => {
  const { buildId } = useParams();
  const [build, setBuild] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // api call from Parts.jsx idk someone can fix 
    fetch(`/api/builds/${buildId}`)
      .then((res) => res.json())
      .then((data) => {
        setBuild(data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setError("FE!N FE!N FE!N FE!N");
        setIsLoading(false);
      });
  }, [isLoading]);
  const execute = (action, item) => {
    return (event) => {

        console.log(build)
        switch(action) {
            case "delete": {
                fetch("/api/delete-item/"+item._id.toString(), {
                    method: 'DELETE',
                    credentials: 'include',
                    body: JSON.stringify({
                        buildId: build._id.toString()
                    }),
                    headers: { 'Content-Type': 'application/json' }
                })
                .then(res => res.json())
                .then(json => { 
                    if(json.success) {
                        setIsLoading(!isLoading)
                    } else {
                        console.error(json.error)
                    }
                })
                .catch(console.error ) 
            }
        }
    }
  }

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!build) return <p>Build not found.</p>;

  return (
    <div>
      <h2 className="text-3xl font-bold mb-4">{build.name}</h2>
      <Table>
          <TableCaption>Your PC Parts</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Type</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Action </TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {build.items.map(item => 
                (<TableRow>
                    <TableCell className="font-medium">{item.category}</TableCell>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>                                       
                        <DropdownMenu>
                          <DropdownMenuTrigger>
                            <PlusIcon/>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            <DropdownMenuLabel>Add to Build</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            {["delete"].map(action=> ( 
                                <DropdownMenuItem onClick={execute(action, item)}>
                                {action}
                                </DropdownMenuItem>
                            ))}
                          </DropdownMenuContent>
                        </DropdownMenu> 
                    </TableCell>
                    <TableCell className="text-right">{item.price ?? "??"}</TableCell>
                </TableRow>))}
          </TableBody>
          <TableRow>
            <TableCell className="font-bold"> 
            Total 
            </TableCell> 
            <TableCell/> 
            <TableCell/> 
            <TableCell className="text-right font-bold">
                {build.items.reduce((acc, col) => col.price + acc, 0)}
            </TableCell>
          </TableRow>
        </Table>
      </div>);
};

export default BuildDetail;
