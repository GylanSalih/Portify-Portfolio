'use client';

import React, { useState, useEffect } from 'react';
import { useDarkMode } from '../../contexts/DarkModeContext';
import Link from 'next/link';
import Image from 'next/image';
import DarkModeToggle from './DarkModeToggle/DarkModeToggle';
import AudioIndicator from './AudioIndicator/AudioIndicator';
import HamburgerMenu from './HamburgerMenu/HamburgerMenu';
import styles from './Navbar.module.scss';

const Navbar = () => {
  const { isDarkMode } = useDarkMode();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [isToolsOpen, setIsToolsOpen] = useState(false);
  const toolsRef = React.useRef(null);

  // Close Tools dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (toolsRef.current && !toolsRef.current.contains(e.target)) {
        setIsToolsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleAudioIndicator = () => {
    setIsAudioPlaying(prev => !prev);
  };

  const toolsItems = [
    { href: '/tools/gradient-generator', label: 'Gradient Generator' },
    { href: '/tools/shadow-generator', label: 'Shadow Generator' },
    { href: '/tools/operator-lookup', label: 'Operator Lookup' },
    { href: '/tools/snippets', label: 'Snippets' },
  ];

  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/blog', label: 'Blog' },
    { href: '/portfolio', label: 'Portfolio' },
    { href: '/showcase', label: 'Showcase' },
    { href: '/about', label: 'About' },
  ];

  return (
    <>
      {/* Desktop Navbar */}
      <header className={`${styles.navbar} ${styles['lg-block']}`}>
        <div className={styles.container}>
            <div
              className={`${styles.navbarContent} ${
                isScrolled ? styles.scrolled : styles.notScrolled
              } ${isDarkMode ? styles.darkMode : ''}`}
            >
            {/* Logo */}
            <div className={styles.logo}>
              <Link href="/" className={styles.logoLink}>
                <Image
                  src={
                    isDarkMode
                      ? '/assets/images/logo/logo_white.png'
                      : '/assets/images/logo/logo_black.png'
                  }
                  alt="Portify Logo"
                  width={48}
                  height={48}
                  className={styles.logoImage}
                  priority
                />
              </Link>
            </div>

            {/* Desktop Navigation Links */}
            <nav className={styles.desktopNav}>
              {navItems.map(item => (
                <div key={item.href} className={styles.navItem}>
                  <Link 
                    href={item.href} 
                    className={`${styles.navLink} ${
                      isDarkMode ? styles.navLinkDark : styles.navLinkLight
                    }`}
                  >
                    {item.label}
                  </Link>
                </div>
              ))}
              {/* Tools dropdown */}
              <div
                ref={toolsRef}
                className={styles.navItem}
                onMouseEnter={() => setIsToolsOpen(true)}
                onMouseLeave={() => setIsToolsOpen(false)}
              >
                <button
                  className={`${styles.navLink} ${styles.navLinkTools} ${
                    isDarkMode ? styles.navLinkDark : styles.navLinkLight
                  }`}
                  onClick={() => setIsToolsOpen(!isToolsOpen)}
                  aria-expanded={isToolsOpen}
                >
                  Tools
                </button>
                {isToolsOpen && (
                  <div className={`${styles.toolsDropdown} ${isDarkMode ? styles.dropdownDark : styles.dropdownLight}`}>
                    {toolsItems.map(tool => (
                      <Link
                        key={tool.href}
                        href={tool.href}
                        className={styles.toolsDropdownItem}
                        onClick={() => setIsToolsOpen(false)}
                      >
                        {tool.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </nav>

            {/* Right Side Controls */}
            <div className={styles.rightControls}>
              <DarkModeToggle />
              <AudioIndicator
                isPlaying={isAudioPlaying}
                onClick={toggleAudioIndicator}
              />
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Navbar */}
      <header className={`${styles.navbar} ${styles['lg-hidden']}`}>
        <div className={`${styles.mobileNavbar} ${
          isScrolled ? styles.scrolled : styles.notScrolled
        } ${isDarkMode ? styles.darkMode : ''}`}>
          <div className={styles.mobileContainer}>
            <div className={styles.mobileContent}>
              {/* Mobile Logo */}
              <div className={styles.mobileLogo}>
                <Link href="/" className={styles.logoLink}>
                  <Image
                    src={
                      isDarkMode
                        ? '/assets/images/logo/logo_white.png'
                        : '/assets/images/logo/logo_black.png'
                    }
                    alt="Portify Logo"
                    width={48}
                    height={48}
                    className={styles.logoImage}
                    priority
                  />
                </Link>
              </div>

              {/* Mobile Controls */}
              <div className={styles.mobileControls}>
                <DarkModeToggle />
                <AudioIndicator
                  isPlaying={isAudioPlaying}
                  onClick={toggleAudioIndicator}
                />
                <button
                  className={`${styles.mobileMenuButton} ${
                    isDarkMode ? styles.mobileMenuButtonDark : styles.mobileMenuButtonLight
                  }`}
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  aria-label="Open menu"
                >
                  <div className={styles.hamburgerIcon}>
                    <span className={styles.hamburgerLine}></span>
                    <span className={styles.hamburgerLine}></span>
                    <span className={styles.hamburgerLine}></span>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <HamburgerMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </>
  );
};

export default Navbar;