'use client';
import React, { useState, useEffect } from 'react';
import {
  Grid3X3,
  Grid2X2,
  LayoutGrid,
  ChevronDown,
  Filter as FilterIcon,
  Sparkles,
  Code,
  TrendingUp,
} from 'lucide-react';
import styles from './Filter.module.scss';

const Filter = ({
  onCategoryChange,
  onTagsChange,
  onLayoutChange,
  hasContent = true,
  isLoading = false,
  onLoadMore,
  showLoadMore = false,
}) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedTags, setSelectedTags] = useState([]);
  const [activeLayout, setActiveLayout] = useState(1);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [sortBy, setSortBy] = useState('newest');
  const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false);
  const [isTagsDropdownOpen, setIsTagsDropdownOpen] = useState(false);

  useEffect(() => {
    onCategoryChange(selectedCategory);
  }, [selectedCategory, onCategoryChange]);

  useEffect(() => {
    onLayoutChange(activeLayout);
  }, [activeLayout, onLayoutChange]);

  useEffect(() => {
    if (onTagsChange) {
      onTagsChange(selectedTags);
    }
  }, [selectedTags, onTagsChange]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.sort-dropdown') && 
          !event.target.closest('.tags-dropdown')) {
        setIsSortDropdownOpen(false);
        setIsTagsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const categories = [
    {
      value: 'all',
      label: 'All Projects',
      icon: LayoutGrid,
    },
    {
      value: 'Design',
      label: 'Design',
      icon: Sparkles,
    },
    {
      value: 'Coding',
      label: 'Development',
      icon: Code,
    },
    {
      value: 'Marketing',
      label: 'Marketing',
      icon: TrendingUp,
    },
  ];

  // Available tags
  const availableTags = [
    'React', 'Node.js', 'MongoDB', 'Figma', 'UI/UX', 'Branding',
    'Social Media', 'Content', 'Analytics', 'Next.js', 'CSS3',
    'Animation', 'Mobile', 'Prototyping', 'SEO', 'Strategy',
    'GSAP', 'Three.js', 'Dashboard', 'Data Viz', 'TypeScript', 'API',
    'Email', 'Automation', 'Campaign'
  ];

  const toggleTag = (tag) => {
    setSelectedTags(prev => {
      if (prev.includes(tag)) {
        return prev.filter(t => t !== tag);
      } else {
        return [...prev, tag];
      }
    });
  };

  const layoutOptions = [
    { id: 1, icon: LayoutGrid, label: 'Grid' },
    { id: 2, icon: Grid2X2, label: 'Cards' },
    { id: 3, icon: Grid3X3, label: 'List' },
  ];

  const sortOptions = [
    { value: 'newest', label: 'Newest First' },
    { value: 'oldest', label: 'Oldest First' },
    { value: 'name-asc', label: 'Name A-Z' },
    { value: 'name-desc', label: 'Name Z-A' },
    { value: 'popular', label: 'Most Popular' },
  ];

  const getSelectedSort = () => {
    return sortOptions.find(s => s.value === sortBy) || sortOptions[0];
  };

  const handleSortSelect = (sort) => {
    setSortBy(sort.value);
    setIsSortDropdownOpen(false);
  };


  const NoContentSection = () => (
    <div className={styles.noContentSection}>
      <div className={styles.noContentContainer}>
        <div className={styles.noContentIcon}>
          <TrendingUp size={48} />
        </div>
        <h3 className={styles.noContentTitle}>No {selectedCategory} Projects Yet</h3>
        <p className={styles.noContentDescription}>
          We&apos;re currently working on some amazing{' '}
          {selectedCategory.toLowerCase()} projects. Check back soon to see our
          latest work!
        </p>
        <button
          className={styles.noContentButton}
          onClick={() => setSelectedCategory('all')}
        >
          View All Projects
        </button>
      </div>
    </div>
  );

  const LoadMoreSection = () =>
    showLoadMore && (
      <div className={styles.loadMoreSection}>
        <button
          className={styles.loadMoreButton}
          onClick={onLoadMore}
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <div className={styles.loadingSpinner}></div>
              Loading...
            </>
          ) : (
            <>
              <LayoutGrid size={18} />
              Load More Projects
            </>
          )}
        </button>
      </div>
    );

  return (
    <>
      <section className={styles.section}>
        <div className={styles.container}>
          {/* Mobile Filter Toggle */}
          <div className={styles.mobileToggle}>
            <button
              className={styles.mobileButton}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <FilterIcon size={20} />
              <span>Filters</span>
              <ChevronDown
                size={16}
                className={`${styles.mobileChevron} ${isMobileMenuOpen ? styles.rotated : ''}`}
              />
            </button>
          </div>

          {/* Desktop Filter */}
          <div
            className={`${styles.content} ${isMobileMenuOpen ? styles.mobileOpen : ''}`}
          >
            {/* All Filters in One Row */}
            <div className={styles.row}>
              {/* Left Group: Categories + Layout */}
              <div className={styles.leftGroup}>
                {/* Categories */}
                <div className={styles.group}>
                  <label className={styles.label}>Categories</label>
                  <div className={styles.categoryGrid}>
                    {categories.map(category => {
                      const IconComponent = category.icon;
                      return (
                        <button
                          key={category.value}
                          type="button"
                          className={`${styles.categoryCard} ${selectedCategory === category.value ? styles.active : ''}`}
                          onClick={() => setSelectedCategory(category.value)}
                        >
                          <div className={styles.categoryIcon}>
                            <IconComponent size={18} />
                          </div>
                          <div className={styles.categoryContent}>
                            <span className={styles.categoryName}>
                              {category.label}
                            </span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Layout Options */}
                <div className={styles.group}>
                  <label className={styles.label}>Layout</label>
                  <div className={styles.layoutOptions}>
                    {layoutOptions.map(layout => {
                      const IconComponent = layout.icon;
                      return (
                        <button
                          key={layout.id}
                          type="button"
                          className={`${styles.layoutOption} ${activeLayout === layout.id ? styles.active : ''}`}
                          onClick={() => setActiveLayout(layout.id)}
                        >
                          <IconComponent size={18} />
                          <span>{layout.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Right Group: Tags + Sort */}
              <div className={styles.rightGroup}>
                {/* Tags Dropdown */}
                <div className={styles.group}>
                  <label className={styles.label}>Filter by Tags:</label>
                  <div className={styles.tagsDropdown}>
                    <button
                      type="button"
                      className={`${styles.tagsTrigger} ${isTagsDropdownOpen ? styles.open : ''}`}
                      onClick={() => setIsTagsDropdownOpen(!isTagsDropdownOpen)}
                    >
                      <span className={styles.tagsSelected}>
                        {selectedTags.length === 0 
                          ? 'All Tags' 
                          : `${selectedTags.length} selected`}
                      </span>
                      <ChevronDown
                        size={14}
                        className={`${styles.chevron} ${isTagsDropdownOpen ? styles.rotated : ''}`}
                      />
                    </button>

                    {isTagsDropdownOpen && (
                      <div className={styles.tagsMenu}>
                        <div className={styles.tagsGrid}>
                          {availableTags.map(tag => (
                            <button
                              key={tag}
                              type="button"
                              className={`${styles.tagOption} ${selectedTags.includes(tag) ? styles.selected : ''}`}
                              onClick={() => toggleTag(tag)}
                            >
                              {tag}
                            </button>
                          ))}
                        </div>
                        {selectedTags.length > 0 && (
                          <button
                            type="button"
                            className={styles.clearTags}
                            onClick={() => setSelectedTags([])}
                          >
                            Clear all tags
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {/* Sort Dropdown */}
                <div className={styles.group}>
                  <label className={styles.label}>Sort by:</label>
                  <div className={styles.sortDropdown}>
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
                      <div className={styles.sortMenu}>
                        {sortOptions.map(sort => (
                          <button
                            key={sort.value}
                            type="button"
                            className={`${styles.sortOption} ${sortBy === sort.value ? styles.selected : ''}`}
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
            </div>
          </div>
        </div>
      </section>

      {/* No Content Section */}
      {!hasContent && <NoContentSection />}

      {/* Load More Section */}
      <LoadMoreSection />
    </>
  );
};

export default Filter;
