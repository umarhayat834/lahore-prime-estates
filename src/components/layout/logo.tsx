import { site } from "@/data/site";

/**
 * Brand mark plus wordmark. `onNavy` flips the text for use over the dark hero;
 * the gold glyph itself reads on both backgrounds.
 */
export function Logo({ onNavy = false }: { onNavy?: boolean }) {
  return (
    <span className="flex items-center gap-2.5">
      <svg
        viewBox="0 0 40 40"
        className="h-9 w-9 shrink-0"
        role="img"
        aria-label={`${site.name} logo`}
        focusable="false"
      >
        <rect width="40" height="40" rx="9" fill={onNavy ? "#faf8f5" : "#0b1f3a"} />
        <path
          d="M11 22.5v-5.2L20 11l9 6.3v5.2"
          fill="none"
          stroke="#c9a227"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M14.2 22.5V29h11.6v-6.5"
          fill="none"
          stroke="#c9a227"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path d="M17.8 29v-4.3h4.4V29" fill="none" stroke="#d4af37" strokeWidth="2" strokeLinejoin="round" />
      </svg>
      <span className="flex flex-col leading-none">
        <span
          className={`font-display text-[1.0625rem] font-semibold tracking-tight ${
            onNavy ? "text-paper" : "text-navy-900"
          }`}
        >
          Lahore Prime
        </span>
        <span
          className={`text-[0.6875rem] font-semibold uppercase tracking-[0.22em] ${
            onNavy ? "text-gold-400" : "text-gold-600"
          }`}
        >
          Estates
        </span>
      </span>
    </span>
  );
}
