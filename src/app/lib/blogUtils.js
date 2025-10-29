// Blog-spezifische Utility-Funktionen
import { calculateReadTime, processExcerpt } from './utils';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

// Text-Formatierung für Blog-Posts - nur für description/excerpt verwenden
export const blogShortExcerpt = (excerpt, maxLength = 100) => {
  if (!excerpt || typeof excerpt !== 'string' || excerpt.trim() === '') {
    return 'No description available';
  }
  if (excerpt.length <= maxLength) return excerpt;
  return excerpt.slice(0, maxLength) + '...';
};

// Zahlen-Formatierung für Blog-Stats
export const formatNumber = num => {
  if (!num || num === 0) return '0';
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'k';
  }
  return num.toString();
};

// Blog-Post Datenverarbeitung (MDX-basiert)
export const processBlogPostData = async (post, fullContentData = null) => {
  try {
    let processedPost = { ...post };

    // Wenn kein fullContentData übergeben wurde, lade es über MDX-API
    if (!fullContentData) {
      try {
        const response = await fetch('/api/blog/mdx');
        const mdxData = await response.json();
        fullContentData = mdxData;
      } catch (error) {
        console.error('Error loading MDX data:', error);
        fullContentData = [];
      }
    }

    // Finde den vollständigen Content für diesen Post
    const fullPost = fullContentData.find(full => full.slug === post.slug);

    if (fullPost && fullPost.content) {
      processedPost = {
        ...processedPost,
        readTime: calculateReadTime(fullPost.content),
        excerpt: processExcerpt(post.excerpt, fullPost.content, 120),
      };
    } else {
      processedPost = {
        ...processedPost,
        readTime: 'Time Error :)', // Fallback
        excerpt: processExcerpt(post.excerpt, null, 120),
      };
    }

    return processedPost;
  } catch (error) {
    console.error('Error processing blog post data:', error);
    return {
      ...post,
      readTime: 'Time Error :)',
      excerpt: processExcerpt(post.excerpt, null, 120),
    };
  }
};

// Mehrere Blog-Posts verarbeiten (MDX-basiert)
export const processMultipleBlogPosts = async (
  posts,
  fullContentData = null
) => {
  try {
    // Wenn kein fullContentData übergeben wurde, lade es über MDX-API
    if (!fullContentData) {
      try {
        const response = await fetch('/api/blog/mdx');
        const mdxData = await response.json();
        fullContentData = mdxData;
      } catch (error) {
        console.error('Error loading MDX data:', error);
        fullContentData = [];
      }
    }

    // Verarbeite alle Posts parallel
    const processedPosts = await Promise.all(
      posts.map(post => processBlogPostData(post, fullContentData))
    );

    return processedPosts;
  } catch (error) {
    console.error('Error processing multiple blog posts:', error);
    return posts.map(post => ({
      ...post,
      readTime: 'Time Error :)',
      excerpt: processExcerpt(post.excerpt, null, 120),
    }));
  }
};

// Blog-Posts nach Tags filtern
export const filterPostsByTags = (posts, selectedTag) => {
  if (!selectedTag) return posts;

  return posts.filter(
    post =>
      post.tags &&
      post.tags.some(tag => tag.toLowerCase() === selectedTag.toLowerCase())
  );
};

// Blog-Posts nach Suchbegriff filtern
export const filterPostsBySearch = (posts, searchQuery) => {
  if (!searchQuery) return posts;

  const query = searchQuery.toLowerCase();
  return posts.filter(
    post =>
      post.title.toLowerCase().includes(query) ||
      post.excerpt.toLowerCase().includes(query) ||
      (post.tags && post.tags.some(tag => tag.toLowerCase().includes(query)))
  );
};

// Blog-Posts sortieren
export const sortBlogPosts = (posts, sortOrder = 'latest') => {
  return [...posts].sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);

    if (sortOrder === 'latest') {
      return dateB - dateA;
    } else {
      return dateA - dateB;
    }
  });
};

// Eindeutige Tags aus Posts extrahieren
export const extractUniqueTags = posts => {
  const allTags = posts.flatMap(post => post.tags || []);
  return [...new Set(allTags)];
};

