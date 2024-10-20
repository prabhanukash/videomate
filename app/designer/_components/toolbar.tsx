import React from 'react';
import { Button } from '@/components/ui/button';
import { Image, Layers, Square, Film, Rss, Grid, Ruler } from 'lucide-react';

const tools = [
  { icon: Image, label: 'Insert' },
  { icon: Layers, label: 'Layers' },
  { icon: Square, label: 'Templates' },
  { icon: Film, label: 'Slides' },
  { icon: Rss, label: 'Feed' },
  { icon: Grid, label: 'Apps' },
  { icon: Ruler, label: 'Sizes' }
];

export default function Toolbar() {
  return (
    <div className="w-16 bg-gray-800 flex flex-col items-center py-4 space-y-4 ">
      {tools.map((tool, index) => (
        <Button key={index} variant="ghost" size="icon" className="text-gray-400 hover:text-white">
          <tool.icon className="h-6 w-6" />
        </Button>
      ))}
    </div>
  );
}
