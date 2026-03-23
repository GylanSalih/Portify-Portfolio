'use client';

import React from 'react';
import { Github, Linkedin, Dribbble, Mail } from 'lucide-react';
import styles from './AboutProfile.module.scss';

const AboutProfile = () => {
  return (
    <section className={styles.profileBlock}>
      <div className={styles.container}>
        <div className={styles.grid}>

          {/* Left: social icons above, profile image below */}
          <div className={styles.left}>
            <div className={styles.socials}>
              <a
                href="https://github.com/GylanSalih/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
              >
                <Github className={styles.icon} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
              >
                <Linkedin className={styles.icon} />
              </a>
              <a
                href="https://dribbble.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Dribbble"
              >
                <Dribbble className={styles.icon} />
              </a>
              <a href="mailto:hello@portfolio.com" aria-label="Email">
                <Mail className={styles.icon} />
              </a>
            </div>

            <div className={styles.imageWrapper}>
              <img
                src="/assets/images/about/aboutme.jpg"
                alt="Profile"
                className={styles.profileImage}
              />
              <div className={styles.imageOverlay} />
            </div>
          </div>

          {/* Right: title + text */}
          <div className={styles.right}>
            <h2 className={styles.title}>About Me</h2>
            <p className={styles.text}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};

export default AboutProfile;
