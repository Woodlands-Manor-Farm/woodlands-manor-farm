import Image from "next/image";
import Link from "next/link";
import styles from "./property.module.css";
import { PropertyGallery, type GalleryImage } from "./property-gallery";
import { PROPERTIES } from "@/lib/constants/properties";
import { SITE } from "@/lib/constants/seo";
import { SuperControlWidget } from "@/components/booking/super-control-widget";
import { JsonLd } from "@/components/seo/json-ld";

export type PropertyPageData = {
  slug: string;
  name: string;
  nameLine2?: string;
  tag: string;
  subtitle: string;
  description: string;
  gallery: GalleryImage[];
  stats: {
    guests: number | string;
    bedrooms: number | string;
    bathrooms: number | string;
    dogs: string;
  };
  amenities: string[];
  miniReviews: { stars?: number; text: string; author: string }[];
  facilityChips: { icon: string; label: string }[];
  detailColumns: { title: string; items: string[] }[];
};

export function PropertyPage({ data }: { data: PropertyPageData }) {
  const property = PROPERTIES.find((p) => p.slug === data.slug);
  const others = PROPERTIES.filter((p) => p.slug !== data.slug).slice(0, 5);

  const schema = property
    ? {
        "@context": "https://schema.org",
        "@type": "VacationRental",
        name: `${data.name} — ${SITE.name}`,
        description: data.description,
        url: `${SITE.url}${property.href}`,
        image: `${SITE.url}${property.heroImage}`,
        containedInPlace: { "@id": `${SITE.url}/#lodging` },
        address: {
          "@type": "PostalAddress",
          streetAddress: SITE.contact.address.street,
          addressLocality: SITE.contact.address.city,
          addressRegion: SITE.contact.address.region,
          postalCode: SITE.contact.address.postalCode,
          addressCountry: SITE.contact.address.country,
        },
        occupancy: { "@type": "QuantitativeValue", maxValue: property.sleeps },
        numberOfBedrooms: property.bedrooms,
        petsAllowed: true,
        amenityFeature: data.amenities.map((a) => ({
          "@type": "LocationFeatureSpecification",
          name: a,
          value: true,
        })),
      }
    : null;

  return (
    <>
      {schema ? <JsonLd data={schema} /> : null}
      <div className={styles.pageWrap}>
        <div className={styles.galleryPanel}>
          <PropertyGallery images={data.gallery} propertyName={data.name} />
        </div>

        <aside className={styles.detailsPanel}>
          <div className={styles.detailsInner}>
            <div className={styles.tag}>{data.tag}</div>
            <h1 className={styles.name}>
              {data.name}
              {data.nameLine2 ? (
                <>
                  <br />
                  {data.nameLine2}
                </>
              ) : null}
            </h1>
            <div className={styles.subtitle}>{data.subtitle}</div>

            <div className={styles.quickStats}>
              <div className={styles.qs}>
                <span className={styles.qsIcon}>🏡</span>
                <span className={styles.qsVal}>{data.stats.guests}</span>
                <span className={styles.qsLabel}>Guests</span>
              </div>
              <div className={styles.qs}>
                <span className={styles.qsIcon}>🛏️</span>
                <span className={styles.qsVal}>{data.stats.bedrooms}</span>
                <span className={styles.qsLabel}>Bedrooms</span>
              </div>
              <div className={styles.qs}>
                <span className={styles.qsIcon}>🛁</span>
                <span className={styles.qsVal}>{data.stats.bathrooms}</span>
                <span className={styles.qsLabel}>Bathrooms</span>
              </div>
              <div className={styles.qs}>
                <span className={styles.qsIcon}>🐕</span>
                <span className={styles.qsVal}>{data.stats.dogs}</span>
                <span className={styles.qsLabel}>Dogs OK</span>
              </div>
            </div>

            <p className={styles.desc}>{data.description}</p>

            <div className={styles.bookingBox} id="booking">
              <div className={styles.bookingBoxLabel}>Book direct — best rate guaranteed</div>
              <div className={styles.bookingBoxTitle}>Check availability</div>
              <a href="#book" className={styles.btnBookNow}>
                Check Availability &amp; Book
              </a>
              <div className={styles.bookingNote}>
                No booking fees ·{" "}
                <a href={`tel:${SITE.contact.phone}`}>Call {SITE.contact.phoneDisplay}</a> for groups
              </div>
            </div>

            <div className={styles.callStrip}>
              <div className={styles.callStripText}>
                Group booking or returning guest?
                <strong>{SITE.contact.phoneDisplay}</strong>
              </div>
              <a href={`tel:${SITE.contact.phone}`} className={styles.callStripLink}>
                Call Andy
              </a>
            </div>

            <div className={styles.panelTitle}>Highlights</div>
            <div className={styles.amenities}>
              {data.amenities.map((a) => (
                <div key={a} className={styles.amenity}>
                  <div className={styles.amenityDot} />
                  {a}
                </div>
              ))}
            </div>

            {data.miniReviews.length > 0 ? (
              <>
                <div className={styles.panelTitle}>What guests say</div>
                <div className={styles.miniReviews}>
                  {data.miniReviews.map((r) => (
                    <div key={r.author} className={styles.miniReview}>
                      <div className={styles.miniStars}>{"★".repeat(r.stars ?? 5)}</div>
                      <div className={styles.miniText}>“{r.text}”</div>
                      <div className={styles.miniAuthor}>{r.author}</div>
                    </div>
                  ))}
                </div>
              </>
            ) : null}
          </div>
        </aside>
      </div>

      {property ? (
        <section className={styles.bookSection} id="book">
          <div className={styles.bookInner}>
            <p className={styles.eyebrow}>Secure online booking</p>
            <h2 className={styles.h2}>Check availability &amp; book direct</h2>
            <p className={styles.bookLead}>
              Real-time availability for {data.name}, powered by Supercontrol. No booking fees,
              best price guaranteed.
            </p>
            <div className={styles.widgetWrap}>
              <SuperControlWidget propertyId={property.superControlId} />
            </div>
            <p className={styles.bookFinePrint}>
              Booking trouble? Call Andy direct on{" "}
              <a href={`tel:${SITE.contact.phone}`}>{SITE.contact.phoneDisplay}</a> — he&rsquo;ll
              sort it.
            </p>
          </div>
        </section>
      ) : null}

      <section className={styles.below}>
        <div className={styles.belowInner}>
          <p className={styles.eyebrow}>The property</p>
          <h2 className={styles.h2}>Every room, every detail</h2>

          <div className={styles.facilityChips}>
            {data.facilityChips.map((c) => (
              <div key={c.label} className={styles.chip}>
                <span className={styles.chipIcon}>{c.icon}</span> {c.label}
              </div>
            ))}
          </div>

          <div
            className={styles.detailGrid}
            style={data.detailColumns.length === 4 ? { gridTemplateColumns: "repeat(2, 1fr)" } : undefined}
          >
            {data.detailColumns.map((col) => (
              <div key={col.title} className={styles.detailCol}>
                <h3>{col.title}</h3>
                <ul>
                  {col.items.map((item, i) => (
                    <li key={`${col.title}-${i}`}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.others}>
        <div className={styles.othersTitle}>Also at Woodlands Manor Farm</div>
        <div className={styles.othersStrip}>
          {others.map((p) => (
            <Link key={p.slug} href={p.href} className={styles.cottageThumb}>
              <div className={styles.cottageThumbImg}>
                <Image src={p.heroImage} alt={p.name} fill sizes="(min-width: 900px) 20vw, 50vw" />
              </div>
              <div className={styles.cottageThumbInfo}>
                <div className={styles.ctiName}>{p.name}</div>
                <div className={styles.ctiSleeps}>Sleeps {p.sleeps}</div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
