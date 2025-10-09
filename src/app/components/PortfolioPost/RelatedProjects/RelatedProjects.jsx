'use client';

import React from 'react';
import Image from 'next/image';
import styles from './RelatedProjects.module.css';

const RelatedProjects = ({ relatedProjects }) => {
  if (!relatedProjects || relatedProjects.length === 0) {
    return null;
  }

  return (
    <section className={styles.related}>
      <div className={styles.header}>
        <h2 className={styles.title}>Ähnliche Projekte</h2>
      </div>
      <div className={styles.grid}>
        {relatedProjects.map((relatedProject) => (
          <a
            key={`related-${relatedProject.id}`}
            href={`/projects/${relatedProject.slug}`}
            className={styles.card}
          >
            <div className={styles.image}>
              <Image
                src={relatedProject.image || '/images/placeholder.jpg'}
                alt={relatedProject.title}
                width={300}
                height={200}
                className={styles.cardImage}
              />
            </div>
            <div className={styles.info}>
              <span className={styles.category}>{relatedProject.category}</span>
              <h3>{relatedProject.title}</h3>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
};

export default RelatedProjects;
