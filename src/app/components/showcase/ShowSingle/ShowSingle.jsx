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
  const [currentSlug, setCurrentSlug] = useState(params.slug);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isImageViewOpen, setIsImageViewOpen] = useState(false);
  const [showcaseData, setShowcaseData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Sync slug when browser back/forward navigates
  useEffect(() => {
    setCurrentSlug(params.slug);
    setCurrentImageIndex(0);
  }, [params.slug]);

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

  // SPA-style navigation: update URL without remounting the component
  const navigateTo = (slug) => {
    window.history.pushState(null, '', `/showcase/${slug}`);
    setCurrentSlug(slug);
    setCurrentImageIndex(0);
  };

  // Find current showcase item by slug
  const currentItem = showcaseData.find(item => item.slug === currentSlug);
  
  // Find navigation items
  const currentIndex = showcaseData.findIndex(item => item.slug === currentSlug);
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
      <motion.div
        className={styles.showSingle}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
      >
        {/* ── Fixed Sidebar ── */}
        <aside className={styles.sidebar}>
          <div className={styles.sidebarHeader}>
            <p className={styles.sidebarLabel}>Projects</p>
          </div>
          <div className={styles.sidebarInner}>
            <div className={styles.sidebarList}>
              {showcaseData.map((item) => (
                <button
                  key={item.slug}
                  className={`${styles.sidebarItem} ${item.slug === currentSlug ? styles.sidebarItemActive : ''}`}
                  onClick={() => navigateTo(item.slug)}
                  title={item.title}
                >
                  <div className={styles.sidebarThumb}>
                    <img
                      src={item.coverImage || item.image}
                      alt={item.title}
                      className={styles.sidebarThumbImg}
                    />
                  </div>
                  <span className={styles.sidebarItemTitle}>{item.title}</span>
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* ── Main scrollable content ── */}
        <div className={styles.mainScroll}>

          {/* Top bar: prev/next + close — all aligned on one row */}
          <div className={styles.topBar}>
            <div className={styles.topBarNav}>
              <button
                className={styles.navButton}
                onClick={() => prevItem && navigateTo(prevItem.slug)}
                disabled={!prevItem}
                aria-label="Previous project"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                className={styles.navButton}
                onClick={() => nextItem && navigateTo(nextItem.slug)}
                disabled={!nextItem}
                aria-label="Next project"
              >
                <ChevronRight size={20} />
              </button>
            </div>
            <button
              className={styles.closeButton}
              onClick={() => router.push('/showcase?view=grid')}
              aria-label="Close"
            >
              <X size={20} />
            </button>
          </div>

          {/* Project header — centered above gallery */}
          <div className={styles.projectHeader}>
            <div className={styles.headerTags}>
              {currentItem.tags.map((tag, index) => (
                <span key={index} className={styles.tag}>{tag}</span>
              ))}
            </div>
            <h1 className={styles.title}>{currentItem.title}</h1>
            <div className={styles.meta}>
              <div className={styles.metaItem}>
                <Calendar size={14} />
                <span>{currentItem.date}</span>
              </div>
            </div>
            <p className={styles.description}>{currentItem.description}</p>
          </div>

          {/* Gallery */}
          <div className={styles.gallery}>
            {currentItem.gallery.map((image, index) => (
              <motion.div
                key={index}
                className={styles.galleryItem}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08 }}
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

          {/* Mobile Navigation */}
          <div className={styles.mobileNavigationBar}>
            <div className={styles.navButtons}>
              <button
                className={styles.navButton}
                onClick={() => prevItem && navigateTo(prevItem.slug)}
                disabled={!prevItem}
                aria-label="Previous project"
              >
                <ChevronLeft size={20} />
              </button>
              <div className={styles.navIndicator}>
                <span className={styles.navIndicatorText}>
                  {currentIndex + 1} / {showcaseData.length}
                </span>
              </div>
              <button
                className={styles.navButton}
                onClick={() => nextItem && navigateTo(nextItem.slug)}
                disabled={!nextItem}
                aria-label="Next project"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>

        </div>
      </motion.div>

      {/* Fullscreen Image Viewer */}
      <AnimatePresence>
        {isImageViewOpen && (
          <motion.div 
            className={styles.imageViewer}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
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

              <AnimatePresence mode="wait">
                <motion.img
                  key={currentImageIndex}
                  src={currentItem.gallery[currentImageIndex]}
                  alt={`${currentItem.title} - Image ${currentImageIndex + 1}`}
                  className={styles.viewerImage}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                />
              </AnimatePresence>

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

