'use client';

import { useState, useEffect, useRef } from 'react';
import { Heart } from 'lucide-react';
import { formatNumber } from '../../../lib/blogUtils';
import styles from './LikeButton.module.css';

const LikeButton = ({ 
  slug, 
  stats = { likes: 0 }, 
  statsLoading = false, 
  incrementLikes,
  className = '' 
}) => {
  const [hasLiked, setHasLiked] = useState(false);
  const [showMiniHearts, setShowMiniHearts] = useState(false);
  const timeoutRef = useRef(null); // Memory leak fix

  // Prüfe ob bereits geliked beim Laden
  useEffect(() => {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        const likedPosts = JSON.parse(
          localStorage.getItem('likedPosts') || '[]'
        );
        setHasLiked(likedPosts.includes(slug));
      }
    } catch (error) {
      console.warn('Could not load liked posts from localStorage:', error);
      setHasLiked(false);
    }
  }, [slug]);

  // Cleanup timeout on unmount - MEMORY LEAK FIX
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  // Like Handler mit verbesserter Error Handling und Heart Effect
  const handleLike = async () => {
    if (hasLiked || !incrementLikes) return;

    try {
      // Triggere die Mini Hearts Animation
      setShowMiniHearts(true);
      
      await incrementLikes();
      setHasLiked(true);

      // Reset mini hearts nach Animation - MEMORY LEAK FIX
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      
      timeoutRef.current = setTimeout(() => {
        setShowMiniHearts(false);
        timeoutRef.current = null;
      }, 1500);

      // Speichere in localStorage
      if (typeof window !== 'undefined' && window.localStorage) {
        try {
          const likedPosts = JSON.parse(
            localStorage.getItem('likedPosts') || '[]'
          );
          if (!likedPosts.includes(slug)) {
            likedPosts.push(slug);
            localStorage.setItem('likedPosts', JSON.stringify(likedPosts));
          }
        } catch (error) {
          console.warn('Could not save to localStorage:', error);
        }
      }
    } catch (error) {
      console.error('Error liking post:', error);
      setShowMiniHearts(false);
    }
  };

  return (
    <button
      onClick={handleLike}
      disabled={hasLiked || statsLoading}
      className={`${styles.button} ${hasLiked ? styles.liked : ''} ${className}`}
      aria-label={hasLiked ? 'Post bereits geliked' : 'Post liken'}
    >
      <div className={styles.heartContainer}>
        <Heart className={`${styles.heartIcon} ${hasLiked ? styles.filled : ''}`} />
        {showMiniHearts && (
          <div className={styles.miniHeartsEffect}>
            <span className={styles.miniHeart}>💖</span>
            <span className={styles.miniHeart}>💕</span>
            <span className={styles.miniHeart}>💗</span>
            <span className={styles.miniHeart}>💖</span>
            <span className={styles.miniHeart}>💕</span>
            <span className={styles.miniHeart}>💗</span>
            <span className={styles.miniHeart}>💖</span>
          </div>
        )}
      </div>
      <span className={styles.likeText}>
        {hasLiked ? 'Geliked' : 'Gefällt mir'}
      </span>
      <span className={styles.likeCount}>
        {statsLoading ? '0' : formatNumber(stats.likes)}
      </span>
    </button>
  );
};

export default LikeButton;
