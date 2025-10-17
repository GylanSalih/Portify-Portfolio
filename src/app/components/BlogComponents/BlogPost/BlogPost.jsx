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
import { Clock, Eye } from 'lucide-react';
import Image from 'next/image';
import { MDXSection } from '../../MDXComponents/MDXRenderer';
import { marked } from 'marked';
import styles from './BlogPost.module.scss';
import '../../MDXComponents/mdx-styles.scss';

// Function to add MDX CSS classes to HTML content
const addMDXClasses = (htmlContent) => {
  return htmlContent
    // Headings
    .replace(/<h1([^>]*)>/g, '<h1 class="mdx-h1"$1>')
    .replace(/<h2([^>]*)>/g, '<h2 class="mdx-h2"$1>')
    .replace(/<h3([^>]*)>/g, '<h3 class="mdx-h3"$1>')
    .replace(/<h4([^>]*)>/g, '<h4 class="mdx-h4"$1>')
    .replace(/<h5([^>]*)>/g, '<h5 class="mdx-h5"$1>')
    .replace(/<h6([^>]*)>/g, '<h6 class="mdx-h6"$1>')
    
    // Paragraphs
    .replace(/<p([^>]*)>/g, '<p class="mdx-paragraph"$1>')
    
    // Lists
    .replace(/<ul([^>]*)>/g, '<ul class="mdx-list mdx-list-unordered"$1>')
    .replace(/<ol([^>]*)>/g, '<ol class="mdx-list mdx-list-ordered"$1>')
    .replace(/<li([^>]*)>/g, '<li class="mdx-list-item"$1>')
    
    // Links
    .replace(/<a([^>]*)>/g, '<a class="mdx-link"$1>')
    
    // Code
    .replace(/<code([^>]*)>/g, '<code class="mdx-inline-code"$1>')
    .replace(/<pre([^>]*)>/g, '<pre class="mdx-codeblock"$1>')
    
    // Blockquotes
    .replace(/<blockquote([^>]*)>/g, '<blockquote class="mdx-blockquote"$1>')
    
    // Tables
    .replace(/<table([^>]*)>/g, '<div class="mdx-table-wrapper"><table class="mdx-table"$1>')
    .replace(/<\/table>/g, '</table></div>')
    .replace(/<thead([^>]*)>/g, '<thead class="mdx-table-head"$1>')
    .replace(/<tbody([^>]*)>/g, '<tbody class="mdx-table-body"$1>')
    .replace(/<tr([^>]*)>/g, '<tr class="mdx-table-row"$1>')
    .replace(/<th([^>]*)>/g, '<th class="mdx-table-header"$1>')
    .replace(/<td([^>]*)>/g, '<td class="mdx-table-cell"$1>')
    
    // Horizontal rule
    .replace(/<hr([^>]*)>/g, '<hr class="mdx-divider"$1>')
    
    // Strong and emphasis
    .replace(/<strong([^>]*)>/g, '<strong class="mdx-strong"$1>')
    .replace(/<em([^>]*)>/g, '<em class="mdx-emphasis"$1>')
    
    // Details/Summary
    .replace(/<details([^>]*)>/g, '<details class="mdx-details"$1>')
    .replace(/<summary([^>]*)>/g, '<summary class="mdx-summary"$1>')
    
    // Callouts (Note, Warning, Success, Error, Tip, Caution, Important)
    .replace(/<Note>([\s\S]*?)<\/Note>/g, '<div class="mdx-callout mdx-callout-info"><div class="mdx-callout-icon">ℹ️</div><div class="mdx-callout-content">$1</div></div>')
    .replace(/<Warning>([\s\S]*?)<\/Warning>/g, '<div class="mdx-callout mdx-callout-warning"><div class="mdx-callout-icon">⚠️</div><div class="mdx-callout-content">$1</div></div>')
    .replace(/<Success>([\s\S]*?)<\/Success>/g, '<div class="mdx-callout mdx-callout-success"><div class="mdx-callout-icon">✅</div><div class="mdx-callout-content">$1</div></div>')
    .replace(/<Error>([\s\S]*?)<\/Error>/g, '<div class="mdx-callout mdx-callout-error"><div class="mdx-callout-icon">❌</div><div class="mdx-callout-content">$1</div></div>')
    .replace(/<Tip>([\s\S]*?)<\/Tip>/g, '<div class="mdx-callout mdx-callout-tip"><div class="mdx-callout-icon">💡</div><div class="mdx-callout-content">$1</div></div>')
    .replace(/<Caution>([\s\S]*?)<\/Caution>/g, '<div class="mdx-callout mdx-callout-caution"><div class="mdx-callout-icon">⚠️</div><div class="mdx-callout-content">$1</div></div>')
    .replace(/<Important>([\s\S]*?)<\/Important>/g, '<div class="mdx-callout mdx-callout-important"><div class="mdx-callout-icon">❗</div><div class="mdx-callout-content">$1</div></div>')
    
    // CustomImage components
    .replace(/<CustomImage\s+([^>]*?)\/>/g, (match, attrs) => {
      const srcMatch = attrs.match(/src="([^"]*)"/);
      const altMatch = attrs.match(/alt="([^"]*)"/);
      const captionMatch = attrs.match(/caption="([^"]*)"/);
      const widthMatch = attrs.match(/width="([^"]*)"/);
      const heightMatch = attrs.match(/height="([^"]*)"/);
      
      const src = srcMatch ? srcMatch[1] : '';
      const alt = altMatch ? altMatch[1] : '';
      const caption = captionMatch ? captionMatch[1] : '';
      const width = widthMatch ? widthMatch[1] : '800';
      const height = heightMatch ? heightMatch[1] : '400';
      
      return `<figure class="mdx-image-figure">
        <div class="mdx-image-wrapper">
          <img src="${src}" alt="${alt}" width="${width}" height="${height}" class="mdx-image" />
        </div>
        ${caption ? `<figcaption class="mdx-image-caption">${caption}</figcaption>` : ''}
      </figure>`;
    })
    
    // Video components
    .replace(/<Video\s+([^>]*?)\/>/g, (match, attrs) => {
      const srcMatch = attrs.match(/src="([^"]*)"/);
      const titleMatch = attrs.match(/title="([^"]*)"/);
      
      const src = srcMatch ? srcMatch[1] : '';
      const title = titleMatch ? titleMatch[1] : '';
      
      return `<video controls title="${title}" class="mdx-video">
        <source src="${src}" type="video/mp4" />
        Dein Browser unterstützt das Video-Tag nicht.
      </video>`;
    });
};

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
        // Lade MDX-Posts über die API
        const response = await fetch('/api/blog/mdx');
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
            {mdxContent ? (
              // Render MDX Content with proper CSS classes
              <div 
                className={`${styles.mdxContent} mdx-content`}
                dangerouslySetInnerHTML={{ 
                  __html: addMDXClasses(marked(mdxContent, {
                    breaks: true,
                    gfm: true,
                    headerIds: true,
                    mangle: false
                  }))
                }}
              />
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
