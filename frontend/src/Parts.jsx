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

const DataGrid = () => {
    const [values, setValue] = React.useState([])
    const [builds, setBuilds] = React.useState([]);
    const [selectedCategory, setSelectedCategory] = React.useState("cpu");
    const [categories, setCategories] = React.useState("cpu");
    const [err, setErr] = React.useState(null)
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
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                method: 'POST',
                body: JSON.stringify({ 
                    itemData: { category: selectedCategory, ...item },
                }) 
            })
            .then(res => res.json())
            .catch(console.error)
        }
    }
    return (
        err ? (<p>{err}</p>)
            : values 
                ? (
            <div className="flex flex-row min-h-screen">
                <aside className="sidebar w-64 md:shadow transform-translate-x-full md:translate-x-0 transition-transform duration-150 ease-in">
                  <Command>
                        <CommandInput placeholder="Search categories"/>
                        <CommandList>
                            <CommandEmpty>No results found.</CommandEmpty>
                            <CommandGroup>
                                <CommandItem onSelect={setSelectedCategory}>
                                    <span>Case Accesories</span>
                                </CommandItem>
                                <CommandItem onSelect={setSelectedCategory} value="case">Case</CommandItem>
                                <CommandItem onSelect={setSelectedCategory} value="cpu-cooler">Cpu Coolers</CommandItem>
                                <CommandItem onSelect={setSelectedCategory} value="cpu">Cpu</CommandItem>
                                <CommandItem onSelect={setSelectedCategory} value="external-hdd">External HDD</CommandItem>
                                <CommandItem onSelect={setSelectedCategory} value="fan-controller">Fan Controllers</CommandItem>
                                <CommandItem onSelect={setSelectedCategory} value="headphones">Headphones</CommandItem>
                                <CommandItem onSelect={setSelectedCategory} value="internal-hdd">Internal HDD</CommandItem>
                                <CommandItem onSelect={setSelectedCategory} value="keyboard">Keyboard</CommandItem>
                                <CommandItem onSelect={setSelectedCategory} value="memory">Memory</CommandItem>
                                <CommandItem onSelect={setSelectedCategory} value="monitors">Monitors</CommandItem>
                                <CommandItem onSelect={setSelectedCategory} value="motherboards">Motherboards</CommandItem>
                                <CommandItem onSelect={setSelectedCategory} value="mouse">Mouse</CommandItem>
                                <CommandItem onSelect={setSelectedCategory} value="optical-drive">Optical Drive</CommandItem>
                                <CommandItem onSelect={setSelectedCategory} value="os">OS</CommandItem>
                                <CommandItem onSelect={setSelectedCategory} value="power-supply">Power Supply</CommandItem>
                                <CommandItem onSelect={setSelectedCategory} value="sound-card">Sound Card</CommandItem>
                                <CommandItem onSelect={setSelectedCategory} value="speakers">Speakers</CommandItem>
                                <CommandItem onSelect={setSelectedCategory} value="thermal-paste">Thermal Paste</CommandItem>
                                <CommandItem onSelect={setSelectedCategory} value="ups">Ups</CommandItem>
                                <CommandItem onSelect={setSelectedCategory} value="video-card">Video Card</CommandItem>
                                <CommandItem onSelect={setSelectedCategory} value="webcam">Webcam</CommandItem>
                                <CommandItem onSelect={setSelectedCategory} value="wired-network-card">Wired Network Card</CommandItem>
                                <CommandItem onSelect={setSelectedCategory} value="wireless-network-card">Wired Network Card</CommandItem>
                        </CommandGroup>
                      </CommandList>
                    </Command>
                </aside>
                <hr className="h-px my-8  border-0 dark:bg-gray-700"/>
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
