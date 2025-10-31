'use client';

import React from 'react';
import Link from 'next/link';
import { Calendar, Shuffle, ArrowUpRight } from 'lucide-react';
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';
import styles from './ShowGrid.module.scss';

const ShowGrid = ({ 
  data, 
  categories, 
  activeCategory, 
  setActiveCategory,
  sortOrder,
  setSortOrder,
  showAllInfo,
  setShowAllInfo,
  onOpenSplitView
}) => {
  return (
    <>
      {/* Mobile Header */}
      <div className={styles.mobileHeader}>
        <div className={styles.headerContent}>
          <h1 className={styles.mainTitle}>SHOWCASE</h1>
          <p className={styles.mainDescription}>
            A collection of my best work and projects. From web development to design to digital art - here you&apos;ll find a variety of creative solutions and innovative ideas.
          </p>
        </div>
      </div>

      {/* Desktop Header */}
      <div className={styles.desktopHeader}>
        <h1 className={styles.mainTitle}>SHOWCASE</h1>
        <p className={styles.mainDescription}>
          A collection of my best work and projects. From web development to design to digital art - here you&apos;ll find a variety of creative solutions and innovative ideas.
          </p>
      </div>

      {/* Desktop Grid */}
      <LayoutGroup>
        <motion.div 
          className={styles.desktopGrid}
        >
          {/* Filter Card als erste Karte */}
          <motion.div 
            className={styles.gridFilterCard}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            {categories.map((cat) => (
              <button
                key={cat.key}
                className={`${styles.filterButton} ${activeCategory === cat.key ? styles.active : ''}`}
                onClick={() => setActiveCategory(cat.key)}
              >
                <span className={styles.filterLabel}>{cat.name}</span>
                <span className={styles.filterCount}>{cat.count}</span>
              </button>
            ))}

            <div className={styles.sortControls}>
              {/* Toggle Switch für Ordered/Random */}
              <div className={styles.toggleSwitch}>
                <button 
                  className={`${styles.toggleButton} ${sortOrder === 'ordered' ? styles.active : ''}`}
                  onClick={() => setSortOrder('ordered')}
                >
                  <div className={styles.toggleIcon}>
                    <Calendar size={17} />
                  </div>
                </button>
                <button 
                  className={`${styles.toggleButton} ${sortOrder === 'random' ? styles.active : ''}`}
                  onClick={() => setSortOrder('random')}
                >
                  <div className={styles.toggleIcon}>
                    <Shuffle size={17} />
                  </div>
                </button>
                {/* Active Indicator */}
                <div 
                  className={styles.toggleIndicator}
                  style={{ 
                    transform: sortOrder === 'ordered' ? 'translateX(0)' : 'translateX(100%)' 
                  }}
                />
              </div>

              {/* AZ Button */}
              <button 
                className={`${styles.azButton} ${showAllInfo ? styles.active : ''}`}
                onClick={() => setShowAllInfo(!showAllInfo)}
              >
                <div className={styles.azIcon}>
                  <svg width="17" height="11" viewBox="0 0 17 11" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1.53597 10.4865C0.899492 10.4865 0.5 10.1159 0.5 9.52965C0.5 9.36119 0.547397 9.13208 0.635421 8.88275L3.30322 1.65229C3.5876 0.863881 4.06835 0.5 4.84025 0.5C5.63923 0.5 6.1132 0.850404 6.40436 1.64555L9.0857 8.88275C9.18049 9.14555 9.21435 9.32749 9.21435 9.52965C9.21435 10.0889 8.78777 10.4865 8.19192 10.4865C7.61638 10.4865 7.31168 10.2237 7.12886 9.5903L6.61426 8.05391H3.08654L2.57194 9.57008C2.38235 10.217 2.07766 10.4865 1.53597 10.4865ZM3.53343 6.47709H6.14029L4.84702 2.49461H4.79962L3.53343 6.47709Z"></path>
                    <path d="M12.329 10.473C10.9477 10.473 9.89822 9.58356 9.89822 8.28302C9.89822 6.969 10.9139 6.20755 12.7285 6.09973L14.5567 5.99191V5.51348C14.5567 4.83962 14.0827 4.44879 13.3379 4.44879C12.7353 4.44879 12.3697 4.6442 11.9295 5.21024C11.7129 5.45283 11.4623 5.57412 11.1441 5.57412C10.6634 5.57412 10.318 5.26415 10.318 4.81941C10.318 4.66442 10.3519 4.52291 10.4196 4.37466C10.7581 3.51213 11.9228 2.97978 13.4259 2.97978C15.288 2.97978 16.5 3.93666 16.5 5.39218V9.50943C16.5 10.1631 16.1005 10.5 15.5385 10.5C15.0036 10.5 14.6312 10.2035 14.5906 9.62399V9.25337H14.5499C14.1437 10.0216 13.2364 10.473 12.329 10.473ZM12.9791 9.05121C13.8457 9.05121 14.5567 8.49191 14.5567 7.71024V7.18464L13.0264 7.27898C12.2884 7.33288 11.8686 7.66307 11.8686 8.1752C11.8686 8.71429 12.3155 9.05121 12.9791 9.05121Z"></path>
                  </svg>
                </div>
                <div className={styles.azOverlay}>
                  <svg width="17" height="11" viewBox="0 0 17 11" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className="text-transparent">
                    <path d="M1.53597 10.4865C0.899492 10.4865 0.5 10.1159 0.5 9.52965C0.5 9.36119 0.547397 9.13208 0.635421 8.88275L3.30322 1.65229C3.5876 0.863881 4.06835 0.5 4.84025 0.5C5.63923 0.5 6.1132 0.850404 6.40436 1.64555L9.0857 8.88275C9.18049 9.14555 9.21435 9.32749 9.21435 9.52965C9.21435 10.0889 8.78777 10.4865 8.19192 10.4865C7.61638 10.4865 7.31168 10.2237 7.12886 9.5903L6.61426 8.05391H3.08654L2.57194 9.57008C2.38235 10.217 2.07766 10.4865 1.53597 10.4865ZM3.53343 6.47709H6.14029L4.84702 2.49461H4.79962L3.53343 6.47709Z"></path>
                    <path d="M12.329 10.473C10.9477 10.473 9.89822 9.58356 9.89822 8.28302C9.89822 6.969 10.9139 6.20755 12.7285 6.09973L14.5567 5.99191V5.51348C14.5567 4.83962 14.0827 4.44879 13.3379 4.44879C12.7353 4.44879 12.3697 4.6442 11.9295 5.21024C11.7129 5.45283 11.4623 5.57412 11.1441 5.57412C10.6634 5.57412 10.318 5.26415 10.318 4.81941C10.318 4.66442 10.3519 4.52291 10.4196 4.37466C10.7581 3.51213 11.9228 2.97978 13.4259 2.97978C15.288 2.97978 16.5 3.93666 16.5 5.39218V9.50943C16.5 10.1631 16.1005 10.5 15.5385 10.5C15.0036 10.5 14.6312 10.2035 14.5906 9.62399V9.25337H14.5499C14.1437 10.0216 13.2364 10.473 12.329 10.473ZM12.9791 9.05121C13.8457 9.05121 14.5567 8.49191 14.5567 7.71024V7.18464L13.0264 7.27898C12.2884 7.33288 11.8686 7.66307 11.8686 8.1752C11.8686 8.71429 12.3155 9.05121 12.9791 9.05121Z"></path>
                  </svg>
                </div>
              </button>

              {/* Back Button */}
              <button 
                className={styles.backButton}
                onClick={onOpenSplitView}
              >
                <span>Back</span>
              </button>
            </div>
          </motion.div>

          {/* Showcase Cards */}
          <AnimatePresence mode="popLayout">
            {data.map((item) => (
              <motion.div 
                key={item.id}
                layoutId={`card-${item.id}`}
                initial={{ opacity: 0, y: 60, x: 40, scale: 0.92 }}
                animate={{ opacity: 1, y: 0, x: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ 
                  duration: 0.5,
                  opacity: { duration: 0.3 },
                  ease: [0.25, 0.46, 0.45, 0.94]
                }}
                className={`${styles.showcaseCard} ${item.wide ? styles.wideCard : ''} ${item.tall ? styles.tallCard : ''} ${showAllInfo ? styles.showInfo : ''}`}
              >
                <Link href={`/showcase/${item.slug}`} className={styles.cardLink}>
                  <figure className={styles.figure}>
                    <img 
                      src={item.image} 
                      alt={item.title}
                      className={styles.cardImage}
                    />
                    <div className={`${styles.overlay} ${showAllInfo ? styles.alwaysVisible : ''}`}>
                      <div>
                        <h3>{item.title}</h3>
                        <p>{item.categoryDisplay}</p>
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
                  </figure>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </LayoutGroup>

      {/* Mobile Grid */}
      <LayoutGroup>
        <motion.div 
          className={styles.mobileGrid}
        >
          {/* Filter Card als erste Karte im Mobile Grid */}
          <motion.div 
            className={styles.mobileFilterCard}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            {categories.map((cat) => (
              <button
                key={cat.key}
                className={`${styles.filterButton} ${activeCategory === cat.key ? styles.active : ''}`}
                onClick={() => setActiveCategory(cat.key)}
              >
                <span className={styles.filterLabel}>{cat.name}</span>
                <span className={styles.filterCount}>{cat.count}</span>
              </button>
            ))}

            <div className={styles.sortControls}>
              {/* Toggle Switch für Ordered/Random */}
              <div className={styles.toggleSwitch}>
                <button 
                  className={`${styles.toggleButton} ${sortOrder === 'ordered' ? styles.active : ''}`}
                  onClick={() => setSortOrder('ordered')}
                >
                  <div className={styles.toggleIcon}>
                    <Calendar size={17} />
                  </div>
                </button>
                <button 
                  className={`${styles.toggleButton} ${sortOrder === 'random' ? styles.active : ''}`}
                  onClick={() => setSortOrder('random')}
                >
                  <div className={styles.toggleIcon}>
                    <Shuffle size={17} />
                  </div>
                </button>
                {/* Active Indicator */}
                <div 
                  className={styles.toggleIndicator}
                  style={{ 
                    transform: sortOrder === 'ordered' ? 'translateX(0)' : 'translateX(100%)' 
                  }}
                />
              </div>

              {/* AZ Button */}
              <button 
                className={`${styles.azButton} ${showAllInfo ? styles.active : ''}`}
                onClick={() => setShowAllInfo(!showAllInfo)}
              >
                <div className={styles.azIcon}>
                  <svg width="17" height="11" viewBox="0 0 17 11" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1.53597 10.4865C0.899492 10.4865 0.5 10.1159 0.5 9.52965C0.5 9.36119 0.547397 9.13208 0.635421 8.88275L3.30322 1.65229C3.5876 0.863881 4.06835 0.5 4.84025 0.5C5.63923 0.5 6.1132 0.850404 6.40436 1.64555L9.0857 8.88275C9.18049 9.14555 9.21435 9.32749 9.21435 9.52965C9.21435 10.0889 8.78777 10.4865 8.19192 10.4865C7.61638 10.4865 7.31168 10.2237 7.12886 9.5903L6.61426 8.05391H3.08654L2.57194 9.57008C2.38235 10.217 2.07766 10.4865 1.53597 10.4865ZM3.53343 6.47709H6.14029L4.84702 2.49461H4.79962L3.53343 6.47709Z"></path>
                    <path d="M12.329 10.473C10.9477 10.473 9.89822 9.58356 9.89822 8.28302C9.89822 6.969 10.9139 6.20755 12.7285 6.09973L14.5567 5.99191V5.51348C14.5567 4.83962 14.0827 4.44879 13.3379 4.44879C12.7353 4.44879 12.3697 4.6442 11.9295 5.21024C11.7129 5.45283 11.4623 5.57412 11.1441 5.57412C10.6634 5.57412 10.318 5.26415 10.318 4.81941C10.318 4.66442 10.3519 4.52291 10.4196 4.37466C10.7581 3.51213 11.9228 2.97978 13.4259 2.97978C15.288 2.97978 16.5 3.93666 16.5 5.39218V9.50943C16.5 10.1631 16.1005 10.5 15.5385 10.5C15.0036 10.5 14.6312 10.2035 14.5906 9.62399V9.25337H14.5499C14.1437 10.0216 13.2364 10.473 12.329 10.473ZM12.9791 9.05121C13.8457 9.05121 14.5567 8.49191 14.5567 7.71024V7.18464L13.0264 7.27898C12.2884 7.33288 11.8686 7.66307 11.8686 8.1752C11.8686 8.71429 12.3155 9.05121 12.9791 9.05121Z"></path>
                  </svg>
                </div>
                <div className={styles.azOverlay}>
                  <svg width="17" height="11" viewBox="0 0 17 11" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className="text-transparent">
                    <path d="M1.53597 10.4865C0.899492 10.4865 0.5 10.1159 0.5 9.52965C0.5 9.36119 0.547397 9.13208 0.635421 8.88275L3.30322 1.65229C3.5876 0.863881 4.06835 0.5 4.84025 0.5C5.63923 0.5 6.1132 0.850404 6.40436 1.64555L9.0857 8.88275C9.18049 9.14555 9.21435 9.32749 9.21435 9.52965C9.21435 10.0889 8.78777 10.4865 8.19192 10.4865C7.61638 10.4865 7.31168 10.2237 7.12886 9.5903L6.61426 8.05391H3.08654L2.57194 9.57008C2.38235 10.217 2.07766 10.4865 1.53597 10.4865ZM3.53343 6.47709H6.14029L4.84702 2.49461H4.79962L3.53343 6.47709Z"></path>
                    <path d="M12.329 10.473C10.9477 10.473 9.89822 9.58356 9.89822 8.28302C9.89822 6.969 10.9139 6.20755 12.7285 6.09973L14.5567 5.99191V5.51348C14.5567 4.83962 14.0827 4.44879 13.3379 4.44879C12.7353 4.44879 12.3697 4.6442 11.9295 5.21024C11.7129 5.45283 11.4623 5.57412 11.1441 5.57412C10.6634 5.57412 10.318 5.26415 10.318 4.81941C10.318 4.66442 10.3519 4.52291 10.4196 4.37466C10.7581 3.51213 11.9228 2.97978 13.4259 2.97978C15.288 2.97978 16.5 3.93666 16.5 5.39218V9.50943C16.5 10.1631 16.1005 10.5 15.5385 10.5C15.0036 10.5 14.6312 10.2035 14.5906 9.62399V9.25337H14.5499C14.1437 10.0216 13.2364 10.473 12.329 10.473ZM12.9791 9.05121C13.8457 9.05121 14.5567 8.49191 14.5567 7.71024V7.18464L13.0264 7.27898C12.2884 7.33288 11.8686 7.66307 11.8686 8.1752C11.8686 8.71429 12.3155 9.05121 12.9791 9.05121Z"></path>
                  </svg>
                </div>
              </button>

              {/* Back Button */}
              <button 
                className={styles.backButton}
                onClick={onOpenSplitView}
              >
                <span>Back</span>
              </button>
            </div>
          </motion.div>

          {/* Mobile Cards */}
          <AnimatePresence mode="popLayout">
            {data.map((item) => (
              <motion.div 
                key={item.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ 
                  duration: 0.4,
                  ease: [0.4, 0, 0.2, 1]
                }}
                className={`${styles.mobileCard} ${item.wide ? styles.mobileWideCard : ''} ${item.tall ? styles.mobileTallCard : ''} ${showAllInfo ? styles.showInfo : ''}`}
              >
                <Link href={`/showcase/${item.slug}`} className={styles.cardLink}>
                  <figure className={styles.figure}>
                    <img 
                      src={item.image} 
                      alt={item.title}
                      className={styles.cardImage}
                    />
                    <div className={styles.overlay}>
                      <div>
                        <h3>{item.title}</h3>
                        <p>{item.categoryDisplay}</p>
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
                  </figure>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </LayoutGroup>
    </>
  );
};

export default ShowGrid;

