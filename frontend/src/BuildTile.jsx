// BuildTile.jsx
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader } from './components/ui/card';

const BuildTile = ({ build, }) => {
  const navigate = useNavigate();
  const goToBuildDetails = () => {
    navigate(`/build/${build._id}`);
  };
/*
 *onClick={goToBuildDetails}
          className="w-full h-full bg-primary text-white font-bold rounded-lg hover:bg-primary-hover transition duration-300 cursor-pointer flex flex-col items-center justify-center" >
 */
  // tailwind styling
  return (<Card className="items-center gap-4 hover:bg-muted" onClick={goToBuildDetails}>
            <CardHeader>
                <h1 className="text-foreground decoration-solid text-3xl">{build.name}</h1>
                <hr className="my-12 h-0.5 border-t-0 bg-foreground" />
            </CardHeader>
            <CardContent>
                <ul className="text-background">
                    {build.items.map(item => {
                        return <li>{item.name}</li>
                    })}
                </ul>
            </CardContent>
      </Card>);
};


export default BuildTile;
