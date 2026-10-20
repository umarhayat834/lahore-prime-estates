"use client";

import { useMemo, useState } from "react";
import type { CSSProperties } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Calculator as CalculatorIcon } from "lucide-react";
import { AnimatedNumber } from "@/components/ui/count-up";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { mailtoLink, whatsappLink } from "@/data/site";
import { formatFullPkr, monthlyInstallment } from "@/lib/format";

const MIN_PRICE = 3_000_000;
const MAX_PRICE = 500_000_000;

function Slider({
  name,
  label,
  value,
  min,
  max,
  step,
  suffix,
  onChange,
  formatValue,
}: {
  name: string;
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  suffix: string;
  onChange: (next: number) => void;
  formatValue: (n: number) => string;
}) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div>
      <div className="mb-2 flex items-baseline justify-between gap-3">
        <label className="label mb-0" htmlFor={`field-${name}`}>
          {label}
        </label>
        <span className="tabular text-sm font-bold text-navy-900">
          {formatValue(value)}
          <span className="ml-1 font-medium text-muted">{suffix}</span>
        </span>
      </div>
      <input
        id={`field-${name}`}
        name={name}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        aria-valuetext={`${formatValue(value)} ${suffix}`}
        className="lpe-range"
        style={{ "--range-pct": `${pct}%` } as CSSProperties}
      />
    </div>
  );
}

/** Section 9 — installment / mortgage calculator, answers in PKR. */
export function CalculatorSection() {
  const reduce = useReducedMotion();
  const [price, setPrice] = useState(45_000_000);
  const [downPercent, setDownPercent] = useState(30);
  const [years, setYears] = useState(5);
  const [rate, setRate] = useState(18);

  const result = useMemo(() => {
    const down = Math.round((price * downPercent) / 100);
    const financed = Math.max(price - down, 0);
    const months = Math.max(Math.round(years * 12), 1);
    const monthly = monthlyInstallment(financed, rate, years);
    return { down, financed, monthly, months, total: monthly * months, markup: monthly * months - financed };
  }, [price, downPercent, years, rate]);

  const summary = `${formatFullPkr(result.monthly)} per month for ${result.months} months at ${rate}% on ${formatFullPkr(result.financed)}`;

  return (
    <section id="calculator" aria-labelledby="calculator-title" className="bg-panel py-section">
      <div className="container-page grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-14">
        <div>
          <SectionHeading
            eyebrow="Plan the numbers"
            title="Installment & mortgage calculator"
            description="Move the sliders to see what a Lahore property actually costs per month. Society installment plans and bank financing both work off this reducing-balance formula."
            id="calculator-title"
          />

          <Reveal className="mt-8 space-y-7 rounded-2xl border border-line bg-surface p-6 shadow-[var(--shadow-soft)] sm:p-8">
            <Slider
              name="price"
              label="Property price"
              value={price}
              min={MIN_PRICE}
              max={MAX_PRICE}
              step={500_000}
              suffix="PKR"
              onChange={setPrice}
              formatValue={(n) => n.toLocaleString("en-PK")}
            />
            <Slider
              name="down"
              label="Down payment"
              value={downPercent}
              min={10}
              max={90}
              step={5}
              suffix="% of price"
              onChange={setDownPercent}
              formatValue={(n) => `${n}%`}
            />
            <Slider
              name="years"
              label="Payment period"
              value={years}
              min={1}
              max={20}
              step={1}
              suffix="years"
              onChange={setYears}
              formatValue={(n) => String(n)}
            />
            <Slider
              name="rate"
              label="Annual markup / interest rate"
              value={rate}
              min={0}
              max={30}
              step={0.5}
              suffix="per year"
              onChange={setRate}
              formatValue={(n) => `${n}%`}
            />
          </Reveal>
        </div>

        <motion.div
          initial={reduce ? undefined : { opacity: 0, y: 24 }}
          whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="on-navy h-fit rounded-2xl bg-navy-900 p-6 text-paper shadow-[var(--shadow-lift)] sm:p-8 lg:sticky lg:top-24"
        >
          <p className="eyebrow flex items-center gap-2 text-gold-400">
            <CalculatorIcon className="h-4 w-4" aria-hidden="true" />
            Monthly installment
          </p>

          <p className="mt-4 font-display text-4xl font-semibold text-gold-400 sm:text-5xl">
            <AnimatedNumber value={result.monthly} format={formatFullPkr} />
          </p>
          <p className="mt-1 text-sm text-navy-100">for {result.months} months</p>

          <dl className="mt-7 space-y-3 border-t border-navy-700 pt-5 text-sm">
            <Row label="Property price" value={formatFullPkr(price)} />
            <Row label={`Down payment (${downPercent}%)`} value={formatFullPkr(result.down)} />
            <Row label="Amount financed" value={formatFullPkr(result.financed)} />
            <Row label="Total markup paid" value={formatFullPkr(result.markup)} />
            <Row label="Total payable" value={formatFullPkr(result.total + result.down)} strong />
          </dl>

          <p className="mt-6 rounded-lg bg-navy-800 p-3 text-xs leading-relaxed text-navy-100">
            Indicative only. Society installment plans add transfer and possession charges, and bank
            rates in Pakistan are quoted as annual markup — confirm the final figure in writing
            before signing.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href={whatsappLink(`Please quote an installment plan. My calculation: ${summary}.`)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-whatsapp"
            >
              Get a real quote
            </a>
            <a
              href={mailtoLink("Installment enquiry", `My calculation: ${summary}.`)}
              className="btn btn-ghost"
            >
              Email it
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Row({ label, value, strong = false }: { label: string; value: string; strong?: boolean }) {
  return (
    <div className="flex items-baseline justify-between gap-4">
      <dt className={strong ? "font-semibold text-paper" : "text-navy-100"}>{label}</dt>
      <dd className={`tabular ${strong ? "font-display text-lg font-semibold text-gold-400" : "text-paper"}`}>
        {value}
      </dd>
    </div>
  );
}
