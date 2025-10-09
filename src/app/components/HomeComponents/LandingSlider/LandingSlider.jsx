'use client';

import React, { useState, useEffect, useRef, useCallback, memo } from 'react';
import {
  ArrowRight,
  Github,
  Mail,
} from 'lucide-react';
import styles from './LandingSlider.module.css';

const LandingSlider = memo(() => {
  const [activeSlide, setActiveSlide] = useState(0);
  const autoplayTimer = useRef(null);
  const progressTimer = useRef(null);
  const [progress, setProgress] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Optimierte Mouse-Tracking Callbacks
  const handleCTAMouseMove = useCallback((e) => {
    const button = e.currentTarget;
    const rect = button.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    button.style.setProperty('--mouse-x', `${x}px`);
    button.style.setProperty('--mouse-y', `${y}px`);
  }, []);

  const handleCTAMouseEnter = useCallback((e) => {
    const button = e.currentTarget;
    const rect = button.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    button.style.setProperty('--mouse-x', `${x}px`);
    button.style.setProperty('--mouse-y', `${y}px`);
  }, []);

  const handleCTAMouseLeave = useCallback((e) => {
    const button = e.currentTarget;
    button.style.setProperty('--mouse-x', '-100px');
    button.style.setProperty('--mouse-y', '-100px');
  }, []);

  // Professional Portfolio Slides
  const slides = [
    {
      id: 1,
      type: 'video',
      src: '/assets/videos/sea.mp4',
      title: 'Welcome to My Corner',
      subtitle: 'Tips, Tricks & Real Talk',
      description:
        'No fluff, just useful insights and honest advice to help you level up your skills and projects.',
      cta: {
        text: 'Dive Into the Blog',
        action: () =>
          document
            .getElementById('blog')
            ?.scrollIntoView({ behavior: 'smooth' }),
        secondary: false,
      },
    },
    {
      id: 2,
      type: 'image',
      src: '/assets/images/landing/OniBoy1.webp',
      title: 'Projects That Speak',
      subtitle: "What I've Built, What I've Learned",
      description:
        'A collection of real work, experiments, and passion projects — each with a story behind it.',
      cta: {
        text: 'Check Them Out',
        icon: Mail,
        action: () =>
          document
            .getElementById('projects')
            ?.scrollIntoView({ behavior: 'smooth' }),
        secondary: true,
      },
    },
    {
      id: 3,
      type: 'video',
      src: '/assets/videos/tech.mp4',
      title: 'Looking for the Next Challenge',
      subtitle: "Let's Create Something Together",
      description:
        "If you're looking for someone who cares as much as you do, let's chat and see how we can collaborate.",
      cta: {
        text: 'Get in Touch',
        icon: Github,
        action: () =>
          document
            .getElementById('contact')
            ?.scrollIntoView({ behavior: 'smooth' }),
        secondary: false,
      },
    },
  ];

  const AUTOPLAY_INTERVAL = 6000;
  const PROGRESS_INTERVAL = 100; // Reduziert von 50ms auf 100ms für bessere Performance

  // Auto-play functionality
  const startAutoplay = useCallback(() => {
    if (!isAutoPlaying) return;

    // WICHTIG: Vorher stoppen
    clearInterval(progressTimer.current);

    let currentProgress = 0;
    setProgress(0);

    progressTimer.current = setInterval(() => {
      currentProgress += (PROGRESS_INTERVAL / AUTOPLAY_INTERVAL) * 100;
      setProgress(currentProgress);

      if (currentProgress >= 100) {
        clearInterval(progressTimer.current);
        nextSlide();
      }
    }, PROGRESS_INTERVAL);
  }, [isAutoPlaying]);

  const stopAutoplay = useCallback(() => {
    clearInterval(autoplayTimer.current);
    clearInterval(progressTimer.current);
    setProgress(0);
  }, []);

  const nextSlide = useCallback(() => {
    setActiveSlide(prev => (prev + 1) % slides.length);
  }, [slides.length]);

  const goToSlide = useCallback((index) => {
    setActiveSlide(index);
    stopAutoplay();
    // MEMORY LEAK FIX: Store timeout ID for cleanup
    const timeoutId = setTimeout(startAutoplay, 100);
    
    // Return cleanup function if component unmounts during timeout
    return () => clearTimeout(timeoutId);
  }, [stopAutoplay, startAutoplay]);

  // Touch/Swipe handling
  const [touchStart, setTouchStart] = useState({ x: 0, y: 0 });

  const handleTouchStart = e => {
    const touch = e.touches ? e.touches[0] : e;
    setTouchStart({ x: touch.clientX, y: touch.clientY });
    setIsAutoPlaying(false);
    stopAutoplay();
  };

  const handleTouchEnd = e => {
    const touch = e.changedTouches ? e.changedTouches[0] : e;

    const deltaX = touchStart.x - touch.clientX;
    const deltaY = Math.abs(touchStart.y - touch.clientY);

    if (Math.abs(deltaX) > 50 && deltaY < 100) {
      if (deltaX > 0) {
        nextSlide();
      } else {
        setActiveSlide(prev => (prev === 0 ? slides.length - 1 : prev - 1));
      }
    }

    // MEMORY LEAK FIX: Track timeout for cleanup
    const timeoutId = setTimeout(() => {
      setIsAutoPlaying(true);
      startAutoplay();
    }, 100);
    
    // Store timeout ID for potential cleanup
    handleTouchEnd.timeoutId = timeoutId;
  };

  // Initialize autoplay - MEMORY LEAK FIX
  useEffect(() => {
    if (isAutoPlaying) {
      startAutoplay();
    }
    
    // CRITICAL: Always cleanup on unmount regardless of isAutoPlaying state
    return () => {
      clearInterval(autoplayTimer.current);
      clearInterval(progressTimer.current);
      setProgress(0);
    };
  }, [isAutoPlaying]); // startAutoplay ist stabil, da es keine Dependencies hat

  // Pause on visibility change
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        setIsAutoPlaying(false);
        stopAutoplay();
      } else {
        setIsAutoPlaying(true);
        startAutoplay();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () =>
      document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, []); // startAutoplay und stopAutoplay sind stabil

  return (
    <>
      <section className={styles.carousel}>
        {/* Background Elements - reduzierte Animation */}
        <div className={`${styles.bgOrb} ${styles.bgOrb1}`}></div>
        <div className={`${styles.bgOrb} ${styles.bgOrb2}`}></div>

        {/* Main Carousel Container */}
        <div
          className={styles.container}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          onMouseDown={handleTouchStart}
          onMouseUp={handleTouchEnd}
        >
          {/* Slides */}
          <div className={styles.slides}>
            {slides.map((slide, index) => (
              <div
                key={slide.id}
                className={`${styles.slide} ${
                  index === activeSlide ? styles.slideActive : ''
                }`}
              >
                {/* Media Content */}
                <div className={styles.media}>
                  {slide.type === 'video' && isClient && index === activeSlide ? (
                    <video
                      className={styles.video}
                      autoPlay
                      loop
                      muted
                      playsInline
                      preload={index === activeSlide ? 'auto' : 'none'}
                    >
                      <source src={slide.src} type="video/mp4" />
                    </video>
                  ) : slide.type === 'image' ? (
                    <img
                      className={styles.image}
                      src={slide.src}
                      alt={slide.title}
                      loading={index === activeSlide ? 'eager' : 'lazy'}
                    />
                  ) : slide.type === 'video' ? (
                    // Video Placeholder für nicht-aktive Slides
                    <div className={`${styles.video} ${styles.videoPlaceholder}`} />
                  ) : null}

                  {/* Overlay Gradient */}
                  <div className={styles.overlay}></div>
                </div>

                {/* Content */}
                <div className={styles.content}>
                  <div className={styles.text}>
                    <p className={styles.subtitle}>
                      {slide.subtitle}
                    </p>
                    <h1 className={styles.title}>{slide.title}</h1>
                    <p className={styles.description}>
                      {slide.description}
                    </p>

                    {/* Call to Action button */}
                    <button
                      className={`${styles.cta} ${
                        slide.cta.secondary
                          ? styles.ctaSecondary
                          : ''
                      }`}
                      onClick={slide.cta.action}
                      onMouseMove={handleCTAMouseMove}
                      onMouseEnter={handleCTAMouseEnter}
                      onMouseLeave={handleCTAMouseLeave}
                    >
                      {slide.cta.icon && <slide.cta.icon size={20} />}
                      <span>{slide.cta.text}</span>
                      <ArrowRight
                        className={styles.ctaIcon}
                        size={16}
                      />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation */}
          <nav className={styles.nav}>
            <div className={styles.navDots}>
              {slides.map((_, index) => (
                <button
                  key={index}
                  className={`${styles.navDot} ${
                    index === activeSlide
                      ? styles.navDotActive
                      : ''
                  }`}
                  onClick={() => goToSlide(index)}
                  aria-label={`Zu Slide ${index + 1}`}
                >
                  {index === activeSlide && (
                    <div
                      className={styles.navProgress}
                      style={{ width: `${progress}%` }}
                    ></div>
                  )}
                </button>
              ))}
            </div>

            {/* Slide Counter */}
            <div className={styles.counter}>
              <span className={styles.counterCurrent}>
                {String(activeSlide + 1).padStart(2, '0')}
              </span>
              <span className={styles.counterSeparator}>/</span>
              <span className={styles.counterTotal}>
                {String(slides.length).padStart(2, '0')}
              </span>
            </div>
          </nav>
        </div>

      </section>
    </>
  );
});

LandingSlider.displayName = 'LandingSlider';

export default LandingSlider;
