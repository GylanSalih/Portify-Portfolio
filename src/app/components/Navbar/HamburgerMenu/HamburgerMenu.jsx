'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDarkMode } from '../../../contexts/DarkModeContext';
import {
  Home,
  User,
  Briefcase,
  PenTool,
  MessageSquare,
  X,
  Sun,
  Moon,
  Github,
  Linkedin,
  Twitter,
  TestTube,
} from 'lucide-react';
import Link from 'next/link';
import './HamburgerMenu.css';

const HamburgerMenu = ({ isOpen, onClose }) => {
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const menuRef = useRef(null);
  const overlayRef = useRef(null);

  const menuItems = [
    {
      href: '/',
      label: 'Home',
      icon: Home,
      description: 'Welcome to my digital space',
    },
    {
      href: '/about',
      label: 'About',
      icon: User,
      description: 'Learn more about me',
    },
    {
      href: '/portfolio',
      label: 'Portfolio',
      icon: Briefcase,
      description: 'Explore my work',
    },
    {
      href: '/blog',
      label: 'Blog',
      icon: PenTool,
      description: 'Thoughts & insights',
    },
    // {
    //   href: '/testing3',
    //   label: 'Testing3',
    //   icon: TestTube,
    //   description: 'Holographic cards showcase',
    // }, // Deaktiviert
    // {
    //   href: '/testing4',
    //   label: 'Page4',
    //   icon: TestTube,
    //   description: 'Kartenversuch grid 4x4',
    // }, // Deaktiviert
    {
      href: '/guestbook',
      label: 'Guestbook',
      icon: MessageSquare,
      description: 'Leave a message',
    },
  ];

  const socialLinks = [
    { href: 'https://github.com', label: 'GitHub', icon: Github },
    { href: 'https://linkedin.com', label: 'LinkedIn', icon: Linkedin },
    { href: 'https://twitter.com', label: 'Twitter', icon: Twitter },
  ];

  // Close menu on escape key
  useEffect(() => {
    const handleEscape = e => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  // Close menu on route change
  useEffect(() => {
    onClose();
  }, []);

  const handleLinkClick = () => {
    onClose();
  };

  const menuVariants = {
    closed: {
      x: '100%',
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 30,
      },
    },
    open: {
      x: 0,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 30,
      },
    },
  };

  const overlayVariants = {
    closed: {
      opacity: 0,
      transition: {
        duration: 0.3,
      },
    },
    open: {
      opacity: 1,
      transition: {
        duration: 0.3,
      },
    },
  };

  const itemVariants = {
    closed: { opacity: 0, x: 20 },
    open: i => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.3,
        ease: 'easeOut',
      },
    }),
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop Overlay */}
          <motion.div
            ref={overlayRef}
            className="hamburger-overlay"
            variants={overlayVariants}
            initial="closed"
            animate="open"
            exit="closed"
            onClick={onClose}
          />

          {/* Mobile Menu Panel */}
          <motion.div
            ref={menuRef}
            className={`hamburger-menu-panel ${isDarkMode ? 'dark' : 'light'}`}
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
          >
            {/* Menu Header */}
            <div className="menu-header">
              <motion.h2
                className="menu-title"
                custom={0}
                variants={itemVariants}
                initial="closed"
                animate="open"
              >
                Navigation
              </motion.h2>
              <motion.p
                className="menu-subtitle"
                custom={1}
                variants={itemVariants}
                initial="closed"
                animate="open"
              >
                Explore my digital world
              </motion.p>
            </div>

            {/* Navigation Links */}
            <nav className="menu-nav">
              <ul className="menu-list">
                {menuItems.map((item, index) => {
                  const IconComponent = item.icon;
                  return (
                    <motion.li
                      key={item.href}
                      className="menu-item"
                      custom={index + 2}
                      variants={itemVariants}
                      initial="closed"
                      animate="open"
                    >
                      <Link
                        href={item.href}
                        className="menu-link"
                        onClick={handleLinkClick}
                      >
                        <div className="menu-link-content">
                          <div className="menu-link-icon">
                            <IconComponent size={24} />
                          </div>
                          <div className="menu-link-text">
                            <span className="menu-link-label">
                              {item.label}
                            </span>
                            <span className="menu-link-description">
                              {item.description}
                            </span>
                          </div>
                        </div>
                      </Link>
                    </motion.li>
                  );
                })}
              </ul>
            </nav>

            {/* Social Links */}
            <div className="menu-social">
              <motion.h3
                className="menu-social-title"
                custom={7}
                variants={itemVariants}
                initial="closed"
                animate="open"
              >
                Connect
              </motion.h3>
              <div className="menu-social-links">
                {socialLinks.map((social, index) => {
                  const IconComponent = social.icon;
                  return (
                    <motion.a
                      key={social.href}
                      href={social.href}
                      className="menu-social-link"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={handleLinkClick}
                      custom={index + 8}
                      variants={itemVariants}
                      initial="closed"
                      animate="open"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <IconComponent size={20} />
                    </motion.a>
                  );
                })}
              </div>
            </div>

            {/* Close Button */}
            <motion.button
              className="menu-close-btn"
              onClick={onClose}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              custom={10}
              variants={itemVariants}
              initial="closed"
              animate="open"
            >
              <X size={24} />
            </motion.button>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default HamburgerMenu;
