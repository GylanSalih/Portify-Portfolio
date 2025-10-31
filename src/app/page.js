'use client';

// src/app/page.js
import React from 'react';
import LandingSlider from './components/HomeComponents/LandingSlider/LandingSlider';
import Features from './components/HomeComponents/Features/Features';
import Testimonials from './components/HomeComponents/Testimonials/Testimonials';
import CallToAction from './components/HomeComponents/CallToAction/CallToAction';
import ContentSlider from './components/HomeComponents/ContentSlider/ContentSlider';
import AutoImgScroll from './components/HomeComponents/AutoImgScroll/AutoImgScroll';
import { LandingImage } from './components';

// nur für home
import './styles/home-page.css';

const Home = () => {
  return (
    <div className="page home-page">
      <LandingSlider />
      {/* <LandingImage 
        src="https://cdn.shopify.com/s/files/1/0762/5972/1435/collections/Anime_Expo_Key_Art-min.jpg?v=1751412005" 
        alt="Landing Image"
      /> */}
      <Testimonials />
      <AutoImgScroll/>
      <Features />
      <ContentSlider />
      <CallToAction />
    </div>
  );
};

export default Home;
