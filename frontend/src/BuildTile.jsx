// BuildTile.jsx
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader } from './components/ui/card';
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Share2Icon, TrashIcon } from '@radix-ui/react-icons';
import { useToast } from './components/ui/use-toast';
import { Link } from 'react-router-dom'

const BuildTile = ({ build, deleteBuild }) => {
  const navigate = useNavigate();
  const { toast } = useToast()
  const goToBuildDetails = () => {
    navigate(`/build/${build._id}`);
  } ;

  const onCopyLink = (e) => {
    e.stopPropagation();
    const s = new URL("build/"+build._id, window.location.toString()).toString() 
    navigator.clipboard.writeText(s);
    toast({
        title: "Copied build link",
        description: "Share your build with the world!",
    })    
  }
  
  // tailwind styling
  return (<Card className="items-center gap-4 hover:bg-muted" onClick={goToBuildDetails}>
            <CardHeader>
                <h1 className="text-foreground decoration-solid text-3xl">{build.name}</h1>
                <hr className="my-12 h-0.5 border-t-0 bg-foreground" />
                <div className="flex space-x-4">
                    <Button onClick={onCopyLink} className="text-foreground hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-600 dark:hover:bg-gray-700 rounded-lg py-2 px-2.5 inline-flex items-center justify-center bg-white border-gray-200 ">
                        <span id="default-message" className="inline-flex items-center">
                            <Share2Icon/>
                        </span>
                    </Button>
                    <Button onClick={deleteBuild} className="text-foreground hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-600 dark:hover:bg-gray-700 rounded-lg py-2 px-2.5 inline-flex items-center justify-center bg-white border-gray-200 ">
                        <span id="default-message" className="inline-flex items-center">
                            <TrashIcon/>
                        </span>
                    </Button>
                </div>
            </CardHeader>
            <CardContent>
                {build.items.length 
                    ? <ul>
                        {build.items.map(item => {
                            return <li>{item.name}</li>
                        })}
                     </ul>
                    : <Button onClick={e => e.stopPropagation() }>
                           <Link to="/parts">Start Building</Link>
                      </Button>
                }
            </CardContent>
      </Card>);
};


export default BuildTile;
