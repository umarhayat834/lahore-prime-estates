import Link from "next/link";
import { Search } from "lucide-react";
import { whatsappLink } from "@/data/site";
import { properties } from "@/data/properties";

export default function NotFound() {
  return (
    <div className="on-navy flex min-h-[70svh] flex-col justify-center bg-navy-900 pt-28 pb-20 text-paper">
      <div className="container-page max-w-2xl text-center">
        <p className="eyebrow justify-center text-gold-400">404 — page not found</p>
        <h1 className="mt-3 font-display text-[clamp(2rem,6vw,3rem)] text-paper">
          That page has moved, or never existed
        </h1>
        <p className="mx-auto mt-4 max-w-lg text-navy-100">
          Listings change hands quickly in Lahore. Try the search, or pick one of the{" "}
          {properties.length} current files below.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link href="/properties" className="btn btn-gold">
            <Search className="h-4 w-4" aria-hidden="true" />
            Browse all properties
          </Link>
          <Link href="/" className="btn btn-ghost">
            Back to home
          </Link>
          <a
            href={whatsappLink("Hello, I could not find a page on your website.")}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-whatsapp"
          >
            Ask us on WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}
