'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { X, ChevronLeft, ChevronRight, Calendar } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { getShowcaseData } from '../../../lib/showcaseData';
import styles from './ShowSingle.module.scss';

const ShowSingle = () => {
  const params = useParams();
  const router = useRouter();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isImageViewOpen, setIsImageViewOpen] = useState(false);
  const [showcaseData, setShowcaseData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load showcase data
  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await getShowcaseData();
        setShowcaseData(data.showcaseData);
        setIsLoading(false);
      } catch (error) {
        console.error('Error loading showcase data:', error);
        setIsLoading(false);
      }
    };
    
    loadData();
  }, []);

  // Find current showcase item by slug
  const currentItem = showcaseData.find(item => item.slug === params.slug);
  
  // Find navigation items
  const currentIndex = showcaseData.findIndex(item => item.slug === params.slug);
  const prevItem = currentIndex > 0 ? showcaseData[currentIndex - 1] : null;
  const nextItem = currentIndex < showcaseData.length - 1 ? showcaseData[currentIndex + 1] : null;

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'Escape') {
        if (isImageViewOpen) {
          setIsImageViewOpen(false);
        } else {
          router.push('/showcase?view=grid');
        }
      }
      if (isImageViewOpen) {
        if (e.key === 'ArrowLeft' && currentImageIndex > 0) {
          setCurrentImageIndex(prev => prev - 1);
        }
        if (e.key === 'ArrowRight' && currentImageIndex < currentItem.gallery.length - 1) {
          setCurrentImageIndex(prev => prev + 1);
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isImageViewOpen, currentImageIndex, currentItem, router]);

  if (isLoading) {
    return (
      <div className={styles.showSingle}>
        <div style={{ color: '#fff', textAlign: 'center', padding: '2rem' }}>
          Loading...
        </div>
      </div>
    );
  }

  if (!currentItem) {
    return (
      <div className={styles.notFound}>
        <h1>Showcase item not found</h1>
        <button onClick={() => router.push('/showcase?view=grid')}>
          Back to Showcase
        </button>
      </div>
    );
  }

  const handleImageClick = (index) => {
    setCurrentImageIndex(index);
    setIsImageViewOpen(true);
  };

  const handleNextImage = () => {
    if (currentImageIndex < currentItem.gallery.length - 1) {
      setCurrentImageIndex(prev => prev + 1);
    }
  };

  const handlePrevImage = () => {
    if (currentImageIndex > 0) {
      setCurrentImageIndex(prev => prev - 1);
    }
  };

  return (
    <>
      <div className={styles.showSingle}>
        {/* Close Button */}
        <button 
          className={styles.closeButton}
          onClick={() => router.push('/showcase?view=grid')}
          aria-label="Close"
        >
          <X size={20} />
        </button>

        {/* Navigation Bar (Desktop) */}
        <div className={styles.navigationBar}>
          <div className={styles.navContent}>
            <div className={styles.navButtons}>
              <button 
                className={styles.navButton}
                onClick={() => prevItem && router.push(`/showcase/${prevItem.slug}`)}
                disabled={!prevItem}
              >
                <ChevronLeft size={20} />
              </button>
              <button 
                className={styles.navButton}
                onClick={() => nextItem && router.push(`/showcase/${nextItem.slug}`)}
                disabled={!nextItem}
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className={styles.contentWrapper}>
          <div className={styles.container}>
            {/* Left Column - Info */}
            <div className={styles.infoColumn}>
              <div className={styles.stickyInfo}>
                <h1 className={styles.title}>{currentItem.title}</h1>
                
                <div className={styles.meta}>
                  <div className={styles.metaItem}>
                    <Calendar size={16} />
                    <span>{currentItem.date}</span>
                  </div>
                </div>

                <p className={styles.description}>{currentItem.description}</p>

                <div className={styles.tags}>
                  {currentItem.tags.map((tag, index) => (
                    <span key={index} className={styles.tag}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - Gallery */}
            <div className={styles.galleryColumn}>
              <div className={styles.gallery}>
                {currentItem.gallery.map((image, index) => (
                  <motion.div
                    key={index}
                    className={styles.galleryItem}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => handleImageClick(index)}
                  >
                    <img 
                      src={image} 
                      alt={`${currentItem.title} - Image ${index + 1}`}
                      className={styles.galleryImage}
                    />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Bar */}
        <div className={styles.mobileNavigationBar}>
          <div className={styles.navButtons}>
            <button 
              className={styles.navButton}
              onClick={() => prevItem && router.push(`/showcase/${prevItem.slug}`)}
              disabled={!prevItem}
            >
              <ChevronLeft size={20} />
            </button>
            <button 
              className={styles.navButton}
              onClick={() => nextItem && router.push(`/showcase/${nextItem.slug}`)}
              disabled={!nextItem}
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Fullscreen Image Viewer */}
      <AnimatePresence>
        {isImageViewOpen && (
          <motion.div 
            className={styles.imageViewer}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsImageViewOpen(false)}
          >
            <button 
              className={styles.viewerClose}
              onClick={() => setIsImageViewOpen(false)}
            >
              <X size={24} />
            </button>

            <div className={styles.viewerContent} onClick={(e) => e.stopPropagation()}>
              <button 
                className={`${styles.viewerNav} ${styles.viewerNavPrev}`}
                onClick={handlePrevImage}
                disabled={currentImageIndex === 0}
              >
                <ChevronLeft size={32} />
              </button>

              <motion.img
                key={currentImageIndex}
                src={currentItem.gallery[currentImageIndex]}
                alt={`${currentItem.title} - Image ${currentImageIndex + 1}`}
                className={styles.viewerImage}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
              />

              <button 
                className={`${styles.viewerNav} ${styles.viewerNavNext}`}
                onClick={handleNextImage}
                disabled={currentImageIndex === currentItem.gallery.length - 1}
              >
                <ChevronRight size={32} />
              </button>
            </div>

            <div className={styles.viewerCounter}>
              {currentImageIndex + 1} / {currentItem.gallery.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ShowSingle;

