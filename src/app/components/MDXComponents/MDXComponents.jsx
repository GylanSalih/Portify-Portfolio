// File: MDXComponents.jsx
'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Copy, Check, ExternalLink, Info, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';
import './mdx-styles.scss';

// ===========================
// CodeBlock mit Copy-Funktion
// ===========================
const CodeBlock = ({ children, className, ...props }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const code = children?.toString() || '';
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const language = className?.replace('language-', '') || 'text';

  return (
    <div className="mdx-codeblock-wrapper">
      <div className="mdx-codeblock-header">
        <span className="mdx-codeblock-language">{language}</span>
        <button 
          onClick={handleCopy}
          className="mdx-codeblock-copy"
          title="Code kopieren"
        >
          {copied ? <Check size={16} /> : <Copy size={16} />}
        </button>
      </div>
      <pre className="mdx-codeblock" {...props}>
        <code className={className}>{children}</code>
      </pre>
    </div>
  );
};

// ===========================
// Custom Image Component
// ===========================
const CustomImage = ({ src, alt, width, height, caption, ...props }) => (
  <figure className="mdx-image-figure">
    <div className="mdx-image-wrapper">
      <Image
        src={src}
        alt={alt || ''}
        width={width || 800}
        height={height || 400}
        className="mdx-image"
        {...props}
      />
    </div>
    {caption && <figcaption className="mdx-image-caption">{caption}</figcaption>}
  </figure>
);

// ===========================
// Custom Link Component
// ===========================
const CustomLink = ({ href, children, ...props }) => {
  const isExternal = href?.startsWith('http');
  return (
    <a 
      href={href}
      className={`mdx-link ${isExternal ? 'mdx-link-external' : 'mdx-link-internal'}`}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noopener noreferrer' : undefined}
      {...props}
    >
      {children}
      {isExternal && <ExternalLink size={14} className="mdx-link-icon" />}
    </a>
  );
};

// ===========================
// Callouts / Admonitions
// ===========================
const Callout = ({ type = 'info', children }) => {
  const icons = {
    info: <Info size={20} />,
    warning: <AlertTriangle size={20} />,
    success: <CheckCircle size={20} />,
    error: <XCircle size={20} />,
    tip: <Info size={20} />,
    caution: <AlertTriangle size={20} />,
    important: <CheckCircle size={20} />
  };

  return (
    <div className={`mdx-callout mdx-callout-${type}`}>
      <div className="mdx-callout-icon">{icons[type]}</div>
      <div className="mdx-callout-content">{children}</div>
    </div>
  );
};

// ===========================
// Table Component
// ===========================
const CustomTable = ({ children, ...props }) => (
  <div className="mdx-table-wrapper">
    <table className="mdx-table" {...props}>
      {children}
    </table>
  </div>
);

// ===========================
// Task List Item
// ===========================
const TaskListItem = ({ checked, children }) => (
  <li className="mdx-task-list-item">
    <input type="checkbox" checked={checked} readOnly className="mdx-task-checkbox" />
    <span>{children}</span>
  </li>
);



// ===========================
// Highlight Component
// ===========================
const Highlight = ({ children, color = 'yellow' }) => (
  <mark style={{ backgroundColor: color }}>{children}</mark>
);

// ===========================
// Embedded Media / Content
// ===========================
const Video = ({ src, title, ...props }) => (
  <video controls title={title} {...props}>
    <source src={src} type="video/mp4" />
    Dein Browser unterstützt das Video-Tag nicht.
  </video>
);

const Audio = ({ src, title, ...props }) => (
  <audio controls title={title} {...props}>
    <source src={src} type="audio/mpeg" />
    Dein Browser unterstützt das Audio-Tag nicht.
  </audio>
);

// ===========================
// MDX Components Mapping
// ===========================
export const MDXComponents = {
  // Headings
  h1: (props) => <h1 className="mdx-h1" {...props} />,
  h2: (props) => <h2 className="mdx-h2" {...props} />,
  h3: (props) => <h3 className="mdx-h3" {...props} />,
  h4: (props) => <h4 className="mdx-h4" {...props} />,
  h5: (props) => <h5 className="mdx-h5" {...props} />,
  h6: (props) => <h6 className="mdx-h6" {...props} />,

  // Text Elements
  p: (props) => <p className="mdx-paragraph" {...props} />,
  strong: (props) => <strong className="mdx-strong" {...props} />,
  em: (props) => <em className="mdx-emphasis" {...props} />,
  del: (props) => <del className="mdx-del" {...props} />,
  mark: Highlight,
  kbd: (props) => <kbd className="mdx-kbd" {...props} />,

  // Lists
  ul: (props) => <ul className="mdx-list mdx-list-unordered" {...props} />,
  ol: (props) => <ol className="mdx-list mdx-list-ordered" {...props} />,
  li: TaskListItem,

  // Quotes and Code
  blockquote: (props) => <blockquote className="mdx-blockquote" {...props} />,
  code: (props) => {
    if (props.className?.includes('language-')) return <CodeBlock {...props} />;
    return <code className="mdx-inline-code" {...props} />;
  },
  pre: (props) => {
    if (props.children?.props?.className?.includes('language-')) return <CodeBlock {...props.children.props} />;
    return <pre className="mdx-codeblock" {...props} />;
  },

  // Links and Images
  a: CustomLink,
  img: CustomImage,

  // Tables
  table: CustomTable,
  thead: (props) => <thead className="mdx-table-head" {...props} />,
  tbody: (props) => <tbody className="mdx-table-body" {...props} />,
  tr: (props) => <tr className="mdx-table-row" {...props} />,
  th: (props) => <th className="mdx-table-header" {...props} />,
  td: (props) => <td className="mdx-table-cell" {...props} />,

  // Horizontal Rule
  hr: (props) => <hr className="mdx-divider" {...props} />,

  // Details / Accordion
  details: (props) => <details className="mdx-details" {...props} />,
  summary: (props) => <summary className="mdx-summary" {...props} />,



  // Embedded Media
  Video,
  Audio,

  // Callouts / Admonitions
  Callout,
  Note: ({ children }) => <Callout type="info">{children}</Callout>,
  Warning: ({ children }) => <Callout type="warning">{children}</Callout>,
  Success: ({ children }) => <Callout type="success">{children}</Callout>,
  Error: ({ children }) => <Callout type="error">{children}</Callout>,
  Tip: ({ children }) => <Callout type="tip">{children}</Callout>,
  Caution: ({ children }) => <Callout type="caution">{children}</Callout>,
  Important: ({ children }) => <Callout type="important">{children}</Callout>,
};

export default MDXComponents;
