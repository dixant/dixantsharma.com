import Image from "next/image";
import { site } from "@/content/site";
import { Reveal } from "./Reveal";

/**
 * The one piece of work with visuals, so it gets a section rather than a list
 * row. Screenshots are captured from the project's own Storybook; everything
 * else on the site is employer software that cannot be shown.
 *
 * The shots are light-themed by nature, which is the point: on the dark page
 * they read as a product sitting on a surface rather than as page furniture.
 */
type Shot = (typeof site.showcase.shots)[number];

/** A screenshot in its border. Shared so every shot is framed identically. */
function Frame({ shot, sizes }: { shot: Shot; sizes: string }) {
  return (
    <div
      className="overflow-hidden rounded-xl border"
      style={{ borderColor: "var(--line-strong)" }}
    >
      <Image
        src={shot.src}
        alt={shot.alt}
        width={shot.width}
        height={shot.height}
        sizes={sizes}
        className="h-auto w-full"
      />
    </div>
  );
}

export function Showcase() {
  const { showcase } = site;
  const [hero, ...rest] = showcase.shots;

  return (
    <section
      id="tatva"
      className="border-t px-6 py-24 sm:px-10 sm:py-36"
      style={{ borderColor: "var(--line)" }}
    >
      <div className="mx-auto max-w-shell">
        <Reveal>
          <div className="mb-8 text-center">
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-dim">
              {showcase.label}
            </span>
          </div>
        </Reveal>

        <Reveal delay={60}>
          <h2 className="mx-auto max-w-4xl text-center text-4xl leading-[1.02] tracking-[-0.035em] sm:text-6xl lg:text-7xl">
            {showcase.heading.plain}{" "}
            <em className="font-serif italic" style={{ color: "var(--accent)" }}>
              {showcase.heading.italic}
            </em>
          </h2>
        </Reveal>

        <Reveal delay={140}>
          <p className="mx-auto mt-10 max-w-2xl text-center text-lg leading-[1.7] text-dim">
            {showcase.blurb}
          </p>
        </Reveal>

        <Reveal delay={200}>
          <ul className="mx-auto mt-12 flex max-w-3xl flex-wrap items-start justify-center gap-x-14 gap-y-6 text-center">
            {showcase.stats.map((stat) => (
              <li key={stat.label}>
                <span className="block text-3xl tracking-[-0.03em] text-ink sm:text-4xl">
                  {stat.value}
                </span>
                <span className="mt-2 block font-mono text-[10px] uppercase tracking-[0.16em] text-dim">
                  {stat.label}
                </span>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={260}>
          <ul className="mt-10 flex flex-wrap justify-center gap-x-10 gap-y-3">
            {showcase.links.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="font-mono text-[11px] uppercase tracking-[0.16em] text-dim transition-colors duration-300 ease-reveal hover:text-ink"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={200}>
          <figure className="mt-14 sm:mt-20">
            <Frame shot={hero} sizes="(max-width: 640px) 100vw, 1152px" />
          </figure>
        </Reveal>

        {rest.map((shot, index) => (
          <Reveal key={shot.src} delay={260 + index * 80}>
            <figure
              className={
                shot.span === "narrow" ? "mx-auto mt-6 max-w-sm" : "mt-6"
              }
            >
              <Frame
                shot={shot}
                sizes={
                  shot.span === "narrow"
                    ? "(max-width: 640px) 100vw, 384px"
                    : "(max-width: 640px) 100vw, 1152px"
                }
              />
            </figure>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
