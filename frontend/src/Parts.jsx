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
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command"

const DataGrid = () => {
    const [values, setValue] = React.useState(null)
    const [builds, setBuilds] = React.useState([]);
    const [category, setCategory] = React.useState("todos");
    const [err, setErr] = React.useState(null)
    React.useEffect(() => {
        //http://localhost:5005/api/json/cpu
        fetch("https://jsonplaceholder.typicode.com/"+category)
        .then(res => res.json())
        .then(json => setValue(json))
        .catch(() => setErr("Something went wrong"))

        fetch("mroute")
        .then(res =>res.json())
        .then(res => setBuilds(res))
        .catch(() => console.error("dont worry about it now"))
    });
    const addItem = (build) => {
        return (event) => {
            //todo:
            // post a build to a route which will add an item to a user's build
        }
    }
    return (
        err ? (<p>{err}</p>)
            : values 
                ? (   
                    <div>
                        <h1 className="text-3xl">Parts</h1>
                            <Command>
                              <CommandInput placeholder="Search categories" onChange = {() => console.log("hero")}/>
                              <CommandList>
                                <CommandEmpty>No results found.</CommandEmpty>
                                { /* <CommandGroup heading="Suggestions">
                                    </CommandGroup> */ }
                                { /* <CommandSeparator /> */ }
                                <CommandGroup heading="Categories">
                                    <CommandItem value="Case Accesories">Case Accesories</CommandItem>
                                    <CommandItem value="Case Fans">Case Fans</CommandItem>
                                    <CommandItem value="Case">Case</CommandItem>
                                    <CommandItem value="Cpu Coolers">Cpu Coolers</CommandItem>
                                    <CommandItem value="Cpu">Cpu</CommandItem>
                                    <CommandItem value="External HDD">External HDD</CommandItem>
                                    <CommandItem value="Fan Controllers">Fan Controllers</CommandItem>
                                    <CommandItem value="Headphones">Headphones</CommandItem>
                                    <CommandItem value="Internal HDD">Internal HDD</CommandItem>
                                    <CommandItem value="Keyboard">Keyboard</CommandItem>
                                    <CommandItem value="Memory">Memory</CommandItem>
                                    <CommandItem value="Monitors">Monitors</CommandItem>
                                    <CommandItem value="Motherboards">Motherboards</CommandItem>
                                    <CommandItem value="Mouse">Mouse</CommandItem>
                                    <CommandItem value="Optical Drive">Optical Drive</CommandItem>
                                    <CommandItem value="OS">OS</CommandItem>
                                    <CommandItem value="Power Supply">Power Supply</CommandItem>
                                    <CommandItem value="Sound Card">Sound Card</CommandItem>
                                    <CommandItem value="Speakers">Speakers</CommandItem>
                                    <CommandItem value="Thermal Paste">Thermal Paste</CommandItem>
                                    <CommandItem value="Ups">Ups</CommandItem>
                                    <CommandItem value="Video Card">Video Card</CommandItem>
                                    <CommandItem value="Webcam">Webcam</CommandItem>
                                    <CommandItem value="Wired Network Card">Wired Network Card</CommandItem>
                                    <CommandItem value="Wireless Network Card">Wireless Network Card</CommandItem>
                                </CommandGroup>
                              </CommandList>
                            </Command>
                        <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"/>
                        <Table>
                          <TableCaption>A list of your recent invoices.</TableCaption>
                          <TableHeader>
                            <TableRow>
                              <TableHead className="w-[100px]">Name</TableHead>
                              <TableHead>Price</TableHead>
                              <TableHead>Add</TableHead>
                              {/*<TableHead className="text-right">Add</TableHead>*/}
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {values.map(s => 
                               <TableRow>
                                    <TableCell className="font-medium">{s.title}</TableCell>
                                    <TableCell className="font-medium">69.99</TableCell>
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
                                                        <DropdownMenuItem onClick={addItem(build)}>
                                                            {build.name ?? "Unnamed"}
                                                        </DropdownMenuItem>
                                                    )) 
                                                    : <DropdownMenuItem >
                                                        Get Building!
                                                      </DropdownMenuItem>}
                                              </DropdownMenuContent>
                                           </DropdownMenu> 
                                    </TableCell>
                                </TableRow> 
                            )}
                          </TableBody>
                        </Table>
                    </div>
                ) : <p>Loading...</p>
    ); 
   
}

export default DataGrid
