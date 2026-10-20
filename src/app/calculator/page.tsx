import type { Metadata } from "next";
import Link from "next/link";
import { CalculatorSection } from "@/components/sections/calculator";
import { CtaBanner } from "@/components/sections/cta-banner";
import { Faq } from "@/components/sections/faq";
import { PageHeader } from "@/components/layout/page-header";
import { Reveal } from "@/components/ui/reveal";
import { site } from "@/data/site";
import { SQFT_PER_MARLA } from "@/lib/format";

export const metadata: Metadata = {
  title: "Installment & Mortgage Calculator (PKR)",
  description:
    "Work out the monthly installment for a Lahore property in PKR: enter the price, down payment, payment period and annual markup rate. Marla and Kanal sizes included.",
  alternates: { canonical: `${site.siteUrl}/calculator` },
};

const notes = [
  {
    title: "Marla and Kanal",
    body: `Lahore listings use the ${SQFT_PER_MARLA} sq ft marla: 1 Kanal = 20 Marla = ${
      20 * SQFT_PER_MARLA
    } sq ft. Some society papers quote the 272.25 sq ft "legal" marla — check which one a file uses before comparing sizes.`,
  },
  {
    title: "Crore and Lakh",
    body: "PKR 1 Crore = 10,000,000 and PKR 1 Lakh = 100,000. Prices on this site are shown the way people actually quote them in Lahore.",
  },
  {
    title: "What a plan really costs",
    body: "Society installment plans usually add transfer charges, possession charges and delayed-payment markup. Ask for those in writing before you sign — the calculator only covers the financed amount.",
  },
  {
    title: "Bank financing",
    body: "Pakistani bank housing finance is quoted as annual markup, not interest, and the tenure is typically 3 to 20 years. Use the same formula; only the rate and tenure change.",
  },
];

export default function CalculatorPage() {
  return (
    <>
      <PageHeader
        eyebrow="Calculator"
        title="Installment and mortgage calculator"
        description="Move the sliders to see the monthly figure in PKR, the total markup and what you actually pay end to end."
        breadcrumb="Calculator"
      />

      <section aria-labelledby="notes-title" className="py-section">
        <div className="container-page">
          <Reveal className="max-w-2xl">
            <p className="eyebrow mb-3">Local money, local units</p>
            <h2 id="notes-title" className="font-display text-[clamp(1.6rem,3.5vw,2.25rem)] font-semibold">
              Four things to know before you trust the number
            </h2>
            <div className="hairline-gold mt-4" aria-hidden="true" />
          </Reveal>

          <ul className="mt-10 grid gap-5 sm:grid-cols-2">
            {notes.map((note) => (
              <li key={note.title} className="card-surface p-6">
                <h3 className="font-display text-lg font-semibold text-navy-900">{note.title}</h3>
                <p className="mt-2 text-sm text-muted">{note.body}</p>
              </li>
            ))}
          </ul>

          <Reveal className="mt-10 flex flex-wrap gap-3">
            <Link href="/properties" className="btn btn-primary">
              Browse listings
            </Link>
            <Link href="/list-your-property" className="btn btn-ghost">
              List your property
            </Link>
          </Reveal>
        </div>
      </section>

      <CalculatorSection />

      <Faq />
      <CtaBanner />
    </>
  );
}
