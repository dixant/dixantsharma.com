import { site } from "@/content/site";
import { MagneticName } from "./MagneticName";
import { Reveal } from "./Reveal";

export function Hero() {
  return (
    <section
      id="top"
      className="flex min-h-[100svh] flex-col justify-center px-6 pb-20 pt-32 sm:px-10"
    >
      <div className="mx-auto w-full max-w-shell">
        <Reveal>
          <p className="mb-8 font-mono text-[11px] uppercase tracking-[0.18em] text-dim">
            {site.hero.greeting}
          </p>
        </Reveal>

        <Reveal delay={100}>
          <h1 className="text-[clamp(2.75rem,11vw,9rem)] font-medium leading-[0.92] tracking-[-0.045em]">
            <MagneticName first={site.name.first} last={site.name.last} />
          </h1>
        </Reveal>

        <Reveal delay={220}>
          <p className="mt-10 max-w-xl text-base leading-relaxed text-ink sm:mt-14 sm:text-lg">
            {site.hero.bio}
          </p>
        </Reveal>

        <Reveal delay={320}>
          <div
            className="mt-12 flex flex-wrap items-center gap-x-6 gap-y-3 border-t pt-6 font-mono text-[11px] uppercase tracking-[0.16em] text-dim sm:mt-20"
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
