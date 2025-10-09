'use client';

import React from 'react';
import styles from './ProjectInfo.module.css';

const ProjectInfo = ({ project }) => {
  return (
    <section className={styles.projectInfo}>
      <div className={styles.infoGrid}>
        <div className={styles.infoCard}>
          <h3>Client</h3>
          <p>{project.client}</p>
        </div>
        <div className={styles.infoCard}>
          <h3>Rolle</h3>
          <p>{project.role}</p>
        </div>
        <div className={styles.infoCard}>
          <h3>Status</h3>
          <p className={`${styles.status} ${styles[project.status.toLowerCase()]}`}>{project.status}</p>
        </div>
        <div className={styles.infoCard}>
          <h3>Dauer</h3>
          <p>{project.duration}</p>
        </div>
      </div>
    </section>
  );
};

export default ProjectInfo;
