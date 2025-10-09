// src/app/page.js
import React, { Suspense, lazy } from 'react';
import LandingSlider from './components/HomeComponents/LandingSlider/LandingSlider';
import './styles/home-page.css'; // nur für home

// Lazy Loading für schwere Komponenten
const Features = lazy(() => import('./components/HomeComponents/Features/Features'));
const TestimonialsGrid = lazy(() => import('./components/HomeComponents/TestimonialsGrid/TestimonialsGrid'));
const CallToAction = lazy(() => import('./components/HomeComponents/CallToAction/CallToAction'));

// Loading Komponente
const ComponentLoader = () => (
  <div style={{ 
    height: '200px', 
    display: 'flex', 
    alignItems: 'center', 
    justifyContent: 'center',
    color: '#666'
  }}>
    <div style={{ textAlign: 'center' }}>
      <div style={{ 
        width: '40px', 
        height: '40px', 
        border: '3px solid #f3f3f3',
        borderTop: '3px solid #3b82f6',
        borderRadius: '50%',
        animation: 'spin 1s linear infinite',
        margin: '0 auto 10px'
      }}></div>
      Loading...
    </div>
  </div>
);

const Home = () => {
  return (
    <div className="page home-page">
      <LandingSlider />
      
      <Suspense fallback={<ComponentLoader />}>
        <Features />
      </Suspense>
      
      <Suspense fallback={<ComponentLoader />}>
        <TestimonialsGrid />
      </Suspense>
      
      <Suspense fallback={<ComponentLoader />}>
        <CallToAction />
      </Suspense>
    </div>
  );
};

export default Home;
