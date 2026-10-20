import { Mail, MapPin, MessageCircle } from "lucide-react";
import { agents, agentEmail, agentWhatsApp } from "@/data/agents";
import { Stagger, StaggerItem } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { SmartImage } from "@/components/ui/smart-image";
import { mailtoLink } from "@/data/site";

/** Section 10 — the four consultants, each reachable without a signup form. */
export function Agents() {
  return (
    <section id="agents" aria-labelledby="agents-title" className="py-section">
      <div className="container-page">
        <SectionHeading
          eyebrow="Meet the agents"
          title="Four people, one phone number"
          description="You deal with a named consultant from first WhatsApp message to registry transfer — not a call centre ticket."
          id="agents-title"
        />

        <Stagger className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4" as="ul">
          {agents.map((agent) => {
            const email = agentEmail(agent);
            return (
              <StaggerItem
                as="li"
                key={agent.id}
                className="card-surface flex h-full flex-col overflow-hidden"
              >
                <div className="relative">
                  <SmartImage
                    src={agent.image}
                    alt={`${agent.name}, ${agent.role} at Lahore Prime Estates`}
                    width={700}
                    height={700}
                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                    className="aspect-square w-full"
                  />
                  <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy-950/85 to-transparent px-4 pb-3 pt-8">
                    <span className="block font-display text-lg font-semibold text-paper">
                      {agent.name}
                    </span>
                    <span className="block text-xs font-semibold uppercase tracking-wider text-gold-400">
                      {agent.role}
                    </span>
                  </span>
                </div>

                <div className="flex grow flex-col p-5">
                  <p className="text-sm text-ink">{agent.speciality}</p>
                  <p className="mt-2 flex items-center gap-1.5 text-sm text-muted">
                    <MapPin className="h-4 w-4 shrink-0 text-gold-600" aria-hidden="true" />
                    {agent.areas}
                  </p>

                  <div className="mt-5 flex flex-col gap-2 pt-1">
                    <a
                      href={agentWhatsApp(agent)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-whatsapp w-full"
                    >
                      <MessageCircle className="h-4 w-4" aria-hidden="true" />
                      WhatsApp {agent.name.split(" ")[0]}
                    </a>
                    <a
                      href={mailtoLink(email.subject, "Assalam-o-Alaikum,")}
                      className="btn btn-ghost w-full"
                    >
                      <Mail className="h-4 w-4" aria-hidden="true" />
                      Email
                    </a>
                  </div>
                </div>
              </StaggerItem>
            );
          })}
        </Stagger>
      </div>
    </section>
  );
}
