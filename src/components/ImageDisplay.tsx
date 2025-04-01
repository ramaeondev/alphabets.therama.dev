
import React, { useState } from 'react';

interface ImageDisplayProps {
  word: string;
  imagePath: string;
}

const ImageDisplay: React.FC<ImageDisplayProps> = ({ word, imagePath }) => {
  const [hasError, setHasError] = useState(false);
  
  // Fallback image in case the specified one doesn't exist
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    console.log("Image failed to load:", imagePath);
    setHasError(true);
    e.currentTarget.src = "/placeholder.svg";
  };

  return (
    <div className="flex flex-col items-center mt-4">
      <div className="text-xl font-semibold text-gray-700 mb-2">{word}</div>
      <div className="w-24 h-24 md:w-32 md:h-32 rounded-lg overflow-hidden border-2 border-purple-300 bg-white relative">
        {hasError && (
          <div className="absolute inset-0 flex items-center justify-center text-sm text-gray-500">
            Image not found
          </div>
        )}
        <img
          src={imagePath}
          alt={word}
          onError={handleImageError}
          className="w-full h-full object-contain"
        />
      </div>
      {/* Display the path for debugging purposes */}
      <div className="text-xs text-gray-400 mt-1">{imagePath}</div>
    </div>
  );
};

export default ImageDisplay;
