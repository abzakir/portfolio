"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import AutopilotDemo from "@/components/work/AutopilotDemo";
import BlackHoleSteps from "@/components/work/BlackHoleSteps";
import WhatsAppDemo from "@/components/work/WhatsAppDemo";
import { FadeUp, Rule, SectionLabel, SplitText } from "@/components/ui/motion";
import { autopilot, medNuskha, nuqta, type Link } from "@/lib/data";

function Links({ links }: { links: Link[] }) {
  return (
    <div className="flex flex-wrap gap-x-7 gap-y-3">
      {links.map((link) => (
        <a
          key={link.href}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          className="link-underline inline-flex items-center gap-2 pb-0.5 text-[14px] text-bone"
        >
          {link.label} <span aria-hidden className="text-ember">↗</span>
        </a>
      ))}
    </div>
  );
}

function CaseText({
  kicker,
  title,
  line,
  body,
  stack,
  children,
}: {
  kicker: string;
  title: string;
  line: string;
  body: string[];
  stack: string[];
  children?: React.ReactNode;
}) {
  return (
    <div>
      <FadeUp>
        <p className="label">{kicker}</p>
      </FadeUp>
      <SplitText as="h3" text={title} className="display mt-5 block text-[clamp(3rem,7vw,6.5rem)]" />
      <FadeUp delay={0.1}>
        <p className="mt-5 max-w-xl font-serif text-[clamp(1.35rem,2.2vw,1.8rem)] italic leading-snug text-bone">{line}</p>
      </FadeUp>
      <FadeUp delay={0.15} className="mt-8 max-w-xl space-y-4 text-[15px] leading-relaxed text-bone-muted">
        {body.map((p) => (
          <p key={p.slice(0, 24)}>{p}</p>
        ))}
      </FadeUp>
      {children}
      <FadeUp delay={0.2}>
        <p className="mt-8 font-mono text-[12px] leading-relaxed text-bone-dim">{stack.join(" · ")}</p>
      </FadeUp>
    </div>
  );
}

function MedNuskhaCase() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [60, -60]);

  return (
    <article ref={ref} className="wrap grid gap-16 py-24 sm:py-32 lg:grid-cols-12 lg:gap-10">
      <div className="lg:col-span-6">
        <CaseText {...medNuskha}>
          <FadeUp delay={0.2}>
            <dl className="mt-10 grid max-w-xl grid-cols-3 gap-4 border-y border-ink-line py-5">
              {medNuskha.facts.map((f) => (
                <div key={f.k}>
                  <dt className="label">{f.k}</dt>
                  <dd className="mt-2 text-[14px] text-bone">{f.v}</dd>
                </div>
              ))}
            </dl>
          </FadeUp>
        </CaseText>
        <FadeUp delay={0.25} className="mt-8">
          <Links links={medNuskha.links} />
        </FadeUp>
      </div>
      <motion.div style={{ y }} className="lg:col-span-5 lg:col-start-8 lg:pt-16">
        <WhatsAppDemo />
      </motion.div>
    </article>
  );
}

function AutopilotCase() {
  return (
    <article className="wrap grid gap-16 py-24 sm:py-32 lg:grid-cols-12 lg:gap-10">
      <div className="lg:order-2 lg:col-span-6 lg:col-start-7">
        <CaseText {...autopilot} />
        <FadeUp delay={0.25}>
          <p className="mt-6 font-mono text-[12px] text-bone-dim">{autopilot.note}</p>
        </FadeUp>
      </div>
      <FadeUp className="lg:order-1 lg:col-span-5 lg:pt-20" y={40}>
        <AutopilotDemo />
      </FadeUp>
    </article>
  );
}

function NuqtaCase() {
  return (
    <article className="wrap py-24 sm:py-32">
      <FadeUp>
        <a
          href={nuqta.links[0].href}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative block overflow-hidden rounded-[28px] border border-ink-line bg-ink-raised p-6 transition-colors duration-700 hover:border-ember/40 sm:p-10 lg:p-14"
        >
          <span
            aria-hidden
            className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-ember/10 blur-3xl transition-transform duration-[1.2s] ease-out group-hover:scale-150"
          />
          <div className="relative grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <p className="label">{nuqta.kicker}</p>
              <div className="mt-5 flex items-center gap-5">
                <Image src={nuqta.logo} alt="" width={64} height={64} className="rounded-2xl" />
                <h3 className="display text-[clamp(3rem,7vw,6rem)]">{nuqta.title}</h3>
              </div>
              <p className="mt-6 max-w-xl font-serif text-[clamp(1.35rem,2.2vw,1.8rem)] italic leading-snug text-bone">
                {nuqta.line}
              </p>
            </div>
            <div className="flex flex-col justify-end gap-6 lg:col-span-5">
              <p className="text-[15px] leading-relaxed text-bone-muted">{nuqta.body}</p>
              <p className="font-mono text-[12px] text-bone-dim">{nuqta.stack.join(" · ")}</p>
              <span className="inline-flex items-center gap-3 text-[15px] text-bone">
                Visit {nuqta.links[0].label}
                <span
                  aria-hidden
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-ink-line transition-all duration-500 group-hover:rotate-45 group-hover:border-ember group-hover:bg-ember group-hover:text-ink"
                >
                  ↑
                </span>
              </span>
            </div>
          </div>
        </a>
      </FadeUp>
    </article>
  );
}

export default function Work() {
  return (
    <section id="work" className="relative scroll-mt-16 pt-12">
      <div className="wrap">
        <SectionLabel>Selected work</SectionLabel>
        <SplitText
          as="h2"
          text="Four things I'd show anyone."
          className="mt-6 block max-w-4xl text-[clamp(2.4rem,6vw,5rem)] font-bold leading-[0.95] tracking-tightest"
        />
      </div>

      <MedNuskhaCase />
      <div className="wrap">
        <Rule />
      </div>
      <BlackHoleSteps />
      <div className="wrap">
        <Rule />
      </div>
      <AutopilotCase />
      <NuqtaCase />
    </section>
  );
}
