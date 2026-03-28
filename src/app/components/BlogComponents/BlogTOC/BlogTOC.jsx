'use client';
import { useEffect, useState, useRef } from 'react';
import styles from './BlogTOC.module.scss';

const slugify = (text) =>
  text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();

const parseHeadings = (markdown) => {
  if (!markdown) return [];
  const headingRegex = /^(#{1,4})\s+(.+)$/gm;
  const headings = [];
  let match;
  while ((match = headingRegex.exec(markdown)) !== null) {
    const level = match[1].length;
    const text = match[2].trim();
    headings.push({ level, text, id: slugify(text) });
  }

  // Normalize: first h1 or h2 becomes "main" (displayLevel 1),
  // everything else becomes "sub" (displayLevel 2, max 1 child level)
  let firstMainLevel = null;
  const normalized = headings.map((h) => {
    if (firstMainLevel === null) firstMainLevel = h.level;
    const displayLevel = h.level === firstMainLevel ? 1 : 2;
    return { ...h, displayLevel };
  });

  return normalized;
};

const BlogTOC = ({ mdxContent }) => {
  const [headings, setHeadings] = useState([]);
  const [activeId, setActiveId] = useState('');
  const observerRef = useRef(null);

  useEffect(() => {
    setHeadings(parseHeadings(mdxContent));
  }, [mdxContent]);

  useEffect(() => {
    if (headings.length === 0) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length > 0) {
          // pick topmost visible heading
          const sorted = visible.sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
          setActiveId(sorted[0].target.id);
        }
      },
      { rootMargin: '0px 0px -70% 0px', threshold: 0 }
    );

    headings.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observerRef.current.observe(el);
    });

    return () => observerRef.current?.disconnect();
  }, [headings]);

  const handleClick = (e, id) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'instant', block: 'start' });
      // offset for fixed navbar
      const offset = 90;
      const top = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'instant' });
      setActiveId(id);
    }
  };

  if (headings.length === 0) return null;

  return (
    <nav className={styles.toc} aria-label="Table of contents">
      <ul className={styles.tocList}>
        {headings.map(({ id, text, displayLevel }) => (
          <li key={id} className={`${styles.tocItem} ${styles[`level${displayLevel}`]}`}>
            <a
              href={`#${id}`}
              onClick={(e) => handleClick(e, id)}
              className={`${styles.tocLink} ${activeId === id ? styles.active : ''}`}
            >
              {text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default BlogTOC;
