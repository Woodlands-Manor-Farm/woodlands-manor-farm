import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllPostSlugs, getAllPosts, getPostBySlug } from "@/lib/blog";
import { BOOK_HREF } from "@/lib/constants/nav";
import { SITE } from "@/lib/constants/seo";
import { JsonLd } from "@/components/seo/json-ld";
import styles from "@/components/blog/blog.module.css";

type Params = Promise<{ slug: string }>;

export async function generateStaticParams() {
  return getAllPostSlugs().map((slug) => ({ slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/${post.slug}/` },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
      images: post.featureImage ? [post.featureImage] : undefined,
    },
  };
}

function formatDate(date?: string) {
  if (!date) return "";
  const d = new Date(date);
  if (Number.isNaN(d.getTime())) return date;
  return d.toLocaleDateString("en-GB", { month: "long", year: "numeric" });
}

function readingTime(html: string) {
  const text = html.replace(/<[^>]*>/g, " ");
  const words = text.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

export default async function BlogPostPage({ params }: { params: Params }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const allPosts = getAllPosts();
  const others = allPosts.filter((p) => p.slug !== post.slug);
  const sidebarRelated = others.slice(0, 4);
  const moreBelow = others.slice(0, 3);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    image: post.featureImage ? `${SITE.url}${post.featureImage}` : undefined,
    author: { "@type": "Person", name: post.author ?? "Andy & Ruth Peters" },
    publisher: { "@id": `${SITE.url}/#business` },
    mainEntityOfPage: `${SITE.url}/${post.slug}/`,
  };

  return (
    <>
      <JsonLd data={articleSchema} />
      <header className={styles.hero}>
        {post.featureImage ? (
          <Image
            src={post.featureImage}
            alt={post.title}
            fill
            priority
            sizes="100vw"
            style={{ objectFit: "cover", objectPosition: "center 45%" }}
          />
        ) : (
          <Image
            src="/images/blog-template/50732616e754d9b7.jpg"
            alt={post.title}
            fill
            priority
            sizes="100vw"
            style={{ objectFit: "cover", objectPosition: "center 45%" }}
          />
        )}
        <div className={styles.heroOverlay} />
        <div className={styles.heroContent}>
          <span className={styles.category}>From the blog</span>
          <h1 className={styles.title}>{post.title}</h1>
          <div className={styles.meta}>
            <div>{formatDate(post.date)}</div>
            <div>{post.author ?? "Andy & Ruth Peters"}</div>
            <div>{readingTime(post.contentHtml)} min read</div>
          </div>
        </div>
      </header>

      <div className={styles.layout}>
        <article className={styles.article}>
          <div className={styles.body} dangerouslySetInnerHTML={{ __html: post.contentHtml }} />

          <div className={styles.articleCta}>
            <div className={styles.articleCtaTitle}>Stay at Woodlands Manor Farm</div>
            <p className={styles.articleCtaBody}>
              Make it a proper break — our{" "}
              <Link href="/bude-holiday-cottages/">holiday cottages in Bude</Link> and luxury
              yurts sit on a working Cornish farm just minutes from the coast, with a{" "}
              <Link href="/about-woodlands-manor-farm-holiday-cottages-with-a-pool/">
                heated indoor pool
              </Link>{" "}
              open every day of the year. Dogs welcome. Book direct for the best price —
              no fees.
            </p>
          </div>

          <footer className={styles.articleFooter}>
            <div className={styles.tags}>
              <Link href="/news/" className={styles.tag}>
                Bude
              </Link>
              <Link href="/news/" className={styles.tag}>
                Cornwall
              </Link>
            </div>
            <div className={styles.share}>
              <span className={styles.shareLabel}>Share</span>
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${SITE.url}/${post.slug}/`}
                target="_blank"
                rel="noreferrer"
                className={styles.shareBtn}
              >
                Facebook
              </a>
              <a
                href={`mailto:?subject=${encodeURIComponent(post.title)}&body=${encodeURIComponent(`${SITE.url}/${post.slug}/`)}`}
                className={styles.shareBtn}
              >
                Email
              </a>
            </div>
          </footer>
        </article>

        <aside className={styles.sidebar}>
          <div className={styles.sidebarBook}>
            <div className={styles.sbTitle}>Plan your stay</div>
            <p className={styles.sbBody}>
              Seven cottages and two luxury yurts in the Coombe Valley. Best price guaranteed when
              you book direct.
            </p>
            <Link href={BOOK_HREF} className={styles.sbBtn}>
              Check availability
            </Link>
            <div className={styles.sbTel}>
              Or call <a href={`tel:${SITE.contact.phone}`}>{SITE.contact.phoneDisplay}</a>
            </div>
          </div>

          {sidebarRelated.length > 0 ? (
            <div className={styles.sidebarSection}>
              <div className={styles.sidebarLabel}>More from the blog</div>
              {sidebarRelated.map((p) => (
                <Link key={p.slug} href={`/${p.slug}/`} className={styles.relatedPost}>
                  <div className={styles.rpImg}>
                    <Image
                      src={p.featureImage ?? "/images/blog-template/50732616e754d9b7.jpg"}
                      alt={p.title}
                      width={64}
                      height={64}
                    />
                  </div>
                  <div>
                    <span className={styles.rpDate}>{formatDate(p.date)}</span>
                    <span className={styles.rpTitle}>{p.title}</span>
                  </div>
                </Link>
              ))}
            </div>
          ) : null}
        </aside>
      </div>

      {moreBelow.length > 0 ? (
        <section className={styles.morePosts}>
          <div className={styles.morePostsInner}>
            <div className={styles.moreHead}>
              <p className={styles.moreEyebrow}>Keep reading</p>
              <h2 className={styles.moreTitle}>
                More from the <em>Woodlands blog</em>
              </h2>
            </div>
            <div className={styles.moreGrid}>
              {moreBelow.map((p) => (
                <Link key={p.slug} href={`/${p.slug}/`} className={styles.moreCard}>
                  <div className={styles.mcImg}>
                    <Image
                      src={p.featureImage ?? "/images/blog-template/dcf926b3c1174be3.jpg"}
                      alt={p.title}
                      fill
                      sizes="(min-width: 900px) 33vw, 100vw"
                    />
                  </div>
                  <div className={styles.mcBody}>
                    <div className={styles.mcCat}>From the blog</div>
                    <div className={styles.mcTitle}>{p.title}</div>
                    <div className={styles.mcDate}>{formatDate(p.date)}</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </>
  );
}
