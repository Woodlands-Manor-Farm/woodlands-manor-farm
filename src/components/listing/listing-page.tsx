import Image from "next/image";
import styles from "./listing.module.css";
import { PropertyCard, type PropertyCardData } from "./property-card";
import { SITE } from "@/lib/constants/seo";

export type ListingPageProps = {
  hero: {
    image: string;
    alt: string;
    eyebrow: string;
    title: React.ReactNode;
    description: string;
  };
  cottages?: PropertyCardData[];
  yurts?: PropertyCardData[];
  cottagesHeading?: string;
  yurtsHeading?: string;
  showFacilities?: boolean;
  showGroupBanner?: boolean;
};

const FACILITIES = [
  { icon: "🏊", name: "Heated indoor pool", note: "30°C · open 8am–8pm" },
  { icon: "🎮", name: "Games room", note: "Pool, ping pong, soft play & more" },
  { icon: "🐮", name: "Feed the animals", note: "Sun & Wed with Ruth" },
  { icon: "🌿", name: "Woodland walk", note: "Bluebells in spring" },
  { icon: "🏖️", name: "2 miles to beach", note: "Duckpool · National Trust" },
];

export function ListingPage({
  hero,
  cottages,
  yurts,
  cottagesHeading,
  yurtsHeading,
  showFacilities = true,
  showGroupBanner = true,
}: ListingPageProps) {
  const total = (cottages?.length ?? 0) + (yurts?.length ?? 0);

  return (
    <>
      <section className={styles.hero}>
        <Image src={hero.image} alt={hero.alt} fill priority sizes="100vw" />
        <div className={styles.heroOverlay} />
        <div className={styles.heroContent}>
          <p className={styles.heroEyebrow}>{hero.eyebrow}</p>
          <h1 className={styles.heroTitle}>{hero.title}</h1>
          <p className={styles.heroDesc}>{hero.description}</p>
        </div>
      </section>

      <div className={styles.pageMain}>
        <div className={styles.gridHeader}>
          <span className={styles.gridCount}>
            Showing {total} {total === 1 ? "property" : "properties"}
          </span>
        </div>

        {cottages && cottages.length > 0 ? (
          <>
            {cottagesHeading ? (
              <div className={styles.divider}>
                <h2>{cottagesHeading}</h2>
                <div className={styles.dividerLine} />
              </div>
            ) : null}
            <div className={styles.grid}>
              {cottages.map((card) => (
                <PropertyCard key={card.href} data={card} />
              ))}
            </div>
          </>
        ) : null}

        {yurts && yurts.length > 0 ? (
          <>
            <div className={styles.divider} id="yurts">
              <h2>{yurtsHeading ?? "The Yurts"}</h2>
              <div className={styles.dividerLine} />
            </div>
            <div className={`${styles.grid} ${styles.gridTwoCol}`}>
              {yurts.map((card) => (
                <PropertyCard key={card.href} data={card} />
              ))}
            </div>
          </>
        ) : null}
      </div>

      {showFacilities ? (
        <section className={styles.facilities}>
          <div className={styles.facilitiesInner}>
            {FACILITIES.map((f) => (
              <div key={f.name} className={styles.facilityItem}>
                <div className={styles.facilityIcon}>{f.icon}</div>
                <div className={styles.facilityName}>{f.name}</div>
                <div className={styles.facilityNote}>{f.note}</div>
              </div>
            ))}
          </div>
        </section>
      ) : null}

      {showGroupBanner ? (
        <section className={styles.groupBanner}>
          <div>
            <p className={styles.groupEyebrow}>Exclusive use &amp; group bookings</p>
            <h2 className={styles.groupTitle}>
              Take over the <em>whole farm</em>
            </h2>
            <p className={styles.groupText}>
              Book multiple cottages together for reunions, milestone birthdays, hen parties or
              family holidays. All nine properties sleeping up to 44 guests can be reserved
              exclusively — with the pool, games room and farm all to yourselves.
            </p>
            <div className={styles.groupCtas}>
              <a href={`tel:${SITE.contact.phone}`} className={styles.btnPrimary}>
                Call Andy — {SITE.contact.phoneDisplay}
              </a>
              <a href={`mailto:${SITE.contact.email}`} className={styles.btnOutline}>
                Email us
              </a>
            </div>
          </div>
          <div className={styles.gcGrid}>
            <div className={styles.gcTile}>
              <div className={styles.gcNum}>44</div>
              <div className={styles.gcLabel}>Max guests</div>
              <div className={styles.gcDesc}>All nine properties combined</div>
            </div>
            <div className={styles.gcTile}>
              <div className={styles.gcNum}>9</div>
              <div className={styles.gcLabel}>Properties</div>
              <div className={styles.gcDesc}>7 cottages + 2 yurts</div>
            </div>
            <div className={styles.gcTile}>
              <div className={styles.gcNum}>1</div>
              <div className={styles.gcLabel}>Private pool</div>
              <div className={styles.gcDesc}>Exclusively yours</div>
            </div>
            <div className={styles.gcTile}>
              <div className={styles.gcNum}>10%</div>
              <div className={styles.gcLabel}>Direct discount</div>
              <div className={styles.gcDesc}>Book direct &amp; save</div>
            </div>
          </div>
        </section>
      ) : null}
    </>
  );
}
