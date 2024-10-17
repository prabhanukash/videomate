import React from 'react';
import { Play, Pause, ArrowLeft, Rewind } from 'lucide-react';

interface TimelineProps {
  elements: any[];
  selectedElement: any;
  currentTime: number;
  isPlaying: boolean;
  setSelectedElement: (element: any) => void;
  setCurrentTime: (time: number) => void;
  playAnimation: () => void;
  pauseAnimation: () => void;
}

const Timeline: React.FC<TimelineProps> = ({
  elements,
  selectedElement,
  currentTime,
  isPlaying,
  setSelectedElement,
  setCurrentTime,
  playAnimation,
  pauseAnimation,
}) => {
  const sortElementsByZIndex = (elements: any[]) => {
    return [...elements].sort((a, b) => {
      if (a.zIndex !== undefined && b.zIndex !== undefined) {
        return a.zIndex - b.zIndex;
      }
      return elements.indexOf(a) - elements.indexOf(b);
    });
  };

  return (
    <div className="h-64 bg-gray-100 p-4 overflow-hidden">
      <div className="flex items-center space-x-2 mb-2">
        <button
          onClick={isPlaying ? pauseAnimation : playAnimation}
          className="p-2 bg-blue-500 text-white rounded-full"
        >
          {isPlaying ? <Pause size={20} /> : <Play size={20} />}
        </button>
        <button
          onClick={() => setCurrentTime(0)}
          className="p-2 bg-blue-500 text-white rounded-full"
        >
          <ArrowLeft size={20} />
        </button>
        <button
          onClick={() => setCurrentTime(Math.max(0, currentTime - 1))}
          className="p-2 bg-blue-500 text-white rounded-full"
        >
          <Rewind size={20} />
        </button>
        <div className="bg-white rounded px-2 py-1 text-sm font-medium">
          {currentTime.toFixed(2)}
        </div>
      </div>
      <div className="relative h-40 bg-white">
        <div className="absolute top-0 left-0 right-0 h-6 flex items-end px-8 border-b border-gray-200">
          {[...Array(13)].map((_, i) => (
            <span key={i} className="absolute text-xs text-gray-500" style={{ left: `${i * (100 / 12)}%` }}>
              {i}s
            </span>
          ))}
        </div>
        <div className="absolute top-6 left-0 right-0 bottom-0 overflow-y-auto">
          <div className="relative">
            {sortElementsByZIndex(elements).reverse().map((el, index) => (
              <div
                key={el.id}
                className="h-8 relative flex items-center hover:bg-gray-100"
              >
                <div className="flex items-center w-100">
                  <div className="absolute left-0 top-0 bottom-0 flex items-center justify-center">
                    <span className="w-2 h-2 bg-gray-400 rounded-full"></span>
                  </div>
                  <div className="absolute left-8 top-0 bottom-0 flex items-center">
                    <span className="text-xs font-medium text-gray-600 truncate">
                      Track {sortElementsByZIndex(elements).length - index}
                    </span>
                  </div>
                </div>
                <div
                  className={`absolute h-6 rounded cursor-pointer ${
                    selectedElement && selectedElement.id === el.id ? 'bg-blue-500' : 'bg-gray-700'
                  }`}
                  style={{
                    left: `calc(40px + ${(el.startTime / 10) * 100}%)`,
                    width: `${(el.duration / 10) * 100}%`,
                  }}
                  onClick={() => setSelectedElement(el)}
                >
                  <div className={`h-full flex items-center justify-center text-xs font-medium truncate px-1 ${
                    selectedElement && selectedElement.id === el.id ? 'text-white' : 'text-gray-300'
                  }`}>
                    {el.type.charAt(0).toUpperCase() + el.type.slice(1)}
                  </div>
                </div>
                {Object.entries(el.keyframes || {}).map(([time, props]) => (
                  <div
                    key={time}
                    className="absolute w-2 h-2 bg-red-500 rounded-full cursor-pointer"
                    style={{ left: `calc(40px + ${(parseFloat(time) / 10) * 100}%)`, top: '50%', transform: 'translateY(-50%)' }}
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
        {/* Red indicator at the top and vertical line */}
        <div
          className="absolute top-0 bottom-0 w-0.5 bg-red-500 pointer-events-none"
          style={{ left: `calc(40px + ${(currentTime / 10) * 100}%)` }}
        >
          <div className="w-3 h-3 bg-red-500 rounded-full -mt-1.5 -ml-1" />
        </div>
      </div>
    </div>
  );
};

export default Timeline;