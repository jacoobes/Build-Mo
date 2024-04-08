import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableRow 
} from "@/components/ui/table";

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
  }, [buildId]);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!build) return <p>Build not found.</p>;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">{build.name}</h1>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell className="w-[100px]">Part Name</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {build.items.map((item, index) => (
            <TableRow key={index}>
              <TableCell>{item}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default BuildDetail;
