import React from 'react';
import AboutMe from '../components/AboutMeComponents/AboutMe/AboutMe';
import Skills from '../components/AboutMeComponents/Skills/Skills';
import styles from './About.module.scss';

export default function About() {
  return (
    <div className={styles.page}>
      <AboutMe />
      <Skills />
    </div>
  );
}
