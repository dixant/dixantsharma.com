import { site } from "@/content/site";
import { Reveal } from "./Reveal";

/**
 * The stack as a paragraph rather than a grid of logos. Tech names are
 * underlined, and the underline strengthens on hover. See `.tech` in
 * globals.css for why this isn't the serif swap used elsewhere.
 */
export function StackProse() {
  return (
    <Reveal>
      <p className="mx-auto max-w-4xl text-center text-2xl leading-[1.6] tracking-[-0.015em] sm:text-[2rem] sm:leading-[1.5]">
        {site.stack.prose.map((part, index) =>
          typeof part === "string" ? (
            <span key={index}>{part}</span>
          ) : (
            <span key={index} className="tech">
              {part.tech}
            </span>
          ),
        )}
      </p>
    </Reveal>
  );
}
