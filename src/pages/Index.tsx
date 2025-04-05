
import React, { useState, useEffect } from 'react';
import TypingGame from '@/components/TypingGame';
import { MoonIcon, SunIcon, KeyboardIcon, ImageIcon, GithubIcon } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

const Index = () => {
  const [darkMode, setDarkMode] = useState(false);
  const { toast } = useToast();
  const [isDevMode, setIsDevMode] = useState(false);

  // Initialize dark mode based on system preference
  useEffect(() => {
    const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setDarkMode(isDark);
    updateTheme(isDark);
    
    // Check if we're in development mode
    setIsDevMode(process.env.NODE_ENV === 'development');
  }, []);

  const updateTheme = (isDark: boolean) => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    updateTheme(newMode);
    toast({
      title: newMode ? "Dark Mode Enabled" : "Light Mode Enabled",
      duration: 1500,
    });
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode 
      ? 'bg-gradient-to-b from-gray-900 to-indigo-900 text-white' 
      : 'bg-gradient-to-b from-sky-400 to-indigo-500 text-white'}`}>
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center">
            <KeyboardIcon className="h-8 w-8 mr-2 text-white" />
            <h1 className="text-2xl font-bold text-white">Happy Letters</h1>
          </div>
          
          <div className="flex items-center space-x-2">
            {isDevMode && (
              <Button 
                variant="outline" 
                size="sm" 
                asChild
                className={`${darkMode ? 'bg-gray-700 text-white hover:bg-gray-600' : 'bg-indigo-600 text-white hover:bg-indigo-500'}`}
              >
                <a href="/image-placeholders">
                  <ImageIcon className="h-4 w-4 mr-1" />
                  <span className="hidden sm:inline">Images</span>
                </a>
              </Button>
            )}
            <button 
              onClick={toggleDarkMode}
              className={`p-2 rounded-full ${darkMode ? 'bg-gray-700 text-yellow-300' : 'bg-indigo-600 text-white'}`}
              aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
            >
              {darkMode ? <SunIcon className="h-5 w-5" /> : <MoonIcon className="h-5 w-5" />}
            </button>
          </div>
        </div>
        
        <div className="w-full max-w-3xl mx-auto">
          <TypingGame darkMode={darkMode} />
        </div>
        
        <footer className="mt-16 py-6 text-center">
          <Separator className={darkMode ? "bg-gray-700" : "bg-white/20"} />
          <div className="mt-6 text-sm">
            <p className="mb-2">Developed by Rama Subba Reddy for his lovable daughter Jahnavi.</p>
            <p className="mb-4">All rights reserved, 2025</p>
            <div className="flex justify-center space-x-4">
              <a 
                href="https://github.com/ramasubbaiya" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center hover:underline"
              >
                <GithubIcon className="h-4 w-4 mr-1" />
                <span>GitHub</span>
              </a>
              <a 
                href="https://rama.cloudnotes.click" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:underline"
              >
                Portfolio
              </a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Index;
