import { site } from "@/content/site";
import { Reveal } from "./Reveal";

/**
 * The only third-party voice on the site, so it sits last before the contact
 * ask. Two columns rather than a stack: the page is text-left everywhere else
 * and the right half was going unused.
 */
export function Testimonials() {
  return (
    <div className="grid gap-12 sm:grid-cols-2 sm:gap-16">
      {site.testimonials.items.map((item, index) => (
        <Reveal key={item.name} delay={index * 90}>
          <figure
            className="border-t pt-8"
            style={{ borderColor: "var(--line)" }}
          >
            <blockquote className="text-lg leading-[1.65] sm:text-xl">
              {item.quote}
            </blockquote>

            <figcaption className="mt-8 font-mono text-[11px] uppercase leading-relaxed tracking-[0.14em] text-dim">
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
