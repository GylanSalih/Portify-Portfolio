// File: MDXComponents.jsx
/* eslint-disable @next/next/no-img-element */
/* eslint-disable no-unused-vars */
'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Copy, Check, ExternalLink, Info, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';
import { Highlight, themes } from 'prism-react-renderer';
import './mdx-styles.scss';

// ===========================
// CodeBlock mit Copy-Funktion und Syntax-Highlighting
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
  const code = children?.toString().trim() || '';

  return (
    <Highlight
      theme={themes.vsDark}
      code={code}
      language={language}
    >
      {({ className: highlightClassName, style, tokens, getLineProps, getTokenProps }) => (
        <div className="mdx-codeblock-wrapper">
          <div className="mdx-codeblock-header">
            <span className="mdx-codeblock-language">{language}</span>
            <button 
              onClick={handleCopy}
              className="mdx-codeblock-copy"
              title="Code kopieren"
              aria-label="Code kopieren"
            >
              {copied ? <Check size={14} /> : <Copy size={14} />}
            </button>
          </div>
          <pre className={`mdx-codeblock ${highlightClassName}`} style={style} {...props}>
            <code>
              {tokens.map((line, i) => (
                <div key={i} {...getLineProps({ line })} className="code-line">
                  <span className="line-number">{i + 1}</span>
                  <span className="line-content">
                    {line.map((token, key) => (
                      <span key={key} {...getTokenProps({ token })} />
                    ))}
                  </span>
                </div>
              ))}
            </code>
          </pre>
        </div>
      )}
    </Highlight>
  );
};

