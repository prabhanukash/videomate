import React, { useState, useRef, useEffect } from 'react';
import { Stage, Layer, Rect, Text, Image, Transformer } from 'react-konva';
import { Image as ImageIcon, Type, Square, Undo, Redo, Save, Upload } from 'lucide-react';
import useImage from 'use-image';

const CanvasEditor = () => {
  const [elements, setElements] = useState([]);
  const [selectedElement, setSelectedElement] = useState(null);
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [stageSize, setStageSize] = useState({ width: 1080, height: 1080 });
  const stageRef = useRef(null);
  const transformerRef = useRef(null);

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

  const addElement = (type) => {
    const newElement = {
      id: Date.now().toString(),
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
    const newElements = [...elements, newElement];
    setElements(newElements);
    addToHistory(newElements);
  };

  const handleElementClick = (element) => {
    setSelectedElement(element);
  };

  const updateElement = (id, newProps) => {
    const newElements = elements.map(el => el.id === id ? { ...el, ...newProps } : el);
    setElements(newElements);
    addToHistory(newElements);
  };

  const addToHistory = (newElements) => {
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(newElements);
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  };

  const undo = () => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1);
      setElements(history[historyIndex - 1]);
    }
  };

  const redo = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1);
      setElements(history[historyIndex + 1]);
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

  const ImageElement = ({ src, ...props }) => {
    const [image] = useImage(src);
    return <Image image={image} {...props} />;
  };

  return (
    <div className="flex h-screen">
      <div className="w-64 bg-gray-100 p-4">
        <h2 className="text-lg font-semibold mb-4">Tools</h2>
        <div className="flex flex-wrap gap-2">
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
        </div>
      </div>
      <div className="flex-1 flex flex-col">
        <div className="flex-1 bg-gray-200 p-4 overflow-auto">
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
                    id={el.id}
                    {...el}
                    draggable
                    onClick={() => handleElementClick(el)}
                    onDragEnd={(e) => handleDragEnd(e, el.id)}
                    onTransformEnd={(e) => handleTransformEnd(e, el.id)}
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
        <div className="h-32 bg-gray-300 p-4">
          <h2 className="text-lg font-semibold mb-2">Timeline</h2>
          <div className="flex items-center space-x-2">
            {elements.map((el) => (
              <div
                key={el.id}
                className="bg-blue-200 p-2 rounded"
                style={{
                  width: `${(el.duration / 10) * 100}%`,
                  marginLeft: `${(el.startTime / 10) * 100}%`,
                }}
              >
                {el.type}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="w-64 bg-gray-100 p-4">
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
  );
};

export default CanvasEditor;