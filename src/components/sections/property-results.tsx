"use client";

import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import type { ChangeEvent } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { RotateCcw, Search } from "lucide-react";
import { PropertyCard } from "@/components/property/property-card";
import { PropertySearch } from "@/components/sections/property-search";
import { areasList, maxSalePrice, properties, propertyTypes, statuses } from "@/data/properties";
import { formatPkr } from "@/lib/format";
import type { Property } from "@/lib/types";

export interface Filters {
  area: string;
  type: string;
  status: string;
  maxPrice: string;
  minMarla: string;
}

const emptyFilters: Filters = { area: "", type: "", status: "", maxPrice: "", minMarla: "" };

const budgets = [
  { value: "", label: "Any budget" },
  { value: "10000000", label: "Up to PKR 1 Crore" },
  { value: "25000000", label: "Up to PKR 2.5 Crore" },
  { value: "50000000", label: "Up to PKR 5 Crore" },
  { value: "100000000", label: "Up to PKR 10 Crore" },
  { value: String(maxSalePrice), label: `Up to ${formatPkr(maxSalePrice)}` },
];

const sizes = [
  { value: "", label: "Any size" },
  { value: "5", label: "5 Marla or more" },
  { value: "8", label: "8 Marla or more" },
  { value: "10", label: "10 Marla or more" },
  { value: "20", label: "1 Kanal or more" },
];

const sortOptions = [
  { value: "featured", label: "Featured first" },
  { value: "price-asc", label: "Price: low to high" },
  { value: "price-desc", label: "Price: high to low" },
  { value: "size-desc", label: "Largest first" },
];

function applyFilters(filters: Filters, sort: string): Property[] {
  const maxPrice = Number(filters.maxPrice) || 0;
  const minMarla = Number(filters.minMarla) || 0;

  const list = properties.filter((property) => {
    if (filters.area && property.area !== filters.area) return false;
    if (filters.type && property.type !== filters.type) return false;
    if (filters.status && property.status !== filters.status) return false;
    if (maxPrice && property.price > maxPrice) return false;
    if (minMarla && property.marla < minMarla) return false;
    return true;
  });

  const sorted = [...list];
  if (sort === "price-asc") sorted.sort((a, b) => a.price - b.price);
  else if (sort === "price-desc") sorted.sort((a, b) => b.price - a.price);
  else if (sort === "size-desc") sorted.sort((a, b) => b.marla - a.marla);
  else sorted.sort((a, b) => Number(b.featured) - Number(a.featured));

  return sorted;
}

/**
 * The `/properties` results grid. Filters live in the URL so a search is
 * shareable and the hero search bar and this panel use the same keys.
 */
