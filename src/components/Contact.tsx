import { site } from "@/content/site";
import { Reveal } from "./Reveal";

export function Contact() {
  return (
    <section
      id="contact"
      className="border-t px-6 py-28 sm:px-10 sm:py-44"
      style={{ borderColor: "var(--line)" }}
    >
      <div className="mx-auto max-w-shell">
        <Reveal>
          <div className="mb-8 text-center">
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-dim">
              {site.contact.label}
            </span>
          </div>
        </Reveal>

        <Reveal delay={80}>
          <h2 className="mx-auto max-w-5xl text-center text-[clamp(2.5rem,8vw,7rem)] font-medium leading-[0.98] tracking-[-0.045em]">
            {site.contact.heading.plain}{" "}
            <em className="font-serif italic" style={{ color: "var(--accent)" }}>
              {site.contact.heading.italic}
            </em>
          </h2>
        </Reveal>

        <Reveal delay={180}>
          <p className="mx-auto mt-10 max-w-md text-center text-base leading-relaxed text-dim">
            {site.contact.blurb}
          </p>
        </Reveal>

        <Reveal delay={260}>
          <div className="text-center">
          <a
            href={`mailto:${site.email}`}
            className="wipe-underline mt-14 font-mono text-lg tracking-[0.02em] sm:mt-20 sm:text-3xl"
          >
            {site.email}
          </a>
          </div>
        </Reveal>

        {site.resumeUrl && (
          <Reveal delay={300}>
            <div className="mt-10 text-center">
              <a
                href={site.resumeUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-block border px-7 py-3 font-mono text-[11px] uppercase tracking-[0.18em] transition-colors duration-300 ease-reveal hover:bg-ink hover:text-bg"
                style={{ borderColor: "var(--line-strong)" }}
              >
                Resume
              </a>
            </div>
          </Reveal>
        )}

        <Reveal delay={340}>
          <ul
            className="mt-16 flex flex-wrap justify-center gap-x-10 gap-y-3 border-t pt-6 sm:mt-24"
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
