/**
 * The wordmark: "Dixant" in Inter against "Sharma" in Instrument Serif italic.
 *
 * Deliberately the hero treatment at nav scale rather than a separate mark.
 * The sans-into-serif-italic switch is the one typographic idea the whole site
 * runs on, so the logo is that idea small, and the two reinforce each other
 * instead of competing. Live text, not an SVG, so it themes and scales.
 */
export function Logo({
  first,
  last,
  className = "",
}: {
  first: string;
  last: string;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-baseline gap-[0.22em] text-[15px] leading-none tracking-[-0.02em] ${className}`}
    >
      <span className="font-medium text-ink">{first}</span>
      <span className="font-serif italic" style={{ color: "var(--accent)" }}>
        {last}
      </span>
    </span>
  );
}
