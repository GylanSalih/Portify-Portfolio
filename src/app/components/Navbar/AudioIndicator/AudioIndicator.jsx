'use client';

import React from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import styles from './styles.module.scss';

const AudioIndicator = ({ isPlaying, onClick, className = '' }) => {
  return (
    <button
      onClick={onClick}
      className={`${styles.audioIndicator} ${isPlaying ? styles.playing : ''} ${className}`}
      aria-label={isPlaying ? 'Mute audio' : 'Play audio'}
    >
      <div className={styles.audioIcon}>
        {isPlaying ? (
          <Volume2 size={20} className={`${styles.icon} ${styles.volumeOn}`} />
        ) : (
          <VolumeX size={20} className={`${styles.icon} ${styles.volumeOff}`} />
        )}
      </div>
      
      {/* Sound waves animation - CSS only */}
      {isPlaying && (
        <div className={styles.soundWaves}>
          <div className={`${styles.wave} ${styles.wave1}`}></div>
          <div className={`${styles.wave} ${styles.wave2}`}></div>
          <div className={`${styles.wave} ${styles.wave3}`}></div>
        </div>
      )}
    </button>
  );
};

export default AudioIndicator;