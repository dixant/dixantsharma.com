import { site } from "@/content/site";
import { MagneticName } from "./MagneticName";
import { Reveal } from "./Reveal";

/**
 * Centred, and choreographed rather than simply present on load: the greeting
 * arrives, the name rises letter by letter, then the bio and figures follow.
 * Delays here are tuned to land after the letter stagger finishes.
 *
 * The name itself carries no <Reveal> because the letters run their own
 * entrance; wrapping it would fade the whole block in on top of that.
 */
export function Hero() {
  return (
    <section
      id="top"
      className="flex min-h-[100svh] flex-col justify-center px-6 pb-24 pt-32 sm:px-10"
    >
      <div className="mx-auto w-full max-w-shell text-center">
        <Reveal>
          <p className="mb-8 font-mono text-[11px] uppercase tracking-[0.2em] text-dim sm:mb-10">
            {site.hero.greeting}
          </p>
        </Reveal>

        <h1 className="text-[clamp(2.75rem,11.5vw,9.5rem)] font-medium leading-[0.9] tracking-[-0.05em]">
          <MagneticName first={site.name.first} last={site.name.last} />
        </h1>

        <Reveal delay={780}>
          <p className="mx-auto mt-10 max-w-2xl text-lg leading-[1.6] sm:mt-14 sm:text-xl">
            {site.hero.bio}
          </p>
        </Reveal>

        <Reveal delay={900}>
          <div
            className="mx-auto mt-14 flex max-w-3xl flex-wrap items-center justify-center gap-x-10 gap-y-3 border-t pt-6 font-mono text-[11px] uppercase tracking-[0.18em] text-dim sm:mt-20"
            style={{ borderColor: "var(--line)" }}
          >
            {site.hero.meta.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
