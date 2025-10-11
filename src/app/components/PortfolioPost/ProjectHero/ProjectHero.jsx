'use client';

import React from 'react';
import { Calendar, Clock, ExternalLink, Tag } from 'lucide-react';
import Image from 'next/image';
import styles from './ProjectHero.module.css';

const ProjectHero = ({ project }) => {

  return (
    <header className={styles.projectHero}>
      <div className={styles.heroImageContainer}>
        <Image
          src={project.heroImage || '/images/placeholder-hero.jpg'}
          alt={project.title}
          width={1200}
          height={600}
          className={styles.mainImage}
          priority
        />
        
        {/* Oben links: Jahr und Dauer */}
        <div className={styles.topLeft}>
          <div className={styles.metaStats}>
            <div className={styles.metaItem}>
              <Calendar className="icon" />
              <span>{project.year}</span>
            </div>
            <div className={styles.metaItem}>
              <Clock className="icon" />
              <span>{project.duration}</span>
            </div>
          </div>
        </div>

        {/* Oben rechts: DESIGN Kategorie */}
        <div className={styles.topRight}>
          <span className={styles.category}>{project.category}</span>
        </div>

        {/* Unten links: Tech Tags */}
        <div className={styles.bottomLeft}>
          <div className={styles.techTags}>
            <div className={styles.techTag}>
              <Tag className="icon" />
              <span>UI/UX Design</span>
            </div>
            <div className={styles.techTag}>
              <Tag className="icon" />
              <span>Mobile App Design</span>
            </div>
          </div>
        </div>

        {/* Unten rechts: Live Demo Button */}
        <div className={styles.bottomRight}>
          {project.liveUrl && (
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className={`${styles.btn} ${styles.btnPrimary}`}>
              <ExternalLink className="icon" />
              <span>Live Demo</span>
            </a>
          )}
        </div>
        
        {/* Zentriert: Titel und Untertitel - direkt im Image-Container */}
        <div className={styles.centerContent}>
          <h1 className={styles.heroTitle}>{project.title}</h1>
          <p className={styles.heroSubtitle}>{project.subtitle}</p>
        </div>
      </div>
    </header>
  );
};

export default ProjectHero;