export function PropertyResults({ initial }: { initial: Filters }) {
  const router = useRouter();
  const reduce = useReducedMotion();
  const [filters, setFilters] = useState<Filters>({ ...emptyFilters, ...initial });
  const [sort, setSort] = useState("featured");
  const [unit, setUnit] = useState<"marla" | "sqft">("marla");

  const results = useMemo(() => applyFilters(filters, sort), [filters, sort]);

  const set =
    (key: keyof Filters) => (event: ChangeEvent<HTMLSelectElement>) => {
      const next = { ...filters, [key]: event.target.value };
      setFilters(next);
      syncUrl(next);
    };

  const syncUrl = (next: Filters) => {
    const params = new URLSearchParams();
    for (const [key, value] of Object.entries(next)) {
      if (value) params.set(key, value);
    }
    const query = params.toString();
    router.replace(query ? `/properties?${query}` : "/properties", { scroll: false });
  };

  const reset = () => {
    setFilters(emptyFilters);
    setSort("featured");
    router.replace("/properties", { scroll: false });
  };

  const activeCount = Object.values(filters).filter(Boolean).length;

  return (
    <div className="container-page pb-[var(--spacing-section)]">
      <div className="mt-6">
        <PropertySearch />
      </div>

      <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
        <p className="text-sm text-muted" role="status">
          <span className="font-semibold text-navy-900 tabular">{results.length}</span> of{" "}
          {properties.length} listings
          {activeCount ? ` · ${activeCount} filter${activeCount > 1 ? "s" : ""} applied` : ""}
        </p>

        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 text-sm">
            <span id="results-unit-label" className="font-semibold text-muted">
              Sizes
            </span>
            <div
              role="group"
              aria-labelledby="results-unit-label"
              className="flex rounded-lg border border-line-strong/40 p-0.5"
            >
              {(["marla", "sqft"] as const).map((value) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setUnit(value)}
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

          <div className="flex items-center gap-2 text-sm">
            <label htmlFor="results-sort" className="font-semibold text-muted">
              Sort
            </label>
            <select
              id="results-sort"
              value={sort}
              onChange={(event) => setSort(event.target.value)}
              className="field w-auto py-2 text-sm"
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {activeCount ? (
            <button type="button" onClick={reset} className="btn btn-ghost min-h-11">
              <RotateCcw className="h-4 w-4" aria-hidden="true" />
              Clear filters
            </button>
          ) : null}
        </div>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[15rem_1fr]">
        <aside aria-label="Refine listings" className="card-surface h-fit space-y-4 p-5 lg:sticky lg:top-24">
          <h2 className="flex items-center gap-2 font-display text-base font-semibold text-navy-900">
            <Search className="h-4 w-4 text-gold-600" aria-hidden="true" />
            Refine
          </h2>
          <Picker label="Area" value={filters.area} onChange={set("area")}
            options={[{ value: "", label: "All Lahore" }, ...areasList.map((a) => ({ value: a, label: a }))]}
          />
          <Picker label="Type" value={filters.type} onChange={set("type")}
            options={[{ value: "", label: "All types" }, ...propertyTypes.filter((t) => t.value !== "all").map((t) => ({ value: t.value, label: t.label }))]}
          />
          <Picker label="Buy or rent" value={filters.status} onChange={set("status")}
            options={[{ value: "", label: "Sale & rent" }, ...statuses.filter((s) => s.value !== "all").map((s) => ({ value: s.value, label: s.label }))]}
          />
          <Picker label="Budget up to" value={filters.maxPrice} onChange={set("maxPrice")} options={budgets} />
          <Picker label="Minimum size" value={filters.minMarla} onChange={set("minMarla")} options={sizes} />
        </aside>

        <div>
          <AnimatePresence mode="wait">
            <motion.div
              key={`${JSON.stringify(filters)}-${sort}`}
              initial={reduce ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? undefined : { opacity: 0 }}
              transition={{ duration: reduce ? 0 : 0.28, ease: [0.22, 1, 0.36, 1] }}
              className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3"
            >
              {results.map((property, index) => (
                <motion.div
                  key={property.id}
                  initial={reduce ? false : { opacity: 0, scale: 0.95, y: 16 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{
                    duration: reduce ? 0 : 0.38,
                    delay: reduce ? 0 : Math.min(index * 0.05, 0.3),
                    ease: [0.34, 1.56, 0.64, 1],
                  }}
                >
                  <PropertyCard property={property} unit={unit} priority={index < 3} />
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {results.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-line-strong/50 bg-panel p-10 text-center">
              <p className="font-display text-xl font-semibold text-navy-900">
                No listing matches those filters yet
              </p>
              <p className="mx-auto mt-2 max-w-md text-sm text-muted">
                Lahore&apos;s inventory changes weekly. Tell us the area, size and budget and we will
                send matching files as soon as they surface.
              </p>
              <button type="button" onClick={reset} className="btn btn-primary mt-6">
                Clear filters
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

function Picker({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
  options: { value: string; label: string }[];
}) {
  // An id may not contain whitespace, so the human label has to be slugified
  // before it can pair a <label> with its select.
  const id = `filter-${label.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;
  return (
    <div>
      <label htmlFor={id} className="label">
        {label}
      </label>
      <select
        id={id}
        value={value}
        onChange={onChange}
        className="field cursor-pointer"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
