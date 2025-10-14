'use client';

import React from 'react';
import styles from './ProjectInfo.module.scss';

const ProjectInfo = ({ project }) => {
  if (!project) {
    return null;
  }

  return (
    <section className={styles.info}>
      <div className={styles.grid}>
        {project.client && (
          <div className={styles.card}>
            <h3>Client</h3>
            <p>{project.client}</p>
          </div>
        )}
        {project.role && (
          <div className={styles.card}>
            <h3>Rolle</h3>
            <p>{project.role}</p>
          </div>
        )}
        {project.status && (
          <div className={styles.card}>
            <h3>Status</h3>
            <p className={`${styles.status} ${styles[project.status.toLowerCase()]}`}>{project.status}</p>
          </div>
        )}
        {project.duration && (
          <div className={styles.card}>
            <h3>Dauer</h3>
            <p>{project.duration}</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProjectInfo;
