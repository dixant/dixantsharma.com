import { site } from "@/content/site";
import { Reveal } from "./Reveal";

/**
 * One recommendation, set large and centred. A single quote in the two-column
 * grid this replaced left an obvious hole where the second one used to be;
 * centring it turns the space into deliberate framing instead.
 */
export function Testimonials() {
  return (
    <div className="mx-auto max-w-4xl text-center">
      {site.testimonials.items.map((item) => (
        <Reveal key={item.name}>
          <figure>
            <blockquote className="text-2xl leading-[1.5] tracking-[-0.015em] sm:text-[2rem] sm:leading-[1.45]">
              {item.quote}
            </blockquote>

            <figcaption className="mt-10 font-mono text-[11px] uppercase leading-relaxed tracking-[0.16em] text-dim sm:mt-14">
              <span className="block text-ink">{item.name}</span>
              <span className="block">{item.title}</span>
              <span className="mt-1 block">{item.relation}</span>
            </figcaption>
          </figure>
        </Reveal>
      ))}
    </div>
  );
}
