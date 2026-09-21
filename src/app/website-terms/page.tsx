import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage } from "@/components/legal/legal-page";
import { SITE } from "@/lib/constants/seo";

export const metadata: Metadata = {
  title: "Website Terms & Conditions",
  description:
    "Terms and conditions for using the Woodlands Manor Farm website, mailing list and live chat.",
  alternates: { canonical: "/website-terms/" },
  robots: { index: false, follow: true },
};

export default function Page() {
  return (
    <LegalPage
      eyebrow="Woodlands Manor Farm · Legal"
      title="Website terms &amp;"
      titleAccent="conditions"
      lastUpdated="September 2026"
      intro={
        <p style={{ marginBottom: 32 }}>
          These terms govern your use of this website, our mailing list and our live chat
          facility. Bookings are covered separately by our{" "}
          <Link href="/terms-conditions/" style={{ color: "var(--color-violet)" }}>
            Booking Terms &amp; Conditions
          </Link>
          .
        </p>
      }
      sections={[
        {
          id: "who-we-are",
          title: "1. Who we are",
          content: (
            <>
              <p>
                This website (woodlandsmanorfarm.co.uk) is operated by Woodlands Manor Farm
                Holidays Ltd, a company registered in England and Wales under company number
                13474637, whose registered office is at 79 Higher Bore Street, Bodmin, England,
                PL31 1JT. Our trading address is Woodlands Manor Farm, Coombe Valley, Bude,
                Cornwall, EX23 9HT.
              </p>
              <p>
                Throughout this site, &ldquo;we&rdquo;, &ldquo;us&rdquo; and &ldquo;our&rdquo;
                refer to Woodlands Manor Farm.
              </p>
            </>
          ),
        },
        {
          id: "acceptance",
          title: "2. Acceptance of these terms",
          content: (
            <p>
              By using this website, signing up to our mailing list, or using our live chat
              facility, you agree to be bound by these Terms and Conditions and our{" "}
              <Link href="/privacy/" style={{ color: "var(--color-violet)" }}>
                Privacy Policy
              </Link>
              . If you do not agree, please do not use the site.
            </p>
          ),
        },
        {
          id: "use",
          title: "3. Use of this website",
          content: (
            <ul>
              <li>
                The content of this website is for general information about Woodlands Manor Farm
                and our holiday accommodation, and is subject to change without notice.
              </li>
              <li>
                You may not use this website in any way that causes, or is likely to cause, the
                website or access to it to be interrupted, damaged, or impaired.
              </li>
              <li>
                All content, text, images, and branding on this site are owned by or licensed to
                us and may not be copied or reproduced without permission.
              </li>
            </ul>
          ),
        },
        {
          id: "bookings",
          title: "4. Bookings",
          content: (
            <p>
              This website provides information about our holiday accommodation and allows you to
              make enquiries or bookings via our booking system, SuperControl. Bookings are
              subject to our separate{" "}
              <Link href="/terms-conditions/" style={{ color: "var(--color-violet)" }}>
                Booking Terms &amp; Conditions
              </Link>
              , which are provided at the time of booking and cover cancellation policy, payment,
              deposits, and guest conduct.
            </p>
          ),
        },
        {
          id: "mailing-list",
          title: "5. Mailing list",
          content: (
            <>
              <p>
                If you sign up to receive our newsletter or marketing emails via our website
                sign-up form:
              </p>
              <ul>
                <li>
                  You are confirming you want to receive marketing communications from us by
                  email, in line with the Privacy and Electronic Communications Regulations
                  (PECR).
                </li>
                <li>
                  We use Brevo to manage and send these communications — see the{" "}
                  <Link href="/privacy/" style={{ color: "var(--color-violet)" }}>
                    Privacy Policy
                  </Link>{" "}
                  for how your data is handled.
                </li>
                <li>
                  You can unsubscribe at any time using the link in any email we send, or by
                  emailing us at{" "}
                  <a href={`mailto:${SITE.contact.email}`} style={{ color: "var(--color-violet)" }}>
                    {SITE.contact.email}
                  </a>
                  .
                </li>
                <li>
                  We will never sell or share your details with third parties for their own
                  marketing purposes.
                </li>
              </ul>
            </>
          ),
        },
        {
          id: "live-chat",
          title: "6. Live chat facility",
          content: (
            <>
              <p>
                Our website includes a live chat feature, Brevo Conversations, so you can message
                us directly.
              </p>
              <ul>
                <li>
                  Anything you type into the chat, along with basic technical data (such as pages
                  viewed, browser/device type, and approximate location from your IP address), is
                  processed by us and by Brevo as our service provider, so our team can respond to
                  you.
                </li>
                <li>
                  Brevo Conversations sets a functional cookie so your conversation can continue
                  as you move between pages or return to the site.
                </li>
                <li>
                  Chat transcripts may be stored so we can follow up on enquiries and improve our
                  service.
                </li>
                <li>
                  Please don&rsquo;t send sensitive personal information (e.g. health details,
                  payment card numbers) via chat.
                </li>
                <li>
                  The chat facility is intended for genuine enquiries; we reserve the right to
                  block abusive or inappropriate use.
                </li>
              </ul>
            </>
          ),
        },
        {
          id: "liability",
          title: "7. Liability",
          content: (
            <p>
              We make reasonable efforts to keep information on this website accurate and up to
              date, but we do not guarantee it is complete or error-free. We accept no liability
              for any loss arising from reliance on the content of this website, except where we
              are legally unable to exclude such liability (e.g. death or personal injury caused
              by our negligence, or fraud).
            </p>
          ),
        },
        {
          id: "links",
          title: "8. Links to other websites",
          content: (
            <p>
              This website may contain links to third-party websites. We are not responsible for
              the content or privacy practices of those sites.
            </p>
          ),
        },
        {
          id: "governing-law",
          title: "9. Governing law",
          content: (
            <p>
              These terms are governed by the laws of England and Wales, and any disputes will be
              subject to the exclusive jurisdiction of the courts of England and Wales.
            </p>
          ),
        },
        {
          id: "changes",
          title: "10. Changes to these terms",
          content: (
            <p>
              We may update these terms from time to time. The current version will always be
              available on this page.
            </p>
          ),
        },
        {
          id: "contact",
          title: "11. Contact us",
          content: (
            <p style={{ lineHeight: 1.9 }}>
              Woodlands Manor Farm Holidays Ltd
              <br />
              Woodlands Manor Farm, Coombe Valley, Bude, Cornwall, EX23 9HT
              <br />
              Attn: Andrew Peters
              <br />
              Email:{" "}
              <a href={`mailto:${SITE.contact.email}`} style={{ color: "var(--color-violet)" }}>
                {SITE.contact.email}
              </a>
              <br />
              Phone: {SITE.contact.phoneDisplay}
            </p>
          ),
        },
      ]}
    />
  );
}
