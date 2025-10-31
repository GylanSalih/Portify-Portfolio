'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { Github, Linkedin, Dribbble, Mail } from 'lucide-react';
import styles from './Footer.module.scss';

const Footer = () => {
  const pathname = usePathname();
  
  // Hide footer on showcase page
  if (pathname === '/showcase') {
    return null;
  }
  
  return (
    <footer className={styles.footer}>
      <div className={styles.content}>
        <div className={styles.bottom}>
          <div className={styles.left}>
            <span className={styles.copyright}>© Gylan Salih</span>
            <span className={styles.legal}>
              <a
                href="https://github.com/GylanSalih/NextJS-Portify/tree/main"
                target="_blank"
                rel="noopener noreferrer"
              >
                If you like the website, feel free to visit the open-source
                repository!
              </a>
            </span>
          </div>

          <div className={styles.socials}>
            <a
              href="https://github.com/GylanSalih/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className={styles.icon} />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Linkedin className={styles.icon} />
            </a>
            <a
              href="https://dribbble.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Dribbble className={styles.icon} />
            </a>
            <a href="mailto:hello@portfolio.com">
              <Mail className={styles.icon} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
