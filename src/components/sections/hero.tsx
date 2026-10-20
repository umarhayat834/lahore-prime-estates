"use client";

import Link from "next/link";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { ArrowDown, MessageCircle } from "lucide-react";
import { SmartImage } from "@/components/ui/smart-image";
import { PropertySearch } from "@/components/sections/property-search";
import { useLocale } from "@/components/ui/locale-provider";
import { img } from "@/lib/images";
import { site, whatsappLink } from "@/data/site";

/**
 * Full-bleed hero. The photograph drifts up at a third of scroll speed for
 * depth; under reduced motion the image is pinned and the scroll cue is
 * static, per MASTER.md's "static hero, non-pulsing CTA" rule.
 */
export function Hero() {
  const { t } = useLocale();
  const hero = t("hero");
  const reduce = useReducedMotion();
  const shellRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: shellRef,
    offset: ["start start", "end start"],
  });
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "28%"]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, reduce ? 1 : 0.35]);

  return (
    <section
      ref={shellRef}
      aria-labelledby="hero-title"
      className="on-navy relative isolate flex min-h-[100svh] items-center overflow-hidden bg-navy-950"
    >
      <motion.div style={{ y: backgroundY }} className="absolute inset-0 -z-20">
        <SmartImage
          src={img.villaPoolDusk}
          alt="Modern villa with a lit swimming pool at dusk"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </motion.div>
      <div
        className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(7,20,38,0.82)_0%,rgba(11,31,58,0.72)_45%,rgba(7,20,38,0.9)_100%)]"
        aria-hidden="true"
      />

      <motion.div
        style={{ opacity: fade }}
        className="container-page w-full py-24 sm:py-28 lg:py-32"
      >
        <div className="max-w-3xl">
          <p className="eyebrow mb-4">{hero.eyebrow}</p>
          <h1
            id="hero-title"
            className="font-display text-[clamp(2.25rem,6vw,4rem)] font-semibold text-paper"
          >
            {hero.title}
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-navy-100 sm:text-xl">
            {hero.subtitle}
          </p>
        </div>

        <div className="mt-8 max-w-5xl">
          <PropertySearch />
        </div>

        <div className="mt-7 flex flex-wrap items-center gap-3">
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
        </div>
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
