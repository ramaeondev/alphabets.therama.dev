import React, { useState, useEffect } from 'react';
import { Settings } from 'lucide-react';
import { 
  Menubar, 
  MenubarMenu, 
  MenubarTrigger, 
  MenubarContent, 
  MenubarItem,
  MenubarSeparator,
  MenubarLabel,
} from "@/components/ui/menubar";
import VoiceSelector from './VoiceSelector';
import ImageSourceSelector, { ImageSource } from './ImageSourceSelector';
import { useWordSelection } from '@/contexts/WordSelectionContext';

interface ImageSourceOption {
  id: string;
  name: string;
  image_source: ImageSource;
  is_disabled: boolean;
}

interface SettingsMenuProps {
  voiceType: 'male' | 'female';
  onVoiceChange: (voice: 'male' | 'female') => void;
  imageSource: ImageSource;
  onImageSourceChange: (source: ImageSource) => void;
  darkMode: boolean;
}

const SettingsMenu: React.FC<SettingsMenuProps> = ({
  voiceType,
  onVoiceChange,
  imageSource,
  onImageSourceChange,
  darkMode
}) => {
  const [imageSources, setImageSources] = useState<ImageSourceOption[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { useStaticWord, setUseStaticWord } = useWordSelection();

  useEffect(() => {
    const fetchImageSources = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('https://api.therama.dev/functions/v1/get-image-sources', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          }
        });

        if (!response.ok) {
          throw new Error(`API responded with status: ${response.status}`);
        }

        const data = await response.json();
        setImageSources(data);
      } catch (error) {
        console.error("Failed to fetch image sources:", error);
        // Fallback to default options
        setImageSources([
          { id: '1', name: 'Local', image_source: 'local', is_disabled: false },
          { id: '2', name: 'Unsplash', image_source: 'unsplash', is_disabled: true },
          { id: '3', name: 'Flickr', image_source: 'flickr', is_disabled: true },
          { id: '4', name: 'Openverse', image_source: 'openverse', is_disabled: false },
          { id: '5', name: 'Lorem Picsum', image_source: 'lorem_picsum', is_disabled: false },
          { id: '6', name: 'Pixabay', image_source: 'pixabay', is_disabled: false },
          { id: '7', name: 'Pexels', image_source: 'pexels', is_disabled: false }
        ]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchImageSources();
  }, []);

  return (
    <Menubar className={`border-none bg-transparent p-0 h-auto ${darkMode ? 'text-white' : 'text-gray-800'}`}>
      <MenubarMenu>
        <MenubarTrigger className="p-2 rounded-full hover:bg-opacity-20 hover:bg-gray-400">
          <Settings className={`h-5 w-5 ${darkMode ? 'text-white' : 'text-gray-800'}`} />
        </MenubarTrigger>
        <MenubarContent className={darkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-200'}>
          <MenubarLabel className="font-bold">Settings</MenubarLabel>
          
          <MenubarSeparator className={darkMode ? 'bg-gray-700' : 'bg-gray-200'} />
          
          <div className="px-3 py-2">
            <VoiceSelector 
              voiceType={voiceType} 
              onVoiceChange={onVoiceChange} 
              darkMode={darkMode} 
              inMenu={true}
            />
          </div>

          <MenubarSeparator className={darkMode ? 'bg-gray-700' : 'bg-gray-200'} />
          
          <MenubarLabel>Image Source</MenubarLabel>
          {isLoading ? (
            <MenubarItem disabled>Loading sources...</MenubarItem>
          ) : (
            imageSources.map(source => (
              <MenubarItem
                key={source.id}
                disabled={source.is_disabled}
                onClick={() => !source.is_disabled && onImageSourceChange(source.image_source)}
                className={imageSource === source.image_source ? 'bg-primary text-primary-foreground' : ''}
              >
                {source.name} {source.is_disabled && "(Coming Soon)"}
              </MenubarItem>
            ))
          )}

          {imageSource === 'local' && (
            <>
              <MenubarSeparator className={darkMode ? 'bg-gray-700' : 'bg-gray-200'} />
              <MenubarLabel>Word Selection</MenubarLabel>
              <MenubarItem 
                onClick={() => setUseStaticWord(!useStaticWord)}
                className={useStaticWord ? 'bg-primary text-primary-foreground' : ''}
              >
                {useStaticWord ? 'Static Word (A-Apple)' : 'Random Words'}
              </MenubarItem>
            </>
          )}
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
};

export default SettingsMenu;
