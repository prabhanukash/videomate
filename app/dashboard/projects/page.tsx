import { Button } from '@/components/ui/button'
import { Plus, PackageOpen } from 'lucide-react'
import React from 'react'
import Image from 'next/image'
export default function ProjectsPage() {
  return (
    <main className="flex flex-col gap-2 lg:gap-2 min-h-[90vh] w-full">
      <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm space-y-4">
        {/* insert image here */}
        <div className="flex flex-col items-center text-center">
          <PackageOpen className="h-48 w-48 text-muted-foreground" />
          <h1 className="text-2xl font-bold tracking-tight">
            Create your first template
          </h1>
          <p className="text-sm text-muted-foreground mb-3">
            Templates are reusable designs that you can use to create new designs.
          </p>
          <Button>
            <Plus className="mr-2 h-4 w-4" /> Create a template
          </Button>
        </div>
      </div>
    </main>)
}
