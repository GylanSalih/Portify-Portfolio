'use client';

import { useState, useEffect, useCallback } from 'react';

export const usePortfolioStats = slug => {
  const [stats, setStats] = useState({ views: 0, likes: 0 });
  const [loading, setLoading] = useState(false);
  const [hasLiked, setHasLiked] = useState(false);

  // Lade Statistiken aus localStorage
  useEffect(() => {
    if (!slug) return;

    const savedStats = localStorage.getItem(`portfolio_stats_${slug}`);
    if (savedStats) {
      try {
        const parsedStats = JSON.parse(savedStats);
        setStats(parsedStats);
      } catch (error) {
        console.error('Fehler beim Laden der Portfolio-Statistiken:', error);
      }
    }
  }, [slug]);

  // Funktion zum Erhöhen der Views
  const incrementViews = useCallback(() => {
    if (!slug) return Promise.resolve();

    setStats(prev => {
      const newStats = { ...prev, views: (prev.views || 0) + 1 };
      localStorage.setItem(`portfolio_stats_${slug}`, JSON.stringify(newStats));
      return newStats;
    });
    
    return Promise.resolve();
  }, [slug]);

  // Funktion zum Erhöhen der Likes
  const incrementLikes = useCallback(() => {
    if (!slug) return Promise.resolve();

    setStats(prev => {
      const newStats = { ...prev, likes: (prev.likes || 0) + 1 };
      localStorage.setItem(`portfolio_stats_${slug}`, JSON.stringify(newStats));
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
    loading,
    hasLiked,
    incrementViews,
    incrementLikes,
    incrementViewsRPC,
    incrementLikesRPC,
    incrementViewsSimple
  };
};

// Hook für das Laden aller Portfolio Stats
export const useAllPortfolioStats = () => {
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
      // Durchsuche localStorage nach portfolio_stats_ Einträgen
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith('portfolio_stats_')) {
          const slug = key.replace('portfolio_stats_', '');
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