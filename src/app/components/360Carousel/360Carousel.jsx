'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import styles from './Carousel.module.scss';

const Carousel360 = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [showBottomIndicator, setShowBottomIndicator] = useState(true);
  const containerRef = useRef(null);
  const itemsRef = useRef([]);
  const animationFrameId = useRef(null);
  const lastActiveIndex = useRef(-1);

  const [isDragging, setIsDragging] = useState(false);
  const startY = useRef(0);
  const scrollTopStart = useRef(0);
  
  // Maus-Tracking für 3D-Effekt
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const css3dContainerRef = useRef(null);

  const products = [
    { number: '1', name: 'Radiant', tag: 'Innovation', color: '#ff6b6b', image: '/assets/images/landing/OniGirl1.webp' },
    { number: '2', name: 'Zigma', tag: 'Precision', color: '#4ecdc4', image: '/assets/images/landing/OniBoy1.webp' },
    { number: '3', name: 'Spectre', tag: 'Elegance', color: '#45b7d1', image: '/assets/images/landing/OniGirl11.webp' },
    { number: '4', name: 'Nova', tag: 'Power', color: '#f9ca24', image: '/assets/images/landing/OniBoy4.webp' },
    { number: '5', name: 'Pulse', tag: 'Energy', color: '#f0932b', image: '/assets/images/landing/OniGirl5.webp' },
    { number: '6', name: 'Quantum', tag: 'Technology', color: '#eb4d4b', image: '/assets/images/landing/OniGirl6.webp' },
    { number: '7', name: 'Nexus', tag: 'Connection', color: '#6c5ce7', image: '/assets/images/landing/OniGirl7.webp' },
    { number: '8', name: 'Vortex', tag: 'Motion', color: '#a29bfe', image: '/assets/images/landing/OniGirl8.jpg' },
    { number: '9', name: 'Aether', tag: 'Space', color: '#fd79a8', image: '/assets/images/landing/OniGirl13.webp' },
  ];

  const calculateActiveIndex = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    const { scrollTop, scrollHeight, clientHeight } = container;
    const containerRect = container.getBoundingClientRect();

    const computedStyle = window.getComputedStyle(container);
    const paddingTop = parseFloat(computedStyle.paddingTop) || 0;
    const paddingBottom = parseFloat(computedStyle.paddingBottom) || 0;

    let closestIndex = 0;
    let maxScore = 0;

    itemsRef.current.forEach((item, index) => {
      if (!item) return;

      const itemRect = item.getBoundingClientRect();
      const visibleTop = Math.max(containerRect.top + paddingTop, itemRect.top);
      const visibleBottom = Math.min(
        containerRect.bottom - paddingBottom,
        itemRect.bottom
      );
      const visibleHeight = Math.max(0, visibleBottom - visibleTop);

      const itemCenter = (itemRect.top + itemRect.bottom) / 2;
      const containerCenter = (containerRect.top + containerRect.bottom) / 2;
      const centerWeight =
        1 -
        Math.abs(itemCenter - containerCenter) / (containerRect.height * 0.7);

      const score = visibleHeight * centerWeight;
      if (score > maxScore) {
        maxScore = score;
        closestIndex = index;
      }
    });

    if (scrollTop <= 1) closestIndex = 0;
    if (scrollTop + clientHeight >= scrollHeight - 1)
      closestIndex = itemsRef.current.length - 1;

    if (closestIndex !== lastActiveIndex.current) {
      lastActiveIndex.current = closestIndex;
      setActiveIndex(closestIndex);
    }

    setShowBottomIndicator(
      scrollTop + clientHeight < scrollHeight - paddingBottom
    );
  }, []);

  // Smooth Scroll Interpolation (Zentry-Style)
  const [smoothProgress, setSmoothProgress] = useState(0);
  const targetProgress = useRef(0);
  
  // Berechnete Rotation für kontinuierliches Drehen mit korrekter aktiver Karte
  const [calculatedRotation, setCalculatedRotation] = useState(0);
  const targetRotation = useRef(0);

  const handleScroll = useCallback(() => {
    if (animationFrameId.current) {
      cancelAnimationFrame(animationFrameId.current);
    }
    
    const container = containerRef.current;
    if (!container) return;
    
    // Berechne Scroll-Progress (0-1)
    const { scrollTop, scrollHeight, clientHeight } = container;
    targetProgress.current = scrollTop / (scrollHeight - clientHeight);
    
    animationFrameId.current = requestAnimationFrame(calculateActiveIndex);
  }, [calculateActiveIndex]);

  // Smooth Progress Animation (60fps) - Kontinuierliche Rotation
  useEffect(() => {
    let animationId;
    
    const animate = () => {
      setSmoothProgress(prev => {
        const diff = targetProgress.current - prev;
        const newProgress = prev + diff * 0.15; // Schnellere Interpolation für smoothere Rotation
        
        // Berechne die Zielrotation: Nur auf exakte Kartenpositionen
        const totalCards = products.length;
        targetRotation.current = -(activeIndex * (360 / totalCards)); // Exakte Position für aktive Karte
        
        return newProgress;
      });
      
      // Separate Animation für smooth Rotation zur Zielposition
      setCalculatedRotation(prev => {
        const diff = targetRotation.current - prev;
        const newRotation = prev + diff * 0.12; // Smooth interpolation zur Zielposition
        return newRotation;
      });
      
      // Animation läuft kontinuierlich weiter, unabhängig vom Unterschied
      animationId = requestAnimationFrame(animate);
    };
    
    animate();
    
    // Cleanup function
    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [activeIndex, products.length]);

  const scrollToProduct = useCallback(index => {
    const item = itemsRef.current[index];
    const container = containerRef.current;
    if (item && container) {
      const targetPosition =
        item.offsetTop - (container.clientHeight - item.clientHeight) / 2;

      container.scrollTo({
        top: targetPosition,
        behavior: 'smooth',
      });
    }
  }, []);

  const startDragging = useCallback(e => {
    setIsDragging(true);
    const container = containerRef.current;
    startY.current = e.clientY || e.touches?.[0].clientY;
    scrollTopStart.current = container.scrollTop;
    container.style.cursor = 'grabbing';
    container.style.scrollBehavior = 'auto';
    e.preventDefault();
  }, []);

  const stopDragging = useCallback(() => {
    setIsDragging(false);
    const container = containerRef.current;
    container.style.cursor = '';
    container.style.scrollBehavior = '';

    // Snap automatisch zur nächsten/aktuellen Kartenposition
    scrollToProduct(activeIndex);
  }, [activeIndex, scrollToProduct]);

  const handleDragging = useCallback(
    e => {
      if (!isDragging) return;

      const update = () => {
        const currentY = e.clientY || e.touches?.[0].clientY;
        const delta = startY.current - currentY;
        const newScroll = scrollTopStart.current + delta;

        const maxScroll =
          containerRef.current.scrollHeight - containerRef.current.clientHeight;
        const clampedScroll = Math.max(0, Math.min(maxScroll, newScroll));

        if (containerRef.current.scrollTop !== clampedScroll) {
          containerRef.current.scrollTop = clampedScroll;
          calculateActiveIndex();
        }
      };

      animationFrameId.current = requestAnimationFrame(update);
      e.preventDefault();
    },
    [isDragging, calculateActiveIndex]
  );

  useEffect(() => {
    const container = containerRef.current;
    container?.addEventListener('scroll', handleScroll);
    return () => {
      container?.removeEventListener('scroll', handleScroll);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [handleScroll]);

  useEffect(() => {
    calculateActiveIndex();
  }, [calculateActiveIndex]);

  // Maus-Tracking für 3D-Effekt (über die gesamte Website)
  const handleMouseMove = useCallback((e) => {
    // Verwende das gesamte Browserfenster als Referenz
    const x = (e.clientX / window.innerWidth) - 0.5; // -0.5 bis 0.5
    const y = (e.clientY / window.innerHeight) - 0.5; // -0.5 bis 0.5
    setMousePosition({ x, y });
  }, []);

  useEffect(() => {
    // Event Listener auf das gesamte Fenster setzen
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [handleMouseMove]);

  return (
    <div className={styles.mainContainer}>
      {/* Left Side - Scroll Menu */}
      <div
        className={styles.scrollContainer}
        ref={containerRef}
        onMouseDown={startDragging}
        onMouseMove={handleDragging}
        onMouseUp={stopDragging}
        onMouseLeave={stopDragging}
      >
        {products.map((product, index) => (
          <section
            key={index}
            ref={el => (itemsRef.current[index] = el)}
            className={`${styles.scrollItem} ${index === activeIndex ? styles.active : ''}`}
            onClick={() => scrollToProduct(index)}
          >
            <div className={styles.contentWrapper}>
              <div className={styles.index}>0{product.number}</div>
              <div className={styles.textContainer}>
                <span className={styles.category}>{product.tag}</span>
                <h2 className={styles.productTitle}>
                  <span className={styles.titleDeco}></span>
                  {product.name}
                </h2>
              </div>
            </div>
          </section>
        ))}

        <div
          className={`${styles.scrollIndicator} ${styles.bottom}`}
          data-visible={showBottomIndicator}
        >
          <div className="chevron"></div>
        </div>
      </div>

      {/* Right Side - CSS 3D Cards */}
      <div 
        className={styles.css3dContainer} 
        ref={css3dContainerRef}
      >
        <div className={styles.css3dScene}>
          <div 
            className={styles.cardsOrbit} 
            style={{ 
              '--active-index': activeIndex,
              '--smooth-progress': smoothProgress,
              '--calculated-rotation': calculatedRotation,
              '--mouse-x': mousePosition.x,
              '--mouse-y': mousePosition.y
            }}
          >
            {products.map((product, index) => (
              <div
                key={index}
                className={`${styles.productCard} ${index === activeIndex ? styles.active : ''}`}
                style={{
                  '--index': index,
                  '--total': products.length,
                  '--color': product.color,
                  '--distance-from-active': Math.abs(index - activeIndex),
                }}
                onClick={() => scrollToProduct(index)}
              >
                {/* Zentry-Style Frame System */}
                <div className={styles.cardFrame}>
                  <div className={styles.frameBorder}></div>
                  <div className={styles.frameCover}>
                    <div className={styles.cardImage}>
                      <Image 
                        src={product.image} 
                        alt={product.name}
                        fill
                        style={{ objectFit: 'cover' }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Carousel360;