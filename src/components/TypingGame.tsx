import React, { useState, useEffect, useRef } from 'react';
import AnimatedLetter from './AnimatedLetter';
import Keyboard from './Keyboard';
import VoiceSelector from './VoiceSelector';
import ImageDisplay from './ImageDisplay';
import { useToast } from '@/hooks/use-toast';

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
    const words = isNumber 
      ? Array(10).fill(defaultWords[char][0])
      : (defaultWords[char] || Array(10).fill(`${char}-word`));
    
    mapping[char] = words.map((word, index) => ({
      word,
      image: `/images/${char.toLowerCase()}-${index + 1}.jpg`
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
  const speechEndTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const speechSynthesisRef = useRef<SpeechSynthesisUtterance | null>(null);
  const [speechAvailable, setSpeechAvailable] = useState<boolean>(true);
  const audioElementRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (!('speechSynthesis' in window)) {
      setSpeechAvailable(false);
      console.warn("Speech synthesis not available in this browser");
    }
    
    const audio = new Audio();
    audioElementRef.current = audio;
    
    const handleKeyPress = (event: KeyboardEvent) => {
      const key = event.key;
      
      if (/^[a-zA-Z0-9]$/.test(key)) {
        handleLetterPress(key.toUpperCase());
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
      if (speechEndTimeoutRef.current) {
        clearTimeout(speechEndTimeoutRef.current);
      }
      if (speechSynthesisRef.current && speechAvailable) {
        window.speechSynthesis.cancel();
      }
      if (audioElementRef.current) {
        audioElementRef.current.pause();
        audioElementRef.current.src = '';
      }
    };
  }, [isAnimating, speechAvailable]);

  useEffect(() => {
    const initVoices = () => {
      if ('speechSynthesis' in window) {
        const voices = window.speechSynthesis.getVoices();
        if (voices.length === 0) {
          setTimeout(initVoices, 500);
        }
      }
    };

    initVoices();

    if ('speechSynthesis' in window) {
      window.speechSynthesis.onvoiceschanged = initVoices;
    }

    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.onvoiceschanged = null;
      }
    };
  }, []);

  const playSound = () => {
    if (audioElementRef.current) {
      try {
        audioElementRef.current.pause();
        audioElementRef.current.currentTime = 0;
        audioElementRef.current.src = '/sounds/pop-sound.mp3';
        const playPromise = audioElementRef.current.play();
        
        if (playPromise !== undefined) {
          playPromise.catch((e) => {
            console.error("Audio play failed with reusable element:", e);
            audioElementRef.current!.src = '/sounds/pop-sound.wav';
            audioElementRef.current!.play().catch((err) => {
              console.error("Fallback audio also failed with reusable element:", err);
              createBeepSound();
            });
          });
        }
      } catch (error) {
        console.error("Audio play error with reusable element:", error);
        createBeepSound();
      }
    } else {
      createBeepSound();
    }
  };

  const createBeepSound = () => {
    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.type = 'sine';
      oscillator.frequency.value = 800;
      
      gainNode.gain.value = 0.1;
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.start();
      setTimeout(() => {
        oscillator.stop();
        audioContext.close();
      }, 100);
    } catch (e) {
      console.error("Web Audio API also failed:", e);
    }
  };

  const speakLetter = (letter: string, word: string) => {
    if (!speechAvailable) {
      setTimeout(() => {
        setShowBoomEffect(false);
      }, 1500);
      return;
    }
    
    try {
      window.speechSynthesis.cancel();
      
      const isNumber = /\d/.test(letter);
      const textToSpeak = isNumber ? letter : `${letter}. ${word}`;
      
      const utterance = new SpeechSynthesisUtterance(textToSpeak);
      speechSynthesisRef.current = utterance;
      
      const voices = window.speechSynthesis.getVoices();
      
      let selectedVoice = voices.find(voice => 
        voiceType === 'male' 
          ? voice.name.toLowerCase().includes('male') || voice.name.toLowerCase().includes('man')
          : voice.name.toLowerCase().includes('female') || voice.name.toLowerCase().includes('woman')
      );
      
      if (!selectedVoice && voices.length > 0) {
        console.log("No specific voice found, using first available voice");
        selectedVoice = voices[0];
      }
      
      if (selectedVoice) {
        utterance.voice = selectedVoice;
      } else {
        console.log("No voices available, using default voice");
      }
      
      utterance.onstart = () => {
        console.log("Speech started for: " + textToSpeak);
      };
      
      utterance.onend = () => {
        console.log("Speech ended normally for: " + textToSpeak);
        setShowBoomEffect(false);
        speechSynthesisRef.current = null;
      };
      
      utterance.onerror = (event) => {
        console.error("Speech synthesis error:", event);
        setShowBoomEffect(false);
        speechSynthesisRef.current = null;
        
        if (event.error === 'interrupted') {
          console.log("Speech was interrupted, this is normal when typing quickly");
          setShowBoomEffect(false);
        }
      };
      
      const estimatedSpeechTime = Math.max(1500, (letter.length + (isNumber ? 0 : word.length)) * 100);
      if (speechEndTimeoutRef.current) {
        clearTimeout(speechEndTimeoutRef.current);
      }
      
      speechEndTimeoutRef.current = setTimeout(() => {
        setShowBoomEffect(false);
      }, estimatedSpeechTime);
      
      window.speechSynthesis.speak(utterance);
      console.log("Speaking:", textToSpeak);
    } catch (error) {
      console.error("Speech synthesis error:", error);
      setShowBoomEffect(false);
      
      setTimeout(() => {
        setShowBoomEffect(false);
      }, 1500);
    }
  };

  const handleLetterPress = (letter: string) => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    
    const currentCount = letterCounter[letter] || 0;
    const newCount = (currentCount + 1) % 10;
    setLetterCounter(prev => ({...prev, [letter]: newCount}));
    
    const wordAndImage = itemsMapping.current[letter][newCount];
    setCurrentWordAndImage(wordAndImage);
    
    if (speechEndTimeoutRef.current) {
      clearTimeout(speechEndTimeoutRef.current);
    }
    
    playSound();
    
    setCurrentLetter('');
    
    setTimeout(() => {
      setCurrentLetter(letter);
      setIsAnimating(false);
      lastLetter.current = letter;
      setShowBoomEffect(true);
      
      if (wordAndImage) {
        speakLetter(letter, wordAndImage.word);
      }
      
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
        <audio ref={audioElementRef} preload="auto" style={{ display: 'none' }} />
        
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