// ===========================
// Custom Image Component
// ===========================
const CustomImage = ({ src, alt, width, height, caption, node, ...props }) => {
  // For regular markdown images - just return img to avoid p > figure nesting error
  if (node) {
    return (
      <img
        src={src}
        alt={alt || ''}
        className="mdx-image"
        loading="lazy"
        style={{ maxWidth: '100%', height: 'auto', borderRadius: '0.5rem', margin: '1rem 0' }}
        {...props}
      />
    );
  }
  
  // For custom images with Next.js Image component
  return (
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
};

// ===========================
// Custom Link Component (Shadcn-style)
// ===========================  
const CustomLink = ({ href, children, node, ...props }) => {
  const isExternal = href?.startsWith('http');
  
  // Always render external links as buttons for clean, modern look
  if (isExternal) {
    return (
      <a 
        href={href}
        className="mdx-link-button"
        target="_blank"
        rel="noopener noreferrer"
        {...props}
      >
        {children}
        <ExternalLink size={16} className="mdx-link-button-icon" />
      </a>
    );
  }
  
  // Internal link (anchors, etc)
  return (
    <a 
      href={href}
      className="mdx-link mdx-link-internal"
      {...props}
    >
      {children}
    </a>
  );
};

// ===========================
// Enhanced Blockquote (detects callout types)
// ===========================
const EnhancedBlockquote = ({ children, node, ...props }) => {
  // Helper function to extract text from nested children
  const extractText = (child) => {
    if (typeof child === 'string') return child;
    if (Array.isArray(child)) return child.map(extractText).join('');
    if (child?.props?.children) return extractText(child.props.children);
    return '';
  };

  const textContent = extractText(children);
  
  const calloutTypes = {
    'Note:': { type: 'note', icon: <Info size={18} /> },
    'Warning:': { type: 'warning', icon: <AlertTriangle size={18} /> },
    'Success:': { type: 'success', icon: <CheckCircle size={18} /> },
    'Error:': { type: 'error', icon: <XCircle size={18} /> },
    'Tip:': { type: 'tip', icon: <Info size={18} /> },
    'Caution:': { type: 'caution', icon: <AlertTriangle size={18} /> },
    'Important:': { type: 'important', icon: <CheckCircle size={18} /> }
  };

  // Check if this is a callout
  let calloutConfig = null;
  for (const [prefix, config] of Object.entries(calloutTypes)) {
    if (textContent.includes(prefix)) {
      calloutConfig = config;
      break;
    }
  }

  if (calloutConfig) {
    return (
      <div className={`mdx-callout mdx-callout-${calloutConfig.type}`}>
        <div className="mdx-callout-icon">{calloutConfig.icon}</div>
        <div className="mdx-callout-content">{children}</div>
      </div>
    );
  }

  // Regular blockquote
  return <blockquote className="mdx-blockquote" {...props}>{children}</blockquote>;
};

// ===========================
// Callouts / Admonitions (for JSX usage)
// ===========================
const Callout = ({ type = 'info', children }) => {
  const icons = {
    info: <Info size={18} />,
    warning: <AlertTriangle size={18} />,
    success: <CheckCircle size={18} />,
    error: <XCircle size={18} />,
    tip: <Info size={18} />,
    caution: <AlertTriangle size={18} />,
    important: <CheckCircle size={18} />
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
// List Item (handles both regular and task list items)
// ===========================
const ListItem = ({ children, checked, ...props }) => {
  // Task list item
  if (checked !== null && checked !== undefined) {
    return (
      <li className="mdx-task-list-item" {...props}>
        <input type="checkbox" checked={checked} readOnly className="mdx-task-checkbox" />
        <span>{children}</span>
      </li>
    );
  }
  // Regular list item
  return <li className="mdx-list-item" {...props}>{children}</li>;
};



// ===========================
// MarkHighlight Component
// ===========================
const MarkHighlight = ({ children, color = 'yellow' }) => (
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
  h1: ({ node, ...props }) => <h1 className="mdx-h1" {...props} />,
  h2: ({ node, ...props }) => <h2 className="mdx-h2" {...props} />,
  h3: ({ node, ...props }) => <h3 className="mdx-h3" {...props} />,
  h4: ({ node, ...props }) => <h4 className="mdx-h4" {...props} />,
  h5: ({ node, ...props }) => <h5 className="mdx-h5" {...props} />,
  h6: ({ node, ...props }) => <h6 className="mdx-h6" {...props} />,

  // Text Elements
  p: ({ node, ...props }) => <p className="mdx-paragraph" {...props} />,
  strong: ({ node, ...props }) => <strong className="mdx-strong" {...props} />,
  em: ({ node, ...props }) => <em className="mdx-emphasis" {...props} />,
  del: ({ node, ...props }) => <del className="mdx-del" {...props} />,
  mark: MarkHighlight,
  kbd: ({ node, ...props }) => <kbd className="mdx-kbd" {...props} />,

  // Lists
  ul: ({ node, ...props }) => <ul className="mdx-list mdx-list-unordered" {...props} />,
  ol: ({ node, ...props }) => <ol className="mdx-list mdx-list-ordered" {...props} />,
  li: ListItem,

  // Quotes and Code
  blockquote: EnhancedBlockquote,
  code: ({ node, inline, className, children, ...props }) => {
    // Check if it's a code block (has language) or inline code
    if (!inline && className?.includes('language-')) {
      return <CodeBlock className={className} {...props}>{children}</CodeBlock>;
    }
    // Inline code
    return <code className="mdx-inline-code" {...props}>{children}</code>;
  },
  pre: ({ children }) => {
    // react-markdown wraps code blocks in pre, we handle it in the code component
    return <>{children}</>;
  },

  // Links and Images
  a: CustomLink,
  img: CustomImage,

  // Tables
  table: ({ node, ...props }) => <CustomTable {...props} />,
  thead: ({ node, ...props }) => <thead className="mdx-table-head" {...props} />,
  tbody: ({ node, ...props }) => <tbody className="mdx-table-body" {...props} />,
  tr: ({ node, ...props }) => <tr className="mdx-table-row" {...props} />,
  th: ({ node, ...props }) => <th className="mdx-table-header" {...props} />,
  td: ({ node, ...props }) => <td className="mdx-table-cell" {...props} />,

  // Horizontal Rule
  hr: ({ node, ...props }) => <hr className="mdx-divider" {...props} />,

  // Details / Accordion
  details: ({ node, ...props }) => <details className="mdx-details" {...props} />,
  summary: ({ node, ...props }) => <summary className="mdx-summary" {...props} />,



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
