"use client";

import { Counter, FadeUp, Rule, SectionLabel, SplitText } from "@/components/ui/motion";
import { recent } from "@/lib/data";

export default function Recent() {
  return (
    <section id="recent" className="relative scroll-mt-16 py-24 sm:py-32">
      <div className="wrap">
        <SectionLabel>Recent · 2026</SectionLabel>
        <SplitText
          as="h2"
          text="A busy few months."
          className="mt-6 block max-w-4xl text-[clamp(2.4rem,6vw,5rem)] font-bold leading-[0.95] tracking-tightest"
        />

        <ol className="mt-16 sm:mt-24">
          {recent.map((win, i) => (
            <li key={win.event} className="group relative">
              <Rule delay={i * 0.08} />
              <div className="grid gap-6 py-10 sm:py-12 md:grid-cols-12 md:gap-8">
                <FadeUp className="md:col-span-2" delay={0.05}>
                  <p className="font-mono text-[12px] text-bone-dim">{win.when}</p>
                </FadeUp>

                <FadeUp className="md:col-span-6" delay={0.1}>
                  <p className="text-[13px] text-bone-muted">{win.event}</p>
                  <h3 className="mt-2 text-[clamp(1.8rem,3.4vw,2.9rem)] font-semibold leading-[1.02] tracking-tight transition-colors duration-500 group-hover:text-ember-soft">
                    {win.result}
                  </h3>
                  <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-bone-muted">{win.body}</p>
                  {win.link && (
                    <a
                      href={win.link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link-underline mt-5 inline-flex items-center gap-2 pb-0.5 font-mono text-[12px] text-ember"
                    >
                      {win.link.label} <span aria-hidden>↗</span>
                    </a>
                  )}
                </FadeUp>

                <FadeUp className="md:col-span-4 md:text-right" delay={0.18}>
                  {win.figure ? (
                    <div>
                      <p className="display text-[clamp(4rem,9vw,8rem)] text-bone">
                        {win.figure.prefix && (
                          <span className="mr-2 align-top font-serif text-[0.32em] font-normal italic tracking-normal text-bone-muted">
                            {win.figure.prefix}
                          </span>
                        )}
                        <Counter value={win.figure.value} />
                      </p>
                      <p className="mt-2 font-mono text-[12px] text-bone-dim">{win.figure.of}</p>
                    </div>
                  ) : (
                    <p className="font-serif text-[clamp(2rem,3.6vw,3rem)] italic leading-none text-bone">{win.role}</p>
                  )}
                </FadeUp>
              </div>
            </li>
          ))}
        </ol>
        <Rule />
      </div>
    </section>
  );
}
