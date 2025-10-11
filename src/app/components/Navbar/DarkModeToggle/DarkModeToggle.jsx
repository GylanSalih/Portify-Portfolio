'use client';

import React from 'react';
import { useDarkMode } from '../../../contexts/DarkModeContext';
import { Sun, Moon } from 'lucide-react';
import styles from './styles.module.scss';

const DarkModeToggle = ({ className = '' }) => {
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  return (
    <button
      onClick={toggleDarkMode}
      className={`${styles.darkmodeToggle} ${className}`}
      aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      <div className={styles.toggleIcon}>
        {isDarkMode ? (
          <Sun size={20} className={`${styles.icon} ${styles.sunIcon}`} />
        ) : (
          <Moon size={20} className={`${styles.icon} ${styles.moonIcon}`} />
        )}
      </div>
    </button>
  );
};

export default DarkModeToggle;