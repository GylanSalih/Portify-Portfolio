'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
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
      <ul className={styles.grid}>
        {relatedProjects.map((relatedProject) => (
          <li key={`related-${relatedProject.slug}`} className={styles.gridItem}>
            <div className={styles.cardCourse}>
              <figure className={styles.cardFigure}>
                <Link href={`/portfolio/${relatedProject.slug}`}>
                  <Image
                    src={relatedProject.image || '/images/placeholder.jpg'}
                    alt={relatedProject.title}
                    width={550}
                    height={400}
                    className={styles.cardImage}
                  />
                  <div className={styles.cardOverlay}>
                    <div>
                      <h3>{relatedProject.title}</h3>
                      <p>{relatedProject.category}</p>
                      <div className={styles.cardTags}>
                        <span className={styles.cardTag}>Portfolio</span>
                        <span className={styles.cardTag}>Design</span>
                      </div>
                    </div>
                    <div className={styles.cardLinkIcon}>
                      <ArrowUpRight size={20} />
                    </div>
                  </div>
                </Link>
              </figure>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default RelatedProjects;
