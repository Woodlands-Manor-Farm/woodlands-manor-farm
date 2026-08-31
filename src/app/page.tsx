import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";
import { HeroCarousel } from "@/components/home/hero-carousel";
import { SuperControlWidget } from "@/components/booking/super-control-widget";
import { BOOK_HREF } from "@/lib/constants/nav";
import { SITE } from "@/lib/constants/seo";

const INTRO_TILES = [
  {
    src: "/images/home/cc82e0f15a7b2058.jpg",
    alt: "Heated indoor swimming pool at Woodlands Manor Farm",
    title: "Heated Indoor Pool",
    body: "Swim whatever the weather, kept at a warm 30°C all year — a firm family favourite",
    objectPosition: "center",
  },
  {
    src: "/images/home/b2879a790a48a11e.jpg",
    alt: "Feeding the goats at Woodlands Manor Farm",
    title: "Feed the Animals",
    body: "Get hands-on with our farm animals — a magical moment for children of all ages",
    objectPosition: "center 30%",
  },
  {
    src: "/images/home/e76061d989fd39c9.jpg",
    alt: "Child on the outdoor playground at Woodlands Manor Farm",
    title: "Outdoor Play",
    body: "Playground, playing field and five-a-side goals — space to run free",
    objectPosition: "center 20%",
  },
  {
    src: "/images/home/ec8c89b6a5ac2c67.jpg",
    alt: "Manor House conservatory with summer flowers",
    title: "5-Star Interiors",
    body: "TripAdvisor Travellers' Choice & Booking.com awards — beautifully appointed throughout",
    objectPosition: "center",
  },
];

const STAYS = [
  {
    href: "/the-manor-house/",
    name: "Woodlands Manor House",
    type: "Centrepiece · Sleeps 12 + cots",
    detail: "Three lounges · AGA kitchen · Period features",
    img: "/images/cottages/812784261e6d52d7.jpg",
    alt: "Woodlands Manor House — stone walls, beams and period charm",
    large: true,
  },
  {
    href: "/yurts/",
    name: "The Yurts",
    type: "Glamping · Sleeps 4 + cots",
    detail: "Wood-burner · Valley views · Private bathroom",
    img: "/images/cottages/178e79588e66b04a.jpg",
    alt: "Inside one of the Mongolian yurts at Woodlands Manor Farm",
  },
  {
    href: "/rose-cottage/",
    name: "Rose Cottage",
    type: "Cottage · Sleeps 8 + cots",
    detail: "Stone fireplace · Two lounges · Garden",
    img: "/images/cottages/32742e1c3f3de7dd.jpg",
    alt: "Rose Cottage stone fireplace and beamed lounge",
  },
  {
    href: "/the-stables/",
    name: "The Stables",
    type: "Converted · Sleeps 4 + cots",
    detail: "Valley view · Freestanding bath",
    img: "/images/the-stables/stables-patio.jpg",
    alt: "The Stables patio with dining and valley views",
  },
  {
    href: "/the-coach-house/",
    name: "The Coach House",
    type: "Retreat · Sleeps 2 + cot",
    detail: "Vaulted beams · Super king",
    img: "/images/cottages/7da27dbd79d1c7d5.jpg",
    alt: "Coach House — ivy-clad Cornish stone cottage",
  },
];

const EXP_FEATURES = [
  "Indoor heated pool",
  "Games room",
  "Farm animal feeding",
  "Woodland walks",
  "Open water swimming",
  "Surfing & coasteering",
  "Orienteering",
  "2 miles to the beach",
];

const EXP_TILES = [
  {
    img: "/images/home/cc82e0f15a7b2058.jpg",
    alt: "Indoor heated swimming pool",
    title: "All-weather pool",
    body: "Warm 30°C all year round",
  },
  {
    img: "/images/home/57c6f3124406e0a5.jpg",
    alt: "Feeding the pigs at Woodlands",
    title: "Feed the animals",
    body: "Pigs, sheep, alpacas & more",
  },
  {
    img: "/images/home/3c62af48f5d7d88b.jpg",
    alt: "Children flying kites in the meadow at Woodlands Manor Farm",
    title: "Playing fields",
    body: "Kite flying & five-a-side football",
  },
  {
    img: "/images/home/53289620864625e8.jpg",
    alt: "Bluebell woodland walk at Woodlands Manor Farm",
    title: "Bluebell woodland",
    body: "Magical walks on the farm",
  },
];

