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
  Shuffle,
} from 'lucide-react';
import styles from './Filter.module.scss';

const Filter = ({
  onCategoryChange,
  onTagsChange,
  onLayoutChange,
  onShowAllInfoChange,
  onShuffleChange,
  showAllInfo = false,
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
  const [isShuffled, setIsShuffled] = useState(false);

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

                {/* Show Content & Shuffle Options */}
                <div className={styles.group}>
                  <label className={styles.label}>Options</label>
                  <div className={styles.layoutOptions}>
                    {/* Show Content Button */}
                    <button
                      type="button"
                      className={`${styles.layoutOption} ${styles.aaButton} ${showAllInfo ? styles.active : ''}`}
                      onClick={() => onShowAllInfoChange && onShowAllInfoChange(!showAllInfo)}
                      title="Toggle Info Display"
                    >
                      <div className={styles.aaIcon}>
                        <svg width="17" height="11" viewBox="0 0 17 11" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                          <path d="M1.53597 10.4865C0.899492 10.4865 0.5 10.1159 0.5 9.52965C0.5 9.36119 0.547397 9.13208 0.635421 8.88275L3.30322 1.65229C3.5876 0.863881 4.06835 0.5 4.84025 0.5C5.63923 0.5 6.1132 0.850404 6.40436 1.64555L9.0857 8.88275C9.18049 9.14555 9.21435 9.32749 9.21435 9.52965C9.21435 10.0889 8.78777 10.4865 8.19192 10.4865C7.61638 10.4865 7.31168 10.2237 7.12886 9.5903L6.61426 8.05391H3.08654L2.57194 9.57008C2.38235 10.217 2.07766 10.4865 1.53597 10.4865ZM3.53343 6.47709H6.14029L4.84702 2.49461H4.79962L3.53343 6.47709Z"></path>
                          <path d="M12.329 10.473C10.9477 10.473 9.89822 9.58356 9.89822 8.28302C9.89822 6.969 10.9139 6.20755 12.7285 6.09973L14.5567 5.99191V5.51348C14.5567 4.83962 14.0827 4.44879 13.3379 4.44879C12.7353 4.44879 12.3697 4.6442 11.9295 5.21024C11.7129 5.45283 11.4623 5.57412 11.1441 5.57412C10.6634 5.57412 10.318 5.26415 10.318 4.81941C10.318 4.66442 10.3519 4.52291 10.4196 4.37466C10.7581 3.51213 11.9228 2.97978 13.4259 2.97978C15.288 2.97978 16.5 3.93666 16.5 5.39218V9.50943C16.5 10.1631 16.1005 10.5 15.5385 10.5C15.0036 10.5 14.6312 10.2035 14.5906 9.62399V9.25337H14.5499C14.1437 10.0216 13.2364 10.473 12.329 10.473ZM12.9791 9.05121C13.8457 9.05121 14.5567 8.49191 14.5567 7.71024V7.18464L13.0264 7.27898C12.2884 7.33288 11.8686 7.66307 11.8686 8.1752C11.8686 8.71429 12.3155 9.05121 12.9791 9.05121Z"></path>
                        </svg>
                      </div>
                      <span>Show Content</span>
                    </button>

                    {/* Shuffle Button */}
                    <button
                      type="button"
                      className={`${styles.layoutOption} ${styles.shuffleButton} ${isShuffled ? styles.active : ''}`}
                      onClick={() => {
                        setIsShuffled(!isShuffled);
                        onShuffleChange && onShuffleChange(!isShuffled);
                      }}
                      title="Shuffle Projects"
                    >
                      <Shuffle size={18} />
                      <span>Shuffle</span>
                    </button>
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
