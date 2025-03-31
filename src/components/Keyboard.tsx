
import React from 'react';
import { cn } from '@/lib/utils';

interface KeyboardProps {
  onLetterClick: (letter: string) => void;
}

const Keyboard: React.FC<KeyboardProps> = ({ onLetterClick }) => {
  const rows = [
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
    ['Z', 'X', 'C', 'V', 'B', 'N', 'M']
  ];
  
  return (
    <div className="keyboard-container">
      {rows.map((row, rowIndex) => (
        <div key={rowIndex} className="flex justify-center space-x-1 mb-1">
          {row.map((letter) => (
            <button
              key={letter}
              onClick={() => onLetterClick(letter)}
              className={cn(
                "w-8 h-10 md:w-12 md:h-14 rounded-lg flex items-center justify-center",
                "bg-gradient-to-b from-gray-100 to-gray-300 hover:from-gray-200 hover:to-gray-400",
                "text-lg md:text-2xl font-bold text-gray-700 shadow-md",
                "transition-transform active:scale-95"
              )}
            >
              {letter}
            </button>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Keyboard;
