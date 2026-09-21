import type { Metadata } from "next";
import { AboutSubnav, CtaStrip, InfoHero, infoStyles as styles } from "@/components/info/info-shell";

type Milestone = { year: string; text: string };

const TIMELINE: Milestone[] = [
  { year: "Domesday", text: "The farm is recorded in the Domesday Book — and local historians believe the original site may date back to Roman times." },
  { year: "c. 1600", text: "Woodlands takes on its current form: barns and Manor House of matching solid Cornish stone, quarried down in our own woods." },
  { year: "1871", text: "Then a working farm, Woodlands is bought by the Tynne family, whose estate likely covered most of the valley." },
  { year: "1930", text: "The Cann family, who had long worked the land, are given the option to buy the farm." },
  { year: "1993", text: "The Webb family buy Woodlands." },
  { year: "1997–2000", text: "The rapidly degrading barns are renovated into luxury cottages by local builder Barry Hockridge and his son — over four years of work, reusing original materials wherever possible. The cottage complex opens in December 2000." },
  { year: "2001", text: "The building enclosing the swimming pool is completed in March." },
  { year: "2007", text: "The farm is sold again; the new owners convert the Grade II listed Manor House into a self-catering house." },
  { year: "2009", text: "Nigel and Adele Murray buy Woodlands and convert two more farm buildings into holiday cottages — The Coach House and The Stables." },
  { year: "2019", text: "The Peters family buy the farm at the end of August as a going concern, with an ambition to keep improving the site so guests have a wonderful holiday and want to return." },
];

export const metadata: Metadata = {
  title: "The History of Woodlands Manor Farm",
  description:
    "The story of Woodlands Manor Farm, Bude — from the Domesday Book and a working Cornish farm to the luxury holiday cottages and Grade II listed Manor House we care for today.",
  alternates: { canonical: "/woodlands-history/" },
};

export default function Page() {
  return (
    <>
      <InfoHero
        image="/images/the-manor-house/manor-exterior-garden.jpg"
        alt="The Manor House at Woodlands — a 17th-century Cornish stone farmhouse"
        eyebrow="Woodlands Manor Farm · Bude, Cornwall"
        title={
          <>
            Our
            <br />
            <em>history</em>
          </>
        }
        description="From the Domesday Book to a much-loved collection of holiday cottages — the long story of the farm you're staying on."
      />
      <AboutSubnav activeHref="/woodlands-history/" />

      <div className={styles.pageContent}>
        <p className={styles.eyebrow}>Nearly a thousand years</p>
        <h2 className={styles.sectionTitle}>
          A working farm <em>since Domesday</em>
        </h2>
        <p className={styles.sectionBody}>
          The farm dates back to the Domesday Book, and local historians believe the original site of
          Woodlands could reach as far back as Roman times. In its current form we think Woodlands
          dates to around 1600 — the barns and Manor House share the same solid Cornish stone, and the
          quarries it came from can still be seen down in our woods.
        </p>
        <p className={styles.sectionBody}>
          From the deeds we can trace ownership back to 1871, when Woodlands — then a working farm —
          was purchased by the Tynne family, whose estate likely covered most of the valley. The land
          was worked by the Cann family, who were given the option to buy it in 1930. Alan Cann has
          since passed away, but the family’s long connection to the valley lives on.
        </p>

        <h2 className={styles.sectionTitle}>
          From barns to <em>holiday cottages</em>
        </h2>
        <p className={styles.sectionBody}>
          In 1993 the farm was bought by the Webb family, and in 1997 — with the barns rapidly falling
          into disrepair — the decision was made to renovate them as luxury letting cottages. The work
          was carried out by local builder Barry Hockridge and his son, and took over four years.
          Barry blended new techniques with old, reusing original material wherever possible. The
          cottage complex opened in December 2000, with the building enclosing the swimming pool
          completed in March 2001.
        </p>
        <p className={styles.sectionBody}>
          Renovating the Manor House took three years in itself. As a Grade II listed building, all the
          work had to retain the property’s original character. Its roof has a scantle design — large
          tiles at the bottom graduating to small ones at the top — with over 18,000 tiles of specific
          sizes, every one of them reclaimed.
        </p>
        <p className={styles.sectionBody}>
          The duck pond had been filled in some thirty years earlier. When an inspector from the
          Environment Agency noticed it marked on his map during a visit, the decision was taken to
          reinstate it — with Alan Cann’s help in remembering where the spring lay. Many old artefacts
          were uncovered during the re-digging, some of which now lean against the wall of the sunken
          garden.
        </p>
        <p className={styles.sectionBody}>
          The farm was sold again in 2007, and those owners converted the Manor House into a
          self-catering house too. In October 2009 Nigel and Adele Murray purchased Woodlands and
          converted two more farm buildings — The Coach House and The Stables — into holiday cottages.
          The Peters family took Woodlands on as a going concern at the end of August 2019, with a
          simple ambition: to keep improving the farm so that every guest has a wonderful holiday and
          wants to come back.
        </p>

        <h2 className={styles.sectionTitle}>
          Woodlands <em>through the years</em>
        </h2>
        <div style={{ display: "grid", gap: 0, marginTop: 8, marginBottom: 8 }}>
          {TIMELINE.map((m, i) => (
            <div
              key={m.year}
              style={{
                display: "grid",
                gridTemplateColumns: "120px 1fr",
                gap: 20,
                padding: "16px 0",
                borderTop: i === 0 ? "none" : "1px solid rgba(127,151,137,0.15)",
              }}
            >
              <div
                style={{
                  fontSize: 13,
                  fontWeight: 600,
                  letterSpacing: "0.04em",
                  color: "var(--color-violet)",
                  paddingTop: 2,
                }}
              >
                {m.year}
              </div>
              <p className={styles.sectionBody} style={{ margin: 0 }}>
                {m.text}
              </p>
            </div>
          ))}
        </div>
      </div>

      <CtaStrip
        title="Be part of the next chapter."
        body="Book a stay on a farm that's been welcoming people for nearly a thousand years."
      />
    </>
  );
}
