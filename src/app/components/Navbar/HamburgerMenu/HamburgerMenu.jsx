'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useDarkMode } from '../../../contexts/DarkModeContext';
import {
  Home,
  User,
  Briefcase,
  PenTool,
  MessageSquare,
  BarChart3,
  X,
  Sun,
  Moon,
  ArrowUpRight,
} from 'lucide-react';
import Link from 'next/link';
import styles from './styles.module.scss';

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
    {
      href: '/guestbook',
      label: 'Guestbook',
      icon: MessageSquare,
      description: 'Leave a message',
    },
    {
      href: '/dashboard',
      label: 'Dashboard',
      icon: BarChart3,
      description: 'Analytics & insights',
    },
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


  const handleLinkClick = () => {
    onClose();
  };

  return (
    <>
      {isOpen && (
        <>
          {/* Backdrop Overlay */}
          <div
            ref={overlayRef}
            className={`${styles.hamburgerOverlay} ${isOpen ? styles.open : ''}`}
            onClick={onClose}
          />

          {/* Mobile Menu Panel */}
          <div
            ref={menuRef}
            className={`${styles.hamburgerMenuPanel} ${isDarkMode ? styles.dark : styles.light} ${isOpen ? styles.open : ''}`}
          >
            {/* Close Button */}
            <button
              className={styles.closeButton}
              onClick={onClose}
              aria-label="Close menu"
            >
              <X size={24} />
            </button>

            {/* Menu Header */}
            <div className={styles.menuHeader}>
              <h1 className={styles.menuTitle}>Menu</h1>
            </div>

            {/* Navigation Links */}
            <nav className={styles.menuNav}>
              <ul className={styles.menuList}>
                {menuItems.map((item, index) => {
                  const IconComponent = item.icon;
                  return (
                    <li
                      key={item.href}
                      className={styles.menuItem}
                      style={{ 
                        animationDelay: `${index * 0.1}s`,
                        '--item-index': index 
                      }}
                    >
                      <Link
                        href={item.href}
                        className={styles.menuLink}
                        onClick={handleLinkClick}
                      >
                        <div className={styles.menuLinkContent}>
                          <span className={styles.menuLinkLabel}>
                            {item.label}
                          </span>
                          <ArrowUpRight className={styles.menuLinkArrow} size={20} />
                        </div>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>

            {/* Dark Mode Toggle */}
            <div className={styles.menuFooter}>
              <button
                className={styles.darkModeToggle}
                onClick={toggleDarkMode}
                aria-label="Toggle dark mode"
              >
                <div className={styles.toggleIcon}>
                  {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
                </div>
                <span className={styles.toggleLabel}>
                  {isDarkMode ? 'Light Mode' : 'Dark Mode'}
                </span>
              </button>
            </div>

          </div>
        </>
      )}
    </>
  );
};

export default HamburgerMenu;