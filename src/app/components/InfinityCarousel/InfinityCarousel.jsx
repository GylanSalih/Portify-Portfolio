'use client';
import { useState, useRef, useEffect } from 'react';
import styles from './InfinityCarousel.module.scss';

export default function InfinityCarousel({ items = [] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);
  const [totalOffset, setTotalOffset] = useState(0); // Track total accumulated offset
  const [slideDistance, setSlideDistance] = useState(1920); // Use state for slide distance
  const startX = useRef(0);
  const currentX = useRef(0);
  const lastX = useRef(0);
  const lastTime = useRef(0);
  const velocity = useRef(0);
  const animationFrame = useRef(null);

  // Default items if none provided
  const defaultItems = [
    { id: 1, content: 'Slide 1', color: '#9C89B8', image: null },
    { id: 2, content: 'Slide 2', color: '#F0A6CA', image: null },
    { id: 3, content: 'Slide 3', color: '#EFC3E6', image: null },
    { id: 4, content: 'Slide 4', color: '#C1BFEC', image: null },
    { id: 5, content: 'Slide 5', color: '#A8D8EA', image: null },
  ];

  const carouselItems = items.length > 0 ? items : defaultItems;

  const getCircularIndex = (index) => {
    const len = carouselItems.length;
    return ((index % len) + len) % len;
  };

  // Set client-side flag and update slide distance after hydration
  useEffect(() => {
    setSlideDistance(window.innerWidth);
    
    const handleResize = () => {
      setSlideDistance(window.innerWidth);
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationFrame.current) {
        cancelAnimationFrame(animationFrame.current);
      }
    };
  }, []);

  // Unified drag handlers for both mouse and touch
  const handleDragStart = (e) => {
    // Cancel any ongoing momentum animation
    if (animationFrame.current) {
      cancelAnimationFrame(animationFrame.current);
      animationFrame.current = null;
    }
    
    setIsDragging(true);
    const clientX = e.type === 'mousedown' ? e.clientX : e.touches[0].clientX;
    startX.current = clientX;
    currentX.current = clientX;
    lastX.current = clientX;
    lastTime.current = Date.now();
    velocity.current = 0;
    setDragOffset(0);
  };

  const handleDragMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    
    const clientX = e.type === 'mousemove' ? e.clientX : e.touches[0].clientX;
    const now = Date.now();
    const timeDelta = now - lastTime.current;
    
    // Calculate velocity for momentum
    if (timeDelta > 0) {
      velocity.current = (clientX - lastX.current) / timeDelta;
    }
    
    lastX.current = clientX;
    lastTime.current = now;
    currentX.current = clientX;
    
    const offset = currentX.current - startX.current;
    setDragOffset(offset);
  };

  const applyMomentum = () => {
    const friction = 0.95; // Friction factor (lower = more friction)
    const minVelocity = 0.1; // Minimum velocity before stopping
    
    velocity.current *= friction;
    
    if (Math.abs(velocity.current) < minVelocity) {
      // Momentum finished
      velocity.current = 0;
      animationFrame.current = null;
      
      // Check if we need to update the base index
      const slidesShifted = Math.floor(-totalOffset / slideDistance);
      
      if (Math.abs(slidesShifted) > 0) {
        setCurrentIndex((prev) => prev + slidesShifted);
        setTotalOffset((prev) => prev + (slidesShifted * slideDistance));
      }
      return;
    }
    
    // Apply momentum to offset
    setTotalOffset((prev) => prev + velocity.current * 16); // ~16ms per frame
    
    // Continue animation
    animationFrame.current = requestAnimationFrame(applyMomentum);
  };

  const handleDragEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);
    
    // Accumulate the drag offset
    const newTotalOffset = totalOffset + dragOffset;
    setTotalOffset(newTotalOffset);
    setDragOffset(0);
    
    // Apply momentum if velocity is significant
    if (Math.abs(velocity.current) > 0.5) {
      animationFrame.current = requestAnimationFrame(applyMomentum);
    } else {
      // No significant momentum, just check index
      const slidesShifted = Math.floor(-newTotalOffset / slideDistance);
      
      if (Math.abs(slidesShifted) > 0) {
        setCurrentIndex((prev) => prev + slidesShifted);
        setTotalOffset(newTotalOffset + (slidesShifted * slideDistance));
      }
    }
  };

  const getSlideTransform = (offset) => {
    // Calculate base position for this slide - full viewport width
    const baseX = offset * slideDistance;
    
    // Apply total accumulated offset + current drag offset to ALL slides
    // Don't round to avoid sub-pixel gaps
    const currentX = baseX + totalOffset + dragOffset;
    
    // No scaling - all slides stay same size, no centering transform
    return `translateX(${currentX}px)`;
  };

  const getSlideOpacity = (offset) => {
    const baseX = offset * slideDistance;
    const currentX = baseX + totalOffset + dragOffset;
    const absDistance = Math.abs(currentX);
    
    // All visible slides at full opacity - no color differences
    if (absDistance < slideDistance * 3) {
      return 1; // All nearby slides fully visible
    }
    
    // Only hide very far slides
    return 0;
  };

  return (
    <div className={styles.carouselWrapper}>
      <div className={styles.carouselContainer}>
        <ul className={styles.list}>
          {[-5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5].map((offset) => {
            const index = getCircularIndex(currentIndex + offset);
            const item = carouselItems[index];
            const opacity = getSlideOpacity(offset);
            
            return (
              <li
                key={`${item.id}-${offset}`}
                className={`${styles.slide} ${isDragging ? styles.dragging : ''}`}
                onClick={() => {
                  if (!isDragging && offset !== 0) {
                    // Smooth scroll to clicked slide
                    const targetOffset = -offset * slideDistance;
                    setTotalOffset(totalOffset + targetOffset);
                  }
                }}
                style={{ 
                  background: item.image ? '#000' : (item.color || '#9C89B8'),
                  backgroundImage: item.image ? `url(${item.image})` : 'none',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat',
                  cursor: offset !== 0 ? 'pointer' : 'default',
                  transform: getSlideTransform(offset),
                  opacity: opacity,
                  pointerEvents: opacity === 0 ? 'none' : 'auto',
                  zIndex: offset === 0 ? 10 : 10 - Math.abs(offset),
                  margin: 0,
                  padding: 0,
                  boxSizing: 'border-box'
                }}
              >
                {!item.image && (
                  <div className={styles.slideContent}>
                    {item.content || item.title || `Slide ${item.id}`}
                  </div>
                )}
              </li>
            );
          })}
        </ul>

        {/* Drag Area */}
        <div
          className={styles.dragArea}
          onMouseDown={handleDragStart}
          onMouseMove={handleDragMove}
          onMouseUp={handleDragEnd}
          onMouseLeave={handleDragEnd}
          onTouchStart={handleDragStart}
          onTouchMove={handleDragMove}
          onTouchEnd={handleDragEnd}
        />

        {/* Indicators - Pagination */}
        <div className={styles.indicators}>
          {carouselItems.map((item, idx) => (
            <button
              key={item.id}
              className={`${styles.indicator} ${
                getCircularIndex(currentIndex) === idx ? styles.indicatorActive : ''
              }`}
              onClick={() => {
                if (!isDragging) {
                  const targetIndex = idx;
                  const indexDiff = targetIndex - getCircularIndex(currentIndex);
                  const targetOffset = -indexDiff * slideDistance;
                  setTotalOffset(totalOffset + targetOffset);
                  setCurrentIndex(targetIndex);
                }
              }}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

