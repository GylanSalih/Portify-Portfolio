'use client';

import React from 'react';
import { Calendar, Clock, ExternalLink, Tag, Github } from 'lucide-react';
import Image from 'next/image';
import styles from './ProjectHero.module.scss';

const ProjectHero = ({ project }) => {

  return (
    <header className={styles.hero}>
      <div className={styles.imageContainer}>
        <Image
          src={project.backgroundImage || '/images/placeholder-hero.jpg'}
          alt={project.title}
          width={1200}
          height={600}
          className={styles.image}
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
        {project.tags && project.tags.length > 0 && (
          <div className={styles.bottomLeft}>
            <div className={styles.techTags}>
              {project.tags.slice(0, 6).map((tag, index) => (
                <div key={index} className={styles.techTag}>
                  <Tag className="icon" />
                  <span>{tag}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Unten rechts: Action Buttons */}
        {(project.liveUrl || project.githubUrl) && (
          <div className={styles.bottomRight}>
            <div className={styles.actionButtons}>
              {project.liveUrl && (
                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className={`${styles.btn} ${styles.btnPrimary}`}>
                  <ExternalLink className="icon" />
                  <span>Live Demo</span>
                </a>
              )}
              {project.githubUrl && (
                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className={`${styles.btn} ${styles.btnSecondary}`}>
                  <Github className="icon" />
                  <span>Repository</span>
                </a>
              )}
            </div>
          </div>
        )}
        
        {/* Zentriert: Titel und Untertitel - direkt im Image-Container */}
        <div className={styles.centerContent}>
          <h1 className={styles.title}>{project.title}</h1>
          <p className={styles.subtitle}>{project.subtitle}</p>
        </div>
      </div>
    </header>
  );
};

export default ProjectHero;
