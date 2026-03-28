'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useDarkMode } from '../../../contexts/DarkModeContext';
import {
  Home,
  User,
  Briefcase,
  PenTool,
  X,
  Sun,
  Moon,
  ArrowUpRight,
  Image,
} from 'lucide-react';
import Link from 'next/link';
import styles from './styles.module.scss';

const HamburgerMenu = ({ isOpen, onClose }) => {
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const menuRef = useRef(null);
  const overlayRef = useRef(null);

  // Three-phase animation:
  //   Open:  isVisible→true → 2 rAFs → panelOpen→true (panel slides in, 600ms) → itemsVisible→true
  //   Close: itemsVisible→false (items exit, 380ms) → panelOpen→false (panel slides out, 650ms) → isVisible→false
  const [isVisible, setIsVisible] = useState(false);
  const [panelOpen, setPanelOpen] = useState(false);
  const [itemsVisible, setItemsVisible] = useState(false);
  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      let cancelled = false;
      const f = requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          if (!cancelled) setPanelOpen(true);
        });
      });
      const t = setTimeout(() => { if (!cancelled) setItemsVisible(true); }, 590);
      return () => {
        cancelled = true;
        cancelAnimationFrame(f);
        clearTimeout(t);
      };
    } else {
      setItemsVisible(false);
      const t1 = setTimeout(() => setPanelOpen(false), 380);
      const t2 = setTimeout(() => setIsVisible(false), 1050);
      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
      };
    }
  }, [isOpen]);

  const menuItems = [
    {
      href: '/',
      label: 'Home',
      icon: Home,
      description: 'Welcome to my digital space',
    },
    {
      href: '/blog',
      label: 'Blog',
      icon: PenTool,
      description: 'Thoughts & insights',
    },
    {
      href: '/showcase',
      label: 'Showcase',
      icon: Image,
      description: 'Visual gallery of my work',
    },
    {
      href: '/portfolio',
      label: 'Portfolio',
      icon: Briefcase,
      description: 'Explore my work',
    },
    {
      href: '/about',
      label: 'About',
      icon: User,
      description: 'Learn more about me',
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
      const scrollY = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      const scrollY = Math.abs(parseInt(document.body.style.top || '0'));
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.body.style.overflow = '';
      if (scrollY) {
        window.scrollTo({ top: scrollY, behavior: 'instant' });
      }
    };
  }, [isOpen, onClose]);


  const handleLinkClick = () => {
    onClose();
  };

  return (
    <>
      {isVisible && (
        <>
          {/* Backdrop Overlay */}
          <div
            ref={overlayRef}
            className={`${styles.hamburgerOverlay} ${panelOpen ? styles.open : ''}`}
            onClick={onClose}
          />

          {/* Mobile Menu Panel */}
          <div
            ref={menuRef}
            className={`${styles.hamburgerMenuPanel} ${isDarkMode ? styles.dark : styles.light} ${panelOpen ? styles.open : ''} ${itemsVisible ? styles.itemsOpen : ''}`}
          >
            {/* Top bar: Menu title + dark mode toggle + close */}
            <div className={styles.menuTopBar}>
              <h1 className={styles.menuTitle}>Menu</h1>
              <div className={styles.menuTopActions}>
                <button
                  className={styles.darkModeToggle}
                  onClick={toggleDarkMode}
                  aria-label="Toggle dark mode"
                >
                  {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
                </button>
                <button
                  className={styles.closeButton}
                  onClick={onClose}
                  aria-label="Close menu"
                >
                  <X size={24} />
                </button>
              </div>
            </div>

            {/* Navigation Links */}
            <nav className={styles.menuNav}>
              <ul className={styles.menuList}>
                {menuItems.map((item, index) => (
                    <li
                      key={item.href}
                      className={styles.menuItem}
                      style={{ '--item-index': index }}
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
                ))}
              </ul>
            </nav>

          </div>
        </>
      )}
    </>
  );
};

export default HamburgerMenu;