'use client';
import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';
import './Pagination.css';

const Pagination = ({
  currentPage = 1,
  totalPages = 1,
  onPageChange,
  itemsPerPage = 9,
  totalItems = 0,
  onItemsPerPageChange,
  showItemsPerPage = true,
  showPageInfo = true,
}) => {
  const [localItemsPerPage, setLocalItemsPerPage] = useState(itemsPerPage);
  const [isItemsPerPageOpen, setIsItemsPerPageOpen] = useState(false);

  // Sync localItemsPerPage with itemsPerPage prop
  useEffect(() => {
    setLocalItemsPerPage(itemsPerPage);
  }, [itemsPerPage]);

  // Calculate page info
  const startItem = (currentPage - 1) * localItemsPerPage + 1;
  const endItem = Math.min(currentPage * localItemsPerPage, totalItems);

  // Generate page numbers
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show first page
      pages.push(1);
      
      if (currentPage > 3) {
        pages.push('...');
      }
      
      // Show pages around current page
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);
      
      for (let i = start; i <= end; i++) {
        if (i !== 1 && i !== totalPages) {
          pages.push(i);
        }
      }
      
      if (currentPage < totalPages - 2) {
        pages.push('...');
      }
      
      // Always show last page
      if (totalPages > 1) {
        pages.push(totalPages);
      }
    }
    
    return pages;
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      onPageChange(page);
    }
  };

  const handleItemsPerPageChange = (newItemsPerPage) => {
    setLocalItemsPerPage(newItemsPerPage);
    setIsItemsPerPageOpen(false);
    // Reset to first page when changing items per page
    onPageChange(1);
    // Call the parent's onItemsPerPageChange if provided
    if (onItemsPerPageChange) {
      onItemsPerPageChange(newItemsPerPage);
    }
  };

  const itemsPerPageOptions = [6, 9, 18, 36];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isItemsPerPageOpen && !event.target.closest('.items-per-page-dropdown')) {
        setIsItemsPerPageOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isItemsPerPageOpen]);

  if (totalPages <= 1) {
    return null;
  }

  return (
    <section className="pagination-section">
      <div className="pagination-container">
        {/* Page Info */}
        {showPageInfo && (
          <div className="pagination-info">
            <span className="pagination-text">
              Showing {startItem}-{endItem} of {totalItems} projects
            </span>
          </div>
        )}

        {/* Pagination Controls */}
        <div className="pagination-controls">
          {/* First Page */}
          <button
            type="button"
            className="pagination-btn pagination-btn--first"
            onClick={() => handlePageChange(1)}
            disabled={currentPage === 1}
            title="First page"
          >
            <ChevronsLeft size={16} />
          </button>

          {/* Previous Page */}
          <button
            type="button"
            className="pagination-btn pagination-btn--prev"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            title="Previous page"
          >
            <ChevronLeft size={16} />
          </button>

          {/* Page Numbers */}
          <div className="pagination-numbers">
            {getPageNumbers().map((page, index) => (
              <button
                key={index}
                type="button"
                className={`pagination-btn pagination-btn--number ${
                  page === currentPage ? 'active' : ''
                } ${page === '...' ? 'disabled' : ''}`}
                onClick={() => typeof page === 'number' && handlePageChange(page)}
                disabled={page === '...'}
                title={typeof page === 'number' ? `Page ${page}` : ''}
              >
                {page}
              </button>
            ))}
          </div>

          {/* Next Page */}
          <button
            type="button"
            className="pagination-btn pagination-btn--next"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            title="Next page"
          >
            <ChevronRight size={16} />
          </button>

          {/* Last Page */}
          <button
            type="button"
            className="pagination-btn pagination-btn--last"
            onClick={() => handlePageChange(totalPages)}
            disabled={currentPage === totalPages}
            title="Last page"
          >
            <ChevronsRight size={16} />
          </button>
        </div>

        {/* Items Per Page */}
        {showItemsPerPage && (
          <div className="pagination-group items-per-page-group">
            <label className="pagination-label">Items per page:</label>
            <div className="items-per-page-dropdown">
              <button
                type="button"
                className={`items-per-page-trigger ${isItemsPerPageOpen ? 'open' : ''}`}
                onClick={() => setIsItemsPerPageOpen(!isItemsPerPageOpen)}
              >
                <span className="items-per-page-selected">
                  {localItemsPerPage}
                </span>
                <ChevronRight
                  size={14}
                  className={`chevron ${isItemsPerPageOpen ? 'rotated' : ''}`}
                />
              </button>

              {isItemsPerPageOpen && (
                <div className="items-per-page-dropdown-menu">
                  {itemsPerPageOptions.map(option => (
                    <button
                      key={option}
                      type="button"
                      className={`items-per-page-option ${
                        localItemsPerPage === option ? 'selected' : ''
                      }`}
                      onClick={() => handleItemsPerPageChange(option)}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Pagination;
