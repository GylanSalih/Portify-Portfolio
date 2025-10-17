'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import styles from './RelatedProjects.module.scss';

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
          <li key={`related-${relatedProject.slug}`} className={styles.item}>
            <div className={styles.card}>
              <figure className={styles.figure}>
                <Link href={`/portfolio/${relatedProject.slug}`}>
                  <Image
                    src={relatedProject.image || '/images/placeholder.jpg'}
                    alt={relatedProject.title}
                    width={550}
                    height={400}
                    className={styles.image}
                  />
                  <div className={styles.overlay}>
                    <div>
                      <h3>{relatedProject.title}</h3>
                      <p>{relatedProject.category}</p>
                      <div className={styles.tags}>
                        {relatedProject.tags && relatedProject.tags.length > 0 ? (
                          relatedProject.tags.slice(0, 3).map((tag, idx) => (
                            <span key={idx} className={styles.tag}>{tag}</span>
                          ))
                        ) : (
                          <span className={styles.tag}>{relatedProject.category}</span>
                        )}
                      </div>
                    </div>
                    <div className={styles.linkIcon}>
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
