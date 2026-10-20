import type { CopyKey, Locale } from "@/lib/i18n";
import { copy } from "@/lib/i18n";

/**
 * Single source of truth for the brand. Change the business name, contact
 * details, map position and footer note here — every component reads from this
 * file, so a rename never needs a project-wide search and replace.
 */
export const site = {
  name: "Lahore Prime Estates",
  /** Change this to your real domain — metadata, sitemap.xml and robots.txt all read it. */
  siteUrl: "https://lahoreprimeestates.example",
  tagline: "Your Trusted Property Partner in Lahore",
  description:
    "Buy, sell and rent houses, apartments, plots and commercial space across Lahore — DHA, Bahria Town, Gulberg, Johar Town and beyond.",
  email: "umerwpdeveloper@gmail.com",
  /** Shown to visitors in local format. */
  whatsappDisplay: "0310 456 1634",
  whatsappDigits: "923104561634",
  whatsappMessage: "Hello, I am interested in a property in Lahore.",
  address: {
    city: "Lahore",
    region: "Punjab",
    country: "Pakistan",
    full: "Lahore, Punjab, Pakistan",
  },
  mapCenter: { lat: 31.5204, lng: 74.3587 },
  /** Google Maps embed centred on Lahore — no API key required. */
  mapEmbedSrc:
    "https://www.google.com/maps?q=31.5204,74.3587&z=11&output=embed",
  footerNote: "Listings are for demonstration.",
  establishedYear: 2015,
  social: [
    { label: "Facebook", href: "https://www.facebook.com/" },
    { label: "Instagram", href: "https://www.instagram.com/" },
    { label: "LinkedIn", href: "https://www.linkedin.com/" },
    { label: "YouTube", href: "https://www.youtube.com/" },
  ],
} as const;

export const whatsappLink = (message: string = site.whatsappMessage) =>
  `https://wa.me/${site.whatsappDigits}?text=${encodeURIComponent(message)}`;

export const mailtoLink = (subject: string, body?: string) => {
  const params = new URLSearchParams({ subject });
  if (body) params.set("body", body);
  return `mailto:${site.email}?${params.toString()}`;
};

export const navLinks: { href: string; key: CopyKey }[] = [
  { href: "/", key: "home" },
  { href: "/#properties", key: "properties" },
  { href: "/areas", key: "areas" },
  { href: "/services", key: "services" },
  { href: "/about", key: "about" },
  { href: "/contact", key: "contact" },
];

/** Labels for the current locale — used by the navbar and mobile menu. */
export const navLabels = (locale: Locale) => copy.nav[locale];

export const stats = [
  { value: 500, suffix: "+", labelEn: "Properties Sold", labelUr: "فروخت شدہ پراپرٹی" },
  { value: 300, suffix: "+", labelEn: "Happy Clients", labelUr: "خوش گاہک" },
  { value: 10, suffix: "+", labelEn: "Years Experience", labelUr: "سال کا تجربہ" },
  { value: 25, suffix: "+", labelEn: "Lahore Locations", labelUr: "لاہور کے علاقے" },
];

export const services = [
  {
    id: "buy",
    title: "Buy a Property",
    titleUr: "Property خریدیں",
    description:
      "We shortlist verified listings in your budget and area, arrange site visits, and negotiate on your behalf until the keys are yours.",
    detail:
      "Every property we show you has been physically inspected and its ownership documents reviewed before it reaches your screen.",
  },
  {
    id: "sell",
    title: "Sell Your Property",
    titleUr: "Property بیچیں",
    description:
      "Free market valuation, professional photography, a listing priced on real recent comps, and a qualified buyer pipeline.",
    detail:
      "Typical time to an agreed offer in DHA and Gulberg is 6-10 weeks; we handle viewings, screening and price negotiation.",
  },
  {
    id: "rent",
    title: "Rent & Leasing",
    titleUr: "کرایہ پر دینا",
    description:
      "Tenants screened, rent agreed, and a written tenancy agreement drafted — for residential and commercial units alike.",
    detail:
      "We manage security deposits, monthly collection and renewal notices so landlords receive rent without chasing anyone.",
  },
  {
    id: "management",
    title: "Property Management",
    titleUr: "Property مینجمنٹ",
    description:
      "For overseas owners: rent collection, maintenance calls, utility payments and quarterly condition reports with photographs.",
    detail:
      "Your property is inspected monthly and any defect is quoted to you on WhatsApp before work is authorised.",
  },
  {
    id: "investment",
    title: "Investment Consulting",
    titleUr: "سرمایہ کاری مشورہ",
    description:
      "Yield-focused advice on plots, rentals and commercial floors, with a honest comparison of return versus holding cost.",
    detail:
      "We model gross rental yield, development cost and exit timeline before recommending any purchase.",
  },
  {
    id: "documentation",
    title: "Documentation Help",
    titleUr: "دستاویزی مدد",
    description:
      "Registry verification, fard, society transfer letters, mutation, tax clearance and complete handover paperwork.",
    detail:
      "We prepare the file list for each transaction stage and accompany you to the Sub-Registrar or society office.",
  },
];

export const benefits = [
  {
    id: "verification",
    title: "Verified Listings Only",
    body: "No property is advertised until its registry, fard and society transfer status have been checked against the current record.",
  },
  {
    id: "pricing",
    title: "Honest, Market-Based Pricing",
    body: "Every quote is built from recent registered transactions in that lane or phase — not from the seller's first asking price.",
  },
  {
    id: "overseas",
    title: "Built for Overseas Buyers",
    body: "Video walkthroughs, WhatsApp negotiation and power-of-attorney guidance for clients in the UK, UAE, Canada and Australia.",
  },
  {
    id: "paperwork",
    title: "Paperwork Without Surprises",
    body: "Taxes, transfer fees and society charges are itemised in writing before you commit, so nothing appears on completion day.",
  },
];

export const landmarks = [
  { name: "Packages Mall", category: "Shopping", distanceKm: 3.1 },
  { name: "Emporium Mall", category: "Shopping", distanceKm: 4.4 },
  { name: "Liberty Market", category: "Market", distanceKm: 2.2 },
  { name: "MM Alam Road", category: "Dining & offices", distanceKm: 1.8 },
  { name: "Gaddafi Stadium", category: "Landmark", distanceKm: 3.6 },
  { name: "Allama Iqbal International Airport", category: "Airport", distanceKm: 9.2 },
  { name: "Canal Road", category: "Arterial road", distanceKm: 2.7 },
  { name: "Ring Road", category: "Arterial road", distanceKm: 5.5 },
  { name: "Orange Line Metro", category: "Public transport", distanceKm: 3.9 },
];
