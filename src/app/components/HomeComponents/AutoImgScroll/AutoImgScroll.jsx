import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import styles from './AutoImgScroll.module.scss';

function shuffleArray(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const AutoImgScroll = () => {
  const [scrollItems, setScrollItems] = useState([]);

  useEffect(() => {
    fetch('/data/PortfolioData.json')
      .then(r => r.json())
      .then(data => {
        const items = data.map(p => ({
          id: p.slug,
          title: p.title,
          category: p.category,
          tags: (p.tags || []).slice(0, 3),
          image: p.gridData?.imgSrc || '/assets/images/portfolio/Akira1.jpg',
          href: `/portfolio/${p.slug}`,
        }));
        setScrollItems(shuffleArray(items));
      })
      .catch(() => {});
  }, []);

  if (scrollItems.length === 0) return null;

  // Duplicate items for seamless loop
  const duplicatedItems = [...scrollItems, ...scrollItems];

  return (
    <div className={styles.autoImgScroll}>
      <div className={styles.viewAllLink}>
        <div className={styles.header}>
          <Link href="/portfolio" className={styles.titleLink}>
            <h2 className={styles.title}>View all projects</h2>
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 24 24" 
              fill="currentColor" 
              className={styles.arrow}
            >
              <path 
                fillRule="evenodd" 
                d="M16.28 11.47a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 0 1-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 0 1 1.06-1.06l7.5 7.5Z" 
                clipRule="evenodd"
              />
            </svg>
          </Link>
          <p className={styles.subtitle}>Browse the full collection of my portfolio work</p>
        </div>
      </div>
      
      <div className={styles.container}>
        {[false, true].map((reverse) => (
          <div key={reverse ? 'rev' : 'fwd'} className={styles.scrollRow}>
            <div className={styles.scrollContent}>
              <div className={`${styles.scrollTrack} ${reverse ? styles.reverse : ''}`}>
                {duplicatedItems.map((item, index) => (
                  <a
                    key={`${reverse ? 'r' : 'f'}-${item.id}-${index}`}
                    href={item.href}
                    className={styles.scrollItem}
                    onDragStart={(e) => e.preventDefault()}
                    onClick={(e) => {
                      e.preventDefault();
                      window.location.href = item.href;
                    }}
                  >
                    <figure className={styles.figure}>
                      <img
                        src={item.image}
                        alt={item.title}
                        className={styles.media}
                        loading="lazy"
                        draggable="false"
                      />
                      <div className={styles.overlay}>
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
                    </figure>
                  </a>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AutoImgScroll;
