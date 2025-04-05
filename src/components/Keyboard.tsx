
import React from 'react';
import { cn } from '@/lib/utils';

interface KeyboardProps {
  onLetterClick: (letter: string) => void;
  showNumbers?: boolean;
  darkMode?: boolean;
  activeKey?: string | null;
}

const Keyboard: React.FC<KeyboardProps> = ({ 
  onLetterClick, 
  showNumbers = false, 
  darkMode = false,
  activeKey = null 
}) => {
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
          {row.map((key) => {
            const isActive = activeKey === key;
            
            return (
              <button
                key={key}
                onClick={() => onLetterClick(key)}
                className={cn(
                  "w-8 h-10 md:w-12 md:h-14 rounded-lg flex items-center justify-center",
                  darkMode
                    ? "bg-gradient-to-b from-gray-700 to-gray-900 hover:from-gray-600 hover:to-gray-800 text-white"
                    : "bg-gradient-to-b from-gray-100 to-gray-300 hover:from-gray-200 hover:to-gray-400 text-gray-700",
                  "text-lg md:text-2xl font-bold shadow-md",
                  "transition-all duration-300",
                  isActive 
                    ? "scale-110 ring-2 ring-offset-2 ring-purple-500 transform translate-y-[-2px]" 
                    : "active:scale-95"
                )}
              >
                {key}
              </button>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default Keyboard;
