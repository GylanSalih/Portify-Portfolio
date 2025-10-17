// File: MDXRenderer.jsx
'use client';

import React from 'react';
import { MDXProvider } from './MDXProvider';

/* ===================== Parsing Utilities ===================== */

/** Handle Custom Callouts */
const handleCallouts = (content) =>
  content
    .replace(
      /<Note>(.*?)<\/Note>/gs,
      '<div class="mdx-callout mdx-callout-info"><div class="mdx-callout-icon">ℹ️</div><div class="mdx-callout-content">$1</div></div>'
    )
    .replace(
      /<Warning>(.*?)<\/Warning>/gs,
      '<div class="mdx-callout mdx-callout-warning"><div class="mdx-callout-icon">⚠️</div><div class="mdx-callout-content">$1</div></div>'
    )
    .replace(
      /<Success>(.*?)<\/Success>/gs,
      '<div class="mdx-callout mdx-callout-success"><div class="mdx-callout-icon">✅</div><div class="mdx-callout-content">$1</div></div>'
    )
    .replace(
      /<Error>(.*?)<\/Error>/gs,
      '<div class="mdx-callout mdx-callout-error"><div class="mdx-callout-icon">❌</div><div class="mdx-callout-content">$1</div></div>'
    );

/** Handle Code Blocks */
const handleCodeBlocks = (content) =>
  content.replace(/```(\w+)?\n([\s\S]*?)```/g, (match, lang, code) => {
    const language = lang || 'text';
    return `
      <div class="mdx-codeblock-wrapper">
        <div class="mdx-codeblock-header">
          <span class="mdx-codeblock-language">${language}</span>
        </div>
        <pre class="mdx-codeblock"><code class="language-${language}">${code.trim()}</code></pre>
      </div>
    `;
  });

/** Handle Inline Code */
const handleInlineCode = (content) =>
  content.replace(/`([^`]+)`/g, '<code class="mdx-inline-code">$1</code>');

/** Handle Headings */
const handleHeadings = (content) =>
  content
    .replace(/^### (.*)$/gm, '<h3 class="mdx-h3">$1</h3>')
    .replace(/^## (.*)$/gm, '<h2 class="mdx-h2">$1</h2>')
    .replace(/^# (.*)$/gm, '<h1 class="mdx-h1">$1</h1>');

/** Handle Blockquotes */
const handleBlockquotes = (content) =>
  content.replace(/^> (.*)$/gm, '<blockquote class="mdx-blockquote"><p>$1</p></blockquote>');

/** Handle Bold & Italic */
const handleTextFormatting = (content) =>
  content
    .replace(/\*\*(.*?)\*\*/g, '<strong class="mdx-strong">$1</strong>')
    .replace(/\*(.*?)\*/g, '<em class="mdx-emphasis">$1</em>');

/** Handle Links */
const handleLinks = (content) =>
  content.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (match, text, url) => {
    const isExternal = url.startsWith('http');
    return `<a href="${url}" class="mdx-link ${isExternal ? 'mdx-link-external' : 'mdx-link-internal'}"${
      isExternal ? ' target="_blank" rel="noopener noreferrer"' : ''
    }>${text}</a>`;
  });

/** Handle Markdown Tables */
const handleTables = (content) =>
  content.replace(
    /^\|(.+)\|\s*\n\|([-:\s|]+)\|\s*\n((\|.*\|\s*\n?)*)/gm,
    (match, headerLine, separatorLine, rows) => {
      const headers = headerLine.split('|').map(h => h.trim()).filter(Boolean);
      const rowHtml = rows
        .trim()
        .split('\n')
        .map(row => {
          const cells = row.split('|').map(c => c.trim()).filter(Boolean);
          return `<tr>${cells.map(c => `<td class="mdx-table-cell">${c}</td>`).join('')}</tr>`;
        })
        .join('');

      return `<div class="mdx-table-wrapper">
        <table class="mdx-table">
          <thead><tr>${headers.map(h => `<th class="mdx-table-header">${h}</th>`).join('')}</tr></thead>
          <tbody>${rowHtml}</tbody>
        </table>
      </div>`;
    }
  );

/** Handle Paragraphs */
const handleParagraphs = (content) =>
  content
    .split('\n\n')
    .map((paragraph) => {
      const trimmed = paragraph.trim();
      if (!trimmed) return '';
      if (trimmed.startsWith('<') && trimmed.endsWith('>')) return trimmed;
      if (trimmed.match(/^(#{1,6}\s|>\s|\*\s|\d+\.\s)/)) return trimmed;
      return `<p class="mdx-paragraph">${trimmed}</p>`;
    })
    .join('\n\n');

/* ===================== Main Parser ===================== */

const parseMDXContent = (content) => {
  if (!content) return '';
  let processed = content;

  // Reihenfolge wichtig: Callouts → Codeblocks → InlineCode → Headings → Blockquotes → Textformatting → Links → Tables → Paragraphs
  processed = handleCallouts(processed);
  processed = handleCodeBlocks(processed);
  processed = handleInlineCode(processed);
  processed = handleHeadings(processed);
  processed = handleBlockquotes(processed);
  processed = handleTextFormatting(processed);
  processed = handleLinks(processed);
  processed = handleTables(processed);
  processed = handleParagraphs(processed);

  return processed;
};

/* ===================== React Components ===================== */

/** MDXRenderer: rendert den MDX-Content als HTML */
export const MDXRenderer = ({ content, className = '' }) => {
  const processedContent = parseMDXContent(content);

  return (
    <MDXProvider>
      <div className={`mdx-content ${className}`} dangerouslySetInnerHTML={{ __html: processedContent }} />
    </MDXProvider>
  );
};

/** MDXSection: rendert einen Abschnitt mit MDXContent */
export const MDXSection = ({ section, className = '' }) => {
  if (!section || !section.content) return null;

  return (
    <div className={`mdx-section ${className}`} id={section.sectionId}>
      <MDXRenderer content={section.content} />
    </div>
  );
};

export default MDXRenderer;
