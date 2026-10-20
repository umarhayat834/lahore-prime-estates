import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Bath, BedDouble, Check, MapPin, MessageCircle, Ruler } from "lucide-react";
import { Gallery } from "@/components/property/gallery";
import { InquiryForm } from "@/components/property/inquiry-form";
import { PropertyCard } from "@/components/property/property-card";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { getProperty, properties } from "@/data/properties";
import { landmarks as allLandmarks, site, whatsappLink } from "@/data/site";
import { areaLabel, formatPrice } from "@/lib/format";

export function generateStaticParams() {
  return properties.map((property) => ({ id: property.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const property = getProperty(id);
  if (!property) return { title: "Listing not found", robots: { index: false, follow: false } };

  const title = `${property.title} — ${property.area}`;
  return {
    title,
    description: `${property.summary} ${formatPrice(property.price, property.isRent)}, ${areaLabel(
      property.marla,
      property.sqft,
      "marla",
    )}.`,
    alternates: { canonical: `${site.siteUrl}/properties/${property.id}` },
    openGraph: {
      title,
      description: property.summary,
      url: `${site.siteUrl}/properties/${property.id}`,
      images: [{ url: property.images[0], width: 1200, height: 800, alt: title }],
    },
  };
}

export default async function PropertyPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const property = getProperty(id);
  if (!property) notFound();

  const related = properties
    .filter((item) => item.id !== property.id && item.area === property.area)
    .slice(0, 3);

  const nearby = property.landmarks.map((name) => {
    const match = allLandmarks.find((landmark) => landmark.name === name);
    return { name, category: match?.category, distanceKm: match?.distanceKm };
  });

  const specs = [
    { label: "Status", value: property.status === "sale" ? "For Sale" : "For Rent" },
    { label: "Type", value: property.type.charAt(0).toUpperCase() + property.type.slice(1) },
    { label: "Size", value: areaLabel(property.marla, property.sqft, "marla") },
    { label: "Bedrooms", value: property.beds === null ? "Not applicable" : String(property.beds) },
    { label: "Bathrooms", value: property.baths === null ? "Not applicable" : String(property.baths) },
    { label: "Location", value: property.addressLine },
  ];

  const listingLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: property.title,
    description: property.summary,
    image: property.images,
    brand: { "@type": "Brand", name: site.name },
    offers: {
      "@type": "Offer",
      price: property.price,
      priceCurrency: "PKR",
      availability: "https://schema.org/InStock",
      url: `${site.siteUrl}/properties/${property.id}`,
      seller: { "@type": "RealEstateAgent", name: site.name },
    },
  };

  return (
    <div className="bg-paper pt-28">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(listingLd) }}
      />

      <div className="container-page pt-8">
        <nav aria-label="Breadcrumb" className="mb-5 text-sm text-muted">
          <ol className="flex flex-wrap gap-2">
            <li>
              <Link href="/" className="cursor-pointer underline-offset-4 hover:underline">
                Home
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link
                href="/properties"
                className="cursor-pointer underline-offset-4 hover:underline"
              >
                Properties
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="truncate font-semibold text-navy-900">
              {property.title}
            </li>
          </ol>
        </nav>

        <Reveal>
          <div className="flex flex-wrap items-start justify-between gap-5">
            <div className="max-w-3xl">
              <p className="eyebrow mb-2 flex flex-wrap items-center gap-2">
                <span
                  className={`rounded-full px-2.5 py-0.5 ${
                    property.status === "sale"
                      ? "bg-navy-900 text-gold-400"
                      : "bg-gold-500 text-navy-900"
                  }`}
                >
                  {property.status === "sale" ? "For Sale" : "For Rent"}
                </span>
                {property.area}
              </p>
              <h1 className="font-display text-[clamp(1.8rem,4.5vw,2.6rem)] font-semibold text-navy-900">
                {property.title}
              </h1>
              <p className="mt-2 flex items-center gap-1.5 text-muted">
                <MapPin className="h-4 w-4 shrink-0" aria-hidden="true" />
                {property.addressLine}
              </p>
            </div>

            <div className="text-right">
              <p className="font-display text-3xl font-semibold text-navy-900 tabular">
                {formatPrice(property.price, property.isRent)}
              </p>
              <p className="text-sm text-muted">{areaLabel(property.marla, property.sqft, "marla")}</p>
            </div>
          </div>
        </Reveal>

        <div className="mt-8 grid gap-8 lg:grid-cols-[1.55fr_1fr] xl:gap-12">
          <div className="space-y-10">
            <Gallery images={property.images} title={property.title} />

            <ul className="grid grid-cols-3 gap-3">
              {[
                { icon: BedDouble, label: "Bedrooms", value: property.beds ?? "—" },
                { icon: Bath, label: "Bathrooms", value: property.baths ?? "—" },
                {
                  icon: Ruler,
                  label: "Plot",
                  value: `${property.marla} Marla`,
                },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <li key={item.label} className="card-surface flex flex-col items-center gap-1 p-4 text-center">
                    <Icon className="h-5 w-5 text-gold-600" aria-hidden="true" />
                    <span className="font-display text-lg font-semibold text-navy-900">
                      {item.value}
                    </span>
                    <span className="text-xs uppercase tracking-wider text-muted">{item.label}</span>
                  </li>
                );
              })}
            </ul>

            <section aria-labelledby="about-title">
              <h2 id="about-title" className="font-display text-2xl font-semibold text-navy-900">
                About this listing
              </h2>
              <div className="hairline-gold mt-3" aria-hidden="true" />
              <div className="mt-5 space-y-4 text-[0.9375rem] leading-relaxed text-ink">
                {property.description.map((paragraph) => (
                  <p key={paragraph.slice(0, 28)}>{paragraph}</p>
                ))}
              </div>
            </section>

            <section aria-labelledby="features-title">
              <h2 id="features-title" className="font-display text-2xl font-semibold text-navy-900">
                Features
              </h2>
              <div className="hairline-gold mt-3" aria-hidden="true" />
              <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                {property.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2.5 text-[0.9375rem] text-ink">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gold-50">
                      <Check className="h-3.5 w-3.5 text-gold-700" aria-hidden="true" />
                    </span>
                    {feature}
                  </li>
                ))}
              </ul>
            </section>

            <section aria-labelledby="landmarks-title">
              <h2 id="landmarks-title" className="font-display text-2xl font-semibold text-navy-900">
                Nearby landmarks
              </h2>
              <div className="hairline-gold mt-3" aria-hidden="true" />
              <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                {nearby.map((landmark) => (
                  <li
                    key={landmark.name}
                    className="flex items-center justify-between gap-4 rounded-xl border border-line bg-surface px-4 py-3"
                  >
                    <span className="min-w-0">
                      <span className="block truncate font-medium text-navy-900">{landmark.name}</span>
                      {landmark.category ? (
                        <span className="block text-xs uppercase tracking-wider text-muted">
                          {landmark.category}
                        </span>
                      ) : null}
                    </span>
                    {landmark.distanceKm ? (
                      <span className="tabular shrink-0 text-sm font-semibold text-gold-700">
                        {landmark.distanceKm} km
                      </span>
                    ) : null}
                  </li>
                ))}
              </ul>
              <p className="mt-3 text-xs text-muted">
                Distances are approximate driving distances from the city centre, shown for
                orientation rather than survey accuracy.
              </p>
            </section>
          </div>

          <aside className="space-y-6 lg:sticky lg:top-24 lg:h-fit">
            <div className="card-surface p-6">
              <p className="text-sm text-muted">Total price</p>
              <p className="font-display text-3xl font-semibold text-navy-900 tabular">
                {formatPrice(property.price, property.isRent)}
              </p>
              <div className="mt-4 space-y-1.5 border-t border-line pt-4 text-sm">
                {specs.map((spec) => (
                  <p key={spec.label} className="flex justify-between gap-4">
                    <span className="text-muted">{spec.label}</span>
                    <span className="text-right font-medium text-navy-900">{spec.value}</span>
                  </p>
                ))}
              </div>
              <a
                href={whatsappLink(
                  `Hello, I am interested in "${property.title}" in ${property.area}, listed at ${formatPrice(
                    property.price,
                    property.isRent,
                  )}.`,
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-whatsapp mt-5 w-full"
              >
                <MessageCircle className="h-4 w-4" aria-hidden="true" />
                WhatsApp about this
              </a>
            </div>

            <InquiryForm property={property} />
          </aside>
        </div>

        {related.length > 0 ? (
          <section className="mt-16" aria-labelledby="related-title">
            <SectionHeading
              eyebrow="Same area"
              title={`More listings in ${property.area}`}
              id="related-title"
            />
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((item) => (
                <PropertyCard key={item.id} property={item} unit="marla" />
              ))}
            </div>
          </section>
        ) : null}

        <div className="py-16 text-center">
          <Link href="/properties" className="btn btn-ghost">
            Back to all listings
          </Link>
        </div>
      </div>
    </div>
  );
}
