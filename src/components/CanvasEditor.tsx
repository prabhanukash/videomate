import React, { useState, useRef, useEffect } from 'react';
import { Stage, Layer, Rect, Text, Image, Transformer } from 'react-konva';
import { Image as ImageIcon, Type, Square, Undo, Redo, Save, Upload, Brackets, Maximize2, Check, X, Play, Pause, Edit2, Copy, Trash2 } from 'lucide-react';
import useImage from 'use-image';
import { AdSizes } from '../utils/adSizes';
import JSONEditor from 'react-json-editor-ajrm';
import locale from 'react-json-editor-ajrm/locale/en';
import LeftSidebar from './CanvasStage/LeftSidebar';
import { useElementManagement } from '../hooks/useElementManagement';
import { useAnimation } from '../hooks/useAnimation';
import { useJsonEditor } from '../hooks/useJsonEditor';


const CanvasEditor = () => {
  const [elements, setElements] = useState([]);
  const [selectedElement, setSelectedElement] = useState(null);
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [stageSize, setStageSize] = useState(AdSizes['300X250']);
  const [showJson, setShowJson] = useState(false);
  const [jsonContent, setJsonContent] = useState('');
  const [showResizeInputs, setShowResizeInputs] = useState(false);
  const [customWidth, setCustomWidth] = useState(stageSize.width);
  const [customHeight, setCustomHeight] = useState(stageSize.height);
  const [templateName, setTemplateName] = useState('Untitled Template');
  const [isEditingName, setIsEditingName] = useState(false);
  const [tempName, setTempName] = useState('');
  const stageRef = useRef(null);
  const transformerRef = useRef(null);
  const jsonEditorRef = useRef(null);
  const [cursorPosition, setCursorPosition] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const animationRef = useRef(null);
  const [clipboard, setClipboard] = useState(null);

  useEffect(() => {
    const checkDeselect = (e) => {
      if (e.target === e.target.getStage()) {
        setSelectedElement(null);
      }
    };

    const stage = stageRef.current;
    stage.on('click tap', checkDeselect);

    return () => {
      stage.off('click tap', checkDeselect);
    };
  }, []);

  useEffect(() => {
    if (selectedElement && transformerRef.current) {
      transformerRef.current.nodes([stageRef.current.findOne(`#${selectedElement.id}`)]);
      transformerRef.current.getLayer().batchDraw();
    }
  }, [selectedElement]);

  useEffect(() => {
    // Ensure elements is properly stringified
    setJsonContent(JSON.stringify(elements, null, 2));
  }, [elements]);

  const addElement = (type, event = null) => {
    let newElement = {
      id: Date.now().toString(),
      name: `New ${type}`,
      type,
      x: 100,
      y: 100,
      width: 100,
      height: 100,
      text: type === 'text' ? 'New Text' : '',
      fill: type === 'shape' ? 'rgba(255,255,255,0)' : 'black',
      fontSize: 20,
      fontFamily: 'Arial',
      rotation: 0,
      duration: 5,
      startTime: 0,
    };

    if (type === 'image' && event) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new window.Image();
        img.onload = () => {
          const aspect = img.width / img.height;
          newElement = {
            ...newElement,
            width: 200,
            height: 200 / aspect,
            image: e.target.result,
          };
          const newElements = [...elements, newElement];
          setElements(newElements);
          addToHistory(newElements);
        };
        img.src = e.target.result;
      };
      reader.readAsDataURL(file);
    } else {
      const newElements = [...elements, newElement];
      setElements(newElements);
      addToHistory(newElements);
    }
  };

  const handleElementClick = (element) => {
    setSelectedElement(element);
  };

  const updateElement = (id, newProps) => {
    const newElements = elements.map(el => el.id === id ? { ...el, ...newProps } : el);
    setElements(newElements);
    addToHistory(newElements);
    if (selectedElement && selectedElement.id === id) {
      setSelectedElement({ ...selectedElement, ...newProps });
    }
  };

  const addToHistory = (newElements) => {
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(newElements);
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  };

  const undo = () => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1;
      setHistoryIndex(newIndex);
      setElements(history[newIndex]);
    }
  };

  const redo = () => {
    if (historyIndex < history.length - 1) {
      const newIndex = historyIndex + 1;
      setHistoryIndex(newIndex);
      setElements(history[newIndex]);
    }
  };

  const handleDragEnd = (e, id) => {
    updateElement(id, { x: e.target.x(), y: e.target.y() });
  };

  const handleTransformEnd = (e, id) => {
    const node = e.target;
    updateElement(id, {
      x: node.x(),
      y: node.y(),
      width: node.width() * node.scaleX(),
      height: node.height() * node.scaleY(),
      rotation: node.rotation(),
    });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new window.Image();
      img.onload = () => {
        const aspect = img.width / img.height;
        const width = 200;
        const height = width / aspect;
        const newElement = {
          id: Date.now().toString(),
          type: 'image',
          x: 100,
          y: 100,
          width,
          height,
          image: event.target.result,
          duration: 5,
          startTime: 0,
        };
        const newElements = [...elements, newElement];
        setElements(newElements);
        addToHistory(newElements);
      };
      img.src = event.target.result;
    };
    reader.readAsDataURL(file);
  };

  const saveTemplate = () => {
    const template = JSON.stringify(elements);
    const blob = new Blob([template], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'template.json';
    a.click();
  };

  const loadTemplate = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (event) => {
      const loadedElements = JSON.parse(event.target.result);
      setElements(loadedElements);
      addToHistory(loadedElements);
    };
    reader.readAsText(file);
  };

  const updateCanvasFromJson = (newJsonContent) => {
    try {
      const newElements = JSON.parse(newJsonContent);
      setElements(newElements);
      addToHistory(newElements);
      setJsonContent(newJsonContent);
    } catch (error) {
      console.error('Invalid JSON:', error);
    }
  };

  const handleJsonChange = (editor, data, value) => {
    setJsonContent(value);
    try {
      const parsedJson = JSON.parse(value);
      updateCanvasFromJson(parsedJson);
    } catch (error) {
      console.error('Invalid JSON:', error);
    }
  };

  const formatJson = (json) => {
    try {
      return JSON.stringify(JSON.parse(json), null, 2);
    } catch {
      return json;
    }
  };

  const handleResize = () => {
    setStageSize({ width: customWidth, height: customHeight });
    setShowResizeInputs(false);
  };

  const handleNameClick = () => {
    setTempName(templateName);
    setIsEditingName(true);
  };

  const handleNameChange = (e) => {
    setTempName(e.target.value);
  };

  const handleNameSave = () => {
    setTemplateName(tempName);
    setIsEditingName(false);
  };

  const handleNameCancel = () => {
    setIsEditingName(false);
  };

  const handleNameKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleNameSave();
    } else if (e.key === 'Escape') {
      handleNameCancel();
    }
  };

  const ImageElement = ({ src, ...props }) => {
    const [image] = useImage(src);
    return <Image image={image} {...props} />;
  };

  useEffect(() => {
    if (jsonEditorRef.current) {
      const editor = jsonEditorRef.current;
      const selection = window.getSelection();
      const range = document.createRange();

      if (editor.childNodes.length > 0) {
        range.setStart(editor.childNodes[0], cursorPosition);
        range.collapse(true);
        selection.removeAllRanges();
        selection.addRange(range);
      }
    }
  }, [jsonContent, cursorPosition]);

  const playAnimation = () => {
    setIsPlaying(true);
    animationRef.current = requestAnimationFrame(animate);
  };

  const pauseAnimation = () => {
    setIsPlaying(false);
    cancelAnimationFrame(animationRef.current);
  };

  const animate = (timestamp) => {
    setCurrentTime((prevTime) => {
      const newTime = prevTime + 1 / 60; // Assuming 60 FPS
      return newTime > 10 ? 0 : newTime; // Reset after 10 seconds
    });
    animationRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    return () => {
      cancelAnimationFrame(animationRef.current);
    };
  }, []);

  const updateElementKeyframe = (elementId, time, properties) => {
    setElements((prevElements) =>
      prevElements.map((el) =>
        el.id === elementId
          ? {
              ...el,
              keyframes: {
                ...el.keyframes,
                [time]: { ...el.keyframes[time], ...properties },
              },
            }
          : el
      )
    );
  };

  const interpolateProperties = (element, time) => {
    const keyframes = Object.entries(element.keyframes || {}).sort(
      ([a], [b]) => parseFloat(a) - parseFloat(b)
    );

    if (keyframes.length === 0) return element;

    const [prevTime, prevProps] =
      keyframes.find(([t]) => parseFloat(t) > time) || keyframes[keyframes.length - 1];
    const [nextTime, nextProps] =
      keyframes.find(([t]) => parseFloat(t) > time) || keyframes[0];

    const progress =
      (time - parseFloat(prevTime)) / (parseFloat(nextTime) - parseFloat(prevTime));

    const interpolatedProps = {};
    for (const prop in prevProps) {
      if (typeof prevProps[prop] === 'number') {
        interpolatedProps[prop] =
          prevProps[prop] + (nextProps[prop] - prevProps[prop]) * progress;
      } else {
        interpolatedProps[prop] = prevProps[prop];
      }
    }

    return { ...element, ...interpolatedProps };
  };

  const customJsonEditorTheme = {
    background: 'white',
    background_warning: '#FFDADA',
    background_success: '#DAFFD9',
    background_error: '#FFDADA',
    text_color: '#333',
    string_color: '#C41A16',
    number_color: '#1A01CC',
    boolean_color: '#1A01CC',
    null_color: '#808080',
    key_color: '#881391',
    line_numbers: '#888',
    line_numbers_background: '#f0f0f0',
    line_numbers_border: '#ccc',
    border: '#ccc',
  };

  // Function to highlight the selected element in the JSON viewer
  const highlightSelectedElementInJson = (json) => {
    if (!selectedElement) return json;
    
    return json.replace(
      new RegExp(`("id":\\s*"${selectedElement.id}"[^}]+})`, 'g'),
      (match) => `<span style="background-color: #e6f3ff;">${match}</span>`
    );
  };

  const copyElement = (id) => {
    const elementToCopy = elements.find(el => el.id === id);
    setClipboard(elementToCopy);
  };

  const pasteElement = () => {
    if (clipboard) {
      const newElement = {
        ...clipboard,
        id: Date.now().toString(),
        name: `${clipboard.name} (Copy)`,
        x: clipboard.x + 10,
        y: clipboard.y + 10,
      };
      setElements([...elements, newElement]);
      addToHistory([...elements, newElement]);
    }
  };

  const deleteElement = (id) => {
    const newElements = elements.filter(el => el.id !== id);
    setElements(newElements);
    addToHistory(newElements);
    if (selectedElement && selectedElement.id === id) {
      setSelectedElement(null);
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="bg-gray-100 p-4">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center">
            {isEditingName ? (
              <>
                <input
                  type="text"
                  value={tempName}
                  onChange={handleNameChange}
                  onKeyDown={handleNameKeyDown}
                  autoFocus
                  className="text-xl font-semibold bg-transparent border-b border-gray-300 focus:outline-none focus:border-blue-500 mr-2"
                />
                <button onClick={handleNameSave} className="p-1 text-green-500 hover:text-green-700">
                  <Check size={20} />
                </button>
                <button onClick={handleNameCancel} className="p-1 text-red-500 hover:text-red-700">
                  <X size={20} />
                </button>
              </>
            ) : (
              <h1 
                onClick={handleNameClick} 
                className="text-xl font-semibold cursor-pointer hover:text-blue-500"
              >
                {templateName}
              </h1>
            )}
          </div>
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
            <button onClick={undo} className="p-2 bg-blue-500 text-white rounded" disabled={historyIndex <= 0}>
              <Undo size={20} />
            </button>
            <button onClick={redo} className="p-2 bg-blue-500 text-white rounded" disabled={historyIndex >= history.length - 1}>
              <Redo size={20} />
            </button>
            <button onClick={saveTemplate} className="p-2 bg-blue-500 text-white rounded">
              <Save size={20} />
            </button>
            <label className="p-2 bg-blue-500 text-white rounded cursor-pointer">
              <Upload size={20} />
              <input type="file" className="hidden" onChange={loadTemplate} accept=".json" />
            </label>
            <button onClick={() => setShowJson(!showJson)} className="p-2 bg-blue-500 text-white rounded">
              <Brackets size={20} />
            </button>
            <button onClick={() => setShowResizeInputs(!showResizeInputs)} className="p-2 bg-blue-500 text-white rounded">
              <Maximize2 size={20} />
            </button>
          </div>
        </div>
        {showResizeInputs && (
          <div className="flex justify-end gap-2 mb-4">
            <input
              type="number"
              placeholder="Width"
              value={customWidth}
              onChange={(e) => setCustomWidth(Number(e.target.value))}
              className="w-24 p-2 border rounded"
            />
            <input
              type="number"
              placeholder="Height"
              value={customHeight}
              onChange={(e) => setCustomHeight(Number(e.target.value))}
              className="w-24 p-2 border rounded"
            />
            <button onClick={handleResize} className="p-2 bg-blue-500 text-white rounded">
              Resize
            </button>
          </div>
        )}
      </div>
      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar */}
        <LeftSidebar
          elements={elements}
          selectedElement={selectedElement}
          setSelectedElement={setSelectedElement}
          updateElement={updateElement}
          copyElement={copyElement}
          pasteElement={pasteElement}
          deleteElement={deleteElement}
        />
        
        {/* Main content area */}
        <div className="flex flex-1 overflow-hidden">
          {showJson && (
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
          )}
          <div className="flex-1 bg-gray-200 p-4 overflow-auto flex items-center justify-center">
            <div className="bg-white shadow-lg">
              <Stage
                width={stageSize.width}
                height={stageSize.height}
                ref={stageRef}
                onMouseDown={e => {
                  if (e.target === e.target.getStage()) {
                    setSelectedElement(null);
                  }
                }}
              >
                <Layer>
                  {elements.map((el) => {
                    const ElementComponent = el.type === 'text' ? Text : el.type === 'image' ? ImageElement : Rect;
                    return (
                      <ElementComponent
                        key={el.id}
                        {...el}
                        draggable
                        onClick={() => setSelectedElement(el)}
                        onDragEnd={(e) => handleDragEnd(e, el.id)}
                        onTransformEnd={(e) => handleTransformEnd(e, el.id)}
                        stroke={selectedElement && selectedElement.id === el.id ? 'blue' : undefined}
                        strokeWidth={selectedElement && selectedElement.id === el.id ? 2 : undefined}
                      />
                    );
                  })}
                  {selectedElement && (
                    <Transformer
                      ref={transformerRef}
                      boundBoxFunc={(oldBox, newBox) => {
                        if (newBox.width < 5 || newBox.height < 5) {
                          return oldBox;
                        }
                        return newBox;
                      }}
                    />
                  )}
                </Layer>
              </Stage>
            </div>
          </div>
          {/* Right sidebar for properties */}
          <div className="w-64 bg-gray-100 p-4 overflow-y-auto">
            <h2 className="text-lg font-semibold mb-4">Properties</h2>
            {selectedElement && (
              <div className="space-y-2">
                <label className="block">
                  X:
                  <input
                    type="number"
                    value={selectedElement.x}
                    onChange={(e) => updateElement(selectedElement.id, { x: Number(e.target.value) })}
                    className="w-full p-1 border rounded"
                  />
                </label>
                <label className="block">
                  Y:
                  <input
                    type="number"
                    value={selectedElement.y}
                    onChange={(e) => updateElement(selectedElement.id, { y: Number(e.target.value) })}
                    className="w-full p-1 border rounded"
                  />
                </label>
                <label className="block">
                  Width:
                  <input
                    type="number"
                    value={selectedElement.width}
                    onChange={(e) => updateElement(selectedElement.id, { width: Number(e.target.value) })}
                    className="w-full p-1 border rounded"
                  />
                </label>
                <label className="block">
                  Height:
                  <input
                    type="number"
                    value={selectedElement.height}
                    onChange={(e) => updateElement(selectedElement.id, { height: Number(e.target.value) })}
                    className="w-full p-1 border rounded"
                  />
                </label>
                <label className="block">
                  Rotation:
                  <input
                    type="number"
                    value={selectedElement.rotation}
                    onChange={(e) => updateElement(selectedElement.id, { rotation: Number(e.target.value) })}
                    className="w-full p-1 border rounded"
                  />
                </label>
                {selectedElement.type === 'text' && (
                  <>
                    <label className="block">
                      Text:
                      <input
                        type="text"
                        value={selectedElement.text}
                        onChange={(e) => updateElement(selectedElement.id, { text: e.target.value })}
                        className="w-full p-1 border rounded"
                      />
                    </label>
                    <label className="block">
                      Font Size:
                      <input
                        type="number"
                        value={selectedElement.fontSize}
                        onChange={(e) => updateElement(selectedElement.id, { fontSize: Number(e.target.value) })}
                        className="w-full p-1 border rounded"
                      />
                    </label>
                    <label className="block">
                      Font Family:
                      <select
                        value={selectedElement.fontFamily}
                        onChange={(e) => updateElement(selectedElement.id, { fontFamily: e.target.value })}
                        className="w-full p-1 border rounded"
                      >
                        <option value="Arial">Arial</option>
                        <option value="Helvetica">Helvetica</option>
                        <option value="Times New Roman">Times New Roman</option>
                        <option value="Courier New">Courier New</option>
                      </select>
                    </label>
                  </>
                )}
                {(selectedElement.type === 'shape' || selectedElement.type === 'text') && (
                  <label className="block">
                    Fill:
                    <input
                      type="color"
                      value={selectedElement.fill}
                      onChange={(e) => updateElement(selectedElement.id, { fill: e.target.value })}
                      className="w-full p-1 border rounded"
                    />
                  </label>
                )}
                <label className="block">
                  Start Time:
                  <input
                    type="number"
                    value={selectedElement.startTime}
                    onChange={(e) => updateElement(selectedElement.id, { startTime: Number(e.target.value) })}
                    className="w-full p-1 border rounded"
                  />
                </label>
                <label className="block">
                  Duration:
                  <input
                    type="number"
                    value={selectedElement.duration}
                    onChange={(e) => updateElement(selectedElement.id, { duration: Number(e.target.value) })}
                    className="w-full p-1 border rounded"
                  />
                </label>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="h-48 bg-gray-300 p-4">
        <h2 className="text-lg font-semibold mb-2">Timeline</h2>
        <div className="flex items-center space-x-2 mb-2">
          <button
            onClick={isPlaying ? pauseAnimation : playAnimation}
            className="p-2 bg-blue-500 text-white rounded"
          >
            {isPlaying ? <Pause size={20} /> : <Play size={20} />}
          </button>
          <input
            type="range"
            min="0"
            max="10"
            step="0.01"
            value={currentTime}
            onChange={(e) => setCurrentTime(parseFloat(e.target.value))}
            className="flex-1"
          />
          <span>{currentTime.toFixed(2)}s</span>
        </div>
        <div className="flex items-stretch space-x-2 h-24">
          {elements.map((el) => (
            <div
              key={el.id}
              className={`bg-blue-200 p-2 rounded flex-1 relative cursor-pointer ${
                selectedElement && selectedElement.id === el.id ? 'border-2 border-blue-500' : ''
              }`}
              style={{
                width: `${(el.duration / 10) * 100}%`,
                marginLeft: `${(el.startTime / 10) * 100}%`,
              }}
              onClick={() => setSelectedElement(el)}
            >
              <div className="text-xs font-semibold mb-1">{el.name || el.type}</div>
              {Object.entries(el.keyframes || {}).map(([time, props]) => (
                <div
                  key={time}
                  className="absolute w-2 h-2 bg-red-500 rounded-full cursor-pointer"
                  style={{ left: `${(parseFloat(time) / 10) * 100}%`, top: '50%' }}
                  onClick={() => {
                    setSelectedElement(el);
                    setCurrentTime(parseFloat(time));
                  }}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CanvasEditor;