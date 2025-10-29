// Script zum Generieren der Blog-Daten zur Build-Zeit
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Funktion zum Berechnen der Lesezeit
function calculateReadTime(content) {
  if (!content || typeof content !== 'string') return '3 min read';
  
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  const readTime = Math.ceil(words / wordsPerMinute);
  
  return `${readTime} min read`;
}

// Hauptfunktion zum Generieren der Blog-Daten
function generateBlogData() {
  const postsDirectory = path.join(process.cwd(), 'public/data/blog-mdx');
  const outputPath = path.join(process.cwd(), 'public/data/generated-blog-data.json');
  
  // Prüfe ob der Ordner existiert
  if (!fs.existsSync(postsDirectory)) {
    console.warn('MDX blog directory not found:', postsDirectory);
    // Erstelle leere JSON-Datei
    fs.writeFileSync(outputPath, JSON.stringify([], null, 2));
    return;
  }

  try {
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
          filename,
          // Für Grid-Anzeige
          id: frontmatter.slug || filename.replace(/\.mdx$/, ''),
          views: 0, // Wird von Supabase überschrieben
          likes: 0  // Wird von Supabase überschrieben
        };
      });

    // Sortiere Posts nach Datum (neueste zuerst)
    posts.sort((a, b) => new Date(b.date) - new Date(a.date));

    // Schreibe die generierten Daten in eine JSON-Datei
    fs.writeFileSync(outputPath, JSON.stringify(posts, null, 2));
    
    console.log(`✅ Generated blog data for ${posts.length} posts`);
    console.log(`📁 Output: ${outputPath}`);
    
    // Zeige die generierten Posts
    posts.forEach(post => {
      console.log(`  - ${post.title} (${post.slug})`);
    });
    
  } catch (error) {
    console.error('❌ Error generating blog data:', error);
    // Erstelle leere JSON-Datei als Fallback
    fs.writeFileSync(outputPath, JSON.stringify([], null, 2));
  }
}

// Führe das Script aus
generateBlogData();
