'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';

export const useBlogStats = slug => {
  const [stats, setStats] = useState({ views: 0, likes: 0 });
  const [hasLiked, setHasLiked] = useState(false);

  // Lade Statistiken aus localStorage
  useEffect(() => {
    if (!slug) return;

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
    if (!slug) return Promise.resolve();

    setStats(prev => {
      const newStats = { ...prev, views: (prev.views || 0) + 1 };
      localStorage.setItem(`blog_stats_${slug}`, JSON.stringify(newStats));
      return newStats;
    });
    
    return Promise.resolve();
  }, [slug]);

  // Funktion zum Erhöhen der Likes
  const incrementLikes = useCallback(() => {
    if (!slug) return Promise.resolve();

    setStats(prev => {
      const newStats = { ...prev, likes: (prev.likes || 0) + 1 };
      localStorage.setItem(`blog_stats_${slug}`, JSON.stringify(newStats));
      return newStats;
    });
    setHasLiked(true);
    
    return Promise.resolve();
  }, [slug]);

  // Alias-Funktionen für Kompatibilität
  const incrementViewsRPC = incrementViews;
  const incrementLikesRPC = incrementLikes;
  const incrementViewsSimple = incrementViews;

  return {
    stats,
    hasLiked,
    incrementViews,
    incrementLikes,
    incrementViewsRPC,
    incrementLikesRPC,
    incrementViewsSimple
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

// Hook für Blog-Analytics
export const useBlogAnalytics = (posts) => {
  const [analytics, setAnalytics] = useState({
    totalPosts: 0,
    totalViews: 0,
    totalLikes: 0,
    averageReadTime: 0,
    engagementRate: 0,
    topPosts: [],
    tagDistribution: {},
    monthlyStats: {},
  });

  useEffect(() => {
    if (!posts || posts.length === 0) return;

    const calculateAnalytics = () => {
      const totalPosts = posts.length;
      const totalViews = posts.reduce((sum, post) => sum + (post.views || 0), 0);
      const totalLikes = posts.reduce((sum, post) => sum + (post.likes || 0), 0);
      const averageReadTime = posts.reduce((sum, post) => {
        const time = parseInt(post.readTime) || 3;
        return sum + time;
      }, 0) / totalPosts;

      const topPosts = [...posts]
        .sort((a, b) => (b.views || 0) - (a.views || 0))
        .slice(0, 5);

      const tagDistribution = posts.reduce((acc, post) => {
        if (post.tags) {
          post.tags.forEach(tag => {
            acc[tag] = (acc[tag] || 0) + 1;
          });
        }
        return acc;
      }, {});

      setAnalytics({
        totalPosts,
        totalViews,
        totalLikes,
        averageReadTime: Math.round(averageReadTime),
        engagementRate: totalPosts > 0 ? (totalLikes / totalPosts).toFixed(2) : 0,
        topPosts,
        tagDistribution,
        monthlyStats: {},
      });
    };

    calculateAnalytics();
  }, [posts]);

  return analytics;
};

// Hook für Blog-Cache
export const useBlogCache = () => {
  const [cache, setCache] = useState(new Map());
  const [cacheStats, setCacheStats] = useState({
    hits: 0,
    misses: 0,
    size: 0,
  });

  const getFromCache = useCallback((key) => {
    if (cache.has(key)) {
      setCacheStats(prev => ({ ...prev, hits: prev.hits + 1 }));
      return cache.get(key);
    }
    setCacheStats(prev => ({ ...prev, misses: prev.misses + 1 }));
    return null;
  }, [cache]);

  const setInCache = useCallback((key, value) => {
    const newCache = new Map(cache);
    newCache.set(key, value);

    if (newCache.size > 100) {
      const firstKey = newCache.keys().next().value;
      newCache.delete(firstKey);
    }

    setCache(newCache);
    setCacheStats(prev => ({ ...prev, size: newCache.size }));
  }, [cache]);

  const clearCache = useCallback(() => {
    setCache(new Map());
    setCacheStats({ hits: 0, misses: 0, size: 0 });
  }, []);

  return {
    getFromCache,
    setInCache,
    clearCache,
    cacheStats,
    cacheSize: cache.size,
  };
};