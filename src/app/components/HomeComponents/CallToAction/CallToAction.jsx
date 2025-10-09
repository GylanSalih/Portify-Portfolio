'use client';
import React, { useState, useRef, useEffect, memo } from 'react';
import './CallToAction.css';
import { Coffee, Link, Frame } from 'lucide-react';

const CallToAction = memo(() => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleGitHubClick = () => {
    window.open('https://github.com/GylanSalih', '_blank');
  };

  const handleDemoClick = () => {
    window.open('portfolio', '_self');
  };

  const handleContactClick = () => {
    window.open('mailto:gylan.salih@outlook.de', '_blank');
  };

  return (
    <section
      ref={sectionRef}
      className={`cta-section ${isVisible ? 'visible' : ''}`}
    >
      {/* Background Elements */}
      <div className="background-grid"></div>
      <div className="floating-orb orb-1"></div>
      <div className="floating-orb orb-2"></div>
      <div className="floating-orb orb-3"></div>

      <div className="cta-container">
        {/* Main Content Card */}
        <div className="main-card">
          <div className="card-glow"></div>

          {/* Header */}
          <div className="cta-header">
            <div className="status-indicator">
              <Coffee size={20} />
              <span>Available for hire</span>
            </div>

            <h1 className="cta-title">
              <span className="title-line">Let&apos;s Build</span>
              <span className="title-line gradient">Something meaningful</span>
              <span className="title-line">Together</span>
            </h1>

            <p className="cta-description">
              Good ideas. Honest work. Real results..
            </p>
          </div>

          {/* Action Buttons */}
          <div className="cta-actions">
            <button className="primary-button" onClick={handleContactClick}>
              <span className="button-text">Start a Project</span>
              <div className="button-shine"></div>
            </button>

            <div className="secondary-actions">
              <button className="secondary-button" onClick={handleDemoClick}>
                <Frame size={20} />
                <span>View Work</span>
              </button>

              <button className="secondary-button" onClick={handleGitHubClick}>
                <Link size={20} />
                <span>GitHub</span>
              </button>
            </div>
          </div>

          {/* Skills Preview */}
          <div className="skills-preview">
            <div className="skill-tag">Clear Communication</div>
            <div className="skill-tag">Design Meets Logic</div>
            <div className="skill-tag">Built with Care</div>
            <div className="skill-tag">You First</div>
            <div className="skill-tag">Detail-Oriented</div>
            <div className="skill-tag">Human-Centered</div>
          </div>
        </div>

        {/* Bottom Stats */}
        <div className="stats-row">
          <div className="stat-item">
            <div className="stat-number">5+</div>
            <div className="stat-label">Projects</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">2+</div>
            <div className="stat-label">years doing what I love</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">50+</div>
            <div className="stat-label">late nights well spent</div>
          </div>
        </div>
      </div>
    </section>
  );
});

CallToAction.displayName = 'CallToAction';

export default CallToAction;
