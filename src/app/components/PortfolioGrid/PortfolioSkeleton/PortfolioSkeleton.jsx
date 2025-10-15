'use client';

import React from 'react';
import styles from './PortfolioSkeleton.module.scss';

// Hero Skeleton Component
export const HeroSkeleton = () => (
  <section className={styles.heroSkeleton}>
    <div className={styles.container}>
      <div className={styles.sliderContainer}>
        <div className={styles.slideWrapper}>
          <div className={styles.skeletonSlide}>
            <div className={styles.skeletonImage}></div>
            <div className={styles.skeletonOverlay}>
              <div className={styles.skeletonContent}>
                <div className={styles.skeletonCategory}></div>
                <div className={styles.skeletonTitle}></div>
                <div className={styles.skeletonDescription}></div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Navigation Skeleton */}
        <div className={styles.skeletonNavButton}></div>
        <div className={`${styles.skeletonNavButton} ${styles.right}`}></div>
        
        {/* Dots Skeleton */}
        <div className={styles.skeletonDots}>
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className={styles.skeletonDot}></div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

// Filter Skeleton Component
export const FilterSkeleton = () => (
  <section className={styles.filterSkeleton}>
    <div className={styles.container}>
      {/* Mobile Toggle Skeleton */}
      <div className={styles.skeletonMobileToggle}>
        <div className={styles.skeletonMobileButton}></div>
      </div>

      {/* Filter Content Skeleton */}
      <div className={styles.skeletonContent}>
        <div className={styles.skeletonRow}>
          {/* Left Group Skeleton */}
          <div className={styles.skeletonLeftGroup}>
            {/* Categories Skeleton */}
            <div className={styles.skeletonGroup}>
              <div className={styles.skeletonLabel}></div>
              <div className={styles.skeletonCategoryGrid}>
                {Array.from({ length: 4 }).map((_, index) => (
                  <div key={index} className={styles.skeletonCategoryCard}>
                    <div className={styles.skeletonCategoryIcon}></div>
                    <div className={styles.skeletonCategoryName}></div>
                  </div>
                ))}
              </div>
            </div>

            {/* Layout Options Skeleton */}
            <div className={styles.skeletonGroup}>
              <div className={styles.skeletonLabel}></div>
              <div className={styles.skeletonLayoutOptions}>
                {Array.from({ length: 3 }).map((_, index) => (
                  <div key={index} className={styles.skeletonLayoutOption}></div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Group Skeleton */}
          <div className={styles.skeletonRightGroup}>
            {/* Tags Dropdown Skeleton */}
            <div className={styles.skeletonGroup}>
              <div className={styles.skeletonLabel}></div>
              <div className={styles.skeletonDropdown}></div>
            </div>

            {/* Sort Dropdown Skeleton */}
            <div className={styles.skeletonGroup}>
              <div className={styles.skeletonLabel}></div>
              <div className={styles.skeletonDropdown}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

// Grid Skeleton Component
export const GridSkeleton = ({ layoutMode = 1, itemsCount = 9 }) => {
  const getLayoutClass = () => {
    switch(layoutMode) {
      case 1:
        return styles.skeletonGrid;
      case 2:
        return `${styles.skeletonGrid} ${styles.cardsLayout}`;
      case 3:
        return `${styles.skeletonGrid} ${styles.listLayout}`;
      default:
        return styles.skeletonGrid;
    }
  };

  return (
    <div className={styles.gridSkeleton}>
      <div className={styles.container}>
        {/* Header Skeleton */}
        <div className={styles.skeletonHeader}>
          <div className={styles.skeletonSubtitle}></div>
          <div className={styles.skeletonTitle}></div>
        </div>

        {/* Grid Items Skeleton */}
        <div className={getLayoutClass()}>
          {Array.from({ length: itemsCount }).map((_, index) => (
            <div key={index} className={styles.skeletonItem}>
              <div className={styles.skeletonCard}>
                <div className={styles.skeletonFigure}>
                  <div className={styles.skeletonImage}></div>
                  <div className={styles.skeletonOverlay}>
                    <div className={styles.skeletonOverlayContent}>
                      <div className={styles.skeletonItemTitle}></div>
                      <div className={styles.skeletonItemCategory}></div>
                      <div className={styles.skeletonTags}>
                        {Array.from({ length: 3 }).map((_, tagIndex) => (
                          <div key={tagIndex} className={styles.skeletonTag}></div>
                        ))}
                      </div>
                    </div>
                    <div className={styles.skeletonLinkIcon}></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Pagination Skeleton Component
export const PaginationSkeleton = () => (
  <div className={styles.paginationSkeleton}>
    <div className={styles.section}>
      <div className={styles.container}>
        <div className={styles.skeletonPaginationContent}>
          {/* Items per page skeleton */}
          <div className={styles.skeletonItemsPerPage}>
            <div className={styles.skeletonSelect}></div>
          </div>

          {/* Page numbers skeleton */}
          <div className={styles.skeletonPageNumbers}>
            {Array.from({ length: 5 }).map((_, index) => (
              <div key={index} className={styles.skeletonPageNumber}></div>
            ))}
          </div>

          {/* Page info skeleton */}
          <div className={styles.skeletonPageInfo}></div>
        </div>
      </div>
    </div>
  </div>
);

// Main Portfolio Skeleton Component
const PortfolioSkeleton = ({ layoutMode = 1, showPagination = true }) => {
  return (
    <div className={styles.portfolioSkeleton}>
      <HeroSkeleton />
      <FilterSkeleton />
      <GridSkeleton layoutMode={layoutMode} />
      {showPagination && <PaginationSkeleton />}
    </div>
  );
};

export default PortfolioSkeleton;
