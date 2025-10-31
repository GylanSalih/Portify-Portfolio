'use client';

import React from 'react';
import AboutHero from '../components/AboutMeComponents/AboutHero/AboutHero';
import AboutMe from '../components/AboutMeComponents/AboutMe/AboutMe';
import Skills from '../components/AboutMeComponents/Skills/Skills';
import WakaTimeStats from '../components/AboutMeComponents/WakaTimeStats/WakaTimeStats';
import ScrollCard from '../components/AboutMeComponents/ScrollCard/ScrollCard';
import AboutCTA from '../components/AboutMeComponents/AboutCTA/AboutCTA';
import ShowStart from '../components/showcase/ShowStart/ShowStart';
import styles from './About.module.scss';

// Showcase Data (gleiche Daten wie in showcase/page.jsx)
const showcaseData = [
  {
    id: 1,
    title: 'Akira Bike Design',
    image: '/assets/images/portfolio/Akira1.jpg',
    category: 'art',
    categoryDisplay: 'Digital Art',
    type: 'image',
    wide: true,
    tags: ['3D', 'Concept', 'Vehicle'],
    date: new Date('2025-01-15')
  },
  {
    id: 2,
    title: 'City Landscape',
    image: '/assets/images/portfolio/City.jpg',
    category: 'art',
    categoryDisplay: 'Digital Art',
    type: 'image',
    tags: ['Landscape', 'Urban', 'Illustration'],
    date: new Date('2025-02-10')
  },
  {
    id: 3,
    title: 'Landing Page Design',
    image: '/assets/images/landing/OniGirl1.webp',
    category: 'web',
    categoryDisplay: 'Web Development',
    type: 'image',
    tall: true,
    tags: ['React', 'UI/UX', 'Responsive'],
    date: new Date('2025-03-20')
  },
  {
    id: 4,
    title: 'Character Design',
    image: '/assets/images/landing/OniBoy1.webp',
    category: 'art',
    categoryDisplay: 'Digital Art',
    type: 'image',
    tags: ['Character', 'Anime', 'Portrait'],
    date: new Date('2024-11-05')
  },
  {
    id: 5,
    title: 'UI/UX Project',
    image: '/assets/images/portfolio/New1.png',
    category: 'design',
    categoryDisplay: 'UI/UX Design',
    type: 'image',
    tags: ['Figma', 'Interface', 'Mobile'],
    date: new Date('2024-11-15')
  },
  {
    id: 6,
    title: 'Illustration Work',
    image: '/assets/images/landing/OniGirl5.webp',
    category: 'art',
    categoryDisplay: 'Digital Art',
    type: 'image',
    tags: ['Illustration', 'Fantasy', 'Digital'],
    date: new Date('2024-11-25')
  },
  {
    id: 7,
    title: 'Web Development',
    image: '/assets/images/portfolio/New2.png',
    category: 'web',
    categoryDisplay: 'Web Development',
    type: 'image',
    wide: true,
    tags: ['Next.js', 'Full-Stack', 'API'],
    date: new Date('2025-01-05')
  },
  {
    id: 8,
    title: 'Branding Project',
    image: '/assets/images/portfolio/New3.png',
    category: 'design',
    categoryDisplay: 'UI/UX Design',
    type: 'image',
    tags: ['Branding', 'Logo', 'Identity'],
    date: new Date('2024-12-10')
  },
  {
    id: 9,
    title: 'Digital Art',
    image: '/assets/images/landing/OniGirl7.webp',
    category: 'art',
    categoryDisplay: 'Digital Art',
    type: 'image',
    tall: true,
    tags: ['Digital', 'Painting', 'Portrait'],
    date: new Date('2025-02-25')
  },
  {
    id: 10,
    title: 'Creative Project',
    image: '/assets/images/landing/OniGirl11.webp',
    category: 'art',
    categoryDisplay: 'Digital Art',
    type: 'image',
    tags: ['Creative', 'Digital', 'Artwork'],
    date: new Date('2024-11-20')
  },
  {
    id: 11,
    title: 'Web Application',
    image: '/assets/images/portfolio/New4.png',
    category: 'web',
    categoryDisplay: 'Web Development',
    type: 'image',
    tags: ['React', 'Dashboard', 'SaaS'],
    date: new Date('2025-03-05')
  },
  {
    id: 12,
    title: 'Concept Art',
    image: '/assets/images/landing/OniBoy2.webp',
    category: 'art',
    categoryDisplay: 'Digital Art',
    type: 'image',
    tags: ['Concept', 'Character', 'Anime'],
    date: new Date('2024-12-20')
  },
  {
    id: 13,
    title: 'Character Portrait',
    image: '/assets/images/landing/OniGirl6.webp',
    category: 'art',
    categoryDisplay: 'Digital Art',
    type: 'image',
    tags: ['Portrait', 'Character', 'Digital'],
    date: new Date('2024-12-15')
  },
  {
    id: 14,
    title: 'Fantasy Illustration',
    image: '/assets/images/landing/OniGirl13.webp',
    category: 'art',
    categoryDisplay: 'Digital Art',
    type: 'image',
    tags: ['Fantasy', 'Illustration', 'Art'],
    date: new Date('2024-12-05')
  }
];

export default function About() {
  return (
    <div className={styles.page}>
      <AboutHero />
      <ScrollCard/>
      <AboutCTA />
      <AboutMe />
      <Skills />
      <WakaTimeStats />
    </div>
  );
}
