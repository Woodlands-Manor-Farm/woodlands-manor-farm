import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { DOG_POLICY } from "@/lib/constants/dog-policy";
import {
  CtaStrip,
  InfoCardGrid,
  InfoHero,
  infoStyles as styles,
} from "@/components/info/info-shell";

const BAILEY_PHOTOS = [
  {
    src: "/images/farm/dog-bailey-bluebells.jpg",
    alt: "Bailey, the Woodlands Bernedoodle, in the bluebell woodland",
  },
  {
    src: "/images/farm/dog-bailey-meadow.jpg",
    alt: "Bailey sitting in the open meadow in his harness",
  },
  {
    src: "/images/farm/dog-bailey-family.jpg",
    alt: "A family woodland walk with Bailey at Woodlands Manor Farm",
  },
  {
    src: "/images/farm/dog-bailey-grass.jpg",
    alt: "Bailey relaxing in the long grass on the farm",
  },
];

export const metadata: Metadata = {
  title: "Dog Friendly Holiday Cottages in Bude, Cornwall",
  description:
    `Seven dog-friendly cottages and two yurts in Bude, Cornwall. Woodland walks and nearby beaches. ${DOG_POLICY.charge}; more than two dogs by prior agreement.`,
  alternates: { canonical: "/dog-friendly-holiday-cottages-bude/" },
  openGraph: {
    title: "Dog Friendly Holiday Cottages in Bude, Cornwall — Woodlands Manor Farm",
    description:
      `Seven cottages and two yurts welcome well-behaved dogs. ${DOG_POLICY.charge}. ${DOG_POLICY.additionalDogs} Off-lead meadow and woodland walks, with dogs under control.`,
    images: ["/images/farm/bluebell-woodland.jpg"],
  },
};

export default function DogFriendlyPage() {
  return (
    <>
      <InfoHero
        image="/images/farm/bluebell-woodland.jpg"
        alt="Bluebell woodland walk at Woodlands Manor Farm — dogs may explore off lead under control"
        eyebrow="Woodlands Manor Farm · Bude, Cornwall"
        title={
          <>
            Dog friendly <em>holidays</em>
          </>
        }
        description="Every cottage and yurt at Woodlands welcomes well-behaved dogs — with 15 acres of woodland, an open meadow and dog-friendly beaches minutes away, this is their holiday too."
      />

      <div className={styles.pageContent}>
        <p className={styles.eyebrow}>Dogs welcome — properly welcome</p>
        <h2 className={styles.sectionTitle}>
          A farm holiday your dog will <em>never forget</em>
        </h2>
        <p className={styles.sectionBody}>
          All seven of our holiday cottages and both glamping yurts welcome well-behaved dogs,
          for {DOG_POLICY.charge}. {DOG_POLICY.additionalDogs} Our own Bernedoodle, Bailey,
          will tell you there&rsquo;s plenty to explore: fifteen acres of ancient woodland,
          an open meadow and some of Cornwall&rsquo;s best dog-friendly beaches ten minutes
          down the road. {DOG_POLICY.leads}
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
            gap: 12,
            marginTop: 28,
          }}
        >
          {BAILEY_PHOTOS.map((p) => (
            <div
              key={p.src}
              style={{
                position: "relative",
                aspectRatio: "3 / 4",
                borderRadius: 10,
                overflow: "hidden",
              }}
            >
              <Image
                src={p.src}
                alt={p.alt}
                fill
                sizes="(min-width: 900px) 22vw, 45vw"
                style={{ objectFit: "cover", objectPosition: "center" }}
              />
            </div>
          ))}
        </div>
        <p
          style={{
            fontSize: 13,
            color: "var(--color-text-mid)",
            fontWeight: 300,
            fontStyle: "italic",
            marginTop: 10,
          }}
        >
          Bailey, our Bernedoodle — chief woodland officer.
        </p>

        <h3 className={styles.subHeading}>Places to explore</h3>
        <InfoCardGrid
          cards={[
            {
              icon: "🌳",
              title: "15-acre woodland — off lead",
              body: "Explore our ancient woodland with your dog off lead, keeping them under control. Carpeted in bluebells through April and May, there is plenty to sniff all year round.",
            },
            {
              icon: "🌾",
              title: "Open meadow — off lead",
              body: "A big open meadow for a morning or evening walk with your dog. Dogs may be off lead here, provided they stay under control.",
              variant: "violet",
            },
            {
              icon: "⚽",
              title: "Playing field — on lead",
              body: "Dogs are welcome on the playing field on a lead, as children share this space. The enclosed field is great for a calmer mooch.",
              variant: "gold",
            },
            {
              icon: "🐮",
              title: "Around the farm — on lead",
              body: "Leads on around the farmyard and courtyard please — the ponies, alpacas, goats and chickens live close by, and they're nosy.",
              variant: "dark",
            },
            {
              icon: "🏖️",
              title: "Local beaches — endless adventure",
              body: "Bude's local beaches offer endless adventure — Duckpool is a walk away, and others are a short drive.",
              variant: "gold",
            },
            {
              icon: "🐾",
              title: "Out for the day?",
              body: DOG_POLICY.supervision,
              variant: "violet",
            },
          ]}
        />

        <h3 className={styles.subHeading}>Dog-friendly beaches &amp; walks</h3>
        <p style={{ fontSize: 14, color: "var(--color-text-mid)", lineHeight: 1.85, fontWeight: 300 }}>
          <strong>Sandymouth and Duckpool</strong> — our two nearest beaches — welcome dogs all
          year round, and both are spectacular: National Trust coastline, rock pools and huge
          sands at low tide. Bude&rsquo;s town beaches have summer restrictions, so{" "}
          <a
            href="https://www.visitbude.info/dog-friendly-beaches-in-bude/"
            target="_blank"
            rel="noreferrer"
            style={{ color: "var(--color-violet)" }}
          >
            check the latest times on Visit Bude
          </a>{" "}
          before you go. For walks from the farm gate, ask Ruth — her top tips are{" "}
          <strong>Rookery Wood, Stowe Woods and Kilkhampton Common</strong>, all walkable from
          Woodlands. And every local pub is dog friendly: Bailey particularly recommends the
          burgers at <Link href="/bush-inn-morwenstow-best-pub-cornwall/" style={{ color: "var(--color-violet)" }}>The Bush Inn at Morwenstow</Link>.
        </p>

        <h3 className={styles.subHeading}>The house rules</h3>
        <p style={{ fontSize: 14, color: "var(--color-text-mid)", lineHeight: 1.85, fontWeight: 300 }}>
          A few simple things so every guest — two- and four-legged — has a great stay. Please
          bring your dog&rsquo;s own bed and bowls. {DOG_POLICY.indoors} {DOG_POLICY.leads}{" "}
          {DOG_POLICY.additionalDogs} {DOG_POLICY.supervision} Full details are on our dog rules page below, or just ask
          — we&rsquo;re dog people, we get it.
        </p>
        <div style={{ marginTop: 22 }}>
          <Link
            href="/dog-rules/"
            style={{
              display: "inline-block",
              background: "var(--color-violet)",
              color: "#FEFEFE",
              padding: "14px 28px",
              borderRadius: 2,
              fontSize: 12,
              fontWeight: 500,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              textDecoration: "none",
            }}
          >
            Read the full dog rules →
          </Link>
        </div>
      </div>

      <CtaStrip
        title="Bring the dog — book your stay"
        body="All nine properties are dog friendly. Best price guaranteed when you book direct."
      />
    </>
  );
}
