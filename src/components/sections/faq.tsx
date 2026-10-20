"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ChevronDown, Plus } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { faqs } from "@/data/faqs";
import { whatsappLink } from "@/data/site";

/** Section 13 — FAQ accordion. One panel open at a time, animated height. */
export function Faq() {
  const reduce = useReducedMotion();
  const [openId, setOpenId] = useState<string | null>(faqs[0]?.id ?? null);

  return (
    <section id="faq" aria-labelledby="faq-title" className="py-section">
      <div className="container-page grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
        <div>
          <SectionHeading
            eyebrow="Questions"
            title="Frequently asked"
            description="The five things buyers and landlords ask us most, answered without the sales pitch."
            id="faq-title"
          />
          <Reveal className="mt-8" delay={0.1}>
            <a href={whatsappLink("Hello, I have a question about buying property in Lahore.")} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
              Ask something else
            </a>
          </Reveal>
        </div>

        <Reveal className="divide-y divide-line overflow-hidden rounded-2xl border border-line bg-surface">
          <ul>
            {faqs.map((faq) => {
              const open = openId === faq.id;
              return (
                <li key={faq.id}>
                  <h3>
                    <button
                      type="button"
                      id={`faq-button-${faq.id}`}
                      aria-expanded={open}
                      aria-controls={`faq-panel-${faq.id}`}
                      onClick={() => setOpenId(open ? null : faq.id)}
                      className="flex w-full cursor-pointer items-center justify-between gap-4 px-5 py-5 text-left transition-colors duration-200 hover:bg-panel sm:px-7"
                    >
                      <span className="font-display text-base font-semibold text-navy-900 sm:text-lg">
                        {faq.question}
                      </span>
                      {open ? (
                        <ChevronDown
                          className="h-5 w-5 shrink-0 rotate-180 text-gold-600 transition-transform duration-300"
                          aria-hidden="true"
                        />
                      ) : (
                        <Plus className="h-5 w-5 shrink-0 text-gold-600" aria-hidden="true" />
                      )}
                    </button>
                  </h3>

                  <AnimatePresence initial={false}>
                    {open ? (
                      <motion.div
                        key="panel"
                        id={`faq-panel-${faq.id}`}
                        role="region"
                        aria-labelledby={`faq-button-${faq.id}`}
                        initial={reduce ? false : { height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={reduce ? undefined : { height: 0, opacity: 0 }}
                        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="space-y-3 px-5 pb-6 text-[0.9375rem] leading-relaxed text-ink sm:px-7">
                          {faq.answer.map((paragraph) => (
                            <p key={paragraph.slice(0, 24)}>{paragraph}</p>
                          ))}
                        </div>
                      </motion.div>
                    ) : null}
                  </AnimatePresence>
                </li>
              );
            })}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
