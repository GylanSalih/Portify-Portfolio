'use client';

import React from 'react';
import styles from './not-found.module.scss';

export default function NotFound() {
  return (
    <div className={styles.page}>
      <div className={styles.container}>
        {/* Hero Section */}
        <section className={styles.hero}>
          <div className={styles.content}>
            <div className={styles.errorCode}>
              <span className={styles.number}>404</span>
            </div>
            
            <h1 className={styles.title}>Page Not Found</h1>
            <p className={styles.description}>
              The page you're looking for doesn't exist or has been moved. 
              Let's get back to what matters.
            </p>
          </div>
        </section>

      </div>
    </div>
  );
}
