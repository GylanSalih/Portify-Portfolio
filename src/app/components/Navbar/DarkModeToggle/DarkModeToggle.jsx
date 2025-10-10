'use client';

import React from 'react';
import { useDarkMode } from '../../../contexts/DarkModeContext';
import { Sun, Moon } from 'lucide-react';

const DarkModeToggle = ({ className = '' }) => {
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  return (
    <button
      onClick={toggleDarkMode}
      className={`dark-mode-toggle ${className}`}
      aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      <div className="toggle-icon">
        {isDarkMode ? (
          <Sun size={20} className="icon sun-icon" />
        ) : (
          <Moon size={20} className="icon moon-icon" />
        )}
      </div>
    </button>
  );
};

export default DarkModeToggle;