const REVIEWS = [
  {
    text: "Really beautiful authentic old Manor House with quirky rooms and period features. Beautiful flat stone floors and huge fireplace. Brilliant place for multiple families with kids. Highly recommend.",
    initials: "AK",
    name: "Alex K.",
    unit: "Manor House · 2023",
  },
  {
    text: "Such a beautiful spot! Everything kitted out with the guest in mind. Andrew was very helpful and happy to help at a moment's notice. We are looking to book again with friends!",
    initials: "EM",
    name: "Emma M.",
    unit: "Lavender Cottage · 2024",
  },
  {
    text: "We absolutely loved our stay in one of the beautiful yurts. Andrew has really thought about everything you might need. We are already looking at staying again! Highly recommend!",
    initials: "JP",
    name: "John & Pippa",
    unit: "Budhyn Yurt · 2024",
  },
];

const AWARD_LOGOS = [
  { src: "/images/awards/booking-awards.png", alt: "Booking.com Traveller Review Awards 2026", w: 168, h: 52 },
  { src: "/images/awards/cornwall-tourism-awards.png", alt: "Cornwall Tourism Awards 2025/26 Commended", w: 50, h: 70 },
  { src: "/images/awards/airbnb-superhost.png", alt: "Airbnb Superhost at Woodlands Manor Farm", w: 70, h: 70, big: true },
  { src: "/images/awards/pasc-member.png", alt: "PASC Member — Professional Association of Self-Caterers", w: 70, h: 70 },
  { src: "/images/awards/bude-way-accredited.png", alt: "The Bude Way Accredited", w: 88, h: 68 },
];

const TRIPADVISOR_URL =
  "https://www.tripadvisor.com/Hotel_Review-g190804-d1676332-Reviews-Woodlands_Manor_Farm-Bude_Bude_Stratton_Cornwall_England.html";

const NEARBY = [
  { name: "Duckpool Beach (National Trust)", distance: "2 miles" },
  { name: "Sandymouth Beach", distance: "2.5 miles" },
  { name: "Bude town & sea pool", distance: "6 miles" },
  { name: "Bude Surf School", distance: "7 miles" },
  { name: "The Bush Inn, Morwenstow", distance: "4 miles" },
];

const BLOG_FEATURED = {
  href: "/woodlands-manor-farm-wins-6-booking-com-traveller-choice-awards/",
  img: "/images/home/3c62af48f5d7d88b.jpg",
  alt: "Children flying kites over the Cornish hills at Woodlands Manor Farm",
  tag: "Awards",
  title: "Woodlands Manor Farm wins six Booking.com Traveller Choice Awards 2026",
  excerpt:
    "Incredible news to kick off the year — we're thrilled to have received six Traveller Review Awards from Booking.com, all thanks to the wonderful reviews left by our guests.",
  date: "7 Feb 2026",
};

const BLOG_SECONDARY = [
  {
    href: "/the-magic-of-feed-the-animals/",
    img: "/images/home/89f10cdaa6fb94ce.jpg",
    alt: "Feeding the lambs at Woodlands Manor Farm",
    tag: "Farm life",
    title: "The magic of our Feed the Animals experience",
    date: "1 Sep 2025",
  },
  {
    href: "/top-10-reasons-why-bude-is-perfect-for-family-holidays-in-cornwall/",
    img: "/images/home/d618947f2c9c2c80.jpg",
    alt: "Bude sea pool and Summerleaze Beach on a summer day",
    tag: "Local guide",
    title: "10 reasons Bude is perfect for a family holiday in Cornwall",
    date: "11 Feb 2025",
  },
];

