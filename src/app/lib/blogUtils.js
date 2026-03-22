// Blog-spezifische Utility-Funktionen
import { calculateReadTime, processExcerpt } from './utils';

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
