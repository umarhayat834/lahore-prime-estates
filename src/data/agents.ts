import { img } from "@/lib/images";
import { site, whatsappLink } from "@/data/site";
import type { Agent } from "@/lib/types";

/**
 * AGENTS — every consultant routes to the same business inbox and WhatsApp
 * number in `site` below, so there is one place to change contact details.
 */
export const agents: Agent[] = [
  {
    id: "ahmed-raza",
    name: "Ahmed Raza",
    role: "Senior Consultant",
    speciality: "Buys and sells high-value houses and plots",
    areas: "DHA & Bahria Town",
    image: img.faceManTee,
  },
  {
    id: "sana-malik",
    name: "Sana Malik",
    role: "Residential Sales",
    speciality: "Family houses and apartments, start to handover",
    areas: "Gulberg & Johar Town",
    image: img.faceWomanRed,
  },
  {
    id: "bilal-hussain",
    name: "Bilal Hussain",
    role: "Commercial & Investment",
    speciality: "Plaza floors, rentals yield and land deals",
    areas: "Gulberg, Cantt & Faisal Town",
    image: img.faceManGrey,
  },
  {
    id: "ayesha-khan",
    name: "Ayesha Khan",
    role: "Rentals & Property Management",
    speciality: "Tenants, agreements and overseas owner reporting",
    areas: "All Lahore",
    image: img.faceWomanWhite,
  },
];

export const getAgent = (id: string) => agents.find((a) => a.id === id);

/** WhatsApp link addressed to one consultant, using the shared business number. */
export const agentWhatsApp = (agent: Agent) =>
  whatsappLink(`Hello ${agent.name.split(" ")[0]}, I am interested in a property in Lahore.`);

export const agentEmail = (agent: Agent) => ({
  to: site.email,
  subject: `Enquiry for ${agent.name} — ${agent.areas}`,
});
