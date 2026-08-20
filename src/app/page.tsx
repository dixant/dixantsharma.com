import { Fragment } from "react";
import { site } from "@/content/site";
import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { Section } from "@/components/Section";
import { WorkList } from "@/components/WorkList";
import { StackProse } from "@/components/StackProse";
import { Showcase } from "@/components/Showcase";
import { Testimonials } from "@/components/Testimonials";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { Reveal } from "@/components/Reveal";

/**
 * Italicizes any accent phrase found in a paragraph, leaving the rest alone.
 * Phrases come from `site.about.accents`.
 */
function Accented({ text, accents }: { text: string; accents: readonly string[] }) {
  const match = accents.find((phrase) => text.includes(phrase));
  if (!match) return <>{text}</>;

  const [before, ...rest] = text.split(match);
  return (
    <Fragment>
      {before}
      <em className="font-serif italic" style={{ color: "var(--accent)" }}>
        {match}
      </em>
      <Accented text={rest.join(match)} accents={accents.filter((p) => p !== match)} />
    </Fragment>
  );
}

export default function Home() {
  return (
    <>
      <Nav />

      <main>
        <Hero />

        <Section id="about" label={site.about.label} heading={site.about.heading}>
          <div className="mx-auto max-w-3xl">
            <Reveal>
              <p className="mb-10 text-center font-mono text-[11px] uppercase tracking-[0.18em] text-dim">
                {site.availability}
              </p>
            </Reveal>
            <div className="space-y-6">
              {site.about.body.map((paragraph, index) => (
                <Reveal key={index} delay={index * 90}>
                  <p className="text-lg leading-[1.75] sm:text-xl">
                    <Accented text={paragraph} accents={site.about.accents} />
                  </p>
                </Reveal>
              ))}
            </div>
          </div>
        </Section>

        <Showcase />

        <Section id="work" label={site.work.label} heading={site.work.heading}>
          <WorkList />
        </Section>

        <Section id="stack" label={site.stack.label} heading={site.stack.heading}>
          <StackProse />
        </Section>

        <Section
          id="recommendations"
          label={site.testimonials.label}
          heading={site.testimonials.heading}
        >
          <Testimonials />
        </Section>

        <Contact />
      </main>

      <Footer />
    </>
  );
}
