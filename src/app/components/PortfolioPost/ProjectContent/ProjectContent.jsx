'use client';

import React from 'react';
import styles from './ProjectContent.module.scss';

const ProjectContent = ({ sections }) => {
  return (
    <section className={styles.content}>
      {sections.map((section) => (
        <div key={section.id} className={styles.section} id={section.id}>
          <h2 className={styles.title}>{section.title}</h2>
          <div 
            className={styles.text}
            dangerouslySetInnerHTML={{ __html: section.content }}
          />
        </div>
      ))}
    </section>
  );
};

export default ProjectContent;
