import React, { useState, useEffect, useRef } from 'react';
import AnimatedLetter from './AnimatedLetter';
import Keyboard from './Keyboard';
import VoiceSelector from './VoiceSelector';
import ImageDisplay from './ImageDisplay';
import { useToast } from '@/components/ui/use-toast';

// Create a mapping for each letter/number with multiple words and images
const createItemsMapping = () => {
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  const mapping: Record<string, Array<{word: string, image: string}>> = {};
  
  const defaultWords: Record<string, string[]> = {
    'A': ['Apple', 'Ant', 'Astronaut', 'Airplane', 'Arrow', 'Avocado', 'Alligator', 'Anchor', 'Acorn', 'Axe'],
    'B': ['Ball', 'Banana', 'Bear', 'Boat', 'Balloon', 'Butterfly', 'Bird', 'Book', 'Beach', 'Bee'],
    'C': ['Cat', 'Car', 'Cake', 'Cow', 'Castle', 'Carrot', 'Cloud', 'Candy', 'Camera', 'Candle'],
    'D': ['Dog', 'Duck', 'Dinosaur', 'Door', 'Dolphin', 'Donut', 'Dragon', 'Drum', 'Diamond', 'Daisy'],
    'E': ['Elephant', 'Egg', 'Eagle', 'Eye', 'Earth', 'Elbow', 'Eel', 'Envelope', 'Eskimo', 'Engine'],
    'F': ['Fish', 'Frog', 'Flower', 'Fox', 'Fire', 'Flag', 'Fries', 'Fan', 'Fairy', 'Feather'],
    'G': ['Giraffe', 'Grass', 'Grapes', 'Gift', 'Guitar', 'Ghost', 'Goat', 'Goose', 'Garden', 'Glove'],
    'H': ['House', 'Hat', 'Horse', 'Heart', 'Hamburger', 'Helicopter', 'Hippo', 'Hand', 'Honey', 'Hammer'],
    'I': ['Ice cream', 'Igloo', 'Island', 'Insect', 'Ink', 'Iron', 'Ivy', 'Icicle', 'Iguana', 'Instrument'],
    'J': ['Jelly', 'Jacket', 'Jet', 'Juice', 'Jam', 'Jellyfish', 'Jeep', 'Jungle', 'Jar', 'Jewelry'],
    'K': ['Kite', 'King', 'Koala', 'Key', 'Kangaroo', 'Kitchen', 'Kettle', 'Keyboard', 'Knife', 'Kiwi'],
    'L': ['Lion', 'Lamp', 'Leaf', 'Lemon', 'Ladder', 'Lighthouse', 'Lizard', 'Lock', 'Lollipop', 'Leg'],
    'M': ['Monkey', 'Moon', 'Mouse', 'Mango', 'Monster', 'Mountain', 'Map', 'Milk', 'Music', 'Muffin'],
    'N': ['Nest', 'Nose', 'Nut', 'Noodles', 'Nurse', 'Nail', 'Notebook', 'Night', 'Needle', 'Necklace'],
    'O': ['Orange', 'Octopus', 'Owl', 'Ocean', 'Onion', 'Otter', 'Oven', 'Ostrich', 'Olive', 'Office'],
    'P': ['Penguin', 'Pig', 'Pizza', 'Panda', 'Pencil', 'Popcorn', 'Puzzle', 'Pear', 'Pillow', 'Parachute'],
    'Q': ['Queen', 'Quilt', 'Question', 'Quail', 'Quarter', 'Quiver', 'Quicksand', 'Quiche', 'Quiet', 'Queue'],
    'R': ['Rabbit', 'Rainbow', 'Robot', 'Rocket', 'River', 'Rain', 'Rose', 'Ring', 'Road', 'Raccoon'],
    'S': ['Snake', 'Sun', 'Star', 'Strawberry', 'Sandwich', 'Spider', 'Ship', 'Snow', 'Shark', 'Sock'],
    'T': ['Tiger', 'Tree', 'Train', 'Turtle', 'Tomato', 'Tooth', 'Tractor', 'Telescope', 'Table', 'Toy'],
    'U': ['Umbrella', 'Unicorn', 'UFO', 'Underwear', 'Uniform', 'Ukulele', 'Umpire', 'Universe', 'Urchin', 'Up'],
    'V': ['Violin', 'Volcano', 'Vase', 'Vegetable', 'Van', 'Vest', 'Valentine', 'Vacuum', 'Vine', 'Village'],
    'W': ['Whale', 'Watch', 'Wagon', 'Watermelon', 'Window', 'Wolf', 'Web', 'Waffle', 'Wind', 'Water'],
    'X': ['X-ray', 'Xylophone', 'Box', 'Fox', 'Axe', 'Exit', 'Taxi', 'Mixer', 'Six', 'Ox'],
    'Y': ['Yo-yo', 'Yacht', 'Yak', 'Yogurt', 'Yarn', 'Yellow', 'Yawn', 'Yard', 'Yell', 'Year'],
    'Z': ['Zebra', 'Zoo', 'Zipper', 'Zero', 'Zigzag', 'Zinc', 'Zucchini', 'Zoom', 'Zone', 'Zombie'],
    '0': ['Zero', 'Owl', 'Orange', 'Ocean', 'Octopus', 'Oval', 'Onion', 'Otter', 'Ostrich', 'Ornament'],
    '1': ['One', 'Unicorn', 'Umbrella', 'Universe', 'Utensil', 'Uniform', 'Uncle', 'Upstairs', 'Unity', 'Ukulele'],
    '2': ['Two', 'Toucan', 'Turtle', 'Tiger', 'Train', 'Tooth', 'Tree', 'Tomato', 'Toy', 'Telescope'],
    '3': ['Three', 'Triangle', 'Truck', 'Throne', 'Thread', 'Thimble', 'Thunder', 'Theater', 'Thistle', 'Thrill'],
    '4': ['Four', 'Fountain', 'Forest', 'Flower', 'Fish', 'Flag', 'Frog', 'Fire', 'Fruit', 'Fork'],
    '5': ['Five', 'Fish', 'Finger', 'Fairy', 'Ferris wheel', 'Fountain', 'Feather', 'Farm', 'Football', 'Fence'],
    '6': ['Six', 'Seal', 'Snake', 'Submarine', 'Sofa', 'Sandwich', 'Skate', 'Soup', 'Squirrel', 'Sunflower'],
    '7': ['Seven', 'Snail', 'Spider', 'Shark', 'Swan', 'Snowman', 'Staircase', 'Submarine', 'Sailboat', 'Sword'],
    '8': ['Eight', 'Elephant', 'Eagle', 'Earth', 'Egg', 'Elf', 'Engine', 'Entertainer', 'Envelope', 'Exit'],
    '9': ['Nine', 'Nail', 'Notebook', 'Nurse', 'Nest', 'Nose', 'Needle', 'Noodle', 'Napkin', 'Nightingale'],
  };
  
  letters.split('').forEach(char => {
    const words = defaultWords[char] || Array(10).fill(`${char}-word`);
    
    mapping[char] = words.map((word, index) => ({
      word,
      image: `/${char.toLowerCase()}-${index + 1}.jpg` // This is a placeholder, will need actual images
    }));
  });
  
  return mapping;
};

