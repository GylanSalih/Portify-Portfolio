'use client';

import React from 'react';
import styles from './holoeffekte.module.css';

const HolographicCard = ({ imgSrc, category, rarity }) => {
  return (
    <div className={styles.holographicSection}>
      <div
        className={`${styles.card} ${styles.holographic}`}
        data-rarity={rarity}
        data-category={category}
      >
        <div className={styles.cardEffects}>
          <img src={imgSrc} alt="Card" className={styles.cardImages} />
        </div>
        <div className={styles.projectHoverBlock}>
          <div>View Project</div>
        </div>
      </div>
    </div>
  );
};

export default HolographicCard;
