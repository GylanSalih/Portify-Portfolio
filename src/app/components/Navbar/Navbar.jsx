'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDarkMode } from '../../contexts/DarkModeContext';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import DarkModeToggle from './DarkModeToggle/DarkModeToggle';
import AudioIndicator from './AudioIndicator/AudioIndicator';
import HamburgerMenu from './HamburgerMenu/HamburgerMenu';
import styles from './Navbar.module.scss';

const Navbar = () => {
  const { isDarkMode, toggleDarkMode } = useDarkMode();
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
    // { href: '/testing', label: 'Testing' }, // Deaktiviert
    // { href: '/testing4', label: 'Page4' }, // Deaktiviert
  ];

  const navbarVariants = {
    hidden: { y: -100, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 20,
      },
    },
  };

  return (
    <>
      {/* Desktop Navbar */}
      <motion.header
        ref={navbarRef}
        className={`${styles.navbar} ${styles['lg-block']}`}
        variants={navbarVariants}
        initial="hidden"
        animate="visible"
      >
        <div className={styles.container}>
          <div
            className={`${styles.navbarContent} ${
              isScrolled ? styles.scrolled : styles.notScrolled
            }`}
          >
            {/* Logo */}
            <motion.div
              className={styles.logo}
              whileHover={{ scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 400, damping: 10 }}
            >
              <Link href="/" className={styles.logoLink}>
                <Image
                  src={
                    isDarkMode
                      ? '/assets/images/logo_white.png'
                      : '/assets/images/logo_black.png'
                  }
                  alt="Portify Logo"
                  width={isScrolled ? 48 : 48}
                  height={isScrolled ? 48 : 48}
                  className={styles.logoImage}
                  priority
                />
              </Link>
            </motion.div>

            {/* Desktop Navigation */}
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
              <AudioIndicator
                isAudioPlaying={isAudioPlaying}
                toggleAudioIndicator={toggleAudioIndicator}
              />
              <DarkModeToggle
                toggleDarkMode={toggleDarkMode}
                isDarkMode={isDarkMode}
              />
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile Navbar */}
      <motion.header
        className={`${styles.navbar} ${styles.mobileNavbar} ${styles['lg-hidden']}`}
        variants={navbarVariants}
        initial="hidden"
        animate="visible"
      >
        <div className={styles.mobileContainer}>
          <div className={styles.mobileContent}>
            {/* Mobile Logo */}
            <motion.div
              className={styles.mobileLogo}
              whileHover={{ scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 400, damping: 10 }}
            >
              <Link href="/" className={styles.logoLink}>
                <Image
                  src={
                    isDarkMode
                      ? '/assets/images/logo_white.png'
                      : '/assets/images/logo_black.png'
                  }
                  alt="Portify Logo"
                  width={62}
                  height={62}
                  priority
                />
              </Link>
            </motion.div>

            {/* Mobile Controls */}
            <div className={styles.mobileControls}>
              <AudioIndicator
                isAudioPlaying={isAudioPlaying}
                toggleAudioIndicator={toggleAudioIndicator}
              />
              <DarkModeToggle
                toggleDarkMode={toggleDarkMode}
                isDarkMode={isDarkMode}
              />
              <motion.button
                className={`${styles.mobileMenuButton} ${
                  isDarkMode
                    ? styles.mobileMenuButtonDark
                    : styles.mobileMenuButtonLight
                }`}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                whileTap={{ scale: 0.95 }}
              >
                <AnimatePresence mode="wait">
                  {isMobileMenuOpen ? (
                    <motion.div
                      key="close"
                      className={`${styles.menuIcon} ${styles.close}`}
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <X size={20} />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      className={`${styles.menuIcon} ${styles.menu}`}
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Menu size={20} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Hamburger Menu */}
      <HamburgerMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </>
  );
};

export default Navbar;
