
import React, { useState } from 'react';

interface ImageDisplayProps {
  word: string;
  imagePath: string;
}

const ImageDisplay: React.FC<ImageDisplayProps> = ({ word, imagePath }) => {
  const [hasError, setHasError] = useState(false);
  const [loadAttempted, setLoadAttempted] = useState(false);
  
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
  
  // Generate a colorful background based on the word
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
  
  // Get an Unsplash URL fallback for the letter
  const getExternalImageFallback = (letter: string) => {
    // Map of Unsplash image URLs for each letter
    const imageMap: Record<string, string> = {
      'A': 'https://images.unsplash.com/photo-1570913149827-d2ac84ab3f9a?q=80&w=300&h=300&auto=format&fit=crop',
      'B': 'https://images.unsplash.com/photo-1587132137056-bfbf0166836e?q=80&w=300&h=300&auto=format&fit=crop',
      'C': 'https://images.unsplash.com/photo-1493770348161-369560ae357d?q=80&w=300&h=300&auto=format&fit=crop',
      'D': 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?q=80&w=300&h=300&auto=format&fit=crop',
      'E': 'https://images.unsplash.com/photo-1557050543-4d5f4e07ef46?q=80&w=300&h=300&auto=format&fit=crop',
      'F': 'https://images.unsplash.com/photo-1439931444680-c2b6b49664fe?q=80&w=300&h=300&auto=format&fit=crop',
      'G': 'https://images.unsplash.com/photo-1581337776174-861c1fce5f1d?q=80&w=300&h=300&auto=format&fit=crop',
      'H': 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?q=80&w=300&h=300&auto=format&fit=crop',
      'I': 'https://images.unsplash.com/photo-1566041510639-8d95a2490bfb?q=80&w=300&h=300&auto=format&fit=crop',
      'J': 'https://images.unsplash.com/photo-1541167760496-1628856ab772?q=80&w=300&h=300&auto=format&fit=crop',
      'K': 'https://images.unsplash.com/photo-1482885500053-1ea373748313?q=80&w=300&h=300&auto=format&fit=crop',
      'L': 'https://images.unsplash.com/photo-1583338917451-face2751d8d5?q=80&w=300&h=300&auto=format&fit=crop',
      'M': 'https://images.unsplash.com/photo-1527430253228-e93688616381?q=80&w=300&h=300&auto=format&fit=crop',
      'N': 'https://images.unsplash.com/photo-1598153346810-860daa814c4b?q=80&w=300&h=300&auto=format&fit=crop',
      'O': 'https://images.unsplash.com/photo-1526318896980-cf78c088247c?q=80&w=300&h=300&auto=format&fit=crop',
      'P': 'https://images.unsplash.com/photo-1552452518-a8f73c1a51ef?q=80&w=300&h=300&auto=format&fit=crop',
      'Q': 'https://images.unsplash.com/photo-1567598508481-65a7a5553206?q=80&w=300&h=300&auto=format&fit=crop',
      'R': 'https://images.unsplash.com/photo-1630412351297-af5445c5e3c4?q=80&w=300&h=300&auto=format&fit=crop',
      'S': 'https://images.unsplash.com/photo-1534278931827-8a259344abe7?q=80&w=300&h=300&auto=format&fit=crop',
      'T': 'https://images.unsplash.com/photo-1554456854-55a089fd4cb2?q=80&w=300&h=300&auto=format&fit=crop',
      'U': 'https://images.unsplash.com/photo-1521453791919-a4d9a4668b28?q=80&w=300&h=300&auto=format&fit=crop',
      'V': 'https://images.unsplash.com/photo-1534692499281-57d0f101789b?q=80&w=300&h=300&auto=format&fit=crop',
      'W': 'https://images.unsplash.com/photo-1496450681664-3df85efbd29f?q=80&w=300&h=300&auto=format&fit=crop',
      'X': 'https://images.unsplash.com/photo-1500479694472-551d1fb6258d?q=80&w=300&h=300&auto=format&fit=crop',
      'Y': 'https://images.unsplash.com/photo-1577005193568-b159e059fa3e?q=80&w=300&h=300&auto=format&fit=crop',
      'Z': 'https://images.unsplash.com/photo-1611145367651-0f2275e0814b?q=80&w=300&h=300&auto=format&fit=crop'
    };
    
    return imageMap[letter] || null;
  };
  
  // Attempt to use a fallback image if the primary one fails
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    console.log("Image failed to load:", imagePath);
    
    // If this is the first attempt, try a more generic fallback
    if (!loadAttempted) {
      setLoadAttempted(true);
      
      // Try to load an external image for this letter
      const letter = word.charAt(0).toUpperCase();
      const externalUrl = getExternalImageFallback(letter);
      
      if (externalUrl) {
        e.currentTarget.src = externalUrl;
      } else {
        // If no external URL, try a generic image for this letter
        e.currentTarget.src = `/images/${letter.toLowerCase()}-1.jpg`;
      }
    } else {
      // If that also fails, show the error state
      setHasError(true);
      // Hide the image element since we'll show our generated placeholder
      e.currentTarget.style.display = 'none';
    }
  };

  return (
    <div className="flex flex-col items-center mt-4">
      <div className="text-xl font-semibold text-gray-700 mb-2">{word}</div>
      <div className="w-24 h-24 md:w-32 md:h-32 rounded-lg overflow-hidden border-2 border-purple-300 bg-white relative">
        {hasError && generatePlaceholderImage()}
        
        {!hasError && (
          <img
            src={imagePath}
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
