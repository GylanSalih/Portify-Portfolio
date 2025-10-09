// app/blog/[slug]/page.js (Server Component)
import blogPosts from '/public/data/blogpost.json'; // lade die blogpost json details
import BlogPost from '../../components/BlogComponents/BlogPost/BlogPost'; // lade die blogpost single componente

export async function generateStaticParams() {
  return blogPosts.map(post => ({
    slug: post.slug,
  }));
}

export default async function PostPage({ params }) {
  const { slug } = params;
  const post = blogPosts.find(p => p.slug === slug);

  if (!post) {
    return <p>❌ Blogbeitrag nicht gefunden</p>;
  }

  return <BlogPost data={post} />;
}
