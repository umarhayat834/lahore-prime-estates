"use client";

import { Mail } from "lucide-react";
import { ErrorSummary, Field, email as emailRule, fieldAria, useForm } from "@/components/ui/form";
import { site } from "@/data/site";

const fields = { address: "" };
const rules = { address: emailRule() };

/**
 * Newsletter box. There is no mailing-list provider wired up yet, so a
 * successful submit opens the visitor's email app addressed to the business
 * inbox — the form never claims a send that did not happen.
 */
export function NewsletterForm() {
  const form = useForm(fields, rules);

  const submit = form.onSubmit((values) => {
    const subject = encodeURIComponent("Newsletter signup request");
    const body = encodeURIComponent(
      `Please add ${values.address} to the ${site.name} listing alerts.\n\nBest way to reach me: `,
    );
    window.location.assign(`mailto:${site.email}?subject=${subject}&body=${body}`);
  });

  return (
    <form onSubmit={submit} noValidate className="max-w-sm">
      <ErrorSummary errors={form.errors} attempt={form.attempt} />
      <Field name="address" label="Email address" error={form.errors.address}>
        <input
          type="email"
          inputMode="email"
          autoComplete="email"
          placeholder="you@example.com"
          className="field"
          {...fieldAria("address", form.errors.address)}
          value={form.values.address}
          onChange={form.onChange}
          onBlur={form.onBlur}
        />
      </Field>

      <button type="submit" className="btn btn-gold mt-3 w-full">
        <Mail className="h-4 w-4" aria-hidden="true" />
        Get listing alerts
      </button>

      <p role="status" aria-live="polite" className="mt-2 min-h-5 text-sm text-navy-100">
        {form.status === "sent"
          ? `Your email app should have opened with the request. If it did not, write to ${site.email}.`
          : ""}
      </p>
    </form>
  );
}
