import Image from "next/image";
import Link from "next/link";
import styles from "./info.module.css";
import { BOOK_HREF } from "@/lib/constants/nav";
import { cn } from "@/lib/utils";

const ABOUT_SUBNAV = [
  { href: "/about-woodlands-manor-farm-holiday-cottages-with-a-pool/", label: "About Woodlands" },
  { href: "/on-the-farm/", label: "On the Farm" },
  { href: "/the-animals-at-woodlands/", label: "The Animals" },
  { href: "/things-to-do-in-bude/", label: "Things to Do" },
  { href: "/places-to-eat-in-bude/", label: "Places to Eat" },
  { href: "/the-little-extras/", label: "Little Extras" },
  { href: "/holiday-cottage-inventory/", label: "Inventory" },
  { href: "/dog-rules/", label: "Dog Rules" },
];

export function InfoHero({
  image,
  alt,
  eyebrow,
  title,
  description,
}: {
  image: string;
  alt: string;
  eyebrow: string;
  title: React.ReactNode;
  description: string;
}) {
  return (
    <section className={styles.hero}>
      <Image src={image} alt={alt} fill priority sizes="100vw" />
      <div className={styles.heroOverlay} />
      <div className={styles.heroContent}>
        <p className={styles.heroEyebrow}>{eyebrow}</p>
        <h1 className={styles.heroTitle}>{title}</h1>
        <p className={styles.heroDesc}>{description}</p>
      </div>
    </section>
  );
}

export function AboutSubnav({ activeHref }: { activeHref: string }) {
  return (
    <div className={styles.subNavWrap}>
      <div className={styles.subNav}>
        <span className={styles.subNavLabel}>About</span>
        {ABOUT_SUBNAV.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={link.href === activeHref ? "active" : undefined}
          >
            {link.label}
          </Link>
        ))}
      </div>
    </div>
  );
}

export function CtaStrip({
  title,
  body,
  ctaLabel = "Check availability",
  ctaHref = BOOK_HREF,
}: {
  title: string;
  body: string;
  ctaLabel?: string;
  ctaHref?: string;
}) {
  return (
    <section className={styles.ctaStrip}>
      <div>
        <h2>{title}</h2>
        <p>{body}</p>
      </div>
      <Link href={ctaHref} className={styles.btnWhite}>
        {ctaLabel}
      </Link>
    </section>
  );
}

export type InfoCardData = {
  icon: string;
  title: string;
  body: string;
  variant?: "default" | "violet" | "gold" | "dark";
  link?: { href: string; label: string };
};

export function InfoCard({ icon, title, body, variant = "default", link }: InfoCardData) {
  return (
    <div
      className={cn(
        styles.infoCard,
        variant === "violet" && styles.infoCardViolet,
        variant === "gold" && styles.infoCardGold,
        variant === "dark" && styles.infoCardDark,
      )}
    >
      <span className={styles.icIcon}>{icon}</span>
      <div className={styles.icTitle}>{title}</div>
      <p className={styles.icBody}>{body}</p>
      {link ? (
        <a
          href={link.href}
          target="_blank"
          rel="noreferrer"
          style={{
            display: "inline-block",
            marginTop: 12,
            fontSize: 13,
            fontWeight: 500,
            color: "var(--color-violet)",
            textDecoration: "none",
          }}
        >
          {link.label} →
        </a>
      ) : null}
    </div>
  );
}

export function InfoCardGrid({
  cards,
  twoColumn = false,
}: {
  cards: InfoCardData[];
  twoColumn?: boolean;
}) {
  return (
    <div className={cn(styles.cardGrid, twoColumn && styles.cardGrid2)}>
      {cards.map((card) => (
        <InfoCard key={card.title} {...card} />
      ))}
    </div>
  );
}

export { styles as infoStyles };
