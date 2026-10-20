import { BadgeDollarSign, ClipboardCheck, Globe2, ShieldCheck } from "lucide-react";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { SmartImage } from "@/components/ui/smart-image";
import { benefits } from "@/data/site";
import { img } from "@/lib/images";

const icons = {
  verification: ShieldCheck,
  pricing: BadgeDollarSign,
  overseas: Globe2,
  paperwork: ClipboardCheck,
} as const;

/** Section 8 — why choose us: four benefit blocks beside a verified photo. */
export function WhyUs() {
  return (
    <section id="why-us" aria-labelledby="why-us-title" className="bg-panel py-section">
      <div className="container-page grid items-center gap-12 lg:grid-cols-2">
        <div>
          <SectionHeading
            eyebrow="Why choose us"
            title="Four habits that keep transfers clean"
            description="Nothing here is a slogan. Each one is a step we take before you are asked to sign anything."
            id="why-us-title"
          />

          <Stagger className="mt-10 grid gap-6 sm:grid-cols-2" as="ul" stagger={0.08}>
            {benefits.map((benefit) => {
              const Icon = icons[benefit.id as keyof typeof icons];
              return (
                <StaggerItem as="li" key={benefit.id}>
                  <div className="flex h-full flex-col rounded-xl border border-line bg-surface p-5">
                    <span className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-gold-50 text-gold-700">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <h3 className="font-display text-lg font-semibold">{benefit.title}</h3>
                    <p className="mt-2 text-sm text-muted">{benefit.body}</p>
                  </div>
                </StaggerItem>
              );
            })}
          </Stagger>
        </div>

        <Reveal delay={0.1} y={32}>
          <div className="relative">
            <div className="overflow-hidden rounded-2xl shadow-lift">
              <SmartImage
                src={img.modelHouseKeys}
                alt="A model house beside a set of keys, representing a completed handover"
                width={1000}
                height={1150}
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="aspect-[4/5] w-full"
              />
            </div>
            <div className="glass-light absolute -bottom-6 left-6 max-w-[17rem] rounded-xl p-4 sm:left-8">
              <p className="font-display text-lg font-semibold text-navy-900">
                Documents before decimals
              </p>
              <p className="mt-1 text-sm text-muted">
                We confirm the registry status first, then talk about price.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
