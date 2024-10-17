import React from 'react';
import JSONEditor from 'react-json-editor-ajrm';
import locale from 'react-json-editor-ajrm/locale/en';

interface JsonEditorPanelProps {
  elements: any[];
  updateCanvasFromJson: (json: string) => void;
  highlightSelectedElementInJson: (json: string) => string;
  customJsonEditorTheme: any;
}

const JsonEditorPanel: React.FC<JsonEditorPanelProps> = ({
  elements,
  updateCanvasFromJson,
  highlightSelectedElementInJson,
  customJsonEditorTheme,
}) => (
  <div className="w-96 bg-white p-4 overflow-y-auto border-r border-gray-300">
    <JSONEditor
      id="json-editor"
      placeholder={elements}
      theme={customJsonEditorTheme}
      locale={locale}
      height="100%"
      width="100%"
      colors={{
        default: '#333',
        background: 'white',
        string: '#C41A16',
        number: '#1A01CC',
        colon: '#333',
        keys: '#881391',
        keys_whiteSpace: '#333',
        primitive: '#1A01CC',
      }}
      style={{
        body: {
          fontSize: '14px',
          fontFamily: 'monospace',
        },
      }}
      onBlur={(value) => {
        if (value.jsObject) {
          updateCanvasFromJson(JSON.stringify(value.jsObject));
        }
      }}
      renderContent={highlightSelectedElementInJson}
    />
  </div>
);

export default JsonEditorPanel;