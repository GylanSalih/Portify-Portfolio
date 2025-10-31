'use client';

import React from 'react';
import { ArrowRight } from 'lucide-react';
import styles from './AboutCTA.module.scss';

const AboutCTA = () => {
  const handleContactClick = () => {
    // You can customize this action (e.g., scroll to contact form, open modal, navigate)
    window.location.href = '#contact';
  };

  return (
    <section className={styles.ctaBlock}>
      <div className={styles.container}>
        <div className={styles.inner}>
          <p className={styles.eyebrow}>CONTACT US</p>
          
          <h3 className={styles.title}>
            Your Vision, My Expertise. Let&apos;s connect.
          </h3>
          
          <div className={styles.link}>
            <button 
              className={styles.button}
              onClick={handleContactClick}
              aria-label="Let's talk"
            >
              <span className={styles.buttonText}>Let&apos;s Talk</span>
              <ArrowRight className={styles.buttonIcon} size={20} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutCTA;

