import type { ReactNode } from "react";
import type { Heading } from "@/content/site";
import { Reveal } from "./Reveal";

/**
 * Shared section shell. The header is centred and the content below is left to
 * choose its own alignment: centred headings over a full-width grid is the
 * layout that stops the page reading lopsided, which it did when every block
 * was flush left inside a much wider container.
 */
export function Section({
  id,
  label,
  heading,
  children,
}: {
  id: string;
  label: string;
  heading: Heading;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      className="border-t px-6 py-24 sm:px-10 sm:py-36"
      style={{ borderColor: "var(--line)" }}
    >
      <div className="mx-auto max-w-shell">
        <Reveal>
          <div className="mb-8 text-center">
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-dim">
              {label}
            </span>
          </div>
        </Reveal>

        <Reveal delay={80}>
          <h2 className="mx-auto mb-16 max-w-4xl text-center text-4xl leading-[1.02] tracking-[-0.035em] sm:mb-24 sm:text-6xl lg:text-7xl">
            {heading.plain}{" "}
            <em className="font-serif italic" style={{ color: "var(--accent)" }}>
              {heading.italic}
            </em>
          </h2>
        </Reveal>

        {children}
      </div>
    </section>
  );
}
