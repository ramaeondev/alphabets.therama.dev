
import React, { createContext, useContext, useState } from 'react';

type WordSelectionContextType = {
  useStaticWord: boolean;
  setUseStaticWord: (value: boolean) => void;
};

const WordSelectionContext = createContext<WordSelectionContextType | undefined>(undefined);

export function WordSelectionProvider({ children }: { children: React.ReactNode }) {
  const [useStaticWord, setUseStaticWord] = useState<boolean>(false);

  return (
    <WordSelectionContext.Provider value={{ useStaticWord, setUseStaticWord }}>
      {children}
    </WordSelectionContext.Provider>
  );
}

export function useWordSelection() {
  const context = useContext(WordSelectionContext);
  if (context === undefined) {
    throw new Error('useWordSelection must be used within a WordSelectionProvider');
  }
  return context;
}
