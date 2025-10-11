// src/app/page.js
import React from 'react';
import LandingSlider from './components/HomeComponents/LandingSlider/LandingSlider';
import Features from './components/HomeComponents/Features/Features';
import TestimonialsGrid from './components/HomeComponents/TestimonialsGrid/TestimonialsGrid';
import CallToAction from './components/HomeComponents/CallToAction/CallToAction';
import './styles/home-page.css'; // nur für home

const Home = () => {
  return (
    <div className="page home-page">
      <LandingSlider />
      <Features />
      <TestimonialsGrid />
      <CallToAction />
    </div>
  );
};

export default Home;
