import React from 'react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { PlusIcon } from '@radix-ui/react-icons';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command"
import { Link } from 'react-router-dom';
import { useToast } from './components/ui/use-toast';
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Button } from './components/ui/button';

const RadioItem = ({value, display, ...props}) => {
    return (<div className="flex items-center space-x-4">
                <RadioGroupItem value={value} {...props} />
                <Label htmlFor={value}>{display}</Label>
            </div>)
}


const DataGrid = () => {
    const [values, setValue] = React.useState([])
    const [builds, setBuilds] = React.useState([]);
    const [selectedCategory, setSelectedCategory] = React.useState("cpu");
    const [err, setErr] = React.useState(null)
    const { toast } = useToast()
    React.useEffect(() => {
        //http://localhost:5005/api/json/cpu
        fetch("/api/json/"+selectedCategory)
        .then(res => res.json())
        .then(json => setValue(json))
        .catch(() => setErr("Something went wrong"))

      fetch("/api/builds", { credentials: "include" })
      .then(res =>res.json())
      .then(res => setBuilds(res))
      .catch((e) => { 
          console.error(e)
          console.error("FIEN FIEN FIEN")
      })
    }, [selectedCategory]);
    const addItem = (build, item) => {
        return (event) => {
            fetch("/api/add-item", { 
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                method: 'POST',
                body: JSON.stringify({ itemData: { category: selectedCategory, ...item }, }) 
            })
            .then(res => res.json())
            .then(res => {
                console.log(res)
                if(res.success) {
                    toast({ title: res.message })
                } else {
                    toast({ title: res.error ?? "Failed to add item" })
                }
                
            }).catch(console.error)
        }
    }
    return (
        err ? (<p>{err}</p>)
            : values 
                ? (
            <div className="flex flex-row">
                <aside className="sidebar transform-translate-x-full md:translate-x-0 transition-transform duration-150 ease-in m-4">
                    <h1 className="flex text-2xl text-bold justify-center">Categories</h1>
                    <RadioGroup onValueChange={setSelectedCategory} 
                        className="rounded-lg border shadow-md p-2"
                        defaultValue="cpu">
                        <RadioItem value="cpu" display="Cpu"/>
                        <RadioItem value="case-accessory" display="Case Accessories" />
                        <RadioItem value="case" display="Case"/>
                        <RadioItem value="cpu-cooler" display="Cpu Coolers"/>
                        <RadioItem value="external-hdd" display="External HDD"/>
                        <RadioItem value="fan-controller" display="Fan Controllers"/>
                        <RadioItem value="headphones" display="Headphones"/>
                        <RadioItem value="internal-hdd" display="Internal HDD"/>
                        <RadioItem value="keyboard" display="Keyboard"/>
                        <RadioItem value="memory" display="Memory"/>
                        <RadioItem value="monitors" display="Monitors"/>
                        <RadioItem value="motherboard" display="Motherboards"/>
                        <RadioItem value="mouse" display="Mouse"/>
                        <RadioItem value="optical-drive" display="Optical Drive"/>
                        <RadioItem value="os" display="OS"/>
                        <RadioItem value="power-supply" display="Power Supply"/>
                        <RadioItem value="sound-card" display="Sound Card"/>
                        <RadioItem value="speakers" display="Speakers"/>
                        <RadioItem value="thermal-paste" display="Thermal Paste"/>
                        <RadioItem value="ups" display="Ups"/>
                        <RadioItem value="video-card" display="Video Card"/>
                        <RadioItem value="webcam" display="Webcam"/>
                        <RadioItem value="wired-network-card" display="Wired Network Card"/>
                        <RadioItem value="wireless-network-card" display="Wired Network Card"/>
                    </RadioGroup>
                </aside>
                <hr className="h-px my-8 border-0 dark:bg-gray-700"/>
                <div className="main-content flex flex-col flex-grow p-4">
                    <h1 className="font-bold text-2xl">{selectedCategory}</h1>
                    <div className="h-[63vh] relative overflow auto">
                    <Table>
                      <TableCaption>Parts</TableCaption>
                      <TableHeader className="sticky top-0 bg-primary ">
                        <TableRow>
                          <TableHead className="w-[100px] text-white font-bold">Name</TableHead>
                          <TableHead className="w-[100px] text-white">Price</TableHead>
                          <TableHead className="w-[100px] text-white font-bold">Add</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {values.map(s => 
                           <TableRow>
                                <TableCell className="font-medium">{s.name}</TableCell>
                                <TableCell className="font-medium">{s.price ? `$${s.price}` : "--"}</TableCell>
                                <TableCell>
                                       <DropdownMenu>
                                          <DropdownMenuTrigger>
                                            <PlusIcon/>
                                          </DropdownMenuTrigger>
                                          <DropdownMenuContent>
                                            <DropdownMenuLabel>Add to Build</DropdownMenuLabel>
                                            <DropdownMenuSeparator />
                                            {builds.length  
                                                ? builds?.map(build => ( 
                                                    <DropdownMenuItem onClick={addItem(build, s)}>
                                                        {build.name ?? "Unnamed"}
                                                    </DropdownMenuItem>
                                                )) 
                                                : <DropdownMenuItem >
                                                    <Link to="/build">Get Building!</Link>
                                                  </DropdownMenuItem>}
                                          </DropdownMenuContent>
                                       </DropdownMenu> 
                                </TableCell>
                            </TableRow>)}
                      </TableBody>
                    </Table>
                    </div>
                </div>
            </div>) 
        : <p>Loading...</p>
    ); 
   
}

export default DataGrid
