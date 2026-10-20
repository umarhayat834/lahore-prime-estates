import Link from "next/link";
import {
  ArrowUpRight,
  Building2,
  FileText,
  Handshake,
  KeyRound,
  Tag,
  TrendingUp,
} from "lucide-react";
import { Stagger, StaggerItem } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { services, whatsappLink } from "@/data/site";

const icons = {
  buy: Handshake,
  sell: Tag,
  rent: KeyRound,
  management: Building2,
  investment: TrendingUp,
  documentation: FileText,
} as const;

/** Section 7 — the six services from `src/data/site.ts`, each with its own entry point. */
export function Services() {
  return (
    <section id="services" aria-labelledby="services-title" className="py-section">
      <div className="container-page">
        <SectionHeading
          eyebrow="What we do"
          title="Six services, one file handler"
          description="Whether you are buying your first apartment or handing over an entire rental floor, the same team manages the paperwork end to end."
          id="services-title"
        />

        <Stagger className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3" as="ul">
          {services.map((service) => {
            const Icon = icons[service.id as keyof typeof icons];
            return (
              <StaggerItem
                as="li"
                key={service.id}
                className="card-surface flex h-full flex-col p-6"
              >
                <span className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-navy-900 text-gold-400">
                  <Icon className="h-6 w-6" aria-hidden="true" />
                </span>
                <h3 className="font-display text-xl font-semibold">{service.title}</h3>
                <p className="mt-2 grow text-[0.9375rem] text-muted">{service.description}</p>
                <div className="mt-5 flex flex-wrap items-center gap-4">
                  <Link href="/services" className="btn btn-ghost">
                    Details
                  </Link>
                  <a
                    href={whatsappLink(`Hello, I would like help with: ${service.title}.`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-sm font-semibold text-gold-600 underline-offset-4 hover:underline"
                  >
                    Ask on WhatsApp
                    <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                  </a>
                </div>
              </StaggerItem>
            );
          })}
        </Stagger>
      </div>
    </section>
  );
}
