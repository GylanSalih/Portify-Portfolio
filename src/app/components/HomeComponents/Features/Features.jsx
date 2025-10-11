'use client';

import React, { useEffect, useRef, useState, useCallback, memo } from 'react';
import { ArrowUpRight } from 'lucide-react';
import styles from './Features.module.scss';

const Card = memo(({ src, title, description, className, buttonHref, isGif, category, tags }) => {
  const [isClient, setIsClient] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const wrapperRef = useRef(null);
  const videoRef = useRef(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Optimiertes Mouse tracking - nur bei Hover aktiv
  const handleMouseMove = useCallback((e) => {
    if (!isHovered) return;
    
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const rect = wrapper.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    wrapper.style.setProperty('--mouse-x', `${x}%`);
    wrapper.style.setProperty('--mouse-y', `${y}%`);
  }, [isHovered]);

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
    const video = videoRef.current;
    if (video && !isGif && isClient) {
      video.play().catch(e => {
        console.error('Error playing video:', e);
      });
    }
  }, [isGif, isClient]);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    const video = videoRef.current;
    if (video && !isGif) {
      video.pause();
      video.currentTime = 0;
    }
  }, [isGif]);

  return (
    <div
      ref={wrapperRef}
      className={`${styles.wrapper} ${styles[className]}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
    >
      <div className={styles.card}>
        <figure className={styles.figure}>
          {isGif ? (
            <img src={src} alt={title} className={styles.image} loading="eager" />
          ) : (
            isClient ? (
              <video
                ref={videoRef}
                src={src}
                loop
                muted
                preload="metadata"
                className={styles.image}
                onError={e => console.error('Error loading video:', e)}
              />
            ) : (
              // Placeholder nur während Client-Hydration
              <div className={`${styles.image} ${styles.placeholder}`} />
            )
          )}
          
          {/* ContentSlider-style Overlay - nur bei Hover sichtbar */}
          <div className={styles.overlay}>
            <div>
              <h3>{title}</h3>
              <p>{category || 'Project'}</p>
              {tags && (
                <div className={styles.tags}>
                  {tags.map((tag, idx) => (
                    <span key={idx} className={styles.tag}>{tag}</span>
                  ))}
                </div>
              )}
            </div>
            <div className={styles.linkIcon}>
              <ArrowUpRight size={20} />
            </div>
          </div>
        </figure>
      </div>
    </div>
  );
});

const CardHomeFeatures = memo(() => {
  return (
    <section className={styles.section}>
      {/* Floating Background Elements */}
      <div className={`${styles.orb} ${styles.orb1}`}></div>
      <div className={`${styles.orb} ${styles.orb2}`}></div>

      <div className={styles.container}>
        {/* Header Section */}
        <header className={styles.intro} id="ScrollToFeatures">
          <h2 className={styles.introText}>Featured Projects</h2>
          <p className={styles.introDescription}>
            Discover our latest work showcasing innovative solutions,
            cutting-edge design, and exceptional craftsmanship across various
            industries.
          </p>
        </header>

        {/* Large Featured Card */}
        <div className={styles.gridLarge}>
          <Card
            src="/assets/videos/drift.mp4"
            title="Raijin"
            description="Offer personalized workout plans with video tutorials and AI form correction for optimal fitness results."
            className="large"
            buttonHref="/project1"
            category="Fitness App"
            tags={["React Native", "AI", "Health"]}
          />
        </div>

        {/* Main Feature Grid */}
        <div className={styles.gridFeature}>
          <Card
            src="/assets/videos/Video3.mp4"
            title="Nyx"
            description="Recommend songs based on the user's mood using AI and sentiment analysis for the perfect soundtrack."
            className="long"
            buttonHref="/project2"
            category="Music App"
            tags={["AI", "Music", "Sentiment Analysis"]}
          />
          <Card
            src="/assets/videos/Video2.mp4"
            title="Kitsune"
            description="Develop a branching narrative game where choices affect the outcome and create unique storytelling experiences."
            className="medium"
            buttonHref="/portfolio"
            category="Interactive Game"
            tags={["Unity", "Storytelling", "Interactive"]}
          />
          <Card
            src="/assets/videos/redfire.mp4"
            title="Oblivion"
            description="Let users try products in AR before purchasing, such as furniture or clothes, for confident decision-making."
            className="small"
            buttonHref="/project4"
            category="AR Experience"
            tags={["AR", "E-Commerce", "3D"]}
          />
        </div>

        {/* Special Grid Section */}
        <div className={styles.gridSpecial}>
          <Card
            src="/assets/gifs/RedSamurai.gif"
            title="Arcadia"
            description="Immersive digital experiences that blend creativity with cutting-edge technology for lasting impact!"
            className="xsmall2"
            buttonHref="/project6"
            isGif={true}
            category="Digital Art"
            tags={["Animation", "Creative", "Visual"]}
          />
          <Card
            src="/assets/images/landing/OniBoy1.webp"
            title="Ethereal"
            description="Immersive digital experiences that blend creativity with cutting-edge technology for lasting impact."
            className="xsmall2"
            buttonHref="/project6"
            isGif={true}
            category="Character Design"
            tags={["Illustration", "Digital Art", "Concept"]}
          />
        </div>
      </div>
    </section>
  );
});

Card.displayName = 'Card';
CardHomeFeatures.displayName = 'CardHomeFeatures';

export default CardHomeFeatures;
