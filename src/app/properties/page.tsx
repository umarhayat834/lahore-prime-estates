import type { Metadata } from "next";
import Link from "next/link";
import { PropertyResults } from "@/components/sections/property-results";
import type { Filters } from "@/components/sections/property-results";
import { Reveal } from "@/components/ui/reveal";
import { areasList, propertyTypes, statuses } from "@/data/properties";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Property in Lahore — Houses & Plots",
  description:
    "Browse verified houses, apartments, plots and commercial floors for sale and rent across DHA, Bahria Town, Gulberg, Johar Town and the rest of Lahore. Prices in PKR, sizes in Marla or Kanal.",
  alternates: { canonical: `${site.siteUrl}/properties` },
  keywords: [
    "houses for sale in Lahore",
    "DHA Lahore plots",
    "Bahria Town Lahore houses",
    "Gulberg apartments",
    "property rent Lahore",
  ],
};

const allowed = <T extends string>(value: string | undefined, options: readonly T[]) =>
  value && (options as readonly string[]).includes(value) ? value : "";

export default async function PropertiesPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const read = (key: string) => {
    const raw = params[key];
    return typeof raw === "string" ? raw.trim() : "";
  };

  const initial: Filters = {
    area: allowed(read("area"), areasList),
    type: allowed(read("type"), propertyTypes.map((t) => t.value)),
    status: allowed(read("status"), statuses.map((s) => s.value)),
    maxPrice: /^\d+$/.test(read("maxPrice")) ? read("maxPrice") : "",
    minMarla: /^\d+(\.\d+)?$/.test(read("minMarla")) ? read("minMarla") : "",
  };

  return (
    <div className="bg-paper pt-28">
      <div className="container-page pt-10">
        <Reveal>
          <nav aria-label="Breadcrumb" className="mb-4 text-sm text-muted">
            <ol className="flex flex-wrap gap-2">
              <li>
                <Link href="/" className="cursor-pointer underline-offset-4 hover:underline">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="font-semibold text-navy-900">
                Properties
              </li>
            </ol>
          </nav>
          <h1 className="font-display text-[clamp(1.9rem,4.5vw,2.75rem)] font-semibold text-navy-900">
            Property for sale and rent in Lahore
          </h1>
          <p className="mt-3 max-w-2xl text-lg text-muted">
            Every listing here has been physically inspected and had its ownership documents
            checked. Filter by area, type, budget and size — the address bar keeps your search so
            you can come back to it.
          </p>
        </Reveal>
      </div>

      <PropertyResults initial={initial} />
    </div>
  );
}