export default function HomePage() {
  return (
    <>
      <HeroCarousel />

      {/* Intro */}
      <section className={styles.intro}>
        <div className={styles.introInner}>
          <p className={styles.introEyebrow}>Welcome to Woodlands Manor Farm</p>
          <h2 className={styles.introTitle}>
            Holiday cottages &amp; glamping yurts in Bude, <em>North Cornwall</em>
          </h2>
          <p className={styles.introBody}>
            Woodlands Manor Farm is a 17th-century farm in the peaceful Coombe Valley,
            two miles from Bude&rsquo;s beaches. Our seven{" "}
            <Link href="/bude-holiday-cottages/">holiday cottages</Link> and two luxury{" "}
            <Link href="/yurts/">glamping yurts</Link> sleep 2 to 12 — every stay includes our{" "}
            <Link href="/about-woodlands-manor-farm-holiday-cottages-with-a-pool/">
              heated indoor pool
            </Link>{" "}
            (a warm 30°C, open every day of the year), the games room, and{" "}
            <Link href="/on-the-farm/">life on the farm</Link>: free animal feeding with Ruth,
            pony experiences and fifteen acres of bluebell woodland. And yes —{" "}
            <Link href="/dog-friendly-holiday-cottages-bude/">dogs are very welcome</Link>.
          </p>
        </div>
      </section>

      {/* Intro strip */}
      <div className={styles.introStrip}>
        {INTRO_TILES.map((t) => (
          <div key={t.title} className={styles.introTile}>
            <div className={styles.introTileImg}>
              <Image
                src={t.src}
                alt={t.alt}
                width={400}
                height={200}
                style={{ objectFit: "cover", objectPosition: t.objectPosition }}
              />
            </div>
            <div className={styles.introTileBody}>
              <h3>{t.title}</h3>
              <p>{t.body}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Booking widget */}
      <section id="booking-widget" className={styles.booking}>
        <div className={styles.bookingInner}>
          <div className={styles.bookingHead}>
            <h2>
              <span>Book direct</span>Check availability &amp; reserve your stay
            </h2>
            <div className={styles.badge}>Best price guaranteed — no booking fees</div>
          </div>
          <div className={styles.widgetWrap}>
            <SuperControlWidget />
          </div>
          <div className={styles.widgetLinks}>
            <Link href="/bude-holiday-cottages/" className={styles.widgetLink}>
              <span>Cottages — 2 to 12 guests</span>
              <span className={styles.widgetLinkAction}>View all →</span>
            </Link>
            <Link href="/yurts/" className={styles.widgetLink}>
              <span>Yurts — Budhyn &amp; Fenton</span>
              <span className={styles.widgetLinkAction}>View yurts →</span>
            </Link>
            <a href={`tel:${SITE.contact.phone}`} className={styles.widgetLink}>
              <span>Group bookings — call us direct</span>
              <span className={styles.widgetLinkAction}>{SITE.contact.phoneDisplay}</span>
            </a>
          </div>
          <p className={styles.widgetNote}>
            Returning guest? Use your departure discount code — or{" "}
            <a href={`tel:${SITE.contact.phone}`}>call Andy on {SITE.contact.phoneDisplay}</a>
          </p>
        </div>
      </section>

      {/* Trust bar */}
      <div className={styles.trustBar}>
        <Link href="/reviews/" className={styles.ratingBadge} aria-label="4.9 out of 5 on Google reviews">
          <Image
            src="/images/awards/google-reviews.png"
            alt="Rated 5 stars on Google reviews"
            width={110}
            height={46}
            className={styles.ratingLogoGoogle}
          />
          <span className={styles.ratingScore}>4.9 · 116 reviews</span>
        </Link>
        <a
          href={TRIPADVISOR_URL}
          target="_blank"
          rel="noreferrer"
          className={styles.ratingBadge}
          aria-label="Rated Excellent on Tripadvisor"
        >
          <Image
            src="/images/awards/tripadvisor.png"
            alt="Tripadvisor — rated Excellent"
            width={128}
            height={28}
            className={styles.ratingLogoTa}
          />
          <span className={styles.ratingScore}>★★★★★ Rated Excellent</span>
        </a>
        {AWARD_LOGOS.map((a) => (
          <Image
            key={a.src}
            src={a.src}
            alt={a.alt}
            width={a.w}
            height={a.h}
            className={a.big ? styles.awardLogoAirbnb : styles.awardLogo}
          />
        ))}
      </div>

      {/* Stays */}
      <section id="stays" className={styles.stays}>
        <div className={styles.sectionHead}>
          <div>
            <p className={styles.label}>Where you&rsquo;ll sleep</p>
            <h2 className={styles.title}>
              Choose your<br />
              <em>perfect escape</em>
            </h2>
          </div>
          <Link href="/bude-holiday-cottages/" className={styles.sectionLink}>
            View all accommodation →
          </Link>
        </div>
        <div className={styles.staysGrid}>
          {STAYS.map((s, i) => (
            <Link
              key={s.href}
              href={s.href}
              className={`${styles.stayCard} ${i === 0 ? styles.stayCardLarge : ""}`}
            >
              <div className={styles.stayBg}>
                <Image
                  src={s.img}
                  alt={s.alt}
                  fill
                  sizes={i === 0 ? "(min-width:900px) 50vw, 100vw" : "(min-width:900px) 25vw, 100vw"}
                  style={{ objectFit: "cover" }}
                />
              </div>
              <div className={styles.stayInfo}>
                <div className={styles.stayType}>{s.type}</div>
                <div className={styles.stayName}>{s.name}</div>
                <div className={styles.staySleeps}>{s.detail}</div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Experience */}
      <section id="experience" className={styles.experience}>
        <div className={styles.experienceLeft}>
          <p className={styles.label} style={{ color: "var(--color-warm-stone)" }}>
            More than a place to sleep
          </p>
          <h2>
            A farm alive
            <br />
            with <em>experience.</em>
          </h2>
          <p>
            Woodlands isn&rsquo;t just somewhere to stay — it&rsquo;s a place to feel something.
            Whether it&rsquo;s your children&rsquo;s first encounter with a farm animal, a lazy
            morning in the pool, or a coast path walk that clears your head for good.
          </p>
          <ul className={styles.expList}>
            {EXP_FEATURES.map((f) => (
              <li key={f}>{f}</li>
            ))}
          </ul>
        </div>
        <div className={styles.experienceRight}>
          {EXP_TILES.map((t) => (
            <div key={t.title} className={styles.expTile}>
              <Image src={t.img} alt={t.alt} width={400} height={220} style={{ objectFit: "cover" }} />
              <div className={styles.expTileLabel}>
                <h4>{t.title}</h4>
                <p>{t.body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Video tour */}
      <section id="video" className={styles.video}>
        <div className={styles.videoHead}>
          <p className={styles.label} style={{ color: "var(--color-warm-stone)" }}>
            See it for yourself
          </p>
          <h2>
            Take a tour of <em>the farm</em>
          </h2>
          <p>
            Three minutes. Valley views, stone fireplaces, happy animals, and that pool. Everything
            you need to know before you book.
          </p>
        </div>
        <div className={styles.videoFrame}>
          <div className={styles.videoPlaceholder}>
            <div className={styles.videoBg}>
              <Image
                src="/images/home/6779d3d99e56e799.jpg"
                alt="Woodlands Manor Farm stone cottage with valley views"
                fill
                sizes="(min-width: 1100px) 1100px, 100vw"
                style={{ objectFit: "cover" }}
              />
            </div>
            <button type="button" className={styles.playBtn} aria-label="Play farm tour video">
              <div className={styles.playIcon} />
            </button>
            <div className={styles.videoText}>
              <h3>Farm Tour — Woodlands Manor Farm</h3>
              <p>Coming soon</p>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section id="reviews" className={styles.proof}>
        <div className={styles.proofHead}>
          <div className={styles.stars}>★ ★ ★ ★ ★</div>
          <h2>What guests are saying</h2>
        </div>
        <div className={styles.reviewsGrid}>
          {REVIEWS.map((r) => (
            <div key={r.name} className={styles.reviewCard}>
              <p className={styles.reviewText}>{r.text}</p>
              <div className={styles.reviewAuthor}>
                <div className={styles.reviewAvatar}>{r.initials}</div>
                <div>
                  <div className={styles.reviewName}>{r.name}</div>
                  <div className={styles.reviewUnit}>{r.unit}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Location */}
      <section id="location" className={styles.location}>
        <div className={styles.locationMap}>
          <Image
            src="/images/home/4c4e10cb7708c56e.jpg"
            alt="Outdoor dining terrace at Woodlands Manor Farm with valley views"
            fill
            sizes="(min-width: 900px) 50vw, 100vw"
            style={{ objectFit: "cover" }}
          />
        </div>
        <div className={styles.locationRight}>
          <p className={styles.label}>Find us</p>
          <h2 className={styles.title} style={{ marginBottom: 20 }}>
            Tucked into the
            <br />
            Coombe Valley
          </h2>
          <p>
            Just two miles from the dramatic National Trust coastline and a short drive to the
            unspoilt town of Bude, Woodlands Manor Farm sits in one of Cornwall&rsquo;s most
            beautiful and peaceful valleys.
          </p>
          <ul className={styles.nearbyList}>
            {NEARBY.map((n) => (
              <li key={n.name} className={styles.nearbyItem}>
                <span>{n.name}</span>
                <span>{n.distance}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Blog */}
      <section id="blog" className={styles.blogSection}>
        <div className={styles.sectionHead}>
          <div>
            <p className={styles.label}>From the farm</p>
            <h2 className={styles.title}>News &amp; stories</h2>
          </div>
          <Link href="/news/" className={styles.sectionLink}>
            Read all posts →
          </Link>
        </div>
        <div className={styles.blogGrid}>
          <Link href={BLOG_FEATURED.href} className={`${styles.blogCard} ${styles.blogCardLarge}`}>
            <div className={styles.blogThumb}>
              <Image src={BLOG_FEATURED.img} alt={BLOG_FEATURED.alt} width={680} height={280} />
            </div>
            <div className={styles.blogBody}>
              <div className={styles.blogTag}>{BLOG_FEATURED.tag}</div>
              <h3 className={styles.blogTitle}>{BLOG_FEATURED.title}</h3>
              <p className={styles.blogExcerpt}>{BLOG_FEATURED.excerpt}</p>
              <div className={styles.blogMeta}>
                <span className={styles.blogDate}>{BLOG_FEATURED.date}</span>
                <span className={styles.blogReadMore}>Read more →</span>
              </div>
            </div>
          </Link>
          {BLOG_SECONDARY.map((p) => (
            <Link key={p.href} href={p.href} className={`${styles.blogCard} ${styles.blogCardSmall}`}>
              <div className={styles.blogThumb}>
                <Image src={p.img} alt={p.alt} width={340} height={180} />
              </div>
              <div className={styles.blogBody}>
                <div className={styles.blogTag}>{p.tag}</div>
                <h3 className={styles.blogTitle}>{p.title}</h3>
                <div className={styles.blogMeta}>
                  <span className={styles.blogDate}>{p.date}</span>
                  <span className={styles.blogReadMore}>Read →</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA strip */}
      <section className={styles.ctaStrip}>
        <div className={styles.ctaText}>
          <h2>Ready to escape?</h2>
          <p>Book direct for the best rate — or call Andrew &amp; Ruth to plan your perfect stay</p>
        </div>
        <div className={styles.ctaActions}>
          <Link href={BOOK_HREF} className={styles.btnWhite}>
            Check Availability
          </Link>
          <a href={`tel:${SITE.contact.phone}`} className={styles.btnOutlineWhite}>
            Call {SITE.contact.phoneDisplay}
          </a>
        </div>
      </section>
    </>
  );
}
