import type { Metadata } from "next";
import { ContactSection } from "@/components/sections/contact-section";
import { CtaBanner } from "@/components/sections/cta-banner";
import { Faq } from "@/components/sections/faq";
import { Agents } from "@/components/sections/agents";
import { PageHeader } from "@/components/layout/page-header";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Contact Lahore Prime Estates",
  description: `Talk to ${site.name} about buying, selling or renting property in Lahore. WhatsApp ${site.whatsappDisplay}, email ${site.email}, covering DHA, Bahria Town, Gulberg, Johar Town and ${site.address.full}.`,
  alternates: { canonical: `${site.siteUrl}/contact` },
};

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Talk to a consultant, not a ticket queue"
        description={`WhatsApp is the fastest way to reach us. Send the area, size and budget and you will get verified options the same working day.`}
        breadcrumb="Contact"
      />
      <ContactSection compact />
      <Faq />
      <Agents />
      <CtaBanner />
    </>
  );
}
