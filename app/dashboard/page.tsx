'use client'
import React from "react"
import { Search, Plus, LayoutGrid, List, Upload, Settings, MoreVertical } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { NewDesignDialog } from "./_components/new-design-dialog"

const designs = [
  { id: 1, name: "Pepsi-300X250", type: "Custom size 3", size: "300 x 250 px", lastModified: "a day ago", author: "Bhanu Prakash" },
  { id: 2, name: "Pepsi-640X360", type: "Design set", size: "26", lastModified: "a day ago", author: "Bhanu Prakash" },
  { id: 3, name: "Gatorade-300X250", type: "Design set", size: "5", lastModified: "2 days ago", author: "Bhanu Prakash" },
  { id: 4, name: "Gatorade-1080X1080", type: "Instagram Video Post", size: "1080 x 1080 px", lastModified: "5 months ago", author: "Bhanu Prakash" },
  { id: 5, name: "Spotpet-300X250", type: "Custom size 1", size: "300 x 250 px", lastModified: "7 months ago", author: "Bhanu Prakash" },
]

export default function Dashboard() {
  const [isNewDesignOpen, setIsNewDesignOpen] = React.useState(false)

  return (
    <div className="flex h-screen bg-white">
      {/* <aside className="w-60 border-r p-4 flex flex-col">
        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-2">Bhanu Prakash's project</h2>
          <span className="text-sm text-gray-500">Free Plan</span>
        </div>
        <nav className="space-y-2 flex-1">
          <Button variant="ghost" className="w-full justify-start">
            <LayoutGrid className="mr-2 h-4 w-4" />
            Designs
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            <Upload className="mr-2 h-4 w-4" />
            Custom templates
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            <Settings className="mr-2 h-4 w-4" />
            Project settings
          </Button>
        </nav>
        <Button variant="outline" className="mt-auto">
          Invite to project
        </Button>
      </aside> */}
      <main className="flex-1 flex flex-col">
        <header className="border-b p-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Projects" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="projects">Projects</SelectItem>
                <SelectItem value="brand-kits">Brand kits</SelectItem>
                <SelectItem value="templates">Templates</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 transform text-gray-500" />
              <Input className="pl-8" placeholder="Search everything" />
            </div>
            <Button onClick={() => setIsNewDesignOpen(true)}>
              <Plus className="mr-2 h-4 w-4" /> New design
            </Button>
          </div>
        </header>
        <div className="p-6">
          <div className="mb-4 flex items-center justify-between">
            <h1 className="text-2xl font-bold">Designs</h1>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="icon">
                <LayoutGrid className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <List className="h-4 w-4" />
              </Button>
              <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Last modified" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="last-modified">Last modified</SelectItem>
                  <SelectItem value="name">Name</SelectItem>
                  <SelectItem value="type">Type</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[300px]">NAME</TableHead>
                <TableHead>TYPE</TableHead>
                <TableHead>SIZE</TableHead>
                <TableHead>LAST MODIFIED</TableHead>
                <TableHead className="text-right">ACTIONS</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {designs.map((design) => (
                <TableRow key={design.id}>
                  <TableCell className="font-medium">{design.name}</TableCell>
                  <TableCell>{design.type}</TableCell>
                  <TableCell>{design.size}</TableCell>
                  <TableCell>{design.lastModified}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </main>
      <NewDesignDialog isOpen={isNewDesignOpen} onClose={() => setIsNewDesignOpen(false)} />
    </div>
  )
}
