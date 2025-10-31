'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import styles from './ScrollCard.module.scss';

const ScrollCard = ({ 
  imageSrc = '/assets/images/landing/OniGirl13.webp', 
  imageAlt = 'Parallax image', 
  children 
}) => {
  const cardRef = useRef(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!cardRef.current) return;
  
      const rect = cardRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
  
      const start = windowHeight;
      const end = -rect.height;
  
      let progress = (start - rect.top) / (start - end);
      progress = Math.max(0, Math.min(1, progress));
  
      const centered = progress * 2 - 1;
  
      // etwas schwächerer Parallax-Effekt (±100 px)
      const translate = centered * 100;
  
      setOffset(translate);
    };
  
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
  
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  

  return (
    <div ref={cardRef} className={styles.card}>
      <div 
        className={styles.cardImage}
        style={{ transform: `translateY(${offset}px)` }}
      >
        <Image src={imageSrc} alt={imageAlt} fill className={styles.image} />
      </div>
      <div className={styles.cardContent}>
        {children}
      </div>
    </div>
  );
};

export default ScrollCard;
