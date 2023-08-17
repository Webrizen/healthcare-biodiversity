import LatestPost from '@/components/posts/LatestPost';
import SixPosts from '@/components/posts/SixPosts';
import TrendingPosts from '@/components/posts/TrendingPosts';
import styles from '@/styles/home.module.css';

export default function Home() {
  return (
    <>
    <section className={styles.Home}>
          <div className={styles.HomeCard}>
          <LatestPost />
          <SixPosts />
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
    </>
  )
}
