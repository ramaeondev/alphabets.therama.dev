
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ImageIcon, GlobeIcon, CameraIcon, ImagesIcon } from 'lucide-react';

export type ImageSource = 'local' | 'unsplash' | 'flickr' | 'openverse' | 'lorem_picsum' | 'pixabay' | 'pexels';

interface ImageSourceSelectorProps {
  imageSource: ImageSource;
  onImageSourceChange: (source: ImageSource) => void;
  darkMode?: boolean;
}

const ImageSourceSelector: React.FC<ImageSourceSelectorProps> = ({ 
  imageSource, 
  onImageSourceChange,
  darkMode = false
}) => {
  return (
    <div className="flex items-center mb-4">
      <div className={`flex items-center gap-2 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
        <ImagesIcon className="h-4 w-4" />
        <span className="text-sm">Image Source:</span>
      </div>
      <Select value={imageSource} onValueChange={(value) => onImageSourceChange(value as ImageSource)}>
        <SelectTrigger className={`w-32 ml-2 h-8 text-sm ${darkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-white'}`}>
          <SelectValue placeholder="Select source" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="local">
            <div className="flex items-center gap-2">
              <ImageIcon className="h-4 w-4" />
              <span>Local</span>
            </div>
          </SelectItem>
          <SelectItem value="unsplash">
            <div className="flex items-center gap-2">
              <GlobeIcon className="h-4 w-4" />
              <span>Unsplash</span>
            </div>
          </SelectItem>
          <SelectItem value="flickr">
            <div className="flex items-center gap-2">
              <CameraIcon className="h-4 w-4" />
              <span>Flickr</span>
            </div>
          </SelectItem>
          <SelectItem value="openverse">
            <div className="flex items-center gap-2">
              <GlobeIcon className="h-4 w-4" />
              <span>Openverse</span>
            </div>
          </SelectItem>
          <SelectItem value="lorem_picsum">
            <div className="flex items-center gap-2">
              <ImagesIcon className="h-4 w-4" />
              <span>Lorem Picsum</span>
            </div>
          </SelectItem>
          <SelectItem value="pixabay">
            <div className="flex items-center gap-2">
              <ImagesIcon className="h-4 w-4" />
              <span>Pixabay</span>
            </div>
          </SelectItem>
          <SelectItem value="pexels">
            <div className="flex items-center gap-2">
              <CameraIcon className="h-4 w-4" />
              <span>Pexels</span>
            </div>
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default ImageSourceSelector;
