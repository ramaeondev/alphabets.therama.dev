
import React, { useState, useEffect, useRef } from 'react';
import AnimatedLetter from './AnimatedLetter';
import Keyboard from './Keyboard';
import VoiceSelector from './VoiceSelector';
import ImageDisplay from './ImageDisplay';
import { useToast } from '@/hooks/use-toast';

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
    '0': ['Zero'],
    '1': ['One'],
    '2': ['Two'],
    '3': ['Three'],
    '4': ['Four'],
    '5': ['Five'],
    '6': ['Six'],
    '7': ['Seven'],
    '8': ['Eight'],
    '9': ['Nine'],
  };
  
  letters.split('').forEach(char => {
    const isNumber = /\d/.test(char);
    // For numbers, just repeat the same word for all 10 slots
    const words = isNumber 
      ? Array(10).fill(defaultWords[char][0])
      : (defaultWords[char] || Array(10).fill(`${char}-word`));
    
    mapping[char] = words.map((word, index) => ({
      word,
      image: `/images/${char.toLowerCase()}-${index + 1}.jpg` // Image path
    }));
  });
  
  return mapping;
};

interface TypingGameProps {
  darkMode?: boolean;
}

const TypingGame: React.FC<TypingGameProps> = ({ darkMode = false }) => {
  const [currentLetter, setCurrentLetter] = useState<string>('');
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const [showBoomEffect, setShowBoomEffect] = useState<boolean>(false);
  const [voiceType, setVoiceType] = useState<'male' | 'female'>('female');
  const [letterCounter, setLetterCounter] = useState<Record<string, number>>({});
  const [currentWordAndImage, setCurrentWordAndImage] = useState<{word: string, image: string} | null>(null);
  const itemsMapping = useRef(createItemsMapping());
  const { toast } = useToast();
  const lastLetter = useRef<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const speechEndTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const speechSynthesisRef = useRef<SpeechSynthesisUtterance | null>(null);
  const [speechAvailable, setSpeechAvailable] = useState<boolean>(true);

  useEffect(() => {
    // Check if speech synthesis is available in this browser
    if (!('speechSynthesis' in window)) {
      setSpeechAvailable(false);
      console.warn("Speech synthesis not available in this browser");
    }
    
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
      if (speechEndTimeoutRef.current) {
        clearTimeout(speechEndTimeoutRef.current);
      }
      // Cancel any ongoing speech
      if (speechSynthesisRef.current && speechAvailable) {
        window.speechSynthesis.cancel();
      }
    };
  }, [isAnimating, speechAvailable]);

  // Ensure speech synthesis voices are loaded
  useEffect(() => {
    // Create a function to initialize speech synthesis voices
    const initVoices = () => {
      if ('speechSynthesis' in window) {
        // Force the browser to load voices
        const voices = window.speechSynthesis.getVoices();
        if (voices.length === 0) {
          // If no voices are available initially, try again after a delay
          setTimeout(initVoices, 500);
        }
      }
    };

    // Call it immediately
    initVoices();

    // Also set up an event listener for when voices change/load
    if ('speechSynthesis' in window) {
      window.speechSynthesis.onvoiceschanged = initVoices;
    }

    // Clean up
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.onvoiceschanged = null;
      }
    };
  }, []);

  const speakLetter = (letter: string, word: string) => {
    // Skip if speech synthesis is not available
    if (!speechAvailable) {
      // Just show the boom effect for a while and then hide it
      setTimeout(() => {
        setShowBoomEffect(false);
      }, 1500);
      return;
    }
    
    // Using the Web Speech API
    try {
      // Cancel any ongoing speech
      window.speechSynthesis.cancel();
      
      // For numbers, just speak the number itself, not the word
      const isNumber = /\d/.test(letter);
      const textToSpeak = isNumber ? letter : `${letter}. ${word}`;
      
      const utterance = new SpeechSynthesisUtterance(textToSpeak);
      speechSynthesisRef.current = utterance;
      
      // Get voices
      const voices = window.speechSynthesis.getVoices();
      
      // Select a voice based on the selected voice type
      // First look for voices that explicitly match our criteria
      let selectedVoice = voices.find(voice => 
        voiceType === 'male' 
          ? voice.name.toLowerCase().includes('male') || voice.name.toLowerCase().includes('man')
          : voice.name.toLowerCase().includes('female') || voice.name.toLowerCase().includes('woman')
      );
      
      // If no specific voice found, fallback to any voice
      if (!selectedVoice && voices.length > 0) {
        console.log("No specific voice found, using first available voice");
        selectedVoice = voices[0];
      }
      
      if (selectedVoice) {
        utterance.voice = selectedVoice;
      } else {
        console.log("No voices available, using default voice");
      }
      
      // Set up event for when speech ends
      utterance.onend = () => {
        // End the boom effect when speech is done
        setShowBoomEffect(false);
        speechSynthesisRef.current = null;
      };
      
      utterance.onerror = (event) => {
        console.error("Speech synthesis error:", event);
        setShowBoomEffect(false);
        speechSynthesisRef.current = null;
        
        // If speech is interrupted too many times, consider disabling it
        if (event.error === 'interrupted') {
          // Just hide the boom effect and continue
          setShowBoomEffect(false);
        }
      };
      
      // Fallback in case the speech event doesn't fire
      const estimatedSpeechTime = Math.max(1500, (letter.length + (isNumber ? 0 : word.length)) * 100); // rough estimate
      if (speechEndTimeoutRef.current) {
        clearTimeout(speechEndTimeoutRef.current);
      }
      
      speechEndTimeoutRef.current = setTimeout(() => {
        setShowBoomEffect(false);
      }, estimatedSpeechTime);
      
      // Explicitly try to speak and catch any errors
      window.speechSynthesis.speak(utterance);
      console.log("Speaking:", textToSpeak);
    } catch (error) {
      console.error("Speech synthesis error:", error);
      setShowBoomEffect(false);
      
      // Fall back to no speech
      setTimeout(() => {
        setShowBoomEffect(false);
      }, 1500);
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
    
    // Clear any previous timeout
    if (speechEndTimeoutRef.current) {
      clearTimeout(speechEndTimeoutRef.current);
    }
    
    // Play sound boom effect
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      try {
        audioRef.current.play().catch(e => {
          console.error("Audio play failed:", e);
        });
      } catch (error) {
        console.error("Audio play error:", error);
      }
    }
    
    // First clear the current letter
    setCurrentLetter('');
    
    // Set a short timeout before showing the new letter for better visual effect
    setTimeout(() => {
      setCurrentLetter(letter);
      setIsAnimating(false);
      lastLetter.current = letter;
      setShowBoomEffect(true); // Show boom effect when letter appears
      
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

  const bgColor = darkMode ? 'bg-gray-800' : 'bg-white';
  const textColor = darkMode ? 'text-white' : 'text-gray-700';

  return (
    <div className={`${bgColor} rounded-2xl shadow-2xl p-6 md:p-8 transition-colors duration-300`}>
      <div className="text-center mb-6">
        <p className={`text-xl ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
          Type any letter or number on your keyboard or tap below!
        </p>
        
        <VoiceSelector voiceType={voiceType} onVoiceChange={setVoiceType} />
      </div>
      
      <div className={`flex flex-col items-center h-80 md:h-96 mb-8 ${darkMode ? 'bg-gradient-to-r from-gray-900 to-indigo-900' : 'bg-gradient-to-r from-purple-100 to-pink-100'} rounded-xl overflow-hidden relative`}>
        {/* Sound effect audio element */}
        <audio ref={audioRef} src="/pop-sound.mp3" preload="auto"></audio>
        
        {/* Background animation for sound boom - only shown when showBoomEffect is true */}
        {currentLetter && showBoomEffect && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className={`animate-ping absolute inline-flex h-full w-full rounded-full ${darkMode ? 'bg-purple-600' : 'bg-purple-400'} opacity-30`}></div>
          </div>
        )}
        
        <div className="flex flex-col items-center justify-center h-full w-full">
          {currentLetter ? (
            <>
              <AnimatedLetter letter={currentLetter} />
              {currentWordAndImage && <ImageDisplay word={currentWordAndImage.word} imagePath={currentWordAndImage.image} />}
            </>
          ) : (
            <div className={`${darkMode ? 'text-gray-400' : 'text-gray-400'} text-2xl`}>
              Type a letter or number to begin!
            </div>
          )}
        </div>
      </div>
      
      <Keyboard onLetterClick={handleLetterPress} showNumbers={true} darkMode={darkMode} />
    </div>
  );
};

export default TypingGame;
