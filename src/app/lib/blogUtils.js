// Blog-spezifische Utility-Funktionen
import { calculateReadTime, processExcerpt } from './utils';

// Text-Formatierung für Blog-Posts
export const blogShortExcerpt = (text, maxLength = 100) => {
  if (!text || text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
};

// Zahlen-Formatierung für Blog-Stats
export const formatNumber = num => {
  if (!num || num === 0) return '0';
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'k';
  }
  return num.toString();
};

// Blog-Post Datenverarbeitung
export const processBlogPostData = async (post, fullContentData = null) => {
  try {
    let processedPost = { ...post };

    // Wenn kein fullContentData übergeben wurde, lade es
    if (!fullContentData) {
      const fullContentResponse = await fetch('/data/BlogData.json');
      const blogData = await fullContentResponse.json();
      // Transformiere BlogData zu dem erwarteten Format
      fullContentData = blogData.map(item => ({
        slug: item.slug,
        title: item.title,
        tags: item.tags,
        content: item.postData.content,
        ...item.postData
      }));
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
        readTime: '3 min', // Fallback
        excerpt: processExcerpt(post.excerpt, null, 120),
      };
    }

    return processedPost;
  } catch (error) {
    console.error('Error processing blog post data:', error);
    return {
      ...post,
      readTime: '3 min',
      excerpt: processExcerpt(post.excerpt, null, 120),
    };
  }
};

// Mehrere Blog-Posts verarbeiten
export const processMultipleBlogPosts = async (
  posts,
  fullContentData = null
) => {
  try {
    // Wenn kein fullContentData übergeben wurde, lade es einmal
    if (!fullContentData) {
      const fullContentResponse = await fetch('/data/BlogData.json');
      const blogData = await fullContentResponse.json();
      // Transformiere BlogData zu dem erwarteten Format
      fullContentData = blogData.map(item => ({
        slug: item.slug,
        title: item.title,
        tags: item.tags,
        content: item.postData.content,
        ...item.postData
      }));
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
      readTime: '3 min',
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
