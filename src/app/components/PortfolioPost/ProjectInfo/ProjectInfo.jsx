'use client';

import React from 'react';
import styles from './ProjectInfo.module.scss';

const ProjectInfo = ({ project }) => {
  if (!project) {
    return null;
  }

  const cells = [
    project.client  && { label: 'Client',  value: project.client },
    project.role    && { label: 'Rolle',   value: project.role },
    project.status  && { label: 'Status',  value: project.status, isStatus: true },
    project.duration && { label: 'Dauer',  value: project.duration },
  ].filter(Boolean);

  return (
    <section className={styles.info}>
      <div className={styles.row}>
        {cells.map((cell, i) => (
          <div key={i} className={styles.cell}>
            <h3>{cell.label}</h3>
            {cell.isStatus ? (
              <p className={`${styles.statusValue} ${styles[project.status.toLowerCase()]}`}>
                {cell.value}
              </p>
            ) : (
              <p>{cell.value}</p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProjectInfo;
