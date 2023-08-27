import LatestPost from '@/components/posts/LatestPost';
import SixPosts from '@/components/posts/SixPosts';
import TrendingPosts from '@/components/posts/TrendingPosts';
import styles from '@/styles/home.module.css';

// Fetch the latest post data from the API
async function fetchLatestPostData() {
  const response = await fetch("https://healthcare-biodiversity.vercel.app/api/blogs", { cache: 'force-cache' }, { next: { revalidate: 3600 } });
  if (!response.ok) {
    throw new Error("Failed to fetch latest post data");
  }
  const data = await response.json();
  return data.blogPosts[0];
}

// Fetch the Trending post data from the API
async function fetchTrendingPostData() {
  const response = await fetch("https://healthcare-biodiversity.vercel.app/api/blogs", { cache: 'force-cache' }, { next: { revalidate: 3600 } });
  if (!response.ok) {
    throw new Error("Failed to fetch Trending posts data");
  }
  const data = await response.json();
  return data.blogPosts.slice(1);
}

export default async function Home() {
  const latestPostData = await fetchLatestPostData();
  const trendingPostData = await fetchTrendingPostData();

  return (
    <section className={styles.Home}>
      <div className={styles.HomeCard}>
        <LatestPost {...latestPostData} />
        <SixPosts data={trendingPostData} />
      </div>
      <div className={styles.VerticalPosts}>
        <TrendingPosts />
        <div className={styles.cattfatty}>
          <h2>Categories</h2>
          <hr />
          Categories Contents...
        </div>
      </div>
    </section>
  );
}