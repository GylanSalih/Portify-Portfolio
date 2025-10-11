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
import './Filter.css';

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
    <div className="no-content-section">
      <div className="no-content-container">
        <div className="no-content-icon">
          <TrendingUp size={48} />
        </div>
        <h3 className="no-content-title">No {selectedCategory} Projects Yet</h3>
        <p className="no-content-description">
          We&apos;re currently working on some amazing{' '}
          {selectedCategory.toLowerCase()} projects. Check back soon to see our
          latest work!
        </p>
        <button
          className="no-content-button"
          onClick={() => setSelectedCategory('all')}
        >
          View All Projects
        </button>
      </div>
    </div>
  );

  const LoadMoreSection = () =>
    showLoadMore && (
      <div className="load-more-section">
        <button
          className="load-more-button"
          onClick={onLoadMore}
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <div className="loading-spinner"></div>
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
      <section className="filter-section">
        <div className="filter-container">
          {/* Mobile Filter Toggle */}
          <div className="mobile-filter-toggle">
            <button
              className="mobile-filter-button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <FilterIcon size={20} />
              <span>Filters</span>
              <ChevronDown
                size={16}
                className={`mobile-chevron ${isMobileMenuOpen ? 'rotated' : ''}`}
              />
            </button>
          </div>

          {/* Desktop Filter */}
          <div
            className={`filter-content ${isMobileMenuOpen ? 'mobile-open' : ''}`}
          >
            {/* All Filters in One Row */}
            <div className="filter-row">
              {/* Left Group: Categories + Layout */}
              <div className="left-group">
                {/* Categories */}
                <div className="filter-group">
                  <label className="filter-label">Categories</label>
                  <div className="category-grid">
                    {categories.map(category => {
                      const IconComponent = category.icon;
                      return (
                        <button
                          key={category.value}
                          type="button"
                          className={`category-card ${selectedCategory === category.value ? 'active' : ''}`}
                          onClick={() => setSelectedCategory(category.value)}
                        >
                          <div className="category-icon">
                            <IconComponent size={18} />
                          </div>
                          <div className="category-content">
                            <span className="category-name">
                              {category.label}
                            </span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Layout Options */}
                <div className="filter-group">
                  <label className="filter-label">Layout</label>
                  <div className="layout-options">
                    {layoutOptions.map(layout => {
                      const IconComponent = layout.icon;
                      return (
                        <button
                          key={layout.id}
                          type="button"
                          className={`layout-option ${activeLayout === layout.id ? 'active' : ''}`}
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
              <div className="right-group">
                {/* Tags Dropdown */}
                <div className="filter-group tags-group">
                  <label className="filter-label">Filter by Tags:</label>
                  <div className="tags-dropdown">
                    <button
                      type="button"
                      className={`tags-trigger ${isTagsDropdownOpen ? 'open' : ''}`}
                      onClick={() => setIsTagsDropdownOpen(!isTagsDropdownOpen)}
                    >
                      <span className="tags-selected">
                        {selectedTags.length === 0 
                          ? 'All Tags' 
                          : `${selectedTags.length} selected`}
                      </span>
                      <ChevronDown
                        size={14}
                        className={`chevron ${isTagsDropdownOpen ? 'rotated' : ''}`}
                      />
                    </button>

                    {isTagsDropdownOpen && (
                      <div className="tags-dropdown-menu">
                        <div className="tags-grid">
                          {availableTags.map(tag => (
                            <button
                              key={tag}
                              type="button"
                              className={`tag-option ${selectedTags.includes(tag) ? 'selected' : ''}`}
                              onClick={() => toggleTag(tag)}
                            >
                              {tag}
                            </button>
                          ))}
                        </div>
                        {selectedTags.length > 0 && (
                          <button
                            type="button"
                            className="clear-tags-btn"
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
                <div className="filter-group sort-group">
                  <label className="filter-label">Sort by:</label>
                  <div className="sort-dropdown">
                    <button
                      type="button"
                      className={`sort-trigger ${isSortDropdownOpen ? 'open' : ''}`}
                      onClick={() => setIsSortDropdownOpen(!isSortDropdownOpen)}
                    >
                      <span className="sort-selected">
                        {getSelectedSort().label}
                      </span>
                      <ChevronDown
                        size={14}
                        className={`chevron ${isSortDropdownOpen ? 'rotated' : ''}`}
                      />
                    </button>

                    {isSortDropdownOpen && (
                      <div className="sort-dropdown-menu">
                        {sortOptions.map(sort => (
                          <button
                            key={sort.value}
                            type="button"
                            className={`sort-option ${sortBy === sort.value ? 'selected' : ''}`}
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
