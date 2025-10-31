'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import styles from './ShowStart.module.scss';

const ShowStart = ({ data = [], onClose = null }) => {
  const [isHovered, setIsHovered] = useState(false);

  // Handle Explore Button Click
  const handleExploreClick = () => {
    if (onClose) {
      onClose();
    }
  };

  // Daten werden bereits geshuffled übergeben
  const displayData = data;

  return (
    <motion.div 
      className={styles.showStart}
      initial={{ opacity: 1 }}
    >
      {/* Left Side - Text Content (Fixed) */}
      <motion.div 
        className={styles.leftContent}
        initial={{ opacity: 1, x: 0 }}
      >
        <div className={styles.textWrapper}>
          <h2 className={styles.title}>WHO I AM</h2>
          <p className={styles.description}>
            I&apos;m Gylan Salih, a developer with a passion for design, technology, and
            digital culture. I love creating things that connect creativity and code, from
            web apps to visuals and interactive experiences. For me, it is all about
            exploring new ideas, learning constantly, and building things that inspire
            others in the digital space.
          </p>
          <button className={styles.exploreButton} onClick={handleExploreClick}>
            <span>EXPLORE</span>
            <ArrowRight size={20} />
          </button>
        </div>
      </motion.div>

      {/* Right Side - Grid */}
      <div 
        className={styles.rightGrid}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleExploreClick}
      >
        <LayoutGroup>
          <motion.div 
            className={styles.gridContainer}
            initial={{ opacity: 1, x: 0 }}
            animate={{
              x: isHovered ? 100 : 60, // Start bei 60px, bei Hover 100px
            }}
            transition={{
              duration: 0.6,
              ease: [0.4, 0, 0.2, 1]
            }}
          >
            <AnimatePresence mode="wait">
              {displayData.map((item, index) => {
                // Berechne Reihe und Spalte für Zickzack-Layout
                const rowIndex = Math.floor(index / 4);
                const colIndex = index % 4;
                
                // Zickzack: Ungerade Reihen (1, 3, 5...) werden versetzt
                const isOffsetRow = rowIndex % 2 === 1;
                
                // Berechne ob die Karte wide ist
                const cardSpan = item.wide ? 2 : 1;
                
                return (
                  <motion.div
                    key={item.id}
                    layout
                    layoutId={`card-${item.id}`}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ 
                      opacity: 1, 
                      scale: 1,
                    }}
                    exit={{ opacity: 0, y: 60, x: 40, scale: 0.92 }}
                    transition={{
                      duration: 0.5,
                      delay: index * 0.05,
                      layout: { 
                        duration: 0.6,
                        ease: [0.25, 0.46, 0.45, 0.94]
                      },
                      opacity: { duration: 0.3 },
                      ease: [0.25, 0.46, 0.45, 0.94]
                    }}
                    className={`${styles.gridCard} ${isOffsetRow ? styles.offsetCard : ''} ${item.wide ? styles.wideCard : ''}`}
                    data-row={rowIndex}
                    data-col={colIndex}
                  >
                    <div className={styles.cardInner}>
                      <img 
                        src={item.image} 
                        alt={item.title}
                        className={styles.cardImage}
                      />
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>
        </LayoutGroup>
      </div>
    </motion.div>
  );
};

export default ShowStart;
