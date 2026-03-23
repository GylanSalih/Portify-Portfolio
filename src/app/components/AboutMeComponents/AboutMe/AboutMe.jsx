'use client';

import React, { useRef, useState, useEffect } from 'react';
import { Github, Linkedin, Dribbble, Mail } from 'lucide-react';
import styles from './AboutMe.module.scss';

const SVG_BASE = '/assets/images/svg%20animated';

const AboutMe = () => {
  const timelineRef = useRef(null);
  const [timelineProgress, setTimelineProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!timelineRef.current) return;
      const rect = timelineRef.current.getBoundingClientRect();
      const windowH = window.innerHeight;
      // start: timeline top hits bottom of screen → progress = 0
      // end: timeline bottom hits 40% from top of screen → progress = 1
      const start = windowH;
      const end = -(rect.height - windowH * 0.6);
      let progress = (start - rect.top) / (start - end);
      setTimelineProgress(Math.max(0, Math.min(1, progress)));
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className={styles.section} id="about">
      <div className={styles.container}>
        <div className={styles.headerWrapper}>
          <h2 className={styles.preheading}>About Me</h2>
        </div>

        {/* Full-width timeline below the two-column split */}
        <div className={styles.timelineSection}>
          <h5>My Journey</h5>

          <div className={styles.timelineGrid} ref={timelineRef} style={{ '--timeline-progress': `${timelineProgress * 100}%` }}>
            {/* 4 items — dots activate at 0%, 25%, 50%, 75% progress thresholds */}
            <div className={`${styles.timelineItem} ${timelineProgress >= 0.05 ? styles.timelineItemActive : ''}`}>
              <div className={styles.timelineCard}>
                <div className={styles.timelineInfo}>
                  <ul>
                    <li className="profile-item">
                      <span className="profile-label">Vertrauen</span>
                      <span className="profile-content">Echtes Vertrauen entsteht durch Transparenz und Verlässlichkeit.</span>
                    </li>
                  </ul>
                </div>
                <div className={styles.timelineSvgWrap}>
                  <img src={`${SVG_BASE}/vertrauenAnimated.svg`} alt="Vertrauen" className={styles.timelineSvg} />
                </div>
              </div>
            </div>

            <div className={`${styles.timelineItem} ${timelineProgress >= 0.3 ? styles.timelineItemActive : ''}`}>
              <div className={styles.timelineCard}>
                <div className={styles.timelineInfo}>
                  <ul>
                    <li className="profile-item">
                      <span className="profile-label">Strategie</span>
                      <span className="profile-content">Jedes Projekt beginnt mit einem klaren Plan und einer durchdachten Strategie.</span>
                    </li>
                  </ul>
                </div>
                <div className={styles.timelineSvgWrap}>
                  <img src={`${SVG_BASE}/strategieAnimated.svg`} alt="Strategie" className={styles.timelineSvg} />
                </div>
              </div>
            </div>

            <div className={`${styles.timelineItem} ${timelineProgress >= 0.58 ? styles.timelineItemActive : ''}`}>
              <div className={styles.timelineCard}>
                <div className={styles.timelineInfo}>
                  <ul>
                    <li className="profile-item">
                      <span className="profile-label">Redesign</span>
                      <span className="profile-content">Bestehende Produkte neu denken — frisch, modern und wirkungsvoll.</span>
                    </li>
                  </ul>
                </div>
                <div className={styles.timelineSvgWrap}>
                  <img src={`${SVG_BASE}/redesignAnimated.svg`} alt="Redesign" className={styles.timelineSvg} />
                </div>
              </div>
            </div>

            <div className={`${styles.timelineItem} ${timelineProgress >= 0.82 ? styles.timelineItemActive : ''}`}>
              <div className={styles.timelineCard}>
                <div className={styles.timelineInfo}>
                  <ul>
                    <li className="profile-item">
                      <span className="profile-label">Performance</span>
                      <span className="profile-content">Schnelle, saubere Interfaces — gebaut für Qualität und Geschwindigkeit.</span>
                    </li>
                  </ul>
                </div>
                <div className={styles.timelineSvgWrap}>
                  <img src={`${SVG_BASE}/redesignAnimated.svg`} alt="Performance" className={styles.timelineSvg} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutMe;
