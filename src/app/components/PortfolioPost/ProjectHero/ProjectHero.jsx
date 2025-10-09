'use client';

import React from 'react';
import { Calendar, Clock, Eye, ExternalLink, Github } from 'lucide-react';
import Image from 'next/image';
import styles from './ProjectHero.module.css';

const ProjectHero = ({ project, stats, hasLiked, onLike, statsLoading }) => {
  // Helper function for formatted numbers
  const formatNumber = num => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'k';
    }
    return num.toString();
  };

  return (
    <header className={styles.projectHero}>
      <div className={styles.heroContent}>
        <div className={styles.heroMeta}>
          <span className={styles.category}>{project.category}</span>
          <div className={styles.metaStats}>
            <div className={styles.metaItem}>
              <Calendar className="icon" />
              <span>{project.year}</span>
            </div>
            <div className={styles.metaItem}>
              <Clock className="icon" />
              <span>{project.duration}</span>
            </div>
            <div className={styles.metaItem}>
              <Eye className="icon" />
              <span>{formatNumber(stats.views)} Aufrufe</span>
            </div>
          </div>
        </div>
        
        <h1 className={styles.heroTitle}>{project.title}</h1>
        <p className={styles.heroSubtitle}>{project.subtitle}</p>
        
        {/* Like / View Buttons */}
        <div className={styles.countersWrapper}>
          <div className={styles.counterItem}>
            <span className={styles.counterLabel}>Views</span>
            <button className={styles.btnView}>
              <div className={styles.counterInfoRow}>
                <Eye className="icon" />
                <span className={styles.counterText}>{formatNumber(stats.views)}</span>
              </div>
            </button>
          </div>

          <div className={styles.counterItem}>
            <span className={styles.counterLabel}>Likes</span>
            <button
              className={`${styles.btnLike} ${hasLiked ? styles.liked : ''}`}
              onClick={onLike}
              disabled={hasLiked || statsLoading}
            >
              <div className={styles.counterInfoRow}>
                <svg
                  className="icon-like"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill={hasLiked ? 'currentColor' : 'none'}
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                </svg>
                <span className={styles.counterText}>{formatNumber(stats.likes)}</span>
              </div>
            </button>
          </div>
        </div>
        
        {/* Action Buttons */}
        <div className={styles.heroActions}>
          {project.liveUrl && (
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className={`${styles.btn} ${styles.btnPrimary}`}>
              <ExternalLink className="icon" />
              <span>Live Demo</span>
            </a>
          )}
          {project.githubUrl && (
            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className={`${styles.btn} ${styles.btnSecondary}`}>
              <Github className="icon" />
              <span>GitHub Repository</span>
            </a>
          )}
        </div>
      </div>
      
      <div className={styles.heroImage}>
        <Image
          src={project.heroImage || '/images/placeholder-hero.jpg'}
          alt={project.title}
          width={800}
          height={500}
          className={styles.mainImage}
          priority
        />
      </div>
    </header>
  );
};

export default ProjectHero;
