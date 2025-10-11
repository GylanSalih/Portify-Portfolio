'use client';
import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, ArrowUpRight } from 'lucide-react';
import styles from './ContentSlider.module.scss';

const ContentSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(4);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [currentTranslate, setCurrentTranslate] = useState(0);
  const [prevTranslate, setPrevTranslate] = useState(0);
  const videoRefs = useRef({});

  const sliderItems = [
    {
      id: 1,
      title: "Web Development",
      description: "Modern and responsive websites",
      category: "Development",
      tags: ["React", "Next.js", "SCSS"],
      image: "/assets/gifs/RedSamurai.gif",
      type: "gif"
    },
    {
      id: 2,
      title: "UI/UX Design",
      description: "Beautiful user interfaces",
      category: "Design",
      tags: ["Figma", "Adobe XD"],
      image: "/assets/images/portfolio/New2.png",
      type: "image"
    },
    {
      id: 3,
      title: "3D Modeling",
      description: "Stunning 3D models",
      category: "3D Art",
      tags: ["Blender", "Three.js"],
      image: "/assets/videos/sea.mp4",
      type: "video"
    },
    {
      id: 4,
      title: "Brand Identity",
      description: "Memorable brand experiences",
      category: "Branding",
      tags: ["Logo", "Branding"],
      image: "/assets/images/portfolio/New4.png",
      type: "image"
    },
    {
      id: 5,
      title: "Mobile Apps",
      description: "Cross-platform applications",
      category: "Mobile",
      tags: ["React Native", "iOS"],
      image: "/assets/videos/drift.mp4",
      type: "video"
    },
    {
      id: 6,
      title: "E-Commerce",
      description: "Online shopping solutions",
      category: "E-Commerce",
      tags: ["Shopify", "WooCommerce"],
      image: "/assets/images/portfolio/New6.png",
      type: "image"
    },
    {
      id: 7,
      title: "Digital Marketing",
      description: "Strategic campaigns",
      category: "Marketing",
      tags: ["SEO", "Social Media"],
      image: "/assets/videos/Sakura.mp4",
      type: "video"
    },
    {
      id: 8,
      title: "Creative Content",
      description: "Visual storytelling",
      category: "Content",
      tags: ["Video", "Photography"],
      image: "/assets/images/portfolio/New8.png",
      type: "image"
    },
    {
      id: 9,
      title: "Interactive Web",
      description: "Immersive experiences",
      category: "Interactive",
      tags: ["WebGL", "GSAP"],
      image: "/assets/videos/redfire.mp4",
      type: "video"
    },
    {
      id: 10,
      title: "Custom Solutions",
      description: "Tailored digital solutions",
      category: "Custom",
      tags: ["Full Stack", "API"],
      image: "/assets/images/portfolio/New10.png",
      type: "image"
    },
  ];

  // Calculate responsive items per view based on screen size
  useEffect(() => {
    const updateItemsPerView = () => {
      const width = window.innerWidth;
      if (width <= 768) {
        setItemsPerView(1);
      } else if (width <= 1024) {
        setItemsPerView(2);
      } else if (width <= 1400) {
        setItemsPerView(3);
      } else {
        setItemsPerView(4);
      }
    };

    updateItemsPerView();
    window.addEventListener('resize', updateItemsPerView);
    return () => window.removeEventListener('resize', updateItemsPerView);
  }, []);

  const maxIndex = Math.max(0, sliderItems.length - itemsPerView);

  // Reset currentIndex if it exceeds maxIndex when screen size changes
  useEffect(() => {
    if (currentIndex > maxIndex) {
      setCurrentIndex(maxIndex);
    }
  }, [maxIndex, currentIndex]);

  const goToPrevious = () => {
    setCurrentIndex(prev => Math.max(0, prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex(prev => Math.min(maxIndex, prev + 1));
  };

  const goToSlide = (index) => {
    setCurrentIndex(Math.min(maxIndex, Math.max(0, index)));
  };

  // Drag handlers
  const handleDragStart = (e) => {
    setIsDragging(true);
    setStartX(e.type.includes('mouse') ? e.pageX : e.touches[0].clientX);
  };

  const handleDragMove = (e) => {
    if (!isDragging) return;
    
    const currentPosition = e.type.includes('mouse') ? e.pageX : e.touches[0].clientX;
    const diff = currentPosition - startX;
    setCurrentTranslate(prevTranslate + diff);
  };

  const handleDragEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);
    
    const movedBy = currentTranslate - prevTranslate;
    const threshold = 50; // Minimum drag distance to trigger slide change
    
    if (Math.abs(movedBy) > threshold) {
      // Calculate how many slides to skip based on drag distance
      // Get the approximate width of one slide item
      const containerWidth = window.innerWidth - 160; // Minus padding and buttons
      const slideWidth = (containerWidth / itemsPerView) + 24; // Include gap
      
      // Calculate slides based on drag distance, with a minimum of 1
      const slidesToMove = Math.max(1, Math.round(Math.abs(movedBy) / slideWidth));
      
      if (movedBy < 0) {
        // Dragging left (next slides)
        const newIndex = Math.min(maxIndex, currentIndex + slidesToMove);
        setCurrentIndex(newIndex);
      } else {
        // Dragging right (previous slides)
        const newIndex = Math.max(0, currentIndex - slidesToMove);
        setCurrentIndex(newIndex);
      }
    }
    
    setCurrentTranslate(0);
    setPrevTranslate(0);
  };

  // Update prevTranslate when currentIndex changes
  useEffect(() => {
    setPrevTranslate(0);
    setCurrentTranslate(0);
  }, [currentIndex]);

  // Video hover handlers
  const handleCardMouseEnter = (itemId) => {
    const video = videoRefs.current[itemId];
    if (video && !isDragging) {
      video.play().catch(e => console.error('Error playing video:', e));
    }
  };

  const handleCardMouseLeave = (itemId) => {
    const video = videoRefs.current[itemId];
    if (video) {
    //   video.pause();
      video.currentTime = 0;
    }
  };

  return (
    <section className={styles['contentSlider']}>
      <div className={styles['container']}>
        <div className={styles['header']}>
          <h2 className={styles['title']}>My Services</h2>
          <p className={styles['subtitle']}>
            Explore the range of creative services and solutions I offer
          </p>
        </div>

        <div className={styles['sliderContainer']}>
          <button 
            className={`${styles['navButton']} ${styles['prevButton']}`}
            onClick={goToPrevious}
            disabled={currentIndex === 0}
            aria-label="Previous Content"
          >
            <ChevronLeft size={24} />
          </button>

          <div 
            className={styles['sliderWrapper']}
            onMouseDown={handleDragStart}
            onMouseMove={handleDragMove}
            onMouseUp={handleDragEnd}
            onMouseLeave={handleDragEnd}
            onTouchStart={handleDragStart}
            onTouchMove={handleDragMove}
            onTouchEnd={handleDragEnd}
          >
            <div 
              className={`${styles['sliderTrack']} ${isDragging ? styles['dragging'] : ''}`}
              style={{
                transform: `translateX(calc(-${currentIndex * (100 / itemsPerView)}% + ${currentTranslate}px))`,
                transition: isDragging ? 'none' : 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
              }}
            >
              {sliderItems.map((item) => (
                <div 
                  key={item.id} 
                  className={styles['sliderItem']}
                  onMouseEnter={() => item.type === 'video' && handleCardMouseEnter(item.id)}
                  onMouseLeave={() => item.type === 'video' && handleCardMouseLeave(item.id)}
                >
                  <div className={styles['card']}>
                    <figure className={styles['figure']}>
                      {item.type === 'video' ? (
                        <video
                          ref={el => videoRefs.current[item.id] = el}
                          src={item.image}
                          loop
                          muted
                          playsInline
                          preload="metadata"
                          className={styles['image']}
                        />
                      ) : (
                        <img
                          src={item.image}
                          alt={item.title}
                          loading="lazy"
                          className={styles['image']}
                        />
                      )}
                      <div className={styles['overlay']}>
                        <div>
                          <h3>{item.title}</h3>
                          <p>{item.category}</p>
                          <div className={styles['tags']}>
                            {item.tags.map((tag, idx) => (
                              <span key={idx} className={styles['tag']}>{tag}</span>
                            ))}
                          </div>
                        </div>
                        <div className={styles['linkIcon']}>
                          <ArrowUpRight size={20} />
                        </div>
                      </div>
                    </figure>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button 
            className={`${styles['navButton']} ${styles['nextButton']}`}
            onClick={goToNext}
            disabled={currentIndex >= maxIndex}
            aria-label="Next Content"
          >
            <ChevronRight size={24} />
          </button>
        </div>

        <div className={styles['indicators']}>
          {Array.from({ length: maxIndex + 1 }, (_, index) => (
            <button
              key={index}
              className={`${styles['indicator']} ${index === currentIndex ? styles['active'] : ''}`}
              onClick={() => goToSlide(index)}
              aria-label={`Go to Slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ContentSlider;

