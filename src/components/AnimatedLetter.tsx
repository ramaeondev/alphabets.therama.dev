
import React, { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface AnimatedLetterProps {
  letter: string;
}

const AnimatedLetter: React.FC<AnimatedLetterProps> = ({ letter }) => {
  const [animationState, setAnimationState] = useState<'entering' | 'visible' | 'exiting'>('entering');
  
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
  
  useEffect(() => {
    // Set to visible after a short delay
    const visibleTimer = setTimeout(() => {
      setAnimationState('visible');
    }, 100);
    
    return () => clearTimeout(visibleTimer);
  }, [letter]);
  
  return (
    <div className="relative flex items-center justify-center w-full h-full">
      <span
        className={cn(
          "text-9xl md:text-[12rem] font-bold transition-all duration-500 transform",
          letterColor,
          animationState === 'entering' && "scale-0 opacity-0",
          animationState === 'visible' && "scale-100 opacity-100 animate-bounce",
          animationState === 'exiting' && "scale-0 opacity-0"
        )}
      >
        {letter}
      </span>
    </div>
  );
};

export default AnimatedLetter;
