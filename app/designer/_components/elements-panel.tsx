import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';

// Define a type for the element
interface Element {
  id: string;
  type: string;
  [key: string]: string | number; // For other properties that might vary based on element type
}

interface ElementsPanelProps {
  elements: Element[];
  selectedElement: Element | null;
  onElementSelect: (element: Element) => void;
  onElementUpdate: (id: string, updates: Partial<Element>) => void;
}

const ElementsPanel: React.FC<ElementsPanelProps> = ({
  elements,
  selectedElement,
  onElementSelect,
  onElementUpdate
}) => {
  return (
    <div className="p-4">
      <Tabs defaultValue="elements" className="w-full">
        <TabsList>
          <TabsTrigger value="elements">Elements</TabsTrigger>
          <TabsTrigger value="properties">Properties</TabsTrigger>
        </TabsList>
        <TabsContent value="elements">
          <ScrollArea className="h-[300px]">
            {elements.map((element) => (
              <Button
                key={element.id}
                onClick={() => onElementSelect(element)}
                variant={selectedElement?.id === element.id ? 'secondary' : 'ghost'}
                className="w-full justify-start">
                {element.type}
              </Button>
            ))}
          </ScrollArea>
        </TabsContent>
        <TabsContent value="properties">
          {selectedElement && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="elementType">Type</Label>
                <Input id="elementType" value={selectedElement.type} disabled />
              </div>
              {Object.entries(selectedElement).map(([key, value]) => {
                if (key !== 'id' && key !== 'type') {
                  return (
                    <div key={key}>
                      <Label htmlFor={key}>{key}</Label>
                      <Input
                        id={key}
                        value={value.toString()}
                        onChange={(e) =>
                          onElementUpdate(selectedElement.id, { [key]: e.target.value })
                        }
                      />
                    </div>
                  );
                }
                return null;
              })}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ElementsPanel;
