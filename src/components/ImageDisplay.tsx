
import React, { useState } from 'react';

interface ImageDisplayProps {
  word: string;
  imagePath: string;
}

const ImageDisplay: React.FC<ImageDisplayProps> = ({ word, imagePath }) => {
  const [hasError, setHasError] = useState(false);
  const [loadAttempted, setLoadAttempted] = useState(false);
  
  // Attempt to use a fallback image if the primary one fails
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    console.log("Image failed to load:", imagePath);
    
    // If this is the first attempt, try a more generic fallback
    if (!loadAttempted) {
      setLoadAttempted(true);
      
      // Try to load a generic image for this letter (first character)
      const letter = word.charAt(0).toLowerCase();
      e.currentTarget.src = `/images/${letter}-1.jpg`;
    } else {
      // If that also fails, show the error state
      setHasError(true);
      e.currentTarget.src = "/placeholder.svg";
    }
  };

  return (
    <div className="flex flex-col items-center mt-4">
      <div className="text-xl font-semibold text-gray-700 mb-2">{word}</div>
      <div className="w-24 h-24 md:w-32 md:h-32 rounded-lg overflow-hidden border-2 border-purple-300 bg-white relative">
        {hasError && (
          <div className="absolute inset-0 flex items-center justify-center text-sm text-gray-500 p-2 text-center">
            <p>
              Place images in<br />
              /public/images/{imagePath.split('/').pop()?.split('.')[0]}.jpg
            </p>
          </div>
        )}
        <img
          src={imagePath}
          alt={word}
          onError={handleImageError}
          className="w-full h-full object-contain"
        />
      </div>
      
      {/* Only show path if there's an error, since it's more for debugging */}
      {hasError && <div className="text-xs text-gray-400 mt-1">{imagePath}</div>}
    </div>
  );
};

export default ImageDisplay;
