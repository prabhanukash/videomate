import React from 'react';

interface TimelineProgressorProps {
  height?: number;
  color?: string;
  className?: string;
  topWidth?: number;
  topHeight?: number;
}

export default function TimelineProgressor({
  height = 200,
  color = '#EF4444',
  className = '',
  topWidth = 16,
  topHeight = 24 // Height of the top part
}: TimelineProgressorProps) {
  const halfTopWidth = topWidth / 2;

  return (
    <svg
      width={topWidth}
      height={height}
      viewBox={`0 0 ${topWidth} ${height}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}>
      <path
        d={`
          M0 0
          H${topWidth}
          V${topHeight - 6}
          L${halfTopWidth} ${topHeight}
          L0 ${topHeight - 6}
          Z
        `}
        fill={color}
      />
      <rect x={halfTopWidth - 1} y={topHeight} width="2" height={height - topHeight} fill={color} />
    </svg>
  );
}
