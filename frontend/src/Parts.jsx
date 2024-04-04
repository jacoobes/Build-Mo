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

const DataGrid = () => {
    const [values, setValue] = React.useState([])
    const [builds, setBuilds] = React.useState([]);
    const [selectedCategory, setSelectedCategory] = React.useState("todos");
    const [categories, setCategories] = React.useState("todos");
    const [err, setErr] = React.useState(null)
    React.useEffect(() => {
//        fetch()
//        .then(setCategories)
//        .catch(console.error)
    }, [])
    React.useEffect(() => {
        //http://localhost:5005/api/json/cpu
        fetch("https://jsonplaceholder.typicode.com/"+"todos")
        .then(res => res.json())
        .then(json => setValue(json))
        .catch(() => setErr("Something went wrong"))

//        fetch("mroute")
//        .then(res =>res.json())
//        .then(res => setBuilds(res))
//        .catch(() => { 
//
//            console.error("dont worry about it now")
//        })
    }, [selectedCategory]);
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
            <div className="flex flex-row min-h-screen">
                <aside className="sidebar w-64 md:shadow transform -translate-x-full md:translate-x-0 transition-transform duration-150 ease-in bg-indigo-500">
                  <Command>
                        <CommandInput placeholder="Search categories"/>
                        <CommandList>
                            <CommandEmpty>No results found.</CommandEmpty>
                            <CommandGroup>
                                <CommandItem onSelect={setSelectedCategory}>
                                    <span>Case Accesories</span>
                                </CommandItem>
                                <CommandItem onSelect={setSelectedCategory}>Case Fans</CommandItem>
                                <CommandItem onSelect={setSelectedCategory}>Case</CommandItem>
                                <CommandItem onSelect={setSelectedCategory} >Cpu Coolers</CommandItem>
                                <CommandItem onSelect={setSelectedCategory}>Cpu</CommandItem>
                                <CommandItem onSelect={setSelectedCategory}>External HDD</CommandItem>
                                <CommandItem onSelect={setSelectedCategory}>Fan Controllers</CommandItem>
                                <CommandItem onSelect={setSelectedCategory}>Headphones</CommandItem>
                                <CommandItem onSelect={setSelectedCategory}>Internal HDD</CommandItem>
                                <CommandItem onSelect={setSelectedCategory}>Keyboard</CommandItem>
                                <CommandItem onSelect={setSelectedCategory}>Memory</CommandItem>
                                <CommandItem onSelect={setSelectedCategory}>Monitors</CommandItem>
                                <CommandItem onSelect={setSelectedCategory}>Motherboards</CommandItem>
                                <CommandItem onSelect={setSelectedCategory}>Mouse</CommandItem>
                                <CommandItem onSelect={setSelectedCategory}>Optical Drive</CommandItem>
                                <CommandItem onSelect={setSelectedCategory}>OS</CommandItem>
                                <CommandItem onSelect={setSelectedCategory}>Power Supply</CommandItem>
                                <CommandItem onSelect={setSelectedCategory}>Sound Card</CommandItem>
                                <CommandItem onSelect={setSelectedCategory}>Speakers</CommandItem>
                                <CommandItem onSelect={setSelectedCategory}>Thermal Paste</CommandItem>
                                <CommandItem onSelect={setSelectedCategory}>Ups</CommandItem>
                                <CommandItem onSelect={setSelectedCategory}>Video Card</CommandItem>
                                <CommandItem onSelect={setSelectedCategory}>Webcam</CommandItem>
                                <CommandItem onSelect={setSelectedCategory}>Wired Network Card</CommandItem>
                                <CommandItem onSelect={setSelectedCategory}>Wireless Network Card</CommandItem>
                        </CommandGroup>
                      </CommandList>
                    </Command>
                </aside>
                <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"/>
                <div class="main-content flex flex-col flex-grow p-4">
                    <h1 class="font-bold text-2xl text-gray-700">{selectedCategory}</h1>
                    <div className="h-[63vh] relative overflow auto">
                    <Table>
                      <TableCaption>Parts</TableCaption>
                      <TableHeader className="sticky top-0 bg-primary ">
                        <TableRow>
                          <TableHead className="w-[100px] text-white font-bold">Name</TableHead>
                          <TableHead className="w-[100px] text-white">Price</TableHead>
                          <TableHead className="w-[100px] text-white font-bold">Add</TableHead>
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
                </div>
                                </div>
                ) : <p>Loading...</p>
    ); 
   
}

export default DataGrid
