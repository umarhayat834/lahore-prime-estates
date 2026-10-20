"use client";

import Link from "next/link";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import type { Variants } from "motion/react";
import { useRef } from "react";
import { ArrowDown, MessageCircle } from "lucide-react";
import { SmartImage } from "@/components/ui/smart-image";
import { PropertySearch } from "@/components/sections/property-search";
import { useLocale } from "@/components/ui/locale-provider";
import { img } from "@/lib/images";
import { site, whatsappLink } from "@/data/site";

/** MASTER.md "Stagger List (Standard)" — load trigger, ~450ms, back.out overshoot. */
const entrance: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.15 } },
};

const rise: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.34, 1.56, 0.64, 1] } },
};

/**
 * Full-bleed hero. The photograph settles from a slight overshoot on load, the
 * copy rises in on a stagger, then the photograph drifts up at a third of scroll
 * speed for depth. Under reduced motion every one of those is skipped and the
 * hero renders in its final state, per MASTER.md's "static hero, non-pulsing
 * CTA" rule — which is conditioned on reduced motion, not the default.
 */
export function Hero() {
  const { t } = useLocale();
  const hero = t("hero");
  const reduce = useReducedMotion();
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "28%"]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, reduce ? 1 : 0.35]);

  return (
    <section
      ref={heroRef}
      aria-labelledby="hero-title"
      className="on-navy relative isolate flex min-h-[100svh] items-center overflow-hidden bg-navy-950"
    >
      <motion.div style={{ y: backgroundY }} className="absolute inset-0 -z-20">
        <motion.div
          className="absolute inset-0"
          initial={reduce ? false : { scale: 1.08 }}
          animate={reduce ? undefined : { scale: 1 }}
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
        >
          <SmartImage
            src={img.villaPoolDusk}
            alt="Modern villa with a lit swimming pool at dusk"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </motion.div>
      </motion.div>
      <div
        className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(7,20,38,0.82)_0%,rgba(11,31,58,0.72)_45%,rgba(7,20,38,0.9)_100%)]"
        aria-hidden="true"
      />

      <motion.div
        style={{ opacity: fade }}
        className="container-page w-full py-24 sm:py-28 lg:py-32"
        variants={entrance}
        initial={reduce ? false : "hidden"}
        animate={reduce ? undefined : "show"}
      >
        <div className="max-w-3xl">
          <motion.p variants={rise} className="eyebrow mb-4">
            {hero.eyebrow}
          </motion.p>
          <motion.h1
            variants={rise}
            id="hero-title"
            className="font-display text-[clamp(2.25rem,6vw,4rem)] font-semibold text-paper"
          >
            {hero.title}
          </motion.h1>
          <motion.p variants={rise} className="mt-5 max-w-2xl text-lg leading-relaxed text-navy-100 sm:text-xl">
            {hero.subtitle}
          </motion.p>
        </div>

        <motion.div variants={rise} className="mt-8 max-w-5xl">
          <PropertySearch />
        </motion.div>

        <motion.div variants={rise} className="mt-7 flex flex-wrap items-center gap-3">
          <a
            href={whatsappLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-whatsapp"
          >
            <MessageCircle className="h-4 w-4" aria-hidden="true" />
            {hero.cta}
          </a>
          <Link href="/properties" className="btn btn-ghost">
            Browse all listings
          </Link>
          <span className="text-sm text-navy-100/80">{site.tagline}</span>
        </motion.div>
      </motion.div>

      <a
        href="#properties"
        aria-label="Scroll to featured properties"
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 rounded-full p-3 text-paper/80 transition-colors hover:text-paper md:block"
      >
        <motion.span
          aria-hidden="true"
          animate={reduce ? undefined : { y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="block"
        >
          <ArrowDown className="h-6 w-6" />
        </motion.span>
      </a>
    </section>
  );
}
