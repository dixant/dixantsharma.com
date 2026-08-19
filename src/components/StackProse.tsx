import { site } from "@/content/site";
import { Reveal } from "./Reveal";

/**
 * The stack as a paragraph rather than a grid of logos. Tech names are
 * underlined, and the underline strengthens on hover — see `.tech` in
 * globals.css for why this isn't the serif swap used elsewhere.
 */
export function StackProse() {
  return (
    <Reveal>
      <p className="max-w-3xl text-xl leading-[1.7] tracking-[-0.01em] sm:text-2xl sm:leading-[1.65]">
        {site.stack.prose.map((part, index) =>
          typeof part === "string" ? (
            <span key={index}>{part}</span>
          ) : (
            <span key={index} data-cursor="grow" className="tech">
              {part.tech}
            </span>
          ),
        )}
      </p>
    </Reveal>
  );
}
