// app/portfolio/[slug]/page.js
import posts from '/public/data/portfoliopost.json'; // lade die portfolio json details
import PortfolioPost from '../../components/PortfolioPost/PortfolioPost'; // lade die portfolio single page componente, die aufgerufen wird bei der weiterleitung

// Statische Generierung: alle Slugs aus der JSON
export async function generateStaticParams() {
  return posts.map(post => ({
    slug: post.slug,
  }));
}

export default async function PostPage({ params }) {
  const { slug } = params;
  // den passenden Eintrag aus der JSON holen
  const post = posts.find(p => p.slug === slug);

  if (!post) {
    return <p>❌ Beitrag nicht gefunden</p>;
  }

  // wir geben jetzt die ganzen Daten weiter
  return <PortfolioPost data={post} />;
}
