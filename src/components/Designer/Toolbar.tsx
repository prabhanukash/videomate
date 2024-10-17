import React from 'react';
import { 
  Type, Square, ImageIcon, Video, Undo, Redo, 
  LucideFileJson, Upload, Braces, Maximize2, LucideTimerReset 
} from 'lucide-react';

interface ToolbarProps {
  addElement: (type: string) => void;
  undo: () => void;
  redo: () => void;
  historyIndex: number;
  historyLength: number;
  saveTemplate: () => void;
  loadTemplate: (event: React.ChangeEvent<HTMLInputElement>) => void;
  toggleJson: () => void;
  toggleResizeInputs: () => void;
  showVersionHistory: () => void;
  handleImageUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleVideoUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Toolbar: React.FC<ToolbarProps> = ({
  addElement,
  undo,
  redo,
  historyIndex,
  historyLength,
  saveTemplate,
  loadTemplate,
  toggleJson,
  toggleResizeInputs,
  showVersionHistory,
  handleImageUpload,
  handleVideoUpload
}) => {
  return (
    <div className="flex gap-2">
      <button onClick={() => addElement('text')} className="p-2 bg-blue-500 text-white rounded">
        <Type size={20} />
      </button>
      <button onClick={() => addElement('shape')} className="p-2 bg-blue-500 text-white rounded">
        <Square size={20} />
      </button>
      <label className="p-2 bg-blue-500 text-white rounded cursor-pointer">
        <ImageIcon size={20} />
        <input type="file" className="hidden" onChange={handleImageUpload} accept="image/*" />
      </label>
      <label className="p-2 bg-blue-500 text-white rounded cursor-pointer">
        <Video size={20} />
        <input type="file" className="hidden" onChange={handleVideoUpload} accept="video/*" />
      </label>
      <button onClick={undo} className="p-2 bg-blue-500 text-white rounded" disabled={historyIndex <= 0}>
        <Undo size={20} />
      </button>
      <button onClick={redo} className="p-2 bg-blue-500 text-white rounded" disabled={historyIndex >= historyLength - 1}>
        <Redo size={20} />
      </button>
      <button onClick={saveTemplate} className="p-2 bg-blue-500 text-white rounded">
        <LucideFileJson size={20} />
      </button>
      <label className="p-2 bg-blue-500 text-white rounded cursor-pointer">
        <Upload size={20} />
        <input type="file" className="hidden" onChange={loadTemplate} accept=".json" />
      </label>
      <button onClick={toggleJson} className="p-2 bg-blue-500 text-white rounded">
        <Braces size={20} />
      </button>
      <button onClick={toggleResizeInputs} className="p-2 bg-blue-500 text-white rounded">
        <Maximize2 size={20} />
      </button>
      <button onClick={showVersionHistory} className="p-2 bg-blue-500 text-white rounded">
        <LucideTimerReset size={20} />
      </button>
    </div>
  );
};

export default Toolbar;