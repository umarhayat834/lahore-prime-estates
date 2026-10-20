"use client";

import { CheckCircle2, Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { ErrorSummary, Field, fieldAria, email as emailRule, phonePk, required, useForm } from "@/components/ui/form";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { areasList } from "@/data/properties";
import { mailtoLink, site, whatsappLink } from "@/data/site";

type FormField = "name" | "email" | "phone" | "interest" | "message";

const fields: Record<FormField, string> = {
  name: "Your name",
  email: "Email",
  phone: "WhatsApp / mobile number",
  interest: "Area of interest",
  message: "Message",
};

const initial: Record<FormField, string> = {
  name: "",
  email: "",
  phone: "",
  interest: "",
  message: "",
};

const details = [
  {
    icon: MessageCircle,
    label: "WhatsApp",
    value: site.whatsappDisplay,
    href: whatsappLink(),
    external: true,
  },
  {
    icon: Mail,
    label: "Email",
    value: site.email,
    href: mailtoLink("Property enquiry — Lahore Prime Estates"),
    external: false,
  },
  { icon: MapPin, label: "Coverage", value: site.address.full, href: null, external: false },
  {
    icon: Clock,
    label: "Hours",
    value: "Mon-Sat 10:00-19:00 PKT · site visits by appointment",
    href: null,
    external: false,
  },
];

/** Section 14b — contact details, enquiry form and the Lahore map. */
export function ContactSection({ compact = false }: { compact?: boolean }) {
  const form = useForm<FormField>(initial, {
    name: required("name"),
    email: emailRule(),
    phone: phonePk(),
    message: required("message"),
  });

  const body = (v: Record<FormField, string>) =>
    [
      `Name: ${v.name}`,
      `Email: ${v.email}`,
      `Phone: ${v.phone}`,
      v.interest ? `Interested in: ${v.interest}` : "",
      "",
      v.message,
    ].join("\n");

  return (
    <section id="contact" aria-labelledby="contact-title" className="py-section">
      <div className="container-page">
        <SectionHeading
          eyebrow="Contact"
          title={compact ? "Talk to us" : "Tell us the area, size and budget"}
          description="WhatsApp is the fastest route — a named consultant replies during the hours below. Email works too, and the form composes the message for you."
          id="contact-title"
        />

        <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_1.2fr]">
          <div className="space-y-6">
            <Reveal className="card-surface p-6">
              <ul className="space-y-5">
                {details.map((detail) => {
                  const Icon = detail.icon;
                  const row = (
                    <>
                      <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-navy-900 text-gold-400">
                        <Icon className="h-5 w-5" aria-hidden="true" />
                      </span>
                      <span className="min-w-0">
                        <span className="block text-xs font-semibold uppercase tracking-wider text-muted">
                          {detail.label}
                        </span>
                        <span className="block break-words font-medium text-navy-900">
                          {detail.value}
                        </span>
                      </span>
                    </>
                  );
                  return (
                    <li key={detail.label} className="flex items-start gap-4">
                      {detail.href ? (
                        <a
                          href={detail.href}
                          {...(detail.external
                            ? { target: "_blank", rel: "noopener noreferrer" }
                            : {})}
                          className="flex cursor-pointer items-start gap-4 rounded-lg transition-colors duration-200 hover:text-gold-700"
                        >
                          {row}
                        </a>
                      ) : (
                        <span className="flex items-start gap-4">{row}</span>
                      )}
                    </li>
                  );
                })}
              </ul>
            </Reveal>

            <Reveal delay={0.1} className="overflow-hidden rounded-2xl border border-line shadow-[var(--shadow-soft)]">
              <iframe
                title="Map of Lahore, Punjab, Pakistan"
                src={site.mapEmbedSrc}
                className="h-72 w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </Reveal>
          </div>

          <Reveal delay={0.05} className="card-surface p-6 sm:p-8">
            {form.status === "sent" ? (
              <div role="status" className="flex h-full flex-col items-start justify-center gap-4 py-8">
                <CheckCircle2 className="h-10 w-10 text-gold-600" aria-hidden="true" />
                <h3 className="font-display text-2xl font-semibold text-navy-900">
                  Your message is ready to send
                </h3>
                <p className="text-sm text-muted">
                  We opened your email app with everything filled in — press send there. Prefer
                  WhatsApp? Use the button below and we will carry on from there.
                </p>
                <div className="flex flex-wrap gap-3">
                  <a href={mailtoLink("Property enquiry", body(form.values))} className="btn btn-primary">
                    Open the email again
                  </a>
                  <a
                    href={whatsappLink(`${form.values.name}: ${form.values.message}`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-whatsapp"
                  >
                    <Phone className="h-4 w-4" aria-hidden="true" />
                    WhatsApp instead
                  </a>
                  <button type="button" onClick={form.reset} className="btn btn-ghost cursor-pointer">
                    Write another
                  </button>
                </div>
              </div>
            ) : (
              <form
                noValidate
                onSubmit={form.onSubmit((values) => {
                  window.location.assign(mailtoLink("Property enquiry", body(values)));
                })}
              >
                <ErrorSummary errors={form.errors} attempt={form.attempt} />

                <div className="grid gap-5 sm:grid-cols-2">
                  <Field name="name" label={fields.name} error={form.errors.name}>
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

                  <Field name="phone" label={fields.phone} error={form.errors.phone}>
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

                  <Field
                    name="email"
                    label={fields.email}
                    error={form.errors.email}
                    className="sm:col-span-2"
                  >
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

                  <Field
                    name="interest"
                    label={fields.interest}
                    hint="Optional — pick an area if you already know"
                    className="sm:col-span-2"
                  >
                    <select
                      {...fieldAria("interest", undefined, "Optional — pick an area if you already know")}
                      className="field"
                      value={form.values.interest}
                      onChange={form.onChange}
                      onBlur={form.onBlur}
                    >
                      <option value="">No preference yet</option>
                      {areasList.map((area) => (
                        <option key={area} value={area}>
                          {area}
                        </option>
                      ))}
                    </select>
                  </Field>

                  <Field name="message" label={fields.message} error={form.errors.message} className="sm:col-span-2">
                    <textarea
                      {...fieldAria("message", form.errors.message)}
                      className="field min-h-32"
                      rows={5}
                      value={form.values.message}
                      onChange={form.onChange}
                      onBlur={form.onBlur}
                    />
                  </Field>
                </div>

                <button type="submit" className="btn btn-primary mt-6 w-full sm:w-auto">
                  Compose my enquiry email
                </button>
                <p className="mt-3 text-xs text-muted">
                  Nothing leaves your browser until you press send in your own mail app.
                </p>
              </form>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
