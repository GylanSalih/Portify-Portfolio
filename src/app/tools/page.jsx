import Link from 'next/link';
import styles from './tools.module.scss';

export const metadata = {
  title: 'Tools | Portify',
  description: 'Developer tools: gradient & shadow generators, operator lookup, and code snippets.',
};

const TOOLS = [
  {
    href: '/tools/gradient-generator',
    title: 'Gradient Generator',
    desc: 'Build beautiful CSS gradients visually with live preview and presets.',
    tag: 'CSS',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <defs><linearGradient id="g1" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#a78bfa"/><stop offset="100%" stopColor="#f97316"/></linearGradient></defs>
        <rect x="3" y="3" width="18" height="18" rx="4" fill="url(#g1)" stroke="none" opacity="0.9"/>
        <path d="M3 12h18" stroke="rgba(255,255,255,0.5)" strokeWidth="1"/>
      </svg>
    ),
  },
  {
    href: '/tools/shadow-generator',
    title: 'Shadow Generator',
    desc: 'Design CSS box shadows interactively with real-time preview.',
    tag: 'CSS',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="4" y="4" width="12" height="12" rx="3" fill="rgba(255,255,255,0.15)" stroke="rgba(255,255,255,0.5)"/>
        <rect x="8" y="8" width="12" height="12" rx="3" fill="rgba(0,0,0,0.35)" stroke="none"/>
      </svg>
    ),
  },
  {
    href: '/tools/operator-lookup',
    title: 'Operator Lookup',
    desc: 'Quick-reference for JS, TypeScript, and CSS operators with descriptions.',
    tag: 'Reference',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="7" stroke="rgba(255,255,255,0.5)" fill="none"/>
        <path d="m21 21-4.35-4.35" stroke="rgba(255,255,255,0.5)"/>
        <path d="M8 11h6M11 8v6" stroke="rgba(255,255,255,0.7)" strokeWidth="1.5"/>
      </svg>
    ),
  },
  {
    href: '/tools/snippets',
    title: 'Snippets',
    desc: 'Copy-paste code snippets for React hooks, CSS patterns, and utilities.',
    tag: 'Code',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6" stroke="rgba(255,255,255,0.5)"/>
        <polyline points="8 6 2 12 8 18" stroke="rgba(255,255,255,0.5)"/>
        <line x1="15" y1="4" x2="9" y2="20" stroke="rgba(255,255,255,0.3)"/>
      </svg>
    ),
  },
];

export default function ToolsPage() {
  return (
    <main className={styles.page}>
      <div className={styles.hero}>
        <p className={styles.eyebrow}>Developer Toolkit</p>
        <h1 className={styles.title}>Tools</h1>
        <p className={styles.desc}>
          A small collection of interactive utilities to speed up everyday development.
        </p>
      </div>

      <div className={styles.grid}>
        {TOOLS.map(tool => (
          <Link key={tool.href} href={tool.href} className={styles.card}>
            <div className={styles.cardTop}>
              <div className={styles.cardIcon}>{tool.icon}</div>
              <span className={styles.cardTag}>{tool.tag}</span>
            </div>
            <div className={styles.cardBody}>
              <h2 className={styles.cardTitle}>{tool.title}</h2>
              <p className={styles.cardDesc}>{tool.desc}</p>
            </div>
            <div className={styles.cardFooter}>
              <span className={styles.cardArrow}>
                Open tool
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                </svg>
              </span>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
