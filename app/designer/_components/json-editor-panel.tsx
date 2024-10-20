import React from 'react';
import dynamic from 'next/dynamic';

const JsonEditor = dynamic(() => import('react-json-editor-ajrm'), { ssr: false });

// Define a type for the JSON data
type JsonData = Record<string, unknown>;

interface JsonEditorPanelProps {
  data: JsonData;
  onChange: (data: JsonData) => void;
  className?: string;
}

const JsonEditorPanel: React.FC<JsonEditorPanelProps> = ({ data, onChange, className }) => {
  const handleChange = (value: { jsObject: JsonData }) => {
    onChange(value.jsObject);
  };

  return (
    <div className={className}>
      <JsonEditor
        placeholder={data}
        theme="light_mitsuketa_tribute"
        locale="en"
        height="550px"
        width="100%"
        onChange={handleChange}
        colors={{
          background: 'white',
          default: 'black'
        }}
        style={{
          body: {
            fontSize: '14px'
          }
        }}
        confirmGood={false}
        viewOnly={false}
        modifyErrorText={(err) => err}
        onBlur={() => {}}
        waitAfterKeyPress={1500}
        statusBar={false}
        keysWhiteSpace="normal"
      />
    </div>
  );
};

export default JsonEditorPanel;
