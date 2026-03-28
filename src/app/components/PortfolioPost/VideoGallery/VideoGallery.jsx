'use client';

import React, { useState, useRef } from 'react';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';
import styles from './VideoGallery.module.scss';

const isGif = (url) => url?.toLowerCase().includes('.gif');

const VideoGallery = ({ videos }) => {
  const [videoStates, setVideoStates] = useState({});
  const videoRefs = useRef({});

  if (!videos || videos.length === 0) {
    return null;
  }

  // Format duration to MM:SS
  const formatDuration = (seconds) => {
    if (!seconds || isNaN(seconds) || seconds < 0) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const toggleVideoPlay = (videoKey) => {
    const video = videoRefs.current[videoKey];
    if (video) {
      if (video.paused) {
        video.play();
        setVideoStates(prev => ({ ...prev, [videoKey]: { ...prev[videoKey], playing: true } }));
      } else {
        video.pause();
        setVideoStates(prev => ({ ...prev, [videoKey]: { ...prev[videoKey], playing: false } }));
      }
    }
  };

  const toggleVideoMute = (videoKey) => {
    const video = videoRefs.current[videoKey];
    if (video) {
      video.muted = !video.muted;
      setVideoStates(prev => ({
        ...prev,
        [videoKey]: { ...prev[videoKey], muted: video.muted },
      }));
    }
  };

  const handleTimeUpdate = (videoKey, e) => {
    setVideoStates(prev => ({
      ...prev,
      [videoKey]: { ...prev[videoKey], currentTime: e.target.currentTime },
    }));
  };

  return (
    <section className={styles.gallery}>
      <h2 className={styles.title}>Videos</h2>
      <div className={styles.grid}>
        {videos.map((video, index) => {
          const videoKey = `video-${index}`;
          const gif = isGif(video.url);
          return (
            <div key={videoKey} className={styles.container}>
              <div className={styles.wrapper}>
                {gif ? (
                  <img
                    src={video.url}
                    alt={video.caption || `GIF ${index + 1}`}
                    className={styles.player}
                  />
                ) : (
                  <video
                    ref={el => { videoRefs.current[videoKey] = el; }}
                    className={styles.player}
                    poster={video.thumbnail}
                    preload="metadata"
                    muted
                    onLoadedMetadata={(e) => {
                      setVideoStates(prev => ({
                        ...prev,
                        [videoKey]: {
                          duration: e.target.duration,
                          currentTime: 0,
                          muted: true,
                          playing: false,
                        },
                      }));
                    }}
                    onTimeUpdate={(e) => handleTimeUpdate(videoKey, e)}
                    onEnded={() => {
                      setVideoStates(prev => ({
                        ...prev,
                        [videoKey]: { ...prev[videoKey], playing: false, currentTime: 0 },
                      }));
                    }}
                  >
                    <source src={video.url} type="video/mp4" />
                    Ihr Browser unterstützt das Video-Element nicht.
                  </video>
                )}

                {!gif && (
                  <div className={styles.controls}>
                    <button
                      className={styles.button}
                      onClick={() => toggleVideoPlay(videoKey)}
                    >
                      {videoStates[videoKey]?.playing ? (
                        <Pause className="icon" />
                      ) : (
                        <Play className="icon" />
                      )}
                    </button>

                    <button
                      className={styles.button}
                      onClick={() => toggleVideoMute(videoKey)}
                    >
                      {videoStates[videoKey]?.muted !== false ? (
                        <VolumeX className="icon" />
                      ) : (
                        <Volume2 className="icon" />
                      )}
                    </button>

                    <span className={styles.duration}>
                      {formatDuration(
                        (videoStates[videoKey]?.duration || 0) -
                        (videoStates[videoKey]?.currentTime || 0)
                      )}
                    </span>
                  </div>
                )}
              </div>

              {video.caption && (
                <p className={styles.caption}>{video.caption}</p>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default VideoGallery;
