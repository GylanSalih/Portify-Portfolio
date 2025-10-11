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
            className={`hamburger-overlay ${isOpen ? 'open' : ''}`}
            onClick={onClose}
          />

          {/* Mobile Menu Panel */}
          <div
            ref={menuRef}
            className={`hamburger-menu-panel ${isDarkMode ? 'dark' : 'light'} ${isOpen ? 'open' : ''}`}
          >
            {/* Menu Header */}
            <div className="menu-header">
              <h2 className="menu-title">Navigation</h2>
              <p className="menu-subtitle">Explore my digital world</p>
            </div>

            {/* Navigation Links */}
            <nav className="menu-nav">
              <ul className="menu-list">
                {menuItems.map((item, index) => {
                  const IconComponent = item.icon;
                  return (
                    <li
                      key={item.href}
                      className="menu-item"
                      style={{ animationDelay: '0s' }}
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
                    </li>
                  );
                })}
              </ul>
            </nav>

            {/* Social Links */}
            <div className="menu-social">
              <h3 className="menu-social-title">Connect</h3>
              <div className="menu-social-links">
                {socialLinks.map((social, index) => {
                  const IconComponent = social.icon;
                  return (
                    <a
                      key={social.href}
                      href={social.href}
                      className="menu-social-link"
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
              className="menu-close-btn"
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