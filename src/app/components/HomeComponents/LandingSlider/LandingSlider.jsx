'use client';

import React, { useState, useEffect, useRef, useCallback, memo, useMemo } from 'react';
import Image from 'next/image';
import {
  ArrowRight,
  Github,
  Mail,
} from 'lucide-react';
import styles from './LandingSlider.module.css';

const LandingSlider = memo(() => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isClient, setIsClient] = useState(false);
  const [touchStart, setTouchStart] = useState({ x: 0, y: 0 });

  // Refs für Timer und Cleanup
  const progressTimer = useRef(null);
  const pendingTimeouts = useRef(new Set());
  const videoRefs = useRef({});

  useEffect(() => {
    setIsClient(true);
  }, []);

  // ✅ MEMORY LEAK FIX: Slides als useMemo um Re-renders zu vermeiden
  const slides = useMemo(() => [
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
  ], []);

  const AUTOPLAY_INTERVAL = 6000;
  const PROGRESS_INTERVAL = 150; // Optimiert für bessere Performance

  // ✅ MEMORY LEAK FIX: Cleanup für alle Timeouts
  const addTimeout = useCallback((timeoutId) => {
    pendingTimeouts.current.add(timeoutId);
  }, []);

  const clearAllTimeouts = useCallback(() => {
    pendingTimeouts.current.forEach(id => clearTimeout(id));
    pendingTimeouts.current.clear();
  }, []);

  // ✅ PERFORMANCE FIX: Optimierte Mouse-Tracking mit Throttling
  const handleCTAMouseMove = useCallback((e) => {
    if (!e.currentTarget) return;
    
    requestAnimationFrame(() => {
      const button = e.currentTarget;
      if (!button) return;
      
      const rect = button.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      button.style.setProperty('--mouse-x', `${x}px`);
      button.style.setProperty('--mouse-y', `${y}px`);
    });
  }, []);

  const handleCTAMouseEnter = useCallback((e) => {
    if (!e.currentTarget) return;
    
    const button = e.currentTarget;
    const rect = button.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    button.style.setProperty('--mouse-x', `${x}px`);
    button.style.setProperty('--mouse-y', `${y}px`);
  }, []);

  const handleCTAMouseLeave = useCallback((e) => {
    if (!e.currentTarget) return;
    
    const button = e.currentTarget;
    button.style.setProperty('--mouse-x', '-100px');
    button.style.setProperty('--mouse-y', '-100px');
  }, []);

  // ✅ MEMORY LEAK FIX: Saubere Video-Verwaltung mit Error-Handling
  const pauseAllVideos = useCallback(() => {
    Object.values(videoRefs.current).forEach(video => {
      if (video && video.parentNode && typeof video.pause === 'function') {
        try {
          video.pause();
        } catch (error) {
          // Video wurde bereits entfernt oder ist nicht mehr verfügbar
          console.warn('Video pause failed:', error);
        }
      }
    });
  }, []);

  const playActiveVideo = useCallback(() => {
    const activeVideo = videoRefs.current[activeSlide];
    if (activeVideo && activeVideo.parentNode && typeof activeVideo.play === 'function') {
      activeVideo.play().catch(error => {
        // Video play failed - ignore silently
        console.warn('Video play failed:', error);
      });
    }
  }, [activeSlide]);

  // ✅ MEMORY LEAK FIX: Video Ref Cleanup
  const setVideoRef = useCallback((el, index) => {
    if (el) {
      videoRefs.current[index] = el;
    } else {
      // Cleanup when element is removed
      delete videoRefs.current[index];
    }
  }, []);

  // ✅ MEMORY LEAK FIX: Sauberer Progress Timer
  const stopAutoplay = useCallback(() => {
    if (progressTimer.current) {
      clearInterval(progressTimer.current);
      progressTimer.current = null;
    }
    setProgress(0);
  }, []);

  const nextSlide = useCallback(() => {
    setActiveSlide(prev => (prev + 1) % slides.length);
  }, [slides.length]);

  const startAutoplay = useCallback(() => {
    if (!isAutoPlaying) return;

    stopAutoplay(); // Cleanup vorherige Timer

    let currentProgress = 0;
    setProgress(0);

    progressTimer.current = setInterval(() => {
      currentProgress += (PROGRESS_INTERVAL / AUTOPLAY_INTERVAL) * 100;
      
      // ✅ PERFORMANCE FIX: Batch state updates
      if (currentProgress >= 100) {
        clearInterval(progressTimer.current);
        progressTimer.current = null;
        nextSlide();
        setProgress(0);
      } else {
        setProgress(currentProgress);
      }
    }, PROGRESS_INTERVAL);
  }, [isAutoPlaying, stopAutoplay, nextSlide]);

  // ✅ MEMORY LEAK FIX: Saubere goToSlide Funktion
  const goToSlide = useCallback((index) => {
    setActiveSlide(index);
    stopAutoplay();
    
    const timeoutId = setTimeout(() => {
      if (isAutoPlaying) {
        startAutoplay();
      }
      pendingTimeouts.current.delete(timeoutId);
    }, 100);
    
    addTimeout(timeoutId);
  }, [stopAutoplay, startAutoplay, isAutoPlaying, addTimeout]);

  // ✅ MEMORY LEAK FIX: Saubere Touch-Handler
  const handleTouchStart = useCallback((e) => {
    const touch = e.touches ? e.touches[0] : e;
    setTouchStart({ x: touch.clientX, y: touch.clientY });
    setIsAutoPlaying(false);
    stopAutoplay();
  }, [stopAutoplay]);

  const handleTouchEnd = useCallback((e) => {
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

    const timeoutId = setTimeout(() => {
      setIsAutoPlaying(true);
      pendingTimeouts.current.delete(timeoutId);
    }, 100);
    
    addTimeout(timeoutId);
  }, [touchStart, nextSlide, slides.length, addTimeout]);

  // ✅ PERFORMANCE FIX: Video Management
  useEffect(() => {
    pauseAllVideos();
    playActiveVideo();
  }, [activeSlide, pauseAllVideos, playActiveVideo]);

  // ✅ MEMORY LEAK FIX: Autoplay Management
  useEffect(() => {
    if (isAutoPlaying) {
      startAutoplay();
    } else {
      stopAutoplay();
    }

    return () => {
      stopAutoplay();
    };
  }, [isAutoPlaying, startAutoplay, stopAutoplay]);

  // ✅ MEMORY LEAK FIX: Visibility Change Handler
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        setIsAutoPlaying(false);
        pauseAllVideos();
      } else {
        setIsAutoPlaying(true);
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [pauseAllVideos]);

  // ✅ CRITICAL: Cleanup alles beim Unmount
  useEffect(() => {
    return () => {
      stopAutoplay();
      clearAllTimeouts();
      pauseAllVideos();
    };
  }, [stopAutoplay, clearAllTimeouts, pauseAllVideos]);

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
                  {slide.type === 'video' && isClient ? (
                    <video
                      ref={el => setVideoRef(el, index)}
                      className={styles.video}
                      loop
                      muted
                      playsInline
                      preload={index === activeSlide ? 'auto' : 'metadata'}
                      style={{ 
                        opacity: index === activeSlide ? 1 : 0,
                        pointerEvents: index === activeSlide ? 'auto' : 'none'
                      }}
                    >
                      <source src={slide.src} type="video/mp4" />
                    </video>
                  ) : slide.type === 'image' ? (
                    <Image
                      className={styles.image}
                      src={slide.src}
                      alt={slide.title}
                      fill
                      priority={index === activeSlide}
                      sizes="100vw"
                      style={{ 
                        opacity: index === activeSlide ? 1 : 0,
                        transition: 'opacity 0.3s ease-in-out',
                        objectFit: 'cover'
                      }}
                    />
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
