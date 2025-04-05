
import React from 'react';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface VoiceSelectorProps {
  voiceType: 'male' | 'female';
  onVoiceChange: (voice: 'male' | 'female') => void;
  darkMode?: boolean;
}

const VoiceSelector: React.FC<VoiceSelectorProps> = ({ voiceType, onVoiceChange, darkMode = false }) => {
  return (
    <div className="my-4">
      <h3 className={`text-lg font-medium mb-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>Choose a voice:</h3>
      <RadioGroup
        value={voiceType}
        onValueChange={(value) => onVoiceChange(value as 'male' | 'female')}
        className="flex space-x-4 justify-center"
      >
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="female" id="female" className="border-2" />
          <Label htmlFor="female" className={darkMode ? 'text-white' : 'text-gray-800'}>Female</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="male" id="male" className="border-2" />
          <Label htmlFor="male" className={darkMode ? 'text-white' : 'text-gray-800'}>Male</Label>
        </div>
      </RadioGroup>
    </div>
  );
};

export default VoiceSelector;
