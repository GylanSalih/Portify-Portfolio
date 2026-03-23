'use client';

import React from 'react';
import AboutMe from '../components/AboutMeComponents/AboutMe/AboutMe';
import Skills from '../components/AboutMeComponents/Skills/Skills';
import WakaTimeStats from '../components/AboutMeComponents/WakaTimeStats/WakaTimeStats';
import AboutCTA from '../components/AboutMeComponents/AboutCTA/AboutCTA';
import styles from './About.module.scss';

export default function About() {
  return (
    <div className={styles.page}>
      <AboutCTA />
      <AboutMe />
      <Skills />
      <WakaTimeStats />
    </div>
  );
}
