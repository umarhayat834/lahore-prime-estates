"use client";

import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { useMemo, useState } from "react";
import { PropertyCard } from "@/components/property/property-card";
import { SectionHeading } from "@/components/ui/section-heading";
import { propertyTypes } from "@/data/properties";
import type { Property } from "@/lib/types";

type Filter = (typeof propertyTypes)[number]["value"];
type Unit = "marla" | "sqft";

/**
 * Featured listings with category tabs and a Marla / Sq Ft unit switch.
 * Switching tabs re-keys the grid so the staggered entrance replays once.
 */
export function FeaturedProperties({ properties }: { properties: Property[] }) {
  const [filter, setFilter] = useState<Filter>("all");
  const [unit, setUnit] = useState<Unit>("marla");
  const reduce = useReducedMotion();

  const visible = useMemo(
    () => (filter === "all" ? properties : properties.filter((p) => p.type === filter)),
    [filter, properties],
  );

  return (
    <section id="properties" aria-labelledby="featured-title" className="bg-paper py-[var(--spacing-section)]">
      <div className="container-page">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            id="featured-title"
            eyebrow="Hand-picked this month"
            title="Featured properties in Lahore"
            description="Nine verified listings across DHA, Bahria Town, Gulberg, Johar Town, Model Town, Park View City and Lake City."
          />

          <div className="flex flex-col items-start gap-3 sm:items-end">
            <UnitToggle unit={unit} onChange={setUnit} />
            <Link
              href="/properties"
              className="group inline-flex cursor-pointer items-center gap-1.5 rounded text-sm font-semibold text-navy-900 transition-colors hover:text-gold-600"
            >
              View all {properties.length} listings
              <ArrowRight
                className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </Link>
          </div>
        </div>

        <div
          role="group"
          aria-label="Filter properties by type"
          className="mt-8 flex flex-wrap gap-2 border-b border-line pb-4"
        >
          {propertyTypes.map((type) => {
            const active = type.value === filter;
            const count =
              type.value === "all"
                ? properties.length
                : properties.filter((p) => p.type === type.value).length;
            return (
              <button
                key={type.value}
                type="button"
                aria-pressed={active}
                onClick={() => setFilter(type.value)}
                className={`min-h-11 cursor-pointer rounded-full border px-4 py-2 text-sm font-semibold transition-colors duration-200 ${
                  active
                    ? "border-navy-900 bg-navy-900 text-paper"
                    : "border-line-strong/40 bg-surface text-navy-900 hover:border-navy-800 hover:bg-panel"
                }`}
              >
                {type.label}
                <span className={`ml-1.5 text-xs ${active ? "text-gold-400" : "text-muted"}`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={`${filter}-${unit}`}
            initial={reduce ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? undefined : { opacity: 0, y: -8 }}
            transition={{ duration: reduce ? 0 : 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {visible.map((property, index) => (
              <motion.div
                key={property.id}
                initial={reduce ? false : { opacity: 0, scale: 0.94, y: 18 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{
                  duration: reduce ? 0 : 0.4,
                  delay: reduce ? 0 : Math.min(index * 0.06, 0.36),
                  ease: [0.34, 1.56, 0.64, 1],
                }}
              >
                <PropertyCard property={property} unit={unit} priority={index < 3} />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {visible.length === 0 ? (
          <p className="mt-10 rounded-xl border border-dashed border-line-strong/50 bg-panel p-8 text-center text-muted">
            Nothing listed in this category right now — WhatsApp us and we will source it.
          </p>
        ) : null}
      </div>
    </section>
  );
}

function UnitToggle({ unit, onChange }: { unit: Unit; onChange: (u: Unit) => void }) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-xs font-semibold uppercase tracking-wider text-muted" id="unit-label">
        Sizes in
      </span>
      <div role="group" aria-labelledby="unit-label" className="flex rounded-lg border border-line-strong/40 p-0.5">
        {(["marla", "sqft"] as const).map((value) => (
          <button
            key={value}
            type="button"
            onClick={() => onChange(value)}
            aria-pressed={unit === value}
            className={`min-h-11 cursor-pointer rounded-md px-3 text-xs font-semibold uppercase transition-colors duration-200 ${
              unit === value ? "bg-navy-900 text-paper" : "text-navy-900 hover:bg-panel"
            }`}
          >
            {value === "marla" ? "Marla" : "Sq Ft"}
          </button>
        ))}
      </div>
    </div>
  );
}
