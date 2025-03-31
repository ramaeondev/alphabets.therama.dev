
import React from 'react';

interface ImageDisplayProps {
  word: string;
  imagePath: string;
}

const ImageDisplay: React.FC<ImageDisplayProps> = ({ word, imagePath }) => {
  // Fallback image in case the specified one doesn't exist
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = "/placeholder.svg";
  };

  return (
    <div className="flex flex-col items-center mt-4">
      <div className="text-xl font-semibold text-gray-700 mb-2">{word}</div>
      <div className="w-24 h-24 md:w-32 md:h-32 rounded-lg overflow-hidden border-2 border-purple-300 bg-white">
        <img
          src={imagePath}
          alt={word}
          onError={handleImageError}
          className="w-full h-full object-contain"
        />
      </div>
    </div>
  );
};

export default ImageDisplay;
