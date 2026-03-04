import React from 'react';

interface BlackKeyProps {
  note: string;
  octave: number;
  isActive: boolean;
  onKeyDown: () => void;
  onKeyUp: () => void;
  leftPercent: number;
  widthPercent: number;
}

export const BlackKey: React.FC<BlackKeyProps> = ({
  note,
  octave: _octave,
  isActive,
  onKeyDown,
  onKeyUp,
  leftPercent,
  widthPercent,
}) => {
  return (
    <button
      onMouseDown={onKeyDown}
      onMouseUp={onKeyUp}
      onMouseLeave={onKeyUp}
      onTouchStart={(e) => {
        e.preventDefault();
        onKeyDown();
      }}
      onTouchEnd={(e) => {
        e.preventDefault();
        onKeyUp();
      }}
      className={`
        absolute top-0 rounded-b-lg border-2 border-gray-900
        transition-all duration-75 z-10
        ${
          isActive
            ? 'bg-gradient-to-b from-gray-700 to-gray-800 shadow-inner'
            : 'bg-gradient-to-b from-gray-900 to-black hover:from-gray-800'
        }
      `}
      style={{
        left: `${leftPercent}%`,
        width: `${widthPercent}%`,
        height: '60%',
      }}
      aria-label={`${note}`}
    >
      <span className="absolute bottom-1 left-1/2 transform -translate-x-1/2 text-xs text-white font-semibold select-none">
        {note}
      </span>
    </button>
  );
};
