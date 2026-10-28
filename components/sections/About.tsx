"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { EASE, FadeUp, SectionLabel } from "@/components/ui/motion";
import { about, beforeFast, earlierRoles, roles } from "@/lib/data";

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <FadeUp className="border-t border-ink-line pt-6">
      <h3 className="label">{title}</h3>
      <div className="mt-5">{children}</div>
    </FadeUp>
  );
}

function Portrait() {
  return (
    <motion.div
      className="relative aspect-[4/5] w-full overflow-hidden rounded-[22px] bg-ink-raised"
      initial={{ clipPath: "inset(100% 0% 0% 0% round 22px)" }}
      whileInView={{ clipPath: "inset(0% 0% 0% 0% round 22px)" }}
      viewport={{ once: true, margin: "-15% 0px" }}
      transition={{ duration: 1.4, ease: EASE }}
    >
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1.3 }}
        whileInView={{ scale: 1.12 }}
        viewport={{ once: true, margin: "-15% 0px" }}
        transition={{ duration: 1.8, ease: EASE }}
        style={{ transformOrigin: "50% 0%" }}
      >
        <Image
          src={about.photo}
          alt="Abdul Zakir"
          fill
          sizes="(min-width: 1024px) 30vw, 90vw"
          className="object-cover object-top grayscale contrast-[1.08]"
        />
      </motion.div>
      <div aria-hidden className="absolute inset-0 bg-[#3a2416] mix-blend-screen" />
      <div aria-hidden className="absolute inset-0 bg-ember-soft opacity-70 mix-blend-multiply" />
      <div aria-hidden className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-ink/70 to-transparent" />
      <p className="absolute bottom-4 left-4 font-mono text-[10.5px] text-bone/80">
        <span className="text-ember">fig. 2</span> me, minus the passport-photo blue
      </p>
    </motion.div>
  );
}

export default function About() {
  const [lead, ...rest] = about.paragraphs;

  return (
    <section id="about" className="scroll-mt-16 py-24 sm:py-32">
      <div className="wrap">
        <SectionLabel>About</SectionLabel>

        <div className="mt-10 grid gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-24">
              <Portrait />
            </div>
          </div>

          <div className="space-y-16 lg:col-span-7 lg:col-start-6">
            <div>
              <FadeUp>
                <p className="text-[clamp(1.6rem,3vw,2.5rem)] font-medium leading-[1.15] tracking-tight">{lead}</p>
              </FadeUp>
              <FadeUp delay={0.1} className="mt-8 space-y-5 text-[16px] leading-relaxed text-bone-muted">
                {rest.map((p) => (
                  <p key={p.slice(0, 24)}>{p}</p>
                ))}
              </FadeUp>
            </div>

            <Block title="Roles">
              <ul className="space-y-5">
                {roles.map((r) => (
                  <li key={r.role + r.org} className="grid gap-1 sm:grid-cols-[8rem_1fr] sm:gap-6">
                    <span className="font-mono text-[12px] text-bone-dim sm:pt-1">{r.when}</span>
                    <span>
                      <span className="text-[17px] text-bone">{r.role}</span>
                      <span className="text-[17px] text-bone-muted">, {r.org}</span>
                      <span className="mt-1 block text-[13.5px] text-bone-dim">{r.note}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </Block>

            <Block title="Education">
              <ul className="space-y-4">
                {about.education.map((e) => (
                  <li key={e.where} className="grid gap-1 sm:grid-cols-[8rem_1fr] sm:gap-6">
                    <span className="font-mono text-[12px] text-bone-dim sm:pt-1">{e.when}</span>
                    <span className="text-[15.5px]">
                      <span className="text-bone">{e.where}</span>
                      <span className="text-bone-muted"> · {e.what}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </Block>

            <Block title="Toolbox">
              <dl className="space-y-4">
                {about.toolbox.map((t) => (
                  <div key={t.k} className="grid gap-1 sm:grid-cols-[8rem_1fr] sm:gap-6">
                    <dt className="font-mono text-[12px] text-bone-dim sm:pt-1">{t.k}</dt>
                    <dd className="text-[15.5px] leading-relaxed text-bone">{t.v}</dd>
                  </div>
                ))}
                <div className="grid gap-1 sm:grid-cols-[8rem_1fr] sm:gap-6">
                  <dt className="font-mono text-[12px] text-bone-dim sm:pt-1">Speaks</dt>
                  <dd className="text-[15.5px] text-bone">{about.languages}</dd>
                </div>
              </dl>
            </Block>

            <Block title="Before FAST">
              <ul className="space-y-3">
                {earlierRoles.map((r) => (
                  <li key={r.role + r.org} className="text-[15px] leading-relaxed">
                    <span className="text-bone">{r.role}</span>
                    <span className="text-bone-muted">, {r.org}</span>
                    {r.note && <span className="text-bone-dim"> · {r.note}</span>}
                  </li>
                ))}
              </ul>
              <ul className="mt-8 grid gap-x-8 gap-y-3 sm:grid-cols-2">
                {beforeFast.map((b) => (
                  <li key={b.what} className="grid grid-cols-[4.75rem_1fr] gap-3 text-[13.5px] leading-snug">
                    <span className="font-mono text-[11.5px] text-bone-dim">{b.when}</span>
                    <span>
                      <span className="text-bone">{b.what}</span>
                      <span className="block text-bone-dim">{b.note}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </Block>
          </div>
        </div>
      </div>
    </section>
  );
}
