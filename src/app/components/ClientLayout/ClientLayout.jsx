'use client';

import { useDarkMode } from '../../contexts/DarkModeContext';
import Navbar from '../Navbar/Navbar';
import Preload from '../Preload/Preload';

export default function ClientLayout({ children, enablePreloader = false }) {
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  return (
    <>
      {enablePreloader && <Preload />}
      <Navbar toggleDarkMode={toggleDarkMode} isDarkMode={isDarkMode} />
      <main>{children}</main>
    </>
  );
}