// Scroll-Helper für Blog-Navigation
export const scrollToSection = id => {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  }
};

// Aktive Sektion basierend auf Scroll-Position ermitteln
export const getActiveSection = (sections, scrollOffset = 150) => {
  const scrollPosition = window.scrollY + scrollOffset;

  for (let i = sections.length - 1; i >= 0; i--) {
    const section = sections[i];
    const element = document.getElementById(section.id);
    if (element && element.offsetTop <= scrollPosition) {
      return section.id;
    }
  }

  return '';
};

// Neue Utility-Funktionen

// Blog-Post Validierung
export const validateBlogPost = post => {
  const requiredFields = ['title', 'slug', 'excerpt', 'date'];
  const missingFields = requiredFields.filter(field => !post[field]);

  if (missingFields.length > 0) {
    console.warn(`Missing required fields: ${missingFields.join(', ')}`);
    return false;
  }

  return true;
};

// Blog-Post Metadaten extrahieren
export const extractBlogMetadata = post => {
  return {
    title: post.title,
    description: post.excerpt,
    date: post.date,
    author: post.author,
    tags: post.tags || [],
    readTime: post.readTime,
    image: post.image,
  };
};

// Blog-Posts nach Kategorien gruppieren
export const groupPostsByCategory = (posts, categoryField = 'category') => {
  return posts.reduce((groups, post) => {
    const category = post[categoryField] || 'Uncategorized';
    if (!groups[category]) {
      groups[category] = [];
    }
    groups[category].push(post);
    return groups;
  }, {});
};

// Blog-Post Statistiken berechnen
export const calculateBlogStats = posts => {
  const totalPosts = posts.length;
  const totalViews = posts.reduce((sum, post) => sum + (post.views || 0), 0);
  const totalLikes = posts.reduce((sum, post) => sum + (post.likes || 0), 0);
  const averageReadTime =
    posts.reduce((sum, post) => {
      const time = parseInt(post.readTime) || 3;
      return sum + time;
    }, 0) / totalPosts;

  return {
    totalPosts,
    totalViews,
    totalLikes,
    averageReadTime: Math.round(averageReadTime),
    engagementRate: totalPosts > 0 ? (totalLikes / totalPosts).toFixed(2) : 0,
  };
};

// Blog-Post Suche mit Gewichtung
export const searchPostsWithWeighting = (posts, searchQuery) => {
  if (!searchQuery) return posts;

  const query = searchQuery.toLowerCase();

  return posts
    .map(post => {
      let score = 0;

      // Titel hat höchste Gewichtung
      if (post.title.toLowerCase().includes(query)) {
        score += 10;
      }

      // Tags haben zweithöchste Gewichtung
      if (
        post.tags &&
        post.tags.some(tag => tag.toLowerCase().includes(query))
      ) {
        score += 8;
      }

      // Excerpt hat mittlere Gewichtung
      if (post.excerpt.toLowerCase().includes(query)) {
        score += 5;
      }

      // Autor hat niedrige Gewichtung
      if (post.author && post.author.toLowerCase().includes(query)) {
        score += 3;
      }

      return { ...post, searchScore: score };
    })
    .filter(post => post.searchScore > 0)
    .sort((a, b) => b.searchScore - a.searchScore);
};

// Blog-Post Cache-Management
export const createBlogPostCache = () => {
  const cache = new Map();
  const maxSize = 100;

  return {
    get: key => cache.get(key),
    set: (key, value) => {
      if (cache.size >= maxSize) {
        const firstKey = cache.keys().next().value;
        cache.delete(firstKey);
      }
      cache.set(key, value);
    },
    has: key => cache.has(key),
    clear: () => cache.clear(),
    size: () => cache.size,
  };
};

// Blog-Post Export-Funktionen
export const exportBlogPostAsMarkdown = post => {
  let markdown = `# ${post.title}\n\n`;
  markdown += `**Date:** ${post.date}\n`;
  markdown += `**Author:** ${post.author}\n`;
  markdown += `**Read Time:** ${post.readTime}\n\n`;

  if (post.tags && post.tags.length > 0) {
    markdown += `**Tags:** ${post.tags.join(', ')}\n\n`;
  }

  markdown += `## Excerpt\n\n${post.excerpt}\n\n`;

  if (post.content) {
    markdown += `## Content\n\n${post.content}\n`;
  }

  return markdown;
};

