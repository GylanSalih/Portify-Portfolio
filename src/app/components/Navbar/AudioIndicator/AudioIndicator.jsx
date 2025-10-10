'use client';

import React from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import './AudioIndicator.css';

const AudioIndicator = ({ isPlaying, onClick, className = '' }) => {
  return (
    <button
      onClick={onClick}
      className={`audio-indicator ${isPlaying ? 'playing' : ''} ${className}`}
      aria-label={isPlaying ? 'Mute audio' : 'Play audio'}
    >
      <div className="audio-icon">
        {isPlaying ? (
          <Volume2 size={20} className="icon volume-on" />
        ) : (
          <VolumeX size={20} className="icon volume-off" />
        )}
      </div>
      
      {/* Sound waves animation - CSS only */}
      {isPlaying && (
        <div className="sound-waves">
          <div className="wave wave-1"></div>
          <div className="wave wave-2"></div>
          <div className="wave wave-3"></div>
        </div>
      )}
    </button>
  );
};

export default AudioIndicator;