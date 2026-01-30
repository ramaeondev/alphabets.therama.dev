import React, { useState, useEffect } from 'react';
import TypingGame from '@/components/TypingGame';
import { MoonIcon, SunIcon, GithubIcon, BookIcon } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Separator } from '@/components/ui/separator';
import SettingsMenu from '@/components/SettingsMenu';
import { ImageSource } from '@/components/ImageSourceSelector';
import { fetchAppSettings } from '@/services/appSettingsService';
import { Helmet } from 'react-helmet'; // Back to original react-helmet

declare global {
  interface Window {
    dataLayer: any[];
  }
}

const Index = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [voiceType, setVoiceType] = useState<'male' | 'female'>('female');
  const [imageSource, setImageSource] = useState<ImageSource>('local');

  // Load app settings on mount
  useEffect(() => {
    const loadSettings = async () => {
      const settings = await fetchAppSettings();

      // Apply default settings from database if available
      if (settings['default_voice_type']) {
        setVoiceType(settings['default_voice_type'] as 'male' | 'female');
      }

      if (settings['default_image_source']) {
        setImageSource(settings['default_image_source'] as ImageSource);
      }

      if (settings['dark_mode_default'] !== undefined) {
        setDarkMode(settings['dark_mode_default']);
      }
    };
    loadSettings();
  }, []);
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

  useEffect(() => {
    // Dynamically inject Google Analytics script
    const script = document.createElement('script');
    script.src = 'https://www.googletagmanager.com/gtag/js?id=G-FHZ9Y2CCG2';
    script.async = true;
    document.head.appendChild(script);

    script.onload = () => {
      window.dataLayer = window.dataLayer || [];
      function gtag(...args: any[]) {
        window.dataLayer.push(args);
      }
      gtag('js', new Date());
      gtag('config', 'G-FHZ9Y2CCG2');
    };

    return () => {
      document.head.removeChild(script);
    };
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
    <>
      <Helmet>
        <title>Alphabets</title>
        <meta
          name="description"
          content="Happy Letters is a fun, interactive typing game for children to learn the alphabet, numbers, and words with animations, images, and speech feedback."
        />
        <meta name="keywords" content="typing game for kids, learn alphabet, interactive letters, children education, early learning" />
        <meta name="author" content="Rama Subba Reddy" />

        {/* Open Graph Tags */}
        <meta property="og:title" content="Happy Letters - Fun Typing Game for Kids" />
        <meta
          property="og:description"
          content="Interactive typing game that helps kids learn letters, numbers, and words with visuals and audio feedback. Built with love for children."
        />
        <meta
          property="og:image"
          content="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=1470&h=600&auto=format&fit=crop"
        />
        <meta property="og:url" content="https://alphabets.therama.dev" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Happy Letters" />


        {/* Technical Tags */}
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <meta name="theme-color" content={darkMode ? "#1e1e2f" : "#60a5fa"} />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://alphabets.therama.dev" />

        {/*Open Graph Meta Tags */}
        <meta property="og:title" content="Alphabet - A Kids Typing Game" />
        <meta property="og:description" content="An Interactive typing game for the kids" />
        <meta property="og:image" content="/public/alphabets-therama-dev-large.png" />
        <meta property="og:url" content="https://alphabets.therama.dev" />
        <meta property="og:type" content="website" />

        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Alphabet - A Kids Typing Game" />
        <meta name="twitter:description" content="An Interactive typing game for the kids" />
        <meta name="twitter:image" content="/public/alphabets-therama-dev-large.png" />

        <html lang="en" />

        {/* Structured Data for Educational App */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "Happy Letters",
            "applicationCategory": "EducationalApplication",
            "operatingSystem": "Web",
            "offers": {
              "@type": "Offer",
              "price": "0.00",
              "priceCurrency": "USD"
            },
            "description": "Interactive typing application for children to learn letters and numbers",
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "5",
              "ratingCount": "10"
            },
            "author": {
              "@type": "Person",
              "name": "Rama Subba Reddy",
              "url": "https://therama.dev"
            }
          })}
        </script>
      </Helmet>

      <div className={`min-h-screen transition-colors duration-300 ${darkMode
        ? 'bg-gradient-to-b from-gray-900 to-indigo-900 text-white'
        : 'bg-gradient-to-b from-sky-400 to-indigo-500 text-white'}`}>

        <div className="container mx-auto px-4 py-8">
          <header className="flex justify-between items-center mb-6">
            <div className="flex items-center">
              <BookIcon className="h-8 w-8 mr-2" aria-hidden="true" />
              <h1 className="text-2xl md:text-3xl font-bold">Happy Letters</h1>
            </div>

            <div className="flex items-center">
              <SettingsMenu
                voiceType={voiceType}
                onVoiceChange={setVoiceType}
                imageSource={imageSource}
                onImageSourceChange={setImageSource}
                darkMode={darkMode}
              />

              <button
                onClick={toggleDarkMode}
                className={`p-2 ml-2 rounded-full ${darkMode ? 'bg-gray-700 text-yellow-300' : 'bg-indigo-600 text-white'}`}
                aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
              >
                {darkMode ? <SunIcon className="h-5 w-5" /> : <MoonIcon className="h-5 w-5" />}
              </button>
            </div>
          </header>

          <main className="w-full max-w-3xl mx-auto">
            <TypingGame
              darkMode={darkMode}
              voiceType={voiceType}
              imageSource={imageSource}
            />
          </main>

          <footer className="mt-16 py-6 text-center">
            <Separator className={darkMode ? "bg-gray-700" : "bg-white/20"} />
            <div className="mt-6 text-sm">
              {/* <p className="mb-2">Developed by Rama Subba Reddy for his lovable daughter Jahnavi.</p> */}
              <p className="mb-4">All rights reserved, 2025</p>
              <div className="flex justify-center space-x-4">
                <a
                  href="https://github.com/ramaeondev/alphabets.therama.dev"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center hover:underline"
                  aria-label="GitHub Repository"
                >
                  <GithubIcon className="h-4 w-4 mr-1" aria-hidden="true" />
                  <span>GitHub</span>
                </a>
                <a
                  href="https://therama.dev"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                  aria-label="Developer Portfolio"
                >
                  Portfolio
                </a>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </>
  );
};

export default Index;