'use client';

import Link from 'next/link';
import { Eye, Heart, Calendar } from 'lucide-react';
import { memo } from 'react';
import './BlogCard.css';

// Einfache formatNumber Funktion für die BlogCard
const formatNumber = num => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toString();
};

const BlogCard = ({
  post,
  index = 0,
  variant = 'default', // 'default' oder 'related'
  showRelevanceScore = false,
  truncateTitle = false,
  truncateExcerpt = false,
  formatNumbers = false,
  className = '',
  ...props
}) => {
  const {
    id,
    slug,
    title,
    excerpt,
    image,
    tags = [],
    author,
    authorImage,
    date,
    readTime,
    views = 0,
    likes = 0,
    matchingTags = [],
    relevanceScore = 0,
    statsLoading = false,
  } = post;

  // Bestimme welche Tags angezeigt werden sollen
  const tagsToShow =
    showRelevanceScore && matchingTags.length > 0
      ? tags.filter(tag => matchingTags.includes(tag.toLowerCase().trim()))
      : tags.slice(0, variant === 'related' ? 2 : 3);

  // CSS-Klassen basierend auf Variant
  const cardClassName = `blog-card ${variant === 'related' ? 'related' : 'default'} ${className}`;
  const imageContainerClass =
    variant === 'related'
      ? 'related-post-image-container'
      : 'blog-post-image-container';
  const contentClass =
    variant === 'related' ? 'related-post-content' : 'blog-post-content';
  const titleClass =
    variant === 'related' ? 'related-post-title' : 'blog-post-title';
  const excerptClass =
    variant === 'related' ? 'related-post-excerpt' : 'blog-post-excerpt';
  const tagsClass =
    variant === 'related' ? 'related-post-tags' : 'blog-post-tags';
  const tagClass = variant === 'related' ? 'related-post-tag' : 'blog-post-tag';
  const metaClass =
    variant === 'related' ? 'related-post-meta' : 'blog-post-meta';
  const dateClass =
    variant === 'related' ? 'related-post-date' : 'blog-post-date';
  const readTimeClass =
    variant === 'related' ? 'related-post-readtime' : 'blog-post-readtime';
  const footerClass =
    variant === 'related' ? 'related-post-footer' : 'blog-post-footer';
  const authorClass =
    variant === 'related' ? 'related-post-author' : 'blog-post-author';
  const authorImageClass =
    variant === 'related'
      ? 'related-post-author-image'
      : 'blog-post-author-image';
  const authorNameClass =
    variant === 'related'
      ? 'related-post-author-name'
      : 'blog-post-author-name';
  const statsClass =
    variant === 'related' ? 'related-post-stats' : 'blog-post-stats';
  const statClass =
    variant === 'related' ? 'related-post-stat' : 'blog-post-stat';
  const overlayClass =
    variant === 'related' ? 'related-post-overlay' : 'blog-post-overlay';
  const readIndicatorClass =
    variant === 'related' ? 'related-read-indicator' : 'blog-read-indicator';
  const arrowIconClass =
    variant === 'related' ? 'related-arrow-icon' : 'blog-arrow-icon';

  return (
    <article
      className={cardClassName}
      style={{ '--animation-delay': `${index * 0.1}s` }}
      {...props}
    >
      <Link
        href={`/blog/${slug}`}
        className={
          variant === 'related' ? 'related-post-link' : 'blog-post-link'
        }
      >
        <div className={imageContainerClass}>
          <img
            src={image}
            alt={title}
            className={
              variant === 'related' ? 'related-post-image' : 'blog-post-image'
            }
            loading="lazy"
            decoding="async"
          />
          <div className={overlayClass}>
            <div className={readIndicatorClass}>
              <span>Read Article</span>
              <div className={arrowIconClass}>→</div>
            </div>
          </div>
        </div>

        <div className={contentClass}>
          <div className={metaClass}>
            <span className={dateClass}>
              <Calendar size={14} />
              {date}
            </span>
            <span className={readTimeClass}>{readTime} read</span>
          </div>

          <h3 className={titleClass}>
            {truncateTitle && variant === 'default'
              ? title.length > 50
                ? `${title.substring(0, 50)}...`
                : title
              : title}
          </h3>
          <p className={excerptClass}>
            {truncateExcerpt && variant === 'default'
              ? excerpt.length > 100
                ? `${excerpt.substring(0, 100)}...`
                : excerpt
              : excerpt}
          </p>

          {tagsToShow.length > 0 && (
            <div className={tagsClass}>
              {tagsToShow.map(tag => (
                <span
                  key={tag}
                  className={`${tagClass} ${
                    showRelevanceScore &&
                    matchingTags.includes(tag.toLowerCase().trim())
                      ? 'matching-tag'
                      : ''
                  }`}
                >
                  {tag}
                </span>
              ))}
              {showRelevanceScore && relevanceScore > 0 && (
                <span className="relevance-indicator">
                  {relevanceScore} match{relevanceScore > 1 ? 'es' : ''}
                </span>
              )}
            </div>
          )}

          <div className={footerClass}>
            <div className={authorClass}>
              <img
                src={authorImage || '/assets/images/blog/author.webp'}
                alt={author}
                className={authorImageClass}
                loading="lazy"
                decoding="async"
              />
              <div>
                <p className={authorNameClass}>{author}</p>
              </div>
            </div>

            <div className={statsClass}>
              <div className={statClass}>
                <Eye size={14} />
                <span>
                  {statsLoading
                    ? '0'
                    : formatNumbers
                      ? formatNumber(views)
                      : views}
                </span>
              </div>
              <div className={statClass}>
                <Heart size={14} />
                <span>
                  {statsLoading
                    ? '0'
                    : formatNumbers
                      ? formatNumber(likes)
                      : likes}
                </span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </article>
  );
};

export default memo(BlogCard);
