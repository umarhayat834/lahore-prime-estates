"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import type { ChangeEvent, FormEvent, ReactNode } from "react";
import { Search } from "lucide-react";
import { areasList, maxSalePrice, propertyTypes, statuses } from "@/data/properties";
import { formatPkr } from "@/lib/format";
import { useLocale } from "@/components/ui/locale-provider";

/** Budget ceilings, in rupees. Rent listings are matched against monthly rent. */
const priceOptions = [
  { value: "", label: "Any budget" },
  { value: "10000000", label: "PKR 1 Crore" },
  { value: "25000000", label: "PKR 2.5 Crore" },
  { value: "50000000", label: "PKR 5 Crore" },
  { value: "100000000", label: "PKR 10 Crore" },
  { value: String(maxSalePrice), label: `Up to ${formatPkr(maxSalePrice)}` },
];

const marlaOptions = [
  { value: "", label: "Any size" },
  { value: "5", label: "5 Marla+" },
  { value: "8", label: "8 Marla+" },
  { value: "10", label: "10 Marla+" },
  { value: "20", label: "1 Kanal+" },
];

const empty = { area: "", type: "", status: "", maxPrice: "", minMarla: "" };

/**
 * Glass search bar. It only builds a query string and hands off to
 * `/properties`, so the results page stays the single source of truth for
 * filtering and can be shared or bookmarked.
 */
export function PropertySearch() {
  const router = useRouter();
  const { t } = useLocale();
  const hero = t("hero");
  const [values, setValues] = useState(empty);

  const set = (key: keyof typeof empty) => (event: ChangeEvent<HTMLSelectElement>) =>
    setValues((prev) => ({ ...prev, [key]: event.target.value }));

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    const params = new URLSearchParams();
    for (const [key, value] of Object.entries(values)) {
      if (value) params.set(key, value);
    }
    router.push(`/properties?${params.toString()}`);
  };

  return (
    <form
      onSubmit={onSubmit}
      aria-label={hero.search}
      className="glass rounded-2xl p-3 sm:p-4"
    >
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        <Select id="search-area" label="Area" value={values.area} onChange={set("area")}>
          <option value="">All Lahore</option>
          {areasList.map((area) => (
            <option key={area} value={area}>
              {area}
            </option>
          ))}
        </Select>

        <Select id="search-type" label="Property type" value={values.type} onChange={set("type")}>
          {propertyTypes
            .filter((type) => type.value !== "all")
            .map((type) => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
        </Select>

        <Select
          id="search-status"
          label="Buy or rent"
          value={values.status}
          onChange={set("status")}
        >
          {statuses
            .filter((status) => status.value !== "all")
            .map((status) => (
              <option key={status.value} value={status.value}>
                {status.label}
              </option>
            ))}
        </Select>

        <Select
          id="search-price"
          label="Budget up to"
          value={values.maxPrice}
          onChange={set("maxPrice")}
        >
          {priceOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </Select>

        <Select
          id="search-marla"
          label="Size"
          value={values.minMarla}
          onChange={set("minMarla")}
        >
          {marlaOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </Select>
      </div>

      <button type="submit" className="btn btn-gold mt-3 w-full sm:mt-4 sm:w-auto">
        <Search className="h-4 w-4" aria-hidden="true" />
        {hero.search}
      </button>
    </form>
  );
}

function Select({
  id,
  label,
  value,
  onChange,
  children,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
  children: ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="sr-only">
        {label}
      </label>
      <select
        id={id}
        name={id}
        value={value}
        onChange={onChange}
        className="field cursor-pointer appearance-none bg-white/95 pr-9 text-navy-900"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='%230b1f3a'%3E%3Cpath fill-rule='evenodd' d='M5.23 7.21a.75.75 0 0 1 1.06.02L10 11.17l3.71-3.94a.75.75 0 1 1 1.08 1.04l-4.25 4.5a.75.75 0 0 1-1.08 0l-4.25-4.5a.75.75 0 0 1 .02-1.06Z' clip-rule='evenodd'/%3E%3C/svg%3E\")",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "right 0.6rem center",
          backgroundSize: "1.1rem",
        }}
      >
        {children}
      </select>
    </div>
  );
}
