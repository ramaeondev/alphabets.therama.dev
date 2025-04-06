
import React from 'react';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface VoiceSelectorProps {
  voiceType: 'male' | 'female';
  onVoiceChange: (voice: 'male' | 'female') => void;
  darkMode?: boolean;
  inMenu?: boolean;
}

const VoiceSelector: React.FC<VoiceSelectorProps> = ({ 
  voiceType, 
  onVoiceChange, 
  darkMode = false,
  inMenu = false
}) => {
  const textColorClass = darkMode ? 'text-white' : 'text-gray-800';
  
  return (
    <div className={inMenu ? "" : "my-4"}>
      <h3 className={`${inMenu ? 'text-md' : 'text-lg'} font-medium mb-2 ${textColorClass}`}>
        Choose a voice:
      </h3>
      <RadioGroup
        value={voiceType}
        onValueChange={(value) => onVoiceChange(value as 'male' | 'female')}
        className="flex space-x-4 justify-center"
      >
        <div className="flex items-center space-x-2">
          <RadioGroupItem 
            value="female" 
            id={inMenu ? "female-menu" : "female"} 
            className={`${darkMode ? "border-white bg-transparent" : "border-2 bg-white"}`}
          />
          <Label 
            htmlFor={inMenu ? "female-menu" : "female"} 
            className={textColorClass}
          >
            Female
          </Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem 
            value="male" 
            id={inMenu ? "male-menu" : "male"} 
            className={`${darkMode ? "border-white bg-transparent" : "border-2 bg-white"}`}
          />
          <Label 
            htmlFor={inMenu ? "male-menu" : "male"} 
            className={textColorClass}
          >
            Male
          </Label>
        </div>
      </RadioGroup>
    </div>
  );
};

export default VoiceSelector;
