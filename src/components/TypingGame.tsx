
import React, { useState, useEffect } from 'react';
import AnimatedLetter from './AnimatedLetter';
import Keyboard from './Keyboard';
import { useToast } from '@/components/ui/use-toast';

const TypingGame = () => {
  const [currentLetter, setCurrentLetter] = useState<string>('');
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const { toast } = useToast();

  useEffect(() => {
    // Add event listener for keyboard input
    const handleKeyPress = (event: KeyboardEvent) => {
      const key = event.key;
      
      // Check if the pressed key is a letter
      if (/^[a-zA-Z]$/.test(key)) {
        handleLetterPress(key.toUpperCase());
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    
    // Clean up the event listener
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [isAnimating]);

  const handleLetterPress = (letter: string) => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    
    // First clear the current letter
    setCurrentLetter('');
    
    // Set a short timeout before showing the new letter for better visual effect
    setTimeout(() => {
      setCurrentLetter(letter);
      setIsAnimating(false);
      
      // Show a toast with the letter name
      toast({
        title: letter,
        description: getWordForLetter(letter),
        duration: 2000,
      });
    }, 200);
  };

  const getWordForLetter = (letter: string): string => {
    const words: Record<string, string> = {
      'A': 'Apple',
      'B': 'Ball',
      'C': 'Cat',
      'D': 'Dog',
      'E': 'Elephant',
      'F': 'Fish',
      'G': 'Giraffe',
      'H': 'House',
      'I': 'Ice cream',
      'J': 'Jelly',
      'K': 'Kite',
      'L': 'Lion',
      'M': 'Monkey',
      'N': 'Nest',
      'O': 'Orange',
      'P': 'Penguin',
      'Q': 'Queen',
      'R': 'Rabbit',
      'S': 'Snake',
      'T': 'Tiger',
      'U': 'Umbrella',
      'V': 'Violin',
      'W': 'Whale',
      'X': 'X-ray',
      'Y': 'Yo-yo',
      'Z': 'Zebra'
    };
    
    return words[letter] || '';
  };

  return (
    <div className="bg-white rounded-2xl shadow-2xl p-6 md:p-8">
      <div className="text-center mb-6">
        <p className="text-xl text-gray-600">Type any letter on your keyboard or tap below!</p>
      </div>
      
      <div className="flex justify-center items-center h-60 md:h-80 mb-8 bg-gradient-to-r from-purple-100 to-pink-100 rounded-xl">
        {currentLetter ? (
          <AnimatedLetter letter={currentLetter} />
        ) : (
          <div className="text-gray-400 text-2xl">Type a letter to begin!</div>
        )}
      </div>
      
      <Keyboard onLetterClick={handleLetterPress} />
    </div>
  );
};

export default TypingGame;
