import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';

// Define a type for the element
interface Element {
  id: string;
  type: string;
  [key: string]: string | number | boolean; // For other properties that might vary based on element type
}

interface PropertiesPanelProps {
  selectedElement: Element | null;
  onElementUpdate: (id: string, updates: Partial<Element>) => void;
}

const PropertiesPanel: React.FC<PropertiesPanelProps> = ({ selectedElement, onElementUpdate }) => {
  if (!selectedElement) {
    return <div>No element selected</div>;
  }

  const handleInputChange = (key: string, value: string | number | boolean) => {
    onElementUpdate(selectedElement.id, { [key]: value });
  };

  return (
    <ScrollArea className="h-[calc(100vh-2rem)] p-4">
      <div className="space-y-4">
        {Object.entries(selectedElement).map(([key, value]) => {
          if (key === 'id' || key === 'type') {
            return (
              <div key={key}>
                <Label htmlFor={key}>{key}</Label>
                <Input id={key} value={value.toString()} disabled />
              </div>
            );
          }
          return (
            <div key={key}>
              <Label htmlFor={key}>{key}</Label>
              <Input
                id={key}
                value={value.toString()}
                onChange={(e) => handleInputChange(key, e.target.value)}
              />
            </div>
          );
        })}
      </div>
    </ScrollArea>
  );
};

export default PropertiesPanel;
