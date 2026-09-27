import Link from "next/link";
import { JsonLd } from "@/components/seo/json-ld";

export type FaqItem = {
  q: string;
  /** Plain-text answer, used for both the visible copy and the JSON-LD. */
  a: string;
  /** Optional internal link shown after the answer (not in the JSON-LD). */
  link?: { href: string; label: string };
};

/**
 * Accessible FAQ section: a native <details> accordion (works without any
 * client JS) plus schema.org FAQPage structured data. The visible answer text
 * matches the markup, per Google's guidelines.
 */
export function Faq({
  items,
  eyebrow = "Good to know",
  heading = "Frequently asked questions",
}: {
  items: FaqItem[];
  eyebrow?: string;
  heading?: string;
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };

  return (
    <section
      style={{
        background: "var(--color-cream, #f7f4ef)",
        padding: "72px 24px",
        borderTop: "1px solid rgba(127,151,137,0.15)",
      }}
    >
      <div style={{ maxWidth: 820, margin: "0 auto" }}>
        <p
          style={{
            fontSize: 11,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "var(--color-violet)",
            marginBottom: 10,
          }}
        >
          {eyebrow}
        </p>
        <h2
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: "clamp(24px, 3vw, 34px)",
            fontWeight: 400,
            color: "var(--color-deep-green, #2f4638)",
            margin: "0 0 28px",
          }}
        >
          {heading}
        </h2>

        <div>
          {items.map((item) => (
            <details
              key={item.q}
              style={{
                borderTop: "1px solid rgba(127,151,137,0.2)",
                padding: "18px 0",
              }}
            >
              <summary
                style={{
                  cursor: "pointer",
                  listStyle: "none",
                  fontFamily: "var(--font-serif)",
                  fontSize: 18,
                  color: "var(--color-deep-green, #2f4638)",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: 16,
                }}
              >
                {item.q}
                <span aria-hidden="true" style={{ color: "var(--color-violet)", fontSize: 22, lineHeight: 1 }}>
                  +
                </span>
              </summary>
              <div
                style={{
                  marginTop: 12,
                  fontSize: 15,
                  lineHeight: 1.8,
                  fontWeight: 300,
                  color: "var(--color-text-mid)",
                }}
              >
                {item.a}
                {item.link ? (
                  <>
                    {" "}
                    <Link
                      href={item.link.href}
                      style={{ color: "var(--color-violet)", textDecoration: "underline", textUnderlineOffset: 2 }}
                    >
                      {item.link.label}
                    </Link>
                  </>
                ) : null}
              </div>
            </details>
          ))}
        </div>
      </div>

      <JsonLd data={schema} />
    </section>
  );
}
