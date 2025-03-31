
import React from 'react';
import TypingGame from '@/components/TypingGame';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-400 to-indigo-500 flex items-center justify-center p-4">
      <div className="w-full max-w-3xl">
        <h1 className="text-center text-4xl md:text-5xl font-bold text-white mb-8 drop-shadow-lg">
          Happy Letters
        </h1>
        <TypingGame />
      </div>
    </div>
  );
};

export default Index;
