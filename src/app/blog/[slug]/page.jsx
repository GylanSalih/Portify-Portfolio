// app/blog/[slug]/page.js (Server Component)
import blogData from '/public/data/BlogData.json'; // lade die neue zentrale BlogData.json
import BlogPost from '../../components/BlogComponents/BlogPost/BlogPost'; // lade die blogpost single componente

export async function generateStaticParams() {
  return blogData.map(item => ({
    slug: item.slug,
  }));
}

export default async function PostPage({ params }) {
  const { slug } = params;
  const blogItem = blogData.find(item => item.slug === slug);

  if (!blogItem) {
    return <p>❌ Blogbeitrag nicht gefunden</p>;
  }

  // Transformiere die Datenstruktur für die BlogPost-Komponente
  const transformedPost = {
    slug: blogItem.slug,
    title: blogItem.title,
    subtitle: blogItem.postData.subtitle,
    author: "Gylan Salih", // Statischer Wert
    date: blogItem.postData.date,
    tags: blogItem.tags,
    authorImage: "/assets/images/blog/author.webp", // Statischer Wert
    content: blogItem.postData.content
  };

  return <BlogPost data={transformedPost} />;
}
