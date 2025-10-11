'use client';

import React from 'react';
import styles from './TechStack.module.scss';

const TechStack = ({ techStack }) => {
  if (!techStack || techStack.length === 0) {
    return null;
  }

  return (
    <section className={styles.stack}>
      <h2 className={styles.title}>Technologien</h2>
      <div className={styles.grid}>
        {techStack.map((tech, index) => (
          <div key={`tech-${index}`} className={styles.item}>
            <h4>{tech.name}</h4>
            <p>{tech.category}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TechStack;
