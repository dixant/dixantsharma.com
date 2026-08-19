import type { ReactNode } from "react";
import type { Heading } from "@/content/site";
import { Reveal } from "./Reveal";

/**
 * Shared section shell: mono index + label in the left column, content on the
 * right. The heading's last word is set in Instrument Serif italic.
 */
export function Section({
  id,
  index,
  label,
  heading,
  children,
}: {
  id: string;
  index: string;
  label: string;
  heading: Heading;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      className="border-t px-6 py-20 sm:px-10 sm:py-28"
      style={{ borderColor: "var(--line)" }}
    >
      <div className="mx-auto max-w-shell">
        <Reveal>
          <div className="mb-10 flex items-baseline gap-4 sm:mb-14">
            <span className="font-mono text-[11px] tracking-[0.18em] text-dim">
              {index}
            </span>
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-dim">
              {label}
            </span>
          </div>
        </Reveal>

        <Reveal delay={80}>
          <h2 className="mb-10 text-3xl leading-[1.1] tracking-[-0.02em] sm:mb-16 sm:text-5xl">
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
