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
export function Showcase() {
  const { showcase } = site;
  const [hero, ...rest] = showcase.shots;

  return (
    <section
      id="tatva"
      className="border-t px-6 py-20 sm:px-10 sm:py-28"
      style={{ borderColor: "var(--line)" }}
    >
      <div className="mx-auto max-w-shell">
        <Reveal>
          <div className="mb-10 sm:mb-14">
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-dim">
              {showcase.label}
            </span>
          </div>
        </Reveal>

        <div className="grid gap-10 sm:grid-cols-[1fr_1fr] sm:gap-16">
          <Reveal delay={60}>
            <h2 className="text-3xl leading-[1.1] tracking-[-0.02em] sm:text-5xl">
              {showcase.heading.plain}{" "}
              <em className="font-serif italic" style={{ color: "var(--accent)" }}>
                {showcase.heading.italic}
              </em>
            </h2>
            <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.18em] text-dim">
              {showcase.title}
            </p>
          </Reveal>

          <Reveal delay={140}>
            <p className="max-w-xl text-lg leading-[1.7] text-dim">
              {showcase.blurb}
            </p>

            <ul className="mt-8 flex flex-wrap gap-x-10 gap-y-5">
              {showcase.stats.map((stat) => (
                <li key={stat.label}>
                  <span className="block text-2xl tracking-[-0.02em] text-ink">
                    {stat.value}
                  </span>
                  <span className="mt-1 block font-mono text-[10px] uppercase tracking-[0.16em] text-dim">
                    {stat.label}
                  </span>
                </li>
              ))}
            </ul>

            <ul className="mt-8 flex flex-wrap gap-x-8 gap-y-3">
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
        </div>

        <Reveal delay={200}>
          <figure className="mt-14 sm:mt-20">
            <div
              className="overflow-hidden rounded-xl border"
              style={{ borderColor: "var(--line-strong)" }}
            >
              <Image
                src={hero.src}
                alt={hero.alt}
                width={hero.width}
                height={hero.height}
                priority={false}
                sizes="(max-width: 640px) 100vw, 1152px"
                className="h-auto w-full"
              />
            </div>
          </figure>
        </Reveal>

        <div className="mt-6 grid gap-6 sm:grid-cols-[1.6fr_1fr]">
          {rest.map((shot, index) => (
            <Reveal key={shot.src} delay={260 + index * 80}>
              <div
                className="h-full overflow-hidden rounded-xl border"
                style={{ borderColor: "var(--line-strong)" }}
              >
                <Image
                  src={shot.src}
                  alt={shot.alt}
                  width={shot.width}
                  height={shot.height}
                  sizes="(max-width: 640px) 100vw, 720px"
                  className="h-auto w-full"
                />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
