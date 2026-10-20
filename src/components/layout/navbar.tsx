"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion, useScroll } from "motion/react";
import { Menu, MessageCircle, X } from "lucide-react";
import { useEffect, useState } from "react";
import { navLabels, navLinks, site, whatsappLink } from "@/data/site";
import { useLocale } from "@/components/ui/locale-provider";
import { Logo } from "@/components/layout/logo";

/**
 * Sticky navbar. On the home page it sits transparent over the dark hero and
 * turns solid once the page scrolls; every other route opens on a light band,
 * so it starts solid there or its pale text would sit on pale paper. One
 * primary CTA (WhatsApp) stays visible throughout. The mobile panel animates
 * its height and traps nothing — it is a plain disclosure pattern, closed by
 * Escape, a link click or the close button.
 */
export function Navbar() {
  const pathname = usePathname();
  const { locale, setLocale } = useLocale();
  const labels = navLabels(locale);
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const stop = scrollY.on("change", (y) => setScrolled(y > 24));
    return stop;
  }, [scrollY]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  // Lock background scrolling while the mobile panel is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const solid = scrolled || open || pathname !== "/";

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-[background-color,box-shadow,padding] duration-300 ${
        solid
          ? "bg-paper/95 py-2 shadow-[0_1px_0_rgba(11,31,58,0.10),0_8px_24px_rgba(11,31,58,0.08)] backdrop-blur-md"
          : "bg-transparent py-4"
      }`}
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-2 focus:z-50 focus:rounded-md focus:bg-navy-900 focus:px-4 focus:py-2 focus:text-paper"
      >
        Skip to content
      </a>

      <nav aria-label="Main" className="container-page flex items-center justify-between gap-4">
        <Link
          href="/"
          className="shrink-0 rounded-md"
          aria-label={`${site.name} — home`}
          onClick={() => setOpen(false)}
        >
          <Logo onNavy={!solid} />
        </Link>

        <ul className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`cursor-pointer rounded-lg px-3 py-2 text-sm font-medium transition-colors duration-200 ${
                  solid
                    ? "text-navy-900 hover:bg-panel hover:text-gold-600"
                    : "text-paper/90 hover:bg-white/10 hover:text-paper"
                }`}
              >
                {labels[link.key]}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <LocaleToggle locale={locale} setLocale={setLocale} solid={solid} />

          <a
            href={whatsappLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-gold hidden md:inline-flex"
          >
            <MessageCircle className="h-4 w-4" aria-hidden="true" />
            {labels.whatsapp}
          </a>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            className={`flex h-11 w-11 cursor-pointer items-center justify-center rounded-lg border transition-colors duration-200 lg:hidden ${
              solid
                ? "border-line-strong/40 text-navy-900 hover:bg-panel"
                : "border-white/30 text-paper hover:bg-white/10"
            }`}
          >
            <span className="sr-only">{open ? labels.close : labels.menu}</span>
            {open ? <X className="h-6 w-6" aria-hidden="true" /> : <Menu className="h-6 w-6" aria-hidden="true" />}
          </button>
        </div>
      </nav>

      <AnimatePresence initial={false}>
        {open ? (
          <motion.div
            id="mobile-menu"
            key="mobile-menu"
            initial={reduce ? false : { height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={reduce ? { height: 0, opacity: 0 } : { height: 0, opacity: 0 }}
            transition={{ duration: reduce ? 0 : 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden lg:hidden"
          >
            <ul className="container-page flex flex-col gap-1 py-4">
              {navLinks.map((link, i) => (
                <motion.li
                  key={link.href}
                  initial={reduce ? false : { opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.25, delay: reduce ? 0 : 0.04 * i }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="flex min-h-11 items-center rounded-lg px-3 text-base font-medium text-navy-900 transition-colors hover:bg-panel hover:text-gold-600"
                  >
                    {labels[link.key]}
                  </Link>
                </motion.li>
              ))}
              <li className="pt-2">
                <a
                  href={whatsappLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setOpen(false)}
                  className="btn btn-whatsapp w-full"
                >
                  <MessageCircle className="h-4 w-4" aria-hidden="true" />
                  {labels.whatsapp}
                </a>
              </li>
            </ul>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}

function LocaleToggle({
  locale,
  setLocale,
  solid,
}: {
  locale: "en" | "ur";
  setLocale: (l: "en" | "ur") => void;
  solid: boolean;
}) {
  const tone = solid
    ? "border-line-strong/40 text-navy-900"
    : "border-white/30 text-paper";
  return (
    <div
      role="group"
      aria-label="Language"
      className={`hidden items-center rounded-lg border p-0.5 sm:flex ${tone}`}
    >
      {(["en", "ur"] as const).map((code) => (
        <button
          key={code}
          type="button"
          onClick={() => setLocale(code)}
          aria-pressed={locale === code}
          className={`min-h-10 cursor-pointer rounded-md px-2.5 text-xs font-semibold uppercase transition-colors duration-200 ${
            locale === code
              ? "bg-navy-900 text-paper"
              : "bg-transparent hover:bg-black/10"
          }`}
        >
          {code === "en" ? "EN" : "اردو"}
        </button>
      ))}
    </div>
  );
}
