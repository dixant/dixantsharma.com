import { site } from "@/content/site";
import { Reveal } from "./Reveal";

/**
 * One recommendation, shown in full. The container is centred but the text is
 * left-aligned: centring three paragraphs gives every line a different start
 * position and is genuinely harder to read.
 */
export function Testimonials() {
  return (
    <div className="mx-auto max-w-3xl">
      {site.testimonials.items.map((item) => (
        <Reveal key={item.name}>
          <figure>
            <blockquote className="space-y-6">
              {item.quote.map((paragraph, index) => (
                <p
                  key={index}
                  className={
                    index === 0
                      ? "text-xl leading-[1.6] tracking-[-0.01em] sm:text-2xl sm:leading-[1.55]"
                      : "text-lg leading-[1.7] text-dim sm:text-xl"
                  }
                >
                  {paragraph}
                </p>
              ))}
            </blockquote>

            <figcaption
              className="mt-10 border-t pt-6 font-mono text-[11px] uppercase leading-relaxed tracking-[0.16em] text-dim sm:mt-14"
              style={{ borderColor: "var(--line)" }}
            >
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
