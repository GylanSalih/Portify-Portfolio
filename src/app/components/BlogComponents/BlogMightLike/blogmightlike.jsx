'use client';

import { useEffect, useState } from 'react';
import BlogCard from '../BlogCard/BlogCard';
import '../BlogCard/BlogCard.css';
import '../BlogGrid/bloggrid.css';
import { useAllBlogStats } from '../../../hooks/useBlogStats'; // bloggrid hook fetch
import { calculateReadTime, processExcerpt } from '../../../lib/utils';

const BlogMightLike = ({
  relatedPosts = [],
  currentPostTags = [],
  currentPostSlug = null,
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

  // Verbesserte Tag-Filterung mit Fallback für mindestens maxPosts Anzahl
  const getFilteredAndSortedPosts = () => {
    // Filtere den aktuellen Post aus den Related Posts raus
    const filteredRelatedPosts = currentPostSlug
      ? relatedPosts.filter(post => post.slug !== currentPostSlug)
      : relatedPosts;

    // Wenn currentPostTags leer ist oder nicht existiert, zeige alle Posts
    if (!Array.isArray(currentPostTags) || currentPostTags.length === 0) {
      console.log('No current post tags, showing all posts');
      return filteredRelatedPosts;
    }

    // Normalisiere currentPostTags (lowercase, trim)
    const normalizedCurrentTags = currentPostTags.map(tag =>
      tag.toLowerCase().trim()
    );

    console.log('Current post tags (normalized):', normalizedCurrentTags);

    // Berechne Relevanz-Score für jeden Post
    const postsWithScore = filteredRelatedPosts.map(post => {
      let score = 0;
      const matchingTags = [];

      if (post.tags && Array.isArray(post.tags)) {
        const normalizedPostTags = post.tags.map(tag =>
          tag.toLowerCase().trim()
        );

        normalizedCurrentTags.forEach(currentTag => {
          if (normalizedPostTags.includes(currentTag)) {
            score += 1;
            matchingTags.push(currentTag);
          }
        });
      }

      console.log(
        `Post "${post.title}" - Score: ${score}, Matching tags:`,
        matchingTags
      );

      return {
        ...post,
        relevanceScore: score,
        matchingTags: matchingTags,
      };
    });

    // Sortiere nach Relevanz-Score (höchster zuerst)
    const sortedPosts = postsWithScore.sort(
      (a, b) => b.relevanceScore - a.relevanceScore
    );

    // Zeige Posts mit matching tags zuerst, dann andere
    const postsWithMatchingTags = sortedPosts.filter(
      post => post.relevanceScore > 0
    );
    const postsWithoutMatchingTags = sortedPosts.filter(
      post => post.relevanceScore === 0
    );

    console.log(
      `Found ${postsWithMatchingTags.length} posts with matching tags`
    );
    console.log(
      `Found ${postsWithoutMatchingTags.length} posts without matching tags`
    );

    // WICHTIGER FIX: Immer eine kombinierte Liste zurückgeben
    // Posts mit matching tags zuerst, dann andere als Auffüllung
    const combinedPosts = [
      ...postsWithMatchingTags,
      ...postsWithoutMatchingTags,
    ];

    console.log(
      `Total combined posts: ${combinedPosts.length}, will show: ${Math.min(maxPosts, combinedPosts.length)}`
    );

    return combinedPosts;
  };

  const filteredPosts = getFilteredAndSortedPosts();

  if (filteredPosts.length === 0) {
    return null;
  }

  // Stelle sicher, dass wir immer maxPosts anzeigen (oder alle verfügbaren, falls weniger)
  const shownPosts = filteredPosts.slice(0, maxPosts);

  return (
    <div className="blog-wrapper">
      {/* Background Elements - genau wie BlogGrid */}
      <div className="blog-background-grid"></div>
      <div className="blog-floating-orb blog-orb-1"></div>
      <div className="blog-floating-orb blog-orb-2"></div>
      <div className="blog-floating-orb blog-orb-3"></div>

      {/* Hero Header - genau wie BlogGrid */}
      <div className="blog-hero-section">
        <div className="blog-hero-content">
          <span>Related Articles</span>

          <h1 className="blog-hero-title">
            <span className="blog-title-line">You might</span>
            <span className="blog-title-line gradient">also like</span>
          </h1>

          <p className="blog-hero-description">
            Discover more articles that might interest you based on your current
            reading.
          </p>
        </div>
      </div>

      <div className="blog-container">
        {/* Blog Grid - genau wie BlogGrid */}
        <div className="blog-grid">
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
                variant="default"
                showRelevanceScore={false}
                truncateTitle={true}
                truncateExcerpt={true}
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
