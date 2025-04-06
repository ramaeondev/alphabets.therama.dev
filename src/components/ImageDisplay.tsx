
import React, { useState } from 'react';
import { ImageSource } from './ImageSourceSelector';

interface ImageDisplayProps {
  word: string;
  imageUrl: string;
  imageSource: ImageSource;
}

const ImageDisplay: React.FC<ImageDisplayProps> = ({ word, imageUrl, imageSource }) => {
  const [hasError, setHasError] = useState(false);
  
  // Check if the word represents a number
  const isNumeric = /^\d+$/.test(word) || ['Zero', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine'].includes(word);
  
  // If it's a number, don't display an image
  if (isNumeric) {
    return (
      <div className="flex flex-col items-center mt-2">
        <div className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
          {word}
        </div>
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
      <div className={`w-full h-full flex items-center justify-center ${bgColor} rounded-lg`}>
        <div className="text-center">
          <div className="text-4xl font-bold">{letter}</div>
          <div className="text-sm mt-1">{word}</div>
        </div>
      </div>
    );
  };
  
  // Get image path based on source
  const getImageSrc = () => {
    if (imageSource === 'local') {
      return `/images/${word}.jpg`;
    }
    return imageUrl;
  };
  
  // Handle image loading error
  const handleImageError = () => {
    console.log("Image failed to load:", imageSource === 'local' ? `local image for ${word}` : imageUrl);
    setHasError(true);
  };

  return (
    <div className="flex flex-col items-center mt-2">
      <div className="text-3xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
        {word}
      </div>
      <div className="w-40 h-40 md:w-52 md:h-52 rounded-xl overflow-hidden border-2 border-purple-300 bg-white relative shadow-lg transform transition-transform hover:scale-105">
        {hasError && generatePlaceholderImage()}
        
        {!hasError && (
          <img
            src={getImageSrc()}
            alt={word}
            onError={handleImageError}
            className="w-full h-full object-cover"
          />
        )}
      </div>
    </div>
  );
};

export default ImageDisplay;
