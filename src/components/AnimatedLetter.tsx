
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
    <div className="relative flex items-center justify-center w-full h-40">
      <span
        className={cn(
          "text-9xl md:text-[12rem] font-bold transition-all duration-500",
          letterColor,
          "scale-100 opacity-100" // No continuous animation
        )}
      >
        {letter}
      </span>
    </div>
  );
};

export default AnimatedLetter;
