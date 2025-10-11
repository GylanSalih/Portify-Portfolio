'use client';

import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import styles from './PortfolioHero.module.scss';

const PortfolioHero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      image: "/assets/images/portfolio/New1.png",
      title: "Modern Web Design",
      category: "Web Development",
      description: "A cutting-edge web application with modern UI/UX design"
    },
    {
      id: 2,
      image: "/assets/images/portfolio/New2.png",
      title: "Mobile App Design",
      category: "Mobile Development",
      description: "Intuitive mobile interface with seamless user experience"
    },
    {
      id: 3,
      image: "/assets/images/portfolio/New3.png",
      title: "E-commerce Platform",
      category: "Full-Stack",
      description: "Complete e-commerce solution with advanced features"
    },
    {
      id: 4,
      image: "/assets/images/portfolio/New4.png",
      title: "Dashboard Design",
      category: "UI/UX Design",
      description: "Data visualization dashboard with interactive components"
    }
  ];

  // Auto-slide functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <section className={styles.hero}>
      <div className={styles.container}>
        <div className={styles.sliderContainer}>
          <div className={styles.wrapper}>
            <div 
              className={styles.slides}
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {slides.map((slide) => (
                <div key={slide.id} className={styles.slide}>
                  <div className={styles.slideImage}>
                    <Image
                      src={slide.image}
                      alt={slide.title}
                      width={1200}
                      height={600}
                      className={styles.slideImg}
                      priority={slide.id === 1}
                    />
                    <div className={styles.slideOverlay}>
                      <div className={styles.slideContent}>
                        <span className={styles.slideCategory}>{slide.category}</span>
                        <h2 className={styles.slideTitle}>{slide.title}</h2>
                        <p className={styles.slideDescription}>{slide.description}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Arrows */}
          <button className={`${styles.navButton} ${styles.navButtonLeft}`} onClick={prevSlide} aria-label="Previous slide">
            <ChevronLeft className="icon" />
          </button>
          <button className={`${styles.navButton} ${styles.navButtonRight}`} onClick={nextSlide} aria-label="Next slide">
            <ChevronRight className="icon" />
          </button>

          {/* Dots Indicator */}
          <div className={styles.dotsContainer}>
            {slides.map((_, index) => (
              <button
                key={index}
                className={`${styles.dot} ${currentSlide === index ? styles.active : ''}`}
                onClick={() => goToSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PortfolioHero;
