import React from 'react';
import AboutHero from '../components/AboutMeComponents/AboutHero/AboutHero';
import AboutMe from '../components/AboutMeComponents/AboutMe/AboutMe';
import Skills from '../components/AboutMeComponents/Skills/Skills';
import WakaTimeStats from '../components/AboutMeComponents/WakaTimeStats/WakaTimeStats';
import styles from './About.module.scss';

export default function About() {
  return (
    <div className={styles.page}>
      <AboutHero />
      <AboutMe />
      <Skills />
      <WakaTimeStats />
    </div>
  );
}
