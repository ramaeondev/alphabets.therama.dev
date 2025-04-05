
import React, { useState } from 'react';

interface ImageDisplayProps {
  word: string;
  imageUrl: string;
}

const ImageDisplay: React.FC<ImageDisplayProps> = ({ word, imageUrl }) => {
  const [hasError, setHasError] = useState(false);
  
  // Check if the word represents a number
  const isNumeric = /^\d+$/.test(word) || ['Zero', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine'].includes(word);
  
  // If it's a number, don't display an image
  if (isNumeric) {
    return (
      <div className="flex flex-col items-center mt-4">
        <div className="text-xl font-semibold text-gray-700 mb-2">{word}</div>
      </div>
    );
  }

  // Generate a colorful background for fallback
  const getColorForWord = (word: string) => {
    const colors = [
      'bg-red-200', 'bg-blue-200', 'bg-green-200', 'bg-yellow-200', 
      'bg-purple-200', 'bg-pink-200', 'bg-indigo-200', 'bg-teal-200'
    ];
    // Use the first character's code to select a color
    const index = word.charCodeAt(0) % colors.length;
    return colors[index];
  };

  // Generate a placeholder image with the word
  const generatePlaceholderImage = () => {
    const bgColor = getColorForWord(word);
    const letter = word.charAt(0).toUpperCase();
    
    return (
      <div className={`w-full h-full flex items-center justify-center ${bgColor}`}>
        <div className="text-center">
          <div className="text-4xl font-bold">{letter}</div>
          <div className="text-sm mt-1">{word}</div>
        </div>
      </div>
    );
  };
  
  // Handle image loading error
  const handleImageError = () => {
    console.log("Image failed to load:", imageUrl);
    setHasError(true);
  };

  return (
    <div className="flex flex-col items-center mt-4">
      <div className="text-xl font-semibold text-gray-700 mb-2">{word}</div>
      <div className="w-24 h-24 md:w-32 md:h-32 rounded-lg overflow-hidden border-2 border-purple-300 bg-white relative">
        {hasError && generatePlaceholderImage()}
        
        {!hasError && (
          <img
            src={imageUrl}
            alt={word}
            onError={handleImageError}
            className="w-full h-full object-contain"
          />
        )}
      </div>
    </div>
  );
};

export default ImageDisplay;
