'use client';
import { useState, useMemo } from 'react';
import styles from '../GradientGenerator/GradientGenerator.module.scss';
import { Copy, Check } from 'lucide-react';

const SNIPPETS = [
  {
    title: 'CSS Custom Scrollbar',
    tag: 'CSS',
    code: `/* Hide scrollbar but keep functionality */
::-webkit-scrollbar { display: none; }
* { scrollbar-width: none; }`,
  },
  {
    title: 'Centered Flex Container',
    tag: 'CSS',
    code: `display: flex;
align-items: center;
justify-content: center;`,
  },
  {
    title: 'CSS Clamp — Fluid Typography',
    tag: 'CSS',
    code: `font-size: clamp(1rem, 2.5vw, 2rem);
/* min, preferred, max */`,
  },
  {
    title: 'CSS Glass Morphism',
    tag: 'CSS',
    code: `background: rgba(255, 255, 255, 0.05);
border: 1px solid rgba(255, 255, 255, 0.1);
backdrop-filter: blur(12px);
-webkit-backdrop-filter: blur(12px);
border-radius: 16px;`,
  },
  {
    title: 'Truncate Text (Single Line)',
    tag: 'CSS',
    code: `overflow: hidden;
white-space: nowrap;
text-overflow: ellipsis;`,
  },
  {
    title: 'Multi-line Truncate',
    tag: 'CSS',
    code: `display: -webkit-box;
-webkit-line-clamp: 3;
-webkit-box-orient: vertical;
overflow: hidden;`,
  },
  {
    title: 'useLocalStorage Hook',
    tag: 'JS',
    code: `function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch { return initialValue; }
  });

  const set = (v) => {
    setValue(v);
    localStorage.setItem(key, JSON.stringify(v));
  };

  return [value, set];
}`,
  },
  {
    title: 'Debounce Function',
    tag: 'JS',
    code: `const debounce = (fn, delay = 300) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
};`,
  },
  {
    title: 'Deep Clone Object',
    tag: 'JS',
    code: `const clone = structuredClone(obj);
// OR for legacy:
const clone = JSON.parse(JSON.stringify(obj));`,
  },
  {
    title: 'Format Number (Compact)',
    tag: 'JS',
    code: `const fmt = (n) =>
  Intl.NumberFormat('en', { notation: 'compact' }).format(n);

fmt(1500); // → "1.5K"
fmt(2000000); // → "2M"`,
  },
  {
    title: 'useDebounce Hook (React)',
    tag: 'React',
    code: `function useDebounce(value, delay = 300) {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);
  return debounced;
}`,
  },
  {
    title: 'useIntersectionObserver Hook',
    tag: 'React',
    code: `function useInView(ref, options = {}) {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      options
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [ref]);
  return inView;
}`,
  },
];

const TAGS = ['All', ...Array.from(new Set(SNIPPETS.map(s => s.tag)))];

export default function Snippets() {
  const [activeTag, setActiveTag] = useState('All');
  const [copiedIdx, setCopiedIdx] = useState(null);

  const filtered = useMemo(() =>
    activeTag === 'All' ? SNIPPETS : SNIPPETS.filter(s => s.tag === activeTag),
    [activeTag]
  );

  const handleCopy = (code, idx) => {
    navigator.clipboard.writeText(code);
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 2000);
  };

  return (
    <div className={styles.tool}>
      <h1 className={styles.title}>Snippets</h1>
      <p className={styles.desc}>Reusable code snippets for everyday development.</p>

      <div className={styles.filterTabs}>
        {TAGS.map(t => (
          <button
            key={t}
            type="button"
            onClick={() => setActiveTag(t)}
            className={`${styles.filterTab} ${activeTag === t ? styles.filterTabActive : ''}`}
          >
            {t}
          </button>
        ))}
      </div>

      <div className={styles.snippetsList}>
        {filtered.map((s, i) => (
          <div key={i} className={styles.snippetCard}>
            <div className={styles.snippetHeader}>
              <span className={styles.snippetTitle}>{s.title}</span>
              <span className={styles.snippetTag}>{s.tag}</span>
            </div>
            <div className={styles.snippetBody}>
              <button
                className={styles.snippetCopy}
                onClick={() => handleCopy(s.code, i)}
              >
                {copiedIdx === i ? <Check size={12} /> : <Copy size={12} />}
                {copiedIdx === i ? 'Copied' : 'Copy'}
              </button>
              <code className={styles.snippetCode}>{s.code}</code>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
