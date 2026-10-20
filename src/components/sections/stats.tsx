"use client";

import { CountUp } from "@/components/ui/count-up";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/reveal";
import { useLocale } from "@/components/ui/locale-provider";
import { site, stats } from "@/data/site";

/** Section 3 — the animated proof strip that sits under the hero. */
export function Stats() {
  const { locale } = useLocale();

  return (
    <section aria-labelledby="stats-title" className="on-navy bg-navy-900 py-16 text-paper">
      <div className="container-page">
        <h2 id="stats-title" className="sr-only">
          Lahore Prime Estates in numbers
        </h2>
        <Reveal className="mb-8 max-w-xl">
          <p className="eyebrow text-gold-400">Established {site.establishedYear}</p>
          <p className="mt-3 font-display text-2xl leading-snug text-paper">
            A decade of completed transfers across Lahore&apos;s societies and cantt.
          </p>
        </Reveal>

        <Stagger className="grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4" as="ul">
          {stats.map((stat) => (
            <StaggerItem
              as="li"
              key={stat.labelEn}
              className="border-l-2 border-gold-500/50 pl-4"
            >
              <p className="font-display text-4xl font-semibold text-gold-400 sm:text-5xl">
                <CountUp value={stat.value} suffix={stat.suffix} />
              </p>
              <p className="mt-2 text-sm font-medium text-navy-100 sm:text-base">
                {locale === "ur" ? stat.labelUr : stat.labelEn}
              </p>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
