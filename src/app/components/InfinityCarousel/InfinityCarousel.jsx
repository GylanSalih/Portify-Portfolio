'use client';
import { useState, useRef, useEffect, useCallback } from 'react';
import styles from './InfinityCarousel.module.scss';

export default function InfinityCarousel({ items = [] }) {
  const [isDragging, setIsDragging] = useState(false);
  const [translateX, setTranslateX] = useState(0);
  const [currentX, setCurrentX] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const trackRef = useRef(null);
  const setWidthRef = useRef(0);
  const itemWidthsRef = useRef([]);
  const isInitializedRef = useRef(false);
  const velocityRef = useRef(0);
  const lastMoveTimeRef = useRef(0);
  const lastDeltaRef = useRef(0);
  const momentumRAFRef = useRef(null);

  // Portfolio images with mixed aspect ratios
  const portfolioImages = [
    { id: 1, image: '/assets/images/portfolio/Akira1.jpg', aspectRatio: 2316 / 3240 },
    { id: 2, image: '/assets/images/portfolio/Akira2.jpg', aspectRatio: 2316 / 3240 },
    { id: 3, image: '/assets/images/portfolio/BigImg.png', aspectRatio: 4536 / 3240 }, // Wider format
    { id: 4, image: '/assets/images/portfolio/City.jpg', aspectRatio: 2316 / 3240 },
    { id: 5, image: '/assets/images/portfolio/City2.jpg', aspectRatio: 2316 / 3240 },
    { id: 6, image: '/assets/images/portfolio/GITS.jpg', aspectRatio: 2316 / 3240 },
    { id: 7, image: '/assets/images/portfolio/GITS2.jpg', aspectRatio: 2316 / 3240 },
    { id: 8, image: '/assets/images/portfolio/New1.png', aspectRatio: 2316 / 3240 },
    { id: 9, image: '/assets/images/portfolio/New2.png', aspectRatio: 4536 / 3240 }, // Wider format
    { id: 10, image: '/assets/images/portfolio/New3.png', aspectRatio: 2316 / 3240 },
    { id: 11, image: '/assets/images/portfolio/New4.png', aspectRatio: 2316 / 3240 },
    { id: 12, image: '/assets/images/portfolio/New5.png', aspectRatio: 2316 / 3240 },
    { id: 13, image: '/assets/images/portfolio/New6.png', aspectRatio: 4536 / 3240 }, // Wider format
    { id: 14, image: '/assets/images/portfolio/New7.png', aspectRatio: 2316 / 3240 },
    { id: 15, image: '/assets/images/portfolio/New8.png', aspectRatio: 2316 / 3240 },
    { id: 16, image: '/assets/images/portfolio/New9.png', aspectRatio: 2316 / 3240 },
    { id: 17, image: '/assets/images/portfolio/New10.png', aspectRatio: 4536 / 3240 }, // Wider format
    { id: 18, image: '/assets/images/portfolio/New11.png', aspectRatio: 2316 / 3240 },
  ];

  // Default items if none provided
  const defaultItems = portfolioImages;
  const carouselItems = items.length > 0 ? items : defaultItems;

  // Calculate total width of one set of items
  useEffect(() => {
    const calculateSetWidth = () => {
      if (typeof window === 'undefined') return;
      
      const viewportHeight = window.innerHeight;
      const totalWidth = carouselItems.reduce((sum, item) => {
        if (item.image) {
          const aspectRatio = item.aspectRatio || (2316 / 3240);
          return sum + (viewportHeight * aspectRatio);
        }
        return sum + 400; // Fixed width for non-image items
      }, 0);
      
      console.log('Calculated Set Width:', totalWidth, 'Initialized:', isInitializedRef.current);
      
      // Store old width for proportional resize adjustment
      const oldWidth = setWidthRef.current;

      // Also store individual widths for later use
      itemWidthsRef.current = carouselItems.map(item => {
        if (item.image) {
          const aspectRatio = item.aspectRatio || (2316 / 3240);
          return viewportHeight * aspectRatio;
        }
        return 400;
      });

      // ONLY set initial position on first load, not on resize or re-renders
      if (!isInitializedRef.current) {
        console.log('Setting initial position to:', -totalWidth);
        setTranslateX(-totalWidth);
        isInitializedRef.current = true;
      } else if (oldWidth !== 0 && oldWidth !== totalWidth) {
        // On resize: adjust position proportionally using functional update to get current value
        setTranslateX(currentTranslateX => {
          const ratio = currentTranslateX / oldWidth;
          const newPosition = ratio * totalWidth;
          console.log('Resize adjustment: old width', oldWidth, 'new width', totalWidth, 'new position', newPosition);
          return newPosition;
        });
      }
      
      // Update the width reference AFTER using the old value
      setWidthRef.current = totalWidth;
    };

    // Small delay to ensure DOM is ready
    const timeoutId = setTimeout(calculateSetWidth, 100);
    
    window.addEventListener('resize', calculateSetWidth);
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('resize', calculateSetWidth);
    };
  }, [carouselItems]);

  // Check and handle infinite loop boundaries
  useEffect(() => {
    // Don't loop during active dragging or transitions, but allow during momentum scroll
    if (isDragging || isTransitioning) return;

    const setWidth = setWidthRef.current;
    if (setWidth === 0) return;

    // We have 3 sets: [Set 0] [Set 1/Middle] [Set 2]
    // Position ranges: [0 to -setWidth] [-setWidth to -2*setWidth] [-2*setWidth to -3*setWidth]
    // We start at -setWidth (middle)
    
    console.log('Loop Check - TranslateX:', translateX, 'SetWidth:', setWidth);

    // If we've scrolled too far left (past Set 0), jump back one set
    if (translateX > 0) {
      console.log('Too far left, jumping back');
      
      // Stop momentum scrolling during the jump
      if (momentumRAFRef.current) {
        cancelAnimationFrame(momentumRAFRef.current);
        momentumRAFRef.current = null;
        velocityRef.current = 0;
      }
      
      setIsTransitioning(true);
      setTranslateX(prev => prev - setWidth);
      setTimeout(() => setIsTransitioning(false), 50);
    }
    // If we've scrolled too far right (past Set 2), jump forward one set
    else if (translateX < -setWidth * 2) {
      console.log('Too far right, jumping forward');
      
      // Stop momentum scrolling during the jump
      if (momentumRAFRef.current) {
        cancelAnimationFrame(momentumRAFRef.current);
        momentumRAFRef.current = null;
        velocityRef.current = 0;
      }
      
      setIsTransitioning(true);
      setTranslateX(prev => prev + setWidth);
      setTimeout(() => setIsTransitioning(false), 50);
    }
  }, [translateX, isDragging, isTransitioning]);

  // Momentum scrolling animation
  const startMomentumScroll = useCallback(() => {
    const deceleration = 0.95; // Friction factor (0-1, lower = more friction)
    const minVelocity = 0.5; // Stop when velocity is below this threshold
    
    const animate = () => {
      velocityRef.current *= deceleration;
      
      // Stop animation if velocity is too low
      if (Math.abs(velocityRef.current) < minVelocity) {
        velocityRef.current = 0;
        momentumRAFRef.current = null;
        return;
      }
      
      // Update position based on velocity
      setTranslateX(prev => prev + velocityRef.current);
      
      // Continue animation
      momentumRAFRef.current = requestAnimationFrame(animate);
    };
    
    // Start the animation
    if (Math.abs(velocityRef.current) > minVelocity) {
      momentumRAFRef.current = requestAnimationFrame(animate);
    }
  }, []);

  // Simple drag handlers
  const handleMouseDown = (e) => {
    console.log('Mouse Down', e.clientX);
    
    // Cancel any ongoing momentum scroll
    if (momentumRAFRef.current) {
      cancelAnimationFrame(momentumRAFRef.current);
      momentumRAFRef.current = null;
    }
    
    velocityRef.current = 0;
    setIsDragging(true);
    setCurrentX(e.clientX);
    lastMoveTimeRef.current = Date.now();
  };

  const handleMouseMove = useCallback((e) => {
    if (!isDragging) return;
    
    const now = Date.now();
    const deltaTime = now - lastMoveTimeRef.current;
    const deltaX = e.clientX - currentX;
    
    // Calculate velocity (pixels per millisecond, then scale up)
    if (deltaTime > 0) {
      velocityRef.current = (deltaX / deltaTime) * 16; // Scale to ~60fps
    }
    
    console.log('Mouse Move - Delta:', deltaX, 'Velocity:', velocityRef.current.toFixed(2));
    setTranslateX(prev => prev + deltaX);
    setCurrentX(e.clientX);
    lastMoveTimeRef.current = now;
    lastDeltaRef.current = deltaX;
  }, [isDragging, currentX]);

  const handleMouseUp = useCallback(() => {
    console.log('Mouse Up - Final Velocity:', velocityRef.current.toFixed(2));
    setIsDragging(false);
    
    // Start momentum scrolling with current velocity
    startMomentumScroll();
  }, [startMomentumScroll]);

  const handleTouchStart = (e) => {
    console.log('Touch Start', e.touches[0].clientX);
    
    // Cancel any ongoing momentum scroll
    if (momentumRAFRef.current) {
      cancelAnimationFrame(momentumRAFRef.current);
      momentumRAFRef.current = null;
    }
    
    velocityRef.current = 0;
    setIsDragging(true);
    setCurrentX(e.touches[0].clientX);
    lastMoveTimeRef.current = Date.now();
  };

  const handleTouchMove = useCallback((e) => {
    if (!isDragging) return;
    
    const now = Date.now();
    const deltaTime = now - lastMoveTimeRef.current;
    const deltaX = e.touches[0].clientX - currentX;
    
    // Calculate velocity (pixels per millisecond, then scale up)
    if (deltaTime > 0) {
      velocityRef.current = (deltaX / deltaTime) * 16; // Scale to ~60fps
    }
    
    console.log('Touch Move - Delta:', deltaX, 'Velocity:', velocityRef.current.toFixed(2));
    setTranslateX(prev => prev + deltaX);
    setCurrentX(e.touches[0].clientX);
    lastMoveTimeRef.current = now;
    lastDeltaRef.current = deltaX;
  }, [isDragging, currentX]);

  const handleTouchEnd = useCallback(() => {
    console.log('Touch End - Final Velocity:', velocityRef.current.toFixed(2));
    setIsDragging(false);
    
    // Start momentum scrolling with current velocity
    startMomentumScroll();
  }, [startMomentumScroll]);

  // Add event listeners for mouse and touch events
  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.addEventListener('touchmove', handleTouchMove, { passive: false });
      document.addEventListener('touchend', handleTouchEnd);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isDragging, handleMouseMove, handleMouseUp, handleTouchMove, handleTouchEnd]);

  // Cleanup animation on unmount
  useEffect(() => {
    return () => {
      if (momentumRAFRef.current) {
        cancelAnimationFrame(momentumRAFRef.current);
      }
    };
  }, []);

  // Helper function to render a set of items
  const renderItemSet = (setIndex) => {
    return carouselItems.map((item, itemIndex) => {
      const getItemStyle = () => {
        const baseStyle = {
          background: item.image ? 'transparent' : (item.color || '#9C89B8'),
          backgroundImage: item.image ? `url(${item.image})` : 'none',
        };

        // For images, set dynamic width based on aspect ratio
        if (item.image) {
          const aspectRatio = item.aspectRatio || (2316/3240);
          const calculatedWidth = `calc(100vh * ${aspectRatio})`;
          
          return {
            ...baseStyle,
            width: calculatedWidth,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          };
        }

        return baseStyle;
      };

      return (
        <div
          key={`set-${setIndex}-item-${item.id}-${itemIndex}`}
          className={styles.carouselItem}
          style={getItemStyle()}
        >
          {!item.image && (
            <div className={styles.itemContent}>
              {item.content || item.title || `Slide ${item.id}`}
            </div>
          )}
        </div>
      );
    });
  };

  return (
    <div className={styles.carouselWrapper}>
      <div className={styles.carouselContainer}>
        <div 
          ref={trackRef}
          className={styles.carouselTrack}
          style={{
            transform: `translateX(${translateX}px)`,
            transition: isTransitioning ? 'none' : (isDragging ? 'none' : 'transform 0.3s ease-out')
          }}
        >
          {/* Render items 3 times for seamless infinite scrolling */}
          {/* Set 0: Previous */}
          {renderItemSet(0)}
          {/* Set 1: Current (middle) */}
          {renderItemSet(1)}
          {/* Set 2: Next */}
          {renderItemSet(2)}
        </div>

        {/* Drag Area */}
        <div
          className={styles.dragArea}
          onMouseDown={handleMouseDown}
          onTouchStart={handleTouchStart}
        />
      </div>
    </div>
  );
}

