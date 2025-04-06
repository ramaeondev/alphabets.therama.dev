
import React, { useState } from 'react';
import { cn } from '@/lib/utils';

interface AnimatedLetterProps {
  letter: string;
}

const AnimatedLetter: React.FC<AnimatedLetterProps> = ({ letter }) => {
  // Get a random color for the letter
  const getRandomColor = () => {
    const colors = [
      'text-red-500',
      'text-blue-500',
      'text-green-500',
      'text-yellow-500',
      'text-purple-500',
      'text-pink-500',
      'text-orange-500',
      'text-teal-500'
    ];
    
    return colors[Math.floor(Math.random() * colors.length)];
  };
  
  const [letterColor] = useState(getRandomColor());
  
  return (
    <div className="relative flex items-center justify-center w-full h-32 md:h-40">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-gradient-to-r from-purple-200 to-pink-200 dark:from-purple-900 dark:to-pink-800 opacity-60 animate-pulse"></div>
      </div>
      <span
        className={cn(
          "text-8xl md:text-9xl font-bold transition-all duration-500 drop-shadow-lg z-10",
          letterColor,
          "scale-100 opacity-100"
        )}
      >
        {letter}
      </span>
    </div>
  );
};

export default AnimatedLetter;
