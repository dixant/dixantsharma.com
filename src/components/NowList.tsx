import { site } from "@/content/site";
import { Reveal } from "./Reveal";

export function NowList() {
  return (
    <dl className="max-w-3xl">
      {site.now.items.map((item, index) => (
        <Reveal key={item.label} delay={index * 70}>
          <div
            className="grid grid-cols-1 gap-1 border-b py-5 sm:grid-cols-[8rem_1fr] sm:gap-8 sm:py-6"
            style={{ borderColor: "var(--line)" }}
          >
            <dt className="font-mono text-[11px] uppercase tracking-[0.18em] text-dim">
              {item.label}
            </dt>
            <dd className="text-base leading-relaxed sm:text-lg">{item.body}</dd>
          </div>
        </Reveal>
      ))}
    </dl>
  );
}
