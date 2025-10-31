'use client';
// Portfolio Page - Modern Portfolio Grid

import { useState, useEffect, useCallback, useMemo } from 'react';
import PortfolioHero from '../components/PortfolioGrid/PortfolioHero/PortfolioHero';
import ModernGrid from '../components/PortfolioGrid/ModernGrid/ModernGrid';
import Filter from '../components/PortfolioGrid/Filter/Filter';
import Pagination from '../components/PortfolioGrid/Pagination/Pagination';
import PortfolioSkeleton from '../components/PortfolioGrid/PortfolioSkeleton/PortfolioSkeleton';
import styles from './portfolio.module.scss';

export default function PortfolioPage() {
  const [layoutMode, setLayoutMode] = useState(1);
  const [category, setCategory] = useState('all');
  const [selectedTags, setSelectedTags] = useState([]);
  const [mounted, setMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showAllInfo, setShowAllInfo] = useState(false);
  const [isShuffled, setIsShuffled] = useState(false);
  const [shuffledItems, setShuffledItems] = useState([]);
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(9);
  const [totalItems, setTotalItems] = useState(0);
  const [allItems, setAllItems] = useState([]);

  // Load portfolio data
  useEffect(() => {
    const loadPortfolio = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('/data/PortfolioData.json');
        const data = await response.json();
        setAllItems(data);
      } catch (error) {
        console.error('Error loading portfolio data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    loadPortfolio();
  }, []);

  // Fix CSS loading issue on first render
  useEffect(() => {
    setMounted(true);
  }, []);

  // Calculate filtered items with useMemo
  const filteredItems = useMemo(() => {
    const filtered = allItems.filter(item => {
      const matchesCategory = category === 'all' || item.category === category;
      const matchesTags = selectedTags.length === 0 || 
        selectedTags.some(tag => item.tags.includes(tag));
      return matchesCategory && matchesTags;
    });
    
    // Return shuffled items if shuffle is active, otherwise return filtered items
    if (isShuffled && shuffledItems.length > 0) {
      // Filter shuffled items to match current filters
      return shuffledItems.filter(item => {
        const matchesCategory = category === 'all' || item.category === category;
        const matchesTags = selectedTags.length === 0 || 
          selectedTags.some(tag => item.tags.includes(tag));
        return matchesCategory && matchesTags;
      });
    }
    
    return filtered;
  }, [allItems, category, selectedTags, isShuffled, shuffledItems]);

  // Update total items when filtered items change
  useEffect(() => {
    setTotalItems(filteredItems.length);
  }, [filteredItems.length]);

  // Reset currentPage when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [category, selectedTags]);

  // Handlers with useCallback
  const handleLayoutChange = useCallback((layout) => {
    setLayoutMode(layout);
  }, []);

  const handleCategoryChange = useCallback((cat) => {
    setCategory(cat);
  }, []);

  const handleTagsChange = useCallback((tags) => {
    setSelectedTags(tags);
  }, []);

  const handlePageChange = useCallback((page) => {
    setCurrentPage(page);
    // Scroll to top when changing pages
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleItemsPerPageChange = useCallback((newItemsPerPage) => {
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1);
  }, []);

  const handleShowAllInfoChange = useCallback((show) => {
    setShowAllInfo(show);
  }, []);

  const handleShuffleChange = useCallback((shuffle) => {
    setIsShuffled(shuffle);
    if (shuffle) {
      // Shuffle the current filtered items
      const filtered = allItems.filter(item => {
        const matchesCategory = category === 'all' || item.category === category;
        const matchesTags = selectedTags.length === 0 || 
          selectedTags.some(tag => item.tags.includes(tag));
        return matchesCategory && matchesTags;
      });
      const shuffled = [...filtered].sort(() => Math.random() - 0.5);
      setShuffledItems(shuffled);
    }
  }, [allItems, category, selectedTags]);

  const totalPages = Math.ceil(totalItems / itemsPerPage);


  if (!mounted) {
    return null;
  }

  // Show skeleton while loading
  if (isLoading) {
    return (
      <div className={styles.page}>
        <PortfolioSkeleton layoutMode={layoutMode} showPagination={true} />
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <PortfolioHero />
      <Filter 
        key="portfolio-filter"
        onCategoryChange={handleCategoryChange}
        onTagsChange={handleTagsChange}
        onLayoutChange={handleLayoutChange}
        onShowAllInfoChange={handleShowAllInfoChange}
        onShuffleChange={handleShuffleChange}
        showAllInfo={showAllInfo}
        hasContent={true}
        isLoading={false}
        showLoadMore={false}
      />
      <ModernGrid 
        key="portfolio-grid"
        layoutMode={layoutMode} 
        category={category}
        selectedTags={selectedTags}
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        filteredItems={filteredItems}
        showAllInfo={showAllInfo}
      />
      <Pagination
        key="portfolio-pagination"
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
        itemsPerPage={itemsPerPage}
        totalItems={totalItems}
        onItemsPerPageChange={handleItemsPerPageChange}
        showItemsPerPage={true}
        showPageInfo={true}
      />
    </div>
  );
}
