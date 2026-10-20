import { img } from "@/lib/images";
import type { Area } from "@/lib/types";

/**
 * AREAS — the twelve localities we list in. Each card links to the properties
 * filtered by that `name`, so keep `name` matching the `area` value used in
 * `src/data/properties.ts`.
 */
export const areas: Area[] = [
  {
    id: "dha-lahore",
    name: "DHA Lahore",
    tagline: "Phases 5 to 9 and Defence Road",
    description:
      "Lahore's most searched address: wide grid roads, society-run utilities and the deepest resale market in the city.",
    image: img.houseDarkDusk,
    highlights: [
      "Phases 5-9 each have their own commercial centres",
      "Defence Road corridor for offices and retail",
      "Registry plus DHA transfer on every file",
    ],
  },
  {
    id: "bahria-town-lahore",
    name: "Bahria Town Lahore",
    tagline: "Society-managed living on Canal Road",
    description:
      "Gated sectors with society transfer letters, parks and mosques inside walking distance, and possession-ready plots.",
    image: img.houseTimber,
    highlights: [
      "Transfer through the society office, not the Sub-Registrar",
      "Sector C and D have the most completed houses",
      "Installment clearance checked before we list",
    ],
  },
  {
    id: "gulberg",
    name: "Gulberg",
    tagline: "Blocks II, III and V",
    description:
      "The city's commercial heart, where apartments, plazas and head offices sit above the same metro line.",
    image: img.towersFromBelow,
    highlights: [
      "Main Boulevard retail and office demand",
      "MM Alam Road dining within a few minutes",
      "Strong rental yields for furnished apartments",
    ],
  },
  {
    id: "johar-town",
    name: "Johar Town",
    tagline: "Block roads and established families",
    description:
      "A planned town block by block, favoured by families for its wide internal roads, parks and schools.",
    image: img.houseBrick,
    highlights: [
      "Blocks B to T for 5 and 10 marla houses",
      "Canal Road access at the eastern edge",
      "Most files are freehold with complete mutation",
    ],
  },
  {
    id: "model-town",
    name: "Model Town",
    tagline: "Old-Lahore plots with mature trees",
    description:
      "Larger plots and long-established neighbourhoods, where land value often outweighs the building on it.",
    image: img.houseCraftsman,
    highlights: [
      "Two-kanal plots suited to redevelopment",
      "Blocks A to F around the main circular road",
      "Society NOC needed before demolition",
    ],
  },
  {
    id: "wapda-town",
    name: "Wapda Town",
    tagline: "Canal-side society plots",
    description:
      "A WAPDA-sponsored society on the canal bank, with a mix of possession-ready plots and houses under construction.",
    image: img.openField,
    highlights: [
      "Park View and Lake City sit along the same corridor",
      "Installment schemes still running in some blocks",
      "Transfer letter issued by the society",
    ],
  },
  {
    id: "valencia-town",
    name: "Valencia Town",
    tagline: "Newer society off the outer ring",
    description:
      "Lower entry prices on a planned layout, drawing first-time builders and long-horizon plot investors.",
    image: img.siteWorkers,
    highlights: [
      "Smaller plot sizes than the older societies",
      "Development still progressing block by block",
      "Check the possession status before committing",
    ],
  },
  {
    id: "askari",
    name: "Askari 10 & 11",
    tagline: "Gated community near the airport road",
    description:
      "A security-managed housing community with its own gates, parks and a strict rules framework for owners.",
    image: img.houseBlueGarage,
    highlights: [
      "Controlled entry and community policing",
      "Houses are mostly single-family occupied",
      "Askari transfer and NOC form part of the file",
    ],
  },
  {
    id: "park-view-city",
    name: "Park View City",
    tagline: "Block B onwards along Canal Road",
    description:
      "One of Lahore's largest private societies, with a wide spread of plot sizes and a growing resident population.",
    image: img.houseBungalow,
    highlights: [
      "Commercial centre and society parks in Block B",
      "Possession issued across several blocks",
      "Installment plans still available directly",
    ],
  },
  {
    id: "lake-city",
    name: "Lake City",
    tagline: "Sector M and the lake-facing blocks",
    description:
      "A lake-centred society of wide avenues and large plots, popular for architect-built family houses.",
    image: img.villaPoolGarden,
    highlights: [
      "Sectors M-2 to M-7 hold the completed houses",
      "Central lake and promenade inside the society",
      "Allotment letters transfer through Lake City",
    ],
  },
  {
    id: "faisal-town",
    name: "Faisal Town",
    tagline: "Circular road and the university belt",
    description:
      "A central, leafy town next to the university, where houses and rented apartments mix on quiet block roads.",
    image: img.loungeStaircase,
    highlights: [
      "Close to GC University and the circular road",
      "Demand from students, faculty and families",
      "Freehold files with completed mutation",
    ],
  },
  {
    id: "cantt",
    name: "Cantt / Sarfraz Rafiqui Road",
    tagline: "Central Lahore's office and belt-line strip",
    description:
      "Lahore's cantonment corridor, running from the station past the belt-line shops into the old city beyond.",
    image: img.cityStreet,
    highlights: [
      "Sarfraz Rafiqui Road for retail and offices",
      "Garrison-board NOC applies to cantt properties",
      "Metro and rail both within walking distance",
    ],
  },
];

export const getArea = (id: string) => areas.find((a) => a.id === id);
