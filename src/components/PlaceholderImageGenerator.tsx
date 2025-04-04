
import React from 'react';

interface PlaceholderImageGeneratorProps {
  letter: string;
  index: number;
  word?: string;
}

const PlaceholderImageGenerator: React.FC<PlaceholderImageGeneratorProps> = ({ 
  letter, 
  index,
  word
}) => {
  // Generate a colorful background based on the letter and index
  const getColorForLetter = () => {
    const colors = [
      'bg-red-200', 'bg-blue-200', 'bg-green-200', 'bg-yellow-200', 
      'bg-purple-200', 'bg-pink-200', 'bg-indigo-200', 'bg-teal-200'
    ];
    // Use the index to select a color
    return colors[index % colors.length];
  };

  const bgColor = getColorForLetter();
  const displayWord = word || `${letter.toUpperCase()}-word-${index}`;
  
  return (
    <div className="m-2">
      <div className={`w-32 h-32 rounded-lg overflow-hidden border-2 border-gray-300 ${bgColor} flex items-center justify-center`}>
        <div className="text-center p-2">
          <div className="text-4xl font-bold">{letter.toUpperCase()}</div>
          <div className="text-sm mt-1 text-center">{displayWord}</div>
        </div>
      </div>
      <div className="text-xs text-center mt-1">
        {`/images/${letter.toLowerCase()}-${index + 1}.jpg`}
      </div>
    </div>
  );
};

export default PlaceholderImageGenerator;
