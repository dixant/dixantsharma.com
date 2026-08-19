import { site } from "@/content/site";
import { Reveal } from "./Reveal";

export function Contact() {
  return (
    <section
      id="contact"
      className="border-t px-6 py-24 sm:px-10 sm:py-36"
      style={{ borderColor: "var(--line)" }}
    >
      <div className="mx-auto max-w-shell">
        <Reveal>
          <div className="mb-10 flex items-baseline gap-4 sm:mb-14">
            <span className="font-mono text-[11px] tracking-[0.18em] text-dim">05</span>
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-dim">
              {site.contact.label}
            </span>
          </div>
        </Reveal>

        <Reveal delay={80}>
          <h2 className="max-w-3xl text-[clamp(2.25rem,7vw,5.5rem)] font-medium leading-[1.02] tracking-[-0.035em]">
            {site.contact.heading.plain}{" "}
            <em className="font-serif italic" style={{ color: "var(--accent)" }}>
              {site.contact.heading.italic}
            </em>
          </h2>
        </Reveal>

        <Reveal delay={180}>
          <p className="mt-8 max-w-md text-base leading-relaxed text-dim">
            {site.contact.blurb}
          </p>
        </Reveal>

        <Reveal delay={260}>
          <a
            href={`mailto:${site.email}`}
            className="wipe-underline mt-12 inline-block font-mono text-lg tracking-[0.02em] sm:mt-16 sm:text-2xl"
          >
            {site.email}
          </a>
        </Reveal>

        <Reveal delay={340}>
          <ul
            className="mt-14 flex flex-wrap gap-x-8 gap-y-3 border-t pt-6 sm:mt-20"
            style={{ borderColor: "var(--line)" }}
          >
            {site.socials.map((social) => (
              <li key={social.label}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="font-mono text-[11px] uppercase tracking-[0.18em] text-dim transition-colors duration-300 ease-reveal hover:text-ink"
                >
                  {social.label}
                </a>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
