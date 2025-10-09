import React from 'react';
import AboutMe from '../components/AboutMeComponents/AboutMe/AboutMe';
import Skills from '../components/AboutMeComponents/Skills/Skills';
import styles from './About.css'; // Optional für allgemeine Stile

export default function About() {
  return (
    <div className="aboutcssPage">
      <AboutMe />
      <Skills />
    </div>
  );
}
