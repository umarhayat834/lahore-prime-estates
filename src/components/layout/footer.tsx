import Link from "next/link";
import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { Logo } from "@/components/layout/logo";
import { NewsletterForm } from "@/components/layout/newsletter-form";
import { socialIcons } from "@/components/layout/social-icons";
import { services, site, whatsappLink } from "@/data/site";

const quickLinks = [
  { href: "/properties", label: "All properties" },
  { href: "/areas", label: "Lahore areas" },
  { href: "/services", label: "Our services" },
  { href: "/calculator", label: "Installment calculator" },
  { href: "/list-your-property", label: "List your property" },
  { href: "/about", label: "About us" },
  { href: "/contact", label: "Contact" },
];

/** Site footer: navigation, services, contact details and newsletter. */
export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="on-navy bg-navy-900 pt-16 text-navy-100">
      <div className="container-page grid gap-10 pb-12 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <Logo onNavy />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-navy-100">{site.description}</p>
          <ul className="mt-5 flex items-center gap-2">
            {site.social.map((item) => {
              const Icon = socialIcons[item.label];
              return (
                <li key={item.label}>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${site.name} on ${item.label}`}
                    className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-lg border border-white/15 text-gold-400 transition-colors duration-200 hover:border-gold-400 hover:bg-white/10 hover:text-paper"
                  >
                    {Icon ? <Icon className="h-5 w-5" /> : item.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>

        <nav aria-labelledby="footer-explore">
          <h2 id="footer-explore" className="font-display text-lg font-semibold text-paper">
            Explore
          </h2>
          <ul className="mt-4 space-y-2 text-sm">
            {quickLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="cursor-pointer rounded text-navy-100 underline-offset-4 transition-colors duration-200 hover:text-gold-400 hover:underline"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-labelledby="footer-services">
          <h2 id="footer-services" className="font-display text-lg font-semibold text-paper">
            Services
          </h2>
          <ul className="mt-4 space-y-2 text-sm">
            {services.map((service) => (
              <li key={service.id}>
                <Link
                  href={`/services#${service.id}`}
                  className="cursor-pointer rounded text-navy-100 underline-offset-4 transition-colors duration-200 hover:text-gold-400 hover:underline"
                >
                  {service.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="font-display text-lg font-semibold text-paper">Contact</h2>
          <ul className="mt-4 space-y-3 text-sm">
            <li>
              <a
                href={mailto(`Enquiry from ${site.name} website`)}
                className="flex cursor-pointer items-start gap-2.5 rounded text-navy-100 transition-colors duration-200 hover:text-gold-400"
              >
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-gold-400" aria-hidden="true" />
                {site.email}
              </a>
            </li>
            <li>
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex cursor-pointer items-start gap-2.5 rounded text-navy-100 transition-colors duration-200 hover:text-gold-400"
              >
                <MessageCircle
                  className="mt-0.5 h-4 w-4 shrink-0 text-gold-400"
                  aria-hidden="true"
                />
                {site.whatsappDisplay}
                <span className="sr-only">(WhatsApp)</span>
              </a>
            </li>
            <li className="flex items-start gap-2.5">
              <Phone className="mt-0.5 h-4 w-4 shrink-0 text-gold-400" aria-hidden="true" />
              <a
                href="tel:+923104561634"
                className="cursor-pointer rounded text-navy-100 transition-colors duration-200 hover:text-gold-400"
              >
                {site.whatsappDisplay}
              </a>
            </li>
            <li className="flex items-start gap-2.5">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold-400" aria-hidden="true" />
              {site.address.full}
            </li>
          </ul>

          <div className="mt-7 border-t border-white/10 pt-6">
            <h3 className="font-display text-base font-semibold text-paper">
              New listings in your area
            </h3>
            <p className="mb-3 mt-1 text-sm text-navy-100">
              One email when something verified comes on market.
            </p>
            <NewsletterForm />
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-page flex flex-col gap-3 py-6 text-xs text-navy-100 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.name}. {site.footerNote}
          </p>
          <p>{site.tagline}</p>
        </div>
      </div>
    </footer>
  );
}

function mailto(subject: string) {
  return `mailto:${site.email}?subject=${encodeURIComponent(subject)}`;
}
