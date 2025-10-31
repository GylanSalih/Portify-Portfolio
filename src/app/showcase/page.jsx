'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { AnimatePresence } from 'framer-motion';
import { getShowcaseData } from '../lib/showcaseData';
import styles from './showcase.module.scss';
import ShowGrid from '../components/showcase/ShowGrid/ShowGrid';
import ShowStart from '../components/showcase/ShowStart/ShowStart';

const Showcase = () => {
  const searchParams = useSearchParams();
  const [activeCategory, setActiveCategory] = useState('all');
  const [sortOrder, setSortOrder] = useState('ordered');
  const [showAllInfo, setShowAllInfo] = useState(false);
  const [showSplitView, setShowSplitView] = useState(true); // Default: ShowStart
  const [shuffleKey, setShuffleKey] = useState(Date.now()); // Initialer Random Key
  const [showcaseData, setShowcaseData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [showStartData, setShowStartData] = useState([]);
  const [isMounted, setIsMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [shuffledData, setShuffledData] = useState([]); // Gespeicherte gemischte Daten
  
  // Check if mobile on mount
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  // Check URL parameter for view preference and mobile
  useEffect(() => {
    const view = searchParams.get('view');
    if (view === 'grid' || isMobile) {
      setShowSplitView(false);
    }
  }, [searchParams, isMobile]);
  
  // Load showcase data
  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await getShowcaseData();
        setShowcaseData(data.showcaseData);
        setCategories(data.categories);
        setShowStartData(data.showcaseData);
        setIsMounted(true);
        setIsLoading(false);
        
        // Initial shuffle on client mount
        const shuffled = [...data.showcaseData].sort(() => Math.random() - 0.5);
        setShowStartData(shuffled);
        setShuffledData(shuffled); // Initialer Shuffle für Grid
      } catch (error) {
        console.error('Error loading showcase data:', error);
        setIsLoading(false);
      }
    };
    
    loadData();
  }, []);
  
  // Shuffle nur wenn sortOrder auf 'random' wechselt oder Kategorie ändert
  useEffect(() => {
    if (isMounted && sortOrder === 'random') {
      const filtered = activeCategory === 'all' 
        ? showcaseData 
        : showcaseData.filter(item => item.category === activeCategory);
      const shuffled = [...filtered].sort(() => Math.random() - 0.5);
      setShuffledData(shuffled);
    }
  }, [sortOrder, activeCategory, showcaseData, isMounted]);
  
  // Shuffle beim Zurückkehren zu ShowStart
  const handleBackToSplit = () => {
    setShuffleKey(Date.now()); // Neuer Random Key für neues Shuffle
    // Shuffle data when returning to split view
    const shuffled = [...showcaseData].sort(() => Math.random() - 0.5);
    setShowStartData(shuffled);
    setShowSplitView(true);
  };
  
  // Filter by category (nur für ShowGrid)
  let filteredData = activeCategory === 'all' 
    ? showcaseData 
    : showcaseData.filter(item => item.category === activeCategory);

  // Sort by date (newest first) or use saved shuffled data
  if (sortOrder === 'ordered') {
    filteredData = [...filteredData].sort((a, b) => b.dateObj - a.dateObj);
  } else if (sortOrder === 'random') {
    // Verwende die gespeicherten gemischten Daten
    filteredData = shuffledData;
  }

  if (isLoading) {
    return (
      <main className={styles.showcaseMain}>
        <div className={styles.showcaseWrapper}>
          <div className={styles.contentContainer}>
            <div style={{ color: '#fff', textAlign: 'center', padding: '2rem' }}>
              Loading...
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className={styles.showcaseMain}>
      <div className={styles.showcaseWrapper}>
        <div className={`${styles.contentContainer} ${showSplitView ? styles.noScroll : ''}`}>
          {/* Split View - Default View */}
          <AnimatePresence>
            {showSplitView && (
              <ShowStart 
                key={shuffleKey}
                data={showStartData}
                onClose={() => setShowSplitView(false)} // Button öffnet Grid
              />
            )}
          </AnimatePresence>

          {/* Grid View */}
          {!showSplitView && (
            <ShowGrid
              data={filteredData}
              categories={categories}
              activeCategory={activeCategory}
              setActiveCategory={setActiveCategory}
              sortOrder={sortOrder}
              setSortOrder={setSortOrder}
              showAllInfo={showAllInfo}
              setShowAllInfo={setShowAllInfo}
              onOpenSplitView={handleBackToSplit} // Button öffnet zurück zu Split Screen mit Shuffle
            />
          )}
        </div>
      </div>
    </main>
  );
};

export default Showcase;
