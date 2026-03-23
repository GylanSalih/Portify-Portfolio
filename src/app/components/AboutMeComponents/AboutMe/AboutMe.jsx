'use client';

import React, { useRef, useState, useEffect } from 'react';
import { Github, Linkedin, Dribbble, Mail } from 'lucide-react';
import styles from './AboutMe.module.scss';

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

        <div className={styles.socialLinks}>
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

        <div className={styles.contentGrid}>
          <div className={styles.profileColumn}>
            <div className={styles.imageWrapper}>
              <img
                src="/assets/images/about/aboutme.jpg"
                alt="Profile"
                className={styles.profileImage}
              />
              <div className={styles.imageOverlay}></div>
            </div>

            <div className={styles.profileInformations}>
              <h3>About Me</h3>
              <ul>
                <li className="profile-item">
                  <span className="profile-label">Name</span>
                  <span className="profile-content">Gylan Salih</span>
                </li>
                <li className="profile-item">
                  <span className="profile-label">Profession</span>
                  <span className="profile-content">
                    Student &amp; Freelancer
                  </span>
                </li>
                <li className="profile-item">
                  <span className="profile-label">Hobbies</span>
                  <span className="profile-content">
                    Collecting retro games, playing Yu-Gi-Oh, watching anime,
                    and reading manga.
                  </span>
                </li>
                <li className="profile-item">
                  <span className="profile-label">Favorite Language</span>
                  <span className="profile-content">Next.js</span>
                </li>
                <li className="profile-item">
                  <span className="profile-label">Interests</span>
                  <span className="profile-content">
                    Coding successful things
                  </span>
                </li>
              </ul>
            </div>
          </div>

          <div className={styles.contentColumn}>
            <h5>My Personality</h5>
            <div className={styles.techstack}>
              <div className={styles.techItem}>
                <img
                  className={styles.techIcon}
                  src="/assets/images/about/team.svg"
                  alt="Teamwork"
                />
                <span className={styles.techText}>
                  Collaborative Team Player
                </span>
              </div>
              <div className={styles.techItem}>
                <img
                  className={styles.techIcon}
                  src="/assets/images/about/fire.svg"
                  alt="Problem Solving"
                />
                <span className={styles.techText}>
                  Analytical &amp; Solution-Oriented
                </span>
              </div>
              <div className={styles.techItem}>
                <img
                  className={styles.techIcon}
                  src="/assets/images/about/code.svg"
                  alt="Passion"
                />
                <span className={styles.techText}>Driven &amp; Passionate</span>
              </div>
              <div className={styles.techItem}>
                <img
                  className={styles.techIcon}
                  src="/assets/images/about/chat.svg"
                  alt="Communication"
                />
                <span className={styles.techText}>
                  Friendly &amp; Strong Communicator
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Full-width timeline below the two-column split */}
        <div className={styles.timelineSection}>
          <h5>My Journey</h5>

          <div className={styles.timelineGrid} ref={timelineRef} style={{ '--timeline-progress': `${timelineProgress * 100}%` }}>
            {/* 4 items — dots activate at 0%, 25%, 50%, 75% progress thresholds */}
            <div className={`${styles.timelineItem} ${timelineProgress >= 0.05 ? styles.timelineItemActive : ''}`}>
              <div className={styles.timelineCard}>
                <div className={styles.timelineHeader}>
                  <div className={styles.timelineYear}>05.2025 - Now</div>
                  <div className={styles.timelineCompany}>Voluntary Work</div>
                </div>
                <h3 className={styles.timelineTitle}>
                  Voluntary Work for Students and Children with Migration Background
                </h3>
                <p className={styles.timelineDescription}>
                  Supporting students and children with migration backgrounds — helping
                  foster integration and learning opportunities for those who need it
                  most.
                </p>
              </div>
            </div>

            <div className={`${styles.timelineItem} ${timelineProgress >= 0.3 ? styles.timelineItemActive : ''}`}>
              <div className={styles.timelineCard}>
                <div className={styles.timelineHeader}>
                  <div className={styles.timelineYear}>2023 - 2025</div>
                  <div className={styles.timelineCompany}>Higher Education</div>
                </div>
                <h3 className={styles.timelineTitle}>
                  Advanced Secondary Education (Fachabitur)
                </h3>
                <p className={styles.timelineDescription}>
                  Working towards my Fachabitur — a meaningful step towards
                  change and building a real future.
                </p>
              </div>
            </div>

            <div className={`${styles.timelineItem} ${timelineProgress >= 0.58 ? styles.timelineItemActive : ''}`}>
              <div className={styles.timelineCard}>
                <div className={styles.timelineHeader}>
                  <div className={styles.timelineYear}>02.2019 - 08.2023</div>
                  <div className={styles.timelineCompany}>Higher Education</div>
                </div>
                <h3 className={styles.timelineTitle}>
                  Secondary School Certificate (FORQ)
                </h3>
                <p className={styles.timelineDescription}>
                  Years of persistence paid off. If I made it, you certainly
                  can too — just don&#39;t give up.
                </p>
              </div>
            </div>

            <div className={`${styles.timelineItem} ${timelineProgress >= 0.82 ? styles.timelineItemActive : ''}`}>
              <div className={styles.timelineCard}>
                <div className={styles.timelineHeader}>
                  <div className={styles.timelineYear}>08.2018 - 02.2019</div>
                  <div className={styles.timelineCompany}>Higher Education</div>
                </div>
                <h3 className={styles.timelineTitle}>
                  Extended General School Certificate
                </h3>
                <p className={styles.timelineDescription}>
                  Started with the preparatory course, completed grade 9, and
                  reaching grade 10 was my first real milestone.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutMe;
