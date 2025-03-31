
import React from 'react';
import { cn } from '@/lib/utils';

interface KeyboardProps {
  onLetterClick: (letter: string) => void;
  showNumbers?: boolean;
}

const Keyboard: React.FC<KeyboardProps> = ({ onLetterClick, showNumbers = false }) => {
  const alphabetRows = [
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
    ['Z', 'X', 'C', 'V', 'B', 'N', 'M']
  ];
  
  const numberRow = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
  
  const rows = showNumbers ? [numberRow, ...alphabetRows] : alphabetRows;
  
  return (
    <div className="keyboard-container">
      {rows.map((row, rowIndex) => (
        <div key={rowIndex} className="flex justify-center space-x-1 mb-1">
          {row.map((key) => (
            <button
              key={key}
              onClick={() => onLetterClick(key)}
              className={cn(
                "w-8 h-10 md:w-12 md:h-14 rounded-lg flex items-center justify-center",
                "bg-gradient-to-b from-gray-100 to-gray-300 hover:from-gray-200 hover:to-gray-400",
                "text-lg md:text-2xl font-bold text-gray-700 shadow-md",
                "transition-transform active:scale-95"
              )}
            >
              {key}
            </button>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Keyboard;
