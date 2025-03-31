
import React from 'react';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface VoiceSelectorProps {
  voiceType: 'male' | 'female';
  onVoiceChange: (voice: 'male' | 'female') => void;
}

const VoiceSelector: React.FC<VoiceSelectorProps> = ({ voiceType, onVoiceChange }) => {
  return (
    <div className="my-4">
      <h3 className="text-lg font-medium mb-2">Choose a voice:</h3>
      <RadioGroup
        value={voiceType}
        onValueChange={(value) => onVoiceChange(value as 'male' | 'female')}
        className="flex space-x-4 justify-center"
      >
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="female" id="female" />
          <Label htmlFor="female">Female</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="male" id="male" />
          <Label htmlFor="male">Male</Label>
        </div>
      </RadioGroup>
    </div>
  );
};

export default VoiceSelector;
