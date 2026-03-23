'use client';

import React, { useRef, useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import styles from './AboutCTA.module.scss';

const AboutCTA = () => {
  const cardRef = useRef(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const start = windowHeight;
      const end = -rect.height;
      let progress = (start - rect.top) / (start - end);
      progress = Math.max(0, Math.min(1, progress));
      const centered = progress * 2 - 1;
      setOffset(centered * 100);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleContactClick = () => {
    window.location.href = '#contact';
  };

  return (
    <section className={styles.ctaBlock}>
      <div className={styles.container}>
        <div ref={cardRef} className={styles.inner}>
          {/* Parallax background image */}
          <div
            className={styles.bgImage}
            style={{ transform: `translateY(${offset}px)` }}
          >
            <Image
              src="/assets/images/landing/OniGirl13.webp"
              alt=""
              fill
              className={styles.bgImg}
              aria-hidden="true"
            />
          </div>
          {/* Dark overlay */}
          <div className={styles.overlay} />

          {/* Foreground content */}
          <div className={styles.content}>
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
      </div>
    </section>
  );
};

export default AboutCTA;

