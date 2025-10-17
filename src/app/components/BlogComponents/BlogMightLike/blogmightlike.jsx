'use client';

import { useEffect, useState } from 'react';
import BlogCard from '../BlogCard/BlogCard';
import styles from './BlogMightLike.module.scss';
import { useAllBlogStats } from '../../../hooks/useBlogStats'; // bloggrid hook fetch

const BlogMightLike = ({
  relatedPosts = [],
}) => {
  const [maxPosts, setMaxPosts] = useState(3); // Default: Desktop = 3
  const { allStats, loading: statsLoading } = useAllBlogStats();

  // Memory leak fix - proper cleanup of resize listener
  useEffect(() => {
    const updateMaxPosts = () => {
      if (window.innerWidth < 768) {
        setMaxPosts(4); // Mobile: 4 Posts
      } else {
        setMaxPosts(3); // Desktop: 3 Posts
      }
    };

    updateMaxPosts(); // initial aufrufen
    
    // Use AbortController for better cleanup
    const controller = new AbortController();
    window.addEventListener('resize', updateMaxPosts, { 
      signal: controller.signal,
      passive: true // Better performance
    });
    
    return () => {
      controller.abort(); // Cleanup all listeners
    };
  }, []);

  if (!Array.isArray(relatedPosts) || relatedPosts.length === 0) {
    return null;
  }

  // Einfache Logik: Die Posts sind bereits gefiltert und gemischt (kategorie-basiert)
  // Nehme einfach maxPosts aus den übergebenen relatedPosts
  const shownPosts = relatedPosts.slice(0, maxPosts);

  return (
    <div className={styles.section}>
      {/* Background Elements */}
      <div className={styles.backgroundGrid}></div>

      {/* Hero Header */}
      <div className={styles.heroSection}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>
            Related Articles
          </h1>
        </div>
      </div>

      <div className={styles.container}>
        {/* Related Grid */}
        <div className={styles.grid}>
          {shownPosts.map((related, index) => {
            const currentStats = allStats[related.slug] || {
              views: 0,
              likes: 0,
            };

            // Erstelle ein Post-Objekt mit allen notwendigen Daten für BlogCard
            const postData = {
              ...related,
              views: currentStats.views,
              likes: currentStats.likes,
              statsLoading: statsLoading,
            };

            return (
              <BlogCard
                key={related.id}
                post={postData}
                index={index}
                variant="related"
                truncateTitle={false}
                truncateExcerpt={false}
                formatNumbers={true}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default BlogMightLike;
