// File: BlogPost.jsx
'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { useBlogStats } from '../../../hooks/useBlogStats';
import {
  formatNumber,
} from '../../../lib/blogUtils';
import BlogMightLike from '../BlogMightLike/blogmightlike';
import LikeButton from '../LikeButton';
import { Clock, Eye, Calendar } from 'lucide-react';
import Image from 'next/image';
import { MDXSection } from '../../MDXComponents/MDXRenderer';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { MDXComponents } from '../../MDXComponents/MDXComponents';
import styles from './BlogPost.module.scss';
import '../../MDXComponents/mdx-styles.scss';

const BlogPost = ({ data = null, mdxContent = null }) => {
  const { slug } = useParams();
  const [post, setPost] = useState(data);
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [viewProcessed, setViewProcessed] = useState(false);

  // Supabase Stats Hook
  const {
    stats,
    loading: statsLoading,
    incrementViews,
    incrementLikes,
  } = useBlogStats(slug);

  // Lade MDX-Post über die API (nur wenn keine data prop übergeben wurde)
  useEffect(() => {
    // Wenn bereits Daten übergeben wurden (MDX), lade keine neuen Daten
    if (data) {
      return;
    }

    const loadPostData = async () => {
      try {
        // Versuche zuerst den spezifischen Post zu laden
        const response = await fetch(`/api/blog/mdx/${slug}`);
        if (response.ok) {
          const postData = await response.json();
          setPost(postData);
        } else {
          // Fallback: Lade alle MDX-Posts und nimm den ersten
          const allPostsResponse = await fetch('/api/blog/mdx');
          if (allPostsResponse.ok) {
            const allPosts = await allPostsResponse.json();
            if (allPosts.length > 0) {
              setPost(allPosts[0]);
            }
          }
        }
      } catch (error) {
        console.error('Error loading MDX post:', error);
        // Kein weiterer Fallback - zeige Loading-Zustand
      }
    };

    loadPostData();
  }, [slug, data]);

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



  // Kategorie-basierte Related Posts Logik (MDX-basiert)
  useEffect(() => {
    const loadRelatedPosts = async () => {
      try {
        // Lade MDX-Posts direkt aus der statischen JSON-Datei
        const response = await fetch('/data/generated-blog-data.json');
        if (!response.ok) {
          console.error('Failed to fetch blog data for related posts');
          return;
        }
        const allPosts = await response.json();

        if (!post) return;

        const currentPostCategory = post.category;
        
        // Helper function to shuffle array (Fisher-Yates Shuffle)
        const shuffleArray = (array) => {
          const shuffled = [...array];
          for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
          }
          return shuffled;
        };
        
        // Get posts from same category (excluding current post)
        const sameCategoryPosts = allPosts
          .filter(p => p.slug !== slug && p.category === currentPostCategory);
        
        // Shuffle and take up to 4 posts
        const shuffledSameCategory = shuffleArray(sameCategoryPosts);
        const related = shuffledSameCategory.slice(0, 4);
        
        // If not enough posts in same category, fill with other posts
        if (related.length < 4) {
          const otherPosts = allPosts
            .filter(p => p.slug !== slug && p.category !== currentPostCategory);
          
          const shuffledOtherPosts = shuffleArray(otherPosts);
          const additionalPosts = shuffledOtherPosts.slice(0, 4 - related.length);
          
          related.push(...additionalPosts);
        }

        // MDX-Posts sind bereits verarbeitet, keine weitere Verarbeitung nötig
        setRelatedPosts(related);
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
            {post.date && (
              <div className={styles.metaItem}>
                <Calendar className={styles.metaIcon} />
                <span>{post.date}</span>
              </div>
            )}
            {post.readTime && (
              <div className={styles.metaItem}>
                <Clock className={styles.metaIcon} />
                <span>{post.readTime}</span>
              </div>
            )}
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
        </div>
      </header>

      {/* Main Content */}
      <div className={styles.content}>
        <main className={styles.articleMain}>
          <article className={styles.articleContent}>
            {mdxContent ? (
              // Render MDX Content with react-markdown
              <div className={`${styles.mdxContent} mdx-content`}>
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  rehypePlugins={[rehypeRaw]}
                  components={MDXComponents}
                >
                  {mdxContent}
                </ReactMarkdown>
              </div>
            ) : (
              // Render traditional JSON content
              post.content.map((section, index) => (
                <MDXSection
                  key={section.sectionId || index}
                  section={section}
                  className={styles.contentSection}
                />
              ))
            )}
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
                  src='/assets/images/blog/author.webp'
                  alt={post.author}
                  width={64}
                  height={64}
                  className={styles.authorImage}
                />
              </div>
              <div className={styles.authorInfo}>
                <h4 className={styles.authorName}>Gylan Salih</h4>
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
      />
    </div>
  );
};

export default BlogPost;
