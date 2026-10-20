import type { Metadata } from "next";
import Link from "next/link";
import { Agents } from "@/components/sections/agents";
import { CtaBanner } from "@/components/sections/cta-banner";
import { Stats } from "@/components/sections/stats";
import { Testimonials } from "@/components/sections/testimonials";
import { WhyUs } from "@/components/sections/why-us";
import { PageHeader } from "@/components/layout/page-header";
import { Reveal } from "@/components/ui/reveal";
import { SmartImage } from "@/components/ui/smart-image";
import { areas } from "@/data/areas";
import { site } from "@/data/site";
import { img } from "@/lib/images";

export const metadata: Metadata = {
  title: "About — Property Consultants Since 2015",
  description:
    "Lahore Prime Estates is a Lahore property consultancy that verifies documents before advertising a listing, prices on registered transactions and handles overseas buyers end to end.",
  alternates: { canonical: `${site.siteUrl}/about` },
};

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About us"
        title={`${site.name}`}
        description={`${site.tagline}. We started in ${site.establishedYear} with one rule: nothing gets advertised until its papers are clean.`}
        breadcrumb="About"
      />

      <section aria-labelledby="story-title" className="py-section">
        <div className="container-page grid gap-12 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
          <Reveal>
            <p className="eyebrow mb-3">Our story</p>
            <h2 id="story-title" className="font-display text-[clamp(1.6rem,3.5vw,2.25rem)] font-semibold">
              Built on transferred files, not advertised prices
            </h2>
            <div className="hairline-gold mt-4" aria-hidden="true" />
            <div className="mt-6 space-y-4 text-[0.9375rem] leading-relaxed text-ink">
              <p>
                Lahore&apos;s property market rewards whoever checks the paperwork first. Most
                disputes we are asked about do not start with a bad building — they start with a
                file that was sold twice, a society transfer that never happened, or a tax that
                nobody itemised before the deal was agreed.
              </p>
              <p>
                So we work the other way round. A listing reaches this website only after its
                registry, fard and society status have been checked against the current record. The
                asking price we quote is built from registered transactions in the same lane or
                phase, not from the first number a seller mentions.
              </p>
              <p>
                From {site.establishedYear} onwards we have handled houses, apartments, plots and
                commercial floors across {areas.length} Lahore localities — including buyers in the
                UK, UAE, Canada and Australia who completed a purchase without standing on the
                plot until the keys were ready.
              </p>
              <p>
                We are a consultancy, not a portal. That means fewer listings than the aggregators,
                and a named person who answers the WhatsApp.
              </p>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/properties" className="btn btn-primary">
                See our listings
              </Link>
              <Link href="/contact" className="btn btn-ghost">
                Talk to us
              </Link>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <figure className="overflow-hidden rounded-2xl shadow-[var(--shadow-lift)]">
              <SmartImage
                src={img.loungeFireplace}
                alt="A bright living room with armchairs and a fireplace, representing a completed handover"
                width={1000}
                height={1100}
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="aspect-[4/5] w-full"
              />
              <figcaption className="glass-light mt-[-3.5rem] ml-4 mr-8 rounded-xl p-4 text-sm text-navy-900">
                Handover day is the only photo that matters — the rest is paperwork.
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </section>

      <Stats />
      <WhyUs />
      <Agents />
      <Testimonials />
      <CtaBanner />
    </>
  );
}
