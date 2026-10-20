import Link from "next/link";
import type { ReactNode } from "react";
import { Reveal } from "@/components/ui/reveal";

/** Shared interior-page masthead with a breadcrumb. */
export function PageHeader({
  eyebrow,
  title,
  description,
  breadcrumb,
  children,
}: {
  eyebrow: string;
  title: string;
  description: string;
  breadcrumb: string;
  children?: ReactNode;
}) {
  return (
    <div className="on-navy bg-navy-900 pt-28 pb-14 text-paper">
      <div className="container-page">
        <Reveal>
          <nav aria-label="Breadcrumb" className="mb-5 text-sm text-navy-100">
            <ol className="flex flex-wrap gap-2">
              <li>
                <Link href="/" className="cursor-pointer underline-offset-4 hover:underline">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="font-semibold text-paper">
                {breadcrumb}
              </li>
            </ol>
          </nav>
          <p className="eyebrow mb-3">{eyebrow}</p>
          <h1 className="font-display text-[clamp(2rem,5vw,3rem)] font-semibold text-paper">
            {title}
          </h1>
          <div className="hairline-gold mt-4" aria-hidden="true" />
          <p className="mt-4 max-w-2xl text-lg text-navy-100">{description}</p>
          {children}
        </Reveal>
      </div>
    </div>
  );
}
