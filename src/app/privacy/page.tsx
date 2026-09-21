import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/legal-page";
import { SITE } from "@/lib/constants/seo";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Woodlands Manor Farm collects, uses and protects your personal data.",
  alternates: { canonical: "/privacy/" },
  robots: { index: false, follow: true },
};

export default function Page() {
  return (
    <LegalPage
      eyebrow="Woodlands Manor Farm · Legal"
      title="Privacy"
      titleAccent="policy"
      lastUpdated="September 2026"
      intro={
        <p style={{ marginBottom: 32 }}>
          Woodlands Manor Farm Holidays Ltd (company number 13474637, registered office 79 Higher
          Bore Street, Bodmin, England, PL31 1JT) is the data controller responsible for your
          personal data collected through this website. Trading address: Woodlands Manor Farm,
          Coombe Valley, Bude, Cornwall, EX23 9HT.
        </p>
      }
      sections={[
        {
          id: "who-we-are",
          title: "1. Who we are",
          content: (
            <>
              <p>
                Contact: Andrew Peters,{" "}
                <a href={`mailto:${SITE.contact.email}`} style={{ color: "var(--color-violet)" }}>
                  {SITE.contact.email}
                </a>
                , {SITE.contact.phoneDisplay}.
              </p>
              <p>
                We are registered with the Information Commissioner&rsquo;s Office (ICO),
                registration reference ZB154200. If you have a data protection query we
                can&rsquo;t resolve, you can also contact the ICO at{" "}
                <a
                  href="https://ico.org.uk"
                  target="_blank"
                  rel="noreferrer"
                  style={{ color: "var(--color-violet)" }}
                >
                  ico.org.uk
                </a>
                .
              </p>
            </>
          ),
        },
        {
          id: "data-collected",
          title: "2. What personal data we collect",
          content: (
            <>
              <p>Depending on how you interact with the site, we may collect:</p>
              <ul>
                <li>
                  <strong>Mailing list sign-ups:</strong> email address and your marketing consent, submitted via
                  our footer/popup sign-up form.
                </li>
                <li>
                  <strong>Live chat:</strong> your name, email or phone number if you provide
                  them, the content of your messages, and basic technical data (pages viewed,
                  browser/device, approximate location from IP).
                </li>
                <li>
                  <strong>Booking enquiries:</strong> name, contact details, and booking-related
                  information you provide via our contact form or SuperControl.
                </li>
              </ul>
            </>
          ),
        },
        {
          id: "how-we-use",
          title: "3. How we use your data, and our legal basis",
          content: (
            <ul>
              <li>
                <strong>Sending you newsletters/marketing emails</strong> — Your consent (given
                when you sign up and confirm your email address); you can withdraw this at any time.
              </li>
              <li>
                <strong>Responding to chat messages and enquiries</strong> — Legitimate interest
                (responding to a request you initiated).
              </li>
              <li>
                <strong>Processing bookings</strong> — Contract (necessary to fulfil a booking).
              </li>
              <li>
                <strong>Legal or regulatory obligations</strong> — Legal obligation.
              </li>
            </ul>
          ),
        },
        {
          id: "sharing",
          title: "4. Who we share your data with",
          content: (
            <>
              <p>
                We use the following third-party processors, who only handle your data on our
                instructions:
              </p>
              <ul>
                <li>
                  <strong>Brevo</strong> — provides our live chat, newsletter and enquiry
                  email service. Chat links your conversation across pages. Newsletter signup
                  sends your email address to Brevo to request a confirmation email; you join
                  the Woodlands Newsletter only after clicking its confirmation link. Enquiries
                  send your name, email, optional phone number and message to Ruth and Andy
                  through Brevo. Brevo is based in France.
                </li>
                <li>
                  <strong>SuperControl</strong> — our booking system, used to process booking
                  enquiries and reservations. Data is held on the hosting datacentre provided as
                  part of the SuperControl booking engine.
                </li>
                <li>
                  <strong>Google</strong> — we use Google Analytics (GA4) to understand how
                  visitors use the site (such as pages viewed, device type and approximate
                  location from IP), which helps us improve it. It loads and sets cookies only if you accept analytics. We
                  also use Google Search Console, which reports how the site performs in Google
                  Search and does not track individual visitors on this site. Data may be
                  processed by Google outside the UK under appropriate safeguards.
                </li>
              </ul>
              <p>
                We do not sell your personal data. Aside from Google Analytics (above), we do not
                run advertising or retargeting trackers (no Meta Pixel or similar) on this site.
              </p>
            </>
          ),
        },
        {
          id: "retention",
          title: "5. How long we keep your data",
          content: (
            <ul>
              <li>
                <strong>Mailing list data:</strong> until you unsubscribe or ask us to delete it.
              </li>
              <li>
                <strong>Chat transcripts:</strong> 24 months from your last interaction, unless
                needed longer to resolve a dispute.
              </li>
              <li>
                <strong>Booking records:</strong> retained as required for accounting and tax
                purposes (typically 6 years).
              </li>
            </ul>
          ),
        },
        {
          id: "your-rights",
          title: "6. Your rights",
          content: (
            <>
              <p>Under UK GDPR, you have the right to:</p>
              <ul>
                <li>Access the personal data we hold about you</li>
                <li>Have inaccurate data corrected</li>
                <li>Ask us to delete your data (&ldquo;right to be forgotten&rdquo;)</li>
                <li>Object to or restrict our processing</li>
                <li>Withdraw consent at any time (e.g. unsubscribe from marketing)</li>
                <li>Data portability, where applicable</li>
                <li>Complain to the ICO if you&rsquo;re unhappy with how we&rsquo;ve handled your data</li>
              </ul>
              <p>
                To exercise any of these rights, email{" "}
                <a href={`mailto:${SITE.contact.email}`} style={{ color: "var(--color-violet)" }}>
                  {SITE.contact.email}
                </a>
                .
              </p>
            </>
          ),
        },
        {
          id: "cookies",
          title: "7. Cookies",
          content: (
            <>
              <p>This website uses cookies and local browser storage:</p>
              <ul>
                <li>
                  We remember your analytics choice in local storage for 180 days. We also
                  remember newsletter popup dismissals and confirmation requests to avoid
                  repeatedly showing the signup prompt.
                </li>
                <li>
                  Brevo Conversations (live chat) sets a functional cookie — only if you open the
                  chat — so your conversation persists as you move between pages or return to the
                  site.
                </li>
                <li>
                  We use Cloudflare Web Analytics for basic, privacy-friendly page-view
                  statistics; this does not use cookies or track individuals.
                </li>
                <li>
                  Google Analytics (GA4) loads only after you choose &ldquo;Accept
                  analytics&rdquo;. It uses cookies such as _ga to measure page visits and
                  returning visitors. Choose &ldquo;Necessary only&rdquo; to decline. You can
                  withdraw consent using Cookie settings in the footer; this stops analytics
                  and clears its cookies on this site.
                </li>
              </ul>
            </>
          ),
        },
        {
          id: "security",
          title: "8. Security",
          content: (
            <p>
              We take reasonable technical and organisational measures to protect your personal
              data against unauthorised access, loss, or misuse.
            </p>
          ),
        },
        {
          id: "children",
          title: "9. Children",
          content: (
            <p>
              This website is not aimed at children, and we do not knowingly collect personal
              data from anyone under 16 without parental consent.
            </p>
          ),
        },
        {
          id: "changes",
          title: "10. Changes to this policy",
          content: (
            <p>
              We may update this policy from time to time; the current version will always be
              available on this page.
            </p>
          ),
        },
      ]}
    />
  );
}
