"use client";

import { CheckCircle2, MessageCircle } from "lucide-react";
import { Field, ErrorSummary, fieldAria, required, requiredSelect, useForm, phonePk, numberInRange } from "@/components/ui/form";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { areasList } from "@/data/properties";
import { mailtoLink, whatsappLink } from "@/data/site";

type FormField = "name" | "phone" | "area" | "size" | "price" | "notes";

const labels: Record<FormField, string> = {
  name: "Your name",
  phone: "WhatsApp / mobile number",
  area: "Area",
  size: "Size in Marla",
  price: "Expected price (PKR)",
  notes: "Anything else (optional)",
};

const initial: Record<FormField, string> = {
  name: "",
  phone: "",
  area: "",
  size: "",
  price: "",
  notes: "",
};

/**
 * Section 12 — list-your-property. Submitting composes an email to the address
 * in `src/data/site.ts`; no message is sent silently and no claim is made that
 * a send happened.
 */
export function ListProperty() {
  const form = useForm<FormField>(initial, {
    name: required("name"),
    phone: phonePk(),
    area: requiredSelect("the area"),
    size: numberInRange(1, 400, "Size in Marla"),
    price: numberInRange(500000, 5_000_000_000, "Expected price in PKR"),
  });

  const body = (values: Record<FormField, string>) =>
    [
      `Name: ${values.name}`,
      `Phone: ${values.phone}`,
      `Area: ${values.area}`,
      `Size: ${values.size} Marla`,
      `Expected price: PKR ${Number(values.price).toLocaleString("en-PK")}`,
      values.notes ? `Notes: ${values.notes}` : "",
    ]
      .filter(Boolean)
      .join("\n");

  return (
    <section id="list-your-property" aria-labelledby="list-title" className="py-section">
      <div className="container-page grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
        <div>
          <SectionHeading
            eyebrow="Sell or rent with us"
            title="List your property"
            description="Send us the basics and we will value it against recent registered transfers in your lane. No obligation, no exclusive agreement required."
            id="list-title"
          />

          <Reveal className="mt-8 space-y-4" delay={0.1}>
            <ol className="space-y-3 text-sm text-ink">
              {[
                "We check your registry, fard and society status first.",
                "You get a written valuation range built on recent comps.",
                "Photography and viewing scheduling are handled by us.",
                "You approve every offer before it goes back to the buyer.",
              ].map((step, i) => (
                <li key={step} className="flex gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-navy-900 text-xs font-bold text-gold-400">
                    {i + 1}
                  </span>
                  {step}
                </li>
              ))}
            </ol>

            <a
              href={whatsappLink("Hello, I want to list my property in Lahore.")}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-whatsapp"
            >
              <MessageCircle className="h-4 w-4" aria-hidden="true" />
              Send it on WhatsApp instead
            </a>
          </Reveal>
        </div>

        <Reveal delay={0.15} className="card-surface p-6 sm:p-8">
          {form.status === "sent" ? (
            <div role="status" className="flex h-full flex-col items-start justify-center gap-4 py-6">
              <CheckCircle2 className="h-10 w-10 text-gold-600" aria-hidden="true" />
              <h3 className="font-display text-2xl font-semibold text-navy-900">
                Your listing details are ready to send
              </h3>
              <p className="text-sm text-muted">
                We opened your email app with the details filled in. If nothing opened, use the link
                below — or message us on WhatsApp and we will take it from there.
              </p>
              <div className="flex flex-wrap gap-3">
                <a href={mailtoLink("Property listing", body(form.values))} className="btn btn-primary">
                  Open the email again
                </a>
                <button type="button" onClick={form.reset} className="btn btn-ghost cursor-pointer">
                  List another property
                </button>
              </div>
            </div>
          ) : (
            <form noValidate onSubmit={form.onSubmit((values) => {
              window.location.assign(mailtoLink("Property listing", body(values)));
            })}>
              <ErrorSummary errors={form.errors} attempt={form.attempt} />

              <div className="grid gap-5 sm:grid-cols-2">
                <Field name="name" label={labels.name} error={form.errors.name}>
                  <input
                    {...fieldAria("name", form.errors.name)}
                    className="field"
                    type="text"
                    autoComplete="name"
                    value={form.values.name}
                    onChange={form.onChange}
                    onBlur={form.onBlur}
                  />
                </Field>

                <Field name="phone" label={labels.phone} error={form.errors.phone}>
                  <input
                    {...fieldAria("phone", form.errors.phone)}
                    className="field"
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel"
                    placeholder="0310 456 1634"
                    value={form.values.phone}
                    onChange={form.onChange}
                    onBlur={form.onBlur}
                  />
                </Field>

                <Field name="area" label={labels.area} error={form.errors.area}>
                  <select
                    {...fieldAria("area", form.errors.area)}
                    className="field"
                    value={form.values.area}
                    onChange={form.onChange}
                    onBlur={form.onBlur}
                  >
                    <option value="">Select an area</option>
                    {areasList.map((area) => (
                      <option key={area} value={area}>
                        {area}
                      </option>
                    ))}
                  </select>
                </Field>

                <Field name="size" label={labels.size} error={form.errors.size}>
                  <input
                    {...fieldAria("size", form.errors.size)}
                    className="field"
                    type="number"
                    inputMode="numeric"
                    min={1}
                    max={400}
                    placeholder="10"
                    value={form.values.size}
                    onChange={form.onChange}
                    onBlur={form.onBlur}
                  />
                </Field>

                <Field
                  name="price"
                  label={labels.price}
                  error={form.errors.price}
                  hint="Full PKR amount, e.g. 45000000 for 4.5 Crore"
                  className="sm:col-span-2"
                >
                  <input
                    {...fieldAria("price", form.errors.price, "Full PKR amount, e.g. 45000000 for 4.5 Crore")}
                    className="field"
                    type="number"
                    inputMode="numeric"
                    min={500000}
                    step={100000}
                    placeholder="45000000"
                    value={form.values.price}
                    onChange={form.onChange}
                    onBlur={form.onBlur}
                  />
                </Field>

                <Field name="notes" label={labels.notes} className="sm:col-span-2">
                  <textarea
                    {...fieldAria("notes")}
                    className="field min-h-28"
                    rows={4}
                    value={form.values.notes}
                    onChange={form.onChange}
                    onBlur={form.onBlur}
                  />
                </Field>
              </div>

              <button type="submit" className="btn btn-primary mt-6 w-full sm:w-auto">
                Prepare my listing email
              </button>
              <p className="mt-3 text-xs text-muted">
                We only use these details to value and market your property.
              </p>
            </form>
          )}
        </Reveal>
      </div>
    </section>
  );
}
