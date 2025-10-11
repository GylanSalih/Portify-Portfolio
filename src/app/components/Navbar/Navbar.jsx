'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useDarkMode } from '../../contexts/DarkModeContext';
import { Menu } from 'lucide-react';
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

  const navbarRef = useRef(null);

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, []);

  const toggleAudioIndicator = () => {
    setIsAudioPlaying(prev => !prev);
  };

  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/blog', label: 'Blog' },
    { href: '/portfolio', label: 'Portfolio' },
    { href: '/guestbook', label: 'Guestbook' },
    { href: '/about', label: 'About' },
  ];

  return (
    <>
      {/* Desktop Navbar */}
      <header
        ref={navbarRef}
        className={`${styles.navbar} ${styles['lg-block']}`}
      >
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
                      ? '/assets/images/logo_white.png'
                      : '/assets/images/logo_black.png'
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
        <div className={styles.mobileNavbar}>
          <div className={styles.mobileContainer}>
            <div className={styles.mobileContent}>
              {/* Mobile Logo */}
              <div className={styles.mobileLogo}>
                <Link href="/" className={styles.logoLink}>
                  <Image
                    src={
                      isDarkMode
                        ? '/assets/images/logo_white.png'
                        : '/assets/images/logo_black.png'
                    }
                    alt="Portify Logo"
                    width={40}
                    height={40}
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
                  onClick={() => setIsMobileMenuOpen(true)}
                  aria-label="Open menu"
                >
                  <Menu size={24} />
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