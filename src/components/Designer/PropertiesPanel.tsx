import React, { useState } from 'react';
import { Tab } from '@headlessui/react';

interface PropertiesPanelProps {
  selectedElement: any;
  updateElement: (id: string, props: any) => void;
}

const PropertiesPanel: React.FC<PropertiesPanelProps> = ({ selectedElement, updateElement }) => {
  const [selectedTab, setSelectedTab] = useState(0);

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
          { value: 'Courier New', label: 'Courier New' },
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
    <div className="w-64 bg-gray-100 p-4 overflow-y-auto">
      <Tab.Group selectedIndex={selectedTab} onChange={setSelectedTab}>
        <Tab.List className="flex space-x-1 rounded-xl bg-blue-900/20 p-1">
          <Tab className={({ selected }) =>
            `w-full rounded-lg py-0.5 text-sm font-medium leading-5 text-blue-700
             ${selected ? 'bg-white shadow' : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'}`
          }>
            Properties
          </Tab>
          <Tab className={({ selected }) =>
            `w-full rounded-lg py-0.5 text-sm font-medium leading-5 text-blue-700
             ${selected ? 'bg-white shadow' : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'}`
          }>
            Animation
          </Tab>
        </Tab.List>
        <Tab.Panels className="mt-2">
          <Tab.Panel className="rounded-xl bg-white p-3">
            <div className="space-y-2">
              {renderCommonProperties()}
              {selectedElement.type === 'text' && renderTextProperties()}
              {(selectedElement.type === 'shape' || selectedElement.type === 'text') && renderFillProperty()}
            </div>
          </Tab.Panel>
          <Tab.Panel className="rounded-xl bg-white p-3">
            <div className="space-y-2">
              {renderAnimationProperties()}
            </div>
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
};

interface InputFieldProps {
  label: string;
  value: string | number;
  onChange: (value: string) => void;
  type?: string;
}

const InputField: React.FC<InputFieldProps> = ({ label, value, onChange, type = 'text' }) => (
  <label className="block">
    {label}:
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full p-1 border rounded"
    />
  </label>
);

interface SelectFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
}

const SelectField: React.FC<SelectFieldProps> = ({ label, value, onChange, options }) => (
  <label className="block">
    {label}:
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full p-1 border rounded"
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  </label>
);

export default PropertiesPanel;