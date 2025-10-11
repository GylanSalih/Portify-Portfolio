'use client';
import React, { useRef, memo } from 'react';
import styles from './CallToAction.module.scss';
import { Link, Frame } from 'lucide-react';

const CallToAction = memo(() => {
  const sectionRef = useRef(null);

  const handleGitHubClick = () => {
    window.open('https://github.com/GylanSalih', '_blank');
  };

  const handleDemoClick = () => {
    window.open('portfolio', '_self');
  };

  return (
    <section
      ref={sectionRef}
      className={styles.section}
    >
      {/* Background Elements */}
      <div className={styles.backgroundGrid} suppressHydrationWarning></div>
      <div className={`${styles.orb} ${styles.orb1}`} suppressHydrationWarning></div>
      <div className={`${styles.orb} ${styles.orb2}`} suppressHydrationWarning></div>
      <div className={`${styles.orb} ${styles.orb3}`} suppressHydrationWarning></div>

      <div className={styles.container} suppressHydrationWarning>
        {/* Main Content Card */}
        <div className={styles.card} suppressHydrationWarning>
          {/* Background Video */}
          <video 
            className={styles.backgroundVideo}
            autoPlay 
            loop 
            muted 
            playsInline
          >
            <source src="/assets/videos/cyberpunk.mp4" type="video/mp4" />
          </video>

          <div className={styles.glow} suppressHydrationWarning></div>

          {/* Header */}
          <div className={styles.header} suppressHydrationWarning>
            <h1 className={styles.title}>
              <span className={styles.titleLine}>Let&apos;s Build</span>
              <span className={`${styles.titleLine} ${styles.gradient}`}>Something meaningful</span>
              <span className={styles.titleLine}>Together</span>
            </h1>
          </div>

          {/* Action Buttons */}
          <div className={styles.actions} suppressHydrationWarning>
            <button className={styles.secondaryButton} onClick={handleDemoClick}>
              <Frame size={20} />
              <span>View Work</span>
            </button>

            <button className={styles.secondaryButton} onClick={handleGitHubClick}>
              <Link size={20} />
              <span>GitHub</span>
            </button>
          </div>
        </div>

        {/* Bottom Stats */}
        <div className={styles.stats} suppressHydrationWarning>
          <div className={styles.stat} suppressHydrationWarning>
            <div className={styles.statNumber} suppressHydrationWarning>5+</div>
            <div className={styles.statLabel} suppressHydrationWarning>Projects</div>
          </div>
          <div className={styles.stat} suppressHydrationWarning>
            <div className={styles.statNumber} suppressHydrationWarning>2+</div>
            <div className={styles.statLabel} suppressHydrationWarning>years doing what I love</div>
          </div>
          <div className={styles.stat} suppressHydrationWarning>
            <div className={styles.statNumber} suppressHydrationWarning>50+</div>
            <div className={styles.statLabel} suppressHydrationWarning>late nights well spent</div>
          </div>
        </div>
      </div>
    </section>
  );
});

CallToAction.displayName = 'CallToAction';

export default CallToAction;
