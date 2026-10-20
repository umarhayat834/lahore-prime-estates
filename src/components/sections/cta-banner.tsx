"use client";

import { Mail, MessageCircle } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { useLocale } from "@/components/ui/locale-provider";
import { SmartImage } from "@/components/ui/smart-image";
import { mailtoLink, whatsappLink } from "@/data/site";
import { img } from "@/lib/images";

/** Section 14a — the closing call to action, one ask only. */
export function CtaBanner() {
  const { t } = useLocale();
  const cta = t("cta");
  const reduce = useReducedMotion();

  return (
    <section
      aria-labelledby="cta-title"
      className="on-navy relative isolate overflow-hidden bg-navy-950 py-section"
    >
      <div className="absolute inset-0 -z-20 opacity-45">
        <SmartImage
          src={img.skylineFlyovers}
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
        />
      </div>
      <div
        className="absolute inset-0 -z-10 bg-[linear-gradient(120deg,rgba(7,20,38,0.94)_0%,rgba(11,31,58,0.8)_55%,rgba(7,20,38,0.9)_100%)]"
        aria-hidden="true"
      />

      <motion.div
        initial={reduce ? false : { opacity: 0, y: 24 }}
        whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className="container-page relative max-w-3xl text-center"
      >
        <h2 id="cta-title" className="font-display text-[clamp(1.75rem,4.5vw,2.75rem)] text-paper">
          {cta.title}
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-navy-100">{cta.body}</p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp">
            <MessageCircle className="h-4 w-4" aria-hidden="true" />
            {cta.primary}
          </a>
          <a href={mailtoLink(cta.title)} className="btn btn-gold">
            <Mail className="h-4 w-4" aria-hidden="true" />
            {cta.secondary}
          </a>
        </div>
      </motion.div>
    </section>
  );
}
