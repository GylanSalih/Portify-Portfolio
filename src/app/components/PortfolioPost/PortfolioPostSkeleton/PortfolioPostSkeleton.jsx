'use client';

import React from 'react';
import styles from './PortfolioPostSkeleton.module.scss';

// Hero Skeleton Component
const HeroSkeleton = () => (
  <div className={styles.heroSkeleton}>
    <div className={styles.imageContainer}>
      <div className={styles.skeletonImage}></div>
      
      {/* Top Left Meta */}
      <div className={styles.topLeft}>
        <div className={styles.skeletonMetaItem}></div>
        <div className={styles.skeletonMetaItem}></div>
      </div>

      {/* Top Right Category */}
      <div className={styles.topRight}>
        <div className={styles.skeletonCategory}></div>
      </div>

      {/* Bottom Left Tags */}
      <div className={styles.bottomLeft}>
        <div className={styles.skeletonTags}>
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className={styles.skeletonTag}></div>
          ))}
        </div>
      </div>

      {/* Bottom Right Buttons */}
      <div className={styles.bottomRight}>
        <div className={styles.skeletonButtons}>
          <div className={styles.skeletonButton}></div>
          <div className={styles.skeletonButton}></div>
        </div>
      </div>

      {/* Center Content */}
      <div className={styles.centerContent}>
        <div className={styles.skeletonTitle}></div>
        <div className={styles.skeletonSubtitle}></div>
      </div>
    </div>
  </div>
);

// Project Info Skeleton Component
const ProjectInfoSkeleton = () => (
  <div className={styles.infoSkeleton}>
    <div className={styles.grid}>
      {Array.from({ length: 4 }).map((_, index) => (
        <div key={index} className={styles.skeletonCard}>
          <div className={styles.skeletonCardTitle}></div>
          <div className={styles.skeletonCardText}></div>
        </div>
      ))}
    </div>
  </div>
);

// Content Section Skeleton Component
const ContentSkeleton = () => (
  <div className={styles.contentSkeleton}>
    {Array.from({ length: 3 }).map((_, sectionIndex) => (
      <div key={sectionIndex} className={styles.skeletonSection}>
        <div className={styles.skeletonSectionTitle}></div>
        <div className={styles.skeletonParagraph}></div>
        <div className={styles.skeletonParagraph}></div>
        <div className={`${styles.skeletonParagraph} ${styles.short}`}></div>
      </div>
    ))}
  </div>
);

// Gallery Skeleton Component
const GallerySkeleton = () => (
  <div className={styles.gallerySkeleton}>
    <div className={styles.skeletonSectionHeader}>
      <div className={styles.skeletonSectionTitle}></div>
    </div>
    <div className={styles.galleryGrid}>
      {Array.from({ length: 6 }).map((_, index) => (
        <div key={index} className={styles.skeletonGalleryItem}></div>
      ))}
    </div>
  </div>
);

// Tech Stack Skeleton Component
const TechStackSkeleton = () => (
  <div className={styles.techStackSkeleton}>
    <div className={styles.skeletonSectionHeader}>
      <div className={styles.skeletonSectionTitle}></div>
    </div>
    <div className={styles.techGrid}>
      {Array.from({ length: 6 }).map((_, index) => (
        <div key={index} className={styles.skeletonTechItem}>
          <div className={styles.skeletonTechIcon}></div>
          <div className={styles.skeletonTechName}></div>
        </div>
      ))}
    </div>
  </div>
);

// Features Skeleton Component
const FeaturesSkeleton = () => (
  <div className={styles.featuresSkeleton}>
    <div className={styles.skeletonSectionHeader}>
      <div className={styles.skeletonSectionTitle}></div>
    </div>
    <div className={styles.featuresList}>
      {Array.from({ length: 4 }).map((_, index) => (
        <div key={index} className={styles.skeletonFeatureItem}>
          <div className={styles.skeletonFeatureIcon}></div>
          <div className={styles.skeletonFeatureText}></div>
        </div>
      ))}
    </div>
  </div>
);

// Related Projects Skeleton Component
const RelatedProjectsSkeleton = () => (
  <div className={styles.relatedSkeleton}>
    <div className={styles.skeletonSectionHeader}>
      <div className={styles.skeletonSectionTitle}></div>
    </div>
    <div className={styles.relatedGrid}>
      {Array.from({ length: 3 }).map((_, index) => (
        <div key={index} className={styles.skeletonRelatedCard}>
          <div className={styles.skeletonRelatedImage}></div>
          <div className={styles.skeletonRelatedContent}>
            <div className={styles.skeletonRelatedTitle}></div>
            <div className={styles.skeletonRelatedCategory}></div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

// Main Portfolio Post Skeleton Component
const PortfolioPostSkeleton = () => {
  return (
    <div className={styles.postSkeleton}>
      <div className={styles.wrapper}>
        {/* Hero Section */}
        <HeroSkeleton />

        {/* Main Content */}
        <main className={styles.main}>
          {/* Project Info Cards */}
          <ProjectInfoSkeleton />

          {/* Content Sections */}
          <ContentSkeleton />

          {/* Image Gallery */}
          <GallerySkeleton />

          {/* Tech Stack */}
          <TechStackSkeleton />

          {/* Features */}
          <FeaturesSkeleton />
        </main>

        {/* Related Projects */}
        <RelatedProjectsSkeleton />
      </div>
    </div>
  );
};

export default PortfolioPostSkeleton;

