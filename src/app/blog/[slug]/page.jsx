// app/blog/[slug]/page.js (Server Component)
import { getMDXPosts, getMDXPost } from '../../lib/blogUtils';
import BlogPost from '../../components/BlogComponents/BlogPost/BlogPost';

export async function generateStaticParams() {
  try {
    // Generate params from MDX files
    const posts = getMDXPosts();
    return posts.map(post => ({
      slug: post.slug,
    }));
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}

export default async function PostPage({ params }) {
  const { slug } = await params;

  try {
    // Load the MDX post
    const post = getMDXPost(slug);

    if (!post) {
      return (
        <div style={{ padding: '2rem', textAlign: 'center' }}>
          <h1>❌ Blog Post Not Found</h1>
          <p>The requested blog post could not be found.</p>
        </div>
      );
    }

    // Transform post data for the BlogPost component
    const transformedPost = {
      slug: post.slug,
      title: post.title,
      subtitle: post.subtitle,
      author: post.author,
      date: post.date,
      tags: post.tags,
      authorImage: post.authorImage,
      content: post.content,
      image: post.image
    };

    return (
      <BlogPost 
        data={transformedPost}
        mdxContent={post.content}
      />
    );
  } catch (error) {
    console.error('Error loading blog post:', error);
    return (
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <h1>❌ Error Loading Post</h1>
        <p>There was an error while loading the blog post.</p>
      </div>
    );
  }
}
