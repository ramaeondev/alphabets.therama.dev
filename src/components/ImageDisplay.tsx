
import React, { useState } from 'react';

interface ImageDisplayProps {
  word: string;
  imagePath: string;
}

const ImageDisplay: React.FC<ImageDisplayProps> = ({ word, imagePath }) => {
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

  // Get an image URL that matches the word
  const getExternalImageUrl = (word: string) => {
    // First, normalize the word - lowercase and remove spaces
    const normalizedWord = word.toLowerCase();
    
    // Map of word-specific image URLs from Unsplash
    const wordImageMap: Record<string, string> = {
      // A words
      'apple': 'https://images.unsplash.com/photo-1570913149827-d2ac84ab3f9a?q=80&w=300&h=300&auto=format&fit=crop',
      'ant': 'https://images.unsplash.com/photo-1558386619-c44d47a66325?q=80&w=300&h=300&auto=format&fit=crop',
      'astronaut': 'https://images.unsplash.com/photo-1454789548928-9efd52dc4031?q=80&w=300&h=300&auto=format&fit=crop',
      'airplane': 'https://images.unsplash.com/photo-1533282960533-51328aa49826?q=80&w=300&h=300&auto=format&fit=crop',
      'arrow': 'https://images.unsplash.com/photo-1594788094620-4579ad2647c4?q=80&w=300&h=300&auto=format&fit=crop',
      'avocado': 'https://images.unsplash.com/photo-1551460188-2456bd9ac2a6?q=80&w=300&h=300&auto=format&fit=crop',
      'alligator': 'https://images.unsplash.com/photo-1551189014-fe583b8d3d99?q=80&w=300&h=300&auto=format&fit=crop',
      'anchor': 'https://images.unsplash.com/photo-1575128233918-41c5b59462b9?q=80&w=300&h=300&auto=format&fit=crop',
      'acorn': 'https://images.unsplash.com/photo-1508105084-3073ed9e31dd?q=80&w=300&h=300&auto=format&fit=crop',
      'axe': 'https://images.unsplash.com/photo-1564999261847-11a83b887e60?q=80&w=300&h=300&auto=format&fit=crop',
      
      // B words
      'ball': 'https://images.unsplash.com/photo-1587132137056-bfbf0166836e?q=80&w=300&h=300&auto=format&fit=crop',
      'banana': 'https://images.unsplash.com/photo-1528825871115-3581a5387919?q=80&w=300&h=300&auto=format&fit=crop',
      'bear': 'https://images.unsplash.com/photo-1530595467537-0b5996c41f2d?q=80&w=300&h=300&auto=format&fit=crop',
      'boat': 'https://images.unsplash.com/photo-1520255870062-bd79d3865de7?q=80&w=300&h=300&auto=format&fit=crop',
      'balloon': 'https://images.unsplash.com/photo-1596073419667-9d77d59f033f?q=80&w=300&h=300&auto=format&fit=crop',
      'butterfly': 'https://images.unsplash.com/photo-1559713043-32ab36e2b185?q=80&w=300&h=300&auto=format&fit=crop',
      'bird': 'https://images.unsplash.com/photo-1592194996308-7b43878e84a6?q=80&w=300&h=300&auto=format&fit=crop',
      'book': 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?q=80&w=300&h=300&auto=format&fit=crop',
      'beach': 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=300&h=300&auto=format&fit=crop',
      'bee': 'https://images.unsplash.com/photo-1576845445502-d9d804fa0489?q=80&w=300&h=300&auto=format&fit=crop',
      
      // C words
      'cat': 'https://images.unsplash.com/photo-1493770348161-369560ae357d?q=80&w=300&h=300&auto=format&fit=crop',
      'car': 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=300&h=300&auto=format&fit=crop',
      'cake': 'https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?q=80&w=300&h=300&auto=format&fit=crop',
      'cow': 'https://images.unsplash.com/photo-1570042225831-d98fa7577f1e?q=80&w=300&h=300&auto=format&fit=crop',
      'castle': 'https://images.unsplash.com/photo-1533154632235-f5350a021ed3?q=80&w=300&h=300&auto=format&fit=crop',
      'carrot': 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?q=80&w=300&h=300&auto=format&fit=crop',
      'cloud': 'https://images.unsplash.com/photo-1611928482473-7b27d24eab80?q=80&w=300&h=300&auto=format&fit=crop',
      'candy': 'https://images.unsplash.com/photo-1581798459219-289a67abf09d?q=80&w=300&h=300&auto=format&fit=crop',
      'camera': 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=300&h=300&auto=format&fit=crop',
      'candle': 'https://images.unsplash.com/photo-1514534704298-58d2cb1411cc?q=80&w=300&h=300&auto=format&fit=crop',
      
      // Fallback for other letters - add more as needed
    };

    // Try to find a matching image URL for this specific word
    if (wordImageMap[normalizedWord]) {
      return wordImageMap[normalizedWord];
    }
    
    // If no word-specific image, fall back to a letter-based image
    const letter = word.charAt(0).toUpperCase();
    const letterImageMap: Record<string, string[]> = {
      'A': [
        'https://images.unsplash.com/photo-1570913149827-d2ac84ab3f9a?q=80&w=300&h=300&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1557800636-894a64c1696f?q=80&w=300&h=300&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1591676875647-83c7a8a7a271?q=80&w=300&h=300&auto=format&fit=crop'
      ],
      'B': [
        'https://images.unsplash.com/photo-1587132137056-bfbf0166836e?q=80&w=300&h=300&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1528825871115-3581a5387919?q=80&w=300&h=300&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1553279768-865429fa0078?q=80&w=300&h=300&auto=format&fit=crop'
      ],
      'C': [
        'https://images.unsplash.com/photo-1493770348161-369560ae357d?q=80&w=300&h=300&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1606046604972-77cc76aee944?q=80&w=300&h=300&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1576354302919-96748cb8299e?q=80&w=300&h=300&auto=format&fit=crop'
      ],
      'D': [
        'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?q=80&w=300&h=300&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1598875184988-5e67b1a874b8?q=80&w=300&h=300&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1563482776068-4dcb450ab460?q=80&w=300&h=300&auto=format&fit=crop'
      ],
      'E': [
        'https://images.unsplash.com/photo-1557050543-4d5f4e07ef46?q=80&w=300&h=300&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1580494775869-a8308735caee?q=80&w=300&h=300&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1480796927426-f609979314bd?q=80&w=300&h=300&auto=format&fit=crop'
      ],
      'F': [
        'https://images.unsplash.com/photo-1439931444680-c2b6b49664fe?q=80&w=300&h=300&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1582359767943-bbaba5f07cce?q=80&w=300&h=300&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1550164951-8945681e87d2?q=80&w=300&h=300&auto=format&fit=crop'
      ],
      'G': [
        'https://images.unsplash.com/photo-1581337776174-861c1fce5f1d?q=80&w=300&h=300&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1546273703-d2658be9de64?q=80&w=300&h=300&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1521017432531-fbd92d768814?q=80&w=300&h=300&auto=format&fit=crop'
      ],
      'H': [
        'https://images.unsplash.com/photo-1568605114967-8130f3a36994?q=80&w=300&h=300&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1600210492493-0946911123ea?q=80&w=300&h=300&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1490822237877-ce00a302c9e9?q=80&w=300&h=300&auto=format&fit=crop'
      ],
      'I': [
        'https://images.unsplash.com/photo-1566041510639-8d95a2490bfb?q=80&w=300&h=300&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1575908539614-ff89490f4a78?q=80&w=300&h=300&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1494522358652-f30e61a5e653?q=80&w=300&h=300&auto=format&fit=crop'
      ],
      'J': [
        'https://images.unsplash.com/photo-1541167760496-1628856ab772?q=80&w=300&h=300&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1594489470821-b9c4d5b2d86c?q=80&w=300&h=300&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1579468537440-9b239271305f?q=80&w=300&h=300&auto=format&fit=crop'
      ],
      'K': [
        'https://images.unsplash.com/photo-1482885500053-1ea373748313?q=80&w=300&h=300&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1594063596316-aa5f41c44a34?q=80&w=300&h=300&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1562577309-4932fdd64cd1?q=80&w=300&h=300&auto=format&fit=crop'
      ],
      'L': [
        'https://images.unsplash.com/photo-1583338917451-face2751d8d5?q=80&w=300&h=300&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1563417079256-a29e9e1e24e5?q=80&w=300&h=300&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1590172220051-9b1a7b54e577?q=80&w=300&h=300&auto=format&fit=crop'
      ],
      'M': [
        'https://images.unsplash.com/photo-1527430253228-e93688616381?q=80&w=300&h=300&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1563483783266-5a8cfe7123e3?q=80&w=300&h=300&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1550184586-2de8f30bec92?q=80&w=300&h=300&auto=format&fit=crop'
      ],
      'N': [
        'https://images.unsplash.com/photo-1598153346810-860daa814c4b?q=80&w=300&h=300&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1602934585576-fba4e940b50f?q=80&w=300&h=300&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1582769923195-c6e60dc1d8dc?q=80&w=300&h=300&auto=format&fit=crop'
      ],
      'O': [
        'https://images.unsplash.com/photo-1526318896980-cf78c088247c?q=80&w=300&h=300&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1527243775717-2394093a3e89?q=80&w=300&h=300&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1582979512210-99b6a53386f9?q=80&w=300&h=300&auto=format&fit=crop'
      ],
      'P': [
        'https://images.unsplash.com/photo-1552452518-a8f73c1a51ef?q=80&w=300&h=300&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1589365252845-092198ba5334?q=80&w=300&h=300&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1587486913049-53fc88980cfc?q=80&w=300&h=300&auto=format&fit=crop'
      ],
      'Q': [
        'https://images.unsplash.com/photo-1567598508481-65a7a5553206?q=80&w=300&h=300&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1509909756405-be0199881695?q=80&w=300&h=300&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1580974852861-c583059cf306?q=80&w=300&h=300&auto=format&fit=crop'
      ],
      'R': [
        'https://images.unsplash.com/photo-1630412351297-af5445c5e3c4?q=80&w=300&h=300&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?q=80&w=300&h=300&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1548430029-66229d8e2ded?q=80&w=300&h=300&auto=format&fit=crop'
      ],
      'S': [
        'https://images.unsplash.com/photo-1534278931827-8a259344abe7?q=80&w=300&h=300&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1543466835-00a7907e9de1?q=80&w=300&h=300&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1541178735493-479c1a27ed24?q=80&w=300&h=300&auto=format&fit=crop'
      ],
      'T': [
        'https://images.unsplash.com/photo-1554456854-55a089fd4cb2?q=80&w=300&h=300&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1577223625816-7546f13df25d?q=80&w=300&h=300&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=300&h=300&auto=format&fit=crop'
      ],
      'U': [
        'https://images.unsplash.com/photo-1521453791919-a4d9a4668b28?q=80&w=300&h=300&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1534030347209-467a5b0ad3e6?q=80&w=300&h=300&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1445975543393-79e8dbb654bc?q=80&w=300&h=300&auto=format&fit=crop'
      ],
      'V': [
        'https://images.unsplash.com/photo-1534692499281-57d0f101789b?q=80&w=300&h=300&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1529885676083-4ce2677834c0?q=80&w=300&h=300&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1582734079545-5232439a7a98?q=80&w=300&h=300&auto=format&fit=crop'
      ],
      'W': [
        'https://images.unsplash.com/photo-1496450681664-3df85efbd29f?q=80&w=300&h=300&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1562155847-e150f859f6b2?q=80&w=300&h=300&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1477414956199-7dafc86a4f1a?q=80&w=300&h=300&auto=format&fit=crop'
      ],
      'X': [
        'https://images.unsplash.com/photo-1500479694472-551d1fb6258d?q=80&w=300&h=300&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=300&h=300&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1553976468-dcddb73f0855?q=80&w=300&h=300&auto=format&fit=crop'
      ],
      'Y': [
        'https://images.unsplash.com/photo-1577005193568-b159e059fa3e?q=80&w=300&h=300&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1559181567-c3190ca9959b?q=80&w=300&h=300&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1522748906645-95d8adfd52c7?q=80&w=300&h=300&auto=format&fit=crop'
      ],
      'Z': [
        'https://images.unsplash.com/photo-1611145367651-0f2275e0814b?q=80&w=300&h=300&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1516192518150-0d8fee5425e3?q=80&w=300&h=300&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1622538087201-ecbd769c3029?q=80&w=300&h=300&auto=format&fit=crop'
      ]
    };
    
    // Get the array of images for this letter, or use a default image
    const imageOptions = letterImageMap[letter] || ['https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?q=80&w=300&h=300&auto=format&fit=crop'];
    
    // Pick a consistent image based on the word to ensure the same image shows every time
    const wordLength = word.length;
    const index = wordLength % imageOptions.length;
    
    return imageOptions[index];
  };
  
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
    console.log("Image failed to load:", imagePath);
    setHasError(true);
  };

  // Get the best image URL for this word
  const imageUrl = getExternalImageUrl(word);

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
