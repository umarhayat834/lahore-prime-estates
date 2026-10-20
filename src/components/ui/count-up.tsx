"use client";

import { animate, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";

/**
 * Counts from zero to `value` when it scrolls into view, once. Reduced motion
 * renders the finished number immediately, and the value is plain text so it is
 * never dependent on the animation having run.
 */
export function CountUp({
  value,
  suffix = "",
  duration = 1.4,
  className,
}: {
  value: number;
  suffix?: string;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const reduce = useReducedMotion();
  const [display, setDisplay] = useState(reduce ? value : 0);

  useEffect(() => {
    if (reduce || !inView) return;
    const controls = animate(0, value, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (n) => setDisplay(Math.round(n)),
    });
    return () => controls.stop();
  }, [inView, reduce, value, duration]);

  return (
    <span ref={ref} className={className}>
      <span className="tabular">{display.toLocaleString("en-PK")}</span>
      {suffix}
    </span>
  );
}

/**
 * Tweens from the previous value to the new one whenever the target changes —
 * used for calculator results so a slider drag reads as a moving number rather
 * than a flicker. Reduced motion jumps straight to the answer.
 */
export function AnimatedNumber({
  value,
  format,
  className,
}: {
  value: number;
  format: (n: number) => string;
  className?: string;
}) {
  const previous = useRef(value);
  const [display, setDisplay] = useState(value);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) {
      previous.current = value;
      return;
    }
    const controls = animate(previous.current, value, {
      duration: 0.35,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (n) => setDisplay(n),
    });
    previous.current = value;
    return () => controls.stop();
  }, [value, reduce]);

  return (
    <span className={`tabular ${className ?? ""}`}>{format(reduce ? value : display)}</span>
  );
}
