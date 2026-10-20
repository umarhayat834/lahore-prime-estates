"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { ChangeEvent, FocusEvent, FormEvent, ReactNode } from "react";

/** Remove one key from an errors object without an unused-variable binding. */
function withoutKey<T extends string>(errors: Errors<T>, key: T): Errors<T> {
  const next: Errors<T> = {};
  for (const entry of Object.entries(errors) as [T, string][]) {
    if (entry[0] !== key) next[entry[0]] = entry[1];
  }
  return next;
}

export type Validator = (value: string) => string | null;
export type Rules<T extends string> = Partial<Record<T, Validator>>;
export type Errors<T extends string> = Partial<Record<T, string>>;

export const required =
  (label: string): Validator =>
  (v) =>
    v.trim() ? null : `Enter your ${label.toLowerCase()}`;

export const requiredSelect =
  (label: string): Validator =>
  (v) =>
    v ? null : `Choose ${label.toLowerCase()}`;

export const phonePk =
  (): Validator =>
  (v) => {
    const digits = v.replace(/[^\d]/g, "");
    if (!digits) return "Enter a phone number";
    // 03XXXXXXXXX locally, or 923XXXXXXXXX / a full international number.
    if (/^03\d{9}$/.test(digits) || /^92\d{10}$/.test(digits) || digits.length >= 10) return null;
    return "Use a Pakistani mobile number, for example 0310 456 1634";
  };

export const email =
  (): Validator =>
  (v) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()) ? null : "Enter a valid email address";

export const numberInRange =
  (min: number, max: number, label: string): Validator =>
  (v) => {
    const n = Number(v);
    if (!v.trim()) return `Enter ${label.toLowerCase()}`;
    if (!Number.isFinite(n)) return `${label} must be a number`;
    if (n < min || n > max) return `${label} must be between ${min} and ${max}`;
    return null;
  };

/**
 * Minimal controlled-form helper: validates on blur and again on submit, and
 * exposes what the accessible error summary needs.
 *
 * `attempt` counts failed submits — the error summary watches it to move focus,
 * which keeps the ref inside the component that owns it.
 */
export function useForm<T extends string>(initial: Record<T, string>, rules: Rules<T>) {
  const [values, setValues] = useState<Record<T, string>>(initial);
  const [errors, setErrors] = useState<Errors<T>>({});
  const [status, setStatus] = useState<"idle" | "error" | "sent">("idle");
  const [attempt, setAttempt] = useState(0);

  const runAll = useCallback(
    (v: Record<T, string>) => {
      const next: Errors<T> = {};
      for (const key of Object.keys(rules) as T[]) {
        const message = rules[key]?.(v[key] ?? "");
        if (message) next[key] = message;
      }
      return next;
    },
    [rules],
  );

  const onChange = useCallback(
    (event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
      const name = event.target.name as T;
      const value = event.target.value;
      setValues((prev) => ({ ...prev, [name]: value }));
      // Clear a live error as soon as the field becomes valid again.
      setErrors((prev) => {
        if (!prev[name]) return prev;
        const message = rules[name]?.(value);
        if (message) return prev;
        return withoutKey(prev, name);
      });
    },
    [rules],
  );

  const onBlur = useCallback(
    (event: FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
      const name = event.target.name as T;
      const message = rules[name]?.(values[name] ?? "");
      setErrors((prev) => {
        if (!message) {
          if (!prev[name]) return prev;
          return withoutKey(prev, name);
        }
        return { ...prev, [name]: message };
      });
    },
    [rules, values],
  );

  const onSubmit = useCallback(
    (handler: (values: Record<T, string>) => void) => (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const found = runAll(values);
      if (Object.keys(found).length > 0) {
        setErrors(found);
        setStatus("error");
        setAttempt((n) => n + 1);
        return;
      }
      setErrors({});
      setStatus("sent");
      handler(values);
    },
    [runAll, values],
  );

  const reset = useCallback(() => {
    setValues(initial);
    setErrors({});
    setStatus("idle");
    setAttempt(0);
  }, [initial]);

  return { values, errors, status, attempt, onChange, onBlur, onSubmit, reset, setStatus };
}

/**
 * Focusable error summary — WCAG guidance from MASTER.md: rendered above the
 * fields, focused after a failed submit, with every item linking to its input.
 */
export function ErrorSummary<T extends string>({
  errors,
  attempt,
}: {
  errors: Errors<T>;
  attempt: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const entries = Object.entries(errors) as [T, string][];
  const count = entries.length;

  useEffect(() => {
    if (attempt > 0 && count > 0) ref.current?.focus();
  }, [attempt, count]);

  if (count === 0) return null;

  return (
    <div
      ref={ref}
      role="alert"
      tabIndex={-1}
      aria-labelledby="form-error-title"
      className="mb-6 rounded-xl border-2 border-danger/40 bg-surface p-4 shadow-[var(--shadow-soft)] focus-visible:outline-2 focus-visible:outline-danger"
    >
      <h2 id="form-error-title" className="font-sans text-base font-bold text-danger">
        There is a problem
      </h2>
      <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-ink">
        {entries.map(([field, message]) => (
          <li key={field}>
            <a
              href={`#field-${field}`}
              className="cursor-pointer underline decoration-danger/50 underline-offset-2 hover:decoration-danger"
            >
              {message}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Field({
  name,
  label,
  error,
  hint,
  children,
  className,
}: {
  name: string;
  label: string;
  error?: string;
  hint?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <label className="label" htmlFor={`field-${name}`}>
        {label}
      </label>
      {hint ? (
        <p id={`hint-${name}`} className="mb-1.5 text-xs text-muted">
          {hint}
        </p>
      ) : null}
      {children}
      {error ? (
        <p id={`error-${name}`} className="field-error mt-1.5 text-sm font-medium">
          {error}
        </p>
      ) : null}
    </div>
  );
}

export const fieldAria = (name: string, error?: string, hint?: string) => ({
  id: `field-${name}`,
  name,
  "aria-invalid": error ? true : undefined,
  "aria-describedby":
    [error ? `error-${name}` : null, hint ? `hint-${name}` : null].filter(Boolean).join(" ") ||
    undefined,
});
