import type { Metadata } from "next";
import Link from "next/link";
import { CtaBanner } from "@/components/sections/cta-banner";
import { ListProperty } from "@/components/sections/list-property";
import { PageHeader } from "@/components/layout/page-header";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "List Your Property — Free Valuation",
  description:
    "Send us your house, apartment, plot or commercial floor and we will value it against recent registered transfers, photograph it and handle the viewings and paperwork.",
  alternates: { canonical: `${site.siteUrl}/list-your-property` },
};

export default function ListPropertyPage() {
  return (
    <>
      <PageHeader
        eyebrow="For owners"
        title="List your property with us"
        description="Free valuation, professional photography, viewings we schedule and screen, and a file we keep moving until it transfers."
        breadcrumb="List Your Property"
      />
      <ListProperty />
      <section aria-labelledby="ready-title" className="bg-panel py-section">
        <div className="container-page">
          <h2 id="ready-title" className="sr-only">
            What to have ready
          </h2>
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                title: "Copy of the registry or allotment letter",
                body: "A clear photograph is enough to start; we do not need the original.",
              },
              {
                title: "Latest tax or society bill",
                body: "Shows whether there are outstanding dues against the file.",
              },
              {
                title: "Actual size, in Marla",
                body: "Corner, park-facing and wide-road plots price differently — tell us which.",
              },
              {
                title: "Your realistic floor",
                body: "We will return a written range built from recent transfers in your lane.",
              },
            ].map((item) => (
              <li key={item.title} className="card-surface p-6">
                <h3 className="font-display text-base font-semibold text-navy-900">{item.title}</h3>
                <p className="mt-2 text-sm text-muted">{item.body}</p>
              </li>
            ))}
          </ul>
          <p className="mt-8 text-sm text-muted">
            Prefer to talk it through first?{" "}
            <Link href="/contact" className="font-semibold text-gold-600 underline underline-offset-4">
              Use the contact page
            </Link>{" "}
            or send the documents straight to {site.email}.
          </p>
        </div>
      </section>
      <CtaBanner />
    </>
  );
}
