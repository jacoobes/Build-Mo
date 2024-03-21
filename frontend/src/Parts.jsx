import React from 'react';
import { Card, CardHeader, CardContent } from '@/components/ui/card'
//  return (
//        <div> 
//            <div>
//                <Tabs defaultValue="account" className="w-[400px]">
//                  <TabsList>
//                    <TabsTrigger value="Case Accesories"></TabsTrigger>
//                    <TabsTrigger value="Case Fans">Password</TabsTrigger>
//                    <TabsTrigger value="Case">Account</TabsTrigger>
//                    <TabsTrigger value="Cpu Coolers">Password</TabsTrigger>
//                    <TabsTrigger value="Cpu">Password</TabsTrigger>
//                    <TabsTrigger value="External HDD">Password</TabsTrigger>
//                    <TabsTrigger value="Fan Controllers">Password</TabsTrigger>
//                    <TabsTrigger value="Headphones">Password</TabsTrigger>
//                    <TabsTrigger value="Internal HDD">Password</TabsTrigger>
//                    <TabsTrigger value="Keyboard">Password</TabsTrigger>
//                    <TabsTrigger value="Memory">Password</TabsTrigger>
//                    <TabsTrigger value="Monitors">Password</TabsTrigger>
//                    <TabsTrigger value="Motherboards">Password</TabsTrigger>
//                    <TabsTrigger value="Mouse">Password</TabsTrigger>
//                    <TabsTrigger value="Optical Drive">Password</TabsTrigger>
//                    <TabsTrigger value="OS">Password</TabsTrigger>
//                    <TabsTrigger value="Power Supply">Password</TabsTrigger>
//                    <TabsTrigger value="Sound Card">Password</TabsTrigger>
//                    <TabsTrigger value="Speakers">Password</TabsTrigger>
//                    <TabsTrigger value="Thermal Paste">Password</TabsTrigger>
//                    <TabsTrigger value="Ups">Password</TabsTrigger>
//                    <TabsTrigger value="Video Card">Password</TabsTrigger>
//                    <TabsTrigger value="Webcam">Password</TabsTrigger>
//                    <TabsTrigger value="Wired Network Card">Password</TabsTrigger>
//                    <TabsTrigger value="Wireless Network Card">Password</TabsTrigger>
//                  </TabsList>
//                    <TabsContent value="Case Accesories">Account</TabsContent>
//                    <TabsContent value="Case Fans">Password</TabsContent>
//                    <TabsContent value="Case">Account</TabsContent>
//                    <TabsContent value="Cpu Coolers">Password</TabsContent>
//                    <TabsContent value="Cpu">Password</TabsContent>
//                    <TabsContent value="External HDD">Password</TabsContent>
//                    <TabsContent value="Fan Controllers">Password</TabsContent>
//                    <TabsContent value="Headphones">Password</TabsContent>
//                    <TabsContent value="Internal HDD">Password</TabsContent>
//                    <TabsContent value="Keyboard">Password</TabsContent>
//                    <TabsContent value="Memory">Password</TabsContent>
//                    <TabsContent value="Monitors">Password</TabsContent>
//                    <TabsContent value="Motherboards">Password</TabsContent>
//                    <TabsContent value="Mouse">Password</TabsContent>
//                    <TabsContent value="Optical Drive">Password</TabsContent>
//                    <TabsContent value="OS">Password</TabsContent>
//                    <TabsContent value="Power Supply">Password</TabsContent>
//                    <TabsContent value="Sound Card">Password</TabsContent>
//                    <TabsContent value="Speakers">Password</TabsContent>
//                    <TabsContent value="Thermal Paste">Password</TabsContent>
//                    <TabsContent value="Ups">Password</TabsContent>
//                    <TabsContent value="Video Card">Password</TabsContent>
//                    <TabsContent value="Webcam">Password</TabsContent>
//                    <TabsContent value="Wired Network Card">Password</TabsContent>
//                    <TabsContent value="Wireless Network Card">Password</TabsContent>
//                </Tabs>
//            </div>
//            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
//              <Card>
//                <CardContent>
//                  <div className="space-y-4">
//                    <h3 className="font-bold">Card 1</h3>
//                    <p>Content for Card 1 goes here.</p>
//                  </div>
//                </CardContent>
//              </Card>
//
//              <Card>
//                <CardContent>
//                  <div className="space-y-4">
//                    <h3 className="font-bold">Card 2</h3>
//                    <p>Content for Card 2 goes here.</p>
//                  </div>
//                </CardContent>
//              </Card>
//
//              <Card>
//                <CardContent>
//                  <div className="space-y-4">
//                    <h3 className="font-bold">Card 3</h3>
//                    <p>Content for Card 3 goes here.</p>
//                  </div>
//                </CardContent>
//              </Card>
//            </div>        
//        </div>     
//    );
 
const frameworks = [
  {
    value: "next.js",
    label: "Next.js",
  },
  {
    value: "sveltekit",
    label: "SvelteKit",
  },
  {
    value: "nuxt.js",
    label: "Nuxt.js",
  },
  {
    value: "remix",
    label: "Remix",
  },
  {
    value: "astro",
    label: "Astro",
  },
]
 
const DataGrid = () => {
    const [open, setOpen] = React.useState(false)
    const [values, setValue] = React.useState(null)
    const [err, setErr] = React.useState(null)
    React.useEffect(() => {
        fetch("https://jsonplaceholder.typicode.com/todos")
        .then(res => res.json())
        .then(json => setValue(json))
        .catch(() => setErr("Something went wrong"))
    });
    return (
        err ? (<p>{err}</p>)
            : values 
                ? (   
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {values.map(s =>
                       <Card>
                            <CardContent> 
                                {s.title}
                            </CardContent>
                        </Card> 
                    )}
                    </div>
                ) : <p>Loading...</p>
    );   
   
}

export default DataGrid
