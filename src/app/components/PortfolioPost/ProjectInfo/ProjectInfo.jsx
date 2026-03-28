'use client';

import React from 'react';
import styles from './ProjectInfo.module.scss';

const ProjectInfo = ({ project }) => {
  if (!project) {
    return null;
  }

  const cells = [
    project.client   && { label: 'Client', value: project.client },
    project.duration && { label: 'Dauer',  value: project.duration },
    { label: 'Coming Soon', value: '—' },
    { label: 'Coming Soon', value: '—' },
  ].filter(Boolean);

  return (
    <section className={styles.info}>
      <div className={styles.row}>
        {cells.map((cell, i) => (
          <div key={i} className={styles.cell}>
            <span className={styles.cellLabel}>{cell.label}</span>
            <span className={styles.cellValue}>{cell.value}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProjectInfo;