// Blog-Post Import/Export für Backup
export const backupBlogPosts = posts => {
  const backup = {
    timestamp: new Date().toISOString(),
    version: '1.0',
    posts: posts.map(post => ({
      ...post,
      backupDate: new Date().toISOString(),
    })),
  };

  return JSON.stringify(backup, null, 2);
};

// ===== MDX-SPEZIFISCHE FUNKTIONEN =====

// MDX-Dateien aus dem blog-mdx Ordner laden
export const getMDXPosts = () => {
  const postsDirectory = path.join(process.cwd(), 'public/data/blog-mdx');
  
  // Prüfe ob der Ordner existiert
  if (!fs.existsSync(postsDirectory)) {
    console.warn('MDX blog directory not found:', postsDirectory);
    return [];
  }

  const filenames = fs.readdirSync(postsDirectory);
  const posts = filenames
    .filter(name => name.endsWith('.mdx'))
    .map(filename => {
      const filePath = path.join(postsDirectory, filename);
      const fileContents = fs.readFileSync(filePath, 'utf8');
      const { data: frontmatter, content } = matter(fileContents);
      
      
      return {
        slug: frontmatter.slug || filename.replace(/\.mdx$/, ''),
        title: frontmatter.title || 'Untitled',
        subtitle: frontmatter.subtitle || '',
        category: frontmatter.category || 'General',
        tags: frontmatter.tags || [],
        date: frontmatter.date || new Date().toISOString(),
        image: frontmatter.image || '/assets/images/blog/default.webp',
        excerpt: frontmatter.excerpt || frontmatter.subtitle || frontmatter.description || '',
        author: frontmatter.author || 'Gylan Salih',
        authorImage: frontmatter.authorImage || '/assets/images/blog/author.webp',
        content,
        readTime: calculateReadTime(content),
        filename
      };
    });

  return posts;
};

// Einzelnen MDX-Post laden
export const getMDXPost = (slug) => {
  const posts = getMDXPosts();
  return posts.find(post => post.slug === slug);
};

// MDX-Posts für Grid-Anzeige verarbeiten
export const getMDXPostsForGrid = async () => {
  const posts = getMDXPosts();
  
  return posts.map(post => ({
    id: post.slug,
    slug: post.slug,
    title: post.title,
    subtitle: post.subtitle,
    category: post.category,
    tags: post.tags,
    date: post.date,
    image: post.image,
    excerpt: post.excerpt || post.subtitle || '',
    author: post.author,
    authorImage: post.authorImage,
    readTime: post.readTime,
    views: 0, // Wird von Supabase überschrieben
    likes: 0  // Wird von Supabase überschrieben
  }));
};

// MDX-Posts sortieren
export const sortMDXPosts = (posts, sortOrder = 'latest') => {
  return [...posts].sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);

    if (sortOrder === 'latest') {
      return dateB - dateA;
    } else {
      return dateA - dateB;
    }
  });
};

// Client-seitige Funktion für MDX-Posts (lädt direkt aus public/data)
export const fetchMDXPosts = async () => {
  try {
    // Lade die zur Build-Zeit generierten Blog-Daten direkt aus public
    const response = await fetch('/data/generated-blog-data.json');
    if (!response.ok) {
      throw new Error('Failed to fetch MDX posts from static file');
    }
    const posts = await response.json();
    return posts || [];
  } catch (error) {
    console.error('Error fetching MDX posts:', error);
    // Fallback: Versuche die API-Route (falls vorhanden)
    try {
      const apiResponse = await fetch('/api/blog/mdx');
      if (apiResponse.ok) {
        return await apiResponse.json();
      }
    } catch (apiError) {
      console.error('API fallback also failed:', apiError);
    }
    return [];
  }
};


// Client-seitige Funktion für einzelnen MDX-Post
export const fetchMDXPost = async (slug) => {
  try {
    const response = await fetch(`/api/blog/mdx/${slug}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch MDX post: ${slug}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching MDX post:', error);
    return null;
  }
};
