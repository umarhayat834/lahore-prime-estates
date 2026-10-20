"use client";

import { CheckCircle2, MessageCircle } from "lucide-react";
import {
  ErrorSummary,
  Field,
  email as emailRule,
  fieldAria,
  phonePk,
  required,
  useForm,
} from "@/components/ui/form";
import { mailtoLink, whatsappLink } from "@/data/site";
import { formatPrice } from "@/lib/format";
import type { Property } from "@/lib/types";

type FormField = "name" | "email" | "phone" | "visit" | "message";

const labels: Record<FormField, string> = {
  name: "Your name",
  email: "Email",
  phone: "WhatsApp / mobile number",
  visit: "Preferred viewing day",
  message: "Message",
};

const initial: Record<FormField, string> = {
  name: "",
  email: "",
  phone: "",
  visit: "",
  message: "",
};

/** The enquiry form on a property page, pre-filled with that listing. */
export function InquiryForm({ property }: { property: Property }) {
  const form = useForm<FormField>(initial, {
    name: required("name"),
    email: emailRule(),
    phone: phonePk(),
  });

  const subject = `Enquiry: ${property.title}`;
  const body = (v: Record<FormField, string>) =>
    [
      `Property: ${property.title} (${property.area})`,
      `Listed at: ${formatPrice(property.price, property.isRent)}`,
      `Name: ${v.name}`,
      `Email: ${v.email}`,
      `Phone: ${v.phone}`,
      v.visit ? `Preferred viewing: ${v.visit}` : "",
      "",
      v.message || "I would like more information about this listing.",
    ]
      .filter(Boolean)
      .join("\n");

  return (
    <div className="card-surface p-6">
      <h2 id="inquiry-title" className="font-display text-xl font-semibold text-navy-900">
        Enquire about this property
      </h2>
      <p className="mt-1 text-sm text-muted">
        Reference: <span className="font-medium text-navy-900">{property.id}</span>
      </p>

      {form.status === "sent" ? (
        <div role="status" className="mt-6 flex flex-col gap-3">
          <CheckCircle2 className="h-9 w-9 text-gold-600" aria-hidden="true" />
          <p className="text-sm text-ink">
            Your email app should be open with the enquiry ready — press send there. If it did not
            open, use the links below.
          </p>
          <a href={mailtoLink(subject, body(form.values))} className="btn btn-primary w-full">
            Open the email again
          </a>
        </div>
      ) : (
        <form
          className="mt-5 space-y-4"
          noValidate
          onSubmit={form.onSubmit((values) => {
            window.location.assign(mailtoLink(subject, body(values)));
          })}
        >
          <ErrorSummary errors={form.errors} attempt={form.attempt} />

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

          <Field name="email" label={labels.email} error={form.errors.email}>
            <input
              {...fieldAria("email", form.errors.email)}
              className="field"
              type="email"
              inputMode="email"
              autoComplete="email"
              value={form.values.email}
              onChange={form.onChange}
              onBlur={form.onBlur}
            />
          </Field>

          <Field name="visit" label={labels.visit} hint="Optional">
            <input
              {...fieldAria("visit", undefined, "Optional")}
              className="field"
              type="text"
              placeholder="Saturday morning"
              value={form.values.visit}
              onChange={form.onChange}
              onBlur={form.onBlur}
            />
          </Field>

          <Field name="message" label={labels.message} hint="Optional">
            <textarea
              {...fieldAria("message", undefined, "Optional")}
              className="field min-h-24"
              rows={3}
              value={form.values.message}
              onChange={form.onChange}
              onBlur={form.onBlur}
            />
          </Field>

          <button type="submit" className="btn btn-primary w-full">
            Enquire by email
          </button>
        </form>
      )}

      <a
        href={whatsappLink(`Hello, I am interested in ${property.title} in ${property.area}.`)}
        target="_blank"
        rel="noopener noreferrer"
        className="btn btn-whatsapp mt-3 w-full"
      >
        <MessageCircle className="h-4 w-4" aria-hidden="true" />
        Ask about it on WhatsApp
      </a>
    </div>
  );
}
