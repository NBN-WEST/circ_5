import React from 'react';
import { MusicalKey } from '../../data/keys';

interface CircleProps {
  keys: MusicalKey[];
  selectedKey: MusicalKey | null;
  onKeySelect: (key: MusicalKey) => void;
}

export const Circle: React.FC<CircleProps> = ({ keys, selectedKey, onKeySelect }) => {
  const centerX = 250;
  const centerY = 250;
  const outerRadius = 220;
  const middleRadius = 160;
  const innerRadius = 130;

  const getPosition = (angle: number, radius: number) => {
    const rad = ((angle - 90) * Math.PI) / 180;
    return {
      x: centerX + radius * Math.cos(rad),
      y: centerY + radius * Math.sin(rad),
    };
  };

  return (
    <svg viewBox="0 0 500 500" className="w-full h-auto">
      <defs>
        <radialGradient id="circleGradient" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgba(139, 92, 246, 0.2)" />
          <stop offset="100%" stopColor="rgba(59, 130, 246, 0.1)" />
        </radialGradient>

        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <circle
        cx={centerX}
        cy={centerY}
        r={outerRadius}
        fill="url(#circleGradient)"
        stroke="rgba(255,255,255,0.2)"
        strokeWidth="2"
      />

      <circle
        cx={centerX}
        cy={centerY}
        r={middleRadius}
        fill="rgba(255,255,255,0.05)"
        stroke="rgba(255,255,255,0.3)"
        strokeWidth="2"
      />

      <circle
        cx={centerX}
        cy={centerY}
        r={innerRadius - 30}
        fill="rgba(255,255,255,0.08)"
        stroke="rgba(255,255,255,0.3)"
        strokeWidth="2"
      />

      {keys.map((key, idx) => {
        const outer = getPosition(key.angle, outerRadius);
        return (
          <line
            key={`line-${idx}`}
            x1={centerX}
            y1={centerY}
            x2={outer.x}
            y2={outer.y}
            stroke="rgba(255,255,255,0.1)"
            strokeWidth="1"
          />
        );
      })}

      {keys.map((key) => {
        const pos = getPosition(key.angle, outerRadius - 30);
        const isSelected = selectedKey?.name === key.name;

        return (
          <g key={`major-${key.name}`}>
            <circle
              cx={pos.x}
              cy={pos.y}
              r={isSelected ? 34 : 30}
              fill={isSelected ? '#fbbf24' : '#60a5fa'}
              stroke="white"
              strokeWidth="3"
              className="cursor-pointer transition-all duration-200 hover:scale-110"
              onClick={() => onKeySelect(key)}
              filter={isSelected ? 'url(#glow)' : undefined}
            />
            <text
              x={pos.x}
              y={pos.y}
              textAnchor="middle"
              dominantBaseline="middle"
              fill="white"
              fontSize="18"
              fontWeight="bold"
              className="cursor-pointer select-none pointer-events-none"
            >
              {key.name}
            </text>

            {(key.sharps > 0 || key.flats > 0) && (
              <text
                x={pos.x}
                y={pos.y + 20}
                textAnchor="middle"
                fill="white"
                fontSize="10"
                className="pointer-events-none"
              >
                {key.sharps > 0 ? `${key.sharps}#` : `${key.flats}b`}
              </text>
            )}
          </g>
        );
      })}

      {keys.map((key) => {
        const pos = getPosition(key.angle, innerRadius);
        const isSelected = selectedKey?.name === key.name;

        return (
          <g key={`minor-${key.name}`}>
            <circle
              cx={pos.x}
              cy={pos.y}
              r={isSelected ? 26 : 22}
              fill={isSelected ? '#fb923c' : '#8b5cf6'}
              stroke="white"
              strokeWidth="2"
              className="cursor-pointer transition-all duration-200 hover:scale-110"
              onClick={() => onKeySelect(key)}
              filter={isSelected ? 'url(#glow)' : undefined}
            />
            <text
              x={pos.x}
              y={pos.y}
              textAnchor="middle"
              dominantBaseline="middle"
              fill="white"
              fontSize="14"
              fontWeight="bold"
              className="cursor-pointer select-none pointer-events-none"
            >
              {key.name.toLowerCase()}
            </text>
          </g>
        );
      })}

      <text
        x={centerX}
        y={centerY - 10}
        textAnchor="middle"
        fill="white"
        fontSize="16"
        fontWeight="bold"
        className="select-none"
      >
        Circolo
      </text>
      <text
        x={centerX}
        y={centerY + 10}
        textAnchor="middle"
        fill="white"
        fontSize="16"
        fontWeight="bold"
        className="select-none"
      >
        delle Quinte
      </text>
    </svg>
  );
};
