'use client';

import { useState, useEffect } from 'react';
import { useDarkMode } from '../../contexts/DarkModeContext';
import Navbar from '../Navbar/Navbar';
import Mouse from '../Mouse/Mouse';
import Preload from '../Preload/Preload';

export default function ClientLayout({ children, enablePreloader = false }) {
  const { isDarkMode, toggleDarkMode, isInitialized } = useDarkMode();
  const [isAppLoaded, setIsAppLoaded] = useState(false);

  // Handle Preloader logic
  useEffect(() => {
    if (enablePreloader) {
      setTimeout(() => setIsAppLoaded(true), 5000);
    } else {
      setIsAppLoaded(true); // Directly set app as loaded if no preloader
    }
  }, [enablePreloader]);

  // Render immediately, dark mode styles will be applied via CSS

  return (
    <>
      {/* Show preloader if enabled and app is not loaded */}
      {enablePreloader && <Preload enablePreloader={enablePreloader} />}
      <Navbar toggleDarkMode={toggleDarkMode} isDarkMode={isDarkMode} />
      {/* <Mouse /> */}
      <main>{children}</main>
    </>
  );
}
