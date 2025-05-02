import React, { ReactNode, useState, useEffect } from 'react';
import { Moon, Sun, Youtube, Menu, X } from 'lucide-react';
import { useYouTube } from '../context/YouTubeContext';
import SearchBar from './SearchBar';
import NotificationButton from './NotificationButton';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { state } = useYouTube();
  const [darkMode, setDarkMode] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js').catch(error => {
        console.error('Service Worker registration failed:', error);
      });
    }
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-100 text-gray-900'}`}>
      <header className={`sticky top-0 z-10 ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-md`}>
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Youtube className="h-8 w-8 text-red-600" />
              <h1 className="text-xl font-bold md:text-2xl">
                {state.channel?.title || 'LemonPUBG Videos'}
              </h1>
            </div>
            
            <div className="hidden md:flex items-center space-x-4">
              <SearchBar />
              <NotificationButton />
              <button 
                onClick={toggleDarkMode}
                className={`p-2 rounded-full ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'}`}
                aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
              >
                {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </button>
            </div>
            
            <div className="md:hidden">
              <button 
                onClick={toggleMobileMenu}
                className={`p-2 rounded-full ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'}`}
                aria-label="Open menu"
              >
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
          
          {mobileMenuOpen && (
            <div className={`mt-4 py-3 ${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg`}>
              <div className="px-4 py-2">
                <SearchBar />
              </div>
              <div className="px-4 py-2 flex items-center justify-between">
                <span>{darkMode ? 'Dark Mode' : 'Light Mode'}</span>
                <div className="flex items-center space-x-2">
                  <NotificationButton />
                  <button 
                    onClick={toggleDarkMode}
                    className={`p-2 rounded-full ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'}`}
                    aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
                  >
                    {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>
      
      <footer className={`py-6 ${darkMode ? 'bg-gray-800' : 'bg-gray-200'}`}>
        <div className="container mx-auto px-4 text-center">
          <p>© {new Date().getFullYear()} • Latest videos from LemonPUBG YouTube channel</p>
          <p className="mt-2 text-sm">
            <a 
              href="https://www.youtube.com/@LemonPUBGYT" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-red-500 hover:text-red-400"
            >
              Visit Channel
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;