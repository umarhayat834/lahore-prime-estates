import { Reveal } from "@/components/ui/reveal";

/** Standard section header: gold eyebrow, Playfair title, muted standfirst. */
export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  onNavy = false,
  id,
  headingLevel = 2,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  onNavy?: boolean;
  id?: string;
  headingLevel?: 2 | 3;
}) {
  const Heading: "h2" | "h3" = headingLevel === 2 ? "h2" : "h3";
  return (
    <Reveal className={`max-w-2xl ${align === "center" ? "mx-auto text-center" : ""}`}>
      {eyebrow ? (
        <p className={`eyebrow mb-3 ${onNavy ? "text-gold-400" : "text-gold-700"}`}>{eyebrow}</p>
      ) : null}
      <Heading
        id={id}
        className={`text-[clamp(1.75rem,4vw,2.5rem)] font-semibold ${
          onNavy ? "text-paper" : "text-navy-900"
        }`}
      >
        {title}
      </Heading>
      <div
        className={`hairline-gold mt-4 ${align === "center" ? "mx-auto" : ""}`}
        aria-hidden="true"
      />
      {description ? (
        <p className={`mt-4 text-lg ${onNavy ? "text-navy-100" : "text-muted"}`}>{description}</p>
      ) : null}
    </Reveal>
  );
}
