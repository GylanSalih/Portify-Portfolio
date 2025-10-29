// src/app/page.js
import React from 'react';
import LandingSlider from './components/HomeComponents/LandingSlider/LandingSlider';
import Features from './components/HomeComponents/Features/Features';
import Testimonials from './components/HomeComponents/Testimonials/Testimonials';
import CallToAction from './components/HomeComponents/CallToAction/CallToAction';
import ContentSlider from './components/HomeComponents/ContentSlider/ContentSlider';

// nur für home
import './styles/home-page.css';

const Home = () => {
  return (
    <div className="page home-page">
      <LandingSlider />
      <Testimonials />
      <Features />
      <ContentSlider />
      <CallToAction />
    </div>
  );
};

export default Home;
