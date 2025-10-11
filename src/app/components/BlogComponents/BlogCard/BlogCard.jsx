'use client';

import Link from 'next/link';
import { Eye, Heart, Calendar } from 'lucide-react';
import { memo } from 'react';
import styles from './BlogCard.module.scss';

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
    slug,
    title,
    excerpt,
    image,
    tags = [],
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
  const isRelated = variant === 'related';

  return (
    <article
      className={`${styles.card} ${className}`}
      style={{ '--animation-delay': `${index * 0.1}s` }}
      {...props}
    >
      <Link
        href={`/blog/${slug}`}
        className={isRelated ? styles.relatedLink : styles.link}
      >
        <div className={isRelated ? styles.relatedImageContainer : styles.imageContainer}>
          <img
            src={image}
            alt={title}
            className={isRelated ? styles.relatedImage : styles.image}
            loading="lazy"
            decoding="async"
          />
          {/* Stats in image area - top left */}
          <div className={isRelated ? styles.relatedImageStats : styles.imageStats}>
            <div className={isRelated ? styles.relatedStat : styles.stat}>
              <Eye size={14} />
              <span>
                {statsLoading
                  ? '0'
                  : formatNumbers
                    ? formatNumber(views)
                    : views}
              </span>
            </div>
            <div className={isRelated ? styles.relatedStat : styles.stat}>
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

        <div className={isRelated ? styles.relatedContent : styles.content}>
          <div className={isRelated ? styles.relatedMeta : styles.meta}>
            <span className={isRelated ? styles.relatedDate : styles.date}>
              <Calendar size={14} />
              {date}
            </span>
            <span className={isRelated ? styles.relatedReadTime : styles.readTime}>{readTime} read</span>
          </div>

          <h3 className={isRelated ? styles.relatedTitle : styles.title}>
            {truncateTitle && variant === 'default'
              ? title.length > 50
                ? `${title.substring(0, 50)}...`
                : title
              : title}
          </h3>
          <p className={isRelated ? styles.relatedExcerpt : styles.excerpt}>
            {truncateExcerpt && variant === 'default'
              ? excerpt.length > 100
                ? `${excerpt.substring(0, 100)}...`
                : excerpt
              : excerpt}
          </p>

          {tagsToShow.length > 0 && (
            <div className={isRelated ? styles.relatedTags : styles.tags}>
              {tagsToShow.map(tag => {
                const isMatching = showRelevanceScore && matchingTags.includes(tag.toLowerCase().trim());
                const baseTagClass = isRelated ? styles.relatedTag : styles.tag;
                const tagClassName = isMatching ? `${baseTagClass} ${styles.matchingTag}` : baseTagClass;
                
                return (
                  <span key={tag} className={tagClassName}>
                    {tag}
                  </span>
                );
              })}
              {showRelevanceScore && relevanceScore > 0 && (
                <span className={styles.relevanceIndicator}>
                  {relevanceScore} match{relevanceScore > 1 ? 'es' : ''}
                </span>
              )}
            </div>
          )}

        </div>
      </Link>
    </article>
  );
};

export default memo(BlogCard);
