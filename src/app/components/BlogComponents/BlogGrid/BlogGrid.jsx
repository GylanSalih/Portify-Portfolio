'use client';
import { useEffect, useState, useRef, useMemo, useCallback } from 'react';
import { ChevronDown } from 'lucide-react';
import { useAllBlogStats, useBlogSearch } from '../../../hooks/useBlogStats';
import {
  formatNumber,
  processMultipleBlogPosts,
  filterPostsByTags,
  sortBlogPosts,
  extractUniqueTags,
  fetchMDXPosts,
} from '../../../lib/blogUtils';
import BlogCard from '../BlogCard/BlogCard';
import Pagination from '../../PortfolioGrid/Pagination/Pagination';
import styles from './BlogGrid.module.scss';

const BlogGrid = () => {
  const [blogPosts, setBlogPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTag, setSelectedTag] = useState('');
  const [sortOrder, setSortOrder] = useState('latest');
  const [uniqueTags, setUniqueTags] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false);
  const [itemsPerPage, setItemsPerPage] = useState(6);

  const sectionRef = useRef(null);
  const filterRef = useRef(null);

  // Supabase Stats Hook
  const { allStats, loading: statsLoading } = useAllBlogStats();

  // Neuer Search Hook
  const { searchQuery, setSearchQuery, searchResults, isSearching } =
    useBlogSearch(blogPosts);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        // Lade MDX-Posts über die neue API
        const mdxPosts = await fetchMDXPosts();

        // Extrahiere Tags
        const tags = extractUniqueTags(mdxPosts);
        setUniqueTags(tags);

        // Sortiere die Posts
        const sortedPosts = sortBlogPosts(mdxPosts, sortOrder);
        setBlogPosts(sortedPosts);
      } catch (error) {
        console.error('Error loading MDX posts:', error);
        // Fallback zu JSON falls MDX fehlschlägt
        try {
          const response = await fetch('/data/BlogData.json');
          const data = await response.json();

          const gridPosts = data.map(post => ({
            ...post.gridData,
            slug: post.slug,
            title: post.title,
            tags: post.tags,
            category: post.category
          }));

          const postsWithProcessedContent = await processMultipleBlogPosts(gridPosts);
          const tags = extractUniqueTags(postsWithProcessedContent);
          setUniqueTags(tags);

          const sortedPosts = sortBlogPosts(postsWithProcessedContent, sortOrder);
          setBlogPosts(sortedPosts);
        } catch (fallbackError) {
          console.error('Error loading fallback posts:', fallbackError);
        }
      } finally {
        setIsLoading(false);
      }
    };

    loadPosts();
  }, [sortOrder]);

  // Memoize filtered posts for better performance
  const filteredPosts = useMemo(() => {
    return searchResults.filter(
      post => filterPostsByTags([post], selectedTag).length > 0
    );
  }, [searchResults, selectedTag]);

  // Memoize pagination logic
  const paginationData = useMemo(() => {
    const totalPosts = filteredPosts.length;
    const totalPages = Math.ceil(totalPosts / itemsPerPage);
    const indexOfLastPost = currentPage * itemsPerPage;
    const indexOfFirstPost = indexOfLastPost - itemsPerPage;
    const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

    return {
      totalPosts,
      totalPages,
      currentPosts,
    };
  }, [filteredPosts, currentPage, itemsPerPage]);

  // Reset currentPage when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedTag, searchQuery]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      const dropdownElement = event.target.closest('[data-dropdown="sort"]');
      if (!dropdownElement) {
        setIsSortDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Sort options
  const sortOptions = [
    { value: 'latest', label: 'Newest First' },
    { value: 'oldest', label: 'Oldest First' },
  ];

  const getSelectedSort = () => {
    return sortOptions.find(s => s.value === sortOrder) || sortOptions[0];
  };

  const handleSortSelect = (sort) => {
    setSortOrder(sort.value);
    setIsSortDropdownOpen(false);
  };

  // Pagination handlers with useCallback for performance
  const handlePageChange = useCallback((pageNumber) => {
    setCurrentPage(pageNumber);
    // Scroll to top of blog grid
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleItemsPerPageChange = useCallback((newItemsPerPage) => {
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1);
  }, []);

  // Memoize blog statistics for better performance
  const realBlogStats = useMemo(() => {
    return {
      totalPosts: blogPosts.length,
      totalViews: Object.values(allStats).reduce(
        (sum, stats) => sum + (stats.views || 0),
        0
      ),
      totalLikes: Object.values(allStats).reduce(
        (sum, stats) => sum + (stats.likes || 0),
        0
      ),
      engagementRate:
        blogPosts.length > 0
          ? (
              Object.values(allStats).reduce(
                (sum, stats) => sum + (stats.likes || 0),
                0
              ) / blogPosts.length
            ).toFixed(1)
          : '0.0',
    };
  }, [blogPosts.length, allStats]);

  return (
    <div
      ref={sectionRef}
      className={`${styles.wrapper} ${isVisible ? styles.visible : ''}`}
    >
      {/* Background Elements - Reduced for performance */}
      <div className={styles.backgroundGrid}></div>

      {/* Hero Header */}
      <div className={styles.heroSection}>
        <div className={styles.heroContent}>
          <span>Latest Articles</span>

          <h1 className={styles.heroTitle}>
            <span className={styles.titleLine}>Knowledge</span>
            <span className={`${styles.titleLine} ${styles.gradient}`}>Sharing Hub</span>
          </h1>

          <p className={styles.heroDescription}>
            Discover insights, tutorials, and thoughts on modern development,
            design patterns, and cutting-edge technologies.
          </p>
        </div>
      </div>

      <div className={styles.container}>
        {/* Enhanced Filter Section */}
        <div
          ref={filterRef}
          className={styles.filtersCard}
        >
          {/* Removed glow div for better performance */}

          <div className={styles.filtersHeader}>
            <h3 className={styles.filtersTitle}>Find Your Content</h3>
            <p className={styles.filtersSubtitle}>
              Filter and search through our articles
            </p>
          </div>

          <div className={styles.filtersTopRow}>
            <div className={styles.inputGroup}>
              <input
                type="text"
                placeholder="Search articles, topics, or keywords..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className={styles.searchInput}
              />
              {isSearching && (
                <div className={styles.searchLoading}>
                  <div className={styles.loadingSpinner}></div>
                </div>
              )}
            </div>
            <div className={styles.selectGroup}>
              <div className={styles.sortDropdown} data-dropdown="sort">
                <button
                  type="button"
                  className={`${styles.sortTrigger} ${isSortDropdownOpen ? styles.open : ''}`}
                  onClick={() => setIsSortDropdownOpen(!isSortDropdownOpen)}
                >
                  <span className={styles.sortSelected}>
                    {getSelectedSort().label}
                  </span>
                  <ChevronDown
                    size={14}
                    className={`${styles.chevron} ${isSortDropdownOpen ? styles.rotated : ''}`}
                  />
                </button>

                {isSortDropdownOpen && (
                  <div className={styles.sortDropdownMenu}>
                    {sortOptions.map(sort => (
                      <button
                        key={sort.value}
                        type="button"
                        className={`${styles.sortOption} ${sortOrder === sort.value ? styles.selected : ''}`}
                        onClick={() => handleSortSelect(sort)}
                      >
                        {sort.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className={styles.tagSection}>
            <div className={styles.tagHeader}>
              <span className={styles.tagLabel}>Filter by topic:</span>
              {selectedTag && (
                <button
                  onClick={() => setSelectedTag('')}
                  className={styles.clearFilter}
                >
                  Clear Filter ✕
                </button>
              )}
            </div>

            <div className={styles.tagFilter}>
              {uniqueTags.map(tag => (
                <button
                  key={tag}
                  onClick={() => setSelectedTag(tag)}
                  className={`${styles.tagButton} ${selectedTag.toLowerCase() === tag.toLowerCase() ? styles.active : ''}`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Blog Statistics */}
        {!isLoading && (
          <div className={styles.statsOverview}>
            <div className={styles.statItem}>
              <span className={styles.statLabel}>Total Posts</span>
              <span className={styles.statValue}>
                {realBlogStats.totalPosts}
              </span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statLabel}>Total Views</span>
              <span className={styles.statValue}>
                {formatNumber(realBlogStats.totalViews)}
              </span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statLabel}>Total Likes</span>
              <span className={styles.statValue}>
                {formatNumber(realBlogStats.totalLikes)}
              </span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statLabel}>Coming Soon</span>
              <span className={styles.statValue}>✨</span>
            </div>
          </div>
        )}

        {/* Blog Grid */}
        <div className={styles.grid}>
          {isLoading
            ? Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className={styles.skeletonCard}>
                  <div className={styles.skeletonImage}></div>
                  <div className={styles.skeletonContent}>
                    <div className={styles.skeletonTitle}></div>
                    <div className={styles.skeletonText}></div>
                    <div className={`${styles.skeletonText} ${styles.short}`}></div>
                    <div className={styles.skeletonFooter}></div>
                  </div>
                </div>
              ))
            : paginationData.currentPosts.map((post, index) => {
                // Hole die aktuellen Stats aus Supabase oder fallback zu JSON
                const currentStats = allStats[post.slug] || {
                  views: 0,
                  likes: 0,
                };

                // Erstelle ein Post-Objekt mit allen notwendigen Daten für BlogCard
                const postData = {
                  ...post,
                  views: currentStats.views,
                  likes: currentStats.likes,
                  statsLoading: statsLoading,
                };

                return (
                  <BlogCard
                    key={post.id}
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

        {/* Portfolio-Style Pagination */}
        {!isLoading && paginationData.totalPages > 0 && (
          <Pagination
            currentPage={currentPage}
            totalPages={paginationData.totalPages}
            onPageChange={handlePageChange}
            itemsPerPage={itemsPerPage}
            totalItems={paginationData.totalPosts}
            onItemsPerPageChange={handleItemsPerPageChange}
            showItemsPerPage={true}
            showPageInfo={true}
            itemType="articles"
          />
        )}

        {/* No Results State */}
        {!isLoading && paginationData.totalPosts === 0 && (
          <div className={styles.noResults}>
            <div className={styles.noResultsIcon}>📝</div>
            <h3 className={styles.noResultsTitle}>No articles found</h3>
            <p className={styles.noResultsText}>
              Try adjusting your search terms or removing filters to see more
              results.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedTag('');
              }}
              className={styles.resetFilters}
            >
              Reset All Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogGrid;