const TypingGame = () => {
  const [currentLetter, setCurrentLetter] = useState<string>('');
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const [voiceType, setVoiceType] = useState<'male' | 'female'>('female');
  const [letterCounter, setLetterCounter] = useState<Record<string, number>>({});
  const [currentWordAndImage, setCurrentWordAndImage] = useState<{word: string, image: string} | null>(null);
  const itemsMapping = useRef(createItemsMapping());
  const { toast } = useToast();
  const lastLetter = useRef<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Add event listener for keyboard input
    const handleKeyPress = (event: KeyboardEvent) => {
      const key = event.key;
      
      // Check if the pressed key is a letter or number
      if (/^[a-zA-Z0-9]$/.test(key)) {
        handleLetterPress(key.toUpperCase());
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    
    // Clean up the event listener
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [isAnimating]);

  const speakLetter = (letter: string, word: string) => {
    // Using the Web Speech API for simplicity
    // In a production app, you would use pre-recorded audio files for better quality
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(`${letter}. ${word}`);
      
      // Get voices
      const voices = window.speechSynthesis.getVoices();
      
      // Select a voice based on the selected voice type
      // This is a simple implementation; you might want to pre-select specific voices
      const selectedVoice = voices.find(voice => 
        voiceType === 'male' 
          ? voice.name.toLowerCase().includes('male') || !voice.name.toLowerCase().includes('female')
          : voice.name.toLowerCase().includes('female')
      );
      
      if (selectedVoice) {
        utterance.voice = selectedVoice;
      }
      
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleLetterPress = (letter: string) => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    
    // Keep track of how many times this letter has been pressed
    const currentCount = letterCounter[letter] || 0;
    const newCount = (currentCount + 1) % 10; // Cycle through 10 different words/images
    setLetterCounter(prev => ({...prev, [letter]: newCount}));
    
    // Get the word and image for this letter
    const wordAndImage = itemsMapping.current[letter][newCount];
    setCurrentWordAndImage(wordAndImage);
    
    // Play sound boom effect
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(e => console.error("Audio play failed:", e));
    }
    
    // First clear the current letter
    setCurrentLetter('');
    
    // Set a short timeout before showing the new letter for better visual effect
    setTimeout(() => {
      setCurrentLetter(letter);
      setIsAnimating(false);
      lastLetter.current = letter;
      
      // Speak the letter and word
      if (wordAndImage) {
        speakLetter(letter, wordAndImage.word);
      }
      
      // Show a toast with the letter name
      toast({
        title: letter,
        description: wordAndImage ? wordAndImage.word : '',
        duration: 2000,
      });
    }, 200);
  };

  return (
    <div className="bg-white rounded-2xl shadow-2xl p-6 md:p-8">
      <div className="text-center mb-6">
        <p className="text-xl text-gray-600">Type any letter or number on your keyboard or tap below!</p>
        
        <VoiceSelector voiceType={voiceType} onVoiceChange={setVoiceType} />
      </div>
      
      <div className="flex flex-col items-center h-80 md:h-96 mb-8 bg-gradient-to-r from-purple-100 to-pink-100 rounded-xl overflow-hidden relative">
        {/* Sound effect audio element */}
        <audio ref={audioRef} src="/pop-sound.mp3" preload="auto"></audio>
        
        {/* Background animation for sound boom */}
        {currentLetter && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-30"></div>
          </div>
        )}
        
        <div className="flex flex-col items-center justify-center h-full w-full">
          {currentLetter ? (
            <>
              <AnimatedLetter letter={currentLetter} />
              {currentWordAndImage && <ImageDisplay word={currentWordAndImage.word} imagePath={currentWordAndImage.image} />}
            </>
          ) : (
            <div className="text-gray-400 text-2xl">Type a letter or number to begin!</div>
          )}
        </div>
      </div>
      
      <Keyboard onLetterClick={handleLetterPress} showNumbers={true} />
    </div>
  );
};

export default TypingGame;
