'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';

export const useBlogStats = slug => {
  const [stats, setStats] = useState({ views: 0, likes: 0 });
  const [hasLiked, setHasLiked] = useState(false);

  // Lade Statistiken aus localStorage
  useEffect(() => {
    if (!slug || typeof window === 'undefined') return;

    const savedStats = localStorage.getItem(`blog_stats_${slug}`);
    if (savedStats) {
      try {
        const parsedStats = JSON.parse(savedStats);
        setStats(parsedStats);
      } catch (error) {
        console.error('Fehler beim Laden der Blog-Statistiken:', error);
      }
    }
  }, [slug]);

  // Funktion zum Erhöhen der Views
  const incrementViews = useCallback(() => {
    if (!slug || typeof window === 'undefined') return Promise.resolve();

    setStats(prev => {
      const newStats = { ...prev, views: (prev.views || 0) + 1 };
      localStorage.setItem(`blog_stats_${slug}`, JSON.stringify(newStats));
      return newStats;
    });
    
    return Promise.resolve();
  }, [slug]);

  // Funktion zum Erhöhen der Likes
  const incrementLikes = useCallback(() => {
    if (!slug || typeof window === 'undefined') return Promise.resolve();

    setStats(prev => {
      const newStats = { ...prev, likes: (prev.likes || 0) + 1 };
      localStorage.setItem(`blog_stats_${slug}`, JSON.stringify(newStats));
      return newStats;
    });
    setHasLiked(true);
    
    return Promise.resolve();
  }, [slug]);

  return {
    stats,
    hasLiked,
    incrementViews,
    incrementLikes,
  };
};

// Hook für das Laden aller Blog Stats (für BlogGrid)
export const useAllBlogStats = () => {
  const [allStats, setAllStats] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadAllStats();
  }, []);

  const loadAllStats = () => {
    try {
      if (typeof window === 'undefined') {
        setAllStats({});
        setLoading(false);
        return;
      }

      const statsMap = {};
      // Durchsuche localStorage nach blog_stats_ Einträgen
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith('blog_stats_')) {
          const slug = key.replace('blog_stats_', '');
          try {
            const stats = JSON.parse(localStorage.getItem(key) || '{}');
            statsMap[slug] = {
              views: stats.views || 0,
              likes: stats.likes || 0,
            };
          } catch (error) {
            console.warn(`Error parsing localStorage stats for ${slug}:`, error);
          }
        }
      }

      setAllStats(statsMap);
    } catch (error) {
      console.warn('Error loading all localStorage stats:', error);
      setAllStats({});
    }
    setLoading(false);
  };

  return {
    allStats,
    loading,
    refreshAllStats: loadAllStats
  };
};

// Hook für Blog-Post Suche mit Debouncing - Optimized
export const useBlogSearch = (posts, delay = 500) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  // Memoize posts to prevent unnecessary re-runs
  const memoizedPosts = useMemo(() => posts, [posts]);

  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults(memoizedPosts);
      setIsSearching(false);
      return;
    }

    setIsSearching(true);
    const timeoutId = setTimeout(() => {
      // Optimized search with early exit
      const query = searchQuery.toLowerCase();
      const results = memoizedPosts.filter(post => {
        // Check title first (most common)
        if (post.title?.toLowerCase().includes(query)) return true;
        
        // Check tags (second most common)
        if (post.tags?.some(tag => tag.toLowerCase().includes(query))) return true;
        
        // Check content last (most expensive)
        if (post.content?.toLowerCase().includes(query)) return true;
        
        return false;
      });
      setSearchResults(results);
      setIsSearching(false);
    }, delay);

    return () => clearTimeout(timeoutId);
  }, [searchQuery, memoizedPosts, delay]);

  return {
    searchQuery,
    setSearchQuery,
    searchResults,
    isSearching,
  };
};