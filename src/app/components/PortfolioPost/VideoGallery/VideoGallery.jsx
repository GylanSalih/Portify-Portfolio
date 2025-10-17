'use client';

import React, { useState } from 'react';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';
import styles from './VideoGallery.module.scss';

const VideoGallery = ({ videos }) => {
  const [videoStates, setVideoStates] = useState({});

  if (!videos || videos.length === 0) {
    return null;
  }

  // Format duration to MM:SS
  const formatDuration = (seconds) => {
    if (!seconds || isNaN(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Video controls
  const toggleVideoPlay = (videoId) => {
    const video = document.getElementById(videoId);
    if (video) {
      if (video.paused) {
        video.play();
        setVideoStates(prev => ({ ...prev, [videoId]: { ...prev[videoId], playing: true } }));
      } else {
        video.pause();
        setVideoStates(prev => ({ ...prev, [videoId]: { ...prev[videoId], playing: false } }));
      }
    }
  };

  const toggleVideoMute = (videoId) => {
    const video = document.getElementById(videoId);
    if (video) {
      video.muted = !video.muted;
      setVideoStates(prev => ({ 
        ...prev, 
        [videoId]: { ...prev[videoId], muted: video.muted }
      }));
    }
  };

  return (
    <section className={styles.gallery}>
      <h2 className={styles.title}>Videos</h2>
      <div className={styles.grid}>
        {videos.map((video, index) => (
          <div key={`video-${index}`} className={styles.container}>
            <div className={styles.wrapper}>
              <video
                id={`video-${index}`}
                className={styles.player}
                poster={video.thumbnail}
                preload="metadata"
                onLoadedMetadata={() => {
                  const videoEl = document.getElementById(`video-${index}`);
                  if (videoEl) {
                    setVideoStates(prev => ({
                      ...prev,
                      [`video-${index}`]: {
                        duration: videoEl.duration,
                        muted: true,
                        playing: false
                      }
                    }));
                  }
                }}
              >
                <source src={video.url} type="video/mp4" />
                Ihr Browser unterstützt das Video-Element nicht.
              </video>
              
              <div className={styles.controls}>
                <button 
                  className={styles.button}
                  onClick={() => toggleVideoPlay(`video-${index}`)}
                >
                  {videoStates[`video-${index}`]?.playing ? (
                    <Pause className="icon" />
                  ) : (
                    <Play className="icon" />
                  )}
                </button>
                
                <button 
                  className={styles.button}
                  onClick={() => toggleVideoMute(`video-${index}`)}
                >
                  {videoStates[`video-${index}`]?.muted ? (
                    <VolumeX className="icon" />
                  ) : (
                    <Volume2 className="icon" />
                  )}
                </button>
                
                <span className={styles.duration}>
                  {formatDuration(videoStates[`video-${index}`]?.duration)}
                </span>
              </div>
            </div>
            
            {video.caption && (
              <p className={styles.caption}>{video.caption}</p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default VideoGallery;
