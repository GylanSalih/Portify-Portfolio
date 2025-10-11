'use client';

import React from 'react';
import styles from './Features.module.scss';

const Features = ({ features }) => {
  if (!features || features.length === 0) {
    return null;
  }

  return (
    <section className={styles.features}>
      <h2 className={styles.title}>Key Features</h2>
      <div className={styles.grid}>
        {features.map((feature, index) => (
          <div key={`feature-${index}`} className={styles.item}>
            <div className={styles.icon}>✓</div>
            <p>{feature}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;
