'use client';

import { createContext, useContext, useState, useEffect } from 'react';

const DarkModeContext = createContext();

export const useDarkMode = () => {
  const context = useContext(DarkModeContext);
  if (!context) {
    throw new Error('useDarkMode must be used within a DarkModeProvider');
  }
  return context;
};

export const DarkModeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  // Initialize dark mode from localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedMode = localStorage.getItem('darkMode');
      const darkMode = savedMode ? savedMode === 'true' : true; // Default to true (dark mode)
      setIsDarkMode(darkMode);
      setIsInitialized(true);

      // Apply dark mode class to the root element (only if not already applied by script)
      if (darkMode && !document.documentElement.classList.contains('dark-mode')) {
        document.documentElement.classList.add('dark-mode');
      } else if (!darkMode) {
        document.documentElement.classList.remove('dark-mode');
      }
    }
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode(prev => {
      const newState = !prev;

      // Store the updated dark mode value in localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('darkMode', newState.toString());

        // Add or remove the dark-mode class from the root element
        if (newState) {
          document.documentElement.classList.add('dark-mode');
        } else {
          document.documentElement.classList.remove('dark-mode');
        }
      }
      return newState;
    });
  };

  const value = {
    isDarkMode,
    toggleDarkMode,
    isInitialized,
  };

  return (
    <DarkModeContext.Provider value={value}>
      {children}
    </DarkModeContext.Provider>
  );
};
