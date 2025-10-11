'use client';

import React, { useState, useEffect, useRef, useCallback, memo, useMemo } from 'react';
import Image from 'next/image';
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
      src: '/assets/videos/Kenshin.mp4',
      title: '',
      subtitle: '',
      description: '',
      cta: null,
    },
    {
      id: 2,
      type: 'video',
      src: '/assets/videos/sea.mp4',
      title: '',
      subtitle: '',
      description: '',
      cta: null,
    },
    {
      id: 3,
      type: 'image',
      src: '/assets/images/landing/OniGirl13.webp',
      title: '',
      subtitle: '',
      description: '',
      cta: null,
    },
  ], []);

  const AUTOPLAY_INTERVAL = 8000; // Longer interval for better viewing experience
  const PROGRESS_INTERVAL = 120; // Smoother progress animation

  // ✅ MEMORY LEAK FIX: Cleanup für alle Timeouts
  const addTimeout = useCallback((timeoutId) => {
    pendingTimeouts.current.add(timeoutId);
  }, []);

  const clearAllTimeouts = useCallback(() => {
    pendingTimeouts.current.forEach(id => clearTimeout(id));
    pendingTimeouts.current.clear();
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
      // Ensure video is ready to play
      if (activeVideo.readyState >= 2) { // HAVE_CURRENT_DATA
        activeVideo.currentTime = 0; // Reset to beginning for better UX
        activeVideo.play().catch(error => {
          console.warn('Video play failed:', error);
        });
      } else {
        // Wait for video to be ready
        const handleCanPlay = () => {
          activeVideo.currentTime = 0;
          activeVideo.play().catch(error => {
            console.warn('Video play failed:', error);
          });
          activeVideo.removeEventListener('canplay', handleCanPlay);
        };
        activeVideo.addEventListener('canplay', handleCanPlay);
      }
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

  // ✅ PERFORMANCE FIX: Video Management with smooth transitions
  useEffect(() => {
    pauseAllVideos();
    // Small delay to ensure smooth transition before playing new video
    const timeoutId = setTimeout(() => {
      playActiveVideo();
    }, 100);
    
    addTimeout(timeoutId);
    
    return () => clearTimeout(timeoutId);
  }, [activeSlide, pauseAllVideos, playActiveVideo, addTimeout]);

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
                      autoPlay
                      loop
                      muted
                      playsInline
                      preload={index === activeSlide ? 'auto' : 'metadata'}
                      style={{ 
                        opacity: index === activeSlide ? 1 : 0,
                        transform: index === activeSlide ? 'scale(1)' : 'scale(1.02)',
                        transition: 'opacity 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                        pointerEvents: index === activeSlide ? 'auto' : 'none'
                      }}
                    >
                      <source src={slide.src} type={slide.src.endsWith('.mp4') ? 'video/mp4' : 'video/webm'} />
                      {/* Fallback for older browsers */}
                      Your browser does not support the video tag.
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
                        transform: index === activeSlide ? 'scale(1)' : 'scale(1.02)',
                        transition: 'opacity 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
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
                    {/* Content removed - clean minimal slider */}
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
