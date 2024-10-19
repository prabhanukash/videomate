'use client'
import React, { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft } from "lucide-react"

export function NewDesignDialog({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [width, setWidth] = useState('')
  const [height, setHeight] = useState('')
  const [unit, setUnit] = useState('px')
  const [sizeName, setSizeName] = useState('')

  const handleCreate = () => {
    // Handle creation logic here
    console.log({ width, height, unit, sizeName })
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <ArrowLeft className="mr-2 h-4 w-4 cursor-pointer" onClick={onClose} />
            Custom size
          </DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-3 gap-4">
            <Input placeholder="Width" value={width} onChange={(e) => setWidth(e.target.value)} />
            <Input placeholder="Height" value={height} onChange={(e) => setHeight(e.target.value)} />
            <Select value={unit} onValueChange={setUnit}>
              <SelectTrigger>
                <SelectValue placeholder="Unit" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="px">px</SelectItem>
                <SelectItem value="cm">cm</SelectItem>
                <SelectItem value="in">in</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Input placeholder="Size name (optional)" value={sizeName} onChange={(e) => setSizeName(e.target.value)} />
          <Button onClick={handleCreate}>Create custom size</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
