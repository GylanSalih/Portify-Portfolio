'use client';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import './ModernGrid.css';

const ModernGrid = ({ 
  layoutMode = 1, 
  currentPage = 1,
  itemsPerPage = 9,
  filteredItems = []
}) => {
  // Pagination-Logik
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedItems = filteredItems.slice(startIndex, endIndex);

  // Determine which layout class to use
  const getLayoutClass = () => {
    switch(layoutMode) {
      case 1:
        return 'modern-grid'; // Original Grid (3 columns)
      case 2:
        return 'modern-grid modern-grid--cards'; // Cards (4 columns)
      case 3:
        return 'modern-grid modern-grid--list'; // List view
      default:
        return 'modern-grid';
    }
  };

  return (
    <div className="modern-grid-container">
      <div className="modern-grid-header">
        <span className="modern-grid-subtitle">Made with love</span>
        <h2>Have a look at my work</h2>
      </div>

      <ul className={getLayoutClass()}>
        {paginatedItems.map((item) => (
          <li key={item.slug} className="modern-grid-item">
            <div className="card-course">
              <figure className="card-course__figure">
                <Link href={`/portfolio/${item.slug}`}>
                  <Image
                    src={item.imgSrc}
                    alt={item.title}
                    width={550}
                    height={400}
                    className="card-course__img"
                  />
                  <div className="card-overlay">
                    <div>
                      <h3>{item.title}</h3>
                      <p>{item.category}</p>
                      <div className="card-tags">
                        {item.tags.slice(0, 2).map((tag, idx) => (
                          <span key={idx} className="card-tag">{tag}</span>
                        ))}
                      </div>
                    </div>
                    <div className="card-link-icon">
                      <ArrowUpRight size={20} />
                    </div>
                  </div>
                </Link>
              </figure>
            </div>
          </li>
        ))}
      </ul>

      {filteredItems.length === 0 && (
        <div className="no-results">
          <p>No projects found matching your criteria.</p>
        </div>
      )}

      {filteredItems.length > 0 && paginatedItems.length === 0 && (
        <div className="no-results">
          <p>No projects found on this page. Try adjusting your filters or go to the previous page.</p>
        </div>
      )}
    </div>
  );
};

export default ModernGrid;
