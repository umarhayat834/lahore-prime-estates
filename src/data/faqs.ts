import type { Faq } from "@/lib/types";

/**
 * FAQs — the five questions we are asked on every enquiry. Tax and fee figures
 * deliberately point at the official sources instead of quoting numbers,
 * because Punjab and FBR rates are revised each budget year.
 */
export const faqs: Faq[] = [
  {
    id: "title-verification",
    question: "How do you verify a property's title before I pay?",
    answer: [
      "We check three things before a property is advertised: the registry history in the owner's name, an up-to-date fard from the land record, and — for society properties — the transfer letter or allotment with dues cleared.",
      "Where a society is involved, the transfer happens at the society office and its own NOC is part of the file. For freehold land it goes through the Sub-Registrar. We tell you which route applies before you pay a token.",
      "We also physically walk the property and match the plot corner-to-corner against the map, because encroachment and swapped corners are the most common disputes we see.",
    ],
  },
  {
    id: "taxes",
    question: "What taxes and charges apply when buying property in Lahore?",
    answer: [
      "Budget typically includes stamp duty and registration fee on the transfer, society transfer charges, agent commission, and capital gains tax on the seller's side depending on how long the property was held. Punjab and FBR rates are revised in each annual budget, so the figures change.",
      "Before you commit we prepare an itemised estimate for your specific transaction and show you where each line comes from, so nothing appears for the first time on completion day.",
      "Check the current rates against the official sources rather than any website: the Federal Board of Revenue (fbr.gov.pk) for capital gains and income tax, and the Punjab Revenue Authority for provincial transfer taxes and stamp duty.",
    ],
  },
  {
    id: "overseas",
    question: "I live abroad. How do I buy property in Lahore?",
    answer: [
      "You do not need to travel. The usual route is a specific power of attorney, attested at the Pakistani embassy or consulate in your country, naming someone here to sign and register on your behalf.",
      "We send video walkthroughs of each option, photographs of the complete document file, and a written itemisation of costs before any token money moves. Payment goes from your own bank account to the seller or society, never to us in cash.",
      "After the transfer we can hold the title documents, arrange rental management, and send you quarterly condition reports with photographs.",
    ],
  },
  {
    id: "rentals",
    question: "How do rent agreements and property management work?",
    answer: [
      "Residential and commercial tenancies get a written agreement covering term, rent, advance, maintenance responsibility and renewal notice. We prepare an inventory list with the deposit so the deduction conversation is settled on day one.",
      "For landlords we handle tenant screening, monthly collection, maintenance calls and utility payments, with a report each quarter. Overseas owners get the same reporting on WhatsApp.",
      "Rent levels are quoted from recent agreements on that street or in that block, not from the asking price you see online.",
    ],
  },
  {
    id: "contact",
    question: "How do I contact Lahore Prime Estates?",
    answer: [
      "WhatsApp is the fastest route and works from anywhere — messages go to the same number day and night. You can also email us, or send the enquiry form and we will reply with the area, size and budget you asked for.",
      "We work across DHA, Bahria Town, Gulberg, Johar Town, Model Town, Wapda Town, Valencia Town, Askari, Park View City, Lake City, Faisal Town and Cantt.",
      "Listings shown on this site are for demonstration, so ask us for the live shortlist in your range.",
    ],
  },
];
