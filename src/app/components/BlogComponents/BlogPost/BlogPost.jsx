// File: BlogPost.jsx
'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { useBlogStats } from '../../../hooks/useBlogStats';
import {
  formatNumber,
  processBlogPostData,
  processMultipleBlogPosts,
} from '../../../lib/blogUtils';
import BlogMightLike from '../BlogMightLike/blogmightlike';
import LikeButton from '../LikeButton';
import { Clock, Eye } from 'lucide-react';
import Image from 'next/image';
import styles from './BlogPost.module.scss';

const BlogPost = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [viewProcessed, setViewProcessed] = useState(false);

  // Supabase Stats Hook
  const {
    stats,
    loading: statsLoading,
    incrementViews,
    incrementLikes,
  } = useBlogStats(slug);

  // Lade Aktuelle Blog-Posts aus blogpost.json
  useEffect(() => {
    const loadPostData = async () => {
      try {
        const response = await fetch('/data/blogpost.json');
        const posts = await response.json();
        const selectedPost = posts.find(post => post.slug === slug);

        if (selectedPost) {
          // Verwende die neue Utility-Funktion
          const postWithProcessedContent = await processBlogPostData(
            selectedPost,
            posts
          );
          setPost(postWithProcessedContent);
        } else {
          setPost(posts[0]);
        }
      } catch (error) {
        console.error('Error loading post data:', error);
      }
    };

    loadPostData();
  }, [slug]);

  // Verbesserte View Counter Logic
  useEffect(() => {
    if (!post || statsLoading || viewProcessed) return;

    const sessionKey = `blog_viewed_${slug}`;
    let hasViewedInSession = false;

    try {
      if (typeof window !== 'undefined' && window.sessionStorage) {
        hasViewedInSession = sessionStorage.getItem(sessionKey) === 'true';
      }
    } catch (error) {
      console.warn('SessionStorage not available, using in-memory tracking');
      hasViewedInSession = window.__viewedPosts?.includes(slug) || false;
    }

    if (!hasViewedInSession) {
      console.log('Incrementing view for post:', post.slug);
      setViewProcessed(true);

      incrementViews()
        .then(() => {
          try {
            if (typeof window !== 'undefined' && window.sessionStorage) {
              sessionStorage.setItem(sessionKey, 'true');
            } else {
              if (!window.__viewedPosts) window.__viewedPosts = [];
              window.__viewedPosts.push(slug);
            }
          } catch (error) {
            console.warn('Could not save view state:', error);
          }
        })
        .catch(error => {
          console.error('Error incrementing views:', error);
          setViewProcessed(false);
        });
    } else {
      setViewProcessed(true);
    }
  }, [post, statsLoading, slug, viewProcessed, incrementViews]);



  // Verbesserte "You might also like"-Posts Logik
  useEffect(() => {
    const loadRelatedPosts = async () => {
      try {
        const response = await fetch('/data/bloggrid.json');
        const allPosts = await response.json();

        if (!post) return;

        console.log('Current post:', post.title);
        console.log('Current post tags:', post.tags);

        // Filtere aktuellen Post aus
        const otherPosts = allPosts.filter(p => p.slug !== slug);
        console.log('Other posts count:', otherPosts.length);

        let relatedByTags = [];
        let randomPosts = [];

        // Wenn der aktuelle Post Tags hat, suche ähnliche Posts
        if (post.tags && post.tags.length > 0) {
          relatedByTags = otherPosts
            .filter(p => {
              if (!p.tags || !Array.isArray(p.tags)) return false;
              const hasCommonTag = p.tags.some(tag => post.tags.includes(tag));
              if (hasCommonTag) {
                console.log(
                  `Found related post: ${p.title} with tags:`,
                  p.tags
                );
              }
              return hasCommonTag;
            })
            .sort((a, b) => {
              // Sortiere nach Anzahl gemeinsamer Tags (absteigend)
              const aCommonTags = a.tags.filter(tag =>
                post.tags.includes(tag)
              ).length;
              const bCommonTags = b.tags.filter(tag =>
                post.tags.includes(tag)
              ).length;
              return bCommonTags - aCommonTags;
            });
        }

        console.log('Related posts by tags:', relatedByTags.length);

        // Fülle mit zufälligen Posts auf, falls nicht genug ähnliche Posts vorhanden
        const remainingPosts = otherPosts.filter(
          p => !relatedByTags.includes(p)
        );
        randomPosts = remainingPosts
          .sort(() => Math.random() - 0.5) // Zufällige Sortierung
          .slice(0, 4 - relatedByTags.length);

        // Kombiniere ähnliche und zufällige Posts (max. 4)
        const finalRelatedPosts = [...relatedByTags, ...randomPosts].slice(
          0,
          4
        );

        // Verwende die neue Utility-Funktion für mehrere Posts
        const postsWithProcessedContent =
          await processMultipleBlogPosts(finalRelatedPosts);

        console.log(
          'Final related posts with processed content:',
          postsWithProcessedContent.map(p => ({
            title: p.title,
            readTime: p.readTime,
            excerpt: p.excerpt,
          }))
        );
        setRelatedPosts(postsWithProcessedContent);
      } catch (error) {
        console.error('Error loading related posts:', error);
      }
    };

    if (post) {
      loadRelatedPosts();
    }
  }, [post, slug]);

  if (!post)
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loadingSpinner}>Lade...</div>
      </div>
    );

  return (
    <div className={styles.container}>
      {/* Hero Section */}
      <header className={styles.hero}>
        <div className={styles.heroContainer}>
          <div className={styles.heroMeta}>
            <div className={styles.metaItem}>
              <Clock className={styles.metaIcon} />
              <span>{post.readTime}</span>
            </div>
            <div className={styles.metaItem}>
              <Eye className={styles.metaIcon} />
              <span>
                {statsLoading ? '0' : formatNumber(stats.views)} Aufrufe
              </span>
            </div>
            <div className={styles.metaItem}>
              <span>❤️</span>
              <span>
                {statsLoading ? '0' : formatNumber(stats.likes)} Likes
              </span>
            </div>
          </div>
          <h1 className={styles.heroTitle}>{post.title}</h1>
          {post.excerpt && <p className={styles.heroSubtitle}>{post.excerpt}</p>}
        </div>
      </header>

      {/* Main Content */}
      <div className={styles.content}>
        <main className={styles.articleMain}>
          <article className={styles.articleContent}>
            {post.content.map((section, index) => (
              <div
                key={section.sectionId || index}
                className={styles.contentSection}
                dangerouslySetInnerHTML={{ __html: section.content }}
              />
            ))}
          </article>

          {/* Article Footer */}
          <footer className={styles.articleFooter}>
            {/* Like Section */}
            <div className={styles.likeSection}>
              <LikeButton
                slug={slug}
                stats={stats}
                statsLoading={statsLoading}
                incrementLikes={incrementLikes}
              />
            </div>

            {/* Tags Section */}
            {post.tags && post.tags.length > 0 && (
              <div className={styles.tagsSection}>
                <div className={styles.tagsHeader}>
                  <h3>Tags</h3>
                </div>
                <div className={styles.tagsList}>
                  {post.tags.map((tag, index) => (
                    <span key={index} className={styles.tag}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Author Card */}
            <div className={styles.authorCard}>
              <div className={styles.authorAvatar}>
                <Image
                  src={post.authorImage || '/assets/images/blog/author.webp'}
                  alt={post.author}
                  width={64}
                  height={64}
                  className={styles.authorImage}
                />
              </div>
              <div className={styles.authorInfo}>
                <h4 className={styles.authorName}>{post.author}</h4>
                <p className={styles.authorBio}>
                  Full-Stack Developer und UI/UX Designer mit Leidenschaft für
                  schöne, funktionale digitale Erlebnisse mit modernen
                  Web-Technologien.
                </p>
              </div>
            </div>
          </footer>
        </main>
      </div>

      {/* Related Posts */}
      <BlogMightLike
        relatedPosts={relatedPosts}
        currentPostTags={post.tags || []}
        currentPostSlug={post.slug}
      />
    </div>
  );
};

export default BlogPost;
