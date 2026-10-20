"use client";

import { motion, useReducedMotion } from "motion/react";
import { MessageCircle } from "lucide-react";
import { site, whatsappLink } from "@/data/site";

/**
 * Floating WhatsApp button on every page. The ring pulse is a gentle attention
 * cue, not a flashing one, and it is removed entirely under reduced motion.
 *
 * The `aside` is a landmark: a bare fixed-position control sits outside every
 * region of the page, which axe reports as uncontained content. Its only child
 * is taken out of flow, so the wrapper itself occupies no space.
 */
export function WhatsAppFab() {
  const reduce = useReducedMotion();

  return (
    <aside aria-label="Quick contact">
      <motion.a
        href={whatsappLink()}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`WhatsApp us on ${site.whatsappDisplay}`}
        initial={reduce ? false : { opacity: 0, scale: 0.8, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.35, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
        whileHover={reduce ? undefined : { scale: 1.06 }}
        whileTap={reduce ? undefined : { scale: 0.94 }}
        className={`fixed bottom-5 right-5 z-50 flex h-14 w-14 cursor-pointer items-center justify-center rounded-full bg-whatsapp text-white shadow-lg ring-1 ring-black/5 transition-shadow hover:bg-[#0f7a3c] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-navy-900 md:bottom-7 md:right-7 ${
          reduce ? "" : "animate-pulse-ring"
        }`}
      >
        <MessageCircle className="h-7 w-7" aria-hidden="true" strokeWidth={2} />
      </motion.a>
    </aside>
  );
}
