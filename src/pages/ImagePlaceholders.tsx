
import React from 'react';
import PlaceholderImageGenerator from '@/components/PlaceholderImageGenerator';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const ImagePlaceholders = () => {
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Image Placeholders</h1>
        <Button asChild>
          <Link to="/">Back to Game</Link>
        </Button>
      </div>
      
      <div className="mb-8">
        <p>
          This page shows placeholder images for all letters. To use real images in the game, 
          save images with these filenames in your <code>/public/images/</code> directory.
        </p>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {letters.split('').map((letter) => (
          <div key={letter} className="mb-8">
            <h2 className="text-xl font-bold mb-2">Letter {letter}</h2>
            <div className="flex flex-wrap">
              {[...Array(10)].map((_, index) => (
                <PlaceholderImageGenerator 
                  key={`${letter}-${index}`} 
                  letter={letter} 
                  index={index} 
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImagePlaceholders;
