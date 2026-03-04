import React from 'react';

interface WhiteKeyProps {
  note: string;
  octave: number;
  isActive: boolean;
  onKeyDown: () => void;
  onKeyUp: () => void;
  isLast: boolean;
}

export const WhiteKey: React.FC<WhiteKeyProps> = ({
  note,
  octave,
  isActive,
  onKeyDown,
  onKeyUp,
  isLast,
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
        relative flex-1 h-full rounded-b-lg border-2 border-gray-700
        transition-all duration-75
        ${
          isActive
            ? 'bg-gradient-to-b from-gray-300 to-gray-400 shadow-inner'
            : 'bg-gradient-to-b from-white to-gray-100 hover:from-gray-50 hover:to-gray-200'
        }
      `}
      style={{ marginRight: isLast ? 0 : '2px' }}
      aria-label={`${note}${octave}`}
    >
      <span className="absolute bottom-2 left-1/2 transform -translate-x-1/2 text-xs text-gray-500 font-semibold select-none">
        {note}{octave}
      </span>
    </button>
  );
};
