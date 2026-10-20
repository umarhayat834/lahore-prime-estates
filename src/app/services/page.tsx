import type { Metadata } from "next";
import Link from "next/link";
import { CtaBanner } from "@/components/sections/cta-banner";
import { Faq } from "@/components/sections/faq";
import { Services } from "@/components/sections/services";
import { WhyUs } from "@/components/sections/why-us";
import { PageHeader } from "@/components/layout/page-header";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/reveal";
import { services, site, whatsappLink } from "@/data/site";

export const metadata: Metadata = {
  title: "Property Services in Lahore",
  description:
    "Buying, selling, leasing, property management, investment consulting and documentation help in Lahore — including registry verification, fard, society transfer and tax clearance.",
  alternates: { canonical: `${site.siteUrl}/services` },
};

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Services"
        title="Everything between the viewing and the registry"
        description="Six services, one team. You always know who is holding the file and what stage it is at."
        breadcrumb="Services"
      />

      <Services />

      <section aria-labelledby="process-title" className="bg-panel py-section">
        <div className="container-page">
          <Reveal className="max-w-2xl">
            <p className="eyebrow mb-3">What each service covers</p>
            <h2 id="process-title" className="font-display text-[clamp(1.6rem,3.5vw,2.25rem)] font-semibold">
              The detail behind the six headings
            </h2>
            <div className="hairline-gold mt-4" aria-hidden="true" />
          </Reveal>

          <Stagger className="mt-10 grid gap-5 sm:grid-cols-2" as="ul">
            {services.map((service) => (
              <StaggerItem as="li" key={service.id} className="card-surface p-6">
                <h3 className="font-display text-lg font-semibold text-navy-900">{service.title}</h3>
                <p className="mt-2 text-sm text-ink">{service.detail}</p>
                <a
                  href={whatsappLink(`Hello, I have a question about "${service.title}".`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-block text-sm font-semibold text-gold-600 underline-offset-4 hover:underline"
                >
                  Ask about {service.title.toLowerCase()}
                </a>
              </StaggerItem>
            ))}
          </Stagger>

          <Reveal className="mt-10 flex flex-wrap gap-3">
            <Link href="/list-your-property" className="btn btn-primary">
              List your property
            </Link>
            <Link href="/properties" className="btn btn-ghost">
              Browse listings
            </Link>
          </Reveal>
        </div>
      </section>

      <Faq />
      <WhyUs />
      <CtaBanner />
    </>
  );
}
