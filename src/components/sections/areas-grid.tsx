import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import { Stagger, StaggerItem } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { SmartImage } from "@/components/ui/smart-image";
import type { Area } from "@/lib/types";

/**
 * Section 6 — the twelve localities. Cards point at `/properties?area=…`, so
 * the name in `src/data/areas.ts` must match `Property.area`.
 */
export function AreasGrid({
  areas,
  heading = "Explore Lahore areas",
  eyebrow = "Where we list",
  description = "Society phases, cantt corridors and town blocks — with the pricing behaviour we have measured in each.",
  idSuffix = "home",
  showAllLink = true,
}: {
  areas: Area[];
  heading?: string;
  eyebrow?: string;
  description?: string;
  idSuffix?: string;
  showAllLink?: boolean;
}) {
  const titleId = `areas-title-${idSuffix}`;

  return (
    <section aria-labelledby={titleId} className="py-section">
      <div className="container-page">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading eyebrow={eyebrow} title={heading} description={description} id={titleId} />
          {showAllLink ? (
            <Link
              href="/areas"
              className="btn btn-ghost mb-1 shrink-0"
              aria-label="See all twelve areas we list in"
            >
              All areas
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          ) : null}
        </div>

        <Stagger className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" as="ul">
          {areas.map((area) => (
            <StaggerItem as="li" key={area.id}>
              <Link
                href={`/properties?area=${encodeURIComponent(area.name)}`}
                className="group card-surface relative flex h-full flex-col overflow-hidden"
              >
                <div className="relative overflow-hidden">
                  <div className="transition-transform duration-500 ease-out group-hover:scale-[1.06] motion-reduce:transform-none">
                    <SmartImage
                      src={area.image}
                      alt={`${area.name}, Lahore`}
                      width={800}
                      height={600}
                      sizes="(min-width: 1280px) 20vw, (min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                      className="aspect-[4/3] w-full"
                    />
                  </div>
                  <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy-950/70 via-navy-950/10 to-transparent" />
                  <span className="absolute bottom-3 left-4 right-4 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-paper">
                    <MapPin className="h-4 w-4 shrink-0 text-gold-400" aria-hidden="true" />
                    {area.tagline}
                  </span>
                </div>
                <div className="flex grow flex-col p-5">
                  <h3 className="font-display text-lg font-semibold text-navy-900">{area.name}</h3>
                  <p className="mt-2 grow text-sm text-muted">{area.description}</p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-gold-600">
                    View listings
                    <ArrowRight
                      className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1 motion-reduce:transition-none motion-reduce:transform-none"
                      aria-hidden="true"
                    />
                  </span>
                </div>
              </Link>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
