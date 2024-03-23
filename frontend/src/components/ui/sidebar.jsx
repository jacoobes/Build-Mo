import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import React from 'react'
//interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
//  json: APIApplication
//  setPage: (arg: string) => void
//}

export function Sidebar({ className, json, setPage }) {
  const [selected, setSelected]= React.useState('None');
  return (
    <div className={cn("pb-12", className)}>
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
            {json.name}
          </h2>
          <div className="space-y-1">
            <Button variant={selected=='Info'? "secondary" : 'ghost'} 
                    className="w-full justify-start" onClick={() => { setPage('Info'); setSelected('Info') }}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mr-2 h-4 w-4">
                <circle cx="12" cy="12" r="10" />
                <polygon points="10 8 16 12 10 16 10 8" />
              </svg>
              Info
            </Button>
            <Button variant={selected=='Connect'? "secondary" : 'ghost'} 
               className="w-full justify-start" onClick={() => { setPage('Connect'); setSelected('Connect') } }>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mr-2 h-4 w-4"
              >
                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
              Connect 
            </Button>
            <Button variant={selected=='Commands'? "secondary" : 'ghost'} 
               className="w-full justify-start" onClick={() => { setPage('Commands'); setSelected('Commands') } }>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mr-2 h-4 w-4"
              >
                <rect width="7" height="7" x="3" y="3" rx="1" />
                <rect width="7" height="7" x="14" y="3" rx="1" />
                <rect width="7" height="7" x="14" y="14" rx="1" />
                <rect width="7" height="7" x="3" y="14" rx="1" />
              </svg>

              Commands 
            </Button>

          </div>
        </div>
      </div>
    </div>
  )
}
