'use client';

import React, { useState, useEffect, useRef } from 'react';
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
            {/* Menu Header */}
            <div className={styles.menuHeader}>
              <h2 className={styles.menuTitle}>Navigation</h2>
              <p className={styles.menuSubtitle}>Explore my digital world</p>
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
                      style={{ animationDelay: '0s' }}
                    >
                      <Link
                        href={item.href}
                        className={styles.menuLink}
                        onClick={handleLinkClick}
                      >
                        <div className={styles.menuLinkContent}>
                          <div className={styles.menuLinkIcon}>
                            <IconComponent size={24} />
                          </div>
                          <div className={styles.menuLinkText}>
                            <span className={styles.menuLinkLabel}>
                              {item.label}
                            </span>
                            <span className={styles.menuLinkDescription}>
                              {item.description}
                            </span>
                          </div>
                        </div>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>

            {/* Social Links */}
            <div className={styles.menuSocial}>
              <h3 className={styles.menuSocialTitle}>Connect</h3>
              <div className={styles.menuSocialLinks}>
                {socialLinks.map((social, index) => {
                  const IconComponent = social.icon;
                  return (
                    <a
                      key={social.href}
                      href={social.href}
                      className={styles.menuSocialLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={handleLinkClick}
                      style={{ animationDelay: '0s' }}
                    >
                      <IconComponent size={20} />
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Close Button */}
            <button
              className={styles.menuCloseBtn}
              onClick={onClose}
            >
              <X size={24} />
            </button>
          </div>
        </>
      )}
    </>
  );
};

export default HamburgerMenu;