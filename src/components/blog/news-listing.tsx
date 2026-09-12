import Image from "next/image";
import Link from "next/link";
import { formatPostDate, getAllPosts } from "@/lib/blog";
import styles from "./news-list.module.css";

// Shared "News & stories" listing used by both /news/ and its /posts/ alias.
// Posts arrive newest-first from getAllPosts(); the first becomes the featured
// card and the rest fill a responsive image-card grid.
export function NewsListing() {
  const posts = getAllPosts();
  const [featured, ...rest] = posts;

  return (
    <section className={styles.wrap}>
      <p className={styles.eyebrow}>Journal</p>
      <h1 className={styles.heading}>News &amp; stories</h1>
      <p className={styles.intro}>
        Local guides, what&rsquo;s on, farm updates and the small stories from a working
        Cornish farm.
      </p>

      {posts.length === 0 ? (
        <p className={styles.empty}>
          Posts will appear here once <code>npm run migrate:blog</code> has been run.
        </p>
      ) : (
        <>
          <Link href={`/${featured.slug}/`} className={styles.featured}>
            <div className={styles.featuredThumb}>
              {featured.featureImage ? (
                <Image
                  src={featured.featureImage}
                  alt={featured.title}
                  width={760}
                  height={520}
                  priority
                />
              ) : null}
            </div>
            <div className={styles.featuredBody}>
              <span className={styles.tag}>{featured.category}</span>
              <h2 className={styles.featuredTitle}>{featured.title}</h2>
              {featured.excerpt ? (
                <p className={styles.featuredExcerpt}>{featured.excerpt}</p>
              ) : null}
              <div className={styles.meta}>
                <span className={styles.date}>{formatPostDate(featured.date)}</span>
                <span className={styles.readMore}>Read more &rarr;</span>
              </div>
            </div>
          </Link>

          <div className={styles.grid}>
            {rest.map((post) => (
              <Link key={post.slug} href={`/${post.slug}/`} className={styles.card}>
                <div className={styles.cardThumb}>
                  {post.featureImage ? (
                    <Image
                      src={post.featureImage}
                      alt={post.title}
                      width={420}
                      height={280}
                    />
                  ) : null}
                </div>
                <div className={styles.cardBody}>
                  <span className={styles.tag}>{post.category}</span>
                  <h3 className={styles.cardTitle}>{post.title}</h3>
                  {post.excerpt ? (
                    <p className={styles.cardExcerpt}>{post.excerpt}</p>
                  ) : null}
                  <div className={styles.meta}>
                    <span className={styles.date}>{formatPostDate(post.date)}</span>
                    <span className={styles.readMore}>Read &rarr;</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </>
      )}
    </section>
  );
}
