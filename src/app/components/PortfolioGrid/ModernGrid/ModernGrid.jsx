'use client';
import React from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import styles from './ModernGrid.module.scss';

const ModernGrid = ({ 
  layoutMode = 1, 
  currentPage = 1,
  itemsPerPage = 9,
  filteredItems = [],
  showAllInfo = false
}) => {
  // Pagination-Logik
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedItems = filteredItems.slice(startIndex, endIndex);

  // Determine which layout class to use
  const getLayoutClass = () => {
    switch(layoutMode) {
      case 1:
        return styles.grid; // Original Grid (3 columns)
      case 2:
        return `${styles.grid} ${styles.cardsLayout}`; // Cards (4 columns)
      case 3:
        return `${styles.grid} ${styles.listLayout}`; // List view
      default:
        return styles.grid;
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <span className={styles.subtitle}>Made with love</span>
        <h2>Have a look at my work</h2>
      </div>

      <ul className={getLayoutClass()}>
        {paginatedItems.map((item) => (
          <li key={item.slug} className={`${styles.item} ${showAllInfo ? styles.showInfo : ''}`}>
            <div className={styles.card}>
              <figure className={styles.figure}>
                <Link href={`/portfolio/${item.slug}`}>
                  <img
                    src={item.gridData.imgSrc}
                    alt={item.title}
                    className={styles.image}
                  />
                  <div className={`${styles.overlay} ${showAllInfo ? styles.alwaysVisible : ''}`}>
                    <div>
                      <h3>{item.title}</h3>
                      <p>{item.category}</p>
                      <div className={styles.tags}>
                        {item.tags.map((tag, idx) => (
                          <span key={idx} className={styles.tag}>{tag}</span>
                        ))}
                      </div>
                    </div>
                    <div className={styles.linkIcon}>
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
        <div className={styles.noResults}>
          <p>No projects found matching your criteria.</p>
        </div>
      )}

      {filteredItems.length > 0 && paginatedItems.length === 0 && (
        <div className={styles.noResults}>
          <p>No projects found on this page. Try adjusting your filters or go to the previous page.</p>
        </div>
      )}
    </div>
  );
};

export default ModernGrid;
