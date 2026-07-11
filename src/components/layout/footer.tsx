import Link from "next/link";
import { NewsletterForm } from "@/components/marketing/newsletter-form";
import { NEWSLETTER } from "@/lib/constants/newsletter";
import { SITE } from "@/lib/constants/seo";

const STAY_LINKS = [
  { label: "Manor House (12)", href: "/the-manor-house/" },
  { label: "Rose Cottage (8)", href: "/rose-cottage/" },
  { label: "Jasmine Cottage (6)", href: "/jasmine-cottage/" },
  { label: "Lavender Cottage (4)", href: "/lavender-cottage/" },
  { label: "The Stables (4)", href: "/the-stables/" },
  { label: "Honeysuckle (2)", href: "/honeysuckle-cottage/" },
  { label: "Coach House (2)", href: "/the-coach-house/" },
  { label: "The Yurts", href: "/yurts/" },
];

const EXPLORE_LINKS = [
  { label: "On the Farm", href: "/on-the-farm/" },
  { label: "Experiences", href: "/experiences-weddings-events/" },
  { label: "Things to do", href: "/things-to-do-in-bude/" },
  { label: "Places to eat", href: "/places-to-eat-in-bude/" },
  { label: "Dog friendly", href: "/dog-rules/" },
  { label: "Special offers", href: "/special-offers/" },
  { label: "News & blog", href: "/news/" },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#4a6459] px-6 pb-10 pt-16 md:px-16">
      <div className="mx-auto grid max-w-6xl gap-12 border-b border-[rgba(247,243,238,0.1)] pb-12 md:grid-cols-[2fr_1fr_1fr_1fr]">
        <div>
          <Link href="/" className="block font-serif text-xl text-[var(--color-cream)] no-underline">
            {SITE.name}
            <span className="mt-0.5 block font-sans text-[10px] font-normal uppercase tracking-[0.3em] text-[var(--color-warm-stone)]">
              Bude, Cornwall · {SITE.contact.address.postalCode}
            </span>
          </Link>
          <p className="mt-6 max-w-sm text-[13px] font-light leading-7 text-[rgba(247,243,238,0.45)]">
            A 17th-century farm in the Coombe Valley offering cottages, yurts, an indoor pool, and
            the warmest of Cornish welcomes.
          </p>
          <div className="mt-6 flex gap-3">
            <a
              href="https://www.facebook.com/woodlandsmanorfarm.co.uk/"
              target="_blank"
              rel="noreferrer"
              aria-label="Facebook"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-[rgba(247,243,238,0.15)] text-xs text-[rgba(247,243,238,0.6)] transition-colors hover:border-[var(--color-cream)] hover:text-[var(--color-cream)]"
            >
              f
            </a>
            <a
              href="https://www.instagram.com/woodlandsmanorfarm/"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-[rgba(247,243,238,0.15)] text-xs text-[rgba(247,243,238,0.6)] transition-colors hover:border-[var(--color-cream)] hover:text-[var(--color-cream)]"
            >
              ig
            </a>
          </div>
        </div>

        <div>
          <h4 className="mb-5 text-[11px] uppercase tracking-[0.25em] text-[var(--color-warm-stone)]">
            Stay
          </h4>
          <ul className="space-y-2.5 text-[13px] font-light">
            {STAY_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-[rgba(247,243,238,0.5)] transition-colors hover:text-[var(--color-cream)]"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="mb-5 text-[11px] uppercase tracking-[0.25em] text-[var(--color-warm-stone)]">
            Explore
          </h4>
          <ul className="space-y-2.5 text-[13px] font-light">
            {EXPLORE_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-[rgba(247,243,238,0.5)] transition-colors hover:text-[var(--color-cream)]"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="mb-5 text-[11px] uppercase tracking-[0.25em] text-[var(--color-warm-stone)]">
            Contact
          </h4>
          <ul className="space-y-2.5 text-[13px] font-light text-[rgba(247,243,238,0.5)]">
            <li>
              <a
                href={`tel:${SITE.contact.phone}`}
                className="transition-colors hover:text-[var(--color-cream)]"
              >
                {SITE.contact.phoneDisplay}
              </a>
            </li>
            <li>
              <a
                href={`mailto:${SITE.contact.email}`}
                className="transition-colors hover:text-[var(--color-cream)]"
              >
                {SITE.contact.email}
              </a>
            </li>
            <li className="pt-2 leading-6">
              {SITE.contact.address.street}
              <br />
              {SITE.contact.address.city}, {SITE.contact.address.region}
              <br />
              {SITE.contact.address.postalCode}
            </li>
            <li>
              <a
                href={SITE.contact.googleMapsUrl}
                target="_blank"
                rel="noreferrer"
                className="transition-colors hover:text-[var(--color-cream)]"
              >
                Get directions →
              </a>
            </li>
          </ul>
        </div>
      </div>

      {NEWSLETTER.formActionUrl && (
        <div className="mx-auto grid max-w-6xl gap-8 border-b border-[rgba(247,243,238,0.1)] py-12 md:grid-cols-2 md:items-center">
          <div>
            <h4 className="mb-3 text-[11px] uppercase tracking-[0.25em] text-[var(--color-warm-stone)]">
              Last-minute offers &amp; farm news
            </h4>
            <p className="max-w-sm text-[13px] font-light leading-6 text-[rgba(247,243,238,0.45)]">
              Late-availability deals and a short monthly newsletter from the farm. No spam —
              unsubscribe any time.
            </p>
          </div>
          <div className="max-w-md">
            <NewsletterForm variant="footer" />
          </div>
        </div>
      )}

      <div className="mx-auto mt-10 flex max-w-6xl flex-col items-start justify-between gap-3 text-xs text-[rgba(247,243,238,0.3)] md:flex-row md:items-center">
        <span>© {year} Woodlands Manor Farm. All rights reserved.</span>
        <ul className="flex flex-wrap gap-x-5 gap-y-2">
          <li>
            <Link href="/privacy/" className="hover:text-[var(--color-cream)]">
              Privacy
            </Link>
          </li>
          <li>
            <Link href="/terms-conditions/" className="hover:text-[var(--color-cream)]">
              Terms
            </Link>
          </li>
          <li>
            <Link href="/dog-rules/" className="hover:text-[var(--color-cream)]">
              Dog Rules
            </Link>
          </li>
          <li>
            <Link href="/holiday-cottage-inventory/" className="hover:text-[var(--color-cream)]">
              Inventory
            </Link>
          </li>
        </ul>
      </div>
    </footer>
  );
}
