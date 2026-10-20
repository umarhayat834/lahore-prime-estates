"use client";

import { useCallback, useEffect, useState } from "react";
import type { KeyboardEvent } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ChevronLeft, ChevronRight, Pause, Play, Quote } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { testimonials } from "@/data/testimonials";

const INTERVAL = 6500;

/**
 * Section 11 — testimonial carousel, adapted from the 21st.dev "Reviews
 * Carousel" component. Its gaps are fixed here: English labels, 44px controls,
 * auto-advance that stops on hover/focus/reduced motion, arrow keys scoped to
 * this region instead of the whole window, and a spoken slide position.
 */
export function Testimonials() {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [playing, setPlaying] = useState(true);
  const [pointerInside, setPointerInside] = useState(false);
  const [focusInside, setFocusInside] = useState(false);

  const count = testimonials.length;

  const go = useCallback(
    (target: number, dir: number) => {
      setDirection(dir);
      setIndex(((target % count) + count) % count);
    },
    [count],
  );

  const next = useCallback(() => go(index + 1, 1), [go, index]);
  const previous = useCallback(() => go(index - 1, -1), [go, index]);

  const frozen = !playing || pointerInside || focusInside || reduce;

  useEffect(() => {
    if (frozen) return;
    const timer = window.setInterval(next, INTERVAL);
    return () => window.clearInterval(timer);
  }, [frozen, next]);

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    // Scoped to the carousel region: the document keeps its own arrow scrolling.
    if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return;
    event.preventDefault();
    if (event.key === "ArrowRight") next();
    else previous();
  };

  const current = testimonials[index];

  return (
    <section id="testimonials" aria-labelledby="testimonials-title" className="bg-panel py-section">
      <div className="container-page">
        <SectionHeading
          eyebrow="Client feedback"
          title="What buyers in Lahore told us afterwards"
          description="Four clients, four different situations — a local purchase, a purchase from abroad, a rental and a plot investment."
          align="center"
          id="testimonials-title"
        />

        <Reveal className="mx-auto mt-12 max-w-3xl">
          <div
            role="group"
            aria-roledescription="carousel"
            aria-label="Client testimonials"
            onKeyDown={onKeyDown}
            onMouseEnter={() => setPointerInside(true)}
            onMouseLeave={() => setPointerInside(false)}
            onFocus={() => setFocusInside(true)}
            onBlur={() => setFocusInside(false)}
          >
            <div className="card-surface relative overflow-hidden p-6 sm:p-10">
              <Quote className="h-8 w-8 text-gold-500/70" aria-hidden="true" />

              <p aria-live="polite" className="sr-only">
                Testimonial {index + 1} of {count}: {current.author}, {current.outcome}
              </p>

              <div className="relative mt-4 min-h-[15rem] sm:min-h-[12rem]">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.blockquote
                    key={current.id}
                    initial={reduce ? false : { opacity: 0, x: direction * 48 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={reduce ? undefined : { opacity: 0, x: direction * -48 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    className="flex h-full flex-col"
                  >
                    <p className="grow font-display text-xl leading-relaxed text-navy-900 sm:text-2xl">
                      {current.body}
                    </p>
                    <footer className="mt-6 border-t border-line pt-4">
                      <p className="font-semibold text-navy-900">{current.author}</p>
                      <p className="text-sm text-muted">
                        {current.outcome} · {current.location}
                      </p>
                    </footer>
                  </motion.blockquote>
                </AnimatePresence>
              </div>

              <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
                <ul className="flex items-center gap-1" aria-label="Choose a testimonial">
                  {testimonials.map((item, i) => (
                    <li key={item.id}>
                      <button
                        type="button"
                        aria-current={i === index ? "true" : undefined}
                        aria-label={`Show testimonial ${i + 1}: ${item.author}`}
                        onClick={() => go(i, i > index ? 1 : -1)}
                        className={`flex h-11 w-11 cursor-pointer items-center justify-center rounded-full transition-colors duration-200 ${
                          i === index ? "text-navy-900" : "text-muted hover:text-navy-800"
                        }`}
                      >
                        <span
                          className={`rounded-full bg-current transition-all duration-300 ${
                            i === index ? "h-3 w-3" : "h-2.5 w-2.5 opacity-50"
                          }`}
                          aria-hidden="true"
                        />
                      </button>
                    </li>
                  ))}
                </ul>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setPlaying((p) => !p)}
                    aria-pressed={playing}
                    aria-label={playing ? "Pause automatic rotation" : "Resume automatic rotation"}
                    className="btn btn-ghost h-11 w-11 min-h-0 p-0"
                  >
                    {playing ? (
                      <Pause className="h-4 w-4" aria-hidden="true" />
                    ) : (
                      <Play className="h-4 w-4" aria-hidden="true" />
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={previous}
                    aria-label="Previous testimonial"
                    className="btn btn-ghost h-11 w-11 min-h-0 p-0"
                  >
                    <ChevronLeft className="h-5 w-5" aria-hidden="true" />
                  </button>
                  <button
                    type="button"
                    onClick={next}
                    aria-label="Next testimonial"
                    className="btn btn-ghost h-11 w-11 min-h-0 p-0"
                  >
                    <ChevronRight className="h-5 w-5" aria-hidden="true" />
                  </button>
                </div>
              </div>
            </div>

            <p className="mt-3 text-center text-xs text-muted">
              {index + 1} / {count} · left and right arrow keys change slides
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
