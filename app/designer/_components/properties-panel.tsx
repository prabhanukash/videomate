import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';

interface PropertiesPanelProps {
  selectedElement: any;
  updateElement: (id: string, props: any) => void;
}

const PropertiesPanel: React.FC<PropertiesPanelProps> = ({ selectedElement, updateElement }) => {
  if (!selectedElement) return null;

  const renderCommonProperties = () => (
    <>
      <InputField
        label="X"
        value={selectedElement.x}
        onChange={(value) => updateElement(selectedElement.id, { x: Number(value) })}
      />
      <InputField
        label="Y"
        value={selectedElement.y}
        onChange={(value) => updateElement(selectedElement.id, { y: Number(value) })}
      />
      <InputField
        label="Width"
        value={selectedElement.width}
        onChange={(value) => updateElement(selectedElement.id, { width: Number(value) })}
      />
      <InputField
        label="Height"
        value={selectedElement.height}
        onChange={(value) => updateElement(selectedElement.id, { height: Number(value) })}
      />
      <InputField
        label="Rotation"
        value={selectedElement.rotation}
        onChange={(value) => updateElement(selectedElement.id, { rotation: Number(value) })}
      />
    </>
  );

  const renderTextProperties = () => (
    <>
      <InputField
        label="Text"
        value={selectedElement.text}
        onChange={(value) => updateElement(selectedElement.id, { text: value })}
      />
      <InputField
        label="Font Size"
        value={selectedElement.fontSize}
        onChange={(value) => updateElement(selectedElement.id, { fontSize: Number(value) })}
      />
      <SelectField
        label="Font Family"
        value={selectedElement.fontFamily}
        onChange={(value) => updateElement(selectedElement.id, { fontFamily: value })}
        options={[
          { value: 'Arial', label: 'Arial' },
          { value: 'Helvetica', label: 'Helvetica' },
          { value: 'Times New Roman', label: 'Times New Roman' },
          { value: 'Courier New', label: 'Courier New' }
        ]}
      />
    </>
  );

  const renderFillProperty = () => (
    <InputField
      label="Fill"
      type="color"
      value={selectedElement.fill}
      onChange={(value) => updateElement(selectedElement.id, { fill: value })}
    />
  );

  const renderAnimationProperties = () => (
    <>
      <InputField
        label="Start Time"
        value={selectedElement.startTime}
        onChange={(value) => updateElement(selectedElement.id, { startTime: Number(value) })}
      />
      <InputField
        label="Duration"
        value={selectedElement.duration}
        onChange={(value) => updateElement(selectedElement.id, { duration: Number(value) })}
      />
    </>
  );

  return (
    <Card className="w-full">
      <Tabs defaultValue="properties">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="properties">Properties</TabsTrigger>
          <TabsTrigger value="animation">Animation</TabsTrigger>
        </TabsList>
        <TabsContent value="properties">
          <CardContent className="space-y-2">
            {renderCommonProperties()}
            {selectedElement.type === 'text' && renderTextProperties()}
            {(selectedElement.type === 'shape' || selectedElement.type === 'text') &&
              renderFillProperty()}
          </CardContent>
        </TabsContent>
        <TabsContent value="animation">
          <CardContent className="space-y-2">{renderAnimationProperties()}</CardContent>
        </TabsContent>
      </Tabs>
    </Card>
  );
};

interface InputFieldProps {
  label: string;
  value: string | number;
  onChange: (value: string) => void;
  type?: string;
}

const InputField: React.FC<InputFieldProps> = ({ label, value, onChange, type = 'text' }) => (
  <div className="space-y-1">
    <Label htmlFor={label}>{label}</Label>
    <Input id={label} type={type} value={value} onChange={(e) => onChange(e.target.value)} />
  </div>
);

interface SelectFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
}

const SelectField: React.FC<SelectFieldProps> = ({ label, value, onChange, options }) => (
  <div className="space-y-1">
    <Label htmlFor={label}>{label}</Label>
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger id={label}>
        <SelectValue>{value}</SelectValue>
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  </div>
);

export default PropertiesPanel;
