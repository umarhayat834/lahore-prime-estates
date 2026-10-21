import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Inter, Playfair_Display } from "next/font/google";
import { LocaleProvider } from "@/components/ui/locale-provider";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { WhatsAppFab } from "@/components/layout/whatsapp-fab";
import { site } from "@/data/site";
import { img } from "@/lib/images";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.siteUrl),
  title: {
    default: "Lahore Prime Estates | Buy, Sell & Rent Property in Lahore",
    template: "%s | Lahore Prime Estates",
  },
  description: site.description,
  keywords: [
    "property in Lahore",
    "DHA Lahore plots",
    "Bahria Town Lahore houses",
    "Gulberg apartments",
    "houses for sale in Lahore",
  ],
  applicationName: site.name,
  authors: [{ name: site.name }],
  openGraph: {
    type: "website",
    locale: "en_PK",
    url: site.siteUrl,
    siteName: site.name,
    title: "Lahore Prime Estates | Buy, Sell & Rent Property in Lahore",
    description: site.description,
    images: [{ url: img.villaPoolDusk, width: 1200, height: 800, alt: site.tagline }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Lahore Prime Estates | Buy, Sell & Rent Property in Lahore",
    description: site.description,
    images: [{ url: img.villaPoolDusk, width: 1200, height: 800, alt: site.tagline }],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#0b1f3a",
  width: "device-width",
  initialScale: 1,
};

/** RealEstateAgent structured data, shared by every page. */
const organisationLd = {
  "@context": "https://schema.org",
  "@type": "RealEstateAgent",
  name: site.name,
  description: site.description,
  slogan: site.tagline,
  email: site.email,
  telephone: `+${site.whatsappDigits}`,
  areaServed: { "@type": "City", name: "Lahore", containedIn: { "@type": "AdministrativeArea", name: "Punjab" } },
  address: {
    "@type": "PostalAddress",
    addressLocality: site.address.city,
    addressRegion: site.address.region,
    addressCountry: "PK",
  },
  contactPoint: [
    {
      "@type": "ContactPoint",
      contactType: "sales",
      email: site.email,
      telephone: `+${site.whatsappDigits}`,
      availableLanguage: ["English", "Urdu"],
    },
  ],
  knowsAbout: [
    "DHA Lahore",
    "Bahria Town Lahore",
    "Gulberg Lahore",
    "Johar Town",
    "Model Town",
    "Park View City",
    "Lake City Lahore",
  ],
};

/**
 * Motion hides content with an inline `opacity: 0` and reveals it through the
 * Web Animations timeline, which Chrome pauses entirely while a page is hidden.
 * Anything rendered without painting — an offscreen preview, a print pass, a
 * screenshot bot — would therefore show a blank page, so this flag lets
 * globals.css force content to its final state until the page is really visible.
 */
const motionProbe =
  'var d=document.documentElement,m=function(){d.dataset.motion=document.visibilityState==="visible"?"on":"off"};m();addEventListener("visibilitychange",m);';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body className="min-h-screen bg-paper text-ink antialiased">
        <script dangerouslySetInnerHTML={{ __html: motionProbe }} />
        <LocaleProvider>
          <Navbar />
          <main id="main">
            {children}
          </main>
          <Footer />
          <WhatsAppFab />
        </LocaleProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organisationLd) }}
        />
      </body>
    </html>
  );
}
