import type { Metadata } from "next";
import { AreasGrid } from "@/components/sections/areas-grid";
import { CtaBanner } from "@/components/sections/cta-banner";
import { PageHeader } from "@/components/layout/page-header";
import { areas } from "@/data/areas";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Lahore Areas — DHA, Bahria Town, Gulberg",
  description:
    "Twelve Lahore localities explained: what each area costs, how its transfer process works and what to check before buying a plot or house there.",
  alternates: { canonical: `${site.siteUrl}/areas` },
};

export default function AreasPage() {
  return (
    <>
      <PageHeader
        eyebrow="Area guide"
        title="Lahore areas we list in"
        description="Society phases, cantt corridors and town blocks — with the transfer process and pricing behaviour we have measured in each one."
        breadcrumb="Areas"
      />
      <AreasGrid
        areas={areas}
        showAllLink={false}
        idSuffix="areas"
        eyebrow="Twelve localities"
        heading="Pick an area, see its listings"
      />
      <CtaBanner />
    </>
  );
}
