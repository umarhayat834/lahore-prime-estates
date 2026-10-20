import type { Metadata } from "next";
import { Agents } from "@/components/sections/agents";
import { AreasGrid } from "@/components/sections/areas-grid";
import { CalculatorSection } from "@/components/sections/calculator";
import { ContactSection } from "@/components/sections/contact-section";
import { CtaBanner } from "@/components/sections/cta-banner";
import { Faq } from "@/components/sections/faq";
import { FeaturedProperties } from "@/components/sections/featured-properties";
import { Hero } from "@/components/sections/hero";
import { ListProperty } from "@/components/sections/list-property";
import { Services } from "@/components/sections/services";
import { Stats } from "@/components/sections/stats";
import { Testimonials } from "@/components/sections/testimonials";
import { WhyUs } from "@/components/sections/why-us";
import { areas } from "@/data/areas";
import { properties } from "@/data/properties";
import { site } from "@/data/site";

export const metadata: Metadata = {
  alternates: { canonical: site.siteUrl },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <Stats />
      <FeaturedProperties properties={properties} />
      <AreasGrid areas={areas} />
      <Services />
      <WhyUs />
      <CalculatorSection />
      <Agents />
      <Testimonials />
      <ListProperty />
      <Faq />
      <CtaBanner />
      <ContactSection />
    </>
  );
}
