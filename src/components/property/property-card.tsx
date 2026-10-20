"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { Bath, BedDouble, Heart, MapPin, Ruler } from "lucide-react";
import { useSyncExternalStore } from "react";
import type { ReactNode } from "react";
import { SmartImage } from "@/components/ui/smart-image";
import { areaLabel, formatPrice } from "@/lib/format";
import {
  getFavourites,
  isFavourite,
  serverValue,
  subscribeToStore,
  toggleFavourite,
} from "@/lib/browser-store";
import type { Property } from "@/lib/types";

/**
 * Property card, adapted from the 21st.dev "Property Preview Card" component
 * (shadcnspace/card-02): image on top with a status badge and favourite
 * toggle, then title, location, price pill and a divided bed / bath / size row.
 * Re-skinned to the navy + gold brand and switched to `next/image`.
 */
export function PropertyCard({
  property,
  unit,
  priority = false,
}: {
  property: Property;
  unit: "marla" | "sqft";
  priority?: boolean;
}) {
  const reduce = useReducedMotion();
  // Favourites live in this browser only; nothing is sent anywhere.
  const raw = useSyncExternalStore(subscribeToStore, getFavourites, serverValue);
  const saved = isFavourite(raw, property.id);

  const toggle = () => toggleFavourite(property.id, !saved);

  const statusLabel = property.status === "sale" ? "For Sale" : "For Rent";

  return (
    <motion.article
      whileHover={reduce ? undefined : { y: -4 }}
      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-surface shadow-[var(--shadow-soft)] transition-shadow duration-300 hover:shadow-[var(--shadow-lift)]"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <Link
          href={`/properties/${property.id}`}
          className="absolute inset-0 block"
          aria-label={`${property.title} — ${property.area}`}
        >
          <div className="absolute inset-0 transition-transform duration-500 ease-out group-hover:scale-[1.06] motion-reduce:transform-none">
            <SmartImage
              src={property.images[0]}
              alt={`${property.title} in ${property.area}, Lahore`}
              fill
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              priority={priority}
              className="object-cover"
            />
          </div>
          <span className="sr-only">View details</span>
        </Link>

        <span
          className={`absolute left-4 top-4 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wide ${
            property.status === "sale"
              ? "bg-navy-900 text-gold-400"
              : "bg-gold-500 text-navy-900"
          }`}
        >
          {statusLabel}
        </span>

        <button
          type="button"
          onClick={toggle}
          aria-pressed={saved}
          aria-label={saved ? `Remove ${property.title} from saved` : `Save ${property.title}`}
          className="absolute right-4 top-4 flex h-11 w-11 cursor-pointer items-center justify-center rounded-full bg-white/90 text-navy-900 shadow-sm backdrop-blur transition-colors duration-200 hover:bg-white"
        >
          <Heart
            className={`h-5 w-5 transition-colors duration-200 ${
              saved ? "fill-danger text-danger" : "text-navy-800"
            }`}
            aria-hidden="true"
          />
        </button>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="font-display text-lg font-semibold leading-snug">
              <Link
                href={`/properties/${property.id}`}
                className="cursor-pointer rounded transition-colors duration-200 hover:text-gold-600"
              >
                {property.title}
              </Link>
            </h3>
            <p className="mt-1 flex items-center gap-1.5 text-sm text-muted">
              <MapPin className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
              {property.area}
            </p>
          </div>
          <p className="shrink-0 rounded-full bg-gold-50 px-3 py-1.5 text-sm font-bold text-gold-700 tabular">
            {formatPrice(property.price, property.isRent)}
          </p>
        </div>

        <p className="mt-3 line-clamp-2 text-sm text-muted">{property.summary}</p>

        <dl className="mt-auto flex items-stretch gap-0 border-t border-line pt-4 text-sm">
          <Spec icon={<BedDouble className="h-4 w-4" aria-hidden="true" />}>
            {property.beds === null ? "—" : `${property.beds} beds`}
          </Spec>
          <Spec icon={<Bath className="h-4 w-4" aria-hidden="true" />}>
            {property.baths === null ? "—" : `${property.baths} baths`}
          </Spec>
          <Spec icon={<Ruler className="h-4 w-4" aria-hidden="true" />} last>
            {areaLabel(property.marla, property.sqft, unit)}
          </Spec>
        </dl>
      </div>
    </motion.article>
  );
}

function Spec({
  icon,
  children,
  last = false,
}: {
  icon: ReactNode;
  children: ReactNode;
  last?: boolean;
}) {
  return (
    <div className={`flex flex-1 flex-col items-center gap-1 text-center ${last ? "" : "border-r border-line"}`}>
      <dt className="text-gold-600">{icon}</dt>
      <dd className="font-medium text-navy-900">{children}</dd>
    </div>
  );
}
