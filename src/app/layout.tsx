import type { Metadata } from "next";
import { Jost, Playfair_Display } from "next/font/google";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { StructuredData } from "@/components/seo/structured-data";
import { SITE } from "@/lib/constants/seo";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "600"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-playfair",
});

const jost = Jost({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  display: "swap",
  variable: "--font-jost",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} — ${SITE.tagline}`,
    template: `%s — ${SITE.name}`,
  },
  description: SITE.description,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: SITE.name,
    locale: SITE.locale,
    url: SITE.url,
    title: `${SITE.name} — ${SITE.tagline}`,
    description: SITE.description,
    images: [
      {
        url: "/images/cottages/9792dd1b5f66d139.jpg",
        width: 1200,
        height: 630,
        alt: "Holiday cottages with a heated indoor pool at Woodlands Manor Farm, Bude, Cornwall",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.name} — ${SITE.tagline}`,
    description: SITE.description,
    images: ["/images/cottages/9792dd1b5f66d139.jpg"],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-GB" className={`${playfair.variable} ${jost.variable}`}>
      <body className="bg-[var(--color-cream)] text-[var(--color-text-dark)]">
        <StructuredData />
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
