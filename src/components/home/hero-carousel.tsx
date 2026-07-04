"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import styles from "@/app/page.module.css";
import { cn } from "@/lib/utils";

const SLIDES = [
  {
    src: "/images/cottages/9792dd1b5f66d139.jpg",
    alt: "Woodlands Manor Farm courtyard and cottages, Bude Cornwall",
    caption: "The farm courtyard — Woodlands Manor Farm",
  },
  {
    src: "/images/cottages/ee96ea80e53b6e33.jpg",
    alt: "Children flying kites in the meadow with Cornish hills beyond",
    caption: "The playing field — space for the whole family",
  },
  {
    src: "/images/home/c2909c0800e4042d.jpg",
    alt: "Heated indoor swimming pool at Woodlands Manor Farm",
    caption: "Heated indoor pool — warm 30°C all year",
  },
];

export function HeroCarousel() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setActive((i) => (i + 1) % SLIDES.length), 6000);
    return () => clearInterval(t);
  }, []);

  return (
    <section className={styles.hero}>
      {SLIDES.map((slide, i) => (
        <div key={slide.src} className={cn(styles.slide, i === active && styles.slideActive)}>
          <Image
            src={slide.src}
            alt={slide.alt}
            fill
            priority={i === 0}
            sizes="100vw"
            style={{ objectFit: "cover", objectPosition: "center 40%" }}
          />
          <div className={styles.slideOverlay} />
        </div>
      ))}

      <div className={styles.heroContent}>
        <p className={styles.heroEyebrow}>
          A 17th-century farm · Coombe Valley · Near Bude
        </p>
        <h1 className={styles.heroHeadline}>
          Slow down.
          <br />
          Breathe in <em>Cornwall.</em>
        </h1>
        <p className={styles.heroBody}>
          Seven characterful cottages, two Mongolian yurts, an indoor heated pool, and animals that
          know your name by day two.
        </p>
        <div className={styles.heroCtas}>
          <a href="#booking-widget" className={styles.btnPrimary}>
            Check Availability
          </a>
          <a href="#video" className={styles.btnSecondary}>
            Watch the farm tour →
          </a>
        </div>
        <div className={styles.heroRatings}>
          <span className={styles.heroRatingItem}>
            <span className={styles.heroRatingStars} aria-hidden="true">
              ★★★★★
            </span>
            <span>
              <span className={styles.heroRatingScore}>9.9</span>/10 on Booking.com
            </span>
          </span>
          <span className={styles.heroRatingDivider} aria-hidden="true" />
          <span className={styles.heroRatingItem}>
            <span className={styles.heroRatingStars} aria-hidden="true">
              ★★★★★
            </span>
            <span>
              <span className={styles.heroRatingScore}>4.9</span>/5 on Google · 115 reviews
            </span>
          </span>
        </div>
      </div>

      <div className={styles.statsBar}>
        <div className={styles.stat}>
          <div className={styles.statNum}>
            17<sup style={{ fontSize: "14px" }}>th</sup>
          </div>
          <div className={styles.statLabel}>Century Manor</div>
        </div>
        <div className={styles.statDivider} />
        <div className={styles.stat}>
          <div className={styles.statNum}>9</div>
          <div className={styles.statLabel}>Places to Stay</div>
        </div>
        <div className={styles.statDivider} />
        <div className={styles.stat}>
          <div className={styles.statNum}>5★</div>
          <div className={styles.statLabel}>Rated Farm</div>
        </div>
        <div className={styles.statDivider} />
        <div className={styles.stat}>
          <div className={styles.statNum}>2mi</div>
          <div className={styles.statLabel}>To the Beach</div>
        </div>
        <div className={styles.statDivider} />
        <div className={styles.stat}>
          <a href="#booking-widget" className={styles.bookLink}>
            Check dates →
          </a>
        </div>
      </div>

      <div className={styles.dots}>
        {SLIDES.map((_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => setActive(i)}
            className={cn(styles.dot, i === active && styles.dotActive)}
          />
        ))}
      </div>
      <button
        type="button"
        aria-label="Previous slide"
        onClick={() => setActive((i) => (i - 1 + SLIDES.length) % SLIDES.length)}
        className={cn(styles.arrow, styles.arrowPrev)}
      >
        ←
      </button>
      <button
        type="button"
        aria-label="Next slide"
        onClick={() => setActive((i) => (i + 1) % SLIDES.length)}
        className={cn(styles.arrow, styles.arrowNext)}
      >
        →
      </button>
    </section>
  );
}
